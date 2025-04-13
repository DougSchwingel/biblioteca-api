import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

export interface Usuario extends RowDataPacket {
  id?: number;
  idPessoa: number;
  senha: string;
}

class UsuarioModel {
  private db = Database.getInstance();

  async criar(usuario: Usuario): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Usuario (idPessoa, senha) VALUES (?, ?)',
      [usuario.idPessoa, usuario.senha]
    );
    return (result as any).insertId;
  }

  async listar(): Promise<any[]> {
    const [rows] = await this.db.execute(`
      SELECT 
        u.id,
        u.idPessoa,
        p.nome AS nomePessoa,
        p.email AS emailPessoa
      FROM Usuario u
      JOIN Pessoa p ON u.idPessoa = p.id
    `);
    return rows as any[];
  }  

  async buscarPorId(id: number): Promise<any | null> {
    const [rows] = await this.db.execute(`
      SELECT 
        u.id,
        u.idPessoa,
        p.nome AS nomePessoa,
        p.email AS emailPessoa
      FROM Usuario u
      JOIN Pessoa p ON u.idPessoa = p.id
      WHERE u.id = ?
    `, [id]);
    return (rows as any[])[0] || null;
  }

  async buscarPorPessoaId(idPessoa: number): Promise<any | null> {
    const [rows] = await this.db.execute(`
      SELECT 
        u.id,
        u.idPessoa,
        p.nome AS nomePessoa,
        p.email AS emailPessoa
      FROM Usuario u
      JOIN Pessoa p ON u.idPessoa = p.id
      WHERE u.idPessoa = ?
    `, [idPessoa]);
    return (rows as any[])[0] || null;
  }  

  async atualizarPorId(id: number, usuario: Usuario): Promise<void> {
    await this.db.execute(
      'UPDATE Usuario SET idPessoa = ?, senha = ? WHERE id = ?',
      [usuario.idPessoa, usuario.senha, id]
    );
  }

  async removerPorId(id: number): Promise<void> {
    const [emprestimos] = await this.db.execute('SELECT * FROM Emprestimo WHERE usuarioId = ?', [id]);
    if ((emprestimos as any).length > 0) {
      throw new Error('Não é possível remover o usuário, pois há empréstimos associados.');
    }
  
    await this.db.execute('DELETE FROM Usuario WHERE id = ?', [id]);
  }
  

}

export default new UsuarioModel();
