import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState"
import Navigation from "./Navigation"
import { Row, Col, Container, Button } from "react-bootstrap"
import Config from '../scripts/config';
import Konumlar from "./Konumlar";

class Home extends React.Component {
    state = {};

    render() {
        return (
        <main>
          <Container>
            <h1 className="text-center mt-3">Robot Kontrol Sayfası</h1>
            <Row>
                <Col>
                <Connection />
                </Col>
            </Row>
            <Row>
                <Col>
                <Teleoperation />
                <RobotState />
                <Konumlar />
                </Col>
                <Col>
                <h1>MAP</h1>
                <Navigation id='random' 
                    width={Config.MAP_WIDTH} 
                    height={Config.MAP_WEIGHT} 
                    topic={Config.MAP_TOPIC} 
                    serverName={Config.MOVE_BASE} 
                />
                </Col>
                </Row>
          </Container>
        </main>);
    }
}

export default Home;