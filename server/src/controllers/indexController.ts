import { Request, Response } from 'express';

import pool from '../database';

class IndexController {

    public index(req: Request, res: Response) {
        res.json({text: 'API is in /users'});
    }
    public async list(req: Request, res: Response): Promise<void> {
        const users = await pool.query('SELECT * FROM users');
        res.json(users);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE ORDEN = ?', [id]);
        console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The user doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'user Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE users set ? WHERE orden = ?', [req.body, id]);
        res.json({ message: "The user was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE ORDEN = ?', [id]);
        res.json({ message: "The user was deleted" });
    }

}

export const indexController = new IndexController;
