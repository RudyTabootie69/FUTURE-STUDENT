from datetime import datetime, timezone

from .key_dates_base import (
    BaseKeyDatesSpider,
    extract_date,
    extract_date_range,
    infer_event_type,
)


class UnswKeyDatesSpider(BaseKeyDatesSpider):

    name = "unsw_key_dates"

    allowed_domains = ["unsw.edu.au"]

    provider_id = "UNSW"

    provider_name = "UNSW Sydney"

    start_urls = [
        "https://www.unsw.edu.au/student/managing-your-studies/key-dates/academic-calendar",
    ]

    def parse(self, response):

        for table in response.css("table"):

            for row in table.css("tr")[1:]:

                cols = [
                    c.strip().replace("\xa0", " ")
                    for c in row.css("td ::text").getall()
                    if c.strip()
                ]

                if len(cols) < 2:
                    continue

                title = cols[0]
                raw_date = cols[1]

                start_date, end_date = extract_date_range(raw_date)

                if not start_date:
                    start_date = extract_date(raw_date)

                event_year = None

                if start_date:
                    event_year = int(start_date[:4])

                if event_year not in [2026, 2027, 2028]:
                    continue

                yield {
                    "provider_id": self.provider_id,
                    "provider_name": self.provider_name,
                    "year": event_year,
                    "event_type": infer_event_type(title),
                    "event_title": title,
                    "raw_date": raw_date,
                    "event_date": start_date,
                    "event_end_date": end_date,
                    "source_url": response.url,
                    "confidence": "parsed_date" if start_date else "raw_date",
                    "scraped_at": datetime.now(timezone.utc).isoformat(),
                }