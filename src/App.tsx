import React from 'react';
import './App.css';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';
import Menu from "./components/Menu";
import {Redirect, Route, Switch} from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import PageFour from "./pages/PageFour";
import PageFive from "./pages/PageFive";
import Home from "./pages/Home";

const drawerWidth = 240; // duplicate in SideMenu for now
const theme = createMuiTheme({
  palette: {
    primary: { main: '#228e22' },
    secondary: { main: '#4d4d4d' },
  },
  typography: createTypography(createPalette({}), {
    fontFamily: '"Comic Sans MS"'
  }),
})
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }
));

function App() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>

        <Menu open={open} setOpen={setOpen} />

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/what-are-nfts" component={PageOne}/>
            <Route exact path="/why-nfts" component={PageTwo}/>
            <Route exact path="/how-they-work" component={PageThree}/>
            <Route exact path="/get-involved" component={PageFour}/>
            <Route exact path="/faqs" component={PageFive}/>
            <Redirect to="/home"/>
          </Switch>
        </main>

      </div>
    </MuiThemeProvider>
  );
}

export default App;
