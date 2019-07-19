const SCALE_MIN = 0.5
    , SCALE_MAX = 1
    , lerp = (
        a,
        b,
        n
    ) => ( ( 1 - n ) * a + n * b )
    , getMousePos = e => {

        let posx = 0,
        posy = 0;

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

class CursorFx {
    constructor(
        {
            el,
            base_class,
        },
        lerps = {}
    ) {

        this.DOM = {
            el,
        };
        this.lerps = {
            ... {
                dot: 1,
                circle: 0.18,
                custom: 0.23,
                scale: 0.18,
                opacity: 0.1,
            },
            ... lerps,
        };
        this.DOM.dot = this.DOM.el.querySelector(
            `${ base_class }__inner__outside`
        );
        this.DOM.circle = this.DOM.el.querySelector(
            `${ base_class }__inner__inside`
        );
        this.DOM.custom = this.DOM.el.querySelector(
            `${ base_class }__inner__custom`
        );

        this.bounds = {
            dot: this.DOM.dot ? this.DOM.dot.getBoundingClientRect() : null,
            circle: this.DOM.circle ? this.DOM.circle.getBoundingClientRect() : null,
            custom: this.DOM.custom ? this.DOM.custom.getBoundingClientRect() : null,
        };

        if( this.bounds.dot && ! this.bounds.dot.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.dot
            );

            this.bounds.dot.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;
            this.bounds.dot.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;

        }

        if( this.bounds.circle && ! this.bounds.circle.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.circle
            );

            this.bounds.circle.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;
            this.bounds.circle.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;

        }

        if( this.bounds.custom && ! this.bounds.custom.width ) {

            const COMPUTED_STYLES = window.getComputedStyle(
                this.DOM.custom
            );

            this.bounds.custom.width = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'width'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;
            this.bounds.custom.height = parseInt(
                COMPUTED_STYLES
                    .getPropertyValue(
                        'height'
                    )
                    .replace(
                        'px',
                        ''
                    )
                )
            ;

        }

        this.scale = SCALE_MIN;
        this.lastScale = SCALE_MIN;
        this.opacity = 1;
        this.lastOpacity = 1;

        this.mousePos = {
            x: 0,
            y: 0,
        };
        this.lastMousePos = {
            dot: {
                x: 0,
                y: 0,
            },
            circle: {
                x: 0,
                y: 0,
            },
            custom: {
                x: 0,
                y: 0,
            },
        };

        this.initEvents();

        requestAnimationFrame(
            () => this.render()
        );

    }
    initEvents() {

        window.addEventListener(
            'mousemove',
            ev => (
                this.mousePos = getMousePos(
                    ev
                )
            ),
            false
        );

    }
    render() {

        requestAnimationFrame(
            () => this.render()
        );

        const {
            dot,
            circle,
            custom,
            scale,
            opacity,
        } = this.lerps;

        if( this.bounds.dot ) {

            this.lastMousePos.dot.x = lerp(
                this.lastMousePos.dot.x,
                this.mousePos.x - this.bounds.dot.width / 2,
                dot
            );
            this.lastMousePos.dot.y = lerp(
                this.lastMousePos.dot.y,
                this.mousePos.y - this.bounds.dot.height / 2,
                dot
            );

            this.DOM.dot.style.transform = `translateX(${ ( this.lastMousePos.dot.x ) }px) translateY(${ this.lastMousePos.dot.y }px)`;

        }

        if( this.bounds.circle ) {

            this.lastMousePos.circle.x = lerp(
                this.lastMousePos.circle.x,
                this.mousePos.x - this.bounds.circle.width / 2,
                circle
            );
            this.lastMousePos.circle.y = lerp(
                this.lastMousePos.circle.y,
                this.mousePos.y - this.bounds.circle.height / 2,
                circle
            );

            this.DOM.circle.style.transform = `translateX(${ ( this.lastMousePos.circle.x ) }px) translateY(${ this.lastMousePos.circle.y }px) scale(${ this.lastScale })`;

        }

        if( this.bounds.custom ) {

            this.lastMousePos.custom.x = lerp(
                this.lastMousePos.custom.x,
                this.mousePos.x - this.bounds.custom.width / 2,
                custom
            );
            this.lastMousePos.custom.y = lerp(
                this.lastMousePos.custom.y,
                this.mousePos.y - this.bounds.custom.height / 2,
                custom
            );

            this.DOM.custom.style.transform = `translateX(${ ( this.lastMousePos.custom.x ) }px) translateY(${ this.lastMousePos.custom.y }px) scale(${ this.lastScale })`;

        }

        this.lastScale = lerp(
            this.lastScale,
            this.scale,
            scale
        );
        this.lastOpacity = lerp(
            this.lastOpacity,
            this.opacity,
            opacity
        );

    }
    enter() {

        this.scale = SCALE_MAX;

    }
    leave() {

        this.scale = SCALE_MIN;

    }
    click() {

        this.lastScale = SCALE_MIN;
        this.lastOpacity = 0;

    }
    enterHidden() {

        this.DOM.el.style.visibility = 'hidden';

    }
    leaveHidden() {

        this.DOM.el.style.visibility = 'visible';

    }
}

module.exports = CursorFx;
