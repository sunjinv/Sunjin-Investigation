import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, node_env: process.env.NODE_ENV });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Ignore common asset extensions to avoid infinite loops or overhead if Vite middleware missed them
      if (
        url.includes('.js') || 
        url.includes('.css') || 
        url.includes('.png') || 
        url.includes('.jpg') || 
        url.includes('.svg') ||
        url.includes('/@vite') ||
        url.includes('/src/') ||
        url.includes('/node_modules/')
      ) {
        return next();
      }

      console.log(`[Dev Server] SPA Fallback for: ${url}`);
      try {
        const templatePath = path.resolve(process.cwd(), 'index.html');
        if (!fs.existsSync(templatePath)) {
          console.error(`[Dev Server] index.html not found!`);
          return next();
        }
        
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        console.error(`[Dev Server] SPA Error:`, e);
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
