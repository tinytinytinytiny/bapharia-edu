const css = `
/* @link https://utopia.fyi/type/calculator?c=328,16,1.125,1594,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,10 */

:root {
  --step--2: clamp(0.72rem, 0.8083rem + -0.0886vw, 0.7901rem);
  --step--1: clamp(0.8889rem, 0.886rem + 0.014vw, 0.9rem);
  --step-0: clamp(1rem, 0.9676rem + 0.158vw, 1.125rem);
  --step-1: clamp(1.125rem, 1.0521rem + 0.3555vw, 1.4063rem);
  --step-2: clamp(1.2656rem, 1.1381rem + 0.622vw, 1.7578rem);
  --step-3: clamp(1.4238rem, 1.2234rem + 0.9775vw, 2.1973rem);
  --step-4: clamp(1.6018rem, 1.3052rem + 1.4468vw, 2.7466rem);
  --step-5: clamp(1.802rem, 1.3794rem + 2.0615vw, 3.4332rem);
  --step-6: clamp(2.0273rem, 1.4407rem + 2.8616vw, 4.2915rem);
  --step-7: clamp(2.2807rem, 1.4818rem + 3.8973vw, 5.3644rem);
}
`;

const tokens = {};

css.split('{')[1].split('}')[0].split(';')
  .map(x =>
    x
      .replace(/\/\*((?!\*\/).|\n)+\*\/+/g, '')
      .trim()
      .replace('--step-', '')
  )
  .filter(x => x)
  .forEach((x) => {
    const [key, value] = x.split(': ');
    tokens[key] = value;
  });

module.exports = tokens;