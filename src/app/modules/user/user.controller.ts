import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {UserServices} from "./user.services";
import {userFilterableFields} from "./user.constant";
import pick from "../../../shared/pick";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  }
);

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await UserServices.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await UserServices.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully!",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllUser(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserServices.getMyProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched!",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserServices.updateMyProfile(user, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  await UserServices.userDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Delete successfully!",
  });
});
export const UserController = {
  createUser,
  createAdmin,
  changeProfileStatus,
  getAllUser,
  getMyProfile,
  updateMyProfile,
  deleteUser,
};
