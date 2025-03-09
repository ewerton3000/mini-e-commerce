import { Carrinhoproduto } from "src/carrinhoproduto/entities/carrinhoproduto.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Carrinho {
    @PrimaryGeneratedColumn()
    id:number
    
   
    
    
    
    @CreateDateColumn()
    datadeCriacao:Date

    @UpdateDateColumn()
    dataAtualizada:Date

    @Column()
    clienteId:number



    
    @OneToMany(() => Carrinhoproduto , (carrinhoProduto) => carrinhoProduto.carrinho)
    carrinhoProduto?: Carrinhoproduto[]
    
    @ManyToOne(() => Carrinho,carrinho => carrinho.cliente)
    @JoinColumn({name: 'clienteId' , referencedColumnName: 'id'})
    cliente?:Cliente
     

}