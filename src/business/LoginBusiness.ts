
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { InvalidParameterError } from "../error/InvalidParameterError";


export class LoginBusiness {
	constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

	public async execute(input: LoginInputDTO): Promise<string> {
       
         if(!input.emailOrNickname || !input.password) {
             throw new InvalidParameterError("Fill all the fields")
         }
         
         const user = await this.userDatabase.getUserByEmailOrNickname(input.emailOrNickname);
         
         if(!user) {
             throw new UnauthorizedError("Incorrect email or password")
         }
         
         const hashCompare = await this.hashManager.compare(
             input.password,
             user.getPassword()
         );

         if (!hashCompare) {
             throw new UnauthorizedError("Incorrect email or password");
         }

         const accessToken = this.authenticator.generateToken({
             id: user.getId(),
         });
         
         return accessToken;       
	}
}

export interface LoginInputDTO {
	emailOrNickname: string;
	password: string;
}
