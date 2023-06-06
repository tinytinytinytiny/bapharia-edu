const css = `
/* @link https://utopia.fyi/type/calculator?c=328,16,1.125,1530,18,1.25,9,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,s,3xl,12 */

:root {
  --step--2: clamp(0.72rem, calc(0.81rem + -0.09vw), 0.79rem);
  --step--1: clamp(0.89rem, calc(0.89rem + 0.01vw), 0.90rem);
  --step-0: clamp(1.00rem, calc(0.97rem + 0.17vw), 1.13rem);
  --step-1: clamp(1.13rem, calc(1.05rem + 0.37vw), 1.41rem);
  --step-2: clamp(1.27rem, calc(1.13rem + 0.66vw), 1.76rem);
  --step-3: clamp(1.42rem, calc(1.21rem + 1.03vw), 2.20rem);
  --step-4: clamp(1.60rem, calc(1.29rem + 1.52vw), 2.75rem);
  --step-5: clamp(1.80rem, calc(1.36rem + 2.17vw), 3.43rem);
  --step-6: clamp(2.03rem, calc(1.41rem + 3.01vw), 4.29rem);
  --step-7: clamp(2.28rem, calc(1.44rem + 4.10vw), 5.36rem);
  --step-8: clamp(2.57rem, calc(1.44rem + 5.51vw), 6.71rem);
  --step-9: clamp(2.89rem, calc(1.39rem + 7.32vw), 8.38rem);
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