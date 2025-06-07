# MoodTrack Pro API Documentation

## Authentication

- **Register:** `POST /api/auth/register`
  - body: `{ email, password, name }`
  - response: `{ token, user }`
- **Login:** `POST /api/auth/login`
  - body: `{ email, password }`
  - response: `{ token, user }`
- **Google OAuth:** `POST /api/auth/oauth/google`
  - Use Firebase/Auth0 (handled client-side), server endpoint is stub only.

## Journal Entries

- **Create:** `POST /api/journal/`
  - Auth required, body: `{ content, aiSentiment?, aiScores? }`
- **List:** `GET /api/journal/`
  - Returns journal array
- **Update:** `PUT /api/journal/:id`
- **Delete:** `DELETE /api/journal/:id`

## Mood Log

- **Create:** `POST /api/mood/`
  - Auth required, body: `{ emoji, score, note }`
- **List:** `GET /api/mood/`
  - Returns array of daily moods
- **Update:** `PUT /api/mood/:id`
- **Delete:** `DELETE /api/mood/:id`

## AI Analysis

- **Analyze Journal:** `POST /api/ai/analyze`
  - body: `{ content }`
  - response: `{ aiSentiment, aiScores }`

## Export

- **Export CSV:** `GET /api/export/csv` (auth)
- **Export PDF:** `GET /api/export/pdf` (not implemented)

## Premium

- **Analytics:** `GET /api/premium/analytics`
- **Calendar Sync:** `POST /api/premium/calendar-sync`
- **Cloud Backup:** `POST /api/premium/cloud-backup`

All premium routes require authentication and premium role.

## User

- **Get Own Profile:** `GET /api/users/me`
- **Update Own Profile:** `PUT /api/users/me`
- **Set Premium (admin):** `POST /api/users/set-premium/:userId`

---

### Error Responses

All error responses use `{ error: <string> }`.

---

### Auth

All endpoints except `/auth/*` require:
- Header: `Authorization: Bearer <jwt token>`

---

### Example JWT

Returned by register/login:
```json
{
  "token": "jwt-string",
  "user": { "email": "me@email.com", "role": "premium" }
}
```

---

### Roles

- `"free"`: Basic mood, journals, basic AI.
- `"premium"`: Extra analytics, export, backup, calendar integration.
- `"admin"`: Can upgrade users.

---

### Example Create Mood

`POST /api/mood/`
```json
{
  "emoji": "😊",
  "score": 8,
  "note": "Good day."
}
```

---

### Example Analyze Journal

`POST /api/ai/analyze`
```json
{
  "content": "I felt very anxious today but ended the evening calm."
}
```
Response:
```json
{
  "aiSentiment": "anxious",
  "aiScores": { "anxious": 70, "calm": 30 }
}
```
