import express from "express";
import {UserController} from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {UserValidation} from "./user.validations";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

router.get(
  "/me",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getMyProfile
);

router.post(
  "/new",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

router.post(
  "/create-admin",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

router.patch(
  "/:id/status",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateStatus),
  UserController.changeProfileStatus
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  "/update-my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateMyProfile
);

export const userRoutes = router;
