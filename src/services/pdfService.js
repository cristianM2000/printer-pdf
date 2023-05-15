import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + '/files/';

async function downloadPDF(pdfUrl) {
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });
  const pdfBuffer = Buffer.from(response.data, "binary");
  const tempPath = path.join(__dirname, "temp.pdf");
  fs.writeFileSync(tempPath, pdfBuffer);

  return tempPath;
}

async function savePDF(pdfFile) {
  const pdfBuffer = Buffer.from(pdfFile.data, "binary");
  const tempPath = path.join(__dirname, "temp.pdf");
  fs.writeFileSync(tempPath, pdfBuffer);

  return tempPath;
}


export default { downloadPDF, savePDF };
