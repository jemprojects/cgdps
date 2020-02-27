import { Request, Response, Router } from 'express';

import pool from '../database';

class GirosController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router girosController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const giros = await pool.query('SELECT * FROM giros');
        res.json(giros);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const giros = await pool.query('SELECT * FROM giros WHERE ORDEN = ?', [id]);
        console.log(giros.length);
        if (giros.length > 0) {
            return res.json(giros[0]);
        }
        res.status(404).json({ text: "The giro doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO giros set ?', [req.body]);
        res.json({ message: 'giro Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldgiro = req.body;
        await pool.query('UPDATE giros set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The giro was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM giros WHERE ORDEN = ?', [id]);
        res.json({ message: "The giro was deleted" });
    }
}

const girosController = new GirosController;
export default girosController;