import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { session }, cookies, url }) => {
  return {
    url: url.origin,
    cookies: cookies.getAll(),
    session
  }
}
