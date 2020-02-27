import { Request, Response, Router } from 'express';

import pool from '../database';

class EmpresasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router empresasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const empresas = await pool.query('SELECT * FROM empresas');
        res.json(empresas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresas = await pool.query('SELECT * FROM empresas WHERE ORDEN = ?', [id]);
        console.log(empresas.length);
        if (empresas.length > 0) {
            return res.json(empresas[0]);
        }
        res.status(404).json({ text: "The empresa doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO empresas set ?', [req.body]);
        res.json({ message: 'empresa Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldempresa = req.body;
        await pool.query('UPDATE empresas set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The empresa was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM empresas WHERE ORDEN = ?', [id]);
        res.json({ message: "The empresa was deleted" });
    }
}

const empresasController = new EmpresasController;
export default empresasController;