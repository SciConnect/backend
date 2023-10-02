import express from "express";
import cors from "cors";
import swaggerJsDoc from "./swaggerConfig.js";
import swaggerUi from "swagger-ui-express";

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

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`server running on port ${port}`));
