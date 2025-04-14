import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

//Interface Livro
export interface Livro extends RowDataPacket {
  id?: number;
  titulo: string;
  autor: string;
  categoriaId: number;
}

//Classe Livro
class LivroModel {
  private db = Database.getInstance();

  //Método para criar um livro
  async criarLivro(livro: Livro): Promise<number> {
    const categoriaExiste = await this.db.execute('SELECT * FROM Categoria WHERE id = ?', [livro.categoriaId]);
    if ((categoriaExiste[0] as any[]).length === 0) {
      throw new Error('Categoria informada não existe.');
    }

    const [result] = await this.db.execute(
      'INSERT INTO Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)',
      [livro.titulo, livro.autor, livro.categoriaId]
    );
    return (result as any).insertId;
  }

  //Método para listar todos os livros com suas categorias
  async listarLivro(): Promise<any[]> {
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

  //Método para buscar livro por Id
  async buscarLivroPorId(id: number): Promise<any | null> {
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

  //Método para atualizar um livro
  async atualizarLivroPorId(id: number, livro: Livro): Promise<void> {
    const livroExistente = await this.buscarLivroPorId(id);
    if (!livroExistente) {
      throw new Error('Livro não encontrado.');
    }

    const categoriaExiste = await this.db.execute('SELECT * FROM Categoria WHERE id = ?', [livro.categoriaId]);
    if ((categoriaExiste[0] as any[]).length === 0) {
      throw new Error('Categoria informada não existe.');
    }

    await this.db.execute(
      'UPDATE Livro SET titulo = ?, autor = ?, categoriaId = ? WHERE id = ?',
      [livro.titulo, livro.autor, livro.categoriaId, id]
    );
  }

  //Método para remover um livro, se não houver empréstimos vinculados
  async removerLivroPorId(id: number): Promise<void> {
    const livroExistente = await this.buscarLivroPorId(id);
    if (!livroExistente) {
      throw new Error('Livro não encontrado.');
    }

    const [emprestimos] = await this.db.execute('SELECT * FROM Emprestimo WHERE livroId = ?', [id]);
    if ((emprestimos as any[]).length > 0) {
      throw new Error('Não é possível remover o livro, pois ele está vinculado a um empréstimo.');
    }

    await this.db.execute('DELETE FROM Livro WHERE id = ?', [id]);
  }
}

export default new LivroModel();
