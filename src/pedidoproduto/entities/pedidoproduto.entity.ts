import { Exclude } from "class-transformer";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedidoproduto {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Pedido,(pedido) => pedido.pedidoProduto )
    pedido: Pedido

    @ManyToOne(() => Produto , (produto) =>produto.pedidoProduto)
    produto: Produto

    @Column()
    quantidade:number
    
    @Column('decimal', {
        precision: 5, 
        scale: 2,
    })
    precoUnitario: number
}
