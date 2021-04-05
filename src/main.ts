import * as core from '@actions/core'
import {exec} from '@actions/exec'
import yn from 'yn'
import findKey from './find-key'
import gitTag from './git-tag'

async function run(): Promise<void> {
  try {
    const key = findKey(core.getInput('branch', {required: true}))
    if (key === undefined) {
      core.info("Can't find JIRA issue key")
      return
    }
    const tag = await core.group('Get prerelease tag', async () => {
      return gitTag()
    })

    await exec('git', ['tag', key])
    await exec('git', ['tag', tag])

    const push = yn(core.getInput('push', {required: true}))
    if (push) {
      await exec('git', ['push', '--tags'])
    }

    core.setOutput('key', key)
    core.setOutput('tag', tag)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
