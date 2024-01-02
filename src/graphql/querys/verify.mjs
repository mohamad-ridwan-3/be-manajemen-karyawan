const resendToken = `
resendToken(
    role: String!,
    jwt: String,
    id: String!
): ResultResendToken
`
const verifyRegister = `
verifyRegister(
    kode: String!,
    jwt: String!,
    role: String!,
    id: String
): ResultVerify
`

const validateVerify =`
validateVerify(
    role: String!,
    jwt: String,
): ResultValidateVerify
`

export const verifyQuery = `
${resendToken}
${verifyRegister}
${validateVerify}
`