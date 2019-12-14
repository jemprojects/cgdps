import express, { Router } from 'express';

import buquesController from '../controllers/buquesController';

class ShipsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', buquesController.list);
        this.router.get('/:id', buquesController.getOne);
        this.router.post('/', buquesController.create);
        this.router.put('/:id', buquesController.update);
        this.router.delete('/:id', buquesController.delete);
    }

}

export default new ShipsRoutes().router;

