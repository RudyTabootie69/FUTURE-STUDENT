import json
from datetime import datetime, timezone

from .key_dates_base import BaseKeyDatesSpider, infer_event_type


class UsydKeyDatesSpider(BaseKeyDatesSpider):
    name = "usyd_key_dates"
    allowed_domains = ["sydney.edu.au"]
    provider_id = "USYD"
    provider_name = "University of Sydney"

    start_urls = [
        "https://www.sydney.edu.au/content/dam/students/files/university-calendar/combined.json",
    ]

    allowed_years = {2026, 2027, 2028}

    def parse(self, response):
        data = json.loads(response.text)

        for obj in data:
            key = next(iter(obj))
            item = obj[key]

            year_raw = item.get("year")
            start_date = item.get("startDate")
            end_date = item.get("endDate")

            if not year_raw or not start_date:
                continue

            year = int(year_raw)

            if year not in self.allowed_years:
                continue

            title = item.get("title") or item.get("name") or key
            desc = item.get("desc") or ""
            tags = item.get("tags") or []

            event_title = title.strip()
            raw_date = start_date if not end_date else f"{start_date} – {end_date}"

            yield {
                "provider_id": self.provider_id,
                "provider_name": self.provider_name,
                "year": year,
                "event_type": infer_event_type(f"{event_title} {desc} {' '.join(tags)}"),
                "event_title": event_title,
                "raw_date": raw_date,
                "event_date": start_date,
                "event_end_date": end_date,
                "term": item.get("code"),
                "source_url": response.url,
                "confidence": "parsed_date",
                "scraped_at": datetime.now(timezone.utc).isoformat(),
            }