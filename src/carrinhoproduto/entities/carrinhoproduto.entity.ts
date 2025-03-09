import { Carrinho } from "src/carrinho/entities/carrinho.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Carrinhoproduto {
    @PrimaryGeneratedColumn()
    id:number

   /* @ManyToMany(() =>Carrinho, (carrinho) => carrinho.produto)
    carrinho:Carrinho

    @ManyToMany(() => Produto, (produto) => produto.carrinho)
    produto:Produto
*/
    @Column()
    carrinhoId:number

    @Column()
    produtoId:number

    @Column()
    quantidade:number

    @CreateDateColumn({name: 'dataCriacao'})
    dataCriacao:Date

    @UpdateDateColumn({name: 'dataAtual'})
    dataAtual:Date


    @ManyToOne(() => Produto,produto => produto.carrinhoproduto,{ eager: true })
    @JoinColumn({name: 'produtoId' , referencedColumnName: 'id'})
    produto:Produto

    @ManyToOne(() => Carrinho,(carrinho) => carrinho.carrinhoProduto, {onDelete :'CASCADE'})
    @JoinColumn({name: 'carrinhoId', referencedColumnName: 'id'})
    carrinho:Carrinho[]
     
   
}
