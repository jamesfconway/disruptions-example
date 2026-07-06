# Disruptions Example

`disruptions-example` is a GitHub Pages showcase that ties together two AI-assisted bus-control workflow prototypes behind a single landing page.

The front page is designed as a hiring-manager-friendly case-study entry point:

- pitch the workflow problem
- show the product model that was mapped out
- explain how ChatGPT requirement docs and Figma Make were used to create atomic white-label prototypes

The interactive demos are adapted from:

- [jamesfconway/disruption-preferences](https://github.com/jamesfconway/disruption-preferences)
- [jamesfconway/unified-service-disruption-form](https://github.com/jamesfconway/unified-service-disruption-form)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This repo is configured for GitHub Pages project hosting under `/disruptions-example/` and uses hash-based routes:

- `#/`
- `#/service-form`
- `#/preferences`

The deployment workflow publishes automatically from `main` using GitHub Actions.
