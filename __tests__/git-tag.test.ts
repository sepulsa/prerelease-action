import {execSync} from 'child_process'
import gitTag from '../src/git-tag'

afterAll(() => {
  execSync('git tag --list | xargs git tag --delete')
})

test('No previous tag', async () => {
  expect(await gitTag()).toEqual('1.1.0-rc.0')
})

test('Increment semver', async () => {
  execSync('git tag 1.0.0')
  execSync('git tag 1.1.0-rc.0')
  execSync('git tag 1.1.0')
  execSync('git tag 1.2.0-rc.0')
  execSync('git tag JIRA-999')
  expect(await gitTag()).toEqual('1.3.0-rc.0')
})
