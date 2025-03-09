import { utilDB } from "teste";
import { DataSource } from "typeorm";
export const databaseProviders = [
    {
        provide: utilDB.dataSource,
        useFactory: async() =>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.host, 
                port: utilDB.dbPort,
                username:process.env.user,
                password:process.env.password,
                database:process.env.database,
                entities:[__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,

            });


            return dataSource.initialize()
        }
    }
]
