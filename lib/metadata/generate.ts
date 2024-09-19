import type { ApiData, Metadata } from './types';
import type { RouteParams } from 'nextjs/types';

import type { Route } from 'nextjs-routes';

import config from 'configs/app';
import getNetworkTitle from 'lib/networks/getNetworkTitle';

import compileValue from './compileValue';
import getCanonicalUrl from './getCanonicalUrl';
import getPageOgType from './getPageOgType';
import * as templates from './templates';

export default function generate<Pathname extends Route['pathname']>(route: RouteParams<Pathname>, apiData: ApiData<Pathname> = null): Metadata {
  const params = {
    ...route.query,
    ...apiData,
    network_name: config.chain.name,
    network_title: getNetworkTitle(),
  };

  const title = compileValue(templates.title.make(route.pathname, Boolean(apiData)), params);
  const description = compileValue(templates.description.make(route.pathname), params);

  const pageOgType = getPageOgType(route.pathname);

  return {
    title: title,
    description,
    opengraph: {
      title: config.meta.og.title || title,
      description: pageOgType !== 'Regular page' ? config.meta.og.description : '',
      imageUrl: config.meta.og.imageUrl,
    },
    canonical: getCanonicalUrl(route.pathname),
  };
}
