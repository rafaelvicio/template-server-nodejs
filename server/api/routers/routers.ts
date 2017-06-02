import { Application, Request, Response } from 'express';


class Routers {
    constructor(application: Application) {
        this._initRoutes(application);
    }

    private _initRoutes(application: Application): void {
        application.route('/')
            .get((req: Request, res: Response) => res.send('Hello word'));

        application.route('hello/:name')
            .get((req: Request, res: Response) => res.send(`Hello, ${req.params.name}`));

    }
}

export default Routers;