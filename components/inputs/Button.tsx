import styles from '@/styles/components/inputs/Button.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import useWave from 'use-wave'

interface Props {
    to: string
    look?: 'flat' | 'green' | 'blue'
    children: ReactNode
    className?: string
}

const Button = ({ to, look: style = 'flat', className, children }: Props) => {
    const wave = useWave()
    return (
        <Link href={to}>
            <motion.a
                ref={wave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.button} ${styles[style]} ${className}`}
            >
                {children}
            </motion.a>
        </Link>
    )
}

export default Button
