import { Request, Response, Router } from 'express';

import pool from '../database';

class BanderasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router banderasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const banderas = await pool.query('SELECT * FROM banderas');
        res.json(banderas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const banderas = await pool.query('SELECT * FROM banderas WHERE ORDEN = ?', [id]);
        console.log(banderas.length);
        if (banderas.length > 0) {
            return res.json(banderas[0]);
        }
        res.status(404).json({ text: "The bandera doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO banderas set ?', [req.body]);
        res.json({ message: 'bandera Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldbandera = req.body;
        await pool.query('UPDATE banderas set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The bandera was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM banderas WHERE ORDEN = ?', [id]);
        res.json({ message: "The bandera was deleted" });
    }
}

const banderasController = new BanderasController;
export default banderasController;