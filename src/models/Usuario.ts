import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

//Interface Usuário
export interface Usuario extends RowDataPacket {
  id?: number;
  idPessoa: number;
  senha: string;
}

//Classe Usuário
class UsuarioModel {
  private db = Database.getInstance();

  //Método para criar um novo usuário
  async criarUsuario(usuario: Usuario): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Usuario (idPessoa, senha) VALUES (?, ?)',
      [usuario.idPessoa, usuario.senha]
    );
    return (result as any).insertId;
  }

  //Método para listar todos os usuários
  async listarUsuario(): Promise<any[]> {
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

  //Método para buscar um usuário por Id
  async buscarUsuarioPorId(id: number): Promise<any | null> {
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

  //Método para buscar um usuário pelo Id da pessoa
  async buscarUsuarioPorPessoaId(idPessoa: number): Promise<any | null> {
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

  //Método para atualizar um usuário existente 
  async atualizarUsuarioPorId(id: number, usuario: Usuario): Promise<void> {
    const usuarioExistente = await this.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado.');
    }

    await this.db.execute(
      'UPDATE Usuario SET idPessoa = ?, senha = ? WHERE id = ?',
      [usuario.idPessoa, usuario.senha, id]
    );
  }

  //Método para remover um usuário, se não houver um empréstimo associado 
  async removerUsuarioPorId(id: number): Promise<void> {
    const usuarioExistente = await this.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado.');
    }

    const [emprestimos] = await this.db.execute('SELECT * FROM Emprestimo WHERE usuarioId = ?', [id]);
    if ((emprestimos as any[]).length > 0) {
      throw new Error('Não é possível remover o usuário, pois há empréstimos associados.');
    }

    await this.db.execute('DELETE FROM Usuario WHERE id = ?', [id]);
  }
}

export default new UsuarioModel();
