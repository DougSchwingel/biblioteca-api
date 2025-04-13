import bcrypt from 'bcrypt';
import UsuarioModel, { Usuario } from '../models/Usuario';
import PessoaModel from '../models/Pessoa';

class UsuarioService {
  async criarUsuario(usuario: Usuario): Promise<number> {
    const pessoaExiste = await PessoaModel.buscarPorId(usuario.idPessoa);
    if (!pessoaExiste) {
      throw new Error('Pessoa não encontrada.');
    }

    const usuarioExistente = await UsuarioModel.buscarPorPessoaId(usuario.idPessoa);
    if (usuarioExistente) {
      throw new Error('Usuário já cadastrado para essa pessoa.');
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    return UsuarioModel.criar({
      ...usuario,
      senha: senhaCriptografada,
    });
  }

  listarUsuarios(): Promise<Usuario[]> {
    return UsuarioModel.listar();
  }

  buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    return UsuarioModel.buscarPorId(id);
  }

  async atualizarUsuarioPorId(id: number, usuario: Usuario): Promise<void> {
    const existente = await UsuarioModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Usuário não encontrado.');
    }

    const pessoaExiste = await PessoaModel.buscarPorId(usuario.idPessoa);
    if (!pessoaExiste) {
      throw new Error('Pessoa não encontrada.');
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    await UsuarioModel.atualizarPorId(id, {
      ...usuario,
      senha: senhaCriptografada,
    });
  }

  async removerUsuarioPorId(id: number): Promise<void> {
    const existente = await UsuarioModel.buscarPorId(id);
    if (!existente) {
      throw new Error('Usuário não encontrado.');
    }

    await UsuarioModel.removerPorId(id);
  }

}

export default new UsuarioService();
