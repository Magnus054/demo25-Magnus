import chessRouter from "./routes/chessAPI.mjs";
import express from 'express';
import HTTP_CODES from './utils/httpCodes.mjs';
import log from './modules/log.mjs';
import { LOGG_LEVELS, eventLogger } from './modules/log.mjs';
import { startSession, updateSession } from './modules/session.mjs';
import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';
import deckRouter from "./routes/deckAPI.mjs";

console.log("deckAPI.mjs imported successfully");

const ENABLE_LOGGING = false;
const server = express();
const port = (process.env.PORT || 10000);

const logger = log(LOGG_LEVELS.VERBOSE);

server.set('port', port);
server.use(express.json());
server.use(logger);
server.use(startSession);
server.use(updateSession);
server.use(express.static('public'));
server.use("/tree/", treeRouter);
server.use("/quest", questLogRouter);
server.use("/user", userRouter);
server.use("/", deckRouter);

console.log("deckRouter mounted at /temp");

server.get('/tmp/poem', (req, res) => {
    res.send(`
        Roses are red,<br>
        Violets are blue,<br>
        I still don't know,<br>
        What the dog do.
    `);
});

const quotes = [
    "Where did my boats go? - Franklin D. Roosevelt",
    "Do or do not, there is no try. - Sun Tzu",
    "I get to keep my bloody horse if I want to. - Winston Churchill",
    "If only I could split atoms as well as I split marriages. - Robert Oppenheimer",
    "Demand to see life's manager, get mad! - Cave Johnson"
];

server.get('/tmp/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.send(randomQuote);
});

server.use(express.json());

server.get('/tmp/sum/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Begge parametere må være tall!");
    }

    const sum = a + b;
    res.send(`Summen av ${a} og ${b} er ${sum}`);
});

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});

server.get("/debug/session", (req, res) => {
    res.json({ session: req.session });
});

server.use("/chess", chessRouter);

export default server;
