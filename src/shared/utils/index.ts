export const classes = (...classNames: (string | false | null | undefined)[]) => {
  return classNames.filter(Boolean).join(' ');
};
