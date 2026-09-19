import { RuleItem, Ruleset } from './utils';

export const ruleset = {
  archlinux: {
    default: 'https://geo.mirror.pkgbuild.com',
  },
  archlinuxcn: {
    default: 'https://repo.archlinuxcn.org',
  },
  cachyos: {
    default: 'https://cdn77.cachyos.org',
  },
} satisfies Ruleset;

export const defaultFallback = {
  CN: (r, p) => `https://mirrors.cernet.edu.cn/${r}/${p}`,
} satisfies Partial<RuleItem>;
