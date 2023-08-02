import React from "react";
import FormLoginAdmin from "../../Components/FormLoginAdmin/FormLoginAdmin";
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/animation_login.json";

const LoginAdmin = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-1/2">
        {/* animation */}
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/2">
        <FormLoginAdmin />
      </div>
    </div>
  );
};

export default LoginAdmin;
