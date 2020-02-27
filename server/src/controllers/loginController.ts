import { Request, Response, Router } from 'express';

import pool from '../database';

class LoginController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router loginController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const login = await pool.query('SELECT * FROM login');
        res.json(login);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const login = await pool.query('SELECT * FROM login WHERE ORDEN = ?', [id]);
        console.log(login.length);
        if (login.length > 0) {
            return res.json(login[0]);
        }
        res.status(404).json({ text: "The buque doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO login set ?', [req.body]);
        res.json({ message: 'Buque Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldBuque = req.body;
        await pool.query('UPDATE login set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The buque was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM login WHERE ORDEN = ?', [id]);
        res.json({ message: "The buque was deleted" });
    }
}

const loginController = new LoginController;
export default loginController;