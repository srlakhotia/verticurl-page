import { mount } from 'enzyme';
import React from 'react';
import BlogPage, { updateBlogData } from '..';
import axios from 'axios';
import blogData from './__mockData__/blogData';
import { act } from 'react-dom/test-utils';

describe('BlogPage', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: blogData });
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => Date.parse('2020-02-14'));
  });

  it('should do initial render when initial API passes', async () => {
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
    });
    expect(component).toMatchSnapshot();
  });

  it('should do initial render when initial API fails', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ error: 'ERROR' });
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

  it('should open blog page with add button', async () => {
    let component = {};
    await act(async () => {
      component = mount(<BlogPage />);
      component.find('[data-selector="add-job"]').first().simulate('click');
    });
    expect(component).toMatchSnapshot();
  });

  describe('table sorting', () => {
    it('should sort field based on invalid sort field', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click'); //ascending
      });
      expect(component).toMatchSnapshot();
    });

    it('should sort field based on title ascending and desending', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-title"]').first();
        titleHeader.simulate('click'); //ascending
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click'); //descending
      expect(component).toMatchSnapshot();
    });

    it('should open view blog', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-title"]').first();
        titleHeader.simulate('click'); //ascending
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click'); //descending
      component.find('[data-selector="view-blog-0"]').first().simulate('click'); //view blog
      expect(component).toMatchSnapshot();
    });
  });

  describe('options drawer actions', () => {
    it('should open options menu', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      expect(component).toMatchSnapshot();
    });

    it('should close options menu', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const editOptionsMenu = component.find('[data-selector="options-menu-item-0"]').first();
      editOptionsMenu.simulate('click');
      expect(component).toMatchSnapshot();
    });

    it('should do edit options menu', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const editOptionsMenu = component.find('[data-selector="options-menu-item-comp-0"]').first();
      editOptionsMenu.simulate('click');
      expect(component).toMatchSnapshot();
    });

    it('should do re-post options menu', async () => {
      jest.spyOn(axios, 'put').mockResolvedValue({ data: { id: '4' } });
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const repostoptionsMenu = component.find('[data-selector="options-menu-item-comp-1"]').first();

      await act(async () => {
        repostoptionsMenu.simulate('click');
      })
      expect(component).toMatchSnapshot();
    });

    it('should do re-post options menu api fail', async () => {
      jest.spyOn(axios, 'put').mockRejectedValue({ err: "MOCK_ERROR" });
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const repostoptionsMenu = component.find('[data-selector="options-menu-item-comp-1"]').first();

      await act(async () => {
        repostoptionsMenu.simulate('click');
      })
      expect(component).toMatchSnapshot();
    });

    it('should do delete options menu', async () => {
      jest.spyOn(axios, 'delete').mockResolvedValue({ data: { id: '4' } });
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const deleteOptionsMenu = component.find('[data-selector="options-menu-item-comp-2"]').first();

      await act(async () => {
        deleteOptionsMenu.simulate('click');
      });

      expect(component).toMatchSnapshot();
    });

    it('should do delete options menu API error', async () => {
      jest.spyOn(axios, 'delete').mockRejectedValue({ error: "MOCK_ERROR" });
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const deleteOptionsMenu = component.find('[data-selector="options-menu-item-comp-2"]').first();

      await act(async () => {
        deleteOptionsMenu.simulate('click');
      });

      expect(component).toMatchSnapshot();
    });

    it('should do hide options menu', async () => {
      jest.spyOn(axios, 'put').mockResolvedValue({ data: { id: '4' } });
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
        const titleHeader = component.find('[data-selector="table-head-options"]').first();
        titleHeader.simulate('click');
      });
      component.find('[data-selector="table-head-title"]').first().simulate('click');
      const optionsMenuNode = component.find('[data-selector="options-menu-4"]').first();
      optionsMenuNode.simulate('click');
      const hideOptionsMenu = component.find('[data-selector="options-menu-item-comp-3"]').first();

      await act(async () => {
        hideOptionsMenu.simulate('click');
      });

      expect(component).toMatchSnapshot();
    });
  });

  describe('updateBlogData()', () => {
    it('should updateBlogData if it is in edit mode', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
      });
      await act(async () => {
        updateBlogData({
          id: '2'
        }, true);
      });
      expect(component).toMatchSnapshot();
    });
    it('should updateBlogData if it is not in edit mode', async () => {
      let component = {};
      await act(async () => {
        component = mount(<BlogPage />);
      });
      await act(async () => {
        updateBlogData({
          id: '42'
        });
      });
      expect(component).toMatchSnapshot();
    });
  });
});