import React from "react";
import UnesiDijagnozu from "./UnesiDijagnozu";
import NovaDonacija from "./NovaDonacija";
import './Dijagnoza.css'
import './NovaDonacija.css'



const Unosi = () => {
  return (
    <div>
          <NovaDonacija />
          <UnesiDijagnozu />
    </div>
  );
};

export default Unosi;
