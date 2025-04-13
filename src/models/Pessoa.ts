import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

export interface Pessoa extends RowDataPacket {
  id?: number;
  nome: string;
  email: string;
}

class PessoaModel {
  private db = Database.getInstance();

  async criar(pessoa: Pessoa): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Pessoa (nome, email) VALUES (?, ?)',
      [pessoa.nome, pessoa.email]
    );
    return (result as any).insertId;
  }

  async listar(): Promise<Pessoa[]> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa');
    return rows as Pessoa[];
  }

  async buscarPorId(id: number): Promise<Pessoa | null> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa WHERE id = ?', [id]);
    const pessoas = rows as Pessoa[];
    return pessoas[0] || null;
  }

  async buscarPorEmail(email: string): Promise<Pessoa | null> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa WHERE email = ?', [email]);
    const pessoas = rows as Pessoa[];
    return pessoas[0] || null;
  }

  async atualizarPorId(id: number, pessoa: Pessoa): Promise<void> {
    await this.db.execute(
      'UPDATE Pessoa SET nome = ?, email = ? WHERE id = ?',
      [pessoa.nome, pessoa.email, id]
    );
  }

  async removerPorId(id: number): Promise<void> {
    const [usuario] = await this.db.execute('SELECT * FROM Usuario WHERE idPessoa = ?', [id]);
    if ((usuario as any).length > 0) {
      throw new Error('Não é possível remover a pessoa, pois há um usuário associado.');
    }
  
    await this.db.execute('DELETE FROM Pessoa WHERE id = ?', [id]);
  }
  

}

export default new PessoaModel();
