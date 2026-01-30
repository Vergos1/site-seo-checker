## SiteSeoChecker

**SiteSeoChecker** — сервис для быстрой проверки SEO/контент‑сигналов страницы по URL.

Проект состоит из двух частей — **frontend** и **backend**.

### Frontend (`client/`)

Статический клиент на **HTML/CSS/JS** (без сборщика), который:

- показывает форму ввода URL;
- позволяет выбрать тип аудита (**indexing** / **semantic**);
- отправляет запрос на API и отображает результат;
- запрашивает и отображает историю проверок.

**Комментарий (важно):** так как сборщика нет, импорты в браузере должны указывать на **реальные `.js` файлы**, а `axios` подключается через CDN и доступен как `globalThis.axios`.

### Backend (`server/`)

API на **NestJS + TypeORM + PostgreSQL**, которое:

- принимает URL страницы;
- скачивает HTML (через `HttpService`);
- парсит HTML через `cheerio` и собирает сигналы (SEO/контент);
- считает score по выбранному типу аудита (**indexing** / **semantic**);
- хранит историю проверок в PostgreSQL.

**Основные эндпоинты:**

- `GET /check-link/history` — история проверок
- `POST /check-link?type=indexing|semantic` — запуск проверки (тип в query)
- `POST /check-link/indexing|semantic` — запуск проверки (тип в path)
