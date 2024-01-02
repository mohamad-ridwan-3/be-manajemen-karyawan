import { karyawanQuerys } from "../querys/karyawan.mjs"
import { usersQuery } from "../querys/users.mjs"
import { verifyQuery } from "../querys/verify.mjs"

export const query = `
type Query{
    ${usersQuery}
    ${verifyQuery}
    ${karyawanQuerys}
}
`