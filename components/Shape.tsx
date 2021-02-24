import { Color } from '@/types/colors'
import { motion, MotionProps } from 'framer-motion'
import React from 'react'
import { ReactComponent as Circle } from '../public/icons/circle.svg'
import { ReactComponent as Cross } from '../public/icons/cross.svg'
import { ReactComponent as Square } from '../public/icons/square.svg'
import { ReactComponent as Triangle } from '../public/icons/triangle.svg'

export type ShapeType = 'triangle' | 'cross' | 'square' | 'circle'

interface Props extends MotionProps {
    type: ShapeType
    color: Color
    size?: number
    // TODO there has to be a better, "react way," to do this
    className?: string
}

const Shape = ({ type, color, size, ...props }: Props) => {
    let ShapeIcon: any // TODO lookup proper type definition

    if (type === 'triangle') ShapeIcon = Triangle
    if (type === 'cross') ShapeIcon = Cross
    if (type === 'square') ShapeIcon = Square
    if (type === 'circle') ShapeIcon = Circle

    props.style = { ...(props.style ?? {}), display: 'inline-block' }

    const sizeOverride = typeof size !== 'undefined' ? { width: size, height: size } : {}

    return (
        <motion.div {...props}>
            <ShapeIcon style={{ '--shape-color': `rgb(var(--color-${color}))`, ...sizeOverride }} />
        </motion.div>
    )
}

export default Shape
