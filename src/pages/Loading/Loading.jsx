import React from "react";
import Lottie from "react-lottie";
import animation_Loading from "./../../assets/animation/animation_Loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation_Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="h-screen w-full flex items-center fixed bg-white"
      style={{ zIndex: 9999 }}
      //redux làm thêm 1 state, overFlowY:hidden
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
