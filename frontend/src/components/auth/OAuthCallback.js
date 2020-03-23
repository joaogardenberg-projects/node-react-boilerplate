import React, { useEffect } from 'react'
import { t } from 'ttag'

export default function OAuthCallback() {
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
