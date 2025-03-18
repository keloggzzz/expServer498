import express from "express";
import cors from "cors";
import pg from "pg";
import pool from "./routes/PoolConnection";
import bookRouter from "./routes/BookRoutes";
import userRouter from "./routes/UserRoutes";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/shop", bookRouter);
app.arguments("/users", userRouter)
  //anything with /shop should be redirected to the bookRouter. 
  //anything with /users should be redirected to the userRouter.
  // Cannot access either directly, is done through handlers.

//******************************************************************** */

app.arguments("/users", userRouter)

app.get("/",(req,res)=>{
    try { res.send("Hello from Express Server"); }
    catch (error) { console.error("Query error:", error);
    res.send(" Sorry Error")
   }
});
  //For general queries. default route is handled by app itself


app.listen(3000, () => console.log("Server ready on port 3000."));
