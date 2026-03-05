# Site SEO Checker

SEO audit tool — analyze any webpage's indexing and semantic signals with score.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

## About

Site SEO Checker is a full-stack web service for auditing SEO and content signals of any webpage by URL. Enter a URL, choose an audit type and get a scored report with indexing or semantic analysis. All checks are stored in history.

## Features

- **URL audit** — enter any URL to run an SEO check
- **Two audit types** — indexing audit and semantic audit
- **Score** — calculated score based on parsed HTML signals
- **History** — all previous checks stored and displayed
- **HTML parsing** — page downloaded and parsed via Cheerio
- **REST API** — clean NestJS endpoints with query and path param support

## Pages

| Page | Description |
|---|---|
| **Home** | URL input form, audit type selector, result card and check history |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/check-link/history` | Get all previous checks |
| `POST` | `/check-link?type=indexing\|semantic` | Run audit with type in query |
| `POST` | `/check-link/indexing\|semantic` | Run audit with type in path |

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML / SCSS / JS | Frontend (no bundler, Axios via CDN) |
| NestJS | Backend framework |
| TypeScript | Type safety |
| TypeORM | Database ORM |
| PostgreSQL | Check history storage |
| Cheerio | HTML parsing |
| HttpService | Page downloading |

## Getting Started

```bash
# Install server dependencies
cd server
npm install

# Start backend
npm run start:dev

# Open client
open client/index.html
```

> The frontend uses no bundler — Axios is loaded via CDN as `globalThis.axios`. JS imports must point to real `.js` files.

## Author

Designed and developed by **Ihor Yanchuk**
[Portfolio](https://github.com/Vergos1) · [GitHub](https://github.com/Vergos1)
