import '@babel/polyfill';

const express = require('express');

const app = express();

/* Importing routes */

import projectRoutes from './routes/projects';
import taskRoutes from './routes/projects';

/* Settings */

app.set('port', process.env.PORT || 3000);

/* Middlewares */

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

/* Server initialization */

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
