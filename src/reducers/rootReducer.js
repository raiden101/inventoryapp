import * as invAT from "../actionTypes/inventory";

const initState = {
  invItems: [],
  invItemsFetchError: "",
  invItemsFetchStatus: 0 // 0 --> loading, 1 --> success, -1 --> failure
};

const successFetchingInvItems = (state, items) => {
  return {
    ...state,
    invItemsFetchError: "",
    invItemsFetchStatus: 1,
    invItems: [...state.invItems, ...items]
  };
};
const startFetchingInvItems = state => {
  return {
    ...state,
    invItemsFetchStatus: 0,
    invItemsFetchError: ""
  };
};
const failureFetchingInvItems = (state, err) => {
  return {
    ...state,
    invItemsFetchStatus: -1,
    invItemsFetchError: err
  };
};
const updateInvItem = (state, index, item) => {
  let copyInvitems = [...state.invItems];
  copyInvitems[index] = item;
  return {
    ...state,
    invItems: copyInvitems
  };
};
const addItemToInventory = (state, item) => {
  return {
    ...state,
    invItems: state.invItems.concat(item)
  }
}
const deleteInvItem = (state, index) => {
  let copyInvitems = [...state.invItems];
  copyInvitems.splice(index, 1);
  return{
    ...state,
    invItems: copyInvitems
  }
}



export default (state = initState, action) => {
  switch (action.type) {
    case invAT.START_FETCHING_INV_ITEMS:
      return startFetchingInvItems(state);
    case invAT.SUCCESS_FETCHING_INV_ITEMS:
      return successFetchingInvItems(state, action.invItems);
    case invAT.FAILURE_FETCHING_INV_ITEMS:
      return failureFetchingInvItems(state, action.error);
    case invAT.UPDATE_INV_ITEM:
      return updateInvItem(state, action.index, action.item);
    case invAT.ADD_ITEM_TO_INVENTORY:
      return addItemToInventory(state, action.item);
    case invAT.DELETE_INV_ITEM:
      return deleteInvItem(state, action.index);
    default:
      return { ...state };
  }
};
