import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    return res.send('Hi there (signout');
})

export { router as signoutRouter };