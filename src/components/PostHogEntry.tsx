import "posthog-js/dist/recorder"
import "posthog-js/dist/surveys"
import "posthog-js/dist/exception-autocapture"
import "posthog-js/dist/tracing-headers"
import "posthog-js/dist/web-vitals"

export {default as posthog} from 'posthog-js/dist/module.no-external'
