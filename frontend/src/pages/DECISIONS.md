# Design Decisions

- Used React for frontend dashboard UI
- Used Django REST Framework for APIs
- Used SQLite for simplicity
- Stored normalized ESG data in JSON format
- Added suspicious detection based on quantity values

# Database Choice

SQLite was used for the prototype because the assignment emphasized rapid delivery, ingestion workflows, normalization logic, and analyst review functionality within a short timeline.

Using SQLite reduced infrastructure setup complexity and allowed faster iteration during development.

The backend was implemented using Django ORM, so the application can be migrated to PostgreSQL later with minimal code changes.

For production deployment, PostgreSQL would be preferred because of:
- better concurrency handling
- stronger scalability
- improved transactional guarantees
- better support for large multi-tenant workloads