import { Exclude } from "class-transformer";
import { Carrinhoproduto } from "src/carrinhoproduto/entities/carrinhoproduto.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Pagamento } from "src/pagamento/entities/pagamento.entity";
import { Pedidoproduto } from "src/pedidoproduto/entities/pedidoproduto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    status:string

    @CreateDateColumn()
    datadopedido:Date

    @Column('decimal', {
        precision: 5, 
        scale: 2,
    })
    valortotal:number
    
    @Exclude()
    @ManyToOne(() => Cliente, (cliente) => cliente.pedido, {eager: true})
    @JoinColumn({name: 'clienteId'})
    cliente: Cliente

    @OneToOne(() => Pagamento)
    @JoinColumn({name: 'pagamentoId'})
    pagamento:Pagamento
    
    @OneToMany(()=> Pedidoproduto, (pedidoProduto) => pedidoProduto.pedido, {cascade: true})
    pedidoProduto: Pedidoproduto[]

}