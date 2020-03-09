import { Request, Response, Router } from 'express';

import pool from '../database';

class MercaderiasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router mercaderiasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const mercaderias = await pool.query('SELECT * FROM mercaderias');
        res.json(mercaderias);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const mercaderias = await pool.query('SELECT * FROM mercaderias WHERE ORDEN = ?', [id]);
        console.log(mercaderias.length);
        if (mercaderias.length > 0) {
            return res.json(mercaderias[0]);
        }
        res.status(404).json({ text: "The mercaderia doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO mercaderias set ?', [req.body]);
        res.json({ message: 'mercaderia Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldmercaderia = req.body;
        await pool.query('UPDATE mercaderias set ? WHERE ORDEN = ?', [req.body, id]);
        res.json({ message: "The mercaderia was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM mercaderias WHERE ORDEN = ?', [id]);
        res.json({ message: "The mercaderia was deleted" });
    }
}

const mercaderiasController = new MercaderiasController;
export default mercaderiasController;