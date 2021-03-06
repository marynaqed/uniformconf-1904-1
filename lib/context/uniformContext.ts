import {
  Context,
  ManifestV2,
  enableContextDevTools,
  ContextPlugin,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import { NextPageContext } from "next";
import manifest from "./manifest.json";
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';
import getConfig from "next/config";

const {
  publicRuntimeConfig: {
    gaTrackingId,
  },
} = getConfig();

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [enableContextDevTools()];

  if (gaTrackingId) {
    plugins.push(enableGoogleGtagAnalytics());
  }

  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: plugins
  });

  return context;
}
