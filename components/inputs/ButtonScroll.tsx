import useScrollTo from '@/hooks/useScrollTo'
import styles from '@/styles/components/inputs/ButtonScroll.module.scss'
import { Color } from '@/types/colors'
import { motion, MotionProps } from 'framer-motion'
import React from 'react'
import { ReactComponent as ArrowDown } from '../../public/icons/arrow-down.svg'

interface Props {
    color: Color
    darkMode?: boolean
    pulse?: boolean
    className?: string
    style?: MotionProps['style']
    target?: string
    label: string
}

const ButtonScroll = ({ target, style, className = '', color, darkMode = false, pulse = false, label }: Props) => {
    const scrollTo = useScrollTo()

    return (
        <motion.button
            onClick={() => scrollTo(`.${target ?? className}`)}
            className={`${styles.button} ${className} ${pulse && styles.pulse}`}
            style={
                {
                    '--btn-background-color': `var(--color-${color})`,
                    '--btn-shadow-color': darkMode ? 'rgba(0,0,0,0.15)' : `rgba(var(--color-${color}), 0.25)`,
                    ...style
                } as any
            }
            whileHover={{
                scale: 1.05,
                rotate: 180
            }}
            whileTap={{
                scale: 0.95
            }}
            aria-label={label}
        >
            <ArrowDown />
        </motion.button>
    )
}

export default ButtonScroll
