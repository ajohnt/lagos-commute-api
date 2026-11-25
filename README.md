# 🚌 Lagos Commute API - Lagos Fare Finder

A full-stack web app that helps Lagos commuters find bus routes, compare fares, and see the cheapest and fastest way to travel across Lagos.

**Live Demo:** https://lagos-commute-api.onrender.com
**Admin Panel:** https://lagos-commute-api.onrender.com/admin.html
**GitHub:** https://github.com/ajohnt/lagos-commute-api

## Features
- Search routes by From / To (e.g. Ikeja to Yaba)
- Compare Cheapest vs Fastest route
- View all routes
- Admin panel to Add / Delete routes (JWT protected)
- Telegram alerts when a route is added or deleted
- User authentication with JWT
- Saved routes, fare reports, and external routes

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT (JSON Web Token) + bcrypt
- **Frontend:** HTML, CSS, JavaScript (in `public/`)
- **Notifications:** Telegram Bot API
- **Deployment:** Render + GitHub

## API Endpoints

### Auth
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Routes
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/routes` | Get all routes |
| GET | `/api/routes/search?from=Ikeja&to=Yaba` | Search routes |
| GET | `/api/routes/compare?from=Ikeja&to=Yaba` | Compare cheapest vs fastest |
| POST | `/api/routes` | Add route (Admin only) |
| DELETE | `/api/routes/:id` | Delete route (Admin only) |

### Other
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/saved-routes` | Saved routes |
| POST | `/api/reports` | Report a fare issue |
| GET | `/api/external` | External routes |
| POST | `/api/telegram` | Telegram webhook |

## How to Run Locally
```bash
git clone https://github.com/ajohnt/lagos-commute-api.git
cd lagos-commute-api
npm install