from .key_dates_base import BaseKeyDatesSpider


class UowKeyDatesSpider(BaseKeyDatesSpider):
    name = "uow_key_dates"
    allowed_domains = ["uow.edu.au"]
    provider_id = "UOW"
    provider_name = "University of Wollongong"
    start_urls = [
        "https://www.uow.edu.au/student/dates/",
        "https://www.uow.edu.au/student/get-started/orientation/",
    ]
