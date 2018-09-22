import React from "react";
import { NavLink } from 'react-router-dom';

export default props => {
  let featuresJSX = props.adminFeatures.map((feature, index) => {
    return (
      <NavLink
        key={index}
        to={feature.path}
        className="collection-item"
        style={{ color: "var(--theme-color)", fontSize: "17px"}}
      >
        {feature.name}
      </NavLink>
    );
  });
  return <div className="collection noMargin">{featuresJSX}</div>
};
