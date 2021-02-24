import classes from '@/styles/components/inputs/TextField.module.scss'
import { motion } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import useWave from 'use-wave'

interface ITextFieldProps {
    name: string
    label: string
    type?: 'text' | 'email' | 'textarea'
    required?: boolean
}

const TextField = ({ name, label, type = 'text', required }: ITextFieldProps) => {
    const wave = useWave()

    const [error, setError] = useState('')

    const handleValidity = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement

        if (e.type === 'change' && error === '') return

        setError(input.validationMessage)
    }

    const InputComponent = type === 'textarea' ? 'textarea' : 'input'

    return (
        <motion.label ref={wave} className={classes.wrapper} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <InputComponent
                onChange={handleValidity}
                onInvalid={handleValidity}
                className={`${type === 'textarea' ? classes.textarea : classes.input} ${error && classes.invalid}`}
                name={name}
                type={type}
                required={required}
            />
            <span className={classes.label}>{label}</span>
            {error && (
                <span aria-live="assertive" className={`sub-text ${classes.errorMessage}`}>
                    {error}
                </span>
            )}
        </motion.label>
    )
}

export default TextField
