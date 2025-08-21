const css = `
/* @link https://utopia.fyi/space/calculator?c=328,16,1.125,1724,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,11 */

:root {
  --space-3xs: clamp(0.25rem, 0.2353rem + 0.0716vw, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.4853rem + 0.0716vw, 0.5625rem);
  --space-xs: clamp(0.75rem, 0.7206rem + 0.1433vw, 0.875rem);
  --space-s: clamp(1rem, 0.9706rem + 0.1433vw, 1.125rem);
  --space-m: clamp(1.5rem, 1.4559rem + 0.2149vw, 1.6875rem);
  --space-l: clamp(2rem, 1.9413rem + 0.2865vw, 2.25rem);
  --space-xl: clamp(3rem, 2.9119rem + 0.4298vw, 3.375rem);
  --space-2xl: clamp(4rem, 3.8825rem + 0.5731vw, 4.5rem);
  --space-3xl: clamp(6rem, 5.8238rem + 0.8596vw, 6.75rem);
  --space-4xl: clamp(8rem, 7.765rem + 1.1461vw, 9rem);
  --space-5xl: clamp(12rem, 11.6476rem + 1.7192vw, 13.5rem);

  /* One-up pairs */
  --space-3xs-2xs: clamp(0.25rem, 0.1766rem + 0.3582vw, 0.5625rem);
  --space-2xs-xs: clamp(0.5rem, 0.4119rem + 0.4298vw, 0.875rem);
  --space-xs-s: clamp(0.75rem, 0.6619rem + 0.4298vw, 1.125rem);
  --space-s-m: clamp(1rem, 0.8385rem + 0.788vw, 1.6875rem);
  --space-m-l: clamp(1.5rem, 1.3238rem + 0.8596vw, 2.25rem);
  --space-l-xl: clamp(2rem, 1.6769rem + 1.5759vw, 3.375rem);
  --space-xl-2xl: clamp(3rem, 2.6476rem + 1.7192vw, 4.5rem);
  --space-2xl-3xl: clamp(4rem, 3.3539rem + 3.1519vw, 6.75rem);
  --space-3xl-4xl: clamp(6rem, 5.2951rem + 3.4384vw, 9rem);
  --space-4xl-5xl: clamp(8rem, 6.7077rem + 6.3037vw, 13.5rem);

  /* Custom pairs */
  --space-s-l: clamp(1rem, 0.7063rem + 1.4327vw, 2.25rem);
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
    tokens[`${key}-cqi-rem`] = vwToCqi(value);
  });

function remToPx(string) {
  const matchRem = new RegExp(/[+-]?(\d*|\d{1,3}(,\d{3})*)(\.\d+)?(rem)/, 'g');
  const convertToPx = (x) => `${Math.round(Number(x.split('rem')[0]) * 16)}px`;
  return string.replaceAll(matchRem, convertToPx);
}

function vwToCqi(string) {
  const matchVw = new RegExp(/(?<=\d)vw/, 'g');
  return string.replaceAll(matchVw, 'cqi');
}

module.exports = tokens;  