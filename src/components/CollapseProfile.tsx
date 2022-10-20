import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { AiOutlineDelete } from "react-icons/ai";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Typography, Button } from "@material-ui/core";
import SelectButton from "./SelectButton";
import { firebaseConfig } from "../lib/firebaseConfig";
import { initializeApp } from "firebase/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   height: 180,
      position: "relative",
    },
    wrapper: {},
    name: {
      paddingBlock: 20,
      fontFamily: "Montserrat",
      borderBottom: "1px solid",
    },
    paper: {
      zIndex: 20,
      top: 60,
      right: 1,
      position: "fixed",
      margin: theme.spacing(1),
      height: "70vh",
      width: "22%",
      minWidth: 270,
    },
    item: {
      paddingBlock: 20,
      border: 0,
    },
    button: {
      "&:hover": {
        backgroundColor: "#35363a",
        opacity: "0.7",
      },
    },
  })
);
interface Props {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapseProfile: React.FC<Props> = ({ checked, setChecked }) => {
  const [savedCoins, setSavedCoins] = useState<any>(null);

  const classes = useStyles();
  const auth: any = getAuth();
  const { currentUser } = auth;

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  interface SavedCoin {}

  const getSavedCoins = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const newArray: Array<SavedCoin> = [];
    querySnapshot.forEach((doc) => {
      newArray.push({ ...doc.data(), id: doc.id });
      setSavedCoins(newArray);
    });
  };

  const deleteSavedCoin = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getSavedCoins();
    setChecked(true);
  };

  useEffect(() => {
    getSavedCoins();
  }, []);

  console.log(savedCoins);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <Typography className={classes.name}>
              {currentUser.displayName}
            </Typography>
            <div
              style={{
                height: "80%",
                display: "flex",
                flexDirection: "column",
                paddingTop: 20,
              }}
            >
              {savedCoins ? (
                savedCoins?.map((c: any) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <ListItem
                      style={{
                        paddingTop: 15,
                        paddingBottom: 15,
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                      button
                    >
                      <img src={c.image} alt="image" />
                      <div style={{ flexGrow: 1 }}></div>

                      <p>{c.symbol}</p>
                      <div style={{ flexGrow: 1 }}></div>
                      <p>{c.price}</p>
                      <div style={{ flexGrow: 10 }}></div>
                    </ListItem>{" "}
                    <Button
                      className={classes.button}
                      style={{ backgroundColor: "transparent" }}
                      onClick={() => deleteSavedCoin(c.id)}
                    >
                      <AiOutlineDelete size="1.5em" />
                    </Button>
                  </div>
                ))
              ) : (
                <p>No saved coins</p>
              )}
            </div>
            <div
              style={{
                marginTop: 20,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <SelectButton
                style={{}}
                selected={false}
                onClick={() => signOut(auth)}
              >
                Sign Out
              </SelectButton>
            </div>
          </Paper>
        </Slide>
      </div>
    </div>
  );
};
export default CollapseProfile;
