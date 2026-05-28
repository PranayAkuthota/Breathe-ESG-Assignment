# TRADEOFFS.md

## Tradeoffs

### 1. No Full Authentication System

The prototype does not implement full authentication, RBAC, or tenant isolation.
* but sure I can implement if it is essential and if got more time
Reason:
The assignment prioritized ingestion, normalization, analyst review workflow, and auditability within a limited development timeline.

In a production system, analyst roles, reviewer permissions, and organization-level access control would be mandatory.

---

### 2. Simplified Suspicious Detection

The suspicious record logic currently uses lightweight rule-based checks.

Examples:

* unusually large quantities
* missing values
* inconsistent units

Reason:
The focus of the prototype was workflow and review infrastructure rather than advanced anomaly detection models.

A real deployment would likely include:

* statistical anomaly detection
* historical benchmarking
* supplier-specific thresholds
* ML-assisted review scoring

---

### 3. Limited Real-World Source Coverage

The system intentionally handles only a simplified subset of each source type.

Examples:

* simplified SAP flat-file export
* utility CSV export instead of PDF parsing
* simplified travel platform export

Reason:
Real enterprise ESG integrations are significantly more complex and highly organization-specific.

The prototype focuses on demonstrating:

* ingestion architecture
* normalization strategy
* review workflow
* source tracking

rather than exhaustive connector support.
