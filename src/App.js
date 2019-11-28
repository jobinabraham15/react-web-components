import React from "react";
import "./App.css";
import PopUpInfo from "./popupinfo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

customElements.define("popup-info", PopUpInfo);

let NewPopup = props => React.createElement("popup-info", props);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* {finalRoutes.length ? finalRoutes : null} */}
        <Route
          path={"/configure_contract"}
          component={() => {
            return null;
          }}
        />
        <Route
          path="/newpath"
          render={props => {
            console.log("props", props);
            return <NewPopup location={props.location}></NewPopup>;
          }}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         {NewPopup}
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
