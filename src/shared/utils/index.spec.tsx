import { classes, markBoldWords } from './index';
import { render } from '@testing-library/react';

describe('classes utility', () => {
  test('when given multiple class names, then returns them joined by space', () => {
    expect(classes('a', 'b', 'c')).toBe('a b c');
  });

  test('when given falsy values, then filters them out', () => {
    expect(classes('a', false, null, undefined, 'b')).toBe('a b');
  });
});

describe('markBoldWords utility', () => {
  test('when wordRange is "all", then wraps all text in <strong>', () => {
    const { container } = render(markBoldWords('hello world', 'all'));
    expect(container.querySelector('strong')?.textContent).toBe('hello world');
  });

  test('when wordRange is [1,1], then bolds only the second word', () => {
    const { container } = render(markBoldWords('hello world test', [1, 1]));
    expect(container.textContent).toBe('hello world test');
    expect(container.querySelector('strong')?.textContent).toBe('world');
  });
  
  test('when start is 0 and end is last index, then bolds all words', () => {
    const text = 'one two three';
    const { container } = render(markBoldWords(text, [0, 2]));
    expect(container.querySelector('strong')?.textContent).toBe(text);
  });
});