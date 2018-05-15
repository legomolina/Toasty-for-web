/**
 * Main container for Toasty interaction
 */
var ToastyWeb = function () {

    /**
     * Main method to interact with user
     */
    var toasty = {
        /**
         * Custom class name for toasts
         */
        customClassName: '',
        /**
         * Custom timeout to hide toasts
         */
        customTimeOut: 2000,

        /**
         * Create an error Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {boolean} [showIcon=true] False if don't want to show the icon
         * @@returns {Toast} Instance of toast
         */
        error: function (text, showIcon) {
            if (text === undefined)
                return false;

            showIcon = showIcon === undefined ? true : showIcon;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(ERRO_COLOR);
            toast.setToastForeColor(WHIT_COLOR);

            if (showIcon)
                toast.setToastIcon("close");

            return toast;
        },

        /**
         * Create a success Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {boolean} [showIcon=true] False if don't want to show the icon
         * @returns {Toast} Instance of toast
         */
        success: function (text, showIcon) {
            if (text === undefined)
                return false;

            showIcon = showIcon === undefined ? true : showIcon;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(SUCC_COLOR);
            toast.setToastForeColor(WHIT_COLOR);

            if (showIcon)
                toast.setToastIcon("check");

            return toast;
        },

        /**
         * Create an info Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {boolean} [showIcon=true] False if don't want to show the icon
         * @returns {Toast} Instance of toast
         */
        info: function (text, showIcon) {
            if (text === undefined)
                return false;

            showIcon = showIcon === undefined ? true : showIcon;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(INFO_COLOR);
            toast.setToastForeColor(WHIT_COLOR);

            if (showIcon)
                toast.setToastIcon("info_outline");

            return toast;
        },

        /**
         * Create an warning Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {boolean} [showIcon=true] False if don't want to show the icon
         * @returns {Toast} Instance of toast
         */
        warning: function (text, showIcon) {
            if (text === undefined)
                return false;

            showIcon = showIcon === undefined ? true : showIcon;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(WARN_COLOR);
            toast.setToastForeColor(WHIT_COLOR);

            if (showIcon)
                toast.setToastIcon("warning");

            return toast;
        },

        /**
         * Create a normal Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {string} [icon] The code for icon
         * @returns {Toast} Instance of toast 
         */
        normal: function (text, icon) {
            if (text === undefined)
                return false;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(NORM_COLOR);
            toast.setToastForeColor(WHIT_COLOR);

            if (icon !== undefined)
                toast.setToastIcon(icon);

            return toast;
        },

        /**
         * Create a custom Toast with custom text, background color, font color and icon
         * @param {string} text The text to show on the toast
         * @param {string} foreColor The font color
         * @param {string} backgroundColor The background color
         * @param {string} icon The code for icon
         * @returns {Toast} Instance of toast
         */
        custom: function (text, foreColor, backgroundColor, icon) {
            if (text === undefined)
                return false;

            backgroundColor = backgroundColor || NORM_COLOR;
            foreColor = foreColor || WHIT_COLOR;

            var toast = new Toast(this.customClassName, this.customTimeOut);
            toast.setToastText(text);
            toast.setToastBackground(backgroundColor);
            toast.setToastForeColor(foreColor);

            if (icon !== undefined)
                toast.setToastIcon(icon);

            return toast;
        }
    };

    //Color constants
    var ERRO_COLOR = "#D50000";
    var INFO_COLOR = "#3F51B5";
    var SUCC_COLOR = "#388E3C";
    var WARN_COLOR = "#FFA900";
    var NORM_COLOR = "#646464";
    var WHIT_COLOR = "#FFFFFF";

    //Queue variables
    var toastQueue = new Queue();

    /**
     * Toast class
     * @param {string} customClass Custom class for toasts
     * @param {number} customTimeOut Custom timeOut for showing toasts
     */
    function Toast(customClass, customTimeOut) {
        var properties = {
            backgroundColor: "",
            foreColor: "",
            icon: "",
            text: ""
        };

        /**
         * Set toast background
         * @param {string} color Color to apply
         * @returns {boolean} False if color is not hex
         */
        this.setToastBackground = function (color) {
            if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
                console.error("color must be a correct hex string!");
                return false;
            }

            properties.backgroundColor = color;
        };

        /**
         * Set toast font color
         * @param {string} color Color to apply
         * @returns {boolean} False if color is not hex
         */
        this.setToastForeColor = function (color) {
            if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
                console.error("color must be a correct hex string!");
                return false;
            }

            properties.foreColor = color;
        };

        /**
         * Set toast text
         * @param {string} text Text to apply
         */
        this.setToastText = function (text) {
            properties.text = text;
        };

        /**
         * Set toast icon
         * @param {string} icon Icon to set
         */
        this.setToastIcon = function (icon) {
            properties.icon = icon;
        };

        /**
         * Method to render toasts in the Docuement
         * @param {function} [showCallback] Callback that will be called when the toast shows
         * @param {function} [hideCallback] Callback that will be called when the toast hides
         */
        this.show = function (showCallback, hideCallback) {
            var htmlToast = createToast(customClass);

            if (typeof showCallback !== 'function')
                showCallback = function () { return true; };

            if (typeof hideCallback !== 'function')
                hideCallback = function () { return true; };

            toastQueue.enqueue({
                toast: htmlToast,
                showCallback: showCallback,
                hideCallback: hideCallback
            });

            if (toastQueue.size() < 2)
                showToast(toastQueue.peek());
        };

        /**
         * Creates the DOM node of a toast
         * @param {string} customClass Custom class to add to toast container
         */
        function createToast(customClass) {
            var newToast = document.createElement("DIV");
            newToast.className = "toasty-web " + customClass;
            newToast.id = btoa(new Date().getTime().toString());

            var toastContainer, iconContainer, textContainer;
            toastContainer = document.createElement("DIV");
            toastContainer.className = "toasty-web-container";
            toastContainer.style.backgroundColor = properties.backgroundColor;
            toastContainer.style.color = properties.foreColor;

            if (properties.icon !== "") {
                iconContainer = document.createElement("DIV");
                iconContainer.className = "toasty-icon-container material-icons";
                iconContainer.innerText = properties.icon;

                toastContainer.appendChild(iconContainer);
            }

            textContainer = document.createElement("DIV");
            textContainer.className = "toasty-text-container";
            textContainer.innerHTML = properties.text;

            toastContainer.appendChild(textContainer);

            newToast.appendChild(toastContainer);

            return newToast;
        }

        function showToast(toast) {
            if (toast === null)
                return false;

            //Append toast to the document
            document.querySelector('body').appendChild(toast.toast);

            //This prevents CSS transition bugs
            setTimeout(function () {
                toast.toast.classList.add("show");

                toast.showCallback(toast.toast.id);
            }, 1);

            setTimeout(function () {
                toast.toast.classList.remove('show');

                //When transitions ends remove (or not) the toast
                toast.toast.addEventListener('transitionend', function (e) {
                    if (e.propertyName === 'bottom') {
                        if (toast.hideCallback(toast.toast.id) !== false)
                            toast.toast.parentNode.removeChild(toast.toast);
                    }
                });

                //Remove the actual toast from the queue
                toastQueue.dequeue();

                //Calls itself with the next toast in the queue
                showToast(toastQueue.peek());
            }, customTimeOut);
        }
    }

    /**
     * Implementation of queue collection
     */
    function Queue() {
        var elements = [];

        this.enqueue = function (element) {
            elements.push(element);
        };

        this.dequeue = function () {
            var removedElement = elements.splice(0, 1);
            return removedElement.length > 0 ? removedElement[0] : null;
        };

        this.peek = function () {
            return elements[0] !== undefined ? elements[0] : null;
        };

        this.size = function () {
            return elements.length;
        }
    }

    return toasty;
}();