import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

//Interface Pessoa
export interface Pessoa extends RowDataPacket {
  id?: number;
  nome: string;
  email: string;
}

//Classe Pessoa
class PessoaModel {
  private db = Database.getInstance();

  //Método para criar uma nova pessoa
  async criarPessoa(pessoa: Pessoa): Promise<number> {
    const [result] = await this.db.execute(
      'INSERT INTO Pessoa (nome, email) VALUES (?, ?)',
      [pessoa.nome, pessoa.email]
    );
    return (result as any).insertId;
  }

  //Método para listar todas as pessoas
  async listarPessoa(): Promise<Pessoa[]> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa');
    return rows as Pessoa[];
  }

  //Método para buscar uma pessoa por Id
  async buscarPessoaPorId(id: number): Promise<Pessoa | null> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa WHERE id = ?', [id]);
    const pessoas = rows as Pessoa[];
    return pessoas[0] || null;
  }

  //Método para buscar uma pessoa por email
  async buscarPessoaPorEmail(email: string): Promise<Pessoa | null> {
    const [rows] = await this.db.execute('SELECT * FROM Pessoa WHERE email = ?', [email]);
    const pessoas = rows as Pessoa[];
    return pessoas[0] || null;
  }

  //Método para atualizar uma pessoa existente
  async atualizarPessoaPorId(id: number, pessoa: Pessoa): Promise<void> {
    const pessoaExistente = await this.buscarPessoaPorId(id);
    if (!pessoaExistente) {
      throw new Error('Pessoa não encontrada.');
    }

    await this.db.execute(
      'UPDATE Pessoa SET nome = ?, email = ? WHERE id = ?',
      [pessoa.nome, pessoa.email, id]
    );
  }

  //Método para remover uma pessoa, se não houver usuário associado
  async removerPessoaPorId(id: number): Promise<void> {
    const pessoaExistente = await this.buscarPessoaPorId(id);
    if (!pessoaExistente) {
      throw new Error('Pessoa não encontrada.');
    }

    const [usuario] = await this.db.execute('SELECT * FROM Usuario WHERE idPessoa = ?', [id]);
    if ((usuario as any[]).length > 0) {
      throw new Error('Não é possível remover a pessoa, pois há um usuário associado.');
    }

    await this.db.execute('DELETE FROM Pessoa WHERE id = ?', [id]);
  }
}

export default new PessoaModel();
