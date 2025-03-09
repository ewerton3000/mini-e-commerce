import { DataSource } from "typeorm";
import { Pedidoproduto } from "./entities/pedidoproduto.entity";

export const pedidoprodutoProviders = [
    {
        provide:'PEDIDOPRODUTO_REPOSITORY',
        useFactory:(dataSource: DataSource) =>dataSource.getRepository(Pedidoproduto),
        inject:['DATA_SOURCE'],
    },
]