import { actionsUsers } from "../actions/actionsUsers"

const { usersAPI } = require("../api/users")

export const userThunks={
    getAllUsers:()=>dispatch=>{
        usersAPI.getAllUsers().then(users=>dispatch(actionsUsers.getAllUsers(users)))
    }
}