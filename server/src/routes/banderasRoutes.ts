import { Router } from 'express';
import banderaController from '../controllers/banderasController';

class BanderasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', banderaController.list);
        this.router.get('/:id', banderaController.getOne);
        this.router.put('/', banderaController.create);
        this.router.put('/:id', banderaController.update);
        this.router.delete('/:id', banderaController.delete);
        this.router.post('/', banderaController.prueba)

    }

}

const banderasRoutes = new BanderasRoutes();
export default banderasRoutes.router;