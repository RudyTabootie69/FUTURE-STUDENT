import re
from datetime import datetime, timezone
import dateparser
import scrapy


DATE_KEYWORDS = [
    "orientation", "census", "fee", "fees", "payment",
    "enrol", "enrolment", "application", "closing", "close",
    "open day", "classes", "teaching", "exam", "results",
    "start", "commence", "commences",
]

JUNK_LINES = {
    "close",
    "feedback",
    "get started",
    "get started at uow!",
    "learning & teaching",
    "need to enrol? check out our",
    "for enrolment help.",
    "exams & results",
    "upcoming orientations",
    "faculty orientation day",
    "enrolment checklists",
    "learn more about census date >",
}

BAD_PATTERNS = [
    "we know",
    "we’re here",
    "we're here",
    "we can’t wait",
    "we can't wait",
    "get in touch",
    "contact our",
    "support, connection",
    "help you settle",
    "check out the information",
    "designed to help",
    "you’ll find out",
    "you'll find out",
]


def extract_date(text: str):
    parsed = dateparser.parse(
        text,
        settings={
            "PREFER_DATES_FROM": "future",
            "DATE_ORDER": "DMY",
        },
    )

    if parsed:
        return parsed.date().isoformat()

    return None

def extract_date_range(raw_date):
    parts = re.split(r"\s+–\s+|\s+-\s+", raw_date)

    if len(parts) != 2:
        return None, None

    start_raw = parts[0].strip()
    end_raw = parts[1].strip()

    end_date = extract_date(end_raw)

    if not end_date:
        return None, None

    end_year = end_date.split("-")[0]

    if len(start_raw.split()) == 2:
        start_raw = f"{start_raw} {end_year}"

    start_date = extract_date(start_raw)

    return start_date, end_date


def infer_event_type(text: str) -> str:
    t = text.lower()

    if "orientation" in t:
        return "orientation"
    if "census" in t:
        return "census_date"
    if "fee" in t or "payment" in t:
        return "fee_due"
    if "enrol" in t:
        return "enrolment_deadline"
    if "application" in t and ("close" in t or "closing" in t):
        return "application_close"
    if "application" in t and ("open" in t or "opening" in t):
        return "application_open"
    if "exam" in t:
        return "exam_period"
    if "teaching" in t or "classes" in t or "commence" in t:
        return "teaching_period"
    if "results" in t:
        return "results_release"

    return "other_key_date"


class BaseKeyDatesSpider(scrapy.Spider):
    provider_id = None
    provider_name = None
    source_label = "official_key_dates_page"

    custom_settings = {
        "DOWNLOAD_DELAY": 1,
        "CONCURRENT_REQUESTS_PER_DOMAIN": 1,
        "FEED_EXPORT_ENCODING": "utf-8",
    }

    def parse(self, response):
        page_text = response.css("body ::text").getall()
        seen = set()

        for line in page_text:
            line = " ".join(line.split())
            if not line:
                continue

            lower = line.lower()

            if not any(keyword in lower for keyword in DATE_KEYWORDS):
                continue

            if len(line) < 12:
                continue

            if lower in JUNK_LINES:
                continue

            if any(pattern in lower for pattern in BAD_PATTERNS):
                continue

            if line.endswith(" on"):
                continue

            if len(line.split()) > 25:
                continue

            # Drop generic navigation/heading lines with no date-like context
            if line.count(" ") < 2 and not re.search(r"\b(2025|2026|2027|2028)\b", line):
                continue

            # Drop long marketing paragraphs; these are not actual date rows
            if len(line) > 220:
                continue

            if line in seen:
                continue

            seen.add(line)

            event_date = extract_date(line)

            yield {
                "provider_id": self.provider_id,
                "provider_name": self.provider_name,
                "event_type": infer_event_type(line),
                "event_title": line[:180],
                "raw_text": line,
                "event_date": event_date,
                "event_end_date": None,
                "term": None,
                "year": self.extract_year(line),
                "audience": "all",
                "source_url": response.url,
                "source_label": self.source_label,
                "scraped_at": datetime.now(timezone.utc).isoformat(),
                "confidence": "parsed_date" if event_date else "raw_candidate",
            }

    def extract_year(self, text):
        match = re.search(r"\b(2025|2026|2027|2028)\b", text)
        return int(match.group(1)) if match else None
