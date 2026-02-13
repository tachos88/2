# Firebase Backend – Schema-overzicht

Dit document beschrijft het Firestore- en Auth-schema voor de Flo8 leefstijlcoaching-app.  
**Principe:** `uid` (Firebase Auth UID) is de centrale sleutel; alle gebruikersdata zit onder `users/{uid}` of in subcollections daarvan.

---

## 1. Firebase Authentication

| Veld | Beschrijving |
|------|---------------|
| **uid** | Unieke gebruikers-ID (Firebase Auth). Gebruik deze overal als `userId`. |
| **email** | Ingelogd e-mailadres |
| **emailVerified** | Boolean |
| **displayName** | Optioneel; wordt gesynchroniseerd naar `users/{uid}.name` |

- **Auth methods:** Email/wachtwoord (en eventueel later Google/Apple).
- Na eerste login: **Firestore-trigger** of client-logica maakt document `users/{uid}` aan (zie hieronder).

---

## 2. Firestore – Hoofdoverzicht

```
📁 users/{uid}                    → Profiel & app-status (1 doc per user)
   📁 cardCompletions/{docId}     → Dagelijkse kaart-afrondingen
   📁 chatMessages/{docId}        → Chatgeschiedenis met AI
   📁 chatSessions/{sessionId}    → (optie) Sessies voor groeperen van berichten

📁 leads/{docId}                  → Contactformulier-inzendingen (marketing)

📁 content                         → Gedeelde content (alle users lezen)
   📁 dailyCards/{cardId}
   📁 knowledge/{itemId}
   📁 recipes/{recipeId}
   📁 exercises/{exerciseId}
```

---

## 3. Collecties in detail

### 3.1 `users/{uid}` (document)

Eén document per gebruiker. **Document-ID = Firebase Auth `uid`.**

| Veld | Type | Verplicht | Beschrijving |
|------|------|-----------|--------------|
| **id** | string | ✓ | Zelfde als `uid` (document-ID) |
| **email** | string | ✓ | E-mailadres |
| **name** | string | ✓ | Weergavenaam |
| **plan** | string | ✓ | `'none'` \| `'4w'` \| `'8w'` |
| **planActiveUntil** | string (ISO) |  | Einddatum abonnement |
| **onboardingComplete** | boolean | ✓ | Onboarding afgerond |
| **goals** | string[] | ✓ | Gebruikersdoelen |
| **baseline** | map | ✓ | `{ sleep, stress, movement, nutrition, energy }` (numbers) |
| **mobilityLimited** | boolean | ✓ | Beperkte mobiliteit |
| **notificationTime** | string | ✓ | Bijv. `"08:00"` |
| **theme** | string | ✓ | `'light'` \| `'dark'` |
| **streak** | number | ✓ | Dagen-streak |
| **createdAt** | string (ISO) | ✓ | Aanmaakdatum |
| **updatedAt** | string (ISO) | ✓ | Laatste wijziging |

**Security:** Alleen `request.auth.uid == uid` mag lezen/schrijven.

---

### 3.2 `users/{uid}/cardCompletions/{completionId}` (subcollection)

Afrondingen van dagelijkse kaarten per gebruiker.

| Veld | Type | Verplicht | Beschrijving |
|------|------|-----------|--------------|
| **uid** | string | ✓ | Gebruiker (zelfde als parent `uid`) |
| **date** | string | ✓ | `YYYY-MM-DD` |
| **cardId** | string | ✓ | Verwijzing naar `content/dailyCards/{cardId}` |
| **value** | any | ✓ | Slider/check/text-waarde |
| **reflection** | string |  | Vrije reflectie |
| **createdAt** | string (ISO) | ✓ | Tijdstip van opslaan |

**Queries:** Bijv. “completions voor `uid` waar `date == '2025-02-13'`”.  
**Security:** Alleen eigen `uid` mag lezen/schrijven.

---

### 3.3 `users/{uid}/chatMessages/{messageId}` (subcollection)

Chatberichten met de AI-coach (persoonlijke geschiedenis).

| Veld | Type | Verplicht | Beschrijving |
|------|------|-----------|--------------|
| **role** | string | ✓ | `'user'` \| `'model'` |
| **text** | string | ✓ | Inhoud bericht |
| **timestamp** | string (ISO) | ✓ | Tijdstip |

Optioneel: **sessionId** als je later op “sessies” wilt filteren; dan ook `users/{uid}/chatSessions/{sessionId}` met o.a. `createdAt`, `title`.

**Security:** Alleen eigen `uid` mag lezen/schrijven.

---

### 3.4 `leads/{leadId}` (top-level collectie)

Inzendingen van het marketing/contactformulier.

| Veld | Type | Verplicht | Beschrijving |
|------|------|-----------|--------------|
| **name** | string | ✓ | Naam |
| **email** | string | ✓ | E-mail |
| **message** | string | ✓ | Bericht |
| **createdAt** | string (ISO) | ✓ | Tijdstip inzending |
| **source** | string |  | Bijv. `'contact'`, `'pricing'` |

**Security:** Iedereen (of alleen niet-ingelogde) mag **schrijven**; alleen admin (bijv. via Custom Claims of Firestore Admin) mag **lezen**.

---

### 3.5 Content-collecties (gedeelde content)

Deze worden door alle ingelogde gebruikers gelezen; schrijven alleen via admin/backend.

- **content/dailyCards/{cardId}**  
  Velden: `id`, `title`, `body`, `category`, `mobilityFriendly`, `actionType`, `actionLabel`, `minLabel`, `maxLabel` (zoals in `DailyCard`).

- **content/knowledge/{itemId}**  
  Velden: `id`, `title`, `category`, `content`, `tags[]`, `imageUrl` (zoals in `KnowledgeItem`).

- **content/recipes/{recipeId}**  
  Velden: `id`, `title`, `timeMinutes`, `kcal`, `protein`, `fiber`, `ingredients[]`, `steps[]`, `imageUrl` (zoals in `Recipe`).

- **content/exercises/{exerciseId}**  
  Velden: `id`, `title`, `type`, `durationMinutes`, `level`, `mobilityFriendly`, `videoUrl`, `instructions` (zoals in `Exercise`).

**Security:** `get` voor iedereen die is ingelogd; `create/update/delete` alleen voor admin/backend.

---

## 4. Relatieschema (visueel)

```
                    Firebase Auth
                         │
                         ▼ uid
┌─────────────────────────────────────────────────────────────┐
│  users / {uid}                                              │
│  (profiel, plan, onboarding, baseline, streak, theme …)     │
└─────────────────────────────────────────────────────────────┘
    │
    ├── cardCompletions / {id}   ──► date, cardId, value, reflection
    │
    └── chatMessages / {id}      ──► role, text, timestamp

┌─────────────────────────────────────────────────────────────┐
│  leads / {id}   (contactformulier)                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  content / dailyCards / {id}                                │
│  content / knowledge / {id}                                 │
│  content / recipes / {id}                                    │
│  content / exercises / {id}                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Aanbevolen gebruik in code

- **Pad-helper:** Gebruik constante paden, bijv. `usersPath(uid)`, `userCardCompletionsPath(uid)`, `contentDailyCardsPath()` (zie `config/firebaseSchema.ts`).
- **Users-document:** Bij eerste login (na `signInWithEmailAndPassword` of na accountaanmaak) een `setDoc(doc(db, 'users', uid), { ...profile })` met merge, zodat bestaande velden behouden blijven.
- **Completions:** `addDoc(collection(db, 'users', uid, 'cardCompletions'), { ... })` zodat Firestore automatisch een ID genereert.
- **Leads:** `addDoc(collection(db, 'leads'), { name, email, message, createdAt: new Date().toISOString() })`.

Als je wilt, kan ik daarna de concrete Firestore Security Rules en de `firebaseSchema.ts` (paden + types) uitwerken in de repo.
