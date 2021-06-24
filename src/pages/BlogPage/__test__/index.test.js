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

  it('should do initial render', async () => {
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
    });
    expect(component).toMatchSnapshot();
  });
});