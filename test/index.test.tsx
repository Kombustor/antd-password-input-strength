import * as React from 'react'
import * as renderer from 'react-test-renderer'
import {PasswordInput} from '../src'

describe('PasswordInput', () => {

  /** Snapshot testing */
  it('should render correctly', () => {
    const component = renderer.create(
      <PasswordInput />
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot()
  })
})
