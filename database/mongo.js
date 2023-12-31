import mongoose from "mongoose";

export const connection = () => {
   try {
      mongoose
         .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
         .then(() => console.log("successfully connected to database"))
         .catch((error) => console.log("failed to connect to database"));
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
