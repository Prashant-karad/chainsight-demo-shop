# chainsight-demo-shop

A small storefront API used to demonstrate **[ChainSight](https://github.com/OmJangam1513/Coders_MindSpark26)**,
a software supply-chain risk analyzer. Every problem below is planted on purpose so each ChainSight feature
has something real to find.

> ⚠️ **Do not run `npm install` here.** The lock file deliberately contains known-malicious packages.
> They exist only as text in `package-lock.json` so a scanner can find them.

## What is planted, and where

| Where | Package | Real or synthetic | What ChainSight shows |
|---|---|---|---|
| `src/export.js` (commit "Bump stream helpers") | `event-stream@3.3.6` → `flatmap-stream@0.1.1` | **Real** Nov 2018 attack that stole bitcoin wallets | Malware hidden in a dependency you never chose; the commit that brought it in; removal PR |
| `src/utils.js` (commit "Add utility helpers") | `lodahs@1.0.0` | **Real** lodash typosquat, runs an install script | Lookalike name, install-time attack path, Install Guard blocks it |
| `src/server.js` | `lodash@4.17.15` (`_.merge`), `axios@0.21.0` (fetch by URL), `marked@0.3.6` (markdown), `jsonwebtoken@8.5.0`, `express@4.16.0` (+ `qs`) | Real old versions | Known vulnerabilities with CVSS / EPSS, verified upgrades |
| `scripts/build-emails.js`, tests | `handlebars@4.0.11`, `mocha@5.2.0`, `esbuild@0.14.0` | Real old versions, build only | Lower score because they never ship to users |
| `package.json` | `bufferutil@4.0.1` | Real native addon | Runs code at install time |
| `package-lock.json` | `moment`, `he` licensed `AGPL-3.0-only` | **Synthetic** relabel | License risk depends on how you ship the app |
| `.github/workflows/ci.yml` | `npm ci` with `NPM_TOKEN`, `JWT_SECRET` | Manual trigger only | Which CI secrets the malware could have read |

## The two pull requests

| Branch | Change | ChainSight check |
|---|---|---|
| `feature/image-uploads` | Adds `sharp` and `request` for product photos | ✗ **blocked**: new risky packages |
| `feature/dayjs-dates` | Replaces `moment` with `dayjs` | ✓ **passes**: removes risk, adds none |

## Resetting

This repository is rebuilt from scratch by `make demo-reset` in the ChainSight repo, so the demo can be
repeated: history, branches and both pull requests come back exactly as described here.
