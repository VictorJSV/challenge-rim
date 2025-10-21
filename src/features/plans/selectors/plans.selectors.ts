import dayjs from 'dayjs';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';

export const selectUserAge = createSelector(
  (state: RootState) => state.user,
  (user) => {
    if (!user.birthDay) return null;
    const result = dayjs(user.birthDay, 'DD-MM-YYYY');
    return result.isValid() ? dayjs().diff(result, 'year') : null;
  }
);
