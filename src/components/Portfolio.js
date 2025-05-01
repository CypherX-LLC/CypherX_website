import React from "react";
import Projects from "../data/portfolio.yml";
import { Link } from "gatsby";

const ItemTitle = ({item}) => {
  let title = item.link?<Link to={item.link}>{item.title}</Link>:item.title
  return ( item.link?<Link to={item.link}>{item.title}</Link>:item.title )
}

const Portfolio = () => {
  const Items = Projects.items.map((item, key) => {
    return (
      <div className="portfolio_item" key={key}>
        {/* <img src={item.icon} alt={`${item.title} project`} /> */}
        <h3>
          <ItemTitle item={item}/>
        </h3>
        <p>{item.text}</p>
      </div>
    );
  });
  return (
    <section id="portfolio_section" className="portfolio_section">
      <div className="container">
        <h2>{Projects.title}</h2>
        <p className="subtitle">{Projects.subtitle}</p>
        <div className="wrapper portfolio_grid">
          {Items}
          </div>
      </div>
    </section>
  );
};

export default Portfolio;
