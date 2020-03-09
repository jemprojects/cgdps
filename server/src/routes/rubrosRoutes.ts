import { Router } from 'express';
import rubrosController from '../controllers/rubrosController';

class RubrosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', rubrosController.list);
        this.router.get('/:id', rubrosController.getOne);
        this.router.put('/', rubrosController.create);
        this.router.put('/:id', rubrosController.update);
        this.router.delete('/:id', rubrosController.delete);
        this.router.post('/', rubrosController.prueba)

    }

}

const rubrosRoutes = new RubrosRoutes();
export default rubrosRoutes.router;