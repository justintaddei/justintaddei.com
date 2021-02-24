import { useState } from 'react'

export function useForceRender(debug = false) {
    const [renderCount, setRenderCount] = useState(0)

    if (debug) console.log('[useForceRender] renderCount: ', renderCount)

    return () => setRenderCount((renderCount) => renderCount + 1)
}
