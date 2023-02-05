
import express, { json } from "express";
import mysql from "mysql2";
import cors from "cors";







const db = mysql.createConnection({
    host:"containers-us-west-199.railway.app",
    user:"root",
    password:"FkFZ9pemtdV0qjoGNzaa",
    database:"railway"
})
const app =  express();

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3003;

app.listen(process.env.Port || PORT ,()=>{
    console.log("Connected to server");
})


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("Home page get"+res.status)
})



app.get('/data', (req, res) => {
    const q1 = "SELECT * from employee";
    db.query(q1, (err, data1) => {
      if (err) return res.json(err);
  
      const q2 = "SELECT * from salary";
      db.query(q2, (err, data2) => {
        if (err) return res.json(err);
  
        const combined = { employees: data1, salary: data2 };
        return res.json(combined);
      });
    });
  });
  

app.post("/add", (req, res) => {
    let counter = 0;
  
    const q = "INSERT INTO employee (`Name`,`Address`,`Sex`,`Martial`) VALUES (?)";
    const val = [req.body.Name, req.body.Sex, req.body.Martial, req.body.Address]; //["Kathir","Mdu","Male","Single"];
    const q2 = "INSERT INTO salary (`Dep`,`Amount`) Values (?)"; //["UI/UX",5000];
    const val2 = [req.body.Dep, req.body.Amount];
  
    db.query(q, [val], (err, data) => {
      if (err) return res.json(err);
      console.log("Added employee Sucessfully");
      counter++;
      if (counter === 2) return res.json();
    });
  
    db.query(q2, [val2], (err, data) => {
      if (err) return res.json(err);
      console.log("Added salary Sucessfully");
      counter++;
      if (counter === 2) return res.json();
    });
  });
  
//----------------------
  app.delete("/add/:id", (req, res) => {        
    const id = req.params.id;
    const q1 = "DELETE FROM employee WHERE id = ?";
    const q2 = "DELETE FROM salary WHERE id = ?";
    db.query(q1, [id], (err, data) => {
      if (err) return res.json(err);
      db.query(q2, [id], (err, data) => {
        if (err) return res.json(err);
        console.log("Data deleted successfully");
        return res.json("Data deleted successfully");
      });
    });
  });

  //---------------------
  app.put("/up/:id",(req,res)=>{
      const id =  req.params.id;  
      const val = [req.body.Name, req.body.Sex, req.body.Martial, req.body.Address]; 
      const val2 = [req.body.Dep, req.body.Amount];    
     let counter=0;
    const q = "UPDATE employee SET `Name` = ? , `Sex` = ?, `Martial` = ?, `Address` = ? WHERE id = ?";    
    const q2 = "UPDATE salary SET `Dep` = ? , `Amount` = ? WHERE id = ?";    

    db.query(q, [...val,id], (err, data) => {
      if (err) return res.json(err);
      console.log("Updated employee Sucessfully");
      counter++;
      if (counter === 2) return res.json(); 
    });
  
    db.query(q2, [...val2,id], (err, data) => {
      if (err) return res.json(err);
      console.log("Updated salary Sucessfully");
      counter++;
      if (counter === 2) return res.json();
    });
  })

