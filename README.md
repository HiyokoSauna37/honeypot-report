# Honeypot Observation Report

Public dashboard: https://hiyokosauna37.github.io/honeypot-report/

This repository contains a sanitized observation report, not raw logs or samples.

## Published information

- Aggregate SSH/Telnet and HTTP counters, with daily counts in UTC.
- Requested HTTP paths, methods, status codes, counts and observation times.
- Rule-based product/vulnerability clues, explicitly distinguishing path probes
  from suspected exploit expressions. A CVE association does not prove successful exploitation.
- Defanged URLs mentioned in shell input, transfer events, SSH forwarding requests,
  saved HTTP request bodies and Dionaea text logs, with their observation context.
- SHA-256 hashes recorded for captured files, deduplicated across file events and
  the sensor sample manifest. TTY recording hashes are excluded.

URL userinfo, fragments, most query values and internal destinations are redacted.
Source IPs, credentials, cookies, full command input, request bodies, sensor
configuration and sample binaries are not published. URLs are never fetched as
part of report generation. An observed URL is not necessarily a successful connection.
A captured file hash is not a malware verdict.

## Updates and coverage

The dashboard is updated after the collector's daily 07:30 JST run succeeds.
The Windows collector must be powered on and signed in. A failed or missed run
leaves the previous report visible; check the generation timestamp on the page.

Each report summarizes current logs in the latest collection, not a cumulative
sum of repeated snapshots. Log rotation or sensor resets can change the observation
window. Lists are limited to 100 rows and the coverage section shows truncation.
Only saved request bodies are inspected with size limits, in memory; bodies and
samples are not extracted or executed. Unknown patterns, encrypted traffic and
obfuscated payloads may not be classified. Operational tests may be included.

Public data: [report.json](report.json), schema version 2.
