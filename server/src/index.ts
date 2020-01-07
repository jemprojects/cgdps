import express, {
Application
} from 'express';

import buquesRoutes from './routes/buquesRoutes';
import cors from 'cors';
import entradasRoutes from './routes/entradasRoutes'
import indexRoutes from './routes/indexRoutes';
import morgan from 'morgan';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        

    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));
    }

    routes(): void {
        const userRouter = require("./api/users/user.router");
        this.app.use('/', indexRoutes);
        this.app.use('/buques', buquesRoutes);
        this.app.use('/entradas', entradasRoutes);
        this.app.use('/users', userRouter)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();