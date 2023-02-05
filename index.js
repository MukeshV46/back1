import  express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express()
const db =   mysql.createConnection({
    host:"localhost",    
    user:"root",
    password:"#Good2002",
    database:"test"
})

app.use(express.json()); //To convert json data
app.use(cors());

app.get("/",(req,res)=>{
     res.json("Home page get"+res.status)
})

app.get("/data",(req,res)=>{
    const q = "SELECT * from data2"
    db.query(q,(err,data)=>{
        if(err) return (res.json(err));
        return res.json(data);
    })
});




app.post("/data",(req,res)=>{    
    const val = [            
            req.body.u_name,            
            req.body.mbl_no,            
    ];
    console.log(val);
    const q = "INSERT INTO data2 (`u_name`,`mbl_no`) VALUES (?)";
    // const q = "INSERT INTO data (`id`,`u_name`,`mbl_no`) VALUES (8,'jada',919)";
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err);//("Your ID should be unique");
        return res.json("Your Data is added");
    })
})


app.delete("/data/:id",(req,res)=>{
    const id = req.params.id;
    const q =  "DELETE  FROM data2 where id = ?";
    db.query(q ,[id], (err,data)=>{
        if(err) return (res.json(err));
        return res.json("Book deleted Sucessfully");
    })
})

app.put("/data/:id",(req,res)=>{
    const id = req.params.id;
    const values = [
        req.body.u_name,            
        req.body.mbl_no,            
    ]
    const q = "UPDATE data2 SET `u_name` = ? , `mbl_no` = ? WHERE id = ?";
    db.query(q,[...values,id],(err,data)=>{
        if(err) return (res.json(err));
        return res.json("Book Updated Sucessfully")
    }) 
})


app.listen(8000,()=>{
    console.log("COnnected server");
}) 