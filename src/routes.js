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

function Routes(props) {
  const { user } = props;

  return (
    <BrowserRouter>
      <Header user={user} />

      <Switch>
        <Route path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route
          path="/sign-in"
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route path="/" exact component={Home} />
      </Switch>

      <ToastContainer />

      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
