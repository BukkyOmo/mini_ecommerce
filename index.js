import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import db from './config/database';
import auth from './src/routes/auth';
import product from './src/routes/product';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8800;

app.use('/api/v1/auth', auth);
app.use('/api/v1/products', product);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my mini Ecommerce Application',
  });
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected successfully");
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

export default app;
