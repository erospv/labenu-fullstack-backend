

// export class MusicController {

//     async postMusic(req: Request, res: Response) {
//         try {

//             const musicBusiness = new MusicBusiness(
//                 new MusicDatabase(),
//                 new IdGenerator(),
//                 new Authenticator()
//             )

//             const postData: PostInputDTO = {
//                 name: req.body.name,
//                 email: req.body.email,
//                 nickname: req.body.nickname,
//                 password: req.body.password
//             }

//             const token = await singnupBusiness.execute(signupData)

//             res.status(201).send({ token });

//         } catch (error) {
            
//             res.status(error.errorCode || 400).send({ error: error.message });
//         }

//         await BaseDatabase.destroyConnection();
//     }





// }