import { Router } from 'express';
import documentosController from '../controllers/documentosController';

class DocumentosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', documentosController.list);
        this.router.get('/:id', documentosController.getOne);
        this.router.put('/', documentosController.create);
        this.router.put('/:id', documentosController.update);
        this.router.delete('/:id', documentosController.delete);
        this.router.post('/', documentosController.prueba)

    }

}

const documentoRoutes = new DocumentosRoutes();
export default documentoRoutes.router;
