/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         activityName:
 *           type: string
 *           description: Name of the activity.
 *         description:
 *           type: string
 *           description: Description of the activity.
 *         finished:
 *           type: boolean
 *           description: Indicates whether the activity is finished or not.
 *         categoryName:
 *           type: string
 *           description: Category name of the activity.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the activity.
 *         user:
 *           type: object
 *           description: User associated with the activity.
 *         location:
 *           type: object
 *           description: Location associated with the activity.
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the activity.
 *     ActivityInput:
 *       type: object
 *       properties:
 *         activityName:
 *           type: string
 *           description: Name of the activity.
 *         description:
 *           type: string
 *           description: Description of the activity.
 *         categoryName:
 *           type: string
 *           description: Category name of the activity.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the activity.
 *         userEmail:
 *           type: string
 *           format: email
 *           description: User email associated with the activity.
 *         locationName:
 *           type: string
 *           description: The location name associated with the activity.
 */

import activityService from '../service/activity.service';
import express, { NextFunction, Request, Response } from 'express';
import { ActivityInput } from '../types';

const activityRouter = express.Router();

/**
 * @swagger
 * /activities:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all activities from the user or if user is admin get all the activities.
 *     tags:
 *       - Activities
 *     responses:
 *       '200':
 *         description: A list of all activity objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
activityRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { email, role } = req.auth;
        const result = await activityService.getActivities({ email, role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get an activity by ID.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the activity.
 *     responses:
 *       '200':
 *         description: The fetched activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await activityService.getActivityById(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /activities/participant/{participantEmail}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all the activities that match the participantEmail.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: participantEmail
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the participant.
 *     responses:
 *       '200':
 *         description: The fetched activities.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.get(
    '/participant/:participantEmail',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await activityService.getActivitiesByParticipantByEmail(
                String(req.params.participantEmail)
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
);

/**
 * @swagger
 * /activities/add:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new activity.
 *     tags:
 *       - Activities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityInput'
 *     responses:
 *       '200':
 *         description: The created activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activity = <ActivityInput>req.body;
        const result = await activityService.createActivity(activity);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /activities/delete/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete an activity by ID.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the activity to be deleted.
 *     responses:
 *       '200':
 *         description: The deleted activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await activityService.deleteActivity(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /activities/update/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update an activity by id.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activity to be updated.
 *       - in: body
 *         name: activity
 *         description: The updated activity data.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityInput'
 *     responses:
 *       '200':
 *         description: The updated activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <ActivityInput>req.body;
        const result = await activityService.updateActivity(Number(req.params.id), user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /activities/add/{activityId}/participant/{participantId}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Add participant to an activity by id.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: activityId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activity to be updated.
 *       - in: path
 *         name: participantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the participant to be added.
 *     responses:
 *       '200':
 *         description: The updated activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.put(
    '/add/:activityId/participant/:participantId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await activityService.addParticipantToActivity(
                Number(req.params.activityId),
                Number(req.params.participantId)
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
);

/**
 * @swagger
 * /activities/remove/{activityId}/participant/{participantId}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Remove participant of an activity by id.
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: activityId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activity to be updated.
 *       - in: path
 *         name: participantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the participant to be removed.
 *     responses:
 *       '200':
 *         description: The updated activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.put(
    '/remove/:activityId/participant/:participantId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await activityService.removeParticipantFromActivity(
                Number(req.params.activityId),
                Number(req.params.participantId)
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
);

export { activityRouter };
