import { match } from 'assert'
import { useEffect, useState } from 'react'

export const useMatchMedia = (query: string) => {
    const [matches, setMatches] = useState(false)

    if (typeof window !== 'undefined') {
        useEffect(() => {
            const mq = window.matchMedia(query)

            setMatches(mq.matches)

            const updateMatches = (e) => {
                setMatches(e.matches)
            }

            mq.addEventListener('change', updateMatches)

            return () => mq.removeEventListener('change', updateMatches)
        })
    }

    return matches
}
