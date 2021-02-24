import Button from '@/components/inputs/Button'
import ButtonScroll from '@/components/inputs/ButtonScroll'
import RotatingShape from '@/components/RotatingShape'
import Shape from '@/components/Shape'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import DefaultLayout from '@/layouts/default'
import styles from '@/styles/pages/Home.module.scss'
import Image from 'next/image'
import React from 'react'

const Home = () => {
    useIntersectionObserver((target, isIntersecting) => {
        target.classList.toggle(styles.intersecting, isIntersecting)
    })

    return (
        <DefaultLayout
            title="Freelance Web Design"
            description="Professional freelance web development and graphic design by Justin Taddei."
        >
            <main>
                <section className={styles.sectionOne}>
                    <div className={styles.arcs}>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                        <div className={styles.arc}></div>
                    </div>
                    <div className={styles.gradient}></div>
                    <header className={styles.content}>
                        <h1>Justin Taddei</h1>
                        <h2 className={`h4 ${styles.subHeading}`}>Web design that’s different.</h2>
                        <Button to="/contact" look="blue">
                            Get in touch
                        </Button>
                    </header>
                    <ButtonScroll
                        style={{ x: '-50%' }}
                        className={styles.scrollButtonOne}
                        darkMode
                        pulse
                        color="green"
                        label="Scroll to section 2"
                    />
                    <svg
                        className={styles.shapeOne}
                        preserveAspectRatio="none"
                        width="1440"
                        height="323"
                        viewBox="0 0 1440 323"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1440 0.748047V323H0V232.321L0.5 232C83.8333 290.667 306.8 374 532 238C762.23 98.9621 838.946 117.118 952.257 143.936C977.49 149.908 1004.54 156.309 1035.5 161.5C1075.98 168.286 1337.67 170.956 1440 0.748047Z"
                            fill="rgb(var(--color-dark-gray))"
                        />
                    </svg>
                </section>
                <section className={styles.sectionTwo}>
                    <div className={styles.decor}></div>
                    <RotatingShape
                        className={`${styles.shape} ${styles.triangle}`}
                        type="triangle"
                        color="orange"
                        duration={20}
                    />
                    <RotatingShape
                        className={`${styles.shape} ${styles.square}`}
                        type="square"
                        color="purple"
                        duration={25}
                    />
                    <RotatingShape
                        className={`${styles.shape} ${styles.cross}`}
                        type="cross"
                        color="green"
                        duration={30}
                    />
                    <RotatingShape
                        className={`${styles.shape} ${styles.circle}`}
                        type="circle"
                        color="yellow"
                        duration={10}
                    />

                    <h2 className={`js-observed ${styles.fadeInOnIntersection}`}>What custom really means</h2>
                    <p className={`js-observed ${styles.fadeInOnIntersection}`}>
                        &quot;Custom Website&quot; usually means some cheap-looking WordPress template, where you get to
                        pick the colors—if you&#39;re lucky. I build everything from the ground up to ensure it meets
                        your every need.
                    </p>

                    <ButtonScroll
                        className={styles.scrollButtonTwo}
                        darkMode
                        pulse
                        color="purple"
                        target={styles.sectionThree}
                        label="Scroll to section 3"
                    />

                    <svg
                        className={styles.shapeTwo}
                        preserveAspectRatio="none"
                        width="1440"
                        height="79"
                        viewBox="0 0 1440 79"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 0L0 80H1440V0C1282.9 47 1019 80 720 80C420.9 80 157 47 0 0Z"
                            fill="rgb(var(--color-white))"
                        />
                    </svg>
                    <div className={styles.decor}></div>
                </section>
                <section className={styles.sectionThree}>
                    <h2 className={`js-observed ${styles.fadeInOnIntersection}`}>Your customers love custom</h2>
                    <p className={`js-observed ${styles.fadeInOnIntersection}`}>
                        Speed matters—a lot. Countless studies have found that for every 1 second faster a page loads,
                        sales increase significantly. As much as 7% in some cases! You can&#39;t afford to skimp by with
                        a &quot;good enough&quot; website. It&#39;s time for you to stand out from the competition.
                    </p>
                    <div className={`js-observed ${styles.fadeInOnIntersection} ${styles.shapes}`}>
                        <Shape color="mid-gray" type="square" />
                        <RotatingShape color="green" type="cross" duration={10} />
                        <Shape color="mid-gray" type="square" />
                        <Shape color="mid-gray" type="square" />
                    </div>

                    <ButtonScroll
                        className={styles.scrollButtonThree}
                        darkMode
                        pulse
                        color="blue"
                        target={styles.sectionFour}
                        label="Scroll to section 4 "
                    />

                    <svg
                        className={styles.shapeThree}
                        preserveAspectRatio="none"
                        width="1440"
                        height="79"
                        viewBox="0 0 1440 79"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 0L0 80H1440V0C1282.9 47 1019 80 720 80C420.9 80 157 47 0 0Z"
                            fill="rgb(var(--color-white))"
                        />
                    </svg>
                </section>
                <section className={styles.sectionFour}>
                    <h2 className={`js-observed ${styles.fadeInOnIntersection}`}>Take the first step</h2>
                    <p className={`js-observed ${styles.fadeInOnIntersection}`}>
                        Before I can help you succeed, I need to know who you are. Have a look over my portfolio, then
                        hit the contact button, and let&#39;s work together!
                    </p>
                    <div className={styles.buttons}>
                        <Button to="/contact" look="blue">
                            Get in touch
                        </Button>
                        <Button to="/portfolio" look="flat">
                            My Portfolio
                        </Button>
                    </div>
                    <div className={`js-observed ${styles.fadeInOnIntersection} ${styles.portfolioPreview}`}>
                        <div className={styles.portfolioImage}>
                            <Image
                                alt="Taddei Productions homepage"
                                width={371}
                                height={231}
                                src="/images/portfolio-preview/taddei_productions.png"
                            />
                        </div>
                        <div className={styles.portfolioImage}>
                            <Image
                                alt="Taddei Wine homepage"
                                width={369}
                                height={231}
                                src="/images/portfolio-preview/taddeiwine.png"
                            />
                        </div>
                        <div className={styles.portfolioImage}>
                            <Image
                                alt="Daily Stance homepage"
                                width={371}
                                height={231}
                                src="/images/portfolio-preview/dailystance.png"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </DefaultLayout>
    )
}

export default Home
