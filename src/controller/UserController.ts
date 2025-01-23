import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { encrypt } from "../helpers/helpers"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, password, confirmPassword, email, age } = request.body;

        if (password !== confirmPassword) {
            return "Passwords do not match"
        }

        let hashPassword = await encrypt.encryptpass(password)
        console.log(hashPassword);
        

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            password: hashPassword,
            email,
            age
        })

        try {
            await this.userRepository.save(user)
            return  "User registered successfully";
        } catch (error) {
            return "Error registering user";
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { password, email } = request.body;

        const user = await this.userRepository.findOne({where: {email}})
        if (!user) {
            return "User not found"
        }

        const validPass = await encrypt.comparepassword(user.password, password)
        if (!validPass) {
            return "Email or password is not correct";
        }

        const token = encrypt.generateToken({
                id: user.id,
                role: user.role,
                email: user.email
            })
            
        return token;
    }
}