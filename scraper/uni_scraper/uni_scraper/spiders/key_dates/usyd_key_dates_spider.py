from .key_dates_base import BaseKeyDatesSpider


class UsydKeyDatesSpider(BaseKeyDatesSpider):
    name = "usyd_key_dates"
    allowed_domains = ["sydney.edu.au"]
    provider_id = "USYD"
    provider_name = "University of Sydney"
    start_urls = [
        "https://www.sydney.edu.au/students/key-dates.html",
        "https://www.sydney.edu.au/students/census/find-your-census-date.html",
    ]
