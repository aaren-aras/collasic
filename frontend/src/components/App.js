/* 'Components': Independent and reusable bits of code serving as the core building blocks of React;
captialize first letter of custom-built components, and maintain lowercase for built-in ones */

import React, { Component } from "react";
// DOM (Document Object Model): Treats HTML/XML docs as 'trees' with its nodes representing objects
import { render } from "react-dom"; 
import HomePage from "./HomePage";

// Setting up MAIN (class-based) component in React called 'App' 
// *Note: Functional components are generally preferred over class components these days 
export default class App extends Component { 
    // 'props' (Properties): Object used to pass data from parent ('Component') to child ('App')
    constructor(props) {
        super(props); // 'super(props)': Passes props to parent class's constructor
        
        /* 'States': Built-in React objects used to contain data/info about component 
        Whenever modified, JUST the component is automatically re-rendered */  
        this.state = { 

        } 
    }

    // *Note: Use {/* */} to add comments within React render() functions (written in JSX)

    /* 'render()': Displays HTML code inside specified HTML element; components can use passed props 
    to modify their behaviour; can also return '<HomePage></HomePage>' instead of '<HomePage/>; 
    Everything that's returned MUST be wrapped in some tag */
    render() { 
        return (  // Use '()' to avoid JavaScript from auto-inserting semi-colon on same line as 'return'
            <div> 
                <HomePage />
            </div>
        );
    }
}
// Place component inside '<div id="app"></div>' container in 'index.html' template
const appDiv = document.getElementById("app");
render(<App />, appDiv) // Rendering 'app' component inside of 'app' <div>ision to 'index.html'

// *Note: Can use {} to embed JavaScript code into HTML code