/* eslint-disable @typescript-eslint/camelcase */

import { LocaleMessageObject } from 'vue-i18n'

const messages: LocaleMessageObject = {
  validationError: {
    accepted: 'must be accepted',
    after: 'must be after {restriction}',
    before: 'must be before {restriction}',
    blank: 'can’t be blank',
    confirmation: 'doesn’t match confirmation',
    empty: 'can’t be empty',
    equal_to: 'must be equal to {count}',
    even: 'must be even',
    exclusion: 'reserved',
    greater_than: 'must be greater than {count}',
    greater_than_or_equal_to: 'must be greater than or equal to {count}',
    inclusion: 'not acceptable',
    incorrect_type: 'incorrect type',
    invalid: 'invalid',
    invalid_date: 'not a valid date',
    invalid_datetime: 'not a valid date and time',
    invalid_email: 'not a valid email address',
    invalid_time: 'not a valid time',
    is_at: 'must be at {restriction}',
    less_than: 'must be less than {count}',
    less_than_or_equal_to: 'must be less than or equal to {count}',
    not_a_number: 'not a number',
    not_an_integer: 'not an integer',
    odd: 'must be odd',
    on_or_after: 'must be on or after {restriction}',
    on_or_before: 'must be on or before {restriction}',
    taken: 'already taken',
    too_few: 'must have at least two items',
    too_long: 'must be {count} characters or shorter',
    too_short: 'must be {count} characters or longer',
    wrong_length: 'must be {count} characters long'
  },
  newStack: {
    header: {
      template: '{nameField}{ranked}',
      ranked: ', ranked.'
    },
    prompt: 'Start listing things. The order doesn’t matter; you’ll rank them later.',
    submit: 'Let’s Rank'
  },
  rank: {
    title: 'Let’s Rank {stack}.',
    prompt: 'Which is better?',
    equal: 'They’re about equal.',
    remaining: 'You’re done! | One choice remaining. | {formatted} choices remaining.',
    skipToEnd: {
      template: 'Or, if you’d like, you can {seeResults}.',
      seeResults: 'see your results right now'
    }
  },
  results: {
    title: '{stack}, ranked.',
    byline: 'by {name}',
    actions: {
      startRanking: 'I want to rank {stack}!',
      newStack: 'I’d like to make my own list of things to rank!'
    },
    share: {
      link: 'Share with my friends.',
      namePrompt: 'What’s your name?',
      copyPrompt: 'Copy this link and share with your friends:'
    }
  },
  home: {
    title: 'Ranked.',
    description: 'Make a list of things, then let us help you (and others) rank them. Start your list:'
  },
  error: 'Sorry, an error occurred.',
  faq: {
    template: 'Ranked uses the Elo algorithm find the relative rankings of items in your list. '
      + '{sourceLink} to learn more, or send me a pull request to contribute.',
    sourceLink: 'Check out the source code on GitHub'
  },
  loading: {
    title: 'Loading your stack',
    description: 'Just a sec…'
  },
  notFound: {
    title: 'Sorry, you took a wrong turn somewhere.',
    goHome: {
      template: 'Try {link}.',
      link: 'going back to the home page'
    }
  }
}

export default messages
