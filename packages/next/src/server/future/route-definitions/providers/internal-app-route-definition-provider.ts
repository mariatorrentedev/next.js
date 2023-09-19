import type { PagesManifest } from '../../../../build/webpack/plugins/pages-manifest-plugin'
import type { InternalAppRouteDefinition } from '../internal-route-definition'
import type { ManifestLoader } from '../../manifests/loaders/manifest-loader'
import type { AppPathManifests } from '../../manifests/manifests'

import { isInternalAppRoute } from '../../../../lib/is-internal-app-route'
import { APP_PATHS_MANIFEST } from '../../../../shared/lib/constants'
import { AppFilenameNormalizer } from '../../normalizers/built/app/app-filename-normalizer'
import { InternalAppRouteDefinitionBuilder } from '../builders/internal-app-route-definition-builder'
import { RouteKind } from '../../route-kind'
import { ManifestRouteDefinitionProvider } from './helpers/manifest-route-definition-provider'

export class InternalAppRouteDefinitionProvider extends ManifestRouteDefinitionProvider<
  InternalAppRouteDefinition,
  AppPathManifests
> {
  public readonly kind = RouteKind.INTERNAL_APP
  private readonly normalizer: AppFilenameNormalizer

  constructor(
    distDir: string,
    private readonly pageExtensions: ReadonlyArray<string>,
    manifestLoader: ManifestLoader<AppPathManifests>
  ) {
    super(APP_PATHS_MANIFEST, manifestLoader)

    this.normalizer = new AppFilenameNormalizer(distDir)
  }

  protected transform(
    manifest: PagesManifest
  ): ReadonlyArray<InternalAppRouteDefinition> {
    // The manifest consists of a map of all the pages to their bundles. Let's
    // filter out all the pages that are not app pages.
    const pages = Object.keys(manifest).filter((page) =>
      isInternalAppRoute(page)
    )

    const builder = new InternalAppRouteDefinitionBuilder(this.pageExtensions)
    for (const page of pages) {
      const filename = this.normalizer.normalize(manifest[page])

      builder.add({ page, filename, builtIn: false })
    }

    return builder.build()
  }
}