import React from "react";
//import Img from "gatsby-image";
import Feats from "../data/features.yml";
import { Link } from "gatsby";

const ItemTitle = ({item}) => {
  let title = item.link?<Link to={item.link}>{item.title}</Link>:item.title
  return ( item.link?<Link to={item.link}>{item.title}</Link>:item.title )
}

const Features = () => {
  const Items = Feats.items.map((item, key) => {
    return (
      <div className="feature_item" key={key}>
        {/* <img src={item.icon} alt="Gatsby Docs are awesome" /> */}
        <h3>
          <ItemTitle item={item}/>
        </h3>
        <p>{item.text}</p>
      </div>
    );
  });
  return (
    <section id="features" className="features_section">
      <div className="container">
        <h2>{Feats.title}</h2>
        <p className="subtitle">{Feats.subtitle}</p>
        <div className="wrapper features_grid">
          {Items}
          </div>
      </div>
    </section>
  );
};

export default Features;
