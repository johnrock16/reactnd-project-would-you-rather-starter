import { actionTypes } from '../constants/userConstants'

export const UserReducer=(state=userReducerDefaultValue, action)=>{
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.CLEAR_USER:
      return { ...state, user:userReducerDefaultValue.user};
    case actionTypes.SET_QUESTION:
      return {...state,selectedQuestion:action.payload};
     case actionTypes.ADD_ANSWER:
      const {key,answer} = action.payload;
      return{...state,user:{...state.user,answers:{...state.user.answers,[key]:answer}},selectedQuestion:{...state.selectedQuestion,[answer]:{...state.selectedQuestion[answer],votes:[...state.selectedQuestion[answer].votes,state.user.id]},toAnswer:false}}
    default:
      return state;
  }
}

export const userReducerDefaultValue = {
  user: {
    id: '',
    name: '',
    avatarURL: '',
    questions: [],
    answers: {},
    isLogged:false,
  },
  selectedQuestion: {},
  setUser: () => { },
  setQuestion: () => { },
  clearUser: () => { },
  addAnswer: () => { },
}