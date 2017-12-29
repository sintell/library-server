# library-server

## Описание

Сервер для организации работы с библиотекой книг.
Написан с образовательной целью и практической пользы на текущий момент не представляет.

## Технологии
- [koa](https://github.com/koajs/koa) - серверный фреймворк
- [passport](https://github.com/jaredhanson/passport) - фреймворк для авторизации
- [sequelize](https://github.com/sequelize/sequelize) - ORM
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - генерация OpenAPI Speck из jsdoc

## Зависимости
- [SQlite >= 3](https://www.sqlite.org/)
- [yarn >= 1.2](https://yarnpkg.com/lang/en/)

## Установка
- `git clone git@github.com:sintell/library-server.git`

- `cd library-server`

- `mkdir /path/to/db/dir`

- `sqlite3 /path/to/db/dir/hh-library-dev.sqlite` (команда может отличаться в зависимости от используемой ОС)

- `cp config/database.json.ex config/database.json`

- `open config/database.json` (редактируем строчки `storage:`, указывая актуальный путь)

- `yarn`

## Обновление
- `git fetch && git pull`
- `yarn`

## Запуск

#### Development:
`PORT=3000 DEBUG=* yarn dev-run` ([подробнее об использовании переменной `DEBUG`](https://github.com/visionmedia/debug#wildcards))

#### Production:
`PORT=3000 yarn run`

## API
Актуальное API в виде [OpenAPI 2.0 Speck](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) (бывший swagger) может быть найдено при старте сервера по адресу [http://localhost:3000/docs](http://localhost:3000/docs) (порт приложения может отличаться и зависит от переменной окружения **PORT**)

## Contributing

Все предложения принимаются и реализуются:
- быстро - в виде **pull request**
- медленно - в виде **issue**

Все замечания и баги исправляются:
- быстро - в виде **issue**
- с благодарностью - в виде **pull request**

## TODO
- авторизация через Atlassian Jira
- unit-tests
- consistent errors
