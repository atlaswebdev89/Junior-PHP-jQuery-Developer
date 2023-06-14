Файлы приложения в папке app/
Приложение разбито на две независимых части
- frontend
- backend

Реализовано на Docker
Для запуска необходимо выполнить следующее 

cd app/  
docker compose up --build 

Дождаться когда запустить mysql и сделать миграцию
docker exec -it php-junior-rest php artisan migrate --seed

Приложение будет доступно по адрессу
http://localhost:8787/