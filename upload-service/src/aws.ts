import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId:process.env.bucket_ACCESS_ID,
    secretAccessKey:process.env.Secret_Access_Key,
    endpoint:process.env.END_POINT
    
})

export const uploadFile = async (filename:string,LocalFilePath:string)=>{

    const fileContent = fs.readFileSync(LocalFilePath);
    const response = await s3.upload({
        Body:fileContent,
        Bucket:"vercel-bucket",
        Key:filename
    }).promise()

}

// uploadFile("output/3rsm2/tsconfig.node.json","dist/output/3rsm2/tsconfig.json")