
# FLO8 - MVP Development Guidesssss

Dit project is gebouwd als een productieklare MVP met een strikte scheiding tussen de marketing website en de PWA applicatie.

## Architectuur
- **Repository Pattern**: Data toegang is geabstraheerd. Switch tussen Mock en Firebase door `USE_MOCK_DATA` in `appConfig.ts` te wijzigen.
- **Error First**: Geen stille fouten. Elke repository gooit errors die via `ErrorService` naar de gebruiker worden vertaald en getoond via de globale `Toast`.

## Debugging
- Open de browser console.
- Voer `window.toggleMockError()` uit om geforceerde repository errors te testen.
- Bekijk de groeps-logs voor technische details van afgehandelde errors.

## PWA
De app is voorbereid als PWA. Installeerbaar op mobiel via 'Voeg toe aan beginscherm'.
