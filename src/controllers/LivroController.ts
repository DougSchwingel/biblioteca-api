import { Request, Response } from 'express';
import LivroService from '../services/LivroService';

class LivroController {
  async criarLivro(req: Request, res: Response) {
    try {
      const id = await LivroService.criarLivro(req.body);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarLivro(req: Request, res: Response) {
    const livros = await LivroService.listarLivros();
    res.json(livros);
  }

  async buscarLivroPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const livro = await LivroService.buscarLivroPorId(id);
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ erro: 'Livro não encontrado' });
    }
  }

  async atualizarLivroPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await LivroService.atualizarLivroPorId(id, req.body);
      res.json({ mensagem: 'Livro atualizado com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async removerLivroPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await LivroService.removerLivroPorId(id);
      res.json({ mensagem: 'Livro removido com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

}

export default new LivroController();
