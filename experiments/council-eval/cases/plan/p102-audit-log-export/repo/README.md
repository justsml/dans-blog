# Audit console
The date picker supplies ISO instants. All report windows are half-open [from,to); parse instants rather than comparing text since offsets are supported. Export workers must walk every reader page; page size is a transport setting, not a report limit.

AuditSummary is our public wire format. private_ detail fields are internal-only and must never leave the service. Entries and details belong to the reader; exports must not mutate them. Reader pages normally scope by company; the export must enforce company ownership too because archive readers may return mixed-company pages.
