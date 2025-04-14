import { Request, Response } from 'express';
import CategoriaService from '../services/CategoriaService';

class CategoriaController {
  async criarCategoria(req: Request, res: Response) {
    try {
      const id = await CategoriaService.criarCategoria(req.body);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarCategoria(req: Request, res: Response) {
    const categorias = await CategoriaService.listarCategorias();
    res.json(categorias);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const categoria = await CategoriaService.buscarCategoriaPorId(id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ erro: 'Categoria não encontrada.' });
    }
  }

  async atualizarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await CategoriaService.atualizarCategoria(id, req.body);
      res.json({ mensagem: 'Categoria atualizada com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async removerPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await CategoriaService.removerCategoria(id);
      res.json({ mensagem: 'Categoria removida com sucesso.' });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
}

export default new CategoriaController();
