export const actionsUsers={
    getUpdatedUsers:(user)=>({
        type:'UPDATE_USERS',
        payload:user
    }),
    setSelectedUser:(selectedUser)=>({
        type: 'SELECTED_USER',
        payload:selectedUser
    })
}