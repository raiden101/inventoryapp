import React from "react";
import { NavLink } from 'react-router-dom';

export default props => {
  let linkClassName = "collection-item " + props.fontColor;
  let featuresJSX = props.features.map((feature, index) => {
    return (
      <NavLink
        key={index}
        to={feature.path}
        className={linkClassName}
        style={{ fontSize: '17px', fontWeight: 500 }}
      >
        {feature.name}
      </NavLink>
    );
  });
  return <div className="collection noMargin">{featuresJSX}</div>
};
