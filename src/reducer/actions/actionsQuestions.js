export const actionsQuestions={
    getAllQuestions:({questions,answers})=>({
        type:'GET_ALL_QUESTIONS',
        payload:{questions,answers}
    }),
}