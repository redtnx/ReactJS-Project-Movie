import React, { useEffect } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { https } from "../../services/config";
import { movieServ } from "../../services/movieServices";
import { useState } from "react";

const HomeBanner = () => {
  const [banner, setBanner] = useState([]);
  const getAllBanner = async () => {
    const res = await movieServ.getAllBanner();
    // console.log(res);
    setBanner(res.data.content);
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <div>
      <Carousel>
        {banner.map((banner, index) => {
          return (
            <div key={index} className="h-70vh">
              <img
                className="w-full h-full object-cover"
                src={banner.hinhAnh}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeBanner;
