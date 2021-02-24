import Button from '@/components/inputs/Button'
import { useMatchMedia } from '@/hooks/useMatchMedia'
import classes from '@/styles/components/Header.module.scss'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ReactComponent as MenuIcon } from '../public/icons/menu.svg'
import { ReactComponent as CloseIcon } from '../public/icons/x.svg'
import { ReactComponent as Logo } from '../public/logo.svg'

const isPortfolio = (route: string) => route === '/portfolio'

const Header = () => {
    const { route } = useRouter()

    // Sticky styling

    const mode = isPortfolio(route) ? 'dark' : 'light'

    const { scrollY } = useViewportScroll()
    const inverseY = useTransform(scrollY, [0, 48], [-48, 0])
    const y = useTransform(scrollY, [0, 48], [48, 0])
    const variants = {
        static: {
            opacity: 0,
            boxShadow: '0 0 0 0 rgba(0,0,0,0)'
        },
        fixed: {
            opacity: 1,
            boxShadow: '0 0 32px 0 rgba(0,0,0,0.1)'
        }
    }

    const [activeVariant, setActiveVariant] = useState('static')

    y.onChange((latestY) => {
        if (latestY > 0 && activeVariant !== 'static') setActiveVariant('static')
        if (latestY === 0 && activeVariant !== 'fixed') setActiveVariant('fixed')
    })

    // Mobile nav

    const isMobile = useMatchMedia('(max-width: 760px)')

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [route])

    return (
        <motion.header style={{ y }} className={`${classes.header} ${classes[mode]}`}>
            <motion.div
                className={classes.background}
                initial="static"
                animate={activeVariant}
                variants={variants}
                transition={{ ease: 'easeOut', duration: 0.2 }}
            />
            <Link href="/">
                <a aria-label="Home">
                    <Logo />
                </a>
            </Link>

            <MenuIcon className={classes.navOpen} onClick={() => setIsOpen(true)} />

            <motion.div
                onClick={() => setIsOpen(false)}
                className={classes.overlay}
                variants={{
                    open: {
                        opacity: 1,
                        pointerEvents: 'auto'
                    },
                    closed: {
                        opacity: 0,
                        pointerEvents: 'none'
                    }
                }}
                animate={isOpen ? 'open' : 'closed'}
            />
            <motion.nav
                animate={isOpen ? 'open' : 'closed'}
                style={{ y: isMobile ? inverseY : 0 }}
                variants={{
                    open: {
                        x: -300
                    },
                    closed: {
                        x: 0
                    }
                }}
                initial="closed"
            >
                <CloseIcon onClick={() => setIsOpen(false)} className={classes.navClose} />
                <ul>
                    <li>
                        <Button to="/">Home</Button>
                    </li>
                    <li>
                        <Button to="/portfolio">Portfolio</Button>
                    </li>
                    <li>
                        <Button to="/contact">Contact</Button>
                    </li>
                </ul>
            </motion.nav>
        </motion.header>
    )
}

export default Header
