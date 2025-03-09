import { DecimalColumnTransformer } from "preco";
import { Carrinho } from "src/carrinho/entities/carrinho.entity";
import { Carrinhoproduto } from "src/carrinhoproduto/entities/carrinhoproduto.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Pedidoproduto } from "src/pedidoproduto/entities/pedidoproduto.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class  Produto {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nome:string
    
    @Column({name: 'marca' })
    marca:string

    @Column('text')
    descricao:string


    @Column()
    quantidade:number

    @Column('decimal', {
        precision: 5,
        scale: 2,
       // transformer: new DecimalColumnTransformer(),
    })
    preco: number;

    carrinhoproduto: Carrinhoproduto[]
    
    @OneToMany(() =>Carrinhoproduto , (carrinhoProduto) => carrinhoProduto.produto )
    carrinho?: Carrinhoproduto[]

    @ManyToOne(() => Categoria)
    @JoinColumn()
    categoria ?: Categoria

    @ManyToOne(() =>Pedidoproduto , (pedidoProduto) => pedidoProduto.pedido)
    pedidoProduto: Pedidoproduto
    
    
   /* @ManyToMany(() => Carrinho, (carrinho) => carrinho.produto)
    @JoinColumn({ name: 'preco' , referencedColumnName: 'preco'})
    carrinho: Carrinho[]
*/
}
