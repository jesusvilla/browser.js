function Browser() {
    // ---- public properties -----
    this.fullName = 'unknow'; // getName(false);
    this.name = 'unknow'; // getName(true);
    this.code = 'unknow'; // getCodeName(this.name);
    this.fullVersion = 'unknow'; // getVersion(this.name);
    this.version = 'unknow'; // getBasicVersion(this.fullVersion);
    this.mobile = false; // isMobile(navigator.userAgent);
    this.width = screen.width;
    this.height = screen.height;
    this.platform =  'unknow'; //getPlatform(navigator.userAgent);
    this.os = 'unknow';
    this.animationend = 'unknow'; //para detectar el tipo de animacion;
    this.transitionend = 'unknow';

    // ------- init -------
    this.init = function() { //operative system, is an auxiliary var, for special-cases
        //the first var is the string that will be found in userAgent. the Second var is the common name
        // IMPORTANT NOTE: define new navigators BEFORE firefox, chrome and safari
        var navs = [
            { name:'Opera Mobi', fullName:'Opera Mobile', pre:'Version/', transitionend: 'oTransitionEnd', animationend: 'oAnimationEnd' },
            { name:'Opera Mini', fullName:'Opera Mini', pre:'Version/', transitionend: 'oTransitionEnd', animationend: 'oAnimationEnd' },
            { name:'Opera', fullName:'Opera', pre:'Version/', transitionend: 'oTransitionEnd',animationend: 'oAnimationEnd' },
            { name:'MSIE', fullName:'Microsoft Internet Explorer', pre:'MSIE ', transitionend:'MSTransitionEnd', animationend: 'MSAnimationEnd' },
            { name:'MEdge', fullName:'Microsoft Edge', pre:'MSIE ', transitionend:'MSTransitionEnd', animationend: 'MSAnimationEnd' },
            { name:'BlackBerry', fullName:'BlackBerry Navigator', pre:'/' },
            { name:'BrowserNG', fullName:'Nokia Navigator', pre:'BrowserNG/' },
            { name:'Midori', fullName:'Midori', pre:'Midori/' },
            { name:'Kazehakase', fullName:'Kazehakase', pre:'Kazehakase/' },
            { name:'Chromium', fullName:'Chromium', pre:'Chromium/', transitionend:'webkitTransitionEnd', animationend: 'webkitAnimationEnd' },
            { name:'Flock', fullName:'Flock', pre:'Flock/' },
            { name:'Galeon', fullName:'Galeon', pre:'Galeon/' },
            { name:'RockMelt', fullName:'RockMelt', pre:'RockMelt/' },
            { name:'Fennec', fullName:'Fennec', pre:'Fennec/' },
            { name:'Konqueror', fullName:'Konqueror', pre:'Konqueror/' },
            { name:'Arora', fullName:'Arora', pre:'Arora/' },
            { name:'Swiftfox', fullName:'Swiftfox', pre:'Firefox/' },
            { name:'Maxthon', fullName:'Maxthon', pre:'Maxthon/' },
            { name:'Firefox',fullName:'Mozilla Firefox', pre:'Firefox/', transitionend: 'transitionend', animationend: 'animationend' },
            { name:'Chrome', fullName:'Google Chrome', pre:'Chrome/', transitionend: 'webkitTransitionEnd', animationend: 'webkitAnimationEnd' },
            { name:'Safari', fullName:'Apple Safari', pre:'Version/', transitionend: 'webkitTransitionEnd', animationend: 'webkitAnimationEnd' }
        ];

        var agent = navigator.userAgent, pre;
        //set names
        for (i in navs) {
           if (agent.indexOf(navs[i].name)>-1) {
               pre = navs[i].pre;
               this.name = navs[i].name.toLowerCase(); //the code name is always lowercase
               this.fullName = navs[i].fullName;
               this.animationend = navs[i].animationend;
               this.transitionend = navs[i].transitionend;
                if (this.name=='msie') this.name = 'iexplorer';
                if (this.name=='opera mobi') this.name = 'opera';
                if (this.name=='opera mini') this.name = 'opera';
                break; //when found it, stops reading
            }
        }//for

      //set version
        if ((idx=agent.indexOf(pre))>-1) {
            this.fullVersion = '';
            this.version = '';
            var nDots = 0;
            var len = agent.length;
            var indexVersion = idx + pre.length;
            for (j=indexVersion; j<len; j++) {
                var n = agent.charCodeAt(j);
                if ((n>=48 && n<=57) || n==46) { //looking for numbers and dots
                    if (n==46) nDots++;
                    if (nDots<2) this.version += agent.charAt(j);
                    this.fullVersion += agent.charAt(j);
                }else j=len; //finish sub-cycle
            }//for
            this.version = parseInt(this.version);
        }

        // set Mobile
        var mobiles = ['mobi', 'mobile', 'mini', 'iphone', 'ipod', 'ipad', 'android', 'blackberry'];
        for (var i in mobiles) {
            if (agent.indexOf(mobiles[i])>-1) this.mobile = true;
        }
        if (this.width<700 || this.height<600) this.mobile = true;

        // set Platform
        var plat = navigator.platform;
        if (plat=='Win32' || plat=='Win64') {this.platform = 'Windows'; this.os = 'windows';}
        if (agent.indexOf('NT 5.1') !=-1) {this.platform = 'Windows XP'; this.os = 'windows';}
        if (agent.indexOf('NT 6') !=-1)  {this.platform = 'Windows Vista'; this.os = 'windows';}
        if (agent.indexOf('NT 6.1') !=-1) {this.platform = 'Windows 7'; this.os = 'windows';}
        if (agent.indexOf('NT 6.2') !=-1) {this.platform = 'Windows 8'; this.os = 'windows';}
        if (agent.indexOf('NT 6.3') !=-1) {this.platform = 'Windows 8.1'; this.os = 'windows';}
        if (agent.indexOf('Mac') !=-1) {this.platform = 'Macintosh'; this.os = 'apple';}
        if (agent.indexOf('Linux') !=-1) {this.platform = 'Linux'; this.os = 'linux';}
        if (agent.indexOf('iPhone') !=-1) {this.platform = 'iOS iPhone'; this.os = 'apple';}
        if (agent.indexOf('iPod') !=-1) {this.platform = 'iOS iPod'; this.os = 'apple';}
        if (agent.indexOf('iPad') !=-1) {this.platform = 'iOS iPad'; this.os = 'apple';}
        if (agent.indexOf('Android') !=-1) {this.platform = 'Android'; this.os = 'android';}

        if (this.name!='unknow') {
            this.code = this.name+'';
            if (this.name=='opera') this.code = 'op';
            if (this.name=='firefox') this.code = 'ff';
            if (this.name=='chrome') this.code = 'ch';
            if (this.name=='safari') this.code = 'sf';
            if (this.name=='iexplorer') this.code = 'ie';
            if (this.name=='maxthon') this.code = 'mx';
        }

        //manual filter, when is so hard to define the navigator type
        if (this.name=='safari' && this.platform=='Linux') {
            this.name = 'unknow';
            this.fullName = 'unknow';
            this.code = 'unknow';
        }

    };//function

    this.init();

}//Browser class
