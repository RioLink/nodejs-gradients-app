import { IncomingMessage, ServerResponse } from 'http';

export function homeRoute(
  req: IncomingMessage,
  res: ServerResponse,
  gradient: any,
  currentTime: string,
  gradientCounter: number,
  updatedGradient?: any
) {
  const requestTime = Date.now();

  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write(`
    <html>
      <head>
        <title>Главная страница</title>
        <style>

          .gradient-box {
            width: 200px; /* Ширина блока */
            height: 200px; /* Высота блока */
            background: linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2});
          }

          .navigation {
            margin-top: 20px;
          }
          .navigation a {
            margin-right: 10px;
            text-decoration: none;
          }

          form {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          input[type="color"], input[type="number"] {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Главная страница</h1>
        <div class="navigation">
          <a href="/">Главная</a>
          <a href="/library">Библиотека</a>
        </div>
        <div class="gradient-box"></div>
        <p>Текущее время: ${currentTime}</p>
        <p>Количество обработанных запросов: ${gradientCounter}</p>
        
        <div id="timer" style="text-align: center; font-size: 3em;">0 сек</div>

        <form action="/" method="get">
          <label for="color1">Цвет 1:</label>
          <input type="color" id="color1" name="color1" value="${updatedGradient?.color1 || '#FF0000'}" required>
          <br>
          <label for="color2">Цвет 2:</label>
          <input type="color" id="color2" name="color2" value="${updatedGradient?.color2 || '#0000FF'}" required>
          <br>
          <label for="angle">Угол:</label>
          <input type="number" id="angle" name="angle" placeholder="Введите угол" value="${updatedGradient?.angle || ''}" required>
          <br>
          <button type="submit">Применить градиент</button>
        </form>

        <script>

        function updateTimer() {
          const timerElement = document.getElementById('timer');
          const lastActionTime = ${requestTime};
          const currentTime = Date.now();
          const elapsedTime = (currentTime - lastActionTime) / 1000; // В секундах
          timerElement.innerText = elapsedTime.toFixed(1) + ' сек';
          setTimeout(updateTimer, 100); // Обновляем каждые 100 мс
        }

        window.onload = updateTimer;
        </script>
      </body>
    </html>
  `);
  res.end();
}
