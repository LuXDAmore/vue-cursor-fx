const SCALE_MIN = 0.5
    , SCALE_MAX = 1
    , lerp = (
        a,
        b,
        n,
    ) => ( ( 1 - n ) * a + n * b )
    , getMousePos = e => {

        let posx = 0
            , posy = 0
        ;

        if( ! e )
            e = window.event;

        if( e.pageX || e.pageY ) {

            posx = e.pageX;
            posy = e.pageY;

        } else if( e.clientX || e.clientY ) {

            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

        }

        return {
            x: posx,
            y: posy,
        };

    }
;

export default class CursorFx {
    constructor(
        {
            el,
            base_class,
        },
        options = {},
    ) {

        this.DOM = {
            el,
        };
        this.$options = Object.freeze(
            {
                mixBlendMode: null,
                lerps: {
                    dot: 1,
                    circle: 0.18,
                    custom: 0.23,
                },
                scale: {
                    ratio: 0.18,
                    min: SCALE_MIN,
                    max: SCALE_MAX,
                },
                opacity: 0.1,
                ... options,
            },
        );

        this.DOM.dot = this.DOM.el.querySelector(
            `${ base_class }__inner__inside`,
        );
        this.DOM.circle = this.DOM.el.querySelector(
            `${ base_class }__inner__outside`,
        );
        this.DOM.custom = this.DOM.el.querySelector(
            `${ base_class }__inner__custom`,
        );

        this.bounds = {
            dot: this.DOM.dot ? this.DOM.dot.getBoundingClientRect() : null,
            circle: this.DOM.circle ? this.DOM.circle.getBoundingClientRect() : null,
            custom: this.DOM.custom ? this.DOM.custom.getBoundingClientRect() : null,
        };

        if( this.bounds.dot && ! this.bounds.dot.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.dot,
            );

            this.bounds.dot.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;
            this.bounds.dot.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;

        }

        if( this.bounds.circle && ! this.bounds.circle.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.circle,
            );

            this.bounds.circle.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;
            this.bounds.circle.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;

        }

        if( this.bounds.custom && ! this.bounds.custom.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.custom,
            );

            this.bounds.custom.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;
            this.bounds.custom.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height',
                    )
                    .replace(
                        'px',
                        '',
                    ),
                )
            ;

        }

        this.scale = this.$options.scale.min;
        this.lastScale = this.$options.scale.max;
        this.opacity = this.$options.opacity;
        this.lastOpacity = 1;

        this.mousePos = {
            x: 0,
            y: 0,
        };
        this.lastMousePos = {
            dot: (
                this.DOM.dot
                ? this.DOM.dot.getBoundingClientRect()
                : {
                    top: 0,
                    left: 0,
                }
            ),
            custom: (
                this.DOM.custom
                ? this.DOM.custom.getBoundingClientRect()
                : {
                    top: 0,
                    left: 0,
                }
            ),
            circle: (
                this.DOM.circle
                ? this.DOM.circle.getBoundingClientRect()
                : {
                    top: 0,
                    left: 0,
                }
            ),
        };

        this.initEvents();

        this.$raf = requestAnimationFrame(
            () => this.render(),
        );

    }

    initEvents(
        add = true
    ) {

        const mouseMove = ev => (
            this.mousePos = getMousePos(
                ev,
            )
        );

        window.removeEventListener(
            'mousemove',
            mouseMove,
            false
        );

        add && window.addEventListener(
            'mousemove',
            mouseMove,
            false,
        );

    }

    render() {

        this.$raf = requestAnimationFrame(
            () => this.render(),
        );

        const {
            lerps: {
                dot,
                circle,
                custom,
            },
            scale: { ratio },
            opacity,
        } = this.$options;

        this.lastScale = lerp(
            this.lastScale,
            this.scale,
            ratio,
        );
        this.lastOpacity = lerp(
            this.lastOpacity,
            this.opacity,
            opacity,
        );

        if( this.bounds.dot ) {

            this.lastMousePos.dot.x = lerp(
                this.lastMousePos.dot.x,
                this.mousePos.x - ( this.bounds.dot.width / 2 ),
                dot,
            );
            this.lastMousePos.dot.y = lerp(
                this.lastMousePos.dot.y,
                this.mousePos.y - ( this.bounds.dot.height / 2 ),
                dot,
            );

            this.DOM.dot.style.transform = `translate3d(${ this.lastMousePos.dot.x }px, ${ this.lastMousePos.dot.y }px, 0)`;

        }

        if( this.bounds.circle ) {

            this.lastMousePos.circle.x = lerp(
                this.lastMousePos.circle.x,
                this.mousePos.x - ( this.bounds.circle.width / 2 ),
                circle,
            );
            this.lastMousePos.circle.y = lerp(
                this.lastMousePos.circle.y,
                this.mousePos.y - ( this.bounds.circle.height / 2 ),
                circle,
            );

            this.DOM.circle.style.transform = `translate3d(${ this.lastMousePos.circle.x }px, ${ this.lastMousePos.circle.y }px, 0) scale(${ this.lastScale })`;

        }

        if( this.bounds.custom ) {

            this.lastMousePos.custom.x = lerp(
                this.lastMousePos.custom.x,
                this.mousePos.x - ( this.bounds.custom.width / 2 ),
                custom,
            );
            this.lastMousePos.custom.y = lerp(
                this.lastMousePos.custom.y,
                this.mousePos.y - ( this.bounds.custom.height / 2 ),
                custom,
            );

            this.DOM.custom.style.transform = `translate3d(${ ( this.lastMousePos.custom.x ) }px, ${ this.lastMousePos.custom.y }px, 0) scale(${ this.lastScale })`;

        }

    }

    destroy() {

        this.$raf && cancelAnimationFrame(
            this.$raf
        );

        this.initEvents(
            false
        );

        this.DOM = null;

    }

    enter(
        scale = this.$options.scale.max,
    ) {

        this.scale = scale;

    }

    leave(
        scale = this.$options.scale.min,
    ) {

        this.scale = scale;

    }

    click(
        scale = this.$options.scale.min,
        opacity = 0,
    ) {

        this.lastScale = scale;
        this.lastOpacity = opacity;

    }

    enterHidden() {

        if( ! this.DOM )
            return;

        this.DOM.el.style.visibility = 'hidden';

    }

    leaveHidden() {

        if( ! this.DOM )
            return;

        this.DOM.el.style.visibility = 'visible';

    }

    mixBlendMode(
        value = this.$options.mixBlendMode,
    ) {

        if( ! this.DOM )
            return;

        this.DOM.el.style.mixBlendMode = value || null;

    }
}
