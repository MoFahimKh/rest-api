import request from "supertest";
import { app } from "../app.js";
import { clinics } from "./testConstants.js";
import { createServer } from "http";

describe("API Tests", () => {
  test("GET /clinics should return all clinics", async () => {
    const response = await request(app).get("/clinics");
    // expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(clinics));
  });

  test("GET /clinics with clinicName filter should return filtered clinics", async () => {
    const clinicName = "National Veterinary Clinic";
    const response = await request(app).get(
      `/clinics?clinicName=${clinicName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        clinicName: "National Veterinary Clinic",
        stateCode: "CA",
        opening: {
          from: "15:00",
          to: "22:30",
        },
      },
    ]);
  });

  test("GET /clinics with state filter should return filtered clinics", async () => {
    const state = "FL";
    const response = await request(app).get(`/clinics?state=${state}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        clinicName: "Good Health Home",
        stateCode: "FL",
        opening: {
          from: "15:00",
          to: "20:00",
        },
      },
    ]);
  });

  test("GET /clinics with availability filter should return filtered clinics", async () => {
    const availability = "09:00-23:00";
    const response = await request(app).get(
      `/clinics?availability=${availability}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        clinicName: "Good Health Home",
        stateCode: "FL",
        opening: {
          from: "15:00",
          to: "20:00",
        },
      },
      {
        clinicName: "National Veterinary Clinic",
        stateCode: "CA",
        opening: {
          from: "15:00",
          to: "22:30",
        },
      },
      {
        clinicName: "City Vet Clinic",
        stateCode: "NV",
        opening: {
          from: "10:00",
          to: "22:00",
        },
      },
    ]);
  });

  test("GET /clinics with status code 404 shold return error message ", async () => {
    const response = await request(app).get("/clinics/?clinicName=wrong name");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Sorry, No such Clinics found");
  });

  test("GET /clinics with status code 500 should return error message", async () => {
    const app = createServer((req, res) => {
      res.statusCode = 500;
      res.end("Server Error");
    });
    const response = await request(app).get("/clinics");
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Server Error");

    app.close();
  });
});
