import * as express from 'express';
import { Request, Response } from 'express';
import * as morgan from 'morgan';

import { fetchAdlers, userToXML } from './utils';
import { join } from 'path';
import { readFileSync } from 'fs';

const app = express();

// logger
app.use(morgan('short'));

app.get('/', (req, res) => { res.redirect(301, '/squad.xml'); });

app.get('/squad.xml', async (req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml; charset=utf-8');
    const membersPromise = fetchAdlers();
    let content = readFileSync(join(__dirname, '../resources', 'template.xml'), 'UTF-8');

    const members = (await membersPromise).map(userToXML).join('');

    content = content.replace('</squad>', `${members}\n</squad>`);

    res.send(content);
});

app.use('/', express.static(join(__dirname, '../resources')));

const {
    PORT = 80
} = process.env;

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
