import { Request, Response, Router } from 'express';

import pool from '../database';

class PuertosController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router puertosController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const puertos = await pool.query('SELECT * FROM puertos');
        res.json(puertos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const puertos = await pool.query('SELECT * FROM puertos WHERE ORDEN = ?', [id]);
        console.log(puertos.length);
        if (puertos.length > 0) {
            return res.json(puertos[0]);
        }
        res.status(404).json({ text: "The puerto doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO puertos set ?', [req.body]);
        res.json({ message: 'puerto Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldpuerto = req.body;
        await pool.query('UPDATE puertos set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The puerto was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM puertos WHERE ORDEN = ?', [id]);
        res.json({ message: "The puerto was deleted" });
    }
}

const puertosController = new PuertosController;
export default puertosController;