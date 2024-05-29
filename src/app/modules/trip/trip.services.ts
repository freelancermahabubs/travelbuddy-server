import {Prisma, Trip} from "@prisma/client";
import prisma from "../../../shared/prisma";

import {IPaginationOptions} from "../../../interfaces/pagination";
import {ITrip, ITripFilterRequest} from "./trip.interface";
import {IGenericResponse} from "../../../interfaces/common";
import {paginationHelpers} from "../../../helpers/paginationHelper";
import {tripSearchableFields} from "./trip.constant";
const createTrip = async (user: any, payload: Trip) => {
  const userId = user?.userId;
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.userId,
    },
  });

  const trip = await prisma.trip.create({
    data: {...payload, userId},
  });
  return trip;
};

const getAllTrips = async (
  filters: ITripFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ITrip[]>> => {
  const {limit, page, skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filterData} = filters;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0 ? {AND: andConditions} : {};

  try {
    const result = await prisma.trip.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? {[options.sortBy]: options.sortOrder}
          : {
              createdAt: "desc",
            },
      select: {
        id: true,
        destination: true,
        description: true,
        photos: true,
        travelDates: true,
        requests: true,
        travelType: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const total = await prisma.trip.count({
      where: whereConditions,
    });

    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  } catch (error) {
    console.error("Error querying trips:", error);
    throw error;
  }
};

const getByIdFromDB = async (id: string): Promise<Trip | null> => {
  const result = await prisma.trip.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const tripDelete = async (id: string): Promise<{trip: Trip | null}> => {
  const deletedTrip = await prisma.trip.delete({
    where: {id},
  });

  return {trip: deletedTrip};
};
export const TripServices = {
  createTrip,
  getAllTrips,
  tripDelete,
  getByIdFromDB,
};
