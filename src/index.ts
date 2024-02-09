import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./file";
import { uploadFile } from './aws';
// endpoint - https://c902e6e093d25333e8853a371b020dea.r2.cloudflarestorage.com

// getAllFiles("dist/output/1kqac")

const app = express();
app.use(cors())
app.use(express.json())
// uploadFile("output/3rsm2/tsconfig.node.json","dist/output/3rsm2/tsconfig.json")


app.post("/upload", async (req, res) => {
    try {
        const repoUrl = req.body.repoUrl;
        const id = generate();
        await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`) );


        const files = getAllFiles(path.join(__dirname,`output/${id}`))
        files.forEach(async file => {
            const updatedPath = file.replace(/\\/g, '/');
            await uploadFile(updatedPath.slice(__dirname.length+1),updatedPath)
        });
        res.status(200).json({id:id,message:"files uploaded successfully" });
        console.log(`upload for id-${id} completed`);
        

    } catch (error:any) {
        console.error("Error during cloning:", error.message);
        res.status(500).json({ error: "Failed to clone repository" });
    }
});

app.listen(3000,()=>{console.log("server connected on port 3000")
});



