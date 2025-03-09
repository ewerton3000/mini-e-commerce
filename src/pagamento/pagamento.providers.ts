import { DataSource } from "typeorm";
import { Pagamento } from "./entities/pagamento.entity";

export const pagamentoProviders = [
    {
        provide: 'PAGAMENTO_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(Pagamento),
        inject:['DATA_SOURCE'],
    },
    ]