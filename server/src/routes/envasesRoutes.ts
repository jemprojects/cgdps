import { Router } from 'express';
import envaseController from '../controllers/envasesController';

class EnvasesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', envaseController.list);
        this.router.get('/:id', envaseController.getOne);
        this.router.put('/', envaseController.create);
        this.router.put('/:id', envaseController.update);
        this.router.delete('/:id', envaseController.delete);
        this.router.post('/', envaseController.prueba)

    }

}

const envasesRoutes = new EnvasesRoutes();
export default envasesRoutes.router;