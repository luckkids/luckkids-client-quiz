import { CSSObject } from '@emotion/styled';
import { Constants } from '@/constants';
import facepaint from 'facepaint';
import { CSSInterpolation } from '@emotion/serialize';

const BREAK_POINTS = {
  MOBILE: Constants.BREAKPOINT_MOBILE,
  TABLET: Constants.BREAKPOINT_TABLET,
  DESKTOP: Constants.BREAKPOINT_DESKTOP,
};

const UNIT = {
  PX: { unit: 'px', reg: new RegExp(/(\d*\.?\d+)px/g) },
  SPX: { unit: 'spx', reg: new RegExp(/(\d*\.?\d+)spx/g) },
  STATIC: { unit: '', reg: null },
};

const fsBreakPoints = facepaint([
  `@media (min-width: ${BREAK_POINTS.MOBILE}px)`,
  `@media (min-width: ${BREAK_POINTS.TABLET}px)`,
  `@media (min-width: ${BREAK_POINTS.DESKTOP}px)`,
]);

function convertPx(
  value: CSSInterpolation,
  breakpoint: number,
  isConvert: boolean = false
) {
  if (!value) return;
  if (typeof value !== 'string') return value;
  const isMobile = breakpoint === BREAK_POINTS.MOBILE;

  let convertValue = value.replace(UNIT.PX.reg, (match, num) => {
    if (isMobile || isConvert) {
      const vw = isMobile
        ? (parseFloat(num) / breakpoint) * 100 * Constants.MQ_RATIO
        : (parseFloat(num) / breakpoint) * 100;
      return `${vw.toFixed(4)}vw`;
    } else {
      return match;
    }
  });

  convertValue = convertValue.replace(UNIT.SPX.reg, '$1px');

  return convertValue;
}

export default function mq(args: CSSObject) {
  const result: CSSObject = {};
  const getCssKey = Object.entries(args);

  const breakPoints = [
    BREAK_POINTS.MOBILE,
    BREAK_POINTS.TABLET,
    BREAK_POINTS.DESKTOP,
  ];

  getCssKey.forEach(([property, value]) => {
    if (!Array.isArray(value)) {
      return (result[property] = value);
    }

    if (value.length === 1) {
      const mobileCss = convertPx(value[0], breakPoints[0]);
      const fixedCss = convertPx(value[0], breakPoints[1], false);

      result[property] = [mobileCss, fixedCss];
    } else {
      result[property] = value.map((item, i) => {
        return convertPx(item, breakPoints[i]);
      });
    }
  });
  return fsBreakPoints(result);
}
