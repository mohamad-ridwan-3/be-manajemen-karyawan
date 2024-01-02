import { verifyRequest } from '../../mongodb/resolvers/verify.mjs'

const {
    resendToken: dataResendToken,
    verifyRegister: dataVerifyRegister,
    validateVerify: dataValidateVerify
} = verifyRequest

async function resendToken(
    _,
    variable
) {
    if(variable.role == 'lupa-password'){
        const data = await dataResendToken(variable)
        const newData = {
            _id: data._id,
            id: data.id,
            role: data.role,
            kode: data.kode,
            jwt: data.jwt,
            exp: data.exp
        }
        return {
            __typename: 'DataVerify',
            ...newData
        }
    }else if(variable.role == 'register-admin'){
        const data = await dataResendToken(variable)
        const newData = {
            _id: data._id,
            id: data.id,
            role: data.role,
            kode: data.kode,
            jwt: data.jwt,
            exp: data.exp
        }
        return {
            __typename: 'DataVerify',
            ...newData
        }
    }
}

function verifyRegister(
    _,
    variable
) {
    if (variable.role == 'register-admin') {
        return {
            __typename: 'ResultVerifyRegister',
            data: dataVerifyRegister(variable)
        }
    } else {
        return {
            __typename: 'ResultVerifyLupaPassword',
            data: dataVerifyRegister(variable)
        }
    }
}

function validateVerify(
    _,
    variable
){
    return {
        __typename: 'ResultValidateLupaPw',
        data: dataValidateVerify(variable)
    }
}

export const verifyResolvers = {
    resendToken,
    verifyRegister,
    validateVerify
}