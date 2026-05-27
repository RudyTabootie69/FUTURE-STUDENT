from .key_dates_base import BaseKeyDatesSpider


class WsuKeyDatesSpider(BaseKeyDatesSpider):
    name = "wsu_key_dates"
    allowed_domains = ["westernsydney.edu.au"]
    provider_id = "WS"
    provider_name = "Western Sydney University"
    start_urls = [
        "https://www.westernsydney.edu.au/students/dates",
        "https://www.westernsydney.edu.au/students/dates/2026-academic-year-dateline",
        "https://www.westernsydney.edu.au/students/dates/dates/census-dates",
    ]
