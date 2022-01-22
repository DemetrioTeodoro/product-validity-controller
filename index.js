const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const connectionDB = require('./src/database/Connection');
const bodyParser = require('body-parser');

connectionDB();

const app = express();

app.use(cors());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src/public'));
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));

console.log('Iniciando rotas...');
const routesPath = './src/routes';
const routesDir = fs.readdirSync(routesPath);
routesDir.map(route => require(routesPath + '/' + route)(app));

const PORT = process.env.PORT || 3000

app.listen(PORT || 3000, () => {
    console.log(`Server started on localhost:${PORT}`);
});