import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";


const app=express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config(); // Load environment variables
const { Pool } = pg;

const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB
  },
});

pool.connect()
  .then(client => {
    console.log("Connected to Neon PostgreSQL database!");
    client.release();
  })
  .catch(err => console.error("Database connection error:", err.stack));


 app.get("/", async (req, res) => {
    try {
     
          res.send("Hello from Express Server");
     
    } catch (error) {
      console.error("Query error:", error);
      res.send(" Sorry Error")
     
    }
  });
  app.get("/books", async (req, res) => {
    try {
      const result = await pool.query("SELECT * from books");
      res.json({ rows:result.rows });
   //   console.log(result.rows.length);
    } catch (error) {
      console.error("Query error:", error);
      res.status(500).json({ error: "Database query failed" });

    }
  });

  app.get("/getbook", async (req, res) => {
    //getting a single book. must say getbook?id=#
    try {
      var id1=req.query.id;
      console.log(id1);
      const result = await pool.query("SELECT * from books where id="+id1);
      console.log(result);
      res.json({ rows:result.rows });
   //   console.log(result.rows.length);
    } catch (error) {
      console.error("Query error:", error);
      res.json({rows:[]});

    }
  });

  app.get("/delbook", async (req, res) => {
    //deleting a single book. must say delbook?id=#
    try {
      var id1=req.query.id;
      console.log(id1);
      const result = await pool.query("DELETE from books where id="+id1);
      console.log(result);
      res.json({ans:"Successfully Deleted"});
   //   console.log(result.rows.length);
    } catch (error) {
      console.error("Query error:", error);
      res.json({ans:"Not Deleted"});

    }
  });

 //
app.listen(3000, () => console.log("Server ready on port 3000."));
