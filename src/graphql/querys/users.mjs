const users = `
users(limit: String, page: String, sort: String):[Users]
`
const postUsers = `
postUsers(
    id: String!,
    role: String!,
    isDefaultAdmin: String!,
    nama: String!,
    email: String!,
    fotoProfil: String!,
    password: String!,
    isVerification: String!
): PostUser
`
const login = `
login(
    email: String!,
    password: String!
): Token
`
const authSession = `
authSession(token: String!): PostUser
`
const deleteUsers = `
deleteUsers(id: [String]!): ResultDeleteUsers
`
const reqLupaPassword = `
reqLupaPassword(email: String!): DataVerify!
`
const resetPassword = `
resetPassword(
    id: String!,
    email: String!,
    newPassword: String!
):MessageStatus!
`

export const usersQuery = `
${users}
${postUsers}
${login}
${authSession}
${deleteUsers}
${reqLupaPassword}
${resetPassword}
`