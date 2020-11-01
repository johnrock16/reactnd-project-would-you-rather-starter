export const UserReducer=(state, action)=>{
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.payload };
    case 'clearuser':
      return { ...state, user:userReducerDefaultValue.user};
    case 'setQuestion':
      return {...state,selectedQuestion:action.payload};
     case 'addAnswer':
      const {key,answer} = action.payload;
      return{...state,user:{...state.user,answers:{...state.user.answers,[key]:answer}},selectedQuestion:{...state.selectedQuestion,[answer]:{...state.selectedQuestion[answer],votes:[...state.selectedQuestion[answer].votes,state.user.id]},toAnswer:false}}
    default:
      throw new Error();
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