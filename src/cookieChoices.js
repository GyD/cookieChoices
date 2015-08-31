var cookieChoices = (function () {

    function cookieChoices(options) {
        this.message = null;
        this.closeCopy = null;
        this.readMore = {
            copy: null,
            href: null
        };
        this.closeAction = null;
        this.cookieName = 'cookieChoiceStatus';
        this.denyCopy = null;

        if (null !== options) {
            for (k in options) {
                this[k] = options[k];
            }
        }

        this.overId = 'cookieChoises';
    }

    /**
     * Read More
     *
     * @param value
     * @param href
     * @returns {cookieChoices}
     */
    cookieChoices.prototype.setReadMore = function (value, href) {
        this.readMore = {copy: value, href: href}

        return this;
    };

    /**
     * Set Message
     *
     * @param value
     * @returns {cookieChoices}
     */
    cookieChoices.prototype.setMessage = function (value) {
        this.message = value;
        return this;
    };


    /**
     * Set the button copy
     *
     * @param value
     * @returns {cookieChoices}
     */
    cookieChoices.prototype.setAllowCopy =
        cookieChoices.prototype.setCloseCopy = function (value) {
            this.closeCopy = value;
            return this;
        };

    cookieChoices.prototype.setDenyCopy = function (value) {
        this.denyCopy = value;
        return this;
    };


    cookieChoices.prototype.eventEraseCookies = function(){
        this.eraseCookies();
        that = this;
        window.onunload = window.onload = function(){
            that.eraseCookies();
        };
    };


    /**
     * Show the cookieChoices
     */
    cookieChoices.prototype.show = function () {

        if (this.getCookie(this.cookieName) == 'false') {
            this.eventEraseCookies();
        }

        if (this.getCookie(this.cookieName) != '') {
            return null;
        }

        var overElement = this.overElement();
        overElement.appendChild(this.textElement());

        var readMoreElement = this.readMoreElement();

        if (readMoreElement) {
            overElement.appendChild(readMoreElement);
        }

        var denyElement = this.denyElement();
        if (denyElement) {
            overElement.appendChild(denyElement);
        }

        overElement.appendChild(this.closeElement());

        document.body.appendChild(overElement);
    };

    cookieChoices.prototype.denyElement = function () {
        var closeElement = this.createElement('a', this.denyCopy);

        var that = this;
        closeElement.onclick = function () {
            that.eraseCookies();
            that.setCookie(that.cookieName, 'false', 1);
            document.body.removeChild(document.getElementById(that.overId));
        };

        return closeElement;
    };

    /**
     * Create the over element
     *
     * @returns {Element}
     */
    cookieChoices.prototype.overElement = function () {
        var overElement = document.createElement('div');
        overElement.setAttribute('id', this.overId);

        return overElement;
    };

    /**
     * Create the text element
     */
    cookieChoices.prototype.textElement = function () {
        var textElement = this.createElement('span', this.message);

        return textElement;
    };

    /**
     * Create a read more element
     * @returns {*}
     */
    cookieChoices.prototype.readMoreElement = function () {
        if (this.readMore.copy == null && this.readMore.href !== null) {
            return null;
        }

        var readMoreElement = this.createElement('a', this.readMore.copy);
        readMoreElement.setAttribute('href', this.readMore.href);

        return readMoreElement;

    };

    /**
     * Small function to create an html element
     *
     * @param tag
     * @param text
     * @returns {Element}
     */
    cookieChoices.prototype.createElement = function (tag, text) {
        var element = document.createElement(tag);
        if (null !== text) {
            var textElement = document.createTextNode(text);
            element.appendChild(textElement);
        }
        return element;
    };

    /**
     * Create a close element button
     */
    cookieChoices.prototype.closeElement = function () {
        var closeElement = this.createElement('a', this.closeCopy);

        var that = this;
        closeElement.onclick = function () {
            document.body.removeChild(document.getElementById(that.overId));
            that.setCookie(that.cookieName, 'true', 1);
            if (null !== that.closeAction) {
                that.closeAction();
            }
        };

        return closeElement;
    };

    /**
     * Add a close action on close element
     */
    cookieChoices.prototype.addCloseAction = function (callback) {
        this.closeAction = callback;

        return this;
    };


    cookieChoices.prototype.eraseCookies = function () {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

            if (name.trim() != this.cookieName) {
                var domain_prefix = ['', '.', 'www'];
                var names = [name, name.trim()];

                for (k in domain_prefix) {
                    for (j in names) {
                        document.cookie = names[k] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        document.cookie = names[k] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain_prefix[k] + window.location.hostname;
                    }
                }
            }
        }
    };

    cookieChoices.prototype.getCookie = function (name) {
        var name = name + "=";
        var cookiesArray = document.cookie.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
            var cookie = cookiesArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    };

    cookieChoices.prototype.setCookie = function (name, value, expiration) {
        var date = new Date();
        date.setTime(date.getTime() + (expiration * 864e5));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    };


    return cookieChoices;

})();