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

    bookRouter.get("/addbook", async (req, res) => {
            try {
                var title = "Johnny Coding Journey";
                var author = "Jimmy John"
                var price= 50.98
                var catid=5;
                    //FOUR VARIABLE NEEEDED FOR BOOK. DATABASE AUTOMATICALLY DECIDES BOOKID

                var qry= "insert into books (title, author, price, category_id) VALUES ("
                + "'"+title+"'," //varchar needs quotes
                + "'"+author+"',"
                +price+"," //number values do not
                +catid+
                ")"; //ending VALUES

                const result = await pool.query(qry);
                console.log(result);
                res.json({ ans: "Successfully Added" });
                //   console.log(result.rows.length);
            } catch (error) {
                console.error("Query error:", error);
                res.json({ ans: "Not Added" });
            }
        });



export default bookRouter;
