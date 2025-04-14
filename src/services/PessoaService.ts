import PessoaModel, { Pessoa } from '../models/Pessoa';

class PessoaService {
  async criarPessoa(pessoa: Pessoa): Promise<number> {
    const existente = await PessoaModel.buscarPessoaPorEmail(pessoa.email);
    if (existente) {
      throw new Error('Email já cadastrado.');
    }

    return PessoaModel.criarPessoa(pessoa);
  }

  listarPessoas(): Promise<Pessoa[]> {
    return PessoaModel.listarPessoa();
  }

  buscarPessoaPorId(id: number): Promise<Pessoa | null> {
    return PessoaModel.buscarPessoaPorId(id);
  }

  async atualizarPessoaPorId(id: number, pessoa: Pessoa): Promise<void> {
    const existente = await PessoaModel.buscarPessoaPorId(id);
    if (!existente) {
      throw new Error('Pessoa não encontrada.');
    }

    const emailEmUso = await PessoaModel.buscarPessoaPorEmail(pessoa.email);
    if (emailEmUso && emailEmUso.id !== id) {
      throw new Error('Email já está em uso por outra pessoa.');
    }

    await PessoaModel.atualizarPessoaPorId(id, pessoa);
  }

  async removerPessoaPorId(id: number): Promise<void> {
    const existente = await PessoaModel.buscarPessoaPorId(id);
    if (!existente) {
      throw new Error('Pessoa não encontrada.');
    }

    await PessoaModel.removerPessoaPorId(id);
  }

}

export default new PessoaService();
