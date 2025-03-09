export class PedidoClienteDto{
    id: number
    status: string
    datadopedido: Date
    valortotal: number
    cliente:{
        clienteId:number
        nome?: string
        sobrenome?: string
    }
    produtos: {
        nome: string
        preco: number
        quantidade: number
    }[]
}