import React from 'react';

export default props => {
  let headerArray = props.headerArray;
  let hlen = headerArray.length;
  let headerJSX = headerArray.map((el, index) => {
    return <th key={index}>{el}</th>
  });

  let tableBodyJSX = props.body.map((el, index) => {
    let tds = [];
    for(let i=0;i<hlen;++i)
      tds.push(<td key={i}>{el[headerArray[i]]}</td>);
    return (
      <tr key={index} 
      onClick={props.onRowClicked.bind(this, index)}>
        {tds}
      </tr>
    );
  })
  return (
    <table className="highlight">
      <thead>
        <tr>{headerJSX}</tr>
      </thead>
      <tbody>
        {tableBodyJSX}
      </tbody>
    </table>
  )
}
