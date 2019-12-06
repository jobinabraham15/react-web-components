import React from "react";
import "./App.css";
import MicroContainer1 from "./micro-container11";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Homepage } from "./Homepage";
customElements.define("micro-container", MicroContainer1);
let MicroF = props => React.createElement("micro-container", props);
// let MicroF = props => null;

let routes = [];

let getContracts = async () => {
  try {
    let result = await axios.get("http://127.0.0.1:3003/contracts.json");
    let data = result.data;
    return data;
  } catch (e) {
    return {};
  }
};

let getRoutes = async () => {
  let result = null;
  try {
    result = await axios.get("http://127.0.0.1:3003/contracts.json");
    let data = result.data;
    
    
    routes.push(
      <Route
        key={""}
        path={`/${"staffing/main"}`}
        render={props => {
          return (
            <MicroF
              location={props.location}
              history={props.history}
              contract={{}}
            />
          );
        }}
      />
    );

    // for (let contract in data) {
    //   if (data.hasOwnProperty(contract)) {
    //     let currentContract = data[contract];
    //     let MicroF = props => React.createElement("micro-container", props);
    //     routes.push(
    //       <Route
    //         key={currentContract.name}
    //         path={`/${currentContract.route}`}
    //         render={props => {
    //           console.log("currentContract in route", currentContract);
    //           return (
    //             <MicroF
    //               location={props.location}
    //               history={props.history}
    //               contract={currentContract}
    //             />
    //           );
    //         }}
    //       />
    //     );
    //   }
    // }
  } catch (e) {
    return e;
  }
  return routes;
};

class App extends React.Component {
  state = { routes: [], contracts: {} };
  componentDidMount() {
    Promise.all([getRoutes(), getContracts()]).then(result => {
      this.setState({ routes: result[0], contracts: result[1] });
    });
  }
  render() {
    let finalRoutes = this.state.routes;
    return (
      <BrowserRouter>
        <Switch>
          {finalRoutes.length ? finalRoutes : null}
          <Route
            path={"/configure_contract"}
            component={() => {
              return null;
            }}
          />
          <Route
            path="/"
            render={props => <Homepage contracts={this.state.contracts} />}
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* {finalRoutes.length ? finalRoutes : null} */}
//         <Route
//           path={"/configure_contract"}
//           component={() => {
//             return null;
//           }}
//         />
//         <Route
//           path="/newpath"
//           render={props => {
//             console.log("props", props);
//             return <NewPopup location={props.location}></NewPopup>;
//           }}
//           exact
//         />
//       </Switch>
//     </BrowserRouter>
//   );
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         {NewPopup}
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
// }

export default App;
