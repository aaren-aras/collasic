// Don't need 'import { render } from "react-dom"' since its being rendered FROM 'app' component
import React, {Component} from "react";
// Renaming 'BrowserRouter' to "Router" for convenience
// Using React Router v5, but v6 Requires Changes to Keywords (https://bit.ly/3R2TNBt)
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

import CreateLobbyPage from "./CreateLobbyPage";
import JoinLobbyPage from "./JoinLobbyPage";
import LobbyPages from "./LobbyPages";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* '<Switch>' and '<Route>' are the switch and case in JavaScript switch-case statements. 
            E.g., if '/join' path is typed into URL, then the 'JoinLobbyPage' is loaded.
            Must add URL paths to HomePage.js (for React) AND urls.py in 'frontend' (for Django).
            Add 'exact' keyword to ensure "/join" and "/create" aren't mapped to "/" (home page). */
            <Router>
                <Switch> 
                    <Route exact path="/"> 
                        <p>This do be the home page</p> 
                    </Route>
                    <Route path="/create" component={CreateLobbyPage}/>
                    <Route path="/join" component={JoinLobbyPage}/>
                    {/* Colon (:) denotes a variable in URL */}
                    <Route path="/lobby/:lobbyPin" component={LobbyPages}/> 
                </Switch>
            </Router>
        )
    }
} 