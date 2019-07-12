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
        el,
        lerps = {}
    ) {

        this.DOM = {
            el,
        };
        this.lerps = {
            ... {
                dot: 1,
                circle: 0.15,
                scale: 0.15,
                opacity: 0.1,
            },
            ... lerps,
        };
        this.DOM.dot = this.DOM.el.querySelector(
            '.cursor__inner--dot'
        );
        this.DOM.circle = this.DOM.el.querySelector(
            '.cursor__inner--circle'
        );

        this.bounds = {
            dot: this.DOM.dot.getBoundingClientRect(),
            circle: this.DOM.circle.getBoundingClientRect(),
        };

        if( ! this.bounds.dot.width ) {

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

        if( ! this.bounds.circle.width ) {

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
            scale,
            opacity,
        } = this.lerps;

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

        this.DOM.dot.style.transform = `translateX(${ ( this.lastMousePos.dot.x ) }px) translateY(${ this.lastMousePos.dot.y }px)`;

        this.DOM.circle.style.transform = `translateX(${ ( this.lastMousePos.circle.x ) }px) translateY(${ this.lastMousePos.circle.y }px) scale(${ this.lastScale })`;

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
