import {UserStatus} from "@prisma/client";

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  username?: string | undefined;
  status?: UserStatus | undefined;
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};
