import { Request, Response, Router } from 'express';

import pool from '../database';

class EspsController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router espsController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const esps = await pool.query('SELECT * FROM esps');
        res.json(esps);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const esps = await pool.query('SELECT * FROM esps WHERE ORDEN = ?', [id]);
        console.log(esps.length);
        if (esps.length > 0) {
            return res.json(esps[0]);
        }
        res.status(404).json({ text: "The esp doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO esps set ?', [req.body]);
        res.json({ message: 'esp Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldesp = req.body;
        await pool.query('UPDATE esps set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The esp was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM esps WHERE ORDEN = ?', [id]);
        res.json({ message: "The esp was deleted" });
    }
}

const espsController = new EspsController;
export default espsController;