import React from 'react';
import BlogEditor from '..';
import axios from 'axios';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('BlogEditor', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => Date.parse('2020-02-14'));
  });
  const updateBlogData = jest.fn();
  const setDialogProps = jest.fn();
  const DATA_SELECTOR = 'MOCK_DATA_SELECTOR';
  let mockDataProps = {
    id: '3',
    title: {
      title: 'MOCK_TITLE',
      department: 'MOCK_DEPARTMENT'
    },
    applications: [{
      avatar: 'avatarURL',
      name: 'Joe'
    }],
    isHidden: true,
    isActive: true,
  }

  it('should mount component successfully', () => {
    const component = mount(<BlogEditor
      mode={'edit'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);

    expect(component).toMatchSnapshot();
  });

  it('should mount component successfully with default values', async () => {
    const component = mount(<BlogEditor />);

    expect(component).toMatchSnapshot();
  });

  it('should add and submit values successfully in add mode', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { id: '3' } });
    const component = mount(<BlogEditor
      mode={'add'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);
    await act(async () => {
      component.find('[data-selector="job-title-field"]').first().simulate('change', { target: { value: 'MOCK_TITLE' } });
      component.find('[data-selector="job-department-field"]').first().simulate('change', { target: { value: 'MOCK_DEPARTMENT' } });
      component.find('[data-selector="submit-addForm"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });

  it('should add and submit values successfully in add mode API ERROR', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue({ error: "MOCK_ERROR" });
    const component = mount(<BlogEditor
      mode={'add'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);
    await act(async () => {
      component.find('[data-selector="job-title-field"]').first().simulate('change', { target: { value: 'MOCK_TITLE' } });
      component.find('[data-selector="job-department-field"]').first().simulate('change', { target: { value: 'MOCK_DEPARTMENT' } });
      component.find('[data-selector="submit-addForm"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });

  it('should edit and submit values successfully in edit mode', async () => {
    jest.spyOn(axios, 'put').mockResolvedValue({ data: { id: '3' } });
    const component = mount(<BlogEditor
      mode={'edit'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);
    await act(async () => {
      component.find('[data-selector="job-title-field"]').first().simulate('change', { target: { value: 'MOCK_TITLE' } });
      component.find('[data-selector="job-department-field"]').first().simulate('change', { target: { value: 'MOCK_DEPARTMENT' } });
      component.find('[data-selector="edit-form-submit"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });

  it('should edit and submit values successfully in edit mode API Error', async () => {
    jest.spyOn(axios, 'put').mockRejectedValue({ error: "MOCK_ERROR" });
    const component = mount(<BlogEditor
      mode={'edit'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);
    await act(async () => {
      component.find('[data-selector="job-title-field"]').first().simulate('change', { target: { value: 'MOCK_TITLE' } });
      component.find('[data-selector="job-department-field"]').first().simulate('change', { target: { value: 'MOCK_DEPARTMENT' } });
      component.find('[data-selector="edit-form-submit"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });

  it('should render view modal', async () => {
    jest.spyOn(axios, 'put').mockRejectedValue({ error: "MOCK_ERROR" });
    const component = mount(<BlogEditor
      mode={'view'}
      updateBlogData={updateBlogData}
      setDialogProps={setDialogProps}
      dataSelector={DATA_SELECTOR}
      data={mockDataProps}
    />);
    expect(component).toMatchSnapshot();
  });
});