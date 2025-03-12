# 🚀 Snippet Management System

Dit is een **Snippet Management System** waarmee gebruikers **code snippets kunnen toevoegen, bekijken en filteren** op programmeertaal en tags.  
De applicatie is gebouwd met **Node.js, Express, EJS en MongoDB**.  

## 📌 Functies  
✅ Toevoegen van nieuwe code snippets  
✅ Weergeven van een lijst met snippets  
✅ Filtering op **programmeertaal** en **tags**  
✅ Snippets verwijderen uit de database  
✅ EJS-template engine voor dynamische pagina’s  

---

## ⚡ Installatie  

### 1️⃣ **Clone de repository**
```sh
git clone https://github.com/jouw-gebruikersnaam/snippet-management.git
cd snippet-management
```
### 2️⃣ **Installeer de benodigde dependencies**
```sh
npm install
```
### 3️⃣ **Maak een .env bestand en voeg je MongoDB-verbinding toe**
```sh
MONGO_URI_LIVE=mongodb+srv://<user>:<password>@cluster.mongodb.net/myDatabase
PORT=3000
```

---
## 🌍 Routes & Functionaliteit

### 1️⃣ **Frontend Routes**
| Route               | Methode | Beschrijving                                                         |
|---------------------|---------|----------------------------------------------------------------------|
| `/`                 | GET     | Laadt het dashboard met snippets (via EJS)                           |
| `/api/snippets` | POST     | Laadt alle snippets |
| `/api/snippets/:id` | GET     | Laadt een snippets gegeven een id |
| `/api/snippets/:id` | PUT     | Update snippet |
| `/api/snippets/:id` | DELETE     | Verwijder snippet uit de db |

### 2️⃣ **Filtering**
```
http://localhost:3000/?language=JavaScript&tags=async,fetch
```

## 📂 Project Structuur
```
/snippet-management
├── /public        # Statische bestanden (CSS & JS)
│   ├── css/style.css
│   ├── js/script.js
├── /views         # EJS templates
│   ├── index.ejs
├── /routes        # Express routes
│   ├── snippet.routes.ts
├── /models        # Mongoose modellen
│   ├── snippets.model.ts
├── .env           # Omgevingsvariabelen
├── index.ts       # Hoofdserverbestand
├── package.json   # Node.js configuratie
```