import { Router } from 'express';
import emp_serv_portController from '../controllers/emp_serv_portController';

class Emp_serv_portsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', emp_serv_portController.list);
        this.router.get('/:id', emp_serv_portController.getOne);
        this.router.put('/', emp_serv_portController.create);
        this.router.put('/:id', emp_serv_portController.update);
        this.router.delete('/:id', emp_serv_portController.delete);
        this.router.post('/', emp_serv_portController.prueba)

    }

}

const emp_serv_portsRoutes = new Emp_serv_portsRoutes();
export default emp_serv_portsRoutes.router;