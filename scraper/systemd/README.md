# UAC Scraper Linux Service

This folder contains Linux `systemd` files for running the UAC Scrapy scraper once per week.

## Files

- `uac-scraper.service` runs the scraper once.
- `uac-scraper.timer` schedules the scraper weekly.

## Current schedule

The timer runs every Monday at 3:00 AM:

OnCalendar=Mon 03:00

## Expected Linux deployment path

/opt/csit321

## Notes

- This runs only on Linux servers
- It will not work on macOS
- Update paths depending on server setup
