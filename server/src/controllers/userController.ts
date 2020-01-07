import { Request, Response, Router } from 'express';

import pool from '../database';

class UserController {
    public login(req: Request, res: Response){
        res.json({text: 'Probando Router userController'})
    }
    public async createuser(req: Request, res: Response): Promise<void> {
        const user = await pool.query('SELECT * FROM user');
        res.json(user);
    }

    public async getUserByUserEmail(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const   user = await pool.query('SELECT * FROM user WHERE ID = ?', [id]);
        console.log(user.length);
        if (    user.length > 0) {
            return res.json(    user[0]);
        }
        res.status(404).json({ text: "The input doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO user set ?', [req.body]);
        res.json({ message: 'input Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldEntrada = req.body;
        await pool.query('UPDATE user set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The input was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM user WHERE ID = ?', [id]);
        res.json({ message: "The input was deleted" });
    }
}

const   userController = new  UserController;
export default  userController;