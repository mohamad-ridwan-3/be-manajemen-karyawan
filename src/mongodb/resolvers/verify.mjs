import { generateKode } from '../../utils/generateKode.mjs'
import { setExp } from '../../utils/setExp.mjs'
import { setJwt } from '../../utils/setJwt.mjs'
import { usersDB } from '../models/users.mjs'
import { verifyDB } from '../models/verify.mjs'

async function validateVerify(variable) {
    const { role } = variable

    if (role == 'lupa-password') {
        return validateVerifyLupaPassword(variable)
    }else if(role == 'register-admin'){
        return validateVerifyRegisterAdmin(variable)
    }
}

async function validateVerifyRegisterAdmin(variable){
    const {
        role,
        jwt
    } = variable

    const findToken = await verifyDB.findOne({
        role,
        jwt,
    })
    if (!findToken) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    const getUser = await usersDB.findOne({
        id: findToken?.id
    })
    if (!getUser) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    return getUser
}

async function validateVerifyLupaPassword(variable) {
    const {
        role,
        jwt,
    } = variable

    const findToken = await verifyDB.findOne({
        role,
        jwt,
    })
    if (!findToken) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    const getUser = await usersDB.findOne({
        id: findToken?.id
    })
    if (!getUser) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    return getUser
}

async function verifyRegister(variable) {
    const {
        role
    } = variable

    if (
        role !== 'register-admin' &&
        role !== 'lupa-password'
    ) {
        throw new Error('Variabel tidak valid')
    }

    if (role == 'register-admin') {
        return verifyRegisterAdmin(variable)
    } else if (role == 'lupa-password') {
        return verifyLupaPassword(variable)
    }
}

async function verifyRegisterAdmin(variable) {
    const {
        kode,
        jwt,
        role
    } = variable

    async function vaildateKode() {
        try {
            const check = await verifyDB.findOne({ kode, jwt, role })
            return check
        } catch (error) {
            return error
        }
    }

    const result = await vaildateKode()
    if (!result) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    async function deleteVerify() {
        try {
            const data = await verifyDB.deleteOne({
                kode,
                jwt,
                role
            })
            return data
        } catch (error) {
            return error
        }
    }
    const isDeleted = await deleteVerify()
    if (!isDeleted) {
        throw new Error('Internal Server Error')
    }
    async function updateAdmin() {
        try {
            const updated = await usersDB.updateOne(
                {
                    id: result.id,
                },
                {
                    isVerification: true
                })
            return updated
        } catch (error) {
            return error
        }
    }
    const isUpdatedAdmin = await updateAdmin()
    if (!isUpdatedAdmin) {
        throw new Error('Internal Server Error')
    }
    return { message: 'Admin berhasil di verifikasi', status: 201 }
}
// 
async function verifyLupaPassword(variable) {
    const {
        role,
        kode,
        jwt,
        id,
    } = variable

    const currentDate = (new Date()).valueOf()

    async function vaildateKode() {
        try {
            const verify = await verifyDB.findOne({
                role,
                jwt,
                kode,
                id
            })
            return verify
        } catch (error) {
            return error
        }
    }

    const dataVerify = await vaildateKode()
    if (!dataVerify) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    const expKode = (new Date(dataVerify.exp)).valueOf()
    if (currentDate > expKode) {
        throw new Error('Token tidak valid atau sudah kedaluarsa')
    }
    // async function deleteVerify() {
    //     try {
    //         const dataDeleted = await verifyDB.deleteOne({ role: 'lupa-password', id })
    //         return dataDeleted
    //     } catch (error) {
    //         return error
    //     }
    // }
    // const verifyIsDeleted = await deleteVerify()
    // if (!verifyIsDeleted) {
    //     throw new Error('Internal Server Error')
    // }
    return { message: 'Berhasil diverifikasi', status: 200 }
}

async function resendToken(variable) {
    const {
        role,
    } = variable

    if (
        role !== 'register-admin' &&
        role !== 'lupa-password'
    ) {
        throw new Error('Variabel tidak valid')
    }

    if (role == 'register-admin') {
        return resendTokenVerifyAdmin(variable)
    } else if (role == 'lupa-password') {
        return resendTokenVerifyLupaPassword(variable)
    }
}

async function resendTokenVerifyAdmin(variable) {
    const {
        role,
        id
    } = variable

    const newJwt = await setJwt(id)

    async function resetToken() {
        const verify = await verifyDB.updateOne(
            {
                id,
                role,
            },
            {
                kode: generateKode(),
                jwt: newJwt,
                exp: setExp()
            })
        return verify
    }

    const result = await resetToken()
    if (result?.modifiedCount !== 1) {
        throw new Error('Internal Server Error')
    }
    const currentToken = await verifyDB.findOne({
        role,
        id,
        jwt: newJwt
    })
    if (!currentToken?.id) {
        throw new Error('Internal Server Error')
    }
    return currentToken
}

async function resendTokenVerifyLupaPassword(variable) {
    const {
        role,
        id
    } = variable

    const newJwt = await setJwt(id)

    async function updateKode() {
        const updated = await verifyDB.updateOne(
            {
                role,
                id
            },
            {
                kode: generateKode(),
                jwt: newJwt,
                exp: setExp()
            })
        return updated
    }

    const resultUpdated = await updateKode()
    if (resultUpdated?.modifiedCount !== 1) {
        throw new Error('Internal Server Error')
    }
    const currentToken = await verifyDB.findOne({
        role,
        id,
        jwt: newJwt
    })
    if (!currentToken?.id) {
        throw new Error('Internal Server Error')
    }
    return currentToken
}

export const verifyRequest = {
    resendToken,
    verifyRegister,
    validateVerify
}