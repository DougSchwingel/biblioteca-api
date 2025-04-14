import { Request, Response } from 'express';
import EmprestimoService from '../services/EmprestimoService';

class EmprestimoController {
  async criarEmprestimo(req: Request, res: Response) {
    try {
      const id = await EmprestimoService.criarEmprestimo(req.body);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarEmprestimo(req: Request, res: Response) {
    const emprestimos = await EmprestimoService.listarEmprestimos();
    res.json(emprestimos);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const emprestimo = await EmprestimoService.buscarEmprestimoPorId(id);
    if (emprestimo) {
      res.json(emprestimo);
    } else {
      res.status(404).json({ erro: 'Empréstimo não encontrado.' });
    }
  }

  async buscarPorUsuario(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const emprestimos = await EmprestimoService.buscarEmprestimosPorUsuarioId(usuarioId);
      res.json(emprestimos);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async atualizarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await EmprestimoService.atualizarEmprestimoPorId(id, req.body);
      res.json({ mensagem: 'Empréstimo atualizado com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async removerPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await EmprestimoService.removerEmprestimoPorId(id);
      res.json({ mensagem: 'Empréstimo removido com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

}

export default new EmprestimoController();
