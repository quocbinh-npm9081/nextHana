import React, { useState } from "react";
import Roulette from "@/components/Roulette";
// const bg = require("/static/images/backgrounds/background-tet-2023-20.jpg");

const MiniGame = () => {
  const [inputList, setInputList] = useState([
    {
      id: "0xcz",
      text: "Binh",
    },
    {
      id: "1zxc",
      text: "An",
    },
    {
      id: "2zxc",
      text: "Link",
    },
    {
      id: "3zxc",
      text: "nhi",
    },
    {
      id: "zxc4",
      text: "tuan",
    },
    {
      id: "zxc5",
      text: "Bay",
    },
  ]);

  return (
    <div
      style={{
        backgroundImage: `url("/static/images/backgrounds/background-tet-2023-20.jpg")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Roulette data={inputList} />
    </div>
  );
};

export default MiniGame;
