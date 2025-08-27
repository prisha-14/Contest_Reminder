import React, { useEffect, useState } from "react";
import defaultSubscribtion from "../data/defaultSubscriptions";

const Platform = () => {
  const [subscribed, setSubscribed] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("host_sites"));
    if (!storedData) {
      localStorage.setItem("host_sites", JSON.stringify(defaultSubscribtion));
      setSubscribed(defaultSubscribtion);
    } else {
      setSubscribed(storedData);
    }
  }, []);

  const handleClick = (index) => {
    const updated = [...subscribed];
    updated[index].status = !updated[index].status;
    setSubscribed(updated);
    localStorage.setItem("host_sites", JSON.stringify(updated));
  };

  return (
    <>
      {subscribed.map((platform, index) => (
        <div className="item" key={index}>
          <img
            className="platform image"
            alt=""
            src={`images/${platform.host}.png`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "images/default.png";
            }}
          />
          <p className="site-name">{platform.name}</p>
          <input
            type="checkbox"
            checked={platform.status}
            onChange={() => handleClick(index)}
          />
        </div>
      ))}
    </>
  );
};

export default Platform;
