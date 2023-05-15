import ptpWin from "pdf-to-printer";
import ptpUnix from "unix-print";
import { platform } from "os";
import fs from "fs";

const OS_WIN32 = "win32";

async function printPDF(printerName, pdfBuffer) {
  const osPlatform = platform();

  const optionsPrinter = {
    printer: printerName,
  };

  if (osPlatform !== OS_WIN32) {
    await ptpUnix.print(pdfBuffer, optionsPrinter);
    fs.unlinkSync(pdfBuffer);
  } else {
    await ptpWin.print(pdfBuffer, optionsPrinter);
    fs.unlinkSync(pdfBuffer);
  }
}

export default { printPDF };
