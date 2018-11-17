import {expect, test} from '@oclif/test'
import * as path from 'path'

const root = path.join(__dirname, '../fixtures/multi')

describe('hooks', () => {
  test
    .loadConfig({root})
    .stdout()
    .hook('init', {id: ['foo'], argv: ['baz', 'qux']}, {root})
    .do(output => {
      let config = output.config
      let cmd = config.findCommand('')
      expect(cmd!.description).to.equal('qux command')
    })
    .it('replaces Config#findCommand')

  test
    .loadConfig({root})
    .stdout()
    .hook('init', {id: ['foo'], argv: ['qux']}, {root})
    .do(output => {
      let topic = output.config.findTopic('')
      expect(topic!.description).to.equal('foo topic')
    })
    .it('replaces Config#findTopic')

  // testing runCommand is weird but
  // basically we know it's using the
  // patch because of the
  // command not found output
  test
    .loadConfig({root})
    .stdout()
    .hook('init', {id: ['foo'], argv: ['baz']}, {root})
    .do(async ctx => {
      await ctx.config.runCommand('')
    })
    .catch('command foo baz not found')
    .it('replaces Config#runCommand')

  test
    .loadConfig({root})
    .stdout()
    .hook('init', {id: ['foo']}, {root})
    .it('replaces Help#topic && Help#topics', async ctx => {
      const HHelp = require('@oclif/plugin-help').default
      const help = new HHelp(ctx.config)
      help.showHelp(['foo'])
      expect(ctx.stdout).to.contain('$ test foo COMMAND')
      expect(ctx.stdout).to.contain(' foo bar  bar command')
    })
})
