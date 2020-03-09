import { Request, Response, Router } from 'express';

import pool from '../database';

class EnvasesController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router envasesController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const envases = await pool.query('SELECT * FROM envases_carg_desc');
        res.json(envases);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const envases = await pool.query('SELECT * FROM envases_carg_desc WHERE ID = ?', [id]);
        console.log(envases.length);
        if (envases.length > 0) {
            return res.json(envases[0]);
        }
        res.status(404).json({ text: "The envase doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO envases_carg_desc set ?', [req.body]);
        res.json({ message: 'envase Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldenvase = req.body;
        await pool.query('UPDATE envases_carg_desc set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The envase was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM envases_carg_desc WHERE ID = ?', [id]);
        res.json({ message: "The envase was deleted" });
    }
}

const envasesController = new EnvasesController;
export default envasesController;