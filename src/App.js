import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Kereses from "./sajatosztalyok/Kereses"
import Auto from "./sajatosztalyok/Auto"
import Autok from "./sajatosztalyok/Autok"
import Szalloda from "./sajatosztalyok/Szalloda"
import Oldal from "./sajatosztalyok/Oldal"
import Torlesautok from "./sajatosztalyok/Torlesautok"
import Elerhetoseg from "./sajatosztalyok/Elerhetoseg"


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser,  showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/Kereses">
        
        Nyaralás
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        
          
          <div className="navbar-nav mr-auto">
           

            <li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Szalloda"} className="nav-link">
                Szálloda
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Autok"} className="nav-link">
                Autók
              </Link>
            </li>

            <Link to={"/Oldal"} className="nav-link">
                Autó Galéria
              </Link>


            <li className="nav-item">
              <Link to={"/Elerhetoseg"} className="nav-link">
              Elérhetőség
              </Link>
            </li>
            
              
            <li className="nav-item">
              <Link to={"/Auto"} className="nav-link">
                Beállítások
              </Link>
            </li>

           {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
           /*
          --------showModeratorBoard,---------}

{/*----------Admin menü pont-------*/}

            




            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torlesautok"} className="nav-link">
                Törlés Autók
                </Link>
              </li>
            )}



          </div>
          
          
          
          <NavDropdown title="Továbbiak" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Bejelentkezés
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Regisztráció
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

            <Route path="/Kereses" component={Kereses} />
            <Route path="/Auto" component={Auto} />
            <Route path="/Autok" component={Autok} />
            <Route path="/Szalloda" component={Szalloda} />
            <Route path="/Oldal" component={Oldal} />
            <Route path="/Torlesautok" component={Torlesautok} />
            <Route path="/Elerhetoseg" component={Elerhetoseg} />
            

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
