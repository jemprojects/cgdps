import { Request, Response, Router } from 'express';

import pool from '../database';

class RubrosController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router rubroController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const rubro_esps = await pool.query('SELECT * FROM rubros');
        res.json(rubro_esps);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const rubro_esps = await pool.query('SELECT * FROM rubros WHERE ID = ?', [id]);
        console.log(rubro_esps.length);
        if (rubro_esps.length > 0) {
            return res.json(rubro_esps[0]);
        }
        res.status(404).json({ text: "The rubro_esp doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO rubros set ?', [req.body]);
        res.json({ message: 'rubro_esp Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldrubro_esp = req.body;
        await pool.query('UPDATE rubros set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The rubro_esp was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM rubros WHERE ID = ?', [id]);
        res.json({ message: "The rubro_esp was deleted" });
    }
}

const rubrosController = new RubrosController;
export default rubrosController;