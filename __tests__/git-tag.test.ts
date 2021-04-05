import {exec} from '@actions/exec'
import gitTag from '../src/git-tag'

afterAll(async () => {
  await exec('git', [
    'tag',
    '--delete',
    '0.1.0',
    '0.1.1-rc.0',
    '0.1.1',
    '0.1.2-rc.0',
    'JIRA-999'
  ])
})

test('No previous tag', async () => {
  expect(await gitTag()).toEqual('0.1.1-rc.0')
})

test('Increment semver', async () => {
  await exec('git', ['tag', '0.1.0'])
  await exec('git', ['tag', '0.1.1-rc.0'])
  await exec('git', ['tag', '0.1.1'])
  await exec('git', ['tag', '0.1.2-rc.0'])
  await exec('git', ['tag', 'JIRA-999'])
  expect(await gitTag()).toEqual('0.1.3-rc.0')
})
