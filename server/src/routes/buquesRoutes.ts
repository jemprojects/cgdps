import { Router } from 'express';
import buquesController from '../controllers/buquesController';

class BuquesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', buquesController.list);
        this.router.get('/:id', buquesController.getOne);
        this.router.put('/', buquesController.create);
        this.router.put('/:id', buquesController.update);
        this.router.delete('/:id', buquesController.delete);
        this.router.post('/', buquesController.prueba)

    }

}

const buquesRoutes = new BuquesRoutes();
export default buquesRoutes.router;

