import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './refresh'
import type { Methods as Methods2 } from './verify'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/token'
  const PATH1 = '/auth/token/refresh'
  const PATH2 = '/auth/token/verify'
  const POST = 'POST'

  return {
    refresh: {
      /**
       * Takes a refresh type JSON web token and returns an access type JSON web
       * token if the refresh token is valid.
       */
      post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json(),
      /**
       * Takes a refresh type JSON web token and returns an access type JSON web
       * token if the refresh token is valid.
       */
      $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    verify: {
      /**
       * Takes a token and indicates if it is valid.  This view provides no
       * information about a token's fitness for a particular use.
       */
      post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option, 'FormData').send(),
      /**
       * Takes a token and indicates if it is valid.  This view provides no
       * information about a token's fitness for a particular use.
       */
      $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option, 'FormData').send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json(),
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
