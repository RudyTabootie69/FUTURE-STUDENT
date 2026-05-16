from .key_dates_base import BaseKeyDatesSpider


class UnswKeyDatesSpider(BaseKeyDatesSpider):
    name = "unsw_key_dates"
    allowed_domains = ["unsw.edu.au"]
    provider_id = "UNSW"
    provider_name = "UNSW Sydney"
    start_urls = [
        "https://www.unsw.edu.au/student/managing-your-studies/key-dates",
        "https://www.unsw.edu.au/student/managing-your-studies/key-dates/academic-calendar",
        "https://www.unsw.edu.au/student/getting-started/orientation",
    ]
