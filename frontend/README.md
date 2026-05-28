# ESG Sustainability Dashboard

A dashboard for reviewing sustainability and ESG records.

## Features

- Upload CSV files
- Fuel, Electricity, Travel categories
- Suspicious record detection
- Approval workflow
- Search and filters
- Dashboard metrics

## Tech Stack

Frontend:
- React
- Vite
- Axios

Backend:
- Django
- Django REST Framework
- SQLite

## Run Project

Frontend:
npm run dev

Backend:
python manage.py runserver


# Project Structure

```text
ESG/
│
├── backend/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   │
│   ├── backend/                # Django project configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   └── api/                    # Core ESG review application
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── urls.py
│       ├── admin.py
│       └── migrations/
│
├── frontend/
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   └── src/
│       │
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       │
│       ├── assets/
│       │   ├── hero.png
│       │   ├── react.svg
│       │   └── vite.svg
│       │
│       └── pages/
│           ├── Dashboard.jsx
│           ├── MODEL.md
│           ├── DECISIONS.md
│           ├── SOURCES.md
│           ├── TRADEOFFS.md
│           └── README.md
│
├── .gitignore
└── README.md
```

# Architecture Overview

## Frontend

* Built using React + Vite
* Provides ESG review dashboard UI
* Supports:

  * CSV upload
  * Record review
  * Status filtering
  * Search functionality
  * Suspicious record highlighting

## Backend

* Built using Django + Django REST Framework
* Handles:

  * ESG data ingestion
  * Data normalization
  * Review workflow
  * Audit logging
  * REST APIs

## Documentation Files

The project also includes architecture and decision documentation:

* MODEL.md → explains core data models
* DECISIONS.md → important implementation decisions
* SOURCES.md → supported ESG source categories
* TRADEOFFS.md → limitations and future improvements

These documents were added to clearly communicate system thinking and engineering decisions during the assignment.
