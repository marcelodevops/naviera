import {
  Anchor,
  ArrowRight,
  Building2,
  Check,
  FileCheck,
  GitBranch,
  Info,
  LogIn,
  Mail,
  Menu,
  PackagePlus,
  Ship,
  Truck,
  X,
  XCircle,
} from 'lucide';

const iconMap = {
  anchor: Anchor,
  'arrow-right': ArrowRight,
  'building-2': Building2,
  building: Building2,
  check: Check,
  'file-check': FileCheck,
  'git-branch': GitBranch,
  info: Info,
  'log-in': LogIn,
  mail: Mail,
  menu: Menu,
  'package-plus': PackagePlus,
  ship: Ship,
  truck: Truck,
  x: X,
  'x-circle': XCircle,
};

export function renderIconSvg(rawName, { width = 24, height = 24, class: className = '', ...attrs } = {}) {
  const name = String(rawName ?? '').replace(/^lucide:/, '').toLowerCase();
  const iconNode = iconMap[name];
  if (!iconNode) return '';

  const attrEntries = Object.entries({
    xmlns: 'http://www.w3.org/2000/svg',
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...(className ? { class: className } : {}),
    ...attrs,
  });

  const attrsString = attrEntries.map(([k, v]) => `${k}="${v}"`).join(' ');
  const innerSvg = iconNode
    .map(([tag, elAttrs]) => {
      const elAttrsString = Object.entries(elAttrs).map(([k, v]) => `${k}="${v}"`).join(' ');
      return `<${tag} ${elAttrsString}/>`;
    })
    .join('');

  return `<svg ${attrsString}>${innerSvg}</svg>`;
}
