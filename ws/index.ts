import express, { Request, Response } from 'express';
import 'dotenv/config';
import { errorHandler, notFound } from './middlewares/handlerError.middleware';
import configure from './sockets';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

configure(server);
