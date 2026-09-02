import { generateDisplayedMessage, InMemoryPresenter } from 'clibuilder'
import { showInvalidPackageName } from '.'

test('invalid without reason', () => {
	const ui = new InMemoryPresenter({ name: 'ui' })
	showInvalidPackageName({ ui }, 'invalid-name', [])

	expect(generateDisplayedMessage(ui.display.errorLogs)).toEqual(`'invalid-name' is not a valid npm package name.`)
})

test('invalid with reasons', () => {
	const ui = new InMemoryPresenter({ name: 'ui' })
	showInvalidPackageName({ ui }, 'invalid-name', ['reason-1', 'reason-2'])

	expect(generateDisplayedMessage(ui.display.errorLogs)).toEqual(`'invalid-name' is not a valid npm package name.
  reason-1
  reason-2`)
})
