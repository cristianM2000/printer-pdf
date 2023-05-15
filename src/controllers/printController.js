import express from "express";
import printerService from "../services/printerService.js";
import pdfService from "../services/pdfService.js";
import { isValidURL } from "../utils/validationUtils.js";

const printController = express.Router();

printController.post("/print", async (req, res, next) => {
  try {
    const { printerName, pdfUrl } = req.body;

    if (!isValidURL(pdfUrl)) {
      const error = new Error("Invalid PDF URL");
      error.code = "ERR_BAD_REQUEST";
      throw error;
    }

    const pdfBuffer = await pdfService.downloadPDF(pdfUrl);

    await printerService.printPDF(printerName, pdfBuffer);

    res.send("Impresión enviada correctamente.");
  } catch (error) {
    next(error);
  }
});

export default printController;
