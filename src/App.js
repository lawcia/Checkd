import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import firebase from "firebase";
import SubmitNews from "./components/SubmitNews/SubmitNews";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Newsfeed from "./components/Newsfeed/Newsfeed";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardDetail from "./components/DashboardDetail/DashboardDetail";

class App extends React.Component {
  state = {
    loggedIn: null,
  };

  getAuthState = () => {
    let self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if (user) {
        // User is logged in.

        self.setState({ loggedIn: true });
      } else {
        // No user is signed in.
        self.setState({ loggedIn: false });
      }
    });
  };

  componentDidMount() {
    this.getAuthState();
  }

  render() {
    return (
      <Router>
        <div>
          {/*<!------ Navbar start-------->*/}
          <nav>
            <ul>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/newsfeed"> Newsfeed </Link>
              </li>
              <li>
                <Link to="/submit-news"> Submit News </Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
              {this.state.loggedIn && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              {!this.state.loggedIn && (
                <li>
                  <Link to="/login"> Admin Login </Link>
                </li>
              )}
              {this.state.loggedIn && (
                <li>
                  <Link to="/logout"> Admin Logout </Link>
                </li>
              )}
            </ul>
          </nav>
          {/*<!------ Navbar end -------->*/}
          {`${this.state.loggedIn}`}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newsfeed" component={Newsfeed} />
            <Route exact path="/submit-news" component={SubmitNews} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/dashboard">
              {this.state.loggedIn ? <Dashboard /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/dashboard/:id" component={DashboardDetail} />
            <Route exact path="/login">
              {this.state.loggedIn? <Redirect to="/dashboard" />: <Login />}
            </Route> 
            <Route exact path="/logout">
              {this.state.loggedIn? <Logout /> : <Redirect to="/login"/> }
            </Route> 
          </Switch>
          {/*--   Footer start   ---*/}

          {/*--   Footer end   ---*/}
        </div>
      </Router>
    );
  }
}

export default App;
