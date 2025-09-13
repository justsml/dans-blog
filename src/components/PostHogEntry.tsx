import { useEffect, useState } from 'react';

// Deferred analytics loading - only load after user interaction
let analyticsLoaded = false;
let posthogInstance: any = null;

const loadAnalytics = async () => {
  if (analyticsLoaded) return posthogInstance;
  
  try {
    // Load core PostHog module first
    const { default: posthog } = await import('posthog-js/dist/module.no-external');
    
    // Load additional modules only after user interaction
    await Promise.all([
      // @ts-expect-error
      import('posthog-js/dist/exception-autocapture') as any,
      // @ts-expect-error
      import('posthog-js/dist/tracing-headers') as any,
      // @ts-expect-error
      import('posthog-js/dist/web-vitals') as any
    ]);
    
    // Defer session recording - heavy feature, load separately
    setTimeout(() => {
      // @ts-expect-error
      import('posthog-js/dist/recorder').catch(console.warn);
    }, 2000);
    
    analyticsLoaded = true;
    posthogInstance = posthog;
    return posthog;
  } catch (error) {
    console.warn('Analytics loading failed:', error);
    return null;
  }
};

// Hook for components that need analytics
export const usePostHog = () => {
  const [isLoaded, setIsLoaded] = useState(analyticsLoaded);
  
  useEffect(() => {
    if (!analyticsLoaded) {
      const handleUserInteraction = () => {
        loadAnalytics().then(() => {
          setIsLoaded(true);
        });
        // Remove listeners after first interaction
        document.removeEventListener('scroll', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
      
      // Load analytics on first user interaction
      document.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });
      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('keydown', handleUserInteraction, { once: true });
      
      // Fallback: load after 3 seconds if no interaction
      const fallbackTimer = setTimeout(() => {
        if (!analyticsLoaded) {
          handleUserInteraction();
        }
      }, 3000);
      
      return () => {
        clearTimeout(fallbackTimer);
        document.removeEventListener('scroll', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, []);
  
  return { posthog: posthogInstance, isLoaded };
};

// Legacy export for backward compatibility
export const posthog = posthogInstance;
export default posthogInstance;
