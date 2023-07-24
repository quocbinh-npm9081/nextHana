import React, { useState } from "react";
import dynamic from "next/dynamic";
const Roulette = dynamic(() => import("@/components/Roulette"), { ssr: false });
const MiniGame = () => {
  //dummi data
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
        backgroundImage: `url("/static/images/backgrounds/background-birthday-2023-20.jpg")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Roulette inputList={inputList} />
    </div>
  );
};

export default MiniGame;
