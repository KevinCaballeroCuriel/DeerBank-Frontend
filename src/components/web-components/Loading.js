import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

function Loading() {
  return (
    <div>
      <LoadingOutlined
        className="text-secondary"
        style={{
          fontSize: 100,
          left: 0,
          right: 0,
          top: "40%",
          position: "absolute",
          color: "#736c8a",
        }}
      />
    </div>
  );
}

export default Loading;
