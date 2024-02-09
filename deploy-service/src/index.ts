import * as dotenv from 'dotenv';
dotenv.config();
import {createClient,commandOptions} from "redis";
import { downS3Folder } from "./aws";

const subscriber = createClient();

subscriber.connect();

async function main(){
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        //@ts-ignore
        const id = (response.element);

        await downS3Folder(`output/${id}`)
        console.log("downloaded");
    }
}

main();
