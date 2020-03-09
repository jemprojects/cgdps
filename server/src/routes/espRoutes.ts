import { Router } from 'express';
import espController from '../controllers/espController';

class EspRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', espController.list);
        this.router.get('/:id', espController.getOne);
        this.router.put('/', espController.create);
        this.router.put('/:id', espController.update);
        this.router.delete('/:id', espController.delete);
        this.router.post('/', espController.prueba)

    }

}

const espsRoutes = new EspRoutes();
export default espsRoutes.router;