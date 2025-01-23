import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Payload } from "../dto/user.dto";
dotenv.config();

export class encrypt {
    static async encryptpass(password: string) {
        return bcrypt.hashSync(password, 12);
    }

    static async comparepassword(hashPassword: string, password) {
        return bcrypt.compareSync(password, hashPassword)
    }

    static async generateToken(payload: Payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"} )
    }
}