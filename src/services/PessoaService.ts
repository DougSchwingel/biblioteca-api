import PessoaModel, { Pessoa } from '../models/Pessoa';

class PessoaService {
  async criarPessoa(pessoa: Pessoa): Promise<number> {
    const existente = await PessoaModel.buscarPorEmail(pessoa.email);
    if (existente) {
      throw new Error('Email já cadastrado.');
    }

    return PessoaModel.criar(pessoa);
  }

  listarPessoas(): Promise<Pessoa[]> {
    return PessoaModel.listar();
  }

  buscarPessoaPorId(id: number): Promise<Pessoa | null> {
    return PessoaModel.buscarPorId(id);
  }

  async atualizarPessoaPorId(id: number, pessoa: Pessoa): Promise<void> {
    const existente = await PessoaModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Pessoa não encontrada.');
    }

    const emailEmUso = await PessoaModel.buscarPorEmail(pessoa.email);
    if (emailEmUso && emailEmUso.id !== id) {
      throw new Error('Email já está em uso por outra pessoa.');
    }

    await PessoaModel.atualizarPorId(id, pessoa);
  }

  async removerPessoaPorId(id: number): Promise<void> {
    const existente = await PessoaModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Pessoa não encontrada.');
    }

    await PessoaModel.removerPorId(id);
  }

}

export default new PessoaService();
