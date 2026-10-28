# Honeypot Observation Report

Public dashboard: https://hiyokosauna37.github.io/honeypot-report/

This repository contains aggregate observation counters only. Source IP addresses,
credentials, request bodies, commands, URLs, sensor configuration, and malware
samples are not published.

The dashboard is updated after the collector's daily 07:30 JST run succeeds.
The Windows collector must be powered on and signed in. A failed or missed run
leaves the previous report visible; check the generation timestamp on the page.

Daily observations use UTC. Counters summarize current logs in the latest collection,
not a cumulative sum of repeated snapshots. Log rotation or sensor resets can change
the observation window. Authentication success refers to the honeypot emulator,
not compromise of a real service.
