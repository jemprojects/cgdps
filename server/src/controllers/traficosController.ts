import { Request, Response, Router } from 'express';

import pool from '../database';

class TraficosController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router traficosController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const traficos = await pool.query('SELECT * FROM traficos');
        res.json(traficos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const traficos = await pool.query('SELECT * FROM traficos WHERE ID = ?', [id]);
        console.log(traficos.length);
        if (traficos.length > 0) {
            return res.json(traficos[0]);
        }
        res.status(404).json({ text: "The trafico doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO traficos set ?', [req.body]);
        res.json({ message: 'trafico Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldtrafico = req.body;
        await pool.query('UPDATE traficos set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The trafico was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM traficos WHERE ID = ?', [id]);
        res.json({ message: "The trafico was deleted" });
    }
}

const traficosController = new TraficosController;
export default traficosController;