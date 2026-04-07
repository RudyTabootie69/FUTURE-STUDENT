import json
import csv
import re
from html import unescape

INFILE = "uac_full_pipeline_fixed.jl"
OUTCSV = "tools/out/uac_courses_flat.csv"
OUTJSONL = "tools/out/uac_courses_flat.jl"

TAG_RE = re.compile(r"<[^>]+>")

def strip_html(s: str) -> str:
    if not s:
        return ""
    s = unescape(s)
    s = TAG_RE.sub(" ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def get(dct, *path, default=None):
    cur = dct
    for p in path:
        if not isinstance(cur, dict) or p not in cur:
            return default
        cur = cur[p]
    return cur

rows = []
with open(INFILE, "r", encoding="utf-8") as f:
    for line in f:
        item = json.loads(line)

        course_id = item.get("course_id")
        summary = item.get("summary") or {}
        details = item.get("details") or {}

        # if 404 captured, details may be empty or include an error marker depending on your errback
        course_doc = details.get("courseDoc") if isinstance(details, dict) else None
        marketing = (course_doc or {}).get("marketingContent", {}) if isinstance(course_doc, dict) else {}

        title = summary.get("title") or get(course_doc or {}, "title", default="")
        provider_id = summary.get("providerId") or get(course_doc or {}, "providerId", default="")
        provider_name = summary.get("providerName") or get(course_doc or {}, "providerName", default="")
        campus_code = summary.get("campusCode", "")
        campus_location = summary.get("campusLocation", "")
        fee_type = summary.get("feeType", "")
        mode = ",".join(summary.get("modeOfAttendance", []) or [])
        duration = ",".join(summary.get("duration", []) or [])
        start_months = ",".join(summary.get("startMonths", []) or [])

        atar_med = get(summary, "atarProfile", "AtarProfiles", default=None)
        # atarProfile can be null; if present it’s a list with one dict usually
        if isinstance(atar_med, list) and atar_med:
            atar_low = atar_med[0].get("lowestAtar", "")
            atar_mid = atar_med[0].get("medianAtar", "")
            atar_high = atar_med[0].get("highestAtar", "")
            atar_year = atar_med[0].get("year", "")
        else:
            atar_low = atar_mid = atar_high = atar_year = ""

        about = strip_html(marketing.get("aboutIntro", ""))
        essential = strip_html(marketing.get("essential", ""))
        admission = strip_html(marketing.get("admissionCriteria", ""))

        further_url = get(marketing, "furtherInfo", "url", default="")

        row = {
            "course_id": course_id,
            "title": title,
            "provider_id": provider_id,
            "provider_name": provider_name,
            "campus_code": campus_code,
            "campus_location": campus_location,
            "fee_type": fee_type,
            "mode_of_attendance": mode,
            "duration": duration,
            "start_months": start_months,
            "atar_year": atar_year,
            "atar_low": atar_low,
            "atar_median": atar_mid,
            "atar_high": atar_high,
            "further_info_url": further_url,
            "about": about,
            "essential": essential,
            "admission_criteria": admission,
            "has_details": bool(course_doc),
        }
        rows.append(row)

# write jsonl
with open(OUTJSONL, "w", encoding="utf-8") as f:
    for r in rows:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

# write csv
fieldnames = list(rows[0].keys()) if rows else []
with open(OUTCSV, "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames)
    w.writeheader()
    w.writerows(rows)

print("rows:", len(rows))
print("csv:", OUTCSV)
print("jsonl:", OUTJSONL)
print("missing_details:", sum(1 for r in rows if not r["has_details"]))
