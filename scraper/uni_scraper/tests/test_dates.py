import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from uni_scraper.spiders.key_dates.key_dates_base import (
    extract_date,
    extract_date_range,
)


def test_single_date():
    assert extract_date("14 Dec 2026") == "2026-12-14"


def test_same_year_range():
    start, end = extract_date_range("20 Apr – 24 Apr 2026")

    assert start == "2026-04-20"
    assert end == "2026-04-24"


def test_cross_year_range():
    start, end = extract_date_range("21 Dec – 01 Jan 2026")

    assert start == "2026-12-21"
    assert end == "2027-01-01"


def test_invalid_date():
    start, end = extract_date_range("random nonsense")

    assert start is None
    assert end is None


def test_hyphen_range():
    start, end = extract_date_range("01 Mar - 03 Mar 2028")

    assert start == "2028-03-01"
    assert end == "2028-03-03"