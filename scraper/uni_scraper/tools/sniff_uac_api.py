import asyncio
from playwright.async_api import async_playwright

URL = "https://uac.edu.au/course-search/search/find-a-course-undergraduate"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        def log_req(req):
            u = req.url
            if "coursehub.uac.edu.au/backend/course-search/api" in u:
                print(f"\n=== {req.method} {u}")
        page.on("request", log_req)

        await page.goto(URL, wait_until="networkidle")
        await page.wait_for_timeout(6000)
        await browser.close()

asyncio.run(main())
