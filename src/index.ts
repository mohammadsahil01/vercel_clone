import express from "express";
import cors from "cors";
import log from "simple-git/dist/src/lib/tasks/log";

const app = express();
app.use(cors())
app.use(express.json())


app.post("/deploy",async(req,res)=>{
    const repoUrl = req.body.repoUrl
    console.log(repoUrl);

    res.json({})
    
})

app.listen(3000,()=>{console.log("server connected on port 3000")
});



