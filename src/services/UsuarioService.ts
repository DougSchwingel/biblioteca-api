import bcrypt from 'bcrypt';
import UsuarioModel, { Usuario } from '../models/Usuario';
import PessoaModel from '../models/Pessoa';

class UsuarioService {
  async criarUsuario(usuario: Usuario): Promise<number> {
    const pessoaExiste = await PessoaModel.buscarPessoaPorId(usuario.idPessoa);
    if (!pessoaExiste) {
      throw new Error('Pessoa não encontrada.');
    }

    const usuarioExistente = await UsuarioModel.buscarUsuarioPorPessoaId(usuario.idPessoa);
    if (usuarioExistente) {
      throw new Error('Usuário já cadastrado para essa pessoa.');
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    return UsuarioModel.criarUsuario({
      ...usuario,
      senha: senhaCriptografada,
    });
  }

  listarUsuarios(): Promise<Usuario[]> {
    return UsuarioModel.listarUsuario();
  }

  buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    return UsuarioModel.buscarUsuarioPorId(id);
  }

  async atualizarUsuarioPorId(id: number, usuario: Usuario): Promise<void> {
    const existente = await UsuarioModel.buscarUsuarioPorId(id);
    if (!existente) {
      throw new Error('Usuário não encontrado.');
    }

    const pessoaExiste = await PessoaModel.buscarPessoaPorId(usuario.idPessoa);
    if (!pessoaExiste) {
      throw new Error('Pessoa não encontrada.');
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    await UsuarioModel.atualizarUsuarioPorId(id, {
      ...usuario,
      senha: senhaCriptografada,
    });
  }

  async removerUsuarioPorId(id: number): Promise<void> {
    const existente = await UsuarioModel.buscarUsuarioPorId(id);
    if (!existente) {
      throw new Error('Usuário não encontrado.');
    }

    await UsuarioModel.removerUsuarioPorId(id);
  }

}

export default new UsuarioService();
