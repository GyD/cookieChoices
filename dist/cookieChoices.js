var cookieChoices=function(){function a(a){if(this.message=null,this.closeCopy=null,this.readMore={copy:null,href:null},this.closeAction=null,this.cookieName="cookieChoiceStatus",this.denyCopy=null,null!==a)for(k in a)this[k]=a[k];this.overId="cookieChoises"}return a.prototype.setReadMore=function(a,b){return this.readMore={copy:a,href:b},this},a.prototype.setMessage=function(a){return this.message=a,this},a.prototype.setAllowCopy=a.prototype.setCloseCopy=function(a){return this.closeCopy=a,this},a.prototype.setDenyCopy=function(a){return this.denyCopy=a,this},a.prototype.eventEraseCookies=function(){this.eraseCookies(),that=this,window.onunload=window.onload=function(){that.eraseCookies()}},a.prototype.show=function(){if("false"==this.getCookie(this.cookieName)&&this.eventEraseCookies(),""!=this.getCookie(this.cookieName))return null;var a=this.overElement();a.appendChild(this.textElement());var b=this.readMoreElement();b&&a.appendChild(b);var c=this.denyElement();c&&a.appendChild(c),a.appendChild(this.closeElement()),document.body.appendChild(a)},a.prototype.denyElement=function(){var a=this.createElement("a",this.denyCopy),b=this;return a.onclick=function(){b.eraseCookies(),b.setCookie(b.cookieName,"false",1),document.body.removeChild(document.getElementById(b.overId))},a},a.prototype.overElement=function(){var a=document.createElement("div");return a.setAttribute("id",this.overId),a},a.prototype.textElement=function(){var a=this.createElement("span",this.message);return a},a.prototype.readMoreElement=function(){if(null==this.readMore.copy&&null!==this.readMore.href)return null;var a=this.createElement("a",this.readMore.copy);return a.setAttribute("href",this.readMore.href),a},a.prototype.createElement=function(a,b){var c=document.createElement(a);if(null!==b){var d=document.createTextNode(b);c.appendChild(d)}return c},a.prototype.closeElement=function(){var a=this.createElement("a",this.closeCopy),b=this;return a.onclick=function(){document.body.removeChild(document.getElementById(b.overId)),b.setCookie(b.cookieName,"true",1),null!==b.closeAction&&b.closeAction()},a},a.prototype.addCloseAction=function(a){return this.closeAction=a,this},a.prototype.eraseCookies=function(){for(var a=document.cookie.split(";"),b=0;b<a.length;b++){var c=a[b],d=c.indexOf("="),e=d>-1?c.substr(0,d):c;if(e.trim()!=this.cookieName){var f=["",".","www"],g=[e,e.trim()];for(k in f)for(j in g)document.cookie=g[k]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT",document.cookie=g[k]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain="+f[k]+window.location.hostname}}},a.prototype.getCookie=function(a){for(var a=a+"=",b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return""},a.prototype.setCookie=function(a,b,c){var d=new Date;d.setTime(d.getTime()+864e5*c);var e="expires="+d.toUTCString();document.cookie=a+"="+b+"; "+e},a}();
//# sourceMappingURL=cookieChoices.js.map