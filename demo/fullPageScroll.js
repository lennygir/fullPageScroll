const ID_NAME = 'fullPageScroll';

class fullPageScroll {
    #container;
    #options;

    constructor(element, options = {}) {
        if (this.#isElement(element)) {
            this.#container = element;
        } else {
            this.#container = document.querySelector(element);
        }
        this.#options = options;
        
        this.#init();
        if(this.#options.pageIndicator) {
            this.#initPageIndicator();
        }
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
            pages[id].classList.add('fullPageScrollPage');
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

        /* keydown */
        document.addEventListener('keydown', (evt) => {

            const currentPage = this.#getCurrentPage();

            if (evt.key === 'ArrowUp') { // Up
                evt.preventDefault();
                if (this.#isAtPage(pages[currentPage]) && pages[currentPage - 1]) {
                    window.location.hash = '#' + ID_NAME + (currentPage - 1);
                }
            } else if (evt.key === 'ArrowDown') { // Down
                evt.preventDefault();
                if (this.#isAtPage(pages[currentPage]) && pages[currentPage + 1]) {
                    window.location.hash = '#' + ID_NAME + (currentPage + 1);
                }
            } else if (evt.key === ' ') { // Space
                evt.preventDefault();
                if (this.#isAtPage(pages[currentPage]) && pages[currentPage + 1]) {
                    window.location.hash = '#' + ID_NAME + (currentPage + 1);
                }
            }
        })
    };

    #initPageIndicator() {
        const pages = this.#container.children;
        const pageIndicator = document.createElement('div');
        pageIndicator.classList.add('fullPageScrollPageIndicator');
        for (var id = 0; id < pages.length; id++) {
            (() => {
                const idPage = id;
                const pageIndicatorItem = document.createElement('div');
                pageIndicatorItem.classList.add('fullPageScrollPageIndicatorItem');
                pageIndicatorItem.addEventListener('click', () => {
                    window.location.hash = '#' + ID_NAME + idPage;
                });
                pageIndicator.appendChild(pageIndicatorItem);
            })();
        }
        this.#container.appendChild(pageIndicator);
    }
}

const a = new fullPageScroll("#container", { pageIndicator: true });
