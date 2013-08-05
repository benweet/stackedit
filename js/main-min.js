/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */

/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */

// > http://underscorejs.org
// > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
// > Underscore may be freely distributed under the MIT license.

//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

/**
 * @license RequireJS text 2.0.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/*
 * to-markdown - an HTML to Markdown converter
 *
 * Copyright 2011-2012, Dom Christie
 * Licenced under the MIT licence
 *
 */

/**
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.1
 * @url craig.is/killing/mice
 */

/**
 * jGrowl 1.2.11
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by Stan Lemon <stosh1985@gmail.com>
 * Last updated: 2013.02.14
 *
 * jGrowl is a jQuery plugin implementing unobtrusive userland notifications.  These
 * notifications function similarly to the Growl Framework available for
 * Mac OS X (http://growl.info).
 *
 * To Do:
 * - Move library settings to containers and allow them to be changed per container
 *
 * Changes in 1.2.11
 * - Fix artifacts left behind by the shutdown method and text-cleanup
 *
 * Changes in 1.2.10
 * - Fix beforeClose to be called in click event
 *
 * Changes in 1.2.9
 * - Fixed BC break in jQuery 2.0 beta
 *
 * Changes in 1.2.8
 * - Fixes for jQuery 1.9 and the MSIE6 check, note that with jQuery 2.0 support
 *   jGrowl intends to drop support for IE6 altogether
 *
 * Changes in 1.2.6
 * - Fixed js error when a notification is opening and closing at the same time
 *
 * Changes in 1.2.5
 * - Changed wrapper jGrowl's options usage to "o" instead of $.jGrowl.defaults
 * - Added themeState option to control 'highlight' or 'error' for jQuery UI
 * - Ammended some CSS to provide default positioning for nested usage.
 * - Changed some CSS to be prefixed with jGrowl- to prevent namespacing issues
 * - Added two new options - openDuration and closeDuration to allow
 *   better control of notification open and close speeds, respectively
 *   Patch contributed by Jesse Vincet.
 * - Added afterOpen callback.  Patch contributed by Russel Branca.
 *
 * Changes in 1.2.4
 * - Fixed IE bug with the close-all button
 * - Fixed IE bug with the filter CSS attribute (special thanks to gotwic)
 * - Update IE opacity CSS
 * - Changed font sizes to use "em", and only set the base style
 *
 * Changes in 1.2.3
 * - The callbacks no longer use the container as context, instead they use the actual notification
 * - The callbacks now receive the container as a parameter after the options parameter
 * - beforeOpen and beforeClose now check the return value, if it's false - the notification does
 *   not continue.  The open callback will also halt execution if it returns false.
 * - Fixed bug where containers would get confused
 * - Expanded the pause functionality to pause an entire container.
 *
 * Changes in 1.2.2
 * - Notification can now be theme rolled for jQuery UI, special thanks to Jeff Chan!
 *
 * Changes in 1.2.1
 * - Fixed instance where the interval would fire the close method multiple times.
 * - Added CSS to hide from print media
 * - Fixed issue with closer button when div { position: relative } is set
 * - Fixed leaking issue with multiple containers.  Special thanks to Matthew Hanlon!
 *
 * Changes in 1.2.0
 * - Added message pooling to limit the number of messages appearing at a given time.
 * - Closing a notification is now bound to the notification object and triggered by the close button.
 *
 * Changes in 1.1.2
 * - Added iPhone styled example
 * - Fixed possible IE7 bug when determining if the ie6 class shoudl be applied.
 * - Added template for the close button, so that it's content could be customized.
 *
 * Changes in 1.1.1
 * - Fixed CSS styling bug for ie6 caused by a mispelling
 * - Changes height restriction on default notifications to min-height
 * - Added skinned examples using a variety of images
 * - Added the ability to customize the content of the [close all] box
 * - Added jTweet, an example of using jGrowl + Twitter
 *
 * Changes in 1.1.0
 * - Multiple container and instances.
 * - Standard $.jGrowl() now wraps $.fn.jGrowl() by first establishing a generic jGrowl container.
 * - Instance methods of a jGrowl container can be called by $.fn.jGrowl(methodName)
 * - Added glue preferenced, which allows notifications to be inserted before or after nodes in the container
 * - Added new log callback which is called before anything is done for the notification
 * - Corner's attribute are now applied on an individual notification basis.
 *
 * Changes in 1.0.4
 * - Various CSS fixes so that jGrowl renders correctly in IE6.
 *
 * Changes in 1.0.3
 * - Fixed bug with options persisting across notifications
 * - Fixed theme application bug
 * - Simplified some selectors and manipulations.
 * - Added beforeOpen and beforeClose callbacks
 * - Reorganized some lines of code to be more readable
 * - Removed unnecessary this.defaults context
 * - If corners plugin is present, it's now customizable.
 * - Customizable open animation.
 * - Customizable close animation.
 * - Customizable animation easing.
 * - Added customizable positioning (top-left, top-right, bottom-left, bottom-right, center)
 *
 * Changes in 1.0.2
 * - All CSS styling is now external.
 * - Added a theme parameter which specifies a secondary class for styling, such
 *   that notifications can be customized in appearance on a per message basis.
 * - Notification life span is now customizable on a per message basis.
 * - Added the ability to disable the global closer, enabled by default.
 * - Added callbacks for when a notification is opened or closed.
 * - Added callback for the global closer.
 * - Customizable animation speed.
 * - jGrowl now set itself up and tears itself down.
 *
 * Changes in 1.0.1:
 * - Removed dependency on metadata plugin in favor of .data()
 * - Namespaced all events
 */

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
CSS Browser Selector 0.6.1
Originally written by Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/

Co-maintained by:
https://github.com/verbatim/css_browser_selector

*/

/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

/*
 * waitForImages 1.4.2
 * -------------------
 * Provides a callback when all images have loaded in your given selector.
 * https://github.com/alexanderdickson/waitForImages
 *
 * Copyright (c) 2013 Alex Dickson
 * Licensed under the MIT license.
 */

/*! jQuery UI - v1.10.3 - 2013-08-03
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.effect.js, jquery.ui.effect-slide.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */

/**
 * @preserve
 * jquery.layout 1.3.0 - Release Candidate 30.79
 * $Date: 2013-01-12 08:00:00 (Sat, 12 Jan 2013) $
 * $Rev: 303007 $
 *
 * Copyright (c) 2013 Kevin Dalman (http://allpro.net)
 * Based on work by Fabrizio Balliano (http://www.fabrizioballiano.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * SEE: http://layout.jquery-dev.net/LICENSE.txt
 * 
 * Changelog: http://layout.jquery-dev.net/changelog.cfm#1.3.0.rc30.79
 *
 * Docs: http://layout.jquery-dev.net/documentation.html
 * Tips: http://layout.jquery-dev.net/tips.html
 * Help: http://groups.google.com/group/jquery-ui-layout
 */

/**
 * jquery.layout.state 1.0
 * $Date: 2011-07-16 08:00:00 (Sat, 16 July 2011) $
 *
 * Copyright (c) 2012 
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @requires: UI Layout 1.3.0.rc30.1 or higher
 * @requires: $.ui.cookie (above)
 *
 * @see: http://groups.google.com/group/jquery-ui-layout
 */

/**
 * jquery.layout.buttons 1.0
 * $Date: 2011-07-16 08:00:00 (Sat, 16 July 2011) $
 *
 * Copyright (c) 2012 
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @requires: UI Layout 1.3.0.rc30.1 or higher
 *
 * @see: http://groups.google.com/group/jquery-ui-layout
 *
 * Docs: [ to come ]
 * Tips: [ to come ]
 */

/**
 * jquery.layout.browserZoom 1.0
 * $Date: 2011-12-29 08:00:00 (Thu, 29 Dec 2011) $
 *
 * Copyright (c) 2012 
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @requires: UI Layout 1.3.0.rc30.1 or higher
 *
 * @see: http://groups.google.com/group/jquery-ui-layout
 *
 * TODO: Extend logic to handle other problematic zooming in browsers
 * TODO: Add hotkey/mousewheel bindings to _instantly_ respond to these zoom event
 */

function printStackTrace(e) {
 e = e || {
  guess: !0
 };
 var n = e.e || null, t = !!e.guess, o = new printStackTrace.implementation(), i = o.run(n);
 return t ? o.guessAnonymousFunctions(i) : i;
}

function runDelayedFunction() {
 void 0 !== delayedFunction && delayedFunction();
}

function log(e) {
 window.console && showLog && console.log(e);
}

function css_browser_selector(e) {
 function n() {
  var e = window.outerWidth || y.clientWidth, n = window.outerHeight || y.clientHeight;
  t.orientation = n > e ? "portrait" : "landscape", y.className = y.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");
  for (var r = i - 1; r >= 0; r--) if (e >= o[r]) {
   t.maxw = o[r];
   break;
  }
  widthClasses = "";
  for (var a in t) widthClasses += " " + a + "_" + t[a];
  return y.className = y.className + widthClasses, widthClasses;
 }
 var t = {}, o = [ 320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560 ], i = o.length, r = e.toLowerCase(), a = function(e) {
  return RegExp(e, "i").test(r);
 }, s = function(e, n) {
  n = n.replace(".", "_");
  for (var t = n.indexOf("_"), o = ""; t > 0; ) o += " " + e + n.substring(0, t), 
  t = n.indexOf("_", t + 1);
  return o += " " + e + n;
 }, l = "gecko", c = "webkit", d = "chrome", u = "firefox", p = "safari", f = "opera", h = "mobile", g = "android", m = "blackberry", b = "lang_", v = "device_", y = document.documentElement, x = [ !/opera|webtv/i.test(r) && /msie\s(\d+)/.test(r) ? "ie ie" + (/trident\/4\.0/.test(r) ? "8" : RegExp.$1) : a("firefox/") ? l + " " + u + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + u + RegExp.$2 + " " + u + RegExp.$2 + "_" + RegExp.$4 : "") : a("gecko/") ? l : a("opera") ? f + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$4 : /opera(\s|\/)(\d+)\.(\d+)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$3 : "") : a("konqueror") ? "konqueror" : a("blackberry") ? m + (/Version\/(\d+)(\.(\d+)+)/i.test(r) ? " " + m + RegExp.$1 + " " + m + RegExp.$1 + RegExp.$2.replace(".", "_") : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(r) ? " " + m + RegExp.$2 + (RegExp.$3 ? " " + m + RegExp.$2 + RegExp.$3 : "") : "") : a("android") ? g + (/Version\/(\d+)(\.(\d+))+/i.test(r) ? " " + g + RegExp.$1 + " " + g + RegExp.$1 + RegExp.$2.replace(".", "_") : "") + (/Android (.+); (.+) Build/i.test(r) ? " " + v + RegExp.$2.replace(/ /g, "_").replace(/-/g, "_") : "") : a("chrome") ? c + " " + d + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + d + RegExp.$2 + (RegExp.$4 > 0 ? " " + d + RegExp.$2 + "_" + RegExp.$4 : "") : "") : a("iron") ? c + " iron" : a("applewebkit/") ? c + " " + p + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + p + RegExp.$2 + " " + p + RegExp.$2 + RegExp.$3.replace(".", "_") : / Safari\/(\d+)/i.test(r) ? "419" == RegExp.$1 || "417" == RegExp.$1 || "416" == RegExp.$1 || "412" == RegExp.$1 ? " " + p + "2_0" : "312" == RegExp.$1 ? " " + p + "1_3" : "125" == RegExp.$1 ? " " + p + "1_2" : "85" == RegExp.$1 ? " " + p + "1_0" : "" : "") : a("mozilla/") ? l : "", a("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk") ? h : "", a("j2me") ? "j2me" : a("ipad|ipod|iphone") ? (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(r) ? "ios" + s("ios", RegExp.$2) : "") + " " + (/(ip(ad|od|hone))/gi.test(r) ? RegExp.$1 : "") : a("playbook") ? "playbook" : a("kindle|silk") ? "kindle" : a("playbook") ? "playbook" : a("mac") ? "mac" + (/mac os x ((\d+)[.|_](\d+))/.test(r) ? " mac" + RegExp.$2 + " mac" + RegExp.$1.replace(".", "_") : "") : a("win") ? "win" + (a("windows nt 6.2") ? " win8" : a("windows nt 6.1") ? " win7" : a("windows nt 6.0") ? " vista" : a("windows nt 5.2") || a("windows nt 5.1") ? " win_xp" : a("windows nt 5.0") ? " win_2k" : a("windows nt 4.0") || a("WinNT4.0") ? " win_nt" : "") : a("freebsd") ? "freebsd" : a("x11|linux") ? "linux" : "", /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(r) ? (b + RegExp.$2).replace("-", "_") + ("" != RegExp.$3 ? (" " + b + RegExp.$1).replace("-", "_") : "") : "", a("ipad|iphone|ipod") && !a("safari") ? "ipad_app" : "" ];
 window.onresize = n, n();
 var w = x.join(" ") + " js ";
 return y.className = (w + y.className.replace(/\b(no[-|_]?)?js\b/g, "")).replace(/^ /, "").replace(/ +/g, " "), 
 w;
}

(function(e, n) {
 function t(e) {
  var n = e.length, t = an.type(e);
  return an.isWindow(e) ? !1 : 1 === e.nodeType && n ? !0 : "array" === t || "function" !== t && (0 === n || "number" == typeof n && n > 0 && n - 1 in e);
 }
 function o(e) {
  var n = gn[e] = {};
  return an.each(e.match(ln) || [], function(e, t) {
   n[t] = !0;
  }), n;
 }
 function i() {
  Object.defineProperty(this.cache = {}, 0, {
   get: function() {
    return {};
   }
  }), this.expando = an.expando + Math.random();
 }
 function r(e, t, o) {
  var i;
  if (o === n && 1 === e.nodeType) if (i = "data-" + t.replace(yn, "-$1").toLowerCase(), 
  o = e.getAttribute(i), "string" == typeof o) {
   try {
    o = "true" === o ? !0 : "false" === o ? !1 : "null" === o ? null : +o + "" === o ? +o : vn.test(o) ? JSON.parse(o) : o;
   } catch (r) {}
   mn.set(e, t, o);
  } else o = n;
  return o;
 }
 function a() {
  return !0;
 }
 function s() {
  return !1;
 }
 function l() {
  try {
   return G.activeElement;
  } catch (e) {}
 }
 function c(e, n) {
  for (;(e = e[n]) && 1 !== e.nodeType; ) ;
  return e;
 }
 function d(e, n, t) {
  if (an.isFunction(n)) return an.grep(e, function(e, o) {
   return !!n.call(e, o, e) !== t;
  });
  if (n.nodeType) return an.grep(e, function(e) {
   return e === n !== t;
  });
  if ("string" == typeof n) {
   if (Pn.test(n)) return an.filter(n, e, t);
   n = an.filter(n, e);
  }
  return an.grep(e, function(e) {
   return nn.call(n, e) >= 0 !== t;
  });
 }
 function u(e, n) {
  return an.nodeName(e, "table") && an.nodeName(1 === n.nodeType ? n : n.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
 }
 function p(e) {
  return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
 }
 function f(e) {
  var n = Hn.exec(e.type);
  return n ? e.type = n[1] : e.removeAttribute("type"), e;
 }
 function h(e, n) {
  for (var t = e.length, o = 0; t > o; o++) bn.set(e[o], "globalEval", !n || bn.get(n[o], "globalEval"));
 }
 function g(e, n) {
  var t, o, i, r, a, s, l, c;
  if (1 === n.nodeType) {
   if (bn.hasData(e) && (r = bn.access(e), a = bn.set(n, r), c = r.events)) {
    delete a.handle, a.events = {};
    for (i in c) for (t = 0, o = c[i].length; o > t; t++) an.event.add(n, i, c[i][t]);
   }
   mn.hasData(e) && (s = mn.access(e), l = an.extend({}, s), mn.set(n, l));
  }
 }
 function m(e, t) {
  var o = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
  return t === n || t && an.nodeName(e, t) ? an.merge([ e ], o) : o;
 }
 function b(e, n) {
  var t = n.nodeName.toLowerCase();
  "input" === t && jn.test(e.type) ? n.checked = e.checked : ("input" === t || "textarea" === t) && (n.defaultValue = e.defaultValue);
 }
 function v(e, n) {
  if (n in e) return n;
  for (var t = n.charAt(0).toUpperCase() + n.slice(1), o = n, i = et.length; i--; ) if (n = et[i] + t, 
  n in e) return n;
  return o;
 }
 function y(e, n) {
  return e = n || e, "none" === an.css(e, "display") || !an.contains(e.ownerDocument, e);
 }
 function x(n) {
  return e.getComputedStyle(n, null);
 }
 function w(e, n) {
  for (var t, o, i, r = [], a = 0, s = e.length; s > a; a++) o = e[a], o.style && (r[a] = bn.get(o, "olddisplay"), 
  t = o.style.display, n ? (r[a] || "none" !== t || (o.style.display = ""), "" === o.style.display && y(o) && (r[a] = bn.access(o, "olddisplay", T(o.nodeName)))) : r[a] || (i = y(o), 
  (t && "none" !== t || !i) && bn.set(o, "olddisplay", i ? t : an.css(o, "display"))));
  for (a = 0; s > a; a++) o = e[a], o.style && (n && "none" !== o.style.display && "" !== o.style.display || (o.style.display = n ? r[a] || "" : "none"));
  return e;
 }
 function k(e, n, t) {
  var o = Vn.exec(n);
  return o ? Math.max(0, o[1] - (t || 0)) + (o[2] || "px") : n;
 }
 function C(e, n, t, o, i) {
  for (var r = t === (o ? "border" : "content") ? 4 : "width" === n ? 1 : 0, a = 0; 4 > r; r += 2) "margin" === t && (a += an.css(e, t + Qn[r], !0, i)), 
  o ? ("content" === t && (a -= an.css(e, "padding" + Qn[r], !0, i)), "margin" !== t && (a -= an.css(e, "border" + Qn[r] + "Width", !0, i))) : (a += an.css(e, "padding" + Qn[r], !0, i), 
  "padding" !== t && (a += an.css(e, "border" + Qn[r] + "Width", !0, i)));
  return a;
 }
 function S(e, n, t) {
  var o = !0, i = "width" === n ? e.offsetWidth : e.offsetHeight, r = x(e), a = an.support.boxSizing && "border-box" === an.css(e, "boxSizing", !1, r);
  if (0 >= i || null == i) {
   if (i = Bn(e, n, r), (0 > i || null == i) && (i = e.style[n]), Xn.test(i)) return i;
   o = a && (an.support.boxSizingReliable || i === e.style[n]), i = parseFloat(i) || 0;
  }
  return i + C(e, n, t || (a ? "border" : "content"), o, r) + "px";
 }
 function T(e) {
  var n = G, t = Jn[e];
  return t || (t = E(e, n), "none" !== t && t || (Wn = (Wn || an("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(n.documentElement), 
  n = (Wn[0].contentWindow || Wn[0].contentDocument).document, n.write("<!doctype html><html><body>"), 
  n.close(), t = E(e, n), Wn.detach()), Jn[e] = t), t;
 }
 function E(e, n) {
  var t = an(n.createElement(e)).appendTo(n.body), o = an.css(t[0], "display");
  return t.remove(), o;
 }
 function _(e, n, t, o) {
  var i;
  if (an.isArray(n)) an.each(n, function(n, i) {
   t || tt.test(e) ? o(e, i) : _(e + "[" + ("object" == typeof i ? n : "") + "]", i, t, o);
  }); else if (t || "object" !== an.type(n)) o(e, n); else for (i in n) _(e + "[" + i + "]", n[i], t, o);
 }
 function I(e) {
  return function(n, t) {
   "string" != typeof n && (t = n, n = "*");
   var o, i = 0, r = n.toLowerCase().match(ln) || [];
   if (an.isFunction(t)) for (;o = r[i++]; ) "+" === o[0] ? (o = o.slice(1) || "*", 
   (e[o] = e[o] || []).unshift(t)) : (e[o] = e[o] || []).push(t);
  };
 }
 function P(e, n, t, o) {
  function i(s) {
   var l;
   return r[s] = !0, an.each(e[s] || [], function(e, s) {
    var c = s(n, t, o);
    return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (n.dataTypes.unshift(c), 
    i(c), !1);
   }), l;
  }
  var r = {}, a = e === yt;
  return i(n.dataTypes[0]) || !r["*"] && i("*");
 }
 function z(e, t) {
  var o, i, r = an.ajaxSettings.flatOptions || {};
  for (o in t) t[o] !== n && ((r[o] ? e : i || (i = {}))[o] = t[o]);
  return i && an.extend(!0, e, i), e;
 }
 function $(e, t, o) {
  for (var i, r, a, s, l = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
  i === n && (i = e.mimeType || t.getResponseHeader("Content-Type"));
  if (i) for (r in l) if (l[r] && l[r].test(i)) {
   c.unshift(r);
   break;
  }
  if (c[0] in o) a = c[0]; else {
   for (r in o) {
    if (!c[0] || e.converters[r + " " + c[0]]) {
     a = r;
     break;
    }
    s || (s = r);
   }
   a = a || s;
  }
  return a ? (a !== c[0] && c.unshift(a), o[a]) : void 0;
 }
 function N(e, n, t, o) {
  var i, r, a, s, l, c = {}, d = e.dataTypes.slice();
  if (d[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
  for (r = d.shift(); r; ) if (e.responseFields[r] && (t[e.responseFields[r]] = n), 
  !l && o && e.dataFilter && (n = e.dataFilter(n, e.dataType)), l = r, r = d.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
   if (a = c[l + " " + r] || c["* " + r], !a) for (i in c) if (s = i.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
    a === !0 ? a = c[i] : c[i] !== !0 && (r = s[0], d.unshift(s[1]));
    break;
   }
   if (a !== !0) if (a && e["throws"]) n = a(n); else try {
    n = a(n);
   } catch (u) {
    return {
     state: "parsererror",
     error: a ? u : "No conversion from " + l + " to " + r
    };
   }
  }
  return {
   state: "success",
   data: n
  };
 }
 function R() {
  return setTimeout(function() {
   It = n;
  }), It = an.now();
 }
 function L(e, n, t) {
  for (var o, i = (Lt[n] || []).concat(Lt["*"]), r = 0, a = i.length; a > r; r++) if (o = i[r].call(t, n, e)) return o;
 }
 function M(e, n, t) {
  var o, i, r = 0, a = Rt.length, s = an.Deferred().always(function() {
   delete l.elem;
  }), l = function() {
   if (i) return !1;
   for (var n = It || R(), t = Math.max(0, c.startTime + c.duration - n), o = t / c.duration || 0, r = 1 - o, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(r);
   return s.notifyWith(e, [ c, r, t ]), 1 > r && l ? t : (s.resolveWith(e, [ c ]), 
   !1);
  }, c = s.promise({
   elem: e,
   props: an.extend({}, n),
   opts: an.extend(!0, {
    specialEasing: {}
   }, t),
   originalProperties: n,
   originalOptions: t,
   startTime: It || R(),
   duration: t.duration,
   tweens: [],
   createTween: function(n, t) {
    var o = an.Tween(e, c.opts, n, t, c.opts.specialEasing[n] || c.opts.easing);
    return c.tweens.push(o), o;
   },
   stop: function(n) {
    var t = 0, o = n ? c.tweens.length : 0;
    if (i) return this;
    for (i = !0; o > t; t++) c.tweens[t].run(1);
    return n ? s.resolveWith(e, [ c, n ]) : s.rejectWith(e, [ c, n ]), this;
   }
  }), d = c.props;
  for (A(d, c.opts.specialEasing); a > r; r++) if (o = Rt[r].call(c, e, d, c.opts)) return o;
  return an.map(d, L, c), an.isFunction(c.opts.start) && c.opts.start.call(e, c), 
  an.fx.timer(an.extend(l, {
   elem: e,
   anim: c,
   queue: c.opts.queue
  })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
 }
 function A(e, n) {
  var t, o, i, r, a;
  for (t in e) if (o = an.camelCase(t), i = n[o], r = e[t], an.isArray(r) && (i = r[1], 
  r = e[t] = r[0]), t !== o && (e[o] = r, delete e[t]), a = an.cssHooks[o], a && "expand" in a) {
   r = a.expand(r), delete e[o];
   for (t in r) t in e || (e[t] = r[t], n[t] = i);
  } else n[o] = i;
 }
 function j(e, t, o) {
  var i, r, a, s, l, c, d = this, u = {}, p = e.style, f = e.nodeType && y(e), h = bn.get(e, "fxshow");
  o.queue || (l = an._queueHooks(e, "fx"), null == l.unqueued && (l.unqueued = 0, 
  c = l.empty.fire, l.empty.fire = function() {
   l.unqueued || c();
  }), l.unqueued++, d.always(function() {
   d.always(function() {
    l.unqueued--, an.queue(e, "fx").length || l.empty.fire();
   });
  })), 1 === e.nodeType && ("height" in t || "width" in t) && (o.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
  "inline" === an.css(e, "display") && "none" === an.css(e, "float") && (p.display = "inline-block")), 
  o.overflow && (p.overflow = "hidden", d.always(function() {
   p.overflow = o.overflow[0], p.overflowX = o.overflow[1], p.overflowY = o.overflow[2];
  }));
  for (i in t) if (r = t[i], zt.exec(r)) {
   if (delete t[i], a = a || "toggle" === r, r === (f ? "hide" : "show")) {
    if ("show" !== r || !h || h[i] === n) continue;
    f = !0;
   }
   u[i] = h && h[i] || an.style(e, i);
  }
  if (!an.isEmptyObject(u)) {
   h ? "hidden" in h && (f = h.hidden) : h = bn.access(e, "fxshow", {}), a && (h.hidden = !f), 
   f ? an(e).show() : d.done(function() {
    an(e).hide();
   }), d.done(function() {
    var n;
    bn.remove(e, "fxshow");
    for (n in u) an.style(e, n, u[n]);
   });
   for (i in u) s = L(f ? h[i] : 0, i, d), i in h || (h[i] = s.start, f && (s.end = s.start, 
   s.start = "width" === i || "height" === i ? 1 : 0));
  }
 }
 function O(e, n, t, o, i) {
  return new O.prototype.init(e, n, t, o, i);
 }
 function D(e, n) {
  var t, o = {
   height: e
  }, i = 0;
  for (n = n ? 1 : 0; 4 > i; i += 2 - n) t = Qn[i], o["margin" + t] = o["padding" + t] = e;
  return n && (o.opacity = o.width = e), o;
 }
 function H(e) {
  return an.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
 }
 var F, q, B = typeof n, W = e.location, G = e.document, U = G.documentElement, V = e.jQuery, X = e.$, Y = {}, J = [], K = "2.0.3", Z = J.concat, Q = J.push, en = J.slice, nn = J.indexOf, tn = Y.toString, on = Y.hasOwnProperty, rn = K.trim, an = function(e, n) {
  return new an.fn.init(e, n, F);
 }, sn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ln = /\S+/g, cn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, dn = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, un = /^-ms-/, pn = /-([\da-z])/gi, fn = function(e, n) {
  return n.toUpperCase();
 }, hn = function() {
  G.removeEventListener("DOMContentLoaded", hn, !1), e.removeEventListener("load", hn, !1), 
  an.ready();
 };
 an.fn = an.prototype = {
  jquery: K,
  constructor: an,
  init: function(e, t, o) {
   var i, r;
   if (!e) return this;
   if ("string" == typeof e) {
    if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : cn.exec(e), 
    !i || !i[1] && t) return !t || t.jquery ? (t || o).find(e) : this.constructor(t).find(e);
    if (i[1]) {
     if (t = t instanceof an ? t[0] : t, an.merge(this, an.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : G, !0)), 
     dn.test(i[1]) && an.isPlainObject(t)) for (i in t) an.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
     return this;
    }
    return r = G.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
    this.context = G, this.selector = e, this;
   }
   return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : an.isFunction(e) ? o.ready(e) : (e.selector !== n && (this.selector = e.selector, 
   this.context = e.context), an.makeArray(e, this));
  },
  selector: "",
  length: 0,
  toArray: function() {
   return en.call(this);
  },
  get: function(e) {
   return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
  },
  pushStack: function(e) {
   var n = an.merge(this.constructor(), e);
   return n.prevObject = this, n.context = this.context, n;
  },
  each: function(e, n) {
   return an.each(this, e, n);
  },
  ready: function(e) {
   return an.ready.promise().done(e), this;
  },
  slice: function() {
   return this.pushStack(en.apply(this, arguments));
  },
  first: function() {
   return this.eq(0);
  },
  last: function() {
   return this.eq(-1);
  },
  eq: function(e) {
   var n = this.length, t = +e + (0 > e ? n : 0);
   return this.pushStack(t >= 0 && n > t ? [ this[t] ] : []);
  },
  map: function(e) {
   return this.pushStack(an.map(this, function(n, t) {
    return e.call(n, t, n);
   }));
  },
  end: function() {
   return this.prevObject || this.constructor(null);
  },
  push: Q,
  sort: [].sort,
  splice: [].splice
 }, an.fn.init.prototype = an.fn, an.extend = an.fn.extend = function() {
  var e, t, o, i, r, a, s = arguments[0] || {}, l = 1, c = arguments.length, d = !1;
  for ("boolean" == typeof s && (d = s, s = arguments[1] || {}, l = 2), "object" == typeof s || an.isFunction(s) || (s = {}), 
  c === l && (s = this, --l); c > l; l++) if (null != (e = arguments[l])) for (t in e) o = s[t], 
  i = e[t], s !== i && (d && i && (an.isPlainObject(i) || (r = an.isArray(i))) ? (r ? (r = !1, 
  a = o && an.isArray(o) ? o : []) : a = o && an.isPlainObject(o) ? o : {}, s[t] = an.extend(d, a, i)) : i !== n && (s[t] = i));
  return s;
 }, an.extend({
  expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
  noConflict: function(n) {
   return e.$ === an && (e.$ = X), n && e.jQuery === an && (e.jQuery = V), an;
  },
  isReady: !1,
  readyWait: 1,
  holdReady: function(e) {
   e ? an.readyWait++ : an.ready(!0);
  },
  ready: function(e) {
   (e === !0 ? --an.readyWait : an.isReady) || (an.isReady = !0, e !== !0 && --an.readyWait > 0 || (q.resolveWith(G, [ an ]), 
   an.fn.trigger && an(G).trigger("ready").off("ready")));
  },
  isFunction: function(e) {
   return "function" === an.type(e);
  },
  isArray: Array.isArray,
  isWindow: function(e) {
   return null != e && e === e.window;
  },
  isNumeric: function(e) {
   return !isNaN(parseFloat(e)) && isFinite(e);
  },
  type: function(e) {
   return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Y[tn.call(e)] || "object" : typeof e;
  },
  isPlainObject: function(e) {
   if ("object" !== an.type(e) || e.nodeType || an.isWindow(e)) return !1;
   try {
    if (e.constructor && !on.call(e.constructor.prototype, "isPrototypeOf")) return !1;
   } catch (n) {
    return !1;
   }
   return !0;
  },
  isEmptyObject: function(e) {
   var n;
   for (n in e) return !1;
   return !0;
  },
  error: function(e) {
   throw new Error(e);
  },
  parseHTML: function(e, n, t) {
   if (!e || "string" != typeof e) return null;
   "boolean" == typeof n && (t = n, n = !1), n = n || G;
   var o = dn.exec(e), i = !t && [];
   return o ? [ n.createElement(o[1]) ] : (o = an.buildFragment([ e ], n, i), i && an(i).remove(), 
   an.merge([], o.childNodes));
  },
  parseJSON: JSON.parse,
  parseXML: function(e) {
   var t, o;
   if (!e || "string" != typeof e) return null;
   try {
    o = new DOMParser(), t = o.parseFromString(e, "text/xml");
   } catch (i) {
    t = n;
   }
   return (!t || t.getElementsByTagName("parsererror").length) && an.error("Invalid XML: " + e), 
   t;
  },
  noop: function() {},
  globalEval: function(e) {
   var n, t = eval;
   e = an.trim(e), e && (1 === e.indexOf("use strict") ? (n = G.createElement("script"), 
   n.text = e, G.head.appendChild(n).parentNode.removeChild(n)) : t(e));
  },
  camelCase: function(e) {
   return e.replace(un, "ms-").replace(pn, fn);
  },
  nodeName: function(e, n) {
   return e.nodeName && e.nodeName.toLowerCase() === n.toLowerCase();
  },
  each: function(e, n, o) {
   var i, r = 0, a = e.length, s = t(e);
   if (o) {
    if (s) for (;a > r && (i = n.apply(e[r], o), i !== !1); r++) ; else for (r in e) if (i = n.apply(e[r], o), 
    i === !1) break;
   } else if (s) for (;a > r && (i = n.call(e[r], r, e[r]), i !== !1); r++) ; else for (r in e) if (i = n.call(e[r], r, e[r]), 
   i === !1) break;
   return e;
  },
  trim: function(e) {
   return null == e ? "" : rn.call(e);
  },
  makeArray: function(e, n) {
   var o = n || [];
   return null != e && (t(Object(e)) ? an.merge(o, "string" == typeof e ? [ e ] : e) : Q.call(o, e)), 
   o;
  },
  inArray: function(e, n, t) {
   return null == n ? -1 : nn.call(n, e, t);
  },
  merge: function(e, t) {
   var o = t.length, i = e.length, r = 0;
   if ("number" == typeof o) for (;o > r; r++) e[i++] = t[r]; else for (;t[r] !== n; ) e[i++] = t[r++];
   return e.length = i, e;
  },
  grep: function(e, n, t) {
   var o, i = [], r = 0, a = e.length;
   for (t = !!t; a > r; r++) o = !!n(e[r], r), t !== o && i.push(e[r]);
   return i;
  },
  map: function(e, n, o) {
   var i, r = 0, a = e.length, s = t(e), l = [];
   if (s) for (;a > r; r++) i = n(e[r], r, o), null != i && (l[l.length] = i); else for (r in e) i = n(e[r], r, o), 
   null != i && (l[l.length] = i);
   return Z.apply([], l);
  },
  guid: 1,
  proxy: function(e, t) {
   var o, i, r;
   return "string" == typeof t && (o = e[t], t = e, e = o), an.isFunction(e) ? (i = en.call(arguments, 2), 
   r = function() {
    return e.apply(t || this, i.concat(en.call(arguments)));
   }, r.guid = e.guid = e.guid || an.guid++, r) : n;
  },
  access: function(e, t, o, i, r, a, s) {
   var l = 0, c = e.length, d = null == o;
   if ("object" === an.type(o)) {
    r = !0;
    for (l in o) an.access(e, t, l, o[l], !0, a, s);
   } else if (i !== n && (r = !0, an.isFunction(i) || (s = !0), d && (s ? (t.call(e, i), 
   t = null) : (d = t, t = function(e, n, t) {
    return d.call(an(e), t);
   })), t)) for (;c > l; l++) t(e[l], o, s ? i : i.call(e[l], l, t(e[l], o)));
   return r ? e : d ? t.call(e) : c ? t(e[0], o) : a;
  },
  now: Date.now,
  swap: function(e, n, t, o) {
   var i, r, a = {};
   for (r in n) a[r] = e.style[r], e.style[r] = n[r];
   i = t.apply(e, o || []);
   for (r in n) e.style[r] = a[r];
   return i;
  }
 }), an.ready.promise = function(n) {
  return q || (q = an.Deferred(), "complete" === G.readyState ? setTimeout(an.ready) : (G.addEventListener("DOMContentLoaded", hn, !1), 
  e.addEventListener("load", hn, !1))), q.promise(n);
 }, an.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, n) {
  Y["[object " + n + "]"] = n.toLowerCase();
 }), F = an(G), function(e, n) {
  function t(e, n, t, o) {
   var i, r, a, s, l, c, d, u, h, g;
   if ((n ? n.ownerDocument || n : H) !== N && $(n), n = n || N, t = t || [], !e || "string" != typeof e) return t;
   if (1 !== (s = n.nodeType) && 9 !== s) return [];
   if (L && !o) {
    if (i = xn.exec(e)) if (a = i[1]) {
     if (9 === s) {
      if (r = n.getElementById(a), !r || !r.parentNode) return t;
      if (r.id === a) return t.push(r), t;
     } else if (n.ownerDocument && (r = n.ownerDocument.getElementById(a)) && O(n, r) && r.id === a) return t.push(r), 
     t;
    } else {
     if (i[2]) return en.apply(t, n.getElementsByTagName(e)), t;
     if ((a = i[3]) && C.getElementsByClassName && n.getElementsByClassName) return en.apply(t, n.getElementsByClassName(a)), 
     t;
    }
    if (C.qsa && (!M || !M.test(e))) {
     if (u = d = D, h = n, g = 9 === s && e, 1 === s && "object" !== n.nodeName.toLowerCase()) {
      for (c = p(e), (d = n.getAttribute("id")) ? u = d.replace(Cn, "\\$&") : n.setAttribute("id", u), 
      u = "[id='" + u + "'] ", l = c.length; l--; ) c[l] = u + f(c[l]);
      h = hn.test(e) && n.parentNode || n, g = c.join(",");
     }
     if (g) try {
      return en.apply(t, h.querySelectorAll(g)), t;
     } catch (m) {} finally {
      d || n.removeAttribute("id");
     }
    }
   }
   return w(e.replace(un, "$1"), n, t, o);
  }
  function o() {
   function e(t, o) {
    return n.push(t += " ") > T.cacheLength && delete e[n.shift()], e[t] = o;
   }
   var n = [];
   return e;
  }
  function i(e) {
   return e[D] = !0, e;
  }
  function r(e) {
   var n = N.createElement("div");
   try {
    return !!e(n);
   } catch (t) {
    return !1;
   } finally {
    n.parentNode && n.parentNode.removeChild(n), n = null;
   }
  }
  function a(e, n) {
   for (var t = e.split("|"), o = e.length; o--; ) T.attrHandle[t[o]] = n;
  }
  function s(e, n) {
   var t = n && e, o = t && 1 === e.nodeType && 1 === n.nodeType && (~n.sourceIndex || Y) - (~e.sourceIndex || Y);
   if (o) return o;
   if (t) for (;t = t.nextSibling; ) if (t === n) return -1;
   return e ? 1 : -1;
  }
  function l(e) {
   return function(n) {
    var t = n.nodeName.toLowerCase();
    return "input" === t && n.type === e;
   };
  }
  function c(e) {
   return function(n) {
    var t = n.nodeName.toLowerCase();
    return ("input" === t || "button" === t) && n.type === e;
   };
  }
  function d(e) {
   return i(function(n) {
    return n = +n, i(function(t, o) {
     for (var i, r = e([], t.length, n), a = r.length; a--; ) t[i = r[a]] && (t[i] = !(o[i] = t[i]));
    });
   });
  }
  function u() {}
  function p(e, n) {
   var o, i, r, a, s, l, c, d = W[e + " "];
   if (d) return n ? 0 : d.slice(0);
   for (s = e, l = [], c = T.preFilter; s; ) {
    (!o || (i = pn.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(r = [])), 
    o = !1, (i = fn.exec(s)) && (o = i.shift(), r.push({
     value: o,
     type: i[0].replace(un, " ")
    }), s = s.slice(o.length));
    for (a in T.filter) !(i = vn[a].exec(s)) || c[a] && !(i = c[a](i)) || (o = i.shift(), 
    r.push({
     value: o,
     type: a,
     matches: i
    }), s = s.slice(o.length));
    if (!o) break;
   }
   return n ? s.length : s ? t.error(e) : W(e, l).slice(0);
  }
  function f(e) {
   for (var n = 0, t = e.length, o = ""; t > n; n++) o += e[n].value;
   return o;
  }
  function h(e, n, t) {
   var o = n.dir, i = t && "parentNode" === o, r = q++;
   return n.first ? function(n, t, r) {
    for (;n = n[o]; ) if (1 === n.nodeType || i) return e(n, t, r);
   } : function(n, t, a) {
    var s, l, c, d = F + " " + r;
    if (a) {
     for (;n = n[o]; ) if ((1 === n.nodeType || i) && e(n, t, a)) return !0;
    } else for (;n = n[o]; ) if (1 === n.nodeType || i) if (c = n[D] || (n[D] = {}), 
    (l = c[o]) && l[0] === d) {
     if ((s = l[1]) === !0 || s === S) return s === !0;
    } else if (l = c[o] = [ d ], l[1] = e(n, t, a) || S, l[1] === !0) return !0;
   };
  }
  function g(e) {
   return e.length > 1 ? function(n, t, o) {
    for (var i = e.length; i--; ) if (!e[i](n, t, o)) return !1;
    return !0;
   } : e[0];
  }
  function m(e, n, t, o, i) {
   for (var r, a = [], s = 0, l = e.length, c = null != n; l > s; s++) (r = e[s]) && (!t || t(r, o, i)) && (a.push(r), 
   c && n.push(s));
   return a;
  }
  function b(e, n, t, o, r, a) {
   return o && !o[D] && (o = b(o)), r && !r[D] && (r = b(r, a)), i(function(i, a, s, l) {
    var c, d, u, p = [], f = [], h = a.length, g = i || x(n || "*", s.nodeType ? [ s ] : s, []), b = !e || !i && n ? g : m(g, p, e, s, l), v = t ? r || (i ? e : h || o) ? [] : a : b;
    if (t && t(b, v, s, l), o) for (c = m(v, f), o(c, [], s, l), d = c.length; d--; ) (u = c[d]) && (v[f[d]] = !(b[f[d]] = u));
    if (i) {
     if (r || e) {
      if (r) {
       for (c = [], d = v.length; d--; ) (u = v[d]) && c.push(b[d] = u);
       r(null, v = [], c, l);
      }
      for (d = v.length; d--; ) (u = v[d]) && (c = r ? tn.call(i, u) : p[d]) > -1 && (i[c] = !(a[c] = u));
     }
    } else v = m(v === a ? v.splice(h, v.length) : v), r ? r(null, a, v, l) : en.apply(a, v);
   });
  }
  function v(e) {
   for (var n, t, o, i = e.length, r = T.relative[e[0].type], a = r || T.relative[" "], s = r ? 1 : 0, l = h(function(e) {
    return e === n;
   }, a, !0), c = h(function(e) {
    return tn.call(n, e) > -1;
   }, a, !0), d = [ function(e, t, o) {
    return !r && (o || t !== P) || ((n = t).nodeType ? l(e, t, o) : c(e, t, o));
   } ]; i > s; s++) if (t = T.relative[e[s].type]) d = [ h(g(d), t) ]; else {
    if (t = T.filter[e[s].type].apply(null, e[s].matches), t[D]) {
     for (o = ++s; i > o && !T.relative[e[o].type]; o++) ;
     return b(s > 1 && g(d), s > 1 && f(e.slice(0, s - 1).concat({
      value: " " === e[s - 2].type ? "*" : ""
     })).replace(un, "$1"), t, o > s && v(e.slice(s, o)), i > o && v(e = e.slice(o)), i > o && f(e));
    }
    d.push(t);
   }
   return g(d);
  }
  function y(e, n) {
   var o = 0, r = n.length > 0, a = e.length > 0, s = function(i, s, l, c, d) {
    var u, p, f, h = [], g = 0, b = "0", v = i && [], y = null != d, x = P, w = i || a && T.find.TAG("*", d && s.parentNode || s), k = F += null == x ? 1 : Math.random() || .1;
    for (y && (P = s !== N && s, S = o); null != (u = w[b]); b++) {
     if (a && u) {
      for (p = 0; f = e[p++]; ) if (f(u, s, l)) {
       c.push(u);
       break;
      }
      y && (F = k, S = ++o);
     }
     r && ((u = !f && u) && g--, i && v.push(u));
    }
    if (g += b, r && b !== g) {
     for (p = 0; f = n[p++]; ) f(v, h, s, l);
     if (i) {
      if (g > 0) for (;b--; ) v[b] || h[b] || (h[b] = Z.call(c));
      h = m(h);
     }
     en.apply(c, h), y && !i && h.length > 0 && g + n.length > 1 && t.uniqueSort(c);
    }
    return y && (F = k, P = x), v;
   };
   return r ? i(s) : s;
  }
  function x(e, n, o) {
   for (var i = 0, r = n.length; r > i; i++) t(e, n[i], o);
   return o;
  }
  function w(e, n, t, o) {
   var i, r, a, s, l, c = p(e);
   if (!o && 1 === c.length) {
    if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && C.getById && 9 === n.nodeType && L && T.relative[r[1].type]) {
     if (n = (T.find.ID(a.matches[0].replace(Sn, Tn), n) || [])[0], !n) return t;
     e = e.slice(r.shift().value.length);
    }
    for (i = vn.needsContext.test(e) ? 0 : r.length; i-- && (a = r[i], !T.relative[s = a.type]); ) if ((l = T.find[s]) && (o = l(a.matches[0].replace(Sn, Tn), hn.test(r[0].type) && n.parentNode || n))) {
     if (r.splice(i, 1), e = o.length && f(r), !e) return en.apply(t, o), t;
     break;
    }
   }
   return I(e, c)(o, n, !L, t, hn.test(e)), t;
  }
  var k, C, S, T, E, _, I, P, z, $, N, R, L, M, A, j, O, D = "sizzle" + -new Date(), H = e.document, F = 0, q = 0, B = o(), W = o(), G = o(), U = !1, V = function(e, n) {
   return e === n ? (U = !0, 0) : 0;
  }, X = typeof n, Y = 1 << 31, J = {}.hasOwnProperty, K = [], Z = K.pop, Q = K.push, en = K.push, nn = K.slice, tn = K.indexOf || function(e) {
   for (var n = 0, t = this.length; t > n; n++) if (this[n] === e) return n;
   return -1;
  }, on = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rn = "[\\x20\\t\\r\\n\\f]", sn = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ln = sn.replace("w", "w#"), cn = "\\[" + rn + "*(" + sn + ")" + rn + "*(?:([*^$|!~]?=)" + rn + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ln + ")|)|)" + rn + "*\\]", dn = ":(" + sn + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + cn.replace(3, 8) + ")*)|.*)\\)|)", un = new RegExp("^" + rn + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rn + "+$", "g"), pn = new RegExp("^" + rn + "*," + rn + "*"), fn = new RegExp("^" + rn + "*([>+~]|" + rn + ")" + rn + "*"), hn = new RegExp(rn + "*[+~]"), gn = new RegExp("=" + rn + "*([^\\]'\"]*)" + rn + "*\\]", "g"), mn = new RegExp(dn), bn = new RegExp("^" + ln + "$"), vn = {
   ID: new RegExp("^#(" + sn + ")"),
   CLASS: new RegExp("^\\.(" + sn + ")"),
   TAG: new RegExp("^(" + sn.replace("w", "w*") + ")"),
   ATTR: new RegExp("^" + cn),
   PSEUDO: new RegExp("^" + dn),
   CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rn + "*(even|odd|(([+-]|)(\\d*)n|)" + rn + "*(?:([+-]|)" + rn + "*(\\d+)|))" + rn + "*\\)|)", "i"),
   bool: new RegExp("^(?:" + on + ")$", "i"),
   needsContext: new RegExp("^" + rn + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rn + "*((?:-\\d)?\\d*)" + rn + "*\\)|)(?=[^-]|$)", "i")
  }, yn = /^[^{]+\{\s*\[native \w/, xn = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, wn = /^(?:input|select|textarea|button)$/i, kn = /^h\d$/i, Cn = /'|\\/g, Sn = new RegExp("\\\\([\\da-f]{1,6}" + rn + "?|(" + rn + ")|.)", "ig"), Tn = function(e, n, t) {
   var o = "0x" + n - 65536;
   return o !== o || t ? n : 0 > o ? String.fromCharCode(o + 65536) : String.fromCharCode(55296 | o >> 10, 56320 | 1023 & o);
  };
  try {
   en.apply(K = nn.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType;
  } catch (En) {
   en = {
    apply: K.length ? function(e, n) {
     Q.apply(e, nn.call(n));
    } : function(e, n) {
     for (var t = e.length, o = 0; e[t++] = n[o++]; ) ;
     e.length = t - 1;
    }
   };
  }
  _ = t.isXML = function(e) {
   var n = e && (e.ownerDocument || e).documentElement;
   return n ? "HTML" !== n.nodeName : !1;
  }, C = t.support = {}, $ = t.setDocument = function(e) {
   var n = e ? e.ownerDocument || e : H, t = n.defaultView;
   return n !== N && 9 === n.nodeType && n.documentElement ? (N = n, R = n.documentElement, 
   L = !_(n), t && t.attachEvent && t !== t.top && t.attachEvent("onbeforeunload", function() {
    $();
   }), C.attributes = r(function(e) {
    return e.className = "i", !e.getAttribute("className");
   }), C.getElementsByTagName = r(function(e) {
    return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
   }), C.getElementsByClassName = r(function(e) {
    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
    2 === e.getElementsByClassName("i").length;
   }), C.getById = r(function(e) {
    return R.appendChild(e).id = D, !n.getElementsByName || !n.getElementsByName(D).length;
   }), C.getById ? (T.find.ID = function(e, n) {
    if (typeof n.getElementById !== X && L) {
     var t = n.getElementById(e);
     return t && t.parentNode ? [ t ] : [];
    }
   }, T.filter.ID = function(e) {
    var n = e.replace(Sn, Tn);
    return function(e) {
     return e.getAttribute("id") === n;
    };
   }) : (delete T.find.ID, T.filter.ID = function(e) {
    var n = e.replace(Sn, Tn);
    return function(e) {
     var t = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
     return t && t.value === n;
    };
   }), T.find.TAG = C.getElementsByTagName ? function(e, n) {
    return typeof n.getElementsByTagName !== X ? n.getElementsByTagName(e) : void 0;
   } : function(e, n) {
    var t, o = [], i = 0, r = n.getElementsByTagName(e);
    if ("*" === e) {
     for (;t = r[i++]; ) 1 === t.nodeType && o.push(t);
     return o;
    }
    return r;
   }, T.find.CLASS = C.getElementsByClassName && function(e, n) {
    return typeof n.getElementsByClassName !== X && L ? n.getElementsByClassName(e) : void 0;
   }, A = [], M = [], (C.qsa = yn.test(n.querySelectorAll)) && (r(function(e) {
    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || M.push("\\[" + rn + "*(?:value|" + on + ")"), 
    e.querySelectorAll(":checked").length || M.push(":checked");
   }), r(function(e) {
    var t = n.createElement("input");
    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && M.push("[*^$]=" + rn + "*(?:''|\"\")"), 
    e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
    M.push(",.*:");
   })), (C.matchesSelector = yn.test(j = R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(e) {
    C.disconnectedMatch = j.call(e, "div"), j.call(e, "[s!='']:x"), A.push("!=", dn);
   }), M = M.length && new RegExp(M.join("|")), A = A.length && new RegExp(A.join("|")), 
   O = yn.test(R.contains) || R.compareDocumentPosition ? function(e, n) {
    var t = 9 === e.nodeType ? e.documentElement : e, o = n && n.parentNode;
    return e === o || !(!o || 1 !== o.nodeType || !(t.contains ? t.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)));
   } : function(e, n) {
    if (n) for (;n = n.parentNode; ) if (n === e) return !0;
    return !1;
   }, V = R.compareDocumentPosition ? function(e, t) {
    if (e === t) return U = !0, 0;
    var o = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
    return o ? 1 & o || !C.sortDetached && t.compareDocumentPosition(e) === o ? e === n || O(H, e) ? -1 : t === n || O(H, t) ? 1 : z ? tn.call(z, e) - tn.call(z, t) : 0 : 4 & o ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
   } : function(e, t) {
    var o, i = 0, r = e.parentNode, a = t.parentNode, l = [ e ], c = [ t ];
    if (e === t) return U = !0, 0;
    if (!r || !a) return e === n ? -1 : t === n ? 1 : r ? -1 : a ? 1 : z ? tn.call(z, e) - tn.call(z, t) : 0;
    if (r === a) return s(e, t);
    for (o = e; o = o.parentNode; ) l.unshift(o);
    for (o = t; o = o.parentNode; ) c.unshift(o);
    for (;l[i] === c[i]; ) i++;
    return i ? s(l[i], c[i]) : l[i] === H ? -1 : c[i] === H ? 1 : 0;
   }, n) : N;
  }, t.matches = function(e, n) {
   return t(e, null, null, n);
  }, t.matchesSelector = function(e, n) {
   if ((e.ownerDocument || e) !== N && $(e), n = n.replace(gn, "='$1']"), !(!C.matchesSelector || !L || A && A.test(n) || M && M.test(n))) try {
    var o = j.call(e, n);
    if (o || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o;
   } catch (i) {}
   return t(n, N, null, [ e ]).length > 0;
  }, t.contains = function(e, n) {
   return (e.ownerDocument || e) !== N && $(e), O(e, n);
  }, t.attr = function(e, t) {
   (e.ownerDocument || e) !== N && $(e);
   var o = T.attrHandle[t.toLowerCase()], i = o && J.call(T.attrHandle, t.toLowerCase()) ? o(e, t, !L) : n;
   return i === n ? C.attributes || !L ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null : i;
  }, t.error = function(e) {
   throw new Error("Syntax error, unrecognized expression: " + e);
  }, t.uniqueSort = function(e) {
   var n, t = [], o = 0, i = 0;
   if (U = !C.detectDuplicates, z = !C.sortStable && e.slice(0), e.sort(V), U) {
    for (;n = e[i++]; ) n === e[i] && (o = t.push(i));
    for (;o--; ) e.splice(t[o], 1);
   }
   return e;
  }, E = t.getText = function(e) {
   var n, t = "", o = 0, i = e.nodeType;
   if (i) {
    if (1 === i || 9 === i || 11 === i) {
     if ("string" == typeof e.textContent) return e.textContent;
     for (e = e.firstChild; e; e = e.nextSibling) t += E(e);
    } else if (3 === i || 4 === i) return e.nodeValue;
   } else for (;n = e[o]; o++) t += E(n);
   return t;
  }, T = t.selectors = {
   cacheLength: 50,
   createPseudo: i,
   match: vn,
   attrHandle: {},
   find: {},
   relative: {
    ">": {
     dir: "parentNode",
     first: !0
    },
    " ": {
     dir: "parentNode"
    },
    "+": {
     dir: "previousSibling",
     first: !0
    },
    "~": {
     dir: "previousSibling"
    }
   },
   preFilter: {
    ATTR: function(e) {
     return e[1] = e[1].replace(Sn, Tn), e[3] = (e[4] || e[5] || "").replace(Sn, Tn), 
     "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
    },
    CHILD: function(e) {
     return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), 
     e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), 
     e;
    },
    PSEUDO: function(e) {
     var t, o = !e[5] && e[2];
     return vn.CHILD.test(e[0]) ? null : (e[3] && e[4] !== n ? e[2] = e[4] : o && mn.test(o) && (t = p(o, !0)) && (t = o.indexOf(")", o.length - t) - o.length) && (e[0] = e[0].slice(0, t), 
     e[2] = o.slice(0, t)), e.slice(0, 3));
    }
   },
   filter: {
    TAG: function(e) {
     var n = e.replace(Sn, Tn).toLowerCase();
     return "*" === e ? function() {
      return !0;
     } : function(e) {
      return e.nodeName && e.nodeName.toLowerCase() === n;
     };
    },
    CLASS: function(e) {
     var n = B[e + " "];
     return n || (n = new RegExp("(^|" + rn + ")" + e + "(" + rn + "|$)")) && B(e, function(e) {
      return n.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "");
     });
    },
    ATTR: function(e, n, o) {
     return function(i) {
      var r = t.attr(i, e);
      return null == r ? "!=" === n : n ? (r += "", "=" === n ? r === o : "!=" === n ? r !== o : "^=" === n ? o && 0 === r.indexOf(o) : "*=" === n ? o && r.indexOf(o) > -1 : "$=" === n ? o && r.slice(-o.length) === o : "~=" === n ? (" " + r + " ").indexOf(o) > -1 : "|=" === n ? r === o || r.slice(0, o.length + 1) === o + "-" : !1) : !0;
     };
    },
    CHILD: function(e, n, t, o, i) {
     var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === n;
     return 1 === o && 0 === i ? function(e) {
      return !!e.parentNode;
     } : function(n, t, l) {
      var c, d, u, p, f, h, g = r !== a ? "nextSibling" : "previousSibling", m = n.parentNode, b = s && n.nodeName.toLowerCase(), v = !l && !s;
      if (m) {
       if (r) {
        for (;g; ) {
         for (u = n; u = u[g]; ) if (s ? u.nodeName.toLowerCase() === b : 1 === u.nodeType) return !1;
         h = g = "only" === e && !h && "nextSibling";
        }
        return !0;
       }
       if (h = [ a ? m.firstChild : m.lastChild ], a && v) {
        for (d = m[D] || (m[D] = {}), c = d[e] || [], f = c[0] === F && c[1], p = c[0] === F && c[2], 
        u = f && m.childNodes[f]; u = ++f && u && u[g] || (p = f = 0) || h.pop(); ) if (1 === u.nodeType && ++p && u === n) {
         d[e] = [ F, f, p ];
         break;
        }
       } else if (v && (c = (n[D] || (n[D] = {}))[e]) && c[0] === F) p = c[1]; else for (;(u = ++f && u && u[g] || (p = f = 0) || h.pop()) && ((s ? u.nodeName.toLowerCase() !== b : 1 !== u.nodeType) || !++p || (v && ((u[D] || (u[D] = {}))[e] = [ F, p ]), 
       u !== n)); ) ;
       return p -= i, p === o || 0 === p % o && p / o >= 0;
      }
     };
    },
    PSEUDO: function(e, n) {
     var o, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
     return r[D] ? r(n) : r.length > 1 ? (o = [ e, e, "", n ], T.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
      for (var o, i = r(e, n), a = i.length; a--; ) o = tn.call(e, i[a]), e[o] = !(t[o] = i[a]);
     }) : function(e) {
      return r(e, 0, o);
     }) : r;
    }
   },
   pseudos: {
    not: i(function(e) {
     var n = [], t = [], o = I(e.replace(un, "$1"));
     return o[D] ? i(function(e, n, t, i) {
      for (var r, a = o(e, null, i, []), s = e.length; s--; ) (r = a[s]) && (e[s] = !(n[s] = r));
     }) : function(e, i, r) {
      return n[0] = e, o(n, null, r, t), !t.pop();
     };
    }),
    has: i(function(e) {
     return function(n) {
      return t(e, n).length > 0;
     };
    }),
    contains: i(function(e) {
     return function(n) {
      return (n.textContent || n.innerText || E(n)).indexOf(e) > -1;
     };
    }),
    lang: i(function(e) {
     return bn.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(Sn, Tn).toLowerCase(), 
     function(n) {
      var t;
      do if (t = L ? n.lang : n.getAttribute("xml:lang") || n.getAttribute("lang")) return t = t.toLowerCase(), 
      t === e || 0 === t.indexOf(e + "-"); while ((n = n.parentNode) && 1 === n.nodeType);
      return !1;
     };
    }),
    target: function(n) {
     var t = e.location && e.location.hash;
     return t && t.slice(1) === n.id;
    },
    root: function(e) {
     return e === R;
    },
    focus: function(e) {
     return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
    },
    enabled: function(e) {
     return e.disabled === !1;
    },
    disabled: function(e) {
     return e.disabled === !0;
    },
    checked: function(e) {
     var n = e.nodeName.toLowerCase();
     return "input" === n && !!e.checked || "option" === n && !!e.selected;
    },
    selected: function(e) {
     return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
    },
    empty: function(e) {
     for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
     return !0;
    },
    parent: function(e) {
     return !T.pseudos.empty(e);
    },
    header: function(e) {
     return kn.test(e.nodeName);
    },
    input: function(e) {
     return wn.test(e.nodeName);
    },
    button: function(e) {
     var n = e.nodeName.toLowerCase();
     return "input" === n && "button" === e.type || "button" === n;
    },
    text: function(e) {
     var n;
     return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (n = e.getAttribute("type")) || n.toLowerCase() === e.type);
    },
    first: d(function() {
     return [ 0 ];
    }),
    last: d(function(e, n) {
     return [ n - 1 ];
    }),
    eq: d(function(e, n, t) {
     return [ 0 > t ? t + n : t ];
    }),
    even: d(function(e, n) {
     for (var t = 0; n > t; t += 2) e.push(t);
     return e;
    }),
    odd: d(function(e, n) {
     for (var t = 1; n > t; t += 2) e.push(t);
     return e;
    }),
    lt: d(function(e, n, t) {
     for (var o = 0 > t ? t + n : t; --o >= 0; ) e.push(o);
     return e;
    }),
    gt: d(function(e, n, t) {
     for (var o = 0 > t ? t + n : t; ++o < n; ) e.push(o);
     return e;
    })
   }
  }, T.pseudos.nth = T.pseudos.eq;
  for (k in {
   radio: !0,
   checkbox: !0,
   file: !0,
   password: !0,
   image: !0
  }) T.pseudos[k] = l(k);
  for (k in {
   submit: !0,
   reset: !0
  }) T.pseudos[k] = c(k);
  u.prototype = T.filters = T.pseudos, T.setFilters = new u(), I = t.compile = function(e, n) {
   var t, o = [], i = [], r = G[e + " "];
   if (!r) {
    for (n || (n = p(e)), t = n.length; t--; ) r = v(n[t]), r[D] ? o.push(r) : i.push(r);
    r = G(e, y(i, o));
   }
   return r;
  }, C.sortStable = D.split("").sort(V).join("") === D, C.detectDuplicates = U, $(), 
  C.sortDetached = r(function(e) {
   return 1 & e.compareDocumentPosition(N.createElement("div"));
  }), r(function(e) {
   return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
  }) || a("type|href|height|width", function(e, n, t) {
   return t ? void 0 : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2);
  }), C.attributes && r(function(e) {
   return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
  }) || a("value", function(e, n, t) {
   return t || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
  }), r(function(e) {
   return null == e.getAttribute("disabled");
  }) || a(on, function(e, n, t) {
   var o;
   return t ? void 0 : (o = e.getAttributeNode(n)) && o.specified ? o.value : e[n] === !0 ? n.toLowerCase() : null;
  }), an.find = t, an.expr = t.selectors, an.expr[":"] = an.expr.pseudos, an.unique = t.uniqueSort, 
  an.text = t.getText, an.isXMLDoc = t.isXML, an.contains = t.contains;
 }(e);
 var gn = {};
 an.Callbacks = function(e) {
  e = "string" == typeof e ? gn[e] || o(e) : an.extend({}, e);
  var t, i, r, a, s, l, c = [], d = !e.once && [], u = function(n) {
   for (t = e.memory && n, i = !0, l = a || 0, a = 0, s = c.length, r = !0; c && s > l; l++) if (c[l].apply(n[0], n[1]) === !1 && e.stopOnFalse) {
    t = !1;
    break;
   }
   r = !1, c && (d ? d.length && u(d.shift()) : t ? c = [] : p.disable());
  }, p = {
   add: function() {
    if (c) {
     var n = c.length;
     (function o(n) {
      an.each(n, function(n, t) {
       var i = an.type(t);
       "function" === i ? e.unique && p.has(t) || c.push(t) : t && t.length && "string" !== i && o(t);
      });
     })(arguments), r ? s = c.length : t && (a = n, u(t));
    }
    return this;
   },
   remove: function() {
    return c && an.each(arguments, function(e, n) {
     for (var t; (t = an.inArray(n, c, t)) > -1; ) c.splice(t, 1), r && (s >= t && s--, 
     l >= t && l--);
    }), this;
   },
   has: function(e) {
    return e ? an.inArray(e, c) > -1 : !(!c || !c.length);
   },
   empty: function() {
    return c = [], s = 0, this;
   },
   disable: function() {
    return c = d = t = n, this;
   },
   disabled: function() {
    return !c;
   },
   lock: function() {
    return d = n, t || p.disable(), this;
   },
   locked: function() {
    return !d;
   },
   fireWith: function(e, n) {
    return !c || i && !d || (n = n || [], n = [ e, n.slice ? n.slice() : n ], r ? d.push(n) : u(n)), 
    this;
   },
   fire: function() {
    return p.fireWith(this, arguments), this;
   },
   fired: function() {
    return !!i;
   }
  };
  return p;
 }, an.extend({
  Deferred: function(e) {
   var n = [ [ "resolve", "done", an.Callbacks("once memory"), "resolved" ], [ "reject", "fail", an.Callbacks("once memory"), "rejected" ], [ "notify", "progress", an.Callbacks("memory") ] ], t = "pending", o = {
    state: function() {
     return t;
    },
    always: function() {
     return i.done(arguments).fail(arguments), this;
    },
    then: function() {
     var e = arguments;
     return an.Deferred(function(t) {
      an.each(n, function(n, r) {
       var a = r[0], s = an.isFunction(e[n]) && e[n];
       i[r[1]](function() {
        var e = s && s.apply(this, arguments);
        e && an.isFunction(e.promise) ? e.promise().done(t.resolve).fail(t.reject).progress(t.notify) : t[a + "With"](this === o ? t.promise() : this, s ? [ e ] : arguments);
       });
      }), e = null;
     }).promise();
    },
    promise: function(e) {
     return null != e ? an.extend(e, o) : o;
    }
   }, i = {};
   return o.pipe = o.then, an.each(n, function(e, r) {
    var a = r[2], s = r[3];
    o[r[1]] = a.add, s && a.add(function() {
     t = s;
    }, n[1 ^ e][2].disable, n[2][2].lock), i[r[0]] = function() {
     return i[r[0] + "With"](this === i ? o : this, arguments), this;
    }, i[r[0] + "With"] = a.fireWith;
   }), o.promise(i), e && e.call(i, i), i;
  },
  when: function(e) {
   var n, t, o, i = 0, r = en.call(arguments), a = r.length, s = 1 !== a || e && an.isFunction(e.promise) ? a : 0, l = 1 === s ? e : an.Deferred(), c = function(e, t, o) {
    return function(i) {
     t[e] = this, o[e] = arguments.length > 1 ? en.call(arguments) : i, o === n ? l.notifyWith(t, o) : --s || l.resolveWith(t, o);
    };
   };
   if (a > 1) for (n = new Array(a), t = new Array(a), o = new Array(a); a > i; i++) r[i] && an.isFunction(r[i].promise) ? r[i].promise().done(c(i, o, r)).fail(l.reject).progress(c(i, t, n)) : --s;
   return s || l.resolveWith(o, r), l.promise();
  }
 }), an.support = function(n) {
  var t = G.createElement("input"), o = G.createDocumentFragment(), i = G.createElement("div"), r = G.createElement("select"), a = r.appendChild(G.createElement("option"));
  return t.type ? (t.type = "checkbox", n.checkOn = "" !== t.value, n.optSelected = a.selected, 
  n.reliableMarginRight = !0, n.boxSizingReliable = !0, n.pixelPosition = !1, t.checked = !0, 
  n.noCloneChecked = t.cloneNode(!0).checked, r.disabled = !0, n.optDisabled = !a.disabled, 
  t = G.createElement("input"), t.value = "t", t.type = "radio", n.radioValue = "t" === t.value, 
  t.setAttribute("checked", "t"), t.setAttribute("name", "t"), o.appendChild(t), n.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, 
  n.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", 
  n.clearCloneStyle = "content-box" === i.style.backgroundClip, an(function() {
   var t, o, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", a = G.getElementsByTagName("body")[0];
   a && (t = G.createElement("div"), t.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
   a.appendChild(t).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
   an.swap(a, null != a.style.zoom ? {
    zoom: 1
   } : {}, function() {
    n.boxSizing = 4 === i.offsetWidth;
   }), e.getComputedStyle && (n.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, 
   n.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
    width: "4px"
   }).width, o = i.appendChild(G.createElement("div")), o.style.cssText = i.style.cssText = r, 
   o.style.marginRight = o.style.width = "0", i.style.width = "1px", n.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), 
   a.removeChild(t));
  }), n) : n;
 }({});
 var mn, bn, vn = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, yn = /([A-Z])/g;
 i.uid = 1, i.accepts = function(e) {
  return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0;
 }, i.prototype = {
  key: function(e) {
   if (!i.accepts(e)) return 0;
   var n = {}, t = e[this.expando];
   if (!t) {
    t = i.uid++;
    try {
     n[this.expando] = {
      value: t
     }, Object.defineProperties(e, n);
    } catch (o) {
     n[this.expando] = t, an.extend(e, n);
    }
   }
   return this.cache[t] || (this.cache[t] = {}), t;
  },
  set: function(e, n, t) {
   var o, i = this.key(e), r = this.cache[i];
   if ("string" == typeof n) r[n] = t; else if (an.isEmptyObject(r)) an.extend(this.cache[i], n); else for (o in n) r[o] = n[o];
   return r;
  },
  get: function(e, t) {
   var o = this.cache[this.key(e)];
   return t === n ? o : o[t];
  },
  access: function(e, t, o) {
   var i;
   return t === n || t && "string" == typeof t && o === n ? (i = this.get(e, t), i !== n ? i : this.get(e, an.camelCase(t))) : (this.set(e, t, o), 
   o !== n ? o : t);
  },
  remove: function(e, t) {
   var o, i, r, a = this.key(e), s = this.cache[a];
   if (t === n) this.cache[a] = {}; else {
    an.isArray(t) ? i = t.concat(t.map(an.camelCase)) : (r = an.camelCase(t), t in s ? i = [ t, r ] : (i = r, 
    i = i in s ? [ i ] : i.match(ln) || [])), o = i.length;
    for (;o--; ) delete s[i[o]];
   }
  },
  hasData: function(e) {
   return !an.isEmptyObject(this.cache[e[this.expando]] || {});
  },
  discard: function(e) {
   e[this.expando] && delete this.cache[e[this.expando]];
  }
 }, mn = new i(), bn = new i(), an.extend({
  acceptData: i.accepts,
  hasData: function(e) {
   return mn.hasData(e) || bn.hasData(e);
  },
  data: function(e, n, t) {
   return mn.access(e, n, t);
  },
  removeData: function(e, n) {
   mn.remove(e, n);
  },
  _data: function(e, n, t) {
   return bn.access(e, n, t);
  },
  _removeData: function(e, n) {
   bn.remove(e, n);
  }
 }), an.fn.extend({
  data: function(e, t) {
   var o, i, a = this[0], s = 0, l = null;
   if (e === n) {
    if (this.length && (l = mn.get(a), 1 === a.nodeType && !bn.get(a, "hasDataAttrs"))) {
     for (o = a.attributes; s < o.length; s++) i = o[s].name, 0 === i.indexOf("data-") && (i = an.camelCase(i.slice(5)), 
     r(a, i, l[i]));
     bn.set(a, "hasDataAttrs", !0);
    }
    return l;
   }
   return "object" == typeof e ? this.each(function() {
    mn.set(this, e);
   }) : an.access(this, function(t) {
    var o, i = an.camelCase(e);
    if (a && t === n) {
     if (o = mn.get(a, e), o !== n) return o;
     if (o = mn.get(a, i), o !== n) return o;
     if (o = r(a, i, n), o !== n) return o;
    } else this.each(function() {
     var o = mn.get(this, i);
     mn.set(this, i, t), -1 !== e.indexOf("-") && o !== n && mn.set(this, e, t);
    });
   }, null, t, arguments.length > 1, null, !0);
  },
  removeData: function(e) {
   return this.each(function() {
    mn.remove(this, e);
   });
  }
 }), an.extend({
  queue: function(e, n, t) {
   var o;
   return e ? (n = (n || "fx") + "queue", o = bn.get(e, n), t && (!o || an.isArray(t) ? o = bn.access(e, n, an.makeArray(t)) : o.push(t)), 
   o || []) : void 0;
  },
  dequeue: function(e, n) {
   n = n || "fx";
   var t = an.queue(e, n), o = t.length, i = t.shift(), r = an._queueHooks(e, n), a = function() {
    an.dequeue(e, n);
   };
   "inprogress" === i && (i = t.shift(), o--), i && ("fx" === n && t.unshift("inprogress"), 
   delete r.stop, i.call(e, a, r)), !o && r && r.empty.fire();
  },
  _queueHooks: function(e, n) {
   var t = n + "queueHooks";
   return bn.get(e, t) || bn.access(e, t, {
    empty: an.Callbacks("once memory").add(function() {
     bn.remove(e, [ n + "queue", t ]);
    })
   });
  }
 }), an.fn.extend({
  queue: function(e, t) {
   var o = 2;
   return "string" != typeof e && (t = e, e = "fx", o--), arguments.length < o ? an.queue(this[0], e) : t === n ? this : this.each(function() {
    var n = an.queue(this, e, t);
    an._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && an.dequeue(this, e);
   });
  },
  dequeue: function(e) {
   return this.each(function() {
    an.dequeue(this, e);
   });
  },
  delay: function(e, n) {
   return e = an.fx ? an.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function(n, t) {
    var o = setTimeout(n, e);
    t.stop = function() {
     clearTimeout(o);
    };
   });
  },
  clearQueue: function(e) {
   return this.queue(e || "fx", []);
  },
  promise: function(e, t) {
   var o, i = 1, r = an.Deferred(), a = this, s = this.length, l = function() {
    --i || r.resolveWith(a, [ a ]);
   };
   for ("string" != typeof e && (t = e, e = n), e = e || "fx"; s--; ) o = bn.get(a[s], e + "queueHooks"), 
   o && o.empty && (i++, o.empty.add(l));
   return l(), r.promise(t);
  }
 });
 var xn, wn, kn = /[\t\r\n\f]/g, Cn = /\r/g, Sn = /^(?:input|select|textarea|button)$/i;
 an.fn.extend({
  attr: function(e, n) {
   return an.access(this, an.attr, e, n, arguments.length > 1);
  },
  removeAttr: function(e) {
   return this.each(function() {
    an.removeAttr(this, e);
   });
  },
  prop: function(e, n) {
   return an.access(this, an.prop, e, n, arguments.length > 1);
  },
  removeProp: function(e) {
   return this.each(function() {
    delete this[an.propFix[e] || e];
   });
  },
  addClass: function(e) {
   var n, t, o, i, r, a = 0, s = this.length, l = "string" == typeof e && e;
   if (an.isFunction(e)) return this.each(function(n) {
    an(this).addClass(e.call(this, n, this.className));
   });
   if (l) for (n = (e || "").match(ln) || []; s > a; a++) if (t = this[a], o = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(kn, " ") : " ")) {
    for (r = 0; i = n[r++]; ) o.indexOf(" " + i + " ") < 0 && (o += i + " ");
    t.className = an.trim(o);
   }
   return this;
  },
  removeClass: function(e) {
   var n, t, o, i, r, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
   if (an.isFunction(e)) return this.each(function(n) {
    an(this).removeClass(e.call(this, n, this.className));
   });
   if (l) for (n = (e || "").match(ln) || []; s > a; a++) if (t = this[a], o = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(kn, " ") : "")) {
    for (r = 0; i = n[r++]; ) for (;o.indexOf(" " + i + " ") >= 0; ) o = o.replace(" " + i + " ", " ");
    t.className = e ? an.trim(o) : "";
   }
   return this;
  },
  toggleClass: function(e, n) {
   var t = typeof e;
   return "boolean" == typeof n && "string" === t ? n ? this.addClass(e) : this.removeClass(e) : an.isFunction(e) ? this.each(function(t) {
    an(this).toggleClass(e.call(this, t, this.className, n), n);
   }) : this.each(function() {
    if ("string" === t) for (var n, o = 0, i = an(this), r = e.match(ln) || []; n = r[o++]; ) i.hasClass(n) ? i.removeClass(n) : i.addClass(n); else (t === B || "boolean" === t) && (this.className && bn.set(this, "__className__", this.className), 
    this.className = this.className || e === !1 ? "" : bn.get(this, "__className__") || "");
   });
  },
  hasClass: function(e) {
   for (var n = " " + e + " ", t = 0, o = this.length; o > t; t++) if (1 === this[t].nodeType && (" " + this[t].className + " ").replace(kn, " ").indexOf(n) >= 0) return !0;
   return !1;
  },
  val: function(e) {
   var t, o, i, r = this[0];
   {
    if (arguments.length) return i = an.isFunction(e), this.each(function(o) {
     var r;
     1 === this.nodeType && (r = i ? e.call(this, o, an(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : an.isArray(r) && (r = an.map(r, function(e) {
      return null == e ? "" : e + "";
     })), t = an.valHooks[this.type] || an.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, r, "value") !== n || (this.value = r));
    });
    if (r) return t = an.valHooks[r.type] || an.valHooks[r.nodeName.toLowerCase()], 
    t && "get" in t && (o = t.get(r, "value")) !== n ? o : (o = r.value, "string" == typeof o ? o.replace(Cn, "") : null == o ? "" : o);
   }
  }
 }), an.extend({
  valHooks: {
   option: {
    get: function(e) {
     var n = e.attributes.value;
     return !n || n.specified ? e.value : e.text;
    }
   },
   select: {
    get: function(e) {
     for (var n, t, o = e.options, i = e.selectedIndex, r = "select-one" === e.type || 0 > i, a = r ? null : [], s = r ? i + 1 : o.length, l = 0 > i ? s : r ? i : 0; s > l; l++) if (t = o[l], 
     !(!t.selected && l !== i || (an.support.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && an.nodeName(t.parentNode, "optgroup"))) {
      if (n = an(t).val(), r) return n;
      a.push(n);
     }
     return a;
    },
    set: function(e, n) {
     for (var t, o, i = e.options, r = an.makeArray(n), a = i.length; a--; ) o = i[a], 
     (o.selected = an.inArray(an(o).val(), r) >= 0) && (t = !0);
     return t || (e.selectedIndex = -1), r;
    }
   }
  },
  attr: function(e, t, o) {
   var i, r, a = e.nodeType;
   if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === B ? an.prop(e, t, o) : (1 === a && an.isXMLDoc(e) || (t = t.toLowerCase(), 
   i = an.attrHooks[t] || (an.expr.match.bool.test(t) ? wn : xn)), o === n ? i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = an.find.attr(e, t), 
   null == r ? n : r) : null !== o ? i && "set" in i && (r = i.set(e, o, t)) !== n ? r : (e.setAttribute(t, o + ""), 
   o) : (an.removeAttr(e, t), void 0));
  },
  removeAttr: function(e, n) {
   var t, o, i = 0, r = n && n.match(ln);
   if (r && 1 === e.nodeType) for (;t = r[i++]; ) o = an.propFix[t] || t, an.expr.match.bool.test(t) && (e[o] = !1), 
   e.removeAttribute(t);
  },
  attrHooks: {
   type: {
    set: function(e, n) {
     if (!an.support.radioValue && "radio" === n && an.nodeName(e, "input")) {
      var t = e.value;
      return e.setAttribute("type", n), t && (e.value = t), n;
     }
    }
   }
  },
  propFix: {
   "for": "htmlFor",
   "class": "className"
  },
  prop: function(e, t, o) {
   var i, r, a, s = e.nodeType;
   if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !an.isXMLDoc(e), a && (t = an.propFix[t] || t, 
   r = an.propHooks[t]), o !== n ? r && "set" in r && (i = r.set(e, o, t)) !== n ? i : e[t] = o : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t];
  },
  propHooks: {
   tabIndex: {
    get: function(e) {
     return e.hasAttribute("tabindex") || Sn.test(e.nodeName) || e.href ? e.tabIndex : -1;
    }
   }
  }
 }), wn = {
  set: function(e, n, t) {
   return n === !1 ? an.removeAttr(e, t) : e.setAttribute(t, t), t;
  }
 }, an.each(an.expr.match.bool.source.match(/\w+/g), function(e, t) {
  var o = an.expr.attrHandle[t] || an.find.attr;
  an.expr.attrHandle[t] = function(e, t, i) {
   var r = an.expr.attrHandle[t], a = i ? n : (an.expr.attrHandle[t] = n) != o(e, t, i) ? t.toLowerCase() : null;
   return an.expr.attrHandle[t] = r, a;
  };
 }), an.support.optSelected || (an.propHooks.selected = {
  get: function(e) {
   var n = e.parentNode;
   return n && n.parentNode && n.parentNode.selectedIndex, null;
  }
 }), an.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
  an.propFix[this.toLowerCase()] = this;
 }), an.each([ "radio", "checkbox" ], function() {
  an.valHooks[this] = {
   set: function(e, n) {
    return an.isArray(n) ? e.checked = an.inArray(an(e).val(), n) >= 0 : void 0;
   }
  }, an.support.checkOn || (an.valHooks[this].get = function(e) {
   return null === e.getAttribute("value") ? "on" : e.value;
  });
 });
 var Tn = /^key/, En = /^(?:mouse|contextmenu)|click/, _n = /^(?:focusinfocus|focusoutblur)$/, In = /^([^.]*)(?:\.(.+)|)$/;
 an.event = {
  global: {},
  add: function(e, t, o, i, r) {
   var a, s, l, c, d, u, p, f, h, g, m, b = bn.get(e);
   if (b) {
    for (o.handler && (a = o, o = a.handler, r = a.selector), o.guid || (o.guid = an.guid++), 
    (c = b.events) || (c = b.events = {}), (s = b.handle) || (s = b.handle = function(e) {
     return typeof an === B || e && an.event.triggered === e.type ? n : an.event.dispatch.apply(s.elem, arguments);
    }, s.elem = e), t = (t || "").match(ln) || [ "" ], d = t.length; d--; ) l = In.exec(t[d]) || [], 
    h = m = l[1], g = (l[2] || "").split(".").sort(), h && (p = an.event.special[h] || {}, 
    h = (r ? p.delegateType : p.bindType) || h, p = an.event.special[h] || {}, u = an.extend({
     type: h,
     origType: m,
     data: i,
     handler: o,
     guid: o.guid,
     selector: r,
     needsContext: r && an.expr.match.needsContext.test(r),
     namespace: g.join(".")
    }, a), (f = c[h]) || (f = c[h] = [], f.delegateCount = 0, p.setup && p.setup.call(e, i, g, s) !== !1 || e.addEventListener && e.addEventListener(h, s, !1)), 
    p.add && (p.add.call(e, u), u.handler.guid || (u.handler.guid = o.guid)), r ? f.splice(f.delegateCount++, 0, u) : f.push(u), 
    an.event.global[h] = !0);
    e = null;
   }
  },
  remove: function(e, n, t, o, i) {
   var r, a, s, l, c, d, u, p, f, h, g, m = bn.hasData(e) && bn.get(e);
   if (m && (l = m.events)) {
    for (n = (n || "").match(ln) || [ "" ], c = n.length; c--; ) if (s = In.exec(n[c]) || [], 
    f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
     for (u = an.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, 
     p = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
     a = r = p.length; r--; ) d = p[r], !i && g !== d.origType || t && t.guid !== d.guid || s && !s.test(d.namespace) || o && o !== d.selector && ("**" !== o || !d.selector) || (p.splice(r, 1), 
     d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
     a && !p.length && (u.teardown && u.teardown.call(e, h, m.handle) !== !1 || an.removeEvent(e, f, m.handle), 
     delete l[f]);
    } else for (f in l) an.event.remove(e, f + n[c], t, o, !0);
    an.isEmptyObject(l) && (delete m.handle, bn.remove(e, "events"));
   }
  },
  trigger: function(t, o, i, r) {
   var a, s, l, c, d, u, p, f = [ i || G ], h = on.call(t, "type") ? t.type : t, g = on.call(t, "namespace") ? t.namespace.split(".") : [];
   if (s = l = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !_n.test(h + an.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), 
   h = g.shift(), g.sort()), d = h.indexOf(":") < 0 && "on" + h, t = t[an.expando] ? t : new an.Event(h, "object" == typeof t && t), 
   t.isTrigger = r ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
   t.result = n, t.target || (t.target = i), o = null == o ? [ t ] : an.makeArray(o, [ t ]), 
   p = an.event.special[h] || {}, r || !p.trigger || p.trigger.apply(i, o) !== !1)) {
    if (!r && !p.noBubble && !an.isWindow(i)) {
     for (c = p.delegateType || h, _n.test(c + h) || (s = s.parentNode); s; s = s.parentNode) f.push(s), 
     l = s;
     l === (i.ownerDocument || G) && f.push(l.defaultView || l.parentWindow || e);
    }
    for (a = 0; (s = f[a++]) && !t.isPropagationStopped(); ) t.type = a > 1 ? c : p.bindType || h, 
    u = (bn.get(s, "events") || {})[t.type] && bn.get(s, "handle"), u && u.apply(s, o), 
    u = d && s[d], u && an.acceptData(s) && u.apply && u.apply(s, o) === !1 && t.preventDefault();
    return t.type = h, r || t.isDefaultPrevented() || p._default && p._default.apply(f.pop(), o) !== !1 || !an.acceptData(i) || d && an.isFunction(i[h]) && !an.isWindow(i) && (l = i[d], 
    l && (i[d] = null), an.event.triggered = h, i[h](), an.event.triggered = n, l && (i[d] = l)), 
    t.result;
   }
  },
  dispatch: function(e) {
   e = an.event.fix(e);
   var t, o, i, r, a, s = [], l = en.call(arguments), c = (bn.get(this, "events") || {})[e.type] || [], d = an.event.special[e.type] || {};
   if (l[0] = e, e.delegateTarget = this, !d.preDispatch || d.preDispatch.call(this, e) !== !1) {
    for (s = an.event.handlers.call(this, e, c), t = 0; (r = s[t++]) && !e.isPropagationStopped(); ) for (e.currentTarget = r.elem, 
    o = 0; (a = r.handlers[o++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, 
    e.data = a.data, i = ((an.event.special[a.origType] || {}).handle || a.handler).apply(r.elem, l), 
    i !== n && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
    return d.postDispatch && d.postDispatch.call(this, e), e.result;
   }
  },
  handlers: function(e, t) {
   var o, i, r, a, s = [], l = t.delegateCount, c = e.target;
   if (l && c.nodeType && (!e.button || "click" !== e.type)) for (;c !== this; c = c.parentNode || this) if (c.disabled !== !0 || "click" !== e.type) {
    for (i = [], o = 0; l > o; o++) a = t[o], r = a.selector + " ", i[r] === n && (i[r] = a.needsContext ? an(r, this).index(c) >= 0 : an.find(r, this, null, [ c ]).length), 
    i[r] && i.push(a);
    i.length && s.push({
     elem: c,
     handlers: i
    });
   }
   return l < t.length && s.push({
    elem: this,
    handlers: t.slice(l)
   }), s;
  },
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
  fixHooks: {},
  keyHooks: {
   props: "char charCode key keyCode".split(" "),
   filter: function(e, n) {
    return null == e.which && (e.which = null != n.charCode ? n.charCode : n.keyCode), 
    e;
   }
  },
  mouseHooks: {
   props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
   filter: function(e, t) {
    var o, i, r, a = t.button;
    return null == e.pageX && null != t.clientX && (o = e.target.ownerDocument || G, 
    i = o.documentElement, r = o.body, e.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), 
    e.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), 
    e.which || a === n || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
   }
  },
  fix: function(e) {
   if (e[an.expando]) return e;
   var n, t, o, i = e.type, r = e, a = this.fixHooks[i];
   for (a || (this.fixHooks[i] = a = En.test(i) ? this.mouseHooks : Tn.test(i) ? this.keyHooks : {}), 
   o = a.props ? this.props.concat(a.props) : this.props, e = new an.Event(r), n = o.length; n--; ) t = o[n], 
   e[t] = r[t];
   return e.target || (e.target = G), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
   a.filter ? a.filter(e, r) : e;
  },
  special: {
   load: {
    noBubble: !0
   },
   focus: {
    trigger: function() {
     return this !== l() && this.focus ? (this.focus(), !1) : void 0;
    },
    delegateType: "focusin"
   },
   blur: {
    trigger: function() {
     return this === l() && this.blur ? (this.blur(), !1) : void 0;
    },
    delegateType: "focusout"
   },
   click: {
    trigger: function() {
     return "checkbox" === this.type && this.click && an.nodeName(this, "input") ? (this.click(), 
     !1) : void 0;
    },
    _default: function(e) {
     return an.nodeName(e.target, "a");
    }
   },
   beforeunload: {
    postDispatch: function(e) {
     e.result !== n && (e.originalEvent.returnValue = e.result);
    }
   }
  },
  simulate: function(e, n, t, o) {
   var i = an.extend(new an.Event(), t, {
    type: e,
    isSimulated: !0,
    originalEvent: {}
   });
   o ? an.event.trigger(i, null, n) : an.event.dispatch.call(n, i), i.isDefaultPrevented() && t.preventDefault();
  }
 }, an.removeEvent = function(e, n, t) {
  e.removeEventListener && e.removeEventListener(n, t, !1);
 }, an.Event = function(e, n) {
  return this instanceof an.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
  this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? a : s) : this.type = e, 
  n && an.extend(this, n), this.timeStamp = e && e.timeStamp || an.now(), this[an.expando] = !0, 
  void 0) : new an.Event(e, n);
 }, an.Event.prototype = {
  isDefaultPrevented: s,
  isPropagationStopped: s,
  isImmediatePropagationStopped: s,
  preventDefault: function() {
   var e = this.originalEvent;
   this.isDefaultPrevented = a, e && e.preventDefault && e.preventDefault();
  },
  stopPropagation: function() {
   var e = this.originalEvent;
   this.isPropagationStopped = a, e && e.stopPropagation && e.stopPropagation();
  },
  stopImmediatePropagation: function() {
   this.isImmediatePropagationStopped = a, this.stopPropagation();
  }
 }, an.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
 }, function(e, n) {
  an.event.special[e] = {
   delegateType: n,
   bindType: n,
   handle: function(e) {
    var t, o = this, i = e.relatedTarget, r = e.handleObj;
    return (!i || i !== o && !an.contains(o, i)) && (e.type = r.origType, t = r.handler.apply(this, arguments), 
    e.type = n), t;
   }
  };
 }), an.support.focusinBubbles || an.each({
  focus: "focusin",
  blur: "focusout"
 }, function(e, n) {
  var t = 0, o = function(e) {
   an.event.simulate(n, e.target, an.event.fix(e), !0);
  };
  an.event.special[n] = {
   setup: function() {
    0 === t++ && G.addEventListener(e, o, !0);
   },
   teardown: function() {
    0 === --t && G.removeEventListener(e, o, !0);
   }
  };
 }), an.fn.extend({
  on: function(e, t, o, i, r) {
   var a, l;
   if ("object" == typeof e) {
    "string" != typeof t && (o = o || t, t = n);
    for (l in e) this.on(l, t, o, e[l], r);
    return this;
   }
   if (null == o && null == i ? (i = t, o = t = n) : null == i && ("string" == typeof t ? (i = o, 
   o = n) : (i = o, o = t, t = n)), i === !1) i = s; else if (!i) return this;
   return 1 === r && (a = i, i = function(e) {
    return an().off(e), a.apply(this, arguments);
   }, i.guid = a.guid || (a.guid = an.guid++)), this.each(function() {
    an.event.add(this, e, i, o, t);
   });
  },
  one: function(e, n, t, o) {
   return this.on(e, n, t, o, 1);
  },
  off: function(e, t, o) {
   var i, r;
   if (e && e.preventDefault && e.handleObj) return i = e.handleObj, an(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
   this;
   if ("object" == typeof e) {
    for (r in e) this.off(r, t, e[r]);
    return this;
   }
   return (t === !1 || "function" == typeof t) && (o = t, t = n), o === !1 && (o = s), 
   this.each(function() {
    an.event.remove(this, e, o, t);
   });
  },
  trigger: function(e, n) {
   return this.each(function() {
    an.event.trigger(e, n, this);
   });
  },
  triggerHandler: function(e, n) {
   var t = this[0];
   return t ? an.event.trigger(e, n, t, !0) : void 0;
  }
 });
 var Pn = /^.[^:#\[\.,]*$/, zn = /^(?:parents|prev(?:Until|All))/, $n = an.expr.match.needsContext, Nn = {
  children: !0,
  contents: !0,
  next: !0,
  prev: !0
 };
 an.fn.extend({
  find: function(e) {
   var n, t = [], o = this, i = o.length;
   if ("string" != typeof e) return this.pushStack(an(e).filter(function() {
    for (n = 0; i > n; n++) if (an.contains(o[n], this)) return !0;
   }));
   for (n = 0; i > n; n++) an.find(e, o[n], t);
   return t = this.pushStack(i > 1 ? an.unique(t) : t), t.selector = this.selector ? this.selector + " " + e : e, 
   t;
  },
  has: function(e) {
   var n = an(e, this), t = n.length;
   return this.filter(function() {
    for (var e = 0; t > e; e++) if (an.contains(this, n[e])) return !0;
   });
  },
  not: function(e) {
   return this.pushStack(d(this, e || [], !0));
  },
  filter: function(e) {
   return this.pushStack(d(this, e || [], !1));
  },
  is: function(e) {
   return !!d(this, "string" == typeof e && $n.test(e) ? an(e) : e || [], !1).length;
  },
  closest: function(e, n) {
   for (var t, o = 0, i = this.length, r = [], a = $n.test(e) || "string" != typeof e ? an(e, n || this.context) : 0; i > o; o++) for (t = this[o]; t && t !== n; t = t.parentNode) if (t.nodeType < 11 && (a ? a.index(t) > -1 : 1 === t.nodeType && an.find.matchesSelector(t, e))) {
    t = r.push(t);
    break;
   }
   return this.pushStack(r.length > 1 ? an.unique(r) : r);
  },
  index: function(e) {
   return e ? "string" == typeof e ? nn.call(an(e), this[0]) : nn.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  },
  add: function(e, n) {
   var t = "string" == typeof e ? an(e, n) : an.makeArray(e && e.nodeType ? [ e ] : e), o = an.merge(this.get(), t);
   return this.pushStack(an.unique(o));
  },
  addBack: function(e) {
   return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
  }
 }), an.each({
  parent: function(e) {
   var n = e.parentNode;
   return n && 11 !== n.nodeType ? n : null;
  },
  parents: function(e) {
   return an.dir(e, "parentNode");
  },
  parentsUntil: function(e, n, t) {
   return an.dir(e, "parentNode", t);
  },
  next: function(e) {
   return c(e, "nextSibling");
  },
  prev: function(e) {
   return c(e, "previousSibling");
  },
  nextAll: function(e) {
   return an.dir(e, "nextSibling");
  },
  prevAll: function(e) {
   return an.dir(e, "previousSibling");
  },
  nextUntil: function(e, n, t) {
   return an.dir(e, "nextSibling", t);
  },
  prevUntil: function(e, n, t) {
   return an.dir(e, "previousSibling", t);
  },
  siblings: function(e) {
   return an.sibling((e.parentNode || {}).firstChild, e);
  },
  children: function(e) {
   return an.sibling(e.firstChild);
  },
  contents: function(e) {
   return e.contentDocument || an.merge([], e.childNodes);
  }
 }, function(e, n) {
  an.fn[e] = function(t, o) {
   var i = an.map(this, n, t);
   return "Until" !== e.slice(-5) && (o = t), o && "string" == typeof o && (i = an.filter(o, i)), 
   this.length > 1 && (Nn[e] || an.unique(i), zn.test(e) && i.reverse()), this.pushStack(i);
  };
 }), an.extend({
  filter: function(e, n, t) {
   var o = n[0];
   return t && (e = ":not(" + e + ")"), 1 === n.length && 1 === o.nodeType ? an.find.matchesSelector(o, e) ? [ o ] : [] : an.find.matches(e, an.grep(n, function(e) {
    return 1 === e.nodeType;
   }));
  },
  dir: function(e, t, o) {
   for (var i = [], r = o !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
    if (r && an(e).is(o)) break;
    i.push(e);
   }
   return i;
  },
  sibling: function(e, n) {
   for (var t = []; e; e = e.nextSibling) 1 === e.nodeType && e !== n && t.push(e);
   return t;
  }
 });
 var Rn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ln = /<([\w:]+)/, Mn = /<|&#?\w+;/, An = /<(?:script|style|link)/i, jn = /^(?:checkbox|radio)$/i, On = /checked\s*(?:[^=]|=\s*.checked.)/i, Dn = /^$|\/(?:java|ecma)script/i, Hn = /^true\/(.*)/, Fn = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, qn = {
  option: [ 1, "<select multiple='multiple'>", "</select>" ],
  thead: [ 1, "<table>", "</table>" ],
  col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
  tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
  _default: [ 0, "", "" ]
 };
 qn.optgroup = qn.option, qn.tbody = qn.tfoot = qn.colgroup = qn.caption = qn.thead, 
 qn.th = qn.td, an.fn.extend({
  text: function(e) {
   return an.access(this, function(e) {
    return e === n ? an.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e));
   }, null, e, arguments.length);
  },
  append: function() {
   return this.domManip(arguments, function(e) {
    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
     var n = u(this, e);
     n.appendChild(e);
    }
   });
  },
  prepend: function() {
   return this.domManip(arguments, function(e) {
    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
     var n = u(this, e);
     n.insertBefore(e, n.firstChild);
    }
   });
  },
  before: function() {
   return this.domManip(arguments, function(e) {
    this.parentNode && this.parentNode.insertBefore(e, this);
   });
  },
  after: function() {
   return this.domManip(arguments, function(e) {
    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
   });
  },
  remove: function(e, n) {
   for (var t, o = e ? an.filter(e, this) : this, i = 0; null != (t = o[i]); i++) n || 1 !== t.nodeType || an.cleanData(m(t)), 
   t.parentNode && (n && an.contains(t.ownerDocument, t) && h(m(t, "script")), t.parentNode.removeChild(t));
   return this;
  },
  empty: function() {
   for (var e, n = 0; null != (e = this[n]); n++) 1 === e.nodeType && (an.cleanData(m(e, !1)), 
   e.textContent = "");
   return this;
  },
  clone: function(e, n) {
   return e = null == e ? !1 : e, n = null == n ? e : n, this.map(function() {
    return an.clone(this, e, n);
   });
  },
  html: function(e) {
   return an.access(this, function(e) {
    var t = this[0] || {}, o = 0, i = this.length;
    if (e === n && 1 === t.nodeType) return t.innerHTML;
    if ("string" == typeof e && !An.test(e) && !qn[(Ln.exec(e) || [ "", "" ])[1].toLowerCase()]) {
     e = e.replace(Rn, "<$1></$2>");
     try {
      for (;i > o; o++) t = this[o] || {}, 1 === t.nodeType && (an.cleanData(m(t, !1)), 
      t.innerHTML = e);
      t = 0;
     } catch (r) {}
    }
    t && this.empty().append(e);
   }, null, e, arguments.length);
  },
  replaceWith: function() {
   var e = an.map(this, function(e) {
    return [ e.nextSibling, e.parentNode ];
   }), n = 0;
   return this.domManip(arguments, function(t) {
    var o = e[n++], i = e[n++];
    i && (o && o.parentNode !== i && (o = this.nextSibling), an(this).remove(), i.insertBefore(t, o));
   }, !0), n ? this : this.remove();
  },
  detach: function(e) {
   return this.remove(e, !0);
  },
  domManip: function(e, n, t) {
   e = Z.apply([], e);
   var o, i, r, a, s, l, c = 0, d = this.length, u = this, h = d - 1, g = e[0], b = an.isFunction(g);
   if (b || !(1 >= d || "string" != typeof g || an.support.checkClone) && On.test(g)) return this.each(function(o) {
    var i = u.eq(o);
    b && (e[0] = g.call(this, o, i.html())), i.domManip(e, n, t);
   });
   if (d && (o = an.buildFragment(e, this[0].ownerDocument, !1, !t && this), i = o.firstChild, 
   1 === o.childNodes.length && (o = i), i)) {
    for (r = an.map(m(o, "script"), p), a = r.length; d > c; c++) s = o, c !== h && (s = an.clone(s, !0, !0), 
    a && an.merge(r, m(s, "script"))), n.call(this[c], s, c);
    if (a) for (l = r[r.length - 1].ownerDocument, an.map(r, f), c = 0; a > c; c++) s = r[c], 
    Dn.test(s.type || "") && !bn.access(s, "globalEval") && an.contains(l, s) && (s.src ? an._evalUrl(s.src) : an.globalEval(s.textContent.replace(Fn, "")));
   }
   return this;
  }
 }), an.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
 }, function(e, n) {
  an.fn[e] = function(e) {
   for (var t, o = [], i = an(e), r = i.length - 1, a = 0; r >= a; a++) t = a === r ? this : this.clone(!0), 
   an(i[a])[n](t), Q.apply(o, t.get());
   return this.pushStack(o);
  };
 }), an.extend({
  clone: function(e, n, t) {
   var o, i, r, a, s = e.cloneNode(!0), l = an.contains(e.ownerDocument, e);
   if (!(an.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || an.isXMLDoc(e))) for (a = m(s), 
   r = m(e), o = 0, i = r.length; i > o; o++) b(r[o], a[o]);
   if (n) if (t) for (r = r || m(e), a = a || m(s), o = 0, i = r.length; i > o; o++) g(r[o], a[o]); else g(e, s);
   return a = m(s, "script"), a.length > 0 && h(a, !l && m(e, "script")), s;
  },
  buildFragment: function(e, n, t, o) {
   for (var i, r, a, s, l, c, d = 0, u = e.length, p = n.createDocumentFragment(), f = []; u > d; d++) if (i = e[d], 
   i || 0 === i) if ("object" === an.type(i)) an.merge(f, i.nodeType ? [ i ] : i); else if (Mn.test(i)) {
    for (r = r || p.appendChild(n.createElement("div")), a = (Ln.exec(i) || [ "", "" ])[1].toLowerCase(), 
    s = qn[a] || qn._default, r.innerHTML = s[1] + i.replace(Rn, "<$1></$2>") + s[2], 
    c = s[0]; c--; ) r = r.lastChild;
    an.merge(f, r.childNodes), r = p.firstChild, r.textContent = "";
   } else f.push(n.createTextNode(i));
   for (p.textContent = "", d = 0; i = f[d++]; ) if ((!o || -1 === an.inArray(i, o)) && (l = an.contains(i.ownerDocument, i), 
   r = m(p.appendChild(i), "script"), l && h(r), t)) for (c = 0; i = r[c++]; ) Dn.test(i.type || "") && t.push(i);
   return p;
  },
  cleanData: function(e) {
   for (var t, o, r, a, s, l, c = an.event.special, d = 0; (o = e[d]) !== n; d++) {
    if (i.accepts(o) && (s = o[bn.expando], s && (t = bn.cache[s]))) {
     if (r = Object.keys(t.events || {}), r.length) for (l = 0; (a = r[l]) !== n; l++) c[a] ? an.event.remove(o, a) : an.removeEvent(o, a, t.handle);
     bn.cache[s] && delete bn.cache[s];
    }
    delete mn.cache[o[mn.expando]];
   }
  },
  _evalUrl: function(e) {
   return an.ajax({
    url: e,
    type: "GET",
    dataType: "script",
    async: !1,
    global: !1,
    "throws": !0
   });
  }
 }), an.fn.extend({
  wrapAll: function(e) {
   var n;
   return an.isFunction(e) ? this.each(function(n) {
    an(this).wrapAll(e.call(this, n));
   }) : (this[0] && (n = an(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && n.insertBefore(this[0]), 
   n.map(function() {
    for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
    return e;
   }).append(this)), this);
  },
  wrapInner: function(e) {
   return an.isFunction(e) ? this.each(function(n) {
    an(this).wrapInner(e.call(this, n));
   }) : this.each(function() {
    var n = an(this), t = n.contents();
    t.length ? t.wrapAll(e) : n.append(e);
   });
  },
  wrap: function(e) {
   var n = an.isFunction(e);
   return this.each(function(t) {
    an(this).wrapAll(n ? e.call(this, t) : e);
   });
  },
  unwrap: function() {
   return this.parent().each(function() {
    an.nodeName(this, "body") || an(this).replaceWith(this.childNodes);
   }).end();
  }
 });
 var Bn, Wn, Gn = /^(none|table(?!-c[ea]).+)/, Un = /^margin/, Vn = new RegExp("^(" + sn + ")(.*)$", "i"), Xn = new RegExp("^(" + sn + ")(?!px)[a-z%]+$", "i"), Yn = new RegExp("^([+-])=(" + sn + ")", "i"), Jn = {
  BODY: "block"
 }, Kn = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
 }, Zn = {
  letterSpacing: 0,
  fontWeight: 400
 }, Qn = [ "Top", "Right", "Bottom", "Left" ], et = [ "Webkit", "O", "Moz", "ms" ];
 an.fn.extend({
  css: function(e, t) {
   return an.access(this, function(e, t, o) {
    var i, r, a = {}, s = 0;
    if (an.isArray(t)) {
     for (i = x(e), r = t.length; r > s; s++) a[t[s]] = an.css(e, t[s], !1, i);
     return a;
    }
    return o !== n ? an.style(e, t, o) : an.css(e, t);
   }, e, t, arguments.length > 1);
  },
  show: function() {
   return w(this, !0);
  },
  hide: function() {
   return w(this);
  },
  toggle: function(e) {
   return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
    y(this) ? an(this).show() : an(this).hide();
   });
  }
 }), an.extend({
  cssHooks: {
   opacity: {
    get: function(e, n) {
     if (n) {
      var t = Bn(e, "opacity");
      return "" === t ? "1" : t;
     }
    }
   }
  },
  cssNumber: {
   columnCount: !0,
   fillOpacity: !0,
   fontWeight: !0,
   lineHeight: !0,
   opacity: !0,
   order: !0,
   orphans: !0,
   widows: !0,
   zIndex: !0,
   zoom: !0
  },
  cssProps: {
   "float": "cssFloat"
  },
  style: function(e, t, o, i) {
   if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
    var r, a, s, l = an.camelCase(t), c = e.style;
    return t = an.cssProps[l] || (an.cssProps[l] = v(c, l)), s = an.cssHooks[t] || an.cssHooks[l], 
    o === n ? s && "get" in s && (r = s.get(e, !1, i)) !== n ? r : c[t] : (a = typeof o, 
    "string" === a && (r = Yn.exec(o)) && (o = (r[1] + 1) * r[2] + parseFloat(an.css(e, t)), 
    a = "number"), null == o || "number" === a && isNaN(o) || ("number" !== a || an.cssNumber[l] || (o += "px"), 
    an.support.clearCloneStyle || "" !== o || 0 !== t.indexOf("background") || (c[t] = "inherit"), 
    s && "set" in s && (o = s.set(e, o, i)) === n || (c[t] = o)), void 0);
   }
  },
  css: function(e, t, o, i) {
   var r, a, s, l = an.camelCase(t);
   return t = an.cssProps[l] || (an.cssProps[l] = v(e.style, l)), s = an.cssHooks[t] || an.cssHooks[l], 
   s && "get" in s && (r = s.get(e, !0, o)), r === n && (r = Bn(e, t, i)), "normal" === r && t in Zn && (r = Zn[t]), 
   "" === o || o ? (a = parseFloat(r), o === !0 || an.isNumeric(a) ? a || 0 : r) : r;
  }
 }), Bn = function(e, t, o) {
  var i, r, a, s = o || x(e), l = s ? s.getPropertyValue(t) || s[t] : n, c = e.style;
  return s && ("" !== l || an.contains(e.ownerDocument, e) || (l = an.style(e, t)), 
  Xn.test(l) && Un.test(t) && (i = c.width, r = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, 
  l = s.width, c.width = i, c.minWidth = r, c.maxWidth = a)), l;
 }, an.each([ "height", "width" ], function(e, n) {
  an.cssHooks[n] = {
   get: function(e, t, o) {
    return t ? 0 === e.offsetWidth && Gn.test(an.css(e, "display")) ? an.swap(e, Kn, function() {
     return S(e, n, o);
    }) : S(e, n, o) : void 0;
   },
   set: function(e, t, o) {
    var i = o && x(e);
    return k(e, t, o ? C(e, n, o, an.support.boxSizing && "border-box" === an.css(e, "boxSizing", !1, i), i) : 0);
   }
  };
 }), an(function() {
  an.support.reliableMarginRight || (an.cssHooks.marginRight = {
   get: function(e, n) {
    return n ? an.swap(e, {
     display: "inline-block"
    }, Bn, [ e, "marginRight" ]) : void 0;
   }
  }), !an.support.pixelPosition && an.fn.position && an.each([ "top", "left" ], function(e, n) {
   an.cssHooks[n] = {
    get: function(e, t) {
     return t ? (t = Bn(e, n), Xn.test(t) ? an(e).position()[n] + "px" : t) : void 0;
    }
   };
  });
 }), an.expr && an.expr.filters && (an.expr.filters.hidden = function(e) {
  return e.offsetWidth <= 0 && e.offsetHeight <= 0;
 }, an.expr.filters.visible = function(e) {
  return !an.expr.filters.hidden(e);
 }), an.each({
  margin: "",
  padding: "",
  border: "Width"
 }, function(e, n) {
  an.cssHooks[e + n] = {
   expand: function(t) {
    for (var o = 0, i = {}, r = "string" == typeof t ? t.split(" ") : [ t ]; 4 > o; o++) i[e + Qn[o] + n] = r[o] || r[o - 2] || r[0];
    return i;
   }
  }, Un.test(e) || (an.cssHooks[e + n].set = k);
 });
 var nt = /%20/g, tt = /\[\]$/, ot = /\r?\n/g, it = /^(?:submit|button|image|reset|file)$/i, rt = /^(?:input|select|textarea|keygen)/i;
 an.fn.extend({
  serialize: function() {
   return an.param(this.serializeArray());
  },
  serializeArray: function() {
   return this.map(function() {
    var e = an.prop(this, "elements");
    return e ? an.makeArray(e) : this;
   }).filter(function() {
    var e = this.type;
    return this.name && !an(this).is(":disabled") && rt.test(this.nodeName) && !it.test(e) && (this.checked || !jn.test(e));
   }).map(function(e, n) {
    var t = an(this).val();
    return null == t ? null : an.isArray(t) ? an.map(t, function(e) {
     return {
      name: n.name,
      value: e.replace(ot, "\r\n")
     };
    }) : {
     name: n.name,
     value: t.replace(ot, "\r\n")
    };
   }).get();
  }
 }), an.param = function(e, t) {
  var o, i = [], r = function(e, n) {
   n = an.isFunction(n) ? n() : null == n ? "" : n, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(n);
  };
  if (t === n && (t = an.ajaxSettings && an.ajaxSettings.traditional), an.isArray(e) || e.jquery && !an.isPlainObject(e)) an.each(e, function() {
   r(this.name, this.value);
  }); else for (o in e) _(o, e[o], t, r);
  return i.join("&").replace(nt, "+");
 }, an.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, n) {
  an.fn[n] = function(e, t) {
   return arguments.length > 0 ? this.on(n, null, e, t) : this.trigger(n);
  };
 }), an.fn.extend({
  hover: function(e, n) {
   return this.mouseenter(e).mouseleave(n || e);
  },
  bind: function(e, n, t) {
   return this.on(e, null, n, t);
  },
  unbind: function(e, n) {
   return this.off(e, null, n);
  },
  delegate: function(e, n, t, o) {
   return this.on(n, e, t, o);
  },
  undelegate: function(e, n, t) {
   return 1 === arguments.length ? this.off(e, "**") : this.off(n, e || "**", t);
  }
 });
 var at, st, lt = an.now(), ct = /\?/, dt = /#.*$/, ut = /([?&])_=[^&]*/, pt = /^(.*?):[ \t]*([^\r\n]*)$/gm, ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, ht = /^(?:GET|HEAD)$/, gt = /^\/\//, mt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, bt = an.fn.load, vt = {}, yt = {}, xt = "*/".concat("*");
 try {
  st = W.href;
 } catch (wt) {
  st = G.createElement("a"), st.href = "", st = st.href;
 }
 at = mt.exec(st.toLowerCase()) || [], an.fn.load = function(e, t, o) {
  if ("string" != typeof e && bt) return bt.apply(this, arguments);
  var i, r, a, s = this, l = e.indexOf(" ");
  return l >= 0 && (i = e.slice(l), e = e.slice(0, l)), an.isFunction(t) ? (o = t, 
  t = n) : t && "object" == typeof t && (r = "POST"), s.length > 0 && an.ajax({
   url: e,
   type: r,
   dataType: "html",
   data: t
  }).done(function(e) {
   a = arguments, s.html(i ? an("<div>").append(an.parseHTML(e)).find(i) : e);
  }).complete(o && function(e, n) {
   s.each(o, a || [ e.responseText, n, e ]);
  }), this;
 }, an.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, n) {
  an.fn[n] = function(e) {
   return this.on(n, e);
  };
 }), an.extend({
  active: 0,
  lastModified: {},
  etag: {},
  ajaxSettings: {
   url: st,
   type: "GET",
   isLocal: ft.test(at[1]),
   global: !0,
   processData: !0,
   async: !0,
   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   accepts: {
    "*": xt,
    text: "text/plain",
    html: "text/html",
    xml: "application/xml, text/xml",
    json: "application/json, text/javascript"
   },
   contents: {
    xml: /xml/,
    html: /html/,
    json: /json/
   },
   responseFields: {
    xml: "responseXML",
    text: "responseText",
    json: "responseJSON"
   },
   converters: {
    "* text": String,
    "text html": !0,
    "text json": an.parseJSON,
    "text xml": an.parseXML
   },
   flatOptions: {
    url: !0,
    context: !0
   }
  },
  ajaxSetup: function(e, n) {
   return n ? z(z(e, an.ajaxSettings), n) : z(an.ajaxSettings, e);
  },
  ajaxPrefilter: I(vt),
  ajaxTransport: I(yt),
  ajax: function(e, t) {
   function o(e, t, o, s) {
    var c, u, v, y, w, C = t;
    2 !== x && (x = 2, l && clearTimeout(l), i = n, a = s || "", k.readyState = e > 0 ? 4 : 0, 
    c = e >= 200 && 300 > e || 304 === e, o && (y = $(p, k, o)), y = N(p, y, k, c), 
    c ? (p.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (an.lastModified[r] = w), 
    w = k.getResponseHeader("etag"), w && (an.etag[r] = w)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = y.state, 
    u = y.data, v = y.error, c = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), 
    k.status = e, k.statusText = (t || C) + "", c ? g.resolveWith(f, [ u, C, k ]) : g.rejectWith(f, [ k, C, v ]), 
    k.statusCode(b), b = n, d && h.trigger(c ? "ajaxSuccess" : "ajaxError", [ k, p, c ? u : v ]), 
    m.fireWith(f, [ k, C ]), d && (h.trigger("ajaxComplete", [ k, p ]), --an.active || an.event.trigger("ajaxStop")));
   }
   "object" == typeof e && (t = e, e = n), t = t || {};
   var i, r, a, s, l, c, d, u, p = an.ajaxSetup({}, t), f = p.context || p, h = p.context && (f.nodeType || f.jquery) ? an(f) : an.event, g = an.Deferred(), m = an.Callbacks("once memory"), b = p.statusCode || {}, v = {}, y = {}, x = 0, w = "canceled", k = {
    readyState: 0,
    getResponseHeader: function(e) {
     var n;
     if (2 === x) {
      if (!s) for (s = {}; n = pt.exec(a); ) s[n[1].toLowerCase()] = n[2];
      n = s[e.toLowerCase()];
     }
     return null == n ? null : n;
    },
    getAllResponseHeaders: function() {
     return 2 === x ? a : null;
    },
    setRequestHeader: function(e, n) {
     var t = e.toLowerCase();
     return x || (e = y[t] = y[t] || e, v[e] = n), this;
    },
    overrideMimeType: function(e) {
     return x || (p.mimeType = e), this;
    },
    statusCode: function(e) {
     var n;
     if (e) if (2 > x) for (n in e) b[n] = [ b[n], e[n] ]; else k.always(e[k.status]);
     return this;
    },
    abort: function(e) {
     var n = e || w;
     return i && i.abort(n), o(0, n), this;
    }
   };
   if (g.promise(k).complete = m.add, k.success = k.done, k.error = k.fail, p.url = ((e || p.url || st) + "").replace(dt, "").replace(gt, at[1] + "//"), 
   p.type = t.method || t.type || p.method || p.type, p.dataTypes = an.trim(p.dataType || "*").toLowerCase().match(ln) || [ "" ], 
   null == p.crossDomain && (c = mt.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] === at[1] && c[2] === at[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (at[3] || ("http:" === at[1] ? "80" : "443")))), 
   p.data && p.processData && "string" != typeof p.data && (p.data = an.param(p.data, p.traditional)), 
   P(vt, p, t, k), 2 === x) return k;
   d = p.global, d && 0 === an.active++ && an.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
   p.hasContent = !ht.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (ct.test(r) ? "&" : "?") + p.data, 
   delete p.data), p.cache === !1 && (p.url = ut.test(r) ? r.replace(ut, "$1_=" + lt++) : r + (ct.test(r) ? "&" : "?") + "_=" + lt++)), 
   p.ifModified && (an.lastModified[r] && k.setRequestHeader("If-Modified-Since", an.lastModified[r]), 
   an.etag[r] && k.setRequestHeader("If-None-Match", an.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || t.contentType) && k.setRequestHeader("Content-Type", p.contentType), 
   k.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : p.accepts["*"]);
   for (u in p.headers) k.setRequestHeader(u, p.headers[u]);
   if (p.beforeSend && (p.beforeSend.call(f, k, p) === !1 || 2 === x)) return k.abort();
   w = "abort";
   for (u in {
    success: 1,
    error: 1,
    complete: 1
   }) k[u](p[u]);
   if (i = P(yt, p, t, k)) {
    k.readyState = 1, d && h.trigger("ajaxSend", [ k, p ]), p.async && p.timeout > 0 && (l = setTimeout(function() {
     k.abort("timeout");
    }, p.timeout));
    try {
     x = 1, i.send(v, o);
    } catch (C) {
     if (!(2 > x)) throw C;
     o(-1, C);
    }
   } else o(-1, "No Transport");
   return k;
  },
  getJSON: function(e, n, t) {
   return an.get(e, n, t, "json");
  },
  getScript: function(e, t) {
   return an.get(e, n, t, "script");
  }
 }), an.each([ "get", "post" ], function(e, t) {
  an[t] = function(e, o, i, r) {
   return an.isFunction(o) && (r = r || i, i = o, o = n), an.ajax({
    url: e,
    type: t,
    dataType: r,
    data: o,
    success: i
   });
  };
 }), an.ajaxSetup({
  accepts: {
   script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
   script: /(?:java|ecma)script/
  },
  converters: {
   "text script": function(e) {
    return an.globalEval(e), e;
   }
  }
 }), an.ajaxPrefilter("script", function(e) {
  e.cache === n && (e.cache = !1), e.crossDomain && (e.type = "GET");
 }), an.ajaxTransport("script", function(e) {
  if (e.crossDomain) {
   var n, t;
   return {
    send: function(o, i) {
     n = an("<script>").prop({
      async: !0,
      charset: e.scriptCharset,
      src: e.url
     }).on("load error", t = function(e) {
      n.remove(), t = null, e && i("error" === e.type ? 404 : 200, e.type);
     }), G.head.appendChild(n[0]);
    },
    abort: function() {
     t && t();
    }
   };
  }
 });
 var kt = [], Ct = /(=)\?(?=&|$)|\?\?/;
 an.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
   var e = kt.pop() || an.expando + "_" + lt++;
   return this[e] = !0, e;
  }
 }), an.ajaxPrefilter("json jsonp", function(t, o, i) {
  var r, a, s, l = t.jsonp !== !1 && (Ct.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ct.test(t.data) && "data");
  return l || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = an.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, 
  l ? t[l] = t[l].replace(Ct, "$1" + r) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), 
  t.converters["script json"] = function() {
   return s || an.error(r + " was not called"), s[0];
  }, t.dataTypes[0] = "json", a = e[r], e[r] = function() {
   s = arguments;
  }, i.always(function() {
   e[r] = a, t[r] && (t.jsonpCallback = o.jsonpCallback, kt.push(r)), s && an.isFunction(a) && a(s[0]), 
   s = a = n;
  }), "script") : void 0;
 }), an.ajaxSettings.xhr = function() {
  try {
   return new XMLHttpRequest();
  } catch (e) {}
 };
 var St = an.ajaxSettings.xhr(), Tt = {
  0: 200,
  1223: 204
 }, Et = 0, _t = {};
 e.ActiveXObject && an(e).on("unload", function() {
  for (var e in _t) _t[e]();
  _t = n;
 }), an.support.cors = !!St && "withCredentials" in St, an.support.ajax = St = !!St, 
 an.ajaxTransport(function(e) {
  var t;
  return an.support.cors || St && !e.crossDomain ? {
   send: function(o, i) {
    var r, a, s = e.xhr();
    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) s[r] = e.xhrFields[r];
    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
    for (r in o) s.setRequestHeader(r, o[r]);
    t = function(e) {
     return function() {
      t && (delete _t[a], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? i(s.status || 404, s.statusText) : i(Tt[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
       text: s.responseText
      } : n, s.getAllResponseHeaders()));
     };
    }, s.onload = t(), s.onerror = t("error"), t = _t[a = Et++] = t("abort"), s.send(e.hasContent && e.data || null);
   },
   abort: function() {
    t && t();
   }
  } : void 0;
 });
 var It, Pt, zt = /^(?:toggle|show|hide)$/, $t = new RegExp("^(?:([+-])=|)(" + sn + ")([a-z%]*)$", "i"), Nt = /queueHooks$/, Rt = [ j ], Lt = {
  "*": [ function(e, n) {
   var t = this.createTween(e, n), o = t.cur(), i = $t.exec(n), r = i && i[3] || (an.cssNumber[e] ? "" : "px"), a = (an.cssNumber[e] || "px" !== r && +o) && $t.exec(an.css(t.elem, e)), s = 1, l = 20;
   if (a && a[3] !== r) {
    r = r || a[3], i = i || [], a = +o || 1;
    do s = s || ".5", a /= s, an.style(t.elem, e, a + r); while (s !== (s = t.cur() / o) && 1 !== s && --l);
   }
   return i && (a = t.start = +a || +o || 0, t.unit = r, t.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), 
   t;
  } ]
 };
 an.Animation = an.extend(M, {
  tweener: function(e, n) {
   an.isFunction(e) ? (n = e, e = [ "*" ]) : e = e.split(" ");
   for (var t, o = 0, i = e.length; i > o; o++) t = e[o], Lt[t] = Lt[t] || [], Lt[t].unshift(n);
  },
  prefilter: function(e, n) {
   n ? Rt.unshift(e) : Rt.push(e);
  }
 }), an.Tween = O, O.prototype = {
  constructor: O,
  init: function(e, n, t, o, i, r) {
   this.elem = e, this.prop = t, this.easing = i || "swing", this.options = n, this.start = this.now = this.cur(), 
   this.end = o, this.unit = r || (an.cssNumber[t] ? "" : "px");
  },
  cur: function() {
   var e = O.propHooks[this.prop];
   return e && e.get ? e.get(this) : O.propHooks._default.get(this);
  },
  run: function(e) {
   var n, t = O.propHooks[this.prop];
   return this.pos = n = this.options.duration ? an.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
   this.now = (this.end - this.start) * n + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
   t && t.set ? t.set(this) : O.propHooks._default.set(this), this;
  }
 }, O.prototype.init.prototype = O.prototype, O.propHooks = {
  _default: {
   get: function(e) {
    var n;
    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (n = an.css(e.elem, e.prop, ""), 
    n && "auto" !== n ? n : 0) : e.elem[e.prop];
   },
   set: function(e) {
    an.fx.step[e.prop] ? an.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[an.cssProps[e.prop]] || an.cssHooks[e.prop]) ? an.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
   }
  }
 }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
  set: function(e) {
   e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
  }
 }, an.each([ "toggle", "show", "hide" ], function(e, n) {
  var t = an.fn[n];
  an.fn[n] = function(e, o, i) {
   return null == e || "boolean" == typeof e ? t.apply(this, arguments) : this.animate(D(n, !0), e, o, i);
  };
 }), an.fn.extend({
  fadeTo: function(e, n, t, o) {
   return this.filter(y).css("opacity", 0).show().end().animate({
    opacity: n
   }, e, t, o);
  },
  animate: function(e, n, t, o) {
   var i = an.isEmptyObject(e), r = an.speed(n, t, o), a = function() {
    var n = M(this, an.extend({}, e), r);
    (i || bn.get(this, "finish")) && n.stop(!0);
   };
   return a.finish = a, i || r.queue === !1 ? this.each(a) : this.queue(r.queue, a);
  },
  stop: function(e, t, o) {
   var i = function(e) {
    var n = e.stop;
    delete e.stop, n(o);
   };
   return "string" != typeof e && (o = t, t = e, e = n), t && e !== !1 && this.queue(e || "fx", []), 
   this.each(function() {
    var n = !0, t = null != e && e + "queueHooks", r = an.timers, a = bn.get(this);
    if (t) a[t] && a[t].stop && i(a[t]); else for (t in a) a[t] && a[t].stop && Nt.test(t) && i(a[t]);
    for (t = r.length; t--; ) r[t].elem !== this || null != e && r[t].queue !== e || (r[t].anim.stop(o), 
    n = !1, r.splice(t, 1));
    (n || !o) && an.dequeue(this, e);
   });
  },
  finish: function(e) {
   return e !== !1 && (e = e || "fx"), this.each(function() {
    var n, t = bn.get(this), o = t[e + "queue"], i = t[e + "queueHooks"], r = an.timers, a = o ? o.length : 0;
    for (t.finish = !0, an.queue(this, e, []), i && i.stop && i.stop.call(this, !0), 
    n = r.length; n--; ) r[n].elem === this && r[n].queue === e && (r[n].anim.stop(!0), 
    r.splice(n, 1));
    for (n = 0; a > n; n++) o[n] && o[n].finish && o[n].finish.call(this);
    delete t.finish;
   });
  }
 }), an.each({
  slideDown: D("show"),
  slideUp: D("hide"),
  slideToggle: D("toggle"),
  fadeIn: {
   opacity: "show"
  },
  fadeOut: {
   opacity: "hide"
  },
  fadeToggle: {
   opacity: "toggle"
  }
 }, function(e, n) {
  an.fn[e] = function(e, t, o) {
   return this.animate(n, e, t, o);
  };
 }), an.speed = function(e, n, t) {
  var o = e && "object" == typeof e ? an.extend({}, e) : {
   complete: t || !t && n || an.isFunction(e) && e,
   duration: e,
   easing: t && n || n && !an.isFunction(n) && n
  };
  return o.duration = an.fx.off ? 0 : "number" == typeof o.duration ? o.duration : o.duration in an.fx.speeds ? an.fx.speeds[o.duration] : an.fx.speeds._default, 
  (null == o.queue || o.queue === !0) && (o.queue = "fx"), o.old = o.complete, o.complete = function() {
   an.isFunction(o.old) && o.old.call(this), o.queue && an.dequeue(this, o.queue);
  }, o;
 }, an.easing = {
  linear: function(e) {
   return e;
  },
  swing: function(e) {
   return .5 - Math.cos(e * Math.PI) / 2;
  }
 }, an.timers = [], an.fx = O.prototype.init, an.fx.tick = function() {
  var e, t = an.timers, o = 0;
  for (It = an.now(); o < t.length; o++) e = t[o], e() || t[o] !== e || t.splice(o--, 1);
  t.length || an.fx.stop(), It = n;
 }, an.fx.timer = function(e) {
  e() && an.timers.push(e) && an.fx.start();
 }, an.fx.interval = 13, an.fx.start = function() {
  Pt || (Pt = setInterval(an.fx.tick, an.fx.interval));
 }, an.fx.stop = function() {
  clearInterval(Pt), Pt = null;
 }, an.fx.speeds = {
  slow: 600,
  fast: 200,
  _default: 400
 }, an.fx.step = {}, an.expr && an.expr.filters && (an.expr.filters.animated = function(e) {
  return an.grep(an.timers, function(n) {
   return e === n.elem;
  }).length;
 }), an.fn.offset = function(e) {
  if (arguments.length) return e === n ? this : this.each(function(n) {
   an.offset.setOffset(this, e, n);
  });
  var t, o, i = this[0], r = {
   top: 0,
   left: 0
  }, a = i && i.ownerDocument;
  if (a) return t = a.documentElement, an.contains(t, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), 
  o = H(a), {
   top: r.top + o.pageYOffset - t.clientTop,
   left: r.left + o.pageXOffset - t.clientLeft
  }) : r;
 }, an.offset = {
  setOffset: function(e, n, t) {
   var o, i, r, a, s, l, c, d = an.css(e, "position"), u = an(e), p = {};
   "static" === d && (e.style.position = "relative"), s = u.offset(), r = an.css(e, "top"), 
   l = an.css(e, "left"), c = ("absolute" === d || "fixed" === d) && (r + l).indexOf("auto") > -1, 
   c ? (o = u.position(), a = o.top, i = o.left) : (a = parseFloat(r) || 0, i = parseFloat(l) || 0), 
   an.isFunction(n) && (n = n.call(e, t, s)), null != n.top && (p.top = n.top - s.top + a), 
   null != n.left && (p.left = n.left - s.left + i), "using" in n ? n.using.call(e, p) : u.css(p);
  }
 }, an.fn.extend({
  position: function() {
   if (this[0]) {
    var e, n, t = this[0], o = {
     top: 0,
     left: 0
    };
    return "fixed" === an.css(t, "position") ? n = t.getBoundingClientRect() : (e = this.offsetParent(), 
    n = this.offset(), an.nodeName(e[0], "html") || (o = e.offset()), o.top += an.css(e[0], "borderTopWidth", !0), 
    o.left += an.css(e[0], "borderLeftWidth", !0)), {
     top: n.top - o.top - an.css(t, "marginTop", !0),
     left: n.left - o.left - an.css(t, "marginLeft", !0)
    };
   }
  },
  offsetParent: function() {
   return this.map(function() {
    for (var e = this.offsetParent || U; e && !an.nodeName(e, "html") && "static" === an.css(e, "position"); ) e = e.offsetParent;
    return e || U;
   });
  }
 }), an.each({
  scrollLeft: "pageXOffset",
  scrollTop: "pageYOffset"
 }, function(t, o) {
  var i = "pageYOffset" === o;
  an.fn[t] = function(r) {
   return an.access(this, function(t, r, a) {
    var s = H(t);
    return a === n ? s ? s[o] : t[r] : (s ? s.scrollTo(i ? e.pageXOffset : a, i ? a : e.pageYOffset) : t[r] = a, 
    void 0);
   }, t, r, arguments.length, null);
  };
 }), an.each({
  Height: "height",
  Width: "width"
 }, function(e, t) {
  an.each({
   padding: "inner" + e,
   content: t,
   "": "outer" + e
  }, function(o, i) {
   an.fn[i] = function(i, r) {
    var a = arguments.length && (o || "boolean" != typeof i), s = o || (i === !0 || r === !0 ? "margin" : "border");
    return an.access(this, function(t, o, i) {
     var r;
     return an.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, 
     Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : i === n ? an.css(t, o, s) : an.style(t, o, i, s);
    }, t, a ? i : n, a, null);
   };
  });
 }), an.fn.size = function() {
  return this.length;
 }, an.fn.andSelf = an.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = an : "function" == typeof define && define.amd && define("jquery", [], function() {
  return an;
 }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = an);
})(window), function() {
 var e = this, n = e._, t = {}, o = Array.prototype, i = Object.prototype, r = Function.prototype, a = o.push, s = o.slice, l = o.concat, c = i.toString, d = i.hasOwnProperty, u = o.forEach, p = o.map, f = o.reduce, h = o.reduceRight, g = o.filter, m = o.every, b = o.some, v = o.indexOf, y = o.lastIndexOf, x = Array.isArray, w = Object.keys, k = r.bind, C = function(e) {
  return e instanceof C ? e : this instanceof C ? (this._wrapped = e, void 0) : new C(e);
 };
 "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = C), 
 exports._ = C) : e._ = C, C.VERSION = "1.4.4";
 var S = C.each = C.forEach = function(e, n, o) {
  if (null != e) if (u && e.forEach === u) e.forEach(n, o); else if (e.length === +e.length) {
   for (var i = 0, r = e.length; r > i; i++) if (n.call(o, e[i], i, e) === t) return;
  } else for (var a in e) if (C.has(e, a) && n.call(o, e[a], a, e) === t) return;
 };
 C.map = C.collect = function(e, n, t) {
  var o = [];
  return null == e ? o : p && e.map === p ? e.map(n, t) : (S(e, function(e, i, r) {
   o[o.length] = n.call(t, e, i, r);
  }), o);
 };
 var T = "Reduce of empty array with no initial value";
 C.reduce = C.foldl = C.inject = function(e, n, t, o) {
  var i = arguments.length > 2;
  if (null == e && (e = []), f && e.reduce === f) return o && (n = C.bind(n, o)), 
  i ? e.reduce(n, t) : e.reduce(n);
  if (S(e, function(e, r, a) {
   i ? t = n.call(o, t, e, r, a) : (t = e, i = !0);
  }), !i) throw new TypeError(T);
  return t;
 }, C.reduceRight = C.foldr = function(e, n, t, o) {
  var i = arguments.length > 2;
  if (null == e && (e = []), h && e.reduceRight === h) return o && (n = C.bind(n, o)), 
  i ? e.reduceRight(n, t) : e.reduceRight(n);
  var r = e.length;
  if (r !== +r) {
   var a = C.keys(e);
   r = a.length;
  }
  if (S(e, function(s, l, c) {
   l = a ? a[--r] : --r, i ? t = n.call(o, t, e[l], l, c) : (t = e[l], i = !0);
  }), !i) throw new TypeError(T);
  return t;
 }, C.find = C.detect = function(e, n, t) {
  var o;
  return E(e, function(e, i, r) {
   return n.call(t, e, i, r) ? (o = e, !0) : void 0;
  }), o;
 }, C.filter = C.select = function(e, n, t) {
  var o = [];
  return null == e ? o : g && e.filter === g ? e.filter(n, t) : (S(e, function(e, i, r) {
   n.call(t, e, i, r) && (o[o.length] = e);
  }), o);
 }, C.reject = function(e, n, t) {
  return C.filter(e, function(e, o, i) {
   return !n.call(t, e, o, i);
  }, t);
 }, C.every = C.all = function(e, n, o) {
  n || (n = C.identity);
  var i = !0;
  return null == e ? i : m && e.every === m ? e.every(n, o) : (S(e, function(e, r, a) {
   return (i = i && n.call(o, e, r, a)) ? void 0 : t;
  }), !!i);
 };
 var E = C.some = C.any = function(e, n, o) {
  n || (n = C.identity);
  var i = !1;
  return null == e ? i : b && e.some === b ? e.some(n, o) : (S(e, function(e, r, a) {
   return i || (i = n.call(o, e, r, a)) ? t : void 0;
  }), !!i);
 };
 C.contains = C.include = function(e, n) {
  return null == e ? !1 : v && e.indexOf === v ? -1 != e.indexOf(n) : E(e, function(e) {
   return e === n;
  });
 }, C.invoke = function(e, n) {
  var t = s.call(arguments, 2), o = C.isFunction(n);
  return C.map(e, function(e) {
   return (o ? n : e[n]).apply(e, t);
  });
 }, C.pluck = function(e, n) {
  return C.map(e, function(e) {
   return e[n];
  });
 }, C.where = function(e, n, t) {
  return C.isEmpty(n) ? t ? null : [] : C[t ? "find" : "filter"](e, function(e) {
   for (var t in n) if (n[t] !== e[t]) return !1;
   return !0;
  });
 }, C.findWhere = function(e, n) {
  return C.where(e, n, !0);
 }, C.max = function(e, n, t) {
  if (!n && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
  if (!n && C.isEmpty(e)) return -1/0;
  var o = {
   computed: -1/0,
   value: -1/0
  };
  return S(e, function(e, i, r) {
   var a = n ? n.call(t, e, i, r) : e;
   a >= o.computed && (o = {
    value: e,
    computed: a
   });
  }), o.value;
 }, C.min = function(e, n, t) {
  if (!n && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
  if (!n && C.isEmpty(e)) return 1/0;
  var o = {
   computed: 1/0,
   value: 1/0
  };
  return S(e, function(e, i, r) {
   var a = n ? n.call(t, e, i, r) : e;
   a < o.computed && (o = {
    value: e,
    computed: a
   });
  }), o.value;
 }, C.shuffle = function(e) {
  var n, t = 0, o = [];
  return S(e, function(e) {
   n = C.random(t++), o[t - 1] = o[n], o[n] = e;
  }), o;
 };
 var _ = function(e) {
  return C.isFunction(e) ? e : function(n) {
   return n[e];
  };
 };
 C.sortBy = function(e, n, t) {
  var o = _(n);
  return C.pluck(C.map(e, function(e, n, i) {
   return {
    value: e,
    index: n,
    criteria: o.call(t, e, n, i)
   };
  }).sort(function(e, n) {
   var t = e.criteria, o = n.criteria;
   if (t !== o) {
    if (t > o || void 0 === t) return 1;
    if (o > t || void 0 === o) return -1;
   }
   return e.index < n.index ? -1 : 1;
  }), "value");
 };
 var I = function(e, n, t, o) {
  var i = {}, r = _(n || C.identity);
  return S(e, function(n, a) {
   var s = r.call(t, n, a, e);
   o(i, s, n);
  }), i;
 };
 C.groupBy = function(e, n, t) {
  return I(e, n, t, function(e, n, t) {
   (C.has(e, n) ? e[n] : e[n] = []).push(t);
  });
 }, C.countBy = function(e, n, t) {
  return I(e, n, t, function(e, n) {
   C.has(e, n) || (e[n] = 0), e[n]++;
  });
 }, C.sortedIndex = function(e, n, t, o) {
  t = null == t ? C.identity : _(t);
  for (var i = t.call(o, n), r = 0, a = e.length; a > r; ) {
   var s = r + a >>> 1;
   t.call(o, e[s]) < i ? r = s + 1 : a = s;
  }
  return r;
 }, C.toArray = function(e) {
  return e ? C.isArray(e) ? s.call(e) : e.length === +e.length ? C.map(e, C.identity) : C.values(e) : [];
 }, C.size = function(e) {
  return null == e ? 0 : e.length === +e.length ? e.length : C.keys(e).length;
 }, C.first = C.head = C.take = function(e, n, t) {
  return null == e ? void 0 : null == n || t ? e[0] : s.call(e, 0, n);
 }, C.initial = function(e, n, t) {
  return s.call(e, 0, e.length - (null == n || t ? 1 : n));
 }, C.last = function(e, n, t) {
  return null == e ? void 0 : null == n || t ? e[e.length - 1] : s.call(e, Math.max(e.length - n, 0));
 }, C.rest = C.tail = C.drop = function(e, n, t) {
  return s.call(e, null == n || t ? 1 : n);
 }, C.compact = function(e) {
  return C.filter(e, C.identity);
 };
 var P = function(e, n, t) {
  return S(e, function(e) {
   C.isArray(e) ? n ? a.apply(t, e) : P(e, n, t) : t.push(e);
  }), t;
 };
 C.flatten = function(e, n) {
  return P(e, n, []);
 }, C.without = function(e) {
  return C.difference(e, s.call(arguments, 1));
 }, C.uniq = C.unique = function(e, n, t, o) {
  C.isFunction(n) && (o = t, t = n, n = !1);
  var i = t ? C.map(e, t, o) : e, r = [], a = [];
  return S(i, function(t, o) {
   (n ? o && a[a.length - 1] === t : C.contains(a, t)) || (a.push(t), r.push(e[o]));
  }), r;
 }, C.union = function() {
  return C.uniq(l.apply(o, arguments));
 }, C.intersection = function(e) {
  var n = s.call(arguments, 1);
  return C.filter(C.uniq(e), function(e) {
   return C.every(n, function(n) {
    return C.indexOf(n, e) >= 0;
   });
  });
 }, C.difference = function(e) {
  var n = l.apply(o, s.call(arguments, 1));
  return C.filter(e, function(e) {
   return !C.contains(n, e);
  });
 }, C.zip = function() {
  for (var e = s.call(arguments), n = C.max(C.pluck(e, "length")), t = new Array(n), o = 0; n > o; o++) t[o] = C.pluck(e, "" + o);
  return t;
 }, C.object = function(e, n) {
  if (null == e) return {};
  for (var t = {}, o = 0, i = e.length; i > o; o++) n ? t[e[o]] = n[o] : t[e[o][0]] = e[o][1];
  return t;
 }, C.indexOf = function(e, n, t) {
  if (null == e) return -1;
  var o = 0, i = e.length;
  if (t) {
   if ("number" != typeof t) return o = C.sortedIndex(e, n), e[o] === n ? o : -1;
   o = 0 > t ? Math.max(0, i + t) : t;
  }
  if (v && e.indexOf === v) return e.indexOf(n, t);
  for (;i > o; o++) if (e[o] === n) return o;
  return -1;
 }, C.lastIndexOf = function(e, n, t) {
  if (null == e) return -1;
  var o = null != t;
  if (y && e.lastIndexOf === y) return o ? e.lastIndexOf(n, t) : e.lastIndexOf(n);
  for (var i = o ? t : e.length; i--; ) if (e[i] === n) return i;
  return -1;
 }, C.range = function(e, n, t) {
  arguments.length <= 1 && (n = e || 0, e = 0), t = arguments[2] || 1;
  for (var o = Math.max(Math.ceil((n - e) / t), 0), i = 0, r = new Array(o); o > i; ) r[i++] = e, 
  e += t;
  return r;
 }, C.bind = function(e, n) {
  if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
  var t = s.call(arguments, 2);
  return function() {
   return e.apply(n, t.concat(s.call(arguments)));
  };
 }, C.partial = function(e) {
  var n = s.call(arguments, 1);
  return function() {
   return e.apply(this, n.concat(s.call(arguments)));
  };
 }, C.bindAll = function(e) {
  var n = s.call(arguments, 1);
  return 0 === n.length && (n = C.functions(e)), S(n, function(n) {
   e[n] = C.bind(e[n], e);
  }), e;
 }, C.memoize = function(e, n) {
  var t = {};
  return n || (n = C.identity), function() {
   var o = n.apply(this, arguments);
   return C.has(t, o) ? t[o] : t[o] = e.apply(this, arguments);
  };
 }, C.delay = function(e, n) {
  var t = s.call(arguments, 2);
  return setTimeout(function() {
   return e.apply(null, t);
  }, n);
 }, C.defer = function(e) {
  return C.delay.apply(C, [ e, 1 ].concat(s.call(arguments, 1)));
 }, C.throttle = function(e, n) {
  var t, o, i, r, a = 0, s = function() {
   a = new Date(), i = null, r = e.apply(t, o);
  };
  return function() {
   var l = new Date(), c = n - (l - a);
   return t = this, o = arguments, 0 >= c ? (clearTimeout(i), i = null, a = l, r = e.apply(t, o)) : i || (i = setTimeout(s, c)), 
   r;
  };
 }, C.debounce = function(e, n, t) {
  var o, i;
  return function() {
   var r = this, a = arguments, s = function() {
    o = null, t || (i = e.apply(r, a));
   }, l = t && !o;
   return clearTimeout(o), o = setTimeout(s, n), l && (i = e.apply(r, a)), i;
  };
 }, C.once = function(e) {
  var n, t = !1;
  return function() {
   return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n);
  };
 }, C.wrap = function(e, n) {
  return function() {
   var t = [ e ];
   return a.apply(t, arguments), n.apply(this, t);
  };
 }, C.compose = function() {
  var e = arguments;
  return function() {
   for (var n = arguments, t = e.length - 1; t >= 0; t--) n = [ e[t].apply(this, n) ];
   return n[0];
  };
 }, C.after = function(e, n) {
  return 0 >= e ? n() : function() {
   return --e < 1 ? n.apply(this, arguments) : void 0;
  };
 }, C.keys = w || function(e) {
  if (e !== Object(e)) throw new TypeError("Invalid object");
  var n = [];
  for (var t in e) C.has(e, t) && (n[n.length] = t);
  return n;
 }, C.values = function(e) {
  var n = [];
  for (var t in e) C.has(e, t) && n.push(e[t]);
  return n;
 }, C.pairs = function(e) {
  var n = [];
  for (var t in e) C.has(e, t) && n.push([ t, e[t] ]);
  return n;
 }, C.invert = function(e) {
  var n = {};
  for (var t in e) C.has(e, t) && (n[e[t]] = t);
  return n;
 }, C.functions = C.methods = function(e) {
  var n = [];
  for (var t in e) C.isFunction(e[t]) && n.push(t);
  return n.sort();
 }, C.extend = function(e) {
  return S(s.call(arguments, 1), function(n) {
   if (n) for (var t in n) e[t] = n[t];
  }), e;
 }, C.pick = function(e) {
  var n = {}, t = l.apply(o, s.call(arguments, 1));
  return S(t, function(t) {
   t in e && (n[t] = e[t]);
  }), n;
 }, C.omit = function(e) {
  var n = {}, t = l.apply(o, s.call(arguments, 1));
  for (var i in e) C.contains(t, i) || (n[i] = e[i]);
  return n;
 }, C.defaults = function(e) {
  return S(s.call(arguments, 1), function(n) {
   if (n) for (var t in n) null == e[t] && (e[t] = n[t]);
  }), e;
 }, C.clone = function(e) {
  return C.isObject(e) ? C.isArray(e) ? e.slice() : C.extend({}, e) : e;
 }, C.tap = function(e, n) {
  return n(e), e;
 };
 var z = function(e, n, t, o) {
  if (e === n) return 0 !== e || 1 / e == 1 / n;
  if (null == e || null == n) return e === n;
  e instanceof C && (e = e._wrapped), n instanceof C && (n = n._wrapped);
  var i = c.call(e);
  if (i != c.call(n)) return !1;
  switch (i) {
  case "[object String]":
   return e == String(n);

  case "[object Number]":
   return e != +e ? n != +n : 0 == e ? 1 / e == 1 / n : e == +n;

  case "[object Date]":
  case "[object Boolean]":
   return +e == +n;

  case "[object RegExp]":
   return e.source == n.source && e.global == n.global && e.multiline == n.multiline && e.ignoreCase == n.ignoreCase;
  }
  if ("object" != typeof e || "object" != typeof n) return !1;
  for (var r = t.length; r--; ) if (t[r] == e) return o[r] == n;
  t.push(e), o.push(n);
  var a = 0, s = !0;
  if ("[object Array]" == i) {
   if (a = e.length, s = a == n.length) for (;a-- && (s = z(e[a], n[a], t, o)); ) ;
  } else {
   var l = e.constructor, d = n.constructor;
   if (l !== d && !(C.isFunction(l) && l instanceof l && C.isFunction(d) && d instanceof d)) return !1;
   for (var u in e) if (C.has(e, u) && (a++, !(s = C.has(n, u) && z(e[u], n[u], t, o)))) break;
   if (s) {
    for (u in n) if (C.has(n, u) && !a--) break;
    s = !a;
   }
  }
  return t.pop(), o.pop(), s;
 };
 C.isEqual = function(e, n) {
  return z(e, n, [], []);
 }, C.isEmpty = function(e) {
  if (null == e) return !0;
  if (C.isArray(e) || C.isString(e)) return 0 === e.length;
  for (var n in e) if (C.has(e, n)) return !1;
  return !0;
 }, C.isElement = function(e) {
  return !(!e || 1 !== e.nodeType);
 }, C.isArray = x || function(e) {
  return "[object Array]" == c.call(e);
 }, C.isObject = function(e) {
  return e === Object(e);
 }, S([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(e) {
  C["is" + e] = function(n) {
   return c.call(n) == "[object " + e + "]";
  };
 }), C.isArguments(arguments) || (C.isArguments = function(e) {
  return !(!e || !C.has(e, "callee"));
 }), "function" != typeof /./ && (C.isFunction = function(e) {
  return "function" == typeof e;
 }), C.isFinite = function(e) {
  return isFinite(e) && !isNaN(parseFloat(e));
 }, C.isNaN = function(e) {
  return C.isNumber(e) && e != +e;
 }, C.isBoolean = function(e) {
  return e === !0 || e === !1 || "[object Boolean]" == c.call(e);
 }, C.isNull = function(e) {
  return null === e;
 }, C.isUndefined = function(e) {
  return void 0 === e;
 }, C.has = function(e, n) {
  return d.call(e, n);
 }, C.noConflict = function() {
  return e._ = n, this;
 }, C.identity = function(e) {
  return e;
 }, C.times = function(e, n, t) {
  for (var o = Array(e), i = 0; e > i; i++) o[i] = n.call(t, i);
  return o;
 }, C.random = function(e, n) {
  return null == n && (n = e, e = 0), e + Math.floor(Math.random() * (n - e + 1));
 };
 var $ = {
  escape: {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': "&quot;",
   "'": "&#x27;",
   "/": "&#x2F;"
  }
 };
 $.unescape = C.invert($.escape);
 var N = {
  escape: new RegExp("[" + C.keys($.escape).join("") + "]", "g"),
  unescape: new RegExp("(" + C.keys($.unescape).join("|") + ")", "g")
 };
 C.each([ "escape", "unescape" ], function(e) {
  C[e] = function(n) {
   return null == n ? "" : ("" + n).replace(N[e], function(n) {
    return $[e][n];
   });
  };
 }), C.result = function(e, n) {
  if (null == e) return null;
  var t = e[n];
  return C.isFunction(t) ? t.call(e) : t;
 }, C.mixin = function(e) {
  S(C.functions(e), function(n) {
   var t = C[n] = e[n];
   C.prototype[n] = function() {
    var e = [ this._wrapped ];
    return a.apply(e, arguments), j.call(this, t.apply(C, e));
   };
  });
 };
 var R = 0;
 C.uniqueId = function(e) {
  var n = ++R + "";
  return e ? e + n : n;
 }, C.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
 };
 var L = /(.)^/, M = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "	": "t",
  "\u2028": "u2028",
  "\u2029": "u2029"
 }, A = /\\|'|\r|\n|\t|\u2028|\u2029/g;
 C.template = function(e, n, t) {
  var o;
  t = C.defaults({}, t, C.templateSettings);
  var i = new RegExp([ (t.escape || L).source, (t.interpolate || L).source, (t.evaluate || L).source ].join("|") + "|$", "g"), r = 0, a = "__p+='";
  e.replace(i, function(n, t, o, i, s) {
   return a += e.slice(r, s).replace(A, function(e) {
    return "\\" + M[e];
   }), t && (a += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'"), o && (a += "'+\n((__t=(" + o + "))==null?'':__t)+\n'"), 
   i && (a += "';\n" + i + "\n__p+='"), r = s + n.length, n;
  }), a += "';\n", t.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
  try {
   o = new Function(t.variable || "obj", "_", a);
  } catch (s) {
   throw s.source = a, s;
  }
  if (n) return o(n, C);
  var l = function(e) {
   return o.call(this, e, C);
  };
  return l.source = "function(" + (t.variable || "obj") + "){\n" + a + "}", l;
 }, C.chain = function(e) {
  return C(e).chain();
 };
 var j = function(e) {
  return this._chain ? C(e).chain() : e;
 };
 C.mixin(C), S([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
  var n = o[e];
  C.prototype[e] = function() {
   var t = this._wrapped;
   return n.apply(t, arguments), "shift" != e && "splice" != e || 0 !== t.length || delete t[0], 
   j.call(this, t);
  };
 }), S([ "concat", "join", "slice" ], function(e) {
  var n = o[e];
  C.prototype[e] = function() {
   return j.call(this, n.apply(this._wrapped, arguments));
  };
 }), C.extend(C.prototype, {
  chain: function() {
   return this._chain = !0, this;
  },
  value: function() {
   return this._wrapped;
  }
 });
}.call(this), define("underscore", function(e) {
 return function() {
  var n;
  return n || e._;
 };
}(this)), function(e, n) {
 "object" == typeof exports ? module.exports = n() : "function" == typeof define && define.amd ? define("crel", n) : e.crel = n();
}(this, function() {
 function e() {
  var t, o = window.document, i = arguments, r = o.createElement(i[0]), a = i[1], s = 2, l = i.length, c = e.attrMap;
  if (1 === l) return r;
  if (("object" != typeof a || n(a)) && (--s, a = null), 1 === l - s && "string" == typeof i[s] && void 0 !== r.textContent) r.textContent = i[s]; else for (;l > s; ++s) t = i[s], 
  null != t && (n(t) || (t = o.createTextNode(t)), r.appendChild(t));
  for (var d in a) if (c[d]) {
   var u = e.attrMap[d];
   "function" == typeof u ? u(r, a[d]) : r.setAttribute(u, a[d]);
  } else r.setAttribute(d, a[d]);
  return r;
 }
 var n = "object" == typeof Node ? function(e) {
  return e instanceof Node;
 } : function(e) {
  return e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
 };
 return e.attrMap = {}, e.isNode = n, e;
});

var saveAs = saveAs || navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator) || function(e) {
 try {
  var n = e.document, t = function() {
   return e.URL || e.webkitURL || e;
  }, o = e.URL || e.webkitURL || e, i = n.createElementNS("http://www.w3.org/1999/xhtml", "a"), r = "download" in i, a = function(t) {
   var o = n.createEvent("MouseEvents");
   o.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), t.dispatchEvent(o);
  }, s = e.webkitRequestFileSystem, l = e.requestFileSystem || s || e.mozRequestFileSystem, c = function(n) {
   (e.setImmediate || e.setTimeout)(function() {
    throw n;
   }, 0);
  }, d = "application/octet-stream", u = 0, p = [], f = function() {
   for (var e = p.length; e--; ) {
    var n = p[e];
    "string" == typeof n ? o.revokeObjectURL(n) : n.remove();
   }
   p.length = 0;
  }, h = function(e, n, t) {
   n = [].concat(n);
   for (var o = n.length; o--; ) {
    var i = e["on" + n[o]];
    if ("function" == typeof i) try {
     i.call(e, t || e);
    } catch (r) {
     c(r);
    }
   }
  }, g = function(n, o) {
   var c, f, g, m = this, b = n.type, v = !1, y = function() {
    var e = t().createObjectURL(n);
    return p.push(e), e;
   }, x = function() {
    h(m, "writestart progress write writeend".split(" "));
   }, w = function() {
    (v || !c) && (c = y(n)), f && (f.location.href = c), m.readyState = m.DONE, x();
   }, k = function(e) {
    return function() {
     return m.readyState !== m.DONE ? e.apply(this, arguments) : void 0;
    };
   }, C = {
    create: !0,
    exclusive: !1
   };
   return m.readyState = m.INIT, o || (o = "download"), r ? (c = y(n), i.href = c, 
   i.download = o, a(i), m.readyState = m.DONE, x(), void 0) : (e.chrome && b && b !== d && (g = n.slice || n.webkitSlice, 
   n = g.call(n, 0, n.size, d), v = !0), s && "download" !== o && (o += ".download"), 
   f = b === d || s ? e : e.open(), l ? (u += n.size, l(e.TEMPORARY, u, k(function(e) {
    e.root.getDirectory("saved", C, k(function(e) {
     var t = function() {
      e.getFile(o, C, k(function(e) {
       e.createWriter(k(function(t) {
        t.onwriteend = function(n) {
         f.location.href = e.toURL(), p.push(e), m.readyState = m.DONE, h(m, "writeend", n);
        }, t.onerror = function() {
         var e = t.error;
         e.code !== e.ABORT_ERR && w();
        }, "writestart progress write abort".split(" ").forEach(function(e) {
         t["on" + e] = m["on" + e];
        }), t.write(n), m.abort = function() {
         t.abort(), m.readyState = m.DONE;
        }, m.readyState = m.WRITING;
       }), w);
      }), w);
     };
     e.getFile(o, {
      create: !1
     }, k(function(e) {
      e.remove(), t();
     }), k(function(e) {
      e.code === e.NOT_FOUND_ERR ? t() : w();
     }));
    }), w);
   }), w), void 0) : (w(), void 0));
  }, m = g.prototype, b = function(e, n) {
   return new g(e, n);
  };
  return m.abort = function() {
   var e = this;
   e.readyState = e.DONE, h(e, "abort");
  }, m.readyState = m.INIT = 0, m.WRITING = 1, m.DONE = 2, m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null, 
  e.addEventListener("unload", f, !1), b;
 } catch (v) {
  return void 0;
 }
}(self);

define("libs/FileSaver", function() {}), "undefined" != typeof module && module.exports && (module.exports = printStackTrace), 
printStackTrace.implementation = function() {}, printStackTrace.implementation.prototype = {
 run: function(e, n) {
  return e = e || this.createException(), n = n || this.mode(e), "other" === n ? this.other(arguments.callee) : this[n](e);
 },
 createException: function() {
  try {
   this.undef();
  } catch (e) {
   return e;
  }
 },
 mode: function(e) {
  return e.arguments && e.stack ? "chrome" : e.stack && e.sourceURL ? "safari" : e.stack && e.number ? "ie" : "string" == typeof e.message && "undefined" != typeof window && window.opera ? e.stacktrace ? e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? "opera9" : e.stack ? e.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : "opera10a" : "opera9" : e.stack ? "firefox" : "other";
 },
 instrumentFunction: function(e, n, t) {
  e = e || window;
  var o = e[n];
  e[n] = function() {
   return t.call(this, printStackTrace().slice(4)), e[n]._instrumented.apply(this, arguments);
  }, e[n]._instrumented = o;
 },
 deinstrumentFunction: function(e, n) {
  e[n].constructor === Function && e[n]._instrumented && e[n]._instrumented.constructor === Function && (e[n] = e[n]._instrumented);
 },
 chrome: function(e) {
  var n = (e.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
  return n.pop(), n;
 },
 safari: function(e) {
  return e.stack.replace(/\[native code\]\n/m, "").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n");
 },
 ie: function(e) {
  var n = /^.*at (\w+) \(([^\)]+)\)$/gm;
  return e.stack.replace(/at Anonymous function /gm, "{anonymous}()@").replace(/^(?=\w+Error\:).*$\n/m, "").replace(n, "$1@$2").split("\n");
 },
 firefox: function(e) {
  return e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^[\(@]/gm, "{anonymous}()@").split("\n");
 },
 opera11: function(e) {
  for (var n = "{anonymous}", t = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, o = e.stacktrace.split("\n"), i = [], r = 0, a = o.length; a > r; r += 2) {
   var s = t.exec(o[r]);
   if (s) {
    var l = s[4] + ":" + s[1] + ":" + s[2], c = s[3] || "global code";
    c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, n), 
    i.push(c + "@" + l + " -- " + o[r + 1].replace(/^\s+/, ""));
   }
  }
  return i;
 },
 opera10b: function(e) {
  for (var n = /^(.*)@(.+):(\d+)$/, t = e.stacktrace.split("\n"), o = [], i = 0, r = t.length; r > i; i++) {
   var a = n.exec(t[i]);
   if (a) {
    var s = a[1] ? a[1] + "()" : "global code";
    o.push(s + "@" + a[2] + ":" + a[3]);
   }
  }
  return o;
 },
 opera10a: function(e) {
  for (var n = "{anonymous}", t = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, o = e.stacktrace.split("\n"), i = [], r = 0, a = o.length; a > r; r += 2) {
   var s = t.exec(o[r]);
   if (s) {
    var l = s[3] || n;
    i.push(l + "()@" + s[2] + ":" + s[1] + " -- " + o[r + 1].replace(/^\s+/, ""));
   }
  }
  return i;
 },
 opera9: function(e) {
  for (var n = "{anonymous}", t = /Line (\d+).*script (?:in )?(\S+)/i, o = e.message.split("\n"), i = [], r = 2, a = o.length; a > r; r += 2) {
   var s = t.exec(o[r]);
   s && i.push(n + "()@" + s[2] + ":" + s[1] + " -- " + o[r + 1].replace(/^\s+/, ""));
  }
  return i;
 },
 other: function(e) {
  for (var n, t, o = "{anonymous}", i = /function\s*([\w\-$]+)?\s*\(/i, r = [], a = 10; e && e.arguments && r.length < a; ) n = i.test(e.toString()) ? RegExp.$1 || o : o, 
  t = Array.prototype.slice.call(e.arguments || []), r[r.length] = n + "(" + this.stringifyArguments(t) + ")", 
  e = e.caller;
  return r;
 },
 stringifyArguments: function(e) {
  for (var n = [], t = Array.prototype.slice, o = 0; o < e.length; ++o) {
   var i = e[o];
   void 0 === i ? n[o] = "undefined" : null === i ? n[o] = "null" : i.constructor && (i.constructor === Array ? n[o] = i.length < 3 ? "[" + this.stringifyArguments(i) + "]" : "[" + this.stringifyArguments(t.call(i, 0, 1)) + "..." + this.stringifyArguments(t.call(i, -1)) + "]" : i.constructor === Object ? n[o] = "#object" : i.constructor === Function ? n[o] = "#function" : i.constructor === String ? n[o] = '"' + i + '"' : i.constructor === Number && (n[o] = i));
  }
  return n.join(",");
 },
 sourceCache: {},
 ajax: function(e) {
  var n = this.createXMLHTTPObject();
  if (n) try {
   return n.open("GET", e, !1), n.send(null), n.responseText;
  } catch (t) {}
  return "";
 },
 createXMLHTTPObject: function() {
  for (var e, n = [ function() {
   return new XMLHttpRequest();
  }, function() {
   return new ActiveXObject("Msxml2.XMLHTTP");
  }, function() {
   return new ActiveXObject("Msxml3.XMLHTTP");
  }, function() {
   return new ActiveXObject("Microsoft.XMLHTTP");
  } ], t = 0; t < n.length; t++) try {
   return e = n[t](), this.createXMLHTTPObject = n[t], e;
  } catch (o) {}
 },
 isSameDomain: function(e) {
  return "undefined" != typeof location && -1 !== e.indexOf(location.hostname);
 },
 getSource: function(e) {
  return e in this.sourceCache || (this.sourceCache[e] = this.ajax(e).split("\n")), 
  this.sourceCache[e];
 },
 guessAnonymousFunctions: function(e) {
  for (var n = 0; n < e.length; ++n) {
   var t = /\{anonymous\}\(.*\)@(.*)/, o = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, i = e[n], r = t.exec(i);
   if (r) {
    var a = o.exec(r[1]);
    if (a) {
     var s = a[1], l = a[2], c = a[3] || 0;
     if (s && this.isSameDomain(s) && l) {
      var d = this.guessAnonymousFunction(s, l, c);
      e[n] = i.replace("{anonymous}", d);
     }
    }
   }
  }
  return e;
 },
 guessAnonymousFunction: function(e, n) {
  var t;
  try {
   t = this.findFunctionName(this.getSource(e), n);
  } catch (o) {
   t = "getSource failed with url: " + e + ", exception: " + o.toString();
  }
  return t;
 },
 findFunctionName: function(e, n) {
  for (var t, o, i, r = /function\s+([^(]*?)\s*\(([^)]*)\)/, a = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, s = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, l = "", c = Math.min(n, 20), d = 0; c > d; ++d) if (t = e[n - d - 1], 
  i = t.indexOf("//"), i >= 0 && (t = t.substr(0, i)), t) {
   if (l = t + l, o = a.exec(l), o && o[1]) return o[1];
   if (o = r.exec(l), o && o[1]) return o[1];
   if (o = s.exec(l), o && o[1]) return o[1];
  }
  return "(?)";
 }
}, define("libs/stacktrace", function() {}), define("utils", [ "jquery", "underscore", "crel", "libs/FileSaver", "libs/stacktrace" ], function($, _, crel) {
 function jqElt(e) {
  return _.isString(e) ? $(e) : e;
 }
 function inputError(e, n) {
  void 0 !== n && (e.stop(!0, !0).addClass("error").delay(1e3).switchClass("error"), 
  n.stopPropagation());
 }
 var utils = {};
 utils.getURLParameter = function(e) {
  var n = new RegExp(e + "=(.+?)(&|$)");
  try {
   return decodeURIComponent(n.exec(location.search)[1]);
  } catch (t) {
   return void 0;
  }
 }, utils.getInputValue = function(e) {
  return e = jqElt(e), e.val();
 }, utils.setInputValue = function(e, n) {
  e = jqElt(e), e.val(n);
 }, utils.getInputTextValue = function(e, n, t) {
  e = jqElt(e);
  var o = e.val();
  return void 0 === o ? (inputError(e, n), void 0) : (o = utils.trim(o), 0 === o.length || void 0 !== t && !o.match(t) ? (inputError(e, n), 
  void 0) : o);
 }, utils.getInputIntValue = function(e, n, t, o) {
  e = jqElt(e);
  var i = utils.getInputTextValue(e, n);
  return void 0 === i ? void 0 : (i = parseInt(i), 0/0 === i || void 0 !== t && t > i || void 0 !== o && i > o ? (inputError(e, n), 
  void 0) : i);
 }, utils.getInputRegExpValue = function(e, n) {
  e = jqElt(e);
  var t = utils.getInputTextValue(e, n);
  if (void 0 === t) return void 0;
  try {
   new RegExp(t);
  } catch (o) {
   return inputError(e, n), void 0;
  }
  return t;
 }, utils.getInputJsValue = function(element, event) {
  element = jqElt(element);
  var value = utils.getInputTextValue(element, event);
  if (void 0 === value) return void 0;
  try {
   eval("var test=" + value);
  } catch (e) {
   return inputError(element, event), void 0;
  }
  return value;
 }, utils.getInputChecked = function(e) {
  return e = jqElt(e), e.prop("checked");
 }, utils.setInputChecked = function(e, n) {
  e = jqElt(e), e.prop("checked", n);
 }, utils.getInputRadio = function(e) {
  return $("input:radio[name=" + e + "]:checked").prop("value");
 }, utils.setInputRadio = function(e, n) {
  $("input:radio[name=" + e + "][value=" + n + "]").prop("checked", !0);
 }, utils.resetModalInputs = function() {
  $(".modal input[type=text]:not([disabled]), .modal input[type=password], .modal textarea").val(""), 
  $(".modal input[type=checkbox]").prop("checked", !1);
 }, utils.trim = function(e) {
  return $.trim(e);
 }, utils.slugify = function(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }, utils.checkUrl = function(e, n) {
  return e ? (0 !== e.indexOf("http") && (e = "http://" + e), n && -1 === e.indexOf("/", e.length - 1) && (e += "/"), 
  e) : e;
 }, utils.addModal = function(e, n) {
  var t = crel("div", {
   id: e,
   "class": "modal"
  });
  t.innerHTML = n, document.getElementsByTagName("body")[0].appendChild(t);
 }, utils.popupWindow = function(e, n, t, o) {
  var i = screen.width / 2 - t / 2, r = screen.height / 2 - o / 2;
  return window.open(e, n, [ "toolbar=no, ", "location=no, ", "directories=no, ", "status=no, ", "menubar=no, ", "scrollbars=no, ", "resizable=no, ", "copyhistory=no, ", "width=" + t + ", ", "height=" + o + ", ", "top=" + r + ", ", "left=" + i ].join(""));
 }, utils.saveAs = function(e, n) {
  if (void 0 !== saveAs) {
   var t = new Blob([ e ], {
    type: "text/plain;charset=utf-8"
   });
   saveAs(t, n);
  } else {
   var o = "data:application/octet-stream;base64," + utils.encodeBase64(e);
   window.open(o, "file");
  }
 }, utils.randomString = function() {
  return _.random(4294967296).toString(36);
 }, utils.updateCurrentTime = function() {
  utils.currentTime = new Date().getTime();
 }, utils.updateCurrentTime(), utils.storeAttributes = function(e) {
  var n = e.syncIndex || e.publishIndex, t = _.omit(e, "syncIndex", "publishIndex", "provider");
  t.provider = e.provider.providerId, localStorage[n] = JSON.stringify(t);
 }, utils.retrieveIndexArray = function(e) {
  try {
   return _.compact(localStorage[e].split(";"));
  } catch (n) {
   return localStorage[e] = ";", [];
  }
 }, utils.appendIndexToArray = function(e, n) {
  localStorage[e] += n + ";";
 }, utils.removeIndexFromArray = function(e, n) {
  localStorage[e] = localStorage[e].replace(";" + n + ";", ";");
 }, utils.retrieveIgnoreError = function(e) {
  try {
   return JSON.parse(localStorage[e]);
  } catch (n) {
   return void 0;
  }
 };
 var eventList = [];
 utils.logValue = function(e) {
  eventList.unshift(e), eventList.length > 5 && eventList.pop();
 }, utils.logStackTrace = function() {
  eventList.unshift(printStackTrace()), eventList.length > 5 && eventList.pop();
 }, utils.formatEventList = function() {
  var e = [];
  return _.each(eventList, function(n) {
   e.push("\n"), _.isString(n) ? e.push(n) : _.isArray(n) && (e.push(n[5] || ""), e.push(n[6] || ""));
  }), e.join("");
 }, utils.encodeBase64 = function(e) {
  if (0 === e.length) return "";
  var n, t, o = [], i = 0;
  for (e = encodeURI(e), n = e.length; n > i; ) t = e[i], i += 1, "%" !== t ? o.push(t.charCodeAt(0)) : (t = e[i] + e[i + 1], 
  o.push(parseInt(t, 16)), i += 2);
  var r, a, s = "=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = [], d = o.length - o.length % 3;
  for (r = 0; d > r; r += 3) a = o[r] << 16 | o[r + 1] << 8 | o[r + 2], c.push(l.charAt(a >> 18)), 
  c.push(l.charAt(63 & a >> 12)), c.push(l.charAt(63 & a >> 6)), c.push(l.charAt(63 & a));
  switch (o.length - d) {
  case 1:
   a = o[r] << 16, c.push(l.charAt(a >> 18) + l.charAt(63 & a >> 12) + s + s);
   break;

  case 2:
   a = o[r] << 16 | o[r + 1] << 8, c.push(l.charAt(a >> 18) + l.charAt(63 & a >> 12) + l.charAt(63 & a >> 6) + s);
  }
  return c.join("");
 };
 var mHash = [ 0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117 ];
 return utils.crc32 = function(e) {
  for (var n = 0, t = -1, o = 0; o < e.length; o++) n = 255 & (t ^ e.charCodeAt(o)), 
  t = t >>> 8 ^ mHash[n];
  return t = -1 ^ t, 0 > t && (t = 4294967295 + t + 1), t.toString(16);
 }, utils;
});

var MAIN_URL = "http://benweet.github.io/stackedit/", GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1", GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw", GOOGLE_SCOPES = [ "https://www.googleapis.com/auth/drive.install", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/blogger", "https://picasaweb.google.com/data/" ], GOOGLE_DRIVE_APP_ID = "241271498917", DROPBOX_APP_KEY = "lq6mwopab8wskas", DROPBOX_APP_SECRET = "851fgnucpezy84t", BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c", DEFAULT_FILE_TITLE = "Title", GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document", CHECK_ONLINE_PERIOD = 12e4, AJAX_TIMEOUT = 3e4, ASYNC_TASK_DEFAULT_TIMEOUT = 6e4, ASYNC_TASK_LONG_TIMEOUT = 18e4, SYNC_PERIOD = 18e4, USER_IDLE_THRESHOLD = 3e5, IMPORT_FILE_MAX_CONTENT_SIZE = 1e5, IMPORT_IMG_MAX_CONTENT_SIZE = 1e7, TEMPORARY_FILE_INDEX = "file.tempIndex", WELCOME_DOCUMENT_TITLE = "Welcome document", DOWNLOAD_PROXY_URL = "http://stackedit-download-proxy.herokuapp.com/", PICASA_PROXY_URL = "http://stackedit-picasa-proxy.herokuapp.com/", WORDPRESS_CLIENT_ID = "3185", WORDPRESS_PROXY_URL = "http://stackedit-wordpress-proxy.herokuapp.com/", SSH_PROXY_URL = "http://stackedit-ssh-proxy.herokuapp.com/", delayedFunction = void 0, BASE_URL = "http://localhost/stackedit/", GOOGLE_CLIENT_ID = "241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com", GITHUB_CLIENT_ID = "e47fef6055344579799d", GATEKEEPER_URL = "http://stackedit-gatekeeper-localhost.herokuapp.com/", TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy-local.herokuapp.com/";

0 === location.hostname.indexOf("benweet.github.io") && (BASE_URL = MAIN_URL, GOOGLE_CLIENT_ID = "241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com", 
GITHUB_CLIENT_ID = "fa0d09514da8377ee32e", GATEKEEPER_URL = "http://stackedit-gatekeeper.herokuapp.com/", 
TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy.herokuapp.com/");

var THEME_LIST = {
 "": "Default",
 "blue-gray": "Blue-Gray",
 night: "Night"
};

define("config", function() {}), define("settings", [ "underscore", "config" ], function(e) {
 var n = {
  layoutOrientation: "horizontal",
  lazyRendering: !0,
  editorFontFamily: "Courier New, Courier, monospace",
  editorFontSize: 14,
  defaultContent: "\n\n\n> Written with [StackEdit](" + MAIN_URL + ").",
  commitMsg: "Published with " + MAIN_URL,
  template: [ "<!DOCTYPE html>\n", "<html>\n", "<head>\n", '<meta charset="utf-8">\n', "<title><%= documentTitle %></title>\n", '<link rel="stylesheet" href="', MAIN_URL, 'css/main-min.css" />\n', '<script type="text/javascript" src="', MAIN_URL, 'lib/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n', "</head>\n", "<body><%= documentHTML %></body>\n", "</html>" ].join(""),
  sshProxy: SSH_PROXY_URL,
  extensionSettings: {}
 };
 try {
  e.extend(n, JSON.parse(localStorage.settings));
 } catch (t) {}
 return n;
}), define("classes/Extension", [], function() {
 function e(e, n, t, o) {
  this.extensionId = e, this.extensionName = n, this.isOptional = t, this.disableInViewer = o;
 }
 return e;
}), define("text", [ "module" ], function(e) {
 var n, t, o, i, r = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], a = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, s = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, l = "undefined" != typeof location && location.href, c = l && location.protocol && location.protocol.replace(/\:/, ""), d = l && location.hostname, u = l && (location.port || void 0), p = [], f = e.config && e.config() || {};
 return n = {
  version: "2.0.6",
  strip: function(e) {
   if (e) {
    e = e.replace(a, "");
    var n = e.match(s);
    n && (e = n[1]);
   } else e = "";
   return e;
  },
  jsEscape: function(e) {
   return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029");
  },
  createXhr: f.createXhr || function() {
   var e, n, t;
   if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest();
   if ("undefined" != typeof ActiveXObject) for (n = 0; 3 > n; n += 1) {
    t = r[n];
    try {
     e = new ActiveXObject(t);
    } catch (o) {}
    if (e) {
     r = [ t ];
     break;
    }
   }
   return e;
  },
  parseName: function(e) {
   var n, t, o, i = !1, r = e.indexOf("."), a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
   return -1 !== r && (!a || r > 1) ? (n = e.substring(0, r), t = e.substring(r + 1, e.length)) : n = e, 
   o = t || n, r = o.indexOf("!"), -1 !== r && (i = "strip" === o.substring(r + 1), 
   o = o.substring(0, r), t ? t = o : n = o), {
    moduleName: n,
    ext: t,
    strip: i
   };
  },
  xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
  useXhr: function(e, t, o, i) {
   var r, a, s, l = n.xdRegExp.exec(e);
   return l ? (r = l[2], a = l[3], a = a.split(":"), s = a[1], a = a[0], !(r && r !== t || a && a.toLowerCase() !== o.toLowerCase() || (s || a) && s !== i)) : !0;
  },
  finishLoad: function(e, t, o, i) {
   o = t ? n.strip(o) : o, f.isBuild && (p[e] = o), i(o);
  },
  load: function(e, t, o, i) {
   if (i.isBuild && !i.inlineText) return o(), void 0;
   f.isBuild = i.isBuild;
   var r = n.parseName(e), a = r.moduleName + (r.ext ? "." + r.ext : ""), s = t.toUrl(a), p = f.useXhr || n.useXhr;
   !l || p(s, c, d, u) ? n.get(s, function(t) {
    n.finishLoad(e, r.strip, t, o);
   }, function(e) {
    o.error && o.error(e);
   }) : t([ a ], function(e) {
    n.finishLoad(r.moduleName + "." + r.ext, r.strip, e, o);
   });
  },
  write: function(e, t, o) {
   if (p.hasOwnProperty(t)) {
    var i = n.jsEscape(p[t]);
    o.asModule(e + "!" + t, "define(function () { return '" + i + "';});\n");
   }
  },
  writeFile: function(e, t, o, i, r) {
   var a = n.parseName(t), s = a.ext ? "." + a.ext : "", l = a.moduleName + s, c = o.toUrl(a.moduleName + s) + ".js";
   n.load(l, o, function() {
    var t = function(e) {
     return i(c, e);
    };
    t.asModule = function(e, n) {
     return i.asModule(e, c, n);
    }, n.write(e, l, t, r);
   }, r);
  }
 }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node ? (t = require.nodeRequire("fs"), 
 n.get = function(e, n) {
  var o = t.readFileSync(e, "utf8");
  0 === o.indexOf("﻿") && (o = o.substring(1)), n(o);
 }) : "xhr" === f.env || !f.env && n.createXhr() ? n.get = function(e, t, o, i) {
  var r, a = n.createXhr();
  if (a.open("GET", e, !0), i) for (r in i) i.hasOwnProperty(r) && a.setRequestHeader(r.toLowerCase(), i[r]);
  f.onXhr && f.onXhr(a, e), a.onreadystatechange = function() {
   var n, i;
   4 === a.readyState && (n = a.status, n > 399 && 600 > n ? (i = new Error(e + " HTTP status: " + n), 
   i.xhr = a, o(i)) : t(a.responseText), f.onXhrComplete && f.onXhrComplete(a, e));
  }, a.send(null);
 } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? n.get = function(e, n) {
  var t, o, i = "utf-8", r = new java.io.File(e), a = java.lang.System.getProperty("line.separator"), s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r), i)), l = "";
  try {
   for (t = new java.lang.StringBuffer(), o = s.readLine(), o && o.length() && 65279 === o.charAt(0) && (o = o.substring(1)), 
   t.append(o); null !== (o = s.readLine()); ) t.append(a), t.append(o);
   l = String(t.toString());
  } finally {
   s.close();
  }
  n(l);
 } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (o = Components.classes, 
 i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), 
 n.get = function(e, n) {
  var t, r, a = {}, s = new FileUtils.File(e);
  try {
   t = o["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), 
   t.init(s, 1, 0, !1), r = o["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), 
   r.init(t, "utf-8", t.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), 
   r.readString(t.available(), a), r.close(), t.close(), n(a.value);
  } catch (l) {
   throw new Error((s && s.path || "") + ": " + l);
  }
 }), n;
}), define("text!html/settingsExtensionsAccordion.html", [], function() {
 return '<div class="accordion-group">\n	<div class="accordion-heading">\n	<div class="checkbox pull-right">\n		<label> <input\n			id="input-enable-extension-<%= extensionId %>" type="checkbox"<%\n			if(!isOptional) print(\'disabled\') %>> enabled\n		</label></div><a data-toggle="collapse"\n			data-parent="#accordion-extensions" class="accordion-toggle"\n			href="#collapse-<%= extensionId %>"> <%= extensionName %> </a>\n	</div>\n	<div id="collapse-<%= extensionId %>" class="accordion-body collapse">\n		<div class="accordion-inner clearfix"><%= settingsBlock %></div>\n	</div>\n</div>\n';
}), define("text!html/partialRenderingSettingsBlock.html", [], function() {
 return '<p>Renders modified sections only.</p>\n<blockquote class="muted">\n	<b>NOTE:</b> Document sections are based on title elements (h1, h2...). Therefore if\n	your document does not contain any title, performance will not be increased.\n</blockquote>';
}), define("extensions/partialRendering", [ "underscore", "crel", "classes/Extension", "text!html/partialRenderingSettingsBlock.html" ], function(e, n, t, o) {
 function i(n, t) {
  if (p = [], u = [], f = void 0, h === !0 || d != t) return h = !1, d = t, u = c, 
  c = n, p = n, void 0;
  var o = c.length;
  e.some(c, function(e, t) {
   return t >= n.length || e.text != n[t].text ? (o = t, !0) : void 0;
  });
  var i = -c.length;
  e.some(c.slice().reverse(), function(e, t) {
   return t >= n.length || e.text != n[n.length - t - 1].text ? (i = -t, !0) : void 0;
  });
  var r = c.slice(0, o);
  p = n.slice(o, n.length + i);
  var a = c.slice(c.length + i, c.length);
  f = e.first(a), u = c.slice(o, c.length + i), c = r.concat(p).concat(a);
 }
 function r() {
  e.each(u, function(e) {
   var n = document.getElementById("wmd-preview-section-" + e.id);
   v.removeChild(n);
  });
  var t = document.getElementById("wmd-preview"), o = Array.prototype.slice.call(t.childNodes);
  t.innerHTML = "";
  var i = document.createDocumentFragment();
  e.each(p, function(t) {
   for (var r = n("div", {
    id: "wmd-preview-section-" + t.id,
    "class": "wmd-preview-section preview-content"
   }), a = !0; 0 !== o.length; ) {
    var s = o[0];
    if (a === !1 && /(^| )wmd-title($| )/.test(s.className)) break;
    a = !1, "DIV" == s.tagName && "footnotes" == s.className ? e.each(s.querySelectorAll("ol > li"), function(e) {
     var n = e.id.substring(3);
     y[n] = e;
    }) : r.appendChild(s), o.shift();
   }
   i.appendChild(r);
  });
  var r = b;
  void 0 !== f && (r = document.getElementById("wmd-preview-section-" + f.id)), v.insertBefore(i, r), 
  b.innerHTML = "";
  var a = [];
  if (m === !0) {
   var s = n("ol");
   e.each(v.querySelectorAll("a.footnote"), function(e, n) {
    e.textContent = n + 1;
    var t = e.id.substring(6);
    a.push(t), s.appendChild(y[t].cloneNode(!0));
   }), a.length > 0 && b.appendChild(n("div", {
    "class": "footnotes"
   }, n("hr"), s)), y = e.pick(y, a);
  }
 }
 var a = new t("partialRendering", "Partial Rendering", !0);
 a.settingsBlock = o;
 var s = void 0, l = 0, c = [], d = void 0, u = [], p = [], f = void 0, h = !1, g = !1, m = !1;
 a.onSectionsCreated = function(n) {
  var t = [], o = "";
  m = !1, e.each(n, function(e) {
   e += "\n\n", g && (e = e.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n) {
    return n ? (m = !0, o += e, "") : e;
   })), e = e.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, n) {
    return n ? (o += e, "") : e;
   }), /\S/.test(e) && t.push({
    id: ++l,
    text: e
   });
  }), i(t, o);
 };
 var b = void 0, v = void 0, y = {};
 return a.onEditorConfigure = function(n) {
  s = n.getConverter(), s.hooks.chain("preConversion", function() {
   var n = e.map(p, function(e) {
    return e.text;
   });
   return n.push(d + "\n\n"), n.join("");
  }), n.hooks.chain("onPreviewRefresh", function() {
   r();
  });
 }, a.onReady = function() {
  b = n("div", {
   id: "wmd-preview-section-footnotes",
   "class": "preview-content"
  }), v = document.getElementById("preview-contents"), v.appendChild(b);
 }, a.onFileSelected = function() {
  h = !0;
 }, a.onFileOpen = function() {
  s.extraExtensions && (g = e.some(s.extraExtensions, function(e) {
   return "footnotes" == e;
  }));
 }, a;
}), define("classes/FileDescriptor", [ "utils" ], function(e) {
 function n(e, n, t, o) {
  this.fileIndex = e, this._title = n || localStorage[e + ".title"], this._editorScrollTop = parseInt(localStorage[e + ".editorScrollTop"]) || 0, 
  this._editorStart = parseInt(localStorage[e + ".editorStart"]) || 0, this._editorEnd = parseInt(localStorage[e + ".editorEnd"]) || 0, 
  this._previewScrollTop = parseInt(localStorage[e + ".previewScrollTop"]) || 0, this._selectTime = parseInt(localStorage[e + ".selectTime"]) || 0, 
  this.syncLocations = t || {}, this.publishLocations = o || {}, Object.defineProperty(this, "title", {
   get: function() {
    return this._title;
   },
   set: function(e) {
    this._title = e, localStorage[this.fileIndex + ".title"] = e;
   }
  }), Object.defineProperty(this, "content", {
   get: function() {
    return localStorage[this.fileIndex + ".content"];
   },
   set: function(e) {
    localStorage[this.fileIndex + ".content"] = e;
   }
  }), Object.defineProperty(this, "editorScrollTop", {
   get: function() {
    return this._editorScrollTop;
   },
   set: function(e) {
    this._editorScrollTop = e, localStorage[this.fileIndex + ".editorScrollTop"] = e;
   }
  }), Object.defineProperty(this, "editorStart", {
   get: function() {
    return this._editorStart;
   },
   set: function(e) {
    this._editorStart = e, localStorage[this.fileIndex + ".editorStart"] = e;
   }
  }), Object.defineProperty(this, "editorEnd", {
   get: function() {
    return this._editorEnd;
   },
   set: function(e) {
    this._editorEnd = e, localStorage[this.fileIndex + ".editorEnd"] = e;
   }
  }), Object.defineProperty(this, "previewScrollTop", {
   get: function() {
    return this._previewScrollTop;
   },
   set: function(e) {
    this._previewScrollTop = e, localStorage[this.fileIndex + ".previewScrollTop"] = e;
   }
  }), Object.defineProperty(this, "selectTime", {
   get: function() {
    return this._selectTime;
   },
   set: function(e) {
    this._selectTime = e, localStorage[this.fileIndex + ".selectTime"] = e;
   }
  });
 }
 return n.prototype.addSyncLocation = function(n) {
  e.storeAttributes(n), e.appendIndexToArray(this.fileIndex + ".sync", n.syncIndex), 
  this.syncLocations[n.syncIndex] = n;
 }, n.prototype.removeSyncLocation = function(n) {
  e.removeIndexFromArray(this.fileIndex + ".sync", n.syncIndex), delete this.syncLocations[n.syncIndex], 
  localStorage.removeItem(n.syncIndex);
 }, n.prototype.addPublishLocation = function(n) {
  e.storeAttributes(n), e.appendIndexToArray(this.fileIndex + ".publish", n.publishIndex), 
  this.publishLocations[n.publishIndex] = n;
 }, n.prototype.removePublishLocation = function(n) {
  e.removeIndexFromArray(this.fileIndex + ".publish", n.publishIndex), delete this.publishLocations[n.publishIndex], 
  localStorage.removeItem(n.publishIndex);
 }, n;
}), define("storage", [ "underscore", "utils" ], function(e, n) {
 var t = n.retrieveIndexArray("file.list"), o = localStorage.version;
 if (void 0 === o && (localStorage.removeItem("sync.queue"), localStorage.removeItem("sync.current"), 
 localStorage.removeItem("file.counter"), e.each(t, function(t) {
  localStorage[t + ".publish"] = ";";
  var o = n.retrieveIndexArray(t + ".sync");
  e.each(o, function(e) {
   localStorage[e + ".contentCRC"] = "0", void 0 !== localStorage[e + ".etag"] && (localStorage[e + ".titleCRC"] = "0");
  });
 }), o = "v1"), "v1" == o) {
  var i = localStorage["sync.gdrive.lastChangeId"];
  i && (localStorage["gdrive.lastChangeId"] = i, localStorage.removeItem("sync.gdrive.lastChangeId"));
  var r = localStorage["sync.dropbox.lastChangeId"];
  r && (localStorage["dropbox.lastChangeId"] = r, localStorage.removeItem("sync.dropbox.lastChangeId"));
  var a = "gdrive", s = "dropbox", l = "sync." + a + ".", c = "sync." + s + ".";
  e.each(t, function(t) {
   var o = n.retrieveIndexArray(t + ".sync");
   e.each(o, function(e) {
    var n = {};
    0 === e.indexOf(l) ? (n.provider = a, n.id = e.substring(l.length), n.etag = localStorage[e + ".etag"], 
    n.contentCRC = localStorage[e + ".contentCRC"], n.titleCRC = localStorage[e + ".titleCRC"]) : 0 === e.indexOf(c) && (n.provider = s, 
    n.path = decodeURIComponent(e.substring(c.length)), n.version = localStorage[e + ".version"], 
    n.contentCRC = localStorage[e + ".contentCRC"]), localStorage[e] = JSON.stringify(n), 
    localStorage.removeItem(e + ".etag"), localStorage.removeItem(e + ".version"), localStorage.removeItem(e + ".contentCRC"), 
    localStorage.removeItem(e + ".titleCRC");
   });
  }), o = "v2";
 }
 if ("v2" == o && (e.each(t, function(t) {
  e.has(localStorage, t + ".sync") || (localStorage.removeItem(t + ".title"), localStorage.removeItem(t + ".publish"), 
  localStorage.removeItem(t + ".content"), n.removeIndexFromArray("file.list", t));
 }), o = "v3"), "v3" == o) {
  var d = localStorage["file.current"];
  void 0 !== d && -1 === localStorage["file.list"].indexOf(";" + d + ";") && localStorage.removeItem("file.current"), 
  o = "v4";
 }
 if ("v4" == o && (localStorage.removeItem("githubToken"), o = "v5"), "v5" == o && (e.each(t, function(t) {
  var o = n.retrieveIndexArray(t + ".publish");
  e.each(o, function(e) {
   var n = JSON.parse(localStorage[e]);
   "gdrive" == n.provider && (n.id = n.fileId, n.fileId = void 0, localStorage[e] = JSON.stringify(n));
  });
 }), o = "v6"), "v6" == o) {
  var d = localStorage["file.current"];
  void 0 !== d && (localStorage[d + ".selectTime"] = new Date().getTime(), localStorage.removeItem("file.current")), 
  o = "v7";
 }
 localStorage.version = o;
}), define("fileSystem", [ "underscore", "utils", "classes/FileDescriptor", "storage" ], function(e, n, t) {
 var o = {};
 return e.each(n.retrieveIndexArray("file.list"), function(e) {
  o[e] = new t(e);
 }), o;
}), define("text!html/userCustomSettingsBlock.html", [], function() {
 return '<p>Allows users to implement their own extension.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="textarea-usercustom-code">JavaScript code\n			<a href="#" class="tooltip-usercustom-extension">(?)</a>\n		</label>\n		<div class="col-lg-7">\n			<textarea id="textarea-usercustom-code" class="form-control"></textarea>\n		</div>\n	</div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More info</a></span>';
}), define("extensions/userCustom", [ "jquery", "underscore", "utils", "classes/Extension", "fileSystem", "settings", "text!html/userCustomSettingsBlock.html" ], function($, _, utils, Extension, fileSystem, settings, userCustomSettingsBlockHTML) {
 var userCustom = new Extension("userCustom", "UserCustom extension", !0);
 userCustom.settingsBlock = userCustomSettingsBlockHTML, userCustom.defaultConfig = {
  code: ""
 };
 var fileMgr = void 0;
 userCustom.onFileMgrCreated = function(e) {
  fileMgr = e;
 };
 var synchronizer = void 0;
 userCustom.onSynchronizerCreated = function(e) {
  synchronizer = e;
 };
 var publisher = void 0;
 userCustom.onPublisherCreated = function(e) {
  publisher = e;
 };
 var eventMgr = void 0;
 return userCustom.onEventMgrCreated = function(e) {
  eventMgr = e;
 }, userCustom.onLoadSettings = function() {
  utils.setInputValue("#textarea-usercustom-code", userCustom.config.code);
 }, userCustom.onSaveSettings = function(newConfig, event) {
  newConfig.code = utils.getInputValue("#textarea-usercustom-code");
  try {
   eval(newConfig.code);
  } catch (e) {
   eventMgr.onError(e), utils.getInputTextValue("#textarea-usercustom-code", event, /^$/);
  }
 }, userCustom.onInit = function() {
  try {
   eval(userCustom.config.code);
  } catch (e) {
   console.error(e);
  }
 }, userCustom;
}), define("extensions/googleAnalytics", [ "jquery", "underscore", "utils", "classes/Extension", "settings", "config" ], function(e, n, t, o, i) {
 function r() {
  t.currentTime - d > 18e4 && (_gaq.push([ "_trackPageview" ]), d = t.currentTime);
 }
 var a = new o("googleAnalytics", "Google Analytics", !0);
 a.settingsBlock = "<p>Sends anonymous statistics about usage and errors to help improve StackEdit.</p>";
 var s = !1, l = !1;
 window._gaq = [];
 var c = function() {
  if (s === !1 && l === !1) {
   var n = "/ga.js";
   location.search.match(/(\?|&)console/) && (n = "/u/ga_debug.js"), e.ajax({
    url: "http://www.google-analytics.com" + n,
    dataType: "script"
   }).done(function() {
    s = !0;
   });
  }
 }, d = 0;
 a.onPeriodicRun = function() {
  r();
 }, a.onReady = function() {
  _gaq.push([ "_setAccount", GOOGLE_ANALYTICS_ACCOUNT_ID ]), r(), _gaq.push([ "_trackEvent", "Settings", "layoutOrientation", "" + i.layoutOrientation ]), 
  _gaq.push([ "_trackEvent", "Settings", "lazyRendering", "" + i.lazyRendering ]), 
  _gaq.push([ "_trackEvent", "Settings", "editorFontFamily", "" + i.editorFontFamily ]), 
  _gaq.push([ "_trackEvent", "Settings", "editorFontSize", "" + i.editorFontSize ]), 
  _gaq.push([ "_trackEvent", "Settings", "defaultContent backlink", "" + (-1 !== i.defaultContent.indexOf(MAIN_URL)) ]), 
  _gaq.push([ "_trackEvent", "Settings", "commitMsg backlink", "" + (-1 !== i.commitMsg.indexOf(MAIN_URL)) ]), 
  _gaq.push([ "_trackEvent", "Settings", "sshProxy unchanged", "" + (i.sshProxy == SSH_PROXY_URL) ]), 
  n.each(i.extensionSettings, function(e, n) {
   _gaq.push([ "_trackEvent", "Extensions", n + " enabled", "" + (e.enabled === !0) ]);
  }), window.onerror = function(e, n, o) {
   _gaq.push([ "_trackEvent", "Error", e, n + ":" + o + t.formatEventList() ]);
  }, c();
 }, a.onOfflineChanged = function(e) {
  l = e, c();
 };
 var u = 0;
 return a.onSyncRunning = function(e) {
  e === !0 && (u = new Date().getTime());
 }, a.onPublishRunning = function(e) {
  e === !0 && (u = new Date().getTime());
 }, a.onSyncSuccess = function() {
  var e = new Date().getTime();
  _gaq.push([ "_trackTiming", "Sync", "SyncTime", e - u ]);
 }, a.onSyncImportSuccess = function(e, n) {
  _gaq.push([ "_trackEvent", "Sync", "SyncImport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncImport provider", n.providerId ]);
 }, a.onSyncExportSuccess = function(e, n) {
  _gaq.push([ "_trackEvent", "Sync", "SyncExport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncExport provider", n.provider.providerId ]);
 }, a.onPublishSuccess = function(e) {
  var t = new Date().getTime();
  _gaq.push([ "_trackTiming", "Publish", "PublishSuccess", t - u ]), n.each(e.publishLocations, function(e) {
   _gaq.push([ "_trackEvent", "Publish", "PublishSuccess provider", e.provider.providerId ]);
  });
 }, a.onNewPublishSuccess = function(e, n) {
  _gaq.push([ "_trackEvent", "Publish", "NewPublish provider", n.provider.providerId ]);
 }, a.onError = function(e) {
  !n.isString(e) && e.message && _gaq.push([ "_trackEvent", "Error", "message", e.message + t.formatEventList() ]);
 }, a;
}), define("text!html/dialogAbout.html", [], function() {
 return '<dl>\n	<dt>About:</dt>\n	<dd>\n		<a target="_blank" href="https://github.com/benweet/stackedit/">GitHub\n			project</a> / <a target="_blank"\n			href="https://github.com/benweet/stackedit/issues">issue tracker</a><br />\n		<a target="_blank"\n			href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome\n			app</a> (thanks for your review!)<br /> <a target="_blank"\n			href="https://twitter.com/stackedit/">Follow on Twitter</a><br /> <a\n			target="_blank" href="https://www.facebook.com/stackedit/">Follow\n			on Facebook</a><br /> <a target="_blank"\n			href="https://plus.google.com/110816046787593496375" rel="publisher">Follow\n			on Google+</a><br />\n	</dd>\n</dl>\n<dl>\n	<dt>Developers:</dt>\n	<dd>\n		<a target="_blank" href="http://www.benoitschweblin.com">Benoit\n			Schweblin</a><br /> Pete Eigel (contributor)\n	</dd>\n</dl>\n<dl>\n	<dt>Credit:</dt>\n	<dd>\n		<% _.each(libraries, function(url, name) { %> <a target="_blank"\n			href="<%= url %>"><%= name %></a><br /> <% }); %>\n	</dd>\n</dl>\n<dl>\n	<dt>Related projects:</dt>\n	<dd>\n		<% _.each(projects, function(url, name) { %> <a target="_blank"\n			href="<%= url %>"><%= name %></a><br /> <% }); %>\n	</dd>\n</dl>\n<p>Copyright 2013 <a target="_blank"\n	href="http://www.benoitschweblin.com">Benoit Schweblin</a><br />\n	Licensed under an <a target="_blank"\n	href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a></p>\n';
}), define("extensions/dialogAbout", [ "jquery", "underscore", "classes/Extension", "text!html/dialogAbout.html" ], function(e, n, t, o) {
 var i = new t("dialogAbout", 'Dialog "About"'), r = {
  Bootstrap: "http://twitter.github.io/bootstrap/",
  crel: "https://github.com/KoryNunn/crel",
  "CSS Browser Selector": "https://github.com/rafaelp/css_browser_selector/",
  "Dropbox-js": "https://github.com/dropbox/dropbox-js",
  "FileSaver.js": "https://github.com/eligrey/FileSaver.js/",
  Gatekeeper: "https://github.com/prose/gatekeeper",
  "Github.js": "https://github.com/michael/github",
  Glyphicons: "http://glyphicons.com/",
  "Highlight.js": "http://softwaremaniacs.org/soft/highlight/en/",
  jGrowl: "https://github.com/stanlemon/jGrowl/",
  jQuery: "http://jquery.com/",
  "jQuery Mouse Wheel Plugin": "https://github.com/brandonaaron/jquery-mousewheel",
  MathJax: "http://www.mathjax.org/",
  Mousetrap: "http://craig.is/killing/mice",
  PageDown: "https://code.google.com/p/pagedown/",
  "Pagedown-extra": "https://github.com/jmcmanus/pagedown-extra/",
  Prettify: "https://code.google.com/p/google-code-prettify/",
  RequireJS: "http://requirejs.org/",
  "stacktrace.js": "http://stacktracejs.com/",
  "to-markdown": "https://github.com/domchristie/to-markdown",
  "UI Layout": "http://layout.jquery-dev.net/",
  "Underscore.js": "http://underscorejs.org/",
  waitForImages: "https://github.com/alexanderdickson/waitForImages"
 }, a = {
  "StackEdit Download Proxy": "https://github.com/benweet/stackedit-download-proxy",
  "StackEdit Picasa Proxy": "https://github.com/benweet/stackedit-picasa-proxy",
  "StackEdit SSH Proxy": "https://github.com/benweet/stackedit-ssh-proxy",
  "StackEdit Tumblr Proxy": "https://github.com/benweet/stackedit-tumblr-proxy",
  "StackEdit WordPress Proxy": "https://github.com/benweet/stackedit-wordpress-proxy"
 };
 return i.onReady = function() {
  e("#modal-about .modal-body").html(n.template(o, {
   libraries: r,
   projects: a
  }));
 }, i;
}), define("text!html/dialogManagePublicationLocation.html", [], function() {
 return '<div class="input-prepend input-append">\n	<span class="add-on" title="<%= provider.providerName %>"> <i\n		class="icon-<%= provider.providerId %>"></i>\n	</span> <input class="span5" type="text" value="<%= publishDesc %>" disabled />\n</div>\n';
}), define("extensions/dialogManagePublication", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManagePublicationLocation.html" ], function(e, n, t, o) {
 var i = new t("dialogManagePublication", 'Dialog "Manage publication"'), r = void 0;
 i.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0, s = '<a class="btn btn-default" title="Remove this location"><i class="icon-trash"></i></a>', l = function(t) {
  if (void 0 === t || t === a) {
   var i = n.values(a.publishLocations);
   e(".msg-no-publish, .msg-publish-list").addClass("hide");
   var l = e("#manage-publish-list").empty();
   i.length > 0 ? e(".msg-publish-list").removeClass("hide") : e(".msg-no-publish").removeClass("hide"), 
   n.each(i, function(t) {
    formattedAttributes = n.omit(t, "provider", "publishIndex", "sharingLink"), formattedAttributes.password && (formattedAttributes.password = "********");
    var i = JSON.stringify(formattedAttributes).replace(/{|}|"/g, "").replace(/,/g, ", "), c = e(n.template(o, {
     provider: t.provider,
     publishDesc: i
    }));
    c.append(e(s).click(function() {
     a.removePublishLocation(t), r.onPublishRemoved(a, t);
    })), l.append(c);
   });
  }
 };
 return i.onFileSelected = function(e) {
  a = e, l(e);
 }, i.onNewPublishSuccess = l, i.onPublishRemoved = l, i;
}), define("text!html/dialogManageSynchronizationLocation.html", [], function() {
 return '<div class="input-group">\n	<span class="input-group-addon" title="<%= provider.providerName %><%= isRealtime ? \' (real time)\' : \'\' %>"> <i\n		class="icon-<%= provider.providerId %><%= isRealtime ? \' realtime\' : \'\' %>"></i>\n	</span> <input class="col-lg-6 form-control" type="text" value="<%= syncDesc %>" disabled />\n</div>\n';
}), define("extensions/dialogManageSynchronization", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManageSynchronizationLocation.html" ], function(e, n, t, o) {
 var i = new t("dialogManageSynchronization", 'Dialog "Manage synchronization"'), r = void 0;
 i.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0;
 i.onSynchronizerCreated = function(e) {
  a = e;
 };
 var s = void 0, l = '<a class="btn btn-info" title="Remove this location"><i class="icon-trash"></i></a>', c = function(t) {
  if (void 0 === t || t === s) {
   var i = n.values(s.syncLocations);
   e(".msg-no-sync, .msg-sync-list").addClass("hide");
   var c = e("#manage-sync-list").empty();
   i.length > 0 ? e(".msg-sync-list").removeClass("hide") : e(".msg-no-sync").removeClass("hide"), 
   n.each(i, function(t) {
    var i = t.id || t.path, d = e(n.template(o, {
     provider: t.provider,
     syncDesc: i,
     isRealtime: t.isRealtime
    }));
    d.append(e('<div class="input-group-btn">').append(e(l).click(function() {
     a.tryStopRealtimeSync(), s.removeSyncLocation(t), r.onSyncRemoved(s, t);
    }))), c.append(d);
   });
  }
 };
 return i.onFileSelected = function(e) {
  s = e, c(e);
 }, i.onSyncExportSuccess = c, i.onSyncRemoved = c, i.onReady = function() {
  e(".sync-manual").each(function() {
   var n = e(this);
   n.find("input").keyup(function(e) {
    13 == e.which && (n.find("a").click(), e.stopPropagation());
   });
  });
 }, i;
}), function() {
 var e = this, n = {}, t = !1;
 "undefined" != typeof module && module.exports ? (module.exports = n, e.toMarkdown = n, 
 t = !0) : e.toMarkdown = n, n.converter = function(e) {
  e && e.elements && $.isArray(e.elements) && (c = c.concat(e.elements)), this.makeMd = function(e, n) {
   var i;
   if (t) {
    var r = require("jsdom");
    r.env({
     html: e,
     scripts: [ "http://code.jquery.com/jquery-1.6.4.min.js" ],
     done: function(t, i) {
      "function" == typeof n && n(o(e, i.$));
     }
    });
   } else i = o(e, $);
   return i;
  };
 };
 var o = function(e, n) {
  e = e.replace(/(\d+)\. /g, "$1\\. ");
  var t = n("<div/>"), o = t.html(e);
  o.find("*:not(pre, code)").contents().filter(function() {
   return 3 === this.nodeType && /^\s+$/.test(this.nodeValue);
  }).remove();
  for (var i = [], r = 0, s = c.length; s > r; r++) i.push(c[r].selector);
  for (i = i.join(","); o.find(i).length; ) for (var r = 0, s = c.length; s > r; r++) $matches = o.find(c[r].selector + ':not(:has("' + i + '"))'), 
  $matches.each(function(e, t) {
   var o = n(t);
   o.before(c[r].replacement(o.html(), o)).remove();
  });
  return a(o.html());
 }, i = function(e) {
  return e.replace(/^[\n\r\f]+|[\n\r\f]+$/g, "");
 }, r = function(e) {
  return String(e).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
 }, a = function(e) {
  return e = e.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ""), e = e.replace(/\n\s+\n/g, "\n\n"), 
  e = e.replace(/\n{3,}/g, "\n\n"), e = r(e);
 }, s = function(e) {
  return e = i(e), e ? "**" + e + "**" : "";
 }, l = function(e) {
  return e = i(e), e ? "_" + e + "_" : "";
 }, c = [ {
  selector: "p",
  replacement: function(e) {
   return e = $.trim(e), e ? "\n\n" + e + "\n\n" : "";
  }
 }, {
  selector: "br",
  replacement: function() {
   return "\n";
  }
 }, {
  selector: "h1,h2,h3,h4,h5,h6",
  replacement: function(e, n) {
   e = $.trim(e);
   for (var t = n.prop("nodeName").charAt(1), o = "", i = 0; t > i; i++) o += "#";
   return e ? "\n\n" + o + " " + e + "\n\n" : "";
  }
 }, {
  selector: "hr",
  replacement: function() {
   return "\n\n* * *\n\n";
  }
 }, {
  selector: "a[href]",
  replacement: function(e, n) {
   if (e) {
    e = i(e);
    var t = n.attr("href"), o = n.attr("title") || "";
    return "[" + e + "]" + "(" + t + (o ? ' "' + o + '"' : "") + ")";
   }
   return !1;
  }
 }, {
  selector: "b",
  replacement: s
 }, {
  selector: "strong",
  replacement: s
 }, {
  selector: "i",
  replacement: l
 }, {
  selector: "em",
  replacement: l
 }, {
  selector: "code",
  replacement: function(e) {
   return e = i(e), e ? "`" + e + "`" : "";
  }
 }, {
  selector: "img",
  replacement: function(e, n) {
   var t = n.attr("alt") || "", o = n.attr("src") || "", i = n.attr("title") || "";
   return "![" + t + "]" + "(" + o + (i ? ' "' + i + '"' : "") + ")";
  }
 }, {
  selector: "pre",
  replacement: function(e) {
   return /^\s*\`/.test(e) ? (e = e.replace(/\`/g, ""), "    " + e.replace(/\n/g, "\n    ")) : "";
  }
 }, {
  selector: "li",
  replacement: function(e, n) {
   e = e.replace(/^\s+|\s+$/, "").replace(/\n/gm, "\n    ");
   var t = "*   ", o = "", i = n.parent(), r = i.contents().filter(function() {
    return 1 === this.nodeType && "LI" === this.nodeName || 3 === this.nodeType;
   }), a = r.index(n) + 1;
   return t = i.is("ol") ? a + ".  " : "*   ", a == r.length && (n.parents("li").length || (o = "\n"), 
   e = e.replace(/\s+$/, ""), n.unwrap()), t + e + o + "\n";
  }
 }, {
  selector: "blockquote",
  replacement: function(e) {
   return e = e = $.trim(e).replace(/\n{3,}/g, "\n\n"), e = e.replace(/\n/g, "\n&gt; "), 
   "&gt; " + e;
  }
 } ];
}(), define("toMarkdown", [ "jquery" ], function(e) {
 return function() {
  var n;
  return n || e.toMarkdown;
 };
}(this)), define("extensions/dialogOpenHarddrive", [ "jquery", "underscore", "utils", "classes/Extension", "toMarkdown", "config" ], function(e, n, t, o, i) {
 function r(t) {
  t.stopPropagation(), t.preventDefault();
  var o = (t.dataTransfer || t.target).files;
  e("#modal-import-harddrive-markdown, #modal-import-harddrive-html").modal("hide"), 
  n.each(o, function(n) {
   if (!e(t.target).is("#wmd-input") || !n.name.match(/.(jpe?g|png|gif)$/)) {
    var o = new FileReader();
    o.onload = function(e) {
     return function(n) {
      var t = n.target.result;
      if (t.match(/\uFFFD/)) return u.onError(e.name + " is a binary file."), void 0;
      if (t = p ? p(t) : t, void 0 === t) return u.onError(e.name + " is not a valid HTML file."), 
      void 0;
      var o = e.name, i = o.lastIndexOf(".");
      o = -1 !== i ? o.substring(0, i) : o;
      var r = d.createFile(o, t);
      d.selectFile(r);
     };
    }(n);
    var i = n.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
    o.readAsText(i);
   }
  });
 }
 function a(e) {
  p = void 0, r(e);
 }
 function s(e) {
  p = h, r(e);
 }
 function l(e) {
  e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy";
 }
 var c = new o("dialogOpenHarddrive", 'Dialog "Open from"'), d = void 0;
 c.onFileMgrCreated = function(e) {
  d = e;
 };
 var u = void 0;
 c.onEventMgrCreated = function(e) {
  u = e;
 };
 var p = void 0, f = void 0, h = function(e) {
  return f.makeMd(e);
 };
 return c.onReady = function() {
  f = new i.converter(), e("#input-file-import-harddrive-markdown").change(a), e("#dropzone-import-harddrive-markdown, #wmd-input").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", a, !1);
  }), e("#input-file-import-harddrive-html").change(s), e("#dropzone-import-harddrive-html").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", s, !1);
  }), e(".action-convert-html").click(function(e) {
   var n = t.getInputTextValue("#input-convert-html", e);
   if (void 0 !== n) {
    if (n = f.makeMd(n), void 0 === n) return u.onError("Invalid HTML code."), void 0;
    var o = d.createFile(void 0, n);
    d.selectFile(o);
   }
  });
 }, c;
}), function() {
 function e(e, n, t) {
  return e.addEventListener ? (e.addEventListener(n, t, !1), void 0) : (e.attachEvent("on" + n, t), 
  void 0);
 }
 function n(e) {
  if ("keypress" == e.type) {
   var n = String.fromCharCode(e.which);
   return e.shiftKey || (n = n.toLowerCase()), n;
  }
  return x[e.which] ? x[e.which] : w[e.which] ? w[e.which] : String.fromCharCode(e.which).toLowerCase();
 }
 function t(e, n) {
  return e.sort().join(",") === n.sort().join(",");
 }
 function o(e) {
  e = e || {};
  var n, t = !1;
  for (n in E) e[n] ? t = !0 : E[n] = 0;
  t || (I = !1);
 }
 function i(e, n, o, i, r, a) {
  var s, l, d = [], u = o.type;
  if (!S[e]) return [];
  for ("keyup" == u && c(e) && (n = [ e ]), s = 0; s < S[e].length; ++s) if (l = S[e][s], 
  (i || !l.seq || E[l.seq] == l.level) && u == l.action && ("keypress" == u && !o.metaKey && !o.ctrlKey || t(n, l.modifiers))) {
   var p = !i && l.combo == r, f = i && l.seq == i && l.level == a;
   (p || f) && S[e].splice(s, 1), d.push(l);
  }
  return d;
 }
 function r(e) {
  var n = [];
  return e.shiftKey && n.push("shift"), e.altKey && n.push("alt"), e.ctrlKey && n.push("ctrl"), 
  e.metaKey && n.push("meta"), n;
 }
 function a(e, n, t) {
  z.stopCallback(n, n.target || n.srcElement, t) || e(n, t) === !1 && (n.preventDefault && n.preventDefault(), 
  n.stopPropagation && n.stopPropagation(), n.returnValue = !1, n.cancelBubble = !0);
 }
 function s(e, n, t) {
  var r, s = i(e, n, t), l = {}, d = 0, u = !1;
  for (r = 0; r < s.length; ++r) s[r].seq && (d = Math.max(d, s[r].level));
  for (r = 0; r < s.length; ++r) if (s[r].seq) {
   if (s[r].level != d) continue;
   u = !0, l[s[r].seq] = 1, a(s[r].callback, t, s[r].combo);
  } else u || a(s[r].callback, t, s[r].combo);
  t.type != I || c(e) || o(l);
 }
 function l(e) {
  "number" != typeof e.which && (e.which = e.keyCode);
  var t = n(e);
  if (t) return "keyup" == e.type && _ == t ? (_ = !1, void 0) : (z.handleKey(t, r(e), e), 
  void 0);
 }
 function c(e) {
  return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
 }
 function d() {
  clearTimeout(y), y = setTimeout(o, 1e3);
 }
 function u() {
  if (!v) {
   v = {};
   for (var e in x) e > 95 && 112 > e || x.hasOwnProperty(e) && (v[x[e]] = e);
  }
  return v;
 }
 function p(e, n, t) {
  return t || (t = u()[e] ? "keydown" : "keypress"), "keypress" == t && n.length && (t = "keydown"), 
  t;
 }
 function f(e, t, i, r) {
  function s(n) {
   return function() {
    I = n, ++E[e], d();
   };
  }
  function l(t) {
   a(i, t, e), "keyup" !== r && (_ = n(t)), setTimeout(o, 10);
  }
  E[e] = 0;
  for (var c = 0; c < t.length; ++c) {
   var u = c + 1 === t.length, p = u ? l : s(r || g(t[c + 1]).action);
   m(t[c], p, r, e, c);
  }
 }
 function h(e) {
  return "+" === e ? [ "+" ] : e.split("+");
 }
 function g(e, n) {
  var t, o, i, r = [];
  for (t = h(e), i = 0; i < t.length; ++i) o = t[i], C[o] && (o = C[o]), n && "keypress" != n && k[o] && (o = k[o], 
  r.push("shift")), c(o) && r.push(o);
  return n = p(o, r, n), {
   key: o,
   modifiers: r,
   action: n
  };
 }
 function m(e, n, t, o, r) {
  T[e + ":" + t] = n, e = e.replace(/\s+/g, " ");
  var a, s = e.split(" ");
  return s.length > 1 ? (f(e, s, n, t), void 0) : (a = g(e, t), S[a.key] = S[a.key] || [], 
  i(a.key, a.modifiers, {
   type: a.action
  }, o, e, r), S[a.key][o ? "unshift" : "push"]({
   callback: n,
   modifiers: a.modifiers,
   action: a.action,
   seq: o,
   level: r,
   combo: e
  }), void 0);
 }
 function b(e, n, t) {
  for (var o = 0; o < e.length; ++o) m(e[o], n, t);
 }
 for (var v, y, x = {
  8: "backspace",
  9: "tab",
  13: "enter",
  16: "shift",
  17: "ctrl",
  18: "alt",
  20: "capslock",
  27: "esc",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "ins",
  46: "del",
  91: "meta",
  93: "meta",
  224: "meta"
 }, w = {
  106: "*",
  107: "+",
  109: "-",
  110: ".",
  111: "/",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
 }, k = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
  "|": "\\"
 }, C = {
  option: "alt",
  command: "meta",
  "return": "enter",
  escape: "esc",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
 }, S = {}, T = {}, E = {}, _ = !1, I = !1, P = 1; 20 > P; ++P) x[111 + P] = "f" + P;
 for (P = 0; 9 >= P; ++P) x[P + 96] = P;
 e(document, "keypress", l), e(document, "keydown", l), e(document, "keyup", l);
 var z = {
  bind: function(e, n, t) {
   return e = e instanceof Array ? e : [ e ], b(e, n, t), this;
  },
  unbind: function(e, n) {
   return z.bind(e, function() {}, n);
  },
  trigger: function(e, n) {
   return T[e + ":" + n] && T[e + ":" + n]({}, e), this;
  },
  reset: function() {
   return S = {}, T = {}, this;
  },
  stopCallback: function(e, n) {
   return (" " + n.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == n.tagName || "SELECT" == n.tagName || "TEXTAREA" == n.tagName || n.contentEditable && "true" == n.contentEditable;
  },
  handleKey: s
 };
 window.Mousetrap = z, "function" == typeof define && define.amd && define("mousetrap", z);
}(), define("text!html/documentSelectorSettingsBlock.html", [], function() {
 return '<p>Builds the "Open document" dropdown menu.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="select-document-selector-orderby">Order\n			by</label>\n		<div class="col-lg-6">\n			<select id="select-document-selector-orderby" class="form-control">\n				<option value="title">Document title</option>\n				<option value="mru">Most recently used</option>\n			</select>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-previous">"Previous"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-previous"\n				class="form-control">\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-next">"Next"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-next"\n				class="form-control">\n		</div>\n	</div>\n</div>';
}), define("extensions/documentSelector", [ "jquery", "underscore", "utils", "classes/Extension", "mousetrap", "fileSystem", "text!html/documentSelectorSettingsBlock.html" ], function(e, n, t, o, i, r, a) {
 function s(t) {
  var o = e("#file-selector li:not(.stick)");
  if (o.show(), t) {
   var i = t.toLowerCase().split(/\s+/);
   o.each(function() {
    var t = e(this).text().toLowerCase();
    n.some(i, function(e) {
     return -1 === t.indexOf(e);
    }) && e(this).hide();
   });
  }
 }
 var l = new o("documentSelector", "Document Selector");
 l.settingsBlock = a, l.defaultConfig = {
  orderBy: "title",
  shortcutPrevious: "Ctrl+[",
  shortcutNext: "Ctrl+]"
 }, l.onLoadSettings = function() {
  t.setInputValue("#select-document-selector-orderby", l.config.orderBy), t.setInputValue("#input-document-selector-shortcut-previous", l.config.shortcutPrevious), 
  t.setInputValue("#input-document-selector-shortcut-next", l.config.shortcutNext);
 }, l.onSaveSettings = function(e, n) {
  e.orderBy = t.getInputValue("#select-document-selector-orderby"), e.shortcutPrevious = t.getInputTextValue("#input-document-selector-shortcut-previous", n), 
  e.shortcutNext = t.getInputTextValue("#input-document-selector-shortcut-next", n);
 };
 var c = void 0;
 l.onFileMgrCreated = function(e) {
  c = e;
 };
 var d = void 0, u = void 0, p = void 0, f = void 0, h = function() {
  function t(e) {
   var t = [], o = n.values(e.syncLocations), i = n.values(e.publishLocations), r = o.concat(i);
   return n.chain(r).sortBy(function(e) {
    return e.provider.providerId;
   }).each(function(e) {
    var n = "icon-" + e.provider.providerId;
    e.isRealtime === !0 && (n += " realtime"), t.push('<i class="' + n + '"></i>');
   }), t.push(" "), t.push(e.title), t.join("");
  }
  d = {}, e("#file-selector li:not(.stick)").empty(), n.chain(r).sortBy(p).each(function(n) {
   var o = e('<a href="#">').html(t(n)).click(function() {
    d[n.fileIndex].is(".disabled") ? e("#wmd-input").focus() : c.selectFile(n);
   }), i = e("<li>").append(o);
   d[n.fileIndex] = i, n === f && i.addClass("disabled"), e("#file-selector").append(i);
  }), u = n.values(d);
 };
 return l.onFileSelected = function(e) {
  f = e, h();
 }, l.onFileCreated = h, l.onFileDeleted = h, l.onTitleChanged = h, l.onSyncExportSuccess = h, 
 l.onSyncRemoved = h, l.onNewPublishSuccess = h, l.onPublishRemoved = h, l.onReady = function() {
  "title" == l.config.orderBy ? p = function(e) {
   return e.title.toLowerCase();
  } : "mru" == l.config.orderBy && (p = function(e) {
   return -e.selectTime;
  });
  var t = void 0;
  e(".action-open-file").click(function() {
   e("#file-selector").parent().is(".open") || (s(), void 0 === t && n.defer(function() {
    e("#file-search").val("").focus();
   }));
  }).prop("title", n.template("<%= title %>  <%= shortcutPrevious %>  <%= shortcutNext %>", {
   title: e(".action-open-file").prop("title"),
   shortcutPrevious: l.config.shortcutPrevious,
   shortcutNext: l.config.shortcutNext
  })), e("#file-search").keyup(function(n) {
   13 == n.which || 27 == n.which ? e(this).parent().click() : s(e(this).val());
  }).click(function(e) {
   e.stopPropagation();
  });
  var o = l.config.shortcutPrevious.toLowerCase();
  i.bind(o, function() {
   void 0 === t && (e("#file-selector").parent().is(".open") || e(".action-open-file").click(), 
   t = d[f.fileIndex]);
   var o = n.indexOf(u, t) - 1;
   return -2 === o && (o = -1), t = u[(o + u.length) % u.length], n.defer(function() {
    t.find("a").focus();
   }), !1;
  });
  var r = l.config.shortcutNext.toLowerCase();
  i.bind(l.config.shortcutNext.toLowerCase(), function() {
   void 0 === t && (e("#file-selector").parent().is(".open") || e(".action-open-file").click(), 
   t = d[f.fileIndex]);
   var o = n.indexOf(u, t) + 1;
   return t = u[o % u.length], n.defer(function() {
    t.find("a").focus();
   }), !1;
  });
  var a = o.indexOf("+"), c = -1 === a ? o : o.substring(0, a), h = r.indexOf("+"), g = -1 === h ? r : r.substring(0, h);
  i.bind([ c, g ], function() {
   void 0 !== t && (t.find("a").click(), t = void 0);
  }, "keyup");
 }, l;
}), define("extensions/documentTitle", [ "jquery", "underscore", "classes/Extension" ], function(e, n, t) {
 var o = new t("documentTitle", "Document Title"), i = void 0;
 o.onLayoutCreated = function(e) {
  i = e;
 };
 var r = void 0, a = function(t) {
  function o(e) {
   var t = [], o = n.values(e.syncLocations), i = n.values(e.publishLocations), r = o.concat(i);
   return n.chain(r).sortBy(function(e) {
    return e.provider.providerId;
   }).each(function(e) {
    var n = "icon-" + e.provider.providerId;
    e.isRealtime === !0 && (n += " realtime"), t.push('<i class="' + n + '"></i>');
   }), t.push(" "), t.push(e.title), t.join("");
  }
  if (t === r) {
   var a = r.title;
   document.title = "StackEdit - " + a, e("#file-title").html(o(r)), e(".file-title").text(a), 
   e("#file-title-input").val(a), void 0 !== i && n.defer(i.resizeAll);
  }
 };
 return o.onFileSelected = function(e) {
  r = e, a(e);
 }, o.onTitleChanged = a, o.onSyncExportSuccess = a, o.onSyncRemoved = a, o.onNewPublishSuccess = a, 
 o.onPublishRemoved = a, o;
}), define("extensions/workingIndicator", [ "jquery", "underscore", "classes/Extension" ], function(e, n, t) {
 var o = new t("workingIndicator", "Working Indicator");
 return o.onAsyncRunning = function(n) {
  n === !1 ? (e(".working-indicator").removeClass("show"), e("body").removeClass("working")) : (e(".working-indicator").addClass("show"), 
  e("body").addClass("working"));
 }, o;
}), function(e) {
 var n = function() {
  return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace;
 }();
 e.jGrowl = function(n, t) {
  0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(t && t.position ? t.position : e.jGrowl.defaults.position).appendTo("body"), 
  e("#jGrowl").jGrowl(n, t);
 }, e.fn.jGrowl = function(n, t) {
  if (e.isFunction(this.each)) {
   var o = arguments;
   return this.each(function() {
    void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl(), {
     notifications: [],
     element: null,
     interval: null
    })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[n]) ? e(this).data("jGrowl.instance")[n].apply(e(this).data("jGrowl.instance"), e.makeArray(o).slice(1)) : e(this).data("jGrowl.instance").create(n, t);
   });
  }
 }, e.extend(e.fn.jGrowl.prototype, {
  defaults: {
   pool: 0,
   header: "",
   group: "",
   sticky: !1,
   position: "top-right",
   glue: "after",
   theme: "default",
   themeState: "highlight",
   corners: "10px",
   check: 250,
   life: 3e3,
   closeDuration: "normal",
   openDuration: "normal",
   easing: "swing",
   closer: !0,
   closeTemplate: "&times;",
   closerTemplate: "<div>[ close all ]</div>",
   log: function() {},
   beforeOpen: function() {},
   afterOpen: function() {},
   open: function() {},
   beforeClose: function() {},
   close: function() {},
   animateOpen: {
    opacity: "show"
   },
   animateClose: {
    opacity: "hide"
   }
  },
  notifications: [],
  element: null,
  interval: null,
  create: function(n, t) {
   var t = e.extend({}, this.defaults, t);
   "undefined" != typeof t.speed && (t.openDuration = t.speed, t.closeDuration = t.speed), 
   this.notifications.push({
    message: n,
    options: t
   }), t.log.apply(this.element, [ this.element, n, t ]);
  },
  render: function(n) {
   var t = this, o = n.message, i = n.options;
   i.themeState = "" == i.themeState ? "" : "ui-state-" + i.themeState;
   var n = e("<div/>").addClass("jGrowl-notification " + i.themeState + " ui-corner-all" + (void 0 != i.group && "" != i.group ? " " + i.group : "")).append(e("<div/>").addClass("jGrowl-close").html(i.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(i.header)).append(e("<div/>").addClass("jGrowl-message").html(o)).data("jGrowl", i).addClass(i.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
    e(this).parent().trigger("jGrowl.beforeClose");
   }).parent();
   e(n).bind("mouseover.jGrowl", function() {
    e("div.jGrowl-notification", t.element).data("jGrowl.pause", !0);
   }).bind("mouseout.jGrowl", function() {
    e("div.jGrowl-notification", t.element).data("jGrowl.pause", !1);
   }).bind("jGrowl.beforeOpen", function() {
    0 != i.beforeOpen.apply(n, [ n, o, i, t.element ]) && e(this).trigger("jGrowl.open");
   }).bind("jGrowl.open", function() {
    0 != i.open.apply(n, [ n, o, i, t.element ]) && ("after" == i.glue ? e("div.jGrowl-notification:last", t.element).after(n) : e("div.jGrowl-notification:first", t.element).before(n), 
    e(this).animate(i.animateOpen, i.openDuration, i.easing, function() {
     e.support.opacity === !1 && this.style.removeAttribute("filter"), null != e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date()), 
     e(this).trigger("jGrowl.afterOpen");
    }));
   }).bind("jGrowl.afterOpen", function() {
    i.afterOpen.apply(n, [ n, o, i, t.element ]);
   }).bind("jGrowl.beforeClose", function() {
    0 != i.beforeClose.apply(n, [ n, o, i, t.element ]) && e(this).trigger("jGrowl.close");
   }).bind("jGrowl.close", function() {
    e(this).data("jGrowl.pause", !0), e(this).animate(i.animateClose, i.closeDuration, i.easing, function() {
     e.isFunction(i.close) ? i.close.apply(n, [ n, o, i, t.element ]) !== !1 && e(this).remove() : e(this).remove();
    });
   }).trigger("jGrowl.beforeOpen"), "" != i.corners && void 0 != e.fn.corner && e(n).corner(i.corners), 
   e("div.jGrowl-notification:parent", t.element).size() > 1 && 0 == e("div.jGrowl-closer", t.element).size() && 0 != this.defaults.closer && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(t.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
    e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(t.defaults.closer) && t.defaults.closer.apply(e(this).parent()[0], [ e(this).parent()[0] ]);
   });
  },
  update: function() {
   e(this.element).find("div.jGrowl-notification:parent").each(function() {
    void 0 != e(this).data("jGrowl") && void 0 != e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < new Date().getTime() && 1 != e(this).data("jGrowl").sticky && (void 0 == e(this).data("jGrowl.pause") || 1 != e(this).data("jGrowl.pause")) && e(this).trigger("jGrowl.beforeClose");
   }), this.notifications.length > 0 && (0 == this.defaults.pool || e(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()), 
   e(this.element).find("div.jGrowl-notification:parent").size() < 2 && e(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
    e(this).remove();
   });
  },
  startup: function(t) {
   this.element = e(t).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), 
   this.interval = setInterval(function() {
    e(t).data("jGrowl.instance").update();
   }, parseInt(this.defaults.check)), n && e(this.element).addClass("ie6");
  },
  shutdown: function() {
   e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty();
  },
  close: function() {
   e(this.element).find("div.jGrowl-notification").each(function() {
    e(this).trigger("jGrowl.beforeClose");
   });
  }
 }), e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults;
}(jQuery), define("jgrowl", [ "jquery" ], function(e) {
 return function() {
  var n;
  return n || e.jQuery.jGrowl;
 };
}(this)), define("text!html/notificationsSettingsBlock.html", [], function() {
 return '<p>Shows notification messages in the bottom-right corner of the\n	screen.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="input-notifications-timeout">Timeout</label>\n		<div class="col-lg-7 form-inline">\n			<input type="text" id="input-notifications-timeout"\n				class="col-lg-5 form-control"> <span class="help-inline">ms</span>\n		</div>\n	</div>\n</div>';
}), define("extensions/notifications", [ "jquery", "underscore", "utils", "classes/Extension", "jgrowl", "text!html/notificationsSettingsBlock.html" ], function(e, n, t, o, i, r) {
 function a() {
  c === !1 && (i.defaults.life = l.config.timeout, i.defaults.closer = !1, i.defaults.closeTemplate = "", 
  i.defaults.position = "bottom-right", c = !0);
 }
 function s(e, t, o) {
  if (logger.info(e), a(), e) {
   var r = e.indexOf("|");
   (-1 === r || (e = e.substring(0, r))) && (o = o || {}, t = t || "icon-info-sign", 
   i("<i class='icon-white " + t + "'></i> " + n.escape(e), o));
  }
 }
 var l = new o("notifications", "Notifications");
 l.settingsBlock = r, l.defaultConfig = {
  timeout: 8e3
 }, l.onLoadSettings = function() {
  t.setInputValue("#input-notifications-timeout", l.config.timeout);
 }, l.onSaveSettings = function(e, n) {
  e.timeout = t.getInputIntValue("#input-notifications-timeout", n, 1, 6e4);
 };
 var c = !1;
 return l.onMessage = function(e) {
  s(e);
 }, l.onError = function(e) {
  logger.error(e), n.isString(e) ? s(e, "icon-warning-sign") : n.isObject(e) && s(e.message, "icon-warning-sign");
 }, l.onOfflineChanged = function(n) {
  n === !0 ? s("You are offline.", "icon-exclamation-sign msg-offline", {
   sticky: !0,
   close: function() {
    s("You are back online!", "icon-signal");
   }
  }) : e(".msg-offline").parents(".jGrowl-notification").trigger("jGrowl.beforeClose");
 }, l.onSyncImportSuccess = function(e, t) {
  var o = n.map(e, function(e) {
   return e.title;
  }).join(", ");
  s(o + " imported successfully from " + t.providerName + ".");
 }, l.onSyncExportSuccess = function(e, n) {
  s('"' + e.title + '" will now be synchronized on ' + n.provider.providerName + ".");
 }, l.onSyncRemoved = function(e, n) {
  s(n.provider.providerName + " synchronized location has been removed.");
 }, l.onPublishSuccess = function(e) {
  s('"' + e.title + '" successfully published.');
 }, l.onNewPublishSuccess = function(e, n) {
  s('"' + e.title + '" is now published on ' + n.provider.providerName + ".");
 }, l.onPublishRemoved = function(e, n) {
  s(n.provider.providerName + " publish location has been removed.");
 }, l;
}), define("text!html/markdownExtraSettingsBlock.html", [], function() {
 return '<p>Adds extra features to the original Markdown syntax.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label"\n			for="input-markdownextra-fencedcodegfm">GFM fenced code\n			blocks</label>\n		<div class="col-lg-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-fencedcodegfm">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="input-markdownextra-tables">Tables</label>\n		<div class="col-lg-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-tables">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-4 control-label"\n			for="input-markdownextra-deflist">Definition lists</label>\n		<div class="col-lg-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-deflist">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-4 control-label"\n			for="input-markdownextra-attrlist">Special attributes</label>\n		<div class="col-lg-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-attrlist">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-4 control-label"\n			for="input-markdownextra-footnotes">Footnotes</label>\n		<div class="col-lg-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-footnotes">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-4 control-label"\n			for="input-markdownextra-highlighter">Syntax highlighter</label>\n		<div class="col-lg-7">\n			<select id="input-markdownextra-highlighter" class="form-control"><option>None</option>\n				<option value="prettify">Prettify</option>\n				<option value="highlight">Highlight.js</option>\n			</select>\n		</div>\n	</div>\n</div>\n<span class="help-block pull-right"><a target="_blank"\n	href="https://github.com/jmcmanus/pagedown-extra">More info</a></span>';
});

var Markdown;

Markdown = "object" == typeof exports && "function" == typeof require ? exports : {}, 
function() {
 function e(e) {
  return e;
 }
 function n() {
  return !1;
 }
 function t() {}
 function o() {}
 t.prototype = {
  chain: function(n, t) {
   var o = this[n];
   if (!o) throw new Error("unknown hook " + n);
   this[n] = o === e ? t : function() {
    var e = Array.prototype.slice.call(arguments, 0);
    return e[0] = o.apply(null, e), t.apply(null, e);
   };
  },
  set: function(e, n) {
   if (!this[e]) throw new Error("unknown hook " + e);
   this[e] = n;
  },
  addNoop: function(n) {
   this[n] = e;
  },
  addFalse: function(e) {
   this[e] = n;
  }
 }, Markdown.HookCollection = t, o.prototype = {
  set: function(e, n) {
   this["s_" + e] = n;
  },
  get: function(e) {
   return this["s_" + e];
  }
 }, Markdown.Converter = function() {
  function e(e) {
   return e = e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, n, t, o, i, r) {
    return n = n.toLowerCase(), L.set(n, C(t)), i ? o : (r && M.set(n, r.replace(/"/g, "&quot;")), 
    "");
   });
  }
  function n(e) {
   return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, i), 
   e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, i), 
   e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, i), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, i), 
   e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, i);
  }
  function i(e, n) {
   var t = n;
   return t = t.replace(/^\n+/, ""), t = t.replace(/\n+$/g, ""), t = "\n\n~K" + (A.push(t) - 1) + "K\n\n";
  }
  function r(e, t) {
   e = R.preBlockGamut(e, O), e = f(e);
   var o = "<hr />\n";
   return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, o), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, o), 
   e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, o), e = h(e), e = m(e), e = w(e), 
   e = R.postBlockGamut(e, O), e = n(e), e = k(e, t);
  }
  function a(e) {
   return e = R.preSpanGamut(e), e = v(e), e = s(e), e = S(e), e = d(e), e = l(e), 
   e = E(e), e = e.replace(/~P/g, "://"), e = C(e), e = x(e), e = e.replace(/  +\n/g, " <br>\n"), 
   e = R.postSpanGamut(e);
  }
  function s(e) {
   var n = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
   return e = e.replace(n, function(e) {
    var n = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
    return n = $(n, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_");
   });
  }
  function l(e) {
   return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, c), 
   e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
   e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, c);
  }
  function c(e, n, t, o, i, r, a, s) {
   void 0 == s && (s = "");
   var l = n, c = t.replace(/:\/\//g, "~P"), d = o.toLowerCase(), p = i, f = s;
   if ("" == p) if ("" == d && (d = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + d, 
   void 0 != L.get(d)) p = L.get(d), void 0 != M.get(d) && (f = M.get(d)); else {
    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
    p = "";
   }
   p = z(p), p = $(p, "*_");
   var h = '<a href="' + p + '"';
   return "" != f && (f = u(f), f = $(f, "*_"), h += ' title="' + f + '"'), h += ">" + c + "</a>";
  }
  function d(e) {
   return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p);
  }
  function u(e) {
   return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function p(e, n, t, o, i, r, a, s) {
   var l = n, c = t, d = o.toLowerCase(), p = i, f = s;
   if (f || (f = ""), "" == p) {
    if ("" == d && (d = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + d, void 0 == L.get(d)) return l;
    p = L.get(d), void 0 != M.get(d) && (f = M.get(d));
   }
   c = $(u(c), "*_[]()"), p = $(p, "*_");
   var h = '<img src="' + p + '" alt="' + c + '"';
   return f = u(f), f = $(f, "*_"), h += ' title="' + f + '"', h += " />";
  }
  function f(e) {
   return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, n) {
    return '<h1 class="wmd-title">' + a(n) + "</h1>\n\n";
   }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, n) {
    return '<h2 class="wmd-title">' + a(n) + "</h2>\n\n";
   }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, n, t) {
    var o = n.length;
    return "<h" + o + ' class="wmd-title">' + a(t) + "</h" + o + ">\n\n";
   });
  }
  function h(e, n) {
   e += "~0";
   var t = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
   return j ? e = e.replace(t, function(e, t, o) {
    var i = t, r = o.search(/[*+-]/g) > -1 ? "ul" : "ol", a = g(i, r, n);
    return a = a.replace(/\s+$/, ""), a = "<" + r + ">" + a + "</" + r + ">\n";
   }) : (t = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
   e = e.replace(t, function(e, n, t, o) {
    var i = n, r = t, a = o.search(/[*+-]/g) > -1 ? "ul" : "ol", s = g(r, a);
    return s = i + "<" + a + ">\n" + s + "</" + a + ">\n";
   })), e = e.replace(/~0/, "");
  }
  function g(e, n, t) {
   j++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
   var o = D[n], i = new RegExp("(^[ \\t]*)(" + o + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + o + ")[ \\t]+))", "gm"), s = !1;
   return e = e.replace(i, function(e, n, o, i) {
    var l = i, c = /\n\n$/.test(l), d = c || l.search(/\n{2,}/) > -1;
    return d || s ? l = r(I(l), !0) : (l = h(I(l), !0), l = l.replace(/\n$/, ""), t || (l = a(l))), 
    s = c, "<li>" + l + "</li>\n";
   }), e = e.replace(/~0/g, ""), j--, e;
  }
  function m(e) {
   return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, n, t) {
    var o = n, i = t;
    return o = y(I(o)), o = P(o), o = o.replace(/^\n+/g, ""), o = o.replace(/\n+$/g, ""), 
    o = "<pre><code>" + o + "\n</code></pre>", "\n\n" + o + "\n\n" + i;
   }), e = e.replace(/~0/, "");
  }
  function b(e) {
   return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (A.push(e) - 1) + "K\n\n";
  }
  function v(e) {
   return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, n, t, o) {
    var i = o;
    return i = i.replace(/^([ \t]*)/g, ""), i = i.replace(/[ \t]*$/g, ""), i = y(i), 
    i = i.replace(/:\/\//g, "~P"), n + "<code>" + i + "</code>";
   });
  }
  function y(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = $(e, "*_{}[]\\", !1);
  }
  function x(e) {
   return e = e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g, "$1<strong>$3</strong>$4"), 
   e = e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g, "$1<em>$3</em>$4");
  }
  function w(e) {
   return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, n) {
    var t = n;
    return t = t.replace(/^[ \t]*>[ \t]?/gm, "~0"), t = t.replace(/~0/g, ""), t = t.replace(/^[ \t]+$/gm, ""), 
    t = r(t), t = t.replace(/(^|\n)/g, "$1  "), t = t.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, n) {
     var t = n;
     return t = t.replace(/^  /gm, "~0"), t = t.replace(/~0/g, "");
    }), b("<blockquote>\n" + t + "\n</blockquote>");
   });
  }
  function k(e, n) {
   e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
   for (var t = e.split(/\n{2,}/g), o = [], i = /~K(\d+)K/, r = t.length, s = 0; r > s; s++) {
    var l = t[s];
    i.test(l) ? o.push(l) : /\S/.test(l) && (l = a(l), l = l.replace(/^([ \t]*)/g, "<p>"), 
    l += "</p>", o.push(l));
   }
   if (!n) {
    r = o.length;
    for (var s = 0; r > s; s++) for (var c = !0; c; ) c = !1, o[s] = o[s].replace(/~K(\d+)K/g, function(e, n) {
     return c = !0, A[n];
    });
   }
   return o.join("\n\n");
  }
  function C(e) {
   return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
  }
  function S(e) {
   return e = e.replace(/\\(\\)/g, N), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, N);
  }
  function T(e, n, t, o) {
   if (n) return e;
   if (")" !== o.charAt(o.length - 1)) return "<" + t + o + ">";
   for (var i = o.match(/[()]/g), r = 0, a = 0; a < i.length; a++) "(" === i[a] ? 0 >= r ? r = 1 : r++ : r--;
   var s = "";
   if (0 > r) {
    var l = new RegExp("\\){1," + -r + "}$");
    o = o.replace(l, function(e) {
     return s = e, "";
    });
   }
   if (s) {
    var c = o.charAt(o.length - 1);
    B.test(c) || (s = c + s, o = o.substr(0, o.length - 1));
   }
   return "<" + t + o + ">" + s;
  }
  function E(e) {
   e = e.replace(q, T);
   var n = function(e, n) {
    return '<a href="' + n + '">' + R.plainLinkText(n) + "</a>";
   };
   return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, n);
  }
  function _(e) {
   return e = e.replace(/~E(\d+)E/g, function(e, n) {
    var t = parseInt(n);
    return String.fromCharCode(t);
   });
  }
  function I(e) {
   return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "");
  }
  function P(e) {
   if (!/\t/.test(e)) return e;
   var n, t = [ "    ", "   ", "  ", " " ], o = 0;
   return e.replace(/[\n\t]/g, function(e, i) {
    return "\n" === e ? (o = i + 1, e) : (n = (i - o) % 4, o = i + 1, t[n]);
   });
  }
  function z(e) {
   return e ? (e.length, e.replace(W, function(e) {
    return "~D" == e ? "%24" : ":" == e ? ":" : "%" + e.charCodeAt(0).toString(16);
   })) : "";
  }
  function $(e, n, t) {
   var o = "([" + n.replace(/([\[\]\\])/g, "\\$1") + "])";
   t && (o = "\\\\" + o);
   var i = new RegExp(o, "g");
   return e = e.replace(i, N);
  }
  function N(e, n) {
   var t = n.charCodeAt(0);
   return "~E" + t + "E";
  }
  var R = this.hooks = new t();
  R.addNoop("plainLinkText"), R.addNoop("preConversion"), R.addNoop("postNormalization"), 
  R.addNoop("preBlockGamut"), R.addNoop("postBlockGamut"), R.addNoop("preSpanGamut"), 
  R.addNoop("postSpanGamut"), R.addNoop("postConversion");
  var L, M, A, j;
  this.makeHtml = function(t) {
   if (L) throw new Error("Recursive call to converter.makeHtml");
   return L = new o(), M = new o(), A = [], j = 0, t = R.preConversion(t), t = t.replace(/~/g, "~T"), 
   t = t.replace(/\$/g, "~D"), t = t.replace(/\r\n/g, "\n"), t = t.replace(/\r/g, "\n"), 
   t = "\n\n" + t + "\n\n", t = P(t), t = t.replace(/^[ \t]+$/gm, ""), t = R.postNormalization(t), 
   t = n(t), t = e(t), t = r(t), t = _(t), t = t.replace(/~D/g, "$$"), t = t.replace(/~T/g, "~"), 
   t = R.postConversion(t), A = M = L = null, t;
  };
  var O = function(e) {
   return r(e);
  }, D = {
   ol: "\\d+[.]",
   ul: "[*+-]"
  }, H = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", F = "[-A-Z0-9+&@#/%=~_|[\\])]", q = new RegExp('(="|<)?\\b(https?|ftp)(://' + H + "*" + F + ")(?=$|\\W)", "gi"), B = new RegExp(F, "i"), W = /(?:["'*()[\]:]|~D)/g;
 };
}(), define("libs/Markdown.Converter", function() {});

var IN_GLOBAL_SCOPE = !0;

window.PR_SHOULD_USE_CONTINUATION = !0;

var prettyPrintOne, prettyPrint;

(function() {
 function e(e) {
  function n(e) {
   var n = e.charCodeAt(0);
   if (92 !== n) return n;
   var t = e.charAt(1);
   return n = u[t], n ? n : t >= "0" && "7" >= t ? parseInt(e.substring(1), 8) : "u" === t || "x" === t ? parseInt(e.substring(2), 16) : e.charCodeAt(1);
  }
  function t(e) {
   if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
   var n = String.fromCharCode(e);
   return "\\" === n || "-" === n || "]" === n || "^" === n ? "\\" + n : n;
  }
  function o(e) {
   var o = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), i = [], r = "^" === o[0], a = [ "[" ];
   r && a.push("^");
   for (var s = r ? 1 : 0, l = o.length; l > s; ++s) {
    var c = o[s];
    if (/\\[bdsw]/i.test(c)) a.push(c); else {
     var d, u = n(c);
     l > s + 2 && "-" === o[s + 1] ? (d = n(o[s + 2]), s += 2) : d = u, i.push([ u, d ]), 
     65 > d || u > 122 || (65 > d || u > 90 || i.push([ 32 | Math.max(65, u), 32 | Math.min(d, 90) ]), 
     97 > d || u > 122 || i.push([ -33 & Math.max(97, u), -33 & Math.min(d, 122) ]));
    }
   }
   i.sort(function(e, n) {
    return e[0] - n[0] || n[1] - e[1];
   });
   for (var p = [], f = [], s = 0; s < i.length; ++s) {
    var h = i[s];
    h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : p.push(f = h);
   }
   for (var s = 0; s < p.length; ++s) {
    var h = p[s];
    a.push(t(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && a.push("-"), a.push(t(h[1])));
   }
   return a.push("]"), a.join("");
  }
  function i(e) {
   for (var n = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), i = n.length, s = [], l = 0, c = 0; i > l; ++l) {
    var d = n[l];
    if ("(" === d) ++c; else if ("\\" === d.charAt(0)) {
     var u = +d.substring(1);
     u && (c >= u ? s[u] = -1 : n[l] = t(u));
    }
   }
   for (var l = 1; l < s.length; ++l) -1 === s[l] && (s[l] = ++r);
   for (var l = 0, c = 0; i > l; ++l) {
    var d = n[l];
    if ("(" === d) ++c, s[c] || (n[l] = "(?:"); else if ("\\" === d.charAt(0)) {
     var u = +d.substring(1);
     u && c >= u && (n[l] = "\\" + s[u]);
    }
   }
   for (var l = 0; i > l; ++l) "^" === n[l] && "^" !== n[l + 1] && (n[l] = "");
   if (e.ignoreCase && a) for (var l = 0; i > l; ++l) {
    var d = n[l], p = d.charAt(0);
    d.length >= 2 && "[" === p ? n[l] = o(d) : "\\" !== p && (n[l] = d.replace(/[a-zA-Z]/g, function(e) {
     var n = e.charCodeAt(0);
     return "[" + String.fromCharCode(-33 & n, 32 | n) + "]";
    }));
   }
   return n.join("");
  }
  for (var r = 0, a = !1, s = !1, l = 0, c = e.length; c > l; ++l) {
   var d = e[l];
   if (d.ignoreCase) s = !0; else if (/[a-z]/i.test(d.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
    a = !0, s = !1;
    break;
   }
  }
  for (var u = {
   b: 8,
   t: 9,
   n: 10,
   v: 11,
   f: 12,
   r: 13
  }, p = [], l = 0, c = e.length; c > l; ++l) {
   var d = e[l];
   if (d.global || d.multiline) throw new Error("" + d);
   p.push("(?:" + i(d) + ")");
  }
  return new RegExp(p.join("|"), s ? "gi" : "g");
 }
 function n(e, n) {
  function t(e) {
   var l = e.nodeType;
   if (1 == l) {
    if (o.test(e.className)) return;
    for (var c = e.firstChild; c; c = c.nextSibling) t(c);
    var d = e.nodeName.toLowerCase();
    ("br" === d || "li" === d) && (i[s] = "\n", a[s << 1] = r++, a[1 | s++ << 1] = e);
   } else if (3 == l || 4 == l) {
    var u = e.nodeValue;
    u.length && (u = n ? u.replace(/\r\n?/g, "\n") : u.replace(/[ \t\r\n]+/g, " "), 
    i[s] = u, a[s << 1] = r, r += u.length, a[1 | s++ << 1] = e);
   }
  }
  var o = /(?:^|\s)nocode(?:\s|$)/, i = [], r = 0, a = [], s = 0;
  return t(e), {
   sourceCode: i.join("").replace(/\n$/, ""),
   spans: a
  };
 }
 function t(e, n, t, o) {
  if (n) {
   var i = {
    sourceCode: n,
    basePos: e
   };
   t(i), o.push.apply(o, i.decorations);
  }
 }
 function o(e) {
  for (var n = void 0, t = e.firstChild; t; t = t.nextSibling) {
   var o = t.nodeType;
   n = 1 === o ? n ? e : t : 3 === o ? B.test(t.nodeValue) ? e : n : n;
  }
  return n === e ? void 0 : n;
 }
 function i(n, o) {
  var i, r = {};
  (function() {
   for (var t = n.concat(o), a = [], s = {}, l = 0, c = t.length; c > l; ++l) {
    var d = t[l], u = d[3];
    if (u) for (var p = u.length; --p >= 0; ) r[u.charAt(p)] = d;
    var f = d[1], h = "" + f;
    s.hasOwnProperty(h) || (a.push(f), s[h] = null);
   }
   a.push(/[\0-\uffff]/), i = e(a);
  })();
  var a = o.length, s = function(e) {
   for (var n = e.sourceCode, l = e.basePos, d = [ l, M ], u = 0, p = n.match(i) || [], f = {}, h = 0, g = p.length; g > h; ++h) {
    var m, b = p[h], v = f[b], y = void 0;
    if ("string" == typeof v) m = !1; else {
     var x = r[b.charAt(0)];
     if (x) y = b.match(x[1]), v = x[0]; else {
      for (var w = 0; a > w; ++w) if (x = o[w], y = b.match(x[1])) {
       v = x[0];
       break;
      }
      y || (v = M);
     }
     m = v.length >= 5 && "lang-" === v.substring(0, 5), !m || y && "string" == typeof y[1] || (m = !1, 
     v = O), m || (f[b] = v);
    }
    var k = u;
    if (u += b.length, m) {
     var C = y[1], S = b.indexOf(C), T = S + C.length;
     y[2] && (T = b.length - y[2].length, S = T - C.length);
     var E = v.substring(5);
     t(l + k, b.substring(0, S), s, d), t(l + k + S, C, c(E, C), d), t(l + k + T, b.substring(T), s, d);
    } else d.push(l + k, v);
   }
   e.decorations = d;
  };
  return s;
 }
 function r(e) {
  var n = [], t = [];
  e.tripleQuotedStrings ? n.push([ P, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\"" ]) : e.multiLineStrings ? n.push([ P, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`" ]) : n.push([ P, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'" ]), 
  e.verbatimStrings && t.push([ P, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null ]);
  var o = e.hashComments;
  o && (e.cStyleComments ? (o > 1 ? n.push([ $, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#" ]) : n.push([ $, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#" ]), 
  t.push([ P, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null ])) : n.push([ $, /^#[^\r\n]*/, null, "#" ])), 
  e.cStyleComments && (t.push([ $, /^\/\/[^\r\n]*/, null ]), t.push([ $, /^\/\*[\s\S]*?(?:\*\/|$)/, null ]));
  var r = e.regexLiterals;
  if (r) {
   var a = r > 1 ? "" : "\n\r", s = a ? "." : "[\\S\\s]", l = "/(?=[^/*" + a + "])" + "(?:[^/\\x5B\\x5C" + a + "]" + "|\\x5C" + s + "|\\x5B(?:[^\\x5C\\x5D" + a + "]" + "|\\x5C" + s + ")*(?:\\x5D|$))+" + "/";
   t.push([ "lang-regex", RegExp("^" + q + "(" + l + ")") ]);
  }
  var c = e.types;
  c && t.push([ N, c ]);
  var d = ("" + e.keywords).replace(/^ | $/g, "");
  d.length && t.push([ z, new RegExp("^(?:" + d.replace(/[\s,]+/g, "|") + ")\\b"), null ]), 
  n.push([ M, /^\s+/, null, " \r\n	 " ]);
  var u = "^.[^\\s\\w.$@'\"`/\\\\]*";
  return e.regexLiterals && (u += "(?!s*/)"), t.push([ R, /^@[a-z_$][a-z_$@0-9]*/i, null ], [ N, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null ], [ M, /^[a-z_$][a-z_$@0-9]*/i, null ], [ R, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789" ], [ M, /^\\[\s\S]?/, null ], [ L, new RegExp(u), null ]), 
  i(n, t);
 }
 function a(e, n, t) {
  function o(e) {
   var n = e.nodeType;
   if (1 != n || r.test(e.className)) {
    if ((3 == n || 4 == n) && t) {
     var l = e.nodeValue, c = l.match(a);
     if (c) {
      var d = l.substring(0, c.index);
      e.nodeValue = d;
      var u = l.substring(c.index + c[0].length);
      if (u) {
       var p = e.parentNode;
       p.insertBefore(s.createTextNode(u), e.nextSibling);
      }
      i(e), d || e.parentNode.removeChild(e);
     }
    }
   } else if ("br" === e.nodeName) i(e), e.parentNode && e.parentNode.removeChild(e); else for (var f = e.firstChild; f; f = f.nextSibling) o(f);
  }
  function i(e) {
   function n(e, t) {
    var o = t ? e.cloneNode(!1) : e, i = e.parentNode;
    if (i) {
     var r = n(i, 1), a = e.nextSibling;
     r.appendChild(o);
     for (var s = a; s; s = a) a = s.nextSibling, r.appendChild(s);
    }
    return o;
   }
   for (;!e.nextSibling; ) if (e = e.parentNode, !e) return;
   for (var t, o = n(e.nextSibling, 0); (t = o.parentNode) && 1 === t.nodeType; ) o = t;
   c.push(o);
  }
  for (var r = /(?:^|\s)nocode(?:\s|$)/, a = /\r\n?|\n/, s = e.ownerDocument, l = s.createElement("li"); e.firstChild; ) l.appendChild(e.firstChild);
  for (var c = [ l ], d = 0; d < c.length; ++d) o(c[d]);
  n === (0 | n) && c[0].setAttribute("value", n);
  var u = s.createElement("ol");
  u.className = "linenums";
  for (var p = Math.max(0, 0 | n - 1) || 0, d = 0, f = c.length; f > d; ++d) l = c[d], 
  l.className = "L" + (d + p) % 10, l.firstChild || l.appendChild(s.createTextNode(" ")), 
  u.appendChild(l);
  e.appendChild(u);
 }
 function s(e) {
  var n = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
  n = n && +n[1] <= 8;
  var t = /\n/g, o = e.sourceCode, i = o.length, r = 0, a = e.spans, s = a.length, l = 0, c = e.decorations, d = c.length, u = 0;
  c[d] = i;
  var p, f;
  for (f = p = 0; d > f; ) c[f] !== c[f + 2] ? (c[p++] = c[f++], c[p++] = c[f++]) : f += 2;
  for (d = p, f = p = 0; d > f; ) {
   for (var h = c[f], g = c[f + 1], m = f + 2; d >= m + 2 && c[m + 1] === g; ) m += 2;
   c[p++] = h, c[p++] = g, f = m;
  }
  d = c.length = p;
  var b, v = e.sourceNode;
  v && (b = v.style.display, v.style.display = "none");
  try {
   for (;s > l; ) {
    a[l];
    var y, x = a[l + 2] || i, w = c[u + 2] || i, m = Math.min(x, w), k = a[l + 1];
    if (1 !== k.nodeType && (y = o.substring(r, m))) {
     n && (y = y.replace(t, "\r")), k.nodeValue = y;
     var C = k.ownerDocument, S = C.createElement("span");
     S.className = c[u + 1];
     var T = k.parentNode;
     T.replaceChild(S, k), S.appendChild(k), x > r && (a[l + 1] = k = C.createTextNode(o.substring(m, x)), 
     T.insertBefore(k, S.nextSibling));
    }
    r = m, r >= x && (l += 2), r >= w && (u += 2);
   }
  } finally {
   v && (v.style.display = b);
  }
 }
 function l(e, n) {
  for (var t = n.length; --t >= 0; ) {
   var o = n[t];
   G.hasOwnProperty(o) ? f.console && console.warn("cannot override language handler %s", o) : G[o] = e;
  }
 }
 function c(e, n) {
  return e && G.hasOwnProperty(e) || (e = /^\s*</.test(n) ? "default-markup" : "default-code"), 
  G[e];
 }
 function d(e) {
  var t = e.langExtension;
  try {
   var o = n(e.sourceNode, e.pre), i = o.sourceCode;
   e.sourceCode = i, e.spans = o.spans, e.basePos = 0, c(t, i)(e), s(e);
  } catch (r) {
   f.console && console.log(r && r.stack || r);
  }
 }
 function u(e, n, t) {
  var o = document.createElement("div");
  o.innerHTML = "<pre>" + e + "</pre>", o = o.firstChild, t && a(o, t, !0);
  var i = {
   langExtension: n,
   numberLines: t,
   sourceNode: o,
   pre: 1
  };
  return d(i), o.innerHTML;
 }
 function p(e, n) {
  function t(e) {
   return r.getElementsByTagName(e);
  }
  function i() {
   for (var n = f.PR_SHOULD_USE_CONTINUATION ? g.now() + 250 : 1/0; b < c.length && g.now() < n; b++) {
    for (var t = c[b], r = S, l = t; l = l.previousSibling; ) {
     var u = l.nodeType, p = (7 === u || 8 === u) && l.nodeValue;
     if (p ? !/^\??prettify\b/.test(p) : 3 !== u || /\S/.test(l.nodeValue)) break;
     if (p) {
      r = {}, p.replace(/\b(\w+)=([\w:.%+-]+)/g, function(e, n, t) {
       r[n] = t;
      });
      break;
     }
    }
    var h = t.className;
    if ((r !== S || y.test(h)) && !x.test(h)) {
     for (var T = !1, E = t.parentNode; E; E = E.parentNode) {
      var _ = E.tagName;
      if (C.test(_) && E.className && y.test(E.className)) {
       T = !0;
       break;
      }
     }
     if (!T) {
      t.className += " prettyprinted";
      var I = r.lang;
      if (!I) {
       I = h.match(v);
       var P;
       !I && (P = o(t)) && k.test(P.tagName) && (I = P.className.match(v)), I && (I = I[1]);
      }
      var z;
      if (w.test(t.tagName)) z = 1; else {
       var $ = t.currentStyle, N = s.defaultView, R = $ ? $.whiteSpace : N && N.getComputedStyle ? N.getComputedStyle(t, null).getPropertyValue("white-space") : 0;
       z = R && "pre" === R.substring(0, 3);
      }
      var L = r.linenums;
      (L = "true" === L || +L) || (L = h.match(/\blinenums\b(?::(\d+))?/), L = L ? L[1] && L[1].length ? +L[1] : !0 : !1), 
      L && a(t, L, z), m = {
       langExtension: I,
       sourceNode: t,
       numberLines: L,
       pre: z
      }, d(m);
     }
    }
   }
   b < c.length ? setTimeout(i, 250) : "function" == typeof e && e();
  }
  for (var r = n || document.body, s = r.ownerDocument || document, l = [ t("pre"), t("code"), t("xmp") ], c = [], u = 0; u < l.length; ++u) for (var p = 0, h = l[u].length; h > p; ++p) c.push(l[u][p]);
  l = null;
  var g = Date;
  g.now || (g = {
   now: function() {
    return +new Date();
   }
  });
  var m, b = 0, v = /\blang(?:uage)?-([\w.]+)(?!\S)/, y = /\bprettyprint\b/, x = /\bprettyprinted\b/, w = /pre|xmp/i, k = /^code$/i, C = /^(?:pre|code|xmp)$/i, S = {};
  i();
 }
 var f = window, h = [ "break,continue,do,else,for,if,return,while" ], g = [ h, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ], m = [ g, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof" ], b = [ m, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ], v = [ m, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient" ], y = [ v, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where" ], x = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", w = [ m, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ], k = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", C = [ h, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ], S = [ h, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ], T = [ h, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use" ], E = [ h, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ], _ = [ b, y, w, k, C, S, E ], I = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, P = "str", z = "kwd", $ = "com", N = "typ", R = "lit", L = "pun", M = "pln", A = "tag", j = "dec", O = "src", D = "atn", H = "atv", F = "nocode", q = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", B = /\S/, W = r({
  keywords: _,
  hashComments: !0,
  cStyleComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), G = {};
 l(W, [ "default-code" ]), l(i([], [ [ M, /^[^<?]+/ ], [ j, /^<!\w[^>]*(?:>|$)/ ], [ $, /^<\!--[\s\S]*?(?:-\->|$)/ ], [ "lang-", /^<\?([\s\S]+?)(?:\?>|$)/ ], [ "lang-", /^<%([\s\S]+?)(?:%>|$)/ ], [ L, /^(?:<[%?]|[%?]>)/ ], [ "lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i ], [ "lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i ], [ "lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i ], [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ] ]), [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ]), 
 l(i([ [ M, /^[\s]+/, null, " 	\r\n" ], [ H, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'" ] ], [ [ A, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i ], [ D, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ], [ "lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/ ], [ L, /^[=<>\/]+/ ], [ "lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i ], [ "lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i ], [ "lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i ], [ "lang-css", /^style\s*=\s*\"([^\"]+)\"/i ], [ "lang-css", /^style\s*=\s*\'([^\']+)\'/i ], [ "lang-css", /^style\s*=\s*([^\"\'>\s]+)/i ] ]), [ "in.tag" ]), 
 l(i([], [ [ H, /^[\s\S]+/ ] ]), [ "uq.val" ]), l(r({
  keywords: b,
  hashComments: !0,
  cStyleComments: !0,
  types: I
 }), [ "c", "cc", "cpp", "cxx", "cyc", "m" ]), l(r({
  keywords: "null,true,false"
 }), [ "json" ]), l(r({
  keywords: y,
  hashComments: !0,
  cStyleComments: !0,
  verbatimStrings: !0,
  types: I
 }), [ "cs" ]), l(r({
  keywords: v,
  cStyleComments: !0
 }), [ "java" ]), l(r({
  keywords: E,
  hashComments: !0,
  multiLineStrings: !0
 }), [ "bash", "bsh", "csh", "sh" ]), l(r({
  keywords: C,
  hashComments: !0,
  multiLineStrings: !0,
  tripleQuotedStrings: !0
 }), [ "cv", "py", "python" ]), l(r({
  keywords: k,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: 2
 }), [ "perl", "pl", "pm" ]), l(r({
  keywords: S,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), [ "rb", "ruby" ]), l(r({
  keywords: w,
  cStyleComments: !0,
  regexLiterals: !0
 }), [ "javascript", "js" ]), l(r({
  keywords: x,
  hashComments: 3,
  cStyleComments: !0,
  multilineStrings: !0,
  tripleQuotedStrings: !0,
  regexLiterals: !0
 }), [ "coffee" ]), l(r({
  keywords: T,
  cStyleComments: !0,
  multilineStrings: !0
 }), [ "rc", "rs", "rust" ]), l(i([], [ [ P, /^[\s\S]+/ ] ]), [ "regex" ]);
 var U = f.PR = {
  createSimpleLexer: i,
  registerLangHandler: l,
  sourceDecorator: r,
  PR_ATTRIB_NAME: D,
  PR_ATTRIB_VALUE: H,
  PR_COMMENT: $,
  PR_DECLARATION: j,
  PR_KEYWORD: z,
  PR_LITERAL: R,
  PR_NOCODE: F,
  PR_PLAIN: M,
  PR_PUNCTUATION: L,
  PR_SOURCE: O,
  PR_STRING: P,
  PR_TAG: A,
  PR_TYPE: N,
  prettyPrintOne: IN_GLOBAL_SCOPE ? f.prettyPrintOne = u : prettyPrintOne = u,
  prettyPrint: prettyPrint = IN_GLOBAL_SCOPE ? f.prettyPrint = p : prettyPrint = p
 };
 "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
  return U;
 });
})(), define("libs/prettify", function() {});

var hljs = new function() {
 function e(e) {
  return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
 }
 function n(e) {
  for (var n = e.firstChild; n; n = n.nextSibling) {
   if ("CODE" == n.nodeName) return n;
   if (3 != n.nodeType || !n.nodeValue.match(/\s+/)) break;
  }
 }
 function t(e, n) {
  return Array.prototype.map.call(e.childNodes, function(e) {
   return 3 == e.nodeType ? n ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : "BR" == e.nodeName ? "\n" : t(e, n);
  }).join("");
 }
 function o(e) {
  var n = (e.className + " " + e.parentNode.className).split(/\s+/);
  n = n.map(function(e) {
   return e.replace(/^language-/, "");
  });
  for (var t = 0; t < n.length; t++) if (f[n[t]] || "no-highlight" == n[t]) return n[t];
 }
 function i(e) {
  var n = [];
  return function t(e, o) {
   for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? o += i.nodeValue.length : "BR" == i.nodeName ? o += 1 : 1 == i.nodeType && (n.push({
    event: "start",
    offset: o,
    node: i
   }), o = t(i, o), n.push({
    event: "stop",
    offset: o,
    node: i
   }));
   return o;
  }(e, 0), n;
 }
 function r(n, t, o) {
  function i() {
   return n.length && t.length ? n[0].offset != t[0].offset ? n[0].offset < t[0].offset ? n : t : "start" == t[0].event ? n : t : n.length ? n : t;
  }
  function r(n) {
   function t(n) {
    return " " + n.nodeName + '="' + e(n.value) + '"';
   }
   return "<" + n.nodeName + Array.prototype.map.call(n.attributes, t).join("") + ">";
  }
  for (var a = 0, s = "", l = []; n.length || t.length; ) {
   var c = i().splice(0, 1)[0];
   if (s += e(o.substr(a, c.offset - a)), a = c.offset, "start" == c.event) s += r(c.node), 
   l.push(c.node); else if ("stop" == c.event) {
    var d, u = l.length;
    do u--, d = l[u], s += "</" + d.nodeName.toLowerCase() + ">"; while (d != c.node);
    for (l.splice(u, 1); u < l.length; ) s += r(l[u]), u++;
   }
  }
  return s + e(o.substr(a));
 }
 function a(e) {
  function n(n, t) {
   return RegExp(n, "m" + (e.cI ? "i" : "") + (t ? "g" : ""));
  }
  function t(e, o) {
   function i(e, n) {
    n.split(" ").forEach(function(n) {
     var t = n.split("|");
     a[t[0]] = [ e, t[1] ? Number(t[1]) : 1 ], r.push(t[0]);
    });
   }
   if (!e.compiled) {
    e.compiled = !0;
    var r = [];
    if (e.k) {
     var a = {};
     if (e.lR = n(e.l || hljs.IR, !0), "string" == typeof e.k) i("keyword", e.k); else for (var s in e.k) e.k.hasOwnProperty(s) && i(s, e.k[s]);
     e.k = a;
    }
    o && (e.bWK && (e.b = "\\b(" + r.join("|") + ")\\s"), e.bR = n(e.b ? e.b : "\\B|\\b"), 
    e.e || e.eW || (e.e = "\\B|\\b"), e.e && (e.eR = n(e.e)), e.tE = e.e || "", e.eW && o.tE && (e.tE += (e.e ? "|" : "") + o.tE)), 
    e.i && (e.iR = n(e.i)), void 0 === e.r && (e.r = 1), e.c || (e.c = []);
    for (var l = 0; l < e.c.length; l++) "self" == e.c[l] && (e.c[l] = e), t(e.c[l], e);
    e.starts && t(e.starts, o);
    for (var c = [], l = 0; l < e.c.length; l++) c.push(e.c[l].b);
    e.tE && c.push(e.tE), e.i && c.push(e.i), e.t = c.length ? n(c.join("|"), !0) : {
     exec: function() {
      return null;
     }
    };
   }
  }
  t(e);
 }
 function s(n, t) {
  function o(e, n) {
   for (var t = 0; t < n.c.length; t++) {
    var o = n.c[t].bR.exec(e);
    if (o && 0 == o.index) return n.c[t];
   }
  }
  function i(e, n) {
   return e.e && e.eR.test(n) ? e : e.eW ? i(e.parent, n) : void 0;
  }
  function r(e, n) {
   return n.i && n.iR.test(e);
  }
  function c(e, n) {
   var t = m.cI ? n[0].toLowerCase() : n[0];
   return e.k.hasOwnProperty(t) && e.k[t];
  }
  function d() {
   var n = e(v);
   if (!b.k) return n;
   var t = "", o = 0;
   b.lR.lastIndex = 0;
   for (var i = b.lR.exec(n); i; ) {
    t += n.substr(o, i.index - o);
    var r = c(b, i);
    r ? (x += r[1], t += '<span class="' + r[0] + '">' + i[0] + "</span>") : t += i[0], 
    o = b.lR.lastIndex, i = b.lR.exec(n);
   }
   return t + n.substr(o);
  }
  function u() {
   if (b.sL && !f[b.sL]) return e(v);
   var n = b.sL ? s(b.sL, v) : l(v);
   return b.r > 0 && (x += n.keyword_count, y += n.r), '<span class="' + n.language + '">' + n.value + "</span>";
  }
  function p() {
   return void 0 !== b.sL ? u() : d();
  }
  function h(n, t) {
   var o = n.cN ? '<span class="' + n.cN + '">' : "";
   n.rB ? (w += o, v = "") : n.eB ? (w += e(t) + o, v = "") : (w += o, v = t), b = Object.create(n, {
    parent: {
     value: b
    }
   }), y += n.r;
  }
  function g(n, t) {
   if (v += n, void 0 === t) return w += p(), 0;
   var a = o(t, b);
   if (a) return w += p(), h(a, t), a.rB ? 0 : t.length;
   var s = i(b, t);
   if (s) {
    s.rE || s.eE || (v += t), w += p();
    do b.cN && (w += "</span>"), b = b.parent; while (b != s.parent);
    return s.eE && (w += e(t)), v = "", s.starts && h(s.starts, ""), s.rE ? 0 : t.length;
   }
   if (r(t, b)) throw "Illegal";
   return v += t, t.length || 1;
  }
  var m = f[n];
  a(m);
  var b = m, v = "", y = 0, x = 0, w = "";
  try {
   for (var k, C, S = 0; ;) {
    if (b.t.lastIndex = S, k = b.t.exec(t), !k) break;
    C = g(t.substr(S, k.index - S), k[0]), S = k.index + C;
   }
   return g(t.substr(S)), {
    r: y,
    keyword_count: x,
    value: w,
    language: n
   };
  } catch (T) {
   if ("Illegal" == T) return {
    r: 0,
    keyword_count: 0,
    value: e(t)
   };
   throw T;
  }
 }
 function l(n) {
  var t = {
   keyword_count: 0,
   r: 0,
   value: e(n)
  }, o = t;
  for (var i in f) if (f.hasOwnProperty(i)) {
   var r = s(i, n);
   r.language = i, r.keyword_count + r.r > o.keyword_count + o.r && (o = r), r.keyword_count + r.r > t.keyword_count + t.r && (o = t, 
   t = r);
  }
  return o.language && (t.second_best = o), t;
 }
 function c(e, n, t) {
  return n && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
   return t.replace(/\t/g, n);
  })), t && (e = e.replace(/\n/g, "<br>")), e;
 }
 function d(e, n, a) {
  var d = t(e, a), u = o(e);
  if ("no-highlight" != u) {
   var p = u ? s(u, d) : l(d);
   u = p.language;
   var f = i(e);
   if (f.length) {
    var h = document.createElement("pre");
    h.innerHTML = p.value, p.value = r(f, i(h), d);
   }
   p.value = c(p.value, n, a);
   var g = e.className;
   g.match("(\\s|^)(language-)?" + u + "(\\s|$)") || (g = g ? g + " " + u : u), e.innerHTML = p.value, 
   e.className = g, e.result = {
    language: u,
    kw: p.keyword_count,
    re: p.r
   }, p.second_best && (e.second_best = {
    language: p.second_best.language,
    kw: p.second_best.keyword_count,
    re: p.second_best.r
   });
  }
 }
 function u() {
  u.called || (u.called = !0, Array.prototype.map.call(document.getElementsByTagName("pre"), n).filter(Boolean).forEach(function(e) {
   d(e, hljs.tabReplace);
  }));
 }
 function p() {
  window.addEventListener("DOMContentLoaded", u, !1), window.addEventListener("load", u, !1);
 }
 var f = {};
 this.LANGUAGES = f, this.highlight = s, this.highlightAuto = l, this.fixMarkup = c, 
 this.highlightBlock = d, this.initHighlighting = u, this.initHighlightingOnLoad = p, 
 this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", 
 this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
 this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", 
 this.BE = {
  b: "\\\\[\\s\\S]",
  r: 0
 }, this.ASM = {
  cN: "string",
  b: "'",
  e: "'",
  i: "\\n",
  c: [ this.BE ],
  r: 0
 }, this.QSM = {
  cN: "string",
  b: '"',
  e: '"',
  i: "\\n",
  c: [ this.BE ],
  r: 0
 }, this.CLCM = {
  cN: "comment",
  b: "//",
  e: "$"
 }, this.CBLCLM = {
  cN: "comment",
  b: "/\\*",
  e: "\\*/"
 }, this.HCM = {
  cN: "comment",
  b: "#",
  e: "$"
 }, this.NM = {
  cN: "number",
  b: this.NR,
  r: 0
 }, this.CNM = {
  cN: "number",
  b: this.CNR,
  r: 0
 }, this.BNM = {
  cN: "number",
  b: this.BNR,
  r: 0
 }, this.inherit = function(e, n) {
  var t = {};
  for (var o in e) t[o] = e[o];
  if (n) for (var o in n) t[o] = n[o];
  return t;
 };
}();

if (hljs.LANGUAGES.bash = function(e) {
 var n = "true false", t = "if then else elif fi for break continue while in do done echo exit return set declare", o = {
  cN: "variable",
  b: "\\$[a-zA-Z0-9_#]+"
 }, i = {
  cN: "variable",
  b: "\\${([^}]|\\\\})+}"
 }, r = {
  cN: "string",
  b: '"',
  e: '"',
  i: "\\n",
  c: [ e.BE, o, i ],
  r: 0
 }, a = {
  cN: "string",
  b: "'",
  e: "'",
  c: [ {
   b: "''"
  } ],
  r: 0
 }, s = {
  cN: "test_condition",
  b: "",
  e: "",
  c: [ r, a, o, i ],
  k: {
   literal: n
  },
  r: 0
 };
 return {
  k: {
   keyword: t,
   literal: n
  },
  c: [ {
   cN: "shebang",
   b: "(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",
   r: 10
  }, o, i, e.HCM, r, a, e.inherit(s, {
   b: "\\[ ",
   e: " \\]",
   r: 0
  }), e.inherit(s, {
   b: "\\[\\[ ",
   e: " \\]\\]"
  }) ]
 };
}(hljs), hljs.LANGUAGES.cs = function(e) {
 return {
  k: "abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while ascending descending from get group into join let orderby partial select set value var where yield",
  c: [ {
   cN: "comment",
   b: "///",
   e: "$",
   rB: !0,
   c: [ {
    cN: "xmlDocTag",
    b: "///|<!--|-->"
   }, {
    cN: "xmlDocTag",
    b: "</?",
    e: ">"
   } ]
  }, e.CLCM, e.CBLCLM, {
   cN: "preprocessor",
   b: "#",
   e: "$",
   k: "if else elif endif define undef warning error line region endregion pragma checksum"
  }, {
   cN: "string",
   b: '@"',
   e: '"',
   c: [ {
    b: '""'
   } ]
  }, e.ASM, e.QSM, e.CNM ]
 };
}(hljs), hljs.LANGUAGES.ruby = function(e) {
 var n = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?", t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", o = {
  keyword: "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include"
 }, i = {
  cN: "yardoctag",
  b: "@[A-Za-z]+"
 }, r = [ {
  cN: "comment",
  b: "#",
  e: "$",
  c: [ i ]
 }, {
  cN: "comment",
  b: "^\\=begin",
  e: "^\\=end",
  c: [ i ],
  r: 10
 }, {
  cN: "comment",
  b: "^__END__",
  e: "\\n$"
 } ], a = {
  cN: "subst",
  b: "#\\{",
  e: "}",
  l: n,
  k: o
 }, s = [ e.BE, a ], l = [ {
  cN: "string",
  b: "'",
  e: "'",
  c: s,
  r: 0
 }, {
  cN: "string",
  b: '"',
  e: '"',
  c: s,
  r: 0
 }, {
  cN: "string",
  b: "%[qw]?\\(",
  e: "\\)",
  c: s
 }, {
  cN: "string",
  b: "%[qw]?\\[",
  e: "\\]",
  c: s
 }, {
  cN: "string",
  b: "%[qw]?{",
  e: "}",
  c: s
 }, {
  cN: "string",
  b: "%[qw]?<",
  e: ">",
  c: s,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?/",
  e: "/",
  c: s,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?%",
  e: "%",
  c: s,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?-",
  e: "-",
  c: s,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?\\|",
  e: "\\|",
  c: s,
  r: 10
 } ], c = {
  cN: "function",
  bWK: !0,
  e: " |$|;",
  k: "def",
  c: [ {
   cN: "title",
   b: t,
   l: n,
   k: o
  }, {
   cN: "params",
   b: "\\(",
   e: "\\)",
   l: n,
   k: o
  } ].concat(r)
 }, d = r.concat(l.concat([ {
  cN: "class",
  bWK: !0,
  e: "$|;",
  k: "class module",
  c: [ {
   cN: "title",
   b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",
   r: 0
  }, {
   cN: "inheritance",
   b: "<\\s*",
   c: [ {
    cN: "parent",
    b: "(" + e.IR + "::)?" + e.IR
   } ]
  } ].concat(r)
 }, c, {
  cN: "constant",
  b: "(::)?(\\b[A-Z]\\w*(::)?)+",
  r: 0
 }, {
  cN: "symbol",
  b: ":",
  c: l.concat([ {
   b: t
  } ]),
  r: 0
 }, {
  cN: "symbol",
  b: n + ":",
  r: 0
 }, {
  cN: "number",
  b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
  r: 0
 }, {
  cN: "number",
  b: "\\?\\w"
 }, {
  cN: "variable",
  b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
 }, {
  b: "(" + e.RSR + ")\\s*",
  c: r.concat([ {
   cN: "regexp",
   b: "/",
   e: "/[a-z]*",
   i: "\\n",
   c: [ e.BE, a ]
  } ]),
  r: 0
 } ]));
 return a.c = d, c.c[1].c = d, {
  l: n,
  k: o,
  c: d
 };
}(hljs), hljs.LANGUAGES.diff = function() {
 return {
  c: [ {
   cN: "chunk",
   b: "^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",
   r: 10
  }, {
   cN: "chunk",
   b: "^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",
   r: 10
  }, {
   cN: "chunk",
   b: "^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",
   r: 10
  }, {
   cN: "header",
   b: "Index: ",
   e: "$"
  }, {
   cN: "header",
   b: "=====",
   e: "=====$"
  }, {
   cN: "header",
   b: "^\\-\\-\\-",
   e: "$"
  }, {
   cN: "header",
   b: "^\\*{3} ",
   e: "$"
  }, {
   cN: "header",
   b: "^\\+\\+\\+",
   e: "$"
  }, {
   cN: "header",
   b: "\\*{5}",
   e: "\\*{5}$"
  }, {
   cN: "addition",
   b: "^\\+",
   e: "$"
  }, {
   cN: "deletion",
   b: "^\\-",
   e: "$"
  }, {
   cN: "change",
   b: "^\\!",
   e: "$"
  } ]
 };
}(hljs), hljs.LANGUAGES.javascript = function(e) {
 return {
  k: {
   keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",
   literal: "true false null undefined NaN Infinity"
  },
  c: [ e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
   b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
   k: "return throw case",
   c: [ e.CLCM, e.CBLCLM, {
    cN: "regexp",
    b: "/",
    e: "/[gim]*",
    i: "\\n",
    c: [ {
     b: "\\\\/"
    } ]
   }, {
    b: "<",
    e: ">;",
    sL: "xml"
   } ],
   r: 0
  }, {
   cN: "function",
   bWK: !0,
   e: "{",
   k: "function",
   c: [ {
    cN: "title",
    b: "[A-Za-z$_][0-9A-Za-z$_]*"
   }, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ e.CLCM, e.CBLCLM ],
    i: "[\"'\\(]"
   } ],
   i: "\\[|%"
  } ]
 };
}(hljs), hljs.LANGUAGES.css = function(e) {
 var n = {
  cN: "function",
  b: e.IR + "\\(",
  e: "\\)",
  c: [ e.NM, e.ASM, e.QSM ]
 };
 return {
  cI: !0,
  i: "[=/|']",
  c: [ e.CBLCLM, {
   cN: "id",
   b: "\\#[A-Za-z0-9_-]+"
  }, {
   cN: "class",
   b: "\\.[A-Za-z0-9_-]+",
   r: 0
  }, {
   cN: "attr_selector",
   b: "\\[",
   e: "\\]",
   i: "$"
  }, {
   cN: "pseudo",
   b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
  }, {
   cN: "at_rule",
   b: "@(font-face|page)",
   l: "[a-z-]+",
   k: "font-face page"
  }, {
   cN: "at_rule",
   b: "@",
   e: "[{;]",
   eE: !0,
   k: "import page media charset",
   c: [ n, e.ASM, e.QSM, e.NM ]
  }, {
   cN: "tag",
   b: e.IR,
   r: 0
  }, {
   cN: "rules",
   b: "{",
   e: "}",
   i: "[^\\s]",
   r: 0,
   c: [ e.CBLCLM, {
    cN: "rule",
    b: "[^\\s]",
    rB: !0,
    e: ";",
    eW: !0,
    c: [ {
     cN: "attribute",
     b: "[A-Z\\_\\.\\-]+",
     e: ":",
     eE: !0,
     i: "[^\\s]",
     starts: {
      cN: "value",
      eW: !0,
      eE: !0,
      c: [ n, e.NM, e.QSM, e.ASM, e.CBLCLM, {
       cN: "hexcolor",
       b: "\\#[0-9A-F]+"
      }, {
       cN: "important",
       b: "!important"
      } ]
     }
    } ]
   } ]
  } ]
 };
}(hljs), hljs.LANGUAGES.xml = function() {
 var e = "[A-Za-z0-9\\._:-]+", n = {
  eW: !0,
  c: [ {
   cN: "attribute",
   b: e,
   r: 0
  }, {
   b: '="',
   rB: !0,
   e: '"',
   c: [ {
    cN: "value",
    b: '"',
    eW: !0
   } ]
  }, {
   b: "='",
   rB: !0,
   e: "'",
   c: [ {
    cN: "value",
    b: "'",
    eW: !0
   } ]
  }, {
   b: "=",
   c: [ {
    cN: "value",
    b: "[^\\s/>]+"
   } ]
  } ]
 };
 return {
  cI: !0,
  c: [ {
   cN: "pi",
   b: "<\\?",
   e: "\\?>",
   r: 10
  }, {
   cN: "doctype",
   b: "<!DOCTYPE",
   e: ">",
   r: 10,
   c: [ {
    b: "\\[",
    e: "\\]"
   } ]
  }, {
   cN: "comment",
   b: "<!--",
   e: "-->",
   r: 10
  }, {
   cN: "cdata",
   b: "<\\!\\[CDATA\\[",
   e: "\\]\\]>",
   r: 10
  }, {
   cN: "tag",
   b: "<style(?=\\s|>|$)",
   e: ">",
   k: {
    title: "style"
   },
   c: [ n ],
   starts: {
    e: "</style>",
    rE: !0,
    sL: "css"
   }
  }, {
   cN: "tag",
   b: "<script(?=\\s|>|$)",
   e: ">",
   k: {
    title: "script"
   },
   c: [ n ],
   starts: {
    e: "</script>",
    rE: !0,
    sL: "javascript"
   }
  }, {
   b: "<%",
   e: "%>",
   sL: "vbscript"
  }, {
   cN: "tag",
   b: "</?",
   e: "/?>",
   c: [ {
    cN: "title",
    b: "[^ />]+"
   }, n ]
  } ]
 };
}(hljs), hljs.LANGUAGES.http = function() {
 return {
  i: "\\S",
  c: [ {
   cN: "status",
   b: "^HTTP/[0-9\\.]+",
   e: "$",
   c: [ {
    cN: "number",
    b: "\\b\\d{3}\\b"
   } ]
  }, {
   cN: "request",
   b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
   rB: !0,
   e: "$",
   c: [ {
    cN: "string",
    b: " ",
    e: " ",
    eB: !0,
    eE: !0
   } ]
  }, {
   cN: "attribute",
   b: "^\\w",
   e: ": ",
   eE: !0,
   i: "\\n|\\s|=",
   starts: {
    cN: "string",
    e: "$"
   }
  }, {
   b: "\\n\\n",
   starts: {
    sL: "",
    eW: !0
   }
  } ]
 };
}(hljs), hljs.LANGUAGES.java = function(e) {
 return {
  k: "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws",
  c: [ {
   cN: "javadoc",
   b: "/\\*\\*",
   e: "\\*/",
   c: [ {
    cN: "javadoctag",
    b: "@[A-Za-z]+"
   } ],
   r: 10
  }, e.CLCM, e.CBLCLM, e.ASM, e.QSM, {
   cN: "class",
   bWK: !0,
   e: "{",
   k: "class interface",
   i: ":",
   c: [ {
    bWK: !0,
    k: "extends implements",
    r: 10
   }, {
    cN: "title",
    b: e.UIR
   } ]
  }, e.CNM, {
   cN: "annotation",
   b: "@[A-Za-z]+"
  } ]
 };
}(hljs), hljs.LANGUAGES.php = function(e) {
 var n = {
  cN: "variable",
  b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
 }, t = [ e.inherit(e.ASM, {
  i: null
 }), e.inherit(e.QSM, {
  i: null
 }), {
  cN: "string",
  b: 'b"',
  e: '"',
  c: [ e.BE ]
 }, {
  cN: "string",
  b: "b'",
  e: "'",
  c: [ e.BE ]
 } ], o = [ e.BNM, e.CNM ], i = {
  cN: "title",
  b: e.UIR
 };
 return {
  cI: !0,
  k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return implements parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ enddeclare final try this switch continue endfor endif declare unset true false namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler",
  c: [ e.CLCM, e.HCM, {
   cN: "comment",
   b: "/\\*",
   e: "\\*/",
   c: [ {
    cN: "phpdoc",
    b: "\\s@[A-Za-z]+"
   } ]
  }, {
   cN: "comment",
   eB: !0,
   b: "__halt_compiler.+?;",
   eW: !0
  }, {
   cN: "string",
   b: "<<<['\"]?\\w+['\"]?$",
   e: "^\\w+;",
   c: [ e.BE ]
  }, {
   cN: "preprocessor",
   b: "<\\?php",
   r: 10
  }, {
   cN: "preprocessor",
   b: "\\?>"
  }, n, {
   cN: "function",
   bWK: !0,
   e: "{",
   k: "function",
   i: "\\$|\\[|%",
   c: [ i, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ "self", n, e.CBLCLM ].concat(t).concat(o)
   } ]
  }, {
   cN: "class",
   bWK: !0,
   e: "{",
   k: "class",
   i: "[:\\(\\$]",
   c: [ {
    bWK: !0,
    eW: !0,
    k: "extends",
    c: [ i ]
   }, i ]
  }, {
   b: "=>"
  } ].concat(t).concat(o)
 };
}(hljs), hljs.LANGUAGES.python = function(e) {
 var n = {
  cN: "prompt",
  b: "^(>>>|\\.\\.\\.) "
 }, t = [ {
  cN: "string",
  b: "(u|b)?r?'''",
  e: "'''",
  c: [ n ],
  r: 10
 }, {
  cN: "string",
  b: '(u|b)?r?"""',
  e: '"""',
  c: [ n ],
  r: 10
 }, {
  cN: "string",
  b: "(u|r|ur)'",
  e: "'",
  c: [ e.BE ],
  r: 10
 }, {
  cN: "string",
  b: '(u|r|ur)"',
  e: '"',
  c: [ e.BE ],
  r: 10
 }, {
  cN: "string",
  b: "(b|br)'",
  e: "'",
  c: [ e.BE ]
 }, {
  cN: "string",
  b: '(b|br)"',
  e: '"',
  c: [ e.BE ]
 } ].concat([ e.ASM, e.QSM ]), o = {
  cN: "title",
  b: e.UIR
 }, i = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: [ "self", e.CNM, n ].concat(t)
 }, r = {
  bWK: !0,
  e: ":",
  i: "[${=;\\n]",
  c: [ o, i ],
  r: 10
 };
 return {
  k: {
   keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10",
   built_in: "None True False Ellipsis NotImplemented"
  },
  i: "(</|->|\\?)",
  c: t.concat([ n, e.HCM, e.inherit(r, {
   cN: "function",
   k: "def"
  }), e.inherit(r, {
   cN: "class",
   k: "class"
  }), e.CNM, {
   cN: "decorator",
   b: "@",
   e: "$"
  }, {
   b: "\\b(print|exec)\\("
  } ])
 };
}(hljs), hljs.LANGUAGES.sql = function(e) {
 return {
  cI: !0,
  c: [ {
   cN: "operator",
   b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b(?!:)",
   e: ";",
   eW: !0,
   k: {
    keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number",
    aggregate: "count sum min max avg"
   },
   c: [ {
    cN: "string",
    b: "'",
    e: "'",
    c: [ e.BE, {
     b: "''"
    } ],
    r: 0
   }, {
    cN: "string",
    b: '"',
    e: '"',
    c: [ e.BE, {
     b: '""'
    } ],
    r: 0
   }, {
    cN: "string",
    b: "`",
    e: "`",
    c: [ e.BE ]
   }, e.CNM ]
  }, e.CBLCLM, {
   cN: "comment",
   b: "--",
   e: "$"
  } ]
 };
}(hljs), hljs.LANGUAGES.ini = function(e) {
 return {
  cI: !0,
  i: "[^\\s]",
  c: [ {
   cN: "comment",
   b: ";",
   e: "$"
  }, {
   cN: "title",
   b: "^\\[",
   e: "\\]"
  }, {
   cN: "setting",
   b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
   e: "$",
   c: [ {
    cN: "value",
    eW: !0,
    k: "on off true false yes no",
    c: [ e.QSM, e.NM ]
   } ]
  } ]
 };
}(hljs), hljs.LANGUAGES.perl = function(e) {
 var n = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", t = {
  cN: "subst",
  b: "[$@]\\{",
  e: "\\}",
  k: n,
  r: 10
 }, o = {
  cN: "variable",
  b: "\\$\\d"
 }, i = {
  cN: "variable",
  b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"
 }, r = [ e.BE, t, o, i ], a = {
  b: "->",
  c: [ {
   b: e.IR
  }, {
   b: "{",
   e: "}"
  } ]
 }, s = {
  cN: "comment",
  b: "^(__END__|__DATA__)",
  e: "\\n$",
  r: 5
 }, l = [ o, i, e.HCM, s, {
  cN: "comment",
  b: "^\\=\\w",
  e: "\\=cut",
  eW: !0
 }, a, {
  cN: "string",
  b: "q[qwxr]?\\s*\\(",
  e: "\\)",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "q[qwxr]?\\s*\\[",
  e: "\\]",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "q[qwxr]?\\s*\\{",
  e: "\\}",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "q[qwxr]?\\s*\\|",
  e: "\\|",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "q[qwxr]?\\s*\\<",
  e: "\\>",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "qw\\s+q",
  e: "q",
  c: r,
  r: 5
 }, {
  cN: "string",
  b: "'",
  e: "'",
  c: [ e.BE ],
  r: 0
 }, {
  cN: "string",
  b: '"',
  e: '"',
  c: r,
  r: 0
 }, {
  cN: "string",
  b: "`",
  e: "`",
  c: [ e.BE ]
 }, {
  cN: "string",
  b: "{\\w+}",
  r: 0
 }, {
  cN: "string",
  b: "-?\\w+\\s*\\=\\>",
  r: 0
 }, {
  cN: "number",
  b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
  r: 0
 }, {
  b: "(" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
  k: "split return print reverse grep",
  r: 0,
  c: [ e.HCM, s, {
   cN: "regexp",
   b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
   r: 10
  }, {
   cN: "regexp",
   b: "(m|qr)?/",
   e: "/[a-z]*",
   c: [ e.BE ],
   r: 0
  } ]
 }, {
  cN: "sub",
  bWK: !0,
  e: "(\\s*\\(.*?\\))?[;{]",
  k: "sub",
  r: 5
 }, {
  cN: "operator",
  b: "-\\w\\b",
  r: 0
 } ];
 return t.c = l, a.c[1].c = l, {
  k: n,
  c: l
 };
}(hljs), hljs.LANGUAGES.json = function(e) {
 var n = {
  literal: "true false null"
 }, t = [ e.QSM, e.CNM ], o = {
  cN: "value",
  e: ",",
  eW: !0,
  eE: !0,
  c: t,
  k: n
 }, i = {
  b: "{",
  e: "}",
  c: [ {
   cN: "attribute",
   b: '\\s*"',
   e: '"\\s*:\\s*',
   eB: !0,
   eE: !0,
   c: [ e.BE ],
   i: "\\n",
   starts: o
  } ],
  i: "\\S"
 }, r = {
  b: "\\[",
  e: "\\]",
  c: [ e.inherit(o, {
   cN: null
  }) ],
  i: "\\S"
 };
 return t.splice(t.length, 0, i, r), {
  c: t,
  k: n,
  i: "\\S"
 };
}(hljs), hljs.LANGUAGES.cpp = function(e) {
 var n = {
  keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",
  built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"
 };
 return {
  k: n,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, {
   cN: "string",
   b: "'\\\\?.",
   e: "'",
   i: "."
  }, {
   cN: "number",
   b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
  }, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "stl_container",
   b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
   e: ">",
   k: n,
   r: 10,
   c: [ "self" ]
  } ]
 };
}(hljs), define("libs/highlight.pack", function() {}), function() {
 function e(e) {
  return e.replace(/^\s+|\s+$/g, "");
 }
 function n(e) {
  return e.replace(/\s+$/g, "");
 }
 function t(e) {
  return e.replace(new RegExp("^(\\t|[ ]{1,4})", "gm"), "");
 }
 function o(e, n) {
  return -1 != e.indexOf(n);
 }
 function i(e, n) {
  return e.replace(/<[^>]*>?/gi, function(e) {
   return e.match(n) ? e : "";
  });
 }
 function r(e, n) {
  for (var t = {}, o = 0; o < e.length; o++) t[e[o]] = e[o];
  for (o = 0; o < n.length; o++) t[n[o]] = n[o];
  var i = [];
  for (var r in t) t.hasOwnProperty(r) && i.push(t[r]);
  return i;
 }
 function a(e) {
  return "" != e.charAt(0) && (e = "" + e), "" != e.charAt(e.length - 1) && (e += ""), 
  e;
 }
 function s(e) {
  return "" == e.charAt(0) && (e = e.substr(1)), "" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), 
  e;
 }
 function l(e, n) {
  return i(c(e, n), f);
 }
 function c(e, n) {
  var t = n.blockGamutHookCallback(e);
  return t = u(t), t = t.replace(/~D/g, "$$").replace(/~T/g, "~"), t = n.previousPostConversion(t);
 }
 function d(e) {
  return e.replace(/\\\|/g, "&#124;").replace(/\\:/g, "&#58;");
 }
 function u(e) {
  return e = e.replace(/~E(\d+)E/g, function(e, n) {
   var t = parseInt(n);
   return String.fromCharCode(t);
  });
 }
 function p(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }
 var f = new RegExp([ "^(<\\/?(a|abbr|acronym|applet|area|b|basefont|", "bdo|big|button|cite|code|del|dfn|em|figcaption|", "font|i|iframe|img|input|ins|kbd|label|map|", "mark|meter|object|param|progress|q|ruby|rp|rt|s|", "samp|script|select|small|span|strike|strong|", "sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|", "<(br)\\s?\\/?>)$" ].join(""), "i");
 Array.indexOf || (Array.prototype.indexOf = function(e) {
  for (var n = 0; n < this.length; n++) if (this[n] == e) return n;
  return -1;
 }), Markdown.Extra = function() {
  this.converter = null, this.hashBlocks = [], this.footnotes = {}, this.usedFootnotes = [], 
  this.attributeBlocks = !1, this.googleCodePrettify = !1, this.highlightJs = !1, 
  this.tableClass = "", this.tabWidth = 4;
 }, Markdown.Extra.init = function(e, n) {
  var t = new Markdown.Extra(), i = [], r = [], a = [ "unHashExtraBlocks" ];
  return n = n || {}, n.extensions = n.extensions || [ "all" ], o(n.extensions, "all") && (n.extensions = [ "tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes" ]), 
  o(n.extensions, "attr_list") && (i.push("hashFcbAttributeBlocks"), r.push("hashHeaderAttributeBlocks"), 
  a.push("applyAttributeBlocks"), t.attributeBlocks = !0), o(n.extensions, "tables") && r.push("tables"), 
  o(n.extensions, "fenced_code_gfm") && i.push("fencedCodeBlocks"), o(n.extensions, "def_list") && r.push("definitionLists"), 
  o(n.extensions, "footnotes") && (i.push("stripFootnoteDefinitions"), r.push("doFootnotes"), 
  a.push("printFootnotes")), e.hooks.chain("postNormalization", function(e) {
   return t.doTransform(i, e) + "\n";
  }), e.hooks.chain("preBlockGamut", function(e, n) {
   return t.blockGamutHookCallback = n, e = d(e), t.doTransform(r, e) + "\n";
  }), t.previousPostConversion = e.hooks.postConversion, e.hooks.chain("postConversion", function(e) {
   return e = t.doTransform(a, e), t.hashBlocks = [], t.footnotes = {}, t.usedFootnotes = [], 
   e;
  }), "highlighter" in n && (t.googleCodePrettify = "prettify" === n.highlighter, 
  t.highlightJs = "highlight" === n.highlighter), "table_class" in n && (t.tableClass = n.table_class), 
  t.converter = e, t;
 }, Markdown.Extra.prototype.doTransform = function(e, n) {
  for (var t = 0; t < e.length; t++) n = this[e[t]](n);
  return n;
 }, Markdown.Extra.prototype.hashExtraBlock = function(e) {
  return "\n<p>~X" + (this.hashBlocks.push(e) - 1) + "X</p>\n";
 }, Markdown.Extra.prototype.hashExtraInline = function(e) {
  return "~X" + (this.hashBlocks.push(e) - 1) + "X";
 }, Markdown.Extra.prototype.unHashExtraBlocks = function(e) {
  function n() {
   var o = !1;
   e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, n) {
    o = !0;
    var i = parseInt(n, 10);
    return t.hashBlocks[i];
   }), o === !0 && n();
  }
  var t = this;
  return n(), e;
 }, Markdown.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
  function n(e, n, t) {
   return "<p>~XX" + (r.hashBlocks.push(t) - 1) + "XX</p>\n" + n + "\n";
  }
  var t = "\\{\\s*[.|#][^}]+\\}", o = new RegExp("^(#{1,6}.*#{0,6})\\s+(" + t + ")[ \\t]*(\\n|0x03)", "gm"), i = new RegExp("^(.*)\\s+(" + t + ")[ \\t]*\\n" + "(?=[\\-|=]+\\s*(\\n|0x03))", "gm"), r = this;
  return e = e.replace(o, n), e = e.replace(i, n);
 }, Markdown.Extra.prototype.hashFcbAttributeBlocks = function(e) {
  function n(e, n, t) {
   return "<p>~XX" + (i.hashBlocks.push(t) - 1) + "XX</p>\n" + n + "\n";
  }
  var t = "\\{\\s*[.|#][^}]+\\}", o = new RegExp("^(```[^{\\n]*)\\s+(" + t + ")[ \\t]*\\n" + "(?=([\\s\\S]*?)\\n```\\s*(\\n|0x03))", "gm"), i = this;
  return e.replace(o, n);
 }, Markdown.Extra.prototype.applyAttributeBlocks = function(e) {
  var n = this, t = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
  return e = e.replace(t, function(e, t, o, i, a) {
   if (!o) return "";
   for (var s = parseInt(t, 10), l = n.hashBlocks[s], c = l.match(/#[^\s{}]+/g) || [], d = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", u = l.match(/\.[^\s{}]+/g) || [], p = 0; p < u.length; p++) u[p] = u[p].substr(1, u[p].length - 1);
   var f = "";
   return i && (u = r(u, [ i ])), u.length > 0 && (f = ' class="' + u.join(" ") + '"'), 
   "<" + o + d + f + a;
  });
 }, Markdown.Extra.prototype.tables = function(n) {
  function t(n, t, i, r) {
   t = t.replace(/^ *[|]/m, ""), i = i.replace(/^ *[|]/m, ""), r = r.replace(/^ *[|]/gm, ""), 
   t = t.replace(/[|] *$/m, ""), i = i.replace(/[|] *$/m, ""), r = r.replace(/[|] *$/gm, ""), 
   alignspecs = i.split(/ *[|] */), align = [];
   for (var a = 0; a < alignspecs.length; a++) {
    var s = alignspecs[a];
    align[a] = s.match(/^ *-+: *$/m) ? ' style="text-align:right;"' : s.match(/^ *:-+: *$/m) ? ' style="text-align:center;"' : s.match(/^ *:-+ *$/m) ? ' style="text-align:left;"' : "";
   }
   var c = t.split(/ *[|] */), d = c.length, u = o.tableClass ? ' class="' + o.tableClass + '"' : "", p = [ "<table", u, ">\n", "<thead>\n", "<tr>\n" ].join("");
   for (a = 0; d > a; a++) {
    var f = l(e(c[a]), o);
    p += [ "  <th", align[a], ">", f, "</th>\n" ].join("");
   }
   p += "</tr>\n</thead>\n";
   var h = r.split("\n");
   for (a = 0; a < h.length; a++) if (!h[a].match(/^\s*$/)) {
    for (var g = h[a].split(/ *[|] */), m = d - g.length, b = 0; m > b; b++) g.push("");
    for (p += "<tr>\n", b = 0; d > b; b++) {
     var v = l(e(g[b]), o);
     p += [ "  <td", align[b], ">", v, "</td>\n" ].join("");
    }
    p += "</tr>\n";
   }
   return p += "</table>\n", o.hashExtraBlock(p);
  }
  var o = this, i = new RegExp([ "^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"), r = new RegExp([ "^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm");
  return n = n.replace(i, t), n = n.replace(r, t);
 }, Markdown.Extra.prototype.stripFootnoteDefinitions = function(e) {
  var n = this;
  return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, t, o) {
   return t = p(t), o += "\n", o = o.replace(/^[ ]{0,3}/g, ""), n.footnotes[t] = o, 
   "\n";
  });
 }, Markdown.Extra.prototype.doFootnotes = function(e) {
  var n = this;
  if (n.isConvertingFootnote === !0) return e;
  var t = 0;
  return e = e.replace(/\[\^(.+?)\]/g, function(e, o) {
   var i = p(o), r = n.footnotes[i];
   if (void 0 === r) return "";
   t++, n.usedFootnotes.push(i);
   var a = '<a href="#fn:' + i + '" id="fnref:' + i + '" title="See footnote" class="footnote">' + t + "</a>";
   return n.hashExtraInline(a);
  });
 }, Markdown.Extra.prototype.printFootnotes = function(e) {
  var n = this;
  if (0 === n.usedFootnotes.length) return e;
  e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
  for (var t = 0; t < n.usedFootnotes.length; t++) {
   var o = n.usedFootnotes[t], i = n.footnotes[o];
   n.isConvertingFootnote = !0;
   var r = l(i, n);
   delete n.isConvertingFootnote, e += '<li id="fn:' + o + '">' + r + ' <a href="#fnref:' + o + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n';
  }
  return e += "</ol>\n</div>";
 }, Markdown.Extra.prototype.fencedCodeBlocks = function(e) {
  function n(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~");
  }
  var t = this;
  return e = e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, o, i) {
   var r = o, a = i, s = t.googleCodePrettify ? ' class="prettyprint"' : "", l = "";
   r && (l = t.googleCodePrettify || t.highlightJs ? ' class="language-' + r + '"' : ' class="' + r + '"');
   var c = [ "<pre", s, "><code", l, ">", n(a), "</code></pre>" ].join("");
   return t.hashExtraBlock(c);
  });
 }, Markdown.Extra.prototype.definitionLists = function(n) {
  var t = new RegExp([ "(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")" ].join(""), "gm"), o = this;
  return n = a(n), n = n.replace(t, function(n, t, i) {
   var r = e(o.processDefListItems(i));
   return r = "<dl>\n" + r + "\n</dl>", t + o.hashExtraBlock(r) + "\n\n";
  }), s(n);
 }, Markdown.Extra.prototype.processDefListItems = function(o) {
  var i = this, r = new RegExp([ "(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])" ].join(""), "gm"), d = new RegExp([ "\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")" ].join(""), "gm");
  return o = a(o), o = o.replace(/\n{2,}(?=\\x03)/, "\n"), o = o.replace(r, function(n, t, o) {
   for (var r = e(o).split("\n"), a = "", s = 0; s < r.length; s++) {
    var c = r[s];
    c = l(e(c), i), a += "\n<dt>" + c + "</dt>";
   }
   return a + "\n";
  }), o = o.replace(d, function(e, o, r, a) {
   return o || a.match(/\n{2,}/) ? (a = Array(r.length + 1).join(" ") + a, a = t(a) + "\n\n", 
   a = "\n" + c(a, i) + "\n") : (a = n(a), a = l(t(a), i)), "\n<dd>" + a + "</dd>\n";
  }), s(o);
 };
}(), define("libs/Markdown.Extra", function() {}), define("extensions/markdownExtra", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/markdownExtraSettingsBlock.html", "libs/Markdown.Extra" ], function(e, n, t, o, i) {
 var r = new o("markdownExtra", "Markdown Extra", !0);
 return r.settingsBlock = i, r.defaultConfig = {
  extensions: [ "fenced_code_gfm", "tables", "def_list", "attr_list", "footnotes" ],
  highlighter: "prettify"
 }, r.onLoadSettings = function() {
  function e(e) {
   return n.some(r.config.extensions, function(n) {
    return n == e;
   });
  }
  t.setInputChecked("#input-markdownextra-fencedcodegfm", e("fenced_code_gfm")), t.setInputChecked("#input-markdownextra-tables", e("tables")), 
  t.setInputChecked("#input-markdownextra-deflist", e("def_list")), t.setInputChecked("#input-markdownextra-attrlist", e("attr_list")), 
  t.setInputChecked("#input-markdownextra-footnotes", e("footnotes")), t.setInputValue("#input-markdownextra-highlighter", r.config.highlighter);
 }, r.onSaveSettings = function(e) {
  e.extensions = [], t.getInputChecked("#input-markdownextra-fencedcodegfm") && e.extensions.push("fenced_code_gfm"), 
  t.getInputChecked("#input-markdownextra-tables") && e.extensions.push("tables"), 
  t.getInputChecked("#input-markdownextra-deflist") && e.extensions.push("def_list"), 
  t.getInputChecked("#input-markdownextra-attrlist") && e.extensions.push("attr_list"), 
  t.getInputChecked("#input-markdownextra-footnotes") && e.extensions.push("footnotes"), 
  e.highlighter = t.getInputValue("#input-markdownextra-highlighter");
 }, r.onEditorConfigure = function(e) {
  var t = e.getConverter(), o = {
   extensions: r.config.extensions
  };
  if ("highlight" == r.config.highlighter) {
   o.highlighter = "prettify";
   var i = document.getElementById("preview-contents");
   e.hooks.chain("onPreviewRefresh", function() {
    n.each(i.querySelectorAll(".prettyprint"), function(e) {
     hljs.highlightBlock(e);
    });
   });
  } else "prettify" == r.config.highlighter && (o.highlighter = "prettify", e.hooks.chain("onPreviewRefresh", prettyPrint));
  Markdown.Extra.init(t, o), t.extraExtensions = r.config.extensions;
 }, r;
}), define("text!html/buttonToc.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Table of contents" data-toggle="dropdown">\n    <i class="icon-list"></i>\n</button>\n<div class="dropdown-menu pull-right">\n    <h3>Table of contents</h3>\n    <div class="table-of-contents">\n    </div>\n</div>\n';
}), define("text!html/tocSettingsBlock.html", [], function() {
 return '<p>Generates a table of contents when a [TOC] marker is found.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="input-toc-marker">Marker\n			RegExp</label>\n		<div class="col-lg-7">\n		\n			<input type="text" id="input-toc-marker" class="col-lg-4 form-control">\n		</div>\n	</div>\n	<div class="form-group">\n        <label class="col-lg-4 control-label" for="input-toc-button">Button over preview</label>\n        <div class="col-lg-7">\n        <div class="checkbox">\n            <input type="checkbox" id="input-toc-button">\n            </div>\n        </div>\n    </div>\n	\n</div>';
}), define("extensions/toc", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonToc.html", "text!html/tocSettingsBlock.html" ], function(e, n, t, o, i, r) {
 function a(e, n, t) {
  this.tagName = e, this.anchor = n, this.text = t, this.children = [];
 }
 function s(e, t) {
  function o() {
   void 0 !== l && (l.children.length > 0 && (l.children = s(l.children, t + 1)), r.push(l));
  }
  t = t || 1;
  var i = "H" + t, r = [], l = void 0;
  return n.each(e, function(e) {
   e.tagName != i ? (void 0 === l && (l = new a()), l.children.push(e)) : (o(), l = e);
  }), o(), r;
 }
 function l() {
  function e(e) {
   for (var i = e.id || t.slugify(e.textContent), r = i, a = 0; n.has(o, r); ) r = i + "-" + ++a;
   return o[r] = !0, e.id = r, r;
  }
  var o = {}, i = [];
  return n.each(d.querySelectorAll(".preview-content > .wmd-title"), function(n) {
   i.push(new a(n.tagName, e(n), n.textContent));
  }), i = s(i), '<div class="toc">\n<ul>\n' + i.join("") + "</ul>\n</div>\n";
 }
 var c = new o("toc", "Table of Contents", !0);
 c.settingsBlock = r, c.defaultConfig = {
  marker: "\\[(TOC|toc)\\]",
  button: !0
 }, c.onLoadSettings = function() {
  t.setInputValue("#input-toc-marker", c.config.marker), t.setInputChecked("#input-toc-button", c.config.button);
 }, c.onSaveSettings = function(e, n) {
  e.marker = t.getInputRegExpValue("#input-toc-marker", n), e.button = t.getInputChecked("#input-toc-button");
 }, c.onCreatePreviewButton = function() {
  return c.config.button ? i : void 0;
 }, a.prototype.childrenToString = function() {
  if (0 === this.children.length) return "";
  var e = "<ul>\n";
  return n.each(this.children, function(n) {
   e += n.toString();
  }), e += "</ul>\n";
 }, a.prototype.toString = function() {
  var e = "<li>";
  return this.anchor && this.text && (e += '<a href="#' + this.anchor + '">' + this.text + "</a>"), 
  e += this.childrenToString() + "</li>\n";
 };
 var d = void 0;
 return c.onEditorConfigure = function(e) {
  d = document.getElementById("preview-contents");
  var t = document.querySelectorAll(".table-of-contents"), o = new RegExp("^" + c.config.marker + "$", "g");
  e.hooks.chain("onPreviewRefresh", function() {
   var e = l();
   n.each(d.getElementsByTagName("p"), function(n) {
    o.test(n.innerHTML) && (n.innerHTML = e);
   }), n.each(t, function(n) {
    n.innerHTML = e;
   });
  });
 }, c;
}), define("text!html/mathJaxSettingsBlock.html", [], function() {
 return '<p>Allows StackEdit to interpret LaTeX mathematical expressions.</p>\n<div class="form-horizontal">\n    <div class="form-group">\n        <label class="col-lg-4 control-label"\n            for="input-mathjax-config-tex">TeX configuration</label>\n        <div class="col-lg-7">\n            <input type="text" id="input-mathjax-config-tex" class="form-control">\n        </div>\n    </div>\n    <div class="form-group">\n        <label class="col-lg-4 control-label"\n            for="input-mathjax-config-tex2jax">tex2jax configuration</label>\n        <div class="col-lg-7">\n            <input type="text" id="input-mathjax-config-tex2jax" class="form-control">\n        </div>\n    </div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="http://docs.mathjax.org/en/latest/options/">More info</a></span>';
}), define("extensions/mathJax", [ "utils", "classes/Extension", "text!html/mathJaxSettingsBlock.html", "libs/MathJax" ], function(utils, Extension, mathJaxSettingsBlockHTML) {
 function processMath(e, n) {
  var t = blocks.slice(e, n + 1).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (HUB.Browser.isMSIE && (t = t.replace(/(%[^\n]*)\n/g, "$1<br/>\n")); n > e; ) blocks[n] = "", 
  n--;
  blocks[e] = "@@" + math.length + "@@", math.push(t), start = end = last = null;
 }
 function removeMath(e) {
  start = end = last = null, math = [], blocks = e.replace(/\r\n?/g, "\n").split(SPLIT);
  for (var n = 1, t = blocks.length; t > n; n += 2) {
   var o = blocks[n];
   "@" === o.charAt(0) ? (blocks[n] = "@@" + math.length + "@@", math.push(o)) : start ? o === end ? braces ? last = n : processMath(start, n) : o.match(/\n.*\n/) ? (last && (n = last, 
   processMath(start, n)), start = end = last = null, braces = 0) : "{" === o ? braces++ : "}" === o && braces && braces-- : o === inline || "$$" === o ? (start = n, 
   end = o, braces = 0) : "begin" === o.substr(1, 5) && (start = n, end = "\\end" + o.substr(6), 
   braces = 0);
  }
  return last && processMath(start, last), blocks.join("");
 }
 function replaceMath(e) {
  return e = e.replace(/@@(\d+)@@/g, function(e, n) {
   return math[n];
  }), math = null, e;
 }
 function RestartMJ() {
  pending = !1, HUB.cancelTypeset = !1, HUB.Queue([ "Typeset", HUB, preview ]), HUB.Queue(afterRefreshCallback);
 }
 function UpdateMJ() {
  pending || (pending = !0, HUB.Cancel(), HUB.Queue(RestartMJ));
 }
 var mathJax = new Extension("mathJax", "MathJax", !0);
 mathJax.settingsBlock = mathJaxSettingsBlockHTML, mathJax.defaultConfig = {
  tex: "{}",
  tex2jax: '{ inlineMath: [["$","$"],["\\\\\\\\(","\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true }'
 }, mathJax.onLoadSettings = function() {
  utils.setInputValue("#input-mathjax-config-tex", mathJax.config.tex), utils.setInputValue("#input-mathjax-config-tex2jax", mathJax.config.tex2jax);
 }, mathJax.onSaveSettings = function(e, n) {
  e.tex = utils.getInputJsValue("#input-mathjax-config-tex", n), e.tex2jax = utils.getInputJsValue("#input-mathjax-config-tex2jax", n);
 }, mathJax.onReady = function() {
  eval("var tex = " + mathJax.config.tex), eval("var tex2jax = " + mathJax.config.tex2jax), 
  MathJax.Hub.Config({
   "HTML-CSS": {
    preferredFont: "TeX",
    availableFonts: [ "STIX", "TeX" ],
    linebreaks: {
     automatic: !0
    },
    EqnChunk: 10,
    imageFont: null
   },
   tex2jax: tex2jax,
   TeX: $.extend({
    noUndefined: {
     attributes: {
      mathcolor: "red",
      mathbackground: "#FFEEEE",
      mathsize: "90%"
     }
    },
    Safe: {
     allow: {
      URLs: "safe",
      classes: "safe",
      cssIDs: "safe",
      styles: "safe",
      fontsize: "all"
     }
    }
   }, tex),
   messageStyle: "none"
  });
 };
 var converter = void 0, ready = !1, pending = !1, preview = null, inline = "$", blocks, start, end, last, braces, math, HUB = MathJax.Hub;
 HUB.Queue(function() {
  ready = !0, HUB.processUpdateTime = 50, HUB.Config({
   "HTML-CSS": {
    EqnChunk: 10,
    EqnChunkFactor: 1
   },
   SVG: {
    EqnChunk: 10,
    EqnChunkFactor: 1
   }
  });
 });
 var SPLIT = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i, afterRefreshCallback = void 0;
 if (mathJax.onEditorConfigure = function(e) {
  preview = document.getElementById("preview-contents"), converter = e.getConverter(), 
  converter.hooks.chain("preConversion", removeMath), converter.hooks.chain("postConversion", replaceMath);
 }, mathJax.onAsyncPreview = function(e) {
  afterRefreshCallback = e, UpdateMJ();
 }, !HUB.Cancel) {
  HUB.cancelTypeset = !1;
  var CANCELMESSAGE = "MathJax Canceled";
  HUB.Register.StartupHook("HTML-CSS Jax Config", function() {
   var e = MathJax.OutputJax["HTML-CSS"], n = e.Translate;
   e.Augment({
    Translate: function(t, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return n.call(e, t, o);
    }
   });
  }), HUB.Register.StartupHook("SVG Jax Config", function() {
   var e = MathJax.OutputJax.SVG, n = e.Translate;
   e.Augment({
    Translate: function(t, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return n.call(e, t, o);
    }
   });
  }), HUB.Register.StartupHook("TeX Jax Config", function() {
   var e = MathJax.InputJax.TeX, n = e.Translate;
   e.Augment({
    Translate: function(t, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return n.call(e, t, o);
    }
   });
  });
  var PROCESSERROR = HUB.processError;
  HUB.processError = function(e, n, t) {
   return e.message !== CANCELMESSAGE ? PROCESSERROR.call(HUB, e, n, t) : (MathJax.Message.Clear(0, 0), 
   n.jaxIDs = [], n.jax = {}, n.scripts = [], n.i = n.j = 0, n.cancelled = !0, null);
  }, HUB.Cancel = function() {
   this.cancelTypeset = !0;
  };
 }
 return mathJax;
}), define("extensions/emailConverter", [ "classes/Extension" ], function(e) {
 var n = new e("emailConverter", "Markdown Email", !0);
 return n.settingsBlock = "<p>Converts email adresses in the form &lt;email@example.com&gt; into clickable links.</p>", 
 n.onEditorConfigure = function(e) {
  e.getConverter().hooks.chain("postConversion", function(e) {
   return e.replace(/<(mailto\:)?([^\s>]+@[^\s>]+\.\S+?)>/g, function(e, n, t) {
    return '<a href="mailto:' + t + '">' + t + "</a>";
   });
  });
 }, n;
}), define("text!html/scrollLinkSettingsBlock.html", [], function() {
 return '<p>Binds together editor and preview scrollbars.</p>\n<blockquote class="muted">\n	<b>NOTE:</b> The mapping between Markdown and HTML is based on the\n	position of the title elements (h1, h2...) in the page. Therefore if\n	your document does not contain any title, the mapping will be linear and\n	consequently less accurate.\n</blockquote>';
}), showLog = !0, css_browser_selector(navigator.userAgent), define("libs/css_browser_selector", function() {}), 
function(e) {
 "function" == typeof define && define.amd ? define("libs/jquery.mousewheel", [ "jquery" ], e) : "object" == typeof exports ? module.exports = e : e(jQuery);
}(function(e) {
 function n(n) {
  var i, r = n || window.event, a = [].slice.call(arguments, 1), s = 0, l = 0, c = 0, d = 0, u = 0;
  return n = e.event.fix(r), n.type = "mousewheel", r.wheelDelta && (s = r.wheelDelta), 
  r.detail && (s = -1 * r.detail), r.deltaY && (c = -1 * r.deltaY, s = c), r.deltaX && (l = r.deltaX, 
  s = -1 * l), void 0 !== r.wheelDeltaY && (c = r.wheelDeltaY), void 0 !== r.wheelDeltaX && (l = -1 * r.wheelDeltaX), 
  d = Math.abs(s), (!t || t > d) && (t = d), u = Math.max(Math.abs(c), Math.abs(l)), 
  (!o || o > u) && (o = u), i = s > 0 ? "floor" : "ceil", s = Math[i](s / t), l = Math[i](l / o), 
  c = Math[i](c / o), a.unshift(n, s, l, c), (e.event.dispatch || e.event.handle).apply(this, a);
 }
 var t, o, i = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], r = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
 if (e.event.fixHooks) for (var a = i.length; a; ) e.event.fixHooks[i[--a]] = e.event.mouseHooks;
 e.event.special.mousewheel = {
  setup: function() {
   if (this.addEventListener) for (var e = r.length; e; ) this.addEventListener(r[--e], n, !1); else this.onmousewheel = n;
  },
  teardown: function() {
   if (this.removeEventListener) for (var e = r.length; e; ) this.removeEventListener(r[--e], n, !1); else this.onmousewheel = null;
  }
 }, e.fn.extend({
  mousewheel: function(e) {
   return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
  },
  unmousewheel: function(e) {
   return this.unbind("mousewheel", e);
  }
 });
}), define("extensions/scrollLink", [ "jquery", "underscore", "classes/Extension", "text!html/scrollLinkSettingsBlock.html", "libs/css_browser_selector", "libs/jquery.mousewheel" ], function(e, n, t, o) {
 function i(e) {
  return parseFloat(e.substring(0, e.length - 2));
 }
 var r = new t("scrollLink", "Scroll Link", !0, !0);
 r.settingsBlock = o;
 var a = void 0;
 r.onSectionsCreated = function(e) {
  a = e;
 };
 var s = void 0, l = void 0, c = void 0, d = [], u = [], p = void 0, f = void 0, h = n.debounce(function() {
  function t(e) {
   var n = o;
   0 !== e.length && (c.val(e), n += c.prop("scrollHeight"));
   var t = r + n;
   d.push({
    startOffset: r,
    endOffset: t,
    height: n
   }), r = t, o = 0;
  }
  d = [], c.width(s.width());
  var o = i(s.css("padding-top")), r = 0;
  n.each(a, function(e, n) {
   n !== a.length - 1 ? e = e.substring(0, e.length - 1) : o += i(s.css("padding-bottom")), 
   t(e);
  }), u = [];
  var h = 0, g = l.scrollTop();
  l.find(".preview-content > .wmd-title").each(function() {
   var n = e(this), t = n.position().top + g + i(n.css("margin-top"));
   u.push({
    startOffset: h,
    endOffset: t,
    height: t - h
   }), h = t;
  });
  var m = l.prop("scrollHeight");
  u.push({
   startOffset: h,
   endOffset: m,
   height: m - h
  }), p = -10, f = -10, b();
 }, 500), g = !1, m = !1, b = n.debounce(function() {
  function e(e, t, o, i, r, a) {
   var s = void 0, l = n.find(t, function(n, t) {
    return s = t, e < n.endOffset;
   });
   if (void 0 !== l) {
    var c = (e - l.startOffset) / l.height, d = i[s], u = d.startOffset + d.height * c;
    return u = n.min([ u, o.prop("scrollHeight") - o.outerHeight() ]), Math.abs(u - r) <= 9 ? (a(r), 
    void 0) : (o.animate({
     scrollTop: u
    }, 500, function() {
     a(u);
    }), void 0);
   }
  }
  if (0 !== d.length && d.length === u.length) {
   var t = s.scrollTop(), o = l.scrollTop();
   g === !0 && Math.abs(t - p) > 9 ? (g = !1, p = t, e(t, d, l, u, o, function(e) {
    f = e;
   })) : m === !0 && Math.abs(o - f) > 9 && (m = !1, f = o, e(o, u, s, d, t, function(e) {
    p = e;
   }));
  }
 }, 500);
 r.onLayoutConfigure = function(e) {
  e.onresize = function() {
   g = !0, h();
  };
 }, r.onLayoutCreated = function() {
  s = e("#wmd-input"), l = e(".preview-container"), c = e("#md-section-helper"), e(".preview-container").bind("keyup mouseup mousewheel", function() {
   m = !0, g = !1, b();
  }), e("#wmd-input").bind("keyup mouseup mousewheel", function() {
   g = !0, m = !1, b();
  });
 };
 var v = void 0;
 return r.onEditorConfigure = function(n) {
  v = e("#preview-contents"), n.getConverter().hooks.chain("postConversion", function(e) {
   return v.height(v.height()), e;
  });
 }, r.onPreviewFinished = function() {
  v.height("auto"), g = !0, h();
 }, r;
}), define("text!html/buttonSync.html", [], function() {
 return '<button class="btn btn-default" title="Synchronize all documents">\n	<i class="icon-refresh"></i>\n</button>';
}), define("text!html/buttonSyncSettingsBlock.html", [], function() {
 return '<p>Adds a "Synchronize documents" button in the navigation bar.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="input-sync-period">Sync\n			period (0: manual)</label>\n		<div class="col-lg-6 form-inline">\n			<input type="text" id="input-sync-period"\n				class="col-lg-5 form-control" placeholder="180000"> ms\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonSync", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonSync.html", "text!html/buttonSyncSettingsBlock.html" ], function(e, n, t, o, i, r) {
 var a = new o("buttonSync", 'Button "Synchronize"');
 a.settingsBlock = r, a.defaultConfig = {
  syncPeriod: 18e4
 }, a.onLoadSettings = function() {
  t.setInputValue("#input-sync-period", a.config.syncPeriod);
 }, a.onSaveSettings = function(e, n) {
  e.syncPeriod = t.getInputIntValue("#input-sync-period", n, 0);
 };
 var s = void 0;
 a.onSynchronizerCreated = function(e) {
  s = e;
 };
 var l = void 0, c = !1, d = !1, u = function() {
  void 0 !== l && (c === !0 || s.hasSync() === !1 || d ? l.addClass("disabled") : l.removeClass("disabled"));
 }, p = 0;
 return a.onPeriodicRun = function() {
  viewerMode === !0 || !a.config.syncPeriod || p + a.config.syncPeriod > t.currentTime || s.sync() === !0 && (p = t.currentTime);
 }, a.onCreateButton = function() {
  return l = e(i).click(function() {
   e(this).hasClass("disabled") || s.sync();
  }), l[0];
 }, a.onReady = u, a.onFileCreated = u, a.onFileDeleted = u, a.onSyncImportSuccess = u, 
 a.onSyncExportSuccess = u, a.onSyncRemoved = u, a.onSyncRunning = function(e) {
  c = e, u();
 }, a.onOfflineChanged = function(e) {
  d = e, u();
 }, a;
}), define("text!html/buttonPublish.html", [], function() {
 return '<button class="btn btn-default" title="Publish this document">\n	<i class="icon-share"></i>\n</button>';
}), define("extensions/buttonPublish", [ "jquery", "underscore", "classes/Extension", "text!html/buttonPublish.html" ], function(e, n, t, o) {
 function i() {
  void 0 !== a && (l === !0 || c === !1 || d === !0 ? a.addClass("disabled") : a.removeClass("disabled"));
 }
 var r = new t("buttonPublish", 'Button "Publish"'), a = void 0, s = void 0, l = !1, c = !1, d = !1, u = void 0;
 r.onPublisherCreated = function(e) {
  u = e;
 }, r.onCreateButton = function() {
  return a = e(o).click(function() {
   e(this).hasClass("disabled") || u.publish();
  }), a[0];
 }, r.onPublishRunning = function(e) {
  l = e, i();
 }, r.onOfflineChanged = function(e) {
  d = e, i();
 };
 var p = function() {
  c = 0 === n.size(s.publishLocations) ? !1 : !0, i();
 };
 return r.onFileSelected = function(e) {
  s = e, p();
 }, r.onPublishRemoved = p, r.onNewPublishSuccess = p, r;
}), define("text!html/buttonShare.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown"\n	title="Share this document">\n	<i class="icon-link"></i>\n</button>\n<div class="dropdown-menu pull-right link-container">\n	<h3 class="muted">Sharing</h3>\n	<div class="link-list"></div>\n	<p class="no-link">To share this document you need first to <a\n		href="#" class="action-publish-gist">publish it as a Gist</a> in\n		Markdown format.\n	</p>\n	<blockquote class="muted">\n		<b>NOTE:</b> You can open any URL within StackEdit using <a\n			href="viewer.html?url=https://raw.github.com/benweet/stackedit/master/README.md"\n			title="Sharing example">viewer.html?url=...</a>\n	</blockquote>\n</div>\n';
}), define("text!html/buttonShareLocation.html", [], function() {
 return '<div class="input-group">\n	<div class="input-group-btn"><a href="<%= link %>" class="btn btn-info" title="Sharing location"><i\n		class="icon-link"></i></a></div> <input class="col-lg-5 form-control" type="text"\n		value="<%= link %>" readonly />\n</div>\n';
}), define("extensions/buttonShare", [ "jquery", "underscore", "classes/Extension", "text!html/buttonShare.html", "text!html/buttonShareLocation.html" ], function(e, n, t, o, i) {
 var r = new t("buttonShare", 'Button "Share"', !0);
 r.settingsBlock = '<p>Adds a "Share document" button in the navigation bar.</p>', 
 r.onCreateButton = function() {
  return o;
 };
 var a = void 0, s = function(t) {
  if (void 0 === t || t === a) {
   var o = e(".link-container .link-list").empty();
   e(".link-container .no-link").show();
   var r = n.values(a.publishLocations);
   n.each(r, function(t) {
    if (t.sharingLink) {
     var r = e(n.template(i, {
      link: t.sharingLink
     }));
     o.append(r), e(".link-container .no-link").hide();
    }
   });
  }
 };
 return r.onFileSelected = function(e) {
  a = e, s(e);
 }, r.onNewPublishSuccess = s, r.onPublishRemoved = s, r;
}), define("text!html/buttonStat.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Document statistics" data-toggle="dropdown">\n	<i class="icon-chart-bar"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Statistics</h3>\n	<div class="stat">\n		<div>\n			<%= name1 %>: <span id="span-stat-value1"></span>\n		</div>\n		<div>\n			<%= name2 %>: <span id="span-stat-value2"></span>\n		</div>\n		<div>\n			<%= name3 %>: <span id="span-stat-value3"></span>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/buttonStatSettingsBlock.html", [], function() {
 return '<p>Adds a "Document statistics" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name1">Title</label> <input\n			id="input-stat-name1" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value1">RegExp</label> <input\n			id="input-stat-value1" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name2">Title</label> <input\n			id="input-stat-name2" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value2">RegExp</label> <input\n			id="input-stat-value2" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name3">Title</label> <input\n			id="input-stat-name3" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value3">RegExp</label> <input\n			id="input-stat-value3" type="text" class="form-control col-lg-4">\n	</div>\n</div>\n';
}), define("extensions/buttonStat", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonStat.html", "text!html/buttonStatSettingsBlock.html" ], function(e, n, t, o, i, r) {
 var a = new o("buttonStat", 'Button "Statistics"', !0, !0);
 a.settingsBlock = r, a.defaultConfig = {
  name1: "Characters",
  value1: "\\S",
  name2: "Words",
  value2: "\\S+",
  name3: "Paragraphs",
  value3: "\\S.*"
 }, a.onLoadSettings = function() {
  n.each([ 1, 2, 3 ], function(e) {
   t.setInputValue("#input-stat-name" + e, a.config["name" + e]), t.setInputValue("#input-stat-value" + e, a.config["value" + e]);
  });
 }, a.onSaveSettings = function(e, o) {
  n.each([ 1, 2, 3 ], function(n) {
   e["name" + n] = t.getInputTextValue("#input-stat-name" + n, o), e["value" + n] = t.getInputRegExpValue("#input-stat-value" + n, o);
  });
 }, a.onCreatePreviewButton = function() {
  return n.template(i, a.config);
 };
 var s = void 0, l = void 0, c = void 0, d = void 0;
 return a.onReady = function() {
  s = document.getElementById("preview-contents"), l = document.getElementById("span-stat-value1"), 
  c = document.getElementById("span-stat-value2"), d = document.getElementById("span-stat-value3");
 }, a.onPreviewFinished = function() {
  for (var e = s.cloneNode(!0), n = e.getElementsByTagName("script"), t = n.length - 1; t >= 0; t--) {
   var o = n[t];
   o.parentNode.removeChild(o);
  }
  var i = e.textContent;
  l.textContent = (i.match(new RegExp(a.config.value1, "g")) || []).length, c.textContent = (i.match(new RegExp(a.config.value2, "g")) || []).length, 
  d.textContent = (i.match(new RegExp(a.config.value3, "g")) || []).length;
 }, a;
}), define("text!html/buttonHtmlCode.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle action-html-code" title="HTML code" data-toggle="dropdown">\n	<i class="icon-code"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>HTML code</h3>\n	<textarea id="input-html-code" class="form-control"></textarea>\n</div>\n';
}), define("text!html/buttonHtmlCodeSettingsBlock.html", [], function() {
 return '<p>Adds a "HTML code" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="textarea-html-code-template">Template\n			<a href="#" class="tooltip-template">(?)</a>\n		</label>\n		<div class="col-lg-7">\n			<textarea id="textarea-html-code-template" class="form-control"></textarea>\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonHtmlCode", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonHtmlCode.html", "text!html/buttonHtmlCodeSettingsBlock.html" ], function(e, n, t, o, i, r) {
 var a = new o("buttonHtmlCode", 'Button "HTML code"', !0, !0);
 a.settingsBlock = r, a.defaultConfig = {
  template: "<%= documentHTML %>"
 }, a.onLoadSettings = function() {
  t.setInputValue("#textarea-html-code-template", a.config.template);
 }, a.onSaveSettings = function(e) {
  e.template = t.getInputValue("#textarea-html-code-template");
 };
 var s = void 0;
 a.onEventMgrCreated = function(e) {
  s = e;
 }, a.onCreatePreviewButton = function() {
  return i;
 };
 var l = void 0;
 a.onFileSelected = function(e) {
  l = e;
 };
 var c = void 0;
 return a.onPreviewFinished = function(e) {
  try {
   var t = n.template(a.config.template, {
    documentTitle: l.title,
    documentMarkdown: l.content,
    documentHTML: e
   });
   c.value = t;
  } catch (o) {
   return s.onError(o), o.message;
  }
 }, a.onReady = function() {
  c = document.getElementById("input-html-code"), e(".action-html-code").click(function() {
   n.defer(function() {
    e("#input-html-code").each(function() {
     e(this).is(":hidden") || e(this).get(0).select();
    });
   });
  });
 }, a;
}), define("text!html/buttonMarkdownSyntax.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Markdown syntax" data-toggle="dropdown">\n	<i class="icon-help-circled"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Markdown syntax</h3>\n	<div class="markdown-syntax">\n<h4>Phrase Emphasis</h4>\n\n<pre><code>*italic*   **bold**\n_italic_   __bold__\n</code></pre>\n\n<h4>Links</h4>\n\n<p>Inline:</p>\n\n<pre><code>An [example](http://url.com/ "Title")\n</code></pre>\n\n<p>Reference-style labels (titles are optional):</p>\n\n<pre><code>An [example][id]. Then, anywhere\nelse in the doc, define the link:\n\n  [id]: http://example.com/  "Title"\n</code></pre>\n\n<h4>Images</h4>\n\n<p>Inline (titles are optional):</p>\n\n<pre><code>![alt text](/path/img.jpg "Title")\n</code></pre>\n\n<p>Reference-style:</p>\n\n<pre><code>![alt text][id]\n\n[id]: /url/to/img.jpg "Title"\n</code></pre>\n\n<h4>Headers</h4>\n\n<p>Setext-style:</p>\n\n<pre><code>Header 1\n========\n\nHeader 2\n--------\n</code></pre>\n\n<p>atx-style (closing #\'s are optional):</p>\n\n<pre><code># Header 1 #\n\n## Header 2 ##\n\n###### Header 6\n</code></pre>\n\n<h4>Lists</h4>\n\n<p>Ordered, without paragraphs:</p>\n\n<pre><code>1.  Foo\n2.  Bar\n</code></pre>\n\n<p>Unordered, with paragraphs:</p>\n\n<pre><code>*   A list item.\n\n    With multiple paragraphs.\n\n*   Bar\n</code></pre>\n\n<p>You can nest them:</p>\n\n<pre><code>*   Abacus\n    * answer\n*   Bubbles\n    1.  bunk\n    2.  bupkis\n        * BELITTLER\n    3. burper\n*   Cunning\n</code></pre>\n\n<h4>Blockquotes</h4>\n\n<pre><code>&gt; Email-style angle brackets\n&gt; are used for blockquotes.\n\n&gt; &gt; And, they can be nested.\n\n&gt; #### Headers in blockquotes\n&gt; \n&gt; * You can quote a list.\n&gt; * Etc.\n</code></pre>\n\n<h4>Code Spans</h4>\n\n<pre><code>`&lt;code&gt;` spans are delimited\nby backticks.\n\nYou can include literal backticks\nlike `` `this` ``.\n</code></pre>\n\n<h4>Preformatted Code Blocks</h4>\n\n<p>Indent every line of a code block by at least 4 spaces or 1 tab.</p>\n\n<pre><code>This is a normal paragraph.\n\n    This is a preformatted\n    code block.\n</code></pre>\n\n<h4>Horizontal Rules</h4>\n\n<p>Three or more dashes or asterisks:</p>\n\n<pre><code>---\n\n* * *\n\n- - - - \n</code></pre>\n\n<h4>Manual Line Breaks</h4>\n\n<p>End a line with two or more spaces:</p>\n\n<pre><code>Roses are red,   \nViolets are blue.\n</code></pre>\n\n<p class="muted">Based on the <a target="_blank" href="https://github.com/fletcher/MultiMarkdown/blob/master/Documentation/Markdown%20Syntax.md">Markdown syntax guide</a>, by Fletcher T. Penney.</p>\n    </div>\n</div>\n';
}), define("extensions/buttonMarkdownSyntax", [ "jquery", "classes/Extension", "text!html/buttonMarkdownSyntax.html" ], function(e, n, t) {
 var o = new n("buttonMarkdownSyntax", 'Button "Markdown syntax', !0);
 return o.settingsBlock = '<p>Adds a "Markdown syntax" button over the preview.</p>', 
 o.onCreatePreviewButton = function() {
  return t;
 }, o;
}), define("text!html/buttonViewer.html", [], function() {
 return '<a href="viewer.html" class="btn btn-default dropdown-toggle"\n	title="Open in viewer">\n	<i class="icon-resize-full"></i>\n</a>\n';
}), define("extensions/buttonViewer", [ "jquery", "classes/Extension", "text!html/buttonViewer.html" ], function(e, n, t) {
 var o = new n("buttonViewer", 'Button "Viewer"', !0);
 return o.settingsBlock = '<p>Adds a "Viewer" button over the preview.</p>', o.onCreatePreviewButton = function() {
  return t;
 }, o;
}), !jQuery) throw new Error("Bootstrap requires jQuery");

+function(e) {
 function n() {
  var e = document.createElement("bootstrap"), n = {
   WebkitTransition: "webkitTransitionEnd",
   MozTransition: "transitionend",
   OTransition: "oTransitionEnd otransitionend",
   transition: "transitionend"
  };
  for (var t in n) if (void 0 !== e.style[t]) return {
   end: n[t]
  };
 }
 e.fn.emulateTransitionEnd = function(n) {
  var t = !1, o = this;
  e(this).one("webkitTransitionEnd", function() {
   t = !0;
  });
  var i = function() {
   t || e(o).trigger("webkitTransitionEnd");
  };
  return setTimeout(i, n), this;
 }, e(function() {
  e.support.transition = n();
 });
}(window.jQuery), +function(e) {
 var n = '[data-dismiss="alert"]', t = function(t) {
  e(t).on("click", n, this.close);
 };
 t.prototype.close = function(n) {
  function t() {
   r.trigger("closed.bs.alert").remove();
  }
  var o = e(this), i = o.attr("data-target");
  i || (i = o.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
  var r = e(i);
  n && n.preventDefault(), r.length || (r = o.hasClass("alert") ? o : o.parent()), 
  r.trigger(n = e.Event("close.bs.alert")), n.isDefaultPrevented() || (r.removeClass("in"), 
  e.support.transition && r.hasClass("fade") ? r.one(e.support.transition.end, t).emulateTransitionEnd(150) : t());
 };
 var o = e.fn.alert;
 e.fn.alert = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.alert");
   i || o.data("bs.alert", i = new t(this)), "string" == typeof n && i[n].call(o);
  });
 }, e.fn.alert.Constructor = t, e.fn.alert.noConflict = function() {
  return e.fn.alert = o, this;
 }, e(document).on("click.bs.alert.data-api", n, t.prototype.close);
}(window.jQuery), +function(e) {
 var n = function(t, o) {
  this.$element = e(t), this.options = e.extend({}, n.DEFAULTS, o);
 };
 n.DEFAULTS = {
  loadingText: "loading..."
 }, n.prototype.setState = function(e) {
  var n = "disabled", t = this.$element, o = t.is("input") ? "val" : "html", i = t.data();
  e += "Text", i.resetText || t.data("resetText", t[o]()), t[o](i[e] || this.options[e]), 
  setTimeout(function() {
   "loadingText" == e ? t.addClass(n).attr(n, n) : t.removeClass(n).removeAttr(n);
  }, 0);
 }, n.prototype.toggle = function() {
  var e = this.$element.closest('[data-toggle="buttons"]');
  if (e.length) {
   var n = this.$element.find("input").prop("checked", !this.$element.hasClass("active"));
   "radio" === n.prop("type") && e.find(".active").removeClass("active");
  }
  this.$element.toggleClass("active");
 };
 var t = e.fn.button;
 e.fn.button = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("button"), r = "object" == typeof t && t;
   i || o.data("bs.button", i = new n(this, r)), "toggle" == t ? i.toggle() : t && i.setState(t);
  });
 }, e.fn.button.Constructor = n, e.fn.button.noConflict = function() {
  return e.fn.button = t, this;
 }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(n) {
  var t = e(n.target);
  t.hasClass("btn") || (t = t.closest(".btn")), t.button("toggle"), n.preventDefault();
 });
}(window.jQuery), +function(e) {
 var n = function(n, t) {
  this.$element = e(n), this.$indicators = this.$element.find(".carousel-indicators"), 
  this.options = t, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
  "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this));
 };
 n.DEFAULTS = {
  interval: 5e3,
  pause: "hover"
 }, n.prototype.cycle = function(n) {
  return n || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), 
  this;
 }, n.prototype.getActiveIndex = function() {
  return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), 
  this.$items.index(this.$active);
 }, n.prototype.to = function(n) {
  var t = this, o = this.getActiveIndex();
  return n > this.$items.length - 1 || 0 > n ? void 0 : this.sliding ? this.$element.one("slid", function() {
   t.to(n);
  }) : o == n ? this.pause().cycle() : this.slide(n > o ? "next" : "prev", e(this.$items[n]));
 }, n.prototype.pause = function(n) {
  return n || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), 
  this.cycle(!0)), this.interval = clearInterval(this.interval), this;
 }, n.prototype.next = function() {
  return this.sliding ? void 0 : this.slide("next");
 }, n.prototype.prev = function() {
  return this.sliding ? void 0 : this.slide("prev");
 }, n.prototype.slide = function(n, t) {
  var o = this.$element.find(".item.active"), i = t || o[n](), r = this.interval, a = "next" == n ? "left" : "right", s = "next" == n ? "first" : "last", l = this;
  this.sliding = !0, r && this.pause(), i = i.length ? i : this.$element.find(".item")[s]();
  var c = e.Event("slide.bs.carousel", {
   relatedTarget: i[0],
   direction: a
  });
  if (!i.hasClass("active")) {
   if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
   this.$element.one("slid", function() {
    var n = e(l.$indicators.children()[l.getActiveIndex()]);
    n && n.addClass("active");
   })), e.support.transition && this.$element.hasClass("slide")) {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    i.addClass(n), i[0].offsetWidth, o.addClass(a), i.addClass(a), o.one(e.support.transition.end, function() {
     i.removeClass([ n, a ].join(" ")).addClass("active"), o.removeClass([ "active", a ].join(" ")), 
     l.sliding = !1, setTimeout(function() {
      l.$element.trigger("slid");
     }, 0);
    }).emulateTransitionEnd(600);
   } else {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    o.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
   }
   return r && this.cycle(), this;
  }
 };
 var t = e.fn.carousel;
 e.fn.carousel = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.carousel"), r = e.extend({}, n.DEFAULTS, o.data(), "object" == typeof t && t), a = "string" == typeof t ? t : r.slide;
   i || o.data("bs.carousel", i = new n(this, r)), "number" == typeof t ? i.to(t) : a ? i[a]() : r.interval && i.pause().cycle();
  });
 }, e.fn.carousel.Constructor = n, e.fn.carousel.noConflict = function() {
  return e.fn.carousel = t, this;
 }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(n) {
  var t, o = e(this), i = e(o.attr("data-target") || (t = o.attr("href")) && t.replace(/.*(?=#[^\s]+$)/, "")), r = e.extend({}, i.data(), o.data()), a = o.attr("data-slide-to");
  a && (r.interval = !1), i.carousel(r), (a = o.attr("data-slide-to")) && i.data("bs.carousel").to(a), 
  n.preventDefault();
 }), e(window).on("load", function() {
  e('[data-ride="carousel"]').each(function() {
   var n = e(this);
   n.carousel(n.data());
  });
 });
}(window.jQuery), +function(e) {
 var n = function(t, o) {
  this.$element = e(t), this.options = e.extend({}, n.DEFAULTS, o), this.transitioning = null, 
  this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle();
 };
 n.DEFAULTS = {
  toggle: !0
 }, n.prototype.dimension = function() {
  var e = this.$element.hasClass("width");
  return e ? "width" : "height";
 }, n.prototype.show = function() {
  if (!this.transitioning && !this.$element.hasClass("in")) {
   var n = e.Event("show.bs.collapse");
   if (this.$element.trigger(n), !n.isDefaultPrevented()) {
    var t = this.$parent && this.$parent.find("> .accordion-group > .in");
    if (t && t.length) {
     var o = t.data("bs.collapse");
     if (o && o.transitioning) return;
     t.collapse("hide"), o || t.data("bs.collapse", null);
    }
    var i = this.dimension();
    this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1;
    var r = function() {
     this.$element.removeClass("collapsing").addClass("in")[i]("auto"), this.transitioning = 0, 
     this.$element.trigger("shown.bs.collapse");
    };
    if (!e.support.transition) return r.call(this);
    var a = e.camelCase([ "scroll", i ].join("-"));
    this.$element.one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350)[i](this.$element[0][a]);
   }
  }
 }, n.prototype.hide = function() {
  if (!this.transitioning && this.$element.hasClass("in")) {
   var n = e.Event("hide.bs.collapse");
   if (this.$element.trigger(n), !n.isDefaultPrevented()) {
    var t = this.dimension();
    this.$element[t](this.$element[t]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
    this.transitioning = 1;
    var o = function() {
     this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
    };
    return e.support.transition ? (this.$element[t](0).one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350), 
    void 0) : o.call(this);
   }
  }
 }, n.prototype.toggle = function() {
  this[this.$element.hasClass("in") ? "hide" : "show"]();
 };
 var t = e.fn.collapse;
 e.fn.collapse = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.collapse"), r = e.extend({}, n.DEFAULTS, o.data(), "object" == typeof t && t);
   i || o.data("bs.collapse", i = new n(this, r)), "string" == typeof t && i[t]();
  });
 }, e.fn.collapse.Constructor = n, e.fn.collapse.noConflict = function() {
  return e.fn.collapse = t, this;
 }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(n) {
  var t, o = e(this), i = o.attr("data-target") || n.preventDefault() || (t = o.attr("href")) && t.replace(/.*(?=#[^\s]+$)/, ""), r = e(i), a = r.data("bs.collapse"), s = a ? "toggle" : o.data(), l = o.attr("data-parent"), c = l && e(l);
  a && a.transitioning || (c && c.find("[data-toggle=collapse][data-parent=" + l + "]").not(o).addClass("collapsed"), 
  o[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(s);
 });
}(window.jQuery), +function(e) {
 function n() {
  e(o).remove(), e(i).each(function(n) {
   var o = t(e(this));
   o.hasClass("open") && (o.trigger(n = e.Event("hide.bs.dropdown")), n.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown"));
  });
 }
 function t(n) {
  var t = n.attr("data-target");
  t || (t = n.attr("href"), t = t && /#/.test(t) && t.replace(/.*(?=#[^\s]*$)/, ""));
  var o = t && e(t);
  return o && o.length ? o : n.parent();
 }
 var o = ".dropdown-backdrop", i = "[data-toggle=dropdown]", r = function(n) {
  e(n).on("click.bs.dropdown", this.toggle);
 };
 r.prototype.toggle = function(o) {
  var i = e(this);
  if (!i.is(".disabled, :disabled")) {
   var r = t(i), a = r.hasClass("open");
   if (n(), !a) {
    if ("ontouchstart" in document.documentElement && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", n), 
    r.trigger(o = e.Event("show.bs.dropdown")), o.isDefaultPrevented()) return;
    r.toggleClass("open").trigger("shown.bs.dropdown");
   }
   return i.focus(), !1;
  }
 }, r.prototype.keydown = function(n) {
  if (/(38|40|27)/.test(n.keyCode)) {
   var o = e(this);
   if (n.preventDefault(), n.stopPropagation(), !o.is(".disabled, :disabled")) {
    var r = t(o), a = r.hasClass("open");
    if (!a || a && 27 == n.keyCode) return 27 == n.which && r.find(i).focus(), o.click();
    var s = e("[role=menu] li:not(.divider):visible a", r);
    if (s.length) {
     var l = s.index(s.filter(":focus"));
     38 == n.keyCode && l > 0 && l--, 40 == n.keyCode && l < s.length - 1 && l++, ~l || (l = 0), 
     s.eq(l).focus();
    }
   }
  }
 };
 var a = e.fn.dropdown;
 e.fn.dropdown = function(n) {
  return this.each(function() {
   var t = e(this), o = t.data("dropdown");
   o || t.data("dropdown", o = new r(this)), "string" == typeof n && o[n].call(t);
  });
 }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() {
  return e.fn.dropdown = a, this;
 }, e(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
  e.stopPropagation();
 }).on("click.bs.dropdown.data-api", i, r.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", r.prototype.keydown);
}(window.jQuery), +function(e) {
 var n = function(n, t) {
  this.options = t, this.$element = e(n).on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), 
  this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
 };
 n.DEFAULTS = {
  backdrop: !0,
  keyboard: !0,
  show: !0
 }, n.prototype.toggle = function() {
  return this[this.isShown ? "hide" : "show"]();
 }, n.prototype.show = function() {
  var n = this, t = e.Event("show.bs.modal");
  this.$element.trigger(t), this.isShown || t.isDefaultPrevented() || (this.isShown = !0, 
  this.escape(), this.backdrop(function() {
   var t = e.support.transition && n.$element.hasClass("fade");
   n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show(), 
   t && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), 
   n.enforceFocus(), t ? n.$element.one(e.support.transition.end, function() {
    n.$element.focus().trigger("shown.bs.modal");
   }).emulateTransitionEnd(300) : n.$element.focus().trigger("shown.bs.modal");
  }));
 }, n.prototype.hide = function(n) {
  n && n.preventDefault(), n = e.Event("hide.bs.modal"), this.$element.trigger(n), 
  this.isShown && !n.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), 
  this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
 }, n.prototype.enforceFocus = function() {
  e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
   this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus();
  }, this));
 }, n.prototype.escape = function() {
  this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
   27 == e.which && this.hide();
  }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
 }, n.prototype.hideModal = function() {
  var e = this;
  this.$element.hide(), this.backdrop(function() {
   e.removeBackdrop(), e.$element.trigger("hidden.bs.modal");
  });
 }, n.prototype.removeBackdrop = function() {
  this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
 }, n.prototype.backdrop = function(n) {
  var t = this.$element.hasClass("fade") ? "fade" : "";
  if (this.isShown && this.options.backdrop) {
   var o = e.support.transition && t;
   if (this.$backdrop = e('<div class="modal-backdrop ' + t + '" />').appendTo(document.body), 
   this.$element.on("click", e.proxy(function(e) {
    e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
   }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !n) return;
   o ? this.$backdrop.one(e.support.transition.end, n).emulateTransitionEnd(150) : n();
  } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, n).emulateTransitionEnd(150) : n()) : n && n();
 };
 var t = e.fn.modal;
 e.fn.modal = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.modal"), r = e.extend({}, n.DEFAULTS, o.data(), "object" == typeof t && t);
   i || o.data("bs.modal", i = new n(this, r)), "string" == typeof t ? i[t]() : r.show && i.show();
  });
 }, e.fn.modal.Constructor = n, e.fn.modal.noConflict = function() {
  return e.fn.modal = t, this;
 }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
  var t = e(this), o = t.attr("href"), i = e(t.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")), r = i.data("modal") ? "toggle" : e.extend({
   remote: !/#/.test(o) && o
  }, i.data(), t.data());
  n.preventDefault(), i.modal(r).one("hide", function() {
   t.is(":visible") && t.focus();
  });
 });
 var o = e(document.body).on("shown.bs.modal", ".modal", function() {
  o.addClass("modal-open");
 }).on("hidden.bs.modal", ".modal", function() {
  o.removeClass("modal-open");
 });
}(window.jQuery), +function(e) {
 var n = function(e, n) {
  this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
  this.init("tooltip", e, n);
 };
 n.DEFAULTS = {
  animation: !0,
  placement: "top",
  selector: !1,
  template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: !1,
  container: !1
 }, n.prototype.init = function(n, t, o) {
  this.enabled = !0, this.type = n, this.$element = e(t), this.options = this.getOptions(o);
  for (var i = this.options.trigger.split(" "), r = i.length; r--; ) {
   var a = i[r];
   if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
    var s = "hover" == a ? "mouseenter" : "focus", l = "hover" == a ? "mouseleave" : "blur";
    this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
    this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
   }
  }
  this.options.selector ? this._options = e.extend({}, this.options, {
   trigger: "manual",
   selector: ""
  }) : this.fixTitle();
 }, n.prototype.getDefaults = function() {
  return n.DEFAULTS;
 }, n.prototype.getOptions = function(n) {
  return n = e.extend({}, this.getDefaults(), this.$element.data(), n), n.delay && "number" == typeof n.delay && (n.delay = {
   show: n.delay,
   hide: n.delay
  }), n;
 }, n.prototype.enter = function(n) {
  var t = this.getDefaults(), o = {};
  this._options && e.each(this._options, function(e, n) {
   t[e] != n && (o[e] = n);
  });
  var i = n instanceof this.constructor ? n : e(n.currentTarget)[this.type](o).data("bs." + this.type);
  return clearTimeout(i.timeout), i.options.delay && i.options.delay.show ? (i.hoverState = "in", 
  i.timeout = setTimeout(function() {
   "in" == i.hoverState && i.show();
  }, i.options.delay.show), void 0) : i.show();
 }, n.prototype.leave = function(n) {
  var t = n instanceof this.constructor ? n : e(n.currentTarget)[this.type](this._options).data("bs." + this.type);
  return clearTimeout(t.timeout), t.options.delay && t.options.delay.hide ? (t.hoverState = "out", 
  t.timeout = setTimeout(function() {
   "out" == t.hoverState && t.hide();
  }, t.options.delay.hide), void 0) : t.hide();
 }, n.prototype.show = function() {
  var n = e.Event("show.bs." + this.type);
  if (this.hasContent() && this.enabled) {
   if (this.$element.trigger(n), n.isDefaultPrevented()) return;
   var t = this.tip();
   this.setContent(), this.options.animation && t.addClass("fade");
   var o = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, r = i.test(o);
   r && (o = o.replace(i, "") || "top"), t.detach().css({
    top: 0,
    left: 0,
    display: "block"
   }).addClass(o), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element);
   var a = this.getPosition(), s = t[0].offsetWidth, l = t[0].offsetHeight;
   if (r) {
    var c = this.$element.parent(), d = o, u = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth : c.outerWidth(), f = "body" == this.options.container ? window.innerHeight : c.outerHeight(), h = "body" == this.options.container ? 0 : c.offset().left;
    o = "bottom" == o && a.top + a.height + l - u > f ? "top" : "top" == o && a.top - u - l < 0 ? "bottom" : "right" == o && a.right + s > p ? "left" : "left" == o && a.left - s < h ? "right" : o, 
    t.removeClass(d).addClass(o);
   }
   var g = "bottom" == o ? {
    top: a.top + a.height,
    left: a.left + a.width / 2 - s / 2
   } : "top" == o ? {
    top: a.top - l,
    left: a.left + a.width / 2 - s / 2
   } : "left" == o ? {
    top: a.top + a.height / 2 - l / 2,
    left: a.left - s
   } : {
    top: a.top + a.height / 2 - l / 2,
    left: a.left + a.width
   };
   this.applyPlacement(g, o), this.$element.trigger("shown.bs." + this.type);
  }
 }, n.prototype.applyPlacement = function(e, n) {
  var t, o = this.tip(), i = o[0].offsetWidth, r = o[0].offsetHeight;
  e.top = e.top + parseInt(o.css("margin-top"), 10), e.left = e.left + parseInt(o.css("margin-left"), 10), 
  o.offset(e).addClass("in");
  var a = o[0].offsetWidth, s = o[0].offsetHeight;
  if ("top" == n && s != r && (t = !0, e.top = e.top + r - s), "bottom" == n || "top" == n) {
   var l = 0;
   e.left < 0 && (l = -2 * e.left, e.left = 0, o.offset(e), a = o[0].offsetWidth, s = o[0].offsetHeight), 
   this.replaceArrow(l - i + a, a, "left");
  } else this.replaceArrow(s - r, s, "top");
  t && o.offset(e);
 }, n.prototype.replaceArrow = function(e, n, t) {
  this.arrow().css(t, e ? 50 * (1 - e / n) + "%" : "");
 }, n.prototype.setContent = function() {
  var e = this.tip(), n = this.getTitle();
  e.find(".tooltip-inner")[this.options.html ? "html" : "text"](n), e.removeClass("fade in top bottom left right");
 }, n.prototype.hide = function() {
  var n = this.tip(), t = e.Event("hide.bs." + this.type);
  return this.$element.trigger(t), t.isDefaultPrevented() ? void 0 : (n.removeClass("in"), 
  e.support.transition && this.$tip.hasClass("fade") ? n.one(e.support.transition.end, n.detach).emulateTransitionEnd(150) : n.detach(), 
  this.$element.trigger("hidden.bs." + this.type), this);
 }, n.prototype.fixTitle = function() {
  var e = this.$element;
  (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
 }, n.prototype.hasContent = function() {
  return this.getTitle();
 }, n.prototype.getPosition = function() {
  var n = this.$element[0];
  return e.extend({}, "function" == typeof n.getBoundingClientRect ? n.getBoundingClientRect() : {
   width: n.offsetWidth,
   height: n.offsetHeight
  }, this.$element.offset());
 }, n.prototype.getTitle = function() {
  var e, n = this.$element, t = this.options;
  return e = n.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(n[0]) : t.title);
 }, n.prototype.tip = function() {
  return this.$tip = this.$tip || e(this.options.template);
 }, n.prototype.arrow = function() {
  return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
 }, n.prototype.validate = function() {
  this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
 }, n.prototype.enable = function() {
  this.enabled = !0;
 }, n.prototype.disable = function() {
  this.enabled = !1;
 }, n.prototype.toggleEnabled = function() {
  this.enabled = !this.enabled;
 }, n.prototype.toggle = function(n) {
  var t = n ? e(n.currentTarget)[this.type](this._options).data("bs." + this.type) : this;
  t.tip().hasClass("in") ? t.leave(t) : t.enter(t);
 }, n.prototype.destroy = function() {
  this.hide().$element.off("." + this.type).removeData("bs." + this.type);
 };
 var t = e.fn.tooltip;
 e.fn.tooltip = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.tooltip"), r = "object" == typeof t && t;
   i || o.data("bs.tooltip", i = new n(this, r)), "string" == typeof t && i[t]();
  });
 }, e.fn.tooltip.Constructor = n, e.fn.tooltip.noConflict = function() {
  return e.fn.tooltip = t, this;
 };
}(window.jQuery), +function(e) {
 var n = function(e, n) {
  this.init("popover", e, n);
 };
 if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
 n.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
  placement: "right",
  trigger: "click",
  content: "",
  template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
 }), n.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, 
 n.prototype.getDefaults = function() {
  return n.DEFAULTS;
 }, n.prototype.setContent = function() {
  var e = this.tip(), n = this.getTitle(), t = this.getContent();
  e.find(".popover-title")[this.options.html ? "html" : "text"](n), e.find(".popover-content")[this.options.html ? "html" : "text"](t), 
  e.removeClass("fade top bottom left right in"), e.find(".popover-title:empty").hide();
 }, n.prototype.hasContent = function() {
  return this.getTitle() || this.getContent();
 }, n.prototype.getContent = function() {
  var e = this.$element, n = this.options;
  return e.attr("data-content") || ("function" == typeof n.content ? n.content.call(e[0]) : n.content);
 }, n.prototype.tip = function() {
  return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
 }, n.prototype.destroy = function() {
  this.hide().$element.off("." + this.type).removeData(this.type);
 };
 var t = e.fn.popover;
 e.fn.popover = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.popover"), r = "object" == typeof t && t;
   i || o.data("bs.popover", i = new n(this, r)), "string" == typeof t && i[t]();
  });
 }, e.fn.popover.Constructor = n, e.fn.popover.noConflict = function() {
  return e.fn.popover = t, this;
 };
}(window.jQuery), +function(e) {
 function n(t, o) {
  var i, r = e.proxy(this.process, this);
  this.$element = e(t).is("body") ? e(window) : e(t), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", r), 
  this.options = e.extend({}, n.DEFAULTS, o), this.selector = (this.options.target || (i = e(t).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
  this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), 
  this.process();
 }
 n.DEFAULTS = {
  offset: 10
 }, n.prototype.refresh = function() {
  var n = this.$element[0] == window ? "offset" : "position";
  this.offsets = e([]), this.targets = e([]);
  var t = this;
  this.$body.find(this.selector).map(function() {
   var o = e(this), i = o.data("target") || o.attr("href"), r = /^#\w/.test(i) && e(i);
   return r && r.length && [ [ r[n]().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), i ] ] || null;
  }).sort(function(e, n) {
   return e[0] - n[0];
  }).each(function() {
   t.offsets.push(this[0]), t.targets.push(this[1]);
  });
 }, n.prototype.process = function() {
  var e, n = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, o = t - this.$scrollElement.height(), i = this.offsets, r = this.targets, a = this.activeTarget;
  if (n >= o) return a != (e = r.last()[0]) && this.activate(e);
  for (e = i.length; e--; ) a != r[e] && n >= i[e] && (!i[e + 1] || n <= i[e + 1]) && this.activate(r[e]);
 }, n.prototype.activate = function(n) {
  this.activeTarget = n, e(this.selector).parents(".active").removeClass("active");
  var t = this.selector + '[data-target="' + n + '"],' + this.selector + '[href="' + n + '"]', o = e(t).parents("li").addClass("active");
  o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), 
  o.trigger("activate");
 };
 var t = e.fn.scrollspy;
 e.fn.scrollspy = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.scrollspy"), r = "object" == typeof t && t;
   i || o.data("bs.scrollspy", i = new n(this, r)), "string" == typeof t && i[t]();
  });
 }, e.fn.scrollspy.Constructor = n, e.fn.scrollspy.noConflict = function() {
  return e.fn.scrollspy = t, this;
 }, e(window).on("load", function() {
  e('[data-spy="scroll"]').each(function() {
   var n = e(this);
   n.scrollspy(n.data());
  });
 });
}(window.jQuery), +function(e) {
 var n = function(n) {
  this.element = e(n);
 };
 n.prototype.show = function() {
  var n = this.element, t = n.closest("ul:not(.dropdown-menu)"), o = n.attr("data-target");
  if (o || (o = n.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !n.parent("li").hasClass("active")) {
   var i = t.find(".active:last a")[0], r = e.Event("show.bs.tab", {
    relatedTarget: i
   });
   if (n.trigger(r), !r.isDefaultPrevented()) {
    var a = e(o);
    this.activate(n.parent("li"), t), this.activate(a, a.parent(), function() {
     n.trigger({
      type: "shown.bs.tab",
      relatedTarget: i
     });
    });
   }
  }
 }, n.prototype.activate = function(n, t, o) {
  function i() {
   r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
   n.addClass("active"), a ? (n[0].offsetWidth, n.addClass("in")) : n.removeClass("fade"), 
   n.parent(".dropdown-menu") && n.closest("li.dropdown").addClass("active"), o && o();
  }
  var r = t.find("> .active"), a = o && e.support.transition && r.hasClass("fade");
  a ? r.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), r.removeClass("in");
 };
 var t = e.fn.tab;
 e.fn.tab = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.tab");
   i || o.data("bs.tab", i = new n(this)), "string" == typeof t && i[t]();
  });
 }, e.fn.tab.Constructor = n, e.fn.tab.noConflict = function() {
  return e.fn.tab = t, this;
 }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(n) {
  n.preventDefault(), e(this).tab("show");
 });
}(window.jQuery), +function(e) {
 var n = function(t, o) {
  this.options = e.extend({}, n.DEFAULTS, o), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), 
  this.$element = e(t), this.affixed = this.unpin = null, this.checkPosition();
 };
 n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
  offset: 0
 }, n.prototype.checkPositionWithEventLoop = function() {
  setTimeout(e.proxy(this.checkPosition, this), 1);
 }, n.prototype.checkPosition = function() {
  if (this.$element.is(":visible")) {
   var t = e(document).height(), o = this.$window.scrollTop(), i = this.$element.offset(), r = this.options.offset, a = r.top, s = r.bottom;
   "object" != typeof r && (s = a = r), "function" == typeof a && (a = r.top()), "function" == typeof s && (s = r.bottom());
   var l = null != this.unpin && o + this.unpin <= i.top ? !1 : null != s && i.top + this.$element.height() >= t - s ? "bottom" : null != a && a >= o ? "top" : !1;
   this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, 
   this.unpin = "bottom" == l ? i.top - o : null, this.$element.removeClass(n.RESET).addClass("affix" + (l ? "-" + l : "")), 
   "bottom" == l && this.$element.offset({
    top: document.body.offsetHeight - s - this.$element.height()
   }));
  }
 };
 var t = e.fn.affix;
 e.fn.affix = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.affix"), r = "object" == typeof t && t;
   i || o.data("bs.affix", i = new n(this, r)), "string" == typeof t && i[t]();
  });
 }, e.fn.affix.Constructor = n, e.fn.affix.noConflict = function() {
  return e.fn.affix = t, this;
 }, e(window).on("load", function() {
  e('[data-spy="affix"]').each(function() {
   var n = e(this), t = n.data();
   t.offset = t.offset || {}, t.offsetBottom && (t.offset.bottom = t.offsetBottom), 
   t.offsetTop && (t.offset.top = t.offsetTop), n.affix(t);
  });
 });
}(window.jQuery), define("libs/bootstrap/bootstrap", function() {}), function(e) {
 var n = "waitForImages";
 e.waitForImages = {
  hasImageProperties: [ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage" ]
 }, e.expr[":"].uncached = function(n) {
  if (!e(n).is('img[src!=""]')) return !1;
  var t = new Image();
  return t.src = n.src, !t.complete;
 }, e.fn.waitForImages = function(t, o, i) {
  var r = 0, a = 0;
  if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, o = arguments[0].each, 
  t = arguments[0].finished), t = t || e.noop, o = o || e.noop, i = !!i, !e.isFunction(t) || !e.isFunction(o)) throw new TypeError("An invalid callback was supplied.");
  return this.each(function() {
   var s = e(this), l = [], c = e.waitForImages.hasImageProperties || [], d = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
   i ? s.find("*").andSelf().each(function() {
    var n = e(this);
    n.is("img:uncached") && l.push({
     src: n.attr("src"),
     element: n[0]
    }), e.each(c, function(e, t) {
     var o, i = n.css(t);
     if (!i) return !0;
     for (;o = d.exec(i); ) l.push({
      src: o[2],
      element: n[0]
     });
    });
   }) : s.find("img:uncached").each(function() {
    l.push({
     src: this.src,
     element: this
    });
   }), r = l.length, a = 0, 0 === r && t.call(s[0]), e.each(l, function(i, l) {
    var c = new Image();
    e(c).bind("load." + n + " error." + n, function(e) {
     return a++, o.call(l.element, a, r, "load" == e.type), a == r ? (t.call(s[0]), !1) : void 0;
    }), c.src = l.src;
   });
  });
 };
}(jQuery), define("libs/jquery.waitforimages", function() {}), define("eventMgr", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "settings", "text!html/settingsExtensionsAccordion.html", "extensions/partialRendering", "extensions/userCustom", "extensions/googleAnalytics", "extensions/dialogAbout", "extensions/dialogManagePublication", "extensions/dialogManageSynchronization", "extensions/dialogOpenHarddrive", "extensions/documentSelector", "extensions/documentTitle", "extensions/workingIndicator", "extensions/notifications", "extensions/markdownExtra", "extensions/toc", "extensions/mathJax", "extensions/emailConverter", "extensions/scrollLink", "extensions/buttonSync", "extensions/buttonPublish", "extensions/buttonShare", "extensions/buttonStat", "extensions/buttonHtmlCode", "extensions/buttonMarkdownSyntax", "extensions/buttonViewer", "libs/bootstrap/bootstrap", "libs/jquery.waitforimages" ], function(e, n, t, o, i, r, a) {
 function s(e) {
  return n.chain(u).map(function(n) {
   return n.enabled && n[e];
  }).compact().value();
 }
 function l(e) {
  return p[e] = s(e), function() {
   logger.log(e, arguments);
   var t = arguments;
   n.each(p[e], function(e) {
    try {
     e.apply(null, t);
    } catch (n) {
     console.error(n);
    }
   });
  };
 }
 function c(e) {
  d[e] = l(e);
 }
 var d = {}, u = n.chain(arguments).map(function(e) {
  return e instanceof i && e;
 }).compact().value();
 extensionSettings = r.extensionSettings || {}, n.each(u, function(e) {
  e.config = n.extend({}, e.defaultConfig, extensionSettings[e.extensionId]), e.enabled = viewerMode === !0 && e.disableInViewer === !0 ? !1 : !e.isOptional || void 0 === e.config.enabled || e.config.enabled === !0;
 });
 var p = {};
 d.addListener = function(e, n) {
  try {
   p[e].push(n);
  } catch (t) {
   console.error("No event listener called " + e);
  }
 }, l("onInit")(), d.onLoadSettings = function() {
  logger.log("onLoadSettings"), n.each(u, function(e) {
   o.setInputChecked("#input-enable-extension-" + e.extensionId, e.enabled === !0);
   var n = e.onLoadSettings;
   n && n();
  });
 }, d.onSaveSettings = function(e, t) {
  logger.log("onSaveSettings"), n.each(u, function(i) {
   var r = n.extend({}, i.defaultConfig);
   r.enabled = o.getInputChecked("#input-enable-extension-" + i.extensionId);
   var a = i.onSaveSettings;
   a && a(r, t), e[i.extensionId] = r;
  });
 }, c("onMessage"), c("onError"), c("onOfflineChanged"), c("onUserActive"), c("onAsyncRunning", !0), 
 c("onPeriodicRun", !0), c("onFileMgrCreated"), c("onSynchronizerCreated"), c("onPublisherCreated"), 
 c("onEventMgrCreated"), c("onFileCreated"), c("onFileDeleted"), c("onFileSelected"), 
 c("onFileOpen"), c("onFileClosed"), c("onContentChanged"), c("onTitleChanged"), 
 c("onSyncRunning"), c("onSyncSuccess"), c("onSyncImportSuccess"), c("onSyncExportSuccess"), 
 c("onSyncRemoved"), c("onPublishRunning"), c("onPublishSuccess"), c("onNewPublishSuccess"), 
 c("onPublishRemoved"), c("onLayoutConfigure"), c("onLayoutCreated"), c("onEditorConfigure"), 
 c("onSectionsCreated");
 var f = l("onPreviewFinished"), h = s("onAsyncPreview"), g = h.length + 1, m = void 0, b = void 0;
 d.onAsyncPreview = function() {
  function e() {
   ++t === g && (logger.log("Preview time: " + (new Date() - d.previewStartTime)), 
   n.defer(function() {
    var e = "";
    n.each(m.children, function(n) {
     e += n.innerHTML;
    }), f(o.trim(e));
   }));
  }
  logger.log("onAsyncPreview"), logger.log("Conversion time: " + (new Date() - d.previewStartTime));
  var t = 0;
  b.waitForImages(e), n.each(h, function(n) {
   n(e);
  });
 };
 var v = l("onReady");
 return d.onReady = function() {
  function o(e) {
   var o = t("div", {
    "class": "btn-group"
   }), i = e();
   return n.isString(i) ? o.innerHTML = i : n.isElement(i) && o.appendChild(i), o;
  }
  if (m = document.getElementById("preview-contents"), b = e(m), viewerMode === !1) {
   var i = n.chain(u).sortBy(function(e) {
    return e.extensionName.toLowerCase();
   }).reduce(function(e, t) {
    return e + (t.settingsBlock ? n.template(a, {
     extensionId: t.extensionId,
     extensionName: t.extensionName,
     isOptional: t.isOptional,
     settingsBlock: t.settingsBlock
    }) : "");
   }, "").value();
   document.getElementById("accordion-extensions").innerHTML = i, logger.log("onCreateButton");
   var r = s("onCreateButton"), l = document.createDocumentFragment();
   n.each(r, function(e) {
    l.appendChild(o(e));
   }), document.getElementById("extension-buttons").appendChild(l), logger.log("onCreatePreviewButton");
   var c = s("onCreatePreviewButton"), d = document.createDocumentFragment();
   n.each(c, function(e) {
    d.appendChild(o(e));
   }), document.getElementById("extension-preview-buttons").appendChild(d);
  }
  v();
 }, d.onEventMgrCreated(d), d;
}), define("text!html/bodyIndex.html", [], function() {
 return '<div class="navbar navbar-fixed-top ui-layout-north">\n	<div class="navbar-inner">\n\n		<ul class="nav">\n			<li><div id="wmd-button-bar"></div></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li id="extension-buttons"></li>\n			<li class="btn-group"><button class="btn btn-default action-create-file"\n					title="New local document">\n					<i class="icon-file"></i>\n				</button>\n				<button class="btn btn-default" title="Delete local document"\n					data-toggle="modal" data-target="#modal-remove-file-confirm">\n					<i class="icon-trash"></i>\n				</button>\n				<button class="btn btn-default dropdown-toggle action-open-file"\n					data-toggle="dropdown" title="Open local document">\n					<i class="icon-folder-open"></i>\n				</button>\n				<ul id="file-selector" class="dropdown-menu">\n					<li class="stick">\n						<div class="input-prepend">\n							<span class="add-on"><i class="icon-search"></i></span><input\n								type="text" id="file-search" class="col-lg-3 form-control">\n						</div>\n					</li>\n				</ul></li>\n			<li class="btn-group"><button class="btn btn-default dropdown-toggle"\n					data-toggle="dropdown" title="Menu">\n					<i class="icon-stackedit"></i>&nbsp;&nbsp;<i class="icon-down-dir"></i>\n				</button>\n				<ul class="dropdown-menu">\n					<li><a href="viewer.html" title="StackEdit Viewer"><i\n							class="icon-resize-full"></i> StackEdit Viewer</a></li>\n					<li class="dropdown-submenu"><a href="#"><i\n							class="icon-hdd"></i> Open from...</a>\n						<ul class="dropdown-menu">\n							<li><a data-toggle="modal"\n								data-target="#modal-import-harddrive-markdown"\n								class="action-reset-input" href="#">Import from hard drive</a></li>\n							<li><a data-toggle="modal"\n								data-target="#modal-import-harddrive-html"\n								class="action-reset-input" href="#">Convert HTML to Markdown</a></li>\n						</ul></li>\n					<li class="dropdown-submenu"><a href="#"><i\n							class="icon-hdd"></i> Save as...</a>\n						<ul class="dropdown-menu">\n							<li><a class="action-download-md" href="#">Save as\n									Markdown</a></li>\n							<li><a class="action-download-html" href="#">Save as\n									HTML</a></li>\n							<li><a class="action-download-template" href="#">Save\n									using template</a></li>\n						</ul></li>\n					<li class="divider with-text">synchronize</li>\n					<li class="dropdown-submenu"><a href="#"><i\n							class="icon-gdrive"></i> Google Drive</a>\n						<ul class="dropdown-menu">\n							<li><a href="#" class="action-sync-import-gdrive">Import\n									from Google Drive</a></li>\n							<li><a href="#" class="action-sync-export-dialog-gdrive">Export\n									to Google Drive</a></li>\n						</ul></li>\n					<li class="dropdown-submenu"><a href="#"><i\n							class="icon-dropbox"></i> Dropbox</a>\n						<ul class="dropdown-menu">\n							<li><a class="action-sync-import-dropbox" href="#">Import\n									from Dropbox</a></li>\n							<li><a href="#" class="action-sync-export-dialog-dropbox">Export\n									to Dropbox</a></li>\n						</ul></li>\n					<li><a href="#" data-toggle="modal"\n						data-target="#modal-manage-sync" class="action-reset-input"><i\n							class="icon-refresh"></i> Manage synchronization</a></li>\n					<li class="divider with-text">publish</li>\n					<li class="dropdown-submenu"><a href="#"><i\n							class="icon-share"></i> Publish on</a>\n						<ul id="publish-menu" class="dropdown-menu">\n						</ul></li>\n					<li><a href="#" data-toggle="modal"\n						data-target="#modal-manage-publish" class="action-reset-input"><i\n							class="icon-share"></i> Manage publication</a></li>\n					<li class="divider"></li>\n					<li><a href="#" data-toggle="modal"\n						data-target="#modal-settings" class="action-load-settings"><i\n							class="icon-cog"></i> Settings</a></li>\n					<li><a href="#" data-toggle="modal" data-target="#modal-about"><i\n							class="icon-help-circled"></i> About</a></li>\n				</ul></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n			<li><a class="btn btn-default" id="file-title" href="#"\n				title="Rename current document"> </a></li>\n			<li class="navbar-form"><input id="file-title-input" type="text"\n				class="col-lg-3 form-control hide" placeholder="Document title" /></li>\n		</ul>\n	</div>\n</div>\n<textarea id="wmd-input" class="ui-layout-center form-control"></textarea>\n<div class="ui-layout-east preview-container"></div>\n<div class="ui-layout-south preview-container"></div>\n\n\n<div id="modal-insert-link" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close action-close-insert-link"\n					data-dismiss="modal" aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Hyperlink</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the link URL and an optional title:</p>\n				<div class="input-prepend">\n					<span class="add-on"><i class="icon-globe"></i></span><input\n						id="input-insert-link" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/ "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-insert-link" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-insert-image" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close action-close-insert-link"\n					data-dismiss="modal" aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Image</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the image URL and an optional title:</p>\n				<div class="input-prepend">\n					<span class="add-on"><i class="icon-picture"></i></span><input\n						id="input-insert-image" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/image.jpg "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default action-import-image-gplus"\n					data-dismiss="modal"><i class="icon-gplus"></i> Import from\n					Google+</a> <a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a\n					href="#" class="btn btn-primary action-insert-image"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-import-image" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close action-close-insert-link"\n					data-dismiss="modal" aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Google+ image import</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group">\n						<div class="col-lg-7">\n							<img>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-title">Title (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-import-image-title"\n								placeholder="Image title" class="form-control">\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-size">Size limit (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-import-image-size" placeholder="123"\n								class="col-lg-2 form-control"><span class="help-inline">px</span>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-import-image" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-remove-file-confirm" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Delete</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					Are you sure you want to delete "<span class="file-title"></span>"?\n				</p>\n				<blockquote class="muted">\n					<b>NOTE:</b> This will not delete the file on synchronized\n					locations.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-remove-file" data-dismiss="modal">Delete</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-import-harddrive-markdown" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Import from hard drive</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your Markdown files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-markdown"\n						multiple class="form-control" />\n				</p>\n				<p>Or drag and drop your Markdown files here:</p>\n				<p id="dropzone-import-harddrive-markdown" class="drop-zone">Drop\n					files here</p>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-import-harddrive-html" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Convert HTML to Markdown</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your HTML files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-html" multiple\n						class="form-control" />\n				</p>\n				<p>Or drag and drop your HTML files here:</p>\n				<p id="dropzone-import-harddrive-html" class="drop-zone">Drop\n					files here</p>\n				<p>Or insert your HTML code here:</p>\n				<textarea id="input-convert-html"></textarea>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Close</a> <a href="#"\n					class="btn btn-primary action-convert-html" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-upload-gdrive" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Google Drive</h3>\n			</div>\n			<div class="modal-body">\n				<blockquote class="muted">This will save the current\n					document to your Google Drive account and keep it synchronized.</blockquote>\n				<p>\n					Please specify a <b>folder ID</b> (optional):\n				</p>\n				<div class="input-prepend">\n					<span class="add-on"><i class="icon-gdrive"></i></span><input\n						id="input-sync-export-gdrive-parentid" type="text"\n						class="col-lg-5 form-control" placeholder="FolderID"></input>\n				</div>\n				<br /> <br />\n				<blockquote class="muted">\n					<b>NOTE:</b>\n					<ul>\n						<li>If no folder ID is supplied, the file will be created in\n							your root folder.</li>\n						<li>You can move or rename the file afterwards within Google\n							Drive.</li>\n					</ul>\n				</blockquote>\n				<div class="checkbox">\n					<label> <input id="input-sync-export-gdrive-realtime"\n						type="checkbox"> Create a real time collaborative document\n					</label>\n				</div>\n				<br /> <br />\n				<blockquote class="muted">\n					<b>NOTE:</b>\n					<ul>\n						<li>Real time collaborative documents can\'t be open outside\n							StackEdit.</li>\n						<li>Real time collaborative documents can\'t have multiple\n							synchronized locations.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					data-dismiss="modal"\n					class="btn btn-primary action-sync-export-gdrive">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-upload-dropbox" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Dropbox</h3>\n			</div>\n			<div class="modal-body">\n				<blockquote class="muted">This will save the current\n					document to your Dropbox account and keep it synchronized.</blockquote>\n				<p>\n					Please specify a <b>file path</b> for "<span class="file-title"></span>":\n				</p>\n				<div class="input-prepend">\n					<span class="add-on"><i class="icon-dropbox"></i></span><input\n						id="input-sync-export-dropbox-path" type="text"\n						class="col-lg-5 form-control"\n						placeholder="/path/to/My Document.md"></input>\n				</div>\n				<br /> <br />\n				<blockquote class="muted">\n					<b>NOTE:</b>\n					<ul>\n						<li>Dropbox file path does not depend on document title.</li>\n						<li>The title of your document will not be synchronized.</li>\n						<li>Destination folder must exist.</li>\n						<li>Any existing file at this location will be overwritten.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					data-dismiss="modal"\n					class="btn btn-primary action-sync-export-dropbox">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-manage-sync" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Synchronization</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-sync-list hide">\n					"<span class="file-title"></span>" is synchronized with the\n					following location(s):\n				</p>\n				<p id="manage-sync-list"></p>\n				<blockquote class="msg-sync-list hide muted">\n					<b>NOTE:</b> Removing a synchronized location will not delete any\n					file.\n				</blockquote>\n				<blockquote class="msg-no-sync hide muted">\n					"<span class="file-title"></span>" is not synchronized yet.\n				</blockquote>\n				<p>Add a synchronized location manually:</p>\n				<div class="input-prepend input-append sync-manual">\n					<span class="add-on" title="Google Drive"><i\n						class="icon-gdrive"></i></span><input id="input-sync-manual-gdrive-id"\n						type="text" class="col-lg-5 form-control"\n						placeholder="GoogleDriveFileID"></input> <a\n						class="btn btn-default action-sync-manual-gdrive" title="Add location"\n						data-dismiss="modal"><i class="icon-ok"></i></a>\n				</div>\n				<div class="input-prepend input-append sync-manual">\n					<span class="add-on" title="Dropbox"><i class="icon-dropbox"></i></span><input\n						id="input-sync-manual-dropbox-path" type="text"\n						class="col-lg-5 form-control" placeholder="/dropbox/file/path"></input>\n					<a class="btn btn-default action-sync-manual-dropbox" title="Add location"\n						data-dismiss="modal"><i class="icon-ok"></i></a>\n				</div>\n				<blockquote class="muted">\n					<b>NOTE:</b> This will first upload the document and overwrite the\n					existing file on the server.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-publish" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">\n					Publish on <span class="publish-provider-name"></span>\n				</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-host">Host</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-host"\n								placeholder="host.name.or.ip" class="form-control"> <span\n								class="help-block"> Host must be accessible publicly,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-port">Port\n							(optional)</label>\n						<div class="col-lg-2">\n							<input type="text" id="input-publish-ssh-port" placeholder="22"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-username">Username</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-password">Password</label>\n						<div class="col-lg-7">\n							<input type="password" id="input-publish-ssh-password"\n								placeholder="password" class="form-control"> <span\n								class="help-block"> Passwords are transmitted in clear,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-reponame">Repository</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-reponame"\n								placeholder="repository-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-username">Username (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-branch">Branch</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-branch"\n								placeholder="branch-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-file-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-file-path"\n								placeholder="path/to/file.md" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-filename">Filename</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-filename"\n								placeholder="filename" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-gist-id">Existing\n							ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gist-id"\n								placeholder="GistID" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gist-public">Public</label>\n						<div class="col-lg-7">\n							<div class="checkbox">\n								<input type="checkbox" id="input-publish-gist-public"\n									checked="checked" />\n							</div>\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label"\n							for="input-publish-blogger-url">Blog URL</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-blogger-url"\n								placeholder="http://exemple.blogger.com/" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-tumblr">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">Blog hostname</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tumblr-hostname"\n								placeholder="exemple.tumblr.com" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-wordpress">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">WordPress site</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-wordpress-site"\n								placeholder="exemple.wordpress.com" class="form-control">\n							<span class="help-block"> <a target="_blank"\n								href="http://jetpack.me/">Jetpack plugin</a> is required for\n								self-hosted sites.\n							</span>\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-blogger modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-postid">Update\n							existing post ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-postid" placeholder="PostID"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label" for="input-publish-labels">Labels\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-labels"\n								placeholder="Label1, Label2" class="form-control">\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-tags">Tags\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tags"\n								placeholder="Tag1, Tag2" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-dropbox">\n						<label class="col-lg-4 control-label"\n							for="input-publish-dropbox-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-dropbox-path"\n								placeholder="/path/to/My Document.html" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-fileid">File ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block">If no file ID is supplied, a new file\n								will be created in your Google Drive root folder. You can move\n								the file afterwards within Google Drive.</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-filename">Force filename\n							(optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-filename"\n								placeholder="Filename" class="form-control"> <span\n								class="help-block">If no file name is supplied, the\n								document title will be used.</span>\n						</div>\n					</div>\n\n					<div class="form-group">\n						<label class="col-lg-4 control-label">Format</label>\n						<div class="col-lg-7">\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="markdown"> Markdown\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="html"> HTML\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="template"> Template\n								</label>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					data-dismiss="modal" class="btn btn-primary action-process-publish">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-manage-publish" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Publication</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-publish-list hide">\n					"<span class="file-title"></span>" is published on the following\n					location(s):\n				</p>\n				<div id="manage-publish-list"></div>\n				<blockquote class="muted">\n					<div class="msg-no-publish hide">\n						"<span class="file-title"></span>" is not published yet. <br /> <br />\n					</div>\n					<b>NOTE:</b> You can add publications using "Publish on" sub-menu.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-settings" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Settings</h3>\n				<ul class="nav nav-tabs">\n					<li class="active"><a class="action-load-settings"\n						href="#tabpane-settings-editor" data-toggle="tab">Editor</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-publish" data-toggle="tab">Publish</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-extensions" data-toggle="tab">Extensions</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-utils" data-toggle="tab">Utils</a></li>\n				</ul>\n			</div>\n			<div class="modal-body">\n\n				<div class="tab-content">\n					<div class="tab-pane active" id="tabpane-settings-editor">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label">Layout orientation</label>\n								<div class="col-lg-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="horizontal">\n											Horizontal\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="vertical">\n											Vertical\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label" for="input-settings-theme">Theme</label>\n								<div class="col-lg-7">\n									<select id="input-settings-theme" class="form-control">\n									</select> <span class="help-block"><a target="_blank"\n										href="https://github.com/benweet/stackedit/blob/master/doc/theming.md#stackedit-theming-guide">Create\n											your own theme...</a></span>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-lazy-rendering">Lazy rendering <a\n									href="#" class="tooltip-lazy-rendering">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<div class="checkbox">\n										<input type="checkbox" id="input-settings-lazy-rendering" />\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-editor-font-family">Editor font</label>\n								<div class="col-lg-8 form-inline">\n									<input type="text" id="input-settings-editor-font-family"\n										class="form-control col-lg-7"> <input type="text"\n										id="input-settings-editor-font-size"\n										class="form-control col-lg-2"> px\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-default-content">Default content\n									<a href="#" class="tooltip-default-content">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-default-content"\n										class="form-control"></textarea>\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-publish">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-publish-commit-msg">Commit message</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-publish-commit-msg"\n										class="form-control">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-publish-template">Template <a\n									href="#" class="tooltip-template">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-publish-template"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-ssh-proxy">SSH proxy</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-ssh-proxy"\n										class="form-control">\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-extensions">\n						<div class="accordion" id="accordion-extensions"></div>\n						<span class="help-block pull-right"><a target="_blank"\n							href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">Create\n								your own extension...</a></span>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-utils">\n						<div class="tab-pane-button-container">\n							<a href="#"\n								class="btn btn-block btn-primary action-import-settings"><i\n								class="icon-wrench icon-white"></i> Import settings</a> <a href="#"\n								class="btn btn-block btn-primary action-export-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Export settings</a> <a href="#"\n								class="btn btn-block btn-primary action-default-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Load default settings</a> <input type="file"\n								id="input-file-import-settings" class="hide">\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#" class="btn btn-block btn-primary action-welcome-file"\n								data-dismiss="modal"><i class="icon-help-circled icon-white"></i>\n								Welcome document</a> <a href="#" class="btn btn-block btn-primary"\n								data-dismiss="modal" data-toggle="modal"\n								data-target="#modal-app-reset"><i\n								class="icon-fire icon-white"></i> Reset application</a>\n						</div>\n					</div>\n				</div>\n\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-apply-settings" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-about" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<img src="img/stackedit-promo.png" />\n			</div>\n			<div class="modal-body"></div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-non-unique" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote class="muted">If you want to reopen\n					StackEdit, click on "Reload".</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="modal-app-reset" class="modal">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Reset application</h3>\n			</div>\n			<div class="modal-body">\n				<p>This will delete all your local documents.</p>\n				<blockquote class="muted">Are you sure?</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-app-reset" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<textarea id="md-section-helper" class="form-control"></textarea>\n<div class="lock-ui hide"></div>\n<div id="dropboxjs" data-app-key="x0k2l8puemfvg0o"></div>\n';
}), define("text!html/bodyViewer.html", [], function() {
 return '\n<div class="navbar navbar-fixed-top ui-layout-north">\n	<div class="navbar-inner">\n\n		<ul class="nav pull-right hide">\n			<li class="btn-group">\n				<button class="btn btn-default action-edit-document hide"\n					title="Edit this document">\n					<i class="icon-pencil"></i>\n				</button>\n			</li>\n			<li class="btn-group">\n				<button class="btn btn-default dropdown-toggle" data-toggle="dropdown"\n					title="Save this document">\n					<i class="icon-download-alt"></i>\n				</button>\n				<ul class="dropdown-menu">\n					<li><a class="action-download-md" href="#"><i\n							class="icon-download-alt"></i> Save as Markdown</a></li>\n					<li><a class="action-download-html" href="#"><i\n							class="icon-download-alt"></i> Save as HTML</a></li>\n					<li><a class="action-download-template" href="#"><i\n							class="icon-download-alt"></i> Save using template</a></li>\n				</ul>\n			</li>\n			<li class="btn-group">\n				<button class="btn btn-default dropdown-toggle action-open-file"\n					data-toggle="dropdown" title="Open local document">\n					<i class="icon-folder-open"></i>\n				</button>\n				<ul id="file-selector" class="dropdown-menu">\n					<li class="stick">\n						<div class="input-prepend">\n							<span class="add-on"><i class="icon-search"></i></span><input\n								type="text" id="file-search" class="span3">\n						</div>\n					</li>\n				</ul>\n			</li>\n			<li class="btn-group"><button class="btn btn-default action-open-stackedit"\n					title="Open StackEdit">\n					<i class="icon-stackedit"></i>\n				</button></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n			<li><span class="brand" id="file-title"></span></li>\n		</ul>\n	</div>\n</div>\n<div id="wmd-button-bar" class="hide"></div>\n<textarea id="wmd-input" class="hide"></textarea>\n<div class="preview-container">\n	<div id="preview-contents">\n		<div id="wmd-preview" class="preview-content"></div>\n	</div>\n</div>\n\n<div id="modal-non-unique" class="modal hide">\n	<div class="modal-header">\n		<h3>Ooops...</h3>\n	</div>\n	<div class="modal-body">\n		<p>StackEdit has stopped because another instance was running in\n			the same browser.</p>\n		<blockquote class="muted">If you want to reopen\n			StackEdit, click on "Reload".</blockquote>\n	</div>\n	<div class="modal-footer">\n		<a href="javascript:window.location.reload();" class="btn btn-primary">Reload</a>\n	</div>\n</div>\n';
}), define("text!html/settingsTemplateTooltip.html", [], function() {
 return 'Available variables:\n<br>\n<ul>\n	<li><b>documentTitle</b>: document title</li>\n	<li><b>documentMarkdown</b>: document in Markdown format</li>\n	<li><b>documentHTML</b>: document in HTML format</li>\n	<li><b>publishAttributes</b>: attributes of the publish location\n		(undefined if not publishing)</li>\n</ul>\n<b>Examples:</b>\n<br />\n&lt;title&gt;&lt;%= documentTitle %&gt;&lt;&#x2F;title&gt;\n<br />\n&lt;div&gt;&lt;%- documentHTML %&gt;&lt;&#x2F;div&gt;\n<br />\n&lt;%<br />\nif(publishAttributes.provider.providerId == &quot;github&quot;)\nprint(documentMarkdown);<br />\n%&gt;\n<br />\n<br />\n<a target="_blank" href="http://underscorejs.org/#template">More\n	info</a>';
}), define("text!html/settingsUserCustomExtensionTooltip.html", [], function() {
 return 'Extension variable name:\n<b>userCustom</b>\n<br>\n<br>\n<b>Example:</b>\n<br />\nuserCustom.onPreviewFinished = function() {\n<br />\n&nbsp;&nbsp;eventMgr.onMessage(&quot;Finished!&quot;);\n<br />\n};\n<br />\n<br />\n<a target="_blank"\n	href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More\n	info</a>';
}), function(e, n) {
 function t(n, t) {
  var i, r, a, s = n.nodeName.toLowerCase();
  return "area" === s ? (i = n.parentNode, r = i.name, n.href && r && "map" === i.nodeName.toLowerCase() ? (a = e("img[usemap=#" + r + "]")[0], 
  !!a && o(a)) : !1) : (/input|select|textarea|button|object/.test(s) ? !n.disabled : "a" === s ? n.href || t : t) && o(n);
 }
 function o(n) {
  return e.expr.filters.visible(n) && !e(n).parents().addBack().filter(function() {
   return "hidden" === e.css(this, "visibility");
  }).length;
 }
 var i = 0, r = /^ui-id-\d+$/;
 e.ui = e.ui || {}, e.extend(e.ui, {
  version: "1.10.3",
  keyCode: {
   BACKSPACE: 8,
   COMMA: 188,
   DELETE: 46,
   DOWN: 40,
   END: 35,
   ENTER: 13,
   ESCAPE: 27,
   HOME: 36,
   LEFT: 37,
   NUMPAD_ADD: 107,
   NUMPAD_DECIMAL: 110,
   NUMPAD_DIVIDE: 111,
   NUMPAD_ENTER: 108,
   NUMPAD_MULTIPLY: 106,
   NUMPAD_SUBTRACT: 109,
   PAGE_DOWN: 34,
   PAGE_UP: 33,
   PERIOD: 190,
   RIGHT: 39,
   SPACE: 32,
   TAB: 9,
   UP: 38
  }
 }), e.fn.extend({
  focus: function(n) {
   return function(t, o) {
    return "number" == typeof t ? this.each(function() {
     var n = this;
     setTimeout(function() {
      e(n).focus(), o && o.call(n);
     }, t);
    }) : n.apply(this, arguments);
   };
  }(e.fn.focus),
  scrollParent: function() {
   var n;
   return n = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
   }).eq(0) : this.parents().filter(function() {
    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
   }).eq(0), /fixed/.test(this.css("position")) || !n.length ? e(document) : n;
  },
  zIndex: function(t) {
   if (t !== n) return this.css("zIndex", t);
   if (this.length) for (var o, i, r = e(this[0]); r.length && r[0] !== document; ) {
    if (o = r.css("position"), ("absolute" === o || "relative" === o || "fixed" === o) && (i = parseInt(r.css("zIndex"), 10), 
    !isNaN(i) && 0 !== i)) return i;
    r = r.parent();
   }
   return 0;
  },
  uniqueId: function() {
   return this.each(function() {
    this.id || (this.id = "ui-id-" + ++i);
   });
  },
  removeUniqueId: function() {
   return this.each(function() {
    r.test(this.id) && e(this).removeAttr("id");
   });
  }
 }), e.extend(e.expr[":"], {
  data: e.expr.createPseudo ? e.expr.createPseudo(function(n) {
   return function(t) {
    return !!e.data(t, n);
   };
  }) : function(n, t, o) {
   return !!e.data(n, o[3]);
  },
  focusable: function(n) {
   return t(n, !isNaN(e.attr(n, "tabindex")));
  },
  tabbable: function(n) {
   var o = e.attr(n, "tabindex"), i = isNaN(o);
   return (i || o >= 0) && t(n, !i);
  }
 }), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(t, o) {
  function i(n, t, o, i) {
   return e.each(r, function() {
    t -= parseFloat(e.css(n, "padding" + this)) || 0, o && (t -= parseFloat(e.css(n, "border" + this + "Width")) || 0), 
    i && (t -= parseFloat(e.css(n, "margin" + this)) || 0);
   }), t;
  }
  var r = "Width" === o ? [ "Left", "Right" ] : [ "Top", "Bottom" ], a = o.toLowerCase(), s = {
   innerWidth: e.fn.innerWidth,
   innerHeight: e.fn.innerHeight,
   outerWidth: e.fn.outerWidth,
   outerHeight: e.fn.outerHeight
  };
  e.fn["inner" + o] = function(t) {
   return t === n ? s["inner" + o].call(this) : this.each(function() {
    e(this).css(a, i(this, t) + "px");
   });
  }, e.fn["outer" + o] = function(n, t) {
   return "number" != typeof n ? s["outer" + o].call(this, n) : this.each(function() {
    e(this).css(a, i(this, n, !0, t) + "px");
   });
  };
 }), e.fn.addBack || (e.fn.addBack = function(e) {
  return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
 }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(n) {
  return function(t) {
   return arguments.length ? n.call(this, e.camelCase(t)) : n.call(this);
  };
 }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
 e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
  disableSelection: function() {
   return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
    e.preventDefault();
   });
  },
  enableSelection: function() {
   return this.unbind(".ui-disableSelection");
  }
 }), e.extend(e.ui, {
  plugin: {
   add: function(n, t, o) {
    var i, r = e.ui[n].prototype;
    for (i in o) r.plugins[i] = r.plugins[i] || [], r.plugins[i].push([ t, o[i] ]);
   },
   call: function(e, n, t) {
    var o, i = e.plugins[n];
    if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (o = 0; o < i.length; o++) e.options[i[o][0]] && i[o][1].apply(e.element, t);
   }
  },
  hasScroll: function(n, t) {
   if ("hidden" === e(n).css("overflow")) return !1;
   var o = t && "left" === t ? "scrollLeft" : "scrollTop", i = !1;
   return n[o] > 0 ? !0 : (n[o] = 1, i = n[o] > 0, n[o] = 0, i);
  }
 });
}(jQuery), function(e, n) {
 var t = 0, o = Array.prototype.slice, i = e.cleanData;
 e.cleanData = function(n) {
  for (var t, o = 0; null != (t = n[o]); o++) try {
   e(t).triggerHandler("remove");
  } catch (r) {}
  i(n);
 }, e.widget = function(n, t, o) {
  var i, r, a, s, l = {}, c = n.split(".")[0];
  n = n.split(".")[1], i = c + "-" + n, o || (o = t, t = e.Widget), e.expr[":"][i.toLowerCase()] = function(n) {
   return !!e.data(n, i);
  }, e[c] = e[c] || {}, r = e[c][n], a = e[c][n] = function(e, n) {
   return this._createWidget ? (arguments.length && this._createWidget(e, n), void 0) : new a(e, n);
  }, e.extend(a, r, {
   version: o.version,
   _proto: e.extend({}, o),
   _childConstructors: []
  }), s = new t(), s.options = e.widget.extend({}, s.options), e.each(o, function(n, o) {
   return e.isFunction(o) ? (l[n] = function() {
    var e = function() {
     return t.prototype[n].apply(this, arguments);
    }, i = function(e) {
     return t.prototype[n].apply(this, e);
    };
    return function() {
     var n, t = this._super, r = this._superApply;
     return this._super = e, this._superApply = i, n = o.apply(this, arguments), this._super = t, 
     this._superApply = r, n;
    };
   }(), void 0) : (l[n] = o, void 0);
  }), a.prototype = e.widget.extend(s, {
   widgetEventPrefix: r ? s.widgetEventPrefix : n
  }, l, {
   constructor: a,
   namespace: c,
   widgetName: n,
   widgetFullName: i
  }), r ? (e.each(r._childConstructors, function(n, t) {
   var o = t.prototype;
   e.widget(o.namespace + "." + o.widgetName, a, t._proto);
  }), delete r._childConstructors) : t._childConstructors.push(a), e.widget.bridge(n, a);
 }, e.widget.extend = function(t) {
  for (var i, r, a = o.call(arguments, 1), s = 0, l = a.length; l > s; s++) for (i in a[s]) r = a[s][i], 
  a[s].hasOwnProperty(i) && r !== n && (t[i] = e.isPlainObject(r) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], r) : e.widget.extend({}, r) : r);
  return t;
 }, e.widget.bridge = function(t, i) {
  var r = i.prototype.widgetFullName || t;
  e.fn[t] = function(a) {
   var s = "string" == typeof a, l = o.call(arguments, 1), c = this;
   return a = !s && l.length ? e.widget.extend.apply(null, [ a ].concat(l)) : a, s ? this.each(function() {
    var o, i = e.data(this, r);
    return i ? e.isFunction(i[a]) && "_" !== a.charAt(0) ? (o = i[a].apply(i, l), o !== i && o !== n ? (c = o && o.jquery ? c.pushStack(o.get()) : o, 
    !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'");
   }) : this.each(function() {
    var n = e.data(this, r);
    n ? n.option(a || {})._init() : e.data(this, r, new i(a, this));
   }), c;
  };
 }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
  widgetName: "widget",
  widgetEventPrefix: "",
  defaultElement: "<div>",
  options: {
   disabled: !1,
   create: null
  },
  _createWidget: function(n, o) {
   o = e(o || this.defaultElement || this)[0], this.element = e(o), this.uuid = t++, 
   this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), n), 
   this.bindings = e(), this.hoverable = e(), this.focusable = e(), o !== this && (e.data(o, this.widgetFullName, this), 
   this._on(!0, this.element, {
    remove: function(e) {
     e.target === o && this.destroy();
    }
   }), this.document = e(o.style ? o.ownerDocument : o.document || o), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), 
   this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
  },
  _getCreateOptions: e.noop,
  _getCreateEventData: e.noop,
  _create: e.noop,
  _init: e.noop,
  destroy: function() {
   this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), 
   this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), 
   this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
   this.focusable.removeClass("ui-state-focus");
  },
  _destroy: e.noop,
  widget: function() {
   return this.element;
  },
  option: function(t, o) {
   var i, r, a, s = t;
   if (0 === arguments.length) return e.widget.extend({}, this.options);
   if ("string" == typeof t) if (s = {}, i = t.split("."), t = i.shift(), i.length) {
    for (r = s[t] = e.widget.extend({}, this.options[t]), a = 0; a < i.length - 1; a++) r[i[a]] = r[i[a]] || {}, 
    r = r[i[a]];
    if (t = i.pop(), o === n) return r[t] === n ? null : r[t];
    r[t] = o;
   } else {
    if (o === n) return this.options[t] === n ? null : this.options[t];
    s[t] = o;
   }
   return this._setOptions(s), this;
  },
  _setOptions: function(e) {
   var n;
   for (n in e) this._setOption(n, e[n]);
   return this;
  },
  _setOption: function(e, n) {
   return this.options[e] = n, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!n).attr("aria-disabled", n), 
   this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
   this;
  },
  enable: function() {
   return this._setOption("disabled", !1);
  },
  disable: function() {
   return this._setOption("disabled", !0);
  },
  _on: function(n, t, o) {
   var i, r = this;
   "boolean" != typeof n && (o = t, t = n, n = !1), o ? (t = i = e(t), this.bindings = this.bindings.add(t)) : (o = t, 
   t = this.element, i = this.widget()), e.each(o, function(o, a) {
    function s() {
     return n || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : void 0;
    }
    "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
    var l = o.match(/^(\w+)\s*(.*)$/), c = l[1] + r.eventNamespace, d = l[2];
    d ? i.delegate(d, c, s) : t.bind(c, s);
   });
  },
  _off: function(e, n) {
   n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
   e.unbind(n).undelegate(n);
  },
  _delay: function(e, n) {
   function t() {
    return ("string" == typeof e ? o[e] : e).apply(o, arguments);
   }
   var o = this;
   return setTimeout(t, n || 0);
  },
  _hoverable: function(n) {
   this.hoverable = this.hoverable.add(n), this._on(n, {
    mouseenter: function(n) {
     e(n.currentTarget).addClass("ui-state-hover");
    },
    mouseleave: function(n) {
     e(n.currentTarget).removeClass("ui-state-hover");
    }
   });
  },
  _focusable: function(n) {
   this.focusable = this.focusable.add(n), this._on(n, {
    focusin: function(n) {
     e(n.currentTarget).addClass("ui-state-focus");
    },
    focusout: function(n) {
     e(n.currentTarget).removeClass("ui-state-focus");
    }
   });
  },
  _trigger: function(n, t, o) {
   var i, r, a = this.options[n];
   if (o = o || {}, t = e.Event(t), t.type = (n === this.widgetEventPrefix ? n : this.widgetEventPrefix + n).toLowerCase(), 
   t.target = this.element[0], r = t.originalEvent) for (i in r) i in t || (t[i] = r[i]);
   return this.element.trigger(t, o), !(e.isFunction(a) && a.apply(this.element[0], [ t ].concat(o)) === !1 || t.isDefaultPrevented());
  }
 }, e.each({
  show: "fadeIn",
  hide: "fadeOut"
 }, function(n, t) {
  e.Widget.prototype["_" + n] = function(o, i, r) {
   "string" == typeof i && (i = {
    effect: i
   });
   var a, s = i ? i === !0 || "number" == typeof i ? t : i.effect || t : n;
   i = i || {}, "number" == typeof i && (i = {
    duration: i
   }), a = !e.isEmptyObject(i), i.complete = r, i.delay && o.delay(i.delay), a && e.effects && e.effects.effect[s] ? o[n](i) : s !== n && o[s] ? o[s](i.duration, i.easing, r) : o.queue(function(t) {
    e(this)[n](), r && r.call(o[0]), t();
   });
  };
 });
}(jQuery), function(e) {
 var n = !1;
 e(document).mouseup(function() {
  n = !1;
 }), e.widget("ui.mouse", {
  version: "1.10.3",
  options: {
   cancel: "input,textarea,button,select,option",
   distance: 1,
   delay: 0
  },
  _mouseInit: function() {
   var n = this;
   this.element.bind("mousedown." + this.widgetName, function(e) {
    return n._mouseDown(e);
   }).bind("click." + this.widgetName, function(t) {
    return !0 === e.data(t.target, n.widgetName + ".preventClickEvent") ? (e.removeData(t.target, n.widgetName + ".preventClickEvent"), 
    t.stopImmediatePropagation(), !1) : void 0;
   }), this.started = !1;
  },
  _mouseDestroy: function() {
   this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
  },
  _mouseDown: function(t) {
   if (!n) {
    this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
    var o = this, i = 1 === t.which, r = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
    return i && !r && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, 
    this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
     o.mouseDelayMet = !0;
    }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, 
    !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), 
    this._mouseMoveDelegate = function(e) {
     return o._mouseMove(e);
    }, this._mouseUpDelegate = function(e) {
     return o._mouseUp(e);
    }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
    t.preventDefault(), n = !0, !0)) : !0;
   }
  },
  _mouseMove: function(n) {
   return e.ui.ie && (!document.documentMode || document.documentMode < 9) && !n.button ? this._mouseUp(n) : this._mouseStarted ? (this._mouseDrag(n), 
   n.preventDefault()) : (this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, n) !== !1, 
   this._mouseStarted ? this._mouseDrag(n) : this._mouseUp(n)), !this._mouseStarted);
  },
  _mouseUp: function(n) {
   return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
   this._mouseStarted && (this._mouseStarted = !1, n.target === this._mouseDownEvent.target && e.data(n.target, this.widgetName + ".preventClickEvent", !0), 
   this._mouseStop(n)), !1;
  },
  _mouseDistanceMet: function(e) {
   return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
  },
  _mouseDelayMet: function() {
   return this.mouseDelayMet;
  },
  _mouseStart: function() {},
  _mouseDrag: function() {},
  _mouseStop: function() {},
  _mouseCapture: function() {
   return !0;
  }
 });
}(jQuery), function(e, n) {
 function t(e, n, t) {
  return [ parseFloat(e[0]) * (f.test(e[0]) ? n / 100 : 1), parseFloat(e[1]) * (f.test(e[1]) ? t / 100 : 1) ];
 }
 function o(n, t) {
  return parseInt(e.css(n, t), 10) || 0;
 }
 function i(n) {
  var t = n[0];
  return 9 === t.nodeType ? {
   width: n.width(),
   height: n.height(),
   offset: {
    top: 0,
    left: 0
   }
  } : e.isWindow(t) ? {
   width: n.width(),
   height: n.height(),
   offset: {
    top: n.scrollTop(),
    left: n.scrollLeft()
   }
  } : t.preventDefault ? {
   width: 0,
   height: 0,
   offset: {
    top: t.pageY,
    left: t.pageX
   }
  } : {
   width: n.outerWidth(),
   height: n.outerHeight(),
   offset: n.offset()
  };
 }
 e.ui = e.ui || {};
 var r, a = Math.max, s = Math.abs, l = Math.round, c = /left|center|right/, d = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, f = /%$/, h = e.fn.position;
 e.position = {
  scrollbarWidth: function() {
   if (r !== n) return r;
   var t, o, i = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a = i.children()[0];
   return e("body").append(i), t = a.offsetWidth, i.css("overflow", "scroll"), o = a.offsetWidth, 
   t === o && (o = i[0].clientWidth), i.remove(), r = t - o;
  },
  getScrollInfo: function(n) {
   var t = n.isWindow ? "" : n.element.css("overflow-x"), o = n.isWindow ? "" : n.element.css("overflow-y"), i = "scroll" === t || "auto" === t && n.width < n.element[0].scrollWidth, r = "scroll" === o || "auto" === o && n.height < n.element[0].scrollHeight;
   return {
    width: r ? e.position.scrollbarWidth() : 0,
    height: i ? e.position.scrollbarWidth() : 0
   };
  },
  getWithinInfo: function(n) {
   var t = e(n || window), o = e.isWindow(t[0]);
   return {
    element: t,
    isWindow: o,
    offset: t.offset() || {
     left: 0,
     top: 0
    },
    scrollLeft: t.scrollLeft(),
    scrollTop: t.scrollTop(),
    width: o ? t.width() : t.outerWidth(),
    height: o ? t.height() : t.outerHeight()
   };
  }
 }, e.fn.position = function(n) {
  if (!n || !n.of) return h.apply(this, arguments);
  n = e.extend({}, n);
  var r, f, g, m, b, v, y = e(n.of), x = e.position.getWithinInfo(n.within), w = e.position.getScrollInfo(x), k = (n.collision || "flip").split(" "), C = {};
  return v = i(y), y[0].preventDefault && (n.at = "left top"), f = v.width, g = v.height, 
  m = v.offset, b = e.extend({}, m), e.each([ "my", "at" ], function() {
   var e, t, o = (n[this] || "").split(" ");
   1 === o.length && (o = c.test(o[0]) ? o.concat([ "center" ]) : d.test(o[0]) ? [ "center" ].concat(o) : [ "center", "center" ]), 
   o[0] = c.test(o[0]) ? o[0] : "center", o[1] = d.test(o[1]) ? o[1] : "center", e = u.exec(o[0]), 
   t = u.exec(o[1]), C[this] = [ e ? e[0] : 0, t ? t[0] : 0 ], n[this] = [ p.exec(o[0])[0], p.exec(o[1])[0] ];
  }), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? b.left += f : "center" === n.at[0] && (b.left += f / 2), 
  "bottom" === n.at[1] ? b.top += g : "center" === n.at[1] && (b.top += g / 2), r = t(C.at, f, g), 
  b.left += r[0], b.top += r[1], this.each(function() {
   var i, c, d = e(this), u = d.outerWidth(), p = d.outerHeight(), h = o(this, "marginLeft"), v = o(this, "marginTop"), S = u + h + o(this, "marginRight") + w.width, T = p + v + o(this, "marginBottom") + w.height, E = e.extend({}, b), _ = t(C.my, d.outerWidth(), d.outerHeight());
   "right" === n.my[0] ? E.left -= u : "center" === n.my[0] && (E.left -= u / 2), "bottom" === n.my[1] ? E.top -= p : "center" === n.my[1] && (E.top -= p / 2), 
   E.left += _[0], E.top += _[1], e.support.offsetFractions || (E.left = l(E.left), 
   E.top = l(E.top)), i = {
    marginLeft: h,
    marginTop: v
   }, e.each([ "left", "top" ], function(t, o) {
    e.ui.position[k[t]] && e.ui.position[k[t]][o](E, {
     targetWidth: f,
     targetHeight: g,
     elemWidth: u,
     elemHeight: p,
     collisionPosition: i,
     collisionWidth: S,
     collisionHeight: T,
     offset: [ r[0] + _[0], r[1] + _[1] ],
     my: n.my,
     at: n.at,
     within: x,
     elem: d
    });
   }), n.using && (c = function(e) {
    var t = m.left - E.left, o = t + f - u, i = m.top - E.top, r = i + g - p, l = {
     target: {
      element: y,
      left: m.left,
      top: m.top,
      width: f,
      height: g
     },
     element: {
      element: d,
      left: E.left,
      top: E.top,
      width: u,
      height: p
     },
     horizontal: 0 > o ? "left" : t > 0 ? "right" : "center",
     vertical: 0 > r ? "top" : i > 0 ? "bottom" : "middle"
    };
    u > f && s(t + o) < f && (l.horizontal = "center"), p > g && s(i + r) < g && (l.vertical = "middle"), 
    l.important = a(s(t), s(o)) > a(s(i), s(r)) ? "horizontal" : "vertical", n.using.call(this, e, l);
   }), d.offset(e.extend(E, {
    using: c
   }));
  });
 }, e.ui.position = {
  fit: {
   left: function(e, n) {
    var t, o = n.within, i = o.isWindow ? o.scrollLeft : o.offset.left, r = o.width, s = e.left - n.collisionPosition.marginLeft, l = i - s, c = s + n.collisionWidth - r - i;
    n.collisionWidth > r ? l > 0 && 0 >= c ? (t = e.left + l + n.collisionWidth - r - i, 
    e.left += l - t) : e.left = c > 0 && 0 >= l ? i : l > c ? i + r - n.collisionWidth : i : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = a(e.left - s, e.left);
   },
   top: function(e, n) {
    var t, o = n.within, i = o.isWindow ? o.scrollTop : o.offset.top, r = n.within.height, s = e.top - n.collisionPosition.marginTop, l = i - s, c = s + n.collisionHeight - r - i;
    n.collisionHeight > r ? l > 0 && 0 >= c ? (t = e.top + l + n.collisionHeight - r - i, 
    e.top += l - t) : e.top = c > 0 && 0 >= l ? i : l > c ? i + r - n.collisionHeight : i : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = a(e.top - s, e.top);
   }
  },
  flip: {
   left: function(e, n) {
    var t, o, i = n.within, r = i.offset.left + i.scrollLeft, a = i.width, l = i.isWindow ? i.scrollLeft : i.offset.left, c = e.left - n.collisionPosition.marginLeft, d = c - l, u = c + n.collisionWidth - a - l, p = "left" === n.my[0] ? -n.elemWidth : "right" === n.my[0] ? n.elemWidth : 0, f = "left" === n.at[0] ? n.targetWidth : "right" === n.at[0] ? -n.targetWidth : 0, h = -2 * n.offset[0];
    0 > d ? (t = e.left + p + f + h + n.collisionWidth - a - r, (0 > t || t < s(d)) && (e.left += p + f + h)) : u > 0 && (o = e.left - n.collisionPosition.marginLeft + p + f + h - l, 
    (o > 0 || s(o) < u) && (e.left += p + f + h));
   },
   top: function(e, n) {
    var t, o, i = n.within, r = i.offset.top + i.scrollTop, a = i.height, l = i.isWindow ? i.scrollTop : i.offset.top, c = e.top - n.collisionPosition.marginTop, d = c - l, u = c + n.collisionHeight - a - l, p = "top" === n.my[1], f = p ? -n.elemHeight : "bottom" === n.my[1] ? n.elemHeight : 0, h = "top" === n.at[1] ? n.targetHeight : "bottom" === n.at[1] ? -n.targetHeight : 0, g = -2 * n.offset[1];
    0 > d ? (o = e.top + f + h + g + n.collisionHeight - a - r, e.top + f + h + g > d && (0 > o || o < s(d)) && (e.top += f + h + g)) : u > 0 && (t = e.top - n.collisionPosition.marginTop + f + h + g - l, 
    e.top + f + h + g > u && (t > 0 || s(t) < u) && (e.top += f + h + g));
   }
  },
  flipfit: {
   left: function() {
    e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments);
   },
   top: function() {
    e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments);
   }
  }
 }, function() {
  var n, t, o, i, r, a = document.getElementsByTagName("body")[0], s = document.createElement("div");
  n = document.createElement(a ? "div" : "body"), o = {
   visibility: "hidden",
   width: 0,
   height: 0,
   border: 0,
   margin: 0,
   background: "none"
  }, a && e.extend(o, {
   position: "absolute",
   left: "-1000px",
   top: "-1000px"
  });
  for (r in o) n.style[r] = o[r];
  n.appendChild(s), t = a || document.documentElement, t.insertBefore(n, t.firstChild), 
  s.style.cssText = "position: absolute; left: 10.7432222px;", i = e(s).offset().left, 
  e.support.offsetFractions = i > 10 && 11 > i, n.innerHTML = "", t.removeChild(n);
 }();
}(jQuery), function(e) {
 e.widget("ui.draggable", e.ui.mouse, {
  version: "1.10.3",
  widgetEventPrefix: "drag",
  options: {
   addClasses: !0,
   appendTo: "parent",
   axis: !1,
   connectToSortable: !1,
   containment: !1,
   cursor: "auto",
   cursorAt: !1,
   grid: !1,
   handle: !1,
   helper: "original",
   iframeFix: !1,
   opacity: !1,
   refreshPositions: !1,
   revert: !1,
   revertDuration: 500,
   scope: "default",
   scroll: !0,
   scrollSensitivity: 20,
   scrollSpeed: 20,
   snap: !1,
   snapMode: "both",
   snapTolerance: 20,
   stack: !1,
   zIndex: !1,
   drag: null,
   start: null,
   stop: null
  },
  _create: function() {
   "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
   this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
   this._mouseInit();
  },
  _destroy: function() {
   this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
   this._mouseDestroy();
  },
  _mouseCapture: function(n) {
   var t = this.options;
   return this.helper || t.disabled || e(n.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(n), 
   this.handle ? (e(t.iframeFix === !0 ? "iframe" : t.iframeFix).each(function() {
    e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
     width: this.offsetWidth + "px",
     height: this.offsetHeight + "px",
     position: "absolute",
     opacity: "0.001",
     zIndex: 1e3
    }).css(e(this).offset()).appendTo("body");
   }), !0) : !1);
  },
  _mouseStart: function(n) {
   var t = this.options;
   return this.helper = this._createHelper(n), this.helper.addClass("ui-draggable-dragging"), 
   this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), 
   this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
   this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), 
   this.offset = this.positionAbs = this.element.offset(), this.offset = {
    top: this.offset.top - this.margins.top,
    left: this.offset.left - this.margins.left
   }, this.offset.scroll = !1, e.extend(this.offset, {
    click: {
     left: n.pageX - this.offset.left,
     top: n.pageY - this.offset.top
    },
    parent: this._getParentOffset(),
    relative: this._getRelativeOffset()
   }), this.originalPosition = this.position = this._generatePosition(n), this.originalPageX = n.pageX, 
   this.originalPageY = n.pageY, t.cursorAt && this._adjustOffsetFromHelper(t.cursorAt), 
   this._setContainment(), this._trigger("start", n) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
   e.ui.ddmanager && !t.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, n), this._mouseDrag(n, !0), 
   e.ui.ddmanager && e.ui.ddmanager.dragStart(this, n), !0);
  },
  _mouseDrag: function(n, t) {
   if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), 
   this.position = this._generatePosition(n), this.positionAbs = this._convertPositionTo("absolute"), 
   !t) {
    var o = this._uiHash();
    if (this._trigger("drag", n, o) === !1) return this._mouseUp({}), !1;
    this.position = o.position;
   }
   return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
   this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
   e.ui.ddmanager && e.ui.ddmanager.drag(this, n), !1;
  },
  _mouseStop: function(n) {
   var t = this, o = !1;
   return e.ui.ddmanager && !this.options.dropBehaviour && (o = e.ui.ddmanager.drop(this, n)), 
   this.dropped && (o = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !o || "valid" === this.options.revert && o || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, o) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
    t._trigger("stop", n) !== !1 && t._clear();
   }) : this._trigger("stop", n) !== !1 && this._clear(), !1) : !1;
  },
  _mouseUp: function(n) {
   return e("div.ui-draggable-iframeFix").each(function() {
    this.parentNode.removeChild(this);
   }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, n), e.ui.mouse.prototype._mouseUp.call(this, n);
  },
  cancel: function() {
   return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
   this;
  },
  _getHandle: function(n) {
   return this.options.handle ? !!e(n.target).closest(this.element.find(this.options.handle)).length : !0;
  },
  _createHelper: function(n) {
   var t = this.options, o = e.isFunction(t.helper) ? e(t.helper.apply(this.element[0], [ n ])) : "clone" === t.helper ? this.element.clone().removeAttr("id") : this.element;
   return o.parents("body").length || o.appendTo("parent" === t.appendTo ? this.element[0].parentNode : t.appendTo), 
   o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"), 
   o;
  },
  _adjustOffsetFromHelper: function(n) {
   "string" == typeof n && (n = n.split(" ")), e.isArray(n) && (n = {
    left: +n[0],
    top: +n[1] || 0
   }), "left" in n && (this.offset.click.left = n.left + this.margins.left), "right" in n && (this.offset.click.left = this.helperProportions.width - n.right + this.margins.left), 
   "top" in n && (this.offset.click.top = n.top + this.margins.top), "bottom" in n && (this.offset.click.top = this.helperProportions.height - n.bottom + this.margins.top);
  },
  _getParentOffset: function() {
   var n = this.offsetParent.offset();
   return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (n.left += this.scrollParent.scrollLeft(), 
   n.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (n = {
    top: 0,
    left: 0
   }), {
    top: n.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
    left: n.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
   };
  },
  _getRelativeOffset: function() {
   if ("relative" === this.cssPosition) {
    var e = this.element.position();
    return {
     top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
     left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
    };
   }
   return {
    top: 0,
    left: 0
   };
  },
  _cacheMargins: function() {
   this.margins = {
    left: parseInt(this.element.css("marginLeft"), 10) || 0,
    top: parseInt(this.element.css("marginTop"), 10) || 0,
    right: parseInt(this.element.css("marginRight"), 10) || 0,
    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
   };
  },
  _cacheHelperProportions: function() {
   this.helperProportions = {
    width: this.helper.outerWidth(),
    height: this.helper.outerHeight()
   };
  },
  _setContainment: function() {
   var n, t, o, i = this.options;
   return i.containment ? "window" === i.containment ? (this.containment = [ e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : "document" === i.containment ? (this.containment = [ 0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : i.containment.constructor === Array ? (this.containment = i.containment, 
   void 0) : ("parent" === i.containment && (i.containment = this.helper[0].parentNode), 
   t = e(i.containment), o = t[0], o && (n = "hidden" !== t.css("overflow"), this.containment = [ (parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (n ? Math.max(o.scrollWidth, o.offsetWidth) : o.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (n ? Math.max(o.scrollHeight, o.offsetHeight) : o.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
   this.relative_container = t), void 0) : (this.containment = null, void 0);
  },
  _convertPositionTo: function(n, t) {
   t || (t = this.position);
   var o = "absolute" === n ? 1 : -1, i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
   return this.offset.scroll || (this.offset.scroll = {
    top: i.scrollTop(),
    left: i.scrollLeft()
   }), {
    top: t.top + this.offset.relative.top * o + this.offset.parent.top * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * o,
    left: t.left + this.offset.relative.left * o + this.offset.parent.left * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * o
   };
  },
  _generatePosition: function(n) {
   var t, o, i, r, a = this.options, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = n.pageX, c = n.pageY;
   return this.offset.scroll || (this.offset.scroll = {
    top: s.scrollTop(),
    left: s.scrollLeft()
   }), this.originalPosition && (this.containment && (this.relative_container ? (o = this.relative_container.offset(), 
   t = [ this.containment[0] + o.left, this.containment[1] + o.top, this.containment[2] + o.left, this.containment[3] + o.top ]) : t = this.containment, 
   n.pageX - this.offset.click.left < t[0] && (l = t[0] + this.offset.click.left), 
   n.pageY - this.offset.click.top < t[1] && (c = t[1] + this.offset.click.top), n.pageX - this.offset.click.left > t[2] && (l = t[2] + this.offset.click.left), 
   n.pageY - this.offset.click.top > t[3] && (c = t[3] + this.offset.click.top)), a.grid && (i = a.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, 
   c = t ? i - this.offset.click.top >= t[1] || i - this.offset.click.top > t[3] ? i : i - this.offset.click.top >= t[1] ? i - a.grid[1] : i + a.grid[1] : i, 
   r = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, 
   l = t ? r - this.offset.click.left >= t[0] || r - this.offset.click.left > t[2] ? r : r - this.offset.click.left >= t[0] ? r - a.grid[0] : r + a.grid[0] : r)), 
   {
    top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
   };
  },
  _clear: function() {
   this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
   this.helper = null, this.cancelHelperRemoval = !1;
  },
  _trigger: function(n, t, o) {
   return o = o || this._uiHash(), e.ui.plugin.call(this, n, [ t, o ]), "drag" === n && (this.positionAbs = this._convertPositionTo("absolute")), 
   e.Widget.prototype._trigger.call(this, n, t, o);
  },
  plugins: {},
  _uiHash: function() {
   return {
    helper: this.helper,
    position: this.position,
    originalPosition: this.originalPosition,
    offset: this.positionAbs
   };
  }
 }), e.ui.plugin.add("draggable", "connectToSortable", {
  start: function(n, t) {
   var o = e(this).data("ui-draggable"), i = o.options, r = e.extend({}, t, {
    item: o.element
   });
   o.sortables = [], e(i.connectToSortable).each(function() {
    var t = e.data(this, "ui-sortable");
    t && !t.options.disabled && (o.sortables.push({
     instance: t,
     shouldRevert: t.options.revert
    }), t.refreshPositions(), t._trigger("activate", n, r));
   });
  },
  stop: function(n, t) {
   var o = e(this).data("ui-draggable"), i = e.extend({}, t, {
    item: o.element
   });
   e.each(o.sortables, function() {
    this.instance.isOver ? (this.instance.isOver = 0, o.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
    this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(n), 
    this.instance.options.helper = this.instance.options._helper, "original" === o.options.helper && this.instance.currentItem.css({
     top: "auto",
     left: "auto"
    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", n, i));
   });
  },
  drag: function(n, t) {
   var o = e(this).data("ui-draggable"), i = this;
   e.each(o.sortables, function() {
    var r = !1, a = this;
    this.instance.positionAbs = o.positionAbs, this.instance.helperProportions = o.helperProportions, 
    this.instance.offset.click = o.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (r = !0, 
    e.each(o.sortables, function() {
     return this.instance.positionAbs = o.positionAbs, this.instance.helperProportions = o.helperProportions, 
     this.instance.offset.click = o.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && e.contains(a.instance.element[0], this.instance.element[0]) && (r = !1), 
     r;
    })), r ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), 
    this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
     return t.helper[0];
    }, n.target = this.instance.currentItem[0], this.instance._mouseCapture(n, !0), 
    this.instance._mouseStart(n, !0, !0), this.instance.offset.click.top = o.offset.click.top, 
    this.instance.offset.click.left = o.offset.click.left, this.instance.offset.parent.left -= o.offset.parent.left - this.instance.offset.parent.left, 
    this.instance.offset.parent.top -= o.offset.parent.top - this.instance.offset.parent.top, 
    o._trigger("toSortable", n), o.dropped = this.instance.element, o.currentItem = o.element, 
    this.instance.fromOutside = o), this.instance.currentItem && this.instance._mouseDrag(n)) : this.instance.isOver && (this.instance.isOver = 0, 
    this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", n, this.instance._uiHash(this.instance)), 
    this.instance._mouseStop(n, !0), this.instance.options.helper = this.instance.options._helper, 
    this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
    o._trigger("fromSortable", n), o.dropped = !1);
   });
  }
 }), e.ui.plugin.add("draggable", "cursor", {
  start: function() {
   var n = e("body"), t = e(this).data("ui-draggable").options;
   n.css("cursor") && (t._cursor = n.css("cursor")), n.css("cursor", t.cursor);
  },
  stop: function() {
   var n = e(this).data("ui-draggable").options;
   n._cursor && e("body").css("cursor", n._cursor);
  }
 }), e.ui.plugin.add("draggable", "opacity", {
  start: function(n, t) {
   var o = e(t.helper), i = e(this).data("ui-draggable").options;
   o.css("opacity") && (i._opacity = o.css("opacity")), o.css("opacity", i.opacity);
  },
  stop: function(n, t) {
   var o = e(this).data("ui-draggable").options;
   o._opacity && e(t.helper).css("opacity", o._opacity);
  }
 }), e.ui.plugin.add("draggable", "scroll", {
  start: function() {
   var n = e(this).data("ui-draggable");
   n.scrollParent[0] !== document && "HTML" !== n.scrollParent[0].tagName && (n.overflowOffset = n.scrollParent.offset());
  },
  drag: function(n) {
   var t = e(this).data("ui-draggable"), o = t.options, i = !1;
   t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName ? (o.axis && "x" === o.axis || (t.overflowOffset.top + t.scrollParent[0].offsetHeight - n.pageY < o.scrollSensitivity ? t.scrollParent[0].scrollTop = i = t.scrollParent[0].scrollTop + o.scrollSpeed : n.pageY - t.overflowOffset.top < o.scrollSensitivity && (t.scrollParent[0].scrollTop = i = t.scrollParent[0].scrollTop - o.scrollSpeed)), 
   o.axis && "y" === o.axis || (t.overflowOffset.left + t.scrollParent[0].offsetWidth - n.pageX < o.scrollSensitivity ? t.scrollParent[0].scrollLeft = i = t.scrollParent[0].scrollLeft + o.scrollSpeed : n.pageX - t.overflowOffset.left < o.scrollSensitivity && (t.scrollParent[0].scrollLeft = i = t.scrollParent[0].scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (n.pageY - e(document).scrollTop() < o.scrollSensitivity ? i = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed) : e(window).height() - (n.pageY - e(document).scrollTop()) < o.scrollSensitivity && (i = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed))), 
   o.axis && "y" === o.axis || (n.pageX - e(document).scrollLeft() < o.scrollSensitivity ? i = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed) : e(window).width() - (n.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (i = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed)))), 
   i !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(t, n);
  }
 }), e.ui.plugin.add("draggable", "snap", {
  start: function() {
   var n = e(this).data("ui-draggable"), t = n.options;
   n.snapElements = [], e(t.snap.constructor !== String ? t.snap.items || ":data(ui-draggable)" : t.snap).each(function() {
    var t = e(this), o = t.offset();
    this !== n.element[0] && n.snapElements.push({
     item: this,
     width: t.outerWidth(),
     height: t.outerHeight(),
     top: o.top,
     left: o.left
    });
   });
  },
  drag: function(n, t) {
   var o, i, r, a, s, l, c, d, u, p, f = e(this).data("ui-draggable"), h = f.options, g = h.snapTolerance, m = t.offset.left, b = m + f.helperProportions.width, v = t.offset.top, y = v + f.helperProportions.height;
   for (u = f.snapElements.length - 1; u >= 0; u--) s = f.snapElements[u].left, l = s + f.snapElements[u].width, 
   c = f.snapElements[u].top, d = c + f.snapElements[u].height, s - g > b || m > l + g || c - g > y || v > d + g || !e.contains(f.snapElements[u].item.ownerDocument, f.snapElements[u].item) ? (f.snapElements[u].snapping && f.options.snap.release && f.options.snap.release.call(f.element, n, e.extend(f._uiHash(), {
    snapItem: f.snapElements[u].item
   })), f.snapElements[u].snapping = !1) : ("inner" !== h.snapMode && (o = Math.abs(c - y) <= g, 
   i = Math.abs(d - v) <= g, r = Math.abs(s - b) <= g, a = Math.abs(l - m) <= g, o && (t.position.top = f._convertPositionTo("relative", {
    top: c - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), i && (t.position.top = f._convertPositionTo("relative", {
    top: d,
    left: 0
   }).top - f.margins.top), r && (t.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s - f.helperProportions.width
   }).left - f.margins.left), a && (t.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l
   }).left - f.margins.left)), p = o || i || r || a, "outer" !== h.snapMode && (o = Math.abs(c - v) <= g, 
   i = Math.abs(d - y) <= g, r = Math.abs(s - m) <= g, a = Math.abs(l - b) <= g, o && (t.position.top = f._convertPositionTo("relative", {
    top: c,
    left: 0
   }).top - f.margins.top), i && (t.position.top = f._convertPositionTo("relative", {
    top: d - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), r && (t.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s
   }).left - f.margins.left), a && (t.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l - f.helperProportions.width
   }).left - f.margins.left)), !f.snapElements[u].snapping && (o || i || r || a || p) && f.options.snap.snap && f.options.snap.snap.call(f.element, n, e.extend(f._uiHash(), {
    snapItem: f.snapElements[u].item
   })), f.snapElements[u].snapping = o || i || r || a || p);
  }
 }), e.ui.plugin.add("draggable", "stack", {
  start: function() {
   var n, t = this.data("ui-draggable").options, o = e.makeArray(e(t.stack)).sort(function(n, t) {
    return (parseInt(e(n).css("zIndex"), 10) || 0) - (parseInt(e(t).css("zIndex"), 10) || 0);
   });
   o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function(t) {
    e(this).css("zIndex", n + t);
   }), this.css("zIndex", n + o.length));
  }
 }), e.ui.plugin.add("draggable", "zIndex", {
  start: function(n, t) {
   var o = e(t.helper), i = e(this).data("ui-draggable").options;
   o.css("zIndex") && (i._zIndex = o.css("zIndex")), o.css("zIndex", i.zIndex);
  },
  stop: function(n, t) {
   var o = e(this).data("ui-draggable").options;
   o._zIndex && e(t.helper).css("zIndex", o._zIndex);
  }
 });
}(jQuery), function(e, n) {
 var t = "ui-effects-";
 e.effects = {
  effect: {}
 }, function(e, n) {
  function t(e, n, t) {
   var o = u[n.type] || {};
   return null == e ? t || !n.def ? null : n.def : (e = o.floor ? ~~e : parseFloat(e), 
   isNaN(e) ? n.def : o.mod ? (e + o.mod) % o.mod : 0 > e ? 0 : o.max < e ? o.max : e);
  }
  function o(n) {
   var t = c(), o = t._rgba = [];
   return n = n.toLowerCase(), h(l, function(e, i) {
    var r, a = i.re.exec(n), s = a && i.parse(a), l = i.space || "rgba";
    return s ? (r = t[l](s), t[d[l].cache] = r[d[l].cache], o = t._rgba = r._rgba, !1) : void 0;
   }), o.length ? ("0,0,0,0" === o.join() && e.extend(o, r.transparent), t) : r[n];
  }
  function i(e, n, t) {
   return t = (t + 1) % 1, 1 > 6 * t ? e + 6 * (n - e) * t : 1 > 2 * t ? n : 2 > 3 * t ? e + 6 * (n - e) * (2 / 3 - t) : e;
  }
  var r, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", s = /^([\-+])=\s*(\d+\.?\d*)/, l = [ {
   re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
   parse: function(e) {
    return [ e[1], e[2], e[3], e[4] ];
   }
  }, {
   re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
   parse: function(e) {
    return [ 2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4] ];
   }
  }, {
   re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
   parse: function(e) {
    return [ parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16) ];
   }
  }, {
   re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
   parse: function(e) {
    return [ parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16) ];
   }
  }, {
   re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
   space: "hsla",
   parse: function(e) {
    return [ e[1], e[2] / 100, e[3] / 100, e[4] ];
   }
  } ], c = e.Color = function(n, t, o, i) {
   return new e.Color.fn.parse(n, t, o, i);
  }, d = {
   rgba: {
    props: {
     red: {
      idx: 0,
      type: "byte"
     },
     green: {
      idx: 1,
      type: "byte"
     },
     blue: {
      idx: 2,
      type: "byte"
     }
    }
   },
   hsla: {
    props: {
     hue: {
      idx: 0,
      type: "degrees"
     },
     saturation: {
      idx: 1,
      type: "percent"
     },
     lightness: {
      idx: 2,
      type: "percent"
     }
    }
   }
  }, u = {
   "byte": {
    floor: !0,
    max: 255
   },
   percent: {
    max: 1
   },
   degrees: {
    mod: 360,
    floor: !0
   }
  }, p = c.support = {}, f = e("<p>")[0], h = e.each;
  f.style.cssText = "background-color:rgba(1,1,1,.5)", p.rgba = f.style.backgroundColor.indexOf("rgba") > -1, 
  h(d, function(e, n) {
   n.cache = "_" + e, n.props.alpha = {
    idx: 3,
    type: "percent",
    def: 1
   };
  }), c.fn = e.extend(c.prototype, {
   parse: function(i, a, s, l) {
    if (i === n) return this._rgba = [ null, null, null, null ], this;
    (i.jquery || i.nodeType) && (i = e(i).css(a), a = n);
    var u = this, p = e.type(i), f = this._rgba = [];
    return a !== n && (i = [ i, a, s, l ], p = "array"), "string" === p ? this.parse(o(i) || r._default) : "array" === p ? (h(d.rgba.props, function(e, n) {
     f[n.idx] = t(i[n.idx], n);
    }), this) : "object" === p ? (i instanceof c ? h(d, function(e, n) {
     i[n.cache] && (u[n.cache] = i[n.cache].slice());
    }) : h(d, function(n, o) {
     var r = o.cache;
     h(o.props, function(e, n) {
      if (!u[r] && o.to) {
       if ("alpha" === e || null == i[e]) return;
       u[r] = o.to(u._rgba);
      }
      u[r][n.idx] = t(i[e], n, !0);
     }), u[r] && e.inArray(null, u[r].slice(0, 3)) < 0 && (u[r][3] = 1, o.from && (u._rgba = o.from(u[r])));
    }), this) : void 0;
   },
   is: function(e) {
    var n = c(e), t = !0, o = this;
    return h(d, function(e, i) {
     var r, a = n[i.cache];
     return a && (r = o[i.cache] || i.to && i.to(o._rgba) || [], h(i.props, function(e, n) {
      return null != a[n.idx] ? t = a[n.idx] === r[n.idx] : void 0;
     })), t;
    }), t;
   },
   _space: function() {
    var e = [], n = this;
    return h(d, function(t, o) {
     n[o.cache] && e.push(t);
    }), e.pop();
   },
   transition: function(e, n) {
    var o = c(e), i = o._space(), r = d[i], a = 0 === this.alpha() ? c("transparent") : this, s = a[r.cache] || r.to(a._rgba), l = s.slice();
    return o = o[r.cache], h(r.props, function(e, i) {
     var r = i.idx, a = s[r], c = o[r], d = u[i.type] || {};
     null !== c && (null === a ? l[r] = c : (d.mod && (c - a > d.mod / 2 ? a += d.mod : a - c > d.mod / 2 && (a -= d.mod)), 
     l[r] = t((c - a) * n + a, i)));
    }), this[i](l);
   },
   blend: function(n) {
    if (1 === this._rgba[3]) return this;
    var t = this._rgba.slice(), o = t.pop(), i = c(n)._rgba;
    return c(e.map(t, function(e, n) {
     return (1 - o) * i[n] + o * e;
    }));
   },
   toRgbaString: function() {
    var n = "rgba(", t = e.map(this._rgba, function(e, n) {
     return null == e ? n > 2 ? 1 : 0 : e;
    });
    return 1 === t[3] && (t.pop(), n = "rgb("), n + t.join() + ")";
   },
   toHslaString: function() {
    var n = "hsla(", t = e.map(this.hsla(), function(e, n) {
     return null == e && (e = n > 2 ? 1 : 0), n && 3 > n && (e = Math.round(100 * e) + "%"), 
     e;
    });
    return 1 === t[3] && (t.pop(), n = "hsl("), n + t.join() + ")";
   },
   toHexString: function(n) {
    var t = this._rgba.slice(), o = t.pop();
    return n && t.push(~~(255 * o)), "#" + e.map(t, function(e) {
     return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e;
    }).join("");
   },
   toString: function() {
    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
   }
  }), c.fn.parse.prototype = c.fn, d.hsla.to = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var n, t, o = e[0] / 255, i = e[1] / 255, r = e[2] / 255, a = e[3], s = Math.max(o, i, r), l = Math.min(o, i, r), c = s - l, d = s + l, u = .5 * d;
   return n = l === s ? 0 : o === s ? 60 * (i - r) / c + 360 : i === s ? 60 * (r - o) / c + 120 : 60 * (o - i) / c + 240, 
   t = 0 === c ? 0 : .5 >= u ? c / d : c / (2 - d), [ Math.round(n) % 360, t, u, null == a ? 1 : a ];
  }, d.hsla.from = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var n = e[0] / 360, t = e[1], o = e[2], r = e[3], a = .5 >= o ? o * (1 + t) : o + t - o * t, s = 2 * o - a;
   return [ Math.round(255 * i(s, a, n + 1 / 3)), Math.round(255 * i(s, a, n)), Math.round(255 * i(s, a, n - 1 / 3)), r ];
  }, h(d, function(o, i) {
   var r = i.props, a = i.cache, l = i.to, d = i.from;
   c.fn[o] = function(o) {
    if (l && !this[a] && (this[a] = l(this._rgba)), o === n) return this[a].slice();
    var i, s = e.type(o), u = "array" === s || "object" === s ? o : arguments, p = this[a].slice();
    return h(r, function(e, n) {
     var o = u["object" === s ? e : n.idx];
     null == o && (o = p[n.idx]), p[n.idx] = t(o, n);
    }), d ? (i = c(d(p)), i[a] = p, i) : c(p);
   }, h(r, function(n, t) {
    c.fn[n] || (c.fn[n] = function(i) {
     var r, a = e.type(i), l = "alpha" === n ? this._hsla ? "hsla" : "rgba" : o, c = this[l](), d = c[t.idx];
     return "undefined" === a ? d : ("function" === a && (i = i.call(this, d), a = e.type(i)), 
     null == i && t.empty ? this : ("string" === a && (r = s.exec(i), r && (i = d + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), 
     c[t.idx] = i, this[l](c)));
    });
   });
  }), c.hook = function(n) {
   var t = n.split(" ");
   h(t, function(n, t) {
    e.cssHooks[t] = {
     set: function(n, i) {
      var r, a, s = "";
      if ("transparent" !== i && ("string" !== e.type(i) || (r = o(i)))) {
       if (i = c(r || i), !p.rgba && 1 !== i._rgba[3]) {
        for (a = "backgroundColor" === t ? n.parentNode : n; ("" === s || "transparent" === s) && a && a.style; ) try {
         s = e.css(a, "backgroundColor"), a = a.parentNode;
        } catch (l) {}
        i = i.blend(s && "transparent" !== s ? s : "_default");
       }
       i = i.toRgbaString();
      }
      try {
       n.style[t] = i;
      } catch (l) {}
     }
    }, e.fx.step[t] = function(n) {
     n.colorInit || (n.start = c(n.elem, t), n.end = c(n.end), n.colorInit = !0), e.cssHooks[t].set(n.elem, n.start.transition(n.end, n.pos));
    };
   });
  }, c.hook(a), e.cssHooks.borderColor = {
   expand: function(e) {
    var n = {};
    return h([ "Top", "Right", "Bottom", "Left" ], function(t, o) {
     n["border" + o + "Color"] = e;
    }), n;
   }
  }, r = e.Color.names = {
   aqua: "#00ffff",
   black: "#000000",
   blue: "#0000ff",
   fuchsia: "#ff00ff",
   gray: "#808080",
   green: "#008000",
   lime: "#00ff00",
   maroon: "#800000",
   navy: "#000080",
   olive: "#808000",
   purple: "#800080",
   red: "#ff0000",
   silver: "#c0c0c0",
   teal: "#008080",
   white: "#ffffff",
   yellow: "#ffff00",
   transparent: [ null, null, null, 0 ],
   _default: "#ffffff"
  };
 }(jQuery), function() {
  function t(n) {
   var t, o, i = n.ownerDocument.defaultView ? n.ownerDocument.defaultView.getComputedStyle(n, null) : n.currentStyle, r = {};
   if (i && i.length && i[0] && i[i[0]]) for (o = i.length; o--; ) t = i[o], "string" == typeof i[t] && (r[e.camelCase(t)] = i[t]); else for (t in i) "string" == typeof i[t] && (r[t] = i[t]);
   return r;
  }
  function o(n, t) {
   var o, i, a = {};
   for (o in t) i = t[o], n[o] !== i && (r[o] || (e.fx.step[o] || !isNaN(parseFloat(i))) && (a[o] = i));
   return a;
  }
  var i = [ "add", "remove", "toggle" ], r = {
   border: 1,
   borderBottom: 1,
   borderColor: 1,
   borderLeft: 1,
   borderRight: 1,
   borderTop: 1,
   borderWidth: 1,
   margin: 1,
   padding: 1
  };
  e.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function(n, t) {
   e.fx.step[t] = function(e) {
    ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, t, e.end), 
    e.setAttr = !0);
   };
  }), e.fn.addBack || (e.fn.addBack = function(e) {
   return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
  }), e.effects.animateClass = function(n, r, a, s) {
   var l = e.speed(r, a, s);
   return this.queue(function() {
    var r, a = e(this), s = a.attr("class") || "", c = l.children ? a.find("*").addBack() : a;
    c = c.map(function() {
     var n = e(this);
     return {
      el: n,
      start: t(this)
     };
    }), r = function() {
     e.each(i, function(e, t) {
      n[t] && a[t + "Class"](n[t]);
     });
    }, r(), c = c.map(function() {
     return this.end = t(this.el[0]), this.diff = o(this.start, this.end), this;
    }), a.attr("class", s), c = c.map(function() {
     var n = this, t = e.Deferred(), o = e.extend({}, l, {
      queue: !1,
      complete: function() {
       t.resolve(n);
      }
     });
     return this.el.animate(this.diff, o), t.promise();
    }), e.when.apply(e, c.get()).done(function() {
     r(), e.each(arguments, function() {
      var n = this.el;
      e.each(this.diff, function(e) {
       n.css(e, "");
      });
     }), l.complete.call(a[0]);
    });
   });
  }, e.fn.extend({
   addClass: function(n) {
    return function(t, o, i, r) {
     return o ? e.effects.animateClass.call(this, {
      add: t
     }, o, i, r) : n.apply(this, arguments);
    };
   }(e.fn.addClass),
   removeClass: function(n) {
    return function(t, o, i, r) {
     return arguments.length > 1 ? e.effects.animateClass.call(this, {
      remove: t
     }, o, i, r) : n.apply(this, arguments);
    };
   }(e.fn.removeClass),
   toggleClass: function(t) {
    return function(o, i, r, a, s) {
     return "boolean" == typeof i || i === n ? r ? e.effects.animateClass.call(this, i ? {
      add: o
     } : {
      remove: o
     }, r, a, s) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
      toggle: o
     }, i, r, a);
    };
   }(e.fn.toggleClass),
   switchClass: function(n, t, o, i, r) {
    return e.effects.animateClass.call(this, {
     add: t,
     remove: n
    }, o, i, r);
   }
  });
 }(), function() {
  function o(n, t, o, i) {
   return e.isPlainObject(n) && (t = n, n = n.effect), n = {
    effect: n
   }, null == t && (t = {}), e.isFunction(t) && (i = t, o = null, t = {}), ("number" == typeof t || e.fx.speeds[t]) && (i = o, 
   o = t, t = {}), e.isFunction(o) && (i = o, o = null), t && e.extend(n, t), o = o || t.duration, 
   n.duration = e.fx.off ? 0 : "number" == typeof o ? o : o in e.fx.speeds ? e.fx.speeds[o] : e.fx.speeds._default, 
   n.complete = i || t.complete, n;
  }
  function i(n) {
   return !n || "number" == typeof n || e.fx.speeds[n] ? !0 : "string" != typeof n || e.effects.effect[n] ? e.isFunction(n) ? !0 : "object" != typeof n || n.effect ? !1 : !0 : !0;
  }
  e.extend(e.effects, {
   version: "1.10.3",
   save: function(e, n) {
    for (var o = 0; o < n.length; o++) null !== n[o] && e.data(t + n[o], e[0].style[n[o]]);
   },
   restore: function(e, o) {
    var i, r;
    for (r = 0; r < o.length; r++) null !== o[r] && (i = e.data(t + o[r]), i === n && (i = ""), 
    e.css(o[r], i));
   },
   setMode: function(e, n) {
    return "toggle" === n && (n = e.is(":hidden") ? "show" : "hide"), n;
   },
   getBaseline: function(e, n) {
    var t, o;
    switch (e[0]) {
    case "top":
     t = 0;
     break;

    case "middle":
     t = .5;
     break;

    case "bottom":
     t = 1;
     break;

    default:
     t = e[0] / n.height;
    }
    switch (e[1]) {
    case "left":
     o = 0;
     break;

    case "center":
     o = .5;
     break;

    case "right":
     o = 1;
     break;

    default:
     o = e[1] / n.width;
    }
    return {
     x: o,
     y: t
    };
   },
   createWrapper: function(n) {
    if (n.parent().is(".ui-effects-wrapper")) return n.parent();
    var t = {
     width: n.outerWidth(!0),
     height: n.outerHeight(!0),
     "float": n.css("float")
    }, o = e("<div></div>").addClass("ui-effects-wrapper").css({
     fontSize: "100%",
     background: "transparent",
     border: "none",
     margin: 0,
     padding: 0
    }), i = {
     width: n.width(),
     height: n.height()
    }, r = document.activeElement;
    try {
     r.id;
    } catch (a) {
     r = document.body;
    }
    return n.wrap(o), (n[0] === r || e.contains(n[0], r)) && e(r).focus(), o = n.parent(), 
    "static" === n.css("position") ? (o.css({
     position: "relative"
    }), n.css({
     position: "relative"
    })) : (e.extend(t, {
     position: n.css("position"),
     zIndex: n.css("z-index")
    }), e.each([ "top", "left", "bottom", "right" ], function(e, o) {
     t[o] = n.css(o), isNaN(parseInt(t[o], 10)) && (t[o] = "auto");
    }), n.css({
     position: "relative",
     top: 0,
     left: 0,
     right: "auto",
     bottom: "auto"
    })), n.css(i), o.css(t).show();
   },
   removeWrapper: function(n) {
    var t = document.activeElement;
    return n.parent().is(".ui-effects-wrapper") && (n.parent().replaceWith(n), (n[0] === t || e.contains(n[0], t)) && e(t).focus()), 
    n;
   },
   setTransition: function(n, t, o, i) {
    return i = i || {}, e.each(t, function(e, t) {
     var r = n.cssUnit(t);
     r[0] > 0 && (i[t] = r[0] * o + r[1]);
    }), i;
   }
  }), e.fn.extend({
   effect: function() {
    function n(n) {
     function o() {
      e.isFunction(r) && r.call(i[0]), e.isFunction(n) && n();
     }
     var i = e(this), r = t.complete, s = t.mode;
     (i.is(":hidden") ? "hide" === s : "show" === s) ? (i[s](), o()) : a.call(i[0], t, o);
    }
    var t = o.apply(this, arguments), i = t.mode, r = t.queue, a = e.effects.effect[t.effect];
    return e.fx.off || !a ? i ? this[i](t.duration, t.complete) : this.each(function() {
     t.complete && t.complete.call(this);
    }) : r === !1 ? this.each(n) : this.queue(r || "fx", n);
   },
   show: function(e) {
    return function(n) {
     if (i(n)) return e.apply(this, arguments);
     var t = o.apply(this, arguments);
     return t.mode = "show", this.effect.call(this, t);
    };
   }(e.fn.show),
   hide: function(e) {
    return function(n) {
     if (i(n)) return e.apply(this, arguments);
     var t = o.apply(this, arguments);
     return t.mode = "hide", this.effect.call(this, t);
    };
   }(e.fn.hide),
   toggle: function(e) {
    return function(n) {
     if (i(n) || "boolean" == typeof n) return e.apply(this, arguments);
     var t = o.apply(this, arguments);
     return t.mode = "toggle", this.effect.call(this, t);
    };
   }(e.fn.toggle),
   cssUnit: function(n) {
    var t = this.css(n), o = [];
    return e.each([ "em", "px", "%", "pt" ], function(e, n) {
     t.indexOf(n) > 0 && (o = [ parseFloat(t), n ]);
    }), o;
   }
  });
 }(), function() {
  var n = {};
  e.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(e, t) {
   n[t] = function(n) {
    return Math.pow(n, e + 2);
   };
  }), e.extend(n, {
   Sine: function(e) {
    return 1 - Math.cos(e * Math.PI / 2);
   },
   Circ: function(e) {
    return 1 - Math.sqrt(1 - e * e);
   },
   Elastic: function(e) {
    return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15);
   },
   Back: function(e) {
    return e * e * (3 * e - 2);
   },
   Bounce: function(e) {
    for (var n, t = 4; e < ((n = Math.pow(2, --t)) - 1) / 11; ) ;
    return 1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((3 * n - 2) / 22 - e, 2);
   }
  }), e.each(n, function(n, t) {
   e.easing["easeIn" + n] = t, e.easing["easeOut" + n] = function(e) {
    return 1 - t(1 - e);
   }, e.easing["easeInOut" + n] = function(e) {
    return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2;
   };
  });
 }();
}(jQuery), function(e) {
 e.effects.effect.slide = function(n, t) {
  var o, i = e(this), r = [ "position", "top", "bottom", "left", "right", "width", "height" ], a = e.effects.setMode(i, n.mode || "show"), s = "show" === a, l = n.direction || "left", c = "up" === l || "down" === l ? "top" : "left", d = "up" === l || "left" === l, u = {};
  e.effects.save(i, r), i.show(), o = n.distance || i["top" === c ? "outerHeight" : "outerWidth"](!0), 
  e.effects.createWrapper(i).css({
   overflow: "hidden"
  }), s && i.css(c, d ? isNaN(o) ? "-" + o : -o : o), u[c] = (s ? d ? "+=" : "-=" : d ? "-=" : "+=") + o, 
  i.animate(u, {
   queue: !1,
   duration: n.duration,
   easing: n.easing,
   complete: function() {
    "hide" === a && i.hide(), e.effects.restore(i, r), e.effects.removeWrapper(i), t();
   }
  });
 };
}(jQuery), define("libs/jquery-ui", function() {}), function($) {
 var min = Math.min, max = Math.max, round = Math.floor, isStr = function(e) {
  return "string" === $.type(e);
 }, runPluginCallbacks = function(Instance, a_fn) {
  function g(e) {
   return e;
  }
  if ($.isArray(a_fn)) for (var i = 0, c = a_fn.length; c > i; i++) {
   var fn = a_fn[i];
   try {
    isStr(fn) && (fn = eval(fn)), $.isFunction(fn) && g(fn)(Instance);
   } catch (ex) {}
  }
 };
 $.layout = {
  version: "1.3.rc30.79",
  revision: .033007,
  browser: {},
  effects: {
   slide: {
    all: {
     duration: "fast"
    },
    north: {
     direction: "up"
    },
    south: {
     direction: "down"
    },
    east: {
     direction: "right"
    },
    west: {
     direction: "left"
    }
   },
   drop: {
    all: {
     duration: "slow"
    },
    north: {
     direction: "up"
    },
    south: {
     direction: "down"
    },
    east: {
     direction: "right"
    },
    west: {
     direction: "left"
    }
   },
   scale: {
    all: {
     duration: "fast"
    }
   },
   blind: {},
   clip: {},
   explode: {},
   fade: {},
   fold: {},
   puff: {},
   size: {
    all: {
     easing: "swing"
    }
   }
  },
  config: {
   optionRootKeys: "effects,panes,north,south,west,east,center".split(","),
   allPanes: "north,south,west,east,center".split(","),
   borderPanes: "north,south,west,east".split(","),
   oppositeEdge: {
    north: "south",
    south: "north",
    east: "west",
    west: "east"
   },
   offscreenCSS: {
    left: "-99999px",
    right: "auto"
   },
   offscreenReset: "offscreenReset",
   hidden: {
    visibility: "hidden"
   },
   visible: {
    visibility: "visible"
   },
   resizers: {
    cssReq: {
     position: "absolute",
     padding: 0,
     margin: 0,
     fontSize: "1px",
     textAlign: "left",
     overflow: "hidden"
    },
    cssDemo: {
     background: "#DDD",
     border: "none"
    }
   },
   togglers: {
    cssReq: {
     position: "absolute",
     display: "block",
     padding: 0,
     margin: 0,
     overflow: "hidden",
     textAlign: "center",
     fontSize: "1px",
     cursor: "pointer",
     zIndex: 1
    },
    cssDemo: {
     background: "#AAA"
    }
   },
   content: {
    cssReq: {
     position: "relative"
    },
    cssDemo: {
     overflow: "auto",
     padding: "10px"
    },
    cssDemoPane: {
     overflow: "hidden",
     padding: 0
    }
   },
   panes: {
    cssReq: {
     position: "absolute",
     margin: 0
    },
    cssDemo: {
     padding: "10px",
     background: "#FFF",
     border: "1px solid #BBB",
     overflow: "auto"
    }
   },
   north: {
    side: "top",
    sizeType: "Height",
    dir: "horz",
    cssReq: {
     top: 0,
     bottom: "auto",
     left: 0,
     right: 0,
     width: "auto"
    }
   },
   south: {
    side: "bottom",
    sizeType: "Height",
    dir: "horz",
    cssReq: {
     top: "auto",
     bottom: 0,
     left: 0,
     right: 0,
     width: "auto"
    }
   },
   east: {
    side: "right",
    sizeType: "Width",
    dir: "vert",
    cssReq: {
     left: "auto",
     right: 0,
     top: "auto",
     bottom: "auto",
     height: "auto"
    }
   },
   west: {
    side: "left",
    sizeType: "Width",
    dir: "vert",
    cssReq: {
     left: 0,
     right: "auto",
     top: "auto",
     bottom: "auto",
     height: "auto"
    }
   },
   center: {
    dir: "center",
    cssReq: {
     left: "auto",
     right: "auto",
     top: "auto",
     bottom: "auto",
     height: "auto",
     width: "auto"
    }
   }
  },
  callbacks: {},
  getParentPaneElem: function(e) {
   var n = $(e), t = n.data("layout") || n.data("parentLayout");
   if (t) {
    var o = t.container;
    if (o.data("layoutPane")) return o;
    var i = o.closest("." + $.layout.defaults.panes.paneClass);
    if (i.data("layoutPane")) return i;
   }
   return null;
  },
  getParentPaneInstance: function(e) {
   var n = $.layout.getParentPaneElem(e);
   return n ? n.data("layoutPane") : null;
  },
  getParentLayoutInstance: function(e) {
   var n = $.layout.getParentPaneElem(e);
   return n ? n.data("parentLayout") : null;
  },
  getEventObject: function(e) {
   return "object" == typeof e && e.stopPropagation ? e : null;
  },
  parsePaneName: function(e) {
   var n = $.layout.getEventObject(e), t = e;
   return n && (n.stopPropagation(), t = $(this).data("layoutEdge")), t && !/^(west|east|north|south|center)$/.test(t) && ($.layout.msg('LAYOUT ERROR - Invalid pane-name: "' + t + '"'), 
   t = "error"), t;
  },
  plugins: {
   draggable: !!$.fn.draggable,
   effects: {
    core: !!$.effects,
    slide: $.effects && ($.effects.slide || $.effects.effect && $.effects.effect.slide)
   }
  },
  onCreate: [],
  onLoad: [],
  onReady: [],
  onDestroy: [],
  onUnload: [],
  afterOpen: [],
  afterClose: [],
  scrollbarWidth: function() {
   return window.scrollbarWidth || $.layout.getScrollbarSize("width");
  },
  scrollbarHeight: function() {
   return window.scrollbarHeight || $.layout.getScrollbarSize("height");
  },
  getScrollbarSize: function(e) {
   var n = $('<div style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; overflow: scroll;"></div>').appendTo("body"), t = {
    width: n.css("width") - n[0].clientWidth,
    height: n.height() - n[0].clientHeight
   };
   return n.remove(), window.scrollbarWidth = t.width, window.scrollbarHeight = t.height, 
   e.match(/^(width|height)$/) ? t[e] : t;
  },
  showInvisibly: function(e, n) {
   if (e && e.length && (n || "none" === e.css("display"))) {
    var t = e[0].style, o = {
     display: t.display || "",
     visibility: t.visibility || ""
    };
    return e.css({
     display: "block",
     visibility: "hidden"
    }), o;
   }
   return {};
  },
  getElementDimensions: function(e, n) {
   var t, o, i, r = {
    css: {},
    inset: {}
   }, a = r.css, s = {
    bottom: 0
   }, l = $.layout.cssNum, c = e.offset();
   return r.offsetLeft = c.left, r.offsetTop = c.top, n || (n = {}), $.each("Left,Right,Top,Bottom".split(","), function(l, c) {
    t = a["border" + c] = $.layout.borderWidth(e, c), o = a["padding" + c] = $.layout.cssNum(e, "padding" + c), 
    i = c.toLowerCase(), r.inset[i] = n[i] >= 0 ? n[i] : o, s[i] = r.inset[i] + t;
   }), a.width = e.width(), a.height = e.height(), a.top = l(e, "top", !0), a.bottom = l(e, "bottom", !0), 
   a.left = l(e, "left", !0), a.right = l(e, "right", !0), r.outerWidth = e.outerWidth(), 
   r.outerHeight = e.outerHeight(), r.innerWidth = max(0, r.outerWidth - s.left - s.right), 
   r.innerHeight = max(0, r.outerHeight - s.top - s.bottom), r.layoutWidth = e.innerWidth(), 
   r.layoutHeight = e.innerHeight(), r;
  },
  getElementStyles: function(e, n) {
   var t, o, i, r, a, s, l = {}, c = e[0].style, d = n.split(","), u = "Top,Bottom,Left,Right".split(","), p = "Color,Style,Width".split(",");
   for (r = 0; r < d.length; r++) if (t = d[r], t.match(/(border|padding|margin)$/)) for (a = 0; 4 > a; a++) if (o = u[a], 
   "border" === t) for (s = 0; 3 > s; s++) i = p[s], l[t + o + i] = c[t + o + i]; else l[t + o] = c[t + o]; else l[t] = c[t];
   return l;
  },
  cssWidth: function(e, n) {
   if (0 >= n) return 0;
   var t = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", o = $.layout.borderWidth, i = $.layout.cssNum, r = n;
   return "border-box" !== t && (r -= o(e, "Left") + o(e, "Right")), "content-box" === t && (r -= i(e, "paddingLeft") + i(e, "paddingRight")), 
   max(0, r);
  },
  cssHeight: function(e, n) {
   if (0 >= n) return 0;
   var t = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", o = $.layout.borderWidth, i = $.layout.cssNum, r = n;
   return "border-box" !== t && (r -= o(e, "Top") + o(e, "Bottom")), "content-box" === t && (r -= i(e, "paddingTop") + i(e, "paddingBottom")), 
   max(0, r);
  },
  cssNum: function(e, n, t) {
   e.jquery || (e = $(e));
   var o = $.layout.showInvisibly(e), i = $.css(e[0], n, !0), r = t && "auto" == i ? i : Math.round(parseFloat(i) || 0);
   return e.css(o), r;
  },
  borderWidth: function(e, n) {
   e.jquery && (e = e[0]);
   var t = "border" + n.substr(0, 1).toUpperCase() + n.substr(1);
   return "none" === $.css(e, t + "Style", !0) ? 0 : Math.round(parseFloat($.css(e, t + "Width", !0)) || 0);
  },
  isMouseOverElem: function(e, n) {
   var t = $(n || this), o = t.offset(), i = o.top, r = o.left, a = r + t.outerWidth(), s = i + t.outerHeight(), l = e.pageX, c = e.pageY;
   return $.layout.browser.msie && 0 > l && 0 > c || l >= r && a >= l && c >= i && s >= c;
  },
  msg: function(e, n, t, o) {
   function i() {
    var e = $.support.fixedPosition ? "fixed" : "absolute", n = $('<div id="layoutLogger" style="position: ' + e + '; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">' + '<div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;">' + '<span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div>' + '<ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul>' + "</div>").appendTo("body");
    return n.css("left", $(window).width() - n.outerWidth() - 5), $.ui.draggable && n.draggable({
     handle: ":first-child"
    }), n;
   }
   if ($.isPlainObject(e) && window.debugData) {
    "string" == typeof n ? (o = t, t = n) : "object" == typeof t && (o = t, t = null);
    var r = t || "log( <object> )", a = $.extend({
     sort: !1,
     returnHTML: !1,
     display: !1
    }, o);
    n === !0 || a.display ? debugData(e, r, a) : window.console && console.log(debugData(e, r, a));
   } else if (n) alert(e); else if (window.console) console.log(e); else {
    var s = "#layoutLogger", l = $(s);
    l.length || (l = i()), l.children("ul").append('<li style="padding: 4px 10px; margin: 0; border-top: 1px solid #CCC;">' + e.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + "</li>");
   }
  }
 };
 var u = navigator.userAgent.toLowerCase(), m = /(chrome)[ \/]([\w.]+)/.exec(u) || /(webkit)[ \/]([\w.]+)/.exec(u) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(u) || /(msie) ([\w.]+)/.exec(u) || u.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(u) || [], b = m[1] || "", v = m[2] || 0, ie = "msie" === b;
 $.layout.browser = {
  version: v,
  safari: "webkit" === b,
  webkit: "chrome" === b,
  msie: ie,
  isIE6: ie && 6 == v,
  boxModel: !ie || $.support.boxModel !== !1
 }, b && ($.layout.browser[b] = !0), ie && $(function() {
  $.layout.browser.boxModel = $.support.boxModel;
 }), $.layout.defaults = {
  name: "",
  containerClass: "ui-layout-container",
  inset: null,
  scrollToBookmarkOnLoad: !0,
  resizeWithWindow: !0,
  resizeWithWindowDelay: 200,
  resizeWithWindowMaxDelay: 0,
  maskPanesEarly: !1,
  onresizeall_start: null,
  onresizeall_end: null,
  onload_start: null,
  onload_end: null,
  onunload_start: null,
  onunload_end: null,
  initPanes: !0,
  showErrorMessages: !0,
  showDebugMessages: !1,
  zIndex: null,
  zIndexes: {
   pane_normal: 0,
   content_mask: 1,
   resizer_normal: 2,
   pane_sliding: 100,
   pane_animate: 1e3,
   resizer_drag: 1e4
  },
  errors: {
   pane: "pane",
   selector: "selector",
   addButtonError: "Error Adding Button\nInvalid ",
   containerMissing: "UI Layout Initialization Error\nThe specified layout-container does not exist.",
   centerPaneMissing: "UI Layout Initialization Error\nThe center-pane element does not exist.\nThe center-pane is a required element.",
   noContainerHeight: "UI Layout Initialization Warning\nThe layout-container \"CONTAINER\" has no height.\nTherefore the layout is 0-height and hence 'invisible'!",
   callbackError: "UI Layout Callback Error\nThe EVENT callback is not a valid function."
  },
  panes: {
   applyDemoStyles: !1,
   closable: !0,
   resizable: !0,
   slidable: !0,
   initClosed: !1,
   initHidden: !1,
   contentSelector: ".ui-layout-content",
   contentIgnoreSelector: ".ui-layout-ignore",
   findNestedContent: !1,
   paneClass: "ui-layout-pane",
   resizerClass: "ui-layout-resizer",
   togglerClass: "ui-layout-toggler",
   buttonClass: "ui-layout-button",
   minSize: 0,
   maxSize: 0,
   spacing_open: 6,
   spacing_closed: 6,
   togglerLength_open: 50,
   togglerLength_closed: 50,
   togglerAlign_open: "center",
   togglerAlign_closed: "center",
   togglerContent_open: "",
   togglerContent_closed: "",
   resizerDblClickToggle: !0,
   autoResize: !0,
   autoReopen: !0,
   resizerDragOpacity: 1,
   maskContents: !1,
   maskObjects: !1,
   maskZindex: null,
   resizingGrid: !1,
   livePaneResizing: !1,
   liveContentResizing: !1,
   liveResizingTolerance: 1,
   sliderCursor: "pointer",
   slideTrigger_open: "click",
   slideTrigger_close: "mouseleave",
   slideDelay_open: 300,
   slideDelay_close: 300,
   hideTogglerOnSlide: !1,
   preventQuickSlideClose: $.layout.browser.webkit,
   preventPrematureSlideClose: !1,
   tips: {
    Open: "Open",
    Close: "Close",
    Resize: "Resize",
    Slide: "Slide Open",
    Pin: "Pin",
    Unpin: "Un-Pin",
    noRoomToOpen: "Not enough room to show this panel.",
    minSizeWarning: "Panel has reached its minimum size",
    maxSizeWarning: "Panel has reached its maximum size"
   },
   showOverflowOnHover: !1,
   enableCursorHotkey: !0,
   customHotkeyModifier: "SHIFT",
   fxName: "slide",
   fxSpeed: null,
   fxSettings: {},
   fxOpacityFix: !0,
   animatePaneSizing: !1,
   children: null,
   containerSelector: "",
   initChildren: !0,
   destroyChildren: !0,
   resizeChildren: !0,
   triggerEventsOnLoad: !1,
   triggerEventsDuringLiveResize: !0,
   onshow_start: null,
   onshow_end: null,
   onhide_start: null,
   onhide_end: null,
   onopen_start: null,
   onopen_end: null,
   onclose_start: null,
   onclose_end: null,
   onresize_start: null,
   onresize_end: null,
   onsizecontent_start: null,
   onsizecontent_end: null,
   onswap_start: null,
   onswap_end: null,
   ondrag_start: null,
   ondrag_end: null
  },
  north: {
   paneSelector: ".ui-layout-north",
   size: "auto",
   resizerCursor: "n-resize",
   customHotkey: ""
  },
  south: {
   paneSelector: ".ui-layout-south",
   size: "auto",
   resizerCursor: "s-resize",
   customHotkey: ""
  },
  east: {
   paneSelector: ".ui-layout-east",
   size: 200,
   resizerCursor: "e-resize",
   customHotkey: ""
  },
  west: {
   paneSelector: ".ui-layout-west",
   size: 200,
   resizerCursor: "w-resize",
   customHotkey: ""
  },
  center: {
   paneSelector: ".ui-layout-center",
   minWidth: 0,
   minHeight: 0
  }
 }, $.layout.optionsMap = {
  layout: "name,instanceKey,stateManagement,effects,inset,zIndexes,errors,zIndex,scrollToBookmarkOnLoad,showErrorMessages,maskPanesEarly,outset,resizeWithWindow,resizeWithWindowDelay,resizeWithWindowMaxDelay,onresizeall,onresizeall_start,onresizeall_end,onload,onload_start,onload_end,onunload,onunload_start,onunload_end".split(","),
  center: "paneClass,contentSelector,contentIgnoreSelector,findNestedContent,applyDemoStyles,triggerEventsOnLoad,showOverflowOnHover,maskContents,maskObjects,liveContentResizing,containerSelector,children,initChildren,resizeChildren,destroyChildren,onresize,onresize_start,onresize_end,onsizecontent,onsizecontent_start,onsizecontent_end".split(","),
  noDefault: "paneSelector,resizerCursor,customHotkey".split(",")
 }, $.layout.transformData = function(e, n) {
  var t, o, i, r, a, s, l, c = n ? {
   panes: {},
   center: {}
  } : {};
  if ("object" != typeof e) return c;
  for (o in e) for (t = c, a = e[o], i = o.split("__"), l = i.length - 1, s = 0; l >= s; s++) r = i[s], 
  s === l ? t[r] = $.isPlainObject(a) ? $.layout.transformData(a) : a : (t[r] || (t[r] = {}), 
  t = t[r]);
  return c;
 }, $.layout.backwardCompatibility = {
  map: {
   applyDefaultStyles: "applyDemoStyles",
   childOptions: "children",
   initChildLayout: "initChildren",
   destroyChildLayout: "destroyChildren",
   resizeChildLayout: "resizeChildren",
   resizeNestedLayout: "resizeChildren",
   resizeWhileDragging: "livePaneResizing",
   resizeContentWhileDragging: "liveContentResizing",
   triggerEventsWhileDragging: "triggerEventsDuringLiveResize",
   maskIframesOnResize: "maskContents",
   useStateCookie: "stateManagement.enabled",
   "cookie.autoLoad": "stateManagement.autoLoad",
   "cookie.autoSave": "stateManagement.autoSave",
   "cookie.keys": "stateManagement.stateKeys",
   "cookie.name": "stateManagement.cookie.name",
   "cookie.domain": "stateManagement.cookie.domain",
   "cookie.path": "stateManagement.cookie.path",
   "cookie.expires": "stateManagement.cookie.expires",
   "cookie.secure": "stateManagement.cookie.secure",
   noRoomToOpenTip: "tips.noRoomToOpen",
   togglerTip_open: "tips.Close",
   togglerTip_closed: "tips.Open",
   resizerTip: "tips.Resize",
   sliderTip: "tips.Slide"
  },
  renameOptions: function(e) {
   function n(n, t) {
    for (var o, i = n.split("."), r = i.length - 1, a = {
     branch: e,
     key: i[r]
    }, s = 0; r > s; s++) o = i[s], a.branch = void 0 == a.branch[o] ? t ? a.branch[o] = {} : {} : a.branch[o];
    return a;
   }
   var t, o, i, r = $.layout.backwardCompatibility.map;
   for (var a in r) t = n(a), i = t.branch[t.key], void 0 !== i && (o = n(r[a], !0), 
   o.branch[o.key] = i, delete t.branch[t.key]);
  },
  renameAllOptions: function(e) {
   var n = $.layout.backwardCompatibility.renameOptions;
   return n(e), e.defaults && ("object" != typeof e.panes && (e.panes = {}), $.extend(!0, e.panes, e.defaults), 
   delete e.defaults), e.panes && n(e.panes), $.each($.layout.config.allPanes, function(t, o) {
    e[o] && n(e[o]);
   }), e;
  }
 }, $.fn.layout = function(opts) {
  function keyDown(e) {
   if (!e) return !0;
   var n = e.keyCode;
   if (33 > n) return !0;
   var t, o, i, r, a = {
    38: "north",
    40: "south",
    37: "west",
    39: "east"
   }, s = (e.altKey, e.shiftKey), l = e.ctrlKey, c = l && n >= 37 && 40 >= n;
   return c && options[a[n]].enableCursorHotkey ? r = a[n] : (l || s) && $.each(_c.borderPanes, function(e, a) {
    return t = options[a], o = t.customHotkey, i = t.customHotkeyModifier, (s && "SHIFT" == i || l && "CTRL" == i || l && s) && o && n === (isNaN(o) || 9 >= o ? o.toUpperCase().charCodeAt(0) : o) ? (r = a, 
    !1) : void 0;
   }), r && $Ps[r] && options[r].closable && !state[r].isHidden ? (toggle(r), e.stopPropagation(), 
   e.returnValue = !1, !1) : !0;
  }
  function allowOverflow(e) {
   if (isInitialized()) {
    this && this.tagName && (e = this);
    var n;
    if (isStr(e) ? n = $Ps[e] : $(e).data("layoutRole") ? n = $(e) : $(e).parents().each(function() {
     return $(this).data("layoutRole") ? (n = $(this), !1) : void 0;
    }), n && n.length) {
     var t = n.data("layoutEdge"), o = state[t];
     if (o.cssSaved && resetOverflow(t), o.isSliding || o.isResizing || o.isClosed) return o.cssSaved = !1, 
     void 0;
     var i = {
      zIndex: options.zIndexes.resizer_normal + 1
     }, r = {}, a = n.css("overflow"), s = n.css("overflowX"), l = n.css("overflowY");
     "visible" != a && (r.overflow = a, i.overflow = "visible"), s && !s.match(/(visible|auto)/) && (r.overflowX = s, 
     i.overflowX = "visible"), l && !l.match(/(visible|auto)/) && (r.overflowY = s, i.overflowY = "visible"), 
     o.cssSaved = r, n.css(i), $.each(_c.allPanes, function(e, n) {
      n != t && resetOverflow(n);
     });
    }
   }
  }
  function resetOverflow(e) {
   if (isInitialized()) {
    this && this.tagName && (e = this);
    var n;
    if (isStr(e) ? n = $Ps[e] : $(e).data("layoutRole") ? n = $(e) : $(e).parents().each(function() {
     return $(this).data("layoutRole") ? (n = $(this), !1) : void 0;
    }), n && n.length) {
     var t = n.data("layoutEdge"), o = state[t], i = o.cssSaved || {};
     o.isSliding || o.isResizing || n.css("zIndex", options.zIndexes.pane_normal), n.css(i), 
     o.cssSaved = !1;
    }
   }
  }
  var browser = $.layout.browser, _c = $.layout.config, cssW = $.layout.cssWidth, cssH = $.layout.cssHeight, elDims = $.layout.getElementDimensions, styles = $.layout.getElementStyles, evtObj = $.layout.getEventObject, evtPane = $.layout.parsePaneName, options = $.extend(!0, {}, $.layout.defaults), effects = options.effects = $.extend(!0, {}, $.layout.effects), state = {
   id: "layout" + $.now(),
   initialized: !1,
   paneResizing: !1,
   panesSliding: {},
   container: {
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
    layoutWidth: 0,
    layoutHeight: 0
   },
   north: {
    childIdx: 0
   },
   south: {
    childIdx: 0
   },
   east: {
    childIdx: 0
   },
   west: {
    childIdx: 0
   },
   center: {
    childIdx: 0
   }
  }, children = {
   north: null,
   south: null,
   east: null,
   west: null,
   center: null
  }, timer = {
   data: {},
   set: function(e, n, t) {
    timer.clear(e), timer.data[e] = setTimeout(n, t);
   },
   clear: function(e) {
    var n = timer.data;
    n[e] && (clearTimeout(n[e]), delete n[e]);
   }
  }, _log = function(e, n, t) {
   var o = options;
   return (o.showErrorMessages && !t || t && o.showDebugMessages) && $.layout.msg(o.name + " / " + e, n !== !1), 
   !1;
  }, _runCallbacks = function(evtName, pane, skipBoundEvents) {
   function g(e) {
    return e;
   }
   var hasPane = pane && isStr(pane), s = hasPane ? state[pane] : state, o = hasPane ? options[pane] : options, lName = options.name, lng = evtName + (evtName.match(/_/) ? "" : "_end"), shrt = lng.match(/_end$/) ? lng.substr(0, lng.length - 4) : "", fn = o[lng] || o[shrt], retVal = "NC", args = [], $P;
   if (hasPane || "boolean" !== $.type(pane) || (skipBoundEvents = pane, pane = ""), 
   fn) try {
    isStr(fn) && (fn.match(/,/) ? (args = fn.split(","), fn = eval(args[0])) : fn = eval(fn)), 
    $.isFunction(fn) && (retVal = args.length ? g(fn)(args[1]) : hasPane ? g(fn)(pane, $Ps[pane], s, o, lName) : g(fn)(Instance, s, o, lName));
   } catch (ex) {
    _log(options.errors.callbackError.replace(/EVENT/, $.trim((pane || "") + " " + lng)), !1), 
    "string" === $.type(ex) && string.length && _log("Exception:  " + ex, !1);
   }
   return skipBoundEvents || retVal === !1 || (hasPane ? ($P = $Ps[pane], o = options[pane], 
   s = state[pane], $P.triggerHandler("layoutpane" + lng, [ pane, $P, s, o, lName ]), 
   shrt && $P.triggerHandler("layoutpane" + shrt, [ pane, $P, s, o, lName ])) : ($N.triggerHandler("layout" + lng, [ Instance, s, o, lName ]), 
   shrt && $N.triggerHandler("layout" + shrt, [ Instance, s, o, lName ]))), hasPane && "onresize_end" === evtName && resizeChildren(pane + "", !0), 
   retVal;
  }, _fixIframe = function(e) {
   if (!browser.mozilla) {
    var n = $Ps[e];
    "IFRAME" === state[e].tagName ? n.css(_c.hidden).css(_c.visible) : n.find("IFRAME").css(_c.hidden).css(_c.visible);
   }
  }, cssSize = function(e, n) {
   var t = "horz" == _c[e].dir ? cssH : cssW;
   return t($Ps[e], n);
  }, cssMinDims = function(e) {
   var n = $Ps[e], t = _c[e].dir, o = {
    minWidth: 1001 - cssW(n, 1e3),
    minHeight: 1001 - cssH(n, 1e3)
   };
   return "horz" === t && (o.minSize = o.minHeight), "vert" === t && (o.minSize = o.minWidth), 
   o;
  }, setOuterWidth = function(e, n, t) {
   var o, i = e;
   isStr(e) ? i = $Ps[e] : e.jquery || (i = $(e)), o = cssW(i, n), i.css({
    width: o
   }), o > 0 ? t && i.data("autoHidden") && i.innerHeight() > 0 && (i.show().data("autoHidden", !1), 
   browser.mozilla || i.css(_c.hidden).css(_c.visible)) : t && !i.data("autoHidden") && i.hide().data("autoHidden", !0);
  }, setOuterHeight = function(e, n, t) {
   var o, i = e;
   isStr(e) ? i = $Ps[e] : e.jquery || (i = $(e)), o = cssH(i, n), i.css({
    height: o,
    visibility: "visible"
   }), o > 0 && i.innerWidth() > 0 ? t && i.data("autoHidden") && (i.show().data("autoHidden", !1), 
   browser.mozilla || i.css(_c.hidden).css(_c.visible)) : t && !i.data("autoHidden") && i.hide().data("autoHidden", !0);
  }, _parseSize = function(e, n, t) {
   if (t || (t = _c[e].dir), isStr(n) && n.match(/%/) && (n = "100%" === n ? -1 : parseInt(n, 10) / 100), 
   0 === n) return 0;
   if (n >= 1) return parseInt(n, 10);
   var o = options, i = 0;
   if ("horz" == t ? i = sC.innerHeight - ($Ps.north ? o.north.spacing_open : 0) - ($Ps.south ? o.south.spacing_open : 0) : "vert" == t && (i = sC.innerWidth - ($Ps.west ? o.west.spacing_open : 0) - ($Ps.east ? o.east.spacing_open : 0)), 
   -1 === n) return i;
   if (n > 0) return round(i * n);
   if ("center" == e) return 0;
   var r = "horz" === t ? "height" : "width", a = $Ps[e], s = "height" === r ? $Cs[e] : !1, l = $.layout.showInvisibly(a), c = a.css(r), d = s ? s.css(r) : 0;
   return a.css(r, "auto"), s && s.css(r, "auto"), n = "height" === r ? a.outerHeight() : a.outerWidth(), 
   a.css(r, c).css(l), s && s.css(r, d), n;
  }, getPaneSize = function(e, n) {
   var t = $Ps[e], o = options[e], i = state[e], r = n ? o.spacing_open : 0, a = n ? o.spacing_closed : 0;
   return !t || i.isHidden ? 0 : i.isClosed || i.isSliding && n ? a : "horz" === _c[e].dir ? t.outerHeight() + r : t.outerWidth() + r;
  }, setSizeLimits = function(e, n) {
   if (isInitialized()) {
    var t = options[e], o = state[e], i = _c[e], r = i.dir, a = (i.sizeType.toLowerCase(), 
    void 0 != n ? n : o.isSliding), s = ($Ps[e], t.spacing_open), l = _c.oppositeEdge[e], c = state[l], d = $Ps[l], u = !d || c.isVisible === !1 || c.isSliding ? 0 : "horz" == r ? d.outerHeight() : d.outerWidth(), p = (!d || c.isHidden ? 0 : options[l][c.isClosed !== !1 ? "spacing_closed" : "spacing_open"]) || 0, f = "horz" == r ? sC.innerHeight : sC.innerWidth, h = cssMinDims("center"), g = "horz" == r ? max(options.center.minHeight, h.minHeight) : max(options.center.minWidth, h.minWidth), m = f - s - (a ? 0 : _parseSize("center", g, r) + u + p), b = o.minSize = max(_parseSize(e, t.minSize), cssMinDims(e).minSize), v = o.maxSize = min(t.maxSize ? _parseSize(e, t.maxSize) : 1e5, m), y = o.resizerPosition = {}, x = sC.inset.top, w = sC.inset.left, k = sC.innerWidth, C = sC.innerHeight, S = t.spacing_open;
    switch (e) {
    case "north":
     y.min = x + b, y.max = x + v;
     break;

    case "west":
     y.min = w + b, y.max = w + v;
     break;

    case "south":
     y.min = x + C - v - S, y.max = x + C - b - S;
     break;

    case "east":
     y.min = w + k - v - S, y.max = w + k - b - S;
    }
   }
  }, calcNewCenterPaneDims = function() {
   var e = {
    top: getPaneSize("north", !0),
    bottom: getPaneSize("south", !0),
    left: getPaneSize("west", !0),
    right: getPaneSize("east", !0),
    width: 0,
    height: 0
   };
   return e.width = sC.innerWidth - e.left - e.right, e.height = sC.innerHeight - e.bottom - e.top, 
   e.top += sC.inset.top, e.bottom += sC.inset.bottom, e.left += sC.inset.left, e.right += sC.inset.right, 
   e;
  }, getHoverClasses = function(e, n) {
   var t = $(e), o = t.data("layoutRole"), i = t.data("layoutEdge"), r = options[i], a = r[o + "Class"], s = "-" + i, l = "-open", c = "-closed", d = "-sliding", u = "-hover ", p = t.hasClass(a + c) ? c : l, f = p === c ? l : c, h = a + u + (a + s + u) + (a + p + u) + (a + s + p + u);
   return n && (h += a + f + u + (a + s + f + u)), "resizer" == o && t.hasClass(a + d) && (h += a + d + u + (a + s + d + u)), 
   $.trim(h);
  }, addHover = function(e, n) {
   var t = $(n || this);
   e && "toggler" === t.data("layoutRole") && e.stopPropagation(), t.addClass(getHoverClasses(t));
  }, removeHover = function(e, n) {
   var t = $(n || this);
   t.removeClass(getHoverClasses(t, !0));
  }, onResizerEnter = function() {
   var e = $(this).data("layoutEdge"), n = state[e];
   n.isClosed || n.isResizing || state.paneResizing || ($.fn.disableSelection && $("body").disableSelection(), 
   options.maskPanesEarly && showMasks(e, {
    resizing: !0
   }));
  }, onResizerLeave = function(e, n) {
   var t = n || this, o = $(t).data("layoutEdge"), i = o + "ResizerLeave";
   timer.clear(o + "_openSlider"), timer.clear(i), n ? state.paneResizing || ($.fn.enableSelection && $("body").enableSelection(), 
   options.maskPanesEarly && hideMasks()) : timer.set(i, function() {
    onResizerLeave(e, t);
   }, 200);
  }, _create = function() {
   initOptions();
   var e = options, n = state;
   return n.creatingLayout = !0, runPluginCallbacks(Instance, $.layout.onCreate), !1 === _runCallbacks("onload_start") ? "cancel" : (_initContainer(), 
   initHotkeys(), $(window).bind("unload." + sID, unload), runPluginCallbacks(Instance, $.layout.onLoad), 
   e.initPanes && _initLayoutElements(), delete n.creatingLayout, state.initialized);
  }, isInitialized = function() {
   return state.initialized || state.creatingLayout ? !0 : _initLayoutElements();
  }, _initLayoutElements = function(e) {
   var n = options;
   if (!$N.is(":visible")) return !e && browser.webkit && "BODY" === $N[0].tagName && setTimeout(function() {
    _initLayoutElements(!0);
   }, 50), !1;
   if (!getPane("center").length) return _log(n.errors.centerPaneMissing);
   if (state.creatingLayout = !0, $.extend(sC, elDims($N, n.inset)), initPanes(), n.scrollToBookmarkOnLoad) {
    var t = self.location;
    t.hash && t.replace(t.hash);
   }
   return Instance.hasParentLayout ? n.resizeWithWindow = !1 : n.resizeWithWindow && $(window).bind("resize." + sID, windowResize), 
   delete state.creatingLayout, state.initialized = !0, runPluginCallbacks(Instance, $.layout.onReady), 
   _runCallbacks("onload_end"), !0;
  }, createChildren = function(e, n) {
   var t = evtPane.call(this, e), o = $Ps[t];
   if (o) {
    var i = $Cs[t], r = state[t], a = options[t], s = options.stateManagement || {}, l = n ? a.children = n : a.children;
    if ($.isPlainObject(l)) l = [ l ]; else if (!l || !$.isArray(l)) return;
    $.each(l, function(e, n) {
     if ($.isPlainObject(n)) {
      var a = n.containerSelector ? o.find(n.containerSelector) : i || o;
      a.each(function() {
       var e = $(this), o = e.data("layout");
       if (!o) {
        if (setInstanceKey({
         container: e,
         options: n
        }, r), s.includeChildren && state.stateData[t]) {
         var i = state.stateData[t].children || {}, a = i[n.instanceKey], l = n.stateManagement || (n.stateManagement = {
          autoLoad: !0
         });
         l.autoLoad === !0 && a && (l.autoSave = !1, l.includeChildren = !0, l.autoLoad = $.extend(!0, {}, a));
        }
        o = e.layout(n), o && refreshChildren(t, o);
       }
      });
     }
    });
   }
  }, setInstanceKey = function(e, n) {
   var t = e.container, o = e.options, i = o.stateManagement, r = o.instanceKey || t.data("layoutInstanceKey");
   return r || (r = (i && i.cookie ? i.cookie.name : "") || o.name), r = r ? r.replace(/[^\w-]/gi, "_").replace(/_{2,}/g, "_") : "layout" + ++n.childIdx, 
   o.instanceKey = r, t.data("layoutInstanceKey", r), r;
  }, refreshChildren = function(e, n) {
   var t, o = $Ps[e], i = children[e], r = state[e];
   $.isPlainObject(i) && ($.each(i, function(e, n) {
    n.destroyed && delete i[e];
   }), $.isEmptyObject(i) && (i = children[e] = null)), n || i || (n = o.data("layout")), 
   n && (n.hasParentLayout = !0, t = n.options, setInstanceKey(n, r), i || (i = children[e] = {}), 
   i[t.instanceKey] = n.container.data("layout")), Instance[e].children = children[e], 
   n || createChildren(e);
  }, windowResize = function() {
   var e = options, n = Number(e.resizeWithWindowDelay);
   10 > n && (n = 100), timer.clear("winResize"), timer.set("winResize", function() {
    timer.clear("winResize"), timer.clear("winResizeRepeater");
    var n = elDims($N, e.inset);
    (n.innerWidth !== sC.innerWidth || n.innerHeight !== sC.innerHeight) && resizeAll();
   }, n), timer.data.winResizeRepeater || setWindowResizeRepeater();
  }, setWindowResizeRepeater = function() {
   var e = Number(options.resizeWithWindowMaxDelay);
   e > 0 && timer.set("winResizeRepeater", function() {
    setWindowResizeRepeater(), resizeAll();
   }, e);
  }, unload = function() {
   _runCallbacks("onunload_start"), runPluginCallbacks(Instance, $.layout.onUnload), 
   _runCallbacks("onunload_end");
  }, _initContainer = function() {
   var e, n, t = $N[0], o = $("html"), i = sC.tagName = t.tagName, r = sC.id = t.id, a = sC.className = t.className, s = options, l = s.name, c = "position,margin,padding,border", d = "layoutCSS", u = {}, p = "hidden", f = $N.data("parentLayout"), h = $N.data("layoutEdge"), g = f && h, m = $.layout.cssNum;
   sC.selector = $N.selector.split(".slice")[0], sC.ref = (s.name ? s.name + " layout / " : "") + i + (r ? "#" + r : a ? ".[" + a + "]" : ""), 
   sC.isBody = "BODY" === i, g || sC.isBody || (e = $N.closest("." + $.layout.defaults.panes.paneClass), 
   f = e.data("parentLayout"), h = e.data("layoutEdge"), g = f && h), $N.data({
    layout: Instance,
    layoutContainer: sID
   }).addClass(s.containerClass);
   var b = {
    destroy: "",
    initPanes: "",
    resizeAll: "resizeAll",
    resize: "resizeAll"
   };
   for (l in b) $N.bind("layout" + l.toLowerCase() + "." + sID, Instance[b[l] || l]);
   g && (Instance.hasParentLayout = !0, f.refreshChildren(h, Instance)), $N.data(d) || (sC.isBody ? ($N.data(d, $.extend(styles($N, c), {
    height: $N.css("height"),
    overflow: $N.css("overflow"),
    overflowX: $N.css("overflowX"),
    overflowY: $N.css("overflowY")
   })), o.data(d, $.extend(styles(o, "padding"), {
    height: "auto",
    overflow: o.css("overflow"),
    overflowX: o.css("overflowX"),
    overflowY: o.css("overflowY")
   }))) : $N.data(d, styles($N, c + ",top,bottom,left,right,width,height,overflow,overflowX,overflowY")));
   try {
    if (u = {
     overflow: p,
     overflowX: p,
     overflowY: p
    }, $N.css(u), s.inset && !$.isPlainObject(s.inset) && (n = parseInt(s.inset, 10) || 0, 
    s.inset = {
     top: n,
     bottom: n,
     left: n,
     right: n
    }), sC.isBody) s.outset ? $.isPlainObject(s.outset) || (n = parseInt(s.outset, 10) || 0, 
    s.outset = {
     top: n,
     bottom: n,
     left: n,
     right: n
    }) : s.outset = {
     top: m(o, "paddingTop"),
     bottom: m(o, "paddingBottom"),
     left: m(o, "paddingLeft"),
     right: m(o, "paddingRight")
    }, o.css(u).css({
     height: "100%",
     border: "none",
     padding: 0,
     margin: 0
    }), browser.isIE6 ? ($N.css({
     width: "100%",
     height: "100%",
     border: "none",
     padding: 0,
     margin: 0,
     position: "relative"
    }), s.inset || (s.inset = elDims($N).inset)) : ($N.css({
     width: "auto",
     height: "auto",
     margin: 0,
     position: "absolute"
    }), $N.css(s.outset)), $.extend(sC, elDims($N, s.inset)); else {
     var v = $N.css("position");
     v && v.match(/(fixed|absolute|relative)/) || $N.css("position", "relative"), $N.is(":visible") && ($.extend(sC, elDims($N, s.inset)), 
     sC.innerHeight < 1 && _log(s.errors.noContainerHeight.replace(/CONTAINER/, sC.ref)));
    }
    m($N, "minWidth") && $N.parent().css("overflowX", "auto"), m($N, "minHeight") && $N.parent().css("overflowY", "auto");
   } catch (y) {}
  }, initHotkeys = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, n) {
    var t = options[n];
    return t.enableCursorHotkey || t.customHotkey ? ($(document).bind("keydown." + sID, keyDown), 
    !1) : void 0;
   });
  }, initOptions = function() {
   function e(e) {
    var n = options[e], t = options.panes;
    n.fxSettings || (n.fxSettings = {}), t.fxSettings || (t.fxSettings = {}), $.each([ "_open", "_close", "_size" ], function(o, i) {
     var r = "fxName" + i, a = "fxSpeed" + i, s = "fxSettings" + i, l = n[r] = n[r] || t[r] || n.fxName || t.fxName || "none", c = $.effects && ($.effects[l] || $.effects.effect && $.effects.effect[l]);
     "none" !== l && options.effects[l] && c || (l = n[r] = "none");
     var d = options.effects[l] || {}, u = d.all || null, p = d[e] || null;
     n[a] = n[a] || t[a] || n.fxSpeed || t.fxSpeed || null, n[s] = $.extend(!0, {}, u, p, t.fxSettings, n.fxSettings, t[s], n[s]);
    }), delete n.fxName, delete n.fxSpeed, delete n.fxSettings;
   }
   var n, t, o, i, r, a, s;
   if (opts = $.layout.transformData(opts, !0), opts = $.layout.backwardCompatibility.renameAllOptions(opts), 
   !$.isEmptyObject(opts.panes)) {
    for (n = $.layout.optionsMap.noDefault, r = 0, a = n.length; a > r; r++) o = n[r], 
    delete opts.panes[o];
    for (n = $.layout.optionsMap.layout, r = 0, a = n.length; a > r; r++) o = n[r], 
    delete opts.panes[o];
   }
   n = $.layout.optionsMap.layout;
   var l = $.layout.config.optionRootKeys;
   for (o in opts) i = opts[o], $.inArray(o, l) < 0 && $.inArray(o, n) < 0 && (opts.panes[o] || (opts.panes[o] = $.isPlainObject(i) ? $.extend(!0, {}, i) : i), 
   delete opts[o]);
   $.extend(!0, options, opts), $.each(_c.allPanes, function(i, r) {
    if (_c[r] = $.extend(!0, {}, _c.panes, _c[r]), t = options.panes, s = options[r], 
    "center" === r) for (n = $.layout.optionsMap.center, i = 0, a = n.length; a > i; i++) o = n[i], 
    opts.center[o] || !opts.panes[o] && s[o] || (s[o] = t[o]); else s = options[r] = $.extend(!0, {}, t, s), 
    e(r), s.resizerClass || (s.resizerClass = "ui-layout-resizer"), s.togglerClass || (s.togglerClass = "ui-layout-toggler");
    s.paneClass || (s.paneClass = "ui-layout-pane");
   });
   var c = opts.zIndex, d = options.zIndexes;
   c > 0 && (d.pane_normal = c, d.content_mask = max(c + 1, d.content_mask), d.resizer_normal = max(c + 2, d.resizer_normal)), 
   delete options.panes;
  }, getPane = function(e) {
   var n = options[e].paneSelector;
   if ("#" === n.substr(0, 1)) return $N.find(n).eq(0);
   var t = $N.children(n).eq(0);
   return t.length ? t : $N.children("form:first").children(n).eq(0);
  }, initPanes = function(e) {
   evtPane(e), $.each(_c.allPanes, function(e, n) {
    addPane(n, !0);
   }), initHandles(), $.each(_c.borderPanes, function(e, n) {
    $Ps[n] && state[n].isVisible && (setSizeLimits(n), makePaneFit(n));
   }), sizeMidPanes("center"), $.each(_c.allPanes, function(e, n) {
    afterInitPane(n);
   });
  }, addPane = function(e, n) {
   if (n || isInitialized()) {
    var t, o, i, r = options[e], a = state[e], s = _c[e], l = s.dir, c = (a.fx, r.spacing_open || 0, 
    "center" === e), d = {}, u = $Ps[e];
    if (u ? removePane(e, !1, !0, !1) : $Cs[e] = !1, u = $Ps[e] = getPane(e), !u.length) return $Ps[e] = !1, 
    void 0;
    if (!u.data("layoutCSS")) {
     var p = "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border";
     u.data("layoutCSS", styles(u, p));
    }
    Instance[e] = {
     name: e,
     pane: $Ps[e],
     content: $Cs[e],
     options: options[e],
     state: state[e],
     children: children[e]
    }, u.data({
     parentLayout: Instance,
     layoutPane: Instance[e],
     layoutEdge: e,
     layoutRole: "pane"
    }).css(s.cssReq).css("zIndex", options.zIndexes.pane_normal).css(r.applyDemoStyles ? s.cssDemo : {}).addClass(r.paneClass + " " + r.paneClass + "-" + e).bind("mouseenter." + sID, addHover).bind("mouseleave." + sID, removeHover);
    var f, h = {
     hide: "",
     show: "",
     toggle: "",
     close: "",
     open: "",
     slideOpen: "",
     slideClose: "",
     slideToggle: "",
     size: "sizePane",
     sizePane: "sizePane",
     sizeContent: "",
     sizeHandles: "",
     enableClosable: "",
     disableClosable: "",
     enableSlideable: "",
     disableSlideable: "",
     enableResizable: "",
     disableResizable: "",
     swapPanes: "swapPanes",
     swap: "swapPanes",
     move: "swapPanes",
     removePane: "removePane",
     remove: "removePane",
     createChildren: "",
     resizeChildren: "",
     resizeAll: "resizeAll",
     resizeLayout: "resizeAll"
    };
    for (f in h) u.bind("layoutpane" + f.toLowerCase() + "." + sID, Instance[h[f] || f]);
    initContent(e, !1), c || (t = a.size = _parseSize(e, r.size), o = _parseSize(e, r.minSize) || 1, 
    i = _parseSize(e, r.maxSize) || 1e5, t > 0 && (t = max(min(t, i), o)), a.autoResize = r.autoResize, 
    a.isClosed = !1, a.isSliding = !1, a.isResizing = !1, a.isHidden = !1, a.pins || (a.pins = [])), 
    a.tagName = u[0].tagName, a.edge = e, a.noRoom = !1, a.isVisible = !0, setPanePosition(e), 
    "horz" === l ? d.height = cssH(u, t) : "vert" === l && (d.width = cssW(u, t)), u.css(d), 
    "horz" != l && sizeMidPanes(e, !0), state.initialized && (initHandles(e), initHotkeys(e)), 
    r.initClosed && r.closable && !r.initHidden ? close(e, !0, !0) : r.initHidden || r.initClosed ? hide(e) : a.noRoom || u.css("display", "block"), 
    u.css("visibility", "visible"), r.showOverflowOnHover && u.hover(allowOverflow, resetOverflow), 
    state.initialized && afterInitPane(e);
   }
  }, afterInitPane = function(e) {
   var n = $Ps[e], t = state[e], o = options[e];
   n && (n.data("layout") && refreshChildren(e, n.data("layout")), t.isVisible && (state.initialized ? resizeAll() : sizeContent(e), 
   o.triggerEventsOnLoad ? _runCallbacks("onresize_end", e) : resizeChildren(e, !0)), 
   o.initChildren && o.children && createChildren(e));
  }, setPanePosition = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, n) {
    var t = $Ps[n], o = $Rs[n], i = (options[n], state[n]), r = _c[n].side, a = {};
    if (t) {
     switch (n) {
     case "north":
      a.top = sC.inset.top, a.left = sC.inset.left, a.right = sC.inset.right;
      break;

     case "south":
      a.bottom = sC.inset.bottom, a.left = sC.inset.left, a.right = sC.inset.right;
      break;

     case "west":
      a.left = sC.inset.left;
      break;

     case "east":
      a.right = sC.inset.right;
      break;

     case "center":     }
     t.css(a), o && i.isClosed ? o.css(r, sC.inset[r]) : o && !i.isHidden && o.css(r, sC.inset[r] + getPaneSize(n));
    }
   });
  }, initHandles = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, n) {
    var t = $Ps[n];
    if ($Rs[n] = !1, $Ts[n] = !1, t) {
     var o = options[n], i = state[n], r = (_c[n], "#" === o.paneSelector.substr(0, 1) ? o.paneSelector.substr(1) : ""), a = o.resizerClass, s = o.togglerClass, l = (i.isVisible ? o.spacing_open : o.spacing_closed, 
     "-" + n), c = (i.isVisible ? "-open" : "-closed", Instance[n]), d = c.resizer = $Rs[n] = $("<div></div>"), u = c.toggler = o.closable ? $Ts[n] = $("<div></div>") : !1;
     !i.isVisible && o.slidable && d.attr("title", o.tips.Slide).css("cursor", o.sliderCursor), 
     d.attr("id", r ? r + "-resizer" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[n],
      layoutEdge: n,
      layoutRole: "resizer"
     }).css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal).css(o.applyDemoStyles ? _c.resizers.cssDemo : {}).addClass(a + " " + a + l).hover(addHover, removeHover).hover(onResizerEnter, onResizerLeave).appendTo($N), 
     o.resizerDblClickToggle && d.bind("dblclick." + sID, toggle), u && (u.attr("id", r ? r + "-toggler" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[n],
      layoutEdge: n,
      layoutRole: "toggler"
     }).css(_c.togglers.cssReq).css(o.applyDemoStyles ? _c.togglers.cssDemo : {}).addClass(s + " " + s + l).hover(addHover, removeHover).bind("mouseenter", onResizerEnter).appendTo(d), 
     o.togglerContent_open && $("<span>" + o.togglerContent_open + "</span>").data({
      layoutEdge: n,
      layoutRole: "togglerContent"
     }).data("layoutRole", "togglerContent").data("layoutEdge", n).addClass("content content-open").css("display", "none").appendTo(u), 
     o.togglerContent_closed && $("<span>" + o.togglerContent_closed + "</span>").data({
      layoutEdge: n,
      layoutRole: "togglerContent"
     }).addClass("content content-closed").css("display", "none").appendTo(u), enableClosable(n)), 
     initResizable(n), i.isVisible ? setAsOpen(n) : (setAsClosed(n), bindStartSlidingEvents(n, !0));
    }
   }), sizeHandles();
  }, initContent = function(e, n) {
   if (isInitialized()) {
    var t, o = options[e], i = o.contentSelector, r = Instance[e], a = $Ps[e];
    i && (t = r.content = $Cs[e] = o.findNestedContent ? a.find(i).eq(0) : a.children(i).eq(0)), 
    t && t.length ? (t.data("layoutRole", "content"), t.data("layoutCSS") || t.data("layoutCSS", styles(t, "height")), 
    t.css(_c.content.cssReq), o.applyDemoStyles && (t.css(_c.content.cssDemo), a.css(_c.content.cssDemoPane)), 
    a.css("overflowX").match(/(scroll|auto)/) && a.css("overflow", "hidden"), state[e].content = {}, 
    n !== !1 && sizeContent(e)) : r.content = $Cs[e] = !1;
   }
  }, initResizable = function(e) {
   var n = $.layout.plugins.draggable;
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, o) {
    var i = options[o];
    if (!n || !$Ps[o] || !i.resizable) return i.resizable = !1, !0;
    var r, a, s = state[o], l = options.zIndexes, c = _c[o], d = "horz" == c.dir ? "top" : "left", u = ($Ps[o], 
    $Rs[o]), p = i.resizerClass, f = 0, h = p + "-drag", g = p + "-" + o + "-drag", m = p + "-dragging", b = p + "-" + o + "-dragging", v = p + "-dragging-limit", y = p + "-" + o + "-dragging-limit", x = !1;
    s.isClosed || u.attr("title", i.tips.Resize).css("cursor", i.resizerCursor), u.draggable({
     containment: $N[0],
     axis: "horz" == c.dir ? "y" : "x",
     delay: 0,
     distance: 1,
     grid: i.resizingGrid,
     helper: "clone",
     opacity: i.resizerDragOpacity,
     addClasses: !1,
     zIndex: l.resizer_drag,
     start: function(e, n) {
      return i = options[o], s = state[o], a = i.livePaneResizing, !1 === _runCallbacks("ondrag_start", o) ? !1 : (s.isResizing = !0, 
      state.paneResizing = o, timer.clear(o + "_closeSlider"), setSizeLimits(o), r = s.resizerPosition, 
      f = n.position[d], u.addClass(h + " " + g), x = !1, $("body").disableSelection(), 
      showMasks(o, {
       resizing: !0
      }), void 0);
     },
     drag: function(e, n) {
      x || (n.helper.addClass(m + " " + b).css({
       right: "auto",
       bottom: "auto"
      }).children().css("visibility", "hidden"), x = !0, s.isSliding && $Ps[o].css("zIndex", l.pane_sliding));
      var c = 0;
      n.position[d] < r.min ? (n.position[d] = r.min, c = -1) : n.position[d] > r.max && (n.position[d] = r.max, 
      c = 1), c ? (n.helper.addClass(v + " " + y), window.defaultStatus = c > 0 && o.match(/(north|west)/) || 0 > c && o.match(/(south|east)/) ? i.tips.maxSizeWarning : i.tips.minSizeWarning) : (n.helper.removeClass(v + " " + y), 
      window.defaultStatus = ""), a && Math.abs(n.position[d] - f) >= i.liveResizingTolerance && (f = n.position[d], 
      t(e, n, o));
     },
     stop: function(e, n) {
      $("body").enableSelection(), window.defaultStatus = "", u.removeClass(h + " " + g), 
      s.isResizing = !1, state.paneResizing = !1, t(e, n, o, !0);
     }
    });
   });
   var t = function(e, n, t, o) {
    var i, r = n.position, a = _c[t], s = options[t], l = state[t];
    switch (t) {
    case "north":
     i = r.top;
     break;

    case "west":
     i = r.left;
     break;

    case "south":
     i = sC.layoutHeight - r.top - s.spacing_open;
     break;

    case "east":
     i = sC.layoutWidth - r.left - s.spacing_open;
    }
    var c = i - sC.inset[a.side];
    if (o) !1 !== _runCallbacks("ondrag_end", t) && manualSizePane(t, c, !1, !0), hideMasks(!0), 
    l.isSliding && showMasks(t, {
     resizing: !0
    }); else {
     if (Math.abs(c - l.size) < s.liveResizingTolerance) return;
     manualSizePane(t, c, !1, !0), sizeMasks();
    }
   };
  }, sizeMask = function() {
   var e = $(this), n = e.data("layoutMask"), t = state[n];
   "IFRAME" == t.tagName && t.isVisible && e.css({
    top: t.offsetTop,
    left: t.offsetLeft,
    width: t.outerWidth,
    height: t.outerHeight
   });
  }, sizeMasks = function() {
   $Ms.each(sizeMask);
  }, showMasks = function(e, n) {
   var t, o, i = _c[e], r = [ "center" ], a = options.zIndexes, s = $.extend({
    objectsOnly: !1,
    animation: !1,
    resizing: !0,
    sliding: state[e].isSliding
   }, n);
   s.resizing && r.push(e), s.sliding && r.push(_c.oppositeEdge[e]), "horz" === i.dir && (r.push("west"), 
   r.push("east")), $.each(r, function(e, n) {
    o = state[n], t = options[n], o.isVisible && (t.maskObjects || !s.objectsOnly && t.maskContents) && getMasks(n).each(function() {
     sizeMask.call(this), this.style.zIndex = o.isSliding ? a.pane_sliding + 1 : a.pane_normal + 1, 
     this.style.display = "block";
    });
   });
  }, hideMasks = function(e) {
   if (e || !state.paneResizing) $Ms.hide(); else if (!e && !$.isEmptyObject(state.panesSliding)) for (var n, t, o = $Ms.length - 1; o >= 0; o--) t = $Ms.eq(o), 
   n = t.data("layoutMask"), options[n].maskObjects || t.hide();
  }, getMasks = function(e) {
   for (var n, t = $([]), o = 0, i = $Ms.length; i > o; o++) n = $Ms.eq(o), n.data("layoutMask") === e && (t = t.add(n));
   return t.length ? t : createMasks(e);
  }, createMasks = function(e) {
   var n, t, o, i, r, a = $Ps[e], s = state[e], l = options[e], c = options.zIndexes, d = $([]);
   if (!l.maskContents && !l.maskObjects) return d;
   for (r = 0; r < (l.maskObjects ? 2 : 1); r++) n = l.maskObjects && 0 == r, t = document.createElement(n ? "iframe" : "div"), 
   o = $(t).data("layoutMask", e), t.className = "ui-layout-mask ui-layout-mask-" + e, 
   i = t.style, i.display = "block", i.position = "absolute", i.background = "#FFF", 
   n && (t.frameborder = 0, t.src = "about:blank", i.opacity = 0, i.filter = "Alpha(Opacity='0')", 
   i.border = 0), "IFRAME" == s.tagName ? (i.zIndex = c.pane_normal + 1, $N.append(t)) : (o.addClass("ui-layout-mask-inside-pane"), 
   i.zIndex = l.maskZindex || c.content_mask, i.top = 0, i.left = 0, i.width = "100%", 
   i.height = "100%", a.append(t)), d = d.add(t), $Ms = $Ms.add(t);
   return d;
  }, destroy = function(e, n) {
   $(window).unbind("." + sID), $(document).unbind("." + sID), "object" == typeof e ? evtPane(e) : n = e, 
   $N.clearQueue().removeData("layout").removeData("layoutContainer").removeClass(options.containerClass).unbind("." + sID), 
   $Ms.remove(), $.each(_c.allPanes, function(e, t) {
    removePane(t, !1, !0, n);
   });
   var t = "layoutCSS";
   $N.data(t) && !$N.data("layoutRole") && $N.css($N.data(t)).removeData(t), "BODY" === sC.tagName && ($N = $("html")).data(t) && $N.css($N.data(t)).removeData(t), 
   runPluginCallbacks(Instance, $.layout.onDestroy), unload();
   for (var o in Instance) o.match(/^(container|options)$/) || delete Instance[o];
   return Instance.destroyed = !0, Instance;
  }, removePane = function(e, n, t, o) {
   if (isInitialized()) {
    var i = evtPane.call(this, e), r = $Ps[i], a = $Cs[i], s = $Rs[i], l = $Ts[i];
    r && $.isEmptyObject(r.data()) && (r = !1), a && $.isEmptyObject(a.data()) && (a = !1), 
    s && $.isEmptyObject(s.data()) && (s = !1), l && $.isEmptyObject(l.data()) && (l = !1), 
    r && r.stop(!0, !0);
    var c = options[i], d = state[i], u = "layout", p = "layoutCSS", f = children[i], h = $.isPlainObject(f) && !$.isEmptyObject(f), g = void 0 !== o ? o : c.destroyChildren;
    if (h && g && ($.each(f, function(e, n) {
     n.destroyed || n.destroy(!0), n.destroyed && delete f[e];
    }), $.isEmptyObject(f) && (f = children[i] = null, h = !1)), r && n && !h) r.remove(); else if (r && r[0]) {
     var m = c.paneClass, b = m + "-" + i, v = "-open", y = "-sliding", x = "-closed", w = [ m, m + v, m + x, m + y, b, b + v, b + x, b + y ];
     $.merge(w, getHoverClasses(r, !0)), r.removeClass(w.join(" ")).removeData("parentLayout").removeData("layoutPane").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." + sID), 
     h && a ? (a.width(a.width()), $.each(f, function(e, n) {
      n.resizeAll();
     })) : a && a.css(a.data(p)).removeData(p).removeData("layoutRole"), r.data(u) || r.css(r.data(p)).removeData(p);
    }
    l && l.remove(), s && s.remove(), Instance[i] = $Ps[i] = $Cs[i] = $Rs[i] = $Ts[i] = !1, 
    d = {
     removed: !0
    }, t || resizeAll();
   }
  }, _hidePane = function(e) {
   var n = $Ps[e], t = options[e], o = n[0].style;
   t.useOffscreenClose ? (n.data(_c.offscreenReset) || n.data(_c.offscreenReset, {
    left: o.left,
    right: o.right
   }), n.css(_c.offscreenCSS)) : n.hide().removeData(_c.offscreenReset);
  }, _showPane = function(e) {
   var n = $Ps[e], t = options[e], o = _c.offscreenCSS, i = n.data(_c.offscreenReset), r = n[0].style;
   n.show().removeData(_c.offscreenReset), t.useOffscreenClose && i && (r.left == o.left && (r.left = i.left), 
   r.right == o.right && (r.right = i.right));
  }, hide = function(e, n) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), o = options[t], i = state[t], r = $Ps[t], a = $Rs[t];
    r && !i.isHidden && (state.initialized && !1 === _runCallbacks("onhide_start", t) || (i.isSliding = !1, 
    delete state.panesSliding[t], a && a.hide(), !state.initialized || i.isClosed ? (i.isClosed = !0, 
    i.isHidden = !0, i.isVisible = !1, state.initialized || _hidePane(t), sizeMidPanes("horz" === _c[t].dir ? "" : "center"), 
    (state.initialized || o.triggerEventsOnLoad) && _runCallbacks("onhide_end", t)) : (i.isHiding = !0, 
    close(t, !1, n))));
   }
  }, show = function(e, n, t, o) {
   if (isInitialized()) {
    var i = evtPane.call(this, e), r = (options[i], state[i]), a = $Ps[i];
    $Rs[i], a && r.isHidden && !1 !== _runCallbacks("onshow_start", i) && (r.isShowing = !0, 
    r.isSliding = !1, delete state.panesSliding[i], n === !1 ? close(i, !0) : open(i, !1, t, o));
   }
  }, toggle = function(e, n) {
   if (isInitialized()) {
    var t = evtObj(e), o = evtPane.call(this, e), i = state[o];
    t && t.stopImmediatePropagation(), i.isHidden ? show(o) : i.isClosed ? open(o, !!n) : close(o);
   }
  }, _closePane = function(e, n) {
   var t = ($Ps[e], state[e]);
   _hidePane(e), t.isClosed = !0, t.isVisible = !1, n && setAsClosed(e);
  }, close = function(e, n, t, o) {
   function i() {
    p.isMoving = !1, bindStartSlidingEvents(r, !0);
    var e = _c.oppositeEdge[r];
    state[e].noRoom && (setSizeLimits(e), makePaneFit(e)), o || !state.initialized && !u.triggerEventsOnLoad || (s || _runCallbacks("onclose_end", r), 
    s && _runCallbacks("onshow_end", r), l && _runCallbacks("onhide_end", r));
   }
   var r = evtPane.call(this, e);
   if (!state.initialized && $Ps[r]) return _closePane(r, !0), void 0;
   if (isInitialized()) {
    var a, s, l, c, d = $Ps[r], u = ($Rs[r], $Ts[r], options[r]), p = state[r];
    _c[r], $N.queue(function(e) {
     if (!d || !u.closable && !p.isShowing && !p.isHiding || !n && p.isClosed && !p.isShowing) return e();
     var o = !p.isShowing && !1 === _runCallbacks("onclose_start", r);
     return s = p.isShowing, l = p.isHiding, c = p.isSliding, delete p.isShowing, delete p.isHiding, 
     o ? e() : (a = !t && !p.isClosed && "none" != u.fxName_close, p.isMoving = !0, p.isClosed = !0, 
     p.isVisible = !1, l ? p.isHidden = !0 : s && (p.isHidden = !1), p.isSliding ? bindStopSlidingEvents(r, !1) : sizeMidPanes("horz" === _c[r].dir ? "" : "center", !1), 
     setAsClosed(r), a ? (lockPaneForFX(r, !0), d.hide(u.fxName_close, u.fxSettings_close, u.fxSpeed_close, function() {
      lockPaneForFX(r, !1), p.isClosed && i(), e();
     })) : (_hidePane(r), i(), e()), void 0);
    });
   }
  }, setAsClosed = function(e) {
   if ($Rs[e]) {
    var n = ($Ps[e], $Rs[e]), t = $Ts[e], o = options[e], i = (state[e], _c[e].side), r = o.resizerClass, a = o.togglerClass, s = "-" + e, l = "-open", c = "-sliding", d = "-closed";
    n.css(i, sC.inset[i]).removeClass(r + l + " " + r + s + l).removeClass(r + c + " " + r + s + c).addClass(r + d + " " + r + s + d), 
    o.resizable && $.layout.plugins.draggable && n.draggable("disable").removeClass("ui-state-disabled").css("cursor", "default").attr("title", ""), 
    t && (t.removeClass(a + l + " " + a + s + l).addClass(a + d + " " + a + s + d).attr("title", o.tips.Open), 
    t.children(".content-open").hide(), t.children(".content-closed").css("display", "block")), 
    syncPinBtns(e, !1), state.initialized && sizeHandles();
   }
  }, open = function(e, n, t, o) {
   function i() {
    d.isMoving = !1, _fixIframe(s), d.isSliding || sizeMidPanes("vert" == _c[s].dir ? "center" : "", !1), 
    setAsOpen(s);
   }
   if (isInitialized()) {
    var r, a, s = evtPane.call(this, e), l = $Ps[s], c = ($Rs[s], $Ts[s], options[s]), d = state[s];
    _c[s], $N.queue(function(e) {
     if (!l || !c.resizable && !c.closable && !d.isShowing || d.isVisible && !d.isSliding) return e();
     if (d.isHidden && !d.isShowing) return e(), show(s, !0), void 0;
     d.autoResize && d.size != c.size ? sizePane(s, c.size, !0, !0, !0) : setSizeLimits(s, n);
     var u = _runCallbacks("onopen_start", s);
     return "abort" === u ? e() : ("NC" !== u && setSizeLimits(s, n), d.minSize > d.maxSize ? (syncPinBtns(s, !1), 
     !o && c.tips.noRoomToOpen && alert(c.tips.noRoomToOpen), e()) : (n ? bindStopSlidingEvents(s, !0) : d.isSliding ? bindStopSlidingEvents(s, !1) : c.slidable && bindStartSlidingEvents(s, !1), 
     d.noRoom = !1, makePaneFit(s), a = d.isShowing, delete d.isShowing, r = !t && d.isClosed && "none" != c.fxName_open, 
     d.isMoving = !0, d.isVisible = !0, d.isClosed = !1, a && (d.isHidden = !1), r ? (lockPaneForFX(s, !0), 
     l.show(c.fxName_open, c.fxSettings_open, c.fxSpeed_open, function() {
      lockPaneForFX(s, !1), d.isVisible && i(), e();
     })) : (_showPane(s), i(), e()), void 0));
    });
   }
  }, setAsOpen = function(e, n) {
   var t = $Ps[e], o = $Rs[e], i = $Ts[e], r = options[e], a = state[e], s = _c[e].side, l = r.resizerClass, c = r.togglerClass, d = "-" + e, u = "-open", p = "-closed", f = "-sliding";
   o.css(s, sC.inset[s] + getPaneSize(e)).removeClass(l + p + " " + l + d + p).addClass(l + u + " " + l + d + u), 
   a.isSliding ? o.addClass(l + f + " " + l + d + f) : o.removeClass(l + f + " " + l + d + f), 
   removeHover(0, o), r.resizable && $.layout.plugins.draggable ? o.draggable("enable").css("cursor", r.resizerCursor).attr("title", r.tips.Resize) : a.isSliding || o.css("cursor", "default"), 
   i && (i.removeClass(c + p + " " + c + d + p).addClass(c + u + " " + c + d + u).attr("title", r.tips.Close), 
   removeHover(0, i), i.children(".content-closed").hide(), i.children(".content-open").css("display", "block")), 
   syncPinBtns(e, !a.isSliding), $.extend(a, elDims(t)), state.initialized && (sizeHandles(), 
   sizeContent(e, !0)), !n && (state.initialized || r.triggerEventsOnLoad) && t.is(":visible") && (_runCallbacks("onopen_end", e), 
   a.isShowing && _runCallbacks("onshow_end", e), state.initialized && _runCallbacks("onresize_end", e));
  }, slideOpen = function(e) {
   function n() {
    i.isClosed ? i.isMoving || open(o, !0) : bindStopSlidingEvents(o, !0);
   }
   if (isInitialized()) {
    var t = evtObj(e), o = evtPane.call(this, e), i = state[o], r = options[o].slideDelay_open;
    t && t.stopImmediatePropagation(), i.isClosed && t && "mouseenter" === t.type && r > 0 ? timer.set(o + "_openSlider", n, r) : n();
   }
  }, slideClose = function(e) {
   function n() {
    r.isClosed ? bindStopSlidingEvents(o, !1) : r.isMoving || close(o);
   }
   if (isInitialized()) {
    var t = evtObj(e), o = evtPane.call(this, e), i = options[o], r = state[o], a = r.isMoving ? 1e3 : 300;
    if (!r.isClosed && !r.isResizing) if ("click" === i.slideTrigger_close) n(); else {
     if (i.preventQuickSlideClose && r.isMoving) return;
     if (i.preventPrematureSlideClose && t && $.layout.isMouseOverElem(t, $Ps[o])) return;
     t ? timer.set(o + "_closeSlider", n, max(i.slideDelay_close, a)) : n();
    }
   }
  }, slideToggle = function(e) {
   var n = evtPane.call(this, e);
   toggle(n, !0);
  }, lockPaneForFX = function(e, n) {
   var t = $Ps[e], o = state[e], i = options[e], r = options.zIndexes;
   n ? (showMasks(e, {
    animation: !0,
    objectsOnly: !0
   }), t.css({
    zIndex: r.pane_animate
   }), "south" == e ? t.css({
    top: sC.inset.top + sC.innerHeight - t.outerHeight()
   }) : "east" == e && t.css({
    left: sC.inset.left + sC.innerWidth - t.outerWidth()
   })) : (hideMasks(), t.css({
    zIndex: o.isSliding ? r.pane_sliding : r.pane_normal
   }), "south" == e ? t.css({
    top: "auto"
   }) : "east" != e || t.css("left").match(/\-99999/) || t.css({
    left: "auto"
   }), browser.msie && i.fxOpacityFix && "slide" != i.fxName_open && t.css("filter") && 1 == t.css("opacity") && t[0].style.removeAttribute("filter"));
  }, bindStartSlidingEvents = function(e, n) {
   var t = options[e], o = ($Ps[e], $Rs[e]), i = t.slideTrigger_open.toLowerCase();
   !o || n && !t.slidable || (i.match(/mouseover/) ? i = t.slideTrigger_open = "mouseenter" : i.match(/(click|dblclick|mouseenter)/) || (i = t.slideTrigger_open = "click"), 
   t.resizerDblClickToggle && i.match(/click/) && o[n ? "unbind" : "bind"]("dblclick." + sID, toggle), 
   o[n ? "bind" : "unbind"](i + "." + sID, slideOpen).css("cursor", n ? t.sliderCursor : "default").attr("title", n ? t.tips.Slide : ""));
  }, bindStopSlidingEvents = function(e, n) {
   function t(n) {
    timer.clear(e + "_closeSlider"), n.stopPropagation();
   }
   var o = options[e], i = state[e], r = (_c[e], options.zIndexes), a = o.slideTrigger_close.toLowerCase(), s = n ? "bind" : "unbind", l = $Ps[e], c = $Rs[e];
   timer.clear(e + "_closeSlider"), n ? (i.isSliding = !0, state.panesSliding[e] = !0, 
   bindStartSlidingEvents(e, !1)) : (i.isSliding = !1, delete state.panesSliding[e]), 
   l.css("zIndex", n ? r.pane_sliding : r.pane_normal), c.css("zIndex", n ? r.pane_sliding + 2 : r.resizer_normal), 
   a.match(/(click|mouseleave)/) || (a = o.slideTrigger_close = "mouseleave"), c[s](a, slideClose), 
   "mouseleave" === a && (l[s]("mouseleave." + sID, slideClose), c[s]("mouseenter." + sID, t), 
   l[s]("mouseenter." + sID, t)), n ? "click" !== a || o.resizable || (c.css("cursor", n ? o.sliderCursor : "default"), 
   c.attr("title", n ? o.tips.Close : "")) : timer.clear(e + "_closeSlider");
  }, makePaneFit = function(e, n, t, o) {
   var i = options[e], r = state[e], a = _c[e], s = $Ps[e], l = $Rs[e], c = "vert" === a.dir, d = !1;
   if (("center" === e || c && r.noVerticalRoom) && (d = r.maxHeight >= 0, d && r.noRoom ? (_showPane(e), 
   l && l.show(), r.isVisible = !0, r.noRoom = !1, c && (r.noVerticalRoom = !1), _fixIframe(e)) : d || r.noRoom || (_hidePane(e), 
   l && l.hide(), r.isVisible = !1, r.noRoom = !0)), "center" === e) ; else if (r.minSize <= r.maxSize) {
    if (d = !0, r.size > r.maxSize) sizePane(e, r.maxSize, t, !0, o); else if (r.size < r.minSize) sizePane(e, r.minSize, t, !0, o); else if (l && r.isVisible && s.is(":visible")) {
     var u = r.size + sC.inset[a.side];
     $.layout.cssNum(l, a.side) != u && l.css(a.side, u);
    }
    r.noRoom && (r.wasOpen && i.closable ? i.autoReopen ? open(e, !1, !0, !0) : r.noRoom = !1 : show(e, r.wasOpen, !0, !0));
   } else r.noRoom || (r.noRoom = !0, r.wasOpen = !r.isClosed && !r.isSliding, r.isClosed || (i.closable ? close(e, !0, !0) : hide(e, !0)));
  }, manualSizePane = function(e, n, t, o, i) {
   if (isInitialized()) {
    var r = evtPane.call(this, e), a = options[r], s = state[r], l = i || a.livePaneResizing && !s.isResizing;
    s.autoResize = !1, sizePane(r, n, t, o, l);
   }
  }, sizePane = function(e, n, t, o, i) {
   function r() {
    for (var e = "width" === h ? u.outerWidth() : u.outerHeight(), o = [ {
     pane: l,
     count: 1,
     target: n,
     actual: e,
     correct: n === e,
     attempt: n,
     cssSize: s
    } ], r = o[0], c = {}, m = "Inaccurate size after resizing the " + l + "-pane."; !(r.correct || (c = {
     pane: l,
     count: r.count + 1,
     target: n
    }, c.attempt = r.actual > n ? max(0, r.attempt - (r.actual - n)) : max(0, r.attempt + (n - r.actual)), 
    c.cssSize = cssSize(l, c.attempt), u.css(h, c.cssSize), c.actual = "width" == h ? u.outerWidth() : u.outerHeight(), 
    c.correct = n === c.actual, 1 === o.length && (_log(m, !1, !0), _log(r, !1, !0)), 
    _log(c, !1, !0), o.length > 3)); ) o.push(c), r = o[o.length - 1];
    d.size = n, $.extend(d, elDims(u)), d.isVisible && u.is(":visible") && (p && p.css(f, n + sC.inset[f]), 
    sizeContent(l)), !t && !g && state.initialized && d.isVisible && _runCallbacks("onresize_end", l), 
    t || (d.isSliding || sizeMidPanes("horz" == _c[l].dir ? "" : "center", g, i), sizeHandles());
    var b = _c.oppositeEdge[l];
    a > n && state[b].noRoom && (setSizeLimits(b), makePaneFit(b, !1, t)), o.length > 1 && _log(m + "\nSee the Error Console for details.", !0, !0);
   }
   if (isInitialized()) {
    var a, s, l = evtPane.call(this, e), c = options[l], d = state[l], u = $Ps[l], p = $Rs[l], f = _c[l].side, h = _c[l].sizeType.toLowerCase(), g = d.isResizing && !c.triggerEventsDuringLiveResize, m = o !== !0 && c.animatePaneSizing;
    $N.queue(function(e) {
     if (setSizeLimits(l), a = d.size, n = _parseSize(l, n), n = max(n, _parseSize(l, c.minSize)), 
     n = min(n, d.maxSize), n < d.minSize) return e(), makePaneFit(l, !1, t), void 0;
     if (!i && n === a) return e();
     if (d.newSize = n, !t && state.initialized && d.isVisible && _runCallbacks("onresize_start", l), 
     s = cssSize(l, n), m && u.is(":visible")) {
      var o = $.layout.effects.size[l] || $.layout.effects.size.all, p = c.fxSettings_size.easing || o.easing, f = options.zIndexes, g = {};
      g[h] = s + "px", d.isMoving = !0, u.css({
       zIndex: f.pane_animate
      }).show().animate(g, c.fxSpeed_size, p, function() {
       u.css({
        zIndex: d.isSliding ? f.pane_sliding : f.pane_normal
       }), d.isMoving = !1, delete d.newSize, r(), e();
      });
     } else u.css(h, s), delete d.newSize, u.is(":visible") ? r() : (d.size = n, $.extend(d, elDims(u))), 
     e();
    });
   }
  }, sizeMidPanes = function(e, n, t) {
   e = (e ? e : "east,west,center").split(","), $.each(e, function(e, o) {
    if ($Ps[o]) {
     var i = options[o], r = state[o], a = $Ps[o], s = ($Rs[o], !0), l = {}, c = $.layout.showInvisibly(a), d = calcNewCenterPaneDims();
     if ($.extend(r, elDims(a)), "center" === o) {
      if (!t && r.isVisible && d.width === r.outerWidth && d.height === r.outerHeight) return a.css(c), 
      !0;
      if ($.extend(r, cssMinDims(o), {
       maxWidth: d.width,
       maxHeight: d.height
      }), l = d, r.newWidth = l.width, r.newHeight = l.height, l.width = cssW(a, l.width), 
      l.height = cssH(a, l.height), s = l.width >= 0 && l.height >= 0, !state.initialized && i.minWidth > d.width) {
       var u = i.minWidth - r.outerWidth, p = options.east.minSize || 0, f = options.west.minSize || 0, h = state.east.size, g = state.west.size, m = h, b = g;
       if (u > 0 && state.east.isVisible && h > p && (m = max(h - p, h - u), u -= h - m), 
       u > 0 && state.west.isVisible && g > f && (b = max(g - f, g - u), u -= g - b), 0 === u) return h && h != p && sizePane("east", m, !0, !0, t), 
       g && g != f && sizePane("west", b, !0, !0, t), sizeMidPanes("center", n, t), a.css(c), 
       void 0;
      }
     } else {
      if (r.isVisible && !r.noVerticalRoom && $.extend(r, elDims(a), cssMinDims(o)), !t && !r.noVerticalRoom && d.height === r.outerHeight) return a.css(c), 
      !0;
      l.top = d.top, l.bottom = d.bottom, r.newSize = d.height, l.height = cssH(a, d.height), 
      r.maxHeight = l.height, s = r.maxHeight >= 0, s || (r.noVerticalRoom = !0);
     }
     if (s ? (!n && state.initialized && _runCallbacks("onresize_start", o), a.css(l), 
     "center" !== o && sizeHandles(o), !r.noRoom || r.isClosed || r.isHidden || makePaneFit(o), 
     r.isVisible && ($.extend(r, elDims(a)), state.initialized && sizeContent(o))) : !r.noRoom && r.isVisible && makePaneFit(o), 
     a.css(c), delete r.newSize, delete r.newWidth, delete r.newHeight, !r.isVisible) return !0;
     if ("center" === o) {
      var v = browser.isIE6 || !browser.boxModel;
      $Ps.north && (v || "IFRAME" == state.north.tagName) && $Ps.north.css("width", cssW($Ps.north, sC.innerWidth)), 
      $Ps.south && (v || "IFRAME" == state.south.tagName) && $Ps.south.css("width", cssW($Ps.south, sC.innerWidth));
     }
     !n && state.initialized && _runCallbacks("onresize_end", o);
    }
   });
  }, resizeAll = function(e) {
   var n = sC.innerWidth, t = sC.innerHeight;
   if (evtPane(e), $N.is(":visible")) {
    if (!state.initialized) return _initLayoutElements(), void 0;
    if (e === !0 && $.isPlainObject(options.outset) && $N.css(options.outset), $.extend(sC, elDims($N, options.inset)), 
    sC.outerHeight) {
     if (e === !0 && setPanePosition(), !1 === _runCallbacks("onresizeall_start")) return !1;
     var o, i, r;
     sC.innerHeight < t, sC.innerWidth < n, $.each([ "south", "north", "east", "west" ], function(e, n) {
      $Ps[n] && (i = options[n], r = state[n], r.autoResize && r.size != i.size ? sizePane(n, i.size, !0, !0, !0) : (setSizeLimits(n), 
      makePaneFit(n, !1, !0, !0)));
     }), sizeMidPanes("", !0, !0), sizeHandles(), $.each(_c.allPanes, function(e, n) {
      o = $Ps[n], o && state[n].isVisible && _runCallbacks("onresize_end", n);
     }), _runCallbacks("onresizeall_end");
    }
   }
  }, resizeChildren = function(e, n) {
   var t = evtPane.call(this, e);
   if (options[t].resizeChildren) {
    n || refreshChildren(t);
    var o = children[t];
    $.isPlainObject(o) && $.each(o, function(e, n) {
     n.destroyed || n.resizeAll();
    });
   }
  }, sizeContent = function(e, n) {
   if (isInitialized()) {
    var t = evtPane.call(this, e);
    t = t ? t.split(",") : _c.allPanes, $.each(t, function(e, t) {
     function o(e) {
      return max(l.css.paddingBottom, parseInt(e.css("marginBottom"), 10) || 0);
     }
     function i() {
      var e = options[t].contentIgnoreSelector, n = a.nextAll().not(".ui-layout-mask").not(e || ":lt(0)"), i = n.filter(":visible"), r = i.filter(":last");
      c = {
       top: a[0].offsetTop,
       height: a.outerHeight(),
       numFooters: n.length,
       hiddenFooters: n.length - i.length,
       spaceBelow: 0
      }, c.spaceAbove = c.top, c.bottom = c.top + c.height, c.spaceBelow = r.length ? r[0].offsetTop + r.outerHeight() - c.bottom + o(r) : o(a);
     }
     var r = $Ps[t], a = $Cs[t], s = options[t], l = state[t], c = l.content;
     if (!r || !a || !r.is(":visible")) return !0;
     if ((a.length || (initContent(t, !1), a)) && !1 !== _runCallbacks("onsizecontent_start", t)) {
      (!l.isMoving && !l.isResizing || s.liveContentResizing || n || void 0 == c.top) && (i(), 
      c.hiddenFooters > 0 && "hidden" === r.css("overflow") && (r.css("overflow", "visible"), 
      i(), r.css("overflow", "hidden")));
      var d = l.innerHeight - (c.spaceAbove - l.css.paddingTop) - (c.spaceBelow - l.css.paddingBottom);
      a.is(":visible") && c.height == d || (setOuterHeight(a, d, !0), c.height = d), state.initialized && _runCallbacks("onsizecontent_end", t);
     }
    });
   }
  }, sizeHandles = function(e) {
   var n = evtPane.call(this, e);
   n = n ? n.split(",") : _c.borderPanes, $.each(n, function(e, n) {
    var t, o = options[n], i = state[n], r = $Ps[n], a = $Rs[n], s = $Ts[n];
    if (r && a) {
     var l, c, d, u = _c[n].dir, p = i.isClosed ? "_closed" : "_open", f = o["spacing" + p], h = o["togglerAlign" + p], g = o["togglerLength" + p];
     if (0 === f) return a.hide(), void 0;
     if (i.noRoom || i.isHidden || a.show(), "horz" === u ? (l = sC.innerWidth, i.resizerLength = l, 
     c = $.layout.cssNum(r, "left"), a.css({
      width: cssW(a, l),
      height: cssH(a, f),
      left: c > -9999 ? c : sC.inset.left
     })) : (l = r.outerHeight(), i.resizerLength = l, a.css({
      height: cssH(a, l),
      width: cssW(a, f),
      top: sC.inset.top + getPaneSize("north", !0)
     })), removeHover(o, a), s) {
      if (0 === g || i.isSliding && o.hideTogglerOnSlide) return s.hide(), void 0;
      if (s.show(), !(g > 0) || "100%" === g || g > l) g = l, d = 0; else if (isStr(h)) switch (h) {
      case "top":
      case "left":
       d = 0;
       break;

      case "bottom":
      case "right":
       d = l - g;
       break;

      case "middle":
      case "center":
      default:
       d = round((l - g) / 2);
      } else {
       var m = parseInt(h, 10);
       d = h >= 0 ? m : l - g + m;
      }
      if ("horz" === u) {
       var b = cssW(s, g);
       s.css({
        width: b,
        height: cssH(s, f),
        left: d,
        top: 0
       }), s.children(".content").each(function() {
        t = $(this), t.css("marginLeft", round((b - t.outerWidth()) / 2));
       });
      } else {
       var v = cssH(s, g);
       s.css({
        height: v,
        width: cssW(s, f),
        top: d,
        left: 0
       }), s.children(".content").each(function() {
        t = $(this), t.css("marginTop", round((v - t.outerHeight()) / 2));
       });
      }
      removeHover(0, s);
     }
     state.initialized || !o.initHidden && !i.isHidden || (a.hide(), s && s.hide());
    }
   });
  }, enableClosable = function(e) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), t = $Ts[n], o = options[n];
    t && (o.closable = !0, t.bind("click." + sID, function(e) {
     e.stopPropagation(), toggle(n);
    }).css("visibility", "visible").css("cursor", "pointer").attr("title", state[n].isClosed ? o.tips.Open : o.tips.Close).show());
   }
  }, disableClosable = function(e, n) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), o = $Ts[t];
    o && (options[t].closable = !1, state[t].isClosed && open(t, !1, !0), o.unbind("." + sID).css("visibility", n ? "hidden" : "visible").css("cursor", "default").attr("title", ""));
   }
  }, enableSlidable = function(e) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), t = $Rs[n];
    t && t.data("draggable") && (options[n].slidable = !0, state[n].isClosed && bindStartSlidingEvents(n, !0));
   }
  }, disableSlidable = function(e) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), t = $Rs[n];
    t && (options[n].slidable = !1, state[n].isSliding ? close(n, !1, !0) : (bindStartSlidingEvents(n, !1), 
    t.css("cursor", "default").attr("title", ""), removeHover(null, t[0])));
   }
  }, enableResizable = function(e) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), t = $Rs[n], o = options[n];
    t && t.data("draggable") && (o.resizable = !0, t.draggable("enable"), state[n].isClosed || t.css("cursor", o.resizerCursor).attr("title", o.tips.Resize));
   }
  }, disableResizable = function(e) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), t = $Rs[n];
    t && t.data("draggable") && (options[n].resizable = !1, t.draggable("disable").css("cursor", "default").attr("title", ""), 
    removeHover(null, t[0]));
   }
  }, swapPanes = function(e, n) {
   function t(e) {
    var n = $Ps[e], t = $Cs[e];
    return n ? {
     pane: e,
     P: n ? n[0] : !1,
     C: t ? t[0] : !1,
     state: $.extend(!0, {}, state[e]),
     options: $.extend(!0, {}, options[e])
    } : !1;
   }
   function o(e, n) {
    if (e) {
     var t, o, i = e.P, r = e.C, a = e.pane, l = _c[n], c = $.extend(!0, {}, state[n]), d = options[n], u = {
      resizerCursor: d.resizerCursor
     };
     $.each("fxName,fxSpeed,fxSettings".split(","), function(e, n) {
      u[n + "_open"] = d[n + "_open"], u[n + "_close"] = d[n + "_close"], u[n + "_size"] = d[n + "_size"];
     }), $Ps[n] = $(i).data({
      layoutPane: Instance[n],
      layoutEdge: n
     }).css(_c.hidden).css(l.cssReq), $Cs[n] = r ? $(r) : !1, options[n] = $.extend(!0, {}, e.options, u), 
     state[n] = $.extend(!0, {}, e.state), t = new RegExp(d.paneClass + "-" + a, "g"), 
     i.className = i.className.replace(t, d.paneClass + "-" + n), initHandles(n), l.dir != _c[a].dir ? (o = s[n] || 0, 
     setSizeLimits(n), o = max(o, state[n].minSize), manualSizePane(n, o, !0, !0)) : $Rs[n].css(l.side, sC.inset[l.side] + (state[n].isVisible ? getPaneSize(n) : 0)), 
     e.state.isVisible && !c.isVisible ? setAsOpen(n, !0) : (setAsClosed(n), bindStartSlidingEvents(n, !0)), 
     e = null;
    }
   }
   if (isInitialized()) {
    var i = evtPane.call(this, e);
    if (state[i].edge = n, state[n].edge = i, !1 === _runCallbacks("onswap_start", i) || !1 === _runCallbacks("onswap_start", n)) return state[i].edge = i, 
    state[n].edge = n, void 0;
    var r = t(i), a = t(n), s = {};
    s[i] = r ? r.state.size : 0, s[n] = a ? a.state.size : 0, $Ps[i] = !1, $Ps[n] = !1, 
    state[i] = {}, state[n] = {}, $Ts[i] && $Ts[i].remove(), $Ts[n] && $Ts[n].remove(), 
    $Rs[i] && $Rs[i].remove(), $Rs[n] && $Rs[n].remove(), $Rs[i] = $Rs[n] = $Ts[i] = $Ts[n] = !1, 
    o(r, n), o(a, i), r = a = s = null, $Ps[i] && $Ps[i].css(_c.visible), $Ps[n] && $Ps[n].css(_c.visible), 
    resizeAll(), _runCallbacks("onswap_end", i), _runCallbacks("onswap_end", n);
   }
  }, syncPinBtns = function(e, n) {
   $.layout.plugins.buttons && $.each(state[e].pins, function(t, o) {
    $.layout.buttons.setPinState(Instance, $(o), e, n);
   });
  }, $N = $(this).eq(0);
  if (!$N.length) return _log(options.errors.containerMissing);
  if ($N.data("layoutContainer") && $N.data("layout")) return $N.data("layout");
  var $Ps = {}, $Cs = {}, $Rs = {}, $Ts = {}, $Ms = $([]), sC = state.container, sID = state.id, Instance = {
   options: options,
   state: state,
   container: $N,
   panes: $Ps,
   contents: $Cs,
   resizers: $Rs,
   togglers: $Ts,
   hide: hide,
   show: show,
   toggle: toggle,
   open: open,
   close: close,
   slideOpen: slideOpen,
   slideClose: slideClose,
   slideToggle: slideToggle,
   setSizeLimits: setSizeLimits,
   _sizePane: sizePane,
   sizePane: manualSizePane,
   sizeContent: sizeContent,
   swapPanes: swapPanes,
   showMasks: showMasks,
   hideMasks: hideMasks,
   initContent: initContent,
   addPane: addPane,
   removePane: removePane,
   createChildren: createChildren,
   refreshChildren: refreshChildren,
   enableClosable: enableClosable,
   disableClosable: disableClosable,
   enableSlidable: enableSlidable,
   disableSlidable: disableSlidable,
   enableResizable: enableResizable,
   disableResizable: disableResizable,
   allowOverflow: allowOverflow,
   resetOverflow: resetOverflow,
   destroy: destroy,
   initPanes: isInitialized,
   resizeAll: resizeAll,
   runCallbacks: _runCallbacks,
   hasParentLayout: !1,
   children: children,
   north: !1,
   south: !1,
   west: !1,
   east: !1,
   center: !1
  };
  return "cancel" === _create() ? null : Instance;
 };
}(jQuery), function(e) {
 e.ui || (e.ui = {}), e.ui.cookie = {
  acceptsCookies: !!navigator.cookieEnabled,
  read: function(n) {
   for (var t, o = document.cookie, i = o ? o.split(";") : [], r = 0, a = i.length; a > r; r++) if (t = e.trim(i[r]).split("="), 
   t[0] == n) return decodeURIComponent(t[1]);
   return null;
  },
  write: function(n, t, o) {
   var i = "", r = "", a = !1, s = o || {}, l = s.expires || null, c = e.type(l);
   "date" === c ? r = l : "string" === c && l > 0 && (l = parseInt(l, 10), c = "number"), 
   "number" === c && (r = new Date(), l > 0 ? r.setDate(r.getDate() + l) : (r.setFullYear(1970), 
   a = !0)), r && (i += ";expires=" + r.toUTCString()), s.path && (i += ";path=" + s.path), 
   s.domain && (i += ";domain=" + s.domain), s.secure && (i += ";secure"), document.cookie = n + "=" + (a ? "" : encodeURIComponent(t)) + i;
  },
  clear: function(n) {
   e.ui.cookie.write(n, "", {
    expires: -1
   });
  }
 }, e.cookie || (e.cookie = function(n, t, o) {
  var i = e.ui.cookie;
  if (null === t) i.clear(n); else {
   if (void 0 === t) return i.read(n);
   i.write(n, t, o);
  }
 }), e.layout.plugins.stateManagement = !0, e.layout.config.optionRootKeys.push("stateManagement"), 
 e.layout.defaults.stateManagement = {
  enabled: !1,
  autoSave: !0,
  autoLoad: !0,
  animateLoad: !0,
  includeChildren: !0,
  stateKeys: "north.size,south.size,east.size,west.size,north.isClosed,south.isClosed,east.isClosed,west.isClosed,north.isHidden,south.isHidden,east.isHidden,west.isHidden",
  cookie: {
   name: "",
   domain: "",
   path: "",
   expires: "",
   secure: !1
  }
 }, e.layout.optionsMap.layout.push("stateManagement"), e.layout.state = {
  saveCookie: function(n, t, o) {
   var i = n.options, r = i.stateManagement, a = e.extend(!0, {}, r.cookie, o || null), s = n.state.stateData = n.readState(t || r.stateKeys);
   return e.ui.cookie.write(a.name || i.name || "Layout", e.layout.state.encodeJSON(s), a), 
   e.extend(!0, {}, s);
  },
  deleteCookie: function(n) {
   var t = n.options;
   e.ui.cookie.clear(t.stateManagement.cookie.name || t.name || "Layout");
  },
  readCookie: function(n) {
   var t = n.options, o = e.ui.cookie.read(t.stateManagement.cookie.name || t.name || "Layout");
   return o ? e.layout.state.decodeJSON(o) : {};
  },
  loadCookie: function(n) {
   var t = e.layout.state.readCookie(n);
   return t && (n.state.stateData = e.extend(!0, {}, t), n.loadState(t)), t;
  },
  loadState: function(n, t, o) {
   if (e.isPlainObject(t) && !e.isEmptyObject(t)) {
    t = n.state.stateData = e.layout.transformData(t);
    var i = n.options.stateManagement;
    if (o = e.extend({
     animateLoad: !1,
     includeChildren: i.includeChildren
    }, o), n.state.initialized) {
     var r, a, l, c, d, u = !o.animateLoad;
     if (e.each(e.layout.config.borderPanes, function(o, i) {
      r = t[i], e.isPlainObject(r) && (s = r.size, a = r.initClosed, l = r.initHidden, 
      ar = r.autoResize, c = n.state[i], d = c.isVisible, ar && (c.autoResize = ar), d || n._sizePane(i, s, !1, !1, !1), 
      l === !0 ? n.hide(i, u) : a === !0 ? n.close(i, !1, u) : a === !1 ? n.open(i, !1, u) : l === !1 && n.show(i, !1, u), 
      d && n._sizePane(i, s, !1, !1, u));
     }), o.includeChildren) {
      var p, f;
      e.each(n.children, function(n, o) {
       p = t[n] ? t[n].children : 0, p && o && e.each(o, function(e, n) {
        f = p[e], n && f && n.loadState(f);
       });
      });
     }
    } else {
     var r = e.extend(!0, {}, t);
     e.each(e.layout.config.allPanes, function(e, n) {
      r[n] && delete r[n].children;
     }), e.extend(!0, n.options, r);
    }
   }
  },
  readState: function(n, t) {
   "string" === e.type(t) && (t = {
    keys: t
   }), t || (t = {});
   var o, i, r, a, s, l, c, d = n.options.stateManagement, u = t.includeChildren, p = void 0 !== u ? u : d.includeChildren, f = t.stateKeys || d.stateKeys, h = {
    isClosed: "initClosed",
    isHidden: "initHidden"
   }, g = n.state, m = e.layout.config.allPanes, b = {};
   e.isArray(f) && (f = f.join(",")), f = f.replace(/__/g, ".").split(",");
   for (var v = 0, y = f.length; y > v; v++) o = f[v].split("."), i = o[0], r = o[1], 
   e.inArray(i, m) < 0 || (a = g[i][r], void 0 != a && ("isClosed" == r && g[i].isSliding && (a = !0), 
   (b[i] || (b[i] = {}))[h[r] ? h[r] : r] = a));
   return p && e.each(m, function(t, o) {
    l = n.children[o], s = g.stateData[o], e.isPlainObject(l) && !e.isEmptyObject(l) && (c = b[o] || (b[o] = {}), 
    c.children || (c.children = {}), e.each(l, function(n, t) {
     t.state.initialized ? c.children[n] = e.layout.state.readState(t) : s && s.children && s.children[n] && (c.children[n] = e.extend(!0, {}, s.children[n]));
    }));
   }), b;
  },
  encodeJSON: function(n) {
   function t(n) {
    var o, i, r, a = [], s = 0, l = e.isArray(n);
    for (o in n) i = n[o], r = typeof i, "string" == r ? i = '"' + i + '"' : "object" == r && (i = t(i)), 
    a[s++] = (l ? "" : '"' + o + '":') + i;
    return (l ? "[" : "{") + a.join(",") + (l ? "]" : "}");
   }
   return t(n);
  },
  decodeJSON: function(n) {
   try {
    return e.parseJSON ? e.parseJSON(n) : window.eval("(" + n + ")") || {};
   } catch (t) {
    return {};
   }
  },
  _create: function(n) {
   var t = e.layout.state, o = n.options, i = o.stateManagement;
   if (e.extend(n, {
    readCookie: function() {
     return t.readCookie(n);
    },
    deleteCookie: function() {
     t.deleteCookie(n);
    },
    saveCookie: function(e, o) {
     return t.saveCookie(n, e, o);
    },
    loadCookie: function() {
     return t.loadCookie(n);
    },
    loadState: function(e, o) {
     t.loadState(n, e, o);
    },
    readState: function(e) {
     return t.readState(n, e);
    },
    encodeJSON: t.encodeJSON,
    decodeJSON: t.decodeJSON
   }), n.state.stateData = {}, i.autoLoad) if (e.isPlainObject(i.autoLoad)) e.isEmptyObject(i.autoLoad) || n.loadState(i.autoLoad); else if (i.enabled) if (e.isFunction(i.autoLoad)) {
    var r = {};
    try {
     r = i.autoLoad(n, n.state, n.options, n.options.name || "");
    } catch (a) {}
    r && e.isPlainObject(r) && !e.isEmptyObject(r) && n.loadState(r);
   } else n.loadCookie();
  },
  _unload: function(n) {
   var t = n.options.stateManagement;
   if (t.enabled && t.autoSave) if (e.isFunction(t.autoSave)) try {
    t.autoSave(n, n.state, n.options, n.options.name || "");
   } catch (o) {} else n.saveCookie();
  }
 }, e.layout.onCreate.push(e.layout.state._create), e.layout.onUnload.push(e.layout.state._unload), 
 e.layout.plugins.buttons = !0, e.layout.defaults.autoBindCustomButtons = !1, e.layout.optionsMap.layout.push("autoBindCustomButtons"), 
 e.layout.buttons = {
  init: function(n) {
   var t, o = "ui-layout-button-", i = n.options.name || "";
   e.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function(r, a) {
    e.each(e.layout.config.borderPanes, function(r, s) {
     e("." + o + a + "-" + s).each(function() {
      t = e(this).data("layoutName") || e(this).attr("layoutName"), (void 0 == t || t === i) && n.bindButton(this, a, s);
     });
    });
   });
  },
  get: function(n, t, o, i) {
   var r = e(t), a = n.options, s = a.errors.addButtonError;
   if (r.length) if (e.inArray(o, e.layout.config.borderPanes) < 0) e.layout.msg(s + " " + a.errors.pane + ": " + o, !0), 
   r = e(""); else {
    var l = a[o].buttonClass + "-" + i;
    r.addClass(l + " " + l + "-" + o).data("layoutName", a.name);
   } else e.layout.msg(s + " " + a.errors.selector + ": " + t, !0);
   return r;
  },
  bind: function(n, t, o, i) {
   var r = e.layout.buttons;
   switch (o.toLowerCase()) {
   case "toggle":
    r.addToggle(n, t, i);
    break;

   case "open":
    r.addOpen(n, t, i);
    break;

   case "close":
    r.addClose(n, t, i);
    break;

   case "pin":
    r.addPin(n, t, i);
    break;

   case "toggle-slide":
    r.addToggle(n, t, i, !0);
    break;

   case "open-slide":
    r.addOpen(n, t, i, !0);
   }
   return n;
  },
  addToggle: function(n, t, o, i) {
   return e.layout.buttons.get(n, t, o, "toggle").click(function(e) {
    n.toggle(o, !!i), e.stopPropagation();
   }), n;
  },
  addOpen: function(n, t, o, i) {
   return e.layout.buttons.get(n, t, o, "open").attr("title", n.options[o].tips.Open).click(function(e) {
    n.open(o, !!i), e.stopPropagation();
   }), n;
  },
  addClose: function(n, t, o) {
   return e.layout.buttons.get(n, t, o, "close").attr("title", n.options[o].tips.Close).click(function(e) {
    n.close(o), e.stopPropagation();
   }), n;
  },
  addPin: function(n, t, o) {
   var i = e.layout.buttons, r = i.get(n, t, o, "pin");
   if (r.length) {
    var a = n.state[o];
    r.click(function(t) {
     i.setPinState(n, e(this), o, a.isSliding || a.isClosed), a.isSliding || a.isClosed ? n.open(o) : n.close(o), 
     t.stopPropagation();
    }), i.setPinState(n, r, o, !a.isClosed && !a.isSliding), a.pins.push(t);
   }
   return n;
  },
  setPinState: function(e, n, t, o) {
   var i = n.attr("pin");
   if (!i || o !== ("down" == i)) {
    var r = e.options[t], a = r.buttonClass + "-pin", s = a + "-" + t, l = a + "-up " + s + "-up", c = a + "-down " + s + "-down";
    n.attr("pin", o ? "down" : "up").attr("title", o ? r.tips.Unpin : r.tips.Pin).removeClass(o ? l : c).addClass(o ? c : l);
   }
  },
  syncPinBtns: function(n, t, o) {
   e.each(n.state[t].pins, function(i, r) {
    e.layout.buttons.setPinState(n, e(r), t, o);
   });
  },
  _load: function(n) {
   var t = e.layout.buttons;
   e.extend(n, {
    bindButton: function(e, o, i) {
     return t.bind(n, e, o, i);
    },
    addToggleBtn: function(e, o, i) {
     return t.addToggle(n, e, o, i);
    },
    addOpenBtn: function(e, o, i) {
     return t.addOpen(n, e, o, i);
    },
    addCloseBtn: function(e, o) {
     return t.addClose(n, e, o);
    },
    addPinBtn: function(e, o) {
     return t.addPin(n, e, o);
    }
   });
   for (var o = 0; 4 > o; o++) {
    var i = e.layout.config.borderPanes[o];
    n.state[i].pins = [];
   }
   n.options.autoBindCustomButtons && t.init(n);
  },
  _unload: function() {}
 }, e.layout.onLoad.push(e.layout.buttons._load), e.layout.plugins.browserZoom = !0, 
 e.layout.defaults.browserZoomCheckInterval = 1e3, e.layout.optionsMap.layout.push("browserZoomCheckInterval"), 
 e.layout.browserZoom = {
  _init: function(n) {
   e.layout.browserZoom.ratio() !== !1 && e.layout.browserZoom._setTimer(n);
  },
  _setTimer: function(n) {
   if (!n.destroyed) {
    var t = n.options, o = n.state, i = n.hasParentLayout ? 5e3 : Math.max(t.browserZoomCheckInterval, 100);
    setTimeout(function() {
     if (!n.destroyed && t.resizeWithWindow) {
      var i = e.layout.browserZoom.ratio();
      i !== o.browserZoom && (o.browserZoom = i, n.resizeAll()), e.layout.browserZoom._setTimer(n);
     }
    }, i);
   }
  },
  ratio: function() {
   function n(e, n) {
    return (100 * (parseInt(e, 10) / parseInt(n, 10))).toFixed();
   }
   var t, o, i, r = window, a = screen, s = document, l = s.documentElement || s.body, c = e.layout.browser, d = c.version;
   return c.msie && d > 8 || !c.msie ? !1 : a.deviceXDPI && a.systemXDPI ? n(a.deviceXDPI, a.systemXDPI) : c.webkit && (t = s.body.getBoundingClientRect) ? n(t.left - t.right, s.body.offsetWidth) : c.webkit && (o = r.outerWidth) ? n(o, r.innerWidth) : (o = a.width) && (i = l.clientWidth) ? n(o, i) : !1;
  }
 }, e.layout.onReady.push(e.layout.browserZoom._init);
}(jQuery), define("libs/layout", function() {}), function() {
 function e() {}
 function n(e) {
  this.buttonBar = u.getElementById("wmd-button-bar" + e), this.preview = u.getElementById("wmd-preview" + e), 
  this.input = u.getElementById("wmd-input" + e);
 }
 function t(e, n) {
  var t, i, r, a = this, s = [], c = 0, d = "none", u = function(e, n) {
   d != e && (d = e, n || f()), g.isIE && "moving" == d ? r = null : i = setTimeout(p, 1);
  }, p = function(e) {
   r = new o(n, e), i = void 0;
  };
  this.setCommandMode = function() {
   d = "command", f(), i = setTimeout(p, 0);
  }, this.canUndo = function() {
   return c > 1;
  }, this.canRedo = function() {
   return s[c + 1] ? !0 : !1;
  }, this.undo = function() {
   a.canUndo() && (t ? (t.restore(), t = null) : (s[c] = new o(n), s[--c].restore(), 
   e && e())), d = "none", n.input.focus(), p();
  }, this.redo = function() {
   a.canRedo() && (s[++c].restore(), e && e()), d = "none", n.input.focus(), p();
  };
  var f = function() {
   var i = r || new o(n);
   return i ? "moving" == d ? (t || (t = i), void 0) : (t && (s[c - 1].text != t.text && (s[c++] = t), 
   t = null), s[c++] = i, s[c + 1] = null, e && e(), void 0) : !1;
  }, h = function(e) {
   if (!e.ctrlKey && !e.metaKey) {
    var n = e.keyCode;
    n >= 33 && 40 >= n || n >= 63232 && 63235 >= n ? u("moving") : 8 == n || 46 == n || 127 == n ? u("deleting") : 13 == n ? u("newlines") : 27 == n ? u("escape") : (16 > n || n > 20) && 91 != n && u("typing");
   }
  }, m = function() {
   l.addEvent(n.input, "keypress", function(e) {
    !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault();
   });
   var e = function() {
    (g.isIE || r && r.text != n.input.value) && void 0 == i && (d = "paste", f(), p());
   };
   l.addEvent(n.input, "keydown", h), l.addEvent(n.input, "mousedown", function() {
    u("moving");
   }), n.input.onpaste = e, n.input.ondrop = e;
  }, b = function() {
   m(), p(!0);
  };
  this.reinit = function(e, n, o, a) {
   s = [], c = 0, d = "none", t = void 0, i = void 0, p(), r.text = e, r.start = n, 
   r.end = o, r.scrollTop = a, r.setInputAreaSelection(), f();
  }, this.setMode = u, b();
 }
 function o(n, t) {
  var o = this, i = n.input;
  this.init = function() {
   l.isVisible(i) && (t || !u.activeElement || u.activeElement === i) && (this.setInputAreaSelectionStartEnd(), 
   this.scrollTop = i.scrollTop, (!this.text && i.selectionStart || 0 === i.selectionStart) && (this.text = i.value));
  }, this.setInputAreaSelection = function() {
   if (l.isVisible(i)) if (void 0 === i.selectionStart || g.isOpera) {
    if (u.selection) {
     if (u.activeElement && u.activeElement !== i) return;
     i.focus();
     var e = i.createTextRange();
     e.moveStart("character", -i.value.length), e.moveEnd("character", -i.value.length), 
     e.moveEnd("character", o.end), e.moveStart("character", o.start), e.select();
    }
   } else i.focus(), i.selectionStart = o.start, i.selectionEnd = o.end, i.scrollTop = o.scrollTop;
  }, this.setInputAreaSelectionStartEnd = function() {
   if (n.ieCachedRange || !i.selectionStart && 0 !== i.selectionStart) {
    if (u.selection) {
     o.text = l.fixEolChars(i.value);
     var e = n.ieCachedRange || u.selection.createRange(), t = l.fixEolChars(e.text), r = "", a = r + t + r;
     e.text = a;
     var s = l.fixEolChars(i.value);
     e.moveStart("character", -a.length), e.text = t, o.start = s.indexOf(r), o.end = s.lastIndexOf(r) - r.length;
     var c = o.text.length - l.fixEolChars(i.value).length;
     if (c) {
      for (e.moveStart("character", -t.length); c--; ) t += "\n", o.end += 1;
      e.text = t;
     }
     n.ieCachedRange && (o.scrollTop = n.ieCachedScrollTop), n.ieCachedRange = null, 
     this.setInputAreaSelection();
    }
   } else o.start = i.selectionStart, o.end = i.selectionEnd;
  }, this.restore = function() {
   void 0 != o.text && o.text != i.value && (i.value = o.text), this.setInputAreaSelection(), 
   i.scrollTop = o.scrollTop;
  }, this.getChunks = function() {
   var n = new e();
   return n.before = l.fixEolChars(o.text.substring(0, o.start)), n.startTag = "", 
   n.selection = l.fixEolChars(o.text.substring(o.start, o.end)), n.endTag = "", n.after = l.fixEolChars(o.text.substring(o.end)), 
   n.scrollTop = o.scrollTop, n;
  }, this.setChunks = function(e) {
   e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, 
   this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, 
   this.scrollTop = e.scrollTop;
  }, this.init();
 }
 function i(e, n, t, o) {
  var i, r, a, s = 3e3, d = "delayed", p = function(e, n) {
   l.addEvent(e, "input", n), e.onpaste = n, e.ondrop = n, l.addEvent(e, "keypress", n), 
   l.addEvent(e, "keydown", n);
  }, f = function() {
   var e = 0;
   return window.innerHeight ? e = window.pageYOffset : u.documentElement && u.documentElement.scrollTop ? e = u.documentElement.scrollTop : u.body && (e = u.body.scrollTop), 
   e;
  }, h = function() {
   if (n.preview) {
    var t = n.input.value;
    if (!t || t != a) {
     a = t;
     var o = new Date().getTime();
     t = e.makeHtml(t);
     var i = new Date().getTime();
     r = i - o, S(t);
    }
   }
  };
  void 0 !== o && (h = o(h));
  var m = function() {
   if (i && (clearTimeout(i), i = void 0), "manual" !== d) {
    var e = 0;
    "delayed" === d && (e = r), e > s && (e = s), i = setTimeout(h, e);
   }
  }, b = function(e) {
   return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight);
  }, v = function() {
   n.preview && (n.preview.scrollTop = (n.preview.scrollHeight - n.preview.clientHeight) * b(n.preview));
  };
  this.refresh = function(e) {
   e ? (a = "", h()) : m();
  }, this.processingTime = function() {
   return r;
  };
  var y, x = !0, w = function(e) {
   var t = n.preview, o = t.parentNode, i = t.nextSibling;
   o.removeChild(t), t.innerHTML = e, i ? o.insertBefore(t, i) : o.appendChild(t);
  }, k = function(e) {
   n.preview.innerHTML = e;
  }, C = function(e) {
   if (y) return y(e);
   try {
    k(e), y = k;
   } catch (n) {
    y = w, y(e);
   }
  }, S = function(e) {
   var o = c.getTop(n.input) - f();
   if (n.preview && (C(e), t()), v(), x) return x = !1, void 0;
   var i = c.getTop(n.input) - f();
   g.isIE ? setTimeout(function() {
    window.scrollBy(0, i - o);
   }, 0) : window.scrollBy(0, i - o);
  }, T = function() {
   p(n.input, m), n.preview && (n.preview.scrollTop = 0);
  };
  T();
 }
 function r(e, n, t, i, r, a, s) {
  function c(e) {
   if (b.focus(), e.textOp) {
    t && t.setCommandMode();
    var r = new o(n);
    if (!r) return;
    var a = r.getChunks(), s = function() {
     b.focus(), a && r.setChunks(a), r.restore(), i.refresh();
    }, l = e.textOp(a, s);
    l || (s(), b.dispatchEvent(new Event("input")));
   }
   e.execute && e.execute(t);
  }
  function d(e, t) {
   var o = "0px", i = "-20px", r = "-40px", a = e.getElementsByTagName("span")[0];
   t ? (a.style.backgroundPosition = e.XShift + " " + o, e.onmouseover = function() {
    a.style.backgroundPosition = this.XShift + " " + r;
   }, e.onmouseout = function() {
    a.style.backgroundPosition = this.XShift + " " + o;
   }, g.isIE && (e.onmousedown = function() {
    u.activeElement && u.activeElement !== n.input || (n.ieCachedRange = document.selection.createRange(), 
    n.ieCachedScrollTop = n.input.scrollTop);
   }), e.isHelp || (e.onclick = function() {
    return this.onmouseout && this.onmouseout(), c(this), !1;
   }), e.className = e.className.replace(/ disabled/g, "")) : (a.style.backgroundPosition = e.XShift + " " + i, 
   e.onmouseover = e.onmouseout = e.onclick = function() {}, e.className += " disabled");
  }
  function p(e) {
   return "string" == typeof e && (e = r[e]), function() {
    e.apply(r, arguments);
   };
  }
  function h() {
   var t = n.buttonBar, o = document.createElement("ul");
   o.id = "wmd-button-row" + e, o.className = "wmd-button-row", o = t.appendChild(o);
   var i = 0, r = function(n, t, r, a) {
    var s = document.createElement("li");
    s.className = "wmd-button", s.style.left = i + "px", i += 25;
    var l = document.createElement("span");
    return s.id = n + e, s.appendChild(l), s.title = t, s.XShift = r, a && (s.textOp = a), 
    d(s, !0), o.appendChild(s), s;
   }, l = function(n) {
    var t = document.createElement("li");
    t.className = "wmd-spacer wmd-spacer" + n, t.id = "wmd-spacer" + n + e, o.appendChild(t), 
    i += 25;
   };
   v.bold = r("wmd-bold-button", s("bold"), "0px", p("doBold")), v.italic = r("wmd-italic-button", s("italic"), "-20px", p("doItalic")), 
   l(1), v.link = r("wmd-link-button", s("link"), "-40px", p(function(e, n) {
    return this.doLinkOrImage(e, n, !1);
   })), v.quote = r("wmd-quote-button", s("quote"), "-60px", p("doBlockquote")), v.code = r("wmd-code-button", s("code"), "-80px", p("doCode")), 
   v.image = r("wmd-image-button", s("image"), "-100px", p(function(e, n) {
    return this.doLinkOrImage(e, n, !0);
   })), l(2), v.olist = r("wmd-olist-button", s("olist"), "-120px", p(function(e, n) {
    this.doList(e, n, !0);
   })), v.ulist = r("wmd-ulist-button", s("ulist"), "-140px", p(function(e, n) {
    this.doList(e, n, !1);
   })), v.heading = r("wmd-heading-button", s("heading"), "-160px", p("doHeading")), 
   v.hr = r("wmd-hr-button", s("hr"), "-180px", p("doHorizontalRule")), l(3), v.undo = r("wmd-undo-button", s("undo"), "-200px", null), 
   v.undo.execute = function(e) {
    e && e.undo();
   };
   var c = /win/.test(f.platform.toLowerCase()) ? s("redo") : s("redomac");
   if (v.redo = r("wmd-redo-button", c, "-220px", null), v.redo.execute = function(e) {
    e && e.redo();
   }, a) {
    var u = document.createElement("li"), h = document.createElement("span");
    u.appendChild(h), u.className = "wmd-button wmd-help-button", u.id = "wmd-help-button" + e, 
    u.XShift = "-240px", u.isHelp = !0, u.style.right = "0px", u.title = s("help"), 
    u.onclick = a.handler, d(u, !0), o.appendChild(u), v.help = u;
   }
   m();
  }
  function m() {
   t && (d(v.undo, t.canUndo()), d(v.redo, t.canRedo()));
  }
  var b = n.input, v = {};
  h();
  var y = "keydown";
  g.isOpera && (y = "keypress"), l.addEvent(b, y, function(e) {
   if ((e.ctrlKey || e.metaKey) && !e.altKey) {
    var n = e.charCode || e.keyCode, o = String.fromCharCode(n).toLowerCase();
    switch (o) {
    case "b":
     c(v.bold);
     break;

    case "i":
     c(v.italic);
     break;

    case "l":
     c(v.link);
     break;

    case "q":
     c(v.quote);
     break;

    case "k":
     c(v.code);
     break;

    case "g":
     c(v.image);
     break;

    case "o":
     c(v.olist);
     break;

    case "u":
     c(v.ulist);
     break;

    case "h":
     c(v.heading);
     break;

    case "r":
     c(v.hr);
     break;

    case "y":
     c(v.redo);
     break;

    case "z":
     e.shiftKey ? c(v.redo) : c(v.undo);
     break;

    case "v":
     return t.setMode("typing"), void 0;

    case "x":
     return t.setMode("deleting"), void 0;

    default:
     return;
    }
    e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1);
   }
  }), l.addEvent(b, "keyup", function(e) {
   if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
    var n = e.charCode || e.keyCode;
    if (13 === n) {
     var t = {};
     t.textOp = p("doAutoindent"), c(t);
    }
   }
  }), g.isIE && l.addEvent(b, "keydown", function(e) {
   var n = e.keyCode;
   return 27 === n ? !1 : void 0;
  }), this.setUndoRedoButtonStates = m, this.buttons = v, this.setButtonState = d;
 }
 function a(e, n) {
  this.hooks = e, this.getString = n;
 }
 function s(e) {
  return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(e, n, t) {
   return n = n.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, " ");
   }), n = decodeURIComponent(n), n = encodeURI(n).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), 
   n = n.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, "%2b");
   }), t && (t = t.trim ? t.trim() : t.replace(/^\s*/, "").replace(/\s*$/, ""), t = t.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), 
   t ? n + ' "' + t + '"' : n;
  });
 }
 var l = {}, c = {}, d = {}, u = window.document, p = window.RegExp, f = window.navigator, h = {
  lineLength: 72
 }, g = {
  isIE: /msie/.test(f.userAgent.toLowerCase()),
  isIE_5or6: /msie 6/.test(f.userAgent.toLowerCase()) || /msie 5/.test(f.userAgent.toLowerCase()),
  isOpera: /opera/.test(f.userAgent.toLowerCase())
 }, m = {
  bold: "Strong <strong> Ctrl+B",
  boldexample: "strong text",
  italic: "Emphasis <em> Ctrl+I",
  italicexample: "emphasized text",
  link: "Hyperlink <a> Ctrl+L",
  linkdescription: "enter link description here",
  linkdialog: '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
  quote: "Blockquote <blockquote> Ctrl+Q",
  quoteexample: "Blockquote",
  code: "Code Sample <pre><code> Ctrl+K",
  codeexample: "enter code here",
  image: "Image <img> Ctrl+G",
  imagedescription: "enter image description here",
  imagedialog: "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",
  olist: "Numbered List <ol> Ctrl+O",
  ulist: "Bulleted List <ul> Ctrl+U",
  litem: "List item",
  heading: "Heading <h1>/<h2> Ctrl+H",
  headingexample: "Heading",
  hr: "Horizontal Rule <hr> Ctrl+R",
  undo: "Undo - Ctrl+Z",
  redo: "Redo - Ctrl+Y",
  redomac: "Redo - Ctrl+Shift+Z",
  help: "Markdown Editing Help"
 }, b = "http://", v = "http://";
 Markdown.Editor = function(e, o, s) {
  s = s || {}, "function" == typeof s.handler && (s = {
   helpButton: s
  }), s.strings = s.strings || {}, s.helpButton && (s.strings.help = s.strings.help || s.helpButton.title);
  var l = function(e) {
   return s.strings[e] || m[e];
  };
  o = o || "";
  var c = this.hooks = new Markdown.HookCollection();
  c.addNoop("onPreviewRefresh"), c.addNoop("postBlockquoteCreation"), c.addFalse("insertImageDialog"), 
  c.addFalse("insertLinkDialog"), this.getConverter = function() {
   return e;
  };
  var d, p, f = this;
  this.run = function(h) {
   if (!d) {
    d = new n(o);
    var g, m = new a(c, l), b = new i(e, d, function() {
     c.onPreviewRefresh();
    }, h);
    /\?noundo/.test(u.location.href) || (p = new t(function() {
     b.refresh(), g && g.setUndoRedoButtonStates();
    }, d), this.textOperation = function(e) {
     p.setCommandMode(), e(), f.refreshPreview();
    }), g = new r(o, d, p, b, m, s.helpButton, l), g.setUndoRedoButtonStates(), f.refreshPreview = function() {
     b.refresh(!0);
    }, f.undoManager = p, f.uiManager = g;
   }
  };
 }, e.prototype.findTags = function(e, n) {
  var t, o = this;
  e && (t = l.extendRegExp(e, "", "$"), this.before = this.before.replace(t, function(e) {
   return o.startTag = o.startTag + e, "";
  }), t = l.extendRegExp(e, "^", ""), this.selection = this.selection.replace(t, function(e) {
   return o.startTag = o.startTag + e, "";
  })), n && (t = l.extendRegExp(n, "", "$"), this.selection = this.selection.replace(t, function(e) {
   return o.endTag = e + o.endTag, "";
  }), t = l.extendRegExp(n, "^", ""), this.after = this.after.replace(t, function(e) {
   return o.endTag = e + o.endTag, "";
  }));
 }, e.prototype.trimWhitespace = function(e) {
  var n, t, o = this;
  e ? n = t = "" : (n = function(e) {
   return o.before += e, "";
  }, t = function(e) {
   return o.after = e + o.after, "";
  }), this.selection = this.selection.replace(/^(\s*)/, n).replace(/(\s*)$/, t);
 }, e.prototype.skipLines = function(e, n, t) {
  void 0 === e && (e = 1), void 0 === n && (n = 1), e++, n++;
  var o, i;
  if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), 
  this.startTag = this.startTag + p.$1, this.selection = this.selection.replace(/(\n*$)/, ""), 
  this.endTag = this.endTag + p.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), 
  this.before = this.before + p.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), 
  this.after = this.after + p.$1, this.before) {
   for (o = i = ""; e--; ) o += "\\n?", i += "\n";
   t && (o = "\\n*"), this.before = this.before.replace(new p(o + "$", ""), i);
  }
  if (this.after) {
   for (o = i = ""; n--; ) o += "\\n?", i += "\n";
   t && (o = "\\n*"), this.after = this.after.replace(new p(o, ""), i);
  }
 }, l.isVisible = function(e) {
  return window.getComputedStyle ? "none" !== window.getComputedStyle(e, null).getPropertyValue("display") : e.currentStyle ? "none" !== e.currentStyle.display : void 0;
 }, l.addEvent = function(e, n, t) {
  e.attachEvent ? e.attachEvent("on" + n, t) : e.addEventListener(n, t, !1);
 }, l.removeEvent = function(e, n, t) {
  e.detachEvent ? e.detachEvent("on" + n, t) : e.removeEventListener(n, t, !1);
 }, l.fixEolChars = function(e) {
  return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n");
 }, l.extendRegExp = function(e, n, t) {
  (null === n || void 0 === n) && (n = ""), (null === t || void 0 === t) && (t = "");
  var o, i = e.toString();
  return i = i.replace(/\/([gim]*)$/, function(e, n) {
   return o = n, "";
  }), i = i.replace(/(^\/|\/$)/g, ""), i = n + i + t, new p(i, o);
 }, c.getTop = function(e, n) {
  var t = e.offsetTop;
  if (!n) for (;e = e.offsetParent; ) t += e.offsetTop;
  return t;
 }, c.getHeight = function(e) {
  return e.offsetHeight || e.scrollHeight;
 }, c.getWidth = function(e) {
  return e.offsetWidth || e.scrollWidth;
 }, c.getPageSize = function() {
  var e, n, t, o;
  self.innerHeight && self.scrollMaxY ? (e = u.body.scrollWidth, n = self.innerHeight + self.scrollMaxY) : u.body.scrollHeight > u.body.offsetHeight ? (e = u.body.scrollWidth, 
  n = u.body.scrollHeight) : (e = u.body.offsetWidth, n = u.body.offsetHeight), self.innerHeight ? (t = self.innerWidth, 
  o = self.innerHeight) : u.documentElement && u.documentElement.clientHeight ? (t = u.documentElement.clientWidth, 
  o = u.documentElement.clientHeight) : u.body && (t = u.body.clientWidth, o = u.body.clientHeight);
  var i = Math.max(e, t), r = Math.max(n, o);
  return [ i, r, t, o ];
 }, d.createBackground = function() {
  var e = u.createElement("div"), n = e.style;
  e.className = "wmd-prompt-background", n.position = "absolute", n.top = "0", n.zIndex = "1000", 
  g.isIE ? n.filter = "alpha(opacity=50)" : n.opacity = "0.5";
  var t = c.getPageSize();
  return n.height = t[1] + "px", g.isIE ? (n.left = u.documentElement.scrollLeft, 
  n.width = u.documentElement.clientWidth) : (n.left = "0", n.width = "100%"), u.body.appendChild(e), 
  e;
 }, d.prompt = function(e, n, t) {
  var o, i;
  void 0 === n && (n = "");
  var r = function(e) {
   var n = e.charCode || e.keyCode;
   27 === n && a(!0);
  }, a = function(e) {
   l.removeEvent(u.body, "keydown", r);
   var n = i.value;
   return e ? n = null : (n = n.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(n) || (n = "http://" + n)), 
   o.parentNode.removeChild(o), t(n), !1;
  }, s = function() {
   o = u.createElement("div"), o.className = "wmd-prompt-dialog", o.style.padding = "10px;", 
   o.style.position = "fixed", o.style.width = "400px", o.style.zIndex = "1001";
   var t = u.createElement("div");
   t.innerHTML = e, t.style.padding = "5px", o.appendChild(t);
   var s = u.createElement("form"), d = s.style;
   s.onsubmit = function() {
    return a(!1);
   }, d.padding = "0", d.margin = "0", d.cssFloat = "left", d.width = "100%", d.textAlign = "center", 
   d.position = "relative", o.appendChild(s), i = u.createElement("input"), i.type = "text", 
   i.value = n, d = i.style, d.display = "block", d.width = "80%", d.marginLeft = d.marginRight = "auto", 
   s.appendChild(i);
   var p = u.createElement("input");
   p.type = "button", p.onclick = function() {
    return a(!1);
   }, p.value = "OK", d = p.style, d.margin = "10px", d.display = "inline", d.width = "7em";
   var f = u.createElement("input");
   f.type = "button", f.onclick = function() {
    return a(!0);
   }, f.value = "Cancel", d = f.style, d.margin = "10px", d.display = "inline", d.width = "7em", 
   s.appendChild(p), s.appendChild(f), l.addEvent(u.body, "keydown", r), o.style.top = "50%", 
   o.style.left = "50%", o.style.display = "block", g.isIE_5or6 && (o.style.position = "absolute", 
   o.style.top = u.documentElement.scrollTop + 200 + "px", o.style.left = "50%"), u.body.appendChild(o), 
   o.style.marginTop = -(c.getHeight(o) / 2) + "px", o.style.marginLeft = -(c.getWidth(o) / 2) + "px";
  };
  setTimeout(function() {
   s();
   var e = n.length;
   if (void 0 !== i.selectionStart) i.selectionStart = 0, i.selectionEnd = e; else if (i.createTextRange) {
    var t = i.createTextRange();
    t.collapse(!1), t.moveStart("character", -e), t.moveEnd("character", e), t.select();
   }
   i.focus();
  }, 0);
 };
 var y = a.prototype;
 y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", 
 y.unwrap = function(e) {
  var n = new p("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
  e.selection = e.selection.replace(n, "$1 $2");
 }, y.wrap = function(e, n) {
  this.unwrap(e);
  var t = new p("(.{1," + n + "})( +|$\\n?)", "gm"), o = this;
  e.selection = e.selection.replace(t, function(e, n) {
   return new p("^" + o.prefixes, "").test(e) ? e : n + "\n";
  }), e.selection = e.selection.replace(/\s+$/, "");
 }, y.doBold = function(e, n) {
  return this.doBorI(e, n, 2, this.getString("boldexample"));
 }, y.doItalic = function(e, n) {
  return this.doBorI(e, n, 1, this.getString("italicexample"));
 }, y.doBorI = function(e, n, t, o) {
  e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
  var i = /(\**$)/.exec(e.before)[0], r = /(^\**)/.exec(e.after)[0], a = Math.min(i.length, r.length);
  if (a >= t && (2 != a || 1 != t)) e.before = e.before.replace(p("[*]{" + t + "}$", ""), ""), 
  e.after = e.after.replace(p("^[*]{" + t + "}", ""), ""); else if (!e.selection && r) {
   e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
   var s = p.$1;
   e.before = e.before + r + s;
  } else {
   e.selection || r || (e.selection = o);
   var l = 1 >= t ? "*" : "**";
   e.before = e.before + l, e.after = l + e.after;
  }
 }, y.stripLinkDefs = function(e, n) {
  return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, t, o, i, r) {
   return n[t] = e.replace(/\s*$/, ""), i ? (n[t] = e.replace(/["(](.+?)[")]$/, ""), 
   i + r) : "";
  });
 }, y.addLinkDef = function(e, n) {
  var t = 0, o = {};
  e.before = this.stripLinkDefs(e.before, o), e.selection = this.stripLinkDefs(e.selection, o), 
  e.after = this.stripLinkDefs(e.after, o);
  var i = "", r = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, a = function(e) {
   t++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + t + "]:"), i += "\n" + e;
  }, s = function(e, n, i, l, c, d) {
   return i = i.replace(r, s), o[c] ? (a(o[c]), n + i + l + t + d) : e;
  };
  e.before = e.before.replace(r, s), n ? a(n) : e.selection = e.selection.replace(r, s);
  var l = t;
  return e.after = e.after.replace(r, s), e.after && (e.after = e.after.replace(/\n*$/, "")), 
  e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + i, 
  l;
 }, y.doLinkOrImage = function(e, n, t) {
  e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
  var o;
  if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
   if (e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "", 
   /\n\n/.test(e.selection)) return this.addLinkDef(e, null), void 0;
   var i = this, r = function(r) {
    if (o.parentNode.removeChild(o), null !== r) {
     e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
     var a = " [999]: " + s(r), l = i.addLinkDef(e, a);
     e.startTag = t ? "![" : "[", e.endTag = "][" + l + "]", e.selection || (e.selection = t ? i.getString("imagedescription") : i.getString("linkdescription"));
    }
    n();
   };
   return o = d.createBackground(), t ? this.hooks.insertImageDialog(r) || d.prompt(this.getString("imagedialog"), b, r) : this.hooks.insertLinkDialog(r) || d.prompt(this.getString("linkdialog"), v, r), 
   !0;
  }
  e.startTag = e.startTag.replace(/!?\[/, ""), e.endTag = "", this.addLinkDef(e, null);
 }, y.doAutoindent = function(e) {
  var n = this, t = !1;
  e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), 
  e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), e.selection || /^[ \t]*(?:\n|$)/.test(e.after) || (e.after = e.after.replace(/^[^\n]*/, function(n) {
   return e.selection = n, "";
  }), t = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && n.doList && n.doList(e), 
  /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && n.doBlockquote && n.doBlockquote(e), 
  /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && n.doCode && n.doCode(e), t && (e.after = e.selection + e.after, 
  e.selection = "");
 }, y.doBlockquote = function(e) {
  e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(n, t, o, i) {
   return e.before += t, e.after = i + e.after, o;
  }), e.before = e.before.replace(/(>[ \t]*)$/, function(n, t) {
   return e.selection = t + e.selection, "";
  }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
  var n, t = "", o = "";
  if (e.before) {
   for (var i = e.before.replace(/\n$/, "").split("\n"), r = !1, a = 0; a < i.length; a++) {
    var s = !1;
    n = i[a], r = r && n.length > 0, /^>/.test(n) ? (s = !0, !r && n.length > 1 && (r = !0)) : s = /^[ \t]*$/.test(n) ? !0 : r, 
    s ? t += n + "\n" : (o += t + n, t = "\n");
   }
   /(^|\n)>/.test(t) || (o += t, t = "");
  }
  e.startTag = t, e.before = o, e.after && (e.after = e.after.replace(/^\n?/, "\n")), 
  e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(n) {
   return e.endTag = n, "";
  });
  var l = function(n) {
   var t = n ? "> " : "";
   e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function(e, n) {
    return "\n" + n.replace(/^[ ]{0,3}>?[ \t]*$/gm, t) + "\n";
   })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function(e, n) {
    return "\n" + n.replace(/^[ ]{0,3}>?[ \t]*$/gm, t) + "\n";
   }));
  };
  /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, h.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), 
  l(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), 
  this.unwrap(e), l(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), 
  !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), 
  e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function(n, t) {
   return e.startTag += t, "";
  }));
 }, y.doCode = function(e) {
  var n = /\S[ ]*$/.test(e.before), t = /^[ ]*\S/.test(e.after);
  if (!t && !n || /\n/.test(e.selection)) {
   e.before = e.before.replace(/[ ]{4}$/, function(n) {
    return e.selection = n + e.selection, "";
   });
   var o = 1, i = 1;
   /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (o = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (i = 0), 
   e.skipLines(o, i), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", 
   e.selection = this.getString("codeexample"));
  } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, 
  e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")));
 }, y.doList = function(e, n, t) {
  var o = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, i = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, r = "-", a = 1, s = function() {
   var e;
   return t ? (e = " " + a + ". ", a++) : e = " " + r + " ", e;
  }, l = function(e) {
   return void 0 === t && (t = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
    return s();
   });
  };
  if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, 
  e.startTag = ""), e.startTag) {
   var c = /\d+[.]/.test(e.startTag);
   if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), 
   e.skipLines(), c && (e.after = e.after.replace(i, l)), t == c) return;
  }
  var d = 1;
  e.before = e.before.replace(o, function(e) {
   return /^\s*([*+-])/.test(e) && (r = p.$1), d = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, 
   l(e);
  }), e.selection || (e.selection = this.getString("litem"));
  var u = s(), f = 1;
  e.after = e.after.replace(i, function(e) {
   return f = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e);
  }), e.trimWhitespace(!0), e.skipLines(d, f, !0), e.startTag = u;
  var g = u.replace(/./g, " ");
  this.wrap(e, h.lineLength - g.length), e.selection = e.selection.replace(/\n/g, "\n" + g);
 }, y.doHeading = function(e) {
  if (e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, ""), 
  !e.selection) return e.startTag = "## ", e.selection = this.getString("headingexample"), 
  e.endTag = " ##", void 0;
  var n = 0;
  e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (n = p.lastMatch.length), 
  e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (n = 1), 
  /-+/.test(e.endTag) && (n = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
  var t = 0 == n ? 2 : n - 1;
  if (t > 0) {
   var o = t >= 2 ? "-" : "=", i = e.selection.length;
   for (i > h.lineLength && (i = h.lineLength), e.endTag = "\n"; i--; ) e.endTag += o;
  }
 }, y.doHorizontalRule = function(e) {
  e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0);
 };
}(), define("libs/Markdown.Editor", function() {}), define("core", [ "jquery", "underscore", "utils", "settings", "eventMgr", "mousetrap", "text!html/bodyIndex.html", "text!html/bodyViewer.html", "text!html/settingsTemplateTooltip.html", "text!html/settingsUserCustomExtensionTooltip.html", "storage", "config", "libs/layout", "libs/Markdown.Editor" ], function(e, n, t, o, i, r, a, s, l, c) {
 function d() {
  x = !0, w = !0;
  var e = t.currentTime;
  e > C + 1e3 && (C = e, i.onUserActive());
 }
 function u() {
  return w === !0 && t.currentTime - C > USER_IDLE_THRESHOLD && (w = !1), w && k;
 }
 function p() {
  if (x !== !1 && k !== !1) {
   void 0 === S && (S = t.randomString(), localStorage.frontWindowId = S);
   var n = localStorage.frontWindowId;
   n != S && (k = !1, void 0 !== y && clearInterval(y), e(".modal").modal("hide"), 
   e("#modal-non-unique").modal({
    backdrop: "static",
    keyboard: !1
   }));
  }
 }
 function f() {
  T === !0 && (T = !1, i.onOfflineChanged(!1));
 }
 function h() {
  T === !0 && navigator.onLine === !0 && E + CHECK_ONLINE_PERIOD < t.currentTime && (E = t.currentTime, 
  e.ajax({
   url: "//www.google.com/jsapi",
   timeout: AJAX_TIMEOUT,
   dataType: "script"
  }).done(function() {
   f();
  }));
 }
 function g() {
  t.setInputRadio("radio-layout-orientation", o.layoutOrientation), t.setInputValue("#input-settings-theme", localStorage.theme), 
  t.setInputChecked("#input-settings-lazy-rendering", o.lazyRendering), t.setInputValue("#input-settings-editor-font-family", o.editorFontFamily), 
  t.setInputValue("#input-settings-editor-font-size", o.editorFontSize), t.setInputValue("#textarea-settings-default-content", o.defaultContent), 
  t.setInputValue("#input-settings-publish-commit-msg", o.commitMsg), t.setInputValue("#textarea-settings-publish-template", o.template), 
  t.setInputValue("#input-settings-ssh-proxy", o.sshProxy), i.onLoadSettings();
 }
 function m(n) {
  var r = {};
  r.layoutOrientation = t.getInputRadio("radio-layout-orientation");
  var a = t.getInputValue("#input-settings-theme");
  r.lazyRendering = t.getInputChecked("#input-settings-lazy-rendering"), r.editorFontFamily = t.getInputTextValue("#input-settings-editor-font-family", n), 
  r.editorFontSize = t.getInputIntValue("#input-settings-editor-font-size", n, 1, 99), 
  r.defaultContent = t.getInputValue("#textarea-settings-default-content"), r.commitMsg = t.getInputTextValue("#input-settings-publish-commit-msg", n), 
  r.template = t.getInputTextValue("#textarea-settings-publish-template", n), r.sshProxy = t.checkUrl(t.getInputTextValue("#input-settings-ssh-proxy", n), !0), 
  r.extensionSettings = {}, i.onSaveSettings(r.extensionSettings, n), n.isPropagationStopped() || (e.extend(o, r), 
  localStorage.settings = JSON.stringify(o), localStorage.theme = a);
 }
 function b() {
  if (viewerMode !== !0) {
   var n = {
    closable: !0,
    resizable: !1,
    slidable: !1,
    livePaneResizing: !0,
    enableCursorHotkey: !1,
    spacing_open: 15,
    spacing_closed: 15,
    togglerLength_open: 90,
    togglerLength_closed: 90,
    stateManagement__enabled: !1,
    center__minWidth: 200,
    center__minHeight: 200
   };
   i.onLayoutConfigure(n), "horizontal" == o.layoutOrientation ? (e(".ui-layout-south").remove(), 
   e(".preview-container").html('<div id="extension-preview-buttons"></div><div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
   _ = e("body").layout(e.extend(n, {
    east__resizable: !0,
    east__size: .5,
    east__minSize: 200
   }))) : "vertical" == o.layoutOrientation && (e(".ui-layout-east").remove(), e(".preview-container").html('<div id="extension-preview-buttons"></div><div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
   _ = e("body").layout(e.extend(n, {
    south__resizable: !0,
    south__size: .5,
    south__minSize: 200
   }))), e(".navbar").click(function() {
    _.allowOverflow("north");
   }), e(".ui-layout-toggler-north").addClass("btn btn-info").append(e("<b>").addClass("caret")), 
   e(".ui-layout-toggler-south").addClass("btn btn-info").append(e("<b>").addClass("caret")), 
   e(".ui-layout-toggler-east").addClass("btn btn-info").append(e("<b>").addClass("caret")), 
   i.onLayoutCreated(_);
  }
 }
 var v = {}, y = void 0, x = !1, w = !1, k = !0, C = 0, S = void 0, T = !1, E = t.currentTime;
 v.setOffline = function() {
  E = t.currentTime, T === !1 && (T = !0, i.onOfflineChanged(!0));
 };
 var _ = void 0, I = void 0, P = void 0, z = void 0;
 v.initEditor = function(r) {
  function a() {
   var e = l.val();
   void 0 !== z && z != e && (P.content = e, i.onContentChanged(P)), z = e;
  }
  void 0 !== P && i.onFileClosed(P), P = r, z = void 0;
  var s = P.content, l = e("#wmd-input");
  if (l.val(s), void 0 !== I) return I.undoManager.reinit(s, P.editorStart, P.editorEnd, P.editorScrollTop), 
  i.onFileOpen(P), I.refreshPreview(), void 0;
  var c = e(".preview-container");
  l.scroll(function() {
   void 0 !== z && (P.editorScrollTop = e(this).scrollTop());
  }), l.bind("keyup mouseup", function() {
   void 0 !== z && (P.editorStart = this.selectionStart, P.editorEnd = this.selectionEnd);
  }), c.scroll(function() {
   void 0 !== z && (P.previewScrollTop = e(this).scrollTop());
  });
  var d = new Markdown.Converter();
  d.hooks.chain("preConversion", function(e) {
   i.previewStartTime = new Date();
   var n = e + "\n\n", t = [], o = 0;
   return n.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(e, i, r) {
    return i && (t.push(n.substring(o, r)), o = r), "";
   }), t.push(n.substring(o, e.length)), i.onSectionsCreated(t), e;
  }), I = new Markdown.Editor(d), I.hooks.set("insertLinkDialog", function(n) {
   return v.insertLinkCallback = n, t.resetModalInputs(), e("#modal-insert-link").modal(), 
   !0;
  }), I.hooks.set("insertImageDialog", function(n) {
   return v.insertLinkCallback = n, v.catchModal ? !0 : (t.resetModalInputs(), e("#modal-insert-image").modal(), 
   !0);
  });
  var u;
  u = o.lazyRendering === !0 ? function(e) {
   var t = n.debounce(e, 500);
   return function() {
    void 0 === z ? (e(), l.scrollTop(P.editorScrollTop), c.scrollTop(P.previewScrollTop)) : t(), 
    a();
   };
  } : function(e) {
   return function() {
    e(), void 0 === z && c.scrollTop(P.previewScrollTop), a();
   };
  }, i.onEditorConfigure(I), I.hooks.chain("onPreviewRefresh", i.onAsyncPreview), 
  I.run(u), I.undoManager.reinit(s, P.editorStart, P.editorEnd, P.editorScrollTop), 
  e(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)").addClass("btn btn-default").css("left", 0).find("span").hide(), 
  e("#wmd-bold-button").append(e('<i class="icon-bold">')), e("#wmd-italic-button").append(e('<i class="icon-italic">')), 
  e("#wmd-link-button").append(e('<i class="icon-globe">')), e("#wmd-quote-button").append(e('<i class="icon-indent-right">')), 
  e("#wmd-code-button").append(e('<i class="icon-code">')), e("#wmd-image-button").append(e('<i class="icon-picture">')), 
  e("#wmd-olist-button").append(e('<i class="icon-list-numbered">')), e("#wmd-ulist-button").append(e('<i class="icon-list-bullet">')), 
  e("#wmd-heading-button").append(e('<i class="icon-text-height">')), e("#wmd-hr-button").append(e('<i class="icon-ellipsis">')), 
  e("#wmd-undo-button").append(e('<i class="icon-reply">')), e("#wmd-redo-button").append(e('<i class="icon-forward">')), 
  i.onFileOpen(P);
 };
 var $ = !1;
 return v.lockUI = function(n) {
  $ = n, e("#wmd-input").prop("disabled", $), e(".navbar-inner .btn").toggleClass("blocked", $), 
  $ ? e(".lock-ui").removeClass("hide") : e(".lock-ui").addClass("hide");
 }, v.onReady = function() {
  viewerMode === !0 ? e("body").html(s) : e("body").html(a), e(window).on("offline", v.setOffline), 
  e(window).on("online", f), navigator.onLine === !1 && v.setOffline(), e(document).mousemove(d).keypress(d), 
  e(".dropdown-submenu > a").click(function(e) {
   e.stopPropagation();
  });
  var l = void 0;
  e(".modal").on("shown", function() {
   var t = e(this).attr("id");
   l != t && (l = t, n.defer(function(e) {
    e.find("input:enabled:visible:first").focus();
   }, e(this)));
  }).on("hidden", function() {
   var n = e(this).attr("id");
   l == n && e(this).is(":hidden") && (l = void 0, e("#wmd-input").focus());
  }).keyup(function(n) {
   13 != n.which || e(n.target).is("textarea") || e(this).find(".modal-footer a:last").click();
  }), r.stopCallback = function(n, t) {
   return $ || l || e(t).is("input, select, textarea:not(#wmd-input)");
  }, b(), e("#wmd-input, #md-section-helper").css({
   "font-family": o.editorFontFamily,
   "font-size": o.editorFontSize + "px",
   "line-height": Math.round(o.editorFontSize * (20 / 14)) + "px"
  }), e("#wmd-input").keydown(function(n) {
   if (9 === n.keyCode) {
    var t = e(this).val(), o = this.selectionStart, i = this.selectionEnd;
    if (void 0 === o || void 0 === i) return;
    e(this).val(t.substring(0, o) + "	" + t.substring(i)), this.selectionStart = this.selectionEnd = o + 1, 
    n.preventDefault();
   }
  }), y = window.setInterval(function() {
   t.updateCurrentTime(), p(), (u() === !0 || viewerMode === !0) && (i.onPeriodicRun(), 
   h());
  }, 1e3), i.onReady();
 }, i.addListener("onReady", function() {
  var r = n.reduce(THEME_LIST, function(e, n, t) {
   return e + '<option value="' + t + '">' + n + "</option>";
  }, "");
  e("#input-settings-theme").html(r), e(".action-insert-link").click(function(n) {
   var o = t.getInputTextValue(e("#input-insert-link"), n);
   void 0 !== o && (v.insertLinkCallback(o), v.insertLinkCallback = void 0);
  }), e(".action-insert-image").click(function(n) {
   var o = t.getInputTextValue(e("#input-insert-image"), n);
   void 0 !== o && (v.insertLinkCallback(o), v.insertLinkCallback = void 0);
  }), e("#modal-insert-link, #modal-insert-image").on("hidden", function() {
   void 0 !== v.insertLinkCallback && (v.insertLinkCallback(null), v.insertLinkCallback = void 0);
  }), e(".action-load-settings").click(function() {
   g();
  }), e(".action-apply-settings").click(function(e) {
   m(e), e.isPropagationStopped() || window.location.reload();
  }), e(".action-import-settings").click(function() {
   e("#input-file-import-settings").click();
  }), e("#input-file-import-settings").change(function(t) {
   var o = (t.dataTransfer || t.target).files;
   e("#modal-settings").modal("hide"), n.each(o, function(e) {
    var n = new FileReader();
    n.onload = function(e) {
     return function(n) {
      var t = n.target.result;
      try {
       JSON.parse(t);
      } catch (n) {
       return i.onError(e.name + " is not a valid JSON file."), void 0;
      }
      localStorage.settings = t, window.location.reload();
     };
    }(e);
    var t = e.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
    n.readAsText(t);
   });
  }), e(".action-export-settings").click(function() {
   t.saveAs(JSON.stringify(o), "StackEdit Settings.json");
  }), e(".action-default-settings").click(function() {
   localStorage.removeItem("settings"), localStorage.removeItem("theme"), window.location.reload();
  }), e(".action-app-reset").click(function() {
   localStorage.clear(), window.location.reload();
  }), e(".action-reset-input").click(function() {
   t.resetModalInputs();
  }), e(".tooltip-lazy-rendering").tooltip({
   container: "#modal-settings",
   placement: "right",
   trigger: "hover",
   title: "Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity."
  }), e(".tooltip-default-content").tooltip({
   html: !0,
   container: "#modal-settings",
   placement: "right",
   trigger: "hover",
   title: "Thanks for supporting StackEdit by adding a backlink in your documents!"
  }), e(".tooltip-usercustom-extension").tooltip({
   html: !0,
   container: "#modal-settings",
   placement: "right",
   trigger: "manual",
   title: c
  }).click(function(n) {
   e(this).tooltip("show"), e(document).on("click.tooltip-usercustom-extension", function() {
    e(".tooltip-usercustom-extension").tooltip("hide"), e(document).off("click.tooltip-usercustom-extension");
   }), n.stopPropagation();
  }), e(".tooltip-template").tooltip({
   html: !0,
   container: "#modal-settings",
   placement: "right",
   trigger: "manual",
   title: l
  }).click(function(n) {
   e(this).tooltip("show"), e(document).on("click.tooltip-template", function() {
    e(".tooltip-template").tooltip("hide"), e(document).off("click.tooltip-template");
   }), n.stopPropagation();
  }), e("div.dropdown-menu").click(function(e) {
   e.stopPropagation();
  });
 }), v;
}), define("text!../WELCOME.md", [], function() {
 return '\nWelcome to StackEdit!	{#welcome}\n=====================\n\n\nHello, I am your first Markdown document within **StackEdit**[^stackedit]. Don\'t delete me, I can be helpful. I can be recovered anyway in the `Utils` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n----------\n\n\nDocuments\n---------\n\n**StackEdit** stores your documents in the browser local storage, which means all your documents are automatically saved locally and are accessible offline.\n\n#### <i class="icon-file"></i> Create a document\n\nYou can create a new document by clicking the <i class="icon-file"></i> button in the navigation bar. This will switch from the current document to the new one.\n\n#### <i class="icon-folder-open"></i> Switch to another document\n\nYou can list all your local documents and switch from one to another by clicking the <i class="icon-folder-open"></i> button in the navigation bar.\n\n#### <i class="icon-pencil"></i> Rename a document\n\nYou can rename the current document by clicking the document title in the navigation bar.\n\n#### <i class="icon-trash"></i> Delete a document\n\nYou can delete the current document by clicking the <i class="icon-trash"></i> button in the navigation bar.\n\n----------\n\n\nSynchronization\n---------------\n\n**StackEdit** can be combined with **Google Drive** and **Dropbox** to have your documents centralized in the *Cloud*. The synchronization mechanism will take care of uploading your modifications or downloading the latest version of your documents.\n\n#### <i class="icon-download"></i> Import a document\n\nYou can import a document from the *Cloud* by going to the <i class="icon-gdrive"></i> `Google Drive` or the <i class="icon-dropbox"></i> `Dropbox` sub-menu and by clicking `Import from...`. Once imported, your document will be automatically synchronized with the **Google Drive** / **Dropbox** file.\n\n#### <i class="icon-upload"></i> Export a document\n\nYou can export any document by going to the <i class="icon-gdrive"></i> `Google Drive` or the <i class="icon-dropbox"></i> `Dropbox` sub-menu and by clicking `Export to...`. Even if your document is already synchronized with **Google Drive** or **Dropbox**, you can export it to a another location. **StackEdit** can synchronize one document with multiple locations.\n\n#### <i class="icon-refresh"></i> Synchronize a document\n\nOnce your document is linked to a **Google Drive** or a **Dropbox** file, **StackEdit** will periodically (every 3 minutes) synchronize it by downloading/uploading any modification. Any conflict will be detected, and a local copy of your document will be created as a backup if necessary.\n\nIf you just have modified your document and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-refresh"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document is not synchronized with any location,\n> - or the document has not been modified since the last synchronization.\n\n#### <i class="icon-refresh"></i> Manage document synchronization\n\nSince one document can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-refresh"></i> `Manage synchronization` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to add or remove synchronization links that are associated to your document.\n\n> **NOTE:** If you delete the file from **Google Drive** or from **Dropbox**, the document will no longer be synchronized with that location.\n\n----------\n\n\nPublication\n-----------\n\nOnce you are happy with your document, you can publish it on different websites directly from **StackEdit**. As for now, **StackEdit** can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any SSH server.\n\n#### <i class="icon-share"></i> Publish a document\n\nYou can publish your document by going to the <i class="icon-share"></i> `Publish on` sub-menu and by choosing a website. In the dialog box, you can choose the publication format:\n\n- Markdown, to publish the Markdown text on a website that can interpret it (**GitHub** for instance),\n- HTML, to publish the document converted into HTML (on a blog for instance),\n- Template, to have a full control of the output.\n\n> **NOTE:** The default template is a simple webpage that wraps your document in HTML format. You can customize it in the `Publish` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n#### <i class="icon-share"></i> Update a publication\n\nAfter publishing, **StackEdit** will keep your document linked to that publish location so that you can update it easily. Once you have modified your document and you want to update your publication, click on the <i class="icon-share"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-share"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document has not been published anywhere.\n\n#### <i class="icon-share"></i> Manage document publication\n\nSince one document can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-share"></i> `Manage publication` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to remove publication links that are associated to your document.\n\n> **NOTE:** In some cases, if you remove the file from the website or the post from the blog, the document will no longer be published on that location.\n\n----------\n\n\nMarkdown Extra\n--------------\n\n**StackEdit** supports **Markdown Extra**, which extends **Markdown** syntax with some nice features.\n\n\n### Tables\n\n**Markdown Extra** has a special syntax for tables:\n\nItem      | Value\n--------- | -----\nComputer  | \\$1600\nPhone     | \\$12\nPipe      | \\$1\n\nYou can specify column alignment with one or two colons:\n\n| Item      |  Value | Qty  |\n| :-------- | ------:| :--: |\n| Computer  | \\$1600 |  5   |\n| Phone     |   \\$12 |  12  |\n| Pipe      |    \\$1 | 234  |\n\n\n### Definition Lists\n\n**Markdown Extra** has a special syntax for definition lists too:\n\nTerm 1\nTerm 2\n:   Definition A\n:   Definition B\n\nTerm 3\n\n:   Definition C\n\n:   Definition D\n\n	> part of definition D\n\n\n### Fenced code blocks\n\n**GitHub**\'s fenced code blocks are also supported with **Prettify** syntax highlighting:\n\n```\n// Foo\nvar bar = 0;\n```\n\n> **NOTE:** To use **Highlight.js** instead of **Prettify**, just configure the `Markdown Extra` extension in the <i class="icon-cog"></i> `Settings` dialog.\n\n\n### Special Attributes\n\nWith **Markdown Extra**, you can specify `class` and `id` attributes on headers and fenced code blocks just like this:\n\n##### Header example {#my-header}\n\n``` {#my-id .my-class}\nvar foo = bar;\n```\n\nThen you can create cross-references like this: [beginning of the document](#welcome).\n\n\n### Footnotes\n\nYou can create footnotes like this[^footnote].\n\n  [^footnote]: Here is the *text* of the **footnote**.\n\n\n### Table of contents\n\nYou can insert a table of contents using the marker `[TOC]`:\n\n[TOC]\n\n\n### MathJax\n \nYou can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com][1]:\n\nThe *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall\nn\\in\\mathbb N$ is via through the Euler integral\n\n$$\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\n$$\n\n\n> **NOTE:** You can find more information:\n>\n> - about **Markdown** syntax [here][2],\n> - about **Markdown Extra** extension [here][3],\n> - about **Prettify** syntax highlighting [here][4].\n> - about **Highlight.js** syntax highlighting [here][5].\n\n  [^stackedit]: StackEdit is a free, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.\n\n\n  [1]: http://math.stackexchange.com/\n  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"\n  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"\n  [4]: https://code.google.com/p/google-code-prettify/\n  [5]: http://softwaremaniacs.org/soft/highlight/en/';
}), define("fileMgr", [ "jquery", "underscore", "core", "utils", "settings", "eventMgr", "fileSystem", "classes/FileDescriptor", "text!../WELCOME.md" ], function(e, n, t, o, i, r, a, s, l) {
 var c = {};
 return c.currentFile = void 0, c.selectFile = function(o) {
  if (o = o || c.currentFile, void 0 === o) {
   var i = n.size(a);
   o = 0 === i ? c.createFile(WELCOME_DOCUMENT_TITLE, l) : n.max(a, function(e) {
    return e.selectTime || 0;
   });
  }
  c.currentFile !== o && (c.currentFile = o, o.selectTime = new Date().getTime(), 
  r.onFileSelected(o), o.fileIndex == TEMPORARY_FILE_INDEX ? e(".action-edit-document").removeClass("hide") : e(".action-edit-document").addClass("hide")), 
  t.initEditor(o);
 }, c.createFile = function(e, t, l, c) {
  if (t = void 0 !== t ? t : i.defaultContent, !e) {
   e = DEFAULT_FILE_TITLE;
   for (var d = 2; n.some(a, function(n) {
    return n.title == e;
   }); ) e = DEFAULT_FILE_TITLE + d++;
  }
  var u = TEMPORARY_FILE_INDEX;
  if (!c) do u = "file." + o.randomString(); while (n.has(a, u));
  l = l || {};
  var p = n.reduce(l, function(e, n) {
   return o.storeAttributes(n), e + n.syncIndex + ";";
  }, ";");
  localStorage[u + ".title"] = e, localStorage[u + ".content"] = t, localStorage[u + ".sync"] = p, 
  localStorage[u + ".publish"] = ";";
  var f = new s(u, e, l);
  return c || (o.appendIndexToArray("file.list", u), a[u] = f, r.onFileCreated(f)), 
  f;
 }, c.deleteFile = function(e) {
  e = e || c.currentFile, o.removeIndexFromArray("file.list", e.fileIndex), delete a[e.fileIndex], 
  c.currentFile === e && (c.currentFile = void 0, c.selectFile()), n.each(e.syncLocations, function(e) {
   localStorage.removeItem(e.syncIndex);
  }), n.each(e.publishLocations, function(e) {
   localStorage.removeItem(e.publishIndex);
  }), localStorage.removeItem(e.fileIndex + ".title"), localStorage.removeItem(e.fileIndex + ".content"), 
  localStorage.removeItem(e.fileIndex + ".sync"), localStorage.removeItem(e.fileIndex + ".publish"), 
  r.onFileDeleted(e);
 }, c.getFileFromSyncIndex = function(e) {
  return n.find(a, function(t) {
   return n.has(t.syncLocations, e);
  });
 }, c.getSyncAttributes = function(e) {
  var n = c.getFileFromSyncIndex(e);
  return n && n.syncLocations[e];
 }, c.getFileFromPublishIndex = function(e) {
  return n.find(a, function(t) {
   return n.has(t.publishLocations, e);
  });
 }, r.addListener("onReady", function() {
  function t(n) {
   n.hide(), e("#file-title").show();
   var t = e.trim(n.val()), o = c.currentFile;
   t && t != o.title && (o.title = t, r.onTitleChanged(o)), n.val(o.title), e("#wmd-input").focus();
  }
  c.selectFile(), e(".action-create-file").click(function() {
   var n = c.createFile();
   c.selectFile(n);
   var t = e("#wmd-input").focus().get(0);
   t.setSelectionRange && t.setSelectionRange(0, 0), e("#file-title").click();
  }), e(".action-remove-file").click(function() {
   c.deleteFile();
  }), e("#file-title").click(function() {
   if (viewerMode !== !0) {
    e(this).hide();
    var t = e("#file-title-input").show();
    n.defer(function() {
     t.focus().get(0).select();
    });
   }
  }), e("#file-title-input").blur(function() {
   t(e(this));
  }).keyup(function(n) {
   13 == n.keyCode && t(e(this)), 27 == n.keyCode && (e(this).val(""), t(e(this)));
  }), e(".action-open-stackedit").click(function() {
   window.location.href = ".";
  }), e(".action-edit-document").click(function() {
   var n = e("#wmd-input").val(), t = c.currentFile.title, o = c.createFile(t, n);
   c.selectFile(o), window.location.href = ".";
  }), e(".action-welcome-file").click(function() {
   var e = c.createFile(WELCOME_DOCUMENT_TITLE, l);
   c.selectFile(e);
  });
 }), r.onFileMgrCreated(c), c;
}), define("classes/Provider", [], function() {
 function e(e, n) {
  this.providerId = e, this.providerName = n;
 }
 return e;
}), define("classes/AsyncTask", [ "underscore", "utils", "eventMgr", "config", "libs/stacktrace" ], function(e, n, t) {
 function o() {
  this.finished = !1, this.timeout = ASYNC_TASK_DEFAULT_TIMEOUT, this.retryCounter = 0, 
  this.runCallbacks = [], this.successCallbacks = [], this.errorCallbacks = [];
 }
 function i() {
  u !== !1 && e.defer(function() {
   if (c === !0) return d + l.timeout < n.currentTime && l.error(new Error("A timeout occurred.")), 
   void 0;
   if (void 0 === l) {
    if (0 === a.length) return;
    l = a.shift(), d = n.currentTime, s === !1 && (s = !0, t.onAsyncRunning(!0));
   }
   d <= n.currentTime && (c = !0, l.chain());
  });
 }
 function r(n, o, r) {
  try {
   e.each(o, function(e) {
    e(r);
   });
  } finally {
   n.finished = !0, l === n && (l = void 0, c = !1), 0 === a.length ? (s = !1, t.onAsyncRunning(!1)) : i();
  }
 }
 var a = [];
 o.prototype.onRun = function(e) {
  this.runCallbacks.push(e);
 }, o.prototype.onSuccess = function(e) {
  this.successCallbacks.push(e);
 }, o.prototype.onError = function(e) {
  this.errorCallbacks.push(e);
 }, o.prototype.chain = function(e) {
  if (n.logStackTrace(), this.finished !== !0) {
   if (void 0 === this.queue && (this.queue = this.runCallbacks.slice()), void 0 !== e) return e(), 
   void 0;
   if (0 === this.queue.length) return r(this, this.successCallbacks), void 0;
   var t = this.queue.shift();
   t();
  }
 }, o.prototype.error = function(e) {
  if (n.logStackTrace(), this.finished !== !0) throw e = e || new Error("Unknown error"), 
  e.message && t.onError(e), r(this, this.errorCallbacks, e), e;
 }, o.prototype.retry = function(e, t) {
  if (this.finished !== !0) {
   if (t = t || 5, this.queue = void 0, this.retryCounter >= t) return this.error(e), 
   void 0;
   var o = 1e3 * Math.pow(2, this.retryCounter++);
   d = n.currentTime + o, c = !1, i();
  }
 }, o.prototype.enqueue = function() {
  a.push(this), i();
 };
 var s = !1, l = void 0, c = !1, d = 0, u = !1;
 return t.addListener("onUserActive", function() {
  u = !0;
 }), t.addListener("onPeriodicRun", i), o;
}), define("helpers/dropboxHelper", [ "jquery", "underscore", "core", "eventMgr", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(n) {
  n.onRun(function() {
   return p === !0 ? (c = void 0, n.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : void 0 !== c ? (n.chain(), void 0) : (e.ajax({
    url: "lib/dropbox.min.js",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    c = new Dropbox.Client({
     key: DROPBOX_APP_KEY,
     secret: DROPBOX_APP_SECRET
    }), c.authDriver(new Dropbox.Drivers.Popup({
     receiverUrl: BASE_URL + "dropbox-oauth-receiver.html",
     rememberUser: !0
    })), n.chain();
   }).fail(function(e) {
    var t = {
     status: e.status,
     responseText: e.statusText
    };
    s(t, n);
   }), void 0);
  });
 }
 function a(e) {
  e.onRun(function() {
   function n() {
    t === !1 && (o.onMessage("Please make sure the Dropbox authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), c.reset(), c.authenticate({
     interactive: !t
    }, function(o, i) {
     return i.authState === Dropbox.Client.DONE ? (d = !0, e.chain(), void 0) : t === !0 ? (t = !1, 
     e.chain(n), void 0) : (e.error(new Error("Access to Dropbox account is not authorized.")), 
     void 0);
    });
   }
   if (d === !0) return e.chain(), void 0;
   var t = !0;
   e.chain(n);
  });
 }
 function s(e, o) {
  var i = !0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Dropbox error (" + e.status + ": " + e.responseText + ").", 401 === e.status || 403 === e.status) return d = !1, 
   i = "Access to Dropbox account is not authorized.", o.retry(new Error(i), 1), void 0;
   if (400 === e.status && -1 !== e.responseText.indexOf("oauth_nonce")) return n.each(n.keys(localStorage), function(e) {
    0 === e.indexOf("dropbox-auth") && localStorage.removeItem(e);
   }), d = !1, o.retry(new Error(i), 1), void 0;
   e.status <= 0 && (c = void 0, d = !1, t.setOffline(), i = "|stopPublish");
  }
  o.error(new Error(i));
 }
 function l(n) {
  n.onRun(function() {
   return f === !0 ? (n.chain(), void 0) : (e.ajax({
    url: "https://www.dropbox.com/static/api/1/dropbox.js",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    f = !0, n.chain();
   }).fail(function(e) {
    var t = {
     status: e.status,
     responseText: e.statusText
    };
    s(t, n);
   }), void 0);
  });
 }
 var c = void 0, d = !1, u = {}, p = !1;
 o.addListener("onOfflineChanged", function(e) {
  p = e;
 }), u.upload = function(e, n, t) {
  var o = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   c.writeFile(e, n, function(n, t) {
    return n ? (400 === n.status && (n = 'Could not upload document into path "' + e + '".'), 
    s(n, l), void 0) : (o = t, l.chain(), void 0);
   });
  }), l.onSuccess(function() {
   t(void 0, o);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, u.checkChanges = function(e, n) {
  var t = [], o = e || 0, l = new i();
  r(l), a(l), l.onRun(function() {
   function e() {
    c.pullChanges(o, function(n, i) {
     return n ? (s(n, l), void 0) : (o = i.cursor(), void 0 !== i.changes && (t = t.concat(i.changes)), 
     i.shouldPullAgain ? l.chain(e) : l.chain(), void 0);
    });
   }
   l.chain(e);
  }), l.onSuccess(function() {
   n(void 0, t, o);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, u.downloadMetadata = function(e, n) {
  var t = [], o = new i();
  r(o), a(o), o.onRun(function() {
   function n() {
    if (0 === e.length) return o.chain(), void 0;
    var i = e[0];
    c.stat(i, function(i, r) {
     return r ? (t.push(r), e.shift(), o.chain(n), void 0) : (s(i, o), void 0);
    });
   }
   o.chain(n);
  }), o.onSuccess(function() {
   n(void 0, t);
  }), o.onError(function(e) {
   n(e);
  }), o.enqueue();
 }, u.downloadContent = function(e, n) {
  var t = [], o = new i();
  r(o), a(o), o.onRun(function() {
   function n() {
    if (0 === e.length) return o.chain(), void 0;
    var i = e[0];
    t.push(i);
    var r = void 0;
    return i.isFile === !0 ? r = i : void 0 !== i.wasRemoved && (r = i.stat), r ? (c.readFile(r.path, function(t, i) {
     return i ? (r.content = i, e.shift(), o.chain(n), void 0) : (s(t, o), void 0);
    }), void 0) : (e.shift(), o.chain(n), void 0);
   }
   o.chain(n);
  }), o.onSuccess(function() {
   n(void 0, t);
  }), o.onError(function(e) {
   n(e);
  }), o.enqueue();
 };
 var f = !1;
 return u.picker = function(e) {
  var n = [], t = new i();
  t.timeout = ASYNC_TASK_LONG_TIMEOUT, r(t), l(t), t.onRun(function() {
   var e = {};
   e.multiselect = !0, e.linkType = "direct", e.success = function(e) {
    for (var o = 0; o < e.length; o++) {
     var i = e[o].link;
     i = i.replace(/.*\/view\/[^\/]*/, ""), n.push(decodeURI(i));
    }
    t.chain();
   }, e.cancel = function() {
    t.chain();
   }, Dropbox.choose(e), o.onMessage("Please make sure the Dropbox chooser popup is not blocked by your browser.");
  }), t.onSuccess(function() {
   e(void 0, n);
  }), t.onError(function(n) {
   e(n);
  }), t.enqueue();
 }, u;
}), define("providers/dropboxProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "fileMgr", "helpers/dropboxHelper" ], function(e, n, t, o, i, r) {
 function a(e) {
  return void 0 === e ? void 0 : e.match(/^[^\\<>:"\|?\*]+$/) ? 0 !== e.indexOf("/") ? "/" + e : e : (o.onError('"' + e + '" contains invalid characters.'), 
  void 0);
 }
 function s(e) {
  return "sync." + u + "." + encodeURIComponent(e.toLowerCase());
 }
 function l(e, t, o) {
  var i = {};
  return i.provider = p, i.path = e, i.version = t, i.contentCRC = n.crc32(o), i.syncIndex = s(e), 
  i;
 }
 function c(n) {
  r.downloadMetadata(n, function(n, t) {
   n || r.downloadContent(t, function(n, t) {
    if (!n) {
     var r = [];
     e.each(t, function(e) {
      var n = l(e.path, e.versionTag, e.content), t = {};
      t[n.syncIndex] = n;
      var o = i.createFile(e.name, e.content, t);
      i.selectFile(o), r.push(o);
     }), 0 !== r.length && o.onSyncImportSuccess(r, p);
    }
   });
  });
 }
 function d(e, n, t, c) {
  if (e = a(e), void 0 === e) return c(!0), void 0;
  var d = s(e), u = i.getFileFromSyncIndex(d);
  if (void 0 !== u) {
   var p = u.title;
   return o.onError('File path is already synchronized with "' + p + '".'), c(!0), 
   void 0;
  }
  r.upload(e, t, function(e, n) {
   if (e) return c(e), void 0;
   var o = l(n.path, n.versionTag, t);
   c(void 0, o);
  });
 }
 var u = "dropbox", p = new t(u, "Dropbox");
 return p.defaultPublishFormat = "template", p.importFiles = function() {
  r.picker(function(n, t) {
   if (!n && 0 !== t.length) {
    var r = [];
    e.each(t, function(e) {
     var n = s(e), t = i.getFileFromSyncIndex(n);
     return void 0 !== t ? (o.onError('"' + t.title + '" was already imported.'), void 0) : (r.push(e), 
     void 0);
    }), c(r);
   }
  });
 }, p.exportFile = function(e, t, o, i) {
  var r = n.getInputTextValue("#input-sync-export-dropbox-path", e);
  d(r, t, o, i);
 }, p.exportManual = function(e, t, o, i) {
  var r = n.getInputTextValue("#input-sync-manual-dropbox-path", e);
  d(r, t, o, i);
 }, p.syncUp = function(e, n, t, o, i, a) {
  var s = i.contentCRC;
  return n == s ? (a(void 0, !1), void 0) : (r.upload(i.path, e, function(e, t) {
   return e ? (a(e, !0), void 0) : (i.version = t.versionTag, i.contentCRC = n, a(void 0, !0), 
   void 0);
  }), void 0);
 }, p.syncDown = function(t) {
  var a = localStorage[u + ".lastChangeId"];
  r.checkChanges(a, function(a, l, c) {
   if (a) return t(a), void 0;
   var d = [];
   e.each(l, function(e) {
    var n = s(e.path), t = i.getSyncAttributes(n);
    return void 0 !== t ? (e.syncAttributes = t, e.wasRemoved === !0 ? (d.push(e), void 0) : (t.version != e.stat.versionTag && d.push(e), 
    void 0)) : void 0;
   }), r.downloadContent(d, function(r, a) {
    return r ? (t(r), void 0) : (e.each(a, function(e) {
     var t = e.syncAttributes, r = t.syncIndex, a = i.getFileFromSyncIndex(r);
     if (void 0 !== a) {
      var s = a.title;
      if (e.wasRemoved === !0) return o.onError('"' + s + '" has been removed from Dropbox.'), 
      a.removeSyncLocation(t), o.onSyncRemoved(a, t), void 0;
      var l = a.content, c = t.contentCRC != n.crc32(l), d = e.stat, u = n.crc32(d.content), p = t.contentCRC != u, f = l != d.content;
      f === !0 && c === !0 && p === !0 && (i.createFile(s + " (backup)", l), o.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      f && p === !0 && (a.content = d.content, o.onContentChanged(a), o.onMessage('"' + s + '" has been updated from Dropbox.'), 
      i.currentFile === a && i.selectFile()), t.version = d.versionTag, t.contentCRC = u, 
      n.storeAttributes(t);
     }
    }), localStorage[u + ".lastChangeId"] = c, t(), void 0);
   });
  });
 }, p.publish = function(e, n, t, o) {
  var i = a(e.path);
  return void 0 === i ? (o(!0), void 0) : (r.upload(i, t, o), void 0);
 }, p.newPublishAttributes = function(e) {
  var t = {};
  return t.path = n.getInputTextValue("#input-publish-dropbox-path", e), e.isPropagationStopped() ? void 0 : t;
 }, p;
}), define("helpers/googleHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(n) {
  n.onRun(function() {
   return p === !0 ? (c = !1, n.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : c === !0 ? (n.chain(), void 0) : (delayedFunction = function() {
    gapi.load("client,drive-realtime", function() {
     c = !0, n.chain();
    });
   }, e.ajax({
    url: "https://apis.google.com/js/api.js?onload=runDelayedFunction",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    s(t, n);
   }), void 0);
  });
 }
 function a(e) {
  e.onRun(function() {
   function n() {
    t === !1 && (o.onMessage("Please make sure the Google authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), gapi.auth.authorize({
     client_id: GOOGLE_CLIENT_ID,
     scope: GOOGLE_SCOPES,
     immediate: t
    }, function(o) {
     gapi.client.load("drive", "v2", function() {
      return !o || o.error ? c === !0 && t === !0 ? (t = !1, e.chain(n), void 0) : (e.error(new Error("Access to Google account is not authorized.")), 
      void 0) : (d = !0, e.chain(), void 0);
     });
    });
   }
   if (d === !0) return e.chain(), void 0;
   var t = !0;
   e.chain(n);
  });
 }
 function s(e, t) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Google error (" + e.code + ": " + e.message + ").", e.code >= 500 && e.code < 600) return t.retry(new Error(o)), 
   void 0;
   if (401 === e.code || 403 === e.code || "token_refresh_required" == e.code) return d = !1, 
   o = "Access to Google account is not authorized.", t.retry(new Error(o), 1), void 0;
   (0 === e.code || -1 === e.code) && (c = !1, d = !1, n.setOffline(), o = "|stopPublish");
  }
  t.error(new Error(o));
 }
 function l(n) {
  n.onRun(function() {
   return f === !0 ? (n.chain(), void 0) : (e.ajax({
    url: "//www.google.com/jsapi",
    data: {
     key: GOOGLE_API_KEY
    },
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    google.load("picker", "1", {
     callback: function() {
      n.chain();
     }
    }), f = !0;
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    s(t, n);
   }), void 0);
  });
 }
 var c = !1, d = !1, u = {}, p = !1;
 o.addListener("onOfflineChanged", function(e) {
  p = e;
 }), u.forceAuthenticate = function() {
  d = !1;
  var e = new i();
  r(e), a(e), e.enqueue();
 }, u.upload = function(e, n, o, l, c, d) {
  var u = void 0, p = new i();
  r(p), a(p), p.onRun(function() {
   var i = "-------314159265358979323846", r = "\r\n--" + i + "\r\n", a = "\r\n--" + i + "--", c = "text/x-markdown", d = {
    title: o,
    mimeType: c
   };
   void 0 !== n && (d.parents = [ {
    kind: "drive#fileLink",
    id: n
   } ]);
   var f = "/upload/drive/v2/files", h = "POST";
   void 0 !== e && (f += "/" + e, h = "PUT");
   var g = {
    "Content-Type": 'multipart/mixed; boundary="' + i + '"'
   }, m = t.encodeBase64(l), b = [ r, "Content-Type: application/json\r\n\r\n", JSON.stringify(d), r, "Content-Type: ", c, "\r\n", "Content-Transfer-Encoding: base64\r\n", "\r\n", m, a ].join(""), v = gapi.client.request({
    path: f,
    method: h,
    params: {
     uploadType: "multipart"
    },
    headers: g,
    body: b
   });
   v.execute(function(n) {
    if (n && n.id) return u = n, u.content = l, p.chain(), void 0;
    var t = n.error;
    void 0 !== t && void 0 !== e && (404 === t.code ? t = 'File ID "' + e + '" not found on Google Drive.|removePublish' : 412 === t.code && (localStorage.removeItem("gdrive.lastChangeId"), 
    t = 'Conflict on file ID "' + e + '". Please restart the synchronization.')), s(t, p);
   });
  }), p.onSuccess(function() {
   d(void 0, u);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, u.createRealtimeFile = function(e, n, t) {
  var o = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   var t = {
    title: n,
    mimeType: "application/vnd.google-apps.drive-sdk"
   };
   void 0 !== e && (t.parents = [ {
    kind: "drive#fileLink",
    id: e
   } ]);
   var i = gapi.client.drive.files.insert({
    resource: t
   });
   i.execute(function(e) {
    return e && e.id ? (o = e, l.chain(), void 0) : (s(e.error, l), void 0);
   });
  }), l.onSuccess(function() {
   t(void 0, o);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, u.uploadImg = function(n, t, o, l) {
  var c = void 0, d = new i();
  r(d), a(d), d.onRun(function() {
   var i = {
    Slug: n
   };
   n.match(/.jpe?g$/) ? i["Content-Type"] = "image/jpeg" : n.match(/.png$/) ? i["Content-Type"] = "image/png" : n.match(/.gif$/) && (i["Content-Type"] = "image/gif");
   var r = gapi.auth.getToken();
   r && (i.Authorization = "Bearer " + r.access_token), e.ajax({
    url: PICASA_PROXY_URL + "upload/" + o,
    headers: i,
    data: t,
    processData: !1,
    dataType: "xml",
    timeout: AJAX_TIMEOUT,
    type: "POST"
   }).done(function(e) {
    c = e, d.chain();
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    200 == n.code && (n.message = e.responseText), s(n, d);
   });
  }), d.onSuccess(function() {
   l(void 0, c);
  }), d.onError(function(e) {
   l(e);
  }), d.enqueue();
 }, u.checkChanges = function(e, n) {
  var t = [], o = e || 0, l = new i();
  r(l), a(l), l.onRun(function() {
   function e() {
    var i = void 0;
    i = void 0 === n ? gapi.client.drive.changes.list({
     startChangeId: o + 1
    }) : gapi.client.drive.changes.list({
     pageToken: n
    }), i.execute(function(i) {
     return i && i.largestChangeId ? (o = i.largestChangeId, n = i.nextPageToken, void 0 !== i.items && (t = t.concat(i.items)), 
     void 0 !== n ? l.chain(e) : l.chain(), void 0) : (s(i.error, l), void 0);
    });
   }
   var n = void 0;
   l.chain(e);
  }), l.onSuccess(function() {
   n(void 0, t, o);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, u.downloadMetadata = function(n, t, o) {
  var l = [], c = new i();
  r(c), o || a(c), c.onRun(function() {
   function t() {
    if (0 === n.length) return c.chain(), void 0;
    var o = n[0], i = {}, r = gapi.auth.getToken();
    r && (i.Authorization = "Bearer " + r.access_token), e.ajax({
     url: "https://www.googleapis.com/drive/v2/files/" + o,
     headers: i,
     data: {
      key: GOOGLE_API_KEY
     },
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     l.push(e), n.shift(), c.chain(t);
    }).fail(function(e) {
     var n = {
      code: e.status,
      message: e.statusText
     };
     404 === n.code && (n = 'File ID "' + o + '" not found on Google Drive.'), s(n, c);
    });
   }
   c.chain(t);
  }), c.onSuccess(function() {
   t(void 0, l);
  }), c.onError(function(e) {
   t(e);
  }), c.enqueue();
 }, u.downloadContent = function(n, t, o) {
  var l = [], c = new i();
  c.timeout = ASYNC_TASK_LONG_TIMEOUT, r(c), o || a(c), c.onRun(function() {
   function t() {
    if (0 === n.length) return c.chain(), void 0;
    var o = n[0];
    l.push(o);
    var i = void 0;
    if ("drive#file" == o.kind ? i = o : "drive#change" == o.kind && (i = o.file), !i) return n.shift(), 
    c.chain(t), void 0;
    if (0 === i.mimeType.indexOf("application/vnd.google-apps.drive-sdk")) return i.content = "", 
    i.isRealtime = !0, n.shift(), c.chain(t), void 0;
    var r = {}, a = gapi.auth.getToken();
    a && (r.Authorization = "Bearer " + a.access_token), e.ajax({
     url: i.downloadUrl,
     headers: r,
     data: {
      key: GOOGLE_API_KEY
     },
     dataType: "text",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     i.content = e, n.shift(), c.chain(t);
    }).fail(function(e) {
     var n = {
      code: e.status,
      message: e.statusText
     };
     s(n, c);
    });
   }
   c.chain(t);
  }), c.onSuccess(function() {
   t(void 0, l);
  }), c.onError(function(e) {
   t(e);
  }), c.enqueue();
 }, u.loadRealtime = function(e, n, t, o) {
  var s = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   gapi.drive.realtime.load(e, function(e) {
    s = e, l.chain();
   }, function(e) {
    var t = e.createString(n);
    e.getRoot().set("content", t);
   }, function(e) {
    o(e), l.error(new Error(e.message));
   });
  }), l.onSuccess(function() {
   t(void 0, s);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 };
 var f = !1;
 return u.picker = function(n, t) {
  function o() {
   void 0 !== s && (s.setVisible(!1), e(".modal-backdrop, .picker").remove());
  }
  var a = [], s = void 0, c = new i();
  r(c), l(c), c.onRun(function() {
   var n = new google.picker.PickerBuilder();
   if (n.setAppId(GOOGLE_DRIVE_APP_ID), t) n.addView(google.picker.ViewId.PHOTOS), 
   n.addView(google.picker.ViewId.PHOTO_UPLOAD); else {
    var i = new google.picker.View(google.picker.ViewId.DOCS);
    i.setMimeTypes([ "text/x-markdown", "text/plain", "application/octet-stream", "application/vnd.google-apps.drive-sdk." + GOOGLE_DRIVE_APP_ID ].join(",")), 
    n.enableFeature(google.picker.Feature.NAV_HIDDEN), n.enableFeature(google.picker.Feature.MULTISELECT_ENABLED), 
    n.addView(i);
   }
   n.setCallback(function(e) {
    (e.action == google.picker.Action.PICKED || e.action == google.picker.Action.CANCEL) && (e.action == google.picker.Action.PICKED && (a = e.docs), 
    o(), c.chain());
   }), s = n.build(), e("body").append(e("<div>").addClass("modal-backdrop").click(function() {
    o(), c.chain();
   })), s.setVisible(!0);
  }), c.onSuccess(function() {
   n(void 0, a);
  }), c.onError(function(e) {
   o(), n(e);
  }), c.enqueue();
 }, u.uploadBlogger = function(n, t, o, l, c, d, u) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   function i() {
    var n = "https://www.googleapis.com/blogger/v3/blogs/" + t + "/posts/", i = {
     kind: "blogger#post",
     blog: {
      id: t
     },
     labels: l,
     title: c,
     content: d
    }, r = "POST";
    void 0 !== o && (n += o, i.id = o, r = "PUT"), e.ajax({
     url: n,
     data: JSON.stringify(i),
     headers: a,
     type: r,
     contentType: "application/json",
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     o = e.id, p.chain();
    }).fail(function(e) {
     var n = {
      code: e.status,
      message: e.statusText
     };
     404 === n.code && void 0 !== o && (n = "Post " + o + " not found on Blogger.|removePublish"), 
     s(n, p);
    });
   }
   function r() {
    return void 0 !== t ? (p.chain(i), void 0) : (e.ajax({
     url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
     data: {
      url: n
     },
     headers: a,
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     t = e.id, p.chain(i);
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     404 === t.code && (t = 'Blog "' + n + '" not found on Blogger.|removePublish'), 
     s(t, p);
    }), void 0);
   }
   var a = {}, u = gapi.auth.getToken();
   u && (a.Authorization = "Bearer " + u.access_token), p.chain(r);
  }), p.onSuccess(function() {
   u(void 0, t, o);
  }), p.onError(function(e) {
   u(e);
  }), p.enqueue();
 }, u;
}), define("providers/gdriveProvider", [ "underscore", "utils", "classes/Provider", "settings", "eventMgr", "fileMgr", "helpers/googleHelper" ], function(e, n, t, o, i, r, a) {
 function s(e) {
  return "sync." + d + "." + e;
 }
 function l(e, t, o, i) {
  var r = {};
  return r.provider = u, r.id = e, r.etag = t, r.contentCRC = n.crc32(o), r.titleCRC = n.crc32(i), 
  r.syncIndex = s(e), r;
 }
 function c(n) {
  a.downloadMetadata(n, function(n, t) {
   n || a.downloadContent(t, function(n, t) {
    if (!n) {
     var o = [], a = void 0;
     e.each(t, function(e) {
      var n = l(e.id, e.etag, e.content, e.title);
      n.isRealtime = e.isRealtime;
      var t = {};
      t[n.syncIndex] = n, a = r.createFile(e.title, e.content, t), o.push(a);
     }), void 0 !== a && (i.onSyncImportSuccess(o, u), r.selectFile(a));
    }
   });
  });
 }
 var d = "gdrive", u = new t(d, "Google Drive");
 u.defaultPublishFormat = "template", u.exportPreferencesInputIds = [ "gdrive-parentid" ], 
 u.importFiles = function() {
  a.picker(function(n, t) {
   if (!n && 0 !== t.length) {
    var o = [];
    e.each(t, function(e) {
     var n = s(e.id), t = r.getFileFromSyncIndex(n);
     return void 0 !== t ? (i.onError('"' + t.title + '" was already imported.'), void 0) : (o.push(e.id), 
     void 0);
    }), c(o);
   }
  });
 }, u.exportFile = function(e, t, o, i) {
  var r = n.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.upload(void 0, r, t, o, void 0, function(e, n) {
   if (e) return i(e), void 0;
   var r = l(n.id, n.etag, o, t);
   i(void 0, r);
  });
 }, u.exportRealtimeFile = function(e, t, o, i) {
  var r = n.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.createRealtimeFile(r, t, function(e, n) {
   if (e) return i(e), void 0;
   var r = l(n.id, n.etag, o, t);
   i(void 0, r);
  });
 }, u.exportManual = function(e, t, o, c) {
  var d = n.getInputTextValue("#input-sync-manual-gdrive-id", e);
  if (d) {
   var u = s(d), p = r.getFileFromSyncIndex(u);
   return void 0 !== p ? (i.onError('File ID is already synchronized with "' + p.title + '".'), 
   c(!0), void 0) : (a.upload(d, void 0, t, o, void 0, function(e, n) {
    if (e) return c(e), void 0;
    var i = l(n.id, n.etag, o, t);
    c(void 0, i);
   }), void 0);
  }
 }, u.syncUp = function(e, n, t, o, i, r) {
  var s = i.contentCRC, l = i.titleCRC;
  return n == s && o == l ? (r(void 0, !1), void 0) : (a.upload(i.id, void 0, t, e, i.etag, function(e, t) {
   return e ? (r(e, !0), void 0) : (i.etag = t.etag, i.contentCRC = n, i.titleCRC = o, 
   r(void 0, !0), void 0);
  }), void 0);
 }, u.syncDown = function(t) {
  var o = parseInt(localStorage[d + ".lastChangeId"]);
  a.checkChanges(o, function(o, l, c) {
   if (o) return t(o), void 0;
   var p = [];
   e.each(l, function(e) {
    var n = s(e.fileId), t = r.getSyncAttributes(n);
    return void 0 !== t ? (e.syncAttributes = t, e.deleted === !0 ? (p.push(e), void 0) : (t.etag != e.file.etag && p.push(e), 
    void 0)) : void 0;
   }), a.downloadContent(p, function(o, a) {
    return o ? (t(o), void 0) : (e.each(a, function(e) {
     var t = e.syncAttributes, o = t.syncIndex, a = r.getFileFromSyncIndex(o);
     if (void 0 !== a) {
      var s = a.title;
      if (e.deleted === !0) return i.onError('"' + s + '" has been removed from Google Drive.'), 
      a.removeSyncLocation(t), i.onSyncRemoved(a, t), t.isRealtime === !0 && r.currentFile === a && u.stopRealtimeSync(), 
      void 0;
      var l = t.titleCRC != n.crc32(s), c = a.content, d = t.contentCRC != n.crc32(c), p = e.file, f = n.crc32(p.title), h = t.titleCRC != f, g = s != p.title, m = n.crc32(p.content), b = t.contentCRC != m, v = c != p.content;
      (g === !0 && l === !0 && h === !0 || !t.isRealtime && v === !0 && d === !0 && b === !0) && (r.createFile(s + " (backup)", c), 
      i.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      g && h === !0 && (a.title = p.title, i.onTitleChanged(a), i.onMessage('"' + s + '" has been renamed to "' + p.title + '" on Google Drive.')), 
      !t.isRealtime && v && b === !0 && (a.content = p.content, i.onContentChanged(a), 
      i.onMessage('"' + p.title + '" has been updated from Google Drive.'), r.currentFile === a && r.selectFile()), 
      t.etag = p.etag, t.isRealtime || (t.contentCRC = m), t.titleCRC = f, n.storeAttributes(t);
     }
    }), localStorage[d + ".lastChangeId"] = c, t(), void 0);
   });
  });
 }, u.publish = function(e, n, t, o) {
  a.upload(e.id, void 0, e.fileName || n, t, void 0, function(n, t) {
   return n ? (o(n), void 0) : (e.id = t.id, o(), void 0);
  });
 }, u.newPublishAttributes = function(e) {
  var t = {};
  return t.id = n.getInputTextValue("#input-publish-gdrive-fileid"), t.fileName = n.getInputTextValue("#input-publish-gdrive-filename"), 
  e.isPropagationStopped() ? void 0 : t;
 };
 var p = void 0;
 i.addListener("onEditorConfigure", function(e) {
  p = e;
 });
 var f = void 0, h = void 0, g = void 0, m = void 0;
 return u.startRealtimeSync = function(t, o) {
  a.loadRealtime(o.id, t.content, function(a, s) {
   function l() {
    o.contentCRC = n.crc32(b.getText()), n.storeAttributes(o);
   }
   function c(e) {
    e.isLocal === !1 && (logger.log("Google Drive realtime document updated from server"), 
    l(), v());
   }
   function d() {
    p.uiManager.setButtonState(p.uiManager.buttons.undo, u.canUndo), p.uiManager.setButtonState(p.uiManager.buttons.redo, u.canRedo);
   }
   if (!a && s) {
    if (r.currentFile !== t) return s.close(), void 0;
    logger.log("Starting Google Drive realtime synchronization"), f = s;
    var u = f.getModel(), b = u.getRoot().get("content"), v = e.debounce(p.refreshPreview, 100);
    b.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, c), b.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, c), 
    f.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
     e.isPending === !1 && e.isSaving === !1 && (logger.log("Google Drive realtime document successfully saved on server"), 
     l());
    });
    var y = t.content, x = o.contentCRC != n.crc32(y), w = b.getText(), k = n.crc32(w), C = o.contentCRC != k, S = y != w;
    S === !0 && x === !0 && (C === !0 ? (r.createFile(t.title + " (backup)", y), i.onMessage('Conflict detected on "' + t.title + '". A backup has been created locally.')) : b.setText(y)), 
    h = gapi.drive.realtime.databinding.bindString(b, $("#wmd-input")[0]), C === !0 && (logger.log("Google Drive realtime document updated from server"), 
    l(), v()), g = p.uiManager.buttons.undo.execute, m = p.uiManager.buttons.redo.execute, 
    p.uiManager.buttons.undo.execute = function() {
     u.canUndo && u.undo();
    }, p.uiManager.buttons.redo.execute = function() {
     u.canRedo && u.redo();
    }, u.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, d), 
    d();
   }
  }, function(e) {
   console.error(e), "token_refresh_required" == e.type ? a.forceAuthenticate() : "not_found" == e.type ? (i.onError('"' + t.title + '" has been removed from Google Drive.'), 
   t.removeSyncLocation(o), i.onSyncRemoved(t, o), u.stopRealtimeSync()) : e.isFatal && (i.onError("An error has forced real time synchronization to stop."), 
   u.stopRealtimeSync());
  });
 }, u.stopRealtimeSync = function() {
  logger.log("Stopping Google Drive realtime synchronization"), void 0 !== h && (h.unbind(), 
  h = void 0), void 0 !== f && (f.close(), f = void 0), p.uiManager.buttons.undo.execute = g, 
  p.uiManager.buttons.redo.execute = m, p.uiManager.setUndoRedoButtonStates();
 }, i.addListener("onReady", function() {
  var t = n.retrieveIgnoreError(d + ".state");
  if (void 0 !== t) if (localStorage.removeItem(d + ".state"), "create" == t.action) a.upload(void 0, t.folderId, GDRIVE_DEFAULT_FILE_TITLE, o.defaultContent, void 0, function(e, n) {
   if (!e) {
    var t = l(n.id, n.etag, n.content, n.title), o = {};
    o[t.syncIndex] = t;
    var a = r.createFile(n.title, n.content, o);
    r.selectFile(a), i.onMessage('"' + n.title + '" created successfully on Google Drive.');
   }
  }); else if ("open" == t.action) {
   var u = [];
   e.each(t.ids, function(e) {
    var n = s(e), t = r.getFileFromSyncIndex(n);
    void 0 !== t ? r.selectFile(t) : u.push(e);
   }), c(u);
  }
 }), u;
}), define("synchronizer", [ "jquery", "underscore", "utils", "eventMgr", "fileSystem", "fileMgr", "classes/Provider", "providers/dropboxProvider", "providers/gdriveProvider" ], function(e, n, t, o, i, r, a) {
 function s(e) {
  if (0 === v.length) return l(e), void 0;
  var n = v.pop();
  return n.isRealtime === !0 ? (s(e), void 0) : (n.provider.syncUp(y, x, w, k, n, function(o, i) {
   return i === !0 && (S = !0), o ? (e(o), void 0) : (i && t.storeAttributes(n), s(e), 
   void 0);
  }), void 0);
 }
 function l(e) {
  if (0 === C.length) return c(e), void 0;
  var o = C.pop();
  return v = n.values(o.syncLocations), 0 === v.length ? (l(e), void 0) : (y = o.content, 
  x = t.crc32(y), w = o.title, k = t.crc32(w), s(e), void 0);
 }
 function c(e) {
  S === !0 ? (S = !1, C = n.values(i), l(e)) : e();
 }
 function d(e) {
  if (0 === T.length) return e(), void 0;
  var n = T.pop();
  return m.hasSync(n) ? (n.syncDown(function(n) {
   return n ? (e(n), void 0) : (d(e), void 0);
  }), void 0) : (d(e), void 0);
 }
 function u(e) {
  T = n.values(b), d(e);
 }
 function p(e) {
  I = n.some(e.syncLocations, function(e) {
   return P = e, e.isRealtime;
  }) ? e : void 0, h();
 }
 function f(e) {
  e === !1 ? (z = !0, h()) : (m.tryStopRealtimeSync(), z = !1);
 }
 function h() {
  void 0 !== I && z === !0 && P.provider.startRealtimeSync(I, P);
 }
 function g(o) {
  t.resetModalInputs();
  var i = t.retrieveIgnoreError(o.providerId + ".exportPreferences");
  i && n.each(o.exportPreferencesInputIds, function(e) {
   t.setInputValue("#input-sync-export-" + e, i[e]);
  }), e("#modal-upload-" + o.providerId).modal();
 }
 var m = {}, b = n.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value();
 n.each(i, function(e) {
  n.each(t.retrieveIndexArray(e.fileIndex + ".sync"), function(n) {
   try {
    var i = JSON.parse(localStorage[n]);
    i.syncIndex = n;
    var r = b[i.provider];
    if (!r) throw new Error("Invalid provider ID: " + i.provider);
    i.provider = r, e.syncLocations[n] = i;
   } catch (a) {
    o.onError(a), t.removeIndexFromArray(e.fileIndex + ".sync", n), localStorage.removeItem(n);
   }
  });
 }), m.hasSync = function(e) {
  return n.some(i, function(t) {
   return n.some(t.syncLocations, function(n) {
    return void 0 === e || n.provider === e;
   });
  });
 };
 var v = [], y = void 0, x = void 0, w = void 0, k = void 0, C = [], S = !1, T = [], E = !1;
 o.addListener("onOfflineChanged", function(e) {
  E = e;
 });
 var _ = !1;
 m.sync = function() {
  function e(e) {
   return void 0 !== e ? (_ = !1, o.onSyncRunning(!1), !0) : !1;
  }
  return _ === !0 || E === !0 ? !1 : (_ = !0, o.onSyncRunning(!0), S = !0, u(function(n) {
   e(n) || c(function(n) {
    e(n) || (_ = !1, o.onSyncRunning(!1), o.onSyncSuccess());
   });
  }), !0);
 };
 var I = void 0, P = void 0, z = !0;
 return m.tryStopRealtimeSync = function() {
  void 0 !== I && z === !0 && P.provider.stopRealtimeSync();
 }, viewerMode === !1 && (o.addListener("onFileOpen", p), o.addListener("onFileClosed", m.tryStopRealtimeSync), 
 o.addListener("onOfflineChanged", f)), o.addListener("onReady", function() {
  n.each(b, function(i) {
   e(".action-sync-import-" + i.providerId).click(function(e) {
    i.importFiles(e);
   }), e(".action-sync-export-dialog-" + i.providerId).click(function() {
    g(i);
   }), e(".action-sync-export-" + i.providerId).click(function(a) {
    var s = t.getInputChecked("#input-sync-export-" + i.providerId + "-realtime"), l = r.currentFile;
    if (s) {
     if (n.size(l.syncLocations) > 0) return o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     i.exportRealtimeFile(a, l.title, l.content, function(e, n) {
      e || (n.isRealtime = !0, l.addSyncLocation(n), o.onSyncExportSuccess(l, n), I = l, 
      P = n, h());
     });
    } else {
     if (n.size(l.syncLocations) > 0 && n.first(n.values(l.syncLocations)).isRealtime) return o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     i.exportFile(a, l.title, l.content, function(e, n) {
      e || (l.addSyncLocation(n), o.onSyncExportSuccess(l, n));
     });
    }
    var c = {};
    n.each(i.exportPreferencesInputIds, function(n) {
     c[n] = e("#input-sync-export-" + n).val();
    }), localStorage[i.providerId + ".exportPreferences"] = JSON.stringify(c);
   }), e(".action-sync-manual-" + i.providerId).click(function(e) {
    var t = r.currentFile;
    return n.size(t.syncLocations) > 0 && n.first(n.values(t.syncLocations)).isRealtime ? (o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
    void 0) : (i.exportManual(e, t.title, t.content, function(e, n) {
     e || (t.addSyncLocation(n), o.onSyncExportSuccess(t, n));
    }), void 0);
   });
  });
 }), o.onSynchronizerCreated(m), m;
}), define("providers/downloadProvider", [ "jquery", "classes/Provider", "classes/AsyncTask" ], function(e, n, t) {
 var o = new n("download");
 return o.sharingAttributes = [ "url" ], o.importPublic = function(n, o) {
  var i = void 0, r = void 0, a = new t();
  a.onRun(function() {
   var t = n.url, o = t.lastIndexOf("/");
   return -1 === o ? (a.error(new Error("Invalid URL parameter.")), void 0) : (i = t.substring(o + 1), 
   e.ajax({
    url: DOWNLOAD_PROXY_URL + "download?url=" + t,
    type: "GET",
    dataType: "text",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    r = e, a.chain();
   }).fail(function() {
    a.error(new Error("Unable to access URL " + t));
   }), void 0);
  }), a.onSuccess(function() {
   o(void 0, i, r);
  }), a.onError(function(e) {
   o(e);
  }), a.enqueue();
 }, o;
}), define("helpers/githubHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(n) {
  n.onRun(function() {
   return u === !0 ? (l = !1, n.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : l === !0 ? (n.chain(), void 0) : (e.ajax({
    url: "lib/github.js",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    l = !0, n.chain();
   }).fail(function(e) {
    var t = {
     error: e.status,
     message: e.statusText
    };
    s(t, n);
   }), void 0);
  });
 }
 function a(n) {
  var i = void 0, r = void 0;
  n.onRun(function() {
   function a() {
    localStorage.removeItem("githubCode"), i = t.popupWindow("github-oauth-client.html?client_id=" + GITHUB_CLIENT_ID, "stackedit-github-oauth", 960, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, u = localStorage.githubCode, void 0 === u) return n.error(new Error(d)), 
      void 0;
      localStorage.removeItem("githubCode"), n.chain(s);
     }
    }, 500);
   }
   function s() {
    e.getJSON(GATEKEEPER_URL + "authenticate/" + u, function(e) {
     void 0 !== e.token ? (l = e.token, localStorage.githubToken = l, c = new Github({
      token: l,
      auth: "oauth"
     }), n.chain()) : n.error(new Error(d));
    });
   }
   if (void 0 !== c) return n.chain(), void 0;
   var l = localStorage.githubToken;
   if (void 0 !== l) return c = new Github({
    token: l,
    auth: "oauth"
   }), n.chain(), void 0;
   o.onMessage("Please make sure the Github authorization popup is not blocked by your browser.");
   var d = "Failed to retrieve a token from GitHub.";
   n.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var u = void 0;
   n.chain(a);
  }), n.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, t) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on GitHub.", 401 === e.error || 403 === e.error) return c = void 0, 
   localStorage.removeItem("githubToken"), o = "Access to GitHub account is not authorized.", 
   t.retry(new Error(o), 1), void 0;
   e.error <= 0 && (l = !1, c = void 0, n.setOffline(), o = "|stopPublish");
  }
  t.error(new Error(o));
 }
 var l = void 0, c = void 0, d = {}, u = !1;
 return o.addListener("onOfflineChanged", function(e) {
  u = e;
 }), d.upload = function(e, n, t, o, l, d, u) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   function i() {
    var e = c.getUser();
    e.show(void 0, function(e, t) {
     return e ? (s(e, p), void 0) : (n = t.login, p.chain(r), void 0);
    });
   }
   function r() {
    var i = c.getRepo(n, e);
    i.write(t, o, l, d, function(e) {
     return e ? (s(e, p), void 0) : (p.chain(), void 0);
    });
   }
   n ? p.chain(r) : p.chain(i);
  }), p.onSuccess(function() {
   u();
  }), p.onError(function(e) {
   u(e);
  }), p.enqueue();
 }, d.uploadGist = function(e, n, t, o, l, d) {
  var u = new i();
  r(u), a(u), u.onRun(function() {
   var i = c.getGist(e), r = {};
   r[n] = {
    content: l
   }, githubFunction = i.update, void 0 === e && (githubFunction = i.create), githubFunction({
    description: o,
    "public": t,
    files: r
   }, function(n, t) {
    return n ? (404 === n.error && void 0 !== e && (n = "Gist " + e + " not found on GitHub.|removePublish"), 
    s(n, u), void 0) : (e = t.id, u.chain(), void 0);
   });
  }), u.onSuccess(function() {
   d(void 0, e);
  }), u.onError(function(e) {
   d(e);
  }), u.enqueue();
 }, d.downloadGist = function(e, n, t) {
  var o = new i();
  r(o);
  var a = void 0, s = void 0;
  o.onRun(function() {
   var t = new Github({}), i = t.getGist(e);
   i.read(function(t, i) {
    if (t) return o.error(new Error("Error trying to access Gist " + e + ".")), void 0;
    a = i.description;
    var r = i.files[n];
    return void 0 === r ? (o.error(new Error("Gist " + e + ' does not contain "' + n + '".')), 
    void 0) : (s = r.content, o.chain(), void 0);
   });
  }), o.onSuccess(function() {
   t(void 0, a, s);
  }), o.onError(function(e) {
   t(e);
  }), o.enqueue();
 }, d;
}), define("providers/gistProvider", [ "utils", "classes/Provider", "helpers/githubHelper" ], function(e, n, t) {
 var o = new n("gist", "Gist");
 return o.sharingAttributes = [ "gistId", "filename" ], o.publish = function(e, n, o, i) {
  t.uploadGist(e.gistId, e.filename, e.isPublic, n, o, function(n, t) {
   return n ? (i(n), void 0) : (e.gistId = t, i(), void 0);
  });
 }, o.newPublishAttributes = function(n) {
  var t = {};
  return t.gistId = e.getInputTextValue("#input-publish-gist-id"), t.filename = e.getInputTextValue("#input-publish-filename", n), 
  t.isPublic = e.getInputChecked("#input-publish-gist-public"), n.isPropagationStopped() ? void 0 : t;
 }, o.importPublic = function(e, n) {
  t.downloadGist(e.gistId, e.filename, n);
 }, o;
}), define("sharing", [ "jquery", "underscore", "utils", "eventMgr", "fileMgr", "classes/AsyncTask", "classes/Provider", "providers/downloadProvider", "providers/gistProvider" ], function(e, n, t, o, i, r, a) {
 var s = {}, l = n.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value(), c = !1;
 return o.addListener("onOfflineChanged", function(e) {
  c = e;
 }), s.createLink = function(t, i) {
  function a() {
   i();
  }
  var s = l[t.provider.providerId];
  if (void 0 !== t.sharingLink || void 0 === s || "markdown" != t.format) return i(), 
  void 0;
  var d = new r(), u = void 0;
  d.onRun(function() {
   if (c === !0) return d.chain(), void 0;
   var i = [ MAIN_URL, "viewer.html?provider=", s.providerId ];
   n.each(s.sharingAttributes, function(e) {
    i.push("&"), i.push(e), i.push("="), i.push(encodeURIComponent(t[e]));
   }), i = i.join(""), e.getJSON("https://api-ssl.bitly.com/v3/shorten", {
    access_token: BITLY_ACCESS_TOKEN,
    longUrl: i
   }, function(e) {
    e.data ? (u = e.data.url, t.sharingLink = u) : (o.onError("An error occured while creating sharing link."), 
    t.sharingLink = i), d.chain();
   });
  }), d.onSuccess(a), d.onError(a), d.enqueue();
 }, o.addListener("onReady", function() {
  if (viewerMode !== !1) {
   var o = t.getURLParameter("provider");
   void 0 === o && (o = "download");
   var r = l[o];
   if (void 0 !== r) {
    var a = {};
    n.each(r.sharingAttributes, function(e) {
     var n = t.getURLParameter(e);
     return n ? (a[e] = n, void 0) : (a = void 0, void 0);
    }), void 0 !== a && (e("#preview-contents, #file-title").hide(), r.importPublic(a, function(n, t, o) {
     if (e("#preview-contents, #file-title").show(), !n) {
      var r = i.createFile(t, o, void 0, !0);
      i.selectFile(r);
     }
    }));
   }
  }
 }), s;
}), define("providers/bloggerProvider", [ "underscore", "utils", "classes/Provider", "helpers/googleHelper" ], function(e, n, t, o) {
 var i = new t("blogger", "Blogger");
 return i.defaultPublishFormat = "html", i.publishPreferencesInputIds = [ "blogger-url" ], 
 i.publish = function(e, n, t, i) {
  o.uploadBlogger(e.blogUrl, e.blogId, e.postId, e.labelList, n, t, function(n, t, o) {
   return n ? (i(n), void 0) : (e.blogId = t, e.postId = o, i(), void 0);
  });
 }, i.newPublishAttributes = function(t) {
  var o = {}, i = n.getInputTextValue("#input-publish-blogger-url", t);
  void 0 !== i && (o.blogUrl = n.checkUrl(i)), o.postId = n.getInputTextValue("#input-publish-postid"), 
  o.labelList = [];
  var r = n.getInputTextValue("#input-publish-labels");
  return void 0 !== r && (o.labelList = e.chain(r.split(",")).map(function(e) {
   return n.trim(e);
  }).compact().value()), t.isPropagationStopped() ? void 0 : o;
 }, i;
}), define("providers/githubProvider", [ "utils", "classes/Provider", "settings", "helpers/githubHelper" ], function(e, n, t, o) {
 var i = new n("github", "GitHub");
 return i.publishPreferencesInputIds = [ "github-reponame", "github-username", "github-branch" ], 
 i.publish = function(e, n, i, r) {
  var a = t.commitMsg;
  o.upload(e.repository, e.username, e.branch, e.path, i, a, r);
 }, i.newPublishAttributes = function(n) {
  var t = {};
  return t.repository = e.getInputTextValue("#input-publish-github-reponame", n), 
  t.username = e.getInputTextValue("#input-publish-github-username"), t.branch = e.getInputTextValue("#input-publish-github-branch", n), 
  t.path = e.getInputTextValue("#input-publish-file-path", n), n.isPropagationStopped() ? void 0 : t;
 }, i;
}), define("helpers/sshHelper", [ "jquery", "core", "eventMgr", "settings", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(e) {
  e.onRun(function() {
   return l === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(e, t) {
  var o = void 0;
  e && (logger.error(e), "string" == typeof e ? o = "SSH error: " + e + "." : (o = "Could not publish on SSH server.", 
  e.code <= 0 && (n.setOffline(), o = "|stopPublish"))), t.error(new Error(o));
 }
 var s = {}, l = !1;
 return t.addListener("onOfflineChanged", function(e) {
  l = e;
 }), s.upload = function(n, t, s, l, c, d, u, p) {
  var f = new i();
  r(f), f.onRun(function() {
   var i = o.sshProxy + "upload", r = {
    host: n,
    port: t,
    username: s,
    password: l,
    path: c,
    title: d,
    content: u
   };
   e.ajax({
    url: i,
    data: r,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    return void 0 === e.error ? (f.chain(), void 0) : (a(e.error, f), void 0);
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    a(n, f);
   });
  }), f.onSuccess(function() {
   p();
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, s;
}), define("providers/sshProvider", [ "utils", "classes/Provider", "helpers/sshHelper" ], function(e, n, t) {
 var o = new n("ssh", "SSH server");
 return o.publishPreferencesInputIds = [ "ssh-host", "ssh-port", "ssh-username", "ssh-password" ], 
 o.publish = function(e, n, o, i) {
  t.upload(e.host, e.port, e.username, e.password, e.path, n, o, i);
 }, o.newPublishAttributes = function(n) {
  var t = {};
  return t.host = e.getInputTextValue("#input-publish-ssh-host", n, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  t.port = e.getInputIntValue("#input-publish-ssh-port", void 0, 0), t.username = e.getInputTextValue("#input-publish-ssh-username", n), 
  t.password = e.getInputTextValue("#input-publish-ssh-password", n), t.path = e.getInputTextValue("#input-publish-file-path", n), 
  n.isPropagationStopped() ? void 0 : t;
 }, o;
}), define("helpers/tumblrHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(e) {
  e.onRun(function() {
   return d === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(n) {
  var i = void 0, r = void 0;
  n.onRun(function() {
   function a() {
    e.getJSON(TUMBLR_PROXY_URL + "request_token", function(e) {
     void 0 !== e.oauth_token ? (p = e, n.chain(s)) : n.error(new Error(u));
    });
   }
   function s() {
    localStorage.removeItem("tumblrVerifier"), i = t.popupWindow("tumblr-oauth-client.html?oauth_token=" + p.oauth_token, "stackedit-tumblr-oauth", 800, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, p.oauth_verifier = localStorage.tumblrVerifier, 
      void 0 === p.oauth_verifier) return n.error(new Error(u)), void 0;
      localStorage.removeItem("tumblrVerifier"), n.chain(c);
     }
    }, 500);
   }
   function c() {
    e.getJSON(TUMBLR_PROXY_URL + "access_token", p, function(e) {
     void 0 !== e.access_token && void 0 !== e.access_token_secret ? (localStorage.tumblrOauthParams = JSON.stringify(e), 
     l = e, n.chain()) : n.error(new Error(u));
    });
   }
   if (void 0 !== l) return n.chain(), void 0;
   var d = localStorage.tumblrOauthParams;
   if (void 0 !== d) return l = JSON.parse(d), n.chain(), void 0;
   o.onMessage("Please make sure the Tumblr authorization popup is not blocked by your browser.");
   var u = "Failed to retrieve a token from Tumblr.";
   n.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var p = void 0;
   n.chain(a);
  }), n.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, t) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on Tumblr.", 401 === e.code || 403 === e.code) return l = void 0, 
   localStorage.removeItem("tumblrOauthParams"), o = "Access to Tumblr account is not authorized.", 
   t.retry(new Error(o), 1), void 0;
   e.code <= 0 && (n.setOffline(), o = "|stopPublish");
  }
  t.error(new Error(o));
 }
 var l = void 0, c = {}, d = !1;
 return o.addListener("onOfflineChanged", function(e) {
  d = e;
 }), c.upload = function(n, t, o, c, d, u, p) {
  var f = new i();
  r(f), a(f), f.onRun(function() {
   var i = e.extend({
    blog_hostname: n,
    post_id: t,
    tags: o,
    format: c,
    title: d,
    content: u
   }, l);
   e.ajax({
    url: TUMBLR_PROXY_URL + "post",
    data: i,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    t = e.id, f.chain();
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    404 === n.code && void 0 !== t && (n = "Post " + t + " not found on Tumblr.|removePublish"), 
    s(n, f);
   });
  }), f.onSuccess(function() {
   p(void 0, t);
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, c;
}), define("providers/tumblrProvider", [ "utils", "classes/Provider", "helpers/tumblrHelper" ], function(e, n, t) {
 var o = new n("tumblr", "Tumblr");
 return o.publishPreferencesInputIds = [ "tumblr-hostname" ], o.publish = function(e, n, o, i) {
  t.upload(e.blogHostname, e.postId, e.tags, "markdown" == e.format ? "markdown" : "html", n, o, function(n, t) {
   return n ? (i(n), void 0) : (e.postId = t, i(), void 0);
  });
 }, o.newPublishAttributes = function(n) {
  var t = {};
  return t.blogHostname = e.getInputTextValue("#input-publish-tumblr-hostname", n, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  t.postId = e.getInputTextValue("#input-publish-postid"), t.tags = e.getInputTextValue("#input-publish-tags"), 
  n.isPropagationStopped() ? void 0 : t;
 }, o;
}), define("helpers/wordpressHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, n, t, o, i) {
 function r(e) {
  e.onRun(function() {
   return d === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(n) {
  var i = void 0, r = void 0;
  n.onRun(function() {
   function a() {
    localStorage.removeItem("wordpressCode"), i = t.popupWindow("wordpress-oauth-client.html?client_id=" + WORDPRESS_CLIENT_ID, "stackedit-wordpress-oauth", 960, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, d = localStorage.wordpressCode, void 0 === d) return n.error(new Error(c)), 
      void 0;
      localStorage.removeItem("wordpressCode"), n.chain(s);
     }
    }, 500);
   }
   function s() {
    e.getJSON(WORDPRESS_PROXY_URL + "authenticate/" + d, function(e) {
     void 0 !== e.token ? (l = e.token, localStorage.wordpressToken = l, n.chain()) : n.error(new Error(c));
    });
   }
   if (l = localStorage.wordpressToken, void 0 !== l) return n.chain(), void 0;
   o.onMessage("Please make sure the Wordpress authorization popup is not blocked by your browser.");
   var c = "Failed to retrieve a token from Wordpress.";
   n.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var d = void 0;
   n.chain(a);
  }), n.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, t) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on WordPress.", 400 === e.code && "invalid_token" == e.message || 401 === e.code || 403 === e.code) return localStorage.removeItem("wordpressToken"), 
   o = "Access to WordPress account is not authorized.", t.retry(new Error(o), 1), 
   void 0;
   e.code <= 0 && (n.setOffline(), o = "|stopPublish");
  }
  t.error(new Error(o));
 }
 var l = void 0, c = {}, d = !1;
 return o.addListener("onOfflineChanged", function(e) {
  d = e;
 }), c.upload = function(n, t, o, c, d, u) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   var i = WORDPRESS_PROXY_URL + "post", r = {
    token: l,
    site: n,
    postId: t,
    tags: o,
    title: c,
    content: d
   };
   e.ajax({
    url: i,
    data: r,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    if (e.body.ID) return t = e.body.ID, p.chain(), void 0;
    var o = {
     code: e.code,
     message: e.body.error
    };
    404 === o.code && ("unknown_blog" == o.message ? o = 'Site "' + n + '" not found on WordPress.|removePublish' : "unknown_post" == o.message && (o = "Post " + t + " not found on WordPress.|removePublish")), 
    s(o, p);
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    s(n, p);
   });
  }), p.onSuccess(function() {
   u(void 0, t);
  }), p.onError(function(e) {
   u(e);
  }), p.enqueue();
 }, c;
}), define("providers/wordpressProvider", [ "utils", "classes/Provider", "helpers/wordpressHelper" ], function(e, n, t) {
 var o = new n("wordpress", "WordPress");
 return o.defaultPublishFormat = "html", o.publishPreferencesInputIds = [ "wordpress-site" ], 
 o.publish = function(e, n, o, i) {
  t.upload(e.site, e.postId, e.tags, n, o, function(n, t) {
   return n ? (i(n), void 0) : (e.postId = t, i(), void 0);
  });
 }, o.newPublishAttributes = function(n) {
  var t = {};
  return t.site = e.getInputTextValue("#input-publish-wordpress-site", n, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  t.postId = e.getInputTextValue("#input-publish-postid"), t.tags = e.getInputTextValue("#input-publish-tags"), 
  n.isPropagationStopped() ? void 0 : t;
 }, o;
}), define("publisher", [ "jquery", "underscore", "utils", "settings", "eventMgr", "fileSystem", "fileMgr", "sharing", "classes/Provider", "providers/bloggerProvider", "providers/dropboxProvider", "providers/gistProvider", "providers/githubProvider", "providers/gdriveProvider", "providers/sshProvider", "providers/tumblrProvider", "providers/wordpressProvider" ], function(e, n, t, o, i, r, a, s, l) {
 function c(n, t, o) {
  return void 0 === t.format && (t.format = e("input:radio[name=radio-publish-format]:checked").prop("value")), 
  "markdown" == t.format ? n.content : "html" == t.format ? o : h.applyTemplate(n, t, o);
 }
 function d(e, n) {
  if (0 === m.length) return e(n), void 0;
  var t = m.pop(), o = c(b, t, v);
  t.provider.publish(t, b.title, o, function(o) {
   if (void 0 !== o) {
    var r = o.toString();
    if (-1 !== r.indexOf("|removePublish") && (b.removePublishLocation(t), i.onPublishRemoved(b, t)), 
    -1 !== r.indexOf("|stopPublish")) return e(o), void 0;
   }
   d(e, n || o);
  });
 }
 function u(e, o) {
  var r = void 0;
  do r = "publish." + t.randomString(); while (n.has(localStorage, r));
  o.publishIndex = r, e.addPublishLocation(o), i.onNewPublishSuccess(e, o);
 }
 function p(o) {
  var i = o.defaultPublishFormat || "markdown";
  k = o, e(".publish-provider-name").text(o.providerName), e('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + o.providerId).show(), 
  t.resetModalInputs(), e("input:radio[name=radio-publish-format][value=" + i + "]").prop("checked", !0);
  var r = t.retrieveIgnoreError(o.providerId + ".publishPreferences");
  r && (n.each(o.publishPreferencesInputIds, function(e) {
   t.setInputValue("#input-publish-" + e, r[e]);
  }), t.setInputRadio("radio-publish-format", r.format)), e("#modal-publish").modal();
 }
 function f(t) {
  var o = k, i = o.newPublishAttributes(t);
  if (void 0 !== i) {
   var r = a.currentFile, l = y, d = c(r, i, l);
   o.publish(i, r.title, d, function(e) {
    void 0 === e && (i.provider = o, s.createLink(i, function() {
     u(r, i);
    }));
   });
   var p = {};
   n.each(o.publishPreferencesInputIds, function(n) {
    p[n] = e("#input-publish-" + n).val();
   }), p.format = i.format, localStorage[o.providerId + ".publishPreferences"] = JSON.stringify(p);
  }
 }
 var h = {}, g = n.chain(arguments).map(function(e) {
  return e instanceof l && [ e.providerId, e ];
 }).compact().object().value();
 n.each(r, function(e) {
  n.each(t.retrieveIndexArray(e.fileIndex + ".publish"), function(n) {
   try {
    var o = JSON.parse(localStorage[n]);
    o.publishIndex = n;
    var r = g[o.provider];
    if (!r) throw new Error("Invalid provider ID: " + o.provider);
    o.provider = r, e.publishLocations[n] = o;
   } catch (a) {
    i.onError(a), t.removeIndexFromArray(e.fileIndex + ".publish", n), localStorage.removeItem(n);
   }
  });
 }), h.applyTemplate = function(e, t, r) {
  try {
   return n.template(o.template, {
    documentTitle: e.title,
    documentMarkdown: e.content,
    documentHTML: r,
    publishAttributes: t
   });
  } catch (a) {
   return i.onError(a), a.message;
  }
 };
 var m = [], b = void 0, v = void 0, y = void 0;
 i.addListener("onPreviewFinished", function(e) {
  y = e;
 });
 var x = !1;
 i.addListener("onOfflineChanged", function(e) {
  x = e;
 });
 var w = !1;
 h.publish = function() {
  w !== !0 && x !== !0 && (w = !0, i.onPublishRunning(!0), b = a.currentFile, v = y, 
  m = n.values(b.publishLocations), d(function(e) {
   w = !1, i.onPublishRunning(!1), void 0 === e && i.onPublishSuccess(b);
  }));
 };
 var k = void 0;
 return i.addListener("onReady", function() {
  var i = e("#publish-menu");
  n.each(g, function(n) {
   i.append(e("<li>").append(e('<a href="#"><i class="icon-' + n.providerId + '"></i> ' + n.providerName + "</a>").click(function() {
    p(n);
   }))), e(".action-publish-" + n.providerId).click(function() {
    p(n);
   });
  }), e(".action-process-publish").click(f), e(".action-download-md").click(function() {
   var n = e("#wmd-input").val(), o = a.currentFile.title;
   t.saveAs(n, o + ".md");
  }), e(".action-download-html").click(function() {
   var e = a.currentFile.title;
   t.saveAs(y, e + ".html");
  }), e(".action-download-template").click(function() {
   var e = a.currentFile, n = h.applyTemplate(e, void 0, y);
   t.saveAs(n, e.title + (-1 === o.template.indexOf("documentHTML") ? ".md" : ".html"));
  });
 }), i.onPublisherCreated(h), h;
}), define("providers/gplusProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "helpers/googleHelper" ], function(e, n, t, o, i) {
 function r(n, t) {
  var o = void 0;
  return e.find(n.thumbnails, function(e) {
   var n = !1;
   return e.url.replace(/(.*\/s)\d.*?(\/[^\/]+)/, function(e, i, r) {
    o = i + t + r, n = !0;
   }), n;
  }), o;
 }
 function a() {
  return c.thumbnails ? (n.resetModalInputs(), $("#modal-import-image img").prop("src", r(c, 128)), 
  n.setInputValue("#input-import-image-title", c.name), d && n.setInputValue("#input-import-image-size", d.size), 
  $("#modal-import-image").modal(), void 0) : (o.onError("Image " + c.name + " is not accessible."), 
  callback(!0), void 0);
 }
 var s = "gplus", l = new t(s, "Google+"), c = void 0, d = n.retrieveIgnoreError(s + ".importImagePreferences"), u = void 0;
 return l.importImage = function(e) {
  u = e, i.picker(function(n, t) {
   return n || 0 === t.length ? (e(n), void 0) : (c = t[0], a(), void 0);
  }, !0);
 }, l.uploadImage = function(e, n, t) {
  u = t, i.uploadImg(e, n, "default", function(n, o) {
   return n || !o ? (t(n), void 0) : (c = {
    name: e,
    thumbnails: []
   }, $(o).find("thumbnail").each(function() {
    c.thumbnails.push({
     url: $(this).attr("url")
    });
   }), a(), void 0);
  });
 }, o.addListener("onReady", function() {
  $(".action-import-image").click(function() {
   var e = n.getInputIntValue("#input-import-image-size", void 0, 0) || 0, t = n.getInputTextValue("#input-import-image-title"), o = r(c, e);
   t && (o += ' "' + t + '"'), u(void 0, o), d = {}, e && (d.size = e), localStorage[s + ".importImagePreferences"] = JSON.stringify(d);
  });
 }), l;
}), define("mediaImporter", [ "jquery", "underscore", "classes/Provider", "core", "eventMgr", "providers/gplusProvider" ], function(e, n, t, o, i) {
 var r = {}, a = n.chain(arguments).map(function(e) {
  return e instanceof t && [ e.providerId, e ];
 }).compact().object().value();
 return i.addListener("onReady", function() {
  function t(t) {
   var i = (t.dataTransfer || t.target).files, r = n.first(i);
   if (r.name.match(/.(jpe?g|png|gif)$/)) {
    t.stopPropagation(), t.preventDefault();
    var s = new FileReader();
    s.onload = function() {
     return function(n) {
      var t = new Uint8Array(n.target.result);
      a.gplus.uploadImage(r.name, t, function(n, t) {
       if (!n) {
        o.catchModal = !0, e("#wmd-image-button").click(), o.catchModal = !1;
        var i = o.insertLinkCallback;
        o.insertLinkCallback = void 0, i(t || null);
       }
      });
     };
    }(r);
    var l = r.slice(0, IMPORT_IMG_MAX_CONTENT_SIZE);
    s.readAsArrayBuffer(l);
   }
  }
  function i(e) {
   e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy";
  }
  n.each(a, function(n) {
   e(".action-import-image-" + n.providerId).click(function() {
    var e = o.insertLinkCallback;
    o.insertLinkCallback = void 0, n.importImage(function(n, t) {
     return n ? (e(null), void 0) : (e(t || null), void 0);
    });
   });
  }), e("#wmd-input").each(function() {
   this.addEventListener("dragover", i, !1), this.addEventListener("drop", t, !1);
  });
 }), r;
}), define("css/normalize", [ "require", "module" ], function() {
 function e(e, o, i) {
  if (0 === e.indexOf("data:")) return e;
  if (e = r(e), e.match(/^\//) || e.match(a)) return e;
  var s = i.match(a), l = o.match(a);
  return !l || s && s[1] == l[1] && s[2] == l[2] ? t(n(e, o), i) : n(e, o);
 }
 function n(e, n) {
  "./" == e.substr(0, 2) && (e = e.substr(2));
  var t = n.split("/"), o = e.split("/");
  for (t.pop(); curPart = o.shift(); ) ".." == curPart ? t.pop() : t.push(curPart);
  return t.join("/");
 }
 function t(e, n) {
  var t = n.split("/");
  for (t.pop(), n = t.join("/") + "/", i = 0; n.substr(i, 1) == e.substr(i, 1); ) i++;
  for (;"/" != n.substr(i, 1); ) i--;
  n = n.substr(i + 1), e = e.substr(i + 1), t = n.split("/");
  var o = e.split("/");
  for (out = ""; t.shift(); ) out += "../";
  for (;curPart = o.shift(); ) out += curPart + "/";
  return out.substr(0, out.length - 1);
 }
 var o = /([^:])\/+/g, r = function(e) {
  return e.replace(o, "$1/");
 }, a = /[^\:\/]*:\/\/([^\/])*/, s = function(n, t, o, i) {
  t = r(t), o = r(o);
  for (var a, s, n, l = /@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi; a = l.exec(n); ) {
   s = a[3] || a[2] || a[5] || a[6] || a[4];
   var c;
   c = i && "/" == s.substr(0, 1) ? i + s : e(s, t, o);
   var d = a[5] || a[6] ? 1 : 0;
   n = n.substr(0, l.lastIndex - s.length - d - 1) + c + n.substr(l.lastIndex - d - 1), 
   l.lastIndex = l.lastIndex + (c.length - s.length);
  }
  return n;
 };
 return s.convertURIBase = e, s;
}), define("css/css", [ "./normalize" ], function(e) {
 function n(e, n) {
  for (var t = 0, o = e.length; o > t; t++) if (e[t] === n) return t;
  return -1;
 }
 if ("undefined" == typeof window) return {
  load: function(e, n, t) {
   t();
  }
 };
 var t = !1, o = document.getElementsByTagName("head")[0], i = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/), r = !1;
 i && (i[1] || i[7] ? (r = parseInt(i[1]) < 6 || parseInt(i[7]) <= 9, i = "trident") : i[2] ? (r = !0, 
 i = "webkit") : i[3] || (i[4] ? (r = parseInt(i[4]) < 18, i = "gecko") : t && alert("Engine detection failed")));
 var a = {}, s = /^\/|([^\:\/]*:)/;
 a.pluginBuilder = "./css-builder";
 var l = [], c = {}, d = [];
 a.addBuffer = function(e) {
  -1 == n(l, e) && -1 == n(d, e) && (l.push(e), d.push(e));
 }, a.setBuffer = function(n, t) {
  var o = window.location.pathname.split("/");
  o.pop(), o = o.join("/") + "/";
  var i = require.toUrl("base_url").split("/");
  i.pop();
  var r = i.join("/") + "/";
  r = e.convertURIBase(r, o, "/"), r.match(s) || (r = "/" + r), "/" != r.substr(r.length - 1, 1) && (r += "/"), 
  a.inject(e(n, r, o));
  for (var d = 0; d < l.length; d++) (t && ".less" == l[d].substr(l[d].length - 5, 5) || !t && ".css" == l[d].substr(l[d].length - 4, 4)) && (function(e) {
   c[e] = c[e] || !0, setTimeout(function() {
    "function" == typeof c[e] && c[e](), delete c[e];
   }, 7);
  }(l[d]), l.splice(d--, 1));
 }, a.attachBuffer = function(e, t) {
  for (var o = 0; o < l.length; o++) if (l[o] == e) return c[e] = t, !0;
  return c[e] === !0 ? (c[e] = t, !0) : -1 != n(d, e) ? (t(), !0) : void 0;
 };
 var u = function(e, n) {
  setTimeout(function() {
   for (var t = 0; t < document.styleSheets.length; t++) {
    var o = document.styleSheets[t];
    if (o.href == e.href) return n();
   }
   u(e, n);
  }, 10);
 }, p = function(e, n) {
  setTimeout(function() {
   try {
    return e.sheet.cssRules, n();
   } catch (t) {}
   p(e, n);
  }, 10);
 };
 if ("trident" == i && r) var f = [], h = [], g = 0, m = function(e, n) {
  var t;
  h.push({
   url: e,
   cb: n
  }), t = f.shift(), !t && g++ < 31 && (t = document.createElement("style"), o.appendChild(t)), 
  t && b(t);
 }, b = function(e) {
  var n = h.shift();
  if (!n) return e.onload = y, f.push(e), void 0;
  e.onload = function() {
   n.cb(n.ss), b(e);
  };
  var t = e.styleSheet;
  n.ss = t.imports[t.addImport(n.url)];
 };
 var v = function(e) {
  var n = document.createElement("link");
  return n.type = "text/css", n.rel = "stylesheet", n.href = e, n;
 }, y = function() {};
 a.linkLoad = function(e, n) {
  var a = setTimeout(function() {
   t && alert("timeout"), n();
  }, 1e3 * I - 100), s = function() {
   clearTimeout(a), l && (l.onload = y), setTimeout(n, 7);
  };
  if (r) if ("webkit" == i) {
   var l = v(e);
   u(l, s), o.appendChild(l);
  } else if ("gecko" == i) {
   var c = document.createElement("style");
   c.textContent = '@import "' + e + '"', p(c, s), o.appendChild(c);
  } else "trident" == i && m(e, s); else {
   var l = v(e);
   l.onload = s, o.appendChild(l);
  }
 };
 var x, w = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], k = {}, C = function(e, n, t) {
  if (k[e]) return n(k[e]), void 0;
  var o, i, r;
  if ("undefined" != typeof XMLHttpRequest) o = new XMLHttpRequest(); else if ("undefined" != typeof ActiveXObject) for (i = 0; 3 > i; i += 1) {
   r = w[i];
   try {
    o = new ActiveXObject(r);
   } catch (a) {}
   if (o) {
    w = [ r ];
    break;
   }
  }
  o.open("GET", e, requirejs.inlineRequire ? !1 : !0), o.onreadystatechange = function() {
   var i, r;
   4 === o.readyState && (i = o.status, i > 399 && 600 > i ? (r = new Error(e + " HTTP status: " + i), 
   r.xhr = o, t(r)) : (k[e] = o.responseText, n(o.responseText)));
  }, o.send(null);
 }, S = 0;
 a.inject = function(e) {
  31 > S && (x = document.createElement("style"), x.type = "text/css", o.appendChild(x), 
  S++), x.styleSheet ? x.styleSheet.cssText += e : x.appendChild(document.createTextNode(e));
 };
 var T = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, E = window.location.pathname.split("/");
 E.pop(), E = E.join("/") + "/";
 var _ = function(n, t, o) {
  n.match(s) || (n = "/" + e.convertURIBase(n, E, "/")), C(n, function(i) {
   i = e(i, n, E);
   for (var r, a = [], s = [], l = []; r = T.exec(i); ) {
    var c = r[4] || r[5] || r[7] || r[8] || r[9];
    a.push(c), s.push(T.lastIndex - r[0].length), l.push(r[0].length);
   }
   for (var d = 0, u = 0; u < a.length; u++) (function(e) {
    _(a[e], function(n) {
     i = i.substr(0, s[e]) + n + i.substr(s[e] + l[e]);
     for (var o = n.length - l[e], r = e + 1; r < a.length; r++) s[r] += o;
     d++, d == a.length && t(i);
    }, o);
   })(u);
   0 == a.length && t(i);
  }, o);
 };
 a.normalize = function(e, n) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), n(e);
 };
 var I, P = !1;
 return a.load = function(e, n, o, i, s) {
  I = I || i.waitSeconds || 7;
  var l = e + (s ? ".less" : ".css");
  if (!a.attachBuffer(l, o)) {
   var c = n.toUrl(l);
   !P && t && (alert(r ? "hacking links" : "not hacking"), P = !0), s ? _(c, function(e) {
    s && (e = s(e, function(e) {
     a.inject(e), setTimeout(o, 7);
    }));
   }) : a.linkLoad(c, o);
  }
 }, t && (a.inspect = function() {
  return stylesheet.styleSheet ? stylesheet.styleSheet.cssText : stylesheet.innerHTML ? stylesheet.innerHTML : void 0;
 }), a;
}), define("css", [ "css/css" ], function(e) {
 return e;
}), define("less/less", [ "css", "require" ], function(e, n) {
 var t = {};
 return t.pluginBuilder = "./less-builder", "undefined" == typeof window ? (t.load = function(e, n, t) {
  t();
 }, t) : (t.normalize = function(e, n) {
  return ".less" == e.substr(e.length - 5, 5) && (e = e.substr(0, e.length - 5)), 
  e = n(e);
 }, t.parse = function(e, t) {
  window.less = window.less || {
   env: "development"
  }, n([ "./lessc" ], function(n) {
   var o, i = new n.Parser();
   i.parse(e, function(e, n) {
    if (e) throw e;
    try {
     o = n.toCSS();
    } catch (i) {
     throw new Error("LESS parse error: " + i.type + ", " + i.message);
    }
    t(o);
   });
  });
 }, t.load = function(n, o, i, r) {
  e.load(n, o, i, r, t.parse);
 }, t);
}), define("less", [ "less/less" ], function(e) {
 return e;
}), requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/main.less");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, requirejs.config({
 waitSeconds: 0,
 packages: [ {
  name: "css",
  location: "libs/css",
  main: "css"
 }, {
  name: "less",
  location: "libs/less",
  main: "less"
 } ],
 paths: {
  jquery: "libs/jquery",
  underscore: "libs/underscore",
  crel: "libs/crel",
  jgrowl: "libs/jgrowl",
  mousetrap: "libs/mousetrap",
  toMarkdown: "libs/to-markdown",
  text: "libs/text",
  "libs/MathJax": "../lib/MathJax/MathJax.js?config=TeX-AMS_HTML"
 },
 shim: {
  underscore: {
   exports: "_"
  },
  jgrowl: {
   deps: [ "jquery" ],
   exports: "jQuery.jGrowl"
  },
  mousetrap: {
   exports: "Mousetrap"
  },
  toMarkdown: {
   deps: [ "jquery" ],
   exports: "toMarkdown"
  },
  "libs/jquery-ui": [ "jquery" ],
  "libs/bootstrap/bootstrap": [ "jquery" ],
  "libs/jquery.waitforimages": [ "jquery" ],
  "libs/jquery.mousewheel": [ "jquery" ],
  "libs/layout": [ "libs/jquery-ui" ],
  "libs/Markdown.Extra": [ "libs/Markdown.Converter", "libs/prettify", "libs/highlight.pack" ],
  "libs/Markdown.Editor": [ "libs/Markdown.Converter" ]
 }
});

var logger = {
 log: function() {},
 info: function() {},
 warn: function() {},
 error: function() {}
};

location.search.match(/(\?|&)console/) && (logger = console), require([ "jquery", "core", "synchronizer", "publisher", "mediaImporter", "css", "less!styles/main.less" ], function(e, n) {
 e(function() {
  window.applicationCache && window.applicationCache.addEventListener("updateready", function() {
   window.applicationCache.status === window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), 
   window.location.reload());
  }, !1), n.onReady();
 });
}), define("main", function() {}), requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.setBuffer("/*!\n * Bootstrap v3.0.0\n *\n * Copyright 2013 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world by @mdo and @fat.\n */\n/*! normalize.css v2.1.0 | MIT License | git.io/normalize */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nvideo {\n  display: inline-block;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden] {\n  display: none;\n}\nhtml {\n  font-family: sans-serif;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\na:focus {\n  outline: thin dotted;\n}\na:active,\na:hover {\n  outline: 0;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, serif;\n  font-size: 1em;\n}\npre {\n  white-space: pre-wrap;\n}\nq {\n  quotes: \"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 0;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  padding: 0;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0;\n}\nbutton,\ninput {\n  line-height: normal;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ntextarea {\n  overflow: auto;\n  vertical-align: top;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n@media print {\n  * {\n    text-shadow: none !important;\n    color: #000 !important;\n    background: transparent !important;\n    box-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  .ir a:after,\n  a[href^=\"javascript:\"]:after,\n  a[href^=\"#\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  @page  {\n    margin: 2cm .5cm;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 62.5%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.428571429;\n  color: #333333;\n  background-color: #f5f5f5;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #428bca;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #2a6496;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-circle {\n  border-radius: 500px;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #f5f5f5;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16.099999999999998px;\n  font-weight: 200;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall {\n  font-size: 85%;\n}\ncite {\n  font-style: normal;\n}\n.text-muted {\n  color: #999999;\n}\n.text-primary {\n  color: #428bca;\n}\n.text-warning {\n  color: #c09853;\n}\n.text-danger {\n  color: #b94a48;\n}\n.text-success {\n  color: #468847;\n}\n.text-info {\n  color: #3a87ad;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-weight: 500;\n  line-height: 1.1;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small {\n  font-weight: normal;\n  line-height: 1;\n  color: #999999;\n}\nh1,\nh2,\nh3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh4,\nh5,\nh6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh1,\n.h1 {\n  font-size: 38px;\n}\nh2,\n.h2 {\n  font-size: 32px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\nh1 small,\n.h1 small {\n  font-size: 24px;\n}\nh2 small,\n.h2 small {\n  font-size: 18px;\n}\nh3 small,\n.h3 small,\nh4 small,\n.h4 small {\n  font-size: 14px;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #f5f5f5;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\ndl {\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.428571429;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n.dl-horizontal dt {\n  float: left;\n  width: 160px;\n  clear: left;\n  text-align: right;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dl-horizontal dd {\n  margin-left: 180px;\n}\n.dl-horizontal dd:before,\n.dl-horizontal dd:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.dl-horizontal dd:after {\n  clear: both;\n}\n.dl-horizontal dd:before,\n.dl-horizontal dd:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.dl-horizontal dd:after {\n  clear: both;\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #999999;\n}\nabbr.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  border-left: 5px solid #f5f5f5;\n}\nblockquote p {\n  font-size: 17.5px;\n  font-weight: 300;\n  line-height: 1.25;\n}\nblockquote p:last-child {\n  margin-bottom: 0;\n}\nblockquote small {\n  display: block;\n  line-height: 1.428571429;\n  color: #999999;\n}\nblockquote small:before {\n  content: '\\2014 \\00A0';\n}\nblockquote.pull-right {\n  float: right;\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #f5f5f5;\n  border-left: 0;\n}\nblockquote.pull-right p,\nblockquote.pull-right small {\n  text-align: right;\n}\nblockquote.pull-right small:before {\n  content: '';\n}\nblockquote.pull-right small:after {\n  content: '\\00A0 \\2014';\n}\nq:before,\nq:after,\nblockquote:before,\nblockquote:after {\n  content: \"\";\n}\naddress {\n  display: block;\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.428571429;\n}\ncode,\npre {\n  font-family: Monaco, Menlo, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  white-space: nowrap;\n  border-radius: 4px;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.428571429;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\npre.prettyprint {\n  margin-bottom: 20px;\n}\npre code {\n  padding: 0;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n}\n.container:before,\n.container:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.container:after {\n  clear: both;\n}\n.container:before,\n.container:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.container:after {\n  clear: both;\n}\n.row:before,\n.row:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.row:after {\n  clear: both;\n}\n.row:before,\n.row:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.row:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .row {\n    margin-left: -15px;\n    margin-right: -15px;\n  }\n}\n.row .row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12,\n.col-sm-1,\n.col-sm-2,\n.col-sm-3,\n.col-sm-4,\n.col-sm-5,\n.col-sm-6,\n.col-sm-7,\n.col-sm-8,\n.col-sm-9,\n.col-sm-10,\n.col-sm-11,\n.col-sm-12,\n.col-lg-1,\n.col-lg-2,\n.col-lg-3,\n.col-lg-4,\n.col-lg-5,\n.col-lg-6,\n.col-lg-7,\n.col-lg-8,\n.col-lg-9,\n.col-lg-10,\n.col-lg-11,\n.col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n  float: left;\n}\n.col-1 {\n  width: 8.333333333333332%;\n}\n.col-2 {\n  width: 16.666666666666664%;\n}\n.col-3 {\n  width: 25%;\n}\n.col-4 {\n  width: 33.33333333333333%;\n}\n.col-5 {\n  width: 41.66666666666667%;\n}\n.col-6 {\n  width: 50%;\n}\n.col-7 {\n  width: 58.333333333333336%;\n}\n.col-8 {\n  width: 66.66666666666666%;\n}\n.col-9 {\n  width: 75%;\n}\n.col-10 {\n  width: 83.33333333333334%;\n}\n.col-11 {\n  width: 91.66666666666666%;\n}\n.col-12 {\n  width: 100%;\n}\n@media (min-width: 768px) {\n  .container {\n    max-width: 728px;\n  }\n  .col-sm-1,\n  .col-sm-2,\n  .col-sm-3,\n  .col-sm-4,\n  .col-sm-5,\n  .col-sm-6,\n  .col-sm-7,\n  .col-sm-8,\n  .col-sm-9,\n  .col-sm-10,\n  .col-sm-11,\n  .col-sm-12 {\n    float: left;\n  }\n  .col-sm-1 {\n    width: 8.333333333333332%;\n  }\n  .col-sm-2 {\n    width: 16.666666666666664%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-4 {\n    width: 33.33333333333333%;\n  }\n  .col-sm-5 {\n    width: 41.66666666666667%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-7 {\n    width: 58.333333333333336%;\n  }\n  .col-sm-8 {\n    width: 66.66666666666666%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-10 {\n    width: 83.33333333333334%;\n  }\n  .col-sm-11 {\n    width: 91.66666666666666%;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-push-1 {\n    left: 8.333333333333332%;\n  }\n  .col-push-2 {\n    left: 16.666666666666664%;\n  }\n  .col-push-3 {\n    left: 25%;\n  }\n  .col-push-4 {\n    left: 33.33333333333333%;\n  }\n  .col-push-5 {\n    left: 41.66666666666667%;\n  }\n  .col-push-6 {\n    left: 50%;\n  }\n  .col-push-7 {\n    left: 58.333333333333336%;\n  }\n  .col-push-8 {\n    left: 66.66666666666666%;\n  }\n  .col-push-9 {\n    left: 75%;\n  }\n  .col-push-10 {\n    left: 83.33333333333334%;\n  }\n  .col-push-11 {\n    left: 91.66666666666666%;\n  }\n  .col-pull-1 {\n    right: 8.333333333333332%;\n  }\n  .col-pull-2 {\n    right: 16.666666666666664%;\n  }\n  .col-pull-3 {\n    right: 25%;\n  }\n  .col-pull-4 {\n    right: 33.33333333333333%;\n  }\n  .col-pull-5 {\n    right: 41.66666666666667%;\n  }\n  .col-pull-6 {\n    right: 50%;\n  }\n  .col-pull-7 {\n    right: 58.333333333333336%;\n  }\n  .col-pull-8 {\n    right: 66.66666666666666%;\n  }\n  .col-pull-9 {\n    right: 75%;\n  }\n  .col-pull-10 {\n    right: 83.33333333333334%;\n  }\n  .col-pull-11 {\n    right: 91.66666666666666%;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    max-width: 940px;\n  }\n  .col-lg-1,\n  .col-lg-2,\n  .col-lg-3,\n  .col-lg-4,\n  .col-lg-5,\n  .col-lg-6,\n  .col-lg-7,\n  .col-lg-8,\n  .col-lg-9,\n  .col-lg-10,\n  .col-lg-11,\n  .col-lg-12 {\n    float: left;\n  }\n  .col-lg-1 {\n    width: 8.333333333333332%;\n  }\n  .col-lg-2 {\n    width: 16.666666666666664%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-4 {\n    width: 33.33333333333333%;\n  }\n  .col-lg-5 {\n    width: 41.66666666666667%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-7 {\n    width: 58.333333333333336%;\n  }\n  .col-lg-8 {\n    width: 66.66666666666666%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-10 {\n    width: 83.33333333333334%;\n  }\n  .col-lg-11 {\n    width: 91.66666666666666%;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-offset-1 {\n    margin-left: 8.333333333333332%;\n  }\n  .col-offset-2 {\n    margin-left: 16.666666666666664%;\n  }\n  .col-offset-3 {\n    margin-left: 25%;\n  }\n  .col-offset-4 {\n    margin-left: 33.33333333333333%;\n  }\n  .col-offset-5 {\n    margin-left: 41.66666666666667%;\n  }\n  .col-offset-6 {\n    margin-left: 50%;\n  }\n  .col-offset-7 {\n    margin-left: 58.333333333333336%;\n  }\n  .col-offset-8 {\n    margin-left: 66.66666666666666%;\n  }\n  .col-offset-9 {\n    margin-left: 75%;\n  }\n  .col-offset-10 {\n    margin-left: 83.33333333333334%;\n  }\n  .col-offset-11 {\n    margin-left: 91.66666666666666%;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    max-width: 1170px;\n  }\n}\ntable {\n  max-width: 100%;\n  background-color: transparent;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  margin-bottom: 20px;\n}\n.table thead > tr > th,\n.table tbody > tr > th,\n.table tfoot > tr > th,\n.table thead > tr > td,\n.table tbody > tr > td,\n.table tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.428571429;\n  vertical-align: top;\n  border-top: 1px solid #dddddd;\n}\n.table thead > tr > th {\n  vertical-align: bottom;\n}\n.table caption + thead tr:first-child th,\n.table colgroup + thead tr:first-child th,\n.table thead:first-child tr:first-child th,\n.table caption + thead tr:first-child td,\n.table colgroup + thead tr:first-child td,\n.table thead:first-child tr:first-child td {\n  border-top: 0;\n}\n.table tbody + tbody {\n  border-top: 2px solid #dddddd;\n}\n.table .table {\n  background-color: #f5f5f5;\n}\n.table-condensed thead > tr > th,\n.table-condensed tbody > tr > th,\n.table-condensed tfoot > tr > th,\n.table-condensed thead > tr > td,\n.table-condensed tbody > tr > td,\n.table-condensed tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #dddddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #dddddd;\n}\n.table-striped > tbody > tr:nth-child(odd) > td,\n.table-striped > tbody > tr:nth-child(odd) > th {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover > td,\n.table-hover > tbody > tr:hover > th {\n  background-color: #f5f5f5;\n}\ntable col[class^=\"col-\"] {\n  float: none;\n  display: table-column;\n}\ntable td[class^=\"col-\"],\ntable th[class^=\"col-\"] {\n  float: none;\n  display: table-cell;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n  border-color: #eed3d7;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n  border-color: #fbeed5;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td {\n  background-color: #d0e9c6;\n  border-color: #c9e2b3;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td {\n  background-color: #ebcccc;\n  border-color: #e6c1c7;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td {\n  background-color: #faf2cc;\n  border-color: #f8e5be;\n}\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  /* IE8-9 */\n\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\nselect optgroup {\n  font-size: inherit;\n  font-style: inherit;\n  font-family: inherit;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\ninput[type=\"number\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button {\n  height: auto;\n}\n.form-control:-moz-placeholder {\n  color: #cccccc;\n}\n.form-control::-moz-placeholder {\n  color: #cccccc;\n}\n.form-control:-ms-input-placeholder {\n  color: #cccccc;\n}\n.form-control::-webkit-input-placeholder {\n  color: #cccccc;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 38px;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1.428571429;\n  color: #555555;\n  vertical-align: middle;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: rgba(82, 168, 236, 0.8);\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n  background-color: #f5f5f5;\n}\ntextarea.form-control {\n  height: auto;\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  display: block;\n  min-height: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  padding-left: 20px;\n  vertical-align: middle;\n}\n.radio label,\n.checkbox label {\n  display: inline;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  float: left;\n  margin-left: -20px;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\n.form-control.input-large {\n  height: 56px;\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.form-control.input-small {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\nselect.input-large {\n  height: 56px;\n  line-height: 56px;\n}\nselect.input-small {\n  height: 30px;\n  line-height: 30px;\n}\n.has-warning .help-block,\n.has-warning .control-label {\n  color: #c09853;\n}\n.has-warning .form-control {\n  padding-right: 32px;\n  border-color: #c09853;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #a47e3c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n}\n.has-warning .input-group-addon {\n  color: #c09853;\n  border-color: #c09853;\n  background-color: #fcf8e3;\n}\n.has-error .help-block,\n.has-error .control-label {\n  color: #b94a48;\n}\n.has-error .form-control {\n  padding-right: 32px;\n  border-color: #b94a48;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #953b39;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n}\n.has-error .input-group-addon {\n  color: #b94a48;\n  border-color: #b94a48;\n  background-color: #f2dede;\n}\n.has-success .help-block,\n.has-success .control-label {\n  color: #468847;\n}\n.has-success .form-control {\n  padding-right: 32px;\n  border-color: #468847;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #356635;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n}\n.has-success .input-group-addon {\n  color: #468847;\n  border-color: #468847;\n  background-color: #dff0d8;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n.input-group {\n  display: table;\n  border-collapse: separate;\n}\n.input-group.col {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.428571429;\n  text-align: center;\n  background-color: #f5f5f5;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n}\n.input-group-addon.input-small {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-large {\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -4px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.form-inline .form-control,\n.form-inline .radio,\n.form-inline .checkbox {\n  display: inline-block;\n}\n.form-inline .radio,\n.form-inline .checkbox {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.form-horizontal .control-label {\n  padding-top: 6px;\n}\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.form-horizontal .form-group:after {\n  clear: both;\n}\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.form-horizontal .form-group:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group {\n    margin-left: -15px;\n    margin-right: -15px;\n  }\n}\n.form-horizontal .form-group .row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n  }\n}\n.btn {\n  display: inline-block;\n  padding: 8px 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.428571429;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  white-space: nowrap;\n}\n.btn:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus {\n  color: #333333;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  outline: 0;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: default;\n  pointer-events: none;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-default {\n  color: #333333;\n  background-color: #ffffff;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-default:hover,\n.btn-default:focus,\n.btn-default:active,\n.btn-default.active {\n  background-color: #f2f2f2;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-default.disabled,\n.btn-default[disabled],\nfieldset[disabled] .btn-default,\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled:active,\n.btn-default[disabled]:active,\nfieldset[disabled] .btn-default:active,\n.btn-default.disabled.active,\n.btn-default[disabled].active,\nfieldset[disabled] .btn-default.active {\n  background-color: #ffffff;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-primary {\n  color: #ffffff;\n  background-color: #777777;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-primary:hover,\n.btn-primary:focus,\n.btn-primary:active,\n.btn-primary.active {\n  background-color: #6a6a6a;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-primary.disabled,\n.btn-primary[disabled],\nfieldset[disabled] .btn-primary,\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled:active,\n.btn-primary[disabled]:active,\nfieldset[disabled] .btn-primary:active,\n.btn-primary.disabled.active,\n.btn-primary[disabled].active,\nfieldset[disabled] .btn-primary.active {\n  background-color: #777777;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-warning {\n  color: #333333;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n.btn-warning:hover,\n.btn-warning:focus,\n.btn-warning:active,\n.btn-warning.active {\n  background-color: #eea236;\n  border-color: #ec971f;\n}\n.btn-warning.disabled,\n.btn-warning[disabled],\nfieldset[disabled] .btn-warning,\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled:active,\n.btn-warning[disabled]:active,\nfieldset[disabled] .btn-warning:active,\n.btn-warning.disabled.active,\n.btn-warning[disabled].active,\nfieldset[disabled] .btn-warning.active {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n.btn-danger {\n  color: #333333;\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n.btn-danger:hover,\n.btn-danger:focus,\n.btn-danger:active,\n.btn-danger.active {\n  background-color: #d43f3a;\n  border-color: #c9302c;\n}\n.btn-danger.disabled,\n.btn-danger[disabled],\nfieldset[disabled] .btn-danger,\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled:active,\n.btn-danger[disabled]:active,\nfieldset[disabled] .btn-danger:active,\n.btn-danger.disabled.active,\n.btn-danger[disabled].active,\nfieldset[disabled] .btn-danger.active {\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n.btn-success {\n  color: #333333;\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n.btn-success:hover,\n.btn-success:focus,\n.btn-success:active,\n.btn-success.active {\n  background-color: #4cae4c;\n  border-color: #449d44;\n}\n.btn-success.disabled,\n.btn-success[disabled],\nfieldset[disabled] .btn-success,\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled:active,\n.btn-success[disabled]:active,\nfieldset[disabled] .btn-success:active,\n.btn-success.disabled.active,\n.btn-success[disabled].active,\nfieldset[disabled] .btn-success.active {\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n.btn-info {\n  color: #333333;\n  background-color: #f5f5f5;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-info:hover,\n.btn-info:focus,\n.btn-info:active,\n.btn-info.active {\n  background-color: #e8e8e8;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-info.disabled,\n.btn-info[disabled],\nfieldset[disabled] .btn-info,\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled:active,\n.btn-info[disabled]:active,\nfieldset[disabled] .btn-info:active,\n.btn-info.disabled.active,\n.btn-info[disabled].active,\nfieldset[disabled] .btn-info.active {\n  background-color: #f5f5f5;\n  border-color: rgba(0, 0, 0, 0);\n}\n.btn-link {\n  color: #428bca;\n  font-weight: normal;\n  cursor: pointer;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #2a6496;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #333333;\n  text-decoration: none;\n}\n.btn-large {\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.btn-small {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n  padding-left: 0;\n  padding-right: 0;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  transition: height 0.35s ease;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px solid #000000;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  content: \"\";\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.428571429;\n  color: #333333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #ffffff;\n  background-color: #7b7b7b;\n  background-image: -webkit-gradient(linear, left 0%, left 100%, from(#888888), to(#7b7b7b));\n  background-image: -webkit-linear-gradient(top, #888888, 0%, #7b7b7b, 100%);\n  background-image: -moz-linear-gradient(top, #888888 0%, #7b7b7b 100%);\n  background-image: linear-gradient(to bottom, #888888 0%, #7b7b7b 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff888888', endColorstr='#ff7b7b7b', GradientType=0);\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #ffffff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #357ebd;\n  background-image: -webkit-gradient(linear, left 0%, left 100%, from(#428bca), to(#357ebd));\n  background-image: -webkit-linear-gradient(top, #428bca, 0%, #357ebd, 100%);\n  background-image: -moz-linear-gradient(top, #428bca 0%, #357ebd 100%);\n  background-image: linear-gradient(to bottom, #428bca 0%, #357ebd 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff428bca', endColorstr='#ff357ebd', GradientType=0);\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #999999;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.428571429;\n  color: #999999;\n}\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px solid #000000;\n  content: \"\";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 1px;\n}\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n  background-color: #ffffff;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 30px 10px 15px;\n  margin-bottom: -1px;\n  border: 1px solid #dddddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.list-group-item > .badge {\n  float: right;\n  margin-right: -15px;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\na.list-group-item .list-group-item-heading {\n  color: #333333;\n}\na.list-group-item .list-group-item-text {\n  color: #555555;\n}\na.list-group-item:hover,\na.list-group-item:focus {\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\na.list-group-item.active {\n  z-index: 2;\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\na.list-group-item.active .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item.active .list-group-item-text {\n  color: #e1edf7;\n}\n.panel {\n  padding: 15px;\n  margin-bottom: 20px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.panel-heading {\n  margin: -15px -15px 15px;\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid #dddddd;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 17.5px;\n  font-weight: 500;\n}\n.panel-footer {\n  margin: 15px -15px -15px;\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #dddddd;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.panel-primary {\n  border-color: #428bca;\n}\n.panel-primary .panel-heading {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success .panel-heading {\n  color: #468847;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-warning {\n  border-color: #fbeed5;\n}\n.panel-warning .panel-heading {\n  color: #c09853;\n  background-color: #fcf8e3;\n  border-color: #fbeed5;\n}\n.panel-danger {\n  border-color: #eed3d7;\n}\n.panel-danger .panel-heading {\n  color: #b94a48;\n  background-color: #f2dede;\n  border-color: #eed3d7;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info .panel-heading {\n  color: #3a87ad;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.list-group-flush {\n  margin: 15px -15px -15px;\n}\n.list-group-flush .list-group-item {\n  border-width: 1px 0;\n}\n.list-group-flush .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.list-group-flush .list-group-item:last-child {\n  border-bottom: 0;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.well-large {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-small {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000000;\n  text-shadow: 0 1px 0 #ffffff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.close:hover,\n.close:focus {\n  color: #000000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav:before,\n.nav:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.nav:after {\n  clear: both;\n}\n.nav:before,\n.nav:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.nav:after {\n  clear: both;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\n.nav > li.disabled > a {\n  color: #999999;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #999999;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav > li + .nav-header {\n  margin-top: 9px;\n}\n.nav.open > a,\n.nav.open > a:hover,\n.nav.open > a:focus {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.nav.open > a .caret,\n.nav.open > a:hover .caret,\n.nav.open > a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n.nav > .pull-right {\n  float: right;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav-tabs {\n  border-bottom: 1px solid #dddddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.428571429;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #f5f5f5;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #f5f5f5;\n  border: 1px solid #dddddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n}\n.nav-tabs.nav-justified > li > a {\n  border-bottom: 1px solid #dddddd;\n  margin-right: 0;\n}\n.nav-tabs.nav-justified > .active > a {\n  border-bottom-color: #f5f5f5;\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 5px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #ffffff;\n  background-color: #428bca;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li > a {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.nav-justified > li > a {\n  text-align: center;\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  border-bottom: 1px solid #dddddd;\n  margin-right: 0;\n}\n.nav-tabs-justified > .active > a {\n  border-bottom-color: #f5f5f5;\n}\n.tabbable:before,\n.tabbable:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.tabbable:after {\n  clear: both;\n}\n.tabbable:before,\n.tabbable:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.tabbable:after {\n  clear: both;\n}\n.tab-content > .tab-pane,\n.pill-content > .pill-pane {\n  display: none;\n}\n.tab-content > .active,\n.pill-content > .active {\n  display: block;\n}\n.nav .caret {\n  border-top-color: #428bca;\n  border-bottom-color: #428bca;\n}\n.nav a:hover .caret {\n  border-top-color: #2a6496;\n  border-bottom-color: #2a6496;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  padding-left: 15px;\n  padding-right: 15px;\n  background-color: #dddddd;\n  border-radius: 4px;\n}\n.navbar:before,\n.navbar:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.navbar:after {\n  clear: both;\n}\n.navbar:before,\n.navbar:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.navbar:after {\n  clear: both;\n}\n.navbar-nav {\n  margin-top: 10px;\n  margin-bottom: 15px;\n}\n.navbar-nav > li > a {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  color: #777777;\n  line-height: 20px;\n  border-radius: 4px;\n}\n.navbar-nav > li > a:hover,\n.navbar-nav > li > a:focus {\n  color: #333333;\n  background-color: transparent;\n}\n.navbar-nav > .active > a,\n.navbar-nav > .active > a:hover,\n.navbar-nav > .active > a:focus {\n  color: #555555;\n  background-color: #c4c4c4;\n}\n.navbar-nav > .disabled > a,\n.navbar-nav > .disabled > a:hover,\n.navbar-nav > .disabled > a:focus {\n  color: #cccccc;\n  background-color: transparent;\n}\n.navbar-nav.pull-right {\n  width: 100%;\n}\n.navbar-static-top {\n  border-radius: 0;\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n  border-radius: 0;\n}\n.navbar-fixed-top {\n  top: 0;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n}\n.navbar-brand {\n  display: block;\n  max-width: 200px;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 15px 15px;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 20px;\n  color: #777777;\n  text-align: center;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  color: #5e5e5e;\n  text-decoration: none;\n  background-color: transparent;\n}\n.navbar-toggle {\n  position: absolute;\n  top: 9px;\n  right: 10px;\n  width: 48px;\n  height: 32px;\n  padding: 8px 12px;\n  background-color: transparent;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n}\n.navbar-toggle:hover,\n.navbar-toggle:focus {\n  background-color: #dddddd;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  background-color: #cccccc;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n.navbar-form {\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n.navbar-form .form-control,\n.navbar-form .radio,\n.navbar-form .checkbox {\n  display: inline-block;\n}\n.navbar-form .radio,\n.navbar-form .checkbox {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.navbar-form .col-lg-1 {\n  width: 8.333333333333332%;\n}\n.navbar-form .col-lg-2 {\n  width: 16.666666666666664%;\n}\n.navbar-form .col-lg-3 {\n  width: 25%;\n}\n.navbar-form .col-lg-4 {\n  width: 33.33333333333333%;\n}\n.navbar-form .col-lg-5 {\n  width: 41.66666666666667%;\n}\n.navbar-form .col-lg-6 {\n  width: 50%;\n}\n.navbar-form .col-lg-7 {\n  width: 58.333333333333336%;\n}\n.navbar-form .col-lg-8 {\n  width: 66.66666666666666%;\n}\n.navbar-form .col-lg-9 {\n  width: 75%;\n}\n.navbar-form .col-lg-10 {\n  width: 83.33333333333334%;\n}\n.navbar-form .col-lg-11 {\n  width: 91.66666666666666%;\n}\n.navbar-form .col-lg-12 {\n  width: 100%;\n}\n.navbar-form * {\n  float: none;\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.navbar-nav > .dropdown > a:hover .caret,\n.navbar-nav > .dropdown > a:focus .caret {\n  border-top-color: #333333;\n  border-bottom-color: #333333;\n}\n.navbar-nav > .open > a,\n.navbar-nav > .open > a:hover,\n.navbar-nav > .open > a:focus {\n  background-color: #c4c4c4;\n  color: #555555;\n}\n.navbar-nav > .open > a .caret,\n.navbar-nav > .open > a:hover .caret,\n.navbar-nav > .open > a:focus .caret {\n  border-top-color: #555555;\n  border-bottom-color: #555555;\n}\n.navbar-nav > .dropdown > a .caret {\n  border-top-color: #777777;\n  border-bottom-color: #777777;\n}\n.navbar-nav.pull-right > li > .dropdown-menu,\n.navbar-nav > li > .dropdown-menu.pull-right {\n  left: auto;\n  right: 0;\n}\n.navbar-inverse {\n  background-color: #222222;\n}\n.navbar-inverse .navbar-brand {\n  color: #999999;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #999999;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #999999;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #ffffff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #080808;\n  color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .dropdown > a:hover .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .dropdown > a .caret {\n  border-top-color: #999999;\n  border-bottom-color: #999999;\n}\n.navbar-inverse .navbar-nav > .open > a .caret,\n.navbar-inverse .navbar-nav > .open > a:hover .caret,\n.navbar-inverse .navbar-nav > .open > a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n@media screen and (min-width: 768px) {\n  .navbar-brand {\n    float: left;\n    margin-left: -15px;\n    margin-right: 5px;\n  }\n  .navbar-nav {\n    float: left;\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    border-radius: 0;\n  }\n  .navbar-nav.pull-right {\n    float: right;\n    width: auto;\n  }\n  .navbar-toggle {\n    position: relative;\n    top: auto;\n    left: auto;\n    display: none;\n  }\n  .nav-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    overflow: visible !important;\n  }\n}\n.navbar-btn {\n  margin-top: 6px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n.navbar-link {\n  color: #777777;\n}\n.navbar-link:hover {\n  color: #333333;\n}\n.navbar-inverse .navbar-link {\n  color: #999999;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #ffffff;\n}\n.btn .caret {\n  border-top-color: #333333;\n}\n.dropup .btn .caret {\n  border-bottom-color: #333333;\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active {\n  z-index: 2;\n}\n.btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.btn-toolbar:before,\n.btn-toolbar:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.btn-toolbar:after {\n  clear: both;\n}\n.btn-toolbar:before,\n.btn-toolbar:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.btn-toolbar:after {\n  clear: both;\n}\n.btn-toolbar .btn-group {\n  float: left;\n}\n.btn-toolbar > .btn + .btn,\n.btn-toolbar > .btn-group + .btn,\n.btn-toolbar > .btn + .btn-group,\n.btn-toolbar > .btn-group + .btn-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child > .btn:last-child,\n.btn-group > .btn-group:first-child > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn-group:last-child > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.btn-group > .btn-large + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-large .caret {\n  border-width: 5px;\n}\n.dropup .btn-large .caret {\n  border-bottom-width: 5px;\n}\n.btn-group-vertical > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn + .btn {\n  margin-top: -1px;\n}\n.btn-group-vertical .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical .btn:first-child {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical .btn:last-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n}\n.btn-group-justified .btn {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group[data-toggle=\"buttons\"] > .btn > input[type=\"radio\"],\n.btn-group[data-toggle=\"buttons\"] > .btn > input[type=\"checkbox\"] {\n  display: none;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: \"/\\00a0\";\n  padding: 0 5px;\n  color: #cccccc;\n}\n.breadcrumb > .active {\n  color: #999999;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  float: left;\n  padding: 4px 12px;\n  line-height: 1.428571429;\n  text-decoration: none;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-left-width: 0;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  border-left-width: 1px;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > a:focus,\n.pagination > .active > a,\n.pagination > .active > span {\n  background-color: #f5f5f5;\n}\n.pagination > .active > a,\n.pagination > .active > span {\n  color: #999999;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #999999;\n  background-color: #ffffff;\n  cursor: not-allowed;\n}\n.pagination-large > li > a,\n.pagination-large > li > span {\n  padding: 14px 16px;\n  font-size: 18px;\n}\n.pagination-large > li:first-child > a,\n.pagination-large > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-large > li:last-child > a,\n.pagination-large > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.pagination-small > li > a,\n.pagination-small > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n}\n.pagination-small > li:first-child > a,\n.pagination-small > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-small > li:last-child > a,\n.pagination-small > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager:before,\n.pager:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.pager:after {\n  clear: both;\n}\n.pager:before,\n.pager:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.pager:after {\n  clear: both;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #999999;\n  background-color: #ffffff;\n  cursor: not-allowed;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  display: none;\n  overflow: auto;\n  overflow-y: scroll;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.fade.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.modal-dialog {\n  position: relative;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: auto;\n  padding: 10px;\n  z-index: 1050;\n}\n.modal-content {\n  position: relative;\n  background-color: #ffffff;\n  border: 1px solid #999999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: none;\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n  background-color: #000000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.modal-backdrop.fade.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n  min-height: 16.428571429px;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.428571429;\n}\n.modal-body {\n  position: relative;\n  padding: 20px;\n}\n.modal-footer {\n  margin-top: 15px;\n  padding: 19px 20px 20px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.modal-footer:after {\n  clear: both;\n}\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.modal-footer:after {\n  clear: both;\n}\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n@media screen and (min-width: 768px) {\n  .modal-dialog {\n    left: 50%;\n    right: auto;\n    width: 560px;\n    margin-left: -280px;\n    padding-top: 30px;\n    padding-bottom: 30px;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1030;\n  display: block;\n  visibility: visible;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.tooltip.in {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #ffffff;\n  text-align: center;\n  text-decoration: none;\n  background-color: rgba(0, 0, 0, 0.9);\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1010;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  text-align: left;\n  background-color: #ffffff;\n  -webkit-bg-clip: padding-box;\n  -moz-bg-clip: padding;\n  background-clip: padding-box;\n  border: 1px solid #cccccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  white-space: normal;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 18px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover .arrow,\n.popover .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover .arrow {\n  border-width: 11px;\n}\n.popover .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n.popover.top .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #ffffff;\n}\n.popover.right .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #ffffff;\n}\n.popover.bottom .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #ffffff;\n}\n.popover.left .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #ffffff;\n  bottom: -10px;\n}\n.alert {\n  padding: 10px 35px 10px 15px;\n  margin-bottom: 20px;\n  color: #c09853;\n  background-color: #fcf8e3;\n  border: 1px solid #fbeed5;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert hr {\n  border-top-color: #f8e5be;\n}\n.alert .alert-link {\n  font-weight: 500;\n  color: #a47e3c;\n}\n.alert .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #468847;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #356635;\n}\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #eed3d7;\n  color: #b94a48;\n}\n.alert-danger hr {\n  border-top-color: #e6c1c7;\n}\n.alert-danger .alert-link {\n  color: #953b39;\n}\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #3a87ad;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #2d6987;\n}\n.alert-block {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n.alert-block > p,\n.alert-block > ul {\n  margin-bottom: 0;\n}\n.alert-block p + p {\n  margin-top: 5px;\n}\n.thumbnail,\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.428571429;\n  background-color: #f5f5f5;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n.thumbnail {\n  display: block;\n}\n.thumbnail > img,\n.img-thumbnail {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus {\n  border-color: #428bca;\n}\n.thumbnail > img {\n  margin-left: auto;\n  margin-right: auto;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333333;\n}\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1;\n}\n.media,\n.media .media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media-object {\n  display: block;\n}\n.media-heading {\n  margin: 0 0 5px;\n}\n.media > .pull-left {\n  margin-right: 10px;\n}\n.media > .pull-right {\n  margin-left: 10px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.label {\n  display: inline;\n  padding: .25em .6em;\n  font-size: 75%;\n  font-weight: 500;\n  line-height: 1;\n  color: #ffffff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  background-color: #999999;\n  border-radius: .25em;\n}\n.label[href]:hover,\n.label[href]:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n  background-color: #808080;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #ffffff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #999999;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\na.badge:hover,\na.badge:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\na.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #428bca;\n  background-color: #ffffff;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-moz-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-ms-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 0 0;\n  }\n  to {\n    background-position: 40px 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  color: #ffffff;\n  text-align: center;\n  background-color: #428bca;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n.progress-striped .progress-bar {\n  background-color: #428bca;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n}\n.progress.active .progress-bar {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -moz-animation: progress-bar-stripes 2s linear infinite;\n  -ms-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-color: #d9534f;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-color: #5cb85c;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-color: #f0ad4e;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-color: #5bc0de;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.accordion {\n  margin-bottom: 20px;\n}\n.accordion-group {\n  margin-bottom: 2px;\n  border: 1px solid #e5e5e5;\n  border-radius: 4px;\n}\n.accordion-heading {\n  border-bottom: 0;\n}\n.accordion-heading .accordion-toggle {\n  display: block;\n  padding: 8px 15px;\n  cursor: pointer;\n}\n.accordion-inner {\n  padding: 9px 15px;\n  border-top: 1px solid #e5e5e5;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n  line-height: 1;\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-control.left {\n  background-color: rgba(0, 0, 0, 0.0001);\n  background-image: -webkit-gradient(linear, 0% top, 100% top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.0001)));\n  background-image: -webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, 0.5) 0%), color-stop(rgba(0, 0, 0, 0.0001) 100%));\n  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n  background-color: transparent;\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  background-image: -webkit-gradient(linear, 0% top, 100% top, from(rgba(0, 0, 0, 0.0001)), to(rgba(0, 0, 0, 0.5)));\n  background-image: -webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, 0.0001) 0%), color-stop(rgba(0, 0, 0, 0.5) 100%));\n  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n  background-color: transparent;\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  color: #ffffff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.carousel-control .glyphicon,\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: 5;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203a';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 120px;\n  margin-left: -60px;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #ffffff;\n  border-radius: 10px;\n  cursor: pointer;\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #ffffff;\n}\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    margin-left: -15px;\n    font-size: 30px;\n  }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.jumbotron {\n  padding: 30px;\n  margin-bottom: 30px;\n  font-size: 21px;\n  font-weight: 200;\n  line-height: 2.1428571435;\n  color: inherit;\n  background-color: #f5f5f5;\n}\n.jumbotron h1 {\n  line-height: 1;\n  color: inherit;\n}\n.jumbotron p {\n  line-height: 1.4;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding: 50px 60px;\n    border-radius: 6px;\n  }\n  .jumbotron h1 {\n    font-size: 63px;\n  }\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.clearfix:after {\n  clear: both;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n@media screen and (max-width: 400px) {\n  @-ms-viewport {\n    width: 320px;\n  }\n}\n.hidden {\n  display: none !important;\n  visibility: hidden !important;\n}\n.visible-sm {\n  display: block !important;\n}\ntr.visible-sm {\n  display: table-row !important;\n}\nth.visible-sm,\ntd.visible-sm {\n  display: table-cell !important;\n}\n.visible-md {\n  display: none !important;\n}\ntr.visible-md {\n  display: none !important;\n}\nth.visible-md,\ntd.visible-md {\n  display: none !important;\n}\n.visible-lg {\n  display: none !important;\n}\ntr.visible-lg {\n  display: none !important;\n}\nth.visible-lg,\ntd.visible-lg {\n  display: none !important;\n}\n.hidden-sm {\n  display: none !important;\n}\ntr.hidden-sm {\n  display: none !important;\n}\nth.hidden-sm,\ntd.hidden-sm {\n  display: none !important;\n}\n.hidden-md {\n  display: block !important;\n}\ntr.hidden-md {\n  display: table-row !important;\n}\nth.hidden-md,\ntd.hidden-md {\n  display: table-cell !important;\n}\n.hidden-lg {\n  display: block !important;\n}\ntr.hidden-lg {\n  display: table-row !important;\n}\nth.hidden-lg,\ntd.hidden-lg {\n  display: table-cell !important;\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: none !important;\n  }\n  tr.visible-sm {\n    display: none !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: none !important;\n  }\n  .visible-md {\n    display: block !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n  .visible-lg {\n    display: none !important;\n  }\n  tr.visible-lg {\n    display: none !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: none !important;\n  }\n  .hidden-sm {\n    display: block !important;\n  }\n  tr.hidden-sm {\n    display: table-row !important;\n  }\n  th.hidden-sm,\n  td.hidden-sm {\n    display: table-cell !important;\n  }\n  .hidden-md {\n    display: none !important;\n  }\n  tr.hidden-md {\n    display: none !important;\n  }\n  th.hidden-md,\n  td.hidden-md {\n    display: none !important;\n  }\n  .hidden-lg {\n    display: block !important;\n  }\n  tr.hidden-lg {\n    display: table-row !important;\n  }\n  th.hidden-lg,\n  td.hidden-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) {\n  .visible-sm {\n    display: none !important;\n  }\n  tr.visible-sm {\n    display: none !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: none !important;\n  }\n  .visible-md {\n    display: none !important;\n  }\n  tr.visible-md {\n    display: none !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: none !important;\n  }\n  .visible-lg {\n    display: block !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n  .hidden-sm {\n    display: block !important;\n  }\n  tr.hidden-sm {\n    display: table-row !important;\n  }\n  th.hidden-sm,\n  td.hidden-sm {\n    display: table-cell !important;\n  }\n  .hidden-md {\n    display: block !important;\n  }\n  tr.hidden-md {\n    display: table-row !important;\n  }\n  th.hidden-md,\n  td.hidden-md {\n    display: table-cell !important;\n  }\n  .hidden-lg {\n    display: none !important;\n  }\n  tr.hidden-lg {\n    display: none !important;\n  }\n  th.hidden-lg,\n  td.hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\ntr.visible-print {\n  display: none !important;\n}\nth.visible-print,\ntd.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n  .hidden-print {\n    display: none !important;\n  }\n  tr.hidden-print {\n    display: none !important;\n  }\n  th.hidden-print,\n  td.hidden-print {\n    display: none !important;\n  }\n}\n@font-face {\n  font-family: 'fontello';\n  src: url('libs/fontello/font/fontello.eot?9854690');\n  src: url('libs/fontello/font/fontello.eot?9854690#iefix') format('embedded-opentype'), url('libs/fontello/font/fontello.woff?9854690') format('woff'), url('libs/fontello/font/fontello.ttf?9854690') format('truetype'), url('libs/fontello/font/fontello.svg?9854690#fontello') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */\n/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */\n/*\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n  @font-face {\n    font-family: 'fontello';\n    src: url('libs/fontello/font/fontello.svg?9854690#fontello') format('svg');\n  }\n}\n*/\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  font-family: \"fontello\";\n  font-style: normal;\n  font-weight: normal;\n  speak: none;\n  display: inline-block;\n  text-decoration: inherit;\n  width: 1em;\n  margin-right: .2em;\n  text-align: center;\n  /* opacity: .8; */\n\n  /* For safety - reset parent styles, that can break glyph codes*/\n\n  font-variant: normal;\n  text-transform: none;\n  /* fix buttons height, for twitter bootstrap */\n\n  line-height: 1em;\n  /* Animation center compensation - margins should be symmetric */\n\n  /* remove if not needed */\n\n  margin-left: .2em;\n  /* you can be more comfortable with increased icons size */\n\n  /* font-size: 120%; */\n\n  /* Uncomment for 3D effect */\n\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\n\n}\n.icon-plus:before {\n  content: '\\e81f';\n}\n/* '' */\n.icon-minus:before {\n  content: '\\e823';\n}\n/* '' */\n.icon-left-big:before {\n  content: '\\e88a';\n}\n/* '' */\n.icon-up-big:before {\n  content: '\\e88c';\n}\n/* '' */\n.icon-right-big:before {\n  content: '\\e88b';\n}\n/* '' */\n.icon-down-big:before {\n  content: '\\e889';\n}\n/* '' */\n.icon-home:before {\n  content: '\\e93c';\n}\n/* '' */\n.icon-pause:before {\n  content: '\\e800';\n}\n/* '' */\n.icon-fast-fw:before {\n  content: '\\e8a4';\n}\n/* '' */\n.icon-fast-bw:before {\n  content: '\\e8a5';\n}\n/* '' */\n.icon-to-end:before {\n  content: '\\e8a0';\n}\n/* '' */\n.icon-to-start:before {\n  content: '\\e8a2';\n}\n/* '' */\n.icon-stop:before {\n  content: '\\e89e';\n}\n/* '' */\n.icon-up-dir:before {\n  content: '\\e94e';\n}\n/* '' */\n.icon-play:before {\n  content: '\\e89b';\n}\n/* '' */\n.icon-right-dir:before {\n  content: '\\e950';\n}\n/* '' */\n.icon-down-dir:before {\n  content: '\\e94d';\n}\n/* '' */\n.icon-left-dir:before {\n  content: '\\e94f';\n}\n/* '' */\n.icon-cloud:before {\n  content: '\\e8ad';\n}\n/* '' */\n.icon-umbrella:before {\n  content: '\\e8b0';\n}\n/* '' */\n.icon-star:before {\n  content: '\\e808';\n}\n/* '' */\n.icon-star-empty:before {\n  content: '\\e809';\n}\n/* '' */\n.icon-check:before {\n  content: '\\e8cf';\n}\n/* '' */\n.icon-left-hand:before {\n  content: '\\e88e';\n}\n/* '' */\n.icon-up-hand:before {\n  content: '\\e88f';\n}\n/* '' */\n.icon-right-hand:before {\n  content: '\\e88d';\n}\n/* '' */\n.icon-down-hand:before {\n  content: '\\e890';\n}\n/* '' */\n.icon-th-list:before {\n  content: '\\e817';\n}\n/* '' */\n.icon-heart-empty:before {\n  content: '\\e807';\n}\n/* '' */\n.icon-heart:before {\n  content: '\\e806';\n}\n/* '' */\n.icon-music:before {\n  content: '\\e802';\n}\n/* '' */\n.icon-th:before {\n  content: '\\e816';\n}\n/* '' */\n.icon-flag:before {\n  content: '\\e838';\n}\n/* '' */\n.icon-cog:before {\n  content: '\\e862';\n}\n/* '' */\n.icon-attention:before {\n  content: '\\e851';\n}\n/* '' */\n.icon-flash:before {\n  content: '\\e8ae';\n}\n/* '' */\n.icon-cog-alt:before {\n  content: '\\e863';\n}\n/* '' */\n.icon-scissors:before {\n  content: '\\e8c5';\n}\n/* '' */\n.icon-flight:before {\n  content: '\\e8b1';\n}\n/* '' */\n.icon-mail:before {\n  content: '\\e804';\n}\n/* '' */\n.icon-edit:before {\n  content: '\\e941';\n}\n/* '' */\n.icon-pencil:before {\n  content: '\\e847';\n}\n/* '' */\n.icon-ok:before {\n  content: '\\e818';\n}\n/* '' */\n.icon-ok-circled:before {\n  content: '\\e819';\n}\n/* '' */\n.icon-cancel:before {\n  content: '\\e81c';\n}\n/* '' */\n.icon-cancel-circled:before {\n  content: '\\e81d';\n}\n/* '' */\n.icon-asterisk:before {\n  content: '\\e8d3';\n}\n/* '' */\n.icon-attention-circled:before {\n  content: '\\e852';\n}\n/* '' */\n.icon-plus-circled:before {\n  content: '\\e820';\n}\n/* '' */\n.icon-minus-circled:before {\n  content: '\\e824';\n}\n/* '' */\n.icon-forward:before {\n  content: '\\e856';\n}\n/* '' */\n.icon-ccw:before {\n  content: '\\e896';\n}\n/* '' */\n.icon-cw:before {\n  content: '\\e895';\n}\n/* '' */\n.icon-resize-vertical:before {\n  content: '\\e872';\n}\n/* '' */\n.icon-resize-horizontal:before {\n  content: '\\e873';\n}\n/* '' */\n.icon-eject:before {\n  content: '\\e8a6';\n}\n/* '' */\n.icon-trash:before {\n  content: '\\e89f';\n}\n/* '' */\n.icon-star-half:before {\n  content: '\\e80a';\n}\n/* '' */\n.icon-ok-circled2:before {\n  content: '\\e81a';\n}\n/* '' */\n.icon-cancel-circled2:before {\n  content: '\\e86f';\n}\n/* '' */\n.icon-help-circled:before {\n  content: '\\e939';\n}\n/* '' */\n.icon-info-circled:before {\n  content: '\\e93a';\n}\n/* '' */\n.icon-th-large:before {\n  content: '\\e815';\n}\n/* '' */\n.icon-eye:before {\n  content: '\\e832';\n}\n/* '' */\n.icon-eye-off:before {\n  content: '\\e833';\n}\n/* '' */\n.icon-tag:before {\n  content: '\\e834';\n}\n/* '' */\n.icon-tags:before {\n  content: '\\e835';\n}\n/* '' */\n.icon-camera-alt:before {\n  content: '\\e814';\n}\n/* '' */\n.icon-code:before {\n  content: '\\e844';\n}\n/* '' */\n.icon-print:before {\n  content: '\\e942';\n}\n/* '' */\n.icon-retweet:before {\n  content: '\\e943';\n}\n/* '' */\n.icon-comment:before {\n  content: '\\e84a';\n}\n/* '' */\n.icon-chat:before {\n  content: '\\e84b';\n}\n/* '' */\n.icon-location:before {\n  content: '\\e853';\n}\n/* '' */\n.icon-basket:before {\n  content: '\\e865';\n}\n/* '' */\n.icon-login:before {\n  content: '\\e868';\n}\n/* '' */\n.icon-logout:before {\n  content: '\\e949';\n}\n/* '' */\n.icon-resize-full:before {\n  content: '\\e90d';\n}\n/* '' */\n.icon-resize-small:before {\n  content: '\\e871';\n}\n/* '' */\n.icon-zoom-in:before {\n  content: '\\e875';\n}\n/* '' */\n.icon-zoom-out:before {\n  content: '\\e876';\n}\n/* '' */\n.icon-down-circled2:before {\n  content: '\\e877';\n}\n/* '' */\n.icon-up-circled2:before {\n  content: '\\e878';\n}\n/* '' */\n.icon-down-open:before {\n  content: '\\e879';\n}\n/* '' */\n.icon-left-open:before {\n  content: '\\e87a';\n}\n/* '' */\n.icon-right-open:before {\n  content: '\\e87b';\n}\n/* '' */\n.icon-up-open:before {\n  content: '\\e87c';\n}\n/* '' */\n.icon-refresh:before {\n  content: '\\e897';\n}\n/* '' */\n.icon-play-circled2:before {\n  content: '\\e89d';\n}\n/* '' */\n.icon-to-end-alt:before {\n  content: '\\e8a1';\n}\n/* '' */\n.icon-to-start-alt:before {\n  content: '\\e8a3';\n}\n/* '' */\n.icon-inbox:before {\n  content: '\\e8aa';\n}\n/* '' */\n.icon-font:before {\n  content: '\\e8b6';\n}\n/* '' */\n.icon-bold:before {\n  content: '\\e8b5';\n}\n/* '' */\n.icon-italic:before {\n  content: '\\e8b4';\n}\n/* '' */\n.icon-text-height:before {\n  content: '\\e8b7';\n}\n/* '' */\n.icon-text-width:before {\n  content: '\\e8b8';\n}\n/* '' */\n.icon-align-left:before {\n  content: '\\e95d';\n}\n/* '' */\n.icon-align-center:before {\n  content: '\\e95e';\n}\n/* '' */\n.icon-align-right:before {\n  content: '\\e95f';\n}\n/* '' */\n.icon-align-justify:before {\n  content: '\\e960';\n}\n/* '' */\n.icon-list:before {\n  content: '\\e8b9';\n}\n/* '' */\n.icon-indent-left:before {\n  content: '\\e8ba';\n}\n/* '' */\n.icon-indent-right:before {\n  content: '\\e8bb';\n}\n/* '' */\n.icon-off:before {\n  content: '\\e963';\n}\n/* '' */\n.icon-road:before {\n  content: '\\e964';\n}\n/* '' */\n.icon-list-alt:before {\n  content: '\\e8c9';\n}\n/* '' */\n.icon-qrcode:before {\n  content: '\\e8ca';\n}\n/* '' */\n.icon-barcode:before {\n  content: '\\e8cb';\n}\n/* '' */\n.icon-ajust:before {\n  content: '\\e8cd';\n}\n/* '' */\n.icon-tint:before {\n  content: '\\e8ce';\n}\n/* '' */\n.icon-magnet:before {\n  content: '\\e8d6';\n}\n/* '' */\n.icon-move:before {\n  content: '\\e874';\n}\n/* '' */\n.icon-link:before {\n  content: '\\e83f';\n}\n/* '' */\n.icon-share:before {\n  content: '\\e912';\n}\n/* '' */\n.icon-hdd:before {\n  content: '\\e841';\n}\n/* '' */\n.icon-link-ext:before {\n  content: '\\e82b';\n}\n/* '' */\n.icon-check-empty:before {\n  content: '\\e8d0';\n}\n/* '' */\n.icon-bookmark-empty:before {\n  content: '\\e837';\n}\n/* '' */\n.icon-phone-squared:before {\n  content: '\\e860';\n}\n/* '' */\n.icon-rss:before {\n  content: '\\e85d';\n}\n/* '' */\n.icon-certificate:before {\n  content: '\\e8dd';\n}\n/* '' */\n.icon-left-circled:before {\n  content: '\\e891';\n}\n/* '' */\n.icon-right-circled:before {\n  content: '\\e892';\n}\n/* '' */\n.icon-up-circled:before {\n  content: '\\e893';\n}\n/* '' */\n.icon-down-circled:before {\n  content: '\\e894';\n}\n/* '' */\n.icon-tasks:before {\n  content: '\\e8de';\n}\n/* '' */\n.icon-filter:before {\n  content: '\\e8df';\n}\n/* '' */\n.icon-resize-full-alt:before {\n  content: '\\e870';\n}\n/* '' */\n.icon-beaker:before {\n  content: '\\e8e0';\n}\n/* '' */\n.icon-docs:before {\n  content: '\\e858';\n}\n/* '' */\n.icon-menu:before {\n  content: '\\e861';\n}\n/* '' */\n.icon-list-bullet:before {\n  content: '\\e8bc';\n}\n/* '' */\n.icon-list-numbered:before {\n  content: '\\e8bd';\n}\n/* '' */\n.icon-strike:before {\n  content: '\\e8be';\n}\n/* '' */\n.icon-underline:before {\n  content: '\\e8bf';\n}\n/* '' */\n.icon-table:before {\n  content: '\\e8c2';\n}\n/* '' */\n.icon-magic:before {\n  content: '\\e8e1';\n}\n/* '' */\n.icon-money:before {\n  content: '\\e8e3';\n}\n/* '' */\n.icon-columns:before {\n  content: '\\e8c3';\n}\n/* '' */\n.icon-sort:before {\n  content: '\\e8ec';\n}\n/* '' */\n.icon-sort-down:before {\n  content: '\\e8ed';\n}\n/* '' */\n.icon-sort-up:before {\n  content: '\\e8ee';\n}\n/* '' */\n.icon-mail-alt:before {\n  content: '\\e805';\n}\n/* '' */\n.icon-gauge:before {\n  content: '\\e8f6';\n}\n/* '' */\n.icon-comment-empty:before {\n  content: '\\e84c';\n}\n/* '' */\n.icon-chat-empty:before {\n  content: '\\e84d';\n}\n/* '' */\n.icon-sitemap:before {\n  content: '\\e8f7';\n}\n/* '' */\n.icon-paste:before {\n  content: '\\e8c6';\n}\n/* '' */\n.icon-lightbulb:before {\n  content: '\\e86d';\n}\n/* '' */\n.icon-exchange:before {\n  content: '\\e957';\n}\n/* '' */\n.icon-download-cloud:before {\n  content: '\\e83d';\n}\n/* '' */\n.icon-upload-cloud:before {\n  content: '\\e83e';\n}\n/* '' */\n.icon-user-md:before {\n  content: '\\e8fc';\n}\n/* '' */\n.icon-stethoscope:before {\n  content: '\\e8fd';\n}\n/* '' */\n.icon-suitcase:before {\n  content: '\\e8c8';\n}\n/* '' */\n.icon-bell-alt:before {\n  content: '\\e84f';\n}\n/* '' */\n.icon-coffee:before {\n  content: '\\e8f9';\n}\n/* '' */\n.icon-food:before {\n  content: '\\e8fa';\n}\n/* '' */\n.icon-doc-text:before {\n  content: '\\e945';\n}\n/* '' */\n.icon-building:before {\n  content: '\\e902';\n}\n/* '' */\n.icon-hospital:before {\n  content: '\\e901';\n}\n/* '' */\n.icon-ambulance:before {\n  content: '\\e8fe';\n}\n/* '' */\n.icon-medkit:before {\n  content: '\\e8ff';\n}\n/* '' */\n.icon-fighter-jet:before {\n  content: '\\e8b2';\n}\n/* '' */\n.icon-beer:before {\n  content: '\\e8fb';\n}\n/* '' */\n.icon-h-sigh:before {\n  content: '\\e900';\n}\n/* '' */\n.icon-plus-squared:before {\n  content: '\\e821';\n}\n/* '' */\n.icon-angle-double-left:before {\n  content: '\\e885';\n}\n/* '' */\n.icon-angle-double-right:before {\n  content: '\\e886';\n}\n/* '' */\n.icon-angle-double-up:before {\n  content: '\\e887';\n}\n/* '' */\n.icon-angle-double-down:before {\n  content: '\\e888';\n}\n/* '' */\n.icon-angle-left:before {\n  content: '\\e87d';\n}\n/* '' */\n.icon-angle-right:before {\n  content: '\\e87e';\n}\n/* '' */\n.icon-angle-up:before {\n  content: '\\e87f';\n}\n/* '' */\n.icon-angle-down:before {\n  content: '\\e880';\n}\n/* '' */\n.icon-desktop:before {\n  content: '\\e95a';\n}\n/* '' */\n.icon-laptop:before {\n  content: '\\e95b';\n}\n/* '' */\n.icon-tablet:before {\n  content: '\\e95c';\n}\n/* '' */\n.icon-mobile:before {\n  content: '\\e8a9';\n}\n/* '' */\n.icon-circle-empty:before {\n  content: '\\e8d2';\n}\n/* '' */\n.icon-quote-left:before {\n  content: '\\e842';\n}\n/* '' */\n.icon-quote-right:before {\n  content: '\\e843';\n}\n/* '' */\n.icon-spinner:before {\n  content: '\\e8f8';\n}\n/* '' */\n.icon-circle:before {\n  content: '\\e8d1';\n}\n/* '' */\n.icon-reply:before {\n  content: '\\e845';\n}\n/* '' */\n.icon-folder-empty:before {\n  content: '\\e85a';\n}\n/* '' */\n.icon-folder-open-empty:before {\n  content: '\\e85b';\n}\n/* '' */\n.icon-plus-squared-small:before {\n  content: '\\e822';\n}\n/* '' */\n.icon-minus-squared-small:before {\n  content: '\\e827';\n}\n/* '' */\n.icon-smile:before {\n  content: '\\e903';\n}\n/* '' */\n.icon-frown:before {\n  content: '\\e904';\n}\n/* '' */\n.icon-meh:before {\n  content: '\\e905';\n}\n/* '' */\n.icon-gamepad:before {\n  content: '\\e849';\n}\n/* '' */\n.icon-keyboard:before {\n  content: '\\e944';\n}\n/* '' */\n.icon-flag-empty:before {\n  content: '\\e93d';\n}\n/* '' */\n.icon-flag-checkered:before {\n  content: '\\e93e';\n}\n/* '' */\n.icon-terminal:before {\n  content: '\\e907';\n}\n/* '' */\n.icon-reply-all:before {\n  content: '\\e840';\n}\n/* '' */\n.icon-star-half-alt:before {\n  content: '\\e80b';\n}\n/* '' */\n.icon-direction:before {\n  content: '\\e854';\n}\n/* '' */\n.icon-crop:before {\n  content: '\\e8c4';\n}\n/* '' */\n.icon-fork:before {\n  content: '\\e8da';\n}\n/* '' */\n.icon-unlink:before {\n  content: '\\e82a';\n}\n/* '' */\n.icon-help:before {\n  content: '\\e828';\n}\n/* '' */\n.icon-info:before {\n  content: '\\e93b';\n}\n/* '' */\n.icon-attention-alt:before {\n  content: '\\e850';\n}\n/* '' */\n.icon-superscript:before {\n  content: '\\e8c0';\n}\n/* '' */\n.icon-subscript:before {\n  content: '\\e8c1';\n}\n/* '' */\n.icon-eraser:before {\n  content: '\\e908';\n}\n/* '' */\n.icon-puzzle:before {\n  content: '\\e909';\n}\n/* '' */\n.icon-mic:before {\n  content: '\\e94a';\n}\n/* '' */\n.icon-mute:before {\n  content: '\\e94b';\n}\n/* '' */\n.icon-shield:before {\n  content: '\\e90a';\n}\n/* '' */\n.icon-calendar-empty:before {\n  content: '\\e867';\n}\n/* '' */\n.icon-extinguisher:before {\n  content: '\\e90b';\n}\n/* '' */\n.icon-rocket:before {\n  content: '\\e8db';\n}\n/* '' */\n.icon-angle-circled-left:before {\n  content: '\\e881';\n}\n/* '' */\n.icon-angle-circled-right:before {\n  content: '\\e882';\n}\n/* '' */\n.icon-angle-circled-up:before {\n  content: '\\e883';\n}\n/* '' */\n.icon-angle-circled-down:before {\n  content: '\\e884';\n}\n/* '' */\n.icon-anchor:before {\n  content: '\\e906';\n}\n/* '' */\n.icon-lock-open-alt:before {\n  content: '\\e830';\n}\n/* '' */\n.icon-bullseye:before {\n  content: '\\e90c';\n}\n/* '' */\n.icon-ellipsis:before {\n  content: '\\e961';\n}\n/* '' */\n.icon-ellipsis-vert:before {\n  content: '\\e962';\n}\n/* '' */\n.icon-rss-squared:before {\n  content: '\\e85e';\n}\n/* '' */\n.icon-play-circled:before {\n  content: '\\e89c';\n}\n/* '' */\n.icon-ticket:before {\n  content: '\\e8d8';\n}\n/* '' */\n.icon-minus-squared:before {\n  content: '\\e825';\n}\n/* '' */\n.icon-minus-squared-alt:before {\n  content: '\\e826';\n}\n/* '' */\n.icon-level-up:before {\n  content: '\\e898';\n}\n/* '' */\n.icon-level-down:before {\n  content: '\\e955';\n}\n/* '' */\n.icon-ok-squared:before {\n  content: '\\e81b';\n}\n/* '' */\n.icon-pencil-squared:before {\n  content: '\\e848';\n}\n/* '' */\n.icon-link-ext-alt:before {\n  content: '\\e82c';\n}\n/* '' */\n.icon-export-alt:before {\n  content: '\\e846';\n}\n/* '' */\n.icon-compass:before {\n  content: '\\e855';\n}\n/* '' */\n.icon-collapse:before {\n  content: '\\e958';\n}\n/* '' */\n.icon-collapse-top:before {\n  content: '\\e899';\n}\n/* '' */\n.icon-expand:before {\n  content: '\\e89a';\n}\n/* '' */\n.icon-euro:before {\n  content: '\\e8e4';\n}\n/* '' */\n.icon-pound:before {\n  content: '\\e8e5';\n}\n/* '' */\n.icon-dollar:before {\n  content: '\\e8e6';\n}\n/* '' */\n.icon-rupee:before {\n  content: '\\e8e7';\n}\n/* '' */\n.icon-yen:before {\n  content: '\\e8e8';\n}\n/* '' */\n.icon-renminbi:before {\n  content: '\\e8e9';\n}\n/* '' */\n.icon-won:before {\n  content: '\\e8ea';\n}\n/* '' */\n.icon-bitcoin:before {\n  content: '\\e8eb';\n}\n/* '' */\n.icon-file:before {\n  content: '\\e946';\n}\n/* '' */\n.icon-doc-text-inv:before {\n  content: '\\e947';\n}\n/* '' */\n.icon-sort-name-up:before {\n  content: '\\e8f1';\n}\n/* '' */\n.icon-sort-name-down:before {\n  content: '\\e8f2';\n}\n/* '' */\n.icon-sort-alt-up:before {\n  content: '\\e8ef';\n}\n/* '' */\n.icon-sort-alt-down:before {\n  content: '\\e8f0';\n}\n/* '' */\n.icon-sort-number-up:before {\n  content: '\\e8f3';\n}\n/* '' */\n.icon-sort-number-down:before {\n  content: '\\e8f4';\n}\n/* '' */\n.icon-thumbs-up-alt:before {\n  content: '\\e839';\n}\n/* '' */\n.icon-thumbs-down-alt:before {\n  content: '\\e83a';\n}\n/* '' */\n.icon-down:before {\n  content: '\\e951';\n}\n/* '' */\n.icon-up:before {\n  content: '\\e954';\n}\n/* '' */\n.icon-right:before {\n  content: '\\e953';\n}\n/* '' */\n.icon-left:before {\n  content: '\\e952';\n}\n/* '' */\n.icon-female:before {\n  content: '\\e80f';\n}\n/* '' */\n.icon-male:before {\n  content: '\\e80e';\n}\n/* '' */\n.icon-sun:before {\n  content: '\\e8ac';\n}\n/* '' */\n.icon-moon:before {\n  content: '\\e8af';\n}\n/* '' */\n.icon-box:before {\n  content: '\\e85c';\n}\n/* '' */\n.icon-bug:before {\n  content: '\\e8dc';\n}\n/* '' */\n.icon-picture:before {\n  content: '\\e812';\n}\n/* '' */\n.icon-globe:before {\n  content: '\\e8ab';\n}\n/* '' */\n.icon-leaf:before {\n  content: '\\e8b3';\n}\n/* '' */\n.icon-glass:before {\n  content: '\\e801';\n}\n/* '' */\n.icon-gift:before {\n  content: '\\e8d4';\n}\n/* '' */\n.icon-videocam:before {\n  content: '\\e811';\n}\n/* '' */\n.icon-headphones:before {\n  content: '\\e86b';\n}\n/* '' */\n.icon-video:before {\n  content: '\\e810';\n}\n/* '' */\n.icon-target:before {\n  content: '\\e8a7';\n}\n/* '' */\n.icon-award:before {\n  content: '\\e959';\n}\n/* '' */\n.icon-thumbs-up:before {\n  content: '\\e93f';\n}\n/* '' */\n.icon-thumbs-down:before {\n  content: '\\e940';\n}\n/* '' */\n.icon-user:before {\n  content: '\\e80c';\n}\n/* '' */\n.icon-users:before {\n  content: '\\e80d';\n}\n/* '' */\n.icon-credit-card:before {\n  content: '\\e965';\n}\n/* '' */\n.icon-briefcase:before {\n  content: '\\e8c7';\n}\n/* '' */\n.icon-floppy:before {\n  content: '\\e966';\n}\n/* '' */\n.icon-folder:before {\n  content: '\\e948';\n}\n/* '' */\n.icon-folder-open:before {\n  content: '\\e859';\n}\n/* '' */\n.icon-doc:before {\n  content: '\\e857';\n}\n/* '' */\n.icon-calendar:before {\n  content: '\\e866';\n}\n/* '' */\n.icon-chart-bar:before {\n  content: '\\e90f';\n}\n/* '' */\n.icon-pin:before {\n  content: '\\e831';\n}\n/* '' */\n.icon-attach:before {\n  content: '\\e82d';\n}\n/* '' */\n.icon-book:before {\n  content: '\\e8cc';\n}\n/* '' */\n.icon-phone:before {\n  content: '\\e85f';\n}\n/* '' */\n.icon-megaphone:before {\n  content: '\\e967';\n}\n/* '' */\n.icon-upload:before {\n  content: '\\e83c';\n}\n/* '' */\n.icon-download:before {\n  content: '\\e83b';\n}\n/* '' */\n.icon-signal:before {\n  content: '\\e8a8';\n}\n/* '' */\n.icon-camera:before {\n  content: '\\e813';\n}\n/* '' */\n.icon-shuffle:before {\n  content: '\\e956';\n}\n/* '' */\n.icon-volume-off:before {\n  content: '\\e94c';\n}\n/* '' */\n.icon-volume-down:before {\n  content: '\\e869';\n}\n/* '' */\n.icon-volume-up:before {\n  content: '\\e86a';\n}\n/* '' */\n.icon-search:before {\n  content: '\\e803';\n}\n/* '' */\n.icon-key:before {\n  content: '\\e8d9';\n}\n/* '' */\n.icon-lock:before {\n  content: '\\e82e';\n}\n/* '' */\n.icon-lock-open:before {\n  content: '\\e82f';\n}\n/* '' */\n.icon-bell:before {\n  content: '\\e84e';\n}\n/* '' */\n.icon-bookmark:before {\n  content: '\\e836';\n}\n/* '' */\n.icon-fire:before {\n  content: '\\e8d5';\n}\n/* '' */\n.icon-wrench:before {\n  content: '\\e864';\n}\n/* '' */\n.icon-hammer:before {\n  content: '\\e8f5';\n}\n/* '' */\n.icon-clock:before {\n  content: '\\e86c';\n}\n/* '' */\n.icon-truck:before {\n  content: '\\e8e2';\n}\n/* '' */\n.icon-block:before {\n  content: '\\e86e';\n}\n/* '' */\ndiv.jGrowl {\n  z-index: 1050;\n  color: #fff;\n}\n/** Normal Style Positions **/\ndiv.jGrowl {\n  position: absolute;\n}\nbody > div.jGrowl {\n  position: fixed;\n}\ndiv.jGrowl.top-left {\n  left: 0px;\n  top: 0px;\n}\ndiv.jGrowl.top-right {\n  right: 0px;\n  top: 0px;\n}\ndiv.jGrowl.bottom-left {\n  left: 0px;\n  bottom: 0px;\n}\ndiv.jGrowl.bottom-right {\n  right: 0px;\n  bottom: 0px;\n}\ndiv.jGrowl.center {\n  top: 0px;\n  width: 50%;\n  left: 25%;\n}\n/** Cross Browser Styling **/\ndiv.center div.jGrowl-notification,\ndiv.center div.jGrowl-closer {\n  margin-left: auto;\n  margin-right: auto;\n}\ndiv.jGrowl div.jGrowl-notification,\ndiv.jGrowl div.jGrowl-closer {\n  background-color: #777;\n  zoom: 1;\n  width: 235px;\n  padding: 15px 20px;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  text-align: left;\n  display: none;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\ndiv.jGrowl div.jGrowl-notification {\n  min-height: 40px;\n}\ndiv.jGrowl div.jGrowl-notification,\ndiv.jGrowl div.jGrowl-closer {\n  margin: 20px;\n}\ndiv.jGrowl div.jGrowl-notification div.jGrowl-header {\n  font-weight: bold;\n  font-size: .85em;\n}\ndiv.jGrowl div.jGrowl-notification div.jGrowl-close {\n  z-index: 99;\n  float: right;\n  font-weight: bold;\n  font-size: 1em;\n  cursor: pointer;\n}\ndiv.jGrowl div.jGrowl-closer {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  cursor: pointer;\n  font-size: .9em;\n  font-weight: bold;\n  text-align: center;\n}\n/** Hide jGrowl when printing **/\n@media print {\n  div.jGrowl {\n    display: none;\n  }\n}\n/* Pretty printing styles. Used with prettify.js. */\n/* SPAN elements with the classes below are added by prettyprint. */\n.pln {\n  color: #000000;\n}\n/* plain text */\n@media screen {\n  .str {\n    color: #008800;\n  }\n  /* string content */\n  .kwd {\n    color: #000088;\n  }\n  /* a keyword */\n  .com {\n    color: #880000;\n  }\n  /* a comment */\n  .typ {\n    color: #660066;\n  }\n  /* a type name */\n  .lit {\n    color: #006666;\n  }\n  /* a literal value */\n  /* punctuation, lisp open bracket, lisp close bracket */\n  .pun,\n  .opn,\n  .clo {\n    color: #666600;\n  }\n  .tag {\n    color: #000088;\n  }\n  /* a markup tag name */\n  .atn {\n    color: #660066;\n  }\n  /* a markup attribute name */\n  .atv {\n    color: #008800;\n  }\n  /* a markup attribute value */\n  .dec,\n  .var {\n    color: #660066;\n  }\n  /* a declaration; a variable name */\n  .fun {\n    color: #ff0000;\n  }\n  /* a function name */\n}\n/* Use higher contrast and text-weight for printable form. */\n@media print, projection {\n  .str {\n    color: #006600;\n  }\n  .kwd {\n    color: #006;\n    font-weight: bold;\n  }\n  .com {\n    color: #600;\n    font-style: italic;\n  }\n  .typ {\n    color: #404;\n    font-weight: bold;\n  }\n  .lit {\n    color: #004444;\n  }\n  .pun,\n  .opn,\n  .clo {\n    color: #444400;\n  }\n  .tag {\n    color: #006;\n    font-weight: bold;\n  }\n  .atn {\n    color: #440044;\n  }\n  .atv {\n    color: #006600;\n  }\n}\n/* Put a border around prettyprinted code snippets. */\n/* pre.prettyprint { padding: 2px; border: 1px solid #888 } */\n/* Specify class=linenums on a pre to get line numbering */\nol.linenums {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n/* IE indents via margin-left */\nli.L0,\nli.L1,\nli.L2,\nli.L3,\nli.L5,\nli.L6,\nli.L7,\nli.L8 {\n  list-style-type: none;\n}\n/* Alternate shading for lines */\nli.L1,\nli.L3,\nli.L5,\nli.L7,\nli.L9 {\n  background: #eeeeee;\n}\n/*\n\nOriginal style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>\n\npre code {\n  display: block; padding: 0.5em;\n  background: #F0F0F0;\n}\n*/\npre code,\npre .subst,\npre .tag .title,\npre .lisp .title,\npre .clojure .built_in,\npre .nginx .title {\n  color: black;\n}\npre .string,\npre .title,\npre .constant,\npre .parent,\npre .tag .value,\npre .rules .value,\npre .rules .value .number,\npre .preprocessor,\npre .haml .symbol,\npre .ruby .symbol,\npre .ruby .symbol .string,\npre .aggregate,\npre .template_tag,\npre .django .variable,\npre .smalltalk .class,\npre .addition,\npre .flow,\npre .stream,\npre .bash .variable,\npre .apache .tag,\npre .apache .cbracket,\npre .tex .command,\npre .tex .special,\npre .erlang_repl .function_or_atom,\npre .asciidoc .header,\npre .markdown .header,\npre .coffeescript .attribute {\n  color: #800;\n}\npre .comment,\npre .annotation,\npre .template_comment,\npre .diff .header,\npre .chunk,\npre .asciidoc .blockquote,\npre .markdown .blockquote {\n  color: #888;\n}\npre .number,\npre .date,\npre .regexp,\npre .literal,\npre .hexcolor,\npre .smalltalk .symbol,\npre .smalltalk .char,\npre .go .constant,\npre .change,\npre .lasso .variable,\npre .asciidoc .bullet,\npre .markdown .bullet,\npre .asciidoc .link_url,\npre .markdown .link_url {\n  color: #080;\n}\npre .label,\npre .javadoc,\npre .ruby .string,\npre .decorator,\npre .filter .argument,\npre .localvars,\npre .array,\npre .attr_selector,\npre .important,\npre .pseudo,\npre .pi,\npre .haml .bullet,\npre .doctype,\npre .deletion,\npre .envvar,\npre .shebang,\npre .apache .sqbracket,\npre .nginx .built_in,\npre .tex .formula,\npre .erlang_repl .reserved,\npre .prompt,\npre .asciidoc .link_label,\npre .markdown .link_label,\npre .vhdl .attribute,\npre .clojure .attribute,\npre .asciidoc .attribute,\npre .lasso .attribute,\npre .coffeescript .property {\n  color: #8888ff;\n}\npre .keyword,\npre .id,\npre .title,\npre .built_in,\npre .aggregate,\npre .css .tag,\npre .javadoctag,\npre .phpdoc,\npre .yardoctag,\npre .smalltalk .class,\npre .winutils,\npre .bash .variable,\npre .apache .tag,\npre .go .typename,\npre .tex .command,\npre .asciidoc .strong,\npre .markdown .strong,\npre .request,\npre .status {\n  font-weight: bold;\n}\npre .asciidoc .emphasis,\npre .markdown .emphasis {\n  font-style: italic;\n}\npre .nginx .built_in {\n  font-weight: normal;\n}\npre .coffeescript .javascript,\npre .javascript .xml,\npre .lasso .markup,\npre .tex .formula,\npre .xml .javascript,\npre .xml .vbscript,\npre .xml .css,\npre .xml .cdata {\n  opacity: 0.5;\n}\n/* Bootstrap */\nbody {\n  tab-size: 4;\n}\n#preview-contents {\n  padding: 19px;\n  margin-bottom: 50px;\n}\n.working {\n  cursor: progress;\n}\n.btn,\n.dropdown-menu {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n}\n/*\nOverride Bootstrap \n*/\n/*******************\n * Buttons\n *******************/\n.btn {\n  padding: 8px 11px;\n}\n.btn-primary:hover {\n  color: #ffffff;\n}\n.btn-group {\n  margin-right: 10px;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-right: 11px;\n  padding-left: 11px;\n}\n/*******************\n * Modal\n *******************/\n.modal-backdrop {\n  background-color: rgba(153, 153, 153, 0.6);\n}\n.modal-content {\n  border-width: 0;\n}\n/********************\n * Input\n ********************/\n.form-inline .col-lg-1 {\n  width: 8.333333333333332%;\n}\n.form-inline .col-lg-2 {\n  width: 16.666666666666664%;\n}\n.form-inline .col-lg-3 {\n  width: 25%;\n}\n.form-inline .col-lg-4 {\n  width: 33.33333333333333%;\n}\n.form-inline .col-lg-5 {\n  width: 41.66666666666667%;\n}\n.form-inline .col-lg-6 {\n  width: 50%;\n}\n.form-inline .col-lg-7 {\n  width: 58.333333333333336%;\n}\n.form-inline .col-lg-8 {\n  width: 66.66666666666666%;\n}\n.form-inline .col-lg-9 {\n  width: 75%;\n}\n.form-inline .col-lg-10 {\n  width: 83.33333333333334%;\n}\n.form-inline .col-lg-11 {\n  width: 91.66666666666666%;\n}\n.form-inline .col-lg-12 {\n  width: 100%;\n}\n.form-inline * {\n  float: none;\n}\n.form-control:focus {\n  border-color: #dddddd;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(128, 128, 128, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(128, 128, 128, 0.6);\n}\n.help-block {\n  font-size: 12px;\n}\n.modal textarea.error,\n.modal input.error {\n  border-color: #ff8661;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(255, 134, 97, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(255, 134, 97, 0.6);\n}\n.input-group-btn .btn {\n  border: 1px solid #dddddd;\n}\n.input-group-btn:first-child .btn {\n  border-right: 0;\n}\n.input-group-btn:last-child .btn {\n  border-left: 0;\n}\n.input-group-addon,\n.input-group-btn .btn {\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n/*******************\n * Navbar\n *******************/\n.navbar {\n  position: static;\n}\n.navbar .nav {\n  float: left;\n  margin: 6px 0 0;\n}\n.navbar .nav > li {\n  display: inline-block;\n}\n.navbar .nav.pull-right {\n  float: right;\n}\n.navbar .nav.pull-right > li > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.navbar .nav.pull-right > li > .dropdown-menu .dropdown-menu {\n  right: 100%;\n  left: auto;\n  margin-right: -1px;\n  margin-left: 0;\n}\n.navbar .btn-group > .btn,\n.navbar #file-title {\n  background-color: #dddddd;\n  border-color: #dddddd;\n}\n.navbar .btn-group > .btn:hover,\n.navbar #file-title:hover,\n.navbar .btn-group > .btn:focus,\n.navbar #file-title:focus,\n.navbar .btn-group > .btn:active,\n.navbar #file-title:active,\n.navbar .btn-group > .btn.active,\n.navbar #file-title.active {\n  background-color: #eeeeee;\n}\n.navbar .btn-group > .btn.disabled *,\n.navbar #file-title.disabled *,\n.navbar .btn-group > .btn.blocked *,\n.navbar #file-title.blocked *,\n.navbar .btn-group > .btn[disabled] *,\n.navbar #file-title[disabled] * {\n  color: rgba(51, 51, 51, 0.3);\n}\n.navbar .btn-group.open .dropdown-toggle {\n  background-color: #eeeeee;\n}\n.navbar .dropdown-submenu {\n  position: relative;\n}\n.navbar .dropdown-submenu > .dropdown-menu {\n  top: 0;\n  left: 100%;\n  margin-top: -6px;\n  margin-left: -1px;\n}\n.navbar .dropdown-submenu:hover > a {\n  color: #ffffff;\n  background-color: #7b7b7b;\n  background-image: -webkit-gradient(linear, left 0%, left 100%, from(#888888), to(#7b7b7b));\n  background-image: -webkit-linear-gradient(top, #888888, 0%, #7b7b7b, 100%);\n  background-image: -moz-linear-gradient(top, #888888 0%, #7b7b7b 100%);\n  background-image: linear-gradient(to bottom, #888888 0%, #7b7b7b 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff888888', endColorstr='#ff7b7b7b', GradientType=0);\n}\n.navbar .dropdown-submenu:hover > a:after {\n  border-left-color: #ffffff;\n}\n.navbar .dropdown-submenu:hover > .dropdown-menu {\n  display: block;\n}\n.navbar .dropdown-submenu > a:after {\n  display: block;\n  float: right;\n  width: 0;\n  height: 0;\n  margin-top: 5px;\n  margin-right: -10px;\n  border-color: transparent;\n  border-left-color: #cccccc;\n  border-style: solid;\n  border-width: 5px 0 5px 5px;\n  content: \" \";\n}\n.navbar #file-selector {\n  max-height: 500px;\n  overflow-y: auto;\n}\n.navbar #file-selector .stick {\n  padding: 10px 20px 0;\n}\n.navbar #file-title {\n  padding: 4px 15px;\n  margin-left: -20px;\n  font-size: 20px;\n  font-weight: 200;\n  color: #666;\n}\n.navbar #file-title i {\n  margin-right: 10px;\n}\n.navbar .working-indicator {\n  background-image: none !important;\n  width: 43px;\n  height: 11px;\n  background-position: 0 0;\n  margin-right: 30px;\n}\n.navbar .working-indicator.show {\n  background-image: url(\"../img/ajax-loader.gif\") !important;\n}\n/********************\n * Extensions buttons\n ********************/\n#extension-buttons {\n  margin-right: 15px;\n}\n#extension-buttons .btn-group {\n  margin: 0;\n}\n#extension-buttons .link-container {\n  min-width: 280px;\n  white-space: normal;\n}\n#extension-buttons .link-container .link-list {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n#extension-buttons .link-container .link-list > * {\n  margin-bottom: 10px;\n}\n#extension-buttons > .btn-group > .btn,\n#extension-preview-buttons > .btn-group > .btn {\n  border-radius: 0;\n}\n#extension-buttons > .btn-group:first-child > .btn,\n#extension-preview-buttons > .btn-group:first-child > .btn {\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n#extension-buttons > .btn-group:last-child > .btn,\n#extension-preview-buttons > .btn-group:last-child > .btn {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n/********************\n * Preview extensions buttons\n ********************/\n#extension-preview-buttons,\n#extension-preview-buttons .dropdown-menu {\n  position: fixed;\n  right: 25px;\n  top: auto;\n  z-index: 1;\n}\n#extension-preview-buttons .dropdown-menu {\n  border: 0 !important;\n  margin-top: 1px;\n}\n#extension-preview-buttons .btn {\n  background-color: rgba(221, 221, 221, 0.5);\n  float: none;\n}\n#extension-preview-buttons .btn i {\n  color: rgba(82, 82, 82, 0.3);\n}\n#extension-preview-buttons .btn:hover i,\n#extension-preview-buttons .btn:focus i,\n#extension-preview-buttons .btn:active i,\n#extension-preview-buttons .btn.active i {\n  color: #525252;\n}\n#extension-preview-buttons .btn-group {\n  margin: 0 0 0 1px;\n}\n#extension-preview-buttons .btn-group .btn {\n  position: initial;\n}\n#extension-preview-buttons .btn-group.open .btn {\n  background-color: #e8e8e8;\n}\n#extension-preview-buttons .btn-group.open .btn i {\n  color: #525252;\n}\n#extension-preview-buttons .dropdown-menu {\n  background-color: #e8e8e8;\n  padding-bottom: 20px;\n}\n#extension-preview-buttons .markdown-syntax,\n#extension-preview-buttons .table-of-contents {\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 20px;\n  margin-right: -20px;\n  width: 300px;\n}\n#extension-preview-buttons .markdown-syntax {\n  white-space: normal;\n  max-height: 350px;\n}\n#extension-preview-buttons .table-of-contents {\n  margin-left: -10px;\n  max-height: 400px;\n}\n#extension-preview-buttons .table-of-contents ul {\n  margin-left: 10px;\n  padding-left: 10px;\n}\n/*********************\n * Markdown\n *********************/\ncode {\n  color: #333333;\n  background-color: rgba(0, 0, 0, 0.05);\n}\na code {\n  color: inherit;\n}\nh1 {\n  margin: 30px 0 30px;\n}\n.toc ul {\n  list-style-type: none;\n}\np,\npre,\nblockquote {\n  margin: 0 0 20px;\n}\nhr {\n  border-top: 1px solid #ddd;\n  margin: 30px 0;\n}\n.dropdown-menu i {\n  margin-right: 5px;\n}\n#wmd-input {\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n#wmd-input,\n#md-section-helper {\n  resize: none;\n  border: none !important;\n}\n.preview-container {\n  overflow: auto;\n}\n.wmd-button-row {\n  padding: 0;\n  margin-left: 10px;\n}\n.wmd-spacer {\n  display: none;\n}\n.wmd-spacer + .wmd-button {\n  margin-left: 20px;\n}\n.wmd-prompt-background {\n  display: none;\n}\n.wmd-prompt-dialog {\n  border: 1px solid #999999;\n  background-color: #f5f5f5;\n}\n.wmd-prompt-dialog > div {\n  font-size: 0.8em;\n  font-family: arial, helvetica, sans-serif;\n}\n.wmd-prompt-dialog > form > input[type=\"text\"] {\n  border: 1px solid #999999;\n  color: black;\n}\n.wmd-prompt-dialog > form > input[type=\"button\"] {\n  border: 1px solid #888888;\n  font-family: trebuchet MS, helvetica, sans-serif;\n  font-size: 0.8em;\n  font-weight: bold;\n}\n.dropdown-menu .divider.with-text {\n  height: auto;\n  margin-bottom: 2px;\n  background-color: transparent;\n  border-top: 1px solid #e5e5e5;\n  color: #ccc;\n  font-variant: small-caps;\n  font-weight: bold;\n  padding-left: 20px;\n  cursor: default;\n}\ndiv.dropdown-menu {\n  padding: 5px 20px;\n}\ndiv.dropdown-menu p,\ndiv.dropdown-menu blockquote {\n  margin: 10px 0;\n}\ndiv.dropdown-menu .stat {\n  margin-bottom: 10px;\n}\ndiv.dropdown-menu i {\n  margin-right: 0;\n}\ndiv.dropdown-menu textarea {\n  width: 250px;\n  height: 150px;\n  resize: none;\n}\n.footnote {\n  vertical-align: top;\n  position: relative;\n  top: -0.5em;\n  font-size: 0.8em;\n}\n/***********************\n * Icons\n ***********************/\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  color: #525252;\n  display: inline-block;\n  line-height: 14px;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n}\n[class^=\"icon-\"].icon-white,\n[class*=\" icon-\"].icon-white,\n.dropdown-menu > li:hover > a > [class^=\"icon-\"],\n.dropdown-menu > li:hover > a > [class*=\" icon-\"] {\n  color: #fff;\n}\n.icon-down-dir {\n  margin-right: -5px;\n}\n.icon-code {\n  font-size: 80%;\n  margin-left: -1px;\n  margin-right: 5px;\n}\n.icon-chart-bar {\n  font-size: 90%;\n  margin-right: 2px;\n}\n.icon-trash {\n  font-size: 90%;\n}\n.icon-stackedit {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -1px 0;\n}\n.icon-gdrive {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -19px 0;\n}\n.icon-gdrive.realtime {\n  width: 18px;\n  background-position: -162px 0;\n}\n.icon-dropbox {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -37px 0;\n}\n.icon-github,\n.icon-gist {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -55px 0;\n}\n.icon-blogger {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -73px 0;\n}\n.icon-tumblr {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -91px 0;\n}\n.icon-wordpress {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -109px 0;\n}\n.icon-ssh {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -127px 0;\n}\n.icon-gplus {\n  background-image: url(\"../img/icons.png\") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -145px 0;\n}\n.ui-layout-toggler-north .caret,\n.ui-layout-toggler-south .caret {\n  margin-top: 5px;\n}\n.ui-layout-toggler-north-open .caret,\n.ui-layout-toggler-south-closed .caret {\n  border-bottom: 5px solid #525252;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  border-top: 0;\n}\n.ui-layout-toggler-north-closed .caret,\n.ui-layout-toggler-south-open .caret {\n  border-top: 5px solid #525252;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  border-bottom: 0;\n}\n.ui-layout-toggler-east .caret,\n.ui-layout-toggler-west .caret {\n  margin-top: 40px;\n}\n.ui-layout-toggler-east-open .caret,\n.ui-layout-toggler-west-closed .caret {\n  border-bottom: 5px solid transparent;\n  border-top: 5px solid transparent;\n  border-left: 5px solid #525252;\n  border-right: 0;\n}\n.ui-layout-toggler-east-closed .caret,\n.ui-layout-toggler-west-opened .caret {\n  border-bottom: 5px solid transparent;\n  border-top: 5px solid transparent;\n  border-right: 5px solid #525252;\n  border-left: 0;\n}\n/* Google picker */\n.picker-dialog {\n  z-index: 1050 !important;\n}\n.action-import-image-gplus {\n  float: left;\n}\n/**************************\n * Settings\n **************************/\n#modal-settings .modal-header {\n  padding-bottom: 0;\n}\n#modal-settings .form-horizontal {\n  margin-top: 10px;\n}\n#modal-settings textarea {\n  max-width: 100%;\n  min-height: 100px;\n}\n#modal-settings .modal-body {\n  max-height: 450px;\n  overflow: auto;\n}\n#modal-settings .accordion-group {\n  border: 0;\n  border-bottom: 1px solid #f2f2f2;\n  border-radius: inherit;\n  margin-bottom: 10px;\n  clear: both;\n}\n#modal-settings .accordion-heading {\n  padding: 8px 15px;\n}\n#modal-settings .accordion-heading .accordion-toggle {\n  display: inline;\n  padding: 0;\n}\n#modal-settings .accordion-heading .checkbox {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n#modal-settings .accordion-inner {\n  border: 0;\n  padding: 10px 40px;\n}\n#modal-settings .accordion-inner .form-horizontal .control-label {\n  text-align: left;\n}\n#modal-settings .accordion-inner .form-horizontal .form-inline .label-text {\n  margin-left: 15px;\n}\n#modal-settings .tab-pane-button-container {\n  width: 200px;\n  margin: 10px auto 20px;\n}\n#modal-settings .tab-pane-button-container .btn {\n  text-align: initial;\n  padding-left: 15px;\n}\n#modal-settings .nav-tabs {\n  border-bottom: 1px solid transparent;\n  margin: 15px 0 0;\n}\n#modal-settings .nav-tabs > li > a:hover,\n#modal-settings .nav-tabs > li > a:focus {\n  background-color: #f2f2f2;\n}\n#modal-settings .nav-tabs > li.active > a,\n#modal-settings .nav-tabs > li.active > a:hover,\n#modal-settings .nav-tabs > li.active > a:focus {\n  color: #ffffff;\n  background-color: #777777;\n  border-color: #777777;\n}\n/*\n.nav>li>a:hover,.nav>li>a:focus {\n	background-color: @bg-light;\n}\n*/\n.tooltip-inner {\n  text-align: left;\n}\n.tooltip li {\n  line-height: 1.4;\n}\ncode,\npre {\n  font-family: Menlo, Consolas, \"Courier New\", monospace;\n}\n/* Definition list */\ndt,\ndd {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\ndd {\n  margin-left: 40px;\n}\n/* Table style */\ntable {\n  margin-bottom: 20px;\n}\ntable th,\ntable td {\n  padding: 8px;\n  line-height: 20px;\n  text-align: left;\n  vertical-align: top;\n  border-top: 1px solid #dddddd;\n}\ntable th {\n  font-weight: bold;\n}\ntable thead th {\n  vertical-align: bottom;\n}\ntable caption + thead tr:first-child th,\ntable caption + thead tr:first-child td,\ntable colgroup + thead tr:first-child th,\ntable colgroup + thead tr:first-child td,\ntable thead:first-child tr:first-child th,\ntable thead:first-child tr:first-child td {\n  border-top: 0;\n}\ntable tbody + tbody {\n  border-top: 2px solid #dddddd;\n}\n#preview-contents blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\nblockquote p {\n  margin-bottom: 20px;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 20px;\n}\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nul,\nol {\n  margin-bottom: 20px;\n}\ninput[type=\"file\"] {\n  line-height: inherit;\n  height: inherit;\n  border: none !important;\n}\n.drop-zone {\n  border: 2px dashed #bbb;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  padding: 40px;\n  text-align: center;\n  font-size: 24px;\n  color: #bbb;\n}\n#modal-import-harddrive-html textarea {\n  width: 500px;\n  max-width: 500px;\n  height: 100px;\n}\n#md-section-helper {\n  position: absolute;\n  top: -100px;\n  height: 1px;\n  padding: 0 6px;\n  overflow-y: scroll;\n  z-index: -1;\n}\n.lock-ui {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n}\n.gecko #md-section-helper {\n  /* Firefox doesn't show the scrollbar if height is less than 40px */\n\n  height: 40px;\n}\n.opera #md-section-helper {\n  /* Opera needs to have the textarea in the viewport to evaluate size correctly */\n\n  top: 0;\n}\n/* Viewer */\n.viewer #navbar {\n  position: fixed;\n}\n.viewer .navbar-inner {\n  background-color: rgba(215, 215, 215, 0.75) !important;\n}\n.viewer #preview-contents {\n  max-width: 1024px;\n  margin: 50px auto;\n}\n.viewer .btn-group {\n  margin-right: 0;\n  margin-left: 0;\n}\n", !0);
}), requirejs.s.contexts._.nextTick = requirejs.nextTick;