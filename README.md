# Hiyoko Web Attack Observatory

Public report: https://hiyokosauna37.github.io/honeypot-report/

A new observation period focused on web application traffic. Earlier evidence is
preserved privately; earlier public commits remain in Git history.

The fictional site has articles, search, documents, contact, login, upload and API
routes. Its independent implementation is inspired by TANNER's input inspection
and response emulation: https://github.com/mushorg/tanner

The report shows web attack patterns, paths, related CVEs or CWEs, unclassified
requests, defanged URLs and upload hashes. IoT-like paths are secondary.
Classification is heuristic and does not establish successful exploitation.
AI analysis is performed later when requested, not on a schedule.

New indicators require local review. Summary counts include pending observations;
tables show reviewed values only, up to 100 rows. Several rules can match a request.
Identified operational checks are excluded. Raw evidence remains private.

Collection runs hourly at 30 minutes past the hour (JST), including when signed out.
The Windows collector needs power and network. A repository-scoped deploy key
publishes generated files. Rotated logs are deduplicated in a local 90-day history.

An hourly monitor publishes coarse health.json. The Report freshness workflow
checks report and health age and fails if either exceeds 2.5 hours or health is bad.
Schedules may be delayed; notifications depend on GitHub notification settings.

The emulator never executes submitted code, SQL or commands, fetches submitted
URLs, or serves uploaded files. Apparent execution output is synthetic.
Raw logs, source IPs, credentials, cookies, payloads and sample files are private.

Public data: report.json, schema version 4.
