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
 * jGrowl 1.2.12
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
 * Changes in 1.2.13
 * - Fixed clearing interval when the container shuts down
 *
 * Changes in 1.2.12
 * - Added compressed versions using UglifyJS and Sqwish
 * - Improved README with configuration options explanation
 * - Added a source map
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
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
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
 var t = e.e || null, n = !!e.guess, i = new printStackTrace.implementation(), o = i.run(t);
 return n ? i.guessAnonymousFunctions(o) : o;
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
  for (var r = o - 1; r >= 0; r--) if (e >= i[r]) {
   n.maxw = i[r];
   break;
  }
  widthClasses = "";
  for (var s in n) widthClasses += " " + s + "_" + n[s];
  return y.className = y.className + widthClasses, widthClasses;
 }
 var n = {}, i = [ 320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560 ], o = i.length, r = e.toLowerCase(), s = function(e) {
  return RegExp(e, "i").test(r);
 }, a = function(e, t) {
  t = t.replace(".", "_");
  for (var n = t.indexOf("_"), i = ""; n > 0; ) i += " " + e + t.substring(0, n), 
  n = t.indexOf("_", n + 1);
  return i += " " + e + t;
 }, l = "gecko", c = "webkit", u = "chrome", d = "firefox", p = "safari", f = "opera", h = "mobile", g = "android", m = "blackberry", v = "lang_", b = "device_", y = document.documentElement, w = [ !/opera|webtv/i.test(r) && /msie\s(\d+)/.test(r) ? "ie ie" + (/trident\/4\.0/.test(r) ? "8" : RegExp.$1) : s("firefox/") ? l + " " + d + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + d + RegExp.$2 + " " + d + RegExp.$2 + "_" + RegExp.$4 : "") : s("gecko/") ? l : s("opera") ? f + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$4 : /opera(\s|\/)(\d+)\.(\d+)/.test(r) ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$3 : "") : s("konqueror") ? "konqueror" : s("blackberry") ? m + (/Version\/(\d+)(\.(\d+)+)/i.test(r) ? " " + m + RegExp.$1 + " " + m + RegExp.$1 + RegExp.$2.replace(".", "_") : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(r) ? " " + m + RegExp.$2 + (RegExp.$3 ? " " + m + RegExp.$2 + RegExp.$3 : "") : "") : s("android") ? g + (/Version\/(\d+)(\.(\d+))+/i.test(r) ? " " + g + RegExp.$1 + " " + g + RegExp.$1 + RegExp.$2.replace(".", "_") : "") + (/Android (.+); (.+) Build/i.test(r) ? " " + b + RegExp.$2.replace(/ /g, "_").replace(/-/g, "_") : "") : s("chrome") ? c + " " + u + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + u + RegExp.$2 + (RegExp.$4 > 0 ? " " + u + RegExp.$2 + "_" + RegExp.$4 : "") : "") : s("iron") ? c + " iron" : s("applewebkit/") ? c + " " + p + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r) ? " " + p + RegExp.$2 + " " + p + RegExp.$2 + RegExp.$3.replace(".", "_") : / Safari\/(\d+)/i.test(r) ? "419" == RegExp.$1 || "417" == RegExp.$1 || "416" == RegExp.$1 || "412" == RegExp.$1 ? " " + p + "2_0" : "312" == RegExp.$1 ? " " + p + "1_3" : "125" == RegExp.$1 ? " " + p + "1_2" : "85" == RegExp.$1 ? " " + p + "1_0" : "" : "") : s("mozilla/") ? l : "", s("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk") ? h : "", s("j2me") ? "j2me" : s("ipad|ipod|iphone") ? (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(r) ? "ios" + a("ios", RegExp.$2) : "") + " " + (/(ip(ad|od|hone))/gi.test(r) ? RegExp.$1 : "") : s("playbook") ? "playbook" : s("kindle|silk") ? "kindle" : s("playbook") ? "playbook" : s("mac") ? "mac" + (/mac os x ((\d+)[.|_](\d+))/.test(r) ? " mac" + RegExp.$2 + " mac" + RegExp.$1.replace(".", "_") : "") : s("win") ? "win" + (s("windows nt 6.2") ? " win8" : s("windows nt 6.1") ? " win7" : s("windows nt 6.0") ? " vista" : s("windows nt 5.2") || s("windows nt 5.1") ? " win_xp" : s("windows nt 5.0") ? " win_2k" : s("windows nt 4.0") || s("WinNT4.0") ? " win_nt" : "") : s("freebsd") ? "freebsd" : s("x11|linux") ? "linux" : "", /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(r) ? (v + RegExp.$2).replace("-", "_") + ("" != RegExp.$3 ? (" " + v + RegExp.$1).replace("-", "_") : "") : "", s("ipad|iphone|ipod") && !s("safari") ? "ipad_app" : "" ];
 window.onresize = t, t();
 var x = w.join(" ") + " js ";
 return y.className = (x + y.className.replace(/\b(no[-|_]?)?js\b/g, "")).replace(/^ /, "").replace(/ +/g, " "), 
 x;
}

(function(e, t) {
 function n(e) {
  var t = e.length, n = rt.type(e);
  return rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
 }
 function i(e) {
  var t = ht[e] = {};
  return rt.each(e.match(at) || [], function(e, n) {
   t[n] = !0;
  }), t;
 }
 function o() {
  Object.defineProperty(this.cache = {}, 0, {
   get: function() {
    return {};
   }
  }), this.expando = rt.expando + Math.random();
 }
 function r(e, n, i) {
  var o;
  if (i === t && 1 === e.nodeType) if (o = "data-" + n.replace(bt, "-$1").toLowerCase(), 
  i = e.getAttribute(o), "string" == typeof i) {
   try {
    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : vt.test(i) ? JSON.parse(i) : i;
   } catch (r) {}
   gt.set(e, n, i);
  } else i = t;
  return i;
 }
 function s() {
  return !0;
 }
 function a() {
  return !1;
 }
 function l() {
  try {
   return U.activeElement;
  } catch (e) {}
 }
 function c(e, t) {
  for (;(e = e[t]) && 1 !== e.nodeType; ) ;
  return e;
 }
 function u(e, t, n) {
  if (rt.isFunction(t)) return rt.grep(e, function(e, i) {
   return !!t.call(e, i, e) !== n;
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
  var t = jt.exec(e.type);
  return t ? e.type = t[1] : e.removeAttribute("type"), e;
 }
 function h(e, t) {
  for (var n = e.length, i = 0; n > i; i++) mt.set(e[i], "globalEval", !t || mt.get(t[i], "globalEval"));
 }
 function g(e, t) {
  var n, i, o, r, s, a, l, c;
  if (1 === t.nodeType) {
   if (mt.hasData(e) && (r = mt.access(e), s = mt.set(t, r), c = r.events)) {
    delete s.handle, s.events = {};
    for (o in c) for (n = 0, i = c[o].length; i > n; n++) rt.event.add(t, o, c[o][n]);
   }
   gt.hasData(e) && (a = gt.access(e), l = rt.extend({}, a), gt.set(t, l));
  }
 }
 function m(e, n) {
  var i = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
  return n === t || n && rt.nodeName(e, n) ? rt.merge([ e ], i) : i;
 }
 function v(e, t) {
  var n = t.nodeName.toLowerCase();
  "input" === n && zt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
 }
 function b(e, t) {
  if (t in e) return t;
  for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = Qt.length; o--; ) if (t = Qt[o] + n, 
  t in e) return t;
  return i;
 }
 function y(e, t) {
  return e = t || e, "none" === rt.css(e, "display") || !rt.contains(e.ownerDocument, e);
 }
 function w(t) {
  return e.getComputedStyle(t, null);
 }
 function x(e, t) {
  for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i = e[s], i.style && (r[s] = mt.get(i, "olddisplay"), 
  n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && y(i) && (r[s] = mt.access(i, "olddisplay", T(i.nodeName)))) : r[s] || (o = y(i), 
  (n && "none" !== n || !o) && mt.set(i, "olddisplay", o ? n : rt.css(i, "display"))));
  for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
  return e;
 }
 function k(e, t, n) {
  var i = Gt.exec(t);
  return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
 }
 function C(e, t, n, i, o) {
  for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += rt.css(e, n + Zt[r], !0, o)), 
  i ? ("content" === n && (s -= rt.css(e, "padding" + Zt[r], !0, o)), "margin" !== n && (s -= rt.css(e, "border" + Zt[r] + "Width", !0, o))) : (s += rt.css(e, "padding" + Zt[r], !0, o), 
  "padding" !== n && (s += rt.css(e, "border" + Zt[r] + "Width", !0, o)));
  return s;
 }
 function S(e, t, n) {
  var i = !0, o = "width" === t ? e.offsetWidth : e.offsetHeight, r = w(e), s = rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, r);
  if (0 >= o || null == o) {
   if (o = qt(e, t, r), (0 > o || null == o) && (o = e.style[t]), Vt.test(o)) return o;
   i = s && (rt.support.boxSizingReliable || o === e.style[t]), o = parseFloat(o) || 0;
  }
  return o + C(e, t, n || (s ? "border" : "content"), i, r) + "px";
 }
 function T(e) {
  var t = U, n = Yt[e];
  return n || (n = E(e, t), "none" !== n && n || (Bt = (Bt || rt("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
  t = (Bt[0].contentWindow || Bt[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
  t.close(), n = E(e, t), Bt.detach()), Yt[e] = n), n;
 }
 function E(e, t) {
  var n = rt(t.createElement(e)).appendTo(t.body), i = rt.css(n[0], "display");
  return n.remove(), i;
 }
 function _(e, t, n, i) {
  var o;
  if (rt.isArray(t)) rt.each(t, function(t, o) {
   n || tn.test(e) ? i(e, o) : _(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i);
  }); else if (n || "object" !== rt.type(t)) i(e, t); else for (o in t) _(e + "[" + o + "]", t[o], n, i);
 }
 function I(e) {
  return function(t, n) {
   "string" != typeof t && (n = t, t = "*");
   var i, o = 0, r = t.toLowerCase().match(at) || [];
   if (rt.isFunction(n)) for (;i = r[o++]; ) "+" === i[0] ? (i = i.slice(1) || "*", 
   (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
  };
 }
 function P(e, t, n, i) {
  function o(a) {
   var l;
   return r[a] = !0, rt.each(e[a] || [], function(e, a) {
    var c = a(t, n, i);
    return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), 
    o(c), !1);
   }), l;
  }
  var r = {}, s = e === yn;
  return o(t.dataTypes[0]) || !r["*"] && o("*");
 }
 function $(e, n) {
  var i, o, r = rt.ajaxSettings.flatOptions || {};
  for (i in n) n[i] !== t && ((r[i] ? e : o || (o = {}))[i] = n[i]);
  return o && rt.extend(!0, e, o), e;
 }
 function N(e, n, i) {
  for (var o, r, s, a, l = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
  o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
  if (o) for (r in l) if (l[r] && l[r].test(o)) {
   c.unshift(r);
   break;
  }
  if (c[0] in i) s = c[0]; else {
   for (r in i) {
    if (!c[0] || e.converters[r + " " + c[0]]) {
     s = r;
     break;
    }
    a || (a = r);
   }
   s = s || a;
  }
  return s ? (s !== c[0] && c.unshift(s), i[s]) : void 0;
 }
 function L(e, t, n, i) {
  var o, r, s, a, l, c = {}, u = e.dataTypes.slice();
  if (u[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
  for (r = u.shift(); r; ) if (e.responseFields[r] && (n[e.responseFields[r]] = t), 
  !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
   if (s = c[l + " " + r] || c["* " + r], !s) for (o in c) if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
    s === !0 ? s = c[o] : c[o] !== !0 && (r = a[0], u.unshift(a[1]));
    break;
   }
   if (s !== !0) if (s && e["throws"]) t = s(t); else try {
    t = s(t);
   } catch (d) {
    return {
     state: "parsererror",
     error: s ? d : "No conversion from " + l + " to " + r
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
 function M(e, t, n) {
  for (var i, o = (Mn[t] || []).concat(Mn["*"]), r = 0, s = o.length; s > r; r++) if (i = o[r].call(n, t, e)) return i;
 }
 function A(e, t, n) {
  var i, o, r = 0, s = Rn.length, a = rt.Deferred().always(function() {
   delete l.elem;
  }), l = function() {
   if (o) return !1;
   for (var t = In || R(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
   return a.notifyWith(e, [ c, r, n ]), 1 > r && l ? n : (a.resolveWith(e, [ c ]), 
   !1);
  }, c = a.promise({
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
    var i = rt.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
    return c.tweens.push(i), i;
   },
   stop: function(t) {
    var n = 0, i = t ? c.tweens.length : 0;
    if (o) return this;
    for (o = !0; i > n; n++) c.tweens[n].run(1);
    return t ? a.resolveWith(e, [ c, t ]) : a.rejectWith(e, [ c, t ]), this;
   }
  }), u = c.props;
  for (z(u, c.opts.specialEasing); s > r; r++) if (i = Rn[r].call(c, e, u, c.opts)) return i;
  return rt.map(u, M, c), rt.isFunction(c.opts.start) && c.opts.start.call(e, c), 
  rt.fx.timer(rt.extend(l, {
   elem: e,
   anim: c,
   queue: c.opts.queue
  })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
 }
 function z(e, t) {
  var n, i, o, r, s;
  for (n in e) if (i = rt.camelCase(n), o = t[i], r = e[n], rt.isArray(r) && (o = r[1], 
  r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), s = rt.cssHooks[i], s && "expand" in s) {
   r = s.expand(r), delete e[i];
   for (n in r) n in e || (e[n] = r[n], t[n] = o);
  } else t[i] = o;
 }
 function D(e, n, i) {
  var o, r, s, a, l, c, u = this, d = {}, p = e.style, f = e.nodeType && y(e), h = mt.get(e, "fxshow");
  i.queue || (l = rt._queueHooks(e, "fx"), null == l.unqueued && (l.unqueued = 0, 
  c = l.empty.fire, l.empty.fire = function() {
   l.unqueued || c();
  }), l.unqueued++, u.always(function() {
   u.always(function() {
    l.unqueued--, rt.queue(e, "fx").length || l.empty.fire();
   });
  })), 1 === e.nodeType && ("height" in n || "width" in n) && (i.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
  "inline" === rt.css(e, "display") && "none" === rt.css(e, "float") && (p.display = "inline-block")), 
  i.overflow && (p.overflow = "hidden", u.always(function() {
   p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2];
  }));
  for (o in n) if (r = n[o], $n.exec(r)) {
   if (delete n[o], s = s || "toggle" === r, r === (f ? "hide" : "show")) {
    if ("show" !== r || !h || h[o] === t) continue;
    f = !0;
   }
   d[o] = h && h[o] || rt.style(e, o);
  }
  if (!rt.isEmptyObject(d)) {
   h ? "hidden" in h && (f = h.hidden) : h = mt.access(e, "fxshow", {}), s && (h.hidden = !f), 
   f ? rt(e).show() : u.done(function() {
    rt(e).hide();
   }), u.done(function() {
    var t;
    mt.remove(e, "fxshow");
    for (t in d) rt.style(e, t, d[t]);
   });
   for (o in d) a = M(f ? h[o] : 0, o, u), o in h || (h[o] = a.start, f && (a.end = a.start, 
   a.start = "width" === o || "height" === o ? 1 : 0));
  }
 }
 function O(e, t, n, i, o) {
  return new O.prototype.init(e, t, n, i, o);
 }
 function j(e, t) {
  var n, i = {
   height: e
  }, o = 0;
  for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Zt[o], i["margin" + n] = i["padding" + n] = e;
  return t && (i.opacity = i.width = e), i;
 }
 function H(e) {
  return rt.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
 }
 var F, q, B = typeof t, W = e.location, U = e.document, G = U.documentElement, V = e.jQuery, X = e.$, Y = {}, J = [], K = "2.0.3", Z = J.concat, Q = J.push, et = J.slice, tt = J.indexOf, nt = Y.toString, it = Y.hasOwnProperty, ot = K.trim, rt = function(e, t) {
  return new rt.fn.init(e, t, F);
 }, st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, at = /\S+/g, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ut = /^-ms-/, dt = /-([\da-z])/gi, pt = function(e, t) {
  return t.toUpperCase();
 }, ft = function() {
  U.removeEventListener("DOMContentLoaded", ft, !1), e.removeEventListener("load", ft, !1), 
  rt.ready();
 };
 rt.fn = rt.prototype = {
  jquery: K,
  constructor: rt,
  init: function(e, n, i) {
   var o, r;
   if (!e) return this;
   if ("string" == typeof e) {
    if (o = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : lt.exec(e), 
    !o || !o[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
    if (o[1]) {
     if (n = n instanceof rt ? n[0] : n, rt.merge(this, rt.parseHTML(o[1], n && n.nodeType ? n.ownerDocument || n : U, !0)), 
     ct.test(o[1]) && rt.isPlainObject(n)) for (o in n) rt.isFunction(this[o]) ? this[o](n[o]) : this.attr(o, n[o]);
     return this;
    }
    return r = U.getElementById(o[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
    this.context = U, this.selector = e, this;
   }
   return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : rt.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, 
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
  var e, n, i, o, r, s, a = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
  for ("boolean" == typeof a && (u = a, a = arguments[1] || {}, l = 2), "object" == typeof a || rt.isFunction(a) || (a = {}), 
  c === l && (a = this, --l); c > l; l++) if (null != (e = arguments[l])) for (n in e) i = a[n], 
  o = e[n], a !== o && (u && o && (rt.isPlainObject(o) || (r = rt.isArray(o))) ? (r ? (r = !1, 
  s = i && rt.isArray(i) ? i : []) : s = i && rt.isPlainObject(i) ? i : {}, a[n] = rt.extend(u, s, o)) : o !== t && (a[n] = o));
  return a;
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
   (e === !0 ? --rt.readyWait : rt.isReady) || (rt.isReady = !0, e !== !0 && --rt.readyWait > 0 || (q.resolveWith(U, [ rt ]), 
   rt.fn.trigger && rt(U).trigger("ready").off("ready")));
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
   return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Y[nt.call(e)] || "object" : typeof e;
  },
  isPlainObject: function(e) {
   if ("object" !== rt.type(e) || e.nodeType || rt.isWindow(e)) return !1;
   try {
    if (e.constructor && !it.call(e.constructor.prototype, "isPrototypeOf")) return !1;
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
   "boolean" == typeof t && (n = t, t = !1), t = t || U;
   var i = ct.exec(e), o = !n && [];
   return i ? [ t.createElement(i[1]) ] : (i = rt.buildFragment([ e ], t, o), o && rt(o).remove(), 
   rt.merge([], i.childNodes));
  },
  parseJSON: JSON.parse,
  parseXML: function(e) {
   var n, i;
   if (!e || "string" != typeof e) return null;
   try {
    i = new DOMParser(), n = i.parseFromString(e, "text/xml");
   } catch (o) {
    n = t;
   }
   return (!n || n.getElementsByTagName("parsererror").length) && rt.error("Invalid XML: " + e), 
   n;
  },
  noop: function() {},
  globalEval: function(e) {
   var t, n = eval;
   e = rt.trim(e), e && (1 === e.indexOf("use strict") ? (t = U.createElement("script"), 
   t.text = e, U.head.appendChild(t).parentNode.removeChild(t)) : n(e));
  },
  camelCase: function(e) {
   return e.replace(ut, "ms-").replace(dt, pt);
  },
  nodeName: function(e, t) {
   return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  },
  each: function(e, t, i) {
   var o, r = 0, s = e.length, a = n(e);
   if (i) {
    if (a) for (;s > r && (o = t.apply(e[r], i), o !== !1); r++) ; else for (r in e) if (o = t.apply(e[r], i), 
    o === !1) break;
   } else if (a) for (;s > r && (o = t.call(e[r], r, e[r]), o !== !1); r++) ; else for (r in e) if (o = t.call(e[r], r, e[r]), 
   o === !1) break;
   return e;
  },
  trim: function(e) {
   return null == e ? "" : ot.call(e);
  },
  makeArray: function(e, t) {
   var i = t || [];
   return null != e && (n(Object(e)) ? rt.merge(i, "string" == typeof e ? [ e ] : e) : Q.call(i, e)), 
   i;
  },
  inArray: function(e, t, n) {
   return null == t ? -1 : tt.call(t, e, n);
  },
  merge: function(e, n) {
   var i = n.length, o = e.length, r = 0;
   if ("number" == typeof i) for (;i > r; r++) e[o++] = n[r]; else for (;n[r] !== t; ) e[o++] = n[r++];
   return e.length = o, e;
  },
  grep: function(e, t, n) {
   var i, o = [], r = 0, s = e.length;
   for (n = !!n; s > r; r++) i = !!t(e[r], r), n !== i && o.push(e[r]);
   return o;
  },
  map: function(e, t, i) {
   var o, r = 0, s = e.length, a = n(e), l = [];
   if (a) for (;s > r; r++) o = t(e[r], r, i), null != o && (l[l.length] = o); else for (r in e) o = t(e[r], r, i), 
   null != o && (l[l.length] = o);
   return Z.apply([], l);
  },
  guid: 1,
  proxy: function(e, n) {
   var i, o, r;
   return "string" == typeof n && (i = e[n], n = e, e = i), rt.isFunction(e) ? (o = et.call(arguments, 2), 
   r = function() {
    return e.apply(n || this, o.concat(et.call(arguments)));
   }, r.guid = e.guid = e.guid || rt.guid++, r) : t;
  },
  access: function(e, n, i, o, r, s, a) {
   var l = 0, c = e.length, u = null == i;
   if ("object" === rt.type(i)) {
    r = !0;
    for (l in i) rt.access(e, n, l, i[l], !0, s, a);
   } else if (o !== t && (r = !0, rt.isFunction(o) || (a = !0), u && (a ? (n.call(e, o), 
   n = null) : (u = n, n = function(e, t, n) {
    return u.call(rt(e), n);
   })), n)) for (;c > l; l++) n(e[l], i, a ? o : o.call(e[l], l, n(e[l], i)));
   return r ? e : u ? n.call(e) : c ? n(e[0], i) : s;
  },
  now: Date.now,
  swap: function(e, t, n, i) {
   var o, r, s = {};
   for (r in t) s[r] = e.style[r], e.style[r] = t[r];
   o = n.apply(e, i || []);
   for (r in t) e.style[r] = s[r];
   return o;
  }
 }), rt.ready.promise = function(t) {
  return q || (q = rt.Deferred(), "complete" === U.readyState ? setTimeout(rt.ready) : (U.addEventListener("DOMContentLoaded", ft, !1), 
  e.addEventListener("load", ft, !1))), q.promise(t);
 }, rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
  Y["[object " + t + "]"] = t.toLowerCase();
 }), F = rt(U), function(e, t) {
  function n(e, t, n, i) {
   var o, r, s, a, l, c, u, d, h, g;
   if ((t ? t.ownerDocument || t : H) !== L && N(t), t = t || L, n = n || [], !e || "string" != typeof e) return n;
   if (1 !== (a = t.nodeType) && 9 !== a) return [];
   if (M && !i) {
    if (o = yt.exec(e)) if (s = o[1]) {
     if (9 === a) {
      if (r = t.getElementById(s), !r || !r.parentNode) return n;
      if (r.id === s) return n.push(r), n;
     } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && O(t, r) && r.id === s) return n.push(r), 
     n;
    } else {
     if (o[2]) return et.apply(n, t.getElementsByTagName(e)), n;
     if ((s = o[3]) && C.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(s)), 
     n;
    }
    if (C.qsa && (!A || !A.test(e))) {
     if (d = u = j, h = t, g = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
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
   return x(e.replace(ut, "$1"), t, n, i);
  }
  function i() {
   function e(n, i) {
    return t.push(n += " ") > T.cacheLength && delete e[t.shift()], e[n] = i;
   }
   var t = [];
   return e;
  }
  function o(e) {
   return e[j] = !0, e;
  }
  function r(e) {
   var t = L.createElement("div");
   try {
    return !!e(t);
   } catch (n) {
    return !1;
   } finally {
    t.parentNode && t.parentNode.removeChild(t), t = null;
   }
  }
  function s(e, t) {
   for (var n = e.split("|"), i = e.length; i--; ) T.attrHandle[n[i]] = t;
  }
  function a(e, t) {
   var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
   if (i) return i;
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
   return o(function(t) {
    return t = +t, o(function(n, i) {
     for (var o, r = e([], n.length, t), s = r.length; s--; ) n[o = r[s]] && (n[o] = !(i[o] = n[o]));
    });
   });
  }
  function d() {}
  function p(e, t) {
   var i, o, r, s, a, l, c, u = W[e + " "];
   if (u) return t ? 0 : u.slice(0);
   for (a = e, l = [], c = T.preFilter; a; ) {
    (!i || (o = dt.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(r = [])), 
    i = !1, (o = pt.exec(a)) && (i = o.shift(), r.push({
     value: i,
     type: o[0].replace(ut, " ")
    }), a = a.slice(i.length));
    for (s in T.filter) !(o = vt[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), 
    r.push({
     value: i,
     type: s,
     matches: o
    }), a = a.slice(i.length));
    if (!i) break;
   }
   return t ? a.length : a ? n.error(e) : W(e, l).slice(0);
  }
  function f(e) {
   for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
   return i;
  }
  function h(e, t, n) {
   var i = t.dir, o = n && "parentNode" === i, r = q++;
   return t.first ? function(t, n, r) {
    for (;t = t[i]; ) if (1 === t.nodeType || o) return e(t, n, r);
   } : function(t, n, s) {
    var a, l, c, u = F + " " + r;
    if (s) {
     for (;t = t[i]; ) if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
    } else for (;t = t[i]; ) if (1 === t.nodeType || o) if (c = t[j] || (t[j] = {}), 
    (l = c[i]) && l[0] === u) {
     if ((a = l[1]) === !0 || a === S) return a === !0;
    } else if (l = c[i] = [ u ], l[1] = e(t, n, s) || S, l[1] === !0) return !0;
   };
  }
  function g(e) {
   return e.length > 1 ? function(t, n, i) {
    for (var o = e.length; o--; ) if (!e[o](t, n, i)) return !1;
    return !0;
   } : e[0];
  }
  function m(e, t, n, i, o) {
   for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++) (r = e[a]) && (!n || n(r, i, o)) && (s.push(r), 
   c && t.push(a));
   return s;
  }
  function v(e, t, n, i, r, s) {
   return i && !i[j] && (i = v(i)), r && !r[j] && (r = v(r, s)), o(function(o, s, a, l) {
    var c, u, d, p = [], f = [], h = s.length, g = o || w(t || "*", a.nodeType ? [ a ] : a, []), v = !e || !o && t ? g : m(g, p, e, a, l), b = n ? r || (o ? e : h || i) ? [] : s : v;
    if (n && n(v, b, a, l), i) for (c = m(b, f), i(c, [], a, l), u = c.length; u--; ) (d = c[u]) && (b[f[u]] = !(v[f[u]] = d));
    if (o) {
     if (r || e) {
      if (r) {
       for (c = [], u = b.length; u--; ) (d = b[u]) && c.push(v[u] = d);
       r(null, b = [], c, l);
      }
      for (u = b.length; u--; ) (d = b[u]) && (c = r ? nt.call(o, d) : p[u]) > -1 && (o[c] = !(s[c] = d));
     }
    } else b = m(b === s ? b.splice(h, b.length) : b), r ? r(null, s, b, l) : et.apply(s, b);
   });
  }
  function b(e) {
   for (var t, n, i, o = e.length, r = T.relative[e[0].type], s = r || T.relative[" "], a = r ? 1 : 0, l = h(function(e) {
    return e === t;
   }, s, !0), c = h(function(e) {
    return nt.call(t, e) > -1;
   }, s, !0), u = [ function(e, n, i) {
    return !r && (i || n !== P) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
   } ]; o > a; a++) if (n = T.relative[e[a].type]) u = [ h(g(u), n) ]; else {
    if (n = T.filter[e[a].type].apply(null, e[a].matches), n[j]) {
     for (i = ++a; o > i && !T.relative[e[i].type]; i++) ;
     return v(a > 1 && g(u), a > 1 && f(e.slice(0, a - 1).concat({
      value: " " === e[a - 2].type ? "*" : ""
     })).replace(ut, "$1"), n, i > a && b(e.slice(a, i)), o > i && b(e = e.slice(i)), o > i && f(e));
    }
    u.push(n);
   }
   return g(u);
  }
  function y(e, t) {
   var i = 0, r = t.length > 0, s = e.length > 0, a = function(o, a, l, c, u) {
    var d, p, f, h = [], g = 0, v = "0", b = o && [], y = null != u, w = P, x = o || s && T.find.TAG("*", u && a.parentNode || a), k = F += null == w ? 1 : Math.random() || .1;
    for (y && (P = a !== L && a, S = i); null != (d = x[v]); v++) {
     if (s && d) {
      for (p = 0; f = e[p++]; ) if (f(d, a, l)) {
       c.push(d);
       break;
      }
      y && (F = k, S = ++i);
     }
     r && ((d = !f && d) && g--, o && b.push(d));
    }
    if (g += v, r && v !== g) {
     for (p = 0; f = t[p++]; ) f(b, h, a, l);
     if (o) {
      if (g > 0) for (;v--; ) b[v] || h[v] || (h[v] = Z.call(c));
      h = m(h);
     }
     et.apply(c, h), y && !o && h.length > 0 && g + t.length > 1 && n.uniqueSort(c);
    }
    return y && (F = k, P = w), b;
   };
   return r ? o(a) : a;
  }
  function w(e, t, i) {
   for (var o = 0, r = t.length; r > o; o++) n(e, t[o], i);
   return i;
  }
  function x(e, t, n, i) {
   var o, r, s, a, l, c = p(e);
   if (!i && 1 === c.length) {
    if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && C.getById && 9 === t.nodeType && M && T.relative[r[1].type]) {
     if (t = (T.find.ID(s.matches[0].replace(Ct, St), t) || [])[0], !t) return n;
     e = e.slice(r.shift().value.length);
    }
    for (o = vt.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !T.relative[a = s.type]); ) if ((l = T.find[a]) && (i = l(s.matches[0].replace(Ct, St), ft.test(r[0].type) && t.parentNode || t))) {
     if (r.splice(o, 1), e = i.length && f(r), !e) return et.apply(n, i), n;
     break;
    }
   }
   return I(e, c)(i, t, !M, n, ft.test(e)), n;
  }
  var k, C, S, T, E, _, I, P, $, N, L, R, M, A, z, D, O, j = "sizzle" + -new Date(), H = e.document, F = 0, q = 0, B = i(), W = i(), U = i(), G = !1, V = function(e, t) {
   return e === t ? (G = !0, 0) : 0;
  }, X = typeof t, Y = 1 << 31, J = {}.hasOwnProperty, K = [], Z = K.pop, Q = K.push, et = K.push, tt = K.slice, nt = K.indexOf || function(e) {
   for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
   return -1;
  }, it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ot = "[\\x20\\t\\r\\n\\f]", st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", at = st.replace("w", "w#"), lt = "\\[" + ot + "*(" + st + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + ot + "*\\]", ct = ":(" + st + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + lt.replace(3, 8) + ")*)|.*)\\)|)", ut = new RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"), dt = new RegExp("^" + ot + "*," + ot + "*"), pt = new RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"), ft = new RegExp(ot + "*[+~]"), ht = new RegExp("=" + ot + "*([^\\]'\"]*)" + ot + "*\\]", "g"), gt = new RegExp(ct), mt = new RegExp("^" + at + "$"), vt = {
   ID: new RegExp("^#(" + st + ")"),
   CLASS: new RegExp("^\\.(" + st + ")"),
   TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
   ATTR: new RegExp("^" + lt),
   PSEUDO: new RegExp("^" + ct),
   CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
   bool: new RegExp("^(?:" + it + ")$", "i"),
   needsContext: new RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
  }, bt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, wt = /^(?:input|select|textarea|button)$/i, xt = /^h\d$/i, kt = /'|\\/g, Ct = new RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"), St = function(e, t, n) {
   var i = "0x" + t - 65536;
   return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i);
  };
  try {
   et.apply(K = tt.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType;
  } catch (Tt) {
   et = {
    apply: K.length ? function(e, t) {
     Q.apply(e, tt.call(t));
    } : function(e, t) {
     for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
     e.length = n - 1;
    }
   };
  }
  _ = n.isXML = function(e) {
   var t = e && (e.ownerDocument || e).documentElement;
   return t ? "HTML" !== t.nodeName : !1;
  }, C = n.support = {}, N = n.setDocument = function(e) {
   var t = e ? e.ownerDocument || e : H, n = t.defaultView;
   return t !== L && 9 === t.nodeType && t.documentElement ? (L = t, R = t.documentElement, 
   M = !_(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
    N();
   }), C.attributes = r(function(e) {
    return e.className = "i", !e.getAttribute("className");
   }), C.getElementsByTagName = r(function(e) {
    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
   }), C.getElementsByClassName = r(function(e) {
    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
    2 === e.getElementsByClassName("i").length;
   }), C.getById = r(function(e) {
    return R.appendChild(e).id = j, !t.getElementsByName || !t.getElementsByName(j).length;
   }), C.getById ? (T.find.ID = function(e, t) {
    if (typeof t.getElementById !== X && M) {
     var n = t.getElementById(e);
     return n && n.parentNode ? [ n ] : [];
    }
   }, T.filter.ID = function(e) {
    var t = e.replace(Ct, St);
    return function(e) {
     return e.getAttribute("id") === t;
    };
   }) : (delete T.find.ID, T.filter.ID = function(e) {
    var t = e.replace(Ct, St);
    return function(e) {
     var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
     return n && n.value === t;
    };
   }), T.find.TAG = C.getElementsByTagName ? function(e, t) {
    return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0;
   } : function(e, t) {
    var n, i = [], o = 0, r = t.getElementsByTagName(e);
    if ("*" === e) {
     for (;n = r[o++]; ) 1 === n.nodeType && i.push(n);
     return i;
    }
    return r;
   }, T.find.CLASS = C.getElementsByClassName && function(e, t) {
    return typeof t.getElementsByClassName !== X && M ? t.getElementsByClassName(e) : void 0;
   }, z = [], A = [], (C.qsa = bt.test(t.querySelectorAll)) && (r(function(e) {
    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || A.push("\\[" + ot + "*(?:value|" + it + ")"), 
    e.querySelectorAll(":checked").length || A.push(":checked");
   }), r(function(e) {
    var n = t.createElement("input");
    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && A.push("[*^$]=" + ot + "*(?:''|\"\")"), 
    e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
    A.push(",.*:");
   })), (C.matchesSelector = bt.test(D = R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(e) {
    C.disconnectedMatch = D.call(e, "div"), D.call(e, "[s!='']:x"), z.push("!=", ct);
   }), A = A.length && new RegExp(A.join("|")), z = z.length && new RegExp(z.join("|")), 
   O = bt.test(R.contains) || R.compareDocumentPosition ? function(e, t) {
    var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
   } : function(e, t) {
    if (t) for (;t = t.parentNode; ) if (t === e) return !0;
    return !1;
   }, V = R.compareDocumentPosition ? function(e, n) {
    if (e === n) return G = !0, 0;
    var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
    return i ? 1 & i || !C.sortDetached && n.compareDocumentPosition(e) === i ? e === t || O(H, e) ? -1 : n === t || O(H, n) ? 1 : $ ? nt.call($, e) - nt.call($, n) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
   } : function(e, n) {
    var i, o = 0, r = e.parentNode, s = n.parentNode, l = [ e ], c = [ n ];
    if (e === n) return G = !0, 0;
    if (!r || !s) return e === t ? -1 : n === t ? 1 : r ? -1 : s ? 1 : $ ? nt.call($, e) - nt.call($, n) : 0;
    if (r === s) return a(e, n);
    for (i = e; i = i.parentNode; ) l.unshift(i);
    for (i = n; i = i.parentNode; ) c.unshift(i);
    for (;l[o] === c[o]; ) o++;
    return o ? a(l[o], c[o]) : l[o] === H ? -1 : c[o] === H ? 1 : 0;
   }, t) : L;
  }, n.matches = function(e, t) {
   return n(e, null, null, t);
  }, n.matchesSelector = function(e, t) {
   if ((e.ownerDocument || e) !== L && N(e), t = t.replace(ht, "='$1']"), !(!C.matchesSelector || !M || z && z.test(t) || A && A.test(t))) try {
    var i = D.call(e, t);
    if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
   } catch (o) {}
   return n(t, L, null, [ e ]).length > 0;
  }, n.contains = function(e, t) {
   return (e.ownerDocument || e) !== L && N(e), O(e, t);
  }, n.attr = function(e, n) {
   (e.ownerDocument || e) !== L && N(e);
   var i = T.attrHandle[n.toLowerCase()], o = i && J.call(T.attrHandle, n.toLowerCase()) ? i(e, n, !M) : t;
   return o === t ? C.attributes || !M ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o;
  }, n.error = function(e) {
   throw new Error("Syntax error, unrecognized expression: " + e);
  }, n.uniqueSort = function(e) {
   var t, n = [], i = 0, o = 0;
   if (G = !C.detectDuplicates, $ = !C.sortStable && e.slice(0), e.sort(V), G) {
    for (;t = e[o++]; ) t === e[o] && (i = n.push(o));
    for (;i--; ) e.splice(n[i], 1);
   }
   return e;
  }, E = n.getText = function(e) {
   var t, n = "", i = 0, o = e.nodeType;
   if (o) {
    if (1 === o || 9 === o || 11 === o) {
     if ("string" == typeof e.textContent) return e.textContent;
     for (e = e.firstChild; e; e = e.nextSibling) n += E(e);
    } else if (3 === o || 4 === o) return e.nodeValue;
   } else for (;t = e[i]; i++) n += E(t);
   return n;
  }, T = n.selectors = {
   cacheLength: 50,
   createPseudo: o,
   match: vt,
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
     return e[1] = e[1].replace(Ct, St), e[3] = (e[4] || e[5] || "").replace(Ct, St), 
     "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
    },
    CHILD: function(e) {
     return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), 
     e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), 
     e;
    },
    PSEUDO: function(e) {
     var n, i = !e[5] && e[2];
     return vt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && gt.test(i) && (n = p(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), 
     e[2] = i.slice(0, n)), e.slice(0, 3));
    }
   },
   filter: {
    TAG: function(e) {
     var t = e.replace(Ct, St).toLowerCase();
     return "*" === e ? function() {
      return !0;
     } : function(e) {
      return e.nodeName && e.nodeName.toLowerCase() === t;
     };
    },
    CLASS: function(e) {
     var t = B[e + " "];
     return t || (t = new RegExp("(^|" + ot + ")" + e + "(" + ot + "|$)")) && B(e, function(e) {
      return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "");
     });
    },
    ATTR: function(e, t, i) {
     return function(o) {
      var r = n.attr(o, e);
      return null == r ? "!=" === t : t ? (r += "", "=" === t ? r === i : "!=" === t ? r !== i : "^=" === t ? i && 0 === r.indexOf(i) : "*=" === t ? i && r.indexOf(i) > -1 : "$=" === t ? i && r.slice(-i.length) === i : "~=" === t ? (" " + r + " ").indexOf(i) > -1 : "|=" === t ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0;
     };
    },
    CHILD: function(e, t, n, i, o) {
     var r = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
     return 1 === i && 0 === o ? function(e) {
      return !!e.parentNode;
     } : function(t, n, l) {
      var c, u, d, p, f, h, g = r !== s ? "nextSibling" : "previousSibling", m = t.parentNode, v = a && t.nodeName.toLowerCase(), b = !l && !a;
      if (m) {
       if (r) {
        for (;g; ) {
         for (d = t; d = d[g]; ) if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
         h = g = "only" === e && !h && "nextSibling";
        }
        return !0;
       }
       if (h = [ s ? m.firstChild : m.lastChild ], s && b) {
        for (u = m[j] || (m[j] = {}), c = u[e] || [], f = c[0] === F && c[1], p = c[0] === F && c[2], 
        d = f && m.childNodes[f]; d = ++f && d && d[g] || (p = f = 0) || h.pop(); ) if (1 === d.nodeType && ++p && d === t) {
         u[e] = [ F, f, p ];
         break;
        }
       } else if (b && (c = (t[j] || (t[j] = {}))[e]) && c[0] === F) p = c[1]; else for (;(d = ++f && d && d[g] || (p = f = 0) || h.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++p || (b && ((d[j] || (d[j] = {}))[e] = [ F, p ]), 
       d !== t)); ) ;
       return p -= o, p === i || 0 === p % i && p / i >= 0;
      }
     };
    },
    PSEUDO: function(e, t) {
     var i, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
     return r[j] ? r(t) : r.length > 1 ? (i = [ e, e, "", t ], T.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, n) {
      for (var i, o = r(e, t), s = o.length; s--; ) i = nt.call(e, o[s]), e[i] = !(n[i] = o[s]);
     }) : function(e) {
      return r(e, 0, i);
     }) : r;
    }
   },
   pseudos: {
    not: o(function(e) {
     var t = [], n = [], i = I(e.replace(ut, "$1"));
     return i[j] ? o(function(e, t, n, o) {
      for (var r, s = i(e, null, o, []), a = e.length; a--; ) (r = s[a]) && (e[a] = !(t[a] = r));
     }) : function(e, o, r) {
      return t[0] = e, i(t, null, r, n), !n.pop();
     };
    }),
    has: o(function(e) {
     return function(t) {
      return n(e, t).length > 0;
     };
    }),
    contains: o(function(e) {
     return function(t) {
      return (t.textContent || t.innerText || E(t)).indexOf(e) > -1;
     };
    }),
    lang: o(function(e) {
     return mt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Ct, St).toLowerCase(), 
     function(t) {
      var n;
      do if (n = M ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
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
     return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
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
     return !T.pseudos.empty(e);
    },
    header: function(e) {
     return xt.test(e.nodeName);
    },
    input: function(e) {
     return wt.test(e.nodeName);
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
     for (var i = 0 > n ? n + t : n; --i >= 0; ) e.push(i);
     return e;
    }),
    gt: u(function(e, t, n) {
     for (var i = 0 > n ? n + t : n; ++i < t; ) e.push(i);
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
  d.prototype = T.filters = T.pseudos, T.setFilters = new d(), I = n.compile = function(e, t) {
   var n, i = [], o = [], r = U[e + " "];
   if (!r) {
    for (t || (t = p(e)), n = t.length; n--; ) r = b(t[n]), r[j] ? i.push(r) : o.push(r);
    r = U(e, y(o, i));
   }
   return r;
  }, C.sortStable = j.split("").sort(V).join("") === j, C.detectDuplicates = G, N(), 
  C.sortDetached = r(function(e) {
   return 1 & e.compareDocumentPosition(L.createElement("div"));
  }), r(function(e) {
   return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
  }) || s("type|href|height|width", function(e, t, n) {
   return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
  }), C.attributes && r(function(e) {
   return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
  }) || s("value", function(e, t, n) {
   return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
  }), r(function(e) {
   return null == e.getAttribute("disabled");
  }) || s(it, function(e, t, n) {
   var i;
   return n ? void 0 : (i = e.getAttributeNode(t)) && i.specified ? i.value : e[t] === !0 ? t.toLowerCase() : null;
  }), rt.find = n, rt.expr = n.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = n.uniqueSort, 
  rt.text = n.getText, rt.isXMLDoc = n.isXML, rt.contains = n.contains;
 }(e);
 var ht = {};
 rt.Callbacks = function(e) {
  e = "string" == typeof e ? ht[e] || i(e) : rt.extend({}, e);
  var n, o, r, s, a, l, c = [], u = !e.once && [], d = function(t) {
   for (n = e.memory && t, o = !0, l = s || 0, s = 0, a = c.length, r = !0; c && a > l; l++) if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
    n = !1;
    break;
   }
   r = !1, c && (u ? u.length && d(u.shift()) : n ? c = [] : p.disable());
  }, p = {
   add: function() {
    if (c) {
     var t = c.length;
     (function i(t) {
      rt.each(t, function(t, n) {
       var o = rt.type(n);
       "function" === o ? e.unique && p.has(n) || c.push(n) : n && n.length && "string" !== o && i(n);
      });
     })(arguments), r ? a = c.length : n && (s = t, d(n));
    }
    return this;
   },
   remove: function() {
    return c && rt.each(arguments, function(e, t) {
     for (var n; (n = rt.inArray(t, c, n)) > -1; ) c.splice(n, 1), r && (a >= n && a--, 
     l >= n && l--);
    }), this;
   },
   has: function(e) {
    return e ? rt.inArray(e, c) > -1 : !(!c || !c.length);
   },
   empty: function() {
    return c = [], a = 0, this;
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
    return !c || o && !u || (t = t || [], t = [ e, t.slice ? t.slice() : t ], r ? u.push(t) : d(t)), 
    this;
   },
   fire: function() {
    return p.fireWith(this, arguments), this;
   },
   fired: function() {
    return !!o;
   }
  };
  return p;
 }, rt.extend({
  Deferred: function(e) {
   var t = [ [ "resolve", "done", rt.Callbacks("once memory"), "resolved" ], [ "reject", "fail", rt.Callbacks("once memory"), "rejected" ], [ "notify", "progress", rt.Callbacks("memory") ] ], n = "pending", i = {
    state: function() {
     return n;
    },
    always: function() {
     return o.done(arguments).fail(arguments), this;
    },
    then: function() {
     var e = arguments;
     return rt.Deferred(function(n) {
      rt.each(t, function(t, r) {
       var s = r[0], a = rt.isFunction(e[t]) && e[t];
       o[r[1]](function() {
        var e = a && a.apply(this, arguments);
        e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n.promise() : this, a ? [ e ] : arguments);
       });
      }), e = null;
     }).promise();
    },
    promise: function(e) {
     return null != e ? rt.extend(e, i) : i;
    }
   }, o = {};
   return i.pipe = i.then, rt.each(t, function(e, r) {
    var s = r[2], a = r[3];
    i[r[1]] = s.add, a && s.add(function() {
     n = a;
    }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
     return o[r[0] + "With"](this === o ? i : this, arguments), this;
    }, o[r[0] + "With"] = s.fireWith;
   }), i.promise(o), e && e.call(o, o), o;
  },
  when: function(e) {
   var t, n, i, o = 0, r = et.call(arguments), s = r.length, a = 1 !== s || e && rt.isFunction(e.promise) ? s : 0, l = 1 === a ? e : rt.Deferred(), c = function(e, n, i) {
    return function(o) {
     n[e] = this, i[e] = arguments.length > 1 ? et.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i);
    };
   };
   if (s > 1) for (t = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && rt.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --a;
   return a || l.resolveWith(i, r), l.promise();
  }
 }), rt.support = function(t) {
  var n = U.createElement("input"), i = U.createDocumentFragment(), o = U.createElement("div"), r = U.createElement("select"), s = r.appendChild(U.createElement("option"));
  return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = s.selected, 
  t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, 
  t.noCloneChecked = n.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !s.disabled, 
  n = U.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, 
  n.setAttribute("checked", "t"), n.setAttribute("name", "t"), i.appendChild(n), t.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, 
  t.focusinBubbles = "onfocusin" in e, o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", 
  t.clearCloneStyle = "content-box" === o.style.backgroundClip, rt(function() {
   var n, i, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", s = U.getElementsByTagName("body")[0];
   s && (n = U.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
   s.appendChild(n).appendChild(o), o.innerHTML = "", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
   rt.swap(s, null != s.style.zoom ? {
    zoom: 1
   } : {}, function() {
    t.boxSizing = 4 === o.offsetWidth;
   }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(o, null) || {}).top, 
   t.boxSizingReliable = "4px" === (e.getComputedStyle(o, null) || {
    width: "4px"
   }).width, i = o.appendChild(U.createElement("div")), i.style.cssText = o.style.cssText = r, 
   i.style.marginRight = i.style.width = "0", o.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), 
   s.removeChild(n));
  }), t) : t;
 }({});
 var gt, mt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, bt = /([A-Z])/g;
 o.uid = 1, o.accepts = function(e) {
  return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0;
 }, o.prototype = {
  key: function(e) {
   if (!o.accepts(e)) return 0;
   var t = {}, n = e[this.expando];
   if (!n) {
    n = o.uid++;
    try {
     t[this.expando] = {
      value: n
     }, Object.defineProperties(e, t);
    } catch (i) {
     t[this.expando] = n, rt.extend(e, t);
    }
   }
   return this.cache[n] || (this.cache[n] = {}), n;
  },
  set: function(e, t, n) {
   var i, o = this.key(e), r = this.cache[o];
   if ("string" == typeof t) r[t] = n; else if (rt.isEmptyObject(r)) rt.extend(this.cache[o], t); else for (i in t) r[i] = t[i];
   return r;
  },
  get: function(e, n) {
   var i = this.cache[this.key(e)];
   return n === t ? i : i[n];
  },
  access: function(e, n, i) {
   var o;
   return n === t || n && "string" == typeof n && i === t ? (o = this.get(e, n), o !== t ? o : this.get(e, rt.camelCase(n))) : (this.set(e, n, i), 
   i !== t ? i : n);
  },
  remove: function(e, n) {
   var i, o, r, s = this.key(e), a = this.cache[s];
   if (n === t) this.cache[s] = {}; else {
    rt.isArray(n) ? o = n.concat(n.map(rt.camelCase)) : (r = rt.camelCase(n), n in a ? o = [ n, r ] : (o = r, 
    o = o in a ? [ o ] : o.match(at) || [])), i = o.length;
    for (;i--; ) delete a[o[i]];
   }
  },
  hasData: function(e) {
   return !rt.isEmptyObject(this.cache[e[this.expando]] || {});
  },
  discard: function(e) {
   e[this.expando] && delete this.cache[e[this.expando]];
  }
 }, gt = new o(), mt = new o(), rt.extend({
  acceptData: o.accepts,
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
   var i, o, s = this[0], a = 0, l = null;
   if (e === t) {
    if (this.length && (l = gt.get(s), 1 === s.nodeType && !mt.get(s, "hasDataAttrs"))) {
     for (i = s.attributes; a < i.length; a++) o = i[a].name, 0 === o.indexOf("data-") && (o = rt.camelCase(o.slice(5)), 
     r(s, o, l[o]));
     mt.set(s, "hasDataAttrs", !0);
    }
    return l;
   }
   return "object" == typeof e ? this.each(function() {
    gt.set(this, e);
   }) : rt.access(this, function(n) {
    var i, o = rt.camelCase(e);
    if (s && n === t) {
     if (i = gt.get(s, e), i !== t) return i;
     if (i = gt.get(s, o), i !== t) return i;
     if (i = r(s, o, t), i !== t) return i;
    } else this.each(function() {
     var i = gt.get(this, o);
     gt.set(this, o, n), -1 !== e.indexOf("-") && i !== t && gt.set(this, e, n);
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
   var i;
   return e ? (t = (t || "fx") + "queue", i = mt.get(e, t), n && (!i || rt.isArray(n) ? i = mt.access(e, t, rt.makeArray(n)) : i.push(n)), 
   i || []) : void 0;
  },
  dequeue: function(e, t) {
   t = t || "fx";
   var n = rt.queue(e, t), i = n.length, o = n.shift(), r = rt._queueHooks(e, t), s = function() {
    rt.dequeue(e, t);
   };
   "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), 
   delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire();
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
   var i = 2;
   return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? rt.queue(this[0], e) : n === t ? this : this.each(function() {
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
    var i = setTimeout(t, e);
    n.stop = function() {
     clearTimeout(i);
    };
   });
  },
  clearQueue: function(e) {
   return this.queue(e || "fx", []);
  },
  promise: function(e, n) {
   var i, o = 1, r = rt.Deferred(), s = this, a = this.length, l = function() {
    --o || r.resolveWith(s, [ s ]);
   };
   for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--; ) i = mt.get(s[a], e + "queueHooks"), 
   i && i.empty && (o++, i.empty.add(l));
   return l(), r.promise(n);
  }
 });
 var yt, wt, xt = /[\t\r\n\f]/g, kt = /\r/g, Ct = /^(?:input|select|textarea|button)$/i;
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
   var t, n, i, o, r, s = 0, a = this.length, l = "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).addClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(at) || []; a > s; s++) if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : " ")) {
    for (r = 0; o = t[r++]; ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
    n.className = rt.trim(i);
   }
   return this;
  },
  removeClass: function(e) {
   var t, n, i, o, r, s = 0, a = this.length, l = 0 === arguments.length || "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).removeClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(at) || []; a > s; s++) if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : "")) {
    for (r = 0; o = t[r++]; ) for (;i.indexOf(" " + o + " ") >= 0; ) i = i.replace(" " + o + " ", " ");
    n.className = e ? rt.trim(i) : "";
   }
   return this;
  },
  toggleClass: function(e, t) {
   var n = typeof e;
   return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : rt.isFunction(e) ? this.each(function(n) {
    rt(this).toggleClass(e.call(this, n, this.className, t), t);
   }) : this.each(function() {
    if ("string" === n) for (var t, i = 0, o = rt(this), r = e.match(at) || []; t = r[i++]; ) o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else (n === B || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), 
    this.className = this.className || e === !1 ? "" : mt.get(this, "__className__") || "");
   });
  },
  hasClass: function(e) {
   for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xt, " ").indexOf(t) >= 0) return !0;
   return !1;
  },
  val: function(e) {
   var n, i, o, r = this[0];
   {
    if (arguments.length) return o = rt.isFunction(e), this.each(function(i) {
     var r;
     1 === this.nodeType && (r = o ? e.call(this, i, rt(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : rt.isArray(r) && (r = rt.map(r, function(e) {
      return null == e ? "" : e + "";
     })), n = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, r, "value") !== t || (this.value = r));
    });
    if (r) return n = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()], 
    n && "get" in n && (i = n.get(r, "value")) !== t ? i : (i = r.value, "string" == typeof i ? i.replace(kt, "") : null == i ? "" : i);
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
     for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++) if (n = i[l], 
     !(!n.selected && l !== o || (rt.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
      if (t = rt(n).val(), r) return t;
      s.push(t);
     }
     return s;
    },
    set: function(e, t) {
     for (var n, i, o = e.options, r = rt.makeArray(t), s = o.length; s--; ) i = o[s], 
     (i.selected = rt.inArray(rt(i).val(), r) >= 0) && (n = !0);
     return n || (e.selectedIndex = -1), r;
    }
   }
  },
  attr: function(e, n, i) {
   var o, r, s = e.nodeType;
   if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === B ? rt.prop(e, n, i) : (1 === s && rt.isXMLDoc(e) || (n = n.toLowerCase(), 
   o = rt.attrHooks[n] || (rt.expr.match.bool.test(n) ? wt : yt)), i === t ? o && "get" in o && null !== (r = o.get(e, n)) ? r : (r = rt.find.attr(e, n), 
   null == r ? t : r) : null !== i ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : (e.setAttribute(n, i + ""), 
   i) : (rt.removeAttr(e, n), void 0));
  },
  removeAttr: function(e, t) {
   var n, i, o = 0, r = t && t.match(at);
   if (r && 1 === e.nodeType) for (;n = r[o++]; ) i = rt.propFix[n] || n, rt.expr.match.bool.test(n) && (e[i] = !1), 
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
  prop: function(e, n, i) {
   var o, r, s, a = e.nodeType;
   if (e && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !rt.isXMLDoc(e), s && (n = rt.propFix[n] || n, 
   r = rt.propHooks[n]), i !== t ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o : e[n] = i : r && "get" in r && null !== (o = r.get(e, n)) ? o : e[n];
  },
  propHooks: {
   tabIndex: {
    get: function(e) {
     return e.hasAttribute("tabindex") || Ct.test(e.nodeName) || e.href ? e.tabIndex : -1;
    }
   }
  }
 }), wt = {
  set: function(e, t, n) {
   return t === !1 ? rt.removeAttr(e, n) : e.setAttribute(n, n), n;
  }
 }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(e, n) {
  var i = rt.expr.attrHandle[n] || rt.find.attr;
  rt.expr.attrHandle[n] = function(e, n, o) {
   var r = rt.expr.attrHandle[n], s = o ? t : (rt.expr.attrHandle[n] = t) != i(e, n, o) ? n.toLowerCase() : null;
   return rt.expr.attrHandle[n] = r, s;
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
 var St = /^key/, Tt = /^(?:mouse|contextmenu)|click/, Et = /^(?:focusinfocus|focusoutblur)$/, _t = /^([^.]*)(?:\.(.+)|)$/;
 rt.event = {
  global: {},
  add: function(e, n, i, o, r) {
   var s, a, l, c, u, d, p, f, h, g, m, v = mt.get(e);
   if (v) {
    for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = rt.guid++), 
    (c = v.events) || (c = v.events = {}), (a = v.handle) || (a = v.handle = function(e) {
     return typeof rt === B || e && rt.event.triggered === e.type ? t : rt.event.dispatch.apply(a.elem, arguments);
    }, a.elem = e), n = (n || "").match(at) || [ "" ], u = n.length; u--; ) l = _t.exec(n[u]) || [], 
    h = m = l[1], g = (l[2] || "").split(".").sort(), h && (p = rt.event.special[h] || {}, 
    h = (r ? p.delegateType : p.bindType) || h, p = rt.event.special[h] || {}, d = rt.extend({
     type: h,
     origType: m,
     data: o,
     handler: i,
     guid: i.guid,
     selector: r,
     needsContext: r && rt.expr.match.needsContext.test(r),
     namespace: g.join(".")
    }, s), (f = c[h]) || (f = c[h] = [], f.delegateCount = 0, p.setup && p.setup.call(e, o, g, a) !== !1 || e.addEventListener && e.addEventListener(h, a, !1)), 
    p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = i.guid)), r ? f.splice(f.delegateCount++, 0, d) : f.push(d), 
    rt.event.global[h] = !0);
    e = null;
   }
  },
  remove: function(e, t, n, i, o) {
   var r, s, a, l, c, u, d, p, f, h, g, m = mt.hasData(e) && mt.get(e);
   if (m && (l = m.events)) {
    for (t = (t || "").match(at) || [ "" ], c = t.length; c--; ) if (a = _t.exec(t[c]) || [], 
    f = g = a[1], h = (a[2] || "").split(".").sort(), f) {
     for (d = rt.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, 
     p = l[f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
     s = r = p.length; r--; ) u = p[r], !o && g !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), 
     u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
     s && !p.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || rt.removeEvent(e, f, m.handle), 
     delete l[f]);
    } else for (f in l) rt.event.remove(e, f + t[c], n, i, !0);
    rt.isEmptyObject(l) && (delete m.handle, mt.remove(e, "events"));
   }
  },
  trigger: function(n, i, o, r) {
   var s, a, l, c, u, d, p, f = [ o || U ], h = it.call(n, "type") ? n.type : n, g = it.call(n, "namespace") ? n.namespace.split(".") : [];
   if (a = l = o = o || U, 3 !== o.nodeType && 8 !== o.nodeType && !Et.test(h + rt.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), 
   h = g.shift(), g.sort()), u = h.indexOf(":") < 0 && "on" + h, n = n[rt.expando] ? n : new rt.Event(h, "object" == typeof n && n), 
   n.isTrigger = r ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
   n.result = t, n.target || (n.target = o), i = null == i ? [ n ] : rt.makeArray(i, [ n ]), 
   p = rt.event.special[h] || {}, r || !p.trigger || p.trigger.apply(o, i) !== !1)) {
    if (!r && !p.noBubble && !rt.isWindow(o)) {
     for (c = p.delegateType || h, Et.test(c + h) || (a = a.parentNode); a; a = a.parentNode) f.push(a), 
     l = a;
     l === (o.ownerDocument || U) && f.push(l.defaultView || l.parentWindow || e);
    }
    for (s = 0; (a = f[s++]) && !n.isPropagationStopped(); ) n.type = s > 1 ? c : p.bindType || h, 
    d = (mt.get(a, "events") || {})[n.type] && mt.get(a, "handle"), d && d.apply(a, i), 
    d = u && a[u], d && rt.acceptData(a) && d.apply && d.apply(a, i) === !1 && n.preventDefault();
    return n.type = h, r || n.isDefaultPrevented() || p._default && p._default.apply(f.pop(), i) !== !1 || !rt.acceptData(o) || u && rt.isFunction(o[h]) && !rt.isWindow(o) && (l = o[u], 
    l && (o[u] = null), rt.event.triggered = h, o[h](), rt.event.triggered = t, l && (o[u] = l)), 
    n.result;
   }
  },
  dispatch: function(e) {
   e = rt.event.fix(e);
   var n, i, o, r, s, a = [], l = et.call(arguments), c = (mt.get(this, "events") || {})[e.type] || [], u = rt.event.special[e.type] || {};
   if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
    for (a = rt.event.handlers.call(this, e, c), n = 0; (r = a[n++]) && !e.isPropagationStopped(); ) for (e.currentTarget = r.elem, 
    i = 0; (s = r.handlers[i++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(s.namespace)) && (e.handleObj = s, 
    e.data = s.data, o = ((rt.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), 
    o !== t && (e.result = o) === !1 && (e.preventDefault(), e.stopPropagation()));
    return u.postDispatch && u.postDispatch.call(this, e), e.result;
   }
  },
  handlers: function(e, n) {
   var i, o, r, s, a = [], l = n.delegateCount, c = e.target;
   if (l && c.nodeType && (!e.button || "click" !== e.type)) for (;c !== this; c = c.parentNode || this) if (c.disabled !== !0 || "click" !== e.type) {
    for (o = [], i = 0; l > i; i++) s = n[i], r = s.selector + " ", o[r] === t && (o[r] = s.needsContext ? rt(r, this).index(c) >= 0 : rt.find(r, this, null, [ c ]).length), 
    o[r] && o.push(s);
    o.length && a.push({
     elem: c,
     handlers: o
    });
   }
   return l < n.length && a.push({
    elem: this,
    handlers: n.slice(l)
   }), a;
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
    var i, o, r, s = n.button;
    return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || U, 
    o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), 
    e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), 
    e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e;
   }
  },
  fix: function(e) {
   if (e[rt.expando]) return e;
   var t, n, i, o = e.type, r = e, s = this.fixHooks[o];
   for (s || (this.fixHooks[o] = s = Tt.test(o) ? this.mouseHooks : St.test(o) ? this.keyHooks : {}), 
   i = s.props ? this.props.concat(s.props) : this.props, e = new rt.Event(r), t = i.length; t--; ) n = i[t], 
   e[n] = r[n];
   return e.target || (e.target = U), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
   s.filter ? s.filter(e, r) : e;
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
  simulate: function(e, t, n, i) {
   var o = rt.extend(new rt.Event(), n, {
    type: e,
    isSimulated: !0,
    originalEvent: {}
   });
   i ? rt.event.trigger(o, null, t) : rt.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault();
  }
 }, rt.removeEvent = function(e, t, n) {
  e.removeEventListener && e.removeEventListener(t, n, !1);
 }, rt.Event = function(e, t) {
  return this instanceof rt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
  this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? s : a) : this.type = e, 
  t && rt.extend(this, t), this.timeStamp = e && e.timeStamp || rt.now(), this[rt.expando] = !0, 
  void 0) : new rt.Event(e, t);
 }, rt.Event.prototype = {
  isDefaultPrevented: a,
  isPropagationStopped: a,
  isImmediatePropagationStopped: a,
  preventDefault: function() {
   var e = this.originalEvent;
   this.isDefaultPrevented = s, e && e.preventDefault && e.preventDefault();
  },
  stopPropagation: function() {
   var e = this.originalEvent;
   this.isPropagationStopped = s, e && e.stopPropagation && e.stopPropagation();
  },
  stopImmediatePropagation: function() {
   this.isImmediatePropagationStopped = s, this.stopPropagation();
  }
 }, rt.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
 }, function(e, t) {
  rt.event.special[e] = {
   delegateType: t,
   bindType: t,
   handle: function(e) {
    var n, i = this, o = e.relatedTarget, r = e.handleObj;
    return (!o || o !== i && !rt.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), 
    e.type = t), n;
   }
  };
 }), rt.support.focusinBubbles || rt.each({
  focus: "focusin",
  blur: "focusout"
 }, function(e, t) {
  var n = 0, i = function(e) {
   rt.event.simulate(t, e.target, rt.event.fix(e), !0);
  };
  rt.event.special[t] = {
   setup: function() {
    0 === n++ && U.addEventListener(e, i, !0);
   },
   teardown: function() {
    0 === --n && U.removeEventListener(e, i, !0);
   }
  };
 }), rt.fn.extend({
  on: function(e, n, i, o, r) {
   var s, l;
   if ("object" == typeof e) {
    "string" != typeof n && (i = i || n, n = t);
    for (l in e) this.on(l, n, i, e[l], r);
    return this;
   }
   if (null == i && null == o ? (o = n, i = n = t) : null == o && ("string" == typeof n ? (o = i, 
   i = t) : (o = i, i = n, n = t)), o === !1) o = a; else if (!o) return this;
   return 1 === r && (s = o, o = function(e) {
    return rt().off(e), s.apply(this, arguments);
   }, o.guid = s.guid || (s.guid = rt.guid++)), this.each(function() {
    rt.event.add(this, e, o, i, n);
   });
  },
  one: function(e, t, n, i) {
   return this.on(e, t, n, i, 1);
  },
  off: function(e, n, i) {
   var o, r;
   if (e && e.preventDefault && e.handleObj) return o = e.handleObj, rt(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), 
   this;
   if ("object" == typeof e) {
    for (r in e) this.off(r, n, e[r]);
    return this;
   }
   return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = a), 
   this.each(function() {
    rt.event.remove(this, e, i, n);
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
 var It = /^.[^:#\[\.,]*$/, Pt = /^(?:parents|prev(?:Until|All))/, $t = rt.expr.match.needsContext, Nt = {
  children: !0,
  contents: !0,
  next: !0,
  prev: !0
 };
 rt.fn.extend({
  find: function(e) {
   var t, n = [], i = this, o = i.length;
   if ("string" != typeof e) return this.pushStack(rt(e).filter(function() {
    for (t = 0; o > t; t++) if (rt.contains(i[t], this)) return !0;
   }));
   for (t = 0; o > t; t++) rt.find(e, i[t], n);
   return n = this.pushStack(o > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, 
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
   return !!u(this, "string" == typeof e && $t.test(e) ? rt(e) : e || [], !1).length;
  },
  closest: function(e, t) {
   for (var n, i = 0, o = this.length, r = [], s = $t.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; o > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
    n = r.push(n);
    break;
   }
   return this.pushStack(r.length > 1 ? rt.unique(r) : r);
  },
  index: function(e) {
   return e ? "string" == typeof e ? tt.call(rt(e), this[0]) : tt.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  },
  add: function(e, t) {
   var n = "string" == typeof e ? rt(e, t) : rt.makeArray(e && e.nodeType ? [ e ] : e), i = rt.merge(this.get(), n);
   return this.pushStack(rt.unique(i));
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
  rt.fn[e] = function(n, i) {
   var o = rt.map(this, t, n);
   return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = rt.filter(i, o)), 
   this.length > 1 && (Nt[e] || rt.unique(o), Pt.test(e) && o.reverse()), this.pushStack(o);
  };
 }), rt.extend({
  filter: function(e, t, n) {
   var i = t[0];
   return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? rt.find.matchesSelector(i, e) ? [ i ] : [] : rt.find.matches(e, rt.grep(t, function(e) {
    return 1 === e.nodeType;
   }));
  },
  dir: function(e, n, i) {
   for (var o = [], r = i !== t; (e = e[n]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
    if (r && rt(e).is(i)) break;
    o.push(e);
   }
   return o;
  },
  sibling: function(e, t) {
   for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
   return n;
  }
 });
 var Lt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rt = /<([\w:]+)/, Mt = /<|&#?\w+;/, At = /<(?:script|style|link)/i, zt = /^(?:checkbox|radio)$/i, Dt = /checked\s*(?:[^=]|=\s*.checked.)/i, Ot = /^$|\/(?:java|ecma)script/i, jt = /^true\/(.*)/, Ht = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ft = {
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
    return e === t ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || U).createTextNode(e));
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
   for (var n, i = e ? rt.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || rt.cleanData(m(n)), 
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
    var n = this[0] || {}, i = 0, o = this.length;
    if (e === t && 1 === n.nodeType) return n.innerHTML;
    if ("string" == typeof e && !At.test(e) && !Ft[(Rt.exec(e) || [ "", "" ])[1].toLowerCase()]) {
     e = e.replace(Lt, "<$1></$2>");
     try {
      for (;o > i; i++) n = this[i] || {}, 1 === n.nodeType && (rt.cleanData(m(n, !1)), 
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
    var i = e[t++], o = e[t++];
    o && (i && i.parentNode !== o && (i = this.nextSibling), rt(this).remove(), o.insertBefore(n, i));
   }, !0), t ? this : this.remove();
  },
  detach: function(e) {
   return this.remove(e, !0);
  },
  domManip: function(e, t, n) {
   e = Z.apply([], e);
   var i, o, r, s, a, l, c = 0, u = this.length, d = this, h = u - 1, g = e[0], v = rt.isFunction(g);
   if (v || !(1 >= u || "string" != typeof g || rt.support.checkClone) && Dt.test(g)) return this.each(function(i) {
    var o = d.eq(i);
    v && (e[0] = g.call(this, i, o.html())), o.domManip(e, t, n);
   });
   if (u && (i = rt.buildFragment(e, this[0].ownerDocument, !1, !n && this), o = i.firstChild, 
   1 === i.childNodes.length && (i = o), o)) {
    for (r = rt.map(m(i, "script"), p), s = r.length; u > c; c++) a = i, c !== h && (a = rt.clone(a, !0, !0), 
    s && rt.merge(r, m(a, "script"))), t.call(this[c], a, c);
    if (s) for (l = r[r.length - 1].ownerDocument, rt.map(r, f), c = 0; s > c; c++) a = r[c], 
    Ot.test(a.type || "") && !mt.access(a, "globalEval") && rt.contains(l, a) && (a.src ? rt._evalUrl(a.src) : rt.globalEval(a.textContent.replace(Ht, "")));
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
   for (var n, i = [], o = rt(e), r = o.length - 1, s = 0; r >= s; s++) n = s === r ? this : this.clone(!0), 
   rt(o[s])[t](n), Q.apply(i, n.get());
   return this.pushStack(i);
  };
 }), rt.extend({
  clone: function(e, t, n) {
   var i, o, r, s, a = e.cloneNode(!0), l = rt.contains(e.ownerDocument, e);
   if (!(rt.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e))) for (s = m(a), 
   r = m(e), i = 0, o = r.length; o > i; i++) v(r[i], s[i]);
   if (t) if (n) for (r = r || m(e), s = s || m(a), i = 0, o = r.length; o > i; i++) g(r[i], s[i]); else g(e, a);
   return s = m(a, "script"), s.length > 0 && h(s, !l && m(e, "script")), a;
  },
  buildFragment: function(e, t, n, i) {
   for (var o, r, s, a, l, c, u = 0, d = e.length, p = t.createDocumentFragment(), f = []; d > u; u++) if (o = e[u], 
   o || 0 === o) if ("object" === rt.type(o)) rt.merge(f, o.nodeType ? [ o ] : o); else if (Mt.test(o)) {
    for (r = r || p.appendChild(t.createElement("div")), s = (Rt.exec(o) || [ "", "" ])[1].toLowerCase(), 
    a = Ft[s] || Ft._default, r.innerHTML = a[1] + o.replace(Lt, "<$1></$2>") + a[2], 
    c = a[0]; c--; ) r = r.lastChild;
    rt.merge(f, r.childNodes), r = p.firstChild, r.textContent = "";
   } else f.push(t.createTextNode(o));
   for (p.textContent = "", u = 0; o = f[u++]; ) if ((!i || -1 === rt.inArray(o, i)) && (l = rt.contains(o.ownerDocument, o), 
   r = m(p.appendChild(o), "script"), l && h(r), n)) for (c = 0; o = r[c++]; ) Ot.test(o.type || "") && n.push(o);
   return p;
  },
  cleanData: function(e) {
   for (var n, i, r, s, a, l, c = rt.event.special, u = 0; (i = e[u]) !== t; u++) {
    if (o.accepts(i) && (a = i[mt.expando], a && (n = mt.cache[a]))) {
     if (r = Object.keys(n.events || {}), r.length) for (l = 0; (s = r[l]) !== t; l++) c[s] ? rt.event.remove(i, s) : rt.removeEvent(i, s, n.handle);
     mt.cache[a] && delete mt.cache[a];
    }
    delete gt.cache[i[gt.expando]];
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
 var qt, Bt, Wt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Gt = new RegExp("^(" + st + ")(.*)$", "i"), Vt = new RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"), Xt = new RegExp("^([+-])=(" + st + ")", "i"), Yt = {
  BODY: "block"
 }, Jt = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
 }, Kt = {
  letterSpacing: 0,
  fontWeight: 400
 }, Zt = [ "Top", "Right", "Bottom", "Left" ], Qt = [ "Webkit", "O", "Moz", "ms" ];
 rt.fn.extend({
  css: function(e, n) {
   return rt.access(this, function(e, n, i) {
    var o, r, s = {}, a = 0;
    if (rt.isArray(n)) {
     for (o = w(e), r = n.length; r > a; a++) s[n[a]] = rt.css(e, n[a], !1, o);
     return s;
    }
    return i !== t ? rt.style(e, n, i) : rt.css(e, n);
   }, e, n, arguments.length > 1);
  },
  show: function() {
   return x(this, !0);
  },
  hide: function() {
   return x(this);
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
  style: function(e, n, i, o) {
   if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
    var r, s, a, l = rt.camelCase(n), c = e.style;
    return n = rt.cssProps[l] || (rt.cssProps[l] = b(c, l)), a = rt.cssHooks[n] || rt.cssHooks[l], 
    i === t ? a && "get" in a && (r = a.get(e, !1, o)) !== t ? r : c[n] : (s = typeof i, 
    "string" === s && (r = Xt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(rt.css(e, n)), 
    s = "number"), null == i || "number" === s && isNaN(i) || ("number" !== s || rt.cssNumber[l] || (i += "px"), 
    rt.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (c[n] = "inherit"), 
    a && "set" in a && (i = a.set(e, i, o)) === t || (c[n] = i)), void 0);
   }
  },
  css: function(e, n, i, o) {
   var r, s, a, l = rt.camelCase(n);
   return n = rt.cssProps[l] || (rt.cssProps[l] = b(e.style, l)), a = rt.cssHooks[n] || rt.cssHooks[l], 
   a && "get" in a && (r = a.get(e, !0, i)), r === t && (r = qt(e, n, o)), "normal" === r && n in Kt && (r = Kt[n]), 
   "" === i || i ? (s = parseFloat(r), i === !0 || rt.isNumeric(s) ? s || 0 : r) : r;
  }
 }), qt = function(e, n, i) {
  var o, r, s, a = i || w(e), l = a ? a.getPropertyValue(n) || a[n] : t, c = e.style;
  return a && ("" !== l || rt.contains(e.ownerDocument, e) || (l = rt.style(e, n)), 
  Vt.test(l) && Ut.test(n) && (o = c.width, r = c.minWidth, s = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, 
  l = a.width, c.width = o, c.minWidth = r, c.maxWidth = s)), l;
 }, rt.each([ "height", "width" ], function(e, t) {
  rt.cssHooks[t] = {
   get: function(e, n, i) {
    return n ? 0 === e.offsetWidth && Wt.test(rt.css(e, "display")) ? rt.swap(e, Jt, function() {
     return S(e, t, i);
    }) : S(e, t, i) : void 0;
   },
   set: function(e, n, i) {
    var o = i && w(e);
    return k(e, n, i ? C(e, t, i, rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, o), o) : 0);
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
    for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [ n ]; 4 > i; i++) o[e + Zt[i] + t] = r[i] || r[i - 2] || r[0];
    return o;
   }
  }, Ut.test(e) || (rt.cssHooks[e + t].set = k);
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
    return this.name && !rt(this).is(":disabled") && rn.test(this.nodeName) && !on.test(e) && (this.checked || !zt.test(e));
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
  var i, o = [], r = function(e, t) {
   t = rt.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
  };
  if (n === t && (n = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(e) || e.jquery && !rt.isPlainObject(e)) rt.each(e, function() {
   r(this.name, this.value);
  }); else for (i in e) _(i, e[i], n, r);
  return o.join("&").replace(en, "+");
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
  delegate: function(e, t, n, i) {
   return this.on(t, e, n, i);
  },
  undelegate: function(e, t, n) {
   return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
  }
 });
 var sn, an, ln = rt.now(), cn = /\?/, un = /#.*$/, dn = /([?&])_=[^&]*/, pn = /^(.*?):[ \t]*([^\r\n]*)$/gm, fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, hn = /^(?:GET|HEAD)$/, gn = /^\/\//, mn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, vn = rt.fn.load, bn = {}, yn = {}, wn = "*/".concat("*");
 try {
  an = W.href;
 } catch (xn) {
  an = U.createElement("a"), an.href = "", an = an.href;
 }
 sn = mn.exec(an.toLowerCase()) || [], rt.fn.load = function(e, n, i) {
  if ("string" != typeof e && vn) return vn.apply(this, arguments);
  var o, r, s, a = this, l = e.indexOf(" ");
  return l >= 0 && (o = e.slice(l), e = e.slice(0, l)), rt.isFunction(n) ? (i = n, 
  n = t) : n && "object" == typeof n && (r = "POST"), a.length > 0 && rt.ajax({
   url: e,
   type: r,
   dataType: "html",
   data: n
  }).done(function(e) {
   s = arguments, a.html(o ? rt("<div>").append(rt.parseHTML(e)).find(o) : e);
  }).complete(i && function(e, t) {
   a.each(i, s || [ e.responseText, t, e ]);
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
   url: an,
   type: "GET",
   isLocal: fn.test(sn[1]),
   global: !0,
   processData: !0,
   async: !0,
   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   accepts: {
    "*": wn,
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
   return t ? $($(e, rt.ajaxSettings), t) : $(rt.ajaxSettings, e);
  },
  ajaxPrefilter: I(bn),
  ajaxTransport: I(yn),
  ajax: function(e, n) {
   function i(e, n, i, a) {
    var c, d, b, y, x, C = n;
    2 !== w && (w = 2, l && clearTimeout(l), o = t, s = a || "", k.readyState = e > 0 ? 4 : 0, 
    c = e >= 200 && 300 > e || 304 === e, i && (y = N(p, k, i)), y = L(p, y, k, c), 
    c ? (p.ifModified && (x = k.getResponseHeader("Last-Modified"), x && (rt.lastModified[r] = x), 
    x = k.getResponseHeader("etag"), x && (rt.etag[r] = x)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = y.state, 
    d = y.data, b = y.error, c = !b)) : (b = C, (e || !C) && (C = "error", 0 > e && (e = 0))), 
    k.status = e, k.statusText = (n || C) + "", c ? g.resolveWith(f, [ d, C, k ]) : g.rejectWith(f, [ k, C, b ]), 
    k.statusCode(v), v = t, u && h.trigger(c ? "ajaxSuccess" : "ajaxError", [ k, p, c ? d : b ]), 
    m.fireWith(f, [ k, C ]), u && (h.trigger("ajaxComplete", [ k, p ]), --rt.active || rt.event.trigger("ajaxStop")));
   }
   "object" == typeof e && (n = e, e = t), n = n || {};
   var o, r, s, a, l, c, u, d, p = rt.ajaxSetup({}, n), f = p.context || p, h = p.context && (f.nodeType || f.jquery) ? rt(f) : rt.event, g = rt.Deferred(), m = rt.Callbacks("once memory"), v = p.statusCode || {}, b = {}, y = {}, w = 0, x = "canceled", k = {
    readyState: 0,
    getResponseHeader: function(e) {
     var t;
     if (2 === w) {
      if (!a) for (a = {}; t = pn.exec(s); ) a[t[1].toLowerCase()] = t[2];
      t = a[e.toLowerCase()];
     }
     return null == t ? null : t;
    },
    getAllResponseHeaders: function() {
     return 2 === w ? s : null;
    },
    setRequestHeader: function(e, t) {
     var n = e.toLowerCase();
     return w || (e = y[n] = y[n] || e, b[e] = t), this;
    },
    overrideMimeType: function(e) {
     return w || (p.mimeType = e), this;
    },
    statusCode: function(e) {
     var t;
     if (e) if (2 > w) for (t in e) v[t] = [ v[t], e[t] ]; else k.always(e[k.status]);
     return this;
    },
    abort: function(e) {
     var t = e || x;
     return o && o.abort(t), i(0, t), this;
    }
   };
   if (g.promise(k).complete = m.add, k.success = k.done, k.error = k.fail, p.url = ((e || p.url || an) + "").replace(un, "").replace(gn, sn[1] + "//"), 
   p.type = n.method || n.type || p.method || p.type, p.dataTypes = rt.trim(p.dataType || "*").toLowerCase().match(at) || [ "" ], 
   null == p.crossDomain && (c = mn.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] === sn[1] && c[2] === sn[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (sn[3] || ("http:" === sn[1] ? "80" : "443")))), 
   p.data && p.processData && "string" != typeof p.data && (p.data = rt.param(p.data, p.traditional)), 
   P(bn, p, n, k), 2 === w) return k;
   u = p.global, u && 0 === rt.active++ && rt.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
   p.hasContent = !hn.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (cn.test(r) ? "&" : "?") + p.data, 
   delete p.data), p.cache === !1 && (p.url = dn.test(r) ? r.replace(dn, "$1_=" + ln++) : r + (cn.test(r) ? "&" : "?") + "_=" + ln++)), 
   p.ifModified && (rt.lastModified[r] && k.setRequestHeader("If-Modified-Since", rt.lastModified[r]), 
   rt.etag[r] && k.setRequestHeader("If-None-Match", rt.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", p.contentType), 
   k.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + wn + "; q=0.01" : "") : p.accepts["*"]);
   for (d in p.headers) k.setRequestHeader(d, p.headers[d]);
   if (p.beforeSend && (p.beforeSend.call(f, k, p) === !1 || 2 === w)) return k.abort();
   x = "abort";
   for (d in {
    success: 1,
    error: 1,
    complete: 1
   }) k[d](p[d]);
   if (o = P(yn, p, n, k)) {
    k.readyState = 1, u && h.trigger("ajaxSend", [ k, p ]), p.async && p.timeout > 0 && (l = setTimeout(function() {
     k.abort("timeout");
    }, p.timeout));
    try {
     w = 1, o.send(b, i);
    } catch (C) {
     if (!(2 > w)) throw C;
     i(-1, C);
    }
   } else i(-1, "No Transport");
   return k;
  },
  getJSON: function(e, t, n) {
   return rt.get(e, t, n, "json");
  },
  getScript: function(e, n) {
   return rt.get(e, t, n, "script");
  }
 }), rt.each([ "get", "post" ], function(e, n) {
  rt[n] = function(e, i, o, r) {
   return rt.isFunction(i) && (r = r || o, o = i, i = t), rt.ajax({
    url: e,
    type: n,
    dataType: r,
    data: i,
    success: o
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
    send: function(i, o) {
     t = rt("<script>").prop({
      async: !0,
      charset: e.scriptCharset,
      src: e.url
     }).on("load error", n = function(e) {
      t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type);
     }), U.head.appendChild(t[0]);
    },
    abort: function() {
     n && n();
    }
   };
  }
 });
 var kn = [], Cn = /(=)\?(?=&|$)|\?\?/;
 rt.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
   var e = kn.pop() || rt.expando + "_" + ln++;
   return this[e] = !0, e;
  }
 }), rt.ajaxPrefilter("json jsonp", function(n, i, o) {
  var r, s, a, l = n.jsonp !== !1 && (Cn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Cn.test(n.data) && "data");
  return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = rt.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
  l ? n[l] = n[l].replace(Cn, "$1" + r) : n.jsonp !== !1 && (n.url += (cn.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), 
  n.converters["script json"] = function() {
   return a || rt.error(r + " was not called"), a[0];
  }, n.dataTypes[0] = "json", s = e[r], e[r] = function() {
   a = arguments;
  }, o.always(function() {
   e[r] = s, n[r] && (n.jsonpCallback = i.jsonpCallback, kn.push(r)), a && rt.isFunction(s) && s(a[0]), 
   a = s = t;
  }), "script") : void 0;
 }), rt.ajaxSettings.xhr = function() {
  try {
   return new XMLHttpRequest();
  } catch (e) {}
 };
 var Sn = rt.ajaxSettings.xhr(), Tn = {
  0: 200,
  1223: 204
 }, En = 0, _n = {};
 e.ActiveXObject && rt(e).on("unload", function() {
  for (var e in _n) _n[e]();
  _n = t;
 }), rt.support.cors = !!Sn && "withCredentials" in Sn, rt.support.ajax = Sn = !!Sn, 
 rt.ajaxTransport(function(e) {
  var n;
  return rt.support.cors || Sn && !e.crossDomain ? {
   send: function(i, o) {
    var r, s, a = e.xhr();
    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) a[r] = e.xhrFields[r];
    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
    for (r in i) a.setRequestHeader(r, i[r]);
    n = function(e) {
     return function() {
      n && (delete _n[s], n = a.onload = a.onerror = null, "abort" === e ? a.abort() : "error" === e ? o(a.status || 404, a.statusText) : o(Tn[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
       text: a.responseText
      } : t, a.getAllResponseHeaders()));
     };
    }, a.onload = n(), a.onerror = n("error"), n = _n[s = En++] = n("abort"), a.send(e.hasContent && e.data || null);
   },
   abort: function() {
    n && n();
   }
  } : void 0;
 });
 var In, Pn, $n = /^(?:toggle|show|hide)$/, Nn = new RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"), Ln = /queueHooks$/, Rn = [ D ], Mn = {
  "*": [ function(e, t) {
   var n = this.createTween(e, t), i = n.cur(), o = Nn.exec(t), r = o && o[3] || (rt.cssNumber[e] ? "" : "px"), s = (rt.cssNumber[e] || "px" !== r && +i) && Nn.exec(rt.css(n.elem, e)), a = 1, l = 20;
   if (s && s[3] !== r) {
    r = r || s[3], o = o || [], s = +i || 1;
    do a = a || ".5", s /= a, rt.style(n.elem, e, s + r); while (a !== (a = n.cur() / i) && 1 !== a && --l);
   }
   return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), 
   n;
  } ]
 };
 rt.Animation = rt.extend(A, {
  tweener: function(e, t) {
   rt.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
   for (var n, i = 0, o = e.length; o > i; i++) n = e[i], Mn[n] = Mn[n] || [], Mn[n].unshift(t);
  },
  prefilter: function(e, t) {
   t ? Rn.unshift(e) : Rn.push(e);
  }
 }), rt.Tween = O, O.prototype = {
  constructor: O,
  init: function(e, t, n, i, o, r) {
   this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), 
   this.end = i, this.unit = r || (rt.cssNumber[n] ? "" : "px");
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
  rt.fn[t] = function(e, i, o) {
   return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(j(t, !0), e, i, o);
  };
 }), rt.fn.extend({
  fadeTo: function(e, t, n, i) {
   return this.filter(y).css("opacity", 0).show().end().animate({
    opacity: t
   }, e, n, i);
  },
  animate: function(e, t, n, i) {
   var o = rt.isEmptyObject(e), r = rt.speed(t, n, i), s = function() {
    var t = A(this, rt.extend({}, e), r);
    (o || mt.get(this, "finish")) && t.stop(!0);
   };
   return s.finish = s, o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s);
  },
  stop: function(e, n, i) {
   var o = function(e) {
    var t = e.stop;
    delete e.stop, t(i);
   };
   return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
   this.each(function() {
    var t = !0, n = null != e && e + "queueHooks", r = rt.timers, s = mt.get(this);
    if (n) s[n] && s[n].stop && o(s[n]); else for (n in s) s[n] && s[n].stop && Ln.test(n) && o(s[n]);
    for (n = r.length; n--; ) r[n].elem !== this || null != e && r[n].queue !== e || (r[n].anim.stop(i), 
    t = !1, r.splice(n, 1));
    (t || !i) && rt.dequeue(this, e);
   });
  },
  finish: function(e) {
   return e !== !1 && (e = e || "fx"), this.each(function() {
    var t, n = mt.get(this), i = n[e + "queue"], o = n[e + "queueHooks"], r = rt.timers, s = i ? i.length : 0;
    for (n.finish = !0, rt.queue(this, e, []), o && o.stop && o.stop.call(this, !0), 
    t = r.length; t--; ) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), 
    r.splice(t, 1));
    for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
    delete n.finish;
   });
  }
 }), rt.each({
  slideDown: j("show"),
  slideUp: j("hide"),
  slideToggle: j("toggle"),
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
  rt.fn[e] = function(e, n, i) {
   return this.animate(t, e, n, i);
  };
 }), rt.speed = function(e, t, n) {
  var i = e && "object" == typeof e ? rt.extend({}, e) : {
   complete: n || !n && t || rt.isFunction(e) && e,
   duration: e,
   easing: n && t || t && !rt.isFunction(t) && t
  };
  return i.duration = rt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in rt.fx.speeds ? rt.fx.speeds[i.duration] : rt.fx.speeds._default, 
  (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
   rt.isFunction(i.old) && i.old.call(this), i.queue && rt.dequeue(this, i.queue);
  }, i;
 }, rt.easing = {
  linear: function(e) {
   return e;
  },
  swing: function(e) {
   return .5 - Math.cos(e * Math.PI) / 2;
  }
 }, rt.timers = [], rt.fx = O.prototype.init, rt.fx.tick = function() {
  var e, n = rt.timers, i = 0;
  for (In = rt.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
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
  var n, i, o = this[0], r = {
   top: 0,
   left: 0
  }, s = o && o.ownerDocument;
  if (s) return n = s.documentElement, rt.contains(n, o) ? (typeof o.getBoundingClientRect !== B && (r = o.getBoundingClientRect()), 
  i = H(s), {
   top: r.top + i.pageYOffset - n.clientTop,
   left: r.left + i.pageXOffset - n.clientLeft
  }) : r;
 }, rt.offset = {
  setOffset: function(e, t, n) {
   var i, o, r, s, a, l, c, u = rt.css(e, "position"), d = rt(e), p = {};
   "static" === u && (e.style.position = "relative"), a = d.offset(), r = rt.css(e, "top"), 
   l = rt.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1, 
   c ? (i = d.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), 
   rt.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), 
   null != t.left && (p.left = t.left - a.left + o), "using" in t ? t.using.call(e, p) : d.css(p);
  }
 }, rt.fn.extend({
  position: function() {
   if (this[0]) {
    var e, t, n = this[0], i = {
     top: 0,
     left: 0
    };
    return "fixed" === rt.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
    t = this.offset(), rt.nodeName(e[0], "html") || (i = e.offset()), i.top += rt.css(e[0], "borderTopWidth", !0), 
    i.left += rt.css(e[0], "borderLeftWidth", !0)), {
     top: t.top - i.top - rt.css(n, "marginTop", !0),
     left: t.left - i.left - rt.css(n, "marginLeft", !0)
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
 }, function(n, i) {
  var o = "pageYOffset" === i;
  rt.fn[n] = function(r) {
   return rt.access(this, function(n, r, s) {
    var a = H(n);
    return s === t ? a ? a[i] : n[r] : (a ? a.scrollTo(o ? e.pageXOffset : s, o ? s : e.pageYOffset) : n[r] = s, 
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
  }, function(i, o) {
   rt.fn[o] = function(o, r) {
    var s = arguments.length && (i || "boolean" != typeof o), a = i || (o === !0 || r === !0 ? "margin" : "border");
    return rt.access(this, function(n, i, o) {
     var r;
     return rt.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (r = n.documentElement, 
     Math.max(n.body["scroll" + e], r["scroll" + e], n.body["offset" + e], r["offset" + e], r["client" + e])) : o === t ? rt.css(n, i, a) : rt.style(n, i, o, a);
    }, n, s ? o : t, s, null);
   };
  });
 }), rt.fn.size = function() {
  return this.length;
 }, rt.fn.andSelf = rt.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = rt : "function" == typeof define && define.amd && define("jquery", [], function() {
  return rt;
 }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = rt);
})(window), function() {
 var e = this, t = e._, n = {}, i = Array.prototype, o = Object.prototype, r = Function.prototype, s = i.push, a = i.slice, l = i.concat, c = o.toString, u = o.hasOwnProperty, d = i.forEach, p = i.map, f = i.reduce, h = i.reduceRight, g = i.filter, m = i.every, v = i.some, b = i.indexOf, y = i.lastIndexOf, w = Array.isArray, x = Object.keys, k = r.bind, C = function(e) {
  return e instanceof C ? e : this instanceof C ? (this._wrapped = e, void 0) : new C(e);
 };
 "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = C), 
 exports._ = C) : e._ = C, C.VERSION = "1.4.4";
 var S = C.each = C.forEach = function(e, t, i) {
  if (null != e) if (d && e.forEach === d) e.forEach(t, i); else if (e.length === +e.length) {
   for (var o = 0, r = e.length; r > o; o++) if (t.call(i, e[o], o, e) === n) return;
  } else for (var s in e) if (C.has(e, s) && t.call(i, e[s], s, e) === n) return;
 };
 C.map = C.collect = function(e, t, n) {
  var i = [];
  return null == e ? i : p && e.map === p ? e.map(t, n) : (S(e, function(e, o, r) {
   i[i.length] = t.call(n, e, o, r);
  }), i);
 };
 var T = "Reduce of empty array with no initial value";
 C.reduce = C.foldl = C.inject = function(e, t, n, i) {
  var o = arguments.length > 2;
  if (null == e && (e = []), f && e.reduce === f) return i && (t = C.bind(t, i)), 
  o ? e.reduce(t, n) : e.reduce(t);
  if (S(e, function(e, r, s) {
   o ? n = t.call(i, n, e, r, s) : (n = e, o = !0);
  }), !o) throw new TypeError(T);
  return n;
 }, C.reduceRight = C.foldr = function(e, t, n, i) {
  var o = arguments.length > 2;
  if (null == e && (e = []), h && e.reduceRight === h) return i && (t = C.bind(t, i)), 
  o ? e.reduceRight(t, n) : e.reduceRight(t);
  var r = e.length;
  if (r !== +r) {
   var s = C.keys(e);
   r = s.length;
  }
  if (S(e, function(a, l, c) {
   l = s ? s[--r] : --r, o ? n = t.call(i, n, e[l], l, c) : (n = e[l], o = !0);
  }), !o) throw new TypeError(T);
  return n;
 }, C.find = C.detect = function(e, t, n) {
  var i;
  return E(e, function(e, o, r) {
   return t.call(n, e, o, r) ? (i = e, !0) : void 0;
  }), i;
 }, C.filter = C.select = function(e, t, n) {
  var i = [];
  return null == e ? i : g && e.filter === g ? e.filter(t, n) : (S(e, function(e, o, r) {
   t.call(n, e, o, r) && (i[i.length] = e);
  }), i);
 }, C.reject = function(e, t, n) {
  return C.filter(e, function(e, i, o) {
   return !t.call(n, e, i, o);
  }, n);
 }, C.every = C.all = function(e, t, i) {
  t || (t = C.identity);
  var o = !0;
  return null == e ? o : m && e.every === m ? e.every(t, i) : (S(e, function(e, r, s) {
   return (o = o && t.call(i, e, r, s)) ? void 0 : n;
  }), !!o);
 };
 var E = C.some = C.any = function(e, t, i) {
  t || (t = C.identity);
  var o = !1;
  return null == e ? o : v && e.some === v ? e.some(t, i) : (S(e, function(e, r, s) {
   return o || (o = t.call(i, e, r, s)) ? n : void 0;
  }), !!o);
 };
 C.contains = C.include = function(e, t) {
  return null == e ? !1 : b && e.indexOf === b ? -1 != e.indexOf(t) : E(e, function(e) {
   return e === t;
  });
 }, C.invoke = function(e, t) {
  var n = a.call(arguments, 2), i = C.isFunction(t);
  return C.map(e, function(e) {
   return (i ? t : e[t]).apply(e, n);
  });
 }, C.pluck = function(e, t) {
  return C.map(e, function(e) {
   return e[t];
  });
 }, C.where = function(e, t, n) {
  return C.isEmpty(t) ? n ? null : [] : C[n ? "find" : "filter"](e, function(e) {
   for (var n in t) if (t[n] !== e[n]) return !1;
   return !0;
  });
 }, C.findWhere = function(e, t) {
  return C.where(e, t, !0);
 }, C.max = function(e, t, n) {
  if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
  if (!t && C.isEmpty(e)) return -1/0;
  var i = {
   computed: -1/0,
   value: -1/0
  };
  return S(e, function(e, o, r) {
   var s = t ? t.call(n, e, o, r) : e;
   s >= i.computed && (i = {
    value: e,
    computed: s
   });
  }), i.value;
 }, C.min = function(e, t, n) {
  if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
  if (!t && C.isEmpty(e)) return 1/0;
  var i = {
   computed: 1/0,
   value: 1/0
  };
  return S(e, function(e, o, r) {
   var s = t ? t.call(n, e, o, r) : e;
   s < i.computed && (i = {
    value: e,
    computed: s
   });
  }), i.value;
 }, C.shuffle = function(e) {
  var t, n = 0, i = [];
  return S(e, function(e) {
   t = C.random(n++), i[n - 1] = i[t], i[t] = e;
  }), i;
 };
 var _ = function(e) {
  return C.isFunction(e) ? e : function(t) {
   return t[e];
  };
 };
 C.sortBy = function(e, t, n) {
  var i = _(t);
  return C.pluck(C.map(e, function(e, t, o) {
   return {
    value: e,
    index: t,
    criteria: i.call(n, e, t, o)
   };
  }).sort(function(e, t) {
   var n = e.criteria, i = t.criteria;
   if (n !== i) {
    if (n > i || void 0 === n) return 1;
    if (i > n || void 0 === i) return -1;
   }
   return e.index < t.index ? -1 : 1;
  }), "value");
 };
 var I = function(e, t, n, i) {
  var o = {}, r = _(t || C.identity);
  return S(e, function(t, s) {
   var a = r.call(n, t, s, e);
   i(o, a, t);
  }), o;
 };
 C.groupBy = function(e, t, n) {
  return I(e, t, n, function(e, t, n) {
   (C.has(e, t) ? e[t] : e[t] = []).push(n);
  });
 }, C.countBy = function(e, t, n) {
  return I(e, t, n, function(e, t) {
   C.has(e, t) || (e[t] = 0), e[t]++;
  });
 }, C.sortedIndex = function(e, t, n, i) {
  n = null == n ? C.identity : _(n);
  for (var o = n.call(i, t), r = 0, s = e.length; s > r; ) {
   var a = r + s >>> 1;
   n.call(i, e[a]) < o ? r = a + 1 : s = a;
  }
  return r;
 }, C.toArray = function(e) {
  return e ? C.isArray(e) ? a.call(e) : e.length === +e.length ? C.map(e, C.identity) : C.values(e) : [];
 }, C.size = function(e) {
  return null == e ? 0 : e.length === +e.length ? e.length : C.keys(e).length;
 }, C.first = C.head = C.take = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[0] : a.call(e, 0, t);
 }, C.initial = function(e, t, n) {
  return a.call(e, 0, e.length - (null == t || n ? 1 : t));
 }, C.last = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[e.length - 1] : a.call(e, Math.max(e.length - t, 0));
 }, C.rest = C.tail = C.drop = function(e, t, n) {
  return a.call(e, null == t || n ? 1 : t);
 }, C.compact = function(e) {
  return C.filter(e, C.identity);
 };
 var P = function(e, t, n) {
  return S(e, function(e) {
   C.isArray(e) ? t ? s.apply(n, e) : P(e, t, n) : n.push(e);
  }), n;
 };
 C.flatten = function(e, t) {
  return P(e, t, []);
 }, C.without = function(e) {
  return C.difference(e, a.call(arguments, 1));
 }, C.uniq = C.unique = function(e, t, n, i) {
  C.isFunction(t) && (i = n, n = t, t = !1);
  var o = n ? C.map(e, n, i) : e, r = [], s = [];
  return S(o, function(n, i) {
   (t ? i && s[s.length - 1] === n : C.contains(s, n)) || (s.push(n), r.push(e[i]));
  }), r;
 }, C.union = function() {
  return C.uniq(l.apply(i, arguments));
 }, C.intersection = function(e) {
  var t = a.call(arguments, 1);
  return C.filter(C.uniq(e), function(e) {
   return C.every(t, function(t) {
    return C.indexOf(t, e) >= 0;
   });
  });
 }, C.difference = function(e) {
  var t = l.apply(i, a.call(arguments, 1));
  return C.filter(e, function(e) {
   return !C.contains(t, e);
  });
 }, C.zip = function() {
  for (var e = a.call(arguments), t = C.max(C.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++) n[i] = C.pluck(e, "" + i);
  return n;
 }, C.object = function(e, t) {
  if (null == e) return {};
  for (var n = {}, i = 0, o = e.length; o > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
  return n;
 }, C.indexOf = function(e, t, n) {
  if (null == e) return -1;
  var i = 0, o = e.length;
  if (n) {
   if ("number" != typeof n) return i = C.sortedIndex(e, t), e[i] === t ? i : -1;
   i = 0 > n ? Math.max(0, o + n) : n;
  }
  if (b && e.indexOf === b) return e.indexOf(t, n);
  for (;o > i; i++) if (e[i] === t) return i;
  return -1;
 }, C.lastIndexOf = function(e, t, n) {
  if (null == e) return -1;
  var i = null != n;
  if (y && e.lastIndexOf === y) return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
  for (var o = i ? n : e.length; o--; ) if (e[o] === t) return o;
  return -1;
 }, C.range = function(e, t, n) {
  arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
  for (var i = Math.max(Math.ceil((t - e) / n), 0), o = 0, r = new Array(i); i > o; ) r[o++] = e, 
  e += n;
  return r;
 }, C.bind = function(e, t) {
  if (e.bind === k && k) return k.apply(e, a.call(arguments, 1));
  var n = a.call(arguments, 2);
  return function() {
   return e.apply(t, n.concat(a.call(arguments)));
  };
 }, C.partial = function(e) {
  var t = a.call(arguments, 1);
  return function() {
   return e.apply(this, t.concat(a.call(arguments)));
  };
 }, C.bindAll = function(e) {
  var t = a.call(arguments, 1);
  return 0 === t.length && (t = C.functions(e)), S(t, function(t) {
   e[t] = C.bind(e[t], e);
  }), e;
 }, C.memoize = function(e, t) {
  var n = {};
  return t || (t = C.identity), function() {
   var i = t.apply(this, arguments);
   return C.has(n, i) ? n[i] : n[i] = e.apply(this, arguments);
  };
 }, C.delay = function(e, t) {
  var n = a.call(arguments, 2);
  return setTimeout(function() {
   return e.apply(null, n);
  }, t);
 }, C.defer = function(e) {
  return C.delay.apply(C, [ e, 1 ].concat(a.call(arguments, 1)));
 }, C.throttle = function(e, t) {
  var n, i, o, r, s = 0, a = function() {
   s = new Date(), o = null, r = e.apply(n, i);
  };
  return function() {
   var l = new Date(), c = t - (l - s);
   return n = this, i = arguments, 0 >= c ? (clearTimeout(o), o = null, s = l, r = e.apply(n, i)) : o || (o = setTimeout(a, c)), 
   r;
  };
 }, C.debounce = function(e, t, n) {
  var i, o;
  return function() {
   var r = this, s = arguments, a = function() {
    i = null, n || (o = e.apply(r, s));
   }, l = n && !i;
   return clearTimeout(i), i = setTimeout(a, t), l && (o = e.apply(r, s)), o;
  };
 }, C.once = function(e) {
  var t, n = !1;
  return function() {
   return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t);
  };
 }, C.wrap = function(e, t) {
  return function() {
   var n = [ e ];
   return s.apply(n, arguments), t.apply(this, n);
  };
 }, C.compose = function() {
  var e = arguments;
  return function() {
   for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
   return t[0];
  };
 }, C.after = function(e, t) {
  return 0 >= e ? t() : function() {
   return --e < 1 ? t.apply(this, arguments) : void 0;
  };
 }, C.keys = x || function(e) {
  if (e !== Object(e)) throw new TypeError("Invalid object");
  var t = [];
  for (var n in e) C.has(e, n) && (t[t.length] = n);
  return t;
 }, C.values = function(e) {
  var t = [];
  for (var n in e) C.has(e, n) && t.push(e[n]);
  return t;
 }, C.pairs = function(e) {
  var t = [];
  for (var n in e) C.has(e, n) && t.push([ n, e[n] ]);
  return t;
 }, C.invert = function(e) {
  var t = {};
  for (var n in e) C.has(e, n) && (t[e[n]] = n);
  return t;
 }, C.functions = C.methods = function(e) {
  var t = [];
  for (var n in e) C.isFunction(e[n]) && t.push(n);
  return t.sort();
 }, C.extend = function(e) {
  return S(a.call(arguments, 1), function(t) {
   if (t) for (var n in t) e[n] = t[n];
  }), e;
 }, C.pick = function(e) {
  var t = {}, n = l.apply(i, a.call(arguments, 1));
  return S(n, function(n) {
   n in e && (t[n] = e[n]);
  }), t;
 }, C.omit = function(e) {
  var t = {}, n = l.apply(i, a.call(arguments, 1));
  for (var o in e) C.contains(n, o) || (t[o] = e[o]);
  return t;
 }, C.defaults = function(e) {
  return S(a.call(arguments, 1), function(t) {
   if (t) for (var n in t) null == e[n] && (e[n] = t[n]);
  }), e;
 }, C.clone = function(e) {
  return C.isObject(e) ? C.isArray(e) ? e.slice() : C.extend({}, e) : e;
 }, C.tap = function(e, t) {
  return t(e), e;
 };
 var $ = function(e, t, n, i) {
  if (e === t) return 0 !== e || 1 / e == 1 / t;
  if (null == e || null == t) return e === t;
  e instanceof C && (e = e._wrapped), t instanceof C && (t = t._wrapped);
  var o = c.call(e);
  if (o != c.call(t)) return !1;
  switch (o) {
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
  for (var r = n.length; r--; ) if (n[r] == e) return i[r] == t;
  n.push(e), i.push(t);
  var s = 0, a = !0;
  if ("[object Array]" == o) {
   if (s = e.length, a = s == t.length) for (;s-- && (a = $(e[s], t[s], n, i)); ) ;
  } else {
   var l = e.constructor, u = t.constructor;
   if (l !== u && !(C.isFunction(l) && l instanceof l && C.isFunction(u) && u instanceof u)) return !1;
   for (var d in e) if (C.has(e, d) && (s++, !(a = C.has(t, d) && $(e[d], t[d], n, i)))) break;
   if (a) {
    for (d in t) if (C.has(t, d) && !s--) break;
    a = !s;
   }
  }
  return n.pop(), i.pop(), a;
 };
 C.isEqual = function(e, t) {
  return $(e, t, [], []);
 }, C.isEmpty = function(e) {
  if (null == e) return !0;
  if (C.isArray(e) || C.isString(e)) return 0 === e.length;
  for (var t in e) if (C.has(e, t)) return !1;
  return !0;
 }, C.isElement = function(e) {
  return !(!e || 1 !== e.nodeType);
 }, C.isArray = w || function(e) {
  return "[object Array]" == c.call(e);
 }, C.isObject = function(e) {
  return e === Object(e);
 }, S([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(e) {
  C["is" + e] = function(t) {
   return c.call(t) == "[object " + e + "]";
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
 }, C.has = function(e, t) {
  return u.call(e, t);
 }, C.noConflict = function() {
  return e._ = t, this;
 }, C.identity = function(e) {
  return e;
 }, C.times = function(e, t, n) {
  for (var i = Array(e), o = 0; e > o; o++) i[o] = t.call(n, o);
  return i;
 }, C.random = function(e, t) {
  return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
 };
 var N = {
  escape: {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': "&quot;",
   "'": "&#x27;",
   "/": "&#x2F;"
  }
 };
 N.unescape = C.invert(N.escape);
 var L = {
  escape: new RegExp("[" + C.keys(N.escape).join("") + "]", "g"),
  unescape: new RegExp("(" + C.keys(N.unescape).join("|") + ")", "g")
 };
 C.each([ "escape", "unescape" ], function(e) {
  C[e] = function(t) {
   return null == t ? "" : ("" + t).replace(L[e], function(t) {
    return N[e][t];
   });
  };
 }), C.result = function(e, t) {
  if (null == e) return null;
  var n = e[t];
  return C.isFunction(n) ? n.call(e) : n;
 }, C.mixin = function(e) {
  S(C.functions(e), function(t) {
   var n = C[t] = e[t];
   C.prototype[t] = function() {
    var e = [ this._wrapped ];
    return s.apply(e, arguments), D.call(this, n.apply(C, e));
   };
  });
 };
 var R = 0;
 C.uniqueId = function(e) {
  var t = ++R + "";
  return e ? e + t : t;
 }, C.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
 };
 var M = /(.)^/, A = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "	": "t",
  "\u2028": "u2028",
  "\u2029": "u2029"
 }, z = /\\|'|\r|\n|\t|\u2028|\u2029/g;
 C.template = function(e, t, n) {
  var i;
  n = C.defaults({}, n, C.templateSettings);
  var o = new RegExp([ (n.escape || M).source, (n.interpolate || M).source, (n.evaluate || M).source ].join("|") + "|$", "g"), r = 0, s = "__p+='";
  e.replace(o, function(t, n, i, o, a) {
   return s += e.slice(r, a).replace(z, function(e) {
    return "\\" + A[e];
   }), n && (s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (s += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), 
   o && (s += "';\n" + o + "\n__p+='"), r = a + t.length, t;
  }), s += "';\n", n.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
  try {
   i = new Function(n.variable || "obj", "_", s);
  } catch (a) {
   throw a.source = s, a;
  }
  if (t) return i(t, C);
  var l = function(e) {
   return i.call(this, e, C);
  };
  return l.source = "function(" + (n.variable || "obj") + "){\n" + s + "}", l;
 }, C.chain = function(e) {
  return C(e).chain();
 };
 var D = function(e) {
  return this._chain ? C(e).chain() : e;
 };
 C.mixin(C), S([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
  var t = i[e];
  C.prototype[e] = function() {
   var n = this._wrapped;
   return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], 
   D.call(this, n);
  };
 }), S([ "concat", "join", "slice" ], function(e) {
  var t = i[e];
  C.prototype[e] = function() {
   return D.call(this, t.apply(this._wrapped, arguments));
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
  var t;
  return t || e._;
 };
}(this)), function(e, t) {
 "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define("crel", t) : e.crel = t();
}(this, function() {
 function e() {
  var n, i = window.document, o = arguments, r = i.createElement(o[0]), s = o[1], a = 2, l = o.length, c = e.attrMap;
  if (1 === l) return r;
  if (("object" != typeof s || t(s)) && (--a, s = null), 1 === l - a && "string" == typeof o[a] && void 0 !== r.textContent) r.textContent = o[a]; else for (;l > a; ++a) n = o[a], 
  null != n && (t(n) || (n = i.createTextNode(n)), r.appendChild(n));
  for (var u in s) if (c[u]) {
   var d = e.attrMap[u];
   "function" == typeof d ? d(r, s[u]) : r.setAttribute(d, s[u]);
  } else r.setAttribute(u, s[u]);
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
  }, i = e.URL || e.webkitURL || e, o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), r = "download" in o, s = function(n) {
   var i = t.createEvent("MouseEvents");
   i.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(i);
  }, a = e.webkitRequestFileSystem, l = e.requestFileSystem || a || e.mozRequestFileSystem, c = function(t) {
   (e.setImmediate || e.setTimeout)(function() {
    throw t;
   }, 0);
  }, u = "application/octet-stream", d = 0, p = [], f = function() {
   for (var e = p.length; e--; ) {
    var t = p[e];
    "string" == typeof t ? i.revokeObjectURL(t) : t.remove();
   }
   p.length = 0;
  }, h = function(e, t, n) {
   t = [].concat(t);
   for (var i = t.length; i--; ) {
    var o = e["on" + t[i]];
    if ("function" == typeof o) try {
     o.call(e, n || e);
    } catch (r) {
     c(r);
    }
   }
  }, g = function(t, i) {
   var c, f, g, m = this, v = t.type, b = !1, y = function() {
    var e = n().createObjectURL(t);
    return p.push(e), e;
   }, w = function() {
    h(m, "writestart progress write writeend".split(" "));
   }, x = function() {
    (b || !c) && (c = y(t)), f && (f.location.href = c), m.readyState = m.DONE, w();
   }, k = function(e) {
    return function() {
     return m.readyState !== m.DONE ? e.apply(this, arguments) : void 0;
    };
   }, C = {
    create: !0,
    exclusive: !1
   };
   return m.readyState = m.INIT, i || (i = "download"), r ? (c = y(t), o.href = c, 
   o.download = i, s(o), m.readyState = m.DONE, w(), void 0) : (e.chrome && v && v !== u && (g = t.slice || t.webkitSlice, 
   t = g.call(t, 0, t.size, u), b = !0), a && "download" !== i && (i += ".download"), 
   f = v === u || a ? e : e.open(), l ? (d += t.size, l(e.TEMPORARY, d, k(function(e) {
    e.root.getDirectory("saved", C, k(function(e) {
     var n = function() {
      e.getFile(i, C, k(function(e) {
       e.createWriter(k(function(n) {
        n.onwriteend = function(t) {
         f.location.href = e.toURL(), p.push(e), m.readyState = m.DONE, h(m, "writeend", t);
        }, n.onerror = function() {
         var e = n.error;
         e.code !== e.ABORT_ERR && x();
        }, "writestart progress write abort".split(" ").forEach(function(e) {
         n["on" + e] = m["on" + e];
        }), n.write(t), m.abort = function() {
         n.abort(), m.readyState = m.DONE;
        }, m.readyState = m.WRITING;
       }), x);
      }), x);
     };
     e.getFile(i, {
      create: !1
     }, k(function(e) {
      e.remove(), n();
     }), k(function(e) {
      e.code === e.NOT_FOUND_ERR ? n() : x();
     }));
    }), x);
   }), x), void 0) : (x(), void 0));
  }, m = g.prototype, v = function(e, t) {
   return new g(e, t);
  };
  return m.abort = function() {
   var e = this;
   e.readyState = e.DONE, h(e, "abort");
  }, m.readyState = m.INIT = 0, m.WRITING = 1, m.DONE = 2, m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null, 
  e.addEventListener("unload", f, !1), v;
 } catch (b) {
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
  var i = e[t];
  e[t] = function() {
   return n.call(this, printStackTrace().slice(4)), e[t]._instrumented.apply(this, arguments);
  }, e[t]._instrumented = i;
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
  for (var t = "{anonymous}", n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, i = e.stacktrace.split("\n"), o = [], r = 0, s = i.length; s > r; r += 2) {
   var a = n.exec(i[r]);
   if (a) {
    var l = a[4] + ":" + a[1] + ":" + a[2], c = a[3] || "global code";
    c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, t), 
    o.push(c + "@" + l + " -- " + i[r + 1].replace(/^\s+/, ""));
   }
  }
  return o;
 },
 opera10b: function(e) {
  for (var t = /^(.*)@(.+):(\d+)$/, n = e.stacktrace.split("\n"), i = [], o = 0, r = n.length; r > o; o++) {
   var s = t.exec(n[o]);
   if (s) {
    var a = s[1] ? s[1] + "()" : "global code";
    i.push(a + "@" + s[2] + ":" + s[3]);
   }
  }
  return i;
 },
 opera10a: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, i = e.stacktrace.split("\n"), o = [], r = 0, s = i.length; s > r; r += 2) {
   var a = n.exec(i[r]);
   if (a) {
    var l = a[3] || t;
    o.push(l + "()@" + a[2] + ":" + a[1] + " -- " + i[r + 1].replace(/^\s+/, ""));
   }
  }
  return o;
 },
 opera9: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)/i, i = e.message.split("\n"), o = [], r = 2, s = i.length; s > r; r += 2) {
   var a = n.exec(i[r]);
   a && o.push(t + "()@" + a[2] + ":" + a[1] + " -- " + i[r + 1].replace(/^\s+/, ""));
  }
  return o;
 },
 other: function(e) {
  for (var t, n, i = "{anonymous}", o = /function\s*([\w\-$]+)?\s*\(/i, r = [], s = 10; e && e.arguments && r.length < s; ) t = o.test(e.toString()) ? RegExp.$1 || i : i, 
  n = Array.prototype.slice.call(e.arguments || []), r[r.length] = t + "(" + this.stringifyArguments(n) + ")", 
  e = e.caller;
  return r;
 },
 stringifyArguments: function(e) {
  for (var t = [], n = Array.prototype.slice, i = 0; i < e.length; ++i) {
   var o = e[i];
   void 0 === o ? t[i] = "undefined" : null === o ? t[i] = "null" : o.constructor && (o.constructor === Array ? t[i] = o.length < 3 ? "[" + this.stringifyArguments(o) + "]" : "[" + this.stringifyArguments(n.call(o, 0, 1)) + "..." + this.stringifyArguments(n.call(o, -1)) + "]" : o.constructor === Object ? t[i] = "#object" : o.constructor === Function ? t[i] = "#function" : o.constructor === String ? t[i] = '"' + o + '"' : o.constructor === Number && (t[i] = o));
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
  } catch (i) {}
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
   var n = /\{anonymous\}\(.*\)@(.*)/, i = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, o = e[t], r = n.exec(o);
   if (r) {
    var s = i.exec(r[1]);
    if (s) {
     var a = s[1], l = s[2], c = s[3] || 0;
     if (a && this.isSameDomain(a) && l) {
      var u = this.guessAnonymousFunction(a, l, c);
      e[t] = o.replace("{anonymous}", u);
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
  } catch (i) {
   n = "getSource failed with url: " + e + ", exception: " + i.toString();
  }
  return n;
 },
 findFunctionName: function(e, t) {
  for (var n, i, o, r = /function\s+([^(]*?)\s*\(([^)]*)\)/, s = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, a = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, l = "", c = Math.min(t, 20), u = 0; c > u; ++u) if (n = e[t - u - 1], 
  o = n.indexOf("//"), o >= 0 && (n = n.substr(0, o)), n) {
   if (l = n + l, i = s.exec(l), i && i[1]) return i[1];
   if (i = r.exec(l), i && i[1]) return i[1];
   if (i = a.exec(l), i && i[1]) return i[1];
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
  var i = e.val();
  return void 0 === i ? (inputError(e, t), void 0) : (i = utils.trim(i), 0 === i.length || void 0 !== n && !i.match(n) ? (inputError(e, t), 
  void 0) : i);
 }, utils.getInputIntValue = function(e, t, n, i) {
  e = jqElt(e);
  var o = utils.getInputTextValue(e, t);
  return void 0 === o ? void 0 : (o = parseInt(o), 0/0 === o || void 0 !== n && n > o || void 0 !== i && o > i ? (inputError(e, t), 
  void 0) : o);
 }, utils.getInputRegExpValue = function(e, t) {
  e = jqElt(e);
  var n = utils.getInputTextValue(e, t);
  if (void 0 === n) return void 0;
  try {
   new RegExp(n);
  } catch (i) {
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
  e = jqElt(e), e.prop("checked", t).change();
 }, utils.getInputRadio = function(e) {
  return $("input:radio[name=" + e + "]:checked").prop("value");
 }, utils.setInputRadio = function(e, t) {
  $("input:radio[name=" + e + "][value=" + t + "]").prop("checked", !0).change();
 }, utils.resetModalInputs = function() {
  $(".modal input[type=text]:not([disabled]), .modal input[type=password], .modal textarea").val(""), 
  $(".modal input[type=checkbox]").prop("checked", !1).change();
 }, utils.trim = function(e) {
  return $.trim(e);
 }, utils.slugify = function(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }, utils.checkUrl = function(e, t) {
  return e ? (0 !== e.indexOf("http") && (e = "http://" + e), t && -1 === e.indexOf("/", e.length - 1) && (e += "/"), 
  e) : e;
 }, utils.addModal = function(e, t) {
  var n = crel("div", {
   "class": "modal " + e
  });
  n.innerHTML = t, document.body.appendChild(n);
 }, utils.createBackdrop = function(e, t) {
  var n = crel("div", {
   "class": "modal-backdrop in",
   "data-toggle": e,
   "data-target": t
  });
  return document.body.appendChild(n), n;
 }, utils.popupWindow = function(e, t, n, i) {
  var o = screen.width / 2 - n / 2, r = screen.height / 2 - i / 2;
  return window.open(e, t, [ "toolbar=no, ", "location=no, ", "directories=no, ", "status=no, ", "menubar=no, ", "scrollbars=no, ", "resizable=no, ", "copyhistory=no, ", "width=" + n + ", ", "height=" + i + ", ", "top=" + r + ", ", "left=" + o ].join(""));
 }, utils.saveAs = function(e, t) {
  if (void 0 !== saveAs) {
   var n = new Blob([ e ], {
    type: "text/plain;charset=utf-8"
   });
   saveAs(n, t);
  } else {
   var i = "data:application/octet-stream;base64," + utils.encodeBase64(e);
   window.open(i, "file");
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
  var t, n, i = [], o = 0;
  for (e = encodeURI(e), t = e.length; t > o; ) n = e[o], o += 1, "%" !== n ? i.push(n.charCodeAt(0)) : (n = e[o] + e[o + 1], 
  i.push(parseInt(n, 16)), o += 2);
  var r, s, a = "=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = [], u = i.length - i.length % 3;
  for (r = 0; u > r; r += 3) s = i[r] << 16 | i[r + 1] << 8 | i[r + 2], c.push(l.charAt(s >> 18)), 
  c.push(l.charAt(63 & s >> 12)), c.push(l.charAt(63 & s >> 6)), c.push(l.charAt(63 & s));
  switch (i.length - u) {
  case 1:
   s = i[r] << 16, c.push(l.charAt(s >> 18) + l.charAt(63 & s >> 12) + a + a);
   break;

  case 2:
   s = i[r] << 16 | i[r + 1] << 8, c.push(l.charAt(s >> 18) + l.charAt(63 & s >> 12) + l.charAt(63 & s >> 6) + a);
  }
  return c.join("");
 };
 var mHash = [ 0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117 ];
 return utils.crc32 = function(e) {
  for (var t = 0, n = -1, i = 0; i < e.length; i++) t = 255 & (n ^ e.charCodeAt(i)), 
  n = n >>> 8 ^ mHash[t];
  return n = -1 ^ n, 0 > n && (n = 4294967295 + n + 1), n.toString(16);
 }, utils;
});

var MAIN_URL = "http://benweet.github.io/stackedit/", GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1", GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw", GOOGLE_SCOPES = [ "https://www.googleapis.com/auth/drive.install", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/blogger", "https://picasaweb.google.com/data/" ], GOOGLE_DRIVE_APP_ID = "241271498917", DROPBOX_APP_KEY = "lq6mwopab8wskas", DROPBOX_APP_SECRET = "851fgnucpezy84t", BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c", DEFAULT_FILE_TITLE = "Title", DEFAULT_FOLDER_NAME = "New folder", GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document", CHECK_ONLINE_PERIOD = 12e4, AJAX_TIMEOUT = 3e4, ASYNC_TASK_DEFAULT_TIMEOUT = 6e4, ASYNC_TASK_LONG_TIMEOUT = 18e4, SYNC_PERIOD = 18e4, USER_IDLE_THRESHOLD = 3e5, IMPORT_FILE_MAX_CONTENT_SIZE = 1e5, IMPORT_IMG_MAX_CONTENT_SIZE = 1e7, TEMPORARY_FILE_INDEX = "file.tempIndex", WELCOME_DOCUMENT_TITLE = "Welcome document", DOWNLOAD_PROXY_URL = "http://stackedit-download-proxy.herokuapp.com/", PICASA_PROXY_URL = "http://stackedit-picasa-proxy.herokuapp.com/", WORDPRESS_CLIENT_ID = "3185", WORDPRESS_PROXY_URL = "http://stackedit-wordpress-proxy.herokuapp.com/", SSH_PROXY_URL = "http://stackedit-ssh-proxy.herokuapp.com/", delayedFunction = void 0, BASE_URL = "http://localhost/stackedit/", GOOGLE_CLIENT_ID = "241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com", GITHUB_CLIENT_ID = "e47fef6055344579799d", GATEKEEPER_URL = "http://stackedit-gatekeeper-localhost.herokuapp.com/", TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy-local.herokuapp.com/";

0 === location.hostname.indexOf("benweet.github.io") && (BASE_URL = MAIN_URL, GOOGLE_CLIENT_ID = "241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com", 
GITHUB_CLIENT_ID = "fa0d09514da8377ee32e", GATEKEEPER_URL = "http://stackedit-gatekeeper.herokuapp.com/", 
TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy.herokuapp.com/"), 0 === location.hostname.indexOf("benweet.insomnia247.nl") && (BASE_URL = "http://benweet.insomnia247.nl/stackedit/", 
GOOGLE_CLIENT_ID = "241271498917-52hae7a08hv7ltenv7km8h7lghno9sk3.apps.googleusercontent.com", 
GITHUB_CLIENT_ID = "d2943d6074b2d9c4a830", GATEKEEPER_URL = "http://stackedit-gatekeeper-insomnia.herokuapp.com/", 
TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy-beta.herokuapp.com/");

var THEME_LIST = {
 "default": "Default",
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
 function e(e, t, n, i) {
  this.extensionId = e, this.extensionName = t, this.isOptional = n, this.disableInViewer = i;
 }
 return e;
}), define("text", [ "module" ], function(e) {
 var t, n, i, o, r = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, l = "undefined" != typeof location && location.href, c = l && location.protocol && location.protocol.replace(/\:/, ""), u = l && location.hostname, d = l && (location.port || void 0), p = [], f = e.config && e.config() || {};
 return t = {
  version: "2.0.6",
  strip: function(e) {
   if (e) {
    e = e.replace(s, "");
    var t = e.match(a);
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
    } catch (i) {}
    if (e) {
     r = [ n ];
     break;
    }
   }
   return e;
  },
  parseName: function(e) {
   var t, n, i, o = !1, r = e.indexOf("."), s = 0 === e.indexOf("./") || 0 === e.indexOf("../");
   return -1 !== r && (!s || r > 1) ? (t = e.substring(0, r), n = e.substring(r + 1, e.length)) : t = e, 
   i = n || t, r = i.indexOf("!"), -1 !== r && (o = "strip" === i.substring(r + 1), 
   i = i.substring(0, r), n ? n = i : t = i), {
    moduleName: t,
    ext: n,
    strip: o
   };
  },
  xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
  useXhr: function(e, n, i, o) {
   var r, s, a, l = t.xdRegExp.exec(e);
   return l ? (r = l[2], s = l[3], s = s.split(":"), a = s[1], s = s[0], !(r && r !== n || s && s.toLowerCase() !== i.toLowerCase() || (a || s) && a !== o)) : !0;
  },
  finishLoad: function(e, n, i, o) {
   i = n ? t.strip(i) : i, f.isBuild && (p[e] = i), o(i);
  },
  load: function(e, n, i, o) {
   if (o.isBuild && !o.inlineText) return i(), void 0;
   f.isBuild = o.isBuild;
   var r = t.parseName(e), s = r.moduleName + (r.ext ? "." + r.ext : ""), a = n.toUrl(s), p = f.useXhr || t.useXhr;
   !l || p(a, c, u, d) ? t.get(a, function(n) {
    t.finishLoad(e, r.strip, n, i);
   }, function(e) {
    i.error && i.error(e);
   }) : n([ s ], function(e) {
    t.finishLoad(r.moduleName + "." + r.ext, r.strip, e, i);
   });
  },
  write: function(e, n, i) {
   if (p.hasOwnProperty(n)) {
    var o = t.jsEscape(p[n]);
    i.asModule(e + "!" + n, "define(function () { return '" + o + "';});\n");
   }
  },
  writeFile: function(e, n, i, o, r) {
   var s = t.parseName(n), a = s.ext ? "." + s.ext : "", l = s.moduleName + a, c = i.toUrl(s.moduleName + a) + ".js";
   t.load(l, i, function() {
    var n = function(e) {
     return o(c, e);
    };
    n.asModule = function(e, t) {
     return o.asModule(e, c, t);
    }, t.write(e, l, n, r);
   }, r);
  }
 }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node ? (n = require.nodeRequire("fs"), 
 t.get = function(e, t) {
  var i = n.readFileSync(e, "utf8");
  0 === i.indexOf("﻿") && (i = i.substring(1)), t(i);
 }) : "xhr" === f.env || !f.env && t.createXhr() ? t.get = function(e, n, i, o) {
  var r, s = t.createXhr();
  if (s.open("GET", e, !0), o) for (r in o) o.hasOwnProperty(r) && s.setRequestHeader(r.toLowerCase(), o[r]);
  f.onXhr && f.onXhr(s, e), s.onreadystatechange = function() {
   var t, o;
   4 === s.readyState && (t = s.status, t > 399 && 600 > t ? (o = new Error(e + " HTTP status: " + t), 
   o.xhr = s, i(o)) : n(s.responseText), f.onXhrComplete && f.onXhrComplete(s, e));
  }, s.send(null);
 } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
  var n, i, o = "utf-8", r = new java.io.File(e), s = java.lang.System.getProperty("line.separator"), a = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r), o)), l = "";
  try {
   for (n = new java.lang.StringBuffer(), i = a.readLine(), i && i.length() && 65279 === i.charAt(0) && (i = i.substring(1)), 
   n.append(i); null !== (i = a.readLine()); ) n.append(s), n.append(i);
   l = String(n.toString());
  } finally {
   a.close();
  }
  t(l);
 } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (i = Components.classes, 
 o = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), 
 t.get = function(e, t) {
  var n, r, s = {}, a = new FileUtils.File(e);
  try {
   n = i["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream), 
   n.init(a, 1, 0, !1), r = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream), 
   r.init(n, "utf-8", n.available(), o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), 
   r.readString(n.available(), s), r.close(), n.close(), t(s.value);
  } catch (l) {
   throw new Error((a && a.path || "") + ": " + l);
  }
 }), t;
}), define("text!html/settingsExtensionsAccordion.html", [], function() {
 return '<div class="panel">\n	<div class="accordion-heading">\n		<div class="checkbox pull-right">\n			<label> <input id="input-enable-extension-<%= extensionId %>"\n				type="checkbox"<% if(!isOptional) print(\'disabled\') %>>\n				enabled\n			</label>\n		</div>\n		<span data-toggle="collapse" data-parent=".accordion-extensions"\n			class="accordion-toggle" href="#accordion-extensions-collapse-<%= extensionId %>">\n			<%= extensionName %> </span>\n	</div>\n	<div id="accordion-extensions-collapse-<%= extensionId %>" class="collapse">\n		<div class="accordion-inner clearfix"><%= settingsBlock %></div>\n	</div>\n</div>\n';
}), define("text!html/partialRenderingSettingsBlock.html", [], function() {
 return "<p>Renders modified sections only.</p>\n<blockquote>\n	<b>NOTE:</b> Document sections are based on title elements (h1, h2...). Therefore if\n	your document does not contain any title, performance will not be increased.\n</blockquote>";
}), define("extensions/partialRendering", [ "underscore", "crel", "classes/Extension", "text!html/partialRenderingSettingsBlock.html" ], function(e, t, n, i) {
 function o(t, n) {
  if (p = [], d = [], f = void 0, h === !0 || u != n) return h = !1, u = n, d = c, 
  c = t, p = t, void 0;
  var i = c.length;
  e.some(c, function(e, n) {
   return n >= t.length || e.text != t[n].text ? (i = n, !0) : void 0;
  });
  var o = -c.length;
  e.some(c.slice().reverse(), function(e, n) {
   return n >= t.length || e.text != t[t.length - n - 1].text ? (o = -n, !0) : void 0;
  });
  var r = c.slice(0, i);
  p = t.slice(i, t.length + o);
  var s = c.slice(c.length + o, c.length);
  f = e.first(s), d = c.slice(i, c.length + o), c = r.concat(p).concat(s);
 }
 function r() {
  e.each(d, function(e) {
   var t = document.getElementById("wmd-preview-section-" + e.id);
   b.removeChild(t);
  });
  var n = document.getElementById("wmd-preview"), i = Array.prototype.slice.call(n.childNodes);
  n.innerHTML = "";
  var o = document.createDocumentFragment();
  e.each(p, function(n) {
   for (var r = t("div", {
    id: "wmd-preview-section-" + n.id,
    "class": "wmd-preview-section preview-content"
   }), s = !0; 0 !== i.length; ) {
    var a = i[0];
    if (s === !1 && /(^| )wmd-title($| )/.test(a.className)) break;
    s = !1, "DIV" == a.tagName && "footnotes" == a.className ? e.each(a.querySelectorAll("ol > li"), function(e) {
     var t = e.id.substring(3);
     y[t] = e;
    }) : r.appendChild(a), i.shift();
   }
   o.appendChild(r);
  });
  var r = v;
  void 0 !== f && (r = document.getElementById("wmd-preview-section-" + f.id)), b.insertBefore(o, r), 
  v.innerHTML = "";
  var s = [];
  if (m === !0) {
   var a = t("ol");
   e.each(b.querySelectorAll("a.footnote"), function(e, t) {
    e.textContent = t + 1;
    var n = e.id.substring(6);
    s.push(n), a.appendChild(y[n].cloneNode(!0));
   }), s.length > 0 && v.appendChild(t("div", {
    "class": "footnotes"
   }, t("hr"), a)), y = e.pick(y, s);
  }
 }
 var s = new n("partialRendering", "Partial Rendering", !0);
 s.settingsBlock = i;
 var a = void 0, l = 0, c = [], u = void 0, d = [], p = [], f = void 0, h = !1, g = !1, m = !1;
 s.onSectionsCreated = function(t) {
  var n = [], i = "";
  m = !1, e.each(t, function(e) {
   e += "\n\n", g && (e = e.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, t) {
    return t ? (m = !0, i += e, "") : e;
   })), e = e.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t) {
    return t ? (i += e, "") : e;
   }), /\S/.test(e) && n.push({
    id: ++l,
    text: e
   });
  }), o(n, i);
 };
 var v = void 0, b = void 0, y = {};
 return s.onEditorConfigure = function(t) {
  a = t.getConverter(), a.hooks.chain("preConversion", function() {
   var t = e.map(p, function(e) {
    return e.text;
   });
   return t.push(u + "\n\n"), t.join("");
  }), t.hooks.chain("onPreviewRefresh", function() {
   r();
  });
 }, s.onReady = function() {
  v = t("div", {
   id: "wmd-preview-section-footnotes",
   "class": "preview-content"
  }), b = document.getElementById("preview-contents"), b.appendChild(v);
 }, s.onFileSelected = function() {
  h = !0;
 }, s.onFileOpen = function() {
  a.extraExtensions && (g = e.some(a.extraExtensions, function(e) {
   return "footnotes" == e;
  }));
 }, s;
}), define("classes/FileDescriptor", [ "underscore", "utils" ], function(e, t) {
 function n(e, t, n, i) {
  this.fileIndex = e, this._title = t || localStorage[e + ".title"], this._editorScrollTop = parseInt(localStorage[e + ".editorScrollTop"]) || 0, 
  this._editorStart = parseInt(localStorage[e + ".editorStart"]) || 0, this._editorEnd = parseInt(localStorage[e + ".editorEnd"]) || 0, 
  this._previewScrollTop = parseInt(localStorage[e + ".previewScrollTop"]) || 0, this._selectTime = parseInt(localStorage[e + ".selectTime"]) || 0, 
  this.syncLocations = n || {}, this.publishLocations = i || {}, Object.defineProperty(this, "title", {
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
 return n.prototype.addSyncLocation = function(e) {
  t.storeAttributes(e), t.appendIndexToArray(this.fileIndex + ".sync", e.syncIndex), 
  this.syncLocations[e.syncIndex] = e;
 }, n.prototype.removeSyncLocation = function(e) {
  t.removeIndexFromArray(this.fileIndex + ".sync", e.syncIndex), delete this.syncLocations[e.syncIndex], 
  localStorage.removeItem(e.syncIndex);
 }, n.prototype.addPublishLocation = function(e) {
  t.storeAttributes(e), t.appendIndexToArray(this.fileIndex + ".publish", e.publishIndex), 
  this.publishLocations[e.publishIndex] = e;
 }, n.prototype.removePublishLocation = function(e) {
  t.removeIndexFromArray(this.fileIndex + ".publish", e.publishIndex), delete this.publishLocations[e.publishIndex], 
  localStorage.removeItem(e.publishIndex);
 }, n.prototype.composeTitle = function() {
  var t = [], n = e.values(this.syncLocations), i = e.values(this.publishLocations), o = n.concat(i);
  return e.chain(o).sortBy(function(e) {
   return e.provider.providerId;
  }).each(function(e) {
   var n = "icon-provider-" + e.provider.providerId;
   e.isRealtime === !0 && (n += " realtime"), t.push('<i class="' + n + '"></i>');
  }), t.push(" "), t.push(this.title), t.join("");
 }, n;
}), define("storage", [ "underscore", "utils" ], function(e, t) {
 var n = t.retrieveIndexArray("file.list"), i = localStorage.version;
 if (void 0 === i && (localStorage.removeItem("sync.queue"), localStorage.removeItem("sync.current"), 
 localStorage.removeItem("file.counter"), e.each(n, function(n) {
  localStorage[n + ".publish"] = ";";
  var i = t.retrieveIndexArray(n + ".sync");
  e.each(i, function(e) {
   localStorage[e + ".contentCRC"] = "0", void 0 !== localStorage[e + ".etag"] && (localStorage[e + ".titleCRC"] = "0");
  });
 }), i = "v1"), "v1" == i) {
  var o = localStorage["sync.gdrive.lastChangeId"];
  o && (localStorage["gdrive.lastChangeId"] = o, localStorage.removeItem("sync.gdrive.lastChangeId"));
  var r = localStorage["sync.dropbox.lastChangeId"];
  r && (localStorage["dropbox.lastChangeId"] = r, localStorage.removeItem("sync.dropbox.lastChangeId"));
  var s = "gdrive", a = "dropbox", l = "sync." + s + ".", c = "sync." + a + ".";
  e.each(n, function(n) {
   var i = t.retrieveIndexArray(n + ".sync");
   e.each(i, function(e) {
    var t = {};
    0 === e.indexOf(l) ? (t.provider = s, t.id = e.substring(l.length), t.etag = localStorage[e + ".etag"], 
    t.contentCRC = localStorage[e + ".contentCRC"], t.titleCRC = localStorage[e + ".titleCRC"]) : 0 === e.indexOf(c) && (t.provider = a, 
    t.path = decodeURIComponent(e.substring(c.length)), t.version = localStorage[e + ".version"], 
    t.contentCRC = localStorage[e + ".contentCRC"]), localStorage[e] = JSON.stringify(t), 
    localStorage.removeItem(e + ".etag"), localStorage.removeItem(e + ".version"), localStorage.removeItem(e + ".contentCRC"), 
    localStorage.removeItem(e + ".titleCRC");
   });
  }), i = "v2";
 }
 if ("v2" == i && (e.each(n, function(n) {
  e.has(localStorage, n + ".sync") || (localStorage.removeItem(n + ".title"), localStorage.removeItem(n + ".publish"), 
  localStorage.removeItem(n + ".content"), t.removeIndexFromArray("file.list", n));
 }), i = "v3"), "v3" == i) {
  var u = localStorage["file.current"];
  void 0 !== u && -1 === localStorage["file.list"].indexOf(";" + u + ";") && localStorage.removeItem("file.current"), 
  i = "v4";
 }
 if ("v4" == i && (localStorage.removeItem("githubToken"), i = "v5"), "v5" == i && (e.each(n, function(n) {
  var i = t.retrieveIndexArray(n + ".publish");
  e.each(i, function(e) {
   var t = JSON.parse(localStorage[e]);
   "gdrive" == t.provider && (t.id = t.fileId, t.fileId = void 0, localStorage[e] = JSON.stringify(t));
  });
 }), i = "v6"), "v6" == i) {
  var u = localStorage["file.current"];
  void 0 !== u && (localStorage[u + ".selectTime"] = new Date().getTime(), localStorage.removeItem("file.current")), 
  i = "v7";
 }
 localStorage.version = i;
}), define("fileSystem", [ "underscore", "utils", "classes/FileDescriptor", "storage" ], function(e, t, n) {
 var i = {};
 return e.each(t.retrieveIndexArray("file.list"), function(e) {
  i[e] = new n(e);
 }), i;
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
}), define("text!html/buttonMarkdownSyntax.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Markdown syntax" data-toggle="dropdown">\n	<i class="icon-help-circled"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Markdown syntax</h3>\n	<div class="markdown-syntax">\n<h4>Phrase Emphasis</h4>\n\n<pre><code>*italic*   **bold**\n_italic_   __bold__\n</code></pre>\n\n<h4>Links</h4>\n\n<p>Inline:</p>\n\n<pre><code>An [example](http://url.com/ "Title")\n</code></pre>\n\n<p>Reference-style labels (titles are optional):</p>\n\n<pre><code>An [example][id]. Then, anywhere\nelse in the doc, define the link:\n\n  [id]: http://example.com/  "Title"\n</code></pre>\n\n<h4>Images</h4>\n\n<p>Inline (titles are optional):</p>\n\n<pre><code>![alt text](/path/img.jpg "Title")\n</code></pre>\n\n<p>Reference-style:</p>\n\n<pre><code>![alt text][id]\n\n[id]: /url/to/img.jpg "Title"\n</code></pre>\n\n<h4>Headers</h4>\n\n<p>Setext-style:</p>\n\n<pre><code>Header 1\n========\n\nHeader 2\n--------\n</code></pre>\n\n<p>atx-style (closing #\'s are optional):</p>\n\n<pre><code># Header 1 #\n\n## Header 2 ##\n\n###### Header 6\n</code></pre>\n\n<h4>Lists</h4>\n\n<p>Ordered, without paragraphs:</p>\n\n<pre><code>1.  Foo\n2.  Bar\n</code></pre>\n\n<p>Unordered, with paragraphs:</p>\n\n<pre><code>*   A list item.\n\n    With multiple paragraphs.\n\n*   Bar\n</code></pre>\n\n<p>You can nest them:</p>\n\n<pre><code>*   Abacus\n    * answer\n*   Bubbles\n    1.  bunk\n    2.  bupkis\n        * BELITTLER\n    3. burper\n*   Cunning\n</code></pre>\n\n<h4>Blockquotes</h4>\n\n<pre><code>&gt; Email-style angle brackets\n&gt; are used for blockquotes.\n\n&gt; &gt; And, they can be nested.\n\n&gt; #### Headers in blockquotes\n&gt; \n&gt; * You can quote a list.\n&gt; * Etc.\n</code></pre>\n\n<h4>Code Spans</h4>\n\n<pre><code>`&lt;code&gt;` spans are delimited\nby backticks.\n\nYou can include literal backticks\nlike `` `this` ``.\n</code></pre>\n\n<h4>Preformatted Code Blocks</h4>\n\n<p>Indent every line of a code block by at least 4 spaces or 1 tab.</p>\n\n<pre><code>This is a normal paragraph.\n\n    This is a preformatted\n    code block.\n</code></pre>\n\n<h4>Horizontal Rules</h4>\n\n<p>Three or more dashes or asterisks:</p>\n\n<pre><code>---\n\n* * *\n\n- - - - \n</code></pre>\n\n<h4>Manual Line Breaks</h4>\n\n<p>End a line with two or more spaces:</p>\n\n<pre><code>Roses are red,   \nViolets are blue.\n</code></pre>\n\n<blockquote>Based on the <a target="_blank" href="https://github.com/fletcher/MultiMarkdown/blob/master/Documentation/Markdown%20Syntax.md">Markdown syntax guide</a>, by Fletcher T. Penney.</blockquote>\n    </div>\n</div>\n';
}), define("extensions/buttonMarkdownSyntax", [ "jquery", "classes/Extension", "text!html/buttonMarkdownSyntax.html" ], function(e, t, n) {
 var i = new t("buttonMarkdownSyntax", 'Button "Markdown syntax', !0);
 return i.settingsBlock = '<p>Adds a "Markdown syntax" button over the preview.</p>', 
 i.onCreatePreviewButton = function() {
  return n;
 }, i;
}), define("extensions/googleAnalytics", [ "jquery", "underscore", "utils", "classes/Extension", "settings", "config" ], function(e, t, n, i, o) {
 function r() {
  n.currentTime - u > 18e4 && (_gaq.push([ "_trackPageview" ]), u = n.currentTime);
 }
 var s = new i("googleAnalytics", "Google Analytics", !0);
 s.settingsBlock = "<p>Sends anonymous statistics about usage and errors to help improve StackEdit.</p>";
 var a = !1, l = !1;
 window._gaq = [];
 var c = function() {
  if (a === !1 && l === !1) {
   var t = "/ga.js";
   location.search.match(/(\?|&)console/) && (t = "/u/ga_debug.js"), e.ajax({
    url: "http://www.google-analytics.com" + t,
    dataType: "script"
   }).done(function() {
    a = !0;
   });
  }
 }, u = 0;
 s.onPeriodicRun = function() {
  r();
 }, s.onReady = function() {
  _gaq.push([ "_setAccount", GOOGLE_ANALYTICS_ACCOUNT_ID ]), r(), _gaq.push([ "_trackEvent", "Settings", "layoutOrientation", "" + o.layoutOrientation ]), 
  _gaq.push([ "_trackEvent", "Settings", "lazyRendering", "" + o.lazyRendering ]), 
  _gaq.push([ "_trackEvent", "Settings", "editorFontFamily", "" + o.editorFontFamily ]), 
  _gaq.push([ "_trackEvent", "Settings", "editorFontSize", "" + o.editorFontSize ]), 
  _gaq.push([ "_trackEvent", "Settings", "defaultContent backlink", "" + (-1 !== o.defaultContent.indexOf(MAIN_URL)) ]), 
  _gaq.push([ "_trackEvent", "Settings", "commitMsg backlink", "" + (-1 !== o.commitMsg.indexOf(MAIN_URL)) ]), 
  _gaq.push([ "_trackEvent", "Settings", "sshProxy unchanged", "" + (o.sshProxy == SSH_PROXY_URL) ]), 
  t.each(o.extensionSettings, function(e, t) {
   _gaq.push([ "_trackEvent", "Extensions", t + " enabled", "" + (e.enabled === !0) ]);
  }), window.onerror = function(e, t, i) {
   _gaq.push([ "_trackEvent", "Error", e, t + ":" + i + n.formatEventList() ]);
  }, c();
 }, s.onOfflineChanged = function(e) {
  l = e, c();
 };
 var d = 0;
 return s.onSyncRunning = function(e) {
  e === !0 && (d = new Date().getTime());
 }, s.onPublishRunning = function(e) {
  e === !0 && (d = new Date().getTime());
 }, s.onSyncSuccess = function() {
  var e = new Date().getTime();
  _gaq.push([ "_trackTiming", "Sync", "SyncTime", e - d ]);
 }, s.onSyncImportSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Sync", "SyncImport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncImport provider", t.providerId ]);
 }, s.onSyncExportSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Sync", "SyncExport" ]), _gaq.push([ "_trackEvent", "Sync", "SyncExport provider", t.provider.providerId ]);
 }, s.onPublishSuccess = function(e) {
  var n = new Date().getTime();
  _gaq.push([ "_trackTiming", "Publish", "PublishSuccess", n - d ]), t.each(e.publishLocations, function(e) {
   _gaq.push([ "_trackEvent", "Publish", "PublishSuccess provider", e.provider.providerId ]);
  });
 }, s.onNewPublishSuccess = function(e, t) {
  _gaq.push([ "_trackEvent", "Publish", "NewPublish provider", t.provider.providerId ]);
 }, s.onError = function(e) {
  !t.isString(e) && e.message && _gaq.push([ "_trackEvent", "Error", "message", e.message + n.formatEventList() ]);
 }, s;
}), define("text!extensions/../../version", [], function() {
 return "2.0 beta-1\n";
}), define("text!html/dialogAbout.html", [], function() {
 return '\n<div class="modal-dialog">\n	<div class="modal-content">\n\n		<div class="modal-header">\n			<button type="button" class="close" data-dismiss="modal"\n				aria-hidden="true">&times;</button>\n			<img data-stackedit-src="stackedit-promo.png" width="240" height="60" />\n		</div>\n		<div class="modal-body">\n			<dl>\n				<dt>About:</dt>\n				<dd>\n					<a target="_blank" href="https://github.com/benweet/stackedit/">GitHub\n						project</a> / <a target="_blank"\n						href="https://github.com/benweet/stackedit/issues">issue\n						tracker</a><br /> <a target="_blank"\n						href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome\n						app</a> (thanks for your review!)<br /> <a target="_blank"\n						href="https://twitter.com/stackedit/">Follow on Twitter</a><br />\n					<a target="_blank" href="https://www.facebook.com/stackedit/">Follow\n						on Facebook</a><br /> <a target="_blank"\n						href="https://plus.google.com/110816046787593496375"\n						rel="publisher">Follow on Google+</a><br />\n				</dd>\n			</dl>\n			<dl>\n				<dt>Developers:</dt>\n				<dd>\n					<a target="_blank" href="http://www.benoitschweblin.com">Benoit\n						Schweblin</a><br /> Pete Eigel (contributor)\n				</dd>\n			</dl>\n			<dl>\n				<dt>Credit:</dt>\n				<dd>\n					<% _.each(libraries, function(url, name) { %> <a target="_blank"\n						href="<%= url %>"><%= name %></a><br /> <% }); %>\n				</dd>\n			</dl>\n			<dl>\n				<dt>Related projects:</dt>\n				<dd>\n					<% _.each(projects, function(url, name) { %> <a target="_blank"\n						href="<%= url %>"><%= name %></a><br /> <% }); %>\n				</dd>\n			</dl>\n			<p>\n				StackEdit <%= version %><br /> Copyright 2013 <a\n					target="_blank" href="http://www.benoitschweblin.com">Benoit\n					Schweblin</a><br /> Licensed under an <a target="_blank"\n					href="http://www.apache.org/licenses/LICENSE-2.0">Apache\n					License</a>\n			</p>\n		</div>\n		<div class="modal-footer">\n			<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n		</div>\n	</div>\n</div>\n';
}), define("extensions/dialogAbout", [ "underscore", "utils", "classes/Extension", "text!../../version", "text!html/dialogAbout.html" ], function(e, t, n, i, o) {
 var r = new n("dialogAbout", 'Dialog "About"'), s = {
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
 return r.onReady = function() {
  t.addModal("modal-about", e.template(o, {
   libraries: s,
   projects: a,
   version: i
  }));
 }, r;
}), define("text!html/dialogManagePublicationLocation.html", [], function() {
 return '<div class="input-group">\n	<span class="input-group-addon" title="<%= publishAttributes.provider.providerName %>">\n		<i class="icon-provider-<%= publishAttributes.provider.providerId %>"></i>\n	</span> <input class="form-control" type="text"\n		value="<%= publishDesc %>" disabled />\n	<div class="input-group-btn">\n		<a class="btn btn-link remove-button" title="Remove this location"\n			data-publish-index="<%= publishAttributes.publishIndex %>"><i\n			class="icon-trash"></i></a>\n	</div>\n</div>\n';
}), define("extensions/dialogManagePublication", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManagePublicationLocation.html" ], function(e, t, n, i) {
 var o = new n("dialogManagePublication", 'Dialog "Manage publication"', !1, !0), r = void 0;
 o.onEventMgrCreated = function(e) {
  r = e;
 };
 var s = void 0, a = void 0, l = void 0, c = void 0, u = function(n) {
  if (void 0 === n || n === s) {
   t.size(s.publishLocations) > 0 ? (l.removeClass("hide"), c.addClass("hide")) : (l.addClass("hide"), 
   c.removeClass("hide"));
   var o = t.reduce(s.publishLocations, function(e, n) {
    var o = t.omit(n, "provider", "publishIndex", "sharingLink");
    return o.password && (o.password = "********"), o = JSON.stringify(o).replace(/{|}|"/g, "").replace(/,/g, ", "), 
    e + t.template(i, {
     publishAttributes: n,
     publishDesc: o
    });
   }, "");
   a.innerHTML = o, t.each(a.querySelectorAll(".remove-button"), function(t) {
    var n = e(t), i = s.publishLocations[n.data("publishIndex")];
    n.click(function() {
     s.removePublishLocation(i), r.onPublishRemoved(s, i);
    });
   });
  }
 };
 return o.onFileSelected = function(e) {
  s = e, u(e);
 }, o.onNewPublishSuccess = u, o.onPublishRemoved = u, o.onReady = function() {
  var t = document.querySelector(".modal-manage-publish");
  a = t.querySelector(".publish-list"), l = e(t.querySelectorAll(".msg-publish-list")), 
  c = e(t.querySelectorAll(".msg-no-publish"));
 }, o;
}), define("text!html/dialogManageSynchronizationLocation.html", [], function() {
 return '<div class="input-group">\n	<span class="input-group-addon"\n		title="<%= syncAttributes.provider.providerName %><%= syncAttributes.isRealtime ? \' (real time)\' : \'\' %>">\n		<i\n		class="icon-provider-<%= syncAttributes.provider.providerId %><%= syncAttributes.isRealtime ? \' realtime\' : \'\' %>"></i>\n	</span> <input class="form-control" type="text"\n		value="<%= syncDesc %>" disabled />\n	<div class="input-group-btn">\n		<a class="btn btn-link remove-button" title="Remove this location"\n			data-sync-index="<%= syncAttributes.syncIndex %>"><i class="icon-trash"></i></a>\n	</div>\n</div>\n';
}), define("extensions/dialogManageSynchronization", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManageSynchronizationLocation.html" ], function(e, t, n, i) {
 var o = new n("dialogManageSynchronization", 'Dialog "Manage synchronization"', !1, !0), r = void 0;
 o.onEventMgrCreated = function(e) {
  r = e;
 };
 var s = void 0;
 o.onSynchronizerCreated = function(e) {
  s = e;
 };
 var a = void 0, l = void 0, c = void 0, u = void 0, d = function(n) {
  if (void 0 === n || n === a) {
   t.size(a.syncLocations) > 0 ? (c.removeClass("hide"), u.addClass("hide")) : (c.addClass("hide"), 
   u.removeClass("hide"));
   var o = t.reduce(a.syncLocations, function(e, n) {
    return e + t.template(i, {
     syncAttributes: n,
     syncDesc: n.id || n.path
    });
   }, "");
   l.innerHTML = o, t.each(l.querySelectorAll(".remove-button"), function(t) {
    var n = e(t), i = a.syncLocations[n.data("syncIndex")];
    n.click(function() {
     s.tryStopRealtimeSync(), a.removeSyncLocation(i), r.onSyncRemoved(a, i);
    });
   });
  }
 };
 return o.onFileSelected = function(e) {
  a = e, d(e);
 }, o.onSyncExportSuccess = d, o.onSyncRemoved = d, o.onReady = function() {
  var t = document.querySelector(".modal-manage-sync");
  l = t.querySelector(".sync-list"), c = e(t.querySelectorAll(".msg-sync-list")), 
  u = e(t.querySelectorAll(".msg-no-sync"));
 }, o;
}), function() {
 var e = this, t = {}, n = !1;
 "undefined" != typeof module && module.exports ? (module.exports = t, e.toMarkdown = t, 
 n = !0) : e.toMarkdown = t, t.converter = function(e) {
  e && e.elements && $.isArray(e.elements) && (c = c.concat(e.elements)), this.makeMd = function(e, t) {
   var o;
   if (n) {
    var r = require("jsdom");
    r.env({
     html: e,
     scripts: [ "http://code.jquery.com/jquery-1.6.4.min.js" ],
     done: function(n, o) {
      "function" == typeof t && t(i(e, o.$));
     }
    });
   } else o = i(e, $);
   return o;
  };
 };
 var i = function(e, t) {
  e = e.replace(/(\d+)\. /g, "$1\\. ");
  var n = t("<div/>"), i = n.html(e);
  i.find("*:not(pre, code)").contents().filter(function() {
   return 3 === this.nodeType && /^\s+$/.test(this.nodeValue);
  }).remove();
  for (var o = [], r = 0, a = c.length; a > r; r++) o.push(c[r].selector);
  for (o = o.join(","); i.find(o).length; ) for (var r = 0, a = c.length; a > r; r++) $matches = i.find(c[r].selector + ':not(:has("' + o + '"))'), 
  $matches.each(function(e, n) {
   var i = t(n);
   i.before(c[r].replacement(i.html(), i)).remove();
  });
  return s(i.html());
 }, o = function(e) {
  return e.replace(/^[\n\r\f]+|[\n\r\f]+$/g, "");
 }, r = function(e) {
  return String(e).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
 }, s = function(e) {
  return e = e.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ""), e = e.replace(/\n\s+\n/g, "\n\n"), 
  e = e.replace(/\n{3,}/g, "\n\n"), e = r(e);
 }, a = function(e) {
  return e = o(e), e ? "**" + e + "**" : "";
 }, l = function(e) {
  return e = o(e), e ? "_" + e + "_" : "";
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
   for (var n = t.prop("nodeName").charAt(1), i = "", o = 0; n > o; o++) i += "#";
   return e ? "\n\n" + i + " " + e + "\n\n" : "";
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
    e = o(e);
    var n = t.attr("href"), i = t.attr("title") || "";
    return "[" + e + "]" + "(" + n + (i ? ' "' + i + '"' : "") + ")";
   }
   return !1;
  }
 }, {
  selector: "b",
  replacement: a
 }, {
  selector: "strong",
  replacement: a
 }, {
  selector: "i",
  replacement: l
 }, {
  selector: "em",
  replacement: l
 }, {
  selector: "code",
  replacement: function(e) {
   return e = o(e), e ? "`" + e + "`" : "";
  }
 }, {
  selector: "img",
  replacement: function(e, t) {
   var n = t.attr("alt") || "", i = t.attr("src") || "", o = t.attr("title") || "";
   return "![" + n + "]" + "(" + i + (o ? ' "' + o + '"' : "") + ")";
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
   var n = "*   ", i = "", o = t.parent(), r = o.contents().filter(function() {
    return 1 === this.nodeType && "LI" === this.nodeName || 3 === this.nodeType;
   }), s = r.index(t) + 1;
   return n = o.is("ol") ? s + ".  " : "*   ", s == r.length && (t.parents("li").length || (i = "\n"), 
   e = e.replace(/\s+$/, ""), t.unwrap()), n + e + i + "\n";
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
}(this)), define("extensions/dialogOpenHarddrive", [ "jquery", "underscore", "utils", "classes/Extension", "toMarkdown", "config" ], function(e, t, n, i, o) {
 function r(n) {
  n.stopPropagation(), n.preventDefault();
  var i = (n.dataTransfer || n.target).files;
  e(".modal-import-harddrive-markdown, .modal-import-harddrive-html").modal("hide"), 
  t.each(i, function(t) {
   if (!e(n.target).is("#wmd-input") || !t.name.match(/.(jpe?g|png|gif)$/)) {
    var i = new FileReader();
    i.onload = function(e) {
     return function(t) {
      var n = t.target.result;
      if (n.match(/\uFFFD/)) return d.onError(e.name + " is a binary file."), void 0;
      if (n = p ? p(n) : n, void 0 === n) return d.onError(e.name + " is not a valid HTML file."), 
      void 0;
      var i = e.name, o = i.lastIndexOf(".");
      i = -1 !== o ? i.substring(0, o) : i;
      var r = u.createFile(i, n);
      u.selectFile(r);
     };
    }(t);
    var o = t.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
    i.readAsText(o);
   }
  });
 }
 function s(e) {
  p = void 0, r(e);
 }
 function a(e) {
  p = h, r(e);
 }
 function l(e) {
  e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy";
 }
 var c = new i("dialogOpenHarddrive", 'Dialog "Open from"'), u = void 0;
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
  f = new o.converter(), e("#input-file-import-harddrive-markdown").change(s), e("#dropzone-import-harddrive-markdown, #wmd-input").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", s, !1);
  }), e("#input-file-import-harddrive-html").change(a), e("#dropzone-import-harddrive-html").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", a, !1);
  }), e(".action-convert-html").click(function(e) {
   var t = n.getInputTextValue("#input-convert-html", e);
   if (void 0 !== t) {
    if (t = f.makeMd(t), void 0 === t) return d.onError("Invalid HTML code."), void 0;
    var i = u.createFile(void 0, t);
    u.selectFile(i);
   }
  });
 }, c;
}), define("extensions/documentTitle", [ "jquery", "underscore", "classes/Extension" ], function(e, t, n) {
 var i = new n("documentTitle", "Document Title"), o = void 0;
 i.onLayoutCreated = function(e) {
  o = e;
 };
 var r = void 0, s = function(n) {
  if (n === r) {
   var i = r.title;
   document.title = "StackEdit - " + i, e(".file-title-navbar").html(r.composeTitle()), 
   e(".file-title").text(i), e(".input-file-title").val(i), void 0 !== o && t.defer(o.resizeAll);
  }
 };
 return i.onFileSelected = function(e) {
  r = e, s(e);
 }, i.onTitleChanged = s, i.onSyncExportSuccess = s, i.onSyncRemoved = s, i.onNewPublishSuccess = s, 
 i.onPublishRemoved = s, i;
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
  return w[e.which] ? w[e.which] : x[e.which] ? x[e.which] : String.fromCharCode(e.which).toLowerCase();
 }
 function n(e, t) {
  return e.sort().join(",") === t.sort().join(",");
 }
 function i(e) {
  e = e || {};
  var t, n = !1;
  for (t in E) e[t] ? n = !0 : E[t] = 0;
  n || (I = !1);
 }
 function o(e, t, i, o, r, s) {
  var a, l, u = [], d = i.type;
  if (!S[e]) return [];
  for ("keyup" == d && c(e) && (t = [ e ]), a = 0; a < S[e].length; ++a) if (l = S[e][a], 
  (o || !l.seq || E[l.seq] == l.level) && d == l.action && ("keypress" == d && !i.metaKey && !i.ctrlKey || n(t, l.modifiers))) {
   var p = !o && l.combo == r, f = o && l.seq == o && l.level == s;
   (p || f) && S[e].splice(a, 1), u.push(l);
  }
  return u;
 }
 function r(e) {
  var t = [];
  return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
  e.metaKey && t.push("meta"), t;
 }
 function s(e, t, n) {
  $.stopCallback(t, t.target || t.srcElement, n) || e(t, n) === !1 && (t.preventDefault && t.preventDefault(), 
  t.stopPropagation && t.stopPropagation(), t.returnValue = !1, t.cancelBubble = !0);
 }
 function a(e, t, n) {
  var r, a = o(e, t, n), l = {}, u = 0, d = !1;
  for (r = 0; r < a.length; ++r) a[r].seq && (u = Math.max(u, a[r].level));
  for (r = 0; r < a.length; ++r) if (a[r].seq) {
   if (a[r].level != u) continue;
   d = !0, l[a[r].seq] = 1, s(a[r].callback, n, a[r].combo);
  } else d || s(a[r].callback, n, a[r].combo);
  n.type != I || c(e) || i(l);
 }
 function l(e) {
  "number" != typeof e.which && (e.which = e.keyCode);
  var n = t(e);
  if (n) return "keyup" == e.type && _ == n ? (_ = !1, void 0) : ($.handleKey(n, r(e), e), 
  void 0);
 }
 function c(e) {
  return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
 }
 function u() {
  clearTimeout(y), y = setTimeout(i, 1e3);
 }
 function d() {
  if (!b) {
   b = {};
   for (var e in w) e > 95 && 112 > e || w.hasOwnProperty(e) && (b[w[e]] = e);
  }
  return b;
 }
 function p(e, t, n) {
  return n || (n = d()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
  n;
 }
 function f(e, n, o, r) {
  function a(t) {
   return function() {
    I = t, ++E[e], u();
   };
  }
  function l(n) {
   s(o, n, e), "keyup" !== r && (_ = t(n)), setTimeout(i, 10);
  }
  E[e] = 0;
  for (var c = 0; c < n.length; ++c) {
   var d = c + 1 === n.length, p = d ? l : a(r || g(n[c + 1]).action);
   m(n[c], p, r, e, c);
  }
 }
 function h(e) {
  return "+" === e ? [ "+" ] : e.split("+");
 }
 function g(e, t) {
  var n, i, o, r = [];
  for (n = h(e), o = 0; o < n.length; ++o) i = n[o], C[i] && (i = C[i]), t && "keypress" != t && k[i] && (i = k[i], 
  r.push("shift")), c(i) && r.push(i);
  return t = p(i, r, t), {
   key: i,
   modifiers: r,
   action: t
  };
 }
 function m(e, t, n, i, r) {
  T[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
  var s, a = e.split(" ");
  return a.length > 1 ? (f(e, a, t, n), void 0) : (s = g(e, n), S[s.key] = S[s.key] || [], 
  o(s.key, s.modifiers, {
   type: s.action
  }, i, e, r), S[s.key][i ? "unshift" : "push"]({
   callback: t,
   modifiers: s.modifiers,
   action: s.action,
   seq: i,
   level: r,
   combo: e
  }), void 0);
 }
 function v(e, t, n) {
  for (var i = 0; i < e.length; ++i) m(e[i], t, n);
 }
 for (var b, y, w = {
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
 }, x = {
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
 }, S = {}, T = {}, E = {}, _ = !1, I = !1, P = 1; 20 > P; ++P) w[111 + P] = "f" + P;
 for (P = 0; 9 >= P; ++P) w[P + 96] = P;
 e(document, "keypress", l), e(document, "keydown", l), e(document, "keyup", l);
 var $ = {
  bind: function(e, t, n) {
   return e = e instanceof Array ? e : [ e ], v(e, t, n), this;
  },
  unbind: function(e, t) {
   return $.bind(e, function() {}, t);
  },
  trigger: function(e, t) {
   return T[e + ":" + t] && T[e + ":" + t]({}, e), this;
  },
  reset: function() {
   return S = {}, T = {}, this;
  },
  stopCallback: function(e, t) {
   return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.contentEditable && "true" == t.contentEditable;
  },
  handleKey: a
 };
 window.Mousetrap = $, "function" == typeof define && define.amd && define("mousetrap", $);
}(), define("text!html/documentSelectorSettingsBlock.html", [], function() {
 return '<p>Builds the "Open document" dropdown menu.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="select-document-selector-orderby">Order\n			by</label>\n		<div class="col-lg-6">\n			<select id="select-document-selector-orderby" class="form-control">\n				<option value="title">Document title</option>\n				<option value="mru">Most recently used</option>\n			</select>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-previous">"Previous"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-previous"\n				class="form-control">\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-next">"Next"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-next"\n				class="form-control">\n		</div>\n	</div>\n</div>';
}), define("extensions/documentSelector", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "mousetrap", "fileSystem", "text!html/documentSelectorSettingsBlock.html" ], function(e, t, n, i, o, r, s, a) {
 var l = new o("documentSelector", "Document Selector", !0, !0);
 l.settingsBlock = a, l.defaultConfig = {
  orderBy: "mru",
  shortcutPrevious: "Ctrl+[",
  shortcutNext: "Ctrl+]"
 }, l.onLoadSettings = function() {
  i.setInputValue("#select-document-selector-orderby", l.config.orderBy), i.setInputValue("#input-document-selector-shortcut-previous", l.config.shortcutPrevious), 
  i.setInputValue("#input-document-selector-shortcut-next", l.config.shortcutNext);
 }, l.onSaveSettings = function(e, t) {
  e.orderBy = i.getInputValue("#select-document-selector-orderby"), e.shortcutPrevious = i.getInputTextValue("#input-document-selector-shortcut-previous", t), 
  e.shortcutNext = i.getInputTextValue("#input-document-selector-shortcut-next", t);
 };
 var c = void 0;
 l.onFileMgrCreated = function(e) {
  c = e;
 };
 var u = [ '<li class="<%= isCurrent ? "disabled" : "" %>" data-file-index="<%= fileDesc.fileIndex %>">', '   <a href="#">', "       <%= fileDesc.composeTitle() %>", "   </a>", "</li>" ].join(""), d = void 0, p = void 0, f = void 0, h = void 0, g = void 0, m = void 0, v = void 0, b = function() {
  var n = t.chain(s).sortBy(g).reduce(function(e, n) {
   return e + t.template(u, {
    fileDesc: n,
    isCurrent: n === m
   });
  }, "").value();
  p.innerHTML = n, h = [], f = {}, t.each(p.querySelectorAll("li"), function(t) {
   var n = e(t);
   h.push(n);
   var i = s[n.data("fileIndex")];
   f[i.fileIndex] = n, n.find("a").click(function() {
    v = void 0, n.hasClass("disabled") ? d.focus() : c.selectFile(i);
   });
  });
 };
 return l.onFileSelected = function(e) {
  m = e, b();
 }, l.onFileCreated = b, l.onFileDeleted = b, l.onTitleChanged = b, l.onSyncExportSuccess = b, 
 l.onSyncRemoved = b, l.onNewPublishSuccess = b, l.onPublishRemoved = b, l.onReady = function() {
  d = e("#wmd-input"), "title" == l.config.orderBy ? g = function(e) {
   return e.title.toLowerCase();
  } : "mru" == l.config.orderBy && (g = function(e) {
   return -e.selectTime;
  }), p = n("ul", {
   "class": "dropdown-menu dropdown-file-selector"
  }), document.querySelector(".ui-layout-resizer-north").appendChild(n("div", n("div", {
   "data-toggle": "dropdown"
  }), p));
  var i = e(p).dropdown(), o = e(".document-panel .collapse-button");
  o.prop("title", t.template("<%= title %>  <%= shortcutPrevious %>  <%= shortcutNext %>", {
   title: o.prop("title"),
   shortcutPrevious: l.config.shortcutPrevious,
   shortcutNext: l.config.shortcutNext
  }));
  var s = l.config.shortcutPrevious.toLowerCase();
  r.bind(s, function() {
   void 0 === v && (i.dropdown("toggle"), v = f[m.fileIndex]);
   var e = t.indexOf(h, v) - 1;
   return -2 === e && (e = -1), v = h[(e + h.length) % h.length], t.defer(function() {
    v.find("a").focus();
   }), !1;
  });
  var a = l.config.shortcutNext.toLowerCase();
  r.bind(l.config.shortcutNext.toLowerCase(), function() {
   void 0 === v && (i.dropdown("toggle"), v = f[m.fileIndex]);
   var e = t.indexOf(h, v) + 1;
   return v = h[e % h.length], t.defer(function() {
    v.find("a").focus();
   }), !1;
  });
  var c = s.indexOf("+"), u = -1 === c ? s : s.substring(0, c), b = a.indexOf("+"), y = -1 === b ? a : a.substring(0, b);
  r.bind([ u, y ], function() {
   void 0 !== v && v.find("a").click();
  }, "keyup");
 }, l;
}), define("classes/FolderDescriptor", [ "underscore", "utils", "fileSystem" ], function(e, t, n) {
 function i(i, o) {
  this.folderIndex = i, this._name = o || localStorage[i + ".name"], this.fileList = {}, 
  e.each(t.retrieveIndexArray(i + ".files"), function(e) {
   try {
    var o = n[e];
    o.folder = this, this.fileList[e] = o;
   } catch (r) {
    t.removeIndexFromArray(i + ".files", e);
   }
  }, this), Object.defineProperty(this, "name", {
   get: function() {
    return this._name;
   },
   set: function(e) {
    this._name = e, localStorage[this.folderIndex + ".name"] = e;
   }
  });
 }
 return i.prototype.addFile = function(e) {
  e.folder = this, t.appendIndexToArray(this.folderIndex + ".files", e.fileIndex), 
  this.fileList[e.fileIndex] = e;
 }, i.prototype.removeFile = function(e) {
  e.folder = void 0, t.removeIndexFromArray(this.folderIndex + ".files", e.fileIndex), 
  delete this.fileList[e.fileIndex];
 }, i;
}), define("folderList", [ "underscore", "utils", "classes/FolderDescriptor", "storage" ], function(e, t, n) {
 var i = {};
 return e.each(t.retrieveIndexArray("folder.list"), function(e) {
  i[e] = new n(e);
 }), i;
}), define("extensions/documentPanel", [ "jquery", "underscore", "utils", "classes/Extension", "folderList", "fileSystem" ], function(e, t, n, i, o, r) {
 function s(n) {
  if (n != b) {
   if (b = n, v.scrollTop = 0, !n) return g.addClass("hide"), f.removeClass("hide"), 
   void 0;
   var i = n.toLowerCase().split(/\s+/);
   t.each(h.querySelectorAll(".file"), function(n) {
    var o = e(n), r = o.text().toLowerCase();
    o.toggle(!t.some(i, function(e) {
     return -1 === r.indexOf(e);
    }));
   }), g.removeClass("hide"), f.addClass("hide");
  }
 }
 var a = new i("documentPanel", "Document Panel"), l = void 0;
 a.onFileMgrCreated = function(e) {
  l = e;
 };
 var c = [ '<a href="#"', ' class="list-group-item folder clearfix"', ' data-folder-index="<%= folderDesc.folderIndex %>"', ' data-toggle="collapse"', ' data-target=".document-panel .file-list.<%= id %>">', '   <div class="pull-right file-count">', "       <%= _.size(folderDesc.fileList) %>", "   </div>", '   <i class="icon-folder"></i> <%= folderDesc.name %>', "</a>", '<div class="file-list collapse <%= id %> clearfix">', "   <%= fileListHtml %>", "</div>" ].join(""), u = [ '<a href="#"', ' class="list-group-item file<%= fileDesc === selectedFileDesc ? " active" : "" %>"', ' data-file-index="<%= fileDesc.fileIndex %>"', ' data-toggle="collapse"', ' data-target=".document-panel">', "   <%= fileDesc.composeTitle() %>", "</a>" ].join(""), d = void 0, p = void 0, f = void 0, h = void 0, g = void 0, m = function() {
  var n = t.filter(r, function(e) {
   return void 0 === e.folder;
  }), i = t.chain(n).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + "<li>" + t.template(u, {
    fileDesc: n
   }) + "</li>";
  }, "").value();
  i = i && '<ul class="nav">' + i + "</ul>", t.chain(o).sortBy(function(e) {
   return e.name.toLowerCase();
  }).each(function(e) {
   var n = t.chain(e.fileList).sortBy(function(e) {
    return e.title.toLowerCase();
   }).reduce(function(e, n) {
    return e + "<li>" + t.template(u, {
     fileDesc: n
    }) + "</li>";
   }, "").value();
   n = n && '<ul class="nav">' + n + "</ul>", i += t.template(c, {
    folderDesc: e,
    fileListHtml: n,
    id: e.folderIndex.replace(".", "")
   });
  }), p.innerHTML = i;
  var s = t.chain(r).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + "<li>" + t.template(u, {
    fileDesc: n
   }) + "</li>";
  }, "").value();
  s = '<ul class="nav">' + s + "</ul>", h.innerHTML = s, t.each(p.querySelectorAll(".file"), function(t) {
   var n = e(t);
   n.click(function() {
    var e = r[n.data("fileIndex")];
    e && e !== selectedFileDesc && l.selectFile(e);
   });
  });
 };
 a.onFileSelected = function(e) {
  selectedFileDesc = e, m();
 }, a.onFileCreated = m, a.onFileDeleted = m, a.onTitleChanged = m, a.onSyncExportSuccess = m, 
 a.onSyncRemoved = m, a.onNewPublishSuccess = m, a.onPublishRemoved = m, a.onFoldersChanged = m;
 var v = void 0, b = "";
 return a.onReady = function() {
  d = document.querySelector(".document-panel"), v = d.querySelector(".panel-content"), 
  p = d.querySelector(".document-list"), f = e(p), h = d.querySelector(".document-list-filtered"), 
  g = e(h), e(d).on("show.bs.collapse", function(t) {
   if (t.target === d) {
    var n = selectedFileDesc.folder;
    void 0 !== n && e(d.querySelector(".file-list." + n.folderIndex.replace(".", ""))).collapse("show");
   }
  }).on("shown.bs.collapse", function(e) {
   e.target === d && (t.val(""), s(""), v.scrollTop += p.querySelector(".file.active").getBoundingClientRect().top - 120);
  });
  var t = e(d.querySelector(".search-bar .form-control"));
  t.bind("propertychange keyup input paste", function() {
   s(t.val());
  }), e(d.querySelector(".search-bar .close")).click(function() {
   t.val(""), s(""), t.focus();
  });
 }, a;
}), define("extensions/documentManager", [ "jquery", "underscore", "utils", "classes/Extension", "classes/FolderDescriptor", "folderList", "fileSystem", "config" ], function(e, t, n, i, o, r, s) {
 function a() {
  k = [], x = [], t.each(w.querySelectorAll('input[type="checkbox"]:checked'), function(t) {
   var n = e(t.parentNode.parentNode), i = r[n.data("folderIndex")], o = s[n.data("fileIndex")];
   void 0 !== i ? k.push(i) : void 0 !== o && x.push(o);
  });
 }
 function l() {
  if (0 === t.size(x)) return c(), void 0;
  var n = t.chain(x).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + t.template(v, {
    fileDesc: n
   });
  }, "").value();
  C.innerHTML = '<ul class="file-list nav">' + n + "</ul>", e(y.querySelectorAll(".document-list")).addClass("hide"), 
  e(y.querySelectorAll(".confirm-delete, .selected-document-list")).removeClass("hide");
 }
 function c() {
  t.each(x, function(e) {
   e.folder && e.folder.removeFile(e), p.deleteFile(e);
  }), t.each(k, function(e) {
   n.removeIndexFromArray("folder.list", e.folderIndex), delete r[e.folderIndex];
  }), f.onFoldersChanged();
 }
 function u() {
  a(), S.toggleClass("disabled", 0 === t.size(r) || 0 === t.size(x)), T.toggleClass("disabled", 0 === t.size(k) && 0 === t.size(x));
 }
 var d = new i("documentManager", "Document Manager", !1, !0), p = void 0;
 d.onFileMgrCreated = function(e) {
  p = e;
 };
 var f = void 0;
 d.onEventMgrCreated = function(e) {
  f = e;
 };
 var h = [ '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>" data-toggle="collapse" data-target=".modal-document-manager .file-list.<%= id %>">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>', '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>', '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>', '<div class="name"><i class="icon-folder"></i> ', "<%= folderDesc.name %></div>", '<input type="text" class="input-rename form-control hide"></a>', '<div class="file-list collapse <%= id %> clearfix"><%= fileListHtml %></div>' ].join(""), g = [ '<li class="list-group-item file clearfix" data-file-index="<%= fileDesc.fileIndex %>">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>', '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>', '<div class="name"><%= fileDesc.composeTitle() %></div>', '<input type="text" class="input-rename form-control hide"></li>' ].join(""), m = [ '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>">', '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>', '<div class="name"><i class="icon-forward"></i> ', "<%= folderDesc.name %></div></a>" ].join(""), v = [ '<li class="list-group-item file clearfix">', '<div class="name"><%= fileDesc.composeTitle() %></div></li>' ].join(""), b = !1, y = void 0, w = void 0, x = [], k = [], C = void 0, S = void 0, T = void 0, E = void 0, _ = void 0, I = void 0, P = function() {
  if (b !== !1) {
   u(), _.text(t.size(s)), I.text(t.size(r) + 1), E = t.filter(s, function(e) {
    return void 0 === e.folder;
   });
   var n = [ '<a href="#" class="list-group-item folder clearfix" data-toggle="collapse" data-target=".modal-document-manager .file-list.root-folder">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<div class="pull-right file-count">', t.size(E), "</div>", '<div class="name"><i class="icon-folder"></i> ', "ROOT folder</div></a>" ].join(""), i = t.chain(E).sortBy(function(e) {
    return e.title.toLowerCase();
   }).reduce(function(e, n) {
    return e + t.template(g, {
     fileDesc: n
    });
   }, "").value();
   i = i && '<ul class="nav">' + i + "</ul>", n += '<div class="file-list collapse root-folder clearfix">' + i + "</div>", 
   t.chain(r).sortBy(function(e) {
    return e.name.toLowerCase();
   }).each(function(e) {
    var i = t.chain(e.fileList).sortBy(function(e) {
     return e.title.toLowerCase();
    }).reduce(function(e, n) {
     return e + t.template(g, {
      fileDesc: n
     });
    }, "").value();
    i = i && '<ul class="nav">' + i + "</ul>", n += t.template(h, {
     folderDesc: e,
     fileListHtml: i,
     id: e.folderIndex.replace(".", "")
    });
   }), w.innerHTML = n, t.each(w.querySelectorAll(".button-delete"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
     var t = n.parent(), i = r[t.data("folderIndex")], o = s[t.data("fileIndex")];
     x = [], k = [], i ? (k.push(i), x = i.fileList) : o && x.push(o), l();
    });
   }), t.each(w.querySelectorAll(".button-rename"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
     var t = n.parent(), i = void 0, o = r[t.data("folderIndex")], a = s[t.data("fileIndex")];
     o ? i = o.name : a && (i = a.title), t.find(".name").addClass("hide"), t.find(".input-rename").removeClass("hide").val(i)[0].select();
    });
   }), t.each(w.querySelectorAll(".input-rename"), function(t) {
    function n() {
     var t = i.parent(), n = e.trim(i.val()), o = r[t.data("folderIndex")], a = s[t.data("fileIndex")];
     n && o && n != o.name ? (o.name = n, f.onFoldersChanged()) : n && a && n != a.title ? (a.title = n, 
     f.onTitleChanged(a)) : (i.addClass("hide"), t.find(".name").removeClass("hide"));
    }
    var i = e(t);
    i.blur(function() {
     n();
    }).keyup(function(e) {
     13 == e.keyCode && (n(), e.stopPropagation()), 27 == e.keyCode && (i.val(""), n(), 
     e.stopPropagation());
    });
   }), t.each(w.querySelectorAll(".folder .checkbox"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
    }).find("[type=checkbox]").change(function() {
     var e = n.parent().next().find("[type=checkbox]");
     this.checked ? e.prop("checked", !0).prop("disabled", !0) : e.prop("checked", !1).prop("disabled", !1);
    });
   }), e(w.querySelectorAll("[type=checkbox]")).change(u);
  }
 };
 return d.onFileCreated = P, d.onFileDeleted = P, d.onTitleChanged = P, d.onSyncExportSuccess = P, 
 d.onSyncRemoved = P, d.onNewPublishSuccess = P, d.onPublishRemoved = P, d.onFoldersChanged = P, 
 d.onReady = function() {
  y = document.querySelector(".modal-document-manager"), w = y.querySelector(".list-group.document-list"), 
  _ = e(y.querySelectorAll(".document-count")), I = e(y.querySelectorAll(".folder-count")), 
  C = y.querySelector(".list-group.selected-document-list");
  var i = y.querySelector(".list-group.select-folder-list");
  e(y).on("show.bs.modal", function() {
   b = !0, P();
  }).on("hide.bs.modal", function() {
   b = !1;
  }), e(y.querySelectorAll(".action-create-folder")).click(function() {
   var i = void 0;
   do i = "folder." + n.randomString(); while (t.has(r, i));
   localStorage[i + ".name"] = DEFAULT_FOLDER_NAME;
   var s = new o(i, DEFAULT_FOLDER_NAME);
   n.appendIndexToArray("folder.list", i), r[i] = s, f.onFoldersChanged();
   var a = e(y.querySelector('[data-folder-index="' + i + '"] .button-rename')).click();
   y.scrollTop += a.offset().top - 50;
  }), e(y.querySelectorAll(".action-select-all")).click(function() {
   e(w.querySelectorAll('input[type="checkbox"]')).prop("checked", !0).change();
  }), e(y.querySelectorAll(".action-unselect-all")).click(function() {
   e(w.querySelectorAll('input[type="checkbox"]')).prop("checked", !1).change();
  });
  var s = e(y.querySelectorAll(".action-delete-items")).click(function() {
   T.hasClass("disabled") || (a(), l());
  });
  T = s.parent(), e(y.querySelectorAll(".action-delete-items-confirm")).click(function() {
   c(), e(y.querySelectorAll(".document-list")).removeClass("hide"), e(y.querySelectorAll(".confirm-delete, .selected-document-list")).addClass("hide");
  });
  var u = e(y.querySelectorAll(".action-move-items")).click(function() {
   if (!S.hasClass("disabled")) {
    a();
    var n = [ '<a href="#" class="list-group-item folder clearfix">', '<div class="pull-right file-count">', t.size(E), "</div>", '<div class="name"><i class="icon-forward"></i> ', "ROOT folder</div></a>" ].join("");
    n += t.chain(r).sortBy(function(e) {
     return e.name.toLowerCase();
    }).reduce(function(e, n) {
     return e + t.template(m, {
      folderDesc: n
     });
    }, "").value(), i.innerHTML = n, t.each(i.querySelectorAll(".folder"), function(n) {
     n = e(n), n.click(function() {
      var i = r[n.data("folderIndex")];
      t.each(x, function(e) {
       e.folder && e.folder.removeFile(e), i && i.addFile(e);
      }), f.onFoldersChanged(), e(y.querySelectorAll(".document-list")).removeClass("hide"), 
      e(y.querySelectorAll(".choose-folder, .select-folder-list")).addClass("hide");
     });
    }), e(y.querySelectorAll(".document-list")).addClass("hide"), e(y.querySelectorAll(".choose-folder, .select-folder-list")).removeClass("hide");
   }
  });
  S = u.parent(), e(y.querySelectorAll(".action-cancel")).click(function() {
   e(y.querySelectorAll(".document-list")).removeClass("hide"), e(y.querySelectorAll(".confirm-delete, .choose-folder, .selected-document-list, .select-folder-list")).addClass("hide");
  });
 }, d;
}), define("extensions/workingIndicator", [ "jquery", "underscore", "classes/Extension" ], function(e, t, n) {
 var i = new n("workingIndicator", "Working Indicator"), o = void 0, r = void 0;
 return i.onAsyncRunning = function(e) {
  o.toggleClass("working", e), r.toggleClass("show", e);
 }, i.onReady = function() {
  o = e(document.body), r = e(".working-indicator");
 }, i;
}), function(e) {
 var t = function() {
  return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace;
 }();
 e.jGrowl = function(t, n) {
  0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(n && n.position ? n.position : e.jGrowl.defaults.position).appendTo("body"), 
  e("#jGrowl").jGrowl(t, n);
 }, e.fn.jGrowl = function(t, n) {
  if (e.isFunction(this.each)) {
   var i = arguments;
   return this.each(function() {
    void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl(), {
     notifications: [],
     element: null,
     interval: null
    })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(i).slice(1)) : e(this).data("jGrowl.instance").create(t, n);
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
   var n = this, i = t.message, o = t.options;
   o.themeState = "" == o.themeState ? "" : "ui-state-" + o.themeState;
   var t = e("<div/>").addClass("jGrowl-notification " + o.themeState + " ui-corner-all" + (void 0 != o.group && "" != o.group ? " " + o.group : "")).append(e("<div/>").addClass("jGrowl-close").html(o.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(o.header)).append(e("<div/>").addClass("jGrowl-message").html(i)).data("jGrowl", o).addClass(o.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
    e(this).parent().trigger("jGrowl.beforeClose");
   }).parent();
   e(t).bind("mouseover.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !0);
   }).bind("mouseout.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !1);
   }).bind("jGrowl.beforeOpen", function() {
    o.beforeOpen.apply(t, [ t, i, o, n.element ]) !== !1 && e(this).trigger("jGrowl.open");
   }).bind("jGrowl.open", function() {
    o.open.apply(t, [ t, i, o, n.element ]) !== !1 && ("after" == o.glue ? e("div.jGrowl-notification:last", n.element).after(t) : e("div.jGrowl-notification:first", n.element).before(t), 
    e(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
     e.support.opacity === !1 && this.style.removeAttribute("filter"), null !== e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date()), 
     e(this).trigger("jGrowl.afterOpen");
    }));
   }).bind("jGrowl.afterOpen", function() {
    o.afterOpen.apply(t, [ t, i, o, n.element ]);
   }).bind("jGrowl.beforeClose", function() {
    o.beforeClose.apply(t, [ t, i, o, n.element ]) !== !1 && e(this).trigger("jGrowl.close");
   }).bind("jGrowl.close", function() {
    e(this).data("jGrowl.pause", !0), e(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
     e.isFunction(o.close) ? o.close.apply(t, [ t, i, o, n.element ]) !== !1 && e(this).remove() : e(this).remove();
    });
   }).trigger("jGrowl.beforeOpen"), "" != o.corners && void 0 != e.fn.corner && e(t).corner(o.corners), 
   e("div.jGrowl-notification:parent", n.element).size() > 1 && 0 == e("div.jGrowl-closer", n.element).size() && this.defaults.closer !== !1 && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(n.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
    e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(n.defaults.closer) && n.defaults.closer.apply(e(this).parent()[0], [ e(this).parent()[0] ]);
   });
  },
  update: function() {
   e(this.element).find("div.jGrowl-notification:parent").each(function() {
    void 0 != e(this).data("jGrowl") && void 0 !== e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < new Date().getTime() && e(this).data("jGrowl").sticky !== !0 && (void 0 == e(this).data("jGrowl.pause") || e(this).data("jGrowl.pause") !== !0) && e(this).trigger("jGrowl.beforeClose");
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
   e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty(), 
   clearInterval(this.interval);
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
 return '<p>Shows notification messages in the bottom-right corner of the\n	screen.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="input-notifications-timeout">Timeout</label>\n		<div class="col-lg-7 form-inline">\n			<input type="text" id="input-notifications-timeout"\n				class="col-lg-5 form-control"> <span class="help-inline">ms</span>\n		</div>\n	</div>\n</div>';
}), define("extensions/notifications", [ "jquery", "underscore", "utils", "classes/Extension", "jgrowl", "text!html/notificationsSettingsBlock.html" ], function(e, t, n, i, o, r) {
 function s() {
  c === !1 && (o.defaults.life = l.config.timeout, o.defaults.closer = !1, o.defaults.closeTemplate = "", 
  o.defaults.position = "bottom-right", c = !0);
 }
 function a(e, n, i) {
  if (logger.info(e), s(), e) {
   var r = e.indexOf("|");
   (-1 === r || (e = e.substring(0, r))) && (i = i || {}, n = n || "icon-info-circled", 
   o("<i class='icon-white " + n + "'></i> " + t.escape(e), i));
  }
 }
 var l = new i("notifications", "Notifications");
 l.settingsBlock = r, l.defaultConfig = {
  timeout: 8e3
 }, l.onLoadSettings = function() {
  n.setInputValue("#input-notifications-timeout", l.config.timeout);
 }, l.onSaveSettings = function(e, t) {
  e.timeout = n.getInputIntValue("#input-notifications-timeout", t, 1, 6e4);
 };
 var c = !1;
 return l.onMessage = function(e) {
  a(e);
 }, l.onError = function(e) {
  logger.error(e), t.isString(e) ? a(e, "icon-attention") : t.isObject(e) && a(e.message, "icon-attention");
 }, l.onOfflineChanged = function(t) {
  t === !0 ? a("You are offline.", "icon-attention-circled msg-offline", {
   sticky: !0,
   close: function() {
    a("You are back online!", "icon-signal");
   }
  }) : e(".msg-offline").parents(".jGrowl-notification").trigger("jGrowl.beforeClose");
 }, l.onSyncImportSuccess = function(e, n) {
  var i = t.map(e, function(e) {
   return e.title;
  }).join(", ");
  a(i + " imported successfully from " + n.providerName + ".");
 }, l.onSyncExportSuccess = function(e, t) {
  a('"' + e.title + '" will now be synchronized on ' + t.provider.providerName + ".");
 }, l.onSyncRemoved = function(e, t) {
  a(t.provider.providerName + " synchronized location has been removed.");
 }, l.onPublishSuccess = function(e) {
  a('"' + e.title + '" successfully published.');
 }, l.onNewPublishSuccess = function(e, t) {
  a('"' + e.title + '" is now published on ' + t.provider.providerName + ".");
 }, l.onPublishRemoved = function(e, t) {
  a(t.provider.providerName + " publish location has been removed.");
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
 function t() {
  return !1;
 }
 function n() {}
 function i() {}
 n.prototype = {
  chain: function(t, n) {
   var i = this[t];
   if (!i) throw new Error("unknown hook " + t);
   this[t] = i === e ? n : function() {
    var e = Array.prototype.slice.call(arguments, 0);
    return e[0] = i.apply(null, e), n.apply(null, e);
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
 }, Markdown.HookCollection = n, i.prototype = {
  set: function(e, t) {
   this["s_" + e] = t;
  },
  get: function(e) {
   return this["s_" + e];
  }
 }, Markdown.Converter = function() {
  function e(e) {
   return e = e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t, n, i, o, r) {
    return t = t.toLowerCase(), M.set(t, C(n)), o ? i : (r && A.set(t, r.replace(/"/g, "&quot;")), 
    "");
   });
  }
  function t(e) {
   return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, o), 
   e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, o), 
   e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, o), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, o), 
   e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, o);
  }
  function o(e, t) {
   var n = t;
   return n = n.replace(/^\n+/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (z.push(n) - 1) + "K\n\n";
  }
  function r(e, n) {
   e = R.preBlockGamut(e, O), e = f(e);
   var i = "<hr />\n";
   return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, i), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, i), 
   e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, i), e = h(e), e = m(e), e = x(e), 
   e = R.postBlockGamut(e, O), e = t(e), e = k(e, n);
  }
  function s(e) {
   return e = R.preSpanGamut(e), e = b(e), e = a(e), e = S(e), e = u(e), e = l(e), 
   e = E(e), e = e.replace(/~P/g, "://"), e = C(e), e = w(e), e = e.replace(/  +\n/g, " <br>\n"), 
   e = R.postSpanGamut(e);
  }
  function a(e) {
   var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
   return e = e.replace(t, function(e) {
    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
    return t = N(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_");
   });
  }
  function l(e) {
   return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, c), 
   e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
   e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, c);
  }
  function c(e, t, n, i, o, r, s, a) {
   void 0 == a && (a = "");
   var l = t, c = n.replace(/:\/\//g, "~P"), u = i.toLowerCase(), p = o, f = a;
   if ("" == p) if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, 
   void 0 != M.get(u)) p = M.get(u), void 0 != A.get(u) && (f = A.get(u)); else {
    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
    p = "";
   }
   p = $(p), p = N(p, "*_");
   var h = '<a href="' + p + '"';
   return "" != f && (f = d(f), f = N(f, "*_"), h += ' title="' + f + '"'), h += ">" + c + "</a>";
  }
  function u(e) {
   return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p);
  }
  function d(e) {
   return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function p(e, t, n, i, o, r, s, a) {
   var l = t, c = n, u = i.toLowerCase(), p = o, f = a;
   if (f || (f = ""), "" == p) {
    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, void 0 == M.get(u)) return l;
    p = M.get(u), void 0 != A.get(u) && (f = A.get(u));
   }
   c = N(d(c), "*_[]()"), p = N(p, "*_");
   var h = '<img src="' + p + '" alt="' + c + '"';
   return f = d(f), f = N(f, "*_"), h += ' title="' + f + '"', h += " />";
  }
  function f(e) {
   return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
    return '<h1 class="wmd-title">' + s(t) + "</h1>\n\n";
   }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
    return '<h2 class="wmd-title">' + s(t) + "</h2>\n\n";
   }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
    var i = t.length;
    return "<h" + i + ' class="wmd-title">' + s(n) + "</h" + i + ">\n\n";
   });
  }
  function h(e, t) {
   e += "~0";
   var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
   return D ? e = e.replace(n, function(e, n, i) {
    var o = n, r = i.search(/[*+-]/g) > -1 ? "ul" : "ol", s = g(o, r, t);
    return s = s.replace(/\s+$/, ""), s = "<" + r + ">" + s + "</" + r + ">\n";
   }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
   e = e.replace(n, function(e, t, n, i) {
    var o = t, r = n, s = i.search(/[*+-]/g) > -1 ? "ul" : "ol", a = g(r, s);
    return a = o + "<" + s + ">\n" + a + "</" + s + ">\n";
   })), e = e.replace(/~0/, "");
  }
  function g(e, t, n) {
   D++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
   var i = j[t], o = new RegExp("(^[ \\t]*)(" + i + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + i + ")[ \\t]+))", "gm"), a = !1;
   return e = e.replace(o, function(e, t, i, o) {
    var l = o, c = /\n\n$/.test(l), u = c || l.search(/\n{2,}/) > -1;
    return u || a ? l = r(I(l), !0) : (l = h(I(l), !0), l = l.replace(/\n$/, ""), n || (l = s(l))), 
    a = c, "<li>" + l + "</li>\n";
   }), e = e.replace(/~0/g, ""), D--, e;
  }
  function m(e) {
   return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
    var i = t, o = n;
    return i = y(I(i)), i = P(i), i = i.replace(/^\n+/g, ""), i = i.replace(/\n+$/g, ""), 
    i = "<pre><code>" + i + "\n</code></pre>", "\n\n" + i + "\n\n" + o;
   }), e = e.replace(/~0/, "");
  }
  function v(e) {
   return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (z.push(e) - 1) + "K\n\n";
  }
  function b(e) {
   return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, i) {
    var o = i;
    return o = o.replace(/^([ \t]*)/g, ""), o = o.replace(/[ \t]*$/g, ""), o = y(o), 
    o = o.replace(/:\/\//g, "~P"), t + "<code>" + o + "</code>";
   });
  }
  function y(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = N(e, "*_{}[]\\", !1);
  }
  function w(e) {
   return e = e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g, "$1<strong>$3</strong>$4"), 
   e = e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g, "$1<em>$3</em>$4");
  }
  function x(e) {
   return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
    var n = t;
    return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), 
    n = r(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
     var n = t;
     return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "");
    }), v("<blockquote>\n" + n + "\n</blockquote>");
   });
  }
  function k(e, t) {
   e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
   for (var n = e.split(/\n{2,}/g), i = [], o = /~K(\d+)K/, r = n.length, a = 0; r > a; a++) {
    var l = n[a];
    o.test(l) ? i.push(l) : /\S/.test(l) && (l = s(l), l = l.replace(/^([ \t]*)/g, "<p>"), 
    l += "</p>", i.push(l));
   }
   if (!t) {
    r = i.length;
    for (var a = 0; r > a; a++) for (var c = !0; c; ) c = !1, i[a] = i[a].replace(/~K(\d+)K/g, function(e, t) {
     return c = !0, z[t];
    });
   }
   return i.join("\n\n");
  }
  function C(e) {
   return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
  }
  function S(e) {
   return e = e.replace(/\\(\\)/g, L), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, L);
  }
  function T(e, t, n, i) {
   if (t) return e;
   if (")" !== i.charAt(i.length - 1)) return "<" + n + i + ">";
   for (var o = i.match(/[()]/g), r = 0, s = 0; s < o.length; s++) "(" === o[s] ? 0 >= r ? r = 1 : r++ : r--;
   var a = "";
   if (0 > r) {
    var l = new RegExp("\\){1," + -r + "}$");
    i = i.replace(l, function(e) {
     return a = e, "";
    });
   }
   if (a) {
    var c = i.charAt(i.length - 1);
    B.test(c) || (a = c + a, i = i.substr(0, i.length - 1));
   }
   return "<" + n + i + ">" + a;
  }
  function E(e) {
   e = e.replace(q, T);
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
   var t, n = [ "    ", "   ", "  ", " " ], i = 0;
   return e.replace(/[\n\t]/g, function(e, o) {
    return "\n" === e ? (i = o + 1, e) : (t = (o - i) % 4, i = o + 1, n[t]);
   });
  }
  function $(e) {
   return e ? (e.length, e.replace(W, function(e) {
    return "~D" == e ? "%24" : ":" == e ? ":" : "%" + e.charCodeAt(0).toString(16);
   })) : "";
  }
  function N(e, t, n) {
   var i = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
   n && (i = "\\\\" + i);
   var o = new RegExp(i, "g");
   return e = e.replace(o, L);
  }
  function L(e, t) {
   var n = t.charCodeAt(0);
   return "~E" + n + "E";
  }
  var R = this.hooks = new n();
  R.addNoop("plainLinkText"), R.addNoop("preConversion"), R.addNoop("postNormalization"), 
  R.addNoop("preBlockGamut"), R.addNoop("postBlockGamut"), R.addNoop("preSpanGamut"), 
  R.addNoop("postSpanGamut"), R.addNoop("postConversion");
  var M, A, z, D;
  this.makeHtml = function(n) {
   if (M) throw new Error("Recursive call to converter.makeHtml");
   return M = new i(), A = new i(), z = [], D = 0, n = R.preConversion(n), n = n.replace(/~/g, "~T"), 
   n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), 
   n = "\n\n" + n + "\n\n", n = P(n), n = n.replace(/^[ \t]+$/gm, ""), n = R.postNormalization(n), 
   n = t(n), n = e(n), n = r(n), n = _(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), 
   n = R.postConversion(n), z = A = M = null, n;
  };
  var O = function(e) {
   return r(e);
  }, j = {
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
  function i(e) {
   var i = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), o = [], r = "^" === i[0], s = [ "[" ];
   r && s.push("^");
   for (var a = r ? 1 : 0, l = i.length; l > a; ++a) {
    var c = i[a];
    if (/\\[bdsw]/i.test(c)) s.push(c); else {
     var u, d = t(c);
     l > a + 2 && "-" === i[a + 1] ? (u = t(i[a + 2]), a += 2) : u = d, o.push([ d, u ]), 
     65 > u || d > 122 || (65 > u || d > 90 || o.push([ 32 | Math.max(65, d), 32 | Math.min(u, 90) ]), 
     97 > u || d > 122 || o.push([ -33 & Math.max(97, d), -33 & Math.min(u, 122) ]));
    }
   }
   o.sort(function(e, t) {
    return e[0] - t[0] || t[1] - e[1];
   });
   for (var p = [], f = [], a = 0; a < o.length; ++a) {
    var h = o[a];
    h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : p.push(f = h);
   }
   for (var a = 0; a < p.length; ++a) {
    var h = p[a];
    s.push(n(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && s.push("-"), s.push(n(h[1])));
   }
   return s.push("]"), s.join("");
  }
  function o(e) {
   for (var t = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), o = t.length, a = [], l = 0, c = 0; o > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c; else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && (c >= d ? a[d] = -1 : t[l] = n(d));
    }
   }
   for (var l = 1; l < a.length; ++l) -1 === a[l] && (a[l] = ++r);
   for (var l = 0, c = 0; o > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c, a[c] || (t[l] = "(?:"); else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && c >= d && (t[l] = "\\" + a[d]);
    }
   }
   for (var l = 0; o > l; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
   if (e.ignoreCase && s) for (var l = 0; o > l; ++l) {
    var u = t[l], p = u.charAt(0);
    u.length >= 2 && "[" === p ? t[l] = i(u) : "\\" !== p && (t[l] = u.replace(/[a-zA-Z]/g, function(e) {
     var t = e.charCodeAt(0);
     return "[" + String.fromCharCode(-33 & t, 32 | t) + "]";
    }));
   }
   return t.join("");
  }
  for (var r = 0, s = !1, a = !1, l = 0, c = e.length; c > l; ++l) {
   var u = e[l];
   if (u.ignoreCase) a = !0; else if (/[a-z]/i.test(u.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
    s = !0, a = !1;
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
   p.push("(?:" + o(u) + ")");
  }
  return new RegExp(p.join("|"), a ? "gi" : "g");
 }
 function t(e, t) {
  function n(e) {
   var l = e.nodeType;
   if (1 == l) {
    if (i.test(e.className)) return;
    for (var c = e.firstChild; c; c = c.nextSibling) n(c);
    var u = e.nodeName.toLowerCase();
    ("br" === u || "li" === u) && (o[a] = "\n", s[a << 1] = r++, s[1 | a++ << 1] = e);
   } else if (3 == l || 4 == l) {
    var d = e.nodeValue;
    d.length && (d = t ? d.replace(/\r\n?/g, "\n") : d.replace(/[ \t\r\n]+/g, " "), 
    o[a] = d, s[a << 1] = r, r += d.length, s[1 | a++ << 1] = e);
   }
  }
  var i = /(?:^|\s)nocode(?:\s|$)/, o = [], r = 0, s = [], a = 0;
  return n(e), {
   sourceCode: o.join("").replace(/\n$/, ""),
   spans: s
  };
 }
 function n(e, t, n, i) {
  if (t) {
   var o = {
    sourceCode: t,
    basePos: e
   };
   n(o), i.push.apply(i, o.decorations);
  }
 }
 function i(e) {
  for (var t = void 0, n = e.firstChild; n; n = n.nextSibling) {
   var i = n.nodeType;
   t = 1 === i ? t ? e : n : 3 === i ? B.test(n.nodeValue) ? e : t : t;
  }
  return t === e ? void 0 : t;
 }
 function o(t, i) {
  var o, r = {};
  (function() {
   for (var n = t.concat(i), s = [], a = {}, l = 0, c = n.length; c > l; ++l) {
    var u = n[l], d = u[3];
    if (d) for (var p = d.length; --p >= 0; ) r[d.charAt(p)] = u;
    var f = u[1], h = "" + f;
    a.hasOwnProperty(h) || (s.push(f), a[h] = null);
   }
   s.push(/[\0-\uffff]/), o = e(s);
  })();
  var s = i.length, a = function(e) {
   for (var t = e.sourceCode, l = e.basePos, u = [ l, A ], d = 0, p = t.match(o) || [], f = {}, h = 0, g = p.length; g > h; ++h) {
    var m, v = p[h], b = f[v], y = void 0;
    if ("string" == typeof b) m = !1; else {
     var w = r[v.charAt(0)];
     if (w) y = v.match(w[1]), b = w[0]; else {
      for (var x = 0; s > x; ++x) if (w = i[x], y = v.match(w[1])) {
       b = w[0];
       break;
      }
      y || (b = A);
     }
     m = b.length >= 5 && "lang-" === b.substring(0, 5), !m || y && "string" == typeof y[1] || (m = !1, 
     b = O), m || (f[v] = b);
    }
    var k = d;
    if (d += v.length, m) {
     var C = y[1], S = v.indexOf(C), T = S + C.length;
     y[2] && (T = v.length - y[2].length, S = T - C.length);
     var E = b.substring(5);
     n(l + k, v.substring(0, S), a, u), n(l + k + S, C, c(E, C), u), n(l + k + T, v.substring(T), a, u);
    } else u.push(l + k, b);
   }
   e.decorations = u;
  };
  return a;
 }
 function r(e) {
  var t = [], n = [];
  e.tripleQuotedStrings ? t.push([ P, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\"" ]) : e.multiLineStrings ? t.push([ P, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`" ]) : t.push([ P, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'" ]), 
  e.verbatimStrings && n.push([ P, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null ]);
  var i = e.hashComments;
  i && (e.cStyleComments ? (i > 1 ? t.push([ N, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#" ]) : t.push([ N, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#" ]), 
  n.push([ P, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null ])) : t.push([ N, /^#[^\r\n]*/, null, "#" ])), 
  e.cStyleComments && (n.push([ N, /^\/\/[^\r\n]*/, null ]), n.push([ N, /^\/\*[\s\S]*?(?:\*\/|$)/, null ]));
  var r = e.regexLiterals;
  if (r) {
   var s = r > 1 ? "" : "\n\r", a = s ? "." : "[\\S\\s]", l = "/(?=[^/*" + s + "])" + "(?:[^/\\x5B\\x5C" + s + "]" + "|\\x5C" + a + "|\\x5B(?:[^\\x5C\\x5D" + s + "]" + "|\\x5C" + a + ")*(?:\\x5D|$))+" + "/";
   n.push([ "lang-regex", RegExp("^" + q + "(" + l + ")") ]);
  }
  var c = e.types;
  c && n.push([ L, c ]);
  var u = ("" + e.keywords).replace(/^ | $/g, "");
  u.length && n.push([ $, new RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), null ]), 
  t.push([ A, /^\s+/, null, " \r\n	 " ]);
  var d = "^.[^\\s\\w.$@'\"`/\\\\]*";
  return e.regexLiterals && (d += "(?!s*/)"), n.push([ R, /^@[a-z_$][a-z_$@0-9]*/i, null ], [ L, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null ], [ A, /^[a-z_$][a-z_$@0-9]*/i, null ], [ R, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789" ], [ A, /^\\[\s\S]?/, null ], [ M, new RegExp(d), null ]), 
  o(t, n);
 }
 function s(e, t, n) {
  function i(e) {
   var t = e.nodeType;
   if (1 != t || r.test(e.className)) {
    if ((3 == t || 4 == t) && n) {
     var l = e.nodeValue, c = l.match(s);
     if (c) {
      var u = l.substring(0, c.index);
      e.nodeValue = u;
      var d = l.substring(c.index + c[0].length);
      if (d) {
       var p = e.parentNode;
       p.insertBefore(a.createTextNode(d), e.nextSibling);
      }
      o(e), u || e.parentNode.removeChild(e);
     }
    }
   } else if ("br" === e.nodeName) o(e), e.parentNode && e.parentNode.removeChild(e); else for (var f = e.firstChild; f; f = f.nextSibling) i(f);
  }
  function o(e) {
   function t(e, n) {
    var i = n ? e.cloneNode(!1) : e, o = e.parentNode;
    if (o) {
     var r = t(o, 1), s = e.nextSibling;
     r.appendChild(i);
     for (var a = s; a; a = s) s = a.nextSibling, r.appendChild(a);
    }
    return i;
   }
   for (;!e.nextSibling; ) if (e = e.parentNode, !e) return;
   for (var n, i = t(e.nextSibling, 0); (n = i.parentNode) && 1 === n.nodeType; ) i = n;
   c.push(i);
  }
  for (var r = /(?:^|\s)nocode(?:\s|$)/, s = /\r\n?|\n/, a = e.ownerDocument, l = a.createElement("li"); e.firstChild; ) l.appendChild(e.firstChild);
  for (var c = [ l ], u = 0; u < c.length; ++u) i(c[u]);
  t === (0 | t) && c[0].setAttribute("value", t);
  var d = a.createElement("ol");
  d.className = "linenums";
  for (var p = Math.max(0, 0 | t - 1) || 0, u = 0, f = c.length; f > u; ++u) l = c[u], 
  l.className = "L" + (u + p) % 10, l.firstChild || l.appendChild(a.createTextNode(" ")), 
  d.appendChild(l);
  e.appendChild(d);
 }
 function a(e) {
  var t = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
  t = t && +t[1] <= 8;
  var n = /\n/g, i = e.sourceCode, o = i.length, r = 0, s = e.spans, a = s.length, l = 0, c = e.decorations, u = c.length, d = 0;
  c[u] = o;
  var p, f;
  for (f = p = 0; u > f; ) c[f] !== c[f + 2] ? (c[p++] = c[f++], c[p++] = c[f++]) : f += 2;
  for (u = p, f = p = 0; u > f; ) {
   for (var h = c[f], g = c[f + 1], m = f + 2; u >= m + 2 && c[m + 1] === g; ) m += 2;
   c[p++] = h, c[p++] = g, f = m;
  }
  u = c.length = p;
  var v, b = e.sourceNode;
  b && (v = b.style.display, b.style.display = "none");
  try {
   for (;a > l; ) {
    s[l];
    var y, w = s[l + 2] || o, x = c[d + 2] || o, m = Math.min(w, x), k = s[l + 1];
    if (1 !== k.nodeType && (y = i.substring(r, m))) {
     t && (y = y.replace(n, "\r")), k.nodeValue = y;
     var C = k.ownerDocument, S = C.createElement("span");
     S.className = c[d + 1];
     var T = k.parentNode;
     T.replaceChild(S, k), S.appendChild(k), w > r && (s[l + 1] = k = C.createTextNode(i.substring(m, w)), 
     T.insertBefore(k, S.nextSibling));
    }
    r = m, r >= w && (l += 2), r >= x && (d += 2);
   }
  } finally {
   b && (b.style.display = v);
  }
 }
 function l(e, t) {
  for (var n = t.length; --n >= 0; ) {
   var i = t[n];
   U.hasOwnProperty(i) ? f.console && console.warn("cannot override language handler %s", i) : U[i] = e;
  }
 }
 function c(e, t) {
  return e && U.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), 
  U[e];
 }
 function u(e) {
  var n = e.langExtension;
  try {
   var i = t(e.sourceNode, e.pre), o = i.sourceCode;
   e.sourceCode = o, e.spans = i.spans, e.basePos = 0, c(n, o)(e), a(e);
  } catch (r) {
   f.console && console.log(r && r.stack || r);
  }
 }
 function d(e, t, n) {
  var i = document.createElement("div");
  i.innerHTML = "<pre>" + e + "</pre>", i = i.firstChild, n && s(i, n, !0);
  var o = {
   langExtension: t,
   numberLines: n,
   sourceNode: i,
   pre: 1
  };
  return u(o), i.innerHTML;
 }
 function p(e, t) {
  function n(e) {
   return r.getElementsByTagName(e);
  }
  function o() {
   for (var t = f.PR_SHOULD_USE_CONTINUATION ? g.now() + 250 : 1/0; v < c.length && g.now() < t; v++) {
    for (var n = c[v], r = S, l = n; l = l.previousSibling; ) {
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
    if ((r !== S || y.test(h)) && !w.test(h)) {
     for (var T = !1, E = n.parentNode; E; E = E.parentNode) {
      var _ = E.tagName;
      if (C.test(_) && E.className && y.test(E.className)) {
       T = !0;
       break;
      }
     }
     if (!T) {
      n.className += " prettyprinted";
      var I = r.lang;
      if (!I) {
       I = h.match(b);
       var P;
       !I && (P = i(n)) && k.test(P.tagName) && (I = P.className.match(b)), I && (I = I[1]);
      }
      var $;
      if (x.test(n.tagName)) $ = 1; else {
       var N = n.currentStyle, L = a.defaultView, R = N ? N.whiteSpace : L && L.getComputedStyle ? L.getComputedStyle(n, null).getPropertyValue("white-space") : 0;
       $ = R && "pre" === R.substring(0, 3);
      }
      var M = r.linenums;
      (M = "true" === M || +M) || (M = h.match(/\blinenums\b(?::(\d+))?/), M = M ? M[1] && M[1].length ? +M[1] : !0 : !1), 
      M && s(n, M, $), m = {
       langExtension: I,
       sourceNode: n,
       numberLines: M,
       pre: $
      }, u(m);
     }
    }
   }
   v < c.length ? setTimeout(o, 250) : "function" == typeof e && e();
  }
  for (var r = t || document.body, a = r.ownerDocument || document, l = [ n("pre"), n("code"), n("xmp") ], c = [], d = 0; d < l.length; ++d) for (var p = 0, h = l[d].length; h > p; ++p) c.push(l[d][p]);
  l = null;
  var g = Date;
  g.now || (g = {
   now: function() {
    return +new Date();
   }
  });
  var m, v = 0, b = /\blang(?:uage)?-([\w.]+)(?!\S)/, y = /\bprettyprint\b/, w = /\bprettyprinted\b/, x = /pre|xmp/i, k = /^code$/i, C = /^(?:pre|code|xmp)$/i, S = {};
  o();
 }
 var f = window, h = [ "break,continue,do,else,for,if,return,while" ], g = [ h, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ], m = [ g, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof" ], v = [ m, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ], b = [ m, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient" ], y = [ b, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where" ], w = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", x = [ m, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ], k = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", C = [ h, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ], S = [ h, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ], T = [ h, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use" ], E = [ h, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ], _ = [ v, y, x, k, C, S, E ], I = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, P = "str", $ = "kwd", N = "com", L = "typ", R = "lit", M = "pun", A = "pln", z = "tag", D = "dec", O = "src", j = "atn", H = "atv", F = "nocode", q = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", B = /\S/, W = r({
  keywords: _,
  hashComments: !0,
  cStyleComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), U = {};
 l(W, [ "default-code" ]), l(o([], [ [ A, /^[^<?]+/ ], [ D, /^<!\w[^>]*(?:>|$)/ ], [ N, /^<\!--[\s\S]*?(?:-\->|$)/ ], [ "lang-", /^<\?([\s\S]+?)(?:\?>|$)/ ], [ "lang-", /^<%([\s\S]+?)(?:%>|$)/ ], [ M, /^(?:<[%?]|[%?]>)/ ], [ "lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i ], [ "lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i ], [ "lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i ], [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ] ]), [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ]), 
 l(o([ [ A, /^[\s]+/, null, " 	\r\n" ], [ H, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'" ] ], [ [ z, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i ], [ j, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ], [ "lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/ ], [ M, /^[=<>\/]+/ ], [ "lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i ], [ "lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i ], [ "lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i ], [ "lang-css", /^style\s*=\s*\"([^\"]+)\"/i ], [ "lang-css", /^style\s*=\s*\'([^\']+)\'/i ], [ "lang-css", /^style\s*=\s*([^\"\'>\s]+)/i ] ]), [ "in.tag" ]), 
 l(o([], [ [ H, /^[\s\S]+/ ] ]), [ "uq.val" ]), l(r({
  keywords: v,
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
  keywords: b,
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
  keywords: x,
  cStyleComments: !0,
  regexLiterals: !0
 }), [ "javascript", "js" ]), l(r({
  keywords: w,
  hashComments: 3,
  cStyleComments: !0,
  multilineStrings: !0,
  tripleQuotedStrings: !0,
  regexLiterals: !0
 }), [ "coffee" ]), l(r({
  keywords: T,
  cStyleComments: !0,
  multilineStrings: !0
 }), [ "rc", "rs", "rust" ]), l(o([], [ [ P, /^[\s\S]+/ ] ]), [ "regex" ]);
 var G = f.PR = {
  createSimpleLexer: o,
  registerLangHandler: l,
  sourceDecorator: r,
  PR_ATTRIB_NAME: j,
  PR_ATTRIB_VALUE: H,
  PR_COMMENT: N,
  PR_DECLARATION: D,
  PR_KEYWORD: $,
  PR_LITERAL: R,
  PR_NOCODE: F,
  PR_PLAIN: A,
  PR_PUNCTUATION: M,
  PR_SOURCE: O,
  PR_STRING: P,
  PR_TAG: z,
  PR_TYPE: L,
  prettyPrintOne: IN_GLOBAL_SCOPE ? f.prettyPrintOne = d : prettyPrintOne = d,
  prettyPrint: prettyPrint = IN_GLOBAL_SCOPE ? f.prettyPrint = p : prettyPrint = p
 };
 "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
  return G;
 });
})(), define("libs/prettify/prettify", function() {});

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
 function i(e) {
  var t = (e.className + " " + e.parentNode.className).split(/\s+/);
  t = t.map(function(e) {
   return e.replace(/^language-/, "");
  });
  for (var n = 0; n < t.length; n++) if (f[t[n]] || "no-highlight" == t[n]) return t[n];
 }
 function o(e) {
  var t = [];
  return function n(e, i) {
   for (var o = e.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? i += o.nodeValue.length : "BR" == o.nodeName ? i += 1 : 1 == o.nodeType && (t.push({
    event: "start",
    offset: i,
    node: o
   }), i = n(o, i), t.push({
    event: "stop",
    offset: i,
    node: o
   }));
   return i;
  }(e, 0), t;
 }
 function r(t, n, i) {
  function o() {
   return t.length && n.length ? t[0].offset != n[0].offset ? t[0].offset < n[0].offset ? t : n : "start" == n[0].event ? t : n : t.length ? t : n;
  }
  function r(t) {
   function n(t) {
    return " " + t.nodeName + '="' + e(t.value) + '"';
   }
   return "<" + t.nodeName + Array.prototype.map.call(t.attributes, n).join("") + ">";
  }
  for (var s = 0, a = "", l = []; t.length || n.length; ) {
   var c = o().splice(0, 1)[0];
   if (a += e(i.substr(s, c.offset - s)), s = c.offset, "start" == c.event) a += r(c.node), 
   l.push(c.node); else if ("stop" == c.event) {
    var u, d = l.length;
    do d--, u = l[d], a += "</" + u.nodeName.toLowerCase() + ">"; while (u != c.node);
    for (l.splice(d, 1); d < l.length; ) a += r(l[d]), d++;
   }
  }
  return a + e(i.substr(s));
 }
 function s(e) {
  function t(t, n) {
   return RegExp(t, "m" + (e.cI ? "i" : "") + (n ? "g" : ""));
  }
  function n(e, i) {
   function o(e, t) {
    t.split(" ").forEach(function(t) {
     var n = t.split("|");
     s[n[0]] = [ e, n[1] ? Number(n[1]) : 1 ], r.push(n[0]);
    });
   }
   if (!e.compiled) {
    e.compiled = !0;
    var r = [];
    if (e.k) {
     var s = {};
     if (e.lR = t(e.l || hljs.IR, !0), "string" == typeof e.k) o("keyword", e.k); else for (var a in e.k) e.k.hasOwnProperty(a) && o(a, e.k[a]);
     e.k = s;
    }
    i && (e.bWK && (e.b = "\\b(" + r.join("|") + ")\\s"), e.bR = t(e.b ? e.b : "\\B|\\b"), 
    e.e || e.eW || (e.e = "\\B|\\b"), e.e && (e.eR = t(e.e)), e.tE = e.e || "", e.eW && i.tE && (e.tE += (e.e ? "|" : "") + i.tE)), 
    e.i && (e.iR = t(e.i)), void 0 === e.r && (e.r = 1), e.c || (e.c = []);
    for (var l = 0; l < e.c.length; l++) "self" == e.c[l] && (e.c[l] = e), n(e.c[l], e);
    e.starts && n(e.starts, i);
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
 function a(t, n) {
  function i(e, t) {
   for (var n = 0; n < t.c.length; n++) {
    var i = t.c[n].bR.exec(e);
    if (i && 0 == i.index) return t.c[n];
   }
  }
  function o(e, t) {
   return e.e && e.eR.test(t) ? e : e.eW ? o(e.parent, t) : void 0;
  }
  function r(e, t) {
   return t.i && t.iR.test(e);
  }
  function c(e, t) {
   var n = m.cI ? t[0].toLowerCase() : t[0];
   return e.k.hasOwnProperty(n) && e.k[n];
  }
  function u() {
   var t = e(b);
   if (!v.k) return t;
   var n = "", i = 0;
   v.lR.lastIndex = 0;
   for (var o = v.lR.exec(t); o; ) {
    n += t.substr(i, o.index - i);
    var r = c(v, o);
    r ? (w += r[1], n += '<span class="' + r[0] + '">' + o[0] + "</span>") : n += o[0], 
    i = v.lR.lastIndex, o = v.lR.exec(t);
   }
   return n + t.substr(i);
  }
  function d() {
   if (v.sL && !f[v.sL]) return e(b);
   var t = v.sL ? a(v.sL, b) : l(b);
   return v.r > 0 && (w += t.keyword_count, y += t.r), '<span class="' + t.language + '">' + t.value + "</span>";
  }
  function p() {
   return void 0 !== v.sL ? d() : u();
  }
  function h(t, n) {
   var i = t.cN ? '<span class="' + t.cN + '">' : "";
   t.rB ? (x += i, b = "") : t.eB ? (x += e(n) + i, b = "") : (x += i, b = n), v = Object.create(t, {
    parent: {
     value: v
    }
   }), y += t.r;
  }
  function g(t, n) {
   if (b += t, void 0 === n) return x += p(), 0;
   var s = i(n, v);
   if (s) return x += p(), h(s, n), s.rB ? 0 : n.length;
   var a = o(v, n);
   if (a) {
    a.rE || a.eE || (b += n), x += p();
    do v.cN && (x += "</span>"), v = v.parent; while (v != a.parent);
    return a.eE && (x += e(n)), b = "", a.starts && h(a.starts, ""), a.rE ? 0 : n.length;
   }
   if (r(n, v)) throw "Illegal";
   return b += n, n.length || 1;
  }
  var m = f[t];
  s(m);
  var v = m, b = "", y = 0, w = 0, x = "";
  try {
   for (var k, C, S = 0; ;) {
    if (v.t.lastIndex = S, k = v.t.exec(n), !k) break;
    C = g(n.substr(S, k.index - S), k[0]), S = k.index + C;
   }
   return g(n.substr(S)), {
    r: y,
    keyword_count: w,
    value: x,
    language: t
   };
  } catch (T) {
   if ("Illegal" == T) return {
    r: 0,
    keyword_count: 0,
    value: e(n)
   };
   throw T;
  }
 }
 function l(t) {
  var n = {
   keyword_count: 0,
   r: 0,
   value: e(t)
  }, i = n;
  for (var o in f) if (f.hasOwnProperty(o)) {
   var r = a(o, t);
   r.language = o, r.keyword_count + r.r > i.keyword_count + i.r && (i = r), r.keyword_count + r.r > n.keyword_count + n.r && (i = n, 
   n = r);
  }
  return i.language && (n.second_best = i), n;
 }
 function c(e, t, n) {
  return t && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, n) {
   return n.replace(/\t/g, t);
  })), n && (e = e.replace(/\n/g, "<br>")), e;
 }
 function u(e, t, s) {
  var u = n(e, s), d = i(e);
  if ("no-highlight" != d) {
   var p = d ? a(d, u) : l(u);
   d = p.language;
   var f = o(e);
   if (f.length) {
    var h = document.createElement("pre");
    h.innerHTML = p.value, p.value = r(f, o(h), u);
   }
   p.value = c(p.value, t, s);
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
 this.LANGUAGES = f, this.highlight = a, this.highlightAuto = l, this.fixMarkup = c, 
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
  for (var i in e) n[i] = e[i];
  if (t) for (var i in t) n[i] = t[i];
  return n;
 };
}();

if (hljs.LANGUAGES.bash = function(e) {
 var t = "true false", n = "if then else elif fi for break continue while in do done echo exit return set declare", i = {
  cN: "variable",
  b: "\\$[a-zA-Z0-9_#]+"
 }, o = {
  cN: "variable",
  b: "\\${([^}]|\\\\})+}"
 }, r = {
  cN: "string",
  b: '"',
  e: '"',
  i: "\\n",
  c: [ e.BE, i, o ],
  r: 0
 }, s = {
  cN: "string",
  b: "'",
  e: "'",
  c: [ {
   b: "''"
  } ],
  r: 0
 }, a = {
  cN: "test_condition",
  b: "",
  e: "",
  c: [ r, s, i, o ],
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
  }, i, o, e.HCM, r, s, e.inherit(a, {
   b: "\\[ ",
   e: " \\]",
   r: 0
  }), e.inherit(a, {
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
 var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?", n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", i = {
  keyword: "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include"
 }, o = {
  cN: "yardoctag",
  b: "@[A-Za-z]+"
 }, r = [ {
  cN: "comment",
  b: "#",
  e: "$",
  c: [ o ]
 }, {
  cN: "comment",
  b: "^\\=begin",
  e: "^\\=end",
  c: [ o ],
  r: 10
 }, {
  cN: "comment",
  b: "^__END__",
  e: "\\n$"
 } ], s = {
  cN: "subst",
  b: "#\\{",
  e: "}",
  l: t,
  k: i
 }, a = [ e.BE, s ], l = [ {
  cN: "string",
  b: "'",
  e: "'",
  c: a,
  r: 0
 }, {
  cN: "string",
  b: '"',
  e: '"',
  c: a,
  r: 0
 }, {
  cN: "string",
  b: "%[qw]?\\(",
  e: "\\)",
  c: a
 }, {
  cN: "string",
  b: "%[qw]?\\[",
  e: "\\]",
  c: a
 }, {
  cN: "string",
  b: "%[qw]?{",
  e: "}",
  c: a
 }, {
  cN: "string",
  b: "%[qw]?<",
  e: ">",
  c: a,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?/",
  e: "/",
  c: a,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?%",
  e: "%",
  c: a,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?-",
  e: "-",
  c: a,
  r: 10
 }, {
  cN: "string",
  b: "%[qw]?\\|",
  e: "\\|",
  c: a,
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
   k: i
  }, {
   cN: "params",
   b: "\\(",
   e: "\\)",
   l: t,
   k: i
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
   c: [ e.BE, s ]
  } ]),
  r: 0
 } ]));
 return s.c = u, c.c[1].c = u, {
  l: t,
  k: i,
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
 } ], i = [ e.BNM, e.CNM ], o = {
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
   c: [ o, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ "self", t, e.CBLCLM ].concat(n).concat(i)
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
    c: [ o ]
   }, o ]
  }, {
   b: "=>"
  } ].concat(n).concat(i)
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
 } ].concat([ e.ASM, e.QSM ]), i = {
  cN: "title",
  b: e.UIR
 }, o = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: [ "self", e.CNM, t ].concat(n)
 }, r = {
  bWK: !0,
  e: ":",
  i: "[${=;\\n]",
  c: [ i, o ],
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
 }, i = {
  cN: "variable",
  b: "\\$\\d"
 }, o = {
  cN: "variable",
  b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"
 }, r = [ e.BE, n, i, o ], s = {
  b: "->",
  c: [ {
   b: e.IR
  }, {
   b: "{",
   e: "}"
  } ]
 }, a = {
  cN: "comment",
  b: "^(__END__|__DATA__)",
  e: "\\n$",
  r: 5
 }, l = [ i, o, e.HCM, a, {
  cN: "comment",
  b: "^\\=\\w",
  e: "\\=cut",
  eW: !0
 }, s, {
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
  c: [ e.HCM, a, {
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
 return n.c = l, s.c[1].c = l, {
  k: t,
  c: l
 };
}(hljs), hljs.LANGUAGES.json = function(e) {
 var t = {
  literal: "true false null"
 }, n = [ e.QSM, e.CNM ], i = {
  cN: "value",
  e: ",",
  eW: !0,
  eE: !0,
  c: n,
  k: t
 }, o = {
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
   starts: i
  } ],
  i: "\\S"
 }, r = {
  b: "\\[",
  e: "\\]",
  c: [ e.inherit(i, {
   cN: null
  }) ],
  i: "\\S"
 };
 return n.splice(n.length, 0, o, r), {
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
}(hljs), define("libs/highlight/highlight.pack", function() {}), function() {
 function e(e) {
  return e.replace(/^\s+|\s+$/g, "");
 }
 function t(e) {
  return e.replace(/\s+$/g, "");
 }
 function n(e) {
  return e.replace(new RegExp("^(\\t|[ ]{1,4})", "gm"), "");
 }
 function i(e, t) {
  return -1 != e.indexOf(t);
 }
 function o(e, t) {
  return e.replace(/<[^>]*>?/gi, function(e) {
   return e.match(t) ? e : "";
  });
 }
 function r(e, t) {
  for (var n = {}, i = 0; i < e.length; i++) n[e[i]] = e[i];
  for (i = 0; i < t.length; i++) n[t[i]] = t[i];
  var o = [];
  for (var r in n) n.hasOwnProperty(r) && o.push(n[r]);
  return o;
 }
 function s(e) {
  return "" != e.charAt(0) && (e = "" + e), "" != e.charAt(e.length - 1) && (e += ""), 
  e;
 }
 function a(e) {
  return "" == e.charAt(0) && (e = e.substr(1)), "" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), 
  e;
 }
 function l(e, t) {
  return o(c(e, t), f);
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
  var n = new Markdown.Extra(), o = [], r = [], s = [ "unHashExtraBlocks" ];
  return t = t || {}, t.extensions = t.extensions || [ "all" ], i(t.extensions, "all") && (t.extensions = [ "tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes" ]), 
  i(t.extensions, "attr_list") && (o.push("hashFcbAttributeBlocks"), r.push("hashHeaderAttributeBlocks"), 
  s.push("applyAttributeBlocks"), n.attributeBlocks = !0), i(t.extensions, "tables") && r.push("tables"), 
  i(t.extensions, "fenced_code_gfm") && o.push("fencedCodeBlocks"), i(t.extensions, "def_list") && r.push("definitionLists"), 
  i(t.extensions, "footnotes") && (o.push("stripFootnoteDefinitions"), r.push("doFootnotes"), 
  s.push("printFootnotes")), e.hooks.chain("postNormalization", function(e) {
   return n.doTransform(o, e) + "\n";
  }), e.hooks.chain("preBlockGamut", function(e, t) {
   return n.blockGamutHookCallback = t, e = u(e), n.doTransform(r, e) + "\n";
  }), n.previousPostConversion = e.hooks.postConversion, e.hooks.chain("postConversion", function(e) {
   return e = n.doTransform(s, e), n.hashBlocks = [], n.footnotes = {}, n.usedFootnotes = [], 
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
   var i = !1;
   e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, t) {
    i = !0;
    var o = parseInt(t, 10);
    return n.hashBlocks[o];
   }), i === !0 && t();
  }
  var n = this;
  return t(), e;
 }, Markdown.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
  function t(e, t, n) {
   return "<p>~XX" + (r.hashBlocks.push(n) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = "\\{\\s*[.|#][^}]+\\}", i = new RegExp("^(#{1,6}.*#{0,6})\\s+(" + n + ")[ \\t]*(\\n|0x03)", "gm"), o = new RegExp("^(.*)\\s+(" + n + ")[ \\t]*\\n" + "(?=[\\-|=]+\\s*(\\n|0x03))", "gm"), r = this;
  return e = e.replace(i, t), e = e.replace(o, t);
 }, Markdown.Extra.prototype.hashFcbAttributeBlocks = function(e) {
  function t(e, t, n) {
   return "<p>~XX" + (o.hashBlocks.push(n) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = "\\{\\s*[.|#][^}]+\\}", i = new RegExp("^(```[^{\\n]*)\\s+(" + n + ")[ \\t]*\\n" + "(?=([\\s\\S]*?)\\n```\\s*(\\n|0x03))", "gm"), o = this;
  return e.replace(i, t);
 }, Markdown.Extra.prototype.applyAttributeBlocks = function(e) {
  var t = this, n = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
  return e = e.replace(n, function(e, n, i, o, s) {
   if (!i) return "";
   for (var a = parseInt(n, 10), l = t.hashBlocks[a], c = l.match(/#[^\s{}]+/g) || [], u = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", d = l.match(/\.[^\s{}]+/g) || [], p = 0; p < d.length; p++) d[p] = d[p].substr(1, d[p].length - 1);
   var f = "";
   return o && (d = r(d, [ o ])), d.length > 0 && (f = ' class="' + d.join(" ") + '"'), 
   "<" + i + u + f + s;
  });
 }, Markdown.Extra.prototype.tables = function(t) {
  function n(t, n, o, r) {
   n = n.replace(/^ *[|]/m, ""), o = o.replace(/^ *[|]/m, ""), r = r.replace(/^ *[|]/gm, ""), 
   n = n.replace(/[|] *$/m, ""), o = o.replace(/[|] *$/m, ""), r = r.replace(/[|] *$/gm, ""), 
   alignspecs = o.split(/ *[|] */), align = [];
   for (var s = 0; s < alignspecs.length; s++) {
    var a = alignspecs[s];
    align[s] = a.match(/^ *-+: *$/m) ? ' style="text-align:right;"' : a.match(/^ *:-+: *$/m) ? ' style="text-align:center;"' : a.match(/^ *:-+ *$/m) ? ' style="text-align:left;"' : "";
   }
   var c = n.split(/ *[|] */), u = c.length, d = i.tableClass ? ' class="' + i.tableClass + '"' : "", p = [ "<table", d, ">\n", "<thead>\n", "<tr>\n" ].join("");
   for (s = 0; u > s; s++) {
    var f = l(e(c[s]), i);
    p += [ "  <th", align[s], ">", f, "</th>\n" ].join("");
   }
   p += "</tr>\n</thead>\n";
   var h = r.split("\n");
   for (s = 0; s < h.length; s++) if (!h[s].match(/^\s*$/)) {
    for (var g = h[s].split(/ *[|] */), m = u - g.length, v = 0; m > v; v++) g.push("");
    for (p += "<tr>\n", v = 0; u > v; v++) {
     var b = l(e(g[v]), i);
     p += [ "  <td", align[v], ">", b, "</td>\n" ].join("");
    }
    p += "</tr>\n";
   }
   return p += "</table>\n", i.hashExtraBlock(p);
  }
  var i = this, o = new RegExp([ "^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"), r = new RegExp([ "^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm");
  return t = t.replace(o, n), t = t.replace(r, n);
 }, Markdown.Extra.prototype.stripFootnoteDefinitions = function(e) {
  var t = this;
  return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n, i) {
   return n = p(n), i += "\n", i = i.replace(/^[ ]{0,3}/g, ""), t.footnotes[n] = i, 
   "\n";
  });
 }, Markdown.Extra.prototype.doFootnotes = function(e) {
  var t = this;
  if (t.isConvertingFootnote === !0) return e;
  var n = 0;
  return e = e.replace(/\[\^(.+?)\]/g, function(e, i) {
   var o = p(i), r = t.footnotes[o];
   if (void 0 === r) return "";
   n++, t.usedFootnotes.push(o);
   var s = '<a href="#fn:' + o + '" id="fnref:' + o + '" title="See footnote" class="footnote">' + n + "</a>";
   return t.hashExtraInline(s);
  });
 }, Markdown.Extra.prototype.printFootnotes = function(e) {
  var t = this;
  if (0 === t.usedFootnotes.length) return e;
  e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
  for (var n = 0; n < t.usedFootnotes.length; n++) {
   var i = t.usedFootnotes[n], o = t.footnotes[i];
   t.isConvertingFootnote = !0;
   var r = l(o, t);
   delete t.isConvertingFootnote, e += '<li id="fn:' + i + '">' + r + ' <a href="#fnref:' + i + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n';
  }
  return e += "</ol>\n</div>";
 }, Markdown.Extra.prototype.fencedCodeBlocks = function(e) {
  function t(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~");
  }
  var n = this;
  return e = e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, i, o) {
   var r = i, s = o, a = n.googleCodePrettify ? ' class="prettyprint"' : "", l = "";
   r && (l = n.googleCodePrettify || n.highlightJs ? ' class="language-' + r + '"' : ' class="' + r + '"');
   var c = [ "<pre", a, "><code", l, ">", t(s), "</code></pre>" ].join("");
   return n.hashExtraBlock(c);
  });
 }, Markdown.Extra.prototype.definitionLists = function(t) {
  var n = new RegExp([ "(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")" ].join(""), "gm"), i = this;
  return t = s(t), t = t.replace(n, function(t, n, o) {
   var r = e(i.processDefListItems(o));
   return r = "<dl>\n" + r + "\n</dl>", n + i.hashExtraBlock(r) + "\n\n";
  }), a(t);
 }, Markdown.Extra.prototype.processDefListItems = function(i) {
  var o = this, r = new RegExp([ "(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])" ].join(""), "gm"), u = new RegExp([ "\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")" ].join(""), "gm");
  return i = s(i), i = i.replace(/\n{2,}(?=\\x03)/, "\n"), i = i.replace(r, function(t, n, i) {
   for (var r = e(i).split("\n"), s = "", a = 0; a < r.length; a++) {
    var c = r[a];
    c = l(e(c), o), s += "\n<dt>" + c + "</dt>";
   }
   return s + "\n";
  }), i = i.replace(u, function(e, i, r, s) {
   return i || s.match(/\n{2,}/) ? (s = Array(r.length + 1).join(" ") + s, s = n(s) + "\n\n", 
   s = "\n" + c(s, o) + "\n") : (s = t(s), s = l(n(s), o)), "\n<dd>" + s + "</dd>\n";
  }), a(i);
 };
}(), define("libs/Markdown.Extra", function() {}), define("extensions/markdownExtra", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/markdownExtraSettingsBlock.html", "libs/Markdown.Extra" ], function(e, t, n, i, o) {
 var r = new i("markdownExtra", "Markdown Extra", !0);
 return r.settingsBlock = o, r.defaultConfig = {
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
  var n = e.getConverter(), i = {
   extensions: r.config.extensions
  };
  if ("highlight" == r.config.highlighter) {
   i.highlighter = "prettify";
   var o = document.getElementById("preview-contents");
   e.hooks.chain("onPreviewRefresh", function() {
    t.each(o.querySelectorAll(".prettyprint"), function(e) {
     hljs.highlightBlock(e);
    });
   });
  } else "prettify" == r.config.highlighter && (i.highlighter = "prettify", e.hooks.chain("onPreviewRefresh", prettyPrint));
  Markdown.Extra.init(n, i), n.extraExtensions = r.config.extensions;
 }, r;
}), define("text!html/buttonToc.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Table of contents" data-toggle="dropdown">\n    <i class="icon-list"></i>\n</button>\n<div class="dropdown-menu pull-right">\n    <h3>Table of contents</h3>\n    <div class="table-of-contents">\n    </div>\n</div>\n';
}), define("text!html/tocSettingsBlock.html", [], function() {
 return '<p>Generates a table of contents when a [TOC] marker is found.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="input-toc-marker">Marker\n			RegExp</label>\n		<div class="col-lg-7">\n		\n			<input type="text" id="input-toc-marker" class="col-lg-4 form-control">\n		</div>\n	</div>\n	<div class="form-group">\n        <label class="col-lg-4 control-label" for="input-toc-button">Button over preview</label>\n        <div class="col-lg-7">\n        <div class="checkbox">\n            <input type="checkbox" id="input-toc-button">\n            </div>\n        </div>\n    </div>\n	\n</div>';
}), define("extensions/toc", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonToc.html", "text!html/tocSettingsBlock.html" ], function(e, t, n, i, o, r) {
 function s(e, t, n) {
  this.tagName = e, this.anchor = t, this.text = n, this.children = [];
 }
 function a(e, n) {
  function i() {
   void 0 !== l && (l.children.length > 0 && (l.children = a(l.children, n + 1)), r.push(l));
  }
  n = n || 1;
  var o = "H" + n, r = [], l = void 0;
  return t.each(e, function(e) {
   e.tagName != o ? (void 0 === l && (l = new s()), l.children.push(e)) : (i(), l = e);
  }), i(), r;
 }
 function l() {
  function e(e) {
   for (var o = e.id || n.slugify(e.textContent), r = o, s = 0; t.has(i, r); ) r = o + "-" + ++s;
   return i[r] = !0, e.id = r, r;
  }
  var i = {}, o = [];
  return t.each(u.querySelectorAll(".preview-content > .wmd-title"), function(t) {
   o.push(new s(t.tagName, e(t), t.textContent));
  }), o = a(o), '<div class="toc">\n<ul>\n' + o.join("") + "</ul>\n</div>\n";
 }
 var c = new i("toc", "Table of Contents", !0);
 c.settingsBlock = r, c.defaultConfig = {
  marker: "\\[(TOC|toc)\\]",
  button: !0
 }, c.onLoadSettings = function() {
  n.setInputValue("#input-toc-marker", c.config.marker), n.setInputChecked("#input-toc-button", c.config.button);
 }, c.onSaveSettings = function(e, t) {
  e.marker = n.getInputRegExpValue("#input-toc-marker", t), e.button = n.getInputChecked("#input-toc-button");
 }, c.onCreatePreviewButton = function() {
  return c.config.button ? o : void 0;
 }, s.prototype.childrenToString = function() {
  if (0 === this.children.length) return "";
  var e = "<ul>\n";
  return t.each(this.children, function(t) {
   e += t.toString();
  }), e += "</ul>\n";
 }, s.prototype.toString = function() {
  var e = "<li>";
  return this.anchor && this.text && (e += '<a href="#' + this.anchor + '">' + this.text + "</a>"), 
  e += this.childrenToString() + "</li>\n";
 };
 var u = void 0;
 return c.onEditorConfigure = function(e) {
  u = document.getElementById("preview-contents");
  var n = document.querySelectorAll(".table-of-contents"), i = new RegExp("^" + c.config.marker + "$", "g");
  e.hooks.chain("onPreviewRefresh", function() {
   var e = l();
   t.each(u.getElementsByTagName("p"), function(t) {
    i.test(t.innerHTML) && (t.innerHTML = e);
   }), t.each(n, function(t) {
    t.innerHTML = e;
   });
  });
 }, c;
}), define("text!html/mathJaxSettingsBlock.html", [], function() {
 return '<p>Allows StackEdit to interpret LaTeX mathematical expressions.</p>\n<div class="form-horizontal">\n    <div class="form-group">\n        <label class="col-lg-4 control-label"\n            for="input-mathjax-config-tex">TeX configuration</label>\n        <div class="col-lg-7">\n            <input type="text" id="input-mathjax-config-tex" class="form-control">\n        </div>\n    </div>\n    <div class="form-group">\n        <label class="col-lg-4 control-label"\n            for="input-mathjax-config-tex2jax">tex2jax configuration</label>\n        <div class="col-lg-7">\n            <input type="text" id="input-mathjax-config-tex2jax" class="form-control">\n        </div>\n    </div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="http://docs.mathjax.org/en/latest/options/">More info</a></span>';
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
   var i = blocks[t];
   "@" === i.charAt(0) ? (blocks[t] = "@@" + math.length + "@@", math.push(i)) : start ? i === end ? braces ? last = t : processMath(start, t) : i.match(/\n.*\n/) ? (last && (t = last, 
   processMath(start, t)), start = end = last = null, braces = 0) : "{" === i ? braces++ : "}" === i && braces && braces-- : i === inline || "$$" === i ? (start = t, 
   end = i, braces = 0) : "begin" === i.substr(1, 5) && (start = t, end = "\\end" + i.substr(6), 
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
    Translate: function(n, i) {
     if (HUB.cancelTypeset || i.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, i);
    }
   });
  }), HUB.Register.StartupHook("SVG Jax Config", function() {
   var e = MathJax.OutputJax.SVG, t = e.Translate;
   e.Augment({
    Translate: function(n, i) {
     if (HUB.cancelTypeset || i.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, i);
    }
   });
  }), HUB.Register.StartupHook("TeX Jax Config", function() {
   var e = MathJax.InputJax.TeX, t = e.Translate;
   e.Augment({
    Translate: function(n, i) {
     if (HUB.cancelTypeset || i.cancelled) throw Error(CANCELMESSAGE);
     return t.call(e, n, i);
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
 return "<p>Binds together editor and preview scrollbars.</p>\n<blockquote>\n	<b>NOTE:</b> The mapping between Markdown and HTML is based on the\n	position of the title elements (h1, h2...) in the page. Therefore if\n	your document does not contain any title, the mapping will be linear and\n	consequently less accurate.\n</blockquote>";
}), showLog = !0, css_browser_selector(navigator.userAgent), define("libs/css_browser_selector", function() {}), 
function(e) {
 "function" == typeof define && define.amd ? define("libs/jquery.mousewheel", [ "jquery" ], e) : "object" == typeof exports ? module.exports = e : e(jQuery);
}(function(e) {
 function t(t) {
  var o, r = t || window.event, s = [].slice.call(arguments, 1), a = 0, l = 0, c = 0, u = 0, d = 0;
  return t = e.event.fix(r), t.type = "mousewheel", r.wheelDelta && (a = r.wheelDelta), 
  r.detail && (a = -1 * r.detail), r.deltaY && (c = -1 * r.deltaY, a = c), r.deltaX && (l = r.deltaX, 
  a = -1 * l), void 0 !== r.wheelDeltaY && (c = r.wheelDeltaY), void 0 !== r.wheelDeltaX && (l = -1 * r.wheelDeltaX), 
  u = Math.abs(a), (!n || n > u) && (n = u), d = Math.max(Math.abs(c), Math.abs(l)), 
  (!i || i > d) && (i = d), o = a > 0 ? "floor" : "ceil", a = Math[o](a / n), l = Math[o](l / i), 
  c = Math[o](c / i), s.unshift(t, a, l, c), (e.event.dispatch || e.event.handle).apply(this, s);
 }
 var n, i, o = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], r = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
 if (e.event.fixHooks) for (var s = o.length; s; ) e.event.fixHooks[o[--s]] = e.event.mouseHooks;
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
}), define("extensions/scrollLink", [ "jquery", "underscore", "classes/Extension", "text!html/scrollLinkSettingsBlock.html", "libs/css_browser_selector", "libs/jquery.mousewheel" ], function(e, t, n, i) {
 function o(e) {
  return parseFloat(e.substring(0, e.length - 2));
 }
 var r = new n("scrollLink", "Scroll Link", !0, !0);
 r.settingsBlock = i;
 var s = void 0;
 r.onSectionsCreated = function(e) {
  s = e;
 };
 var a = void 0, l = void 0, c = void 0, u = [], d = [], p = void 0, f = void 0, h = t.debounce(function() {
  function n(e) {
   var t = i;
   void 0 !== e && (c.val(e), t += c.prop("scrollHeight"));
   var n = r + t;
   u.push({
    startOffset: r,
    endOffset: n,
    height: t
   }), r = n, i = 0;
  }
  u = [], c.width(a.width());
  var i = o(a.css("padding-top")), r = 0;
  t.each(s, function(e, t) {
   t !== s.length - 1 ? e = 0 === e.length ? void 0 : e.substring(0, e.length - 1) : i += o(a.css("padding-bottom")), 
   n(e);
  }), d = [];
  var h = 0, g = l.scrollTop();
  l.find(".preview-content > .wmd-title").each(function() {
   var t = e(this), n = t.position().top + g + o(t.css("margin-top"));
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
  }), p = -10, f = -10, v();
 }, 500), g = !1, m = !1, v = t.debounce(function() {
  function e(e, n, i, o, r, s) {
   var a = void 0, l = t.find(n, function(t, n) {
    return a = n, e < t.endOffset;
   });
   if (void 0 !== l) {
    var c = (e - l.startOffset) / l.height, u = o[a], d = u.startOffset + u.height * c;
    return d = t.min([ d, i.prop("scrollHeight") - i.outerHeight() ]), Math.abs(d - r) <= 9 ? (s(r), 
    void 0) : (i.animate({
     scrollTop: d
    }, 500, function() {
     s(d);
    }), void 0);
   }
  }
  if (0 !== u.length && u.length === d.length) {
   var n = a.scrollTop(), i = l.scrollTop();
   g === !0 && Math.abs(n - p) > 9 ? (g = !1, p = n, e(n, u, l, d, i, function(e) {
    f = e;
   })) : m === !0 && Math.abs(i - f) > 9 && (m = !1, f = i, e(i, d, a, u, n, function(e) {
    p = e;
   }));
  }
 }, 500);
 r.onLayoutConfigure = function(e) {
  e.onresize = function() {
   g = !0, h();
  };
 }, r.onReady = function() {
  a = e("#wmd-input"), l = e(".preview-container"), c = e("#md-section-helper"), l.bind("keyup mouseup mousewheel", function() {
   m = !0, g = !1, v();
  }), e(".table-of-contents").click(function() {
   m = !0, g = !1, v();
  }), a.bind("keyup mouseup mousewheel", function() {
   g = !0, m = !1, v();
  });
 };
 var b = void 0;
 return r.onEditorConfigure = function(t) {
  b = e("#preview-contents"), t.getConverter().hooks.chain("postConversion", function(e) {
   return b.height(b.height()), e;
  });
 }, r.onPreviewFinished = function() {
  b.height("auto"), g = !0, h();
 }, r;
}), define("text!html/buttonSyncSettingsBlock.html", [], function() {
 return '<p>Adds a "Synchronize documents" button in the navigation bar.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="input-sync-period">Sync\n			period (0: manual)</label>\n		<div class="col-lg-6 form-inline">\n			<input type="text" id="input-sync-period"\n				class="col-lg-5 form-control" placeholder="180000"> ms\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonSync", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "text!html/buttonSyncSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var s = new o("buttonSync", 'Button "Synchronize"');
 s.settingsBlock = r, s.defaultConfig = {
  syncPeriod: 18e4
 }, s.onLoadSettings = function() {
  i.setInputValue("#input-sync-period", s.config.syncPeriod);
 }, s.onSaveSettings = function(e, t) {
  e.syncPeriod = i.getInputIntValue("#input-sync-period", t, 0);
 };
 var a = void 0;
 s.onSynchronizerCreated = function(e) {
  a = e;
 };
 var l = void 0, c = !1, u = !1, d = function() {
  void 0 !== l && (c === !0 || a.hasSync() === !1 || u ? l.addClass("disabled") : l.removeClass("disabled"));
 }, p = 0;
 return s.onPeriodicRun = function() {
  viewerMode === !0 || !s.config.syncPeriod || p + s.config.syncPeriod > i.currentTime || a.sync() === !0 && (p = i.currentTime);
 }, s.onCreateButton = function() {
  var t = n("button", {
   "class": "btn btn-success"
  }, n("i", {
   "class": "icon-refresh"
  }));
  return l = e(t).click(function() {
   e(this).hasClass("disabled") || a.sync();
  }), t;
 }, s.onReady = d, s.onFileCreated = d, s.onFileDeleted = d, s.onSyncImportSuccess = d, 
 s.onSyncExportSuccess = d, s.onSyncRemoved = d, s.onSyncRunning = function(e) {
  c = e, d();
 }, s.onOfflineChanged = function(e) {
  u = e, d();
 }, s;
}), define("text!html/buttonPublish.html", [], function() {
 return '<button class="btn btn-success" title="Publish this document">\n	<i class="icon-share"></i>\n</button>';
}), define("extensions/buttonPublish", [ "jquery", "underscore", "classes/Extension", "text!html/buttonPublish.html" ], function(e, t, n, i) {
 function o() {
  void 0 !== s && (l === !0 || c === !1 || u === !0 ? s.addClass("disabled") : s.removeClass("disabled"));
 }
 var r = new n("buttonPublish", 'Button "Publish"'), s = void 0, a = void 0, l = !1, c = !1, u = !1, d = void 0;
 r.onPublisherCreated = function(e) {
  d = e;
 }, r.onCreateButton = function() {
  var t = e(i);
  return s = t.click(function() {
   t.hasClass("disabled") || d.publish();
  }), s[0];
 }, r.onPublishRunning = function(e) {
  l = e, o();
 }, r.onOfflineChanged = function(e) {
  u = e, o();
 };
 var p = function() {
  c = 0 === t.size(a.publishLocations) ? !1 : !0, o();
 };
 return r.onFileSelected = function(e) {
  a = e, p();
 }, r.onPublishRemoved = p, r.onNewPublishSuccess = p, r;
}), define("text!html/buttonShare.html", [], function() {
 return '<button class="btn btn-success dropdown-toggle" data-toggle="dropdown"\n	title="Share this document">\n	<i class="icon-link"></i>\n</button>\n<div class="dropdown-menu pull-right link-container">\n	<h3>Sharing</h3>\n	<div class="link-list"></div>\n	<p class="no-link">To share this document you need first to <a\n		href="#" class="action-publish-gist">publish it as a Gist</a> in\n		Markdown format.\n	</p>\n	<blockquote>\n		<b>NOTE:</b> You can open any URL within StackEdit using <a\n			href="viewer.html?url=https://raw.github.com/benweet/stackedit/master/README.md"\n			title="Sharing example">viewer.html?url=...</a>\n	</blockquote>\n</div>\n';
}), define("text!html/buttonShareLocation.html", [], function() {
 return '<div class="input-group">\n	<a href="<%= link %>" class="input-group-addon" title="Sharing location"><i\n		class="icon-link"></i></a> <input class="col-lg-5 form-control" type="text"\n		value="<%= link %>" readonly />\n</div>\n';
}), define("extensions/buttonShare", [ "jquery", "underscore", "classes/Extension", "text!html/buttonShare.html", "text!html/buttonShareLocation.html" ], function(e, t, n, i, o) {
 var r = new n("buttonShare", 'Button "Share"', !0, !0);
 r.settingsBlock = '<p>Adds a "Share document" button in the navigation bar.</p>', 
 r.onCreateButton = function() {
  return i;
 };
 var s = void 0, a = void 0, l = void 0, c = function(e) {
  if (void 0 === e || e === s) {
   var n = t.reduce(s.publishLocations, function(e, n) {
    return n.sharingLink && (e += t.template(o, {
     link: n.sharingLink
    })), e;
   }, "");
   a.innerHTML = n, l.toggleClass("hide", 0 !== n.length);
  }
 };
 return r.onFileSelected = function(e) {
  s = e, c(e);
 }, r.onNewPublishSuccess = c, r.onPublishRemoved = c, r.onReady = function() {
  var t = document.querySelector(".link-container");
  a = t.querySelector(".link-list"), l = e(t.querySelector(".no-link"));
 }, r;
}), define("text!html/buttonStat.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Document statistics" data-toggle="dropdown">\n	<i class="icon-chart-bar"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Statistics</h3>\n	<div class="stat">\n		<div>\n			<%= name1 %>: <span id="span-stat-value1"></span>\n		</div>\n		<div>\n			<%= name2 %>: <span id="span-stat-value2"></span>\n		</div>\n		<div>\n			<%= name3 %>: <span id="span-stat-value3"></span>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/buttonStatSettingsBlock.html", [], function() {
 return '<p>Adds a "Document statistics" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name1">Title</label> <input\n			id="input-stat-name1" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value1">RegExp</label> <input\n			id="input-stat-value1" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name2">Title</label> <input\n			id="input-stat-name2" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value2">RegExp</label> <input\n			id="input-stat-value2" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name3">Title</label> <input\n			id="input-stat-name3" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value3">RegExp</label> <input\n			id="input-stat-value3" type="text" class="form-control col-lg-4">\n	</div>\n</div>\n';
}), define("extensions/buttonStat", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonStat.html", "text!html/buttonStatSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var s = new i("buttonStat", 'Button "Statistics"', !0, !0);
 s.settingsBlock = r, s.defaultConfig = {
  name1: "Characters",
  value1: "\\S",
  name2: "Words",
  value2: "\\S+",
  name3: "Paragraphs",
  value3: "\\S.*"
 }, s.onLoadSettings = function() {
  t.each([ 1, 2, 3 ], function(e) {
   n.setInputValue("#input-stat-name" + e, s.config["name" + e]), n.setInputValue("#input-stat-value" + e, s.config["value" + e]);
  });
 }, s.onSaveSettings = function(e, i) {
  t.each([ 1, 2, 3 ], function(t) {
   e["name" + t] = n.getInputTextValue("#input-stat-name" + t, i), e["value" + t] = n.getInputRegExpValue("#input-stat-value" + t, i);
  });
 }, s.onCreatePreviewButton = function() {
  return t.template(o, s.config);
 };
 var a = void 0, l = void 0, c = void 0, u = void 0;
 return s.onReady = function() {
  a = document.getElementById("preview-contents"), l = document.getElementById("span-stat-value1"), 
  c = document.getElementById("span-stat-value2"), u = document.getElementById("span-stat-value3");
 }, s.onPreviewFinished = function() {
  for (var e = a.cloneNode(!0), t = e.getElementsByTagName("script"), n = t.length - 1; n >= 0; n--) {
   var i = t[n];
   i.parentNode.removeChild(i);
  }
  var o = e.textContent;
  l.textContent = (o.match(new RegExp(s.config.value1, "g")) || []).length, c.textContent = (o.match(new RegExp(s.config.value2, "g")) || []).length, 
  u.textContent = (o.match(new RegExp(s.config.value3, "g")) || []).length;
 }, s;
}), define("text!html/buttonHtmlCode.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle action-html-code" title="HTML code" data-toggle="dropdown">\n	<i class="icon-code"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>HTML code</h3>\n	<textarea id="input-html-code" class="form-control"></textarea>\n</div>\n';
}), define("text!html/buttonHtmlCodeSettingsBlock.html", [], function() {
 return '<p>Adds a "HTML code" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="textarea-html-code-template">Template\n			<a href="#" class="tooltip-template">(?)</a>\n		</label>\n		<div class="col-lg-7">\n			<textarea id="textarea-html-code-template" class="form-control"></textarea>\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonHtmlCode", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonHtmlCode.html", "text!html/buttonHtmlCodeSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var s = new i("buttonHtmlCode", 'Button "HTML code"', !0, !0);
 s.settingsBlock = r, s.defaultConfig = {
  template: "<%= documentHTML %>"
 }, s.onLoadSettings = function() {
  n.setInputValue("#textarea-html-code-template", s.config.template);
 }, s.onSaveSettings = function(e) {
  e.template = n.getInputValue("#textarea-html-code-template");
 };
 var a = void 0;
 s.onEventMgrCreated = function(e) {
  a = e;
 }, s.onCreatePreviewButton = function() {
  return o;
 };
 var l = void 0;
 s.onFileSelected = function(e) {
  l = e;
 };
 var c = void 0;
 return s.onPreviewFinished = function(e) {
  try {
   var n = t.template(s.config.template, {
    documentTitle: l.title,
    documentMarkdown: l.content,
    documentHTML: e
   });
   c.value = n;
  } catch (i) {
   return a.onError(i), i.message;
  }
 }, s.onReady = function() {
  c = document.getElementById("input-html-code"), e(".action-html-code").click(function() {
   t.defer(function() {
    e("#input-html-code").each(function() {
     e(this).is(":hidden") || this.select();
    });
   });
  });
 }, s;
}), define("text!html/buttonViewer.html", [], function() {
 return '<a href="viewer.html" class="btn btn-default dropdown-toggle"\n	title="Open in viewer">\n	<i class="icon-resize-full"></i>\n</a>\n';
}), define("extensions/buttonViewer", [ "jquery", "classes/Extension", "text!html/buttonViewer.html" ], function(e, t, n) {
 var i = new t("buttonViewer", 'Button "Viewer"', !0);
 return i.settingsBlock = '<p>Adds a "Viewer" button over the preview.</p>', i.onCreatePreviewButton = function() {
  return n;
 }, i;
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
  var n = !1, i = this;
  e(this).one(e.support.transition.end, function() {
   n = !0;
  });
  var o = function() {
   n || e(i).trigger(e.support.transition.end);
  };
  return setTimeout(o, t), this;
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
  var i = e(this), o = i.attr("data-target");
  o || (o = i.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
  var r = e(o);
  t && t.preventDefault(), r.length || (r = i.hasClass("alert") ? i : i.parent()), 
  r.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (r.removeClass("in"), 
  e.support.transition && r.hasClass("fade") ? r.one(e.support.transition.end, n).emulateTransitionEnd(150) : n());
 };
 var i = e.fn.alert;
 e.fn.alert = function(t) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.alert");
   o || i.data("bs.alert", o = new n(this)), "string" == typeof t && o[t].call(i);
  });
 }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
  return e.fn.alert = i, this;
 }, e(document).on("click.bs.alert.data-api", t, n.prototype.close);
}(window.jQuery), +function(e) {
 var t = function(n, i) {
  this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, i);
 };
 t.DEFAULTS = {
  loadingText: "loading..."
 }, t.prototype.setState = function(e) {
  var t = "disabled", n = this.$element, i = n.is("input") ? "val" : "html", o = n.data();
  e += "Text", o.resetText || n.data("resetText", n[i]()), n[i](o[e] || this.options[e]), 
  setTimeout(function() {
   "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t);
  }, 0);
 }, t.prototype.toggle = function() {
  var e = this.$element.closest('[data-toggle="buttons"]');
  if (e.length) {
   var t = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
   "radio" === t.prop("type") && e.find(".active").removeClass("active");
  }
  this.$element.toggleClass("active");
 };
 var n = e.fn.button;
 e.fn.button = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.button"), r = "object" == typeof n && n;
   o || i.data("bs.button", o = new t(this, r)), "toggle" == n ? o.toggle() : n && o.setState(n);
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
  pause: "hover",
  wrap: !0
 }, t.prototype.cycle = function(t) {
  return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), 
  this;
 }, t.prototype.getActiveIndex = function() {
  return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), 
  this.$items.index(this.$active);
 }, t.prototype.to = function(t) {
  var n = this, i = this.getActiveIndex();
  return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid", function() {
   n.to(t);
  }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(this.$items[t]));
 }, t.prototype.pause = function(t) {
  return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), 
  this.cycle(!0)), this.interval = clearInterval(this.interval), this;
 }, t.prototype.next = function() {
  return this.sliding ? void 0 : this.slide("next");
 }, t.prototype.prev = function() {
  return this.sliding ? void 0 : this.slide("prev");
 }, t.prototype.slide = function(t, n) {
  var i = this.$element.find(".item.active"), o = n || i[t](), r = this.interval, s = "next" == t ? "left" : "right", a = "next" == t ? "first" : "last", l = this;
  if (!o.length) {
   if (!this.options.wrap) return;
   o = this.$element.find(".item")[a]();
  }
  this.sliding = !0, r && this.pause();
  var c = e.Event("slide.bs.carousel", {
   relatedTarget: o[0],
   direction: s
  });
  if (!o.hasClass("active")) {
   if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
   this.$element.one("slid", function() {
    var t = e(l.$indicators.children()[l.getActiveIndex()]);
    t && t.addClass("active");
   })), e.support.transition && this.$element.hasClass("slide")) {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    o.addClass(t), o[0].offsetWidth, i.addClass(s), o.addClass(s), i.one(e.support.transition.end, function() {
     o.removeClass([ t, s ].join(" ")).addClass("active"), i.removeClass([ "active", s ].join(" ")), 
     l.sliding = !1, setTimeout(function() {
      l.$element.trigger("slid");
     }, 0);
    }).emulateTransitionEnd(600);
   } else {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    i.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
   }
   return r && this.cycle(), this;
  }
 };
 var n = e.fn.carousel;
 e.fn.carousel = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.carousel"), r = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n), s = "string" == typeof n ? n : r.slide;
   o || i.data("bs.carousel", o = new t(this, r)), "number" == typeof n ? o.to(n) : s ? o[s]() : r.interval && o.pause().cycle();
  });
 }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
  return e.fn.carousel = n, this;
 }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
  var n, i = e(this), o = e(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), r = e.extend({}, o.data(), i.data()), s = i.attr("data-slide-to");
  s && (r.interval = !1), o.carousel(r), (s = i.attr("data-slide-to")) && o.data("bs.carousel").to(s), 
  t.preventDefault();
 }), e(window).on("load", function() {
  e('[data-ride="carousel"]').each(function() {
   var t = e(this);
   t.carousel(t.data());
  });
 });
}(window.jQuery), +function(e) {
 var t = function(n, i) {
  this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, i), this.transitioning = null, 
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
    var n = this.$parent && this.$parent.find("> .panel > .in");
    if (n && n.length) {
     var i = n.data("bs.collapse");
     if (i && i.transitioning) return;
     n.collapse("hide"), i || n.data("bs.collapse", null);
    }
    var o = this.dimension();
    this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
    var r = function() {
     this.$element.removeClass("collapsing").addClass("in")[o]("auto"), this.transitioning = 0, 
     this.$element.trigger("shown.bs.collapse");
    };
    if (!e.support.transition) return r.call(this);
    var s = e.camelCase([ "scroll", o ].join("-"));
    this.$element.one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350)[o](this.$element[0][s]);
   }
  }
 }, t.prototype.hide = function() {
  if (!this.transitioning && this.$element.hasClass("in")) {
   var t = e.Event("hide.bs.collapse");
   if (this.$element.trigger(t), !t.isDefaultPrevented()) {
    var n = this.dimension();
    this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
    this.transitioning = 1;
    var i = function() {
     this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
    };
    return e.support.transition ? (this.$element[n](0).one(e.support.transition.end, e.proxy(i, this)).emulateTransitionEnd(350), 
    void 0) : i.call(this);
   }
  }
 }, t.prototype.toggle = function() {
  this[this.$element.hasClass("in") ? "hide" : "show"]();
 };
 var n = e.fn.collapse;
 e.fn.collapse = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.collapse"), r = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n);
   o || i.data("bs.collapse", o = new t(this, r)), "string" == typeof n && o[n]();
  });
 }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
  return e.fn.collapse = n, this;
 }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
  var n, i = e(this), o = i.attr("data-target") || t.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), r = e(o), s = r.data("bs.collapse"), a = s ? "toggle" : i.data(), l = i.attr("data-parent"), c = l && e(l);
  s && s.transitioning || (c && c.find('[data-toggle=collapse][data-parent="' + l + '"]').not(i).addClass("collapsed"), 
  i[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(a);
 });
}(window.jQuery), +function(e) {
 function t() {
  e(i).remove(), e(o).each(function(t) {
   var i = n(e(this));
   i.hasClass("open") && (i.trigger(t = e.Event("hide.bs.dropdown")), t.isDefaultPrevented() || i.removeClass("open").trigger("hidden.bs.dropdown"));
  });
 }
 function n(t) {
  var n = t.attr("data-target");
  n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
  var i = n && e(n);
  return i && i.length ? i : t.parent();
 }
 var i = ".dropdown-backdrop", o = "[data-toggle=dropdown]", r = function(t) {
  e(t).on("click.bs.dropdown", this.toggle);
 };
 r.prototype.toggle = function(i) {
  var o = e(this);
  if (!o.is(".disabled, :disabled")) {
   var r = n(o), s = r.hasClass("open");
   if (t(), !s) {
    if ("ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t), 
    r.trigger(i = e.Event("show.bs.dropdown")), i.isDefaultPrevented()) return;
    r.toggleClass("open").trigger("shown.bs.dropdown"), o.focus();
   }
   return !1;
  }
 }, r.prototype.keydown = function(t) {
  if (/(38|40|27)/.test(t.keyCode)) {
   var i = e(this);
   if (t.preventDefault(), t.stopPropagation(), !i.is(".disabled, :disabled")) {
    var r = n(i), s = r.hasClass("open");
    if (!s || s && 27 == t.keyCode) return 27 == t.which && r.find(o).focus(), i.click();
    var a = e("[role=menu] li:not(.divider):visible a", r);
    if (a.length) {
     var l = a.index(a.filter(":focus"));
     38 == t.keyCode && l > 0 && l--, 40 == t.keyCode && l < a.length - 1 && l++, ~l || (l = 0), 
     a.eq(l).focus();
    }
   }
  }
 };
 var s = e.fn.dropdown;
 e.fn.dropdown = function(t) {
  return this.each(function() {
   var n = e(this), i = n.data("dropdown");
   i || n.data("dropdown", i = new r(this)), "string" == typeof t && i[t].call(n);
  });
 }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() {
  return e.fn.dropdown = s, this;
 }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
  e.stopPropagation();
 }).on("click.bs.dropdown.data-api", o, r.prototype.toggle).on("keydown.bs.dropdown.data-api", o + ", [role=menu]", r.prototype.keydown);
}(window.jQuery), +function(e) {
 var t = function(t, n) {
  this.options = n, this.$element = e(t), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote);
 };
 t.DEFAULTS = {
  backdrop: !0,
  keyboard: !0,
  show: !0
 }, t.prototype.toggle = function(e) {
  return this[this.isShown ? "hide" : "show"](e);
 }, t.prototype.show = function(t) {
  var n = this, i = e.Event("show.bs.modal", {
   relatedTarget: t
  });
  this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, 
  this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), 
  this.backdrop(function() {
   var i = e.support.transition && n.$element.hasClass("fade");
   n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show(), 
   i && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), 
   n.enforceFocus();
   var o = e.Event("shown.bs.modal", {
    relatedTarget: t
   });
   i ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() {
    n.$element.focus().trigger(o);
   }).emulateTransitionEnd(300) : n.$element.focus().trigger(o);
  }));
 }, t.prototype.hide = function(t) {
  t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), 
  this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), 
  this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), 
  e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
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
   var i = e.support.transition && n;
   if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), 
   this.$element.on("click.dismiss.modal", e.proxy(function(e) {
    e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
   }, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
   i ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t();
  } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t();
 };
 var n = e.fn.modal;
 e.fn.modal = function(n, i) {
  return this.each(function() {
   var o = e(this), r = o.data("bs.modal"), s = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof n && n);
   r || o.data("bs.modal", r = new t(this, s)), "string" == typeof n ? r[n](i) : s.show && r.show(i);
  });
 }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
  return e.fn.modal = n, this;
 }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
  var n = e(this), i = n.attr("href"), o = e(n.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")), r = o.data("modal") ? "toggle" : e.extend({
   remote: !/#/.test(i) && i
  }, o.data(), n.data());
  t.preventDefault(), o.modal(r, this).one("hide", function() {
   n.is(":visible") && n.focus();
  });
 }), e(document).on("show.bs.modal", ".modal", function() {
  e(document.body).addClass("modal-open");
 }).on("hidden.bs.modal", ".modal", function() {
  e(document.body).removeClass("modal-open");
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
 }, t.prototype.init = function(t, n, i) {
  this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(i);
  for (var o = this.options.trigger.split(" "), r = o.length; r--; ) {
   var s = o[r];
   if ("click" == s) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != s) {
    var a = "hover" == s ? "mouseenter" : "focus", l = "hover" == s ? "mouseleave" : "blur";
    this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
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
 }, t.prototype.getDelegateOptions = function() {
  var t = {}, n = this.getDefaults();
  return this._options && e.each(this._options, function(e, i) {
   n[e] != i && (t[e] = i);
  }), t;
 }, t.prototype.enter = function(t) {
  var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
  return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
   "in" == n.hoverState && n.show();
  }, n.options.delay.show), void 0) : n.show();
 }, t.prototype.leave = function(t) {
  var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
  return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
   "out" == n.hoverState && n.hide();
  }, n.options.delay.hide), void 0) : n.hide();
 }, t.prototype.show = function() {
  var t = e.Event("show.bs." + this.type);
  if (this.hasContent() && this.enabled) {
   if (this.$element.trigger(t), t.isDefaultPrevented()) return;
   var n = this.tip();
   this.setContent(), this.options.animation && n.addClass("fade");
   var i = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, o = /\s?auto?\s?/i, r = o.test(i);
   r && (i = i.replace(o, "") || "top"), n.detach().css({
    top: 0,
    left: 0,
    display: "block"
   }).addClass(i), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
   var s = this.getPosition(), a = n[0].offsetWidth, l = n[0].offsetHeight;
   if (r) {
    var c = this.$element.parent(), u = i, d = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth : c.outerWidth(), f = "body" == this.options.container ? window.innerHeight : c.outerHeight(), h = "body" == this.options.container ? 0 : c.offset().left;
    i = "bottom" == i && s.top + s.height + l - d > f ? "top" : "top" == i && s.top - d - l < 0 ? "bottom" : "right" == i && s.right + a > p ? "left" : "left" == i && s.left - a < h ? "right" : i, 
    n.removeClass(u).addClass(i);
   }
   var g = this.getCalculatedOffset(i, s, a, l);
   this.applyPlacement(g, i), this.$element.trigger("shown.bs." + this.type);
  }
 }, t.prototype.applyPlacement = function(e, t) {
  var n, i = this.tip(), o = i[0].offsetWidth, r = i[0].offsetHeight, s = parseInt(i.css("margin-top"), 10), a = parseInt(i.css("margin-left"), 10);
  isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top = e.top + s, e.left = e.left + a, 
  i.offset(e).addClass("in");
  var l = i[0].offsetWidth, c = i[0].offsetHeight;
  if ("top" == t && c != r && (n = !0, e.top = e.top + r - c), /bottom|top/.test(t)) {
   var u = 0;
   e.left < 0 && (u = -2 * e.left, e.left = 0, i.offset(e), l = i[0].offsetWidth, c = i[0].offsetHeight), 
   this.replaceArrow(u - o + l, l, "left");
  } else this.replaceArrow(c - r, c, "top");
  n && i.offset(e);
 }, t.prototype.replaceArrow = function(e, t, n) {
  this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "");
 }, t.prototype.setContent = function() {
  var e = this.tip(), t = this.getTitle();
  e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right");
 }, t.prototype.hide = function() {
  function t() {
   "in" != n.hoverState && i.detach();
  }
  var n = this, i = this.tip(), o = e.Event("hide.bs." + this.type);
  return this.$element.trigger(o), o.isDefaultPrevented() ? void 0 : (i.removeClass("in"), 
  e.support.transition && this.$tip.hasClass("fade") ? i.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), 
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
 }, t.prototype.getCalculatedOffset = function(e, t, n, i) {
  return "bottom" == e ? {
   top: t.top + t.height,
   left: t.left + t.width / 2 - n / 2
  } : "top" == e ? {
   top: t.top - i,
   left: t.left + t.width / 2 - n / 2
  } : "left" == e ? {
   top: t.top + t.height / 2 - i / 2,
   left: t.left - n
  } : {
   top: t.top + t.height / 2 - i / 2,
   left: t.left + t.width
  };
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
  var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
  n.tip().hasClass("in") ? n.leave(n) : n.enter(n);
 }, t.prototype.destroy = function() {
  this.hide().$element.off("." + this.type).removeData("bs." + this.type);
 };
 var n = e.fn.tooltip;
 e.fn.tooltip = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.tooltip"), r = "object" == typeof n && n;
   o || i.data("bs.tooltip", o = new t(this, r)), "string" == typeof n && o[n]();
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
  e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
 }, t.prototype.hasContent = function() {
  return this.getTitle() || this.getContent();
 }, t.prototype.getContent = function() {
  var e = this.$element, t = this.options;
  return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content);
 }, t.prototype.arrow = function() {
  return this.$arrow = this.$arrow || this.tip().find(".arrow");
 }, t.prototype.tip = function() {
  return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
 };
 var n = e.fn.popover;
 e.fn.popover = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.popover"), r = "object" == typeof n && n;
   o || i.data("bs.popover", o = new t(this, r)), "string" == typeof n && o[n]();
  });
 }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
  return e.fn.popover = n, this;
 };
}(window.jQuery), +function(e) {
 function t(n, i) {
  var o, r = e.proxy(this.process, this);
  this.$element = e(n).is("body") ? e(window) : e(n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", r), 
  this.options = e.extend({}, t.DEFAULTS, i), this.selector = (this.options.target || (o = e(n).attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
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
   var i = e(this), o = i.data("target") || i.attr("href"), r = /^#\w/.test(o) && e(o);
   return r && r.length && [ [ r[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), o ] ] || null;
  }).sort(function(e, t) {
   return e[0] - t[0];
  }).each(function() {
   n.offsets.push(this[0]), n.targets.push(this[1]);
  });
 }, t.prototype.process = function() {
  var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, i = n - this.$scrollElement.height(), o = this.offsets, r = this.targets, s = this.activeTarget;
  if (t >= i) return s != (e = r.last()[0]) && this.activate(e);
  for (e = o.length; e--; ) s != r[e] && t >= o[e] && (!o[e + 1] || t <= o[e + 1]) && this.activate(r[e]);
 }, t.prototype.activate = function(t) {
  this.activeTarget = t, e(this.selector).parents(".active").removeClass("active");
  var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', i = e(n).parents("li").addClass("active");
  i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), 
  i.trigger("activate");
 };
 var n = e.fn.scrollspy;
 e.fn.scrollspy = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.scrollspy"), r = "object" == typeof n && n;
   o || i.data("bs.scrollspy", o = new t(this, r)), "string" == typeof n && o[n]();
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
  var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), i = t.attr("data-target");
  if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
   var o = n.find(".active:last a")[0], r = e.Event("show.bs.tab", {
    relatedTarget: o
   });
   if (t.trigger(r), !r.isDefaultPrevented()) {
    var s = e(i);
    this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
     t.trigger({
      type: "shown.bs.tab",
      relatedTarget: o
     });
    });
   }
  }
 }, t.prototype.activate = function(t, n, i) {
  function o() {
   r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
   t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), 
   t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), i && i();
  }
  var r = n.find("> .active"), s = i && e.support.transition && r.hasClass("fade");
  s ? r.one(e.support.transition.end, o).emulateTransitionEnd(150) : o(), r.removeClass("in");
 };
 var n = e.fn.tab;
 e.fn.tab = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.tab");
   o || i.data("bs.tab", o = new t(this)), "string" == typeof n && o[n]();
  });
 }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
  return e.fn.tab = n, this;
 }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
  t.preventDefault(), e(this).tab("show");
 });
}(window.jQuery), +function(e) {
 var t = function(n, i) {
  this.options = e.extend({}, t.DEFAULTS, i), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), 
  this.$element = e(n), this.affixed = this.unpin = null, this.checkPosition();
 };
 t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
  offset: 0
 }, t.prototype.checkPositionWithEventLoop = function() {
  setTimeout(e.proxy(this.checkPosition, this), 1);
 }, t.prototype.checkPosition = function() {
  if (this.$element.is(":visible")) {
   var n = e(document).height(), i = this.$window.scrollTop(), o = this.$element.offset(), r = this.options.offset, s = r.top, a = r.bottom;
   "object" != typeof r && (a = s = r), "function" == typeof s && (s = r.top()), "function" == typeof a && (a = r.bottom());
   var l = null != this.unpin && i + this.unpin <= o.top ? !1 : null != a && o.top + this.$element.height() >= n - a ? "bottom" : null != s && s >= i ? "top" : !1;
   this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, 
   this.unpin = "bottom" == l ? o.top - i : null, this.$element.removeClass(t.RESET).addClass("affix" + (l ? "-" + l : "")), 
   "bottom" == l && this.$element.offset({
    top: document.body.offsetHeight - a - this.$element.height()
   }));
  }
 };
 var n = e.fn.affix;
 e.fn.affix = function(n) {
  return this.each(function() {
   var i = e(this), o = i.data("bs.affix"), r = "object" == typeof n && n;
   o || i.data("bs.affix", o = new t(this, r)), "string" == typeof n && o[n]();
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
}(window.jQuery), define("libs/bootstrap/bootstrap", function() {}), function(e) {
 var t = "waitForImages";
 e.waitForImages = {
  hasImageProperties: [ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage" ]
 }, e.expr[":"].uncached = function(t) {
  if (!e(t).is('img[src!=""]')) return !1;
  var n = new Image();
  return n.src = t.src, !n.complete;
 }, e.fn.waitForImages = function(n, i, o) {
  var r = 0, s = 0;
  if (e.isPlainObject(arguments[0]) && (o = arguments[0].waitForAll, i = arguments[0].each, 
  n = arguments[0].finished), n = n || e.noop, i = i || e.noop, o = !!o, !e.isFunction(n) || !e.isFunction(i)) throw new TypeError("An invalid callback was supplied.");
  return this.each(function() {
   var a = e(this), l = [], c = e.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
   o ? a.find("*").andSelf().each(function() {
    var t = e(this);
    t.is("img:uncached") && l.push({
     src: t.attr("src"),
     element: t[0]
    }), e.each(c, function(e, n) {
     var i, o = t.css(n);
     if (!o) return !0;
     for (;i = u.exec(o); ) l.push({
      src: i[2],
      element: t[0]
     });
    });
   }) : a.find("img:uncached").each(function() {
    l.push({
     src: this.src,
     element: this
    });
   }), r = l.length, s = 0, 0 === r && n.call(a[0]), e.each(l, function(o, l) {
    var c = new Image();
    e(c).bind("load." + t + " error." + t, function(e) {
     return s++, i.call(l.element, s, r, "load" == e.type), s == r ? (n.call(a[0]), !1) : void 0;
    }), c.src = l.src;
   });
  });
 };
}(jQuery), define("libs/jquery.waitforimages", function() {}), define("eventMgr", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "settings", "text!html/settingsExtensionsAccordion.html", "extensions/partialRendering", "extensions/userCustom", "extensions/buttonMarkdownSyntax", "extensions/googleAnalytics", "extensions/dialogAbout", "extensions/dialogManagePublication", "extensions/dialogManageSynchronization", "extensions/dialogOpenHarddrive", "extensions/documentTitle", "extensions/documentSelector", "extensions/documentPanel", "extensions/documentManager", "extensions/workingIndicator", "extensions/notifications", "extensions/markdownExtra", "extensions/toc", "extensions/mathJax", "extensions/emailConverter", "extensions/scrollLink", "extensions/buttonSync", "extensions/buttonPublish", "extensions/buttonShare", "extensions/buttonStat", "extensions/buttonHtmlCode", "extensions/buttonViewer", "libs/bootstrap/bootstrap", "libs/jquery.waitforimages" ], function(e, t, n, i, o, r, s) {
 function a(e) {
  return t.chain(d).map(function(t) {
   return t.enabled && t[e];
  }).compact().value();
 }
 function l(e) {
  return p[e] = a(e), function() {
   logger.log(e, arguments);
   var n = arguments;
   t.each(p[e], function(e) {
    try {
     e.apply(null, n);
    } catch (i) {
     console.error(t.isObject(i) ? i.stack : i);
    }
   });
  };
 }
 function c(e) {
  u[e] = l(e);
 }
 var u = {}, d = t.chain(arguments).map(function(e) {
  return e instanceof o && e;
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
   var t = e.onLoadSettings;
   t && t();
  });
 }, u.onSaveSettings = function(e, n) {
  logger.log("onSaveSettings"), t.each(d, function(o) {
   var r = t.extend({}, o.defaultConfig);
   r.enabled = i.getInputChecked("#input-enable-extension-" + o.extensionId);
   var s = o.onSaveSettings;
   s && s(r, n), e[o.extensionId] = r;
  });
 }, c("onMessage"), c("onError"), c("onOfflineChanged"), c("onUserActive"), c("onAsyncRunning", !0), 
 c("onPeriodicRun", !0), c("onFileMgrCreated"), c("onSynchronizerCreated"), c("onPublisherCreated"), 
 c("onEventMgrCreated"), c("onFileCreated"), c("onFileDeleted"), c("onFileSelected"), 
 c("onFileOpen"), c("onFileClosed"), c("onContentChanged"), c("onTitleChanged"), 
 c("onFoldersChanged"), c("onSyncRunning"), c("onSyncSuccess"), c("onSyncImportSuccess"), 
 c("onSyncExportSuccess"), c("onSyncRemoved"), c("onPublishRunning"), c("onPublishSuccess"), 
 c("onNewPublishSuccess"), c("onPublishRemoved"), c("onLayoutConfigure"), c("onLayoutCreated"), 
 c("onEditorConfigure"), c("onSectionsCreated");
 var f = l("onPreviewFinished"), h = a("onAsyncPreview"), g = h.length + 1, m = void 0, v = void 0;
 u.onAsyncPreview = function() {
  function e() {
   ++n === g && (logger.log("Preview time: " + (new Date() - u.previewStartTime)), 
   t.defer(function() {
    var e = "";
    t.each(m.children, function(t) {
     e += t.innerHTML;
    }), f(i.trim(e));
   }));
  }
  logger.log("onAsyncPreview"), logger.log("Conversion time: " + (new Date() - u.previewStartTime));
  var n = 0;
  v.waitForImages(e), t.each(h, function(t) {
   t(e);
  });
 };
 var b = l("onReady");
 return u.onReady = function() {
  function i(e) {
   var i = n("div", {
    "class": "btn-group"
   }), o = e();
   return t.isString(o) ? i.innerHTML = o : t.isElement(o) && i.appendChild(o), i;
  }
  if (m = document.getElementById("preview-contents"), v = e(m), viewerMode === !1) {
   var o = t.chain(d).sortBy(function(e) {
    return e.extensionName.toLowerCase();
   }).reduce(function(e, n) {
    return e + (n.settingsBlock ? t.template(s, {
     extensionId: n.extensionId,
     extensionName: n.extensionName,
     isOptional: n.isOptional,
     settingsBlock: n.settingsBlock
    }) : "");
   }, "").value();
   document.querySelector(".accordion-extensions").innerHTML = o, logger.log("onCreateButton");
   var r = a("onCreateButton"), l = document.createDocumentFragment();
   t.each(r, function(e) {
    l.appendChild(i(e));
   }), document.getElementById("extension-buttons").appendChild(l), logger.log("onCreatePreviewButton");
   var c = a("onCreatePreviewButton"), u = document.createDocumentFragment();
   t.each(c, function(e) {
    u.appendChild(i(e));
   });
   var p = document.querySelector(".extension-preview-buttons");
   p.appendChild(u);
   var f = e(p), h = f.width();
   f.find(".btn-group").each(function() {
    var t = e(this);
    t.find(".dropdown-menu").css({
     right: -h + t.width() + t.position().left
    });
   });
  }
  b();
 }, u.onEventMgrCreated(u), u;
}), define("text!html/bodyIndex.html", [], function() {
 return '<div class="navbar navbar-default ui-layout-north">\n	<div class="navbar-inner">\n		<div class="nav left-space"></div>\n		<div class="nav right-space pull-right"></div>\n		<ul class="nav">\n			<li class="wmd-button-group1 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group2 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group3 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group4 btn-group"></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li class="btn-group"><button\n					class="btn btn-success action-create-file"\n					title="New local document">\n					<i class="icon-file"></i>\n				</button>\n				<button class="btn btn-success" title="Delete current document"\n					data-toggle="modal" data-target=".modal-remove-file-confirm">\n					<i class="icon-trash"></i>\n				</button></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li id="extension-buttons"></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><a class="btn btn-success file-title-navbar" href="#"\n				title="Rename current document"> </a></li>\n			<li><input type="text"\n				class="col-lg-4 form-control hide input-file-title"\n				placeholder="Document title" /></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n		</ul>\n	</div>\n</div>\n<textarea id="wmd-input" class="ui-layout-center form-control"></textarea>\n<div class="ui-layout-east preview-container"></div>\n<div class="ui-layout-south preview-container"></div>\n<div id="wmd-button-bar" class="hide"></div>\n\n<div class="menu-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".menu-panel" title="Menu">\n		<i class="icon-left-dir"></i> <img data-stackedit-src="stackedit-64.png"\n			width="32" height="32" />\n	</button>\n	<div class="panel-content">\n		<div class="list-group">\n			<a href="viewer.html" title="StackEdit Viewer"\n				class="list-group-item"><i class="icon-resize-full"></i>\n				StackEdit Viewer</a> <a href="#" data-toggle="collapse"\n				data-target=".collapse-open-from" class="list-group-item"><i\n				class="icon-hdd"></i> Open from...</a>\n			<div class="sub-menu collapse collapse-open-from clearfix">\n				<ul class="nav">\n					<li><a data-toggle="modal"\n						data-target=".modal-import-harddrive-markdown"\n						class="action-reset-input" href="#">Import from hard drive</a></li>\n					<li><a data-toggle="modal"\n						data-target=".modal-import-harddrive-html"\n						class="action-reset-input" href="#">Convert HTML to Markdown</a></li>\n				</ul>\n			</div>\n\n			<a href="#" data-toggle="collapse" data-target=".collapse-save-as"\n				class="list-group-item"><i class="icon-hdd"></i> Save as...</a>\n			<div class="sub-menu collapse collapse-save-as clearfix">\n				<ul class="nav">\n					<li><a class="action-download-md" href="#">Save as\n							Markdown</a></li>\n					<li><a class="action-download-html" href="#">Save as HTML</a></li>\n					<li><a class="action-download-template" href="#">Save\n							using template</a></li>\n				</ul>\n			</div>\n		</div>\n		<div class=dropdown-header>SYNCHRONIZE</div>\n		<div class="list-group">\n			<a href="#" data-toggle="collapse"\n				data-target=".collapse-sync-gdrive" class="list-group-item"><i\n				class="icon-provider-gdrive"></i> Google Drive</a>\n			<div class="sub-menu collapse collapse-sync-gdrive clearfix">\n				<ul class="nav">\n					<li><a href="#" class="action-sync-import-gdrive"\n						data-toggle="collapse" data-target=".menu-panel">Import from\n							Google Drive</a></li>\n					<li><a href="#" class="action-sync-export-dialog-gdrive">Export\n							to Google Drive</a></li>\n				</ul>\n			</div>\n			<a href="#" data-toggle="collapse"\n				data-target=".collapse-sync-dropbox" class="list-group-item"><i\n				class="icon-provider-dropbox"></i> Dropbox</a>\n			<div class="sub-menu collapse collapse-sync-dropbox clearfix">\n				<ul class="nav">\n					<li><a class="action-sync-import-dropbox" href="#"\n						data-toggle="collapse" data-target=".menu-panel">Import from\n							Dropbox</a></li>\n					<li><a href="#" class="action-sync-export-dialog-dropbox">Export\n							to Dropbox</a></li>\n				</ul>\n			</div>\n			<a href="#" data-toggle="modal" data-target=".modal-manage-sync"\n				class="action-reset-input list-group-item"><i\n				class="icon-refresh"></i> Manage synchronization</a>\n		</div>\n		<div class=dropdown-header>PUBLISH</div>\n		<div class="list-group">\n			<a href="#" data-toggle="collapse" data-target=".collapse-publish-on"\n				class="list-group-item"><i class="icon-share"></i> Publish on...</a>\n			<div class="sub-menu collapse collapse-publish-on clearfix">\n				<ul class="nav">\n				</ul>\n			</div>\n			<a href="#" data-toggle="modal" data-target=".modal-manage-publish"\n				class="action-reset-input list-group-item"><i class="icon-share"></i>\n				Manage publication</a>\n		</div>\n		<ul class="nav">\n			<li><a href="#" data-toggle="modal"\n				data-target=".modal-settings" class="action-load-settings"><i\n					class="icon-cog"></i> Settings</a></li>\n			<li><a href="#" data-toggle="modal" data-target=".modal-about"><i\n					class="icon-help-circled"></i> About</a></li>\n		</ul>\n\n	</div>\n</div>\n\n\n<div class="document-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".document-panel" title="Select document">\n		<i class="icon-folder-open"></i> <i class="icon-right-dir"></i>\n	</button>\n	<div class="search-bar clearfix">\n		<div class="input-group">\n			<span class="input-group-addon"><i class="icon-search"></i></span><input\n				type="text" class="form-control"></input>\n			<button type="button" class="close" title="clear">&times;</button>\n			<div class="input-group-btn">\n				<a data-toggle="modal" data-target=".modal-document-manager"\n					class="btn btn-link" title="Manage documents"><i\n					class="icon-layers"></i></a>\n			</div>\n		</div>\n	</div>\n	<div class="panel-content">\n		<div class="list-group document-list"></div>\n		<div class="list-group document-list-filtered hide"></div>\n	</div>\n</div>\n\n\n<div class="modal modal-document-manager">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Manage documents</h3>\n			</div>\n			<div class="modal-body">\n				<div></div>\n				<ul class="nav nav-pills document-list">\n					<li class="pull-right dropdown"><a href="#"\n						data-toggle="dropdown"><i class="icon-check"></i> Selection <b\n							class="caret"></b></a>\n						<ul class="dropdown-menu">\n							<li><a href="#" class="action-select-all"><i\n									class="icon-check"></i> Select all</a></li>\n							<li><a href="#" class="action-unselect-all"><i\n									class="icon-check-empty"></i> Unselect all</a></li>\n							<li class="divider"></li>\n							<li><a href="#" class="action-move-items"><i\n									class="icon-forward"></i> Move to folder</a></li>\n							<li><a href="#" class="action-delete-items"><i\n									class="icon-trash"></i> Delete</a></li>\n						</ul></li>\n					<li class="pull-right"><a href="#"\n						class="action-create-folder"> <i class="icon-folder"></i>\n							Create folder\n					</a></li>\n					<li class="disabled"><a><i class="icon-file"></i> <span\n							class="document-count"></span></a></li>\n					<li class="disabled"><a><i class="icon-folder"></i> <span\n							class="folder-count"></span></a></li>\n				</ul>\n				<div class="list-group document-list"></div>\n				<p class="confirm-delete hide">The following documents will be\n					deleted locally:</p>\n				<p class="choose-folder hide">Please choose a destination\n					folder:</p>\n				<div class="list-group selected-document-list hide"></div>\n				<div class="list-group select-folder-list hide"></div>\n			</div>\n			<div class="modal-footer">\n				<a href="#"\n					class="btn btn-default confirm-delete choose-folder action-cancel hide">Cancel</a>\n				<a href="#"\n					class="btn btn-primary confirm-delete action-delete-items-confirm hide">OK</a>\n				<a href="#" class="btn btn-primary document-list"\n					data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-insert-link">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Hyperlink</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the link URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-globe"></i></span><input\n						id="input-insert-link" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/ "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-insert-link"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-insert-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Image</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the image URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-picture"></i></span><input\n						id="input-insert-image" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/image.jpg "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default action-import-image-gplus"\n					data-dismiss="modal"><i class="icon-provider-gplus"></i> Import\n					from Google+</a> <a href="#" class="btn btn-default"\n					data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-insert-image" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Google+ image import</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group">\n						<div class="col-lg-7">\n							<img>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-title">Title (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-import-image-title"\n								placeholder="Image title" class="form-control">\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-size">Size limit (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-import-image-size" placeholder="123"\n								class="col-lg-3 form-control"> px\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-import-image"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-remove-file-confirm">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Delete</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					Are you sure you want to delete "<span class="file-title"></span>"?\n				</p>\n				<blockquote>\n					<b>NOTE:</b> This will not delete the file on synchronized\n					locations.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-remove-file"\n					data-dismiss="modal">Delete</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-harddrive-markdown">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Import from hard drive</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your Markdown files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-markdown"\n						multiple class="form-control" />\n				</p>\n				<p>Or drag and drop your Markdown files here:</p>\n				<p id="dropzone-import-harddrive-markdown" class="drop-zone">Drop\n					files here</p>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-harddrive-html">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Convert HTML to Markdown</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your HTML files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-html" multiple\n						class="form-control" />\n				</p>\n				<p>Or drag and drop your HTML files here:</p>\n				<p id="dropzone-import-harddrive-html" class="drop-zone">Drop\n					files here</p>\n				<p>Or insert your HTML code here:</p>\n				<textarea id="input-convert-html" class="form-control"></textarea>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Close</a> <a\n					href="#" class="btn btn-primary action-convert-html"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-upload-gdrive">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Google Drive</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					This will save "<span class="file-title"></span>" to your Google\n					Drive account and keep it synchronized.\n				</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-gdrive-parentid">Folder ID\n							(optional)</label>\n						<div class="col-lg-8">\n							<div class="input-group">\n								<input type="text" id="input-sync-export-gdrive-parentid"\n									placeholder="FolderID" class="form-control">\n								<div class="input-group-btn">\n									<a class="btn btn-link export-gdrive-choose-folder"\n										title="Choose folder" data-dismiss="modal"><i class="icon-folder-open"></i></a>\n								</div>\n							</div>\n							<span class="help-block"> If no folder ID is supplied, the\n								file will be created in your root folder. </span>\n						</div>\n					</div>\n					<div class="form-group">\n						<div class="col-lg-3 control-label"></div>\n						<div class="col-lg-8">\n							<label> <input id="input-sync-export-gdrive-realtime"\n								type="checkbox"> Create a real time collaborative\n								document\n							</label>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-gdrive-fileid">Existing file ID\n							(optional)</label>\n						<div class="col-lg-8">\n							<input type="text" id="input-sync-export-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block"> This will overwrite the existing file\n								on the server. </span>\n						</div>\n					</div>\n				</div>\n				<blockquote>\n					<b>NOTE:</b>\n					<ul>\n						<li>You can move or rename the file afterwards within Google\n							Drive.</li>\n						<li>Real time collaborative documents can\'t be open outside\n							StackEdit.</li>\n						<li>Real time collaborative documents can\'t have multiple\n							synchronized locations.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-sync-export-gdrive">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-upload-dropbox">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Dropbox</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					This will save "<span class="file-title"></span>" to your Dropbox\n					account and keep it synchronized.\n				</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-dropbox-path">File path</label>\n						<div class="col-lg-8">\n							<input type="text" id="input-sync-export-dropbox-path"\n								placeholder="/path/to/My Document.md" class="form-control">\n							<span class="help-block"> File path is composed of both\n								folder and filename. </span>\n						</div>\n					</div>\n				</div>\n				<blockquote>\n					<b>NOTE:</b>\n					<ul>\n						<li>Dropbox file path does not depend on document title.</li>\n						<li>The title of your document will not be synchronized.</li>\n						<li>Destination folder must exist.</li>\n						<li>Any existing file at this location will be overwritten.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-sync-export-dropbox">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-manage-sync">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Synchronization</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-sync-list hide">\n					"<span class="file-title"></span>" is synchronized with the\n					following location(s):\n				</p>\n				<div class="msg-sync-list sync-list hide"></div>\n				<blockquote class="msg-sync-list hide">\n					<b>NOTE:</b> Removing a synchronized location will not delete any\n					file.\n				</blockquote>\n				<blockquote class="msg-no-sync hide">\n					"<span class="file-title"></span>" is not synchronized yet. <br />\n					<br /> <b>NOTE:</b> You can add synchronized locations by\n					exporting your document using <i class="icon-provider-gdrive"></i>\n					Google Drive or <i class="icon-provider-dropbox"></i> Dropbox\n					sub-menu.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">\n					Publish on <span class="publish-provider-name"></span>\n				</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-host">Host</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-host"\n								placeholder="host.name.or.ip" class="form-control"> <span\n								class="help-block"> Host must be accessible publicly,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-port">Port\n							(optional)</label>\n						<div class="col-lg-2">\n							<input type="text" id="input-publish-ssh-port" placeholder="22"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-username">Username</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-password">Password</label>\n						<div class="col-lg-7">\n							<input type="password" id="input-publish-ssh-password"\n								placeholder="password" class="form-control"> <span\n								class="help-block"> Passwords are transmitted in clear,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-reponame">Repository</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-reponame"\n								placeholder="repository-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-username">Username (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-branch">Branch</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-branch"\n								placeholder="branch-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-file-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-file-path"\n								placeholder="path/to/file.md" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-filename">Filename</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-filename"\n								placeholder="filename" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-gist-id">Existing\n							ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gist-id"\n								placeholder="GistID" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gist-public">Public</label>\n						<div class="col-lg-7">\n							<div class="checkbox">\n								<input type="checkbox" id="input-publish-gist-public"\n									checked="checked" />\n							</div>\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label"\n							for="input-publish-blogger-url">Blog URL</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-blogger-url"\n								placeholder="http://exemple.blogger.com/" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-tumblr">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">Blog hostname</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tumblr-hostname"\n								placeholder="exemple.tumblr.com" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-wordpress">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">WordPress site</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-wordpress-site"\n								placeholder="exemple.wordpress.com" class="form-control">\n							<span class="help-block"> <a target="_blank"\n								href="http://jetpack.me/">Jetpack plugin</a> is required for\n								self-hosted sites.\n							</span>\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-blogger modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-postid">Update\n							existing post ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-postid" placeholder="PostID"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label" for="input-publish-labels">Labels\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-labels"\n								placeholder="Label1, Label2" class="form-control">\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-tags">Tags\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tags"\n								placeholder="Tag1, Tag2" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-dropbox">\n						<label class="col-lg-4 control-label"\n							for="input-publish-dropbox-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-dropbox-path"\n								placeholder="/path/to/My Document.html" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-fileid">File ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block">If no file ID is supplied, a new file\n								will be created in your Google Drive root folder. You can move\n								the file afterwards within Google Drive.</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-filename">Force filename\n							(optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-filename"\n								placeholder="Filename" class="form-control"> <span\n								class="help-block">If no file name is supplied, the\n								document title will be used.</span>\n						</div>\n					</div>\n\n					<div class="form-group">\n						<label class="col-lg-4 control-label">Format</label>\n						<div class="col-lg-7">\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="markdown"> Markdown\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="html"> HTML\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="template"> Template\n								</label>\n							</div>\n						</div>\n					</div>\n					<div class="form-group collapse publish-custom-template-collapse">\n						<div class="col-lg-4"></div>\n						<div class="col-lg-7">\n							<div class="checkbox">\n								<label> <input type="checkbox"\n									id="checkbox-publish-custom-template"> Custom template\n								</label> <a href="#" class="tooltip-template">(?)</a>\n							</div>\n							<textarea class="form-control"\n								id="textarea-publish-custom-template"></textarea>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-process-publish">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-manage-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Publication</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-publish-list hide">\n					"<span class="file-title"></span>" is published on the following\n					location(s):\n				</p>\n				<div class="msg-publish-list publish-list hide"></div>\n				<blockquote>\n					<div class="msg-no-publish hide">\n						"<span class="file-title"></span>" is not published yet. <br /> <br />\n					</div>\n					<b>NOTE:</b> You can add publications using "Publish on" sub-menu.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-settings">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Settings</h3>\n				<ul class="nav nav-tabs">\n					<li class="active"><a class="action-load-settings"\n						href="#tabpane-settings-editor" data-toggle="tab">Editor</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-publish" data-toggle="tab">Publish</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-extensions" data-toggle="tab">Extensions</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-utils" data-toggle="tab">Utils</a></li>\n				</ul>\n			</div>\n			<div class="modal-body">\n\n				<div class="tab-content clearfix">\n					<div class="tab-pane active" id="tabpane-settings-editor">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label">Layout orientation</label>\n								<div class="col-lg-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="horizontal">\n											Horizontal\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="vertical">\n											Vertical\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label" for="input-settings-theme">Theme</label>\n								<div class="col-lg-7">\n									<select id="input-settings-theme" class="form-control">\n									</select> <span class="help-block"><a target="_blank"\n										href="https://github.com/benweet/stackedit/blob/master/doc/theming.md#stackedit-theming-guide">Create\n											your own theme...</a></span>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-lazy-rendering">Lazy rendering <a\n									href="#" class="tooltip-lazy-rendering">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<div class="checkbox">\n										<input type="checkbox" id="input-settings-lazy-rendering" />\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-editor-font-family">Editor font</label>\n								<div class="col-lg-8 form-inline">\n									<input type="text" id="input-settings-editor-font-family"\n										class="form-control col-lg-7"> <input type="text"\n										id="input-settings-editor-font-size"\n										class="form-control col-lg-2"> px\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-default-content">Default content\n									<a href="#" class="tooltip-default-content">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-default-content"\n										class="form-control"></textarea>\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-publish">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-publish-commit-msg">Commit message</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-publish-commit-msg"\n										class="form-control">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-publish-template">Default\n									template <a href="#" class="tooltip-template">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-publish-template"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-ssh-proxy">SSH proxy</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-ssh-proxy"\n										class="form-control">\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-extensions">\n						<div class="panel-group accordion-extensions"></div>\n						<span class="help-block pull-right"><a target="_blank"\n							href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">Create\n								your own extension...</a></span>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-utils">\n						<div class="tab-pane-button-container">\n							<a href="#"\n								class="btn btn-block btn-primary action-import-settings"><i\n								class="icon-wrench icon-white"></i> Import settings</a> <a href="#"\n								class="btn btn-block btn-primary action-export-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Export settings</a> <a href="#"\n								class="btn btn-block btn-primary action-default-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Load default settings</a> <input type="file"\n								id="input-file-import-settings" class="hide">\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#" class="btn btn-block btn-primary action-welcome-file"\n								data-dismiss="modal"><i class="icon-help-circled icon-white"></i>\n								Welcome document</a> <a href="#" class="btn btn-block btn-primary"\n								data-dismiss="modal" data-toggle="modal"\n								data-target=".modal-app-reset"><i\n								class="icon-fire icon-white"></i> Reset application</a>\n						</div>\n					</div>\n				</div>\n\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default action-apply-theme"\n					data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-apply-settings" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>If you want to reopen StackEdit, click on\n					"Reload".</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-app-reset">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Reset application</h3>\n			</div>\n			<div class="modal-body">\n				<p>This will delete all your local documents.</p>\n				<blockquote>Are you sure?</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-app-reset"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<textarea id="md-section-helper" class="form-control"></textarea>\n<div class="lock-ui hide"></div>\n<div id="dropboxjs" data-app-key="x0k2l8puemfvg0o"></div>';
}), define("text!html/bodyViewer.html", [], function() {
 return '\n<div class="navbar navbar-default ui-layout-north">\n	<div class="navbar-inner">\n		<div class="nav right-space pull-right"></div>\n\n		<ul class="nav pull-right">\n			<li class="btn-group">\n				<button class="btn btn-default action-edit-document hide"\n					title="Edit this document">\n					<i class="icon-pencil"></i>\n				</button>\n			</li>\n			<li class="btn-group">\n				<button class="btn btn-default dropdown-toggle"\n					data-toggle="dropdown" title="Save this document">\n					<i class="icon-download"></i>\n				</button>\n				<ul class="dropdown-menu">\n					<li><a class="action-download-md" href="#"><i\n							class="icon-download"></i> Save as Markdown</a></li>\n					<li><a class="action-download-html" href="#"><i\n							class="icon-download"></i> Save as HTML</a></li>\n					<li><a class="action-download-template" href="#"><i\n							class="icon-download"></i> Save using template</a></li>\n				</ul>\n			</li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><span class="file-title-navbar"></span></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n		</ul>\n\n	</div>\n</div>\n<div id="wmd-button-bar" class="hide"></div>\n<textarea id="wmd-input" class="hide"></textarea>\n<div class="ui-layout-center preview-container"></div>\n\n<div class="menu-panel collapse width">\n	<button class="btn btn-success collapse-button action-open-stackedit" title="Open StackEdit">\n		<i class="icon-left-dir"></i> <img data-stackedit-src="stackedit-64.png"\n			width="32" height="32" />\n	</button>\n</div>\n\n<div class="document-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".document-panel" title="Select document">\n		<i class="icon-folder-open"></i> <i class="icon-right-dir"></i>\n	</button>\n	<div class="search-bar clearfix">\n		<div class="input-group">\n			<span class="input-group-addon"><i class="icon-search"></i></span><input\n				type="text" class="form-control"></input>\n			<button type="button" class="close" title="clear">&times;</button>\n			<div class="input-group-btn">\n				<a data-toggle="modal" data-target=".modal-document-manager"\n					class="btn btn-link" title="Manage documents"><i\n					class="icon-layers"></i></a>\n			</div>\n		</div>\n	</div>\n	<div class="panel-content">\n		<div class="list-group document-list"></div>\n		<div class="list-group document-list-filtered hide"></div>\n	</div>\n</div>\n\n<div class="modal modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>If you want to reopen\n					StackEdit, click on "Reload".</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/settingsTemplateTooltip.html", [], function() {
 return 'Available variables:\n<br>\n<ul>\n	<li><b>documentTitle</b>: document title</li>\n	<li><b>documentMarkdown</b>: document in Markdown format</li>\n	<li><b>documentHTML</b>: document in HTML format</li>\n	<li><b>publishAttributes</b>: attributes of the publish location\n		(undefined if not publishing)</li>\n</ul>\n<b>Examples:</b>\n<br />\n&lt;title&gt;&lt;%= documentTitle %&gt;&lt;&#x2F;title&gt;\n<br />\n&lt;div&gt;&lt;%- documentHTML %&gt;&lt;&#x2F;div&gt;\n<br />\n&lt;%<br />\nif(publishAttributes.provider.providerId == &quot;github&quot;)\nprint(documentMarkdown);<br />\n%&gt;\n<br />\n<br />\n<a target="_blank" href="http://underscorejs.org/#template">More\n	info</a>';
}), define("text!html/settingsUserCustomExtensionTooltip.html", [], function() {
 return 'Extension variable name:\n<b>userCustom</b>\n<br>\n<br>\n<b>Example:</b>\n<br />\nuserCustom.onPreviewFinished = function() {\n<br />\n&nbsp;&nbsp;eventMgr.onMessage(&quot;Finished!&quot;);\n<br />\n};\n<br />\n<br />\n<a target="_blank"\n	href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More\n	info</a>';
}), function(e, t) {
 function n(t, n) {
  var o, r, s, a = t.nodeName.toLowerCase();
  return "area" === a ? (o = t.parentNode, r = o.name, t.href && r && "map" === o.nodeName.toLowerCase() ? (s = e("img[usemap=#" + r + "]")[0], 
  !!s && i(s)) : !1) : (/input|select|textarea|button|object/.test(a) ? !t.disabled : "a" === a ? t.href || n : n) && i(t);
 }
 function i(t) {
  return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
   return "hidden" === e.css(this, "visibility");
  }).length;
 }
 var o = 0, r = /^ui-id-\d+$/;
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
   return function(n, i) {
    return "number" == typeof n ? this.each(function() {
     var t = this;
     setTimeout(function() {
      e(t).focus(), i && i.call(t);
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
   if (this.length) for (var i, o, r = e(this[0]); r.length && r[0] !== document; ) {
    if (i = r.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (o = parseInt(r.css("zIndex"), 10), 
    !isNaN(o) && 0 !== o)) return o;
    r = r.parent();
   }
   return 0;
  },
  uniqueId: function() {
   return this.each(function() {
    this.id || (this.id = "ui-id-" + ++o);
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
  }) : function(t, n, i) {
   return !!e.data(t, i[3]);
  },
  focusable: function(t) {
   return n(t, !isNaN(e.attr(t, "tabindex")));
  },
  tabbable: function(t) {
   var i = e.attr(t, "tabindex"), o = isNaN(i);
   return (o || i >= 0) && n(t, !o);
  }
 }), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(n, i) {
  function o(t, n, i, o) {
   return e.each(r, function() {
    n -= parseFloat(e.css(t, "padding" + this)) || 0, i && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), 
    o && (n -= parseFloat(e.css(t, "margin" + this)) || 0);
   }), n;
  }
  var r = "Width" === i ? [ "Left", "Right" ] : [ "Top", "Bottom" ], s = i.toLowerCase(), a = {
   innerWidth: e.fn.innerWidth,
   innerHeight: e.fn.innerHeight,
   outerWidth: e.fn.outerWidth,
   outerHeight: e.fn.outerHeight
  };
  e.fn["inner" + i] = function(n) {
   return n === t ? a["inner" + i].call(this) : this.each(function() {
    e(this).css(s, o(this, n) + "px");
   });
  }, e.fn["outer" + i] = function(t, n) {
   return "number" != typeof t ? a["outer" + i].call(this, t) : this.each(function() {
    e(this).css(s, o(this, t, !0, n) + "px");
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
   add: function(t, n, i) {
    var o, r = e.ui[t].prototype;
    for (o in i) r.plugins[o] = r.plugins[o] || [], r.plugins[o].push([ n, i[o] ]);
   },
   call: function(e, t, n) {
    var i, o = e.plugins[t];
    if (o && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (i = 0; i < o.length; i++) e.options[o[i][0]] && o[i][1].apply(e.element, n);
   }
  },
  hasScroll: function(t, n) {
   if ("hidden" === e(t).css("overflow")) return !1;
   var i = n && "left" === n ? "scrollLeft" : "scrollTop", o = !1;
   return t[i] > 0 ? !0 : (t[i] = 1, o = t[i] > 0, t[i] = 0, o);
  }
 });
}(jQuery), function(e, t) {
 var n = 0, i = Array.prototype.slice, o = e.cleanData;
 e.cleanData = function(t) {
  for (var n, i = 0; null != (n = t[i]); i++) try {
   e(n).triggerHandler("remove");
  } catch (r) {}
  o(t);
 }, e.widget = function(t, n, i) {
  var o, r, s, a, l = {}, c = t.split(".")[0];
  t = t.split(".")[1], o = c + "-" + t, i || (i = n, n = e.Widget), e.expr[":"][o.toLowerCase()] = function(t) {
   return !!e.data(t, o);
  }, e[c] = e[c] || {}, r = e[c][t], s = e[c][t] = function(e, t) {
   return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new s(e, t);
  }, e.extend(s, r, {
   version: i.version,
   _proto: e.extend({}, i),
   _childConstructors: []
  }), a = new n(), a.options = e.widget.extend({}, a.options), e.each(i, function(t, i) {
   return e.isFunction(i) ? (l[t] = function() {
    var e = function() {
     return n.prototype[t].apply(this, arguments);
    }, o = function(e) {
     return n.prototype[t].apply(this, e);
    };
    return function() {
     var t, n = this._super, r = this._superApply;
     return this._super = e, this._superApply = o, t = i.apply(this, arguments), this._super = n, 
     this._superApply = r, t;
    };
   }(), void 0) : (l[t] = i, void 0);
  }), s.prototype = e.widget.extend(a, {
   widgetEventPrefix: r ? a.widgetEventPrefix : t
  }, l, {
   constructor: s,
   namespace: c,
   widgetName: t,
   widgetFullName: o
  }), r ? (e.each(r._childConstructors, function(t, n) {
   var i = n.prototype;
   e.widget(i.namespace + "." + i.widgetName, s, n._proto);
  }), delete r._childConstructors) : n._childConstructors.push(s), e.widget.bridge(t, s);
 }, e.widget.extend = function(n) {
  for (var o, r, s = i.call(arguments, 1), a = 0, l = s.length; l > a; a++) for (o in s[a]) r = s[a][o], 
  s[a].hasOwnProperty(o) && r !== t && (n[o] = e.isPlainObject(r) ? e.isPlainObject(n[o]) ? e.widget.extend({}, n[o], r) : e.widget.extend({}, r) : r);
  return n;
 }, e.widget.bridge = function(n, o) {
  var r = o.prototype.widgetFullName || n;
  e.fn[n] = function(s) {
   var a = "string" == typeof s, l = i.call(arguments, 1), c = this;
   return s = !a && l.length ? e.widget.extend.apply(null, [ s ].concat(l)) : s, a ? this.each(function() {
    var i, o = e.data(this, r);
    return o ? e.isFunction(o[s]) && "_" !== s.charAt(0) ? (i = o[s].apply(o, l), i !== o && i !== t ? (c = i && i.jquery ? c.pushStack(i.get()) : i, 
    !1) : void 0) : e.error("no such method '" + s + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + s + "'");
   }) : this.each(function() {
    var t = e.data(this, r);
    t ? t.option(s || {})._init() : e.data(this, r, new o(s, this));
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
  _createWidget: function(t, i) {
   i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = n++, 
   this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), 
   this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), 
   this._on(!0, this.element, {
    remove: function(e) {
     e.target === i && this.destroy();
    }
   }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), 
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
  option: function(n, i) {
   var o, r, s, a = n;
   if (0 === arguments.length) return e.widget.extend({}, this.options);
   if ("string" == typeof n) if (a = {}, o = n.split("."), n = o.shift(), o.length) {
    for (r = a[n] = e.widget.extend({}, this.options[n]), s = 0; s < o.length - 1; s++) r[o[s]] = r[o[s]] || {}, 
    r = r[o[s]];
    if (n = o.pop(), i === t) return r[n] === t ? null : r[n];
    r[n] = i;
   } else {
    if (i === t) return this.options[n] === t ? null : this.options[n];
    a[n] = i;
   }
   return this._setOptions(a), this;
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
  _on: function(t, n, i) {
   var o, r = this;
   "boolean" != typeof t && (i = n, n = t, t = !1), i ? (n = o = e(n), this.bindings = this.bindings.add(n)) : (i = n, 
   n = this.element, o = this.widget()), e.each(i, function(i, s) {
    function a() {
     return t || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? r[s] : s).apply(r, arguments) : void 0;
    }
    "string" != typeof s && (a.guid = s.guid = s.guid || a.guid || e.guid++);
    var l = i.match(/^(\w+)\s*(.*)$/), c = l[1] + r.eventNamespace, u = l[2];
    u ? o.delegate(u, c, a) : n.bind(c, a);
   });
  },
  _off: function(e, t) {
   t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
   e.unbind(t).undelegate(t);
  },
  _delay: function(e, t) {
   function n() {
    return ("string" == typeof e ? i[e] : e).apply(i, arguments);
   }
   var i = this;
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
  _trigger: function(t, n, i) {
   var o, r, s = this.options[t];
   if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), 
   n.target = this.element[0], r = n.originalEvent) for (o in r) o in n || (n[o] = r[o]);
   return this.element.trigger(n, i), !(e.isFunction(s) && s.apply(this.element[0], [ n ].concat(i)) === !1 || n.isDefaultPrevented());
  }
 }, e.each({
  show: "fadeIn",
  hide: "fadeOut"
 }, function(t, n) {
  e.Widget.prototype["_" + t] = function(i, o, r) {
   "string" == typeof o && (o = {
    effect: o
   });
   var s, a = o ? o === !0 || "number" == typeof o ? n : o.effect || n : t;
   o = o || {}, "number" == typeof o && (o = {
    duration: o
   }), s = !e.isEmptyObject(o), o.complete = r, o.delay && i.delay(o.delay), s && e.effects && e.effects.effect[a] ? i[t](o) : a !== t && i[a] ? i[a](o.duration, o.easing, r) : i.queue(function(n) {
    e(this)[t](), r && r.call(i[0]), n();
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
    var i = this, o = 1 === n.which, r = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : !1;
    return o && !r && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, 
    this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
     i.mouseDelayMet = !0;
    }, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, 
    !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), 
    this._mouseMoveDelegate = function(e) {
     return i._mouseMove(e);
    }, this._mouseUpDelegate = function(e) {
     return i._mouseUp(e);
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
 function i(t, n) {
  return parseInt(e.css(t, n), 10) || 0;
 }
 function o(t) {
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
 var r, s = Math.max, a = Math.abs, l = Math.round, c = /left|center|right/, u = /top|center|bottom/, d = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, f = /%$/, h = e.fn.position;
 e.position = {
  scrollbarWidth: function() {
   if (r !== t) return r;
   var n, i, o = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), s = o.children()[0];
   return e("body").append(o), n = s.offsetWidth, o.css("overflow", "scroll"), i = s.offsetWidth, 
   n === i && (i = o[0].clientWidth), o.remove(), r = n - i;
  },
  getScrollInfo: function(t) {
   var n = t.isWindow ? "" : t.element.css("overflow-x"), i = t.isWindow ? "" : t.element.css("overflow-y"), o = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth, r = "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight;
   return {
    width: r ? e.position.scrollbarWidth() : 0,
    height: o ? e.position.scrollbarWidth() : 0
   };
  },
  getWithinInfo: function(t) {
   var n = e(t || window), i = e.isWindow(n[0]);
   return {
    element: n,
    isWindow: i,
    offset: n.offset() || {
     left: 0,
     top: 0
    },
    scrollLeft: n.scrollLeft(),
    scrollTop: n.scrollTop(),
    width: i ? n.width() : n.outerWidth(),
    height: i ? n.height() : n.outerHeight()
   };
  }
 }, e.fn.position = function(t) {
  if (!t || !t.of) return h.apply(this, arguments);
  t = e.extend({}, t);
  var r, f, g, m, v, b, y = e(t.of), w = e.position.getWithinInfo(t.within), x = e.position.getScrollInfo(w), k = (t.collision || "flip").split(" "), C = {};
  return b = o(y), y[0].preventDefault && (t.at = "left top"), f = b.width, g = b.height, 
  m = b.offset, v = e.extend({}, m), e.each([ "my", "at" ], function() {
   var e, n, i = (t[this] || "").split(" ");
   1 === i.length && (i = c.test(i[0]) ? i.concat([ "center" ]) : u.test(i[0]) ? [ "center" ].concat(i) : [ "center", "center" ]), 
   i[0] = c.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), 
   n = d.exec(i[1]), C[this] = [ e ? e[0] : 0, n ? n[0] : 0 ], t[this] = [ p.exec(i[0])[0], p.exec(i[1])[0] ];
  }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? v.left += f : "center" === t.at[0] && (v.left += f / 2), 
  "bottom" === t.at[1] ? v.top += g : "center" === t.at[1] && (v.top += g / 2), r = n(C.at, f, g), 
  v.left += r[0], v.top += r[1], this.each(function() {
   var o, c, u = e(this), d = u.outerWidth(), p = u.outerHeight(), h = i(this, "marginLeft"), b = i(this, "marginTop"), S = d + h + i(this, "marginRight") + x.width, T = p + b + i(this, "marginBottom") + x.height, E = e.extend({}, v), _ = n(C.my, u.outerWidth(), u.outerHeight());
   "right" === t.my[0] ? E.left -= d : "center" === t.my[0] && (E.left -= d / 2), "bottom" === t.my[1] ? E.top -= p : "center" === t.my[1] && (E.top -= p / 2), 
   E.left += _[0], E.top += _[1], e.support.offsetFractions || (E.left = l(E.left), 
   E.top = l(E.top)), o = {
    marginLeft: h,
    marginTop: b
   }, e.each([ "left", "top" ], function(n, i) {
    e.ui.position[k[n]] && e.ui.position[k[n]][i](E, {
     targetWidth: f,
     targetHeight: g,
     elemWidth: d,
     elemHeight: p,
     collisionPosition: o,
     collisionWidth: S,
     collisionHeight: T,
     offset: [ r[0] + _[0], r[1] + _[1] ],
     my: t.my,
     at: t.at,
     within: w,
     elem: u
    });
   }), t.using && (c = function(e) {
    var n = m.left - E.left, i = n + f - d, o = m.top - E.top, r = o + g - p, l = {
     target: {
      element: y,
      left: m.left,
      top: m.top,
      width: f,
      height: g
     },
     element: {
      element: u,
      left: E.left,
      top: E.top,
      width: d,
      height: p
     },
     horizontal: 0 > i ? "left" : n > 0 ? "right" : "center",
     vertical: 0 > r ? "top" : o > 0 ? "bottom" : "middle"
    };
    d > f && a(n + i) < f && (l.horizontal = "center"), p > g && a(o + r) < g && (l.vertical = "middle"), 
    l.important = s(a(n), a(i)) > s(a(o), a(r)) ? "horizontal" : "vertical", t.using.call(this, e, l);
   }), u.offset(e.extend(E, {
    using: c
   }));
  });
 }, e.ui.position = {
  fit: {
   left: function(e, t) {
    var n, i = t.within, o = i.isWindow ? i.scrollLeft : i.offset.left, r = i.width, a = e.left - t.collisionPosition.marginLeft, l = o - a, c = a + t.collisionWidth - r - o;
    t.collisionWidth > r ? l > 0 && 0 >= c ? (n = e.left + l + t.collisionWidth - r - o, 
    e.left += l - n) : e.left = c > 0 && 0 >= l ? o : l > c ? o + r - t.collisionWidth : o : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = s(e.left - a, e.left);
   },
   top: function(e, t) {
    var n, i = t.within, o = i.isWindow ? i.scrollTop : i.offset.top, r = t.within.height, a = e.top - t.collisionPosition.marginTop, l = o - a, c = a + t.collisionHeight - r - o;
    t.collisionHeight > r ? l > 0 && 0 >= c ? (n = e.top + l + t.collisionHeight - r - o, 
    e.top += l - n) : e.top = c > 0 && 0 >= l ? o : l > c ? o + r - t.collisionHeight : o : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = s(e.top - a, e.top);
   }
  },
  flip: {
   left: function(e, t) {
    var n, i, o = t.within, r = o.offset.left + o.scrollLeft, s = o.width, l = o.isWindow ? o.scrollLeft : o.offset.left, c = e.left - t.collisionPosition.marginLeft, u = c - l, d = c + t.collisionWidth - s - l, p = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, h = -2 * t.offset[0];
    0 > u ? (n = e.left + p + f + h + t.collisionWidth - s - r, (0 > n || n < a(u)) && (e.left += p + f + h)) : d > 0 && (i = e.left - t.collisionPosition.marginLeft + p + f + h - l, 
    (i > 0 || a(i) < d) && (e.left += p + f + h));
   },
   top: function(e, t) {
    var n, i, o = t.within, r = o.offset.top + o.scrollTop, s = o.height, l = o.isWindow ? o.scrollTop : o.offset.top, c = e.top - t.collisionPosition.marginTop, u = c - l, d = c + t.collisionHeight - s - l, p = "top" === t.my[1], f = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, h = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, g = -2 * t.offset[1];
    0 > u ? (i = e.top + f + h + g + t.collisionHeight - s - r, e.top + f + h + g > u && (0 > i || i < a(u)) && (e.top += f + h + g)) : d > 0 && (n = e.top - t.collisionPosition.marginTop + f + h + g - l, 
    e.top + f + h + g > d && (n > 0 || a(n) < d) && (e.top += f + h + g));
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
  var t, n, i, o, r, s = document.getElementsByTagName("body")[0], a = document.createElement("div");
  t = document.createElement(s ? "div" : "body"), i = {
   visibility: "hidden",
   width: 0,
   height: 0,
   border: 0,
   margin: 0,
   background: "none"
  }, s && e.extend(i, {
   position: "absolute",
   left: "-1000px",
   top: "-1000px"
  });
  for (r in i) t.style[r] = i[r];
  t.appendChild(a), n = s || document.documentElement, n.insertBefore(t, n.firstChild), 
  a.style.cssText = "position: absolute; left: 10.7432222px;", o = e(a).offset().left, 
  e.support.offsetFractions = o > 10 && 11 > o, t.innerHTML = "", n.removeChild(t);
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
    var i = this._uiHash();
    if (this._trigger("drag", t, i) === !1) return this._mouseUp({}), !1;
    this.position = i.position;
   }
   return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
   this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
   e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1;
  },
  _mouseStop: function(t) {
   var n = this, i = !1;
   return e.ui.ddmanager && !this.options.dropBehaviour && (i = e.ui.ddmanager.drop(this, t)), 
   this.dropped && (i = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
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
   var n = this.options, i = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [ t ])) : "clone" === n.helper ? this.element.clone().removeAttr("id") : this.element;
   return i.parents("body").length || i.appendTo("parent" === n.appendTo ? this.element[0].parentNode : n.appendTo), 
   i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), 
   i;
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
   var t, n, i, o = this.options;
   return o.containment ? "window" === o.containment ? (this.containment = [ e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : "document" === o.containment ? (this.containment = [ 0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
   void 0) : o.containment.constructor === Array ? (this.containment = o.containment, 
   void 0) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), 
   n = e(o.containment), i = n[0], i && (t = "hidden" !== n.css("overflow"), this.containment = [ (parseInt(n.css("borderLeftWidth"), 10) || 0) + (parseInt(n.css("paddingLeft"), 10) || 0), (parseInt(n.css("borderTopWidth"), 10) || 0) + (parseInt(n.css("paddingTop"), 10) || 0), (t ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(n.css("borderRightWidth"), 10) || 0) - (parseInt(n.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(n.css("borderBottomWidth"), 10) || 0) - (parseInt(n.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
   this.relative_container = n), void 0) : (this.containment = null, void 0);
  },
  _convertPositionTo: function(t, n) {
   n || (n = this.position);
   var i = "absolute" === t ? 1 : -1, o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
   return this.offset.scroll || (this.offset.scroll = {
    top: o.scrollTop(),
    left: o.scrollLeft()
   }), {
    top: n.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * i,
    left: n.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * i
   };
  },
  _generatePosition: function(t) {
   var n, i, o, r, s = this.options, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = t.pageX, c = t.pageY;
   return this.offset.scroll || (this.offset.scroll = {
    top: a.scrollTop(),
    left: a.scrollLeft()
   }), this.originalPosition && (this.containment && (this.relative_container ? (i = this.relative_container.offset(), 
   n = [ this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top ]) : n = this.containment, 
   t.pageX - this.offset.click.left < n[0] && (l = n[0] + this.offset.click.left), 
   t.pageY - this.offset.click.top < n[1] && (c = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (l = n[2] + this.offset.click.left), 
   t.pageY - this.offset.click.top > n[3] && (c = n[3] + this.offset.click.top)), s.grid && (o = s.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / s.grid[1]) * s.grid[1] : this.originalPageY, 
   c = n ? o - this.offset.click.top >= n[1] || o - this.offset.click.top > n[3] ? o : o - this.offset.click.top >= n[1] ? o - s.grid[1] : o + s.grid[1] : o, 
   r = s.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / s.grid[0]) * s.grid[0] : this.originalPageX, 
   l = n ? r - this.offset.click.left >= n[0] || r - this.offset.click.left > n[2] ? r : r - this.offset.click.left >= n[0] ? r - s.grid[0] : r + s.grid[0] : r)), 
   {
    top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
   };
  },
  _clear: function() {
   this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
   this.helper = null, this.cancelHelperRemoval = !1;
  },
  _trigger: function(t, n, i) {
   return i = i || this._uiHash(), e.ui.plugin.call(this, t, [ n, i ]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), 
   e.Widget.prototype._trigger.call(this, t, n, i);
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
   var i = e(this).data("ui-draggable"), o = i.options, r = e.extend({}, n, {
    item: i.element
   });
   i.sortables = [], e(o.connectToSortable).each(function() {
    var n = e.data(this, "ui-sortable");
    n && !n.options.disabled && (i.sortables.push({
     instance: n,
     shouldRevert: n.options.revert
    }), n.refreshPositions(), n._trigger("activate", t, r));
   });
  },
  stop: function(t, n) {
   var i = e(this).data("ui-draggable"), o = e.extend({}, n, {
    item: i.element
   });
   e.each(i.sortables, function() {
    this.instance.isOver ? (this.instance.isOver = 0, i.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
    this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), 
    this.instance.options.helper = this.instance.options._helper, "original" === i.options.helper && this.instance.currentItem.css({
     top: "auto",
     left: "auto"
    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, o));
   });
  },
  drag: function(t, n) {
   var i = e(this).data("ui-draggable"), o = this;
   e.each(i.sortables, function() {
    var r = !1, s = this;
    this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, 
    this.instance.offset.click = i.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (r = !0, 
    e.each(i.sortables, function() {
     return this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, 
     this.instance.offset.click = i.offset.click, this !== s && this.instance._intersectsWith(this.instance.containerCache) && e.contains(s.instance.element[0], this.instance.element[0]) && (r = !1), 
     r;
    })), r ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), 
    this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
     return n.helper[0];
    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), 
    this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = i.offset.click.top, 
    this.instance.offset.click.left = i.offset.click.left, this.instance.offset.parent.left -= i.offset.parent.left - this.instance.offset.parent.left, 
    this.instance.offset.parent.top -= i.offset.parent.top - this.instance.offset.parent.top, 
    i._trigger("toSortable", t), i.dropped = this.instance.element, i.currentItem = i.element, 
    this.instance.fromOutside = i), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, 
    this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), 
    this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, 
    this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
    i._trigger("fromSortable", t), i.dropped = !1);
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
   var i = e(n.helper), o = e(this).data("ui-draggable").options;
   i.css("opacity") && (o._opacity = i.css("opacity")), i.css("opacity", o.opacity);
  },
  stop: function(t, n) {
   var i = e(this).data("ui-draggable").options;
   i._opacity && e(n.helper).css("opacity", i._opacity);
  }
 }), e.ui.plugin.add("draggable", "scroll", {
  start: function() {
   var t = e(this).data("ui-draggable");
   t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset());
  },
  drag: function(t) {
   var n = e(this).data("ui-draggable"), i = n.options, o = !1;
   n.scrollParent[0] !== document && "HTML" !== n.scrollParent[0].tagName ? (i.axis && "x" === i.axis || (n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? n.scrollParent[0].scrollTop = o = n.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - n.overflowOffset.top < i.scrollSensitivity && (n.scrollParent[0].scrollTop = o = n.scrollParent[0].scrollTop - i.scrollSpeed)), 
   i.axis && "y" === i.axis || (n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? n.scrollParent[0].scrollLeft = o = n.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - n.overflowOffset.left < i.scrollSensitivity && (n.scrollParent[0].scrollLeft = o = n.scrollParent[0].scrollLeft - i.scrollSpeed))) : (i.axis && "x" === i.axis || (t.pageY - e(document).scrollTop() < i.scrollSensitivity ? o = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (o = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed))), 
   i.axis && "y" === i.axis || (t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? o = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (o = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed)))), 
   o !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t);
  }
 }), e.ui.plugin.add("draggable", "snap", {
  start: function() {
   var t = e(this).data("ui-draggable"), n = t.options;
   t.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
    var n = e(this), i = n.offset();
    this !== t.element[0] && t.snapElements.push({
     item: this,
     width: n.outerWidth(),
     height: n.outerHeight(),
     top: i.top,
     left: i.left
    });
   });
  },
  drag: function(t, n) {
   var i, o, r, s, a, l, c, u, d, p, f = e(this).data("ui-draggable"), h = f.options, g = h.snapTolerance, m = n.offset.left, v = m + f.helperProportions.width, b = n.offset.top, y = b + f.helperProportions.height;
   for (d = f.snapElements.length - 1; d >= 0; d--) a = f.snapElements[d].left, l = a + f.snapElements[d].width, 
   c = f.snapElements[d].top, u = c + f.snapElements[d].height, a - g > v || m > l + g || c - g > y || b > u + g || !e.contains(f.snapElements[d].item.ownerDocument, f.snapElements[d].item) ? (f.snapElements[d].snapping && f.options.snap.release && f.options.snap.release.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = !1) : ("inner" !== h.snapMode && (i = Math.abs(c - y) <= g, 
   o = Math.abs(u - b) <= g, r = Math.abs(a - v) <= g, s = Math.abs(l - m) <= g, i && (n.position.top = f._convertPositionTo("relative", {
    top: c - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), o && (n.position.top = f._convertPositionTo("relative", {
    top: u,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: a - f.helperProportions.width
   }).left - f.margins.left), s && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l
   }).left - f.margins.left)), p = i || o || r || s, "outer" !== h.snapMode && (i = Math.abs(c - b) <= g, 
   o = Math.abs(u - y) <= g, r = Math.abs(a - m) <= g, s = Math.abs(l - v) <= g, i && (n.position.top = f._convertPositionTo("relative", {
    top: c,
    left: 0
   }).top - f.margins.top), o && (n.position.top = f._convertPositionTo("relative", {
    top: u - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: a
   }).left - f.margins.left), s && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l - f.helperProportions.width
   }).left - f.margins.left)), !f.snapElements[d].snapping && (i || o || r || s || p) && f.options.snap.snap && f.options.snap.snap.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = i || o || r || s || p);
  }
 }), e.ui.plugin.add("draggable", "stack", {
  start: function() {
   var t, n = this.data("ui-draggable").options, i = e.makeArray(e(n.stack)).sort(function(t, n) {
    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0);
   });
   i.length && (t = parseInt(e(i[0]).css("zIndex"), 10) || 0, e(i).each(function(n) {
    e(this).css("zIndex", t + n);
   }), this.css("zIndex", t + i.length));
  }
 }), e.ui.plugin.add("draggable", "zIndex", {
  start: function(t, n) {
   var i = e(n.helper), o = e(this).data("ui-draggable").options;
   i.css("zIndex") && (o._zIndex = i.css("zIndex")), i.css("zIndex", o.zIndex);
  },
  stop: function(t, n) {
   var i = e(this).data("ui-draggable").options;
   i._zIndex && e(n.helper).css("zIndex", i._zIndex);
  }
 });
}(jQuery), function(e, t) {
 var n = "ui-effects-";
 e.effects = {
  effect: {}
 }, function(e, t) {
  function n(e, t, n) {
   var i = d[t.type] || {};
   return null == e ? n || !t.def ? null : t.def : (e = i.floor ? ~~e : parseFloat(e), 
   isNaN(e) ? t.def : i.mod ? (e + i.mod) % i.mod : 0 > e ? 0 : i.max < e ? i.max : e);
  }
  function i(t) {
   var n = c(), i = n._rgba = [];
   return t = t.toLowerCase(), h(l, function(e, o) {
    var r, s = o.re.exec(t), a = s && o.parse(s), l = o.space || "rgba";
    return a ? (r = n[l](a), n[u[l].cache] = r[u[l].cache], i = n._rgba = r._rgba, !1) : void 0;
   }), i.length ? ("0,0,0,0" === i.join() && e.extend(i, r.transparent), n) : r[t];
  }
  function o(e, t, n) {
   return n = (n + 1) % 1, 1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e;
  }
  var r, s = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", a = /^([\-+])=\s*(\d+\.?\d*)/, l = [ {
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
  } ], c = e.Color = function(t, n, i, o) {
   return new e.Color.fn.parse(t, n, i, o);
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
   parse: function(o, s, a, l) {
    if (o === t) return this._rgba = [ null, null, null, null ], this;
    (o.jquery || o.nodeType) && (o = e(o).css(s), s = t);
    var d = this, p = e.type(o), f = this._rgba = [];
    return s !== t && (o = [ o, s, a, l ], p = "array"), "string" === p ? this.parse(i(o) || r._default) : "array" === p ? (h(u.rgba.props, function(e, t) {
     f[t.idx] = n(o[t.idx], t);
    }), this) : "object" === p ? (o instanceof c ? h(u, function(e, t) {
     o[t.cache] && (d[t.cache] = o[t.cache].slice());
    }) : h(u, function(t, i) {
     var r = i.cache;
     h(i.props, function(e, t) {
      if (!d[r] && i.to) {
       if ("alpha" === e || null == o[e]) return;
       d[r] = i.to(d._rgba);
      }
      d[r][t.idx] = n(o[e], t, !0);
     }), d[r] && e.inArray(null, d[r].slice(0, 3)) < 0 && (d[r][3] = 1, i.from && (d._rgba = i.from(d[r])));
    }), this) : void 0;
   },
   is: function(e) {
    var t = c(e), n = !0, i = this;
    return h(u, function(e, o) {
     var r, s = t[o.cache];
     return s && (r = i[o.cache] || o.to && o.to(i._rgba) || [], h(o.props, function(e, t) {
      return null != s[t.idx] ? n = s[t.idx] === r[t.idx] : void 0;
     })), n;
    }), n;
   },
   _space: function() {
    var e = [], t = this;
    return h(u, function(n, i) {
     t[i.cache] && e.push(n);
    }), e.pop();
   },
   transition: function(e, t) {
    var i = c(e), o = i._space(), r = u[o], s = 0 === this.alpha() ? c("transparent") : this, a = s[r.cache] || r.to(s._rgba), l = a.slice();
    return i = i[r.cache], h(r.props, function(e, o) {
     var r = o.idx, s = a[r], c = i[r], u = d[o.type] || {};
     null !== c && (null === s ? l[r] = c : (u.mod && (c - s > u.mod / 2 ? s += u.mod : s - c > u.mod / 2 && (s -= u.mod)), 
     l[r] = n((c - s) * t + s, o)));
    }), this[o](l);
   },
   blend: function(t) {
    if (1 === this._rgba[3]) return this;
    var n = this._rgba.slice(), i = n.pop(), o = c(t)._rgba;
    return c(e.map(n, function(e, t) {
     return (1 - i) * o[t] + i * e;
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
    var n = this._rgba.slice(), i = n.pop();
    return t && n.push(~~(255 * i)), "#" + e.map(n, function(e) {
     return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e;
    }).join("");
   },
   toString: function() {
    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
   }
  }), c.fn.parse.prototype = c.fn, u.hsla.to = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var t, n, i = e[0] / 255, o = e[1] / 255, r = e[2] / 255, s = e[3], a = Math.max(i, o, r), l = Math.min(i, o, r), c = a - l, u = a + l, d = .5 * u;
   return t = l === a ? 0 : i === a ? 60 * (o - r) / c + 360 : o === a ? 60 * (r - i) / c + 120 : 60 * (i - o) / c + 240, 
   n = 0 === c ? 0 : .5 >= d ? c / u : c / (2 - u), [ Math.round(t) % 360, n, d, null == s ? 1 : s ];
  }, u.hsla.from = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var t = e[0] / 360, n = e[1], i = e[2], r = e[3], s = .5 >= i ? i * (1 + n) : i + n - i * n, a = 2 * i - s;
   return [ Math.round(255 * o(a, s, t + 1 / 3)), Math.round(255 * o(a, s, t)), Math.round(255 * o(a, s, t - 1 / 3)), r ];
  }, h(u, function(i, o) {
   var r = o.props, s = o.cache, l = o.to, u = o.from;
   c.fn[i] = function(i) {
    if (l && !this[s] && (this[s] = l(this._rgba)), i === t) return this[s].slice();
    var o, a = e.type(i), d = "array" === a || "object" === a ? i : arguments, p = this[s].slice();
    return h(r, function(e, t) {
     var i = d["object" === a ? e : t.idx];
     null == i && (i = p[t.idx]), p[t.idx] = n(i, t);
    }), u ? (o = c(u(p)), o[s] = p, o) : c(p);
   }, h(r, function(t, n) {
    c.fn[t] || (c.fn[t] = function(o) {
     var r, s = e.type(o), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : i, c = this[l](), u = c[n.idx];
     return "undefined" === s ? u : ("function" === s && (o = o.call(this, u), s = e.type(o)), 
     null == o && n.empty ? this : ("string" === s && (r = a.exec(o), r && (o = u + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), 
     c[n.idx] = o, this[l](c)));
    });
   });
  }), c.hook = function(t) {
   var n = t.split(" ");
   h(n, function(t, n) {
    e.cssHooks[n] = {
     set: function(t, o) {
      var r, s, a = "";
      if ("transparent" !== o && ("string" !== e.type(o) || (r = i(o)))) {
       if (o = c(r || o), !p.rgba && 1 !== o._rgba[3]) {
        for (s = "backgroundColor" === n ? t.parentNode : t; ("" === a || "transparent" === a) && s && s.style; ) try {
         a = e.css(s, "backgroundColor"), s = s.parentNode;
        } catch (l) {}
        o = o.blend(a && "transparent" !== a ? a : "_default");
       }
       o = o.toRgbaString();
      }
      try {
       t.style[n] = o;
      } catch (l) {}
     }
    }, e.fx.step[n] = function(t) {
     t.colorInit || (t.start = c(t.elem, n), t.end = c(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos));
    };
   });
  }, c.hook(s), e.cssHooks.borderColor = {
   expand: function(e) {
    var t = {};
    return h([ "Top", "Right", "Bottom", "Left" ], function(n, i) {
     t["border" + i + "Color"] = e;
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
   var n, i, o = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, r = {};
   if (o && o.length && o[0] && o[o[0]]) for (i = o.length; i--; ) n = o[i], "string" == typeof o[n] && (r[e.camelCase(n)] = o[n]); else for (n in o) "string" == typeof o[n] && (r[n] = o[n]);
   return r;
  }
  function i(t, n) {
   var i, o, s = {};
   for (i in n) o = n[i], t[i] !== o && (r[i] || (e.fx.step[i] || !isNaN(parseFloat(o))) && (s[i] = o));
   return s;
  }
  var o = [ "add", "remove", "toggle" ], r = {
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
  }), e.effects.animateClass = function(t, r, s, a) {
   var l = e.speed(r, s, a);
   return this.queue(function() {
    var r, s = e(this), a = s.attr("class") || "", c = l.children ? s.find("*").addBack() : s;
    c = c.map(function() {
     var t = e(this);
     return {
      el: t,
      start: n(this)
     };
    }), r = function() {
     e.each(o, function(e, n) {
      t[n] && s[n + "Class"](t[n]);
     });
    }, r(), c = c.map(function() {
     return this.end = n(this.el[0]), this.diff = i(this.start, this.end), this;
    }), s.attr("class", a), c = c.map(function() {
     var t = this, n = e.Deferred(), i = e.extend({}, l, {
      queue: !1,
      complete: function() {
       n.resolve(t);
      }
     });
     return this.el.animate(this.diff, i), n.promise();
    }), e.when.apply(e, c.get()).done(function() {
     r(), e.each(arguments, function() {
      var t = this.el;
      e.each(this.diff, function(e) {
       t.css(e, "");
      });
     }), l.complete.call(s[0]);
    });
   });
  }, e.fn.extend({
   addClass: function(t) {
    return function(n, i, o, r) {
     return i ? e.effects.animateClass.call(this, {
      add: n
     }, i, o, r) : t.apply(this, arguments);
    };
   }(e.fn.addClass),
   removeClass: function(t) {
    return function(n, i, o, r) {
     return arguments.length > 1 ? e.effects.animateClass.call(this, {
      remove: n
     }, i, o, r) : t.apply(this, arguments);
    };
   }(e.fn.removeClass),
   toggleClass: function(n) {
    return function(i, o, r, s, a) {
     return "boolean" == typeof o || o === t ? r ? e.effects.animateClass.call(this, o ? {
      add: i
     } : {
      remove: i
     }, r, s, a) : n.apply(this, arguments) : e.effects.animateClass.call(this, {
      toggle: i
     }, o, r, s);
    };
   }(e.fn.toggleClass),
   switchClass: function(t, n, i, o, r) {
    return e.effects.animateClass.call(this, {
     add: n,
     remove: t
    }, i, o, r);
   }
  });
 }(), function() {
  function i(t, n, i, o) {
   return e.isPlainObject(t) && (n = t, t = t.effect), t = {
    effect: t
   }, null == n && (n = {}), e.isFunction(n) && (o = n, i = null, n = {}), ("number" == typeof n || e.fx.speeds[n]) && (o = i, 
   i = n, n = {}), e.isFunction(i) && (o = i, i = null), n && e.extend(t, n), i = i || n.duration, 
   t.duration = e.fx.off ? 0 : "number" == typeof i ? i : i in e.fx.speeds ? e.fx.speeds[i] : e.fx.speeds._default, 
   t.complete = o || n.complete, t;
  }
  function o(t) {
   return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0;
  }
  e.extend(e.effects, {
   version: "1.10.3",
   save: function(e, t) {
    for (var i = 0; i < t.length; i++) null !== t[i] && e.data(n + t[i], e[0].style[t[i]]);
   },
   restore: function(e, i) {
    var o, r;
    for (r = 0; r < i.length; r++) null !== i[r] && (o = e.data(n + i[r]), o === t && (o = ""), 
    e.css(i[r], o));
   },
   setMode: function(e, t) {
    return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t;
   },
   getBaseline: function(e, t) {
    var n, i;
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
     i = 0;
     break;

    case "center":
     i = .5;
     break;

    case "right":
     i = 1;
     break;

    default:
     i = e[1] / t.width;
    }
    return {
     x: i,
     y: n
    };
   },
   createWrapper: function(t) {
    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
    var n = {
     width: t.outerWidth(!0),
     height: t.outerHeight(!0),
     "float": t.css("float")
    }, i = e("<div></div>").addClass("ui-effects-wrapper").css({
     fontSize: "100%",
     background: "transparent",
     border: "none",
     margin: 0,
     padding: 0
    }), o = {
     width: t.width(),
     height: t.height()
    }, r = document.activeElement;
    try {
     r.id;
    } catch (s) {
     r = document.body;
    }
    return t.wrap(i), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), i = t.parent(), 
    "static" === t.css("position") ? (i.css({
     position: "relative"
    }), t.css({
     position: "relative"
    })) : (e.extend(n, {
     position: t.css("position"),
     zIndex: t.css("z-index")
    }), e.each([ "top", "left", "bottom", "right" ], function(e, i) {
     n[i] = t.css(i), isNaN(parseInt(n[i], 10)) && (n[i] = "auto");
    }), t.css({
     position: "relative",
     top: 0,
     left: 0,
     right: "auto",
     bottom: "auto"
    })), t.css(o), i.css(n).show();
   },
   removeWrapper: function(t) {
    var n = document.activeElement;
    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), 
    t;
   },
   setTransition: function(t, n, i, o) {
    return o = o || {}, e.each(n, function(e, n) {
     var r = t.cssUnit(n);
     r[0] > 0 && (o[n] = r[0] * i + r[1]);
    }), o;
   }
  }), e.fn.extend({
   effect: function() {
    function t(t) {
     function i() {
      e.isFunction(r) && r.call(o[0]), e.isFunction(t) && t();
     }
     var o = e(this), r = n.complete, a = n.mode;
     (o.is(":hidden") ? "hide" === a : "show" === a) ? (o[a](), i()) : s.call(o[0], n, i);
    }
    var n = i.apply(this, arguments), o = n.mode, r = n.queue, s = e.effects.effect[n.effect];
    return e.fx.off || !s ? o ? this[o](n.duration, n.complete) : this.each(function() {
     n.complete && n.complete.call(this);
    }) : r === !1 ? this.each(t) : this.queue(r || "fx", t);
   },
   show: function(e) {
    return function(t) {
     if (o(t)) return e.apply(this, arguments);
     var n = i.apply(this, arguments);
     return n.mode = "show", this.effect.call(this, n);
    };
   }(e.fn.show),
   hide: function(e) {
    return function(t) {
     if (o(t)) return e.apply(this, arguments);
     var n = i.apply(this, arguments);
     return n.mode = "hide", this.effect.call(this, n);
    };
   }(e.fn.hide),
   toggle: function(e) {
    return function(t) {
     if (o(t) || "boolean" == typeof t) return e.apply(this, arguments);
     var n = i.apply(this, arguments);
     return n.mode = "toggle", this.effect.call(this, n);
    };
   }(e.fn.toggle),
   cssUnit: function(t) {
    var n = this.css(t), i = [];
    return e.each([ "em", "px", "%", "pt" ], function(e, t) {
     n.indexOf(t) > 0 && (i = [ parseFloat(n), t ]);
    }), i;
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
  var i, o = e(this), r = [ "position", "top", "bottom", "left", "right", "width", "height" ], s = e.effects.setMode(o, t.mode || "show"), a = "show" === s, l = t.direction || "left", c = "up" === l || "down" === l ? "top" : "left", u = "up" === l || "left" === l, d = {};
  e.effects.save(o, r), o.show(), i = t.distance || o["top" === c ? "outerHeight" : "outerWidth"](!0), 
  e.effects.createWrapper(o).css({
   overflow: "hidden"
  }), a && o.css(c, u ? isNaN(i) ? "-" + i : -i : i), d[c] = (a ? u ? "+=" : "-=" : u ? "-=" : "+=") + i, 
  o.animate(d, {
   queue: !1,
   duration: t.duration,
   easing: t.easing,
   complete: function() {
    "hide" === s && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), n();
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
    var i = n.container;
    if (i.data("layoutPane")) return i;
    var o = i.closest("." + $.layout.defaults.panes.paneClass);
    if (o.data("layoutPane")) return o;
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
    var n = e[0].style, i = {
     display: n.display || "",
     visibility: n.visibility || ""
    };
    return e.css({
     display: "block",
     visibility: "hidden"
    }), i;
   }
   return {};
  },
  getElementDimensions: function(e, t) {
   var n, i, o, r = {
    css: {},
    inset: {}
   }, s = r.css, a = {
    bottom: 0
   }, l = $.layout.cssNum, c = e.offset();
   return r.offsetLeft = c.left, r.offsetTop = c.top, t || (t = {}), $.each("Left,Right,Top,Bottom".split(","), function(l, c) {
    n = s["border" + c] = $.layout.borderWidth(e, c), i = s["padding" + c] = $.layout.cssNum(e, "padding" + c), 
    o = c.toLowerCase(), r.inset[o] = t[o] >= 0 ? t[o] : i, a[o] = r.inset[o] + n;
   }), s.width = e.width(), s.height = e.height(), s.top = l(e, "top", !0), s.bottom = l(e, "bottom", !0), 
   s.left = l(e, "left", !0), s.right = l(e, "right", !0), r.outerWidth = e.outerWidth(), 
   r.outerHeight = e.outerHeight(), r.innerWidth = max(0, r.outerWidth - a.left - a.right), 
   r.innerHeight = max(0, r.outerHeight - a.top - a.bottom), r.layoutWidth = e.innerWidth(), 
   r.layoutHeight = e.innerHeight(), r;
  },
  getElementStyles: function(e, t) {
   var n, i, o, r, s, a, l = {}, c = e[0].style, u = t.split(","), d = "Top,Bottom,Left,Right".split(","), p = "Color,Style,Width".split(",");
   for (r = 0; r < u.length; r++) if (n = u[r], n.match(/(border|padding|margin)$/)) for (s = 0; 4 > s; s++) if (i = d[s], 
   "border" === n) for (a = 0; 3 > a; a++) o = p[a], l[n + i + o] = c[n + i + o]; else l[n + i] = c[n + i]; else l[n] = c[n];
   return l;
  },
  cssWidth: function(e, t) {
   if (0 >= t) return 0;
   var n = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", i = $.layout.borderWidth, o = $.layout.cssNum, r = t;
   return "border-box" !== n && (r -= i(e, "Left") + i(e, "Right")), "content-box" === n && (r -= o(e, "paddingLeft") + o(e, "paddingRight")), 
   max(0, r);
  },
  cssHeight: function(e, t) {
   if (0 >= t) return 0;
   var n = $.layout.browser.boxModel ? $.support.boxSizing ? e.css("boxSizing") : "content-box" : "border-box", i = $.layout.borderWidth, o = $.layout.cssNum, r = t;
   return "border-box" !== n && (r -= i(e, "Top") + i(e, "Bottom")), "content-box" === n && (r -= o(e, "paddingTop") + o(e, "paddingBottom")), 
   max(0, r);
  },
  cssNum: function(e, t, n) {
   e.jquery || (e = $(e));
   var i = $.layout.showInvisibly(e), o = $.css(e[0], t, !0), r = n && "auto" == o ? o : Math.round(parseFloat(o) || 0);
   return e.css(i), r;
  },
  borderWidth: function(e, t) {
   e.jquery && (e = e[0]);
   var n = "border" + t.substr(0, 1).toUpperCase() + t.substr(1);
   return "none" === $.css(e, n + "Style", !0) ? 0 : Math.round(parseFloat($.css(e, n + "Width", !0)) || 0);
  },
  isMouseOverElem: function(e, t) {
   var n = $(t || this), i = n.offset(), o = i.top, r = i.left, s = r + n.outerWidth(), a = o + n.outerHeight(), l = e.pageX, c = e.pageY;
   return $.layout.browser.msie && 0 > l && 0 > c || l >= r && s >= l && c >= o && a >= c;
  },
  msg: function(e, t, n, i) {
   function o() {
    var e = $.support.fixedPosition ? "fixed" : "absolute", t = $('<div id="layoutLogger" style="position: ' + e + '; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">' + '<div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;">' + '<span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div>' + '<ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul>' + "</div>").appendTo("body");
    return t.css("left", $(window).width() - t.outerWidth() - 5), $.ui.draggable && t.draggable({
     handle: ":first-child"
    }), t;
   }
   if ($.isPlainObject(e) && window.debugData) {
    "string" == typeof t ? (i = n, n = t) : "object" == typeof n && (i = n, n = null);
    var r = n || "log( <object> )", s = $.extend({
     sort: !1,
     returnHTML: !1,
     display: !1
    }, i);
    t === !0 || s.display ? debugData(e, r, s) : window.console && console.log(debugData(e, r, s));
   } else if (t) alert(e); else if (window.console) console.log(e); else {
    var a = "#layoutLogger", l = $(a);
    l.length || (l = o()), l.children("ul").append('<li style="padding: 4px 10px; margin: 0; border-top: 1px solid #CCC;">' + e.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + "</li>");
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
  var n, i, o, r, s, a, l, c = t ? {
   panes: {},
   center: {}
  } : {};
  if ("object" != typeof e) return c;
  for (i in e) for (n = c, s = e[i], o = i.split("__"), l = o.length - 1, a = 0; l >= a; a++) r = o[a], 
  a === l ? n[r] = $.isPlainObject(s) ? $.layout.transformData(s) : s : (n[r] || (n[r] = {}), 
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
    for (var i, o = t.split("."), r = o.length - 1, s = {
     branch: e,
     key: o[r]
    }, a = 0; r > a; a++) i = o[a], s.branch = void 0 == s.branch[i] ? n ? s.branch[i] = {} : {} : s.branch[i];
    return s;
   }
   var n, i, o, r = $.layout.backwardCompatibility.map;
   for (var s in r) n = t(s), o = n.branch[n.key], void 0 !== o && (i = t(r[s], !0), 
   i.branch[i.key] = o, delete n.branch[n.key]);
  },
  renameAllOptions: function(e) {
   var t = $.layout.backwardCompatibility.renameOptions;
   return t(e), e.defaults && ("object" != typeof e.panes && (e.panes = {}), $.extend(!0, e.panes, e.defaults), 
   delete e.defaults), e.panes && t(e.panes), $.each($.layout.config.allPanes, function(n, i) {
    e[i] && t(e[i]);
   }), e;
  }
 }, $.fn.layout = function(opts) {
  function keyDown(e) {
   if (!e) return !0;
   var t = e.keyCode;
   if (33 > t) return !0;
   var n, i, o, r, s = {
    38: "north",
    40: "south",
    37: "west",
    39: "east"
   }, a = (e.altKey, e.shiftKey), l = e.ctrlKey, c = l && t >= 37 && 40 >= t;
   return c && options[s[t]].enableCursorHotkey ? r = s[t] : (l || a) && $.each(_c.borderPanes, function(e, s) {
    return n = options[s], i = n.customHotkey, o = n.customHotkeyModifier, (a && "SHIFT" == o || l && "CTRL" == o || l && a) && i && t === (isNaN(i) || 9 >= i ? i.toUpperCase().charCodeAt(0) : i) ? (r = s, 
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
     var n = t.data("layoutEdge"), i = state[n];
     if (i.cssSaved && resetOverflow(n), i.isSliding || i.isResizing || i.isClosed) return i.cssSaved = !1, 
     void 0;
     var o = {
      zIndex: options.zIndexes.resizer_normal + 1
     }, r = {}, s = t.css("overflow"), a = t.css("overflowX"), l = t.css("overflowY");
     "visible" != s && (r.overflow = s, o.overflow = "visible"), a && !a.match(/(visible|auto)/) && (r.overflowX = a, 
     o.overflowX = "visible"), l && !l.match(/(visible|auto)/) && (r.overflowY = a, o.overflowY = "visible"), 
     i.cssSaved = r, t.css(o), $.each(_c.allPanes, function(e, t) {
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
     var n = t.data("layoutEdge"), i = state[n], o = i.cssSaved || {};
     i.isSliding || i.isResizing || t.css("zIndex", options.zIndexes.pane_normal), t.css(o), 
     i.cssSaved = !1;
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
   var i = options;
   return (i.showErrorMessages && !n || n && i.showDebugMessages) && $.layout.msg(i.name + " / " + e, t !== !1), 
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
   var t = $Ps[e], n = _c[e].dir, i = {
    minWidth: 1001 - cssW(t, 1e3),
    minHeight: 1001 - cssH(t, 1e3)
   };
   return "horz" === n && (i.minSize = i.minHeight), "vert" === n && (i.minSize = i.minWidth), 
   i;
  }, setOuterWidth = function(e, t, n) {
   var i, o = e;
   isStr(e) ? o = $Ps[e] : e.jquery || (o = $(e)), i = cssW(o, t), o.css({
    width: i
   }), i > 0 ? n && o.data("autoHidden") && o.innerHeight() > 0 && (o.show().data("autoHidden", !1), 
   browser.mozilla || o.css(_c.hidden).css(_c.visible)) : n && !o.data("autoHidden") && o.hide().data("autoHidden", !0);
  }, setOuterHeight = function(e, t, n) {
   var i, o = e;
   isStr(e) ? o = $Ps[e] : e.jquery || (o = $(e)), i = cssH(o, t), o.css({
    height: i,
    visibility: "visible"
   }), i > 0 && o.innerWidth() > 0 ? n && o.data("autoHidden") && (o.show().data("autoHidden", !1), 
   browser.mozilla || o.css(_c.hidden).css(_c.visible)) : n && !o.data("autoHidden") && o.hide().data("autoHidden", !0);
  }, _parseSize = function(e, t, n) {
   if (n || (n = _c[e].dir), isStr(t) && t.match(/%/) && (t = "100%" === t ? -1 : parseInt(t, 10) / 100), 
   0 === t) return 0;
   if (t >= 1) return parseInt(t, 10);
   var i = options, o = 0;
   if ("horz" == n ? o = sC.innerHeight - ($Ps.north ? i.north.spacing_open : 0) - ($Ps.south ? i.south.spacing_open : 0) : "vert" == n && (o = sC.innerWidth - ($Ps.west ? i.west.spacing_open : 0) - ($Ps.east ? i.east.spacing_open : 0)), 
   -1 === t) return o;
   if (t > 0) return round(o * t);
   if ("center" == e) return 0;
   var r = "horz" === n ? "height" : "width", s = $Ps[e], a = "height" === r ? $Cs[e] : !1, l = $.layout.showInvisibly(s), c = s.css(r), u = a ? a.css(r) : 0;
   return s.css(r, "auto"), a && a.css(r, "auto"), t = "height" === r ? s.outerHeight() : s.outerWidth(), 
   s.css(r, c).css(l), a && a.css(r, u), t;
  }, getPaneSize = function(e, t) {
   var n = $Ps[e], i = options[e], o = state[e], r = t ? i.spacing_open : 0, s = t ? i.spacing_closed : 0;
   return !n || o.isHidden ? 0 : o.isClosed || o.isSliding && t ? s : "horz" === _c[e].dir ? n.outerHeight() + r : n.outerWidth() + r;
  }, setSizeLimits = function(e, t) {
   if (isInitialized()) {
    var n = options[e], i = state[e], o = _c[e], r = o.dir, s = (o.sizeType.toLowerCase(), 
    void 0 != t ? t : i.isSliding), a = ($Ps[e], n.spacing_open), l = _c.oppositeEdge[e], c = state[l], u = $Ps[l], d = !u || c.isVisible === !1 || c.isSliding ? 0 : "horz" == r ? u.outerHeight() : u.outerWidth(), p = (!u || c.isHidden ? 0 : options[l][c.isClosed !== !1 ? "spacing_closed" : "spacing_open"]) || 0, f = "horz" == r ? sC.innerHeight : sC.innerWidth, h = cssMinDims("center"), g = "horz" == r ? max(options.center.minHeight, h.minHeight) : max(options.center.minWidth, h.minWidth), m = f - a - (s ? 0 : _parseSize("center", g, r) + d + p), v = i.minSize = max(_parseSize(e, n.minSize), cssMinDims(e).minSize), b = i.maxSize = min(n.maxSize ? _parseSize(e, n.maxSize) : 1e5, m), y = i.resizerPosition = {}, w = sC.inset.top, x = sC.inset.left, k = sC.innerWidth, C = sC.innerHeight, S = n.spacing_open;
    switch (e) {
    case "north":
     y.min = w + v, y.max = w + b;
     break;

    case "west":
     y.min = x + v, y.max = x + b;
     break;

    case "south":
     y.min = w + C - b - S, y.max = w + C - v - S;
     break;

    case "east":
     y.min = x + k - b - S, y.max = x + k - v - S;
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
   var n = $(e), i = n.data("layoutRole"), o = n.data("layoutEdge"), r = options[o], s = r[i + "Class"], a = "-" + o, l = "-open", c = "-closed", u = "-sliding", d = "-hover ", p = n.hasClass(s + c) ? c : l, f = p === c ? l : c, h = s + d + (s + a + d) + (s + p + d) + (s + a + p + d);
   return t && (h += s + f + d + (s + a + f + d)), "resizer" == i && n.hasClass(s + u) && (h += s + u + d + (s + a + u + d)), 
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
   var n = t || this, i = $(n).data("layoutEdge"), o = i + "ResizerLeave";
   timer.clear(i + "_openSlider"), timer.clear(o), t ? state.paneResizing || ($.fn.enableSelection && $("body").enableSelection(), 
   options.maskPanesEarly && hideMasks()) : timer.set(o, function() {
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
   var n = evtPane.call(this, e), i = $Ps[n];
   if (i) {
    var o = $Cs[n], r = state[n], s = options[n], a = options.stateManagement || {}, l = t ? s.children = t : s.children;
    if ($.isPlainObject(l)) l = [ l ]; else if (!l || !$.isArray(l)) return;
    $.each(l, function(e, t) {
     if ($.isPlainObject(t)) {
      var s = t.containerSelector ? i.find(t.containerSelector) : o || i;
      s.each(function() {
       var e = $(this), i = e.data("layout");
       if (!i) {
        if (setInstanceKey({
         container: e,
         options: t
        }, r), a.includeChildren && state.stateData[n]) {
         var o = state.stateData[n].children || {}, s = o[t.instanceKey], l = t.stateManagement || (t.stateManagement = {
          autoLoad: !0
         });
         l.autoLoad === !0 && s && (l.autoSave = !1, l.includeChildren = !0, l.autoLoad = $.extend(!0, {}, s));
        }
        i = e.layout(t), i && refreshChildren(n, i);
       }
      });
     }
    });
   }
  }, setInstanceKey = function(e, t) {
   var n = e.container, i = e.options, o = i.stateManagement, r = i.instanceKey || n.data("layoutInstanceKey");
   return r || (r = (o && o.cookie ? o.cookie.name : "") || i.name), r = r ? r.replace(/[^\w-]/gi, "_").replace(/_{2,}/g, "_") : "layout" + ++t.childIdx, 
   i.instanceKey = r, n.data("layoutInstanceKey", r), r;
  }, refreshChildren = function(e, t) {
   var n, i = $Ps[e], o = children[e], r = state[e];
   $.isPlainObject(o) && ($.each(o, function(e, t) {
    t.destroyed && delete o[e];
   }), $.isEmptyObject(o) && (o = children[e] = null)), t || o || (t = i.data("layout")), 
   t && (t.hasParentLayout = !0, n = t.options, setInstanceKey(t, r), o || (o = children[e] = {}), 
   o[n.instanceKey] = t.container.data("layout")), Instance[e].children = children[e], 
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
   var e, t, n = $N[0], i = $("html"), o = sC.tagName = n.tagName, r = sC.id = n.id, s = sC.className = n.className, a = options, l = a.name, c = "position,margin,padding,border", u = "layoutCSS", d = {}, p = "hidden", f = $N.data("parentLayout"), h = $N.data("layoutEdge"), g = f && h, m = $.layout.cssNum;
   sC.selector = $N.selector.split(".slice")[0], sC.ref = (a.name ? a.name + " layout / " : "") + o + (r ? "#" + r : s ? ".[" + s + "]" : ""), 
   sC.isBody = "BODY" === o, g || sC.isBody || (e = $N.closest("." + $.layout.defaults.panes.paneClass), 
   f = e.data("parentLayout"), h = e.data("layoutEdge"), g = f && h), $N.data({
    layout: Instance,
    layoutContainer: sID
   }).addClass(a.containerClass);
   var v = {
    destroy: "",
    initPanes: "",
    resizeAll: "resizeAll",
    resize: "resizeAll"
   };
   for (l in v) $N.bind("layout" + l.toLowerCase() + "." + sID, Instance[v[l] || l]);
   g && (Instance.hasParentLayout = !0, f.refreshChildren(h, Instance)), $N.data(u) || (sC.isBody ? ($N.data(u, $.extend(styles($N, c), {
    height: $N.css("height"),
    overflow: $N.css("overflow"),
    overflowX: $N.css("overflowX"),
    overflowY: $N.css("overflowY")
   })), i.data(u, $.extend(styles(i, "padding"), {
    height: "auto",
    overflow: i.css("overflow"),
    overflowX: i.css("overflowX"),
    overflowY: i.css("overflowY")
   }))) : $N.data(u, styles($N, c + ",top,bottom,left,right,width,height,overflow,overflowX,overflowY")));
   try {
    if (d = {
     overflow: p,
     overflowX: p,
     overflowY: p
    }, $N.css(d), a.inset && !$.isPlainObject(a.inset) && (t = parseInt(a.inset, 10) || 0, 
    a.inset = {
     top: t,
     bottom: t,
     left: t,
     right: t
    }), sC.isBody) a.outset ? $.isPlainObject(a.outset) || (t = parseInt(a.outset, 10) || 0, 
    a.outset = {
     top: t,
     bottom: t,
     left: t,
     right: t
    }) : a.outset = {
     top: m(i, "paddingTop"),
     bottom: m(i, "paddingBottom"),
     left: m(i, "paddingLeft"),
     right: m(i, "paddingRight")
    }, i.css(d).css({
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
    }), a.inset || (a.inset = elDims($N).inset)) : ($N.css({
     width: "auto",
     height: "auto",
     margin: 0,
     position: "absolute"
    }), $N.css(a.outset)), $.extend(sC, elDims($N, a.inset)); else {
     var b = $N.css("position");
     b && b.match(/(fixed|absolute|relative)/) || $N.css("position", "relative"), $N.is(":visible") && ($.extend(sC, elDims($N, a.inset)), 
     sC.innerHeight < 1 && _log(a.errors.noContainerHeight.replace(/CONTAINER/, sC.ref)));
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
    t.fxSettings || (t.fxSettings = {}), n.fxSettings || (n.fxSettings = {}), $.each([ "_open", "_close", "_size" ], function(i, o) {
     var r = "fxName" + o, s = "fxSpeed" + o, a = "fxSettings" + o, l = t[r] = t[r] || n[r] || t.fxName || n.fxName || "none", c = $.effects && ($.effects[l] || $.effects.effect && $.effects.effect[l]);
     "none" !== l && options.effects[l] && c || (l = t[r] = "none");
     var u = options.effects[l] || {}, d = u.all || null, p = u[e] || null;
     t[s] = t[s] || n[s] || t.fxSpeed || n.fxSpeed || null, t[a] = $.extend(!0, {}, d, p, n.fxSettings, t.fxSettings, n[a], t[a]);
    }), delete t.fxName, delete t.fxSpeed, delete t.fxSettings;
   }
   var t, n, i, o, r, s, a;
   if (opts = $.layout.transformData(opts, !0), opts = $.layout.backwardCompatibility.renameAllOptions(opts), 
   !$.isEmptyObject(opts.panes)) {
    for (t = $.layout.optionsMap.noDefault, r = 0, s = t.length; s > r; r++) i = t[r], 
    delete opts.panes[i];
    for (t = $.layout.optionsMap.layout, r = 0, s = t.length; s > r; r++) i = t[r], 
    delete opts.panes[i];
   }
   t = $.layout.optionsMap.layout;
   var l = $.layout.config.optionRootKeys;
   for (i in opts) o = opts[i], $.inArray(i, l) < 0 && $.inArray(i, t) < 0 && (opts.panes[i] || (opts.panes[i] = $.isPlainObject(o) ? $.extend(!0, {}, o) : o), 
   delete opts[i]);
   $.extend(!0, options, opts), $.each(_c.allPanes, function(o, r) {
    if (_c[r] = $.extend(!0, {}, _c.panes, _c[r]), n = options.panes, a = options[r], 
    "center" === r) for (t = $.layout.optionsMap.center, o = 0, s = t.length; s > o; o++) i = t[o], 
    opts.center[i] || !opts.panes[i] && a[i] || (a[i] = n[i]); else a = options[r] = $.extend(!0, {}, n, a), 
    e(r), a.resizerClass || (a.resizerClass = "ui-layout-resizer"), a.togglerClass || (a.togglerClass = "ui-layout-toggler");
    a.paneClass || (a.paneClass = "ui-layout-pane");
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
    var n, i, o, r = options[e], s = state[e], a = _c[e], l = a.dir, c = (s.fx, r.spacing_open || 0, 
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
    }).css(a.cssReq).css("zIndex", options.zIndexes.pane_normal).css(r.applyDemoStyles ? a.cssDemo : {}).addClass(r.paneClass + " " + r.paneClass + "-" + e).bind("mouseenter." + sID, addHover).bind("mouseleave." + sID, removeHover);
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
    initContent(e, !1), c || (n = s.size = _parseSize(e, r.size), i = _parseSize(e, r.minSize) || 1, 
    o = _parseSize(e, r.maxSize) || 1e5, n > 0 && (n = max(min(n, o), i)), s.autoResize = r.autoResize, 
    s.isClosed = !1, s.isSliding = !1, s.isResizing = !1, s.isHidden = !1, s.pins || (s.pins = [])), 
    s.tagName = d[0].tagName, s.edge = e, s.noRoom = !1, s.isVisible = !0, setPanePosition(e), 
    "horz" === l ? u.height = cssH(d, n) : "vert" === l && (u.width = cssW(d, n)), d.css(u), 
    "horz" != l && sizeMidPanes(e, !0), state.initialized && (initHandles(e), initHotkeys(e)), 
    r.initClosed && r.closable && !r.initHidden ? close(e, !0, !0) : r.initHidden || r.initClosed ? hide(e) : s.noRoom || d.css("display", "block"), 
    d.css("visibility", "visible"), r.showOverflowOnHover && d.hover(allowOverflow, resetOverflow), 
    state.initialized && afterInitPane(e);
   }
  }, afterInitPane = function(e) {
   var t = $Ps[e], n = state[e], i = options[e];
   t && (t.data("layout") && refreshChildren(e, t.data("layout")), n.isVisible && (state.initialized ? resizeAll() : sizeContent(e), 
   i.triggerEventsOnLoad ? _runCallbacks("onresize_end", e) : resizeChildren(e, !0)), 
   i.initChildren && i.children && createChildren(e));
  }, setPanePosition = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = $Ps[t], i = $Rs[t], o = (options[t], state[t]), r = _c[t].side, s = {};
    if (n) {
     switch (t) {
     case "north":
      s.top = sC.inset.top, s.left = sC.inset.left, s.right = sC.inset.right;
      break;

     case "south":
      s.bottom = sC.inset.bottom, s.left = sC.inset.left, s.right = sC.inset.right;
      break;

     case "west":
      s.left = sC.inset.left;
      break;

     case "east":
      s.right = sC.inset.right;
      break;

     case "center":     }
     n.css(s), i && o.isClosed ? i.css(r, sC.inset[r]) : i && !o.isHidden && i.css(r, sC.inset[r] + getPaneSize(t));
    }
   });
  }, initHandles = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = $Ps[t];
    if ($Rs[t] = !1, $Ts[t] = !1, n) {
     var i = options[t], o = state[t], r = (_c[t], "#" === i.paneSelector.substr(0, 1) ? i.paneSelector.substr(1) : ""), s = i.resizerClass, a = i.togglerClass, l = (o.isVisible ? i.spacing_open : i.spacing_closed, 
     "-" + t), c = (o.isVisible ? "-open" : "-closed", Instance[t]), u = c.resizer = $Rs[t] = $("<div></div>"), d = c.toggler = i.closable ? $Ts[t] = $("<div></div>") : !1;
     !o.isVisible && i.slidable && u.attr("title", i.tips.Slide).css("cursor", i.sliderCursor), 
     u.attr("id", r ? r + "-resizer" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "resizer"
     }).css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal).css(i.applyDemoStyles ? _c.resizers.cssDemo : {}).addClass(s + " " + s + l).hover(addHover, removeHover).hover(onResizerEnter, onResizerLeave).appendTo($N), 
     i.resizerDblClickToggle && u.bind("dblclick." + sID, toggle), d && (d.attr("id", r ? r + "-toggler" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "toggler"
     }).css(_c.togglers.cssReq).css(i.applyDemoStyles ? _c.togglers.cssDemo : {}).addClass(a + " " + a + l).hover(addHover, removeHover).bind("mouseenter", onResizerEnter).appendTo(u), 
     i.togglerContent_open && $("<span>" + i.togglerContent_open + "</span>").data({
      layoutEdge: t,
      layoutRole: "togglerContent"
     }).data("layoutRole", "togglerContent").data("layoutEdge", t).addClass("content content-open").css("display", "none").appendTo(d), 
     i.togglerContent_closed && $("<span>" + i.togglerContent_closed + "</span>").data({
      layoutEdge: t,
      layoutRole: "togglerContent"
     }).addClass("content content-closed").css("display", "none").appendTo(d), enableClosable(t)), 
     initResizable(t), o.isVisible ? setAsOpen(t) : (setAsClosed(t), bindStartSlidingEvents(t, !0));
    }
   }), sizeHandles();
  }, initContent = function(e, t) {
   if (isInitialized()) {
    var n, i = options[e], o = i.contentSelector, r = Instance[e], s = $Ps[e];
    o && (n = r.content = $Cs[e] = i.findNestedContent ? s.find(o).eq(0) : s.children(o).eq(0)), 
    n && n.length ? (n.data("layoutRole", "content"), n.data("layoutCSS") || n.data("layoutCSS", styles(n, "height")), 
    n.css(_c.content.cssReq), i.applyDemoStyles && (n.css(_c.content.cssDemo), s.css(_c.content.cssDemoPane)), 
    s.css("overflowX").match(/(scroll|auto)/) && s.css("overflow", "hidden"), state[e].content = {}, 
    t !== !1 && sizeContent(e)) : r.content = $Cs[e] = !1;
   }
  }, initResizable = function(e) {
   var t = $.layout.plugins.draggable;
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, i) {
    var o = options[i];
    if (!t || !$Ps[i] || !o.resizable) return o.resizable = !1, !0;
    var r, s, a = state[i], l = options.zIndexes, c = _c[i], u = "horz" == c.dir ? "top" : "left", d = ($Ps[i], 
    $Rs[i]), p = o.resizerClass, f = 0, h = p + "-drag", g = p + "-" + i + "-drag", m = p + "-dragging", v = p + "-" + i + "-dragging", b = p + "-dragging-limit", y = p + "-" + i + "-dragging-limit", w = !1;
    a.isClosed || d.attr("title", o.tips.Resize).css("cursor", o.resizerCursor), d.draggable({
     containment: $N[0],
     axis: "horz" == c.dir ? "y" : "x",
     delay: 0,
     distance: 1,
     grid: o.resizingGrid,
     helper: "clone",
     opacity: o.resizerDragOpacity,
     addClasses: !1,
     zIndex: l.resizer_drag,
     start: function(e, t) {
      return o = options[i], a = state[i], s = o.livePaneResizing, !1 === _runCallbacks("ondrag_start", i) ? !1 : (a.isResizing = !0, 
      state.paneResizing = i, timer.clear(i + "_closeSlider"), setSizeLimits(i), r = a.resizerPosition, 
      f = t.position[u], d.addClass(h + " " + g), w = !1, $("body").disableSelection(), 
      showMasks(i, {
       resizing: !0
      }), void 0);
     },
     drag: function(e, t) {
      w || (t.helper.addClass(m + " " + v).css({
       right: "auto",
       bottom: "auto"
      }).children().css("visibility", "hidden"), w = !0, a.isSliding && $Ps[i].css("zIndex", l.pane_sliding));
      var c = 0;
      t.position[u] < r.min ? (t.position[u] = r.min, c = -1) : t.position[u] > r.max && (t.position[u] = r.max, 
      c = 1), c ? (t.helper.addClass(b + " " + y), window.defaultStatus = c > 0 && i.match(/(north|west)/) || 0 > c && i.match(/(south|east)/) ? o.tips.maxSizeWarning : o.tips.minSizeWarning) : (t.helper.removeClass(b + " " + y), 
      window.defaultStatus = ""), s && Math.abs(t.position[u] - f) >= o.liveResizingTolerance && (f = t.position[u], 
      n(e, t, i));
     },
     stop: function(e, t) {
      $("body").enableSelection(), window.defaultStatus = "", d.removeClass(h + " " + g), 
      a.isResizing = !1, state.paneResizing = !1, n(e, t, i, !0);
     }
    });
   });
   var n = function(e, t, n, i) {
    var o, r = t.position, s = _c[n], a = options[n], l = state[n];
    switch (n) {
    case "north":
     o = r.top;
     break;

    case "west":
     o = r.left;
     break;

    case "south":
     o = sC.layoutHeight - r.top - a.spacing_open;
     break;

    case "east":
     o = sC.layoutWidth - r.left - a.spacing_open;
    }
    var c = o - sC.inset[s.side];
    if (i) !1 !== _runCallbacks("ondrag_end", n) && manualSizePane(n, c, !1, !0), hideMasks(!0), 
    l.isSliding && showMasks(n, {
     resizing: !0
    }); else {
     if (Math.abs(c - l.size) < a.liveResizingTolerance) return;
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
   var n, i, o = _c[e], r = [ "center" ], s = options.zIndexes, a = $.extend({
    objectsOnly: !1,
    animation: !1,
    resizing: !0,
    sliding: state[e].isSliding
   }, t);
   a.resizing && r.push(e), a.sliding && r.push(_c.oppositeEdge[e]), "horz" === o.dir && (r.push("west"), 
   r.push("east")), $.each(r, function(e, t) {
    i = state[t], n = options[t], i.isVisible && (n.maskObjects || !a.objectsOnly && n.maskContents) && getMasks(t).each(function() {
     sizeMask.call(this), this.style.zIndex = i.isSliding ? s.pane_sliding + 1 : s.pane_normal + 1, 
     this.style.display = "block";
    });
   });
  }, hideMasks = function(e) {
   if (e || !state.paneResizing) $Ms.hide(); else if (!e && !$.isEmptyObject(state.panesSliding)) for (var t, n, i = $Ms.length - 1; i >= 0; i--) n = $Ms.eq(i), 
   t = n.data("layoutMask"), options[t].maskObjects || n.hide();
  }, getMasks = function(e) {
   for (var t, n = $([]), i = 0, o = $Ms.length; o > i; i++) t = $Ms.eq(i), t.data("layoutMask") === e && (n = n.add(t));
   return n.length ? n : createMasks(e);
  }, createMasks = function(e) {
   var t, n, i, o, r, s = $Ps[e], a = state[e], l = options[e], c = options.zIndexes, u = $([]);
   if (!l.maskContents && !l.maskObjects) return u;
   for (r = 0; r < (l.maskObjects ? 2 : 1); r++) t = l.maskObjects && 0 == r, n = document.createElement(t ? "iframe" : "div"), 
   i = $(n).data("layoutMask", e), n.className = "ui-layout-mask ui-layout-mask-" + e, 
   o = n.style, o.display = "block", o.position = "absolute", o.background = "#FFF", 
   t && (n.frameborder = 0, n.src = "about:blank", o.opacity = 0, o.filter = "Alpha(Opacity='0')", 
   o.border = 0), "IFRAME" == a.tagName ? (o.zIndex = c.pane_normal + 1, $N.append(n)) : (i.addClass("ui-layout-mask-inside-pane"), 
   o.zIndex = l.maskZindex || c.content_mask, o.top = 0, o.left = 0, o.width = "100%", 
   o.height = "100%", s.append(n)), u = u.add(n), $Ms = $Ms.add(n);
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
   for (var i in Instance) i.match(/^(container|options)$/) || delete Instance[i];
   return Instance.destroyed = !0, Instance;
  }, removePane = function(e, t, n, i) {
   if (isInitialized()) {
    var o = evtPane.call(this, e), r = $Ps[o], s = $Cs[o], a = $Rs[o], l = $Ts[o];
    r && $.isEmptyObject(r.data()) && (r = !1), s && $.isEmptyObject(s.data()) && (s = !1), 
    a && $.isEmptyObject(a.data()) && (a = !1), l && $.isEmptyObject(l.data()) && (l = !1), 
    r && r.stop(!0, !0);
    var c = options[o], u = state[o], d = "layout", p = "layoutCSS", f = children[o], h = $.isPlainObject(f) && !$.isEmptyObject(f), g = void 0 !== i ? i : c.destroyChildren;
    if (h && g && ($.each(f, function(e, t) {
     t.destroyed || t.destroy(!0), t.destroyed && delete f[e];
    }), $.isEmptyObject(f) && (f = children[o] = null, h = !1)), r && t && !h) r.remove(); else if (r && r[0]) {
     var m = c.paneClass, v = m + "-" + o, b = "-open", y = "-sliding", w = "-closed", x = [ m, m + b, m + w, m + y, v, v + b, v + w, v + y ];
     $.merge(x, getHoverClasses(r, !0)), r.removeClass(x.join(" ")).removeData("parentLayout").removeData("layoutPane").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." + sID), 
     h && s ? (s.width(s.width()), $.each(f, function(e, t) {
      t.resizeAll();
     })) : s && s.css(s.data(p)).removeData(p).removeData("layoutRole"), r.data(d) || r.css(r.data(p)).removeData(p);
    }
    l && l.remove(), a && a.remove(), Instance[o] = $Ps[o] = $Cs[o] = $Rs[o] = $Ts[o] = !1, 
    u = {
     removed: !0
    }, n || resizeAll();
   }
  }, _hidePane = function(e) {
   var t = $Ps[e], n = options[e], i = t[0].style;
   n.useOffscreenClose ? (t.data(_c.offscreenReset) || t.data(_c.offscreenReset, {
    left: i.left,
    right: i.right
   }), t.css(_c.offscreenCSS)) : t.hide().removeData(_c.offscreenReset);
  }, _showPane = function(e) {
   var t = $Ps[e], n = options[e], i = _c.offscreenCSS, o = t.data(_c.offscreenReset), r = t[0].style;
   t.show().removeData(_c.offscreenReset), n.useOffscreenClose && o && (r.left == i.left && (r.left = o.left), 
   r.right == i.right && (r.right = o.right));
  }, hide = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), i = options[n], o = state[n], r = $Ps[n], s = $Rs[n];
    r && !o.isHidden && (state.initialized && !1 === _runCallbacks("onhide_start", n) || (o.isSliding = !1, 
    delete state.panesSliding[n], s && s.hide(), !state.initialized || o.isClosed ? (o.isClosed = !0, 
    o.isHidden = !0, o.isVisible = !1, state.initialized || _hidePane(n), sizeMidPanes("horz" === _c[n].dir ? "" : "center"), 
    (state.initialized || i.triggerEventsOnLoad) && _runCallbacks("onhide_end", n)) : (o.isHiding = !0, 
    close(n, !1, t))));
   }
  }, show = function(e, t, n, i) {
   if (isInitialized()) {
    var o = evtPane.call(this, e), r = (options[o], state[o]), s = $Ps[o];
    $Rs[o], s && r.isHidden && !1 !== _runCallbacks("onshow_start", o) && (r.isShowing = !0, 
    r.isSliding = !1, delete state.panesSliding[o], t === !1 ? close(o, !0) : open(o, !1, n, i));
   }
  }, toggle = function(e, t) {
   if (isInitialized()) {
    var n = evtObj(e), i = evtPane.call(this, e), o = state[i];
    n && n.stopImmediatePropagation(), o.isHidden ? show(i) : o.isClosed ? open(i, !!t) : close(i);
   }
  }, _closePane = function(e, t) {
   var n = ($Ps[e], state[e]);
   _hidePane(e), n.isClosed = !0, n.isVisible = !1, t && setAsClosed(e);
  }, close = function(e, t, n, i) {
   function o() {
    p.isMoving = !1, bindStartSlidingEvents(r, !0);
    var e = _c.oppositeEdge[r];
    state[e].noRoom && (setSizeLimits(e), makePaneFit(e)), i || !state.initialized && !d.triggerEventsOnLoad || (a || _runCallbacks("onclose_end", r), 
    a && _runCallbacks("onshow_end", r), l && _runCallbacks("onhide_end", r));
   }
   var r = evtPane.call(this, e);
   if (!state.initialized && $Ps[r]) return _closePane(r, !0), void 0;
   if (isInitialized()) {
    var s, a, l, c, u = $Ps[r], d = ($Rs[r], $Ts[r], options[r]), p = state[r];
    _c[r], $N.queue(function(e) {
     if (!u || !d.closable && !p.isShowing && !p.isHiding || !t && p.isClosed && !p.isShowing) return e();
     var i = !p.isShowing && !1 === _runCallbacks("onclose_start", r);
     return a = p.isShowing, l = p.isHiding, c = p.isSliding, delete p.isShowing, delete p.isHiding, 
     i ? e() : (s = !n && !p.isClosed && "none" != d.fxName_close, p.isMoving = !0, p.isClosed = !0, 
     p.isVisible = !1, l ? p.isHidden = !0 : a && (p.isHidden = !1), p.isSliding ? bindStopSlidingEvents(r, !1) : sizeMidPanes("horz" === _c[r].dir ? "" : "center", !1), 
     setAsClosed(r), s ? (lockPaneForFX(r, !0), u.hide(d.fxName_close, d.fxSettings_close, d.fxSpeed_close, function() {
      lockPaneForFX(r, !1), p.isClosed && o(), e();
     })) : (_hidePane(r), o(), e()), void 0);
    });
   }
  }, setAsClosed = function(e) {
   if ($Rs[e]) {
    var t = ($Ps[e], $Rs[e]), n = $Ts[e], i = options[e], o = (state[e], _c[e].side), r = i.resizerClass, s = i.togglerClass, a = "-" + e, l = "-open", c = "-sliding", u = "-closed";
    t.css(o, sC.inset[o]).removeClass(r + l + " " + r + a + l).removeClass(r + c + " " + r + a + c).addClass(r + u + " " + r + a + u), 
    i.resizable && $.layout.plugins.draggable && t.draggable("disable").removeClass("ui-state-disabled").css("cursor", "default").attr("title", ""), 
    n && (n.removeClass(s + l + " " + s + a + l).addClass(s + u + " " + s + a + u).attr("title", i.tips.Open), 
    n.children(".content-open").hide(), n.children(".content-closed").css("display", "block")), 
    syncPinBtns(e, !1), state.initialized && sizeHandles();
   }
  }, open = function(e, t, n, i) {
   function o() {
    u.isMoving = !1, _fixIframe(a), u.isSliding || sizeMidPanes("vert" == _c[a].dir ? "center" : "", !1), 
    setAsOpen(a);
   }
   if (isInitialized()) {
    var r, s, a = evtPane.call(this, e), l = $Ps[a], c = ($Rs[a], $Ts[a], options[a]), u = state[a];
    _c[a], $N.queue(function(e) {
     if (!l || !c.resizable && !c.closable && !u.isShowing || u.isVisible && !u.isSliding) return e();
     if (u.isHidden && !u.isShowing) return e(), show(a, !0), void 0;
     u.autoResize && u.size != c.size ? sizePane(a, c.size, !0, !0, !0) : setSizeLimits(a, t);
     var d = _runCallbacks("onopen_start", a);
     return "abort" === d ? e() : ("NC" !== d && setSizeLimits(a, t), u.minSize > u.maxSize ? (syncPinBtns(a, !1), 
     !i && c.tips.noRoomToOpen && alert(c.tips.noRoomToOpen), e()) : (t ? bindStopSlidingEvents(a, !0) : u.isSliding ? bindStopSlidingEvents(a, !1) : c.slidable && bindStartSlidingEvents(a, !1), 
     u.noRoom = !1, makePaneFit(a), s = u.isShowing, delete u.isShowing, r = !n && u.isClosed && "none" != c.fxName_open, 
     u.isMoving = !0, u.isVisible = !0, u.isClosed = !1, s && (u.isHidden = !1), r ? (lockPaneForFX(a, !0), 
     l.show(c.fxName_open, c.fxSettings_open, c.fxSpeed_open, function() {
      lockPaneForFX(a, !1), u.isVisible && o(), e();
     })) : (_showPane(a), o(), e()), void 0));
    });
   }
  }, setAsOpen = function(e, t) {
   var n = $Ps[e], i = $Rs[e], o = $Ts[e], r = options[e], s = state[e], a = _c[e].side, l = r.resizerClass, c = r.togglerClass, u = "-" + e, d = "-open", p = "-closed", f = "-sliding";
   i.css(a, sC.inset[a] + getPaneSize(e)).removeClass(l + p + " " + l + u + p).addClass(l + d + " " + l + u + d), 
   s.isSliding ? i.addClass(l + f + " " + l + u + f) : i.removeClass(l + f + " " + l + u + f), 
   removeHover(0, i), r.resizable && $.layout.plugins.draggable ? i.draggable("enable").css("cursor", r.resizerCursor).attr("title", r.tips.Resize) : s.isSliding || i.css("cursor", "default"), 
   o && (o.removeClass(c + p + " " + c + u + p).addClass(c + d + " " + c + u + d).attr("title", r.tips.Close), 
   removeHover(0, o), o.children(".content-closed").hide(), o.children(".content-open").css("display", "block")), 
   syncPinBtns(e, !s.isSliding), $.extend(s, elDims(n)), state.initialized && (sizeHandles(), 
   sizeContent(e, !0)), !t && (state.initialized || r.triggerEventsOnLoad) && n.is(":visible") && (_runCallbacks("onopen_end", e), 
   s.isShowing && _runCallbacks("onshow_end", e), state.initialized && _runCallbacks("onresize_end", e));
  }, slideOpen = function(e) {
   function t() {
    o.isClosed ? o.isMoving || open(i, !0) : bindStopSlidingEvents(i, !0);
   }
   if (isInitialized()) {
    var n = evtObj(e), i = evtPane.call(this, e), o = state[i], r = options[i].slideDelay_open;
    n && n.stopImmediatePropagation(), o.isClosed && n && "mouseenter" === n.type && r > 0 ? timer.set(i + "_openSlider", t, r) : t();
   }
  }, slideClose = function(e) {
   function t() {
    r.isClosed ? bindStopSlidingEvents(i, !1) : r.isMoving || close(i);
   }
   if (isInitialized()) {
    var n = evtObj(e), i = evtPane.call(this, e), o = options[i], r = state[i], s = r.isMoving ? 1e3 : 300;
    if (!r.isClosed && !r.isResizing) if ("click" === o.slideTrigger_close) t(); else {
     if (o.preventQuickSlideClose && r.isMoving) return;
     if (o.preventPrematureSlideClose && n && $.layout.isMouseOverElem(n, $Ps[i])) return;
     n ? timer.set(i + "_closeSlider", t, max(o.slideDelay_close, s)) : t();
    }
   }
  }, slideToggle = function(e) {
   var t = evtPane.call(this, e);
   toggle(t, !0);
  }, lockPaneForFX = function(e, t) {
   var n = $Ps[e], i = state[e], o = options[e], r = options.zIndexes;
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
    zIndex: i.isSliding ? r.pane_sliding : r.pane_normal
   }), "south" == e ? n.css({
    top: "auto"
   }) : "east" != e || n.css("left").match(/\-99999/) || n.css({
    left: "auto"
   }), browser.msie && o.fxOpacityFix && "slide" != o.fxName_open && n.css("filter") && 1 == n.css("opacity") && n[0].style.removeAttribute("filter"));
  }, bindStartSlidingEvents = function(e, t) {
   var n = options[e], i = ($Ps[e], $Rs[e]), o = n.slideTrigger_open.toLowerCase();
   !i || t && !n.slidable || (o.match(/mouseover/) ? o = n.slideTrigger_open = "mouseenter" : o.match(/(click|dblclick|mouseenter)/) || (o = n.slideTrigger_open = "click"), 
   n.resizerDblClickToggle && o.match(/click/) && i[t ? "unbind" : "bind"]("dblclick." + sID, toggle), 
   i[t ? "bind" : "unbind"](o + "." + sID, slideOpen).css("cursor", t ? n.sliderCursor : "default").attr("title", t ? n.tips.Slide : ""));
  }, bindStopSlidingEvents = function(e, t) {
   function n(t) {
    timer.clear(e + "_closeSlider"), t.stopPropagation();
   }
   var i = options[e], o = state[e], r = (_c[e], options.zIndexes), s = i.slideTrigger_close.toLowerCase(), a = t ? "bind" : "unbind", l = $Ps[e], c = $Rs[e];
   timer.clear(e + "_closeSlider"), t ? (o.isSliding = !0, state.panesSliding[e] = !0, 
   bindStartSlidingEvents(e, !1)) : (o.isSliding = !1, delete state.panesSliding[e]), 
   l.css("zIndex", t ? r.pane_sliding : r.pane_normal), c.css("zIndex", t ? r.pane_sliding + 2 : r.resizer_normal), 
   s.match(/(click|mouseleave)/) || (s = i.slideTrigger_close = "mouseleave"), c[a](s, slideClose), 
   "mouseleave" === s && (l[a]("mouseleave." + sID, slideClose), c[a]("mouseenter." + sID, n), 
   l[a]("mouseenter." + sID, n)), t ? "click" !== s || i.resizable || (c.css("cursor", t ? i.sliderCursor : "default"), 
   c.attr("title", t ? i.tips.Close : "")) : timer.clear(e + "_closeSlider");
  }, makePaneFit = function(e, t, n, i) {
   var o = options[e], r = state[e], s = _c[e], a = $Ps[e], l = $Rs[e], c = "vert" === s.dir, u = !1;
   if (("center" === e || c && r.noVerticalRoom) && (u = r.maxHeight >= 0, u && r.noRoom ? (_showPane(e), 
   l && l.show(), r.isVisible = !0, r.noRoom = !1, c && (r.noVerticalRoom = !1), _fixIframe(e)) : u || r.noRoom || (_hidePane(e), 
   l && l.hide(), r.isVisible = !1, r.noRoom = !0)), "center" === e) ; else if (r.minSize <= r.maxSize) {
    if (u = !0, r.size > r.maxSize) sizePane(e, r.maxSize, n, !0, i); else if (r.size < r.minSize) sizePane(e, r.minSize, n, !0, i); else if (l && r.isVisible && a.is(":visible")) {
     var d = r.size + sC.inset[s.side];
     $.layout.cssNum(l, s.side) != d && l.css(s.side, d);
    }
    r.noRoom && (r.wasOpen && o.closable ? o.autoReopen ? open(e, !1, !0, !0) : r.noRoom = !1 : show(e, r.wasOpen, !0, !0));
   } else r.noRoom || (r.noRoom = !0, r.wasOpen = !r.isClosed && !r.isSliding, r.isClosed || (o.closable ? close(e, !0, !0) : hide(e, !0)));
  }, manualSizePane = function(e, t, n, i, o) {
   if (isInitialized()) {
    var r = evtPane.call(this, e), s = options[r], a = state[r], l = o || s.livePaneResizing && !a.isResizing;
    a.autoResize = !1, sizePane(r, t, n, i, l);
   }
  }, sizePane = function(e, t, n, i, o) {
   function r() {
    for (var e = "width" === h ? d.outerWidth() : d.outerHeight(), i = [ {
     pane: l,
     count: 1,
     target: t,
     actual: e,
     correct: t === e,
     attempt: t,
     cssSize: a
    } ], r = i[0], c = {}, m = "Inaccurate size after resizing the " + l + "-pane."; !(r.correct || (c = {
     pane: l,
     count: r.count + 1,
     target: t
    }, c.attempt = r.actual > t ? max(0, r.attempt - (r.actual - t)) : max(0, r.attempt + (t - r.actual)), 
    c.cssSize = cssSize(l, c.attempt), d.css(h, c.cssSize), c.actual = "width" == h ? d.outerWidth() : d.outerHeight(), 
    c.correct = t === c.actual, 1 === i.length && (_log(m, !1, !0), _log(r, !1, !0)), 
    _log(c, !1, !0), i.length > 3)); ) i.push(c), r = i[i.length - 1];
    u.size = t, $.extend(u, elDims(d)), u.isVisible && d.is(":visible") && (p && p.css(f, t + sC.inset[f]), 
    sizeContent(l)), !n && !g && state.initialized && u.isVisible && _runCallbacks("onresize_end", l), 
    n || (u.isSliding || sizeMidPanes("horz" == _c[l].dir ? "" : "center", g, o), sizeHandles());
    var v = _c.oppositeEdge[l];
    s > t && state[v].noRoom && (setSizeLimits(v), makePaneFit(v, !1, n)), i.length > 1 && _log(m + "\nSee the Error Console for details.", !0, !0);
   }
   if (isInitialized()) {
    var s, a, l = evtPane.call(this, e), c = options[l], u = state[l], d = $Ps[l], p = $Rs[l], f = _c[l].side, h = _c[l].sizeType.toLowerCase(), g = u.isResizing && !c.triggerEventsDuringLiveResize, m = i !== !0 && c.animatePaneSizing;
    $N.queue(function(e) {
     if (setSizeLimits(l), s = u.size, t = _parseSize(l, t), t = max(t, _parseSize(l, c.minSize)), 
     t = min(t, u.maxSize), t < u.minSize) return e(), makePaneFit(l, !1, n), void 0;
     if (!o && t === s) return e();
     if (u.newSize = t, !n && state.initialized && u.isVisible && _runCallbacks("onresize_start", l), 
     a = cssSize(l, t), m && d.is(":visible")) {
      var i = $.layout.effects.size[l] || $.layout.effects.size.all, p = c.fxSettings_size.easing || i.easing, f = options.zIndexes, g = {};
      g[h] = a + "px", u.isMoving = !0, d.css({
       zIndex: f.pane_animate
      }).show().animate(g, c.fxSpeed_size, p, function() {
       d.css({
        zIndex: u.isSliding ? f.pane_sliding : f.pane_normal
       }), u.isMoving = !1, delete u.newSize, r(), e();
      });
     } else d.css(h, a), delete u.newSize, d.is(":visible") ? r() : (u.size = t, $.extend(u, elDims(d))), 
     e();
    });
   }
  }, sizeMidPanes = function(e, t, n) {
   e = (e ? e : "east,west,center").split(","), $.each(e, function(e, i) {
    if ($Ps[i]) {
     var o = options[i], r = state[i], s = $Ps[i], a = ($Rs[i], !0), l = {}, c = $.layout.showInvisibly(s), u = calcNewCenterPaneDims();
     if ($.extend(r, elDims(s)), "center" === i) {
      if (!n && r.isVisible && u.width === r.outerWidth && u.height === r.outerHeight) return s.css(c), 
      !0;
      if ($.extend(r, cssMinDims(i), {
       maxWidth: u.width,
       maxHeight: u.height
      }), l = u, r.newWidth = l.width, r.newHeight = l.height, l.width = cssW(s, l.width), 
      l.height = cssH(s, l.height), a = l.width >= 0 && l.height >= 0, !state.initialized && o.minWidth > u.width) {
       var d = o.minWidth - r.outerWidth, p = options.east.minSize || 0, f = options.west.minSize || 0, h = state.east.size, g = state.west.size, m = h, v = g;
       if (d > 0 && state.east.isVisible && h > p && (m = max(h - p, h - d), d -= h - m), 
       d > 0 && state.west.isVisible && g > f && (v = max(g - f, g - d), d -= g - v), 0 === d) return h && h != p && sizePane("east", m, !0, !0, n), 
       g && g != f && sizePane("west", v, !0, !0, n), sizeMidPanes("center", t, n), s.css(c), 
       void 0;
      }
     } else {
      if (r.isVisible && !r.noVerticalRoom && $.extend(r, elDims(s), cssMinDims(i)), !n && !r.noVerticalRoom && u.height === r.outerHeight) return s.css(c), 
      !0;
      l.top = u.top, l.bottom = u.bottom, r.newSize = u.height, l.height = cssH(s, u.height), 
      r.maxHeight = l.height, a = r.maxHeight >= 0, a || (r.noVerticalRoom = !0);
     }
     if (a ? (!t && state.initialized && _runCallbacks("onresize_start", i), s.css(l), 
     "center" !== i && sizeHandles(i), !r.noRoom || r.isClosed || r.isHidden || makePaneFit(i), 
     r.isVisible && ($.extend(r, elDims(s)), state.initialized && sizeContent(i))) : !r.noRoom && r.isVisible && makePaneFit(i), 
     s.css(c), delete r.newSize, delete r.newWidth, delete r.newHeight, !r.isVisible) return !0;
     if ("center" === i) {
      var b = browser.isIE6 || !browser.boxModel;
      $Ps.north && (b || "IFRAME" == state.north.tagName) && $Ps.north.css("width", cssW($Ps.north, sC.innerWidth)), 
      $Ps.south && (b || "IFRAME" == state.south.tagName) && $Ps.south.css("width", cssW($Ps.south, sC.innerWidth));
     }
     !t && state.initialized && _runCallbacks("onresize_end", i);
    }
   });
  }, resizeAll = function(e) {
   var t = sC.innerWidth, n = sC.innerHeight;
   if (evtPane(e), $N.is(":visible")) {
    if (!state.initialized) return _initLayoutElements(), void 0;
    if (e === !0 && $.isPlainObject(options.outset) && $N.css(options.outset), $.extend(sC, elDims($N, options.inset)), 
    sC.outerHeight) {
     if (e === !0 && setPanePosition(), !1 === _runCallbacks("onresizeall_start")) return !1;
     var i, o, r;
     sC.innerHeight < n, sC.innerWidth < t, $.each([ "south", "north", "east", "west" ], function(e, t) {
      $Ps[t] && (o = options[t], r = state[t], r.autoResize && r.size != o.size ? sizePane(t, o.size, !0, !0, !0) : (setSizeLimits(t), 
      makePaneFit(t, !1, !0, !0)));
     }), sizeMidPanes("", !0, !0), sizeHandles(), $.each(_c.allPanes, function(e, t) {
      i = $Ps[t], i && state[t].isVisible && _runCallbacks("onresize_end", t);
     }), _runCallbacks("onresizeall_end");
    }
   }
  }, resizeChildren = function(e, t) {
   var n = evtPane.call(this, e);
   if (options[n].resizeChildren) {
    t || refreshChildren(n);
    var i = children[n];
    $.isPlainObject(i) && $.each(i, function(e, t) {
     t.destroyed || t.resizeAll();
    });
   }
  }, sizeContent = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e);
    n = n ? n.split(",") : _c.allPanes, $.each(n, function(e, n) {
     function i(e) {
      return max(l.css.paddingBottom, parseInt(e.css("marginBottom"), 10) || 0);
     }
     function o() {
      var e = options[n].contentIgnoreSelector, t = s.nextAll().not(".ui-layout-mask").not(e || ":lt(0)"), o = t.filter(":visible"), r = o.filter(":last");
      c = {
       top: s[0].offsetTop,
       height: s.outerHeight(),
       numFooters: t.length,
       hiddenFooters: t.length - o.length,
       spaceBelow: 0
      }, c.spaceAbove = c.top, c.bottom = c.top + c.height, c.spaceBelow = r.length ? r[0].offsetTop + r.outerHeight() - c.bottom + i(r) : i(s);
     }
     var r = $Ps[n], s = $Cs[n], a = options[n], l = state[n], c = l.content;
     if (!r || !s || !r.is(":visible")) return !0;
     if ((s.length || (initContent(n, !1), s)) && !1 !== _runCallbacks("onsizecontent_start", n)) {
      (!l.isMoving && !l.isResizing || a.liveContentResizing || t || void 0 == c.top) && (o(), 
      c.hiddenFooters > 0 && "hidden" === r.css("overflow") && (r.css("overflow", "visible"), 
      o(), r.css("overflow", "hidden")));
      var u = l.innerHeight - (c.spaceAbove - l.css.paddingTop) - (c.spaceBelow - l.css.paddingBottom);
      s.is(":visible") && c.height == u || (setOuterHeight(s, u, !0), c.height = u), state.initialized && _runCallbacks("onsizecontent_end", n);
     }
    });
   }
  }, sizeHandles = function(e) {
   var t = evtPane.call(this, e);
   t = t ? t.split(",") : _c.borderPanes, $.each(t, function(e, t) {
    var n, i = options[t], o = state[t], r = $Ps[t], s = $Rs[t], a = $Ts[t];
    if (r && s) {
     var l, c, u, d = _c[t].dir, p = o.isClosed ? "_closed" : "_open", f = i["spacing" + p], h = i["togglerAlign" + p], g = i["togglerLength" + p];
     if (0 === f) return s.hide(), void 0;
     if (o.noRoom || o.isHidden || s.show(), "horz" === d ? (l = sC.innerWidth, o.resizerLength = l, 
     c = $.layout.cssNum(r, "left"), s.css({
      width: cssW(s, l),
      height: cssH(s, f),
      left: c > -9999 ? c : sC.inset.left
     })) : (l = r.outerHeight(), o.resizerLength = l, s.css({
      height: cssH(s, l),
      width: cssW(s, f),
      top: sC.inset.top + getPaneSize("north", !0)
     })), removeHover(i, s), a) {
      if (0 === g || o.isSliding && i.hideTogglerOnSlide) return a.hide(), void 0;
      if (a.show(), !(g > 0) || "100%" === g || g > l) g = l, u = 0; else if (isStr(h)) switch (h) {
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
       var v = cssW(a, g);
       a.css({
        width: v,
        height: cssH(a, f),
        left: u,
        top: 0
       }), a.children(".content").each(function() {
        n = $(this), n.css("marginLeft", round((v - n.outerWidth()) / 2));
       });
      } else {
       var b = cssH(a, g);
       a.css({
        height: b,
        width: cssW(a, f),
        top: u,
        left: 0
       }), a.children(".content").each(function() {
        n = $(this), n.css("marginTop", round((b - n.outerHeight()) / 2));
       });
      }
      removeHover(0, a);
     }
     state.initialized || !i.initHidden && !o.isHidden || (s.hide(), a && a.hide());
    }
   });
  }, enableClosable = function(e) {
   if (isInitialized()) {
    var t = evtPane.call(this, e), n = $Ts[t], i = options[t];
    n && (i.closable = !0, n.bind("click." + sID, function(e) {
     e.stopPropagation(), toggle(t);
    }).css("visibility", "visible").css("cursor", "pointer").attr("title", state[t].isClosed ? i.tips.Open : i.tips.Close).show());
   }
  }, disableClosable = function(e, t) {
   if (isInitialized()) {
    var n = evtPane.call(this, e), i = $Ts[n];
    i && (options[n].closable = !1, state[n].isClosed && open(n, !1, !0), i.unbind("." + sID).css("visibility", t ? "hidden" : "visible").css("cursor", "default").attr("title", ""));
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
    var t = evtPane.call(this, e), n = $Rs[t], i = options[t];
    n && n.data("draggable") && (i.resizable = !0, n.draggable("enable"), state[t].isClosed || n.css("cursor", i.resizerCursor).attr("title", i.tips.Resize));
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
   function i(e, t) {
    if (e) {
     var n, i, o = e.P, r = e.C, s = e.pane, l = _c[t], c = $.extend(!0, {}, state[t]), u = options[t], d = {
      resizerCursor: u.resizerCursor
     };
     $.each("fxName,fxSpeed,fxSettings".split(","), function(e, t) {
      d[t + "_open"] = u[t + "_open"], d[t + "_close"] = u[t + "_close"], d[t + "_size"] = u[t + "_size"];
     }), $Ps[t] = $(o).data({
      layoutPane: Instance[t],
      layoutEdge: t
     }).css(_c.hidden).css(l.cssReq), $Cs[t] = r ? $(r) : !1, options[t] = $.extend(!0, {}, e.options, d), 
     state[t] = $.extend(!0, {}, e.state), n = new RegExp(u.paneClass + "-" + s, "g"), 
     o.className = o.className.replace(n, u.paneClass + "-" + t), initHandles(t), l.dir != _c[s].dir ? (i = a[t] || 0, 
     setSizeLimits(t), i = max(i, state[t].minSize), manualSizePane(t, i, !0, !0)) : $Rs[t].css(l.side, sC.inset[l.side] + (state[t].isVisible ? getPaneSize(t) : 0)), 
     e.state.isVisible && !c.isVisible ? setAsOpen(t, !0) : (setAsClosed(t), bindStartSlidingEvents(t, !0)), 
     e = null;
    }
   }
   if (isInitialized()) {
    var o = evtPane.call(this, e);
    if (state[o].edge = t, state[t].edge = o, !1 === _runCallbacks("onswap_start", o) || !1 === _runCallbacks("onswap_start", t)) return state[o].edge = o, 
    state[t].edge = t, void 0;
    var r = n(o), s = n(t), a = {};
    a[o] = r ? r.state.size : 0, a[t] = s ? s.state.size : 0, $Ps[o] = !1, $Ps[t] = !1, 
    state[o] = {}, state[t] = {}, $Ts[o] && $Ts[o].remove(), $Ts[t] && $Ts[t].remove(), 
    $Rs[o] && $Rs[o].remove(), $Rs[t] && $Rs[t].remove(), $Rs[o] = $Rs[t] = $Ts[o] = $Ts[t] = !1, 
    i(r, t), i(s, o), r = s = a = null, $Ps[o] && $Ps[o].css(_c.visible), $Ps[t] && $Ps[t].css(_c.visible), 
    resizeAll(), _runCallbacks("onswap_end", o), _runCallbacks("onswap_end", t);
   }
  }, syncPinBtns = function(e, t) {
   $.layout.plugins.buttons && $.each(state[e].pins, function(n, i) {
    $.layout.buttons.setPinState(Instance, $(i), e, t);
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
   for (var n, i = document.cookie, o = i ? i.split(";") : [], r = 0, s = o.length; s > r; r++) if (n = e.trim(o[r]).split("="), 
   n[0] == t) return decodeURIComponent(n[1]);
   return null;
  },
  write: function(t, n, i) {
   var o = "", r = "", s = !1, a = i || {}, l = a.expires || null, c = e.type(l);
   "date" === c ? r = l : "string" === c && l > 0 && (l = parseInt(l, 10), c = "number"), 
   "number" === c && (r = new Date(), l > 0 ? r.setDate(r.getDate() + l) : (r.setFullYear(1970), 
   s = !0)), r && (o += ";expires=" + r.toUTCString()), a.path && (o += ";path=" + a.path), 
   a.domain && (o += ";domain=" + a.domain), a.secure && (o += ";secure"), document.cookie = t + "=" + (s ? "" : encodeURIComponent(n)) + o;
  },
  clear: function(t) {
   e.ui.cookie.write(t, "", {
    expires: -1
   });
  }
 }, e.cookie || (e.cookie = function(t, n, i) {
  var o = e.ui.cookie;
  if (null === n) o.clear(t); else {
   if (void 0 === n) return o.read(t);
   o.write(t, n, i);
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
  saveCookie: function(t, n, i) {
   var o = t.options, r = o.stateManagement, s = e.extend(!0, {}, r.cookie, i || null), a = t.state.stateData = t.readState(n || r.stateKeys);
   return e.ui.cookie.write(s.name || o.name || "Layout", e.layout.state.encodeJSON(a), s), 
   e.extend(!0, {}, a);
  },
  deleteCookie: function(t) {
   var n = t.options;
   e.ui.cookie.clear(n.stateManagement.cookie.name || n.name || "Layout");
  },
  readCookie: function(t) {
   var n = t.options, i = e.ui.cookie.read(n.stateManagement.cookie.name || n.name || "Layout");
   return i ? e.layout.state.decodeJSON(i) : {};
  },
  loadCookie: function(t) {
   var n = e.layout.state.readCookie(t);
   return n && (t.state.stateData = e.extend(!0, {}, n), t.loadState(n)), n;
  },
  loadState: function(t, n, i) {
   if (e.isPlainObject(n) && !e.isEmptyObject(n)) {
    n = t.state.stateData = e.layout.transformData(n);
    var o = t.options.stateManagement;
    if (i = e.extend({
     animateLoad: !1,
     includeChildren: o.includeChildren
    }, i), t.state.initialized) {
     var r, a, l, c, u, d = !i.animateLoad;
     if (e.each(e.layout.config.borderPanes, function(i, o) {
      r = n[o], e.isPlainObject(r) && (s = r.size, a = r.initClosed, l = r.initHidden, 
      ar = r.autoResize, c = t.state[o], u = c.isVisible, ar && (c.autoResize = ar), u || t._sizePane(o, s, !1, !1, !1), 
      l === !0 ? t.hide(o, d) : a === !0 ? t.close(o, !1, d) : a === !1 ? t.open(o, !1, d) : l === !1 && t.show(o, !1, d), 
      u && t._sizePane(o, s, !1, !1, d));
     }), i.includeChildren) {
      var p, f;
      e.each(t.children, function(t, i) {
       p = n[t] ? n[t].children : 0, p && i && e.each(i, function(e, t) {
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
   var i, o, r, s, a, l, c, u = t.options.stateManagement, d = n.includeChildren, p = void 0 !== d ? d : u.includeChildren, f = n.stateKeys || u.stateKeys, h = {
    isClosed: "initClosed",
    isHidden: "initHidden"
   }, g = t.state, m = e.layout.config.allPanes, v = {};
   e.isArray(f) && (f = f.join(",")), f = f.replace(/__/g, ".").split(",");
   for (var b = 0, y = f.length; y > b; b++) i = f[b].split("."), o = i[0], r = i[1], 
   e.inArray(o, m) < 0 || (s = g[o][r], void 0 != s && ("isClosed" == r && g[o].isSliding && (s = !0), 
   (v[o] || (v[o] = {}))[h[r] ? h[r] : r] = s));
   return p && e.each(m, function(n, i) {
    l = t.children[i], a = g.stateData[i], e.isPlainObject(l) && !e.isEmptyObject(l) && (c = v[i] || (v[i] = {}), 
    c.children || (c.children = {}), e.each(l, function(t, n) {
     n.state.initialized ? c.children[t] = e.layout.state.readState(n) : a && a.children && a.children[t] && (c.children[t] = e.extend(!0, {}, a.children[t]));
    }));
   }), v;
  },
  encodeJSON: function(t) {
   function n(t) {
    var i, o, r, s = [], a = 0, l = e.isArray(t);
    for (i in t) o = t[i], r = typeof o, "string" == r ? o = '"' + o + '"' : "object" == r && (o = n(o)), 
    s[a++] = (l ? "" : '"' + i + '":') + o;
    return (l ? "[" : "{") + s.join(",") + (l ? "]" : "}");
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
   var n = e.layout.state, i = t.options, o = i.stateManagement;
   if (e.extend(t, {
    readCookie: function() {
     return n.readCookie(t);
    },
    deleteCookie: function() {
     n.deleteCookie(t);
    },
    saveCookie: function(e, i) {
     return n.saveCookie(t, e, i);
    },
    loadCookie: function() {
     return n.loadCookie(t);
    },
    loadState: function(e, i) {
     n.loadState(t, e, i);
    },
    readState: function(e) {
     return n.readState(t, e);
    },
    encodeJSON: n.encodeJSON,
    decodeJSON: n.decodeJSON
   }), t.state.stateData = {}, o.autoLoad) if (e.isPlainObject(o.autoLoad)) e.isEmptyObject(o.autoLoad) || t.loadState(o.autoLoad); else if (o.enabled) if (e.isFunction(o.autoLoad)) {
    var r = {};
    try {
     r = o.autoLoad(t, t.state, t.options, t.options.name || "");
    } catch (s) {}
    r && e.isPlainObject(r) && !e.isEmptyObject(r) && t.loadState(r);
   } else t.loadCookie();
  },
  _unload: function(t) {
   var n = t.options.stateManagement;
   if (n.enabled && n.autoSave) if (e.isFunction(n.autoSave)) try {
    n.autoSave(t, t.state, t.options, t.options.name || "");
   } catch (i) {} else t.saveCookie();
  }
 }, e.layout.onCreate.push(e.layout.state._create), e.layout.onUnload.push(e.layout.state._unload), 
 e.layout.plugins.buttons = !0, e.layout.defaults.autoBindCustomButtons = !1, e.layout.optionsMap.layout.push("autoBindCustomButtons"), 
 e.layout.buttons = {
  init: function(t) {
   var n, i = "ui-layout-button-", o = t.options.name || "";
   e.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function(r, s) {
    e.each(e.layout.config.borderPanes, function(r, a) {
     e("." + i + s + "-" + a).each(function() {
      n = e(this).data("layoutName") || e(this).attr("layoutName"), (void 0 == n || n === o) && t.bindButton(this, s, a);
     });
    });
   });
  },
  get: function(t, n, i, o) {
   var r = e(n), s = t.options, a = s.errors.addButtonError;
   if (r.length) if (e.inArray(i, e.layout.config.borderPanes) < 0) e.layout.msg(a + " " + s.errors.pane + ": " + i, !0), 
   r = e(""); else {
    var l = s[i].buttonClass + "-" + o;
    r.addClass(l + " " + l + "-" + i).data("layoutName", s.name);
   } else e.layout.msg(a + " " + s.errors.selector + ": " + n, !0);
   return r;
  },
  bind: function(t, n, i, o) {
   var r = e.layout.buttons;
   switch (i.toLowerCase()) {
   case "toggle":
    r.addToggle(t, n, o);
    break;

   case "open":
    r.addOpen(t, n, o);
    break;

   case "close":
    r.addClose(t, n, o);
    break;

   case "pin":
    r.addPin(t, n, o);
    break;

   case "toggle-slide":
    r.addToggle(t, n, o, !0);
    break;

   case "open-slide":
    r.addOpen(t, n, o, !0);
   }
   return t;
  },
  addToggle: function(t, n, i, o) {
   return e.layout.buttons.get(t, n, i, "toggle").click(function(e) {
    t.toggle(i, !!o), e.stopPropagation();
   }), t;
  },
  addOpen: function(t, n, i, o) {
   return e.layout.buttons.get(t, n, i, "open").attr("title", t.options[i].tips.Open).click(function(e) {
    t.open(i, !!o), e.stopPropagation();
   }), t;
  },
  addClose: function(t, n, i) {
   return e.layout.buttons.get(t, n, i, "close").attr("title", t.options[i].tips.Close).click(function(e) {
    t.close(i), e.stopPropagation();
   }), t;
  },
  addPin: function(t, n, i) {
   var o = e.layout.buttons, r = o.get(t, n, i, "pin");
   if (r.length) {
    var s = t.state[i];
    r.click(function(n) {
     o.setPinState(t, e(this), i, s.isSliding || s.isClosed), s.isSliding || s.isClosed ? t.open(i) : t.close(i), 
     n.stopPropagation();
    }), o.setPinState(t, r, i, !s.isClosed && !s.isSliding), s.pins.push(n);
   }
   return t;
  },
  setPinState: function(e, t, n, i) {
   var o = t.attr("pin");
   if (!o || i !== ("down" == o)) {
    var r = e.options[n], s = r.buttonClass + "-pin", a = s + "-" + n, l = s + "-up " + a + "-up", c = s + "-down " + a + "-down";
    t.attr("pin", i ? "down" : "up").attr("title", i ? r.tips.Unpin : r.tips.Pin).removeClass(i ? l : c).addClass(i ? c : l);
   }
  },
  syncPinBtns: function(t, n, i) {
   e.each(t.state[n].pins, function(o, r) {
    e.layout.buttons.setPinState(t, e(r), n, i);
   });
  },
  _load: function(t) {
   var n = e.layout.buttons;
   e.extend(t, {
    bindButton: function(e, i, o) {
     return n.bind(t, e, i, o);
    },
    addToggleBtn: function(e, i, o) {
     return n.addToggle(t, e, i, o);
    },
    addOpenBtn: function(e, i, o) {
     return n.addOpen(t, e, i, o);
    },
    addCloseBtn: function(e, i) {
     return n.addClose(t, e, i);
    },
    addPinBtn: function(e, i) {
     return n.addPin(t, e, i);
    }
   });
   for (var i = 0; 4 > i; i++) {
    var o = e.layout.config.borderPanes[i];
    t.state[o].pins = [];
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
    var n = t.options, i = t.state, o = t.hasParentLayout ? 5e3 : Math.max(n.browserZoomCheckInterval, 100);
    setTimeout(function() {
     if (!t.destroyed && n.resizeWithWindow) {
      var o = e.layout.browserZoom.ratio();
      o !== i.browserZoom && (i.browserZoom = o, t.resizeAll()), e.layout.browserZoom._setTimer(t);
     }
    }, o);
   }
  },
  ratio: function() {
   function t(e, t) {
    return (100 * (parseInt(e, 10) / parseInt(t, 10))).toFixed();
   }
   var n, i, o, r = window, s = screen, a = document, l = a.documentElement || a.body, c = e.layout.browser, u = c.version;
   return c.msie && u > 8 || !c.msie ? !1 : s.deviceXDPI && s.systemXDPI ? t(s.deviceXDPI, s.systemXDPI) : c.webkit && (n = a.body.getBoundingClientRect) ? t(n.left - n.right, a.body.offsetWidth) : c.webkit && (i = r.outerWidth) ? t(i, r.innerWidth) : (i = s.width) && (o = l.clientWidth) ? t(i, o) : !1;
  }
 }, e.layout.onReady.push(e.layout.browserZoom._init);
}(jQuery), define("libs/layout", function() {}), function() {
 function e() {}
 function t(e) {
  this.buttonBar = d.getElementById("wmd-button-bar" + e), this.preview = d.getElementById("wmd-preview" + e), 
  this.input = d.getElementById("wmd-input" + e);
 }
 function n(e, t) {
  var n, o, r, s = this, a = [], c = 0, u = "none", d = function(e, t) {
   u != e && (u = e, t || f()), g.isIE && "moving" == u ? r = null : o = setTimeout(p, 1);
  }, p = function(e) {
   r = new i(t, e), o = void 0;
  };
  this.setCommandMode = function() {
   u = "command", f(), o = setTimeout(p, 0);
  }, this.canUndo = function() {
   return c > 1;
  }, this.canRedo = function() {
   return a[c + 1] ? !0 : !1;
  }, this.undo = function() {
   s.canUndo() && (n ? (n.restore(), n = null) : (a[c] = new i(t), a[--c].restore(), 
   e && e())), u = "none", t.input.focus(), p();
  }, this.redo = function() {
   s.canRedo() && (a[++c].restore(), e && e()), u = "none", t.input.focus(), p();
  };
  var f = function() {
   var o = r || new i(t);
   return o ? "moving" == u ? (n || (n = o), void 0) : (n && (a[c - 1].text != n.text && (a[c++] = n), 
   n = null), a[c++] = o, a[c + 1] = null, e && e(), void 0) : !1;
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
    (g.isIE || r && r.text != t.input.value) && void 0 == o && (u = "paste", f(), p());
   };
   l.addEvent(t.input, "keydown", h), l.addEvent(t.input, "mousedown", function() {
    d("moving");
   }), t.input.onpaste = e, t.input.ondrop = e;
  }, v = function() {
   m(), p(!0);
  };
  this.reinit = function(e, t, i, s) {
   a = [], c = 0, u = "none", n = void 0, o = void 0, p(), r.text = e, r.start = t, 
   r.end = i, r.scrollTop = s, r.setInputAreaSelection(), f();
  }, this.setMode = d, v();
 }
 function i(t, n) {
  var i = this, o = t.input;
  this.init = function() {
   l.isVisible(o) && (n || !d.activeElement || d.activeElement === o) && (this.setInputAreaSelectionStartEnd(), 
   this.scrollTop = o.scrollTop, (!this.text && o.selectionStart || 0 === o.selectionStart) && (this.text = o.value));
  }, this.setInputAreaSelection = function() {
   if (l.isVisible(o)) if (void 0 === o.selectionStart || g.isOpera) {
    if (d.selection) {
     if (d.activeElement && d.activeElement !== o) return;
     o.focus();
     var e = o.createTextRange();
     e.moveStart("character", -o.value.length), e.moveEnd("character", -o.value.length), 
     e.moveEnd("character", i.end), e.moveStart("character", i.start), e.select();
    }
   } else o.focus(), o.selectionStart = i.start, o.selectionEnd = i.end, o.scrollTop = i.scrollTop;
  }, this.setInputAreaSelectionStartEnd = function() {
   if (t.ieCachedRange || !o.selectionStart && 0 !== o.selectionStart) {
    if (d.selection) {
     i.text = l.fixEolChars(o.value);
     var e = t.ieCachedRange || d.selection.createRange(), n = l.fixEolChars(e.text), r = "", s = r + n + r;
     e.text = s;
     var a = l.fixEolChars(o.value);
     e.moveStart("character", -s.length), e.text = n, i.start = a.indexOf(r), i.end = a.lastIndexOf(r) - r.length;
     var c = i.text.length - l.fixEolChars(o.value).length;
     if (c) {
      for (e.moveStart("character", -n.length); c--; ) n += "\n", i.end += 1;
      e.text = n;
     }
     t.ieCachedRange && (i.scrollTop = t.ieCachedScrollTop), t.ieCachedRange = null, 
     this.setInputAreaSelection();
    }
   } else i.start = o.selectionStart, i.end = o.selectionEnd;
  }, this.restore = function() {
   void 0 != i.text && i.text != o.value && (o.value = i.text), this.setInputAreaSelection(), 
   o.scrollTop = i.scrollTop;
  }, this.getChunks = function() {
   var t = new e();
   return t.before = l.fixEolChars(i.text.substring(0, i.start)), t.startTag = "", 
   t.selection = l.fixEolChars(i.text.substring(i.start, i.end)), t.endTag = "", t.after = l.fixEolChars(i.text.substring(i.end)), 
   t.scrollTop = i.scrollTop, t;
  }, this.setChunks = function(e) {
   e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, 
   this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, 
   this.scrollTop = e.scrollTop;
  }, this.init();
 }
 function o(e, t, n, i) {
  var o, r, s, a = 3e3, u = "delayed", p = function(e, t) {
   l.addEvent(e, "input", t), e.onpaste = t, e.ondrop = t, l.addEvent(e, "keypress", t), 
   l.addEvent(e, "keydown", t);
  }, f = function() {
   var e = 0;
   return window.innerHeight ? e = window.pageYOffset : d.documentElement && d.documentElement.scrollTop ? e = d.documentElement.scrollTop : d.body && (e = d.body.scrollTop), 
   e;
  }, h = function() {
   if (t.preview) {
    var n = t.input.value;
    if (!n || n != s) {
     s = n;
     var i = new Date().getTime();
     n = e.makeHtml(n);
     var o = new Date().getTime();
     r = o - i, S(n);
    }
   }
  };
  void 0 !== i && (h = i(h));
  var m = function() {
   if (o && (clearTimeout(o), o = void 0), "manual" !== u) {
    var e = 0;
    "delayed" === u && (e = r), e > a && (e = a), o = setTimeout(h, e);
   }
  }, v = function(e) {
   return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight);
  }, b = function() {
   t.preview && (t.preview.scrollTop = (t.preview.scrollHeight - t.preview.clientHeight) * v(t.preview));
  };
  this.refresh = function(e) {
   e ? (s = "", h()) : m();
  }, this.processingTime = function() {
   return r;
  };
  var y, w = !0, x = function(e) {
   var n = t.preview, i = n.parentNode, o = n.nextSibling;
   i.removeChild(n), n.innerHTML = e, o ? i.insertBefore(n, o) : i.appendChild(n);
  }, k = function(e) {
   t.preview.innerHTML = e;
  }, C = function(e) {
   if (y) return y(e);
   try {
    k(e), y = k;
   } catch (t) {
    y = x, y(e);
   }
  }, S = function(e) {
   var i = c.getTop(t.input) - f();
   if (t.preview && (C(e), n()), b(), w) return w = !1, void 0;
   var o = c.getTop(t.input) - f();
   g.isIE ? setTimeout(function() {
    window.scrollBy(0, o - i);
   }, 0) : window.scrollBy(0, o - i);
  }, T = function() {
   p(t.input, m), t.preview && (t.preview.scrollTop = 0);
  };
  T();
 }
 function r(e, t, n, o, r, s, a) {
  function c(e) {
   v.focus();
   var r = "wmd-link-button" == e.id || "wmd-image-button" == e.id;
   if (e.textOp) {
    n && !r && n.setCommandMode();
    var s = new i(t);
    if (!s) return;
    var a = s.getChunks(), l = function() {
     v.focus(), a && s.setChunks(a), s.restore(), o.refresh();
    }, c = e.textOp(a, l);
    c || (l(), r || v.dispatchEvent(new Event("input")));
   }
   e.execute && e.execute(n);
  }
  function u(e, n) {
   var i = "0px", o = "-20px", r = "-40px", s = e.getElementsByTagName("span")[0];
   n ? (s.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = function() {
    s.style.backgroundPosition = this.XShift + " " + r;
   }, e.onmouseout = function() {
    s.style.backgroundPosition = this.XShift + " " + i;
   }, g.isIE && (e.onmousedown = function() {
    d.activeElement && d.activeElement !== t.input || (t.ieCachedRange = document.selection.createRange(), 
    t.ieCachedScrollTop = t.input.scrollTop);
   }), e.isHelp || (e.onclick = function() {
    return this.onmouseout && this.onmouseout(), c(this), !1;
   }), e.className = e.className.replace(/ disabled/g, "")) : (s.style.backgroundPosition = e.XShift + " " + o, 
   e.onmouseover = e.onmouseout = e.onclick = function() {}, e.className += " disabled");
  }
  function p(e) {
   return "string" == typeof e && (e = r[e]), function() {
    e.apply(r, arguments);
   };
  }
  function h() {
   var n = t.buttonBar, i = document.createElement("ul");
   i.id = "wmd-button-row" + e, i.className = "wmd-button-row", i = n.appendChild(i);
   var o = 0, r = function(t, n, r, s) {
    var a = document.createElement("li");
    a.className = "wmd-button", a.style.left = o + "px", o += 25;
    var l = document.createElement("span");
    return a.id = t + e, a.appendChild(l), a.title = n, a.XShift = r, s && (a.textOp = s), 
    u(a, !0), i.appendChild(a), a;
   }, l = function(t) {
    var n = document.createElement("li");
    n.className = "wmd-spacer wmd-spacer" + t, n.id = "wmd-spacer" + t + e, i.appendChild(n), 
    o += 25;
   };
   b.bold = r("wmd-bold-button", a("bold"), "0px", p("doBold")), b.italic = r("wmd-italic-button", a("italic"), "-20px", p("doItalic")), 
   l(1), b.link = r("wmd-link-button", a("link"), "-40px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !1);
   })), b.quote = r("wmd-quote-button", a("quote"), "-60px", p("doBlockquote")), b.code = r("wmd-code-button", a("code"), "-80px", p("doCode")), 
   b.image = r("wmd-image-button", a("image"), "-100px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !0);
   })), l(2), b.olist = r("wmd-olist-button", a("olist"), "-120px", p(function(e, t) {
    this.doList(e, t, !0);
   })), b.ulist = r("wmd-ulist-button", a("ulist"), "-140px", p(function(e, t) {
    this.doList(e, t, !1);
   })), b.heading = r("wmd-heading-button", a("heading"), "-160px", p("doHeading")), 
   b.hr = r("wmd-hr-button", a("hr"), "-180px", p("doHorizontalRule")), l(3), b.undo = r("wmd-undo-button", a("undo"), "-200px", null), 
   b.undo.execute = function(e) {
    e && e.undo();
   };
   var c = /win/.test(f.platform.toLowerCase()) ? a("redo") : a("redomac");
   if (b.redo = r("wmd-redo-button", c, "-220px", null), b.redo.execute = function(e) {
    e && e.redo();
   }, s) {
    var d = document.createElement("li"), h = document.createElement("span");
    d.appendChild(h), d.className = "wmd-button wmd-help-button", d.id = "wmd-help-button" + e, 
    d.XShift = "-240px", d.isHelp = !0, d.style.right = "0px", d.title = a("help"), 
    d.onclick = s.handler, u(d, !0), i.appendChild(d), b.help = d;
   }
   m();
  }
  function m() {
   n && (u(b.undo, n.canUndo()), u(b.redo, n.canRedo()));
  }
  var v = t.input, b = {};
  h();
  var y = "keydown";
  g.isOpera && (y = "keypress"), l.addEvent(v, y, function(e) {
   if ((e.ctrlKey || e.metaKey) && !e.altKey) {
    var t = e.charCode || e.keyCode, i = String.fromCharCode(t).toLowerCase();
    switch (i) {
    case "b":
     c(b.bold);
     break;

    case "i":
     c(b.italic);
     break;

    case "l":
     c(b.link);
     break;

    case "q":
     c(b.quote);
     break;

    case "k":
     c(b.code);
     break;

    case "g":
     c(b.image);
     break;

    case "o":
     c(b.olist);
     break;

    case "u":
     c(b.ulist);
     break;

    case "h":
     c(b.heading);
     break;

    case "r":
     c(b.hr);
     break;

    case "y":
     c(b.redo);
     break;

    case "z":
     e.shiftKey ? c(b.redo) : c(b.undo);
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
  }), l.addEvent(v, "keyup", function(e) {
   if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
    var t = e.charCode || e.keyCode;
    if (13 === t) {
     var n = {};
     n.textOp = p("doAutoindent"), c(n);
    }
   }
  }), g.isIE && l.addEvent(v, "keydown", function(e) {
   var t = e.keyCode;
   return 27 === t ? !1 : void 0;
  }), this.setUndoRedoButtonStates = m, this.buttons = b, this.setButtonState = u;
 }
 function s(e, t) {
  this.hooks = e, this.getString = t;
 }
 function a(e) {
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
 }, v = "http://", b = "http://";
 Markdown.Editor = function(e, i, a) {
  a = a || {}, "function" == typeof a.handler && (a = {
   helpButton: a
  }), a.strings = a.strings || {}, a.helpButton && (a.strings.help = a.strings.help || a.helpButton.title);
  var l = function(e) {
   return a.strings[e] || m[e];
  };
  i = i || "";
  var c = this.hooks = new Markdown.HookCollection();
  c.addNoop("onPreviewRefresh"), c.addNoop("postBlockquoteCreation"), c.addFalse("insertImageDialog"), 
  c.addFalse("insertLinkDialog"), this.getConverter = function() {
   return e;
  };
  var u, p, f = this;
  this.run = function(h) {
   if (!u) {
    u = new t(i);
    var g, m = new s(c, l), v = new o(e, u, function() {
     c.onPreviewRefresh();
    }, h);
    /\?noundo/.test(d.location.href) || (p = new n(function() {
     v.refresh(), g && g.setUndoRedoButtonStates();
    }, u), this.textOperation = function(e) {
     p.setCommandMode(), e(), f.refreshPreview();
    }), g = new r(i, u, p, v, m, a.helpButton, l), g.setUndoRedoButtonStates(), f.refreshPreview = function() {
     v.refresh(!0);
    }, f.undoManager = p, f.uiManager = g;
   }
  };
 }, e.prototype.findTags = function(e, t) {
  var n, i = this;
  e && (n = l.extendRegExp(e, "", "$"), this.before = this.before.replace(n, function(e) {
   return i.startTag = i.startTag + e, "";
  }), n = l.extendRegExp(e, "^", ""), this.selection = this.selection.replace(n, function(e) {
   return i.startTag = i.startTag + e, "";
  })), t && (n = l.extendRegExp(t, "", "$"), this.selection = this.selection.replace(n, function(e) {
   return i.endTag = e + i.endTag, "";
  }), n = l.extendRegExp(t, "^", ""), this.after = this.after.replace(n, function(e) {
   return i.endTag = e + i.endTag, "";
  }));
 }, e.prototype.trimWhitespace = function(e) {
  var t, n, i = this;
  e ? t = n = "" : (t = function(e) {
   return i.before += e, "";
  }, n = function(e) {
   return i.after = e + i.after, "";
  }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n);
 }, e.prototype.skipLines = function(e, t, n) {
  void 0 === e && (e = 1), void 0 === t && (t = 1), e++, t++;
  var i, o;
  if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), 
  this.startTag = this.startTag + p.$1, this.selection = this.selection.replace(/(\n*$)/, ""), 
  this.endTag = this.endTag + p.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), 
  this.before = this.before + p.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), 
  this.after = this.after + p.$1, this.before) {
   for (i = o = ""; e--; ) i += "\\n?", o += "\n";
   n && (i = "\\n*"), this.before = this.before.replace(new p(i + "$", ""), o);
  }
  if (this.after) {
   for (i = o = ""; t--; ) i += "\\n?", o += "\n";
   n && (i = "\\n*"), this.after = this.after.replace(new p(i, ""), o);
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
  var i, o = e.toString();
  return o = o.replace(/\/([gim]*)$/, function(e, t) {
   return i = t, "";
  }), o = o.replace(/(^\/|\/$)/g, ""), o = t + o + n, new p(o, i);
 }, c.getTop = function(e, t) {
  var n = e.offsetTop;
  if (!t) for (;e = e.offsetParent; ) n += e.offsetTop;
  return n;
 }, c.getHeight = function(e) {
  return e.offsetHeight || e.scrollHeight;
 }, c.getWidth = function(e) {
  return e.offsetWidth || e.scrollWidth;
 }, c.getPageSize = function() {
  var e, t, n, i;
  self.innerHeight && self.scrollMaxY ? (e = d.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : d.body.scrollHeight > d.body.offsetHeight ? (e = d.body.scrollWidth, 
  t = d.body.scrollHeight) : (e = d.body.offsetWidth, t = d.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, 
  i = self.innerHeight) : d.documentElement && d.documentElement.clientHeight ? (n = d.documentElement.clientWidth, 
  i = d.documentElement.clientHeight) : d.body && (n = d.body.clientWidth, i = d.body.clientHeight);
  var o = Math.max(e, n), r = Math.max(t, i);
  return [ o, r, n, i ];
 }, u.createBackground = function() {
  var e = d.createElement("div"), t = e.style;
  e.className = "wmd-prompt-background", t.position = "absolute", t.top = "0", t.zIndex = "1000", 
  g.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
  var n = c.getPageSize();
  return t.height = n[1] + "px", g.isIE ? (t.left = d.documentElement.scrollLeft, 
  t.width = d.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), d.body.appendChild(e), 
  e;
 }, u.prompt = function(e, t, n) {
  var i, o;
  void 0 === t && (t = "");
  var r = function(e) {
   var t = e.charCode || e.keyCode;
   27 === t && s(!0);
  }, s = function(e) {
   l.removeEvent(d.body, "keydown", r);
   var t = o.value;
   return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), 
   i.parentNode.removeChild(i), n(t), !1;
  }, a = function() {
   i = d.createElement("div"), i.className = "wmd-prompt-dialog", i.style.padding = "10px;", 
   i.style.position = "fixed", i.style.width = "400px", i.style.zIndex = "1001";
   var n = d.createElement("div");
   n.innerHTML = e, n.style.padding = "5px", i.appendChild(n);
   var a = d.createElement("form"), u = a.style;
   a.onsubmit = function() {
    return s(!1);
   }, u.padding = "0", u.margin = "0", u.cssFloat = "left", u.width = "100%", u.textAlign = "center", 
   u.position = "relative", i.appendChild(a), o = d.createElement("input"), o.type = "text", 
   o.value = t, u = o.style, u.display = "block", u.width = "80%", u.marginLeft = u.marginRight = "auto", 
   a.appendChild(o);
   var p = d.createElement("input");
   p.type = "button", p.onclick = function() {
    return s(!1);
   }, p.value = "OK", u = p.style, u.margin = "10px", u.display = "inline", u.width = "7em";
   var f = d.createElement("input");
   f.type = "button", f.onclick = function() {
    return s(!0);
   }, f.value = "Cancel", u = f.style, u.margin = "10px", u.display = "inline", u.width = "7em", 
   a.appendChild(p), a.appendChild(f), l.addEvent(d.body, "keydown", r), i.style.top = "50%", 
   i.style.left = "50%", i.style.display = "block", g.isIE_5or6 && (i.style.position = "absolute", 
   i.style.top = d.documentElement.scrollTop + 200 + "px", i.style.left = "50%"), d.body.appendChild(i), 
   i.style.marginTop = -(c.getHeight(i) / 2) + "px", i.style.marginLeft = -(c.getWidth(i) / 2) + "px";
  };
  setTimeout(function() {
   a();
   var e = t.length;
   if (void 0 !== o.selectionStart) o.selectionStart = 0, o.selectionEnd = e; else if (o.createTextRange) {
    var n = o.createTextRange();
    n.collapse(!1), n.moveStart("character", -e), n.moveEnd("character", e), n.select();
   }
   o.focus();
  }, 0);
 };
 var y = s.prototype;
 y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", 
 y.unwrap = function(e) {
  var t = new p("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
  e.selection = e.selection.replace(t, "$1 $2");
 }, y.wrap = function(e, t) {
  this.unwrap(e);
  var n = new p("(.{1," + t + "})( +|$\\n?)", "gm"), i = this;
  e.selection = e.selection.replace(n, function(e, t) {
   return new p("^" + i.prefixes, "").test(e) ? e : t + "\n";
  }), e.selection = e.selection.replace(/\s+$/, "");
 }, y.doBold = function(e, t) {
  return this.doBorI(e, t, 2, this.getString("boldexample"));
 }, y.doItalic = function(e, t) {
  return this.doBorI(e, t, 1, this.getString("italicexample"));
 }, y.doBorI = function(e, t, n, i) {
  e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
  var o = /(\**$)/.exec(e.before)[0], r = /(^\**)/.exec(e.after)[0], s = Math.min(o.length, r.length);
  if (s >= n && (2 != s || 1 != n)) e.before = e.before.replace(p("[*]{" + n + "}$", ""), ""), 
  e.after = e.after.replace(p("^[*]{" + n + "}", ""), ""); else if (!e.selection && r) {
   e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
   var a = p.$1;
   e.before = e.before + r + a;
  } else {
   e.selection || r || (e.selection = i);
   var l = 1 >= n ? "*" : "**";
   e.before = e.before + l, e.after = l + e.after;
  }
 }, y.stripLinkDefs = function(e, t) {
  return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, n, i, o, r) {
   return t[n] = e.replace(/\s*$/, ""), o ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), 
   o + r) : "";
  });
 }, y.addLinkDef = function(e, t) {
  var n = 0, i = {};
  e.before = this.stripLinkDefs(e.before, i), e.selection = this.stripLinkDefs(e.selection, i), 
  e.after = this.stripLinkDefs(e.after, i);
  var o = "", r = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, s = function(e) {
   n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), o += "\n" + e;
  }, a = function(e, t, o, l, c, u) {
   return o = o.replace(r, a), i[c] ? (s(i[c]), t + o + l + n + u) : e;
  };
  e.before = e.before.replace(r, a), t ? s(t) : e.selection = e.selection.replace(r, a);
  var l = n;
  return e.after = e.after.replace(r, a), e.after && (e.after = e.after.replace(/\n*$/, "")), 
  e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + o, 
  l;
 }, y.doLinkOrImage = function(e, t, n) {
  e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
  var i;
  if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
   if (e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "", 
   /\n\n/.test(e.selection)) return this.addLinkDef(e, null), void 0;
   var o = this, r = function(r) {
    if (i.parentNode.removeChild(i), null !== r) {
     e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
     var s = " [999]: " + a(r), l = o.addLinkDef(e, s);
     e.startTag = n ? "![" : "[", e.endTag = "][" + l + "]", e.selection || (e.selection = n ? o.getString("imagedescription") : o.getString("linkdescription"));
    }
    t();
   };
   return i = u.createBackground(), n ? this.hooks.insertImageDialog(r) || u.prompt(this.getString("imagedialog"), v, r) : this.hooks.insertLinkDialog(r) || u.prompt(this.getString("linkdialog"), b, r), 
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
  e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(t, n, i, o) {
   return e.before += n, e.after = o + e.after, i;
  }), e.before = e.before.replace(/(>[ \t]*)$/, function(t, n) {
   return e.selection = n + e.selection, "";
  }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
  var t, n = "", i = "";
  if (e.before) {
   for (var o = e.before.replace(/\n$/, "").split("\n"), r = !1, s = 0; s < o.length; s++) {
    var a = !1;
    t = o[s], r = r && t.length > 0, /^>/.test(t) ? (a = !0, !r && t.length > 1 && (r = !0)) : a = /^[ \t]*$/.test(t) ? !0 : r, 
    a ? n += t + "\n" : (i += n + t, n = "\n");
   }
   /(^|\n)>/.test(n) || (i += n, n = "");
  }
  e.startTag = n, e.before = i, e.after && (e.after = e.after.replace(/^\n?/, "\n")), 
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
   var i = 1, o = 1;
   /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (i = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (o = 0), 
   e.skipLines(i, o), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", 
   e.selection = this.getString("codeexample"));
  } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, 
  e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")));
 }, y.doList = function(e, t, n) {
  var i = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, o = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, r = "-", s = 1, a = function() {
   var e;
   return n ? (e = " " + s + ". ", s++) : e = " " + r + " ", e;
  }, l = function(e) {
   return void 0 === n && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
    return a();
   });
  };
  if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, 
  e.startTag = ""), e.startTag) {
   var c = /\d+[.]/.test(e.startTag);
   if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), 
   e.skipLines(), c && (e.after = e.after.replace(o, l)), n == c) return;
  }
  var u = 1;
  e.before = e.before.replace(i, function(e) {
   return /^\s*([*+-])/.test(e) && (r = p.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, 
   l(e);
  }), e.selection || (e.selection = this.getString("litem"));
  var d = a(), f = 1;
  e.after = e.after.replace(o, function(e) {
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
   var i = n >= 2 ? "-" : "=", o = e.selection.length;
   for (o > h.lineLength && (o = h.lineLength), e.endTag = "\n"; o--; ) e.endTag += i;
  }
 }, y.doHorizontalRule = function(e) {
  e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0);
 };
}(), define("libs/Markdown.Editor", function() {}), define("core", [ "jquery", "underscore", "crel", "utils", "settings", "eventMgr", "mousetrap", "text!html/bodyIndex.html", "text!html/bodyViewer.html", "text!html/settingsTemplateTooltip.html", "text!html/settingsUserCustomExtensionTooltip.html", "storage", "config", "libs/layout", "libs/Markdown.Editor" ], function(e, t, n, i, o, r, s, a, l, c, u) {
 function d() {
  C = !0, S = !0;
  var e = i.currentTime;
  e > E + 1e3 && (E = e, r.onUserActive());
 }
 function p() {
  return S === !0 && i.currentTime - E > USER_IDLE_THRESHOLD && (S = !1), S && T;
 }
 function f() {
  if (C !== !1 && T !== !1) {
   void 0 === _ && (_ = i.randomString(), localStorage.frontWindowId = _);
   var t = localStorage.frontWindowId;
   t != _ && (T = !1, void 0 !== k && clearInterval(k), e(".modal").modal("hide"), 
   e(".modal-non-unique").modal({
    backdrop: "static",
    keyboard: !1
   }));
  }
 }
 function h() {
  I === !0 && (I = !1, r.onOfflineChanged(!1));
 }
 function g() {
  I === !0 && navigator.onLine === !0 && P + CHECK_ONLINE_PERIOD < i.currentTime && (P = i.currentTime, 
  e.ajax({
   url: "//www.google.com/jsapi",
   timeout: AJAX_TIMEOUT,
   dataType: "script"
  }).done(function() {
   h();
  }));
 }
 function m() {
  i.setInputRadio("radio-layout-orientation", o.layoutOrientation), i.setInputValue($, theme), 
  $.change(), i.setInputChecked("#input-settings-lazy-rendering", o.lazyRendering), 
  i.setInputValue("#input-settings-editor-font-family", o.editorFontFamily), i.setInputValue("#input-settings-editor-font-size", o.editorFontSize), 
  i.setInputValue("#textarea-settings-default-content", o.defaultContent), i.setInputValue("#input-settings-publish-commit-msg", o.commitMsg), 
  i.setInputValue("#textarea-settings-publish-template", o.template), i.setInputValue("#input-settings-ssh-proxy", o.sshProxy), 
  r.onLoadSettings();
 }
 function v(t) {
  var n = {};
  n.layoutOrientation = i.getInputRadio("radio-layout-orientation");
  var s = i.getInputValue($);
  n.lazyRendering = i.getInputChecked("#input-settings-lazy-rendering"), n.editorFontFamily = i.getInputTextValue("#input-settings-editor-font-family", t), 
  n.editorFontSize = i.getInputIntValue("#input-settings-editor-font-size", t, 1, 99), 
  n.defaultContent = i.getInputValue("#textarea-settings-default-content"), n.commitMsg = i.getInputTextValue("#input-settings-publish-commit-msg", t), 
  n.template = i.getInputTextValue("#textarea-settings-publish-template", t), n.sshProxy = i.checkUrl(i.getInputTextValue("#input-settings-ssh-proxy", t), !0), 
  n.extensionSettings = {}, r.onSaveSettings(n.extensionSettings, t), t.isPropagationStopped() || (e.extend(o, n), 
  localStorage.settings = JSON.stringify(o), localStorage.theme = s);
 }
 function b(e) {
  e === !0 || N.state.north.isClosed ? (L.hide(), R.hide()) : (L.show(), R.show());
 }
 function y(e) {
  e === !0 || N.state.east.isClosed ? M.hide() : M.show();
 }
 function w() {
  var t = {
   closable: !0,
   resizable: !1,
   slidable: !1,
   livePaneResizing: !0,
   enableCursorHotkey: !1,
   resizerDblClickToggle: !1,
   north__spacing_open: 6,
   north__spacing_closed: 6,
   spacing_open: 35,
   spacing_closed: 35,
   togglerLength_open: 60,
   togglerLength_closed: 60,
   stateManagement__enabled: !1,
   center__minWidth: 200,
   center__minHeight: 200,
   onopen: function() {
    b(), y();
   },
   onclose_start: function(e) {
    "north" == e ? b(!0) : "east" == e && y(!0);
   }
  };
  r.onLayoutConfigure(t), "horizontal" == o.layoutOrientation ? (e(".ui-layout-south").remove(), 
  e(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
  N = e("body").layout(e.extend(t, {
   east__resizable: !0,
   east__size: .5,
   east__minSize: 250
  }))) : "vertical" == o.layoutOrientation && (e(".ui-layout-east").remove(), e(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
  N = e("body").layout(e.extend(t, {
   south__resizable: !0,
   south__size: .5,
   south__minSize: 200
  }))), e(".navbar").click(function() {
   N.allowOverflow("north");
  }), e(".ui-layout-toggler-south").addClass("btn btn-info").html('<i class="icon-none"></i>'), 
  e(".ui-layout-toggler-east").addClass("btn btn-info").html('<i class="icon-none"></i>');
  var n = e(".ui-layout-toggler-north").addClass("btn btn-info").html('<i class="icon-none"></i>');
  M = e('<div class="extension-preview-buttons">'), "horizontal" == o.layoutOrientation ? (e(".ui-layout-resizer-north").append(M), 
  e(".ui-layout-resizer-east").append(n)) : e(".ui-layout-resizer-south").append(M).append(n), 
  b(), y(), r.onLayoutCreated(N);
 }
 var x = {}, k = void 0, C = !1, S = !1, T = !0, E = 0, _ = void 0, I = !1, P = i.currentTime;
 x.setOffline = function() {
  P = i.currentTime, I === !1 && (I = !0, r.onOfflineChanged(!0));
 };
 var $ = void 0, N = void 0, L = void 0, R = void 0, M = void 0, A = void 0, z = void 0, D = void 0, O = void 0;
 x.initEditor = function(n) {
  function s() {
   var e = O.val();
   void 0 !== D && D != e && (z.content = e, r.onContentChanged(z)), D = e;
  }
  void 0 !== z && r.onFileClosed(z), z = n, D = void 0;
  var a = z.content;
  if (O.val(a), void 0 !== A) return A.undoManager.reinit(a, z.editorStart, z.editorEnd, z.editorScrollTop), 
  r.onFileOpen(z), A.refreshPreview(), void 0;
  var l = e(".preview-container");
  O.scroll(function() {
   void 0 !== D && (z.editorScrollTop = e(this).scrollTop());
  }), O.bind("keyup mouseup", function() {
   void 0 !== D && (z.editorStart = this.selectionStart, z.editorEnd = this.selectionEnd);
  }), l.scroll(function() {
   void 0 !== D && (z.previewScrollTop = e(this).scrollTop());
  });
  var c = new Markdown.Converter();
  c.hooks.chain("preConversion", function(e) {
   r.previewStartTime = new Date();
   var t = e + "\n\n", n = [], i = 0;
   return t.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(e, o, r) {
    return o && (n.push(t.substring(i, r)), i = r), "";
   }), n.push(t.substring(i, e.length)), r.onSectionsCreated(n), e;
  }), A = new Markdown.Editor(c), A.hooks.set("insertLinkDialog", function(t) {
   return x.insertLinkCallback = t, i.resetModalInputs(), e(".modal-insert-link").modal(), 
   !0;
  }), A.hooks.set("insertImageDialog", function(t) {
   return x.insertLinkCallback = t, x.catchModal ? !0 : (i.resetModalInputs(), e(".modal-insert-image").modal(), 
   !0);
  });
  var u;
  u = o.lazyRendering === !0 ? function(e) {
   var n = t.debounce(e, 500);
   return function() {
    void 0 === D ? (e(), O.scrollTop(z.editorScrollTop), l.scrollTop(z.previewScrollTop)) : n(), 
    s();
   };
  } : function(e) {
   return function() {
    e(), void 0 === D && l.scrollTop(z.previewScrollTop), s();
   };
  }, r.onEditorConfigure(A), A.hooks.chain("onPreviewRefresh", r.onAsyncPreview), 
  A.run(u), A.undoManager.reinit(a, z.editorStart, z.editorEnd, z.editorScrollTop), 
  e(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();
  var d = e(".wmd-button-group1");
  e("#wmd-bold-button").append(e('<i class="icon-bold">')).appendTo(d), e("#wmd-italic-button").append(e('<i class="icon-italic">')).appendTo(d);
  var d = e(".wmd-button-group2");
  e("#wmd-link-button").append(e('<i class="icon-globe">')).appendTo(d), e("#wmd-quote-button").append(e('<i class="icon-indent-right">')).appendTo(d), 
  e("#wmd-code-button").append(e('<i class="icon-code">')).appendTo(d), e("#wmd-image-button").append(e('<i class="icon-picture">')).appendTo(d);
  var d = e(".wmd-button-group3");
  e("#wmd-olist-button").append(e('<i class="icon-list-numbered">')).appendTo(d), 
  e("#wmd-ulist-button").append(e('<i class="icon-list-bullet">')).appendTo(d), e("#wmd-heading-button").append(e('<i class="icon-text-height">')).appendTo(d), 
  e("#wmd-hr-button").append(e('<i class="icon-ellipsis">')).appendTo(d);
  var d = e(".wmd-button-group4");
  e("#wmd-undo-button").append(e('<i class="icon-reply">')).appendTo(d), e("#wmd-redo-button").append(e('<i class="icon-forward">')).appendTo(d), 
  r.onFileOpen(z);
 };
 var j = !1;
 x.lockUI = function(t) {
  j = t, O.prop("disabled", j), e(".navbar-inner .btn").toggleClass("blocked", j), 
  j ? e(".lock-ui").removeClass("hide") : e(".lock-ui").addClass("hide");
 };
 var H = !1, F = !1;
 return x.onReady = function() {
  document.body.innerHTML = viewerMode === !0 ? l : a, e(window).on("offline", x.setOffline), 
  e(window).on("online", h), navigator.onLine === !1 && x.setOffline(), e(document).mousemove(d).keypress(d), 
  e(".dropdown-submenu > a").click(function(e) {
   e.stopPropagation();
  }), L = e(".menu-panel").collapse({
   toggle: !1
  });
  var t = void 0;
  L.on("show.bs.collapse", function(e) {
   e.target === L[0] ? (F = !0, t = i.createBackdrop("collapse", ".menu-panel"), L.addClass("move-to-front")) : L.find(".in").collapse("hide");
  }).on("hide.bs.collapse", function(e) {
   e.target === L[0] && (F = !1, t.parentNode.removeChild(t), L.removeClass("move-to-front"));
  }).on("hidden.bs.collapse", function(e) {
   e.target === L[0] && L.find(".in").collapse("hide");
  }), R = e(".document-panel").collapse({
   toggle: !1
  });
  var n = void 0;
  R.on("show.bs.collapse", function(e) {
   e.target === R[0] ? (H = !0, n = i.createBackdrop("collapse", ".document-panel"), 
   R.addClass("move-to-front")) : R.find(".in").collapse("hide");
  }).on("hide.bs.collapse", function(e) {
   e.target === R[0] && (H = !1, n.parentNode.removeChild(n), R.removeClass("move-to-front"));
  }).on("hidden.bs.collapse", function(e) {
   e.target === R[0] && R.find(".in").collapse("hide");
  }), w(), O = e("#wmd-input"), e("#wmd-input, #md-section-helper").css({
   "font-family": o.editorFontFamily,
   "font-size": o.editorFontSize + "px",
   "line-height": Math.round(o.editorFontSize * (20 / 14)) + "px"
  }), O.keydown(function(t) {
   if (9 === t.keyCode) {
    var n = O.val(), i = this.selectionStart, o = this.selectionEnd;
    e(this).val(n.substring(0, i) + "	" + n.substring(o)), this.selectionStart = this.selectionEnd = i + 1, 
    t.preventDefault();
   }
  }), k = window.setInterval(function() {
   i.updateCurrentTime(), f(), (p() === !0 || viewerMode === !0) && (r.onPeriodicRun(), 
   g());
  }, 1e3), r.onReady();
 }, r.addListener("onReady", function() {
  function n(e) {
   if (e = e || "default", l != e) {
    var t = "less!themes/" + e;
    "js-min" == baseDir && (t = "css!themes/" + e), requirejs.undef(t), require([ t ]), 
    l = e;
   }
  }
  var a = !1;
  e(".modal").on("show.bs.modal", function() {
   L.collapse("hide"), R.collapse("hide"), a = !0;
  }).on("shown.bs.modal", function() {
   t.defer(function(e) {
    e.find("input:enabled:visible:first").focus();
   }, e(this));
  }).on("hidden.bs.modal", function() {
   a = !1, O.focus();
  }).keyup(function(t) {
   13 != t.which || e(t.target).is("textarea") || e(this).find(".modal-footer a:last").click();
  }), s.stopCallback = function(t, n) {
   return j || F || H || a || e(n).is("input, select, textarea:not(#wmd-input)");
  }, e(".action-insert-link").click(function(t) {
   var n = i.getInputTextValue(e("#input-insert-link"), t);
   void 0 !== n && (x.insertLinkCallback(n), x.insertLinkCallback = void 0);
  }), e(".action-insert-image").click(function(t) {
   var n = i.getInputTextValue(e("#input-insert-image"), t);
   void 0 !== n && (x.insertLinkCallback(n), x.insertLinkCallback = void 0);
  }), e(".modal-insert-link, .modal-insert-image").on("hidden.bs.modal", function() {
   void 0 !== x.insertLinkCallback && (x.insertLinkCallback(null), x.insertLinkCallback = void 0);
  }), e(".action-load-settings").click(function() {
   m();
  }), e(".action-apply-settings").click(function(e) {
   v(e), e.isPropagationStopped() || window.location.reload();
  });
  var l = theme;
  if ($ = e("#input-settings-theme"), $.on("change", function() {
   n(this.value);
  }), e(".action-apply-theme").click("change", function() {
   n(localStorage.theme);
  }), e(".action-import-settings").click(function() {
   e("#input-file-import-settings").click();
  }), e("#input-file-import-settings").change(function(n) {
   var i = (n.dataTransfer || n.target).files;
   e(".modal-settings").modal("hide"), t.each(i, function(e) {
    var t = new FileReader();
    t.onload = function(e) {
     return function(t) {
      var n = t.target.result;
      try {
       JSON.parse(n);
      } catch (t) {
       return r.onError(e.name + " is not a valid JSON file."), void 0;
      }
      localStorage.settings = n, window.location.reload();
     };
    }(e);
    var n = e.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
    t.readAsText(n);
   });
  }), e(".action-export-settings").click(function() {
   i.saveAs(JSON.stringify(o), "StackEdit Settings.json");
  }), e(".action-default-settings").click(function() {
   localStorage.removeItem("settings"), localStorage.removeItem("theme"), window.location.reload();
  }), e(".action-app-reset").click(function() {
   localStorage.clear(), window.location.reload();
  }), e(".action-reset-input").click(function() {
   i.resetModalInputs();
  }), e(".tooltip-lazy-rendering").tooltip({
   container: ".modal-settings",
   placement: "right",
   trigger: "hover",
   title: "Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity."
  }), e(".tooltip-default-content").tooltip({
   html: !0,
   container: ".modal-settings",
   placement: "right",
   trigger: "hover",
   title: "Thanks for supporting StackEdit by adding a backlink in your documents!"
  }), e(".tooltip-usercustom-extension").tooltip({
   html: !0,
   container: ".modal-settings",
   placement: "right",
   trigger: "manual",
   title: u
  }).click(function(t) {
   e(this).tooltip("show"), e(document).on("click.tooltip-usercustom-extension", function() {
    e(".tooltip-usercustom-extension").tooltip("hide"), e(document).off("click.tooltip-usercustom-extension");
   }), t.stopPropagation();
  }), t.each(document.querySelectorAll(".tooltip-template"), function(t) {
   var n = e(t);
   n.tooltip({
    html: !0,
    container: n.parents(".modal"),
    placement: "right",
    trigger: "manual",
    title: c
   }).click(function(t) {
    n.tooltip("show"), e(document).on("click.tooltip-template", function() {
     e(".tooltip-template").tooltip("hide"), e(document).off("click.tooltip-template");
    }), t.stopPropagation();
   });
  }), e("div.dropdown-menu").click(function(e) {
   e.stopPropagation();
  }), t.each(document.querySelectorAll("img"), function(t) {
   var n = e(t), i = n.data("stackeditSrc");
   i && n.attr("src", baseDir + "/img/" + i);
  }), viewerMode === !1) {
   var d = t.reduce(THEME_LIST, function(e, t, n) {
    return e + '<option value="' + n + '">' + t + "</option>";
   }, "");
   document.getElementById("input-settings-theme").innerHTML = d;
  }
 }), x;
}), define("text!../WELCOME.md", [], function() {
 return '\nWelcome to StackEdit!	{#welcome}\n=====================\n\n\nHello, I am your first Markdown document within **StackEdit**[^stackedit]. Don\'t delete me, I can be helpful. I can be recovered anyway in the `Utils` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n----------\n\n\nDocuments\n---------\n\n**StackEdit** stores your documents in the browser local storage, which means all your documents are automatically saved locally and are accessible offline.\n\n#### <i class="icon-file"></i> Create a document\n\nYou can create a new document by clicking the <i class="icon-file"></i> button in the navigation bar. This will switch from the current document to the new one.\n\n#### <i class="icon-folder-open"></i> Switch to another document\n\nYou can list all your local documents and switch from one to another by clicking the <i class="icon-folder-open"></i> button in the navigation bar.\n\n#### <i class="icon-pencil"></i> Rename a document\n\nYou can rename the current document by clicking the document title in the navigation bar.\n\n#### <i class="icon-trash"></i> Delete a document\n\nYou can delete the current document by clicking the <i class="icon-trash"></i> button in the navigation bar.\n\n----------\n\n\nSynchronization\n---------------\n\n**StackEdit** can be combined with **Google Drive** and **Dropbox** to have your documents centralized in the *Cloud*. The synchronization mechanism will take care of uploading your modifications or downloading the latest version of your documents.\n\n#### <i class="icon-download"></i> Import a document\n\nYou can import a document from the *Cloud* by going to the <i class="icon-provider-gdrive"></i> `Google Drive` or the <i class="icon-provider-dropbox"></i> `Dropbox` sub-menu and by clicking `Import from...`. Once imported, your document will be automatically synchronized with the **Google Drive** / **Dropbox** file.\n\n#### <i class="icon-upload"></i> Export a document\n\nYou can export any document by going to the <i class="icon-provider-gdrive"></i> `Google Drive` or the <i class="icon-provider-dropbox"></i> `Dropbox` sub-menu and by clicking `Export to...`. Even if your document is already synchronized with **Google Drive** or **Dropbox**, you can export it to a another location. **StackEdit** can synchronize one document with multiple locations.\n\n#### <i class="icon-refresh"></i> Synchronize a document\n\nOnce your document is linked to a **Google Drive** or a **Dropbox** file, **StackEdit** will periodically (every 3 minutes) synchronize it by downloading/uploading any modification. Any conflict will be detected, and a local copy of your document will be created as a backup if necessary.\n\nIf you just have modified your document and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-refresh"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document is not synchronized with any location,\n> - or the document has not been modified since the last synchronization.\n\n#### <i class="icon-refresh"></i> Manage document synchronization\n\nSince one document can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-refresh"></i> `Manage synchronization` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to add or remove synchronization links that are associated to your document.\n\n> **NOTE:** If you delete the file from **Google Drive** or from **Dropbox**, the document will no longer be synchronized with that location.\n\n----------\n\n\nPublication\n-----------\n\nOnce you are happy with your document, you can publish it on different websites directly from **StackEdit**. As for now, **StackEdit** can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any SSH server.\n\n#### <i class="icon-share"></i> Publish a document\n\nYou can publish your document by going to the <i class="icon-share"></i> `Publish on` sub-menu and by choosing a website. In the dialog box, you can choose the publication format:\n\n- Markdown, to publish the Markdown text on a website that can interpret it (**GitHub** for instance),\n- HTML, to publish the document converted into HTML (on a blog for instance),\n- Template, to have a full control of the output.\n\n> **NOTE:** The default template is a simple webpage that wraps your document in HTML format. You can customize it in the `Publish` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n#### <i class="icon-share"></i> Update a publication\n\nAfter publishing, **StackEdit** will keep your document linked to that publish location so that you can update it easily. Once you have modified your document and you want to update your publication, click on the <i class="icon-share"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-share"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document has not been published anywhere.\n\n#### <i class="icon-share"></i> Manage document publication\n\nSince one document can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-share"></i> `Manage publication` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to remove publication links that are associated to your document.\n\n> **NOTE:** In some cases, if you remove the file from the website or the post from the blog, the document will no longer be published on that location.\n\n----------\n\n\nMarkdown Extra\n--------------\n\n**StackEdit** supports **Markdown Extra**, which extends **Markdown** syntax with some nice features.\n\n\n### Tables\n\n**Markdown Extra** has a special syntax for tables:\n\nItem      | Value\n--------- | -----\nComputer  | \\$1600\nPhone     | \\$12\nPipe      | \\$1\n\nYou can specify column alignment with one or two colons:\n\n| Item      |  Value | Qty  |\n| :-------- | ------:| :--: |\n| Computer  | \\$1600 |  5   |\n| Phone     |   \\$12 |  12  |\n| Pipe      |    \\$1 | 234  |\n\n\n### Definition Lists\n\n**Markdown Extra** has a special syntax for definition lists too:\n\nTerm 1\nTerm 2\n:   Definition A\n:   Definition B\n\nTerm 3\n\n:   Definition C\n\n:   Definition D\n\n	> part of definition D\n\n\n### Fenced code blocks\n\n**GitHub**\'s fenced code blocks are also supported with **Prettify** syntax highlighting:\n\n```\n// Foo\nvar bar = 0;\n```\n\n> **NOTE:** To use **Highlight.js** instead of **Prettify**, just configure the `Markdown Extra` extension in the <i class="icon-cog"></i> `Settings` dialog.\n\n\n### Special Attributes\n\nWith **Markdown Extra**, you can specify `class` and `id` attributes on headers and fenced code blocks just like this:\n\n##### Header example {#my-header}\n\n``` {#my-id .my-class}\nvar foo = bar;\n```\n\nThen you can create cross-references like this: [beginning of the document](#welcome).\n\n\n### Footnotes\n\nYou can create footnotes like this[^footnote].\n\n  [^footnote]: Here is the *text* of the **footnote**.\n\n\n### Table of contents\n\nYou can insert a table of contents using the marker `[TOC]`:\n\n[TOC]\n\n\n### MathJax\n \nYou can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com][1]:\n\nThe *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall\nn\\in\\mathbb N$ is via through the Euler integral\n\n$$\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\n$$\n\n\n> **NOTE:** You can find more information:\n>\n> - about **Markdown** syntax [here][2],\n> - about **Markdown Extra** extension [here][3],\n> - about **Prettify** syntax highlighting [here][4].\n> - about **Highlight.js** syntax highlighting [here][5].\n\n  [^stackedit]: StackEdit is a free, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.\n\n\n  [1]: http://math.stackexchange.com/\n  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"\n  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"\n  [4]: https://code.google.com/p/google-code-prettify/\n  [5]: http://softwaremaniacs.org/soft/highlight/en/';
}), define("fileMgr", [ "jquery", "underscore", "core", "utils", "settings", "eventMgr", "fileSystem", "classes/FileDescriptor", "text!../WELCOME.md" ], function(e, t, n, i, o, r, s, a, l) {
 var c = {};
 return c.currentFile = void 0, c.selectFile = function(i) {
  if (i = i || c.currentFile, void 0 === i) {
   var o = t.size(s);
   i = 0 === o ? c.createFile(WELCOME_DOCUMENT_TITLE, l) : t.max(s, function(e) {
    return e.selectTime || 0;
   });
  }
  c.currentFile !== i && (c.currentFile = i, i.selectTime = new Date().getTime(), 
  r.onFileSelected(i), e(".action-edit-document").toggleClass("hide", i.fileIndex != TEMPORARY_FILE_INDEX)), 
  n.initEditor(i);
 }, c.createFile = function(e, n, l, c) {
  if (n = void 0 !== n ? n : o.defaultContent, !e) {
   e = DEFAULT_FILE_TITLE;
   for (var u = 2; t.some(s, function(t) {
    return t.title == e;
   }); ) e = DEFAULT_FILE_TITLE + u++;
  }
  var d = TEMPORARY_FILE_INDEX;
  if (!c) do d = "file." + i.randomString(); while (t.has(s, d));
  l = l || {};
  var p = t.reduce(l, function(e, t) {
   return i.storeAttributes(t), e + t.syncIndex + ";";
  }, ";");
  localStorage[d + ".title"] = e, localStorage[d + ".content"] = n, localStorage[d + ".sync"] = p, 
  localStorage[d + ".publish"] = ";";
  var f = new a(d, e, l);
  return c || (i.appendIndexToArray("file.list", d), s[d] = f, r.onFileCreated(f)), 
  f;
 }, c.deleteFile = function(e) {
  e = e || c.currentFile, i.removeIndexFromArray("file.list", e.fileIndex), delete s[e.fileIndex], 
  c.currentFile === e && (c.currentFile = void 0, c.selectFile()), t.each(e.syncLocations, function(e) {
   localStorage.removeItem(e.syncIndex);
  }), t.each(e.publishLocations, function(e) {
   localStorage.removeItem(e.publishIndex);
  }), localStorage.removeItem(e.fileIndex + ".title"), localStorage.removeItem(e.fileIndex + ".content"), 
  localStorage.removeItem(e.fileIndex + ".sync"), localStorage.removeItem(e.fileIndex + ".publish"), 
  localStorage.removeItem(e.fileIndex + ".selectTime"), localStorage.removeItem(e.fileIndex + ".editorStart"), 
  localStorage.removeItem(e.fileIndex + ".editorEnd"), localStorage.removeItem(e.fileIndex + ".editorScrollTop"), 
  localStorage.removeItem(e.fileIndex + ".previewScrollTop"), r.onFileDeleted(e);
 }, c.getFileFromSyncIndex = function(e) {
  return t.find(s, function(n) {
   return t.has(n.syncLocations, e);
  });
 }, c.getSyncAttributes = function(e) {
  var t = c.getFileFromSyncIndex(e);
  return t && t.syncLocations[e];
 }, c.getFileFromPublishIndex = function(e) {
  return t.find(s, function(n) {
   return t.has(n.publishLocations, e);
  });
 }, r.addListener("onReady", function() {
  function n() {
   s.addClass("hide"), o.removeClass("hide");
   var t = e.trim(s.val()), n = c.currentFile;
   t && t != n.title && (n.title = t, r.onTitleChanged(n)), s.val(n.title), i.focus();
  }
  var i = e("#wmd-input");
  c.selectFile();
  var o = e(".file-title-navbar"), s = e(".input-file-title");
  e(".action-create-file").click(function() {
   var e = c.createFile();
   c.selectFile(e);
   var t = i.focus().get(0);
   t.setSelectionRange && t.setSelectionRange(0, 0), o.click();
  }), e(".action-remove-file").click(function() {
   c.deleteFile();
  }), o.click(function() {
   if (viewerMode !== !0) {
    o.addClass("hide");
    var e = s.removeClass("hide");
    t.defer(function() {
     e.focus().get(0).select();
    });
   }
  }), s.blur(function() {
   n();
  }).keyup(function(e) {
   13 == e.keyCode && n(), 27 == e.keyCode && (s.val(""), n());
  }), e(".action-open-stackedit").click(function() {
   window.location.href = ".";
  }), e(".action-edit-document").click(function() {
   var e = i.val(), t = c.currentFile.title, n = c.createFile(t, e);
   c.selectFile(n), window.location.href = ".";
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
 function i() {
  this.finished = !1, this.timeout = ASYNC_TASK_DEFAULT_TIMEOUT, this.retryCounter = 0, 
  this.runCallbacks = [], this.successCallbacks = [], this.errorCallbacks = [];
 }
 function o() {
  if (d !== !1) {
   if (l === !0) return a + u.timeout < t.currentTime && u.error(new Error("A timeout occurred.")), 
   void 0;
   if (void 0 === u) {
    if (0 === s.length) return;
    u = s.shift(), a = t.currentTime, c === !1 && (c = !0, n.onAsyncRunning(!0));
   }
   a <= t.currentTime && (l = !0, u.chain());
  }
 }
 function r(t, i, r) {
  try {
   e.each(i, function(e) {
    e(r);
   });
  } finally {
   t.finished = !0, u === t && (u = void 0, l = !1), 0 === s.length ? (c = !1, n.onAsyncRunning(!1)) : o();
  }
 }
 var s = [];
 i.prototype.onRun = function(e) {
  this.runCallbacks.push(e);
 }, i.prototype.onSuccess = function(e) {
  this.successCallbacks.push(e);
 }, i.prototype.onError = function(e) {
  this.errorCallbacks.push(e);
 };
 var a = 0;
 i.prototype.chain = function(e) {
  if (a = t.currentTime, t.logStackTrace(), this.finished !== !0) {
   if (void 0 === this.queue && (this.queue = this.runCallbacks.slice()), void 0 !== e) return e(), 
   void 0;
   if (0 === this.queue.length) return r(this, this.successCallbacks), void 0;
   var n = this.queue.shift();
   n();
  }
 }, i.prototype.error = function(e) {
  if (t.logStackTrace(), this.finished !== !0) throw e = e || new Error("Unknown error"), 
  e.message && n.onError(e), r(this, this.errorCallbacks, e), e;
 };
 var l = !1;
 i.prototype.retry = function(e, n) {
  if (this.finished !== !0) {
   if (n = n || 5, this.queue = void 0, this.retryCounter >= n) return this.error(e), 
   void 0;
   var i = 1e3 * Math.pow(2, this.retryCounter++);
   a = t.currentTime + i, l = !1, o();
  }
 }, i.prototype.enqueue = function() {
  s.push(this), o();
 };
 var c = !1, u = void 0, d = !1;
 return n.addListener("onUserActive", function() {
  d = !0;
 }), n.addListener("onPeriodicRun", o), i;
}), define("helpers/dropboxHelper", [ "jquery", "underscore", "core", "eventMgr", "classes/AsyncTask" ], function(e, t, n, i, o) {
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
    a(n, t);
   }), void 0);
  });
 }
 function s(e) {
  e.onRun(function() {
   function t() {
    n === !1 && (i.onMessage("Please make sure the Dropbox authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), c.reset(), c.authenticate({
     interactive: !n
    }, function(i, o) {
     return o.authState === Dropbox.Client.DONE ? (u = !0, e.chain(), void 0) : n === !0 ? (n = !1, 
     e.chain(t), void 0) : (e.error(new Error("Access to Dropbox account is not authorized.")), 
     void 0);
    });
   }
   if (u === !0) return e.chain(), void 0;
   var n = !0;
   e.chain(t);
  });
 }
 function a(e, i) {
  var o = !0;
  if (e) if (logger.error(e), "string" == typeof e) o = e; else {
   if (o = "Dropbox error (" + e.status + ": " + e.responseText + ").", 401 === e.status || 403 === e.status) return u = !1, 
   o = "Access to Dropbox account is not authorized.", i.retry(new Error(o), 1), void 0;
   if (400 === e.status && -1 !== e.responseText.indexOf("oauth_nonce")) return t.each(t.keys(localStorage), function(e) {
    0 === e.indexOf("dropbox-auth") && localStorage.removeItem(e);
   }), u = !1, i.retry(new Error(o), 1), void 0;
   e.status <= 0 && (c = void 0, u = !1, n.setOffline(), o = "|stopPublish");
  }
  i.error(new Error(o));
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
    a(n, t);
   }), void 0);
  });
 }
 var c = void 0, u = !1, d = {}, p = !1;
 i.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.upload = function(e, t, n) {
  var i = void 0, l = new o();
  r(l), s(l), l.onRun(function() {
   c.writeFile(e, t, function(t, n) {
    return t ? (400 === t.status && (t = 'Could not upload document into path "' + e + '".'), 
    a(t, l), void 0) : (i = n, l.chain(), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, i);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], i = e || 0, l = new o();
  r(l), s(l), l.onRun(function() {
   function e() {
    c.pullChanges(i, function(t, o) {
     return t ? (a(t, l), void 0) : (i = o.cursor(), void 0 !== o.changes && (n = n.concat(o.changes)), 
     o.shouldPullAgain ? l.chain(e) : l.chain(), void 0);
    });
   }
   l.chain(e);
  }), l.onSuccess(function() {
   t(void 0, n, i);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, d.downloadMetadata = function(e, t) {
  var n = [], i = new o();
  r(i), s(i), i.onRun(function() {
   function t() {
    if (0 === e.length) return i.chain(), void 0;
    var o = e[0];
    c.stat(o, function(o, r) {
     return r ? (n.push(r), e.shift(), i.chain(t), void 0) : (a(o, i), void 0);
    });
   }
   i.chain(t);
  }), i.onSuccess(function() {
   t(void 0, n);
  }), i.onError(function(e) {
   t(e);
  }), i.enqueue();
 }, d.downloadContent = function(e, t) {
  var n = [], i = new o();
  r(i), s(i), i.onRun(function() {
   function t() {
    if (0 === e.length) return i.chain(), void 0;
    var o = e[0];
    n.push(o);
    var r = void 0;
    return o.isFile === !0 ? r = o : void 0 !== o.wasRemoved && (r = o.stat), r ? (c.readFile(r.path, function(n, o) {
     return o ? (r.content = o, e.shift(), i.chain(t), void 0) : (a(n, i), void 0);
    }), void 0) : (e.shift(), i.chain(t), void 0);
   }
   i.chain(t);
  }), i.onSuccess(function() {
   t(void 0, n);
  }), i.onError(function(e) {
   t(e);
  }), i.enqueue();
 };
 var f = !1;
 return d.picker = function(e) {
  var t = [], n = new o();
  n.timeout = ASYNC_TASK_LONG_TIMEOUT, r(n), l(n), n.onRun(function() {
   var e = {};
   e.multiselect = !0, e.linkType = "direct", e.success = function(e) {
    for (var i = 0; i < e.length; i++) {
     var o = e[i].link;
     o = o.replace(/.*\/view\/[^\/]*/, ""), t.push(decodeURI(o));
    }
    n.chain();
   }, e.cancel = function() {
    n.chain();
   }, Dropbox.choose(e), i.onMessage("Please make sure the Dropbox chooser popup is not blocked by your browser.");
  }), n.onSuccess(function() {
   e(void 0, t);
  }), n.onError(function(t) {
   e(t);
  }), n.enqueue();
 }, d;
}), define("providers/dropboxProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "fileMgr", "helpers/dropboxHelper" ], function(e, t, n, i, o, r) {
 function s(e) {
  return void 0 === e ? void 0 : e.match(/^[^\\<>:"\|?\*]+$/) ? 0 !== e.indexOf("/") ? "/" + e : e : (i.onError('"' + e + '" contains invalid characters.'), 
  void 0);
 }
 function a(e) {
  return "sync." + u + "." + encodeURIComponent(e.toLowerCase());
 }
 function l(e, n, i) {
  var o = {};
  return o.provider = d, o.path = e, o.version = n, o.contentCRC = t.crc32(i), o.syncIndex = a(e), 
  o;
 }
 function c(t) {
  r.downloadMetadata(t, function(t, n) {
   t || r.downloadContent(n, function(t, n) {
    if (!t) {
     var r = [];
     e.each(n, function(e) {
      var t = l(e.path, e.versionTag, e.content), n = {};
      n[t.syncIndex] = t;
      var i = o.createFile(e.name, e.content, n);
      o.selectFile(i), r.push(i);
     }), 0 !== r.length && i.onSyncImportSuccess(r, d);
    }
   });
  });
 }
 var u = "dropbox", d = new n(u, "Dropbox");
 return d.defaultPublishFormat = "template", d.importFiles = function() {
  r.picker(function(t, n) {
   if (!t && 0 !== n.length) {
    var r = [];
    e.each(n, function(e) {
     var t = a(e), n = o.getFileFromSyncIndex(t);
     return void 0 !== n ? (i.onError('"' + n.title + '" was already imported.'), void 0) : (r.push(e), 
     void 0);
    }), c(r);
   }
  });
 }, d.exportFile = function(e, n, c, u) {
  var d = t.getInputTextValue("#input-sync-export-dropbox-path", e);
  if (d = s(d), void 0 === d) return u(!0), void 0;
  var p = a(d), f = o.getFileFromSyncIndex(p);
  if (void 0 !== f) {
   var h = f.title;
   return i.onError('File path is already synchronized with "' + h + '".'), u(!0), 
   void 0;
  }
  r.upload(d, c, function(e, t) {
   if (e) return u(e), void 0;
   var n = l(t.path, t.versionTag, c);
   u(void 0, n);
  });
 }, d.syncUp = function(e, t, n, i, o, s) {
  var a = o.contentCRC;
  return t == a ? (s(void 0, !1), void 0) : (r.upload(o.path, e, function(e, n) {
   return e ? (s(e, !0), void 0) : (o.version = n.versionTag, o.contentCRC = t, s(void 0, !0), 
   void 0);
  }), void 0);
 }, d.syncDown = function(n) {
  var s = localStorage[u + ".lastChangeId"];
  r.checkChanges(s, function(s, l, c) {
   if (s) return n(s), void 0;
   var d = [];
   e.each(l, function(e) {
    var t = a(e.path), n = o.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.wasRemoved === !0 ? (d.push(e), void 0) : (n.version != e.stat.versionTag && d.push(e), 
    void 0)) : void 0;
   }), r.downloadContent(d, function(r, s) {
    return r ? (n(r), void 0) : (e.each(s, function(e) {
     var n = e.syncAttributes, r = n.syncIndex, s = o.getFileFromSyncIndex(r);
     if (void 0 !== s) {
      var a = s.title;
      if (e.wasRemoved === !0) return i.onError('"' + a + '" has been removed from Dropbox.'), 
      s.removeSyncLocation(n), i.onSyncRemoved(s, n), void 0;
      var l = s.content, c = n.contentCRC != t.crc32(l), u = e.stat, d = t.crc32(u.content), p = n.contentCRC != d, f = l != u.content;
      f === !0 && c === !0 && p === !0 && (o.createFile(a + " (backup)", l), i.onMessage('Conflict detected on "' + a + '". A backup has been created locally.')), 
      f && p === !0 && (s.content = u.content, i.onContentChanged(s), i.onMessage('"' + a + '" has been updated from Dropbox.'), 
      o.currentFile === s && o.selectFile()), n.version = u.versionTag, n.contentCRC = d, 
      t.storeAttributes(n);
     }
    }), localStorage[u + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, d.publish = function(e, t, n, i) {
  var o = s(e.path);
  return void 0 === o ? (i(!0), void 0) : (r.upload(o, n, i), void 0);
 }, d.newPublishAttributes = function(e) {
  var n = {};
  return n.path = t.getInputTextValue("#input-publish-dropbox-path", e), e.isPropagationStopped() ? void 0 : n;
 }, d;
}), define("helpers/googleHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, i, o) {
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
    a(n, t);
   }), void 0);
  });
 }
 function s(e) {
  e.onRun(function() {
   function t() {
    n === !1 && (i.onMessage("Please make sure the Google authorization popup is not blocked by your browser."), 
    e.timeout = ASYNC_TASK_LONG_TIMEOUT), gapi.auth.authorize({
     client_id: GOOGLE_CLIENT_ID,
     scope: GOOGLE_SCOPES,
     immediate: n
    }, function(i) {
     gapi.client.load("drive", "v2", function() {
      return !i || i.error ? c === !0 && n === !0 ? (n = !1, e.chain(t), void 0) : (e.error(new Error("Access to Google account is not authorized.")), 
      void 0) : (u = !0, e.chain(), void 0);
     });
    });
   }
   if (u === !0) return e.chain(), void 0;
   var n = !0;
   e.chain(t);
  });
 }
 function a(e, n) {
  var i = void 0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Google error (" + e.code + ": " + e.message + ").", e.code >= 500 && e.code < 600) return n.retry(new Error(i)), 
   void 0;
   if (401 === e.code || 403 === e.code || "token_refresh_required" == e.code) return u = !1, 
   i = "Access to Google account is not authorized.", n.retry(new Error(i), 1), void 0;
   (0 === e.code || -1 === e.code) && (c = !1, u = !1, t.setOffline(), i = "|stopPublish");
  }
  n.error(new Error(i));
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
    a(n, t);
   }), void 0);
  });
 }
 var c = !1, u = !1, d = {}, p = !1;
 i.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.forceAuthenticate = function() {
  u = !1;
  var e = new o();
  r(e), s(e), e.enqueue();
 }, d.upload = function(e, t, i, l, c, u) {
  var d = void 0, p = new o();
  r(p), s(p), p.onRun(function() {
   var o = "-------314159265358979323846", r = "\r\n--" + o + "\r\n", s = "\r\n--" + o + "--", c = "text/x-markdown", u = {
    title: i,
    mimeType: c
   };
   t && (u.parents = [ {
    kind: "drive#fileLink",
    id: t
   } ]);
   var f = "/upload/drive/v2/files", h = "POST";
   e && (f += "/" + e, h = "PUT");
   var g = {
    "Content-Type": 'multipart/mixed; boundary="' + o + '"'
   }, m = n.encodeBase64(l), v = [ r, "Content-Type: application/json\r\n\r\n", JSON.stringify(u), r, "Content-Type: ", c, "\r\n", "Content-Transfer-Encoding: base64\r\n", "\r\n", m, s ].join(""), b = gapi.client.request({
    path: f,
    method: h,
    params: {
     uploadType: "multipart"
    },
    headers: g,
    body: v
   });
   b.execute(function(t) {
    if (t && t.id) return d = t, d.content = l, p.chain(), void 0;
    var n = t.error;
    void 0 !== n && void 0 !== e && (404 === n.code ? n = 'File ID "' + e + '" not found on Google Drive.|removePublish' : 412 === n.code && (localStorage.removeItem("gdrive.lastChangeId"), 
    n = 'Conflict on file ID "' + e + '". Please restart the synchronization.')), a(n, p);
   });
  }), p.onSuccess(function() {
   u(void 0, d);
  }), p.onError(function(e) {
   u(e);
  }), p.enqueue();
 }, d.createRealtimeFile = function(e, t, n) {
  var i = void 0, l = new o();
  r(l), s(l), l.onRun(function() {
   var n = {
    title: t,
    mimeType: "application/vnd.google-apps.drive-sdk"
   };
   void 0 !== e && (n.parents = [ {
    kind: "drive#fileLink",
    id: e
   } ]);
   var o = gapi.client.drive.files.insert({
    resource: n
   });
   o.execute(function(e) {
    return e && e.id ? (i = e, l.chain(), void 0) : (a(e.error, l), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, i);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.uploadImg = function(t, n, i, l) {
  var c = void 0, u = new o();
  r(u), s(u), u.onRun(function() {
   var o = {
    Slug: t
   };
   t.match(/.jpe?g$/) ? o["Content-Type"] = "image/jpeg" : t.match(/.png$/) ? o["Content-Type"] = "image/png" : t.match(/.gif$/) && (o["Content-Type"] = "image/gif");
   var r = gapi.auth.getToken();
   r && (o.Authorization = "Bearer " + r.access_token), e.ajax({
    url: PICASA_PROXY_URL + "upload/" + i,
    headers: o,
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
    200 == t.code && (t.message = e.responseText), a(t, u);
   });
  }), u.onSuccess(function() {
   l(void 0, c);
  }), u.onError(function(e) {
   l(e);
  }), u.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], i = e || 0, l = new o();
  r(l), s(l), l.onRun(function() {
   function e() {
    var o = void 0;
    o = void 0 === t ? gapi.client.drive.changes.list({
     startChangeId: i + 1
    }) : gapi.client.drive.changes.list({
     pageToken: t
    }), o.execute(function(o) {
     return o && o.largestChangeId ? (i = o.largestChangeId, t = o.nextPageToken, void 0 !== o.items && (n = n.concat(o.items)), 
     void 0 !== t ? l.chain(e) : l.chain(), void 0) : (a(o.error, l), void 0);
    });
   }
   var t = void 0;
   l.chain(e);
  }), l.onSuccess(function() {
   t(void 0, n, i);
  }), l.onError(function(e) {
   t(e);
  }), l.enqueue();
 }, d.downloadMetadata = function(t, n, i) {
  var l = [], c = new o();
  r(c), i || s(c), c.onRun(function() {
   function n() {
    if (0 === t.length) return c.chain(), void 0;
    var i = t[0], o = {}, r = gapi.auth.getToken();
    r && (o.Authorization = "Bearer " + r.access_token), e.ajax({
     url: "https://www.googleapis.com/drive/v2/files/" + i,
     headers: o,
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
     404 === t.code && (t = 'File ID "' + i + '" not found on Google Drive.'), a(t, c);
    });
   }
   c.chain(n);
  }), c.onSuccess(function() {
   n(void 0, l);
  }), c.onError(function(e) {
   n(e);
  }), c.enqueue();
 }, d.downloadContent = function(t, n, i) {
  var l = [], c = new o();
  c.timeout = ASYNC_TASK_LONG_TIMEOUT, r(c), i || s(c), c.onRun(function() {
   function n() {
    if (0 === t.length) return c.chain(), void 0;
    var i = t[0];
    l.push(i);
    var o = void 0;
    if ("drive#file" == i.kind ? o = i : "drive#change" == i.kind && (o = i.file), !o) return t.shift(), 
    c.chain(n), void 0;
    if (0 === o.mimeType.indexOf("application/vnd.google-apps.drive-sdk")) return o.content = "", 
    o.isRealtime = !0, t.shift(), c.chain(n), void 0;
    var r = {}, s = gapi.auth.getToken();
    s && (r.Authorization = "Bearer " + s.access_token), e.ajax({
     url: o.downloadUrl,
     headers: r,
     data: {
      key: GOOGLE_API_KEY
     },
     dataType: "text",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     o.content = e, t.shift(), c.chain(n);
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     a(t, c);
    });
   }
   c.chain(n);
  }), c.onSuccess(function() {
   n(void 0, l);
  }), c.onError(function(e) {
   n(e);
  }), c.enqueue();
 }, d.loadRealtime = function(e, t, n, i) {
  var a = void 0, l = new o();
  r(l), s(l), l.onRun(function() {
   gapi.drive.realtime.load(e, function(e) {
    a = e, l.chain();
   }, function(e) {
    var n = e.createString(t);
    e.getRoot().set("content", n);
   }, function(e) {
    i(e), l.error(new Error(e.message));
   });
  }), l.onSuccess(function() {
   n(void 0, a);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 };
 var f = !1;
 return d.picker = function(t, i) {
  function s() {
   void 0 !== c && (c.setVisible(!1), e(".modal-backdrop, .picker").remove());
  }
  var a = [], c = void 0, u = new o();
  u.timeout = ASYNC_TASK_LONG_TIMEOUT, r(u), l(u), u.onRun(function() {
   var t = new google.picker.PickerBuilder();
   if (t.setAppId(GOOGLE_DRIVE_APP_ID), "doc" == i) {
    var o = new google.picker.DocsView(google.picker.ViewId.DOCS);
    o.setIncludeFolders(!0), o.setMimeTypes([ "text/x-markdown", "text/plain", "application/octet-stream", "application/vnd.google-apps.drive-sdk." + GOOGLE_DRIVE_APP_ID ].join(",")), 
    t.enableFeature(google.picker.Feature.NAV_HIDDEN), t.enableFeature(google.picker.Feature.MULTISELECT_ENABLED), 
    t.addView(o);
   } else if ("folder" == i) {
    var o = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
    o.setIncludeFolders(!0), o.setSelectFolderEnabled(!0), o.setMimeTypes("application/vnd.google-apps.folder"), 
    t.enableFeature(google.picker.Feature.NAV_HIDDEN), t.addView(o);
   } else "img" == i && (t.addView(google.picker.ViewId.PHOTOS), t.addView(google.picker.ViewId.PHOTO_UPLOAD));
   t.setCallback(function(e) {
    (e.action == google.picker.Action.PICKED || e.action == google.picker.Action.CANCEL) && (e.action == google.picker.Action.PICKED && (a = e.docs), 
    s(), u.chain());
   }), c = t.build(), e(n.createBackdrop()).click(function() {
    s(), u.chain();
   }), c.setVisible(!0);
  }), u.onSuccess(function() {
   t(void 0, a);
  }), u.onError(function(e) {
   s(), t(e);
  }), u.enqueue();
 }, d.uploadBlogger = function(t, n, i, l, c, u, d) {
  var p = new o();
  r(p), s(p), p.onRun(function() {
   function o() {
    var t = "https://www.googleapis.com/blogger/v3/blogs/" + n + "/posts/", o = {
     kind: "blogger#post",
     blog: {
      id: n
     },
     labels: l,
     title: c,
     content: u
    }, r = "POST";
    void 0 !== i && (t += i, o.id = i, r = "PUT"), e.ajax({
     url: t,
     data: JSON.stringify(o),
     headers: s,
     type: r,
     contentType: "application/json",
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     i = e.id, p.chain();
    }).fail(function(e) {
     var t = {
      code: e.status,
      message: e.statusText
     };
     404 === t.code && void 0 !== i && (t = "Post " + i + " not found on Blogger.|removePublish"), 
     a(t, p);
    });
   }
   function r() {
    return void 0 !== n ? (p.chain(o), void 0) : (e.ajax({
     url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
     data: {
      url: t
     },
     headers: s,
     dataType: "json",
     timeout: AJAX_TIMEOUT
    }).done(function(e) {
     n = e.id, p.chain(o);
    }).fail(function(e) {
     var n = {
      code: e.status,
      message: e.statusText
     };
     404 === n.code && (n = 'Blog "' + t + '" not found on Blogger.|removePublish'), 
     a(n, p);
    }), void 0);
   }
   var s = {}, d = gapi.auth.getToken();
   d && (s.Authorization = "Bearer " + d.access_token), p.chain(r);
  }), p.onSuccess(function() {
   d(void 0, n, i);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, d;
}), define("providers/gdriveProvider", [ "underscore", "utils", "classes/Provider", "settings", "eventMgr", "fileMgr", "helpers/googleHelper" ], function(e, t, n, i, o, r, s) {
 function a(e) {
  return "sync." + u + "." + e;
 }
 function l(e, n, i, o) {
  var r = {};
  return r.provider = d, r.id = e, r.etag = n, r.contentCRC = t.crc32(i), r.titleCRC = t.crc32(o), 
  r.syncIndex = a(e), r;
 }
 function c(t) {
  s.downloadMetadata(t, function(t, n) {
   t || s.downloadContent(n, function(t, n) {
    if (!t) {
     var i = [], s = void 0;
     e.each(n, function(e) {
      var t = l(e.id, e.etag, e.content, e.title);
      t.isRealtime = e.isRealtime;
      var n = {};
      n[t.syncIndex] = t, s = r.createFile(e.title, e.content, n), i.push(s);
     }), void 0 !== s && (o.onSyncImportSuccess(i, d), r.selectFile(s));
    }
   });
  });
 }
 var u = "gdrive", d = new n(u, "Google Drive");
 d.defaultPublishFormat = "template", d.exportPreferencesInputIds = [ "gdrive-parentid", "gdrive-realtime" ], 
 d.importFiles = function() {
  s.picker(function(t, n) {
   if (!t && 0 !== n.length) {
    var i = [];
    e.each(n, function(e) {
     var t = a(e.id), n = r.getFileFromSyncIndex(t);
     return void 0 !== n ? (o.onError('"' + n.title + '" was already imported.'), void 0) : (i.push(e.id), 
     void 0);
    }), c(i);
   }
  }, "doc");
 }, d.exportFile = function(e, n, i, c) {
  var u = t.getInputTextValue("#input-sync-export-gdrive-fileid");
  if (u) {
   var d = a(u), p = r.getFileFromSyncIndex(d);
   if (void 0 !== p) return o.onError('File ID is already synchronized with "' + p.title + '".'), 
   c(!0), void 0;
  }
  var f = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  s.upload(u, f, n, i, void 0, function(e, t) {
   if (e) return c(e), void 0;
   var o = l(t.id, t.etag, i, n);
   c(void 0, o);
  });
 }, d.exportRealtimeFile = function(e, n, i, o) {
  var r = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  s.createRealtimeFile(r, n, function(e, t) {
   if (e) return o(e), void 0;
   var r = l(t.id, t.etag, i, n);
   o(void 0, r);
  });
 }, d.syncUp = function(e, t, n, i, o, r) {
  var a = o.contentCRC, l = o.titleCRC;
  return t == a && i == l ? (r(void 0, !1), void 0) : (s.upload(o.id, void 0, n, e, o.etag, function(e, n) {
   return e ? (r(e, !0), void 0) : (o.etag = n.etag, o.contentCRC = t, o.titleCRC = i, 
   r(void 0, !0), void 0);
  }), void 0);
 }, d.syncDown = function(n) {
  var i = parseInt(localStorage[u + ".lastChangeId"]);
  s.checkChanges(i, function(i, l, c) {
   if (i) return n(i), void 0;
   var p = [];
   e.each(l, function(e) {
    var t = a(e.fileId), n = r.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.deleted === !0 ? (p.push(e), void 0) : (n.etag != e.file.etag && p.push(e), 
    void 0)) : void 0;
   }), s.downloadContent(p, function(i, s) {
    return i ? (n(i), void 0) : (e.each(s, function(e) {
     var n = e.syncAttributes, i = n.syncIndex, s = r.getFileFromSyncIndex(i);
     if (void 0 !== s) {
      var a = s.title;
      if (e.deleted === !0) return o.onError('"' + a + '" has been removed from Google Drive.'), 
      s.removeSyncLocation(n), o.onSyncRemoved(s, n), n.isRealtime === !0 && r.currentFile === s && d.stopRealtimeSync(), 
      void 0;
      var l = n.titleCRC != t.crc32(a), c = s.content, u = n.contentCRC != t.crc32(c), p = e.file, f = t.crc32(p.title), h = n.titleCRC != f, g = a != p.title, m = t.crc32(p.content), v = n.contentCRC != m, b = c != p.content;
      (g === !0 && l === !0 && h === !0 || !n.isRealtime && b === !0 && u === !0 && v === !0) && (r.createFile(a + " (backup)", c), 
      o.onMessage('Conflict detected on "' + a + '". A backup has been created locally.')), 
      g && h === !0 && (s.title = p.title, o.onTitleChanged(s), o.onMessage('"' + a + '" has been renamed to "' + p.title + '" on Google Drive.')), 
      !n.isRealtime && b && v === !0 && (s.content = p.content, o.onContentChanged(s), 
      o.onMessage('"' + p.title + '" has been updated from Google Drive.'), r.currentFile === s && r.selectFile()), 
      n.etag = p.etag, n.isRealtime || (n.contentCRC = m), n.titleCRC = f, t.storeAttributes(n);
     }
    }), localStorage[u + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, d.publish = function(e, t, n, i) {
  s.upload(e.id, void 0, e.fileName || t, n, void 0, function(t, n) {
   return t ? (i(t), void 0) : (e.id = n.id, i(), void 0);
  });
 }, d.newPublishAttributes = function(e) {
  var n = {};
  return n.id = t.getInputTextValue("#input-publish-gdrive-fileid"), n.fileName = t.getInputTextValue("#input-publish-gdrive-filename"), 
  e.isPropagationStopped() ? void 0 : n;
 };
 var p = void 0;
 o.addListener("onEditorConfigure", function(e) {
  p = e;
 });
 var f = void 0, h = void 0, g = void 0, m = void 0;
 return d.startRealtimeSync = function(n, i) {
  s.loadRealtime(i.id, n.content, function(s, a) {
   function l() {
    i.contentCRC = t.crc32(v.getText()), t.storeAttributes(i);
   }
   function c(e) {
    e.isLocal === !1 && (logger.log("Google Drive realtime document updated from server"), 
    l(), b());
   }
   function u() {
    p.uiManager.setButtonState(p.uiManager.buttons.undo, d.canUndo), p.uiManager.setButtonState(p.uiManager.buttons.redo, d.canRedo);
   }
   if (!s && a) {
    if (r.currentFile !== n) return a.close(), void 0;
    logger.log("Starting Google Drive realtime synchronization"), f = a;
    var d = f.getModel(), v = d.getRoot().get("content"), b = e.debounce(p.refreshPreview, 100);
    v.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, c), v.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, c), 
    f.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
     e.isPending === !1 && e.isSaving === !1 && (logger.log("Google Drive realtime document successfully saved on server"), 
     l());
    });
    var y = n.content, w = i.contentCRC != t.crc32(y), x = v.getText(), k = t.crc32(x), C = i.contentCRC != k, S = y != x;
    S === !0 && w === !0 && (C === !0 ? (r.createFile(n.title + " (backup)", y), o.onMessage('Conflict detected on "' + n.title + '". A backup has been created locally.')) : v.setText(y)), 
    h = gapi.drive.realtime.databinding.bindString(v, document.getElementById("wmd-input")), 
    C === !0 && (logger.log("Google Drive realtime document updated from server"), l(), 
    b()), g = p.uiManager.buttons.undo.execute, m = p.uiManager.buttons.redo.execute, 
    p.uiManager.buttons.undo.execute = function() {
     d.canUndo && d.undo();
    }, p.uiManager.buttons.redo.execute = function() {
     d.canRedo && d.redo();
    }, d.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, u), 
    u();
   }
  }, function(e) {
   console.error(e), "token_refresh_required" == e.type ? s.forceAuthenticate() : "not_found" == e.type ? (o.onError('"' + n.title + '" has been removed from Google Drive.'), 
   n.removeSyncLocation(i), o.onSyncRemoved(n, i), d.stopRealtimeSync()) : e.isFatal && (o.onError("An error has forced real time synchronization to stop."), 
   d.stopRealtimeSync());
  });
 }, d.stopRealtimeSync = function() {
  logger.log("Stopping Google Drive realtime synchronization"), void 0 !== h && (h.unbind(), 
  h = void 0), void 0 !== f && (f.close(), f = void 0), p.uiManager.buttons.undo.execute = g, 
  p.uiManager.buttons.redo.execute = m, p.uiManager.setUndoRedoButtonStates();
 }, o.addListener("onReady", function() {
  $(".export-gdrive-choose-folder").click(function() {
   s.picker(function(e, n) {
    e || 0 === n.length || ($(".modal-upload-gdrive").modal(), t.setInputValue("#input-sync-export-gdrive-parentid", n[0].id));
   }, "folder");
  });
  var n = $("#input-sync-export-gdrive-realtime"), d = $("#input-sync-export-gdrive-fileid");
  $("#input-sync-export-gdrive-realtime").change(function() {
   d.prop("disabled", n.prop("checked"));
  });
  var p = t.retrieveIgnoreError(u + ".state");
  if (void 0 !== p) if (localStorage.removeItem(u + ".state"), "create" == p.action) s.upload(void 0, p.folderId, GDRIVE_DEFAULT_FILE_TITLE, i.defaultContent, void 0, function(e, t) {
   if (!e) {
    var n = l(t.id, t.etag, t.content, t.title), i = {};
    i[n.syncIndex] = n;
    var s = r.createFile(t.title, t.content, i);
    r.selectFile(s), o.onMessage('"' + t.title + '" created successfully on Google Drive.');
   }
  }); else if ("open" == p.action) {
   var f = [];
   e.each(p.ids, function(e) {
    var t = a(e), n = r.getFileFromSyncIndex(t);
    void 0 !== n ? r.selectFile(n) : f.push(e);
   }), c(f);
  }
 }), d;
}), define("synchronizer", [ "jquery", "underscore", "utils", "eventMgr", "fileSystem", "fileMgr", "classes/Provider", "providers/dropboxProvider", "providers/gdriveProvider" ], function(e, t, n, i, o, r, s) {
 function a(e) {
  if (0 === b.length) return l(e), void 0;
  var t = b.pop();
  return t.isRealtime === !0 ? (a(e), void 0) : (t.provider.syncUp(y, w, x, k, t, function(i, o) {
   return o === !0 && (S = !0), i ? (e(i), void 0) : (o && n.storeAttributes(t), a(e), 
   void 0);
  }), void 0);
 }
 function l(e) {
  if (0 === C.length) return c(e), void 0;
  var i = C.pop();
  return b = t.values(i.syncLocations), 0 === b.length ? (l(e), void 0) : (y = i.content, 
  w = n.crc32(y), x = i.title, k = n.crc32(x), a(e), void 0);
 }
 function c(e) {
  S === !0 ? (S = !1, C = t.values(o), l(e)) : e();
 }
 function u(e) {
  if (0 === T.length) return e(), void 0;
  var t = T.pop();
  return m.hasSync(t) ? (t.syncDown(function(t) {
   return t ? (e(t), void 0) : (u(e), void 0);
  }), void 0) : (u(e), void 0);
 }
 function d(e) {
  T = t.values(v), u(e);
 }
 function p(e) {
  I = t.some(e.syncLocations, function(e) {
   return P = e, e.isRealtime;
  }) ? e : void 0, h();
 }
 function f(e) {
  e === !1 ? ($ = !0, h()) : (m.tryStopRealtimeSync(), $ = !1);
 }
 function h() {
  void 0 !== I && $ === !0 && P.provider.startRealtimeSync(I, P);
 }
 function g(i) {
  n.resetModalInputs();
  var o = n.retrieveIgnoreError(i.providerId + ".exportPreferences");
  o && t.each(i.exportPreferencesInputIds, function(e) {
   var i = o[e];
   t.isBoolean(i) ? n.setInputChecked("#input-sync-export-" + e, i) : n.setInputValue("#input-sync-export-" + e, i);
  }), e(".modal-upload-" + i.providerId).modal();
 }
 var m = {}, v = t.chain(arguments).map(function(e) {
  return e instanceof s && [ e.providerId, e ];
 }).compact().object().value();
 t.each(o, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".sync"), function(t) {
   try {
    var o = JSON.parse(localStorage[t]);
    o.syncIndex = t;
    var r = v[o.provider];
    if (!r) throw new Error("Invalid provider ID: " + o.provider);
    o.provider = r, e.syncLocations[t] = o;
   } catch (s) {
    i.onError(s), n.removeIndexFromArray(e.fileIndex + ".sync", t), localStorage.removeItem(t);
   }
  });
 }), m.hasSync = function(e) {
  return t.some(o, function(n) {
   return t.some(n.syncLocations, function(t) {
    return void 0 === e || t.provider === e;
   });
  });
 };
 var b = [], y = void 0, w = void 0, x = void 0, k = void 0, C = [], S = !1, T = [], E = !1;
 i.addListener("onOfflineChanged", function(e) {
  E = e;
 });
 var _ = !1;
 m.sync = function() {
  function e(e) {
   return void 0 !== e ? (_ = !1, i.onSyncRunning(!1), !0) : !1;
  }
  return _ === !0 || E === !0 ? !1 : (_ = !0, i.onSyncRunning(!0), S = !0, d(function(t) {
   e(t) || c(function(t) {
    e(t) || (_ = !1, i.onSyncRunning(!1), i.onSyncSuccess());
   });
  }), !0);
 };
 var I = void 0, P = void 0, $ = !0;
 return m.tryStopRealtimeSync = function() {
  void 0 !== I && $ === !0 && P.provider.stopRealtimeSync();
 }, viewerMode === !1 && (i.addListener("onFileOpen", p), i.addListener("onFileClosed", m.tryStopRealtimeSync), 
 i.addListener("onOfflineChanged", f)), i.addListener("onReady", function() {
  t.each(v, function(o) {
   e(".action-sync-import-" + o.providerId).click(function(e) {
    o.importFiles(e);
   }), e(".action-sync-export-dialog-" + o.providerId).click(function() {
    g(o);
   }), e(".action-sync-export-" + o.providerId).click(function(e) {
    var s = n.getInputChecked("#input-sync-export-" + o.providerId + "-realtime"), a = r.currentFile;
    if (s) {
     if (t.size(a.syncLocations) > 0) return i.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     o.exportRealtimeFile(e, a.title, a.content, function(e, t) {
      e || (t.isRealtime = !0, a.addSyncLocation(t), i.onSyncExportSuccess(a, t), I = a, 
      P = t, h());
     });
    } else {
     if (t.size(a.syncLocations) > 0 && t.first(t.values(a.syncLocations)).isRealtime) return i.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     o.exportFile(e, a.title, a.content, function(e, t) {
      e || (a.addSyncLocation(t), i.onSyncExportSuccess(a, t));
     });
    }
    var l = {};
    t.each(o.exportPreferencesInputIds, function(e) {
     var t = document.getElementById("input-sync-export-" + e);
     l[e] = "checkbox" == t.type ? t.checked : t.value;
    }), localStorage[o.providerId + ".exportPreferences"] = JSON.stringify(l);
   });
  });
 }), i.onSynchronizerCreated(m), m;
}), define("providers/downloadProvider", [ "jquery", "classes/Provider", "classes/AsyncTask" ], function(e, t, n) {
 var i = new t("download");
 return i.sharingAttributes = [ "url" ], i.importPublic = function(t, i) {
  var o = void 0, r = void 0, s = new n();
  s.onRun(function() {
   var n = t.url, i = n.lastIndexOf("/");
   return -1 === i ? (s.error(new Error("Invalid URL parameter.")), void 0) : (o = n.substring(i + 1), 
   e.ajax({
    url: DOWNLOAD_PROXY_URL + "download?url=" + n,
    type: "GET",
    dataType: "text",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    r = e, s.chain();
   }).fail(function() {
    s.error(new Error("Unable to access URL " + n));
   }), void 0);
  }), s.onSuccess(function() {
   i(void 0, o, r);
  }), s.onError(function(e) {
   i(e);
  }), s.enqueue();
 }, i;
}), define("helpers/githubHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, i, o) {
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
    a(n, t);
   }), void 0);
  });
 }
 function s(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function s() {
    localStorage.removeItem("githubCode"), o = n.popupWindow("github-oauth-client.html?client_id=" + GITHUB_CLIENT_ID, "stackedit-github-oauth", 960, 600), 
    o.focus(), r = setInterval(function() {
     if (o.closed === !0) {
      if (clearInterval(r), o = void 0, r = void 0, d = localStorage.githubCode, void 0 === d) return t.error(new Error(u)), 
      void 0;
      localStorage.removeItem("githubCode"), t.chain(a);
     }
    }, 500);
   }
   function a() {
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
   i.onMessage("Please make sure the Github authorization popup is not blocked by your browser.");
   var u = "Failed to retrieve a token from GitHub.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var d = void 0;
   t.chain(s);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function a(e, n) {
  var i = void 0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Could not publish on GitHub.", 401 === e.error || 403 === e.error) return c = void 0, 
   localStorage.removeItem("githubToken"), i = "Access to GitHub account is not authorized.", 
   n.retry(new Error(i), 1), void 0;
   e.error <= 0 && (l = !1, c = void 0, t.setOffline(), i = "|stopPublish");
  }
  n.error(new Error(i));
 }
 var l = void 0, c = void 0, u = {}, d = !1;
 return i.addListener("onOfflineChanged", function(e) {
  d = e;
 }), u.upload = function(e, t, n, i, l, u, d) {
  var p = new o();
  r(p), s(p), p.onRun(function() {
   function o() {
    var e = c.getUser();
    e.show(void 0, function(e, n) {
     return e ? (a(e, p), void 0) : (t = n.login, p.chain(r), void 0);
    });
   }
   function r() {
    var o = c.getRepo(t, e);
    o.write(n, i, l, u, function(e) {
     return e ? (a(e, p), void 0) : (p.chain(), void 0);
    });
   }
   t ? p.chain(r) : p.chain(o);
  }), p.onSuccess(function() {
   d();
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, u.uploadGist = function(e, t, n, i, l, u) {
  var d = new o();
  r(d), s(d), d.onRun(function() {
   var o = c.getGist(e), r = {};
   r[t] = {
    content: l
   }, githubFunction = o.update, void 0 === e && (githubFunction = o.create), githubFunction({
    description: i,
    "public": n,
    files: r
   }, function(t, n) {
    return t ? (404 === t.error && void 0 !== e && (t = "Gist " + e + " not found on GitHub.|removePublish"), 
    a(t, d), void 0) : (e = n.id, d.chain(), void 0);
   });
  }), d.onSuccess(function() {
   u(void 0, e);
  }), d.onError(function(e) {
   u(e);
  }), d.enqueue();
 }, u.downloadGist = function(e, t, n) {
  var i = new o();
  r(i);
  var s = void 0, a = void 0;
  i.onRun(function() {
   var n = new Github({}), o = n.getGist(e);
   o.read(function(n, o) {
    if (n) return i.error(new Error("Error trying to access Gist " + e + ".")), void 0;
    s = o.description;
    var r = o.files[t];
    return void 0 === r ? (i.error(new Error("Gist " + e + ' does not contain "' + t + '".')), 
    void 0) : (a = r.content, i.chain(), void 0);
   });
  }), i.onSuccess(function() {
   n(void 0, s, a);
  }), i.onError(function(e) {
   n(e);
  }), i.enqueue();
 }, u;
}), define("providers/gistProvider", [ "utils", "classes/Provider", "helpers/githubHelper" ], function(e, t, n) {
 var i = new t("gist", "Gist");
 return i.publishPreferencesInputIds = [ "gist-public" ], i.sharingAttributes = [ "gistId", "filename" ], 
 i.publish = function(e, t, i, o) {
  n.uploadGist(e.gistId, e.filename, e.isPublic, t, i, function(t, n) {
   return t ? (o(t), void 0) : (e.gistId = n, o(), void 0);
  });
 }, i.newPublishAttributes = function(t) {
  var n = {};
  return n.gistId = e.getInputTextValue("#input-publish-gist-id"), n.filename = e.getInputTextValue("#input-publish-filename", t), 
  n.isPublic = e.getInputChecked("#input-publish-gist-public"), t.isPropagationStopped() ? void 0 : n;
 }, i.importPublic = function(e, t) {
  n.downloadGist(e.gistId, e.filename, t);
 }, i;
}), define("sharing", [ "jquery", "underscore", "utils", "eventMgr", "fileMgr", "classes/AsyncTask", "classes/Provider", "providers/downloadProvider", "providers/gistProvider" ], function(e, t, n, i, o, r, s) {
 var a = {}, l = t.chain(arguments).map(function(e) {
  return e instanceof s && [ e.providerId, e ];
 }).compact().object().value(), c = !1;
 return i.addListener("onOfflineChanged", function(e) {
  c = e;
 }), a.createLink = function(n, o) {
  function s() {
   o();
  }
  var a = l[n.provider.providerId];
  if (void 0 !== n.sharingLink || void 0 === a || "markdown" != n.format) return o(), 
  void 0;
  var u = new r(), d = void 0;
  u.onRun(function() {
   if (c === !0) return u.chain(), void 0;
   var o = [ MAIN_URL, "viewer.html?provider=", a.providerId ];
   t.each(a.sharingAttributes, function(e) {
    o.push("&"), o.push(e), o.push("="), o.push(encodeURIComponent(n[e]));
   }), o = o.join(""), e.getJSON("https://api-ssl.bitly.com/v3/shorten", {
    access_token: BITLY_ACCESS_TOKEN,
    longUrl: o
   }, function(e) {
    e.data ? (d = e.data.url, n.sharingLink = d) : (i.onError("An error occured while creating sharing link."), 
    n.sharingLink = o), u.chain();
   });
  }), u.onSuccess(s), u.onError(s), u.enqueue();
 }, i.addListener("onReady", function() {
  if (viewerMode !== !1) {
   var i = n.getURLParameter("provider");
   void 0 === i && (i = "download");
   var r = l[i];
   if (void 0 !== r) {
    var s = {};
    t.each(r.sharingAttributes, function(e) {
     var t = n.getURLParameter(e);
     return t ? (s[e] = t, void 0) : (s = void 0, void 0);
    }), void 0 !== s && (e("#preview-contents, #file-title").hide(), r.importPublic(s, function(t, n, i) {
     if (e("#preview-contents, #file-title").show(), !t) {
      var r = o.createFile(n, i, void 0, !0);
      o.selectFile(r);
     }
    }));
   }
  }
 }), a;
}), define("providers/bloggerProvider", [ "underscore", "utils", "classes/Provider", "helpers/googleHelper" ], function(e, t, n, i) {
 var o = new n("blogger", "Blogger");
 return o.defaultPublishFormat = "html", o.publishPreferencesInputIds = [ "blogger-url" ], 
 o.publish = function(e, t, n, o) {
  i.uploadBlogger(e.blogUrl, e.blogId, e.postId, e.labelList, t, n, function(t, n, i) {
   return t ? (o(t), void 0) : (e.blogId = n, e.postId = i, o(), void 0);
  });
 }, o.newPublishAttributes = function(n) {
  var i = {}, o = t.getInputTextValue("#input-publish-blogger-url", n);
  void 0 !== o && (i.blogUrl = t.checkUrl(o)), i.postId = t.getInputTextValue("#input-publish-postid"), 
  i.labelList = [];
  var r = t.getInputTextValue("#input-publish-labels");
  return void 0 !== r && (i.labelList = e.chain(r.split(",")).map(function(e) {
   return t.trim(e);
  }).compact().value()), n.isPropagationStopped() ? void 0 : i;
 }, o;
}), define("providers/githubProvider", [ "utils", "classes/Provider", "settings", "helpers/githubHelper" ], function(e, t, n, i) {
 var o = new t("github", "GitHub");
 return o.publishPreferencesInputIds = [ "github-reponame", "github-username", "github-branch" ], 
 o.publish = function(e, t, o, r) {
  var s = n.commitMsg;
  i.upload(e.repository, e.username, e.branch, e.path, o, s, r);
 }, o.newPublishAttributes = function(t) {
  var n = {};
  return n.repository = e.getInputTextValue("#input-publish-github-reponame", t), 
  n.username = e.getInputTextValue("#input-publish-github-username"), n.branch = e.getInputTextValue("#input-publish-github-branch", t), 
  n.path = e.getInputTextValue("#input-publish-file-path", t), t.isPropagationStopped() ? void 0 : n;
 }, o;
}), define("helpers/sshHelper", [ "jquery", "core", "eventMgr", "settings", "classes/AsyncTask" ], function(e, t, n, i, o) {
 function r(e) {
  e.onRun(function() {
   return l === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function s(e, n) {
  var i = void 0;
  e && (logger.error(e), "string" == typeof e ? i = "SSH error: " + e + "." : (i = "Could not publish on SSH server.", 
  e.code <= 0 && (t.setOffline(), i = "|stopPublish"))), n.error(new Error(i));
 }
 var a = {}, l = !1;
 return n.addListener("onOfflineChanged", function(e) {
  l = e;
 }), a.upload = function(t, n, a, l, c, u, d, p) {
  var f = new o();
  r(f), f.onRun(function() {
   var o = i.sshProxy + "upload", r = {
    host: t,
    port: n,
    username: a,
    password: l,
    path: c,
    title: u,
    content: d
   };
   e.ajax({
    url: o,
    data: r,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    return void 0 === e.error ? (f.chain(), void 0) : (s(e.error, f), void 0);
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    s(t, f);
   });
  }), f.onSuccess(function() {
   p();
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, a;
}), define("providers/sshProvider", [ "utils", "classes/Provider", "helpers/sshHelper" ], function(e, t, n) {
 var i = new t("ssh", "SSH server");
 return i.publishPreferencesInputIds = [ "ssh-host", "ssh-port", "ssh-username", "ssh-password" ], 
 i.publish = function(e, t, i, o) {
  n.upload(e.host, e.port, e.username, e.password, e.path, t, i, o);
 }, i.newPublishAttributes = function(t) {
  var n = {};
  return n.host = e.getInputTextValue("#input-publish-ssh-host", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.port = e.getInputIntValue("#input-publish-ssh-port", void 0, 0), n.username = e.getInputTextValue("#input-publish-ssh-username", t), 
  n.password = e.getInputTextValue("#input-publish-ssh-password", t), n.path = e.getInputTextValue("#input-publish-file-path", t), 
  t.isPropagationStopped() ? void 0 : n;
 }, i;
}), define("helpers/tumblrHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, i, o) {
 function r(e) {
  e.onRun(function() {
   return u === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function s(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function s() {
    e.getJSON(TUMBLR_PROXY_URL + "request_token", function(e) {
     void 0 !== e.oauth_token ? (p = e, t.chain(a)) : t.error(new Error(d));
    });
   }
   function a() {
    localStorage.removeItem("tumblrVerifier"), o = n.popupWindow("tumblr-oauth-client.html?oauth_token=" + p.oauth_token, "stackedit-tumblr-oauth", 800, 600), 
    o.focus(), r = setInterval(function() {
     if (o.closed === !0) {
      if (clearInterval(r), o = void 0, r = void 0, p.oauth_verifier = localStorage.tumblrVerifier, 
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
   i.onMessage("Please make sure the Tumblr authorization popup is not blocked by your browser.");
   var d = "Failed to retrieve a token from Tumblr.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var p = void 0;
   t.chain(s);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function a(e, n) {
  var i = void 0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Could not publish on Tumblr.", 401 === e.code || 403 === e.code) return l = void 0, 
   localStorage.removeItem("tumblrOauthParams"), i = "Access to Tumblr account is not authorized.", 
   n.retry(new Error(i), 1), void 0;
   e.code <= 0 && (t.setOffline(), i = "|stopPublish");
  }
  n.error(new Error(i));
 }
 var l = void 0, c = {}, u = !1;
 return i.addListener("onOfflineChanged", function(e) {
  u = e;
 }), c.upload = function(t, n, i, c, u, d, p) {
  var f = new o();
  r(f), s(f), f.onRun(function() {
   var o = e.extend({
    blog_hostname: t,
    post_id: n,
    tags: i,
    format: c,
    title: u,
    content: d
   }, l);
   e.ajax({
    url: TUMBLR_PROXY_URL + "post",
    data: o,
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
    a(t, f);
   });
  }), f.onSuccess(function() {
   p(void 0, n);
  }), f.onError(function(e) {
   p(e);
  }), f.enqueue();
 }, c;
}), define("providers/tumblrProvider", [ "utils", "classes/Provider", "helpers/tumblrHelper" ], function(e, t, n) {
 var i = new t("tumblr", "Tumblr");
 return i.publishPreferencesInputIds = [ "tumblr-hostname" ], i.publish = function(e, t, i, o) {
  n.upload(e.blogHostname, e.postId, e.tags, "markdown" == e.format ? "markdown" : "html", t, i, function(t, n) {
   return t ? (o(t), void 0) : (e.postId = n, o(), void 0);
  });
 }, i.newPublishAttributes = function(t) {
  var n = {};
  return n.blogHostname = e.getInputTextValue("#input-publish-tumblr-hostname", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.postId = e.getInputTextValue("#input-publish-postid"), n.tags = e.getInputTextValue("#input-publish-tags"), 
  t.isPropagationStopped() ? void 0 : n;
 }, i;
}), define("helpers/wordpressHelper", [ "jquery", "core", "utils", "eventMgr", "classes/AsyncTask" ], function(e, t, n, i, o) {
 function r(e) {
  e.onRun(function() {
   return u === !0 ? (e.error(new Error("Operation not available in offline mode.|stopPublish")), 
   void 0) : (e.chain(), void 0);
  });
 }
 function s(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function s() {
    localStorage.removeItem("wordpressCode"), o = n.popupWindow("wordpress-oauth-client.html?client_id=" + WORDPRESS_CLIENT_ID, "stackedit-wordpress-oauth", 960, 600), 
    o.focus(), r = setInterval(function() {
     if (o.closed === !0) {
      if (clearInterval(r), o = void 0, r = void 0, u = localStorage.wordpressCode, void 0 === u) return t.error(new Error(c)), 
      void 0;
      localStorage.removeItem("wordpressCode"), t.chain(a);
     }
    }, 500);
   }
   function a() {
    e.getJSON(WORDPRESS_PROXY_URL + "authenticate/" + u, function(e) {
     void 0 !== e.token ? (l = e.token, localStorage.wordpressToken = l, t.chain()) : t.error(new Error(c));
    });
   }
   if (l = localStorage.wordpressToken, void 0 !== l) return t.chain(), void 0;
   i.onMessage("Please make sure the Wordpress authorization popup is not blocked by your browser.");
   var c = "Failed to retrieve a token from Wordpress.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var u = void 0;
   t.chain(s);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function a(e, n) {
  var i = void 0;
  if (e) if (logger.error(e), "string" == typeof e) i = e; else {
   if (i = "Could not publish on WordPress.", 400 === e.code && "invalid_token" == e.message || 401 === e.code || 403 === e.code) return localStorage.removeItem("wordpressToken"), 
   i = "Access to WordPress account is not authorized.", n.retry(new Error(i), 1), 
   void 0;
   e.code <= 0 && (t.setOffline(), i = "|stopPublish");
  }
  n.error(new Error(i));
 }
 var l = void 0, c = {}, u = !1;
 return i.addListener("onOfflineChanged", function(e) {
  u = e;
 }), c.upload = function(t, n, i, c, u, d) {
  var p = new o();
  r(p), s(p), p.onRun(function() {
   var o = WORDPRESS_PROXY_URL + "post", r = {
    token: l,
    site: t,
    postId: n,
    tags: i,
    title: c,
    content: u
   };
   e.ajax({
    url: o,
    data: r,
    type: "POST",
    dataType: "json",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    if (e.body.ID) return n = e.body.ID, p.chain(), void 0;
    var i = {
     code: e.code,
     message: e.body.error
    };
    404 === i.code && ("unknown_blog" == i.message ? i = 'Site "' + t + '" not found on WordPress.|removePublish' : "unknown_post" == i.message && (i = "Post " + n + " not found on WordPress.|removePublish")), 
    a(i, p);
   }).fail(function(e) {
    var t = {
     code: e.status,
     message: e.statusText
    };
    a(t, p);
   });
  }), p.onSuccess(function() {
   d(void 0, n);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, c;
}), define("providers/wordpressProvider", [ "utils", "classes/Provider", "helpers/wordpressHelper" ], function(e, t, n) {
 var i = new t("wordpress", "WordPress");
 return i.defaultPublishFormat = "html", i.publishPreferencesInputIds = [ "wordpress-site" ], 
 i.publish = function(e, t, i, o) {
  n.upload(e.site, e.postId, e.tags, t, i, function(t, n) {
   return t ? (o(t), void 0) : (e.postId = n, o(), void 0);
  });
 }, i.newPublishAttributes = function(t) {
  var n = {};
  return n.site = e.getInputTextValue("#input-publish-wordpress-site", t, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/), 
  n.postId = e.getInputTextValue("#input-publish-postid"), n.tags = e.getInputTextValue("#input-publish-tags"), 
  t.isPropagationStopped() ? void 0 : n;
 }, i;
}), define("publisher", [ "jquery", "underscore", "utils", "settings", "eventMgr", "fileSystem", "fileMgr", "sharing", "classes/Provider", "providers/bloggerProvider", "providers/dropboxProvider", "providers/gistProvider", "providers/githubProvider", "providers/gdriveProvider", "providers/sshProvider", "providers/tumblrProvider", "providers/wordpressProvider" ], function(e, t, n, i, o, r, s, a, l) {
 function c(e, t, i) {
  return void 0 === t.format && (t.format = n.getInputRadio("radio-publish-format"), 
  "template" == t.format && n.getInputChecked("#checkbox-publish-custom-template") && (t.customTmpl = n.getInputValue("#textarea-publish-custom-template"))), 
  "markdown" == t.format ? e.content : "html" == t.format ? i : h.applyTemplate(e, t, i);
 }
 function u(e, t) {
  if (0 === m.length) return e(t), void 0;
  var n = m.pop(), i = c(v, n, b);
  n.provider.publish(n, v.title, i, function(i) {
   if (void 0 !== i) {
    var r = i.toString();
    if (-1 !== r.indexOf("|removePublish") && (v.removePublishLocation(n), o.onPublishRemoved(v, n)), 
    -1 !== r.indexOf("|stopPublish")) return e(i), void 0;
   }
   u(e, t || i);
  });
 }
 function d(e, i) {
  var r = void 0;
  do r = "publish." + n.randomString(); while (t.has(localStorage, r));
  i.publishIndex = r, e.addPublishLocation(i), o.onNewPublishSuccess(e, i);
 }
 function p(o) {
  var r = o.defaultPublishFormat || "markdown";
  k = o, e(".publish-provider-name").text(o.providerName), e('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + o.providerId).show(), 
  n.resetModalInputs(), n.setInputRadio("radio-publish-format", r), n.setInputChecked("#checkbox-publish-custom-template", !1), 
  n.setInputValue("#textarea-publish-custom-template", i.template);
  var s = n.retrieveIgnoreError(o.providerId + ".publishPreferences");
  s && (t.each(o.publishPreferencesInputIds, function(e) {
   var i = s[e];
   t.isBoolean(i) ? n.setInputChecked("#input-publish-" + e, i) : n.setInputValue("#input-publish-" + e, i);
  }), n.setInputRadio("radio-publish-format", s.format), n.setInputChecked("#checkbox-publish-custom-template", void 0 !== s.customTmpl), 
  n.setInputValue("#textarea-publish-custom-template", s.customTmpl || i.template)), 
  e(".modal-publish").modal();
 }
 function f(e) {
  var n = k, i = n.newPublishAttributes(e);
  if (void 0 !== i) {
   var o = s.currentFile, r = y, l = c(o, i, r);
   n.publish(i, o.title, l, function(e) {
    void 0 === e && (i.provider = n, a.createLink(i, function() {
     d(o, i);
    }));
   });
   var u = {};
   t.each(n.publishPreferencesInputIds, function(e) {
    var t = document.getElementById("input-publish-" + e);
    u[e] = "checkbox" == t.type ? t.checked : t.value;
   }), u.format = i.format, u.customTmpl = i.customTmpl, localStorage[n.providerId + ".publishPreferences"] = JSON.stringify(u);
  }
 }
 var h = {}, g = t.chain(arguments).map(function(e) {
  return e instanceof l && [ e.providerId, e ];
 }).compact().object().value();
 t.each(r, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".publish"), function(t) {
   try {
    var i = JSON.parse(localStorage[t]);
    i.publishIndex = t;
    var r = g[i.provider];
    if (!r) throw new Error("Invalid provider ID: " + i.provider);
    i.provider = r, e.publishLocations[t] = i;
   } catch (s) {
    o.onError(s), n.removeIndexFromArray(e.fileIndex + ".publish", t), localStorage.removeItem(t);
   }
  });
 }), h.applyTemplate = function(e, n, r) {
  try {
   var s = n && n.customTmpl || i.template;
   return t.template(s, {
    documentTitle: e.title,
    documentMarkdown: e.content,
    documentHTML: r,
    publishAttributes: n
   });
  } catch (a) {
   return o.onError(a), a.message;
  }
 };
 var m = [], v = void 0, b = void 0, y = void 0;
 o.addListener("onPreviewFinished", function(e) {
  y = e;
 });
 var w = !1;
 o.addListener("onOfflineChanged", function(e) {
  w = e;
 });
 var x = !1;
 h.publish = function() {
  x !== !0 && w !== !0 && (x = !0, o.onPublishRunning(!0), v = s.currentFile, b = y, 
  m = t.values(v.publishLocations), u(function(e) {
   x = !1, o.onPublishRunning(!1), void 0 === e && o.onPublishSuccess(v);
  }));
 };
 var k = void 0, C = [ "<li>", '   <a href="#"', '    class="action-init-publish-<%= provider.providerId %>">', '       <i class="icon-provider-<%= provider.providerId %>"></i> <%= provider.providerName %>', "   </a>", "</li>" ].join("");
 return o.addListener("onReady", function() {
  if (viewerMode === !1) {
   var o = document.querySelector(".menu-panel .collapse-publish-on .nav"), r = t.reduce(g, function(e, n) {
    return e + t.template(C, {
     provider: n
    });
   }, "");
   o.innerHTML = r, t.each(g, function(t) {
    e(o.querySelector(".action-init-publish-" + t.providerId)).click(function() {
     p(t);
    }), e(".action-publish-" + t.providerId).click(function() {
     p(t);
    });
   });
  }
  e(".action-process-publish").click(f);
  var a = e(".publish-custom-template-collapse").collapse({
   toggle: !1
  }), l = e("#textarea-publish-custom-template"), c = t.debounce(function() {
   a.collapse("template" == n.getInputRadio("radio-publish-format") ? "show" : "hide");
  }, 100);
  e("#checkbox-publish-custom-template").change(function() {
   l.prop("disabled", !this.checked);
  }), e("input:radio[name=radio-publish-format]").change(function() {
   c();
  }), e(".modal-publish").on("hidden.bs.modal", function() {
   a.collapse("hide");
  }), e(".action-download-md").click(function() {
   var e = document.getElementById("wmd-input").value, t = s.currentFile.title;
   n.saveAs(e, t + ".md");
  }), e(".action-download-html").click(function() {
   var e = s.currentFile.title;
   n.saveAs(y, e + ".html");
  }), e(".action-download-template").click(function() {
   var e = s.currentFile, t = h.applyTemplate(e, void 0, y);
   n.saveAs(t, e.title + (-1 === i.template.indexOf("documentHTML") ? ".md" : ".html"));
  });
 }), o.onPublisherCreated(h), h;
}), define("providers/gplusProvider", [ "underscore", "utils", "classes/Provider", "eventMgr", "helpers/googleHelper" ], function(e, t, n, i, o) {
 function r(t, n) {
  var i = void 0;
  return e.find(t.thumbnails, function(e) {
   var t = !1;
   return e.url.replace(/(.*\/s)\d.*?(\/[^\/]+)/, function(e, o, r) {
    i = o + n + r, t = !0;
   }), t;
  }), i;
 }
 function s() {
  return c.thumbnails ? (t.resetModalInputs(), $(".modal-import-image img").prop("src", r(c, 128)), 
  t.setInputValue("#input-import-image-title", c.name), u && t.setInputValue("#input-import-image-size", u.size), 
  $(".modal-import-image").modal(), void 0) : (i.onError("Image " + c.name + " is not accessible."), 
  callback(!0), void 0);
 }
 var a = "gplus", l = new n(a, "Google+"), c = void 0, u = t.retrieveIgnoreError(a + ".importImagePreferences"), d = void 0;
 return l.importImage = function(e) {
  d = e, o.picker(function(t, n) {
   return t || 0 === n.length ? (e(t), void 0) : (c = n[0], s(), void 0);
  }, "img");
 }, l.uploadImage = function(e, t, n) {
  d = n, o.uploadImg(e, t, "default", function(t, i) {
   return t || !i ? (n(t), void 0) : (c = {
    name: e,
    thumbnails: []
   }, $(i).find("thumbnail").each(function() {
    c.thumbnails.push({
     url: $(this).attr("url")
    });
   }), s(), void 0);
  });
 }, i.addListener("onReady", function() {
  $(".action-import-image").click(function() {
   var e = t.getInputIntValue("#input-import-image-size", void 0, 0) || 0, n = t.getInputTextValue("#input-import-image-title"), i = r(c, e);
   n && (i += ' "' + n + '"'), d(void 0, i), u = {}, e && (u.size = e), localStorage[a + ".importImagePreferences"] = JSON.stringify(u);
  });
 }), l;
}), define("mediaImporter", [ "jquery", "underscore", "classes/Provider", "core", "eventMgr", "providers/gplusProvider" ], function(e, t, n, i, o) {
 var r = {}, s = t.chain(arguments).map(function(e) {
  return e instanceof n && [ e.providerId, e ];
 }).compact().object().value();
 return o.addListener("onReady", function() {
  function n(n) {
   var o = (n.dataTransfer || n.target).files, r = t.first(o);
   if (r.name.match(/.(jpe?g|png|gif)$/)) {
    n.stopPropagation(), n.preventDefault();
    var a = new FileReader();
    a.onload = function() {
     return function(t) {
      var n = new Uint8Array(t.target.result);
      s.gplus.uploadImage(r.name, n, function(t, n) {
       if (!t) {
        i.catchModal = !0, e("#wmd-image-button").click(), i.catchModal = !1;
        var o = i.insertLinkCallback;
        i.insertLinkCallback = void 0, o(n || null);
       }
      });
     };
    }(r);
    var l = r.slice(0, IMPORT_IMG_MAX_CONTENT_SIZE);
    a.readAsArrayBuffer(l);
   }
  }
  function o(e) {
   e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy";
  }
  t.each(s, function(t) {
   e(".action-import-image-" + t.providerId).click(function() {
    var e = i.insertLinkCallback;
    i.insertLinkCallback = void 0, t.importImage(function(t, n) {
     return t ? (e(null), void 0) : (e(n || null), void 0);
    });
   });
  }), e("#wmd-input").each(function() {
   this.addEventListener("dragover", o, !1), this.addEventListener("drop", n, !1);
  });
 }), r;
}), define("css/normalize", [ "require", "module" ], function() {
 function e(e, i, o) {
  if (0 === e.indexOf("data:")) return e;
  if (e = r(e), e.match(/^\//) || e.match(s)) return e;
  var a = o.match(s), l = i.match(s);
  return !l || a && a[1] == l[1] && a[2] == l[2] ? n(t(e, i), o) : t(e, i);
 }
 function t(e, t) {
  "./" == e.substr(0, 2) && (e = e.substr(2));
  var n = t.split("/"), i = e.split("/");
  for (n.pop(); curPart = i.shift(); ) ".." == curPart ? n.pop() : n.push(curPart);
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
 }, s = /[^\:\/]*:\/\/([^\/])*/, a = function(t, n, i, o) {
  n = r(n), i = r(i);
  for (var s, a, t, l = /@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi; s = l.exec(t); ) {
   a = s[3] || s[2] || s[5] || s[6] || s[4];
   var c;
   c = o && "/" == a.substr(0, 1) ? o + a : e(a, n, i);
   var u = s[5] || s[6] ? 1 : 0;
   t = t.substr(0, l.lastIndex - a.length - u - 1) + c + t.substr(l.lastIndex - u - 1), 
   l.lastIndex = l.lastIndex + (c.length - a.length);
  }
  return t;
 };
 return a.convertURIBase = e, a;
}), define("css/css", [ "./normalize" ], function(e) {
 function t(e, t) {
  for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
  return -1;
 }
 if ("undefined" == typeof window) return {
  load: function(e, t, n) {
   n();
  }
 };
 var n = !1, i = document.getElementsByTagName("head")[0], o = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/), r = !1;
 o && (o[1] || o[7] ? (r = parseInt(o[1]) < 6 || parseInt(o[7]) <= 9, o = "trident") : o[2] ? (r = !0, 
 o = "webkit") : o[3] || (o[4] ? (r = parseInt(o[4]) < 18, o = "gecko") : n && alert("Engine detection failed")));
 var s = {}, a = /^\/|([^\:\/]*:)/;
 s.pluginBuilder = "./css-builder";
 var l = [], c = {}, u = [];
 s.addBuffer = function(e) {
  -1 == t(l, e) && -1 == t(u, e) && (l.push(e), u.push(e));
 }, s.setBuffer = function(t, n) {
  var i = window.location.pathname.split("/");
  i.pop(), i = i.join("/") + "/";
  var o = require.toUrl("base_url").split("/");
  o.pop();
  var r = o.join("/") + "/";
  r = e.convertURIBase(r, i, "/"), r.match(a) || (r = "/" + r), "/" != r.substr(r.length - 1, 1) && (r += "/"), 
  s.inject(e(t, r, i));
  for (var u = 0; u < l.length; u++) (n && ".less" == l[u].substr(l[u].length - 5, 5) || !n && ".css" == l[u].substr(l[u].length - 4, 4)) && (function(e) {
   c[e] = c[e] || !0, setTimeout(function() {
    "function" == typeof c[e] && c[e](), delete c[e];
   }, 7);
  }(l[u]), l.splice(u--, 1));
 }, s.attachBuffer = function(e, n) {
  for (var i = 0; i < l.length; i++) if (l[i] == e) return c[e] = n, !0;
  return c[e] === !0 ? (c[e] = n, !0) : -1 != t(u, e) ? (n(), !0) : void 0;
 };
 var d = function(e, t) {
  setTimeout(function() {
   for (var n = 0; n < document.styleSheets.length; n++) {
    var i = document.styleSheets[n];
    if (i.href == e.href) return t();
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
 if ("trident" == o && r) var f = [], h = [], g = 0, m = function(e, t) {
  var n;
  h.push({
   url: e,
   cb: t
  }), n = f.shift(), !n && g++ < 31 && (n = document.createElement("style"), i.appendChild(n)), 
  n && v(n);
 }, v = function(e) {
  var t = h.shift();
  if (!t) return e.onload = y, f.push(e), void 0;
  e.onload = function() {
   t.cb(t.ss), v(e);
  };
  var n = e.styleSheet;
  t.ss = n.imports[n.addImport(t.url)];
 };
 var b = function(e) {
  var t = document.createElement("link");
  return t.type = "text/css", t.rel = "stylesheet", t.href = e, t;
 }, y = function() {};
 s.linkLoad = function(e, t) {
  var s = setTimeout(function() {
   n && alert("timeout"), t();
  }, 1e3 * I - 100), a = function() {
   clearTimeout(s), l && (l.onload = y), setTimeout(t, 7);
  };
  if (r) if ("webkit" == o) {
   var l = b(e);
   d(l, a), i.appendChild(l);
  } else if ("gecko" == o) {
   var c = document.createElement("style");
   c.textContent = '@import "' + e + '"', p(c, a), i.appendChild(c);
  } else "trident" == o && m(e, a); else {
   var l = b(e);
   l.onload = a, i.appendChild(l);
  }
 };
 var w, x = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], k = {}, C = function(e, t, n) {
  if (k[e]) return t(k[e]), void 0;
  var i, o, r;
  if ("undefined" != typeof XMLHttpRequest) i = new XMLHttpRequest(); else if ("undefined" != typeof ActiveXObject) for (o = 0; 3 > o; o += 1) {
   r = x[o];
   try {
    i = new ActiveXObject(r);
   } catch (s) {}
   if (i) {
    x = [ r ];
    break;
   }
  }
  i.open("GET", e, requirejs.inlineRequire ? !1 : !0), i.onreadystatechange = function() {
   var o, r;
   4 === i.readyState && (o = i.status, o > 399 && 600 > o ? (r = new Error(e + " HTTP status: " + o), 
   r.xhr = i, n(r)) : (k[e] = i.responseText, t(i.responseText)));
  }, i.send(null);
 }, S = 0;
 s.inject = function(e) {
  31 > S && (w = document.createElement("style"), w.type = "text/css", i.appendChild(w), 
  S++), w.styleSheet ? w.styleSheet.cssText += e : w.appendChild(document.createTextNode(e));
 };
 var T = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, E = window.location.pathname.split("/");
 E.pop(), E = E.join("/") + "/";
 var _ = function(t, n, i) {
  t.match(a) || (t = "/" + e.convertURIBase(t, E, "/")), C(t, function(o) {
   o = e(o, t, E);
   for (var r, s = [], a = [], l = []; r = T.exec(o); ) {
    var c = r[4] || r[5] || r[7] || r[8] || r[9];
    s.push(c), a.push(T.lastIndex - r[0].length), l.push(r[0].length);
   }
   for (var u = 0, d = 0; d < s.length; d++) (function(e) {
    _(s[e], function(t) {
     o = o.substr(0, a[e]) + t + o.substr(a[e] + l[e]);
     for (var i = t.length - l[e], r = e + 1; r < s.length; r++) a[r] += i;
     u++, u == s.length && n(o);
    }, i);
   })(d);
   0 == s.length && n(o);
  }, i);
 };
 s.normalize = function(e, t) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e);
 };
 var I, P = !1;
 return s.load = function(e, t, i, o, a) {
  I = I || o.waitSeconds || 7;
  var l = e + (a ? ".less" : ".css");
  if (!s.attachBuffer(l, i)) {
   var c = t.toUrl(l);
   !P && n && (alert(r ? "hacking links" : "not hacking"), P = !0), a ? _(c, function(e) {
    a && (e = a(e, function(e) {
     s.inject(e), setTimeout(i, 7);
    }));
   }) : s.linkLoad(c, i);
  }
 }, n && (s.inspect = function() {
  return stylesheet.styleSheet ? stylesheet.styleSheet.cssText : stylesheet.innerHTML ? stylesheet.innerHTML : void 0;
 }), s;
}), define("css", [ "css/css" ], function(e) {
 return e;
}), requirejs.config({
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
  jgrowl: "libs/jgrowl/jquery.jgrowl",
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
  "libs/Markdown.Extra": [ "libs/Markdown.Converter", "libs/prettify/prettify", "libs/highlight/highlight.pack" ],
  "libs/Markdown.Editor": [ "libs/Markdown.Converter" ]
 }
});

var logger = {
 log: function() {},
 info: function() {},
 warn: function() {},
 error: function() {}
};

location.search.match(/(\?|&)console/) && (logger = console);

var viewerMode = /(^| )viewer($| )/.test(document.body.className), theme = localStorage.theme || "default", themeModule = "less!themes/" + theme;

"js-min" == baseDir && (themeModule = "css!themes/" + theme), require([ "jquery", "core", "synchronizer", "publisher", "mediaImporter", "css", themeModule ], function(e, t) {
 e(function() {
  window.applicationCache && window.applicationCache.addEventListener("updateready", function() {
   window.applicationCache.status === window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), 
   window.location.reload());
  }, !1), t.onReady();
 });
}), define("main", function() {});