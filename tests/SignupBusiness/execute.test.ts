import { SignupBusiness } from "../../src/business/SignupBusiness";
import { SignupInputDTO } from "../../src/model/User";

describe("Testing createUser from UserBusiness", () => {

    let userDatabase = {};
    let idGenerator = {}
    let hashGenerator = {};
    let authenticator = {}

    test("Should return an error when try create user with missing name ", async () => {
        expect.assertions(2);

        const signupBusiness = new SignupBusiness(
            userDatabase as any,
            idGenerator as any,
            hashGenerator as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "",
                email: "eros@gmail.com",
                nickname: "erospv",
                password: "123456"
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
            hashGenerator as any,
            authenticator as any
        );

        try {

            const userInput: SignupInputDTO = {
                name: "Eros",
                email: "",
                nickname: "erospv",
                password: "123456"
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
            hashGenerator as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "Eros",
                email: "eros.com",
                nickname: "erospv",
                password: "123456"
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
            hashGenerator as any,
            authenticator as any
        );

        try {
            const userInput: SignupInputDTO = {
                name: "Eros",
                email: "eros@gmail.com",
                nickname: "erospv",
                password: "1235"
            }

            await signupBusiness.execute(userInput)
        } catch (error) {
            expect(error.errorCode).toBe(422);
            expect(error.message).toEqual("Invalid password");
        }
    });
})    