import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {

    const from = req.body.from;
    const message = req.body.message;

    const payload = {
        from,
        message 
    };

    const server = Server.getInstance();
    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        message: 'Everything is ok'
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {

    const from = req.body.from;
    const message = req.body.message;
    const id = req.params.id;

    const payload = {
        from,
        message 
    };

    const server = Server.getInstance();
    server.io.in(id).emit('private-message', payload);

    res.json({
        ok: true,
        from,
        message
    });
});


export default router;