import { Router } from 'express';
import puertoController from '../controllers/puertosController';

class PuertosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', puertoController.list);
        this.router.get('/:id', puertoController.getOne);
        this.router.put('/', puertoController.create);
        this.router.put('/:id', puertoController.update);
        this.router.delete('/:id', puertoController.delete);
        this.router.post('/', puertoController.prueba)

    }

}

const puertosRoutes = new PuertosRoutes();
export default puertosRoutes.router;