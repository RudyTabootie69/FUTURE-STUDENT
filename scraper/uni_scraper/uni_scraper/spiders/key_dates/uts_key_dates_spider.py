from .key_dates_base import BaseKeyDatesSpider


class UtsKeyDatesSpider(BaseKeyDatesSpider):
    name = "uts_key_dates"
    allowed_domains = ["uts.edu.au"]
    provider_id = "UTS"
    provider_name = "University of Technology Sydney"
    start_urls = [
        "https://www.uts.edu.au/for-students/current-students/managing-your-course/important-dates",
        "https://www.uts.edu.au/for-students/current-students/managing-your-course/important-dates/academic-year-dates/2026-academic-year-dates",
        "https://www.uts.edu.au/for-students/current-students/managing-your-course/important-dates/principal-dates/2026-principal-dates",
    ]
