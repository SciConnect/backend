import express from "express";
import cors from "cors";
import swaggerJsDoc from "./swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { connection } from "./database/mongo.js";
import { userRoute } from "./routes/userRoutes.js";

//dotenv configuration

dotenv.config();

const port = 3001;

const app = express();

//swagger-documentation
app.use(
   "/swagger",
   swaggerUi.serve,
   swaggerUi.setup(
      swaggerJsDoc,
      {},
      {
         docExpansion: "none",
      }
   )
);
//routes
app.use("/api/user", userRoute);
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection();
app.listen(port, () => console.log(`server running on port ${port}`));
