
import jwt from 'jsonwebtoken'

export async function createAccesToken (user, secretKey) {
    try {
        const token = await jwt.sign(user, secretKey, {expiresIn: '1d'})
        return token
    } catch (err) {
        return err
    }
}
