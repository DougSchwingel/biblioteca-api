import EmprestimoModel, { Emprestimo } from '../models/Emprestimo';
import UsuarioModel from '../models/Usuario';
import PessoaModel from '../models/Pessoa';
import LivroModel from '../models/Livro';

class EmprestimoService {
  async criarEmprestimo(emprestimo: Emprestimo): Promise<number> {
    const livro = await LivroModel.buscarLivroPorId(emprestimo.livroId);
    if (!livro) throw new Error('Livro não encontrado.');

    const usuario = await UsuarioModel.buscarUsuarioPorId(emprestimo.usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    const pessoa = await PessoaModel.buscarPessoaPorId(usuario.idPessoa);
    if (!pessoa) throw new Error('Pessoa associada ao usuário não encontrada.');

    return EmprestimoModel.criarEmprestimo(emprestimo);
  }

  listarEmprestimos(): Promise<Emprestimo[]> {
    return EmprestimoModel.listarEmprestimo();
  }

  buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return EmprestimoModel.buscarEmprestimoPorId(id);
  }

  async buscarEmprestimosPorUsuarioId(usuarioId: number): Promise<Emprestimo[]> {
    const usuario = await UsuarioModel.buscarUsuarioPorId(usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    return EmprestimoModel.buscarEmprestimoPorUsuarioId(usuarioId);
  }

  async atualizarEmprestimoPorId(id: number, emprestimo: Emprestimo): Promise<void> {
    const existente = await EmprestimoModel.buscarEmprestimoPorId(id);
    if (!existente) throw new Error('Empréstimo não encontrado.');

    const livro = await LivroModel.buscarLivroPorId(emprestimo.livroId);
    if (!livro) throw new Error('Livro não encontrado.');

    const usuario = await UsuarioModel.buscarUsuarioPorId(emprestimo.usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    const pessoa = await PessoaModel.buscarPessoaPorId(usuario.idPessoa);
    if (!pessoa) throw new Error('Pessoa associada ao usuário não encontrada.');

    await EmprestimoModel.atualizarEmprestimoPorId(id, emprestimo);
  }

  async removerEmprestimoPorId(id: number): Promise<void> {
    const existente = await EmprestimoModel.buscarEmprestimoPorId(id);
    if (!existente) throw new Error('Empréstimo não encontrado.');

    await EmprestimoModel.removerEmprestimoPorId(id);
  }

}

export default new EmprestimoService();
