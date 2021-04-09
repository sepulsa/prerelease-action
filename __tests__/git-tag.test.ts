import {exec} from '@actions/exec'
import gitTag from '../src/git-tag'

afterAll(async () => {
  await exec('git', [
    'tag',
    '--delete',
    '1.0.0',
    '1.1.0-rc.0',
    '1.1.0',
    '1.2.0-rc.0',
    'JIRA-999'
  ])
})

test('No previous tag', async () => {
  expect(await gitTag()).toEqual('1.1.0-rc.0')
})

test('Increment semver', async () => {
  await exec('git', ['tag', '1.0.0'])
  await exec('git', ['tag', '1.1.0-rc.0'])
  await exec('git', ['tag', '1.1.0'])
  await exec('git', ['tag', '1.2.0-rc.0'])
  await exec('git', ['tag', 'JIRA-999'])
  expect(await gitTag()).toEqual('1.3.0-rc.0')
})
