import "./Resources/css/app.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function Routes() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/" exact component={Home} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
