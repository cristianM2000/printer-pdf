import express from "express";
import printerService from "../services/printerService.js";
import pdfService from "../services/pdfService.js";
import { isValidURL } from "../utils/validationUtils.js";

const printController = express.Router();

const AVAILABLE_TYPES = ['application/pdf']

printController.post("/print", async (req, res, next) => {
  try {
    const { printerName, numbPage } = req?.body;

    const pdfUrl = req?.body?.pdfUrl;
    const pdfFile = req?.files?.pdfFile;

    console.log(pdfFile)

    const options = {
      pages: numbPage,
    }

    if(!!pdfFile && !!pdfUrl){
      const error = new Error("Just one, pdf file or pdf url");
      error.code = "ERR_BAD_REQUEST";
      throw error;
    }
    if(!pdfFile && !pdfUrl){
      const error = new Error("None PDF file or URI was provided");
      error.code = "ERR_BAD_REQUEST";
      throw error;
    }
    if (pdfUrl && !isValidURL(pdfUrl)) {
      const error = new Error("Invalid PDF URL");
      error.code = "ERR_BAD_REQUEST";
      throw error;
    }

    if(pdfFile && !AVAILABLE_TYPES.includes(pdfFile.mimetype)){
      const error = new Error("Invalid File type");
      error.code = "ERR_BAD_REQUEST";
      throw error;
    }
    let pdfBuffer = '';

    if(pdfUrl){
      pdfBuffer = await pdfService.downloadPDF(pdfUrl);
    }

    if(pdfFile){
      pdfBuffer = await pdfService.savePDF(pdfFile);
    }
    await printerService.printPDF(printerName, pdfBuffer, options);

    res.send("Impresión enviada correctamente.");
  } catch (error) {
    console.error(error)
    next(error);
  }
});

printController.get("/printers", async (req, res, next) => {
  try {
    const result = await printerService.getPrinters();
    res.send([...result]);
  } catch (error) {
    console.error(error)
    next(error);
  }
});

export default printController;
