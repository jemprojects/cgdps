import { Request, Response, Router } from 'express';

import pool from '../database';

class BuquesController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router BuquesController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const buques = await pool.query('SELECT * FROM esp');
        res.json(buques);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const buques = await pool.query('SELECT * FROM buques WHERE ORDEN = ?', [id]);
        console.log(buques.length);
        if (buques.length > 0) {
            return res.json(buques[0]);
        }
        res.status(404).json({ text: "The buque doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO buques set ?', [req.body]);
        res.json({ message: 'Buque Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldBuque = req.body;
        await pool.query('UPDATE buques set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The buque was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM buques WHERE ORDEN = ?', [id]);
        res.json({ message: "The buque was deleted" });
    }
}

const buquesController = new BuquesController;
export default buquesController;