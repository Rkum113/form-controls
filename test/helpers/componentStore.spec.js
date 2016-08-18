/* eslint-disable no-undef */

import { expect } from 'chai';
import { TextBox } from 'components/TextBox.jsx';
import { Label } from 'components/Label.jsx';
import 'src/helpers/componentStore';

describe('ComponentStore', () => {
  beforeEach(() => {
    componentStore.deRegisterComponent('text');
    componentStore.deRegisterComponent('label');
    componentStore.deRegisterComponent('obsControl');
  });

  describe('registerComponent', () => {
    it('should register a component', () => {
      componentStore.registerComponent('text', TextBox);
      expect(componentStore.componentList).to.deep.eql({ text: TextBox });
    });

    it('should override a component if type is same', () => {
      componentStore.registerComponent('text', TextBox);
      expect(componentStore.componentList).to.deep.eql({ text: TextBox });
      componentStore.registerComponent('text', Label);
      expect(componentStore.componentList).to.deep.eql({ text: Label });
    });
  });

  describe('getRegisteredComponent', () => {
    it('should return the registered component', () => {
      componentStore.registerComponent('text', TextBox);
      const registeredComponent = componentStore.getRegisteredComponent('text');
      expect(registeredComponent).to.eql(TextBox);
    });

    it('should return undefined when no matching component found', () => {
      const registeredComponent = componentStore.getRegisteredComponent('something');
      expect(registeredComponent).to.eql(undefined);
    });
  });

  describe('deRegisterComponent', () => {
    it('should deRegisterComponent component', () => {
      componentStore.registerComponent('text', TextBox);
      expect(componentStore.componentList).to.deep.eql({ text: TextBox });
      componentStore.deRegisterComponent('text');
      componentStore.deRegisterComponent('someRandomThing');
      expect(componentStore.componentList).to.deep.eql({});
    });
  });
});
