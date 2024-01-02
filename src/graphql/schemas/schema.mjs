import { query } from './index.mjs'
import {usersSchemas} from './users.mjs'
import {verifySchemas} from './verify.mjs'
import {karyawanSchemas} from './karyawan.mjs'

export const schema = `#graphql
${usersSchemas}

${verifySchemas}

${karyawanSchemas}

${query}
`