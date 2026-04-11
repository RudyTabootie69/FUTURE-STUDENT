import json
import scrapy


class UacApiCourseSpider(scrapy.Spider):
    name = "uac_api_course"
    allowed_domains = ["coursehub.uac.edu.au"]

    course_ids = ["215024"]  # start with one; later we'll load many

    def start_requests(self):
        for cid in self.course_ids:
            url = f"https://coursehub.uac.edu.au/backend/course-search/api/details/undergraduate/course/{cid}"
            yield scrapy.Request(url, callback=self.parse_course)

    def parse_course(self, response):
        data = json.loads(response.text)

        # Dump whole payload for now; later we normalize fields
        yield {
            "course_id": response.url.split("/")[-1],
            "payload": data,
        }
