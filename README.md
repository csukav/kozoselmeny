# közös

Eseményfelfedező és -foglaló webalkalmazás Next.js App Routerrel, TypeScripttel,
Prismával, SQLite-tal és Auth.js-szel.

## Helyi fejlesztés

1. Telepítsd a függőségeket: `npm install`
2. Másold le a környezeti változókat: `cp .env.example .env`
3. Adj meg egy véletlenszerű `AUTH_SECRET` értéket a `.env` fájlban.
4. Állítsd az `AUTH_URL` értékét a nyilvános alkalmazás-URL-re. Az
   `AUTH_TRUST_HOST=true` értéket csak helyi fejlesztéshez vagy megbízható
   reverse proxy mögötti telepítéshez használd.
5. Opcionálisan állítsd be az `AUTH_GITHUB_ID` és `AUTH_GITHUB_SECRET`
   változókat a GitHub OAuth alkalmazásodból. A helyi visszahívási URL:
   `http://localhost:3000/api/auth/callback/github`.
6. Hozd létre az adatbázist és a Prisma klienst:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

7. Indítsd el az alkalmazást: `npm run dev`

Az OAuth-változók megadása nélkül az e-mail/jelszó regisztráció és belépés
továbbra is használható. A seed hat bemutató eseményt és azok szervezőjét
hozza létre; többször is biztonságosan futtatható.

## Elérhető funkciók

- Események keresése, kategória szerinti szűrése és részleteinek megtekintése.
- Bejelentkezés és regisztráció e-mail/jelszóval vagy GitHub OAuth-fal.
- Bejelentkezett felhasználóknak eseményszervezés és férőhely-foglalás.
- Saját foglalások és események megtekintése az irányítópulton.
- A `/api/events` végpont eseményeket listáz, bejelentkezett felhasználóknak
  pedig validált eseménylétrehozást biztosít.
