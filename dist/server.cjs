

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_express6 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/config/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
import_dotenv.default.config({ path: import_path.default.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  stripe_product_price_id: process.env.STRIPE_PRODUCT_PRICE_ID,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
};

// src/modules/user/user.route.ts
var import_express = require("express");

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/modules/user/user.service.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// src/lib/prisma.ts
var import_config = require("dotenv/config");
var import_adapter_pg = require("@prisma/adapter-pg");

// generated/prisma/client.ts
var path2 = __toESM(require("path"), 1);
var import_node_url = require("url");

// generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"), 1);
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availability {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  date                DateTime\n  startTime           DateTime\n  endTime             DateTime\n  isBooked            Boolean           @default(false)\n\n  booking Booking[]\n\n  @@map("availability")\n}\n\nmodel Booking {\n  id                 String        @id @default(uuid())\n  customerId         String\n  customer           User          @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  serviceId          String\n  service            Service       @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  availabilitySlotId String\n  availability       Availability  @relation(fields: [availabilitySlotId], references: [id], onDelete: Cascade)\n  bookingTime        DateTime\n  customerAddress    String\n  note               String?       @db.Text\n  totalPrice         Decimal       @db.Decimal(10, 2)\n  status             BookingStatus @default(REQUESTED)\n\n  payments Payment[]\n  reviews  Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String\n  description String   @db.VarChar(255)\n  createdAt   DateTime @default(now())\n\n  service Service[]\n\n  @@map("category")\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  ADMIN\n}\n\nenum Status {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  REQUESTED\n  ACCEPTED\n  DECLINED\n  PAID\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  transactionId String @unique\n\n  amount   Decimal @db.Decimal(10, 2)\n  currency String  @default("BDT")\n\n  method String\n\n  status PaymentStatus @default(PENDING)\n\n  paidAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\nmodel Review {\n  id                  String            @id @default(uuid())\n  bookingId           String            @unique\n  booking             Booking           @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  customerId          String\n  customer            User              @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  technicianProfileId String\n  technician          TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  rating              Int\n  comment             String?           @db.Text\n  createdAt           DateTime          @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  categoryId          String\n  category            Category          @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  title               String            @db.VarChar(255)\n  description         String            @db.Text\n  price               Decimal           @db.Decimal(10, 2)\n  duration            Int\n\n  booking Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("services")\n}\n\nmodel TechnicianProfile {\n  id            String  @id @default(uuid())\n  userId        String  @unique\n  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  bio           String  @db.Text\n  experience    Int\n  hourlyRate    Decimal @db.Decimal(10, 2)\n  averageRating Float   @default(0)\n  completedJobs Int     @default(0)\n  location      String\n  isAvailable   Boolean @default(true)\n\n  service      Service[]\n  availability Availability[]\n  reviews      Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("technicianProfile")\n}\n\nmodel User {\n  id           String  @id @default(uuid())\n  name         String  @db.VarChar(255)\n  email        String  @unique\n  password     String\n  phone        String\n  location     String  @db.VarChar(255)\n  role         Role    @default(CUSTOMER)\n  status       Status  @default(ACTIVE)\n  profileImage String? @db.VarChar(255)\n\n  technicianProfile TechnicianProfile?\n  bookings          Booking[]\n  payments          Payment[]\n  reviews           Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"booking","kind":"object","type":"Booking","relationName":"AvailabilityToBooking"}],"dbName":"availability"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"availabilitySlotId","kind":"scalar","type":"String"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToBooking"},{"name":"bookingTime","kind":"scalar","type":"DateTime"},{"name":"customerAddress","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"payments","kind":"object","type":"Payment","relationName":"BookingToPayment"},{"name":"reviews","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"service","kind":"object","type":"Service","relationName":"CategoryToService"}],"dbName":"category"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"method","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ReviewToTechnicianProfile"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"services"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"hourlyRate","kind":"scalar","type":"Decimal"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"completedJobs","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"technicianProfile"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","technicianProfile","orderBy","cursor","customer","service","_count","category","booking","availability","payments","technician","reviews","bookings","user","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","data","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","create","update","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","having","_min","_max","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","_avg","_sum","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","phone","location","Role","role","Status","status","profileImage","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","bio","experience","hourlyRate","averageRating","completedJobs","isAvailable","technicianProfileId","categoryId","title","description","price","duration","bookingId","customerId","rating","comment","transactionId","amount","currency","method","PaymentStatus","paidAt","serviceId","availabilitySlotId","bookingTime","customerAddress","note","totalPrice","BookingStatus","date","startTime","endTime","isBooked","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "1ARRgAELAQAAoQIAIAgAAPkBACCXAQAAoAIAMJgBAAAgABCZAQAAoAIAMJoBAQAAAAG8AQEA8wEAIdMBQAD3AQAh1AFAAPcBACHVAUAA9wEAIdYBIACMAgAhAQAAAAEAIBIFAACOAgAgCQAAjwIAIAwAAPsBACAOAACNAgAglwEAAIgCADCYAQAAAwAQmQEAAIgCADCaAQEA8wEAIZ8BAQDzAQAhpQFAAPcBACGmAUAA9wEAIbUBAQDzAQAhtgEBAPMBACG3AQIAiQIAIbgBEACKAgAhuQEIAIsCACG6AQIAiQIAIbsBIACMAgAhAQAAAAMAIBMEAACNAgAgBQAAqwIAIAkAAKwCACAKAAD6AQAgDAAA-wEAIJcBAACpAgAwmAEAAAUAEJkBAACpAgAwmgEBAPMBACGjAQAAqgLTASKlAUAA9wEAIaYBQAD3AQAhwwEBAPMBACHMAQEA8wEAIc0BAQDzAQAhzgFAAPcBACHPAQEA8wEAIdABAQD2AQAh0QEQAIoCACEGBAAA3gMAIAUAAIwEACAJAACNBAAgCgAA1QMAIAwAANYDACDQAQAArQIAIBMEAACNAgAgBQAAqwIAIAkAAKwCACAKAAD6AQAgDAAA-wEAIJcBAACpAgAwmAEAAAUAEJkBAACpAgAwmgEBAAAAAaMBAACqAtMBIqUBQAD3AQAhpgFAAPcBACHDAQEA8wEAIcwBAQDzAQAhzQEBAPMBACHOAUAA9wEAIc8BAQDzAQAh0AEBAPYBACHRARAAigIAIQMAAAAFACACAAAGADADAAAHACAPAQAAoQIAIAcAAKgCACAIAAD5AQAglwEAAKcCADCYAQAACQAQmQEAAKcCADCaAQEA8wEAIaUBQAD3AQAhpgFAAPcBACG8AQEA8wEAIb0BAQDzAQAhvgEBAPMBACG_AQEA8wEAIcABEACKAgAhwQECAIkCACEDAQAA0wMAIAcAAIsEACAIAADUAwAgDwEAAKECACAHAACoAgAgCAAA-QEAIJcBAACnAgAwmAEAAAkAEJkBAACnAgAwmgEBAAAAAaUBQAD3AQAhpgFAAPcBACG8AQEA8wEAIb0BAQDzAQAhvgEBAPMBACG_AQEA8wEAIcABEACKAgAhwQECAIkCACEDAAAACQAgAgAACgAwAwAACwAgAQAAAAkAIAMAAAAFACACAAAGADADAAAHACABAAAABQAgEAQAAI0CACAIAACjAgAglwEAAKQCADCYAQAAEAAQmQEAAKQCADCaAQEA8wEAIaMBAAClAssBIqUBQAD3AQAhpgFAAPcBACHCAQEA8wEAIcMBAQDzAQAhxgEBAPMBACHHARAAigIAIcgBAQDzAQAhyQEBAPMBACHLAUAApgIAIQMEAADeAwAgCAAAigQAIMsBAACtAgAgEAQAAI0CACAIAACjAgAglwEAAKQCADCYAQAAEAAQmQEAAKQCADCaAQEAAAABowEAAKUCywEipQFAAPcBACGmAUAA9wEAIcIBAQAAAAHDAQEA8wEAIcYBAQAAAAHHARAAigIAIcgBAQDzAQAhyQEBAPMBACHLAUAApgIAIQMAAAAQACACAAARADADAAASACANBAAAjQIAIAgAAKMCACALAAChAgAglwEAAKICADCYAQAAFAAQmQEAAKICADCaAQEA8wEAIaUBQAD3AQAhvAEBAPMBACHCAQEA8wEAIcMBAQDzAQAhxAECAIkCACHFAQEA9gEAIQQEAADeAwAgCAAAigQAIAsAANMDACDFAQAArQIAIA0EAACNAgAgCAAAowIAIAsAAKECACCXAQAAogIAMJgBAAAUABCZAQAAogIAMJoBAQAAAAGlAUAA9wEAIbwBAQDzAQAhwgEBAAAAAcMBAQDzAQAhxAECAIkCACHFAQEA9gEAIQMAAAAUACACAAAVADADAAAWACABAAAAEAAgAQAAABQAIAMAAAAQACACAAARADADAAASACADAAAAFAAgAgAAFQAwAwAAFgAgAQAAAAUAIAEAAAAQACABAAAAFAAgAwAAAAkAIAIAAAoAMAMAAAsAIAsBAAChAgAgCAAA-QEAIJcBAACgAgAwmAEAACAAEJkBAACgAgAwmgEBAPMBACG8AQEA8wEAIdMBQAD3AQAh1AFAAPcBACHVAUAA9wEAIdYBIACMAgAhAgEAANMDACAIAADUAwAgAwAAACAAIAIAACEAMAMAAAEAIAMAAAAUACACAAAVADADAAAWACABAAAACQAgAQAAACAAIAEAAAAUACADAAAABQAgAgAABgAwAwAABwAgAQAAAAUAIAEAAAABACADAAAAIAAgAgAAIQAwAwAAAQAgAwAAACAAIAIAACEAMAMAAAEAIAMAAAAgACACAAAhADADAAABACAIAQAAiQQAIAgAALIDACCaAQEAAAABvAEBAAAAAdMBQAAAAAHUAUAAAAAB1QFAAAAAAdYBIAAAAAEBFAAALQAgBpoBAQAAAAG8AQEAAAAB0wFAAAAAAdQBQAAAAAHVAUAAAAAB1gEgAAAAAQEUAAAvADABFAAALwAwCAEAAIgEACAIAAClAwAgmgEBALECACG8AQEAsQIAIdMBQAC1AgAh1AFAALUCACHVAUAAtQIAIdYBIACNAwAhAgAAAAEAIBQAADIAIAaaAQEAsQIAIbwBAQCxAgAh0wFAALUCACHUAUAAtQIAIdUBQAC1AgAh1gEgAI0DACECAAAAIAAgFAAANAAgAgAAACAAIBQAADQAIAMAAAABACAbAAAtACAcAAAyACABAAAAAQAgAQAAACAAIAMGAACFBAAgIQAAhwQAICIAAIYEACAJlwEAAJ8CADCYAQAAOwAQmQEAAJ8CADCaAQEA4QEAIbwBAQDhAQAh0wFAAOUBACHUAUAA5QEAIdUBQADlAQAh1gEgAIACACEDAAAAIAAgAgAAOgAwIAAAOwAgAwAAACAAIAIAACEAMAMAAAEAIAEAAAAHACABAAAABwAgAwAAAAUAIAIAAAYAMAMAAAcAIAMAAAAFACACAAAGADADAAAHACADAAAABQAgAgAABgAwAwAABwAgEAQAALADACAFAACDAwAgCQAAhAMAIAoAAIUDACAMAACGAwAgmgEBAAAAAaMBAAAA0wECpQFAAAAAAaYBQAAAAAHDAQEAAAABzAEBAAAAAc0BAQAAAAHOAUAAAAABzwEBAAAAAdABAQAAAAHRARAAAAABARQAAEMAIAuaAQEAAAABowEAAADTAQKlAUAAAAABpgFAAAAAAcMBAQAAAAHMAQEAAAABzQEBAAAAAc4BQAAAAAHPAQEAAAAB0AEBAAAAAdEBEAAAAAEBFAAARQAwARQAAEUAMBAEAACuAwAgBQAA6AIAIAkAAOkCACAKAADqAgAgDAAA6wIAIJoBAQCxAgAhowEAAOYC0wEipQFAALUCACGmAUAAtQIAIcMBAQCxAgAhzAEBALECACHNAQEAsQIAIc4BQAC1AgAhzwEBALECACHQAQEAtAIAIdEBEADVAgAhAgAAAAcAIBQAAEgAIAuaAQEAsQIAIaMBAADmAtMBIqUBQAC1AgAhpgFAALUCACHDAQEAsQIAIcwBAQCxAgAhzQEBALECACHOAUAAtQIAIc8BAQCxAgAh0AEBALQCACHRARAA1QIAIQIAAAAFACAUAABKACACAAAABQAgFAAASgAgAwAAAAcAIBsAAEMAIBwAAEgAIAEAAAAHACABAAAABQAgBgYAAIAEACAhAACDBAAgIgAAggQAIDMAAIEEACA0AACEBAAg0AEAAK0CACAOlwEAAJsCADCYAQAAUQAQmQEAAJsCADCaAQEA4QEAIaMBAACcAtMBIqUBQADlAQAhpgFAAOUBACHDAQEA4QEAIcwBAQDhAQAhzQEBAOEBACHOAUAA5QEAIc8BAQDhAQAh0AEBAOQBACHRARAA_gEAIQMAAAAFACACAABQADAgAABRACADAAAABQAgAgAABgAwAwAABwAgCAUAAI4CACCXAQAAmgIAMJgBAABXABCZAQAAmgIAMJoBAQAAAAGbAQEA8wEAIaUBQAD3AQAhvwEBAPMBACEBAAAAVAAgAQAAAFQAIAgFAACOAgAglwEAAJoCADCYAQAAVwAQmQEAAJoCADCaAQEA8wEAIZsBAQDzAQAhpQFAAPcBACG_AQEA8wEAIQEFAADfAwAgAwAAAFcAIAIAAFgAMAMAAFQAIAMAAABXACACAABYADADAABUACADAAAAVwAgAgAAWAAwAwAAVAAgBQUAAP8DACCaAQEAAAABmwEBAAAAAaUBQAAAAAG_AQEAAAABARQAAFwAIASaAQEAAAABmwEBAAAAAaUBQAAAAAG_AQEAAAABARQAAF4AMAEUAABeADAFBQAA9QMAIJoBAQCxAgAhmwEBALECACGlAUAAtQIAIb8BAQCxAgAhAgAAAFQAIBQAAGEAIASaAQEAsQIAIZsBAQCxAgAhpQFAALUCACG_AQEAsQIAIQIAAABXACAUAABjACACAAAAVwAgFAAAYwAgAwAAAFQAIBsAAFwAIBwAAGEAIAEAAABUACABAAAAVwAgAwYAAPIDACAhAAD0AwAgIgAA8wMAIAeXAQAAmQIAMJgBAABqABCZAQAAmQIAMJoBAQDhAQAhmwEBAOEBACGlAUAA5QEAIb8BAQDhAQAhAwAAAFcAIAIAAGkAMCAAAGoAIAMAAABXACACAABYADADAABUACABAAAAEgAgAQAAABIAIAMAAAAQACACAAARADADAAASACADAAAAEAAgAgAAEQAwAwAAEgAgAwAAABAAIAIAABEAMAMAABIAIA0EAACBAwAgCAAA2wIAIJoBAQAAAAGjAQAAAMsBAqUBQAAAAAGmAUAAAAABwgEBAAAAAcMBAQAAAAHGAQEAAAABxwEQAAAAAcgBAQAAAAHJAQEAAAABywFAAAAAAQEUAAByACALmgEBAAAAAaMBAAAAywECpQFAAAAAAaYBQAAAAAHCAQEAAAABwwEBAAAAAcYBAQAAAAHHARAAAAAByAEBAAAAAckBAQAAAAHLAUAAAAABARQAAHQAMAEUAAB0ADANBAAA_wIAIAgAANkCACCaAQEAsQIAIaMBAADWAssBIqUBQAC1AgAhpgFAALUCACHCAQEAsQIAIcMBAQCxAgAhxgEBALECACHHARAA1QIAIcgBAQCxAgAhyQEBALECACHLAUAA1wIAIQIAAAASACAUAAB3ACALmgEBALECACGjAQAA1gLLASKlAUAAtQIAIaYBQAC1AgAhwgEBALECACHDAQEAsQIAIcYBAQCxAgAhxwEQANUCACHIAQEAsQIAIckBAQCxAgAhywFAANcCACECAAAAEAAgFAAAeQAgAgAAABAAIBQAAHkAIAMAAAASACAbAAByACAcAAB3ACABAAAAEgAgAQAAABAAIAYGAADtAwAgIQAA8AMAICIAAO8DACAzAADuAwAgNAAA8QMAIMsBAACtAgAgDpcBAACSAgAwmAEAAIABABCZAQAAkgIAMJoBAQDhAQAhowEAAJMCywEipQFAAOUBACGmAUAA5QEAIcIBAQDhAQAhwwEBAOEBACHGAQEA4QEAIccBEAD-AQAhyAEBAOEBACHJAQEA4QEAIcsBQACUAgAhAwAAABAAIAIAAH8AMCAAAIABACADAAAAEAAgAgAAEQAwAwAAEgAgAQAAABYAIAEAAAAWACADAAAAFAAgAgAAFQAwAwAAFgAgAwAAABQAIAIAABUAMAMAABYAIAMAAAAUACACAAAVADADAAAWACAKBAAA9gIAIAgAAMkCACALAADKAgAgmgEBAAAAAaUBQAAAAAG8AQEAAAABwgEBAAAAAcMBAQAAAAHEAQIAAAABxQEBAAAAAQEUAACIAQAgB5oBAQAAAAGlAUAAAAABvAEBAAAAAcIBAQAAAAHDAQEAAAABxAECAAAAAcUBAQAAAAEBFAAAigEAMAEUAACKAQAwCgQAAPQCACAIAADGAgAgCwAAxwIAIJoBAQCxAgAhpQFAALUCACG8AQEAsQIAIcIBAQCxAgAhwwEBALECACHEAQIAxAIAIcUBAQC0AgAhAgAAABYAIBQAAI0BACAHmgEBALECACGlAUAAtQIAIbwBAQCxAgAhwgEBALECACHDAQEAsQIAIcQBAgDEAgAhxQEBALQCACECAAAAFAAgFAAAjwEAIAIAAAAUACAUAACPAQAgAwAAABYAIBsAAIgBACAcAACNAQAgAQAAABYAIAEAAAAUACAGBgAA6AMAICEAAOsDACAiAADqAwAgMwAA6QMAIDQAAOwDACDFAQAArQIAIAqXAQAAkQIAMJgBAACWAQAQmQEAAJECADCaAQEA4QEAIaUBQADlAQAhvAEBAOEBACHCAQEA4QEAIcMBAQDhAQAhxAECAP0BACHFAQEA5AEAIQMAAAAUACACAACVAQAwIAAAlgEAIAMAAAAUACACAAAVADADAAAWACABAAAACwAgAQAAAAsAIAMAAAAJACACAAAKADADAAALACADAAAACQAgAgAACgAwAwAACwAgAwAAAAkAIAIAAAoAMAMAAAsAIAwBAADnAwAgBwAAygMAIAgAAMsDACCaAQEAAAABpQFAAAAAAaYBQAAAAAG8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEQAAAAAcEBAgAAAAEBFAAAngEAIAmaAQEAAAABpQFAAAAAAaYBQAAAAAG8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEQAAAAAcEBAgAAAAEBFAAAoAEAMAEUAACgAQAwDAEAAOYDACAHAAC-AwAgCAAAvwMAIJoBAQCxAgAhpQFAALUCACGmAUAAtQIAIbwBAQCxAgAhvQEBALECACG-AQEAsQIAIb8BAQCxAgAhwAEQANUCACHBAQIAxAIAIQIAAAALACAUAACjAQAgCZoBAQCxAgAhpQFAALUCACGmAUAAtQIAIbwBAQCxAgAhvQEBALECACG-AQEAsQIAIb8BAQCxAgAhwAEQANUCACHBAQIAxAIAIQIAAAAJACAUAAClAQAgAgAAAAkAIBQAAKUBACADAAAACwAgGwAAngEAIBwAAKMBACABAAAACwAgAQAAAAkAIAUGAADhAwAgIQAA5AMAICIAAOMDACAzAADiAwAgNAAA5QMAIAyXAQAAkAIAMJgBAACsAQAQmQEAAJACADCaAQEA4QEAIaUBQADlAQAhpgFAAOUBACG8AQEA4QEAIb0BAQDhAQAhvgEBAOEBACG_AQEA4QEAIcABEAD-AQAhwQECAP0BACEDAAAACQAgAgAAqwEAMCAAAKwBACADAAAACQAgAgAACgAwAwAACwAgEgUAAI4CACAJAACPAgAgDAAA-wEAIA4AAI0CACCXAQAAiAIAMJgBAAADABCZAQAAiAIAMJoBAQAAAAGfAQEA8wEAIaUBQAD3AQAhpgFAAPcBACG1AQEAAAABtgEBAPMBACG3AQIAiQIAIbgBEACKAgAhuQEIAIsCACG6AQIAiQIAIbsBIACMAgAhAQAAAK8BACABAAAArwEAIAQFAADfAwAgCQAA4AMAIAwAANYDACAOAADeAwAgAwAAAAMAIAIAALIBADADAACvAQAgAwAAAAMAIAIAALIBADADAACvAQAgAwAAAAMAIAIAALIBADADAACvAQAgDwUAAMwDACAJAADNAwAgDAAAzgMAIA4AAN0DACCaAQEAAAABnwEBAAAAAaUBQAAAAAGmAUAAAAABtQEBAAAAAbYBAQAAAAG3AQIAAAABuAEQAAAAAbkBCAAAAAG6AQIAAAABuwEgAAAAAQEUAAC2AQAgC5oBAQAAAAGfAQEAAAABpQFAAAAAAaYBQAAAAAG1AQEAAAABtgEBAAAAAbcBAgAAAAG4ARAAAAABuQEIAAAAAboBAgAAAAG7ASAAAAABARQAALgBADABFAAAuAEAMA8FAACOAwAgCQAAjwMAIAwAAJADACAOAADcAwAgmgEBALECACGfAQEAsQIAIaUBQAC1AgAhpgFAALUCACG1AQEAsQIAIbYBAQCxAgAhtwECAMQCACG4ARAA1QIAIbkBCACMAwAhugECAMQCACG7ASAAjQMAIQIAAACvAQAgFAAAuwEAIAuaAQEAsQIAIZ8BAQCxAgAhpQFAALUCACGmAUAAtQIAIbUBAQCxAgAhtgEBALECACG3AQIAxAIAIbgBEADVAgAhuQEIAIwDACG6AQIAxAIAIbsBIACNAwAhAgAAAAMAIBQAAL0BACACAAAAAwAgFAAAvQEAIAMAAACvAQAgGwAAtgEAIBwAALsBACABAAAArwEAIAEAAAADACAFBgAA1wMAICEAANoDACAiAADZAwAgMwAA2AMAIDQAANsDACAOlwEAAPwBADCYAQAAxAEAEJkBAAD8AQAwmgEBAOEBACGfAQEA4QEAIaUBQADlAQAhpgFAAOUBACG1AQEA4QEAIbYBAQDhAQAhtwECAP0BACG4ARAA_gEAIbkBCAD_AQAhugECAP0BACG7ASAAgAIAIQMAAAADACACAADDAQAwIAAAxAEAIAMAAAADACACAACyAQAwAwAArwEAIBIBAAD4AQAgCgAA-gEAIAwAAPsBACANAAD5AQAglwEAAPIBADCYAQAAygEAEJkBAADyAQAwmgEBAAAAAZsBAQDzAQAhnAEBAAAAAZ0BAQDzAQAhngEBAPMBACGfAQEA8wEAIaEBAAD0AaEBIqMBAAD1AaMBIqQBAQD2AQAhpQFAAPcBACGmAUAA9wEAIQEAAADHAQAgAQAAAMcBACASAQAA-AEAIAoAAPoBACAMAAD7AQAgDQAA-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_gEAIbkBCAD_AQAhugECAP0BACG7ASAAgAIAIQ0GAADnAQAgIQAA5wEAICIAAOcBACAzAACEAgAgNAAA5wEAIKcBAgAAAAGoAQIAAAAEqQECAAAABKoBAgAAAAGrAQIAAAABrAECAAAAAa0BAgAAAAGuAQIAhwIAIQ0GAADnAQAgIQAAhgIAICIAAIYCACAzAACGAgAgNAAAhgIAIKcBEAAAAAGoARAAAAAEqQEQAAAABKoBEAAAAAGrARAAAAABrAEQAAAAAa0BEAAAAAGuARAAhQIAIQ0GAADnAQAgIQAAhAIAICIAAIQCACAzAACEAgAgNAAAhAIAIKcBCAAAAAGoAQgAAAAEqQEIAAAABKoBCAAAAAGrAQgAAAABrAEIAAAAAa0BCAAAAAGuAQgAgwIAIQUGAADnAQAgIQAAggIAICIAAIICACCnASAAAAABrgEgAIECACEFBgAA5wEAICEAAIICACAiAACCAgAgpwEgAAAAAa4BIACBAgAhAqcBIAAAAAGuASAAggIAIQ0GAADnAQAgIQAAhAIAICIAAIQCACAzAACEAgAgNAAAhAIAIKcBCAAAAAGoAQgAAAAEqQEIAAAABKoBCAAAAAGrAQgAAAABrAEIAAAAAa0BCAAAAAGuAQgAgwIAIQinAQgAAAABqAEIAAAABKkBCAAAAASqAQgAAAABqwEIAAAAAawBCAAAAAGtAQgAAAABrgEIAIQCACENBgAA5wEAICEAAIYCACAiAACGAgAgMwAAhgIAIDQAAIYCACCnARAAAAABqAEQAAAABKkBEAAAAASqARAAAAABqwEQAAAAAawBEAAAAAGtARAAAAABrgEQAIUCACEIpwEQAAAAAagBEAAAAASpARAAAAAEqgEQAAAAAasBEAAAAAGsARAAAAABrQEQAAAAAa4BEACGAgAhDQYAAOcBACAhAADnAQAgIgAA5wEAIDMAAIQCACA0AADnAQAgpwECAAAAAagBAgAAAASpAQIAAAAEqgECAAAAAasBAgAAAAGsAQIAAAABrQECAAAAAa4BAgCHAgAhEgUAAI4CACAJAACPAgAgDAAA-wEAIA4AAI0CACCXAQAAiAIAMJgBAAADABCZAQAAiAIAMJoBAQDzAQAhnwEBAPMBACGlAUAA9wEAIaYBQAD3AQAhtQEBAPMBACG2AQEA8wEAIbcBAgCJAgAhuAEQAIoCACG5AQgAiwIAIboBAgCJAgAhuwEgAIwCACEIpwECAAAAAagBAgAAAASpAQIAAAAEqgECAAAAAasBAgAAAAGsAQIAAAABrQECAAAAAa4BAgDnAQAhCKcBEAAAAAGoARAAAAAEqQEQAAAABKoBEAAAAAGrARAAAAABrAEQAAAAAa0BEAAAAAGuARAAhgIAIQinAQgAAAABqAEIAAAABKkBCAAAAASqAQgAAAABqwEIAAAAAawBCAAAAAGtAQgAAAABrgEIAIQCACECpwEgAAAAAa4BIACCAgAhFAEAAPgBACAKAAD6AQAgDAAA-wEAIA0AAPkBACCXAQAA8gEAMJgBAADKAQAQmQEAAPIBADCaAQEA8wEAIZsBAQDzAQAhnAEBAPMBACGdAQEA8wEAIZ4BAQDzAQAhnwEBAPMBACGhAQAA9AGhASKjAQAA9QGjASKkAQEA9gEAIaUBQAD3AQAhpgFAAPcBACHXAQAAygEAINgBAADKAQAgA7IBAAAJACCzAQAACQAgtAEAAAkAIAOyAQAAIAAgswEAACAAILQBAAAgACAMlwEAAJACADCYAQAArAEAEJkBAACQAgAwmgEBAOEBACGlAUAA5QEAIaYBQADlAQAhvAEBAOEBACG9AQEA4QEAIb4BAQDhAQAhvwEBAOEBACHAARAA_gEAIcEBAgD9AQAhCpcBAACRAgAwmAEAAJYBABCZAQAAkQIAMJoBAQDhAQAhpQFAAOUBACG8AQEA4QEAIcIBAQDhAQAhwwEBAOEBACHEAQIA_QEAIcUBAQDkAQAhDpcBAACSAgAwmAEAAIABABCZAQAAkgIAMJoBAQDhAQAhowEAAJMCywEipQFAAOUBACGmAUAA5QEAIcIBAQDhAQAhwwEBAOEBACHGAQEA4QEAIccBEAD-AQAhyAEBAOEBACHJAQEA4QEAIcsBQACUAgAhBwYAAOcBACAhAACYAgAgIgAAmAIAIKcBAAAAywECqAEAAADLAQipAQAAAMsBCK4BAACXAssBIgsGAADqAQAgIQAAlgIAICIAAJYCACCnAUAAAAABqAFAAAAABakBQAAAAAWqAUAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAABrgFAAJUCACELBgAA6gEAICEAAJYCACAiAACWAgAgpwFAAAAAAagBQAAAAAWpAUAAAAAFqgFAAAAAAasBQAAAAAGsAUAAAAABrQFAAAAAAa4BQACVAgAhCKcBQAAAAAGoAUAAAAAFqQFAAAAABaoBQAAAAAGrAUAAAAABrAFAAAAAAa0BQAAAAAGuAUAAlgIAIQcGAADnAQAgIQAAmAIAICIAAJgCACCnAQAAAMsBAqgBAAAAywEIqQEAAADLAQiuAQAAlwLLASIEpwEAAADLAQKoAQAAAMsBCKkBAAAAywEIrgEAAJgCywEiB5cBAACZAgAwmAEAAGoAEJkBAACZAgAwmgEBAOEBACGbAQEA4QEAIaUBQADlAQAhvwEBAOEBACEIBQAAjgIAIJcBAACaAgAwmAEAAFcAEJkBAACaAgAwmgEBAPMBACGbAQEA8wEAIaUBQAD3AQAhvwEBAPMBACEOlwEAAJsCADCYAQAAUQAQmQEAAJsCADCaAQEA4QEAIaMBAACcAtMBIqUBQADlAQAhpgFAAOUBACHDAQEA4QEAIcwBAQDhAQAhzQEBAOEBACHOAUAA5QEAIc8BAQDhAQAh0AEBAOQBACHRARAA_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-AgAw3QEAAL4CADDeAQAAvgIAMN8BAAC-AgAw4AEAAMACADDhAQAAwQIAMAgIAADJAgAgCwAAygIAIJoBAQAAAAGlAUAAAAABvAEBAAAAAcIBAQAAAAHEAQIAAAABxQEBAAAAAQIAAAAWACAbAADIAgAgAwAAABYAIBsAAMgCACAcAADFAgAgARQAANQEADANBAAAjQIAIAgAAKMCACALAAChAgAglwEAAKICADCYAQAAFAAQmQEAAKICADCaAQEAAAABpQFAAPcBACG8AQEA8wEAIcIBAQAAAAHDAQEA8wEAIcQBAgCJAgAhxQEBAPYBACECAAAAFgAgFAAAxQIAIAIAAADCAgAgFAAAwwIAIAqXAQAAwQIAMJgBAADCAgAQmQEAAMECADCaAQEA8wEAIaUBQAD3AQAhvAEBAPMBACHCAQEA8wEAIcMBAQDzAQAhxAECAIkCACHFAQEA9gEAIQqXAQAAwQIAMJgBAADCAgAQmQEAAMECADCaAQEA8wEAIaUBQAD3AQAhvAEBAPMBACHCAQEA8wEAIcMBAQDzAQAhxAECAIkCACHFAQEA9gEAIQaaAQEAsQIAIaUBQAC1AgAhvAEBALECACHCAQEAsQIAIcQBAgDEAgAhxQEBALQCACEF3AECAAAAAeIBAgAAAAHjAQIAAAAB5AECAAAAAeUBAgAAAAEICAAAxgIAIAsAAMcCACCaAQEAsQIAIaUBQAC1AgAhvAEBALECACHCAQEAsQIAIcQBAgDEAgAhxQEBALQCACEFGwAAzAQAIBwAANIEACDZAQAAzQQAINoBAADRBAAg3wEAAAcAIAUbAADKBAAgHAAAzwQAINkBAADLBAAg2gEAAM4EACDfAQAArwEAIAgIAADJAgAgCwAAygIAIJoBAQAAAAGlAUAAAAABvAEBAAAAAcIBAQAAAAHEAQIAAAABxQEBAAAAAQMbAADMBAAg2QEAAM0EACDfAQAABwAgAxsAAMoEACDZAQAAywQAIN8BAACvAQAgCwgAANsCACCaAQEAAAABowEAAADLAQKlAUAAAAABpgFAAAAAAcIBAQAAAAHGAQEAAAABxwEQAAAAAcgBAQAAAAHJAQEAAAABywFAAAAAAQIAAAASACAbAADaAgAgAwAAABIAIBsAANoCACAcAADYAgAgARQAAMkEADAQBAAAjQIAIAgAAKMCACCXAQAApAIAMJgBAAAQABCZAQAApAIAMJoBAQAAAAGjAQAApQLLASKlAUAA9wEAIaYBQAD3AQAhwgEBAAAAAcMBAQDzAQAhxgEBAAAAAccBEACKAgAhyAEBAPMBACHJAQEA8wEAIcsBQACmAgAhAgAAABIAIBQAANgCACACAAAA0wIAIBQAANQCACAOlwEAANICADCYAQAA0wIAEJkBAADSAgAwmgEBAPMBACGjAQAApQLLASKlAUAA9wEAIaYBQAD3AQAhwgEBAPMBACHDAQEA8wEAIcYBAQDzAQAhxwEQAIoCACHIAQEA8wEAIckBAQDzAQAhywFAAKYCACEOlwEAANICADCYAQAA0wIAEJkBAADSAgAwmgEBAPMBACGjAQAApQLLASKlAUAA9wEAIaYBQAD3AQAhwgEBAPMBACHDAQEA8wEAIcYBAQDzAQAhxwEQAIoCACHIAQEA8wEAIckBAQDzAQAhywFAAKYCACEKmgEBALECACGjAQAA1gLLASKlAUAAtQIAIaYBQAC1AgAhwgEBALECACHGAQEAsQIAIccBEADVAgAhyAEBALECACHJAQEAsQIAIcsBQADXAgAhBdwBEAAAAAHiARAAAAAB4wEQAAAAAeQBEAAAAAHlARAAAAABAdwBAAAAywECAdwBQAAAAAELCAAA2QIAIJoBAQCxAgAhowEAANYCywEipQFAALUCACGmAUAAtQIAIcIBAQCxAgAhxgEBALECACHHARAA1QIAIcgBAQCxAgAhyQEBALECACHLAUAA1wIAIQUbAADEBAAgHAAAxwQAINkBAADFBAAg2gEAAMYEACDfAQAABwAgCwgAANsCACCaAQEAAAABowEAAADLAQKlAUAAAAABpgFAAAAAAcIBAQAAAAHGAQEAAAABxwEQAAAAAcgBAQAAAAHJAQEAAAABywFAAAAAAQMbAADEBAAg2QEAAMUEACDfAQAABwAgDgUAAIMDACAJAACEAwAgCgAAhQMAIAwAAIYDACCaAQEAAAABowEAAADTAQKlAUAAAAABpgFAAAAAAcwBAQAAAAHNAQEAAAABzgFAAAAAAc8BAQAAAAHQAQEAAAAB0QEQAAAAAQIAAAAHACAbAACCAwAgAwAAAAcAIBsAAIIDACAcAADnAgAgARQAAMMEADATBAAAjQIAIAUAAKsCACAJAACsAgAgCgAA-gEAIAwAAPsBACCXAQAAqQIAMJgBAAAFABCZAQAAqQIAMJoBAQAAAAGjAQAAqgLTASKlAUAA9wEAIaYBQAD3AQAhwwEBAPMBACHMAQEA8wEAIc0BAQDzAQAhzgFAAPcBACHPAQEA8wEAIdABAQD2AQAh0QEQAIoCACECAAAABwAgFAAA5wIAIAIAAADkAgAgFAAA5QIAIA6XAQAA4wIAMJgBAADkAgAQmQEAAOMCADCaAQEA8wEAIaMBAACqAtMBIqUBQAD3AQAhpgFAAPcBACHDAQEA8wEAIcwBAQDzAQAhzQEBAPMBACHOAUAA9wEAIc8BAQDzAQAh0AEBAPYBACHRARAAigIAIQ6XAQAA4wIAMJgBAADkAgAQmQEAAOMCADCaAQEA8wEAIaMBAACqAtMBIqUBQAD3AQAhpgFAAPcBACHDAQEA8wEAIcwBAQDzAQAhzQEBAPMBACHOAUAA9wEAIc8BAQDzAQAh0AEBAPYBACHRARAAigIAIQqaAQEAsQIAIaMBAADmAtMBIqUBQAC1AgAhpgFAALUCACHMAQEAsQIAIc0BAQCxAgAhzgFAALUCACHPAQEAsQIAIdABAQC0AgAh0QEQANUCACEB3AEAAADTAQIOBQAA6AIAIAkAAOkCACAKAADqAgAgDAAA6wIAIJoBAQCxAgAhowEAAOYC0wEipQFAALUCACGmAUAAtQIAIcwBAQCxAgAhzQEBALECACHOAUAAtQIAIc8BAQCxAgAh0AEBALQCACHRARAA1QIAIQUbAACvBAAgHAAAwQQAINkBAACwBAAg2gEAAMAEACDfAQAACwAgBRsAAK0EACAcAAC-BAAg2QEAAK4EACDaAQAAvQQAIN8BAAABACALGwAA9wIAMBwAAPsCADDZAQAA-AIAMNoBAAD5AgAw2wEAAPoCACDcAQAAzwIAMN0BAADPAgAw3gEAAM8CADDfAQAAzwIAMOABAAD8AgAw4QEAANICADALGwAA7AIAMBwAAPACADDZAQAA7QIAMNoBAADuAgAw2wEAAO8CACDcAQAAvgIAMN0BAAC-AgAw3gEAAL4CADDfAQAAvgIAMOABAADxAgAw4QEAAMECADAIBAAA9gIAIAsAAMoCACCaAQEAAAABpQFAAAAAAbwBAQAAAAHDAQEAAAABxAECAAAAAcUBAQAAAAECAAAAFgAgGwAA9QIAIAMAAAAWACAbAAD1AgAgHAAA8wIAIAEUAAC8BAAwAgAAABYAIBQAAPMCACACAAAAwgIAIBQAAPICACAGmgEBALECACGlAUAAtQIAIbwBAQCxAgAhwwEBALECACHEAQIAxAIAIcUBAQC0AgAhCAQAAPQCACALAADHAgAgmgEBALECACGlAUAAtQIAIbwBAQCxAgAhwwEBALECACHEAQIAxAIAIcUBAQC0AgAhBRsAALcEACAcAAC6BAAg2QEAALgEACDaAQAAuQQAIN8BAADHAQAgCAQAAPYCACALAADKAgAgmgEBAAAAAaUBQAAAAAG8AQEAAAABwwEBAAAAAcQBAgAAAAHFAQEAAAABAxsAALcEACDZAQAAuAQAIN8BAADHAQAgCwQAAIEDACCaAQEAAAABowEAAADLAQKlAUAAAAABpgFAAAAAAcMBAQAAAAHGAQEAAAABxwEQAAAAAcgBAQAAAAHJAQEAAAABywFAAAAAAQIAAAASACAbAACAAwAgAwAAABIAIBsAAIADACAcAAD-AgAgARQAALYEADACAAAAEgAgFAAA_gIAIAIAAADTAgAgFAAA_QIAIAqaAQEAsQIAIaMBAADWAssBIqUBQAC1AgAhpgFAALUCACHDAQEAsQIAIcYBAQCxAgAhxwEQANUCACHIAQEAsQIAIckBAQCxAgAhywFAANcCACELBAAA_wIAIJoBAQCxAgAhowEAANYCywEipQFAALUCACGmAUAAtQIAIcMBAQCxAgAhxgEBALECACHHARAA1QIAIcgBAQCxAgAhyQEBALECACHLAUAA1wIAIQUbAACxBAAgHAAAtAQAINkBAACyBAAg2gEAALMEACDfAQAAxwEAIAsEAACBAwAgmgEBAAAAAaMBAAAAywECpQFAAAAAAaYBQAAAAAHDAQEAAAABxgEBAAAAAccBEAAAAAHIAQEAAAAByQEBAAAAAcsBQAAAAAEDGwAAsQQAINkBAACyBAAg3wEAAMcBACAOBQAAgwMAIAkAAIQDACAKAACFAwAgDAAAhgMAIJoBAQAAAAGjAQAAANMBAqUBQAAAAAGmAUAAAAABzAEBAAAAAc0BAQAAAAHOAUAAAAABzwEBAAAAAdABAQAAAAHRARAAAAABAxsAAK8EACDZAQAAsAQAIN8BAAALACADGwAArQQAINkBAACuBAAg3wEAAAEAIAQbAAD3AgAw2QEAAPgCADDbAQAA-gIAIN8BAADPAgAwBBsAAOwCADDZAQAA7QIAMNsBAADvAgAg3wEAAL4CADANBQAAzAMAIAkAAM0DACAMAADOAwAgmgEBAAAAAZ8BAQAAAAGlAUAAAAABpgFAAAAAAbYBAQAAAAG3AQIAAAABuAEQAAAAAbkBCAAAAAG6AQIAAAABuwEgAAAAAQIAAACvAQAgGwAAhwMAIAMAAAADACAbAACHAwAgHAAAiwMAIA8AAAADACAFAACOAwAgCQAAjwMAIAwAAJADACAUAACLAwAgmgEBALECACGfAQEAsQIAIaUBQAC1AgAhpgFAALUCACG2AQEAsQIAIbcBAgDEAgAhuAEQANUCACG5AQgAjAMAIboBAgDEAgAhuwEgAI0DACENBQAAjgMAIAkAAI8DACAMAACQAwAgmgEBALECACGfAQEAsQIAIaUBQAC1AgAhpgFAALUCACG2AQEAsQIAIbcBAgDEAgAhuAEQANUCACG5AQgAjAMAIboBAgDEAgAhuwEgAI0DACEF3AEIAAAAAeIBCAAAAAHjAQgAAAAB5AEIAAAAAeUBCAAAAAEB3AEgAAAAAQsbAACzAwAwHAAAuAMAMNkBAAC0AwAw2gEAALUDADDbAQAAtgMAINwBAAC3AwAw3QEAALcDADDeAQAAtwMAMN8BAAC3AwAw4AEAALkDADDhAQAAugMAMAsbAACaAwAwHAAAnwMAMNkBAACbAwAw2gEAAJwDADDbAQAAnQMAINwBAACeAwAw3QEAAJ4DADDeAQAAngMAMN8BAACeAwAw4AEAAKADADDhAQAAoQMAMAsbAACRAwAwHAAAlQMAMNkBAACSAwAw2gEAAJMDADDbAQAAlAMAINwBAAC-AgAw3QEAAL4CADDeAQAAvgIAMN8BAAC-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_AwAgmgEBALECACGlAUAAtQIAIaYBQAC1AgAhvQEBALECACG-AQEAsQIAIb8BAQCxAgAhwAEQANUCACHBAQIAxAIAIQUbAACeBAAgHAAAogQAINkBAACfBAAg2gEAAKEEACDfAQAAVAAgCxsAAMADADAcAADEAwAw2QEAAMEDADDaAQAAwgMAMNsBAADDAwAg3AEAAOACADDdAQAA4AIAMN4BAADgAgAw3wEAAOACADDgAQAAxQMAMOEBAADjAgAwDgQAALADACAJAACEAwAgCgAAhQMAIAwAAIYDACCaAQEAAAABowEAAADTAQKlAUAAAAABpgFAAAAAAcMBAQAAAAHNAQEAAAABzgFAAAAAAc8BAQAAAAHQAQEAAAAB0QEQAAAAAQIAAAAHACAbAADIAwAgAwAAAAcAIBsAAMgDACAcAADHAwAgARQAAKAEADACAAAABwAgFAAAxwMAIAIAAADkAgAgFAAAxgMAIAqaAQEAsQIAIaMBAADmAtMBIqUBQAC1AgAhpgFAALUCACHDAQEAsQIAIc0BAQCxAgAhzgFAALUCACHPAQEAsQIAIdABAQC0AgAh0QEQANUCACEOBAAArgMAIAkAAOkCACAKAADqAgAgDAAA6wIAIJoBAQCxAgAhowEAAOYC0wEipQFAALUCACGmAUAAtQIAIcMBAQCxAgAhzQEBALECACHOAUAAtQIAIc8BAQCxAgAh0AEBALQCACHRARAA1QIAIQ4EAACwAwAgCQAAhAMAIAoAAIUDACAMAACGAwAgmgEBAAAAAaMBAAAA0wECpQFAAAAAAaYBQAAAAAHDAQEAAAABzQEBAAAAAc4BQAAAAAHPAQEAAAAB0AEBAAAAAdEBEAAAAAEKBwAAygMAIAgAAMsDACCaAQEAAAABpQFAAAAAAaYBQAAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAARAAAAABwQECAAAAAQMbAACeBAAg2QEAAJ8EACDfAQAAVAAgBBsAAMADADDZAQAAwQMAMNsBAADDAwAg3wEAAOACADAEGwAAswMAMNkBAAC0AwAw2wEAALYDACDfAQAAtwMAMAQbAACaAwAw2QEAAJsDADDbAQAAnQMAIN8BAACeAwAwBBsAAJEDADDZAQAAkgMAMNsBAACUAwAg3wEAAL4CADADGwAAhwMAINkBAACIAwAg3wEAAK8BACAEGwAA3AIAMNkBAADdAgAw2wEAAN8CACDfAQAA4AIAMAQbAADLAgAw2QEAAMwCADDbAQAAzgIAIN8BAADPAgAwBBsAALoCADDZAQAAuwIAMNsBAAC9AgAg3wEAAL4CADAEBQAA3wMAIAkAAOADACAMAADWAwAgDgAA3gMAIAAAAAAAAAAABRsAAJkEACAcAACcBAAg2QEAAJoEACDaAQAAmwQAIN8BAADHAQAgAxsAAJkEACDZAQAAmgQAIN8BAADHAQAgBQEAANMDACAKAADVAwAgDAAA1gMAIA0AANQDACCkAQAArQIAIAAAAAAAAAAFGwAAlAQAIBwAAJcEACDZAQAAlQQAINoBAACWBAAg3wEAAK8BACADGwAAlAQAINkBAACVBAAg3wEAAK8BACAAAAAAAAAAAAAAAAAACxsAAPYDADAcAAD6AwAw2QEAAPcDADDaAQAA-AMAMNsBAAD5AwAg3AEAALcDADDdAQAAtwMAMN4BAAC3AwAw3wEAALcDADDgAQAA-wMAMOEBAAC6AwAwCgEAAOcDACAIAADLAwAgmgEBAAAAAaUBQAAAAAGmAUAAAAABvAEBAAAAAb4BAQAAAAG_AQEAAAABwAEQAAAAAcEBAgAAAAECAAAACwAgGwAA_gMAIAMAAAALACAbAAD-AwAgHAAA_QMAIAEUAACTBAAwAgAAAAsAIBQAAP0DACACAAAAuwMAIBQAAPwDACAImgEBALECACGlAUAAtQIAIaYBQAC1AgAhvAEBALECACG-AQEAsQIAIb8BAQCxAgAhwAEQANUCACHBAQIAxAIAIQoBAADmAwAgCAAAvwMAIJoBAQCxAgAhpQFAALUCACGmAUAAtQIAIbwBAQCxAgAhvgEBALECACG_AQEAsQIAIcABEADVAgAhwQECAMQCACEKAQAA5wMAIAgAAMsDACCaAQEAAAABpQFAAAAAAaYBQAAAAAG8AQEAAAABvgEBAAAAAb8BAQAAAAHAARAAAAABwQECAAAAAQQbAAD2AwAw2QEAAPcDADDbAQAA-QMAIN8BAAC3AwAwAAAAAAAAAAAFGwAAjgQAIBwAAJEEACDZAQAAjwQAINoBAACQBAAg3wEAAK8BACADGwAAjgQAINkBAACPBAAg3wEAAK8BACAGBAAA3gMAIAUAAIwEACAJAACNBAAgCgAA1QMAIAwAANYDACDQAQAArQIAIAEFAADfAwAgAwEAANMDACAHAACLBAAgCAAA1AMAIAIBAADTAwAgCAAA1AMAIA4FAADMAwAgDAAAzgMAIA4AAN0DACCaAQEAAAABnwEBAAAAAaUBQAAAAAGmAUAAAAABtQEBAAAAAbYBAQAAAAG3AQIAAAABuAEQAAAAAbkBCAAAAAG6AQIAAAABuwEgAAAAAQIAAACvAQAgGwAAjgQAIAMAAAADACAbAACOBAAgHAAAkgQAIBAAAAADACAFAACOAwAgDAAAkAMAIA4AANwDACAUAACSBAAgmgEBALECACGfAQEAsQIAIaUBQAC1AgAhpgFAALUCACG1AQEAsQIAIbYBAQCxAgAhtwECAMQCACG4ARAA1QIAIbkBCACMAwAhugECAMQCACG7ASAAjQMAIQ4FAACOAwAgDAAAkAMAIA4AANwDACCaAQEAsQIAIZ8BAQCxAgAhpQFAALUCACGmAUAAtQIAIbUBAQCxAgAhtgEBALECACG3AQIAxAIAIbgBEADVAgAhuQEIAIwDACG6AQIAxAIAIbsBIACNAwAhCJoBAQAAAAGlAUAAAAABpgFAAAAAAbwBAQAAAAG-AQEAAAABvwEBAAAAAcABEAAAAAHBAQIAAAABDgkAAM0DACAMAADOAwAgDgAA3QMAIJoBAQAAAAGfAQEAAAABpQFAAAAAAaYBQAAAAAG1AQEAAAABtgEBAAAAAbcBAgAAAAG4ARAAAAABuQEIAAAAAboBAgAAAAG7ASAAAAABAgAAAK8BACAbAACUBAAgAwAAAAMAIBsAAJQEACAcAACYBAAgEAAAAAMAIAkAAI8DACAMAACQAwAgDgAA3AMAIBQAAJgEACCaAQEAsQIAIZ8BAQCxAgAhpQFAALUCACGmAUAAtQIAIbUBAQCxAgAhtgEBALECACG3AQIAxAIAIbgBEADVAgAhuQEIAIwDACG6AQIAxAIAIbsBIACNAwAhDgkAAI8DACAMAACQAwAgDgAA3AMAIJoBAQCxAgAhnwEBALECACGlAUAAtQIAIaYBQAC1AgAhtQEBALECACG2AQEAsQIAIbcBAgDEAgAhuAEQANUCACG5AQgAjAMAIboBAgDEAgAhuwEgAI0DACEOCgAA0QMAIAwAANIDACANAADQAwAgmgEBAAAAAZsBAQAAAAGcAQEAAAABnQEBAAAAAZ4BAQAAAAGfAQEAAAABoQEAAAChAQKjAQAAAKMBAqQBAQAAAAGlAUAAAAABpgFAAAAAAQIAAADHAQAgGwAAmQQAIAMAAADKAQAgGwAAmQQAIBwAAJ0EACAQAAAAygEAIAoAALgCACAMAAC5AgAgDQAAtwIAIBQAAJ0EACCaAQEAsQIAIZsBAQCxAgAhnAEBALECACGdAQEAsQIAIZ4BAQCxAgAhnwEBALECACGhAQAAsgKhASKjAQAAswKjASKkAQEAtAIAIaUBQAC1AgAhpgFAALUCACEOCgAAuAIAIAwAALkCACANAAC3AgAgmgEBALECACGbAQEAsQIAIZwBAQCxAgAhnQEBALECACGeAQEAsQIAIZ8BAQCxAgAhoQEAALICoQEiowEAALMCowEipAEBALQCACGlAUAAtQIAIaYBQAC1AgAhBJoBAQAAAAGbAQEAAAABpQFAAAAAAb8BAQAAAAECAAAAVAAgGwAAngQAIAqaAQEAAAABowEAAADTAQKlAUAAAAABpgFAAAAAAcMBAQAAAAHNAQEAAAABzgFAAAAAAc8BAQAAAAHQAQEAAAAB0QEQAAAAAQMAAABXACAbAACeBAAgHAAAowQAIAYAAABXACAUAACjBAAgmgEBALECACGbAQEAsQIAIaUBQAC1AgAhvwEBALECACEEmgEBALECACGbAQEAsQIAIaUBQAC1AgAhvwEBALECACEImgEBAAAAAaUBQAAAAAGmAUAAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEQAAAAAcEBAgAAAAEOAQAAzwMAIAoAANEDACAMAADSAwAgmgEBAAAAAZsBAQAAAAGcAQEAAAABnQEBAAAAAZ4BAQAAAAGfAQEAAAABoQEAAAChAQKjAQAAAKMBAqQBAQAAAAGlAUAAAAABpgFAAAAAAQIAAADHAQAgGwAApQQAIAMAAADKAQAgGwAApQQAIBwAAKkEACAQAAAAygEAIAEAALYCACAKAAC4AgAgDAAAuQIAIBQAAKkEACCaAQEAsQIAIZsBAQCxAgAhnAEBALECACGdAQEAsQIAIZ4BAQCxAgAhnwEBALECACGhAQAAsgKhASKjAQAAswKjASKkAQEAtAIAIaUBQAC1AgAhpgFAALUCACEOAQAAtgIAIAoAALgCACAMAAC5AgAgmgEBALECACGbAQEAsQIAIZwBAQCxAgAhnQEBALECACGeAQEAsQIAIZ8BAQCxAgAhoQEAALICoQEiowEAALMCowEipAEBALQCACGlAUAAtQIAIaYBQAC1AgAhCpoBAQAAAAGjAQAAANMBAqUBQAAAAAGmAUAAAAABwwEBAAAAAcwBAQAAAAHOAUAAAAABzwEBAAAAAdABAQAAAAHRARAAAAABBZoBAQAAAAHTAUAAAAAB1AFAAAAAAdUBQAAAAAHWASAAAAABBpoBAQAAAAGlAUAAAAABwgEBAAAAAcMBAQAAAAHEAQIAAAABxQEBAAAAAQcBAACJBAAgmgEBAAAAAbwBAQAAAAHTAUAAAAAB1AFAAAAAAdUBQAAAAAHWASAAAAABAgAAAAEAIBsAAK0EACALAQAA5wMAIAcAAMoDACCaAQEAAAABpQFAAAAAAaYBQAAAAAG8AQEAAAABvQEBAAAAAb4BAQAAAAG_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-ugFCf7wBAoABvgEPgQG_AUOCAcABAoMBwQEChAHCAQ-FAcUBRIYBxgFKhwHIAQOIAckBA4kBzAEDigHNAQOLAc4BA4wB0AEDjQHSAQ-OAdMBS48B1QEDkAHXAQ-RAdgBTJIB2QEDkwHaAQOUAdsBD5UB3gFNlgHfAVE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var runtime2 = __toESM(require("@prisma/client/runtime/client"), 1);
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN"
};

// generated/prisma/client.ts
var import_meta = {};
globalThis["__dirname"] = path2.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new import_adapter_pg.PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/user/user.service.ts
var registerUserIntoDb = async (payload) => {
  const { name, location, email, password, phone, role, profileImage } = payload;
  const isExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isExist) {
    throw new Error("User with this email location already exist!");
  }
  if (role === "ADMIN") {
    throw new Error("You are not allowed to set this role");
  }
  const hashedPassword = await import_bcryptjs.default.hash(
    password,
    Number(config_default.bcrypt_salt_rounds)
  );
  let user;
  if (role === "CUSTOMER") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role,
        profileImage
      }
    });
  }
  if (role === "TECHNICIAN") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role,
        profileImage
      }
    });
  }
  return user;
};
var getProfileFromDb = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true }
  });
  return user;
};
var userService = {
  registerUserIntoDb,
  getProfileFromDb
};

// src/modules/user/user.controller.ts
var import_http_status = __toESM(require("http-status"), 1);
var registerUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status.default.OK,
      message: "User registered Successfully",
      data: { user }
    });
  }
);
var getMyProfile = catchAsync(
  async (req, res, next) => {
    const getMyProfile2 = await userService.getProfileFromDb(
      req.user?.id
    );
    sendResponse(res, {
      success: true,
      statusCode: import_http_status.default.OK,
      message: "Profile retreieved successfully",
      data: getMyProfile2
    });
  }
);
var userController = {
  registerUser,
  getMyProfile
};

// src/utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var createToken = (payload, secret, expiresIn) => {
  const token = import_jsonwebtoken.default.sign(payload, secret);
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = import_jsonwebtoken.default.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/middlewares/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization;
    if (!token) {
      throw new Error(
        "You are not logged in. Please Login to access this content"
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { email, name, id, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource"
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new Error("User not found. Please login again");
    }
    req.user = {
      email,
      id,
      name,
      role
    };
    next();
  });
};

// src/modules/user/user.route.ts
var router = (0, import_express.Router)();
router.post("/register", userController.registerUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  userController.getMyProfile
);
var userRouter = router;

// src/middlewares/globalErrorHandler.ts
var import_http_status2 = __toESM(require("http-status"), 1);
var globalErrorHandler = (err, req, res, next) => {
  let errorMessage = err.message || "Internal server error";
  let errorName = err.name || "Internal Server Error";
  res.status(import_http_status2.default.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: import_http_status2.default.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: err.stack
  });
};

// src/modules/auth/auth.route.ts
var import_express2 = require("express");

// src/modules/auth/auth.service.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
var loginUserIntoDb = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new Error("User not Found! Please register to continue");
  }
  if (user.status === "BANNED") {
    throw new Error("You are banned on this site. Please contact support");
  }
  const isPasswordMatched = await import_bcryptjs2.default.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Incorrect credentials");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return { accessToken, refreshToken };
};
var authService = {
  loginUserIntoDb
};

// src/modules/auth/auth.controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);
var loginUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUserIntoDb(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
      success: true,
      statusCode: import_http_status3.default.OK,
      message: "User Logged in successfully",
      data: { accessToken, refreshToken }
    });
  }
);
var authController = {
  loginUser
};

// src/modules/auth/auth.route.ts
var router2 = (0, import_express2.Router)();
router2.post("/login", authController.loginUser);
var authRouter = router2;

// src/modules/technician/technician.route.ts
var import_express3 = require("express");

// src/modules/technician/technician.service.ts
var createTechnicianProfileIntoDb = async (payload, userId) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const isUserExist = await tx.user.findUniqueOrThrow({
      where: {
        id: userId
      }
    });
    const isTechnicianProfileExist = await prisma.technicianProfile.findUnique({
      where: {
        userId
      }
    });
    if (isTechnicianProfileExist) {
      throw new Error("Technician profile already exist");
    }
    const { location, name, id } = isUserExist;
    const { bio, experience, hourlyRate, service } = payload;
    if (!service) {
      throw new Error("Please insert a service to create profile");
    }
    const createProfile = await tx.technicianProfile.create({
      data: {
        userId: id,
        bio,
        experience,
        hourlyRate,
        location
      }
    });
    return createProfile;
  });
  return transactionResult;
};
var getAllTechnicianFromDb = async () => {
  const result = await prisma.technicianProfile.findMany();
  return result;
};
var technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb
};

// src/modules/technician/technician.controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);
var createTechnicianProfile = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { id } = req.user;
    console.log("from bio", payload);
    const createProfile = await technicianService.createTechnicianProfileIntoDb(
      payload,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: import_http_status4.default.OK,
      message: "Technician Profile Created Successfully",
      data: createProfile
    });
  }
);
var getAllTechnician = catchAsync(
  async (req, res, next) => {
    const result = await technicianService.getAllTechnicianFromDb();
    sendResponse(res, {
      success: true,
      statusCode: import_http_status4.default.OK,
      message: "Technician Profile Created Successfully",
      data: result
    });
  }
);
var technicianController = {
  createTechnicianProfile,
  getAllTechnician
};

// src/modules/technician/technician.route.ts
var router3 = (0, import_express3.Router)();
router3.post(
  "/create-profile",
  auth(Role.TECHNICIAN),
  technicianController.createTechnicianProfile
);
router3.get("/", technicianController.getAllTechnician);
var technicianRouter = router3;

// src/modules/category/category.route.ts
var import_express4 = require("express");

// src/modules/category/category.service.ts
var createCategoryIntoDb = async (payload) => {
  const { name, description } = payload;
  const createCategory2 = await prisma.category.create({
    data: {
      name,
      description
    }
  });
  return createCategory2;
};
var categoryService = {
  createCategoryIntoDb
};

// src/modules/category/category.controller.ts
var import_http_status5 = __toESM(require("http-status"), 1);
var createCategory = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const result = await categoryService.createCategoryIntoDb(payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status5.default.OK,
      message: "User Logged in successfully",
      data: result
    });
  }
);
var categoryController = {
  createCategory
};

// src/modules/category/category.route.ts
var router4 = (0, import_express4.Router)();
router4.post("/", auth(Role.ADMIN), categoryController.createCategory);
var categoryRouter = router4;

// src/modules/services/services.route.ts
var import_express5 = require("express");

// src/modules/services/services.service.ts
var createServiceInToDB = async (payload) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId
  } = payload;
  if (!technicianId) {
    throw new Error("Technician Id required");
  }
  if (!categoryId) {
    throw new Error("category Id required");
  }
  if (!description) {
    throw new Error("description  required");
  }
  if (!price && price >= 1) {
    throw new Error("price can not be less than 1");
  }
  if (!duration) {
    throw new Error("Duration required");
  }
  if (!serviceTitle) {
    throw new Error("Service Title  required");
  }
  const createService2 = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration
    }
  });
  return createService2;
};
var getAllServicesFromDb = async (query) => {
  const limit = query.limit ? Number(query.limit) : 5;
  console.log("from limiit", query);
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.price) {
    andConditions.push({
      price: Number(query.price)
    });
  }
  if (query.maxPrice) {
    andConditions.push({
      price: { lte: Number(query.maxPrice) }
    });
  }
  const result = await prisma.service.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip
  });
  return result;
};
var servicesService = {
  getAllServicesFromDb,
  createServiceInToDB
};

// src/modules/services/services.controller.ts
var import_http_status6 = __toESM(require("http-status"), 1);
var createService = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const result = await servicesService.createServiceInToDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status6.default.OK,
      message: "Service created successfully",
      data: result
    });
  }
);
var getAllServices = catchAsync(
  async (req, res, next) => {
    const result = await servicesService.getAllServicesFromDb();
    sendResponse(res, {
      success: true,
      statusCode: import_http_status6.default.OK,
      message: "All services retrieved successfully",
      data: result
    });
  }
);
var serviceController = {
  getAllServices,
  createService
};

// src/modules/services/services.route.ts
var router5 = (0, import_express5.Router)();
router5.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router5.get("/", serviceController.getAllServices);
var serviceRouter = router5;

// src/app.ts
var app = (0, import_express6.default)();
app.use(
  (0, import_cors.default)({
    origin: config_default.app_url,
    credentials: true
  })
);
app.use(import_express6.default.json());
app.use(import_express6.default.urlencoded({ extended: true }));
app.use((0, import_cookie_parser.default)());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/technician", technicianRouter);
app.use("/api/admin/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use(globalErrorHandler);
var app_default = app;

// src/server.ts
var PORT = 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
    app_default.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log("Couldn't start the server");
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.cjs.map