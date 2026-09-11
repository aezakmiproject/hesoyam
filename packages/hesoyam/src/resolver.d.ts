export interface HesoyamResolverOptions {
  /**
   * Only resolve components written with this prefix in templates.
   * `prefix: 'Hesoyam'` matches `<HesoyamButton>` and imports `Button`.
   */
  prefix?: string
}

export interface HesoyamResolverResult {
  type: 'component'
  resolve: (name: string) => { name: string, from: string } | undefined
}

export declare function HesoyamResolver(options?: HesoyamResolverOptions): HesoyamResolverResult

export default HesoyamResolver
