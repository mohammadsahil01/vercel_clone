import { S3 } from "aws-sdk";
import path from 'path';
import fs from 'fs';

const s3 = new S3({
    accessKeyId:process.env.bucket_ACCESS_ID,
    secretAccessKey:process.env.Secret_Access_Key,
    endpoint:process.env.END_POINT
    
})

export async function downS3Folder(prefix:string) {

    
    const allFiles = await s3.listObjectsV2({
        Bucket:'vercel-bucket',
        Prefix:prefix
    }).promise();
    
    
    const allPromises = allFiles.Contents?.map(async({Key}:any)=>{
        return new Promise(async(resolve)=>{
        if(!Key){
            resolve("");
            return
        }
        const finalOutputPath = path.join(__dirname,Key)
        
        
        const dirNme = path.dirname(finalOutputPath);

        if(!fs.existsSync(dirNme)){
            fs.mkdirSync(dirNme,{recursive:true})
        }
        const outputFile = fs.createWriteStream(finalOutputPath)

        s3.getObject({
            Bucket:'vercel-bucket',
            Key
        }).createReadStream().pipe(outputFile).on("finish",()=>{resolve("")})
     })    
    }) || [];
    console.log("awaiting");
    
    
    await Promise.all(allPromises?.filter(x=>x!==undefined))
}