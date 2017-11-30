import * as DateUtils from '../Utils/DateUtils';

/*
 * DateUtils
 */
describe('DateUtils:', () => {
  it('convertDateHyphenatedToMilliseconds should return millisec since Epoch', () => {
    expect(DateUtils.convertDateHyphenatedToMilliseconds('2018-01-01')).toEqual(1514764800000);
  });
});
