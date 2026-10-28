# Hiyoko Honeypot Observatory

Public dashboard: https://hiyokosauna37.github.io/honeypot-report/

This repository contains a sanitized observation report and the owner's chick/server
mascot. Raw logs, credentials, source IPs, request bodies, full command input, sensor
configuration and sample binaries are not published.

## Observations

- SSH/Telnet and HTTP counts, with daily counts in UTC.
- Approved HTTP paths, methods, status codes, counts and observation times.
- Rule-based product/vulnerability clues. Path probes and suspected exploit
  expressions have different confidence labels; a CVE association does not prove
  successful exploitation.
- Approved, defanged destination URLs, labeled as mentions, failed downloads,
  recorded file transfers or SSH forwarding requests.
- Approved SHA-256 hashes from captured-file events and the sample manifest.
  TTY recording hashes are excluded. A file hash is not a malware verdict.

New paths, destination URLs and hashes are held for local approval before their
first publication. Aggregate counts include held observations. URL userinfo,
fragments, most query values and internal destinations are redacted. The report
generator does not visit observed URLs or execute captured content.

## Updates and health

Daily collection runs at 07:30 JST on the Windows collector, including when signed
out. Its power and network must remain available. Publication uses a dedicated,
repository-scoped SSH deploy key.

Current and rotated logs are deduplicated into a local 90-day history. Records
deleted on the sensor before collection cannot be recovered. Each public table
is limited to 100 rows. Coverage and pending-indicator counts appear on the page.
Operational checks may be included in observation counts.

An hourly collector-side monitor publishes [health.json](health.json), containing
only a check timestamp, a healthy flag and fixed problem codes. Private diagnostics
are kept on the collector.

The [Report freshness workflow](https://github.com/HiyokoSauna37/honeypot-report/actions/workflows/check-freshness.yml) checks
the public report and health status hourly. It fails if the daily report is older
than 27 hours, the health check is older than 2.5 hours, or the sensor reports an
unhealthy state. GitHub scheduling may be delayed. Email and other failure
notifications depend on the user's GitHub Actions notification settings.

Public observation data: [report.json](report.json), schema version 3.
