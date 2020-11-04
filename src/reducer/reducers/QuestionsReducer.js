import { actionTypes } from '../constants/questionsConstants'

export const QuestionsReducer=(state=questionsReducerDefaultValue, action)=>{
  switch (action.type) {
    case actionTypes.GET_ALL_QUESTIONS:
        const {answers,questions}=action.payload;

        const keysAnswers=Object.keys(answers)
        const keysQuestions=Object.keys(questions)

        const unAnsweredQuestions=keysQuestions.filter((item)=>(keysAnswers.indexOf(item)===-1))
        .map((item)=>(questions[item]))
        .sort((a,b)=>(a.timestamp<b.timestamp?1:-1))
        const answeredQuestions=keysAnswers.map((item)=>(questions[item]))
        .sort((a,b)=>(a.timestamp<b.timestamp?1:-1))

      return {...state, unAnsweredQuestions,answeredQuestions}
    default:
      return state;
  }
}

export const questionsReducerDefaultValue = {
  questions: [],
  unAnsweredQuestions:[],
  answeredQuestions:[]
}