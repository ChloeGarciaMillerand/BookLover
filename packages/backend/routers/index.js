import { Router } from 'express';

export const router = Router();

//test
router.get('/', (req, res) => {
    res.status(200).json({message: 'Le serveur est lancé!'});
});