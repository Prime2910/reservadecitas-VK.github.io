Vikingard - Frontend + optional Node.js API sample
---
Contenido del ZIP:
- public/index.html      -> Vista principal resumida
- public/reservar.html   -> Formulario de reserva en línea
- public/js/app.js       -> Lógica JS (consume API o usa LocalStorage como fallback)
- api/server.js          -> (opcional) Node.js sample API to connect to MySQL
- README.md              -> Este archivo

INSTRUCCIONES RÁPIDAS
1) Frontend puro: Abre public/index.html con Live Server o un servidor estático.
2) Sin backend: Las reservas se guardan en LocalStorage si no hay /api/eventos.
3) Con backend (opcional):
   - Crear archivo .env con DB_HOST, DB_USER, DB_PASS, DB_NAME
   - node api/server.js (instala dependencias: express mysql2 cors dotenv)
   - Sirve el frontend (por ejemplo `npx http-server public`) y la app intentará enviar a /api/eventos
4) Si deseas el zip listo para desplegar en hosting, me dices y lo preparo según lo que uses.

Nota: Por seguridad el frontend no puede conectar directamente a MySQL. El archivo api/server.js es un ejemplo mínimo de cómo exponer una API segura para que el frontend pueda usar MySQL.
