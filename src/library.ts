import { IncomingMessage, ServerResponse } from 'http';
import { readdir } from 'fs/promises';
import path from 'path';

export async function libraryRoute(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');

    try {
      const imageFiles = await readdir(path.join(__dirname, '..', 'images'));
      const imageCards = imageFiles.map((imageFile) => `
        <div class="image-card">
          <img src="/images/${imageFile}" alt="${imageFile}">
        </div>
      `).join('');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(`
        <html>
          <head>
            <title>Библиотека</title>
            <style>
              .image-card {
                margin: 100px;
                padding: 100px;
                border: 1px solid #ccc;
                display: inline-block;
              }
              .image-card img {
                max-width: 200px;
                max-height: 200px;
              }
            </style>
          </head>
          <body>
            <h1>Библиотека</h1>
            <div class="navigation">
              <a href="/">Главная</a>
              <a href="/library">Библиотека</a>
            </div>
            <h2>Карточки .gif изображений:</h2>
            ${imageCards}
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Ошибка чтения папки "images":', error);
      res.write('<p>Произошла ошибка при чтении папки "images".</p>');
    }

    res.end();
  }
}
