const ID_NAME = 'fullPageScroll';

class fullPageScroll {
    #container;

    constructor(element) {
        if (this.#isElement(element)) {
            this.#container = element;
        } else {
            this.#container = document.querySelector(element);
        }
        this.#init();
    }

    #isElement(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    }

    #getCurrentPage() {
        return Number(window.location.hash.length > 0 ? window.location.hash.split(ID_NAME)[1] : '0');
    }

    #isAtPage(page) {
        return (window.pageYOffset || document.documentElement.scrollTop) == page.offsetTop;
    }

    #init() {
        /* ids */
        const pages = this.#container.children;
        for (var id = 0; id < pages.length; id++) {
            pages[id].id = ID_NAME + id;
        }

        /* mousewheel */
        document.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            
            const currentPage = this.#getCurrentPage();

            if (evt.wheelDeltaY > 0) { // Up
                if (this.#isAtPage(pages[currentPage]) && pages[currentPage - 1]) {
                    window.location.hash = '#' + ID_NAME + (currentPage - 1);
                }
            } else { // Down
                if (this.#isAtPage(pages[currentPage]) && pages[currentPage + 1]) {
                    window.location.hash = '#' + ID_NAME + (currentPage + 1);
                }
            }

        }, { passive: false });
    }
}

const a = new fullPageScroll("#container");
