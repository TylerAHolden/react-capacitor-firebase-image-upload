export const oxfordJoinArray = (
  arr: string[],
  conjunction: 'and' | 'or' | '&',
  ifempty: any
) => {
  let l = arr.length;
  if (!l) return ifempty;
  if (l < 2) return arr[0];
  if (l < 3) return arr.join(` ${conjunction} `);
  arr = arr.slice();
  arr[l - 1] = `${conjunction} ${arr[l - 1]}`;
  return arr.join(', ');
};
