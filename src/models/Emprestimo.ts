import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

export interface Emprestimo extends RowDataPacket {
  id?: number;
  livroId: number;
  usuarioId: number;
  dataEmprestimo: string;
  dataDevolucao: string;
}

class EmprestimoModel {
  private db = Database.getInstance();

  async criar(emprestimo: Emprestimo): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)',
      [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]
    );
    return (result as any).insertId;
  }

  async listar(): Promise<any[]> {
    const [rows] = await this.db.execute(`
      SELECT 
        e.id,
        e.dataEmprestimo,
        e.dataDevolucao,
        l.titulo AS tituloLivro,
        c.nome AS nomeCategoria,
        p.nome AS nomePessoa
      FROM Emprestimo e
      JOIN Livro l ON e.livroId = l.id
      JOIN Categoria c ON l.categoriaId = c.id
      JOIN Usuario u ON e.usuarioId = u.id
      JOIN Pessoa p ON u.idPessoa = p.id
    `);
    return rows as any[];
  }  

  async buscarPorId(id: number): Promise<any | null> {
    const [rows] = await this.db.execute(`
      SELECT 
        e.id,
        e.dataEmprestimo,
        e.dataDevolucao,
        l.titulo AS tituloLivro,
        c.nome AS nomeCategoria,
        p.nome AS nomePessoa
      FROM Emprestimo e
      JOIN Livro l ON e.livroId = l.id
      JOIN Categoria c ON l.categoriaId = c.id
      JOIN Usuario u ON e.usuarioId = u.id
      JOIN Pessoa p ON u.idPessoa = p.id
      WHERE e.id = ?
    `, [id]);
    return (rows as any[])[0] || null;
  }
 
  async buscarPorUsuarioId(usuarioId: number): Promise<any[]> {
    const [rows] = await this.db.execute(`
      SELECT 
        e.id,
        e.dataEmprestimo,
        e.dataDevolucao,
        l.titulo AS tituloLivro,
        c.nome AS nomeCategoria,
        p.nome AS nomePessoa
      FROM Emprestimo e
      JOIN Livro l ON e.livroId = l.id
      JOIN Categoria c ON l.categoriaId = c.id
      JOIN Usuario u ON e.usuarioId = u.id
      JOIN Pessoa p ON u.idPessoa = p.id
      WHERE e.usuarioId = ?
    `, [usuarioId]);
    return rows as any[];
  }  

  async atualizarPorId(id: number, emprestimo: Emprestimo): Promise<void> {
    await this.db.execute(
      'UPDATE Emprestimo SET livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?',
      [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, id]
    );
  }

  async removerPorId(id: number): Promise<void> {
    await this.db.execute('DELETE FROM Emprestimo WHERE id = ?', [id]);
  }

}

export default new EmprestimoModel();
