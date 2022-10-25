import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { GiSpy } from "react-icons/gi";
import { Grid, makeStyles, Button, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme?: any) => ({
  title: {
    fontSize: 22,
    textAlign: "center",
    margin: "20px 20px",
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  button: {
    // width: "16vw",
    minWidth: "240px",
    padding: "15px 25px",
    color: "rgb(53, 82, 82)",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid",
    borderRadius: 0,
    fontFamily: "Montserrat",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgb(53, 82, 82, 0.25)",
      // opacity: "0.7",
    },
  },
  icon: {
    size: "50em",
  },
}));

export interface IApplicationProps {
  // children: React.ReactNode;
}

const Login: React.FC<IApplicationProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const facebookProvider = new FacebookAuthProvider();

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        console.log(res.user.uid);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthing(false);
      });
  };
  const signInWithFacebook = async () => {
    setAuthing(true);

    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        console.log(res.user.uid);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthing(false);
      });
  };
  const signInAnon = async () => {
    setAuthing(true);
    signInAnonymously(auth)
      .then((res) => {
        console.log(res.user.uid);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthing(false);
      });
  };
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        // xs={12}
        // justify="center"
        style={{
          height: "60vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            display: "flex",
            // color: "white",
            // backgroundColor: "#35363a",
            flexDirection: "column",
            padding: 20,
            borderRadius: "15px",
            borderBlock: "10px solid rgb(53, 82, 82)",
          }}
        >
          <Typography className={classes.title}>Sign in</Typography>
          <Button
            className={classes.button}
            onClick={() => signInWithGoogle()}
            disabled={authing}
          >
            <>
              With Google &nbsp; &nbsp; <BsGoogle size="3em" />
            </>
          </Button>
          <Button
            className={classes.button}
            onClick={() => signInWithFacebook()}
            disabled={authing}
          >
            <>
              With Facebook &nbsp; &nbsp; <BsFacebook size="3em" />
            </>
          </Button>
          <Button
            className={classes.button}
            onClick={() => signInAnon()}
            disabled={authing}
          >
            <>
              Anonymous &nbsp; &nbsp; <GiSpy size="3em" />
            </>
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
