import TextField from '@/components/inputs/TextField'
import Shape from '@/components/Shape'
import { useMatchMedia } from '@/hooks/useMatchMedia'
import DefaultLayout from '@/layouts/default'
import classes from '@/styles/pages/Contact.module.scss'
import { motion } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import useWave from 'use-wave'
import { ReactComponent as Github } from '../public/icons/github.svg'
import { ReactComponent as Instagram } from '../public/icons/instagram.svg'
import { ReactComponent as LinkedIn } from '../public/icons/linkedin.svg'
import { ReactComponent as Mail } from '../public/icons/mail.svg'
import { ReactComponent as Send } from '../public/icons/send.svg'
import { ReactComponent as Smartphone } from '../public/icons/smartphone.svg'

const Contact = () => {
    const wave = useWave()
    const recaptchaRef = React.createRef<any>()

    const [formSubmissionResult, setFormSubmissionResult] = useState({
        success: false,
        message: '',
        name: ''
    })

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement

        if (!form.checkValidity()) return

        const token = await recaptchaRef.current.executeAsync()

        const formData = new FormData(form)

        formData.set('g-recaptcha-response', token)

        const jsonFormData = Object.fromEntries(formData) as { [key: string]: string }
        const res = await fetch('/api/email', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(jsonFormData)
        }).then((r) => r.json())

        setFormSubmissionResult({ ...res, name: jsonFormData.name.split(' ')[0] })
    }

    const singleColumn = useMatchMedia('(max-width: 1090px)')

    return (
        <DefaultLayout
            title="Contact Me"
            description="Let's get the ball rolling on your new site. Reach out to me on one of these platforms."
        >
            <main className={classes.main}>
                <Shape className={classes.circle} size={625} color="yellow" type="circle" />
                <Shape className={classes.triangle} size={525} color="purple" type="triangle" />
                <Shape className={classes.cross} size={415} color="blue" type="cross" />
                <header className={classes.heading}>
                    <h1>
                        Let<span>&apos;</span>s talk
                        <br />
                        about you
                    </h1>
                    {singleColumn ? (
                        <p>Reach out to me on one of these platforms or fill out the form below.</p>
                    ) : (
                        <p>Fill out the form below or reach out to me using one of the platforms to the right.</p>
                    )}
                </header>
                {formSubmissionResult.success ? (
                    <div className={classes.successMessage} aria-live="assertive">
                        <h4>Message sent.</h4>
                        <p>Thank you, {formSubmissionResult.name}. I&apos;ll get back to you soon! </p>
                    </div>
                ) : (
                    <form className={classes.form} noValidate onSubmit={submit}>
                        <TextField required label="Name" name="name" />
                        <TextField required label="Email" name="email" type="email" />
                        <TextField required label="Message" name="message" type="textarea" />
                        <div className={classes.actions}>
                            <span className={classes.captchaWrapper}>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    badge="inline"
                                    size="invisible"
                                    sitekey="6LfdOmEaAAAAAPQeLZStav0cKLdYW26zBvGH1qEJ"
                                />
                            </span>
                            <motion.button
                                ref={wave}
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={classes.submit}
                            >
                                Send <Send />
                            </motion.button>
                        </div>
                        {formSubmissionResult.message && (
                            <p className={classes.formError}>{formSubmissionResult.message}</p>
                        )}
                    </form>
                )}

                <aside className={classes.links}>
                    <h2 className="h4">Reach out to me here</h2>
                    <ul>
                        <li>
                            <a ref={wave} className={classes.phoneNumber} href="tel:+19187070317">
                                <Smartphone /> (918) 707-0317
                            </a>
                        </li>
                        <li>
                            <a ref={wave} className={classes.email} href="mailto:justin@justintaddei.com">
                                <Mail />
                                justin@justintaddei.com
                            </a>
                        </li>
                        <li>
                            <a
                                ref={wave}
                                className={classes.github}
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/justintaddei"
                            >
                                <Github />
                                /justintaddei
                            </a>
                        </li>
                        <li>
                            <a
                                ref={wave}
                                className={classes.linkedIn}
                                target="_blank"
                                rel="noreferrer"
                                href="https://linkedin.com/in/justintaddei/"
                            >
                                <LinkedIn />
                                /in/justintaddei
                            </a>
                        </li>
                        <li>
                            <a
                                ref={wave}
                                className={classes.instagram}
                                target="_blank"
                                rel="noreferrer"
                                href="https://instagram.com/justintaddei.js"
                            >
                                <Instagram />
                                @justintaddei.js
                            </a>
                        </li>
                    </ul>
                </aside>
            </main>
        </DefaultLayout>
    )
}

export default Contact
