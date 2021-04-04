import * as core from '@actions/core'
import * as github from '@actions/github'
import {PullRequestClosedEvent} from '@octokit/webhooks-definitions/schema'

async function run(): Promise<void> {
  try {
    if (github.context.eventName === 'pull_request') {
      const payload = github.context.payload as PullRequestClosedEvent
      // eslint-disable-next-line no-console
      console.debug(payload.pull_request)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
