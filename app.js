import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import connect from "./utils/connect.js";

dotenv.config();

const app = express();

<<<<<<< HEAD
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(process.env.PORT, async () => {
  console.info(`Server is running at http://localhost:${process.env.PORT}`);
  await connect();
  routes(app);
=======
app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.listen(process.env.PORT,  async() => {

      console.info(`Server is running at http://localhost:${process.env.PORT}`)
      await connect();
      routes(app);
>>>>>>> 551108f1cacf95dea08cc035c066335dff84673d
});
