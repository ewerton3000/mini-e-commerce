import { utilDB } from "teste";
import { DataSource } from "typeorm";
export const databaseProviders = [
    {
        provide: utilDB.dataSource,
        useFactory: async() =>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'maglev.proxy.rlwy.net', 
                port: utilDB.dbPort,
                username:'root',
                password:'lMNxuaNEbkMcaSotVmkycSrFBWBSBJxe',
                database:'mini-e-commerce',
                entities:[__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,

            });


            return dataSource.initialize()
        }
    }
]
