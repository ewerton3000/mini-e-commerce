import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrinhoprodutoDto } from './dto/create-carrinhoproduto.dto';
import { UpdateCarrinhoprodutoDto } from './dto/update-carrinhoproduto.dto';
import { Repository } from 'typeorm';
import { Carrinhoproduto } from './entities/carrinhoproduto.entity';
import { ProdutosService } from 'src/produtos/produtos.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Injectable()
export class CarrinhoprodutoService {
  constructor(
    @InjectRepository(Carrinhoproduto)
    private carrinhoprodutoRepository: Repository<Carrinhoproduto>,
    private readonly produtoService: ProdutosService,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>
  ) { }
  create(createCarrinhoprodutoDto: CreateCarrinhoprodutoDto) {
    return this.carrinhoprodutoRepository.save(createCarrinhoprodutoDto);
  }

  findAll() {
    return this.carrinhoprodutoRepository.find();
  }

  findOne(id: number) {
    return this.carrinhoprodutoRepository.findOne({ where: { id } });
  }

  update(id: number, updateCarrinhoprodutoDto: UpdateCarrinhoprodutoDto) {
    return this.carrinhoprodutoRepository.update(id, updateCarrinhoprodutoDto);
  }

  remove(id: number) {
    return this.carrinhoprodutoRepository.delete(id);
  }

  async addProdutoTOcarrinho(carrinhoId: number, produtoId: number, quantidade: number) {
    //Verificand ose o produto existe
    const produto = await this.produtoRepository.findOne({ where: { id: produtoId } })
    if (!produto) {
      throw new NotFoundException('Produto não encontrado')
    }

    // Verificando se o produto está no carrinho
    let carrinhoproduto = await this.carrinhoprodutoRepository.findOne({
      where: { carrinhoId, produtoId },
    })
    if (!produtoId || quantidade <= 0) {
      throw new NotFoundException('Não há produtos no carrinho')
    }
    if (carrinhoproduto) {
      //Se o  produto estiver no carrinho , atulize a quantidade
      carrinhoproduto.quantidade += quantidade
      await this.produtoService.update(produto.id, produto);   // Usando o ProdutoService para atualizar
    }
    else {
      //Se o produto não está no carrinho , crie um novo registro em carrinho
      carrinhoproduto = this.carrinhoprodutoRepository.create({
        carrinhoId,
        produtoId,
        quantidade,
      })
    }

    //Salva o carrinhoproduto com a nova quantidade
    await this.carrinhoprodutoRepository.save(carrinhoproduto)
    return carrinhoproduto
  }



  // Exemplo de método que pode usar o ProdutoService para manipular o Produto
  async updateProdutoQuantity(produtoId: number, quantidade: number) {
    const produto = await this.produtoService.findOne(produtoId);
    if (produto) {
      await this.produtoService.update(produto.id, produto);  // Usando o ProdutoService para atualizar
    }
  }

  //Método para obter todos os carrinhos e seus produtos
  async findAllCarrinhos(): Promise<any> {
    const carrinhoproduto = await this.carrinhoprodutoRepository.find({
      relations: ['carrinho', 'produto'],

    })
    if (!carrinhoproduto) {
      throw new NotFoundException(`Não foi possível achar o seu carrinho.`)
    }

    //Retornar os itens formatados
    return carrinhoproduto.map((item) => ({
      carrinhoId: item.carrinhoId,
      produto: {
        nome: item.produto.nome,
        preco: item.produto.preco,
        marca: item.produto.marca

      },
      quantidade: item.quantidade
    }))
  }
  //Método para obter um carrinho específico pelo ID e seus produtos
  async findCarrinhoById(carrinhoId: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id: carrinhoId },
      relations: ['carrinhoProduto', 'carrinhoProduto.produto'],

    })

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    //Retornar os itens especificos das tabelas carrinho e produto
    return {
      id: carrinho.id,
      produtos: carrinho.carrinhoProduto.map(item => ({
        nome: item.produto.nome,
        quantidade: item.quantidade,
        preco: item.produto.preco,
        marca: item.produto.marca,
      }))
    }
  }

  //Método para remover um produto do carrinho
  async removeProdutoFromCarrinho(carrinhoId: number, produtoId: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id: carrinhoId }
    })

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    //puxando o produto pela id
    const carrinhoProduto = await this.carrinhoprodutoRepository.findOne({
      where: {
        carrinho: { id: carrinhoId },
        produto: { id: produtoId }

      },
      relations: ['produto', 'carrinho'],
    })


    if (!carrinhoProduto) {
      throw new NotFoundException('Produto não encontrado no carrinho')
    }

    //Remove o produto do carrinho
    await this.carrinhoprodutoRepository.remove(carrinhoProduto)
    return { message: 'Produto removido do carrinho com sucesso !' }
  }
}
