import {expect, test} from '@oclif/test'
import * as path from 'path'

const root = path.join(__dirname, '../fixtures/multi')

describe('integration test', () => {
  test
    .loadConfig({root})
    .stdout()
    .stub(process, 'argv', ['oclif', 'cli', 'foo', 'baz', 'qux', 'package.json', '--name=rasphilco', '--force'])
    .command(['foo', 'baz', 'qux', 'package.json', '--name=rasphilco', '--force'])
    .it('runs the command', output => {
      // $ cli foo baz qux package.json --name rasphilco --force
      expect(output.stdout).to.contain(`hello rasphilco from ./src/commands/hello.ts
you input --force and --file: package.json
`)
    })
})
