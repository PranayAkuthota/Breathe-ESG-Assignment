# SOURCES.md

## Source Research

The assignment emphasized handling realistic enterprise ESG data rather than toy examples. Before designing the ingestion flow, research was done into how each source category typically exposes operational data in production environments.

---

# 1. SAP Fuel / Procurement Data

## Research

SAP exports commonly appear as:

* flat CSV exports
* IDoc structures
* OData services
* BAPI-based integrations

For the prototype, a simplified flat-file CSV export was chosen because:

* it is realistic for enterprise analyst workflows
* sustainability teams frequently work from exported operational reports
* CSV ingestion simplified rapid prototyping

Research also showed that SAP exports often contain:

* inconsistent units
* cryptic plant codes
* region-specific formatting
* inconsistent date formats
* multilingual column headers

The prototype intentionally simulates inconsistent quantity and unit handling.

## Example Sample Data

```csv
Fuel,Qty,Unit
Diesel,500,liters
Petrol,300,liters
Natural Gas,700,liters
Coal,1500,kg
```

---

# 2. Utility Electricity Data

## Research

Facilities teams commonly retrieve electricity data through:

* utility portal CSV exports
* PDF invoices
* meter APIs
* internal energy tracking systems

The prototype uses CSV portal exports because:

* it represents a realistic analyst workflow
* avoids spending most implementation time on PDF parsing
* allows focus on normalization and review workflows

Research showed that utility exports typically include:

* billing periods
* meter identifiers
* tariff information
* usage units (kWh, MWh)
* inconsistent reporting intervals

The prototype currently handles only simplified usage ingestion.

## Example Sample Data

```csv
Source,Usage,Unit
Office Grid,1200,kWh
Factory Grid,4500,kWh
Solar Plant,800,kWh
Wind Turbine,1500,kWh
```

---

# 3. Corporate Travel Data

## Research

Travel platforms such as:

* SAP Concur
* Navan
* Egencia

typically expose:

* flight bookings
* hotel stays
* rail travel
* taxi usage
* airport codes
* travel classes

The prototype models simplified travel exports through CSV ingestion.

Research showed that real-world travel datasets often lack:

* direct distance values
* emissions calculations
* consistent transport categorization

The prototype simplifies this into normalized travel activity records.

## Example Sample Data

```csv
Employee,Mode,Distance,Unit
John Doe,Flight,1200,km
Sarah Lee,Train,350,km
Mike Ross,Bus,120,km
Emma Stone,Taxi,45,km
```

---

# Real-World Limitations

The current prototype intentionally avoids:

* PDF OCR extraction
* direct SAP API integration
* utility authentication flows
* airport-to-distance calculations
* automated emissions factor mapping

These would significantly increase implementation complexity beyond the prototype scope.

The focus instead was:

* ingestion architecture
* normalization logic
* source traceability
* analyst review workflow
* audit readiness
