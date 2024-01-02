const postKaryawan = `
postKaryawan(
    id: String!,
    jabatan: String!,
    NIK: String!,
    alamat: String!,
    noTelp: String!,
    tglLahir: String!,
    divisi: String!,
    gaji: String!
): ResultPostKaryawan
`

export const karyawanQuerys = `
${postKaryawan}
`