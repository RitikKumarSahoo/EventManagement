import htmlPdf from 'html-pdf-node';

export async function generatePdf(html) {
  const options = { format: 'A4' };
  const file = { content: html };

  try {
    const pdfBuffer = await htmlPdf.generatePdf(file, options);
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}