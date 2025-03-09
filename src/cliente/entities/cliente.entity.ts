import { IsString, Matches, MinLength } from "class-validator";
import { Carrinho } from "src/carrinho/entities/carrinho.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
@PrimaryGeneratedColumn()
id: number

@Column ({ length: 100})
nome?: string

@Column ({length: 100})
sobrenome?: string

@Column ({length: 255})
email: string

@Column ({length: 100})
@IsString()
@MinLength(8)
@Matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).*$/, { message: 'A senha deve conter pelo menos uma letra e um número.' })
@Matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/ , { message: 'A senha deve conter letras, números e caracteres especiais.' })
senha?:string

@Column ({length: 200})
endereco ?:string


@Column()
telefone?:number

@OneToMany(() => Cliente, (cliente) => cliente.carrinho)
carrinho: Carrinho[];


@OneToMany(() => Cliente, (cliente) => cliente.pedido)
pedido: Pedido[];
//@OneToMany(() => Pedidos, (pedidos) =>pedidos.cliente)
//pedidos:Pedidos[]
}

