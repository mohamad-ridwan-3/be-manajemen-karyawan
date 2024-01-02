import jwt from 'jsonwebtoken'
const TOKEN_SECRET = process.env.TOKEN_BEARER_SECRET

export const verifyJwt = async (token) => {
    return await new Promise((resolve, reject)=>{
        jwt.verify(
            token,
            TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            }
        )
    })
}