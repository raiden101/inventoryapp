import React from 'react';

export default props => {
  if(props.body.length === 0) 
    return <center><h6>"No data here..."</h6></center>
  
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
      onDoubleClick={
        props.onRowClicked ? props.onRowClicked.bind(this, index) : null
      }>
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
