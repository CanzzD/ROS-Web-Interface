import React, { useState, useEffect } from "react";
import jsyaml from "js-yaml";
import konumlarYaml from "../konumlar.yaml";
import { Button } from "react-bootstrap";
import ROSLIB from "roslib";

const Konumlar = () => {
  const [konumlar, setKonumlar] = useState([]);
  const [ros, setRos] = useState(null);

  useEffect(() => {
    const initROS = () => {
      const ros = new ROSLIB.Ros({
        url: "ws://localhost:9090", // ROS köprüsünün adresini buraya ekleyin
      });

      ros.on("connection", () => {
        console.log("ROS bağlantısı kuruldu");
      });

      ros.on("error", (error) => {
        console.error("ROS hatası:", error);
      });

      ros.on("close", () => {
        console.log("ROS bağlantısı kapatıldı");
      });

      setRos(ros);
    };

    initROS();
  }, []);

  useEffect(() => {
    if (ros) {
      const fetchData = async () => {
        try {
          const response = await fetch(konumlarYaml);
          const data = await response.text();
          const parsedData = jsyaml.load(data);
          setKonumlar(parsedData);
        } catch (error) {
          console.error("Error fetching YAML data:", error);
        }
      };

      fetchData();
    }
  }, [ros]);

  const handleGoToKonum = (konum) => {
    if (ros) {
      const selectedKonum = konumlar.find((item) => item.name === konum);
      if (selectedKonum) {
        const goal = new ROSLIB.Message({
          goal: {
            target_pose: {
              header: {
                frame_id: "map",
              },
              pose: {
                position: {
                  x: selectedKonum.position.x,
                  y: selectedKonum.position.y,
                  z: selectedKonum.position.z,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0.99,
                  w: 0.064,
                },
              },
            },
          },
        });

        // Hareket emrini yayınla
        const pub = new ROSLIB.Topic({
          ros: ros,
          name: "/move_base/goal",
          messageType: "move_base_msgs/MoveBaseActionGoal",
        });
        pub.publish(goal);

        console.log("Go to konum:", selectedKonum.name);
      }
    }
  };

  return (
    <div>
      <h1>Konumlar</h1>
      <ul>
        {konumlar.map((konum, index) => (
          <Button
            key={index}
            onClick={() => handleGoToKonum(konum.name)}
          >
            {konum.name}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default Konumlar;
