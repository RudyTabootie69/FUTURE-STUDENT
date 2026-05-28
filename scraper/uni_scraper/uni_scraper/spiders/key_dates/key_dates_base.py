import re
from datetime import datetime

import scrapy
import dateparser


def clean_text(text):
    return re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()


def clean_title(title):
    title = clean_text(title)

    title = re.sub(r"Fees due.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"Fees Due.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"Fail grade recorded.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"Last date to withdraw.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"Last day to withdraw.*without paying.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"HECS / FEE HELP.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"Learn more about Census date.*", "", title, flags=re.IGNORECASE)

    return clean_text(title)

def extract_date(text):
    if not text:
        return None

    text = clean_text(text)

    parsed = dateparser.parse(
        text,
        settings={
            "DATE_ORDER": "DMY",
            "PREFER_DATES_FROM": "future",
        },
    )

    if parsed:
        return parsed.date().isoformat()

    return None


def extract_date_range(raw_date):
    raw_date = clean_text(raw_date)
    raw_date = raw_date.replace("–", "-")

    parts = re.split(r"\s*-\s*", raw_date)

    if len(parts) != 2:
        single_date = extract_date(raw_date)
        return single_date, None

    start_raw = parts[0].strip()
    end_raw = parts[1].strip()

    end_date = extract_date(end_raw)
    if not end_date:
        return None, None

    end_dt = datetime.fromisoformat(end_date)
    end_month = end_dt.strftime("%b")
    end_year = end_dt.year

    # Handles: 02 – 04 Feb 2026
    if re.fullmatch(r"\d{1,2}", start_raw):
        start_raw = f"{start_raw} {end_month} {end_year}"

    # Handles: 20 Apr – 24 Apr 2026
    elif re.fullmatch(r"\d{1,2}\s+[A-Za-z]+", start_raw):
        start_raw = f"{start_raw} {end_year}"

    start_date = extract_date(start_raw)

    if start_date and end_date and end_date < start_date:
        end_dt = datetime.fromisoformat(end_date)
        end_date = end_dt.replace(year=end_dt.year + 1).date().isoformat()

    return start_date, end_date

class BaseKeyDatesSpider(scrapy.Spider):
    pass