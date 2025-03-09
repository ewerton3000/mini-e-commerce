import { Produto } from "src/produtos/entities/produto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    nome:string
    @Column('text')
    descricao:string
    
}
