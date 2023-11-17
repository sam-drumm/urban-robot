import express from 'express';
import bodyParser from 'body-parser';
import { getPostcode }  from './queries';


const app = express();
/* istanbul ignore next */ 
const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API Running' });
});

app.get('/postcode/:postcode', getPostcode);

app.listen(port, () => {
  console.log(`Server started at ${new Date().toISOString()} on port ${port}`);
});

export default app;