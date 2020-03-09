import { Router } from 'express';
import mercaderiaController from '../controllers/mercaderiasController';

class MercaderiasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', mercaderiaController.list);
        this.router.get('/:id', mercaderiaController.getOne);
        this.router.put('/', mercaderiaController.create);
        this.router.put('/:id', mercaderiaController.update);
        this.router.delete('/:id', mercaderiaController.delete);
        this.router.post('/', mercaderiaController.prueba)

    }

}

const mercaderiasRoutes = new MercaderiasRoutes();
export default mercaderiasRoutes.router;