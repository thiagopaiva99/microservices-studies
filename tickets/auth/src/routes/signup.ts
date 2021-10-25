import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
    return res.send('Hi there (signup');
})

export { router as signupRouter };