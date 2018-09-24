import React, { PureComponent } from 'react'

import Table from '../../UI/Table';
import Loader from '../../UI/Loader';

export default class TabContent extends PureComponent {
  render() {
    let { fetchStatus } = this.props;
    if(fetchStatus === 1) 
      return (
        <Table
          headerArray={this.props.header}
          body={this.props.items}
          onRowClicked={this.props.onRowClicked}/>
      )
    else if(fetchStatus === -1)
      return <center><h6>{this.props.fetchError}</h6></center>;
    else
      return (<center><Loader color="red" /></center>);
  }
}
