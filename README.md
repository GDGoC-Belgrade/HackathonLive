# HackathonLive

Web aplikacija za prikaz informacija o hakatonima.

## Tehnologije

- [Next.js](https://nextjs.org/) - React framework za razvoj web aplikacija.
- [TypeScript](https://www.typescriptlang.org/) - JavaScript sa statičkom tipovima.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework za stilizovanje korisničkog interfejsa.
- [PostgreSQL](https://www.postgresql.org/) - relaciona baza podataka.
- [Neon](https://neon.com/) - cloud platforma za PostgreSQL bazu.
- [Drizzle ORM](https://orm.drizzle.team/) - [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) za rad sa bazom podataka iz TypeScript-a.

## Preduslovi

Potrebno je imati instalirano:

- [Node.js](https://nodejs.org/) (LTS)
- npm (uključeno u instalaciju Node.js-a)
- Git

Provera instalacije:

```bash
node -v
npm -v
git -v
```

## Pokretanje projekta

Klonirati repozitorijum:

```bash
git clone <repository-url>
cd HackathonLive
```

Nakon kloniranja repozitorijuma, instalirati dependency-je komandom:
```bash
npm install
```

Potrebno je kreirati .env fajl na osnovu .env.example i u njega upisati:
```
DATABASE_URL="your-neon-database-connection-string"
```
Pokretanje development servera:

```bash
npm run dev
```

Aplikacija će biti dostupna na http://localhost:3000.

## Production

Za proveru production build-a:

```bash
npm run build
```

## Dokumentacija

- [Next.js dokumentacija](https://nextjs.org/docs)

- [Neon dokumentacija](https://neon.com/docs)

- [Drizzle dokumentacija](https://orm.drizzle.team/docs)

- [PostgreSQL dokumentacija](https://www.postgresql.org/docs/)