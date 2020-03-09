import { Router } from 'express';
import operacionesController from '../controllers/operacionesController';

class OperacionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', operacionesController.list);
        this.router.get('/:id', operacionesController.getOne);
        this.router.put('/', operacionesController.create);
        this.router.put('/:id', operacionesController.update);
        this.router.delete('/:id', operacionesController.delete);
        this.router.post('/', operacionesController.prueba)

    }

}

const operacionesRoutes = new OperacionesRoutes();
export default operacionesRoutes.router;