import React from 'react';
import { mount } from 'enzyme';

import AccordionToggle from '../src/AccordionToggle';

describe('<AccordionToggle>', () => {
  it('Should have button as default component', () => {
    mount(<AccordionToggle eventKey="" />).assertSingle(
      'button[type="button"]',
    );
  });

  it('Should allow rendering as different component', () => {
    mount(<AccordionToggle as="div" eventKey="" />).assertSingle(
      'div.accordion-button',
    );
  });

  // Just to get full coverage on the useAccordionToggle click handler.
  it('Should just work if there is no onSelect or onClick handler', () => {
    const wrapper = mount(<AccordionToggle eventKey="" />);
    wrapper.simulate('click');
  });
});
