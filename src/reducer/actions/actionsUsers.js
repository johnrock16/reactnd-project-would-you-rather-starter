export const actionsUsers={
    getUpdatedUsers:(user)=>({
        type:'UPDATE_USERS',
        payload:user
    }),
    getAllUsers:(users)=>({
        type:'GET_ALL_USERS',
        payload:users
    }),
    setSelectedUser:(selectedUser)=>({
        type: 'SELECTED_USER',
        payload:selectedUser
    })
}