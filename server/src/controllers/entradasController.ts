import { Request, Response, Router } from 'express';

import pool from '../database';

class EntradasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router entradasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const entradas = await pool.query('SELECT * FROM entradas');
        res.json(entradas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const   entradas = await pool.query('SELECT * FROM entradas WHERE id = ?', [id]);
        console.log(entradas.length);
        if (    entradas.length > 0) {
            return res.json(    entradas[0]);
        }
        res.status(404).json({ text: "The input doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO entradas set ?', [req.body]);
        res.json({ message: 'input Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldEntrada = req.body;
        await pool.query('UPDATE entradas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The input was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM entradas WHERE id = ?', [id]);
        res.json({ message: "The input was deleted" });
    }
}

const   entradasController = new  EntradasController;
export default  entradasController;