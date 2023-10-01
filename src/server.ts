import http from 'http';
import { parse } from 'url';
import { homeRoute } from './home';
import { libraryRoute } from './library';
import { notFoundRoute } from './notfound';
import fs from 'fs';
import path from 'path';

let gradientCounter = 0;

function generateGradient(
  color1: string | string[],
  color2: string | string[],
  angle: string | string[] | undefined
) {
  const validColor1 = typeof color1 === 'string' ? color1 : 'red';
  const validColor2 = typeof color2 === 'string' ? color2 : 'blue';
  const validAngle = typeof angle === 'string' ? parseInt(angle) : 45;

  const gradient = {
    color1: validColor1,
    color2: validColor2,
    angle: validAngle,
  };

  return gradient;
}

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url || '', true);

  switch (pathname) {
    case '/':
      const currentTime = new Date().toLocaleTimeString();
      const currentGradient = generateGradient(
        query.color1 as string,
        query.color2 as string,
        query.angle as string
      );
      gradientCounter++;

      homeRoute(
        req,
        res,
        currentGradient,
        currentTime,
        gradientCounter,
        {
          color1: query.color1 as string,
          color2: query.color2 as string,
          angle: query.angle as string,
        }
      );
      break;

    case '/library':
      libraryRoute(req, res);
      break;

    case '/images':
      const filename = query.filename as string;
      const imagePath = path.join(__dirname, 'images', filename);

      if (fs.existsSync(imagePath)) {
        const imageStream = fs.createReadStream(imagePath);
        res.setHeader('Content-Type', 'image/gif');
        imageStream.pipe(res);
      } else {

        notFoundRoute(req, res);
      }
      break;

    default:
      notFoundRoute(req, res);
      break;
  }
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
