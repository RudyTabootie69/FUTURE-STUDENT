import scrapy


class UnswBrowseSpider(scrapy.Spider):
    name = "unsw_browse"
    allowed_domains = ["handbook.unsw.edu.au"]
    start_urls = [
        "https://www.handbook.unsw.edu.au/browse/By%20Area%20of%20Interest/ArchitectureandBuilding"
    ]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_include_page": False,
                    "playwright_page_methods": [
                        ("wait_for_timeout", 2500),
                    ],
                },
                callback=self.parse,
            )

    def parse(self, response):
        for href in response.css("a::attr(href)").getall():
            if not href:
                continue

            if (
                "/undergraduate/programs/2026/" in href
                or "/postgraduate/programs/2026/" in href
                or "/research/programs/2026/" in href
            ):
                yield {"url": response.urljoin(href)}
