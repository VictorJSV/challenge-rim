import { PropsWithChildren } from 'react';
import { classes } from '@src/shared/utils';
import './Tag.scss';

interface TagProps {
  type: 'accent';
}

const Tag = ({ type, children }: PropsWithChildren<TagProps>) => {
  return <span className={classes('c-tag', type && `c-tag--${type}`)}>{children}</span>;
};

export default Tag;
