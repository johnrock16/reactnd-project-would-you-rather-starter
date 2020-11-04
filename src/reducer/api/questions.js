const { _getQuestions } = require("../../_DATA");

const questionsAPI={
    getAllQuestions:()=>_getQuestions()
}

export {questionsAPI}