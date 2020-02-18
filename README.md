# Headline Search - FT Tech Test

[![Build Status](https://travis-ci.org/varjmes/ft.svg?branch=master)](https://travis-ci.org/varjmes/ft) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

[View Live](https://ftjmes.herokuapp.com)

## The task

Build a server-rendered site that displays an article from The Financial Times.
You may use our Developer APIs to achieve this. Provide a search box for users
to search for headlines containing specific words (i.e. searching for "pizza"
should return a list of pizza-related headlines).

- ✅ Be responsive
- ✅ Be accessible
- ✅ Have pagination
- ✅ Built using Javascript and node.js
- ✅ Not be reliant on client-side frameworks (i.e. Angular, React) or libraries like jQuery
- ✅ Uses Origami Components
- ✅ Progressively enhanced
- ✅ Deployed on Heroku
- ✅ Have a similar look and feel as [ft.com](https://ft.com)
- ✅ Perform well over 3G networks
- ❌ Work offline

You can track each step I took to build this app by following along with the
Done column on the [project board](https://github.com/varjmes/ft/projects/1)

## Getting Started

To begin, you must have [node](https://nodejs.org/en/) installed.

1. Get a [FT Developer API Key](https://developer.ft.com/portal/docs-start-create-an-ft-api-developer-account)
2. Clone Repository
3. `cp .env.example .env`
4. Put your API Key in the `.env` file
4. `npm i`
5. `npm start`
6. Go to http://localhost:3000

## Tests

- `npm test` to run the unit tests with [jest](https://jestjs.io/)
- `npm run cypress:open` to run the end to end tests with [Cypress](https://www.cypress.io/),
which include accessibility tests for each page.

## Development

- `npm run dev` runs the application with [nodemon](https://www.npmjs.com/package/nodemon),
when you save changes to files the server automatically reloads
- All app requests and search interactions are logged with [Pino](https://www.npmjs.com/package/pino)
- PR's to automatically update npm packages are opened by [Renovate](https://github.com/renovatebot/renovate)

## Deploying the application

- All PRs trigger a build in [Travis](https://travis-ci.org/), which runs unit
and end to end tests
- Once a PR is merged, another build is triggered. On successful tests, the app
is deployed to [Heroku](https://heroku.com).

## Improvements

## Tests

Due to how simple the app is, I felt time was better spent writing true end to
end tests rather than mocking the axios requests for lower level integration tests.
The Cypress tests are testing the live site: whilst this is good to ensure the
true form of the app is tested, it can be quite slow in CI particularly as the
number of tests increase. We could considering using
[Cypress fixtures](https://docs.cypress.io/api/commands/fixture.html) to mock out
responses from the headlines api.

## Logging

If we hooked up our Pino logs to [Kibana](https://www.elastic.co/kibana) we can
monitor requests to our application. Not only can we keep track of the frequency
and nature of errors (e.g. 500's, 404's), we can visualise search trends which
could in turn influence what content we write.

## Application Performance Metrics (APM)

Using APM platforms like [Datadog](https://www.datadoghq.com/) we can monitor
our app performance (CPU, memory load and more) in the cloud, all of which can
feed into self defined thresholds that trigger alarms when not met.

## Microservice Architecture

Assuming that the application grows and does more than just request the headline
API, we can considering splitting out the application and api into separate
microservices.

## Performance

By linking the FT Styles from the Origami Service, I've put render blocking
requests into the application. On top of that, not all of the CSS in the bundle
is actually used in my application. Remove that which we don't use and inline
what is critical to our app. Due to how small and simple the
application is, this isn't a pressing issue.

## Offline first

The temptation was there to install a service worker just to tick off all the
optional requirements in the test, but I wasn't convinced what the benefit would
be for this application. If this was FT.com website itself I'd use a service
worker to cache assets and full articles, but for a simple search that doesn't
yet have much user benefit, I didn't think it was useful.

## Caching

We can cache requests to `/search` to speed up response time. We can also
serve our assets through a CDN.

---

✨ this was very fun to work on, thanks :)
