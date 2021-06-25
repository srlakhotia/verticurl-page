import {mount} from 'enzyme';
import React from 'react';
import BlogPage from '..';
import axios from 'axios';
import blogData from './__mockData__/blogData';
import { act } from 'react-dom/test-utils';

describe('BlogPage', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({data: blogData});
  });

  it('should do initial render when initial API passes', async () => {
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
    });
    expect(component).toMatchSnapshot();
  });

  it('should do initial render when initial API fails', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({error: 'ERROR'});
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
    });
    expect(component).toMatchSnapshot();
  });

  it('should handle drawer toggle in open state', async () => {
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
      component.find('[data-selector="drawer-toggle-button"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });
});