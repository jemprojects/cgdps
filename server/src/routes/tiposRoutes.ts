import { Router } from 'express';
import tipoController from '../controllers/tiposController';

class TiposRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', tipoController.list);
        this.router.get('/:id', tipoController.getOne);
        this.router.put('/', tipoController.create);
        this.router.put('/:id', tipoController.update);
        this.router.delete('/:id', tipoController.delete);
        this.router.post('/', tipoController.prueba)

    }

}

const tiposRoutes = new TiposRoutes();
export default tiposRoutes.router;