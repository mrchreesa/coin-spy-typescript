import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../lib/api";
import { Trending } from "../lib/model";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../lib/functions";

const useStyles = makeStyles({
  // row: {
  //   backgroundColor: "#16171a",
  //   cursor: "pointer",
  //   "&:hover": {
  //     backgroundColor: "#131111",
  //   },
  //   fontFamily: "Montserrat",
  // },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const CoinsTable: React.FC = () => {
  const [coins, setCoins] = useState<Trending[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const fetchCoins = () => {
    setLoading(true);
    axios.get(CoinList("usd")).then((response) => {
      setCoins(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  const navigate = useNavigate();
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Crypto Currency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "gold" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      align="right"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        // textAlign: "left",

                        textAlign: head === "Coin" ? "left" : "right",
                      }}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice(
                    page === 1 ? (page - 1) * 10 : page * 20,
                    page === 1 ? (page - 1) * 10 + 20 : page * 20 + 20
                  )
                  .map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className="row"
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            alignItems: "center",
                          }}
                        >
                          <h3>
                            {page === 1
                              ? index + 1
                              : (page - 1) * 20 + (index + 1)}
                          </h3>
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {"$"}
                          {numberWithCommas(row.current_price.toString())}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {row.symbol.toUpperCase()}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
