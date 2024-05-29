import {Request, Response} from "express";

import {TripServices} from "./trip.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import {tripFilterableFields} from "./trip.constant";

const createTrip = catchAsync(async (req: Request & {user?: any}, res) => {
  const user = req.user;

  const tripData = req.body;
  const result = await TripServices.createTrip(user, tripData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Trip created successfully",
    data: result,
  });
});

const getAllTrips = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await TripServices.getAllTrips(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await TripServices.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip retrieval By Id successfully",
    data: result,
  });
});
const deleteTrip = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  await TripServices.tripDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip Delete successfully!",
  });
});
export const TripController = {
  createTrip,
  getAllTrips,
  deleteTrip,
  getByIdFromDB,
};
