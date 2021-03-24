import React from 'react'
import aboutData from "../data/about.yml";

const Members = aboutData.members.map((member, k) => {
  return (
    <div className="team-card" >
      <img src={member.image} alt={member.title} />
      <h3>{member.title}</h3>
    </div>
  );
});
export default Members;