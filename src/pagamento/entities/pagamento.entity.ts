import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column('text')
    forma_de_pagamento:string
    
    @Column()
    descricao:string
    
    @Column('text')
    status:string

    @ManyToOne(() => Pagamento, (pagamento) => pagamento.cliente)
    @JoinColumn({name: 'cliente_Id'})
    cliente: Cliente


}
