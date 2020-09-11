import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { User } from "../model/User";

export class SignupBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager, 
        private authenticator: Authenticator
    ) {}

    async execute(input: SignupInputDTO): Promise<string> {
        if (!input.name || !input.email || !input.password || !input.nickname) {
            throw new InvalidParameterError("Fill all the fields");
        }
    
        if (input.email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email");
        }
    
        if (input.password.length < 6) {
            throw new InvalidParameterError("Invalid password");
        }
    
        const id = this.idGenerator.generate();
    
        const hashPassword = await this.hashManager.hash(input.password);
           
        const user = User.toUserModel({
            ...input,
            id: id,
            password: hashPassword
        })
        await this.userDatabase.createUser(user)
        
    
        const accessToken = this.authenticator.generateToken({
            id,
        });
        console.log(accessToken)
        return accessToken;
    }
}

export interface SignupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string
}

