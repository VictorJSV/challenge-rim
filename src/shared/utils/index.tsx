export const classes = (...classNames: (string | false | null | undefined)[]) => {
  return classNames.filter(Boolean).join(' ');
};

export const markBoldWords = (text: string, wordRange: number[] | 'all'): JSX.Element => {
  if (!text.trim() || !wordRange.length) return <>{text}</>;
  
  if (wordRange === 'all') {
    return <strong>{text}</strong>;
  }
  
  const words = text.split(' ');
  const [start, end] = wordRange;
  
  return (
    <>
      {words.slice(0, start).join(' ')}{start > 0 && ' '}
      <strong>{words.slice(start, end + 1).join(' ')}</strong>
      {end < words.length - 1 && ' '}{words.slice(end + 1).join(' ')}
    </>
  );
};