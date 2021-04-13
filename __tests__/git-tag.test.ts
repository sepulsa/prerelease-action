import {exec, ExecOptions} from '@actions/exec'
import gitTag from '../src/git-tag'

jest.mock('@actions/exec')

test('No previous tag', async () => {
  expect(await gitTag()).toEqual('1.1.0-rc.0')
})

test('Increment semver', async () => {
  const mockedExec = exec as jest.Mock<Promise<number>>
  mockedExec.mockImplementation(
    async (
      commandLine: string,
      args?: string[],
      options?: ExecOptions
    ): Promise<number> => {
      if (options?.listeners?.stdout) {
        options.listeners.stdout(Buffer.from('1.2.0-rc.0\nV1.3.0-rc.0'))
      }
      return 1
    }
  )

  expect(await gitTag()).toEqual('1.3.0-rc.0')
})
