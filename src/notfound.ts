import { IncomingMessage, ServerResponse } from 'http';

export function notFoundRoute(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write(`
      <html>
        <head>
          <title>Not Found</title>
          <style>
            body {
              background-color: #f1f1f1;
              text-align: center;
              font-family: Arial, sans-serif;
            }
            h1 {
              color: #ff0000;
              font-size: 96px;
              margin: 0;
            }
            p {
              font-size: 24px;
            }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #ff0000;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
            a:hover {
              background-color: #cc0000;
            }
            img {
              display: block;
              margin: 20px auto;
              max-width: 400px;
            }
          </style>
        </head>
        <body>
          <h1>404</h1>
          <p>Page not found</p>
          <a href="/">Go to Home</a>
          <img src="/404/404.jpg" alt="Image">
        </body>
      </html>
    `);
    res.end();
  }
}
