UAC Scraper Output – Data Package

This package contains two types of data:

1. Flat Output (Quick Use)
- uac_courses_flat.csv
- uac_courses_flat.jl

Contains one row per course variant.
Useful for quick filtering and frontend use.

---

2. Hybrid Output (Recommended for Database)

- uac_variants.jl
  → 2718 rows (each course variant)

- uac_details.jl
  → 1719 rows (shared detailed course data)

- uac_variant_offerings.jl
  → 9542 rows (start months / offerings)

Structure:
- Multiple variants map to one detail record
- Offerings map to variants

This model avoids duplication and is better for DB design.

---

Notes:
- Data is sourced from UAC Course API
- Hybrid model is recommended for backend/database
