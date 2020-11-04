import { actionsQuestions } from "../actions/actionsQuestions"

import {questionsAPI} from '../api/questions';

export const questionsThunks={
    getAllQuestions:(answers)=>dispatch=>{
        questionsAPI.getAllQuestions().then(questions=>dispatch(actionsQuestions.getAllQuestions({questions,answers})))
    }
}