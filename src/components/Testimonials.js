import React from "react";
import Testimonis from "../data/testimonials.yml";

const Testimonials = () => {
  const Icon = (prop) => {
    return (
      prop.icon ? <img src={prop.icon} alt="icon" /> : ""
    )
  }
  const Items = Testimonis.items.map((tm, key) => {
    return (
      <div className="testimonial_card" key={key}>
        <Icon icon={tm.icon}/>
        <p className="quote">
          <img src="/svg/QMark.svg" alt="Quote Mark" />
          {tm.quote}{" "}
        </p>
        <h4>{tm.name}</h4>
        <p>{tm.position}</p>
      </div>
    );
  });
  return (
    <section id="testimonials_section" className="testimonials">
      <div className="wrapper">
        <div className="testimonials_head">
          <h2>
            <img src="/svg/QuoteMark.svg" alt="Quote Mark" />
            {Testimonis.title}
          </h2>
          <p>{Testimonis.subtitle}</p>
        </div>
        <div className="testimonials_list">{Items}</div>
      </div>
    </section>
  );
};

export default Testimonials;
