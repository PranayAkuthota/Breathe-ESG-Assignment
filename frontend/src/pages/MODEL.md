# MODEL.md

## Overview

The system is designed to ingest ESG-related operational data from multiple enterprise sources, normalize it into a consistent structure, and support analyst review before records are finalized for audit purposes.

The focus of the prototype is not carbon calculation itself, but handling inconsistent source data and creating a review workflow around it.

The current prototype supports three conceptual source categories:

- Fuel / procurement data
- Electricity usage data
- Corporate travel data

All ingested records follow the same internal review lifecycle.

---

# Core Models

## Company

Represents a tenant organization using the platform.

Fields:
- name

Why:
The assignment mentioned multi-tenancy. In a real deployment, multiple companies would upload and review their own ESG datasets independently.

---

## DataSource

Represents where a record originated from.

Fields:
- company
- source_type
- uploaded_at

Examples:
- SAP export
- Utility portal CSV
- Travel platform export

Why:
This enables source-of-truth tracking and auditability. Analysts should always know where a record came from.

---

## EmissionRecord

Central model representing a normalized ESG activity row.

Fields:
- source
- raw_data
- normalized_data
- status
- suspicious
- created_at

Why:
The assignment emphasized inconsistent real-world inputs. Instead of forcing every source into rigid columns immediately, the system stores:

- raw_data:
Original uploaded row exactly as received.

- normalized_data:
Cleaned and standardized representation used internally.

This approach preserves traceability while allowing flexible ingestion from different source formats.

---

# Normalization Strategy

Different uploads may use:
- inconsistent units
- different column names
- missing fields
- source-specific terminology

The normalization step converts these variations into a predictable internal structure.

Example:

Raw:
{
  "Fuel":"Diesel",
  "Qty":"500"
}

Normalized:
{
  "fuel":"Diesel",
  "quantity":500,
  "unit":"liters"
}

This makes downstream review and analytics simpler.

---

# Review Workflow

Each record moves through a lightweight analyst workflow.

Statuses:
- PENDING
- FLAGGED
- LOCKED

Meaning:
- PENDING:
Awaiting analyst review.

- FLAGGED:
Potentially suspicious or abnormal values.

- LOCKED:
Approved and finalized for audit purposes.

Once locked, records cannot be modified again.

---

# Suspicious Record Detection

The prototype includes simple rule-based anomaly detection.

Examples:
- unusually high fuel quantity
- invalid units
- missing values

The goal is not ML-based anomaly detection, but helping analysts identify rows needing attention.

---

# Audit Logging

A separate Log model tracks important workflow transitions.

Tracked information:
- record
- previous status
- new status
- action timestamp

This creates a lightweight audit trail explaining:
- what changed
- when it changed
- how records became finalized

---

# Why JSON Storage Was Chosen

The prototype intentionally uses JSON fields for raw and normalized data.

Reason:
The three source categories have very different schemas.

Examples:
- fuel quantity
- electricity meter readings
- travel routes

Using JSON allows flexible ingestion without prematurely overfitting the schema to one source type.

In a larger production system, this would likely evolve into more structured domain-specific models.

---

# Scope Categorization

The prototype architecture is compatible with:
- Scope 1 (fuel combustion)
- Scope 2 (electricity)
- Scope 3 (travel/procurement)

The current implementation focuses mainly on ingestion and review workflows rather than detailed emissions calculations.