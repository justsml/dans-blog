import type { PostHogConfig } from "posthog-js/dist/module.no-external";

export const POSTHOG_TOKEN = "phc_JODNIixGF47WMcySFGQwT2YS7z6ZD5uqk7Tj3KmAqP9";

export const POSTHOG_CONFIG = {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-01-30",
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: false,
  capture_dead_clicks: false,
  capture_exceptions: false,
  capture_heatmaps: false,
  capture_performance: false,
  disable_external_dependency_loading: true,
  disable_scroll_properties: true,
  disable_session_recording: true,
  disable_surveys: true,
  disable_surveys_automatic_display: true,
  person_profiles: "identified_only",
  advanced_disable_flags: true,
} satisfies Partial<PostHogConfig>;
