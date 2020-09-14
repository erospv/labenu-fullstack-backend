import { LoginBusiness } from "../../src/business/LoginBusiness";
import { User, LoginInputDTO } from "../../src/model/User";


describe("Testing the LoginBusiness 'execute' method", ()=>{

    let userDatabase = {}
    let hashManager = {
        compareHash: jest.fn(((password: string, userPassword: string) => false))
    };
    let authenticator = {
        generate: jest.fn(()=> "token")
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
        
        userDatabase = { getUserByEmailOrNickname }
        
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
            expect(hashManager.compareHash).toHaveBeenCalledWith("12", "mala-vida")
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

})    