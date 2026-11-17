import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient.js'

function useSanityQuery(query, params = {}) {
  const [result, setResult] = useState({ requestKey: '', data: null, error: null })
  const [retryCount, setRetryCount] = useState(0)
  const paramsKey = JSON.stringify(params)
  const requestKey = JSON.stringify([query, paramsKey, retryCount])

  useEffect(() => {
    let active = true
    const updateResult = (data, error = null) => {
      if (active) setResult({ requestKey, data, error })
    }

    if (!sanityClient) {
      Promise.resolve().then(() =>
        updateResult(
          null,
          new Error(
            'Sanity is not configured. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET, then restart the app.',
          ),
        ),
      )
    } else {
      sanityClient
        .fetch(query, JSON.parse(paramsKey))
        .then((data) => updateResult(data))
        .catch((requestError) => {
          updateResult(
            null,
            requestError instanceof Error
              ? requestError
              : new Error('The published Sanity content could not be loaded.'),
          )
        })
    }

    return () => {
      active = false
    }
  }, [paramsKey, query, requestKey])

  const isCurrentResult = result.requestKey === requestKey

  return {
    data: isCurrentResult ? result.data : null,
    isLoading: !isCurrentResult,
    error: isCurrentResult ? result.error : null,
    retry: () => setRetryCount((count) => count + 1),
  }
}

export default useSanityQuery
