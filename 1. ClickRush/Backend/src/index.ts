import { createServer } from "node:http";
import { createApplication } from "./app/index.js";
import 'dotenv/config';

async function main() {
    try{
        const server = createServer(createApplication());
        const PORT:number = Number(process.env.PORT) || 8080;

        server.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(`Error strting HTTP server`);
        throw error;
    }
}

main();