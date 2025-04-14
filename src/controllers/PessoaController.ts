import { Request, Response } from 'express';
import PessoaService from '../services/PessoaService';

class PessoaController {
  async criarPessoa(req: Request, res: Response) {
    try {
      const id = await PessoaService.criarPessoa(req.body);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarPessoa(req: Request, res: Response) {
    const pessoas = await PessoaService.listarPessoas();
    res.json(pessoas);
  }

  async buscarPessoaPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const pessoa = await PessoaService.buscarPessoaPorId(id);
    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ erro: 'Pessoa não encontrada' });
    }
  }

  async atualizarPessoaPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await PessoaService.atualizarPessoaPorId(id, req.body);
      res.json({ mensagem: 'Pessoa atualizada com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async removerPessoaPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await PessoaService.removerPessoaPorId(id);
      res.json({ mensagem: 'Pessoa removida com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

}

export default new PessoaController();
