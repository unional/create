import { toFolderName } from './toFolderName.js'

test('simple package name', () => {
	expect(toFolderName('abc')).toEqual('abc')
})

test('scoped package returns package name without scope', () => {
	expect(toFolderName('@unional/abc')).toEqual('abc')
})
