import CategoriaModel, { Categoria } from '../models/Categoria';

class CategoriaService {
  async criarCategoria(categoria: Categoria): Promise<number> {
    const existente = await CategoriaModel.buscarPorNome(categoria.nome);
    if (existente) {
      throw new Error('Categoria já cadastrada.');
    }

    return CategoriaModel.criarCategoria(categoria);
  }

  listarCategorias(): Promise<Categoria[]> {
    return CategoriaModel.listarCategoria();
  }

  buscarCategoriaPorId(id: number): Promise<Categoria | null> {
    return CategoriaModel.buscarPorId(id);
  }

  async atualizarCategoria(id: number, categoria: Categoria): Promise<void> {
    const existente = await CategoriaModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Categoria não encontrada.');
    }

    const categoriaComMesmoNome = await CategoriaModel.buscarPorNome(categoria.nome);
    if (categoriaComMesmoNome && categoriaComMesmoNome.id !== id) {
      throw new Error('Já existe uma categoria com esse nome.');
    }

    await CategoriaModel.atualizarPorId(id, categoria);
  }

  async removerCategoria(id: number): Promise<void> {
    const existente = await CategoriaModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Categoria não encontrada.');
    }

    await CategoriaModel.removerPorId(id);
  }
}

export default new CategoriaService();
