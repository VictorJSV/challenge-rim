import { selectUserAge } from './plans.selectors';

describe('selectUserAge', () => {
  it('when user has a valid birthDay, then returns correct age', () => {
    const birthDay = '01-01-' + (new Date().getFullYear() - 25);
    expect(
      selectUserAge({
        user: { birthDay },
      } as any)
    ).toBe(25);
  });

  it('when user has no birthDay, then returns null', () => {
    expect(
      selectUserAge({
        user: { birthDay: undefined },
      } as any)
    ).toBeNull();
  });
});
