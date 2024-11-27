/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the location.
 *         locality:
 *           type: string
 *           description: locality of the location.
 *         street:
 *           type: string
 *           description: Street name of the location.
 *         streetNumber:
 *           type: number
 *           description: Street number of the location.
 *         postalCode:
 *           type: number
 *           description: Postalcode of the location.
 *         capacity:
 *           type: number
 *           description: Capacity Of the participints of the location.
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the location.
 *     LocationInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the location.
 *         locality:
 *           type: string
 *           description: Locality of the location.
 *         street:
 *           type: string
 *           description: Street name of the location.
 *         streetNumber:
 *           type: number
 *           description: Street number of the location.
 *         postalCode:
 *           type: number
 *           description: Postalcode of the location.
 *         capacity:
 *           type: number
 *           description: Capacity Of the participints of the location.
 */

import locationService from '../service/location.service';
import express, { NextFunction, Request, Response } from 'express';
import { LocationInput } from '../types';

const locationRouter = express.Router();

/**
 * @swagger
 * /locations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all locations from the database.
 *     tags:
 *       - Locations
 *     responses:
 *       '200':
 *         description: A list of location objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
locationRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locations = await locationService.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a location by ID.
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location ID.
 *     responses:
 *       '200':
 *         description: The fetched location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await locationService.getLocationById(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/name/{name}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a location by name.
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The location name.
 *     responses:
 *       '200':
 *         description: The fetched location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRouter.get('/name/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await locationService.getLocationByName(String(req.params.name));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/add:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new location.
 *     tags:
 *       - Locations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       '200':
 *         description: The created location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const location = <LocationInput>req.body;
        const result = await locationService.createLocation(location);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/delete/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a location by ID.
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location ID.
 *     responses:
 *       '200':
 *         description: The deleted location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await locationService.removeLocation(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/update/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update an location by id.
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the location to be updated.
 *       - in: body
 *         name: location
 *         description: The updated location data.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       '200':
 *         description: The updated location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const location = <LocationInput>req.body;
        const result = await locationService.updateLocation(Number(req.params.id), location);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { locationRouter };
