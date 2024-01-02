import {karyawanRequest} from '../../mongodb/resolvers/karyawan.mjs'

const {
    postKaryawan: dataPostKaryawan
} = karyawanRequest

function postKaryawan(
    _,
    variable
){
    return dataPostKaryawan(variable)
}

export const karyawanResolvers = {
    postKaryawan
}