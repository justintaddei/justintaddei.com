import { animate, useViewportScroll } from 'framer-motion'

const useScrollTo = () => {
    const { scrollY } = useViewportScroll()
    return (selector: string) => {
        const { top } = document.querySelector(selector).getBoundingClientRect()
        const currentY = scrollY.get()

        animate(currentY, currentY + top, {
            stiffness: 95,
            damping: 13,
            mass: 1,
            onUpdate: (y) => {
                window.scrollTo(0, y)
            }
        })
    }
}

export default useScrollTo
