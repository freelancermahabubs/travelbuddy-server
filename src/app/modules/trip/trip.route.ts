import express from "express";

import ValidateRequest from "../../middlewares/validateRequest";

import {TripValidation} from "./trip.validation";
import {TripController} from "./trip.controller";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router();

router.post(
  "/new",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ValidateRequest(TripValidation.tripCreate),
  TripController.createTrip
);
router.get("/", TripController.getAllTrips);

export const tripRoutes = router;
