import { Request, Response, Router } from 'express';

import pool from '../database';

class Emp_servsController {
    public prueba(req: Request, res: Response){
        res.json({text: 'Probando Router emp_servsController'})
    }
    public async list(req: Request, res: Response): Promise<void> {
        const emp_servs = await pool.query('SELECT * FROM emp_serv_port');
        res.json(emp_servs);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const emp_servs = await pool.query('SELECT * FROM emp_serv_port WHERE ID = ?', [id]);
        console.log(emp_servs.length);
        if (emp_servs.length > 0) {
            return res.json(emp_servs[0]);
        }
        res.status(404).json({ text: "The emp_serv_port doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO emp_serv_port set ?', [req.body]);
        res.json({ message: 'emp_serv_port Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldemp_serv = req.body;
        await pool.query('UPDATE emp_serv_port set ? WHERE ID = ?', [req.body, id]);
        res.json({ message: "The emp_serv_port was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM emp_serv_port WHERE ID = ?', [id]);
        res.json({ message: "The emp_serv_port was deleted" });
    }
}

const emp_servsController = new Emp_servsController;
export default emp_servsController;