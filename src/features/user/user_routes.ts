import express, { Router } from 'express';
import { profile, edit_post } from './user_controller.js';
import { require_auth } from '../../middleware/auth_middlware.js';

/**
 * @openapi
 * /user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user profile
 *     description: Retrieves the authenticated user's profile information.
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const router: Router = express.Router();
router.get(
    '/profile',
    require_auth,
    profile
);
/**
 * @openapi
 * /user/profile/edit:
 *   post:
 *     tags:
 *       - User
 *     summary: Edit user profile
 *     description: Updates the authenticated user's profile information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditProfileBody'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/profile/edit',
    require_auth,
    edit_post
);
export default router;
