export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/geist' || to.path === '/geist/')
    return navigateTo('/', { redirectCode: 301 })
  if (to.path.startsWith('/geist/'))
    return navigateTo(to.path.slice('/geist'.length) || '/', { redirectCode: 301 })
  if (to.path === '/add-to-home' || to.path === '/add-to-home/')
    return navigateTo('/', { redirectCode: 301 })
})
