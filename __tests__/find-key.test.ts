import findKey from '../src/find-key'

test('Valid branch', () => {
  expect(findKey('feature/JIRA-123-branch')).toEqual('JIRA-123')
})

test('Invalid branch', () => {
  expect(findKey('feature/branch')).toBeUndefined()
})
