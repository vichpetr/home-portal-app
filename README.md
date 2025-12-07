# Portál Nájemníka (Shell Application)

Hlavní "obálková" aplikace (Host), která sdružuje dílčí mikro-aplikace (jako je Generátor smluv).
Je postavena na **React** a **Vite** s využitím pluginu **vite-plugin-federation**.

## 🔗 Architektura

Tato aplikace (Shell) zajišťuje:
- 🧭 **Navigaci** (Menu)
- 🖼 **Layout** stránky
- 🧩 **Načítání modulů** (Micro-frontends)

### Připojené moduly (Remotes)

| Modul | Popis | URL (Dev) | URL (Prod) |
|-------|-------|-----------|------------|
| **rentalGenerator** | Generátor smluv | `http://localhost:5001` | `/modules/generator` |

## 🚀 Spuštění projektu

Pro lokální vývoj potřebujete spustit jak tuto aplikaci, tak i jednotlivé moduly.

1. **Spusťte Modul (Generátor)** (v jiném terminálu):
   ```bash
   cd ../generator-najemnich-smluv
   npm run build
   npm run serve
   ```

2. **Spusťte Shell (Tuto aplikaci)**:
   ```bash
   npm install
   npm run dev
   ```

3. Otevřete `http://localhost:5173`.
   Po kliknutí na "Generátor Smluv" by se měl načíst obsah z druhého projektu.

## 🛠 Konfigurace

Nastavení připojených aplikací najdete ve `vite.config.js`:

```javascript
federation({
  remotes: {
    rentalGenerator: '...' // URL k remoteEntry.js
  }
})
```

## 🚢 Deployment

Při nasazení na produkci (FTP) se očekává následující struktura složek na serveru:

- `/` (root) -> Obsah `portal-app/dist`
- `/modules/generator` -> Obsah `generator-najemnich-smluv/dist`
