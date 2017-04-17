# Toasty for Web
[Toasty](https://github.com/GrenderG/Toasty) implementation for webs.

**Idea was taken from [GrenderG](https://github.com/GrenderG) Toasty repository.**

### Installation
1. Copy 'style.css' located inside 'styles/css' into your project and link it with ```<link>```.
2. Copy the JavaScript file 'ToastyWeb.js' into your project and include it in your header with ```<script>```.
3. Enjoy using Toasts!

### Usage
To display an error Toast:
```javascript
ToastyWeb.error('404 Not found').show();
```

To display a success Toast:
```javascript
ToastyWeb.success('Correct!').show();
```

To display an information Toast:
```javascript
ToastyWeb.info('Should you be informed?').show();
```

To display a warning Toast:
```javascript
ToastyWeb.warning('Careful with radiation').show();
```

To display a normal Toast:
```javascript
ToastyWeb.normal('Curious name, Toast').show()
```

To display a normal Toast with icon<sup>1</sup>:
```javascript
ToastyWeb.normal('Wow, an icon appears!', 'videogame_asset').show();
```

To display a totally custom Toast:
```javascript
ToastyWeb.custom('> echo \'Custom Toast rules!\';', '#11FF00', '#000000', 'computer').show();
```

Also, show method has two callbacks:
```javascript
ToastyWeb.success('Correct!').show(function(toastId) {
    //When the Toast has been created and it gets the toastId
}, function(toastId) {
    //When the Toast has been hided
    //If this function returns false, the toast won't be destroyed, just hided
});
```
If you want ommit one of them just set it to true.

### Configuration
You can set a custom class for Toast:
```javascript
    ToastyWeb.customClassName = "myCustomClass";
```

And custom timeOut for Toast dissapear (ms) _default: 2000ms_:
```javascript
    ToastyWeb.customTimeOut = 5000;
```