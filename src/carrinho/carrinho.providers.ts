import { DataSource } from "typeorm";
import { Carrinho } from "./entities/carrinho.entity";

export const carrinhoProviders = [
    {
        provide: 'CARRINHO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Carrinho),
        inject: ['DATA_SOURCE'],
    },
]