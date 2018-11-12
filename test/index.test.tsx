import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { PasswordInput, PasswordInputProps, PasswordInputSettings } from '../src'

describe('PasswordInput', () => {

  /** Snapshot testing */
  it('should render correctly', () => {
    const settings: PasswordInputSettings = {
      colorScheme: {
        levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
        noLevel: "lightgrey"
      },
      height: 3,
      alwaysVisible: false
    };
    const component = renderer.create(
      <PasswordInput
        settings={settings}
      />
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot()
  })
})
