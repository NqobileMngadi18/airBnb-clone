import React from "react";
import Card from "./card";
import "./styles.css";

function Cards({ list = [] }) {   // ✅ default value so list is never undefined
  return (
    <div className="cards-flex">
      {list.length > 0 ? (
        list.map((card, i) => <Card card={card} key={i} />)
      ) : (
        <p>No cards available</p>
      )}
    </div>
  );
}

export default Cards;
