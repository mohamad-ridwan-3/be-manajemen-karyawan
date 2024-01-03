import { setDate } from '../../utils/dayjs/setDate.mjs'
import {karyawanDB} from '../models/karyawan.mjs'
import { usersDB } from '../models/users.mjs'

async function postKaryawan(variable){
    const {
        id,
        jabatan,
        NIK,
        alamat,
        noTelp,
        tglLahir,
        divisi,
        gaji,
        tglBergabung,
        statusKaryawan
    } = variable

    // async function validateUser(){
    //     try {
    //         const isUser = await usersDB.findOne({role: 'User', id, isVerification: true})
    //         return isUser
    //     } catch (error) {
    //         return error            
    //     }
    // }
    // const isUser = await validateUser()
    // if(isUser?.role !== 'User'){
    //     throw new Error('data user tidak terdaftar')
    // }

    async function checkUserInKaryawan(){
        try {
            const isUser = await karyawanDB.findOne({id})
            return isUser
        } catch (error) {
            return error            
        }
    }
    const isKaryawan = await checkUserInKaryawan()
    if(isKaryawan?.id){
        throw new Error('data karyawan sudah terdaftar')
    }

    async function setupData(){
        const post = new karyawanDB({
            id,
            jabatan,
            NIK,
            alamat,
            noTelp,
            tglLahir,
            divisi,
            gaji,
            tglBergabung,
            statusKaryawan
        })

        try {
            const result = await post.save()
            return result
        } catch (error) {
            return error            
        }
    }
    const resultDataKaryawan = await setupData()
    if(!resultDataKaryawan){
        throw new Error('Internal Server Error')
    }
    return {data: resultDataKaryawan}
}

export const karyawanRequest = {
    postKaryawan
}