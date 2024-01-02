import jwt from 'jsonwebtoken'
const TOKEN_SECRET = process.env.TOKEN_BEARER_SECRET

export const setJwt = async (id)=>{
    return await new Promise((resolve, reject)=>{
        jwt.sign({
            id,
        },
            TOKEN_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            }
        )
    })
}