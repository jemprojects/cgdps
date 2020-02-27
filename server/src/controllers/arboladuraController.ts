import { Request, Response, Router } from 'express';

import pool from '../database';

class ArboladurasController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router ArboladurasController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const arboladuras = await pool.query('SELECT * FROM arboladuras');
        res.json(arboladuras);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const arboladuras = await pool.query('SELECT * FROM arboladuras WHERE ORDEN = ?', [id]);
        console.log(arboladuras.length);
        if (arboladuras.length > 0) {
            return res.json(arboladuras[0]);
        }
        res.status(404).json({ text: "The arboladura doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO arboladuras set ?', [req.body]);
        res.json({ message: 'arboladura Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldarboladura = req.body;
        await pool.query('UPDATE arboladuras set ? WHERE otden = ?', [req.body, id]);
        res.json({ message: "The arboladura was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM arboladuras WHERE ORDEN = ?', [id]);
        res.json({ message: "The arboladura was deleted" });
    }
}

const arboladurasController = new ArboladurasController;
export default arboladurasController;