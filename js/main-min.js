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

/*
 * LESS - Leaner CSS v1.4.2
 * http://lesscss.org
 *
 * Copyright (c) 2009-2013, Alexis Sellier
 * Licensed under the Apache 2.0 License.
 *
 * @licence
 */

// Copyright (c) 2006-2009 Hampton Catlin, Nathan Weizenbaum, and Chris Eppstein

function printStackTrace(e) {
 e = e || {
  guess: !0
 };
 var t = e.e || null, n = !!e.guess, o = new printStackTrace.implementation(), i = o.run(t);
 return n ? o.guessAnonymousFunctions(i) : i;
}

function runDelayedFunction() {
 void 0 !== delayedFunction && delayedFunction();
}

function log(e) {
 window.console && showLog && console.log(e);
}

function css_browser_selector(e) {
 function t() {
  var e = window.outerWidth || y.clientWidth, t = window.outerHeight || y.clientHeight;
  n.orientation = t > e ? "portrait" : "landscape", y.className = y.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");
  for (var r = i - 1; r >= 0; r--) if (e >= o[r]) {
   n.maxw = o[r];
   break;
  }
  widthClasses = "";
  for (var a in n) widthClasses += " " + a + "_" + n[a];
  return y.className = y.className + widthClasses, widthClasses;
 }
 var n = {}, o = [ 320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560 ], i = o.length, r = e.toLowerCase(), a = function(e) {
  return RegExp(e, "i").test(r);
 }, s = function(e, t) {
  t = t.replace(".", "_");
  for (var n = t.indexOf("_"), o = ""; n > 0; ) o += " " + e + t.substring(0, n), 
  n = t.indexOf("_", n + 1);
  return o += " " + e + t;
 }, l = "gecko", c = "webkit", u = "chrome", d = "firefox", p = "safari", f = "opera", h = "mobile", g = "android", m = "blackberry", b = "lang_", v = "device_", y = document.documentElement, x = [ !/opera|webtv/i.test(r) && /msie\s(\d+)/.test(r) ? "ie ie" + (/trident\/4\.0/.test(r) ? "8" : RegExp.$1) : a("firefox/") ? l + " " + d + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + d + RegExp.$2 + " " + d + RegExp.$2 + "_" + RegExp.$4 : "") : a("gecko/") ? l : a("opera") ? f + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$4 : /opera(\s|\/)(\d+)\.(\d+)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$3 : "") : a("konqueror") ? "konqueror" : a("blackberry") ? m + (/Version\/(\d+)(\.(\d+)+)/i.test(r) ? " " + m + RegExp.$1 + " " + m + RegExp.$1 + RegExp.$2.replace(".", "_") : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(r) ? " " + m + RegExp.$2 + (RegExp.$3 ? " " + m + RegExp.$2 + RegExp.$3 : "") : "") : a("android") ? g + (/Version\/(\d+)(\.(\d+))+/i.test(r) ? " " + g + RegExp.$1 + " " + g + RegExp.$1 + RegExp.$2.replace(".", "_") : "") + (/Android (.+); (.+) Build/i.test(r) ? " " + v + RegExp.$2.replace(/ /g, "_").replace(/-/g, "_") : "") : a("chrome") ? c + " " + u + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + u + RegExp.$2 + (RegExp.$4 > 0 ? " " + u + RegExp.$2 + "_" + RegExp.$4 : "") : "") : a("iron") ? c + " iron" : a("applewebkit/") ? c + " " + p + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + p + RegExp.$2 + " " + p + RegExp.$2 + RegExp.$3.replace(".", "_") : / Safari\/(\d+)/i.test(r) ? "419" == RegExp.$1 || "417" == RegExp.$1 || "416" == RegExp.$1 || "412" == RegExp.$1 ? " " + p + "2_0" : "312" == RegExp.$1 ? " " + p + "1_3" : "125" == RegExp.$1 ? " " + p + "1_2" : "85" == RegExp.$1 ? " " + p + "1_0" : "" : "") : a("mozilla/") ? l : "", a("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk") ? h : "", a("j2me") ? "j2me" : a("ipad|ipod|iphone") ? (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(r) ? "ios" + s("ios", RegExp.$2) : "") + " " + (/(ip(ad|od|hone))/gi.test(r) ? RegExp.$1 : "") : a("playbook") ? "playbook" : a("kindle|silk") ? "kindle" : a("playbook") ? "playbook" : a("mac") ? "mac" + (/mac os x ((\d+)[.|_](\d+))/.test(r) ? " mac" + RegExp.$2 + " mac" + RegExp.$1.replace(".", "_") : "") : a("win") ? "win" + (a("windows nt 6.2") ? " win8" : a("windows nt 6.1") ? " win7" : a("windows nt 6.0") ? " vista" : a("windows nt 5.2") || a("windows nt 5.1") ? " win_xp" : a("windows nt 5.0") ? " win_2k" : a("windows nt 4.0") || a("WinNT4.0") ? " win_nt" : "") : a("freebsd") ? "freebsd" : a("x11|linux") ? "linux" : "", /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(r) ? (b + RegExp.$2).replace("-", "_") + ("" != RegExp.$3 ? (" " + b + RegExp.$1).replace("-", "_") : "") : "", a("ipad|iphone|ipod") && !a("safari") ? "ipad_app" : "" ];
 window.onresize = t, t();
 var w = x.join(" ") + " js ";
 return y.className = (w + y.className.replace(/\b(no[-|_]?)?js\b/g, "")).replace(/^ /, "").replace(/ +/g, " "), 
 w;
}

(function(e, t) {
 function n(e) {
  var t = e.length, n = rt.type(e);
  return rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
 }
 function o(e) {
  var t = ht[e] = {};
  return rt.each(e.match(st) || [], function(e, n) {
   t[n] = !0;
  }), t;
 }
 function i() {
  Object.defineProperty(this.cache = {}, 0, {
   get: function() {
    return {};
   }
  }), this.expando = rt.expando + Math.random();
 }
 function r(e, n, o) {
  var i;
  if (o === t && 1 === e.nodeType) if (i = "data-" + n.replace(vt, "-$1").toLowerCase(), 
  o = e.getAttribute(i), "string" == typeof o) {
   try {
    o = "true" === o ? !0 : "false" === o ? !1 : "null" === o ? null : +o + "" === o ? +o : bt.test(o) ? JSON.parse(o) : o;
   } catch (r) {}
   gt.set(e, n, o);
  } else o = t;
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
   return W.activeElement;
  } catch (e) {}
 }
 function c(e, t) {
  for (;(e = e[t]) && 1 !== e.nodeType; ) ;
  return e;
 }
 function u(e, t, n) {
  if (rt.isFunction(t)) return rt.grep(e, function(e, o) {
   return !!t.call(e, o, e) !== n;
  });
  if (t.nodeType) return rt.grep(e, function(e) {
   return e === t !== n;
  });
  if ("string" == typeof t) {
   if (It.test(t)) return rt.filter(t, e, n);
   t = rt.filter(t, e);
  }
  return rt.grep(e, function(e) {
   return tt.call(t, e) >= 0 !== n;
  });
 }
 function d(e, t) {
  return rt.nodeName(e, "table") && rt.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
 }
 function p(e) {
  return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
 }
 function f(e) {
  var t = Dt.exec(e.type);
  return t ? e.type = t[1] : e.removeAttribute("type"), e;
 }
 function h(e, t) {
  for (var n = e.length, o = 0; n > o; o++) mt.set(e[o], "globalEval", !t || mt.get(t[o], "globalEval"));
 }
 function g(e, t) {
  var n, o, i, r, a, s, l, c;
  if (1 === t.nodeType) {
   if (mt.hasData(e) && (r = mt.access(e), a = mt.set(t, r), c = r.events)) {
    delete a.handle, a.events = {};
    for (i in c) for (n = 0, o = c[i].length; o > n; n++) rt.event.add(t, i, c[i][n]);
   }
   gt.hasData(e) && (s = gt.access(e), l = rt.extend({}, s), gt.set(t, l));
  }
 }
 function m(e, n) {
  var o = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
  return n === t || n && rt.nodeName(e, n) ? rt.merge([ e ], o) : o;
 }
 function b(e, t) {
  var n = t.nodeName.toLowerCase();
  "input" === n && Mt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
 }
 function v(e, t) {
  if (t in e) return t;
  for (var n = t.charAt(0).toUpperCase() + t.slice(1), o = t, i = Qt.length; i--; ) if (t = Qt[i] + n, 
  t in e) return t;
  return o;
 }
 function y(e, t) {
  return e = t || e, "none" === rt.css(e, "display") || !rt.contains(e.ownerDocument, e);
 }
 function x(t) {
  return e.getComputedStyle(t, null);
 }
 function w(e, t) {
  for (var n, o, i, r = [], a = 0, s = e.length; s > a; a++) o = e[a], o.style && (r[a] = mt.get(o, "olddisplay"), 
  n = o.style.display, t ? (r[a] || "none" !== n || (o.style.display = ""), "" === o.style.display && y(o) && (r[a] = mt.access(o, "olddisplay", E(o.nodeName)))) : r[a] || (i = y(o), 
  (n && "none" !== n || !i) && mt.set(o, "olddisplay", i ? n : rt.css(o, "display"))));
  for (a = 0; s > a; a++) o = e[a], o.style && (t && "none" !== o.style.display && "" !== o.style.display || (o.style.display = t ? r[a] || "" : "none"));
  return e;
 }
 function k(e, t, n) {
  var o = Gt.exec(t);
  return o ? Math.max(0, o[1] - (n || 0)) + (o[2] || "px") : t;
 }
 function S(e, t, n, o, i) {
  for (var r = n === (o ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > r; r += 2) "margin" === n && (a += rt.css(e, n + Zt[r], !0, i)), 
  o ? ("content" === n && (a -= rt.css(e, "padding" + Zt[r], !0, i)), "margin" !== n && (a -= rt.css(e, "border" + Zt[r] + "Width", !0, i))) : (a += rt.css(e, "padding" + Zt[r], !0, i), 
  "padding" !== n && (a += rt.css(e, "border" + Zt[r] + "Width", !0, i)));
  return a;
 }
 function C(e, t, n) {
  var o = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, r = x(e), a = rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, r);
  if (0 >= i || null == i) {
   if (i = qt(e, t, r), (0 > i || null == i) && (i = e.style[t]), Vt.test(i)) return i;
   o = a && (rt.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
  }
  return i + S(e, t, n || (a ? "border" : "content"), o, r) + "px";
 }
 function E(e) {
  var t = W, n = Jt[e];
  return n || (n = T(e, t), "none" !== n && n || (Bt = (Bt || rt("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
  t = (Bt[0].contentWindow || Bt[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
  t.close(), n = T(e, t), Bt.detach()), Jt[e] = n), n;
 }
 function T(e, t) {
  var n = rt(t.createElement(e)).appendTo(t.body), o = rt.css(n[0], "display");
  return n.remove(), o;
 }
 function _(e, t, n, o) {
  var i;
  if (rt.isArray(t)) rt.each(t, function(t, i) {
   n || tn.test(e) ? o(e, i) : _(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, o);
  }); else if (n || "object" !== rt.type(t)) o(e, t); else for (i in t) _(e + "[" + i + "]", t[i], n, o);
 }
 function I(e) {
  return function(t, n) {
   "string" != typeof t && (n = t, t = "*");
   var o, i = 0, r = t.toLowerCase().match(st) || [];
   if (rt.isFunction(n)) for (;o = r[i++]; ) "+" === o[0] ? (o = o.slice(1) || "*", 
   (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n);
  };
 }
 function P(e, t, n, o) {
  function i(s) {
   var l;
   return r[s] = !0, rt.each(e[s] || [], function(e, s) {
    var c = s(t, n, o);
    return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), 
    i(c), !1);
   }), l;
  }
  var r = {}, a = e === yn;
  return i(t.dataTypes[0]) || !r["*"] && i("*");
 }
 function z(e, n) {
  var o, i, r = rt.ajaxSettings.flatOptions || {};
  for (o in n) n[o] !== t && ((r[o] ? e : i || (i = {}))[o] = n[o]);
  return i && rt.extend(!0, e, i), e;
 }
 function $(e, n, o) {
  for (var i, r, a, s, l = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
  i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
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
 function N(e, t, n, o) {
  var i, r, a, s, l, c = {}, u = e.dataTypes.slice();
  if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
  for (r = u.shift(); r; ) if (e.responseFields[r] && (n[e.responseFields[r]] = t), 
  !l && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
   if (a = c[l + " " + r] || c["* " + r], !a) for (i in c) if (s = i.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
    a === !0 ? a = c[i] : c[i] !== !0 && (r = s[0], u.unshift(s[1]));
    break;
   }
   if (a !== !0) if (a && e["throws"]) t = a(t); else try {
    t = a(t);
   } catch (d) {
    return {
     state: "parsererror",
     error: a ? d : "No conversion from " + l + " to " + r
    };
   }
  }
  return {
   state: "success",
   data: t
  };
 }
 function R() {
  return setTimeout(function() {
   In = t;
  }), In = rt.now();
 }
 function L(e, t, n) {
  for (var o, i = (Ln[t] || []).concat(Ln["*"]), r = 0, a = i.length; a > r; r++) if (o = i[r].call(n, t, e)) return o;
 }
 function A(e, t, n) {
  var o, i, r = 0, a = Rn.length, s = rt.Deferred().always(function() {
   delete l.elem;
  }), l = function() {
   if (i) return !1;
   for (var t = In || R(), n = Math.max(0, c.startTime + c.duration - t), o = n / c.duration || 0, r = 1 - o, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(r);
   return s.notifyWith(e, [ c, r, n ]), 1 > r && l ? n : (s.resolveWith(e, [ c ]), 
   !1);
  }, c = s.promise({
   elem: e,
   props: rt.extend({}, t),
   opts: rt.extend(!0, {
    specialEasing: {}
   }, n),
   originalProperties: t,
   originalOptions: n,
   startTime: In || R(),
   duration: n.duration,
   tweens: [],
   createTween: function(t, n) {
    var o = rt.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
    return c.tweens.push(o), o;
   },
   stop: function(t) {
    var n = 0, o = t ? c.tweens.length : 0;
    if (i) return this;
    for (i = !0; o > n; n++) c.tweens[n].run(1);
    return t ? s.resolveWith(e, [ c, t ]) : s.rejectWith(e, [ c, t ]), this;
   }
  }), u = c.props;
  for (M(u, c.opts.specialEasing); a > r; r++) if (o = Rn[r].call(c, e, u, c.opts)) return o;
  return rt.map(u, L, c), rt.isFunction(c.opts.start) && c.opts.start.call(e, c), 
  rt.fx.timer(rt.extend(l, {
   elem: e,
   anim: c,
   queue: c.opts.queue
  })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
 }
 function M(e, t) {
  var n, o, i, r, a;
  for (n in e) if (o = rt.camelCase(n), i = t[o], r = e[n], rt.isArray(r) && (i = r[1], 
  r = e[n] = r[0]), n !== o && (e[o] = r, delete e[n]), a = rt.cssHooks[o], a && "expand" in a) {
   r = a.expand(r), delete e[o];
   for (n in r) n in e || (e[n] = r[n], t[n] = i);
  } else t[o] = i;
 }
 function j(e, n, o) {
  var i, r, a, s, l, c, u = this, d = {}, p = e.style, f = e.nodeType && y(e), h = mt.get(e, "fxshow");
  o.queue || (l = rt._queueHooks(e, "fx"), null == l.unqueued && (l.unqueued = 0, 
  c = l.empty.fire, l.empty.fire = function() {
   l.unqueued || c();
  }), l.unqueued++, u.always(function() {
   u.always(function() {
    l.unqueued--, rt.queue(e, "fx").length || l.empty.fire();
   });
  })), 1 === e.nodeType && ("height" in n || "width" in n) && (o.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
  "inline" === rt.css(e, "display") && "none" === rt.css(e, "float") && (p.display = "inline-block")), 
  o.overflow && (p.overflow = "hidden", u.always(function() {
   p.overflow = o.overflow[0], p.overflowX = o.overflow[1], p.overflowY = o.overflow[2];
  }));
  for (i in n) if (r = n[i], zn.exec(r)) {
   if (delete n[i], a = a || "toggle" === r, r === (f ? "hide" : "show")) {
    if ("show" !== r || !h || h[i] === t) continue;
    f = !0;
   }
   d[i] = h && h[i] || rt.style(e, i);
  }
  if (!rt.isEmptyObject(d)) {
   h ? "hidden" in h && (f = h.hidden) : h = mt.access(e, "fxshow", {}), a && (h.hidden = !f), 
   f ? rt(e).show() : u.done(function() {
    rt(e).hide();
   }), u.done(function() {
    var t;
    mt.remove(e, "fxshow");
    for (t in d) rt.style(e, t, d[t]);
   });
   for (i in d) s = L(f ? h[i] : 0, i, u), i in h || (h[i] = s.start, f && (s.end = s.start, 
   s.start = "width" === i || "height" === i ? 1 : 0));
  }
 }
 function O(e, t, n, o, i) {
  return new O.prototype.init(e, t, n, o, i);
 }
 function D(e, t) {
  var n, o = {
   height: e
  }, i = 0;
  for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], o["margin" + n] = o["padding" + n] = e;
  return t && (o.opacity = o.width = e), o;
 }
 function H(e) {
  return rt.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
 }
 var F, q, B = typeof t, U = e.location, W = e.document, G = W.documentElement, V = e.jQuery, X = e.$, J = {}, Y = [], K = "2.0.3", Z = Y.concat, Q = Y.push, et = Y.slice, tt = Y.indexOf, nt = J.toString, ot = J.hasOwnProperty, it = K.trim, rt = function(e, t) {
  return new rt.fn.init(e, t, F);
 }, at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, st = /\S+/g, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ut = /^-ms-/, dt = /-([\da-z])/gi, pt = function(e, t) {
  return t.toUpperCase();
 }, ft = function() {
  W.removeEventListener("DOMContentLoaded", ft, !1), e.removeEventListener("load", ft, !1), 
  rt.ready();
 };
 rt.fn = rt.prototype = {
  jquery: K,
  constructor: rt,
  init: function(e, n, o) {
   var i, r;
   if (!e) return this;
   if ("string" == typeof e) {
    if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : lt.exec(e), 
    !i || !i[1] && n) return !n || n.jquery ? (n || o).find(e) : this.constructor(n).find(e);
    if (i[1]) {
     if (n = n instanceof rt ? n[0] : n, rt.merge(this, rt.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : W, !0)), 
     ct.test(i[1]) && rt.isPlainObject(n)) for (i in n) rt.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
     return this;
    }
    return r = W.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
    this.context = W, this.selector = e, this;
   }
   return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : rt.isFunction(e) ? o.ready(e) : (e.selector !== t && (this.selector = e.selector, 
   this.context = e.context), rt.makeArray(e, this));
  },
  selector: "",
  length: 0,
  toArray: function() {
   return et.call(this);
  },
  get: function(e) {
   return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
  },
  pushStack: function(e) {
   var t = rt.merge(this.constructor(), e);
   return t.prevObject = this, t.context = this.context, t;
  },
  each: function(e, t) {
   return rt.each(this, e, t);
  },
  ready: function(e) {
   return rt.ready.promise().done(e), this;
  },
  slice: function() {
   return this.pushStack(et.apply(this, arguments));
  },
  first: function() {
   return this.eq(0);
  },
  last: function() {
   return this.eq(-1);
  },
  eq: function(e) {
   var t = this.length, n = +e + (0 > e ? t : 0);
   return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
  },
  map: function(e) {
   return this.pushStack(rt.map(this, function(t, n) {
    return e.call(t, n, t);
   }));
  },
  end: function() {
   return this.prevObject || this.constructor(null);
  },
  push: Q,
  sort: [].sort,
  splice: [].splice
 }, rt.fn.init.prototype = rt.fn, rt.extend = rt.fn.extend = function() {
  var e, n, o, i, r, a, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
  for ("boolean" == typeof s && (u = s, s = arguments[1] || {}, l = 2), "object" == typeof s || rt.isFunction(s) || (s = {}), 
  c === l && (s = this, --l); c > l; l++) if (null != (e = arguments[l])) for (n in e) o = s[n], 
  i = e[n], s !== i && (u && i && (rt.isPlainObject(i) || (r = rt.isArray(i))) ? (r ? (r = !1, 
  a = o && rt.isArray(o) ? o : []) : a = o && rt.isPlainObject(o) ? o : {}, s[n] = rt.extend(u, a, i)) : i !== t && (s[n] = i));
  return s;
 }, rt.extend({
  expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
  noConflict: function(t) {
   return e.$ === rt && (e.$ = X), t && e.jQuery === rt && (e.jQuery = V), rt;
  },
  isReady: !1,
  readyWait: 1,
  holdReady: function(e) {
   e ? rt.readyWait++ : rt.ready(!0);
  },
  ready: function(e) {
   (e === !0 ? --rt.readyWait : rt.isReady) || (rt.isReady = !0, e !== !0 && --rt.readyWait > 0 || (q.resolveWith(W, [ rt ]), 
   rt.fn.trigger && rt(W).trigger("ready").off("ready")));
  },
  isFunction: function(e) {
   return "function" === rt.type(e);
  },
  isArray: Array.isArray,
  isWindow: function(e) {
   return null != e && e === e.window;
  },
  isNumeric: function(e) {
   return !isNaN(parseFloat(e)) && isFinite(e);
  },
  type: function(e) {
   return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? J[nt.call(e)] || "object" : typeof e;
  },
  isPlainObject: function(e) {
   if ("object" !== rt.type(e) || e.nodeType || rt.isWindow(e)) return !1;
   try {
    if (e.constructor && !ot.call(e.constructor.prototype, "isPrototypeOf")) return !1;
   } catch (t) {
    return !1;
   }
   return !0;
  },
  isEmptyObject: function(e) {
   var t;
   for (t in e) return !1;
   return !0;
  },
  error: function(e) {
   throw new Error(e);
  },
  parseHTML: function(e, t, n) {
   if (!e || "string" != typeof e) return null;
   "boolean" == typeof t && (n = t, t = !1), t = t || W;
   var o = ct.exec(e), i = !n && [];
   return o ? [ t.createElement(o[1]) ] : (o = rt.buildFragment([ e ], t, i), i && rt(i).remove(), 
   rt.merge([], o.childNodes));
  },
  parseJSON: JSON.parse,
  parseXML: function(e) {
   var n, o;
   if (!e || "string" != typeof e) return null;
   try {
    o = new DOMParser(), n = o.parseFromString(e, "text/xml");
   } catch (i) {
    n = t;
   }
   return (!n || n.getElementsByTagName("parsererror").length) && rt.error("Invalid XML: " + e), 
   n;
  },
  noop: function() {},
  globalEval: function(e) {
   var t, n = eval;
   e = rt.trim(e), e && (1 === e.indexOf("use strict") ? (t = W.createElement("script"), 
   t.text = e, W.head.appendChild(t).parentNode.removeChild(t)) : n(e));
  },
  camelCase: function(e) {
   return e.replace(ut, "ms-").replace(dt, pt);
  },
  nodeName: function(e, t) {
   return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  },
  each: function(e, t, o) {
   var i, r = 0, a = e.length, s = n(e);
   if (o) {
    if (s) for (;a > r && (i = t.apply(e[r], o), i !== !1); r++) ; else for (r in e) if (i = t.apply(e[r], o), 
    i === !1) break;
   } else if (s) for (;a > r && (i = t.call(e[r], r, e[r]), i !== !1); r++) ; else for (r in e) if (i = t.call(e[r], r, e[r]), 
   i === !1) break;
   return e;
  },
  trim: function(e) {
   return null == e ? "" : it.call(e);
  },
  makeArray: function(e, t) {
   var o = t || [];
   return null != e && (n(Object(e)) ? rt.merge(o, "string" == typeof e ? [ e ] : e) : Q.call(o, e)), 
   o;
  },
  inArray: function(e, t, n) {
   return null == t ? -1 : tt.call(t, e, n);
  },
  merge: function(e, n) {
   var o = n.length, i = e.length, r = 0;
   if ("number" == typeof o) for (;o > r; r++) e[i++] = n[r]; else for (;n[r] !== t; ) e[i++] = n[r++];
   return e.length = i, e;
  },
  grep: function(e, t, n) {
   var o, i = [], r = 0, a = e.length;
   for (n = !!n; a > r; r++) o = !!t(e[r], r), n !== o && i.push(e[r]);
   return i;
  },
  map: function(e, t, o) {
   var i, r = 0, a = e.length, s = n(e), l = [];
   if (s) for (;a > r; r++) i = t(e[r], r, o), null != i && (l[l.length] = i); else for (r in e) i = t(e[r], r, o), 
   null != i && (l[l.length] = i);
   return Z.apply([], l);
  },
  guid: 1,
  proxy: function(e, n) {
   var o, i, r;
   return "string" == typeof n && (o = e[n], n = e, e = o), rt.isFunction(e) ? (i = et.call(arguments, 2), 
   r = function() {
    return e.apply(n || this, i.concat(et.call(arguments)));
   }, r.guid = e.guid = e.guid || rt.guid++, r) : t;
  },
  access: function(e, n, o, i, r, a, s) {
   var l = 0, c = e.length, u = null == o;
   if ("object" === rt.type(o)) {
    r = !0;
    for (l in o) rt.access(e, n, l, o[l], !0, a, s);
   } else if (i !== t && (r = !0, rt.isFunction(i) || (s = !0), u && (s ? (n.call(e, i), 
   n = null) : (u = n, n = function(e, t, n) {
    return u.call(rt(e), n);
   })), n)) for (;c > l; l++) n(e[l], o, s ? i : i.call(e[l], l, n(e[l], o)));
   return r ? e : u ? n.call(e) : c ? n(e[0], o) : a;
  },
  now: Date.now,
  swap: function(e, t, n, o) {
   var i, r, a = {};
   for (r in t) a[r] = e.style[r], e.style[r] = t[r];
   i = n.apply(e, o || []);
   for (r in t) e.style[r] = a[r];
   return i;
  }
 }), rt.ready.promise = function(t) {
  return q || (q = rt.Deferred(), "complete" === W.readyState ? setTimeout(rt.ready) : (W.addEventListener("DOMContentLoaded", ft, !1), 
  e.addEventListener("load", ft, !1))), q.promise(t);
 }, rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
  J["[object " + t + "]"] = t.toLowerCase();
 }), F = rt(W), function(e, t) {
  function n(e, t, n, o) {
   var i, r, a, s, l, c, u, d, h, g;
   if ((t ? t.ownerDocument || t : H) !== N && $(t), t = t || N, n = n || [], !e || "string" != typeof e) return n;
   if (1 !== (s = t.nodeType) && 9 !== s) return [];
   if (L && !o) {
    if (i = yt.exec(e)) if (a = i[1]) {
     if (9 === s) {
      if (r = t.getElementById(a), !r || !r.parentNode) return n;
      if (r.id === a) return n.push(r), n;
     } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(a)) && O(t, r) && r.id === a) return n.push(r), 
     n;
    } else {
     if (i[2]) return et.apply(n, t.getElementsByTagName(e)), n;
     if ((a = i[3]) && S.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(a)), 
     n;
    }
    if (S.qsa && (!A || !A.test(e))) {
     if (d = u = D, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
      for (c = p(e), (u = t.getAttribute("id")) ? d = u.replace(kt, "\\$&") : t.setAttribute("id", d), 
      d = "[id='" + d + "'] ", l = c.length; l--; ) c[l] = d + f(c[l]);
      h = ft.test(e) && t.parentNode || t, g = c.join(",");
     }
     if (g) try {
      return et.apply(n, h.querySelectorAll(g)), n;
     } catch (m) {} finally {
      u || t.removeAttribute("id");
     }
    }
   }
   return w(e.replace(ut, "$1"), t, n, o);
  }
  function o() {
   function e(n, o) {
    return t.push(n += " ") > E.cacheLength && delete e[t.shift()], e[n] = o;
   }
   var t = [];
   return e;
  }
  function i(e) {
   return e[D] = !0, e;
  }
  function r(e) {
   var t = N.createElement("div");
   try {
    return !!e(t);
   } catch (n) {
    return !1;
   } finally {
    t.parentNode && t.parentNode.removeChild(t), t = null;
   }
  }
  function a(e, t) {
   for (var n = e.split("|"), o = e.length; o--; ) E.attrHandle[n[o]] = t;
  }
  function s(e, t) {
   var n = t && e, o = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
   if (o) return o;
   if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
   return e ? 1 : -1;
  }
  function l(e) {
   return function(t) {
    var n = t.nodeName.toLowerCase();
    return "input" === n && t.type === e;
   };
  }
  function c(e) {
   return function(t) {
    var n = t.nodeName.toLowerCase();
    return ("input" === n || "button" === n) && t.type === e;
   };
  }
  function u(e) {
   return i(function(t) {
    return t = +t, i(function(n, o) {
     for (var i, r = e([], n.length, t), a = r.length; a--; ) n[i = r[a]] && (n[i] = !(o[i] = n[i]));
    });
   });
  }
  function d() {}
  function p(e, t) {
   var o, i, r, a, s, l, c, u = U[e + " "];
   if (u) return t ? 0 : u.slice(0);
   for (s = e, l = [], c = E.preFilter; s; ) {
    (!o || (i = dt.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(r = [])), 
    o = !1, (i = pt.exec(s)) && (o = i.shift(), r.push({
     value: o,
     type: i[0].replace(ut, " ")
    }), s = s.slice(o.length));
    for (a in E.filter) !(i = bt[a].exec(s)) || c[a] && !(i = c[a](i)) || (o = i.shift(), 
    r.push({
     value: o,
     type: a,
     matches: i
    }), s = s.slice(o.length));
    if (!o) break;
   }
   return t ? s.length : s ? n.error(e) : U(e, l).slice(0);
  }
  function f(e) {
   for (var t = 0, n = e.length, o = ""; n > t; t++) o += e[t].value;
   return o;
  }
  function h(e, t, n) {
   var o = t.dir, i = n && "parentNode" === o, r = q++;
   return t.first ? function(t, n, r) {
    for (;t = t[o]; ) if (1 === t.nodeType || i) return e(t, n, r);
   } : function(t, n, a) {
    var s, l, c, u = F + " " + r;
    if (a) {
     for (;t = t[o]; ) if ((1 === t.nodeType || i) && e(t, n, a)) return !0;
    } else for (;t = t[o]; ) if (1 === t.nodeType || i) if (c = t[D] || (t[D] = {}), 
    (l = c[o]) && l[0] === u) {
     if ((s = l[1]) === !0 || s === C) return s === !0;
    } else if (l = c[o] = [ u ], l[1] = e(t, n, a) || C, l[1] === !0) return !0;
   };
  }
  function g(e) {
   return e.length > 1 ? function(t, n, o) {
    for (var i = e.length; i--; ) if (!e[i](t, n, o)) return !1;
    return !0;
   } : e[0];
  }
  function m(e, t, n, o, i) {
   for (var r, a = [], s = 0, l = e.length, c = null != t; l > s; s++) (r = e[s]) && (!n || n(r, o, i)) && (a.push(r), 
   c && t.push(s));
   return a;
  }
  function b(e, t, n, o, r, a) {
   return o && !o[D] && (o = b(o)), r && !r[D] && (r = b(r, a)), i(function(i, a, s, l) {
    var c, u, d, p = [], f = [], h = a.length, g = i || x(t || "*", s.nodeType ? [ s ] : s, []), b = !e || !i && t ? g : m(g, p, e, s, l), v = n ? r || (i ? e : h || o) ? [] : a : b;
    if (n && n(b, v, s, l), o) for (c = m(v, f), o(c, [], s, l), u = c.length; u--; ) (d = c[u]) && (v[f[u]] = !(b[f[u]] = d));
    if (i) {
     if (r || e) {
      if (r) {
       for (c = [], u = v.length; u--; ) (d = v[u]) && c.push(b[u] = d);
       r(null, v = [], c, l);
      }
      for (u = v.length; u--; ) (d = v[u]) && (c = r ? nt.call(i, d) : p[u]) > -1 && (i[c] = !(a[c] = d));
     }
    } else v = m(v === a ? v.splice(h, v.length) : v), r ? r(null, a, v, l) : et.apply(a, v);
   });
  }
  function v(e) {
   for (var t, n, o, i = e.length, r = E.relative[e[0].type], a = r || E.relative[" "], s = r ? 1 : 0, l = h(function(e) {
    return e === t;
   }, a, !0), c = h(function(e) {
    return nt.call(t, e) > -1;
   }, a, !0), u = [ function(e, n, o) {
    return !r && (o || n !== P) || ((t = n).nodeType ? l(e, n, o) : c(e, n, o));
   } ]; i > s; s++) if (n = E.relative[e[s].type]) u = [ h(g(u), n) ]; else {
    if (n = E.filter[e[s].type].apply(null, e[s].matches), n[D]) {
     for (o = ++s; i > o && !E.relative[e[o].type]; o++) ;
     return b(s > 1 && g(u), s > 1 && f(e.slice(0, s - 1).concat({
      value: " " === e[s - 2].type ? "*" : ""
     })).replace(ut, "$1"), n, o > s && v(e.slice(s, o)), i > o && v(e = e.slice(o)), i > o && f(e));
    }
    u.push(n);
   }
   return g(u);
  }
  function y(e, t) {
   var o = 0, r = t.length > 0, a = e.length > 0, s = function(i, s, l, c, u) {
    var d, p, f, h = [], g = 0, b = "0", v = i && [], y = null != u, x = P, w = i || a && E.find.TAG("*", u && s.parentNode || s), k = F += null == x ? 1 : Math.random() || .1;
    for (y && (P = s !== N && s, C = o); null != (d = w[b]); b++) {
     if (a && d) {
      for (p = 0; f = e[p++]; ) if (f(d, s, l)) {
       c.push(d);
       break;
      }
      y && (F = k, C = ++o);
     }
     r && ((d = !f && d) && g--, i && v.push(d));
    }
    if (g += b, r && b !== g) {
     for (p = 0; f = t[p++]; ) f(v, h, s, l);
     if (i) {
      if (g > 0) for (;b--; ) v[b] || h[b] || (h[b] = Z.call(c));
      h = m(h);
     }
     et.apply(c, h), y && !i && h.length > 0 && g + t.length > 1 && n.uniqueSort(c);
    }
    return y && (F = k, P = x), v;
   };
   return r ? i(s) : s;
  }
  function x(e, t, o) {
   for (var i = 0, r = t.length; r > i; i++) n(e, t[i], o);
   return o;
  }
  function w(e, t, n, o) {
   var i, r, a, s, l, c = p(e);
   if (!o && 1 === c.length) {
    if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && S.getById && 9 === t.nodeType && L && E.relative[r[1].type]) {
     if (t = (E.find.ID(a.matches[0].replace(St, Ct), t) || [])[0], !t) return n;
     e = e.slice(r.shift().value.length);
    }
    for (i = bt.needsContext.test(e) ? 0 : r.length; i-- && (a = r[i], !E.relative[s = a.type]); ) if ((l = E.find[s]) && (o = l(a.matches[0].replace(St, Ct), ft.test(r[0].type) && t.parentNode || t))) {
     if (r.splice(i, 1), e = o.length && f(r), !e) return et.apply(n, o), n;
     break;
    }
   }
   return I(e, c)(o, t, !L, n, ft.test(e)), n;
  }
  var k, S, C, E, T, _, I, P, z, $, N, R, L, A, M, j, O, D = "sizzle" + -new Date(), H = e.document, F = 0, q = 0, B = o(), U = o(), W = o(), G = !1, V = function(e, t) {
   return e === t ? (G = !0, 0) : 0;
  }, X = typeof t, J = 1 << 31, Y = {}.hasOwnProperty, K = [], Z = K.pop, Q = K.push, et = K.push, tt = K.slice, nt = K.indexOf || function(e) {
   for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
   return -1;
  }, ot = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", at = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", st = at.replace("w", "w#"), lt = "\\[" + it + "*(" + at + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + st + ")|)|)" + it + "*\\]", ct = ":(" + at + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + lt.replace(3, 8) + ")*)|.*)\\)|)", ut = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"), dt = new RegExp("^" + it + "*," + it + "*"), pt = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), ft = new RegExp(it + "*[+~]"), ht = new RegExp("=" + it + "*([^\\]'\"]*)" + it + "*\\]", "g"), gt = new RegExp(ct), mt = new RegExp("^" + st + "$"), bt = {
   ID: new RegExp("^#(" + at + ")"),
   CLASS: new RegExp("^\\.(" + at + ")"),
   TAG: new RegExp("^(" + at.replace("w", "w*") + ")"),
   ATTR: new RegExp("^" + lt),
   PSEUDO: new RegExp("^" + ct),
   CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
   bool: new RegExp("^(?:" + ot + ")$", "i"),
   needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
  }, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xt = /^(?:input|select|textarea|button)$/i, wt = /^h\d$/i, kt = /'|\\/g, St = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"), Ct = function(e, t, n) {
   var o = "0x" + t - 65536;
   return o !== o || n ? t : 0 > o ? String.fromCharCode(o + 65536) : String.fromCharCode(55296 | o >> 10, 56320 | 1023 & o);
  };
  try {
   et.apply(K = tt.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType;
  } catch (Et) {
   et = {
    apply: K.length ? function(e, t) {
     Q.apply(e, tt.call(t));
    } : function(e, t) {
     for (var n = e.length, o = 0; e[n++] = t[o++]; ) ;
     e.length = n - 1;
    }
   };
  }
  _ = n.isXML = function(e) {
   var t = e && (e.ownerDocument || e).documentElement;
   return t ? "HTML" !== t.nodeName : !1;
  }, S = n.support = {}, $ = n.setDocument = function(e) {
   var t = e ? e.ownerDocument || e : H, n = t.defaultView;
   return t !== N && 9 === t.nodeType && t.documentElement ? (N = t, R = t.documentElement, 
   L = !_(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
    $();
   }), S.attributes = r(function(e) {
    return e.className = "i", !e.getAttribute("className");
   }), S.getElementsByTagName = r(function(e) {
    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
   }), S.getElementsByClassName = r(function(e) {
    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
    2 === e.getElementsByClassName("i").length;
   }), S.getById = r(function(e) {
    return R.appendChild(e).id = D, !t.getElementsByName || !t.getElementsByName(D).length;
   }), S.getById ? (E.find.ID = function(e, t) {
    if (typeof t.getElementById !== X && L) {
     var n = t.getElementById(e);
     return n && n.parentNode ? [ n ] : [];
    }
   }, E.filter.ID = function(e) {
    var t = e.replace(St, Ct);
    return function(e) {
     return e.getAttribute("id") === t;
    };
   }) : (delete E.find.ID, E.filter.ID = function(e) {
    var t = e.replace(St, Ct);
    return function(e) {
     var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
     return n && n.value === t;
    };
   }), E.find.TAG = S.getElementsByTagName ? function(e, t) {
    return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0;
   } : function(e, t) {
    var n, o = [], i = 0, r = t.getElementsByTagName(e);
    if ("*" === e) {
     for (;n = r[i++]; ) 1 === n.nodeType && o.push(n);
     return o;
    }
    return r;
   }, E.find.CLASS = S.getElementsByClassName && function(e, t) {
    return typeof t.getElementsByClassName !== X && L ? t.getElementsByClassName(e) : void 0;
   }, M = [], A = [], (S.qsa = vt.test(t.querySelectorAll)) && (r(function(e) {
    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || A.push("\\[" + it + "*(?:value|" + ot + ")"), 
    e.querySelectorAll(":checked").length || A.push(":checked");
   }), r(function(e) {
    var n = t.createElement("input");
    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && A.push("[*^$]=" + it + "*(?:''|\"\")"), 
    e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
    A.push(",.*:");
   })), (S.matchesSelector = vt.test(j = R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(e) {
    S.disconnectedMatch = j.call(e, "div"), j.call(e, "[s!='']:x"), M.push("!=", ct);
   }), A = A.length && new RegExp(A.join("|")), M = M.length && new RegExp(M.join("|")), 
   O = vt.test(R.contains) || R.compareDocumentPosition ? function(e, t) {
    var n = 9 === e.nodeType ? e.documentElement : e, o = t && t.parentNode;
    return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)));
   } : function(e, t) {
    if (t) for (;t = t.parentNode; ) if (t === e) return !0;
    return !1;
   }, V = R.compareDocumentPosition ? function(e, n) {
    if (e === n) return G = !0, 0;
    var o = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
    return o ? 1 & o || !S.sortDetached && n.compareDocumentPosition(e) === o ? e === t || O(H, e) ? -1 : n === t || O(H, n) ? 1 : z ? nt.call(z, e) - nt.call(z, n) : 0 : 4 & o ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
   } : function(e, n) {
    var o, i = 0, r = e.parentNode, a = n.parentNode, l = [ e ], c = [ n ];
    if (e === n) return G = !0, 0;
    if (!r || !a) return e === t ? -1 : n === t ? 1 : r ? -1 : a ? 1 : z ? nt.call(z, e) - nt.call(z, n) : 0;
    if (r === a) return s(e, n);
    for (o = e; o = o.parentNode; ) l.unshift(o);
    for (o = n; o = o.parentNode; ) c.unshift(o);
    for (;l[i] === c[i]; ) i++;
    return i ? s(l[i], c[i]) : l[i] === H ? -1 : c[i] === H ? 1 : 0;
   }, t) : N;
  }, n.matches = function(e, t) {
   return n(e, null, null, t);
  }, n.matchesSelector = function(e, t) {
   if ((e.ownerDocument || e) !== N && $(e), t = t.replace(ht, "='$1']"), !(!S.matchesSelector || !L || M && M.test(t) || A && A.test(t))) try {
    var o = j.call(e, t);
    if (o || S.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o;
   } catch (i) {}
   return n(t, N, null, [ e ]).length > 0;
  }, n.contains = function(e, t) {
   return (e.ownerDocument || e) !== N && $(e), O(e, t);
  }, n.attr = function(e, n) {
   (e.ownerDocument || e) !== N && $(e);
   var o = E.attrHandle[n.toLowerCase()], i = o && Y.call(E.attrHandle, n.toLowerCase()) ? o(e, n, !L) : t;
   return i === t ? S.attributes || !L ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i;
  }, n.error = function(e) {
   throw new Error("Syntax error, unrecognized expression: " + e);
  }, n.uniqueSort = function(e) {
   var t, n = [], o = 0, i = 0;
   if (G = !S.detectDuplicates, z = !S.sortStable && e.slice(0), e.sort(V), G) {
    for (;t = e[i++]; ) t === e[i] && (o = n.push(i));
    for (;o--; ) e.splice(n[o], 1);
   }
   return e;
  }, T = n.getText = function(e) {
   var t, n = "", o = 0, i = e.nodeType;
   if (i) {
    if (1 === i || 9 === i || 11 === i) {
     if ("string" == typeof e.textContent) return e.textContent;
     for (e = e.firstChild; e; e = e.nextSibling) n += T(e);
    } else if (3 === i || 4 === i) return e.nodeValue;
   } else for (;t = e[o]; o++) n += T(t);
   return n;
  }, E = n.selectors = {
   cacheLength: 50,
   createPseudo: i,
   match: bt,
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
     return e[1] = e[1].replace(St, Ct), e[3] = (e[4] || e[5] || "").replace(St, Ct), 
     "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
    },
    CHILD: function(e) {
     return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), 
     e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), 
     e;
    },
    PSEUDO: function(e) {
     var n, o = !e[5] && e[2];
     return bt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : o && gt.test(o) && (n = p(o, !0)) && (n = o.indexOf(")", o.length - n) - o.length) && (e[0] = e[0].slice(0, n), 
     e[2] = o.slice(0, n)), e.slice(0, 3));
    }
   },
   filter: {
    TAG: function(e) {
     var t = e.replace(St, Ct).toLowerCase();
     return "*" === e ? function() {
      return !0;
     } : function(e) {
      return e.nodeName && e.nodeName.toLowerCase() === t;
     };
    },
    CLASS: function(e) {
     var t = B[e + " "];
     return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && B(e, function(e) {
      return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "");
     });
    },
    ATTR: function(e, t, o) {
     return function(i) {
      var r = n.attr(i, e);
      return null == r ? "!=" === t : t ? (r += "", "=" === t ? r === o : "!=" === t ? r !== o : "^=" === t ? o && 0 === r.indexOf(o) : "*=" === t ? o && r.indexOf(o) > -1 : "$=" === t ? o && r.slice(-o.length) === o : "~=" === t ? (" " + r + " ").indexOf(o) > -1 : "|=" === t ? r === o || r.slice(0, o.length + 1) === o + "-" : !1) : !0;
     };
    },
    CHILD: function(e, t, n, o, i) {
     var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
     return 1 === o && 0 === i ? function(e) {
      return !!e.parentNode;
     } : function(t, n, l) {
      var c, u, d, p, f, h, g = r !== a ? "nextSibling" : "previousSibling", m = t.parentNode, b = s && t.nodeName.toLowerCase(), v = !l && !s;
      if (m) {
       if (r) {
        for (;g; ) {
         for (d = t; d = d[g]; ) if (s ? d.nodeName.toLowerCase() === b : 1 === d.nodeType) return !1;
         h = g = "only" === e && !h && "nextSibling";
        }
        return !0;
       }
       if (h = [ a ? m.firstChild : m.lastChild ], a && v) {
        for (u = m[D] || (m[D] = {}), c = u[e] || [], f = c[0] === F && c[1], p = c[0] === F && c[2], 
        d = f && m.childNodes[f]; d = ++f && d && d[g] || (p = f = 0) || h.pop(); ) if (1 === d.nodeType && ++p && d === t) {
         u[e] = [ F, f, p ];
         break;
        }
       } else if (v && (c = (t[D] || (t[D] = {}))[e]) && c[0] === F) p = c[1]; else for (;(d = ++f && d && d[g] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== b : 1 !== d.nodeType) || !++p || (v && ((d[D] || (d[D] = {}))[e] = [ F, p ]), 
       d !== t)); ) ;
       return p -= i, p === o || 0 === p % o && p / o >= 0;
      }
     };
    },
    PSEUDO: function(e, t) {
     var o, r = E.pseudos[e] || E.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
     return r[D] ? r(t) : r.length > 1 ? (o = [ e, e, "", t ], E.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
      for (var o, i = r(e, t), a = i.length; a--; ) o = nt.call(e, i[a]), e[o] = !(n[o] = i[a]);
     }) : function(e) {
      return r(e, 0, o);
     }) : r;
    }
   },
   pseudos: {
    not: i(function(e) {
     var t = [], n = [], o = I(e.replace(ut, "$1"));
     return o[D] ? i(function(e, t, n, i) {
      for (var r, a = o(e, null, i, []), s = e.length; s--; ) (r = a[s]) && (e[s] = !(t[s] = r));
     }) : function(e, i, r) {
      return t[0] = e, o(t, null, r, n), !n.pop();
     };
    }),
    has: i(function(e) {
     return function(t) {
      return n(e, t).length > 0;
     };
    }),
    contains: i(function(e) {
     return function(t) {
      return (t.textContent || t.innerText || T(t)).indexOf(e) > -1;
     };
    }),
    lang: i(function(e) {
     return mt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(St, Ct).toLowerCase(), 
     function(t) {
      var n;
      do if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
      n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
      return !1;
     };
    }),
    target: function(t) {
     var n = e.location && e.location.hash;
     return n && n.slice(1) === t.id;
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
     var t = e.nodeName.toLowerCase();
     return "input" === t && !!e.checked || "option" === t && !!e.selected;
    },
    selected: function(e) {
     return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
    },
    empty: function(e) {
     for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
     return !0;
    },
    parent: function(e) {
     return !E.pseudos.empty(e);
    },
    header: function(e) {
     return wt.test(e.nodeName);
    },
    input: function(e) {
     return xt.test(e.nodeName);
    },
    button: function(e) {
     var t = e.nodeName.toLowerCase();
     return "input" === t && "button" === e.type || "button" === t;
    },
    text: function(e) {
     var t;
     return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
    },
    first: u(function() {
     return [ 0 ];
    }),
    last: u(function(e, t) {
     return [ t - 1 ];
    }),
    eq: u(function(e, t, n) {
     return [ 0 > n ? n + t : n ];
    }),
    even: u(function(e, t) {
     for (var n = 0; t > n; n += 2) e.push(n);
     return e;
    }),
    odd: u(function(e, t) {
     for (var n = 1; t > n; n += 2) e.push(n);
     return e;
    }),
    lt: u(function(e, t, n) {
     for (var o = 0 > n ? n + t : n; --o >= 0; ) e.push(o);
     return e;
    }),
    gt: u(function(e, t, n) {
     for (var o = 0 > n ? n + t : n; ++o < t; ) e.push(o);
     return e;
    })
   }
  }, E.pseudos.nth = E.pseudos.eq;
  for (k in {
   radio: !0,
   checkbox: !0,
   file: !0,
   password: !0,
   image: !0
  }) E.pseudos[k] = l(k);
  for (k in {
   submit: !0,
   reset: !0
  }) E.pseudos[k] = c(k);
  d.prototype = E.filters = E.pseudos, E.setFilters = new d(), I = n.compile = function(e, t) {
   var n, o = [], i = [], r = W[e + " "];
   if (!r) {
    for (t || (t = p(e)), n = t.length; n--; ) r = v(t[n]), r[D] ? o.push(r) : i.push(r);
    r = W(e, y(i, o));
   }
   return r;
  }, S.sortStable = D.split("").sort(V).join("") === D, S.detectDuplicates = G, $(), 
  S.sortDetached = r(function(e) {
   return 1 & e.compareDocumentPosition(N.createElement("div"));
  }), r(function(e) {
   return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
  }) || a("type|href|height|width", function(e, t, n) {
   return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
  }), S.attributes && r(function(e) {
   return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
  }) || a("value", function(e, t, n) {
   return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
  }), r(function(e) {
   return null == e.getAttribute("disabled");
  }) || a(ot, function(e, t, n) {
   var o;
   return n ? void 0 : (o = e.getAttributeNode(t)) && o.specified ? o.value : e[t] === !0 ? t.toLowerCase() : null;
  }), rt.find = n, rt.expr = n.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = n.uniqueSort, 
  rt.text = n.getText, rt.isXMLDoc = n.isXML, rt.contains = n.contains;
 }(e);
 var ht = {};
 rt.Callbacks = function(e) {
  e = "string" == typeof e ? ht[e] || o(e) : rt.extend({}, e);
  var n, i, r, a, s, l, c = [], u = !e.once && [], d = function(t) {
   for (n = e.memory && t, i = !0, l = a || 0, a = 0, s = c.length, r = !0; c && s > l; l++) if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
    n = !1;
    break;
   }
   r = !1, c && (u ? u.length && d(u.shift()) : n ? c = [] : p.disable());
  }, p = {
   add: function() {
    if (c) {
     var t = c.length;
     (function o(t) {
      rt.each(t, function(t, n) {
       var i = rt.type(n);
       "function" === i ? e.unique && p.has(n) || c.push(n) : n && n.length && "string" !== i && o(n);
      });
     })(arguments), r ? s = c.length : n && (a = t, d(n));
    }
    return this;
   },
   remove: function() {
    return c && rt.each(arguments, function(e, t) {
     for (var n; (n = rt.inArray(t, c, n)) > -1; ) c.splice(n, 1), r && (s >= n && s--, 
     l >= n && l--);
    }), this;
   },
   has: function(e) {
    return e ? rt.inArray(e, c) > -1 : !(!c || !c.length);
   },
   empty: function() {
    return c = [], s = 0, this;
   },
   disable: function() {
    return c = u = n = t, this;
   },
   disabled: function() {
    return !c;
   },
   lock: function() {
    return u = t, n || p.disable(), this;
   },
   locked: function() {
    return !u;
   },
   fireWith: function(e, t) {
    return !c || i && !u || (t = t || [], t = [ e, t.slice ? t.slice() : t ], r ? u.push(t) : d(t)), 
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
 }, rt.extend({
  Deferred: function(e) {
   var t = [ [ "resolve", "done", rt.Callbacks("once memory"), "resolved" ], [ "reject", "fail", rt.Callbacks("once memory"), "rejected" ], [ "notify", "progress", rt.Callbacks("memory") ] ], n = "pending", o = {
    state: function() {
     return n;
    },
    always: function() {
     return i.done(arguments).fail(arguments), this;
    },
    then: function() {
     var e = arguments;
     return rt.Deferred(function(n) {
      rt.each(t, function(t, r) {
       var a = r[0], s = rt.isFunction(e[t]) && e[t];
       i[r[1]](function() {
        var e = s && s.apply(this, arguments);
        e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === o ? n.promise() : this, s ? [ e ] : arguments);
       });
      }), e = null;
     }).promise();
    },
    promise: function(e) {
     return null != e ? rt.extend(e, o) : o;
    }
   }, i = {};
   return o.pipe = o.then, rt.each(t, function(e, r) {
    var a = r[2], s = r[3];
    o[r[1]] = a.add, s && a.add(function() {
     n = s;
    }, t[1 ^ e][2].disable, t[2][2].lock), i[r[0]] = function() {
     return i[r[0] + "With"](this === i ? o : this, arguments), this;
    }, i[r[0] + "With"] = a.fireWith;
   }), o.promise(i), e && e.call(i, i), i;
  },
  when: function(e) {
   var t, n, o, i = 0, r = et.call(arguments), a = r.length, s = 1 !== a || e && rt.isFunction(e.promise) ? a : 0, l = 1 === s ? e : rt.Deferred(), c = function(e, n, o) {
    return function(i) {
     n[e] = this, o[e] = arguments.length > 1 ? et.call(arguments) : i, o === t ? l.notifyWith(n, o) : --s || l.resolveWith(n, o);
    };
   };
   if (a > 1) for (t = new Array(a), n = new Array(a), o = new Array(a); a > i; i++) r[i] && rt.isFunction(r[i].promise) ? r[i].promise().done(c(i, o, r)).fail(l.reject).progress(c(i, n, t)) : --s;
   return s || l.resolveWith(o, r), l.promise();
  }
 }), rt.support = function(t) {
  var n = W.createElement("input"), o = W.createDocumentFragment(), i = W.createElement("div"), r = W.createElement("select"), a = r.appendChild(W.createElement("option"));
  return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, 
  t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, 
  t.noCloneChecked = n.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !a.disabled, 
  n = W.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, 
  n.setAttribute("checked", "t"), n.setAttribute("name", "t"), o.appendChild(n), t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, 
  t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", 
  t.clearCloneStyle = "content-box" === i.style.backgroundClip, rt(function() {
   var n, o, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", a = W.getElementsByTagName("body")[0];
   a && (n = W.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
   a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
   rt.swap(a, null != a.style.zoom ? {
    zoom: 1
   } : {}, function() {
    t.boxSizing = 4 === i.offsetWidth;
   }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, 
   t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
    width: "4px"
   }).width, o = i.appendChild(W.createElement("div")), o.style.cssText = i.style.cssText = r, 
   o.style.marginRight = o.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), 
   a.removeChild(n));
  }), t) : t;
 }({});
 var gt, mt, bt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, vt = /([A-Z])/g;
 i.uid = 1, i.accepts = function(e) {
  return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0;
 }, i.prototype = {
  key: function(e) {
   if (!i.accepts(e)) return 0;
   var t = {}, n = e[this.expando];
   if (!n) {
    n = i.uid++;
    try {
     t[this.expando] = {
      value: n
     }, Object.defineProperties(e, t);
    } catch (o) {
     t[this.expando] = n, rt.extend(e, t);
    }
   }
   return this.cache[n] || (this.cache[n] = {}), n;
  },
  set: function(e, t, n) {
   var o, i = this.key(e), r = this.cache[i];
   if ("string" == typeof t) r[t] = n; else if (rt.isEmptyObject(r)) rt.extend(this.cache[i], t); else for (o in t) r[o] = t[o];
   return r;
  },
  get: function(e, n) {
   var o = this.cache[this.key(e)];
   return n === t ? o : o[n];
  },
  access: function(e, n, o) {
   var i;
   return n === t || n && "string" == typeof n && o === t ? (i = this.get(e, n), i !== t ? i : this.get(e, rt.camelCase(n))) : (this.set(e, n, o), 
   o !== t ? o : n);
  },
  remove: function(e, n) {
   var o, i, r, a = this.key(e), s = this.cache[a];
   if (n === t) this.cache[a] = {}; else {
    rt.isArray(n) ? i = n.concat(n.map(rt.camelCase)) : (r = rt.camelCase(n), n in s ? i = [ n, r ] : (i = r, 
    i = i in s ? [ i ] : i.match(st) || [])), o = i.length;
    for (;o--; ) delete s[i[o]];
   }
  },
  hasData: function(e) {
   return !rt.isEmptyObject(this.cache[e[this.expando]] || {});
  },
  discard: function(e) {
   e[this.expando] && delete this.cache[e[this.expando]];
  }
 }, gt = new i(), mt = new i(), rt.extend({
  acceptData: i.accepts,
  hasData: function(e) {
   return gt.hasData(e) || mt.hasData(e);
  },
  data: function(e, t, n) {
   return gt.access(e, t, n);
  },
  removeData: function(e, t) {
   gt.remove(e, t);
  },
  _data: function(e, t, n) {
   return mt.access(e, t, n);
  },
  _removeData: function(e, t) {
   mt.remove(e, t);
  }
 }), rt.fn.extend({
  data: function(e, n) {
   var o, i, a = this[0], s = 0, l = null;
   if (e === t) {
    if (this.length && (l = gt.get(a), 1 === a.nodeType && !mt.get(a, "hasDataAttrs"))) {
     for (o = a.attributes; s < o.length; s++) i = o[s].name, 0 === i.indexOf("data-") && (i = rt.camelCase(i.slice(5)), 
     r(a, i, l[i]));
     mt.set(a, "hasDataAttrs", !0);
    }
    return l;
   }
   return "object" == typeof e ? this.each(function() {
    gt.set(this, e);
   }) : rt.access(this, function(n) {
    var o, i = rt.camelCase(e);
    if (a && n === t) {
     if (o = gt.get(a, e), o !== t) return o;
     if (o = gt.get(a, i), o !== t) return o;
     if (o = r(a, i, t), o !== t) return o;
    } else this.each(function() {
     var o = gt.get(this, i);
     gt.set(this, i, n), -1 !== e.indexOf("-") && o !== t && gt.set(this, e, n);
    });
   }, null, n, arguments.length > 1, null, !0);
  },
  removeData: function(e) {
   return this.each(function() {
    gt.remove(this, e);
   });
  }
 }), rt.extend({
  queue: function(e, t, n) {
   var o;
   return e ? (t = (t || "fx") + "queue", o = mt.get(e, t), n && (!o || rt.isArray(n) ? o = mt.access(e, t, rt.makeArray(n)) : o.push(n)), 
   o || []) : void 0;
  },
  dequeue: function(e, t) {
   t = t || "fx";
   var n = rt.queue(e, t), o = n.length, i = n.shift(), r = rt._queueHooks(e, t), a = function() {
    rt.dequeue(e, t);
   };
   "inprogress" === i && (i = n.shift(), o--), i && ("fx" === t && n.unshift("inprogress"), 
   delete r.stop, i.call(e, a, r)), !o && r && r.empty.fire();
  },
  _queueHooks: function(e, t) {
   var n = t + "queueHooks";
   return mt.get(e, n) || mt.access(e, n, {
    empty: rt.Callbacks("once memory").add(function() {
     mt.remove(e, [ t + "queue", n ]);
    })
   });
  }
 }), rt.fn.extend({
  queue: function(e, n) {
   var o = 2;
   return "string" != typeof e && (n = e, e = "fx", o--), arguments.length < o ? rt.queue(this[0], e) : n === t ? this : this.each(function() {
    var t = rt.queue(this, e, n);
    rt._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && rt.dequeue(this, e);
   });
  },
  dequeue: function(e) {
   return this.each(function() {
    rt.dequeue(this, e);
   });
  },
  delay: function(e, t) {
   return e = rt.fx ? rt.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
    var o = setTimeout(t, e);
    n.stop = function() {
     clearTimeout(o);
    };
   });
  },
  clearQueue: function(e) {
   return this.queue(e || "fx", []);
  },
  promise: function(e, n) {
   var o, i = 1, r = rt.Deferred(), a = this, s = this.length, l = function() {
    --i || r.resolveWith(a, [ a ]);
   };
   for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--; ) o = mt.get(a[s], e + "queueHooks"), 
   o && o.empty && (i++, o.empty.add(l));
   return l(), r.promise(n);
  }
 });
 var yt, xt, wt = /[\t\r\n\f]/g, kt = /\r/g, St = /^(?:input|select|textarea|button)$/i;
 rt.fn.extend({
  attr: function(e, t) {
   return rt.access(this, rt.attr, e, t, arguments.length > 1);
  },
  removeAttr: function(e) {
   return this.each(function() {
    rt.removeAttr(this, e);
   });
  },
  prop: function(e, t) {
   return rt.access(this, rt.prop, e, t, arguments.length > 1);
  },
  removeProp: function(e) {
   return this.each(function() {
    delete this[rt.propFix[e] || e];
   });
  },
  addClass: function(e) {
   var t, n, o, i, r, a = 0, s = this.length, l = "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).addClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(st) || []; s > a; a++) if (n = this[a], o = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : " ")) {
    for (r = 0; i = t[r++]; ) o.indexOf(" " + i + " ") < 0 && (o += i + " ");
    n.className = rt.trim(o);
   }
   return this;
  },
  removeClass: function(e) {
   var t, n, o, i, r, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).removeClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(st) || []; s > a; a++) if (n = this[a], o = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : "")) {
    for (r = 0; i = t[r++]; ) for (;o.indexOf(" " + i + " ") >= 0; ) o = o.replace(" " + i + " ", " ");
    n.className = e ? rt.trim(o) : "";
   }
   return this;
  },
  toggleClass: function(e, t) {
   var n = typeof e;
   return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : rt.isFunction(e) ? this.each(function(n) {
    rt(this).toggleClass(e.call(this, n, this.className, t), t);
   }) : this.each(function() {
    if ("string" === n) for (var t, o = 0, i = rt(this), r = e.match(st) || []; t = r[o++]; ) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else (n === B || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), 
    this.className = this.className || e === !1 ? "" : mt.get(this, "__className__") || "");
   });
  },
  hasClass: function(e) {
   for (var t = " " + e + " ", n = 0, o = this.length; o > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(wt, " ").indexOf(t) >= 0) return !0;
   return !1;
  },
  val: function(e) {
   var n, o, i, r = this[0];
   {
    if (arguments.length) return i = rt.isFunction(e), this.each(function(o) {
     var r;
     1 === this.nodeType && (r = i ? e.call(this, o, rt(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : rt.isArray(r) && (r = rt.map(r, function(e) {
      return null == e ? "" : e + "";
     })), n = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, r, "value") !== t || (this.value = r));
    });
    if (r) return n = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()], 
    n && "get" in n && (o = n.get(r, "value")) !== t ? o : (o = r.value, "string" == typeof o ? o.replace(kt, "") : null == o ? "" : o);
   }
  }
 }), rt.extend({
  valHooks: {
   option: {
    get: function(e) {
     var t = e.attributes.value;
     return !t || t.specified ? e.value : e.text;
    }
   },
   select: {
    get: function(e) {
     for (var t, n, o = e.options, i = e.selectedIndex, r = "select-one" === e.type || 0 > i, a = r ? null : [], s = r ? i + 1 : o.length, l = 0 > i ? s : r ? i : 0; s > l; l++) if (n = o[l], 
     !(!n.selected && l !== i || (rt.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
      if (t = rt(n).val(), r) return t;
      a.push(t);
     }
     return a;
    },
    set: function(e, t) {
     for (var n, o, i = e.options, r = rt.makeArray(t), a = i.length; a--; ) o = i[a], 
     (o.selected = rt.inArray(rt(o).val(), r) >= 0) && (n = !0);
     return n || (e.selectedIndex = -1), r;
    }
   }
  },
  attr: function(e, n, o) {
   var i, r, a = e.nodeType;
   if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === B ? rt.prop(e, n, o) : (1 === a && rt.isXMLDoc(e) || (n = n.toLowerCase(), 
   i = rt.attrHooks[n] || (rt.expr.match.bool.test(n) ? xt : yt)), o === t ? i && "get" in i && null !== (r = i.get(e, n)) ? r : (r = rt.find.attr(e, n), 
   null == r ? t : r) : null !== o ? i && "set" in i && (r = i.set(e, o, n)) !== t ? r : (e.setAttribute(n, o + ""), 
   o) : (rt.removeAttr(e, n), void 0));
  },
  removeAttr: function(e, t) {
   var n, o, i = 0, r = t && t.match(st);
   if (r && 1 === e.nodeType) for (;n = r[i++]; ) o = rt.propFix[n] || n, rt.expr.match.bool.test(n) && (e[o] = !1), 
   e.removeAttribute(n);
  },
  attrHooks: {
   type: {
    set: function(e, t) {
     if (!rt.support.radioValue && "radio" === t && rt.nodeName(e, "input")) {
      var n = e.value;
      return e.setAttribute("type", t), n && (e.value = n), t;
     }
    }
   }
  },
  propFix: {
   "for": "htmlFor",
   "class": "className"
  },
  prop: function(e, n, o) {
   var i, r, a, s = e.nodeType;
   if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !rt.isXMLDoc(e), a && (n = rt.propFix[n] || n, 
   r = rt.propHooks[n]), o !== t ? r && "set" in r && (i = r.set(e, o, n)) !== t ? i : e[n] = o : r && "get" in r && null !== (i = r.get(e, n)) ? i : e[n];
  },
  propHooks: {
   tabIndex: {
    get: function(e) {
     return e.hasAttribute("tabindex") || St.test(e.nodeName) || e.href ? e.tabIndex : -1;
    }
   }
  }
 }), xt = {
  set: function(e, t, n) {
   return t === !1 ? rt.removeAttr(e, n) : e.setAttribute(n, n), n;
  }
 }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(e, n) {
  var o = rt.expr.attrHandle[n] || rt.find.attr;
  rt.expr.attrHandle[n] = function(e, n, i) {
   var r = rt.expr.attrHandle[n], a = i ? t : (rt.expr.attrHandle[n] = t) != o(e, n, i) ? n.toLowerCase() : null;
   return rt.expr.attrHandle[n] = r, a;
  };
 }), rt.support.optSelected || (rt.propHooks.selected = {
  get: function(e) {
   var t = e.parentNode;
   return t && t.parentNode && t.parentNode.selectedIndex, null;
  }
 }), rt.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
  rt.propFix[this.toLowerCase()] = this;
 }), rt.each([ "radio", "checkbox" ], function() {
  rt.valHooks[this] = {
   set: function(e, t) {
    return rt.isArray(t) ? e.checked = rt.inArray(rt(e).val(), t) >= 0 : void 0;
   }
  }, rt.support.checkOn || (rt.valHooks[this].get = function(e) {
   return null === e.getAttribute("value") ? "on" : e.value;
  });
 });
 var Ct = /^key/, Et = /^(?:mouse|contextmenu)|click/, Tt = /^(?:focusinfocus|focusoutblur)$/, _t = /^([^.]*)(?:\.(.+)|)$/;
 rt.event = {
  global: {},
  add: function(e, n, o, i, r) {
   var a, s, l, c, u, d, p, f, h, g, m, b = mt.get(e);
   if (b) {
    for (o.handler && (a = o, o = a.handler, r = a.selector), o.guid || (o.guid = rt.guid++), 
    (c = b.events) || (c = b.events = {}), (s = b.handle) || (s = b.handle = function(e) {
     return typeof rt === B || e && rt.event.triggered === e.type ? t : rt.event.dispatch.apply(s.elem, arguments);
    }, s.elem = e), n = (n || "").match(st) || [ "" ], u = n.length; u--; ) l = _t.exec(n[u]) || [], 
    h = m = l[1], g = (l[2] || "").split(".").sort(), h && (p = rt.event.special[h] || {}, 
    h = (r ? p.delegateType : p.bindType) || h, p = rt.event.special[h] || {}, d = rt.extend({
     type: h,
     origType: m,
     data: i,
     handler: o,
     guid: o.guid,
     selector: r,
     needsContext: r && rt.expr.match.needsContext.test(r),
     namespace: g.join(".")
    }, a), (f = c[h]) || (f = c[h] = [], f.delegateCount = 0, p.setup && p.setup.call(e, i, g, s) !== !1 || e.addEventListener && e.addEventListener(h, s, !1)), 
    p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = o.guid)), r ? f.splice(f.delegateCount++, 0, d) : f.push(d), 
    rt.event.global[h] = !0);
    e = null;
   }
  },
  remove: function(e, t, n, o, i) {
   var r, a, s, l, c, u, d, p, f, h, g, m = mt.hasData(e) && mt.get(e);
   if (m && (l = m.events)) {
    for (t = (t || "").match(st) || [ "" ], c = t.length; c--; ) if (s = _t.exec(t[c]) || [], 
    f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
     for (d = rt.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, 
     p = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
     a = r = p.length; r--; ) u = p[r], !i && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || o && o !== u.selector && ("**" !== o || !u.selector) || (p.splice(r, 1), 
     u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
     a && !p.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || rt.removeEvent(e, f, m.handle), 
     delete l[f]);
    } else for (f in l) rt.event.remove(e, f + t[c], n, o, !0);
    rt.isEmptyObject(l) && (delete m.handle, mt.remove(e, "events"));
   }
  },
  trigger: function(n, o, i, r) {
   var a, s, l, c, u, d, p, f = [ i || W ], h = ot.call(n, "type") ? n.type : n, g = ot.call(n, "namespace") ? n.namespace.split(".") : [];
   if (s = l = i = i || W, 3 !== i.nodeType && 8 !== i.nodeType && !Tt.test(h + rt.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), 
   h = g.shift(), g.sort()), u = h.indexOf(":") < 0 && "on" + h, n = n[rt.expando] ? n : new rt.Event(h, "object" == typeof n && n), 
   n.isTrigger = r ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
   n.result = t, n.target || (n.target = i), o = null == o ? [ n ] : rt.makeArray(o, [ n ]), 
   p = rt.event.special[h] || {}, r || !p.trigger || p.trigger.apply(i, o) !== !1)) {
    if (!r && !p.noBubble && !rt.isWindow(i)) {
     for (c = p.delegateType || h, Tt.test(c + h) || (s = s.parentNode); s; s = s.parentNode) f.push(s), 
     l = s;
     l === (i.ownerDocument || W) && f.push(l.defaultView || l.parentWindow || e);
    }
    for (a = 0; (s = f[a++]) && !n.isPropagationStopped(); ) n.type = a > 1 ? c : p.bindType || h, 
    d = (mt.get(s, "events") || {})[n.type] && mt.get(s, "handle"), d && d.apply(s, o), 
    d = u && s[u], d && rt.acceptData(s) && d.apply && d.apply(s, o) === !1 && n.preventDefault();
    return n.type = h, r || n.isDefaultPrevented() || p._default && p._default.apply(f.pop(), o) !== !1 || !rt.acceptData(i) || u && rt.isFunction(i[h]) && !rt.isWindow(i) && (l = i[u], 
    l && (i[u] = null), rt.event.triggered = h, i[h](), rt.event.triggered = t, l && (i[u] = l)), 
    n.result;
   }
  },
  dispatch: function(e) {
   e = rt.event.fix(e);
   var n, o, i, r, a, s = [], l = et.call(arguments), c = (mt.get(this, "events") || {})[e.type] || [], u = rt.event.special[e.type] || {};
   if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
    for (s = rt.event.handlers.call(this, e, c), n = 0; (r = s[n++]) && !e.isPropagationStopped(); ) for (e.currentTarget = r.elem, 
    o = 0; (a = r.handlers[o++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, 
    e.data = a.data, i = ((rt.event.special[a.origType] || {}).handle || a.handler).apply(r.elem, l), 
    i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
    return u.postDispatch && u.postDispatch.call(this, e), e.result;
   }
  },
  handlers: function(e, n) {
   var o, i, r, a, s = [], l = n.delegateCount, c = e.target;
   if (l && c.nodeType && (!e.button || "click" !== e.type)) for (;c !== this; c = c.parentNode || this) if (c.disabled !== !0 || "click" !== e.type) {
    for (i = [], o = 0; l > o; o++) a = n[o], r = a.selector + " ", i[r] === t && (i[r] = a.needsContext ? rt(r, this).index(c) >= 0 : rt.find(r, this, null, [ c ]).length), 
    i[r] && i.push(a);
    i.length && s.push({
     elem: c,
     handlers: i
    });
   }
   return l < n.length && s.push({
    elem: this,
    handlers: n.slice(l)
   }), s;
  },
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
  fixHooks: {},
  keyHooks: {
   props: "char charCode key keyCode".split(" "),
   filter: function(e, t) {
    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
    e;
   }
  },
  mouseHooks: {
   props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
   filter: function(e, n) {
    var o, i, r, a = n.button;
    return null == e.pageX && null != n.clientX && (o = e.target.ownerDocument || W, 
    i = o.documentElement, r = o.body, e.pageX = n.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), 
    e.pageY = n.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), 
    e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
   }
  },
  fix: function(e) {
   if (e[rt.expando]) return e;
   var t, n, o, i = e.type, r = e, a = this.fixHooks[i];
   for (a || (this.fixHooks[i] = a = Et.test(i) ? this.mouseHooks : Ct.test(i) ? this.keyHooks : {}), 
   o = a.props ? this.props.concat(a.props) : this.props, e = new rt.Event(r), t = o.length; t--; ) n = o[t], 
   e[n] = r[n];
   return e.target || (e.target = W), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
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
     return "checkbox" === this.type && this.click && rt.nodeName(this, "input") ? (this.click(), 
     !1) : void 0;
    },
    _default: function(e) {
     return rt.nodeName(e.target, "a");
    }
   },
   beforeunload: {
    postDispatch: function(e) {
     e.result !== t && (e.originalEvent.returnValue = e.result);
    }
   }
  },
  simulate: function(e, t, n, o) {
   var i = rt.extend(new rt.Event(), n, {
    type: e,
    isSimulated: !0,
    originalEvent: {}
   });
   o ? rt.event.trigger(i, null, t) : rt.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
  }
 }, rt.removeEvent = function(e, t, n) {
  e.removeEventListener && e.removeEventListener(t, n, !1);
 }, rt.Event = function(e, t) {
  return this instanceof rt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
  this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? a : s) : this.type = e, 
  t && rt.extend(this, t), this.timeStamp = e && e.timeStamp || rt.now(), this[rt.expando] = !0, 
  void 0) : new rt.Event(e, t);
 }, rt.Event.prototype = {
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
 }, rt.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
 }, function(e, t) {
  rt.event.special[e] = {
   delegateType: t,
   bindType: t,
   handle: function(e) {
    var n, o = this, i = e.relatedTarget, r = e.handleObj;
    return (!i || i !== o && !rt.contains(o, i)) && (e.type = r.origType, n = r.handler.apply(this, arguments), 
    e.type = t), n;
   }
  };
 }), rt.support.focusinBubbles || rt.each({
  focus: "focusin",
  blur: "focusout"
 }, function(e, t) {
  var n = 0, o = function(e) {
   rt.event.simulate(t, e.target, rt.event.fix(e), !0);
  };
  rt.event.special[t] = {
   setup: function() {
    0 === n++ && W.addEventListener(e, o, !0);
   },
   teardown: function() {
    0 === --n && W.removeEventListener(e, o, !0);
   }
  };
 }), rt.fn.extend({
  on: function(e, n, o, i, r) {
   var a, l;
   if ("object" == typeof e) {
    "string" != typeof n && (o = o || n, n = t);
    for (l in e) this.on(l, n, o, e[l], r);
    return this;
   }
   if (null == o && null == i ? (i = n, o = n = t) : null == i && ("string" == typeof n ? (i = o, 
   o = t) : (i = o, o = n, n = t)), i === !1) i = s; else if (!i) return this;
   return 1 === r && (a = i, i = function(e) {
    return rt().off(e), a.apply(this, arguments);
   }, i.guid = a.guid || (a.guid = rt.guid++)), this.each(function() {
    rt.event.add(this, e, i, o, n);
   });
  },
  one: function(e, t, n, o) {
   return this.on(e, t, n, o, 1);
  },
  off: function(e, n, o) {
   var i, r;
   if (e && e.preventDefault && e.handleObj) return i = e.handleObj, rt(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
   this;
   if ("object" == typeof e) {
    for (r in e) this.off(r, n, e[r]);
    return this;
   }
   return (n === !1 || "function" == typeof n) && (o = n, n = t), o === !1 && (o = s), 
   this.each(function() {
    rt.event.remove(this, e, o, n);
   });
  },
  trigger: function(e, t) {
   return this.each(function() {
    rt.event.trigger(e, t, this);
   });
  },
  triggerHandler: function(e, t) {
   var n = this[0];
   return n ? rt.event.trigger(e, t, n, !0) : void 0;
  }
 });
 var It = /^.[^:#\[\.,]*$/, Pt = /^(?:parents|prev(?:Until|All))/, zt = rt.expr.match.needsContext, $t = {
  children: !0,
  contents: !0,
  next: !0,
  prev: !0
 };
 rt.fn.extend({
  find: function(e) {
   var t, n = [], o = this, i = o.length;
   if ("string" != typeof e) return this.pushStack(rt(e).filter(function() {
    for (t = 0; i > t; t++) if (rt.contains(o[t], this)) return !0;
   }));
   for (t = 0; i > t; t++) rt.find(e, o[t], n);
   return n = this.pushStack(i > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, 
   n;
  },
  has: function(e) {
   var t = rt(e, this), n = t.length;
   return this.filter(function() {
    for (var e = 0; n > e; e++) if (rt.contains(this, t[e])) return !0;
   });
  },
  not: function(e) {
   return this.pushStack(u(this, e || [], !0));
  },
  filter: function(e) {
   return this.pushStack(u(this, e || [], !1));
  },
  is: function(e) {
   return !!u(this, "string" == typeof e && zt.test(e) ? rt(e) : e || [], !1).length;
  },
  closest: function(e, t) {
   for (var n, o = 0, i = this.length, r = [], a = zt.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; i > o; o++) for (n = this[o]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
    n = r.push(n);
    break;
   }
   return this.pushStack(r.length > 1 ? rt.unique(r) : r);
  },
  index: function(e) {
   return e ? "string" == typeof e ? tt.call(rt(e), this[0]) : tt.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  },
  add: function(e, t) {
   var n = "string" == typeof e ? rt(e, t) : rt.makeArray(e && e.nodeType ? [ e ] : e), o = rt.merge(this.get(), n);
   return this.pushStack(rt.unique(o));
  },
  addBack: function(e) {
   return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
  }
 }), rt.each({
  parent: function(e) {
   var t = e.parentNode;
   return t && 11 !== t.nodeType ? t : null;
  },
  parents: function(e) {
   return rt.dir(e, "parentNode");
  },
  parentsUntil: function(e, t, n) {
   return rt.dir(e, "parentNode", n);
  },
  next: function(e) {
   return c(e, "nextSibling");
  },
  prev: function(e) {
   return c(e, "previousSibling");
  },
  nextAll: function(e) {
   return rt.dir(e, "nextSibling");
  },
  prevAll: function(e) {
   return rt.dir(e, "previousSibling");
  },
  nextUntil: function(e, t, n) {
   return rt.dir(e, "nextSibling", n);
  },
  prevUntil: function(e, t, n) {
   return rt.dir(e, "previousSibling", n);
  },
  siblings: function(e) {
   return rt.sibling((e.parentNode || {}).firstChild, e);
  },
  children: function(e) {
   return rt.sibling(e.firstChild);
  },
  contents: function(e) {
   return e.contentDocument || rt.merge([], e.childNodes);
  }
 }, function(e, t) {
  rt.fn[e] = function(n, o) {
   var i = rt.map(this, t, n);
   return "Until" !== e.slice(-5) && (o = n), o && "string" == typeof o && (i = rt.filter(o, i)), 
   this.length > 1 && ($t[e] || rt.unique(i), Pt.test(e) && i.reverse()), this.pushStack(i);
  };
 }), rt.extend({
  filter: function(e, t, n) {
   var o = t[0];
   return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === o.nodeType ? rt.find.matchesSelector(o, e) ? [ o ] : [] : rt.find.matches(e, rt.grep(t, function(e) {
    return 1 === e.nodeType;
   }));
  },
  dir: function(e, n, o) {
   for (var i = [], r = o !== t; (e = e[n]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
    if (r && rt(e).is(o)) break;
    i.push(e);
   }
   return i;
  },
  sibling: function(e, t) {
   for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
   return n;
  }
 });
 var Nt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rt = /<([\w:]+)/, Lt = /<|&#?\w+;/, At = /<(?:script|style|link)/i, Mt = /^(?:checkbox|radio)$/i, jt = /checked\s*(?:[^=]|=\s*.checked.)/i, Ot = /^$|\/(?:java|ecma)script/i, Dt = /^true\/(.*)/, Ht = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ft = {
  option: [ 1, "<select multiple='multiple'>", "</select>" ],
  thead: [ 1, "<table>", "</table>" ],
  col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
  tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
  _default: [ 0, "", "" ]
 };
 Ft.optgroup = Ft.option, Ft.tbody = Ft.tfoot = Ft.colgroup = Ft.caption = Ft.thead, 
 Ft.th = Ft.td, rt.fn.extend({
  text: function(e) {
   return rt.access(this, function(e) {
    return e === t ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(e));
   }, null, e, arguments.length);
  },
  append: function() {
   return this.domManip(arguments, function(e) {
    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
     var t = d(this, e);
     t.appendChild(e);
    }
   });
  },
  prepend: function() {
   return this.domManip(arguments, function(e) {
    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
     var t = d(this, e);
     t.insertBefore(e, t.firstChild);
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
  remove: function(e, t) {
   for (var n, o = e ? rt.filter(e, this) : this, i = 0; null != (n = o[i]); i++) t || 1 !== n.nodeType || rt.cleanData(m(n)), 
   n.parentNode && (t && rt.contains(n.ownerDocument, n) && h(m(n, "script")), n.parentNode.removeChild(n));
   return this;
  },
  empty: function() {
   for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (rt.cleanData(m(e, !1)), 
   e.textContent = "");
   return this;
  },
  clone: function(e, t) {
   return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
    return rt.clone(this, e, t);
   });
  },
  html: function(e) {
   return rt.access(this, function(e) {
    var n = this[0] || {}, o = 0, i = this.length;
    if (e === t && 1 === n.nodeType) return n.innerHTML;
    if ("string" == typeof e && !At.test(e) && !Ft[(Rt.exec(e) || [ "", "" ])[1].toLowerCase()]) {
     e = e.replace(Nt, "<$1></$2>");
     try {
      for (;i > o; o++) n = this[o] || {}, 1 === n.nodeType && (rt.cleanData(m(n, !1)), 
      n.innerHTML = e);
      n = 0;
     } catch (r) {}
    }
    n && this.empty().append(e);
   }, null, e, arguments.length);
  },
  replaceWith: function() {
   var e = rt.map(this, function(e) {
    return [ e.nextSibling, e.parentNode ];
   }), t = 0;
   return this.domManip(arguments, function(n) {
    var o = e[t++], i = e[t++];
    i && (o && o.parentNode !== i && (o = this.nextSibling), rt(this).remove(), i.insertBefore(n, o));
   }, !0), t ? this : this.remove();
  },
  detach: function(e) {
   return this.remove(e, !0);
  },
  domManip: function(e, t, n) {
   e = Z.apply([], e);
   var o, i, r, a, s, l, c = 0, u = this.length, d = this, h = u - 1, g = e[0], b = rt.isFunction(g);
   if (b || !(1 >= u || "string" != typeof g || rt.support.checkClone) && jt.test(g)) return this.each(function(o) {
    var i = d.eq(o);
    b && (e[0] = g.call(this, o, i.html())), i.domManip(e, t, n);
   });
   if (u && (o = rt.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = o.firstChild, 
   1 === o.childNodes.length && (o = i), i)) {
    for (r = rt.map(m(o, "script"), p), a = r.length; u > c; c++) s = o, c !== h && (s = rt.clone(s, !0, !0), 
    a && rt.merge(r, m(s, "script"))), t.call(this[c], s, c);
    if (a) for (l = r[r.length - 1].ownerDocument, rt.map(r, f), c = 0; a > c; c++) s = r[c], 
    Ot.test(s.type || "") && !mt.access(s, "globalEval") && rt.contains(l, s) && (s.src ? rt._evalUrl(s.src) : rt.globalEval(s.textContent.replace(Ht, "")));
   }
   return this;
  }
 }), rt.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
 }, function(e, t) {
  rt.fn[e] = function(e) {
   for (var n, o = [], i = rt(e), r = i.length - 1, a = 0; r >= a; a++) n = a === r ? this : this.clone(!0), 
   rt(i[a])[t](n), Q.apply(o, n.get());
   return this.pushStack(o);
  };
 }), rt.extend({
  clone: function(e, t, n) {
   var o, i, r, a, s = e.cloneNode(!0), l = rt.contains(e.ownerDocument, e);
   if (!(rt.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e))) for (a = m(s), 
   r = m(e), o = 0, i = r.length; i > o; o++) b(r[o], a[o]);
   if (t) if (n) for (r = r || m(e), a = a || m(s), o = 0, i = r.length; i > o; o++) g(r[o], a[o]); else g(e, s);
   return a = m(s, "script"), a.length > 0 && h(a, !l && m(e, "script")), s;
  },
  buildFragment: function(e, t, n, o) {
   for (var i, r, a, s, l, c, u = 0, d = e.length, p = t.createDocumentFragment(), f = []; d > u; u++) if (i = e[u], 
   i || 0 === i) if ("object" === rt.type(i)) rt.merge(f, i.nodeType ? [ i ] : i); else if (Lt.test(i)) {
    for (r = r || p.appendChild(t.createElement("div")), a = (Rt.exec(i) || [ "", "" ])[1].toLowerCase(), 
    s = Ft[a] || Ft._default, r.innerHTML = s[1] + i.replace(Nt, "<$1></$2>") + s[2], 
    c = s[0]; c--; ) r = r.lastChild;
    rt.merge(f, r.childNodes), r = p.firstChild, r.textContent = "";
   } else f.push(t.createTextNode(i));
   for (p.textContent = "", u = 0; i = f[u++]; ) if ((!o || -1 === rt.inArray(i, o)) && (l = rt.contains(i.ownerDocument, i), 
   r = m(p.appendChild(i), "script"), l && h(r), n)) for (c = 0; i = r[c++]; ) Ot.test(i.type || "") && n.push(i);
   return p;
  },
  cleanData: function(e) {
   for (var n, o, r, a, s, l, c = rt.event.special, u = 0; (o = e[u]) !== t; u++) {
    if (i.accepts(o) && (s = o[mt.expando], s && (n = mt.cache[s]))) {
     if (r = Object.keys(n.events || {}), r.length) for (l = 0; (a = r[l]) !== t; l++) c[a] ? rt.event.remove(o, a) : rt.removeEvent(o, a, n.handle);
     mt.cache[s] && delete mt.cache[s];
    }
    delete gt.cache[o[gt.expando]];
   }
  },
  _evalUrl: function(e) {
   return rt.ajax({
    url: e,
    type: "GET",
    dataType: "script",
    async: !1,
    global: !1,
    "throws": !0
   });
  }
 }), rt.fn.extend({
  wrapAll: function(e) {
   var t;
   return rt.isFunction(e) ? this.each(function(t) {
    rt(this).wrapAll(e.call(this, t));
   }) : (this[0] && (t = rt(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), 
   t.map(function() {
    for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
    return e;
   }).append(this)), this);
  },
  wrapInner: function(e) {
   return rt.isFunction(e) ? this.each(function(t) {
    rt(this).wrapInner(e.call(this, t));
   }) : this.each(function() {
    var t = rt(this), n = t.contents();
    n.length ? n.wrapAll(e) : t.append(e);
   });
  },
  wrap: function(e) {
   var t = rt.isFunction(e);
   return this.each(function(n) {
    rt(this).wrapAll(t ? e.call(this, n) : e);
   });
  },
  unwrap: function() {
   return this.parent().each(function() {
    rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes);
   }).end();
  }
 });
 var qt, Bt, Ut = /^(none|table(?!-c[ea]).+)/, Wt = /^margin/, Gt = new RegExp("^(" + at + ")(.*)$", "i"), Vt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"), Xt = new RegExp("^([+-])=(" + at + ")", "i"), Jt = {
  BODY: "block"
 }, Yt = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
 }, Kt = {
  letterSpacing: 0,
  fontWeight: 400
 }, Zt = [ "Top", "Right", "Bottom", "Left" ], Qt = [ "Webkit", "O", "Moz", "ms" ];
 rt.fn.extend({
  css: function(e, n) {
   return rt.access(this, function(e, n, o) {
    var i, r, a = {}, s = 0;
    if (rt.isArray(n)) {
     for (i = x(e), r = n.length; r > s; s++) a[n[s]] = rt.css(e, n[s], !1, i);
     return a;
    }
    return o !== t ? rt.style(e, n, o) : rt.css(e, n);
   }, e, n, arguments.length > 1);
  },
  show: function() {
   return w(this, !0);
  },
  hide: function() {
   return w(this);
  },
  toggle: function(e) {
   return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
    y(this) ? rt(this).show() : rt(this).hide();
   });
  }
 }), rt.extend({
  cssHooks: {
   opacity: {
    get: function(e, t) {
     if (t) {
      var n = qt(e, "opacity");
      return "" === n ? "1" : n;
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
  style: function(e, n, o, i) {
   if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
    var r, a, s, l = rt.camelCase(n), c = e.style;
    return n = rt.cssProps[l] || (rt.cssProps[l] = v(c, l)), s = rt.cssHooks[n] || rt.cssHooks[l], 
    o === t ? s && "get" in s && (r = s.get(e, !1, i)) !== t ? r : c[n] : (a = typeof o, 
    "string" === a && (r = Xt.exec(o)) && (o = (r[1] + 1) * r[2] + parseFloat(rt.css(e, n)), 
    a = "number"), null == o || "number" === a && isNaN(o) || ("number" !== a || rt.cssNumber[l] || (o += "px"), 
    rt.support.clearCloneStyle || "" !== o || 0 !== n.indexOf("background") || (c[n] = "inherit"), 
    s && "set" in s && (o = s.set(e, o, i)) === t || (c[n] = o)), void 0);
   }
  },
  css: function(e, n, o, i) {
   var r, a, s, l = rt.camelCase(n);
   return n = rt.cssProps[l] || (rt.cssProps[l] = v(e.style, l)), s = rt.cssHooks[n] || rt.cssHooks[l], 
   s && "get" in s && (r = s.get(e, !0, o)), r === t && (r = qt(e, n, i)), "normal" === r && n in Kt && (r = Kt[n]), 
   "" === o || o ? (a = parseFloat(r), o === !0 || rt.isNumeric(a) ? a || 0 : r) : r;
  }
 }), qt = function(e, n, o) {
  var i, r, a, s = o || x(e), l = s ? s.getPropertyValue(n) || s[n] : t, c = e.style;
  return s && ("" !== l || rt.contains(e.ownerDocument, e) || (l = rt.style(e, n)), 
  Vt.test(l) && Wt.test(n) && (i = c.width, r = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, 
  l = s.width, c.width = i, c.minWidth = r, c.maxWidth = a)), l;
 }, rt.each([ "height", "width" ], function(e, t) {
  rt.cssHooks[t] = {
   get: function(e, n, o) {
    return n ? 0 === e.offsetWidth && Ut.test(rt.css(e, "display")) ? rt.swap(e, Yt, function() {
     return C(e, t, o);
    }) : C(e, t, o) : void 0;
   },
   set: function(e, n, o) {
    var i = o && x(e);
    return k(e, n, o ? S(e, t, o, rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, i), i) : 0);
   }
  };
 }), rt(function() {
  rt.support.reliableMarginRight || (rt.cssHooks.marginRight = {
   get: function(e, t) {
    return t ? rt.swap(e, {
     display: "inline-block"
    }, qt, [ e, "marginRight" ]) : void 0;
   }
  }), !rt.support.pixelPosition && rt.fn.position && rt.each([ "top", "left" ], function(e, t) {
   rt.cssHooks[t] = {
    get: function(e, n) {
     return n ? (n = qt(e, t), Vt.test(n) ? rt(e).position()[t] + "px" : n) : void 0;
    }
   };
  });
 }), rt.expr && rt.expr.filters && (rt.expr.filters.hidden = function(e) {
  return e.offsetWidth <= 0 && e.offsetHeight <= 0;
 }, rt.expr.filters.visible = function(e) {
  return !rt.expr.filters.hidden(e);
 }), rt.each({
  margin: "",
  padding: "",
  border: "Width"
 }, function(e, t) {
  rt.cssHooks[e + t] = {
   expand: function(n) {
    for (var o = 0, i = {}, r = "string" == typeof n ? n.split(" ") : [ n ]; 4 > o; o++) i[e + Zt[o] + t] = r[o] || r[o - 2] || r[0];
    return i;
   }
  }, Wt.test(e) || (rt.cssHooks[e + t].set = k);
 });
 var en = /%20/g, tn = /\[\]$/, nn = /\r?\n/g, on = /^(?:submit|button|image|reset|file)$/i, rn = /^(?:input|select|textarea|keygen)/i;
 rt.fn.extend({
  serialize: function() {
   return rt.param(this.serializeArray());
  },
  serializeArray: function() {
   return this.map(function() {
    var e = rt.prop(this, "elements");
    return e ? rt.makeArray(e) : this;
   }).filter(function() {
    var e = this.type;
    return this.name && !rt(this).is(":disabled") && rn.test(this.nodeName) && !on.test(e) && (this.checked || !Mt.test(e));
   }).map(function(e, t) {
    var n = rt(this).val();
    return null == n ? null : rt.isArray(n) ? rt.map(n, function(e) {
     return {
      name: t.name,
      value: e.replace(nn, "\r\n")
     };
    }) : {
     name: t.name,
     value: n.replace(nn, "\r\n")
    };
   }).get();
  }
 }), rt.param = function(e, n) {
  var o, i = [], r = function(e, t) {
   t = rt.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
  };
  if (n === t && (n = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(e) || e.jquery && !rt.isPlainObject(e)) rt.each(e, function() {
   r(this.name, this.value);
  }); else for (o in e) _(o, e[o], n, r);
  return i.join("&").replace(en, "+");
 }, rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
  rt.fn[t] = function(e, n) {
   return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
  };
 }), rt.fn.extend({
  hover: function(e, t) {
   return this.mouseenter(e).mouseleave(t || e);
  },
  bind: function(e, t, n) {
   return this.on(e, null, t, n);
  },
  unbind: function(e, t) {
   return this.off(e, null, t);
  },
  delegate: function(e, t, n, o) {
   return this.on(t, e, n, o);
  },
  undelegate: function(e, t, n) {
   return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
  }
 });
 var an, sn, ln = rt.now(), cn = /\?/, un = /#.*$/, dn = /([?&])_=[^&]*/, pn = /^(.*?):[ \t]*([^\r\n]*)$/gm, fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, hn = /^(?:GET|HEAD)$/, gn = /^\/\//, mn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, bn = rt.fn.load, vn = {}, yn = {}, xn = "*/".concat("*");
 try {
  sn = U.href;
 } catch (wn) {
  sn = W.createElement("a"), sn.href = "", sn = sn.href;
 }
 an = mn.exec(sn.toLowerCase()) || [], rt.fn.load = function(e, n, o) {
  if ("string" != typeof e && bn) return bn.apply(this, arguments);
  var i, r, a, s = this, l = e.indexOf(" ");
  return l >= 0 && (i = e.slice(l), e = e.slice(0, l)), rt.isFunction(n) ? (o = n, 
  n = t) : n && "object" == typeof n && (r = "POST"), s.length > 0 && rt.ajax({
   url: e,
   type: r,
   dataType: "html",
   data: n
  }).done(function(e) {
   a = arguments, s.html(i ? rt("<div>").append(rt.parseHTML(e)).find(i) : e);
  }).complete(o && function(e, t) {
   s.each(o, a || [ e.responseText, t, e ]);
  }), this;
 }, rt.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
  rt.fn[t] = function(e) {
   return this.on(t, e);
  };
 }), rt.extend({
  active: 0,
  lastModified: {},
  etag: {},
  ajaxSettings: {
   url: sn,
   type: "GET",
   isLocal: fn.test(an[1]),
   global: !0,
   processData: !0,
   async: !0,
   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   accepts: {
    "*": xn,
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
    "text json": rt.parseJSON,
    "text xml": rt.parseXML
   },
   flatOptions: {
    url: !0,
    context: !0
   }
  },
  ajaxSetup: function(e, t) {
   return t ? z(z(e, rt.ajaxSettings), t) : z(rt.ajaxSettings, e);
  },
  ajaxPrefilter: I(vn),
  ajaxTransport: I(yn),
  ajax: function(e, n) {
   function o(e, n, o, s) {
    var c, d, v, y, w, S = n;
    2 !== x && (x = 2, l && clearTimeout(l), i = t, a = s || "", k.readyState = e > 0 ? 4 : 0, 
    c = e >= 200 && 300 > e || 304 === e, o && (y = $(p, k, o)), y = N(p, y, k, c), 
    c ? (p.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (rt.lastModified[r] = w), 
    w = k.getResponseHeader("etag"), w && (rt.etag[r] = w)), 204 === e || "HEAD" === p.type ? S = "nocontent" : 304 === e ? S = "notmodified" : (S = y.state, 
    d = y.data, v = y.error, c = !v)) : (v = S, (e || !S) && (S = "error", 0 > e && (e = 0))), 
    k.status = e, k.statusText = (n || S) + "", c ? g.resolveWith(f, [ d, S, k ]) : g.rejectWith(f, [ k, S, v ]), 
    k.statusCode(b), b = t, u && h.trigger(c ? "ajaxSuccess" : "ajaxError", [ k, p, c ? d : v ]), 
    m.fireWith(f, [ k, S ]), u && (h.trigger("ajaxComplete", [ k, p ]), --rt.active || rt.event.trigger("ajaxStop")));
   }
   "object" == typeof e && (n = e, e = t), n = n || {};
   var i, r, a, s, l, c, u, d, p = rt.ajaxSetup({}, n), f = p.context || p, h = p.context && (f.nodeType || f.jquery) ? rt(f) : rt.event, g = rt.Deferred(), m = rt.Callbacks("once memory"), b = p.statusCode || {}, v = {}, y = {}, x = 0, w = "canceled", k = {
    readyState: 0,
    getResponseHeader: function(e) {
     var t;
     if (2 === x) {
      if (!s) for (s = {}; t = pn.exec(a); ) s[t[1].toLowerCase()] = t[2];
      t = s[e.toLowerCase()];
     }
     return null == t ? null : t;
    },
    getAllResponseHeaders: function() {
     return 2 === x ? a : null;
    },
    setRequestHeader: function(e, t) {
     var n = e.toLowerCase();
     return x || (e = y[n] = y[n] || e, v[e] = t), this;
    },
    overrideMimeType: function(e) {
     return x || (p.mimeType = e), this;
    },
    statusCode: function(e) {
     var t;
     if (e) if (2 > x) for (t in e) b[t] = [ b[t], e[t] ]; else k.always(e[k.status]);
     return this;
    },
    abort: function(e) {
     var t = e || w;
     return i && i.abort(t), o(0, t), this;
    }
   };
   if (g.promise(k).complete = m.add, k.success = k.done, k.error = k.fail, p.url = ((e || p.url || sn) + "").replace(un, "").replace(gn, an[1] + "//"), 
   p.type = n.method || n.type || p.method || p.type, p.dataTypes = rt.trim(p.dataType || "*").toLowerCase().match(st) || [ "" ], 
   null == p.crossDomain && (c = mn.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] === an[1] && c[2] === an[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (an[3] || ("http:" === an[1] ? "80" : "443")))), 
   p.data && p.processData && "string" != typeof p.data && (p.data = rt.param(p.data, p.traditional)), 
   P(vn, p, n, k), 2 === x) return k;
   u = p.global, u && 0 === rt.active++ && rt.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
   p.hasContent = !hn.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (cn.test(r) ? "&" : "?") + p.data, 
   delete p.data), p.cache === !1 && (p.url = dn.test(r) ? r.replace(dn, "$1_=" + ln++) : r + (cn.test(r) ? "&" : "?") + "_=" + ln++)), 
   p.ifModified && (rt.lastModified[r] && k.setRequestHeader("If-Modified-Since", rt.lastModified[r]), 
   rt.etag[r] && k.setRequestHeader("If-None-Match", rt.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", p.contentType), 
   k.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xn + "; q=0.01" : "") : p.accepts["*"]);
   for (d in p.headers) k.setRequestHeader(d, p.headers[d]);
   if (p.beforeSend && (p.beforeSend.call(f, k, p) === !1 || 2 === x)) return k.abort();
   w = "abort";
   for (d in {
    success: 1,
    error: 1,
    complete: 1
   }) k[d](p[d]);
   if (i = P(yn, p, n, k)) {
    k.readyState = 1, u && h.trigger("ajaxSend", [ k, p ]), p.async && p.timeout > 0 && (l = setTimeout(function() {
     k.abort("timeout");
    }, p.timeout));
    try {
     x = 1, i.send(v, o);
    } catch (S) {
     if (!(2 > x)) throw S;
     o(-1, S);
    }
   } else o(-1, "No Transport");
   return k;
  },
  getJSON: function(e, t, n) {
   return rt.get(e, t, n, "json");
  },
  getScript: function(e, n) {
   return rt.get(e, t, n, "script");
  }
 }), rt.each([ "get", "post" ], function(e, n) {
  rt[n] = function(e, o, i, r) {
   return rt.isFunction(o) && (r = r || i, i = o, o = t), rt.ajax({
    url: e,
    type: n,
    dataType: r,
    data: o,
    success: i
   });
  };
 }), rt.ajaxSetup({
  accepts: {
   script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
   script: /(?:java|ecma)script/
  },
  converters: {
   "text script": function(e) {
    return rt.globalEval(e), e;
   }
  }
 }), rt.ajaxPrefilter("script", function(e) {
  e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET");
 }), rt.ajaxTransport("script", function(e) {
  if (e.crossDomain) {
   var t, n;
   return {
    send: function(o, i) {
     t = rt("<script>").prop({
      async: !0,
      charset: e.scriptCharset,
      src: e.url
     }).on("load error", n = function(e) {
      t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type);
     }), W.head.appendChild(t[0]);
    },
    abort: function() {
     n && n();
    }
   };
  }
 });
 var kn = [], Sn = /(=)\?(?=&|$)|\?\?/;
 rt.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
   var e = kn.pop() || rt.expando + "_" + ln++;
   return this[e] = !0, e;
  }
 }), rt.ajaxPrefilter("json jsonp", function(n, o, i) {
  var r, a, s, l = n.jsonp !== !1 && (Sn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Sn.test(n.data) && "data");
  return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = rt.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
  l ? n[l] = n[l].replace(Sn, "$1" + r) : n.jsonp !== !1 && (n.url += (cn.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), 
  n.converters["script json"] = function() {
   return s || rt.error(r + " was not called"), s[0];
  }, n.dataTypes[0] = "json", a = e[r], e[r] = function() {
   s = arguments;
  }, i.always(function() {
   e[r] = a, n[r] && (n.jsonpCallback = o.jsonpCallback, kn.push(r)), s && rt.isFunction(a) && a(s[0]), 
   s = a = t;
  }), "script") : void 0;
 }), rt.ajaxSettings.xhr = function() {
  try {
   return new XMLHttpRequest();
  } catch (e) {}
 };
 var Cn = rt.ajaxSettings.xhr(), En = {
  0: 200,
  1223: 204
 }, Tn = 0, _n = {};
 e.ActiveXObject && rt(e).on("unload", function() {
  for (var e in _n) _n[e]();
  _n = t;
 }), rt.support.cors = !!Cn && "withCredentials" in Cn, rt.support.ajax = Cn = !!Cn, 
 rt.ajaxTransport(function(e) {
  var n;
  return rt.support.cors || Cn && !e.crossDomain ? {
   send: function(o, i) {
    var r, a, s = e.xhr();
    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) s[r] = e.xhrFields[r];
    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
    for (r in o) s.setRequestHeader(r, o[r]);
    n = function(e) {
     return function() {
      n && (delete _n[a], n = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? i(s.status || 404, s.statusText) : i(En[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
       text: s.responseText
      } : t, s.getAllResponseHeaders()));
     };
    }, s.onload = n(), s.onerror = n("error"), n = _n[a = Tn++] = n("abort"), s.send(e.hasContent && e.data || null);
   },
   abort: function() {
    n && n();
   }
  } : void 0;
 });
 var In, Pn, zn = /^(?:toggle|show|hide)$/, $n = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"), Nn = /queueHooks$/, Rn = [ j ], Ln = {
  "*": [ function(e, t) {
   var n = this.createTween(e, t), o = n.cur(), i = $n.exec(t), r = i && i[3] || (rt.cssNumber[e] ? "" : "px"), a = (rt.cssNumber[e] || "px" !== r && +o) && $n.exec(rt.css(n.elem, e)), s = 1, l = 20;
   if (a && a[3] !== r) {
    r = r || a[3], i = i || [], a = +o || 1;
    do s = s || ".5", a /= s, rt.style(n.elem, e, a + r); while (s !== (s = n.cur() / o) && 1 !== s && --l);
   }
   return i && (a = n.start = +a || +o || 0, n.unit = r, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), 
   n;
  } ]
 };
 rt.Animation = rt.extend(A, {
  tweener: function(e, t) {
   rt.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
   for (var n, o = 0, i = e.length; i > o; o++) n = e[o], Ln[n] = Ln[n] || [], Ln[n].unshift(t);
  },
  prefilter: function(e, t) {
   t ? Rn.unshift(e) : Rn.push(e);
  }
 }), rt.Tween = O, O.prototype = {
  constructor: O,
  init: function(e, t, n, o, i, r) {
   this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), 
   this.end = o, this.unit = r || (rt.cssNumber[n] ? "" : "px");
  },
  cur: function() {
   var e = O.propHooks[this.prop];
   return e && e.get ? e.get(this) : O.propHooks._default.get(this);
  },
  run: function(e) {
   var t, n = O.propHooks[this.prop];
   return this.pos = t = this.options.duration ? rt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
   this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
   n && n.set ? n.set(this) : O.propHooks._default.set(this), this;
  }
 }, O.prototype.init.prototype = O.prototype, O.propHooks = {
  _default: {
   get: function(e) {
    var t;
    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = rt.css(e.elem, e.prop, ""), 
    t && "auto" !== t ? t : 0) : e.elem[e.prop];
   },
   set: function(e) {
    rt.fx.step[e.prop] ? rt.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[rt.cssProps[e.prop]] || rt.cssHooks[e.prop]) ? rt.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
   }
  }
 }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
  set: function(e) {
   e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
  }
 }, rt.each([ "toggle", "show", "hide" ], function(e, t) {
  var n = rt.fn[t];
  rt.fn[t] = function(e, o, i) {
   return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, o, i);
  };
 }), rt.fn.extend({
  fadeTo: function(e, t, n, o) {
   return this.filter(y).css("opacity", 0).show().end().animate({
    opacity: t
   }, e, n, o);
  },
  animate: function(e, t, n, o) {
   var i = rt.isEmptyObject(e), r = rt.speed(t, n, o), a = function() {
    var t = A(this, rt.extend({}, e), r);
    (i || mt.get(this, "finish")) && t.stop(!0);
   };
   return a.finish = a, i || r.queue === !1 ? this.each(a) : this.queue(r.queue, a);
  },
  stop: function(e, n, o) {
   var i = function(e) {
    var t = e.stop;
    delete e.stop, t(o);
   };
   return "string" != typeof e && (o = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
   this.each(function() {
    var t = !0, n = null != e && e + "queueHooks", r = rt.timers, a = mt.get(this);
    if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Nn.test(n) && i(a[n]);
    for (n = r.length; n--; ) r[n].elem !== this || null != e && r[n].queue !== e || (r[n].anim.stop(o), 
    t = !1, r.splice(n, 1));
    (t || !o) && rt.dequeue(this, e);
   });
  },
  finish: function(e) {
   return e !== !1 && (e = e || "fx"), this.each(function() {
    var t, n = mt.get(this), o = n[e + "queue"], i = n[e + "queueHooks"], r = rt.timers, a = o ? o.length : 0;
    for (n.finish = !0, rt.queue(this, e, []), i && i.stop && i.stop.call(this, !0), 
    t = r.length; t--; ) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), 
    r.splice(t, 1));
    for (t = 0; a > t; t++) o[t] && o[t].finish && o[t].finish.call(this);
    delete n.finish;
   });
  }
 }), rt.each({
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
 }, function(e, t) {
  rt.fn[e] = function(e, n, o) {
   return this.animate(t, e, n, o);
  };
 }), rt.speed = function(e, t, n) {
  var o = e && "object" == typeof e ? rt.extend({}, e) : {
   complete: n || !n && t || rt.isFunction(e) && e,
   duration: e,
   easing: n && t || t && !rt.isFunction(t) && t
  };
  return o.duration = rt.fx.off ? 0 : "number" == typeof o.duration ? o.duration : o.duration in rt.fx.speeds ? rt.fx.speeds[o.duration] : rt.fx.speeds._default, 
  (null == o.queue || o.queue === !0) && (o.queue = "fx"), o.old = o.complete, o.complete = function() {
   rt.isFunction(o.old) && o.old.call(this), o.queue && rt.dequeue(this, o.queue);
  }, o;
 }, rt.easing = {
  linear: function(e) {
   return e;
  },
  swing: function(e) {
   return .5 - Math.cos(e * Math.PI) / 2;
  }
 }, rt.timers = [], rt.fx = O.prototype.init, rt.fx.tick = function() {
  var e, n = rt.timers, o = 0;
  for (In = rt.now(); o < n.length; o++) e = n[o], e() || n[o] !== e || n.splice(o--, 1);
  n.length || rt.fx.stop(), In = t;
 }, rt.fx.timer = function(e) {
  e() && rt.timers.push(e) && rt.fx.start();
 }, rt.fx.interval = 13, rt.fx.start = function() {
  Pn || (Pn = setInterval(rt.fx.tick, rt.fx.interval));
 }, rt.fx.stop = function() {
  clearInterval(Pn), Pn = null;
 }, rt.fx.speeds = {
  slow: 600,
  fast: 200,
  _default: 400
 }, rt.fx.step = {}, rt.expr && rt.expr.filters && (rt.expr.filters.animated = function(e) {
  return rt.grep(rt.timers, function(t) {
   return e === t.elem;
  }).length;
 }), rt.fn.offset = function(e) {
  if (arguments.length) return e === t ? this : this.each(function(t) {
   rt.offset.setOffset(this, e, t);
  });
  var n, o, i = this[0], r = {
   top: 0,
   left: 0
  }, a = i && i.ownerDocument;
  if (a) return n = a.documentElement, rt.contains(n, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), 
  o = H(a), {
   top: r.top + o.pageYOffset - n.clientTop,
   left: r.left + o.pageXOffset - n.clientLeft
  }) : r;
 }, rt.offset = {
  setOffset: function(e, t, n) {
   var o, i, r, a, s, l, c, u = rt.css(e, "position"), d = rt(e), p = {};
   "static" === u && (e.style.position = "relative"), s = d.offset(), r = rt.css(e, "top"), 
   l = rt.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1, 
   c ? (o = d.position(), a = o.top, i = o.left) : (a = parseFloat(r) || 0, i = parseFloat(l) || 0), 
   rt.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), 
   null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : d.css(p);
  }
 }, rt.fn.extend({
  position: function() {
   if (this[0]) {
    var e, t, n = this[0], o = {
     top: 0,
     left: 0
    };
    return "fixed" === rt.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
    t = this.offset(), rt.nodeName(e[0], "html") || (o = e.offset()), o.top += rt.css(e[0], "borderTopWidth", !0), 
    o.left += rt.css(e[0], "borderLeftWidth", !0)), {
     top: t.top - o.top - rt.css(n, "marginTop", !0),
     left: t.left - o.left - rt.css(n, "marginLeft", !0)
    };
   }
  },
  offsetParent: function() {
   return this.map(function() {
    for (var e = this.offsetParent || G; e && !rt.nodeName(e, "html") && "static" === rt.css(e, "position"); ) e = e.offsetParent;
    return e || G;
   });
  }
 }), rt.each({
  scrollLeft: "pageXOffset",
  scrollTop: "pageYOffset"
 }, function(n, o) {
  var i = "pageYOffset" === o;
  rt.fn[n] = function(r) {
   return rt.access(this, function(n, r, a) {
    var s = H(n);
    return a === t ? s ? s[o] : n[r] : (s ? s.scrollTo(i ? e.pageXOffset : a, i ? a : e.pageYOffset) : n[r] = a, 
    void 0);
   }, n, r, arguments.length, null);
  };
 }), rt.each({
  Height: "height",
  Width: "width"
 }, function(e, n) {
  rt.each({
   padding: "inner" + e,
   content: n,
   "": "outer" + e
  }, function(o, i) {
   rt.fn[i] = function(i, r) {
    var a = arguments.length && (o || "boolean" != typeof i), s = o || (i === !0 || r === !0 ? "margin" : "border");
    return rt.access(this, function(n, o, i) {
     var r;
     return rt.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (r = n.documentElement, 
     Math.max(n.body["scroll" + e], r["scroll" + e], n.body["offset" + e], r["offset" + e], r["client" + e])) : i === t ? rt.css(n, o, s) : rt.style(n, o, i, s);
    }, n, a ? i : t, a, null);
   };
  });
 }), rt.fn.size = function() {
  return this.length;
 }, rt.fn.andSelf = rt.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = rt : "function" == typeof define && define.amd && define("jquery", [], function() {
  return rt;
 }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = rt);
})(window), function() {
 var e = this, t = e._, n = {}, o = Array.prototype, i = Object.prototype, r = Function.prototype, a = o.push, s = o.slice, l = o.concat, c = i.toString, u = i.hasOwnProperty, d = o.forEach, p = o.map, f = o.reduce, h = o.reduceRight, g = o.filter, m = o.every, b = o.some, v = o.indexOf, y = o.lastIndexOf, x = Array.isArray, w = Object.keys, k = r.bind, S = function(e) {
  return e instanceof S ? e : this instanceof S ? (this._wrapped = e, void 0) : new S(e);
 };
 "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = S), 
 exports._ = S) : e._ = S, S.VERSION = "1.4.4";
 var C = S.each = S.forEach = function(e, t, o) {
  if (null != e) if (d && e.forEach === d) e.forEach(t, o); else if (e.length === +e.length) {
   for (var i = 0, r = e.length; r > i; i++) if (t.call(o, e[i], i, e) === n) return;
  } else for (var a in e) if (S.has(e, a) && t.call(o, e[a], a, e) === n) return;
 };
 S.map = S.collect = function(e, t, n) {
  var o = [];
  return null == e ? o : p && e.map === p ? e.map(t, n) : (C(e, function(e, i, r) {
   o[o.length] = t.call(n, e, i, r);
  }), o);
 };
 var E = "Reduce of empty array with no initial value";
 S.reduce = S.foldl = S.inject = function(e, t, n, o) {
  var i = arguments.length > 2;
  if (null == e && (e = []), f && e.reduce === f) return o && (t = S.bind(t, o)), 
  i ? e.reduce(t, n) : e.reduce(t);
  if (C(e, function(e, r, a) {
   i ? n = t.call(o, n, e, r, a) : (n = e, i = !0);
  }), !i) throw new TypeError(E);
  return n;
 }, S.reduceRight = S.foldr = function(e, t, n, o) {
  var i = arguments.length > 2;
  if (null == e && (e = []), h && e.reduceRight === h) return o && (t = S.bind(t, o)), 
  i ? e.reduceRight(t, n) : e.reduceRight(t);
  var r = e.length;
  if (r !== +r) {
   var a = S.keys(e);
   r = a.length;
  }
  if (C(e, function(s, l, c) {
   l = a ? a[--r] : --r, i ? n = t.call(o, n, e[l], l, c) : (n = e[l], i = !0);
  }), !i) throw new TypeError(E);
  return n;
 }, S.find = S.detect = function(e, t, n) {
  var o;
  return T(e, function(e, i, r) {
   return t.call(n, e, i, r) ? (o = e, !0) : void 0;
  }), o;
 }, S.filter = S.select = function(e, t, n) {
  var o = [];
  return null == e ? o : g && e.filter === g ? e.filter(t, n) : (C(e, function(e, i, r) {
   t.call(n, e, i, r) && (o[o.length] = e);
  }), o);
 }, S.reject = function(e, t, n) {
  return S.filter(e, function(e, o, i) {
   return !t.call(n, e, o, i);
  }, n);
 }, S.every = S.all = function(e, t, o) {
  t || (t = S.identity);
  var i = !0;
  return null == e ? i : m && e.every === m ? e.every(t, o) : (C(e, function(e, r, a) {
   return (i = i && t.call(o, e, r, a)) ? void 0 : n;
  }), !!i);
 };
 var T = S.some = S.any = function(e, t, o) {
  t || (t = S.identity);
  var i = !1;
  return null == e ? i : b && e.some === b ? e.some(t, o) : (C(e, function(e, r, a) {
   return i || (i = t.call(o, e, r, a)) ? n : void 0;
  }), !!i);
 };
 S.contains = S.include = function(e, t) {
  return null == e ? !1 : v && e.indexOf === v ? -1 != e.indexOf(t) : T(e, function(e) {
   return e === t;
  });
 }, S.invoke = function(e, t) {
  var n = s.call(arguments, 2), o = S.isFunction(t);
  return S.map(e, function(e) {
   return (o ? t : e[t]).apply(e, n);
  });
 }, S.pluck = function(e, t) {
  return S.map(e, function(e) {
   return e[t];
  });
 }, S.where = function(e, t, n) {
  return S.isEmpty(t) ? n ? null : [] : S[n ? "find" : "filter"](e, function(e) {
   for (var n in t) if (t[n] !== e[n]) return !1;
   return !0;
  });
 }, S.findWhere = function(e, t) {
  return S.where(e, t, !0);
 }, S.max = function(e, t, n) {
  if (!t && S.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
  if (!t && S.isEmpty(e)) return -1/0;
  var o = {
   computed: -1/0,
   value: -1/0
  };
  return C(e, function(e, i, r) {
   var a = t ? t.call(n, e, i, r) : e;
   a >= o.computed && (o = {
    value: e,
    computed: a
   });
  }), o.value;
 }, S.min = function(e, t, n) {
  if (!t && S.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
  if (!t && S.isEmpty(e)) return 1/0;
  var o = {
   computed: 1/0,
   value: 1/0
  };
  return C(e, function(e, i, r) {
   var a = t ? t.call(n, e, i, r) : e;
   a < o.computed && (o = {
    value: e,
    computed: a
   });
  }), o.value;
 }, S.shuffle = function(e) {
  var t, n = 0, o = [];
  return C(e, function(e) {
   t = S.random(n++), o[n - 1] = o[t], o[t] = e;
  }), o;
 };
 var _ = function(e) {
  return S.isFunction(e) ? e : function(t) {
   return t[e];
  };
 };
 S.sortBy = function(e, t, n) {
  var o = _(t);
  return S.pluck(S.map(e, function(e, t, i) {
   return {
    value: e,
    index: t,
    criteria: o.call(n, e, t, i)
   };
  }).sort(function(e, t) {
   var n = e.criteria, o = t.criteria;
   if (n !== o) {
    if (n > o || void 0 === n) return 1;
    if (o > n || void 0 === o) return -1;
   }
   return e.index < t.index ? -1 : 1;
  }), "value");
 };
 var I = function(e, t, n, o) {
  var i = {}, r = _(t || S.identity);
  return C(e, function(t, a) {
   var s = r.call(n, t, a, e);
   o(i, s, t);
  }), i;
 };
 S.groupBy = function(e, t, n) {
  return I(e, t, n, function(e, t, n) {
   (S.has(e, t) ? e[t] : e[t] = []).push(n);
  });
 }, S.countBy = function(e, t, n) {
  return I(e, t, n, function(e, t) {
   S.has(e, t) || (e[t] = 0), e[t]++;
  });
 }, S.sortedIndex = function(e, t, n, o) {
  n = null == n ? S.identity : _(n);
  for (var i = n.call(o, t), r = 0, a = e.length; a > r; ) {
   var s = r + a >>> 1;
   n.call(o, e[s]) < i ? r = s + 1 : a = s;
  }
  return r;
 }, S.toArray = function(e) {
  return e ? S.isArray(e) ? s.call(e) : e.length === +e.length ? S.map(e, S.identity) : S.values(e) : [];
 }, S.size = function(e) {
  return null == e ? 0 : e.length === +e.length ? e.length : S.keys(e).length;
 }, S.first = S.head = S.take = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t);
 }, S.initial = function(e, t, n) {
  return s.call(e, 0, e.length - (null == t || n ? 1 : t));
 }, S.last = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0));
 }, S.rest = S.tail = S.drop = function(e, t, n) {
  return s.call(e, null == t || n ? 1 : t);
 }, S.compact = function(e) {
  return S.filter(e, S.identity);
 };
 var P = function(e, t, n) {
  return C(e, function(e) {
   S.isArray(e) ? t ? a.apply(n, e) : P(e, t, n) : n.push(e);
  }), n;
 };
 S.flatten = function(e, t) {
  return P(e, t, []);
 }, S.without = function(e) {
  return S.difference(e, s.call(arguments, 1));
 }, S.uniq = S.unique = function(e, t, n, o) {
  S.isFunction(t) && (o = n, n = t, t = !1);
  var i = n ? S.map(e, n, o) : e, r = [], a = [];
  return C(i, function(n, o) {
   (t ? o && a[a.length - 1] === n : S.contains(a, n)) || (a.push(n), r.push(e[o]));
  }), r;
 }, S.union = function() {
  return S.uniq(l.apply(o, arguments));
 }, S.intersection = function(e) {
  var t = s.call(arguments, 1);
  return S.filter(S.uniq(e), function(e) {
   return S.every(t, function(t) {
    return S.indexOf(t, e) >= 0;
   });
  });
 }, S.difference = function(e) {
  var t = l.apply(o, s.call(arguments, 1));
  return S.filter(e, function(e) {
   return !S.contains(t, e);
  });
 }, S.zip = function() {
  for (var e = s.call(arguments), t = S.max(S.pluck(e, "length")), n = new Array(t), o = 0; t > o; o++) n[o] = S.pluck(e, "" + o);
  return n;
 }, S.object = function(e, t) {
  if (null == e) return {};
  for (var n = {}, o = 0, i = e.length; i > o; o++) t ? n[e[o]] = t[o] : n[e[o][0]] = e[o][1];
  return n;
 }, S.indexOf = function(e, t, n) {
  if (null == e) return -1;
  var o = 0, i = e.length;
  if (n) {
   if ("number" != typeof n) return o = S.sortedIndex(e, t), e[o] === t ? o : -1;
   o = 0 > n ? Math.max(0, i + n) : n;
  }
  if (v && e.indexOf === v) return e.indexOf(t, n);
  for (;i > o; o++) if (e[o] === t) return o;
  return -1;
 }, S.lastIndexOf = function(e, t, n) {
  if (null == e) return -1;
  var o = null != n;
  if (y && e.lastIndexOf === y) return o ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
  for (var i = o ? n : e.length; i--; ) if (e[i] === t) return i;
  return -1;
 }, S.range = function(e, t, n) {
  arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
  for (var o = Math.max(Math.ceil((t - e) / n), 0), i = 0, r = new Array(o); o > i; ) r[i++] = e, 
  e += n;
  return r;
 }, S.bind = function(e, t) {
  if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
  var n = s.call(arguments, 2);
  return function() {
   return e.apply(t, n.concat(s.call(arguments)));
  };
 }, S.partial = function(e) {
  var t = s.call(arguments, 1);
  return function() {
   return e.apply(this, t.concat(s.call(arguments)));
  };
 }, S.bindAll = function(e) {
  var t = s.call(arguments, 1);
  return 0 === t.length && (t = S.functions(e)), C(t, function(t) {
   e[t] = S.bind(e[t], e);
  }), e;
 }, S.memoize = function(e, t) {
  var n = {};
  return t || (t = S.identity), function() {
   var o = t.apply(this, arguments);
   return S.has(n, o) ? n[o] : n[o] = e.apply(this, arguments);
  };
 }, S.delay = function(e, t) {
  var n = s.call(arguments, 2);
  return setTimeout(function() {
   return e.apply(null, n);
  }, t);
 }, S.defer = function(e) {
  return S.delay.apply(S, [ e, 1 ].concat(s.call(arguments, 1)));
 }, S.throttle = function(e, t) {
  var n, o, i, r, a = 0, s = function() {
   a = new Date(), i = null, r = e.apply(n, o);
  };
  return function() {
   var l = new Date(), c = t - (l - a);
   return n = this, o = arguments, 0 >= c ? (clearTimeout(i), i = null, a = l, r = e.apply(n, o)) : i || (i = setTimeout(s, c)), 
   r;
  };
 }, S.debounce = function(e, t, n) {
  var o, i;
  return function() {
   var r = this, a = arguments, s = function() {
    o = null, n || (i = e.apply(r, a));
   }, l = n && !o;
   return clearTimeout(o), o = setTimeout(s, t), l && (i = e.apply(r, a)), i;
  };
 }, S.once = function(e) {
  var t, n = !1;
  return function() {
   return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t);
  };
 }, S.wrap = function(e, t) {
  return function() {
   var n = [ e ];
   return a.apply(n, arguments), t.apply(this, n);
  };
 }, S.compose = function() {
  var e = arguments;
  return function() {
   for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
   return t[0];
  };
 }, S.after = function(e, t) {
  return 0 >= e ? t() : function() {
   return --e < 1 ? t.apply(this, arguments) : void 0;
  };
 }, S.keys = w || function(e) {
  if (e !== Object(e)) throw new TypeError("Invalid object");
  var t = [];
  for (var n in e) S.has(e, n) && (t[t.length] = n);
  return t;
 }, S.values = function(e) {
  var t = [];
  for (var n in e) S.has(e, n) && t.push(e[n]);
  return t;
 }, S.pairs = function(e) {
  var t = [];
  for (var n in e) S.has(e, n) && t.push([ n, e[n] ]);
  return t;
 }, S.invert = function(e) {
  var t = {};
  for (var n in e) S.has(e, n) && (t[e[n]] = n);
  return t;
 }, S.functions = S.methods = function(e) {
  var t = [];
  for (var n in e) S.isFunction(e[n]) && t.push(n);
  return t.sort();
 }, S.extend = function(e) {
  return C(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) e[n] = t[n];
  }), e;
 }, S.pick = function(e) {
  var t = {}, n = l.apply(o, s.call(arguments, 1));
  return C(n, function(n) {
   n in e && (t[n] = e[n]);
  }), t;
 }, S.omit = function(e) {
  var t = {}, n = l.apply(o, s.call(arguments, 1));
  for (var i in e) S.contains(n, i) || (t[i] = e[i]);
  return t;
 }, S.defaults = function(e) {
  return C(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) null == e[n] && (e[n] = t[n]);
  }), e;
 }, S.clone = function(e) {
  return S.isObject(e) ? S.isArray(e) ? e.slice() : S.extend({}, e) : e;
 }, S.tap = function(e, t) {
  return t(e), e;
 };
 var z = function(e, t, n, o) {
  if (e === t) return 0 !== e || 1 / e == 1 / t;
  if (null == e || null == t) return e === t;
  e instanceof S && (e = e._wrapped), t instanceof S && (t = t._wrapped);
  var i = c.call(e);
  if (i != c.call(t)) return !1;
  switch (i) {
  case "[object String]":
   return e == String(t);

  case "[object Number]":
   return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;

  case "[object Date]":
  case "[object Boolean]":
   return +e == +t;

  case "[object RegExp]":
   return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase;
  }
  if ("object" != typeof e || "object" != typeof t) return !1;
  for (var r = n.length; r--; ) if (n[r] == e) return o[r] == t;
  n.push(e), o.push(t);
  var a = 0, s = !0;
  if ("[object Array]" == i) {
   if (a = e.length, s = a == t.length) for (;a-- && (s = z(e[a], t[a], n, o)); ) ;
  } else {
   var l = e.constructor, u = t.constructor;
   if (l !== u && !(S.isFunction(l) && l instanceof l && S.isFunction(u) && u instanceof u)) return !1;
   for (var d in e) if (S.has(e, d) && (a++, !(s = S.has(t, d) && z(e[d], t[d], n, o)))) break;
   if (s) {
    for (d in t) if (S.has(t, d) && !a--) break;
    s = !a;
   }
  }
  return n.pop(), o.pop(), s;
 };
 S.isEqual = function(e, t) {
  return z(e, t, [], []);
 }, S.isEmpty = function(e) {
  if (null == e) return !0;
  if (S.isArray(e) || S.isString(e)) return 0 === e.length;
  for (var t in e) if (S.has(e, t)) return !1;
  return !0;
 }, S.isElement = function(e) {
  return !(!e || 1 !== e.nodeType);
 }, S.isArray = x || function(e) {
  return "[object Array]" == c.call(e);
 }, S.isObject = function(e) {
  return e === Object(e);
 }, C([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(e) {
  S["is" + e] = function(t) {
   return c.call(t) == "[object " + e + "]";
  };
 }), S.isArguments(arguments) || (S.isArguments = function(e) {
  return !(!e || !S.has(e, "callee"));
 }), "function" != typeof /./ && (S.isFunction = function(e) {
  return "function" == typeof e;
 }), S.isFinite = function(e) {
  return isFinite(e) && !isNaN(parseFloat(e));
 }, S.isNaN = function(e) {
  return S.isNumber(e) && e != +e;
 }, S.isBoolean = function(e) {
  return e === !0 || e === !1 || "[object Boolean]" == c.call(e);
 }, S.isNull = function(e) {
  return null === e;
 }, S.isUndefined = function(e) {
  return void 0 === e;
 }, S.has = function(e, t) {
  return u.call(e, t);
 }, S.noConflict = function() {
  return e._ = t, this;
 }, S.identity = function(e) {
  return e;
 }, S.times = function(e, t, n) {
  for (var o = Array(e), i = 0; e > i; i++) o[i] = t.call(n, i);
  return o;
 }, S.random = function(e, t) {
  return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
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
 $.unescape = S.invert($.escape);
 var N = {
  escape: new RegExp("[" + S.keys($.escape).join("") + "]", "g"),
  unescape: new RegExp("(" + S.keys($.unescape).join("|") + ")", "g")
 };
 S.each([ "escape", "unescape" ], function(e) {
  S[e] = function(t) {
   return null == t ? "" : ("" + t).replace(N[e], function(t) {
    return $[e][t];
   });
  };
 }), S.result = function(e, t) {
  if (null == e) return null;
  var n = e[t];
  return S.isFunction(n) ? n.call(e) : n;
 }, S.mixin = function(e) {
  C(S.functions(e), function(t) {
   var n = S[t] = e[t];
   S.prototype[t] = function() {
    var e = [ this._wrapped ];
    return a.apply(e, arguments), j.call(this, n.apply(S, e));
   };
  });
 };
 var R = 0;
 S.uniqueId = function(e) {
  var t = ++R + "";
  return e ? e + t : t;
 }, S.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
 };
 var L = /(.)^/, A = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "	": "t",
  "\u2028": "u2028",
  "\u2029": "u2029"
 }, M = /\\|'|\r|\n|\t|\u2028|\u2029/g;
 S.template = function(e, t, n) {
  var o;
  n = S.defaults({}, n, S.templateSettings);
  var i = new RegExp([ (n.escape || L).source, (n.interpolate || L).source, (n.evaluate || L).source ].join("|") + "|$", "g"), r = 0, a = "__p+='";
  e.replace(i, function(t, n, o, i, s) {
   return a += e.slice(r, s).replace(M, function(e) {
    return "\\" + A[e];
   }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), o && (a += "'+\n((__t=(" + o + "))==null?'':__t)+\n'"), 
   i && (a += "';\n" + i + "\n__p+='"), r = s + t.length, t;
  }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
  try {
   o = new Function(n.variable || "obj", "_", a);
  } catch (s) {
   throw s.source = a, s;
  }
  if (t) return o(t, S);
  var l = function(e) {
   return o.call(this, e, S);
  };
  return l.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", l;
 }, S.chain = function(e) {
  return S(e).chain();
 };
 var j = function(e) {
  return this._chain ? S(e).chain() : e;
 };
 S.mixin(S), C([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
  var t = o[e];
  S.prototype[e] = function() {
   var n = this._wrapped;
   return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], 
   j.call(this, n);
  };
 }), C([ "concat", "join", "slice" ], function(e) {
  var t = o[e];
  S.prototype[e] = function() {
   return j.call(this, t.apply(this._wrapped, arguments));
  };
 }), S.extend(S.prototype, {
  chain: function() {
   return this._chain = !0, this;
  },
  value: function() {
   return this._wrapped;
  }
 });
}.call(this), define("underscore", function(e) {
 return function() {
  var t;
  return t || e._;
 };
}(this)), function(e, t) {
 "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define("crel", t) : e.crel = t();
}(this, function() {
 function e() {
  var n, o = window.document, i = arguments, r = o.createElement(i[0]), a = i[1], s = 2, l = i.length, c = e.attrMap;
  if (1 === l) return r;
  if (("object" != typeof a || t(a)) && (--s, a = null), 1 === l - s && "string" == typeof i[s] && void 0 !== r.textContent) r.textContent = i[s]; else for (;l > s; ++s) n = i[s], 
  null != n && (t(n) || (n = o.createTextNode(n)), r.appendChild(n));
  for (var u in a) if (c[u]) {
   var d = e.attrMap[u];
   "function" == typeof d ? d(r, a[u]) : r.setAttribute(d, a[u]);
  } else r.setAttribute(u, a[u]);
  return r;
 }
 var t = "object" == typeof Node ? function(e) {
  return e instanceof Node;
 } : function(e) {
  return e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
 };
 return e.attrMap = {}, e.isNode = t, e;
});

var saveAs = saveAs || navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator) || function(e) {
 try {
  var t = e.document, n = function() {
   return e.URL || e.webkitURL || e;
  }, o = e.URL || e.webkitURL || e, i = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), r = "download" in i, a = function(n) {
   var o = t.createEvent("MouseEvents");
   o.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(o);
  }, s = e.webkitRequestFileSystem, l = e.requestFileSystem || s || e.mozRequestFileSystem, c = function(t) {
   (e.setImmediate || e.setTimeout)(function() {
    throw t;
   }, 0);
  }, u = "application/octet-stream", d = 0, p = [], f = function() {
   for (var e = p.length; e--; ) {
    var t = p[e];
    "string" == typeof t ? o.revokeObjectURL(t) : t.remove();
   }
   p.length = 0;
  }, h = function(e, t, n) {
   t = [].concat(t);
   for (var o = t.length; o--; ) {
    var i = e["on" + t[o]];
    if ("function" == typeof i) try {
     i.call(e, n || e);
    } catch (r) {
     c(r);
    }
   }
  }, g = function(t, o) {
   var c, f, g, m = this, b = t.type, v = !1, y = function() {
    var e = n().createObjectURL(t);
    return p.push(e), e;
   }, x = function() {
    h(m, "writestart progress write writeend".split(" "));
   }, w = function() {
    (v || !c) && (c = y(t)), f && (f.location.href = c), m.readyState = m.DONE, x();
   }, k = function(e) {
    return function() {
     return m.readyState !== m.DONE ? e.apply(this, arguments) : void 0;
    };
   }, S = {
    create: !0,
    exclusive: !1
   };
   return m.readyState = m.INIT, o || (o = "download"), r ? (c = y(t), i.href = c, 
   i.download = o, a(i), m.readyState = m.DONE, x(), void 0) : (e.chrome && b && b !== u && (g = t.slice || t.webkitSlice, 
   t = g.call(t, 0, t.size, u), v = !0), s && "download" !== o && (o += ".download"), 
   f = b === u || s ? e : e.open(), l ? (d += t.size, l(e.TEMPORARY, d, k(function(e) {
    e.root.getDirectory("saved", S, k(function(e) {
     var n = function() {
      e.getFile(o, S, k(function(e) {
       e.createWriter(k(function(n) {
        n.onwriteend = function(t) {
         f.location.href = e.toURL(), p.push(e), m.readyState = m.DONE, h(m, "writeend", t);
        }, n.onerror = function() {
         var e = n.error;
         e.code !== e.ABORT_ERR && w();
        }, "writestart progress write abort".split(" ").forEach(function(e) {
         n["on" + e] = m["on" + e];
        }), n.write(t), m.abort = function() {
         n.abort(), m.readyState = m.DONE;
        }, m.readyState = m.WRITING;
       }), w);
      }), w);
     };
     e.getFile(o, {
      create: !1
     }, k(function(e) {
      e.remove(), n();
     }), k(function(e) {
      e.code === e.NOT_FOUND_ERR ? n() : w();
     }));
    }), w);
   }), w), void 0) : (w(), void 0));
  }, m = g.prototype, b = function(e, t) {
   return new g(e, t);
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
 run: function(e, t) {
  return e = e || this.createException(), t = t || this.mode(e), "other" === t ? this.other(arguments.callee) : this[t](e);
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
 instrumentFunction: function(e, t, n) {
  e = e || window;
  var o = e[t];
  e[t] = function() {
   return n.call(this, printStackTrace().slice(4)), e[t]._instrumented.apply(this, arguments);
  }, e[t]._instrumented = o;
 },
 deinstrumentFunction: function(e, t) {
  e[t].constructor === Function && e[t]._instrumented && e[t]._instrumented.constructor === Function && (e[t] = e[t]._instrumented);
 },
 chrome: function(e) {
  var t = (e.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
  return t.pop(), t;
 },
 safari: function(e) {
  return e.stack.replace(/\[native code\]\n/m, "").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n");
 },
 ie: function(e) {
  var t = /^.*at (\w+) \(([^\)]+)\)$/gm;
  return e.stack.replace(/at Anonymous function /gm, "{anonymous}()@").replace(/^(?=\w+Error\:).*$\n/m, "").replace(t, "$1@$2").split("\n");
 },
 firefox: function(e) {
  return e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^[\(@]/gm, "{anonymous}()@").split("\n");
 },
 opera11: function(e) {
  for (var t = "{anonymous}", n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, o = e.stacktrace.split("\n"), i = [], r = 0, a = o.length; a > r; r += 2) {
   var s = n.exec(o[r]);
   if (s) {
    var l = s[4] + ":" + s[1] + ":" + s[2], c = s[3] || "global code";
    c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, t), 
    i.push(c + "@" + l + " -- " + o[r + 1].replace(/^\s+/, ""));
   }
  }
  return i;
 },
 opera10b: function(e) {
  for (var t = /^(.*)@(.+):(\d+)$/, n = e.stacktrace.split("\n"), o = [], i = 0, r = n.length; r > i; i++) {
   var a = t.exec(n[i]);
   if (a) {
    var s = a[1] ? a[1] + "()" : "global code";
    o.push(s + "@" + a[2] + ":" + a[3]);
   }
  }
  return o;
 },
 opera10a: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, o = e.stacktrace.split("\n"), i = [], r = 0, a = o.length; a > r; r += 2) {
   var s = n.exec(o[r]);
   if (s) {
    var l = s[3] || t;
    i.push(l + "()@" + s[2] + ":" + s[1] + " -- " + o[r + 1].replace(/^\s+/, ""));
   }
  }
  return i;
 },
 opera9: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)/i, o = e.message.split("\n"), i = [], r = 2, a = o.length; a > r; r += 2) {
   var s = n.exec(o[r]);
   s && i.push(t + "()@" + s[2] + ":" + s[1] + " -- " + o[r + 1].replace(/^\s+/, ""));
  }
  return i;
 },
 other: function(e) {
  for (var t, n, o = "{anonymous}", i = /function\s*([\w\-$]+)?\s*\(/i, r = [], a = 10; e && e.arguments && r.length < a; ) t = i.test(e.toString()) ? RegExp.$1 || o : o, 
  n = Array.prototype.slice.call(e.arguments || []), r[r.length] = t + "(" + this.stringifyArguments(n) + ")", 
  e = e.caller;
  return r;
 },
 stringifyArguments: function(e) {
  for (var t = [], n = Array.prototype.slice, o = 0; o < e.length; ++o) {
   var i = e[o];
   void 0 === i ? t[o] = "undefined" : null === i ? t[o] = "null" : i.constructor && (i.constructor === Array ? t[o] = i.length < 3 ? "[" + this.stringifyArguments(i) + "]" : "[" + this.stringifyArguments(n.call(i, 0, 1)) + "..." + this.stringifyArguments(n.call(i, -1)) + "]" : i.constructor === Object ? t[o] = "#object" : i.constructor === Function ? t[o] = "#function" : i.constructor === String ? t[o] = '"' + i + '"' : i.constructor === Number && (t[o] = i));
  }
  return t.join(",");
 },
 sourceCache: {},
 ajax: function(e) {
  var t = this.createXMLHTTPObject();
  if (t) try {
   return t.open("GET", e, !1), t.send(null), t.responseText;
  } catch (n) {}
  return "";
 },
 createXMLHTTPObject: function() {
  for (var e, t = [ function() {
   return new XMLHttpRequest();
  }, function() {
   return new ActiveXObject("Msxml2.XMLHTTP");
  }, function() {
   return new ActiveXObject("Msxml3.XMLHTTP");
  }, function() {
   return new ActiveXObject("Microsoft.XMLHTTP");
  } ], n = 0; n < t.length; n++) try {
   return e = t[n](), this.createXMLHTTPObject = t[n], e;
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
  for (var t = 0; t < e.length; ++t) {
   var n = /\{anonymous\}\(.*\)@(.*)/, o = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, i = e[t], r = n.exec(i);
   if (r) {
    var a = o.exec(r[1]);
    if (a) {
     var s = a[1], l = a[2], c = a[3] || 0;
     if (s && this.isSameDomain(s) && l) {
      var u = this.guessAnonymousFunction(s, l, c);
      e[t] = i.replace("{anonymous}", u);
     }
    }
   }
  }
  return e;
 },
 guessAnonymousFunction: function(e, t) {
  var n;
  try {
   n = this.findFunctionName(this.getSource(e), t);
  } catch (o) {
   n = "getSource failed with url: " + e + ", exception: " + o.toString();
  }
  return n;
 },
 findFunctionName: function(e, t) {
  for (var n, o, i, r = /function\s+([^(]*?)\s*\(([^)]*)\)/, a = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, s = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, l = "", c = Math.min(t, 20), u = 0; c > u; ++u) if (n = e[t - u - 1], 
  i = n.indexOf("//"), i >= 0 && (n = n.substr(0, i)), n) {
   if (l = n + l, o = a.exec(l), o && o[1]) return o[1];
   if (o = r.exec(l), o && o[1]) return o[1];
   if (o = s.exec(l), o && o[1]) return o[1];
  }
  return "(?)";
 }
}, define("libs/stacktrace", function() {}), define("utils", [ "jquery", "underscore", "crel", "libs/FileSaver", "libs/stacktrace" ], function($, _, crel) {
 function jqElt(e) {
  return _.isString(e) ? $(e) : e;
 }
 function inputError(e, t) {
  void 0 !== t && (e.stop(!0, !0).addClass("error").delay(1e3).switchClass("error"), 
  t.stopPropagation());
 }
 var utils = {};
 utils.getURLParameter = function(e) {
  var t = new RegExp(e + "=(.+?)(&|$)");
  try {
   return decodeURIComponent(t.exec(location.search)[1]);
  } catch (n) {
   return void 0;
  }
 }, utils.getInputValue = function(e) {
  return e = jqElt(e), e.val();
 }, utils.setInputValue = function(e, t) {
  e = jqElt(e), e.val(t);
 }, utils.getInputTextValue = function(e, t, n) {
  e = jqElt(e);
  var o = e.val();
  return void 0 === o ? (inputError(e, t), void 0) : (o = utils.trim(o), 0 === o.length || void 0 !== n && !o.match(n) ? (inputError(e, t), 
  void 0) : o);
 }, utils.getInputIntValue = function(e, t, n, o) {
  e = jqElt(e);
  var i = utils.getInputTextValue(e, t);
  return void 0 === i ? void 0 : (i = parseInt(i), 0/0 === i || void 0 !== n && n > i || void 0 !== o && i > o ? (inputError(e, t), 
  void 0) : i);
 }, utils.getInputRegExpValue = function(e, t) {
  e = jqElt(e);
  var n = utils.getInputTextValue(e, t);
  if (void 0 === n) return void 0;
  try {
   new RegExp(n);
  } catch (o) {
   return inputError(e, t), void 0;
  }
  return n;
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
 }, utils.setInputChecked = function(e, t) {
  e = jqElt(e), e.prop("checked", t);
 }, utils.getInputRadio = function(e) {
  return $("input:radio[name=" + e + "]:checked").prop("value");
 }, utils.setInputRadio = function(e, t) {
  $("input:radio[name=" + e + "][value=" + t + "]").prop("checked", !0);
 }, utils.resetModalInputs = function() {
  $(".modal input[type=text]:not([disabled]), .modal input[type=password], .modal textarea").val(""), 
  $(".modal input[type=checkbox]").prop("checked", !1);
 }, utils.trim = function(e) {
  return $.trim(e);
 }, utils.slugify = function(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }, utils.checkUrl = function(e, t) {
  return e ? (0 !== e.indexOf("http") && (e = "http://" + e), t && -1 === e.indexOf("/", e.length - 1) && (e += "/"), 
  e) : e;
 }, utils.addModal = function(e, t) {
  var n = crel("div", {
   id: e,
   "class": "modal"
  });
  n.innerHTML = t, document.getElementsByTagName("body")[0].appendChild(n);
 }, utils.popupWindow = function(e, t, n, o) {
  var i = screen.width / 2 - n / 2, r = screen.height / 2 - o / 2;
  return window.open(e, t, [ "toolbar=no, ", "location=no, ", "directories=no, ", "status=no, ", "menubar=no, ", "scrollbars=no, ", "resizable=no, ", "copyhistory=no, ", "width=" + n + ", ", "height=" + o + ", ", "top=" + r + ", ", "left=" + i ].join(""));
 }, utils.saveAs = function(e, t) {
  if (void 0 !== saveAs) {
   var n = new Blob([ e ], {
    type: "text/plain;charset=utf-8"
   });
   saveAs(n, t);
  } else {
   var o = "data:application/octet-stream;base64," + utils.encodeBase64(e);
   window.open(o, "file");
  }
 }, utils.randomString = function() {
  return _.random(4294967296).toString(36);
 }, utils.updateCurrentTime = function() {
  utils.currentTime = new Date().getTime();
 }, utils.updateCurrentTime(), utils.storeAttributes = function(e) {
  var t = e.syncIndex || e.publishIndex, n = _.omit(e, "syncIndex", "publishIndex", "provider");
  n.provider = e.provider.providerId, localStorage[t] = JSON.stringify(n);
 }, utils.retrieveIndexArray = function(e) {
  try {
   return _.compact(localStorage[e].split(";"));
  } catch (t) {
   return localStorage[e] = ";", [];
  }
 }, utils.appendIndexToArray = function(e, t) {
  localStorage[e] += t + ";";
 }, utils.removeIndexFromArray = function(e, t) {
  localStorage[e] = localStorage[e].replace(";" + t + ";", ";");
 }, utils.retrieveIgnoreError = function(e) {
  try {
   return JSON.parse(localStorage[e]);
  } catch (t) {
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
  return _.each(eventList, function(t) {
   e.push("\n"), _.isString(t) ? e.push(t) : _.isArray(t) && (e.push(t[5] || ""), e.push(t[6] || ""));
  }), e.join("");
 }, utils.encodeBase64 = function(e) {
  if (0 === e.length) return "";
  var t, n, o = [], i = 0;
  for (e = encodeURI(e), t = e.length; t > i; ) n = e[i], i += 1, "%" !== n ? o.push(n.charCodeAt(0)) : (n = e[i] + e[i + 1], 
  o.push(parseInt(n, 16)), i += 2);
  var r, a, s = "=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = [], u = o.length - o.length % 3;
  for (r = 0; u > r; r += 3) a = o[r] << 16 | o[r + 1] << 8 | o[r + 2], c.push(l.charAt(a >> 18)), 
  c.push(l.charAt(63 & a >> 12)), c.push(l.charAt(63 & a >> 6)), c.push(l.charAt(63 & a));
  switch (o.length - u) {
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
  for (var t = 0, n = -1, o = 0; o < e.length; o++) t = 255 & (n ^ e.charCodeAt(o)), 
  n = n >>> 8 ^ mHash[t];
  return n = -1 ^ n, 0 > n && (n = 4294967295 + n + 1), n.toString(16);
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
 var t = {
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
  e.extend(t, JSON.parse(localStorage.settings));
 } catch (n) {}
 return t;
}), define("classes/Extension", [], function() {
 function e(e, t, n, o) {
  this.extensionId = e, this.extensionName = t, this.isOptional = n, this.disableInViewer = o;
 }
 return e;
}), define("text", [ "module" ], function(e) {
 var t, n, o, i, r = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], a = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, s = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, l = "undefined" != typeof location && location.href, c = l && location.protocol && location.protocol.replace(/\:/, ""), u = l && location.hostname, d = l && (location.port || void 0), p = [], f = e.config && e.config() || {};
 return t = {
  version: "2.0.6",
  strip: function(e) {
   if (e) {
    e = e.replace(a, "");
    var t = e.match(s);
    t && (e = t[1]);
   } else e = "";
   return e;
  },
  jsEscape: function(e) {
   return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029");
  },
  createXhr: f.createXhr || function() {
   var e, t, n;
   if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest();
   if ("undefined" != typeof ActiveXObject) for (t = 0; 3 > t; t += 1) {
    n = r[t];
    try {
     e = new ActiveXObject(n);
    } catch (o) {}
    if (e) {
     r = [ n ];
     break;
    }
   }
   return e;
  },
  parseName: function(e) {
   var t, n, o, i = !1, r = e.indexOf("."), a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
   return -1 !== r && (!a || r > 1) ? (t = e.substring(0, r), n = e.substring(r + 1, e.length)) : t = e, 
   o = n || t, r = o.indexOf("!"), -1 !== r && (i = "strip" === o.substring(r + 1), 
   o = o.substring(0, r), n ? n = o : t = o), {
    moduleName: t,
    ext: n,
    strip: i
   };
  },
  xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
  useXhr: function(e, n, o, i) {
   var r, a, s, l = t.xdRegExp.exec(e);
   return l ? (r = l[2], a = l[3], a = a.split(":"), s = a[1], a = a[0], !(r && r !== n || a && a.toLowerCase() !== o.toLowerCase() || (s || a) && s !== i)) : !0;
  },
  finishLoad: function(e, n, o, i) {
   o = n ? t.strip(o) : o, f.isBuild && (p[e] = o), i(o);
  },
  load: function(e, n, o, i) {
   if (i.isBuild && !i.inlineText) return o(), void 0;
   f.isBuild = i.isBuild;
   var r = t.parseName(e), a = r.moduleName + (r.ext ? "." + r.ext : ""), s = n.toUrl(a), p = f.useXhr || t.useXhr;
   !l || p(s, c, u, d) ? t.get(s, function(n) {
    t.finishLoad(e, r.strip, n, o);
   }, function(e) {
    o.error && o.error(e);
   }) : n([ a ], function(e) {
    t.finishLoad(r.moduleName + "." + r.ext, r.strip, e, o);
   });
  },
  write: function(e, n, o) {
   if (p.hasOwnProperty(n)) {
    var i = t.jsEscape(p[n]);
    o.asModule(e + "!" + n, "define(function () { return '" + i + "';});\n");
   }
  },
  writeFile: function(e, n, o, i, r) {
   var a = t.parseName(n), s = a.ext ? "." + a.ext : "", l = a.moduleName + s, c = o.toUrl(a.moduleName + s) + ".js";
   t.load(l, o, function() {
    var n = function(e) {
     return i(c, e);
    };
    n.asModule = function(e, t) {
     return i.asModule(e, c, t);
    }, t.write(e, l, n, r);
   }, r);
  }
 }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node ? (n = require.nodeRequire("fs"), 
 t.get = function(e, t) {
  var o = n.readFileSync(e, "utf8");
  0 === o.indexOf("﻿") && (o = o.substring(1)), t(o);
 }) : "xhr" === f.env || !f.env && t.createXhr() ? t.get = function(e, n, o, i) {
  var r, a = t.createXhr();
  if (a.open("GET", e, !0), i) for (r in i) i.hasOwnProperty(r) && a.setRequestHeader(r.toLowerCase(), i[r]);
  f.onXhr && f.onXhr(a, e), a.onreadystatechange = function() {
   var t, i;
   4 === a.readyState && (t = a.status, t > 399 && 600 > t ? (i = new Error(e + " HTTP status: " + t), 
   i.xhr = a, o(i)) : n(a.responseText), f.onXhrComplete && f.onXhrComplete(a, e));
  }, a.send(null);
 } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
  var n, o, i = "utf-8", r = new java.io.File(e), a = java.lang.System.getProperty("line.separator"), s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r), i)), l = "";
  try {
   for (n = new java.lang.StringBuffer(), o = s.readLine(), o && o.length() && 65279 === o.charAt(0) && (o = o.substring(1)), 
   n.append(o); null !== (o = s.readLine()); ) n.append(a), n.append(o);
   l = String(n.toString());
  } finally {
   s.close();
  }
  t(l);
 } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (o = Components.classes, 
 i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), 
 t.get = function(e, t) {
  var n, r, a = {}, s = new FileUtils.File(e);
  try {
   n = o["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), 
   n.init(s, 1, 0, !1), r = o["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), 
   r.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), 
   r.readString(n.available(), a), r.close(), n.close(), t(a.value);
  } catch (l) {
   throw new Error((s && s.path || "") + ": " + l);
  }
 }), t;
}), define("text!html/settingsExtensionsAccordion.html", [], function() {
 return '<div class="accordion-group">\n	<div class="accordion-heading">\n		<label class="checkbox pull-right"> <input\n			id="input-enable-extension-<%= extensionId %>" type="checkbox"<%\n			if(!isOptional) print(\'disabled\') %>> enabled\n		</label> <a data-toggle="collapse"\n			data-parent="#accordion-extensions" class="accordion-toggle"\n			href="#collapse-<%= extensionId %>"> <%= extensionName %> </a>\n	</div>\n	<div id="collapse-<%= extensionId %>" class="accordion-body collapse">\n		<div class="accordion-inner"><%= settingsBlock %></div>\n	</div>\n</div>\n';
}), define("text!html/partialRenderingSettingsBlock.html", [], function() {
 return '<p>Renders modified sections only.</p>\n<blockquote class="muted">\n	<b>NOTE:</b> Document sections are based on title elements (h1, h2...). Therefore if\n	your document does not contain any title, performance will not be increased.\n</blockquote>';
}), define("extensions/partialRendering", [ "underscore", "crel", "classes/Extension", "text!html/partialRenderingSettingsBlock.html" ], function(e, t, n, o) {
 function i(t, n) {
  if (p = [], d = [], f = void 0, h === !0 || u != n) return h = !1, u = n, d = c, 
  c = t, p = t, void 0;
  var o = c.length;
  e.some(c, function(e, n) {
   return n >= t.length || e.text != t[n].text ? (o = n, !0) : void 0;
  });
  var i = -c.length;
  e.some(c.slice().reverse(), function(e, n) {
   return n >= t.length || e.text != t[t.length - n - 1].text ? (i = -n, !0) : void 0;
  });
  var r = c.slice(0, o);
  p = t.slice(o, t.length + i);
  var a = c.slice(c.length + i, c.length);
  f = e.first(a), d = c.slice(o, c.length + i), c = r.concat(p).concat(a);
 }
 function r() {
  e.each(d, function(e) {
   var t = document.getElementById("wmd-preview-section-" + e.id);
   v.removeChild(t);
  });
  var n = document.getElementById("wmd-preview"), o = Array.prototype.slice.call(n.childNodes);
  n.innerHTML = "";
  var i = document.createDocumentFragment();
  e.each(p, function(n) {
   for (var r = t("div", {
    id: "wmd-preview-section-" + n.id,
    "class": "wmd-preview-section preview-content"
   }), a = !0; 0 !== o.length; ) {
    var s = o[0];
    if (a === !1 && /(^| )wmd-title($| )/.test(s.className)) break;
    a = !1, "DIV" == s.tagName && "footnotes" == s.className ? e.each(s.querySelectorAll("ol > li"), function(e) {
     var t = e.id.substring(3);
     y[t] = e;
    }) : r.appendChild(s), o.shift();
   }
   i.appendChild(r);
  });
  var r = b;
  void 0 !== f && (r = document.getElementById("wmd-preview-section-" + f.id)), v.insertBefore(i, r), 
  b.innerHTML = "";
  var a = [];
  if (m === !0) {
   var s = t("ol");
   e.each(v.querySelectorAll("a.footnote"), function(e, t) {
    e.textContent = t + 1;
    var n = e.id.substring(6);
    a.push(n), s.appendChild(y[n].cloneNode(!0));
   }), a.length > 0 && b.appendChild(t("div", {
    "class": "footnotes"
   }, t("hr"), s)), y = e.pick(y, a);
  }
 }
 var a = new n("partialRendering", "Partial Rendering", !0);
 a.settingsBlock = o;
 var s = void 0, l = 0, c = [], u = void 0, d = [], p = [], f = void 0, h = !1, g = !1, m = !1;
 a.onSectionsCreated = function(t) {
  var n = [], o = "";
  m = !1, e.each(t, function(e) {
   e += "\n\n", g && (e = e.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, t) {
    return t ? (m = !0, o += e, "") : e;
   })), e = e.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t) {
    return t ? (o += e, "") : e;
   }), /\S/.test(e) && n.push({
    id: ++l,
    text: e
   });
  }), i(n, o);
 };
 var b = void 0, v = void 0, y = {};
 return a.onEditorConfigure = function(t) {
  s = t.getConverter(), s.hooks.chain("preConversion", function() {
   var t = e.map(p, function(e) {
    return e.text;
   });
   return t.push(u + "\n\n"), t.join("");
  }), t.hooks.chain("onPreviewRefresh", function() {
   r();
  });
 }, a.onReady = function() {
  b = t("div", {
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
 function t(e, t, n, o) {
  this.fileIndex = e, this._title = t || localStorage[e + ".title"], this._editorScrollTop = parseInt(localStorage[e + ".editorScrollTop"]) || 0, 
  this._editorStart = parseInt(localStorage[e + ".editorStart"]) || 0, this._editorEnd = parseInt(localStorage[e + ".editorEnd"]) || 0, 
  this._previewScrollTop = parseInt(localStorage[e + ".previewScrollTop"]) || 0, this._selectTime = parseInt(localStorage[e + ".selectTime"]) || 0, 
  this.syncLocations = n || {}, this.publishLocations = o || {}, Object.defineProperty(this, "title", {
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
 return t.prototype.addSyncLocation = function(t) {
  e.storeAttributes(t), e.appendIndexToArray(this.fileIndex + ".sync", t.syncIndex), 
  this.syncLocations[t.syncIndex] = t;
 }, t.prototype.removeSyncLocation = function(t) {
  e.removeIndexFromArray(this.fileIndex + ".sync", t.syncIndex), delete this.syncLocations[t.syncIndex], 
  localStorage.removeItem(t.syncIndex);
 }, t.prototype.addPublishLocation = function(t) {
  e.storeAttributes(t), e.appendIndexToArray(this.fileIndex + ".publish", t.publishIndex), 
  this.publishLocations[t.publishIndex] = t;
 }, t.prototype.removePublishLocation = function(t) {
  e.removeIndexFromArray(this.fileIndex + ".publish", t.publishIndex), delete this.publishLocations[t.publishIndex], 
  localStorage.removeItem(t.publishIndex);
 }, t;
}), define("storage", [ "underscore", "utils" ], function(e, t) {
 var n = t.retrieveIndexArray("file.list"), o = localStorage.version;
 if (void 0 === o && (localStorage.removeItem("sync.queue"), localStorage.removeItem("sync.current"), 
 localStorage.removeItem("file.counter"), e.each(n, function(n) {
  localStorage[n + ".publish"] = ";";
  var o = t.retrieveIndexArray(n + ".sync");
  e.each(o, function(e) {
   localStorage[e + ".contentCRC"] = "0", void 0 !== localStorage[e + ".etag"] && (localStorage[e + ".titleCRC"] = "0");
  });
 }), o = "v1"), "v1" == o) {
  var i = localStorage["sync.gdrive.lastChangeId"];
  i && (localStorage["gdrive.lastChangeId"] = i, localStorage.removeItem("sync.gdrive.lastChangeId"));
  var r = localStorage["sync.dropbox.lastChangeId"];
  r && (localStorage["dropbox.lastChangeId"] = r, localStorage.removeItem("sync.dropbox.lastChangeId"));
  var a = "gdrive", s = "dropbox", l = "sync." + a + ".", c = "sync." + s + ".";
  e.each(n, function(n) {
   var o = t.retrieveIndexArray(n + ".sync");
   e.each(o, function(e) {
    var t = {};
    0 === e.indexOf(l) ? (t.provider = a, t.id = e.substring(l.length), t.etag = localStorage[e + ".etag"], 
    t.contentCRC = localStorage[e + ".contentCRC"], t.titleCRC = localStorage[e + ".titleCRC"]) : 0 === e.indexOf(c) && (t.provider = s, 
    t.path = decodeURIComponent(e.substring(c.length)), t.version = localStorage[e + ".version"], 
    t.contentCRC = localStorage[e + ".contentCRC"]), localStorage[e] = JSON.stringify(t), 
    localStorage.removeItem(e + ".etag"), localStorage.removeItem(e + ".version"), localStorage.removeItem(e + ".contentCRC"), 
    localStorage.removeItem(e + ".titleCRC");
   });
  }), o = "v2";
 }
 if ("v2" == o && (e.each(n, function(n) {
  e.has(localStorage, n + ".sync") || (localStorage.removeItem(n + ".title"), localStorage.removeItem(n + ".publish"), 
  localStorage.removeItem(n + ".content"), t.removeIndexFromArray("file.list", n));
 }), o = "v3"), "v3" == o) {
  var u = localStorage["file.current"];
  void 0 !== u && -1 === localStorage["file.list"].indexOf(";" + u + ";") && localStorage.removeItem("file.current"), 
  o = "v4";
 }
 if ("v4" == o && (localStorage.removeItem("githubToken"), o = "v5"), "v5" == o && (e.each(n, function(n) {
  var o = t.retrieveIndexArray(n + ".publish");
  e.each(o, function(e) {
   var t = JSON.parse(localStorage[e]);
   "gdrive" == t.provider && (t.id = t.fileId, t.fileId = void 0, localStorage[e] = JSON.stringify(t));
  });
 }), o = "v6"), "v6" == o) {
  var u = localStorage["file.current"];
  void 0 !== u && (localStorage[u + ".selectTime"] = new Date().getTime(), localStorage.removeItem("file.current")), 
  o = "v7";
 }
 localStorage.version = o;
}), define("fileSystem", [ "underscore", "utils", "classes/FileDescriptor", "storage" ], function(e, t, n) {
 var o = {};
 return e.each(t.retrieveIndexArray("file.list"), function(e) {
  o[e] = new n(e);
 }), o;
}), define("text!html/userCustomSettingsBlock.html", [], function() {
 return '<p>Allows users to implement their own extension.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="textarea-usercustom-code">JavaScript code\n			<a href="#" class="tooltip-usercustom-extension">(?)</a>\n		</label>\n		<div class="controls">\n			<textarea id="textarea-usercustom-code"></textarea>\n		</div>\n	</div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More info</a></span>';
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
}), define("extensions/googleAnalytics", [ "jquery", "underscore", "utils", "classes/Extension", "settings", "config" ], function(e, t, n, o, i) {
 function r() {
  n.currentTime - u > 18e4 && (_gaq.push([ "_trackPageview" ]), u = n.currentTime);
 }
 var a = new o("googleAnalytics", "Google Analytics", !0);
 a.settingsBlock = "<p>Sends anonymous statistics about usage and errors to help improve StackEdit.</p>";
 var s = !1, l = !1;
 window._gaq = [];
 var c = function() {
  if (s === !1 && l === !1) {
   var t = "/ga.js";
   location.search.match(/(\?|&)console/) && (t = "/u/ga_debug.js"), e.ajax({
    url: "http://www.google-analytics.com" + t,
    dataType: "script"
   }).done(function() {
    s = !0;
   });
  }
 }, u = 0;
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
  t.each(i.extensionSettings, function(e, t) {
   _gaq.push([ "_trackEvent", "Extensions", t + " enabled", "" + (e.enabled === !0) ]);
  }), window.onerror = function(e, t, o) {
   _gaq.push([ "_trackEvent", "Error", e, t + ":" + o + n.formatEventList() ]);
  }, c();
 }, a.onOfflineChanged = function(e) {
  l = e, c();
 };
 var d = 0;
 return a.onSyncRunning = function(e) {
  e === !0 && (d = new Date().getTime());
 }, a.onPublishRunning = function(e) {
  e === !0 && (d = new Date().getTime());
 }, a.onSyncSuccess = function() {
  var e = new Date().getTime();
  _gaq.push([ "_trackTiming", "Sync", "SyncTime", e - d ]);
 }, a.onSyncImportSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Sync", "SyncImport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncImport provider", t.providerId ]);
 }, a.onSyncExportSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Sync", "SyncExport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncExport provider", t.provider.providerId ]);
 }, a.onPublishSuccess = function(e) {
  var n = new Date().getTime();
  _gaq.push([ "_trackTiming", "Publish", "PublishSuccess", n - d ]), t.each(e.publishLocations, function(e) {
   _gaq.push([ "_trackEvent", "Publish", "PublishSuccess provider", e.provider.providerId ]);
  });
 }, a.onNewPublishSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Publish", "NewPublish provider", t.provider.providerId ]);
 }, a.onError = function(e) {
  !t.isString(e) && e.message && _gaq.push([ "_trackEvent", "Error", "message", e.message + n.formatEventList() ]);
 }, a;
}), define("text!html/dialogAbout.html", [], function() {
 return '<dl>\n	<dt>About:</dt>\n	<dd>\n		<a target="_blank" href="https://github.com/benweet/stackedit/">GitHub\n			project</a> / <a target="_blank"\n			href="https://github.com/benweet/stackedit/issues">issue tracker</a><br />\n		<a target="_blank"\n			href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome\n			app</a> (thanks for your review!)<br /> <a target="_blank"\n			href="https://twitter.com/stackedit/">Follow on Twitter</a><br /> <a\n			target="_blank" href="https://www.facebook.com/stackedit/">Follow\n			on Facebook</a><br /> <a target="_blank"\n			href="https://plus.google.com/110816046787593496375" rel="publisher">Follow\n			on Google+</a><br />\n	</dd>\n</dl>\n<dl>\n	<dt>Developers:</dt>\n	<dd>\n		<a target="_blank" href="http://www.benoitschweblin.com">Benoit\n			Schweblin</a><br /> Pete Eigel (contributor)\n	</dd>\n</dl>\n<dl>\n	<dt>Credit:</dt>\n	<dd>\n		<% _.each(libraries, function(url, name) { %> <a target="_blank"\n			href="<%= url %>"><%= name %></a><br /> <% }); %>\n	</dd>\n</dl>\n<dl>\n	<dt>Related projects:</dt>\n	<dd>\n		<% _.each(projects, function(url, name) { %> <a target="_blank"\n			href="<%= url %>"><%= name %></a><br /> <% }); %>\n	</dd>\n</dl>\n<p>Copyright 2013 <a target="_blank"\n	href="http://www.benoitschweblin.com">Benoit Schweblin</a><br />\n	Licensed under an <a target="_blank"\n	href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a></p>\n';
}), define("extensions/dialogAbout", [ "jquery", "underscore", "classes/Extension", "text!html/dialogAbout.html" ], function(e, t, n, o) {
 var i = new n("dialogAbout", 'Dialog "About"');
 i.settingsBlock = '<p>Prints the content of the "About" dialog box.</p>';
 var r = {
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
  e("#modal-about .modal-body").html(t.template(o, {
   libraries: r,
   projects: a
  }));
 }, i;
}), define("text!html/dialogManagePublicationLocation.html", [], function() {
 return '<div class="input-prepend input-append">\n	<span class="add-on" title="<%= provider.providerName %>"> <i\n		class="icon-<%= provider.providerId %>"></i>\n	</span> <input class="span5" type="text" value="<%= publishDesc %>" disabled />\n</div>\n';
}), define("extensions/dialogManagePublication", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManagePublicationLocation.html" ], function(e, t, n, o) {
 var i = new n("dialogManagePublication", 'Dialog "Manage publication"');
 i.settingsBlock = '<p>Populates the "Manage publication" dialog box.</p>';
 var r = void 0;
 i.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0, s = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>', l = function(n) {
  if (void 0 === n || n === a) {
   var i = t.values(a.publishLocations);
   e(".msg-no-publish, .msg-publish-list").addClass("hide");
   var l = e("#manage-publish-list").empty();
   i.length > 0 ? e(".msg-publish-list").removeClass("hide") : e(".msg-no-publish").removeClass("hide"), 
   t.each(i, function(n) {
    formattedAttributes = t.omit(n, "provider", "publishIndex", "sharingLink"), formattedAttributes.password && (formattedAttributes.password = "********");
    var i = JSON.stringify(formattedAttributes).replace(/{|}|"/g, "").replace(/,/g, ", "), c = e(t.template(o, {
     provider: n.provider,
     publishDesc: i
    }));
    c.append(e(s).click(function() {
     a.removePublishLocation(n), r.onPublishRemoved(a, n);
    })), l.append(c);
   });
  }
 };
 return i.onFileSelected = function(e) {
  a = e, l(e);
 }, i.onNewPublishSuccess = l, i.onPublishRemoved = l, i;
}), define("text!html/dialogManageSynchronizationLocation.html", [], function() {
 return '<div class="input-prepend input-append">\n	<span class="add-on" title="<%= provider.providerName %><%= isRealtime ? \' (real time)\' : \'\' %>"> <i\n		class="icon-<%= provider.providerId %><%= isRealtime ? \' realtime\' : \'\' %>"></i>\n	</span> <input class="span5" type="text" value="<%= syncDesc %>" disabled />\n</div>\n';
}), define("extensions/dialogManageSynchronization", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManageSynchronizationLocation.html" ], function(e, t, n, o) {
 var i = new n("dialogManageSynchronization", 'Dialog "Manage synchronization"');
 i.settingsBlock = '<p>Populates the "Manage synchronization" dialog box.</p>';
 var r = void 0;
 i.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0;
 i.onSynchronizerCreated = function(e) {
  a = e;
 };
 var s = void 0, l = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>', c = function(n) {
  if (void 0 === n || n === s) {
   var i = t.values(s.syncLocations);
   e(".msg-no-sync, .msg-sync-list").addClass("hide");
   var c = e("#manage-sync-list").empty();
   i.length > 0 ? e(".msg-sync-list").removeClass("hide") : e(".msg-no-sync").removeClass("hide"), 
   t.each(i, function(n) {
    var i = n.id || n.path, u = e(t.template(o, {
     provider: n.provider,
     syncDesc: i,
     isRealtime: n.isRealtime
    }));
    u.append(e(l).click(function() {
     a.tryStopRealtimeSync(), s.removeSyncLocation(n), r.onSyncRemoved(s, n);
    })), c.append(u);
   });
  }
 };
 return i.onFileSelected = function(e) {
  s = e, c(e);
 }, i.onSyncExportSuccess = c, i.onSyncRemoved = c, i.onReady = function() {
  e(".sync-manual").each(function() {
   var t = e(this);
   t.find("input").keyup(function(e) {
    13 == e.which && (t.find("a").click(), e.stopPropagation());
   });
  });
 }, i;
}), function() {
 var e = this, t = {}, n = !1;
 "undefined" != typeof module && module.exports ? (module.exports = t, e.toMarkdown = t, 
 n = !0) : e.toMarkdown = t, t.converter = function(e) {
  e && e.elements && $.isArray(e.elements) && (c = c.concat(e.elements)), this.makeMd = function(e, t) {
   var i;
   if (n) {
    var r = require("jsdom");
    r.env({
     html: e,
     scripts: [ "http://code.jquery.com/jquery-1.6.4.min.js" ],
     done: function(n, i) {
      "function" == typeof t && t(o(e, i.$));
     }
    });
   } else i = o(e, $);
   return i;
  };
 };
 var o = function(e, t) {
  e = e.replace(/(\d+)\. /g, "$1\\. ");
  var n = t("<div/>"), o = n.html(e);
  o.find("*:not(pre, code)").contents().filter(function() {
   return 3 === this.nodeType && /^\s+$/.test(this.nodeValue);
  }).remove();
  for (var i = [], r = 0, s = c.length; s > r; r++) i.push(c[r].selector);
  for (i = i.join(","); o.find(i).length; ) for (var r = 0, s = c.length; s > r; r++) $matches = o.find(c[r].selector + ':not(:has("' + i + '"))'), 
  $matches.each(function(e, n) {
   var o = t(n);
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
  replacement: function(e, t) {
   e = $.trim(e);
   for (var n = t.prop("nodeName").charAt(1), o = "", i = 0; n > i; i++) o += "#";
   return e ? "\n\n" + o + " " + e + "\n\n" : "";
  }
 }, {
  selector: "hr",
  replacement: function() {
   return "\n\n* * *\n\n";
  }
 }, {
  selector: "a[href]",
  replacement: function(e, t) {
   if (e) {
    e = i(e);
    var n = t.attr("href"), o = t.attr("title") || "";
    return "[" + e + "]" + "(" + n + (o ? ' "' + o + '"' : "") + ")";
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
  replacement: function(e, t) {
   var n = t.attr("alt") || "", o = t.attr("src") || "", i = t.attr("title") || "";
   return "![" + n + "]" + "(" + o + (i ? ' "' + i + '"' : "") + ")";
  }
 }, {
  selector: "pre",
  replacement: function(e) {
   return /^\s*\`/.test(e) ? (e = e.replace(/\`/g, ""), "    " + e.replace(/\n/g, "\n    ")) : "";
  }
 }, {
  selector: "li",
  replacement: function(e, t) {
   e = e.replace(/^\s+|\s+$/, "").replace(/\n/gm, "\n    ");
   var n = "*   ", o = "", i = t.parent(), r = i.contents().filter(function() {
    return 1 === this.nodeType && "LI" === this.nodeName || 3 === this.nodeType;
   }), a = r.index(t) + 1;
   return n = i.is("ol") ? a + ".  " : "*   ", a == r.length && (t.parents("li").length || (o = "\n"), 
   e = e.replace(/\s+$/, ""), t.unwrap()), n + e + o + "\n";
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
  var t;
  return t || e.toMarkdown;
 };
}(this)), define("extensions/dialogOpenHarddrive", [ "jquery", "underscore", "utils", "classes/Extension", "toMarkdown", "config" ], function(e, t, n, o, i) {
 function r(n) {
  n.stopPropagation(), n.preventDefault();
  var o = (n.dataTransfer || n.target).files;
  e("#modal-import-harddrive-markdown, #modal-import-harddrive-html").modal("hide"), 
  t.each(o, function(t) {
   if (!e(n.target).is("#wmd-input") || !t.name.match(/.(jpe?g|png|gif)$/)) {
    var o = new FileReader();
    o.onload = function(e) {
     return function(t) {
      var n = t.target.result;
      if (n.match(/\uFFFD/)) return d.onError(e.name + " is a binary file."), void 0;
      if (n = p ? p(n) : n, void 0 === n) return d.onError(e.name + " is not a valid HTML file."), 
      void 0;
      var o = e.name, i = o.lastIndexOf(".");
      o = -1 !== i ? o.substring(0, i) : o;
      var r = u.createFile(o, n);
      u.selectFile(r);
     };
    }(t);
    var i = t.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
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
 var c = new o("dialogOpenHarddrive", 'Dialog "Open from"');
 c.settingsBlock = '<p>Handles the "Import from hard drive" and the "Convert HTML to Markdown" dialog boxes.</p>';
 var u = void 0;
 c.onFileMgrCreated = function(e) {
  u = e;
 };
 var d = void 0;
 c.onEventMgrCreated = function(e) {
  d = e;
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
   var t = n.getInputTextValue("#input-convert-html", e);
   if (void 0 !== t) {
    if (t = f.makeMd(t), void 0 === t) return d.onError("Invalid HTML code."), void 0;
    var o = u.createFile(void 0, t);
    u.selectFile(o);
   }
  });
 }, c;
}), function() {
 function e(e, t, n) {
  return e.addEventListener ? (e.addEventListener(t, n, !1), void 0) : (e.attachEvent("on" + t, n), 
  void 0);
 }
 function t(e) {
  if ("keypress" == e.type) {
   var t = String.fromCharCode(e.which);
   return e.shiftKey || (t = t.toLowerCase()), t;
  }
  return x[e.which] ? x[e.which] : w[e.which] ? w[e.which] : String.fromCharCode(e.which).toLowerCase();
 }
 function n(e, t) {
  return e.sort().join(",") === t.sort().join(",");
 }
 function o(e) {
  e = e || {};
  var t, n = !1;
  for (t in T) e[t] ? n = !0 : T[t] = 0;
  n || (I = !1);
 }
 function i(e, t, o, i, r, a) {
  var s, l, u = [], d = o.type;
  if (!C[e]) return [];
  for ("keyup" == d && c(e) && (t = [ e ]), s = 0; s < C[e].length; ++s) if (l = C[e][s], 
  (i || !l.seq || T[l.seq] == l.level) && d == l.action && ("keypress" == d && !o.metaKey && !o.ctrlKey || n(t, l.modifiers))) {
   var p = !i && l.combo == r, f = i && l.seq == i && l.level == a;
   (p || f) && C[e].splice(s, 1), u.push(l);
  }
  return u;
 }
 function r(e) {
  var t = [];
  return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
  e.metaKey && t.push("meta"), t;
 }
 function a(e, t, n) {
  z.stopCallback(t, t.target || t.srcElement, n) || e(t, n) === !1 && (t.preventDefault && t.preventDefault(), 
  t.stopPropagation && t.stopPropagation(), t.returnValue = !1, t.cancelBubble = !0);
 }
 function s(e, t, n) {
  var r, s = i(e, t, n), l = {}, u = 0, d = !1;
  for (r = 0; r < s.length; ++r) s[r].seq && (u = Math.max(u, s[r].level));
  for (r = 0; r < s.length; ++r) if (s[r].seq) {
   if (s[r].level != u) continue;
   d = !0, l[s[r].seq] = 1, a(s[r].callback, n, s[r].combo);
  } else d || a(s[r].callback, n, s[r].combo);
  n.type != I || c(e) || o(l);
 }
 function l(e) {
  "number" != typeof e.which && (e.which = e.keyCode);
  var n = t(e);
  if (n) return "keyup" == e.type && _ == n ? (_ = !1, void 0) : (z.handleKey(n, r(e), e), 
  void 0);
 }
 function c(e) {
  return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
 }
 function u() {
  clearTimeout(y), y = setTimeout(o, 1e3);
 }
 function d() {
  if (!v) {
   v = {};
   for (var e in x) e > 95 && 112 > e || x.hasOwnProperty(e) && (v[x[e]] = e);
  }
  return v;
 }
 function p(e, t, n) {
  return n || (n = d()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
  n;
 }
 function f(e, n, i, r) {
  function s(t) {
   return function() {
    I = t, ++T[e], u();
   };
  }
  function l(n) {
   a(i, n, e), "keyup" !== r && (_ = t(n)), setTimeout(o, 10);
  }
  T[e] = 0;
  for (var c = 0; c < n.length; ++c) {
   var d = c + 1 === n.length, p = d ? l : s(r || g(n[c + 1]).action);
   m(n[c], p, r, e, c);
  }
 }
 function h(e) {
  return "+" === e ? [ "+" ] : e.split("+");
 }
 function g(e, t) {
  var n, o, i, r = [];
  for (n = h(e), i = 0; i < n.length; ++i) o = n[i], S[o] && (o = S[o]), t && "keypress" != t && k[o] && (o = k[o], 
  r.push("shift")), c(o) && r.push(o);
  return t = p(o, r, t), {
   key: o,
   modifiers: r,
   action: t
  };
 }
 function m(e, t, n, o, r) {
  E[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
  var a, s = e.split(" ");
  return s.length > 1 ? (f(e, s, t, n), void 0) : (a = g(e, n), C[a.key] = C[a.key] || [], 
  i(a.key, a.modifiers, {
   type: a.action
  }, o, e, r), C[a.key][o ? "unshift" : "push"]({
   callback: t,
   modifiers: a.modifiers,
   action: a.action,
   seq: o,
   level: r,
   combo: e
  }), void 0);
 }
 function b(e, t, n) {
  for (var o = 0; o < e.length; ++o) m(e[o], t, n);
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
 }, S = {
  option: "alt",
  command: "meta",
  "return": "enter",
  escape: "esc",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
 }, C = {}, E = {}, T = {}, _ = !1, I = !1, P = 1; 20 > P; ++P) x[111 + P] = "f" + P;
 for (P = 0; 9 >= P; ++P) x[P + 96] = P;
 e(document, "keypress", l), e(document, "keydown", l), e(document, "keyup", l);
 var z = {
  bind: function(e, t, n) {
   return e = e instanceof Array ? e : [ e ], b(e, t, n), this;
  },
  unbind: function(e, t) {
   return z.bind(e, function() {}, t);
  },
  trigger: function(e, t) {
   return E[e + ":" + t] && E[e + ":" + t]({}, e), this;
  },
  reset: function() {
   return C = {}, E = {}, this;
  },
  stopCallback: function(e, t) {
   return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.contentEditable && "true" == t.contentEditable;
  },
  handleKey: s
 };
 window.Mousetrap = z, "function" == typeof define && define.amd && define("mousetrap", z);
}(), define("text!html/documentSelectorSettingsBlock.html", [], function() {
 return '<p>Builds the "Open document" dropdown menu.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="select-document-selector-orderby">Order\n			by</label>\n		<div class="controls">\n			<select id="select-document-selector-orderby">\n				<option value="title">Document title</option>\n				<option value="mru">Most recently used</option>\n			</select>\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label"\n			for="input-document-selector-shortcut-previous">"Previous"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="controls">\n			<input type="text" id="input-document-selector-shortcut-previous"\n				class="span2">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label"\n			for="input-document-selector-shortcut-next">"Next"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="controls">\n			<input type="text" id="input-document-selector-shortcut-next"\n				class="span2">\n		</div>\n	</div>\n</div>';
}), define("extensions/documentSelector", [ "jquery", "underscore", "utils", "classes/Extension", "mousetrap", "fileSystem", "text!html/documentSelectorSettingsBlock.html" ], function(e, t, n, o, i, r, a) {
 function s(n) {
  var o = e("#file-selector li:not(.stick)");
  if (o.show(), n) {
   var i = n.toLowerCase().split(/\s+/);
   o.each(function() {
    var n = e(this).text().toLowerCase();
    t.some(i, function(e) {
     return -1 === n.indexOf(e);
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
  n.setInputValue("#select-document-selector-orderby", l.config.orderBy), n.setInputValue("#input-document-selector-shortcut-previous", l.config.shortcutPrevious), 
  n.setInputValue("#input-document-selector-shortcut-next", l.config.shortcutNext);
 }, l.onSaveSettings = function(e, t) {
  e.orderBy = n.getInputValue("#select-document-selector-orderby"), e.shortcutPrevious = n.getInputTextValue("#input-document-selector-shortcut-previous", t), 
  e.shortcutNext = n.getInputTextValue("#input-document-selector-shortcut-next", t);
 };
 var c = void 0;
 l.onFileMgrCreated = function(e) {
  c = e;
 };
 var u = void 0, d = void 0, p = void 0, f = void 0, h = function() {
  function n(e) {
   var n = [], o = t.values(e.syncLocations), i = t.values(e.publishLocations), r = o.concat(i);
   return t.chain(r).sortBy(function(e) {
    return e.provider.providerId;
   }).each(function(e) {
    var t = "icon-" + e.provider.providerId;
    e.isRealtime === !0 && (t += " realtime"), n.push('<i class="' + t + '"></i>');
   }), n.push(" "), n.push(e.title), n.join("");
  }
  u = {}, e("#file-selector li:not(.stick)").empty(), t.chain(r).sortBy(p).each(function(t) {
   var o = e('<a href="#">').html(n(t)).click(function() {
    u[t.fileIndex].is(".disabled") ? e("#wmd-input").focus() : c.selectFile(t);
   }), i = e("<li>").append(o);
   u[t.fileIndex] = i, t === f && i.addClass("disabled"), e("#file-selector").append(i);
  }), d = t.values(u);
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
  var n = void 0;
  e(".action-open-file").click(function() {
   e("#file-selector").parent().is(".open") || (s(), void 0 === n && t.defer(function() {
    e("#file-search").val("").focus();
   }));
  }).prop("title", t.template("<%= title %>  <%= shortcutPrevious %>  <%= shortcutNext %>", {
   title: e(".action-open-file").prop("title"),
   shortcutPrevious: l.config.shortcutPrevious,
   shortcutNext: l.config.shortcutNext
  })), e("#file-search").keyup(function(t) {
   13 == t.which || 27 == t.which ? e(this).parent().click() : s(e(this).val());
  }).click(function(e) {
   e.stopPropagation();
  });
  var o = l.config.shortcutPrevious.toLowerCase();
  i.bind(o, function() {
   void 0 === n && (e("#file-selector").parent().is(".open") || e(".action-open-file").click(), 
   n = u[f.fileIndex]);
   var o = t.indexOf(d, n) - 1;
   return -2 === o && (o = -1), n = d[(o + d.length) % d.length], t.defer(function() {
    n.find("a").focus();
   }), !1;
  });
  var r = l.config.shortcutNext.toLowerCase();
  i.bind(l.config.shortcutNext.toLowerCase(), function() {
   void 0 === n && (e("#file-selector").parent().is(".open") || e(".action-open-file").click(), 
   n = u[f.fileIndex]);
   var o = t.indexOf(d, n) + 1;
   return n = d[o % d.length], t.defer(function() {
    n.find("a").focus();
   }), !1;
  });
  var a = o.indexOf("+"), c = -1 === a ? o : o.substring(0, a), h = r.indexOf("+"), g = -1 === h ? r : r.substring(0, h);
  i.bind([ c, g ], function() {
   void 0 !== n && (n.find("a").click(), n = void 0);
  }, "keyup");
 }, l;
}), define("extensions/documentTitle", [ "jquery", "underscore", "classes/Extension" ], function(e, t, n) {
 var o = new n("documentTitle", "Document Title");
 o.settingsBlock = "<p>Responsible for showing the document title in the navigation bar.</p>";
 var i = void 0;
 o.onLayoutCreated = function(e) {
  i = e;
 };
 var r = void 0, a = function(n) {
  function o(e) {
   var n = [], o = t.values(e.syncLocations), i = t.values(e.publishLocations), r = o.concat(i);
   return t.chain(r).sortBy(function(e) {
    return e.provider.providerId;
   }).each(function(e) {
    var t = "icon-" + e.provider.providerId;
    e.isRealtime === !0 && (t += " realtime"), n.push('<i class="' + t + '"></i>');
   }), n.push(" "), n.push(e.title), n.join("");
  }
  if (n === r) {
   var a = r.title;
   document.title = "StackEdit - " + a, e("#file-title").html(o(r)), e(".file-title").text(a), 
   e("#file-title-input").val(a), void 0 !== i && t.defer(i.resizeAll);
  }
 };
 return o.onFileSelected = function(e) {
  r = e, a(e);
 }, o.onTitleChanged = a, o.onSyncExportSuccess = a, o.onSyncRemoved = a, o.onNewPublishSuccess = a, 
 o.onPublishRemoved = a, o;
}), define("extensions/workingIndicator", [ "jquery", "underscore", "classes/Extension" ], function(e, t, n) {
 var o = new n("workingIndicator", "Working Indicator");
 return o.settingsBlock = "<p>Displays an animated image when a network operation is running.</p>", 
 o.onAsyncRunning = function(t) {
  t === !1 ? (e(".working-indicator").removeClass("show"), e("body").removeClass("working")) : (e(".working-indicator").addClass("show"), 
  e("body").addClass("working"));
 }, o;
}), function(e) {
 var t = function() {
  return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace;
 }();
 e.jGrowl = function(t, n) {
  0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(n && n.position ? n.position : e.jGrowl.defaults.position).appendTo("body"), 
  e("#jGrowl").jGrowl(t, n);
 }, e.fn.jGrowl = function(t, n) {
  if (e.isFunction(this.each)) {
   var o = arguments;
   return this.each(function() {
    void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl(), {
     notifications: [],
     element: null,
     interval: null
    })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(o).slice(1)) : e(this).data("jGrowl.instance").create(t, n);
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
  create: function(t, n) {
   var n = e.extend({}, this.defaults, n);
   "undefined" != typeof n.speed && (n.openDuration = n.speed, n.closeDuration = n.speed), 
   this.notifications.push({
    message: t,
    options: n
   }), n.log.apply(this.element, [ this.element, t, n ]);
  },
  render: function(t) {
   var n = this, o = t.message, i = t.options;
   i.themeState = "" == i.themeState ? "" : "ui-state-" + i.themeState;
   var t = e("<div/>").addClass("jGrowl-notification " + i.themeState + " ui-corner-all" + (void 0 != i.group && "" != i.group ? " " + i.group : "")).append(e("<div/>").addClass("jGrowl-close").html(i.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(i.header)).append(e("<div/>").addClass("jGrowl-message").html(o)).data("jGrowl", i).addClass(i.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
    e(this).parent().trigger("jGrowl.beforeClose");
   }).parent();
   e(t).bind("mouseover.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !0);
   }).bind("mouseout.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !1);
   }).bind("jGrowl.beforeOpen", function() {
    0 != i.beforeOpen.apply(t, [ t, o, i, n.element ]) && e(this).trigger("jGrowl.open");
   }).bind("jGrowl.open", function() {
    0 != i.open.apply(t, [ t, o, i, n.element ]) && ("after" == i.glue ? e("div.jGrowl-notification:last", n.element).after(t) : e("div.jGrowl-notification:first", n.element).before(t), 
    e(this).animate(i.animateOpen, i.openDuration, i.easing, function() {
     e.support.opacity === !1 && this.style.removeAttribute("filter"), null != e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date()), 
     e(this).trigger("jGrowl.afterOpen");
    }));
   }).bind("jGrowl.afterOpen", function() {
    i.afterOpen.apply(t, [ t, o, i, n.element ]);
   }).bind("jGrowl.beforeClose", function() {
    0 != i.beforeClose.apply(t, [ t, o, i, n.element ]) && e(this).trigger("jGrowl.close");
   }).bind("jGrowl.close", function() {
    e(this).data("jGrowl.pause", !0), e(this).animate(i.animateClose, i.closeDuration, i.easing, function() {
     e.isFunction(i.close) ? i.close.apply(t, [ t, o, i, n.element ]) !== !1 && e(this).remove() : e(this).remove();
    });
   }).trigger("jGrowl.beforeOpen"), "" != i.corners && void 0 != e.fn.corner && e(t).corner(i.corners), 
   e("div.jGrowl-notification:parent", n.element).size() > 1 && 0 == e("div.jGrowl-closer", n.element).size() && 0 != this.defaults.closer && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(n.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
    e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(n.defaults.closer) && n.defaults.closer.apply(e(this).parent()[0], [ e(this).parent()[0] ]);
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
  startup: function(n) {
   this.element = e(n).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), 
   this.interval = setInterval(function() {
    e(n).data("jGrowl.instance").update();
   }, parseInt(this.defaults.check)), t && e(this.element).addClass("ie6");
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
  var t;
  return t || e.jQuery.jGrowl;
 };
}(this)), define("text!html/notificationsSettingsBlock.html", [], function() {
 return '<p>Shows notification messages in the bottom-right corner of the\n	screen.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="input-notifications-timeout">Timeout</label>\n		<div class="controls">\n			<input type="text" id="input-notifications-timeout"\n				class="input-mini"> <span class="help-inline">ms</span>\n		</div>\n	</div>\n</div>';
}), define("extensions/notifications", [ "jquery", "underscore", "utils", "classes/Extension", "jgrowl", "text!html/notificationsSettingsBlock.html" ], function(e, t, n, o, i, r) {
 function a() {
  c === !1 && (i.defaults.life = l.config.timeout, i.defaults.closer = !1, i.defaults.closeTemplate = "", 
  i.defaults.position = "bottom-right", c = !0);
 }
 function s(e, n, o) {
  if (logger.info(e), a(), e) {
   var r = e.indexOf("|");
   (-1 === r || (e = e.substring(0, r))) && (o = o || {}, n = n || "icon-info-sign", 
   i("<i class='icon-white " + n + "'></i> " + t.escape(e), o));
  }
 }
 var l = new o("notifications", "Notifications");
 l.settingsBlock = r, l.defaultConfig = {
  timeout: 8e3
 }, l.onLoadSettings = function() {
  n.setInputValue("#input-notifications-timeout", l.config.timeout);
 }, l.onSaveSettings = function(e, t) {
  e.timeout = n.getInputIntValue("#input-notifications-timeout", t, 1, 6e4);
 };
 var c = !1;
 return l.onMessage = function(e) {
  s(e);
 }, l.onError = function(e) {
  logger.error(e), t.isString(e) ? s(e, "icon-warning-sign") : t.isObject(e) && s(e.message, "icon-warning-sign");
 }, l.onOfflineChanged = function(t) {
  t === !0 ? s("You are offline.", "icon-exclamation-sign msg-offline", {
   sticky: !0,
   close: function() {
    s("You are back online!", "icon-signal");
   }
  }) : e(".msg-offline").parents(".jGrowl-notification").trigger("jGrowl.beforeClose");
 }, l.onSyncImportSuccess = function(e, n) {
  var o = t.map(e, function(e) {
   return e.title;
  }).join(", ");
  s(o + " imported successfully from " + n.providerName + ".");
 }, l.onSyncExportSuccess = function(e, t) {
  s('"' + e.title + '" will now be synchronized on ' + t.provider.providerName + ".");
 }, l.onSyncRemoved = function(e, t) {
  s(t.provider.providerName + " synchronized location has been removed.");
 }, l.onPublishSuccess = function(e) {
  s('"' + e.title + '" successfully published.');
 }, l.onNewPublishSuccess = function(e, t) {
  s('"' + e.title + '" is now published on ' + t.provider.providerName + ".");
 }, l.onPublishRemoved = function(e, t) {
  s(t.provider.providerName + " publish location has been removed.");
 }, l;
}), define("text!html/markdownExtraSettingsBlock.html", [], function() {
 return '<p>Adds extra features to the original Markdown syntax.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-fencedcodegfm">GFM fenced code blocks</label>\n		<div class="controls">\n			<input type="checkbox" id="input-markdownextra-fencedcodegfm">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-tables">Tables</label>\n		<div class="controls">\n			<input type="checkbox" id="input-markdownextra-tables">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-deflist">Definition lists</label>\n		<div class="controls">\n			<input type="checkbox" id="input-markdownextra-deflist">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-attrlist">Special attributes</label>\n		<div class="controls">\n			<input type="checkbox" id="input-markdownextra-attrlist">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-footnotes">Footnotes</label>\n		<div class="controls">\n			<input type="checkbox" id="input-markdownextra-footnotes">\n		</div>\n	</div>\n	<div class="control-group">\n		<label class="control-label" for="input-markdownextra-highlighter">Syntax\n			highlighter</label>\n		<div class="controls">\n			<select id="input-markdownextra-highlighter"><option>None</option>\n				<option value="prettify">Prettify</option>\n				<option value="highlight">Highlight.js</option>\n			</select>\n		</div>\n	</div>\n</div>\n<span class="help-block pull-right"><a target="_blank"\n	href="https://github.com/jmcmanus/pagedown-extra">More info</a></span>';
});

var Markdown;

Markdown = "object" == typeof exports && "function" == typeof require ? exports : {}, 
function() {
 function e(e) {
  return e;
 }
 function t() {
  return !1;
 }
 function n() {}
 function o() {}
 n.prototype = {
  chain: function(t, n) {
   var o = this[t];
   if (!o) throw new Error("unknown hook " + t);
   this[t] = o === e ? n : function() {
    var e = Array.prototype.slice.call(arguments, 0);
    return e[0] = o.apply(null, e), n.apply(null, e);
   };
  },
  set: function(e, t) {
   if (!this[e]) throw new Error("unknown hook " + e);
   this[e] = t;
  },
  addNoop: function(t) {
   this[t] = e;
  },
  addFalse: function(e) {
   this[e] = t;
  }
 }, Markdown.HookCollection = n, o.prototype = {
  set: function(e, t) {
   this["s_" + e] = t;
  },
  get: function(e) {
   return this["s_" + e];
  }
 }, Markdown.Converter = function() {
  function e(e) {
   return e = e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t, n, o, i, r) {
    return t = t.toLowerCase(), L.set(t, S(n)), i ? o : (r && A.set(t, r.replace(/"/g, "&quot;")), 
    "");
   });
  }
  function t(e) {
   return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, i), 
   e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, i), 
   e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, i), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, i), 
   e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, i);
  }
  function i(e, t) {
   var n = t;
   return n = n.replace(/^\n+/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (M.push(n) - 1) + "K\n\n";
  }
  function r(e, n) {
   e = R.preBlockGamut(e, O), e = f(e);
   var o = "<hr />\n";
   return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, o), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, o), 
   e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, o), e = h(e), e = m(e), e = w(e), 
   e = R.postBlockGamut(e, O), e = t(e), e = k(e, n);
  }
  function a(e) {
   return e = R.preSpanGamut(e), e = v(e), e = s(e), e = C(e), e = u(e), e = l(e), 
   e = T(e), e = e.replace(/~P/g, "://"), e = S(e), e = x(e), e = e.replace(/  +\n/g, " <br>\n"), 
   e = R.postSpanGamut(e);
  }
  function s(e) {
   var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
   return e = e.replace(t, function(e) {
    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
    return t = $(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_");
   });
  }
  function l(e) {
   return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, c), 
   e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
   e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, c);
  }
  function c(e, t, n, o, i, r, a, s) {
   void 0 == s && (s = "");
   var l = t, c = n.replace(/:\/\//g, "~P"), u = o.toLowerCase(), p = i, f = s;
   if ("" == p) if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, 
   void 0 != L.get(u)) p = L.get(u), void 0 != A.get(u) && (f = A.get(u)); else {
    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
    p = "";
   }
   p = z(p), p = $(p, "*_");
   var h = '<a href="' + p + '"';
   return "" != f && (f = d(f), f = $(f, "*_"), h += ' title="' + f + '"'), h += ">" + c + "</a>";
  }
  function u(e) {
   return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p);
  }
  function d(e) {
   return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function p(e, t, n, o, i, r, a, s) {
   var l = t, c = n, u = o.toLowerCase(), p = i, f = s;
   if (f || (f = ""), "" == p) {
    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, void 0 == L.get(u)) return l;
    p = L.get(u), void 0 != A.get(u) && (f = A.get(u));
   }
   c = $(d(c), "*_[]()"), p = $(p, "*_");
   var h = '<img src="' + p + '" alt="' + c + '"';
   return f = d(f), f = $(f, "*_"), h += ' title="' + f + '"', h += " />";
  }
  function f(e) {
   return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
    return '<h1 class="wmd-title">' + a(t) + "</h1>\n\n";
   }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
    return '<h2 class="wmd-title">' + a(t) + "</h2>\n\n";
   }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
    var o = t.length;
    return "<h" + o + ' class="wmd-title">' + a(n) + "</h" + o + ">\n\n";
   });
  }
  function h(e, t) {
   e += "~0";
   var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
   return j ? e = e.replace(n, function(e, n, o) {
    var i = n, r = o.search(/[*+-]/g) > -1 ? "ul" : "ol", a = g(i, r, t);
    return a = a.replace(/\s+$/, ""), a = "<" + r + ">" + a + "</" + r + ">\n";
   }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
   e = e.replace(n, function(e, t, n, o) {
    var i = t, r = n, a = o.search(/[*+-]/g) > -1 ? "ul" : "ol", s = g(r, a);
    return s = i + "<" + a + ">\n" + s + "</" + a + ">\n";
   })), e = e.replace(/~0/, "");
  }
  function g(e, t, n) {
   j++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
   var o = D[t], i = new RegExp("(^[ \\t]*)(" + o + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + o + ")[ \\t]+))", "gm"), s = !1;
   return e = e.replace(i, function(e, t, o, i) {
    var l = i, c = /\n\n$/.test(l), u = c || l.search(/\n{2,}/) > -1;
    return u || s ? l = r(I(l), !0) : (l = h(I(l), !0), l = l.replace(/\n$/, ""), n || (l = a(l))), 
    s = c, "<li>" + l + "</li>\n";
   }), e = e.replace(/~0/g, ""), j--, e;
  }
  function m(e) {
   return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
    var o = t, i = n;
    return o = y(I(o)), o = P(o), o = o.replace(/^\n+/g, ""), o = o.replace(/\n+$/g, ""), 
    o = "<pre><code>" + o + "\n</code></pre>", "\n\n" + o + "\n\n" + i;
   }), e = e.replace(/~0/, "");
  }
  function b(e) {
   return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (M.push(e) - 1) + "K\n\n";
  }
  function v(e) {
   return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, o) {
    var i = o;
    return i = i.replace(/^([ \t]*)/g, ""), i = i.replace(/[ \t]*$/g, ""), i = y(i), 
    i = i.replace(/:\/\//g, "~P"), t + "<code>" + i + "</code>";
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
   return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
    var n = t;
    return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), 
    n = r(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
     var n = t;
     return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "");
    }), b("<blockquote>\n" + n + "\n</blockquote>");
   });
  }
  function k(e, t) {
   e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
   for (var n = e.split(/\n{2,}/g), o = [], i = /~K(\d+)K/, r = n.length, s = 0; r > s; s++) {
    var l = n[s];
    i.test(l) ? o.push(l) : /\S/.test(l) && (l = a(l), l = l.replace(/^([ \t]*)/g, "<p>"), 
    l += "</p>", o.push(l));
   }
   if (!t) {
    r = o.length;
    for (var s = 0; r > s; s++) for (var c = !0; c; ) c = !1, o[s] = o[s].replace(/~K(\d+)K/g, function(e, t) {
     return c = !0, M[t];
    });
   }
   return o.join("\n\n");
  }
  function S(e) {
   return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
  }
  function C(e) {
   return e = e.replace(/\\(\\)/g, N), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, N);
  }
  function E(e, t, n, o) {
   if (t) return e;
   if (")" !== o.charAt(o.length - 1)) return "<" + n + o + ">";
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
   return "<" + n + o + ">" + s;
  }
  function T(e) {
   e = e.replace(q, E);
   var t = function(e, t) {
    return '<a href="' + t + '">' + R.plainLinkText(t) + "</a>";
   };
   return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t);
  }
  function _(e) {
   return e = e.replace(/~E(\d+)E/g, function(e, t) {
    var n = parseInt(t);
    return String.fromCharCode(n);
   });
  }
  function I(e) {
   return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "");
  }
  function P(e) {
   if (!/\t/.test(e)) return e;
   var t, n = [ "    ", "   ", "  ", " " ], o = 0;
   return e.replace(/[\n\t]/g, function(e, i) {
    return "\n" === e ? (o = i + 1, e) : (t = (i - o) % 4, o = i + 1, n[t]);
   });
  }
  function z(e) {
   return e ? (e.length, e.replace(U, function(e) {
    return "~D" == e ? "%24" : ":" == e ? ":" : "%" + e.charCodeAt(0).toString(16);
   })) : "";
  }
  function $(e, t, n) {
   var o = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
   n && (o = "\\\\" + o);
   var i = new RegExp(o, "g");
   return e = e.replace(i, N);
  }
  function N(e, t) {
   var n = t.charCodeAt(0);
   return "~E" + n + "E";
  }
  var R = this.hooks = new n();
  R.addNoop("plainLinkText"), R.addNoop("preConversion"), R.addNoop("postNormalization"), 
  R.addNoop("preBlockGamut"), R.addNoop("postBlockGamut"), R.addNoop("preSpanGamut"), 
  R.addNoop("postSpanGamut"), R.addNoop("postConversion");
  var L, A, M, j;
  this.makeHtml = function(n) {
   if (L) throw new Error("Recursive call to converter.makeHtml");
   return L = new o(), A = new o(), M = [], j = 0, n = R.preConversion(n), n = n.replace(/~/g, "~T"), 
   n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), 
   n = "\n\n" + n + "\n\n", n = P(n), n = n.replace(/^[ \t]+$/gm, ""), n = R.postNormalization(n), 
   n = t(n), n = e(n), n = r(n), n = _(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), 
   n = R.postConversion(n), M = A = L = null, n;
  };
  var O = function(e) {
   return r(e);
  }, D = {
   ol: "\\d+[.]",
   ul: "[*+-]"
  }, H = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", F = "[-A-Z0-9+&@#/%=~_|[\\])]", q = new RegExp('(="|<)?\\b(https?|ftp)(://' + H + "*" + F + ")(?=$|\\W)", "gi"), B = new RegExp(F, "i"), U = /(?:["'*()[\]:]|~D)/g;
 };
}(), define("libs/Markdown.Converter", function() {});

var IN_GLOBAL_SCOPE = !0;

window.PR_SHOULD_USE_CONTINUATION = !0;

var prettyPrintOne, prettyPrint;

(function() {
 function e(e) {
  function t(e) {
   var t = e.charCodeAt(0);
   if (92 !== t) return t;
   var n = e.charAt(1);
   return t = d[n], t ? t : n >= "0" && "7" >= n ? parseInt(e.substring(1), 8) : "u" === n || "x" === n ? parseInt(e.substring(2), 16) : e.charCodeAt(1);
  }
  function n(e) {
   if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
   var t = String.fromCharCode(e);
   return "\\" === t || "-" === t || "]" === t || "^" === t ? "\\" + t : t;
  }
  function o(e) {
   var o = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), i = [], r = "^" === o[0], a = [ "[" ];
   r && a.push("^");
   for (var s = r ? 1 : 0, l = o.length; l > s; ++s) {
    var c = o[s];
    if (/\\[bdsw]/i.test(c)) a.push(c); else {
     var u, d = t(c);
     l > s + 2 && "-" === o[s + 1] ? (u = t(o[s + 2]), s += 2) : u = d, i.push([ d, u ]), 
     65 > u || d > 122 || (65 > u || d > 90 || i.push([ 32 | Math.max(65, d), 32 | Math.min(u, 90) ]), 
     97 > u || d > 122 || i.push([ -33 & Math.max(97, d), -33 & Math.min(u, 122) ]));
    }
   }
   i.sort(function(e, t) {
    return e[0] - t[0] || t[1] - e[1];
   });
   for (var p = [], f = [], s = 0; s < i.length; ++s) {
    var h = i[s];
    h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : p.push(f = h);
   }
   for (var s = 0; s < p.length; ++s) {
    var h = p[s];
    a.push(n(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && a.push("-"), a.push(n(h[1])));
   }
   return a.push("]"), a.join("");
  }
  function i(e) {
   for (var t = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), i = t.length, s = [], l = 0, c = 0; i > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c; else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && (c >= d ? s[d] = -1 : t[l] = n(d));
    }
   }
   for (var l = 1; l < s.length; ++l) -1 === s[l] && (s[l] = ++r);
   for (var l = 0, c = 0; i > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c, s[c] || (t[l] = "(?:"); else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && c >= d && (t[l] = "\\" + s[d]);
    }
   }
   for (var l = 0; i > l; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
   if (e.ignoreCase && a) for (var l = 0; i > l; ++l) {
    var u = t[l], p = u.charAt(0);
    u.length >= 2 && "[" === p ? t[l] = o(u) : "\\" !== p && (t[l] = u.replace(/[a-zA-Z]/g, function(e) {
     var t = e.charCodeAt(0);
     return "[" + String.fromCharCode(-33 & t, 32 | t) + "]";
    }));
   }
   return t.join("");
  }
  for (var r = 0, a = !1, s = !1, l = 0, c = e.length; c > l; ++l) {
   var u = e[l];
   if (u.ignoreCase) s = !0; else if (/[a-z]/i.test(u.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
    a = !0, s = !1;
    break;
   }
  }
  for (var d = {
   b: 8,
   t: 9,
   n: 10,
   v: 11,
   f: 12,
   r: 13
  }, p = [], l = 0, c = e.length; c > l; ++l) {
   var u = e[l];
   if (u.global || u.multiline) throw new Error("" + u);
   p.push("(?:" + i(u) + ")");
  }
  return new RegExp(p.join("|"), s ? "gi" : "g");
 }
 function t(e, t) {
  function n(e) {
   var l = e.nodeType;
   if (1 == l) {
    if (o.test(e.className)) return;
    for (var c = e.firstChild; c; c = c.nextSibling) n(c);
    var u = e.nodeName.toLowerCase();
    ("br" === u || "li" === u) && (i[s] = "\n", a[s << 1] = r++, a[1 | s++ << 1] = e);
   } else if (3 == l || 4 == l) {
    var d = e.nodeValue;
    d.length && (d = t ? d.replace(/\r\n?/g, "\n") : d.replace(/[ \t\r\n]+/g, " "), 
    i[s] = d, a[s << 1] = r, r += d.length, a[1 | s++ << 1] = e);
   }
  }
  var o = /(?:^|\s)nocode(?:\s|$)/, i = [], r = 0, a = [], s = 0;
  return n(e), {
   sourceCode: i.join("").replace(/\n$/, ""),
   spans: a
  };
 }
 function n(e, t, n, o) {
  if (t) {
   var i = {
    sourceCode: t,
    basePos: e
   };
   n(i), o.push.apply(o, i.decorations);
  }
 }
 function o(e) {
  for (var t = void 0, n = e.firstChild; n; n = n.nextSibling) {
   var o = n.nodeType;
   t = 1 === o ? t ? e : n : 3 === o ? B.test(n.nodeValue) ? e : t : t;
  }
  return t === e ? void 0 : t;
 }
 function i(t, o) {
  var i, r = {};
  (function() {
   for (var n = t.concat(o), a = [], s = {}, l = 0, c = n.length; c > l; ++l) {
    var u = n[l], d = u[3];
    if (d) for (var p = d.length; --p >= 0; ) r[d.charAt(p)] = u;
    var f = u[1], h = "" + f;
    s.hasOwnProperty(h) || (a.push(f), s[h] = null);
   }
   a.push(/[\0-\uffff]/), i = e(a);
  })();
  var a = o.length, s = function(e) {
   for (var t = e.sourceCode, l = e.basePos, u = [ l, A ], d = 0, p = t.match(i) || [], f = {}, h = 0, g = p.length; g > h; ++h) {
    var m, b = p[h], v = f[b], y = void 0;
    if ("string" == typeof v) m = !1; else {
     var x = r[b.charAt(0)];
     if (x) y = b.match(x[1]), v = x[0]; else {
      for (var w = 0; a > w; ++w) if (x = o[w], y = b.match(x[1])) {
       v = x[0];
       break;
      }
      y || (v = A);
     }
     m = v.length >= 5 && "lang-" === v.substring(0, 5), !m || y && "string" == typeof y[1] || (m = !1, 
     v = O), m || (f[b] = v);
    }
    var k = d;
    if (d += b.length, m) {
     var S = y[1], C = b.indexOf(S), E = C + S.length;
     y[2] && (E = b.length - y[2].length, C = E - S.length);
     var T = v.substring(5);
     n(l + k, b.substring(0, C), s, u), n(l + k + C, S, c(T, S), u), n(l + k + E, b.substring(E), s, u);
    } else u.push(l + k, v);
   }
   e.decorations = u;
  };
  return s;
 }
 function r(e) {
  var t = [], n = [];
  e.tripleQuotedStrings ? t.push([ P, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\"" ]) : e.multiLineStrings ? t.push([ P, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`" ]) : t.push([ P, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'" ]), 
  e.verbatimStrings && n.push([ P, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null ]);
  var o = e.hashComments;
  o && (e.cStyleComments ? (o > 1 ? t.push([ $, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#" ]) : t.push([ $, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#" ]), 
  n.push([ P, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null ])) : t.push([ $, /^#[^\r\n]*/, null, "#" ])), 
  e.cStyleComments && (n.push([ $, /^\/\/[^\r\n]*/, null ]), n.push([ $, /^\/\*[\s\S]*?(?:\*\/|$)/, null ]));
  var r = e.regexLiterals;
  if (r) {
   var a = r > 1 ? "" : "\n\r", s = a ? "." : "[\\S\\s]", l = "/(?=[^/*" + a + "])" + "(?:[^/\\x5B\\x5C" + a + "]" + "|\\x5C" + s + "|\\x5B(?:[^\\x5C\\x5D" + a + "]" + "|\\x5C" + s + ")*(?:\\x5D|$))+" + "/";
   n.push([ "lang-regex", RegExp("^" + q + "(" + l + ")") ]);
  }
  var c = e.types;
  c && n.push([ N, c ]);
  var u = ("" + e.keywords).replace(/^ | $/g, "");
  u.length && n.push([ z, new RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), null ]), 
  t.push([ A, /^\s+/, null, " \r\n	 " ]);
  var d = "^.[^\\s\\w.$@'\"`/\\\\]*";
  return e.regexLiterals && (d += "(?!s*/)"), n.push([ R, /^@[a-z_$][a-z_$@0-9]*/i, null ], [ N, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null ], [ A, /^[a-z_$][a-z_$@0-9]*/i, null ], [ R, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789" ], [ A, /^\\[\s\S]?/, null ], [ L, new RegExp(d), null ]), 
  i(t, n);
 }
 function a(e, t, n) {
  function o(e) {
   var t = e.nodeType;
   if (1 != t || r.test(e.className)) {
    if ((3 == t || 4 == t) && n) {
     var l = e.nodeValue, c = l.match(a);
     if (c) {
      var u = l.substring(0, c.index);
      e.nodeValue = u;
      var d = l.substring(c.index + c[0].length);
      if (d) {
       var p = e.parentNode;
       p.insertBefore(s.createTextNode(d), e.nextSibling);
      }
      i(e), u || e.parentNode.removeChild(e);
     }
    }
   } else if ("br" === e.nodeName) i(e), e.parentNode && e.parentNode.removeChild(e); else for (var f = e.firstChild; f; f = f.nextSibling) o(f);
  }
  function i(e) {
   function t(e, n) {
    var o = n ? e.cloneNode(!1) : e, i = e.parentNode;
    if (i) {
     var r = t(i, 1), a = e.nextSibling;
     r.appendChild(o);
     for (var s = a; s; s = a) a = s.nextSibling, r.appendChild(s);
    }
    return o;
   }
   for (;!e.nextSibling; ) if (e = e.parentNode, !e) return;
   for (var n, o = t(e.nextSibling, 0); (n = o.parentNode) && 1 === n.nodeType; ) o = n;
   c.push(o);
  }
  for (var r = /(?:^|\s)nocode(?:\s|$)/, a = /\r\n?|\n/, s = e.ownerDocument, l = s.createElement("li"); e.firstChild; ) l.appendChild(e.firstChild);
  for (var c = [ l ], u = 0; u < c.length; ++u) o(c[u]);
  t === (0 | t) && c[0].setAttribute("value", t);
  var d = s.createElement("ol");
  d.className = "linenums";
  for (var p = Math.max(0, 0 | t - 1) || 0, u = 0, f = c.length; f > u; ++u) l = c[u], 
  l.className = "L" + (u + p) % 10, l.firstChild || l.appendChild(s.createTextNode(" ")), 
  d.appendChild(l);
  e.appendChild(d);
 }
 function s(e) {
  var t = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
  t = t && +t[1] <= 8;
  var n = /\n/g, o = e.sourceCode, i = o.length, r = 0, a = e.spans, s = a.length, l = 0, c = e.decorations, u = c.length, d = 0;
  c[u] = i;
  var p, f;
  for (f = p = 0; u > f; ) c[f] !== c[f + 2] ? (c[p++] = c[f++], c[p++] = c[f++]) : f += 2;
  for (u = p, f = p = 0; u > f; ) {
   for (var h = c[f], g = c[f + 1], m = f + 2; u >= m + 2 && c[m + 1] === g; ) m += 2;
   c[p++] = h, c[p++] = g, f = m;
  }
  u = c.length = p;
  var b, v = e.sourceNode;
  v && (b = v.style.display, v.style.display = "none");
  try {
   for (;s > l; ) {
    a[l];
    var y, x = a[l + 2] || i, w = c[d + 2] || i, m = Math.min(x, w), k = a[l + 1];
    if (1 !== k.nodeType && (y = o.substring(r, m))) {
     t && (y = y.replace(n, "\r")), k.nodeValue = y;
     var S = k.ownerDocument, C = S.createElement("span");
     C.className = c[d + 1];
     var E = k.parentNode;
     E.replaceChild(C, k), C.appendChild(k), x > r && (a[l + 1] = k = S.createTextNode(o.substring(m, x)), 
     E.insertBefore(k, C.nextSibling));
    }
    r = m, r >= x && (l += 2), r >= w && (d += 2);
   }
  } finally {
   v && (v.style.display = b);
  }
 }
 function l(e, t) {
  for (var n = t.length; --n >= 0; ) {
   var o = t[n];
   W.hasOwnProperty(o) ? f.console && console.warn("cannot override language handler %s", o) : W[o] = e;
  }
 }
 function c(e, t) {
  return e && W.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), 
  W[e];
 }
 function u(e) {
  var n = e.langExtension;
  try {
   var o = t(e.sourceNode, e.pre), i = o.sourceCode;
   e.sourceCode = i, e.spans = o.spans, e.basePos = 0, c(n, i)(e), s(e);
  } catch (r) {
   f.console && console.log(r && r.stack || r);
  }
 }
 function d(e, t, n) {
  var o = document.createElement("div");
  o.innerHTML = "<pre>" + e + "</pre>", o = o.firstChild, n && a(o, n, !0);
  var i = {
   langExtension: t,
   numberLines: n,
   sourceNode: o,
   pre: 1
  };
  return u(i), o.innerHTML;
 }
 function p(e, t) {
  function n(e) {
   return r.getElementsByTagName(e);
  }
  function i() {
   for (var t = f.PR_SHOULD_USE_CONTINUATION ? g.now() + 250 : 1/0; b < c.length && g.now() < t; b++) {
    for (var n = c[b], r = C, l = n; l = l.previousSibling; ) {
     var d = l.nodeType, p = (7 === d || 8 === d) && l.nodeValue;
     if (p ? !/^\??prettify\b/.test(p) : 3 !== d || /\S/.test(l.nodeValue)) break;
     if (p) {
      r = {}, p.replace(/\b(\w+)=([\w:.%+-]+)/g, function(e, t, n) {
       r[t] = n;
      });
      break;
     }
    }
    var h = n.className;
    if ((r !== C || y.test(h)) && !x.test(h)) {
     for (var E = !1, T = n.parentNode; T; T = T.parentNode) {
      var _ = T.tagName;
      if (S.test(_) && T.className && y.test(T.className)) {
       E = !0;
       break;
      }
     }
     if (!E) {
      n.className += " prettyprinted";
      var I = r.lang;
      if (!I) {
       I = h.match(v);
       var P;
       !I && (P = o(n)) && k.test(P.tagName) && (I = P.className.match(v)), I && (I = I[1]);
      }
      var z;
      if (w.test(n.tagName)) z = 1; else {
       var $ = n.currentStyle, N = s.defaultView, R = $ ? $.whiteSpace : N && N.getComputedStyle ? N.getComputedStyle(n, null).getPropertyValue("white-space") : 0;
       z = R && "pre" === R.substring(0, 3);
      }
      var L = r.linenums;
      (L = "true" === L || +L) || (L = h.match(/\blinenums\b(?::(\d+))?/), L = L ? L[1] && L[1].length ? +L[1] : !0 : !1), 
      L && a(n, L, z), m = {
       langExtension: I,
       sourceNode: n,
       numberLines: L,
       pre: z
      }, u(m);
     }
    }
   }
   b < c.length ? setTimeout(i, 250) : "function" == typeof e && e();
  }
  for (var r = t || document.body, s = r.ownerDocument || document, l = [ n("pre"), n("code"), n("xmp") ], c = [], d = 0; d < l.length; ++d) for (var p = 0, h = l[d].length; h > p; ++p) c.push(l[d][p]);
  l = null;
  var g = Date;
  g.now || (g = {
   now: function() {
    return +new Date();
   }
  });
  var m, b = 0, v = /\blang(?:uage)?-([\w.]+)(?!\S)/, y = /\bprettyprint\b/, x = /\bprettyprinted\b/, w = /pre|xmp/i, k = /^code$/i, S = /^(?:pre|code|xmp)$/i, C = {};
  i();
 }
 var f = window, h = [ "break,continue,do,else,for,if,return,while" ], g = [ h, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ], m = [ g, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof" ], b = [ m, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ], v = [ m, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient" ], y = [ v, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where" ], x = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", w = [ m, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ], k = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", S = [ h, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ], C = [ h, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ], E = [ h, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use" ], T = [ h, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ], _ = [ b, y, w, k, S, C, T ], I = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, P = "str", z = "kwd", $ = "com", N = "typ", R = "lit", L = "pun", A = "pln", M = "tag", j = "dec", O = "src", D = "atn", H = "atv", F = "nocode", q = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", B = /\S/, U = r({
  keywords: _,
  hashComments: !0,
  cStyleComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), W = {};
 l(U, [ "default-code" ]), l(i([], [ [ A, /^[^<?]+/ ], [ j, /^<!\w[^>]*(?:>|$)/ ], [ $, /^<\!--[\s\S]*?(?:-\->|$)/ ], [ "lang-", /^<\?([\s\S]+?)(?:\?>|$)/ ], [ "lang-", /^<%([\s\S]+?)(?:%>|$)/ ], [ L, /^(?:<[%?]|[%?]>)/ ], [ "lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i ], [ "lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i ], [ "lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i ], [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ] ]), [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ]), 
 l(i([ [ A, /^[\s]+/, null, " 	\r\n" ], [ H, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'" ] ], [ [ M, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i ], [ D, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ], [ "lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/ ], [ L, /^[=<>\/]+/ ], [ "lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i ], [ "lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i ], [ "lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i ], [ "lang-css", /^style\s*=\s*\"([^\"]+)\"/i ], [ "lang-css", /^style\s*=\s*\'([^\']+)\'/i ], [ "lang-css", /^style\s*=\s*([^\"\'>\s]+)/i ] ]), [ "in.tag" ]), 
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
  keywords: T,
  hashComments: !0,
  multiLineStrings: !0
 }), [ "bash", "bsh", "csh", "sh" ]), l(r({
  keywords: S,
  hashComments: !0,
  multiLineStrings: !0,
  tripleQuotedStrings: !0
 }), [ "cv", "py", "python" ]), l(r({
  keywords: k,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: 2
 }), [ "perl", "pl", "pm" ]), l(r({
  keywords: C,
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
  keywords: E,
  cStyleComments: !0,
  multilineStrings: !0
 }), [ "rc", "rs", "rust" ]), l(i([], [ [ P, /^[\s\S]+/ ] ]), [ "regex" ]);
 var G = f.PR = {
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
  PR_PLAIN: A,
  PR_PUNCTUATION: L,
  PR_SOURCE: O,
  PR_STRING: P,
  PR_TAG: M,
  PR_TYPE: N,
  prettyPrintOne: IN_GLOBAL_SCOPE ? f.prettyPrintOne = d : prettyPrintOne = d,
  prettyPrint: prettyPrint = IN_GLOBAL_SCOPE ? f.prettyPrint = p : prettyPrint = p
 };
 "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
  return G;
 });
})(), define("libs/prettify", function() {});

var hljs = new function() {
 function e(e) {
  return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
 }
 function t(e) {
  for (var t = e.firstChild; t; t = t.nextSibling) {
   if ("CODE" == t.nodeName) return t;
   if (3 != t.nodeType || !t.nodeValue.match(/\s+/)) break;
  }
 }
 function n(e, t) {
  return Array.prototype.map.call(e.childNodes, function(e) {
   return 3 == e.nodeType ? t ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : "BR" == e.nodeName ? "\n" : n(e, t);
  }).join("");
 }
 function o(e) {
  var t = (e.className + " " + e.parentNode.className).split(/\s+/);
  t = t.map(function(e) {
   return e.replace(/^language-/, "");
  });
  for (var n = 0; n < t.length; n++) if (f[t[n]] || "no-highlight" == t[n]) return t[n];
 }
 function i(e) {
  var t = [];
  return function n(e, o) {
   for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? o += i.nodeValue.length : "BR" == i.nodeName ? o += 1 : 1 == i.nodeType && (t.push({
    event: "start",
    offset: o,
    node: i
   }), o = n(i, o), t.push({
    event: "stop",
    offset: o,
    node: i
   }));
   return o;
  }(e, 0), t;
 }
 function r(t, n, o) {
  function i() {
   return t.length && n.length ? t[0].offset != n[0].offset ? t[0].offset < n[0].offset ? t : n : "start" == n[0].event ? t : n : t.length ? t : n;
  }
  function r(t) {
   function n(t) {
    return " " + t.nodeName + '="' + e(t.value) + '"';
   }
   return "<" + t.nodeName + Array.prototype.map.call(t.attributes, n).join("") + ">";
  }
  for (var a = 0, s = "", l = []; t.length || n.length; ) {
   var c = i().splice(0, 1)[0];
   if (s += e(o.substr(a, c.offset - a)), a = c.offset, "start" == c.event) s += r(c.node), 
   l.push(c.node); else if ("stop" == c.event) {
    var u, d = l.length;
    do d--, u = l[d], s += "</" + u.nodeName.toLowerCase() + ">"; while (u != c.node);
    for (l.splice(d, 1); d < l.length; ) s += r(l[d]), d++;
   }
  }
  return s + e(o.substr(a));
 }
 function a(e) {
  function t(t, n) {
   return RegExp(t, "m" + (e.cI ? "i" : "") + (n ? "g" : ""));
  }
  function n(e, o) {
   function i(e, t) {
    t.split(" ").forEach(function(t) {
     var n = t.split("|");
     a[n[0]] = [ e, n[1] ? Number(n[1]) : 1 ], r.push(n[0]);
    });
   }
   if (!e.compiled) {
    e.compiled = !0;
    var r = [];
    if (e.k) {
     var a = {};
     if (e.lR = t(e.l || hljs.IR, !0), "string" == typeof e.k) i("keyword", e.k); else for (var s in e.k) e.k.hasOwnProperty(s) && i(s, e.k[s]);
     e.k = a;
    }
    o && (e.bWK && (e.b = "\\b(" + r.join("|") + ")\\s"), e.bR = t(e.b ? e.b : "\\B|\\b"), 
    e.e || e.eW || (e.e = "\\B|\\b"), e.e && (e.eR = t(e.e)), e.tE = e.e || "", e.eW && o.tE && (e.tE += (e.e ? "|" : "") + o.tE)), 
    e.i && (e.iR = t(e.i)), void 0 === e.r && (e.r = 1), e.c || (e.c = []);
    for (var l = 0; l < e.c.length; l++) "self" == e.c[l] && (e.c[l] = e), n(e.c[l], e);
    e.starts && n(e.starts, o);
    for (var c = [], l = 0; l < e.c.length; l++) c.push(e.c[l].b);
    e.tE && c.push(e.tE), e.i && c.push(e.i), e.t = c.length ? t(c.join("|"), !0) : {
     exec: function() {
      return null;
     }
    };
   }
  }
  n(e);
 }
 function s(t, n) {
  function o(e, t) {
   for (var n = 0; n < t.c.length; n++) {
    var o = t.c[n].bR.exec(e);
    if (o && 0 == o.index) return t.c[n];
   }
  }
  function i(e, t) {
   return e.e && e.eR.test(t) ? e : e.eW ? i(e.parent, t) : void 0;
  }
  function r(e, t) {
   return t.i && t.iR.test(e);
  }
  function c(e, t) {
   var n = m.cI ? t[0].toLowerCase() : t[0];
   return e.k.hasOwnProperty(n) && e.k[n];
  }
  function u() {
   var t = e(v);
   if (!b.k) return t;
   var n = "", o = 0;
   b.lR.lastIndex = 0;
   for (var i = b.lR.exec(t); i; ) {
    n += t.substr(o, i.index - o);
    var r = c(b, i);
    r ? (x += r[1], n += '<span class="' + r[0] + '">' + i[0] + "</span>") : n += i[0], 
    o = b.lR.lastIndex, i = b.lR.exec(t);
   }
   return n + t.substr(o);
  }
  function d() {
   if (b.sL && !f[b.sL]) return e(v);
   var t = b.sL ? s(b.sL, v) : l(v);
   return b.r > 0 && (x += t.keyword_count, y += t.r), '<span class="' + t.language + '">' + t.value + "</span>";
  }
  function p() {
   return void 0 !== b.sL ? d() : u();
  }
  function h(t, n) {
   var o = t.cN ? '<span class="' + t.cN + '">' : "";
   t.rB ? (w += o, v = "") : t.eB ? (w += e(n) + o, v = "") : (w += o, v = n), b = Object.create(t, {
    parent: {
     value: b
    }
   }), y += t.r;
  }
  function g(t, n) {
   if (v += t, void 0 === n) return w += p(), 0;
   var a = o(n, b);
   if (a) return w += p(), h(a, n), a.rB ? 0 : n.length;
   var s = i(b, n);
   if (s) {
    s.rE || s.eE || (v += n), w += p();
    do b.cN && (w += "</span>"), b = b.parent; while (b != s.parent);
    return s.eE && (w += e(n)), v = "", s.starts && h(s.starts, ""), s.rE ? 0 : n.length;
   }
   if (r(n, b)) throw "Illegal";
   return v += n, n.length || 1;
  }
  var m = f[t];
  a(m);
  var b = m, v = "", y = 0, x = 0, w = "";
  try {
   for (var k, S, C = 0; ;) {
    if (b.t.lastIndex = C, k = b.t.exec(n), !k) break;
    S = g(n.substr(C, k.index - C), k[0]), C = k.index + S;
   }
   return g(n.substr(C)), {
    r: y,
    keyword_count: x,
    value: w,
    language: t
   };
  } catch (E) {
   if ("Illegal" == E) return {
    r: 0,
    keyword_count: 0,
    value: e(n)
   };
   throw E;
  }
 }
 function l(t) {
  var n = {
   keyword_count: 0,
   r: 0,
   value: e(t)
  }, o = n;
  for (var i in f) if (f.hasOwnProperty(i)) {
   var r = s(i, t);
   r.language = i, r.keyword_count + r.r > o.keyword_count + o.r && (o = r), r.keyword_count + r.r > n.keyword_count + n.r && (o = n, 
   n = r);
  }
  return o.language && (n.second_best = o), n;
 }
 function c(e, t, n) {
  return t && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, n) {
   return n.replace(/\t/g, t);
  })), n && (e = e.replace(/\n/g, "<br>")), e;
 }
 function u(e, t, a) {
  var u = n(e, a), d = o(e);
  if ("no-highlight" != d) {
   var p = d ? s(d, u) : l(u);
   d = p.language;
   var f = i(e);
   if (f.length) {
    var h = document.createElement("pre");
    h.innerHTML = p.value, p.value = r(f, i(h), u);
   }
   p.value = c(p.value, t, a);
   var g = e.className;
   g.match("(\\s|^)(language-)?" + d + "(\\s|$)") || (g = g ? g + " " + d : d), e.innerHTML = p.value, 
   e.className = g, e.result = {
    language: d,
    kw: p.keyword_count,
    re: p.r
   }, p.second_best && (e.second_best = {
    language: p.second_best.language,
    kw: p.second_best.keyword_count,
    re: p.second_best.r
   });
  }
 }
 function d() {
  d.called || (d.called = !0, Array.prototype.map.call(document.getElementsByTagName("pre"), t).filter(Boolean).forEach(function(e) {
   u(e, hljs.tabReplace);
  }));
 }
 function p() {
  window.addEventListener("DOMContentLoaded", d, !1), window.addEventListener("load", d, !1);
 }
 var f = {};
 this.LANGUAGES = f, this.highlight = s, this.highlightAuto = l, this.fixMarkup = c, 
 this.highlightBlock = u, this.initHighlighting = d, this.initHighlightingOnLoad = p, 
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
 }, this.inherit = function(e, t) {
  var n = {};
  for (var o in e) n[o] = e[o];
  if (t) for (var o in t) n[o] = t[o];
  return n;
 };
}();

if (hljs.LANGUAGES.bash = function(e) {
 var t = "true false", n = "if then else elif fi for break continue while in do done echo exit return set declare", o = {
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
   literal: t
  },
  r: 0
 };
 return {
  k: {
   keyword: n,
   literal: t
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
 var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?", n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", o = {
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
  l: t,
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
   b: n,
   l: t,
   k: o
  }, {
   cN: "params",
   b: "\\(",
   e: "\\)",
   l: t,
   k: o
  } ].concat(r)
 }, u = r.concat(l.concat([ {
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
   b: n
  } ]),
  r: 0
 }, {
  cN: "symbol",
  b: t + ":",
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
 return a.c = u, c.c[1].c = u, {
  l: t,
  k: o,
  c: u
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
 var t = {
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
   c: [ t, e.ASM, e.QSM, e.NM ]
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
      c: [ t, e.NM, e.QSM, e.ASM, e.CBLCLM, {
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
 var e = "[A-Za-z0-9\\._:-]+", t = {
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
   c: [ t ],
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
   c: [ t ],
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
   }, t ]
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
 var t = {
  cN: "variable",
  b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
 }, n = [ e.inherit(e.ASM, {
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
  }, t, {
   cN: "function",
   bWK: !0,
   e: "{",
   k: "function",
   i: "\\$|\\[|%",
   c: [ i, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ "self", t, e.CBLCLM ].concat(n).concat(o)
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
  } ].concat(n).concat(o)
 };
}(hljs), hljs.LANGUAGES.python = function(e) {
 var t = {
  cN: "prompt",
  b: "^(>>>|\\.\\.\\.) "
 }, n = [ {
  cN: "string",
  b: "(u|b)?r?'''",
  e: "'''",
  c: [ t ],
  r: 10
 }, {
  cN: "string",
  b: '(u|b)?r?"""',
  e: '"""',
  c: [ t ],
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
  c: [ "self", e.CNM, t ].concat(n)
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
  c: n.concat([ t, e.HCM, e.inherit(r, {
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
 var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", n = {
  cN: "subst",
  b: "[$@]\\{",
  e: "\\}",
  k: t,
  r: 10
 }, o = {
  cN: "variable",
  b: "\\$\\d"
 }, i = {
  cN: "variable",
  b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"
 }, r = [ e.BE, n, o, i ], a = {
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
 return n.c = l, a.c[1].c = l, {
  k: t,
  c: l
 };
}(hljs), hljs.LANGUAGES.json = function(e) {
 var t = {
  literal: "true false null"
 }, n = [ e.QSM, e.CNM ], o = {
  cN: "value",
  e: ",",
  eW: !0,
  eE: !0,
  c: n,
  k: t
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
 return n.splice(n.length, 0, i, r), {
  c: n,
  k: t,
  i: "\\S"
 };
}(hljs), hljs.LANGUAGES.cpp = function(e) {
 var t = {
  keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",
  built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"
 };
 return {
  k: t,
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
   k: t,
   r: 10,
   c: [ "self" ]
  } ]
 };
}(hljs), define("libs/highlight.pack", function() {}), function() {
 function e(e) {
  return e.replace(/^\s+|\s+$/g, "");
 }
 function t(e) {
  return e.replace(/\s+$/g, "");
 }
 function n(e) {
  return e.replace(new RegExp("^(\\t|[ ]{1,4})", "gm"), "");
 }
 function o(e, t) {
  return -1 != e.indexOf(t);
 }
 function i(e, t) {
  return e.replace(/<[^>]*>?/gi, function(e) {
   return e.match(t) ? e : "";
  });
 }
 function r(e, t) {
  for (var n = {}, o = 0; o < e.length; o++) n[e[o]] = e[o];
  for (o = 0; o < t.length; o++) n[t[o]] = t[o];
  var i = [];
  for (var r in n) n.hasOwnProperty(r) && i.push(n[r]);
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
 function l(e, t) {
  return i(c(e, t), f);
 }
 function c(e, t) {
  var n = t.blockGamutHookCallback(e);
  return n = d(n), n = n.replace(/~D/g, "$$").replace(/~T/g, "~"), n = t.previousPostConversion(n);
 }
 function u(e) {
  return e.replace(/\\\|/g, "&#124;").replace(/\\:/g, "&#58;");
 }
 function d(e) {
  return e = e.replace(/~E(\d+)E/g, function(e, t) {
   var n = parseInt(t);
   return String.fromCharCode(n);
  });
 }
 function p(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }
 var f = new RegExp([ "^(<\\/?(a|abbr|acronym|applet|area|b|basefont|", "bdo|big|button|cite|code|del|dfn|em|figcaption|", "font|i|iframe|img|input|ins|kbd|label|map|", "mark|meter|object|param|progress|q|ruby|rp|rt|s|", "samp|script|select|small|span|strike|strong|", "sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|", "<(br)\\s?\\/?>)$" ].join(""), "i");
 Array.indexOf || (Array.prototype.indexOf = function(e) {
  for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
  return -1;
 }), Markdown.Extra = function() {
  this.converter = null, this.hashBlocks = [], this.footnotes = {}, this.usedFootnotes = [], 
  this.attributeBlocks = !1, this.googleCodePrettify = !1, this.highlightJs = !1, 
  this.tableClass = "", this.tabWidth = 4;
 }, Markdown.Extra.init = function(e, t) {
  var n = new Markdown.Extra(), i = [], r = [], a = [ "unHashExtraBlocks" ];
  return t = t || {}, t.extensions = t.extensions || [ "all" ], o(t.extensions, "all") && (t.extensions = [ "tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes" ]), 
  o(t.extensions, "attr_list") && (i.push("hashFcbAttributeBlocks"), r.push("hashHeaderAttributeBlocks"), 
  a.push("applyAttributeBlocks"), n.attributeBlocks = !0), o(t.extensions, "tables") && r.push("tables"), 
  o(t.extensions, "fenced_code_gfm") && i.push("fencedCodeBlocks"), o(t.extensions, "def_list") && r.push("definitionLists"), 
  o(t.extensions, "footnotes") && (i.push("stripFootnoteDefinitions"), r.push("doFootnotes"), 
  a.push("printFootnotes")), e.hooks.chain("postNormalization", function(e) {
   return n.doTransform(i, e) + "\n";
  }), e.hooks.chain("preBlockGamut", function(e, t) {
   return n.blockGamutHookCallback = t, e = u(e), n.doTransform(r, e) + "\n";
  }), n.previousPostConversion = e.hooks.postConversion, e.hooks.chain("postConversion", function(e) {
   return e = n.doTransform(a, e), n.hashBlocks = [], n.footnotes = {}, n.usedFootnotes = [], 
   e;
  }), "highlighter" in t && (n.googleCodePrettify = "prettify" === t.highlighter, 
  n.highlightJs = "highlight" === t.highlighter), "table_class" in t && (n.tableClass = t.table_class), 
  n.converter = e, n;
 }, Markdown.Extra.prototype.doTransform = function(e, t) {
  for (var n = 0; n < e.length; n++) t = this[e[n]](t);
  return t;
 }, Markdown.Extra.prototype.hashExtraBlock = function(e) {
  return "\n<p>~X" + (this.hashBlocks.push(e) - 1) + "X</p>\n";
 }, Markdown.Extra.prototype.hashExtraInline = function(e) {
  return "~X" + (this.hashBlocks.push(e) - 1) + "X";
 }, Markdown.Extra.prototype.unHashExtraBlocks = function(e) {
  function t() {
   var o = !1;
   e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, t) {
    o = !0;
    var i = parseInt(t, 10);
    return n.hashBlocks[i];
   }), o === !0 && t();
  }
  var n = this;
  return t(), e;
 }, Markdown.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
  function t(e, t, n) {
   return "<p>~XX" + (r.hashBlocks.push(n) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = "\\{\\s*[.|#][^}]+\\}", o = new RegExp("^(#{1,6}.*#{0,6})\\s+(" + n + ")[ \\t]*(\\n|0x03)", "gm"), i = new RegExp("^(.*)\\s+(" + n + ")[ \\t]*\\n" + "(?=[\\-|=]+\\s*(\\n|0x03))", "gm"), r = this;
  return e = e.replace(o, t), e = e.replace(i, t);
 }, Markdown.Extra.prototype.hashFcbAttributeBlocks = function(e) {
  function t(e, t, n) {
   return "<p>~XX" + (i.hashBlocks.push(n) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = "\\{\\s*[.|#][^}]+\\}", o = new RegExp("^(```[^{\\n]*)\\s+(" + n + ")[ \\t]*\\n" + "(?=([\\s\\S]*?)\\n```\\s*(\\n|0x03))", "gm"), i = this;
  return e.replace(o, t);
 }, Markdown.Extra.prototype.applyAttributeBlocks = function(e) {
  var t = this, n = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
  return e = e.replace(n, function(e, n, o, i, a) {
   if (!o) return "";
   for (var s = parseInt(n, 10), l = t.hashBlocks[s], c = l.match(/#[^\s{}]+/g) || [], u = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", d = l.match(/\.[^\s{}]+/g) || [], p = 0; p < d.length; p++) d[p] = d[p].substr(1, d[p].length - 1);
   var f = "";
   return i && (d = r(d, [ i ])), d.length > 0 && (f = ' class="' + d.join(" ") + '"'), 
   "<" + o + u + f + a;
  });
 }, Markdown.Extra.prototype.tables = function(t) {
  function n(t, n, i, r) {
   n = n.replace(/^ *[|]/m, ""), i = i.replace(/^ *[|]/m, ""), r = r.replace(/^ *[|]/gm, ""), 
   n = n.replace(/[|] *$/m, ""), i = i.replace(/[|] *$/m, ""), r = r.replace(/[|] *$/gm, ""), 
   alignspecs = i.split(/ *[|] */), align = [];
   for (var a = 0; a < alignspecs.length; a++) {
    var s = alignspecs[a];
    align[a] = s.match(/^ *-+: *$/m) ? ' style="text-align:right;"' : s.match(/^ *:-+: *$/m) ? ' style="text-align:center;"' : s.match(/^ *:-+ *$/m) ? ' style="text-align:left;"' : "";
   }
   var c = n.split(/ *[|] */), u = c.length, d = o.tableClass ? ' class="' + o.tableClass + '"' : "", p = [ "<table", d, ">\n", "<thead>\n", "<tr>\n" ].join("");
   for (a = 0; u > a; a++) {
    var f = l(e(c[a]), o);
    p += [ "  <th", align[a], ">", f, "</th>\n" ].join("");
   }
   p += "</tr>\n</thead>\n";
   var h = r.split("\n");
   for (a = 0; a < h.length; a++) if (!h[a].match(/^\s*$/)) {
    for (var g = h[a].split(/ *[|] */), m = u - g.length, b = 0; m > b; b++) g.push("");
    for (p += "<tr>\n", b = 0; u > b; b++) {
     var v = l(e(g[b]), o);
     p += [ "  <td", align[b], ">", v, "</td>\n" ].join("");
    }
    p += "</tr>\n";
   }
   return p += "</table>\n", o.hashExtraBlock(p);
  }
  var o = this, i = new RegExp([ "^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"), r = new RegExp([ "^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm");
  return t = t.replace(i, n), t = t.replace(r, n);
 }, Markdown.Extra.prototype.stripFootnoteDefinitions = function(e) {
  var t = this;
  return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n, o) {
   return n = p(n), o += "\n", o = o.replace(/^[ ]{0,3}/g, ""), t.footnotes[n] = o, 
   "\n";
  });
 }, Markdown.Extra.prototype.doFootnotes = function(e) {
  var t = this;
  if (t.isConvertingFootnote === !0) return e;
  var n = 0;
  return e = e.replace(/\[\^(.+?)\]/g, function(e, o) {
   var i = p(o), r = t.footnotes[i];
   if (void 0 === r) return "";
   n++, t.usedFootnotes.push(i);
   var a = '<a href="#fn:' + i + '" id="fnref:' + i + '" title="See footnote" class="footnote">' + n + "</a>";
   return t.hashExtraInline(a);
  });
 }, Markdown.Extra.prototype.printFootnotes = function(e) {
  var t = this;
  if (0 === t.usedFootnotes.length) return e;
  e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
  for (var n = 0; n < t.usedFootnotes.length; n++) {
   var o = t.usedFootnotes[n], i = t.footnotes[o];
   t.isConvertingFootnote = !0;
   var r = l(i, t);
   delete t.isConvertingFootnote, e += '<li id="fn:' + o + '">' + r + ' <a href="#fnref:' + o + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n';
  }
  return e += "</ol>\n</div>";
 }, Markdown.Extra.prototype.fencedCodeBlocks = function(e) {
  function t(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~");
  }
  var n = this;
  return e = e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, o, i) {
   var r = o, a = i, s = n.googleCodePrettify ? ' class="prettyprint"' : "", l = "";
   r && (l = n.googleCodePrettify || n.highlightJs ? ' class="language-' + r + '"' : ' class="' + r + '"');
   var c = [ "<pre", s, "><code", l, ">", t(a), "</code></pre>" ].join("");
   return n.hashExtraBlock(c);
  });
 }, Markdown.Extra.prototype.definitionLists = function(t) {
  var n = new RegExp([ "(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")" ].join(""), "gm"), o = this;
  return t = a(t), t = t.replace(n, function(t, n, i) {
   var r = e(o.processDefListItems(i));
   return r = "<dl>\n" + r + "\n</dl>", n + o.hashExtraBlock(r) + "\n\n";
  }), s(t);
 }, Markdown.Extra.prototype.processDefListItems = function(o) {
  var i = this, r = new RegExp([ "(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])" ].join(""), "gm"), u = new RegExp([ "\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")" ].join(""), "gm");
  return o = a(o), o = o.replace(/\n{2,}(?=\\x03)/, "\n"), o = o.replace(r, function(t, n, o) {
   for (var r = e(o).split("\n"), a = "", s = 0; s < r.length; s++) {
    var c = r[s];
    c = l(e(c), i), a += "\n<dt>" + c + "</dt>";
   }
   return a + "\n";
  }), o = o.replace(u, function(e, o, r, a) {
   return o || a.match(/\n{2,}/) ? (a = Array(r.length + 1).join(" ") + a, a = n(a) + "\n\n", 
   a = "\n" + c(a, i) + "\n") : (a = t(a), a = l(n(a), i)), "\n<dd>" + a + "</dd>\n";
  }), s(o);
 };
}(), define("libs/Markdown.Extra", function() {}), define("extensions/markdownExtra", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/markdownExtraSettingsBlock.html", "libs/Markdown.Extra" ], function(e, t, n, o, i) {
 var r = new o("markdownExtra", "Markdown Extra", !0);
 return r.settingsBlock = i, r.defaultConfig = {
  extensions: [ "fenced_code_gfm", "tables", "def_list", "attr_list", "footnotes" ],
  highlighter: "prettify"
 }, r.onLoadSettings = function() {
  function e(e) {
   return t.some(r.config.extensions, function(t) {
    return t == e;
   });
  }
  n.setInputChecked("#input-markdownextra-fencedcodegfm", e("fenced_code_gfm")), n.setInputChecked("#input-markdownextra-tables", e("tables")), 
  n.setInputChecked("#input-markdownextra-deflist", e("def_list")), n.setInputChecked("#input-markdownextra-attrlist", e("attr_list")), 
  n.setInputChecked("#input-markdownextra-footnotes", e("footnotes")), n.setInputValue("#input-markdownextra-highlighter", r.config.highlighter);
 }, r.onSaveSettings = function(e) {
  e.extensions = [], n.getInputChecked("#input-markdownextra-fencedcodegfm") && e.extensions.push("fenced_code_gfm"), 
  n.getInputChecked("#input-markdownextra-tables") && e.extensions.push("tables"), 
  n.getInputChecked("#input-markdownextra-deflist") && e.extensions.push("def_list"), 
  n.getInputChecked("#input-markdownextra-attrlist") && e.extensions.push("attr_list"), 
  n.getInputChecked("#input-markdownextra-footnotes") && e.extensions.push("footnotes"), 
  e.highlighter = n.getInputValue("#input-markdownextra-highlighter");
 }, r.onEditorConfigure = function(e) {
  var n = e.getConverter(), o = {
   extensions: r.config.extensions
  };
  if ("highlight" == r.config.highlighter) {
   o.highlighter = "prettify";
   var i = document.getElementById("preview-contents");
   e.hooks.chain("onPreviewRefresh", function() {
    t.each(i.querySelectorAll(".prettyprint"), function(e) {
     hljs.highlightBlock(e);
    });
   });
  } else "prettify" == r.config.highlighter && (o.highlighter = "prettify", e.hooks.chain("onPreviewRefresh", prettyPrint));
  Markdown.Extra.init(n, o), n.extraExtensions = r.config.extensions;
 }, r;
}), define("text!html/buttonToc.html", [], function() {
 return '<button class="btn dropdown-toggle" title="Table of contents" data-toggle="dropdown">\n    <i class="icon-list"></i>\n</button>\n<div class="dropdown-menu pull-right">\n    <h3>Table of contents</h3>\n    <div class="table-of-contents">\n    </div>\n</div>\n';
}), define("text!html/tocSettingsBlock.html", [], function() {
 return '<p>Generates a table of contents when a [TOC] marker is found.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="input-toc-marker">Marker\n			RegExp</label>\n		<div class="controls">\n			<input type="text" id="input-toc-marker" class="span2">\n		</div>\n	</div>\n	<div class="control-group">\n        <label class="control-label" for="input-toc-button">Button over preview</label>\n        <div class="controls">\n            <input type="checkbox" id="input-toc-button">\n        </div>\n    </div>\n	\n</div>';
}), define("extensions/toc", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonToc.html", "text!html/tocSettingsBlock.html" ], function(e, t, n, o, i, r) {
 function a(e, t, n) {
  this.tagName = e, this.anchor = t, this.text = n, this.children = [];
 }
 function s(e, n) {
  function o() {
   void 0 !== l && (l.children.length > 0 && (l.children = s(l.children, n + 1)), r.push(l));
  }
  n = n || 1;
  var i = "H" + n, r = [], l = void 0;
  return t.each(e, function(e) {
   e.tagName != i ? (void 0 === l && (l = new a()), l.children.push(e)) : (o(), l = e);
  }), o(), r;
 }
 function l() {
  function e(e) {
   for (var i = e.id || n.slugify(e.textContent), r = i, a = 0; t.has(o, r); ) r = i + "-" + ++a;
   return o[r] = !0, e.id = r, r;
  }
  var o = {}, i = [];
  return t.each(u.querySelectorAll(".preview-content > .wmd-title"), function(t) {
   i.push(new a(t.tagName, e(t), t.textContent));
  }), i = s(i), '<div class="toc">\n<ul>\n' + i.join("") + "</ul>\n</div>\n";
 }
 var c = new o("toc", "Table of Contents", !0);
 c.settingsBlock = r, c.defaultConfig = {
  marker: "\\[(TOC|toc)\\]",
  button: !0
 }, c.onLoadSettings = function() {
  n.setInputValue("#input-toc-marker", c.config.marker), n.setInputChecked("#input-toc-button", c.config.button);
 }, c.onSaveSettings = function(e, t) {
  e.marker = n.getInputRegExpValue("#input-toc-marker", t), e.button = n.getInputChecked("#input-toc-button");
 }, c.onCreatePreviewButton = function() {
  return c.config.button ? i : void 0;
 }, a.prototype.childrenToString = function() {
  if (0 === this.children.length) return "";
  var e = "<ul>\n";
  return t.each(this.children, function(t) {
   e += t.toString();
  }), e += "</ul>\n";
 }, a.prototype.toString = function() {
  var e = "<li>";
  return this.anchor && this.text && (e += '<a href="#' + this.anchor + '">' + this.text + "</a>"), 
  e += this.childrenToString() + "</li>\n";
 };
 var u = void 0;
 return c.onEditorConfigure = function(e) {
  u = document.getElementById("preview-contents");
  var n = document.querySelectorAll(".table-of-contents"), o = new RegExp("^" + c.config.marker + "$", "g");
  e.hooks.chain("onPreviewRefresh", function() {
   var e = l();
   t.each(u.getElementsByTagName("p"), function(t) {
    o.test(t.innerHTML) && (t.innerHTML = e);
   }), t.each(n, function(t) {
    t.innerHTML = e;
   });
  });
 }, c;
}), define("text!html/mathJaxSettingsBlock.html", [], function() {
 return '<p>Allows StackEdit to interpret LaTeX mathematical expressions.</p>\n<div class="form-horizontal">\n    <div class="control-group">\n        <label class="control-label"\n            for="input-mathjax-config-tex">TeX configuration</label>\n        <div class="controls">\n            <input type="text" id="input-mathjax-config-tex">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label"\n            for="input-mathjax-config-tex2jax">tex2jax configuration</label>\n        <div class="controls">\n            <input type="text" id="input-mathjax-config-tex2jax">\n        </div>\n    </div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="http://docs.mathjax.org/en/latest/options/">More info</a></span>';
}), define("extensions/mathJax", [ "utils", "classes/Extension", "text!html/mathJaxSettingsBlock.html", "libs/MathJax" ], function(utils, Extension, mathJaxSettingsBlockHTML) {
 function processMath(e, t) {
  var n = blocks.slice(e, t + 1).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (HUB.Browser.isMSIE && (n = n.replace(/(%[^\n]*)\n/g, "$1<br/>\n")); t > e; ) blocks[t] = "", 
  t--;
  blocks[e] = "@@" + math.length + "@@", math.push(n), start = end = last = null;
 }
 function removeMath(e) {
  start = end = last = null, math = [], blocks = e.replace(/\r\n?/g, "\n").split(SPLIT);
  for (var t = 1, n = blocks.length; n > t; t += 2) {
   var o = blocks[t];
   "@" === o.charAt(0) ? (blocks[t] = "@@" + math.length + "@@", math.push(o)) : start ? o === end ? braces ? last = t : processMath(start, t) : o.match(/\n.*\n/) ? (last && (t = last, 
   processMath(start, t)), start = end = last = null, braces = 0) : "{" === o ? braces++ : "}" === o && braces && braces-- : o === inline || "$$" === o ? (start = t, 
   end = o, braces = 0) : "begin" === o.substr(1, 5) && (start = t, end = "\\end" + o.substr(6), 
   braces = 0);
  }
  return last && processMath(start, last), blocks.join("");
 }
 function replaceMath(e) {
  return e = e.replace(/@@(\d+)@@/g, function(e, t) {
   return math[t];
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
 }, mathJax.onSaveSettings = function(e, t) {
  e.tex = utils.getInputJsValue("#input-mathjax-config-tex", t), e.tex2jax = utils.getInputJsValue("#input-mathjax-config-tex2jax", t);
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
   var e = MathJax.OutputJax["HTML-CSS"], t = e.Translate;
   e.Augment({
    Translate: function(n, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, o);
    }
   });
  }), HUB.Register.StartupHook("SVG Jax Config", function() {
   var e = MathJax.OutputJax.SVG, t = e.Translate;
   e.Augment({
    Translate: function(n, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, o);
    }
   });
  }), HUB.Register.StartupHook("TeX Jax Config", function() {
   var e = MathJax.InputJax.TeX, t = e.Translate;
   e.Augment({
    Translate: function(n, o) {
     if (HUB.cancelTypeset || o.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, o);
    }
   });
  });
  var PROCESSERROR = HUB.processError;
  HUB.processError = function(e, t, n) {
   return e.message !== CANCELMESSAGE ? PROCESSERROR.call(HUB, e, t, n) : (MathJax.Message.Clear(0, 0), 
   t.jaxIDs = [], t.jax = {}, t.scripts = [], t.i = t.j = 0, t.cancelled = !0, null);
  }, HUB.Cancel = function() {
   this.cancelTypeset = !0;
  };
 }
 return mathJax;
}), define("extensions/emailConverter", [ "classes/Extension" ], function(e) {
 var t = new e("emailConverter", "Markdown Email", !0);
 return t.settingsBlock = "<p>Converts email adresses in the form &lt;email@example.com&gt; into clickable links.</p>", 
 t.onEditorConfigure = function(e) {
  e.getConverter().hooks.chain("postConversion", function(e) {
   return e.replace(/<(mailto\:)?([^\s>]+@[^\s>]+\.\S+?)>/g, function(e, t, n) {
    return '<a href="mailto:' + n + '">' + n + "</a>";
   });
  });
 }, t;
}), define("text!html/scrollLinkSettingsBlock.html", [], function() {
 return '<p>Binds together editor and preview scrollbars.</p>\n<blockquote class="muted">\n	<b>NOTE:</b> The mapping between Markdown and HTML is based on the\n	position of the title elements (h1, h2...) in the page. Therefore if\n	your document does not contain any title, the mapping will be linear and\n	consequently less accurate.\n</blockquote>';
}), showLog = !0, css_browser_selector(navigator.userAgent), define("libs/css_browser_selector", function() {}), 
function(e) {
 "function" == typeof define && define.amd ? define("libs/jquery.mousewheel", [ "jquery" ], e) : "object" == typeof exports ? module.exports = e : e(jQuery);
}(function(e) {
 function t(t) {
  var i, r = t || window.event, a = [].slice.call(arguments, 1), s = 0, l = 0, c = 0, u = 0, d = 0;
  return t = e.event.fix(r), t.type = "mousewheel", r.wheelDelta && (s = r.wheelDelta), 
  r.detail && (s = -1 * r.detail), r.deltaY && (c = -1 * r.deltaY, s = c), r.deltaX && (l = r.deltaX, 
  s = -1 * l), void 0 !== r.wheelDeltaY && (c = r.wheelDeltaY), void 0 !== r.wheelDeltaX && (l = -1 * r.wheelDeltaX), 
  u = Math.abs(s), (!n || n > u) && (n = u), d = Math.max(Math.abs(c), Math.abs(l)), 
  (!o || o > d) && (o = d), i = s > 0 ? "floor" : "ceil", s = Math[i](s / n), l = Math[i](l / o), 
  c = Math[i](c / o), a.unshift(t, s, l, c), (e.event.dispatch || e.event.handle).apply(this, a);
 }
 var n, o, i = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], r = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
 if (e.event.fixHooks) for (var a = i.length; a; ) e.event.fixHooks[i[--a]] = e.event.mouseHooks;
 e.event.special.mousewheel = {
  setup: function() {
   if (this.addEventListener) for (var e = r.length; e; ) this.addEventListener(r[--e], t, !1); else this.onmousewheel = t;
  },
  teardown: function() {
   if (this.removeEventListener) for (var e = r.length; e; ) this.removeEventListener(r[--e], t, !1); else this.onmousewheel = null;
  }
 }, e.fn.extend({
  mousewheel: function(e) {
   return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
  },
  unmousewheel: function(e) {
   return this.unbind("mousewheel", e);
  }
 });
}), define("extensions/scrollLink", [ "jquery", "underscore", "classes/Extension", "text!html/scrollLinkSettingsBlock.html", "libs/css_browser_selector", "libs/jquery.mousewheel" ], function(e, t, n, o) {
 function i(e) {
  return parseFloat(e.substring(0, e.length - 2));
 }
 var r = new n("scrollLink", "Scroll Link", !0, !0);
 r.settingsBlock = o;
 var a = void 0;
 r.onSectionsCreated = function(e) {
  a = e;
 };
 var s = void 0, l = void 0, c = void 0, u = [], d = [], p = void 0, f = void 0, h = t.debounce(function() {
  function n(e) {
   var t = o;
   0 !== e.length && (c.val(e), t += c.prop("scrollHeight"));
   var n = r + t;
   u.push({
    startOffset: r,
    endOffset: n,
    height: t
   }), r = n, o = 0;
  }
  u = [], c.width(s.width());
  var o = i(s.css("padding-top")), r = 0;
  t.each(a, function(e, t) {
   t !== a.length - 1 ? e = e.substring(0, e.length - 1) : o += i(s.css("padding-bottom")), 
   n(e);
  }), d = [];
  var h = 0, g = l.scrollTop();
  l.find(".preview-content > .wmd-title").each(function() {
   var t = e(this), n = t.position().top + g + i(t.css("margin-top"));
   d.push({
    startOffset: h,
    endOffset: n,
    height: n - h
   }), h = n;
  });
  var m = l.prop("scrollHeight");
  d.push({
   startOffset: h,
   endOffset: m,
   height: m - h
  }), p = -10, f = -10, b();
 }, 500), g = !1, m = !1, b = t.debounce(function() {
  function e(e, n, o, i, r, a) {
   var s = void 0, l = t.find(n, function(t, n) {
    return s = n, e < t.endOffset;
   });
   if (void 0 !== l) {
    var c = (e - l.startOffset) / l.height, u = i[s], d = u.startOffset + u.height * c;
    return d = t.min([ d, o.prop("scrollHeight") - o.outerHeight() ]), Math.abs(d - r) <= 9 ? (a(r), 
    void 0) : (o.animate({
     scrollTop: d
    }, 500, function() {
     a(d);
    }), void 0);
   }
  }
  if (0 !== u.length && u.length === d.length) {
   var n = s.scrollTop(), o = l.scrollTop();
   g === !0 && Math.abs(n - p) > 9 ? (g = !1, p = n, e(n, u, l, d, o, function(e) {
    f = e;
   })) : m === !0 && Math.abs(o - f) > 9 && (m = !1, f = o, e(o, d, s, u, n, function(e) {
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
 return r.onEditorConfigure = function(t) {
  v = e("#preview-contents"), t.getConverter().hooks.chain("postConversion", function(e) {
   return v.height(v.height()), e;
  });
 }, r.onPreviewFinished = function() {
  v.height("auto"), g = !0, h();
 }, r;
}), define("text!html/buttonSync.html", [], function() {
 return '<button class="btn" title="Synchronize all documents">\n	<i class="icon-refresh"></i>\n</button>';
}), define("text!html/buttonSyncSettingsBlock.html", [], function() {
 return '<p>Adds a "Synchronize documents" button in the navigation bar.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="input-sync-period">Sync\n			period (0: manual)</label>\n		<div class="controls">\n			<input type="text" id="input-sync-period" class="input-mini"\n				placeholder="180000"> <span class="help-inline">ms</span>\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonSync", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonSync.html", "text!html/buttonSyncSettingsBlock.html" ], function(e, t, n, o, i, r) {
 var a = new o("buttonSync", 'Button "Synchronize"');
 a.settingsBlock = r, a.defaultConfig = {
  syncPeriod: 18e4
 }, a.onLoadSettings = function() {
  n.setInputValue("#input-sync-period", a.config.syncPeriod);
 }, a.onSaveSettings = function(e, t) {
  e.syncPeriod = n.getInputIntValue("#input-sync-period", t, 0);
 };
 var s = void 0;
 a.onSynchronizerCreated = function(e) {
  s = e;
 };
 var l = void 0, c = !1, u = !1, d = function() {
  void 0 !== l && (c === !0 || s.hasSync() === !1 || u ? l.addClass("disabled") : l.removeClass("disabled"));
 }, p = 0;
 return a.onPeriodicRun = function() {
  viewerMode === !0 || !a.config.syncPeriod || p + a.config.syncPeriod > n.currentTime || s.sync() === !0 && (p = n.currentTime);
 }, a.onCreateButton = function() {
  return l = e(i).click(function() {
   e(this).hasClass("disabled") || s.sync();
  }), l[0];
 }, a.onReady = d, a.onFileCreated = d, a.onFileDeleted = d, a.onSyncImportSuccess = d, 
 a.onSyncExportSuccess = d, a.onSyncRemoved = d, a.onSyncRunning = function(e) {
  c = e, d();
 }, a.onOfflineChanged = function(e) {
  u = e, d();
 }, a;
}), define("text!html/buttonPublish.html", [], function() {
 return '<button class="btn" title="Publish this document">\n	<i class="icon-share"></i>\n</button>';
}), define("extensions/buttonPublish", [ "jquery", "underscore", "classes/Extension", "text!html/buttonPublish.html" ], function(e, t, n, o) {
 function i() {
  void 0 !== a && (l === !0 || c === !1 || u === !0 ? a.addClass("disabled") : a.removeClass("disabled"));
 }
 var r = new n("buttonPublish", 'Button "Publish"');
 r.settingsBlock = '<p>Adds a "Publish document" button in the navigation bar.</p>';
 var a = void 0, s = void 0, l = !1, c = !1, u = !1, d = void 0;
 r.onPublisherCreated = function(e) {
  d = e;
 }, r.onCreateButton = function() {
  return a = e(o).click(function() {
   e(this).hasClass("disabled") || d.publish();
  }), a[0];
 }, r.onPublishRunning = function(e) {
  l = e, i();
 }, r.onOfflineChanged = function(e) {
  u = e, i();
 };
 var p = function() {
  c = 0 === t.size(s.publishLocations) ? !1 : !0, i();
 };
 return r.onFileSelected = function(e) {
  s = e, p();
 }, r.onPublishRemoved = p, r.onNewPublishSuccess = p, r;
}), define("text!html/buttonShare.html", [], function() {
 return '<button class="btn dropdown-toggle" data-toggle="dropdown"\n	title="Share this document">\n	<i class="icon-link"></i>\n</button>\n<div id="link-container" class="dropdown-menu pull-right">\n	<h3 class="muted">Sharing</h3>\n	<div class="link-list"></div>\n	<p class="no-link">To share this document you need first to <a\n		href="#" class="action-publish-gist">publish it as a Gist</a> in\n		Markdown format.\n	</p>\n	<blockquote class="muted">\n		<b>NOTE:</b> You can open any URL within StackEdit using <a\n			href="viewer.html?url=https://raw.github.com/benweet/stackedit/master/README.md"\n			title="Sharing example">viewer.html?url=...</a>\n	</blockquote>\n</div>\n';
}), define("text!html/buttonShareLocation.html", [], function() {
 return '<div class="input-prepend">\n	<a href="<%= link %>" class="add-on" title="Sharing location"><i\n		class="icon-link"></i></a> <input class="span2" type="text"\n		value="<%= link %>" readonly />\n</div>\n';
}), define("extensions/buttonShare", [ "jquery", "underscore", "classes/Extension", "text!html/buttonShare.html", "text!html/buttonShareLocation.html" ], function(e, t, n, o, i) {
 var r = new n("buttonShare", 'Button "Share"', !0);
 r.settingsBlock = '<p>Adds a "Share document" button in the navigation bar.</p>', 
 r.onCreateButton = function() {
  return o;
 };
 var a = void 0, s = function(n) {
  if (void 0 === n || n === a) {
   var o = e("#link-container .link-list").empty();
   e("#link-container .no-link").show();
   var r = t.values(a.publishLocations);
   t.each(r, function(n) {
    if (n.sharingLink) {
     var r = e(t.template(i, {
      link: n.sharingLink
     }));
     o.append(r), e("#link-container .no-link").hide();
    }
   });
  }
 };
 return r.onFileSelected = function(e) {
  a = e, s(e);
 }, r.onNewPublishSuccess = s, r.onPublishRemoved = s, r;
}), define("text!html/buttonStat.html", [], function() {
 return '<button class="btn dropdown-toggle" title="Document statistics" data-toggle="dropdown">\n	<i class="icon-chart-bar"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Statistics</h3>\n	<div class="stat">\n		<div>\n			<%= name1 %>: <span id="span-stat-value1"></span>\n		</div>\n		<div>\n			<%= name2 %>: <span id="span-stat-value2"></span>\n		</div>\n		<div>\n			<%= name3 %>: <span id="span-stat-value3"></span>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/buttonStatSettingsBlock.html", [], function() {
 return '<p>Adds a "Document statistics" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="control-group form-inline">\n		<label class="label-text" for="input-stat-name1">Title</label> <input\n			id="input-stat-name1" type="text" class="input-small"> <label\n			class="label-text" for="input-stat-value1">RegExp</label> <input\n			id="input-stat-value1" type="text" class="span2">\n	</div>\n	<div class="control-group form-inline">\n		<label class="label-text" for="input-stat-name2">Title</label> <input\n			id="input-stat-name2" type="text" class="input-small"> <label\n			class="label-text" for="input-stat-value2">RegExp</label> <input\n			id="input-stat-value2" type="text" class="span2">\n	</div>\n	<div class="control-group form-inline">\n		<label class="label-text" for="input-stat-name3">Title</label> <input\n			id="input-stat-name3" type="text" class="input-small"> <label\n			class="label-text" for="input-stat-value3">RegExp</label> <input\n			id="input-stat-value3" type="text" class="span2">\n	</div>\n</div>\n';
}), define("extensions/buttonStat", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonStat.html", "text!html/buttonStatSettingsBlock.html" ], function(e, t, n, o, i, r) {
 var a = new o("buttonStat", 'Button "Statistics"', !0, !0);
 a.settingsBlock = r, a.defaultConfig = {
  name1: "Characters",
  value1: "\\S",
  name2: "Words",
  value2: "\\S+",
  name3: "Paragraphs",
  value3: "\\S.*"
 }, a.onLoadSettings = function() {
  t.each([ 1, 2, 3 ], function(e) {
   n.setInputValue("#input-stat-name" + e, a.config["name" + e]), n.setInputValue("#input-stat-value" + e, a.config["value" + e]);
  });
 }, a.onSaveSettings = function(e, o) {
  t.each([ 1, 2, 3 ], function(t) {
   e["name" + t] = n.getInputTextValue("#input-stat-name" + t, o), e["value" + t] = n.getInputRegExpValue("#input-stat-value" + t, o);
  });
 }, a.onCreatePreviewButton = function() {
  return t.template(i, a.config);
 };
 var s = void 0, l = void 0, c = void 0, u = void 0;
 return a.onReady = function() {
  s = document.getElementById("preview-contents"), l = document.getElementById("span-stat-value1"), 
  c = document.getElementById("span-stat-value2"), u = document.getElementById("span-stat-value3");
 }, a.onPreviewFinished = function() {
  for (var e = s.cloneNode(!0), t = e.getElementsByTagName("script"), n = t.length - 1; n >= 0; n--) {
   var o = t[n];
   o.parentNode.removeChild(o);
  }
  var i = e.textContent;
  l.textContent = (i.match(new RegExp(a.config.value1, "g")) || []).length, c.textContent = (i.match(new RegExp(a.config.value2, "g")) || []).length, 
  u.textContent = (i.match(new RegExp(a.config.value3, "g")) || []).length;
 }, a;
}), define("text!html/buttonHtmlCode.html", [], function() {
 return '<button class="btn dropdown-toggle action-html-code" title="HTML code" data-toggle="dropdown">\n	<i class="icon-code"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>HTML code</h3>\n	<textarea id="input-html-code"></textarea>\n</div>\n';
}), define("text!html/buttonHtmlCodeSettingsBlock.html", [], function() {
 return '<p>Adds a "HTML code" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="control-group">\n		<label class="control-label" for="textarea-html-code-template">Template\n			<a href="#" class="tooltip-template">(?)</a>\n		</label>\n		<div class="controls">\n			<textarea id="textarea-html-code-template"></textarea>\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonHtmlCode", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonHtmlCode.html", "text!html/buttonHtmlCodeSettingsBlock.html" ], function(e, t, n, o, i, r) {
 var a = new o("buttonHtmlCode", 'Button "HTML code"', !0, !0);
 a.settingsBlock = r, a.defaultConfig = {
  template: "<%= documentHTML %>"
 }, a.onLoadSettings = function() {
  n.setInputValue("#textarea-html-code-template", a.config.template);
 }, a.onSaveSettings = function(e) {
  e.template = n.getInputValue("#textarea-html-code-template");
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
   var n = t.template(a.config.template, {
    documentTitle: l.title,
    documentMarkdown: l.content,
    documentHTML: e
   });
   c.value = n;
  } catch (o) {
   return s.onError(o), o.message;
  }
 }, a.onReady = function() {
  c = document.getElementById("input-html-code"), e(".action-html-code").click(function() {
   t.defer(function() {
    e("#input-html-code").each(function() {
     e(this).is(":hidden") || e(this).get(0).select();
    });
   });
  });
 }, a;
}), define("text!html/buttonMarkdownSyntax.html", [], function() {
 return '<button class="btn dropdown-toggle" title="Markdown syntax" data-toggle="dropdown">\n	<i class="icon-help-circled"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Markdown syntax</h3>\n	<div class="markdown-syntax">\n<h4>Phrase Emphasis</h4>\n\n<pre><code>*italic*   **bold**\n_italic_   __bold__\n</code></pre>\n\n<h4>Links</h4>\n\n<p>Inline:</p>\n\n<pre><code>An [example](http://url.com/ "Title")\n</code></pre>\n\n<p>Reference-style labels (titles are optional):</p>\n\n<pre><code>An [example][id]. Then, anywhere\nelse in the doc, define the link:\n\n  [id]: http://example.com/  "Title"\n</code></pre>\n\n<h4>Images</h4>\n\n<p>Inline (titles are optional):</p>\n\n<pre><code>![alt text](/path/img.jpg "Title")\n</code></pre>\n\n<p>Reference-style:</p>\n\n<pre><code>![alt text][id]\n\n[id]: /url/to/img.jpg "Title"\n</code></pre>\n\n<h4>Headers</h4>\n\n<p>Setext-style:</p>\n\n<pre><code>Header 1\n========\n\nHeader 2\n--------\n</code></pre>\n\n<p>atx-style (closing #\'s are optional):</p>\n\n<pre><code># Header 1 #\n\n## Header 2 ##\n\n###### Header 6\n</code></pre>\n\n<h4>Lists</h4>\n\n<p>Ordered, without paragraphs:</p>\n\n<pre><code>1.  Foo\n2.  Bar\n</code></pre>\n\n<p>Unordered, with paragraphs:</p>\n\n<pre><code>*   A list item.\n\n    With multiple paragraphs.\n\n*   Bar\n</code></pre>\n\n<p>You can nest them:</p>\n\n<pre><code>*   Abacus\n    * answer\n*   Bubbles\n    1.  bunk\n    2.  bupkis\n        * BELITTLER\n    3. burper\n*   Cunning\n</code></pre>\n\n<h4>Blockquotes</h4>\n\n<pre><code>&gt; Email-style angle brackets\n&gt; are used for blockquotes.\n\n&gt; &gt; And, they can be nested.\n\n&gt; #### Headers in blockquotes\n&gt; \n&gt; * You can quote a list.\n&gt; * Etc.\n</code></pre>\n\n<h4>Code Spans</h4>\n\n<pre><code>`&lt;code&gt;` spans are delimited\nby backticks.\n\nYou can include literal backticks\nlike `` `this` ``.\n</code></pre>\n\n<h4>Preformatted Code Blocks</h4>\n\n<p>Indent every line of a code block by at least 4 spaces or 1 tab.</p>\n\n<pre><code>This is a normal paragraph.\n\n    This is a preformatted\n    code block.\n</code></pre>\n\n<h4>Horizontal Rules</h4>\n\n<p>Three or more dashes or asterisks:</p>\n\n<pre><code>---\n\n* * *\n\n- - - - \n</code></pre>\n\n<h4>Manual Line Breaks</h4>\n\n<p>End a line with two or more spaces:</p>\n\n<pre><code>Roses are red,   \nViolets are blue.\n</code></pre>\n\n<p class="muted">Based on the <a target="_blank" href="https://github.com/fletcher/MultiMarkdown/blob/master/Documentation/Markdown%20Syntax.md">Markdown syntax guide</a>, by Fletcher T. Penney.</p>\n    </div>\n</div>\n';
}), define("extensions/buttonMarkdownSyntax", [ "jquery", "classes/Extension", "text!html/buttonMarkdownSyntax.html" ], function(e, t, n) {
 var o = new t("buttonMarkdownSyntax", 'Button "Markdown syntax', !0);
 return o.settingsBlock = '<p>Adds a "Markdown syntax" button over the preview.</p>', 
 o.onCreatePreviewButton = function() {
  return n;
 }, o;
}), define("text!html/buttonViewer.html", [], function() {
 return '<a href="viewer.html" class="btn dropdown-toggle"\n	title="Open in viewer">\n	<i class="icon-resize-full"></i>\n</a>\n';
}), define("extensions/buttonViewer", [ "jquery", "classes/Extension", "text!html/buttonViewer.html" ], function(e, t, n) {
 var o = new t("buttonViewer", 'Button "Viewer"', !0);
 return o.settingsBlock = '<p>Adds a "Viewer" button over the preview.</p>', o.onCreatePreviewButton = function() {
  return n;
 }, o;
}), !jQuery) throw new Error("Bootstrap requires jQuery");

+function(e) {
 function t() {
  var e = document.createElement("bootstrap"), t = {
   WebkitTransition: "webkitTransitionEnd",
   MozTransition: "transitionend",
   OTransition: "oTransitionEnd otransitionend",
   transition: "transitionend"
  };
  for (var n in t) if (void 0 !== e.style[n]) return {
   end: t[n]
  };
 }
 e.fn.emulateTransitionEnd = function(t) {
  var n = !1, o = this;
  e(this).one("webkitTransitionEnd", function() {
   n = !0;
  });
  var i = function() {
   n || e(o).trigger("webkitTransitionEnd");
  };
  return setTimeout(i, t), this;
 }, e(function() {
  e.support.transition = t();
 });
}(window.jQuery), +function(e) {
 var t = '[data-dismiss="alert"]', n = function(n) {
  e(n).on("click", t, this.close);
 };
 n.prototype.close = function(t) {
  function n() {
   r.trigger("closed.bs.alert").remove();
  }
  var o = e(this), i = o.attr("data-target");
  i || (i = o.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
  var r = e(i);
  t && t.preventDefault(), r.length || (r = o.hasClass("alert") ? o : o.parent()), 
  r.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (r.removeClass("in"), 
  e.support.transition && r.hasClass("fade") ? r.one(e.support.transition.end, n).emulateTransitionEnd(150) : n());
 };
 var o = e.fn.alert;
 e.fn.alert = function(t) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.alert");
   i || o.data("bs.alert", i = new n(this)), "string" == typeof t && i[t].call(o);
  });
 }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
  return e.fn.alert = o, this;
 }, e(document).on("click.bs.alert.data-api", t, n.prototype.close);
}(window.jQuery), +function(e) {
 var t = function(n, o) {
  this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, o);
 };
 t.DEFAULTS = {
  loadingText: "loading..."
 }, t.prototype.setState = function(e) {
  var t = "disabled", n = this.$element, o = n.is("input") ? "val" : "html", i = n.data();
  e += "Text", i.resetText || n.data("resetText", n[o]()), n[o](i[e] || this.options[e]), 
  setTimeout(function() {
   "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t);
  }, 0);
 }, t.prototype.toggle = function() {
  var e = this.$element.closest('[data-toggle="buttons"]');
  if (e.length) {
   var t = this.$element.find("input").prop("checked", !this.$element.hasClass("active"));
   "radio" === t.prop("type") && e.find(".active").removeClass("active");
  }
  this.$element.toggleClass("active");
 };
 var n = e.fn.button;
 e.fn.button = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("button"), r = "object" == typeof n && n;
   i || o.data("bs.button", i = new t(this, r)), "toggle" == n ? i.toggle() : n && i.setState(n);
  });
 }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
  return e.fn.button = n, this;
 }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
  var n = e(t.target);
  n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault();
 });
}(window.jQuery), +function(e) {
 var t = function(t, n) {
  this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), 
  this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
  "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this));
 };
 t.DEFAULTS = {
  interval: 5e3,
  pause: "hover"
 }, t.prototype.cycle = function(t) {
  return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), 
  this;
 }, t.prototype.getActiveIndex = function() {
  return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), 
  this.$items.index(this.$active);
 }, t.prototype.to = function(t) {
  var n = this, o = this.getActiveIndex();
  return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid", function() {
   n.to(t);
  }) : o == t ? this.pause().cycle() : this.slide(t > o ? "next" : "prev", e(this.$items[t]));
 }, t.prototype.pause = function(t) {
  return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), 
  this.cycle(!0)), this.interval = clearInterval(this.interval), this;
 }, t.prototype.next = function() {
  return this.sliding ? void 0 : this.slide("next");
 }, t.prototype.prev = function() {
  return this.sliding ? void 0 : this.slide("prev");
 }, t.prototype.slide = function(t, n) {
  var o = this.$element.find(".item.active"), i = n || o[t](), r = this.interval, a = "next" == t ? "left" : "right", s = "next" == t ? "first" : "last", l = this;
  this.sliding = !0, r && this.pause(), i = i.length ? i : this.$element.find(".item")[s]();
  var c = e.Event("slide.bs.carousel", {
   relatedTarget: i[0],
   direction: a
  });
  if (!i.hasClass("active")) {
   if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
   this.$element.one("slid", function() {
    var t = e(l.$indicators.children()[l.getActiveIndex()]);
    t && t.addClass("active");
   })), e.support.transition && this.$element.hasClass("slide")) {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    i.addClass(t), i[0].offsetWidth, o.addClass(a), i.addClass(a), o.one(e.support.transition.end, function() {
     i.removeClass([ t, a ].join(" ")).addClass("active"), o.removeClass([ "active", a ].join(" ")), 
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
 var n = e.fn.carousel;
 e.fn.carousel = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.carousel"), r = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof n && n), a = "string" == typeof n ? n : r.slide;
   i || o.data("bs.carousel", i = new t(this, r)), "number" == typeof n ? i.to(n) : a ? i[a]() : r.interval && i.pause().cycle();
  });
 }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
  return e.fn.carousel = n, this;
 }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
  var n, o = e(this), i = e(o.attr("data-target") || (n = o.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), r = e.extend({}, i.data(), o.data()), a = o.attr("data-slide-to");
  a && (r.interval = !1), i.carousel(r), (a = o.attr("data-slide-to")) && i.data("bs.carousel").to(a), 
  t.preventDefault();
 }), e(window).on("load", function() {
  e('[data-ride="carousel"]').each(function() {
   var t = e(this);
   t.carousel(t.data());
  });
 });
}(window.jQuery), +function(e) {
 var t = function(n, o) {
  this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, o), this.transitioning = null, 
  this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle();
 };
 t.DEFAULTS = {
  toggle: !0
 }, t.prototype.dimension = function() {
  var e = this.$element.hasClass("width");
  return e ? "width" : "height";
 }, t.prototype.show = function() {
  if (!this.transitioning && !this.$element.hasClass("in")) {
   var t = e.Event("show.bs.collapse");
   if (this.$element.trigger(t), !t.isDefaultPrevented()) {
    var n = this.$parent && this.$parent.find("> .accordion-group > .in");
    if (n && n.length) {
     var o = n.data("bs.collapse");
     if (o && o.transitioning) return;
     n.collapse("hide"), o || n.data("bs.collapse", null);
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
 }, t.prototype.hide = function() {
  if (!this.transitioning && this.$element.hasClass("in")) {
   var t = e.Event("hide.bs.collapse");
   if (this.$element.trigger(t), !t.isDefaultPrevented()) {
    var n = this.dimension();
    this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
    this.transitioning = 1;
    var o = function() {
     this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
    };
    return e.support.transition ? (this.$element[n](0).one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350), 
    void 0) : o.call(this);
   }
  }
 }, t.prototype.toggle = function() {
  this[this.$element.hasClass("in") ? "hide" : "show"]();
 };
 var n = e.fn.collapse;
 e.fn.collapse = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.collapse"), r = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof n && n);
   i || o.data("bs.collapse", i = new t(this, r)), "string" == typeof n && i[n]();
  });
 }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
  return e.fn.collapse = n, this;
 }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
  var n, o = e(this), i = o.attr("data-target") || t.preventDefault() || (n = o.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), r = e(i), a = r.data("bs.collapse"), s = a ? "toggle" : o.data(), l = o.attr("data-parent"), c = l && e(l);
  a && a.transitioning || (c && c.find("[data-toggle=collapse][data-parent=" + l + "]").not(o).addClass("collapsed"), 
  o[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(s);
 });
}(window.jQuery), +function(e) {
 function t() {
  e(o).remove(), e(i).each(function(t) {
   var o = n(e(this));
   o.hasClass("open") && (o.trigger(t = e.Event("hide.bs.dropdown")), t.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown"));
  });
 }
 function n(t) {
  var n = t.attr("data-target");
  n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
  var o = n && e(n);
  return o && o.length ? o : t.parent();
 }
 var o = ".dropdown-backdrop", i = "[data-toggle=dropdown]", r = function(t) {
  e(t).on("click.bs.dropdown", this.toggle);
 };
 r.prototype.toggle = function(o) {
  var i = e(this);
  if (!i.is(".disabled, :disabled")) {
   var r = n(i), a = r.hasClass("open");
   if (t(), !a) {
    if ("ontouchstart" in document.documentElement && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t), 
    r.trigger(o = e.Event("show.bs.dropdown")), o.isDefaultPrevented()) return;
    r.toggleClass("open").trigger("shown.bs.dropdown");
   }
   return i.focus(), !1;
  }
 }, r.prototype.keydown = function(t) {
  if (/(38|40|27)/.test(t.keyCode)) {
   var o = e(this);
   if (t.preventDefault(), t.stopPropagation(), !o.is(".disabled, :disabled")) {
    var r = n(o), a = r.hasClass("open");
    if (!a || a && 27 == t.keyCode) return 27 == t.which && r.find(i).focus(), o.click();
    var s = e("[role=menu] li:not(.divider):visible a", r);
    if (s.length) {
     var l = s.index(s.filter(":focus"));
     38 == t.keyCode && l > 0 && l--, 40 == t.keyCode && l < s.length - 1 && l++, ~l || (l = 0), 
     s.eq(l).focus();
    }
   }
  }
 };
 var a = e.fn.dropdown;
 e.fn.dropdown = function(t) {
  return this.each(function() {
   var n = e(this), o = n.data("dropdown");
   o || n.data("dropdown", o = new r(this)), "string" == typeof t && o[t].call(n);
  });
 }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() {
  return e.fn.dropdown = a, this;
 }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
  e.stopPropagation();
 }).on("click.bs.dropdown.data-api", i, r.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", r.prototype.keydown);
}(window.jQuery), +function(e) {
 var t = function(t, n) {
  this.options = n, this.$element = e(t).on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), 
  this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
 };
 t.DEFAULTS = {
  backdrop: !0,
  keyboard: !0,
  show: !0
 }, t.prototype.toggle = function() {
  return this[this.isShown ? "hide" : "show"]();
 }, t.prototype.show = function() {
  var t = this, n = e.Event("show.bs.modal");
  this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, 
  this.escape(), this.backdrop(function() {
   var n = e.support.transition && t.$element.hasClass("fade");
   t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), 
   n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), 
   t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
    t.$element.focus().trigger("shown.bs.modal");
   }).emulateTransitionEnd(300) : t.$element.focus().trigger("shown.bs.modal");
  }));
 }, t.prototype.hide = function(t) {
  t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), 
  this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), 
  this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
 }, t.prototype.enforceFocus = function() {
  e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
   this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus();
  }, this));
 }, t.prototype.escape = function() {
  this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
   27 == e.which && this.hide();
  }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
 }, t.prototype.hideModal = function() {
  var e = this;
  this.$element.hide(), this.backdrop(function() {
   e.removeBackdrop(), e.$element.trigger("hidden.bs.modal");
  });
 }, t.prototype.removeBackdrop = function() {
  this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
 }, t.prototype.backdrop = function(t) {
  var n = this.$element.hasClass("fade") ? "fade" : "";
  if (this.isShown && this.options.backdrop) {
   var o = e.support.transition && n;
   if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), 
   this.$element.on("click", e.proxy(function(e) {
    e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
   }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
   o ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t();
  } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t();
 };
 var n = e.fn.modal;
 e.fn.modal = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.modal"), r = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof n && n);
   i || o.data("bs.modal", i = new t(this, r)), "string" == typeof n ? i[n]() : r.show && i.show();
  });
 }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
  return e.fn.modal = n, this;
 }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
  var n = e(this), o = n.attr("href"), i = e(n.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")), r = i.data("modal") ? "toggle" : e.extend({
   remote: !/#/.test(o) && o
  }, i.data(), n.data());
  t.preventDefault(), i.modal(r).one("hide", function() {
   n.is(":visible") && n.focus();
  });
 });
 var o = e(document.body).on("shown.bs.modal", ".modal", function() {
  o.addClass("modal-open");
 }).on("hidden.bs.modal", ".modal", function() {
  o.removeClass("modal-open");
 });
}(window.jQuery), +function(e) {
 var t = function(e, t) {
  this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
  this.init("tooltip", e, t);
 };
 t.DEFAULTS = {
  animation: !0,
  placement: "top",
  selector: !1,
  template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: !1,
  container: !1
 }, t.prototype.init = function(t, n, o) {
  this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(o);
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
 }, t.prototype.getDefaults = function() {
  return t.DEFAULTS;
 }, t.prototype.getOptions = function(t) {
  return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
   show: t.delay,
   hide: t.delay
  }), t;
 }, t.prototype.enter = function(t) {
  var n = this.getDefaults(), o = {};
  this._options && e.each(this._options, function(e, t) {
   n[e] != t && (o[e] = t);
  });
  var i = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](o).data("bs." + this.type);
  return clearTimeout(i.timeout), i.options.delay && i.options.delay.show ? (i.hoverState = "in", 
  i.timeout = setTimeout(function() {
   "in" == i.hoverState && i.show();
  }, i.options.delay.show), void 0) : i.show();
 }, t.prototype.leave = function(t) {
  var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this._options).data("bs." + this.type);
  return clearTimeout(n.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", 
  n.timeout = setTimeout(function() {
   "out" == n.hoverState && n.hide();
  }, n.options.delay.hide), void 0) : n.hide();
 }, t.prototype.show = function() {
  var t = e.Event("show.bs." + this.type);
  if (this.hasContent() && this.enabled) {
   if (this.$element.trigger(t), t.isDefaultPrevented()) return;
   var n = this.tip();
   this.setContent(), this.options.animation && n.addClass("fade");
   var o = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, r = i.test(o);
   r && (o = o.replace(i, "") || "top"), n.detach().css({
    top: 0,
    left: 0,
    display: "block"
   }).addClass(o), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
   var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
   if (r) {
    var c = this.$element.parent(), u = o, d = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth : c.outerWidth(), f = "body" == this.options.container ? window.innerHeight : c.outerHeight(), h = "body" == this.options.container ? 0 : c.offset().left;
    o = "bottom" == o && a.top + a.height + l - d > f ? "top" : "top" == o && a.top - d - l < 0 ? "bottom" : "right" == o && a.right + s > p ? "left" : "left" == o && a.left - s < h ? "right" : o, 
    n.removeClass(u).addClass(o);
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
 }, t.prototype.applyPlacement = function(e, t) {
  var n, o = this.tip(), i = o[0].offsetWidth, r = o[0].offsetHeight;
  e.top = e.top + parseInt(o.css("margin-top"), 10), e.left = e.left + parseInt(o.css("margin-left"), 10), 
  o.offset(e).addClass("in");
  var a = o[0].offsetWidth, s = o[0].offsetHeight;
  if ("top" == t && s != r && (n = !0, e.top = e.top + r - s), "bottom" == t || "top" == t) {
   var l = 0;
   e.left < 0 && (l = -2 * e.left, e.left = 0, o.offset(e), a = o[0].offsetWidth, s = o[0].offsetHeight), 
   this.replaceArrow(l - i + a, a, "left");
  } else this.replaceArrow(s - r, s, "top");
  n && o.offset(e);
 }, t.prototype.replaceArrow = function(e, t, n) {
  this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "");
 }, t.prototype.setContent = function() {
  var e = this.tip(), t = this.getTitle();
  e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right");
 }, t.prototype.hide = function() {
  var t = this.tip(), n = e.Event("hide.bs." + this.type);
  return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (t.removeClass("in"), 
  e.support.transition && this.$tip.hasClass("fade") ? t.one(e.support.transition.end, t.detach).emulateTransitionEnd(150) : t.detach(), 
  this.$element.trigger("hidden.bs." + this.type), this);
 }, t.prototype.fixTitle = function() {
  var e = this.$element;
  (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
 }, t.prototype.hasContent = function() {
  return this.getTitle();
 }, t.prototype.getPosition = function() {
  var t = this.$element[0];
  return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
   width: t.offsetWidth,
   height: t.offsetHeight
  }, this.$element.offset());
 }, t.prototype.getTitle = function() {
  var e, t = this.$element, n = this.options;
  return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title);
 }, t.prototype.tip = function() {
  return this.$tip = this.$tip || e(this.options.template);
 }, t.prototype.arrow = function() {
  return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
 }, t.prototype.validate = function() {
  this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
 }, t.prototype.enable = function() {
  this.enabled = !0;
 }, t.prototype.disable = function() {
  this.enabled = !1;
 }, t.prototype.toggleEnabled = function() {
  this.enabled = !this.enabled;
 }, t.prototype.toggle = function(t) {
  var n = t ? e(t.currentTarget)[this.type](this._options).data("bs." + this.type) : this;
  n.tip().hasClass("in") ? n.leave(n) : n.enter(n);
 }, t.prototype.destroy = function() {
  this.hide().$element.off("." + this.type).removeData("bs." + this.type);
 };
 var n = e.fn.tooltip;
 e.fn.tooltip = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.tooltip"), r = "object" == typeof n && n;
   i || o.data("bs.tooltip", i = new t(this, r)), "string" == typeof n && i[n]();
  });
 }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
  return e.fn.tooltip = n, this;
 };
}(window.jQuery), +function(e) {
 var t = function(e, t) {
  this.init("popover", e, t);
 };
 if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
 t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
  placement: "right",
  trigger: "click",
  content: "",
  template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
 }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
 t.prototype.getDefaults = function() {
  return t.DEFAULTS;
 }, t.prototype.setContent = function() {
  var e = this.tip(), t = this.getTitle(), n = this.getContent();
  e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), 
  e.removeClass("fade top bottom left right in"), e.find(".popover-title:empty").hide();
 }, t.prototype.hasContent = function() {
  return this.getTitle() || this.getContent();
 }, t.prototype.getContent = function() {
  var e = this.$element, t = this.options;
  return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content);
 }, t.prototype.tip = function() {
  return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
 }, t.prototype.destroy = function() {
  this.hide().$element.off("." + this.type).removeData(this.type);
 };
 var n = e.fn.popover;
 e.fn.popover = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.popover"), r = "object" == typeof n && n;
   i || o.data("bs.popover", i = new t(this, r)), "string" == typeof n && i[n]();
  });
 }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
  return e.fn.popover = n, this;
 };
}(window.jQuery), +function(e) {
 function t(n, o) {
  var i, r = e.proxy(this.process, this);
  this.$element = e(n).is("body") ? e(window) : e(n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", r), 
  this.options = e.extend({}, t.DEFAULTS, o), this.selector = (this.options.target || (i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
  this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), 
  this.process();
 }
 t.DEFAULTS = {
  offset: 10
 }, t.prototype.refresh = function() {
  var t = this.$element[0] == window ? "offset" : "position";
  this.offsets = e([]), this.targets = e([]);
  var n = this;
  this.$body.find(this.selector).map(function() {
   var o = e(this), i = o.data("target") || o.attr("href"), r = /^#\w/.test(i) && e(i);
   return r && r.length && [ [ r[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i ] ] || null;
  }).sort(function(e, t) {
   return e[0] - t[0];
  }).each(function() {
   n.offsets.push(this[0]), n.targets.push(this[1]);
  });
 }, t.prototype.process = function() {
  var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, o = n - this.$scrollElement.height(), i = this.offsets, r = this.targets, a = this.activeTarget;
  if (t >= o) return a != (e = r.last()[0]) && this.activate(e);
  for (e = i.length; e--; ) a != r[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(r[e]);
 }, t.prototype.activate = function(t) {
  this.activeTarget = t, e(this.selector).parents(".active").removeClass("active");
  var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', o = e(n).parents("li").addClass("active");
  o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), 
  o.trigger("activate");
 };
 var n = e.fn.scrollspy;
 e.fn.scrollspy = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.scrollspy"), r = "object" == typeof n && n;
   i || o.data("bs.scrollspy", i = new t(this, r)), "string" == typeof n && i[n]();
  });
 }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
  return e.fn.scrollspy = n, this;
 }, e(window).on("load", function() {
  e('[data-spy="scroll"]').each(function() {
   var t = e(this);
   t.scrollspy(t.data());
  });
 });
}(window.jQuery), +function(e) {
 var t = function(t) {
  this.element = e(t);
 };
 t.prototype.show = function() {
  var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), o = t.attr("data-target");
  if (o || (o = t.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
   var i = n.find(".active:last a")[0], r = e.Event("show.bs.tab", {
    relatedTarget: i
   });
   if (t.trigger(r), !r.isDefaultPrevented()) {
    var a = e(o);
    this.activate(t.parent("li"), n), this.activate(a, a.parent(), function() {
     t.trigger({
      type: "shown.bs.tab",
      relatedTarget: i
     });
    });
   }
  }
 }, t.prototype.activate = function(t, n, o) {
  function i() {
   r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
   t.addClass("active"), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), 
   t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), o && o();
  }
  var r = n.find("> .active"), a = o && e.support.transition && r.hasClass("fade");
  a ? r.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), r.removeClass("in");
 };
 var n = e.fn.tab;
 e.fn.tab = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.tab");
   i || o.data("bs.tab", i = new t(this)), "string" == typeof n && i[n]();
  });
 }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
  return e.fn.tab = n, this;
 }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
  t.preventDefault(), e(this).tab("show");
 });
}(window.jQuery), +function(e) {
 var t = function(n, o) {
  this.options = e.extend({}, t.DEFAULTS, o), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), 
  this.$element = e(n), this.affixed = this.unpin = null, this.checkPosition();
 };
 t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
  offset: 0
 }, t.prototype.checkPositionWithEventLoop = function() {
  setTimeout(e.proxy(this.checkPosition, this), 1);
 }, t.prototype.checkPosition = function() {
  if (this.$element.is(":visible")) {
   var n = e(document).height(), o = this.$window.scrollTop(), i = this.$element.offset(), r = this.options.offset, a = r.top, s = r.bottom;
   "object" != typeof r && (s = a = r), "function" == typeof a && (a = r.top()), "function" == typeof s && (s = r.bottom());
   var l = null != this.unpin && o + this.unpin <= i.top ? !1 : null != s && i.top + this.$element.height() >= n - s ? "bottom" : null != a && a >= o ? "top" : !1;
   this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, 
   this.unpin = "bottom" == l ? i.top - o : null, this.$element.removeClass(t.RESET).addClass("affix" + (l ? "-" + l : "")), 
   "bottom" == l && this.$element.offset({
    top: document.body.offsetHeight - s - this.$element.height()
   }));
  }
 };
 var n = e.fn.affix;
 e.fn.affix = function(n) {
  return this.each(function() {
   var o = e(this), i = o.data("bs.affix"), r = "object" == typeof n && n;
   i || o.data("bs.affix", i = new t(this, r)), "string" == typeof n && i[n]();
  });
 }, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function() {
  return e.fn.affix = n, this;
 }, e(window).on("load", function() {
  e('[data-spy="affix"]').each(function() {
   var t = e(this), n = t.data();
   n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), 
   n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n);
  });
 });
}(window.jQuery), define("libs/bootstrap", function() {}), function(e) {
 var t = "waitForImages";
 e.waitForImages = {
  hasImageProperties: [ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage" ]
 }, e.expr[":"].uncached = function(t) {
  if (!e(t).is('img[src!=""]')) return !1;
  var n = new Image();
  return n.src = t.src, !n.complete;
 }, e.fn.waitForImages = function(n, o, i) {
  var r = 0, a = 0;
  if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, o = arguments[0].each, 
  n = arguments[0].finished), n = n || e.noop, o = o || e.noop, i = !!i, !e.isFunction(n) || !e.isFunction(o)) throw new TypeError("An invalid callback was supplied.");
  return this.each(function() {
   var s = e(this), l = [], c = e.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
   i ? s.find("*").andSelf().each(function() {
    var t = e(this);
    t.is("img:uncached") && l.push({
     src: t.attr("src"),
     element: t[0]
    }), e.each(c, function(e, n) {
     var o, i = t.css(n);
     if (!i) return !0;
     for (;o = u.exec(i); ) l.push({
      src: o[2],
      element: t[0]
     });
    });
   }) : s.find("img:uncached").each(function() {
    l.push({
     src: this.src,
     element: this
    });
   }), r = l.length, a = 0, 0 === r && n.call(s[0]), e.each(l, function(i, l) {
    var c = new Image();
    e(c).bind("load." + t + " error." + t, function(e) {
     return a++, o.call(l.element, a, r, "load" == e.type), a == r ? (n.call(s[0]), !1) : void 0;
    }), c.src = l.src;
   });
  });
 };
}(jQuery), define("libs/jquery.waitforimages", function() {}), define("eventMgr", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "settings", "text!html/settingsExtensionsAccordion.html", "extensions/partialRendering", "extensions/userCustom", "extensions/googleAnalytics", "extensions/dialogAbout", "extensions/dialogManagePublication", "extensions/dialogManageSynchronization", "extensions/dialogOpenHarddrive", "extensions/documentSelector", "extensions/documentTitle", "extensions/workingIndicator", "extensions/notifications", "extensions/markdownExtra", "extensions/toc", "extensions/mathJax", "extensions/emailConverter", "extensions/scrollLink", "extensions/buttonSync", "extensions/buttonPublish", "extensions/buttonShare", "extensions/buttonStat", "extensions/buttonHtmlCode", "extensions/buttonMarkdownSyntax", "extensions/buttonViewer", "libs/bootstrap", "libs/jquery.waitforimages" ], function(e, t, n, o, i, r, a) {
 function s(e) {
  return t.chain(d).map(function(t) {
   return t.enabled && t[e];
  }).compact().value();
 }
 function l(e) {
  return p[e] = s(e), function() {
   logger.log(e, arguments);
   var n = arguments;
   t.each(p[e], function(e) {
    try {
     e.apply(null, n);
    } catch (t) {
     console.error(t);
    }
   });
  };
 }
 function c(e) {
  u[e] = l(e);
 }
 var u = {}, d = t.chain(arguments).map(function(e) {
  return e instanceof i && e;
 }).compact().value();
 extensionSettings = r.extensionSettings || {}, t.each(d, function(e) {
  e.config = t.extend({}, e.defaultConfig, extensionSettings[e.extensionId]), e.enabled = viewerMode === !0 && e.disableInViewer === !0 ? !1 : !e.isOptional || void 0 === e.config.enabled || e.config.enabled === !0;
 });
 var p = {};
 u.addListener = function(e, t) {
  try {
   p[e].push(t);
  } catch (n) {
   console.error("No event listener called " + e);
  }
 }, l("onInit")(), u.onLoadSettings = function() {
  logger.log("onLoadSettings"), t.each(d, function(e) {
   i.setInputChecked("#input-enable-extension-" + e.extensionId, e.enabled === !0);
k   var t = e.onLoadSettings;
   t && t();
  });
 }, u.onSaveSettings = function(e, n) {
  logger.log("onSaveSettings"), t.each(d, function(i) {
   var r = t.extend({}, i.defaultConfig);
   r.enabled = o.getInputChecked("#input-enable-extension-" + i.extensionId);
   var a = i.onSaveSettings;
   a && a(r, n), e[i.extensionId] = r;
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
 u.onAsyncPreview = function() {
  function e() {
   ++n === g && (logger.log("Preview time: " + (new Date() - u.previewStartTime)), 
   t.defer(function() {
    var e = "";
    t.each(m.children, function(t) {
     e += t.innerHTML;
    }), f(o.trim(e));
   }));
  }
  logger.log("onAsyncPreview"), logger.log("Conversion time: " + (new Date() - u.previewStartTime));
  var n = 0;
  b.waitForImages(e), t.each(h, function(t) {
   t(e);
  });
 };
 var v = l("onReady");
 return u.onReady = function() {
  function o(e) {
   var o = n("div", {
    "class": "btn-group"
   }), i = e();
   return t.isString(i) ? o.innerHTML = i : t.isElement(i) && o.appendChild(i), o;
  }
  if (m = document.getElementById("preview-contents"), b = e(m), viewerMode === !1) {
   var i = t.chain(d).sortBy(function(e) {
    return e.extensionName.toLowerCase();
   }).reduce(function(e, n) {
    return e + t.template(a, {
     extensionId: n.extensionId,
     extensionName: n.extensionName,
     isOptional: n.isOptional,
     settingsBlock: n.settingsBlock
    });
   }, "").value();
   document.getElementById("accordion-extensions").innerHTML = i, logger.log("onCreateButton");
   var r = s("onCreateButton"), l = document.createDocumentFragment();
   t.each(r, function(e) {
    l.appendChild(o(e));
   }), document.getElementById("extension-buttons").appendChild(l), logger.log("onCreatePreviewButton");
   var c = s("onCreatePreviewButton"), u = document.createDocumentFragment();
   t.each(c, function(e) {
    u.appendChild(o(e));
   }), document.getElementById("extension-preview-buttons").appendChild(u);
  }
  v();
 }, u.onEventMgrCreated(u), u;
}), define("text!html/settingsTemplateTooltip.html", [], function() {
 return 'Available variables:\n<br>\n<ul>\n	<li><b>documentTitle</b>: document title</li>\n	<li><b>documentMarkdown</b>: document in Markdown format</li>\n	<li><b>documentHTML</b>: document in HTML format</li>\n	<li><b>publishAttributes</b>: attributes of the publish location\n		(undefined if not publishing)</li>\n</ul>\n<b>Examples:</b>\n<br />\n&lt;title&gt;&lt;%= documentTitle %&gt;&lt;&#x2F;title&gt;\n<br />\n&lt;div&gt;&lt;%- documentHTML %&gt;&lt;&#x2F;div&gt;\n<br />\n&lt;%<br />\nif(publishAttributes.provider.providerId == &quot;github&quot;)\nprint(documentMarkdown);<br />\n%&gt;\n<br />\n<br />\n<a target="_blank" href="http://underscorejs.org/#template">More\n	info</a>';
}), define("text!html/settingsUserCustomExtensionTooltip.html", [], function() {
 return 'Extension variable name:\n<b>userCustom</b>\n<br>\n<br>\n<b>Example:</b>\n<br />\nuserCustom.onPreviewFinished = function() {\n<br />\n&nbsp;&nbsp;eventMgr.onMessage(&quot;Finished!&quot;);\n<br />\n};\n<br />\n<br />\n<a target="_blank"\n	href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More\n	info</a>';
}), function(e, t) {
 function n(t, n) {
  var i, r, a, s = t.nodeName.toLowerCase();
  return "area" === s ? (i = t.parentNode, r = i.name, t.href && r && "map" === i.nodeName.toLowerCase() ? (a = e("img[usemap=#" + r + "]")[0], 
  !!a && o(a)) : !1) : (/input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || n : n) && o(t);
 }
 function o(t) {
  return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
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
  focus: function(t) {
   return function(n, o) {
    return "number" == typeof n ? this.each(function() {
     var t = this;
     setTimeout(function() {
      e(t).focus(), o && o.call(t);
     }, n);
    }) : t.apply(this, arguments);
   };
  }(e.fn.focus),
  scrollParent: function() {
   var t;
   return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
   }).eq(0) : this.parents().filter(function() {
    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
   }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t;
  },
  zIndex: function(n) {
   if (n !== t) return this.css("zIndex", n);
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
  data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
   return function(n) {
    return !!e.data(n, t);
   };
  }) : function(t, n, o) {
   return !!e.data(t, o[3]);
  },
  focusable: function(t) {
   return n(t, !isNaN(e.attr(t, "tabindex")));
  },
  tabbable: function(t) {
   var o = e.attr(t, "tabindex"), i = isNaN(o);
   return (i || o >= 0) && n(t, !i);
  }
 }), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(n, o) {
  function i(t, n, o, i) {
   return e.each(r, function() {
    n -= parseFloat(e.css(t, "padding" + this)) || 0, o && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), 
    i && (n -= parseFloat(e.css(t, "margin" + this)) || 0);
   }), n;
  }
  var r = "Width" === o ? [ "Left", "Right" ] : [ "Top", "Bottom" ], a = o.toLowerCase(), s = {
   innerWidth: e.fn.innerWidth,
   innerHeight: e.fn.innerHeight,
   outerWidth: e.fn.outerWidth,
   outerHeight: e.fn.outerHeight
  };
  e.fn["inner" + o] = function(n) {
   return n === t ? s["inner" + o].call(this) : this.each(function() {
    e(this).css(a, i(this, n) + "px");
   });
  }, e.fn["outer" + o] = function(t, n) {
   return "number" != typeof t ? s["outer" + o].call(this, t) : this.each(function() {
    e(this).css(a, i(this, t, !0, n) + "px");
   });
  };
 }), e.fn.addBack || (e.fn.addBack = function(e) {
  return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
 }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
  return function(n) {
   return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this);
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
   add: function(t, n, o) {
    var i, r = e.ui[t].prototype;
    for (i in o) r.plugins[i] = r.plugins[i] || [], r.plugins[i].push([ n, o[i] ]);
   },
   call: function(e, t, n) {
    var o, i = e.plugins[t];
    if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (o = 0; o < i.length; o++) e.options[i[o][0]] && i[o][1].apply(e.element, n);
   }
  },
  hasScroll: function(t, n) {
   if ("hidden" === e(t).css("overflow")) return !1;
   var o = n && "left" === n ? "scrollLeft" : "scrollTop", i = !1;
   return t[o] > 0 ? !0 : (t[o] = 1, i = t[o] > 0, t[o] = 0, i);
  }
 });
}(jQuery), function(e, t) {
 var n = 0, o = Array.prototype.slice, i = e.cleanData;
 e.cleanData = function(t) {
  for (var n, o = 0; null != (n = t[o]); o++) try {
   e(n).triggerHandler("remove");
  } catch (r) {}
  i(t);
 }, e.widget = function(t, n, o) {
  var i, r, a, s, l = {}, c = t.split(".")[0];
  t = t.split(".")[1], i = c + "-" + t, o || (o = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
   return !!e.data(t, i);
  }, e[c] = e[c] || {}, r = e[c][t], a = e[c][t] = function(e, t) {
   return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new a(e, t);
  }, e.extend(a, r, {
   version: o.version,
   _proto: e.extend({}, o),
   _childConstructors: []
  }), s = new n(), s.options = e.widget.extend({}, s.options), e.each(o, function(t, o) {
   return e.isFunction(o) ? (l[t] = function() {
    var e = function() {
     return n.prototype[t].apply(this, arguments);
    }, i = function(e) {
     return n.prototype[t].apply(this, e);
    };
    return function() {
     var t, n = this._super, r = this._superApply;
     return this._super = e, this._superApply = i, t = o.apply(this, arguments), this._super = n, 
     this._superApply = r, t;
    };
   }(), void 0) : (l[t] = o, void 0);
  }), a.prototype = e.widget.extend(s, {
   widgetEventPrefix: r ? s.widgetEventPrefix : t
  }, l, {
   constructor: a,
   namespace: c,
   widgetName: t,
   widgetFullName: i
  }), r ? (e.each(r._childConstructors, function(t, n) {
   var o = n.prototype;
   e.widget(o.namespace + "." + o.widgetName, a, n._proto);
  }), delete r._childConstructors) : n._childConstructors.push(a), e.widget.bridge(t, a);
 }, e.widget.extend = function(n) {
  for (var i, r, a = o.call(arguments, 1), s = 0, l = a.length; l > s; s++) for (i in a[s]) r = a[s][i], 
  a[s].hasOwnProperty(i) && r !== t && (n[i] = e.isPlainObject(r) ? e.isPlainObject(n[i]) ? e.widget.extend({}, n[i], r) : e.widget.extend({}, r) : r);
  return n;
 }, e.widget.bridge = function(n, i) {
  var r = i.prototype.widgetFullName || n;
  e.fn[n] = function(a) {
   var s = "string" == typeof a, l = o.call(arguments, 1), c = this;
   return a = !s && l.length ? e.widget.extend.apply(null, [ a ].concat(l)) : a, s ? this.each(function() {
    var o, i = e.data(this, r);
    return i ? e.isFunction(i[a]) && "_" !== a.charAt(0) ? (o = i[a].apply(i, l), o !== i && o !== t ? (c = o && o.jquery ? c.pushStack(o.get()) : o, 
    !1) : void 0) : e.error("no such method '" + a + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + a + "'");
   }) : this.each(function() {
    var t = e.data(this, r);
    t ? t.option(a || {})._init() : e.data(this, r, new i(a, this));
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
  _createWidget: function(t, o) {
   o = e(o || this.defaultElement || this)[0], this.element = e(o), this.uuid = n++, 
   this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), 
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
  option: function(n, o) {
   var i, r, a, s = n;
   if (0 === arguments.length) return e.widget.extend({}, this.options);
   if ("string" == typeof n) if (s = {}, i = n.split("."), n = i.shift(), i.length) {
    for (r = s[n] = e.widget.extend({}, this.options[n]), a = 0; a < i.length - 1; a++) r[i[a]] = r[i[a]] || {}, 
    r = r[i[a]];
    if (n = i.pop(), o === t) return r[n] === t ? null : r[n];
    r[n] = o;
   } else {
    if (o === t) return this.options[n] === t ? null : this.options[n];
    s[n] = o;
   }
   return this._setOptions(s), this;
  },
  _setOptions: function(e) {
   var t;
   for (t in e) this._setOption(t, e[t]);
   return this;
  },
  _setOption: function(e, t) {
   return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), 
   this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
   this;
  },
  enable: function() {
   return this._setOption("disabled", !1);
  },
  disable: function() {
   return this._setOption("disabled", !0);
  },
  _on: function(t, n, o) {
   var i, r = this;
   "boolean" != typeof t && (o = n, n = t, t = !1), o ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (o = n, 
   n = this.element, i = this.widget()), e.each(o, function(o, a) {
    function s() {
     return t || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : void 0;
    }
    "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
    var l = o.match(/^(\w+)\s*(.*)$/), c = l[1] + r.eventNamespace, u = l[2];
    u ? i.delegate(u, c, s) : n.bind(c, s);
   });
  },
  _off: function(e, t) {
   t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
   e.unbind(t).undelegate(t);
  },
  _delay: function(e, t) {
   function n() {
    return ("string" == typeof e ? o[e] : e).apply(o, arguments);
   }
   var o = this;
   return setTimeout(n, t || 0);
  },
  _hoverable: function(t) {
   this.hoverable = this.hoverable.add(t), this._on(t, {
    mouseenter: function(t) {
     e(t.currentTarget).addClass("ui-state-hover");
    },
    mouseleave: function(t) {
     e(t.currentTarget).removeClass("ui-state-hover");
    }
   });
  },
  _focusable: function(t) {
   this.focusable = this.focusable.add(t), this._on(t, {
    focusin: function(t) {
     e(t.currentTarget).addClass("ui-state-focus");
    },
    focusout: function(t) {
     e(t.currentTarget).removeClass("ui-state-focus");
    }
   });
  },
  _trigger: function(t, n, o) {
   var i, r, a = this.options[t];
   if (o = o || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), 
   n.target = this.element[0], r = n.originalEvent) for (i in r) i in n || (n[i] = r[i]);
   return this.element.trigger(n, o), !(e.isFunction(a) && a.apply(this.element[0], [ n ].concat(o)) === !1 || n.isDefaultPrevented());
  }
 }, e.each({
  show: "fadeIn",
  hide: "fadeOut"
 }, function(t, n) {
  e.Widget.prototype["_" + t] = function(o, i, r) {
   "string" == typeof i && (i = {
    effect: i
   });
   var a, s = i ? i === !0 || "number" == typeof i ? n : i.effect || n : t;
   i = i || {}, "number" == typeof i && (i = {
    duration: i
   }), a = !e.isEmptyObject(i), i.complete = r, i.delay && o.delay(i.delay), a && e.effects && e.effects.effect[s] ? o[t](i) : s !== t && o[s] ? o[s](i.duration, i.easing, r) : o.queue(function(n) {
    e(this)[t](), r && r.call(o[0]), n();
   });
  };
 });
}(jQuery), function(e) {
 var t = !1;
 e(document).mouseup(function() {
  t = !1;
 }), e.widget("ui.mouse", {
  version: "1.10.3",
  options: {
   cancel: "input,textarea,button,select,option",
   distance: 1,
   delay: 0
  },
  _mouseInit: function() {
   var t = this;
   this.element.bind("mousedown." + this.widgetName, function(e) {
    return t._mouseDown(e);
   }).bind("click." + this.widgetName, function(n) {
    return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), 
    n.stopImmediatePropagation(), !1) : void 0;
   }), this.started = !1;
  },
  _mouseDestroy: function() {
   this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
  },
  _mouseDown: function(n) {
   if (!t) {
    this._mouseStarted && this._mouseUp(n), this._mouseDownEvent = n;
    var o = this, i = 1 === n.which, r = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : !1;
    return i && !r && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, 
    this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
     o.mouseDelayMet = !0;
    }, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, 
    !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), 
    this._mouseMoveDelegate = function(e) {
     return o._mouseMove(e);
    }, this._mouseUpDelegate = function(e) {
     return o._mouseUp(e);
    }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
    n.preventDefault(), t = !0, !0)) : !0;
   }
  },
  _mouseMove: function(t) {
   return e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), 
   t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, 
   this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted);
  },
  _mouseUp: function(t) {
   return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
   this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), 
   this._mouseStop(t)), !1;
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
}(jQuery), function(e, t) {
 function n(e, t, n) {
  return [ parseFloat(e[0]) * (f.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (f.test(e[1]) ? n / 100 : 1) ];
 }
 function o(t, n) {
  return parseInt(e.css(t, n), 10) || 0;
 }
 function i(t) {
  var n = t[0];
  return 9 === n.nodeType ? {
   width: t.width(),
   height: t.height(),
   offset: {
    top: 0,
    left: 0
   }
  } : e.isWindow(n) ? {
   width: t.width(),
   height: t.height(),
   offset: {
    top: t.scrollTop(),
    left: t.scrollLeft()
   }
  } : n.preventDefault ? {
   width: 0,
   height: 0,
   offset: {
    top: n.pageY,
    left: n.pageX
   }
  } : {
   width: t.outerWidth(),
   height: t.outerHeight(),
   offset: t.offset()
  };
 }
 e.ui = e.ui || {};
 var r, a = Math.max, s = Math.abs, l = Math.round, c = /left|center|right/, u = /top|center|bottom/, d = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, f = /%$/, h = e.fn.position;
 e.position = {
  scrollbarWidth: function() {
   if (r !== t) return r;
   var n, o, i = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a = i.children()[0];
   return e("body").append(i), n = a.offsetWidth, i.css("overflow", "scroll"), o = a.offsetWidth, 
   n === o && (o = i[0].clientWidth), i.remove(), r = n - o;
  },
  getScrollInfo: function(t) {
   var n = t.isWindow ? "" : t.element.css("overflow-x"), o = t.isWindow ? "" : t.element.css("overflow-y"), i = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth, r = "scroll" === o || "auto" === o && t.height < t.element[0].scrollHeight;
   return {
    width: r ? e.position.scrollbarWidth() : 0,
    height: i ? e.position.scrollbarWidth() : 0
   };
  },
  getWithinInfo: function(t) {
   var n = e(t || window), o = e.isWindow(n[0]);
   return {
    element: n,
    isWindow: o,
    offset: n.offset() || {
     left: 0,
     top: 0
    },
    scrollLeft: n.scrollLeft(),
    scrollTop: n.scrollTop(),
    width: o ? n.width() : n.outerWidth(),
    height: o ? n.height() : n.outerHeight()
   };
  }
 }, e.fn.position = function(t) {
  if (!t || !t.of) return h.apply(this, arguments);
  t = e.extend({}, t);
  var r, f, g, m, b, v, y = e(t.of), x = e.position.getWithinInfo(t.within), w = e.position.getScrollInfo(x), k = (t.collision || "flip").split(" "), S = {};
  return v = i(y), y[0].preventDefault && (t.at = "left top"), f = v.width, g = v.height, 
  m = v.offset, b = e.extend({}, m), e.each([ "my", "at" ], function() {
   var e, n, o = (t[this] || "").split(" ");
   1 === o.length && (o = c.test(o[0]) ? o.concat([ "center" ]) : u.test(o[0]) ? [ "center" ].concat(o) : [ "center", "center" ]), 
   o[0] = c.test(o[0]) ? o[0] : "center", o[1] = u.test(o[1]) ? o[1] : "center", e = d.exec(o[0]), 
   n = d.exec(o[1]), S[this] = [ e ? e[0] : 0, n ? n[0] : 0 ], t[this] = [ p.exec(o[0])[0], p.exec(o[1])[0] ];
  }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? b.left += f : "center" === t.at[0] && (b.left += f / 2), 
  "bottom" === t.at[1] ? b.top += g : "center" === t.at[1] && (b.top += g / 2), r = n(S.at, f, g), 
  b.left += r[0], b.top += r[1], this.each(function() {
   var i, c, u = e(this), d = u.outerWidth(), p = u.outerHeight(), h = o(this, "marginLeft"), v = o(this, "marginTop"), C = d + h + o(this, "marginRight") + w.width, E = p + v + o(this, "marginBottom") + w.height, T = e.extend({}, b), _ = n(S.my, u.outerWidth(), u.outerHeight());
   "right" === t.my[0] ? T.left -= d : "center" === t.my[0] && (T.left -= d / 2), "bottom" === t.my[1] ? T.top -= p : "center" === t.my[1] && (T.top -= p / 2), 
   T.left += _[0], T.top += _[1], e.support.offsetFractions || (T.left = l(T.left), 
   T.top = l(T.top)), i = {
    marginLeft: h,
    marginTop: v
   }, e.each([ "left", "top" ], function(n, o) {
    e.ui.position[k[n]] && e.ui.position[k[n]][o](T, {
     targetWidth: f,
     targetHeight: g,
     elemWidth: d,
     elemHeight: p,
     collisionPosition: i,
     collisionWidth: C,
     collisionHeight: E,
     offset: [ r[0] + _[0], r[1] + _[1] ],
     my: t.my,
     at: t.at,
     within: x,
     elem: u
    });
   }), t.using && (c = function(e) {
    var n = m.left - T.left, o = n + f - d, i = m.top - T.top, r = i + g - p, l = {
     target: {
      element: y,
      left: m.left,
      top: m.top,
      width: f,
      height: g
     },
     element: {
      element: u,
      left: T.left,
      top: T.top,
      width: d,
      height: p
     },
     horizontal: 0 > o ? "left" : n > 0 ? "right" : "center",
     vertical: 0 > r ? "top" : i > 0 ? "bottom" : "middle"
    };
    d > f && s(n + o) < f && (l.horizontal = "center"), p > g && s(i + r) < g && (l.vertical = "middle"), 
    l.important = a(s(n), s(o)) > a(s(i), s(r)) ? "horizontal" : "vertical", t.using.call(this, e, l);
   }), u.offset(e.extend(T, {
    using: c
   }));
  });
 }, e.ui.position = {
  fit: {
   left: function(e, t) {
    var n, o = t.within, i = o.isWindow ? o.scrollLeft : o.offset.left, r = o.width, s = e.left - t.collisionPosition.marginLeft, l = i - s, c = s + t.collisionWidth - r - i;
    t.collisionWidth > r ? l > 0 && 0 >= c ? (n = e.left + l + t.collisionWidth - r - i, 
    e.left += l - n) : e.left = c > 0 && 0 >= l ? i : l > c ? i + r - t.collisionWidth : i : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = a(e.left - s, e.left);
   },
   top: function(e, t) {
    var n, o = t.within, i = o.isWindow ? o.scrollTop : o.offset.top, r = t.within.height, s = e.top - t.collisionPosition.marginTop, l = i - s, c = s + t.collisionHeight - r - i;
    t.collisionHeight > r ? l > 0 && 0 >= c ? (n = e.top + l + t.collisionHeight - r - i, 
    e.top += l - n) : e.top = c > 0 && 0 >= l ? i : l > c ? i + r - t.collisionHeight : i : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = a(e.top - s, e.top);
   }
  },
  flip: {
   left: function(e, t) {
    var n, o, i = t.within, r = i.offset.left + i.scrollLeft, a = i.width, l = i.isWindow ? i.scrollLeft : i.offset.left, c = e.left - t.collisionPosition.marginLeft, u = c - l, d = c + t.collisionWidth - a - l, p = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, h = -2 * t.offset[0];
    0 > u ? (n = e.left + p + f + h + t.collisionWidth - a - r, (0 > n || n < s(u)) && (e.left += p + f + h)) : d > 0 && (o = e.left - t.collisionPosition.marginLeft + p + f + h - l, 
    (o > 0 || s(o) < d) && (e.left += p + f + h));
   },
   top: function(e, t) {
    var n, o, i = t.within, r = i.offset.top + i.scrollTop, a = i.height, l = i.isWindow ? i.scrollTop : i.offset.top, c = e.top - t.collisionPosition.marginTop, u = c - l, d = c + t.collisionHeight - a - l, p = "top" === t.my[1], f = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, h = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, g = -2 * t.offset[1];
    0 > u ? (o = e.top + f + h + g + t.collisionHeight - a - r, e.top + f + h + g > u && (0 > o || o < s(u)) && (e.top += f + h + g)) : d > 0 && (n = e.top - t.collisionPosition.marginTop + f + h + g - l, 
    e.top + f + h + g > d && (n > 0 || s(n) < d) && (e.top += f + h + g));
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
  var t, n, o, i, r, a = document.getElementsByTagName("body")[0], s = document.createElement("div");
  t = document.createElement(a ? "div" : "body"), o = {
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
  for (r in o) t.style[r] = o[r];
  t.appendChild(s), n = a || document.documentElement, n.insertBefore(t, n.firstChild), 
  s.style.cssText = "position: absolute; left: 10.7432222px;", i = e(s).offset().left, 
  e.support.offsetFractions = i > 10 && 11 > i, t.innerHTML = "", n.removeChild(t);
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
  _mouseCapture: function(t) {
   var n = this.options;
   return this.helper || n.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), 
   this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
    e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
     width: this.offsetWidth + "px",
     height: this.offsetHeight + "px",
     position: "absolute",
     opacity: "0.001",
     zIndex: 1e3
    }).css(e(this).offset()).appendTo("body");
   }), !0) : !1);
  },
  _mouseStart: function(t) {
   var n = this.options;
   return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), 
   this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), 
   this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
   this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), 
   this.offset = this.positionAbs = this.element.offset(), this.offset = {
    top: this.offset.top - this.margins.top,
    left: this.offset.left - this.margins.left
   }, this.offset.scroll = !1, e.extend(this.offset, {
    click: {
     left: t.pageX - this.offset.left,
     top: t.pageY - this.offset.top
    },
    parent: this._getParentOffset(),
    relative: this._getRelativeOffset()
   }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, 
   this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), 
   this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
   e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), 
   e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0);
  },
  _mouseDrag: function(t, n) {
   if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), 
   this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), 
   !n) {
    var o = this._uiHash();
    if (this._trigger("drag", t, o) === !1) return this._mouseUp({}), !1;
    this.position = o.position;
   }
   return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
   this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
   e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1;
  },
  _mouseStop: function(t) {
   var n = this, o = !1;
   return e.ui.ddmanager && !this.options.dropBehaviour && (o = e.ui.ddmanager.drop(this, t)), 
   this.dropped && (o = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !o || "valid" === this.options.revert && o || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, o) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
    n._trigger("stop", t) !== !1 && n._clear();
   }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1;
  },
  _mouseUp: function(t) {
   return e("div.ui-draggable-iframeFix").each(function() {
    this.parentNode.removeChild(this);
   }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t);
  },
  cancel: function() {
   return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
   this;
  },
  _getHandle: function(t) {
   return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0;
  },
  _createHelper: function(t) {
   var n = this.options, o = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [ t ])) : "clone" === n.helper ? this.element.clone().removeAttr("id") : this.element;
   return o.parents("body").length || o.appendTo("parent" === n.appendTo ? this.element[0].parentNode : n.appendTo), 
   o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"), 
   o;
  },
  _adjustOffsetFromHelper: function(t) {
   "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
    left: +t[0],
    top: +t[1] || 0
   }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), 
   "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
  },
  _getParentOffset: function() {
   var t = this.offsetParent.offset();
   return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), 
   t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
    top: 0,
    left: 0
   }), {
    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
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
   var t, n, o, i = this.options;
   return i.containment ? "window" === i.containment ? (this.containment = [ e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : "document" === i.containment ? (this.containment = [ 0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : i.containment.constructor === Array ? (this.containment = i.containment, 
   void 0) : ("parent" === i.containment && (i.containment = this.helper[0].parentNode), 
   n = e(i.containment), o = n[0], o && (t = "hidden" !== n.css("overflow"), this.containment = [ (parseInt(n.css("borderLeftWidth"), 10) || 0) + (parseInt(n.css("paddingLeft"), 10) || 0), (parseInt(n.css("borderTopWidth"), 10) || 0) + (parseInt(n.css("paddingTop"), 10) || 0), (t ? Math.max(o.scrollWidth, o.offsetWidth) : o.offsetWidth) - (parseInt(n.css("borderRightWidth"), 10) || 0) - (parseInt(n.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(o.scrollHeight, o.offsetHeight) : o.offsetHeight) - (parseInt(n.css("borderBottomWidth"), 10) || 0) - (parseInt(n.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
   this.relative_container = n), void 0) : (this.containment = null, void 0);
  },
  _convertPositionTo: function(t, n) {
   n || (n = this.position);
   var o = "absolute" === t ? 1 : -1, i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
   return this.offset.scroll || (this.offset.scroll = {
    top: i.scrollTop(),
    left: i.scrollLeft()
   }), {
    top: n.top + this.offset.relative.top * o + this.offset.parent.top * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * o,
    left: n.left + this.offset.relative.left * o + this.offset.parent.left * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * o
   };
  },
  _generatePosition: function(t) {
   var n, o, i, r, a = this.options, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = t.pageX, c = t.pageY;
   return this.offset.scroll || (this.offset.scroll = {
    top: s.scrollTop(),
    left: s.scrollLeft()
   }), this.originalPosition && (this.containment && (this.relative_container ? (o = this.relative_container.offset(), 
   n = [ this.containment[0] + o.left, this.containment[1] + o.top, this.containment[2] + o.left, this.containment[3] + o.top ]) : n = this.containment, 
   t.pageX - this.offset.click.left < n[0] && (l = n[0] + this.offset.click.left), 
   t.pageY - this.offset.click.top < n[1] && (c = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (l = n[2] + this.offset.click.left), 
   t.pageY - this.offset.click.top > n[3] && (c = n[3] + this.offset.click.top)), a.grid && (i = a.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, 
   c = n ? i - this.offset.click.top >= n[1] || i - this.offset.click.top > n[3] ? i : i - this.offset.click.top >= n[1] ? i - a.grid[1] : i + a.grid[1] : i, 
   r = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, 
   l = n ? r - this.offset.click.left >= n[0] || r - this.offset.click.left > n[2] ? r : r - this.offset.click.left >= n[0] ? r - a.grid[0] : r + a.grid[0] : r)), 
   {
    top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
   };
  },
  _clear: function() {
   this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
   this.helper = null, this.cancelHelperRemoval = !1;
  },
  _trigger: function(t, n, o) {
   return o = o || this._uiHash(), e.ui.plugin.call(this, t, [ n, o ]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), 
   e.Widget.prototype._trigger.call(this, t, n, o);
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
  start: function(t, n) {
   var o = e(this).data("ui-draggable"), i = o.options, r = e.extend({}, n, {
    item: o.element
   });
   o.sortables = [], e(i.connectToSortable).each(function() {
    var n = e.data(this, "ui-sortable");
    n && !n.options.disabled && (o.sortables.push({
     instance: n,
     shouldRevert: n.options.revert
    }), n.refreshPositions(), n._trigger("activate", t, r));
   });
  },
  stop: function(t, n) {
   var o = e(this).data("ui-draggable"), i = e.extend({}, n, {
    item: o.element
   });
   e.each(o.sortables, function() {
    this.instance.isOver ? (this.instance.isOver = 0, o.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
    this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), 
    this.instance.options.helper = this.instance.options._helper, "original" === o.options.helper && this.instance.currentItem.css({
     top: "auto",
     left: "auto"
    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i));
   });
  },
  drag: function(t, n) {
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
     return n.helper[0];
    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), 
    this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = o.offset.click.top, 
    this.instance.offset.click.left = o.offset.click.left, this.instance.offset.parent.left -= o.offset.parent.left - this.instance.offset.parent.left, 
    this.instance.offset.parent.top -= o.offset.parent.top - this.instance.offset.parent.top, 
    o._trigger("toSortable", t), o.dropped = this.instance.element, o.currentItem = o.element, 
    this.instance.fromOutside = o), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, 
    this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), 
    this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, 
    this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
    o._trigger("fromSortable", t), o.dropped = !1);
   });
  }
 }), e.ui.plugin.add("draggable", "cursor", {
  start: function() {
   var t = e("body"), n = e(this).data("ui-draggable").options;
   t.css("cursor") && (n._cursor = t.css("cursor")), t.css("cursor", n.cursor);
  },
  stop: function() {
   var t = e(this).data("ui-draggable").options;
   t._cursor && e("body").css("cursor", t._cursor);
  }
 }), e.ui.plugin.add("draggable", "opacity", {
  start: function(t, n) {
   var o = e(n.helper), i = e(this).data("ui-draggable").options;
   o.css("opacity") && (i._opacity = o.css("opacity")), o.css("opacity", i.opacity);
  },
  stop: function(t, n) {
   var o = e(this).data("ui-draggable").options;
   o._opacity && e(n.helper).css("opacity", o._opacity);
  }
 }), e.ui.plugin.add("draggable", "scroll", {
  start: function() {
   var t = e(this).data("ui-draggable");
   t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset());
  },
  drag: function(t) {
   var n = e(this).data("ui-draggable"), o = n.options, i = !1;
   n.scrollParent[0] !== document && "HTML" !== n.scrollParent[0].tagName ? (o.axis && "x" === o.axis || (n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - n.overflowOffset.top < o.scrollSensitivity && (n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop - o.scrollSpeed)), 
   o.axis && "y" === o.axis || (n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - n.overflowOffset.left < o.scrollSensitivity && (n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (t.pageY - e(document).scrollTop() < o.scrollSensitivity ? i = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity && (i = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed))), 
   o.axis && "y" === o.axis || (t.pageX - e(document).scrollLeft() < o.scrollSensitivity ? i = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (i = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed)))), 
   i !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t);
  }
 }), e.ui.plugin.add("draggable", "snap", {
  start: function() {
   var t = e(this).data("ui-draggable"), n = t.options;
   t.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
    var n = e(this), o = n.offset();
    this !== t.element[0] && t.snapElements.push({
     item: this,
     width: n.outerWidth(),
     height: n.outerHeight(),
     top: o.top,
     left: o.left
    });
   });
  },
  drag: function(t, n) {
   var o, i, r, a, s, l, c, u, d, p, f = e(this).data("ui-draggable"), h = f.options, g = h.snapTolerance, m = n.offset.left, b = m + f.helperProportions.width, v = n.offset.top, y = v + f.helperProportions.height;
   for (d = f.snapElements.length - 1; d >= 0; d--) s = f.snapElements[d].left, l = s + f.snapElements[d].width, 
   c = f.snapElements[d].top, u = c + f.snapElements[d].height, s - g > b || m > l + g || c - g > y || v > u + g || !e.contains(f.snapElements[d].item.ownerDocument, f.snapElements[d].item) ? (f.snapElements[d].snapping && f.options.snap.release && f.options.snap.release.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = !1) : ("inner" !== h.snapMode && (o = Math.abs(c - y) <= g, 
   i = Math.abs(u - v) <= g, r = Math.abs(s - b) <= g, a = Math.abs(l - m) <= g, o && (n.position.top = f._convertPositionTo("relative", {
    top: c - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), i && (n.position.top = f._convertPositionTo("relative", {
    top: u,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s - f.helperProportions.width
   }).left - f.margins.left), a && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l
   }).left - f.margins.left)), p = o || i || r || a, "outer" !== h.snapMode && (o = Math.abs(c - v) <= g, 
   i = Math.abs(u - y) <= g, r = Math.abs(s - m) <= g, a = Math.abs(l - b) <= g, o && (n.position.top = f._convertPositionTo("relative", {
    top: c,
    left: 0
   }).top - f.margins.top), i && (n.position.top = f._convertPositionTo("relative", {
    top: u - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s
   }).left - f.margins.left), a && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l - f.helperProportions.width
   }).left - f.margins.left)), !f.snapElements[d].snapping && (o || i || r || a || p) && f.options.snap.snap && f.options.snap.snap.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = o || i || r || a || p);
  }
 }), e.ui.plugin.add("draggable", "stack", {
  start: function() {
   var t, n = this.data("ui-draggable").options, o = e.makeArray(e(n.stack)).sort(function(t, n) {
    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0);
   });
   o.length && (t = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function(n) {
    e(this).css("zIndex", t + n);
   }), this.css("zIndex", t + o.length));
  }
 }), e.ui.plugin.add("draggable", "zIndex", {
  start: function(t, n) {
   var o = e(n.helper), i = e(this).data("ui-draggable").options;
   o.css("zIndex") && (i._zIndex = o.css("zIndex")), o.css("zIndex", i.zIndex);
  },
  stop: function(t, n) {
   var o = e(this).data("ui-draggable").options;
   o._zIndex && e(n.helper).css("zIndex", o._zIndex);
  }
 });
}(jQuery), function(e, t) {
 var n = "ui-effects-";
 e.effects = {
  effect: {}
 }, function(e, t) {
  function n(e, t, n) {
   var o = d[t.type] || {};
   return null == e ? n || !t.def ? null : t.def : (e = o.floor ? ~~e : parseFloat(e), 
   isNaN(e) ? t.def : o.mod ? (e + o.mod) % o.mod : 0 > e ? 0 : o.max < e ? o.max : e);
  }
  function o(t) {
   var n = c(), o = n._rgba = [];
   return t = t.toLowerCase(), h(l, function(e, i) {
    var r, a = i.re.exec(t), s = a && i.parse(a), l = i.space || "rgba";
    return s ? (r = n[l](s), n[u[l].cache] = r[u[l].cache], o = n._rgba = r._rgba, !1) : void 0;
   }), o.length ? ("0,0,0,0" === o.join() && e.extend(o, r.transparent), n) : r[t];
  }
  function i(e, t, n) {
   return n = (n + 1) % 1, 1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e;
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
  } ], c = e.Color = function(t, n, o, i) {
   return new e.Color.fn.parse(t, n, o, i);
  }, u = {
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
  }, d = {
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
  h(u, function(e, t) {
   t.cache = "_" + e, t.props.alpha = {
    idx: 3,
    type: "percent",
    def: 1
   };
  }), c.fn = e.extend(c.prototype, {
   parse: function(i, a, s, l) {
    if (i === t) return this._rgba = [ null, null, null, null ], this;
    (i.jquery || i.nodeType) && (i = e(i).css(a), a = t);
    var d = this, p = e.type(i), f = this._rgba = [];
    return a !== t && (i = [ i, a, s, l ], p = "array"), "string" === p ? this.parse(o(i) || r._default) : "array" === p ? (h(u.rgba.props, function(e, t) {
     f[t.idx] = n(i[t.idx], t);
    }), this) : "object" === p ? (i instanceof c ? h(u, function(e, t) {
     i[t.cache] && (d[t.cache] = i[t.cache].slice());
    }) : h(u, function(t, o) {
     var r = o.cache;
     h(o.props, function(e, t) {
      if (!d[r] && o.to) {
       if ("alpha" === e || null == i[e]) return;
       d[r] = o.to(d._rgba);
      }
      d[r][t.idx] = n(i[e], t, !0);
     }), d[r] && e.inArray(null, d[r].slice(0, 3)) < 0 && (d[r][3] = 1, o.from && (d._rgba = o.from(d[r])));
    }), this) : void 0;
   },
   is: function(e) {
    var t = c(e), n = !0, o = this;
    return h(u, function(e, i) {
     var r, a = t[i.cache];
     return a && (r = o[i.cache] || i.to && i.to(o._rgba) || [], h(i.props, function(e, t) {
      return null != a[t.idx] ? n = a[t.idx] === r[t.idx] : void 0;
     })), n;
    }), n;
   },
   _space: function() {
    var e = [], t = this;
    return h(u, function(n, o) {
     t[o.cache] && e.push(n);
    }), e.pop();
   },
   transition: function(e, t) {
    var o = c(e), i = o._space(), r = u[i], a = 0 === this.alpha() ? c("transparent") : this, s = a[r.cache] || r.to(a._rgba), l = s.slice();
    return o = o[r.cache], h(r.props, function(e, i) {
     var r = i.idx, a = s[r], c = o[r], u = d[i.type] || {};
     null !== c && (null === a ? l[r] = c : (u.mod && (c - a > u.mod / 2 ? a += u.mod : a - c > u.mod / 2 && (a -= u.mod)), 
     l[r] = n((c - a) * t + a, i)));
    }), this[i](l);
   },
   blend: function(t) {
    if (1 === this._rgba[3]) return this;
    var n = this._rgba.slice(), o = n.pop(), i = c(t)._rgba;
    return c(e.map(n, function(e, t) {
     return (1 - o) * i[t] + o * e;
    }));
   },
   toRgbaString: function() {
    var t = "rgba(", n = e.map(this._rgba, function(e, t) {
     return null == e ? t > 2 ? 1 : 0 : e;
    });
    return 1 === n[3] && (n.pop(), t = "rgb("), t + n.join() + ")";
   },
   toHslaString: function() {
    var t = "hsla(", n = e.map(this.hsla(), function(e, t) {
     return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), 
     e;
    });
    return 1 === n[3] && (n.pop(), t = "hsl("), t + n.join() + ")";
   },
   toHexString: function(t) {
    var n = this._rgba.slice(), o = n.pop();
    return t && n.push(~~(255 * o)), "#" + e.map(n, function(e) {
     return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e;
    }).join("");
   },
   toString: function() {
    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
   }
  }), c.fn.parse.prototype = c.fn, u.hsla.to = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var t, n, o = e[0] / 255, i = e[1] / 255, r = e[2] / 255, a = e[3], s = Math.max(o, i, r), l = Math.min(o, i, r), c = s - l, u = s + l, d = .5 * u;
   return t = l === s ? 0 : o === s ? 60 * (i - r) / c + 360 : i === s ? 60 * (r - o) / c + 120 : 60 * (o - i) / c + 240, 
   n = 0 === c ? 0 : .5 >= d ? c / u : c / (2 - u), [ Math.round(t) % 360, n, d, null == a ? 1 : a ];
  }, u.hsla.from = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var t = e[0] / 360, n = e[1], o = e[2], r = e[3], a = .5 >= o ? o * (1 + n) : o + n - o * n, s = 2 * o - a;
   return [ Math.round(255 * i(s, a, t + 1 / 3)), Math.round(255 * i(s, a, t)), Math.round(255 * i(s, a, t - 1 / 3)), r ];
  }, h(u, function(o, i) {
   var r = i.props, a = i.cache, l = i.to, u = i.from;
   c.fn[o] = function(o) {
    if (l && !this[a] && (this[a] = l(this._rgba)), o === t) return this[a].slice();
    var i, s = e.type(o), d = "array" === s || "object" === s ? o : arguments, p = this[a].slice();
    return h(r, function(e, t) {
     var o = d["object" === s ? e : t.idx];
     null == o && (o = p[t.idx]), p[t.idx] = n(o, t);
    }), u ? (i = c(u(p)), i[a] = p, i) : c(p);
   }, h(r, function(t, n) {
    c.fn[t] || (c.fn[t] = function(i) {
     var r, a = e.type(i), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : o, c = this[l](), u = c[n.idx];
     return "undefined" === a ? u : ("function" === a && (i = i.call(this, u), a = e.type(i)), 
     null == i && n.empty ? this : ("string" === a && (r = s.exec(i), r && (i = u + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), 
     c[n.idx] = i, this[l](c)));
    });
   });
  }), c.hook = function(t) {
   var n = t.split(" ");
   h(n, function(t, n) {
    e.cssHooks[n] = {
     set: function(t, i) {
      var r, a, s = "";
      if ("transparent" !== i && ("string" !== e.type(i) || (r = o(i)))) {
       if (i = c(r || i), !p.rgba && 1 !== i._rgba[3]) {
        for (a = "backgroundColor" === n ? t.parentNode : t; ("" === s || "transparent" === s) && a && a.style; ) try {
         s = e.css(a, "backgroundColor"), a = a.parentNode;
        } catch (l) {}
        i = i.blend(s && "transparent" !== s ? s : "_default");
       }
       i = i.toRgbaString();
      }
      try {
       t.style[n] = i;
      } catch (l) {}
     }
    }, e.fx.step[n] = function(t) {
     t.colorInit || (t.start = c(t.elem, n), t.end = c(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos));
    };
   });
  }, c.hook(a), e.cssHooks.borderColor = {
   expand: function(e) {
    var t = {};
    return h([ "Top", "Right", "Bottom", "Left" ], function(n, o) {
     t["border" + o + "Color"] = e;
    }), t;
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
  function n(t) {
   var n, o, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, r = {};
   if (i && i.length && i[0] && i[i[0]]) for (o = i.length; o--; ) n = i[o], "string" == typeof i[n] && (r[e.camelCase(n)] = i[n]); else for (n in i) "string" == typeof i[n] && (r[n] = i[n]);
   return r;
  }
  function o(t, n) {
   var o, i, a = {};
   for (o in n) i = n[o], t[o] !== i && (r[o] || (e.fx.step[o] || !isNaN(parseFloat(i))) && (a[o] = i));
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
  e.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function(t, n) {
   e.fx.step[n] = function(e) {
    ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, n, e.end), 
    e.setAttr = !0);
   };
  }), e.fn.addBack || (e.fn.addBack = function(e) {
   return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
  }), e.effects.animateClass = function(t, r, a, s) {
   var l = e.speed(r, a, s);
   return this.queue(function() {
    var r, a = e(this), s = a.attr("class") || "", c = l.children ? a.find("*").addBack() : a;
    c = c.map(function() {
     var t = e(this);
     return {
      el: t,
      start: n(this)
     };
    }), r = function() {
     e.each(i, function(e, n) {
      t[n] && a[n + "Class"](t[n]);
     });
    }, r(), c = c.map(function() {
     return this.end = n(this.el[0]), this.diff = o(this.start, this.end), this;
    }), a.attr("class", s), c = c.map(function() {
     var t = this, n = e.Deferred(), o = e.extend({}, l, {
      queue: !1,
      complete: function() {
       n.resolve(t);
      }
     });
     return this.el.animate(this.diff, o), n.promise();
    }), e.when.apply(e, c.get()).done(function() {
     r(), e.each(arguments, function() {
      var t = this.el;
      e.each(this.diff, function(e) {
       t.css(e, "");
      });
     }), l.complete.call(a[0]);
    });
   });
  }, e.fn.extend({
   addClass: function(t) {
    return function(n, o, i, r) {
     return o ? e.effects.animateClass.call(this, {
      add: n
     }, o, i, r) : t.apply(this, arguments);
    };
   }(e.fn.addClass),
   removeClass: function(t) {
    return function(n, o, i, r) {
     return arguments.length > 1 ? e.effects.animateClass.call(this, {
      remove: n
     }, o, i, r) : t.apply(this, arguments);
    };
   }(e.fn.removeClass),
   toggleClass: function(n) {
    return function(o, i, r, a, s) {
     return "boolean" == typeof i || i === t ? r ? e.effects.animateClass.call(this, i ? {
      add: o
     } : {
      remove: o
     }, r, a, s) : n.apply(this, arguments) : e.effects.animateClass.call(this, {
      toggle: o
     }, i, r, a);
    };
   }(e.fn.toggleClass),
   switchClass: function(t, n, o, i, r) {
    return e.effects.animateClass.call(this, {
     add: n,
     remove: t
    }, o, i, r);
   }
  });
 }(), function() {
  function o(t, n, o, i) {
   return e.isPlainObject(t) && (n = t, t = t.effect), t = {
    effect: t
   }, null == n && (n = {}), e.isFunction(n) && (i = n, o = null, n = {}), ("number" == typeof n || e.fx.speeds[n]) && (i = o, 
   o = n, n = {}), e.isFunction(o) && (i = o, o = null), n && e.extend(t, n), o = o || n.duration, 
   t.duration = e.fx.off ? 0 : "number" == typeof o ? o : o in e.fx.speeds ? e.fx.speeds[o] : e.fx.speeds._default, 
   t.complete = i || n.complete, t;
  }
  function i(t) {
   return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0;
  }
  e.extend(e.effects, {
   version: "1.10.3",
   save: function(e, t) {
    for (var o = 0; o < t.length; o++) null !== t[o] && e.data(n + t[o], e[0].style[t[o]]);
   },
   restore: function(e, o) {
    var i, r;
    for (r = 0; r < o.length; r++) null !== o[r] && (i = e.data(n + o[r]), i === t && (i = ""), 
    e.css(o[r], i));
   },
   setMode: function(e, t) {
    return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t;
   },
   getBaseline: function(e, t) {
    var n, o;
    switch (e[0]) {
    case "top":
     n = 0;
     break;

    case "middle":
     n = .5;
     break;

    case "bottom":
     n = 1;
     break;

    default:
     n = e[0] / t.height;
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
     o = e[1] / t.width;
    }
    return {
     x: o,
     y: n
    };
   },
   createWrapper: function(t) {
    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
    var n = {
     width: t.outerWidth(!0),
     height: t.outerHeight(!0),
     "float": t.css("float")
    }, o = e("<div></div>").addClass("ui-effects-wrapper").css({
     fontSize: "100%",
     background: "transparent",
     border: "none",
     margin: 0,
     padding: 0
    }), i = {
     width: t.width(),
     height: t.height()
    }, r = document.activeElement;
    try {
     r.id;
    } catch (a) {
     r = document.body;
    }
    return t.wrap(o), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), o = t.parent(), 
    "static" === t.css("position") ? (o.css({
     position: "relative"
    }), t.css({
     position: "relative"
    })) : (e.extend(n, {
     position: t.css("position"),
     zIndex: t.css("z-index")
    }), e.each([ "top", "left", "bottom", "right" ], function(e, o) {
     n[o] = t.css(o), isNaN(parseInt(n[o], 10)) && (n[o] = "auto");
    }), t.css({
     position: "relative",
     top: 0,
     left: 0,
     right: "auto",
     bottom: "auto"
    })), t.css(i), o.css(n).show();
   },
   removeWrapper: function(t) {
    var n = document.activeElement;
    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), 
    t;
   },
   setTransition: function(t, n, o, i) {
    return i = i || {}, e.each(n, function(e, n) {
     var r = t.cssUnit(n);
     r[0] > 0 && (i[n] = r[0] * o + r[1]);
    }), i;
   }
  }), e.fn.extend({
   effect: function() {
    function t(t) {
     function o() {
      e.isFunction(r) && r.call(i[0]), e.isFunction(t) && t();
     }
     var i = e(this), r = n.complete, s = n.mode;
     (i.is(":hidden") ? "hide" === s : "show" === s) ? (i[s](), o()) : a.call(i[0], n, o);
    }
    var n = o.apply(this, arguments), i = n.mode, r = n.queue, a = e.effects.effect[n.effect];
    return e.fx.off || !a ? i ? this[i](n.duration, n.complete) : this.each(function() {
     n.complete && n.complete.call(this);
    }) : r === !1 ? this.each(t) : this.queue(r || "fx", t);
   },
   show: function(e) {
    return function(t) {
     if (i(t)) return e.apply(this, arguments);
     var n = o.apply(this, arguments);
     return n.mode = "show", this.effect.call(this, n);
    };
   }(e.fn.show),
   hide: function(e) {
    return function(t) {
     if (i(t)) return e.apply(this, arguments);
     var n = o.apply(this, arguments);
     return n.mode = "hide", this.effect.call(this, n);
    };
   }(e.fn.hide),
   toggle: function(e) {
    return function(t) {
     if (i(t) || "boolean" == typeof t) return e.apply(this, arguments);
     var n = o.apply(this, arguments);
     return n.mode = "toggle", this.effect.call(this, n);
    };
   }(e.fn.toggle),
   cssUnit: function(t) {
    var n = this.css(t), o = [];
    return e.each([ "em", "px", "%", "pt" ], function(e, t) {
     n.indexOf(t) > 0 && (o = [ parseFloat(n), t ]);
    }), o;
   }
  });
 }(), function() {
  var t = {};
  e.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(e, n) {
   t[n] = function(t) {
    return Math.pow(t, e + 2);
   };
  }), e.extend(t, {
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
    for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11; ) ;
    return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2);
   }
  }), e.each(t, function(t, n) {
   e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function(e) {
    return 1 - n(1 - e);
   }, e.easing["easeInOut" + t] = function(e) {
    return .5 > e ? n(2 * e) / 2 : 1 - n(-2 * e + 2) / 2;
   };
  });
 }();
}(jQuery), function(e) {
 e.effects.effect.slide = function(t, n) {
  var o, i = e(this), r = [ "position", "top", "bottom", "left", "right", "width", "height" ], a = e.effects.setMode(i, t.mode || "show"), s = "show" === a, l = t.direction || "left", c = "up" === l || "down" === l ? "top" : "left", u = "up" === l || "left" === l, d = {};
  e.effects.save(i, r), i.show(), o = t.distance || i["top" === c ? "outerHeight" : "outerWidth"](!0), 
  e.effects.createWrapper(i).css({
   overflow: "hidden"
  }), s && i.css(c, u ? isNaN(o) ? "-" + o : -o : o), d[c] = (s ? u ? "+=" : "-=" : u ? "-=" : "+=") + o, 
  i.animate(d, {
   queue: !1,
   duration: t.duration,
   easing: t.easing,
   complete: function() {
    "hide" === a && i.hide(), e.effects.restore(i, r), e.effects.removeWrapper(i), n();
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
   var t = $(e), n = t.data("layout") || t.data("parentLayout");
   if (n) {
    var o = n.container;
    if (o.data("layoutPane")) return o;
    var i = o.closest("." + $.layout.defaults.panes.paneClass);
    if (i.data("layoutPane")) return i;
   }
   return null;
  },
  getParentPaneInstance: function(e) {
   var t = $.layout.getParentPaneElem(e);
   return t ? t.data("layoutPane") : null;
  },
  getParentLayoutInstance: function(e) {
   var t = $.layout.getParentPaneElem(e);
   return t ? t.data("parentLayout") : null;
  },
  getEventObject: function(e) {
   return "object" == typeof e && e.stopPropagation ? e : null;
  },
  parsePaneName: function(e) {
   var t = $.layout.getEventObject(e), n = e;
   return t && (t.stopPropagation(), n = $(this).data("layoutEdge")), n && !/^(west|east|north|south|center)$/.test(n) && ($.layout.msg('LAYOUT ERROR - Invalid pane-name: "' + n + '"'), 
   n = "error"), n;
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
   var t = $('<div style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; overflow: scroll;"></div>').appendTo("body"), n = {
    width: t.css("width") - t[0].clientWidth,
    height: t.height() - t[0].clientHeight
   };
   return t.remove(), window.scrollbarWidth = n.width, window.scrollbarHeight = n.height, 
   e.match(/^(width|height)$/) ? n[e] : n;
  },
  showInvisibly: function(e, t) {
   if (e && e.length && (t || "none" === e.css("display"))) {
    var n = e[0].style, o = {
     display: n.display || "",
     visibility: n.visibility || ""
    };
    return e.css({
     display: "block",
     visibility: "hidden"
    }), o;
   }
   return {};
  },
  getElementDimensions: function(e, t) {
   var n, o, i, r = {
    css: {},
    inset: {}
   }, a = r.css, s = {
    bottom: 0
   }, l = $.layout.cssNum, c = e.offset();
   return r.offsetLeft = c.left, r.offsetTop = c.top, t || (t = {}), $.each("Left,Right,Top,Bottom".split(","), function(l, c) {
    n = a["border" + c] = $.layout.borderWidth(e, c), o = a["padding" + c] = $.layout.cssNum(e, "padding" + c), 
    i = c.toLowerCase(), r.inset[i] = t[i] >= 0 ? t[i] : o, s[i] = r.inset[i] + n;
   }), a.width = e.width(), a.height = e.height(), a.top = l(e, "top", !0), a.bottom = l(e, "bottom", !0), 
   a.left = l(e, "left", !0), a.right = l(e, "right", !0), r.outerWidth = e.outerWidth(), 
   r.outerHeight = e.outerHeight(), r.innerWidth = max(0, r.outerWidth - s.left - s.right), 
   r.innerHeight = max(0, r.outerHeight - s.top - s.bottom), r.layoutWidth = e.innerWidth(), 
   r.layoutHeight = e.innerHeight(), r;
  },
  getElementStyles: function(e, t) {
   var n, o, i, r, a, s, l = {}, c = e[0].style, u = t.split(","), d = "Top,Bottom,Left,Right".split(","), p = "Color,Style,Width".split(",");
   for (r = 0; r < u.length; r++) if (n = u[r], n.match(/(border|padding|margin)$/)) for (a = 0; 4 > a; a++) if (o = d[a], 
   "border" === n) for (s = 0; 3 > s; s++) i = p[s], l[n + o + i] = c[n + o + i]; else l[n + o] = c[n + o]; else l[n] = c[n];
   return l;
  },
  cssWidth: function(e, t) {
   if (0 >= t) return 0;
   var n = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", o = $.layout.borderWidth, i = $.layout.cssNum, r = t;
   return "border-box" !== n && (r -= o(e, "Left") + o(e, "Right")), "content-box" === n && (r -= i(e, "paddingLeft") + i(e, "paddingRight")), 
   max(0, r);
  },
  cssHeight: function(e, t) {
   if (0 >= t) return 0;
   var n = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", o = $.layout.borderWidth, i = $.layout.cssNum, r = t;
   return "border-box" !== n && (r -= o(e, "Top") + o(e, "Bottom")), "content-box" === n && (r -= i(e, "paddingTop") + i(e, "paddingBottom")), 
   max(0, r);
  },
  cssNum: function(e, t, n) {
   e.jquery || (e = $(e));
   var o = $.layout.showInvisibly(e), i = $.css(e[0], t, !0), r = n && "auto" == i ? i : Math.round(parseFloat(i) || 0);
   return e.css(o), r;
  },
  borderWidth: function(e, t) {
   e.jquery && (e = e[0]);
   var n = "border" + t.substr(0, 1).toUpperCase() + t.substr(1);
   return "none" === $.css(e, n + "Style", !0) ? 0 : Math.round(parseFloat($.css(e, n + "Width", !0)) || 0);
  },
  isMouseOverElem: function(e, t) {
   var n = $(t || this), o = n.offset(), i = o.top, r = o.left, a = r + n.outerWidth(), s = i + n.outerHeight(), l = e.pageX, c = e.pageY;
   return $.layout.browser.msie && 0 > l && 0 > c || l >= r && a >= l && c >= i && s >= c;
  },
  msg: function(e, t, n, o) {
   function i() {
    var e = $.support.fixedPosition ? "fixed" : "absolute", t = $('<div id="layoutLogger" style="position: ' + e + '; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">' + '<div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;">' + '<span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div>' + '<ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul>' + "</div>").appendTo("body");
    return t.css("left", $(window).width() - t.outerWidth() - 5), $.ui.draggable && t.draggable({
     handle: ":first-child"
    }), t;
   }
   if ($.isPlainObject(e) && window.debugData) {
    "string" == typeof t ? (o = n, n = t) : "object" == typeof n && (o = n, n = null);
    var r = n || "log( <object> )", a = $.extend({
     sort: !1,
     returnHTML: !1,
     display: !1
    }, o);
    t === !0 || a.display ? debugData(e, r, a) : window.console && console.log(debugData(e, r, a));
   } else if (t) alert(e); else if (window.console) console.log(e); else {
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
 }, $.layout.transformData = function(e, t) {
  var n, o, i, r, a, s, l, c = t ? {
   panes: {},
   center: {}
  } : {};
  if ("object" != typeof e) return c;
  for (o in e) for (n = c, a = e[o], i = o.split("__"), l = i.length - 1, s = 0; l >= s; s++) r = i[s], 
  s === l ? n[r] = $.isPlainObject(a) ? $.layout.transformData(a) : a : (n[r] || (n[r] = {}), 
  n = n[r]);
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
   function t(t, n) {
    for (var o, i = t.split("."), r = i.length - 1, a = {
     branch: e,
     key: i[r]
    }, s = 0; r > s; s++) o = i[s], a.branch = void 0 == a.branch[o] ? n ? a.branch[o] = {} : {} : a.branch[o];
    return a;
   }
   var n, o, i, r = $.layout.backwardCompatibility.map;
   for (var a in r) n = t(a), i = n.branch[n.key], void 0 !== i && (o = t(r[a], !0), 
   o.branch[o.key] = i, delete n.branch[n.key]);
  },
  renameAllOptions: function(e) {
   var t = $.layout.backwardCompatibility.renameOptions;
   return t(e), e.defaults && ("object" != typeof e.panes && (e.panes = {}), $.extend(!0, e.panes, e.defaults), 
   delete e.defaults), e.panes && t(e.panes), $.each($.layout.config.allPanes, function(n, o) {
    e[o] && t(e[o]);
   }), e;
  }
 }, $.fn.layout = function(opts) {
  function keyDown(e) {
   if (!e) return !0;
   var t = e.keyCode;
   if (33 > t) return !0;
   var n, o, i, r, a = {
    38: "north",
    40: "south",
    37: "west",
    39: "east"
   }, s = (e.altKey, e.shiftKey), l = e.ctrlKey, c = l && t >= 37 && 40 >= t;
   return c && options[a[t]].enableCursorHotkey ? r = a[t] : (l || s) && $.each(_c.borderPanes, function(e, a) {
    return n = options[a], o = n.customHotkey, i = n.customHotkeyModifier, (s && "SHIFT" == i || l && "CTRL" == i || l && s) && o && t === (isNaN(o) || 9 >= o ? o.toUpperCase().charCodeAt(0) : o) ? (r = a, 
    !1) : void 0;
   }), r && $Ps[r] && options[r].closable && !state[r].isHidden ? (toggle(r), e.stopPropagation(), 
   e.returnValue = !1, !1) : !0;
  }
  function allowOverflow(e) {
   if (isInitialized()) {
    this && this.tagName && (e = this);
    var t;
    if (isStr(e) ? t = $Ps[e] : $(e).data("layoutRole") ? t = $(e) : $(e).parents().each(function() {
     return $(this).data("layoutRole") ? (t = $(this), !1) : void 0;
    }), t && t.length) {
     var n = t.data("layoutEdge"), o = state[n];
     if (o.cssSaved && resetOverflow(n), o.isSliding || o.isResizing || o.isClosed) return o.cssSaved = !1, 
     void 0;
     var i = {
      zIndex: options.zIndexes.resizer_normal + 1
     }, r = {}, a = t.css("overflow"), s = t.css("overflowX"), l = t.css("overflowY");
     "visible" != a && (r.overflow = a, i.overflow = "visible"), s && !s.match(/(visible|auto)/) && (r.overflowX = s, 
     i.overflowX = "visible"), l && !l.match(/(visible|auto)/) && (r.overflowY = s, i.overflowY = "visible"), 
     o.cssSaved = r, t.css(i), $.each(_c.allPanes, function(e, t) {
      t != n && resetOverflow(t);
     });
    }
   }
  }
  function resetOverflow(e) {
   if (isInitialized()) {
    this && this.tagName && (e = this);
    var t;
    if (isStr(e) ? t = $Ps[e] : $(e).data("layoutRole") ? t = $(e) : $(e).parents().each(function() {
     return $(this).data("layoutRole") ? (t = $(this), !1) : void 0;
    }), t && t.length) {
     var n = t.data("layoutEdge"), o = state[n], i = o.cssSaved || {};
     o.isSliding || o.isResizing || t.css("zIndex", options.zIndexes.pane_normal), t.css(i), 
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
   set: function(e, t, n) {
    timer.clear(e), timer.data[e] = setTimeout(t, n);
   },
   clear: function(e) {
    var t = timer.data;
    t[e] && (clearTimeout(t[e]), delete t[e]);
   }
  }, _log = function(e, t, n) {
   var o = options;
   return (o.showErrorMessages && !n || n && o.showDebugMessages) && $.layout.msg(o.name + " / " + e, t !== !1), 
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
    var t = $Ps[e];
    "IFRAME" === state[e].tagName ? t.css(_c.hidden).css(_c.visible) : t.find("IFRAME").css(_c.hidden).css(_c.visible);
   }
  }, cssSize = function(e, t) {
   var n = "horz" == _c[e].dir ? cssH : cssW;
   return n($Ps[e], t);
  }, cssMinDims = function(e) {
   var t = $Ps[e], n = _c[e].dir, o = {
    minWidth: 1001 - cssW(t, 1e3),
    minHeight: 1001 - cssH(t, 1e3)
   };
   return "horz" === n && (o.minSize = o.minHeight), "vert" === n && (o.minSize = o.minWidth), 
   o;
  }, setOuterWidth = function(e, t, n) {
   var o, i = e;
   isStr(e) ? i = $Ps[e] : e.jquery || (i = $(e)), o = cssW(i, t), i.css({
    width: o
   }), o > 0 ? n && i.data("autoHidden") && i.innerHeight() > 0 && (i.show().data("autoHidden", !1), 
   browser.mozilla || i.css(_c.hidden).css(_c.visible)) : n && !i.data("autoHidden") && i.hide().data("autoHidden", !0);
  }, setOuterHeight = function(e, t, n) {
   var o, i = e;
   isStr(e) ? i = $Ps[e] : e.jquery || (i = $(e)), o = cssH(i, t), i.css({
    height: o,
    visibility: "visible"
   }), o > 0 && i.innerWidth() > 0 ? n && i.data("autoHidden") && (i.show().data("autoHidden", !1), 
   browser.mozilla || i.css(_c.hidden).css(_c.visible)) : n && !i.data("autoHidden") && i.hide().data("autoHidden", !0);
  }, _parseSize = function(e, t, n) {
   if (n || (n = _c[e].dir), isStr(t) && t.match(/%/) && (t = "100%" === t ? -1 : parseInt(t, 10) / 100), 
   0 === t) return 0;
   if (t >= 1) return parseInt(t, 10);
   var o = options, i = 0;
   if ("horz" == n ? i = sC.innerHeight - ($Ps.north ? o.north.spacing_open : 0) - ($Ps.south ? o.south.spacing_open : 0) : "vert" == n && (i = sC.innerWidth - ($Ps.west ? o.west.spacing_open : 0) - ($Ps.east ? o.east.spacing_open : 0)), 
   -1 === t) return i;
   if (t > 0) return round(i * t);
   if ("center" == e) return 0;
   var r = "horz" === n ? "height" : "width", a = $Ps[e], s = "height" === r ? $Cs[e] : !1, l = $.layout.showInvisibly(a), c = a.css(r), u = s ? s.css(r) : 0;
   return a.css(r, "auto"), s && s.css(r, "auto"), t = "height" === r ? a.outerHeight() : a.outerWidth(), 
   a.css(r, c).css(l), s && s.css(r, u), t;
  }, getPaneSize = function(e, t) {
   var n = $Ps[e], o = options[e], i = state[e], r = t ? o.spacing_open : 0, a = t ? o.spacing_closed : 0;
   return !n || i.isHidden ? 0 : i.isClosed || i.isSliding && t ? a : "horz" === _c[e].dir ? n.outerHeight() + r : n.outerWidth() + r;
  }, setSizeLimits = function(e, t) {
   if (isInitialized()) {
    var n = options[e], o = state[e], i = _c[e], r = i.dir, a = (i.sizeType.toLowerCase(), 
    void 0 != t ? t : o.isSliding), s = ($Ps[e], n.spacing_open), l = _c.oppositeEdge[e], c = state[l], u = $Ps[l], d = !u || c.isVisible === !1 || c.isSliding ? 0 : "horz" == r ? u.outerHeight() : u.outerWidth(), p = (!u || c.isHidden ? 0 : options[l][c.isClosed !== !1 ? "spacing_closed" : "spacing_open"]) || 0, f = "horz" == r ? sC.innerHeight : sC.innerWidth, h = cssMinDims("center"), g = "horz" == r ? max(options.center.minHeight, h.minHeight) : max(options.center.minWidth, h.minWidth), m = f - s - (a ? 0 : _parseSize("center", g, r) + d + p), b = o.minSize = max(_parseSize(e, n.minSize), cssMinDims(e).minSize), v = o.maxSize = min(n.maxSize ? _parseSize(e, n.maxSize) : 1e5, m), y = o.resizerPosition = {}, x = sC.inset.top, w = sC.inset.left, k = sC.innerWidth, S = sC.innerHeight, C = n.spacing_open;
    switch (e) {
    case "north":
     y.min = x + b, y.max = x + v;
     break;

    case "west":
     y.min = w + b, y.max = w + v;
     break;

    case "south":
     y.min = x + S - v - C, y.max = x + S - b - C;
     break;

    case "east":
     y.min = w + k - v - C, y.max = w + k - b - C;
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
  }, getHoverClasses = function(e, t) {
   var n = $(e), o = n.data("layoutRole"), i = n.data("layoutEdge"), r = options[i], a = r[o + "Class"], s = "-" + i, l = "-open", c = "-closed", u = "-sliding", d = "-hover ", p = n.hasClass(a + c) ? c : l, f = p === c ? l : c, h = a + d + (a + s + d) + (a + p + d) + (a + s + p + d);
   return t && (h += a + f + d + (a + s + f + d)), "resizer" == o && n.hasClass(a + u) && (h += a + u + d + (a + s + u + d)), 
   $.trim(h);
  }, addHover = function(e, t) {
   var n = $(t || this);
   e && "toggler" === n.data("layoutRole") && e.stopPropagation(), n.addClass(getHoverClasses(n));
  }, removeHover = function(e, t) {
   var n = $(t || this);
   n.removeClass(getHoverClasses(n, !0));
  }, onResizerEnter = function() {
   var e = $(this).data("layoutEdge"), t = state[e];
   t.isClosed || t.isResizing || state.paneResizing || ($.fn.disableSelection && $("body").disableSelection(), 
   options.maskPanesEarly && showMasks(e, {
    resizing: !0
   }));
  }, onResizerLeave = function(e, t) {
   var n = t || this, o = $(n).data("layoutEdge"), i = o + "ResizerLeave";
   timer.clear(o + "_openSlider"), timer.clear(i), t ? state.paneResizing || ($.fn.enableSelection && $("body").enableSelection(), 
   options.maskPanesEarly && hideMasks()) : timer.set(i, function() {
    onResizerLeave(e, n);
   }, 200);
  }, _create = function() {
   initOptions();
   var e = options, t = state;
   return t.creatingLayout = !0, runPluginCallbacks(Instance, $.layout.onCreate), !1 === _runCallbacks("onload_start") ? "cancel" : (_initContainer(), 
   initHotkeys(), $(window).bind("unload." + sID, unload), runPluginCallbacks(Instance, $.layout.onLoad), 
   e.initPanes && _initLayoutElements(), delete t.creatingLayout, state.initialized);
  }, isInitialized = function() {
   return state.initialized || state.creatingLayout ? !0 : _initLayoutElements();
  }, _initLayoutElements = function(e) {
   var t = options;
   if (!$N.is(":visible")) return !e && browser.webkit && "BODY" === $N[0].tagName && setTimeout(function() {
    _initLayoutElements(!0);
   }, 50), !1;
   if (!getPane("center").length) return _log(t.errors.centerPaneMissing);
   if (state.creatingLayout = !0, $.extend(sC, elDims($N, t.inset)), initPanes(), t.scrollToBookmarkOnLoad) {
    var n = self.location;
    n.hash && n.replace(n.hash);
   }
   return Instance.hasParentLayout ? t.resizeWithWindow = !1 : t.resizeWithWindow && $(window).bind("resize." + sID, windowResize), 
   delete state.creatingLayout, state.initialized = !0, runPluginCallbacks(Instance, $.layout.onReady), 
   _runCallbacks("onload_end"), !0;
  }, createChildren = function(e, t) {
   var n = evtPane.call(this, e), o = $Ps[n];
   if (o) {
    var i = $Cs[n], r = state[n], a = options[n], s = options.stateManagement || {}, l = t ? a.children = t : a.children;
    if ($.isPlainObject(l)) l = [ l ]; else if (!l || !$.isArray(l)) return;
    $.each(l, function(e, t) {
     if ($.isPlainObject(t)) {
      var a = t.containerSelector ? o.find(t.containerSelector) : i || o;
      a.each(function() {
       var e = $(this), o = e.data("layout");
       if (!o) {
        if (setInstanceKey({
         container: e,
         options: t
        }, r), s.includeChildren && state.stateData[n]) {
         var i = state.stateData[n].children || {}, a = i[t.instanceKey], l = t.stateManagement || (t.stateManagement = {
          autoLoad: !0
         });
         l.autoLoad === !0 && a && (l.autoSave = !1, l.includeChildren = !0, l.autoLoad = $.extend(!0, {}, a));
        }
        o = e.layout(t), o && refreshChildren(n, o);
       }
      });
     }
    });
   }
  }, setInstanceKey = function(e, t) {
   var n = e.container, o = e.options, i = o.stateManagement, r = o.instanceKey || n.data("layoutInstanceKey");
   return r || (r = (i && i.cookie ? i.cookie.name : "") || o.name), r = r ? r.replace(/[^\w-]/gi, "_").replace(/_{2,}/g, "_") : "layout" + ++t.childIdx, 
   o.instanceKey = r, n.data("layoutInstanceKey", r), r;
  }, refreshChildren = function(e, t) {
   var n, o = $Ps[e], i = children[e], r = state[e];
   $.isPlainObject(i) && ($.each(i, function(e, t) {
    t.destroyed && delete i[e];
   }), $.isEmptyObject(i) && (i = children[e] = null)), t || i || (t = o.data("layout")), 
   t && (t.hasParentLayout = !0, n = t.options, setInstanceKey(t, r), i || (i = children[e] = {}), 
   i[n.instanceKey] = t.container.data("layout")), Instance[e].children = children[e], 
   t || createChildren(e);
  }, windowResize = function() {
   var e = options, t = Number(e.resizeWithWindowDelay);
   10 > t && (t = 100), timer.clear("winResize"), timer.set("winResize", function() {
    timer.clear("winResize"), timer.clear("winResizeRepeater");
    var t = elDims($N, e.inset);
    (t.innerWidth !== sC.innerWidth || t.innerHeight !== sC.innerHeight) && resizeAll();
   }, t), timer.data.winResizeRepeater || setWindowResizeRepeater();
  }, setWindowResizeRepeater = function() {
   var e = Number(options.resizeWithWindowMaxDelay);
   e > 0 && timer.set("winResizeRepeater", function() {
    setWindowResizeRepeater(), resizeAll();
   }, e);
  }, unload = function() {
   _runCallbacks("onunload_start"), runPluginCallbacks(Instance, $.layout.onUnload), 
   _runCallbacks("onunload_end");
  }, _initContainer = function() {
   var e, t, n = $N[0], o = $("html"), i = sC.tagName = n.tagName, r = sC.id = n.id, a = sC.className = n.className, s = options, l = s.name, c = "position,margin,padding,border", u = "layoutCSS", d = {}, p = "hidden", f = $N.data("parentLayout"), h = $N.data("layoutEdge"), g = f && h, m = $.layout.cssNum;
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
   g && (Instance.hasParentLayout = !0, f.refreshChildren(h, Instance)), $N.data(u) || (sC.isBody ? ($N.data(u, $.extend(styles($N, c), {
    height: $N.css("height"),
    overflow: $N.css("overflow"),
    overflowX: $N.css("overflowX"),
    overflowY: $N.css("overflowY")
   })), o.data(u, $.extend(styles(o, "padding"), {
    height: "auto",
    overflow: o.css("overflow"),
    overflowX: o.css("overflowX"),
    overflowY: o.css("overflowY")
   }))) : $N.data(u, styles($N, c + ",top,bottom,left,right,width,height,overflow,overflowX,overflowY")));
   try {
    if (d = {
     overflow: p,
     overflowX: p,
     overflowY: p
    }, $N.css(d), s.inset && !$.isPlainObject(s.inset) && (t = parseInt(s.inset, 10) || 0, 
    s.inset = {
     top: t,
     bottom: t,
     left: t,
     right: t
    }), sC.isBody) s.outset ? $.isPlainObject(s.outset) || (t = parseInt(s.outset, 10) || 0, 
    s.outset = {
     top: t,
     bottom: t,
     left: t,
     right: t
    }) : s.outset = {
     top: m(o, "paddingTop"),
     bottom: m(o, "paddingBottom"),
     left: m(o, "paddingLeft"),
     right: m(o, "paddingRight")
    }, o.css(d).css({
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
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = options[t];
    return n.enableCursorHotkey || n.customHotkey ? ($(document).bind("keydown." + sID, keyDown), 
    !1) : void 0;
   });
  }, initOptions = function() {
   function e(e) {
    var t = options[e], n = options.panes;
    t.fxSettings || (t.fxSettings = {}), n.fxSettings || (n.fxSettings = {}), $.each([ "_open", "_close", "_size" ], function(o, i) {
     var r = "fxName" + i, a = "fxSpeed" + i, s = "fxSettings" + i, l = t[r] = t[r] || n[r] || t.fxName || n.fxName || "none", c = $.effects && ($.effects[l] || $.effects.effect && $.effects.effect[l]);
     "none" !== l && options.effects[l] && c || (l = t[r] = "none");
     var u = options.effects[l] || {}, d = u.all || null, p = u[e] || null;
     t[a] = t[a] || n[a] || t.fxSpeed || n.fxSpeed || null, t[s] = $.extend(!0, {}, d, p, n.fxSettings, t.fxSettings, n[s], t[s]);
    }), delete t.fxName, delete t.fxSpeed, delete t.fxSettings;
   }
   var t, n, o, i, r, a, s;
   if (opts = $.layout.transformData(opts, !0), opts = $.layout.backwardCompatibility.renameAllOptions(opts), 
   !$.isEmptyObject(opts.panes)) {
    for (t = $.layout.optionsMap.noDefault, r = 0, a = t.length; a > r; r++) o = t[r], 
    delete opts.panes[o];
    for (t = $.layout.optionsMap.layout, r = 0, a = t.length; a > r; r++) o = t[r], 
    delete opts.panes[o];
   }
   t = $.layout.optionsMap.layout;
   var l = $.layout.config.optionRootKeys;
   for (o in opts) i = opts[o], $.inArray(o, l) < 0 && $.inArray(o, t) < 0 && (opts.panes[o] || (opts.panes[o] = $.isPlainObject(i) ? $.extend(!0, {}, i) : i), 
   delete opts[o]);
   $.extend(!0, options, opts), $.each(_c.allPanes, function(i, r) {
    if (_c[r] = $.extend(!0, {}, _c.panes, _c[r]), n = options.panes, s = options[r], 
    "center" === r) for (t = $.layout.optionsMap.center, i = 0, a = t.length; a > i; i++) o = t[i], 
    opts.center[o] || !opts.panes[o] && s[o] || (s[o] = n[o]); else s = options[r] = $.extend(!0, {}, n, s), 
    e(r), s.resizerClass || (s.resizerClass = "ui-layout-resizer"), s.togglerClass || (s.togglerClass = "ui-layout-toggler");
    s.paneClass || (s.paneClass = "ui-layout-pane");
   });
   var c = opts.zIndex, u = options.zIndexes;
   c > 0 && (u.pane_normal = c, u.content_mask = max(c + 1, u.content_mask), u.resizer_normal = max(c + 2, u.resizer_normal)), 
   delete options.panes;
  }, getPane = function(e) {
   var t = options[e].paneSelector;
   if ("#" === t.substr(0, 1)) return $N.find(t).eq(0);
   var n = $N.children(t).eq(0);
   return n.length ? n : $N.children("form:first").children(t).eq(0);
  }, initPanes = function(e) {
   evtPane(e), $.each(_c.allPanes, function(e, t) {
    addPane(t, !0);
   }), initHandles(), $.each(_c.borderPanes, function(e, t) {
    $Ps[t] && state[t].isVisible && (setSizeLimits(t), makePaneFit(t));
   }), sizeMidPanes("center"), $.each(_c.allPanes, function(e, t) {
    afterInitPane(t);
   });
  }, addPane = function(e, t) {
   if (t || isInitialized()) {
    var n, o, i, r = options[e], a = state[e], s = _c[e], l = s.dir, c = (a.fx, r.spacing_open || 0, 
    "center" === e), u = {}, d = $Ps[e];
    if (d ? removePane(e, !1, !0, !1) : $Cs[e] = !1, d = $Ps[e] = getPane(e), !d.length) return $Ps[e] = !1, 
    void 0;
    if (!d.data("layoutCSS")) {
     var p = "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border";
     d.data("layoutCSS", styles(d, p));
    }
    Instance[e] = {
     name: e,
     pane: $Ps[e],
     content: $Cs[e],
     options: options[e],
     state: state[e],
     children: children[e]
    }, d.data({
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
    for (f in h) d.bind("layoutpane" + f.toLowerCase() + "." + sID, Instance[h[f] || f]);
    initContent(e, !1), c || (n = a.size = _parseSize(e, r.size), o = _parseSize(e, r.minSize) || 1, 
    i = _parseSize(e, r.maxSize) || 1e5, n > 0 && (n = max(min(n, i), o)), a.autoResize = r.autoResize, 
    a.isClosed = !1, a.isSliding = !1, a.isResizing = !1, a.isHidden = !1, a.pins || (a.pins = [])), 
    a.tagName = d[0].tagName, a.edge = e, a.noRoom = !1, a.isVisible = !0, setPanePosition(e), 
    "horz" === l ? u.height = cssH(d, n) : "vert" === l && (u.width = cssW(d, n)), d.css(u), 
    "horz" != l && sizeMidPanes(e, !0), state.initialized && (initHandles(e), initHotkeys(e)), 
    r.initClosed && r.closable && !r.initHidden ? close(e, !0, !0) : r.initHidden || r.initClosed ? hide(e) : a.noRoom || d.css("display", "block"), 
    d.css("visibility", "visible"), r.showOverflowOnHover && d.hover(allowOverflow, resetOverflow), 
    state.initialized && afterInitPane(e);
   }
  }, afterInitPane = function(e) {
   var t = $Ps[e], n = state[e], o = options[e];
   t && (t.data("layout") && refreshChildren(e, t.data("layout")), n.isVisible && (state.initialized ? resizeAll() : sizeContent(e), 
   o.triggerEventsOnLoad ? _runCallbacks("onresize_end", e) : resizeChildren(e, !0)), 
   o.initChildren && o.children && createChildren(e));
  }, setPanePosition = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = $Ps[t], o = $Rs[t], i = (options[t], state[t]), r = _c[t].side, a = {};
    if (n) {
     switch (t) {
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
     n.css(a), o && i.isClosed ? o.css(r, sC.inset[r]) : o && !i.isHidden && o.css(r, sC.inset[r] + getPaneSize(t));
    }
   });
  }, initHandles = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = $Ps[t];
    if ($Rs[t] = !1, $Ts[t] = !1, n) {
     var o = options[t], i = state[t], r = (_c[t], "#" === o.paneSelector.substr(0, 1) ? o.paneSelector.substr(1) : ""), a = o.resizerClass, s = o.togglerClass, l = (i.isVisible ? o.spacing_open : o.spacing_closed, 
     "-" + t), c = (i.isVisible ? "-open" : "-closed", Instance[t]), u = c.resizer = $Rs[t] = $("<div></div>"), d = c.toggler = o.closable ? $Ts[t] = $("<div></div>") : !1;
     !i.isVisible && o.slidable && u.attr("title", o.tips.Slide).css("cursor", o.sliderCursor), 
     u.attr("id", r ? r + "-resizer" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "resizer"
     }).css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal).css(o.applyDemoStyles ? _c.resizers.cssDemo : {}).addClass(a + " " + a + l).hover(addHover, removeHover).hover(onResizerEnter, onResizerLeave).appendTo($N), 
     o.resizerDblClickToggle && u.bind("dblclick." + sID, toggle), d && (d.attr("id", r ? r + "-toggler" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "toggler"
     }).css(_c.togglers.cssReq).css(o.applyDemoStyles ? _c.togglers.cssDemo : {}).addClass(s + " " + s + l).hover(addHover, removeHover).bind("mouseenter", onResizerEnter).appendTo(u), 
     o.togglerContent_open && $("<span>" + o.togglerContent_open + "</span>").data({
      layoutEdge: t,
      layoutRole: "togglerContent"
     }).data("layoutRole", "togglerContent").data("layoutEdge", t).addClass("content content-open").css("display", "none").appendTo(d), 
     o.togglerContent_closed && $("<span>" + o.togglerContent_closed + "</span>").data({
      layoutEdge: t,
      layoutRole: "togglerContent"
     }).addClass("content content-closed").css("display", "none").appendTo(d), enableClosable(t)), 
     initResizable(t), i.isVisible ? setAsOpen(t) : (setAsClosed(t), bindStartSlidingEvents(t, !0));
    }
   }), sizeHandles();
  }, initContent = function(e, t) {
   if (isInitialized()) {
    var n, o = options[e], i = o.contentSelector, r = Instance[e], a = $Ps[e];
    i && (n = r.content = $Cs[e] = o.findNestedContent ? a.find(i).eq(0) : a.children(i).eq(0)), 
    n && n.length ? (n.data("layoutRole", "content"), n.data("layoutCSS") || n.data("layoutCSS", styles(n, "height")), 
    n.css(_c.content.cssReq), o.applyDemoStyles && (n.css(_c.content.cssDemo), a.css(_c.content.cssDemoPane)), 
    a.css("overflowX").match(/(scroll|auto)/) && a.css("overflow", "hidden"), state[e].content = {}, 
    t !== !1 && sizeContent(e)) : r.content = $Cs[e] = !1;
   }
  }, initResizable = function(e) {
   var t = $.layout.plugins.draggable;
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, o) {
    var i = options[o];
    if (!t || !$Ps[o] || !i.resizable) return i.resizable = !1, !0;
    var r, a, s = state[o], l = options.zIndexes, c = _c[o], u = "horz" == c.dir ? "top" : "left", d = ($Ps[o], 
    $Rs[o]), p = i.resizerClass, f = 0, h = p + "-drag", g = p + "-" + o + "-drag", m = p + "-dragging", b = p + "-" + o + "-dragging", v = p + "-dragging-limit", y = p + "-" + o + "-dragging-limit", x = !1;
    s.isClosed || d.attr("title", i.tips.Resize).css("cursor", i.resizerCursor), d.draggable({
     containment: $N[0],
     axis: "horz" == c.dir ? "y" : "x",
     delay: 0,
     distance: 1,
     grid: i.resizingGrid,
     helper: "clone",
     opacity: i.resizerDragOpacity,
     addClasses: !1,
     zIndex: l.resizer_drag,
     start: function(e, t) {
      return i = options[o], s = state[o], a = i.livePaneResizing, !1 === _runCallbacks("ondrag_start", o) ? !1 : (s.isResizing = !0, 
      state.paneResizing = o, timer.clear(o + "_closeSlider"), setSizeLimits(o), r = s.resizerPosition, 
      f = t.position[u], d.addClass(h + " " + g), x = !1, $("body").disableSelection(), 
      showMasks(o, {
       resizing: !0
      }), void 0);
     },
     drag: function(e, t) {
      x || (t.helper.addClass(m + " " + b).css({
       right: "auto",
       bottom: "auto"
      }).children().css("visibility", "hidden"), x = !0, s.isSliding && $Ps[o].css("zIndex", l.pane_sliding));
      var c = 0;
      t.position[u] < r.min ? (t.position[u] = r.min, c = -1) : t.position[u] > r.max && (t.position[u] = r.max, 
      c = 1), c ? (t.helper.addClass(v + " " + y), window.defaultStatus = c > 0 && o.match(/(north|west)/) || 0 > c && o.match(/(south|east)/) ? i.tips.maxSizeWarning : i.tips.minSizeWarning) : (t.helper.removeClass(v + " " + y), 
      window.defaultStatus = ""), a && Math.abs(t.position[u] - f) >= i.liveResizingTolerance && (f = t.position[u], 
      n(e, t, o));
     },
     stop: function(e, t) {
      $("body").enableSelection(), window.defaultStatus = "", d.removeClass(h + " " + g), 
      s.isResizing = !1, state.paneResizing = !1, n(e, t, o, !0);
     }
    });
   });
   var n = function(e, t, n, o) {
    var i, r = t.position, a = _c[n], s = options[n], l = state[n];
    switch (n) {
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
    if (o) !1 !== _runCallbacks("ondrag_end", n) && manualSizePane(n, c, !1, !0), hideMasks(!0), 
    l.isSliding && showMasks(n, {
     resizing: !0
    }); else {
     if (Math.abs(c - l.size) < s.liveResizingTolerance) return;
     manualSizePane(n, c, !1, !0), sizeMasks();
    }
   };
  }, sizeMask = function() {
   var e = $(this), t = e.data("layoutMask"), n = state[t];
   "IFRAME" == n.tagName && n.isVisible && e.css({
    top: n.offsetTop,
    left: n.offsetLeft,
    width: n.outerWidth,
    height: n.outerHeight
   });
  }, sizeMasks = function() {
   $Ms.each(sizeMask);
  }, showMasks = function(e, t) {
   var n, o, i = _c[e], r = [ "center" ], a = options.zIndexes, s = $.extend({
    objectsOnly: !1,
    animation: !1,
    resizing: !0,
    sliding: state[e].isSliding
   }, t);
   s.resizing && r.push(e), s.sliding && r.push(_c.oppositeEdge[e]), "horz" === i.dir && (r.push("west"), 
   r.push("east")), $.each(r, function(e, t) {
    o = state[t], n = options[t], o.isVisible && (n.maskObjects || !s.objectsOnly && n.maskContents) && getMasks(t).each(function() {
     sizeMask.call(this), this.style.zIndex = o.isSliding ? a.pane_sliding + 1 : a.pane_normal + 1, 
     this.style.display = "block";
    });
   });
  }, hideMasks = function(e) {
   if (e || !state.paneResizing) $Ms.hide(); else if (!e && !$.isEmptyObject(state.panesSliding)) for (var t, n, o = $Ms.length - 1; o >= 0; o--) n = $Ms.eq(o), 
   t = n.data("layoutMask"), options[t].maskObjects || n.hide();
  }, getMasks = function(e) {
   for (var t, n = $([]), o = 0, i = $Ms.length; i > o; o++) t = $Ms.eq(o), t.data("layoutMask") === e && (n = n.add(t));
   return n.length ? n : createMasks(e);
  }, createMasks = function(e) {
   var t, n, o, i, r, a = $Ps[e], s = state[e], l = options[e], c = options.zIndexes, u = $([]);
   if (!l.maskContents && !l.maskObjects) return u;
   for (r = 0; r < (l.maskObjects ? 2 : 1); r++) t = l.maskObjects && 0 == r, n = document.createElement(t ? "iframe" : "div"), 
   o = $(n).data("layoutMask", e), n.className = "ui-layout-mask ui-layout-mask-" + e, 
   i = n.style, i.display = "block", i.position = "absolute", i.background = "#FFF", 
   t && (n.frameborder = 0, n.src = "about:blank", i.opacity = 0, i.filter = "Alpha(Opacity='0')", 
   i.border = 0), "IFRAME" == s.tagName ? (i.zIndex = c.pane_normal + 1, $N.append(n)) : (o.addClass("ui-layout-mask-inside-pane"), 
   i.zIndex = l.maskZindex || c.content_mask, i.top = 0, i.left = 0, i.width = "100%", 
   i.height = "100%", a.append(n)), u = u.add(n), $Ms = $Ms.add(n);
   return u;
  }, destroy = function(e, t) {
   $(window).unbind("." + sID), $(document).unbind("." + sID), "object" == typeof e ? evtPane(e) : t = e, 
   $N.clearQueue().removeData("layout").removeData("layoutContainer").removeClass(options.containerClass).unbind("." + sID), 
   $Ms.remove(), $.each(_c.allPanes, function(e, n) {
    removePane(n, !1, !0, t);
   });
   var n = "layoutCSS";
   $N.data(n) && !$N.data("layoutRole") && $N.css($N.data(n)).removeData(n), "BODY" === sC.tagName && ($N = $("html")).data(n) && $N.css($N.data(n)).removeData(n), 
   runPluginCallbacks(Instance, $.layout.onDestroy), unload();
   for (var o in Instance) o.match(/^(container|options)$/) || delete Instance[o];
   return Instance.destroyed = !0, Instance;
  }, removePane = function(e, t, n, o) {
   if (isInitialized()) {
    var i = evtPane.call(this, e), r = $Ps[i], a = $Cs[i], s = $Rs[i], l = $Ts[i];
    r && $.isEmptyObject(r.data()) && (r = !1), a && $.isEmptyObject(a.data()) && (a = !1), 
    s && $.isEmptyObject(s.data()) && (s = !1), l && $.isEmptyObject(l.data()) && (l = !1), 
    r && r.stop(!0, !0);
    var c = options[i], u = state[i], d = "layout", p = "layoutCSS", f = children[i], h = $.isPlainObject(f) && !$.isEmptyObject(f), g = void 0 !== o ? o : c.destroyChildren;
    if (h && g && ($.each(f, function(e, t) {
     t.destroyed || t.destroy(!0), t.destroyed && delete f[e];
    }), $.isEmptyObject(f) && (f = children[i] = null, h = !1)), r && t && !h) r.remove(); else if (r && r[0]) {
     var m = c.paneClass, b = m + "-" + i, v = "-open", y = "-sliding", x = "-closed", w = [ m, m + v, m + x, m + y, b, b + v, b + x, b + y ];
     $.merge(w, getHoverClasses(r, !0)), r.removeClass(w.join(" ")).removeData("parentLayout").removeData("layoutPane").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." + sID), 
     h && a ? (a.width(a.width()), $.each(f, function(e, t) {
      t.resizeAll();
     })) : a && a.css(a.data(p)).removeData(p).removeData("layoutRole"), r.data(d) || r.css(r.data(p)).removeData(p);
    }
    l && l.remove(), s && s.remove(), Instance[i] = $Ps[i] = $Cs[i] = $Rs[i] = $Ts[i] = !1, 
    u = {
     removed: !0
    }, n || resizeAll();
   }
  }, _hidePane = function(e) {
   var t = $Ps[e], n = options[e], o = t[0].style;
   n.useOffscreenClose ? (t.data(_c.offscreenReset) || t.data(_c.offscreenReset, {
    left: o.left,
    right: o.right
   }), t.css(_c.offscreenCSS)) : t.hide().removeData(_c.offscreenReset);
  }, _showPane = function(e) {
   var t = $Ps[e], n = options[e], o = _c.offscreenCSS, i = t.data(_c.offscreenReset), r = t[0].style;
   t.show().removeData(_c.offscreenReset), n.useOffscreenClose && i && (r.left == o.left && (r.left = i.left), 
   r.right == o.right && (r.right = i.right));
  }, hide = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), o = options[n], i = state[n], r = $Ps[n], a = $Rs[n];
    r && !i.isHidden && (state.initialized && !1 === _runCallbacks("onhide_start", n) || (i.isSliding = !1, 
    delete state.panesSliding[n], a && a.hide(), !state.initialized || i.isClosed ? (i.isClosed = !0, 
    i.isHidden = !0, i.isVisible = !1, state.initialized || _hidePane(n), sizeMidPanes("horz" === _c[n].dir ? "" : "center"), 
    (state.initialized || o.triggerEventsOnLoad) && _runCallbacks("onhide_end", n)) : (i.isHiding = !0, 
    close(n, !1, t))));
   }
  }, show = function(e, t, n, o) {
   if (isInitialized()) {
    var i = evtPane.call(this, e), r = (options[i], state[i]), a = $Ps[i];
    $Rs[i], a && r.isHidden && !1 !== _runCallbacks("onshow_start", i) && (r.isShowing = !0, 
    r.isSliding = !1, delete state.panesSliding[i], t === !1 ? close(i, !0) : open(i, !1, n, o));
   }
  }, toggle = function(e, t) {
   if (isInitialized()) {
    var n = evtObj(e), o = evtPane.call(this, e), i = state[o];
    n && n.stopImmediatePropagation(), i.isHidden ? show(o) : i.isClosed ? open(o, !!t) : close(o);
   }
  }, _closePane = function(e, t) {
   var n = ($Ps[e], state[e]);
   _hidePane(e), n.isClosed = !0, n.isVisible = !1, t && setAsClosed(e);
  }, close = function(e, t, n, o) {
   function i() {
    p.isMoving = !1, bindStartSlidingEvents(r, !0);
    var e = _c.oppositeEdge[r];
    state[e].noRoom && (setSizeLimits(e), makePaneFit(e)), o || !state.initialized && !d.triggerEventsOnLoad || (s || _runCallbacks("onclose_end", r), 
    s && _runCallbacks("onshow_end", r), l && _runCallbacks("onhide_end", r));
   }
   var r = evtPane.call(this, e);
   if (!state.initialized && $Ps[r]) return _closePane(r, !0), void 0;
   if (isInitialized()) {
    var a, s, l, c, u = $Ps[r], d = ($Rs[r], $Ts[r], options[r]), p = state[r];
    _c[r], $N.queue(function(e) {
     if (!u || !d.closable && !p.isShowing && !p.isHiding || !t && p.isClosed && !p.isShowing) return e();
     var o = !p.isShowing && !1 === _runCallbacks("onclose_start", r);
     return s = p.isShowing, l = p.isHiding, c = p.isSliding, delete p.isShowing, delete p.isHiding, 
     o ? e() : (a = !n && !p.isClosed && "none" != d.fxName_close, p.isMoving = !0, p.isClosed = !0, 
     p.isVisible = !1, l ? p.isHidden = !0 : s && (p.isHidden = !1), p.isSliding ? bindStopSlidingEvents(r, !1) : sizeMidPanes("horz" === _c[r].dir ? "" : "center", !1), 
     setAsClosed(r), a ? (lockPaneForFX(r, !0), u.hide(d.fxName_close, d.fxSettings_close, d.fxSpeed_close, function() {
      lockPaneForFX(r, !1), p.isClosed && i(), e();
     })) : (_hidePane(r), i(), e()), void 0);
    });
   }
  }, setAsClosed = function(e) {
   if ($Rs[e]) {
    var t = ($Ps[e], $Rs[e]), n = $Ts[e], o = options[e], i = (state[e], _c[e].side), r = o.resizerClass, a = o.togglerClass, s = "-" + e, l = "-open", c = "-sliding", u = "-closed";
    t.css(i, sC.inset[i]).removeClass(r + l + " " + r + s + l).removeClass(r + c + " " + r + s + c).addClass(r + u + " " + r + s + u), 
    o.resizable && $.layout.plugins.draggable && t.draggable("disable").removeClass("ui-state-disabled").css("cursor", "default").attr("title", ""), 
    n && (n.removeClass(a + l + " " + a + s + l).addClass(a + u + " " + a + s + u).attr("title", o.tips.Open), 
    n.children(".content-open").hide(), n.children(".content-closed").css("display", "block")), 
    syncPinBtns(e, !1), state.initialized && sizeHandles();
   }
  }, open = function(e, t, n, o) {
   function i() {
    u.isMoving = !1, _fixIframe(s), u.isSliding || sizeMidPanes("vert" == _c[s].dir ? "center" : "", !1), 
    setAsOpen(s);
   }
   if (isInitialized()) {
    var r, a, s = evtPane.call(this, e), l = $Ps[s], c = ($Rs[s], $Ts[s], options[s]), u = state[s];
    _c[s], $N.queue(function(e) {
     if (!l || !c.resizable && !c.closable && !u.isShowing || u.isVisible && !u.isSliding) return e();
     if (u.isHidden && !u.isShowing) return e(), show(s, !0), void 0;
     u.autoResize && u.size != c.size ? sizePane(s, c.size, !0, !0, !0) : setSizeLimits(s, t);
     var d = _runCallbacks("onopen_start", s);
     return "abort" === d ? e() : ("NC" !== d && setSizeLimits(s, t), u.minSize > u.maxSize ? (syncPinBtns(s, !1), 
     !o && c.tips.noRoomToOpen && alert(c.tips.noRoomToOpen), e()) : (t ? bindStopSlidingEvents(s, !0) : u.isSliding ? bindStopSlidingEvents(s, !1) : c.slidable && bindStartSlidingEvents(s, !1), 
     u.noRoom = !1, makePaneFit(s), a = u.isShowing, delete u.isShowing, r = !n && u.isClosed && "none" != c.fxName_open, 
     u.isMoving = !0, u.isVisible = !0, u.isClosed = !1, a && (u.isHidden = !1), r ? (lockPaneForFX(s, !0), 
     l.show(c.fxName_open, c.fxSettings_open, c.fxSpeed_open, function() {
      lockPaneForFX(s, !1), u.isVisible && i(), e();
     })) : (_showPane(s), i(), e()), void 0));
    });
   }
  }, setAsOpen = function(e, t) {
   var n = $Ps[e], o = $Rs[e], i = $Ts[e], r = options[e], a = state[e], s = _c[e].side, l = r.resizerClass, c = r.togglerClass, u = "-" + e, d = "-open", p = "-closed", f = "-sliding";
   o.css(s, sC.inset[s] + getPaneSize(e)).removeClass(l + p + " " + l + u + p).addClass(l + d + " " + l + u + d), 
   a.isSliding ? o.addClass(l + f + " " + l + u + f) : o.removeClass(l + f + " " + l + u + f), 
   removeHover(0, o), r.resizable && $.layout.plugins.draggable ? o.draggable("enable").css("cursor", r.resizerCursor).attr("title", r.tips.Resize) : a.isSliding || o.css("cursor", "default"), 
   i && (i.removeClass(c + p + " " + c + u + p).addClass(c + d + " " + c + u + d).attr("title", r.tips.Close), 
   removeHover(0, i), i.children(".content-closed").hide(), i.children(".content-open").css("display", "block")), 
   syncPinBtns(e, !a.isSliding), $.extend(a, elDims(n)), state.initialized && (sizeHandles(), 
   sizeContent(e, !0)), !t && (state.initialized || r.triggerEventsOnLoad) && n.is(":visible") && (_runCallbacks("onopen_end", e), 
   a.isShowing && _runCallbacks("onshow_end", e), state.initialized && _runCallbacks("onresize_end", e));
  }, slideOpen = function(e) {
   function t() {
    i.isClosed ? i.isMoving || open(o, !0) : bindStopSlidingEvents(o, !0);
   }
   if (isInitialized()) {
    var n = evtObj(e), o = evtPane.call(this, e), i = state[o], r = options[o].slideDelay_open;
    n && n.stopImmediatePropagation(), i.isClosed && n && "mouseenter" === n.type && r > 0 ? timer.set(o + "_openSlider", t, r) : t();
   }
  }, slideClose = function(e) {
   function t() {
    r.isClosed ? bindStopSlidingEvents(o, !1) : r.isMoving || close(o);
   }
   if (isInitialized()) {
    var n = evtObj(e), o = evtPane.call(this, e), i = options[o], r = state[o], a = r.isMoving ? 1e3 : 300;
    if (!r.isClosed && !r.isResizing) if ("click" === i.slideTrigger_close) t(); else {
     if (i.preventQuickSlideClose && r.isMoving) return;
     if (i.preventPrematureSlideClose && n && $.layout.isMouseOverElem(n, $Ps[o])) return;
     n ? timer.set(o + "_closeSlider", t, max(i.slideDelay_close, a)) : t();
    }
   }
  }, slideToggle = function(e) {
   var t = evtPane.call(this, e);
   toggle(t, !0);
  }, lockPaneForFX = function(e, t) {
   var n = $Ps[e], o = state[e], i = options[e], r = options.zIndexes;
   t ? (showMasks(e, {
    animation: !0,
    objectsOnly: !0
   }), n.css({
    zIndex: r.pane_animate
   }), "south" == e ? n.css({
    top: sC.inset.top + sC.innerHeight - n.outerHeight()
   }) : "east" == e && n.css({
    left: sC.inset.left + sC.innerWidth - n.outerWidth()
   })) : (hideMasks(), n.css({
    zIndex: o.isSliding ? r.pane_sliding : r.pane_normal
   }), "south" == e ? n.css({
    top: "auto"
   }) : "east" != e || n.css("left").match(/\-99999/) || n.css({
    left: "auto"
   }), browser.msie && i.fxOpacityFix && "slide" != i.fxName_open && n.css("filter") && 1 == n.css("opacity") && n[0].style.removeAttribute("filter"));
  }, bindStartSlidingEvents = function(e, t) {
   var n = options[e], o = ($Ps[e], $Rs[e]), i = n.slideTrigger_open.toLowerCase();
   !o || t && !n.slidable || (i.match(/mouseover/) ? i = n.slideTrigger_open = "mouseenter" : i.match(/(click|dblclick|mouseenter)/) || (i = n.slideTrigger_open = "click"), 
   n.resizerDblClickToggle && i.match(/click/) && o[t ? "unbind" : "bind"]("dblclick." + sID, toggle), 
   o[t ? "bind" : "unbind"](i + "." + sID, slideOpen).css("cursor", t ? n.sliderCursor : "default").attr("title", t ? n.tips.Slide : ""));
  }, bindStopSlidingEvents = function(e, t) {
   function n(t) {
    timer.clear(e + "_closeSlider"), t.stopPropagation();
   }
   var o = options[e], i = state[e], r = (_c[e], options.zIndexes), a = o.slideTrigger_close.toLowerCase(), s = t ? "bind" : "unbind", l = $Ps[e], c = $Rs[e];
   timer.clear(e + "_closeSlider"), t ? (i.isSliding = !0, state.panesSliding[e] = !0, 
   bindStartSlidingEvents(e, !1)) : (i.isSliding = !1, delete state.panesSliding[e]), 
   l.css("zIndex", t ? r.pane_sliding : r.pane_normal), c.css("zIndex", t ? r.pane_sliding + 2 : r.resizer_normal), 
   a.match(/(click|mouseleave)/) || (a = o.slideTrigger_close = "mouseleave"), c[s](a, slideClose), 
   "mouseleave" === a && (l[s]("mouseleave." + sID, slideClose), c[s]("mouseenter." + sID, n), 
   l[s]("mouseenter." + sID, n)), t ? "click" !== a || o.resizable || (c.css("cursor", t ? o.sliderCursor : "default"), 
   c.attr("title", t ? o.tips.Close : "")) : timer.clear(e + "_closeSlider");
  }, makePaneFit = function(e, t, n, o) {
   var i = options[e], r = state[e], a = _c[e], s = $Ps[e], l = $Rs[e], c = "vert" === a.dir, u = !1;
   if (("center" === e || c && r.noVerticalRoom) && (u = r.maxHeight >= 0, u && r.noRoom ? (_showPane(e), 
   l && l.show(), r.isVisible = !0, r.noRoom = !1, c && (r.noVerticalRoom = !1), _fixIframe(e)) : u || r.noRoom || (_hidePane(e), 
   l && l.hide(), r.isVisible = !1, r.noRoom = !0)), "center" === e) ; else if (r.minSize <= r.maxSize) {
    if (u = !0, r.size > r.maxSize) sizePane(e, r.maxSize, n, !0, o); else if (r.size < r.minSize) sizePane(e, r.minSize, n, !0, o); else if (l && r.isVisible && s.is(":visible")) {
     var d = r.size + sC.inset[a.side];
     $.layout.cssNum(l, a.side) != d && l.css(a.side, d);
    }
    r.noRoom && (r.wasOpen && i.closable ? i.autoReopen ? open(e, !1, !0, !0) : r.noRoom = !1 : show(e, r.wasOpen, !0, !0));
   } else r.noRoom || (r.noRoom = !0, r.wasOpen = !r.isClosed && !r.isSliding, r.isClosed || (i.closable ? close(e, !0, !0) : hide(e, !0)));
  }, manualSizePane = function(e, t, n, o, i) {
   if (isInitialized()) {
    var r = evtPane.call(this, e), a = options[r], s = state[r], l = i || a.livePaneResizing && !s.isResizing;
    s.autoResize = !1, sizePane(r, t, n, o, l);
   }
  }, sizePane = function(e, t, n, o, i) {
   function r() {
    for (var e = "width" === h ? d.outerWidth() : d.outerHeight(), o = [ {
     pane: l,
     count: 1,
     target: t,
     actual: e,
     correct: t === e,
     attempt: t,
     cssSize: s
    } ], r = o[0], c = {}, m = "Inaccurate size after resizing the " + l + "-pane."; !(r.correct || (c = {
     pane: l,
     count: r.count + 1,
     target: t
    }, c.attempt = r.actual > t ? max(0, r.attempt - (r.actual - t)) : max(0, r.attempt + (t - r.actual)), 
    c.cssSize = cssSize(l, c.attempt), d.css(h, c.cssSize), c.actual = "width" == h ? d.outerWidth() : d.outerHeight(), 
    c.correct = t === c.actual, 1 === o.length && (_log(m, !1, !0), _log(r, !1, !0)), 
    _log(c, !1, !0), o.length > 3)); ) o.push(c), r = o[o.length - 1];
    u.size = t, $.extend(u, elDims(d)), u.isVisible && d.is(":visible") && (p && p.css(f, t + sC.inset[f]), 
    sizeContent(l)), !n && !g && state.initialized && u.isVisible && _runCallbacks("onresize_end", l), 
    n || (u.isSliding || sizeMidPanes("horz" == _c[l].dir ? "" : "center", g, i), sizeHandles());
    var b = _c.oppositeEdge[l];
    a > t && state[b].noRoom && (setSizeLimits(b), makePaneFit(b, !1, n)), o.length > 1 && _log(m + "\nSee the Error Console for details.", !0, !0);
   }
   if (isInitialized()) {
    var a, s, l = evtPane.call(this, e), c = options[l], u = state[l], d = $Ps[l], p = $Rs[l], f = _c[l].side, h = _c[l].sizeType.toLowerCase(), g = u.isResizing && !c.triggerEventsDuringLiveResize, m = o !== !0 && c.animatePaneSizing;
    $N.queue(function(e) {
     if (setSizeLimits(l), a = u.size, t = _parseSize(l, t), t = max(t, _parseSize(l, c.minSize)), 
     t = min(t, u.maxSize), t < u.minSize) return e(), makePaneFit(l, !1, n), void 0;
     if (!i && t === a) return e();
     if (u.newSize = t, !n && state.initialized && u.isVisible && _runCallbacks("onresize_start", l), 
     s = cssSize(l, t), m && d.is(":visible")) {
      var o = $.layout.effects.size[l] || $.layout.effects.size.all, p = c.fxSettings_size.easing || o.easing, f = options.zIndexes, g = {};
      g[h] = s + "px", u.isMoving = !0, d.css({
       zIndex: f.pane_animate
      }).show().animate(g, c.fxSpeed_size, p, function() {
       d.css({
        zIndex: u.isSliding ? f.pane_sliding : f.pane_normal
       }), u.isMoving = !1, delete u.newSize, r(), e();
      });
     } else d.css(h, s), delete u.newSize, d.is(":visible") ? r() : (u.size = t, $.extend(u, elDims(d))), 
     e();
    });
   }
  }, sizeMidPanes = function(e, t, n) {
   e = (e ? e : "east,west,center").split(","), $.each(e, function(e, o) {
    if ($Ps[o]) {
     var i = options[o], r = state[o], a = $Ps[o], s = ($Rs[o], !0), l = {}, c = $.layout.showInvisibly(a), u = calcNewCenterPaneDims();
     if ($.extend(r, elDims(a)), "center" === o) {
      if (!n && r.isVisible && u.width === r.outerWidth && u.height === r.outerHeight) return a.css(c), 
      !0;
      if ($.extend(r, cssMinDims(o), {
       maxWidth: u.width,
       maxHeight: u.height
      }), l = u, r.newWidth = l.width, r.newHeight = l.height, l.width = cssW(a, l.width), 
      l.height = cssH(a, l.height), s = l.width >= 0 && l.height >= 0, !state.initialized && i.minWidth > u.width) {
       var d = i.minWidth - r.outerWidth, p = options.east.minSize || 0, f = options.west.minSize || 0, h = state.east.size, g = state.west.size, m = h, b = g;
       if (d > 0 && state.east.isVisible && h > p && (m = max(h - p, h - d), d -= h - m), 
       d > 0 && state.west.isVisible && g > f && (b = max(g - f, g - d), d -= g - b), 0 === d) return h && h != p && sizePane("east", m, !0, !0, n), 
       g && g != f && sizePane("west", b, !0, !0, n), sizeMidPanes("center", t, n), a.css(c), 
       void 0;
      }
     } else {
      if (r.isVisible && !r.noVerticalRoom && $.extend(r, elDims(a), cssMinDims(o)), !n && !r.noVerticalRoom && u.height === r.outerHeight) return a.css(c), 
      !0;
      l.top = u.top, l.bottom = u.bottom, r.newSize = u.height, l.height = cssH(a, u.height), 
      r.maxHeight = l.height, s = r.maxHeight >= 0, s || (r.noVerticalRoom = !0);
     }
     if (s ? (!t && state.initialized && _runCallbacks("onresize_start", o), a.css(l), 
     "center" !== o && sizeHandles(o), !r.noRoom || r.isClosed || r.isHidden || makePaneFit(o), 
     r.isVisible && ($.extend(r, elDims(a)), state.initialized && sizeContent(o))) : !r.noRoom && r.isVisible && makePaneFit(o), 
     a.css(c), delete r.newSize, delete r.newWidth, delete r.newHeight, !r.isVisible) return !0;
     if ("center" === o) {
      var v = browser.isIE6 || !browser.boxModel;
      $Ps.north && (v || "IFRAME" == state.north.tagName) && $Ps.north.css("width", cssW($Ps.north, sC.innerWidth)), 
      $Ps.south && (v || "IFRAME" == state.south.tagName) && $Ps.south.css("width", cssW($Ps.south, sC.innerWidth));
     }
     !t && state.initialized && _runCallbacks("onresize_end", o);
    }
   });
  }, resizeAll = function(e) {
   var t = sC.innerWidth, n = sC.innerHeight;
   if (evtPane(e), $N.is(":visible")) {
    if (!state.initialized) return _initLayoutElements(), void 0;
    if (e === !0 && $.isPlainObject(options.outset) && $N.css(options.outset), $.extend(sC, elDims($N, options.inset)), 
    sC.outerHeight) {
     if (e === !0 && setPanePosition(), !1 === _runCallbacks("onresizeall_start")) return !1;
     var o, i, r;
     sC.innerHeight < n, sC.innerWidth < t, $.each([ "south", "north", "east", "west" ], function(e, t) {
      $Ps[t] && (i = options[t], r = state[t], r.autoResize && r.size != i.size ? sizePane(t, i.size, !0, !0, !0) : (setSizeLimits(t), 
      makePaneFit(t, !1, !0, !0)));
     }), sizeMidPanes("", !0, !0), sizeHandles(), $.each(_c.allPanes, function(e, t) {
      o = $Ps[t], o && state[t].isVisible && _runCallbacks("onresize_end", t);
     }), _runCallbacks("onresizeall_end");
    }
   }
  }, resizeChildren = function(e, t) {
   var n = evtPane.call(this, e);
   if (options[n].resizeChildren) {
    t || refreshChildren(n);
    var o = children[n];
    $.isPlainObject(o) && $.each(o, function(e, t) {
     t.destroyed || t.resizeAll();
    });
   }
  }, sizeContent = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e);
    n = n ? n.split(",") : _c.allPanes, $.each(n, function(e, n) {
     function o(e) {
      return max(l.css.paddingBottom, parseInt(e.css("marginBottom"), 10) || 0);
     }
     function i() {
      var e = options[n].contentIgnoreSelector, t = a.nextAll().not(".ui-layout-mask").not(e || ":lt(0)"), i = t.filter(":visible"), r = i.filter(":last");
      c = {
       top: a[0].offsetTop,
       height: a.outerHeight(),
       numFooters: t.length,
       hiddenFooters: t.length - i.length,
       spaceBelow: 0
      }, c.spaceAbove = c.top, c.bottom = c.top + c.height, c.spaceBelow = r.length ? r[0].offsetTop + r.outerHeight() - c.bottom + o(r) : o(a);
     }
     var r = $Ps[n], a = $Cs[n], s = options[n], l = state[n], c = l.content;
     if (!r || !a || !r.is(":visible")) return !0;
     if ((a.length || (initContent(n, !1), a)) && !1 !== _runCallbacks("onsizecontent_start", n)) {
      (!l.isMoving && !l.isResizing || s.liveContentResizing || t || void 0 == c.top) && (i(), 
      c.hiddenFooters > 0 && "hidden" === r.css("overflow") && (r.css("overflow", "visible"), 
      i(), r.css("overflow", "hidden")));
      var u = l.innerHeight - (c.spaceAbove - l.css.paddingTop) - (c.spaceBelow - l.css.paddingBottom);
      a.is(":visible") && c.height == u || (setOuterHeight(a, u, !0), c.height = u), state.initialized && _runCallbacks("onsizecontent_end", n);
     }
    });
   }
  }, sizeHandles = function(e) {
   var t = evtPane.call(this, e);
   t = t ? t.split(",") : _c.borderPanes, $.each(t, function(e, t) {
    var n, o = options[t], i = state[t], r = $Ps[t], a = $Rs[t], s = $Ts[t];
    if (r && a) {
     var l, c, u, d = _c[t].dir, p = i.isClosed ? "_closed" : "_open", f = o["spacing" + p], h = o["togglerAlign" + p], g = o["togglerLength" + p];
     if (0 === f) return a.hide(), void 0;
     if (i.noRoom || i.isHidden || a.show(), "horz" === d ? (l = sC.innerWidth, i.resizerLength = l, 
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
      if (s.show(), !(g > 0) || "100%" === g || g > l) g = l, u = 0; else if (isStr(h)) switch (h) {
      case "top":
      case "left":
       u = 0;
       break;

      case "bottom":
      case "right":
       u = l - g;
       break;

      case "middle":
      case "center":
      default:
       u = round((l - g) / 2);
      } else {
       var m = parseInt(h, 10);
       u = h >= 0 ? m : l - g + m;
      }
      if ("horz" === d) {
       var b = cssW(s, g);
       s.css({
        width: b,
        height: cssH(s, f),
        left: u,
        top: 0
       }), s.children(".content").each(function() {
        n = $(this), n.css("marginLeft", round((b - n.outerWidth()) / 2));
       });
      } else {
       var v = cssH(s, g);
       s.css({
        height: v,
        width: cssW(s, f),
        top: u,
        left: 0
       }), s.children(".content").each(function() {
        n = $(this), n.css("marginTop", round((v - n.outerHeight()) / 2));
       });
      }
      removeHover(0, s);
     }
     state.initialized || !o.initHidden && !i.isHidden || (a.hide(), s && s.hide());
    }
   });
  }, enableClosable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Ts[t], o = options[t];
    n && (o.closable = !0, n.bind("click." + sID, function(e) {
     e.stopPropagation(), toggle(t);
    }).css("visibility", "visible").css("cursor", "pointer").attr("title", state[t].isClosed ? o.tips.Open : o.tips.Close).show());
   }
  }, disableClosable = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), o = $Ts[n];
    o && (options[n].closable = !1, state[n].isClosed && open(n, !1, !0), o.unbind("." + sID).css("visibility", t ? "hidden" : "visible").css("cursor", "default").attr("title", ""));
   }
  }, enableSlidable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Rs[t];
    n && n.data("draggable") && (options[t].slidable = !0, state[t].isClosed && bindStartSlidingEvents(t, !0));
   }
  }, disableSlidable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Rs[t];
    n && (options[t].slidable = !1, state[t].isSliding ? close(t, !1, !0) : (bindStartSlidingEvents(t, !1), 
    n.css("cursor", "default").attr("title", ""), removeHover(null, n[0])));
   }
  }, enableResizable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Rs[t], o = options[t];
    n && n.data("draggable") && (o.resizable = !0, n.draggable("enable"), state[t].isClosed || n.css("cursor", o.resizerCursor).attr("title", o.tips.Resize));
   }
  }, disableResizable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Rs[t];
    n && n.data("draggable") && (options[t].resizable = !1, n.draggable("disable").css("cursor", "default").attr("title", ""), 
    removeHover(null, n[0]));
   }
  }, swapPanes = function(e, t) {
   function n(e) {
    var t = $Ps[e], n = $Cs[e];
    return t ? {
     pane: e,
     P: t ? t[0] : !1,
     C: n ? n[0] : !1,
     state: $.extend(!0, {}, state[e]),
     options: $.extend(!0, {}, options[e])
    } : !1;
   }
   function o(e, t) {
    if (e) {
     var n, o, i = e.P, r = e.C, a = e.pane, l = _c[t], c = $.extend(!0, {}, state[t]), u = options[t], d = {
      resizerCursor: u.resizerCursor
     };
     $.each("fxName,fxSpeed,fxSettings".split(","), function(e, t) {
      d[t + "_open"] = u[t + "_open"], d[t + "_close"] = u[t + "_close"], d[t + "_size"] = u[t + "_size"];
     }), $Ps[t] = $(i).data({
      layoutPane: Instance[t],
      layoutEdge: t
     }).css(_c.hidden).css(l.cssReq), $Cs[t] = r ? $(r) : !1, options[t] = $.extend(!0, {}, e.options, d), 
     state[t] = $.extend(!0, {}, e.state), n = new RegExp(u.paneClass + "-" + a, "g"), 
     i.className = i.className.replace(n, u.paneClass + "-" + t), initHandles(t), l.dir != _c[a].dir ? (o = s[t] || 0, 
     setSizeLimits(t), o = max(o, state[t].minSize), manualSizePane(t, o, !0, !0)) : $Rs[t].css(l.side, sC.inset[l.side] + (state[t].isVisible ? getPaneSize(t) : 0)), 
     e.state.isVisible && !c.isVisible ? setAsOpen(t, !0) : (setAsClosed(t), bindStartSlidingEvents(t, !0)), 
     e = null;
    }
   }
   if (isInitialized()) {
    var i = evtPane.call(this, e);
    if (state[i].edge = t, state[t].edge = i, !1 === _runCallbacks("onswap_start", i) || !1 === _runCallbacks("onswap_start", t)) return state[i].edge = i, 
    state[t].edge = t, void 0;
    var r = n(i), a = n(t), s = {};
    s[i] = r ? r.state.size : 0, s[t] = a ? a.state.size : 0, $Ps[i] = !1, $Ps[t] = !1, 
    state[i] = {}, state[t] = {}, $Ts[i] && $Ts[i].remove(), $Ts[t] && $Ts[t].remove(), 
    $Rs[i] && $Rs[i].remove(), $Rs[t] && $Rs[t].remove(), $Rs[i] = $Rs[t] = $Ts[i] = $Ts[t] = !1, 
    o(r, t), o(a, i), r = a = s = null, $Ps[i] && $Ps[i].css(_c.visible), $Ps[t] && $Ps[t].css(_c.visible), 
    resizeAll(), _runCallbacks("onswap_end", i), _runCallbacks("onswap_end", t);
   }
  }, syncPinBtns = function(e, t) {
   $.layout.plugins.buttons && $.each(state[e].pins, function(n, o) {
    $.layout.buttons.setPinState(Instance, $(o), e, t);
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
  read: function(t) {
   for (var n, o = document.cookie, i = o ? o.split(";") : [], r = 0, a = i.length; a > r; r++) if (n = e.trim(i[r]).split("="), 
   n[0] == t) return decodeURIComponent(n[1]);
   return null;
  },
  write: function(t, n, o) {
   var i = "", r = "", a = !1, s = o || {}, l = s.expires || null, c = e.type(l);
   "date" === c ? r = l : "string" === c && l > 0 && (l = parseInt(l, 10), c = "number"), 
   "number" === c && (r = new Date(), l > 0 ? r.setDate(r.getDate() + l) : (r.setFullYear(1970), 
   a = !0)), r && (i += ";expires=" + r.toUTCString()), s.path && (i += ";path=" + s.path), 
   s.domain && (i += ";domain=" + s.domain), s.secure && (i += ";secure"), document.cookie = t + "=" + (a ? "" : encodeURIComponent(n)) + i;
  },
  clear: function(t) {
   e.ui.cookie.write(t, "", {
    expires: -1
   });
  }
 }, e.cookie || (e.cookie = function(t, n, o) {
  var i = e.ui.cookie;
  if (null === n) i.clear(t); else {
   if (void 0 === n) return i.read(t);
   i.write(t, n, o);
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
  saveCookie: function(t, n, o) {
   var i = t.options, r = i.stateManagement, a = e.extend(!0, {}, r.cookie, o || null), s = t.state.stateData = t.readState(n || r.stateKeys);
   return e.ui.cookie.write(a.name || i.name || "Layout", e.layout.state.encodeJSON(s), a), 
   e.extend(!0, {}, s);
  },
  deleteCookie: function(t) {
   var n = t.options;
   e.ui.cookie.clear(n.stateManagement.cookie.name || n.name || "Layout");
  },
  readCookie: function(t) {
   var n = t.options, o = e.ui.cookie.read(n.stateManagement.cookie.name || n.name || "Layout");
   return o ? e.layout.state.decodeJSON(o) : {};
  },
  loadCookie: function(t) {
   var n = e.layout.state.readCookie(t);
   return n && (t.state.stateData = e.extend(!0, {}, n), t.loadState(n)), n;
  },
  loadState: function(t, n, o) {
   if (e.isPlainObject(n) && !e.isEmptyObject(n)) {
    n = t.state.stateData = e.layout.transformData(n);
    var i = t.options.stateManagement;
    if (o = e.extend({
     animateLoad: !1,
     includeChildren: i.includeChildren
    }, o), t.state.initialized) {
     var r, a, l, c, u, d = !o.animateLoad;
     if (e.each(e.layout.config.borderPanes, function(o, i) {
      r = n[i], e.isPlainObject(r) && (s = r.size, a = r.initClosed, l = r.initHidden, 
      ar = r.autoResize, c = t.state[i], u = c.isVisible, ar && (c.autoResize = ar), u || t._sizePane(i, s, !1, !1, !1), 
      l === !0 ? t.hide(i, d) : a === !0 ? t.close(i, !1, d) : a === !1 ? t.open(i, !1, d) : l === !1 && t.show(i, !1, d), 
      u && t._sizePane(i, s, !1, !1, d));
     }), o.includeChildren) {
      var p, f;
      e.each(t.children, function(t, o) {
       p = n[t] ? n[t].children : 0, p && o && e.each(o, function(e, t) {
        f = p[e], t && f && t.loadState(f);
       });
      });
     }
    } else {
     var r = e.extend(!0, {}, n);
     e.each(e.layout.config.allPanes, function(e, t) {
      r[t] && delete r[t].children;
     }), e.extend(!0, t.options, r);
    }
   }
  },
  readState: function(t, n) {
   "string" === e.type(n) && (n = {
    keys: n
   }), n || (n = {});
   var o, i, r, a, s, l, c, u = t.options.stateManagement, d = n.includeChildren, p = void 0 !== d ? d : u.includeChildren, f = n.stateKeys || u.stateKeys, h = {
    isClosed: "initClosed",
    isHidden: "initHidden"
   }, g = t.state, m = e.layout.config.allPanes, b = {};
   e.isArray(f) && (f = f.join(",")), f = f.replace(/__/g, ".").split(",");
   for (var v = 0, y = f.length; y > v; v++) o = f[v].split("."), i = o[0], r = o[1], 
   e.inArray(i, m) < 0 || (a = g[i][r], void 0 != a && ("isClosed" == r && g[i].isSliding && (a = !0), 
   (b[i] || (b[i] = {}))[h[r] ? h[r] : r] = a));
   return p && e.each(m, function(n, o) {
    l = t.children[o], s = g.stateData[o], e.isPlainObject(l) && !e.isEmptyObject(l) && (c = b[o] || (b[o] = {}), 
    c.children || (c.children = {}), e.each(l, function(t, n) {
     n.state.initialized ? c.children[t] = e.layout.state.readState(n) : s && s.children && s.children[t] && (c.children[t] = e.extend(!0, {}, s.children[t]));
    }));
   }), b;
  },
  encodeJSON: function(t) {
   function n(t) {
    var o, i, r, a = [], s = 0, l = e.isArray(t);
    for (o in t) i = t[o], r = typeof i, "string" == r ? i = '"' + i + '"' : "object" == r && (i = n(i)), 
    a[s++] = (l ? "" : '"' + o + '":') + i;
    return (l ? "[" : "{") + a.join(",") + (l ? "]" : "}");
   }
   return n(t);
  },
  decodeJSON: function(t) {
   try {
    return e.parseJSON ? e.parseJSON(t) : window.eval("(" + t + ")") || {};
   } catch (n) {
    return {};
   }
  },
  _create: function(t) {
   var n = e.layout.state, o = t.options, i = o.stateManagement;
   if (e.extend(t, {
    readCookie: function() {
     return n.readCookie(t);
    },
    deleteCookie: function() {
     n.deleteCookie(t);
    },
    saveCookie: function(e, o) {
     return n.saveCookie(t, e, o);
    },
    loadCookie: function() {
     return n.loadCookie(t);
    },
    loadState: function(e, o) {
     n.loadState(t, e, o);
    },
    readState: function(e) {
     return n.readState(t, e);
    },
    encodeJSON: n.encodeJSON,
    decodeJSON: n.decodeJSON
   }), t.state.stateData = {}, i.autoLoad) if (e.isPlainObject(i.autoLoad)) e.isEmptyObject(i.autoLoad) || t.loadState(i.autoLoad); else if (i.enabled) if (e.isFunction(i.autoLoad)) {
    var r = {};
    try {
     r = i.autoLoad(t, t.state, t.options, t.options.name || "");
    } catch (a) {}
    r && e.isPlainObject(r) && !e.isEmptyObject(r) && t.loadState(r);
   } else t.loadCookie();
  },
  _unload: function(t) {
   var n = t.options.stateManagement;
   if (n.enabled && n.autoSave) if (e.isFunction(n.autoSave)) try {
    n.autoSave(t, t.state, t.options, t.options.name || "");
   } catch (o) {} else t.saveCookie();
  }
 }, e.layout.onCreate.push(e.layout.state._create), e.layout.onUnload.push(e.layout.state._unload), 
 e.layout.plugins.buttons = !0, e.layout.defaults.autoBindCustomButtons = !1, e.layout.optionsMap.layout.push("autoBindCustomButtons"), 
 e.layout.buttons = {
  init: function(t) {
   var n, o = "ui-layout-button-", i = t.options.name || "";
   e.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function(r, a) {
    e.each(e.layout.config.borderPanes, function(r, s) {
     e("." + o + a + "-" + s).each(function() {
      n = e(this).data("layoutName") || e(this).attr("layoutName"), (void 0 == n || n === i) && t.bindButton(this, a, s);
     });
    });
   });
  },
  get: function(t, n, o, i) {
   var r = e(n), a = t.options, s = a.errors.addButtonError;
   if (r.length) if (e.inArray(o, e.layout.config.borderPanes) < 0) e.layout.msg(s + " " + a.errors.pane + ": " + o, !0), 
   r = e(""); else {
    var l = a[o].buttonClass + "-" + i;
    r.addClass(l + " " + l + "-" + o).data("layoutName", a.name);
   } else e.layout.msg(s + " " + a.errors.selector + ": " + n, !0);
   return r;
  },
  bind: function(t, n, o, i) {
   var r = e.layout.buttons;
   switch (o.toLowerCase()) {
   case "toggle":
    r.addToggle(t, n, i);
    break;

   case "open":
    r.addOpen(t, n, i);
    break;

   case "close":
    r.addClose(t, n, i);
    break;

   case "pin":
    r.addPin(t, n, i);
    break;

   case "toggle-slide":
    r.addToggle(t, n, i, !0);
    break;

   case "open-slide":
    r.addOpen(t, n, i, !0);
   }
   return t;
  },
  addToggle: function(t, n, o, i) {
   return e.layout.buttons.get(t, n, o, "toggle").click(function(e) {
    t.toggle(o, !!i), e.stopPropagation();
   }), t;
  },
  addOpen: function(t, n, o, i) {
   return e.layout.buttons.get(t, n, o, "open").attr("title", t.options[o].tips.Open).click(function(e) {
    t.open(o, !!i), e.stopPropagation();
   }), t;
  },
  addClose: function(t, n, o) {
   return e.layout.buttons.get(t, n, o, "close").attr("title", t.options[o].tips.Close).click(function(e) {
    t.close(o), e.stopPropagation();
   }), t;
  },
  addPin: function(t, n, o) {
   var i = e.layout.buttons, r = i.get(t, n, o, "pin");
   if (r.length) {
    var a = t.state[o];
    r.click(function(n) {
     i.setPinState(t, e(this), o, a.isSliding || a.isClosed), a.isSliding || a.isClosed ? t.open(o) : t.close(o), 
     n.stopPropagation();
    }), i.setPinState(t, r, o, !a.isClosed && !a.isSliding), a.pins.push(n);
   }
   return t;
  },
  setPinState: function(e, t, n, o) {
   var i = t.attr("pin");
   if (!i || o !== ("down" == i)) {
    var r = e.options[n], a = r.buttonClass + "-pin", s = a + "-" + n, l = a + "-up " + s + "-up", c = a + "-down " + s + "-down";
    t.attr("pin", o ? "down" : "up").attr("title", o ? r.tips.Unpin : r.tips.Pin).removeClass(o ? l : c).addClass(o ? c : l);
   }
  },
  syncPinBtns: function(t, n, o) {
   e.each(t.state[n].pins, function(i, r) {
    e.layout.buttons.setPinState(t, e(r), n, o);
   });
  },
  _load: function(t) {
   var n = e.layout.buttons;
   e.extend(t, {
    bindButton: function(e, o, i) {
     return n.bind(t, e, o, i);
    },
    addToggleBtn: function(e, o, i) {
     return n.addToggle(t, e, o, i);
    },
    addOpenBtn: function(e, o, i) {
     return n.addOpen(t, e, o, i);
    },
    addCloseBtn: function(e, o) {
     return n.addClose(t, e, o);
    },
    addPinBtn: function(e, o) {
     return n.addPin(t, e, o);
    }
   });
   for (var o = 0; 4 > o; o++) {
    var i = e.layout.config.borderPanes[o];
    t.state[i].pins = [];
   }
   t.options.autoBindCustomButtons && n.init(t);
  },
  _unload: function() {}
 }, e.layout.onLoad.push(e.layout.buttons._load), e.layout.plugins.browserZoom = !0, 
 e.layout.defaults.browserZoomCheckInterval = 1e3, e.layout.optionsMap.layout.push("browserZoomCheckInterval"), 
 e.layout.browserZoom = {
  _init: function(t) {
   e.layout.browserZoom.ratio() !== !1 && e.layout.browserZoom._setTimer(t);
  },
  _setTimer: function(t) {
   if (!t.destroyed) {
    var n = t.options, o = t.state, i = t.hasParentLayout ? 5e3 : Math.max(n.browserZoomCheckInterval, 100);
    setTimeout(function() {
     if (!t.destroyed && n.resizeWithWindow) {
      var i = e.layout.browserZoom.ratio();
      i !== o.browserZoom && (o.browserZoom = i, t.resizeAll()), e.layout.browserZoom._setTimer(t);
     }
    }, i);
   }
  },
  ratio: function() {
   function t(e, t) {
    return (100 * (parseInt(e, 10) / parseInt(t, 10))).toFixed();
   }
   var n, o, i, r = window, a = screen, s = document, l = s.documentElement || s.body, c = e.layout.browser, u = c.version;
   return c.msie && u > 8 || !c.msie ? !1 : a.deviceXDPI && a.systemXDPI ? t(a.deviceXDPI, a.systemXDPI) : c.webkit && (n = s.body.getBoundingClientRect) ? t(n.left - n.right, s.body.offsetWidth) : c.webkit && (o = r.outerWidth) ? t(o, r.innerWidth) : (o = a.width) && (i = l.clientWidth) ? t(o, i) : !1;
  }
 }, e.layout.onReady.push(e.layout.browserZoom._init);
}(jQuery), define("libs/layout", function() {}), function() {
 function e() {}
 function t(e) {
  this.buttonBar = d.getElementById("wmd-button-bar" + e), this.preview = d.getElementById("wmd-preview" + e), 
  this.input = d.getElementById("wmd-input" + e);
 }
 function n(e, t) {
  var n, i, r, a = this, s = [], c = 0, u = "none", d = function(e, t) {
   u != e && (u = e, t || f()), g.isIE && "moving" == u ? r = null : i = setTimeout(p, 1);
  }, p = function(e) {
   r = new o(t, e), i = void 0;
  };
  this.setCommandMode = function() {
   u = "command", f(), i = setTimeout(p, 0);
  }, this.canUndo = function() {
   return c > 1;
  }, this.canRedo = function() {
   return s[c + 1] ? !0 : !1;
  }, this.undo = function() {
   a.canUndo() && (n ? (n.restore(), n = null) : (s[c] = new o(t), s[--c].restore(), 
   e && e())), u = "none", t.input.focus(), p();
  }, this.redo = function() {
   a.canRedo() && (s[++c].restore(), e && e()), u = "none", t.input.focus(), p();
  };
  var f = function() {
   var i = r || new o(t);
   return i ? "moving" == u ? (n || (n = i), void 0) : (n && (s[c - 1].text != n.text && (s[c++] = n), 
   n = null), s[c++] = i, s[c + 1] = null, e && e(), void 0) : !1;
  }, h = function(e) {
   if (!e.ctrlKey && !e.metaKey) {
    var t = e.keyCode;
    t >= 33 && 40 >= t || t >= 63232 && 63235 >= t ? d("moving") : 8 == t || 46 == t || 127 == t ? d("deleting") : 13 == t ? d("newlines") : 27 == t ? d("escape") : (16 > t || t > 20) && 91 != t && d("typing");
   }
  }, m = function() {
   l.addEvent(t.input, "keypress", function(e) {
    !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault();
   });
   var e = function() {
    (g.isIE || r && r.text != t.input.value) && void 0 == i && (u = "paste", f(), p());
   };
   l.addEvent(t.input, "keydown", h), l.addEvent(t.input, "mousedown", function() {
    d("moving");
   }), t.input.onpaste = e, t.input.ondrop = e;
  }, b = function() {
   m(), p(!0);
  };
  this.reinit = function(e, t, o, a) {
   s = [], c = 0, u = "none", n = void 0, i = void 0, p(), r.text = e, r.start = t, 
   r.end = o, r.scrollTop = a, r.setInputAreaSelection(), f();
  }, this.setMode = d, b();
 }
 function o(t, n) {
  var o = this, i = t.input;
  this.init = function() {
   l.isVisible(i) && (n || !d.activeElement || d.activeElement === i) && (this.setInputAreaSelectionStartEnd(), 
   this.scrollTop = i.scrollTop, (!this.text && i.selectionStart || 0 === i.selectionStart) && (this.text = i.value));
  }, this.setInputAreaSelection = function() {
   if (l.isVisible(i)) if (void 0 === i.selectionStart || g.isOpera) {
    if (d.selection) {
     if (d.activeElement && d.activeElement !== i) return;
     i.focus();
     var e = i.createTextRange();
     e.moveStart("character", -i.value.length), e.moveEnd("character", -i.value.length), 
     e.moveEnd("character", o.end), e.moveStart("character", o.start), e.select();
    }
   } else i.focus(), i.selectionStart = o.start, i.selectionEnd = o.end, i.scrollTop = o.scrollTop;
  }, this.setInputAreaSelectionStartEnd = function() {
   if (t.ieCachedRange || !i.selectionStart && 0 !== i.selectionStart) {
    if (d.selection) {
     o.text = l.fixEolChars(i.value);
     var e = t.ieCachedRange || d.selection.createRange(), n = l.fixEolChars(e.text), r = "", a = r + n + r;
     e.text = a;
     var s = l.fixEolChars(i.value);
     e.moveStart("character", -a.length), e.text = n, o.start = s.indexOf(r), o.end = s.lastIndexOf(r) - r.length;
     var c = o.text.length - l.fixEolChars(i.value).length;
     if (c) {
      for (e.moveStart("character", -n.length); c--; ) n += "\n", o.end += 1;
      e.text = n;
     }
     t.ieCachedRange && (o.scrollTop = t.ieCachedScrollTop), t.ieCachedRange = null, 
     this.setInputAreaSelection();
    }
   } else o.start = i.selectionStart, o.end = i.selectionEnd;
  }, this.restore = function() {
   void 0 != o.text && o.text != i.value && (i.value = o.text), this.setInputAreaSelection(), 
   i.scrollTop = o.scrollTop;
  }, this.getChunks = function() {
   var t = new e();
   return t.before = l.fixEolChars(o.text.substring(0, o.start)), t.startTag = "", 
   t.selection = l.fixEolChars(o.text.substring(o.start, o.end)), t.endTag = "", t.after = l.fixEolChars(o.text.substring(o.end)), 
   t.scrollTop = o.scrollTop, t;
  }, this.setChunks = function(e) {
   e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, 
   this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, 
   this.scrollTop = e.scrollTop;
  }, this.init();
 }
 function i(e, t, n, o) {
  var i, r, a, s = 3e3, u = "delayed", p = function(e, t) {
   l.addEvent(e, "input", t), e.onpaste = t, e.ondrop = t, l.addEvent(e, "keypress", t), 
   l.addEvent(e, "keydown", t);
  }, f = function() {
   var e = 0;
   return window.innerHeight ? e = window.pageYOffset : d.documentElement && d.documentElement.scrollTop ? e = d.documentElement.scrollTop : d.body && (e = d.body.scrollTop), 
   e;
  }, h = function() {
   if (t.preview) {
    var n = t.input.value;
    if (!n || n != a) {
     a = n;
     var o = new Date().getTime();
     n = e.makeHtml(n);
     var i = new Date().getTime();
     r = i - o, C(n);
    }
   }
  };
  void 0 !== o && (h = o(h));
  var m = function() {
   if (i && (clearTimeout(i), i = void 0), "manual" !== u) {
    var e = 0;
    "delayed" === u && (e = r), e > s && (e = s), i = setTimeout(h, e);
   }
  }, b = function(e) {
   return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight);
  }, v = function() {
   t.preview && (t.preview.scrollTop = (t.preview.scrollHeight - t.preview.clientHeight) * b(t.preview));
  };
  this.refresh = function(e) {
   e ? (a = "", h()) : m();
  }, this.processingTime = function() {
   return r;
  };
  var y, x = !0, w = function(e) {
   var n = t.preview, o = n.parentNode, i = n.nextSibling;
   o.removeChild(n), n.innerHTML = e, i ? o.insertBefore(n, i) : o.appendChild(n);
  }, k = function(e) {
   t.preview.innerHTML = e;
  }, S = function(e) {
   if (y) return y(e);
   try {
    k(e), y = k;
   } catch (t) {
    y = w, y(e);
   }
  }, C = function(e) {
   var o = c.getTop(t.input) - f();
   if (t.preview && (S(e), n()), v(), x) return x = !1, void 0;
   var i = c.getTop(t.input) - f();
   g.isIE ? setTimeout(function() {
    window.scrollBy(0, i - o);
   }, 0) : window.scrollBy(0, i - o);
  }, E = function() {
   p(t.input, m), t.preview && (t.preview.scrollTop = 0);
  };
  E();
 }
 function r(e, t, n, i, r, a, s) {
  function c(e) {
   if (b.focus(), e.textOp) {
    n && n.setCommandMode();
    var r = new o(t);
    if (!r) return;
    var a = r.getChunks(), s = function() {
     b.focus(), a && r.setChunks(a), r.restore(), i.refresh();
    }, l = e.textOp(a, s);
    l || (s(), b.dispatchEvent(new Event("input")));
   }
   e.execute && e.execute(n);
  }
  function u(e, n) {
   var o = "0px", i = "-20px", r = "-40px", a = e.getElementsByTagName("span")[0];
   n ? (a.style.backgroundPosition = e.XShift + " " + o, e.onmouseover = function() {
    a.style.backgroundPosition = this.XShift + " " + r;
   }, e.onmouseout = function() {
    a.style.backgroundPosition = this.XShift + " " + o;
   }, g.isIE && (e.onmousedown = function() {
    d.activeElement && d.activeElement !== t.input || (t.ieCachedRange = document.selection.createRange(), 
    t.ieCachedScrollTop = t.input.scrollTop);
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
   var n = t.buttonBar, o = document.createElement("ul");
   o.id = "wmd-button-row" + e, o.className = "wmd-button-row", o = n.appendChild(o);
   var i = 0, r = function(t, n, r, a) {
    var s = document.createElement("li");
    s.className = "wmd-button", s.style.left = i + "px", i += 25;
    var l = document.createElement("span");
    return s.id = t + e, s.appendChild(l), s.title = n, s.XShift = r, a && (s.textOp = a), 
    u(s, !0), o.appendChild(s), s;
   }, l = function(t) {
    var n = document.createElement("li");
    n.className = "wmd-spacer wmd-spacer" + t, n.id = "wmd-spacer" + t + e, o.appendChild(n), 
    i += 25;
   };
   v.bold = r("wmd-bold-button", s("bold"), "0px", p("doBold")), v.italic = r("wmd-italic-button", s("italic"), "-20px", p("doItalic")), 
   l(1), v.link = r("wmd-link-button", s("link"), "-40px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !1);
   })), v.quote = r("wmd-quote-button", s("quote"), "-60px", p("doBlockquote")), v.code = r("wmd-code-button", s("code"), "-80px", p("doCode")), 
   v.image = r("wmd-image-button", s("image"), "-100px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !0);
   })), l(2), v.olist = r("wmd-olist-button", s("olist"), "-120px", p(function(e, t) {
    this.doList(e, t, !0);
   })), v.ulist = r("wmd-ulist-button", s("ulist"), "-140px", p(function(e, t) {
    this.doList(e, t, !1);
   })), v.heading = r("wmd-heading-button", s("heading"), "-160px", p("doHeading")), 
   v.hr = r("wmd-hr-button", s("hr"), "-180px", p("doHorizontalRule")), l(3), v.undo = r("wmd-undo-button", s("undo"), "-200px", null), 
   v.undo.execute = function(e) {
    e && e.undo();
   };
   var c = /win/.test(f.platform.toLowerCase()) ? s("redo") : s("redomac");
   if (v.redo = r("wmd-redo-button", c, "-220px", null), v.redo.execute = function(e) {
    e && e.redo();
   }, a) {
    var d = document.createElement("li"), h = document.createElement("span");
    d.appendChild(h), d.className = "wmd-button wmd-help-button", d.id = "wmd-help-button" + e, 
    d.XShift = "-240px", d.isHelp = !0, d.style.right = "0px", d.title = s("help"), 
    d.onclick = a.handler, u(d, !0), o.appendChild(d), v.help = d;
   }
   m();
  }
  function m() {
   n && (u(v.undo, n.canUndo()), u(v.redo, n.canRedo()));
  }
  var b = t.input, v = {};
  h();
  var y = "keydown";
  g.isOpera && (y = "keypress"), l.addEvent(b, y, function(e) {
   if ((e.ctrlKey || e.metaKey) && !e.altKey) {
    var t = e.charCode || e.keyCode, o = String.fromCharCode(t).toLowerCase();
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
     return n.setMode("typing"), void 0;

    case "x":
     return n.setMode("deleting"), void 0;

    default:
     return;
    }
    e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1);
   }
  }), l.addEvent(b, "keyup", function(e) {
   if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
    var t = e.charCode || e.keyCode;
    if (13 === t) {
     var n = {};
     n.textOp = p("doAutoindent"), c(n);
    }
   }
  }), g.isIE && l.addEvent(b, "keydown", function(e) {
   var t = e.keyCode;
   return 27 === t ? !1 : void 0;
  }), this.setUndoRedoButtonStates = m, this.buttons = v, this.setButtonState = u;
 }
 function a(e, t) {
  this.hooks = e, this.getString = t;
 }
 function s(e) {
  return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(e, t, n) {
   return t = t.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, " ");
   }), t = decodeURIComponent(t), t = encodeURI(t).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), 
   t = t.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, "%2b");
   }), n && (n = n.trim ? n.trim() : n.replace(/^\s*/, "").replace(/\s*$/, ""), n = n.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), 
   n ? t + ' "' + n + '"' : t;
  });
 }
 var l = {}, c = {}, u = {}, d = window.document, p = window.RegExp, f = window.navigator, h = {
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
  var u, p, f = this;
  this.run = function(h) {
   if (!u) {
    u = new t(o);
    var g, m = new a(c, l), b = new i(e, u, function() {
     c.onPreviewRefresh();
    }, h);
    /\?noundo/.test(d.location.href) || (p = new n(function() {
     b.refresh(), g && g.setUndoRedoButtonStates();
    }, u), this.textOperation = function(e) {
     p.setCommandMode(), e(), f.refreshPreview();
    }), g = new r(o, u, p, b, m, s.helpButton, l), g.setUndoRedoButtonStates(), f.refreshPreview = function() {
     b.refresh(!0);
    }, f.undoManager = p, f.uiManager = g;
   }
  };
 }, e.prototype.findTags = function(e, t) {
  var n, o = this;
  e && (n = l.extendRegExp(e, "", "$"), this.before = this.before.replace(n, function(e) {
   return o.startTag = o.startTag + e, "";
  }), n = l.extendRegExp(e, "^", ""), this.selection = this.selection.replace(n, function(e) {
   return o.startTag = o.startTag + e, "";
  })), t && (n = l.extendRegExp(t, "", "$"), this.selection = this.selection.replace(n, function(e) {
   return o.endTag = e + o.endTag, "";
  }), n = l.extendRegExp(t, "^", ""), this.after = this.after.replace(n, function(e) {
   return o.endTag = e + o.endTag, "";
  }));
 }, e.prototype.trimWhitespace = function(e) {
  var t, n, o = this;
  e ? t = n = "" : (t = function(e) {
   return o.before += e, "";
  }, n = function(e) {
   return o.after = e + o.after, "";
  }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n);
 }, e.prototype.skipLines = function(e, t, n) {
  void 0 === e && (e = 1), void 0 === t && (t = 1), e++, t++;
  var o, i;
  if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), 
  this.startTag = this.startTag + p.$1, this.selection = this.selection.replace(/(\n*$)/, ""), 
  this.endTag = this.endTag + p.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), 
  this.before = this.before + p.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), 
  this.after = this.after + p.$1, this.before) {
   for (o = i = ""; e--; ) o += "\\n?", i += "\n";
   n && (o = "\\n*"), this.before = this.before.replace(new p(o + "$", ""), i);
  }
  if (this.after) {
   for (o = i = ""; t--; ) o += "\\n?", i += "\n";
   n && (o = "\\n*"), this.after = this.after.replace(new p(o, ""), i);
  }
 }, l.isVisible = function(e) {
  return window.getComputedStyle ? "none" !== window.getComputedStyle(e, null).getPropertyValue("display") : e.currentStyle ? "none" !== e.currentStyle.display : void 0;
 }, l.addEvent = function(e, t, n) {
  e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1);
 }, l.removeEvent = function(e, t, n) {
  e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1);
 }, l.fixEolChars = function(e) {
  return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n");
 }, l.extendRegExp = function(e, t, n) {
  (null === t || void 0 === t) && (t = ""), (null === n || void 0 === n) && (n = "");
  var o, i = e.toString();
  return i = i.replace(/\/([gim]*)$/, function(e, t) {
   return o = t, "";
  }), i = i.replace(/(^\/|\/$)/g, ""), i = t + i + n, new p(i, o);
 }, c.getTop = function(e, t) {
  var n = e.offsetTop;
  if (!t) for (;e = e.offsetParent; ) n += e.offsetTop;
  return n;
 }, c.getHeight = function(e) {
  return e.offsetHeight || e.scrollHeight;
 }, c.getWidth = function(e) {
  return e.offsetWidth || e.scrollWidth;
 }, c.getPageSize = function() {
  var e, t, n, o;
  self.innerHeight && self.scrollMaxY ? (e = d.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : d.body.scrollHeight > d.body.offsetHeight ? (e = d.body.scrollWidth, 
  t = d.body.scrollHeight) : (e = d.body.offsetWidth, t = d.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, 
  o = self.innerHeight) : d.documentElement && d.documentElement.clientHeight ? (n = d.documentElement.clientWidth, 
  o = d.documentElement.clientHeight) : d.body && (n = d.body.clientWidth, o = d.body.clientHeight);
  var i = Math.max(e, n), r = Math.max(t, o);
  return [ i, r, n, o ];
 }, u.createBackground = function() {
  var e = d.createElement("div"), t = e.style;
  e.className = "wmd-prompt-background", t.position = "absolute", t.top = "0", t.zIndex = "1000", 
  g.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
  var n = c.getPageSize();
  return t.height = n[1] + "px", g.isIE ? (t.left = d.documentElement.scrollLeft, 
  t.width = d.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), d.body.appendChild(e), 
  e;
 }, u.prompt = function(e, t, n) {
  var o, i;
  void 0 === t && (t = "");
  var r = function(e) {
   var t = e.charCode || e.keyCode;
   27 === t && a(!0);
  }, a = function(e) {
   l.removeEvent(d.body, "keydown", r);
   var t = i.value;
   return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), 
   o.parentNode.removeChild(o), n(t), !1;
  }, s = function() {
   o = d.createElement("div"), o.className = "wmd-prompt-dialog", o.style.padding = "10px;", 
   o.style.position = "fixed", o.style.width = "400px", o.style.zIndex = "1001";
   var n = d.createElement("div");
   n.innerHTML = e, n.style.padding = "5px", o.appendChild(n);
   var s = d.createElement("form"), u = s.style;
   s.onsubmit = function() {
    return a(!1);
   }, u.padding = "0", u.margin = "0", u.cssFloat = "left", u.width = "100%", u.textAlign = "center", 
   u.position = "relative", o.appendChild(s), i = d.createElement("input"), i.type = "text", 
   i.value = t, u = i.style, u.display = "block", u.width = "80%", u.marginLeft = u.marginRight = "auto", 
   s.appendChild(i);
   var p = d.createElement("input");
   p.type = "button", p.onclick = function() {
    return a(!1);
   }, p.value = "OK", u = p.style, u.margin = "10px", u.display = "inline", u.width = "7em";
   var f = d.createElement("input");
   f.type = "button", f.onclick = function() {
    return a(!0);
   }, f.value = "Cancel", u = f.style, u.margin = "10px", u.display = "inline", u.width = "7em", 
   s.appendChild(p), s.appendChild(f), l.addEvent(d.body, "keydown", r), o.style.top = "50%", 
   o.style.left = "50%", o.style.display = "block", g.isIE_5or6 && (o.style.position = "absolute", 
   o.style.top = d.documentElement.scrollTop + 200 + "px", o.style.left = "50%"), d.body.appendChild(o), 
   o.style.marginTop = -(c.getHeight(o) / 2) + "px", o.style.marginLeft = -(c.getWidth(o) / 2) + "px";
  };
  setTimeout(function() {
   s();
   var e = t.length;
   if (void 0 !== i.selectionStart) i.selectionStart = 0, i.selectionEnd = e; else if (i.createTextRange) {
    var n = i.createTextRange();
    n.collapse(!1), n.moveStart("character", -e), n.moveEnd("character", e), n.select();
   }
   i.focus();
  }, 0);
 };
 var y = a.prototype;
 y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", 
 y.unwrap = function(e) {
  var t = new p("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
  e.selection = e.selection.replace(t, "$1 $2");
 }, y.wrap = function(e, t) {
  this.unwrap(e);
  var n = new p("(.{1," + t + "})( +|$\\n?)", "gm"), o = this;
  e.selection = e.selection.replace(n, function(e, t) {
   return new p("^" + o.prefixes, "").test(e) ? e : t + "\n";
  }), e.selection = e.selection.replace(/\s+$/, "");
 }, y.doBold = function(e, t) {
  return this.doBorI(e, t, 2, this.getString("boldexample"));
 }, y.doItalic = function(e, t) {
  return this.doBorI(e, t, 1, this.getString("italicexample"));
 }, y.doBorI = function(e, t, n, o) {
  e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
  var i = /(\**$)/.exec(e.before)[0], r = /(^\**)/.exec(e.after)[0], a = Math.min(i.length, r.length);
  if (a >= n && (2 != a || 1 != n)) e.before = e.before.replace(p("[*]{" + n + "}$", ""), ""), 
  e.after = e.after.replace(p("^[*]{" + n + "}", ""), ""); else if (!e.selection && r) {
   e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
   var s = p.$1;
   e.before = e.before + r + s;
  } else {
   e.selection || r || (e.selection = o);
   var l = 1 >= n ? "*" : "**";
   e.before = e.before + l, e.after = l + e.after;
  }
 }, y.stripLinkDefs = function(e, t) {
  return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, n, o, i, r) {
   return t[n] = e.replace(/\s*$/, ""), i ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), 
   i + r) : "";
  });
 }, y.addLinkDef = function(e, t) {
  var n = 0, o = {};
  e.before = this.stripLinkDefs(e.before, o), e.selection = this.stripLinkDefs(e.selection, o), 
  e.after = this.stripLinkDefs(e.after, o);
  var i = "", r = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, a = function(e) {
   n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), i += "\n" + e;
  }, s = function(e, t, i, l, c, u) {
   return i = i.replace(r, s), o[c] ? (a(o[c]), t + i + l + n + u) : e;
  };
  e.before = e.before.replace(r, s), t ? a(t) : e.selection = e.selection.replace(r, s);
  var l = n;
  return e.after = e.after.replace(r, s), e.after && (e.after = e.after.replace(/\n*$/, "")), 
  e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + i, 
  l;
 }, y.doLinkOrImage = function(e, t, n) {
  e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
  var o;
  if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
   if (e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "", 
   /\n\n/.test(e.selection)) return this.addLinkDef(e, null), void 0;
   var i = this, r = function(r) {
    if (o.parentNode.removeChild(o), null !== r) {
     e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
     var a = " [999]: " + s(r), l = i.addLinkDef(e, a);
     e.startTag = n ? "![" : "[", e.endTag = "][" + l + "]", e.selection || (e.selection = n ? i.getString("imagedescription") : i.getString("linkdescription"));
    }
    t();
   };
   return o = u.createBackground(), n ? this.hooks.insertImageDialog(r) || u.prompt(this.getString("imagedialog"), b, r) : this.hooks.insertLinkDialog(r) || u.prompt(this.getString("linkdialog"), v, r), 
   !0;
  }
  e.startTag = e.startTag.replace(/!?\[/, ""), e.endTag = "", this.addLinkDef(e, null);
 }, y.doAutoindent = function(e) {
  var t = this, n = !1;
  e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), 
  e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), e.selection || /^[ \t]*(?:\n|$)/.test(e.after) || (e.after = e.after.replace(/^[^\n]*/, function(t) {
   return e.selection = t, "";
  }), n = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && t.doList && t.doList(e), 
  /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && t.doBlockquote && t.doBlockquote(e), 
  /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && t.doCode && t.doCode(e), n && (e.after = e.selection + e.after, 
  e.selection = "");
 }, y.doBlockquote = function(e) {
  e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(t, n, o, i) {
   return e.before += n, e.after = i + e.after, o;
  }), e.before = e.before.replace(/(>[ \t]*)$/, function(t, n) {
   return e.selection = n + e.selection, "";
  }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
  var t, n = "", o = "";
  if (e.before) {
   for (var i = e.before.replace(/\n$/, "").split("\n"), r = !1, a = 0; a < i.length; a++) {
    var s = !1;
    t = i[a], r = r && t.length > 0, /^>/.test(t) ? (s = !0, !r && t.length > 1 && (r = !0)) : s = /^[ \t]*$/.test(t) ? !0 : r, 
    s ? n += t + "\n" : (o += n + t, n = "\n");
   }
   /(^|\n)>/.test(n) || (o += n, n = "");
  }
  e.startTag = n, e.before = o, e.after && (e.after = e.after.replace(/^\n?/, "\n")), 
  e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(t) {
   return e.endTag = t, "";
  });
  var l = function(t) {
   var n = t ? "> " : "";
   e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function(e, t) {
    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n";
   })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function(e, t) {
    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n";
   }));
  };
  /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, h.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), 
  l(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), 
  this.unwrap(e), l(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), 
  !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), 
  e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function(t, n) {
   return e.startTag += n, "";
  }));
 }, y.doCode = function(e) {
  var t = /\S[ ]*$/.test(e.before), n = /^[ ]*\S/.test(e.after);
  if (!n && !t || /\n/.test(e.selection)) {
   e.before = e.before.replace(/[ ]{4}$/, function(t) {
    return e.selection = t + e.selection, "";
   });
   var o = 1, i = 1;
   /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (o = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (i = 0), 
   e.skipLines(o, i), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", 
   e.selection = this.getString("codeexample"));
  } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, 
  e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")));
 }, y.doList = function(e, t, n) {
  var o = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, i = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, r = "-", a = 1, s = function() {
   var e;
   return n ? (e = " " + a + ". ", a++) : e = " " + r + " ", e;
  }, l = function(e) {
   return void 0 === n && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
    return s();
   });
  };
  if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, 
  e.startTag = ""), e.startTag) {
   var c = /\d+[.]/.test(e.startTag);
   if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), 
   e.skipLines(), c && (e.after = e.after.replace(i, l)), n == c) return;
  }
  var u = 1;
  e.before = e.before.replace(o, function(e) {
   return /^\s*([*+-])/.test(e) && (r = p.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, 
   l(e);
  }), e.selection || (e.selection = this.getString("litem"));
  var d = s(), f = 1;
  e.after = e.after.replace(i, function(e) {
   return f = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e);
  }), e.trimWhitespace(!0), e.skipLines(u, f, !0), e.startTag = d;
  var g = d.replace(/./g, " ");
  this.wrap(e, h.lineLength - g.length), e.selection = e.selection.replace(/\n/g, "\n" + g);
 }, y.doHeading = function(e) {
  if (e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, ""), 
  !e.selection) return e.startTag = "## ", e.selection = this.getString("headingexample"), 
  e.endTag = " ##", void 0;
  var t = 0;
  e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (t = p.lastMatch.length), 
  e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (t = 1), 
  /-+/.test(e.endTag) && (t = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
  var n = 0 == t ? 2 : t - 1;
  if (n > 0) {
   var o = n >= 2 ? "-" : "=", i = e.selection.length;
   for (i > h.lineLength && (i = h.lineLength), e.endTag = "\n"; i--; ) e.endTag += o;
  }
 }, y.doHorizontalRule = function(e) {
  e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0);
 };
}(), define("libs/Markdown.Editor", function() {}), define("core", [ "jquery", "underscore", "utils", "settings", "eventMgr", "mousetrap", "text!html/settingsTemplateTooltip.html", "text!html/settingsUserCustomExtensionTooltip.html", "storage", "config", "libs/bootstrap", "libs/layout", "libs/Markdown.Editor" ], function(e, t, n, o, i, r, a, s) {
 function l() {
  y = !0, x = !0;
  var e = n.currentTime;
  e > k + 1e3 && (k = e, i.onUserActive());
 }
 function c() {
  return x === !0 && n.currentTime - k > USER_IDLE_THRESHOLD && (x = !1), x && w;
 }
 function u() {
  if (y !== !1 && w !== !1) {
   void 0 === S && (S = n.randomString(), localStorage.frontWindowId = S);
   var t = localStorage.frontWindowId;
   t != S && (w = !1, void 0 !== v && clearInterval(v), e(".modal").modal("hide"), 
   e("#modal-non-unique").modal({
    backdrop: "static",
    keyboard: !1
   }));
  }
 }
 function d() {
  C === !0 && (C = !1, i.onOfflineChanged(!1));
 }
 function p() {
  C === !0 && navigator.onLine === !0 && E + CHECK_ONLINE_PERIOD < n.currentTime && (E = n.currentTime, 
  e.ajax({
   url: "//www.google.com/jsapi",
   timeout: AJAX_TIMEOUT,
   dataType: "script"
  }).done(function() {
   d();
  }));
 }
 function f() {
  n.setInputRadio("radio-layout-orientation", o.layoutOrientation), n.setInputValue("#input-settings-theme", localStorage.theme), 
  n.setInputChecked("#input-settings-lazy-rendering", o.lazyRendering), n.setInputValue("#input-settings-editor-font-family", o.editorFontFamily), 
  n.setInputValue("#input-settings-editor-font-size", o.editorFontSize), n.setInputValue("#textarea-settings-default-content", o.defaultContent), 
  n.setInputValue("#input-settings-publish-commit-msg", o.commitMsg), n.setInputValue("#textarea-settings-publish-template", o.template), 
  n.setInputValue("#input-settings-ssh-proxy", o.sshProxy), i.onLoadSettings();
 }
 function h(t) {
  var r = {};
  r.layoutOrientation = n.getInputRadio("radio-layout-orientation");
  var a = n.getInputValue("#input-settings-theme");
  r.lazyRendering = n.getInputChecked("#input-settings-lazy-rendering"), r.editorFontFamily = n.getInputTextValue("#input-settings-editor-font-family", t), 
  r.editorFontSize = n.getInputIntValue("#input-settings-editor-font-size", t, 1, 99), 
  r.defaultContent = n.getInputValue("#textarea-settings-default-content"), r.commitMsg = n.getInputTextValue("#input-settings-publish-commit-msg", t), 
  r.template = n.getInputTextValue("#textarea-settings-publish-template", t), r.sshProxy = n.checkUrl(n.getInputTextValue("#input-settings-ssh-proxy", t), !0), 
  r.extensionSettings = {}, i.onSaveSettings(r.extensionSettings, t), t.isPropagationStopped() || (e.extend(o, r), 
  localStorage.settings = JSON.stringify(o), localStorage.theme = a);
 }
 function g() {
  if (viewerMode !== !0) {
   var t = {
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
   i.onLayoutConfigure(t), "horizontal" == o.layoutOrientation ? (e(".ui-layout-south").remove(), 
   e(".preview-container").html('<div id="extension-preview-buttons"></div><div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
   T = e("body").layout(e.extend(t, {
    east__resizable: !0,
    east__size: .5,
    east__minSize: 200
   }))) : "vertical" == o.layoutOrientation && (e(".ui-layout-east").remove(), e(".preview-container").html('<div id="extension-preview-buttons"></div><div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
   T = e("body").layout(e.extend(t, {
    south__resizable: !0,
    south__size: .5,
    south__minSize: 200
   }))), e(".navbar").click(function() {
    T.allowOverflow("north");
   }), e(".ui-layout-toggler-north").addClass("btn").append(e("<b>").addClass("caret")), 
   e(".ui-layout-toggler-south").addClass("btn").append(e("<b>").addClass("caret")), 
   e(".ui-layout-toggler-east").addClass("btn").append(e("<b>").addClass("caret")), 
   i.onLayoutCreated(T);
  }
 }
 function m() {
  e(window).on("offline", b.setOffline), e(window).on("online", d), navigator.onLine === !1 && b.setOffline(), 
  e(document).mousemove(l).keypress(l), e(".dropdown-submenu > a").click(function(e) {
   e.stopPropagation();
  });
  var a = void 0;
  e(".modal").on("shown", function() {
   var n = e(this).attr("id");
   a != n && (a = n, t.defer(function(e) {
    e.find("input:enabled:visible:first").focus();
   }, e(this)));
  }).on("hidden", function() {
   var t = e(this).attr("id");
   a == t && e(this).is(":hidden") && (a = void 0, e("#wmd-input").focus());
  }).keyup(function(t) {
   13 != t.which || e(t.target).is("textarea") || e(this).find(".modal-footer a:last").click();
  }), r.stopCallback = function(t, n) {
   return z || a || e(n).is("input, select, textarea:not(#wmd-input)");
  }, g(), e("#wmd-input, #md-section-helper").css({
   "font-family": o.editorFontFamily,
   "font-size": o.editorFontSize + "px",
   "line-height": Math.round(o.editorFontSize * (20 / 14)) + "px"
  }), e("#wmd-input").keydown(function(t) {
   if (9 === t.keyCode) {
    var n = e(this).val(), o = this.selectionStart, i = this.selectionEnd;
    if (void 0 === o || void 0 === i) return;
    e(this).val(n.substring(0, o) + "	" + n.substring(i)), this.selectionStart = this.selectionEnd = o + 1, 
    t.preventDefault();
   }
  }), v = window.setInterval(function() {
   n.updateCurrentTime(), u(), (c() === !0 || viewerMode === !0) && (i.onPeriodicRun(), 
   p());
  }, 1e3), i.onReady();
 }
 var b = {}, v = void 0, y = !1, x = !1, w = !0, k = 0, S = void 0, C = !1, E = n.currentTime;
 b.setOffline = function() {
  E = n.currentTime, C === !1 && (C = !0, i.onOfflineChanged(!0));
 };
 var T = void 0, _ = void 0, I = void 0, P = void 0;
 b.initEditor = function(r) {
  function a() {
   var e = l.val();
   void 0 !== P && P != e && (I.content = e, i.onContentChanged(I)), P = e;
  }
  void 0 !== I && i.onFileClosed(I), I = r, P = void 0;
  var s = I.content, l = e("#wmd-input");
  if (l.val(s), void 0 !== _) return _.undoManager.reinit(s, I.editorStart, I.editorEnd, I.editorScrollTop), 
  i.onFileOpen(I), _.refreshPreview(), void 0;
  var c = e(".preview-container");
  l.scroll(function() {
   void 0 !== P && (I.editorScrollTop = e(this).scrollTop());
  }), l.bind("keyup mouseup", function() {
   void 0 !== P && (I.editorStart = this.selectionStart, I.editorEnd = this.selectionEnd);
  }), c.scroll(function() {
   void 0 !== P && (I.previewScrollTop = e(this).scrollTop());
  });
  var u = new Markdown.Converter();
  u.hooks.chain("preConversion", function(e) {
   i.previewStartTime = new Date();
   var t = e + "\n\n", n = [], o = 0;
   return t.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(e, i, r) {
    return i && (n.push(t.substring(o, r)), o = r), "";
   }), n.push(t.substring(o, e.length)), i.onSectionsCreated(n), e;
  }), _ = new Markdown.Editor(u), _.hooks.set("insertLinkDialog", function(t) {
   return b.insertLinkCallback = t, n.resetModalInputs(), e("#modal-insert-link").modal(), 
   !0;
  }), _.hooks.set("insertImageDialog", function(t) {
   return b.insertLinkCallback = t, b.catchModal ? !0 : (n.resetModalInputs(), e("#modal-insert-image").modal(), 
   !0);
  });
  var d;
  d = o.lazyRendering === !0 ? function(e) {
   var n = t.debounce(e, 500);
   return function() {
    void 0 === P ? (e(), l.scrollTop(I.editorScrollTop), c.scrollTop(I.previewScrollTop)) : n(), 
    a();
   };
  } : function(e) {
   return function() {
    e(), void 0 === P && c.scrollTop(I.previewScrollTop), a();
   };
  }, i.onEditorConfigure(_), _.hooks.chain("onPreviewRefresh", i.onAsyncPreview), 
  _.run(d), _.undoManager.reinit(s, I.editorStart, I.editorEnd, I.editorScrollTop), 
  e(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)").addClass("btn").css("left", 0).find("span").hide(), 
  e("#wmd-bold-button").append(e('<i class="icon-bold">')), e("#wmd-italic-button").append(e('<i class="icon-italic">')), 
  e("#wmd-link-button").append(e('<i class="icon-globe">')), e("#wmd-quote-button").append(e('<i class="icon-indent-right">')), 
  e("#wmd-code-button").append(e('<i class="icon-code">')), e("#wmd-image-button").append(e('<i class="icon-picture">')), 
  e("#wmd-olist-button").append(e('<i class="icon-list-numbered">')), e("#wmd-ulist-button").append(e('<i class="icon-list-bullet">')), 
  e("#wmd-heading-button").append(e('<i class="icon-text-height">')), e("#wmd-hr-button").append(e('<i class="icon-ellipsis">')), 
  e("#wmd-undo-button").append(e('<i class="icon-reply">')), e("#wmd-redo-button").append(e('<i class="icon-forward">')), 
  i.onFileOpen(I);
 };
 var z = !1;
 return b.lockUI = function(t) {
  z = t, e("#wmd-input").prop("disabled", z), e(".navbar-inner .btn").toggleClass("blocked", z), 
  z ? e(".lock-ui").removeClass("hide") : e(".lock-ui").addClass("hide");
 }, b.onReady = function() {
  viewerMode === !0 ? require([ "text!html/bodyViewer.html" ], function(t) {
   e("body").html(t), m();
  }) : require([ "text!html/bodyIndex.html", "text!html/dialogInsertLink.html", "text!html/dialogInsertImage.html", "text!html/dialogImportImage.html", "text!html/dialogRemoveFileConfirm.html" ], function(t, o, i, r, a) {
   e("body").html(t), n.addModal("modal-insert-link", o), n.addModal("modal-insert-image", i), 
   n.addModal("modal-import-image", r), n.addModal("modal-remove-file-confirm", a), 
   m();
  });
 }, i.addListener("onReady", function() {
  var r = t.reduce(THEME_LIST, function(e, t, n) {
   return e + '<option value="' + n + '">' + t + "</option>";
  }, "");
  e("#input-settings-theme").html(r), e(".action-insert-link").click(function(t) {
   var o = n.getInputTextValue(e("#input-insert-link"), t);
   void 0 !== o && (b.insertLinkCallback(o), b.insertLinkCallback = void 0);
  }), e(".action-insert-image").click(function(t) {
   var o = n.getInputTextValue(e("#input-insert-image"), t);
   void 0 !== o && (b.insertLinkCallback(o), b.insertLinkCallback = void 0);
  }), e("#modal-insert-link, #modal-insert-image").on("hidden", function() {
   void 0 !== b.insertLinkCallback && (b.insertLinkCallback(null), b.insertLinkCallback = void 0);
  }), e(".action-load-settings").click(function() {
   f();
  }), e(".action-apply-settings").click(function(e) {
   h(e), e.isPropagationStopped() || window.location.reload();
  }), e(".action-import-settings").click(function() {
   e("#input-file-import-settings").click();
  }), e("#input-file-import-settings").change(function(n) {
   var o = (n.dataTransfer || n.target).files;
   e("#modal-settings").modal("hide"), t.each(o, function(e) {
    var t = new FileReader();
    t.onload = function(e) {
     return function(t) {
      var n = t.target.result;
      try {
       JSON.parse(n);
      } catch (t) {
       return i.onError(e.name + " is not a valid JSON file."), void 0;
      }
      localStorage.settings = n, window.location.reload();
     };
    }(e);
    var n = e.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
    t.readAsText(n);
   });
  }), e(".action-export-settings").click(function() {
   n.saveAs(JSON.stringify(o), "StackEdit Settings.json");
  }), e(".action-default-settings").click(function() {
   localStorage.removeItem("settings"), localStorage.removeItem("theme"), window.location.reload();
  }), e(".action-app-reset").click(function() {
   localStorage.clear(), window.location.reload();
  }), e(".action-reset-input").click(function() {
   n.resetModalInputs();
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
   title: s
  }).click(function(t) {
   e(this).tooltip("show"), e(document).on("click.tooltip-usercustom-extension", function() {
    e(".tooltip-usercustom-extension").tooltip("hide"), e(document).off("click.tooltip-usercustom-extension");
   }), t.stopPropagation();
  }), e(".tooltip-template").tooltip({
   html: !0,
   container: "#modal-settings",
   placement: "right",
   trigger: "manual",
   title: a
  }).click(function(t) {
   e(this).tooltip("show"), e(document).on("click.tooltip-template", function() {
    e(".tooltip-template").tooltip("hide"), e(document).off("click.tooltip-template");
   }), t.stopPropagation();
  }), e("div.dropdown-menu").click(function(e) {
   e.stopPropagation();
  });
 }), b;
}), define("text!../WELCOME.md", [], function() {
 return '\nWelcome to StackEdit!	{#welcome}\n=====================\n\n\nHello, I am your first Markdown document within **StackEdit**[^stackedit]. Don\'t delete me, I can be helpful. I can be recovered anyway in the `Utils` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n----------\n\n\nDocuments\n---------\n\n**StackEdit** stores your documents in the browser local storage, which means all your documents are automatically saved locally and are accessible offline.\n\n#### <i class="icon-file"></i> Create a document\n\nYou can create a new document by clicking the <i class="icon-file"></i> button in the navigation bar. This will switch from the current document to the new one.\n\n#### <i class="icon-folder-open"></i> Switch to another document\n\nYou can list all your local documents and switch from one to another by clicking the <i class="icon-folder-open"></i> button in the navigation bar.\n\n#### <i class="icon-pencil"></i> Rename a document\n\nYou can rename the current document by clicking the document title in the navigation bar.\n\n#### <i class="icon-trash"></i> Delete a document\n\nYou can delete the current document by clicking the <i class="icon-trash"></i> button in the navigation bar.\n\n----------\n\n\nSynchronization\n---------------\n\n**StackEdit** can be combined with **Google Drive** and **Dropbox** to have your documents centralized in the *Cloud*. The synchronization mechanism will take care of uploading your modifications or downloading the latest version of your documents.\n\n#### <i class="icon-download"></i> Import a document\n\nYou can import a document from the *Cloud* by going to the <i class="icon-gdrive"></i> `Google Drive` or the <i class="icon-dropbox"></i> `Dropbox` sub-menu and by clicking `Import from...`. Once imported, your document will be automatically synchronized with the **Google Drive** / **Dropbox** file.\n\n#### <i class="icon-upload"></i> Export a document\n\nYou can export any document by going to the <i class="icon-gdrive"></i> `Google Drive` or the <i class="icon-dropbox"></i> `Dropbox` sub-menu and by clicking `Export to...`. Even if your document is already synchronized with **Google Drive** or **Dropbox**, you can export it to a another location. **StackEdit** can synchronize one document with multiple locations.\n\n#### <i class="icon-refresh"></i> Synchronize a document\n\nOnce your document is linked to a **Google Drive** or a **Dropbox** file, **StackEdit** will periodically (every 3 minutes) synchronize it by downloading/uploading any modification. Any conflict will be detected, and a local copy of your document will be created as a backup if necessary.\n\nIf you just have modified your document and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-refresh"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document is not synchronized with any location,\n> - or the document has not been modified since the last synchronization.\n\n#### <i class="icon-refresh"></i> Manage document synchronization\n\nSince one document can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-refresh"></i> `Manage synchronization` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to add or remove synchronization links that are associated to your document.\n\n> **NOTE:** If you delete the file from **Google Drive** or from **Dropbox**, the document will no longer be synchronized with that location.\n\n----------\n\n\nPublication\n-----------\n\nOnce you are happy with your document, you can publish it on different websites directly from **StackEdit**. As for now, **StackEdit** can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any SSH server.\n\n#### <i class="icon-share"></i> Publish a document\n\nYou can publish your document by going to the <i class="icon-share"></i> `Publish on` sub-menu and by choosing a website. In the dialog box, you can choose the publication format:\n\n- Markdown, to publish the Markdown text on a website that can interpret it (**GitHub** for instance),\n- HTML, to publish the document converted into HTML (on a blog for instance),\n- Template, to have a full control of the output.\n\n> **NOTE:** The default template is a simple webpage that wraps your document in HTML format. You can customize it in the `Publish` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n#### <i class="icon-share"></i> Update a publication\n\nAfter publishing, **StackEdit** will keep your document linked to that publish location so that you can update it easily. Once you have modified your document and you want to update your publication, click on the <i class="icon-share"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-share"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document has not been published anywhere.\n\n#### <i class="icon-share"></i> Manage document publication\n\nSince one document can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-share"></i> `Manage publication` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to remove publication links that are associated to your document.\n\n> **NOTE:** In some cases, if you remove the file from the website or the post from the blog, the document will no longer be published on that location.\n\n----------\n\n\nMarkdown Extra\n--------------\n\n**StackEdit** supports **Markdown Extra**, which extends **Markdown** syntax with some nice features.\n\n\n### Tables\n\n**Markdown Extra** has a special syntax for tables:\n\nItem      | Value\n--------- | -----\nComputer  | \\$1600\nPhone     | \\$12\nPipe      | \\$1\n\nYou can specify column alignment with one or two colons:\n\n| Item      |  Value | Qty  |\n| :-------- | ------:| :--: |\n| Computer  | \\$1600 |  5   |\n| Phone     |   \\$12 |  12  |\n| Pipe      |    \\$1 | 234  |\n\n\n### Definition Lists\n\n**Markdown Extra** has a special syntax for definition lists too:\n\nTerm 1\nTerm 2\n:   Definition A\n:   Definition B\n\nTerm 3\n\n:   Definition C\n\n:   Definition D\n\n	> part of definition D\n\n\n### Fenced code blocks\n\n**GitHub**\'s fenced code blocks are also supported with **Prettify** syntax highlighting:\n\n```\n// Foo\nvar bar = 0;\n```\n\n> **NOTE:** To use **Highlight.js** instead of **Prettify**, just configure the `Markdown Extra` extension in the <i class="icon-cog"></i> `Settings` dialog.\n\n\n### Special Attributes\n\nWith **Markdown Extra**, you can specify `class` and `id` attributes on headers and fenced code blocks just like this:\n\n##### Header example {#my-header}\n\n``` {#my-id .my-class}\nvar foo = bar;\n```\n\nThen you can create cross-references like this: [beginning of the document](#welcome).\n\n\n### Footnotes\n\nYou can create footnotes like this[^footnote].\n\n  [^footnote]: Here is the *text* of the **footnote**.\n\n\n### Table of contents\n\nYou can insert a table of contents using the marker `[TOC]`:\n\n[TOC]\n\n\n### MathJax\n \nYou can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com][1]:\n\nThe *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall\nn\\in\\mathbb N$ is via through the Euler integral\n\n$$\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\n$$\n\n\n> **NOTE:** You can find more information:\n>\n> - about **Markdown** syntax [here][2],\n> - about **Markdown Extra** extension [here][3],\n> - about **Prettify** syntax highlighting [here][4].\n> - about **Highlight.js** syntax highlighting [here][5].\n\n  [^stackedit]: StackEdit is a free, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.\n\n\n  [1]: http://math.stackexchange.com/\n  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"\n  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"\n  [4]: https://code.google.com/p/google-code-prettify/\n  [5]: http://softwaremaniacs.org/soft/highlight/en/';
}), define("fileMgr", [ "jquery", "underscore", "core", "utils", "settings", "eventMgr", "fileSystem", "classes/FileDescriptor", "text!../WELCOME.md" ], function(e, t, n, o, i, r, a, s, l) {
 var c = {};
 return c.currentFile = void 0, c.selectFile = function(o) {
  if (o = o || c.currentFile, void 0 === o) {
   var i = t.size(a);
   o = 0 === i ? c.createFile(WELCOME_DOCUMENT_TITLE, l) : t.max(a, function(e) {
    return e.selectTime || 0;
   });
  }
  c.currentFile !== o && (c.currentFile = o, o.selectTime = new Date().getTime(), 
  r.onFileSelected(o), o.fileIndex == TEMPORARY_FILE_INDEX ? e(".action-edit-document").removeClass("hide") : e(".action-edit-document").addClass("hide")), 
  n.initEditor(o);
 }, c.createFile = function(e, n, l, c) {
  if (n = void 0 !== n ? n : i.defaultContent, !e) {
   e = DEFAULT_FILE_TITLE;
   for (var u = 2; t.some(a, function(t) {
    return t.title == e;
   }); ) e = DEFAULT_FILE_TITLE + u++;
  }
  var d = TEMPORARY_FILE_INDEX;
  if (!c) do d = "file." + o.randomString(); while (t.has(a, d));
  l = l || {};
  var p = t.reduce(l, function(e, t) {
   return o.storeAttributes(t), e + t.syncIndex + ";";
  }, ";");
  localStorage[d + ".title"] = e, localStorage[d + ".content"] = n, localStorage[d + ".sync"] = p, 
  localStorage[d + ".publish"] = ";";
  var f = new s(d, e, l);
  return c || (o.appendIndexToArray("file.list", d), a[d] = f, r.onFileCreated(f)), 
  f;
 }, c.deleteFile = function(e) {
  e = e || c.currentFile, o.removeIndexFromArray("file.list", e.fileIndex), delete a[e.fileIndex], 
  c.currentFile === e && (c.currentFile = void 0, c.selectFile()), t.each(e.syncLocations, function(e) {
   localStorage.removeItem(e.syncIndex);
  }), t.each(e.publishLocations, function(e) {
   localStorage.removeItem(e.publishIndex);
  }), localStorage.removeItem(e.fileIndex + ".title"), localStorage.removeItem(e.fileIndex + ".content"), 
  localStorage.removeItem(e.fileIndex + ".sync"), localStorage.removeItem(e.fileIndex + ".publish"), 
  r.onFileDeleted(e);
 }, c.getFileFromSyncIndex = function(e) {
  return t.find(a, function(n) {
   return t.has(n.syncLocations, e);
  });
 }, c.getSyncAttributes = function(e) {
  var t = c.getFileFromSyncIndex(e);
  return t && t.syncLocations[e];
 }, c.getFileFromPublishIndex = function(e) {
  return t.find(a, function(n) {
   return t.has(n.publishLocations, e);
  });
 }, r.addListener("onReady", function() {
  function n(t) {
   t.hide(), e("#file-title").show();
   var n = e.trim(t.val()), o = c.currentFile;
   n && n != o.title && (o.title = n, r.onTitleChanged(o)), t.val(o.title), e("#wmd-input").focus();
  }
  c.selectFile(), e(".action-create-file").click(function() {
   var t = c.createFile();
   c.selectFile(t);
   var n = e("#wmd-input").focus().get(0);
   n.setSelectionRange && n.setSelectionRange(0, 0), e("#file-title").click();
  }), e(".action-remove-file").click(function() {
   c.deleteFile();
  }), e("#file-title").click(function() {
   if (viewerMode !== !0) {
    e(this).hide();
    var n = e("#file-title-input").show();
    t.defer(function() {
     n.focus().get(0).select();
    });
   }
  }), e("#file-title-input").blur(function() {
   n(e(this));
  }).keyup(function(t) {
   13 == t.keyCode && n(e(this)), 27 == t.keyCode && (e(this).val(""), n(e(this)));
  }), e(".action-open-stackedit").click(function() {
   window.location.href = ".";
  }), e(".action-edit-document").click(function() {
   var t = e("#wmd-input").val(), n = c.currentFile.title, o = c.createFile(n, t);
   c.selectFile(o), window.location.href = ".";
  }), e(".action-welcome-file").click(function() {
   var e = c.createFile(WELCOME_DOCUMENT_TITLE, l);
   c.selectFile(e);
  });
 }), r.onFileMgrCreated(c), c;
}), define("classes/Provider", [], function() {
 function e(e, t) {
  this.providerId = e, this.providerName = t;
 }
 return e;
}), define("classes/AsyncTask", [ "underscore", "utils", "eventMgr", "config", "libs/stacktrace" ], function(e, t, n) {
 function o() {
  this.finished = !1, this.timeout = ASYNC_TASK_DEFAULT_TIMEOUT, this.retryCounter = 0, 
  this.runCallbacks = [], this.successCallbacks = [], this.errorCallbacks = [];
 }
 function i() {
  d !== !1 && e.defer(function() {
   if (c === !0) return u + l.timeout < t.currentTime && l.error(new Error("A timeout occurred.")), 
   void 0;
   if (void 0 === l) {
    if (0 === a.length) return;
    l = a.shift(), u = t.currentTime, s === !1 && (s = !0, n.onAsyncRunning(!0));
   }
   u <= t.currentTime && (c = !0, l.chain());
  });
 }
 function r(t, o, r) {
  try {
   e.each(o, function(e) {
    e(r);
   });
  } finally {
   t.finished = !0, l === t && (l = void 0, c = !1), 0 === a.length ? (s = !1, n.onAsyncRunning(!1)) : i();
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
  if (t.logStackTrace(), this.finished !== !0) {
   if (void 0 === this.queue && (this.queue = this.runCallbacks.slice()), void 0 !== e) return e(), 
   void 0;
   if (0 === this.queue.length) return r(this, this.successCallbacks), void 0;
   var n = this.queue.shift();
   n();
  }
 }, o.prototype.error = function(e) {
  if (t.logStackTrace(), this.finished !== !0) throw e = e || new Error("Unknown error"), 
  e.message && n.onError(e), r(this, this.errorCallbacks, e), e;
 }, o.prototype.retry = function(e, n) {
  if (this.finished !== !0) {
   if (n = n || 5, this.queue = void 0, this.retryCounter >= n) return this.error(e), 
   void 0;
   var o = 1e3 * Math.pow(2, this.retryCounter++);
   u = t.currentTime + o, c = !1, i();
  }
 }, o.prototype.enqueue = function() {
  a.push(this), i();
 };
 var s = !1, l = void 0, c = !1, u = 0, d = !1;
 return n.addListener("onUserActive", function() {
  d = !0;
 }), n.addListener("onPeriodicRun", i), o;
}), define("helpers/dropboxHelper", [ "jquery", "underscore", "core", "eventMgr", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(t) {
  t.onRun(function() {
   return p === !0 ? (c = void 0, t.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : void 0 !== c ? (t.chain(), void 0) : (e.ajax({
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
    })), t.chain();
   }).fail(function(e) {
    var n = {
     status: e.status,
     responseText: e.statusText
    };
    s(n, t);
   }), void 0);
  });
 }
 function a(e) {
  e.onRun(function() {
   function t() {
    n === !1 && (o.onMessage("Please make sure the Dropbox authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), c.reset(), c.authenticate({
     interactive: !n
    }, function(o, i) {
     return i.authState === Dropbox.Client.DONE ? (u = !0, e.chain(), void 0) : n === !0 ? (n = !1, 
     e.chain(t), void 0) : (e.error(new Error("Access to Dropbox account is not authorized.")), 
     void 0);
    });
   }
   if (u === !0) return e.chain(), void 0;
   var n = !0;
   e.chain(t);
  });
 }
 function s(e, o) {
  var i = !0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Dropbox error (" + e.status + ": " + e.responseText + ").", 401 === e.status || 403 === e.status) return u = !1, 
   i = "Access to Dropbox account is not authorized.", o.retry(new Error(i), 1), void 0;
   if (400 === e.status && -1 !== e.responseText.indexOf("oauth_nonce")) return t.each(t.keys(localStorage), function(e) {
    0 === e.indexOf("dropbox-auth") && localStorage.removeItem(e);
   }), u = !1, o.retry(new Error(i), 1), void 0;
   e.status <= 0 && (c = void 0, u = !1, n.setOffline(), i = "|stopPublish");
  }
  o.error(new Error(i));
 }
 function l(t) {
  t.onRun(function() {
   return f === !0 ? (t.chain(), void 0) : (e.ajax({
    url: "https://www.dropbox.com/static/api/1/dropbox.js",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    f = !0, t.chain();
   }).fail(function(e) {
    var n = {
     status: e.status,
     responseText: e.statusText
    };
    s(n, t);
   }), void 0);
  });
 }
 var c = void 0, u = !1, d = {}, p = !1;
 o.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.upload = function(e, t, n) {
  var o = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   c.writeFile(e, t, function(t, n) {
    return t ? (400 === t.status && (t = 'Could not upload document into path "' + e + '".'), 
    s(t, l), void 0) : (o = n, l.chain(), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, o);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], o = e || 0, l = new i();
  r(l), a(l), l.onRun(function() {
   function e() {
    c.pullChanges(o, function(t, i) {
     return t ? (s(t, l), void 0) : (o = i.cursor(), void 0 !== i.changes && (n = n.concat(i.changes)), 
     i.shouldPullAgain ? l.chain(e) : l.chain(), void 0);
    });
   }
   l.chain(e);
  }), l.onSuccess(function() {
   t(void 0, n, o);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, d.downloadMetadata = function(e, t) {
  var n = [], o = new i();
  r(o), a(o), o.onRun(function() {
   function t() {
    if (0 === e.length) return o.chain(), void 0;
    var i = e[0];
    c.stat(i, function(i, r) {
     return r ? (n.push(r), e.shift(), o.chain(t), void 0) : (s(i, o), void 0);
    });
   }
   o.chain(t);
  }), o.onSuccess(function() {
   t(void 0, n);
  }), o.onError(function(e) {
   t(e);
  }), o.enqueue();
 }, d.downloadContent = function(e, t) {
  var n = [], o = new i();
  r(o), a(o), o.onRun(function() {
   function t() {
    if (0 === e.length) return o.chain(), void 0;
    var i = e[0];
    n.push(i);
    var r = void 0;
    return i.isFile === !0 ? r = i : void 0 !== i.wasRemoved && (r = i.stat), r ? (c.readFile(r.path, function(n, i) {
     return i ? (r.content = i, e.shift(), o.chain(t), void 0) : (s(n, o), void 0);
    }), void 0) : (e.shift(), o.chain(t), void 0);
   }
   o.chain(t);
  }), o.onSuccess(function() {
   t(void 0, n);
  }), o.onError(function(e) {
   t(e);
  }), o.enqueue();
 };
 var f = !1;
 return d.picker = function(e) {
  var t = [], n = new i();
  n.timeout = ASYNC_TASK_LONG_TIMEOUT, r(n), l(n), n.onRun(function() {
   var e = {};
   e.multiselect = !0, e.linkType = "direct", e.success = function(e) {
    for (var o = 0; o < e.length; o++) {
     var i = e[o].link;
     i = i.replace(/.*\/view\/[^\/]*/, ""), t.push(decodeURI(i));
    }
    n.chain();
   }, e.cancel = function() {
    n.chain();
   }, Dropbox.choose(e), o.onMessage("Please make sure the Dropbox chooser popup is not blocked by your browser.");
  }), n.onSuccess(function() {
   e(void 0, t);
  }), n.onError(function(t) {
   e(t);
  }), n.enqueue();
 }, d;
}), define("providers/dropboxProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "fileMgr", "helpers/dropboxHelper" ], function(e, t, n, o, i, r) {
 function a(e) {
  return void 0 === e ? void 0 : e.match(/^[^\\<>:"\|?\*]+$/) ? 0 !== e.indexOf("/") ? "/" + e : e : (o.onError('"' + e + '" contains invalid characters.'), 
  void 0);
 }
 function s(e) {
  return "sync." + d + "." + encodeURIComponent(e.toLowerCase());
 }
 function l(e, n, o) {
  var i = {};
  return i.provider = p, i.path = e, i.version = n, i.contentCRC = t.crc32(o), i.syncIndex = s(e), 
  i;
 }
 function c(t) {
  r.downloadMetadata(t, function(t, n) {
   t || r.downloadContent(n, function(t, n) {
    if (!t) {
     var r = [];
     e.each(n, function(e) {
      var t = l(e.path, e.versionTag, e.content), n = {};
      n[t.syncIndex] = t;
      var o = i.createFile(e.name, e.content, n);
      i.selectFile(o), r.push(o);
     }), 0 !== r.length && o.onSyncImportSuccess(r, p);
    }
   });
  });
 }
 function u(e, t, n, c) {
  if (e = a(e), void 0 === e) return c(!0), void 0;
  var u = s(e), d = i.getFileFromSyncIndex(u);
  if (void 0 !== d) {
   var p = d.title;
   return o.onError('File path is already synchronized with "' + p + '".'), c(!0), 
   void 0;
  }
  r.upload(e, n, function(e, t) {
   if (e) return c(e), void 0;
   var o = l(t.path, t.versionTag, n);
   c(void 0, o);
  });
 }
 var d = "dropbox", p = new n(d, "Dropbox");
 return p.defaultPublishFormat = "template", p.importFiles = function() {
  r.picker(function(t, n) {
   if (!t && 0 !== n.length) {
    var r = [];
    e.each(n, function(e) {
     var t = s(e), n = i.getFileFromSyncIndex(t);
     return void 0 !== n ? (o.onError('"' + n.title + '" was already imported.'), void 0) : (r.push(e), 
     void 0);
    }), c(r);
   }
  });
 }, p.exportFile = function(e, n, o, i) {
  var r = t.getInputTextValue("#input-sync-export-dropbox-path", e);
  u(r, n, o, i);
 }, p.exportManual = function(e, n, o, i) {
  var r = t.getInputTextValue("#input-sync-manual-dropbox-path", e);
  u(r, n, o, i);
 }, p.syncUp = function(e, t, n, o, i, a) {
  var s = i.contentCRC;
  return t == s ? (a(void 0, !1), void 0) : (r.upload(i.path, e, function(e, n) {
   return e ? (a(e, !0), void 0) : (i.version = n.versionTag, i.contentCRC = t, a(void 0, !0), 
   void 0);
  }), void 0);
 }, p.syncDown = function(n) {
  var a = localStorage[d + ".lastChangeId"];
  r.checkChanges(a, function(a, l, c) {
   if (a) return n(a), void 0;
   var u = [];
   e.each(l, function(e) {
    var t = s(e.path), n = i.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.wasRemoved === !0 ? (u.push(e), void 0) : (n.version != e.stat.versionTag && u.push(e), 
    void 0)) : void 0;
   }), r.downloadContent(u, function(r, a) {
    return r ? (n(r), void 0) : (e.each(a, function(e) {
     var n = e.syncAttributes, r = n.syncIndex, a = i.getFileFromSyncIndex(r);
     if (void 0 !== a) {
      var s = a.title;
      if (e.wasRemoved === !0) return o.onError('"' + s + '" has been removed from Dropbox.'), 
      a.removeSyncLocation(n), o.onSyncRemoved(a, n), void 0;
      var l = a.content, c = n.contentCRC != t.crc32(l), u = e.stat, d = t.crc32(u.content), p = n.contentCRC != d, f = l != u.content;
      f === !0 && c === !0 && p === !0 && (i.createFile(s + " (backup)", l), o.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      f && p === !0 && (a.content = u.content, o.onContentChanged(a), o.onMessage('"' + s + '" has been updated from Dropbox.'), 
      i.currentFile === a && i.selectFile()), n.version = u.versionTag, n.contentCRC = d, 
      t.storeAttributes(n);
     }
    }), localStorage[d + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, p.publish = function(e, t, n, o) {
  var i = a(e.path);
  return void 0 === i ? (o(!0), void 0) : (r.upload(i, n, o), void 0);
 }, p.newPublishAttributes = function(e) {
  var n = {};
  return n.path = t.getInputTextValue("#input-publish-dropbox-path", e), e.isPropagationStopped() ? void 0 : n;
 }, p;
}), define("helpers/googleHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(t) {
  t.onRun(function() {
   return p === !0 ? (c = !1, t.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : c === !0 ? (t.chain(), void 0) : (delayedFunction = function() {
    gapi.load("client,drive-realtime", function() {
     c = !0, t.chain();
    });
   }, e.ajax({
    url: "https://apis.google.com/js/api.js?onload=runDelayedFunction",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    s(n, t);
   }), void 0);
  });
 }
 function a(e) {
  e.onRun(function() {
   function t() {
    n === !1 && (o.onMessage("Please make sure the Google authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), gapi.auth.authorize({
     client_id: GOOGLE_CLIENT_ID,
     scope: GOOGLE_SCOPES,
     immediate: n
    }, function(o) {
     gapi.client.load("drive", "v2", function() {
      return !o || o.error ? c === !0 && n === !0 ? (n = !1, e.chain(t), void 0) : (e.error(new Error("Access to Google account is not authorized.")), 
      void 0) : (u = !0, e.chain(), void 0);
     });
    });
   }
   if (u === !0) return e.chain(), void 0;
   var n = !0;
   e.chain(t);
  });
 }
 function s(e, n) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Google error (" + e.code + ": " + e.message + ").", e.code >= 500 && e.code < 600) return n.retry(new Error(o)), 
   void 0;
   if (401 === e.code || 403 === e.code || "token_refresh_required" == e.code) return u = !1, 
   o = "Access to Google account is not authorized.", n.retry(new Error(o), 1), void 0;
   (0 === e.code || -1 === e.code) && (c = !1, u = !1, t.setOffline(), o = "|stopPublish");
  }
  n.error(new Error(o));
 }
 function l(t) {
  t.onRun(function() {
   return f === !0 ? (t.chain(), void 0) : (e.ajax({
    url: "//www.google.com/jsapi",
    data: {
     key: GOOGLE_API_KEY
    },
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    google.load("picker", "1", {
     callback: function() {
      t.chain();
     }
    }), f = !0;
   }).fail(function(e) {
    var n = {
     code: e.status,
     message: e.statusText
    };
    s(n, t);
   }), void 0);
  });
 }
 var c = !1, u = !1, d = {}, p = !1;
 o.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.forceAuthenticate = function() {
  u = !1;
  var e = new i();
  r(e), a(e), e.enqueue();
 }, d.upload = function(e, t, o, l, c, u) {
  var d = void 0, p = new i();
  r(p), a(p), p.onRun(function() {
   var i = "-------314159265358979323846", r = "\r\n--" + i + "\r\n", a = "\r\n--" + i + "--", c = "text/x-markdown", u = {
    title: o,
    mimeType: c
   };
   void 0 !== t && (u.parents = [ {
    kind: "drive#fileLink",
    id: t
   } ]);
   var f = "/upload/drive/v2/files", h = "POST";
   void 0 !== e && (f += "/" + e, h = "PUT");
   var g = {
    "Content-Type": 'multipart/mixed; boundary="' + i + '"'
   }, m = n.encodeBase64(l), b = [ r, "Content-Type: application/json\r\n\r\n", JSON.stringify(u), r, "Content-Type: ", c, "\r\n", "Content-Transfer-Encoding: base64\r\n", "\r\n", m, a ].join(""), v = gapi.client.request({
    path: f,
    method: h,
    params: {
     uploadType: "multipart"
    },
    headers: g,
    body: b
   });
   v.execute(function(t) {
    if (t && t.id) return d = t, d.content = l, p.chain(), void 0;
    var n = t.error;
    void 0 !== n && void 0 !== e && (404 === n.code ? n = 'File ID "' + e + '" not found on Google Drive.|removePublish' : 412 === n.code && (localStorage.removeItem("gdrive.lastChangeId"), 
    n = 'Conflict on file ID "' + e + '". Please restart the synchronization.')), s(n, p);
   });
  }), p.onSuccess(function() {
   u(void 0, d);
  }), p.onError(function(e) {
   u(e);
  }), p.enqueue();
 }, d.createRealtimeFile = function(e, t, n) {
  var o = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   var n = {
    title: t,
    mimeType: "application/vnd.google-apps.drive-sdk"
   };
   void 0 !== e && (n.parents = [ {
    kind: "drive#fileLink",
    id: e
   } ]);
   var i = gapi.client.drive.files.insert({
    resource: n
   });
   i.execute(function(e) {
    return e && e.id ? (o = e, l.chain(), void 0) : (s(e.error, l), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, o);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.uploadImg = function(t, n, o, l) {
  var c = void 0, u = new i();
  r(u), a(u), u.onRun(function() {
   var i = {
    Slug: t
   };
   t.match(/.jpe?g$/) ? i["Content-Type"] = "image/jpeg" : t.match(/.png$/) ? i["Content-Type"] = "image/png" : t.match(/.gif$/) && (i["Content-Type"] = "image/gif");
   var r = gapi.auth.getToken();
   r && (i.Authorization = "Bearer " + r.access_token), e.ajax({
    url: PICASA_PROXY_URL + "upload/" + o,
    headers: i,
    data: n,
    processData: !1,
    dataType: "xml",
    timeout: AJAX_TIMEOUT,
    type: "POST"
   }).done(function(e) {
    c = e, u.chain();
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    200 == t.code && (t.message = e.responseText), s(t, u);
   });
  }), u.onSuccess(function() {
   l(void 0, c);
  }), u.onError(function(e) {
   l(e);
  }), u.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], o = e || 0, l = new i();
  r(l), a(l), l.onRun(function() {
   function e() {
    var i = void 0;
    i = void 0 === t ? gapi.client.drive.changes.list({
     startChangeId: o + 1
    }) : gapi.client.drive.changes.list({
     pageToken: t
    }), i.execute(function(i) {
     return i && i.largestChangeId ? (o = i.largestChangeId, t = i.nextPageToken, void 0 !== i.items && (n = n.concat(i.items)), 
     void 0 !== t ? l.chain(e) : l.chain(), void 0) : (s(i.error, l), void 0);
    });
   }
   var t = void 0;
   l.chain(e);
  }), l.onSuccess(function() {
   t(void 0, n, o);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, d.downloadMetadata = function(t, n, o) {
  var l = [], c = new i();
  r(c), o || a(c), c.onRun(function() {
   function n() {
    if (0 === t.length) return c.chain(), void 0;
    var o = t[0], i = {}, r = gapi.auth.getToken();
    r && (i.Authorization = "Bearer " + r.access_token), e.ajax({
     url: "https://www.googleapis.com/drive/v2/files/" + o,
     headers: i,
     data: {
      key: GOOGLE_API_KEY
     },
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     l.push(e), t.shift(), c.chain(n);
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     404 === t.code && (t = 'File ID "' + o + '" not found on Google Drive.'), s(t, c);
    });
   }
   c.chain(n);
  }), c.onSuccess(function() {
   n(void 0, l);
  }), c.onError(function(e) {
   n(e);
  }), c.enqueue();
 }, d.downloadContent = function(t, n, o) {
  var l = [], c = new i();
  c.timeout = ASYNC_TASK_LONG_TIMEOUT, r(c), o || a(c), c.onRun(function() {
   function n() {
    if (0 === t.length) return c.chain(), void 0;
    var o = t[0];
    l.push(o);
    var i = void 0;
    if ("drive#file" == o.kind ? i = o : "drive#change" == o.kind && (i = o.file), !i) return t.shift(), 
    c.chain(n), void 0;
    if (0 === i.mimeType.indexOf("application/vnd.google-apps.drive-sdk")) return i.content = "", 
    i.isRealtime = !0, t.shift(), c.chain(n), void 0;
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
     i.content = e, t.shift(), c.chain(n);
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     s(t, c);
    });
   }
   c.chain(n);
  }), c.onSuccess(function() {
   n(void 0, l);
  }), c.onError(function(e) {
   n(e);
  }), c.enqueue();
 }, d.loadRealtime = function(e, t, n, o) {
  var s = void 0, l = new i();
  r(l), a(l), l.onRun(function() {
   gapi.drive.realtime.load(e, function(e) {
    s = e, l.chain();
   }, function(e) {
    var n = e.createString(t);
    e.getRoot().set("content", n);
   }, function(e) {
    o(e), l.error(new Error(e.message));
   });
  }), l.onSuccess(function() {
   n(void 0, s);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 };
 var f = !1;
 return d.picker = function(t, n) {
  function o() {
   void 0 !== s && (s.setVisible(!1), e(".modal-backdrop, .picker").remove());
  }
  var a = [], s = void 0, c = new i();
  r(c), l(c), c.onRun(function() {
   var t = new google.picker.PickerBuilder();
   if (t.setAppId(GOOGLE_DRIVE_APP_ID), n) t.addView(google.picker.ViewId.PHOTOS), 
   t.addView(google.picker.ViewId.PHOTO_UPLOAD); else {
    var i = new google.picker.View(google.picker.ViewId.DOCS);
    i.setMimeTypes([ "text/x-markdown", "text/plain", "application/octet-stream", "application/vnd.google-apps.drive-sdk." + GOOGLE_DRIVE_APP_ID ].join(",")), 
    t.enableFeature(google.picker.Feature.NAV_HIDDEN), t.enableFeature(google.picker.Feature.MULTISELECT_ENABLED), 
    t.addView(i);
   }
   t.setCallback(function(e) {
    (e.action == google.picker.Action.PICKED || e.action == google.picker.Action.CANCEL) && (e.action == google.picker.Action.PICKED && (a = e.docs), 
    o(), c.chain());
   }), s = t.build(), e("body").append(e("<div>").addClass("modal-backdrop").click(function() {
    o(), c.chain();
   })), s.setVisible(!0);
  }), c.onSuccess(function() {
   t(void 0, a);
  }), c.onError(function(e) {
   o(), t(e);
  }), c.enqueue();
 }, d.uploadBlogger = function(t, n, o, l, c, u, d) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   function i() {
    var t = "https://www.googleapis.com/blogger/v3/blogs/" + n + "/posts/", i = {
     kind: "blogger#post",
     blog: {
      id: n
     },
     labels: l,
     title: c,
     content: u
    }, r = "POST";
    void 0 !== o && (t += o, i.id = o, r = "PUT"), e.ajax({
     url: t,
     data: JSON.stringify(i),
     headers: a,
     type: r,
     contentType: "application/json",
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     o = e.id, p.chain();
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     404 === t.code && void 0 !== o && (t = "Post " + o + " not found on Blogger.|removePublish"), 
     s(t, p);
    });
   }
   function r() {
    return void 0 !== n ? (p.chain(i), void 0) : (e.ajax({
     url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
     data: {
      url: t
     },
     headers: a,
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     n = e.id, p.chain(i);
    }).fail(function(e) {
     var n = {
      code: e.status,
      message: e.statusText
     };
     404 === n.code && (n = 'Blog "' + t + '" not found on Blogger.|removePublish'), 
     s(n, p);
    }), void 0);
   }
   var a = {}, d = gapi.auth.getToken();
   d && (a.Authorization = "Bearer " + d.access_token), p.chain(r);
  }), p.onSuccess(function() {
   d(void 0, n, o);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, d;
}), define("providers/gdriveProvider", [ "underscore", "utils", "classes/Provider", "settings", "eventMgr", "fileMgr", "helpers/googleHelper" ], function(e, t, n, o, i, r, a) {
 function s(e) {
  return "sync." + u + "." + e;
 }
 function l(e, n, o, i) {
  var r = {};
  return r.provider = d, r.id = e, r.etag = n, r.contentCRC = t.crc32(o), r.titleCRC = t.crc32(i), 
  r.syncIndex = s(e), r;
 }
 function c(t) {
  a.downloadMetadata(t, function(t, n) {
   t || a.downloadContent(n, function(t, n) {
    if (!t) {
     var o = [], a = void 0;
     e.each(n, function(e) {
      var t = l(e.id, e.etag, e.content, e.title);
      t.isRealtime = e.isRealtime;
      var n = {};
      n[t.syncIndex] = t, a = r.createFile(e.title, e.content, n), o.push(a);
     }), void 0 !== a && (i.onSyncImportSuccess(o, d), r.selectFile(a));
    }
   });
  });
 }
 var u = "gdrive", d = new n(u, "Google Drive");
 d.defaultPublishFormat = "template", d.exportPreferencesInputIds = [ "gdrive-parentid" ], 
 d.importFiles = function() {
  a.picker(function(t, n) {
   if (!t && 0 !== n.length) {
    var o = [];
    e.each(n, function(e) {
     var t = s(e.id), n = r.getFileFromSyncIndex(t);
     return void 0 !== n ? (i.onError('"' + n.title + '" was already imported.'), void 0) : (o.push(e.id), 
     void 0);
    }), c(o);
   }
  });
 }, d.exportFile = function(e, n, o, i) {
  var r = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.upload(void 0, r, n, o, void 0, function(e, t) {
   if (e) return i(e), void 0;
   var r = l(t.id, t.etag, o, n);
   i(void 0, r);
  });
 }, d.exportRealtimeFile = function(e, n, o, i) {
  var r = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.createRealtimeFile(r, n, function(e, t) {
   if (e) return i(e), void 0;
   var r = l(t.id, t.etag, o, n);
   i(void 0, r);
  });
 }, d.exportManual = function(e, n, o, c) {
  var u = t.getInputTextValue("#input-sync-manual-gdrive-id", e);
  if (u) {
   var d = s(u), p = r.getFileFromSyncIndex(d);
   return void 0 !== p ? (i.onError('File ID is already synchronized with "' + p.title + '".'), 
   c(!0), void 0) : (a.upload(u, void 0, n, o, void 0, function(e, t) {
    if (e) return c(e), void 0;
    var i = l(t.id, t.etag, o, n);
    c(void 0, i);
   }), void 0);
  }
 }, d.syncUp = function(e, t, n, o, i, r) {
  var s = i.contentCRC, l = i.titleCRC;
  return t == s && o == l ? (r(void 0, !1), void 0) : (a.upload(i.id, void 0, n, e, i.etag, function(e, n) {
   return e ? (r(e, !0), void 0) : (i.etag = n.etag, i.contentCRC = t, i.titleCRC = o, 
   r(void 0, !0), void 0);
  }), void 0);
 }, d.syncDown = function(n) {
  var o = parseInt(localStorage[u + ".lastChangeId"]);
  a.checkChanges(o, function(o, l, c) {
   if (o) return n(o), void 0;
   var p = [];
   e.each(l, function(e) {
    var t = s(e.fileId), n = r.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.deleted === !0 ? (p.push(e), void 0) : (n.etag != e.file.etag && p.push(e), 
    void 0)) : void 0;
   }), a.downloadContent(p, function(o, a) {
    return o ? (n(o), void 0) : (e.each(a, function(e) {
     var n = e.syncAttributes, o = n.syncIndex, a = r.getFileFromSyncIndex(o);
     if (void 0 !== a) {
      var s = a.title;
      if (e.deleted === !0) return i.onError('"' + s + '" has been removed from Google Drive.'), 
      a.removeSyncLocation(n), i.onSyncRemoved(a, n), n.isRealtime === !0 && r.currentFile === a && d.stopRealtimeSync(), 
      void 0;
      var l = n.titleCRC != t.crc32(s), c = a.content, u = n.contentCRC != t.crc32(c), p = e.file, f = t.crc32(p.title), h = n.titleCRC != f, g = s != p.title, m = t.crc32(p.content), b = n.contentCRC != m, v = c != p.content;
      (g === !0 && l === !0 && h === !0 || !n.isRealtime && v === !0 && u === !0 && b === !0) && (r.createFile(s + " (backup)", c), 
      i.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      g && h === !0 && (a.title = p.title, i.onTitleChanged(a), i.onMessage('"' + s + '" has been renamed to "' + p.title + '" on Google Drive.')), 
      !n.isRealtime && v && b === !0 && (a.content = p.content, i.onContentChanged(a), 
      i.onMessage('"' + p.title + '" has been updated from Google Drive.'), r.currentFile === a && r.selectFile()), 
      n.etag = p.etag, n.isRealtime || (n.contentCRC = m), n.titleCRC = f, t.storeAttributes(n);
     }
    }), localStorage[u + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, d.publish = function(e, t, n, o) {
  a.upload(e.id, void 0, e.fileName || t, n, void 0, function(t, n) {
   return t ? (o(t), void 0) : (e.id = n.id, o(), void 0);
  });
 }, d.newPublishAttributes = function(e) {
  var n = {};
  return n.id = t.getInputTextValue("#input-publish-gdrive-fileid"), n.fileName = t.getInputTextValue("#input-publish-gdrive-filename"), 
  e.isPropagationStopped() ? void 0 : n;
 };
 var p = void 0;
 i.addListener("onEditorConfigure", function(e) {
  p = e;
 });
 var f = void 0, h = void 0, g = void 0, m = void 0;
 return d.startRealtimeSync = function(n, o) {
  a.loadRealtime(o.id, n.content, function(a, s) {
   function l() {
    o.contentCRC = t.crc32(b.getText()), t.storeAttributes(o);
   }
   function c(e) {
    e.isLocal === !1 && (logger.log("Google Drive realtime document updated from server"), 
    l(), v());
   }
   function u() {
    p.uiManager.setButtonState(p.uiManager.buttons.undo, d.canUndo), p.uiManager.setButtonState(p.uiManager.buttons.redo, d.canRedo);
   }
   if (!a && s) {
    if (r.currentFile !== n) return s.close(), void 0;
    logger.log("Starting Google Drive realtime synchronization"), f = s;
    var d = f.getModel(), b = d.getRoot().get("content"), v = e.debounce(p.refreshPreview, 100);
    b.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, c), b.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, c), 
    f.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
     e.isPending === !1 && e.isSaving === !1 && (logger.log("Google Drive realtime document successfully saved on server"), 
     l());
    });
    var y = n.content, x = o.contentCRC != t.crc32(y), w = b.getText(), k = t.crc32(w), S = o.contentCRC != k, C = y != w;
    C === !0 && x === !0 && (S === !0 ? (r.createFile(n.title + " (backup)", y), i.onMessage('Conflict detected on "' + n.title + '". A backup has been created locally.')) : b.setText(y)), 
    h = gapi.drive.realtime.databinding.bindString(b, $("#wmd-input")[0]), S === !0 && (logger.log("Google Drive realtime document updated from server"), 
    l(), v()), g = p.uiManager.buttons.undo.execute, m = p.uiManager.buttons.redo.execute, 
    p.uiManager.buttons.undo.execute = function() {
     d.canUndo && d.undo();
    }, p.uiManager.buttons.redo.execute = function() {
     d.canRedo && d.redo();
    }, d.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, u), 
    u();
   }
  }, function(e) {
   console.error(e), "token_refresh_required" == e.type ? a.forceAuthenticate() : "not_found" == e.type ? (i.onError('"' + n.title + '" has been removed from Google Drive.'), 
   n.removeSyncLocation(o), i.onSyncRemoved(n, o), d.stopRealtimeSync()) : e.isFatal && (i.onError("An error has forced real time synchronization to stop."), 
   d.stopRealtimeSync());
  });
 }, d.stopRealtimeSync = function() {
  logger.log("Stopping Google Drive realtime synchronization"), void 0 !== h && (h.unbind(), 
  h = void 0), void 0 !== f && (f.close(), f = void 0), p.uiManager.buttons.undo.execute = g, 
  p.uiManager.buttons.redo.execute = m, p.uiManager.setUndoRedoButtonStates();
 }, i.addListener("onReady", function() {
  var n = t.retrieveIgnoreError(u + ".state");
  if (void 0 !== n) if (localStorage.removeItem(u + ".state"), "create" == n.action) a.upload(void 0, n.folderId, GDRIVE_DEFAULT_FILE_TITLE, o.defaultContent, void 0, function(e, t) {
   if (!e) {
    var n = l(t.id, t.etag, t.content, t.title), o = {};
    o[n.syncIndex] = n;
    var a = r.createFile(t.title, t.content, o);
    r.selectFile(a), i.onMessage('"' + t.title + '" created successfully on Google Drive.');
   }
  }); else if ("open" == n.action) {
   var d = [];
   e.each(n.ids, function(e) {
    var t = s(e), n = r.getFileFromSyncIndex(t);
    void 0 !== n ? r.selectFile(n) : d.push(e);
   }), c(d);
  }
 }), d;
}), define("synchronizer", [ "jquery", "underscore", "utils", "eventMgr", "fileSystem", "fileMgr", "classes/Provider", "providers/dropboxProvider", "providers/gdriveProvider" ], function(e, t, n, o, i, r, a) {
 function s(e) {
  if (0 === v.length) return l(e), void 0;
  var t = v.pop();
  return t.isRealtime === !0 ? (s(e), void 0) : (t.provider.syncUp(y, x, w, k, t, function(o, i) {
   return i === !0 && (C = !0), o ? (e(o), void 0) : (i && n.storeAttributes(t), s(e), 
   void 0);
  }), void 0);
 }
 function l(e) {
  if (0 === S.length) return c(e), void 0;
  var o = S.pop();
  return v = t.values(o.syncLocations), 0 === v.length ? (l(e), void 0) : (y = o.content, 
  x = n.crc32(y), w = o.title, k = n.crc32(w), s(e), void 0);
 }
 function c(e) {
  C === !0 ? (C = !1, S = t.values(i), l(e)) : e();
 }
 function u(e) {
  if (0 === E.length) return e(), void 0;
  var t = E.pop();
  return m.hasSync(t) ? (t.syncDown(function(t) {
   return t ? (e(t), void 0) : (u(e), void 0);
  }), void 0) : (u(e), void 0);
 }
 function d(e) {
  E = t.values(b), u(e);
 }
 function p(e) {
  I = t.some(e.syncLocations, function(e) {
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
  n.resetModalInputs();
  var i = n.retrieveIgnoreError(o.providerId + ".exportPreferences");
  i && t.each(o.exportPreferencesInputIds, function(e) {
   n.setInputValue("#input-sync-export-" + e, i[e]);
  }), e("#modal-upload-" + o.providerId).modal();
 }
 var m = {}, b = t.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value();
 t.each(i, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".sync"), function(t) {
   try {
    var i = JSON.parse(localStorage[t]);
    i.syncIndex = t;
    var r = b[i.provider];
    if (!r) throw new Error("Invalid provider ID: " + i.provider);
    i.provider = r, e.syncLocations[t] = i;
   } catch (a) {
    o.onError(a), n.removeIndexFromArray(e.fileIndex + ".sync", t), localStorage.removeItem(t);
   }
  });
 }), m.hasSync = function(e) {
  return t.some(i, function(n) {
   return t.some(n.syncLocations, function(t) {
    return void 0 === e || t.provider === e;
   });
  });
 };
 var v = [], y = void 0, x = void 0, w = void 0, k = void 0, S = [], C = !1, E = [], T = !1;
 o.addListener("onOfflineChanged", function(e) {
  T = e;
 });
 var _ = !1;
 m.sync = function() {
  function e(e) {
   return void 0 !== e ? (_ = !1, o.onSyncRunning(!1), !0) : !1;
  }
  return _ === !0 || T === !0 ? !1 : (_ = !0, o.onSyncRunning(!0), C = !0, d(function(t) {
   e(t) || c(function(t) {
    e(t) || (_ = !1, o.onSyncRunning(!1), o.onSyncSuccess());
   });
  }), !0);
 };
 var I = void 0, P = void 0, z = !0;
 return m.tryStopRealtimeSync = function() {
  void 0 !== I && z === !0 && P.provider.stopRealtimeSync();
 }, viewerMode === !1 && (o.addListener("onFileOpen", p), o.addListener("onFileClosed", m.tryStopRealtimeSync), 
 o.addListener("onOfflineChanged", f)), o.addListener("onReady", function() {
  t.each(b, function(i) {
   e(".action-sync-import-" + i.providerId).click(function(e) {
    i.importFiles(e);
   }), e(".action-sync-export-dialog-" + i.providerId).click(function() {
    g(i);
   }), e(".action-sync-export-" + i.providerId).click(function(a) {
    var s = n.getInputChecked("#input-sync-export-" + i.providerId + "-realtime"), l = r.currentFile;
    if (s) {
     if (t.size(l.syncLocations) > 0) return o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     i.exportRealtimeFile(a, l.title, l.content, function(e, t) {
      e || (t.isRealtime = !0, l.addSyncLocation(t), o.onSyncExportSuccess(l, t), I = l, 
      P = t, h());
     });
    } else {
     if (t.size(l.syncLocations) > 0 && t.first(t.values(l.syncLocations)).isRealtime) return o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     i.exportFile(a, l.title, l.content, function(e, t) {
      e || (l.addSyncLocation(t), o.onSyncExportSuccess(l, t));
     });
    }
    var c = {};
    t.each(i.exportPreferencesInputIds, function(t) {
     c[t] = e("#input-sync-export-" + t).val();
    }), localStorage[i.providerId + ".exportPreferences"] = JSON.stringify(c);
   }), e(".action-sync-manual-" + i.providerId).click(function(e) {
    var n = r.currentFile;
    return t.size(n.syncLocations) > 0 && t.first(t.values(n.syncLocations)).isRealtime ? (o.onError("Real time collaborative document can't be synchronized with multiple locations"), 
    void 0) : (i.exportManual(e, n.title, n.content, function(e, t) {
     e || (n.addSyncLocation(t), o.onSyncExportSuccess(n, t));
    }), void 0);
   });
  });
 }), o.onSynchronizerCreated(m), m;
}), define("providers/downloadProvider", [ "jquery", "classes/Provider", "classes/AsyncTask" ], function(e, t, n) {
 var o = new t("download");
 return o.sharingAttributes = [ "url" ], o.importPublic = function(t, o) {
  var i = void 0, r = void 0, a = new n();
  a.onRun(function() {
   var n = t.url, o = n.lastIndexOf("/");
   return -1 === o ? (a.error(new Error("Invalid URL parameter.")), void 0) : (i = n.substring(o + 1), 
   e.ajax({
    url: DOWNLOAD_PROXY_URL + "download?url=" + n,
    type: "GET",
    dataType: "text",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    r = e, a.chain();
   }).fail(function() {
    a.error(new Error("Unable to access URL " + n));
   }), void 0);
  }), a.onSuccess(function() {
   o(void 0, i, r);
  }), a.onError(function(e) {
   o(e);
  }), a.enqueue();
 }, o;
}), define("helpers/githubHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(t) {
  t.onRun(function() {
   return d === !0 ? (l = !1, t.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : l === !0 ? (t.chain(), void 0) : (e.ajax({
    url: "lib/github.js",
    dataType: "script",
    timeout: AJAX_TIMEOUT
   }).done(function() {
    l = !0, t.chain();
   }).fail(function(e) {
    var n = {
     error: e.status,
     message: e.statusText
    };
    s(n, t);
   }), void 0);
  });
 }
 function a(t) {
  var i = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    localStorage.removeItem("githubCode"), i = n.popupWindow("github-oauth-client.html?client_id=" + GITHUB_CLIENT_ID, "stackedit-github-oauth", 960, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, d = localStorage.githubCode, void 0 === d) return t.error(new Error(u)), 
      void 0;
      localStorage.removeItem("githubCode"), t.chain(s);
     }
    }, 500);
   }
   function s() {
    e.getJSON(GATEKEEPER_URL + "authenticate/" + d, function(e) {
     void 0 !== e.token ? (l = e.token, localStorage.githubToken = l, c = new Github({
      token: l,
      auth: "oauth"
     }), t.chain()) : t.error(new Error(u));
    });
   }
   if (void 0 !== c) return t.chain(), void 0;
   var l = localStorage.githubToken;
   if (void 0 !== l) return c = new Github({
    token: l,
    auth: "oauth"
   }), t.chain(), void 0;
   o.onMessage("Please make sure the Github authorization popup is not blocked by your browser.");
   var u = "Failed to retrieve a token from GitHub.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var d = void 0;
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, n) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on GitHub.", 401 === e.error || 403 === e.error) return c = void 0, 
   localStorage.removeItem("githubToken"), o = "Access to GitHub account is not authorized.", 
   n.retry(new Error(o), 1), void 0;
   e.error <= 0 && (l = !1, c = void 0, t.setOffline(), o = "|stopPublish");
  }
  n.error(new Error(o));
 }
 var l = void 0, c = void 0, u = {}, d = !1;
 return o.addListener("onOfflineChanged", function(e) {
  d = e;
 }), u.upload = function(e, t, n, o, l, u, d) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   function i() {
    var e = c.getUser();
    e.show(void 0, function(e, n) {
     return e ? (s(e, p), void 0) : (t = n.login, p.chain(r), void 0);
    });
   }
   function r() {
    var i = c.getRepo(t, e);
    i.write(n, o, l, u, function(e) {
     return e ? (s(e, p), void 0) : (p.chain(), void 0);
    });
   }
   t ? p.chain(r) : p.chain(i);
  }), p.onSuccess(function() {
   d();
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, u.uploadGist = function(e, t, n, o, l, u) {
  var d = new i();
  r(d), a(d), d.onRun(function() {
   var i = c.getGist(e), r = {};
   r[t] = {
    content: l
   }, githubFunction = i.update, void 0 === e && (githubFunction = i.create), githubFunction({
    description: o,
    "public": n,
    files: r
   }, function(t, n) {
    return t ? (404 === t.error && void 0 !== e && (t = "Gist " + e + " not found on GitHub.|removePublish"), 
    s(t, d), void 0) : (e = n.id, d.chain(), void 0);
   });
  }), d.onSuccess(function() {
   u(void 0, e);
  }), d.onError(function(e) {
   u(e);
  }), d.enqueue();
 }, u.downloadGist = function(e, t, n) {
  var o = new i();
  r(o);
  var a = void 0, s = void 0;
  o.onRun(function() {
   var n = new Github({}), i = n.getGist(e);
   i.read(function(n, i) {
    if (n) return o.error(new Error("Error trying to access Gist " + e + ".")), void 0;
    a = i.description;
    var r = i.files[t];
    return void 0 === r ? (o.error(new Error("Gist " + e + ' does not contain "' + t + '".')), 
    void 0) : (s = r.content, o.chain(), void 0);
   });
  }), o.onSuccess(function() {
   n(void 0, a, s);
  }), o.onError(function(e) {
   n(e);
  }), o.enqueue();
 }, u;
}), define("providers/gistProvider", [ "utils", "classes/Provider", "helpers/githubHelper" ], function(e, t, n) {
 var o = new t("gist", "Gist");
 return o.sharingAttributes = [ "gistId", "filename" ], o.publish = function(e, t, o, i) {
  n.uploadGist(e.gistId, e.filename, e.isPublic, t, o, function(t, n) {
   return t ? (i(t), void 0) : (e.gistId = n, i(), void 0);
  });
 }, o.newPublishAttributes = function(t) {
  var n = {};
  return n.gistId = e.getInputTextValue("#input-publish-gist-id"), n.filename = e.getInputTextValue("#input-publish-filename", t), 
  n.isPublic = e.getInputChecked("#input-publish-gist-public"), t.isPropagationStopped() ? void 0 : n;
 }, o.importPublic = function(e, t) {
  n.downloadGist(e.gistId, e.filename, t);
 }, o;
}), define("sharing", [ "jquery", "underscore", "utils", "eventMgr", "fileMgr", "classes/AsyncTask", "classes/Provider", "providers/downloadProvider", "providers/gistProvider" ], function(e, t, n, o, i, r, a) {
 var s = {}, l = t.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value(), c = !1;
 return o.addListener("onOfflineChanged", function(e) {
  c = e;
 }), s.createLink = function(n, i) {
  function a() {
   i();
  }
  var s = l[n.provider.providerId];
  if (void 0 !== n.sharingLink || void 0 === s || "markdown" != n.format) return i(), 
  void 0;
  var u = new r(), d = void 0;
  u.onRun(function() {
   if (c === !0) return u.chain(), void 0;
   var i = [ MAIN_URL, "viewer.html?provider=", s.providerId ];
   t.each(s.sharingAttributes, function(e) {
    i.push("&"), i.push(e), i.push("="), i.push(encodeURIComponent(n[e]));
   }), i = i.join(""), e.getJSON("https://api-ssl.bitly.com/v3/shorten", {
    access_token: BITLY_ACCESS_TOKEN,
    longUrl: i
   }, function(e) {
    e.data ? (d = e.data.url, n.sharingLink = d) : (o.onError("An error occured while creating sharing link."), 
    n.sharingLink = i), u.chain();
   });
  }), u.onSuccess(a), u.onError(a), u.enqueue();
 }, o.addListener("onReady", function() {
  if (viewerMode !== !1) {
   var o = n.getURLParameter("provider");
   void 0 === o && (o = "download");
   var r = l[o];
   if (void 0 !== r) {
    var a = {};
    t.each(r.sharingAttributes, function(e) {
     var t = n.getURLParameter(e);
     return t ? (a[e] = t, void 0) : (a = void 0, void 0);
    }), void 0 !== a && (e("#preview-contents, #file-title").hide(), r.importPublic(a, function(t, n, o) {
     if (e("#preview-contents, #file-title").show(), !t) {
      var r = i.createFile(n, o, void 0, !0);
      i.selectFile(r);
     }
    }));
   }
  }
 }), s;
}), define("providers/bloggerProvider", [ "underscore", "utils", "classes/Provider", "helpers/googleHelper" ], function(e, t, n, o) {
 var i = new n("blogger", "Blogger");
 return i.defaultPublishFormat = "html", i.publishPreferencesInputIds = [ "blogger-url" ], 
 i.publish = function(e, t, n, i) {
  o.uploadBlogger(e.blogUrl, e.blogId, e.postId, e.labelList, t, n, function(t, n, o) {
   return t ? (i(t), void 0) : (e.blogId = n, e.postId = o, i(), void 0);
  });
 }, i.newPublishAttributes = function(n) {
  var o = {}, i = t.getInputTextValue("#input-publish-blogger-url", n);
  void 0 !== i && (o.blogUrl = t.checkUrl(i)), o.postId = t.getInputTextValue("#input-publish-postid"), 
  o.labelList = [];
  var r = t.getInputTextValue("#input-publish-labels");
  return void 0 !== r && (o.labelList = e.chain(r.split(",")).map(function(e) {
   return t.trim(e);
  }).compact().value()), n.isPropagationStopped() ? void 0 : o;
 }, i;
}), define("providers/githubProvider", [ "utils", "classes/Provider", "settings", "helpers/githubHelper" ], function(e, t, n, o) {
 var i = new t("github", "GitHub");
 return i.publishPreferencesInputIds = [ "github-reponame", "github-username", "github-branch" ], 
 i.publish = function(e, t, i, r) {
  var a = n.commitMsg;
  o.upload(e.repository, e.username, e.branch, e.path, i, a, r);
 }, i.newPublishAttributes = function(t) {
  var n = {};
  return n.repository = e.getInputTextValue("#input-publish-github-reponame", t), 
  n.username = e.getInputTextValue("#input-publish-github-username"), n.branch = e.getInputTextValue("#input-publish-github-branch", t), 
  n.path = e.getInputTextValue("#input-publish-file-path", t), t.isPropagationStopped() ? void 0 : n;
 }, i;
}), define("helpers/sshHelper", [ "jquery", "core", "eventMgr", "settings", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(e) {
  e.onRun(function() {
   return l === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(e, n) {
  var o = void 0;
  e && (logger.error(e), "string" == typeof e ? o = "SSH error: " + e + "." : (o = "Could not publish on SSH server.", 
  e.code <= 0 && (t.setOffline(), o = "|stopPublish"))), n.error(new Error(o));
 }
 var s = {}, l = !1;
 return n.addListener("onOfflineChanged", function(e) {
  l = e;
 }), s.upload = function(t, n, s, l, c, u, d, p) {
  var f = new i();
  r(f), f.onRun(function() {
   var i = o.sshProxy + "upload", r = {
    host: t,
    port: n,
    username: s,
    password: l,
    path: c,
    title: u,
    content: d
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
    var t = {
     code: e.status,
     message: e.statusText
    };
    a(t, f);
   });
  }), f.onSuccess(function() {
   p();
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, s;
}), define("providers/sshProvider", [ "utils", "classes/Provider", "helpers/sshHelper" ], function(e, t, n) {
 var o = new t("ssh", "SSH server");
 return o.publishPreferencesInputIds = [ "ssh-host", "ssh-port", "ssh-username", "ssh-password" ], 
 o.publish = function(e, t, o, i) {
  n.upload(e.host, e.port, e.username, e.password, e.path, t, o, i);
 }, o.newPublishAttributes = function(t) {
  var n = {};
  return n.host = e.getInputTextValue("#input-publish-ssh-host", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.port = e.getInputIntValue("#input-publish-ssh-port", void 0, 0), n.username = e.getInputTextValue("#input-publish-ssh-username", t), 
  n.password = e.getInputTextValue("#input-publish-ssh-password", t), n.path = e.getInputTextValue("#input-publish-file-path", t), 
  t.isPropagationStopped() ? void 0 : n;
 }, o;
}), define("helpers/tumblrHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(e) {
  e.onRun(function() {
   return u === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(t) {
  var i = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    e.getJSON(TUMBLR_PROXY_URL + "request_token", function(e) {
     void 0 !== e.oauth_token ? (p = e, t.chain(s)) : t.error(new Error(d));
    });
   }
   function s() {
    localStorage.removeItem("tumblrVerifier"), i = n.popupWindow("tumblr-oauth-client.html?oauth_token=" + p.oauth_token, "stackedit-tumblr-oauth", 800, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, p.oauth_verifier = localStorage.tumblrVerifier, 
      void 0 === p.oauth_verifier) return t.error(new Error(d)), void 0;
      localStorage.removeItem("tumblrVerifier"), t.chain(c);
     }
    }, 500);
   }
   function c() {
    e.getJSON(TUMBLR_PROXY_URL + "access_token", p, function(e) {
     void 0 !== e.access_token && void 0 !== e.access_token_secret ? (localStorage.tumblrOauthParams = JSON.stringify(e), 
     l = e, t.chain()) : t.error(new Error(d));
    });
   }
   if (void 0 !== l) return t.chain(), void 0;
   var u = localStorage.tumblrOauthParams;
   if (void 0 !== u) return l = JSON.parse(u), t.chain(), void 0;
   o.onMessage("Please make sure the Tumblr authorization popup is not blocked by your browser.");
   var d = "Failed to retrieve a token from Tumblr.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var p = void 0;
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, n) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on Tumblr.", 401 === e.code || 403 === e.code) return l = void 0, 
   localStorage.removeItem("tumblrOauthParams"), o = "Access to Tumblr account is not authorized.", 
   n.retry(new Error(o), 1), void 0;
   e.code <= 0 && (t.setOffline(), o = "|stopPublish");
  }
  n.error(new Error(o));
 }
 var l = void 0, c = {}, u = !1;
 return o.addListener("onOfflineChanged", function(e) {
  u = e;
 }), c.upload = function(t, n, o, c, u, d, p) {
  var f = new i();
  r(f), a(f), f.onRun(function() {
   var i = e.extend({
    blog_hostname: t,
    post_id: n,
    tags: o,
    format: c,
    title: u,
    content: d
   }, l);
   e.ajax({
    url: TUMBLR_PROXY_URL + "post",
    data: i,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    n = e.id, f.chain();
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    404 === t.code && void 0 !== n && (t = "Post " + n + " not found on Tumblr.|removePublish"), 
    s(t, f);
   });
  }), f.onSuccess(function() {
   p(void 0, n);
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, c;
}), define("providers/tumblrProvider", [ "utils", "classes/Provider", "helpers/tumblrHelper" ], function(e, t, n) {
 var o = new t("tumblr", "Tumblr");
 return o.publishPreferencesInputIds = [ "tumblr-hostname" ], o.publish = function(e, t, o, i) {
  n.upload(e.blogHostname, e.postId, e.tags, "markdown" == e.format ? "markdown" : "html", t, o, function(t, n) {
   return t ? (i(t), void 0) : (e.postId = n, i(), void 0);
  });
 }, o.newPublishAttributes = function(t) {
  var n = {};
  return n.blogHostname = e.getInputTextValue("#input-publish-tumblr-hostname", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.postId = e.getInputTextValue("#input-publish-postid"), n.tags = e.getInputTextValue("#input-publish-tags"), 
  t.isPropagationStopped() ? void 0 : n;
 }, o;
}), define("helpers/wordpressHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, o, i) {
 function r(e) {
  e.onRun(function() {
   return u === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function a(t) {
  var i = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    localStorage.removeItem("wordpressCode"), i = n.popupWindow("wordpress-oauth-client.html?client_id=" + WORDPRESS_CLIENT_ID, "stackedit-wordpress-oauth", 960, 600), 
    i.focus(), r = setInterval(function() {
     if (i.closed === !0) {
      if (clearInterval(r), i = void 0, r = void 0, u = localStorage.wordpressCode, void 0 === u) return t.error(new Error(c)), 
      void 0;
      localStorage.removeItem("wordpressCode"), t.chain(s);
     }
    }, 500);
   }
   function s() {
    e.getJSON(WORDPRESS_PROXY_URL + "authenticate/" + u, function(e) {
     void 0 !== e.token ? (l = e.token, localStorage.wordpressToken = l, t.chain()) : t.error(new Error(c));
    });
   }
   if (l = localStorage.wordpressToken, void 0 !== l) return t.chain(), void 0;
   o.onMessage("Please make sure the Wordpress authorization popup is not blocked by your browser.");
   var c = "Failed to retrieve a token from Wordpress.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var u = void 0;
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== i && i.close();
  });
 }
 function s(e, n) {
  var o = void 0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Could not publish on WordPress.", 400 === e.code && "invalid_token" == e.message || 401 === e.code || 403 === e.code) return localStorage.removeItem("wordpressToken"), 
   o = "Access to WordPress account is not authorized.", n.retry(new Error(o), 1), 
   void 0;
   e.code <= 0 && (t.setOffline(), o = "|stopPublish");
  }
  n.error(new Error(o));
 }
 var l = void 0, c = {}, u = !1;
 return o.addListener("onOfflineChanged", function(e) {
  u = e;
 }), c.upload = function(t, n, o, c, u, d) {
  var p = new i();
  r(p), a(p), p.onRun(function() {
   var i = WORDPRESS_PROXY_URL + "post", r = {
    token: l,
    site: t,
    postId: n,
    tags: o,
    title: c,
    content: u
   };
   e.ajax({
    url: i,
    data: r,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    if (e.body.ID) return n = e.body.ID, p.chain(), void 0;
    var o = {
     code: e.code,
     message: e.body.error
    };
    404 === o.code && ("unknown_blog" == o.message ? o = 'Site "' + t + '" not found on WordPress.|removePublish' : "unknown_post" == o.message && (o = "Post " + n + " not found on WordPress.|removePublish")), 
    s(o, p);
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    s(t, p);
   });
  }), p.onSuccess(function() {
   d(void 0, n);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, c;
}), define("providers/wordpressProvider", [ "utils", "classes/Provider", "helpers/wordpressHelper" ], function(e, t, n) {
 var o = new t("wordpress", "WordPress");
 return o.defaultPublishFormat = "html", o.publishPreferencesInputIds = [ "wordpress-site" ], 
 o.publish = function(e, t, o, i) {
  n.upload(e.site, e.postId, e.tags, t, o, function(t, n) {
   return t ? (i(t), void 0) : (e.postId = n, i(), void 0);
  });
 }, o.newPublishAttributes = function(t) {
  var n = {};
  return n.site = e.getInputTextValue("#input-publish-wordpress-site", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.postId = e.getInputTextValue("#input-publish-postid"), n.tags = e.getInputTextValue("#input-publish-tags"), 
  t.isPropagationStopped() ? void 0 : n;
 }, o;
}), define("publisher", [ "jquery", "underscore", "utils", "settings", "eventMgr", "fileSystem", "fileMgr", "sharing", "classes/Provider", "providers/bloggerProvider", "providers/dropboxProvider", "providers/gistProvider", "providers/githubProvider", "providers/gdriveProvider", "providers/sshProvider", "providers/tumblrProvider", "providers/wordpressProvider" ], function(e, t, n, o, i, r, a, s, l) {
 function c(t, n, o) {
  return void 0 === n.format && (n.format = e("input:radio[name=radio-publish-format]:checked").prop("value")), 
  "markdown" == n.format ? t.content : "html" == n.format ? o : h.applyTemplate(t, n, o);
 }
 function u(e, t) {
  if (0 === m.length) return e(t), void 0;
  var n = m.pop(), o = c(b, n, v);
  n.provider.publish(n, b.title, o, function(o) {
   if (void 0 !== o) {
    var r = o.toString();
    if (-1 !== r.indexOf("|removePublish") && (b.removePublishLocation(n), i.onPublishRemoved(b, n)), 
    -1 !== r.indexOf("|stopPublish")) return e(o), void 0;
   }
   u(e, t || o);
  });
 }
 function d(e, o) {
  var r = void 0;
  do r = "publish." + n.randomString(); while (t.has(localStorage, r));
  o.publishIndex = r, e.addPublishLocation(o), i.onNewPublishSuccess(e, o);
 }
 function p(o) {
  var i = o.defaultPublishFormat || "markdown";
  k = o, e(".publish-provider-name").text(o.providerName), e('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + o.providerId).show(), 
  n.resetModalInputs(), e("input:radio[name=radio-publish-format][value=" + i + "]").prop("checked", !0);
  var r = n.retrieveIgnoreError(o.providerId + ".publishPreferences");
  r && (t.each(o.publishPreferencesInputIds, function(e) {
   n.setInputValue("#input-publish-" + e, r[e]);
  }), n.setInputRadio("radio-publish-format", r.format)), e("#modal-publish").modal();
 }
 function f(n) {
  var o = k, i = o.newPublishAttributes(n);
  if (void 0 !== i) {
   var r = a.currentFile, l = y, u = c(r, i, l);
   o.publish(i, r.title, u, function(e) {
    void 0 === e && (i.provider = o, s.createLink(i, function() {
     d(r, i);
    }));
   });
   var p = {};
   t.each(o.publishPreferencesInputIds, function(t) {
    p[t] = e("#input-publish-" + t).val();
   }), p.format = i.format, localStorage[o.providerId + ".publishPreferences"] = JSON.stringify(p);
  }
 }
 var h = {}, g = t.chain(arguments).map(function(e) {
  return e instanceof l && [ e.providerId, e ];
 }).compact().object().value();
 t.each(r, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".publish"), function(t) {
   try {
    var o = JSON.parse(localStorage[t]);
    o.publishIndex = t;
    var r = g[o.provider];
    if (!r) throw new Error("Invalid provider ID: " + o.provider);
    o.provider = r, e.publishLocations[t] = o;
   } catch (a) {
    i.onError(a), n.removeIndexFromArray(e.fileIndex + ".publish", t), localStorage.removeItem(t);
   }
  });
 }), h.applyTemplate = function(e, n, r) {
  try {
   return t.template(o.template, {
    documentTitle: e.title,
    documentMarkdown: e.content,
    documentHTML: r,
    publishAttributes: n
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
  m = t.values(b.publishLocations), u(function(e) {
   w = !1, i.onPublishRunning(!1), void 0 === e && i.onPublishSuccess(b);
  }));
 };
 var k = void 0;
 return i.addListener("onReady", function() {
  var i = e("#publish-menu");
  t.each(g, function(t) {
   i.append(e("<li>").append(e('<a href="#"><i class="icon-' + t.providerId + '"></i> ' + t.providerName + "</a>").click(function() {
    p(t);
   }))), e(".action-publish-" + t.providerId).click(function() {
    p(t);
   });
  }), e(".action-process-publish").click(f), e(".action-download-md").click(function() {
   var t = e("#wmd-input").val(), o = a.currentFile.title;
   n.saveAs(t, o + ".md");
  }), e(".action-download-html").click(function() {
   var e = a.currentFile.title;
   n.saveAs(y, e + ".html");
  }), e(".action-download-template").click(function() {
   var e = a.currentFile, t = h.applyTemplate(e, void 0, y);
   n.saveAs(t, e.title + (-1 === o.template.indexOf("documentHTML") ? ".md" : ".html"));
  });
 }), i.onPublisherCreated(h), h;
}), define("providers/gplusProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "helpers/googleHelper" ], function(e, t, n, o, i) {
 function r(t, n) {
  var o = void 0;
  return e.find(t.thumbnails, function(e) {
   var t = !1;
   return e.url.replace(/(.*\/s)\d.*?(\/[^\/]+)/, function(e, i, r) {
    o = i + n + r, t = !0;
   }), t;
  }), o;
 }
 function a() {
  return c.thumbnails ? (t.resetModalInputs(), $("#modal-import-image img").prop("src", r(c, 128)), 
  t.setInputValue("#input-import-image-title", c.name), u && t.setInputValue("#input-import-image-size", u.size), 
  $("#modal-import-image").modal(), void 0) : (o.onError("Image " + c.name + " is not accessible."), 
  callback(!0), void 0);
 }
 var s = "gplus", l = new n(s, "Google+"), c = void 0, u = t.retrieveIgnoreError(s + ".importImagePreferences"), d = void 0;
 return l.importImage = function(e) {
  d = e, i.picker(function(t, n) {
   return t || 0 === n.length ? (e(t), void 0) : (c = n[0], a(), void 0);
  }, !0);
 }, l.uploadImage = function(e, t, n) {
  d = n, i.uploadImg(e, t, "default", function(t, o) {
   return t || !o ? (n(t), void 0) : (c = {
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
   var e = t.getInputIntValue("#input-import-image-size", void 0, 0) || 0, n = t.getInputTextValue("#input-import-image-title"), o = r(c, e);
   n && (o += ' "' + n + '"'), d(void 0, o), u = {}, e && (u.size = e), localStorage[s + ".importImagePreferences"] = JSON.stringify(u);
  });
 }), l;
}), define("mediaImporter", [ "jquery", "underscore", "classes/Provider", "core", "eventMgr", "providers/gplusProvider" ], function(e, t, n, o, i) {
 var r = {}, a = t.chain(arguments).map(function(e) {
  return e instanceof n && [ e.providerId, e ];
 }).compact().object().value();
 return i.addListener("onReady", function() {
  function n(n) {
   var i = (n.dataTransfer || n.target).files, r = t.first(i);
   if (r.name.match(/.(jpe?g|png|gif)$/)) {
    n.stopPropagation(), n.preventDefault();
    var s = new FileReader();
    s.onload = function() {
     return function(t) {
      var n = new Uint8Array(t.target.result);
      a.gplus.uploadImage(r.name, n, function(t, n) {
       if (!t) {
        o.catchModal = !0, e("#wmd-image-button").click(), o.catchModal = !1;
        var i = o.insertLinkCallback;
        o.insertLinkCallback = void 0, i(n || null);
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
  t.each(a, function(t) {
   e(".action-import-image-" + t.providerId).click(function() {
    var e = o.insertLinkCallback;
    o.insertLinkCallback = void 0, t.importImage(function(t, n) {
     return t ? (e(null), void 0) : (e(n || null), void 0);
    });
   });
  }), e("#wmd-input").each(function() {
   this.addEventListener("dragover", i, !1), this.addEventListener("drop", n, !1);
  });
 }), r;
}), define("css/normalize", [ "require", "module" ], function() {
 function e(e, o, i) {
  if (0 === e.indexOf("data:")) return e;
  if (e = r(e), e.match(/^\//) || e.match(a)) return e;
  var s = i.match(a), l = o.match(a);
  return !l || s && s[1] == l[1] && s[2] == l[2] ? n(t(e, o), i) : t(e, o);
 }
 function t(e, t) {
  "./" == e.substr(0, 2) && (e = e.substr(2));
  var n = t.split("/"), o = e.split("/");
  for (n.pop(); curPart = o.shift(); ) ".." == curPart ? n.pop() : n.push(curPart);
  return n.join("/");
 }
 function n(e, t) {
  var n = t.split("/");
  for (n.pop(), t = n.join("/") + "/", i = 0; t.substr(i, 1) == e.substr(i, 1); ) i++;
  for (;"/" != t.substr(i, 1); ) i--;
  t = t.substr(i + 1), e = e.substr(i + 1), n = t.split("/");
  var o = e.split("/");
  for (out = ""; n.shift(); ) out += "../";
  for (;curPart = o.shift(); ) out += curPart + "/";
  return out.substr(0, out.length - 1);
 }
 var o = /([^:])\/+/g, r = function(e) {
  return e.replace(o, "$1/");
 }, a = /[^\:\/]*:\/\/([^\/])*/, s = function(t, n, o, i) {
  n = r(n), o = r(o);
  for (var a, s, t, l = /@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi; a = l.exec(t); ) {
   s = a[3] || a[2] || a[5] || a[6] || a[4];
   var c;
   c = i && "/" == s.substr(0, 1) ? i + s : e(s, n, o);
   var u = a[5] || a[6] ? 1 : 0;
   t = t.substr(0, l.lastIndex - s.length - u - 1) + c + t.substr(l.lastIndex - u - 1), 
   l.lastIndex = l.lastIndex + (c.length - s.length);
  }
  return t;
 };
 return s.convertURIBase = e, s;
}), define("css/css", [ "./normalize" ], function(e) {
 function t(e, t) {
  for (var n = 0, o = e.length; o > n; n++) if (e[n] === t) return n;
  return -1;
 }
 if ("undefined" == typeof window) return {
  load: function(e, t, n) {
   n();
  }
 };
 var n = !1, o = document.getElementsByTagName("head")[0], i = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/), r = !1;
 i && (i[1] || i[7] ? (r = parseInt(i[1]) < 6 || parseInt(i[7]) <= 9, i = "trident") : i[2] ? (r = !0, 
 i = "webkit") : i[3] || (i[4] ? (r = parseInt(i[4]) < 18, i = "gecko") : n && alert("Engine detection failed")));
 var a = {}, s = /^\/|([^\:\/]*:)/;
 a.pluginBuilder = "./css-builder";
 var l = [], c = {}, u = [];
 a.addBuffer = function(e) {
  -1 == t(l, e) && -1 == t(u, e) && (l.push(e), u.push(e));
 }, a.setBuffer = function(t, n) {
  var o = window.location.pathname.split("/");
  o.pop(), o = o.join("/") + "/";
  var i = require.toUrl("base_url").split("/");
  i.pop();
  var r = i.join("/") + "/";
  r = e.convertURIBase(r, o, "/"), r.match(s) || (r = "/" + r), "/" != r.substr(r.length - 1, 1) && (r += "/"), 
  a.inject(e(t, r, o));
  for (var u = 0; u < l.length; u++) (n && ".less" == l[u].substr(l[u].length - 5, 5) || !n && ".css" == l[u].substr(l[u].length - 4, 4)) && (function(e) {
   c[e] = c[e] || !0, setTimeout(function() {
    "function" == typeof c[e] && c[e](), delete c[e];
   }, 7);
  }(l[u]), l.splice(u--, 1));
 }, a.attachBuffer = function(e, n) {
  for (var o = 0; o < l.length; o++) if (l[o] == e) return c[e] = n, !0;
  return c[e] === !0 ? (c[e] = n, !0) : -1 != t(u, e) ? (n(), !0) : void 0;
 };
 var d = function(e, t) {
  setTimeout(function() {
   for (var n = 0; n < document.styleSheets.length; n++) {
    var o = document.styleSheets[n];
    if (o.href == e.href) return t();
   }
   d(e, t);
  }, 10);
 }, p = function(e, t) {
  setTimeout(function() {
   try {
    return e.sheet.cssRules, t();
   } catch (n) {}
   p(e, t);
  }, 10);
 };
 if ("trident" == i && r) var f = [], h = [], g = 0, m = function(e, t) {
  var n;
  h.push({
   url: e,
   cb: t
  }), n = f.shift(), !n && g++ < 31 && (n = document.createElement("style"), o.appendChild(n)), 
  n && b(n);
 }, b = function(e) {
  var t = h.shift();
  if (!t) return e.onload = y, f.push(e), void 0;
  e.onload = function() {
   t.cb(t.ss), b(e);
  };
  var n = e.styleSheet;
  t.ss = n.imports[n.addImport(t.url)];
 };
 var v = function(e) {
  var t = document.createElement("link");
  return t.type = "text/css", t.rel = "stylesheet", t.href = e, t;
 }, y = function() {};
 a.linkLoad = function(e, t) {
  var a = setTimeout(function() {
   n && alert("timeout"), t();
  }, 1e3 * I - 100), s = function() {
   clearTimeout(a), l && (l.onload = y), setTimeout(t, 7);
  };
  if (r) if ("webkit" == i) {
   var l = v(e);
   d(l, s), o.appendChild(l);
  } else if ("gecko" == i) {
   var c = document.createElement("style");
   c.textContent = '@import "' + e + '"', p(c, s), o.appendChild(c);
  } else "trident" == i && m(e, s); else {
   var l = v(e);
   l.onload = s, o.appendChild(l);
  }
 };
 var x, w = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], k = {}, S = function(e, t, n) {
  if (k[e]) return t(k[e]), void 0;
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
   r.xhr = o, n(r)) : (k[e] = o.responseText, t(o.responseText)));
  }, o.send(null);
 }, C = 0;
 a.inject = function(e) {
  31 > C && (x = document.createElement("style"), x.type = "text/css", o.appendChild(x), 
  C++), x.styleSheet ? x.styleSheet.cssText += e : x.appendChild(document.createTextNode(e));
 };
 var E = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, T = window.location.pathname.split("/");
 T.pop(), T = T.join("/") + "/";
 var _ = function(t, n, o) {
  t.match(s) || (t = "/" + e.convertURIBase(t, T, "/")), S(t, function(i) {
   i = e(i, t, T);
   for (var r, a = [], s = [], l = []; r = E.exec(i); ) {
    var c = r[4] || r[5] || r[7] || r[8] || r[9];
    a.push(c), s.push(E.lastIndex - r[0].length), l.push(r[0].length);
   }
   for (var u = 0, d = 0; d < a.length; d++) (function(e) {
    _(a[e], function(t) {
     i = i.substr(0, s[e]) + t + i.substr(s[e] + l[e]);
     for (var o = t.length - l[e], r = e + 1; r < a.length; r++) s[r] += o;
     u++, u == a.length && n(i);
    }, o);
   })(d);
   0 == a.length && n(i);
  }, o);
 };
 a.normalize = function(e, t) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e);
 };
 var I, P = !1;
 return a.load = function(e, t, o, i, s) {
  I = I || i.waitSeconds || 7;
  var l = e + (s ? ".less" : ".css");
  if (!a.attachBuffer(l, o)) {
   var c = t.toUrl(l);
   !P && n && (alert(r ? "hacking links" : "not hacking"), P = !0), s ? _(c, function(e) {
    s && (e = s(e, function(e) {
     a.inject(e), setTimeout(o, 7);
    }));
   }) : a.linkLoad(c, o);
  }
 }, n && (a.inspect = function() {
  return stylesheet.styleSheet ? stylesheet.styleSheet.cssText : stylesheet.innerHTML ? stylesheet.innerHTML : void 0;
 }), a;
}), define("css", [ "css/css" ], function(e) {
 return e;
}), requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/fontello.css");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/jgrowl.css");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/prettify.css");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/highlight.css");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, define("css/css-builder", [ "require", "./normalize" ], function(e, t) {
 function n(e) {
  if ("undefined" != typeof process && process.versions && process.versions.node && require.nodeRequire) try {
   var t = require.nodeRequire("csso"), n = e.length;
   return e = t.justDoIt(e), a("Compressed CSS output to " + Math.round(100 * (e.length / n)) + "%."), 
   e;
  } catch (o) {
   return a('Compression module not installed. Use "npm install csso -g" to enable.'), 
   e;
  }
  return a("Compression not supported outside of nodejs environments."), e;
 }
 function o(e) {
  if ("undefined" != typeof process && process.versions && process.versions.node && require.nodeRequire) {
   var t = require.nodeRequire("fs"), n = t.readFileSync(e, "utf8");
   return 0 === n.indexOf("﻿") ? n.substring(1) : n;
  }
  var o, i, n = new java.io.File(e), r = java.lang.System.getProperty("line.separator"), a = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(n), "utf-8"));
  try {
   for (o = new java.lang.StringBuffer(), i = a.readLine(), i && i.length() && 65279 === i.charAt(0) && (i = i.substring(1)), 
   o.append(i); null !== (i = a.readLine()); ) o.append(r).append(i);
   return String(o.toString());
  } finally {
   a.close();
  }
 }
 function i(e, t) {
  if ("undefined" != typeof process && process.versions && process.versions.node && require.nodeRequire) {
   var n = require.nodeRequire("fs");
   n.writeFileSync(e, t, "utf8");
  } else {
   var o = new java.lang.String(t), i = new java.io.BufferedWriter(new java.io.OutputStreamWriter(new java.io.FileOutputStream(e), "utf-8"));
   try {
    i.write(o, 0, o.length()), i.flush();
   } finally {
    i.close();
   }
  }
 }
 function r(e) {
  return e.replace(/(["'\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
 }
 var a = function() {};
 requirejs.tools && requirejs.tools.useLib(function(e) {
  e([ "node/print" ], function(e) {
   a = e;
  }, function() {});
 });
 var s, l, c, u = {}, d = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, p = function(e) {
  var n = o(e);
  n = t(n, e, s, l);
  for (var i, r = [], a = [], c = []; i = d.exec(n); ) {
   var u = i[4] || i[5] || i[7] || i[8] || i[9];
   ".less" != u.substr(u.length - 5, 5) && ".css" != u.substr(u.length - 4, 4) && (u += ".css"), 
   u.match(/:\/\//) || (u = "/" == u.substr(0, 1) && l ? l + u : s + u, r.push(u), 
   a.push(d.lastIndex - i[0].length), c.push(i[0].length));
  }
  for (var f = 0; f < r.length; f++) (function(e) {
   var t = p(r[e]);
   n = n.substr(0, a[e]) + t + n.substr(a[e] + c[e]);
   for (var o = t.length - c[e], i = e + 1; i < r.length; i++) a[i] += o;
  })(f);
  return n;
 };
 u.load = function(e, t, n, o, i) {
  if (s || (s = o.baseUrl), l || (l = o.cssBase), o.modules) for (var r = 0; r < o.modules.length; r++) if (void 0 === o.modules[r].layer) {
   c = r;
   break;
  }
  u.config = u.config || o, e += i ? ".less" : ".css";
  var a = t.toUrl(e);
  return "http://" == a.substr(0, 7) || "https://" == a.substr(0, 8) ? n() : (h[e] = p(a), 
  i && (h[e] = i(h[e])), n(), void 0);
 }, u.normalize = function(e, t) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e);
 };
 var f = [], h = [];
 return u.write = function(e, t, n, o) {
  if ("http://" != t.substr(0, 7) && "https://" != t.substr(0, 8) && "//" != t.substr(0, 2)) {
   var i = t + (o ? ".less" : ".css");
   f.push(h[i]);
   var r = !1;
   u.config.separateCSS && (r = !0), "number" == typeof c && void 0 !== u.config.modules[c].separateCSS && (r = u.config.modules[c].separateCSS), 
   r ? n.asModule(e + "!" + t, "define(function(){})") : n("requirejs.s.contexts._.nextTick = function(f){f()}; require(['css'], function(css) { css.addBuffer('" + i + "'); }); requirejs.s.contexts._.nextTick = requirejs.nextTick;");
  }
 }, u.onLayerEnd = function(e, o, l) {
  firstWrite = !0;
  var d = !1;
  u.config.separateCSS && (d = !0), "number" == typeof c && void 0 !== u.config.modules[c].separateCSS && (d = u.config.modules[c].separateCSS), 
  c = null;
  var p = f.join("");
  if (d) {
   a("Writing CSS! file: " + o.name + "\n");
   var h = this.config.appDir ? this.config.baseUrl + o.name + ".css" : u.config.out.replace(/\.js$/, ".css"), g = n(t(p, s, h));
   i(h, g);
  } else {
   if ("" == p) return;
   p = r(n(p)), e("requirejs.s.contexts._.nextTick = function(f){f()}; require(['css'], function(css) { css.setBuffer('" + p + (l ? "', true" : "'") + "); }); requirejs.s.contexts._.nextTick = requirejs.nextTick; ");
  }
  f = [];
 }, u;
}), function(e, t) {
 function n(e) {
  return m[e.split("/")[1]];
 }
 function o() {
  "development" === m.env ? (m.optimization = 0, m.watchTimer = setInterval(function() {
   m.watchMode && r(function(e, t, n, o, i) {
    e ? g(e, o.href) : t && u(t.toCSS(m), o, i.lastModified);
   });
  }, m.poll)) : m.optimization = 3;
 }
 function i() {
  for (var e = document.getElementsByTagName("style"), t = 0; t < e.length; t++) if (e[t].type.match(C)) {
   var n = new m.tree.parseEnv(m);
   n.filename = document.location.href.replace(/#.*$/, ""), new m.Parser(n).parse(e[t].innerHTML || "", function(n, o) {
    if (n) return g(n, "inline");
    var i = o.toCSS(m), r = e[t];
    r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = i : r.innerHTML = i;
   });
  }
 }
 function r(e, t) {
  for (var n = 0; n < m.sheets.length; n++) l(m.sheets[n], e, t, m.sheets.length - (n + 1));
 }
 function a(e, t) {
  var n, o, i, r, a = s(e), l = s(t), c = "";
  if (a.hostPart !== l.hostPart) return "";
  for (o = Math.max(l.directories.length, a.directories.length), n = 0; o > n && l.directories[n] === a.directories[n]; n++) ;
  for (r = l.directories.slice(n), i = a.directories.slice(n), n = 0; n < r.length - 1; n++) c += "../";
  for (n = 0; n < i.length - 1; n++) c += i[n] + "/";
  return c;
 }
 function s(e, t) {
  var n, o, i = /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i, r = e.match(i), a = {}, s = [];
  if (!r) throw new Error("Could not parse sheet href - '" + e + "'");
  if (!r[1] || r[2]) {
   if (o = t.match(i), !o) throw new Error("Could not parse page url - '" + t + "'");
   r[1] = r[1] || o[1] || "", r[2] || (r[3] = o[3] + r[3]);
  }
  if (r[3]) {
   for (s = r[3].replace(/\\/g, "/").split("/"), n = 0; n < s.length; n++) "." === s[n] && (s.splice(n, 1), 
   n -= 1);
   for (n = 0; n < s.length; n++) ".." === s[n] && n > 0 && (s.splice(n - 1, 2), n -= 2);
  }
  return a.hostPart = r[1], a.directories = s, a.path = r[1] + s.join("/"), a.fileUrl = a.path + (r[4] || ""), 
  a.url = a.fileUrl + (r[5] || ""), a;
 }
 function l(t, n, o, i) {
  var r, l = s(t.href, e.location.href), p = l.url, h = w && w.getItem(p), g = w && w.getItem(p + ":timestamp"), b = {
   css: h,
   timestamp: g
  }, v = {
   relativeUrls: m.relativeUrls,
   currentDirectory: l.path,
   filename: p
  };
  t instanceof m.tree.parseEnv ? (r = new m.tree.parseEnv(t), v.entryPath = r.currentFileInfo.entryPath, 
  v.rootpath = r.currentFileInfo.rootpath, v.rootFilename = r.currentFileInfo.rootFilename) : (r = new m.tree.parseEnv(m), 
  r.mime = t.type, v.entryPath = l.path, v.rootpath = m.rootpath || l.path, v.rootFilename = p), 
  r.relativeUrls && (v.rootpath = m.rootpath ? s(m.rootpath + a(l.path, v.entryPath)).path : l.path), 
  d(p, t.type, function(e, a) {
   if (T += e.replace(/@import .+?;/gi, ""), !o && b && a && new Date(a).valueOf() === new Date(b.timestamp).valueOf()) u(b.css, t), 
   n(null, null, e, t, {
    local: !0,
    remaining: i
   }, p); else try {
    r.contents[p] = e, r.paths = [ l.path ], r.currentFileInfo = v, new m.Parser(r).parse(e, function(o, s) {
     if (o) return n(o, null, null, t);
     try {
      n(o, s, e, t, {
       local: !1,
       lastModified: a,
       remaining: i
      }, p), r.currentFileInfo.rootFilename === p && f(document.getElementById("less-error-message:" + c(p)));
     } catch (o) {
      n(o, null, null, t);
     }
    });
   } catch (s) {
    n(s, null, null, t);
   }
  }, function(e, o) {
   n({
    type: "File",
    message: "'" + o + "' wasn't found (" + e + ")"
   }, null, null, t);
  });
 }
 function c(e) {
  return e.replace(/^[a-z-]+:\/+?[^\/]+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":");
 }
 function u(e, t, n) {
  var o = t.href || "", i = "less:" + (t.title || c(o)), r = document.getElementById(i), a = !1, s = document.createElement("style");
  if (s.setAttribute("type", "text/css"), t.media && s.setAttribute("media", t.media), 
  s.id = i, s.styleSheet) try {
   s.styleSheet.cssText = e;
  } catch (l) {
   throw new Error("Couldn't reassign styleSheet.cssText.");
  } else s.appendChild(document.createTextNode(e)), a = null !== r && r.childNodes.length > 0 && s.childNodes.length > 0 && r.firstChild.nodeValue === s.firstChild.nodeValue;
  var u = document.getElementsByTagName("head")[0];
  if (null == r || a === !1) {
   var d = t && t.nextSibling || null;
   (d || document.getElementsByTagName("head")[0]).parentNode.insertBefore(s, d);
  }
  if (r && a === !1 && u.removeChild(r), n && w) {
   h("saving " + o + " to cache.");
   try {
    w.setItem(o, e), w.setItem(o + ":timestamp", n);
   } catch (l) {
    h("failed to save");
   }
  }
 }
 function d(e, t, n, o) {
  function i(t, n, o) {
   t.status >= 200 && t.status < 300 ? n(t.responseText, t.getResponseHeader("Last-Modified")) : "function" == typeof o && o(t.status, e);
  }
  var r = p(), a = v ? m.fileAsync : m.async;
  "function" == typeof r.overrideMimeType && r.overrideMimeType("text/css"), r.open("GET", e, a), 
  r.setRequestHeader("Accept", t || "text/x-less, text/css; q=0.9, */*; q=0.5"), r.send(null), 
  v && !m.fileAsync ? 0 === r.status || r.status >= 200 && r.status < 300 ? n(r.responseText) : o(r.status, e) : a ? r.onreadystatechange = function() {
   4 == r.readyState && i(r, n, o);
  } : i(r, n, o);
 }
 function p() {
  if (e.XMLHttpRequest) return new XMLHttpRequest();
  try {
   return new ActiveXObject("MSXML2.XMLHTTP.3.0");
  } catch (t) {
   return h("browser doesn't support AJAX."), null;
  }
 }
 function f(e) {
  return e && e.parentNode.removeChild(e);
 }
 function h(e) {
  "development" == m.env && "undefined" != typeof console && console.log("less: " + e);
 }
 function g(e, n) {
  var o, i, r = "less-error-message:" + c(n || ""), a = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>', s = document.createElement("div"), l = [], d = e.filename || n, p = d.match(/([^\/]+(\?.*)?)$/)[1];
  s.id = r, s.className = "less-error-message", i = "<h3>" + (e.type || "Syntax") + "Error: " + (e.message || "There is an error in your .less file") + "</h3>" + '<p>in <a href="' + d + '">' + p + "</a> ";
  var f = function(e, n, o) {
   e.extract[n] != t && l.push(a.replace(/\{line\}/, (parseInt(e.line) || 0) + (n - 1)).replace(/\{class\}/, o).replace(/\{content\}/, e.extract[n]));
  };
  e.extract ? (f(e, 0, ""), f(e, 1, "line"), f(e, 2, ""), i += "on line " + e.line + ", column " + (e.column + 1) + ":</p>" + "<ul>" + l.join("") + "</ul>") : e.stack && (i += "<br/>" + e.stack.split("\n").slice(1).join("<br/>")), 
  s.innerHTML = i, u([ ".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}" ].join("\n"), {
   title: "error-message"
  }), s.style.cssText = [ "font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px" ].join(";"), 
  "development" == m.env && (o = setInterval(function() {
   document.body && (document.getElementById(r) ? document.body.replaceChild(s, document.getElementById(r)) : document.body.insertBefore(s, document.body.firstChild), 
   clearInterval(o));
  }, 10));
 }
 var m, b;
 if ("object" == typeof environment && "[object Environment]" === {}.toString.call(environment) ? (m = "undefined" == typeof e ? {} : e.less = {}, 
 b = m.tree = {}, m.mode = "rhino") : "undefined" == typeof e ? (m = exports = {}, 
 m.tree = b = {}, m.mode = "node", m.env = "production") : ("undefined" == typeof e.less && (e.less = {}), 
 m = e.less, b = e.less.tree = {}, m.mode = "browser"), m.Parser = function(e) {
  function t() {
   x = S[y], w = v, C = v;
  }
  function o() {
   S[y] = x, v = w, C = v;
  }
  function i() {
   v > C && (S[y] = S[y].slice(v - C), C = v);
  }
  function r(e) {
   var t = e.charCodeAt(0);
   return 32 === t || 10 === t || 9 === t;
  }
  function a(e) {
   var t, n;
   if (e instanceof Function) return e.call(E.parsers);
   if ("string" == typeof e) t = g.charAt(v) === e ? e : null, n = 1, i(); else {
    if (i(), !(t = e.exec(S[y]))) return null;
    n = t[0].length;
   }
   return t ? (s(n), "string" == typeof t ? t : 1 === t.length ? t[0] : t) : void 0;
  }
  function s(e) {
   for (var t = v, n = y, o = v + S[y].length, i = v += e; o > v && r(g.charAt(v)); ) v++;
   return S[y] = S[y].slice(e + (v - i)), C = v, 0 === S[y].length && y < S.length - 1 && y++, 
   t !== v || n !== y;
  }
  function l(e, t) {
   var n = a(e);
   return n ? n : (c(t || ("string" == typeof e ? "expected '" + e + "' got '" + g.charAt(v) + "'" : "unexpected token")), 
   void 0);
  }
  function c(e, t) {
   var n = new Error(e);
   throw n.index = v, n.type = t || "Syntax", n;
  }
  function u(e) {
   return "string" == typeof e ? g.charAt(v) === e : e.test(S[y]) ? !0 : !1;
  }
  function d(e, t) {
   return e.filename && t.currentFileInfo.filename && e.filename !== t.currentFileInfo.filename ? E.imports.contents[e.filename] : g;
  }
  function p(e, t) {
   for (var n = e, o = -1; n >= 0 && "\n" !== t.charAt(n); n--) o++;
   return {
    line: "number" == typeof e ? (t.slice(0, e).match(/\n/g) || "").length : null,
    column: o
   };
  }
  function f(e, t, o) {
   var i = o.currentFileInfo.filename;
   return "browser" !== m.mode && "rhino" !== m.mode && (i = n("path").resolve(i)), 
   {
    lineNumber: p(e, t).line + 1,
    fileName: i
   };
  }
  function h(e, t) {
   var n = d(e, t), o = p(e.index, n), i = o.line, r = o.column, a = n.split("\n");
   this.type = e.type || "Syntax", this.message = e.message, this.filename = e.filename || t.currentFileInfo.filename, 
   this.index = e.index, this.line = "number" == typeof i ? i + 1 : null, this.callLine = e.call && p(e.call, n).line + 1, 
   this.callExtract = a[p(e.call, n).line], this.stack = e.stack, this.column = r, 
   this.extract = [ a[i - 1], a[i], a[i + 1] ];
  }
  var g, v, y, x, w, k, S, C, E;
  e instanceof b.parseEnv || (e = new b.parseEnv(e));
  var T = this.imports = {
   paths: e.paths || [],
   queue: [],
   files: e.files,
   contents: e.contents,
   mime: e.mime,
   error: null,
   push: function(t, n, o) {
    var i = this;
    this.queue.push(t), m.Parser.importer(t, n, function(e, n, r) {
     i.queue.splice(i.queue.indexOf(t), 1);
     var a = r in i.files;
     i.files[r] = n, e && !i.error && (i.error = e), o(e, n, a);
    }, e);
   }
  };
  return h.prototype = new Error(), h.prototype.constructor = h, this.env = e = e || {}, 
  this.optimization = "optimization" in this.env ? this.env.optimization : 1, E = {
   imports: T,
   parse: function(t, o) {
    var i, r, s, l = null;
    if (v = y = C = k = 0, g = t.replace(/\r\n/g, "\n"), g = g.replace(/^\uFEFF/, ""), 
    S = function(t) {
     for (var n, o, i, r, a = 0, s = /(?:@\{[\w-]+\}|[^"'`\{\}\/\(\)\\])+/g, c = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g, u = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`]|\\.)*)`/g, d = 0, p = t[0], f = 0; f < g.length; ) if (s.lastIndex = f, 
     (n = s.exec(g)) && n.index === f && (f += n[0].length, p.push(n[0])), i = g.charAt(f), 
     c.lastIndex = u.lastIndex = f, (n = u.exec(g)) && n.index === f) f += n[0].length, 
     p.push(n[0]); else if (o || "/" !== i || (r = g.charAt(f + 1), "/" !== r && "*" !== r || !(n = c.exec(g)) || n.index !== f)) {
      switch (i) {
      case "{":
       if (!o) {
        d++, p.push(i);
        break;
       }

      case "}":
       if (!o) {
        d--, p.push(i), t[++a] = p = [];
        break;
       }

      case "(":
       if (!o) {
        o = !0, p.push(i);
        break;
       }

      case ")":
       if (o) {
        o = !1, p.push(i);
        break;
       }

      default:
       p.push(i);
      }
      f++;
     } else f += n[0].length, p.push(n[0]);
     return 0 != d && (l = new h({
      index: f - 1,
      type: "Parse",
      message: d > 0 ? "missing closing `}`" : "missing opening `{`",
      filename: e.currentFileInfo.filename
     }, e)), t.map(function(e) {
      return e.join("");
     });
    }([ [] ]), l) return o(new h(l, e));
    try {
     i = new b.Ruleset([], a(this.parsers.primary)), i.root = !0, i.firstRoot = !0;
    } catch (c) {
     return o(new h(c, e));
    }
    if (i.toCSS = function(t) {
     return function(o, i) {
      o = o || {};
      var r = new b.evalEnv(o);
      "object" != typeof i || Array.isArray(i) || (i = Object.keys(i).map(function(e) {
       var t = i[e];
       return t instanceof b.Value || (t instanceof b.Expression || (t = new b.Expression([ t ])), 
       t = new b.Value([ t ])), new b.Rule("@" + e, t, !1, 0);
      }), r.frames = [ new b.Ruleset(null, i) ]);
      try {
       var a = t.call(this, r);
       new b.joinSelectorVisitor().run(a), new b.processExtendsVisitor().run(a);
       var s = a.toCSS({
        compress: Boolean(o.compress),
        dumpLineNumbers: e.dumpLineNumbers,
        strictUnits: Boolean(o.strictUnits)
       });
      } catch (l) {
       throw new h(l, e);
      }
      return o.yuicompress && "node" === m.mode ? n("ycssmin").cssmin(s, o.maxLineLen) : o.compress ? s.replace(/(\s)+/g, "$1") : s;
     };
    }(i.eval), v < g.length - 1) {
     v = k, s = g.split("\n"), r = (g.slice(0, v).match(/\n/g) || "").length + 1;
     for (var u = v, d = -1; u >= 0 && "\n" !== g.charAt(u); u--) d++;
     l = {
      type: "Parse",
      message: "Unrecognised input",
      index: v,
      filename: e.currentFileInfo.filename,
      line: r,
      column: d,
      extract: [ s[r - 2], s[r - 1], s[r] ]
     };
    }
    var p = function(t) {
     t = l || t || E.imports.error, t ? (t instanceof h || (t = new h(t, e)), o(t)) : o(null, i);
    };
    e.processImports !== !1 ? new b.importVisitor(this.imports, p).run(i) : p();
   },
   parsers: {
    primary: function() {
     for (var e, t = []; (e = a(this.extendRule) || a(this.mixin.definition) || a(this.rule) || a(this.ruleset) || a(this.mixin.call) || a(this.comment) || a(this.directive)) || a(/^[\s\n]+/) || a(/^;+/); ) e && t.push(e);
     return t;
    },
    comment: function() {
     var e;
     if ("/" === g.charAt(v)) return "/" === g.charAt(v + 1) ? new b.Comment(a(/^\/\/.*/), !0) : (e = a(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/)) ? new b.Comment(e) : void 0;
    },
    entities: {
     quoted: function() {
      var t, n, o = v, i = v;
      return "~" === g.charAt(o) && (o++, n = !0), '"' === g.charAt(o) || "'" === g.charAt(o) ? (n && a("~"), 
      (t = a(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/)) ? new b.Quoted(t[0], t[1] || t[2], n, i, e.currentFileInfo) : void 0) : void 0;
     },
     keyword: function() {
      var e;
      return (e = a(/^[_A-Za-z-][_A-Za-z0-9-]*/)) ? b.colors.hasOwnProperty(e) ? new b.Color(b.colors[e].slice(1)) : new b.Keyword(e) : void 0;
     },
     call: function() {
      var t, n, o, i, r = v;
      if (t = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(S[y])) {
       if (t = t[1], n = t.toLowerCase(), "url" === n) return null;
       if (v += t.length, "alpha" === n && (i = a(this.alpha), "undefined" != typeof i)) return i;
       if (a("("), o = a(this.entities.arguments), a(")")) return t ? new b.Call(t, o, r, e.currentFileInfo) : void 0;
      }
     },
     arguments: function() {
      for (var e, t = []; (e = a(this.entities.assignment) || a(this.expression)) && (t.push(e), 
      a(",")); ) ;
      return t;
     },
     literal: function() {
      return a(this.entities.dimension) || a(this.entities.color) || a(this.entities.quoted) || a(this.entities.unicodeDescriptor);
     },
     assignment: function() {
      var e, t;
      return (e = a(/^\w+(?=\s?=)/i)) && a("=") && (t = a(this.entity)) ? new b.Assignment(e, t) : void 0;
     },
     url: function() {
      var t;
      if ("u" === g.charAt(v) && a(/^url\(/)) return t = a(this.entities.quoted) || a(this.entities.variable) || a(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "", 
      l(")"), new b.URL(null != t.value || t instanceof b.Variable ? t : new b.Anonymous(t), e.currentFileInfo);
     },
     variable: function() {
      var t, n = v;
      return "@" === g.charAt(v) && (t = a(/^@@?[\w-]+/)) ? new b.Variable(t, n, e.currentFileInfo) : void 0;
     },
     variableCurly: function() {
      var t, n = v;
      return "@" === g.charAt(v) && (t = a(/^@\{([\w-]+)\}/)) ? new b.Variable("@" + t[1], n, e.currentFileInfo) : void 0;
     },
     color: function() {
      var e;
      return "#" === g.charAt(v) && (e = a(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)) ? new b.Color(e[1]) : void 0;
     },
     dimension: function() {
      var e, t = g.charCodeAt(v);
      if (!(t > 57 || 43 > t || 47 === t || 44 == t)) return (e = a(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/)) ? new b.Dimension(e[1], e[2]) : void 0;
     },
     unicodeDescriptor: function() {
      var e;
      return (e = a(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/)) ? new b.UnicodeDescriptor(e[0]) : void 0;
     },
     javascript: function() {
      var e, t, n = v;
      return "~" === g.charAt(n) && (n++, t = !0), "`" === g.charAt(n) ? (t && a("~"), 
      (e = a(/^`([^`]*)`/)) ? new b.JavaScript(e[1], v, t) : void 0) : void 0;
     }
    },
    variable: function() {
     var e;
     return "@" === g.charAt(v) && (e = a(/^(@[\w-]+)\s*:/)) ? e[1] : void 0;
    },
    extend: function(e) {
     var t, n, o, i = v, r = [];
     if (a(e ? /^&:extend\(/ : /^:extend\(/)) {
      do {
       for (o = null, t = []; ;) {
        if (o = a(/^(all)(?=\s*(\)|,))/)) break;
        if (n = a(this.element), !n) break;
        t.push(n);
       }
       o = o && o[1], r.push(new b.Extend(new b.Selector(t), o, i));
      } while (a(","));
      return l(/^\)/), e && l(/^;/), r;
     }
    },
    extendRule: function() {
     return this.extend(!0);
    },
    mixin: {
     call: function() {
      var n, i, r, s = [], c = v, d = g.charAt(v), p = !1;
      if ("." === d || "#" === d) {
       for (t(); n = a(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/); ) s.push(new b.Element(i, n, v)), 
       i = a(">");
       return a("(") && (r = this.mixin.args.call(this, !0).args, l(")")), r = r || [], 
       a(this.important) && (p = !0), s.length > 0 && (a(";") || u("}")) ? new b.mixin.Call(s, r, c, e.currentFileInfo, p) : (o(), 
       void 0);
      }
     },
     args: function(e) {
      for (var t, n, o, i, r, s, u = [], d = [], p = [], f = {
       args: null,
       variadic: !1
      }; ;) {
       if (e) s = a(this.expression); else {
        if (a(this.comment), "." === g.charAt(v) && a(/^\.{3}/)) {
         f.variadic = !0, a(";") && !t && (t = !0), (t ? d : p).push({
          variadic: !0
         });
         break;
        }
        s = a(this.entities.variable) || a(this.entities.literal) || a(this.entities.keyword);
       }
       if (!s) break;
       i = null, s.throwAwayComments && s.throwAwayComments(), r = s;
       var h = null;
       if (e) {
        if (1 == s.value.length) var h = s.value[0];
       } else h = s;
       if (h && h instanceof b.Variable) if (a(":")) u.length > 0 && (t && c("Cannot mix ; and , as delimiter types"), 
       n = !0), r = l(this.expression), i = o = h.name; else {
        if (!e && a(/^\.{3}/)) {
         f.variadic = !0, a(";") && !t && (t = !0), (t ? d : p).push({
          name: s.name,
          variadic: !0
         });
         break;
        }
        e || (o = i = h.name, r = null);
       }
       r && u.push(r), p.push({
        name: i,
        value: r
       }), a(",") || (a(";") || t) && (n && c("Cannot mix ; and , as delimiter types"), 
       t = !0, u.length > 1 && (r = new b.Value(u)), d.push({
        name: o,
        value: r
       }), o = null, u = [], n = !1);
      }
      return f.args = t ? d : p, f;
     },
     definition: function() {
      var e, n, i, r, s = [], c = !1;
      if (!("." !== g.charAt(v) && "#" !== g.charAt(v) || u(/^[^{]*\}/)) && (t(), n = a(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/))) {
       e = n[1];
       var d = this.mixin.args.call(this, !1);
       if (s = d.args, c = d.variadic, a(")") || (k = v, o()), a(this.comment), a(/^when/) && (r = l(this.conditions, "expected condition")), 
       i = a(this.block)) return new b.mixin.Definition(e, s, i, r, c);
       o();
      }
     }
    },
    entity: function() {
     return a(this.entities.literal) || a(this.entities.variable) || a(this.entities.url) || a(this.entities.call) || a(this.entities.keyword) || a(this.entities.javascript) || a(this.comment);
    },
    end: function() {
     return a(";") || u("}");
    },
    alpha: function() {
     var e;
     if (a(/^\(opacity=/i)) return (e = a(/^\d+/) || a(this.entities.variable)) ? (l(")"), 
     new b.Alpha(e)) : void 0;
    },
    element: function() {
     var e, t, n;
     return t = a(this.combinator), e = a(/^(?:\d+\.\d+|\d+)%/) || a(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || a("*") || a("&") || a(this.attribute) || a(/^\([^()@]+\)/) || a(/^[\.#](?=@)/) || a(this.entities.variableCurly), 
     e || a("(") && (n = a(this.selector)) && a(")") && (e = new b.Paren(n)), e ? new b.Element(t, e, v) : void 0;
    },
    combinator: function() {
     var e = g.charAt(v);
     if (">" === e || "+" === e || "~" === e || "|" === e) {
      for (v++; g.charAt(v).match(/\s/); ) v++;
      return new b.Combinator(e);
     }
     return g.charAt(v - 1).match(/\s/) ? new b.Combinator(" ") : new b.Combinator(null);
    },
    selector: function() {
     for (var e, t, n, o = [], i = []; ((n = a(this.extend)) || (e = a(this.element))) && (n ? i.push.apply(i, n) : (i.length && c("Extend can only be used at the end of selector"), 
     t = g.charAt(v), o.push(e), e = null), "{" !== t && "}" !== t && ";" !== t && "," !== t && ")" !== t); ) ;
     return o.length > 0 ? new b.Selector(o, i) : (i.length && c("Extend must be used to extend a selector, it cannot be used on its own"), 
     void 0);
    },
    attribute: function() {
     var e, t, n;
     if (a("[")) return (e = a(this.entities.variableCurly)) || (e = l(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/)), 
     (n = a(/^[|~*$^]?=/)) && (t = a(this.entities.quoted) || a(/^[\w-]+/) || a(this.entities.variableCurly)), 
     l("]"), new b.Attribute(e, n, t);
    },
    block: function() {
     var e;
     return a("{") && (e = a(this.primary)) && a("}") ? e : void 0;
    },
    ruleset: function() {
     var n, i, r, s = [];
     for (t(), e.dumpLineNumbers && (r = f(v, g, e)); (n = a(this.selector)) && (s.push(n), 
     a(this.comment), a(",")); ) a(this.comment);
     if (s.length > 0 && (i = a(this.block))) {
      var l = new b.Ruleset(s, i, e.strictImports);
      return e.dumpLineNumbers && (l.debugInfo = r), l;
     }
     k = v, o();
    },
    rule: function(n) {
     var i, r, s, l = g.charAt(v);
     if (t(), "." !== l && "#" !== l && "&" !== l && (i = a(this.variable) || a(this.property))) {
      if (r = n || !e.compress && "@" !== i.charAt(0) ? a(this.anonymousValue) || a(this.value) : a(this.value) || a(this.anonymousValue), 
      s = a(this.important), r && a(this.end)) return new b.Rule(i, r, s, w, e.currentFileInfo);
      if (k = v, o(), r && !n) return this.rule(!0);
     }
    },
    anonymousValue: function() {
     var e;
     return (e = /^([^@+\/'"*`(;{}-]*);/.exec(S[y])) ? (v += e[0].length - 1, new b.Anonymous(e[1])) : void 0;
    },
    "import": function() {
     var n, i, r = v;
     t();
     var s = a(/^@import?\s+/), l = (s ? a(this.importOptions) : null) || {};
     return s && (n = a(this.entities.quoted) || a(this.entities.url)) && (i = a(this.mediaFeatures), 
     a(";")) ? (i = i && new b.Value(i), new b.Import(n, i, l, r, e.currentFileInfo)) : (o(), 
     void 0);
    },
    importOptions: function() {
     var e, t, n, o = {};
     if (!a("(")) return null;
     do if (e = a(this.importOption)) {
      switch (t = e, n = !0, t) {
      case "css":
       t = "less", n = !1;
       break;

      case "once":
       t = "multiple", n = !1;
      }
      if (o[t] = n, !a(",")) break;
     } while (e);
     return l(")"), o;
    },
    importOption: function() {
     var e = a(/^(less|css|multiple|once)/);
     return e ? e[1] : void 0;
    },
    mediaFeature: function() {
     var t, n, o = [];
     do if (t = a(this.entities.keyword)) o.push(t); else if (a("(")) {
      if (n = a(this.property), t = a(this.value), !a(")")) return null;
      if (n && t) o.push(new b.Paren(new b.Rule(n, t, null, v, e.currentFileInfo, !0))); else {
       if (!t) return null;
       o.push(new b.Paren(t));
      }
     } while (t);
     return o.length > 0 ? new b.Expression(o) : void 0;
    },
    mediaFeatures: function() {
     var e, t = [];
     do if (e = a(this.mediaFeature)) {
      if (t.push(e), !a(",")) break;
     } else if ((e = a(this.entities.variable)) && (t.push(e), !a(","))) break; while (e);
     return t.length > 0 ? t : null;
    },
    media: function() {
     var t, n, o, i;
     return e.dumpLineNumbers && (i = f(v, g, e)), a(/^@media/) && (t = a(this.mediaFeatures), 
     n = a(this.block)) ? (o = new b.Media(n, t), e.dumpLineNumbers && (o.debugInfo = i), 
     o) : void 0;
    },
    directive: function() {
     var n, i, r, s, l, c, u;
     if ("@" === g.charAt(v)) {
      if (i = a(this["import"]) || a(this.media)) return i;
      if (t(), n = a(/^@[a-z-]+/)) {
       switch (s = n, "-" == n.charAt(1) && n.indexOf("-", 2) > 0 && (s = "@" + n.slice(n.indexOf("-", 2) + 1)), 
       s) {
       case "@font-face":
        l = !0;
        break;

       case "@viewport":
       case "@top-left":
       case "@top-left-corner":
       case "@top-center":
       case "@top-right":
       case "@top-right-corner":
       case "@bottom-left":
       case "@bottom-left-corner":
       case "@bottom-center":
       case "@bottom-right":
       case "@bottom-right-corner":
       case "@left-top":
       case "@left-middle":
       case "@left-bottom":
       case "@right-top":
       case "@right-middle":
       case "@right-bottom":
        l = !0;
        break;

       case "@page":
       case "@document":
       case "@supports":
       case "@keyframes":
        l = !0, c = !0;
        break;

       case "@namespace":
        u = !0;
       }
       if (c && (n += " " + (a(/^[^{]+/) || "").trim()), l) {
        if (r = a(this.block)) return new b.Directive(n, r);
       } else if ((i = u ? a(this.expression) : a(this.entity)) && a(";")) {
        var d = new b.Directive(n, i);
        return e.dumpLineNumbers && (d.debugInfo = f(v, g, e)), d;
       }
       o();
      }
     }
    },
    value: function() {
     for (var e, t = []; (e = a(this.expression)) && (t.push(e), a(",")); ) ;
     return t.length > 0 ? new b.Value(t) : void 0;
    },
    important: function() {
     return "!" === g.charAt(v) ? a(/^! *important/) : void 0;
    },
    sub: function() {
     var e, t;
     return a("(") && (e = a(this.addition)) ? (t = new b.Expression([ e ]), l(")"), 
     t.parens = !0, t) : void 0;
    },
    multiplication: function() {
     var e, t, n, o, i;
     if (e = a(this.operand)) {
      for (i = r(g.charAt(v - 1)); !u(/^\/[*\/]/) && (n = a("/") || a("*")) && (t = a(this.operand)); ) e.parensInOp = !0, 
      t.parensInOp = !0, o = new b.Operation(n, [ o || e, t ], i), i = r(g.charAt(v - 1));
      return o || e;
     }
    },
    addition: function() {
     var e, t, n, o, i;
     if (e = a(this.multiplication)) {
      for (i = r(g.charAt(v - 1)); (n = a(/^[-+]\s+/) || !i && (a("+") || a("-"))) && (t = a(this.multiplication)); ) e.parensInOp = !0, 
      t.parensInOp = !0, o = new b.Operation(n, [ o || e, t ], i), i = r(g.charAt(v - 1));
      return o || e;
     }
    },
    conditions: function() {
     var e, t, n, o = v;
     if (e = a(this.condition)) {
      for (;a(",") && (t = a(this.condition)); ) n = new b.Condition("or", n || e, t, o);
      return n || e;
     }
    },
    condition: function() {
     var e, t, n, o, i = v, r = !1;
     return a(/^not/) && (r = !0), l("("), (e = a(this.addition) || a(this.entities.keyword) || a(this.entities.quoted)) ? ((o = a(/^(?:>=|=<|[<=>])/)) ? (t = a(this.addition) || a(this.entities.keyword) || a(this.entities.quoted)) ? n = new b.Condition(o, e, t, i, r) : c("expected expression") : n = new b.Condition("=", e, new b.Keyword("true"), i, r), 
     l(")"), a(/^and/) ? new b.Condition("and", n, a(this.condition)) : n) : void 0;
    },
    operand: function() {
     var e, t = g.charAt(v + 1);
     "-" !== g.charAt(v) || "@" !== t && "(" !== t || (e = a("-"));
     var n = a(this.sub) || a(this.entities.dimension) || a(this.entities.color) || a(this.entities.variable) || a(this.entities.call);
     return e && (n.parensInOp = !0, n = new b.Negative(n)), n;
    },
    expression: function() {
     for (var e, t, n = []; e = a(this.addition) || a(this.entity); ) n.push(e), !u(/^\/[\/*]/) && (t = a("/")) && n.push(new b.Anonymous(t));
     return n.length > 0 ? new b.Expression(n) : void 0;
    },
    property: function() {
     var e;
     return (e = a(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/)) ? e[1] : void 0;
    }
   }
  };
 }, ("browser" === m.mode || "rhino" === m.mode) && (m.Parser.importer = function(e, t, n, o) {
  !/^([a-z-]+:)?\//.test(e) && t.currentDirectory && (e = t.currentDirectory + e);
  var i = o.toSheet(e);
  i.processImports = !1, i.currentFileInfo = t, l(i, function(e, t, o, i, r, a) {
   n.call(null, e, t, a);
  }, !0);
 }), function(o) {
  function i(e) {
   return o.functions.hsla(e.h, e.s, e.l, e.a);
  }
  function r(e, t) {
   return e instanceof o.Dimension && e.unit.is("%") ? parseFloat(e.value * t / 100) : a(e);
  }
  function a(e) {
   if (e instanceof o.Dimension) return parseFloat(e.unit.is("%") ? e.value / 100 : e.value);
   if ("number" == typeof e) return e;
   throw {
    error: "RuntimeError",
    message: "color functions take numbers as parameters"
   };
  }
  function s(e) {
   return Math.min(1, Math.max(0, e));
  }
  o.functions = {
   rgb: function(e, t, n) {
    return this.rgba(e, t, n, 1);
   },
   rgba: function(e, t, n, i) {
    var s = [ e, t, n ].map(function(e) {
     return r(e, 256);
    });
    return i = a(i), new o.Color(s, i);
   },
   hsl: function(e, t, n) {
    return this.hsla(e, t, n, 1);
   },
   hsla: function(e, t, n, o) {
    function i(e) {
     return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 1 > 6 * e ? l + 6 * (r - l) * e : 1 > 2 * e ? r : 2 > 3 * e ? l + 6 * (r - l) * (2 / 3 - e) : l;
    }
    e = a(e) % 360 / 360, t = s(a(t)), n = s(a(n)), o = s(a(o));
    var r = .5 >= n ? n * (t + 1) : n + t - n * t, l = 2 * n - r;
    return this.rgba(255 * i(e + 1 / 3), 255 * i(e), 255 * i(e - 1 / 3), o);
   },
   hsv: function(e, t, n) {
    return this.hsva(e, t, n, 1);
   },
   hsva: function(e, t, n, o) {
    e = 360 * (a(e) % 360 / 360), t = a(t), n = a(n), o = a(o);
    var i, r;
    i = Math.floor(e / 60 % 6), r = e / 60 - i;
    var s = [ n, n * (1 - t), n * (1 - r * t), n * (1 - (1 - r) * t) ], l = [ [ 0, 3, 1 ], [ 2, 0, 1 ], [ 1, 0, 3 ], [ 1, 2, 0 ], [ 3, 1, 0 ], [ 0, 1, 2 ] ];
    return this.rgba(255 * s[l[i][0]], 255 * s[l[i][1]], 255 * s[l[i][2]], o);
   },
   hue: function(e) {
    return new o.Dimension(Math.round(e.toHSL().h));
   },
   saturation: function(e) {
    return new o.Dimension(Math.round(100 * e.toHSL().s), "%");
   },
   lightness: function(e) {
    return new o.Dimension(Math.round(100 * e.toHSL().l), "%");
   },
   hsvhue: function(e) {
    return new o.Dimension(Math.round(e.toHSV().h));
   },
   hsvsaturation: function(e) {
    return new o.Dimension(Math.round(100 * e.toHSV().s), "%");
   },
   hsvvalue: function(e) {
    return new o.Dimension(Math.round(100 * e.toHSV().v), "%");
   },
   red: function(e) {
    return new o.Dimension(e.rgb[0]);
   },
   green: function(e) {
    return new o.Dimension(e.rgb[1]);
   },
   blue: function(e) {
    return new o.Dimension(e.rgb[2]);
   },
   alpha: function(e) {
    return new o.Dimension(e.toHSL().a);
   },
   luma: function(e) {
    return new o.Dimension(Math.round(100 * e.luma() * e.alpha), "%");
   },
   saturate: function(e, t) {
    var n = e.toHSL();
    return n.s += t.value / 100, n.s = s(n.s), i(n);
   },
   desaturate: function(e, t) {
    var n = e.toHSL();
    return n.s -= t.value / 100, n.s = s(n.s), i(n);
   },
   lighten: function(e, t) {
    var n = e.toHSL();
    return n.l += t.value / 100, n.l = s(n.l), i(n);
   },
   darken: function(e, t) {
    var n = e.toHSL();
    return n.l -= t.value / 100, n.l = s(n.l), i(n);
   },
   fadein: function(e, t) {
    var n = e.toHSL();
    return n.a += t.value / 100, n.a = s(n.a), i(n);
   },
   fadeout: function(e, t) {
    var n = e.toHSL();
    return n.a -= t.value / 100, n.a = s(n.a), i(n);
   },
   fade: function(e, t) {
    var n = e.toHSL();
    return n.a = t.value / 100, n.a = s(n.a), i(n);
   },
   spin: function(e, t) {
    var n = e.toHSL(), o = (n.h + t.value) % 360;
    return n.h = 0 > o ? 360 + o : o, i(n);
   },
   mix: function(e, t, n) {
    n || (n = new o.Dimension(50));
    var i = n.value / 100, r = 2 * i - 1, a = e.toHSL().a - t.toHSL().a, s = ((-1 == r * a ? r : (r + a) / (1 + r * a)) + 1) / 2, l = 1 - s, c = [ e.rgb[0] * s + t.rgb[0] * l, e.rgb[1] * s + t.rgb[1] * l, e.rgb[2] * s + t.rgb[2] * l ], u = e.alpha * i + t.alpha * (1 - i);
    return new o.Color(c, u);
   },
   greyscale: function(e) {
    return this.desaturate(e, new o.Dimension(100));
   },
   contrast: function(e, t, n, o) {
    if (!e.rgb) return null;
    if ("undefined" == typeof n && (n = this.rgba(255, 255, 255, 1)), "undefined" == typeof t && (t = this.rgba(0, 0, 0, 1)), 
    t.luma() > n.luma()) {
     var i = n;
     n = t, t = i;
    }
    return o = "undefined" == typeof o ? .43 : a(o), e.luma() * e.alpha < o ? n : t;
   },
   e: function(e) {
    return new o.Anonymous(e instanceof o.JavaScript ? e.evaluated : e);
   },
   escape: function(e) {
    return new o.Anonymous(encodeURI(e.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"));
   },
   "%": function(e) {
    for (var t = Array.prototype.slice.call(arguments, 1), n = e.value, i = 0; i < t.length; i++) n = n.replace(/%[sda]/i, function(e) {
     var n = e.match(/s/i) ? t[i].value : t[i].toCSS();
     return e.match(/[A-Z]$/) ? encodeURIComponent(n) : n;
    });
    return n = n.replace(/%%/g, "%"), new o.Quoted('"' + n + '"', n);
   },
   unit: function(e, t) {
    return new o.Dimension(e.value, t ? t.toCSS() : "");
   },
   convert: function(e, t) {
    return e.convertTo(t.value);
   },
   round: function(e, t) {
    var n = "undefined" == typeof t ? 0 : t.value;
    return this._math(function(e) {
     return e.toFixed(n);
    }, null, e);
   },
   pi: function() {
    return new o.Dimension(Math.PI);
   },
   mod: function(e, t) {
    return new o.Dimension(e.value % t.value, e.unit);
   },
   pow: function(e, t) {
    if ("number" == typeof e && "number" == typeof t) e = new o.Dimension(e), t = new o.Dimension(t); else if (!(e instanceof o.Dimension && t instanceof o.Dimension)) throw {
     type: "Argument",
     message: "arguments must be numbers"
    };
    return new o.Dimension(Math.pow(e.value, t.value), e.unit);
   },
   _math: function(e, t, n) {
    if (n instanceof o.Dimension) return new o.Dimension(e(parseFloat(n.value)), null == t ? n.unit : t);
    if ("number" == typeof n) return e(n);
    throw {
     type: "Argument",
     message: "argument must be a number"
    };
   },
   argb: function(e) {
    return new o.Anonymous(e.toARGB());
   },
   percentage: function(e) {
    return new o.Dimension(100 * e.value, "%");
   },
   color: function(e) {
    if (e instanceof o.Quoted) return new o.Color(e.value.slice(1));
    throw {
     type: "Argument",
     message: "argument must be a string"
    };
   },
   iscolor: function(e) {
    return this._isa(e, o.Color);
   },
   isnumber: function(e) {
    return this._isa(e, o.Dimension);
   },
   isstring: function(e) {
    return this._isa(e, o.Quoted);
   },
   iskeyword: function(e) {
    return this._isa(e, o.Keyword);
   },
   isurl: function(e) {
    return this._isa(e, o.URL);
   },
   ispixel: function(e) {
    return this.isunit(e, "px");
   },
   ispercentage: function(e) {
    return this.isunit(e, "%");
   },
   isem: function(e) {
    return this.isunit(e, "em");
   },
   isunit: function(e, t) {
    return e instanceof o.Dimension && e.unit.is(t.value || t) ? o.True : o.False;
   },
   _isa: function(e, t) {
    return e instanceof t ? o.True : o.False;
   },
   multiply: function(e, t) {
    var n = e.rgb[0] * t.rgb[0] / 255, o = e.rgb[1] * t.rgb[1] / 255, i = e.rgb[2] * t.rgb[2] / 255;
    return this.rgb(n, o, i);
   },
   screen: function(e, t) {
    var n = 255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, o = 255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, i = 255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
    return this.rgb(n, o, i);
   },
   overlay: function(e, t) {
    var n = e.rgb[0] < 128 ? 2 * e.rgb[0] * t.rgb[0] / 255 : 255 - 2 * (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, o = e.rgb[1] < 128 ? 2 * e.rgb[1] * t.rgb[1] / 255 : 255 - 2 * (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, i = e.rgb[2] < 128 ? 2 * e.rgb[2] * t.rgb[2] / 255 : 255 - 2 * (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
    return this.rgb(n, o, i);
   },
   softlight: function(e, t) {
    var n = t.rgb[0] * e.rgb[0] / 255, o = n + e.rgb[0] * (255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255 - n) / 255;
    n = t.rgb[1] * e.rgb[1] / 255;
    var i = n + e.rgb[1] * (255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255 - n) / 255;
    n = t.rgb[2] * e.rgb[2] / 255;
    var r = n + e.rgb[2] * (255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255 - n) / 255;
    return this.rgb(o, i, r);
   },
   hardlight: function(e, t) {
    var n = t.rgb[0] < 128 ? 2 * t.rgb[0] * e.rgb[0] / 255 : 255 - 2 * (255 - t.rgb[0]) * (255 - e.rgb[0]) / 255, o = t.rgb[1] < 128 ? 2 * t.rgb[1] * e.rgb[1] / 255 : 255 - 2 * (255 - t.rgb[1]) * (255 - e.rgb[1]) / 255, i = t.rgb[2] < 128 ? 2 * t.rgb[2] * e.rgb[2] / 255 : 255 - 2 * (255 - t.rgb[2]) * (255 - e.rgb[2]) / 255;
    return this.rgb(n, o, i);
   },
   difference: function(e, t) {
    var n = Math.abs(e.rgb[0] - t.rgb[0]), o = Math.abs(e.rgb[1] - t.rgb[1]), i = Math.abs(e.rgb[2] - t.rgb[2]);
    return this.rgb(n, o, i);
   },
   exclusion: function(e, t) {
    var n = e.rgb[0] + t.rgb[0] * (255 - e.rgb[0] - e.rgb[0]) / 255, o = e.rgb[1] + t.rgb[1] * (255 - e.rgb[1] - e.rgb[1]) / 255, i = e.rgb[2] + t.rgb[2] * (255 - e.rgb[2] - e.rgb[2]) / 255;
    return this.rgb(n, o, i);
   },
   average: function(e, t) {
    var n = (e.rgb[0] + t.rgb[0]) / 2, o = (e.rgb[1] + t.rgb[1]) / 2, i = (e.rgb[2] + t.rgb[2]) / 2;
    return this.rgb(n, o, i);
   },
   negation: function(e, t) {
    var n = 255 - Math.abs(255 - t.rgb[0] - e.rgb[0]), o = 255 - Math.abs(255 - t.rgb[1] - e.rgb[1]), i = 255 - Math.abs(255 - t.rgb[2] - e.rgb[2]);
    return this.rgb(n, o, i);
   },
   tint: function(e, t) {
    return this.mix(this.rgb(255, 255, 255), e, t);
   },
   shade: function(e, t) {
    return this.mix(this.rgb(0, 0, 0), e, t);
   },
   extract: function(e, t) {
    return t = t.value - 1, e.value[t];
   },
   "data-uri": function(t, i) {
    if ("undefined" != typeof e) return new o.URL(i || t, this.currentFileInfo).eval(this.env);
    var r = t.value, a = i && i.value, s = n("fs"), l = n("path"), c = !1;
    if (arguments.length < 2 && (a = r), this.env.isPathRelative(a) && (a = this.currentFileInfo.relativeUrls ? l.join(this.currentFileInfo.currentDirectory, a) : l.join(this.currentFileInfo.entryPath, a)), 
    arguments.length < 2) {
     var u;
     try {
      u = n("mime");
     } catch (d) {
      u = o._mime;
     }
     r = u.lookup(a);
     var p = u.charsets.lookup(r);
     c = [ "US-ASCII", "UTF-8" ].indexOf(p) < 0, c && (r += ";base64");
    } else c = /;base64$/.test(r);
    var f = s.readFileSync(a), h = 32, g = parseInt(f.length / 1024, 10);
    if (g >= h) {
     if (this.env.ieCompat !== !1) return this.env.silent || console.warn("Skipped data-uri embedding of %s because its size (%dKB) exceeds IE8-safe %dKB!", a, g, h), 
     new o.URL(i || t, this.currentFileInfo).eval(this.env);
     this.env.silent || console.warn("WARNING: Embedding %s (%dKB) exceeds IE8's data-uri size limit of %dKB!", a, g, h);
    }
    f = c ? f.toString("base64") : encodeURIComponent(f);
    var m = "'data:" + r + "," + f + "'";
    return new o.URL(new o.Anonymous(m));
   }
  }, o._mime = {
   _types: {
    ".htm": "text/html",
    ".html": "text/html",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png"
   },
   lookup: function(e) {
    var i = n("path").extname(e), r = o._mime._types[i];
    if (r === t) throw new Error('Optional dependency "mime" is required for ' + i);
    return r;
   },
   charsets: {
    lookup: function(e) {
     return e && /^text\//.test(e) ? "UTF-8" : "";
    }
   }
  };
  for (var l = [ {
   name: "ceil"
  }, {
   name: "floor"
  }, {
   name: "sqrt"
  }, {
   name: "abs"
  }, {
   name: "tan",
   unit: ""
  }, {
   name: "sin",
   unit: ""
  }, {
   name: "cos",
   unit: ""
  }, {
   name: "atan",
   unit: "rad"
  }, {
   name: "asin",
   unit: "rad"
  }, {
   name: "acos",
   unit: "rad"
  } ], c = function(e, t) {
   return function(n) {
    return null != t && (n = n.unify()), this._math(Math[e], t, n);
   };
  }, u = 0; u < l.length; u++) o.functions[l[u].name] = c(l[u].name, l[u].unit);
  o.functionCall = function(e, t) {
   this.env = e, this.currentFileInfo = t;
  }, o.functionCall.prototype = o.functions;
 }(n("./tree")), function(e) {
  e.colors = {
   aliceblue: "#f0f8ff",
   antiquewhite: "#faebd7",
   aqua: "#00ffff",
   aquamarine: "#7fffd4",
   azure: "#f0ffff",
   beige: "#f5f5dc",
   bisque: "#ffe4c4",
   black: "#000000",
   blanchedalmond: "#ffebcd",
   blue: "#0000ff",
   blueviolet: "#8a2be2",
   brown: "#a52a2a",
   burlywood: "#deb887",
   cadetblue: "#5f9ea0",
   chartreuse: "#7fff00",
   chocolate: "#d2691e",
   coral: "#ff7f50",
   cornflowerblue: "#6495ed",
   cornsilk: "#fff8dc",
   crimson: "#dc143c",
   cyan: "#00ffff",
   darkblue: "#00008b",
   darkcyan: "#008b8b",
   darkgoldenrod: "#b8860b",
   darkgray: "#a9a9a9",
   darkgrey: "#a9a9a9",
   darkgreen: "#006400",
   darkkhaki: "#bdb76b",
   darkmagenta: "#8b008b",
   darkolivegreen: "#556b2f",
   darkorange: "#ff8c00",
   darkorchid: "#9932cc",
   darkred: "#8b0000",
   darksalmon: "#e9967a",
   darkseagreen: "#8fbc8f",
   darkslateblue: "#483d8b",
   darkslategray: "#2f4f4f",
   darkslategrey: "#2f4f4f",
   darkturquoise: "#00ced1",
   darkviolet: "#9400d3",
   deeppink: "#ff1493",
   deepskyblue: "#00bfff",
   dimgray: "#696969",
   dimgrey: "#696969",
   dodgerblue: "#1e90ff",
   firebrick: "#b22222",
   floralwhite: "#fffaf0",
   forestgreen: "#228b22",
   fuchsia: "#ff00ff",
   gainsboro: "#dcdcdc",
   ghostwhite: "#f8f8ff",
   gold: "#ffd700",
   goldenrod: "#daa520",
   gray: "#808080",
   grey: "#808080",
   green: "#008000",
   greenyellow: "#adff2f",
   honeydew: "#f0fff0",
   hotpink: "#ff69b4",
   indianred: "#cd5c5c",
   indigo: "#4b0082",
   ivory: "#fffff0",
   khaki: "#f0e68c",
   lavender: "#e6e6fa",
   lavenderblush: "#fff0f5",
   lawngreen: "#7cfc00",
   lemonchiffon: "#fffacd",
   lightblue: "#add8e6",
   lightcoral: "#f08080",
   lightcyan: "#e0ffff",
   lightgoldenrodyellow: "#fafad2",
   lightgray: "#d3d3d3",
   lightgrey: "#d3d3d3",
   lightgreen: "#90ee90",
   lightpink: "#ffb6c1",
   lightsalmon: "#ffa07a",
   lightseagreen: "#20b2aa",
   lightskyblue: "#87cefa",
   lightslategray: "#778899",
   lightslategrey: "#778899",
   lightsteelblue: "#b0c4de",
   lightyellow: "#ffffe0",
   lime: "#00ff00",
   limegreen: "#32cd32",
   linen: "#faf0e6",
   magenta: "#ff00ff",
   maroon: "#800000",
   mediumaquamarine: "#66cdaa",
   mediumblue: "#0000cd",
   mediumorchid: "#ba55d3",
   mediumpurple: "#9370d8",
   mediumseagreen: "#3cb371",
   mediumslateblue: "#7b68ee",
   mediumspringgreen: "#00fa9a",
   mediumturquoise: "#48d1cc",
   mediumvioletred: "#c71585",
   midnightblue: "#191970",
   mintcream: "#f5fffa",
   mistyrose: "#ffe4e1",
   moccasin: "#ffe4b5",
   navajowhite: "#ffdead",
   navy: "#000080",
   oldlace: "#fdf5e6",
   olive: "#808000",
   olivedrab: "#6b8e23",
   orange: "#ffa500",
   orangered: "#ff4500",
   orchid: "#da70d6",
   palegoldenrod: "#eee8aa",
   palegreen: "#98fb98",
   paleturquoise: "#afeeee",
   palevioletred: "#d87093",
   papayawhip: "#ffefd5",
   peachpuff: "#ffdab9",
   peru: "#cd853f",
   pink: "#ffc0cb",
   plum: "#dda0dd",
   powderblue: "#b0e0e6",
   purple: "#800080",
   red: "#ff0000",
   rosybrown: "#bc8f8f",
   royalblue: "#4169e1",
   saddlebrown: "#8b4513",
   salmon: "#fa8072",
   sandybrown: "#f4a460",
   seagreen: "#2e8b57",
   seashell: "#fff5ee",
   sienna: "#a0522d",
   silver: "#c0c0c0",
   skyblue: "#87ceeb",
   slateblue: "#6a5acd",
   slategray: "#708090",
   slategrey: "#708090",
   snow: "#fffafa",
   springgreen: "#00ff7f",
   steelblue: "#4682b4",
   tan: "#d2b48c",
   teal: "#008080",
   thistle: "#d8bfd8",
   tomato: "#ff6347",
   turquoise: "#40e0d0",
   violet: "#ee82ee",
   wheat: "#f5deb3",
   white: "#ffffff",
   whitesmoke: "#f5f5f5",
   yellow: "#ffff00",
   yellowgreen: "#9acd32"
  };
 }(n("./tree")), function(e) {
  e.Alpha = function(e) {
   this.value = e;
  }, e.Alpha.prototype = {
   type: "Alpha",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   eval: function(e) {
    return this.value.eval && (this.value = this.value.eval(e)), this;
   },
   toCSS: function() {
    return "alpha(opacity=" + (this.value.toCSS ? this.value.toCSS() : this.value) + ")";
   }
  };
 }(n("../tree")), function(e) {
  e.Anonymous = function(e) {
   this.value = e.value || e;
  }, e.Anonymous.prototype = {
   type: "Anonymous",
   toCSS: function() {
    return this.value;
   },
   eval: function() {
    return this;
   },
   compare: function(e) {
    if (!e.toCSS) return -1;
    var t = this.toCSS(), n = e.toCSS();
    return t === n ? 0 : n > t ? -1 : 1;
   }
  };
 }(n("../tree")), function(e) {
  e.Assignment = function(e, t) {
   this.key = e, this.value = t;
  }, e.Assignment.prototype = {
   type: "Assignment",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   toCSS: function() {
    return this.key + "=" + (this.value.toCSS ? this.value.toCSS() : this.value);
   },
   eval: function(t) {
    return this.value.eval ? new e.Assignment(this.key, this.value.eval(t)) : this;
   }
  };
 }(n("../tree")), function(e) {
  e.Call = function(e, t, n, o) {
   this.name = e, this.args = t, this.index = n, this.currentFileInfo = o;
  }, e.Call.prototype = {
   type: "Call",
   accept: function(e) {
    this.args = e.visit(this.args);
   },
   eval: function(t) {
    var n, o, i = this.args.map(function(e) {
     return e.eval(t);
    }), r = this.name.toLowerCase();
    if (r in e.functions) try {
     if (o = new e.functionCall(t, this.currentFileInfo), n = o[r].apply(o, i), null != n) return n;
    } catch (a) {
     throw {
      type: a.type || "Runtime",
      message: "error evaluating function `" + this.name + "`" + (a.message ? ": " + a.message : ""),
      index: this.index,
      filename: this.currentFileInfo.filename
     };
    }
    return new e.Anonymous(this.name + "(" + i.map(function(e) {
     return e.toCSS(t);
    }).join(", ") + ")");
   },
   toCSS: function(e) {
    return this.eval(e).toCSS();
   }
  };
 }(n("../tree")), function(e) {
  e.Color = function(e, t) {
   this.rgb = Array.isArray(e) ? e : 6 == e.length ? e.match(/.{2}/g).map(function(e) {
    return parseInt(e, 16);
   }) : e.split("").map(function(e) {
    return parseInt(e + e, 16);
   }), this.alpha = "number" == typeof t ? t : 1;
  }, e.Color.prototype = {
   type: "Color",
   eval: function() {
    return this;
   },
   luma: function() {
    return .2126 * this.rgb[0] / 255 + .7152 * this.rgb[1] / 255 + .0722 * this.rgb[2] / 255;
   },
   toCSS: function(e, t) {
    var n = e && e.compress && !t;
    if (this.alpha < 1) return "rgba(" + this.rgb.map(function(e) {
     return Math.round(e);
    }).concat(this.alpha).join("," + (n ? "" : " ")) + ")";
    var o = this.rgb.map(function(e) {
     return e = Math.round(e), e = (e > 255 ? 255 : 0 > e ? 0 : e).toString(16), 1 === e.length ? "0" + e : e;
    }).join("");
    return n && (o = o.split(""), o = o[0] == o[1] && o[2] == o[3] && o[4] == o[5] ? o[0] + o[2] + o[4] : o.join("")), 
    "#" + o;
   },
   operate: function(t, n, o) {
    var i = [];
    o instanceof e.Color || (o = o.toColor());
    for (var r = 0; 3 > r; r++) i[r] = e.operate(t, n, this.rgb[r], o.rgb[r]);
    return new e.Color(i, this.alpha + o.alpha);
   },
   toHSL: function() {
    var e, t, n = this.rgb[0] / 255, o = this.rgb[1] / 255, i = this.rgb[2] / 255, r = this.alpha, a = Math.max(n, o, i), s = Math.min(n, o, i), l = (a + s) / 2, c = a - s;
    if (a === s) e = t = 0; else {
     switch (t = l > .5 ? c / (2 - a - s) : c / (a + s), a) {
     case n:
      e = (o - i) / c + (i > o ? 6 : 0);
      break;

     case o:
      e = (i - n) / c + 2;
      break;

     case i:
      e = (n - o) / c + 4;
     }
     e /= 6;
    }
    return {
     h: 360 * e,
     s: t,
     l: l,
     a: r
    };
   },
   toHSV: function() {
    var e, t, n = this.rgb[0] / 255, o = this.rgb[1] / 255, i = this.rgb[2] / 255, r = this.alpha, a = Math.max(n, o, i), s = Math.min(n, o, i), l = a, c = a - s;
    if (t = 0 === a ? 0 : c / a, a === s) e = 0; else {
     switch (a) {
     case n:
      e = (o - i) / c + (i > o ? 6 : 0);
      break;

     case o:
      e = (i - n) / c + 2;
      break;

     case i:
      e = (n - o) / c + 4;
     }
     e /= 6;
    }
    return {
     h: 360 * e,
     s: t,
     v: l,
     a: r
    };
   },
   toARGB: function() {
    var e = [ Math.round(255 * this.alpha) ].concat(this.rgb);
    return "#" + e.map(function(e) {
     return e = Math.round(e), e = (e > 255 ? 255 : 0 > e ? 0 : e).toString(16), 1 === e.length ? "0" + e : e;
    }).join("");
   },
   compare: function(e) {
    return e.rgb ? e.rgb[0] === this.rgb[0] && e.rgb[1] === this.rgb[1] && e.rgb[2] === this.rgb[2] && e.alpha === this.alpha ? 0 : -1 : -1;
   }
  };
 }(n("../tree")), function(e) {
  e.Comment = function(e, t) {
   this.value = e, this.silent = !!t;
  }, e.Comment.prototype = {
   type: "Comment",
   toCSS: function(e) {
    return e.compress ? "" : this.value;
   },
   eval: function() {
    return this;
   }
  };
 }(n("../tree")), function(e) {
  e.Condition = function(e, t, n, o, i) {
   this.op = e.trim(), this.lvalue = t, this.rvalue = n, this.index = o, this.negate = i;
  }, e.Condition.prototype = {
   type: "Condition",
   accept: function(e) {
    this.lvalue = e.visit(this.lvalue), this.rvalue = e.visit(this.rvalue);
   },
   eval: function(e) {
    var t, n = this.lvalue.eval(e), o = this.rvalue.eval(e), i = this.index, t = function(e) {
     switch (e) {
     case "and":
      return n && o;

     case "or":
      return n || o;

     default:
      if (n.compare) t = n.compare(o); else {
       if (!o.compare) throw {
        type: "Type",
        message: "Unable to perform comparison",
        index: i
       };
       t = o.compare(n);
      }
      switch (t) {
      case -1:
       return "<" === e || "=<" === e;

      case 0:
       return "=" === e || ">=" === e || "=<" === e;

      case 1:
       return ">" === e || ">=" === e;
      }
     }
    }(this.op);
    return this.negate ? !t : t;
   }
  };
 }(n("../tree")), function(e) {
  e.Dimension = function(n, o) {
   this.value = parseFloat(n), this.unit = o && o instanceof e.Unit ? o : new e.Unit(o ? [ o ] : t);
  }, e.Dimension.prototype = {
   type: "Dimension",
   accept: function(e) {
    this.unit = e.visit(this.unit);
   },
   eval: function() {
    return this;
   },
   toColor: function() {
    return new e.Color([ this.value, this.value, this.value ]);
   },
   toCSS: function(e) {
    if (e && e.strictUnits && !this.unit.isSingular()) throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
    var t = this.value, n = String(t);
    if (0 !== t && 1e-6 > t && t > -1e-6 && (n = t.toFixed(20).replace(/0+$/, "")), 
    e && e.compress) {
     if (0 === t && !this.unit.isAngle()) return n;
     t > 0 && 1 > t && (n = n.substr(1));
    }
    return n + this.unit.toCSS(e);
   },
   operate: function(t, n, o) {
    var i = e.operate(t, n, this.value, o.value), r = this.unit.clone();
    if ("+" === n || "-" === n) if (0 === r.numerator.length && 0 === r.denominator.length) r.numerator = o.unit.numerator.slice(0), 
    r.denominator = o.unit.denominator.slice(0); else if (0 == o.unit.numerator.length && 0 == r.denominator.length) ; else {
     if (o = o.convertTo(this.unit.usedUnits()), t.strictUnits && o.unit.toString() !== r.toString()) throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + r.toString() + "' and '" + o.unit.toString() + "'.");
     i = e.operate(t, n, this.value, o.value);
    } else "*" === n ? (r.numerator = r.numerator.concat(o.unit.numerator).sort(), r.denominator = r.denominator.concat(o.unit.denominator).sort(), 
    r.cancel()) : "/" === n && (r.numerator = r.numerator.concat(o.unit.denominator).sort(), 
    r.denominator = r.denominator.concat(o.unit.numerator).sort(), r.cancel());
    return new e.Dimension(i, r);
   },
   compare: function(t) {
    if (t instanceof e.Dimension) {
     var n = this.unify(), o = t.unify(), i = n.value, r = o.value;
     return r > i ? -1 : i > r ? 1 : o.unit.isEmpty() || 0 === n.unit.compare(o.unit) ? 0 : -1;
    }
    return -1;
   },
   unify: function() {
    return this.convertTo({
     length: "m",
     duration: "s",
     angle: "rad"
    });
   },
   convertTo: function(t) {
    var n, o, i, r, a = this.value, s = this.unit.clone(), l = {};
    if ("string" == typeof t) {
     for (n in e.UnitConversions) e.UnitConversions[n].hasOwnProperty(t) && (l = {}, 
     l[n] = t);
     t = l;
    }
    for (o in t) t.hasOwnProperty(o) && (r = t[o], i = e.UnitConversions[o], s.map(function(e, t) {
     return i.hasOwnProperty(e) ? (t ? a /= i[e] / i[r] : a *= i[e] / i[r], r) : e;
    }));
    return s.cancel(), new e.Dimension(a, s);
   }
  }, e.UnitConversions = {
   length: {
    m: 1,
    cm: .01,
    mm: .001,
    "in": .0254,
    pt: .0254 / 72,
    pc: 12 * (.0254 / 72)
   },
   duration: {
    s: 1,
    ms: .001
   },
   angle: {
    rad: 1 / (2 * Math.PI),
    deg: 1 / 360,
    grad: .0025,
    turn: 1
   }
  }, e.Unit = function(e, t, n) {
   this.numerator = e ? e.slice(0).sort() : [], this.denominator = t ? t.slice(0).sort() : [], 
   this.backupUnit = n;
  }, e.Unit.prototype = {
   type: "Unit",
   clone: function() {
    return new e.Unit(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit);
   },
   toCSS: function(e) {
    return this.numerator.length >= 1 ? this.numerator[0] : this.denominator.length >= 1 ? this.denominator[0] : e && e.strictUnits || !this.backupUnit ? "" : this.backupUnit;
   },
   toString: function() {
    var e, t = this.numerator.join("*");
    for (e = 0; e < this.denominator.length; e++) t += "/" + this.denominator[e];
    return t;
   },
   compare: function(e) {
    return this.is(e.toString()) ? 0 : -1;
   },
   is: function(e) {
    return this.toString() === e;
   },
   isAngle: function() {
    return e.UnitConversions.angle.hasOwnProperty(this.toCSS());
   },
   isEmpty: function() {
    return 0 == this.numerator.length && 0 == this.denominator.length;
   },
   isSingular: function() {
    return this.numerator.length <= 1 && 0 == this.denominator.length;
   },
   map: function(e) {
    var t;
    for (t = 0; t < this.numerator.length; t++) this.numerator[t] = e(this.numerator[t], !1);
    for (t = 0; t < this.denominator.length; t++) this.denominator[t] = e(this.denominator[t], !0);
   },
   usedUnits: function() {
    var t, n, o = {};
    for (n in e.UnitConversions) e.UnitConversions.hasOwnProperty(n) && (t = e.UnitConversions[n], 
    this.map(function(e) {
     return t.hasOwnProperty(e) && !o[n] && (o[n] = e), e;
    }));
    return o;
   },
   cancel: function() {
    var e, t, n, o = {};
    for (t = 0; t < this.numerator.length; t++) e = this.numerator[t], n || (n = e), 
    o[e] = (o[e] || 0) + 1;
    for (t = 0; t < this.denominator.length; t++) e = this.denominator[t], n || (n = e), 
    o[e] = (o[e] || 0) - 1;
    this.numerator = [], this.denominator = [];
    for (e in o) if (o.hasOwnProperty(e)) {
     var i = o[e];
     if (i > 0) for (t = 0; i > t; t++) this.numerator.push(e); else if (0 > i) for (t = 0; -i > t; t++) this.denominator.push(e);
    }
    0 === this.numerator.length && 0 === this.denominator.length && n && (this.backupUnit = n), 
    this.numerator.sort(), this.denominator.sort();
   }
  };
 }(n("../tree")), function(e) {
  e.Directive = function(t, n) {
   this.name = t, Array.isArray(n) ? (this.ruleset = new e.Ruleset([], n), this.ruleset.allowImports = !0) : this.value = n;
  }, e.Directive.prototype = {
   type: "Directive",
   accept: function(e) {
    this.ruleset = e.visit(this.ruleset), this.value = e.visit(this.value);
   },
   toCSS: function(e) {
    return this.ruleset ? (this.ruleset.root = !0, this.name + (e.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e).trim().replace(/\n/g, "\n  ") + (e.compress ? "}" : "\n}\n")) : this.name + " " + this.value.toCSS() + ";\n";
   },
   eval: function(t) {
    var n = this;
    return this.ruleset && (t.frames.unshift(this), n = new e.Directive(this.name), 
    n.ruleset = this.ruleset.eval(t), t.frames.shift()), n;
   },
   variable: function(t) {
    return e.Ruleset.prototype.variable.call(this.ruleset, t);
   },
   find: function() {
    return e.Ruleset.prototype.find.apply(this.ruleset, arguments);
   },
   rulesets: function() {
    return e.Ruleset.prototype.rulesets.apply(this.ruleset);
   }
  };
 }(n("../tree")), function(e) {
  e.Element = function(t, n, o) {
   this.combinator = t instanceof e.Combinator ? t : new e.Combinator(t), this.value = "string" == typeof n ? n.trim() : n ? n : "", 
   this.index = o;
  }, e.Element.prototype = {
   type: "Element",
   accept: function(e) {
    this.combinator = e.visit(this.combinator), this.value = e.visit(this.value);
   },
   eval: function(t) {
    return new e.Element(this.combinator, this.value.eval ? this.value.eval(t) : this.value, this.index);
   },
   toCSS: function(e) {
    var t = this.value.toCSS ? this.value.toCSS(e) : this.value;
    return "" == t && "&" == this.combinator.value.charAt(0) ? "" : this.combinator.toCSS(e || {}) + t;
   }
  }, e.Attribute = function(e, t, n) {
   this.key = e, this.op = t, this.value = n;
  }, e.Attribute.prototype = {
   type: "Attribute",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   eval: function(t) {
    return new e.Attribute(this.key.eval ? this.key.eval(t) : this.key, this.op, this.value && this.value.eval ? this.value.eval(t) : this.value);
   },
   toCSS: function(e) {
    var t = this.key.toCSS ? this.key.toCSS(e) : this.key;
    return this.op && (t += this.op, t += this.value.toCSS ? this.value.toCSS(e) : this.value), 
    "[" + t + "]";
   }
  }, e.Combinator = function(e) {
   this.value = " " === e ? " " : e ? e.trim() : "";
  }, e.Combinator.prototype = {
   type: "Combinator",
   toCSS: function(e) {
    return {
     "": "",
     " ": " ",
     ":": " :",
     "+": e.compress ? "+" : " + ",
     "~": e.compress ? "~" : " ~ ",
     ">": e.compress ? ">" : " > ",
     "|": e.compress ? "|" : " | "
    }[this.value];
   }
  };
 }(n("../tree")), function(e) {
  e.Expression = function(e) {
   this.value = e;
  }, e.Expression.prototype = {
   type: "Expression",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   eval: function(t) {
    var n, o = this.parens && !this.parensInOp, i = !1;
    return o && t.inParenthesis(), this.value.length > 1 ? n = new e.Expression(this.value.map(function(e) {
     return e.eval(t);
    })) : 1 === this.value.length ? (this.value[0].parens && !this.value[0].parensInOp && (i = !0), 
    n = this.value[0].eval(t)) : n = this, o && t.outOfParenthesis(), this.parens && this.parensInOp && !t.isMathOn() && !i && (n = new e.Paren(n)), 
    n;
   },
   toCSS: function(e) {
    return this.value.map(function(t) {
     return t.toCSS ? t.toCSS(e) : "";
    }).join(" ");
   },
   throwAwayComments: function() {
    this.value = this.value.filter(function(t) {
     return !(t instanceof e.Comment);
    });
   }
  };
 }(n("../tree")), function(e) {
  e.Extend = function(e, t, n) {
   switch (this.selector = e, this.option = t, this.index = n, t) {
   case "all":
    this.allowBefore = !0, this.allowAfter = !0;
    break;

   default:
    this.allowBefore = !1, this.allowAfter = !1;
   }
  }, e.Extend.prototype = {
   type: "Extend",
   accept: function(e) {
    this.selector = e.visit(this.selector);
   },
   eval: function(t) {
    return new e.Extend(this.selector.eval(t), this.option, this.index);
   },
   clone: function() {
    return new e.Extend(this.selector, this.option, this.index);
   },
   findSelfSelectors: function(e) {
    var t, n = [];
    for (t = 0; t < e.length; t++) n = n.concat(e[t].elements);
    this.selfSelectors = [ {
     elements: n
    } ];
   }
  };
 }(n("../tree")), function(e) {
  e.Import = function(e, n, o, i, r) {
   if (this.options = o, this.index = i, this.path = e, this.features = n, this.currentFileInfo = r, 
   this.options.less !== t) this.css = !this.options.less; else {
    var a = this.getPath();
    a && /css([\?;].*)?$/.test(a) && (this.css = !0);
   }
  }, e.Import.prototype = {
   type: "Import",
   accept: function(e) {
    this.features = e.visit(this.features), this.path = e.visit(this.path), this.root = e.visit(this.root);
   },
   toCSS: function(e) {
    var t = this.features ? " " + this.features.toCSS(e) : "";
    return this.css ? "@import " + this.path.toCSS() + t + ";\n" : "";
   },
   getPath: function() {
    if (this.path instanceof e.Quoted) {
     var n = this.path.value;
     return this.css !== t || /(\.[a-z]*$)|([\?;].*)$/.test(n) ? n : n + ".less";
    }
    return this.path instanceof e.URL ? this.path.value.value : null;
   },
   evalForImport: function(t) {
    return new e.Import(this.path.eval(t), this.features, this.options, this.index, this.currentFileInfo);
   },
   evalPath: function(t) {
    var n = this.path.eval(t), o = this.currentFileInfo && this.currentFileInfo.rootpath;
    if (o && !(n instanceof e.URL)) {
     var i = n.value;
     i && t.isPathRelative(i) && (n.value = o + i);
    }
    return n;
   },
   eval: function(t) {
    var n, o = this.features && this.features.eval(t);
    if (this.skip) return [];
    if (this.css) {
     var i = new e.Import(this.evalPath(t), o, this.options, this.index);
     if (!i.css && this.error) throw this.error;
     return i;
    }
    return n = new e.Ruleset([], this.root.rules.slice(0)), n.evalImports(t), this.features ? new e.Media(n.rules, this.features.value) : n.rules;
   }
  };
 }(n("../tree")), function(e) {
  e.JavaScript = function(e, t, n) {
   this.escaped = n, this.expression = e, this.index = t;
  }, e.JavaScript.prototype = {
   type: "JavaScript",
   eval: function(t) {
    var n, o = this, i = {}, r = this.expression.replace(/@\{([\w-]+)\}/g, function(n, i) {
     return e.jsify(new e.Variable("@" + i, o.index).eval(t));
    });
    try {
     r = new Function("return (" + r + ")");
    } catch (a) {
     throw {
      message: "JavaScript evaluation error: `" + r + "`",
      index: this.index
     };
    }
    for (var s in t.frames[0].variables()) i[s.slice(1)] = {
     value: t.frames[0].variables()[s].value,
     toJS: function() {
      return this.value.eval(t).toCSS();
     }
    };
    try {
     n = r.call(i);
    } catch (a) {
     throw {
      message: "JavaScript evaluation error: '" + a.name + ": " + a.message + "'",
      index: this.index
     };
    }
    return "string" == typeof n ? new e.Quoted('"' + n + '"', n, this.escaped, this.index) : Array.isArray(n) ? new e.Anonymous(n.join(", ")) : new e.Anonymous(n);
   }
  };
 }(n("../tree")), function(e) {
  e.Keyword = function(e) {
   this.value = e;
  }, e.Keyword.prototype = {
   type: "Keyword",
   eval: function() {
    return this;
   },
   toCSS: function() {
    return this.value;
   },
   compare: function(t) {
    return t instanceof e.Keyword ? t.value === this.value ? 0 : 1 : -1;
   }
  }, e.True = new e.Keyword("true"), e.False = new e.Keyword("false");
 }(n("../tree")), function(e) {
  e.Media = function(t, n) {
   var o = this.emptySelectors();
   this.features = new e.Value(n), this.ruleset = new e.Ruleset(o, t), this.ruleset.allowImports = !0;
  }, e.Media.prototype = {
   type: "Media",
   accept: function(e) {
    this.features = e.visit(this.features), this.ruleset = e.visit(this.ruleset);
   },
   toCSS: function(e) {
    var t = this.features.toCSS(e);
    return "@media " + t + (e.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e).trim().replace(/\n/g, "\n  ") + (e.compress ? "}" : "\n}\n");
   },
   eval: function(t) {
    t.mediaBlocks || (t.mediaBlocks = [], t.mediaPath = []);
    var n = new e.Media([], []);
    this.debugInfo && (this.ruleset.debugInfo = this.debugInfo, n.debugInfo = this.debugInfo);
    var o = !1;
    t.strictMath || (o = !0, t.strictMath = !0);
    try {
     n.features = this.features.eval(t);
    } finally {
     o && (t.strictMath = !1);
    }
    return t.mediaPath.push(n), t.mediaBlocks.push(n), t.frames.unshift(this.ruleset), 
    n.ruleset = this.ruleset.eval(t), t.frames.shift(), t.mediaPath.pop(), 0 === t.mediaPath.length ? n.evalTop(t) : n.evalNested(t);
   },
   variable: function(t) {
    return e.Ruleset.prototype.variable.call(this.ruleset, t);
   },
   find: function() {
    return e.Ruleset.prototype.find.apply(this.ruleset, arguments);
   },
   rulesets: function() {
    return e.Ruleset.prototype.rulesets.apply(this.ruleset);
   },
   emptySelectors: function() {
    var t = new e.Element("", "&", 0);
    return [ new e.Selector([ t ]) ];
   },
   evalTop: function(t) {
    var n = this;
    if (t.mediaBlocks.length > 1) {
     var o = this.emptySelectors();
     n = new e.Ruleset(o, t.mediaBlocks), n.multiMedia = !0;
    }
    return delete t.mediaBlocks, delete t.mediaPath, n;
   },
   evalNested: function(t) {
    var n, o, i = t.mediaPath.concat([ this ]);
    for (n = 0; n < i.length; n++) o = i[n].features instanceof e.Value ? i[n].features.value : i[n].features, 
    i[n] = Array.isArray(o) ? o : [ o ];
    return this.features = new e.Value(this.permute(i).map(function(t) {
     for (t = t.map(function(t) {
      return t.toCSS ? t : new e.Anonymous(t);
     }), n = t.length - 1; n > 0; n--) t.splice(n, 0, new e.Anonymous("and"));
     return new e.Expression(t);
    })), new e.Ruleset([], []);
   },
   permute: function(e) {
    if (0 === e.length) return [];
    if (1 === e.length) return e[0];
    for (var t = [], n = this.permute(e.slice(1)), o = 0; o < n.length; o++) for (var i = 0; i < e[0].length; i++) t.push([ e[0][i] ].concat(n[o]));
    return t;
   },
   bubbleSelectors: function(t) {
    this.ruleset = new e.Ruleset(t.slice(0), [ this.ruleset ]);
   }
  };
 }(n("../tree")), function(e) {
  e.mixin = {}, e.mixin.Call = function(t, n, o, i, r) {
   this.selector = new e.Selector(t), this.arguments = n, this.index = o, this.currentFileInfo = i, 
   this.important = r;
  }, e.mixin.Call.prototype = {
   type: "MixinCall",
   accept: function(e) {
    this.selector = e.visit(this.selector), this.arguments = e.visit(this.arguments);
   },
   eval: function(t) {
    var n, o, i, r, a, s, l, c, u = [], d = !1;
    for (i = this.arguments && this.arguments.map(function(e) {
     return {
      name: e.name,
      value: e.value.eval(t)
     };
    }), r = 0; r < t.frames.length; r++) if ((n = t.frames[r].find(this.selector)).length > 0) {
     for (c = !0, a = 0; a < n.length; a++) {
      for (o = n[a], l = !1, s = 0; s < t.frames.length; s++) if (!(o instanceof e.mixin.Definition) && o === (t.frames[s].originalRuleset || t.frames[s])) {
       l = !0;
       break;
      }
      if (!l && o.matchArgs(i, t)) {
       if (!o.matchCondition || o.matchCondition(i, t)) try {
        Array.prototype.push.apply(u, o.eval(t, i, this.important).rules);
       } catch (p) {
        throw {
         message: p.message,
         index: this.index,
         filename: this.currentFileInfo.filename,
         stack: p.stack
        };
       }
       d = !0;
      }
     }
     if (d) return u;
    }
    throw c ? {
     type: "Runtime",
     message: "No matching definition was found for `" + this.selector.toCSS().trim() + "(" + (i ? i.map(function(e) {
      var t = "";
      return e.name && (t += e.name + ":"), t += e.value.toCSS ? e.value.toCSS() : "???";
     }).join(", ") : "") + ")`",
     index: this.index,
     filename: this.currentFileInfo.filename
    } : {
     type: "Name",
     message: this.selector.toCSS().trim() + " is undefined",
     index: this.index,
     filename: this.currentFileInfo.filename
    };
   }
  }, e.mixin.Definition = function(t, n, o, i, r) {
   this.name = t, this.selectors = [ new e.Selector([ new e.Element(null, t) ]) ], 
   this.params = n, this.condition = i, this.variadic = r, this.arity = n.length, this.rules = o, 
   this._lookups = {}, this.required = n.reduce(function(e, t) {
    return !t.name || t.name && !t.value ? e + 1 : e;
   }, 0), this.parent = e.Ruleset.prototype, this.frames = [];
  }, e.mixin.Definition.prototype = {
   type: "MixinDefinition",
   accept: function(e) {
    this.params = e.visit(this.params), this.rules = e.visit(this.rules), this.condition = e.visit(this.condition);
   },
   toCSS: function() {
    return "";
   },
   variable: function(e) {
    return this.parent.variable.call(this, e);
   },
   variables: function() {
    return this.parent.variables.call(this);
   },
   find: function() {
    return this.parent.find.apply(this, arguments);
   },
   rulesets: function() {
    return this.parent.rulesets.apply(this);
   },
   evalParams: function(t, n, o, i) {
    var r, a, s, l, c, u, d, p, f = new e.Ruleset(null, []), h = this.params.slice(0);
    if (n = new e.evalEnv(n, [ f ].concat(n.frames)), o) for (o = o.slice(0), s = 0; s < o.length; s++) if (a = o[s], 
    u = a && a.name) {
     for (d = !1, l = 0; l < h.length; l++) if (!i[l] && u === h[l].name) {
      i[l] = a.value.eval(t), f.rules.unshift(new e.Rule(u, a.value.eval(t))), d = !0;
      break;
     }
     if (d) {
      o.splice(s, 1), s--;
      continue;
     }
     throw {
      type: "Runtime",
      message: "Named argument for " + this.name + " " + o[s].name + " not found"
     };
    }
    for (p = 0, s = 0; s < h.length; s++) if (!i[s]) {
     if (a = o && o[p], u = h[s].name) if (h[s].variadic && o) {
      for (r = [], l = p; l < o.length; l++) r.push(o[l].value.eval(t));
      f.rules.unshift(new e.Rule(u, new e.Expression(r).eval(t)));
     } else {
      if (c = a && a.value) c = c.eval(t); else {
       if (!h[s].value) throw {
        type: "Runtime",
        message: "wrong number of arguments for " + this.name + " (" + o.length + " for " + this.arity + ")"
       };
       c = h[s].value.eval(n), f.resetCache();
      }
      f.rules.unshift(new e.Rule(u, c)), i[s] = c;
     }
     if (h[s].variadic && o) for (l = p; l < o.length; l++) i[l] = o[l].value.eval(t);
     p++;
    }
    return f;
   },
   eval: function(t, n, o) {
    var i, r, a = [], s = this.frames.concat(t.frames), l = this.evalParams(t, new e.evalEnv(t, s), n, a);
    return l.rules.unshift(new e.Rule("@arguments", new e.Expression(a).eval(t))), i = o ? this.parent.makeImportant.apply(this).rules : this.rules.slice(0), 
    r = new e.Ruleset(null, i).eval(new e.evalEnv(t, [ this, l ].concat(s))), r.originalRuleset = this, 
    r;
   },
   matchCondition: function(t, n) {
    return this.condition && !this.condition.eval(new e.evalEnv(n, [ this.evalParams(n, new e.evalEnv(n, this.frames.concat(n.frames)), t, []) ].concat(n.frames))) ? !1 : !0;
   },
   matchArgs: function(e, t) {
    var n, o = e && e.length || 0;
    if (!this.variadic) {
     if (o < this.required) return !1;
     if (o > this.params.length) return !1;
     if (this.required > 0 && o > this.params.length) return !1;
    }
    n = Math.min(o, this.arity);
    for (var i = 0; n > i; i++) if (!this.params[i].name && !this.params[i].variadic && e[i].value.eval(t).toCSS() != this.params[i].value.eval(t).toCSS()) return !1;
    return !0;
   }
  };
 }(n("../tree")), function(e) {
  e.Negative = function(e) {
   this.value = e;
  }, e.Negative.prototype = {
   type: "Negative",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   toCSS: function(e) {
    return "-" + this.value.toCSS(e);
   },
   eval: function(t) {
    return t.isMathOn() ? new e.Operation("*", [ new e.Dimension(-1), this.value ]).eval(t) : new e.Negative(this.value.eval(t));
   }
  };
 }(n("../tree")), function(e) {
  e.Operation = function(e, t, n) {
   this.op = e.trim(), this.operands = t, this.isSpaced = n;
  }, e.Operation.prototype = {
   type: "Operation",
   accept: function(e) {
    this.operands = e.visit(this.operands);
   },
   eval: function(t) {
    var n, o = this.operands[0].eval(t), i = this.operands[1].eval(t);
    if (t.isMathOn()) {
     if (o instanceof e.Dimension && i instanceof e.Color) {
      if ("*" !== this.op && "+" !== this.op) throw {
       type: "Operation",
       message: "Can't substract or divide a color from a number"
      };
      n = i, i = o, o = n;
     }
     if (!o.operate) throw {
      type: "Operation",
      message: "Operation on an invalid type"
     };
     return o.operate(t, this.op, i);
    }
    return new e.Operation(this.op, [ o, i ], this.isSpaced);
   },
   toCSS: function() {
    var e = this.isSpaced ? " " : "";
    return this.operands[0].toCSS() + e + this.op + e + this.operands[1].toCSS();
   }
  }, e.operate = function(e, t, n, o) {
   switch (t) {
   case "+":
    return n + o;

   case "-":
    return n - o;

   case "*":
    return n * o;

   case "/":
    return n / o;
   }
  };
 }(n("../tree")), function(e) {
  e.Paren = function(e) {
   this.value = e;
  }, e.Paren.prototype = {
   type: "Paren",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   toCSS: function(e) {
    return "(" + this.value.toCSS(e).trim() + ")";
   },
   eval: function(t) {
    return new e.Paren(this.value.eval(t));
   }
  };
 }(n("../tree")), function(e) {
  e.Quoted = function(e, t, n, o, i) {
   this.escaped = n, this.value = t || "", this.quote = e.charAt(0), this.index = o, 
   this.currentFileInfo = i;
  }, e.Quoted.prototype = {
   type: "Quoted",
   toCSS: function() {
    return this.escaped ? this.value : this.quote + this.value + this.quote;
   },
   eval: function(t) {
    var n = this, o = this.value.replace(/`([^`]+)`/g, function(o, i) {
     return new e.JavaScript(i, n.index, !0).eval(t).value;
    }).replace(/@\{([\w-]+)\}/g, function(o, i) {
     var r = new e.Variable("@" + i, n.index, n.currentFileInfo).eval(t, !0);
     return r instanceof e.Quoted ? r.value : r.toCSS();
    });
    return new e.Quoted(this.quote + o + this.quote, o, this.escaped, this.index);
   },
   compare: function(e) {
    if (!e.toCSS) return -1;
    var t = this.toCSS(), n = e.toCSS();
    return t === n ? 0 : n > t ? -1 : 1;
   }
  };
 }(n("../tree")), function(e) {
  e.Rule = function(t, n, o, i, r, a) {
   this.name = t, this.value = n instanceof e.Value ? n : new e.Value([ n ]), this.important = o ? " " + o.trim() : "", 
   this.index = i, this.currentFileInfo = r, this.inline = a || !1, this.variable = "@" === t.charAt(0) ? !0 : !1;
  }, e.Rule.prototype = {
   type: "Rule",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   toCSS: function(e) {
    if (this.variable) return "";
    try {
     return this.name + (e.compress ? ":" : ": ") + this.value.toCSS(e) + this.important + (this.inline ? "" : ";");
    } catch (t) {
     throw t.index = this.index, t.filename = this.currentFileInfo.filename, t;
    }
   },
   eval: function(t) {
    var n = !1;
    "font" !== this.name || t.strictMath || (n = !0, t.strictMath = !0);
    try {
     return new e.Rule(this.name, this.value.eval(t), this.important, this.index, this.currentFileInfo, this.inline);
    } finally {
     n && (t.strictMath = !1);
    }
   },
   makeImportant: function() {
    return new e.Rule(this.name, this.value, "!important", this.index, this.currentFileInfo, this.inline);
   }
  };
 }(n("../tree")), function(e) {
  e.Ruleset = function(e, t, n) {
   this.selectors = e, this.rules = t, this._lookups = {}, this.strictImports = n;
  }, e.Ruleset.prototype = {
   type: "Ruleset",
   accept: function(e) {
    this.selectors = e.visit(this.selectors), this.rules = e.visit(this.rules);
   },
   eval: function(t) {
    var n, o = this.selectors && this.selectors.map(function(e) {
     return e.eval(t);
    }), i = new e.Ruleset(o, this.rules.slice(0), this.strictImports);
    i.originalRuleset = this, i.root = this.root, i.firstRoot = this.firstRoot, i.allowImports = this.allowImports, 
    this.debugInfo && (i.debugInfo = this.debugInfo), t.frames.unshift(i), t.selectors || (t.selectors = []), 
    t.selectors.unshift(this.selectors), (i.root || i.allowImports || !i.strictImports) && i.evalImports(t);
    for (var r = 0; r < i.rules.length; r++) i.rules[r] instanceof e.mixin.Definition && (i.rules[r].frames = t.frames.slice(0));
    for (var a = t.mediaBlocks && t.mediaBlocks.length || 0, r = 0; r < i.rules.length; r++) i.rules[r] instanceof e.mixin.Call && (n = i.rules[r].eval(t).filter(function(t) {
     return t instanceof e.Rule && t.variable ? !i.variable(t.name) : !0;
    }), i.rules.splice.apply(i.rules, [ r, 1 ].concat(n)), r += n.length - 1, i.resetCache());
    for (var s, r = 0; r < i.rules.length; r++) s = i.rules[r], s instanceof e.mixin.Definition || (i.rules[r] = s.eval ? s.eval(t) : s);
    if (t.frames.shift(), t.selectors.shift(), t.mediaBlocks) for (var r = a; r < t.mediaBlocks.length; r++) t.mediaBlocks[r].bubbleSelectors(o);
    return i;
   },
   evalImports: function(t) {
    var n, o;
    for (n = 0; n < this.rules.length; n++) this.rules[n] instanceof e.Import && (o = this.rules[n].eval(t), 
    "number" == typeof o.length ? (this.rules.splice.apply(this.rules, [ n, 1 ].concat(o)), 
    n += o.length - 1) : this.rules.splice(n, 1, o), this.resetCache());
   },
   makeImportant: function() {
    return new e.Ruleset(this.selectors, this.rules.map(function(e) {
     return e.makeImportant ? e.makeImportant() : e;
    }), this.strictImports);
   },
   matchArgs: function(e) {
    return !e || 0 === e.length;
   },
   resetCache: function() {
    this._rulesets = null, this._variables = null, this._lookups = {};
   },
   variables: function() {
    return this._variables ? this._variables : this._variables = this.rules.reduce(function(t, n) {
     return n instanceof e.Rule && n.variable === !0 && (t[n.name] = n), t;
    }, {});
   },
   variable: function(e) {
    return this.variables()[e];
   },
   rulesets: function() {
    return this.rules.filter(function(t) {
     return t instanceof e.Ruleset || t instanceof e.mixin.Definition;
    });
   },
   find: function(t, n) {
    n = n || this;
    var o, i = [], r = t.toCSS();
    return r in this._lookups ? this._lookups[r] : (this.rulesets().forEach(function(r) {
     if (r !== n) for (var a = 0; a < r.selectors.length; a++) if (o = t.match(r.selectors[a])) {
      t.elements.length > r.selectors[a].elements.length ? Array.prototype.push.apply(i, r.find(new e.Selector(t.elements.slice(1)), n)) : i.push(r);
      break;
     }
    }), this._lookups[r] = i);
   },
   toCSS: function(t) {
    for (var n, o, i, r = [], a = [], s = [], l = [], c = 0; c < this.rules.length; c++) if (i = this.rules[c], 
    i.rules || i instanceof e.Media) l.push(i.toCSS(t)); else if (i instanceof e.Directive) {
     var u = i.toCSS(t);
     if ("@charset" === i.name) {
      if (t.charset) {
       i.debugInfo && (l.push(e.debugInfo(t, i)), l.push(new e.Comment("/* " + u.replace(/\n/g, "") + " */\n").toCSS(t)));
       continue;
      }
      t.charset = !0;
     }
     l.push(u);
    } else if (i instanceof e.Comment) i.silent || (this.root ? l.push(i.toCSS(t)) : a.push(i.toCSS(t))); else if (i.toCSS && !i.variable) {
     if (this.firstRoot && i instanceof e.Rule) throw {
      message: "properties must be inside selector blocks, they cannot be in the root.",
      index: i.index,
      filename: i.currentFileInfo ? i.currentFileInfo.filename : null
     };
     a.push(i.toCSS(t));
    } else i.value && !i.variable && a.push(i.value.toString());
    if (t.compress && a.length && (i = a[a.length - 1], ";" === i.charAt(i.length - 1) && (a[a.length - 1] = i.substring(0, i.length - 1))), 
    l = l.join(""), this.root) r.push(a.join(t.compress ? "" : "\n")); else if (a.length > 0) {
     o = e.debugInfo(t, this), n = this.paths.map(function(e) {
      return e.map(function(e) {
       return e.toCSS(t);
      }).join("").trim();
     }).join(t.compress ? "," : ",\n");
     for (var c = a.length - 1; c >= 0; c--) ("/*" === a[c].slice(0, 2) || -1 === s.indexOf(a[c])) && s.unshift(a[c]);
     a = s, r.push(o + n + (t.compress ? "{" : " {\n  ") + a.join(t.compress ? "" : "\n  ") + (t.compress ? "}" : "\n}\n"));
    }
    return r.push(l), r.join("") + (t.compress ? "\n" : "");
   },
   joinSelectors: function(e, t, n) {
    for (var o = 0; o < n.length; o++) this.joinSelector(e, t, n[o]);
   },
   joinSelector: function(t, n, o) {
    var i, r, a, s, l, c, u, d, p, f, h, g, m, b, v;
    for (i = 0; i < o.elements.length; i++) c = o.elements[i], "&" === c.value && (s = !0);
    if (s) {
     for (b = [], l = [ [] ], i = 0; i < o.elements.length; i++) if (c = o.elements[i], 
     "&" !== c.value) b.push(c); else {
      for (v = [], b.length > 0 && this.mergeElementsOnToSelectors(b, l), r = 0; r < l.length; r++) if (u = l[r], 
      0 == n.length) u.length > 0 && (u[0].elements = u[0].elements.slice(0), u[0].elements.push(new e.Element(c.combinator, "", 0))), 
      v.push(u); else for (a = 0; a < n.length; a++) d = n[a], p = [], f = [], g = !0, 
      u.length > 0 ? (p = u.slice(0), m = p.pop(), h = new e.Selector(m.elements.slice(0), o.extendList), 
      g = !1) : h = new e.Selector([], o.extendList), d.length > 1 && (f = f.concat(d.slice(1))), 
      d.length > 0 && (g = !1, h.elements.push(new e.Element(c.combinator, d[0].elements[0].value, 0)), 
      h.elements = h.elements.concat(d[0].elements.slice(1))), g || p.push(h), p = p.concat(f), 
      v.push(p);
      l = v, b = [];
     }
     for (b.length > 0 && this.mergeElementsOnToSelectors(b, l), i = 0; i < l.length; i++) l[i].length > 0 && t.push(l[i]);
    } else if (n.length > 0) for (i = 0; i < n.length; i++) t.push(n[i].concat(o)); else t.push([ o ]);
   },
   mergeElementsOnToSelectors: function(t, n) {
    var o, i;
    if (0 == n.length) return n.push([ new e.Selector(t) ]), void 0;
    for (o = 0; o < n.length; o++) i = n[o], i.length > 0 ? i[i.length - 1] = new e.Selector(i[i.length - 1].elements.concat(t), i[i.length - 1].extendList) : i.push(new e.Selector(t));
   }
  };
 }(n("../tree")), function(e) {
  e.Selector = function(e, t) {
   this.elements = e, this.extendList = t || [];
  }, e.Selector.prototype = {
   type: "Selector",
   accept: function(e) {
    this.elements = e.visit(this.elements), this.extendList = e.visit(this.extendList);
   },
   match: function(e) {
    var t, n, o, i, r = this.elements, a = r.length;
    if (t = e.elements.slice(e.elements.length && "&" === e.elements[0].value ? 1 : 0), 
    n = t.length, o = Math.min(a, n), 0 === n || n > a) return !1;
    for (i = 0; o > i; i++) if (r[i].value !== t[i].value) return !1;
    return !0;
   },
   eval: function(t) {
    return new e.Selector(this.elements.map(function(e) {
     return e.eval(t);
    }), this.extendList.map(function(e) {
     return e.eval(t);
    }));
   },
   toCSS: function(e) {
    return this._css ? this._css : (this._css = "" === this.elements[0].combinator.value ? " " : "", 
    this._css += this.elements.map(function(t) {
     return "string" == typeof t ? " " + t.trim() : t.toCSS(e);
    }).join(""), this._css);
   }
  };
 }(n("../tree")), function(e) {
  e.UnicodeDescriptor = function(e) {
   this.value = e;
  }, e.UnicodeDescriptor.prototype = {
   type: "UnicodeDescriptor",
   toCSS: function() {
    return this.value;
   },
   eval: function() {
    return this;
   }
  };
 }(n("../tree")), function(e) {
  e.URL = function(e, t) {
   this.value = e, this.currentFileInfo = t;
  }, e.URL.prototype = {
   type: "Url",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   toCSS: function() {
    return "url(" + this.value.toCSS() + ")";
   },
   eval: function(t) {
    var n, o = this.value.eval(t);
    return n = this.currentFileInfo && this.currentFileInfo.rootpath, n && "string" == typeof o.value && t.isPathRelative(o.value) && (o.quote || (n = n.replace(/[\(\)'"\s]/g, function(e) {
     return "\\" + e;
    })), o.value = n + o.value), new e.URL(o, null);
   }
  };
 }(n("../tree")), function(e) {
  e.Value = function(e) {
   this.value = e;
  }, e.Value.prototype = {
   type: "Value",
   accept: function(e) {
    this.value = e.visit(this.value);
   },
   eval: function(t) {
    return 1 === this.value.length ? this.value[0].eval(t) : new e.Value(this.value.map(function(e) {
     return e.eval(t);
    }));
   },
   toCSS: function(e) {
    return this.value.map(function(t) {
     return t.toCSS(e);
    }).join(e.compress ? "," : ", ");
   }
  };
 }(n("../tree")), function(e) {
  e.Variable = function(e, t, n) {
   this.name = e, this.index = t, this.currentFileInfo = n;
  }, e.Variable.prototype = {
   type: "Variable",
   eval: function(t) {
    var n, o, i = this.name;
    if (0 == i.indexOf("@@") && (i = "@" + new e.Variable(i.slice(1)).eval(t).value), 
    this.evaluating) throw {
     type: "Name",
     message: "Recursive variable definition for " + i,
     filename: this.currentFileInfo.file,
     index: this.index
    };
    if (this.evaluating = !0, n = e.find(t.frames, function(e) {
     return (o = e.variable(i)) ? o.value.eval(t) : void 0;
    })) return this.evaluating = !1, n;
    throw {
     type: "Name",
     message: "variable " + i + " is undefined",
     filename: this.currentFileInfo.filename,
     index: this.index
    };
   }
  };
 }(n("../tree")), function(e) {
  e.debugInfo = function(t, n) {
   var o = "";
   if (t.dumpLineNumbers && !t.compress) switch (t.dumpLineNumbers) {
   case "comments":
    o = e.debugInfo.asComment(n);
    break;

   case "mediaquery":
    o = e.debugInfo.asMediaQuery(n);
    break;

   case "all":
    o = e.debugInfo.asComment(n) + e.debugInfo.asMediaQuery(n);
   }
   return o;
  }, e.debugInfo.asComment = function(e) {
   return "/* line " + e.debugInfo.lineNumber + ", " + e.debugInfo.fileName + " */\n";
  }, e.debugInfo.asMediaQuery = function(e) {
   return "@media -sass-debug-info{filename{font-family:" + ("file://" + e.debugInfo.fileName).replace(/([.:/\\])/g, function(e) {
    return "\\" == e && (e = "/"), "\\" + e;
   }) + "}line{font-family:\\00003" + e.debugInfo.lineNumber + "}}\n";
  }, e.find = function(e, t) {
   for (var n, o = 0; o < e.length; o++) if (n = t.call(e, e[o])) return n;
   return null;
  }, e.jsify = function(e) {
   return Array.isArray(e.value) && e.value.length > 1 ? "[" + e.value.map(function(e) {
    return e.toCSS(!1);
   }).join(", ") + "]" : e.toCSS(!1);
  };
 }(n("./tree")), function(e) {
  var t = [ "paths", "optimization", "files", "contents", "relativeUrls", "strictImports", "dumpLineNumbers", "compress", "processImports", "syncImport", "mime", "currentFileInfo" ];
  e.parseEnv = function(e) {
   if (o(e, this, t), this.contents || (this.contents = {}), this.files || (this.files = {}), 
   !this.currentFileInfo) {
    var n = e && e.filename || "input", i = n.replace(/[^\/\\]*$/, "");
    e && (e.filename = null), this.currentFileInfo = {
     filename: n,
     relativeUrls: this.relativeUrls,
     rootpath: e && e.rootpath || "",
     currentDirectory: i,
     entryPath: i,
     rootFilename: n
    };
   }
  }, e.parseEnv.prototype.toSheet = function(t) {
   var n = new e.parseEnv(this);
   return n.href = t, n.type = this.mime, n;
  };
  var n = [ "silent", "verbose", "compress", "yuicompress", "ieCompat", "strictMath", "strictUnits" ];
  e.evalEnv = function(e, t) {
   o(e, this, n), this.frames = t || [];
  }, e.evalEnv.prototype.inParenthesis = function() {
   this.parensStack || (this.parensStack = []), this.parensStack.push(!0);
  }, e.evalEnv.prototype.outOfParenthesis = function() {
   this.parensStack.pop();
  }, e.evalEnv.prototype.isMathOn = function() {
   return this.strictMath ? this.parensStack && this.parensStack.length : !0;
  }, e.evalEnv.prototype.isPathRelative = function(e) {
   return !/^(?:[a-z-]+:|\/)/.test(e);
  };
  var o = function(e, t, n) {
   if (e) for (var o = 0; o < n.length; o++) e.hasOwnProperty(n[o]) && (t[n[o]] = e[n[o]]);
  };
 }(n("./tree")), function(e) {
  e.visitor = function(e) {
   this._implementation = e;
  }, e.visitor.prototype = {
   visit: function(e) {
    if (e instanceof Array) return this.visitArray(e);
    if (!e || !e.type) return e;
    var t, n, o = "visit" + e.type, i = this._implementation[o];
    return i && (t = {
     visitDeeper: !0
    }, n = i.call(this._implementation, e, t), this._implementation.isReplacing && (e = n)), 
    (!t || t.visitDeeper) && e && e.accept && e.accept(this), o += "Out", this._implementation[o] && this._implementation[o](e), 
    e;
   },
   visitArray: function(e) {
    var t, n = [];
    for (t = 0; t < e.length; t++) {
     var o = this.visit(e[t]);
     o instanceof Array ? n = n.concat(o) : n.push(o);
    }
    return this._implementation.isReplacing ? n : e;
   }
  };
 }(n("./tree")), function(e) {
  e.importVisitor = function(t, n, o) {
   this._visitor = new e.visitor(this), this._importer = t, this._finish = n, this.env = o || new e.evalEnv(), 
   this.importCount = 0;
  }, e.importVisitor.prototype = {
   isReplacing: !0,
   run: function(e) {
    var t;
    try {
     this._visitor.visit(e);
    } catch (n) {
     t = n;
    }
    this.isFinished = !0, 0 === this.importCount && this._finish(t);
   },
   visitImport: function(t, n) {
    var o, i = this;
    if (!t.css) {
     try {
      o = t.evalForImport(this.env);
     } catch (r) {
      r.filename || (r.index = t.index, r.filename = t.currentFileInfo.filename), t.css = !0, 
      t.error = r;
     }
     if (o && !o.css) {
      t = o, this.importCount++;
      var a = new e.evalEnv(this.env, this.env.frames.slice(0));
      this._importer.push(t.getPath(), t.currentFileInfo, function(n, o, r) {
       n && !n.filename && (n.index = t.index, n.filename = t.currentFileInfo.filename), 
       r && !t.options.multiple && (t.skip = r);
       var s = function(e) {
        i.importCount--, 0 === i.importCount && i.isFinished && i._finish(e);
       };
       o ? (t.root = o, new e.importVisitor(i._importer, s, a).run(o)) : s();
      });
     }
    }
    return n.visitDeeper = !1, t;
   },
   visitRule: function(e, t) {
    return t.visitDeeper = !1, e;
   },
   visitDirective: function(e) {
    return this.env.frames.unshift(e), e;
   },
   visitDirectiveOut: function() {
    this.env.frames.shift();
   },
   visitMixinDefinition: function(e) {
    return this.env.frames.unshift(e), e;
   },
   visitMixinDefinitionOut: function() {
    this.env.frames.shift();
   },
   visitRuleset: function(e) {
    return this.env.frames.unshift(e), e;
   },
   visitRulesetOut: function() {
    this.env.frames.shift();
   },
   visitMedia: function(e) {
    return this.env.frames.unshift(e.ruleset), e;
   },
   visitMediaOut: function() {
    this.env.frames.shift();
   }
  };
 }(n("./tree")), function(e) {
  e.joinSelectorVisitor = function() {
   this.contexts = [ [] ], this._visitor = new e.visitor(this);
  }, e.joinSelectorVisitor.prototype = {
   run: function(e) {
    return this._visitor.visit(e);
   },
   visitRule: function(e, t) {
    t.visitDeeper = !1;
   },
   visitMixinDefinition: function(e, t) {
    t.visitDeeper = !1;
   },
   visitRuleset: function(e) {
    var t = this.contexts[this.contexts.length - 1], n = [];
    this.contexts.push(n), e.root || (e.joinSelectors(n, t, e.selectors), e.paths = n);
   },
   visitRulesetOut: function() {
    this.contexts.length = this.contexts.length - 1;
   },
   visitMedia: function(e) {
    var t = this.contexts[this.contexts.length - 1];
    e.ruleset.root = 0 === t.length || t[0].multiMedia;
   }
  };
 }(n("./tree")), function(e) {
  e.extendFinderVisitor = function() {
   this._visitor = new e.visitor(this), this.contexts = [], this.allExtendsStack = [ [] ];
  }, e.extendFinderVisitor.prototype = {
   run: function(e) {
    return e = this._visitor.visit(e), e.allExtends = this.allExtendsStack[0], e;
   },
   visitRule: function(e, t) {
    t.visitDeeper = !1;
   },
   visitMixinDefinition: function(e, t) {
    t.visitDeeper = !1;
   },
   visitRuleset: function(t) {
    if (!t.root) {
     var n, o, i, r, a = [];
     for (n = 0; n < t.rules.length; n++) t.rules[n] instanceof e.Extend && a.push(t.rules[n]);
     for (n = 0; n < t.paths.length; n++) {
      var s = t.paths[n], l = s[s.length - 1];
      for (r = l.extendList.slice(0).concat(a).map(function(e) {
       return e.clone();
      }), o = 0; o < r.length; o++) this.foundExtends = !0, i = r[o], i.findSelfSelectors(s), 
      i.ruleset = t, 0 === o && (i.firstExtendOnThisSelectorPath = !0), this.allExtendsStack[this.allExtendsStack.length - 1].push(i);
     }
     this.contexts.push(t.selectors);
    }
   },
   visitRulesetOut: function(e) {
    e.root || (this.contexts.length = this.contexts.length - 1);
   },
   visitMedia: function(e) {
    e.allExtends = [], this.allExtendsStack.push(e.allExtends);
   },
   visitMediaOut: function() {
    this.allExtendsStack.length = this.allExtendsStack.length - 1;
   },
   visitDirective: function(e) {
    e.allExtends = [], this.allExtendsStack.push(e.allExtends);
   },
   visitDirectiveOut: function() {
    this.allExtendsStack.length = this.allExtendsStack.length - 1;
   }
  }, e.processExtendsVisitor = function() {
   this._visitor = new e.visitor(this);
  }, e.processExtendsVisitor.prototype = {
   run: function(t) {
    var n = new e.extendFinderVisitor();
    return n.run(t), n.foundExtends ? (t.allExtends = t.allExtends.concat(this.doExtendChaining(t.allExtends, t.allExtends)), 
    this.allExtendsStack = [ t.allExtends ], this._visitor.visit(t)) : t;
   },
   doExtendChaining: function(t, n, o) {
    var i, r, a, s, l, c, u, d, p = [], f = this;
    for (o = o || 0, i = 0; i < t.length; i++) for (r = 0; r < n.length; r++) c = t[i], 
    u = n[r], this.inInheritanceChain(u, c) || (l = [ u.selfSelectors[0] ], a = f.findMatch(c, l), 
    a.length && c.selfSelectors.forEach(function(t) {
     s = f.extendSelector(a, l, t), d = new e.Extend(u.selector, u.option, 0), d.selfSelectors = s, 
     s[s.length - 1].extendList = [ d ], p.push(d), d.ruleset = u.ruleset, d.parents = [ u, c ], 
     u.firstExtendOnThisSelectorPath && (d.firstExtendOnThisSelectorPath = !0, u.ruleset.paths.push(s));
    }));
    if (p.length) {
     if (this.extendChainCount++, o > 100) {
      var h = "{unable to calculate}", g = "{unable to calculate}";
      try {
       h = p[0].selfSelectors[0].toCSS(), g = p[0].selector.toCSS();
      } catch (m) {}
      throw {
       message: "extend circular reference detected. One of the circular extends is currently:" + h + ":extend(" + g + ")"
      };
     }
     return p.concat(f.doExtendChaining(p, n, o + 1));
    }
    return p;
   },
   inInheritanceChain: function(e, t) {
    if (e === t) return !0;
    if (t.parents) {
     if (this.inInheritanceChain(e, t.parents[0])) return !0;
     if (this.inInheritanceChain(e, t.parents[1])) return !0;
    }
    return !1;
   },
   visitRule: function(e, t) {
    t.visitDeeper = !1;
   },
   visitMixinDefinition: function(e, t) {
    t.visitDeeper = !1;
   },
   visitSelector: function(e, t) {
    t.visitDeeper = !1;
   },
   visitRuleset: function(e) {
    if (!e.root) {
     var t, n, o, i, r = this.allExtendsStack[this.allExtendsStack.length - 1], a = [], s = this;
     for (o = 0; o < r.length; o++) for (n = 0; n < e.paths.length; n++) i = e.paths[n], 
     i[i.length - 1].extendList.length || (t = this.findMatch(r[o], i), t.length && r[o].selfSelectors.forEach(function(e) {
      a.push(s.extendSelector(t, i, e));
     }));
     e.paths = e.paths.concat(a);
    }
   },
   findMatch: function(e, t) {
    var n, o, i, r, a, s, l, c = this, u = e.selector.elements, d = [], p = [];
    for (n = 0; n < t.length; n++) for (o = t[n], i = 0; i < o.elements.length; i++) for (r = o.elements[i], 
    (e.allowBefore || 0 == n && 0 == i) && d.push({
     pathIndex: n,
     index: i,
     matched: 0,
     initialCombinator: r.combinator
    }), s = 0; s < d.length; s++) l = d[s], a = r.combinator.value, "" == a && 0 === i && (a = " "), 
    !c.isElementValuesEqual(u[l.matched].value, r.value) || l.matched > 0 && u[l.matched].combinator.value !== a ? l = null : l.matched++, 
    l && (l.finished = l.matched === u.length, l.finished && !e.allowAfter && (i + 1 < o.elements.length || n + 1 < t.length) && (l = null)), 
    l ? l.finished && (l.length = u.length, l.endPathIndex = n, l.endPathElementIndex = i + 1, 
    d.length = 0, p.push(l)) : (d.splice(s, 1), s--);
    return p;
   },
   isElementValuesEqual: function(t, n) {
    return "string" == typeof t || "string" == typeof n ? t === n : t instanceof e.Attribute ? t.op !== n.op || t.key !== n.key ? !1 : t.value && n.value ? (t = t.value.value || t.value, 
    n = n.value.value || n.value, t === n) : t.value || n.value ? !1 : !0 : !1;
   },
   extendSelector: function(t, n, o) {
    var i, r, a, s, l = 0, c = 0, u = [];
    for (i = 0; i < t.length; i++) s = t[i], r = n[s.pathIndex], a = new e.Element(s.initialCombinator, o.elements[0].value, o.elements[0].index), 
    s.pathIndex > l && c > 0 && (u[u.length - 1].elements = u[u.length - 1].elements.concat(n[l].elements.slice(c)), 
    c = 0, l++), u = u.concat(n.slice(l, s.pathIndex)), u.push(new e.Selector(r.elements.slice(c, s.index).concat([ a ]).concat(o.elements.slice(1)))), 
    l = s.endPathIndex, c = s.endPathElementIndex, c >= r.elements.length && (c = 0, 
    l++);
    return l < n.length && c > 0 && (u[u.length - 1].elements = u[u.length - 1].elements.concat(n[l].elements.slice(c)), 
    c = 0, l++), u = u.concat(n.slice(l, n.length));
   },
   visitRulesetOut: function() {},
   visitMedia: function(e) {
    var t = e.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
    t = t.concat(this.doExtendChaining(t, e.allExtends)), this.allExtendsStack.push(t);
   },
   visitMediaOut: function() {
    this.allExtendsStack.length = this.allExtendsStack.length - 1;
   },
   visitDirective: function(e) {
    var t = e.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
    t = t.concat(this.doExtendChaining(t, e.allExtends)), this.allExtendsStack.push(t);
   },
   visitDirectiveOut: function() {
    this.allExtendsStack.length = this.allExtendsStack.length - 1;
   }
  };
 }(n("./tree")), "undefined" != typeof e) {
  var v = /^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);
  if (m.env = m.env || ("127.0.0.1" == location.hostname || "0.0.0.0" == location.hostname || "localhost" == location.hostname || location.port.length > 0 || v ? "development" : "production"), 
  m.async = m.async || !1, m.fileAsync = m.fileAsync || !1, m.poll = m.poll || (v ? 1e3 : 1500), 
  m.functions) for (var y in m.functions) m.tree.functions[y] = m.functions[y];
  var x = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);
  x && (m.dumpLineNumbers = x[1]), m.watch = function() {
   return m.watchMode || (m.env = "development", o()), this.watchMode = !0;
  }, m.unwatch = function() {
   return clearInterval(m.watchTimer), this.watchMode = !1;
  }, /!watch/.test(location.hash) && m.watch();
  var w = null;
  if ("development" != m.env) try {
   w = "undefined" == typeof e.localStorage ? null : e.localStorage;
  } catch (k) {}
  var S = document.getElementsByTagName("link"), C = /^text\/(x-)?less$/;
  m.sheets = [];
  for (var E = 0; E < S.length; E++) ("stylesheet/less" === S[E].rel || S[E].rel.match(/stylesheet/) && S[E].type.match(C)) && m.sheets.push(S[E]);
  var T = "";
  m.modifyVars = function(e) {
   var t = T;
   for (var n in e) t += ("@" === n.slice(0, 1) ? "" : "@") + n + ": " + (";" === e[n].slice(-1) ? e[n] : e[n] + ";");
   new m.Parser(new m.tree.parseEnv(m)).parse(t, function(e, t) {
    e ? g(e, "session_cache") : u(t.toCSS(m), m.sheets[m.sheets.length - 1]);
   });
  }, m.refresh = function(e) {
   var t, n;
   t = n = new Date(), r(function(e, o, i, r, a) {
    return e ? g(e, r.href) : (a.local ? h("loading " + r.href + " from cache.") : (h("parsed " + r.href + " successfully."), 
    u(o.toCSS(m), r, a.lastModified)), h("css for " + r.href + " generated in " + (new Date() - n) + "ms"), 
    0 === a.remaining && h("css generated in " + (new Date() - t) + "ms"), n = new Date(), 
    void 0);
   }, e), i();
  }, m.refreshStyles = i, m.refresh("development" === m.env);
 }
 "function" == typeof define && define.amd && define("less/lessc", [], function() {
  return m;
 });
}("undefined" != typeof window ? window : void 0), define("less/lessc-server", [ "./lessc" ], function(e) {
 if (-1 == [ "node", "rhino" ].indexOf(e.mode)) throw new Error("Environment not supported by require-less builder: " + e.mode);
 var t = function() {
  if ("node" === e.mode) {
   var n = require.nodeRequire("fs");
   return require.nodeRequire("path"), function(e) {
    return n.readFileSync(e, "utf-8");
   };
  }
  return "rhino" === e.mode ? function(e) {
   return t(e, "UTF-8");
  } : void 0;
 }(), n = function() {
  if ("node" === e.mode) {
   var t = require.nodeRequire("fs"), n = require.nodeRequire("path");
   return function(e, o) {
    try {
     return e = n.join(e, o), t.statSync(e), e;
    } catch (i) {
     return null;
    }
   };
  }
  return "rhino" === e.mode ? function(e, t) {
   var n = new java.io.File(e, t);
   return n.isFile() ? n.getPath() : null;
  } : void 0;
 }();
 return e.Parser.importer = function(o, i, r, a) {
  function s(t, n) {
   return t ? r(t) : (a.contents = a.contents || {}, a.contents[l] = n, new e.Parser({
    paths: [ path.dirname(l) ].concat(i),
    filename: l,
    contents: a.contents,
    files: a.files,
    syncImport: a.syncImport,
    dumpLineNumbers: a.dumpLineNumbers
   }).parse(n, function(e, t) {
    r(e, t, l);
   }), void 0);
  }
  var l, c, i = [].concat(i);
  i.push(".");
  for (var u = 0; u < i.length && (l = n(i[u], o), null == l); u++) ;
  if (i = i.slice(0, i.length - 1), !l) return "function" == typeof a.errback ? a.errback(o, i, r) : r({
   type: "File",
   message: "'" + o + "' wasn't found.\n"
  }), void 0;
  try {
   t(l), s(null, c);
  } catch (d) {
   s(d);
  }
 }, e;
}), define("less/less", [ "css", "require" ], function(e, t) {
 var n = {};
 return n.pluginBuilder = "./less-builder", "undefined" == typeof window ? (n.load = function(e, t, n) {
  n();
 }, n) : (n.normalize = function(e, t) {
  return ".less" == e.substr(e.length - 5, 5) && (e = e.substr(0, e.length - 5)), 
  e = t(e);
 }, n.parse = function(e, n) {
  window.less = window.less || {
   env: "development"
  }, t([ "./lessc" ], function(t) {
   var o, i = new t.Parser();
   i.parse(e, function(e, t) {
    if (e) throw e;
    try {
     o = t.toCSS();
    } catch (i) {
     throw new Error("LESS parse error: " + i.type + ", " + i.message);
    }
    n(o);
   });
  });
 }, n.load = function(t, o, i, r) {
  e.load(t, o, i, r, n.parse);
 }, n);
}), define("less", [ "less/less" ], function(e) {
 return e;
}), requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.addBuffer("styles/default.less");
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
  "libs/bootstrap": [ "jquery" ],
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

location.search.match(/(\?|&)console/) && (logger = console), require([ "jquery", "core", "synchronizer", "publisher", "mediaImporter", "css!styles/fontello.css", "css!styles/jgrowl.css", "css!styles/prettify.css", "css!styles/highlight.css", "less!styles/default.less" ], function(e, t) {
 e(function() {
  window.applicationCache && window.applicationCache.addEventListener("updateready", function() {
   window.applicationCache.status === window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), 
   window.location.reload());
  }, !1), t.onReady();
 });
}), define("main", function() {}), requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.setBuffer("@font-face {\n  font-family: 'fontello';\n  src: url('../font/fontello.eot?51731067');\n  src: url('../font/fontello.eot?51731067#iefix') format('embedded-opentype'),\n       url('../font/fontello.woff?51731067') format('woff'),\n       url('../font/fontello.ttf?51731067') format('truetype'),\n       url('../font/fontello.svg?51731067#fontello') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */\n/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */\n/*\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n  @font-face {\n    font-family: 'fontello';\n    src: url('../font/fontello.svg?51731067#fontello') format('svg');\n  }\n}\n*/\n \n [class^=\"icon-\"]:before, [class*=\" icon-\"]:before {\n  font-family: \"fontello\";\n  font-style: normal;\n  font-weight: normal;\n  speak: none;\n \n  display: inline-block;\n  text-decoration: inherit;\n  width: 1em;\n  margin-right: .2em;\n  text-align: center;\n  /* opacity: .8; */\n \n  /* For safety - reset parent styles, that can break glyph codes*/\n  font-variant: normal;\n  text-transform: none;\n     \n  /* fix buttons height, for twitter bootstrap */\n  line-height: 1em;\n \n  /* Animation center compensation - margins should be symmetric */\n  /* remove if not needed */\n  margin-left: .2em;\n \n  /* you can be more comfortable with increased icons size */\n  /* font-size: 120%; */\n \n  /* Uncomment for 3D effect */\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\n}\n \n.icon-plus:before { content: '\\e81f'; } /* '' */\n.icon-minus:before { content: '\\e823'; } /* '' */\n.icon-left-big:before { content: '\\e88a'; } /* '' */\n.icon-up-big:before { content: '\\e88c'; } /* '' */\n.icon-right-big:before { content: '\\e88b'; } /* '' */\n.icon-down-big:before { content: '\\e889'; } /* '' */\n.icon-home:before { content: '\\e93c'; } /* '' */\n.icon-pause:before { content: '\\e800'; } /* '' */\n.icon-fast-fw:before { content: '\\e8a4'; } /* '' */\n.icon-fast-bw:before { content: '\\e8a5'; } /* '' */\n.icon-to-end:before { content: '\\e8a0'; } /* '' */\n.icon-to-start:before { content: '\\e8a2'; } /* '' */\n.icon-stop:before { content: '\\e89e'; } /* '' */\n.icon-up-dir:before { content: '\\e94e'; } /* '' */\n.icon-play:before { content: '\\e89b'; } /* '' */\n.icon-right-dir:before { content: '\\e950'; } /* '' */\n.icon-down-dir:before { content: '\\e94d'; } /* '' */\n.icon-left-dir:before { content: '\\e94f'; } /* '' */\n.icon-cloud:before { content: '\\e8ad'; } /* '' */\n.icon-umbrella:before { content: '\\e8b0'; } /* '' */\n.icon-star:before { content: '\\e808'; } /* '' */\n.icon-star-empty:before { content: '\\e809'; } /* '' */\n.icon-check:before { content: '\\e8cf'; } /* '' */\n.icon-left-hand:before { content: '\\e88e'; } /* '' */\n.icon-up-hand:before { content: '\\e88f'; } /* '' */\n.icon-right-hand:before { content: '\\e88d'; } /* '' */\n.icon-down-hand:before { content: '\\e890'; } /* '' */\n.icon-th-list:before { content: '\\e817'; } /* '' */\n.icon-heart-empty:before { content: '\\e807'; } /* '' */\n.icon-heart:before { content: '\\e806'; } /* '' */\n.icon-music:before { content: '\\e802'; } /* '' */\n.icon-th:before { content: '\\e816'; } /* '' */\n.icon-flag:before { content: '\\e838'; } /* '' */\n.icon-cog:before { content: '\\e862'; } /* '' */\n.icon-attention:before { content: '\\e851'; } /* '' */\n.icon-flash:before { content: '\\e8ae'; } /* '' */\n.icon-cog-alt:before { content: '\\e863'; } /* '' */\n.icon-scissors:before { content: '\\e8c5'; } /* '' */\n.icon-flight:before { content: '\\e8b1'; } /* '' */\n.icon-mail:before { content: '\\e804'; } /* '' */\n.icon-edit:before { content: '\\e941'; } /* '' */\n.icon-pencil:before { content: '\\e847'; } /* '' */\n.icon-ok:before { content: '\\e818'; } /* '' */\n.icon-ok-circled:before { content: '\\e819'; } /* '' */\n.icon-cancel:before { content: '\\e81c'; } /* '' */\n.icon-cancel-circled:before { content: '\\e81d'; } /* '' */\n.icon-asterisk:before { content: '\\e8d3'; } /* '' */\n.icon-attention-circled:before { content: '\\e852'; } /* '' */\n.icon-plus-circled:before { content: '\\e820'; } /* '' */\n.icon-minus-circled:before { content: '\\e824'; } /* '' */\n.icon-forward:before { content: '\\e856'; } /* '' */\n.icon-ccw:before { content: '\\e896'; } /* '' */\n.icon-cw:before { content: '\\e895'; } /* '' */\n.icon-resize-vertical:before { content: '\\e872'; } /* '' */\n.icon-resize-horizontal:before { content: '\\e873'; } /* '' */\n.icon-eject:before { content: '\\e8a6'; } /* '' */\n.icon-star-half:before { content: '\\e80a'; } /* '' */\n.icon-ok-circled2:before { content: '\\e81a'; } /* '' */\n.icon-cancel-circled2:before { content: '\\e86f'; } /* '' */\n.icon-help-circled:before { content: '\\e939'; } /* '' */\n.icon-info-circled:before { content: '\\e93a'; } /* '' */\n.icon-th-large:before { content: '\\e815'; } /* '' */\n.icon-eye:before { content: '\\e832'; } /* '' */\n.icon-eye-off:before { content: '\\e833'; } /* '' */\n.icon-tag:before { content: '\\e834'; } /* '' */\n.icon-tags:before { content: '\\e835'; } /* '' */\n.icon-camera-alt:before { content: '\\e814'; } /* '' */\n.icon-print:before { content: '\\e942'; } /* '' */\n.icon-retweet:before { content: '\\e943'; } /* '' */\n.icon-comment:before { content: '\\e84a'; } /* '' */\n.icon-chat:before { content: '\\e84b'; } /* '' */\n.icon-location:before { content: '\\e853'; } /* '' */\n.icon-trash:before { content: '\\e81e'; } /* '' */\n.icon-basket:before { content: '\\e865'; } /* '' */\n.icon-login:before { content: '\\e868'; } /* '' */\n.icon-logout:before { content: '\\e949'; } /* '' */\n.icon-resize-full:before { content: '\\e90d'; } /* '' */\n.icon-resize-small:before { content: '\\e871'; } /* '' */\n.icon-zoom-in:before { content: '\\e875'; } /* '' */\n.icon-zoom-out:before { content: '\\e876'; } /* '' */\n.icon-down-circled2:before { content: '\\e877'; } /* '' */\n.icon-up-circled2:before { content: '\\e878'; } /* '' */\n.icon-down-open:before { content: '\\e879'; } /* '' */\n.icon-left-open:before { content: '\\e87a'; } /* '' */\n.icon-right-open:before { content: '\\e87b'; } /* '' */\n.icon-up-open:before { content: '\\e87c'; } /* '' */\n.icon-refresh:before { content: '\\e897'; } /* '' */\n.icon-play-circled2:before { content: '\\e89d'; } /* '' */\n.icon-to-end-alt:before { content: '\\e8a1'; } /* '' */\n.icon-to-start-alt:before { content: '\\e8a3'; } /* '' */\n.icon-inbox:before { content: '\\e8aa'; } /* '' */\n.icon-font:before { content: '\\e8b6'; } /* '' */\n.icon-bold:before { content: '\\e8b5'; } /* '' */\n.icon-italic:before { content: '\\e8b4'; } /* '' */\n.icon-text-height:before { content: '\\e8b7'; } /* '' */\n.icon-text-width:before { content: '\\e8b8'; } /* '' */\n.icon-align-left:before { content: '\\e95d'; } /* '' */\n.icon-align-center:before { content: '\\e95e'; } /* '' */\n.icon-align-right:before { content: '\\e95f'; } /* '' */\n.icon-align-justify:before { content: '\\e960'; } /* '' */\n.icon-list:before { content: '\\e8b9'; } /* '' */\n.icon-indent-left:before { content: '\\e8ba'; } /* '' */\n.icon-indent-right:before { content: '\\e8bb'; } /* '' */\n.icon-off:before { content: '\\e963'; } /* '' */\n.icon-road:before { content: '\\e964'; } /* '' */\n.icon-list-alt:before { content: '\\e8c9'; } /* '' */\n.icon-qrcode:before { content: '\\e8ca'; } /* '' */\n.icon-barcode:before { content: '\\e8cb'; } /* '' */\n.icon-ajust:before { content: '\\e8cd'; } /* '' */\n.icon-tint:before { content: '\\e8ce'; } /* '' */\n.icon-magnet:before { content: '\\e8d6'; } /* '' */\n.icon-move:before { content: '\\e874'; } /* '' */\n.icon-link:before { content: '\\e83f'; } /* '' */\n.icon-share:before { content: '\\e912'; } /* '' */\n.icon-hdd:before { content: '\\e841'; } /* '' */\n.icon-link-ext:before { content: '\\e82b'; } /* '' */\n.icon-check-empty:before { content: '\\e8d0'; } /* '' */\n.icon-bookmark-empty:before { content: '\\e837'; } /* '' */\n.icon-phone-squared:before { content: '\\e860'; } /* '' */\n.icon-rss:before { content: '\\e85d'; } /* '' */\n.icon-certificate:before { content: '\\e8dd'; } /* '' */\n.icon-left-circled:before { content: '\\e891'; } /* '' */\n.icon-right-circled:before { content: '\\e892'; } /* '' */\n.icon-up-circled:before { content: '\\e893'; } /* '' */\n.icon-down-circled:before { content: '\\e894'; } /* '' */\n.icon-tasks:before { content: '\\e8de'; } /* '' */\n.icon-filter:before { content: '\\e8df'; } /* '' */\n.icon-resize-full-alt:before { content: '\\e870'; } /* '' */\n.icon-beaker:before { content: '\\e8e0'; } /* '' */\n.icon-docs:before { content: '\\e858'; } /* '' */\n.icon-menu:before { content: '\\e861'; } /* '' */\n.icon-list-bullet:before { content: '\\e8bc'; } /* '' */\n.icon-list-numbered:before { content: '\\e8bd'; } /* '' */\n.icon-strike:before { content: '\\e8be'; } /* '' */\n.icon-underline:before { content: '\\e8bf'; } /* '' */\n.icon-table:before { content: '\\e8c2'; } /* '' */\n.icon-magic:before { content: '\\e8e1'; } /* '' */\n.icon-money:before { content: '\\e8e3'; } /* '' */\n.icon-columns:before { content: '\\e8c3'; } /* '' */\n.icon-sort:before { content: '\\e8ec'; } /* '' */\n.icon-sort-down:before { content: '\\e8ed'; } /* '' */\n.icon-sort-up:before { content: '\\e8ee'; } /* '' */\n.icon-mail-alt:before { content: '\\e805'; } /* '' */\n.icon-gauge:before { content: '\\e8f6'; } /* '' */\n.icon-comment-empty:before { content: '\\e84c'; } /* '' */\n.icon-chat-empty:before { content: '\\e84d'; } /* '' */\n.icon-sitemap:before { content: '\\e8f7'; } /* '' */\n.icon-paste:before { content: '\\e8c6'; } /* '' */\n.icon-lightbulb:before { content: '\\e86d'; } /* '' */\n.icon-exchange:before { content: '\\e957'; } /* '' */\n.icon-download-cloud:before { content: '\\e83d'; } /* '' */\n.icon-upload-cloud:before { content: '\\e83e'; } /* '' */\n.icon-user-md:before { content: '\\e8fc'; } /* '' */\n.icon-stethoscope:before { content: '\\e8fd'; } /* '' */\n.icon-suitcase:before { content: '\\e8c8'; } /* '' */\n.icon-bell-alt:before { content: '\\e84f'; } /* '' */\n.icon-coffee:before { content: '\\e8f9'; } /* '' */\n.icon-food:before { content: '\\e8fa'; } /* '' */\n.icon-doc-text:before { content: '\\e945'; } /* '' */\n.icon-building:before { content: '\\e902'; } /* '' */\n.icon-hospital:before { content: '\\e901'; } /* '' */\n.icon-ambulance:before { content: '\\e8fe'; } /* '' */\n.icon-medkit:before { content: '\\e8ff'; } /* '' */\n.icon-fighter-jet:before { content: '\\e8b2'; } /* '' */\n.icon-beer:before { content: '\\e8fb'; } /* '' */\n.icon-h-sigh:before { content: '\\e900'; } /* '' */\n.icon-plus-squared:before { content: '\\e821'; } /* '' */\n.icon-angle-double-left:before { content: '\\e885'; } /* '' */\n.icon-angle-double-right:before { content: '\\e886'; } /* '' */\n.icon-angle-double-up:before { content: '\\e887'; } /* '' */\n.icon-angle-double-down:before { content: '\\e888'; } /* '' */\n.icon-angle-left:before { content: '\\e87d'; } /* '' */\n.icon-angle-right:before { content: '\\e87e'; } /* '' */\n.icon-angle-up:before { content: '\\e87f'; } /* '' */\n.icon-angle-down:before { content: '\\e880'; } /* '' */\n.icon-desktop:before { content: '\\e95a'; } /* '' */\n.icon-laptop:before { content: '\\e95b'; } /* '' */\n.icon-tablet:before { content: '\\e95c'; } /* '' */\n.icon-mobile:before { content: '\\e8a9'; } /* '' */\n.icon-circle-empty:before { content: '\\e8d2'; } /* '' */\n.icon-quote-left:before { content: '\\e842'; } /* '' */\n.icon-quote-right:before { content: '\\e843'; } /* '' */\n.icon-spinner:before { content: '\\e8f8'; } /* '' */\n.icon-circle:before { content: '\\e8d1'; } /* '' */\n.icon-reply:before { content: '\\e845'; } /* '' */\n.icon-folder-empty:before { content: '\\e85a'; } /* '' */\n.icon-folder-open-empty:before { content: '\\e85b'; } /* '' */\n.icon-plus-squared-small:before { content: '\\e822'; } /* '' */\n.icon-minus-squared-small:before { content: '\\e827'; } /* '' */\n.icon-smile:before { content: '\\e903'; } /* '' */\n.icon-frown:before { content: '\\e904'; } /* '' */\n.icon-meh:before { content: '\\e905'; } /* '' */\n.icon-gamepad:before { content: '\\e849'; } /* '' */\n.icon-keyboard:before { content: '\\e944'; } /* '' */\n.icon-flag-empty:before { content: '\\e93d'; } /* '' */\n.icon-flag-checkered:before { content: '\\e93e'; } /* '' */\n.icon-terminal:before { content: '\\e907'; } /* '' */\n.icon-code:before { content: '\\e829'; } /* '' */\n.icon-reply-all:before { content: '\\e840'; } /* '' */\n.icon-star-half-alt:before { content: '\\e80b'; } /* '' */\n.icon-direction:before { content: '\\e854'; } /* '' */\n.icon-crop:before { content: '\\e8c4'; } /* '' */\n.icon-fork:before { content: '\\e8da'; } /* '' */\n.icon-unlink:before { content: '\\e82a'; } /* '' */\n.icon-help:before { content: '\\e828'; } /* '' */\n.icon-info:before { content: '\\e93b'; } /* '' */\n.icon-attention-alt:before { content: '\\e850'; } /* '' */\n.icon-superscript:before { content: '\\e8c0'; } /* '' */\n.icon-subscript:before { content: '\\e8c1'; } /* '' */\n.icon-eraser:before { content: '\\e908'; } /* '' */\n.icon-puzzle:before { content: '\\e909'; } /* '' */\n.icon-mic:before { content: '\\e94a'; } /* '' */\n.icon-mute:before { content: '\\e94b'; } /* '' */\n.icon-shield:before { content: '\\e90a'; } /* '' */\n.icon-calendar-empty:before { content: '\\e867'; } /* '' */\n.icon-extinguisher:before { content: '\\e90b'; } /* '' */\n.icon-rocket:before { content: '\\e8db'; } /* '' */\n.icon-angle-circled-left:before { content: '\\e881'; } /* '' */\n.icon-angle-circled-right:before { content: '\\e882'; } /* '' */\n.icon-angle-circled-up:before { content: '\\e883'; } /* '' */\n.icon-angle-circled-down:before { content: '\\e884'; } /* '' */\n.icon-anchor:before { content: '\\e906'; } /* '' */\n.icon-lock-open-alt:before { content: '\\e830'; } /* '' */\n.icon-bullseye:before { content: '\\e90c'; } /* '' */\n.icon-ellipsis:before { content: '\\e961'; } /* '' */\n.icon-ellipsis-vert:before { content: '\\e962'; } /* '' */\n.icon-rss-squared:before { content: '\\e85e'; } /* '' */\n.icon-play-circled:before { content: '\\e89c'; } /* '' */\n.icon-ticket:before { content: '\\e8d8'; } /* '' */\n.icon-minus-squared:before { content: '\\e825'; } /* '' */\n.icon-minus-squared-alt:before { content: '\\e826'; } /* '' */\n.icon-level-up:before { content: '\\e898'; } /* '' */\n.icon-level-down:before { content: '\\e955'; } /* '' */\n.icon-ok-squared:before { content: '\\e81b'; } /* '' */\n.icon-pencil-squared:before { content: '\\e848'; } /* '' */\n.icon-link-ext-alt:before { content: '\\e82c'; } /* '' */\n.icon-export-alt:before { content: '\\e846'; } /* '' */\n.icon-compass:before { content: '\\e855'; } /* '' */\n.icon-collapse:before { content: '\\e958'; } /* '' */\n.icon-collapse-top:before { content: '\\e899'; } /* '' */\n.icon-expand:before { content: '\\e89a'; } /* '' */\n.icon-euro:before { content: '\\e8e4'; } /* '' */\n.icon-pound:before { content: '\\e8e5'; } /* '' */\n.icon-dollar:before { content: '\\e8e6'; } /* '' */\n.icon-rupee:before { content: '\\e8e7'; } /* '' */\n.icon-yen:before { content: '\\e8e8'; } /* '' */\n.icon-renminbi:before { content: '\\e8e9'; } /* '' */\n.icon-won:before { content: '\\e8ea'; } /* '' */\n.icon-bitcoin:before { content: '\\e8eb'; } /* '' */\n.icon-file:before { content: '\\e946'; } /* '' */\n.icon-doc-text-inv:before { content: '\\e947'; } /* '' */\n.icon-sort-name-up:before { content: '\\e8f1'; } /* '' */\n.icon-sort-name-down:before { content: '\\e8f2'; } /* '' */\n.icon-sort-alt-up:before { content: '\\e8ef'; } /* '' */\n.icon-sort-alt-down:before { content: '\\e8f0'; } /* '' */\n.icon-sort-number-up:before { content: '\\e8f3'; } /* '' */\n.icon-sort-number-down:before { content: '\\e8f4'; } /* '' */\n.icon-thumbs-up-alt:before { content: '\\e839'; } /* '' */\n.icon-thumbs-down-alt:before { content: '\\e83a'; } /* '' */\n.icon-down:before { content: '\\e951'; } /* '' */\n.icon-up:before { content: '\\e954'; } /* '' */\n.icon-right:before { content: '\\e953'; } /* '' */\n.icon-left:before { content: '\\e952'; } /* '' */\n.icon-female:before { content: '\\e80f'; } /* '' */\n.icon-male:before { content: '\\e80e'; } /* '' */\n.icon-sun:before { content: '\\e8ac'; } /* '' */\n.icon-moon:before { content: '\\e8af'; } /* '' */\n.icon-box:before { content: '\\e85c'; } /* '' */\n.icon-bug:before { content: '\\e8dc'; } /* '' */\n.icon-picture:before { content: '\\e812'; } /* '' */\n.icon-globe:before { content: '\\e8ab'; } /* '' */\n.icon-leaf:before { content: '\\e8b3'; } /* '' */\n.icon-glass:before { content: '\\e801'; } /* '' */\n.icon-gift:before { content: '\\e8d4'; } /* '' */\n.icon-videocam:before { content: '\\e811'; } /* '' */\n.icon-headphones:before { content: '\\e86b'; } /* '' */\n.icon-video:before { content: '\\e810'; } /* '' */\n.icon-target:before { content: '\\e8a7'; } /* '' */\n.icon-award:before { content: '\\e959'; } /* '' */\n.icon-thumbs-up:before { content: '\\e93f'; } /* '' */\n.icon-thumbs-down:before { content: '\\e940'; } /* '' */\n.icon-user:before { content: '\\e80c'; } /* '' */\n.icon-users:before { content: '\\e80d'; } /* '' */\n.icon-credit-card:before { content: '\\e965'; } /* '' */\n.icon-briefcase:before { content: '\\e8c7'; } /* '' */\n.icon-floppy:before { content: '\\e966'; } /* '' */\n.icon-folder:before { content: '\\e948'; } /* '' */\n.icon-folder-open:before { content: '\\e859'; } /* '' */\n.icon-doc:before { content: '\\e857'; } /* '' */\n.icon-calendar:before { content: '\\e866'; } /* '' */\n.icon-chart-bar:before { content: '\\e90f'; } /* '' */\n.icon-pin:before { content: '\\e831'; } /* '' */\n.icon-attach:before { content: '\\e82d'; } /* '' */\n.icon-book:before { content: '\\e8cc'; } /* '' */\n.icon-phone:before { content: '\\e85f'; } /* '' */\n.icon-megaphone:before { content: '\\e967'; } /* '' */\n.icon-upload:before { content: '\\e83c'; } /* '' */\n.icon-download:before { content: '\\e83b'; } /* '' */\n.icon-signal:before { content: '\\e8a8'; } /* '' */\n.icon-camera:before { content: '\\e813'; } /* '' */\n.icon-shuffle:before { content: '\\e956'; } /* '' */\n.icon-volume-off:before { content: '\\e94c'; } /* '' */\n.icon-volume-down:before { content: '\\e869'; } /* '' */\n.icon-volume-up:before { content: '\\e86a'; } /* '' */\n.icon-search:before { content: '\\e803'; } /* '' */\n.icon-key:before { content: '\\e8d9'; } /* '' */\n.icon-lock:before { content: '\\e82e'; } /* '' */\n.icon-lock-open:before { content: '\\e82f'; } /* '' */\n.icon-bell:before { content: '\\e84e'; } /* '' */\n.icon-bookmark:before { content: '\\e836'; } /* '' */\n.icon-fire:before { content: '\\e8d5'; } /* '' */\n.icon-wrench:before { content: '\\e864'; } /* '' */\n.icon-hammer:before { content: '\\e8f5'; } /* '' */\n.icon-clock:before { content: '\\e86c'; } /* '' */\n.icon-truck:before { content: '\\e8e2'; } /* '' */\n.icon-block:before { content: '\\e86e'; } /* '' */\ndiv.jGrowl {\n	z-index: 			1050;\n	color: 				#fff;\n}\n\n/** Special IE6 Style Positioning **/\ndiv.ie6 {\n	position: 			absolute;\n}\n\ndiv.ie6.top-right {\n	right: 				auto;\n	bottom: 			auto;\n	left: 				expression( ( 0 - jGrowl.offsetWidth + ( document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth ) + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + 'px' );\n	top: 				expression( ( 0 + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + 'px' );\n}\n\ndiv.ie6.top-left {\n	left: 				expression( ( 0 + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + 'px' );\n	top: 				expression( ( 0 + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + 'px' );\n}\n\ndiv.ie6.bottom-right {\n	left: 				expression( ( 0 - jGrowl.offsetWidth + ( document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth ) + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + 'px' );\n	top: 				expression( ( 0 - jGrowl.offsetHeight + ( document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + 'px' );\n}\n\ndiv.ie6.bottom-left {\n	left: 				expression( ( 0 + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + 'px' );\n	top: 				expression( ( 0 - jGrowl.offsetHeight + ( document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + 'px' );\n}\n\ndiv.ie6.center {\n	left: 				expression( ( 0 + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + 'px' );\n	top: 				expression( ( 0 + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + 'px' );\n	width: 				100%;\n}\n\n/** Normal Style Positions **/\ndiv.jGrowl {\n	position:			absolute;\n}\n\nbody > div.jGrowl {\n	position:			fixed;\n}\n\ndiv.jGrowl.top-left {\n	left: 				0px;\n	top: 				0px;\n}\n\ndiv.jGrowl.top-right {\n	right: 				0px;\n	top: 				0px;\n}\n\ndiv.jGrowl.bottom-left {\n	left: 				0px;\n	bottom:				0px;\n}\n\ndiv.jGrowl.bottom-right {\n	right: 				0px;\n	bottom: 			0px;\n}\n\ndiv.jGrowl.center {\n	top: 				0px;\n	width: 				50%;\n	left: 				25%;\n}\n\n/** Cross Browser Styling **/\ndiv.center div.jGrowl-notification, div.center div.jGrowl-closer {\n	margin-left: 		auto;\n	margin-right: 		auto;\n}\n\ndiv.jGrowl div.jGrowl-notification, div.jGrowl div.jGrowl-closer {\n	background-color: 		#777;\n	zoom: 					1;\n	width: 					235px;\n	padding: 				15px 20px;\n	margin-top: 			5px;\n	margin-bottom: 			5px;\n	text-align: 			left;\n	display: 				none;\n    -webkit-border-radius:  5px;\n    -moz-border-radius:     5px;\n     border-radius:         5px;\n}\n\ndiv.jGrowl div.jGrowl-notification {\n	min-height: 			40px;\n}\n\ndiv.jGrowl div.jGrowl-notification,\ndiv.jGrowl div.jGrowl-closer {\n	margin: 				20px;\n}\n\ndiv.jGrowl div.jGrowl-notification div.jGrowl-header {\n	font-weight: 			bold;\n	font-size:				.85em;\n}\n\ndiv.jGrowl div.jGrowl-notification div.jGrowl-close {\n	z-index:				99;\n	float: 					right;\n	font-weight: 			bold;\n	font-size: 				1em;\n	cursor:					pointer;\n}\n\ndiv.jGrowl div.jGrowl-closer {\n	padding-top: 			4px;\n	padding-bottom: 		4px;\n	cursor: 				pointer;\n	font-size:				.9em;\n	font-weight: 			bold;\n	text-align: 			center;\n}\n\n/** Hide jGrowl when printing **/\n@media print {\n	div.jGrowl {\n		display: 			none;\n	}\n}/* Pretty printing styles. Used with prettify.js. */\n\n/* SPAN elements with the classes below are added by prettyprint. */\n.pln { color: #000 }  /* plain text */\n\n@media screen {\n  .str { color: #080 }  /* string content */\n  .kwd { color: #008 }  /* a keyword */\n  .com { color: #800 }  /* a comment */\n  .typ { color: #606 }  /* a type name */\n  .lit { color: #066 }  /* a literal value */\n  /* punctuation, lisp open bracket, lisp close bracket */\n  .pun, .opn, .clo { color: #660 }\n  .tag { color: #008 }  /* a markup tag name */\n  .atn { color: #606 }  /* a markup attribute name */\n  .atv { color: #080 }  /* a markup attribute value */\n  .dec, .var { color: #606 }  /* a declaration; a variable name */\n  .fun { color: red }  /* a function name */\n}\n\n/* Use higher contrast and text-weight for printable form. */\n@media print, projection {\n  .str { color: #060 }\n  .kwd { color: #006; font-weight: bold }\n  .com { color: #600; font-style: italic }\n  .typ { color: #404; font-weight: bold }\n  .lit { color: #044 }\n  .pun, .opn, .clo { color: #440 }\n  .tag { color: #006; font-weight: bold }\n  .atn { color: #404 }\n  .atv { color: #060 }\n}\n\n/* Put a border around prettyprinted code snippets. */\n/* pre.prettyprint { padding: 2px; border: 1px solid #888 } */\n\n/* Specify class=linenums on a pre to get line numbering */\nol.linenums { margin-top: 0; margin-bottom: 0 } /* IE indents via margin-left */\nli.L0,\nli.L1,\nli.L2,\nli.L3,\nli.L5,\nli.L6,\nli.L7,\nli.L8 { list-style-type: none }\n/* Alternate shading for lines */\nli.L1,\nli.L3,\nli.L5,\nli.L7,\nli.L9 { background: #eee }\n/*\n\nOriginal style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>\n\npre code {\n  display: block; padding: 0.5em;\n  background: #F0F0F0;\n}\n*/\n\n\npre code,\npre .subst,\npre .tag .title,\npre .lisp .title,\npre .clojure .built_in,\npre .nginx .title {\n  color: black;\n}\n\npre .string,\npre .title,\npre .constant,\npre .parent,\npre .tag .value,\npre .rules .value,\npre .rules .value .number,\npre .preprocessor,\npre .haml .symbol,\npre .ruby .symbol,\npre .ruby .symbol .string,\npre .aggregate,\npre .template_tag,\npre .django .variable,\npre .smalltalk .class,\npre .addition,\npre .flow,\npre .stream,\npre .bash .variable,\npre .apache .tag,\npre .apache .cbracket,\npre .tex .command,\npre .tex .special,\npre .erlang_repl .function_or_atom,\npre .asciidoc .header,\npre .markdown .header,\npre .coffeescript .attribute {\n  color: #800;\n}\n\npre .comment,\npre .annotation,\npre .template_comment,\npre .diff .header,\npre .chunk,\npre .asciidoc .blockquote,\npre .markdown .blockquote {\n  color: #888;\n}\n\npre .number,\npre .date,\npre .regexp,\npre .literal,\npre .hexcolor,\npre .smalltalk .symbol,\npre .smalltalk .char,\npre .go .constant,\npre .change,\npre .lasso .variable,\npre .asciidoc .bullet,\npre .markdown .bullet,\npre .asciidoc .link_url,\npre .markdown .link_url {\n  color: #080;\n}\n\npre .label,\npre .javadoc,\npre .ruby .string,\npre .decorator,\npre .filter .argument,\npre .localvars,\npre .array,\npre .attr_selector,\npre .important,\npre .pseudo,\npre .pi,\npre .haml .bullet,\npre .doctype,\npre .deletion,\npre .envvar,\npre .shebang,\npre .apache .sqbracket,\npre .nginx .built_in,\npre .tex .formula,\npre .erlang_repl .reserved,\npre .prompt,\npre .asciidoc .link_label,\npre .markdown .link_label,\npre .vhdl .attribute,\npre .clojure .attribute,\npre .asciidoc .attribute,\npre .lasso .attribute,\npre .coffeescript .property {\n  color: #88F\n}\n\npre .keyword,\npre .id,\npre .title,\npre .built_in,\npre .aggregate,\npre .css .tag,\npre .javadoctag,\npre .phpdoc,\npre .yardoctag,\npre .smalltalk .class,\npre .winutils,\npre .bash .variable,\npre .apache .tag,\npre .go .typename,\npre .tex .command,\npre .asciidoc .strong,\npre .markdown .strong,\npre .request,\npre .status {\n  font-weight: bold;\n}\n\npre .asciidoc .emphasis,\npre .markdown .emphasis {\n  font-style: italic;\n}\n\npre .nginx .built_in {\n  font-weight: normal;\n}\n\npre .coffeescript .javascript,\npre .javascript .xml,\npre .lasso .markup,\npre .tex .formula,\npre .xml .javascript,\npre .xml .vbscript,\npre .xml .css,\npre .xml .cdata {\n  opacity: 0.5;\n}");
}), requirejs.s.contexts._.nextTick = requirejs.nextTick, requirejs.s.contexts._.nextTick = function(e) {
 e();
}, require([ "css" ], function(e) {
 e.setBuffer('/*!\n * Bootstrap v3.0.0\n *\n * Copyright 2013 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world by @mdo and @fat.\n */\n/*! normalize.css v2.1.0 | MIT License | git.io/normalize */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nvideo {\n  display: inline-block;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden] {\n  display: none;\n}\nhtml {\n  font-family: sans-serif;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\na:focus {\n  outline: thin dotted;\n}\na:active,\na:hover {\n  outline: 0;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, serif;\n  font-size: 1em;\n}\npre {\n  white-space: pre-wrap;\n}\nq {\n  quotes: "\\201C" "\\201D" "\\2018" "\\2019";\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 0;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  padding: 0;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0;\n}\nbutton,\ninput {\n  line-height: normal;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type="button"],\ninput[type="reset"],\ninput[type="submit"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\ninput[type="checkbox"],\ninput[type="radio"] {\n  box-sizing: border-box;\n  padding: 0;\n}\ninput[type="search"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ntextarea {\n  overflow: auto;\n  vertical-align: top;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n@media print {\n  * {\n    text-shadow: none !important;\n    color: #000 !important;\n    background: transparent !important;\n    box-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: " (" attr(href) ")";\n  }\n  abbr[title]:after {\n    content: " (" attr(title) ")";\n  }\n  .ir a:after,\n  a[href^="javascript:"]:after,\n  a[href^="#"]:after {\n    content: "";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  @page  {\n    margin: 2cm .5cm;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 62.5%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.428571429;\n  color: #333333;\n  background-color: #ffffff;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #428bca;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #2a6496;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-circle {\n  border-radius: 500px;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16.099999999999998px;\n  font-weight: 200;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall {\n  font-size: 85%;\n}\ncite {\n  font-style: normal;\n}\n.text-muted {\n  color: #999999;\n}\n.text-primary {\n  color: #428bca;\n}\n.text-warning {\n  color: #c09853;\n}\n.text-danger {\n  color: #b94a48;\n}\n.text-success {\n  color: #468847;\n}\n.text-info {\n  color: #3a87ad;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n  font-weight: 500;\n  line-height: 1.1;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small {\n  font-weight: normal;\n  line-height: 1;\n  color: #999999;\n}\nh1,\nh2,\nh3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh4,\nh5,\nh6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh1,\n.h1 {\n  font-size: 38px;\n}\nh2,\n.h2 {\n  font-size: 32px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\nh1 small,\n.h1 small {\n  font-size: 24px;\n}\nh2 small,\n.h2 small {\n  font-size: 18px;\n}\nh3 small,\n.h3 small,\nh4 small,\n.h4 small {\n  font-size: 14px;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\ndl {\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.428571429;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n.dl-horizontal dt {\n  float: left;\n  width: 160px;\n  clear: left;\n  text-align: right;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dl-horizontal dd {\n  margin-left: 180px;\n}\n.dl-horizontal dd:before,\n.dl-horizontal dd:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.dl-horizontal dd:after {\n  clear: both;\n}\n.dl-horizontal dd:before,\n.dl-horizontal dd:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.dl-horizontal dd:after {\n  clear: both;\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #999999;\n}\nabbr.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  border-left: 5px solid #eeeeee;\n}\nblockquote p {\n  font-size: 17.5px;\n  font-weight: 300;\n  line-height: 1.25;\n}\nblockquote p:last-child {\n  margin-bottom: 0;\n}\nblockquote small {\n  display: block;\n  line-height: 1.428571429;\n  color: #999999;\n}\nblockquote small:before {\n  content: \'\\2014 \\00A0\';\n}\nblockquote.pull-right {\n  float: right;\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n}\nblockquote.pull-right p,\nblockquote.pull-right small {\n  text-align: right;\n}\nblockquote.pull-right small:before {\n  content: \'\';\n}\nblockquote.pull-right small:after {\n  content: \'\\00A0 \\2014\';\n}\nq:before,\nq:after,\nblockquote:before,\nblockquote:after {\n  content: "";\n}\naddress {\n  display: block;\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.428571429;\n}\ncode,\npre {\n  font-family: Monaco, Menlo, Consolas, "Courier New", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  white-space: nowrap;\n  border-radius: 4px;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.428571429;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\npre.prettyprint {\n  margin-bottom: 20px;\n}\npre code {\n  padding: 0;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n}\n.container:before,\n.container:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.container:after {\n  clear: both;\n}\n.container:before,\n.container:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.container:after {\n  clear: both;\n}\n.row:before,\n.row:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.row:after {\n  clear: both;\n}\n.row:before,\n.row:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.row:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .row {\n    margin-left: -15px;\n    margin-right: -15px;\n  }\n}\n.row .row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12,\n.col-sm-1,\n.col-sm-2,\n.col-sm-3,\n.col-sm-4,\n.col-sm-5,\n.col-sm-6,\n.col-sm-7,\n.col-sm-8,\n.col-sm-9,\n.col-sm-10,\n.col-sm-11,\n.col-sm-12,\n.col-lg-1,\n.col-lg-2,\n.col-lg-3,\n.col-lg-4,\n.col-lg-5,\n.col-lg-6,\n.col-lg-7,\n.col-lg-8,\n.col-lg-9,\n.col-lg-10,\n.col-lg-11,\n.col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n  float: left;\n}\n.col-1 {\n  width: 8.333333333333332%;\n}\n.col-2 {\n  width: 16.666666666666664%;\n}\n.col-3 {\n  width: 25%;\n}\n.col-4 {\n  width: 33.33333333333333%;\n}\n.col-5 {\n  width: 41.66666666666667%;\n}\n.col-6 {\n  width: 50%;\n}\n.col-7 {\n  width: 58.333333333333336%;\n}\n.col-8 {\n  width: 66.66666666666666%;\n}\n.col-9 {\n  width: 75%;\n}\n.col-10 {\n  width: 83.33333333333334%;\n}\n.col-11 {\n  width: 91.66666666666666%;\n}\n.col-12 {\n  width: 100%;\n}\n@media (min-width: 768px) {\n  .container {\n    max-width: 728px;\n  }\n  .col-sm-1,\n  .col-sm-2,\n  .col-sm-3,\n  .col-sm-4,\n  .col-sm-5,\n  .col-sm-6,\n  .col-sm-7,\n  .col-sm-8,\n  .col-sm-9,\n  .col-sm-10,\n  .col-sm-11,\n  .col-sm-12 {\n    float: left;\n  }\n  .col-sm-1 {\n    width: 8.333333333333332%;\n  }\n  .col-sm-2 {\n    width: 16.666666666666664%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-4 {\n    width: 33.33333333333333%;\n  }\n  .col-sm-5 {\n    width: 41.66666666666667%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-7 {\n    width: 58.333333333333336%;\n  }\n  .col-sm-8 {\n    width: 66.66666666666666%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-10 {\n    width: 83.33333333333334%;\n  }\n  .col-sm-11 {\n    width: 91.66666666666666%;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-push-1 {\n    left: 8.333333333333332%;\n  }\n  .col-push-2 {\n    left: 16.666666666666664%;\n  }\n  .col-push-3 {\n    left: 25%;\n  }\n  .col-push-4 {\n    left: 33.33333333333333%;\n  }\n  .col-push-5 {\n    left: 41.66666666666667%;\n  }\n  .col-push-6 {\n    left: 50%;\n  }\n  .col-push-7 {\n    left: 58.333333333333336%;\n  }\n  .col-push-8 {\n    left: 66.66666666666666%;\n  }\n  .col-push-9 {\n    left: 75%;\n  }\n  .col-push-10 {\n    left: 83.33333333333334%;\n  }\n  .col-push-11 {\n    left: 91.66666666666666%;\n  }\n  .col-pull-1 {\n    right: 8.333333333333332%;\n  }\n  .col-pull-2 {\n    right: 16.666666666666664%;\n  }\n  .col-pull-3 {\n    right: 25%;\n  }\n  .col-pull-4 {\n    right: 33.33333333333333%;\n  }\n  .col-pull-5 {\n    right: 41.66666666666667%;\n  }\n  .col-pull-6 {\n    right: 50%;\n  }\n  .col-pull-7 {\n    right: 58.333333333333336%;\n  }\n  .col-pull-8 {\n    right: 66.66666666666666%;\n  }\n  .col-pull-9 {\n    right: 75%;\n  }\n  .col-pull-10 {\n    right: 83.33333333333334%;\n  }\n  .col-pull-11 {\n    right: 91.66666666666666%;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    max-width: 940px;\n  }\n  .col-lg-1,\n  .col-lg-2,\n  .col-lg-3,\n  .col-lg-4,\n  .col-lg-5,\n  .col-lg-6,\n  .col-lg-7,\n  .col-lg-8,\n  .col-lg-9,\n  .col-lg-10,\n  .col-lg-11,\n  .col-lg-12 {\n    float: left;\n  }\n  .col-lg-1 {\n    width: 8.333333333333332%;\n  }\n  .col-lg-2 {\n    width: 16.666666666666664%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-4 {\n    width: 33.33333333333333%;\n  }\n  .col-lg-5 {\n    width: 41.66666666666667%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-7 {\n    width: 58.333333333333336%;\n  }\n  .col-lg-8 {\n    width: 66.66666666666666%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-10 {\n    width: 83.33333333333334%;\n  }\n  .col-lg-11 {\n    width: 91.66666666666666%;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-offset-1 {\n    margin-left: 8.333333333333332%;\n  }\n  .col-offset-2 {\n    margin-left: 16.666666666666664%;\n  }\n  .col-offset-3 {\n    margin-left: 25%;\n  }\n  .col-offset-4 {\n    margin-left: 33.33333333333333%;\n  }\n  .col-offset-5 {\n    margin-left: 41.66666666666667%;\n  }\n  .col-offset-6 {\n    margin-left: 50%;\n  }\n  .col-offset-7 {\n    margin-left: 58.333333333333336%;\n  }\n  .col-offset-8 {\n    margin-left: 66.66666666666666%;\n  }\n  .col-offset-9 {\n    margin-left: 75%;\n  }\n  .col-offset-10 {\n    margin-left: 83.33333333333334%;\n  }\n  .col-offset-11 {\n    margin-left: 91.66666666666666%;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    max-width: 1170px;\n  }\n}\ntable {\n  max-width: 100%;\n  background-color: transparent;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  margin-bottom: 20px;\n}\n.table thead > tr > th,\n.table tbody > tr > th,\n.table tfoot > tr > th,\n.table thead > tr > td,\n.table tbody > tr > td,\n.table tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.428571429;\n  vertical-align: top;\n  border-top: 1px solid #dddddd;\n}\n.table thead > tr > th {\n  vertical-align: bottom;\n}\n.table caption + thead tr:first-child th,\n.table colgroup + thead tr:first-child th,\n.table thead:first-child tr:first-child th,\n.table caption + thead tr:first-child td,\n.table colgroup + thead tr:first-child td,\n.table thead:first-child tr:first-child td {\n  border-top: 0;\n}\n.table tbody + tbody {\n  border-top: 2px solid #dddddd;\n}\n.table .table {\n  background-color: #ffffff;\n}\n.table-condensed thead > tr > th,\n.table-condensed tbody > tr > th,\n.table-condensed tfoot > tr > th,\n.table-condensed thead > tr > td,\n.table-condensed tbody > tr > td,\n.table-condensed tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #dddddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #dddddd;\n}\n.table-striped > tbody > tr:nth-child(odd) > td,\n.table-striped > tbody > tr:nth-child(odd) > th {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover > td,\n.table-hover > tbody > tr:hover > th {\n  background-color: #f5f5f5;\n}\ntable col[class^="col-"] {\n  float: none;\n  display: table-column;\n}\ntable td[class^="col-"],\ntable th[class^="col-"] {\n  float: none;\n  display: table-cell;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n  border-color: #eed3d7;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n  border-color: #fbeed5;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td {\n  background-color: #d0e9c6;\n  border-color: #c9e2b3;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td {\n  background-color: #ebcccc;\n  border-color: #e6c1c7;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td {\n  background-color: #faf2cc;\n  border-color: #f8e5be;\n}\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type="search"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\ninput[type="radio"],\ninput[type="checkbox"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  /* IE8-9 */\n\n  line-height: normal;\n}\ninput[type="file"] {\n  display: block;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\nselect optgroup {\n  font-size: inherit;\n  font-style: inherit;\n  font-family: inherit;\n}\ninput[type="file"]:focus,\ninput[type="radio"]:focus,\ninput[type="checkbox"]:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\ninput[type="number"]::-webkit-outer-spin-button,\ninput[type="number"]::-webkit-inner-spin-button {\n  height: auto;\n}\n.form-control:-moz-placeholder {\n  color: #999999;\n}\n.form-control::-moz-placeholder {\n  color: #999999;\n}\n.form-control:-ms-input-placeholder {\n  color: #999999;\n}\n.form-control::-webkit-input-placeholder {\n  color: #999999;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 38px;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1.428571429;\n  color: #555555;\n  vertical-align: middle;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: rgba(82, 168, 236, 0.8);\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n  background-color: #eeeeee;\n}\ntextarea.form-control {\n  height: auto;\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  display: block;\n  min-height: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  padding-left: 20px;\n  vertical-align: middle;\n}\n.radio label,\n.checkbox label {\n  display: inline;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type="radio"],\n.radio-inline input[type="radio"],\n.checkbox input[type="checkbox"],\n.checkbox-inline input[type="checkbox"] {\n  float: left;\n  margin-left: -20px;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\n.form-control.input-large {\n  height: 56px;\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.form-control.input-small {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\nselect.input-large {\n  height: 56px;\n  line-height: 56px;\n}\nselect.input-small {\n  height: 30px;\n  line-height: 30px;\n}\n.has-warning .help-block,\n.has-warning .control-label {\n  color: #c09853;\n}\n.has-warning .form-control {\n  padding-right: 32px;\n  border-color: #c09853;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #a47e3c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n}\n.has-warning .input-group-addon {\n  color: #c09853;\n  border-color: #c09853;\n  background-color: #fcf8e3;\n}\n.has-error .help-block,\n.has-error .control-label {\n  color: #b94a48;\n}\n.has-error .form-control {\n  padding-right: 32px;\n  border-color: #b94a48;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #953b39;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n}\n.has-error .input-group-addon {\n  color: #b94a48;\n  border-color: #b94a48;\n  background-color: #f2dede;\n}\n.has-success .help-block,\n.has-success .control-label {\n  color: #468847;\n}\n.has-success .form-control {\n  padding-right: 32px;\n  border-color: #468847;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #356635;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n}\n.has-success .input-group-addon {\n  color: #468847;\n  border-color: #468847;\n  background-color: #dff0d8;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n.input-group {\n  display: table;\n  border-collapse: separate;\n}\n.input-group.col {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.428571429;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-small {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-large {\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -4px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.form-inline .form-control,\n.form-inline .radio,\n.form-inline .checkbox {\n  display: inline-block;\n}\n.form-inline .radio,\n.form-inline .checkbox {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.form-horizontal .control-label {\n  padding-top: 6px;\n}\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.form-horizontal .form-group:after {\n  clear: both;\n}\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.form-horizontal .form-group:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group {\n    margin-left: -15px;\n    margin-right: -15px;\n  }\n}\n.form-horizontal .form-group .row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n  }\n}\n.btn {\n  display: inline-block;\n  padding: 8px 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.428571429;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  white-space: nowrap;\n}\n.btn:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus {\n  color: #ffffff;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  outline: 0;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: default;\n  pointer-events: none;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-default {\n  color: #ffffff;\n  background-color: #474949;\n  border-color: #474949;\n}\n.btn-default:hover,\n.btn-default:focus,\n.btn-default:active,\n.btn-default.active {\n  background-color: #3a3c3c;\n  border-color: #2e2f2f;\n}\n.btn-default.disabled,\n.btn-default[disabled],\nfieldset[disabled] .btn-default,\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled:active,\n.btn-default[disabled]:active,\nfieldset[disabled] .btn-default:active,\n.btn-default.disabled.active,\n.btn-default[disabled].active,\nfieldset[disabled] .btn-default.active {\n  background-color: #474949;\n  border-color: #474949;\n}\n.btn-primary {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.btn-primary:hover,\n.btn-primary:focus,\n.btn-primary:active,\n.btn-primary.active {\n  background-color: #357ebd;\n  border-color: #3071a9;\n}\n.btn-primary.disabled,\n.btn-primary[disabled],\nfieldset[disabled] .btn-primary,\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled:active,\n.btn-primary[disabled]:active,\nfieldset[disabled] .btn-primary:active,\n.btn-primary.disabled.active,\n.btn-primary[disabled].active,\nfieldset[disabled] .btn-primary.active {\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.btn-warning {\n  color: #ffffff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n.btn-warning:hover,\n.btn-warning:focus,\n.btn-warning:active,\n.btn-warning.active {\n  background-color: #eea236;\n  border-color: #ec971f;\n}\n.btn-warning.disabled,\n.btn-warning[disabled],\nfieldset[disabled] .btn-warning,\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled:active,\n.btn-warning[disabled]:active,\nfieldset[disabled] .btn-warning:active,\n.btn-warning.disabled.active,\n.btn-warning[disabled].active,\nfieldset[disabled] .btn-warning.active {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n.btn-danger {\n  color: #ffffff;\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n.btn-danger:hover,\n.btn-danger:focus,\n.btn-danger:active,\n.btn-danger.active {\n  background-color: #d43f3a;\n  border-color: #c9302c;\n}\n.btn-danger.disabled,\n.btn-danger[disabled],\nfieldset[disabled] .btn-danger,\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled:active,\n.btn-danger[disabled]:active,\nfieldset[disabled] .btn-danger:active,\n.btn-danger.disabled.active,\n.btn-danger[disabled].active,\nfieldset[disabled] .btn-danger.active {\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n.btn-success {\n  color: #ffffff;\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n.btn-success:hover,\n.btn-success:focus,\n.btn-success:active,\n.btn-success.active {\n  background-color: #4cae4c;\n  border-color: #449d44;\n}\n.btn-success.disabled,\n.btn-success[disabled],\nfieldset[disabled] .btn-success,\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled:active,\n.btn-success[disabled]:active,\nfieldset[disabled] .btn-success:active,\n.btn-success.disabled.active,\n.btn-success[disabled].active,\nfieldset[disabled] .btn-success.active {\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n.btn-info {\n  color: #ffffff;\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n.btn-info:hover,\n.btn-info:focus,\n.btn-info:active,\n.btn-info.active {\n  background-color: #46b8da;\n  border-color: #31b0d5;\n}\n.btn-info.disabled,\n.btn-info[disabled],\nfieldset[disabled] .btn-info,\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled:active,\n.btn-info[disabled]:active,\nfieldset[disabled] .btn-info:active,\n.btn-info.disabled.active,\n.btn-info[disabled].active,\nfieldset[disabled] .btn-info.active {\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n.btn-link {\n  color: #428bca;\n  font-weight: normal;\n  cursor: pointer;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #2a6496;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #333333;\n  text-decoration: none;\n}\n.btn-large {\n  padding: 14px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.btn-small {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n  padding-left: 0;\n  padding-right: 0;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type="submit"].btn-block,\ninput[type="reset"].btn-block,\ninput[type="button"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  transition: height 0.35s ease;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px solid #000000;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  content: "";\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.428571429;\n  color: #333333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #ffffff;\n  background-color: #357ebd;\n  background-image: -webkit-gradient(linear, left 0%, left 100%, from(#428bca), to(#357ebd));\n  background-image: -webkit-linear-gradient(top, #428bca, 0%, #357ebd, 100%);\n  background-image: -moz-linear-gradient(top, #428bca 0%, #357ebd 100%);\n  background-image: linear-gradient(to bottom, #428bca 0%, #357ebd 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff428bca\', endColorstr=\'#ff357ebd\', GradientType=0);\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #ffffff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #357ebd;\n  background-image: -webkit-gradient(linear, left 0%, left 100%, from(#428bca), to(#357ebd));\n  background-image: -webkit-linear-gradient(top, #428bca, 0%, #357ebd, 100%);\n  background-image: -moz-linear-gradient(top, #428bca 0%, #357ebd 100%);\n  background-image: linear-gradient(to bottom, #428bca 0%, #357ebd 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff428bca\', endColorstr=\'#ff357ebd\', GradientType=0);\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #999999;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.428571429;\n  color: #999999;\n}\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px solid #000000;\n  content: "";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 1px;\n}\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n  background-color: #ffffff;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 30px 10px 15px;\n  margin-bottom: -1px;\n  border: 1px solid #dddddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.list-group-item > .badge {\n  float: right;\n  margin-right: -15px;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\na.list-group-item .list-group-item-heading {\n  color: #333333;\n}\na.list-group-item .list-group-item-text {\n  color: #555555;\n}\na.list-group-item:hover,\na.list-group-item:focus {\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\na.list-group-item.active {\n  z-index: 2;\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\na.list-group-item.active .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item.active .list-group-item-text {\n  color: #e1edf7;\n}\n.panel {\n  padding: 15px;\n  margin-bottom: 20px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.panel-heading {\n  margin: -15px -15px 15px;\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid #dddddd;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 17.5px;\n  font-weight: 500;\n}\n.panel-footer {\n  margin: 15px -15px -15px;\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #dddddd;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.panel-primary {\n  border-color: #428bca;\n}\n.panel-primary .panel-heading {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success .panel-heading {\n  color: #468847;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-warning {\n  border-color: #fbeed5;\n}\n.panel-warning .panel-heading {\n  color: #c09853;\n  background-color: #fcf8e3;\n  border-color: #fbeed5;\n}\n.panel-danger {\n  border-color: #eed3d7;\n}\n.panel-danger .panel-heading {\n  color: #b94a48;\n  background-color: #f2dede;\n  border-color: #eed3d7;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info .panel-heading {\n  color: #3a87ad;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.list-group-flush {\n  margin: 15px -15px -15px;\n}\n.list-group-flush .list-group-item {\n  border-width: 1px 0;\n}\n.list-group-flush .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.list-group-flush .list-group-item:last-child {\n  border-bottom: 0;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.well-large {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-small {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000000;\n  text-shadow: 0 1px 0 #ffffff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.close:hover,\n.close:focus {\n  color: #000000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav:before,\n.nav:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.nav:after {\n  clear: both;\n}\n.nav:before,\n.nav:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.nav:after {\n  clear: both;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.nav > li.disabled > a {\n  color: #999999;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #999999;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav > li + .nav-header {\n  margin-top: 9px;\n}\n.nav.open > a,\n.nav.open > a:hover,\n.nav.open > a:focus {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.nav.open > a .caret,\n.nav.open > a:hover .caret,\n.nav.open > a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n.nav > .pull-right {\n  float: right;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav-tabs {\n  border-bottom: 1px solid #dddddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.428571429;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eeeeee;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n}\n.nav-tabs.nav-justified > li > a {\n  border-bottom: 1px solid #dddddd;\n  margin-right: 0;\n}\n.nav-tabs.nav-justified > .active > a {\n  border-bottom-color: #ffffff;\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 5px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #ffffff;\n  background-color: #428bca;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li > a {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.nav-justified > li > a {\n  text-align: center;\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  border-bottom: 1px solid #dddddd;\n  margin-right: 0;\n}\n.nav-tabs-justified > .active > a {\n  border-bottom-color: #ffffff;\n}\n.tabbable:before,\n.tabbable:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.tabbable:after {\n  clear: both;\n}\n.tabbable:before,\n.tabbable:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.tabbable:after {\n  clear: both;\n}\n.tab-content > .tab-pane,\n.pill-content > .pill-pane {\n  display: none;\n}\n.tab-content > .active,\n.pill-content > .active {\n  display: block;\n}\n.nav .caret {\n  border-top-color: #428bca;\n  border-bottom-color: #428bca;\n}\n.nav a:hover .caret {\n  border-top-color: #2a6496;\n  border-bottom-color: #2a6496;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  padding-left: 15px;\n  padding-right: 15px;\n  background-color: #eeeeee;\n  border-radius: 4px;\n}\n.navbar:before,\n.navbar:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.navbar:after {\n  clear: both;\n}\n.navbar:before,\n.navbar:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.navbar:after {\n  clear: both;\n}\n.navbar-nav {\n  margin-top: 10px;\n  margin-bottom: 15px;\n}\n.navbar-nav > li > a {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  color: #777777;\n  line-height: 20px;\n  border-radius: 4px;\n}\n.navbar-nav > li > a:hover,\n.navbar-nav > li > a:focus {\n  color: #333333;\n  background-color: transparent;\n}\n.navbar-nav > .active > a,\n.navbar-nav > .active > a:hover,\n.navbar-nav > .active > a:focus {\n  color: #555555;\n  background-color: #d5d5d5;\n}\n.navbar-nav > .disabled > a,\n.navbar-nav > .disabled > a:hover,\n.navbar-nav > .disabled > a:focus {\n  color: #cccccc;\n  background-color: transparent;\n}\n.navbar-nav.pull-right {\n  width: 100%;\n}\n.navbar-static-top {\n  border-radius: 0;\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n  border-radius: 0;\n}\n.navbar-fixed-top {\n  top: 0;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n}\n.navbar-brand {\n  display: block;\n  max-width: 200px;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 15px 15px;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 20px;\n  color: #777777;\n  text-align: center;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  color: #5e5e5e;\n  text-decoration: none;\n  background-color: transparent;\n}\n.navbar-toggle {\n  position: absolute;\n  top: 9px;\n  right: 10px;\n  width: 48px;\n  height: 32px;\n  padding: 8px 12px;\n  background-color: transparent;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n}\n.navbar-toggle:hover,\n.navbar-toggle:focus {\n  background-color: #dddddd;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  background-color: #cccccc;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n.navbar-form {\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n.navbar-form .form-control,\n.navbar-form .radio,\n.navbar-form .checkbox {\n  display: inline-block;\n}\n.navbar-form .radio,\n.navbar-form .checkbox {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.navbar-nav > .dropdown > a:hover .caret,\n.navbar-nav > .dropdown > a:focus .caret {\n  border-top-color: #333333;\n  border-bottom-color: #333333;\n}\n.navbar-nav > .open > a,\n.navbar-nav > .open > a:hover,\n.navbar-nav > .open > a:focus {\n  background-color: #d5d5d5;\n  color: #555555;\n}\n.navbar-nav > .open > a .caret,\n.navbar-nav > .open > a:hover .caret,\n.navbar-nav > .open > a:focus .caret {\n  border-top-color: #555555;\n  border-bottom-color: #555555;\n}\n.navbar-nav > .dropdown > a .caret {\n  border-top-color: #777777;\n  border-bottom-color: #777777;\n}\n.navbar-nav.pull-right > li > .dropdown-menu,\n.navbar-nav > li > .dropdown-menu.pull-right {\n  left: auto;\n  right: 0;\n}\n.navbar-inverse {\n  background-color: #222222;\n}\n.navbar-inverse .navbar-brand {\n  color: #999999;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #999999;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #999999;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #ffffff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #080808;\n  color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .dropdown > a:hover .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n.navbar-inverse .navbar-nav > .dropdown > a .caret {\n  border-top-color: #999999;\n  border-bottom-color: #999999;\n}\n.navbar-inverse .navbar-nav > .open > a .caret,\n.navbar-inverse .navbar-nav > .open > a:hover .caret,\n.navbar-inverse .navbar-nav > .open > a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n}\n@media screen and (min-width: 768px) {\n  .navbar-brand {\n    float: left;\n    margin-left: -15px;\n    margin-right: 5px;\n  }\n  .navbar-nav {\n    float: left;\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    border-radius: 0;\n  }\n  .navbar-nav.pull-right {\n    float: right;\n    width: auto;\n  }\n  .navbar-toggle {\n    position: relative;\n    top: auto;\n    left: auto;\n    display: none;\n  }\n  .nav-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    overflow: visible !important;\n  }\n}\n.navbar-btn {\n  margin-top: 6px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n.navbar-link {\n  color: #777777;\n}\n.navbar-link:hover {\n  color: #333333;\n}\n.navbar-inverse .navbar-link {\n  color: #999999;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #ffffff;\n}\n.btn .caret {\n  border-top-color: #ffffff;\n}\n.dropup .btn .caret {\n  border-bottom-color: #ffffff;\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active {\n  z-index: 2;\n}\n.btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.btn-toolbar:before,\n.btn-toolbar:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.btn-toolbar:after {\n  clear: both;\n}\n.btn-toolbar:before,\n.btn-toolbar:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.btn-toolbar:after {\n  clear: both;\n}\n.btn-toolbar .btn-group {\n  float: left;\n}\n.btn-toolbar > .btn + .btn,\n.btn-toolbar > .btn-group + .btn,\n.btn-toolbar > .btn + .btn-group,\n.btn-toolbar > .btn-group + .btn-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child > .btn:last-child,\n.btn-group > .btn-group:first-child > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn-group:last-child > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.btn-group > .btn-large + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-large .caret {\n  border-width: 5px;\n}\n.dropup .btn-large .caret {\n  border-bottom-width: 5px;\n}\n.btn-group-vertical > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn + .btn {\n  margin-top: -1px;\n}\n.btn-group-vertical .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical .btn:first-child {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical .btn:last-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n}\n.btn-group-justified .btn {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group[data-toggle="buttons"] > .btn > input[type="radio"],\n.btn-group[data-toggle="buttons"] > .btn > input[type="checkbox"] {\n  display: none;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: "/\\00a0";\n  padding: 0 5px;\n  color: #cccccc;\n}\n.breadcrumb > .active {\n  color: #999999;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  float: left;\n  padding: 4px 12px;\n  line-height: 1.428571429;\n  text-decoration: none;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-left-width: 0;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  border-left-width: 1px;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > a:focus,\n.pagination > .active > a,\n.pagination > .active > span {\n  background-color: #f5f5f5;\n}\n.pagination > .active > a,\n.pagination > .active > span {\n  color: #999999;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #999999;\n  background-color: #ffffff;\n  cursor: not-allowed;\n}\n.pagination-large > li > a,\n.pagination-large > li > span {\n  padding: 14px 16px;\n  font-size: 18px;\n}\n.pagination-large > li:first-child > a,\n.pagination-large > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-large > li:last-child > a,\n.pagination-large > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.pagination-small > li > a,\n.pagination-small > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n}\n.pagination-small > li:first-child > a,\n.pagination-small > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-small > li:last-child > a,\n.pagination-small > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager:before,\n.pager:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.pager:after {\n  clear: both;\n}\n.pager:before,\n.pager:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.pager:after {\n  clear: both;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #999999;\n  background-color: #ffffff;\n  cursor: not-allowed;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  display: none;\n  overflow: auto;\n  overflow-y: scroll;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.fade.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.modal-dialog {\n  position: relative;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: auto;\n  padding: 10px;\n  z-index: 1050;\n}\n.modal-content {\n  position: relative;\n  background-color: #ffffff;\n  border: 1px solid #999999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: none;\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n  background-color: #000000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.modal-backdrop.fade.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n  min-height: 16.428571429px;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.428571429;\n}\n.modal-body {\n  position: relative;\n  padding: 20px;\n}\n.modal-footer {\n  margin-top: 15px;\n  padding: 19px 20px 20px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer:before,\n.modal-footer:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.modal-footer:after {\n  clear: both;\n}\n.modal-footer:before,\n.modal-footer:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.modal-footer:after {\n  clear: both;\n}\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n@media screen and (min-width: 768px) {\n  .modal-dialog {\n    left: 50%;\n    right: auto;\n    width: 560px;\n    margin-left: -280px;\n    padding-top: 30px;\n    padding-bottom: 30px;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1030;\n  display: block;\n  visibility: visible;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.tooltip.in {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #ffffff;\n  text-align: center;\n  text-decoration: none;\n  background-color: rgba(0, 0, 0, 0.9);\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: rgba(0, 0, 0, 0.9);\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1010;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  text-align: left;\n  background-color: #ffffff;\n  -webkit-bg-clip: padding-box;\n  -moz-bg-clip: padding;\n  background-clip: padding-box;\n  border: 1px solid #cccccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  white-space: normal;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 18px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover .arrow,\n.popover .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover .arrow {\n  border-width: 11px;\n}\n.popover .arrow:after {\n  border-width: 10px;\n  content: "";\n}\n.popover.top .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top .arrow:after {\n  content: " ";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #ffffff;\n}\n.popover.right .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right .arrow:after {\n  content: " ";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #ffffff;\n}\n.popover.bottom .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom .arrow:after {\n  content: " ";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #ffffff;\n}\n.popover.left .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left .arrow:after {\n  content: " ";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #ffffff;\n  bottom: -10px;\n}\n.alert {\n  padding: 10px 35px 10px 15px;\n  margin-bottom: 20px;\n  color: #c09853;\n  background-color: #fcf8e3;\n  border: 1px solid #fbeed5;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert hr {\n  border-top-color: #f8e5be;\n}\n.alert .alert-link {\n  font-weight: 500;\n  color: #a47e3c;\n}\n.alert .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #468847;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #356635;\n}\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #eed3d7;\n  color: #b94a48;\n}\n.alert-danger hr {\n  border-top-color: #e6c1c7;\n}\n.alert-danger .alert-link {\n  color: #953b39;\n}\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #3a87ad;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #2d6987;\n}\n.alert-block {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n.alert-block > p,\n.alert-block > ul {\n  margin-bottom: 0;\n}\n.alert-block p + p {\n  margin-top: 5px;\n}\n.thumbnail,\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.428571429;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n.thumbnail {\n  display: block;\n}\n.thumbnail > img,\n.img-thumbnail {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus {\n  border-color: #428bca;\n}\n.thumbnail > img {\n  margin-left: auto;\n  margin-right: auto;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333333;\n}\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1;\n}\n.media,\n.media .media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media-object {\n  display: block;\n}\n.media-heading {\n  margin: 0 0 5px;\n}\n.media > .pull-left {\n  margin-right: 10px;\n}\n.media > .pull-right {\n  margin-left: 10px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.label {\n  display: inline;\n  padding: .25em .6em;\n  font-size: 75%;\n  font-weight: 500;\n  line-height: 1;\n  color: #ffffff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  background-color: #999999;\n  border-radius: .25em;\n}\n.label[href]:hover,\n.label[href]:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n  background-color: #808080;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #ffffff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #999999;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\na.badge:hover,\na.badge:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\na.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #428bca;\n  background-color: #ffffff;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-moz-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-ms-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 0 0;\n  }\n  to {\n    background-position: 40px 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  color: #ffffff;\n  text-align: center;\n  background-color: #428bca;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n.progress-striped .progress-bar {\n  background-color: #428bca;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n}\n.progress.active .progress-bar {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -moz-animation: progress-bar-stripes 2s linear infinite;\n  -ms-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-color: #d9534f;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-color: #5cb85c;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-color: #f0ad4e;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-color: #5bc0de;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.accordion {\n  margin-bottom: 20px;\n}\n.accordion-group {\n  margin-bottom: 2px;\n  border: 1px solid #e5e5e5;\n  border-radius: 4px;\n}\n.accordion-heading {\n  border-bottom: 0;\n}\n.accordion-heading .accordion-toggle {\n  display: block;\n  padding: 8px 15px;\n  cursor: pointer;\n}\n.accordion-inner {\n  padding: 9px 15px;\n  border-top: 1px solid #e5e5e5;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n  line-height: 1;\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-control.left {\n  background-color: rgba(0, 0, 0, 0.0001);\n  background-image: -webkit-gradient(linear, 0% top, 100% top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.0001)));\n  background-image: -webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, 0.5) 0%), color-stop(rgba(0, 0, 0, 0.0001) 100%));\n  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#80000000\', endColorstr=\'#00000000\', GradientType=1);\n  background-color: transparent;\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  background-image: -webkit-gradient(linear, 0% top, 100% top, from(rgba(0, 0, 0, 0.0001)), to(rgba(0, 0, 0, 0.5)));\n  background-image: -webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, 0.0001) 0%), color-stop(rgba(0, 0, 0, 0.5) 100%));\n  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00000000\', endColorstr=\'#80000000\', GradientType=1);\n  background-color: transparent;\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  color: #ffffff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.carousel-control .glyphicon,\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: 5;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: \'\\2039\';\n}\n.carousel-control .icon-next:before {\n  content: \'\\203a\';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 120px;\n  margin-left: -60px;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #ffffff;\n  border-radius: 10px;\n  cursor: pointer;\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #ffffff;\n}\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    margin-left: -15px;\n    font-size: 30px;\n  }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.jumbotron {\n  padding: 30px;\n  margin-bottom: 30px;\n  font-size: 21px;\n  font-weight: 200;\n  line-height: 2.1428571435;\n  color: inherit;\n  background-color: #eeeeee;\n}\n.jumbotron h1 {\n  line-height: 1;\n  color: inherit;\n}\n.jumbotron p {\n  line-height: 1.4;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding: 50px 60px;\n    border-radius: 6px;\n  }\n  .jumbotron h1 {\n    font-size: 63px;\n  }\n}\n.clearfix:before,\n.clearfix:after {\n  content: " ";\n  /* 1 */\n\n  display: table;\n  /* 2 */\n\n}\n.clearfix:after {\n  clear: both;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n@media screen and (max-width: 400px) {\n  @-ms-viewport {\n    width: 320px;\n  }\n}\n.hidden {\n  display: none !important;\n  visibility: hidden !important;\n}\n.visible-sm {\n  display: block !important;\n}\ntr.visible-sm {\n  display: table-row !important;\n}\nth.visible-sm,\ntd.visible-sm {\n  display: table-cell !important;\n}\n.visible-md {\n  display: none !important;\n}\ntr.visible-md {\n  display: none !important;\n}\nth.visible-md,\ntd.visible-md {\n  display: none !important;\n}\n.visible-lg {\n  display: none !important;\n}\ntr.visible-lg {\n  display: none !important;\n}\nth.visible-lg,\ntd.visible-lg {\n  display: none !important;\n}\n.hidden-sm {\n  display: none !important;\n}\ntr.hidden-sm {\n  display: none !important;\n}\nth.hidden-sm,\ntd.hidden-sm {\n  display: none !important;\n}\n.hidden-md {\n  display: block !important;\n}\ntr.hidden-md {\n  display: table-row !important;\n}\nth.hidden-md,\ntd.hidden-md {\n  display: table-cell !important;\n}\n.hidden-lg {\n  display: block !important;\n}\ntr.hidden-lg {\n  display: table-row !important;\n}\nth.hidden-lg,\ntd.hidden-lg {\n  display: table-cell !important;\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: none !important;\n  }\n  tr.visible-sm {\n    display: none !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: none !important;\n  }\n  .visible-md {\n    display: block !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n  .visible-lg {\n    display: none !important;\n  }\n  tr.visible-lg {\n    display: none !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: none !important;\n  }\n  .hidden-sm {\n    display: block !important;\n  }\n  tr.hidden-sm {\n    display: table-row !important;\n  }\n  th.hidden-sm,\n  td.hidden-sm {\n    display: table-cell !important;\n  }\n  .hidden-md {\n    display: none !important;\n  }\n  tr.hidden-md {\n    display: none !important;\n  }\n  th.hidden-md,\n  td.hidden-md {\n    display: none !important;\n  }\n  .hidden-lg {\n    display: block !important;\n  }\n  tr.hidden-lg {\n    display: table-row !important;\n  }\n  th.hidden-lg,\n  td.hidden-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) {\n  .visible-sm {\n    display: none !important;\n  }\n  tr.visible-sm {\n    display: none !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: none !important;\n  }\n  .visible-md {\n    display: none !important;\n  }\n  tr.visible-md {\n    display: none !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: none !important;\n  }\n  .visible-lg {\n    display: block !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n  .hidden-sm {\n    display: block !important;\n  }\n  tr.hidden-sm {\n    display: table-row !important;\n  }\n  th.hidden-sm,\n  td.hidden-sm {\n    display: table-cell !important;\n  }\n  .hidden-md {\n    display: block !important;\n  }\n  tr.hidden-md {\n    display: table-row !important;\n  }\n  th.hidden-md,\n  td.hidden-md {\n    display: table-cell !important;\n  }\n  .hidden-lg {\n    display: none !important;\n  }\n  tr.hidden-lg {\n    display: none !important;\n  }\n  th.hidden-lg,\n  td.hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\ntr.visible-print {\n  display: none !important;\n}\nth.visible-print,\ntd.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n  .hidden-print {\n    display: none !important;\n  }\n  tr.hidden-print {\n    display: none !important;\n  }\n  th.hidden-print,\n  td.hidden-print {\n    display: none !important;\n  }\n}\nbody {\n  background-color: #f5f5f5;\n  tab-size: 4;\n}\n#preview-contents {\n  padding: 19px;\n  margin-bottom: 50px;\n}\n.working {\n  cursor: progress;\n}\n.btn,\n.dropdown-menu {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n}\n/*\nOverride Bootstrap \n*/\ndiv,\nspan,\na,\nul,\nli,\ntextarea,\ninput,\nbutton {\n  background-image: none !important;\n  filter: none !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n  text-shadow: none !important;\n}\n.btn,\n.navbar-inner,\n.add-on {\n  border: none !important;\n}\n.dropdown-menu {\n  border: 1px solid #dddddd !important;\n  text-align: left;\n}\n.dropdown-menu:before {\n  border-bottom-color: #dddddd !important;\n}\ninput,\nselect,\ntextarea,\n.input-prepend .btn,\n.input-prepend .add-on {\n  border: 1px solid #dddddd !important;\n}\n.modal textarea:focus,\ninput[type="text"]:focus,\ninput[type="password"]:focus,\ninput[type="datetime"]:focus,\ninput[type="datetime-local"]:focus,\ninput[type="date"]:focus,\ninput[type="month"]:focus,\ninput[type="time"]:focus,\ninput[type="week"]:focus,\ninput[type="number"]:focus,\ninput[type="email"]:focus,\ninput[type="url"]:focus,\ninput[type="search"]:focus,\ninput[type="tel"]:focus,\ninput[type="color"]:focus,\n.uneditable-input:focus {\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(128, 128, 128, 0.6) !important;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(128, 128, 128, 0.6) !important;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(128, 128, 128, 0.6) !important;\n}\ninput:-moz-placeholder,\ntextarea:-moz-placeholder {\n  color: #ccc;\n}\ninput:-ms-input-placeholder,\ntextarea:-ms-input-placeholder {\n  color: #ccc;\n}\ninput::-webkit-input-placeholder,\ntextarea::-webkit-input-placeholder {\n  color: #ccc;\n}\n.help-block {\n  color: #999999;\n  font-size: 12px;\n  line-height: 17px;\n}\n.modal textarea.error,\n.modal input.error {\n  border-color: #ff8661 !important;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 134, 97, 0.6) !important;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 134, 97, 0.6) !important;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 134, 97, 0.6) !important;\n}\n.nav > li {\n  display: inline-block;\n}\n.navbar-inner .btn,\n#extension-preview-buttons .btn {\n  background-color: #ddd;\n}\n#extension-preview-buttons .dropdown-menu,\n#extension-preview-buttons .btn-group.open .btn,\n#extension-preview-buttons .btn-group.open:hover .btn {\n  background-color: #e8e8e8;\n}\n.navbar-inner .btn:hover,\n.navbar-inner .btn:focus,\n.navbar-inner .btn:active,\n.navbar-inner .btn.active,\n.btn-group.open .btn.dropdown-toggle,\n#extension-preview-buttons .btn-group:hover .btn {\n  color: #333333;\n  background-color: #eee;\n}\n.nav .dropdown-toggle .caret,\n.nav .dropdown-toggle:hover .caret,\n.nav .dropdown-toggle:focus .caret {\n  border-top-color: #525252;\n  border-bottom-color: #525252;\n}\n.navbar .nav.hide {\n  display: none;\n}\n.navbar-inner .btn.disabled *,\n.navbar-inner .btn.blocked *,\n.navbar-inner .btn[disabled] * {\n  color: rgba(51, 51, 51, 0.3);\n}\n.navbar .pull-right > li > .dropdown-menu,\n.navbar .nav > li > .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.navbar .pull-right > li > .dropdown-menu .dropdown-menu,\n.navbar .nav > li > .dropdown-menu.pull-right .dropdown-menu {\n  right: 100%;\n  left: auto;\n  margin-right: -1px;\n  margin-left: 0;\n}\n.dropdown-submenu {\n  position: relative;\n}\n.dropdown-submenu > .dropdown-menu {\n  top: 0;\n  left: 100%;\n  margin-top: -6px;\n  margin-left: -1px;\n}\n.dropdown-submenu:hover > .dropdown-menu {\n  display: block;\n}\n.dropup .dropdown-submenu > .dropdown-menu {\n  top: auto;\n  bottom: 0;\n  margin-top: 0;\n  margin-bottom: -2px;\n}\n.dropdown-submenu > a:after {\n  display: block;\n  float: right;\n  width: 0;\n  height: 0;\n  margin-top: 5px;\n  margin-right: -10px;\n  border-color: transparent;\n  border-left-color: #cccccc;\n  border-style: solid;\n  border-width: 5px 0 5px 5px;\n  content: " ";\n}\n.dropdown-submenu:hover > a:after {\n  border-left-color: #ffffff;\n}\n.dropdown-submenu.pull-left {\n  float: none;\n}\n.dropdown-submenu.pull-left > .dropdown-menu {\n  left: -100%;\n  margin-left: 10px;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus,\n.dropdown-submenu:hover > a,\n.dropdown-submenu:focus > a,\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  background-color: #888;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #bbb;\n}\n.btn-primary {\n  background-color: #777;\n}\ninput[disabled],\nselect[disabled],\ntextarea[disabled],\n.input-prepend .add-on {\n  background-color: #f5f5f5;\n}\ninput[readonly],\nselect[readonly],\ntextarea[readonly] {\n  background-color: transparent;\n  cursor: text;\n}\n.btn-primary:hover,\n.btn-primary:focus,\n.btn-primary:active,\n.btn-primary.active,\n.btn-primary.disabled,\n.btn-primary[disabled],\n.btn-group.open .btn.btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #888;\n}\n.btn-group {\n  margin-right: 10px;\n}\n#extension-preview-buttons,\n#extension-preview-buttons .dropdown-menu {\n  position: fixed;\n  right: 25px;\n  top: auto;\n  z-index: 1;\n}\n#extension-preview-buttons .dropdown-menu {\n  border: 0 !important;\n  margin-top: 1px;\n}\n#extension-preview-buttons .btn-group:hover .btn,\n#extension-preview-buttons .btn-group.open .btn {\n  opacity: 1;\n  filter: none;\n}\n#extension-buttons {\n  margin-right: 15px;\n}\n#extension-buttons > .btn-group {\n  margin: 0;\n}\n#extension-preview-buttons > .btn-group {\n  margin: 0 0 0 1px;\n}\n#extension-buttons > .btn-group > .btn,\n#extension-preview-buttons > .btn-group > .btn {\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n}\n#extension-buttons > .btn-group:first-child > .btn,\n#extension-preview-buttons > .btn-group:first-child > .btn {\n  -webkit-top-left-border-radius: 4px;\n  -webkit-bottom-left-border-radius: 4px;\n  -moz-top-left-border-radius: 4px;\n  -moz-bottom-left-border-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n#extension-buttons > .btn-group:last-child > .btn,\n#extension-preview-buttons > .btn-group:last-child > .btn {\n  -webkit-top-right-border-radius: 4px;\n  -webkit-bottom-right-border-radius: 4px;\n  -moz-top-right-border-radius: 4px;\n  -moz-bottom-right-border-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.markdown-syntax,\n.table-of-contents {\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 20px;\n  margin: 0 -20px 10px 0;\n}\n.markdown-syntax {\n  width: 300px;\n  white-space: normal;\n  max-height: 350px;\n}\n.table-of-contents {\n  width: 250px;\n  margin-left: -10px;\n  max-height: 400px;\n}\n.table-of-contents ul {\n  margin-left: 10px;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-right: 12px;\n  padding-left: 12px;\n}\ncode {\n  color: #333333;\n}\na code {\n  color: inherit;\n}\nh1 {\n  margin: 30px 0 30px;\n}\n.toc ul {\n  list-style-type: none;\n}\np,\npre,\nblockquote {\n  margin: 0 0 20px;\n}\nhr {\n  border-top: 1px solid #ddd;\n  margin: 30px 0;\n}\n#file-selector {\n  max-height: 500px;\n  overflow-y: auto;\n}\n#file-selector .stick {\n  padding: 10px 20px 0;\n}\n#file-title {\n  padding: 4px 15px;\n  display: block;\n  float: left;\n  margin-left: -20px;\n  font-size: 20px;\n  font-weight: 200;\n  color: #666;\n}\n#file-title i {\n  margin: 4px 5px 0;\n}\n.dropdown-menu i {\n  margin-right: 5px;\n}\n.navbar {\n  background-color: #ddd;\n  position: static;\n}\n.navbar .nav {\n  float: left;\n  margin: 6px 0 0;\n}\n.navbar .nav.pull-right {\n  float: right;\n}\n.navbar .pull-right > li > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n#menu-bar {\n  margin-left: 15px;\n}\n#wmd-input,\n#md-section-helper {\n  resize: none;\n  border: none !important;\n}\n.preview-container {\n  overflow: auto;\n}\n.wmd-button-row {\n  padding: 0;\n  margin-left: 10px;\n}\n.wmd-spacer {\n  display: none;\n}\n.wmd-spacer + .wmd-button {\n  margin-left: 20px;\n}\n.wmd-prompt-background {\n  display: none;\n}\n.wmd-prompt-dialog {\n  border: 1px solid #999999;\n  background-color: #f5f5f5;\n}\n.wmd-prompt-dialog > div {\n  font-size: 0.8em;\n  font-family: arial, helvetica, sans-serif;\n}\n.wmd-prompt-dialog > form > input[type="text"] {\n  border: 1px solid #999999;\n  color: black;\n}\n.wmd-prompt-dialog > form > input[type="button"] {\n  border: 1px solid #888888;\n  font-family: trebuchet MS, helvetica, sans-serif;\n  font-size: 0.8em;\n  font-weight: bold;\n}\n.dropdown-menu .divider.with-text {\n  height: auto;\n  margin-bottom: 2px;\n  background-color: transparent;\n  border-top: 1px solid #e5e5e5;\n  color: #ccc;\n  font-variant: small-caps;\n  font-weight: bold;\n  padding-left: 20px;\n  cursor: default;\n}\ndiv.dropdown-menu {\n  padding: 5px 20px;\n}\ndiv.dropdown-menu p,\ndiv.dropdown-menu blockquote {\n  margin: 10px 0;\n}\ndiv.dropdown-menu .stat {\n  margin-bottom: 10px;\n}\ndiv.dropdown-menu i {\n  margin-right: 0;\n}\ndiv.dropdown-menu textarea {\n  width: 250px;\n  height: 150px;\n  resize: none;\n}\n#link-container {\n  min-width: 210px;\n  white-space: normal;\n}\n#link-container .link-list {\n  margin-top: 10px;\n}\n.footnote {\n  vertical-align: top;\n  position: relative;\n  top: -0.5em;\n  font-size: 0.8em;\n}\n[class^="icon-"],\n[class*=" icon-"] {\n  color: #525252;\n  display: inline-block;\n  line-height: 14px;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n}\n.icon-stackedit {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -1px 0;\n}\n.icon-gdrive {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -19px 0;\n}\n.icon-gdrive.realtime {\n  width: 18px;\n  background-position: -162px 0;\n}\n.icon-dropbox {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -37px 0;\n}\n.icon-github,\n.icon-gist {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -55px 0;\n}\n.icon-blogger {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -73px 0;\n}\n.icon-tumblr {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -91px 0;\n}\n.icon-wordpress {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -109px 0;\n}\n.icon-ssh {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -127px 0;\n}\n.icon-gplus {\n  background-image: url("../img/icons.png") !important;\n  width: 16px;\n  height: 16px;\n  background-position: -145px 0;\n}\n.working-indicator {\n  background-image: none !important;\n  width: 43px;\n  height: 11px;\n  background-position: 0 0;\n  margin: 0 20px 12px;\n}\n.working-indicator.show {\n  background-image: url("../img/ajax-loader.gif") !important;\n}\n.ui-layout-toggler-north .caret,\n.ui-layout-toggler-south .caret {\n  margin-top: 5px;\n}\n.ui-layout-toggler-north-open .caret,\n.ui-layout-toggler-south-closed .caret {\n  border-bottom: 5px solid #525252;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  border-top: 0;\n}\n.ui-layout-toggler-north-closed .caret,\n.ui-layout-toggler-south-open .caret {\n  border-top: 5px solid #525252;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  border-bottom: 0;\n}\n.ui-layout-toggler-east .caret,\n.ui-layout-toggler-west .caret {\n  margin-top: 40px;\n}\n.ui-layout-toggler-east-open .caret,\n.ui-layout-toggler-west-closed .caret {\n  border-bottom: 5px solid transparent;\n  border-top: 5px solid transparent;\n  border-left: 5px solid #525252;\n  border-right: 0;\n}\n.ui-layout-toggler-east-closed .caret,\n.ui-layout-toggler-west-opened .caret {\n  border-bottom: 5px solid transparent;\n  border-top: 5px solid transparent;\n  border-right: 5px solid #525252;\n  border-left: 0;\n}\n/* Google picker */\n.picker-dialog {\n  z-index: 1050 !important;\n}\n.action-import-image-gplus {\n  float: left;\n}\n#modal-settings .modal-header {\n  padding-bottom: 0;\n}\n#modal-settings .form-horizontal {\n  margin-top: 10px;\n}\n#modal-settings textarea {\n  height: 80px;\n  max-width: 206px;\n}\n#modal-settings .accordion-group {\n  border: 0;\n  border-bottom: 1px solid #eee;\n  -webkit-border-radius: inherit;\n  -moz-border-radius: inherit;\n  border-radius: inherit;\n  margin-bottom: 10px;\n}\n#modal-settings .accordion-heading {\n  padding: 8px 15px;\n}\n#modal-settings .accordion-heading .accordion-toggle {\n  display: inline;\n  padding: 0;\n}\n#modal-settings .accordion-inner {\n  border: 0;\n  padding: 10px 40px;\n}\n#modal-settings .accordion-inner .form-horizontal .control-label {\n  text-align: left;\n}\n#modal-settings .accordion-inner .form-inline .label-text,\n#modal-settings .accordion-inner .control-label {\n  margin: 0 10px;\n}\n#modal-settings .tab-pane-button-container {\n  width: 200px;\n  margin: 10px auto 20px;\n}\n#modal-settings .tab-pane-button-container .btn {\n  text-align: initial;\n  padding-left: 15px;\n}\n#modal-settings .nav-tabs {\n  border-bottom: 1px solid transparent;\n  margin: 20px 0 0;\n}\n.nav-tabs > .active > a,\n.nav-tabs > .active > a:hover,\n.nav-tabs > .active > a:focus {\n  color: #fff;\n  background-color: #777;\n  border-color: #777;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  background-color: #eee;\n}\n.nav-tabs > li > a:hover,\n.nav-tabs > li > a:focus {\n  border-color: #eee;\n}\n.tooltip-inner {\n  text-align: left;\n}\n.tooltip li {\n  line-height: 1.4;\n}\ncode,\npre {\n  font-family: Menlo, Consolas, "Courier New", monospace;\n}\n/* Definition list */\ndt,\ndd {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\ndd {\n  margin-left: 40px;\n}\n/* Table style */\ntable {\n  margin-bottom: 20px;\n}\ntable th,\ntable td {\n  padding: 8px;\n  line-height: 20px;\n  text-align: left;\n  vertical-align: top;\n  border-top: 1px solid #dddddd;\n}\ntable th {\n  font-weight: bold;\n}\ntable thead th {\n  vertical-align: bottom;\n}\ntable caption + thead tr:first-child th,\ntable caption + thead tr:first-child td,\ntable colgroup + thead tr:first-child th,\ntable colgroup + thead tr:first-child td,\ntable thead:first-child tr:first-child th,\ntable thead:first-child tr:first-child td {\n  border-top: 0;\n}\ntable tbody + tbody {\n  border-top: 2px solid #dddddd;\n}\n#preview-contents blockquote {\n  border-color: #dddddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\nblockquote p {\n  margin-bottom: 20px;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 20px;\n}\nul,\nol {\n  margin-bottom: 20px;\n}\ninput[type="file"] {\n  line-height: inherit;\n  height: inherit;\n  border: none !important;\n}\n.drop-zone {\n  border: 2px dashed #bbb;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  padding: 40px;\n  text-align: center;\n  font-size: 24px;\n  color: #bbb;\n}\n#modal-import-harddrive-html textarea {\n  width: 500px;\n  max-width: 500px;\n  height: 100px;\n}\n#md-section-helper {\n  position: absolute;\n  top: -100px;\n  height: 1px;\n  padding: 0 6px;\n  overflow-y: scroll;\n  z-index: -1;\n}\n.lock-ui {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n}\n.gecko #md-section-helper {\n  /* Firefox doesn\'t show the scrollbar if height is less than 40px */\n\n  height: 40px;\n}\n.opera #md-section-helper {\n  /* Opera needs to have the textarea in the viewport to evaluate size correctly */\n\n  top: 0;\n}\n/* Viewer */\n.viewer #navbar {\n  position: fixed;\n}\n.viewer .navbar-inner {\n  background-color: rgba(215, 215, 215, 0.75) !important;\n}\n.viewer #preview-contents {\n  max-width: 1024px;\n  margin: 50px auto;\n}\n.viewer .btn-group {\n  margin-right: 0;\n  margin-left: 0;\n}\n', !0);
}), requirejs.s.contexts._.nextTick = requirejs.nextTick;
