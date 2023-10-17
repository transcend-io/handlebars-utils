// external
import { expect } from 'chai';

// global
import { cases } from '../index';

describe('camelCase', () => {
  it('camelCase', () => {
    expect(cases.camelCase('My Dog Is Nice')).to.equal('myDogIsNice');
  });
});
