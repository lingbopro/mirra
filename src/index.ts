import { defaultFallback, ruleset } from './ruleset';
import { getDestination } from './utils';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const path = new URL(request.url).pathname;
    const country = request.headers.get('X-Country')?.toUpperCase() ?? request.cf?.country;
    if (path === '/') {
      return new Response(
        JSON.stringify(
          {
            country: country,
            repos: Object.keys(ruleset),
          },
          null,
          2,
        ),
      );
    }

    const repoName = path.slice(1).split('/')[0];
    if (!(repoName in ruleset)) {
      return new Response('Route Not Found', { status: 404 });
    }

    const pathInRepo = path.slice(repoName.length + 2);
    const target = getDestination(repoName, pathInRepo, country!, ruleset, defaultFallback);
    if (!target) {
      return new Response('Failed to find destination', { status: 500 });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: target,
        'X-Repo-Name': repoName,
        'X-Path-In-Repo': pathInRepo,
        ...(country ? { 'X-Country': country } : {}),
      },
    });
  },
} satisfies ExportedHandler<Env>;
