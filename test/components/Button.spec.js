import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Button } from 'components/Button.jsx';
import sinon from 'sinon';
import constants from 'src/constants';

chai.use(chaiEnzyme());

describe('Button Component', () => {
  const value = true;
  const options = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];

  let valueChangeSpy;

  beforeEach(() => {
    valueChangeSpy = sinon.spy();
  });

  it('should render button component', () => {
    const wrapper = shallow(
      <Button onValueChange={valueChangeSpy} options={options} validations={[]} />
    );
    expect(wrapper).to.have.exactly(2).descendants('button');

    expect(wrapper.find('button').at(0).text()).to.eql('Yes');
    expect(wrapper.find('button').at(1).text()).to.eql('No');

    expect(wrapper.find('button').at(0)).to.have.className('fl');
    expect(wrapper.find('button').at(1)).to.have.className('fl');

    expect(wrapper).to.have.className('form-control-buttons');
  });

  it('should render button with default value', () => {
    const wrapper = shallow(
     <Button
       onValueChange={valueChangeSpy}
       options={options}
       validations={[]}
       value={value}
     />
    );
    expect(wrapper.find('button').at(0)).to.have.className('fl active');
    expect(wrapper.find('button').at(1)).to.have.className('fl');
  });

  it('should change the value on click', () => {
    const wrapper = shallow(
      <Button
        onValueChange={valueChangeSpy}
        options={options}
        validations={[]}
        value={value}
      />
    );
    expect(wrapper.find('button').at(0)).to.have.className('fl active');
    expect(wrapper.find('button').at(1)).to.have.className('fl');

    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('button').at(0)).to.have.className('fl');
    expect(wrapper.find('button').at(1)).to.have.className('fl active');
    sinon.assert.calledOnce(valueChangeSpy.withArgs(false, []));
  });

  it('should change the value to undefined if double clicked', () => {
    const wrapper = shallow(
      <Button onValueChange={valueChangeSpy} options={options} validations={[]} />
    );
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(valueChangeSpy.withArgs(false, []));

    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(valueChangeSpy.withArgs(undefined, []));
  });

  it('should throw validation error on change if present', () => {
    const validations = [constants.validations.mandatory];
    const wrapper = shallow(
      <Button
        onValueChange={valueChangeSpy}
        options={options}
        validations={validations}
      />
    );
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper).to.have.className('form-control-buttons');

    wrapper.find('button').at(1).simulate('click');
    expect(wrapper).to.have.className('form-control-buttons form-builder-error');
  });

  it('should not reRender if value is same', () => {
    const wrapper = shallow(
      <Button
        onValueChange={valueChangeSpy}
        options={options}
        validations={[]}
        value={value}
      />
    );
    expect(wrapper.find('button').at(0)).to.have.className('fl active');
    expect(wrapper.find('button').at(1)).to.have.className('fl');

    wrapper.setProps({ value: true });

    expect(wrapper.find('button').at(0)).to.have.className('fl active');
    expect(wrapper.find('button').at(1)).to.have.className('fl');
  });

  it('should validate Button when component updates', () => {
    const validations = [constants.validations.mandatory];
    const onChangeMockObj = { onValueChange: () => {} };
    const onChangeMock = sinon.mock(onChangeMockObj);
    onChangeMock.expects('onValueChange').once().withArgs(undefined, [{ errorType: 'mandatory' }]);
    const wrapper = mount(
      <Button
        onValueChange={onChangeMockObj.onValueChange}
        options={options}
        validations={validations}
        value
      />
    );
    wrapper.setState({ value: undefined, hasErrors: true });

    onChangeMock.verify();
    expect(wrapper).to.have.className('form-control-buttons');
    expect(wrapper).to.have.className('form-builder-error');
  });
});
