import { Request, Response, Router } from 'express';

import pool from '../database';

class AgenciasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router agenciasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const agencias = await pool.query('SELECT * FROM agencias');
        res.json(agencias);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const agencias = await pool.query('SELECT * FROM agencias WHERE ORDEN = ?', [id]);
        console.log(agencias.length);
        if (agencias.length > 0) {
            return res.json(agencias[0]);
        }
        res.status(404).json({ text: "The agencia doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO agencias set ?', [req.body]);
        res.json({ message: 'agencia Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldagencia = req.body;
        await pool.query('UPDATE agencias set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The agencia was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM agencias WHERE ORDEN = ?', [id]);
        res.json({ message: "The agencia was deleted" });
    }
}

const agenciasController = new AgenciasController;
export default agenciasController;