import * as React from "react";
import { Card, Row, Col } from "antd";
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
        cards.push(
          <Link
            to={`/${currentContract.route}${currentContract.landing}`}
            key={currentContract.name}
          >
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
      <Row className={"homepage"}>
        <Col span={6} offset={9} style={{marginTop:"100px"}}>
            {"Welcome to CTS Ultron"}
        </Col>
        <Col span={24}>
          <Row>
          <Col span={6} offset={9}>
            {cards}
          </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
