import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';

class UsuarioController {
  async criarUsuario(req: Request, res: Response) {
    try {
      const id = await UsuarioService.criarUsuario(req.body);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarUsuario(req: Request, res: Response) {
    const usuarios = await UsuarioService.listarUsuarios();
    res.json(usuarios);
  }

  async buscarUsuarioPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuario = await UsuarioService.buscarUsuarioPorId(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  }

  async atualizarUsuarioPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await UsuarioService.atualizarUsuarioPorId(id, req.body);
      res.json({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async removerUsuarioPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await UsuarioService.removerUsuarioPorId(id);
      res.json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

}

export default new UsuarioController();
