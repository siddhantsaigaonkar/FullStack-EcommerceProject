import "dotenv/config"
import express from "express"
import { connectDB } from "./db"
import cors from "cors"
import { json } from "zod"
import morgan from "morgan"
import { ok } from "./utils/envelope"
import { notFound } from "./middleware/notFound"
import { errorHandler } from "./middleware/errorHandler"





async function mainEntryFunction() {
  await connectDB()  
  
  const app = express()

  const corsOrigins = (process.env.CORS_ORINGINS || "http://localhost:5273")
    .split(",")
    .map((origin => origin.trim()))
    .filter(Boolean)
  
  app.use(
    cors({
      origin: corsOrigins,
      credentials: true
    })
  );

  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/healthy", (req, res) => {
    res.status(200).json(ok({message:`server is healthy`}))
  })

  app.use(notFound)
  app.use(errorHandler)


    const port = Number(process.env.PORT || 5000);

    app.listen(port, () => {
      console.log(`Server is now listening to port ${port}`);
    });
}


mainEntryFunction().catch((err) => {
  console.error("failed to start", err);
  process.exit(1);
});
