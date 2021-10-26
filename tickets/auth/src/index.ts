import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'

import { errorHandler } from './middlewares/error-handler'

const app = express();

app.use(json());
app.use(errorHandler())

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.listen(3000, () => {
    console.log('[Auth Service] Listening on port 3000');
})