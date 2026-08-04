# chainsight-demo-shop

A tiny storefront API used to demonstrate **ChainSight**, a software supply-chain risk analyzer.

> ⚠️ **Do not run `npm install` here.** The lock file deliberately contains entries for packages that are
> known to be malicious. They exist only as text in `package-lock.json` so a scanner can find them.

| Entry | Real or synthetic | Shows |
|---|---|---|
| `event-stream@3.3.6` → `flatmap-stream@0.1.1` | **Real** Nov 2018 incident (OSV `MAL-2025-20690`) | Malware hidden in a transitive dependency |
| `lodahs@1.0.0` | **Real** lodash typosquat flagged as malware | Lookalike names, install-time attack path |
| `moment`, `he` licensed `AGPL-3.0-only` | **Synthetic** relabel | License severity depends on how you ship |
| Old `express`, `lodash`, `axios`, `jsonwebtoken`, `marked`… | Real old versions | Known vulnerabilities, verified fix PR |

`.github/workflows/*.yml` run only when triggered by hand, so the planted entries are never installed.
