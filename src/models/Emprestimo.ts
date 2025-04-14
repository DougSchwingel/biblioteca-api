import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

//Interface Empréstimo
export interface Emprestimo extends RowDataPacket {
  id?: number;
  livroId: number;
  usuarioId: number;
  dataEmprestimo: string;
  dataDevolucao: string;
}

//Classe Empréstimo
class EmprestimoModel {
  private db = Database.getInstance();

  //Método para criar um empréstimo de livro com verificação de usuário e livro
  async criarEmprestimo(emprestimo: Emprestimo): Promise<number> {

    //Verifica se o livro existe
    const [livros] = await this.db.execute(
      'SELECT id FROM Livro WHERE id = ?',
      [emprestimo.livroId]
    );
    if ((livros as any[]).length === 0) {
      throw new Error('Livro não encontrado');
    }
  
    //Verifica se o usuário existe
    const [usuarios] = await this.db.execute(
      'SELECT id FROM Usuario WHERE id = ?',
      [emprestimo.usuarioId]
    );
    if ((usuarios as any[]).length === 0) {
      throw new Error('Usuário não encontrado');
    }
  
    //Caso ambos sejam verdadeiros cria o empréstimo
    const [result] = await this.db.execute(
      'INSERT INTO Emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)',
      [
        emprestimo.livroId,
        emprestimo.usuarioId,
        emprestimo.dataEmprestimo,
        emprestimo.dataDevolucao,
      ]
    );
  
    return (result as any).insertId;
  }  

  //Método para listar todos os empréstimos de livros
  async listarEmprestimo(): Promise<any[]> {
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

  //Método para buscar um empréstimo de livro pelo Id
  async buscarEmprestimoPorId(id: number): Promise<any> {
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
  
    const emprestimo = (rows as any[])[0];
  
    if (!emprestimo) {
      throw new Error(`Empréstimo com Id ${id} não encontrado.`);
    }
  
    return emprestimo;
  }  
 
  //Método para buscar todos os empréstimos de um usuário, com validação de usuário cadastrado
  async buscarEmprestimoPorUsuarioId(usuarioId: number): Promise<any[]> {
    //Verifica se o usuário existe
    const [usuarioRows] = await this.db.execute(
      'SELECT 1 FROM Usuario WHERE id = ?',
      [usuarioId]
    );
  
    if ((usuarioRows as any[]).length === 0) {
      throw new Error(`Usuário com Id ${usuarioId} não encontrado.`);
    }
  
    //Busca os empréstimos do usuário
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
   
  //Método para atualizar um empréstimo
  async atualizarEmprestimoPorId(id: number, emprestimo: Emprestimo): Promise<void> {
    //Verifica se o empréstimo existe
    const [rows] = await this.db.execute(
      'SELECT 1 FROM Emprestimo WHERE id = ?',
      [id]
    );

    if ((rows as any[]).length === 0) {
      throw new Error(`Empréstimo com Id ${id} não encontrado.`);
    }

    //Atualiza os dados do empréstimo
    await this.db.execute(
      'UPDATE Emprestimo SET livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?',
      [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, id]
    );
  }

  //Método para remover um empréstimo
  async removerEmprestimoPorId(id: number): Promise<void> {
    //Verifica se o empréstimo existe
    const [rows] = await this.db.execute(
      'SELECT 1 FROM Emprestimo WHERE id = ?',
      [id]
    );

    if ((rows as any[]).length === 0) {
      throw new Error(`Empréstimo com Id ${id} não encontrado.`);
    }

    //Remove o empréstimo
    await this.db.execute('DELETE FROM Emprestimo WHERE id = ?', [id]);
  }

}

export default new EmprestimoModel();
