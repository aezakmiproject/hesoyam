import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarBadge } from './AvatarBadge.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarGroup } from './AvatarGroup.vue'
export { default as AvatarGroupCount } from './AvatarGroupCount.vue'
export { default as AvatarImage } from './AvatarImage.vue'
export { default as AvatarWithIcon } from './AvatarWithIcon.vue'
export { default as BitbucketAvatar } from './BitbucketAvatar.vue'
export { default as GitHubAvatar } from './GitHubAvatar.vue'
export { default as GitLabAvatar } from './GitLabAvatar.vue'

export const avatarVariants = cva(
  'group/avatar relative flex shrink-0 select-none overflow-hidden rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-[var(--ds-gray-alpha-400)] after:mix-blend-darken dark:after:mix-blend-lighten',
  {
    variants: {
      size: {
        sm: 'size-6',
        default: 'size-8',
        lg: 'size-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariants>

export interface AvatarMember {
  username?: string
  src?: string
  letter?: string
  title?: string
}

export function resolveAvatarSize(size?: number | AvatarVariants['size']): number {
  if (typeof size === 'number')
    return size
  if (size === 'sm')
    return 24
  if (size === 'lg')
    return 48
  return 32
}

export function vercelAvatarSrc(username: string, size: number) {
  return `https://vercel.com/api/www/avatar?u=${encodeURIComponent(username)}&s=${size * 2}`
}
