import { Router } from 'express';
import giroController from '../controllers/girosController';

class GirosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', giroController.list);
        this.router.get('/:id', giroController.getOne);
        this.router.put('/', giroController.create);
        this.router.put('/:id', giroController.update);
        this.router.delete('/:id', giroController.delete);
        this.router.post('/', giroController.prueba)

    }

}

const girosRoutes = new GirosRoutes();
export default girosRoutes.router;