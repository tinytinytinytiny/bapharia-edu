const css = `
/* @link https://utopia.fyi/space/calculator?c=328,16,1.125,1910,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,12 */

:root {
  --space-3xs: clamp(0.25rem, 0.237rem + 0.0632vw, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.487rem + 0.0632vw, 0.5625rem);
  --space-xs: clamp(0.75rem, 0.7241rem + 0.1264vw, 0.875rem);
  --space-s: clamp(1rem, 0.9741rem + 0.1264vw, 1.125rem);
  --space-m: clamp(1.5rem, 1.4611rem + 0.1896vw, 1.6875rem);
  --space-l: clamp(2rem, 1.9482rem + 0.2528vw, 2.25rem);
  --space-xl: clamp(3rem, 2.9223rem + 0.3793vw, 3.375rem);
  --space-2xl: clamp(4rem, 3.8963rem + 0.5057vw, 4.5rem);
  --space-3xl: clamp(6rem, 5.8445rem + 0.7585vw, 6.75rem);
  --space-4xl: clamp(8rem, 7.7927rem + 1.0114vw, 9rem);
  --space-5xl: clamp(12rem, 11.689rem + 1.5171vw, 13.5rem);

  /* One-up pairs */
  --space-3xs-2xs: clamp(0.25rem, 0.1852rem + 0.3161vw, 0.5625rem);
  --space-2xs-xs: clamp(0.5rem, 0.4223rem + 0.3793vw, 0.875rem);
  --space-xs-s: clamp(0.75rem, 0.6723rem + 0.3793vw, 1.125rem);
  --space-s-m: clamp(1rem, 0.8575rem + 0.6953vw, 1.6875rem);
  --space-m-l: clamp(1.5rem, 1.3445rem + 0.7585vw, 2.25rem);
  --space-l-xl: clamp(2rem, 1.7149rem + 1.3906vw, 3.375rem);
  --space-xl-2xl: clamp(3rem, 2.689rem + 1.5171vw, 4.5rem);
  --space-2xl-3xl: clamp(4rem, 3.4298rem + 2.7813vw, 6.75rem);
  --space-3xl-4xl: clamp(6rem, 5.378rem + 3.0341vw, 9rem);
  --space-4xl-5xl: clamp(8rem, 6.8597rem + 5.5626vw, 13.5rem);

  /* Custom pairs */
  --space-s-l: clamp(1rem, 0.7408rem + 1.2642vw, 2.25rem);
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