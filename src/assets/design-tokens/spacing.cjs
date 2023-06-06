const css = `
/* @link https://utopia.fyi/space/calculator?c=328,16,1.125,1530,18,1.25,9,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=s,s,3xl,9 */

:root {
  --space-3xs: clamp(0.25rem, calc(0.23rem + 0.08vw), 0.31rem);
  --space-2xs: clamp(0.50rem, calc(0.48rem + 0.08vw), 0.56rem);
  --space-xs: clamp(0.75rem, calc(0.72rem + 0.17vw), 0.88rem);
  --space-s: clamp(1.00rem, calc(0.97rem + 0.17vw), 1.13rem);
  --space-m: clamp(1.50rem, calc(1.45rem + 0.25vw), 1.69rem);
  --space-l: clamp(2.00rem, calc(1.93rem + 0.33vw), 2.25rem);
  --space-xl: clamp(3.00rem, calc(2.90rem + 0.50vw), 3.38rem);
  --space-2xl: clamp(4.00rem, calc(3.86rem + 0.67vw), 4.50rem);
  --space-3xl: clamp(6.00rem, calc(5.80rem + 1.00vw), 6.75rem);
  --space-4xl: clamp(8.00rem, calc(7.73rem + 1.33vw), 9.00rem);
  --space-5xl: clamp(12.00rem, calc(11.59rem + 2.00vw), 13.50rem);

  /* One-up pairs */
  --space-3xs-2xs: clamp(0.25rem, calc(0.16rem + 0.42vw), 0.56rem);
  --space-2xs-xs: clamp(0.50rem, calc(0.40rem + 0.50vw), 0.88rem);
  --space-xs-s: clamp(0.75rem, calc(0.65rem + 0.50vw), 1.13rem);
  --space-s-m: clamp(1.00rem, calc(0.81rem + 0.92vw), 1.69rem);
  --space-m-l: clamp(1.50rem, calc(1.30rem + 1.00vw), 2.25rem);
  --space-l-xl: clamp(2.00rem, calc(1.62rem + 1.83vw), 3.38rem);
  --space-xl-2xl: clamp(3.00rem, calc(2.59rem + 2.00vw), 4.50rem);
  --space-2xl-3xl: clamp(4.00rem, calc(3.25rem + 3.66vw), 6.75rem);
  --space-3xl-4xl: clamp(6.00rem, calc(5.18rem + 3.99vw), 9.00rem);
  --space-4xl-5xl: clamp(8.00rem, calc(6.50rem + 7.32vw), 13.50rem);

  /* Custom pairs */
  --space-s-l: clamp(1.00rem, calc(0.66rem + 1.66vw), 2.25rem);
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
  });

function remToPx(string) {
  const matchRem = new RegExp(/[+-]?(\d*|\d{1,3}(,\d{3})*)(\.\d+)?(rem)/, 'g');
  const convertToPx = (x) => `${Math.round(Number(x.split('rem')[0]) * 16)}px`;
  return string.replaceAll(matchRem, convertToPx);
}

module.exports = tokens;  