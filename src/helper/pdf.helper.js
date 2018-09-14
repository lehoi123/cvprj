class PdfHelper {
  printPdfOnHistory = cvFrame => {
    cvFrame.focus();
    cvFrame.contentWindow.print();
  };

  previewPdfOnHistory = pdfUrl => {
    window.open(pdfUrl);
  };
}

export default new PdfHelper();
