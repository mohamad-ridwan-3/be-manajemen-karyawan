const dataKaryawan = `
type DataKaryawan {
    id: String!
    jabatan: String!
    NIK: String!
    alamat: String!
    noTelp: String!
    tglLahir: String!
    divisi: String!
    gaji: String!
    tglBergabung: String!
}
`

const resultPostKaryawan = `
type ResultPostKaryawan {
    data: DataKaryawan!
}
`

export const karyawanSchemas = `
${dataKaryawan}
${resultPostKaryawan}
`