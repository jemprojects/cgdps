import { Request, Response, Router } from 'express';

import pool from '../database';

class OperacionsController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router operacionsController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const operacions = await pool.query('SELECT * FROM operacions');
        res.json(operacions);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const operacions = await pool.query('SELECT * FROM operacions WHERE ORDEN = ?', [id]);
        console.log(operacions.length);
        if (operacions.length > 0) {
            return res.json(operacions[0]);
        }
        res.status(404).json({ text: "The operacion doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO operacions set ?', [req.body]);
        res.json({ message: 'operacion Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldoperacion = req.body;
        await pool.query('UPDATE operacions set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The operacion was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM operacions WHERE ORDEN = ?', [id]);
        res.json({ message: "The operacion was deleted" });
    }
}

const operacionsController = new OperacionsController;
export default operacionsController;