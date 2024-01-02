const resendToken = `
type ResendToken{
    typename: String!
    jwt: String!
}
`
const dataVerify = `
type DataVerify {
    id: String!
    role: String!
    kode: String!
    jwt: String!
    exp: String!
    message: String
}
`

const messageStatus = `
type MessageStatus{
    message: String!
    status: ID!
}
`

const resultVerifyRegister = `
type ResultVerifyRegister{
    data: MessageStatus!
}`

const resultVerifyLupaPassword = `
type ResultVerifyLupaPassword{
    data: MessageStatus!
}
`

const resultValidateVerifyLupaPw = `
type ResultValidateLupaPw{
    data: Users!
}
`

const UNION_ResendToken = `union ResultResendToken = ResendToken | DataVerify`
const UNION_ResultVerify = `union ResultVerify = ResultVerifyRegister | ResultVerifyLupaPassword`
const UNION_ResultValidateVerify = `union ResultValidateVerify = ResultValidateLupaPw`

export const verifySchemas = `
${messageStatus}
${resendToken}
${dataVerify}
${resultVerifyRegister}
${resultVerifyLupaPassword}
${resultValidateVerifyLupaPw}
${UNION_ResendToken}
${UNION_ResultVerify}
${UNION_ResultValidateVerify}
`