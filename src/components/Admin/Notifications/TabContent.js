import React, { PureComponent, Fragment } from 'react'

import Table from '../../UI/Table';
import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';

export default class TabContent extends PureComponent {

  state = {
    modalOpen: false
  }
  onAgree = () => {
    console.log('agree');
    this.setState({ modalOpen: false })
  }
  onDisagree = () => {
    console.log('disagree');
    this.setState({ modalOpen: false })
  }
  onRowClicked = index => {
    this.setState({ modalOpen: true, item: this.props.items[index] });
  }
  render() {
    let { fetchStatus } = this.props;
    if(fetchStatus === 1) 
      return (
        <Fragment>
          <Modal 
          modalID="expiredItemsModal"
          onAgree={this.onAgree}
          onDisagree={this.onDisagree}
          open={this.state.modalOpen}
          item={this.state.item} />
          <Table
            headerArray={this.props.header}
            body={this.props.items}
            onRowClicked={this.onRowClicked}/>
        </Fragment>
        
      )
    else if(fetchStatus === -1)
      return <center><h6>{this.props.fetchError}</h6></center>;
    else
      return (<center><Loader color="red" /></center>);
  }
}
