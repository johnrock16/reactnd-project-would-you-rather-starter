const { _getUsers } = require("../../_DATA");

const usersAPI={
    getAllUsers:()=>_getUsers()
}

export { usersAPI };