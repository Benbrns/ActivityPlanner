/**
 * @swagger
 * components:
 *   schemas:
 *     Participant:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the participant.
 *         email:
 *           type: string
 *           description: Email of the participant.
 *         activities:
 *           type: object
 *           description: Activities associated with the participant.
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the participant.
 */

import participantService from '../service/participant.service';
import express, { NextFunction, Request, Response } from 'express';

const participantRouter = express.Router();

/**
 * @swagger
 * /participant:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all participants from the database.
 *     tags:
 *       - Participant
 *     responses:
 *       '200':
 *         description: A list of participant objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 */
participantRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participants = await participantService.getAllParticipants();
        res.status(200).json(participants);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /participant/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get participant by email.
 *     tags:
 *       - Participant
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The participant email.
 *     responses:
 *       '200':
 *         description: The fetched participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 */
participantRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await participantService.getParticipantByEmail(String(req.params.email));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { participantRouter };
