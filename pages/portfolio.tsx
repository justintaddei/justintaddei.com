import Button from '@/components/inputs/Button'
import ButtonScroll from '@/components/inputs/ButtonScroll'
import Shape from '@/components/Shape'
import { useForceRender } from '@/hooks/useForceRender'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import DefaultLayout from '@/layouts/default'
import classes from '@/styles/pages/Portfolio.module.scss'
import { MotionProps, Transition, useCycle } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect } from 'react'

const spring: Transition = {
    type: 'spring',
    stiffness: 10,
    damping: 3,
    mass: 1.75
}

const isServer = typeof window === 'undefined'

const random = (max: number) => {
    return Math.random() * max
}

const generateRandomStyle = (opacity: number) => {
    return {
        x: random(window.innerWidth),
        y: random(window.innerHeight * 0.8),
        rotate: random(1440),
        scale: 0.3 + random(1.7),
        opacity
    }
}

const Portfolio = () => {
    // TODO: refactor animation logic.
    let getRandomShapeStyle: () => MotionProps['animate']

    const [renderMode, cycleRenderMode] = useCycle('initial', 'setup', 'ready')

    const forceRender = useForceRender()

    if (isServer) {
        getRandomShapeStyle = () => ({
            opacity: 0
        })
    } else {
        if (renderMode === 'initial')
            getRandomShapeStyle = () => ({
                opacity: 0
            })
        else {
            getRandomShapeStyle = () => {
                return generateRandomStyle(renderMode === 'ready' ? 1 : 0)
            }
        }

        useEffect(() => {
            if (renderMode !== 'ready') {
                const token = setTimeout(() => cycleRenderMode(), renderMode === 'initial' ? 0 : 500)
                return () => clearTimeout(token)
            }
            const token = setInterval(() => {
                forceRender()
                setTimeout(() => {
                    forceRender()
                }, 500)
            }, 5500)

            return () => clearInterval(token)
        }, [renderMode])
    }

    useIntersectionObserver((target, isIntersecting) => {
        target.classList.toggle(classes.intersecting, isIntersecting)
    })

    return (
        <DefaultLayout
            title="Portfolio"
            description="Justin Taddei's web design portfolio. Click to see my latest work!"
        >
            <main>
                <section className={classes.sectionOne}>
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="circle"
                        color="yellow"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="circle"
                        color="yellow"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="circle"
                        color="yellow"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="circle"
                        color="yellow"
                    />

                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="square"
                        color="green"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="square"
                        color="green"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="square"
                        color="green"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="square"
                        color="green"
                    />

                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="cross"
                        color="purple"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="cross"
                        color="purple"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="cross"
                        color="purple"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="cross"
                        color="purple"
                    />

                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="triangle"
                        color="salmon"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="triangle"
                        color="salmon"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="triangle"
                        color="salmon"
                    />
                    <Shape
                        initial={false}
                        transition={spring}
                        animate={getRandomShapeStyle()}
                        className={classes.randomShape}
                        type="triangle"
                        color="salmon"
                    />

                    <header>
                        <h1>Portfolio</h1>
                        <h2 className="h4">A sample of my best work.</h2>
                    </header>

                    <svg
                        className={classes.slopes}
                        preserveAspectRatio="none"
                        width="50%"
                        height="33.333%"
                        viewBox="0 0 720 299"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0V299H720L0 0Z" fill="rgb(var(--color-blue))" />
                    </svg>
                    <svg
                        className={classes.slopes}
                        preserveAspectRatio="none"
                        width="100%"
                        height="33.333%"
                        viewBox="0 0 1440 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1440 0V300H0L1440 0Z" fill="#FCFCFC" />
                    </svg>

                    <ButtonScroll
                        className={classes.scrollButton}
                        pulse
                        style={{ x: '-50%' }}
                        color="blue"
                        label="Scroll to portfolio content"
                    />
                </section>
                <section className={classes.sectionTwo}>
                    <Shape type="triangle" className={classes.blueShapes} color="blue" />
                    <Shape type="cross" className={classes.blueShapes} color="blue" />
                    <Shape type="square" className={classes.blueShapes} color="blue" />
                    <Shape type="circle" className={classes.blueShapes} color="blue" />
                    <Shape type="cross" className={classes.blueShapes} color="blue" />

                    <div className={`${classes.first} ${classes.portfolioItem}`}>
                        <div className={classes.decor}></div>
                        <div className={`js-observed ${classes.preview}`}>
                            <div className={classes.previewImage}>
                                <Image
                                    alt="Taddei Productions homepage"
                                    width="371"
                                    height="231"
                                    src="/images/portfolio-preview/taddei_productions.png"
                                />
                            </div>
                            {/* <Button to="https://taddeiproductions.com">Visit Site</Button> */}
                        </div>
                        <div className={`js-observed ${classes.details}`}>
                            <svg
                                width="567"
                                height="567"
                                viewBox="0 0 567 567"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M76.909 477.458C76.909 477.458 283.425 358.226 329.013 331.906C330.835 330.854 333.08 330.854 334.902 331.906C336.725 332.958 337.848 334.903 337.848 337.007C337.848 382.15 337.848 561.729 337.848 561.729C320.24 565.209 302.078 567 283.5 567C202.062 567 128.598 532.587 76.909 477.458ZM348.178 559.486V268.288C348.178 266.184 349.3 264.24 351.123 263.187C352.945 262.135 355.19 262.135 357.012 263.187C396.106 285.758 551.613 375.54 551.613 375.54C520.27 466.951 443.447 537.295 348.178 559.486ZM12.1117 201.496C12.1117 201.496 218.735 320.79 264.335 347.118C266.158 348.17 267.28 350.115 267.28 352.219C267.28 354.323 266.158 356.267 264.335 357.319C225.253 379.884 69.8238 469.621 69.8238 469.621C26.3116 419.823 0 354.71 0 283.5C0 255.007 4.21281 227.491 12.1117 201.496ZM497.176 97.3788C540.689 147.177 567 212.29 567 283.5C567 311.992 562.788 339.509 554.889 365.503C554.889 365.503 351.33 247.978 347.339 245.674C347.112 245.542 346.893 245.394 346.686 245.231C346.503 244.968 346.203 244.814 345.839 244.676C345.576 244.572 345.32 244.448 345.074 244.306C342.203 242.708 316.55 227.898 302.665 219.881C300.843 218.83 299.72 216.885 299.72 214.781C299.72 212.677 300.843 210.732 302.665 209.68C341.748 187.116 497.176 97.3788 497.176 97.3788ZM218.823 7.51332V298.711C218.823 300.816 217.7 302.76 215.878 303.812C214.056 304.864 211.81 304.864 209.988 303.812C170.895 281.242 15.3878 191.459 15.3878 191.459C46.7299 100.049 123.553 29.704 218.823 7.51332ZM229.153 5.27083C246.761 1.79059 264.923 0 283.5 0C364.938 0 438.402 34.4124 490.092 89.5412C490.092 89.5412 283.575 208.773 237.988 235.093C236.166 236.145 233.92 236.145 232.098 235.093C230.276 234.041 229.153 232.097 229.153 229.993C229.153 184.849 229.153 5.27083 229.153 5.27083Z"
                                    fill="#F7F7F7"
                                />
                            </svg>
                            <h2 className="h3">Taddei Productions</h2>
                            <a className="sub-text" href="https://taddeiproductions.com">
                                taddeiproductions.com
                            </a>
                            <p>
                                Specializing in Cinematography and Photography, Taddei Productions is a premiere studio
                                in Tulsa Oklahoma.
                            </p>
                        </div>
                    </div>

                    <div className={classes.portfolioItem}>
                        <div className={classes.decor}></div>
                        <div className={`js-observed ${classes.preview}`}>
                            <div className={classes.previewImage}>
                                <Image
                                    alt="Taddei Wine homepage"
                                    width="371"
                                    height="231"
                                    src="/images/portfolio-preview/taddeiwine.png"
                                />
                            </div>
                            {/* <Button to="https://taddeiwine.com">Visit Site</Button> */}
                        </div>
                        <div className={`js-observed ${classes.details}`}>
                            <svg
                                width="619"
                                height="619"
                                viewBox="0 0 460 619"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M44.56 62.7733L108.726 25.7267L115.522 37.4963L120.691 34.5119L132.119 54.3061L126.95 57.2904L182.377 153.294C184.481 156.937 190.852 158.95 199.821 161.785C221.144 168.522 257.152 179.901 285.417 228.856L434.011 486.228C448.939 512.086 451.796 523.27 439.018 541.828L326.371 606.865C303.91 608.651 295.653 600.586 280.724 574.728L132.13 317.356C103.866 268.401 112.016 231.527 116.842 209.692C118.872 200.508 120.314 193.984 118.211 190.341L62.7833 94.3369L57.6144 97.3212L46.1862 77.5271L51.3552 74.5428L44.56 62.7733Z"
                                    fill="#F7F7F7"
                                />
                            </svg>
                            <h2 className="h3">Taddei Wine</h2>
                            <a className="sub-text" href="https://taddeiwine.com">
                                taddeiwine.com
                            </a>
                            <p>
                                Taddei Wine produces some of the finest wines in Sonoma California thanks to the genius
                                craftsmanship of Winemaker Christopher Taddei.
                            </p>
                        </div>
                    </div>

                    <div className={`${classes.last} ${classes.portfolioItem}`}>
                        <div className={classes.decor}></div>
                        <div className={`js-observed ${classes.preview}`}>
                            <div className={classes.previewImage}>
                                <Image
                                    alt="Daily Stance homepage"
                                    width="371"
                                    height="231"
                                    src="/images/portfolio-preview/dailystance.png"
                                />
                            </div>
                            {/* <Button to="https://dailystance.com">Visit Site</Button> */}
                        </div>
                        <div className={`js-observed ${classes.details}`}>
                            <svg
                                width="978"
                                height="978"
                                viewBox="0 0 929 978"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.02">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M489 0C758.886 0 978 219.114 978 489C978 758.886 758.886 978 489 978C219.114 978 0 758.886 0 489C0 219.114 219.114 0 489 0ZM489 57.9556C726.9 57.9556 920.044 251.1 920.044 489C920.044 726.9 726.9 920.044 489 920.044C251.1 920.044 57.9556 726.9 57.9556 489C57.9556 251.1 251.1 57.9556 489 57.9556Z"
                                        fill="black"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M474.545 474.602C474.607 461.448 474.778 448.329 474.991 435.319C475.444 407.711 476.114 380.627 476.932 354.797C478.377 309.096 480.219 267.479 481.664 234.014C483.79 184.789 485.463 153.492 485.463 153.492C485.463 151.539 487.048 149.955 489 149.955C490.953 149.955 492.537 151.539 492.537 153.492C492.537 153.492 494.211 184.789 496.336 234.014C497.781 267.479 499.623 309.096 501.069 354.797C501.886 380.627 502.556 407.711 503.009 435.319C503.222 448.311 503.392 461.412 503.455 474.546C516.587 474.608 529.69 474.778 542.682 474.991C570.289 475.444 597.373 476.114 623.204 476.932C668.904 478.377 710.521 480.219 743.987 481.664C793.212 483.789 824.509 485.463 824.509 485.463C826.461 485.463 828.046 487.048 828.046 489C828.046 490.952 826.461 492.537 824.509 492.537C824.509 492.537 793.212 494.211 743.987 496.336C710.521 497.781 668.904 499.623 623.204 501.068C597.373 501.886 570.289 502.556 542.682 503.009C529.672 503.223 516.552 503.393 503.399 503.455C503.284 516.588 503.062 529.689 502.805 542.681C502.261 570.292 501.507 597.371 500.64 623.203C496.85 736.083 492.537 824.508 492.537 824.508C492.537 826.461 490.953 828.045 489 828.045C487.048 828.045 485.463 826.461 485.463 824.508C485.463 824.508 481.15 736.083 477.36 623.203C476.494 597.371 475.739 570.292 475.195 542.681C474.939 529.671 474.715 516.552 474.601 503.399C461.448 503.285 448.329 503.061 435.319 502.805C407.708 502.261 380.63 501.507 354.797 500.64C241.918 496.85 153.492 492.537 153.492 492.537C151.539 492.537 149.955 490.952 149.955 489C149.955 487.048 151.539 485.463 153.492 485.463C153.492 485.463 241.918 481.15 354.797 477.36C380.629 476.493 407.708 475.739 435.319 475.195C448.311 474.939 461.412 474.716 474.545 474.602Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M293.229 247.495C292.275 254.168 291.322 260.65 290.369 266.941C289.416 273.233 288.701 280.001 288.224 287.245C287.748 294.491 287.509 302.974 287.509 312.698C287.509 325.853 288.224 336.386 289.654 344.298C291.084 352.21 292.895 358.262 295.087 362.457C297.28 366.652 299.759 369.606 302.523 371.322C305.287 373.038 307.909 374.277 310.387 375.04C314.582 376.566 320.445 377.661 327.975 378.329C335.506 378.996 342.321 379.234 348.423 379.044C348.804 377.328 349.089 374.945 349.28 371.895C349.47 368.844 349.661 365.412 349.852 361.599C350.043 357.786 350.138 354.164 350.138 350.732V342.725L329.548 337.577L333.838 310.409C339.176 310.6 344.991 311.172 351.282 312.125C357.573 313.079 363.198 314.223 368.155 315.557C373.112 316.891 376.258 318.417 377.591 320.133C377.783 323.374 377.973 327.378 378.164 332.144C378.354 336.91 378.402 341.963 378.307 347.301C378.212 352.639 378.069 357.738 377.878 362.6C377.687 367.462 377.448 371.704 377.163 375.326C376.877 378.948 376.543 381.332 376.162 382.475C374.828 383.81 372.492 385.431 369.155 387.337C365.819 389.243 362.006 391.198 357.716 393.2C353.427 395.202 349.185 397.013 344.991 398.633C340.796 400.254 336.983 401.636 333.552 402.78C330.12 403.923 327.737 404.496 326.402 404.496C323.351 404.496 319.348 404.019 314.391 403.066C309.434 402.112 304.144 400.778 298.519 399.062C292.895 397.346 287.605 395.249 282.648 392.771C277.691 390.292 273.877 387.432 271.209 384.191C267.777 379.807 264.822 374.802 262.343 369.178C259.865 363.554 257.958 356.976 256.624 349.445C255.289 341.915 254.621 333.097 254.621 322.993C254.621 309.647 255.432 297.732 257.053 287.245C258.673 276.76 260.723 268.276 263.202 261.794C265.489 258.743 268.587 255.359 272.495 251.642C276.404 247.924 280.55 244.444 284.935 241.203L293.229 247.495ZM305.239 378.186V249.782C305.239 247.876 305.955 244.778 307.385 240.489C308.814 236.199 310.483 231.575 312.389 226.618L320.11 226.904V361.886C320.11 363.029 319.586 364.936 318.537 367.605C317.489 370.274 315.916 373.801 313.819 378.186H305.239ZM371.014 280.954H354.142L350.424 250.641C347.945 249.877 344.561 249.211 340.272 248.639C335.982 248.066 331.74 247.59 327.546 247.209C323.351 246.828 320.11 246.637 317.823 246.637C315.916 246.637 314.248 246.685 312.818 246.78C311.388 246.876 310.196 247.018 309.244 247.209L312.389 226.618C313.342 226.428 314.105 226.237 314.677 226.047C315.248 225.856 316.012 225.761 316.964 225.761C318.872 225.761 322.017 225.904 326.402 226.19C330.787 226.475 335.792 226.761 341.415 227.048C347.04 227.334 352.807 227.667 358.717 228.048C364.628 228.429 369.871 228.907 374.446 229.478L371.014 280.954Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M306.763 587.017C305.237 599.409 304.427 611.611 304.331 623.621C304.236 635.633 304.379 647.024 304.76 657.796C305.142 668.568 305.333 678.625 305.333 687.967C305.333 693.876 304.808 698.738 303.76 702.551C302.711 706.364 301.043 709.558 298.755 712.131C296.467 714.705 293.321 717.136 289.318 719.424L289.889 721.14L376.826 726.001C378.924 728.098 379.972 730.482 379.972 733.15L370.535 751.453C359.478 750.119 349.611 748.88 340.936 747.735C332.262 746.591 324.779 745.686 318.488 745.018C312.196 744.351 307.001 743.827 302.901 743.445C298.803 743.064 295.8 742.874 293.894 742.874C291.224 742.874 287.84 743.112 283.742 743.589C279.642 744.066 275.209 744.78 270.443 745.734C265.677 746.686 260.911 747.64 256.145 748.594L252.999 746.878L254.715 732.007C260.434 730.29 264.914 728.289 268.155 726.001C271.397 723.713 273.589 720.711 274.733 716.993C275.877 713.275 276.449 708.556 276.449 702.837C276.449 699.024 276.306 694.21 276.02 688.395C275.734 682.58 275.4 676.337 275.019 669.664C274.638 662.991 274.257 656.318 273.875 649.645C273.493 642.973 273.208 636.776 273.017 631.057C272.827 625.337 272.827 620.667 273.017 617.044C274.923 612.66 277.116 608.465 279.595 604.462C282.073 600.457 284.98 596.502 288.316 592.594C291.653 588.685 295.228 585.015 299.041 581.583L306.763 587.017ZM321.061 726.573V596.168C321.061 594.262 321.776 591.068 323.206 586.588C324.636 582.107 326.304 577.389 328.211 572.432L335.932 573.004V710.272C335.932 711.416 335.408 713.466 334.359 716.421C333.311 719.376 331.738 722.76 329.64 726.573H321.061ZM376.54 626.767H359.668L355.951 596.454C353.853 595.882 351.375 595.262 348.515 594.595C345.655 593.927 342.939 593.404 340.364 593.022C337.791 592.641 335.455 592.45 333.358 592.45C331.642 592.45 330.117 592.498 328.782 592.594C327.448 592.689 326.4 592.832 325.637 593.022L328.211 572.432C328.973 572.051 329.688 571.812 330.355 571.717C331.022 571.622 331.738 571.574 332.5 571.574C334.788 571.574 338.649 571.765 344.082 572.146C349.516 572.527 355.473 573.004 361.955 573.576C368.438 574.148 374.444 574.72 379.972 575.292L376.54 626.767Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M596.454 244.191V231.323C599.123 230.941 602.411 230.512 606.32 230.036C610.228 229.56 614.184 229.082 618.188 228.606C622.191 228.13 625.719 227.748 628.769 227.462C631.819 227.176 633.63 227.128 634.203 227.319C635.156 227.509 636.443 228.32 638.063 229.75C639.684 231.18 641.114 232.753 642.353 234.469C643.592 236.185 644.212 237.328 644.212 237.901V383.462L703.409 388.896L708.271 350.86H725.143L726.287 402.908C715.039 403.289 704.696 403.624 695.259 403.91C685.821 404.195 677.099 404.481 669.092 404.767C661.084 405.053 653.458 405.244 646.214 405.34C638.969 405.435 631.724 405.578 624.48 405.768C623.526 405.768 622.144 405.053 620.333 403.624C618.521 402.194 616.949 400.621 615.614 398.905C614.28 397.189 613.612 395.95 613.612 395.187V248.767L596.454 244.191ZM666.232 230.179H673.953V372.881C673.953 374.025 673.429 376.075 672.381 379.03C671.332 381.984 669.759 385.368 667.662 389.182H659.083V253.343C659.083 251.246 659.845 248.053 661.37 243.763C662.895 239.473 664.516 234.945 666.232 230.179ZM662.229 305.962L703.123 303.961L701.407 325.123L662.8 322.835L662.229 305.962ZM668.233 230.179H726.573L722.856 281.368H705.982L702.836 250.483L667.376 247.051L668.233 230.179Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M643.928 593.308C642.976 599.981 642.022 606.511 641.069 612.898C640.116 619.285 639.401 626.1 638.924 633.345C638.447 640.59 638.209 648.978 638.209 658.511C638.209 676.813 639.782 690.873 642.928 700.692C646.074 710.51 650.315 717.231 655.653 720.854C660.992 724.476 666.997 726.287 673.67 726.287H713.993V743.445C711.323 744.208 707.272 744.971 701.839 745.734C696.405 746.496 690.686 747.211 684.68 747.878C678.675 748.546 673.431 749.118 668.952 749.594C664.471 750.071 661.659 750.31 660.515 750.31C650.792 750.31 641.736 747.402 633.348 741.587C624.959 735.772 618.191 726.764 613.043 714.562C607.895 702.36 605.322 686.727 605.322 667.662C605.322 655.079 606.132 643.545 607.752 633.059C609.373 622.573 611.422 614.09 613.901 607.607C616.188 604.557 619.287 601.173 623.196 597.455C627.104 593.737 631.251 590.258 635.635 587.017L643.928 593.308ZM655.94 726.859V595.596C655.94 593.689 656.654 590.591 658.084 586.302C659.514 582.012 661.183 577.389 663.089 572.432L670.811 572.718V710.558C670.811 711.702 670.286 713.752 669.238 716.707C668.189 719.662 666.616 723.046 664.519 726.859H655.94ZM714.278 626.767H697.406L693.689 596.454C691.591 595.882 688.875 595.262 685.538 594.595C682.202 593.927 679.009 593.404 675.958 593.022C672.907 592.641 670.429 592.45 668.522 592.45C666.616 592.45 664.995 592.498 663.661 592.594C662.327 592.689 661.183 592.832 660.229 593.022L663.089 572.432C663.851 572.051 664.567 571.812 665.233 571.717C665.901 571.622 666.616 571.574 667.379 571.574C669.857 571.574 674.052 571.765 679.961 572.146C685.872 572.527 692.259 573.004 699.122 573.576C705.985 574.148 712.182 574.72 717.71 575.292L714.278 626.767Z"
                                        fill="black"
                                    />
                                </g>
                            </svg>
                            <h2 className="h3">Daily Stance</h2>
                            <a className="sub-text" href="https://dailystance.com">
                                dailystance.com
                            </a>
                            <p>
                                Daily Stance is an startup political news outlet with the goal of publishing
                                high-quality, fact-based news in an era when such outlets are far and few between.
                            </p>
                        </div>
                    </div>

                    <div className={classes.getInTouch}>
                        <Button to="/contact" look="blue">
                            Get in touch
                        </Button>
                    </div>
                </section>
            </main>
        </DefaultLayout>
    )
}

export default Portfolio
