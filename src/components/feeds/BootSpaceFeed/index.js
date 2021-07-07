import React from "react";
import { Skeleton } from "antd";

const BootSpaceFeed = () => {
  const feedData = null;

  return <>{feedData !== null ? <></> : <Skeleton active />}</>;
};

export default BootSpaceFeed;
