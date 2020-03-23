import React, { useEffect } from 'react'
import { t } from 'ttag'

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

  return <p>{t`Please wait`}...</p>
}

export default OAuthCallback
