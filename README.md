# Ranked.

Ranked is a website where users can create a list of things, such as baseball
teams or colors or baby names, and they and other users can then rank those
items. Ranking is done by presenting the user with each possible pair of items,
and having the user choose the better of the two. The results of each of these
matches is then given to an implementation of the Elo algorithm to determine the
score and therefore final ranking.

This the Vue.js and TypeScript front-end for the Ranked stack.

## Architecture

The website is architected to use the database and backend as little as
possible. The {Stack} record contains multiple {Card} records, one for each item
to be ranked. No other data is stored in the database. As users complete
matches, the result of each match is encoded in the URL. When the user wishes to
see their ranking, the encoded results array is included in the final ranking
URL. This allows users to share their results with others without the
application needing to save their results to a database. There is no
authentication, nor any need for user accounts.

The front-end is Vue.js and Vue-Router, with string management handled by
Vue-i18n. The {App} class is the main layout class, and the top-level files in
`src/views` are parent views for the top-level routes. `src/components` contains
reusable components.

## Development

The front-end requires a modern version of Node and Yarn. Simply check out the
front-end repository and run `yarn install` to install dependencies.

Run `yarn serve` to run the hot-reloading development server, and `yarn build`
to build production assets. Production assets are copied to the `gh-pages`
branch by GitHub Actions.

In order to test the full stack, you will need to check out and run the back-end
too. An example Procfile that does this:

```
backend: cd Backend && rvm 3.3.4@ranked exec rails server -b 127.0.0.1
frontend: cd Frontend && yarn dev
```

# Deployment

The front-end is hosted using GitHub Pages. A `deploy.sh` script generates the
production assets, copies them to a submodule for the GitHub Pages repository,
and commits the updated files. The files are deployed automatically by GitHub
upon pushing the commit.

## Documentation

Comprehensive documentation of all classes is available by running
`yarn docs:generate` and opening the generated HTML website in `doc`.

## Tests

Unit tests are written in Mocha and Chai and can be run with `yarn test:unit`.
End-to-end tests are written in Cypress and can be run with `yarn test:e2e`.
Note that the E2E tests require the full stack to be started. An example
Procfile that starts the E2E stack and opens the Cypress test runner:

```
backend: cd Backend && rvm 3.3.4@ranked exec rails server -e cypress -b 127.0.0.1
frontend: cd Frontend && yarn run test:e2e:dev
```

The entire E2E test suite must be run in order, as the tests do not work in
isolation.
