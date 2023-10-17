// external
import { expect } from 'chai';

// global
import { TODO } from '../index';

describe('RequestAction contains ACCESS', () => {
  it('should test', () => {
    expect(Object.values(TODO).length).to.equal(0);
  });
});
