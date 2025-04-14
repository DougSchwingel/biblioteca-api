import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

//Interface Categoria
export interface Categoria extends RowDataPacket {
  id?: number;
  nome: string;
}

//Classe Categoria
class CategoriaModel {
  private db = Database.getInstance();

  //Método para criar uma categoria
  async criarCategoria(categoria: Categoria): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Categoria (nome) VALUES (?)',
      [categoria.nome]
    );
    return (result as any).insertId;
  }

  //Método para listar todas as categorias existentes
  async listarCategoria(): Promise<Categoria[]> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria');
    return rows as Categoria[];
  }

  //Método para buscar uma categoria por Id
  async buscarPorId(id: number): Promise<Categoria | null> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria WHERE id = ?', [id]);
    const categorias = rows as Categoria[];
    return categorias[0] || null;
  }

  //Método para buscar uma categoria pelo nome
  async buscarPorNome(nome: string): Promise<Categoria | null> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria WHERE nome = ?', [nome]);
    const categorias = rows as Categoria[];
    return categorias[0] || null;
  }

  //Método para atualizar uma categoria existente a partir do Id
  async atualizarPorId(id: number, categoria: Categoria): Promise<void> {
    const categoriaExistente = await this.buscarPorId(id);
    if (!categoriaExistente) {
      throw new Error('Categoria não encontrada.');
    }

    await this.db.execute(
      'UPDATE Categoria SET nome = ? WHERE id = ?',
      [categoria.nome, id]
    );
  }

  //Método para remover uma categoria pelo Id, se não houver livros vinculados à esta categoria
  async removerPorId(id: number): Promise<void> {
    const categoriaExistente = await this.buscarPorId(id);
    if (!categoriaExistente) {
      throw new Error('Categoria não encontrada.');
    }

    const [livros] = await this.db.execute('SELECT * FROM Livro WHERE categoriaId = ?', [id]);
    if ((livros as any).length > 0) {
      throw new Error('Não é possível remover a categoria, pois há livros associados.');
    }

    await this.db.execute('DELETE FROM Categoria WHERE id = ?', [id]);
  }
}

export default new CategoriaModel();