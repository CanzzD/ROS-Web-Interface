const Config = {
  ROSBRIDGE_SERVER_IP: "10.211.55.4",
  ROSBRIDGE_SERVER_PORT: "9090",
  RECONNECTION_TIMER: 3000,
  CMD_VEL_TOPIC: "/cmd_vel",
  ODOM_TOPIC: "/odom",
  POSE_TOPIC: "/amcl_pose",
  MAP_TOPIC: "/map",
  MAP_TOPIC_FOR_MAP_GOAL: "/map",
  MAP_META_TOPIC: "/map_metadata",
  MAP_WIDTH: 750,
  MAP_WEIGHT: 800,
  MOVE_BASE: "/move_base"
};

export default Config;
