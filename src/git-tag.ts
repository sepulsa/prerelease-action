import {exec, ExecOptions} from '@actions/exec'
import {SemVer, sort} from 'semver'

export default async function gitTag(): Promise<string> {
  let output = ''

  const options: ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString()
      }
    }
  }
  await exec('git', ['config', 'versionsort.suffix', '-'], options)
  await exec('git', ['tag', '--list', '--sort', 'v:refname', '*.*.*'], options)

  const semver = new SemVer(sort(output.trim().split('\n')).pop() || '1.0.0')
  const inc = semver.inc('preminor', 'rc')
  return inc.version
}
