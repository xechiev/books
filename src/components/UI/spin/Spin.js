import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <Spin
      size="large"
      style={{
        marginTop: 50,
        marginRight: 100,
      }}
    />
  );
};

export default Spinner;
