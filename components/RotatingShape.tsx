import Shape, { ShapeType } from '@/components/Shape'
import { Color } from '@/types/colors'
import React from 'react'

interface Props {
    type: ShapeType
    color: Color
    duration: number
    [prop: string]: any
}

const RotatingShape = ({ type, color, duration, ...props }: Props) => (
    <Shape
        animate={{ rotate: 360 }}
        transition={{
            repeat: Infinity,
            ease: 'linear',
            duration
        }}
        color={color}
        type={type}
        {...props}
    />
)

export default RotatingShape
