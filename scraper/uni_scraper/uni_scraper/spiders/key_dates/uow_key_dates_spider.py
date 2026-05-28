import re
from datetime import datetime, timezone

from .key_dates_base import (
    BaseKeyDatesSpider,
    clean_title,
    extract_date,
    extract_date_range,
)

class UowKeyDatesSpider(BaseKeyDatesSpider):
    name = "uow_key_dates"
    allowed_domains = ["uow.edu.au"]

    provider_id = "UOW"
    provider_name = "University of Wollongong"

    start_urls = [
        "https://www.uow.edu.au/student/dates/",
    ]

    def clean(self, values):
        text = " ".join(v.strip() for v in values if v.strip())
        return re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()

    def parse(self, response):
        seen = set()

        for row in response.css("table tr"):
            cells = row.css("td")

            if len(cells) < 2:
                continue

            title = self.clean(cells[0].css("::text").getall())
            raw_date = self.clean(cells[1].css("::text").getall())

            if not title or not raw_date:
                continue

            if title.lower() == "activity" or raw_date.lower() == "date":
                continue

            start_date, end_date = extract_date_range(raw_date)

            if not start_date:
                start_date = extract_date(raw_date)

            if not start_date:
                continue

            key = (
                clean_title(title).lower(),
                start_date,
                end_date,
            )

            if key in seen:
                continue

            seen.add(key)

            yield {
                "provider_id": self.provider_id,
                "provider_name": self.provider_name,
                "event_title": clean_title(title),
                "raw_date": raw_date,
                "event_date": start_date,
                "event_end_date": end_date,
                "source_url": response.url,
                "scraped_at": datetime.now(timezone.utc).isoformat(),
            }