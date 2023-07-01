import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import AlertDialog from "./LuckyAlertDialog";
import { useRouter } from "next/router";

const Roulette: React.FC<{ data: any }> = ({ data }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [rouletteData, setRouletteData] = useState(data);
  const [productSelected, setProductSelected] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [isBlock, setIsBlock] = useState<boolean>(false);

  const handleShowResult = () => setOpen(true);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (mustSpin) {
      setProductSelected(rouletteData[prizeNumber]);
      setIsBlock(true);
    }
    if (!mustSpin && productSelected != null) handleShowResult();
  }, [prizeNumber, mustSpin]);

  console.log("productSelected", productSelected);

  useEffect(() => {
    const addShortString = data.map((item: any) => {
      return {
        id: item.id,
        completeOption: item.text,
        option:
          item.text.length >= 30
            ? item.text.substring(0, 30).trimEnd() + "..."
            : item.text,
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Wheel
        mustStartSpinning={mustSpin}
        spinDuration={0.2}
        prizeNumber={prizeNumber}
        data={rouletteData}
        outerBorderColor={"#ccc"}
        outerBorderWidth={9}
        innerBorderColor={"#f2f2f2"}
        radiusLineColor={"tranparent"}
        radiusLineWidth={1}
        textColors={["#f5f5f5"]}
        textDistance={55}
        fontSize={10}
        backgroundColors={[
          "#3f297e",
          "#175fa9",
          "#169ed8",
          "#239b63",
          "#64b031",
          "#efe61f",
          "#f7a416",
          "#e6471d",
          "#dc0936",
          "#e5177b",
          "#be1180",
          "#871f7f",
        ]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button
        onClick={handleSpinClick}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: "+9",
          borderRadius: "6rem",
          width: "4rem",
          height: "4rem",
          transform: "translate(-50%, -50%)",
          background: "white",
          color: " #000",
          fontSize: ".6rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Quay
      </button>
      <AlertDialog open={open} setOpen={setOpen} result={productSelected} />

      <div className="absolute top-5 right-5 inline-flex items-end">
        <button
          className="bg-slate-400 hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          onClick={() => router.back()}
        >
          Trở lại
        </button>
      </div>
    </div>
  );
};

export default Roulette;
