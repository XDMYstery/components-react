import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import BackTop from '../../src/BackTop';

configure({ adapter: new Adapter() });

describe('BackTop', () => {
  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop />);
    document.documentElement.scrollTop = 401;
    (wrapper.instance() as any).handleScroll();
    wrapper.find(BackTop).simulate('click');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(Math.abs(Math.round(document.documentElement.scrollTop))).toBe(0);
  });
});
