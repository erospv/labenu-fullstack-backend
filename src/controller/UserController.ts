import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupBusiness } from "../business/SignupBusiness";
import { SignupInputDTO, LoginInputDTO } from "../model/User";
import { LoginBusiness } from "../business/LoginBusiness";


export class UserController {

    async signup(req: Request, res: Response) {
        try {

            const singnupBusiness = new SignupBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )

            const signupData: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await singnupBusiness.execute(signupData)

            res.status(201).send({ token });

        } catch (error) {
            
            res.status(error.errorCode || 400).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        try {
            const loginBusiness = new LoginBusiness(
                new UserDatabase(),
                new HashManager(),
                new Authenticator()
            )

            const loginData: LoginInputDTO = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password
            };

            const token = await loginBusiness.execute(loginData)

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.errorCode || 400).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}    
