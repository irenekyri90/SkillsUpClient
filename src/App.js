import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Instructions from "./pages/Instructions";
import WorkshopList from "./pages/WorkshopList";
import WorkshopDetails from "./pages/WorkshopDetails";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  state = {
    backgroundColor: "white",
    color: "#262729",
  };

  setDayMode = () => {
    this.setState({ backgroundColor: "white", color: "#262729" });
  };

  setNightMode = () => {
    this.setState({ backgroundColor: "#262729", color: "white" });
  };

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundColor: this.state.backgroundColor,
          color: this.state.color,
        }}
      >
        <Navbar setNightMode={this.setNightMode} setDayMode={this.setDayMode} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/instructions" component={Instructions} />
          <Route
            exact
            path="/workshops/category/:category"
            component={WorkshopList}
          />
          <Route exact path="/workshops/:id" component={WorkshopDetails} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/private/profile" component={Profile} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
