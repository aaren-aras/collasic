import React, {Component} from "react"; 

export default class LobbyPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skipVotes: 2,
            canPause: false,
            isHost: false,
        };
        // 'match' stores information about how we reached 'Lobby' component from React Router 
        this.lobbyPin = this.props.match.params.lobbyPin; 
        this.getLobbyDetails();  // Forces component to re-render with backend lobby data 
    }

    getLobbyDetails() {
        // When using arrow functions pointing to one thing, then 'return' isn't needed
        fetch('/api/get-lobby' + '?pin=' + this.lobbyPin).then((response) => response.json())
        .then((data) => {
            this.setState({
                skipVotes: data.skip_votes,
                canPause: data.can_pause,
                isHost: data.is_host
            })
        });
    }

    render() {
        return <div>
            <h4>Lobby Pin: {this.lobbyPin}</h4>
            <p>Votes: {this.state.skipVotes}</p> 
            {/* Couldn't see below values on browser when they weren't strings */}
            <p>Can Pause: {this.state.canPause.toString()}</p>
            <p>Host: {this.state.isHost.toString()}</p>
        </div>
    }
}