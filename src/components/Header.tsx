import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
  createTheme,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { GiSpy } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { User } from "../lib/model";
import CollapseProfile from "./CollapseProfile";

const useStyles = makeStyles((theme?: any) => ({
  title: {
    // flex: 1,
    // border: "1px solid white",
    display: "flex",
    alignItems: "center",
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: 800,
    cursor: "pointer",
  },
}));

const Header: React.FC<User> = () => {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const auth: any = getAuth();
  const currentUser: any = auth.currentUser;
  let location = useLocation();

  useEffect(() => {
    setLoading(true);
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
      } else {
        setLoading(false);

        console.log("unauthorized");
        navigate("/login");
      }
    });
    return () => AuthCheck();
  }, [auth]);

  const classes = useStyles();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  console.log(user);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h4"
            >
              Coin Spy &nbsp; <GiSpy />
            </Typography>
            {location.pathname === "/login" ? (
              ""
            ) : (
              <Button onClick={() => handleChange()}>
                {user?.photoURL !== null ? (
                  <img
                    style={{ width: "50%" }}
                    src={user?.photoURL}
                    alt="avatar"
                  />
                ) : (
                  <CgProfile size="2.4em" color="gold" />
                )}
                <CollapseProfile checked={checked} setChecked={setChecked} />
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
