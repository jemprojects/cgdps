import { Request, Response, Router } from 'express';

import pool from '../database';

class TiposController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router tiposController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const tipos = await pool.query('SELECT * FROM tipos');
        res.json(tipos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tipos = await pool.query('SELECT * FROM tipos WHERE ID = ?', [id]);
        console.log(tipos.length);
        if (tipos.length > 0) {
            return res.json(tipos[0]);
        }
        res.status(404).json({ text: "The tipo doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO tipos set ?', [req.body]);
        res.json({ message: 'tipo Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldtipo = req.body;
        await pool.query('UPDATE tipos set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The tipo was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM tipos WHERE ID = ?', [id]);
        res.json({ message: "The tipo was deleted" });
    }
}

const tiposController = new TiposController;
export default tiposController;