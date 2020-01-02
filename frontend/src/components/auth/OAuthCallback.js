import React, { useEffect } from 'react'

const OAuthCallback = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(window.location.search)
      window.close()
    }
  })

  return <p>Please wait...</p>
}

export default OAuthCallback
