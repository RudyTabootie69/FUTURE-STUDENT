import math
import scrapy


class UacFullPipelineSpider(scrapy.Spider):
    name = "uac_full_pipeline"
    allowed_domains = ["coursehub.uac.edu.au"]

    SEARCH_URL = "https://coursehub.uac.edu.au/backend/course-search/api/search/undergraduate"
    DETAILS_URL = "https://coursehub.uac.edu.au/backend/course-search/api/details/undergraduate/course/{course_id}"

    PAGE_SIZE = 50

    def start_requests(self):
        url = f"{self.SEARCH_URL}?page=1&size={self.PAGE_SIZE}&sort=relevance&content=false"
        yield scrapy.Request(url, callback=self.parse_search_first)

    def parse_search_first(self, response):
        data = response.json()
        total = data["stats"]["total"]
        total_pages = math.ceil(total / self.PAGE_SIZE)

        yield from self.parse_search_results(data)

        for page in range(2, total_pages + 1):
            url = f"{self.SEARCH_URL}?page={page}&size={self.PAGE_SIZE}&sort=relevance&content=false"
            yield scrapy.Request(url, callback=self.parse_search_page)

    def parse_search_page(self, response):
        data = response.json()
        yield from self.parse_search_results(data)

    def parse_search_results(self, data):
        for course in data.get("results", []):
            course_id = course.get("courseUrl") or course.get("courseCode")

            if not course_id:
                continue

            details_url = self.DETAILS_URL.format(course_id=course_id)

            yield scrapy.Request(
                details_url,
                callback=self.parse_course_details,
                errback=self.details_failed,
                meta={
                    "course_id": course_id,
                    "summary": course,
                },
            )

    def parse_course_details(self, response):
        yield {
            "course_id": response.meta["course_id"],
            "summary": response.meta["summary"],
            "details": response.json(),
            "details_status": response.status,
        }

    def details_failed(self, failure):
        response = getattr(failure.value, "response", None)
        yield {
            "course_id": response.meta.get("course_id") if response else None,
            "summary": response.meta.get("summary") if response else None,
            "details": None,
            "details_status": getattr(response, "status", None),
            "details_error": failure.getErrorMessage(),
        }
