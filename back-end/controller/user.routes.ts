/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           format: name
 *         familyName:
 *           type: string
 *           format: familyname
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           format: role
 *         id:
 *           type: integer
 *           format: int64
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           format: name
 *         familyName:
 *           type: string
 *           format: familyname
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           format: role
 *         password:
 *           type: string
 *           format: password
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         userName:
 *           type: string
 *         userEmail:
 *           type: string
 */

import userService from '../service/user.service';
import express, { NextFunction, Request, Response } from 'express';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A list of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       '200':
 *         description: The fetched user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getUserById(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email.
 *     responses:
 *       '200':
 *         description: The fetched user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getUserByEmail(String(req.params.email));
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR');
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using email/password. Returns an object with JWT token and user name when successful.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       '200':
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const result = await userService.createUser(userInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       '200':
 *         description: The deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.deleteUser(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/update/{email}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a user by email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email.
 *       - in: body
 *         name: user
 *         description: The updated user data.
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put('/update/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.updateUser(String(req.params.email), user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { userRouter };
