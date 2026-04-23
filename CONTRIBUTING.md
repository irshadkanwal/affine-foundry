# Contributing

<!-- TOC -->
  - [Teams Dev Calls](#teams-dev-calls)
  - [Architecture Decision Records (ADR)](#architecture-decision-records-adr)
  - [Development Procedure](#development-procedure)
    - [Testing](#testing)
    - [Pull Requests](#pull-requests)
    - [Pull Request Templates](#pull-request-templates)
    - [Requesting Reviews](#requesting-reviews)
    - [Updating Documentation](#updating-documentation)
  - [Dependencies](#dependencies)
  - [Branching Model and Release](#branching-model-and-release)
    - [PR Targeting](#pr-targeting)
    - [Development Procedure](#development-procedure)
  - [Concept & Feature Approval Process](#concept-feature-approval-process)
    - [Strategy Discovery](#strategy-discovery)
    - [Concept Approval](#concept-approval)
    - [Implementation & Release Approval](#implementation-release-approval)
  - [Credits](#credits)

Thank you for becoming a member of the Affine Health Intelligence organization and making contributions
to this and related repositories!

Contributing to this repo can mean many things, such as participating in
discussion or proposing code changes. To ensure a smooth workflow for all
contributors, the general procedure for contributing has been established:

1. Start by browsing [new issues](https://github.com/affinehealth/affine-foundry-api/issues) and [discussions](https://github.com/affinehealth/affine-foundry-api/discussions). If you are looking for something interesting or if you have something in your mind, there is a chance it had been discussed.
    * Looking for a good place to start contributing? How about checking out some [good first issues](https://github.com/affinehealth/affine-foundry-api/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) or [bugs](https://github.com/affinehealth/affine-foundry-api/issues?q=is%3Aopen+is%3Aissue+label%3A%22T%3A+Bug%22)?
2. Determine whether a GitHub issue or discussion is more appropriate for your needs:
    1. If you want to propose something new that requires specification or an additional design, or you would like to change a process, start with a [new discussion](https://github.com/affinehealth/affine-foundry-api/discussions/new). With discussions, we can better handle the design process using discussion threads. A discussion usually leads to one or more issues.
    2. If the issue you want addressed is a specific proposal or a bug, then open a [new issue](https://github.com/affinehealth/affine-foundry-api/issues/new/choose).
    3. Review existing [issues](https://github.com/affinehealth/affine-foundry-api/issues) to find an issue you'd like to help with.
3. Participate in thoughtful discussion on that issue.
4. If you would like to contribute:
    1. Ensure that the proposal has been accepted.
    2. Ensure that nobody else has already begun working on this issue. If they have,
       make sure to contact them to collaborate.
    3. If nobody has been assigned for the issue, and you would like to work on it,
       make a comment on the issue to inform the community of your intentions
       to begin work.
5. To submit your work as a contribution to the repository follow standard GitHub best practices. See [pull request guideline](#pull-requests) below.

**Note:** For very small or blatantly obvious problems such as typos, you are
not required to an open issue to submit a PR, but be aware that for more complex
problems/features, if a PR is opened before an adequate design discussion has
taken place in a GitHub issue, that PR runs a high likelihood of being rejected.

## Teams Dev Calls

The Affine Foundry has many stakeholders contributing and shaping the project. The Core team is composed of Affine Health core engineers. Any long-term contributors and additional maintainers from other projects are welcome. We use self-organizing principles to coordinate and collaborate across organizations in structured "EPIC" that focus on specific problem domains or architectural components of the Affine Foundry.

Development work is available in a [GitHub Project](https://github.com/orgs/cosmos/projects/26/views/22). The current EPICs are pinned at the top of the [issues list](https://github.com/affinehealth/affine-foundry-api/issues).

The important development announcements are shared on Slack in the `#eng-announcements` channel.

To synchronize we have few major meetings:

* TBD

If you would like to join one of the calls, then please contact us on Slack or reach out directly to Ergels Gaxhaj (@egaxhaj).

## Architecture Decision Records (ADR)

When proposing an architecture decision for the Affine Foundry, please start by opening an [issue](https://github.com/affinehealth/affine-foundry-api/issues/new/choose) or a [discussion](https://github.com/affinehealth/affine-foundry-api/discussions/new) with a summary of the proposal. Once the proposal has been discussed and there is rough alignment on a high-level approach to the design, the [ADR creation process](https://github.com/affinehealth/affine-foundry-api/blob/main/docs/architecture/PROCESS.md) can begin. We are following this process to ensure all involved parties are in agreement before any party begins coding the proposed implementation. If you would like to see examples of how these are written, please refer to the current [ADRs](https://github.com/affinehealth/affine-foundry-api/tree/main/docs/architecture).

## Development Procedure

* The latest state of development is on `main`.
* `main` must never fail `yarn lint`.
  * `lint` is a custom task that has been added to run the `eslint` tools for React projects.
* No `--force` onto `main` (except when reverting a broken commit, which should seldom happen).
* Create a branch to start work:
    * Clone the repo, branch from the HEAD of `main`, make some commits, and submit a PR to `main`.
    * Follow branch name conventions to ensure a clear ownership of branches: `{moniker}/{issue#}-branch-name`.
    * See [Branching Model](#branching-model-and-release) for more details.
* Be sure to run `yarn test` before every commit. The easiest way
  to do this is to have your editor run it for you upon saving a file.
  Additionally, be sure that your code is lint compliant by running `yarn lint` (as described above).
* Follow the [CODING GUIDELINES](CODING_GUIDELINES.md), which defines criteria for designing and coding a software.

Code is merged into main through pull request procedure.

### Testing

Tests can be executed by running `yarn test` at the top level of the Affine Foundry repository.

### Pull Requests

Before submitting a pull request:

* merge the latest main `git merge origin/main`,
* run `yarn lint` and `yarn test` to ensure that all checks and tests pass.

Then:

1. If you have something to show, **start with a `Draft` PR**. It's good to have early validation of your work, and we highly recommend this practice. A Draft PR also indicates to the community that the work is in progress.
   Draft PRs also helps the core team provide early feedback and ensure the work is in the right direction.
2. When the code is complete, change your PR from `Draft` to `Ready for Review`.
3. Go through the actions for each checkbox present in the PR template description. The PR actions are automatically provided for each new PR.
4. Be sure to include a relevant changelog entry in the `Unreleased` section of `CHANGELOG.md` (see file for log format). The entry should be on top of all others changes in the section.

PRs must have a category prefix that is based on the type of changes being made (for example, `fix`, `feat`,
`refactor`, `docs`, and so on). The *type* must be included in the PR title as a prefix (for example,
`fix: <description>`). This convention ensures that all changes that are committed to the base branch follow the
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
Additionally, each PR should only address a single issue.

Pull requests are merged automatically using [`A:automerge` action](https://mergify.io/features/auto-merge).

NOTE: when merging, GitHub will squash commits and rebase on top of the main.

### Pull Request Templates

The [default template](./.github/PULL_REQUEST_TEMPLATE.md) is for types `fix`, `feat`, `refactor` and `doc` updates.

### Requesting Reviews

In order to accommodate the review process, the author of the PR must complete the author checklist
(from the pull request template)
to the best of their abilities before marking the PR as "Ready for Review". If you would like to
receive early feedback on the PR, open the PR as a "Draft" and leave a comment in the PR indicating
that you would like early feedback and tagging whoever you would like to receive feedback from.

Codeowners are marked automatically as the reviewers.

All PRs require at least two review approvals before they can be merged (one review might be acceptable in
the case of minor changes to [docs](./.github/PULL_REQUEST_TEMPLATE/docs.md) or [other](./.github/PULL_REQUEST_TEMPLATE/other.md) changes that do not affect production code). Each PR template has a reviewers checklist that must be completed before the PR can be merged. Each reviewer is responsible
for all checked items unless they have indicated otherwise by leaving their handle next to specific
items. In addition, use the following review explanations:

- `LGTM` without an explicit approval means that the changes look good, but you haven't pulled down the code, run tests locally and thoroughly reviewed it.
- `Approval` through the GitHub UI means that you understand the code, documentation/spec is updated in the right places, you have pulled down and tested the code locally. In addition:
    - You must also think through anything which ought to be included but is not
    - You must think through whether any added code could be partially combined (DRYed) with existing code
    - You must think through any potential security issues or incentive-compatibility flaws introduced by the changes
    - Naming must be consistent with conventions and the rest of the codebase
    - Code must live in a reasonable location, considering dependency structures (e.g. not importing testing modules in production code, or including example code modules in production code).
    - if you approve of the PR, you are responsible for fixing any of the issues mentioned here and more
- If you sat down with the PR submitter and did a pairing review please note that in the `Approval`, or your PR comments.
- If you are only making "surface level" reviews, submit any notes as `Comments` without adding a review.

### Updating Documentation

If you open a PR on the Affine Foundry, it is mandatory to update the relevant documentation in `/docs`.

When writing documentation, follow the [Documentation Writing Guidelines](./docs/DOC_WRITING_GUIDELINES.md).

## Dependencies

We use [Maven](https://mvnrepository.com) to manage dependency versions.

The main branch of every Affine Health Scala repository should just build with `sbt publish`,
which means they should be kept up-to-date with their dependencies, so we can
get away with telling people they can just pull down our software.

Since some dependencies are not under our control, a third party may break our
build, in which case we can fall back on a previous release.

## Branching Model and Release

User-facing repos should adhere to the trunk based development branching model: https://trunkbaseddevelopment.com. User branches should start with a username, example: `{moniker}/{issue#}-branch-name`.

The Affine Foundry utilizes [semantic versioning](https://semver.org/) with the `Early Samever` policy. Read this blog [post](https://scala-lang.org/blog/2021/02/16/preventing-version-conflicts-with-versionscheme.html) as to why.

### PR Targeting

Ensure that you base and target your PR on the `main` branch.

All feature additions and all bug fixes must be targeted against `main`. Exception is for bug fixes which are only related to a released version. In that case, the related bug fix PRs must target against the release branch.

If needed, we backport a commit from `main` to a release branch (excluding API breaking and similar).

### Development Procedure

1. Assign the issue to yourself and mark it as "In Progress" in any projects the issue is assigned to.
2. Checkout `main` and make sure it's up-to-date. E.g. `git checkout main && git pull`.
3. Create a development branch for your work using the development branch name format defined above. E.g. `git checkout -b myuser/123-add-foo-feature`.
4. Make changes and commit them. The suggested commit message format is `[issue #]: <message>`. E.g. `git commit -m "[123]: Update changelog."`.
5. Push up your changes.
6. Make a PR (possibly as a draft).
7. Repeat steps 4 and 5 as needed.
8. Mark your PR as "Ready to Review" (unless it's already that way).
9. Once the PR is ready (approved and all checks pass), it should be merged using the "Squash and Merge" strategy.

## Concept & Feature Approval Process

The process for how Affine Foundry maintainers take features and ADRs from concept to release
is broken up into three distinct stages: **Strategy Discovery**, **Concept Approval**, and
**Implementation & Release Approval**

### Strategy Discovery

* Develop long term priorities, strategy and roadmap for the Affine Foundry
* Release committee not yet defined as there is already a roadmap that can be used for the time being

### Concept Approval

* Architecture Decision Records (ADRs) may be proposed by any contributors or maintainers of the Affine Foundry,
  and should follow the guidelines outlined in the
  [ADR Creation Process](https://github.com/affinehealth/affine-foundry/blob/main/docs/architecture/PROCESS.md)
* After proposal, a time bound period for Request for Comment (RFC) on ADRs commences
* ADRs are intended to be iterative, and may be merged into `main` while still in a `Proposed` status

#### Time Bound Period

* Once a PR for an ADR is opened, reviewers are expected to perform a first review within 1 week of pull request being open
* Time bound period for individual ADR Pull Requests to be merged should not exceed 2 weeks
* Total time bound period for an ADR to reach a decision (`ABANDONED | ACCEPTED | REJECTED`) should not exceed 4 weeks

If an individual Pull Request for an ADR needs more time than 2 weeks to reach resolution, it should be merged
in current state (`Draft` or `Proposed`), with its contents updated to summarize
the current state of its discussion.

If an ADR is taking longer than 4 weeks to reach a final conclusion, the **Concept Approval Committee**
should convene to rectify the situation by either:

* unanimously setting a new time bound period for this ADR
* making changes to the Concept Approval Process (as outlined here)
* making changes to the members of the Concept Approval Committee

#### Approval Committee & Decision Making

In absence of general consensus, decision making requires 1/2 vote from the two members
of the **Concept Approval Committee**.

#### Committee Members

* Core Members: **Ergels**, **George**

#### Committee Criteria

Members must:

* Participate in all or almost all ADR discussions, both on GitHub and in bi-weekly Architecture Review
  meetings
* Be active contributors to the Affine Foundry, and furthermore should be continuously making substantial contributions
  to the project's codebase, review process, documentation and ADRs
* Have stake in the Affine Foundry project, represented by:
    * Being a client / user of the Affine Foundry
    * "[giving back](https://www.debian.org/social_contract)" to the software
* Delegate representation in case of vacation or absence

Code owners need to maintain participation in the process, ideally as members of **Concept Approval Committee**
members, but at the very least as active participants in ADR discussions

Removal criteria:

* Leaving the team results in evaluating whether the member should be removed / replaced
* Leaving the company results in removal
* Violation of Code of Conduct

### Implementation & Release Approval

The following process should be adhered to both for implementation PRs corresponding to ADRs, and for PRs made as part of a release process:

* Code reviewers should ensure the PR does exactly what the ADR said it should
* Code reviewers should have more senior engineering capability
* 1/2 approval is required from the **primary repo maintainers** in `CODEOWNERS`

**Note**: For any major release series denoted as a "Stable Release", a separate release
committee is often established. Stable Releases, and their corresponding release committees are documented
separately in [Stable Release Policy](RELEASE_PROCESS.md#stable-release-policy)*

## Credits

Adapted from and/or inspired by multiple successful Contributing, including:

- [Provenance](https://github.com/provenance-io/provenance/blob/main/CONTRIBUTING.md)
- [Cosmos SDK](https://github.com/cosmos/cosmos-sdk/blob/main/CONTRIBUTING.md)
