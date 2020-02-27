import { Request, Response, Router } from 'express';

import pool from '../database';

class DocumentosController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router documentosController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const documentos = await pool.query('SELECT * FROM documentos');
        res.json(documentos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const documentos = await pool.query('SELECT * FROM documentos WHERE ORDEN = ?', [id]);
        console.log(documentos.length);
        if (documentos.length > 0) {
            return res.json(documentos[0]);
        }
        res.status(404).json({ text: "The documento doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO documentos set ?', [req.body]);
        res.json({ message: 'documento Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const olddocumento = req.body;
        await pool.query('UPDATE documentos set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The documento was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM documentos WHERE ORDEN = ?', [id]);
        res.json({ message: "The documento was deleted" });
    }
}

const documentosController = new DocumentosController;
export default documentosController;