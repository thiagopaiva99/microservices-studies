import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    return res.send('Hi there (signin');
})

export { router as signinRouter };