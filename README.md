# Mirra

An intelligent edge-based mirror router powered by Cloudflare Workers.

## Features

- **Geo-Aware Routing:** Automatically redirects to the fastest mirror according to the ruleset, based on the visitor's IP country (currently supports CN & US).
- **Multi-Repo Support:** Works with `archlinux`, `archlinuxcn`, `cachyos`, and (theoretically) any other repos.
- **Zero Latency:** 302 redirects happen at Cloudflare's edge nodes, adding only a few milliseconds of latency.
- **Config-Driven:** Allows customizing the mirror ruleset easily.
- **Lightweight:** No external dependencies. No external services. Just a worker script.
- **GitOps Ready:** Supports automatic deployment via GitHub + Cloudflare.

## Quick Start

WIP

## License

[MIT](./LICENSE)
