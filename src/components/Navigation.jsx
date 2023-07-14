import React, { Component } from "react";
import PropTypes from 'prop-types';
import ROSLIB from 'roslib'
import Config from "../scripts/config.js";

class Navigation extends Component {

    state = {
        ros: null,
      };
    
      constructor() {
        super();
        //this.init_connection = this.view_map.bind(this);
        this.view_map = this.view_map.bind(this);
      }
    
      init_connection() {
        //this.setState({ ros: new ROSLIB.Ros() });
        this.state.ros = new window.ROSLIB.Ros();
        console.log("Map:" + this.state.ros);
        try {
          this.state.ros.connect(
            "ws://" +
              Config.ROSBRIDGE_SERVER_IP +
              ":" +
              Config.ROSBRIDGE_SERVER_PORT +
              ""
          );
        } catch (error) {
          console.log(
            "ws://" +
              Config.ROSBRIDGE_SERVER_IP +
              ":" +
              Config.ROSBRIDGE_SERVER_PORT +
              ""
          );
          console.log("cannot connect to the WS robot. Try again after 1 second");
        }
      }
    
      componentDidMount() {
        this.init_connection();
        console.log("Map: componentDidMount" + this.state.ros);
        this.view_map();
      }
    

  view_map() {
    // Create the main viewer.
    const viewer = new window.ROS2D.Viewer({
        divID: this.props.id,
        width: this.props.width,
        height: this.props.height
      });
  
      // Setup the nav client.
      var nav = new window.NAV2D.OccupancyGridClientNav({
        ros: this.state.ros,
        rootObject: viewer.scene,
        topic: this.props.topic,
        viewer: viewer,
        serverName: "/move_base",
        withOrientation: true,
      });

  }

  render() {
    return (
      <>
        <div id={this.props.id} />
      </>
    );
  }
}

Navigation.defaultProps = {
  ros: new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  }),
  id: 'nav2d',
  width: 500,
  height: 500,
  topic: '/map',
  serverName: '/move_base'
};

Navigation.propTypes = {
  ros: PropTypes.object,
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  topic: PropTypes.string,
  serverName: PropTypes.string
}

export default Navigation;