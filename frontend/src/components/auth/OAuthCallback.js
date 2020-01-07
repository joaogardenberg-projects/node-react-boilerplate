import React, { useEffect } from 'react'

const OAuthCallback = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({
        type: 'OAUTH',
        payload: window.location.search,
        source: 'oauth-callback'
      })
      window.close()
    }
  })

  return <p>Please wait...</p>
}

export default OAuthCallback
