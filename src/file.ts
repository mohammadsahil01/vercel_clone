import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath:string)=>{

    let res:string[]= [];

    const allfilesAndFolders = fs.readdirSync(folderPath);
    ;
    
    allfilesAndFolders.forEach(file=>{
        const fullFilePath = path.join(folderPath,file);
        if(fs.statSync(fullFilePath).isDirectory()){
            res = res.concat(getAllFiles(fullFilePath))
        }else{
            res.push(fullFilePath)
        }

    })
    
    return res;
}

// getAllFiles("dist/output/1kqac")