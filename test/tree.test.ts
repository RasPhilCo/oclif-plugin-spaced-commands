import {expect} from '@oclif/test'

import Tree from '../src/tree'

let t: Tree
describe('CommandTree', () => {
  beforeEach(() => {
    // new tree!
    t = new Tree()
  })

  describe('#insert', () => {
    it('inserts a child node', () => {
      t.insert('foo')
      expect(t.nodes.foo).to.be.a('object')
      expect(t.nodes.foo.nodes).to.be.a('object')
    })
  })

  describe('#childSearch', () => {
    it('searches for a child node', () => {
      t.insert('foo')
      expect(t.childSearch('foo')).to.be.a('object')
      expect(t.childSearch('bar')).to.be.undefined
    })
  })

  describe('#findOrInsert', () => {
    it('inserts a child node if not found', () => {
      expect(t.childSearch('bar')).to.be.undefined
      t.findOrInsert('bar')
      expect(t.childSearch('bar')).to.be.a('object')
    })
  })

  // describe('#progressiveChildSearch', () => {
  //   it('finds a node via parents', () => {
  //     expect(t.progressiveChildSearch(['bar'])).to.be.a('object')
  //     expect(t.progressiveChildSearch(['bar', 'baz'])).to.be.a('object')
  //     expect(t.progressiveChildSearch(['bar', 'baz', 'qux'])).to.be.a('object')

  //     expect(t.progressiveChildSearch(['bar', 'foo'])).to.be.undefined
  //     expect(t.progressiveChildSearch(['bar', 'baz', 'qux', 'foo'])).to.be.undefined
  //   })
  // })

  describe('#findMostProgressiveCmd', () => {
    it('finds the deepest node via parents', () => {
      t.findOrInsert('bar')
      let bar = t.nodes.bar
      bar!.insert('baz')
      bar!.nodes.baz.insert('qux')

      let [node, id] = t.findMostProgressiveCmd(['bar', 'baz', 'quck'])
      // returns baz tree
      expect(node).to.be.a('object')
      expect(node!.nodes.qux).to.be.a('object')
      expect(id).to.eql(['bar', 'baz'])
    })
  })
})
