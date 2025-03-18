import express from "express";
const bookRouter = express.Router();
import pool from "./PoolConnection.js";

    bookRouter.get("/books", async (req, res) => {
        try {
            const result = await pool.query("SELECT * from books");
            res.json({ rows: result.rows });
            //   console.log(result.rows.length);
        } catch (error) {
            console.error("Query error:", error);
            res.status(500).json({ error: "Database query failed" });
        }
    });

    bookRouter.get("/getbook", async (req, res) => {
    //getting a single book. must say getbook?id=#
        try {
            var id1 = req.query.id;
            console.log(id1);
            const result = await pool.query("SELECT * from books where id=" + id1);
            console.log(result);
            res.json({ rows: result.rows });
            //   console.log(result.rows.length);
        } catch (error) {
            console.error("Query error:", error);
            res.json({ rows: [] });
        }
    });

    bookRouter.get("/delbook", async (req, res) => {
    //deleting a single book. must say delbook?id=#
        try {
            var id1 = req.query.id;
            console.log(id1);
            const result = await pool.query("DELETE from books where id=" + id1);
            console.log(result);
            res.json({ ans: "Successfully Deleted" });
            //   console.log(result.rows.length);
        } catch (error) {
            console.error("Query error:", error);
            res.json({ ans: "Not Deleted" });
        }
    });

export default bookRouter;
