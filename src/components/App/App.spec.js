import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import AppState from './AppState';
describe('App', () => {
    let wrapper;
  
    beforeEach(() => wrapper = shallow(<App />));
  
    it('should render buttons = .progres-bar', () => {
      expect(wrapper.find('.progress-bar').length).toEqual(wrapper.find('button').length);
    });
    it('should render .progress-bar = .filler', () => {
        expect(wrapper.find('.filler').length).toEqual(wrapper.find('.progress-bar').length);
    });
});
