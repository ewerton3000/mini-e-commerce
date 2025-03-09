import { Cliente } from "src/cliente/entities/cliente.entity";
import { DataSource } from "typeorm";
import { Carrinhoproduto } from "./entities/carrinhoproduto.entity";


export const carrinhoprodutoProviders = [
    {
        provide:'CARRINHOPRODUTO_REPOSITORY',
        useFactory:(dataSource: DataSource)=> dataSource.getRepository(Carrinhoproduto),
            inject:['DATA_SOURCE'],
        
    },
]