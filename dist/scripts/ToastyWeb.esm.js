/**
 * Implementation of queue collection
 */var Queue=/** @class */function(){function a(){this.elements=[]}return a.prototype.enqueue=function(a){this.elements.push(a)},a.prototype.dequeue=function(){var a=this.elements.splice(0,1);return a[0]},a.prototype.peek=function(){return this.elements[0]},a.prototype.size=function(){return this.elements.length},a}(),ToastyWeb=/** @class */function(){function a(){}/**
     * Create an error Toast with custom text
     * @param {string} text The text to show on the toast
     * @param {boolean} [showIcon=true] False if don't want to show the icon
     * @@returns {Toast} Instance of toast
     */return a.error=function(b,c){void 0===c&&(c=!0);var d=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(a.ERRO_COLOR).setForeColor(a.WHIT_COLOR);return c&&d.setIcon("close"),d},a.success=function(b,c){void 0===c&&(c=!0);var d=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(a.SUCC_COLOR).setForeColor(a.WHIT_COLOR);return c&&d.setIcon("check"),d},a.info=function(b,c){void 0===c&&(c=!0);var d=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(a.INFO_COLOR).setForeColor(a.WHIT_COLOR);return c&&d.setIcon("info_outline"),d},a.warning=function(b,c){void 0===c&&(c=!0);var d=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(a.WARN_COLOR).setForeColor(a.WHIT_COLOR);return c&&d.setIcon("warning"),d},a.normal=function(b,c){void 0===c&&(c="");var d=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(a.NORM_COLOR).setForeColor(a.WHIT_COLOR);return""!==c&&d.setIcon(c),d},a.custom=function(b,c,d,e){void 0===c&&(c=a.WHIT_COLOR),void 0===d&&(d=a.NORM_COLOR),void 0===e&&(e="");var f=new Toast(a.customClass,a.customTimeOut).setText(b).setBackgroundColor(d).setForeColor(c);return""!==e&&f.setIcon(e),f},a.ERRO_COLOR="#D50000",a.INFO_COLOR="#3F51B5",a.SUCC_COLOR="#388E3C",a.WARN_COLOR="#FFA900",a.NORM_COLOR="#646464",a.WHIT_COLOR="#FFFFFF",a.customClass="",a.customTimeOut=2e3,a}(),Toast=/** @class */function(){/**
     * @param {string} customClass Custom class for toasts
     * @param {number} customTimeOut Custom timeOut for showing toasts
     */function a(a,b){this.backgroundColor="",this.foreColor="",this.text="",this.icon="",this.customClass=a,this.customTimeOut=b}/**
     * Method to render toasts in the Docuement
     * @param {(id: string) => boolean} [showCallback] Callback that will be called when the toast shows
     * @param {(id: string) => boolean} [hideCallback] Callback that will be called when the toast hides
     */return a.prototype.show=function(b,c){var d=this.createToast();b||(b=function(){return!0}),c||(c=function(){return!0}),a.toastQueue.enqueue({toast:d,showCallback:b,hideCallback:c}),2>a.toastQueue.size()&&this.showToast(a.toastQueue.peek())},a.prototype.setBackgroundColor=function(a){return this.isValidColor(a)&&(this.backgroundColor=a),this},a.prototype.setForeColor=function(a){return this.isValidColor(a)&&(this.foreColor=a),this},a.prototype.setText=function(a){return this.text=a,this},a.prototype.setIcon=function(a){return this.icon=a,this},a.prototype.createToast=function(){var a=document.createElement("div");a.classList.add("toasty-web"),this.customClass&&a.classList.add(this.customClass),a.id=btoa(new Date().getTime().toString());var b,c,d;return b=document.createElement("div"),b.classList.add("toasty-web-container"),b.style.backgroundColor=this.backgroundColor,b.style.color=this.foreColor,c=document.createElement("div"),c.classList.add("toasty-icon-container"),c.classList.add("material-icons"),""!==this.icon&&(c.textContent=this.icon),b.appendChild(c),d=document.createElement("div"),d.classList.add("toasty-text-container"),d.innerHTML=this.text,b.appendChild(d),a.appendChild(b),a},a.prototype.showToast=function(b){var c=this;if(b){//Append toast to the document
var d=document.querySelector("body");null===d||(//This prevents CSS transition bugs
d.appendChild(b.toast),setTimeout(function(){b.toast.classList.add("show"),b.showCallback&&b.showCallback(b.toast.id)},20),setTimeout(function(){b.toast.classList.remove("show"),b.toast.addEventListener("transitionend",function(a){if("bottom"===a.propertyName&&b.hideCallback&&!1!==b.hideCallback(b.toast.id)){var c=b.toast.parentNode;c&&c.removeChild(b.toast)}}),a.toastQueue.dequeue(),c.showToast(a.toastQueue.peek())},this.customTimeOut))}},a.prototype.isValidColor=function(a){return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},a.toastQueue=new Queue,a}();/**
 * Main container for Toasty interaction
 */export default ToastyWeb;