import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import cors from "cors"
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/music", musicRouter);


const server = app.listen(Number(process.env.PORT) ||3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server running on port ${address.port}`);
    } else {
      console.error(`Server start failed`);
    }
  });

