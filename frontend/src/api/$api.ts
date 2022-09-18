import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './polls/questions'
import type { Methods as Methods1 } from './polls/questions/_id@number'
import type { Methods as Methods2 } from './polls/questions/_question_pk@number/choices'
import type { Methods as Methods3 } from './polls/questions/_question_pk@number/choices/_id@number'
import type { Methods as Methods4 } from './polls/questions/_question_pk@number/choices/_id@number/upvote'
import type { Methods as Methods5 } from './schema'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/polls/questions'
  const PATH1 = '/choices'
  const PATH2 = '/upvote'
  const PATH3 = '/schema'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    polls: {
      questions: {
        _id: (val2: number) => {
          const prefix2 = `${PATH0}/${val2}`

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix2, PATCH, option, 'FormData').json(),
            $patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix2, PATCH, option, 'FormData').json().then(r => r.body),
            /**
             * Questionデータを削除します
             */
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            /**
             * Questionデータを削除します
             */
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`
          }
        },
        _question_pk: (val2: number) => {
          const prefix2 = `${PATH0}/${val2}`

          return {
            choices: {
              _id: (val4: number) => {
                const prefix4 = `${prefix2}${PATH1}/${val4}`

                return {
                  upvote: {
                    post: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, `${prefix4}${PATH2}`, POST, option).json(),
                    $post: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, `${prefix4}${PATH2}`, POST, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix4}${PATH2}`
                  },
                  get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix4, GET, option).json(),
                  $get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                  patch: (option: { body: Methods3['patch']['reqBody'], config?: T | undefined }) =>
                    fetch<Methods3['patch']['resBody'], BasicHeaders, Methods3['patch']['status']>(prefix, prefix4, PATCH, option, 'FormData').json(),
                  $patch: (option: { body: Methods3['patch']['reqBody'], config?: T | undefined }) =>
                    fetch<Methods3['patch']['resBody'], BasicHeaders, Methods3['patch']['status']>(prefix, prefix4, PATCH, option, 'FormData').json().then(r => r.body),
                  delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                  $delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix4, DELETE, option).send().then(r => r.body),
                  $path: () => `${prefix}${prefix4}`
                }
              },
              get: (option?: { query?: Methods2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, `${prefix2}${PATH1}`, GET, option).json(),
              $get: (option?: { query?: Methods2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, `${prefix2}${PATH1}`, GET, option).json().then(r => r.body),
              post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix2}${PATH1}`, POST, option, 'FormData').json(),
              $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix2}${PATH1}`, POST, option, 'FormData').json().then(r => r.body),
              $path: (option?: { method?: 'get' | undefined; query: Methods2['get']['query'] } | undefined) =>
                `${prefix}${prefix2}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          }
        },
        get: (option?: { query?: Methods0['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { query?: Methods0['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json(),
        $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
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
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json(),
      /**
       * OpenApi3 schema for this API. Format can be selected via content negotiation.
       *
       * - YAML: application/vnd.oai.openapi
       * - JSON: application/vnd.oai.openapi+json
       */
      $get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods5['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
