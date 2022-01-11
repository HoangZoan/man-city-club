import "./Resources/css/app.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Admin/Dashboard";
import AuthGuard from "./components/HOC/Auth";
import AdminPlayers from "./components/Admin/players";
import AddEditPlayers from "./components/Admin/players/addEditPlayers";
import TheTeam from "./components/theTeam";
import AdminMatches from "./components/Admin/matches";
import AddEditMatches from "./components/Admin/matches/addEditMatch";
import TheMatches from "./components/theMatches";
import NotFound from "./components/not_found";

function Routes(props) {
  const { user } = props;

  return (
    <BrowserRouter>
      <Header user={user} />

      <Switch>
        {/* Admin - Matches section */}
        <Route
          path="/admin_matches/edit_match/:matchid"
          component={AuthGuard(AddEditMatches)}
        />
        <Route
          path="/admin_matches/add_match"
          component={AuthGuard(AddEditMatches)}
        />
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)} />

        {/* Admin - Players section */}
        <Route
          path="/admin_players/edit_player/:playerid"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path="/admin_players/add_player"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)} />

        {/* Top Navigation */}
        <Route path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route path="/the_team" component={TheTeam} />
        <Route path="/the_matches" component={TheMatches} />
        <Route
          path="/sign-in"
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>

      <ToastContainer />

      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
