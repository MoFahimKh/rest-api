import express from "express";
import { router as clinicsRouter } from "./route/clinics.js";

const app = express();
app.use("/clinics", clinicsRouter);
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

export { app };
