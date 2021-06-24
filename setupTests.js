import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

global.MutationObserver = class {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    /* Empty Constructor */
  }

  static disconnect() {
    /* Empty method */
  }
};

beforeAll(async () => {
  if (global.gc) {
    global.gc();
  }
});
