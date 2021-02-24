import { useEffect } from 'react'

type IntersectionStateChangeHandler = (target: Element, isIntersecting: boolean) => void

export const useIntersectionObserver = (onIntersectionStateChange: IntersectionStateChangeHandler) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                onIntersectionStateChange(entry.target, entry.isIntersecting)
            }
        })

        for (const element of Array.from(document.querySelectorAll('.js-observed'))) {
            observer.observe(element)
        }

        return () => observer.disconnect()
    }, [])
}
