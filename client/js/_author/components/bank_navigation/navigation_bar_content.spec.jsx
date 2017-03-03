import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import NavigationBarContent       from './navigation_bar_content';

describe('navigationBarContent', () => {
  let result;
  let props;
  let updater;

  beforeEach(() => {
    updater = false;
    props = {
      view: 'banks',
      path: ['123', '345', '567'],
      currentBankId: 123456,
      updatePath: () => { updater = true; }
    };

    result = TestUtils.renderIntoDocument(<Stub><NavigationBarContent {...props} /></Stub>);
  });

  it('it button has correct className', () => {
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons[0].className).toBe('author--c-btn author--c-btn--breadcrumb');

    props.currentBankId = null;
    result = TestUtils.renderIntoDocument(<Stub><NavigationBarContent {...props} /></Stub>);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons[0].className).toBe('author--c-btn author--c-btn--breadcrumb is-active');
  });

  it('it clicks button for updatePath', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[0]);
    expect(updater).toBeTruthy();
  });

});