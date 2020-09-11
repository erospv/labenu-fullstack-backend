import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { LoginBusiness } from "./business/LoginBusiness";
import { UserDatabase } from "./data/UserDatabase";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);


new LoginBusiness(new UserDatabase, new HashManager, new Authenticator).execute({emailOrNickname: "eros@gmail.com", password: "123456" }).then()

const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });

