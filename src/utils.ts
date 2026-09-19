export type DestinationSupplier = (repo: string, pathInRepo: string) => string;
export type CountryCode = Required<IncomingRequestCfPropertiesGeographicInformation>['country'];

export type RuleItem = {
  default: string | DestinationSupplier;
} & Partial<Record<CountryCode, string | DestinationSupplier>>;
export interface Ruleset {
  [key: string]: RuleItem;
}

export function getDestination(
  repo: string,
  /**
   * The path in the repo (with no slash at the beginning),
   * e.g. `core/os/x86_64/linux-7.2.6.arch2-1-x86_64.pkg.tar.zst`
   */
  pathInRepo: string,
  country: string,
  ruleset: Ruleset,
  defaultFallback: Partial<RuleItem>,
): string | null {
  if (!ruleset[repo]) {
    return null;
  }

  const supply = (supplier: string | DestinationSupplier) => {
    if (typeof supplier === 'string') {
      let destination = supplier;
      if (!destination.endsWith('/')) destination += '/';
      return destination + pathInRepo;
    }
    return supplier(repo, pathInRepo);
  };

  if (country in ruleset[repo]) {
    return supply(ruleset[repo][country as CountryCode]!);
  } else if (country in defaultFallback) {
    return supply(defaultFallback[country as CountryCode]!);
  }
  return supply(ruleset[repo].default);
}
