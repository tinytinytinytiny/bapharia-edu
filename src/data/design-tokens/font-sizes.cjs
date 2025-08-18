const css = `
/* @link https://utopia.fyi/type/calculator?c=328,16,1.125,1910,18,1.25,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12,s-l&g=xs,xs,4xl,12 */

:root {
  --step--2: clamp(0.72rem, 0.8047rem + -0.0709cqi, 0.7901rem);
  --step--1: clamp(0.8889rem, 0.8866rem + 0.0112cqi, 0.9rem);
  --step-0: clamp(1rem, 0.9741rem + 0.1264cqi, 1.125rem);
  --step-1: clamp(1.125rem, 1.0667rem + 0.2845cqi, 1.4063rem);
  --step-2: clamp(1.2656rem, 1.1636rem + 0.4978cqi, 1.7578rem);
  --step-3: clamp(1.4238rem, 1.2635rem + 0.7822cqi, 2.1973rem);
  --step-4: clamp(1.6018rem, 1.3645rem + 1.1578cqi, 2.7466rem);
  --step-5: clamp(1.802rem, 1.4638rem + 1.6498cqi, 3.4332rem);
  --step-6: clamp(2.0273rem, 1.5578rem + 2.29cqi, 4.2915rem);
  --step-7: clamp(2.2807rem, 1.6413rem + 3.1188cqi, 5.3644rem);
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