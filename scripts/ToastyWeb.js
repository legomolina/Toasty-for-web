var ToastyWeb = function() {

    var toasty = {
        customClassName: '',
        customTimeOut: 2000,

        error: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "close");
            toast = setToastBackground(toast, ERRO_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        success: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "check");
            toast = setToastBackground(toast, SUCC_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        info: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "info_outline");
            toast = setToastBackground(toast, INFO_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

        warning: function(text) {
            if(!checkIsText(text))
                return false;

            var toast = new Toast(this.customClassName);

            toast = setToastText(toast, text);
            toast = setToastIcon(toast, "warning");
            toast = setToastBackground(toast, WARN_COLOR);

            return new showToast(toast, this.customTimeOut);
        },

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

    var showToast = function(toast, timeOut) {
        this.show = function(showCallback, hideCallback) {
            if(typeof showCallback !== 'function')
                showCallback = function() {return true;};

            if(typeof hideCallback !== 'function')
                hideCallback = function() {return true;};

            document.querySelector('body').appendChild(toast);

            setTimeout(function() {
                toast.classList.add("show");

                showCallback(toast.id);
            }, 1);

            setTimeout(function() {
                toast.classList.remove('show');

                toast.addEventListener('transitionend', function(e) {
                    if(e.propertyName === 'bottom') {
                        if(hideCallback(toast.id) !== false)
                            toast.parentNode.removeChild(toast);
                    }
                });
            }, timeOut);
        };
    };

    var ERRO_COLOR = "#D50000";
    var INFO_COLOR = "#3F51B5";
    var SUCC_COLOR = "#388E3C";
    var WARN_COLOR = "#FFA900";
    var NORM_COLOR = "#646464";

    function checkIsText(text) {
        if(text === undefined) {
            console.error("Text must be provided to work!");
            return false;
        }

        return true;
    }

    function Toast(customClass) {
        var newToast = document.createElement("DIV");
        newToast.className = "toasty-web " + customClass;
        newToast.id = btoa(String.valueOf(new Date().getTime()));

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

    function setToastText(toast, text) {
        toast.querySelector('.toasty-web .toasty-text-container').innerHTML = text;
        return toast;
    }

    function setToastIcon(toast, icon) {
        toast.querySelector('.toasty-web .toasty-icon-container').innerText = icon;
        return toast;
    }

    function setToastBackground(toast, color) {
        if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
            console.error("color must be a correct hex string!");
            return false;
        }

        toast.querySelector('.toasty-web-container').style.backgroundColor = color;
        return toast;
    }

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