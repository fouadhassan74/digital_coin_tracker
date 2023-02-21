import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useRecoilState } from "recoil";
import { CurrencyState, SymbolState } from "../atoms/Atoms";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const [Currency, setCurrency] = useRecoilState(CurrencyState);
  const [Symbol, setSymbol] = useRecoilState(SymbolState);
  const navigate = useNavigate();
  console.log(Currency);

  const useStyles = makeStyles()((theme) => {
    return {
      title: {
        flex: 1,
        fontFamily: "Montserrat",
        color: "gold",
        fontWeight: "bold",
        cursor: "pointer",
      },
    };
  });
  const { classes } = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                className={classes.title}
                onClick={() => {
                  navigate("/");
                }}
              >
                Crypto Hunter
              </Typography>
              <Select
                defaultValue="USD"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
                  color: "white",
                }}
              >
                <MenuItem defaultChecked={true} value={"USD"}>
                  USD
                </MenuItem>
                <MenuItem value={"KWD"}>KWD</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </main>
    </ThemeProvider>
  );
};

export default Header;
