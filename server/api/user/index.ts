import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddUser } from "./handleAddUser";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  "/add",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddUser(request, response, next);
  }
);

export * from "./handleAddUser";

export default router;
