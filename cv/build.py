"""Render cv/cv.html to public/cv/Meharwan-Singh-CV.pdf (A4, one page).

Needs Python Playwright with Chromium:  pip install playwright && playwright install chromium
Run from the project root:              python3 cv/build.py
"""

import asyncio
import pathlib

from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "cv" / "cv.html"
OUT = ROOT / "public" / "cv" / "Meharwan-Singh-CV.pdf"


async def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(SRC.as_uri())
        await page.evaluate("document.fonts.ready")
        await page.pdf(path=str(OUT), format="A4", print_background=True, prefer_css_page_size=True)
        await page.set_viewport_size({"width": 794, "height": 1123})
        await page.screenshot(path=str(ROOT / "cv" / "preview.png"))
        await browser.close()
    print("wrote", OUT)


asyncio.run(main())
