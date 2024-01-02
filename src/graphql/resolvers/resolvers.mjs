import {userResolvers} from './users.mjs'
import {verifyResolvers} from './verify.mjs'
import {karyawanResolvers} from './karyawan.mjs'

export const resolvers = {
    Query: {
      ...userResolvers,
      ...verifyResolvers,
      ...karyawanResolvers
  }
}