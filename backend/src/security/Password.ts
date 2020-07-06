import bcrypt from 'bcrypt'
import has = Reflect.has

const SALT_ROUNDS = 10

export class Password {

    static hashPassword = async (password: string) => {
        return await bcrypt.hash(password, SALT_ROUNDS)
    }

    static compare = async (inputValue: string, hash: string) => {
        return await bcrypt.compare(inputValue, hash)
    }

}