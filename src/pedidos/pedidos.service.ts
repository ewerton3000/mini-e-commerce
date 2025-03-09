import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Pedidoproduto } from 'src/pedidoproduto/entities/pedidoproduto.entity';
import { PedidoClienteDto } from './dto/pedido-cliente.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Pedidoproduto)
    private pedidoprodutoRepository: Repository<Pedidoproduto>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) { }

  async criarPedidoDoCarrinho(carrinhoId: number, clienteId: number): Promise<Pedido> {
    // 1. Obter o carrinho pela id com os produtos e cliente
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id: carrinhoId, cliente: { id: clienteId } },
      relations: ['carrinhoProduto', 'carrinhoProduto.produto', 'cliente'],
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    // 2. Calcular o valor total do pedido
    let valortotal = 0;
    for (const carrinhoProduto of carrinho.carrinhoProduto) {
      valortotal += carrinhoProduto.quantidade * carrinhoProduto.produto.preco;
    }

    // 3. Criar o novo pedido
    const pedido = new Pedido();
    pedido.cliente = carrinho.cliente; // Associa o cliente
    pedido.status = 'Pendente'; // Status inicial
    pedido.datadopedido = new Date(); //Cria uma data atual 
    pedido.valortotal = valortotal; // Insere o valor total

    const novoPedido = await this.pedidoRepository.save(pedido);

    // 4. Associar os produtos ao pedido e verificar estoque
    for (const carrinhoProduto of carrinho.carrinhoProduto) {
      const produto = await this.produtoRepository.findOne({
        where: { id: carrinhoProduto.produto.id },
      });

      if (!produto) {
        throw new NotFoundException(`Produto ${carrinhoProduto.produto.nome} não encontrado.`);
      }

      if (produto.quantidade < carrinhoProduto.quantidade) {
        throw new BadRequestException(`Estoque insuficiente para o produto ${produto.nome}`);
      }

      // Diminuir a quantidade de estoque do produto
      produto.quantidade -= carrinhoProduto.quantidade;

      // Salvar a atualização do estoque
      await this.produtoRepository.save(produto);
    }

    // 5. Retornar o novo pedido com sucesso
    return novoPedido;
  }
  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidoRepository.save(createPedidoDto);
  }

  findAll() {
    return this.pedidoRepository.find();
  }

  findOne(id: number) {
    return this.pedidoRepository.findOne({ where: { id } });
  }

  async findPedido(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'pedidoProduto', 'pedidoProduto.produto'],
    })

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado. `)
    }

    return pedido
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoRepository.update(id, updatePedidoDto);
  }

  async atualizarProdutosNoPedido(
    pedidoId: number,
    produtosAtualizados: { produtoId: number; quantidade: number }[],
  ): Promise<Pedido> {
    // Buscar o pedido com os produtos relacionados
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['pedidoProduto', 'pedidoProduto.produto'],
    });
  
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado.');
    }
  
    // Iterar pelos produtos enviados para atualização
    for (const produtoAtualizado of produtosAtualizados) {
      const pedidoProdutoExistente = pedido.pedidoProduto.find(
        (pp) => pp.produto.id === produtoAtualizado.produtoId,
      );
  
      if (pedidoProdutoExistente) {
        // Caso o produto já esteja no pedido, atualizar a quantidade
        const produto = await this.produtoRepository.findOne({
          where: { id: produtoAtualizado.produtoId },
        });
  
        if (!produto || produto.quantidade < produtoAtualizado.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para o produto ${produto?.nome}.`,
          );
        }
  
        // Atualizar a quantidade no pedido
        pedidoProdutoExistente.quantidade = produtoAtualizado.quantidade;
  
        // Ajustar o estoque
        const diferencaQuantidade =
          produtoAtualizado.quantidade - pedidoProdutoExistente.quantidade;
        produto.quantidade -= diferencaQuantidade;
  
        await this.produtoRepository.save(produto);
      } else {
        // Caso o produto não esteja no pedido, adicionar
        const produto = await this.produtoRepository.findOne({
          where: { id: produtoAtualizado.produtoId },
        });
  
        if (!produto || produto.quantidade < produtoAtualizado.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para o produto ${produto?.nome}.`,
          );
        }
  
        const novoPedidoProduto = this.pedidoprodutoRepository.create({
          pedido,
          produto,
          quantidade: produtoAtualizado.quantidade,
        });
  
        produto.quantidade -= produtoAtualizado.quantidade;
        await this.produtoRepository.save(produto);
        await this.pedidoprodutoRepository.save(novoPedidoProduto);
      }
    }
  
    // Recalcular o valor total do pedido
    pedido.valortotal = pedido.pedidoProduto.reduce(
      (total, pp) => total + pp.quantidade * pp.produto.preco,
      0,
    );
  
    // Salvar as alterações no pedido
    return this.pedidoRepository.save(pedido);
  }
  
  async encontrarPedidosporcliente(id: number,): Promise<any>{
    const cliente= await this.pedidoRepository.findOne({
      where:{ id:id},
      relations : ['cliente','pedidoProduto','pedidoProduto.produto'],
    })
  
    if(!cliente){
      throw new NotFoundException(`Cliente ${id} não encontrado`)
    }
    let total = 0
    
    const produtos = cliente.pedidoProduto.map(item => {
    const subtotal = item.quantidade * item.precoUnitario
    total += subtotal
    return {
      nome:item.produto.nome,
      quantidade:item.quantidade,
      preco:item.produto.preco,
      subtotal:subtotal.toFixed(2)
    }
   })

    return {
      cliente:{
        nome:cliente.cliente.nome,
        sobrenome: cliente.cliente.sobrenome
      },
      produtos,
      valortotal:total.toFixed(2),
    }
    }
    
  

  remove(id: number) {
    return this.pedidoRepository.delete(id);
  }
}
