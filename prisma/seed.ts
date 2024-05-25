import {UserRole} from "@prisma/client";

import prisma from "../src/shared/prisma";
import * as bcrypt from "bcrypt";

const seedAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log(" admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    const AdminData = await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: UserRole.ADMIN,
        admin: {
          create: {
            name: " Admin",
            contactNumber: "01405330209",
          },
        },
      },
    });

    console.log(" Admin Created Successfully!", AdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin().catch((error) => {
  console.error("Error in Admin:", error);
  process.exit(1);
});
