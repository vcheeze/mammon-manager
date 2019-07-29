import { Router } from 'express';
import tagsController from '../../controllers/tagsController';

const router = Router();

/**
 * Gets all Tags
 */
router.get('/', tagsController.get);

/**
 * Get Tag by name
 */
router.get('/:tagName', tagsController.getByName);

/**
 * Create a Tag
 */
router.post('/', tagsController.create);

/**
 * Delete all Tags
 */
router.delete('/', tagsController.deleteAll);

/**
 * Delete Tag by name
 */

router.delete('/:tagName', tagsController.deleteByName);

export default router;
