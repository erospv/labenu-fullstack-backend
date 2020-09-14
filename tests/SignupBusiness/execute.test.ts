import { SignupBusiness } from "../../src/business/SignupBusiness";
import { SignupInputDTO, User } from "../../src/model/User";


describe("Testing the SignupBusiness 'execute' method", () => {

    let userDatabase = {
        createUser: jest.fn((user: User)=>{})
    };

    let idGenerator = {
        generate: jest.fn(() => "id")
    };

    let hashManager = {
        hash: jest.fn(() => "hash")
    };
    
    let authenticator = {
        generateToken: jest.fn(()=> "token")
    };

    test("Should return an error when try create user with missing name ", async () => {
        expect.assertions(2);

        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "",
                email: "donie@gmail.com",
                nickname: "donie",
                password: "00000000"
            }

            await signupBusiness.execute(userInput)
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Fill all the fields");
        }
    });

    test("Should return an error when try create user with missing email ", async () => {
        expect.assertions(2);

        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        try {

            const userInput: SignupInputDTO = {
                name: "Donatelo",
                email: "",
                nickname: "donie",
                password: "000000"
            }

            await signupBusiness.execute(userInput)
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Fill all the fields");
        }
    });

    test("Should return an error when try create user with wrong email format ", async () => {
        expect.assertions(2);

        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "Donatelo",
                email: "donie.com",
                nickname: "donie",
                password: "000000"
            }

            await signupBusiness.execute(userInput)
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Invalid email");
        }
    });

    test("Should return an error when try create user with wrong password format ", async () => {
        expect.assertions(2);

        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "Donatelo",
                email: "donie@gmail.com",
                nickname: "donie",
                password: "1235"
            }

            await signupBusiness.execute(userInput)
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Invalid password");
        }
    });

    test("Successful signup attempt", async () => {
        
        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any  
        )

        const userInput: SignupInputDTO = {
            name: "Donatelo",
            email: "donie@gmail.com",
            nickname: "donie",
            password: "santa-tartaruga"
        }

        await signupBusiness.execute(userInput)

        expect(hashManager.hash).toBeCalled()
        expect(idGenerator.generate).toBeCalled()
        expect(userDatabase.createUser).toBeCalledWith(
            new User("id", "Donatelo", "donie@gmail.com", "donie", "hash")
        )
        expect(authenticator.generateToken).toHaveReturnedWith("token")
    })
})    