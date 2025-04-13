import EmprestimoModel, { Emprestimo } from '../models/Emprestimo';
import UsuarioModel from '../models/Usuario';
import PessoaModel from '../models/Pessoa';
import LivroModel from '../models/Livro';

class EmprestimoService {
  async criarEmprestimo(emprestimo: Emprestimo): Promise<number> {
    const livro = await LivroModel.buscarPorId(emprestimo.livroId);
    if (!livro) throw new Error('Livro não encontrado.');

    const usuario = await UsuarioModel.buscarPorId(emprestimo.usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    const pessoa = await PessoaModel.buscarPorId(usuario.idPessoa);
    if (!pessoa) throw new Error('Pessoa associada ao usuário não encontrada.');

    return EmprestimoModel.criar(emprestimo);
  }

  listarEmprestimos(): Promise<Emprestimo[]> {
    return EmprestimoModel.listar();
  }

  buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return EmprestimoModel.buscarPorId(id);
  }

  async buscarEmprestimosPorUsuarioId(usuarioId: number): Promise<Emprestimo[]> {
    const usuario = await UsuarioModel.buscarPorId(usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    return EmprestimoModel.buscarPorUsuarioId(usuarioId);
  }

  async atualizarEmprestimoPorId(id: number, emprestimo: Emprestimo): Promise<void> {
    const existente = await EmprestimoModel.buscarPorId(id);
    if (!existente) throw new Error('Empréstimo não encontrado.');

    const livro = await LivroModel.buscarPorId(emprestimo.livroId);
    if (!livro) throw new Error('Livro não encontrado.');

    const usuario = await UsuarioModel.buscarPorId(emprestimo.usuarioId);
    if (!usuario) throw new Error('Usuário não encontrado.');

    const pessoa = await PessoaModel.buscarPorId(usuario.idPessoa);
    if (!pessoa) throw new Error('Pessoa associada ao usuário não encontrada.');

    await EmprestimoModel.atualizarPorId(id, emprestimo);
  }

  async removerEmprestimoPorId(id: number): Promise<void> {
    const existente = await EmprestimoModel.buscarPorId(id);
    if (!existente) throw new Error('Empréstimo não encontrado.');

    await EmprestimoModel.removerPorId(id);
  }

}

export default new EmprestimoService();
