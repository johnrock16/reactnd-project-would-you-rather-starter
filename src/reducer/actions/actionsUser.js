export const actionsUser={
    setUser:(newUserData)=>({
        type: 'SET_USER',
        payload: newUserData
    }),
    clearUser:()=>({
        type: 'CLEAR_USER'
    }),
    setQuestion:(newQuestion)=>({
        type: 'SET_QUESTION',
        payload: newQuestion
    }),
    addAnswer:(key,answer)=>({
        type: 'ADD_ANSWER',
        payload:{key,answer}
    })
}