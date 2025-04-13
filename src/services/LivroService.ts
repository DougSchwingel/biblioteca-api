import LivroModel, { Livro } from '../models/Livro';
import CategoriaModel from '../models/Categoria';

class LivroService {
  async criarLivro(livro: Livro): Promise<number> {
    const categoria = await CategoriaModel.buscarPorId(livro.categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    return LivroModel.criar(livro);
  }

  listarLivros(): Promise<Livro[]> {
    return LivroModel.listar();
  }

  buscarLivroPorId(id: number): Promise<Livro | null> {
    return LivroModel.buscarPorId(id);
  }

  async atualizarLivroPorId(id: number, livro: Livro): Promise<void> {
    const existente = await LivroModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Livro não encontrado.');
    }

    const categoria = await CategoriaModel.buscarPorId(livro.categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    await LivroModel.atualizarPorId(id, livro);
  }

  async removerLivroPorId(id: number): Promise<void> {
    const existente = await LivroModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Livro não encontrado.');
    }

    await LivroModel.removerPorId(id);
  }

}

export default new LivroService();
