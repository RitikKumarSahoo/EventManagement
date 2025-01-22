import { generatePdf } from '../lib/pdf.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfRoutes = {
    async get(req, res) {
        const { name, email, content } = req.query;

        if (!name || !email || !content) {
            return res.status(400).json({ error: 'Name, email, and content are required' });
        }

        try {
            const html = await ejs.renderFile(
                path.join(__dirname, '../views', 'pdfTemplate.ejs'),
                { name, email, content }
            );

            const pdfBuffer = await generatePdf(html);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=dynamic-content.pdf`);

            res.send(pdfBuffer);
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ error: 'Failed to generate PDF' });
        }
    },
};

export default pdfRoutes;
