import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

export interface Livro extends RowDataPacket {
  id?: number;
  titulo: string;
  autor: string;
  categoriaId: number;
}

class LivroModel {
  private db = Database.getInstance();

  async criar(livro: Livro): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)',
      [livro.titulo, livro.autor, livro.categoriaId]
    );
    return (result as any).insertId;
  }

  async listar(): Promise<any[]> {
    const [rows] = await this.db.execute(`
      SELECT 
        l.id,
        l.titulo,
        l.autor,
        c.nome AS categoriaNome
      FROM Livro l
      JOIN Categoria c ON l.categoriaId = c.id
    `);
    return rows as any[];
  }  

  async buscarPorId(id: number): Promise<any | null> {
    const [rows] = await this.db.execute(`
      SELECT 
        l.id,
        l.titulo,
        l.autor,
        c.nome AS categoriaNome
      FROM Livro l
      JOIN Categoria c ON l.categoriaId = c.id
      WHERE l.id = ?
    `, [id]);
    return (rows as any[])[0] || null;
  }  

  async atualizarPorId(id: number, livro: Livro): Promise<void> {
    await this.db.execute(
      'UPDATE Livro SET titulo = ?, autor = ?, categoriaId = ? WHERE id = ?',
      [livro.titulo, livro.autor, livro.categoriaId, id]
    );
  }

  async removerPorId(id: number): Promise<void> {
    const [emprestimos] = await this.db.execute('SELECT * FROM Emprestimo WHERE livroId = ?', [id]);
    if ((emprestimos as any).length > 0) {
      throw new Error('Não é possível remover o livro, pois ele está associado a um empréstimo.');
    }
  
    await this.db.execute('DELETE FROM Livro WHERE id = ?', [id]);
  }  

}

export default new LivroModel();
