import LivroModel, { Livro } from '../models/Livro';
import CategoriaModel from '../models/Categoria';

class LivroService {
  async criarLivro(livro: Livro): Promise<number> {
    const categoria = await CategoriaModel.buscarCategoriaPorId(livro.categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    return LivroModel.criarLivro(livro);
  }

  listarLivros(): Promise<Livro[]> {
    return LivroModel.listarLivro();
  }

  buscarLivroPorId(id: number): Promise<Livro | null> {
    return LivroModel.buscarLivroPorId(id);
  }

  async atualizarLivroPorId(id: number, livro: Livro): Promise<void> {
    const existente = await LivroModel.buscarLivroPorId(id);
    if (!existente) {
      throw new Error('Livro não encontrado.');
    }

    const categoria = await CategoriaModel.buscarCategoriaPorId(livro.categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    await LivroModel.atualizarLivroPorId(id, livro);
  }

  async removerLivroPorId(id: number): Promise<void> {
    const existente = await LivroModel.buscarLivroPorId(id);
    if (!existente) {
      throw new Error('Livro não encontrado.');
    }

    await LivroModel.removerLivroPorId(id);
  }

}

export default new LivroService();
