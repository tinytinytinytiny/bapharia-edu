const css = `
/* @link https://utopia.fyi/space/calculator?c=328,16,1.125,1594,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,10 */

:root {
  --space-3xs: clamp(0.25rem, 0.2338rem + 0.079vw, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.4838rem + 0.079vw, 0.5625rem);
  --space-xs: clamp(0.75rem, 0.7176rem + 0.158vw, 0.875rem);
  --space-s: clamp(1rem, 0.9676rem + 0.158vw, 1.125rem);
  --space-m: clamp(1.5rem, 1.4514rem + 0.237vw, 1.6875rem);
  --space-l: clamp(2rem, 1.9352rem + 0.316vw, 2.25rem);
  --space-xl: clamp(3rem, 2.9028rem + 0.4739vw, 3.375rem);
  --space-2xl: clamp(4rem, 3.8705rem + 0.6319vw, 4.5rem);
  --space-3xl: clamp(6rem, 5.8057rem + 0.9479vw, 6.75rem);
  --space-4xl: clamp(8rem, 7.7409rem + 1.2638vw, 9rem);
  --space-5xl: clamp(12rem, 11.6114rem + 1.8957vw, 13.5rem);

  /* One-up pairs */
  --space-3xs-2xs: clamp(0.25rem, 0.169rem + 0.3949vw, 0.5625rem);
  --space-2xs-xs: clamp(0.5rem, 0.4028rem + 0.4739vw, 0.875rem);
  --space-xs-s: clamp(0.75rem, 0.6528rem + 0.4739vw, 1.125rem);
  --space-s-m: clamp(1rem, 0.8219rem + 0.8689vw, 1.6875rem);
  --space-m-l: clamp(1.5rem, 1.3057rem + 0.9479vw, 2.25rem);
  --space-l-xl: clamp(2rem, 1.6438rem + 1.7378vw, 3.375rem);
  --space-xl-2xl: clamp(3rem, 2.6114rem + 1.8957vw, 4.5rem);
  --space-2xl-3xl: clamp(4rem, 3.2875rem + 3.4755vw, 6.75rem);
  --space-3xl-4xl: clamp(6rem, 5.2227rem + 3.7915vw, 9rem);
  --space-4xl-5xl: clamp(8rem, 6.575rem + 6.951vw, 13.5rem);

  /* Custom pairs */
  --space-s-l: clamp(1rem, 0.6761rem + 1.5798vw, 2.25rem);
}
`;

const tokens = {
  '0': '0'
};

css.split('{')[1].split('}')[0].split(';')
  .map(x =>
    x
      .replace(/\/\*((?!\*\/).|\n)+\*\/+/g, '')
      .trim()
      .replace('--space-', '')
  )
  .filter(x => x)
  .forEach((x) => {
    const [key, value] = x.split(': ');
    tokens[key] = remToPx(value);
    tokens[`${key}-rem`] = value;
  });

function remToPx(string) {
  const matchRem = new RegExp(/[+-]?(\d*|\d{1,3}(,\d{3})*)(\.\d+)?(rem)/, 'g');
  const convertToPx = (x) => `${Math.round(Number(x.split('rem')[0]) * 16)}px`;
  return string.replaceAll(matchRem, convertToPx);
}

module.exports = tokens;  