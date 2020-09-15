import { LoginBusiness } from "../../src/business/LoginBusiness";
import { User, LoginInputDTO } from "../../src/model/User";


describe("Testing the LoginBusiness 'execute' method", ()=>{

    let userDatabase = {}
    let hashManager = {};
    let authenticator = {
        generateToken: jest.fn(()=> "token")
    };

    test("Should resturn an error when try login without email or nickname", async ()=>{

        try {
            const loginBusiness = new LoginBusiness(
                userDatabase as any,
                hashManager as any,
                authenticator as any
            );

            const loginInput: LoginInputDTO = {
                emailOrNickname: "",
                password: "123456"
            }

            await loginBusiness.execute(loginInput);
            
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Fill all the fields");
        }
    });

    test("Should resturn an error when try login without password", async ()=>{

        try {

            const loginBusiness = new LoginBusiness(
                userDatabase as any,
                hashManager as any,
                authenticator as any
            );

            const loginInput: LoginInputDTO = {
                emailOrNickname: "eros@gmail.com",
                password: ""
            }

            await loginBusiness.execute(loginInput);
            
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Fill all the fields");
        }
    });

    test("Should return an error when try login with wrong password", async ()=>{
        expect.assertions(4)

        let getUserByEmailOrNickname = jest.fn((emailOrNickname: string) => {
            return new User("id", "Manu Chao", "clandestino@gmail.com", "ManoNegra", "mala-vida")
        })
        let compareHash =  jest.fn(((password: string, userPassword: string) => false))
        
        userDatabase = { getUserByEmailOrNickname }
        hashManager = { compareHash }
        try {
            const loginBusiness = new LoginBusiness(
                userDatabase as any,
                hashManager as any,
                authenticator as any
            );
           
            const loginInput: LoginInputDTO = {
                emailOrNickname: "clandestino@gmail.com",
                password: "12"
            }

            await loginBusiness.execute(loginInput);
            
        } catch (error) {
            expect(error.errorCode).toBe(401);
            expect(error.message).toEqual("Incorrect email or password");
            expect(getUserByEmailOrNickname).toHaveBeenCalledWith("clandestino@gmail.com")
            expect(compareHash).toHaveBeenCalledWith("12", "mala-vida")
        }
    });

    test("Should return an error when try login with unregistered email", async ()=>{
        expect.assertions(3)

        let getUserByEmailOrNickname = jest.fn((emailOrNickname: string) => undefined)
         
        userDatabase = { getUserByEmailOrNickname }
               
        try {
            const loginBusiness = new LoginBusiness(
                userDatabase as any,
                hashManager as any,
                authenticator as any
            );

            const loginInput: LoginInputDTO = {
                emailOrNickname: "mano-negra@gmail.com",
                password: "123456"
            }

            await loginBusiness.execute(loginInput);
            
        } catch (error) {
            expect(error.errorCode).toBe(401);
            expect(error.message).toEqual("Incorrect email or password");
            expect(getUserByEmailOrNickname).toHaveBeenCalledWith("mano-negra@gmail.com")
        }
    });

    test("Returns token whit a successful login attempt", async ()=>{
        
        let getUserByEmailOrNickname = jest.fn((emailOrNickname: string) => {
            return new User("id", "Manu Chao", "clandestino@gmail.com", "ManoNegra", "mala-vida")
        })
        let compareHash =  jest.fn(((password: string, userPassword: string) => true))
        
        userDatabase = { getUserByEmailOrNickname }
        hashManager = { compareHash }
               
        const loginBusiness = new LoginBusiness(
            userDatabase as any,
            hashManager as any,
            authenticator as any
        );

        const loginInput: LoginInputDTO = {
            emailOrNickname: "clandestino@gmail.com",
            password: "mala-vida"
        }

        await loginBusiness.execute(loginInput);

        expect(getUserByEmailOrNickname).toHaveBeenCalledWith("clandestino@gmail.com")
        expect(compareHash).toHaveBeenCalledWith("mala-vida", "mala-vida")
        expect(authenticator.generateToken).toHaveReturnedWith("token")
    });

})    