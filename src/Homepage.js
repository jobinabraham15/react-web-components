import * as React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
/**
 * Uses contracts to build the list of all the microfrontends available
 * @param props
 * @param props.contracts "Contracts JSON"
 */

export const Homepage = ({ contracts }) => {
  let cards = [];

  if (contracts) {
    for (let contract in contracts) {
      if (contracts.hasOwnProperty(contract)) {
        let currentContract = contracts[contract];
        console.log("currentContract", currentContract);
        cards.push(
          <Link to={`/${currentContract.route}${currentContract.landing}`} key={currentContract.name}>
            <Card.Grid
              hoverable
              style={{ width: "35%", textAlign: "center", marginRight: "10px" }}
              key={currentContract.name}
            >
              {currentContract.name}
            </Card.Grid>
          </Link>
        );
      }
    }
  }
  console.log("cards", cards);
  return (
    <>
      <div style={{ width: 500, margin: "0 auto", paddingTop: "150px" }}>
        {cards}
      </div>
    </>
  );
};
