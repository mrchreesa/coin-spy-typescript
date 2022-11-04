import { makeStyles } from "@material-ui/core";
import React from "react";

interface Props {
  children: any;
  selected: boolean;
  onClick: any;
  style: {};
}
const useStyles = makeStyles((theme?: any) => ({
  selectbutton: {
    border: "1px solid ",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    // backgroundColor: selected ? "gold" : "",
    // color: selected ? "black" : "",
    // fontWeight: selected ? 700 : 500,
    backgroundImage: "linear-gradient(45deg ,rgba(0,212,255,1) 35%, rgba(53,82,82,1) 100%)",
    color: "white",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    [theme.breakpoints.down("sm")]: {
      width: "25%",
      marginBlock: 10,
      marginInline: 5,
      textAlign: "center",
      paddingRight: 5,
      border: 0,
      paddingLeft: 5,
    },
    // width: "100%",
    //   margin: 5,
  },
}));

const SelectButton: React.FC<Props> = ({
  children,
  selected,
  onClick,
  style,
}) => {
  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
