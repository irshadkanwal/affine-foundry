<!--
Guiding Principles:

Changelogs are for humans, not machines.
There should be an entry for every single version.
The same types of changes should be grouped.
Versions and sections should be linkable.
The latest version comes first.
The release date of each version is displayed.
Mention whether you follow Semantic Versioning.

Usage:

Change log entries are to be added to the Unreleased section under the
appropriate stanza (see below). Each entry should ideally include a message and either
an issue number or pull request number using one of these formats:

* #<issue-number> message

If there is no issue number, you can add a reference to a Pull Request like this:
* PR<pull-request-number> message

The issue numbers and pull request numbers will later be link-ified during the release process
so you do not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Deprecated" for soon-to-be removed features.
"Bug Fixes" for any bug fixes.
"Client Breaking" for breaking CLI commands and REST routes used by end-users.
"API Breaking" for breaking exported APIs used by developers.
Ref: https://keepachangelog.com/en/1.0.0/
-->

## Unreleased

### Features

- [PR 2](https://github.com/affinehealth/affine-atlas/pull/2) Boilerplate with Auth0 and IBM Carbon design.
- [PR 30](https://github.com/affinehealth/affine-foundry/pull/30) First Figma template implementation.
- [#47](https://github.com/affinehealth/affine-foundry/pull/47) Computation Environment Figma Conversion.
- [PR 88](https://github.com/affinehealth/affine-foundry/pull/88) Implement Data Inventory.
- [PR 90](https://github.com/affinehealth/affine-foundry/pull/90) Implement Workflows
- [PR 115](https://github.com/affinehealth/affine-foundry/pull/115) Implemented Applications/Runtime/Data Profile/Data
  Quality Dashboard
- [PR 150](https://github.com/affinehealth/affine-foundry/pull/150) Workflows
- [PR169] (https://github.com/affinehealth/affine-foundry/pull/169) Data Lineage

### Improvements

- [PR 7 (ci)](https://github.com/affinehealth/affine-atlas/pull/7) Update workflows.
- [PR 8 (doc)](https://github.com/affinehealth/affine-atlas/pull/8) Update readme docs.
- [#45 (doc)](https://github.com/affinehealth/affine-foundry/pull/45) Add contributing and release process documents.
- [#55 (ci)](https://github.com/affinehealth/affine-foundry/pull/55) Add deployment workflow for CI/CD.
- [PR 61 (ci)](https://github.com/affinehealth/affine-foundry/pull/61) Add container name to prod task definition.
- [PR 62 (doc)](https://github.com/affinehealth/affine-foundry/pull/62) Add CI/CD status badges.
- [PR 63 (doc)](https://github.com/affinehealth/affine-foundry/pull/63) Add codecov badge.
- [PR 98](https://github.com/affinehealth/affine-foundry/pull/98) auto complete component, search based on resources, profile column na.
- [PR 102](https://github.com/affinehealth/affine-foundry/pull/102) Profile Health heat map.
- [PR 130](https://github.com/affinehealth/affine-foundry/pull/130) Run `yarn install` on `pre-commit` hook.
- [#37](https://github.com/affinehealth/affine-foundry/issues/37) Enable Runtime functionality.
- [#38](https://github.com/affinehealth/affine-foundry/issues/37) Enable Application functionality.
- [#160](https://github.com/affinehealth/affine-foundry/pull/160) Some Improvments related to Workflow and Data Healt and Icons added.
- [#166](https://github.com/affinehealth/affine-foundry/pull/166) Es-lint Errors Removed
- [#177](https://github.com/affinehealth/affine-foundry/pull/177) UI Enhancments and Cron implimentation
- [#184](https://github.com/affinehealth/affine-foundry/pull/184) Add new `dev1` deployment environment.
- [PR 281](https://github.com/affinehealth/affine-foundry/pull/281) Setup environment specific deployments
- [PR 295](https://github.com/affinehealth/affine-foundry/pull/295) remove data check frequency.
- [PR 307](https://github.com/affinehealth/affine-foundry/pull/307) point dev UI to dev API.
- [PR 313](https://github.com/affinehealth/affine-foundry/pull/313) Home page redesigned - figma conversion.
- [PR 331](https://github.com/affinehealth/affine-foundry/pull/331) Home dashboard page, SSO setup, and `BASE_URL` format change.

### Bug Fixes

- [#21](https://github.com/affinehealth/affine-foundry/issues/21) Fix delete not working for data packages.
- [PR 64 (doc)](https://github.com/affinehealth/affine-foundry/pull/63) Fix title in README.
- [#75 (ci)](https://github.com/affinehealth/affine-foundry/issues/75) Update `action/setup-node` to v3.
- [#72](https://github.com/affinehealth/affine-foundry/issues/72) Data Resources Properties Button.
- [PR 77](https://github.com/affinehealth/affine-foundry/pull/77) Data Reference Fixes Connection Property Fixes and Data Health Dashboard.
- [#100](https://github.com/affinehealth/affine-foundry/issues/100) Deployments are not triggered when updating a dependencies.
- [PR 128](https://github.com/affinehealth/affine-foundry/pull/128) Workflow discrepancies removed.
- [#133](https://github.com/affinehealth/affine-foundry/issues/133), [#134](https://github.com/affinehealth/affine-foundry/issues/134), [#135](https://github.com/affinehealth/affine-foundry/issues/135) Data Inventory, data resource, data package bugs.
- [PR 148](https://github.com/affinehealth/affine-foundry/pull/148) Data Health Minor Bug Fixes.
- [PR 183](https://github.com/affinehealth/affine-foundry/pull/183) Data Health Minor Bug Fixes.
- [PR 256](https://github.com/affinehealth/affine-foundry/pull/256) Fix runtime state.
- [PR 259](https://github.com/affinehealth/affine-foundry/pull/259) Fix runtime POST/PUT requests body.
- [PR 278](https://github.com/affinehealth/affine-foundry/pull/278) load data format from response.
- [PR 282](https://github.com/affinehealth/affine-foundry/pull/282) Fix deploy script.
- [PR 332](https://github.com/affinehealth/affine-foundry/pull/332) Disable `BASE_URL` replace in workflow.
