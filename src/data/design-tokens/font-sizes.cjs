const css = `
/* @link https://utopia.fyi/type/calculator?c=328,16,1.125,1724,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,11 */

:root {
  --step--2: clamp(0.72rem, 0.8066rem + -0.0804cqi, 0.7901rem);
  --step--1: clamp(0.8889rem, 0.8863rem + 0.0127cqi, 0.9rem);
  --step-0: clamp(1rem, 0.9706rem + 0.1433cqi, 1.125rem);
  --step-1: clamp(1.125rem, 1.0589rem + 0.3223cqi, 1.4063rem);
  --step-2: clamp(1.2656rem, 1.15rem + 0.5641cqi, 1.7578rem);
  --step-3: clamp(1.4238rem, 1.2421rem + 0.8865cqi, 2.1973rem);
  --step-4: clamp(1.6018rem, 1.3328rem + 1.3121cqi, 2.7466rem);
  --step-5: clamp(1.802rem, 1.4188rem + 1.8696cqi, 3.4332rem);
  --step-6: clamp(2.0273rem, 1.4953rem + 2.5951cqi, 4.2915rem);
  --step-7: clamp(2.2807rem, 1.5562rem + 3.5344cqi, 5.3644rem);
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