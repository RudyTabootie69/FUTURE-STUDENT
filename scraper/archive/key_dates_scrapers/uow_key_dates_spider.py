from .key_dates_base import (
    BaseKeyDatesSpider,
    infer_event_type,
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
        "https://www.uow.edu.au/student/get-started/orientation/",
    ]

    def parse(self, response):
        seen = set()

        for row in response.css("table tr"):
            cols = [
                x.strip()
                for x in row.css("td ::text").getall()
                if x.strip()
            ]

            if len(cols) < 2:
                continue

            title = cols[0]
            raw_date = " ".join(cols[1:])

            if title.lower() == "activity" and raw_date.lower() == "date":
                continue

            key = (title, raw_date)
            if key in seen:
                continue
            seen.add(key)

            start_date, end_date = extract_date_range(raw_date)

            parsed_date = start_date or extract_date(raw_date)

            yield {
                "provider_id": self.provider_id,
                "provider_name": self.provider_name,
                "event_type": infer_event_type(title),
                "event_title": title,
                "raw_date": raw_date,
                "event_date": parsed_date,
                "event_end_date": end_date,
                "source_url": response.url,
                "confidence": "parsed_date" if parsed_date else "raw_date",
            }