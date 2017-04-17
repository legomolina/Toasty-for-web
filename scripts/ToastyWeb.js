/**
 * Main container for Toasty interaction
 */
var ToastyWeb = function() {

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
         * @returns {object} ShowToast instance to implement .show() method
         */
        error: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "close");
            toast = setToastBackground(toast, ERRO_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        /**
         * Create a success Toast with custom text
         * @param {string} text The text to show on the toast
         * @returns {object} ShowToast instance to implement .show() method
         */
        success: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "check");
            toast = setToastBackground(toast, SUCC_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        /**
         * Create an info Toast with custom text
         * @param {string} text The text to show on the toast
         * @returns {object} ShowToast instance to implement .show() method
         */
        info: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "info_outline");
            toast = setToastBackground(toast, INFO_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        /**
         * Create an warning Toast with custom text
         * @param {string} text The text to show on the toast
         * @returns {object} ShowToast instance to implement .show() method
         */
        warning: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "warning");
            toast = setToastBackground(toast, WARN_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        /**
         * Create a normal Toast with custom text
         * @param {string} text The text to show on the toast
         * @param {string} [icon] The code for icon
         * @returns {object} ShowToast instance to implement .show() method
         */
        normal: function(text, icon) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);

            toast = setToastBackground(toast, NORM_COLOR);

            if(icon !== undefined)
                toast = setToastIcon(toast, icon);

            return new showToast(toast, this.customTimeOut);
        },

        /**
         * Create a custom Toast with custom text, background color and font color
         * @param {string} text The text to show on the toast
         * @param {string} foreColor The font color
         * @param {string} backgroundColor The background color
         * @param {string} icon The code for icon
         * @returns {object} ShowToast instance to implement .show() method
         */
        custom: function(text, foreColor, backgroundColor, icon) {
            if(!checkIsText(text))
                return false;

            var bgColor = (backgroundColor !== undefined) ? backgroundColor : NORM_COLOR;
            var foColor = (foreColor !== undefined) ? foreColor : '#FFFFFF';

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastBackground(toast, bgColor);
            toast = setToastForeColor(toast, foColor);

            if(icon !== undefined)
                toast = setToastIcon(toast, icon);

            return new showToast(toast, this.customTimeOut);
        }
    };

    /**
     * Method to create and show toasts in Document
     * @param toast The toast to show
     * @param {int} timeOut Milliseconds toast will be active
     */
    var showToast = function(toast, timeOut) {

        /**
         * Method to render toasts in the Docuement
         * @param {function} [showCallback] Callback that will be called when the toast shows
         * @param {function} [hideCallback] Callback that will be called when the toast hides
         */
        this.show = function(showCallback, hideCallback) {
            if(typeof showCallback !== 'function')
                showCallback = function() {return true;};

            if(typeof hideCallback !== 'function')
                hideCallback = function() {return true;};

            toastQueue.push({
                toast: toast,
                showCallback: showCallback,
                hideCallback: hideCallback
            });

            //If it's the first on the queue
            if(!queuing)
                createToast(toastQueue[0]);
        };

        /**
         * Method that calls itself while there are toasts in the queue
         * @param {{toast: Element, showCallback: function, hideCallback: function}} toast Current toast to show
         * @returns {boolean} True when ends the queue
         */
        function createToast(toast) {
            queuing = true;

            //There's no more toasts
            if(toast === undefined) {
                queuing = false;
                return true;
            }

            //Append toast to the document
            document.querySelector('body').appendChild(toast.toast);

            //This prevents CSS transition bugs
            setTimeout(function() {
                toast.toast.classList.add("show");

                toast.showCallback(toast.toast.id);
            }, 1);

            setTimeout(function() {
                toast.toast.classList.remove('show');

                //When transitions ends remove (or not) the toast
                toast.toast.addEventListener('transitionend', function(e) {
                    if(e.propertyName === 'bottom') {
                        if(toast.hideCallback(toast.toast.id) !== false)
                            toast.toast.parentNode.removeChild(toast.toast);
                    }
                });

                //Remove the actual toast from the queue
                toastQueue.splice(0, 1);

                //Calls itself with the next toast in the queue
                createToast(toastQueue[0]);
            }, timeOut);
        }
    };

    //Color constants
    var ERRO_COLOR = "#D50000";
    var INFO_COLOR = "#3F51B5";
    var SUCC_COLOR = "#388E3C";
    var WARN_COLOR = "#FFA900";
    var NORM_COLOR = "#646464";

    //Queue variables
    var toastQueue = [];
    var queuing = false;

    /**
     * Checks if text is really a text
     * @param {string} text
     * @returns {boolean} True if its a text, false if there is no text.
     */
    function checkIsText(text) {
        if(text === undefined) {
            console.error("Text must be provided to work!");
            return false;
        }

        return true;
    }

    /**
     * Method to create Toasts
     * @param {string} customClass Custom class for toasts
     * @returns {*} New toast
     */
    function Toast(customClass) {
        var newToast = document.createElement("DIV");
        newToast.className = "toasty-web " + customClass;
        newToast.id = btoa(new Date().getTime().toString());

        var toastContainer, iconContainer, textContainer;
        toastContainer = document.createElement("DIV");
        toastContainer.className = "toasty-web-container";

        iconContainer = document.createElement("DIV");
        iconContainer.className = "toasty-icon-container material-icons";

        textContainer = document.createElement("DIV");
        textContainer.className = "toasty-text-container";

        toastContainer.appendChild(iconContainer);
        toastContainer.appendChild(textContainer);

        newToast.appendChild(toastContainer);

        return newToast;
    }

    /**
     * Set text to a given toast
     * @param toast The toast to apply text
     * @param {string} text Text to apply
     * @returns Toast with the text embedded
     */
    function setToastText(toast, text) {
        toast.querySelector('.toasty-web .toasty-text-container').innerHTML = text;
        return toast;
    }

    /**
     * Set icon to a given toast
     * @param toast The toast to insert the icon
     * @param {string} icon Icon to set
     * @returns Toast with the icon embedded
     */
    function setToastIcon(toast, icon) {
        toast.querySelector('.toasty-web .toasty-icon-container').innerText = icon;
        return toast;
    }

    /**
     * Set background color to a given toast
     * @param toast The toast to apply the color
     * @param {string} color Color to apply
     * * @returns {*} Toast with the new background or false if color is not hex
     */
    function setToastBackground(toast, color) {
        if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
            console.error("color must be a correct hex string!");
            return false;
        }

        toast.querySelector('.toasty-web-container').style.backgroundColor = color;
        return toast;
    }

    /**
     * Set font color to a given toast
     * @param toast The toast to apply the color
     * @param {string} color Color to apply
     * @returns {*} Toast with the new color or false if color is not hex
     */
    function setToastForeColor(toast, color) {
        if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
            console.error("color must be a correct hex string!");
            return false;
        }

        toast.querySelector('.toasty-web-container').style.color = color;
        return toast;
    }

    return toasty;
}();