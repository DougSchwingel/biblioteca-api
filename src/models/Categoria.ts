import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

export interface Categoria extends RowDataPacket {
  id?: number;
  nome: string;
}

class CategoriaModel {
  private db = Database.getInstance();

  async criar(categoria: Categoria): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Categoria (nome) VALUES (?)',
      [categoria.nome]
    );
    return (result as any).insertId;
  }

  async listar(): Promise<Categoria[]> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria');
    return rows as Categoria[];
  }

  async buscarPorId(id: number): Promise<Categoria | null> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria WHERE id = ?', [id]);
    const categorias = rows as Categoria[];
    return categorias[0] || null;
  }

  async buscarPorNome(nome: string): Promise<Categoria | null> {
    const [rows] = await this.db.execute('SELECT * FROM Categoria WHERE nome = ?', [nome]);
    const categorias = rows as Categoria[];
    return categorias[0] || null;
  }

  async atualizarPorId(id: number, categoria: Categoria): Promise<void> {
    await this.db.execute(
      'UPDATE Categoria SET nome = ? WHERE id = ?',
      [categoria.nome, id]
    );
  }

  async removerPorId(id: number): Promise<void> {
    const [livros] = await this.db.execute('SELECT * FROM Livro WHERE categoriaId = ?', [id]);
    if ((livros as any).length > 0) {
      throw new Error('Não é possível remover a categoria, pois há livros associados.');
    }
  
    await this.db.execute('DELETE FROM Categoria WHERE id = ?', [id]);
  }
  
}

export default new CategoriaModel();
