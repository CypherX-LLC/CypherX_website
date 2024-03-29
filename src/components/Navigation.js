import React from "react"
import { Link } from "gatsby"
import Navigation from "../data/navigation.yml"

const Nav = () => {
  const Items = Navigation.map((item, key) => {
    return (
      <div className="menuItem" key={key}>
        <Link to={item.link}>
          {item.title}
        </Link>
      </div>
    )
  })
  return <div className="top_nav hidden_small">{Items}</div>
}

export default Nav
