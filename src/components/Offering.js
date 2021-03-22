import React from "react";
import Offer from "../data/offering.yml";

const Offering = () => {
  const Items = Offer.items.map((offer, key) => {
    return (
      <div className="offer_card" key={key}>
        <img src={offer.icon} alt="{offer.title}" />
        <h3>{offer.title} </h3>
        <p>{offer.text}</p>
      </div>
    );
  });
  return (
    <section id="offering" className="offering_section">
      <h2>{Offer.title}</h2>
      <div className="offers_list">
        {Items}
        </div>
    </section>
  );
};

export default Offering;
