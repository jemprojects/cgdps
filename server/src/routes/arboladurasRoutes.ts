import { Router } from 'express';
import arboladuraController from '../controllers/arboladuraController';

class ArboladurasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', arboladuraController.list);
        this.router.get('/:id', arboladuraController.getOne);
        this.router.put('/', arboladuraController.create);
        this.router.put('/:id', arboladuraController.update);
        this.router.delete('/:id', arboladuraController.delete);
        this.router.post('/', arboladuraController.prueba)

    }

}

const arboladurasRoutes = new ArboladurasRoutes();
export default arboladurasRoutes.router;