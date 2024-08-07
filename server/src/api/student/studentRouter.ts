import express, { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import bodyParser from 'body-parser';

// Handler imports
import { handleAddStudent } from './handleAddStudent';
import { handleDeleteStudent } from './handleDeleteStudent';
import { handleGetStudent } from './handleGetStudent';
import { handleGetStudents } from './handleGetStudents';
import { handleEditStudent } from './handleEditStudent';
import { handleInactiveStudent } from './handleInactiveStudent';
import { handleGetInactiveStudents } from './handleGetInactiveStudents';

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use((req, res, next) => {
  (req as AuthenticatedRequest).user = (req as any).user;
  next();
});

// Route to add a new student
router.post(
  '/add',
  jsonParser,
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleAddStudent(request, response, next);
  },
);

// Route to edit a student
router.put(
  '/:student_id',
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleEditStudent(request, response, next);
  },
);

// Route to make a student inactive
router.put(
  '/inactive/:student_id',
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleInactiveStudent(request, response, next);
  },
);

// Route to delete a student
router.put(
  '/delete/:student_id',
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleDeleteStudent(request, response, next);
  },
);

// Route to get inactive students
router.get(
  '/inactive',
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleGetInactiveStudents(request, response, next);
  },
);

// Route to get a student
router.get(
  '/:student_id',
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleGetStudent(request, response, next);
  },
);

// Route to get all students
router.get('/', async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  await handleGetStudents(request, response, next);
});

export default router;
