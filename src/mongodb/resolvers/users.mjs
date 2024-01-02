import { generateKode } from "../../utils/generateKode.mjs"
import { setExp } from "../../utils/setExp.mjs"
import { setJwt } from "../../utils/setJwt.mjs"
import { verifyJwt } from "../../utils/verifyJwt.mjs"
import { usersDB } from "../models/users.mjs"
import { verifyDB } from '../models/verify.mjs'

async function resetPassword(variable) {
    const {
        id,
        email,
        newPassword
    } = variable

    async function changePassword() {
        try {
            const isChanged = await usersDB.updateOne(
                {
                    id,
                    email,
                    isVerification: true,
                },
                {
                    password: newPassword
                })
            return isChanged
        } catch (error) {
            return error
        }
    }
    const resultResetPw = await changePassword()
    if (resultResetPw?.modifiedCount !== 1) {
        throw new Error('Internal Server Error')
    }
    async function deleteVerify() {
        try {
            const isDeleted = await verifyDB.deleteOne({
                id,
                role: 'lupa-password'
            })
            return isDeleted
        } catch (error) {
            return error
        }
    }
    const verifyIsDeleted = await deleteVerify()
    if (!verifyIsDeleted) {
        throw new Error('Internal Server Error')
    }
    return { message: 'berhasil reset password', status: 201 }
}

const getUsers = async (variable) => {
    const {
        limit = 10,
        page = 1,
        sort = -1
    } = variable

    async function user() {
        try {
            const users = usersDB.find()
                .sort({ _id: Number(sort) })
                .limit(Number(limit) * 1)
                .skip((Number(page) - 1) * Number(limit))
                .exec()
                .then(res => res)
                .catch(err => err)
            return users
        } catch (error) {
            console.log(error)
        }
    }

    const users = await user()

    if (!users) {
        console.log('no users found')
        return []
    }
    return users
}

const postUser = (variable) => {
    const {
        role
    } = variable

    if (
        role !== 'Admin' &&
        role !== 'User'
    ) {
        throw new Error('Variabel tidak valid')
    }

    return postAdmin(variable)
}

// post admin
async function postAdmin(variable) {
    const {
        id,
        role,
        nama,
        email,
        fotoProfil,
        password,
        isVerification,
        isDefaultAdmin
    } = variable

    async function findUser() {
        try {
            const user = usersDB.findOne({
                email,
                isVerification: true
            })
            return user
        } catch (error) {
            return error
        }
    }

    const userAvailable = await findUser()

    if (userAvailable) {
        throw new Error('Akun telah digunakan')
    }

    const post = new usersDB({
        id,
        role,
        isDefaultAdmin,
        nama,
        email,
        fotoProfil,
        password,
        isVerification
    })

    async function push() {
        try {
            const pushData = post.save()
            return pushData
        } catch (error) {
            return error
        }
    }

    if (role == 'Admin') {
        // kalau admin sedang proses verifikasi
        const currentUser = await usersDB.findOne({
            email,
            isVerification: false
        })
        if (currentUser) {
            const currentVerify = await verifyDB.findOne({ id: currentUser.id, role: 'register-admin' })
            throw new Error(`Akun perlu diverifikasi#${currentVerify.jwt}`)
        }
        async function pushVerify() {
            const post = new verifyDB({
                id,
                role: 'register-admin',
                kode: generateKode(),
                jwt: await setJwt(id),
                exp: setExp()
            })

            async function pushDataVerify() {
                try {
                    const pushData = post.save()
                    return pushData
                } catch (error) {
                    return error
                }
            }

            return await pushDataVerify()
        }

        const resultDataVerify = await pushVerify()
        if (!resultDataVerify) {
            throw new Error('Terjadi kesalahan saat generate verifikasi')
        }
        const resultPost = await push()
        if (!resultPost) {
            throw new Error('Terjadi kesalahan saat mendaftarkan akun')
        }
        const dataUser = resultPost._doc
        const result = { ...dataUser, jwt: resultDataVerify.jwt, kode: resultDataVerify.kode }
        return result
    } else {
        const resultPost = await push()
        const dataUser = resultPost._doc
        if (!resultPost) {
            throw new Error('Terjadi kesalahan saat mendaftarkan akun')
        }
        return dataUser
    }
}

async function login(variable) {
    const {
        email,
        password
    } = variable

    async function findUser() {
        try {
            const user = usersDB.findOne({
                email,
                password,
                isVerification: true
            })
            return user
        } catch (error) {
            return error
        }
    }

    const user = await findUser()
    if (!user) {
        throw new Error('Akun tidak terdaftar')
    }
    const token = await setJwt(user.id)
    if (!token) {
        throw new Error('Terjadi kesalahan server')
    }
    return { token }
}

async function authSession(variable) {
    const {
        token
    } = variable

    const verify = await verifyJwt(token)
    if (!verify) {
        throw new Error('Token tidak valid')
    }

    async function findToken() {
        return await new Promise(async (resolve, reject) => {
            const findUser = await usersDB.findOne({ id: verify?.id, isVerification: true })
            if (!findUser) {
                reject('Akun tidak terdaftar')
            }
            resolve(findUser)
        })
    }

    const users = await findToken()
    if (!users) {
        throw new Error('Akun tidak ditemukan')
    }
    return users
}

async function deleteUsers(variable) {
    // id is an array
    const {
        id
    } = variable

    async function pushDelete() {
        try {
            const pushToDelete = usersDB.deleteMany({
                id: { $in: id }
            })
            return pushToDelete
        } catch (error) {
            return error
        }
    }

    const isDeleted = await pushDelete()
    if (isDeleted?.deletedCount === 0) {
        throw new Error('Akun tidak ditemukan')
    }
    return { id }
}

async function reqLupaPassword(variable) {
    const {
        email
    } = variable

    async function findUser() {
        try {
            const user = await usersDB.findOne({ email, isVerification: true })
            return user
        } catch (error) {
            return error
        }
    }
    const currentUser = await findUser()
    if (!currentUser) {
        throw new Error('Akun tidak terdaftar')
    }
    // validate to check kode in db first
    async function validateKode() {
        try {
            const data = await verifyDB.findOne({
                id: currentUser.id,
                role: 'lupa-password'
            })
            return data
        } catch (error) {
            return data
        }
    }
    const resultValidate = await validateKode()
    if (resultValidate?._doc) {
        const newData = resultValidate._doc
        return {
            ...newData,
            message: 'Akun perlu diverifikasi'
        }
    }

    async function pushVerify() {
        const post = new verifyDB({
            id: currentUser.id,
            role: 'lupa-password',
            kode: generateKode(),
            jwt: await setJwt(currentUser.id),
            exp: setExp()
        })

        try {
            const postData = await post.save()
            return postData
        } catch (error) {
            return error
        }
    }
    const resultVerify = await pushVerify()
    if (!resultVerify) {
        throw new Error('Internal Server Error')
    }
    return resultVerify
}

export const userRequests = {
    getUsers,
    postUser,
    login,
    authSession,
    deleteUsers,
    reqLupaPassword,
    resetPassword
}