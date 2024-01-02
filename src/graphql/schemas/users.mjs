export const usersSchema = `
type Users{
    id: String!
    role: String!
    nama: String!
    email: String!
    fotoProfil: String!
    password: String!
    isVerification: String!
    isDefaultAdmin: String!
}
`

export const postUsers = `
type PostUser{
    id: String!
    role: String!
    isDefaultAdmin: String!
    nama: String!
    email: String!
    fotoProfil: String!
    password: String!
    isVerification: String!
    message: String
    status: String
    jwt: String
    kode: String
}
`

export const token = `
type Token{
    token: String!
}
`

export const login = `
type Login{
    email: String!
    password: String!
}
`

export const resultDeleteUsers = `
type ResultDeleteUsers{
    id: [String!]
}
`

export const usersSchemas = `
${usersSchema}
${postUsers}
${token}
${login}
${resultDeleteUsers}
`