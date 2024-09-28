export const isDev = process.env.NODE_ENV === 'development'
export const isPreview = process.env.EXPO_PUBLIC_VERCEL_ENV === 'preview'
export const isDevOrPreview = isDev || isPreview

export const TOAST_DURATION = 10000
export const TRANSITION_DURATION = 0.2

export const springTransition = {
  type: 'spring',
  duration: 1,
  bounce: 0.3,
  ease: [-1, -0.23, -0.62, 0],
}

export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export const SLACK_CHANNEL = process.env.SLACK_CHANNEL
