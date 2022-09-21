import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './auth/csrf'
import type { Methods as Methods1 } from './auth/login'
import type { Methods as Methods2 } from './auth/logout'
import type { Methods as Methods3 } from './auth/ping'
import type { Methods as Methods4 } from './auth/token/refresh'
import type { Methods as Methods5 } from './schema'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/csrf'
  const PATH1 = '/auth/login'
  const PATH2 = '/auth/logout'
  const PATH3 = '/auth/ping'
  const PATH4 = '/auth/token/refresh'
  const PATH5 = '/schema'
  const GET = 'GET'
  const POST = 'POST'

  return {
    auth: {
      csrf: {
        /**
         * CSRFトークンを取得します
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
        /**
         * CSRFトークンを取得します
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      login: {
        /**
         * Check the credentials and return the REST Token
         * if the credentials are valid and authenticated.
         * Calls Django Auth login method to register User ID
         * in Django session framework
         *
         * Accept the following POST parameters: username, password
         * Return the REST Framework Token Object's key.
         */
        post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json(),
        /**
         * Check the credentials and return the REST Token
         * if the credentials are valid and authenticated.
         * Calls Django Auth login method to register User ID
         * in Django session framework
         *
         * Accept the following POST parameters: username, password
         * Return the REST Framework Token Object's key.
         */
        $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      logout: {
        /**
         * Calls Django logout method and delete the Token object
         * assigned to the current User object.
         *
         * Accepts/Returns nothing.
         */
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
        /**
         * Calls Django logout method and delete the Token object
         * assigned to the current User object.
         *
         * Accepts/Returns nothing.
         */
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`
      },
      ping: {
        /**
         * 認証検証用のエンドポイント
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json(),
        /**
         * 認証検証用のエンドポイント
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`
      },
      token: {
        refresh: {
          /**
           * アクセストークンをリフレッシュします
           */
          post: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json(),
          /**
           * アクセストークンをリフレッシュします
           */
          $post: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH4}`
        }
      }
    },
    schema: {
      /**
       * OpenApi3 schema for this API. Format can be selected via content negotiation.
       *
       * - YAML: application/vnd.oai.openapi
       * - JSON: application/vnd.oai.openapi+json
       */
      get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH5, GET, option).json(),
      /**
       * OpenApi3 schema for this API. Format can be selected via content negotiation.
       *
       * - YAML: application/vnd.oai.openapi
       * - JSON: application/vnd.oai.openapi+json
       */
      $get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods5['get']['query'] } | undefined) =>
        `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
