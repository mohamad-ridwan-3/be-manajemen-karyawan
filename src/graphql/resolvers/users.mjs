import { userRequests } from "../../mongodb/resolvers/users.mjs"

const {
    getUsers,
    postUser: dataPostUser,
    login: dataLogin,
    authSession: dataAuthSession,
    deleteUsers: dataDeleteUsers,
    reqLupaPassword: dataReqLupaPassword,
    resetPassword: dataResetPassword
} = userRequests

function users(
    _,
    variable,
) {
    return getUsers(variable)
}

function postUsers(
    _,
    variable
){
    return dataPostUser(variable)
}

function login(
    _,
    variable
){
    return dataLogin(variable)
}

function authSession(
    _,
    variable
){
    return dataAuthSession(variable)
}

function deleteUsers(
    _,
    variable
){
    return dataDeleteUsers(variable)
}

function reqLupaPassword(
    _,
    variable
){
    return dataReqLupaPassword(variable)
}

function resetPassword(
    _,
    variable
){
    return dataResetPassword(variable)
}

export const userResolvers = {
    users,
    postUsers,
    login,
    authSession,
    deleteUsers,
    reqLupaPassword,
    resetPassword
}