import Queue from "./Queue";

/**
 * Main container for Toasty interaction
 */
class ToastyWeb {
    private static readonly ERRO_COLOR = "#D50000";
    private static readonly INFO_COLOR = "#3F51B5";
    private static readonly SUCC_COLOR = "#388E3C";
    private static readonly WARN_COLOR = "#FFA900";
    private static readonly NORM_COLOR = "#646464";
    private static readonly WHIT_COLOR = "#FFFFFF";

    public static customClass = "";
    public static customTimeOut = 2000;

    /**
     * Create an error Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {boolean} [showIcon=true] False if don't want to show the icon
     * @@returns {Toast} Instance of toast
     */
    public static error(text: string, showIcon: boolean = true): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(ToastyWeb.ERRO_COLOR)
            .setForeColor(ToastyWeb.WHIT_COLOR);

        if (showIcon) {
            toast.setIcon("close");
        }

        return toast;
    }

    /**
     * Create a success Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {boolean} [showIcon=true] False if don't want to show the icon
     * @returns {Toast} Instance of toast
     */
    public static success(text: string, showIcon: boolean = true): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(ToastyWeb.SUCC_COLOR)
            .setForeColor(ToastyWeb.WHIT_COLOR);

        if (showIcon) {
            toast.setIcon("check");
        }

        return toast;
    }

    /**
     * Create an info Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {boolean} [showIcon=true] False if don't want to show the icon
     * @returns {Toast} Instance of toast
     */
    public static info(text: string, showIcon: boolean = true): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(ToastyWeb.INFO_COLOR)
            .setForeColor(ToastyWeb.WHIT_COLOR);

        if (showIcon) {
            toast.setIcon("info_outline");
        }

        return toast;
    }

    /**
     * Create an warning Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {boolean} [showIcon=true] False if don't want to show the icon
     * @returns {Toast} Instance of toast
     */
    public static warning(text: string, showIcon: boolean = true): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(ToastyWeb.WARN_COLOR)
            .setForeColor(ToastyWeb.WHIT_COLOR);

        if (showIcon) {
            toast.setIcon("warning");
        }

        return toast;
    }

    /**
     * Create a normal Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {string} [icon=""] The code for icon
     * @returns {Toast} Instance of toast 
     */
    public static normal(text: string, icon: string = ""): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(ToastyWeb.NORM_COLOR)
            .setForeColor(ToastyWeb.WHIT_COLOR);

        if (icon !== "") {
            toast.setIcon(icon);
        }

        return toast;
    }

    /**
     * Create a custom Toast with custom text, background color, font color and icon
     * @param {string} [text] The text to show on the toast
     * @param {string} [foreColor=ToastyWeb.WHIT_COLOR] The font color
     * @param {string} [backgroundColor=ToastyWeb.NORM_COLOR] The background color
     * @param {string} [icon=""] The code for icon
     * @returns {Toast} Instance of toast
     */
    public static custom(text: string, foreColor: string = ToastyWeb.WHIT_COLOR, backgroundColor: string = ToastyWeb.NORM_COLOR, icon: string = ""): Toast {
        const toast = new Toast(ToastyWeb.customClass, ToastyWeb.customTimeOut)
            .setText(text)
            .setBackgroundColor(backgroundColor)
            .setForeColor(foreColor);

        if (icon !== "") {
            toast.setIcon(icon);
        }

        return toast;
    }
}

/**
 * Toast class
 */
class Toast {
    private customClass: string;
    private customTimeOut: number;
    
    private backgroundColor: string = "";
    private foreColor: string = "";
    private text: string = "";
    private icon: string = "";

    private static readonly toastQueue: Queue<{ toast: HTMLElement, showCallback?: (id: string) => boolean, hideCallback?: (id: string) => boolean }> = new Queue();

    /**
     * @param {string} customClass Custom class for toasts
     * @param {number} customTimeOut Custom timeOut for showing toasts
     */
    public constructor(customClass: string, customTimeOut: number) {
        this.customClass = customClass;
        this.customTimeOut = customTimeOut;
    }

    /**
     * Method to render toasts in the Docuement
     * @param {(id: string) => boolean} [showCallback] Callback that will be called when the toast shows
     * @param {(id: string) => boolean} [hideCallback] Callback that will be called when the toast hides
     */
    public show(showCallback?: (id: string) => boolean, hideCallback?: (id: string) => boolean) {
        const htmlToast = this.createToast();

        if (!showCallback) {
            showCallback = () => true;
        }

        if (!hideCallback) {
            hideCallback = () => true;
        }

        Toast.toastQueue.enqueue({
            toast: htmlToast,
            showCallback: showCallback,
            hideCallback: hideCallback
        });

        if (Toast.toastQueue.size() < 2) {
            this.showToast(Toast.toastQueue.peek());
        }
    }

    /**
         * Set toast background
         * @param {string} color Color to apply
         * @returns {Toast} Returns this
         */
    public setBackgroundColor(color: string): Toast {
        if (this.isValidColor(color)) {
            this.backgroundColor = color;
        }

        return this;
    }

    /**
     * Set toast font color
     * @param {string} color Color to apply
     * @returns {Toast} Returns this
     */
    public setForeColor(color: string): Toast {
        if (this.isValidColor(color)) {
            this.foreColor = color;
        }

        return this;
    }

    /**
     * Set toast text
     * @param {string} text Text to apply
     * @returns {Toast} Returns this
     */
    public setText(text: string): Toast {
        this.text = text;

        return this;
    }

    /**
     * Set toast icon
     * @param {string} icon Icon to set
     * @returns {Toast} Returns this
     */
    public setIcon(icon: string): Toast {
        this.icon = icon;

        return this;
    }

    /**
     * Creates the DOM element of a toast
     * @returns {HTMLElement} Created DOM element
     */
    private createToast(): HTMLElement {
        const htmlToast = document.createElement("div");
        htmlToast.classList.add("toasty-web");

        if (this.customClass) {
            htmlToast.classList.add(this.customClass);
        }

        htmlToast.id = btoa(new Date().getTime().toString());

        let toastContainer: HTMLElement;
        let iconContainer: HTMLElement;
        let textContainer: HTMLElement;

        toastContainer = document.createElement("div");
        toastContainer.classList.add("toasty-web-container");
        toastContainer.style.backgroundColor = this.backgroundColor;
        toastContainer.style.color = this.foreColor;

        iconContainer = document.createElement("div");
        iconContainer.classList.add("toasty-icon-container");
        iconContainer.classList.add("material-icons");

        if (this.icon !== "") {
            iconContainer.textContent = this.icon;
        }

        toastContainer.appendChild(iconContainer);

        textContainer = document.createElement("div");
        textContainer.classList.add("toasty-text-container");
        textContainer.innerHTML = this.text;

        toastContainer.appendChild(textContainer);

        htmlToast.appendChild(toastContainer);

        return htmlToast;
    }

    private showToast(toastData: { toast: HTMLElement, showCallback?: (id: string) => void, hideCallback?: (id: string) => boolean }): void {
        if (!toastData) {
            return;
        }
        
        //Append toast to the document
        let body = document.querySelector("body");

        if (body === null) {
            return;
        }

        body.appendChild(toastData.toast);

        //This prevents CSS transition bugs
        setTimeout(() => {
            toastData.toast.classList.add("show");
            if (toastData.showCallback) {
                toastData.showCallback(toastData.toast.id);
            }
        }, 20);

        setTimeout(() => {
            toastData.toast.classList.remove("show");

            //When transitions ends remove (or not) the toast
            toastData.toast.addEventListener("transitionend", (e: TransitionEvent) => {
                if (e.propertyName === "bottom") {
                    if (toastData.hideCallback) {
                        if (toastData.hideCallback(toastData.toast.id) !== false) {
                            let parent = toastData.toast.parentNode;

                            if (parent) {
                                parent.removeChild(toastData.toast);
                            }
                        }
                    }
                }
            });

            //Remove the actual toast from the queue
            Toast.toastQueue.dequeue();

            //Calls itself with the next toast in the queue
            this.showToast(Toast.toastQueue.peek());

        }, this.customTimeOut);
    }

    private isValidColor(color: string): boolean {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    }
}

export default ToastyWeb;