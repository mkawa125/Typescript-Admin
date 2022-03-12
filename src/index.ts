import express, {Request, Response} from 'express';
import cors from 'cors';

/** Create express app */
const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"]
}));

/** Create our first route */
app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
})

/** Listen to specific port */
app.listen(5000, () => {
    console.log("Listening to port 5000")
})