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
console.log(result, "hello")
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});
export const TripController = {
  createTrip,
  getAllTrips,
};
