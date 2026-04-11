import scrapy
import math


class UacDiscoverySpider(scrapy.Spider):
    name = "uac_discovery"
    allowed_domains = ["coursehub.uac.edu.au"]

    BASE_URL = (
        "https://coursehub.uac.edu.au/backend/course-search/api/search/undergraduate"
    )
    PAGE_SIZE = 50

    def start_requests(self):
        url = (
            f"{self.BASE_URL}"
            f"?page=1&size={self.PAGE_SIZE}&sort=relevance&content=false"
        )
        yield scrapy.Request(url, callback=self.parse_first_page)

    def parse_first_page(self, response):
        data = response.json()

        total = data["stats"]["total"]
        total_pages = math.ceil(total / self.PAGE_SIZE)

        yield from self.parse_results(data)

        for page in range(2, total_pages + 1):
            url = (
                f"{self.BASE_URL}"
                f"?page={page}&size={self.PAGE_SIZE}&sort=relevance&content=false"
            )
            yield scrapy.Request(url, callback=self.parse_page)

    def parse_page(self, response):
        data = response.json()
        yield from self.parse_results(data)

    def parse_results(self, data):
        for course in data.get("results", []):
            yield {
                "course_code": course.get("courseCode"),
                "title": course.get("title"),
                "provider_id": course.get("providerId"),
                "provider_url": course.get("providerUrl"),
                "campus_code": course.get("campusCode"),
                "mode_of_attendance": course.get("modeOfAttendance"),
                "duration": course.get("duration"),
                "offerings": course.get("offerings"),
            }
