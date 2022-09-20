import React, {Component} from "react";
import {Link} from "react-router-dom"; 
// *Note: Importing 'render()': 'CreateLobbyPage.js' <- 'HomePage.js' <- 'App.js'
    
/* ~ Material UI Components ~ */
import {  // *Destructuring* into individual component imports
    Button,
    FormControl,  // Adds styling and maintains state uniformity in children
    FormControlLabel,  // Gives labels to 'Radio' buttons using styling, state, and control props
    FormHelperText, // Supports form inputs, styling, and state syncing with 'FormControl'
    Grid,  // *12*-column layout that adapts to screen size and orientation using CSS 'Flexbox'
    Radio,  // Circular buttons that show an encircled filled circle when clicked (https://bit.ly/3wxXpTU)
    RadioGroup, // Wraps and vertically/horizontally lays out 'Radio' button children 
    TextField,  // Enables text to be entered into GUI   
    Typography,  // Standardizes font weights and sizes for uniformity and browser compatibility
} from "@material-ui/core";
// *Note: Can also use 'import XXXX from @material-ui/core/XXXX' for each one (https://bit.ly/3pJUdkB)

export default class CreateLobbyPage extends Component {
    defaultSkipVotes = 1;
    constructor(props) {
        super(props);
        this.state = {
            skipVotes: this.defaultSkipVotes,
            canPause: true
        };
        /* 'bind()' passes arguments from class-based components to functions, but can easily be replaced
        with ES6 arrow functions (=>); e.g., replace 'manageSkipVotes(e) {' function signature and 
        'this.manageSkipVotes = this.manageSkipVotes.bind(this)' code in constructor with 
        'manageSkipVotes = (e) => {' */
    }

    manageSkipVotes = (e) => {
        this.setState({  // Allows you to change states in class-based components 
            skipVotes: e.target.value  // Gives TextField (e) value to 'skipVotes' state variable 
        })
    }

    managePauseAccess = (e) => {
        this.setState({ 
            // If TextField (e) value is a string "true", then set 'canPause' to true; if not, false
            canPause: e.target.value === "true" ? true : false,  // Ternary operation 
        })
    }

    manageLobbyButtonPresses = () => {
        // 'POST' request with form data to API endpoint (backend) to create lobby
        const requestOptions = {
            method: "POST",
            // Describes format of content being sent, which in this case, is JSON
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({
                // Matching Python variables in backend with JavaScript variables in frontend
                skip_votes: this.state.skipVotes,
                can_pause: this.state.canPause
            }),
        };
        // 'fetch()' sends HTTP request to backend ('/api/create-lobby') with 'requestOptions' payload
        // Once HTTP response sent, 'then()' begins the conversion of it to JSON
        fetch("/api/create-lobby", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/lobby/" + data.pin));
    }

    render() { 
        return (
            // Grids have 2 kinds of layouts: 'containers' (1) contain 'items' (2) 
            /* By default, items are spaced evenly (e.g., if 4 items, then each take up 25% of viewport),
            but by setting column widths (1-12), the # of columns occupied by each item can be altered */
            /* 'Breakpoints': Points at which content is moved to the next line (https://bit.ly/3AqkBEX),
            and include xs (>=0 px), sm (>=600 px), md (>=960 px), lg (>=1280 px), and xl (>= 1920 px) */
            <Grid container spacing={1}>  {/* 1 = 8 px, 2 = 16 px, ... */}
                <Grid item xs={12} align="center">
                    {/* ~ Typography Props ~ */}
                    {/* 'variant' specifies text style (https://bit.ly/2mdUiME); default = <p> */}
                    {/* 'component' specifies the outputted tag to browser; default = variant */}
                    {/* Others: 'color', 'align', 'gutterBottom', ... (https://bit.ly/3CzXhHq) */}
                    <Typography variant="h2" component="" color="primary" align="center">
                        Shall we Create a Lobby, Good Fellow? 
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* 'fieldset' groups related form controls */}
                    <FormControl component="fieldset">
                        <FormHelperText component="div">
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        {/* ~ RadioGroup Props ~ */}
                        {/* 'defaultValue': Value used when component is not 'controlled', 
                        i.e., when its form data is not handled by its state */}
                        {/* 'onChange': Calls function when value is changed */}
                        {/* Others: 'children', 'name', 'value' */}
                        {/* *Note: Grouping prevents multiple buttons from being selected at once */}
                        <RadioGroup row defaultValue="true" onChange={this.managePauseAccess}> 
                            {/* ~ FormControlLabel Props ~ */}
                            {/* 'value' gives contextual meaning to button */}
                            {/* 'control' specifies button TYPE (Radio, Switch, or Checkbox) */}
                            {/* 'label' specifies label TEXT for button; default = variant */}
                            {/* Others: 'inputRef', 'onChange', 'sx', ... (https://bit.ly/3wAlfyq) */}
                            <FormControlLabel
                                value="true" 
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                             <FormControlLabel
                                value="false" 
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        {/* ~ TextField Props ~ */}
                        {/* 'required': Whether or not input is needed (true/false) */}
                        {/* 'type': STRING containing the input element */}
                        {/* 'inputProps': Applies attributes to input by passing JavaScript objects {} */}
                        {/* Others: 'color', 'id', 'fullWidth', ... (https://bit.ly/3R0Btcr) */}
                        <TextField 
                            required={true} 
                            type="number" 
                            onChange={this.manageSkipVotes}
                            defaultValue={this.defaultSkipVotes}
                            inputProps={{
                                min: 1, 
                                style:{textAlign: "center"}
                            }}
                        />
                        <FormHelperText component="div">
                            <div align="center">
                                Votes Required to Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* ~ Button Props ~ */}
                    {/* 'variant': 3 button styles ('text' (default), 'contained', and 'outlined' */}
                    {/* 'onClick': Same functionality as 'onChange' but activates when clicked */}
                    {/* Others: 'disableElevation', 'disableRipple', ... (https://bit.ly/3pNsIGG) */}
                    <Button variant="contained" onClick={this.manageLobbyButtonPresses} color="secondary">
                        Create a Lobby
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* "Back" button acts as a hyperlink ('component={Link}') to home page ('to="/"') */}
                    <Button variant="contained" component={Link} to="/" color="primary">
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
} 