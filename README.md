# Trullo - Task & Project Management App

## 📝 Teoretiska resonemang

### 1️⃣ Val av Databas
Jag har valt **MongoDB** som databas, främst för att vi bara använt SQL innan. Jag ville hellre öva på att skriva NoSQL databaser.
MongoDB är dokumentbaserad och passar bra för applikationer med dynamiska och relationsrika data som Task, Projects och Users. 

### 2️⃣ Tekniker och npm-paket
I applikationer använder jag följade paket:
* **Express** - Ramverk för att skapa API endpoints och hantera HTTP requests/responses.
* **Mongoose** - ODM (Object Data Modeling) för MongoDB -> Ger scheman, modeller och enkel databasinteraktion.
* **bcrypt** - För att kryptera lösenord innan de sparas i databasen.
* **jsonwebtoken (JWT)** - Skapar och verifierar tokens för autentisering och rollhantering.
* **dotenv** - Läser miljövariabler från `.env`-filen för känslig information som `MONGODB_URI` och `JWT_SECRET`.
* **zod** - Validerar inkommande data (tex nya Users) för att säkerställa korrekta yper och format.
* **ts-node/tsx/Typescript** - Ger typkontroll och möjlighet att köra Typescript direkt utan att först kompilera till Javascript.

### 3️⃣ Översikt över applikationen
Applikationen är en **task- och project management-app** där användare kan skapa, läsa, uppdatera och ta bort Users, Tasks och Projects.
* **Autentisering och Rollhantering**
  * Användare loggar in via `/auth/login` och får en JWT-token.
  * Tokens används i `Authorization` headern för att skydda alla endpoints utom register/login.
  * Rollen `admin` kan administrera alla Users, Taks och Projects - vanliga användare kan endast uppdatera sina egna uppgifter eller sina tilldelade tasks.
* **CRUD-logik och relationer**
  * **Users**: Kan skapas, uppdateras, tas bort. Lösenord krypteras med bcrypt.
  * **Tasks**: Kan kopplas till Users via `assignedTo` och `finishedBy`. Status uppdateras med timestamps. `finishedAt` och `finishedBy` sätts automatiskt när status ändras till "done", annars null.
  * **Projects**: Kopplas till Users via `owner` och `members`. Ägare eller admin kan uppdatera eller ta bort projekt.
* **Seed-data**
  * En seed-fil fyller databasen med testdata: 2 Users (1 admin & 1 vanlig user), 2 Projects och 4 Tasks med blandade statusar.
  * Lösenord hashas automatiskt när de 2 nya användarna skapas.
* **Validering och felhantering**
  * Incoming request data valideras med Zod (för users) och Mongoose schema validators.
  * API returnerar tydliga felmeddelanden med rätt HTTP-statuskoder.  

## 🔑 Funktionalitet
* CRUD för **Users**, **Tasks** och **Projects**
* JWT-baserad autentisering
* Rollhantering (**user/admin**)
* Relationer mellan Tasks och Users (assignedTo, finishedBy)
* Relationer mellan Projects och Users (owner, members)
* Kryptering av lösenord med bcrypt
* Reset Password-flöde (request + reset via token)
* Robust felhantering och validering (zod + mongoose validators)
* Seed-data som fyller databasen med exempeldata

## 💻 API Endpoints
I alla endpoints måste man vara inloggad, förutom createUser och i auth endpoints.

### Auth
* `POST /auth/login` - Användare loggar in med sin email och password -> får en token som skickas med i Authorization - Bearer Token.
* `POST /auth/request-reset` - Användare har "klickat på glömt lösenord" -> skickar sin email och får en reset länk. 
* `POST /auth/reset` - Sätter nytt lösenord via reset-länk.
  * Exempel:
    ```json
    {
      "userId": "32579fsjjk32498pc",
      "token": "edfj3r98uofjkj3202ikflkasjf39",
      "newPassword": "<Nytt lösenord>"  
    }
    ```

### Users
* `GET /users` - Hämtar alla användare.
* `GET /users/:id` - Hämtar en användare via Id.
* `POST /users` - Skapar ny användare.
* `PUT /users/:id` - Uppdaterar en användare (admin eller samma användare).
* `DELETE /users/:id` - Tar bort en användare (admin eller samma användare).

### Tasks
* `GET /tasks` - Hämtar alla tasks.
* `GET /tasks/:id` - Hämtar en task via Id.
* `POST /tasks` - Skapar ny task.
* `PUT /tasks/:id` - Uppdaterar en task (admin eller assigned användare).
* `DELETE /tasks/:id` - Tar bort en task (admin eller assigned användare).

### Projects
* `GET /projects` - Hämtar alla projekt.
* `GET /projects/:id` - Hämtar en projekt via Id.
* `POST /projects` - Skapar nytt projekt, ägare sätts automatiskt till den inloggade användaren.
* `PUT /projects/:id` - Uppdaterar ett projekt (admin eller ägare).
* `DELETE /projects/:id` - Tar bort ett projekt (admin eller ägare).

## 🚀 Körguide

### Installation
1. Klona Repo:
```bash
git clone https://github.com/Hannaosterberg/Trullo.git
```
2. Installera dependencies:
```bash
npm install
```
3. Kopiera .env.example till .env och fyll i dina miljövariabler:
```bash
MONGODB_URI=<din_mongodb_uri>
JWT_SECRET=<valfri_hemlig_sträng>
PORT=3000
```
4. Seeda Databasen:
```bash
npm run seed
```
Detta skapar 2 användare (admin & user), 2 projekt och 4 tasks med blandade statusar. Lösenord hashas automatiskt.

### Testkonton
* Admin: admin@example.com / Passw0rd!
* User: user@example.com / Passw0rd!

### Starta server
```bash
npm run dev
```
