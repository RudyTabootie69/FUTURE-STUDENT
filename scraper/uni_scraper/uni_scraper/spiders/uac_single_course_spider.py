import scrapy


class UacSingleCourseSpider(scrapy.Spider):
    name = "uac_single_course"
    allowed_domains = ["uac.edu.au"]

    start_urls = [
        "https://uac.edu.au/course-search/search/undergraduate/course/215024"
    ]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_include_page": True,
                },
                callback=self.parse,
            )

    async def parse(self, response):
        page = response.meta["playwright_page"]

        # wait for JS to finish rendering
        await page.wait_for_timeout(3000)

        html = await page.content()
        await page.close()

        rendered = scrapy.Selector(text=html)

        yield {
            "url": response.url,
            "page_title": rendered.css("title::text").get(),
            "body_text_sample": rendered.css("body").xpath("string(.)").get()[:800],
        }
