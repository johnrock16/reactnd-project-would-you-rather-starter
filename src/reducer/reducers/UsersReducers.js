import { actionTypes } from '../constants/usersConstants'

export const UsersReducer=(state=usersReducerDefaultValue, action)=>{
  switch (action.type) {
    // case actionTypes.UPDATE_USERS:
      // const mapusers=Object.keys(action.payload)
      // return { ...state, users: action.payload, mapusers:mapusers };
    case actionTypes.SELECTED_USER:
      return {...state, selectedUser:action.payload}
    case actionTypes.GET_ALL_USERS:
      const mapusers=Object.keys(action.payload)
      return {...state, users:action.payload,mapusers}
    default:
      return state;
  }
}

export const usersReducerDefaultValue = {
  users: [],
  mapusers:[],
}