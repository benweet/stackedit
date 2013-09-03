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

//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

/**
 * @license RequireJS text 2.0.10 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
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
 * @version 1.4.4
 * @url craig.is/killing/mice
 */

/**
 * jGrowl 1.2.10
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
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors

v0.5.0 2011-08-24
andrew relkin

modified, now detects:
any version of Firefox
more versions of Windows (Win8, Win7, Vista, XP, Win2k)
more versions of IE under unique conditions
more detailed support for Opera
if "no-js" in HTML class: removes and replaces with "js" (<html class="no-js">)

identifies
	browsers: Firefox; IE; Opera; Safari; Chrome, Konqueror, Iron
	browser versions: (most importantly: ie6, ie7, ie8, ie9)
	rendering engines: Webkit; Mozilla; Gecko
	platforms/OSes: Mac; Win: Win7, Vista, XP, Win2k; FreeBSD; Linux/x11 
	devices: Ipod; Ipad; Iphone; WebTV; Blackberry; Android; J2me; mobile(generic)
	enabled technology: JS

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

/* ===========================================================
# bootstrap-tour - v0.6.0
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/

/*
 * waitForImages 1.4.2
 * -------------------
 * Provides a callback when all images have loaded in your given selector.
 * https://github.com/alexanderdickson/waitForImages
 *
 * Copyright (c) 2013 Alex Dickson
 * Licensed under the MIT license.
 */

/*!
 * jQuery UI Core 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

/*!
 * jQuery UI Widget 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */

/*!
 * jQuery UI Mouse 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */

/*!
 * jQuery UI Draggable 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */

/*!
 * jQuery UI Effects 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */

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

/*!
 * jQuery UI Effects Slide 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
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

function css_browser_selector(e) {
 var t = e.toLowerCase(), n = function(e) {
  return t.indexOf(e) > -1;
 }, i = "gecko", o = "webkit", r = "safari", a = "opera", s = "mobile", l = "firefox", c = document.documentElement, u = [ !/opera|webtv/i.test(t) && /msie\s(\d)/.test(t) ? "ie ie" + (/trident\/4\.0/.test(t) ? "8" : RegExp.$1) : n("firefox/") ? i + " " + l + (/firefox\/(\d+(\.?\d+)*)/.test(t) ? " " + l + RegExp.$1.replace(/\./g, "").substr(0, 2) : "") : n("gecko/") ? i : n("opera") ? a + (/version\/((\d+)(\.\d+)*)/.test(t) ? " " + a + RegExp.$2 + " " + a + RegExp.$2 + RegExp.$3.replace(".", "_").substr(0, 2) : /opera(\s|\/)(\d+)/.test(t) ? " " + a + RegExp.$2 : "") : n("konqueror") ? "konqueror" : n("blackberry") ? s + " blackberry" : n("android") ? s + " android" : n("chrome") ? o + " chrome" : n("iron") ? o + " iron" : n("applewebkit/") ? o + " " + r + (/version\/(\d+)/.test(t) ? " " + r + RegExp.$1 : "") : n("mozilla/") ? i : "", n("j2me") ? s + " j2me" : n("iphone") ? s + " iphone" : n("ipod") ? s + " ipod" : n("ipad") ? s + " ipad" : n("mac") ? "mac" : n("darwin") ? "mac" : n("webtv") ? "webtv" : n("win") ? "win" + (n("windows nt 6.2") ? " win8" : n("windows nt 6.1") ? " win7" : n("windows nt 6.0") ? " vista" : n("windows nt 5.2") || n("windows nt 5.1") ? " xp" : n("windows nt 5.0") ? " win2k" : "") : n("freebsd") ? "freebsd" : n("x11") || n("linux") ? "linux" : "", "js" ], d = u.join(" ");
 return c.className = (c.className.replace(/no-?js/g, "") + " " + d).replace(/^ /, ""), 
 d;
}

(function(e, t) {
 function n(e) {
  var t = e.length, n = rt.type(e);
  return rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
 }
 function i(e) {
  var t = ht[e] = {};
  return rt.each(e.match(st) || [], function(e, n) {
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
   mt.set(e, n, i);
  } else i = t;
  return i;
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
   if (Nt.test(t)) return rt.filter(t, e, n);
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
  var t = Ot.exec(e.type);
  return t ? e.type = t[1] : e.removeAttribute("type"), e;
 }
 function h(e, t) {
  for (var n = e.length, i = 0; n > i; i++) gt.set(e[i], "globalEval", !t || gt.get(t[i], "globalEval"));
 }
 function m(e, t) {
  var n, i, o, r, a, s, l, c;
  if (1 === t.nodeType) {
   if (gt.hasData(e) && (r = gt.access(e), a = gt.set(t, r), c = r.events)) {
    delete a.handle, a.events = {};
    for (o in c) for (n = 0, i = c[o].length; i > n; n++) rt.event.add(t, o, c[o][n]);
   }
   mt.hasData(e) && (s = mt.access(e), l = rt.extend({}, s), mt.set(t, l));
  }
 }
 function g(e, n) {
  var i = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
  return n === t || n && rt.nodeName(e, n) ? rt.merge([ e ], i) : i;
 }
 function v(e, t) {
  var n = t.nodeName.toLowerCase();
  "input" === n && Rt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
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
 function x(t) {
  return e.getComputedStyle(t, null);
 }
 function w(e, t) {
  for (var n, i, o, r = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (r[a] = gt.get(i, "olddisplay"), 
  n = i.style.display, t ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && y(i) && (r[a] = gt.access(i, "olddisplay", _(i.nodeName)))) : r[a] || (o = y(i), 
  (n && "none" !== n || !o) && gt.set(i, "olddisplay", o ? n : rt.css(i, "display"))));
  for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
  return e;
 }
 function C(e, t, n) {
  var i = Wt.exec(t);
  return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
 }
 function k(e, t, n, i, o) {
  for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > r; r += 2) "margin" === n && (a += rt.css(e, n + Jt[r], !0, o)), 
  i ? ("content" === n && (a -= rt.css(e, "padding" + Jt[r], !0, o)), "margin" !== n && (a -= rt.css(e, "border" + Jt[r] + "Width", !0, o))) : (a += rt.css(e, "padding" + Jt[r], !0, o), 
  "padding" !== n && (a += rt.css(e, "border" + Jt[r] + "Width", !0, o)));
  return a;
 }
 function S(e, t, n) {
  var i = !0, o = "width" === t ? e.offsetWidth : e.offsetHeight, r = x(e), a = rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, r);
  if (0 >= o || null == o) {
   if (o = Ht(e, t, r), (0 > o || null == o) && (o = e.style[t]), Vt.test(o)) return o;
   i = a && (rt.support.boxSizingReliable || o === e.style[t]), o = parseFloat(o) || 0;
  }
  return o + k(e, t, n || (a ? "border" : "content"), i, r) + "px";
 }
 function _(e) {
  var t = G, n = Kt[e];
  return n || (n = T(e, t), "none" !== n && n || (Bt = (Bt || rt("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
  t = (Bt[0].contentWindow || Bt[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
  t.close(), n = T(e, t), Bt.detach()), Kt[e] = n), n;
 }
 function T(e, t) {
  var n = rt(t.createElement(e)).appendTo(t.body), i = rt.css(n[0], "display");
  return n.remove(), i;
 }
 function E(e, t, n, i) {
  var o;
  if (rt.isArray(t)) rt.each(t, function(t, o) {
   n || tn.test(e) ? i(e, o) : E(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i);
  }); else if (n || "object" !== rt.type(t)) i(e, t); else for (o in t) E(e + "[" + o + "]", t[o], n, i);
 }
 function N(e) {
  return function(t, n) {
   "string" != typeof t && (n = t, t = "*");
   var i, o = 0, r = t.toLowerCase().match(st) || [];
   if (rt.isFunction(n)) for (;i = r[o++]; ) "+" === i[0] ? (i = i.slice(1) || "*", 
   (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
  };
 }
 function I(e, t, n, i) {
  function o(s) {
   var l;
   return r[s] = !0, rt.each(e[s] || [], function(e, s) {
    var c = s(t, n, i);
    return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), 
    o(c), !1);
   }), l;
  }
  var r = {}, a = e === yn;
  return o(t.dataTypes[0]) || !r["*"] && o("*");
 }
 function P(e, n) {
  var i, o, r = rt.ajaxSettings.flatOptions || {};
  for (i in n) n[i] !== t && ((r[i] ? e : o || (o = {}))[i] = n[i]);
  return o && rt.extend(!0, e, o), e;
 }
 function A(e, n, i) {
  for (var o, r, a, s, l = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
  o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
  if (o) for (r in l) if (l[r] && l[r].test(o)) {
   c.unshift(r);
   break;
  }
  if (c[0] in i) a = c[0]; else {
   for (r in i) {
    if (!c[0] || e.converters[r + " " + c[0]]) {
     a = r;
     break;
    }
    s || (s = r);
   }
   a = a || s;
  }
  return a ? (a !== c[0] && c.unshift(a), i[a]) : void 0;
 }
 function M(e, t, n, i) {
  var o, r, a, s, l, c = {}, u = e.dataTypes.slice();
  if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
  for (r = u.shift(); r; ) if (e.responseFields[r] && (n[e.responseFields[r]] = t), 
  !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
   if (a = c[l + " " + r] || c["* " + r], !a) for (o in c) if (s = o.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
    a === !0 ? a = c[o] : c[o] !== !0 && (r = s[0], u.unshift(s[1]));
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
 function L() {
  return setTimeout(function() {
   Nn = t;
  }), Nn = rt.now();
 }
 function $(e, t, n) {
  for (var i, o = ($n[t] || []).concat($n["*"]), r = 0, a = o.length; a > r; r++) if (i = o[r].call(n, t, e)) return i;
 }
 function z(e, t, n) {
  var i, o, r = 0, a = Ln.length, s = rt.Deferred().always(function() {
   delete l.elem;
  }), l = function() {
   if (o) return !1;
   for (var t = Nn || L(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(r);
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
   startTime: Nn || L(),
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
    return t ? s.resolveWith(e, [ c, t ]) : s.rejectWith(e, [ c, t ]), this;
   }
  }), u = c.props;
  for (R(u, c.opts.specialEasing); a > r; r++) if (i = Ln[r].call(c, e, u, c.opts)) return i;
  return rt.map(u, $, c), rt.isFunction(c.opts.start) && c.opts.start.call(e, c), 
  rt.fx.timer(rt.extend(l, {
   elem: e,
   anim: c,
   queue: c.opts.queue
  })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
 }
 function R(e, t) {
  var n, i, o, r, a;
  for (n in e) if (i = rt.camelCase(n), o = t[i], r = e[n], rt.isArray(r) && (o = r[1], 
  r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), a = rt.cssHooks[i], a && "expand" in a) {
   r = a.expand(r), delete e[i];
   for (n in r) n in e || (e[n] = r[n], t[n] = o);
  } else t[i] = o;
 }
 function j(e, n, i) {
  var o, r, a, s, l, c, u = this, d = {}, p = e.style, f = e.nodeType && y(e), h = gt.get(e, "fxshow");
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
  for (o in n) if (r = n[o], Pn.exec(r)) {
   if (delete n[o], a = a || "toggle" === r, r === (f ? "hide" : "show")) {
    if ("show" !== r || !h || h[o] === t) continue;
    f = !0;
   }
   d[o] = h && h[o] || rt.style(e, o);
  }
  if (!rt.isEmptyObject(d)) {
   h ? "hidden" in h && (f = h.hidden) : h = gt.access(e, "fxshow", {}), a && (h.hidden = !f), 
   f ? rt(e).show() : u.done(function() {
    rt(e).hide();
   }), u.done(function() {
    var t;
    gt.remove(e, "fxshow");
    for (t in d) rt.style(e, t, d[t]);
   });
   for (o in d) s = $(f ? h[o] : 0, o, u), o in h || (h[o] = s.start, f && (s.end = s.start, 
   s.start = "width" === o || "height" === o ? 1 : 0));
  }
 }
 function D(e, t, n, i, o) {
  return new D.prototype.init(e, t, n, i, o);
 }
 function O(e, t) {
  var n, i = {
   height: e
  }, o = 0;
  for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Jt[o], i["margin" + n] = i["padding" + n] = e;
  return t && (i.opacity = i.width = e), i;
 }
 function F(e) {
  return rt.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
 }
 var q, H, B = typeof t, U = e.location, G = e.document, W = G.documentElement, V = e.jQuery, X = e.$, K = {}, Z = [], Y = "2.0.3", J = Z.concat, Q = Z.push, et = Z.slice, tt = Z.indexOf, nt = K.toString, it = K.hasOwnProperty, ot = Y.trim, rt = function(e, t) {
  return new rt.fn.init(e, t, q);
 }, at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, st = /\S+/g, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ut = /^-ms-/, dt = /-([\da-z])/gi, pt = function(e, t) {
  return t.toUpperCase();
 }, ft = function() {
  G.removeEventListener("DOMContentLoaded", ft, !1), e.removeEventListener("load", ft, !1), 
  rt.ready();
 };
 rt.fn = rt.prototype = {
  jquery: Y,
  constructor: rt,
  init: function(e, n, i) {
   var o, r;
   if (!e) return this;
   if ("string" == typeof e) {
    if (o = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : lt.exec(e), 
    !o || !o[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
    if (o[1]) {
     if (n = n instanceof rt ? n[0] : n, rt.merge(this, rt.parseHTML(o[1], n && n.nodeType ? n.ownerDocument || n : G, !0)), 
     ct.test(o[1]) && rt.isPlainObject(n)) for (o in n) rt.isFunction(this[o]) ? this[o](n[o]) : this.attr(o, n[o]);
     return this;
    }
    return r = G.getElementById(o[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
    this.context = G, this.selector = e, this;
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
  var e, n, i, o, r, a, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
  for ("boolean" == typeof s && (u = s, s = arguments[1] || {}, l = 2), "object" == typeof s || rt.isFunction(s) || (s = {}), 
  c === l && (s = this, --l); c > l; l++) if (null != (e = arguments[l])) for (n in e) i = s[n], 
  o = e[n], s !== o && (u && o && (rt.isPlainObject(o) || (r = rt.isArray(o))) ? (r ? (r = !1, 
  a = i && rt.isArray(i) ? i : []) : a = i && rt.isPlainObject(i) ? i : {}, s[n] = rt.extend(u, a, o)) : o !== t && (s[n] = o));
  return s;
 }, rt.extend({
  expando: "jQuery" + (Y + Math.random()).replace(/\D/g, ""),
  noConflict: function(t) {
   return e.$ === rt && (e.$ = X), t && e.jQuery === rt && (e.jQuery = V), rt;
  },
  isReady: !1,
  readyWait: 1,
  holdReady: function(e) {
   e ? rt.readyWait++ : rt.ready(!0);
  },
  ready: function(e) {
   (e === !0 ? --rt.readyWait : rt.isReady) || (rt.isReady = !0, e !== !0 && --rt.readyWait > 0 || (H.resolveWith(G, [ rt ]), 
   rt.fn.trigger && rt(G).trigger("ready").off("ready")));
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
   return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? K[nt.call(e)] || "object" : typeof e;
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
   "boolean" == typeof t && (n = t, t = !1), t = t || G;
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
   e = rt.trim(e), e && (1 === e.indexOf("use strict") ? (t = G.createElement("script"), 
   t.text = e, G.head.appendChild(t).parentNode.removeChild(t)) : n(e));
  },
  camelCase: function(e) {
   return e.replace(ut, "ms-").replace(dt, pt);
  },
  nodeName: function(e, t) {
   return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  },
  each: function(e, t, i) {
   var o, r = 0, a = e.length, s = n(e);
   if (i) {
    if (s) for (;a > r && (o = t.apply(e[r], i), o !== !1); r++) ; else for (r in e) if (o = t.apply(e[r], i), 
    o === !1) break;
   } else if (s) for (;a > r && (o = t.call(e[r], r, e[r]), o !== !1); r++) ; else for (r in e) if (o = t.call(e[r], r, e[r]), 
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
   var i, o = [], r = 0, a = e.length;
   for (n = !!n; a > r; r++) i = !!t(e[r], r), n !== i && o.push(e[r]);
   return o;
  },
  map: function(e, t, i) {
   var o, r = 0, a = e.length, s = n(e), l = [];
   if (s) for (;a > r; r++) o = t(e[r], r, i), null != o && (l[l.length] = o); else for (r in e) o = t(e[r], r, i), 
   null != o && (l[l.length] = o);
   return J.apply([], l);
  },
  guid: 1,
  proxy: function(e, n) {
   var i, o, r;
   return "string" == typeof n && (i = e[n], n = e, e = i), rt.isFunction(e) ? (o = et.call(arguments, 2), 
   r = function() {
    return e.apply(n || this, o.concat(et.call(arguments)));
   }, r.guid = e.guid = e.guid || rt.guid++, r) : t;
  },
  access: function(e, n, i, o, r, a, s) {
   var l = 0, c = e.length, u = null == i;
   if ("object" === rt.type(i)) {
    r = !0;
    for (l in i) rt.access(e, n, l, i[l], !0, a, s);
   } else if (o !== t && (r = !0, rt.isFunction(o) || (s = !0), u && (s ? (n.call(e, o), 
   n = null) : (u = n, n = function(e, t, n) {
    return u.call(rt(e), n);
   })), n)) for (;c > l; l++) n(e[l], i, s ? o : o.call(e[l], l, n(e[l], i)));
   return r ? e : u ? n.call(e) : c ? n(e[0], i) : a;
  },
  now: Date.now,
  swap: function(e, t, n, i) {
   var o, r, a = {};
   for (r in t) a[r] = e.style[r], e.style[r] = t[r];
   o = n.apply(e, i || []);
   for (r in t) e.style[r] = a[r];
   return o;
  }
 }), rt.ready.promise = function(t) {
  return H || (H = rt.Deferred(), "complete" === G.readyState ? setTimeout(rt.ready) : (G.addEventListener("DOMContentLoaded", ft, !1), 
  e.addEventListener("load", ft, !1))), H.promise(t);
 }, rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
  K["[object " + t + "]"] = t.toLowerCase();
 }), q = rt(G), function(e, t) {
  function n(e, t, n, i) {
   var o, r, a, s, l, c, u, d, h, m;
   if ((t ? t.ownerDocument || t : F) !== M && A(t), t = t || M, n = n || [], !e || "string" != typeof e) return n;
   if (1 !== (s = t.nodeType) && 9 !== s) return [];
   if ($ && !i) {
    if (o = yt.exec(e)) if (a = o[1]) {
     if (9 === s) {
      if (r = t.getElementById(a), !r || !r.parentNode) return n;
      if (r.id === a) return n.push(r), n;
     } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(a)) && D(t, r) && r.id === a) return n.push(r), 
     n;
    } else {
     if (o[2]) return et.apply(n, t.getElementsByTagName(e)), n;
     if ((a = o[3]) && k.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(a)), 
     n;
    }
    if (k.qsa && (!z || !z.test(e))) {
     if (d = u = O, h = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
      for (c = p(e), (u = t.getAttribute("id")) ? d = u.replace(Ct, "\\$&") : t.setAttribute("id", d), 
      d = "[id='" + d + "'] ", l = c.length; l--; ) c[l] = d + f(c[l]);
      h = ft.test(e) && t.parentNode || t, m = c.join(",");
     }
     if (m) try {
      return et.apply(n, h.querySelectorAll(m)), n;
     } catch (g) {} finally {
      u || t.removeAttribute("id");
     }
    }
   }
   return w(e.replace(ut, "$1"), t, n, i);
  }
  function i() {
   function e(n, i) {
    return t.push(n += " ") > _.cacheLength && delete e[t.shift()], e[n] = i;
   }
   var t = [];
   return e;
  }
  function o(e) {
   return e[O] = !0, e;
  }
  function r(e) {
   var t = M.createElement("div");
   try {
    return !!e(t);
   } catch (n) {
    return !1;
   } finally {
    t.parentNode && t.parentNode.removeChild(t), t = null;
   }
  }
  function a(e, t) {
   for (var n = e.split("|"), i = e.length; i--; ) _.attrHandle[n[i]] = t;
  }
  function s(e, t) {
   var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || K) - (~e.sourceIndex || K);
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
     for (var o, r = e([], n.length, t), a = r.length; a--; ) n[o = r[a]] && (n[o] = !(i[o] = n[o]));
    });
   });
  }
  function d() {}
  function p(e, t) {
   var i, o, r, a, s, l, c, u = U[e + " "];
   if (u) return t ? 0 : u.slice(0);
   for (s = e, l = [], c = _.preFilter; s; ) {
    (!i || (o = dt.exec(s))) && (o && (s = s.slice(o[0].length) || s), l.push(r = [])), 
    i = !1, (o = pt.exec(s)) && (i = o.shift(), r.push({
     value: i,
     type: o[0].replace(ut, " ")
    }), s = s.slice(i.length));
    for (a in _.filter) !(o = vt[a].exec(s)) || c[a] && !(o = c[a](o)) || (i = o.shift(), 
    r.push({
     value: i,
     type: a,
     matches: o
    }), s = s.slice(i.length));
    if (!i) break;
   }
   return t ? s.length : s ? n.error(e) : U(e, l).slice(0);
  }
  function f(e) {
   for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
   return i;
  }
  function h(e, t, n) {
   var i = t.dir, o = n && "parentNode" === i, r = H++;
   return t.first ? function(t, n, r) {
    for (;t = t[i]; ) if (1 === t.nodeType || o) return e(t, n, r);
   } : function(t, n, a) {
    var s, l, c, u = q + " " + r;
    if (a) {
     for (;t = t[i]; ) if ((1 === t.nodeType || o) && e(t, n, a)) return !0;
    } else for (;t = t[i]; ) if (1 === t.nodeType || o) if (c = t[O] || (t[O] = {}), 
    (l = c[i]) && l[0] === u) {
     if ((s = l[1]) === !0 || s === S) return s === !0;
    } else if (l = c[i] = [ u ], l[1] = e(t, n, a) || S, l[1] === !0) return !0;
   };
  }
  function m(e) {
   return e.length > 1 ? function(t, n, i) {
    for (var o = e.length; o--; ) if (!e[o](t, n, i)) return !1;
    return !0;
   } : e[0];
  }
  function g(e, t, n, i, o) {
   for (var r, a = [], s = 0, l = e.length, c = null != t; l > s; s++) (r = e[s]) && (!n || n(r, i, o)) && (a.push(r), 
   c && t.push(s));
   return a;
  }
  function v(e, t, n, i, r, a) {
   return i && !i[O] && (i = v(i)), r && !r[O] && (r = v(r, a)), o(function(o, a, s, l) {
    var c, u, d, p = [], f = [], h = a.length, m = o || x(t || "*", s.nodeType ? [ s ] : s, []), v = !e || !o && t ? m : g(m, p, e, s, l), b = n ? r || (o ? e : h || i) ? [] : a : v;
    if (n && n(v, b, s, l), i) for (c = g(b, f), i(c, [], s, l), u = c.length; u--; ) (d = c[u]) && (b[f[u]] = !(v[f[u]] = d));
    if (o) {
     if (r || e) {
      if (r) {
       for (c = [], u = b.length; u--; ) (d = b[u]) && c.push(v[u] = d);
       r(null, b = [], c, l);
      }
      for (u = b.length; u--; ) (d = b[u]) && (c = r ? nt.call(o, d) : p[u]) > -1 && (o[c] = !(a[c] = d));
     }
    } else b = g(b === a ? b.splice(h, b.length) : b), r ? r(null, a, b, l) : et.apply(a, b);
   });
  }
  function b(e) {
   for (var t, n, i, o = e.length, r = _.relative[e[0].type], a = r || _.relative[" "], s = r ? 1 : 0, l = h(function(e) {
    return e === t;
   }, a, !0), c = h(function(e) {
    return nt.call(t, e) > -1;
   }, a, !0), u = [ function(e, n, i) {
    return !r && (i || n !== I) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
   } ]; o > s; s++) if (n = _.relative[e[s].type]) u = [ h(m(u), n) ]; else {
    if (n = _.filter[e[s].type].apply(null, e[s].matches), n[O]) {
     for (i = ++s; o > i && !_.relative[e[i].type]; i++) ;
     return v(s > 1 && m(u), s > 1 && f(e.slice(0, s - 1).concat({
      value: " " === e[s - 2].type ? "*" : ""
     })).replace(ut, "$1"), n, i > s && b(e.slice(s, i)), o > i && b(e = e.slice(i)), o > i && f(e));
    }
    u.push(n);
   }
   return m(u);
  }
  function y(e, t) {
   var i = 0, r = t.length > 0, a = e.length > 0, s = function(o, s, l, c, u) {
    var d, p, f, h = [], m = 0, v = "0", b = o && [], y = null != u, x = I, w = o || a && _.find.TAG("*", u && s.parentNode || s), C = q += null == x ? 1 : Math.random() || .1;
    for (y && (I = s !== M && s, S = i); null != (d = w[v]); v++) {
     if (a && d) {
      for (p = 0; f = e[p++]; ) if (f(d, s, l)) {
       c.push(d);
       break;
      }
      y && (q = C, S = ++i);
     }
     r && ((d = !f && d) && m--, o && b.push(d));
    }
    if (m += v, r && v !== m) {
     for (p = 0; f = t[p++]; ) f(b, h, s, l);
     if (o) {
      if (m > 0) for (;v--; ) b[v] || h[v] || (h[v] = J.call(c));
      h = g(h);
     }
     et.apply(c, h), y && !o && h.length > 0 && m + t.length > 1 && n.uniqueSort(c);
    }
    return y && (q = C, I = x), b;
   };
   return r ? o(s) : s;
  }
  function x(e, t, i) {
   for (var o = 0, r = t.length; r > o; o++) n(e, t[o], i);
   return i;
  }
  function w(e, t, n, i) {
   var o, r, a, s, l, c = p(e);
   if (!i && 1 === c.length) {
    if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && k.getById && 9 === t.nodeType && $ && _.relative[r[1].type]) {
     if (t = (_.find.ID(a.matches[0].replace(kt, St), t) || [])[0], !t) return n;
     e = e.slice(r.shift().value.length);
    }
    for (o = vt.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o], !_.relative[s = a.type]); ) if ((l = _.find[s]) && (i = l(a.matches[0].replace(kt, St), ft.test(r[0].type) && t.parentNode || t))) {
     if (r.splice(o, 1), e = i.length && f(r), !e) return et.apply(n, i), n;
     break;
    }
   }
   return N(e, c)(i, t, !$, n, ft.test(e)), n;
  }
  var C, k, S, _, T, E, N, I, P, A, M, L, $, z, R, j, D, O = "sizzle" + -new Date(), F = e.document, q = 0, H = 0, B = i(), U = i(), G = i(), W = !1, V = function(e, t) {
   return e === t ? (W = !0, 0) : 0;
  }, X = typeof t, K = 1 << 31, Z = {}.hasOwnProperty, Y = [], J = Y.pop, Q = Y.push, et = Y.push, tt = Y.slice, nt = Y.indexOf || function(e) {
   for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
   return -1;
  }, it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ot = "[\\x20\\t\\r\\n\\f]", at = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", st = at.replace("w", "w#"), lt = "\\[" + ot + "*(" + at + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + st + ")|)|)" + ot + "*\\]", ct = ":(" + at + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + lt.replace(3, 8) + ")*)|.*)\\)|)", ut = new RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"), dt = new RegExp("^" + ot + "*," + ot + "*"), pt = new RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"), ft = new RegExp(ot + "*[+~]"), ht = new RegExp("=" + ot + "*([^\\]'\"]*)" + ot + "*\\]", "g"), mt = new RegExp(ct), gt = new RegExp("^" + st + "$"), vt = {
   ID: new RegExp("^#(" + at + ")"),
   CLASS: new RegExp("^\\.(" + at + ")"),
   TAG: new RegExp("^(" + at.replace("w", "w*") + ")"),
   ATTR: new RegExp("^" + lt),
   PSEUDO: new RegExp("^" + ct),
   CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
   bool: new RegExp("^(?:" + it + ")$", "i"),
   needsContext: new RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
  }, bt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xt = /^(?:input|select|textarea|button)$/i, wt = /^h\d$/i, Ct = /'|\\/g, kt = new RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"), St = function(e, t, n) {
   var i = "0x" + t - 65536;
   return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i);
  };
  try {
   et.apply(Y = tt.call(F.childNodes), F.childNodes), Y[F.childNodes.length].nodeType;
  } catch (_t) {
   et = {
    apply: Y.length ? function(e, t) {
     Q.apply(e, tt.call(t));
    } : function(e, t) {
     for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
     e.length = n - 1;
    }
   };
  }
  E = n.isXML = function(e) {
   var t = e && (e.ownerDocument || e).documentElement;
   return t ? "HTML" !== t.nodeName : !1;
  }, k = n.support = {}, A = n.setDocument = function(e) {
   var t = e ? e.ownerDocument || e : F, n = t.defaultView;
   return t !== M && 9 === t.nodeType && t.documentElement ? (M = t, L = t.documentElement, 
   $ = !E(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
    A();
   }), k.attributes = r(function(e) {
    return e.className = "i", !e.getAttribute("className");
   }), k.getElementsByTagName = r(function(e) {
    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
   }), k.getElementsByClassName = r(function(e) {
    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
    2 === e.getElementsByClassName("i").length;
   }), k.getById = r(function(e) {
    return L.appendChild(e).id = O, !t.getElementsByName || !t.getElementsByName(O).length;
   }), k.getById ? (_.find.ID = function(e, t) {
    if (typeof t.getElementById !== X && $) {
     var n = t.getElementById(e);
     return n && n.parentNode ? [ n ] : [];
    }
   }, _.filter.ID = function(e) {
    var t = e.replace(kt, St);
    return function(e) {
     return e.getAttribute("id") === t;
    };
   }) : (delete _.find.ID, _.filter.ID = function(e) {
    var t = e.replace(kt, St);
    return function(e) {
     var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
     return n && n.value === t;
    };
   }), _.find.TAG = k.getElementsByTagName ? function(e, t) {
    return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0;
   } : function(e, t) {
    var n, i = [], o = 0, r = t.getElementsByTagName(e);
    if ("*" === e) {
     for (;n = r[o++]; ) 1 === n.nodeType && i.push(n);
     return i;
    }
    return r;
   }, _.find.CLASS = k.getElementsByClassName && function(e, t) {
    return typeof t.getElementsByClassName !== X && $ ? t.getElementsByClassName(e) : void 0;
   }, R = [], z = [], (k.qsa = bt.test(t.querySelectorAll)) && (r(function(e) {
    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || z.push("\\[" + ot + "*(?:value|" + it + ")"), 
    e.querySelectorAll(":checked").length || z.push(":checked");
   }), r(function(e) {
    var n = t.createElement("input");
    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && z.push("[*^$]=" + ot + "*(?:''|\"\")"), 
    e.querySelectorAll(":enabled").length || z.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
    z.push(",.*:");
   })), (k.matchesSelector = bt.test(j = L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && r(function(e) {
    k.disconnectedMatch = j.call(e, "div"), j.call(e, "[s!='']:x"), R.push("!=", ct);
   }), z = z.length && new RegExp(z.join("|")), R = R.length && new RegExp(R.join("|")), 
   D = bt.test(L.contains) || L.compareDocumentPosition ? function(e, t) {
    var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
   } : function(e, t) {
    if (t) for (;t = t.parentNode; ) if (t === e) return !0;
    return !1;
   }, V = L.compareDocumentPosition ? function(e, n) {
    if (e === n) return W = !0, 0;
    var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
    return i ? 1 & i || !k.sortDetached && n.compareDocumentPosition(e) === i ? e === t || D(F, e) ? -1 : n === t || D(F, n) ? 1 : P ? nt.call(P, e) - nt.call(P, n) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
   } : function(e, n) {
    var i, o = 0, r = e.parentNode, a = n.parentNode, l = [ e ], c = [ n ];
    if (e === n) return W = !0, 0;
    if (!r || !a) return e === t ? -1 : n === t ? 1 : r ? -1 : a ? 1 : P ? nt.call(P, e) - nt.call(P, n) : 0;
    if (r === a) return s(e, n);
    for (i = e; i = i.parentNode; ) l.unshift(i);
    for (i = n; i = i.parentNode; ) c.unshift(i);
    for (;l[o] === c[o]; ) o++;
    return o ? s(l[o], c[o]) : l[o] === F ? -1 : c[o] === F ? 1 : 0;
   }, t) : M;
  }, n.matches = function(e, t) {
   return n(e, null, null, t);
  }, n.matchesSelector = function(e, t) {
   if ((e.ownerDocument || e) !== M && A(e), t = t.replace(ht, "='$1']"), !(!k.matchesSelector || !$ || R && R.test(t) || z && z.test(t))) try {
    var i = j.call(e, t);
    if (i || k.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
   } catch (o) {}
   return n(t, M, null, [ e ]).length > 0;
  }, n.contains = function(e, t) {
   return (e.ownerDocument || e) !== M && A(e), D(e, t);
  }, n.attr = function(e, n) {
   (e.ownerDocument || e) !== M && A(e);
   var i = _.attrHandle[n.toLowerCase()], o = i && Z.call(_.attrHandle, n.toLowerCase()) ? i(e, n, !$) : t;
   return o === t ? k.attributes || !$ ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o;
  }, n.error = function(e) {
   throw new Error("Syntax error, unrecognized expression: " + e);
  }, n.uniqueSort = function(e) {
   var t, n = [], i = 0, o = 0;
   if (W = !k.detectDuplicates, P = !k.sortStable && e.slice(0), e.sort(V), W) {
    for (;t = e[o++]; ) t === e[o] && (i = n.push(o));
    for (;i--; ) e.splice(n[i], 1);
   }
   return e;
  }, T = n.getText = function(e) {
   var t, n = "", i = 0, o = e.nodeType;
   if (o) {
    if (1 === o || 9 === o || 11 === o) {
     if ("string" == typeof e.textContent) return e.textContent;
     for (e = e.firstChild; e; e = e.nextSibling) n += T(e);
    } else if (3 === o || 4 === o) return e.nodeValue;
   } else for (;t = e[i]; i++) n += T(t);
   return n;
  }, _ = n.selectors = {
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
     return e[1] = e[1].replace(kt, St), e[3] = (e[4] || e[5] || "").replace(kt, St), 
     "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
    },
    CHILD: function(e) {
     return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), 
     e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), 
     e;
    },
    PSEUDO: function(e) {
     var n, i = !e[5] && e[2];
     return vt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && mt.test(i) && (n = p(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), 
     e[2] = i.slice(0, n)), e.slice(0, 3));
    }
   },
   filter: {
    TAG: function(e) {
     var t = e.replace(kt, St).toLowerCase();
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
     var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
     return 1 === i && 0 === o ? function(e) {
      return !!e.parentNode;
     } : function(t, n, l) {
      var c, u, d, p, f, h, m = r !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), b = !l && !s;
      if (g) {
       if (r) {
        for (;m; ) {
         for (d = t; d = d[m]; ) if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
         h = m = "only" === e && !h && "nextSibling";
        }
        return !0;
       }
       if (h = [ a ? g.firstChild : g.lastChild ], a && b) {
        for (u = g[O] || (g[O] = {}), c = u[e] || [], f = c[0] === q && c[1], p = c[0] === q && c[2], 
        d = f && g.childNodes[f]; d = ++f && d && d[m] || (p = f = 0) || h.pop(); ) if (1 === d.nodeType && ++p && d === t) {
         u[e] = [ q, f, p ];
         break;
        }
       } else if (b && (c = (t[O] || (t[O] = {}))[e]) && c[0] === q) p = c[1]; else for (;(d = ++f && d && d[m] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++p || (b && ((d[O] || (d[O] = {}))[e] = [ q, p ]), 
       d !== t)); ) ;
       return p -= o, p === i || 0 === p % i && p / i >= 0;
      }
     };
    },
    PSEUDO: function(e, t) {
     var i, r = _.pseudos[e] || _.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
     return r[O] ? r(t) : r.length > 1 ? (i = [ e, e, "", t ], _.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, n) {
      for (var i, o = r(e, t), a = o.length; a--; ) i = nt.call(e, o[a]), e[i] = !(n[i] = o[a]);
     }) : function(e) {
      return r(e, 0, i);
     }) : r;
    }
   },
   pseudos: {
    not: o(function(e) {
     var t = [], n = [], i = N(e.replace(ut, "$1"));
     return i[O] ? o(function(e, t, n, o) {
      for (var r, a = i(e, null, o, []), s = e.length; s--; ) (r = a[s]) && (e[s] = !(t[s] = r));
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
      return (t.textContent || t.innerText || T(t)).indexOf(e) > -1;
     };
    }),
    lang: o(function(e) {
     return gt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(kt, St).toLowerCase(), 
     function(t) {
      var n;
      do if (n = $ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
      n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
      return !1;
     };
    }),
    target: function(t) {
     var n = e.location && e.location.hash;
     return n && n.slice(1) === t.id;
    },
    root: function(e) {
     return e === L;
    },
    focus: function(e) {
     return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
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
     return !_.pseudos.empty(e);
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
     for (var i = 0 > n ? n + t : n; --i >= 0; ) e.push(i);
     return e;
    }),
    gt: u(function(e, t, n) {
     for (var i = 0 > n ? n + t : n; ++i < t; ) e.push(i);
     return e;
    })
   }
  }, _.pseudos.nth = _.pseudos.eq;
  for (C in {
   radio: !0,
   checkbox: !0,
   file: !0,
   password: !0,
   image: !0
  }) _.pseudos[C] = l(C);
  for (C in {
   submit: !0,
   reset: !0
  }) _.pseudos[C] = c(C);
  d.prototype = _.filters = _.pseudos, _.setFilters = new d(), N = n.compile = function(e, t) {
   var n, i = [], o = [], r = G[e + " "];
   if (!r) {
    for (t || (t = p(e)), n = t.length; n--; ) r = b(t[n]), r[O] ? i.push(r) : o.push(r);
    r = G(e, y(o, i));
   }
   return r;
  }, k.sortStable = O.split("").sort(V).join("") === O, k.detectDuplicates = W, A(), 
  k.sortDetached = r(function(e) {
   return 1 & e.compareDocumentPosition(M.createElement("div"));
  }), r(function(e) {
   return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
  }) || a("type|href|height|width", function(e, t, n) {
   return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
  }), k.attributes && r(function(e) {
   return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
  }) || a("value", function(e, t, n) {
   return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
  }), r(function(e) {
   return null == e.getAttribute("disabled");
  }) || a(it, function(e, t, n) {
   var i;
   return n ? void 0 : (i = e.getAttributeNode(t)) && i.specified ? i.value : e[t] === !0 ? t.toLowerCase() : null;
  }), rt.find = n, rt.expr = n.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = n.uniqueSort, 
  rt.text = n.getText, rt.isXMLDoc = n.isXML, rt.contains = n.contains;
 }(e);
 var ht = {};
 rt.Callbacks = function(e) {
  e = "string" == typeof e ? ht[e] || i(e) : rt.extend({}, e);
  var n, o, r, a, s, l, c = [], u = !e.once && [], d = function(t) {
   for (n = e.memory && t, o = !0, l = a || 0, a = 0, s = c.length, r = !0; c && s > l; l++) if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
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
       var a = r[0], s = rt.isFunction(e[t]) && e[t];
       o[r[1]](function() {
        var e = s && s.apply(this, arguments);
        e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === i ? n.promise() : this, s ? [ e ] : arguments);
       });
      }), e = null;
     }).promise();
    },
    promise: function(e) {
     return null != e ? rt.extend(e, i) : i;
    }
   }, o = {};
   return i.pipe = i.then, rt.each(t, function(e, r) {
    var a = r[2], s = r[3];
    i[r[1]] = a.add, s && a.add(function() {
     n = s;
    }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
     return o[r[0] + "With"](this === o ? i : this, arguments), this;
    }, o[r[0] + "With"] = a.fireWith;
   }), i.promise(o), e && e.call(o, o), o;
  },
  when: function(e) {
   var t, n, i, o = 0, r = et.call(arguments), a = r.length, s = 1 !== a || e && rt.isFunction(e.promise) ? a : 0, l = 1 === s ? e : rt.Deferred(), c = function(e, n, i) {
    return function(o) {
     n[e] = this, i[e] = arguments.length > 1 ? et.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i);
    };
   };
   if (a > 1) for (t = new Array(a), n = new Array(a), i = new Array(a); a > o; o++) r[o] && rt.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --s;
   return s || l.resolveWith(i, r), l.promise();
  }
 }), rt.support = function(t) {
  var n = G.createElement("input"), i = G.createDocumentFragment(), o = G.createElement("div"), r = G.createElement("select"), a = r.appendChild(G.createElement("option"));
  return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, 
  t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, 
  t.noCloneChecked = n.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !a.disabled, 
  n = G.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, 
  n.setAttribute("checked", "t"), n.setAttribute("name", "t"), i.appendChild(n), t.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, 
  t.focusinBubbles = "onfocusin" in e, o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", 
  t.clearCloneStyle = "content-box" === o.style.backgroundClip, rt(function() {
   var n, i, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", a = G.getElementsByTagName("body")[0];
   a && (n = G.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
   a.appendChild(n).appendChild(o), o.innerHTML = "", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
   rt.swap(a, null != a.style.zoom ? {
    zoom: 1
   } : {}, function() {
    t.boxSizing = 4 === o.offsetWidth;
   }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(o, null) || {}).top, 
   t.boxSizingReliable = "4px" === (e.getComputedStyle(o, null) || {
    width: "4px"
   }).width, i = o.appendChild(G.createElement("div")), i.style.cssText = o.style.cssText = r, 
   i.style.marginRight = i.style.width = "0", o.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), 
   a.removeChild(n));
  }), t) : t;
 }({});
 var mt, gt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, bt = /([A-Z])/g;
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
   var i, o, r, a = this.key(e), s = this.cache[a];
   if (n === t) this.cache[a] = {}; else {
    rt.isArray(n) ? o = n.concat(n.map(rt.camelCase)) : (r = rt.camelCase(n), n in s ? o = [ n, r ] : (o = r, 
    o = o in s ? [ o ] : o.match(st) || [])), i = o.length;
    for (;i--; ) delete s[o[i]];
   }
  },
  hasData: function(e) {
   return !rt.isEmptyObject(this.cache[e[this.expando]] || {});
  },
  discard: function(e) {
   e[this.expando] && delete this.cache[e[this.expando]];
  }
 }, mt = new o(), gt = new o(), rt.extend({
  acceptData: o.accepts,
  hasData: function(e) {
   return mt.hasData(e) || gt.hasData(e);
  },
  data: function(e, t, n) {
   return mt.access(e, t, n);
  },
  removeData: function(e, t) {
   mt.remove(e, t);
  },
  _data: function(e, t, n) {
   return gt.access(e, t, n);
  },
  _removeData: function(e, t) {
   gt.remove(e, t);
  }
 }), rt.fn.extend({
  data: function(e, n) {
   var i, o, a = this[0], s = 0, l = null;
   if (e === t) {
    if (this.length && (l = mt.get(a), 1 === a.nodeType && !gt.get(a, "hasDataAttrs"))) {
     for (i = a.attributes; s < i.length; s++) o = i[s].name, 0 === o.indexOf("data-") && (o = rt.camelCase(o.slice(5)), 
     r(a, o, l[o]));
     gt.set(a, "hasDataAttrs", !0);
    }
    return l;
   }
   return "object" == typeof e ? this.each(function() {
    mt.set(this, e);
   }) : rt.access(this, function(n) {
    var i, o = rt.camelCase(e);
    if (a && n === t) {
     if (i = mt.get(a, e), i !== t) return i;
     if (i = mt.get(a, o), i !== t) return i;
     if (i = r(a, o, t), i !== t) return i;
    } else this.each(function() {
     var i = mt.get(this, o);
     mt.set(this, o, n), -1 !== e.indexOf("-") && i !== t && mt.set(this, e, n);
    });
   }, null, n, arguments.length > 1, null, !0);
  },
  removeData: function(e) {
   return this.each(function() {
    mt.remove(this, e);
   });
  }
 }), rt.extend({
  queue: function(e, t, n) {
   var i;
   return e ? (t = (t || "fx") + "queue", i = gt.get(e, t), n && (!i || rt.isArray(n) ? i = gt.access(e, t, rt.makeArray(n)) : i.push(n)), 
   i || []) : void 0;
  },
  dequeue: function(e, t) {
   t = t || "fx";
   var n = rt.queue(e, t), i = n.length, o = n.shift(), r = rt._queueHooks(e, t), a = function() {
    rt.dequeue(e, t);
   };
   "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), 
   delete r.stop, o.call(e, a, r)), !i && r && r.empty.fire();
  },
  _queueHooks: function(e, t) {
   var n = t + "queueHooks";
   return gt.get(e, n) || gt.access(e, n, {
    empty: rt.Callbacks("once memory").add(function() {
     gt.remove(e, [ t + "queue", n ]);
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
   var i, o = 1, r = rt.Deferred(), a = this, s = this.length, l = function() {
    --o || r.resolveWith(a, [ a ]);
   };
   for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--; ) i = gt.get(a[s], e + "queueHooks"), 
   i && i.empty && (o++, i.empty.add(l));
   return l(), r.promise(n);
  }
 });
 var yt, xt, wt = /[\t\r\n\f]/g, Ct = /\r/g, kt = /^(?:input|select|textarea|button)$/i;
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
   var t, n, i, o, r, a = 0, s = this.length, l = "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).addClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(st) || []; s > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : " ")) {
    for (r = 0; o = t[r++]; ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
    n.className = rt.trim(i);
   }
   return this;
  },
  removeClass: function(e) {
   var t, n, i, o, r, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
   if (rt.isFunction(e)) return this.each(function(t) {
    rt(this).removeClass(e.call(this, t, this.className));
   });
   if (l) for (t = (e || "").match(st) || []; s > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : "")) {
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
    if ("string" === n) for (var t, i = 0, o = rt(this), r = e.match(st) || []; t = r[i++]; ) o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else (n === B || "boolean" === n) && (this.className && gt.set(this, "__className__", this.className), 
    this.className = this.className || e === !1 ? "" : gt.get(this, "__className__") || "");
   });
  },
  hasClass: function(e) {
   for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(wt, " ").indexOf(t) >= 0) return !0;
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
    n && "get" in n && (i = n.get(r, "value")) !== t ? i : (i = r.value, "string" == typeof i ? i.replace(Ct, "") : null == i ? "" : i);
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
     for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, a = r ? null : [], s = r ? o + 1 : i.length, l = 0 > o ? s : r ? o : 0; s > l; l++) if (n = i[l], 
     !(!n.selected && l !== o || (rt.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
      if (t = rt(n).val(), r) return t;
      a.push(t);
     }
     return a;
    },
    set: function(e, t) {
     for (var n, i, o = e.options, r = rt.makeArray(t), a = o.length; a--; ) i = o[a], 
     (i.selected = rt.inArray(rt(i).val(), r) >= 0) && (n = !0);
     return n || (e.selectedIndex = -1), r;
    }
   }
  },
  attr: function(e, n, i) {
   var o, r, a = e.nodeType;
   if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === B ? rt.prop(e, n, i) : (1 === a && rt.isXMLDoc(e) || (n = n.toLowerCase(), 
   o = rt.attrHooks[n] || (rt.expr.match.bool.test(n) ? xt : yt)), i === t ? o && "get" in o && null !== (r = o.get(e, n)) ? r : (r = rt.find.attr(e, n), 
   null == r ? t : r) : null !== i ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : (e.setAttribute(n, i + ""), 
   i) : (rt.removeAttr(e, n), void 0));
  },
  removeAttr: function(e, t) {
   var n, i, o = 0, r = t && t.match(st);
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
   var o, r, a, s = e.nodeType;
   if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !rt.isXMLDoc(e), a && (n = rt.propFix[n] || n, 
   r = rt.propHooks[n]), i !== t ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o : e[n] = i : r && "get" in r && null !== (o = r.get(e, n)) ? o : e[n];
  },
  propHooks: {
   tabIndex: {
    get: function(e) {
     return e.hasAttribute("tabindex") || kt.test(e.nodeName) || e.href ? e.tabIndex : -1;
    }
   }
  }
 }), xt = {
  set: function(e, t, n) {
   return t === !1 ? rt.removeAttr(e, n) : e.setAttribute(n, n), n;
  }
 }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(e, n) {
  var i = rt.expr.attrHandle[n] || rt.find.attr;
  rt.expr.attrHandle[n] = function(e, n, o) {
   var r = rt.expr.attrHandle[n], a = o ? t : (rt.expr.attrHandle[n] = t) != i(e, n, o) ? n.toLowerCase() : null;
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
 var St = /^key/, _t = /^(?:mouse|contextmenu)|click/, Tt = /^(?:focusinfocus|focusoutblur)$/, Et = /^([^.]*)(?:\.(.+)|)$/;
 rt.event = {
  global: {},
  add: function(e, n, i, o, r) {
   var a, s, l, c, u, d, p, f, h, m, g, v = gt.get(e);
   if (v) {
    for (i.handler && (a = i, i = a.handler, r = a.selector), i.guid || (i.guid = rt.guid++), 
    (c = v.events) || (c = v.events = {}), (s = v.handle) || (s = v.handle = function(e) {
     return typeof rt === B || e && rt.event.triggered === e.type ? t : rt.event.dispatch.apply(s.elem, arguments);
    }, s.elem = e), n = (n || "").match(st) || [ "" ], u = n.length; u--; ) l = Et.exec(n[u]) || [], 
    h = g = l[1], m = (l[2] || "").split(".").sort(), h && (p = rt.event.special[h] || {}, 
    h = (r ? p.delegateType : p.bindType) || h, p = rt.event.special[h] || {}, d = rt.extend({
     type: h,
     origType: g,
     data: o,
     handler: i,
     guid: i.guid,
     selector: r,
     needsContext: r && rt.expr.match.needsContext.test(r),
     namespace: m.join(".")
    }, a), (f = c[h]) || (f = c[h] = [], f.delegateCount = 0, p.setup && p.setup.call(e, o, m, s) !== !1 || e.addEventListener && e.addEventListener(h, s, !1)), 
    p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = i.guid)), r ? f.splice(f.delegateCount++, 0, d) : f.push(d), 
    rt.event.global[h] = !0);
    e = null;
   }
  },
  remove: function(e, t, n, i, o) {
   var r, a, s, l, c, u, d, p, f, h, m, g = gt.hasData(e) && gt.get(e);
   if (g && (l = g.events)) {
    for (t = (t || "").match(st) || [ "" ], c = t.length; c--; ) if (s = Et.exec(t[c]) || [], 
    f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
     for (d = rt.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, 
     p = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
     a = r = p.length; r--; ) u = p[r], !o && m !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), 
     u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
     a && !p.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || rt.removeEvent(e, f, g.handle), 
     delete l[f]);
    } else for (f in l) rt.event.remove(e, f + t[c], n, i, !0);
    rt.isEmptyObject(l) && (delete g.handle, gt.remove(e, "events"));
   }
  },
  trigger: function(n, i, o, r) {
   var a, s, l, c, u, d, p, f = [ o || G ], h = it.call(n, "type") ? n.type : n, m = it.call(n, "namespace") ? n.namespace.split(".") : [];
   if (s = l = o = o || G, 3 !== o.nodeType && 8 !== o.nodeType && !Tt.test(h + rt.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), 
   h = m.shift(), m.sort()), u = h.indexOf(":") < 0 && "on" + h, n = n[rt.expando] ? n : new rt.Event(h, "object" == typeof n && n), 
   n.isTrigger = r ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
   n.result = t, n.target || (n.target = o), i = null == i ? [ n ] : rt.makeArray(i, [ n ]), 
   p = rt.event.special[h] || {}, r || !p.trigger || p.trigger.apply(o, i) !== !1)) {
    if (!r && !p.noBubble && !rt.isWindow(o)) {
     for (c = p.delegateType || h, Tt.test(c + h) || (s = s.parentNode); s; s = s.parentNode) f.push(s), 
     l = s;
     l === (o.ownerDocument || G) && f.push(l.defaultView || l.parentWindow || e);
    }
    for (a = 0; (s = f[a++]) && !n.isPropagationStopped(); ) n.type = a > 1 ? c : p.bindType || h, 
    d = (gt.get(s, "events") || {})[n.type] && gt.get(s, "handle"), d && d.apply(s, i), 
    d = u && s[u], d && rt.acceptData(s) && d.apply && d.apply(s, i) === !1 && n.preventDefault();
    return n.type = h, r || n.isDefaultPrevented() || p._default && p._default.apply(f.pop(), i) !== !1 || !rt.acceptData(o) || u && rt.isFunction(o[h]) && !rt.isWindow(o) && (l = o[u], 
    l && (o[u] = null), rt.event.triggered = h, o[h](), rt.event.triggered = t, l && (o[u] = l)), 
    n.result;
   }
  },
  dispatch: function(e) {
   e = rt.event.fix(e);
   var n, i, o, r, a, s = [], l = et.call(arguments), c = (gt.get(this, "events") || {})[e.type] || [], u = rt.event.special[e.type] || {};
   if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
    for (s = rt.event.handlers.call(this, e, c), n = 0; (r = s[n++]) && !e.isPropagationStopped(); ) for (e.currentTarget = r.elem, 
    i = 0; (a = r.handlers[i++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, 
    e.data = a.data, o = ((rt.event.special[a.origType] || {}).handle || a.handler).apply(r.elem, l), 
    o !== t && (e.result = o) === !1 && (e.preventDefault(), e.stopPropagation()));
    return u.postDispatch && u.postDispatch.call(this, e), e.result;
   }
  },
  handlers: function(e, n) {
   var i, o, r, a, s = [], l = n.delegateCount, c = e.target;
   if (l && c.nodeType && (!e.button || "click" !== e.type)) for (;c !== this; c = c.parentNode || this) if (c.disabled !== !0 || "click" !== e.type) {
    for (o = [], i = 0; l > i; i++) a = n[i], r = a.selector + " ", o[r] === t && (o[r] = a.needsContext ? rt(r, this).index(c) >= 0 : rt.find(r, this, null, [ c ]).length), 
    o[r] && o.push(a);
    o.length && s.push({
     elem: c,
     handlers: o
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
    var i, o, r, a = n.button;
    return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G, 
    o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), 
    e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), 
    e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
   }
  },
  fix: function(e) {
   if (e[rt.expando]) return e;
   var t, n, i, o = e.type, r = e, a = this.fixHooks[o];
   for (a || (this.fixHooks[o] = a = _t.test(o) ? this.mouseHooks : St.test(o) ? this.keyHooks : {}), 
   i = a.props ? this.props.concat(a.props) : this.props, e = new rt.Event(r), t = i.length; t--; ) n = i[t], 
   e[n] = r[n];
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
    0 === n++ && G.addEventListener(e, i, !0);
   },
   teardown: function() {
    0 === --n && G.removeEventListener(e, i, !0);
   }
  };
 }), rt.fn.extend({
  on: function(e, n, i, o, r) {
   var a, l;
   if ("object" == typeof e) {
    "string" != typeof n && (i = i || n, n = t);
    for (l in e) this.on(l, n, i, e[l], r);
    return this;
   }
   if (null == i && null == o ? (o = n, i = n = t) : null == o && ("string" == typeof n ? (o = i, 
   i = t) : (o = i, i = n, n = t)), o === !1) o = s; else if (!o) return this;
   return 1 === r && (a = o, o = function(e) {
    return rt().off(e), a.apply(this, arguments);
   }, o.guid = a.guid || (a.guid = rt.guid++)), this.each(function() {
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
   return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = s), 
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
 var Nt = /^.[^:#\[\.,]*$/, It = /^(?:parents|prev(?:Until|All))/, Pt = rt.expr.match.needsContext, At = {
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
   return !!u(this, "string" == typeof e && Pt.test(e) ? rt(e) : e || [], !1).length;
  },
  closest: function(e, t) {
   for (var n, i = 0, o = this.length, r = [], a = Pt.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; o > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
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
   this.length > 1 && (At[e] || rt.unique(o), It.test(e) && o.reverse()), this.pushStack(o);
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
 var Mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Lt = /<([\w:]+)/, $t = /<|&#?\w+;/, zt = /<(?:script|style|link)/i, Rt = /^(?:checkbox|radio)$/i, jt = /checked\s*(?:[^=]|=\s*.checked.)/i, Dt = /^$|\/(?:java|ecma)script/i, Ot = /^true\/(.*)/, Ft = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, qt = {
  option: [ 1, "<select multiple='multiple'>", "</select>" ],
  thead: [ 1, "<table>", "</table>" ],
  col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
  tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
  _default: [ 0, "", "" ]
 };
 qt.optgroup = qt.option, qt.tbody = qt.tfoot = qt.colgroup = qt.caption = qt.thead, 
 qt.th = qt.td, rt.fn.extend({
  text: function(e) {
   return rt.access(this, function(e) {
    return e === t ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e));
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
   for (var n, i = e ? rt.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || rt.cleanData(g(n)), 
   n.parentNode && (t && rt.contains(n.ownerDocument, n) && h(g(n, "script")), n.parentNode.removeChild(n));
   return this;
  },
  empty: function() {
   for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (rt.cleanData(g(e, !1)), 
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
    if ("string" == typeof e && !zt.test(e) && !qt[(Lt.exec(e) || [ "", "" ])[1].toLowerCase()]) {
     e = e.replace(Mt, "<$1></$2>");
     try {
      for (;o > i; i++) n = this[i] || {}, 1 === n.nodeType && (rt.cleanData(g(n, !1)), 
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
   e = J.apply([], e);
   var i, o, r, a, s, l, c = 0, u = this.length, d = this, h = u - 1, m = e[0], v = rt.isFunction(m);
   if (v || !(1 >= u || "string" != typeof m || rt.support.checkClone) && jt.test(m)) return this.each(function(i) {
    var o = d.eq(i);
    v && (e[0] = m.call(this, i, o.html())), o.domManip(e, t, n);
   });
   if (u && (i = rt.buildFragment(e, this[0].ownerDocument, !1, !n && this), o = i.firstChild, 
   1 === i.childNodes.length && (i = o), o)) {
    for (r = rt.map(g(i, "script"), p), a = r.length; u > c; c++) s = i, c !== h && (s = rt.clone(s, !0, !0), 
    a && rt.merge(r, g(s, "script"))), t.call(this[c], s, c);
    if (a) for (l = r[r.length - 1].ownerDocument, rt.map(r, f), c = 0; a > c; c++) s = r[c], 
    Dt.test(s.type || "") && !gt.access(s, "globalEval") && rt.contains(l, s) && (s.src ? rt._evalUrl(s.src) : rt.globalEval(s.textContent.replace(Ft, "")));
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
   for (var n, i = [], o = rt(e), r = o.length - 1, a = 0; r >= a; a++) n = a === r ? this : this.clone(!0), 
   rt(o[a])[t](n), Q.apply(i, n.get());
   return this.pushStack(i);
  };
 }), rt.extend({
  clone: function(e, t, n) {
   var i, o, r, a, s = e.cloneNode(!0), l = rt.contains(e.ownerDocument, e);
   if (!(rt.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e))) for (a = g(s), 
   r = g(e), i = 0, o = r.length; o > i; i++) v(r[i], a[i]);
   if (t) if (n) for (r = r || g(e), a = a || g(s), i = 0, o = r.length; o > i; i++) m(r[i], a[i]); else m(e, s);
   return a = g(s, "script"), a.length > 0 && h(a, !l && g(e, "script")), s;
  },
  buildFragment: function(e, t, n, i) {
   for (var o, r, a, s, l, c, u = 0, d = e.length, p = t.createDocumentFragment(), f = []; d > u; u++) if (o = e[u], 
   o || 0 === o) if ("object" === rt.type(o)) rt.merge(f, o.nodeType ? [ o ] : o); else if ($t.test(o)) {
    for (r = r || p.appendChild(t.createElement("div")), a = (Lt.exec(o) || [ "", "" ])[1].toLowerCase(), 
    s = qt[a] || qt._default, r.innerHTML = s[1] + o.replace(Mt, "<$1></$2>") + s[2], 
    c = s[0]; c--; ) r = r.lastChild;
    rt.merge(f, r.childNodes), r = p.firstChild, r.textContent = "";
   } else f.push(t.createTextNode(o));
   for (p.textContent = "", u = 0; o = f[u++]; ) if ((!i || -1 === rt.inArray(o, i)) && (l = rt.contains(o.ownerDocument, o), 
   r = g(p.appendChild(o), "script"), l && h(r), n)) for (c = 0; o = r[c++]; ) Dt.test(o.type || "") && n.push(o);
   return p;
  },
  cleanData: function(e) {
   for (var n, i, r, a, s, l, c = rt.event.special, u = 0; (i = e[u]) !== t; u++) {
    if (o.accepts(i) && (s = i[gt.expando], s && (n = gt.cache[s]))) {
     if (r = Object.keys(n.events || {}), r.length) for (l = 0; (a = r[l]) !== t; l++) c[a] ? rt.event.remove(i, a) : rt.removeEvent(i, a, n.handle);
     gt.cache[s] && delete gt.cache[s];
    }
    delete mt.cache[i[mt.expando]];
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
 var Ht, Bt, Ut = /^(none|table(?!-c[ea]).+)/, Gt = /^margin/, Wt = new RegExp("^(" + at + ")(.*)$", "i"), Vt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"), Xt = new RegExp("^([+-])=(" + at + ")", "i"), Kt = {
  BODY: "block"
 }, Zt = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
 }, Yt = {
  letterSpacing: 0,
  fontWeight: 400
 }, Jt = [ "Top", "Right", "Bottom", "Left" ], Qt = [ "Webkit", "O", "Moz", "ms" ];
 rt.fn.extend({
  css: function(e, n) {
   return rt.access(this, function(e, n, i) {
    var o, r, a = {}, s = 0;
    if (rt.isArray(n)) {
     for (o = x(e), r = n.length; r > s; s++) a[n[s]] = rt.css(e, n[s], !1, o);
     return a;
    }
    return i !== t ? rt.style(e, n, i) : rt.css(e, n);
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
      var n = Ht(e, "opacity");
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
    var r, a, s, l = rt.camelCase(n), c = e.style;
    return n = rt.cssProps[l] || (rt.cssProps[l] = b(c, l)), s = rt.cssHooks[n] || rt.cssHooks[l], 
    i === t ? s && "get" in s && (r = s.get(e, !1, o)) !== t ? r : c[n] : (a = typeof i, 
    "string" === a && (r = Xt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(rt.css(e, n)), 
    a = "number"), null == i || "number" === a && isNaN(i) || ("number" !== a || rt.cssNumber[l] || (i += "px"), 
    rt.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (c[n] = "inherit"), 
    s && "set" in s && (i = s.set(e, i, o)) === t || (c[n] = i)), void 0);
   }
  },
  css: function(e, n, i, o) {
   var r, a, s, l = rt.camelCase(n);
   return n = rt.cssProps[l] || (rt.cssProps[l] = b(e.style, l)), s = rt.cssHooks[n] || rt.cssHooks[l], 
   s && "get" in s && (r = s.get(e, !0, i)), r === t && (r = Ht(e, n, o)), "normal" === r && n in Yt && (r = Yt[n]), 
   "" === i || i ? (a = parseFloat(r), i === !0 || rt.isNumeric(a) ? a || 0 : r) : r;
  }
 }), Ht = function(e, n, i) {
  var o, r, a, s = i || x(e), l = s ? s.getPropertyValue(n) || s[n] : t, c = e.style;
  return s && ("" !== l || rt.contains(e.ownerDocument, e) || (l = rt.style(e, n)), 
  Vt.test(l) && Gt.test(n) && (o = c.width, r = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, 
  l = s.width, c.width = o, c.minWidth = r, c.maxWidth = a)), l;
 }, rt.each([ "height", "width" ], function(e, t) {
  rt.cssHooks[t] = {
   get: function(e, n, i) {
    return n ? 0 === e.offsetWidth && Ut.test(rt.css(e, "display")) ? rt.swap(e, Zt, function() {
     return S(e, t, i);
    }) : S(e, t, i) : void 0;
   },
   set: function(e, n, i) {
    var o = i && x(e);
    return C(e, n, i ? k(e, t, i, rt.support.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, o), o) : 0);
   }
  };
 }), rt(function() {
  rt.support.reliableMarginRight || (rt.cssHooks.marginRight = {
   get: function(e, t) {
    return t ? rt.swap(e, {
     display: "inline-block"
    }, Ht, [ e, "marginRight" ]) : void 0;
   }
  }), !rt.support.pixelPosition && rt.fn.position && rt.each([ "top", "left" ], function(e, t) {
   rt.cssHooks[t] = {
    get: function(e, n) {
     return n ? (n = Ht(e, t), Vt.test(n) ? rt(e).position()[t] + "px" : n) : void 0;
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
    for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [ n ]; 4 > i; i++) o[e + Jt[i] + t] = r[i] || r[i - 2] || r[0];
    return o;
   }
  }, Gt.test(e) || (rt.cssHooks[e + t].set = C);
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
    return this.name && !rt(this).is(":disabled") && rn.test(this.nodeName) && !on.test(e) && (this.checked || !Rt.test(e));
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
  }); else for (i in e) E(i, e[i], n, r);
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
 var an, sn, ln = rt.now(), cn = /\?/, un = /#.*$/, dn = /([?&])_=[^&]*/, pn = /^(.*?):[ \t]*([^\r\n]*)$/gm, fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, hn = /^(?:GET|HEAD)$/, mn = /^\/\//, gn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, vn = rt.fn.load, bn = {}, yn = {}, xn = "*/".concat("*");
 try {
  sn = U.href;
 } catch (wn) {
  sn = G.createElement("a"), sn.href = "", sn = sn.href;
 }
 an = gn.exec(sn.toLowerCase()) || [], rt.fn.load = function(e, n, i) {
  if ("string" != typeof e && vn) return vn.apply(this, arguments);
  var o, r, a, s = this, l = e.indexOf(" ");
  return l >= 0 && (o = e.slice(l), e = e.slice(0, l)), rt.isFunction(n) ? (i = n, 
  n = t) : n && "object" == typeof n && (r = "POST"), s.length > 0 && rt.ajax({
   url: e,
   type: r,
   dataType: "html",
   data: n
  }).done(function(e) {
   a = arguments, s.html(o ? rt("<div>").append(rt.parseHTML(e)).find(o) : e);
  }).complete(i && function(e, t) {
   s.each(i, a || [ e.responseText, t, e ]);
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
   return t ? P(P(e, rt.ajaxSettings), t) : P(rt.ajaxSettings, e);
  },
  ajaxPrefilter: N(bn),
  ajaxTransport: N(yn),
  ajax: function(e, n) {
   function i(e, n, i, s) {
    var c, d, b, y, w, k = n;
    2 !== x && (x = 2, l && clearTimeout(l), o = t, a = s || "", C.readyState = e > 0 ? 4 : 0, 
    c = e >= 200 && 300 > e || 304 === e, i && (y = A(p, C, i)), y = M(p, y, C, c), 
    c ? (p.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (rt.lastModified[r] = w), 
    w = C.getResponseHeader("etag"), w && (rt.etag[r] = w)), 204 === e || "HEAD" === p.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, 
    d = y.data, b = y.error, c = !b)) : (b = k, (e || !k) && (k = "error", 0 > e && (e = 0))), 
    C.status = e, C.statusText = (n || k) + "", c ? m.resolveWith(f, [ d, k, C ]) : m.rejectWith(f, [ C, k, b ]), 
    C.statusCode(v), v = t, u && h.trigger(c ? "ajaxSuccess" : "ajaxError", [ C, p, c ? d : b ]), 
    g.fireWith(f, [ C, k ]), u && (h.trigger("ajaxComplete", [ C, p ]), --rt.active || rt.event.trigger("ajaxStop")));
   }
   "object" == typeof e && (n = e, e = t), n = n || {};
   var o, r, a, s, l, c, u, d, p = rt.ajaxSetup({}, n), f = p.context || p, h = p.context && (f.nodeType || f.jquery) ? rt(f) : rt.event, m = rt.Deferred(), g = rt.Callbacks("once memory"), v = p.statusCode || {}, b = {}, y = {}, x = 0, w = "canceled", C = {
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
     return x || (e = y[n] = y[n] || e, b[e] = t), this;
    },
    overrideMimeType: function(e) {
     return x || (p.mimeType = e), this;
    },
    statusCode: function(e) {
     var t;
     if (e) if (2 > x) for (t in e) v[t] = [ v[t], e[t] ]; else C.always(e[C.status]);
     return this;
    },
    abort: function(e) {
     var t = e || w;
     return o && o.abort(t), i(0, t), this;
    }
   };
   if (m.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || sn) + "").replace(un, "").replace(mn, an[1] + "//"), 
   p.type = n.method || n.type || p.method || p.type, p.dataTypes = rt.trim(p.dataType || "*").toLowerCase().match(st) || [ "" ], 
   null == p.crossDomain && (c = gn.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] === an[1] && c[2] === an[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (an[3] || ("http:" === an[1] ? "80" : "443")))), 
   p.data && p.processData && "string" != typeof p.data && (p.data = rt.param(p.data, p.traditional)), 
   I(bn, p, n, C), 2 === x) return C;
   u = p.global, u && 0 === rt.active++ && rt.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
   p.hasContent = !hn.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (cn.test(r) ? "&" : "?") + p.data, 
   delete p.data), p.cache === !1 && (p.url = dn.test(r) ? r.replace(dn, "$1_=" + ln++) : r + (cn.test(r) ? "&" : "?") + "_=" + ln++)), 
   p.ifModified && (rt.lastModified[r] && C.setRequestHeader("If-Modified-Since", rt.lastModified[r]), 
   rt.etag[r] && C.setRequestHeader("If-None-Match", rt.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), 
   C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xn + "; q=0.01" : "") : p.accepts["*"]);
   for (d in p.headers) C.setRequestHeader(d, p.headers[d]);
   if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === x)) return C.abort();
   w = "abort";
   for (d in {
    success: 1,
    error: 1,
    complete: 1
   }) C[d](p[d]);
   if (o = I(yn, p, n, C)) {
    C.readyState = 1, u && h.trigger("ajaxSend", [ C, p ]), p.async && p.timeout > 0 && (l = setTimeout(function() {
     C.abort("timeout");
    }, p.timeout));
    try {
     x = 1, o.send(b, i);
    } catch (k) {
     if (!(2 > x)) throw k;
     i(-1, k);
    }
   } else i(-1, "No Transport");
   return C;
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
     }), G.head.appendChild(t[0]);
    },
    abort: function() {
     n && n();
    }
   };
  }
 });
 var Cn = [], kn = /(=)\?(?=&|$)|\?\?/;
 rt.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
   var e = Cn.pop() || rt.expando + "_" + ln++;
   return this[e] = !0, e;
  }
 }), rt.ajaxPrefilter("json jsonp", function(n, i, o) {
  var r, a, s, l = n.jsonp !== !1 && (kn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && kn.test(n.data) && "data");
  return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = rt.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
  l ? n[l] = n[l].replace(kn, "$1" + r) : n.jsonp !== !1 && (n.url += (cn.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), 
  n.converters["script json"] = function() {
   return s || rt.error(r + " was not called"), s[0];
  }, n.dataTypes[0] = "json", a = e[r], e[r] = function() {
   s = arguments;
  }, o.always(function() {
   e[r] = a, n[r] && (n.jsonpCallback = i.jsonpCallback, Cn.push(r)), s && rt.isFunction(a) && a(s[0]), 
   s = a = t;
  }), "script") : void 0;
 }), rt.ajaxSettings.xhr = function() {
  try {
   return new XMLHttpRequest();
  } catch (e) {}
 };
 var Sn = rt.ajaxSettings.xhr(), _n = {
  0: 200,
  1223: 204
 }, Tn = 0, En = {};
 e.ActiveXObject && rt(e).on("unload", function() {
  for (var e in En) En[e]();
  En = t;
 }), rt.support.cors = !!Sn && "withCredentials" in Sn, rt.support.ajax = Sn = !!Sn, 
 rt.ajaxTransport(function(e) {
  var n;
  return rt.support.cors || Sn && !e.crossDomain ? {
   send: function(i, o) {
    var r, a, s = e.xhr();
    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) s[r] = e.xhrFields[r];
    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
    for (r in i) s.setRequestHeader(r, i[r]);
    n = function(e) {
     return function() {
      n && (delete En[a], n = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? o(s.status || 404, s.statusText) : o(_n[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
       text: s.responseText
      } : t, s.getAllResponseHeaders()));
     };
    }, s.onload = n(), s.onerror = n("error"), n = En[a = Tn++] = n("abort"), s.send(e.hasContent && e.data || null);
   },
   abort: function() {
    n && n();
   }
  } : void 0;
 });
 var Nn, In, Pn = /^(?:toggle|show|hide)$/, An = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"), Mn = /queueHooks$/, Ln = [ j ], $n = {
  "*": [ function(e, t) {
   var n = this.createTween(e, t), i = n.cur(), o = An.exec(t), r = o && o[3] || (rt.cssNumber[e] ? "" : "px"), a = (rt.cssNumber[e] || "px" !== r && +i) && An.exec(rt.css(n.elem, e)), s = 1, l = 20;
   if (a && a[3] !== r) {
    r = r || a[3], o = o || [], a = +i || 1;
    do s = s || ".5", a /= s, rt.style(n.elem, e, a + r); while (s !== (s = n.cur() / i) && 1 !== s && --l);
   }
   return o && (a = n.start = +a || +i || 0, n.unit = r, n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2]), 
   n;
  } ]
 };
 rt.Animation = rt.extend(z, {
  tweener: function(e, t) {
   rt.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
   for (var n, i = 0, o = e.length; o > i; i++) n = e[i], $n[n] = $n[n] || [], $n[n].unshift(t);
  },
  prefilter: function(e, t) {
   t ? Ln.unshift(e) : Ln.push(e);
  }
 }), rt.Tween = D, D.prototype = {
  constructor: D,
  init: function(e, t, n, i, o, r) {
   this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), 
   this.end = i, this.unit = r || (rt.cssNumber[n] ? "" : "px");
  },
  cur: function() {
   var e = D.propHooks[this.prop];
   return e && e.get ? e.get(this) : D.propHooks._default.get(this);
  },
  run: function(e) {
   var t, n = D.propHooks[this.prop];
   return this.pos = t = this.options.duration ? rt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
   this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
   n && n.set ? n.set(this) : D.propHooks._default.set(this), this;
  }
 }, D.prototype.init.prototype = D.prototype, D.propHooks = {
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
 }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
  set: function(e) {
   e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
  }
 }, rt.each([ "toggle", "show", "hide" ], function(e, t) {
  var n = rt.fn[t];
  rt.fn[t] = function(e, i, o) {
   return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, i, o);
  };
 }), rt.fn.extend({
  fadeTo: function(e, t, n, i) {
   return this.filter(y).css("opacity", 0).show().end().animate({
    opacity: t
   }, e, n, i);
  },
  animate: function(e, t, n, i) {
   var o = rt.isEmptyObject(e), r = rt.speed(t, n, i), a = function() {
    var t = z(this, rt.extend({}, e), r);
    (o || gt.get(this, "finish")) && t.stop(!0);
   };
   return a.finish = a, o || r.queue === !1 ? this.each(a) : this.queue(r.queue, a);
  },
  stop: function(e, n, i) {
   var o = function(e) {
    var t = e.stop;
    delete e.stop, t(i);
   };
   return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
   this.each(function() {
    var t = !0, n = null != e && e + "queueHooks", r = rt.timers, a = gt.get(this);
    if (n) a[n] && a[n].stop && o(a[n]); else for (n in a) a[n] && a[n].stop && Mn.test(n) && o(a[n]);
    for (n = r.length; n--; ) r[n].elem !== this || null != e && r[n].queue !== e || (r[n].anim.stop(i), 
    t = !1, r.splice(n, 1));
    (t || !i) && rt.dequeue(this, e);
   });
  },
  finish: function(e) {
   return e !== !1 && (e = e || "fx"), this.each(function() {
    var t, n = gt.get(this), i = n[e + "queue"], o = n[e + "queueHooks"], r = rt.timers, a = i ? i.length : 0;
    for (n.finish = !0, rt.queue(this, e, []), o && o.stop && o.stop.call(this, !0), 
    t = r.length; t--; ) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), 
    r.splice(t, 1));
    for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
    delete n.finish;
   });
  }
 }), rt.each({
  slideDown: O("show"),
  slideUp: O("hide"),
  slideToggle: O("toggle"),
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
 }, rt.timers = [], rt.fx = D.prototype.init, rt.fx.tick = function() {
  var e, n = rt.timers, i = 0;
  for (Nn = rt.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
  n.length || rt.fx.stop(), Nn = t;
 }, rt.fx.timer = function(e) {
  e() && rt.timers.push(e) && rt.fx.start();
 }, rt.fx.interval = 13, rt.fx.start = function() {
  In || (In = setInterval(rt.fx.tick, rt.fx.interval));
 }, rt.fx.stop = function() {
  clearInterval(In), In = null;
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
  }, a = o && o.ownerDocument;
  if (a) return n = a.documentElement, rt.contains(n, o) ? (typeof o.getBoundingClientRect !== B && (r = o.getBoundingClientRect()), 
  i = F(a), {
   top: r.top + i.pageYOffset - n.clientTop,
   left: r.left + i.pageXOffset - n.clientLeft
  }) : r;
 }, rt.offset = {
  setOffset: function(e, t, n) {
   var i, o, r, a, s, l, c, u = rt.css(e, "position"), d = rt(e), p = {};
   "static" === u && (e.style.position = "relative"), s = d.offset(), r = rt.css(e, "top"), 
   l = rt.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1, 
   c ? (i = d.position(), a = i.top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), 
   rt.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), 
   null != t.left && (p.left = t.left - s.left + o), "using" in t ? t.using.call(e, p) : d.css(p);
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
    for (var e = this.offsetParent || W; e && !rt.nodeName(e, "html") && "static" === rt.css(e, "position"); ) e = e.offsetParent;
    return e || W;
   });
  }
 }), rt.each({
  scrollLeft: "pageXOffset",
  scrollTop: "pageYOffset"
 }, function(n, i) {
  var o = "pageYOffset" === i;
  rt.fn[n] = function(r) {
   return rt.access(this, function(n, r, a) {
    var s = F(n);
    return a === t ? s ? s[i] : n[r] : (s ? s.scrollTo(o ? e.pageXOffset : a, o ? a : e.pageYOffset) : n[r] = a, 
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
    var a = arguments.length && (i || "boolean" != typeof o), s = i || (o === !0 || r === !0 ? "margin" : "border");
    return rt.access(this, function(n, i, o) {
     var r;
     return rt.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (r = n.documentElement, 
     Math.max(n.body["scroll" + e], r["scroll" + e], n.body["offset" + e], r["offset" + e], r["client" + e])) : o === t ? rt.css(n, i, s) : rt.style(n, i, o, s);
    }, n, a ? o : t, a, null);
   };
  });
 }), rt.fn.size = function() {
  return this.length;
 }, rt.fn.andSelf = rt.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = rt : "function" == typeof define && define.amd && define("jquery", [], function() {
  return rt;
 }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = rt);
})(window), function() {
 var e = this, t = e._, n = {}, i = Array.prototype, o = Object.prototype, r = Function.prototype, a = i.push, s = i.slice, l = i.concat, c = o.toString, u = o.hasOwnProperty, d = i.forEach, p = i.map, f = i.reduce, h = i.reduceRight, m = i.filter, g = i.every, v = i.some, b = i.indexOf, y = i.lastIndexOf, x = Array.isArray, w = Object.keys, C = r.bind, k = function(e) {
  return e instanceof k ? e : this instanceof k ? (this._wrapped = e, void 0) : new k(e);
 };
 "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), 
 exports._ = k) : e._ = k, k.VERSION = "1.5.1";
 var S = k.each = k.forEach = function(e, t, i) {
  if (null != e) if (d && e.forEach === d) e.forEach(t, i); else if (e.length === +e.length) {
   for (var o = 0, r = e.length; r > o; o++) if (t.call(i, e[o], o, e) === n) return;
  } else for (var a in e) if (k.has(e, a) && t.call(i, e[a], a, e) === n) return;
 };
 k.map = k.collect = function(e, t, n) {
  var i = [];
  return null == e ? i : p && e.map === p ? e.map(t, n) : (S(e, function(e, o, r) {
   i.push(t.call(n, e, o, r));
  }), i);
 };
 var _ = "Reduce of empty array with no initial value";
 k.reduce = k.foldl = k.inject = function(e, t, n, i) {
  var o = arguments.length > 2;
  if (null == e && (e = []), f && e.reduce === f) return i && (t = k.bind(t, i)), 
  o ? e.reduce(t, n) : e.reduce(t);
  if (S(e, function(e, r, a) {
   o ? n = t.call(i, n, e, r, a) : (n = e, o = !0);
  }), !o) throw new TypeError(_);
  return n;
 }, k.reduceRight = k.foldr = function(e, t, n, i) {
  var o = arguments.length > 2;
  if (null == e && (e = []), h && e.reduceRight === h) return i && (t = k.bind(t, i)), 
  o ? e.reduceRight(t, n) : e.reduceRight(t);
  var r = e.length;
  if (r !== +r) {
   var a = k.keys(e);
   r = a.length;
  }
  if (S(e, function(s, l, c) {
   l = a ? a[--r] : --r, o ? n = t.call(i, n, e[l], l, c) : (n = e[l], o = !0);
  }), !o) throw new TypeError(_);
  return n;
 }, k.find = k.detect = function(e, t, n) {
  var i;
  return T(e, function(e, o, r) {
   return t.call(n, e, o, r) ? (i = e, !0) : void 0;
  }), i;
 }, k.filter = k.select = function(e, t, n) {
  var i = [];
  return null == e ? i : m && e.filter === m ? e.filter(t, n) : (S(e, function(e, o, r) {
   t.call(n, e, o, r) && i.push(e);
  }), i);
 }, k.reject = function(e, t, n) {
  return k.filter(e, function(e, i, o) {
   return !t.call(n, e, i, o);
  }, n);
 }, k.every = k.all = function(e, t, i) {
  t || (t = k.identity);
  var o = !0;
  return null == e ? o : g && e.every === g ? e.every(t, i) : (S(e, function(e, r, a) {
   return (o = o && t.call(i, e, r, a)) ? void 0 : n;
  }), !!o);
 };
 var T = k.some = k.any = function(e, t, i) {
  t || (t = k.identity);
  var o = !1;
  return null == e ? o : v && e.some === v ? e.some(t, i) : (S(e, function(e, r, a) {
   return o || (o = t.call(i, e, r, a)) ? n : void 0;
  }), !!o);
 };
 k.contains = k.include = function(e, t) {
  return null == e ? !1 : b && e.indexOf === b ? -1 != e.indexOf(t) : T(e, function(e) {
   return e === t;
  });
 }, k.invoke = function(e, t) {
  var n = s.call(arguments, 2), i = k.isFunction(t);
  return k.map(e, function(e) {
   return (i ? t : e[t]).apply(e, n);
  });
 }, k.pluck = function(e, t) {
  return k.map(e, function(e) {
   return e[t];
  });
 }, k.where = function(e, t, n) {
  return k.isEmpty(t) ? n ? void 0 : [] : k[n ? "find" : "filter"](e, function(e) {
   for (var n in t) if (t[n] !== e[n]) return !1;
   return !0;
  });
 }, k.findWhere = function(e, t) {
  return k.where(e, t, !0);
 }, k.max = function(e, t, n) {
  if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
  if (!t && k.isEmpty(e)) return -1/0;
  var i = {
   computed: -1/0,
   value: -1/0
  };
  return S(e, function(e, o, r) {
   var a = t ? t.call(n, e, o, r) : e;
   a > i.computed && (i = {
    value: e,
    computed: a
   });
  }), i.value;
 }, k.min = function(e, t, n) {
  if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
  if (!t && k.isEmpty(e)) return 1/0;
  var i = {
   computed: 1/0,
   value: 1/0
  };
  return S(e, function(e, o, r) {
   var a = t ? t.call(n, e, o, r) : e;
   a < i.computed && (i = {
    value: e,
    computed: a
   });
  }), i.value;
 }, k.shuffle = function(e) {
  var t, n = 0, i = [];
  return S(e, function(e) {
   t = k.random(n++), i[n - 1] = i[t], i[t] = e;
  }), i;
 };
 var E = function(e) {
  return k.isFunction(e) ? e : function(t) {
   return t[e];
  };
 };
 k.sortBy = function(e, t, n) {
  var i = E(t);
  return k.pluck(k.map(e, function(e, t, o) {
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
 var N = function(e, t, n, i) {
  var o = {}, r = E(null == t ? k.identity : t);
  return S(e, function(t, a) {
   var s = r.call(n, t, a, e);
   i(o, s, t);
  }), o;
 };
 k.groupBy = function(e, t, n) {
  return N(e, t, n, function(e, t, n) {
   (k.has(e, t) ? e[t] : e[t] = []).push(n);
  });
 }, k.countBy = function(e, t, n) {
  return N(e, t, n, function(e, t) {
   k.has(e, t) || (e[t] = 0), e[t]++;
  });
 }, k.sortedIndex = function(e, t, n, i) {
  n = null == n ? k.identity : E(n);
  for (var o = n.call(i, t), r = 0, a = e.length; a > r; ) {
   var s = r + a >>> 1;
   n.call(i, e[s]) < o ? r = s + 1 : a = s;
  }
  return r;
 }, k.toArray = function(e) {
  return e ? k.isArray(e) ? s.call(e) : e.length === +e.length ? k.map(e, k.identity) : k.values(e) : [];
 }, k.size = function(e) {
  return null == e ? 0 : e.length === +e.length ? e.length : k.keys(e).length;
 }, k.first = k.head = k.take = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t);
 }, k.initial = function(e, t, n) {
  return s.call(e, 0, e.length - (null == t || n ? 1 : t));
 }, k.last = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0));
 }, k.rest = k.tail = k.drop = function(e, t, n) {
  return s.call(e, null == t || n ? 1 : t);
 }, k.compact = function(e) {
  return k.filter(e, k.identity);
 };
 var I = function(e, t, n) {
  return t && k.every(e, k.isArray) ? l.apply(n, e) : (S(e, function(e) {
   k.isArray(e) || k.isArguments(e) ? t ? a.apply(n, e) : I(e, t, n) : n.push(e);
  }), n);
 };
 k.flatten = function(e, t) {
  return I(e, t, []);
 }, k.without = function(e) {
  return k.difference(e, s.call(arguments, 1));
 }, k.uniq = k.unique = function(e, t, n, i) {
  k.isFunction(t) && (i = n, n = t, t = !1);
  var o = n ? k.map(e, n, i) : e, r = [], a = [];
  return S(o, function(n, i) {
   (t ? i && a[a.length - 1] === n : k.contains(a, n)) || (a.push(n), r.push(e[i]));
  }), r;
 }, k.union = function() {
  return k.uniq(k.flatten(arguments, !0));
 }, k.intersection = function(e) {
  var t = s.call(arguments, 1);
  return k.filter(k.uniq(e), function(e) {
   return k.every(t, function(t) {
    return k.indexOf(t, e) >= 0;
   });
  });
 }, k.difference = function(e) {
  var t = l.apply(i, s.call(arguments, 1));
  return k.filter(e, function(e) {
   return !k.contains(t, e);
  });
 }, k.zip = function() {
  for (var e = k.max(k.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++) t[n] = k.pluck(arguments, "" + n);
  return t;
 }, k.object = function(e, t) {
  if (null == e) return {};
  for (var n = {}, i = 0, o = e.length; o > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
  return n;
 }, k.indexOf = function(e, t, n) {
  if (null == e) return -1;
  var i = 0, o = e.length;
  if (n) {
   if ("number" != typeof n) return i = k.sortedIndex(e, t), e[i] === t ? i : -1;
   i = 0 > n ? Math.max(0, o + n) : n;
  }
  if (b && e.indexOf === b) return e.indexOf(t, n);
  for (;o > i; i++) if (e[i] === t) return i;
  return -1;
 }, k.lastIndexOf = function(e, t, n) {
  if (null == e) return -1;
  var i = null != n;
  if (y && e.lastIndexOf === y) return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
  for (var o = i ? n : e.length; o--; ) if (e[o] === t) return o;
  return -1;
 }, k.range = function(e, t, n) {
  arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
  for (var i = Math.max(Math.ceil((t - e) / n), 0), o = 0, r = new Array(i); i > o; ) r[o++] = e, 
  e += n;
  return r;
 };
 var P = function() {};
 k.bind = function(e, t) {
  var n, i;
  if (C && e.bind === C) return C.apply(e, s.call(arguments, 1));
  if (!k.isFunction(e)) throw new TypeError();
  return n = s.call(arguments, 2), i = function() {
   if (!(this instanceof i)) return e.apply(t, n.concat(s.call(arguments)));
   P.prototype = e.prototype;
   var o = new P();
   P.prototype = null;
   var r = e.apply(o, n.concat(s.call(arguments)));
   return Object(r) === r ? r : o;
  };
 }, k.partial = function(e) {
  var t = s.call(arguments, 1);
  return function() {
   return e.apply(this, t.concat(s.call(arguments)));
  };
 }, k.bindAll = function(e) {
  var t = s.call(arguments, 1);
  if (0 === t.length) throw new Error("bindAll must be passed function names");
  return S(t, function(t) {
   e[t] = k.bind(e[t], e);
  }), e;
 }, k.memoize = function(e, t) {
  var n = {};
  return t || (t = k.identity), function() {
   var i = t.apply(this, arguments);
   return k.has(n, i) ? n[i] : n[i] = e.apply(this, arguments);
  };
 }, k.delay = function(e, t) {
  var n = s.call(arguments, 2);
  return setTimeout(function() {
   return e.apply(null, n);
  }, t);
 }, k.defer = function(e) {
  return k.delay.apply(k, [ e, 1 ].concat(s.call(arguments, 1)));
 }, k.throttle = function(e, t, n) {
  var i, o, r, a = null, s = 0;
  n || (n = {});
  var l = function() {
   s = n.leading === !1 ? 0 : new Date(), a = null, r = e.apply(i, o);
  };
  return function() {
   var c = new Date();
   s || n.leading !== !1 || (s = c);
   var u = t - (c - s);
   return i = this, o = arguments, 0 >= u ? (clearTimeout(a), a = null, s = c, r = e.apply(i, o)) : a || n.trailing === !1 || (a = setTimeout(l, u)), 
   r;
  };
 }, k.debounce = function(e, t, n) {
  var i, o = null;
  return function() {
   var r = this, a = arguments, s = function() {
    o = null, n || (i = e.apply(r, a));
   }, l = n && !o;
   return clearTimeout(o), o = setTimeout(s, t), l && (i = e.apply(r, a)), i;
  };
 }, k.once = function(e) {
  var t, n = !1;
  return function() {
   return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t);
  };
 }, k.wrap = function(e, t) {
  return function() {
   var n = [ e ];
   return a.apply(n, arguments), t.apply(this, n);
  };
 }, k.compose = function() {
  var e = arguments;
  return function() {
   for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
   return t[0];
  };
 }, k.after = function(e, t) {
  return function() {
   return --e < 1 ? t.apply(this, arguments) : void 0;
  };
 }, k.keys = w || function(e) {
  if (e !== Object(e)) throw new TypeError("Invalid object");
  var t = [];
  for (var n in e) k.has(e, n) && t.push(n);
  return t;
 }, k.values = function(e) {
  var t = [];
  for (var n in e) k.has(e, n) && t.push(e[n]);
  return t;
 }, k.pairs = function(e) {
  var t = [];
  for (var n in e) k.has(e, n) && t.push([ n, e[n] ]);
  return t;
 }, k.invert = function(e) {
  var t = {};
  for (var n in e) k.has(e, n) && (t[e[n]] = n);
  return t;
 }, k.functions = k.methods = function(e) {
  var t = [];
  for (var n in e) k.isFunction(e[n]) && t.push(n);
  return t.sort();
 }, k.extend = function(e) {
  return S(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) e[n] = t[n];
  }), e;
 }, k.pick = function(e) {
  var t = {}, n = l.apply(i, s.call(arguments, 1));
  return S(n, function(n) {
   n in e && (t[n] = e[n]);
  }), t;
 }, k.omit = function(e) {
  var t = {}, n = l.apply(i, s.call(arguments, 1));
  for (var o in e) k.contains(n, o) || (t[o] = e[o]);
  return t;
 }, k.defaults = function(e) {
  return S(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) void 0 === e[n] && (e[n] = t[n]);
  }), e;
 }, k.clone = function(e) {
  return k.isObject(e) ? k.isArray(e) ? e.slice() : k.extend({}, e) : e;
 }, k.tap = function(e, t) {
  return t(e), e;
 };
 var A = function(e, t, n, i) {
  if (e === t) return 0 !== e || 1 / e == 1 / t;
  if (null == e || null == t) return e === t;
  e instanceof k && (e = e._wrapped), t instanceof k && (t = t._wrapped);
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
  var a = e.constructor, s = t.constructor;
  if (a !== s && !(k.isFunction(a) && a instanceof a && k.isFunction(s) && s instanceof s)) return !1;
  n.push(e), i.push(t);
  var l = 0, u = !0;
  if ("[object Array]" == o) {
   if (l = e.length, u = l == t.length) for (;l-- && (u = A(e[l], t[l], n, i)); ) ;
  } else {
   for (var d in e) if (k.has(e, d) && (l++, !(u = k.has(t, d) && A(e[d], t[d], n, i)))) break;
   if (u) {
    for (d in t) if (k.has(t, d) && !l--) break;
    u = !l;
   }
  }
  return n.pop(), i.pop(), u;
 };
 k.isEqual = function(e, t) {
  return A(e, t, [], []);
 }, k.isEmpty = function(e) {
  if (null == e) return !0;
  if (k.isArray(e) || k.isString(e)) return 0 === e.length;
  for (var t in e) if (k.has(e, t)) return !1;
  return !0;
 }, k.isElement = function(e) {
  return !(!e || 1 !== e.nodeType);
 }, k.isArray = x || function(e) {
  return "[object Array]" == c.call(e);
 }, k.isObject = function(e) {
  return e === Object(e);
 }, S([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(e) {
  k["is" + e] = function(t) {
   return c.call(t) == "[object " + e + "]";
  };
 }), k.isArguments(arguments) || (k.isArguments = function(e) {
  return !(!e || !k.has(e, "callee"));
 }), "function" != typeof /./ && (k.isFunction = function(e) {
  return "function" == typeof e;
 }), k.isFinite = function(e) {
  return isFinite(e) && !isNaN(parseFloat(e));
 }, k.isNaN = function(e) {
  return k.isNumber(e) && e != +e;
 }, k.isBoolean = function(e) {
  return e === !0 || e === !1 || "[object Boolean]" == c.call(e);
 }, k.isNull = function(e) {
  return null === e;
 }, k.isUndefined = function(e) {
  return void 0 === e;
 }, k.has = function(e, t) {
  return u.call(e, t);
 }, k.noConflict = function() {
  return e._ = t, this;
 }, k.identity = function(e) {
  return e;
 }, k.times = function(e, t, n) {
  for (var i = Array(Math.max(0, e)), o = 0; e > o; o++) i[o] = t.call(n, o);
  return i;
 }, k.random = function(e, t) {
  return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
 };
 var M = {
  escape: {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': "&quot;",
   "'": "&#x27;",
   "/": "&#x2F;"
  }
 };
 M.unescape = k.invert(M.escape);
 var L = {
  escape: new RegExp("[" + k.keys(M.escape).join("") + "]", "g"),
  unescape: new RegExp("(" + k.keys(M.unescape).join("|") + ")", "g")
 };
 k.each([ "escape", "unescape" ], function(e) {
  k[e] = function(t) {
   return null == t ? "" : ("" + t).replace(L[e], function(t) {
    return M[e][t];
   });
  };
 }), k.result = function(e, t) {
  if (null == e) return void 0;
  var n = e[t];
  return k.isFunction(n) ? n.call(e) : n;
 }, k.mixin = function(e) {
  S(k.functions(e), function(t) {
   var n = k[t] = e[t];
   k.prototype[t] = function() {
    var e = [ this._wrapped ];
    return a.apply(e, arguments), D.call(this, n.apply(k, e));
   };
  });
 };
 var $ = 0;
 k.uniqueId = function(e) {
  var t = ++$ + "";
  return e ? e + t : t;
 }, k.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
 };
 var z = /(.)^/, R = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "	": "t",
  "\u2028": "u2028",
  "\u2029": "u2029"
 }, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
 k.template = function(e, t, n) {
  var i;
  n = k.defaults({}, n, k.templateSettings);
  var o = new RegExp([ (n.escape || z).source, (n.interpolate || z).source, (n.evaluate || z).source ].join("|") + "|$", "g"), r = 0, a = "__p+='";
  e.replace(o, function(t, n, i, o, s) {
   return a += e.slice(r, s).replace(j, function(e) {
    return "\\" + R[e];
   }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), 
   o && (a += "';\n" + o + "\n__p+='"), r = s + t.length, t;
  }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
  try {
   i = new Function(n.variable || "obj", "_", a);
  } catch (s) {
   throw s.source = a, s;
  }
  if (t) return i(t, k);
  var l = function(e) {
   return i.call(this, e, k);
  };
  return l.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", l;
 }, k.chain = function(e) {
  return k(e).chain();
 };
 var D = function(e) {
  return this._chain ? k(e).chain() : e;
 };
 k.mixin(k), S([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
  var t = i[e];
  k.prototype[e] = function() {
   var n = this._wrapped;
   return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], 
   D.call(this, n);
  };
 }), S([ "concat", "join", "slice" ], function(e) {
  var t = i[e];
  k.prototype[e] = function() {
   return D.call(this, t.apply(this._wrapped, arguments));
  };
 }), k.extend(k.prototype, {
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
  var n, i = window.document, o = arguments, r = i.createElement(o[0]), a = o[1], s = 2, l = o.length, c = e.attrMap;
  if (1 === l) return r;
  if (("object" != typeof a || t(a)) && (--s, a = null), 1 === l - s && "string" == typeof o[s] && void 0 !== r.textContent) r.textContent = o[s]; else for (;l > s; ++s) n = o[s], 
  null != n && (t(n) || (n = i.createTextNode(n)), r.appendChild(n));
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

var saveAs = saveAs || navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(e) {
 var t = e.document, n = function() {
  return e.URL || e.webkitURL || e;
 }, i = e.URL || e.webkitURL || e, o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), r = !e.externalHost && "download" in o, a = function(n) {
  var i = t.createEvent("MouseEvents");
  i.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(i);
 }, s = e.webkitRequestFileSystem, l = e.requestFileSystem || s || e.mozRequestFileSystem, c = function(t) {
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
 }, m = function(t, i) {
  var c, f, m, g = this, v = t.type, b = !1, y = function() {
   var e = n().createObjectURL(t);
   return p.push(e), e;
  }, x = function() {
   h(g, "writestart progress write writeend".split(" "));
  }, w = function() {
   (b || !c) && (c = y(t)), f ? f.location.href = c : window.open(c, "_blank"), g.readyState = g.DONE, 
   x();
  }, C = function(e) {
   return function() {
    return g.readyState !== g.DONE ? e.apply(this, arguments) : void 0;
   };
  }, k = {
   create: !0,
   exclusive: !1
  };
  return g.readyState = g.INIT, i || (i = "download"), r ? (c = y(t), o.href = c, 
  o.download = i, a(o), g.readyState = g.DONE, x(), void 0) : (e.chrome && v && v !== u && (m = t.slice || t.webkitSlice, 
  t = m.call(t, 0, t.size, u), b = !0), s && "download" !== i && (i += ".download"), 
  (v === u || s) && (f = e), l ? (d += t.size, l(e.TEMPORARY, d, C(function(e) {
   e.root.getDirectory("saved", k, C(function(e) {
    var n = function() {
     e.getFile(i, k, C(function(e) {
      e.createWriter(C(function(n) {
       n.onwriteend = function(t) {
        f.location.href = e.toURL(), p.push(e), g.readyState = g.DONE, h(g, "writeend", t);
       }, n.onerror = function() {
        var e = n.error;
        e.code !== e.ABORT_ERR && w();
       }, "writestart progress write abort".split(" ").forEach(function(e) {
        n["on" + e] = g["on" + e];
       }), n.write(t), g.abort = function() {
        n.abort(), g.readyState = g.DONE;
       }, g.readyState = g.WRITING;
      }), w);
     }), w);
    };
    e.getFile(i, {
     create: !1
    }, C(function(e) {
     e.remove(), n();
    }), C(function(e) {
     e.code === e.NOT_FOUND_ERR ? n() : w();
    }));
   }), w);
  }), w), void 0) : (w(), void 0));
 }, g = m.prototype, v = function(e, t) {
  return new m(e, t);
 };
 return g.abort = function() {
  var e = this;
  e.readyState = e.DONE, h(e, "abort");
 }, g.readyState = g.INIT = 0, g.WRITING = 1, g.DONE = 2, g.error = g.onwritestart = g.onprogress = g.onwrite = g.onabort = g.onerror = g.onwriteend = null, 
 e.addEventListener("unload", f, !1), v;
}(self);

define("FileSaver", function() {}), "undefined" != typeof module && module.exports && (module.exports = printStackTrace), 
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
  return e.arguments && e.stack ? "chrome" : e.stack && e.sourceURL ? "safari" : e.stack && e.number ? "ie" : "string" == typeof e.message && "undefined" != typeof window && window.opera ? e.stacktrace ? e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? "opera9" : e.stack ? e.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : "opera10a" : "opera9" : e.stack && !e.fileName ? "chrome" : e.stack ? "firefox" : "other";
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
  for (var t = "{anonymous}", n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, i = e.stacktrace.split("\n"), o = [], r = 0, a = i.length; a > r; r += 2) {
   var s = n.exec(i[r]);
   if (s) {
    var l = s[4] + ":" + s[1] + ":" + s[2], c = s[3] || "global code";
    c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, t), 
    o.push(c + "@" + l + " -- " + i[r + 1].replace(/^\s+/, ""));
   }
  }
  return o;
 },
 opera10b: function(e) {
  for (var t = /^(.*)@(.+):(\d+)$/, n = e.stacktrace.split("\n"), i = [], o = 0, r = n.length; r > o; o++) {
   var a = t.exec(n[o]);
   if (a) {
    var s = a[1] ? a[1] + "()" : "global code";
    i.push(s + "@" + a[2] + ":" + a[3]);
   }
  }
  return i;
 },
 opera10a: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, i = e.stacktrace.split("\n"), o = [], r = 0, a = i.length; a > r; r += 2) {
   var s = n.exec(i[r]);
   if (s) {
    var l = s[3] || t;
    o.push(l + "()@" + s[2] + ":" + s[1] + " -- " + i[r + 1].replace(/^\s+/, ""));
   }
  }
  return o;
 },
 opera9: function(e) {
  for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)/i, i = e.message.split("\n"), o = [], r = 2, a = i.length; a > r; r += 2) {
   var s = n.exec(i[r]);
   s && o.push(t + "()@" + s[2] + ":" + s[1] + " -- " + i[r + 1].replace(/^\s+/, ""));
  }
  return o;
 },
 other: function(e) {
  for (var t, n, i = "{anonymous}", o = /function\s*([\w\-$]+)?\s*\(/i, r = [], a = 10; e && e.arguments && r.length < a; ) t = o.test(e.toString()) ? RegExp.$1 || i : i, 
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
    var a = i.exec(r[1]);
    if (a) {
     var s = a[1], l = a[2], c = a[3] || 0;
     if (s && this.isSameDomain(s) && l) {
      var u = this.guessAnonymousFunction(s, l, c);
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
  for (var n, i, o, r = /function\s+([^(]*?)\s*\(([^)]*)\)/, a = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, s = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, l = "", c = Math.min(t, 20), u = 0; c > u; ++u) if (n = e[t - u - 1], 
  o = n.indexOf("//"), o >= 0 && (n = n.substr(0, o)), n) {
   if (l = n + l, i = a.exec(l), i && i[1]) return i[1];
   if (i = r.exec(l), i && i[1]) return i[1];
   if (i = s.exec(l), i && i[1]) return i[1];
  }
  return "(?)";
 }
}, define("stacktrace", function() {}), define("utils", [ "jquery", "underscore", "crel", "FileSaver", "stacktrace" ], function($, _, crel) {
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
  return e.toLowerCase().replace(/\s/g, "-").replace(/![\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Nd}\p{Pc}]/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
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
  var r, a, s = "=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = [], u = i.length - i.length % 3;
  for (r = 0; u > r; r += 3) a = i[r] << 16 | i[r + 1] << 8 | i[r + 2], c.push(l.charAt(a >> 18)), 
  c.push(l.charAt(63 & a >> 12)), c.push(l.charAt(63 & a >> 6)), c.push(l.charAt(63 & a));
  switch (i.length - u) {
  case 1:
   a = i[r] << 16, c.push(l.charAt(a >> 18) + l.charAt(63 & a >> 12) + s + s);
   break;

  case 2:
   a = i[r] << 16 | i[r + 1] << 8, c.push(l.charAt(a >> 18) + l.charAt(63 & a >> 12) + l.charAt(63 & a >> 6) + s);
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

var VERSION = "2.0.2", MAIN_URL = "http://benweet.github.io/stackedit/", GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1", GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw", GOOGLE_SCOPES = [ "https://www.googleapis.com/auth/drive.install", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/blogger", "https://picasaweb.google.com/data/" ], GOOGLE_DRIVE_APP_ID = "241271498917", DROPBOX_APP_KEY = "lq6mwopab8wskas", DROPBOX_APP_SECRET = "851fgnucpezy84t", BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c", DEFAULT_FILE_TITLE = "Title", DEFAULT_FOLDER_NAME = "New folder", GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document", CHECK_ONLINE_PERIOD = 12e4, AJAX_TIMEOUT = 3e4, ASYNC_TASK_DEFAULT_TIMEOUT = 6e4, ASYNC_TASK_LONG_TIMEOUT = 18e4, SYNC_PERIOD = 18e4, USER_IDLE_THRESHOLD = 3e5, IMPORT_FILE_MAX_CONTENT_SIZE = 1e5, IMPORT_IMG_MAX_CONTENT_SIZE = 1e7, TEMPORARY_FILE_INDEX = "file.tempIndex", WELCOME_DOCUMENT_TITLE = "Welcome document", DOWNLOAD_PROXY_URL = "http://stackedit-download-proxy.herokuapp.com/", PICASA_PROXY_URL = "http://stackedit-picasa-proxy.herokuapp.com/", WORDPRESS_CLIENT_ID = "3185", WORDPRESS_PROXY_URL = "http://stackedit-wordpress-proxy.herokuapp.com/", SSH_PROXY_URL = "http://stackedit-ssh-proxy.herokuapp.com/", delayedFunction = void 0, BASE_URL = "http://localhost/stackedit/", GOOGLE_CLIENT_ID = "241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com", GITHUB_CLIENT_ID = "e47fef6055344579799d", GATEKEEPER_URL = "http://stackedit-gatekeeper-localhost.herokuapp.com/", TUMBLR_PROXY_URL = "http://stackedit-tumblr-proxy-local.herokuapp.com/";

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
  template: [ "<!DOCTYPE html>\n", "<html>\n", "<head>\n", '<meta charset="utf-8">\n', "<title><%= documentTitle %></title>\n", '<link rel="stylesheet" href="', MAIN_URL, 'css/main-min.css" />\n', '<script type="text/javascript" src="', MAIN_URL, 'lib/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n', "</head>\n", '<body><div class="container"><%= documentHTML %></div></body>\n', "</html>" ].join(""),
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
 var t, n, i, o, r, a = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, c = "undefined" != typeof location && location.href, u = c && location.protocol && location.protocol.replace(/\:/, ""), d = c && location.hostname, p = c && (location.port || void 0), f = {}, h = e.config && e.config() || {};
 return t = {
  version: "2.0.10",
  strip: function(e) {
   if (e) {
    e = e.replace(s, "");
    var t = e.match(l);
    t && (e = t[1]);
   } else e = "";
   return e;
  },
  jsEscape: function(e) {
   return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029");
  },
  createXhr: h.createXhr || function() {
   var e, t, n;
   if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest();
   if ("undefined" != typeof ActiveXObject) for (t = 0; 3 > t; t += 1) {
    n = a[t];
    try {
     e = new ActiveXObject(n);
    } catch (i) {}
    if (e) {
     a = [ n ];
     break;
    }
   }
   return e;
  },
  parseName: function(e) {
   var t, n, i, o = !1, r = e.indexOf("."), a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
   return -1 !== r && (!a || r > 1) ? (t = e.substring(0, r), n = e.substring(r + 1, e.length)) : t = e, 
   i = n || t, r = i.indexOf("!"), -1 !== r && (o = "strip" === i.substring(r + 1), 
   i = i.substring(0, r), n ? n = i : t = i), {
    moduleName: t,
    ext: n,
    strip: o
   };
  },
  xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
  useXhr: function(e, n, i, o) {
   var r, a, s, l = t.xdRegExp.exec(e);
   return l ? (r = l[2], a = l[3], a = a.split(":"), s = a[1], a = a[0], !(r && r !== n || a && a.toLowerCase() !== i.toLowerCase() || (s || a) && s !== o)) : !0;
  },
  finishLoad: function(e, n, i, o) {
   i = n ? t.strip(i) : i, h.isBuild && (f[e] = i), o(i);
  },
  load: function(e, n, i, o) {
   if (o.isBuild && !o.inlineText) return i(), void 0;
   h.isBuild = o.isBuild;
   var r = t.parseName(e), a = r.moduleName + (r.ext ? "." + r.ext : ""), s = n.toUrl(a), l = h.useXhr || t.useXhr;
   return 0 === s.indexOf("empty:") ? (i(), void 0) : (!c || l(s, u, d, p) ? t.get(s, function(n) {
    t.finishLoad(e, r.strip, n, i);
   }, function(e) {
    i.error && i.error(e);
   }) : n([ a ], function(e) {
    t.finishLoad(r.moduleName + "." + r.ext, r.strip, e, i);
   }), void 0);
  },
  write: function(e, n, i) {
   if (f.hasOwnProperty(n)) {
    var o = t.jsEscape(f[n]);
    i.asModule(e + "!" + n, "define(function () { return '" + o + "';});\n");
   }
  },
  writeFile: function(e, n, i, o, r) {
   var a = t.parseName(n), s = a.ext ? "." + a.ext : "", l = a.moduleName + s, c = i.toUrl(a.moduleName + s) + ".js";
   t.load(l, i, function() {
    var n = function(e) {
     return o(c, e);
    };
    n.asModule = function(e, t) {
     return o.asModule(e, c, t);
    }, t.write(e, l, n, r);
   }, r);
  }
 }, "node" === h.env || !h.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (n = require.nodeRequire("fs"), 
 t.get = function(e, t, i) {
  try {
   var o = n.readFileSync(e, "utf8");
   0 === o.indexOf("﻿") && (o = o.substring(1)), t(o);
  } catch (r) {
   i(r);
  }
 }) : "xhr" === h.env || !h.env && t.createXhr() ? t.get = function(e, n, i, o) {
  var r, a = t.createXhr();
  if (a.open("GET", e, !0), o) for (r in o) o.hasOwnProperty(r) && a.setRequestHeader(r.toLowerCase(), o[r]);
  h.onXhr && h.onXhr(a, e), a.onreadystatechange = function() {
   var t, o;
   4 === a.readyState && (t = a.status, t > 399 && 600 > t ? (o = new Error(e + " HTTP status: " + t), 
   o.xhr = a, i(o)) : n(a.responseText), h.onXhrComplete && h.onXhrComplete(a, e));
  }, a.send(null);
 } : "rhino" === h.env || !h.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
  var n, i, o = "utf-8", r = new java.io.File(e), a = java.lang.System.getProperty("line.separator"), s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r), o)), l = "";
  try {
   for (n = new java.lang.StringBuffer(), i = s.readLine(), i && i.length() && 65279 === i.charAt(0) && (i = i.substring(1)), 
   null !== i && n.append(i); null !== (i = s.readLine()); ) n.append(a), n.append(i);
   l = String(n.toString());
  } finally {
   s.close();
  }
  t(l);
 } : ("xpconnect" === h.env || !h.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (i = Components.classes, 
 o = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), 
 r = "@mozilla.org/windows-registry-key;1" in i, t.get = function(e, t) {
  var n, a, s, l = {};
  r && (e = e.replace(/\//g, "\\")), s = new FileUtils.File(e);
  try {
   n = i["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream), 
   n.init(s, 1, 0, !1), a = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream), 
   a.init(n, "utf-8", n.available(), o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), 
   a.readString(n.available(), l), a.close(), n.close(), t(l.value);
  } catch (c) {
   throw new Error((s && s.path || "") + ": " + c);
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
  var a = c.slice(c.length + o, c.length);
  f = e.first(a), d = c.slice(i, c.length + o), c = r.concat(p).concat(a);
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
   }), a = !0; 0 !== i.length; ) {
    var s = i[0];
    if (a === !1 && /(^| )wmd-title($| )/.test(s.className)) break;
    if (a = !1, "DIV" == s.tagName && "footnotes" == s.className) e.each(s.querySelectorAll("ol > li"), function(e) {
     var t = e.id.substring(3);
     y[t] = e;
    }); else try {
     r.appendChild(s);
    } catch (l) {
     r.appendChild(document.createTextNode(s.textContent));
    }
    i.shift();
   }
   o.appendChild(r);
  });
  var r = v;
  void 0 !== f && (r = document.getElementById("wmd-preview-section-" + f.id)), b.insertBefore(o, r), 
  v.innerHTML = "";
  var a = [];
  if (g === !0) {
   var s = t("ol");
   e.each(b.querySelectorAll("a.footnote"), function(e, t) {
    e.textContent = t + 1;
    var n = e.id.substring(6);
    a.push(n), s.appendChild(y[n].cloneNode(!0));
   }), a.length > 0 && v.appendChild(t("div", {
    "class": "footnotes"
   }, t("hr"), s)), y = e.pick(y, a);
  }
 }
 var a = new n("partialRendering", "Partial Rendering", !0);
 a.settingsBlock = i;
 var s = void 0, l = 0, c = [], u = void 0, d = [], p = [], f = void 0, h = !1, m = !1, g = !1;
 a.onSectionsCreated = function(t) {
  var n = [], i = "";
  g = !1, e.each(t, function(e) {
   e += "\n\n", m && (e = e.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, t) {
    return t ? (g = !0, i += e, "") : e;
   })), e = e.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t) {
    return t ? (i += e, "") : e;
   }), /\S/.test(e) && n.push({
    id: ++l,
    text: e
   });
  }), o(n, i);
 };
 var v = void 0, b = void 0, y = {};
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
  v = t("div", {
   id: "wmd-preview-section-footnotes",
   "class": "preview-content"
  }), b = document.getElementById("preview-contents"), b.appendChild(v);
 }, a.onFileSelected = function() {
  h = !0;
 }, a.onFileOpen = function() {
  s.extraExtensions && (m = e.some(s.extraExtensions, function(e) {
   return "footnotes" == e;
  }));
 }, a;
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
  var a = "gdrive", s = "dropbox", l = "sync." + a + ".", c = "sync." + s + ".";
  e.each(n, function(n) {
   var i = t.retrieveIndexArray(n + ".sync");
   e.each(i, function(e) {
    var t = {};
    0 === e.indexOf(l) ? (t.provider = a, t.id = e.substring(l.length), t.etag = localStorage[e + ".etag"], 
    t.contentCRC = localStorage[e + ".contentCRC"], t.titleCRC = localStorage[e + ".titleCRC"]) : 0 === e.indexOf(c) && (t.provider = s, 
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
 "v7" == i && (e.each(e.keys(localStorage), function(t) {
  var n = t.match(/(file\.\S+\.)\S+/);
  n && (e.has(localStorage, n[1] + "title") || localStorage.removeItem(t));
 }), i = "v8"), localStorage.version = i;
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
 var a = new i("googleAnalytics", "Google Analytics", !0);
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
 return '\n<div class="modal-dialog">\n	<div class="modal-content">\n\n		<div class="modal-header">\n			<button type="button" class="close" data-dismiss="modal"\n				aria-hidden="true">&times;</button>\n			<img data-stackedit-src="stackedit-promo.png" width="240" height="60" />\n		</div>\n		<div class="modal-body">\n			<dl>\n				<dt>About:</dt>\n				<dd>\n					<a target="_blank" href="https://github.com/benweet/stackedit/">GitHub\n						project</a> / <a target="_blank"\n						href="https://github.com/benweet/stackedit/issues">issue\n						tracker</a><br /> <a target="_blank"\n						href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome\n						app</a> (thanks for your review!)<br /> <a target="_blank"\n						href="https://twitter.com/stackedit/">Follow on Twitter</a><br />\n					<a target="_blank" href="https://www.facebook.com/stackedit/">Follow\n						on Facebook</a><br /> <a target="_blank"\n						href="https://plus.google.com/110816046787593496375"\n						rel="publisher">Follow on Google+</a><br />\n				</dd>\n			</dl>\n			<dl>\n				<dt>Developers:</dt>\n				<dd>\n					<a target="_blank" href="http://www.benoitschweblin.com">Benoit\n						Schweblin</a><br /> Pete Eigel (contributor)\n				</dd>\n			</dl>\n			<dl>\n				<dt>Credit:</dt>\n				<dd>\n					<% _.each(libraries, function(url, name) { %> <a target="_blank"\n						href="<%= url %>"><%= name %></a><br /> <% }); %>\n				</dd>\n			</dl>\n			<dl>\n				<dt>Related projects:</dt>\n				<dd>\n					<% _.each(projects, function(url, name) { %> <a target="_blank"\n						href="<%= url %>"><%= name %></a><br /> <% }); %>\n				</dd>\n			</dl>\n			<p>\n				StackEdit <%= version %><br /> Copyright 2013 <a\n					target="_blank" href="http://www.benoitschweblin.com">Benoit\n					Schweblin</a><br /> Licensed under an <a target="_blank"\n					href="http://www.apache.org/licenses/LICENSE-2.0">Apache\n					License</a>\n			</p>\n		</div>\n		<div class="modal-footer">\n			<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n		</div>\n	</div>\n</div>\n';
}), define("extensions/dialogAbout", [ "underscore", "utils", "classes/Extension", "text!html/dialogAbout.html", "config" ], function(e, t, n, i) {
 var o = new n("dialogAbout", 'Dialog "About"'), r = {
  Bootstrap: "http://getbootstrap.com/",
  "Bootstrap Tour": "http://bootstraptour.com/",
  crel: "https://github.com/KoryNunn/crel",
  "CSS Browser Selector": "https://github.com/rafaelp/css_browser_selector/",
  "Dropbox-js": "https://github.com/dropbox/dropbox-js",
  "FileSaver.js": "https://github.com/eligrey/FileSaver.js/",
  Fontello: "http://fontello.com/",
  "Font Awesome and others...": "res/libs/fontello/LICENSE.txt",
  Gatekeeper: "https://github.com/prose/gatekeeper",
  "Github.js": "https://github.com/michael/github",
  Glyphicons: "http://glyphicons.com/",
  "Highlight.js": "http://softwaremaniacs.org/soft/highlight/en/",
  jGrowl: "https://github.com/stanlemon/jGrowl/",
  jQuery: "http://jquery.com/",
  "jQuery Mouse Wheel Plugin": "https://github.com/brandonaaron/jquery-mousewheel",
  LESS: "http://lesscss.org/",
  MathJax: "http://www.mathjax.org/",
  Mousetrap: "http://craig.is/killing/mice",
  PageDown: "https://code.google.com/p/pagedown/",
  "Pagedown-extra": "https://github.com/jmcmanus/pagedown-extra/",
  Prettify: "https://code.google.com/p/google-code-prettify/",
  RequireJS: "http://requirejs.org/",
  "RequireJS LESS plugin": "https://github.com/guybedford/require-less",
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
 return o.onReady = function() {
  t.addModal("modal-about", e.template(i, {
   libraries: r,
   projects: a,
   version: VERSION
  }));
 }, o;
}), define("text!html/dialogManagePublicationLocation.html", [], function() {
 return '<div class="input-group">\n	<span class="input-group-addon" title="<%= publishAttributes.provider.providerName %>">\n		<i class="icon-provider-<%= publishAttributes.provider.providerId %>"></i>\n	</span> <input class="form-control" type="text"\n		value="<%= publishDesc %>" disabled />\n	<div class="input-group-btn">\n		<a class="btn btn-link remove-button" title="Remove this location"\n			data-publish-index="<%= publishAttributes.publishIndex %>"><i\n			class="icon-trash"></i></a>\n	</div>\n</div>\n';
}), define("extensions/dialogManagePublication", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManagePublicationLocation.html" ], function(e, t, n, i) {
 var o = new n("dialogManagePublication", 'Dialog "Manage publication"', !1, !0), r = void 0;
 o.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0, s = void 0, l = void 0, c = void 0, u = function(n) {
  if (void 0 === n || n === a) {
   t.size(a.publishLocations) > 0 ? (l.removeClass("hide"), c.addClass("hide")) : (l.addClass("hide"), 
   c.removeClass("hide"));
   var o = t.reduce(a.publishLocations, function(e, n) {
    var o = t.omit(n, "provider", "publishIndex", "sharingLink");
    return o.password && (o.password = "********"), o = JSON.stringify(o).replace(/{|}|"/g, "").replace(/,/g, ", "), 
    e + t.template(i, {
     publishAttributes: n,
     publishDesc: o
    });
   }, "");
   s.innerHTML = o, t.each(s.querySelectorAll(".remove-button"), function(t) {
    var n = e(t), i = a.publishLocations[n.data("publishIndex")];
    n.click(function() {
     a.removePublishLocation(i), r.onPublishRemoved(a, i);
    });
   });
  }
 };
 return o.onFileSelected = function(e) {
  a = e, u(e);
 }, o.onNewPublishSuccess = u, o.onPublishRemoved = u, o.onReady = function() {
  var t = document.querySelector(".modal-manage-publish");
  s = t.querySelector(".publish-list"), l = e(t.querySelectorAll(".msg-publish-list")), 
  c = e(t.querySelectorAll(".msg-no-publish"));
 }, o;
}), define("text!html/dialogManageSynchronizationLocation.html", [], function() {
 return '<div class="input-group">\n	<span class="input-group-addon"\n		title="<%= syncAttributes.provider.providerName %><%= syncAttributes.isRealtime ? \' (real time)\' : \'\' %>">\n		<i\n		class="icon-provider-<%= syncAttributes.provider.providerId %><%= syncAttributes.isRealtime ? \' realtime\' : \'\' %>"></i>\n	</span> <input class="form-control" type="text"\n		value="<%= syncDesc %>" disabled />\n	<div class="input-group-btn">\n		<a class="btn btn-link remove-button" title="Remove this location"\n			data-sync-index="<%= syncAttributes.syncIndex %>"><i class="icon-trash"></i></a>\n	</div>\n</div>\n';
}), define("extensions/dialogManageSynchronization", [ "jquery", "underscore", "classes/Extension", "text!html/dialogManageSynchronizationLocation.html" ], function(e, t, n, i) {
 var o = new n("dialogManageSynchronization", 'Dialog "Manage synchronization"', !1, !0), r = void 0;
 o.onEventMgrCreated = function(e) {
  r = e;
 };
 var a = void 0;
 o.onSynchronizerCreated = function(e) {
  a = e;
 };
 var s = void 0, l = void 0, c = void 0, u = void 0, d = function(n) {
  if (void 0 === n || n === s) {
   t.size(s.syncLocations) > 0 ? (c.removeClass("hide"), u.addClass("hide")) : (c.addClass("hide"), 
   u.removeClass("hide"));
   var o = t.reduce(s.syncLocations, function(e, n) {
    return e + t.template(i, {
     syncAttributes: n,
     syncDesc: n.id || n.path
    });
   }, "");
   l.innerHTML = o, t.each(l.querySelectorAll(".remove-button"), function(t) {
    var n = e(t), i = s.syncLocations[n.data("syncIndex")];
    n.click(function() {
     a.tryStopRealtimeSync(), s.removeSyncLocation(i), r.onSyncRemoved(s, i);
    });
   });
  }
 };
 return o.onFileSelected = function(e) {
  s = e, d(e);
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
  for (var o = [], r = 0, s = c.length; s > r; r++) o.push(c[r].selector);
  for (o = o.join(","); i.find(o).length; ) for (var r = 0, s = c.length; s > r; r++) $matches = i.find(c[r].selector + ':not(:has("' + o + '"))'), 
  $matches.each(function(e, n) {
   var i = t(n);
   i.before(c[r].replacement(i.html(), i)).remove();
  });
  return a(i.html());
 }, o = function(e) {
  return e.replace(/^[\n\r\f]+|[\n\r\f]+$/g, "");
 }, r = function(e) {
  return String(e).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
 }, a = function(e) {
  return e = e.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ""), e = e.replace(/\n\s+\n/g, "\n\n"), 
  e = e.replace(/\n{3,}/g, "\n\n"), e = r(e);
 }, s = function(e) {
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
   }), a = r.index(t) + 1;
   return n = o.is("ol") ? a + ".  " : "*   ", a == r.length && (t.parents("li").length || (i = "\n"), 
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
 function a(e) {
  p = void 0, r(e);
 }
 function s(e) {
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
  f = new o.converter(), e("#input-file-import-harddrive-markdown").change(a), e("#dropzone-import-harddrive-markdown, #wmd-input").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", a, !1);
  }), e("#input-file-import-harddrive-html").change(s), e("#dropzone-import-harddrive-html").each(function() {
   this.addEventListener("dragover", l, !1), this.addEventListener("drop", s, !1);
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
 var r = void 0, a = function(n) {
  if (n === r) {
   var i = r.title;
   document.title = "StackEdit - " + i, e(".file-title-navbar").html(r.composeTitle()), 
   e(".file-title").text(i), e(".input-file-title").val(i), void 0 !== o && t.defer(o.resizeAll);
  }
 };
 return i.onFileSelected = function(e) {
  r = e, a(e);
 }, i.onTitleChanged = a, i.onSyncExportSuccess = a, i.onSyncRemoved = a, i.onNewPublishSuccess = a, 
 i.onPublishRemoved = a, i;
}), function() {
 function e(e, t, n) {
  return e.addEventListener ? (e.addEventListener(t, n, !1), void 0) : (e.attachEvent("on" + t, n), 
  void 0);
 }
 function t(e) {
  if ("keypress" == e.type) {
   var t = String.fromCharCode(e.which);
   return e.shiftKey || (t = t.toLowerCase()), " " == t ? "space" : t;
  }
  return x[e.which] ? x[e.which] : w[e.which] ? w[e.which] : String.fromCharCode(e.which).toLowerCase();
 }
 function n(e, t) {
  return e.sort().join(",") === t.sort().join(",");
 }
 function i(e) {
  e = e || {};
  var t, n = !1;
  for (t in T) e[t] ? n = !0 : T[t] = 0;
  n || (I = !1);
 }
 function o(e, t, i, o, r, a) {
  var s, l, u = [], d = i.type;
  if (!S[e]) return [];
  for ("keyup" == d && c(e) && (t = [ e ]), s = 0; s < S[e].length; ++s) if (l = S[e][s], 
  (o || !l.seq || T[l.seq] == l.level) && d == l.action && ("keypress" == d && !i.metaKey && !i.ctrlKey || n(t, l.modifiers))) {
   var p = !o && l.combo == r, f = o && l.seq == o && l.level == a;
   (p || f) && S[e].splice(s, 1), u.push(l);
  }
  return u;
 }
 function r(e) {
  var t = [];
  return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
  e.metaKey && t.push("meta"), t;
 }
 function a(e, t, n) {
  A.stopCallback(t, t.target || t.srcElement, n) || e(t, n) === !1 && (t.preventDefault && t.preventDefault(), 
  t.stopPropagation && t.stopPropagation(), t.returnValue = !1, t.cancelBubble = !0);
 }
 function s(e, t, n) {
  var r, s = o(e, t, n), l = {}, u = 0, d = !1;
  for (r = 0; r < s.length; ++r) s[r].seq && (u = Math.max(u, s[r].level));
  for (r = 0; r < s.length; ++r) if (s[r].seq) {
   if (s[r].level != u) continue;
   d = !0, l[s[r].seq] = 1, a(s[r].callback, n, s[r].combo);
  } else d || a(s[r].callback, n, s[r].combo);
  var p = "keypress" == n.type && N;
  n.type != I || c(e) || p || i(l), N = d && "keydown" == n.type;
 }
 function l(e) {
  "number" != typeof e.which && (e.which = e.keyCode);
  var n = t(e);
  if (n) return "keyup" == e.type && E === n ? (E = !1, void 0) : (A.handleKey(n, r(e), e), 
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
   for (var e in x) e > 95 && 112 > e || x.hasOwnProperty(e) && (b[x[e]] = e);
  }
  return b;
 }
 function p(e, t, n) {
  return n || (n = d()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
  n;
 }
 function f(e, n, o, r) {
  function s(t) {
   return function() {
    I = t, ++T[e], u();
   };
  }
  function l(n) {
   a(o, n, e), "keyup" !== r && (E = t(n)), setTimeout(i, 10);
  }
  T[e] = 0;
  for (var c = 0; c < n.length; ++c) {
   var d = c + 1 === n.length, p = d ? l : s(r || m(n[c + 1]).action);
   g(n[c], p, r, e, c);
  }
 }
 function h(e) {
  return "+" === e ? [ "+" ] : e.split("+");
 }
 function m(e, t) {
  var n, i, o, r = [];
  for (n = h(e), o = 0; o < n.length; ++o) i = n[o], k[i] && (i = k[i]), t && "keypress" != t && C[i] && (i = C[i], 
  r.push("shift")), c(i) && r.push(i);
  return t = p(i, r, t), {
   key: i,
   modifiers: r,
   action: t
  };
 }
 function g(e, t, n, i, r) {
  _[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
  var a, s = e.split(" ");
  return s.length > 1 ? (f(e, s, t, n), void 0) : (a = m(e, n), S[a.key] = S[a.key] || [], 
  o(a.key, a.modifiers, {
   type: a.action
  }, i, e, r), S[a.key][i ? "unshift" : "push"]({
   callback: t,
   modifiers: a.modifiers,
   action: a.action,
   seq: i,
   level: r,
   combo: e
  }), void 0);
 }
 function v(e, t, n) {
  for (var i = 0; i < e.length; ++i) g(e[i], t, n);
 }
 for (var b, y, x = {
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
 }, C = {
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
 }, k = {
  option: "alt",
  command: "meta",
  "return": "enter",
  escape: "esc",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
 }, S = {}, _ = {}, T = {}, E = !1, N = !1, I = !1, P = 1; 20 > P; ++P) x[111 + P] = "f" + P;
 for (P = 0; 9 >= P; ++P) x[P + 96] = P;
 e(document, "keypress", l), e(document, "keydown", l), e(document, "keyup", l);
 var A = {
  bind: function(e, t, n) {
   return e = e instanceof Array ? e : [ e ], v(e, t, n), this;
  },
  unbind: function(e, t) {
   return A.bind(e, function() {}, t);
  },
  trigger: function(e, t) {
   return _[e + ":" + t] && _[e + ":" + t]({}, e), this;
  },
  reset: function() {
   return S = {}, _ = {}, this;
  },
  stopCallback: function(e, t) {
   return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.contentEditable && "true" == t.contentEditable;
  },
  handleKey: s
 };
 window.Mousetrap = A, "function" == typeof define && define.amd && define("mousetrap", A);
}(), define("text!html/documentSelectorSettingsBlock.html", [], function() {
 return '<p>Allows toggling document with keyboard shortcuts.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="select-document-selector-orderby">Order\n			by</label>\n		<div class="col-lg-6">\n			<select id="select-document-selector-orderby" class="form-control">\n				<option value="title">Document title</option>\n				<option value="mru">Most recently used</option>\n			</select>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-previous">"Previous"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-previous"\n				class="form-control">\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-lg-5 control-label"\n			for="input-document-selector-shortcut-next">"Next"\n			shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-lg-6">\n			<input type="text" id="input-document-selector-shortcut-next"\n				class="form-control">\n		</div>\n	</div>\n</div>';
}), define("extensions/documentSelector", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "mousetrap", "fileSystem", "text!html/documentSelectorSettingsBlock.html" ], function(e, t, n, i, o, r, a, s) {
 var l = new o("documentSelector", "Document Selector", !0, !0);
 l.settingsBlock = s, l.defaultConfig = {
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
 var u = [ '<li class="<%= isCurrent ? "disabled" : "" %>" data-file-index="<%= fileDesc.fileIndex %>">', '   <a href="#">', "       <%= fileDesc.composeTitle() %>", "   </a>", "</li>" ].join(""), d = void 0, p = void 0, f = void 0, h = void 0, m = void 0, g = void 0, v = void 0, b = function() {
  var n = t.chain(a).sortBy(m).reduce(function(e, n) {
   return e + t.template(u, {
    fileDesc: n,
    isCurrent: n === g
   });
  }, "").value();
  p.innerHTML = n, h = [], f = {}, t.each(p.querySelectorAll("li"), function(t) {
   var n = e(t);
   h.push(n);
   var i = a[n.data("fileIndex")];
   f[i.fileIndex] = n, n.find("a").click(function() {
    v = void 0, n.hasClass("disabled") ? d.focus() : c.selectFile(i);
   });
  });
 };
 return l.onFileSelected = function(e) {
  g = e, b();
 }, l.onFileCreated = b, l.onFileDeleted = b, l.onTitleChanged = b, l.onSyncExportSuccess = b, 
 l.onSyncRemoved = b, l.onNewPublishSuccess = b, l.onPublishRemoved = b, l.onReady = function() {
  d = e("#wmd-input"), "title" == l.config.orderBy ? m = function(e) {
   return e.title.toLowerCase();
  } : "mru" == l.config.orderBy && (m = function(e) {
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
  var a = l.config.shortcutPrevious.toLowerCase();
  r.bind(a, function() {
   void 0 === v && (i.dropdown("toggle"), v = f[g.fileIndex]);
   var e = t.indexOf(h, v) - 1;
   return -2 === e && (e = -1), v = h[(e + h.length) % h.length], t.defer(function() {
    v.find("a").focus();
   }), !1;
  });
  var s = l.config.shortcutNext.toLowerCase();
  r.bind(l.config.shortcutNext.toLowerCase(), function() {
   void 0 === v && (i.dropdown("toggle"), v = f[g.fileIndex]);
   var e = t.indexOf(h, v) + 1;
   return v = h[e % h.length], t.defer(function() {
    v.find("a").focus();
   }), !1;
  });
  var c = a.indexOf("+"), u = -1 === c ? a : a.substring(0, c), b = s.indexOf("+"), y = -1 === b ? s : s.substring(0, b);
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
 function a(n) {
  if (n != y) {
   if (y = n, b.scrollTop = 0, !n) return m.addClass("hide"), f.removeClass("hide"), 
   void 0;
   var i = n.toLowerCase().split(/\s+/);
   t.each(h.querySelectorAll(".file"), function(n) {
    var o = e(n), r = o.text().toLowerCase();
    o.toggle(!t.some(i, function(e) {
     return -1 === r.indexOf(e);
    }));
   }), m.removeClass("hide"), f.addClass("hide");
  }
 }
 var s = new i("documentPanel", "Document Panel"), l = void 0;
 s.onFileMgrCreated = function(e) {
  l = e;
 };
 var c = [ '<a href="#"', ' class="list-group-item folder clearfix"', ' data-folder-index="<%= folderDesc.folderIndex %>"', ' data-toggle="collapse"', ' data-target=".document-panel .file-list.<%= id %>">', '   <div class="pull-right file-count">', "       <%= _.size(folderDesc.fileList) %>", "   </div>", '   <i class="icon-folder"></i> <%= folderDesc.name %>', "</a>", '<div class="file-list collapse <%= id %> clearfix">', "   <%= fileListHtml %>", "</div>" ].join(""), u = [ '<a href="#"', ' class="list-group-item file<%= fileDesc === selectedFileDesc ? " active" : "" %>"', ' data-file-index="<%= fileDesc.fileIndex %>"', ' data-toggle="collapse"', ' data-target=".document-panel">', "   <%= fileDesc.composeTitle() %>", "</a>" ].join(""), d = void 0, p = void 0, f = void 0, h = void 0, m = void 0, g = void 0, v = function() {
  var n = t.filter(r, function(e) {
   return void 0 === e.folder;
  }), i = t.chain(n).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + "<li>" + t.template(u, {
    fileDesc: n,
    selectedFileDesc: g
   }) + "</li>";
  }, "").value();
  i = i && '<ul class="nav">' + i + "</ul>", t.chain(o).sortBy(function(e) {
   return e.name.toLowerCase();
  }).each(function(e) {
   var n = t.chain(e.fileList).sortBy(function(e) {
    return e.title.toLowerCase();
   }).reduce(function(e, n) {
    return e + "<li>" + t.template(u, {
     fileDesc: n,
     selectedFileDesc: g
    }) + "</li>";
   }, "").value();
   n = n && '<ul class="nav">' + n + "</ul>", i += t.template(c, {
    folderDesc: e,
    fileListHtml: n,
    id: e.folderIndex.replace(".", "")
   });
  }), p.innerHTML = i;
  var a = t.chain(r).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + "<li>" + t.template(u, {
    fileDesc: n,
    selectedFileDesc: g
   }) + "</li>";
  }, "").value();
  a = '<ul class="nav">' + a + "</ul>", h.innerHTML = a, t.each(p.querySelectorAll(".file"), function(t) {
   var n = e(t);
   n.click(function() {
    var e = r[n.data("fileIndex")];
    e && e !== g && l.selectFile(e);
   });
  });
 };
 s.onFileSelected = function(e) {
  g = e, v();
 }, s.onFileCreated = v, s.onFileDeleted = v, s.onTitleChanged = v, s.onSyncExportSuccess = v, 
 s.onSyncRemoved = v, s.onNewPublishSuccess = v, s.onPublishRemoved = v, s.onFoldersChanged = v;
 var b = void 0, y = "";
 return s.onReady = function() {
  d = document.querySelector(".document-panel"), b = d.querySelector(".panel-content"), 
  p = d.querySelector(".document-list"), f = e(p), h = d.querySelector(".document-list-filtered"), 
  m = e(h), e(d).on("show.bs.collapse", function(t) {
   if (t.target === d) {
    var n = g.folder;
    void 0 !== n && e(d.querySelector(".file-list." + n.folderIndex.replace(".", ""))).collapse("show");
   }
  }).on("shown.bs.collapse", function(e) {
   e.target === d && (t.val(""), a(""), b.scrollTop += p.querySelector(".file.active").getBoundingClientRect().top - 120);
  });
  var t = e(d.querySelector(".search-bar .form-control"));
  t.bind("propertychange keyup input paste", function() {
   a(t.val());
  }), e(d.querySelector(".search-bar .close")).click(function() {
   t.val(""), a(""), t.focus();
  });
 }, s;
}), define("extensions/documentManager", [ "jquery", "underscore", "utils", "classes/Extension", "classes/FolderDescriptor", "folderList", "fileSystem", "config" ], function(e, t, n, i, o, r, a) {
 function s() {
  C = [], w = [], t.each(x.querySelectorAll('input[type="checkbox"]:checked'), function(t) {
   var n = e(t.parentNode.parentNode), i = r[n.data("folderIndex")], o = a[n.data("fileIndex")];
   void 0 !== i ? C.push(i) : void 0 !== o && w.push(o);
  });
 }
 function l() {
  if (0 === t.size(w)) return c(), void 0;
  var n = t.chain(w).sortBy(function(e) {
   return e.title.toLowerCase();
  }).reduce(function(e, n) {
   return e + t.template(v, {
    fileDesc: n
   });
  }, "").value();
  k.innerHTML = '<ul class="file-list nav">' + n + "</ul>", e(y.querySelectorAll(".document-list")).addClass("hide"), 
  e(y.querySelectorAll(".confirm-delete, .selected-document-list")).removeClass("hide");
 }
 function c() {
  t.each(w, function(e) {
   e.folder && e.folder.removeFile(e), p.deleteFile(e);
  }), t.each(C, function(e) {
   n.removeIndexFromArray("folder.list", e.folderIndex), localStorage.removeItem(e.folderIndex + ".name"), 
   localStorage.removeItem(e.folderIndex + ".files"), delete r[e.folderIndex];
  }), f.onFoldersChanged();
 }
 function u() {
  s(), S.toggleClass("disabled", 0 === t.size(r) || 0 === t.size(w)), _.toggleClass("disabled", 0 === t.size(C) && 0 === t.size(w));
 }
 var d = new i("documentManager", "Document Manager", !1, !0), p = void 0;
 d.onFileMgrCreated = function(e) {
  p = e;
 };
 var f = void 0;
 d.onEventMgrCreated = function(e) {
  f = e;
 };
 var h = [ '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>" data-toggle="collapse" data-target=".modal-document-manager .file-list.<%= id %>">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>', '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>', '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>', '<div class="name"><i class="icon-folder"></i> ', "<%= folderDesc.name %></div>", '<input type="text" class="input-rename form-control hide"></a>', '<div class="file-list collapse <%= id %> clearfix"><%= fileListHtml %></div>' ].join(""), m = [ '<li class="list-group-item file clearfix" data-file-index="<%= fileDesc.fileIndex %>">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>', '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>', '<div class="name"><%= fileDesc.composeTitle() %></div>', '<input type="text" class="input-rename form-control hide"></li>' ].join(""), g = [ '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>">', '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>', '<div class="name"><i class="icon-forward"></i> ', "<%= folderDesc.name %></div></a>" ].join(""), v = [ '<li class="list-group-item file clearfix">', '<div class="name"><%= fileDesc.composeTitle() %></div></li>' ].join(""), b = !1, y = void 0, x = void 0, w = [], C = [], k = void 0, S = void 0, _ = void 0, T = void 0, E = void 0, N = void 0, I = function() {
  if (b !== !1) {
   u(), E.text(t.size(a)), N.text(t.size(r) + 1), T = t.filter(a, function(e) {
    return void 0 === e.folder;
   });
   var n = [ '<a href="#" class="list-group-item folder clearfix" data-toggle="collapse" data-target=".modal-document-manager .file-list.root-folder">', '<label class="checkbox" title="Select"><input type="checkbox"></label>', '<div class="pull-right file-count">', t.size(T), "</div>", '<div class="name"><i class="icon-folder"></i> ', "ROOT folder</div></a>" ].join(""), i = t.chain(T).sortBy(function(e) {
    return e.title.toLowerCase();
   }).reduce(function(e, n) {
    return e + t.template(m, {
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
     return e + t.template(m, {
      fileDesc: n
     });
    }, "").value();
    i = i && '<ul class="nav">' + i + "</ul>", n += t.template(h, {
     folderDesc: e,
     fileListHtml: i,
     id: e.folderIndex.replace(".", "")
    });
   }), x.innerHTML = n, t.each(x.querySelectorAll(".button-delete"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
     var t = n.parent(), i = r[t.data("folderIndex")], o = a[t.data("fileIndex")];
     w = [], C = [], i ? (C.push(i), w = i.fileList) : o && w.push(o), l();
    });
   }), t.each(x.querySelectorAll(".button-rename"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
     var t = n.parent(), i = void 0, o = r[t.data("folderIndex")], s = a[t.data("fileIndex")];
     o ? i = o.name : s && (i = s.title), t.find(".name").addClass("hide"), t.find(".input-rename").removeClass("hide").val(i)[0].select();
    });
   }), t.each(x.querySelectorAll(".input-rename"), function(t) {
    function n() {
     var t = i.parent(), n = e.trim(i.val()), o = r[t.data("folderIndex")], s = a[t.data("fileIndex")];
     n && o && n != o.name ? (o.name = n, f.onFoldersChanged()) : n && s && n != s.title ? (s.title = n, 
     f.onTitleChanged(s)) : (i.addClass("hide"), t.find(".name").removeClass("hide"));
    }
    var i = e(t);
    i.blur(function() {
     n();
    }).keyup(function(e) {
     13 == e.keyCode && (n(), e.stopPropagation()), 27 == e.keyCode && (i.val(""), n(), 
     e.stopPropagation());
    });
   }), t.each(x.querySelectorAll(".folder .checkbox"), function(t) {
    var n = e(t);
    n.click(function(e) {
     e.stopPropagation();
    }).find("[type=checkbox]").change(function() {
     var e = n.parent().next().find("[type=checkbox]");
     this.checked ? e.prop("checked", !0).prop("disabled", !0) : e.prop("checked", !1).prop("disabled", !1);
    });
   }), e(x.querySelectorAll("[type=checkbox]")).change(u);
  }
 };
 return d.onFileCreated = I, d.onFileDeleted = I, d.onTitleChanged = I, d.onSyncExportSuccess = I, 
 d.onSyncRemoved = I, d.onNewPublishSuccess = I, d.onPublishRemoved = I, d.onFoldersChanged = I, 
 d.onReady = function() {
  y = document.querySelector(".modal-document-manager"), x = y.querySelector(".list-group.document-list"), 
  E = e(y.querySelectorAll(".document-count")), N = e(y.querySelectorAll(".folder-count")), 
  k = y.querySelector(".list-group.selected-document-list");
  var i = y.querySelector(".list-group.select-folder-list");
  e(y).on("show.bs.modal", function() {
   b = !0, I();
  }).on("hide.bs.modal", function() {
   b = !1;
  }), e(y.querySelectorAll(".action-create-folder")).click(function() {
   var i = void 0;
   do i = "folder." + n.randomString(); while (t.has(r, i));
   localStorage[i + ".name"] = DEFAULT_FOLDER_NAME;
   var a = new o(i, DEFAULT_FOLDER_NAME);
   n.appendIndexToArray("folder.list", i), r[i] = a, f.onFoldersChanged();
   var s = e(y.querySelector('[data-folder-index="' + i + '"] .button-rename')).click();
   y.scrollTop += s.offset().top - 50;
  }), e(y.querySelectorAll(".action-select-all")).click(function() {
   e(x.querySelectorAll('input[type="checkbox"]')).prop("checked", !0).change();
  }), e(y.querySelectorAll(".action-unselect-all")).click(function() {
   e(x.querySelectorAll('input[type="checkbox"]')).prop("checked", !1).change();
  });
  var a = e(y.querySelectorAll(".action-delete-items")).click(function() {
   _.hasClass("disabled") || (s(), l());
  });
  _ = a.parent(), e(y.querySelectorAll(".action-delete-items-confirm")).click(function() {
   c(), e(y.querySelectorAll(".document-list")).removeClass("hide"), e(y.querySelectorAll(".confirm-delete, .selected-document-list")).addClass("hide");
  });
  var u = e(y.querySelectorAll(".action-move-items")).click(function() {
   if (!S.hasClass("disabled")) {
    s();
    var n = [ '<a href="#" class="list-group-item folder clearfix">', '<div class="pull-right file-count">', t.size(T), "</div>", '<div class="name"><i class="icon-forward"></i> ', "ROOT folder</div></a>" ].join("");
    n += t.chain(r).sortBy(function(e) {
     return e.name.toLowerCase();
    }).reduce(function(e, n) {
     return e + t.template(g, {
      folderDesc: n
     });
    }, "").value(), i.innerHTML = n, t.each(i.querySelectorAll(".folder"), function(n) {
     n = e(n), n.click(function() {
      var i = r[n.data("folderIndex")];
      t.each(w, function(e) {
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
  return !1 === e.support.boxModel && e.support.objectAll && $support.leadingWhitespace;
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
   var t = e('<div class="jGrowl-notification ' + o.themeState + " ui-corner-all" + (void 0 != o.group && "" != o.group ? " " + o.group : "") + '">' + '<div class="jGrowl-close">' + o.closeTemplate + "</div>" + '<div class="jGrowl-header">' + o.header + "</div>" + '<div class="jGrowl-message">' + i + "</div></div>").data("jGrowl", o).addClass(o.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
    e(this).parent().trigger("jGrowl.beforeClose");
   }).parent();
   e(t).bind("mouseover.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !0);
   }).bind("mouseout.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !1);
   }).bind("jGrowl.beforeOpen", function() {
    0 != o.beforeOpen.apply(t, [ t, i, o, n.element ]) && e(this).trigger("jGrowl.open");
   }).bind("jGrowl.open", function() {
    0 != o.open.apply(t, [ t, i, o, n.element ]) && ("after" == o.glue ? e("div.jGrowl-notification:last", n.element).after(t) : e("div.jGrowl-notification:first", n.element).before(t), 
    e(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
     e.support.opacity === !1 && this.style.removeAttribute("filter"), null != e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date()), 
     e(this).trigger("jGrowl.afterOpen");
    }));
   }).bind("jGrowl.afterOpen", function() {
    o.afterOpen.apply(t, [ t, i, o, n.element ]);
   }).bind("jGrowl.beforeClose", function() {
    0 != o.beforeClose.apply(t, [ t, i, o, n.element ]) && e(this).trigger("jGrowl.close");
   }).bind("jGrowl.close", function() {
    e(this).data("jGrowl.pause", !0), e(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
     e.isFunction(o.close) ? o.close.apply(t, [ t, i, o, n.element ]) !== !1 && e(this).remove() : e(this).remove();
    });
   }).trigger("jGrowl.beforeOpen"), "" != o.corners && void 0 != e.fn.corner && e(t).corner(o.corners), 
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
   e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove(), 
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
 function a() {
  c === !1 && (o.defaults.life = l.config.timeout, o.defaults.closer = !1, o.defaults.closeTemplate = "", 
  o.defaults.position = "bottom-right", c = !0);
 }
 function s(e, n, i) {
  if (logger.info(e), a(), e) {
   var r = e.indexOf("|");
   (-1 === r || (e = e.substring(0, r))) && (i = i || {}, n = n || "icon-info-circled", 
   o("<i class='icon-white " + n + "'></i> " + t.escape(e).replace(/\n/g, "<br/>"), i));
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
  s(e);
 }, l.onError = function(e) {
  logger.error(e), t.isString(e) ? s(e, "icon-attention") : t.isObject(e) && s(e.message, "icon-attention");
 }, l.onOfflineChanged = function(t) {
  t === !0 ? s("You are offline.", "icon-attention-circled msg-offline", {
   sticky: !0,
   close: function() {
    s("You are back online!", "icon-signal");
   }
  }) : e(".msg-offline").parents(".jGrowl-notification").trigger("jGrowl.beforeClose");
 }, l.onSyncImportSuccess = function(e, n) {
  var i = t.map(e, function(e) {
   return e.title;
  }).join(", ");
  s(i + " imported successfully from " + n.providerName + ".");
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
    return t = t.toLowerCase(), $.set(t, k(n)), o ? i : (r && z.set(t, r.replace(/"/g, "&quot;")), 
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
   return n = n.replace(/^\n+/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (R.push(n) - 1) + "K\n\n";
  }
  function r(e, n) {
   e = L.preBlockGamut(e, D), e = f(e);
   var i = "<hr />\n";
   return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, i), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, i), 
   e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, i), e = h(e), e = g(e), e = w(e), 
   e = L.postBlockGamut(e, D), e = t(e), e = C(e, n);
  }
  function a(e) {
   return e = L.preSpanGamut(e), e = b(e), e = s(e), e = S(e), e = u(e), e = l(e), 
   e = T(e), e = e.replace(/~P/g, "://"), e = k(e), e = x(e), e = e.replace(/  +\n/g, " <br>\n"), 
   e = L.postSpanGamut(e);
  }
  function s(e) {
   var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
   return e = e.replace(t, function(e) {
    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
    return t = A(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_");
   });
  }
  function l(e) {
   return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, c), 
   e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
   e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, c);
  }
  function c(e, t, n, i, o, r, a, s) {
   void 0 == s && (s = "");
   var l = t, c = n.replace(/:\/\//g, "~P"), u = i.toLowerCase(), p = o, f = s;
   if ("" == p) if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, 
   void 0 != $.get(u)) p = $.get(u), void 0 != z.get(u) && (f = z.get(u)); else {
    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
    p = "";
   }
   p = P(p), p = A(p, "*_");
   var h = '<a href="' + p + '"';
   return "" != f && (f = d(f), f = A(f, "*_"), h += ' title="' + f + '"'), h += ">" + c + "</a>";
  }
  function u(e) {
   return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p);
  }
  function d(e) {
   return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function p(e, t, n, i, o, r, a, s) {
   var l = t, c = n, u = i.toLowerCase(), p = o, f = s;
   if (f || (f = ""), "" == p) {
    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, void 0 == $.get(u)) return l;
    p = $.get(u), void 0 != z.get(u) && (f = z.get(u));
   }
   c = A(d(c), "*_[]()"), p = A(p, "*_");
   var h = '<img src="' + p + '" alt="' + c + '"';
   return f = d(f), f = A(f, "*_"), h += ' title="' + f + '"', h += " />";
  }
  function f(e) {
   return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
    return '<h1 class="wmd-title">' + a(t) + "</h1>\n\n";
   }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
    return '<h2 class="wmd-title">' + a(t) + "</h2>\n\n";
   }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
    var i = t.length;
    return "<h" + i + ' class="wmd-title">' + a(n) + "</h" + i + ">\n\n";
   });
  }
  function h(e, t) {
   e += "~0";
   var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
   return j ? e = e.replace(n, function(e, n, i) {
    var o = n, r = i.search(/[*+-]/g) > -1 ? "ul" : "ol", a = m(o, r, t);
    return a = a.replace(/\s+$/, ""), a = "<" + r + ">" + a + "</" + r + ">\n";
   }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
   e = e.replace(n, function(e, t, n, i) {
    var o = t, r = n, a = i.search(/[*+-]/g) > -1 ? "ul" : "ol", s = m(r, a);
    return s = o + "<" + a + ">\n" + s + "</" + a + ">\n";
   })), e = e.replace(/~0/, "");
  }
  function m(e, t, n) {
   j++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
   var i = O[t], o = new RegExp("(^[ \\t]*)(" + i + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + i + ")[ \\t]+))", "gm"), s = !1;
   return e = e.replace(o, function(e, t, i, o) {
    var l = o, c = /\n\n$/.test(l), u = c || l.search(/\n{2,}/) > -1;
    return u || s ? l = r(N(l), !0) : (l = h(N(l), !0), l = l.replace(/\n$/, ""), n || (l = a(l))), 
    s = c, "<li>" + l + "</li>\n";
   }), e = e.replace(/~0/g, ""), j--, e;
  }
  function g(e) {
   return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
    var i = t, o = n;
    return i = y(N(i)), i = I(i), i = i.replace(/^\n+/g, ""), i = i.replace(/\n+$/g, ""), 
    i = "<pre><code>" + i + "\n</code></pre>", "\n\n" + i + "\n\n" + o;
   }), e = e.replace(/~0/, "");
  }
  function v(e) {
   return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (R.push(e) - 1) + "K\n\n";
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
   e = A(e, "*_{}[]\\", !1);
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
    }), v("<blockquote>\n" + n + "\n</blockquote>");
   });
  }
  function C(e, t) {
   e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
   for (var n = e.split(/\n{2,}/g), i = [], o = /~K(\d+)K/, r = n.length, s = 0; r > s; s++) {
    var l = n[s];
    o.test(l) ? i.push(l) : /\S/.test(l) && (l = a(l), l = l.replace(/^([ \t]*)/g, "<p>"), 
    l += "</p>", i.push(l));
   }
   if (!t) {
    r = i.length;
    for (var s = 0; r > s; s++) for (var c = !0; c; ) c = !1, i[s] = i[s].replace(/~K(\d+)K/g, function(e, t) {
     return c = !0, R[t];
    });
   }
   return i.join("\n\n");
  }
  function k(e) {
   return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
  }
  function S(e) {
   return e = e.replace(/\\(\\)/g, M), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, M);
  }
  function _(e, t, n, i) {
   if (t) return e;
   if (")" !== i.charAt(i.length - 1)) return "<" + n + i + ">";
   for (var o = i.match(/[()]/g), r = 0, a = 0; a < o.length; a++) "(" === o[a] ? 0 >= r ? r = 1 : r++ : r--;
   var s = "";
   if (0 > r) {
    var l = new RegExp("\\){1," + -r + "}$");
    i = i.replace(l, function(e) {
     return s = e, "";
    });
   }
   if (s) {
    var c = i.charAt(i.length - 1);
    B.test(c) || (s = c + s, i = i.substr(0, i.length - 1));
   }
   return "<" + n + i + ">" + s;
  }
  function T(e) {
   e = e.replace(H, _);
   var t = function(e, t) {
    return '<a href="' + t + '">' + L.plainLinkText(t) + "</a>";
   };
   return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t);
  }
  function E(e) {
   return e = e.replace(/~E(\d+)E/g, function(e, t) {
    var n = parseInt(t);
    return String.fromCharCode(n);
   });
  }
  function N(e) {
   return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "");
  }
  function I(e) {
   if (!/\t/.test(e)) return e;
   var t, n = [ "    ", "   ", "  ", " " ], i = 0;
   return e.replace(/[\n\t]/g, function(e, o) {
    return "\n" === e ? (i = o + 1, e) : (t = (o - i) % 4, i = o + 1, n[t]);
   });
  }
  function P(e) {
   return e ? (e.length, e.replace(U, function(e) {
    return "~D" == e ? "%24" : ":" == e ? ":" : "%" + e.charCodeAt(0).toString(16);
   })) : "";
  }
  function A(e, t, n) {
   var i = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
   n && (i = "\\\\" + i);
   var o = new RegExp(i, "g");
   return e = e.replace(o, M);
  }
  function M(e, t) {
   var n = t.charCodeAt(0);
   return "~E" + n + "E";
  }
  var L = this.hooks = new n();
  L.addNoop("plainLinkText"), L.addNoop("preConversion"), L.addNoop("postNormalization"), 
  L.addNoop("preBlockGamut"), L.addNoop("postBlockGamut"), L.addNoop("preSpanGamut"), 
  L.addNoop("postSpanGamut"), L.addNoop("postConversion");
  var $, z, R, j;
  this.makeHtml = function(n) {
   if ($) throw new Error("Recursive call to converter.makeHtml");
   return $ = new i(), z = new i(), R = [], j = 0, n = L.preConversion(n), n = n.replace(/~/g, "~T"), 
   n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), 
   n = "\n\n" + n + "\n\n", n = I(n), n = n.replace(/^[ \t]+$/gm, ""), n = L.postNormalization(n), 
   n = t(n), n = e(n), n = r(n), n = E(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), 
   n = L.postConversion(n), R = z = $ = null, n;
  };
  var D = function(e) {
   return r(e);
  }, O = {
   ol: "\\d+[.]",
   ul: "[*+-]"
  }, F = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", q = "[-A-Z0-9+&@#/%=~_|[\\])]", H = new RegExp('(="|<)?\\b(https?|ftp)(://' + F + "*" + q + ")(?=$|\\W)", "gi"), B = new RegExp(q, "i"), U = /(?:["'*()[\]:]|~D)/g;
 };
}(), define("libs/Markdown.Converter", function() {}), window.PR_SHOULD_USE_CONTINUATION = !0;

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
   var i = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), o = [], r = "^" === i[0], a = [ "[" ];
   r && a.push("^");
   for (var s = r ? 1 : 0, l = i.length; l > s; ++s) {
    var c = i[s];
    if (/\\[bdsw]/i.test(c)) a.push(c); else {
     var u, d = t(c);
     l > s + 2 && "-" === i[s + 1] ? (u = t(i[s + 2]), s += 2) : u = d, o.push([ d, u ]), 
     65 > u || d > 122 || (65 > u || d > 90 || o.push([ 32 | Math.max(65, d), 32 | Math.min(u, 90) ]), 
     97 > u || d > 122 || o.push([ -33 & Math.max(97, d), -33 & Math.min(u, 122) ]));
    }
   }
   o.sort(function(e, t) {
    return e[0] - t[0] || t[1] - e[1];
   });
   for (var p = [], f = [], s = 0; s < o.length; ++s) {
    var h = o[s];
    h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : p.push(f = h);
   }
   for (var s = 0; s < p.length; ++s) {
    var h = p[s];
    a.push(n(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && a.push("-"), a.push(n(h[1])));
   }
   return a.push("]"), a.join("");
  }
  function o(e) {
   for (var t = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), o = t.length, s = [], l = 0, c = 0; o > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c; else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && (c >= d ? s[d] = -1 : t[l] = n(d));
    }
   }
   for (var l = 1; l < s.length; ++l) -1 === s[l] && (s[l] = ++r);
   for (var l = 0, c = 0; o > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c, s[c] || (t[l] = "(?:"); else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && c >= d && (t[l] = "\\" + s[d]);
    }
   }
   for (var l = 0; o > l; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
   if (e.ignoreCase && a) for (var l = 0; o > l; ++l) {
    var u = t[l], p = u.charAt(0);
    u.length >= 2 && "[" === p ? t[l] = i(u) : "\\" !== p && (t[l] = u.replace(/[a-zA-Z]/g, function(e) {
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
   p.push("(?:" + o(u) + ")");
  }
  return new RegExp(p.join("|"), s ? "gi" : "g");
 }
 function t(e, t) {
  function n(e) {
   switch (e.nodeType) {
   case 1:
    if (i.test(e.className)) return;
    for (var l = e.firstChild; l; l = l.nextSibling) n(l);
    var c = e.nodeName.toLowerCase();
    ("br" === c || "li" === c) && (o[s] = "\n", a[s << 1] = r++, a[1 | s++ << 1] = e);
    break;

   case 3:
   case 4:
    var u = e.nodeValue;
    u.length && (u = t ? u.replace(/\r\n?/g, "\n") : u.replace(/[ \t\r\n]+/g, " "), 
    o[s] = u, a[s << 1] = r, r += u.length, a[1 | s++ << 1] = e);
   }
  }
  var i = /(?:^|\s)nocode(?:\s|$)/, o = [], r = 0, a = [], s = 0;
  return n(e), {
   sourceCode: o.join("").replace(/\n$/, ""),
   spans: a
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
   t = 1 === i ? t ? e : n : 3 === i ? H.test(n.nodeValue) ? e : t : t;
  }
  return t === e ? void 0 : t;
 }
 function o(t, i) {
  var o, r = {};
  (function() {
   for (var n = t.concat(i), a = [], s = {}, l = 0, c = n.length; c > l; ++l) {
    var u = n[l], d = u[3];
    if (d) for (var p = d.length; --p >= 0; ) r[d.charAt(p)] = u;
    var f = u[1], h = "" + f;
    s.hasOwnProperty(h) || (a.push(f), s[h] = null);
   }
   a.push(/[\0-\uffff]/), o = e(a);
  })();
  var a = i.length, s = function(e) {
   for (var t = e.sourceCode, l = e.basePos, u = [ l, $ ], d = 0, p = t.match(o) || [], f = {}, h = 0, m = p.length; m > h; ++h) {
    var g, v = p[h], b = f[v], y = void 0;
    if ("string" == typeof b) g = !1; else {
     var x = r[v.charAt(0)];
     if (x) y = v.match(x[1]), b = x[0]; else {
      for (var w = 0; a > w; ++w) if (x = i[w], y = v.match(x[1])) {
       b = x[0];
       break;
      }
      y || (b = $);
     }
     g = b.length >= 5 && "lang-" === b.substring(0, 5), !g || y && "string" == typeof y[1] || (g = !1, 
     b = j), g || (f[v] = b);
    }
    var C = d;
    if (d += v.length, g) {
     var k = y[1], S = v.indexOf(k), _ = S + k.length;
     y[2] && (_ = v.length - y[2].length, S = _ - k.length);
     var T = b.substring(5);
     n(l + C, v.substring(0, S), s, u), n(l + C + S, k, c(T, k), u), n(l + C + _, v.substring(_), s, u);
    } else u.push(l + C, b);
   }
   e.decorations = u;
  };
  return s;
 }
 function r(e) {
  var t = [], n = [];
  e.tripleQuotedStrings ? t.push([ N, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\"" ]) : e.multiLineStrings ? t.push([ N, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`" ]) : t.push([ N, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'" ]), 
  e.verbatimStrings && n.push([ N, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null ]);
  var i = e.hashComments;
  if (i && (e.cStyleComments ? (i > 1 ? t.push([ P, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#" ]) : t.push([ P, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#" ]), 
  n.push([ N, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null ])) : t.push([ P, /^#[^\r\n]*/, null, "#" ])), 
  e.cStyleComments && (n.push([ P, /^\/\/[^\r\n]*/, null ]), n.push([ P, /^\/\*[\s\S]*?(?:\*\/|$)/, null ])), 
  e.regexLiterals) {
   var r = "/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/";
   n.push([ "lang-regex", new RegExp("^" + q + "(" + r + ")") ]);
  }
  var a = e.types;
  a && n.push([ A, a ]);
  var s = ("" + e.keywords).replace(/^ | $/g, "");
  s.length && n.push([ I, new RegExp("^(?:" + s.replace(/[\s,]+/g, "|") + ")\\b"), null ]), 
  t.push([ $, /^\s+/, null, " \r\n	 " ]);
  var l = /^.[^\s\w\.$@\'\"\`\/\\]*/;
  return n.push([ M, /^@[a-z_$][a-z_$@0-9]*/i, null ], [ A, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null ], [ $, /^[a-z_$][a-z_$@0-9]*/i, null ], [ M, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789" ], [ $, /^\\[\s\S]?/, null ], [ L, l, null ]), 
  o(t, n);
 }
 function a(e, t, n) {
  function i(e) {
   switch (e.nodeType) {
   case 1:
    if (r.test(e.className)) break;
    if ("br" === e.nodeName) o(e), e.parentNode && e.parentNode.removeChild(e); else for (var t = e.firstChild; t; t = t.nextSibling) i(t);
    break;

   case 3:
   case 4:
    if (n) {
     var l = e.nodeValue, c = l.match(a);
     if (c) {
      var u = l.substring(0, c.index);
      e.nodeValue = u;
      var d = l.substring(c.index + c[0].length);
      if (d) {
       var p = e.parentNode;
       p.insertBefore(s.createTextNode(d), e.nextSibling);
      }
      o(e), u || e.parentNode.removeChild(e);
     }
    }
   }
  }
  function o(e) {
   function t(e, n) {
    var i = n ? e.cloneNode(!1) : e, o = e.parentNode;
    if (o) {
     var r = t(o, 1), a = e.nextSibling;
     r.appendChild(i);
     for (var s = a; s; s = a) a = s.nextSibling, r.appendChild(s);
    }
    return i;
   }
   for (;!e.nextSibling; ) if (e = e.parentNode, !e) return;
   for (var n, i = t(e.nextSibling, 0); (n = i.parentNode) && 1 === n.nodeType; ) i = n;
   c.push(i);
  }
  for (var r = /(?:^|\s)nocode(?:\s|$)/, a = /\r\n?|\n/, s = e.ownerDocument, l = s.createElement("li"); e.firstChild; ) l.appendChild(e.firstChild);
  for (var c = [ l ], u = 0; u < c.length; ++u) i(c[u]);
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
  var n = /\n/g, i = e.sourceCode, o = i.length, r = 0, a = e.spans, s = a.length, l = 0, c = e.decorations, u = c.length, d = 0;
  c[u] = o;
  var p, f;
  for (f = p = 0; u > f; ) c[f] !== c[f + 2] ? (c[p++] = c[f++], c[p++] = c[f++]) : f += 2;
  for (u = p, f = p = 0; u > f; ) {
   for (var h = c[f], m = c[f + 1], g = f + 2; u >= g + 2 && c[g + 1] === m; ) g += 2;
   c[p++] = h, c[p++] = m, f = g;
  }
  u = c.length = p;
  var v, b = e.sourceNode;
  b && (v = b.style.display, b.style.display = "none");
  try {
   for (;s > l; ) {
    a[l];
    var y, x = a[l + 2] || o, w = c[d + 2] || o, g = Math.min(x, w), C = a[l + 1];
    if (1 !== C.nodeType && (y = i.substring(r, g))) {
     t && (y = y.replace(n, "\r")), C.nodeValue = y;
     var k = C.ownerDocument, S = k.createElement("span");
     S.className = c[d + 1];
     var _ = C.parentNode;
     _.replaceChild(S, C), S.appendChild(C), x > r && (a[l + 1] = C = k.createTextNode(i.substring(g, x)), 
     _.insertBefore(C, S.nextSibling));
    }
    r = g, r >= x && (l += 2), r >= w && (d += 2);
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
   e.sourceCode = o, e.spans = i.spans, e.basePos = 0, c(n, o)(e), s(e);
  } catch (r) {
   f.console && console.log(r && r.stack ? r.stack : r);
  }
 }
 function d(e, t, n) {
  var i = document.createElement("pre");
  i.innerHTML = e, n && a(i, n, !0);
  var o = {
   langExtension: t,
   numberLines: n,
   sourceNode: i,
   pre: 1
  };
  return u(o), i.innerHTML;
 }
 function p(e) {
  function t(e) {
   return document.getElementsByTagName(e);
  }
  function n() {
   for (var t = f.PR_SHOULD_USE_CONTINUATION ? d.now() + 250 : 1/0; h < r.length && d.now() < t; h++) {
    var o = r[h], s = o.className;
    if (g.test(s) && !v.test(s)) {
     for (var l = !1, c = o.parentNode; c; c = c.parentNode) {
      var w = c.tagName;
      if (x.test(w) && c.className && g.test(c.className)) {
       l = !0;
       break;
      }
     }
     if (!l) {
      o.className += " prettyprinted";
      var C, k = s.match(m);
      !k && (C = i(o)) && y.test(C.tagName) && (k = C.className.match(m)), k && (k = k[1]);
      var S;
      if (b.test(o.tagName)) S = 1; else {
       var _ = o.currentStyle, T = _ ? _.whiteSpace : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(o, null).getPropertyValue("white-space") : 0;
       S = T && "pre" === T.substring(0, 3);
      }
      var E = o.className.match(/\blinenums\b(?::(\d+))?/);
      E = E ? E[1] && E[1].length ? +E[1] : !0 : !1, E && a(o, E, S), p = {
       langExtension: k,
       sourceNode: o,
       numberLines: E,
       pre: S
      }, u(p);
     }
    }
   }
   h < r.length ? setTimeout(n, 250) : e && e();
  }
  for (var o = [ t("pre"), t("code"), t("xmp") ], r = [], s = 0; s < o.length; ++s) for (var l = 0, c = o[s].length; c > l; ++l) r.push(o[s][l]);
  o = null;
  var d = Date;
  d.now || (d = {
   now: function() {
    return +new Date();
   }
  });
  var p, h = 0, m = /\blang(?:uage)?-([\w.]+)(?!\S)/, g = /\bprettyprint\b/, v = /\bprettyprinted\b/, b = /pre|xmp/i, y = /^code$/i, x = /^(?:pre|code|xmp)$/i;
  n();
 }
 var f = window, h = [ "break,continue,do,else,for,if,return,while" ], m = [ h, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ], g = [ m, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof" ], v = [ g, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ], b = [ g, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient" ], y = [ b, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where" ], x = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", w = [ g, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ], C = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", k = [ h, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ], S = [ h, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ], _ = [ h, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ], T = [ v, y, w, C + k, S, _ ], E = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, N = "str", I = "kwd", P = "com", A = "typ", M = "lit", L = "pun", $ = "pln", z = "tag", R = "dec", j = "src", D = "atn", O = "atv", F = "nocode", q = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", H = /\S/, B = r({
  keywords: T,
  hashComments: !0,
  cStyleComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), U = {};
 l(B, [ "default-code" ]), l(o([], [ [ $, /^[^<?]+/ ], [ R, /^<!\w[^>]*(?:>|$)/ ], [ P, /^<\!--[\s\S]*?(?:-\->|$)/ ], [ "lang-", /^<\?([\s\S]+?)(?:\?>|$)/ ], [ "lang-", /^<%([\s\S]+?)(?:%>|$)/ ], [ L, /^(?:<[%?]|[%?]>)/ ], [ "lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i ], [ "lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i ], [ "lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i ], [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ] ]), [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ]), 
 l(o([ [ $, /^[\s]+/, null, " 	\r\n" ], [ O, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'" ] ], [ [ z, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i ], [ D, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ], [ "lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/ ], [ L, /^[=<>\/]+/ ], [ "lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i ], [ "lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i ], [ "lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i ], [ "lang-css", /^style\s*=\s*\"([^\"]+)\"/i ], [ "lang-css", /^style\s*=\s*\'([^\']+)\'/i ], [ "lang-css", /^style\s*=\s*([^\"\'>\s]+)/i ] ]), [ "in.tag" ]), 
 l(o([], [ [ O, /^[\s\S]+/ ] ]), [ "uq.val" ]), l(r({
  keywords: v,
  hashComments: !0,
  cStyleComments: !0,
  types: E
 }), [ "c", "cc", "cpp", "cxx", "cyc", "m" ]), l(r({
  keywords: "null,true,false"
 }), [ "json" ]), l(r({
  keywords: y,
  hashComments: !0,
  cStyleComments: !0,
  verbatimStrings: !0,
  types: E
 }), [ "cs" ]), l(r({
  keywords: b,
  cStyleComments: !0
 }), [ "java" ]), l(r({
  keywords: _,
  hashComments: !0,
  multiLineStrings: !0
 }), [ "bsh", "csh", "sh" ]), l(r({
  keywords: k,
  hashComments: !0,
  multiLineStrings: !0,
  tripleQuotedStrings: !0
 }), [ "cv", "py" ]), l(r({
  keywords: C,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), [ "perl", "pl", "pm" ]), l(r({
  keywords: S,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), [ "rb" ]), l(r({
  keywords: w,
  cStyleComments: !0,
  regexLiterals: !0
 }), [ "js" ]), l(r({
  keywords: x,
  hashComments: 3,
  cStyleComments: !0,
  multilineStrings: !0,
  tripleQuotedStrings: !0,
  regexLiterals: !0
 }), [ "coffee" ]), l(o([], [ [ N, /^[\s\S]+/ ] ]), [ "regex" ]);
 var G = f.PR = {
  createSimpleLexer: o,
  registerLangHandler: l,
  sourceDecorator: r,
  PR_ATTRIB_NAME: D,
  PR_ATTRIB_VALUE: O,
  PR_COMMENT: P,
  PR_DECLARATION: R,
  PR_KEYWORD: I,
  PR_LITERAL: M,
  PR_NOCODE: F,
  PR_PLAIN: $,
  PR_PUNCTUATION: L,
  PR_SOURCE: j,
  PR_STRING: N,
  PR_TAG: z,
  PR_TYPE: A,
  prettyPrintOne: f.prettyPrintOne = d,
  prettyPrint: f.prettyPrint = p
 };
 "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
  return G;
 });
})();

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
  for (var a = 0, s = "", l = []; t.length || n.length; ) {
   var c = o().splice(0, 1)[0];
   if (s += e(i.substr(a, c.offset - a)), a = c.offset, "start" == c.event) s += r(c.node), 
   l.push(c.node); else if ("stop" == c.event) {
    var u, d = l.length;
    do d--, u = l[d], s += "</" + u.nodeName.toLowerCase() + ">"; while (u != c.node);
    for (l.splice(d, 1); d < l.length; ) s += r(l[d]), d++;
   }
  }
  return s + e(i.substr(a));
 }
 function a(e) {
  function t(t, n) {
   return RegExp(t, "m" + (e.cI ? "i" : "") + (n ? "g" : ""));
  }
  function n(e, i) {
   function o(e, t) {
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
     if (e.lR = t(e.l || hljs.IR, !0), "string" == typeof e.k) o("keyword", e.k); else for (var s in e.k) e.k.hasOwnProperty(s) && o(s, e.k[s]);
     e.k = a;
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
 function s(t, n) {
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
   var n = g.cI ? t[0].toLowerCase() : t[0];
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
    r ? (x += r[1], n += '<span class="' + r[0] + '">' + o[0] + "</span>") : n += o[0], 
    i = v.lR.lastIndex, o = v.lR.exec(t);
   }
   return n + t.substr(i);
  }
  function d() {
   if (v.sL && !f[v.sL]) return e(b);
   var t = v.sL ? s(v.sL, b) : l(b);
   return v.r > 0 && (x += t.keyword_count, y += t.r), '<span class="' + t.language + '">' + t.value + "</span>";
  }
  function p() {
   return void 0 !== v.sL ? d() : u();
  }
  function h(t, n) {
   var i = t.cN ? '<span class="' + t.cN + '">' : "";
   t.rB ? (w += i, b = "") : t.eB ? (w += e(n) + i, b = "") : (w += i, b = n), v = Object.create(t, {
    parent: {
     value: v
    }
   }), y += t.r;
  }
  function m(t, n) {
   if (b += t, void 0 === n) return w += p(), 0;
   var a = i(n, v);
   if (a) return w += p(), h(a, n), a.rB ? 0 : n.length;
   var s = o(v, n);
   if (s) {
    s.rE || s.eE || (b += n), w += p();
    do v.cN && (w += "</span>"), v = v.parent; while (v != s.parent);
    return s.eE && (w += e(n)), b = "", s.starts && h(s.starts, ""), s.rE ? 0 : n.length;
   }
   if (r(n, v)) throw "Illegal";
   return b += n, n.length || 1;
  }
  var g = f[t];
  a(g);
  var v = g, b = "", y = 0, x = 0, w = "";
  try {
   for (var C, k, S = 0; ;) {
    if (v.t.lastIndex = S, C = v.t.exec(n), !C) break;
    k = m(n.substr(S, C.index - S), C[0]), S = C.index + k;
   }
   return m(n.substr(S)), {
    r: y,
    keyword_count: x,
    value: w,
    language: t
   };
  } catch (_) {
   if ("Illegal" == _) return {
    r: 0,
    keyword_count: 0,
    value: e(n)
   };
   throw _;
  }
 }
 function l(t) {
  var n = {
   keyword_count: 0,
   r: 0,
   value: e(t)
  }, i = n;
  for (var o in f) if (f.hasOwnProperty(o)) {
   var r = s(o, t);
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
 function u(e, t, a) {
  var u = n(e, a), d = i(e);
  if ("no-highlight" != d) {
   var p = d ? s(d, u) : l(u);
   d = p.language;
   var f = o(e);
   if (f.length) {
    var h = document.createElement("pre");
    h.innerHTML = p.value, p.value = r(f, o(h), u);
   }
   p.value = c(p.value, t, a);
   var m = e.className;
   m.match("(\\s|^)(language-)?" + d + "(\\s|$)") || (m = m ? m + " " + d : d), e.innerHTML = p.value, 
   e.className = m, e.result = {
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
  for (var i in e) n[i] = e[i];
  if (t) for (var i in t) n[i] = t[i];
  return n;
 };
}();

if (hljs.LANGUAGES.glsl = function(e) {
 return {
  k: {
   keyword: "atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly",
   built_in: "gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffsetgl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse",
   literal: "true false"
  },
  i: '"',
  c: [ e.CLCM, e.CBLCLM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  } ]
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
}(hljs), hljs.LANGUAGES.rsl = function(e) {
 return {
  k: {
   keyword: "float color point normal vector matrix while for if do return else break extern continue",
   built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
  },
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, e.ASM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "shader",
   bWK: !0,
   e: "\\(",
   k: "surface displacement light volume imager"
  }, {
   cN: "shading",
   bWK: !0,
   e: "\\(",
   k: "illuminate illuminance gather"
  } ]
 };
}(hljs), hljs.LANGUAGES["erlang-repl"] = function(e) {
 return {
  k: {
   special_functions: "spawn spawn_link self",
   reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
  },
  c: [ {
   cN: "prompt",
   b: "^[0-9]+> ",
   r: 10
  }, {
   cN: "comment",
   b: "%",
   e: "$"
  }, {
   cN: "number",
   b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
   r: 0
  }, e.ASM, e.QSM, {
   cN: "constant",
   b: "\\?(::)?([A-Z]\\w*(::)?)+"
  }, {
   cN: "arrow",
   b: "->"
  }, {
   cN: "ok",
   b: "ok"
  }, {
   cN: "exclamation_mark",
   b: "!"
  }, {
   cN: "function_or_atom",
   b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
   r: 0
  }, {
   cN: "variable",
   b: "[A-Z][a-zA-Z0-9_']*",
   r: 0
  } ]
 };
}(hljs), hljs.LANGUAGES["1c"] = function(e) {
 var t = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*", n = "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт", i = "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон", o = {
  cN: "dquote",
  b: '""'
 }, r = {
  cN: "string",
  b: '"',
  e: '"|$',
  c: [ o ],
  r: 0
 }, a = {
  cN: "string",
  b: "\\|",
  e: '"|$',
  c: [ o ]
 };
 return {
  cI: !0,
  l: t,
  k: {
   keyword: n,
   built_in: i
  },
  c: [ e.CLCM, e.NM, r, a, {
   cN: "function",
   b: "(процедура|функция)",
   e: "$",
   l: t,
   k: "процедура функция",
   c: [ {
    cN: "title",
    b: t
   }, {
    cN: "tail",
    eW: !0,
    c: [ {
     cN: "params",
     b: "\\(",
     e: "\\)",
     l: t,
     k: "знач",
     c: [ r, a ]
    }, {
     cN: "export",
     b: "экспорт",
     eW: !0,
     l: t,
     k: "экспорт",
     c: [ e.CLCM ]
    } ]
   }, e.CLCM ]
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "date",
   b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
  } ]
 };
}(hljs), hljs.LANGUAGES.objectivec = function(e) {
 var t = {
  keyword: "int float while private char catch export sizeof typedef const struct for union unsigned long volatile static protected bool mutable if public do return goto void enum else break extern class asm case short default double throw register explicit signed typename try this switch continue wchar_t inline readonly assign property protocol self synchronized end synthesize id optional required implementation nonatomic interface super unichar finally dynamic IBOutlet IBAction selector strong weak readonly",
  literal: "false true FALSE TRUE nil YES NO NULL",
  built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection class UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
 };
 return {
  k: t,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.CNM, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'",
   i: "[^\\\\][^']"
  }, {
   cN: "preprocessor",
   b: "#import",
   e: "$",
   c: [ {
    cN: "title",
    b: '"',
    e: '"'
   }, {
    cN: "title",
    b: "<",
    e: ">"
   } ]
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "class",
   bWK: !0,
   e: "({|$)",
   k: "interface class protocol implementation",
   c: [ {
    cN: "id",
    b: e.UIR
   } ]
  }, {
   cN: "variable",
   b: "\\." + e.UIR
  } ]
 };
}(hljs), hljs.LANGUAGES.scala = function(e) {
 var t = {
  cN: "annotation",
  b: "@[A-Za-z]+"
 }, n = {
  cN: "string",
  b: 'u?r?"""',
  e: '"""',
  r: 10
 };
 return {
  k: "type yield lazy override def with val var false true sealed abstract private trait object null if for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws",
  c: [ {
   cN: "javadoc",
   b: "/\\*\\*",
   e: "\\*/",
   c: [ {
    cN: "javadoctag",
    b: "@[A-Za-z]+"
   } ],
   r: 10
  }, e.CLCM, e.CBLCLM, e.ASM, e.QSM, n, {
   cN: "class",
   b: "((case )?class |object |trait )",
   e: "({|$)",
   i: ":",
   k: "case class trait object",
   c: [ {
    bWK: !0,
    k: "extends with",
    r: 10
   }, {
    cN: "title",
    b: e.UIR
   }, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ e.ASM, e.QSM, n, t ]
   } ]
  }, e.CNM, t ]
 };
}(hljs), hljs.LANGUAGES.clojure = function(e) {
 var t = {
  built_in: "def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for doseq dosync dotimes and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import intern refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! import use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if throw printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time ns assert re-find re-groups rand-int rand mod locking assert-valid-fdecl alias namespace resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! memfn to-array future future-call into-array aset gen-class reduce merge map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
 }, n = "[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$';]+", i = "[\\s:\\(\\{]+\\d+(\\.\\d+)?", o = {
  cN: "number",
  b: i,
  r: 0
 }, r = {
  cN: "string",
  b: '"',
  e: '"',
  c: [ e.BE ],
  r: 0
 }, a = {
  cN: "comment",
  b: ";",
  e: "$",
  r: 0
 }, s = {
  cN: "collection",
  b: "[\\[\\{]",
  e: "[\\]\\}]"
 }, l = {
  cN: "comment",
  b: "\\^" + n
 }, c = {
  cN: "comment",
  b: "\\^\\{",
  e: "\\}"
 }, u = {
  cN: "attribute",
  b: "[:]" + n
 }, d = {
  cN: "list",
  b: "\\(",
  e: "\\)",
  r: 0
 }, p = {
  eW: !0,
  eE: !0,
  k: {
   literal: "true false nil"
  },
  r: 0
 }, f = {
  k: t,
  l: n,
  cN: "title",
  b: n,
  starts: p
 };
 return d.c = [ {
  cN: "comment",
  b: "comment"
 }, f ], p.c = [ d, r, l, c, a, u, s, o ], s.c = [ d, r, l, a, u, s, o ], {
  i: "\\S",
  c: [ a, d ]
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
 }, r = [ e.BE, n, i, o ], a = {
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
 }, l = [ i, o, e.HCM, s, {
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
}(hljs), hljs.LANGUAGES.applescript = function(e) {
 var t = e.inherit(e.QSM, {
  i: ""
 }), n = {
  cN: "title",
  b: e.UIR
 }, i = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: [ "self", e.CNM, t ]
 }, o = [ {
  cN: "comment",
  b: "--",
  e: "$"
 }, {
  cN: "comment",
  b: "\\(\\*",
  e: "\\*\\)",
  c: [ "self", {
   b: "--",
   e: "$"
  } ]
 }, e.HCM ];
 return {
  k: {
   keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without",
   constant: "AppleScript false linefeed return pi quote result space tab true",
   type: "alias application boolean class constant date file integer list number real record string text",
   command: "activate beep count delay launch log offset read round run say summarize write",
   property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
  },
  c: [ t, e.CNM, {
   cN: "type",
   b: "\\bPOSIX file\\b"
  }, {
   cN: "command",
   b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
  }, {
   cN: "constant",
   b: "\\b(text item delimiters|current application|missing value)\\b"
  }, {
   cN: "keyword",
   b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
  }, {
   cN: "property",
   b: "\\b(POSIX path|(date|time) string|quoted form)\\b"
  }, {
   cN: "function_start",
   bWK: !0,
   k: "on",
   i: "[${=;\\n]",
   c: [ n, i ]
  } ].concat(o)
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
}(hljs), hljs.LANGUAGES.vhdl = function(e) {
 return {
  cI: !0,
  k: {
   keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
   typename: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector"
  },
  i: "{",
  c: [ e.CBLCLM, {
   cN: "comment",
   b: "--",
   e: "$"
  }, e.QSM, e.CNM, {
   cN: "literal",
   b: "'(U|X|0|1|Z|W|L|H|-)'",
   c: [ e.BE ]
  }, {
   cN: "attribute",
   b: "'[A-Za-z](_?[A-Za-z0-9])*",
   c: [ e.BE ]
  } ]
 };
}(hljs), hljs.LANGUAGES.brainfuck = function() {
 return {
  c: [ {
   cN: "comment",
   b: "[^\\[\\]\\.,\\+\\-<> \r\n]",
   eE: !0,
   e: "[\\[\\]\\.,\\+\\-<> \r\n]",
   r: 0
  }, {
   cN: "title",
   b: "[\\[\\]]",
   r: 0
  }, {
   cN: "string",
   b: "[\\.,]"
  }, {
   cN: "literal",
   b: "[\\+\\-]"
  } ]
 };
}(hljs), hljs.LANGUAGES.go = function(e) {
 var t = {
  keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
  constant: "true false iota nil",
  typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
  built_in: "append cap close complex copy imag len make new panic print println real recover delete"
 };
 return {
  k: t,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'",
   r: 0
  }, {
   cN: "string",
   b: "`",
   e: "`"
  }, {
   cN: "number",
   b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
   r: 0
  }, e.CNM ]
 };
}(hljs), hljs.LANGUAGES.delphi = function(e) {
 var t = "and safecall cdecl then string exports library not pascal set virtual file in array label packed end. index while const raise for to implementation with except overload destructor downto finally program exit unit inherited override if type until function do begin repeat goto nil far initialization object else var uses external resourcestring interface end finalization class asm mod case on shr shl of register xorwrite threadvar try record near stored constructor stdcall inline div out or procedure", n = "safecall stdcall pascal stored const implementation finalization except to finally program inherited override then exports string read not mod shr try div shl set library message packed index for near overload label downto exit public goto interface asm on of constructor or private array unit raise destructor var type until function else external with case default record while protected property procedure published and cdecl do threadvar file in if end virtual write far out begin repeat nil initialization object uses resourcestring class register xorwrite inline static", i = {
  cN: "comment",
  b: "{",
  e: "}",
  r: 0
 }, o = {
  cN: "comment",
  b: "\\(\\*",
  e: "\\*\\)",
  r: 10
 }, r = {
  cN: "string",
  b: "'",
  e: "'",
  c: [ {
   b: "''"
  } ],
  r: 0
 }, a = {
  cN: "string",
  b: "(#\\d+)+"
 }, s = {
  cN: "function",
  bWK: !0,
  e: "[:;]",
  k: "function constructor|10 destructor|10 procedure|10",
  c: [ {
   cN: "title",
   b: e.IR
  }, {
   cN: "params",
   b: "\\(",
   e: "\\)",
   k: t,
   c: [ r, a ]
  }, i, o ]
 };
 return {
  cI: !0,
  k: t,
  i: '("|\\$[G-Zg-z]|\\/\\*|</)',
  c: [ i, o, e.CLCM, r, a, e.NM, s, {
   cN: "class",
   b: "=\\bclass\\b",
   e: "end;",
   k: n,
   c: [ r, a, i, o, e.CLCM, s ]
  } ]
 };
}(hljs), hljs.LANGUAGES.vala = function(e) {
 return {
  k: {
   keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
   built_in: "DBus GLib CCode Gee Object",
   literal: "false true null"
  },
  c: [ {
   cN: "class",
   bWK: !0,
   e: "{",
   k: "class interface delegate namespace",
   c: [ {
    bWK: !0,
    k: "extends implements"
   }, {
    cN: "title",
    b: e.UIR
   } ]
  }, e.CLCM, e.CBLCLM, {
   cN: "string",
   b: '"""',
   e: '"""',
   r: 5
  }, e.ASM, e.QSM, e.CNM, {
   cN: "preprocessor",
   b: "^#",
   e: "$",
   r: 2
  }, {
   cN: "constant",
   b: " [A-Z_]+ ",
   r: 0
  } ]
 };
}(hljs), hljs.LANGUAGES.rib = function(e) {
 return {
  k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
  i: "</",
  c: [ e.HCM, e.CNM, e.ASM, e.QSM ]
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
 } ], a = {
  cN: "subst",
  b: "#\\{",
  e: "}",
  l: t,
  k: i
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
   c: [ e.BE, a ]
  } ]),
  r: 0
 } ]));
 return a.c = u, c.c[1].c = u, {
  l: t,
  k: i,
  c: u
 };
}(hljs), hljs.LANGUAGES.dos = function() {
 return {
  cI: !0,
  k: {
   flow: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
   keyword: "shift cd dir echo setlocal endlocal set pause copy",
   stream: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux",
   winutils: "ping net ipconfig taskkill xcopy ren del"
  },
  c: [ {
   cN: "envvar",
   b: "%%[^ ]"
  }, {
   cN: "envvar",
   b: "%[^ ]+?%"
  }, {
   cN: "envvar",
   b: "![^ ]+?!"
  }, {
   cN: "number",
   b: "\\b\\d+",
   r: 0
  }, {
   cN: "comment",
   b: "@?rem",
   e: "$"
  } ]
 };
}(hljs), hljs.LANGUAGES.lisp = function(e) {
 var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*", n = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?", i = {
  cN: "literal",
  b: "\\b(t{1}|nil)\\b"
 }, o = [ {
  cN: "number",
  b: n
 }, {
  cN: "number",
  b: "#b[0-1]+(/[0-1]+)?"
 }, {
  cN: "number",
  b: "#o[0-7]+(/[0-7]+)?"
 }, {
  cN: "number",
  b: "#x[0-9a-f]+(/[0-9a-f]+)?"
 }, {
  cN: "number",
  b: "#c\\(" + n + " +" + n,
  e: "\\)"
 } ], r = {
  cN: "string",
  b: '"',
  e: '"',
  c: [ e.BE ],
  r: 0
 }, a = {
  cN: "comment",
  b: ";",
  e: "$"
 }, s = {
  cN: "variable",
  b: "\\*",
  e: "\\*"
 }, l = {
  cN: "keyword",
  b: "[:&]" + t
 }, c = {
  b: "\\(",
  e: "\\)",
  c: [ "self", i, r ].concat(o)
 }, u = {
  cN: "quoted",
  b: "['`]\\(",
  e: "\\)",
  c: o.concat([ r, s, l, c ])
 }, d = {
  cN: "quoted",
  b: "\\(quote ",
  e: "\\)",
  k: {
   title: "quote"
  },
  c: o.concat([ r, s, l, c ])
 }, p = {
  cN: "list",
  b: "\\(",
  e: "\\)"
 }, f = {
  cN: "body",
  eW: !0,
  eE: !0
 };
 return p.c = [ {
  cN: "title",
  b: t
 }, f ], f.c = [ u, d, p, i ].concat(o).concat([ r, a, s, l ]), {
  i: "[^\\s]",
  c: o.concat([ i, r, a, u, d, p ])
 };
}(hljs), hljs.LANGUAGES.apache = function(e) {
 var t = {
  cN: "number",
  b: "[\\$%]\\d+"
 };
 return {
  cI: !0,
  k: {
   keyword: "acceptfilter acceptmutex acceptpathinfo accessfilename action addalt addaltbyencoding addaltbytype addcharset adddefaultcharset adddescription addencoding addhandler addicon addiconbyencoding addiconbytype addinputfilter addlanguage addmoduleinfo addoutputfilter addoutputfilterbytype addtype alias aliasmatch allow allowconnect allowencodedslashes allowoverride anonymous anonymous_logemail anonymous_mustgiveemail anonymous_nouserid anonymous_verifyemail authbasicauthoritative authbasicprovider authdbduserpwquery authdbduserrealmquery authdbmgroupfile authdbmtype authdbmuserfile authdefaultauthoritative authdigestalgorithm authdigestdomain authdigestnccheck authdigestnonceformat authdigestnoncelifetime authdigestprovider authdigestqop authdigestshmemsize authgroupfile authldapbinddn authldapbindpassword authldapcharsetconfig authldapcomparednonserver authldapdereferencealiases authldapgroupattribute authldapgroupattributeisdn authldapremoteuserattribute authldapremoteuserisdn authldapurl authname authnprovideralias authtype authuserfile authzdbmauthoritative authzdbmtype authzdefaultauthoritative authzgroupfileauthoritative authzldapauthoritative authzownerauthoritative authzuserauthoritative balancermember browsermatch browsermatchnocase bufferedlogs cachedefaultexpire cachedirlength cachedirlevels cachedisable cacheenable cachefile cacheignorecachecontrol cacheignoreheaders cacheignorenolastmod cacheignorequerystring cachelastmodifiedfactor cachemaxexpire cachemaxfilesize cacheminfilesize cachenegotiateddocs cacheroot cachestorenostore cachestoreprivate cgimapextension charsetdefault charsetoptions charsetsourceenc checkcaseonly checkspelling chrootdir contentdigest cookiedomain cookieexpires cookielog cookiename cookiestyle cookietracking coredumpdirectory customlog dav davdepthinfinity davgenericlockdb davlockdb davmintimeout dbdexptime dbdkeep dbdmax dbdmin dbdparams dbdpersist dbdpreparesql dbdriver defaulticon defaultlanguage defaulttype deflatebuffersize deflatecompressionlevel deflatefilternote deflatememlevel deflatewindowsize deny directoryindex directorymatch directoryslash documentroot dumpioinput dumpiologlevel dumpiooutput enableexceptionhook enablemmap enablesendfile errordocument errorlog example expiresactive expiresbytype expiresdefault extendedstatus extfilterdefine extfilteroptions fileetag filterchain filterdeclare filterprotocol filterprovider filtertrace forcelanguagepriority forcetype forensiclog gracefulshutdowntimeout group header headername hostnamelookups identitycheck identitychecktimeout imapbase imapdefault imapmenu include indexheadinsert indexignore indexoptions indexorderdefault indexstylesheet isapiappendlogtoerrors isapiappendlogtoquery isapicachefile isapifakeasync isapilognotsupported isapireadaheadbuffer keepalive keepalivetimeout languagepriority ldapcacheentries ldapcachettl ldapconnectiontimeout ldapopcacheentries ldapopcachettl ldapsharedcachefile ldapsharedcachesize ldaptrustedclientcert ldaptrustedglobalcert ldaptrustedmode ldapverifyservercert limitinternalrecursion limitrequestbody limitrequestfields limitrequestfieldsize limitrequestline limitxmlrequestbody listen listenbacklog loadfile loadmodule lockfile logformat loglevel maxclients maxkeepaliverequests maxmemfree maxrequestsperchild maxrequestsperthread maxspareservers maxsparethreads maxthreads mcachemaxobjectcount mcachemaxobjectsize mcachemaxstreamingbuffer mcacheminobjectsize mcacheremovalalgorithm mcachesize metadir metafiles metasuffix mimemagicfile minspareservers minsparethreads mmapfile mod_gzip_on mod_gzip_add_header_count mod_gzip_keep_workfiles mod_gzip_dechunk mod_gzip_min_http mod_gzip_minimum_file_size mod_gzip_maximum_file_size mod_gzip_maximum_inmem_size mod_gzip_temp_dir mod_gzip_item_include mod_gzip_item_exclude mod_gzip_command_version mod_gzip_can_negotiate mod_gzip_handle_methods mod_gzip_static_suffix mod_gzip_send_vary mod_gzip_update_static modmimeusepathinfo multiviewsmatch namevirtualhost noproxy nwssltrustedcerts nwsslupgradeable options order passenv pidfile protocolecho proxybadheader proxyblock proxydomain proxyerroroverride proxyftpdircharset proxyiobuffersize proxymaxforwards proxypass proxypassinterpolateenv proxypassmatch proxypassreverse proxypassreversecookiedomain proxypassreversecookiepath proxypreservehost proxyreceivebuffersize proxyremote proxyremotematch proxyrequests proxyset proxystatus proxytimeout proxyvia readmename receivebuffersize redirect redirectmatch redirectpermanent redirecttemp removecharset removeencoding removehandler removeinputfilter removelanguage removeoutputfilter removetype requestheader require rewritebase rewritecond rewriteengine rewritelock rewritelog rewriteloglevel rewritemap rewriteoptions rewriterule rlimitcpu rlimitmem rlimitnproc satisfy scoreboardfile script scriptalias scriptaliasmatch scriptinterpretersource scriptlog scriptlogbuffer scriptloglength scriptsock securelisten seerequesttail sendbuffersize serveradmin serveralias serverlimit servername serverpath serverroot serversignature servertokens setenv setenvif setenvifnocase sethandler setinputfilter setoutputfilter ssienableaccess ssiendtag ssierrormsg ssistarttag ssitimeformat ssiundefinedecho sslcacertificatefile sslcacertificatepath sslcadnrequestfile sslcadnrequestpath sslcarevocationfile sslcarevocationpath sslcertificatechainfile sslcertificatefile sslcertificatekeyfile sslciphersuite sslcryptodevice sslengine sslhonorciperorder sslmutex ssloptions sslpassphrasedialog sslprotocol sslproxycacertificatefile sslproxycacertificatepath sslproxycarevocationfile sslproxycarevocationpath sslproxyciphersuite sslproxyengine sslproxymachinecertificatefile sslproxymachinecertificatepath sslproxyprotocol sslproxyverify sslproxyverifydepth sslrandomseed sslrequire sslrequiressl sslsessioncache sslsessioncachetimeout sslusername sslverifyclient sslverifydepth startservers startthreads substitute suexecusergroup threadlimit threadsperchild threadstacksize timeout traceenable transferlog typesconfig unsetenv usecanonicalname usecanonicalphysicalport user userdir virtualdocumentroot virtualdocumentrootip virtualscriptalias virtualscriptaliasip win32disableacceptex xbithack",
   literal: "on off"
  },
  c: [ e.HCM, {
   cN: "sqbracket",
   b: "\\s\\[",
   e: "\\]$"
  }, {
   cN: "cbracket",
   b: "[\\$%]\\{",
   e: "\\}",
   c: [ "self", t ]
  }, t, {
   cN: "tag",
   b: "</?",
   e: ">"
  }, e.QSM ]
 };
}(hljs), hljs.LANGUAGES.actionscript = function(e) {
 var t = "[a-zA-Z_$][a-zA-Z0-9_$]*", n = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)", i = {
  cN: "rest_arg",
  b: "[.]{3}",
  e: t,
  r: 10
 }, o = {
  cN: "title",
  b: t
 };
 return {
  k: {
   keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
   literal: "true false null undefined"
  },
  c: [ e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
   cN: "package",
   bWK: !0,
   e: "{",
   k: "package",
   c: [ o ]
  }, {
   cN: "class",
   bWK: !0,
   e: "{",
   k: "class interface",
   c: [ {
    bWK: !0,
    k: "extends implements"
   }, o ]
  }, {
   cN: "preprocessor",
   bWK: !0,
   e: ";",
   k: "import include"
  }, {
   cN: "function",
   bWK: !0,
   e: "[{;]",
   k: "function",
   i: "\\S",
   c: [ o, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ e.ASM, e.QSM, e.CLCM, e.CBLCLM, i ]
   }, {
    cN: "type",
    b: ":",
    e: n,
    r: 10
   } ]
  } ]
 };
}(hljs), hljs.LANGUAGES.erlang = function(e) {
 var t = "[a-z'][a-zA-Z0-9_']*", n = "(" + t + ":" + t + "|" + t + ")", i = {
  keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let not of orelse|10 query receive rem try when xor",
  literal: "false true"
 }, o = {
  cN: "comment",
  b: "%",
  e: "$",
  r: 0
 }, r = {
  cN: "number",
  b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
  r: 0
 }, a = {
  b: "fun\\s+" + t + "/\\d+"
 }, s = {
  b: n + "\\(",
  e: "\\)",
  rB: !0,
  r: 0,
  c: [ {
   cN: "function_name",
   b: n,
   r: 0
  }, {
   b: "\\(",
   e: "\\)",
   eW: !0,
   rE: !0,
   r: 0
  } ]
 }, l = {
  cN: "tuple",
  b: "{",
  e: "}",
  r: 0
 }, c = {
  cN: "variable",
  b: "\\b_([A-Z][A-Za-z0-9_]*)?",
  r: 0
 }, u = {
  cN: "variable",
  b: "[A-Z][a-zA-Z0-9_]*",
  r: 0
 }, d = {
  b: "#",
  e: "}",
  i: ".",
  r: 0,
  rB: !0,
  c: [ {
   cN: "record_name",
   b: "#" + e.UIR,
   r: 0
  }, {
   b: "{",
   eW: !0,
   r: 0
  } ]
 }, p = {
  k: i,
  b: "(fun|receive|if|try|case)",
  e: "end"
 };
 p.c = [ o, a, e.inherit(e.ASM, {
  cN: ""
 }), p, s, e.QSM, r, l, c, u, d ];
 var f = [ o, a, p, s, e.QSM, r, l, c, u, d ];
 s.c[1].c = f, l.c = f, d.c[1].c = f;
 var h = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: f
 };
 return {
  k: i,
  i: "(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))",
  c: [ {
   cN: "function",
   b: "^" + t + "\\s*\\(",
   e: "->",
   rB: !0,
   i: "\\(|#|//|/\\*|\\\\|:",
   c: [ h, {
    cN: "title",
    b: t
   } ],
   starts: {
    e: ";|\\.",
    k: i,
    c: f
   }
  }, o, {
   cN: "pp",
   b: "^-",
   e: "\\.",
   r: 0,
   eE: !0,
   rB: !0,
   l: "-" + e.IR,
   k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior",
   c: [ h ]
  }, r, e.QSM, d, c, u, l ]
 };
}(hljs), hljs.LANGUAGES.rust = function(e) {
 var t = {
  cN: "title",
  b: e.UIR
 }, n = {
  cN: "number",
  b: "\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)",
  r: 0
 }, i = "alt any as assert be bind block bool break char check claim const cont dir do else enum export f32 f64 fail false float fn for i16 i32 i64 i8 if iface impl import in int let log mod mutable native note of prove pure resource ret self str syntax true type u16 u32 u64 u8 uint unchecked unsafe use vec while";
 return {
  k: i,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.inherit(e.QSM, {
   i: null
  }), e.ASM, n, {
   cN: "function",
   bWK: !0,
   e: "(\\(|<)",
   k: "fn",
   c: [ t ]
  }, {
   cN: "preprocessor",
   b: "#\\[",
   e: "\\]"
  }, {
   bWK: !0,
   e: "(=|<)",
   k: "type",
   c: [ t ],
   i: "\\S"
  }, {
   bWK: !0,
   e: "({|<)",
   k: "iface enum",
   c: [ t ],
   i: "\\S"
  } ]
 };
}(hljs), hljs.LANGUAGES.avrasm = function(e) {
 return {
  cI: !0,
  k: {
   keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
   built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf"
  },
  c: [ e.CBLCLM, {
   cN: "comment",
   b: ";",
   e: "$"
  }, e.CNM, e.BNM, {
   cN: "number",
   b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
  }, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'",
   i: "[^\\\\][^']"
  }, {
   cN: "label",
   b: "^[A-Za-z0-9_.$]+:"
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "preprocessor",
   b: "\\.[a-zA-Z]+"
  }, {
   cN: "localvars",
   b: "@[0-9]+"
  } ]
 };
}(hljs), hljs.LANGUAGES.tex = function() {
 var e = {
  cN: "command",
  b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
 }, t = {
  cN: "command",
  b: "\\\\[^a-zA-Zа-яА-я0-9]"
 }, n = {
  cN: "special",
  b: "[{}\\[\\]\\&#~]",
  r: 0
 };
 return {
  c: [ {
   b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
   rB: !0,
   c: [ e, t, {
    cN: "number",
    b: " *=",
    e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
    eB: !0
   } ],
   r: 10
  }, e, t, n, {
   cN: "formula",
   b: "\\$\\$",
   e: "\\$\\$",
   c: [ e, t, n ],
   r: 0
  }, {
   cN: "formula",
   b: "\\$",
   e: "\\$",
   c: [ e, t, n ],
   r: 0
  }, {
   cN: "comment",
   b: "%",
   e: "$",
   r: 0
  } ]
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
}(hljs), hljs.LANGUAGES.nginx = function(e) {
 var t = [ {
  cN: "variable",
  b: "\\$\\d+"
 }, {
  cN: "variable",
  b: "\\${",
  e: "}"
 }, {
  cN: "variable",
  b: "[\\$\\@]" + e.UIR
 } ], n = {
  eW: !0,
  l: "[a-z/_]+",
  k: {
   built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
  },
  r: 0,
  i: "=>",
  c: [ e.HCM, {
   cN: "string",
   b: '"',
   e: '"',
   c: [ e.BE ].concat(t),
   r: 0
  }, {
   cN: "string",
   b: "'",
   e: "'",
   c: [ e.BE ].concat(t),
   r: 0
  }, {
   cN: "url",
   b: "([a-z]+):/",
   e: "\\s",
   eW: !0,
   eE: !0
  }, {
   cN: "regexp",
   b: "\\s\\^",
   e: "\\s|{|;",
   rE: !0,
   c: [ e.BE ].concat(t)
  }, {
   cN: "regexp",
   b: "~\\*?\\s+",
   e: "\\s|{|;",
   rE: !0,
   c: [ e.BE ].concat(t)
  }, {
   cN: "regexp",
   b: "\\*(\\.[a-z\\-]+)+",
   c: [ e.BE ].concat(t)
  }, {
   cN: "regexp",
   b: "([a-z\\-]+\\.)+\\*",
   c: [ e.BE ].concat(t)
  }, {
   cN: "number",
   b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
  }, {
   cN: "number",
   b: "\\b\\d+[kKmMgGdshdwy]*\\b",
   r: 0
  } ].concat(t)
 };
 return {
  c: [ e.HCM, {
   b: e.UIR + "\\s",
   e: ";|{",
   rB: !0,
   c: [ {
    cN: "title",
    b: e.UIR,
    starts: n
   } ]
  } ],
  i: "[^\\s\\}]"
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
}(hljs), hljs.LANGUAGES.parser3 = function(e) {
 return {
  sL: "xml",
  c: [ {
   cN: "comment",
   b: "^#",
   e: "$"
  }, {
   cN: "comment",
   b: "\\^rem{",
   e: "}",
   r: 10,
   c: [ {
    b: "{",
    e: "}",
    c: [ "self" ]
   } ]
  }, {
   cN: "preprocessor",
   b: "^@(?:BASE|USE|CLASS|OPTIONS)$",
   r: 10
  }, {
   cN: "title",
   b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
  }, {
   cN: "variable",
   b: "\\$\\{?[\\w\\-\\.\\:]+\\}?"
  }, {
   cN: "keyword",
   b: "\\^[\\w\\-\\.\\:]+"
  }, {
   cN: "number",
   b: "\\^#[0-9a-fA-F]+"
  }, e.CNM ]
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
}(hljs), hljs.LANGUAGES.axapta = function(e) {
 return {
  k: "false int abstract private char interface boolean static null if for true while long throw finally protected extends final implements return void enum else break new catch byte super class case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
  c: [ e.CLCM, e.CBLCLM, e.ASM, e.QSM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "class",
   bWK: !0,
   e: "{",
   i: ":",
   k: "class interface",
   c: [ {
    cN: "inheritance",
    bWK: !0,
    k: "extends implements",
    r: 10
   }, {
    cN: "title",
    b: e.UIR
   } ]
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
}(hljs), hljs.LANGUAGES.matlab = function(e) {
 var t = [ e.CNM, {
  cN: "string",
  b: "'",
  e: "'",
  c: [ e.BE, {
   b: "''"
  } ],
  r: 0
 } ];
 return {
  k: {
   keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
   built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
  },
  i: '(//|"|#|/\\*|\\s+/\\w+)',
  c: [ {
   cN: "function",
   bWK: !0,
   e: "$",
   k: "function",
   c: [ {
    cN: "title",
    b: e.UIR
   }, {
    cN: "params",
    b: "\\(",
    e: "\\)"
   }, {
    cN: "params",
    b: "\\[",
    e: "\\]"
   } ]
  }, {
   cN: "transposed_variable",
   b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
   e: ""
  }, {
   cN: "matrix",
   b: "\\[",
   e: "\\]'*[\\.']*",
   c: t
  }, {
   cN: "cell",
   b: "\\{",
   e: "\\}'*[\\.']*",
   c: t
  }, {
   cN: "comment",
   b: "\\%",
   e: "$"
  } ].concat(t)
 };
}(hljs), hljs.LANGUAGES.d = function(e) {
 var t = {
  keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
  built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
  literal: "false null true"
 }, n = "(0|[1-9][\\d_]*)", i = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)", o = "0[bB][01_]+", r = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)", a = "0[xX]" + r, s = "([eE][+-]?" + i + ")", l = "(" + i + "(\\.\\d*|" + s + ")|\\d+\\." + i + i + "|\\." + n + s + "?)", c = "(0[xX](" + r + "\\." + r + "|\\.?" + r + ")[pP][+-]?" + i + ")", u = "(" + n + "|" + o + "|" + a + ")", d = "(" + c + "|" + l + ")", p = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};", f = {
  cN: "number",
  b: "\\b" + u + "(L|u|U|Lu|LU|uL|UL)?",
  r: 0
 }, h = {
  cN: "number",
  b: "\\b(" + d + "([fF]|L|i|[fF]i|Li)?|" + u + "(i|[fF]i|Li))",
  r: 0
 }, m = {
  cN: "string",
  b: "'(" + p + "|.)",
  e: "'",
  i: "."
 }, g = {
  b: p,
  r: 0
 }, v = {
  cN: "string",
  b: '"',
  c: [ g ],
  e: '"[cwd]?',
  r: 0
 }, b = {
  cN: "string",
  b: '[rq]"',
  e: '"[cwd]?',
  r: 5
 }, y = {
  cN: "string",
  b: "`",
  e: "`[cwd]?"
 }, x = {
  cN: "string",
  b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
  r: 10
 }, w = {
  cN: "string",
  b: 'q"\\{',
  e: '\\}"'
 }, C = {
  cN: "shebang",
  b: "^#!",
  e: "$",
  r: 5
 }, k = {
  cN: "preprocessor",
  b: "#(line)",
  e: "$",
  r: 5
 }, S = {
  cN: "keyword",
  b: "@[a-zA-Z_][a-zA-Z_\\d]*"
 }, _ = {
  cN: "comment",
  b: "\\/\\+",
  c: [ "self" ],
  e: "\\+\\/",
  r: 10
 };
 return {
  l: e.UIR,
  k: t,
  c: [ e.CLCM, e.CBLCLM, _, x, v, b, y, w, h, f, m, C, k, S ]
 };
}(hljs), hljs.LANGUAGES.profile = function(e) {
 return {
  c: [ e.CNM, {
   cN: "builtin",
   b: "{",
   e: "}$",
   eB: !0,
   eE: !0,
   c: [ e.ASM, e.QSM ],
   r: 0
  }, {
   cN: "filename",
   b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
   e: ":",
   eE: !0
  }, {
   cN: "header",
   b: "(ncalls|tottime|cumtime)",
   e: "$",
   k: "ncalls tottime|10 cumtime|10 filename",
   r: 10
  }, {
   cN: "summary",
   b: "function calls",
   e: "$",
   c: [ e.CNM ],
   r: 10
  }, e.ASM, e.QSM, {
   cN: "function",
   b: "\\(",
   e: "\\)$",
   c: [ {
    cN: "title",
    b: e.UIR,
    r: 0
   } ],
   r: 0
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
}(hljs), hljs.LANGUAGES.bash = function(e) {
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
  c: [ r, a, i, o ],
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
  }, i, o, e.HCM, r, a, e.inherit(s, {
   b: "\\[ ",
   e: " \\]",
   r: 0
  }), e.inherit(s, {
   b: "\\[\\[ ",
   e: " \\]\\]"
  }) ]
 };
}(hljs), hljs.LANGUAGES.django = function(e) {
 function t(e, t) {
  return void 0 == t || !e.cN && "tag" == t.cN || "value" == e.cN;
 }
 function n(e, i) {
  var r = {};
  for (var a in e) {
   "contains" != a && (r[a] = e[a]);
   for (var s = [], l = 0; e.c && l < e.c.length; l++) s.push(n(e.c[l], e));
   t(e, i) && (s = o.concat(s)), s.length && (r.c = s);
  }
  return r;
 }
 var i = {
  cN: "filter",
  b: "\\|[A-Za-z]+\\:?",
  eE: !0,
  k: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone",
  c: [ {
   cN: "argument",
   b: '"',
   e: '"'
  } ]
 }, o = [ {
  cN: "template_comment",
  b: "{%\\s*comment\\s*%}",
  e: "{%\\s*endcomment\\s*%}"
 }, {
  cN: "template_comment",
  b: "{#",
  e: "#}"
 }, {
  cN: "template_tag",
  b: "{%",
  e: "%}",
  k: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone",
  c: [ i ]
 }, {
  cN: "variable",
  b: "{{",
  e: "}}",
  c: [ i ]
 } ], r = n(e.LANGUAGES.xml);
 return r.cI = !0, r;
}(hljs), hljs.LANGUAGES.smalltalk = function(e) {
 var t = "[a-z][a-zA-Z0-9_]*", n = {
  cN: "char",
  b: "\\$.{1}"
 }, i = {
  cN: "symbol",
  b: "#" + e.UIR
 };
 return {
  k: "self super nil true false thisContext",
  c: [ {
   cN: "comment",
   b: '"',
   e: '"',
   r: 0
  }, e.ASM, {
   cN: "class",
   b: "\\b[A-Z][A-Za-z0-9_]*",
   r: 0
  }, {
   cN: "method",
   b: t + ":"
  }, e.CNM, i, n, {
   cN: "localvars",
   b: "\\|\\s*((" + t + ")\\s*)+\\|"
  }, {
   cN: "array",
   b: "\\#\\(",
   e: "\\)",
   c: [ e.ASM, n, e.CNM, i ]
  } ]
 };
}(hljs), hljs.LANGUAGES.markdown = function() {
 return {
  c: [ {
   cN: "header",
   b: "^#{1,3}",
   e: "$"
  }, {
   cN: "header",
   b: "^.+?\\n[=-]{2,}$"
  }, {
   b: "<",
   e: ">",
   sL: "xml",
   r: 0
  }, {
   cN: "bullet",
   b: "^([*+-]|(\\d+\\.))\\s+"
  }, {
   cN: "strong",
   b: "[*_]{2}.+?[*_]{2}"
  }, {
   cN: "emphasis",
   b: "\\*.+?\\*"
  }, {
   cN: "emphasis",
   b: "_.+?_",
   r: 0
  }, {
   cN: "blockquote",
   b: "^>\\s+",
   e: "$"
  }, {
   cN: "code",
   b: "`.+?`"
  }, {
   cN: "code",
   b: "^    ",
   e: "$",
   r: 0
  }, {
   cN: "horizontal_rule",
   b: "^-{3,}",
   e: "$"
  }, {
   b: "\\[.+?\\]\\(.+?\\)",
   rB: !0,
   c: [ {
    cN: "link_label",
    b: "\\[.+\\]"
   }, {
    cN: "link_url",
    b: "\\(",
    e: "\\)",
    eB: !0,
    eE: !0
   } ]
  } ]
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
}(hljs), hljs.LANGUAGES.vbscript = function(e) {
 return {
  cI: !0,
  k: {
   keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
   built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
   literal: "true false null nothing empty"
  },
  i: "//",
  c: [ e.inherit(e.QSM, {
   c: [ {
    b: '""'
   } ]
  }), {
   cN: "comment",
   b: "'",
   e: "$"
  }, e.CNM ]
 };
}(hljs), hljs.LANGUAGES.haskell = function(e) {
 var t = {
  cN: "type",
  b: "\\b[A-Z][\\w']*",
  r: 0
 }, n = {
  cN: "container",
  b: "\\(",
  e: "\\)",
  c: [ {
   cN: "type",
   b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
  }, {
   cN: "title",
   b: "[_a-z][\\w']*"
  } ]
 }, i = {
  cN: "container",
  b: "{",
  e: "}",
  c: n.c
 };
 return {
  k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance not as foreign ccall safe unsafe",
  c: [ {
   cN: "comment",
   b: "--",
   e: "$"
  }, {
   cN: "preprocessor",
   b: "{-#",
   e: "#-}"
  }, {
   cN: "comment",
   c: [ "self" ],
   b: "{-",
   e: "-}"
  }, {
   cN: "string",
   b: "\\s+'",
   e: "'",
   c: [ e.BE ],
   r: 0
  }, e.QSM, {
   cN: "import",
   b: "\\bimport",
   e: "$",
   k: "import qualified as hiding",
   c: [ n ],
   i: "\\W\\.|;"
  }, {
   cN: "module",
   b: "\\bmodule",
   e: "where",
   k: "module where",
   c: [ n ],
   i: "\\W\\.|;"
  }, {
   cN: "class",
   b: "\\b(class|instance)",
   e: "where",
   k: "class where instance",
   c: [ t ]
  }, {
   cN: "typedef",
   b: "\\b(data|(new)?type)",
   e: "$",
   k: "data type newtype deriving",
   c: [ t, n, i ]
  }, e.CNM, {
   cN: "shebang",
   b: "#!\\/usr\\/bin\\/env runhaskell",
   e: "$"
  }, t, {
   cN: "title",
   b: "^[_a-z][\\w']*"
  } ]
 };
}(hljs), hljs.LANGUAGES.coffeescript = function(e) {
 var t = {
  keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
  literal: "true false null undefined yes no on off ",
  reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf"
 }, n = "[A-Za-z$_][0-9A-Za-z$_]*", i = {
  cN: "title",
  b: n
 }, o = {
  cN: "subst",
  b: "#\\{",
  e: "}",
  k: t,
  c: [ e.BNM, e.CNM ]
 };
 return {
  k: t,
  c: [ e.BNM, e.CNM, e.ASM, {
   cN: "string",
   b: '"""',
   e: '"""',
   c: [ e.BE, o ]
  }, {
   cN: "string",
   b: '"',
   e: '"',
   c: [ e.BE, o ],
   r: 0
  }, {
   cN: "comment",
   b: "###",
   e: "###"
  }, e.HCM, {
   cN: "regexp",
   b: "///",
   e: "///",
   c: [ e.HCM ]
  }, {
   cN: "regexp",
   b: "//[gim]*"
  }, {
   cN: "regexp",
   b: "/\\S(\\\\.|[^\\n])*/[gim]*"
  }, {
   b: "`",
   e: "`",
   eB: !0,
   eE: !0,
   sL: "javascript"
  }, {
   cN: "function",
   b: n + "\\s*=\\s*(\\(.+\\))?\\s*[-=]>",
   rB: !0,
   c: [ i, {
    cN: "params",
    b: "\\(",
    e: "\\)"
   } ]
  }, {
   cN: "class",
   bWK: !0,
   k: "class",
   e: "$",
   i: ":",
   c: [ {
    bWK: !0,
    k: "extends",
    eW: !0,
    i: ":",
    c: [ i ]
   }, i ]
  }, {
   cN: "property",
   b: "@" + n
  } ]
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
}(hljs), hljs.LANGUAGES.cmake = function(e) {
 return {
  cI: !0,
  k: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file",
  c: [ {
   cN: "envvar",
   b: "\\${",
   e: "}"
  }, e.HCM, e.QSM, e.NM ]
 };
}(hljs), hljs.LANGUAGES.lua = function(e) {
 var t = "\\[=*\\[", n = "\\]=*\\]", i = {
  b: t,
  e: n,
  c: [ "self" ]
 }, o = [ {
  cN: "comment",
  b: "--(?!" + t + ")",
  e: "$"
 }, {
  cN: "comment",
  b: "--" + t,
  e: n,
  c: [ i ],
  r: 10
 } ];
 return {
  l: e.UIR,
  k: {
   keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
   built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
  },
  c: o.concat([ {
   cN: "function",
   bWK: !0,
   e: "\\)",
   k: "function",
   c: [ {
    cN: "title",
    b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
   }, {
    cN: "params",
    b: "\\(",
    eW: !0,
    c: o
   } ].concat(o)
  }, e.CNM, e.ASM, e.QSM, {
   cN: "string",
   b: t,
   e: n,
   c: [ i ],
   r: 10
  } ])
 };
}(hljs), hljs.LANGUAGES.r = function(e) {
 var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
 return {
  c: [ e.HCM, {
   b: t,
   l: t,
   k: {
    keyword: "function if in break next repeat else for return switch while try tryCatch|10 stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...|10",
    literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
   },
   r: 0
  }, {
   cN: "number",
   b: "0[xX][0-9a-fA-F]+[Li]?\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\d+\\.(?!\\d)(?:i\\b)?",
   r: 0
  }, {
   cN: "number",
   b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
   r: 0
  }, {
   b: "`",
   e: "`",
   r: 0
  }, {
   cN: "string",
   b: '"',
   e: '"',
   c: [ e.BE ],
   r: 0
  }, {
   cN: "string",
   b: "'",
   e: "'",
   c: [ e.BE ],
   r: 0
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
}(hljs), hljs.LANGUAGES.mel = function(e) {
 return {
  k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
  i: "</",
  c: [ e.CNM, e.ASM, e.QSM, {
   cN: "string",
   b: "`",
   e: "`",
   c: [ e.BE ]
  }, {
   cN: "variable",
   b: "\\$\\d",
   r: 5
  }, {
   cN: "variable",
   b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)"
  }, e.CLCM, e.CBLCLM ]
 };
}(hljs), define("highlightjs", function() {}), function() {
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
 function a(e) {
  return "" != e.charAt(0) && (e = "" + e), "" != e.charAt(e.length - 1) && (e += ""), 
  e;
 }
 function s(e) {
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
  var n = new Markdown.Extra(), o = [], r = [], a = [ "unHashExtraBlocks" ];
  return t = t || {}, t.extensions = t.extensions || [ "all" ], i(t.extensions, "all") && (t.extensions = [ "tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes" ]), 
  i(t.extensions, "attr_list") && (o.push("hashFcbAttributeBlocks"), r.push("hashHeaderAttributeBlocks"), 
  a.push("applyAttributeBlocks"), n.attributeBlocks = !0), i(t.extensions, "tables") && r.push("tables"), 
  i(t.extensions, "fenced_code_gfm") && o.push("fencedCodeBlocks"), i(t.extensions, "def_list") && r.push("definitionLists"), 
  i(t.extensions, "footnotes") && (o.push("stripFootnoteDefinitions"), r.push("doFootnotes"), 
  a.push("printFootnotes")), e.hooks.chain("postNormalization", function(e) {
   return n.doTransform(o, e) + "\n";
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
  return e = e.replace(n, function(e, n, i, o, a) {
   if (!i) return "";
   for (var s = parseInt(n, 10), l = t.hashBlocks[s], c = l.match(/#[^\s{}]+/g) || [], u = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", d = l.match(/\.[^\s{}]+/g) || [], p = 0; p < d.length; p++) d[p] = d[p].substr(1, d[p].length - 1);
   var f = "";
   return o && (d = r(d, [ o ])), d.length > 0 && (f = ' class="' + d.join(" ") + '"'), 
   "<" + i + u + f + a;
  });
 }, Markdown.Extra.prototype.tables = function(t) {
  function n(t, n, o, r) {
   n = n.replace(/^ *[|]/m, ""), o = o.replace(/^ *[|]/m, ""), r = r.replace(/^ *[|]/gm, ""), 
   n = n.replace(/[|] *$/m, ""), o = o.replace(/[|] *$/m, ""), r = r.replace(/[|] *$/gm, ""), 
   alignspecs = o.split(/ *[|] */), align = [];
   for (var a = 0; a < alignspecs.length; a++) {
    var s = alignspecs[a];
    align[a] = s.match(/^ *-+: *$/m) ? ' style="text-align:right;"' : s.match(/^ *:-+: *$/m) ? ' style="text-align:center;"' : s.match(/^ *:-+ *$/m) ? ' style="text-align:left;"' : "";
   }
   var c = n.split(/ *[|] */), u = c.length, d = i.tableClass ? ' class="' + i.tableClass + '"' : "", p = [ "<table", d, ">\n", "<thead>\n", "<tr>\n" ].join("");
   for (a = 0; u > a; a++) {
    var f = l(e(c[a]), i);
    p += [ "  <th", align[a], ">", f, "</th>\n" ].join("");
   }
   p += "</tr>\n</thead>\n";
   var h = r.split("\n");
   for (a = 0; a < h.length; a++) if (!h[a].match(/^\s*$/)) {
    for (var m = h[a].split(/ *[|] */), g = u - m.length, v = 0; g > v; v++) m.push("");
    for (p += "<tr>\n", v = 0; u > v; v++) {
     var b = l(e(m[v]), i);
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
   var a = '<a href="#fn:' + o + '" id="fnref:' + o + '" title="See footnote" class="footnote">' + n + "</a>";
   return t.hashExtraInline(a);
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
   var r = i, a = o, s = n.googleCodePrettify ? ' class="prettyprint"' : "", l = "";
   r && (l = n.googleCodePrettify || n.highlightJs ? ' class="language-' + r + '"' : ' class="' + r + '"');
   var c = [ "<pre", s, "><code", l, ">", t(a), "</code></pre>" ].join("");
   return n.hashExtraBlock(c);
  });
 }, Markdown.Extra.prototype.definitionLists = function(t) {
  var n = new RegExp([ "(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")" ].join(""), "gm"), i = this;
  return t = a(t), t = t.replace(n, function(t, n, o) {
   var r = e(i.processDefListItems(o));
   return r = "<dl>\n" + r + "\n</dl>", n + i.hashExtraBlock(r) + "\n\n";
  }), s(t);
 }, Markdown.Extra.prototype.processDefListItems = function(i) {
  var o = this, r = new RegExp([ "(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])" ].join(""), "gm"), u = new RegExp([ "\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")" ].join(""), "gm");
  return i = a(i), i = i.replace(/\n{2,}(?=\\x03)/, "\n"), i = i.replace(r, function(t, n, i) {
   for (var r = e(i).split("\n"), a = "", s = 0; s < r.length; s++) {
    var c = r[s];
    c = l(e(c), o), a += "\n<dt>" + c + "</dt>";
   }
   return a + "\n";
  }), i = i.replace(u, function(e, i, r, a) {
   return i || a.match(/\n{2,}/) ? (a = Array(r.length + 1).join(" ") + a, a = n(a) + "\n\n", 
   a = "\n" + c(a, o) + "\n") : (a = t(a), a = l(n(a), o)), "\n<dd>" + a + "</dd>\n";
  }), s(i);
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
 function a(e, t, n) {
  this.tagName = e, this.anchor = t, this.text = n, this.children = [];
 }
 function s(e, n) {
  function i() {
   void 0 !== l && (l.children.length > 0 && (l.children = s(l.children, n + 1)), r.push(l));
  }
  n = n || 1;
  var o = "H" + n, r = [], l = void 0;
  return t.each(e, function(e) {
   e.tagName != o ? (void 0 === l && (l = new a()), l.children.push(e)) : (i(), l = e);
  }), i(), r;
 }
 function l() {
  function e(e) {
   for (var o = e.id || n.slugify(e.textContent) || "title", r = o, a = 0; t.has(i, r); ) r = o + "-" + ++a;
   return i[r] = !0, e.id = r, r;
  }
  var i = {}, o = [];
  return t.each(u.querySelectorAll(".preview-content > .wmd-title"), function(t) {
   o.push(new a(t.tagName, e(t), t.textContent));
  }), o = s(o), '<div class="toc">\n<ul>\n' + o.join("") + "</ul>\n</div>\n";
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
}), define("extensions/mathJax", [ "utils", "classes/Extension", "text!html/mathJaxSettingsBlock.html", "mathjax" ], function(utils, Extension, mathJaxSettingsBlockHTML) {
 function b(e, t, n) {
  var r = k.slice(e, t + 1).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (h.Browser.isMSIE && (r = r.replace(/(%[^\n]*)\n/g, "$1<br/>\n")); t > e; ) k[t] = "", 
  t--;
  k[e] = "@@" + m.length + "@@", n && (r = n(r)), m.push(r), i = o = l = null;
 }
 function p(e) {
  i = o = l = null, m = [];
  var t;
  /`/.test(e) ? (e = e.replace(/~/g, "~T").replace(/(^|[^\\])(`+)([^\n]*?[^`\n])\2(?!`)/gm, function(e) {
   return e.replace(/\$/g, "~D");
  }), t = function(e) {
   return e.replace(/~([TD])/g, function(e, t) {
    return {
     T: "~",
     D: "$"
    }[t];
   });
  }) : t = function(e) {
   return e;
  }, k = r(e.replace(/\r\n?/g, "\n"), u);
  for (var e = 1, a = k.length; a > e; e += 2) {
   var c = k[e];
   "@" === c.charAt(0) ? (k[e] = "@@" + m.length + "@@", m.push(c)) : i ? c === o ? n ? l = e : b(i, e, t) : c.match(/\n.*\n/) ? (l && (e = l, 
   b(i, e, t)), i = o = l = null, n = 0) : "{" === c ? n++ : "}" === c && n && n-- : c === s || "$$" === c ? (i = e, 
   o = c, n = 0) : "begin" === c.substr(1, 5) && (i = e, o = "\\end" + c.substr(6), 
   n = 0);
  }
  return l && b(i, l, t), t(k.join(""));
 }
 function d(e) {
  return e = e.replace(/@@(\d+)@@/g, function(e, t) {
   return m[t];
  }), m = null, e;
 }
 function e() {
  q = !1, h.cancelTypeset = !1, h.Queue([ "Typeset", h, t ]), h.Queue(afterRefreshCallback);
 }
 function j() {
  !q && g && (q = !0, h.Cancel(), h.Queue(e));
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
 }, mathJax.onEditorConfigure = function(e) {
  preview = document.getElementById("preview-contents");
  var t = e.getConverter();
  t.hooks.chain("preConversion", p), t.hooks.chain("postConversion", d);
 };
 var afterRefreshCallback = void 0;
 mathJax.onAsyncPreview = function(e) {
  afterRefreshCallback = e, j();
 };
 var g = !1, q = !1, t = null, s = "$", k, i, o, l, n, m, h = MathJax.Hub;
 h.Queue(function() {
  g = !0, h.processUpdateTime = 50, h.Config({
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
 var u = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i, r;
 return r = 3 === "aba".split(/(b)/).length ? function(e, t) {
  return e.split(t);
 } : function(e, t) {
  var n, i = [];
  if (!t.global) {
   n = t.toString();
   var o = "";
   n = n.replace(/^\/(.*)\/([im]*)$/, function(e, t, n) {
    return o = n, t;
   }), t = RegExp(n, o + "g");
  }
  for (var r = t.lastIndex = 0; n = t.exec(e); ) i.push(e.substring(r, n.index)), 
  i.push.apply(i, n.slice(1)), r = n.index + n[0].length;
  return i.push(e.substring(r)), i;
 }, function() {
  var e = MathJax.Hub;
  if (!e.Cancel) {
   e.cancelTypeset = !1, e.Register.StartupHook("HTML-CSS Jax Config", function() {
    var t = MathJax.OutputJax["HTML-CSS"], n = t.Translate;
    t.Augment({
     Translate: function(i, o) {
      if (e.cancelTypeset || o.cancelled) throw Error("MathJax Canceled");
      return n.call(t, i, o);
     }
    });
   }), e.Register.StartupHook("SVG Jax Config", function() {
    var t = MathJax.OutputJax.SVG, n = t.Translate;
    t.Augment({
     Translate: function(i, o) {
      if (e.cancelTypeset || o.cancelled) throw Error("MathJax Canceled");
      return n.call(t, i, o);
     }
    });
   }), e.Register.StartupHook("TeX Jax Config", function() {
    var t = MathJax.InputJax.TeX, n = t.Translate;
    t.Augment({
     Translate: function(i, o) {
      if (e.cancelTypeset || o.cancelled) throw Error("MathJax Canceled");
      return n.call(t, i, o);
     }
    });
   });
   var t = e.processError;
   e.processError = function(n, i, o) {
    return "MathJax Canceled" !== n.message ? t.call(e, n, i, o) : (MathJax.Message.Clear(0, 0), 
    i.jaxIDs = [], i.jax = {}, i.scripts = [], i.i = i.j = 0, i.cancelled = !0, null);
   }, e.Cancel = function() {
    this.cancelTypeset = !0;
   };
  }
 }(), mathJax;
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
}), css_browser_selector(navigator.userAgent), define("css_browser_selector", function() {}), 
function(e) {
 "function" == typeof define && define.amd ? define("jquery-mousewheel", [ "jquery" ], e) : "object" == typeof exports ? module.exports = e : e(jQuery);
}(function(e) {
 function t(t) {
  var o, r = t || window.event, a = [].slice.call(arguments, 1), s = 0, l = 0, c = 0, u = 0, d = 0;
  return t = e.event.fix(r), t.type = "mousewheel", r.wheelDelta && (s = r.wheelDelta), 
  r.detail && (s = -1 * r.detail), r.deltaY && (c = -1 * r.deltaY, s = c), r.deltaX && (l = r.deltaX, 
  s = -1 * l), void 0 !== r.wheelDeltaY && (c = r.wheelDeltaY), void 0 !== r.wheelDeltaX && (l = -1 * r.wheelDeltaX), 
  u = Math.abs(s), (!n || n > u) && (n = u), d = Math.max(Math.abs(c), Math.abs(l)), 
  (!i || i > d) && (i = d), o = s > 0 ? "floor" : "ceil", s = Math[o](s / n), l = Math[o](l / i), 
  c = Math[o](c / i), a.unshift(t, s, l, c), (e.event.dispatch || e.event.handle).apply(this, a);
 }
 var n, i, o = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], r = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
 if (e.event.fixHooks) for (var a = o.length; a; ) e.event.fixHooks[o[--a]] = e.event.mouseHooks;
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
}), define("extensions/scrollLink", [ "jquery", "underscore", "classes/Extension", "text!html/scrollLinkSettingsBlock.html", "css_browser_selector", "jquery-mousewheel" ], function(e, t, n, i) {
 function o(e) {
  return parseFloat(e.substring(0, e.length - 2));
 }
 var r = new n("scrollLink", "Scroll Link", !0, !0);
 r.settingsBlock = i;
 var a = void 0;
 r.onSectionsCreated = function(e) {
  a = e;
 };
 var s = void 0, l = void 0, c = void 0, u = [], d = [], p = void 0, f = void 0, h = t.debounce(function() {
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
  u = [], c.width(s.width());
  var i = o(s.css("padding-top")), r = 0;
  t.each(a, function(e, t) {
   t !== a.length - 1 ? e = 0 === e.length ? void 0 : e.substring(0, e.length - 1) : i += o(s.css("padding-bottom")), 
   n(e);
  }), d = [];
  var h = 0, m = l.scrollTop();
  l.find(".preview-content > .wmd-title").each(function() {
   var t = e(this), n = t.position().top + m + o(t.css("margin-top"));
   d.push({
    startOffset: h,
    endOffset: n,
    height: n - h
   }), h = n;
  });
  var g = l.prop("scrollHeight");
  d.push({
   startOffset: h,
   endOffset: g,
   height: g - h
  }), p = -10, f = -10, v();
 }, 500), m = !1, g = !1, v = t.debounce(function() {
  function e(e, n, i, o, r, a) {
   var s = void 0, l = t.find(n, function(t, n) {
    return s = n, e < t.endOffset;
   });
   if (void 0 !== l) {
    var c = (e - l.startOffset) / l.height, u = o[s], d = u.startOffset + u.height * c;
    return d = t.min([ d, i.prop("scrollHeight") - i.outerHeight() ]), Math.abs(d - r) <= 9 ? (a(r), 
    void 0) : (i.animate({
     scrollTop: d
    }, 500, function() {
     a(d);
    }), void 0);
   }
  }
  if (0 !== u.length && u.length === d.length) {
   var n = s.scrollTop(), i = l.scrollTop();
   m === !0 && Math.abs(n - p) > 9 ? (m = !1, p = n, e(n, u, l, d, i, function(e) {
    f = e;
   })) : g === !0 && Math.abs(i - f) > 9 && (g = !1, f = i, e(i, d, s, u, n, function(e) {
    p = e;
   }));
  }
 }, 500);
 r.onLayoutConfigure = function(e) {
  e.onresize = function() {
   m = !0, h();
  };
 }, r.onReady = function() {
  s = e("#wmd-input"), l = e(".preview-container"), c = e("#md-section-helper"), l.bind("keyup mouseup mousewheel", function() {
   g = !0, m = !1, v();
  }), e(".table-of-contents").click(function() {
   g = !0, m = !1, v();
  }), s.bind("keyup mouseup mousewheel", function() {
   m = !0, g = !1, v();
  });
 };
 var b = void 0;
 return r.onEditorConfigure = function(t) {
  b = e("#preview-contents"), t.getConverter().hooks.chain("postConversion", function(e) {
   return b.height(b.height()), e;
  });
 }, r.onPreviewFinished = function() {
  b.height("auto"), m = !0, h();
 }, r;
}), define("text!html/buttonSyncSettingsBlock.html", [], function() {
 return '<p>Adds a "Synchronize documents" button in the navigation bar.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-5 control-label" for="input-sync-period">Sync\n			period (0: manual)</label>\n		<div class="col-lg-6 form-inline">\n			<input type="text" id="input-sync-period"\n				class="col-lg-5 form-control" placeholder="180000"> ms\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonSync", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "text!html/buttonSyncSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var a = new o("buttonSync", 'Button "Synchronize"');
 a.settingsBlock = r, a.defaultConfig = {
  syncPeriod: 18e4
 }, a.onLoadSettings = function() {
  i.setInputValue("#input-sync-period", a.config.syncPeriod);
 }, a.onSaveSettings = function(e, t) {
  e.syncPeriod = i.getInputIntValue("#input-sync-period", t, 0);
 };
 var s = void 0;
 a.onSynchronizerCreated = function(e) {
  s = e;
 };
 var l = void 0, c = !1, u = !1, d = function() {
  void 0 !== l && (c === !0 || s.hasSync() === !1 || u ? l.addClass("disabled") : l.removeClass("disabled"));
 }, p = 0;
 return a.onPeriodicRun = function() {
  viewerMode === !0 || !a.config.syncPeriod || p + a.config.syncPeriod > i.currentTime || s.sync() === !0 && (p = i.currentTime);
 }, a.onCreateButton = function() {
  var t = n("button", {
   "class": "btn btn-success",
   title: "Synchronize all"
  }, n("i", {
   "class": "icon-refresh"
  }));
  return l = e(t).click(function() {
   e(this).hasClass("disabled") || s.sync();
  }), t;
 }, a.onReady = d, a.onFileCreated = d, a.onFileDeleted = d, a.onSyncImportSuccess = d, 
 a.onSyncExportSuccess = d, a.onSyncRemoved = d, a.onSyncRunning = function(e) {
  c = e, d();
 }, a.onOfflineChanged = function(e) {
  u = e, d();
 }, a;
}), define("text!html/buttonPublish.html", [], function() {
 return '<button class="btn btn-success" title="Publish this document">\n	<i class="icon-share"></i>\n</button>';
}), define("extensions/buttonPublish", [ "jquery", "underscore", "classes/Extension", "text!html/buttonPublish.html" ], function(e, t, n, i) {
 function o() {
  void 0 !== a && (l === !0 || c === !1 || u === !0 ? a.addClass("disabled") : a.removeClass("disabled"));
 }
 var r = new n("buttonPublish", 'Button "Publish"'), a = void 0, s = void 0, l = !1, c = !1, u = !1, d = void 0;
 r.onPublisherCreated = function(e) {
  d = e;
 }, r.onCreateButton = function() {
  var t = e(i);
  return a = t.click(function() {
   t.hasClass("disabled") || d.publish();
  }), a[0];
 }, r.onPublishRunning = function(e) {
  l = e, o();
 }, r.onOfflineChanged = function(e) {
  u = e, o();
 };
 var p = function() {
  c = 0 === t.size(s.publishLocations) ? !1 : !0, o();
 };
 return r.onFileSelected = function(e) {
  s = e, p();
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
 var a = void 0, s = void 0, l = void 0, c = function(e) {
  if (void 0 === e || e === a) {
   var n = t.reduce(a.publishLocations, function(e, n) {
    return n.sharingLink && (e += t.template(o, {
     link: n.sharingLink
    })), e;
   }, "");
   s.innerHTML = n, l.toggleClass("hide", 0 !== n.length);
  }
 };
 return r.onFileSelected = function(e) {
  a = e, c(e);
 }, r.onNewPublishSuccess = c, r.onPublishRemoved = c, r.onReady = function() {
  var t = document.querySelector(".link-container");
  s = t.querySelector(".link-list"), l = e(t.querySelector(".no-link"));
 }, r;
}), define("text!html/buttonStat.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle" title="Document statistics" data-toggle="dropdown">\n	<i class="icon-chart-bar"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>Statistics</h3>\n	<div class="stat">\n		<div>\n			<%= name1 %>: <span id="span-stat-value1"></span>\n		</div>\n		<div>\n			<%= name2 %>: <span id="span-stat-value2"></span>\n		</div>\n		<div>\n			<%= name3 %>: <span id="span-stat-value3"></span>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/buttonStatSettingsBlock.html", [], function() {
 return '<p>Adds a "Document statistics" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name1">Title</label> <input\n			id="input-stat-name1" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value1">RegExp</label> <input\n			id="input-stat-value1" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name2">Title</label> <input\n			id="input-stat-name2" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value2">RegExp</label> <input\n			id="input-stat-value2" type="text" class="form-control col-lg-4">\n	</div>\n	<div class="form-group form-inline">\n		<label class="label-text" for="input-stat-name3">Title</label> <input\n			id="input-stat-name3" type="text" class="form-control col-lg-3"> <label\n			class="label-text" for="input-stat-value3">RegExp</label> <input\n			id="input-stat-value3" type="text" class="form-control col-lg-4">\n	</div>\n</div>\n';
}), define("extensions/buttonStat", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonStat.html", "text!html/buttonStatSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var a = new i("buttonStat", 'Button "Statistics"', !0, !0);
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
 }, a.onSaveSettings = function(e, i) {
  t.each([ 1, 2, 3 ], function(t) {
   e["name" + t] = n.getInputTextValue("#input-stat-name" + t, i), e["value" + t] = n.getInputRegExpValue("#input-stat-value" + t, i);
  });
 }, a.onCreatePreviewButton = function() {
  return t.template(o, a.config);
 };
 var s = void 0, l = void 0, c = void 0, u = void 0;
 return a.onReady = function() {
  s = document.getElementById("preview-contents"), l = document.getElementById("span-stat-value1"), 
  c = document.getElementById("span-stat-value2"), u = document.getElementById("span-stat-value3");
 }, a.onPreviewFinished = function() {
  for (var e = s.cloneNode(!0), t = e.getElementsByTagName("script"), n = t.length - 1; n >= 0; n--) {
   var i = t[n];
   i.parentNode.removeChild(i);
  }
  var o = e.textContent;
  l.textContent = (o.match(new RegExp(a.config.value1, "g")) || []).length, c.textContent = (o.match(new RegExp(a.config.value2, "g")) || []).length, 
  u.textContent = (o.match(new RegExp(a.config.value3, "g")) || []).length;
 }, a;
}), define("text!html/buttonHtmlCode.html", [], function() {
 return '<button class="btn btn-default dropdown-toggle action-html-code" title="HTML code" data-toggle="dropdown">\n	<i class="icon-code"></i>\n</button>\n<div class="dropdown-menu pull-right">\n	<h3>HTML code</h3>\n	<textarea id="input-html-code" class="form-control"></textarea>\n</div>\n';
}), define("text!html/buttonHtmlCodeSettingsBlock.html", [], function() {
 return '<p>Adds a "HTML code" button over the preview.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-lg-4 control-label" for="textarea-html-code-template">Template\n			<a href="#" class="tooltip-template">(?)</a>\n		</label>\n		<div class="col-lg-7">\n			<textarea id="textarea-html-code-template" class="form-control"></textarea>\n		</div>\n	</div>\n</div>';
}), define("extensions/buttonHtmlCode", [ "jquery", "underscore", "utils", "classes/Extension", "text!html/buttonHtmlCode.html", "text!html/buttonHtmlCodeSettingsBlock.html" ], function(e, t, n, i, o, r) {
 var a = new i("buttonHtmlCode", 'Button "HTML code"', !0, !0);
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
  return o;
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
  } catch (i) {
   return s.onError(i), i.message;
  }
 }, a.onReady = function() {
  c = document.getElementById("input-html-code"), e(".action-html-code").click(function() {
   t.defer(function() {
    e("#input-html-code").each(function() {
     e(this).is(":hidden") || this.select();
    });
   });
  });
 }, a;
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
  var i = this.$element.find(".item.active"), o = n || i[t](), r = this.interval, a = "next" == t ? "left" : "right", s = "next" == t ? "first" : "last", l = this;
  if (!o.length) {
   if (!this.options.wrap) return;
   o = this.$element.find(".item")[s]();
  }
  this.sliding = !0, r && this.pause();
  var c = e.Event("slide.bs.carousel", {
   relatedTarget: o[0],
   direction: a
  });
  if (!o.hasClass("active")) {
   if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
   this.$element.one("slid", function() {
    var t = e(l.$indicators.children()[l.getActiveIndex()]);
    t && t.addClass("active");
   })), e.support.transition && this.$element.hasClass("slide")) {
    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
    o.addClass(t), o[0].offsetWidth, i.addClass(a), o.addClass(a), i.one(e.support.transition.end, function() {
     o.removeClass([ t, a ].join(" ")).addClass("active"), i.removeClass([ "active", a ].join(" ")), 
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
   var i = e(this), o = i.data("bs.carousel"), r = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n), a = "string" == typeof n ? n : r.slide;
   o || i.data("bs.carousel", o = new t(this, r)), "number" == typeof n ? o.to(n) : a ? o[a]() : r.interval && o.pause().cycle();
  });
 }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
  return e.fn.carousel = n, this;
 }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
  var n, i = e(this), o = e(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), r = e.extend({}, o.data(), i.data()), a = i.attr("data-slide-to");
  a && (r.interval = !1), o.carousel(r), (a = i.attr("data-slide-to")) && o.data("bs.carousel").to(a), 
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
    var a = e.camelCase([ "scroll", o ].join("-"));
    this.$element.one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350)[o](this.$element[0][a]);
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
  var n, i = e(this), o = i.attr("data-target") || t.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), r = e(o), a = r.data("bs.collapse"), s = a ? "toggle" : i.data(), l = i.attr("data-parent"), c = l && e(l);
  a && a.transitioning || (c && c.find('[data-toggle=collapse][data-parent="' + l + '"]').not(i).addClass("collapsed"), 
  i[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(s);
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
   var r = n(o), a = r.hasClass("open");
   if (t(), !a) {
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
    var r = n(i), a = r.hasClass("open");
    if (!a || a && 27 == t.keyCode) return 27 == t.which && r.find(o).focus(), i.click();
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
   var n = e(this), i = n.data("dropdown");
   i || n.data("dropdown", i = new r(this)), "string" == typeof t && i[t].call(n);
  });
 }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function() {
  return e.fn.dropdown = a, this;
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
   var o = e(this), r = o.data("bs.modal"), a = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof n && n);
   r || o.data("bs.modal", r = new t(this, a)), "string" == typeof n ? r[n](i) : a.show && r.show(i);
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
   var a = o[r];
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
   var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
   if (r) {
    var c = this.$element.parent(), u = i, d = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth : c.outerWidth(), f = "body" == this.options.container ? window.innerHeight : c.outerHeight(), h = "body" == this.options.container ? 0 : c.offset().left;
    i = "bottom" == i && a.top + a.height + l - d > f ? "top" : "top" == i && a.top - d - l < 0 ? "bottom" : "right" == i && a.right + s > p ? "left" : "left" == i && a.left - s < h ? "right" : i, 
    n.removeClass(u).addClass(i);
   }
   var m = this.getCalculatedOffset(i, a, s, l);
   this.applyPlacement(m, i), this.$element.trigger("shown.bs." + this.type);
  }
 }, t.prototype.applyPlacement = function(e, t) {
  var n, i = this.tip(), o = i[0].offsetWidth, r = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10), s = parseInt(i.css("margin-left"), 10);
  isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
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
  var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, i = n - this.$scrollElement.height(), o = this.offsets, r = this.targets, a = this.activeTarget;
  if (t >= i) return a != (e = r.last()[0]) && this.activate(e);
  for (e = o.length; e--; ) a != r[e] && t >= o[e] && (!o[e + 1] || t <= o[e + 1]) && this.activate(r[e]);
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
    var a = e(i);
    this.activate(t.parent("li"), n), this.activate(a, a.parent(), function() {
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
   t.addClass("active"), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), 
   t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), i && i();
  }
  var r = n.find("> .active"), a = i && e.support.transition && r.hasClass("fade");
  a ? r.one(e.support.transition.end, o).emulateTransitionEnd(150) : o(), r.removeClass("in");
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
   var n = e(document).height(), i = this.$window.scrollTop(), o = this.$element.offset(), r = this.options.offset, a = r.top, s = r.bottom;
   "object" != typeof r && (s = a = r), "function" == typeof a && (a = r.top()), "function" == typeof s && (s = r.bottom());
   var l = null != this.unpin && i + this.unpin <= o.top ? !1 : null != s && o.top + this.$element.height() >= n - s ? "bottom" : null != a && a >= i ? "top" : !1;
   this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, 
   this.unpin = "bottom" == l ? o.top - i : null, this.$element.removeClass(t.RESET).addClass("affix" + (l ? "-" + l : "")), 
   "bottom" == l && this.$element.offset({
    top: document.body.offsetHeight - s - this.$element.height()
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
}(window.jQuery), define("bootstrap", function() {}), function() {
 (function(e, t) {
  var n, i;
  return i = t.document, n = function() {
   function n(n) {
    this._options = e.extend({
     name: "tour",
     container: "body",
     keyboard: !0,
     storage: t.localStorage,
     debug: !1,
     backdrop: !1,
     redirect: !0,
     orphan: !1,
     basePath: "",
     template: "<div class='popover'>          <div class='arrow'></div>          <h3 class='popover-title'></h3>          <div class='popover-content'></div>          <nav class='popover-navigation'>            <div class='btn-group'>              <button class='btn btn-sm btn-default' data-role='prev'>&laquo; Prev</button>              <button class='btn btn-sm btn-default' data-role='next'>Next &raquo;</button>            </div>            <button class='btn btn-sm btn-default' data-role='end'>End tour</button>          </nav>        </div>",
     afterSetState: function() {},
     afterGetState: function() {},
     afterRemoveState: function() {},
     onStart: function() {},
     onEnd: function() {},
     onShow: function() {},
     onShown: function() {},
     onHide: function() {},
     onHidden: function() {},
     onNext: function() {},
     onPrev: function() {}
    }, n), this._steps = [], this.setCurrentStep(), this.backdrop = {
     overlay: null,
     $element: null,
     $background: null
    };
   }
   return n.prototype.setState = function(e, t) {
    var n;
    return n = "" + this._options.name + "_" + e, this._options.storage.setItem(n, t), 
    this._options.afterSetState(n, t);
   }, n.prototype.removeState = function(e) {
    var t;
    return t = "" + this._options.name + "_" + e, this._options.storage.removeItem(t), 
    this._options.afterRemoveState(t);
   }, n.prototype.getState = function(e) {
    var t, n;
    return t = "" + this._options.name + "_" + e, n = this._options.storage.getItem(t), 
    (void 0 === n || "null" === n) && (n = null), this._options.afterGetState(e, n), 
    n;
   }, n.prototype.addSteps = function(e) {
    var t, n, i, o;
    for (o = [], n = 0, i = e.length; i > n; n++) t = e[n], o.push(this.addStep(t));
    return o;
   }, n.prototype.addStep = function(e) {
    return this._steps.push(e);
   }, n.prototype.getStep = function(t) {
    return null != this._steps[t] ? e.extend({
     id: "step-" + t,
     path: "",
     placement: "right",
     title: "",
     content: "<p></p>",
     next: t === this._steps.length - 1 ? -1 : t + 1,
     prev: t - 1,
     animation: !0,
     container: this._options.container,
     backdrop: this._options.backdrop,
     redirect: this._options.redirect,
     orphan: this._options.orphan,
     template: this._options.template,
     onShow: this._options.onShow,
     onShown: this._options.onShown,
     onHide: this._options.onHide,
     onHidden: this._options.onHidden,
     onNext: this._options.onNext,
     onPrev: this._options.onPrev
    }, this._steps[t]) : void 0;
   }, n.prototype.start = function(t) {
    var n, o = this;
    return null == t && (t = !1), this.ended() && !t ? this._debug("Tour ended, start prevented.") : (e(i).off("click.tour." + this._options.name, ".popover *[data-role=next]").on("click.tour." + this._options.name, ".popover *[data-role=next]:not(.disabled)", function(e) {
     return e.preventDefault(), o.next();
    }), e(i).off("click.tour." + this._options.name, ".popover *[data-role=prev]").on("click.tour." + this._options.name, ".popover *[data-role=prev]:not(.disabled)", function(e) {
     return e.preventDefault(), o.prev();
    }), e(i).off("click.tour." + this._options.name, ".popover *[data-role=end]").on("click.tour." + this._options.name, ".popover *[data-role=end]", function(e) {
     return e.preventDefault(), o.end();
    }), this._onResize(function() {
     return o.showStep(o._current);
    }), this._setupKeyboardNavigation(), n = this._makePromise(null != this._options.onStart ? this._options.onStart(this) : void 0), 
    this._callOnPromiseDone(n, this.showStep, this._current));
   }, n.prototype.next = function() {
    var e;
    return this.ended() ? this._debug("Tour ended, next prevented.") : (e = this.hideStep(this._current), 
    this._callOnPromiseDone(e, this._showNextStep));
   }, n.prototype.prev = function() {
    var e;
    return this.ended() ? this._debug("Tour ended, prev prevented.") : (e = this.hideStep(this._current), 
    this._callOnPromiseDone(e, this._showPrevStep));
   }, n.prototype.goto = function(e) {
    var t;
    return this.ended() ? this._debug("Tour ended, goto prevented.") : (t = this.hideStep(this._current), 
    this._callOnPromiseDone(t, this.showStep, e));
   }, n.prototype.end = function() {
    var n, o, r = this;
    return n = function() {
     return e(i).off("click.tour." + r._options.name), e(i).off("keyup.tour." + r._options.name), 
     e(t).off("resize.tour." + r._options.name), r.setState("end", "yes"), null != r._options.onEnd ? r._options.onEnd(r) : void 0;
    }, o = this.hideStep(this._current), this._callOnPromiseDone(o, n);
   }, n.prototype.ended = function() {
    return !!this.getState("end");
   }, n.prototype.restart = function() {
    return this.removeState("current_step"), this.removeState("end"), this.setCurrentStep(0), 
    this.start();
   }, n.prototype.hideStep = function(t) {
    var n, i, o, r = this;
    return o = this.getStep(t), i = this._makePromise(null != o.onHide ? o.onHide(this, t) : void 0), 
    n = function() {
     var t;
     return t = r._isOrphan(o) ? e("body") : e(o.element), t.popover("destroy"), o.reflex && t.css("cursor", "").off("click.tour." + r._options.name), 
     o.backdrop && r._hideBackdrop(), null != o.onHidden ? o.onHidden(r) : void 0;
    }, this._callOnPromiseDone(i, n), i;
   }, n.prototype.showStep = function(t) {
    var n, o, r, a, s = this;
    return (a = this.getStep(t)) ? (r = t < this._current, n = this._makePromise(null != a.onShow ? a.onShow(this, t) : void 0), 
    o = function() {
     var n, o;
     if (s.setCurrentStep(t), o = e.isFunction(a.path) ? a.path.call() : s._options.basePath + a.path, 
     n = [ i.location.pathname, i.location.hash ].join(""), s._isRedirect(o, n)) return s._redirect(a, o), 
     void 0;
     if (s._isOrphan(a)) {
      if (!a.orphan) return s._debug("Skip the orphan step " + (s._current + 1) + ". Orphan option is false and the element doesn't exist or is hidden."), 
      r ? s._showPrevStep() : s._showNextStep(), void 0;
      s._debug("Show the orphan step " + (s._current + 1) + ". Orphans option is true.");
     }
     return a.backdrop && s._showBackdrop(s._isOrphan(a) ? void 0 : a.element), s._showPopover(a, t), 
     null != a.onShown && a.onShown(s), s._debug("Step " + (s._current + 1) + " of " + s._steps.length);
    }, this._callOnPromiseDone(n, o)) : void 0;
   }, n.prototype.setCurrentStep = function(e) {
    return null != e ? (this._current = e, this.setState("current_step", e)) : (this._current = this.getState("current_step"), 
    this._current = null === this._current ? 0 : parseInt(this._current, 10));
   }, n.prototype._showNextStep = function() {
    var e, t, n, i = this;
    return n = this.getStep(this._current), t = function() {
     return i.showStep(n.next);
    }, e = this._makePromise(null != n.onNext ? n.onNext(this) : void 0), this._callOnPromiseDone(e, t);
   }, n.prototype._showPrevStep = function() {
    var e, t, n, i = this;
    return n = this.getStep(this._current), t = function() {
     return i.showStep(n.prev);
    }, e = this._makePromise(null != n.onPrev ? n.onPrev(this) : void 0), this._callOnPromiseDone(e, t);
   }, n.prototype._debug = function(e) {
    return this._options.debug ? t.console.log("Bootstrap Tour '" + this._options.name + "' | " + e) : void 0;
   }, n.prototype._isRedirect = function(e, t) {
    return null != e && "" !== e && e.replace(/\?.*$/, "").replace(/\/?$/, "") !== t.replace(/\/?$/, "");
   }, n.prototype._redirect = function(t, n) {
    return e.isFunction(t.redirect) ? t.redirect.call(this, n) : t.redirect === !0 ? (this._debug("Redirect to " + n), 
    i.location.href = n) : void 0;
   }, n.prototype._isOrphan = function(t) {
    return null == t.element || !e(t.element).length || e(t.element).is(":hidden");
   }, n.prototype._showPopover = function(t, n) {
    var i, o, r, a, s, l, c = this;
    return l = e.extend({}, this._options), r = e.isFunction(t.template) ? e(t.template(n, t)) : e(t.template), 
    o = r.find(".popover-navigation"), s = this._isOrphan(t), s && (t.element = "body", 
    t.placement = "top", r = r.addClass("orphan")), i = e(t.element), r.addClass("tour-" + this._options.name), 
    t.options && e.extend(l, t.options), t.reflex && i.css("cursor", "pointer").on("click.tour." + this._options.name, function() {
     return c._current < c._steps.length - 1 ? c.next() : c.end();
    }), t.prev < 0 && o.find("*[data-role=prev]").addClass("disabled"), t.next < 0 && o.find("*[data-role=next]").addClass("disabled"), 
    t.template = r.clone().wrap("<div>").parent().html(), i.popover({
     placement: t.placement,
     trigger: "manual",
     title: t.title,
     content: t.content,
     html: !0,
     animation: t.animation,
     container: t.container,
     template: t.template,
     selector: t.element
    }).popover("show"), a = i.data("bs.popover") ? i.data("bs.popover").tip() : i.data("popover").tip(), 
    a.attr("id", t.id), this._scrollIntoView(a), this._reposition(a, t), s ? this._center(a) : void 0;
   }, n.prototype._reposition = function(t, n) {
    var o, r, a, s, l, c, u;
    if (s = t[0].offsetWidth, r = t[0].offsetHeight, u = t.offset(), l = u.left, c = u.top, 
    o = e(i).outerHeight() - u.top - t.outerHeight(), 0 > o && (u.top = u.top + o), 
    a = e("html").outerWidth() - u.left - t.outerWidth(), 0 > a && (u.left = u.left + a), 
    u.top < 0 && (u.top = 0), u.left < 0 && (u.left = 0), t.offset(u), "bottom" === n.placement || "top" === n.placement) {
     if (l !== u.left) return this._replaceArrow(t, 2 * (u.left - l), s, "left");
    } else if (c !== u.top) return this._replaceArrow(t, 2 * (u.top - c), r, "top");
   }, n.prototype._center = function(n) {
    return n.css("top", e(t).outerHeight() / 2 - n.outerHeight() / 2);
   }, n.prototype._replaceArrow = function(e, t, n, i) {
    return e.find(".arrow").css(i, t ? 50 * (1 - t / n) + "%" : "");
   }, n.prototype._scrollIntoView = function(n) {
    return e("html, body").stop().animate({
     scrollTop: Math.ceil(n.offset().top - e(t).height() / 2)
    });
   }, n.prototype._onResize = function(n, i) {
    return e(t).on("resize.tour." + this._options.name, function() {
     return clearTimeout(i), i = setTimeout(n, 100);
    });
   }, n.prototype._setupKeyboardNavigation = function() {
    var t = this;
    return this._options.keyboard ? e(i).on("keyup.tour." + this._options.name, function(e) {
     if (e.which) switch (e.which) {
     case 39:
      return e.preventDefault(), t._current < t._steps.length - 1 ? t.next() : t.end();

     case 37:
      if (e.preventDefault(), t._current > 0) return t.prev();
      break;

     case 27:
      return e.preventDefault(), t.end();
     }
    }) : void 0;
   }, n.prototype._makePromise = function(t) {
    return t && e.isFunction(t.then) ? t : null;
   }, n.prototype._callOnPromiseDone = function(e, t, n) {
    var i = this;
    return e ? e.then(function() {
     return t.call(i, n);
    }) : t.call(this, n);
   }, n.prototype._showBackdrop = function(e) {
    return null === this.backdrop.overlay ? (this._showOverlay(), null != e ? this._showOverlayElement(e) : void 0) : void 0;
   }, n.prototype._hideBackdrop = function() {
    return null !== this.backdrop.overlay ? (this.backdrop.$element && this._hideOverlayElement(), 
    this._hideOverlay()) : void 0;
   }, n.prototype._showOverlay = function() {
    return this.backdrop = e("<div/>"), this.backdrop.addClass("tour-backdrop"), this.backdrop.height(e(i).innerHeight()), 
    e("body").append(this.backdrop);
   }, n.prototype._hideOverlay = function() {
    return this.backdrop.remove(), this.backdrop.overlay = null;
   }, n.prototype._showOverlayElement = function(t) {
    var n, i, o;
    return i = e(t), n = e("<div/>"), o = i.offset(), o.top = o.top, o.left = o.left, 
    n.width(i.innerWidth()).height(i.innerHeight()).addClass("tour-step-background").offset(o), 
    i.addClass("tour-step-backdrop"), e("body").append(n), this.backdrop.$element = i, 
    this.backdrop.$background = n;
   }, n.prototype._hideOverlayElement = function() {
    return this.backdrop.$element.removeClass("tour-step-backdrop"), this.backdrop.$background.remove(), 
    this.backdrop.$element = null, this.backdrop.$background = null;
   }, n;
  }(), t.Tour = n;
 })(jQuery, window);
}.call(this), define("bootstrap-tour", function() {}), define("extensions/welcomeTour", [ "jquery", "classes/Extension", "bootstrap-tour" ], function(e, t) {
 var n = new t("welcomeTour", "Welcome tour", !1, !0);
 return n.onReady = function() {
  var t = new Tour({
   storage: {
    getItem: function() {},
    setItem: function() {},
    removeItem: function() {}
   },
   onEnd: function() {
    localStorage.welcomeTour = "done";
   },
   template: [ "<div class='popover tour'>", "   <div class='arrow'></div>", "   <h3 class='popover-title'></h3>", "   <div class='popover-content'></div>", "   <nav class='popover-navigation'>", "       <button class='btn btn-primary' data-role='next'>Next</button>", "       <button class='btn btn-default' data-role='end'>Got it!</button>", "   </nav>", "</div>" ].join("")
  });
  t.addSteps([ {
   element: ".navbar-inner",
   title: "Welcome to StackEdit 2.0",
   content: "Please click <code>Next</code> to start a small tour.",
   placement: "bottom"
  }, {
   element: ".navbar .action-create-file",
   title: "New document",
   content: "Click the <i class='icon-file'></i> <code>New document</code> button to create a new document.",
   placement: "left",
   reflex: !0
  }, {
   element: ".document-panel .collapse-button",
   title: "Toggle document",
   content: [ "<p>Click the <i class='icon-folder-open'></i> <code>Select document</code> button to switch to another document.</p>", "<b>NOTE: </b>Use <code>Ctrl+[</code> and <code>Ctrl+]</code> shortcuts to toggle quickly." ].join(""),
   placement: "left",
   reflex: !0
  }, {
   element: ".menu-panel .collapse-button",
   title: "Menu",
   content: [ "<p>Use the <i class='icon-provider-stackedit'></i> menu to synchronize your document on <i class='icon-provider-gdrive'></i> <code>Google Drive</code> or <i class='icon-provider-dropbox'></i> <code>Dropbox</code>.</p>", "Use also this menu to publish your document on <i class='icon-provider-github'></i> <code>GitHub</code>, <i class='icon-provider-blogger'></i> <code>Blogger</code>..." ].join(""),
   placement: "right",
   reflex: !0
  }, {
   element: "#extension-buttons button:first",
   title: "Synchronize/publish",
   content: [ "<p>Once imported/exported, use the <i class='icon-refresh'></i> <code>Synchronize</code> button to force the synchronization (this is done automatically every 3 minutes).</p>", "Use also the <i class='icon-share'></i> <code>Publish</code> button to update your publications." ].join(""),
   placement: "bottom",
   reflex: !0
  } ]), _.has(localStorage, "welcomeTour") || t.start(), e(".action-welcome-tour").click(function() {
   t.restart();
  });
 }, n;
}), function(e) {
 var t = "waitForImages";
 e.waitForImages = {
  hasImageProperties: [ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage" ]
 }, e.expr[":"].uncached = function(t) {
  if (!e(t).is('img[src!=""]')) return !1;
  var n = new Image();
  return n.src = t.src, !n.complete;
 }, e.fn.waitForImages = function(n, i, o) {
  var r = 0, a = 0;
  if (e.isPlainObject(arguments[0]) && (o = arguments[0].waitForAll, i = arguments[0].each, 
  n = arguments[0].finished), n = n || e.noop, i = i || e.noop, o = !!o, !e.isFunction(n) || !e.isFunction(i)) throw new TypeError("An invalid callback was supplied.");
  return this.each(function() {
   var s = e(this), l = [], c = e.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
   o ? s.find("*").andSelf().each(function() {
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
   }) : s.find("img:uncached").each(function() {
    l.push({
     src: this.src,
     element: this
    });
   }), r = l.length, a = 0, 0 === r && n.call(s[0]), e.each(l, function(o, l) {
    var c = new Image();
    e(c).bind("load." + t + " error." + t, function(e) {
     return a++, i.call(l.element, a, r, "load" == e.type), a == r ? (n.call(s[0]), !1) : void 0;
    }), c.src = l.src;
   });
  });
 };
}(jQuery), define("jquery-waitforimages", function() {}), define("eventMgr", [ "jquery", "underscore", "crel", "utils", "classes/Extension", "settings", "text!html/settingsExtensionsAccordion.html", "extensions/partialRendering", "extensions/userCustom", "extensions/buttonMarkdownSyntax", "extensions/googleAnalytics", "extensions/dialogAbout", "extensions/dialogManagePublication", "extensions/dialogManageSynchronization", "extensions/dialogOpenHarddrive", "extensions/documentTitle", "extensions/documentSelector", "extensions/documentPanel", "extensions/documentManager", "extensions/workingIndicator", "extensions/notifications", "extensions/markdownExtra", "extensions/toc", "extensions/mathJax", "extensions/emailConverter", "extensions/scrollLink", "extensions/buttonSync", "extensions/buttonPublish", "extensions/buttonShare", "extensions/buttonStat", "extensions/buttonHtmlCode", "extensions/buttonViewer", "extensions/welcomeTour", "bootstrap", "jquery-waitforimages" ], function(e, t, n, i, o, r, a) {
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
   var a = o.onSaveSettings;
   a && a(r, n), e[o.extensionId] = r;
  });
 }, c("onMessage"), c("onError"), c("onOfflineChanged"), c("onUserActive"), c("onAsyncRunning", !0), 
 c("onPeriodicRun", !0), c("onFileMgrCreated"), c("onSynchronizerCreated"), c("onPublisherCreated"), 
 c("onEventMgrCreated"), c("onFileCreated"), c("onFileDeleted"), c("onFileSelected"), 
 c("onFileOpen"), c("onFileClosed"), c("onContentChanged"), c("onTitleChanged"), 
 c("onFoldersChanged"), c("onSyncRunning"), c("onSyncSuccess"), c("onSyncImportSuccess"), 
 c("onSyncExportSuccess"), c("onSyncRemoved"), c("onPublishRunning"), c("onPublishSuccess"), 
 c("onNewPublishSuccess"), c("onPublishRemoved"), c("onLayoutConfigure"), c("onLayoutCreated"), 
 c("onEditorConfigure"), c("onSectionsCreated");
 var f = l("onPreviewFinished"), h = s("onAsyncPreview"), m = h.length + 1, g = void 0, v = void 0;
 u.onAsyncPreview = function() {
  function e() {
   ++n === m && (logger.log("Preview time: " + (new Date() - u.previewStartTime)), 
   t.defer(function() {
    var e = "";
    t.each(g.children, function(t) {
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
  if (g = document.getElementById("preview-contents"), v = e(g), viewerMode === !1) {
   var o = t.chain(d).sortBy(function(e) {
    return e.extensionName.toLowerCase();
   }).reduce(function(e, n) {
    return e + (n.settingsBlock ? t.template(a, {
     extensionId: n.extensionId,
     extensionName: n.extensionName,
     isOptional: n.isOptional,
     settingsBlock: n.settingsBlock
    }) : "");
   }, "").value();
   document.querySelector(".accordion-extensions").innerHTML = o, logger.log("onCreateButton");
   var r = s("onCreateButton"), l = document.createDocumentFragment();
   t.each(r, function(e) {
    l.appendChild(i(e));
   }), document.getElementById("extension-buttons").appendChild(l), logger.log("onCreatePreviewButton");
   var c = s("onCreatePreviewButton"), u = document.createDocumentFragment();
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
 return '<div class="navbar navbar-default ui-layout-north">\n	<div class="navbar-inner">\n		<div class="nav left-space"></div>\n		<div class="nav right-space pull-right"></div>\n		<ul class="nav">\n			<li class="wmd-button-group1 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group2 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group3 btn-group"></li>\n		</ul>\n		<ul class="nav">\n			<li class="wmd-button-group4 btn-group"></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li class="btn-group"><button\n					class="btn btn-success action-create-file" title="New document">\n					<i class="icon-file"></i>\n				</button>\n				<button class="btn btn-success" title="Delete current document"\n					data-toggle="modal" data-target=".modal-remove-file-confirm">\n					<i class="icon-trash"></i>\n				</button></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li id="extension-buttons"></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><a class="btn btn-success file-title-navbar" href="#"\n				title="Rename current document"> </a></li>\n			<li><input type="text"\n				class="col-lg-4 form-control hide input-file-title"\n				placeholder="Document title" /></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n		</ul>\n	</div>\n</div>\n<textarea id="wmd-input" class="ui-layout-center form-control"></textarea>\n<div class="ui-layout-east preview-container"></div>\n<div class="ui-layout-south preview-container"></div>\n<div id="wmd-button-bar" class="hide"></div>\n\n<div class="menu-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".menu-panel" title="Menu">\n		<i class="icon-left-open"></i> <img\n			data-stackedit-src="stackedit-64.png" width="32" height="32" />\n	</button>\n	<div class="panel-content">\n		<div class="list-group">\n			<a href="viewer.html" title="StackEdit Viewer"\n				class="list-group-item"><i class="icon-resize-full"></i>\n				StackEdit Viewer</a> <a href="#" data-toggle="collapse"\n				data-target=".collapse-open-from" class="list-group-item"><i\n				class="icon-hdd"></i> Open from...</a>\n			<div class="sub-menu collapse collapse-open-from clearfix">\n				<ul class="nav">\n					<li><a data-toggle="modal" data-target=".modal-import-url"\n						class="action-reset-input" href="#">Open from URL</a></li>\n					<li><a data-toggle="modal"\n						data-target=".modal-import-harddrive-markdown"\n						class="action-reset-input" href="#">Import from hard drive</a></li>\n					<li><a data-toggle="modal"\n						data-target=".modal-import-harddrive-html"\n						class="action-reset-input" href="#">Convert HTML to Markdown</a></li>\n				</ul>\n			</div>\n\n			<a href="#" data-toggle="collapse" data-target=".collapse-save-as"\n				class="list-group-item"><i class="icon-hdd"></i> Save as...</a>\n			<div class="sub-menu collapse collapse-save-as clearfix">\n				<ul class="nav">\n					<li><a class="action-download-md" href="#">Save as\n							Markdown</a></li>\n					<li><a class="action-download-html" href="#">Save as HTML</a></li>\n					<li><a class="action-download-template" href="#">Save\n							using template</a></li>\n				</ul>\n			</div>\n		</div>\n		<div class=dropdown-header>SYNCHRONIZE</div>\n		<div class="list-group">\n			<a href="#" data-toggle="collapse"\n				data-target=".collapse-sync-gdrive" class="list-group-item"><i\n				class="icon-provider-gdrive"></i> Google Drive</a>\n			<div class="sub-menu collapse collapse-sync-gdrive clearfix">\n				<ul class="nav">\n					<li><a href="#" class="action-sync-import-gdrive"\n						data-toggle="collapse" data-target=".menu-panel">Import from\n							Google Drive</a></li>\n					<li><a href="#" class="action-sync-export-dialog-gdrive">Export\n							to Google Drive</a></li>\n				</ul>\n			</div>\n			<a href="#" data-toggle="collapse"\n				data-target=".collapse-sync-dropbox" class="list-group-item"><i\n				class="icon-provider-dropbox"></i> Dropbox</a>\n			<div class="sub-menu collapse collapse-sync-dropbox clearfix">\n				<ul class="nav">\n					<li><a class="action-sync-import-dropbox" href="#"\n						data-toggle="collapse" data-target=".menu-panel">Import from\n							Dropbox</a></li>\n					<li><a href="#" class="action-sync-export-dialog-dropbox">Export\n							to Dropbox</a></li>\n				</ul>\n			</div>\n			<a href="#" data-toggle="modal" data-target=".modal-manage-sync"\n				class="action-reset-input list-group-item"><i\n				class="icon-refresh"></i> Manage synchronization</a>\n		</div>\n		<div class=dropdown-header>PUBLISH</div>\n		<div class="list-group">\n			<a href="#" data-toggle="collapse" data-target=".collapse-publish-on"\n				class="list-group-item"><i class="icon-share"></i> Publish on...</a>\n			<div class="sub-menu collapse collapse-publish-on clearfix">\n				<ul class="nav">\n				</ul>\n			</div>\n			<a href="#" data-toggle="modal" data-target=".modal-manage-publish"\n				class="action-reset-input list-group-item"><i class="icon-share"></i>\n				Manage publication</a>\n		</div>\n		<ul class="nav">\n			<li><a href="#" data-toggle="modal"\n				data-target=".modal-settings" class="action-load-settings"><i\n					class="icon-cog"></i> Settings</a></li>\n			<li><a href="#" data-toggle="modal" data-target=".modal-about"><i\n					class="icon-help-circled"></i> About</a></li>\n		</ul>\n\n	</div>\n</div>\n\n\n<div class="document-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".document-panel" title="Select document">\n		<i class="icon-folder-open"></i> <i class="icon-right-open"></i>\n	</button>\n	<div class="search-bar clearfix">\n		<div class="input-group">\n			<span class="input-group-addon"><i class="icon-search"></i></span><input\n				type="text" class="form-control"></input>\n			<button type="button" class="close" title="clear">&times;</button>\n			<div class="input-group-btn">\n				<a data-toggle="modal" data-target=".modal-document-manager"\n					class="btn btn-link" title="Manage documents"><i\n					class="icon-layers"></i></a>\n			</div>\n		</div>\n	</div>\n	<div class="panel-content">\n		<div class="list-group document-list"></div>\n		<div class="list-group document-list-filtered hide"></div>\n	</div>\n</div>\n\n\n<div class="modal modal-document-manager">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Manage documents</h3>\n			</div>\n			<div class="modal-body">\n				<div></div>\n				<ul class="nav nav-pills document-list">\n					<li class="pull-right dropdown"><a href="#"\n						data-toggle="dropdown"><i class="icon-check"></i> Selection <b\n							class="caret"></b></a>\n						<ul class="dropdown-menu">\n							<li><a href="#" class="action-select-all"><i\n									class="icon-check"></i> Select all</a></li>\n							<li><a href="#" class="action-unselect-all"><i\n									class="icon-check-empty"></i> Unselect all</a></li>\n							<li class="divider"></li>\n							<li><a href="#" class="action-move-items"><i\n									class="icon-forward"></i> Move to folder</a></li>\n							<li><a href="#" class="action-delete-items"><i\n									class="icon-trash"></i> Delete</a></li>\n						</ul></li>\n					<li class="pull-right"><a href="#"\n						class="action-create-folder"> <i class="icon-folder"></i>\n							Create folder\n					</a></li>\n					<li class="disabled"><a><i class="icon-file"></i> <span\n							class="document-count"></span></a></li>\n					<li class="disabled"><a><i class="icon-folder"></i> <span\n							class="folder-count"></span></a></li>\n				</ul>\n				<div class="list-group document-list"></div>\n				<p class="confirm-delete hide">The following documents will be\n					deleted locally:</p>\n				<p class="choose-folder hide">Please choose a destination\n					folder:</p>\n				<div class="list-group selected-document-list hide"></div>\n				<div class="list-group select-folder-list hide"></div>\n			</div>\n			<div class="modal-footer">\n				<a href="#"\n					class="btn btn-default confirm-delete choose-folder action-cancel hide">Cancel</a>\n				<a href="#"\n					class="btn btn-primary confirm-delete action-delete-items-confirm hide">OK</a>\n				<a href="#" class="btn btn-primary document-list"\n					data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-insert-link">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Hyperlink</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the link URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-globe"></i></span><input\n						id="input-insert-link" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/ "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-insert-link"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-insert-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Image</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the image URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-picture"></i></span><input\n						id="input-insert-image" type="text" class="col-lg-5 form-control"\n						placeholder=\'http://example.com/image.jpg "optional title"\'></input>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default action-import-image-gplus"\n					data-dismiss="modal"><i class="icon-provider-gplus"></i> Import\n					from Google+</a> <a href="#" class="btn btn-default"\n					data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-insert-image" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Google+ image import</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group">\n						<div class="col-lg-7">\n							<img>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-title">Title (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-import-image-title"\n								placeholder="Image title" class="form-control">\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-4 control-label"\n							for="input-import-image-size">Size limit (optional)</label>\n						<div class="col-lg-7 form-inline">\n							<input type="text" id="input-import-image-size" placeholder="123"\n								class="col-lg-3 form-control"> px\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-import-image"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-remove-file-confirm">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Delete</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					Are you sure you want to delete "<span class="file-title"></span>"?\n				</p>\n				<blockquote>\n					<b>NOTE:</b> This will not delete the file on synchronized\n					locations.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-remove-file"\n					data-dismiss="modal">Delete</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-url">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Open from URL</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please provide a link to a Markdown document.</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-lg-3 control-label" for="input-import-url">URL</label>\n						<div class="col-lg-8">\n							<input type="text" id="input-import-url"\n								placeholder="http://www.abc.com/xyz.md" class="form-control">\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-import-url">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-harddrive-markdown">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Import from hard drive</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your Markdown files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-markdown"\n						multiple class="form-control" />\n				</p>\n				<p>Or drag and drop your Markdown files here:</p>\n				<p id="dropzone-import-harddrive-markdown" class="drop-zone">Drop\n					files here</p>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-import-harddrive-html">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Convert HTML to Markdown</h3>\n			</div>\n			<div class="modal-body">\n				<p>Please select your HTML files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-html" multiple\n						class="form-control" />\n				</p>\n				<p>Or drag and drop your HTML files here:</p>\n				<p id="dropzone-import-harddrive-html" class="drop-zone">Drop\n					files here</p>\n				<p>Or insert your HTML code here:</p>\n				<textarea id="input-convert-html" class="form-control"></textarea>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Close</a> <a\n					href="#" class="btn btn-primary action-convert-html"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-upload-gdrive">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Google Drive</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					This will save "<span class="file-title"></span>" to your <i\n						class="icon-provider-gdrive"></i>\n					<code>Google Drive</code>\n					account and keep it synchronized.\n				</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-gdrive-parentid">Folder ID\n							(optional)</label>\n						<div class="col-lg-8">\n							<div class="input-group">\n								<input type="text" id="input-sync-export-gdrive-parentid"\n									placeholder="FolderID" class="form-control">\n								<div class="input-group-btn">\n									<a class="btn btn-link export-gdrive-choose-folder"\n										title="Choose folder" data-dismiss="modal"><i\n										class="icon-folder-open"></i></a>\n								</div>\n							</div>\n							<span class="help-block"> If no folder ID is supplied, the\n								file will be created in your root folder. </span>\n						</div>\n					</div>\n					<div class="form-group">\n						<div class="col-lg-3 control-label"></div>\n						<div class="col-lg-8">\n							<label> <input id="input-sync-export-gdrive-realtime"\n								type="checkbox"> Create a real time collaborative\n								document\n							</label>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-gdrive-fileid">Existing file ID\n							(optional)</label>\n						<div class="col-lg-8">\n							<input type="text" id="input-sync-export-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block"> This will overwrite the existing file\n								on the server. </span>\n						</div>\n					</div>\n				</div>\n				<blockquote>\n					<b>NOTE:</b>\n					<ul>\n						<li>You can move or rename the file afterwards within Google\n							Drive.</li>\n						<li>Real time collaborative documents can\'t be open outside\n							StackEdit.</li>\n						<li>Real time collaborative documents can\'t have multiple\n							synchronized locations.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-sync-export-gdrive">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-upload-dropbox">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Export to Dropbox</h3>\n			</div>\n			<div class="modal-body">\n				<p>\n					This will save "<span class="file-title"></span>" to your <i\n						class="icon-provider-dropbox"></i>\n					<code>Dropbox</code>\n					account and keep it synchronized.\n				</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-lg-3 control-label"\n							for="input-sync-export-dropbox-path">File path</label>\n						<div class="col-lg-8">\n							<input type="text" id="input-sync-export-dropbox-path"\n								placeholder="/path/to/My Document.md" class="form-control">\n							<span class="help-block"> File path is composed of both\n								folder and filename. </span>\n						</div>\n					</div>\n				</div>\n				<blockquote>\n					<b>NOTE:</b>\n					<ul>\n						<li>Dropbox file path does not depend on document title.</li>\n						<li>The title of your document will not be synchronized.</li>\n						<li>Destination folder must exist.</li>\n						<li>Any existing file at this location will be overwritten.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-sync-export-dropbox">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-manage-sync">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Synchronization</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-sync-list hide">\n					"<span class="file-title"></span>" is synchronized with the\n					following location(s):\n				</p>\n				<div class="msg-sync-list sync-list hide"></div>\n				<blockquote class="msg-sync-list hide">\n					<b>NOTE:</b> Removing a synchronized location will not delete any\n					file.\n				</blockquote>\n				<blockquote class="msg-no-sync hide">\n					"<span class="file-title"></span>" is not synchronized yet. <br />\n					<br /> <b>NOTE:</b> You can add synchronized locations by\n					exporting your document using <i class="icon-provider-gdrive"></i>\n					<code>Google Drive</code>\n					or <i class="icon-provider-dropbox"></i>\n					<code>Dropbox</code>\n					sub-menu.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">\n					Publish on <span class="publish-provider-name"></span>\n				</h3>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-host">Host</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-host"\n								placeholder="host.name.or.ip" class="form-control"> <span\n								class="help-block"> Host must be accessible publicly,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label" for="input-publish-ssh-port">Port\n							(optional)</label>\n						<div class="col-lg-2">\n							<input type="text" id="input-publish-ssh-port" placeholder="22"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-username">Username</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-ssh-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-lg-4 control-label"\n							for="input-publish-ssh-password">Password</label>\n						<div class="col-lg-7">\n							<input type="password" id="input-publish-ssh-password"\n								placeholder="password" class="form-control"> <span\n								class="help-block"> Passwords are transmitted in clear,\n								unless you are hosting your own <a target="_blank"\n								href="https://github.com/benweet/stackedit-ssh-proxy">SSH\n									proxy</a>.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-reponame">Repository</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-reponame"\n								placeholder="repository-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-username">Username (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-github-branch">Branch</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-github-branch"\n								placeholder="branch-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh modal-publish-github">\n						<label class="col-lg-4 control-label"\n							for="input-publish-file-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-file-path"\n								placeholder="path/to/file.md" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-filename">Filename</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-filename"\n								placeholder="filename" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label" for="input-publish-gist-id">Existing\n							ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gist-id"\n								placeholder="GistID" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gist-public">Public</label>\n						<div class="col-lg-7">\n							<div class="checkbox">\n								<input type="checkbox" id="input-publish-gist-public"\n									checked="checked" />\n							</div>\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label"\n							for="input-publish-blogger-url">Blog URL</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-blogger-url"\n								placeholder="http://exemple.blogger.com/" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-tumblr">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">Blog hostname</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tumblr-hostname"\n								placeholder="exemple.tumblr.com" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-wordpress">\n						<label class="col-lg-4 control-label"\n							for="input-publish-tumblr-hostname">WordPress site</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-wordpress-site"\n								placeholder="exemple.wordpress.com" class="form-control">\n							<span class="help-block"> <a target="_blank"\n								href="http://jetpack.me/">Jetpack plugin</a> is required for\n								self-hosted sites.\n							</span>\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-blogger modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-postid">Update\n							existing post ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-postid" placeholder="PostID"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger">\n						<label class="col-lg-4 control-label" for="input-publish-labels">Labels\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-labels"\n								placeholder="Label1, Label2" class="form-control">\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-lg-4 control-label" for="input-publish-tags">Tags\n							(comma separated)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-tags"\n								placeholder="Tag1, Tag2" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-dropbox">\n						<label class="col-lg-4 control-label"\n							for="input-publish-dropbox-path">File path</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-dropbox-path"\n								placeholder="/path/to/My Document.html" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-fileid">File ID (optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block">If no file ID is supplied, a new file\n								will be created in your Google Drive root folder. You can move\n								the file afterwards within Google Drive.</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-lg-4 control-label"\n							for="input-publish-gdrive-filename">Force filename\n							(optional)</label>\n						<div class="col-lg-7">\n							<input type="text" id="input-publish-gdrive-filename"\n								placeholder="Filename" class="form-control"> <span\n								class="help-block">If no file name is supplied, the\n								document title will be used.</span>\n						</div>\n					</div>\n\n					<div class="form-group">\n						<label class="col-lg-4 control-label">Format</label>\n						<div class="col-lg-7">\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="markdown"> Markdown\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="html"> HTML\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="template"> Template\n								</label>\n							</div>\n						</div>\n					</div>\n					<div class="collapse publish-custom-template-collapse">\n						<div class="form-group">\n							<div class="col-lg-4"></div>\n							<div class="col-lg-7">\n								<div class="checkbox">\n									<label> <input type="checkbox"\n										id="checkbox-publish-custom-template"> Custom template\n									</label> <a href="#" class="tooltip-template">(?)</a>\n								</div>\n							</div>\n						</div>\n						<div class="form-group">\n							<div class="col-lg-4"></div>\n							<div class="col-lg-7">\n								<textarea class="form-control"\n									id="textarea-publish-custom-template"></textarea>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-process-publish">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-manage-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Publication</h3>\n			</div>\n			<div class="modal-body">\n				<p class="msg-publish-list hide">\n					"<span class="file-title"></span>" is published on the following\n					location(s):\n				</p>\n				<div class="msg-publish-list publish-list hide"></div>\n				<blockquote>\n					<div class="msg-no-publish hide">\n						"<span class="file-title"></span>" is not published yet. <br /> <br />\n					</div>\n					<b>NOTE:</b> You can add publications using "Publish on" sub-menu.\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-settings">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h3 class="modal-title">Settings</h3>\n				<ul class="nav nav-tabs">\n					<li class="active"><a class="action-load-settings"\n						href="#tabpane-settings-editor" data-toggle="tab">Editor</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-publish" data-toggle="tab">Publish</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-extensions" data-toggle="tab">Extensions</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-utils" data-toggle="tab">Utils</a></li>\n				</ul>\n			</div>\n			<div class="modal-body">\n\n				<div class="tab-content clearfix">\n					<div class="tab-pane active" id="tabpane-settings-editor">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label">Layout orientation</label>\n								<div class="col-lg-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="horizontal">\n											Horizontal\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="vertical">\n											Vertical\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label" for="input-settings-theme">Theme</label>\n								<div class="col-lg-7">\n									<select id="input-settings-theme" class="form-control">\n									</select> <span class="help-block"><a target="_blank"\n										href="https://github.com/benweet/stackedit/blob/master/doc/theming.md#stackedit-theming-guide">Create\n											your own theme...</a></span>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-lazy-rendering">Lazy rendering <a\n									href="#" class="tooltip-lazy-rendering">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<div class="checkbox">\n										<input type="checkbox" id="input-settings-lazy-rendering" />\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-editor-font-family">Editor font</label>\n								<div class="col-lg-8 form-inline">\n									<input type="text" id="input-settings-editor-font-family"\n										class="form-control col-lg-7"> <input type="text"\n										id="input-settings-editor-font-size"\n										class="form-control col-lg-2"> px\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-default-content">Default content\n									<a href="#" class="tooltip-default-content">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-default-content"\n										class="form-control"></textarea>\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-publish">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-publish-commit-msg">Commit message</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-publish-commit-msg"\n										class="form-control">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="textarea-settings-publish-template">Default\n									template <a href="#" class="tooltip-template">(?)</a>\n								</label>\n								<div class="col-lg-7">\n									<textarea id="textarea-settings-publish-template"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-lg-4 control-label"\n									for="input-settings-ssh-proxy">SSH proxy</label>\n								<div class="col-lg-7">\n									<input type="text" id="input-settings-ssh-proxy"\n										class="form-control">\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-extensions">\n						<div class="panel-group accordion-extensions"></div>\n						<span class="help-block pull-right"><a target="_blank"\n							href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">Create\n								your own extension...</a></span>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-utils">\n						<div class="tab-pane-button-container">\n							<a href="#"\n								class="btn btn-block btn-primary action-import-settings"><i\n								class="icon-wrench icon-white"></i> Import settings</a> <a href="#"\n								class="btn btn-block btn-primary action-export-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Export settings</a> <a href="#"\n								class="btn btn-block btn-primary action-default-settings"\n								data-dismiss="modal"><i class="icon-wrench icon-white"></i>\n								Load default settings</a> <input type="file"\n								id="input-file-import-settings" class="hide">\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#" class="btn btn-block btn-primary action-welcome-file"\n								data-dismiss="modal"><i class="icon-help-circled icon-white"></i>\n								Welcome document</a> <a href="#"\n								class="btn btn-block btn-primary action-welcome-tour"\n								data-dismiss="modal" data-dismiss="modal"><i\n								class="icon-help-circled icon-white"></i> Welcome tour</a>\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#" class="btn btn-block btn-primary"\n								data-dismiss="modal" data-toggle="modal"\n								data-target=".modal-app-reset"><i\n								class="icon-fire icon-white"></i> Reset application</a>\n						</div>\n					</div>\n				</div>\n\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default"\n					data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-apply-settings" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>If you want to reopen StackEdit, click on\n					"Reload".</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal modal-app-reset">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Reset application</h3>\n			</div>\n			<div class="modal-body">\n				<p>This will delete all your local documents.</p>\n				<blockquote>Are you sure?</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-app-reset"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<textarea id="md-section-helper" class="form-control"></textarea>\n<div class="lock-ui hide"></div>\n<div id="dropboxjs" data-app-key="x0k2l8puemfvg0o"></div>';
}), define("text!html/bodyViewer.html", [], function() {
 return '\n<div class="navbar navbar-default ui-layout-north">\n	<div class="navbar-inner">\n		<div class="nav right-space pull-right"></div>\n\n		<ul class="nav pull-right">\n			<li class="btn-group">\n				<button class="btn btn-success action-edit-document hide"\n					title="Edit this document">\n					<i class="icon-pencil"></i>\n				</button>\n			</li>\n			<li class="btn-group">\n				<button class="btn btn-success dropdown-toggle"\n					data-toggle="dropdown" title="Save this document">\n					<i class="icon-download"></i>\n				</button>\n				<ul class="dropdown-menu">\n					<li><a class="action-download-md" href="#">Save as\n							Markdown</a></li>\n					<li><a class="action-download-html" href="#">Save as HTML</a></li>\n					<li><a class="action-download-template" href="#">Save\n							using template</a></li>\n				</ul>\n			</li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><span class="file-title-navbar"></span></li>\n		</ul>\n		<ul class="nav pull-right">\n			<li><i class="working-indicator icon-none"></i></li>\n		</ul>\n\n	</div>\n</div>\n<div id="wmd-button-bar" class="hide"></div>\n<textarea id="wmd-input" class="hide"></textarea>\n<div class="ui-layout-center preview-container"></div>\n\n<div class="menu-panel collapse width">\n	<button class="btn btn-success collapse-button action-open-stackedit"\n		title="Open StackEdit">\n		<i class="icon-left-dir"></i> <img\n			data-stackedit-src="stackedit-64.png" width="32" height="32" />\n	</button>\n</div>\n\n<div class="document-panel collapse width">\n	<button class="btn btn-success collapse-button" data-toggle="collapse"\n		data-target=".document-panel" title="Select document">\n		<i class="icon-folder-open"></i> <i class="icon-right-dir"></i>\n	</button>\n	<div class="search-bar clearfix">\n		<div class="input-group">\n			<span class="input-group-addon"><i class="icon-search"></i></span><input\n				type="text" class="form-control"></input>\n			<button type="button" class="close" title="clear">&times;</button>\n			<div class="input-group-btn">\n				<a data-toggle="modal" data-target=".modal-document-manager"\n					class="btn btn-link" title="Manage documents"><i\n					class="icon-layers"></i></a>\n			</div>\n		</div>\n	</div>\n	<div class="panel-content">\n		<div class="list-group document-list"></div>\n		<div class="list-group document-list-filtered hide"></div>\n	</div>\n</div>\n\n<div class="modal modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>If you want to reopen StackEdit, click on\n					"Reload".</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/settingsTemplateTooltip.html", [], function() {
 return 'Available variables:\n<br>\n<ul>\n	<li><b>documentTitle</b>: document title</li>\n	<li><b>documentMarkdown</b>: document in Markdown format</li>\n	<li><b>documentHTML</b>: document in HTML format</li>\n	<li><b>publishAttributes</b>: attributes of the publish location\n		(undefined if not publishing)</li>\n</ul>\n<b>Examples:</b>\n<br />\n&lt;title&gt;&lt;%= documentTitle %&gt;&lt;&#x2F;title&gt;\n<br />\n&lt;div&gt;&lt;%- documentHTML %&gt;&lt;&#x2F;div&gt;\n<br />\n&lt;%<br />\nif(publishAttributes.provider.providerId == &quot;github&quot;)\nprint(documentMarkdown);<br />\n%&gt;\n<br />\n<br />\n<a target="_blank" href="http://underscorejs.org/#template">More\n	info</a>\n<br />\n<br />\n<b class="text-danger"><i class="icon-attention"></i> Careful! Template is subject to malicious code. Don\'t copy/paste untrusted content.</b>';
}), define("text!html/settingsUserCustomExtensionTooltip.html", [], function() {
 return 'Extension variable name:\n<b>userCustom</b>\n<br>\n<br>\n<b>Example:</b>\n<br />\nuserCustom.onPreviewFinished = function() {\n<br />\n&nbsp;&nbsp;eventMgr.onMessage(&quot;Finished!&quot;);\n<br />\n};\n<br />\n<br />\n<a target="_blank"\n	href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#architecture">More\n	info</a>\n<br />\n<br />\n<b class="text-danger"><i class="icon-attention"></i> Careful! This is subject to malicious code. Don\'t copy/paste untrusted content.</b>';
}), function(e, t) {
 function n(t, n) {
  var o, r, a, s = t.nodeName.toLowerCase();
  return "area" === s ? (o = t.parentNode, r = o.name, t.href && r && "map" === o.nodeName.toLowerCase() ? (a = e("img[usemap=#" + r + "]")[0], 
  !!a && i(a)) : !1) : (/input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || n : n) && i(t);
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
  var r = "Width" === i ? [ "Left", "Right" ] : [ "Top", "Bottom" ], a = i.toLowerCase(), s = {
   innerWidth: e.fn.innerWidth,
   innerHeight: e.fn.innerHeight,
   outerWidth: e.fn.outerWidth,
   outerHeight: e.fn.outerHeight
  };
  e.fn["inner" + i] = function(n) {
   return n === t ? s["inner" + i].call(this) : this.each(function() {
    e(this).css(a, o(this, n) + "px");
   });
  }, e.fn["outer" + i] = function(t, n) {
   return "number" != typeof t ? s["outer" + i].call(this, t) : this.each(function() {
    e(this).css(a, o(this, t, !0, n) + "px");
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
}(jQuery), define("jquery-ui-core", function() {}), function(e, t) {
 var n = 0, i = Array.prototype.slice, o = e.cleanData;
 e.cleanData = function(t) {
  for (var n, i = 0; null != (n = t[i]); i++) try {
   e(n).triggerHandler("remove");
  } catch (r) {}
  o(t);
 }, e.widget = function(t, n, i) {
  var o, r, a, s, l = {}, c = t.split(".")[0];
  t = t.split(".")[1], o = c + "-" + t, i || (i = n, n = e.Widget), e.expr[":"][o.toLowerCase()] = function(t) {
   return !!e.data(t, o);
  }, e[c] = e[c] || {}, r = e[c][t], a = e[c][t] = function(e, t) {
   return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new a(e, t);
  }, e.extend(a, r, {
   version: i.version,
   _proto: e.extend({}, i),
   _childConstructors: []
  }), s = new n(), s.options = e.widget.extend({}, s.options), e.each(i, function(t, i) {
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
  }), a.prototype = e.widget.extend(s, {
   widgetEventPrefix: r ? s.widgetEventPrefix : t
  }, l, {
   constructor: a,
   namespace: c,
   widgetName: t,
   widgetFullName: o
  }), r ? (e.each(r._childConstructors, function(t, n) {
   var i = n.prototype;
   e.widget(i.namespace + "." + i.widgetName, a, n._proto);
  }), delete r._childConstructors) : n._childConstructors.push(a), e.widget.bridge(t, a);
 }, e.widget.extend = function(n) {
  for (var o, r, a = i.call(arguments, 1), s = 0, l = a.length; l > s; s++) for (o in a[s]) r = a[s][o], 
  a[s].hasOwnProperty(o) && r !== t && (n[o] = e.isPlainObject(r) ? e.isPlainObject(n[o]) ? e.widget.extend({}, n[o], r) : e.widget.extend({}, r) : r);
  return n;
 }, e.widget.bridge = function(n, o) {
  var r = o.prototype.widgetFullName || n;
  e.fn[n] = function(a) {
   var s = "string" == typeof a, l = i.call(arguments, 1), c = this;
   return a = !s && l.length ? e.widget.extend.apply(null, [ a ].concat(l)) : a, s ? this.each(function() {
    var i, o = e.data(this, r);
    return o ? e.isFunction(o[a]) && "_" !== a.charAt(0) ? (i = o[a].apply(o, l), i !== o && i !== t ? (c = i && i.jquery ? c.pushStack(i.get()) : i, 
    !1) : void 0) : e.error("no such method '" + a + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + a + "'");
   }) : this.each(function() {
    var t = e.data(this, r);
    t ? t.option(a || {})._init() : e.data(this, r, new o(a, this));
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
   var o, r, a, s = n;
   if (0 === arguments.length) return e.widget.extend({}, this.options);
   if ("string" == typeof n) if (s = {}, o = n.split("."), n = o.shift(), o.length) {
    for (r = s[n] = e.widget.extend({}, this.options[n]), a = 0; a < o.length - 1; a++) r[o[a]] = r[o[a]] || {}, 
    r = r[o[a]];
    if (n = o.pop(), i === t) return r[n] === t ? null : r[n];
    r[n] = i;
   } else {
    if (i === t) return this.options[n] === t ? null : this.options[n];
    s[n] = i;
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
  _on: function(t, n, i) {
   var o, r = this;
   "boolean" != typeof t && (i = n, n = t, t = !1), i ? (n = o = e(n), this.bindings = this.bindings.add(n)) : (i = n, 
   n = this.element, o = this.widget()), e.each(i, function(i, a) {
    function s() {
     return t || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : void 0;
    }
    "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
    var l = i.match(/^(\w+)\s*(.*)$/), c = l[1] + r.eventNamespace, u = l[2];
    u ? o.delegate(u, c, s) : n.bind(c, s);
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
   var o, r, a = this.options[t];
   if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), 
   n.target = this.element[0], r = n.originalEvent) for (o in r) o in n || (n[o] = r[o]);
   return this.element.trigger(n, i), !(e.isFunction(a) && a.apply(this.element[0], [ n ].concat(i)) === !1 || n.isDefaultPrevented());
  }
 }, e.each({
  show: "fadeIn",
  hide: "fadeOut"
 }, function(t, n) {
  e.Widget.prototype["_" + t] = function(i, o, r) {
   "string" == typeof o && (o = {
    effect: o
   });
   var a, s = o ? o === !0 || "number" == typeof o ? n : o.effect || n : t;
   o = o || {}, "number" == typeof o && (o = {
    duration: o
   }), a = !e.isEmptyObject(o), o.complete = r, o.delay && i.delay(o.delay), a && e.effects && e.effects.effect[s] ? i[t](o) : s !== t && i[s] ? i[s](o.duration, o.easing, r) : i.queue(function(n) {
    e(this)[t](), r && r.call(i[0]), n();
   });
  };
 });
}(jQuery), define("jquery-ui-widget", function() {}), function(e) {
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
}(jQuery), define("jquery-ui-mouse", function() {}), function(e) {
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
   var n, i, o, r, a = this.options, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = t.pageX, c = t.pageY;
   return this.offset.scroll || (this.offset.scroll = {
    top: s.scrollTop(),
    left: s.scrollLeft()
   }), this.originalPosition && (this.containment && (this.relative_container ? (i = this.relative_container.offset(), 
   n = [ this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top ]) : n = this.containment, 
   t.pageX - this.offset.click.left < n[0] && (l = n[0] + this.offset.click.left), 
   t.pageY - this.offset.click.top < n[1] && (c = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (l = n[2] + this.offset.click.left), 
   t.pageY - this.offset.click.top > n[3] && (c = n[3] + this.offset.click.top)), a.grid && (o = a.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, 
   c = n ? o - this.offset.click.top >= n[1] || o - this.offset.click.top > n[3] ? o : o - this.offset.click.top >= n[1] ? o - a.grid[1] : o + a.grid[1] : o, 
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
    var r = !1, a = this;
    this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, 
    this.instance.offset.click = i.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (r = !0, 
    e.each(i.sortables, function() {
     return this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, 
     this.instance.offset.click = i.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && e.contains(a.instance.element[0], this.instance.element[0]) && (r = !1), 
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
   var i, o, r, a, s, l, c, u, d, p, f = e(this).data("ui-draggable"), h = f.options, m = h.snapTolerance, g = n.offset.left, v = g + f.helperProportions.width, b = n.offset.top, y = b + f.helperProportions.height;
   for (d = f.snapElements.length - 1; d >= 0; d--) s = f.snapElements[d].left, l = s + f.snapElements[d].width, 
   c = f.snapElements[d].top, u = c + f.snapElements[d].height, s - m > v || g > l + m || c - m > y || b > u + m || !e.contains(f.snapElements[d].item.ownerDocument, f.snapElements[d].item) ? (f.snapElements[d].snapping && f.options.snap.release && f.options.snap.release.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = !1) : ("inner" !== h.snapMode && (i = Math.abs(c - y) <= m, 
   o = Math.abs(u - b) <= m, r = Math.abs(s - v) <= m, a = Math.abs(l - g) <= m, i && (n.position.top = f._convertPositionTo("relative", {
    top: c - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), o && (n.position.top = f._convertPositionTo("relative", {
    top: u,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s - f.helperProportions.width
   }).left - f.margins.left), a && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l
   }).left - f.margins.left)), p = i || o || r || a, "outer" !== h.snapMode && (i = Math.abs(c - b) <= m, 
   o = Math.abs(u - y) <= m, r = Math.abs(s - g) <= m, a = Math.abs(l - v) <= m, i && (n.position.top = f._convertPositionTo("relative", {
    top: c,
    left: 0
   }).top - f.margins.top), o && (n.position.top = f._convertPositionTo("relative", {
    top: u - f.helperProportions.height,
    left: 0
   }).top - f.margins.top), r && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: s
   }).left - f.margins.left), a && (n.position.left = f._convertPositionTo("relative", {
    top: 0,
    left: l - f.helperProportions.width
   }).left - f.margins.left)), !f.snapElements[d].snapping && (i || o || r || a || p) && f.options.snap.snap && f.options.snap.snap.call(f.element, t, e.extend(f._uiHash(), {
    snapItem: f.snapElements[d].item
   })), f.snapElements[d].snapping = i || o || r || a || p);
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
}(jQuery), define("jquery-ui-draggable", function() {}), function(e, t) {
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
    var r, a = o.re.exec(t), s = a && o.parse(a), l = o.space || "rgba";
    return s ? (r = n[l](s), n[u[l].cache] = r[u[l].cache], i = n._rgba = r._rgba, !1) : void 0;
   }), i.length ? ("0,0,0,0" === i.join() && e.extend(i, r.transparent), n) : r[t];
  }
  function o(e, t, n) {
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
   parse: function(o, a, s, l) {
    if (o === t) return this._rgba = [ null, null, null, null ], this;
    (o.jquery || o.nodeType) && (o = e(o).css(a), a = t);
    var d = this, p = e.type(o), f = this._rgba = [];
    return a !== t && (o = [ o, a, s, l ], p = "array"), "string" === p ? this.parse(i(o) || r._default) : "array" === p ? (h(u.rgba.props, function(e, t) {
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
     var r, a = t[o.cache];
     return a && (r = i[o.cache] || o.to && o.to(i._rgba) || [], h(o.props, function(e, t) {
      return null != a[t.idx] ? n = a[t.idx] === r[t.idx] : void 0;
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
    var i = c(e), o = i._space(), r = u[o], a = 0 === this.alpha() ? c("transparent") : this, s = a[r.cache] || r.to(a._rgba), l = s.slice();
    return i = i[r.cache], h(r.props, function(e, o) {
     var r = o.idx, a = s[r], c = i[r], u = d[o.type] || {};
     null !== c && (null === a ? l[r] = c : (u.mod && (c - a > u.mod / 2 ? a += u.mod : a - c > u.mod / 2 && (a -= u.mod)), 
     l[r] = n((c - a) * t + a, o)));
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
   var t, n, i = e[0] / 255, o = e[1] / 255, r = e[2] / 255, a = e[3], s = Math.max(i, o, r), l = Math.min(i, o, r), c = s - l, u = s + l, d = .5 * u;
   return t = l === s ? 0 : i === s ? 60 * (o - r) / c + 360 : o === s ? 60 * (r - i) / c + 120 : 60 * (i - o) / c + 240, 
   n = 0 === c ? 0 : .5 >= d ? c / u : c / (2 - u), [ Math.round(t) % 360, n, d, null == a ? 1 : a ];
  }, u.hsla.from = function(e) {
   if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
   var t = e[0] / 360, n = e[1], i = e[2], r = e[3], a = .5 >= i ? i * (1 + n) : i + n - i * n, s = 2 * i - a;
   return [ Math.round(255 * o(s, a, t + 1 / 3)), Math.round(255 * o(s, a, t)), Math.round(255 * o(s, a, t - 1 / 3)), r ];
  }, h(u, function(i, o) {
   var r = o.props, a = o.cache, l = o.to, u = o.from;
   c.fn[i] = function(i) {
    if (l && !this[a] && (this[a] = l(this._rgba)), i === t) return this[a].slice();
    var o, s = e.type(i), d = "array" === s || "object" === s ? i : arguments, p = this[a].slice();
    return h(r, function(e, t) {
     var i = d["object" === s ? e : t.idx];
     null == i && (i = p[t.idx]), p[t.idx] = n(i, t);
    }), u ? (o = c(u(p)), o[a] = p, o) : c(p);
   }, h(r, function(t, n) {
    c.fn[t] || (c.fn[t] = function(o) {
     var r, a = e.type(o), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : i, c = this[l](), u = c[n.idx];
     return "undefined" === a ? u : ("function" === a && (o = o.call(this, u), a = e.type(o)), 
     null == o && n.empty ? this : ("string" === a && (r = s.exec(o), r && (o = u + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), 
     c[n.idx] = o, this[l](c)));
    });
   });
  }), c.hook = function(t) {
   var n = t.split(" ");
   h(n, function(t, n) {
    e.cssHooks[n] = {
     set: function(t, o) {
      var r, a, s = "";
      if ("transparent" !== o && ("string" !== e.type(o) || (r = i(o)))) {
       if (o = c(r || o), !p.rgba && 1 !== o._rgba[3]) {
        for (a = "backgroundColor" === n ? t.parentNode : t; ("" === s || "transparent" === s) && a && a.style; ) try {
         s = e.css(a, "backgroundColor"), a = a.parentNode;
        } catch (l) {}
        o = o.blend(s && "transparent" !== s ? s : "_default");
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
  }, c.hook(a), e.cssHooks.borderColor = {
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
   var i, o, a = {};
   for (i in n) o = n[i], t[i] !== o && (r[i] || (e.fx.step[i] || !isNaN(parseFloat(o))) && (a[i] = o));
   return a;
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
     e.each(o, function(e, n) {
      t[n] && a[n + "Class"](t[n]);
     });
    }, r(), c = c.map(function() {
     return this.end = n(this.el[0]), this.diff = i(this.start, this.end), this;
    }), a.attr("class", s), c = c.map(function() {
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
     }), l.complete.call(a[0]);
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
    return function(i, o, r, a, s) {
     return "boolean" == typeof o || o === t ? r ? e.effects.animateClass.call(this, o ? {
      add: i
     } : {
      remove: i
     }, r, a, s) : n.apply(this, arguments) : e.effects.animateClass.call(this, {
      toggle: i
     }, o, r, a);
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
    } catch (a) {
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
     var o = e(this), r = n.complete, s = n.mode;
     (o.is(":hidden") ? "hide" === s : "show" === s) ? (o[s](), i()) : a.call(o[0], n, i);
    }
    var n = i.apply(this, arguments), o = n.mode, r = n.queue, a = e.effects.effect[n.effect];
    return e.fx.off || !a ? o ? this[o](n.duration, n.complete) : this.each(function() {
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
}(jQuery), define("jquery-ui-effect", function() {}), function(e) {
 e.effects.effect.slide = function(t, n) {
  var i, o = e(this), r = [ "position", "top", "bottom", "left", "right", "width", "height" ], a = e.effects.setMode(o, t.mode || "show"), s = "show" === a, l = t.direction || "left", c = "up" === l || "down" === l ? "top" : "left", u = "up" === l || "left" === l, d = {};
  e.effects.save(o, r), o.show(), i = t.distance || o["top" === c ? "outerHeight" : "outerWidth"](!0), 
  e.effects.createWrapper(o).css({
   overflow: "hidden"
  }), s && o.css(c, u ? isNaN(i) ? "-" + i : -i : i), d[c] = (s ? u ? "+=" : "-=" : u ? "-=" : "+=") + i, 
  o.animate(d, {
   queue: !1,
   duration: t.duration,
   easing: t.easing,
   complete: function() {
    "hide" === a && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), n();
   }
  });
 };
}(jQuery), define("jquery-ui-effect-slide", function() {}), function($) {
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
   }, a = r.css, s = {
    bottom: 0
   }, l = $.layout.cssNum, c = e.offset();
   return r.offsetLeft = c.left, r.offsetTop = c.top, t || (t = {}), $.each("Left,Right,Top,Bottom".split(","), function(l, c) {
    n = a["border" + c] = $.layout.borderWidth(e, c), i = a["padding" + c] = $.layout.cssNum(e, "padding" + c), 
    o = c.toLowerCase(), r.inset[o] = t[o] >= 0 ? t[o] : i, s[o] = r.inset[o] + n;
   }), a.width = e.width(), a.height = e.height(), a.top = l(e, "top", !0), a.bottom = l(e, "bottom", !0), 
   a.left = l(e, "left", !0), a.right = l(e, "right", !0), r.outerWidth = e.outerWidth(), 
   r.outerHeight = e.outerHeight(), r.innerWidth = max(0, r.outerWidth - s.left - s.right), 
   r.innerHeight = max(0, r.outerHeight - s.top - s.bottom), r.layoutWidth = e.innerWidth(), 
   r.layoutHeight = e.innerHeight(), r;
  },
  getElementStyles: function(e, t) {
   var n, i, o, r, a, s, l = {}, c = e[0].style, u = t.split(","), d = "Top,Bottom,Left,Right".split(","), p = "Color,Style,Width".split(",");
   for (r = 0; r < u.length; r++) if (n = u[r], n.match(/(border|padding|margin)$/)) for (a = 0; 4 > a; a++) if (i = d[a], 
   "border" === n) for (s = 0; 3 > s; s++) o = p[s], l[n + i + o] = c[n + i + o]; else l[n + i] = c[n + i]; else l[n] = c[n];
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
   var n = $(t || this), i = n.offset(), o = i.top, r = i.left, a = r + n.outerWidth(), s = o + n.outerHeight(), l = e.pageX, c = e.pageY;
   return $.layout.browser.msie && 0 > l && 0 > c || l >= r && a >= l && c >= o && s >= c;
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
    var r = n || "log( <object> )", a = $.extend({
     sort: !1,
     returnHTML: !1,
     display: !1
    }, i);
    t === !0 || a.display ? debugData(e, r, a) : window.console && console.log(debugData(e, r, a));
   } else if (t) alert(e); else if (window.console) console.log(e); else {
    var s = "#layoutLogger", l = $(s);
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
  var n, i, o, r, a, s, l, c = t ? {
   panes: {},
   center: {}
  } : {};
  if ("object" != typeof e) return c;
  for (i in e) for (n = c, a = e[i], o = i.split("__"), l = o.length - 1, s = 0; l >= s; s++) r = o[s], 
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
    for (var i, o = t.split("."), r = o.length - 1, a = {
     branch: e,
     key: o[r]
    }, s = 0; r > s; s++) i = o[s], a.branch = void 0 == a.branch[i] ? n ? a.branch[i] = {} : {} : a.branch[i];
    return a;
   }
   var n, i, o, r = $.layout.backwardCompatibility.map;
   for (var a in r) n = t(a), o = n.branch[n.key], void 0 !== o && (i = t(r[a], !0), 
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
   var n, i, o, r, a = {
    38: "north",
    40: "south",
    37: "west",
    39: "east"
   }, s = (e.altKey, e.shiftKey), l = e.ctrlKey, c = l && t >= 37 && 40 >= t;
   return c && options[a[t]].enableCursorHotkey ? r = a[t] : (l || s) && $.each(_c.borderPanes, function(e, a) {
    return n = options[a], i = n.customHotkey, o = n.customHotkeyModifier, (s && "SHIFT" == o || l && "CTRL" == o || l && s) && i && t === (isNaN(i) || 9 >= i ? i.toUpperCase().charCodeAt(0) : i) ? (r = a, 
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
     }, r = {}, a = t.css("overflow"), s = t.css("overflowX"), l = t.css("overflowY");
     "visible" != a && (r.overflow = a, o.overflow = "visible"), s && !s.match(/(visible|auto)/) && (r.overflowX = s, 
     o.overflowX = "visible"), l && !l.match(/(visible|auto)/) && (r.overflowY = s, o.overflowY = "visible"), 
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
   var r = "horz" === n ? "height" : "width", a = $Ps[e], s = "height" === r ? $Cs[e] : !1, l = $.layout.showInvisibly(a), c = a.css(r), u = s ? s.css(r) : 0;
   return a.css(r, "auto"), s && s.css(r, "auto"), t = "height" === r ? a.outerHeight() : a.outerWidth(), 
   a.css(r, c).css(l), s && s.css(r, u), t;
  }, getPaneSize = function(e, t) {
   var n = $Ps[e], i = options[e], o = state[e], r = t ? i.spacing_open : 0, a = t ? i.spacing_closed : 0;
   return !n || o.isHidden ? 0 : o.isClosed || o.isSliding && t ? a : "horz" === _c[e].dir ? n.outerHeight() + r : n.outerWidth() + r;
  }, setSizeLimits = function(e, t) {
   if (isInitialized()) {
    var n = options[e], i = state[e], o = _c[e], r = o.dir, a = (o.sizeType.toLowerCase(), 
    void 0 != t ? t : i.isSliding), s = ($Ps[e], n.spacing_open), l = _c.oppositeEdge[e], c = state[l], u = $Ps[l], d = !u || c.isVisible === !1 || c.isSliding ? 0 : "horz" == r ? u.outerHeight() : u.outerWidth(), p = (!u || c.isHidden ? 0 : options[l][c.isClosed !== !1 ? "spacing_closed" : "spacing_open"]) || 0, f = "horz" == r ? sC.innerHeight : sC.innerWidth, h = cssMinDims("center"), m = "horz" == r ? max(options.center.minHeight, h.minHeight) : max(options.center.minWidth, h.minWidth), g = f - s - (a ? 0 : _parseSize("center", m, r) + d + p), v = i.minSize = max(_parseSize(e, n.minSize), cssMinDims(e).minSize), b = i.maxSize = min(n.maxSize ? _parseSize(e, n.maxSize) : 1e5, g), y = i.resizerPosition = {}, x = sC.inset.top, w = sC.inset.left, C = sC.innerWidth, k = sC.innerHeight, S = n.spacing_open;
    switch (e) {
    case "north":
     y.min = x + v, y.max = x + b;
     break;

    case "west":
     y.min = w + v, y.max = w + b;
     break;

    case "south":
     y.min = x + k - b - S, y.max = x + k - v - S;
     break;

    case "east":
     y.min = w + C - b - S, y.max = w + C - v - S;
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
   var n = $(e), i = n.data("layoutRole"), o = n.data("layoutEdge"), r = options[o], a = r[i + "Class"], s = "-" + o, l = "-open", c = "-closed", u = "-sliding", d = "-hover ", p = n.hasClass(a + c) ? c : l, f = p === c ? l : c, h = a + d + (a + s + d) + (a + p + d) + (a + s + p + d);
   return t && (h += a + f + d + (a + s + f + d)), "resizer" == i && n.hasClass(a + u) && (h += a + u + d + (a + s + u + d)), 
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
    var o = $Cs[n], r = state[n], a = options[n], s = options.stateManagement || {}, l = t ? a.children = t : a.children;
    if ($.isPlainObject(l)) l = [ l ]; else if (!l || !$.isArray(l)) return;
    $.each(l, function(e, t) {
     if ($.isPlainObject(t)) {
      var a = t.containerSelector ? i.find(t.containerSelector) : o || i;
      a.each(function() {
       var e = $(this), i = e.data("layout");
       if (!i) {
        if (setInstanceKey({
         container: e,
         options: t
        }, r), s.includeChildren && state.stateData[n]) {
         var o = state.stateData[n].children || {}, a = o[t.instanceKey], l = t.stateManagement || (t.stateManagement = {
          autoLoad: !0
         });
         l.autoLoad === !0 && a && (l.autoSave = !1, l.includeChildren = !0, l.autoLoad = $.extend(!0, {}, a));
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
   var e, t, n = $N[0], i = $("html"), o = sC.tagName = n.tagName, r = sC.id = n.id, a = sC.className = n.className, s = options, l = s.name, c = "position,margin,padding,border", u = "layoutCSS", d = {}, p = "hidden", f = $N.data("parentLayout"), h = $N.data("layoutEdge"), m = f && h, g = $.layout.cssNum;
   sC.selector = $N.selector.split(".slice")[0], sC.ref = (s.name ? s.name + " layout / " : "") + o + (r ? "#" + r : a ? ".[" + a + "]" : ""), 
   sC.isBody = "BODY" === o, m || sC.isBody || (e = $N.closest("." + $.layout.defaults.panes.paneClass), 
   f = e.data("parentLayout"), h = e.data("layoutEdge"), m = f && h), $N.data({
    layout: Instance,
    layoutContainer: sID
   }).addClass(s.containerClass);
   var v = {
    destroy: "",
    initPanes: "",
    resizeAll: "resizeAll",
    resize: "resizeAll"
   };
   for (l in v) $N.bind("layout" + l.toLowerCase() + "." + sID, Instance[v[l] || l]);
   m && (Instance.hasParentLayout = !0, f.refreshChildren(h, Instance)), $N.data(u) || (sC.isBody ? ($N.data(u, $.extend(styles($N, c), {
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
     top: g(i, "paddingTop"),
     bottom: g(i, "paddingBottom"),
     left: g(i, "paddingLeft"),
     right: g(i, "paddingRight")
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
    }), s.inset || (s.inset = elDims($N).inset)) : ($N.css({
     width: "auto",
     height: "auto",
     margin: 0,
     position: "absolute"
    }), $N.css(s.outset)), $.extend(sC, elDims($N, s.inset)); else {
     var b = $N.css("position");
     b && b.match(/(fixed|absolute|relative)/) || $N.css("position", "relative"), $N.is(":visible") && ($.extend(sC, elDims($N, s.inset)), 
     sC.innerHeight < 1 && _log(s.errors.noContainerHeight.replace(/CONTAINER/, sC.ref)));
    }
    g($N, "minWidth") && $N.parent().css("overflowX", "auto"), g($N, "minHeight") && $N.parent().css("overflowY", "auto");
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
     var r = "fxName" + o, a = "fxSpeed" + o, s = "fxSettings" + o, l = t[r] = t[r] || n[r] || t.fxName || n.fxName || "none", c = $.effects && ($.effects[l] || $.effects.effect && $.effects.effect[l]);
     "none" !== l && options.effects[l] && c || (l = t[r] = "none");
     var u = options.effects[l] || {}, d = u.all || null, p = u[e] || null;
     t[a] = t[a] || n[a] || t.fxSpeed || n.fxSpeed || null, t[s] = $.extend(!0, {}, d, p, n.fxSettings, t.fxSettings, n[s], t[s]);
    }), delete t.fxName, delete t.fxSpeed, delete t.fxSettings;
   }
   var t, n, i, o, r, a, s;
   if (opts = $.layout.transformData(opts, !0), opts = $.layout.backwardCompatibility.renameAllOptions(opts), 
   !$.isEmptyObject(opts.panes)) {
    for (t = $.layout.optionsMap.noDefault, r = 0, a = t.length; a > r; r++) i = t[r], 
    delete opts.panes[i];
    for (t = $.layout.optionsMap.layout, r = 0, a = t.length; a > r; r++) i = t[r], 
    delete opts.panes[i];
   }
   t = $.layout.optionsMap.layout;
   var l = $.layout.config.optionRootKeys;
   for (i in opts) o = opts[i], $.inArray(i, l) < 0 && $.inArray(i, t) < 0 && (opts.panes[i] || (opts.panes[i] = $.isPlainObject(o) ? $.extend(!0, {}, o) : o), 
   delete opts[i]);
   $.extend(!0, options, opts), $.each(_c.allPanes, function(o, r) {
    if (_c[r] = $.extend(!0, {}, _c.panes, _c[r]), n = options.panes, s = options[r], 
    "center" === r) for (t = $.layout.optionsMap.center, o = 0, a = t.length; a > o; o++) i = t[o], 
    opts.center[i] || !opts.panes[i] && s[i] || (s[i] = n[i]); else s = options[r] = $.extend(!0, {}, n, s), 
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
    var n, i, o, r = options[e], a = state[e], s = _c[e], l = s.dir, c = (a.fx, r.spacing_open || 0, 
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
    initContent(e, !1), c || (n = a.size = _parseSize(e, r.size), i = _parseSize(e, r.minSize) || 1, 
    o = _parseSize(e, r.maxSize) || 1e5, n > 0 && (n = max(min(n, o), i)), a.autoResize = r.autoResize, 
    a.isClosed = !1, a.isSliding = !1, a.isResizing = !1, a.isHidden = !1, a.pins || (a.pins = [])), 
    a.tagName = d[0].tagName, a.edge = e, a.noRoom = !1, a.isVisible = !0, setPanePosition(e), 
    "horz" === l ? u.height = cssH(d, n) : "vert" === l && (u.width = cssW(d, n)), d.css(u), 
    "horz" != l && sizeMidPanes(e, !0), state.initialized && (initHandles(e), initHotkeys(e)), 
    r.initClosed && r.closable && !r.initHidden ? close(e, !0, !0) : r.initHidden || r.initClosed ? hide(e) : a.noRoom || d.css("display", "block"), 
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
    var n = $Ps[t], i = $Rs[t], o = (options[t], state[t]), r = _c[t].side, a = {};
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
     n.css(a), i && o.isClosed ? i.css(r, sC.inset[r]) : i && !o.isHidden && i.css(r, sC.inset[r] + getPaneSize(t));
    }
   });
  }, initHandles = function(e) {
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, t) {
    var n = $Ps[t];
    if ($Rs[t] = !1, $Ts[t] = !1, n) {
     var i = options[t], o = state[t], r = (_c[t], "#" === i.paneSelector.substr(0, 1) ? i.paneSelector.substr(1) : ""), a = i.resizerClass, s = i.togglerClass, l = (o.isVisible ? i.spacing_open : i.spacing_closed, 
     "-" + t), c = (o.isVisible ? "-open" : "-closed", Instance[t]), u = c.resizer = $Rs[t] = $("<div></div>"), d = c.toggler = i.closable ? $Ts[t] = $("<div></div>") : !1;
     !o.isVisible && i.slidable && u.attr("title", i.tips.Slide).css("cursor", i.sliderCursor), 
     u.attr("id", r ? r + "-resizer" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "resizer"
     }).css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal).css(i.applyDemoStyles ? _c.resizers.cssDemo : {}).addClass(a + " " + a + l).hover(addHover, removeHover).hover(onResizerEnter, onResizerLeave).appendTo($N), 
     i.resizerDblClickToggle && u.bind("dblclick." + sID, toggle), d && (d.attr("id", r ? r + "-toggler" : "").data({
      parentLayout: Instance,
      layoutPane: Instance[t],
      layoutEdge: t,
      layoutRole: "toggler"
     }).css(_c.togglers.cssReq).css(i.applyDemoStyles ? _c.togglers.cssDemo : {}).addClass(s + " " + s + l).hover(addHover, removeHover).bind("mouseenter", onResizerEnter).appendTo(u), 
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
    var n, i = options[e], o = i.contentSelector, r = Instance[e], a = $Ps[e];
    o && (n = r.content = $Cs[e] = i.findNestedContent ? a.find(o).eq(0) : a.children(o).eq(0)), 
    n && n.length ? (n.data("layoutRole", "content"), n.data("layoutCSS") || n.data("layoutCSS", styles(n, "height")), 
    n.css(_c.content.cssReq), i.applyDemoStyles && (n.css(_c.content.cssDemo), a.css(_c.content.cssDemoPane)), 
    a.css("overflowX").match(/(scroll|auto)/) && a.css("overflow", "hidden"), state[e].content = {}, 
    t !== !1 && sizeContent(e)) : r.content = $Cs[e] = !1;
   }
  }, initResizable = function(e) {
   var t = $.layout.plugins.draggable;
   e = e ? e.split(",") : _c.borderPanes, $.each(e, function(e, i) {
    var o = options[i];
    if (!t || !$Ps[i] || !o.resizable) return o.resizable = !1, !0;
    var r, a, s = state[i], l = options.zIndexes, c = _c[i], u = "horz" == c.dir ? "top" : "left", d = ($Ps[i], 
    $Rs[i]), p = o.resizerClass, f = 0, h = p + "-drag", m = p + "-" + i + "-drag", g = p + "-dragging", v = p + "-" + i + "-dragging", b = p + "-dragging-limit", y = p + "-" + i + "-dragging-limit", x = !1;
    s.isClosed || d.attr("title", o.tips.Resize).css("cursor", o.resizerCursor), d.draggable({
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
      return o = options[i], s = state[i], a = o.livePaneResizing, !1 === _runCallbacks("ondrag_start", i) ? !1 : (s.isResizing = !0, 
      state.paneResizing = i, timer.clear(i + "_closeSlider"), setSizeLimits(i), r = s.resizerPosition, 
      f = t.position[u], d.addClass(h + " " + m), x = !1, $("body").disableSelection(), 
      showMasks(i, {
       resizing: !0
      }), void 0);
     },
     drag: function(e, t) {
      x || (t.helper.addClass(g + " " + v).css({
       right: "auto",
       bottom: "auto"
      }).children().css("visibility", "hidden"), x = !0, s.isSliding && $Ps[i].css("zIndex", l.pane_sliding));
      var c = 0;
      t.position[u] < r.min ? (t.position[u] = r.min, c = -1) : t.position[u] > r.max && (t.position[u] = r.max, 
      c = 1), c ? (t.helper.addClass(b + " " + y), window.defaultStatus = c > 0 && i.match(/(north|west)/) || 0 > c && i.match(/(south|east)/) ? o.tips.maxSizeWarning : o.tips.minSizeWarning) : (t.helper.removeClass(b + " " + y), 
      window.defaultStatus = ""), a && Math.abs(t.position[u] - f) >= o.liveResizingTolerance && (f = t.position[u], 
      n(e, t, i));
     },
     stop: function(e, t) {
      $("body").enableSelection(), window.defaultStatus = "", d.removeClass(h + " " + m), 
      s.isResizing = !1, state.paneResizing = !1, n(e, t, i, !0);
     }
    });
   });
   var n = function(e, t, n, i) {
    var o, r = t.position, a = _c[n], s = options[n], l = state[n];
    switch (n) {
    case "north":
     o = r.top;
     break;

    case "west":
     o = r.left;
     break;

    case "south":
     o = sC.layoutHeight - r.top - s.spacing_open;
     break;

    case "east":
     o = sC.layoutWidth - r.left - s.spacing_open;
    }
    var c = o - sC.inset[a.side];
    if (i) !1 !== _runCallbacks("ondrag_end", n) && manualSizePane(n, c, !1, !0), hideMasks(!0), 
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
   var n, i, o = _c[e], r = [ "center" ], a = options.zIndexes, s = $.extend({
    objectsOnly: !1,
    animation: !1,
    resizing: !0,
    sliding: state[e].isSliding
   }, t);
   s.resizing && r.push(e), s.sliding && r.push(_c.oppositeEdge[e]), "horz" === o.dir && (r.push("west"), 
   r.push("east")), $.each(r, function(e, t) {
    i = state[t], n = options[t], i.isVisible && (n.maskObjects || !s.objectsOnly && n.maskContents) && getMasks(t).each(function() {
     sizeMask.call(this), this.style.zIndex = i.isSliding ? a.pane_sliding + 1 : a.pane_normal + 1, 
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
   var t, n, i, o, r, a = $Ps[e], s = state[e], l = options[e], c = options.zIndexes, u = $([]);
   if (!l.maskContents && !l.maskObjects) return u;
   for (r = 0; r < (l.maskObjects ? 2 : 1); r++) t = l.maskObjects && 0 == r, n = document.createElement(t ? "iframe" : "div"), 
   i = $(n).data("layoutMask", e), n.className = "ui-layout-mask ui-layout-mask-" + e, 
   o = n.style, o.display = "block", o.position = "absolute", o.background = "#FFF", 
   t && (n.frameborder = 0, n.src = "about:blank", o.opacity = 0, o.filter = "Alpha(Opacity='0')", 
   o.border = 0), "IFRAME" == s.tagName ? (o.zIndex = c.pane_normal + 1, $N.append(n)) : (i.addClass("ui-layout-mask-inside-pane"), 
   o.zIndex = l.maskZindex || c.content_mask, o.top = 0, o.left = 0, o.width = "100%", 
   o.height = "100%", a.append(n)), u = u.add(n), $Ms = $Ms.add(n);
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
    var o = evtPane.call(this, e), r = $Ps[o], a = $Cs[o], s = $Rs[o], l = $Ts[o];
    r && $.isEmptyObject(r.data()) && (r = !1), a && $.isEmptyObject(a.data()) && (a = !1), 
    s && $.isEmptyObject(s.data()) && (s = !1), l && $.isEmptyObject(l.data()) && (l = !1), 
    r && r.stop(!0, !0);
    var c = options[o], u = state[o], d = "layout", p = "layoutCSS", f = children[o], h = $.isPlainObject(f) && !$.isEmptyObject(f), m = void 0 !== i ? i : c.destroyChildren;
    if (h && m && ($.each(f, function(e, t) {
     t.destroyed || t.destroy(!0), t.destroyed && delete f[e];
    }), $.isEmptyObject(f) && (f = children[o] = null, h = !1)), r && t && !h) r.remove(); else if (r && r[0]) {
     var g = c.paneClass, v = g + "-" + o, b = "-open", y = "-sliding", x = "-closed", w = [ g, g + b, g + x, g + y, v, v + b, v + x, v + y ];
     $.merge(w, getHoverClasses(r, !0)), r.removeClass(w.join(" ")).removeData("parentLayout").removeData("layoutPane").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." + sID), 
     h && a ? (a.width(a.width()), $.each(f, function(e, t) {
      t.resizeAll();
     })) : a && a.css(a.data(p)).removeData(p).removeData("layoutRole"), r.data(d) || r.css(r.data(p)).removeData(p);
    }
    l && l.remove(), s && s.remove(), Instance[o] = $Ps[o] = $Cs[o] = $Rs[o] = $Ts[o] = !1, 
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
    var n = evtPane.call(this, e), i = options[n], o = state[n], r = $Ps[n], a = $Rs[n];
    r && !o.isHidden && (state.initialized && !1 === _runCallbacks("onhide_start", n) || (o.isSliding = !1, 
    delete state.panesSliding[n], a && a.hide(), !state.initialized || o.isClosed ? (o.isClosed = !0, 
    o.isHidden = !0, o.isVisible = !1, state.initialized || _hidePane(n), sizeMidPanes("horz" === _c[n].dir ? "" : "center"), 
    (state.initialized || i.triggerEventsOnLoad) && _runCallbacks("onhide_end", n)) : (o.isHiding = !0, 
    close(n, !1, t))));
   }
  }, show = function(e, t, n, i) {
   if (isInitialized()) {
    var o = evtPane.call(this, e), r = (options[o], state[o]), a = $Ps[o];
    $Rs[o], a && r.isHidden && !1 !== _runCallbacks("onshow_start", o) && (r.isShowing = !0, 
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
    state[e].noRoom && (setSizeLimits(e), makePaneFit(e)), i || !state.initialized && !d.triggerEventsOnLoad || (s || _runCallbacks("onclose_end", r), 
    s && _runCallbacks("onshow_end", r), l && _runCallbacks("onhide_end", r));
   }
   var r = evtPane.call(this, e);
   if (!state.initialized && $Ps[r]) return _closePane(r, !0), void 0;
   if (isInitialized()) {
    var a, s, l, c, u = $Ps[r], d = ($Rs[r], $Ts[r], options[r]), p = state[r];
    _c[r], $N.queue(function(e) {
     if (!u || !d.closable && !p.isShowing && !p.isHiding || !t && p.isClosed && !p.isShowing) return e();
     var i = !p.isShowing && !1 === _runCallbacks("onclose_start", r);
     return s = p.isShowing, l = p.isHiding, c = p.isSliding, delete p.isShowing, delete p.isHiding, 
     i ? e() : (a = !n && !p.isClosed && "none" != d.fxName_close, p.isMoving = !0, p.isClosed = !0, 
     p.isVisible = !1, l ? p.isHidden = !0 : s && (p.isHidden = !1), p.isSliding ? bindStopSlidingEvents(r, !1) : sizeMidPanes("horz" === _c[r].dir ? "" : "center", !1), 
     setAsClosed(r), a ? (lockPaneForFX(r, !0), u.hide(d.fxName_close, d.fxSettings_close, d.fxSpeed_close, function() {
      lockPaneForFX(r, !1), p.isClosed && o(), e();
     })) : (_hidePane(r), o(), e()), void 0);
    });
   }
  }, setAsClosed = function(e) {
   if ($Rs[e]) {
    var t = ($Ps[e], $Rs[e]), n = $Ts[e], i = options[e], o = (state[e], _c[e].side), r = i.resizerClass, a = i.togglerClass, s = "-" + e, l = "-open", c = "-sliding", u = "-closed";
    t.css(o, sC.inset[o]).removeClass(r + l + " " + r + s + l).removeClass(r + c + " " + r + s + c).addClass(r + u + " " + r + s + u), 
    i.resizable && $.layout.plugins.draggable && t.draggable("disable").removeClass("ui-state-disabled").css("cursor", "default").attr("title", ""), 
    n && (n.removeClass(a + l + " " + a + s + l).addClass(a + u + " " + a + s + u).attr("title", i.tips.Open), 
    n.children(".content-open").hide(), n.children(".content-closed").css("display", "block")), 
    syncPinBtns(e, !1), state.initialized && sizeHandles();
   }
  }, open = function(e, t, n, i) {
   function o() {
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
     !i && c.tips.noRoomToOpen && alert(c.tips.noRoomToOpen), e()) : (t ? bindStopSlidingEvents(s, !0) : u.isSliding ? bindStopSlidingEvents(s, !1) : c.slidable && bindStartSlidingEvents(s, !1), 
     u.noRoom = !1, makePaneFit(s), a = u.isShowing, delete u.isShowing, r = !n && u.isClosed && "none" != c.fxName_open, 
     u.isMoving = !0, u.isVisible = !0, u.isClosed = !1, a && (u.isHidden = !1), r ? (lockPaneForFX(s, !0), 
     l.show(c.fxName_open, c.fxSettings_open, c.fxSpeed_open, function() {
      lockPaneForFX(s, !1), u.isVisible && o(), e();
     })) : (_showPane(s), o(), e()), void 0));
    });
   }
  }, setAsOpen = function(e, t) {
   var n = $Ps[e], i = $Rs[e], o = $Ts[e], r = options[e], a = state[e], s = _c[e].side, l = r.resizerClass, c = r.togglerClass, u = "-" + e, d = "-open", p = "-closed", f = "-sliding";
   i.css(s, sC.inset[s] + getPaneSize(e)).removeClass(l + p + " " + l + u + p).addClass(l + d + " " + l + u + d), 
   a.isSliding ? i.addClass(l + f + " " + l + u + f) : i.removeClass(l + f + " " + l + u + f), 
   removeHover(0, i), r.resizable && $.layout.plugins.draggable ? i.draggable("enable").css("cursor", r.resizerCursor).attr("title", r.tips.Resize) : a.isSliding || i.css("cursor", "default"), 
   o && (o.removeClass(c + p + " " + c + u + p).addClass(c + d + " " + c + u + d).attr("title", r.tips.Close), 
   removeHover(0, o), o.children(".content-closed").hide(), o.children(".content-open").css("display", "block")), 
   syncPinBtns(e, !a.isSliding), $.extend(a, elDims(n)), state.initialized && (sizeHandles(), 
   sizeContent(e, !0)), !t && (state.initialized || r.triggerEventsOnLoad) && n.is(":visible") && (_runCallbacks("onopen_end", e), 
   a.isShowing && _runCallbacks("onshow_end", e), state.initialized && _runCallbacks("onresize_end", e));
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
    var n = evtObj(e), i = evtPane.call(this, e), o = options[i], r = state[i], a = r.isMoving ? 1e3 : 300;
    if (!r.isClosed && !r.isResizing) if ("click" === o.slideTrigger_close) t(); else {
     if (o.preventQuickSlideClose && r.isMoving) return;
     if (o.preventPrematureSlideClose && n && $.layout.isMouseOverElem(n, $Ps[i])) return;
     n ? timer.set(i + "_closeSlider", t, max(o.slideDelay_close, a)) : t();
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
   var i = options[e], o = state[e], r = (_c[e], options.zIndexes), a = i.slideTrigger_close.toLowerCase(), s = t ? "bind" : "unbind", l = $Ps[e], c = $Rs[e];
   timer.clear(e + "_closeSlider"), t ? (o.isSliding = !0, state.panesSliding[e] = !0, 
   bindStartSlidingEvents(e, !1)) : (o.isSliding = !1, delete state.panesSliding[e]), 
   l.css("zIndex", t ? r.pane_sliding : r.pane_normal), c.css("zIndex", t ? r.pane_sliding + 2 : r.resizer_normal), 
   a.match(/(click|mouseleave)/) || (a = i.slideTrigger_close = "mouseleave"), c[s](a, slideClose), 
   "mouseleave" === a && (l[s]("mouseleave." + sID, slideClose), c[s]("mouseenter." + sID, n), 
   l[s]("mouseenter." + sID, n)), t ? "click" !== a || i.resizable || (c.css("cursor", t ? i.sliderCursor : "default"), 
   c.attr("title", t ? i.tips.Close : "")) : timer.clear(e + "_closeSlider");
  }, makePaneFit = function(e, t, n, i) {
   var o = options[e], r = state[e], a = _c[e], s = $Ps[e], l = $Rs[e], c = "vert" === a.dir, u = !1;
   if (("center" === e || c && r.noVerticalRoom) && (u = r.maxHeight >= 0, u && r.noRoom ? (_showPane(e), 
   l && l.show(), r.isVisible = !0, r.noRoom = !1, c && (r.noVerticalRoom = !1), _fixIframe(e)) : u || r.noRoom || (_hidePane(e), 
   l && l.hide(), r.isVisible = !1, r.noRoom = !0)), "center" === e) ; else if (r.minSize <= r.maxSize) {
    if (u = !0, r.size > r.maxSize) sizePane(e, r.maxSize, n, !0, i); else if (r.size < r.minSize) sizePane(e, r.minSize, n, !0, i); else if (l && r.isVisible && s.is(":visible")) {
     var d = r.size + sC.inset[a.side];
     $.layout.cssNum(l, a.side) != d && l.css(a.side, d);
    }
    r.noRoom && (r.wasOpen && o.closable ? o.autoReopen ? open(e, !1, !0, !0) : r.noRoom = !1 : show(e, r.wasOpen, !0, !0));
   } else r.noRoom || (r.noRoom = !0, r.wasOpen = !r.isClosed && !r.isSliding, r.isClosed || (o.closable ? close(e, !0, !0) : hide(e, !0)));
  }, manualSizePane = function(e, t, n, i, o) {
   if (isInitialized()) {
    var r = evtPane.call(this, e), a = options[r], s = state[r], l = o || a.livePaneResizing && !s.isResizing;
    s.autoResize = !1, sizePane(r, t, n, i, l);
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
     cssSize: s
    } ], r = i[0], c = {}, g = "Inaccurate size after resizing the " + l + "-pane."; !(r.correct || (c = {
     pane: l,
     count: r.count + 1,
     target: t
    }, c.attempt = r.actual > t ? max(0, r.attempt - (r.actual - t)) : max(0, r.attempt + (t - r.actual)), 
    c.cssSize = cssSize(l, c.attempt), d.css(h, c.cssSize), c.actual = "width" == h ? d.outerWidth() : d.outerHeight(), 
    c.correct = t === c.actual, 1 === i.length && (_log(g, !1, !0), _log(r, !1, !0)), 
    _log(c, !1, !0), i.length > 3)); ) i.push(c), r = i[i.length - 1];
    u.size = t, $.extend(u, elDims(d)), u.isVisible && d.is(":visible") && (p && p.css(f, t + sC.inset[f]), 
    sizeContent(l)), !n && !m && state.initialized && u.isVisible && _runCallbacks("onresize_end", l), 
    n || (u.isSliding || sizeMidPanes("horz" == _c[l].dir ? "" : "center", m, o), sizeHandles());
    var v = _c.oppositeEdge[l];
    a > t && state[v].noRoom && (setSizeLimits(v), makePaneFit(v, !1, n)), i.length > 1 && _log(g + "\nSee the Error Console for details.", !0, !0);
   }
   if (isInitialized()) {
    var a, s, l = evtPane.call(this, e), c = options[l], u = state[l], d = $Ps[l], p = $Rs[l], f = _c[l].side, h = _c[l].sizeType.toLowerCase(), m = u.isResizing && !c.triggerEventsDuringLiveResize, g = i !== !0 && c.animatePaneSizing;
    $N.queue(function(e) {
     if (setSizeLimits(l), a = u.size, t = _parseSize(l, t), t = max(t, _parseSize(l, c.minSize)), 
     t = min(t, u.maxSize), t < u.minSize) return e(), makePaneFit(l, !1, n), void 0;
     if (!o && t === a) return e();
     if (u.newSize = t, !n && state.initialized && u.isVisible && _runCallbacks("onresize_start", l), 
     s = cssSize(l, t), g && d.is(":visible")) {
      var i = $.layout.effects.size[l] || $.layout.effects.size.all, p = c.fxSettings_size.easing || i.easing, f = options.zIndexes, m = {};
      m[h] = s + "px", u.isMoving = !0, d.css({
       zIndex: f.pane_animate
      }).show().animate(m, c.fxSpeed_size, p, function() {
       d.css({
        zIndex: u.isSliding ? f.pane_sliding : f.pane_normal
       }), u.isMoving = !1, delete u.newSize, r(), e();
      });
     } else d.css(h, s), delete u.newSize, d.is(":visible") ? r() : (u.size = t, $.extend(u, elDims(d))), 
     e();
    });
   }
  }, sizeMidPanes = function(e, t, n) {
   e = (e ? e : "east,west,center").split(","), $.each(e, function(e, i) {
    if ($Ps[i]) {
     var o = options[i], r = state[i], a = $Ps[i], s = ($Rs[i], !0), l = {}, c = $.layout.showInvisibly(a), u = calcNewCenterPaneDims();
     if ($.extend(r, elDims(a)), "center" === i) {
      if (!n && r.isVisible && u.width === r.outerWidth && u.height === r.outerHeight) return a.css(c), 
      !0;
      if ($.extend(r, cssMinDims(i), {
       maxWidth: u.width,
       maxHeight: u.height
      }), l = u, r.newWidth = l.width, r.newHeight = l.height, l.width = cssW(a, l.width), 
      l.height = cssH(a, l.height), s = l.width >= 0 && l.height >= 0, !state.initialized && o.minWidth > u.width) {
       var d = o.minWidth - r.outerWidth, p = options.east.minSize || 0, f = options.west.minSize || 0, h = state.east.size, m = state.west.size, g = h, v = m;
       if (d > 0 && state.east.isVisible && h > p && (g = max(h - p, h - d), d -= h - g), 
       d > 0 && state.west.isVisible && m > f && (v = max(m - f, m - d), d -= m - v), 0 === d) return h && h != p && sizePane("east", g, !0, !0, n), 
       m && m != f && sizePane("west", v, !0, !0, n), sizeMidPanes("center", t, n), a.css(c), 
       void 0;
      }
     } else {
      if (r.isVisible && !r.noVerticalRoom && $.extend(r, elDims(a), cssMinDims(i)), !n && !r.noVerticalRoom && u.height === r.outerHeight) return a.css(c), 
      !0;
      l.top = u.top, l.bottom = u.bottom, r.newSize = u.height, l.height = cssH(a, u.height), 
      r.maxHeight = l.height, s = r.maxHeight >= 0, s || (r.noVerticalRoom = !0);
     }
     if (s ? (!t && state.initialized && _runCallbacks("onresize_start", i), a.css(l), 
     "center" !== i && sizeHandles(i), !r.noRoom || r.isClosed || r.isHidden || makePaneFit(i), 
     r.isVisible && ($.extend(r, elDims(a)), state.initialized && sizeContent(i))) : !r.noRoom && r.isVisible && makePaneFit(i), 
     a.css(c), delete r.newSize, delete r.newWidth, delete r.newHeight, !r.isVisible) return !0;
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
      var e = options[n].contentIgnoreSelector, t = a.nextAll().not(".ui-layout-mask").not(e || ":lt(0)"), o = t.filter(":visible"), r = o.filter(":last");
      c = {
       top: a[0].offsetTop,
       height: a.outerHeight(),
       numFooters: t.length,
       hiddenFooters: t.length - o.length,
       spaceBelow: 0
      }, c.spaceAbove = c.top, c.bottom = c.top + c.height, c.spaceBelow = r.length ? r[0].offsetTop + r.outerHeight() - c.bottom + i(r) : i(a);
     }
     var r = $Ps[n], a = $Cs[n], s = options[n], l = state[n], c = l.content;
     if (!r || !a || !r.is(":visible")) return !0;
     if ((a.length || (initContent(n, !1), a)) && !1 !== _runCallbacks("onsizecontent_start", n)) {
      (!l.isMoving && !l.isResizing || s.liveContentResizing || t || void 0 == c.top) && (o(), 
      c.hiddenFooters > 0 && "hidden" === r.css("overflow") && (r.css("overflow", "visible"), 
      o(), r.css("overflow", "hidden")));
      var u = l.innerHeight - (c.spaceAbove - l.css.paddingTop) - (c.spaceBelow - l.css.paddingBottom);
      a.is(":visible") && c.height == u || (setOuterHeight(a, u, !0), c.height = u), state.initialized && _runCallbacks("onsizecontent_end", n);
     }
    });
   }
  }, sizeHandles = function(e) {
   var t = evtPane.call(this, e);
   t = t ? t.split(",") : _c.borderPanes, $.each(t, function(e, t) {
    var n, i = options[t], o = state[t], r = $Ps[t], a = $Rs[t], s = $Ts[t];
    if (r && a) {
     var l, c, u, d = _c[t].dir, p = o.isClosed ? "_closed" : "_open", f = i["spacing" + p], h = i["togglerAlign" + p], m = i["togglerLength" + p];
     if (0 === f) return a.hide(), void 0;
     if (o.noRoom || o.isHidden || a.show(), "horz" === d ? (l = sC.innerWidth, o.resizerLength = l, 
     c = $.layout.cssNum(r, "left"), a.css({
      width: cssW(a, l),
      height: cssH(a, f),
      left: c > -9999 ? c : sC.inset.left
     })) : (l = r.outerHeight(), o.resizerLength = l, a.css({
      height: cssH(a, l),
      width: cssW(a, f),
      top: sC.inset.top + getPaneSize("north", !0)
     })), removeHover(i, a), s) {
      if (0 === m || o.isSliding && i.hideTogglerOnSlide) return s.hide(), void 0;
      if (s.show(), !(m > 0) || "100%" === m || m > l) m = l, u = 0; else if (isStr(h)) switch (h) {
      case "top":
      case "left":
       u = 0;
       break;

      case "bottom":
      case "right":
       u = l - m;
       break;

      case "middle":
      case "center":
      default:
       u = round((l - m) / 2);
      } else {
       var g = parseInt(h, 10);
       u = h >= 0 ? g : l - m + g;
      }
      if ("horz" === d) {
       var v = cssW(s, m);
       s.css({
        width: v,
        height: cssH(s, f),
        left: u,
        top: 0
       }), s.children(".content").each(function() {
        n = $(this), n.css("marginLeft", round((v - n.outerWidth()) / 2));
       });
      } else {
       var b = cssH(s, m);
       s.css({
        height: b,
        width: cssW(s, f),
        top: u,
        left: 0
       }), s.children(".content").each(function() {
        n = $(this), n.css("marginTop", round((b - n.outerHeight()) / 2));
       });
      }
      removeHover(0, s);
     }
     state.initialized || !i.initHidden && !o.isHidden || (a.hide(), s && s.hide());
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
     var n, i, o = e.P, r = e.C, a = e.pane, l = _c[t], c = $.extend(!0, {}, state[t]), u = options[t], d = {
      resizerCursor: u.resizerCursor
     };
     $.each("fxName,fxSpeed,fxSettings".split(","), function(e, t) {
      d[t + "_open"] = u[t + "_open"], d[t + "_close"] = u[t + "_close"], d[t + "_size"] = u[t + "_size"];
     }), $Ps[t] = $(o).data({
      layoutPane: Instance[t],
      layoutEdge: t
     }).css(_c.hidden).css(l.cssReq), $Cs[t] = r ? $(r) : !1, options[t] = $.extend(!0, {}, e.options, d), 
     state[t] = $.extend(!0, {}, e.state), n = new RegExp(u.paneClass + "-" + a, "g"), 
     o.className = o.className.replace(n, u.paneClass + "-" + t), initHandles(t), l.dir != _c[a].dir ? (i = s[t] || 0, 
     setSizeLimits(t), i = max(i, state[t].minSize), manualSizePane(t, i, !0, !0)) : $Rs[t].css(l.side, sC.inset[l.side] + (state[t].isVisible ? getPaneSize(t) : 0)), 
     e.state.isVisible && !c.isVisible ? setAsOpen(t, !0) : (setAsClosed(t), bindStartSlidingEvents(t, !0)), 
     e = null;
    }
   }
   if (isInitialized()) {
    var o = evtPane.call(this, e);
    if (state[o].edge = t, state[t].edge = o, !1 === _runCallbacks("onswap_start", o) || !1 === _runCallbacks("onswap_start", t)) return state[o].edge = o, 
    state[t].edge = t, void 0;
    var r = n(o), a = n(t), s = {};
    s[o] = r ? r.state.size : 0, s[t] = a ? a.state.size : 0, $Ps[o] = !1, $Ps[t] = !1, 
    state[o] = {}, state[t] = {}, $Ts[o] && $Ts[o].remove(), $Ts[t] && $Ts[t].remove(), 
    $Rs[o] && $Rs[o].remove(), $Rs[t] && $Rs[t].remove(), $Rs[o] = $Rs[t] = $Ts[o] = $Ts[t] = !1, 
    i(r, t), i(a, o), r = a = s = null, $Ps[o] && $Ps[o].css(_c.visible), $Ps[t] && $Ps[t].css(_c.visible), 
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
   for (var n, i = document.cookie, o = i ? i.split(";") : [], r = 0, a = o.length; a > r; r++) if (n = e.trim(o[r]).split("="), 
   n[0] == t) return decodeURIComponent(n[1]);
   return null;
  },
  write: function(t, n, i) {
   var o = "", r = "", a = !1, s = i || {}, l = s.expires || null, c = e.type(l);
   "date" === c ? r = l : "string" === c && l > 0 && (l = parseInt(l, 10), c = "number"), 
   "number" === c && (r = new Date(), l > 0 ? r.setDate(r.getDate() + l) : (r.setFullYear(1970), 
   a = !0)), r && (o += ";expires=" + r.toUTCString()), s.path && (o += ";path=" + s.path), 
   s.domain && (o += ";domain=" + s.domain), s.secure && (o += ";secure"), document.cookie = t + "=" + (a ? "" : encodeURIComponent(n)) + o;
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
   var o = t.options, r = o.stateManagement, a = e.extend(!0, {}, r.cookie, i || null), s = t.state.stateData = t.readState(n || r.stateKeys);
   return e.ui.cookie.write(a.name || o.name || "Layout", e.layout.state.encodeJSON(s), a), 
   e.extend(!0, {}, s);
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
   var i, o, r, a, s, l, c, u = t.options.stateManagement, d = n.includeChildren, p = void 0 !== d ? d : u.includeChildren, f = n.stateKeys || u.stateKeys, h = {
    isClosed: "initClosed",
    isHidden: "initHidden"
   }, m = t.state, g = e.layout.config.allPanes, v = {};
   e.isArray(f) && (f = f.join(",")), f = f.replace(/__/g, ".").split(",");
   for (var b = 0, y = f.length; y > b; b++) i = f[b].split("."), o = i[0], r = i[1], 
   e.inArray(o, g) < 0 || (a = m[o][r], void 0 != a && ("isClosed" == r && m[o].isSliding && (a = !0), 
   (v[o] || (v[o] = {}))[h[r] ? h[r] : r] = a));
   return p && e.each(g, function(n, i) {
    l = t.children[i], s = m.stateData[i], e.isPlainObject(l) && !e.isEmptyObject(l) && (c = v[i] || (v[i] = {}), 
    c.children || (c.children = {}), e.each(l, function(t, n) {
     n.state.initialized ? c.children[t] = e.layout.state.readState(n) : s && s.children && s.children[t] && (c.children[t] = e.extend(!0, {}, s.children[t]));
    }));
   }), v;
  },
  encodeJSON: function(t) {
   function n(t) {
    var i, o, r, a = [], s = 0, l = e.isArray(t);
    for (i in t) o = t[i], r = typeof o, "string" == r ? o = '"' + o + '"' : "object" == r && (o = n(o)), 
    a[s++] = (l ? "" : '"' + i + '":') + o;
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
    } catch (a) {}
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
   e.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function(r, a) {
    e.each(e.layout.config.borderPanes, function(r, s) {
     e("." + i + a + "-" + s).each(function() {
      n = e(this).data("layoutName") || e(this).attr("layoutName"), (void 0 == n || n === o) && t.bindButton(this, a, s);
     });
    });
   });
  },
  get: function(t, n, i, o) {
   var r = e(n), a = t.options, s = a.errors.addButtonError;
   if (r.length) if (e.inArray(i, e.layout.config.borderPanes) < 0) e.layout.msg(s + " " + a.errors.pane + ": " + i, !0), 
   r = e(""); else {
    var l = a[i].buttonClass + "-" + o;
    r.addClass(l + " " + l + "-" + i).data("layoutName", a.name);
   } else e.layout.msg(s + " " + a.errors.selector + ": " + n, !0);
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
    var a = t.state[i];
    r.click(function(n) {
     o.setPinState(t, e(this), i, a.isSliding || a.isClosed), a.isSliding || a.isClosed ? t.open(i) : t.close(i), 
     n.stopPropagation();
    }), o.setPinState(t, r, i, !a.isClosed && !a.isSliding), a.pins.push(n);
   }
   return t;
  },
  setPinState: function(e, t, n, i) {
   var o = t.attr("pin");
   if (!o || i !== ("down" == o)) {
    var r = e.options[n], a = r.buttonClass + "-pin", s = a + "-" + n, l = a + "-up " + s + "-up", c = a + "-down " + s + "-down";
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
   var n, i, o, r = window, a = screen, s = document, l = s.documentElement || s.body, c = e.layout.browser, u = c.version;
   return c.msie && u > 8 || !c.msie ? !1 : a.deviceXDPI && a.systemXDPI ? t(a.deviceXDPI, a.systemXDPI) : c.webkit && (n = s.body.getBoundingClientRect) ? t(n.left - n.right, s.body.offsetWidth) : c.webkit && (i = r.outerWidth) ? t(i, r.innerWidth) : (i = a.width) && (o = l.clientWidth) ? t(i, o) : !1;
  }
 }, e.layout.onReady.push(e.layout.browserZoom._init);
}(jQuery), define("uilayout", function() {}), function() {
 function e() {}
 function t(e) {
  this.buttonBar = d.getElementById("wmd-button-bar" + e), this.preview = d.getElementById("wmd-preview" + e), 
  this.input = d.getElementById("wmd-input" + e);
 }
 function n(e, t) {
  var n, o, r, a = this, s = [], c = 0, u = "none", d = function(e, t) {
   u != e && (u = e, t || f()), m.isIE && "moving" == u ? r = null : o = setTimeout(p, 1);
  }, p = function(e) {
   r = new i(t, e), o = void 0;
  };
  this.setCommandMode = function() {
   u = "command", f(), o = setTimeout(p, 0);
  }, this.canUndo = function() {
   return c > 1;
  }, this.canRedo = function() {
   return s[c + 1] ? !0 : !1;
  }, this.undo = function() {
   a.canUndo() && (n ? (n.restore(), n = null) : (s[c] = new i(t), s[--c].restore(), 
   e && e())), u = "none", t.input.focus(), p();
  }, this.redo = function() {
   a.canRedo() && (s[++c].restore(), e && e()), u = "none", t.input.focus(), p();
  };
  var f = function() {
   var o = r || new i(t);
   return o ? "moving" == u ? (n || (n = o), void 0) : (n && (s[c - 1].text != n.text && (s[c++] = n), 
   n = null), s[c++] = o, s[c + 1] = null, e && e(), void 0) : !1;
  }, h = function(e) {
   if (!e.ctrlKey && !e.metaKey) {
    var t = e.keyCode;
    t >= 33 && 40 >= t || t >= 63232 && 63235 >= t ? d("moving") : 8 == t || 46 == t || 127 == t ? d("deleting") : 13 == t ? d("newlines") : 27 == t ? d("escape") : (16 > t || t > 20) && 91 != t && d("typing");
   }
  }, g = function() {
   l.addEvent(t.input, "keypress", function(e) {
    !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault();
   });
   var e = function() {
    (m.isIE || r && r.text != t.input.value) && void 0 == o && (u = "paste", f(), p());
   };
   l.addEvent(t.input, "keydown", h), l.addEvent(t.input, "mousedown", function() {
    d("moving");
   }), t.input.onpaste = e, t.input.ondrop = e;
  }, v = function() {
   g(), p(!0);
  };
  this.reinit = function(e, t, i, a) {
   s = [], c = 0, u = "none", n = void 0, o = void 0, p(), r.text = e, r.start = t, 
   r.end = i, r.scrollTop = a, r.setInputAreaSelection(), f();
  }, this.setMode = d, v();
 }
 function i(t, n) {
  var i = this, o = t.input;
  this.init = function() {
   l.isVisible(o) && (n || !d.activeElement || d.activeElement === o) && (this.setInputAreaSelectionStartEnd(), 
   this.scrollTop = o.scrollTop, (!this.text && o.selectionStart || 0 === o.selectionStart) && (this.text = o.value));
  }, this.setInputAreaSelection = function() {
   if (l.isVisible(o)) if (void 0 === o.selectionStart || m.isOpera) {
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
     var e = t.ieCachedRange || d.selection.createRange(), n = l.fixEolChars(e.text), r = "", a = r + n + r;
     e.text = a;
     var s = l.fixEolChars(o.value);
     e.moveStart("character", -a.length), e.text = n, i.start = s.indexOf(r), i.end = s.lastIndexOf(r) - r.length;
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
  var o, r, a, s = 3e3, u = "delayed", p = function(e, t) {
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
     var i = new Date().getTime();
     n = e.makeHtml(n);
     var o = new Date().getTime();
     r = o - i, S(n);
    }
   }
  };
  void 0 !== i && (h = i(h));
  var g = function() {
   if (o && (clearTimeout(o), o = void 0), "manual" !== u) {
    var e = 0;
    "delayed" === u && (e = r), e > s && (e = s), o = setTimeout(h, e);
   }
  }, v = function(e) {
   return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight);
  }, b = function() {
   t.preview && (t.preview.scrollTop = (t.preview.scrollHeight - t.preview.clientHeight) * v(t.preview));
  };
  this.refresh = function(e) {
   e ? (a = "", h()) : g();
  }, this.processingTime = function() {
   return r;
  };
  var y, x = !0, w = function(e) {
   var n = t.preview, i = n.parentNode, o = n.nextSibling;
   i.removeChild(n), n.innerHTML = e, o ? i.insertBefore(n, o) : i.appendChild(n);
  }, C = function(e) {
   t.preview.innerHTML = e;
  }, k = function(e) {
   if (y) return y(e);
   try {
    C(e), y = C;
   } catch (t) {
    y = w, y(e);
   }
  }, S = function(e) {
   var i = c.getTop(t.input) - f();
   if (t.preview && (k(e), n()), b(), x) return x = !1, void 0;
   var o = c.getTop(t.input) - f();
   m.isIE ? setTimeout(function() {
    window.scrollBy(0, o - i);
   }, 0) : window.scrollBy(0, o - i);
  }, _ = function() {
   p(t.input, g), t.preview && (t.preview.scrollTop = 0);
  };
  _();
 }
 function r(e, t, n, o, r, a, s) {
  function c(e) {
   v.focus();
   var r = "wmd-link-button" == e.id || "wmd-image-button" == e.id;
   if (e.textOp) {
    n && !r && n.setCommandMode();
    var a = new i(t);
    if (!a) return;
    var s = a.getChunks(), l = function() {
     v.focus(), s && a.setChunks(s), a.restore(), o.refresh();
    }, c = e.textOp(s, l);
    c || (l(), r || v.dispatchEvent(new Event("input")));
   }
   e.execute && e.execute(n);
  }
  function u(e, n) {
   var i = "0px", o = "-20px", r = "-40px", a = e.getElementsByTagName("span")[0];
   n ? (a.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = function() {
    a.style.backgroundPosition = this.XShift + " " + r;
   }, e.onmouseout = function() {
    a.style.backgroundPosition = this.XShift + " " + i;
   }, m.isIE && (e.onmousedown = function() {
    d.activeElement && d.activeElement !== t.input || (t.ieCachedRange = document.selection.createRange(), 
    t.ieCachedScrollTop = t.input.scrollTop);
   }), e.isHelp || (e.onclick = function() {
    return this.onmouseout && this.onmouseout(), c(this), !1;
   }), e.className = e.className.replace(/ disabled/g, "")) : (a.style.backgroundPosition = e.XShift + " " + o, 
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
   var o = 0, r = function(t, n, r, a) {
    var s = document.createElement("li");
    s.className = "wmd-button", s.style.left = o + "px", o += 25;
    var l = document.createElement("span");
    return s.id = t + e, s.appendChild(l), s.title = n, s.XShift = r, a && (s.textOp = a), 
    u(s, !0), i.appendChild(s), s;
   }, l = function(t) {
    var n = document.createElement("li");
    n.className = "wmd-spacer wmd-spacer" + t, n.id = "wmd-spacer" + t + e, i.appendChild(n), 
    o += 25;
   };
   b.bold = r("wmd-bold-button", s("bold"), "0px", p("doBold")), b.italic = r("wmd-italic-button", s("italic"), "-20px", p("doItalic")), 
   l(1), b.link = r("wmd-link-button", s("link"), "-40px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !1);
   })), b.quote = r("wmd-quote-button", s("quote"), "-60px", p("doBlockquote")), b.code = r("wmd-code-button", s("code"), "-80px", p("doCode")), 
   b.image = r("wmd-image-button", s("image"), "-100px", p(function(e, t) {
    return this.doLinkOrImage(e, t, !0);
   })), l(2), b.olist = r("wmd-olist-button", s("olist"), "-120px", p(function(e, t) {
    this.doList(e, t, !0);
   })), b.ulist = r("wmd-ulist-button", s("ulist"), "-140px", p(function(e, t) {
    this.doList(e, t, !1);
   })), b.heading = r("wmd-heading-button", s("heading"), "-160px", p("doHeading")), 
   b.hr = r("wmd-hr-button", s("hr"), "-180px", p("doHorizontalRule")), l(3), b.undo = r("wmd-undo-button", s("undo"), "-200px", null), 
   b.undo.execute = function(e) {
    e && e.undo();
   };
   var c = /win/.test(f.platform.toLowerCase()) ? s("redo") : s("redomac");
   if (b.redo = r("wmd-redo-button", c, "-220px", null), b.redo.execute = function(e) {
    e && e.redo();
   }, a) {
    var d = document.createElement("li"), h = document.createElement("span");
    d.appendChild(h), d.className = "wmd-button wmd-help-button", d.id = "wmd-help-button" + e, 
    d.XShift = "-240px", d.isHelp = !0, d.style.right = "0px", d.title = s("help"), 
    d.onclick = a.handler, u(d, !0), i.appendChild(d), b.help = d;
   }
   g();
  }
  function g() {
   n && (u(b.undo, n.canUndo()), u(b.redo, n.canRedo()));
  }
  var v = t.input, b = {};
  h();
  var y = "keydown";
  m.isOpera && (y = "keypress"), l.addEvent(v, y, function(e) {
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
  }), m.isIE && l.addEvent(v, "keydown", function(e) {
   var t = e.keyCode;
   return 27 === t ? !1 : void 0;
  }), this.setUndoRedoButtonStates = g, this.buttons = b, this.setButtonState = u;
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
 }, m = {
  isIE: /msie/.test(f.userAgent.toLowerCase()),
  isIE_5or6: /msie 6/.test(f.userAgent.toLowerCase()) || /msie 5/.test(f.userAgent.toLowerCase()),
  isOpera: /opera/.test(f.userAgent.toLowerCase())
 }, g = {
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
 Markdown.Editor = function(e, i, s) {
  s = s || {}, "function" == typeof s.handler && (s = {
   helpButton: s
  }), s.strings = s.strings || {}, s.helpButton && (s.strings.help = s.strings.help || s.helpButton.title);
  var l = function(e) {
   return s.strings[e] || g[e];
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
    var m, g = new a(c, l), v = new o(e, u, function() {
     c.onPreviewRefresh();
    }, h);
    /\?noundo/.test(d.location.href) || (p = new n(function() {
     v.refresh(), m && m.setUndoRedoButtonStates();
    }, u), this.textOperation = function(e) {
     p.setCommandMode(), e(), f.refreshPreview();
    }), m = new r(i, u, p, v, g, s.helpButton, l), m.setUndoRedoButtonStates(), f.refreshPreview = function() {
     v.refresh(!0);
    }, f.undoManager = p, f.uiManager = m;
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
  m.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
  var n = c.getPageSize();
  return t.height = n[1] + "px", m.isIE ? (t.left = d.documentElement.scrollLeft, 
  t.width = d.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), d.body.appendChild(e), 
  e;
 }, u.prompt = function(e, t, n) {
  var i, o;
  void 0 === t && (t = "");
  var r = function(e) {
   var t = e.charCode || e.keyCode;
   27 === t && a(!0);
  }, a = function(e) {
   l.removeEvent(d.body, "keydown", r);
   var t = o.value;
   return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), 
   i.parentNode.removeChild(i), n(t), !1;
  }, s = function() {
   i = d.createElement("div"), i.className = "wmd-prompt-dialog", i.style.padding = "10px;", 
   i.style.position = "fixed", i.style.width = "400px", i.style.zIndex = "1001";
   var n = d.createElement("div");
   n.innerHTML = e, n.style.padding = "5px", i.appendChild(n);
   var s = d.createElement("form"), u = s.style;
   s.onsubmit = function() {
    return a(!1);
   }, u.padding = "0", u.margin = "0", u.cssFloat = "left", u.width = "100%", u.textAlign = "center", 
   u.position = "relative", i.appendChild(s), o = d.createElement("input"), o.type = "text", 
   o.value = t, u = o.style, u.display = "block", u.width = "80%", u.marginLeft = u.marginRight = "auto", 
   s.appendChild(o);
   var p = d.createElement("input");
   p.type = "button", p.onclick = function() {
    return a(!1);
   }, p.value = "OK", u = p.style, u.margin = "10px", u.display = "inline", u.width = "7em";
   var f = d.createElement("input");
   f.type = "button", f.onclick = function() {
    return a(!0);
   }, f.value = "Cancel", u = f.style, u.margin = "10px", u.display = "inline", u.width = "7em", 
   s.appendChild(p), s.appendChild(f), l.addEvent(d.body, "keydown", r), i.style.top = "50%", 
   i.style.left = "50%", i.style.display = "block", m.isIE_5or6 && (i.style.position = "absolute", 
   i.style.top = d.documentElement.scrollTop + 200 + "px", i.style.left = "50%"), d.body.appendChild(i), 
   i.style.marginTop = -(c.getHeight(i) / 2) + "px", i.style.marginLeft = -(c.getWidth(i) / 2) + "px";
  };
  setTimeout(function() {
   s();
   var e = t.length;
   if (void 0 !== o.selectionStart) o.selectionStart = 0, o.selectionEnd = e; else if (o.createTextRange) {
    var n = o.createTextRange();
    n.collapse(!1), n.moveStart("character", -e), n.moveEnd("character", e), n.select();
   }
   o.focus();
  }, 0);
 };
 var y = a.prototype;
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
  var o = /(\**$)/.exec(e.before)[0], r = /(^\**)/.exec(e.after)[0], a = Math.min(o.length, r.length);
  if (a >= n && (2 != a || 1 != n)) e.before = e.before.replace(p("[*]{" + n + "}$", ""), ""), 
  e.after = e.after.replace(p("^[*]{" + n + "}", ""), ""); else if (!e.selection && r) {
   e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
   var s = p.$1;
   e.before = e.before + r + s;
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
  var o = "", r = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, a = function(e) {
   n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), o += "\n" + e;
  }, s = function(e, t, o, l, c, u) {
   return o = o.replace(r, s), i[c] ? (a(i[c]), t + o + l + n + u) : e;
  };
  e.before = e.before.replace(r, s), t ? a(t) : e.selection = e.selection.replace(r, s);
  var l = n;
  return e.after = e.after.replace(r, s), e.after && (e.after = e.after.replace(/\n*$/, "")), 
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
     var a = " [999]: " + s(r), l = o.addLinkDef(e, a);
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
   for (var o = e.before.replace(/\n$/, "").split("\n"), r = !1, a = 0; a < o.length; a++) {
    var s = !1;
    t = o[a], r = r && t.length > 0, /^>/.test(t) ? (s = !0, !r && t.length > 1 && (r = !0)) : s = /^[ \t]*$/.test(t) ? !0 : r, 
    s ? n += t + "\n" : (i += n + t, n = "\n");
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
  var i = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, o = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, r = "-", a = 1, s = function() {
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
   e.skipLines(), c && (e.after = e.after.replace(o, l)), n == c) return;
  }
  var u = 1;
  e.before = e.before.replace(i, function(e) {
   return /^\s*([*+-])/.test(e) && (r = p.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, 
   l(e);
  }), e.selection || (e.selection = this.getString("litem"));
  var d = s(), f = 1;
  e.after = e.after.replace(o, function(e) {
   return f = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e);
  }), e.trimWhitespace(!0), e.skipLines(u, f, !0), e.startTag = d;
  var m = d.replace(/./g, " ");
  this.wrap(e, h.lineLength - m.length), e.selection = e.selection.replace(/\n/g, "\n" + m);
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
}(), define("libs/Markdown.Editor", function() {}), define("core", [ "jquery", "underscore", "crel", "utils", "settings", "eventMgr", "mousetrap", "text!html/bodyIndex.html", "text!html/bodyViewer.html", "text!html/settingsTemplateTooltip.html", "text!html/settingsUserCustomExtensionTooltip.html", "storage", "config", "uilayout", "libs/Markdown.Editor" ], function(e, t, n, i, o, r, a, s, l, c, u) {
 function d() {
  k = !0, S = !0;
  var e = i.currentTime;
  e > T + 1e3 && (T = e, r.onUserActive());
 }
 function p() {
  return S === !0 && i.currentTime - T > USER_IDLE_THRESHOLD && (S = !1), S && _;
 }
 function f() {
  if (k !== !1 && _ !== !1) {
   void 0 === E && (E = i.randomString(), localStorage.frontWindowId = E);
   var t = localStorage.frontWindowId;
   t != E && (_ = !1, void 0 !== C && clearInterval(C), e(".modal").modal("hide"), 
   e(".modal-non-unique").modal({
    backdrop: "static",
    keyboard: !1
   }));
  }
 }
 function h() {
  N === !0 && (N = !1, r.onOfflineChanged(!1));
 }
 function m() {
  N === !0 && navigator.onLine === !0 && I + CHECK_ONLINE_PERIOD < i.currentTime && (I = i.currentTime, 
  e.ajax({
   url: "//www.google.com/jsapi",
   timeout: AJAX_TIMEOUT,
   dataType: "script"
  }).done(function() {
   h();
  }));
 }
 function g() {
  i.setInputRadio("radio-layout-orientation", o.layoutOrientation), i.setInputValue(P, theme), 
  P.change(), i.setInputChecked("#input-settings-lazy-rendering", o.lazyRendering), 
  i.setInputValue("#input-settings-editor-font-family", o.editorFontFamily), i.setInputValue("#input-settings-editor-font-size", o.editorFontSize), 
  i.setInputValue("#textarea-settings-default-content", o.defaultContent), i.setInputValue("#input-settings-publish-commit-msg", o.commitMsg), 
  i.setInputValue("#textarea-settings-publish-template", o.template), i.setInputValue("#input-settings-ssh-proxy", o.sshProxy), 
  r.onLoadSettings();
 }
 function v(t) {
  var n = {};
  n.layoutOrientation = i.getInputRadio("radio-layout-orientation");
  var a = i.getInputValue(P);
  n.lazyRendering = i.getInputChecked("#input-settings-lazy-rendering"), n.editorFontFamily = i.getInputTextValue("#input-settings-editor-font-family", t), 
  n.editorFontSize = i.getInputIntValue("#input-settings-editor-font-size", t, 1, 99), 
  n.defaultContent = i.getInputValue("#textarea-settings-default-content"), n.commitMsg = i.getInputTextValue("#input-settings-publish-commit-msg", t), 
  n.template = i.getInputTextValue("#textarea-settings-publish-template", t), n.sshProxy = i.checkUrl(i.getInputTextValue("#input-settings-ssh-proxy", t), !0), 
  n.extensionSettings = {}, r.onSaveSettings(n.extensionSettings, t), t.isPropagationStopped() || (e.extend(o, n), 
  localStorage.settings = JSON.stringify(o), localStorage.theme = a);
 }
 function b(e) {
  e === !0 || A.state.north.isClosed ? (M.hide(), L.hide()) : (M.show(), L.show());
 }
 function y(e) {
  e === !0 || A.state.east.isClosed ? $.hide() : $.show();
 }
 function x() {
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
  A = e("body").layout(e.extend(t, {
   east__resizable: !0,
   east__size: .5,
   east__minSize: 250
  }))) : "vertical" == o.layoutOrientation && (e(".ui-layout-east").remove(), e(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>'), 
  A = e("body").layout(e.extend(t, {
   south__resizable: !0,
   south__size: .5,
   south__minSize: 200
  }))), e(".navbar").click(function() {
   A.allowOverflow("north");
  }), e(".ui-layout-toggler-south").addClass("btn btn-info").html('<i class="icon-none"></i>'), 
  e(".ui-layout-toggler-east").addClass("btn btn-info").html('<i class="icon-none"></i>');
  var n = e(".ui-layout-toggler-north").addClass("btn btn-info").html('<i class="icon-none"></i>');
  $ = e('<div class="extension-preview-buttons">'), "horizontal" == o.layoutOrientation ? (e(".ui-layout-resizer-north").append($), 
  e(".ui-layout-resizer-east").append(n)) : e(".ui-layout-resizer-south").append($).append(n), 
  b(), y(), r.onLayoutCreated(A);
 }
 var w = {}, C = void 0, k = !1, S = !1, _ = !0, T = 0, E = void 0, N = !1, I = i.currentTime;
 w.setOffline = function() {
  I = i.currentTime, N === !1 && (N = !0, r.onOfflineChanged(!0));
 };
 var P = void 0, A = void 0, M = void 0, L = void 0, $ = void 0, z = void 0, R = void 0, j = void 0, D = void 0;
 w.initEditor = function(n) {
  function a() {
   var e = D.val();
   void 0 !== j && j != e && (R.content = e, r.onContentChanged(R)), j = e;
  }
  void 0 !== R && r.onFileClosed(R), R = n, j = void 0;
  var s = R.content;
  if (D.val(s), void 0 !== z) return z.undoManager.reinit(s, R.editorStart, R.editorEnd, R.editorScrollTop), 
  r.onFileOpen(R), z.refreshPreview(), void 0;
  var l = e(".preview-container");
  D.scroll(function() {
   void 0 !== j && (R.editorScrollTop = e(this).scrollTop());
  }), D.bind("keyup mouseup", function() {
   void 0 !== j && (R.editorStart = this.selectionStart, R.editorEnd = this.selectionEnd);
  }), l.scroll(function() {
   void 0 !== j && (R.previewScrollTop = e(this).scrollTop());
  });
  var c = new Markdown.Converter();
  c.hooks.chain("preConversion", function(e) {
   r.previewStartTime = new Date();
   var t = e + "\n\n", n = [], i = 0;
   return t.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(e, o, r) {
    return o && (n.push(t.substring(i, r)), i = r), "";
   }), n.push(t.substring(i, e.length)), r.onSectionsCreated(n), e;
  }), z = new Markdown.Editor(c), z.hooks.set("insertLinkDialog", function(t) {
   return w.insertLinkCallback = t, i.resetModalInputs(), e(".modal-insert-link").modal(), 
   !0;
  }), z.hooks.set("insertImageDialog", function(t) {
   return w.insertLinkCallback = t, w.catchModal ? !0 : (i.resetModalInputs(), e(".modal-insert-image").modal(), 
   !0);
  });
  var u;
  u = o.lazyRendering === !0 ? function(e) {
   var n = t.debounce(e, 500);
   return function() {
    void 0 === j ? (e(), D.scrollTop(R.editorScrollTop), l.scrollTop(R.previewScrollTop)) : n(), 
    a();
   };
  } : function(e) {
   return function() {
    e(), void 0 === j && l.scrollTop(R.previewScrollTop), a();
   };
  }, r.onEditorConfigure(z), z.hooks.chain("onPreviewRefresh", r.onAsyncPreview), 
  z.run(u), z.undoManager.reinit(s, R.editorStart, R.editorEnd, R.editorScrollTop), 
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
  r.onFileOpen(R);
 };
 var O = !1;
 w.lockUI = function(t) {
  O = t, D.prop("disabled", O), e(".navbar-inner .btn").toggleClass("blocked", O), 
  O ? e(".lock-ui").removeClass("hide") : e(".lock-ui").addClass("hide");
 };
 var F = !1, q = !1;
 return w.onReady = function() {
  document.body.innerHTML = viewerMode === !0 ? l : s, e(window).on("offline", w.setOffline), 
  e(window).on("online", h), navigator.onLine === !1 && w.setOffline(), e(document).mousemove(d).keypress(d), 
  e(".dropdown-submenu > a").click(function(e) {
   e.stopPropagation();
  }), M = e(".menu-panel").collapse({
   toggle: !1
  });
  var t = void 0;
  M.on("show.bs.collapse", function(e) {
   e.target === M[0] ? (q = !0, t = i.createBackdrop("collapse", ".menu-panel"), M.addClass("move-to-front")) : M.find(".in").collapse("hide");
  }).on("hide.bs.collapse", function(e) {
   e.target === M[0] && (q = !1, t.parentNode.removeChild(t), M.removeClass("move-to-front"));
  }).on("hidden.bs.collapse", function(e) {
   e.target === M[0] && M.find(".in").collapse("hide");
  }), L = e(".document-panel").collapse({
   toggle: !1
  });
  var n = void 0;
  L.on("show.bs.collapse", function(e) {
   e.target === L[0] ? (F = !0, n = i.createBackdrop("collapse", ".document-panel"), 
   L.addClass("move-to-front")) : L.find(".in").collapse("hide");
  }).on("hide.bs.collapse", function(e) {
   e.target === L[0] && (F = !1, n.parentNode.removeChild(n), L.removeClass("move-to-front"));
  }).on("hidden.bs.collapse", function(e) {
   e.target === L[0] && L.find(".in").collapse("hide");
  }), x(), D = e("#wmd-input"), e("#wmd-input, #md-section-helper").css({
   "font-family": o.editorFontFamily,
   "font-size": o.editorFontSize + "px",
   "line-height": Math.round(o.editorFontSize * (20 / 14)) + "px"
  }), D.keydown(function(t) {
   if (9 === t.keyCode) {
    var n = D.val(), i = this.selectionStart, o = this.selectionEnd;
    e(this).val(n.substring(0, i) + "	" + n.substring(o)), this.selectionStart = this.selectionEnd = i + 1, 
    t.preventDefault();
   }
  }), C = window.setInterval(function() {
   i.updateCurrentTime(), f(), (p() === !0 || viewerMode === !0) && (r.onPeriodicRun(), 
   m());
  }, 1e3), r.onReady();
 }, r.addListener("onReady", function() {
  function n(e) {
   if (e = e || "default", l != e) {
    var t = "less!themes/" + e;
    -1 !== baseDir.indexOf("-min") && (t = "css!themes/" + e), requirejs.undef(t), require([ t ]), 
    l = e;
   }
  }
  var s = !1;
  e(".modal").on("show.bs.modal", function() {
   M.collapse("hide"), L.collapse("hide"), s = !0;
  }).on("shown.bs.modal", function() {
   t.defer(function(e) {
    e.find("input:enabled:visible:first").focus();
   }, e(this));
  }).on("hidden.bs.modal", function() {
   s = !1, D.focus(), n(localStorage.theme);
  }).keyup(function(t) {
   13 != t.which || e(t.target).is("textarea") || e(this).find(".modal-footer a:last").click();
  }), a.stopCallback = function(t, n) {
   return O || q || F || s || e(n).is("input, select, textarea:not(#wmd-input)");
  }, e(".action-insert-link").click(function(t) {
   var n = i.getInputTextValue(e("#input-insert-link"), t);
   void 0 !== n && (w.insertLinkCallback(n), w.insertLinkCallback = void 0);
  }), e(".action-insert-image").click(function(t) {
   var n = i.getInputTextValue(e("#input-insert-image"), t);
   void 0 !== n && (w.insertLinkCallback(n), w.insertLinkCallback = void 0);
  }), e(".modal-insert-link, .modal-insert-image").on("hidden.bs.modal", function() {
   void 0 !== w.insertLinkCallback && (w.insertLinkCallback(null), w.insertLinkCallback = void 0);
  }), e(".action-load-settings").click(function() {
   g();
  }), e(".action-apply-settings").click(function(e) {
   v(e), e.isPropagationStopped() || window.location.reload();
  });
  var l = theme;
  if (P = e("#input-settings-theme"), P.on("change", function() {
   n(this.value);
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
 }), w;
}), define("text!../WELCOME.md", [], function() {
 return '\nWelcome to StackEdit!	{#welcome}\n=====================\n\n\nHello, I am your first Markdown document within **StackEdit**[^stackedit]. Don\'t delete me, I can be helpful. I can be recovered anyway in the `Utils` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n----------\n\n\nDocuments\n---------\n\n**StackEdit** stores your documents in the browser local storage, which means all your documents are automatically saved locally and are accessible offline.\n\n#### <i class="icon-file"></i> Create a document\n\nYou can create a new document by clicking the <i class="icon-file"></i> button in the navigation bar. This will switch from the current document to the new one.\n\n#### <i class="icon-folder-open"></i> Switch to another document\n\nYou can list all your local documents and switch from one to another by clicking the <i class="icon-folder-open"></i> button in the navigation bar.\n\n#### <i class="icon-pencil"></i> Rename a document\n\nYou can rename the current document by clicking the document title in the navigation bar.\n\n#### <i class="icon-trash"></i> Delete a document\n\nYou can delete the current document by clicking the <i class="icon-trash"></i> button in the navigation bar.\n\n#### <i class="icon-hdd"></i> Save a document\n\nYou can save the current document to a file using the <i class="icon-hdd"></i> `Save as...` sub-menu.\n\n> **NOTE:** See [<i class="icon-share"></i> Publish a document](#publish-a-document) section for a description of the different outputs.\n\n\n----------\n\n\nSynchronization\n---------------\n\n**StackEdit** can be combined with **Google Drive** and **Dropbox** to have your documents centralized in the *Cloud*. The synchronization mechanism will take care of uploading your modifications or downloading the latest version of your documents.\n\n> **NOTE:** Full access to **Google Drive** or **Dropbox** is required to be able to import any document in StackEdit.\nImported documents are downloaded in your browser and are not transmitted to a server.\n\n#### <i class="icon-download"></i> Import a document\n\nYou can import a document from the *Cloud* by going to the <i class="icon-provider-gdrive"></i> `Google Drive` or the <i class="icon-provider-dropbox"></i> `Dropbox` sub-menu and by clicking `Import from...`. Once imported, your document will be automatically synchronized with the **Google Drive** / **Dropbox** file.\n\n#### <i class="icon-upload"></i> Export a document\n\nYou can export any document by going to the <i class="icon-provider-gdrive"></i> `Google Drive` or the <i class="icon-provider-dropbox"></i> `Dropbox` sub-menu and by clicking `Export to...`. Even if your document is already synchronized with **Google Drive** or **Dropbox**, you can export it to a another location. **StackEdit** can synchronize one document with multiple locations.\n\n#### <i class="icon-refresh"></i> Synchronize a document\n\nOnce your document is linked to a **Google Drive** or a **Dropbox** file, **StackEdit** will periodically (every 3 minutes) synchronize it by downloading/uploading any modification. Any conflict will be detected, and a local copy of your document will be created as a backup if necessary.\n\nIf you just have modified your document and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-refresh"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document is not synchronized with any location,\n> - or the document has not been modified since the last synchronization.\n\n#### <i class="icon-refresh"></i> Manage document synchronization\n\nSince one document can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-refresh"></i> `Manage synchronization` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to add or remove synchronization links that are associated to your document.\n\n> **NOTE:** If you delete the file from **Google Drive** or from **Dropbox**, the document will no longer be synchronized with that location.\n\n----------\n\n\nPublication\n-----------\n\nOnce you are happy with your document, you can publish it on different websites directly from **StackEdit**. As for now, **StackEdit** can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any SSH server.\n\n#### <i class="icon-share"></i> Publish a document\n\nYou can publish your document by going to the <i class="icon-share"></i> `Publish on` sub-menu and by choosing a website. In the dialog box, you can choose the publication format:\n\n- Markdown, to publish the Markdown text on a website that can interpret it (**GitHub** for instance),\n- HTML, to publish the document converted into HTML (on a blog for instance),\n- Template, to have a full control of the output.\n\n> **NOTE:** The default template is a simple webpage wrapping your document in HTML format. You can customize it in the `Publish` tab of the <i class="icon-cog"></i> `Settings` dialog.\n\n#### <i class="icon-share"></i> Update a publication\n\nAfter publishing, **StackEdit** will keep your document linked to that publish location so that you can update it easily. Once you have modified your document and you want to update your publication, click on the <i class="icon-share"></i> button in the navigation bar.\n\n> **NOTE:** The <i class="icon-share"></i> button is disabled when:\n> \n> - you are offline,\n> - or the document has not been published anywhere.\n\n#### <i class="icon-share"></i> Manage document publication\n\nSince one document can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-share"></i> `Manage publication` in the <i class="icon-stackedit"></i> menu. This will open a dialog box allowing you to remove publication links that are associated to your document.\n\n> **NOTE:** In some cases, if you remove the file from the website or the post from the blog, the document will no longer be published on that location.\n\n----------\n\n\nMarkdown Extra\n--------------\n\n**StackEdit** supports **Markdown Extra**, which extends **Markdown** syntax with some nice features.\n\n\n### Tables\n\n**Markdown Extra** has a special syntax for tables:\n\nItem      | Value\n--------- | -----\nComputer  | \\$1600\nPhone     | \\$12\nPipe      | \\$1\n\nYou can specify column alignment with one or two colons:\n\n| Item      |  Value | Qty  |\n| :-------- | ------:| :--: |\n| Computer  | \\$1600 |  5   |\n| Phone     |   \\$12 |  12  |\n| Pipe      |    \\$1 | 234  |\n\n\n### Definition Lists\n\n**Markdown Extra** has a special syntax for definition lists too:\n\nTerm 1\nTerm 2\n:   Definition A\n:   Definition B\n\nTerm 3\n\n:   Definition C\n\n:   Definition D\n\n	> part of definition D\n\n\n### Fenced code blocks\n\n**GitHub**\'s fenced code blocks are also supported with **Prettify** syntax highlighting:\n\n```\n// Foo\nvar bar = 0;\n```\n\n> **NOTE:** To use **Highlight.js** instead of **Prettify**, just configure the `Markdown Extra` extension in the <i class="icon-cog"></i> `Settings` dialog.\n\n\n### Special Attributes\n\nWith **Markdown Extra**, you can specify `class` and `id` attributes on headers and fenced code blocks just like this:\n\n##### Header example {#my-header}\n\n``` {#my-id .my-class}\nvar foo = bar;\n```\n\nThen you can create cross-references like this: [beginning of the document](#welcome).\n\n\n### Footnotes\n\nYou can create footnotes like this[^footnote].\n\n  [^footnote]: Here is the *text* of the **footnote**.\n\n\n### Table of contents\n\nYou can insert a table of contents using the marker `[TOC]`:\n\n[TOC]\n\n\n### MathJax\n \nYou can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com][1]:\n\nThe *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall\nn\\in\\mathbb N$ is via through the Euler integral\n\n$$\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\n$$\n\n> **NOTE:** When exporting, make sure you include MathJax to render mathematical expression correctly. Your page/template should include something like: \n\n```\n<script type="text/javascript" src="http://benweet.github.io/stackedit/lib/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n```\n\n> **NOTE:** You can find more information:\n>\n> - about **Markdown** syntax [here][2],\n> - about **Markdown Extra** extension [here][3],\n> - about **Prettify** syntax highlighting [here][4].\n> - about **Highlight.js** syntax highlighting [here][5].\n\n  [^stackedit]: StackEdit is a free, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.\n\n\n  [1]: http://math.stackexchange.com/\n  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"\n  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"\n  [4]: https://code.google.com/p/google-code-prettify/\n  [5]: http://softwaremaniacs.org/soft/highlight/en/';
}), define("fileMgr", [ "jquery", "underscore", "core", "utils", "settings", "eventMgr", "fileSystem", "classes/FileDescriptor", "text!../WELCOME.md" ], function(e, t, n, i, o, r, a, s, l) {
 var c = {};
 return c.currentFile = void 0, c.selectFile = function(i) {
  if (i = i || c.currentFile, void 0 === i) {
   var o = t.size(a);
   i = 0 === o ? c.createFile(WELCOME_DOCUMENT_TITLE, l) : t.max(a, function(e) {
    return e.selectTime || 0;
   });
  }
  c.currentFile !== i && (c.currentFile = i, i.selectTime = new Date().getTime(), 
  r.onFileSelected(i), e(".action-edit-document").toggleClass("hide", i.fileIndex != TEMPORARY_FILE_INDEX)), 
  n.initEditor(i);
 }, c.createFile = function(e, n, l, c) {
  if (n = void 0 !== n ? n : o.defaultContent, !e) {
   e = DEFAULT_FILE_TITLE;
   for (var u = 2; t.some(a, function(t) {
    return t.title == e;
   }); ) e = DEFAULT_FILE_TITLE + u++;
  }
  var d = TEMPORARY_FILE_INDEX;
  if (!c) do d = "file." + i.randomString(); while (t.has(a, d));
  l = l || {};
  var p = t.reduce(l, function(e, t) {
   return i.storeAttributes(t), e + t.syncIndex + ";";
  }, ";");
  localStorage[d + ".title"] = e, localStorage[d + ".content"] = n, localStorage[d + ".sync"] = p, 
  localStorage[d + ".publish"] = ";";
  var f = new s(d, e, l);
  return c || (i.appendIndexToArray("file.list", d), a[d] = f, r.onFileCreated(f)), 
  f;
 }, c.deleteFile = function(e) {
  e = e || c.currentFile, i.removeIndexFromArray("file.list", e.fileIndex), delete a[e.fileIndex], 
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
  function n() {
   a.addClass("hide"), o.removeClass("hide");
   var t = e.trim(a.val()), n = c.currentFile;
   t && t != n.title && (n.title = t, r.onTitleChanged(n)), a.val(n.title), i.focus();
  }
  var i = e("#wmd-input");
  c.selectFile();
  var o = e(".file-title-navbar"), a = e(".input-file-title");
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
    var e = a.removeClass("hide");
    t.defer(function() {
     e.focus().get(0).select();
    });
   }
  }), a.blur(function() {
   n();
  }).keyup(function(e) {
   13 == e.keyCode && n(), 27 == e.keyCode && (a.val(""), n());
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
}), define("classes/AsyncTask", [ "underscore", "utils", "eventMgr", "config" ], function(e, t, n) {
 function i() {
  this.finished = !1, this.timeout = ASYNC_TASK_DEFAULT_TIMEOUT, this.retryCounter = 0, 
  this.runCallbacks = [], this.successCallbacks = [], this.errorCallbacks = [];
 }
 function o() {
  if (d !== !1) {
   if (l === !0) return s + u.timeout < t.currentTime && u.error(new Error("A timeout occurred.")), 
   void 0;
   if (void 0 === u) {
    if (0 === a.length) return;
    u = a.shift(), s = t.currentTime, c === !1 && (c = !0, n.onAsyncRunning(!0));
   }
   s <= t.currentTime && (l = !0, u.chain());
  }
 }
 function r(t, i, r) {
  try {
   e.each(i, function(e) {
    e(r);
   });
  } finally {
   t.finished = !0, u === t && (u = void 0, l = !1), 0 === a.length ? (c = !1, n.onAsyncRunning(!1)) : o();
  }
 }
 var a = [];
 i.prototype.onRun = function(e) {
  this.runCallbacks.push(e);
 }, i.prototype.onSuccess = function(e) {
  this.successCallbacks.push(e);
 }, i.prototype.onError = function(e) {
  this.errorCallbacks.push(e);
 };
 var s = 0;
 i.prototype.chain = function(e) {
  if (s = t.currentTime, t.logStackTrace(), this.finished !== !0) {
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
   s = t.currentTime + i, l = !1, o();
  }
 }, i.prototype.enqueue = function() {
  a.push(this), o();
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
    s(n, t);
   }), void 0);
  });
 }
 function a(e) {
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
 function s(e, i) {
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
    s(n, t);
   }), void 0);
  });
 }
 var c = void 0, u = !1, d = {}, p = !1;
 i.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.upload = function(e, t, n) {
  var i = void 0, l = new o();
  r(l), a(l), l.onRun(function() {
   c.writeFile(e, t, function(t, n) {
    return t ? (400 === t.status && (t = 'Could not upload document into path "' + e + '".'), 
    s(t, l), void 0) : (i = n, l.chain(), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, i);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], i = e || 0, l = new o();
  r(l), a(l), l.onRun(function() {
   function e() {
    c.pullChanges(i, function(t, o) {
     return t ? (s(t, l), void 0) : (i = o.cursor(), void 0 !== o.changes && (n = n.concat(o.changes)), 
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
  r(i), a(i), i.onRun(function() {
   function t() {
    if (0 === e.length) return i.chain(), void 0;
    var o = e[0];
    c.stat(o, function(o, r) {
     return r ? (n.push(r), e.shift(), i.chain(t), void 0) : (s(o, i), void 0);
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
  r(i), a(i), i.onRun(function() {
   function t() {
    if (0 === e.length) return i.chain(), void 0;
    var o = e[0];
    n.push(o);
    var r = void 0;
    return o.isFile === !0 ? r = o : void 0 !== o.wasRemoved && (r = o.stat), r ? (c.readFile(r.path, function(n, o) {
     return o ? (r.content = o, e.shift(), i.chain(t), void 0) : (s(n, i), void 0);
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
 function a(e) {
  return void 0 === e ? void 0 : e.match(/^[^\\<>:"\|?\*]+$/) ? 0 !== e.indexOf("/") ? "/" + e : e : (i.onError('"' + e + '" contains invalid characters.'), 
  void 0);
 }
 function s(e) {
  return "sync." + u + "." + encodeURIComponent(e.toLowerCase());
 }
 function l(e, n, i) {
  var o = {};
  return o.provider = d, o.path = e, o.version = n, o.contentCRC = t.crc32(i), o.syncIndex = s(e), 
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
     var t = s(e), n = o.getFileFromSyncIndex(t);
     return void 0 !== n ? (i.onError('"' + n.title + '" was already imported.'), void 0) : (r.push(e), 
     void 0);
    }), c(r);
   }
  });
 }, d.exportFile = function(e, n, c, u) {
  var d = t.getInputTextValue("#input-sync-export-dropbox-path", e);
  if (d = a(d), void 0 === d) return u(!0), void 0;
  var p = s(d), f = o.getFileFromSyncIndex(p);
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
 }, d.syncUp = function(e, t, n, i, o, a) {
  var s = o.contentCRC;
  return t == s ? (a(void 0, !1), void 0) : (r.upload(o.path, e, function(e, n) {
   return e ? (a(e, !0), void 0) : (o.version = n.versionTag, o.contentCRC = t, a(void 0, !0), 
   void 0);
  }), void 0);
 }, d.syncDown = function(n) {
  var a = localStorage[u + ".lastChangeId"];
  r.checkChanges(a, function(a, l, c) {
   if (a) return n(a), void 0;
   var d = [];
   e.each(l, function(e) {
    var t = s(e.path), n = o.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.wasRemoved === !0 ? (d.push(e), void 0) : (n.version != e.stat.versionTag && d.push(e), 
    void 0)) : void 0;
   }), r.downloadContent(d, function(r, a) {
    return r ? (n(r), void 0) : (e.each(a, function(e) {
     var n = e.syncAttributes, r = n.syncIndex, a = o.getFileFromSyncIndex(r);
     if (void 0 !== a) {
      var s = a.title;
      if (e.wasRemoved === !0) return i.onError('"' + s + '" has been removed from Dropbox.'), 
      a.removeSyncLocation(n), i.onSyncRemoved(a, n), void 0;
      var l = a.content, c = n.contentCRC != t.crc32(l), u = e.stat, d = t.crc32(u.content), p = n.contentCRC != d, f = l != u.content;
      f === !0 && c === !0 && p === !0 && (o.createFile(s + " (backup)", l), i.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      f && p === !0 && (a.content = u.content, i.onContentChanged(a), i.onMessage('"' + s + '" has been updated from Dropbox.'), 
      o.currentFile === a && o.selectFile()), n.version = u.versionTag, n.contentCRC = d, 
      t.storeAttributes(n);
     }
    }), localStorage[u + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, d.publish = function(e, t, n, i) {
  var o = a(e.path);
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
    s(n, t);
   }), void 0);
  });
 }
 function a(e) {
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
 function s(e, n) {
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
    s(n, t);
   }), void 0);
  });
 }
 var c = !1, u = !1, d = {}, p = !1;
 i.addListener("onOfflineChanged", function(e) {
  p = e;
 }), d.forceAuthenticate = function() {
  u = !1;
  var e = new o();
  r(e), a(e), e.enqueue();
 }, d.upload = function(e, t, i, l, c, u) {
  var d = void 0, p = new o();
  r(p), a(p), p.onRun(function() {
   var o = "-------314159265358979323846", r = "\r\n--" + o + "\r\n", a = "\r\n--" + o + "--", c = "text/x-markdown", u = {
    title: i,
    mimeType: c
   };
   t && (u.parents = [ {
    kind: "drive#fileLink",
    id: t
   } ]);
   var f = "/upload/drive/v2/files", h = "POST";
   e && (f += "/" + e, h = "PUT");
   var m = {
    "Content-Type": 'multipart/mixed; boundary="' + o + '"'
   }, g = n.encodeBase64(l), v = [ r, "Content-Type: application/json\r\n\r\n", JSON.stringify(u), r, "Content-Type: ", c, "\r\n", "Content-Transfer-Encoding: base64\r\n", "\r\n", g, a ].join(""), b = gapi.client.request({
    path: f,
    method: h,
    params: {
     uploadType: "multipart"
    },
    headers: m,
    body: v
   });
   b.execute(function(t) {
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
  var i = void 0, l = new o();
  r(l), a(l), l.onRun(function() {
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
    return e && e.id ? (i = e, l.chain(), void 0) : (s(e.error, l), void 0);
   });
  }), l.onSuccess(function() {
   n(void 0, i);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 }, d.uploadImg = function(t, n, i, l) {
  var c = void 0, u = new o();
  r(u), a(u), u.onRun(function() {
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
    200 == t.code && (t.message = e.responseText), s(t, u);
   });
  }), u.onSuccess(function() {
   l(void 0, c);
  }), u.onError(function(e) {
   l(e);
  }), u.enqueue();
 }, d.checkChanges = function(e, t) {
  var n = [], i = e || 0, l = new o();
  r(l), a(l), l.onRun(function() {
   function e() {
    var o = void 0;
    o = void 0 === t ? gapi.client.drive.changes.list({
     startChangeId: i + 1
    }) : gapi.client.drive.changes.list({
     pageToken: t
    }), o.execute(function(o) {
     return o && o.largestChangeId ? (i = o.largestChangeId, t = o.nextPageToken, void 0 !== o.items && (n = n.concat(o.items)), 
     void 0 !== t ? l.chain(e) : l.chain(), void 0) : (s(o.error, l), void 0);
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
  r(c), i || a(c), c.onRun(function() {
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
     404 === t.code && (t = 'File ID "' + i + '" not found on Google Drive.'), s(t, c);
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
  c.timeout = ASYNC_TASK_LONG_TIMEOUT, r(c), i || a(c), c.onRun(function() {
   function n() {
    if (0 === t.length) return c.chain(), void 0;
    var i = t[0];
    l.push(i);
    var o = void 0;
    if ("drive#file" == i.kind ? o = i : "drive#change" == i.kind && (o = i.file), !o) return t.shift(), 
    c.chain(n), void 0;
    if (0 === o.mimeType.indexOf("application/vnd.google-apps.drive-sdk")) return o.content = "", 
    o.isRealtime = !0, t.shift(), c.chain(n), void 0;
    var r = {}, a = gapi.auth.getToken();
    a && (r.Authorization = "Bearer " + a.access_token), e.ajax({
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
     s(t, c);
    });
   }
   c.chain(n);
  }), c.onSuccess(function() {
   n(void 0, l);
  }), c.onError(function(e) {
   n(e);
  }), c.enqueue();
 }, d.loadRealtime = function(e, t, n, i) {
  var s = void 0, l = new o();
  r(l), a(l), l.onRun(function() {
   gapi.drive.realtime.load(e, function(e) {
    s = e, l.chain();
   }, function(e) {
    var n = e.createString(t);
    e.getRoot().set("content", n);
   }, function(e) {
    i(e), l.error(new Error(e.message));
   });
  }), l.onSuccess(function() {
   n(void 0, s);
  }), l.onError(function(e) {
   n(e);
  }), l.enqueue();
 };
 var f = !1;
 return d.picker = function(t, i) {
  function a() {
   void 0 !== c && (c.setVisible(!1), e(".modal-backdrop, .picker").remove());
  }
  var s = [], c = void 0, u = new o();
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
    (e.action == google.picker.Action.PICKED || e.action == google.picker.Action.CANCEL) && (e.action == google.picker.Action.PICKED && (s = e.docs), 
    a(), u.chain());
   }), c = t.build(), e(n.createBackdrop()).click(function() {
    a(), u.chain();
   }), c.setVisible(!0);
  }), u.onSuccess(function() {
   t(void 0, s);
  }), u.onError(function(e) {
   a(), t(e);
  }), u.enqueue();
 }, d.uploadBlogger = function(t, n, i, l, c, u, d) {
  var p = new o();
  r(p), a(p), p.onRun(function() {
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
     headers: a,
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
     s(t, p);
    });
   }
   function r() {
    return void 0 !== n ? (p.chain(o), void 0) : (e.ajax({
     url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
     data: {
      url: t
     },
     headers: a,
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
     s(n, p);
    }), void 0);
   }
   var a = {}, d = gapi.auth.getToken();
   d && (a.Authorization = "Bearer " + d.access_token), p.chain(r);
  }), p.onSuccess(function() {
   d(void 0, n, i);
  }), p.onError(function(e) {
   d(e);
  }), p.enqueue();
 }, d;
}), define("providers/gdriveProvider", [ "underscore", "utils", "classes/Provider", "settings", "eventMgr", "fileMgr", "helpers/googleHelper" ], function(e, t, n, i, o, r, a) {
 function s(e) {
  return "sync." + u + "." + e;
 }
 function l(e, n, i, o) {
  var r = {};
  return r.provider = d, r.id = e, r.etag = n, r.contentCRC = t.crc32(i), r.titleCRC = t.crc32(o), 
  r.syncIndex = s(e), r;
 }
 function c(t) {
  a.downloadMetadata(t, function(t, n) {
   t || a.downloadContent(n, function(t, n) {
    if (!t) {
     var i = [], a = void 0;
     e.each(n, function(e) {
      var t = l(e.id, e.etag, e.content, e.title);
      t.isRealtime = e.isRealtime;
      var n = {};
      n[t.syncIndex] = t, a = r.createFile(e.title, e.content, n), i.push(a);
     }), void 0 !== a && (o.onSyncImportSuccess(i, d), r.selectFile(a));
    }
   });
  });
 }
 var u = "gdrive", d = new n(u, "Google Drive");
 d.defaultPublishFormat = "template", d.exportPreferencesInputIds = [ "gdrive-parentid", "gdrive-realtime" ], 
 d.importFiles = function() {
  a.picker(function(t, n) {
   if (!t && 0 !== n.length) {
    var i = [];
    e.each(n, function(e) {
     var t = s(e.id), n = r.getFileFromSyncIndex(t);
     return void 0 !== n ? (o.onError('"' + n.title + '" was already imported.'), void 0) : (i.push(e.id), 
     void 0);
    }), c(i);
   }
  }, "doc");
 }, d.exportFile = function(e, n, i, c) {
  var u = t.getInputTextValue("#input-sync-export-gdrive-fileid");
  if (u) {
   var d = s(u), p = r.getFileFromSyncIndex(d);
   if (void 0 !== p) return o.onError('File ID is already synchronized with "' + p.title + '".'), 
   c(!0), void 0;
  }
  var f = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.upload(u, f, n, i, void 0, function(e, t) {
   if (e) return c(e), void 0;
   var o = l(t.id, t.etag, i, n);
   c(void 0, o);
  });
 }, d.exportRealtimeFile = function(e, n, i, o) {
  var r = t.getInputTextValue("#input-sync-export-gdrive-parentid");
  a.createRealtimeFile(r, n, function(e, t) {
   if (e) return o(e), void 0;
   var r = l(t.id, t.etag, i, n);
   o(void 0, r);
  });
 }, d.syncUp = function(e, t, n, i, o, r) {
  var s = o.contentCRC, l = o.titleCRC;
  return t == s && i == l ? (r(void 0, !1), void 0) : (a.upload(o.id, void 0, n, e, o.etag, function(e, n) {
   return e ? (r(e, !0), void 0) : (o.etag = n.etag, o.contentCRC = t, o.titleCRC = i, 
   r(void 0, !0), void 0);
  }), void 0);
 }, d.syncDown = function(n) {
  var i = parseInt(localStorage[u + ".lastChangeId"]);
  a.checkChanges(i, function(i, l, c) {
   if (i) return n(i), void 0;
   var p = [];
   e.each(l, function(e) {
    var t = s(e.fileId), n = r.getSyncAttributes(t);
    return void 0 !== n ? (e.syncAttributes = n, e.deleted === !0 ? (p.push(e), void 0) : (n.etag != e.file.etag && p.push(e), 
    void 0)) : void 0;
   }), a.downloadContent(p, function(i, a) {
    return i ? (n(i), void 0) : (e.each(a, function(e) {
     var n = e.syncAttributes, i = n.syncIndex, a = r.getFileFromSyncIndex(i);
     if (void 0 !== a) {
      var s = a.title;
      if (e.deleted === !0) return o.onError('"' + s + '" has been removed from Google Drive.'), 
      a.removeSyncLocation(n), o.onSyncRemoved(a, n), n.isRealtime === !0 && r.currentFile === a && d.stopRealtimeSync(), 
      void 0;
      var l = n.titleCRC != t.crc32(s), c = a.content, u = n.contentCRC != t.crc32(c), p = e.file, f = t.crc32(p.title), h = n.titleCRC != f, m = s != p.title, g = t.crc32(p.content), v = n.contentCRC != g, b = c != p.content;
      (m === !0 && l === !0 && h === !0 || !n.isRealtime && b === !0 && u === !0 && v === !0) && (r.createFile(s + " (backup)", c), 
      o.onMessage('Conflict detected on "' + s + '". A backup has been created locally.')), 
      m && h === !0 && (a.title = p.title, o.onTitleChanged(a), o.onMessage('"' + s + '" has been renamed to "' + p.title + '" on Google Drive.')), 
      !n.isRealtime && b && v === !0 && (a.content = p.content, o.onContentChanged(a), 
      o.onMessage('"' + p.title + '" has been updated from Google Drive.'), r.currentFile === a && r.selectFile()), 
      n.etag = p.etag, n.isRealtime || (n.contentCRC = g), n.titleCRC = f, t.storeAttributes(n);
     }
    }), localStorage[u + ".lastChangeId"] = c, n(), void 0);
   });
  });
 }, d.publish = function(e, t, n, i) {
  a.upload(e.id, void 0, e.fileName || t, n, void 0, function(t, n) {
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
 var f = void 0, h = void 0, m = void 0, g = void 0;
 return d.startRealtimeSync = function(n, i) {
  a.loadRealtime(i.id, n.content, function(a, s) {
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
   if (!a && s) {
    if (r.currentFile !== n) return s.close(), void 0;
    logger.log("Starting Google Drive realtime synchronization"), f = s;
    var d = f.getModel(), v = d.getRoot().get("content"), b = e.debounce(p.refreshPreview, 100);
    v.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, c), v.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, c), 
    f.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
     e.isPending === !1 && e.isSaving === !1 && (logger.log("Google Drive realtime document successfully saved on server"), 
     l());
    });
    var y = n.content, x = i.contentCRC != t.crc32(y), w = v.getText(), C = t.crc32(w), k = i.contentCRC != C, S = y != w;
    S === !0 && x === !0 && (k === !0 ? (r.createFile(n.title + " (backup)", y), o.onMessage('Conflict detected on "' + n.title + '". A backup has been created locally.')) : v.setText(y)), 
    h = gapi.drive.realtime.databinding.bindString(v, document.getElementById("wmd-input")), 
    k === !0 && (logger.log("Google Drive realtime document updated from server"), l(), 
    b()), m = p.uiManager.buttons.undo.execute, g = p.uiManager.buttons.redo.execute, 
    p.uiManager.buttons.undo.execute = function() {
     d.canUndo && d.undo();
    }, p.uiManager.buttons.redo.execute = function() {
     d.canRedo && d.redo();
    }, d.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, u), 
    u();
   }
  }, function(e) {
   console.error(e), "token_refresh_required" == e.type ? a.forceAuthenticate() : "not_found" == e.type ? (o.onError('"' + n.title + '" has been removed from Google Drive.'), 
   n.removeSyncLocation(i), o.onSyncRemoved(n, i), d.stopRealtimeSync()) : e.isFatal && (o.onError("An error has forced real time synchronization to stop."), 
   d.stopRealtimeSync());
  });
 }, d.stopRealtimeSync = function() {
  logger.log("Stopping Google Drive realtime synchronization"), void 0 !== h && (h.unbind(), 
  h = void 0), void 0 !== f && (f.close(), f = void 0), p.uiManager.buttons.undo.execute = m, 
  p.uiManager.buttons.redo.execute = g, p.uiManager.setUndoRedoButtonStates();
 }, o.addListener("onReady", function() {
  $(".export-gdrive-choose-folder").click(function() {
   a.picker(function(e, n) {
    e || 0 === n.length || ($(".modal-upload-gdrive").modal(), t.setInputValue("#input-sync-export-gdrive-parentid", n[0].id));
   }, "folder");
  });
  var n = $("#input-sync-export-gdrive-realtime"), d = $("#input-sync-export-gdrive-fileid");
  $("#input-sync-export-gdrive-realtime").change(function() {
   d.prop("disabled", n.prop("checked"));
  });
  var p = t.retrieveIgnoreError(u + ".state");
  if (void 0 !== p) if (localStorage.removeItem(u + ".state"), "create" == p.action) a.upload(void 0, p.folderId, GDRIVE_DEFAULT_FILE_TITLE, i.defaultContent, void 0, function(e, t) {
   if (!e) {
    var n = l(t.id, t.etag, t.content, t.title), i = {};
    i[n.syncIndex] = n;
    var a = r.createFile(t.title, t.content, i);
    r.selectFile(a), o.onMessage('"' + t.title + '" created successfully on Google Drive.');
   }
  }); else if ("open" == p.action) {
   var f = [];
   e.each(p.ids, function(e) {
    var t = s(e), n = r.getFileFromSyncIndex(t);
    void 0 !== n ? r.selectFile(n) : f.push(e);
   }), c(f);
  }
 }), d;
}), define("synchronizer", [ "jquery", "underscore", "utils", "eventMgr", "fileSystem", "fileMgr", "classes/Provider", "providers/dropboxProvider", "providers/gdriveProvider" ], function(e, t, n, i, o, r, a) {
 function s(e) {
  if (0 === b.length) return l(e), void 0;
  var t = b.pop();
  return t.isRealtime === !0 ? (s(e), void 0) : (t.provider.syncUp(y, x, w, C, t, function(i, o) {
   return o === !0 && (S = !0), i ? (e(i), void 0) : (o && n.storeAttributes(t), s(e), 
   void 0);
  }), void 0);
 }
 function l(e) {
  if (0 === k.length) return c(e), void 0;
  var i = k.pop();
  return b = t.values(i.syncLocations), 0 === b.length ? (l(e), void 0) : (y = i.content, 
  x = n.crc32(y), w = i.title, C = n.crc32(w), s(e), void 0);
 }
 function c(e) {
  S === !0 ? (S = !1, k = t.values(o), l(e)) : e();
 }
 function u(e) {
  if (0 === _.length) return e(), void 0;
  var t = _.pop();
  return g.hasSync(t) ? (t.syncDown(function(t) {
   return t ? (e(t), void 0) : (u(e), void 0);
  }), void 0) : (u(e), void 0);
 }
 function d(e) {
  _ = t.values(v), u(e);
 }
 function p(e) {
  N = t.some(e.syncLocations, function(e) {
   return I = e, e.isRealtime;
  }) ? e : void 0, h();
 }
 function f(e) {
  e === !1 ? (P = !0, h()) : (g.tryStopRealtimeSync(), P = !1);
 }
 function h() {
  void 0 !== N && P === !0 && I.provider.startRealtimeSync(N, I);
 }
 function m(i) {
  n.resetModalInputs();
  var o = n.retrieveIgnoreError(i.providerId + ".exportPreferences");
  o && t.each(i.exportPreferencesInputIds, function(e) {
   var i = o[e];
   t.isBoolean(i) ? n.setInputChecked("#input-sync-export-" + e, i) : n.setInputValue("#input-sync-export-" + e, i);
  }), e(".modal-upload-" + i.providerId).modal();
 }
 var g = {}, v = t.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value();
 t.each(o, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".sync"), function(t) {
   try {
    var o = JSON.parse(localStorage[t]);
    o.syncIndex = t;
    var r = v[o.provider];
    if (!r) throw new Error("Invalid provider ID: " + o.provider);
    o.provider = r, e.syncLocations[t] = o;
   } catch (a) {
    i.onError(a), n.removeIndexFromArray(e.fileIndex + ".sync", t), localStorage.removeItem(t);
   }
  });
 }), g.hasSync = function(e) {
  return t.some(o, function(n) {
   return t.some(n.syncLocations, function(t) {
    return void 0 === e || t.provider === e;
   });
  });
 };
 var b = [], y = void 0, x = void 0, w = void 0, C = void 0, k = [], S = !1, _ = [], T = !1;
 i.addListener("onOfflineChanged", function(e) {
  T = e;
 });
 var E = !1;
 g.sync = function() {
  function e(e) {
   return void 0 !== e ? (E = !1, i.onSyncRunning(!1), !0) : !1;
  }
  return E === !0 || T === !0 ? !1 : (E = !0, i.onSyncRunning(!0), S = !0, d(function(t) {
   e(t) || c(function(t) {
    e(t) || (E = !1, i.onSyncRunning(!1), i.onSyncSuccess());
   });
  }), !0);
 };
 var N = void 0, I = void 0, P = !0;
 return g.tryStopRealtimeSync = function() {
  void 0 !== N && P === !0 && I.provider.stopRealtimeSync();
 }, viewerMode === !1 && (i.addListener("onFileOpen", p), i.addListener("onFileClosed", g.tryStopRealtimeSync), 
 i.addListener("onOfflineChanged", f)), i.addListener("onReady", function() {
  t.each(v, function(o) {
   e(".action-sync-import-" + o.providerId).click(function(e) {
    o.importFiles(e);
   }), e(".action-sync-export-dialog-" + o.providerId).click(function() {
    m(o);
   }), e(".action-sync-export-" + o.providerId).click(function(e) {
    var a = n.getInputChecked("#input-sync-export-" + o.providerId + "-realtime"), s = r.currentFile;
    if (a) {
     if (t.size(s.syncLocations) > 0) return i.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     o.exportRealtimeFile(e, s.title, s.content, function(e, t) {
      e || (t.isRealtime = !0, s.addSyncLocation(t), i.onSyncExportSuccess(s, t), N = s, 
      I = t, h());
     });
    } else {
     if (t.size(s.syncLocations) > 0 && t.first(t.values(s.syncLocations)).isRealtime) return i.onError("Real time collaborative document can't be synchronized with multiple locations"), 
     void 0;
     o.exportFile(e, s.title, s.content, function(e, t) {
      e || (s.addSyncLocation(t), i.onSyncExportSuccess(s, t));
     });
    }
    var l = {};
    t.each(o.exportPreferencesInputIds, function(e) {
     var t = document.getElementById("input-sync-export-" + e);
     l[e] = "checkbox" == t.type ? t.checked : t.value;
    }), localStorage[o.providerId + ".exportPreferences"] = JSON.stringify(l);
   });
  });
 }), i.onSynchronizerCreated(g), g;
}), define("providers/downloadProvider", [ "jquery", "eventMgr", "utils", "fileMgr", "classes/Provider", "classes/AsyncTask" ], function(e, t, n, i, o, r) {
 var a = new o("download");
 return a.sharingAttributes = [ "url" ], a.importPublic = function(t, n) {
  var i = void 0, o = void 0, a = new r();
  a.onRun(function() {
   var n = t.url, r = n.lastIndexOf("/");
   return -1 === r ? (a.error(new Error("Invalid URL parameter.")), void 0) : (i = n.substring(r + 1), 
   e.ajax({
    url: DOWNLOAD_PROXY_URL + "download?url=" + n,
    type: "GET",
    dataType: "text",
    timeout: AJAX_TIMEOUT
   }).done(function(e) {
    o = e, a.chain();
   }).fail(function() {
    a.error(new Error("Unable to access URL " + n));
   }), void 0);
  }), a.onSuccess(function() {
   n(void 0, i, o);
  }), a.onError(function(e) {
   n(e);
  }), a.enqueue();
 }, t.addListener("onReady", function() {
  e(".action-import-url").click(function(e) {
   var t = n.getInputTextValue("#input-import-url", e);
   t && a.importPublic({
    url: t
   }, function(e, t, n) {
    if (!e) {
     var o = i.createFile(t, n);
     i.selectFile(o);
    }
   });
  });
 }), a;
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
    s(n, t);
   }), void 0);
  });
 }
 function a(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    localStorage.removeItem("githubCode"), o = n.popupWindow("github-oauth-client.html?client_id=" + GITHUB_CLIENT_ID, "stackedit-github-oauth", 960, 600), 
    o.focus(), r = setInterval(function() {
     if (o.closed === !0) {
      if (clearInterval(r), o = void 0, r = void 0, d = localStorage.githubCode, void 0 === d) return t.error(new Error(u)), 
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
   i.onMessage("Please make sure the Github authorization popup is not blocked by your browser.");
   var u = "Failed to retrieve a token from GitHub.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var d = void 0;
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function s(e, n) {
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
  r(p), a(p), p.onRun(function() {
   function o() {
    var e = c.getUser();
    e.show(void 0, function(e, n) {
     return e ? (s(e, p), void 0) : (t = n.login, p.chain(r), void 0);
    });
   }
   function r() {
    var o = c.getRepo(t, e);
    o.write(n, i, l, u, function(e) {
     return e ? (s(e, p), void 0) : (p.chain(), void 0);
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
  r(d), a(d), d.onRun(function() {
   var o = c.getGist(e), r = {};
   r[t] = {
    content: l
   }, githubFunction = o.update, void 0 === e && (githubFunction = o.create), githubFunction({
    description: i,
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
  var i = new o();
  r(i);
  var a = void 0, s = void 0;
  i.onRun(function() {
   var n = new Github({}), o = n.getGist(e);
   o.read(function(n, o) {
    if (n) return i.error(new Error("Error trying to access Gist " + e + ".")), void 0;
    a = o.description;
    var r = o.files[t];
    return void 0 === r ? (i.error(new Error("Gist " + e + ' does not contain "' + t + '".')), 
    void 0) : (s = r.content, i.chain(), void 0);
   });
  }), i.onSuccess(function() {
   n(void 0, a, s);
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
}), define("sharing", [ "jquery", "underscore", "utils", "eventMgr", "fileMgr", "classes/AsyncTask", "classes/Provider", "providers/downloadProvider", "providers/gistProvider" ], function(e, t, n, i, o, r, a) {
 var s = {}, l = t.chain(arguments).map(function(e) {
  return e instanceof a && [ e.providerId, e ];
 }).compact().object().value(), c = !1;
 return i.addListener("onOfflineChanged", function(e) {
  c = e;
 }), s.createLink = function(n, o) {
  function a() {
   o();
  }
  var s = l[n.provider.providerId];
  if (void 0 !== n.sharingLink || void 0 === s || "markdown" != n.format) return o(), 
  void 0;
  var u = new r(), d = void 0;
  u.onRun(function() {
   if (c === !0) return u.chain(), void 0;
   var o = [ MAIN_URL, "viewer.html?provider=", s.providerId ];
   t.each(s.sharingAttributes, function(e) {
    o.push("&"), o.push(e), o.push("="), o.push(encodeURIComponent(n[e]));
   }), o = o.join(""), e.getJSON("https://api-ssl.bitly.com/v3/shorten", {
    access_token: BITLY_ACCESS_TOKEN,
    longUrl: o
   }, function(e) {
    e.data ? (d = e.data.url, n.sharingLink = d) : (i.onError("An error occured while creating sharing link."), 
    n.sharingLink = o), u.chain();
   });
  }), u.onSuccess(a), u.onError(a), u.enqueue();
 }, i.addListener("onReady", function() {
  if (viewerMode !== !1) {
   var i = n.getURLParameter("provider");
   void 0 === i && (i = "download");
   var r = l[i];
   if (void 0 !== r) {
    var a = {};
    t.each(r.sharingAttributes, function(e) {
     var t = n.getURLParameter(e);
     return t ? (a[e] = t, void 0) : (a = void 0, void 0);
    }), void 0 !== a && (e("#preview-contents, .navbar .file-title-navbar").hide(), 
    r.importPublic(a, function(t, n, i) {
     if (e("#preview-contents, .navbar .file-title-navbar").show(), !t) {
      var r = o.createFile(n, i, void 0, !0);
      o.selectFile(r);
     }
    }));
   }
  }
 }), s;
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
  var a = n.commitMsg;
  i.upload(e.repository, e.username, e.branch, e.path, o, a, r);
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
 function a(e, n) {
  var i = void 0;
  e && (logger.error(e), "string" == typeof e ? i = "SSH error: " + e + "." : (i = "Could not publish on SSH server.", 
  e.code <= 0 && (t.setOffline(), i = "|stopPublish"))), n.error(new Error(i));
 }
 var s = {}, l = !1;
 return n.addListener("onOfflineChanged", function(e) {
  l = e;
 }), s.upload = function(t, n, s, l, c, u, d, p) {
  var f = new o();
  r(f), f.onRun(function() {
   var o = i.sshProxy + "upload", r = {
    host: t,
    port: n,
    username: s,
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
 function a(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    e.getJSON(TUMBLR_PROXY_URL + "request_token", function(e) {
     void 0 !== e.oauth_token ? (p = e, t.chain(s)) : t.error(new Error(d));
    });
   }
   function s() {
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
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function s(e, n) {
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
  r(f), a(f), f.onRun(function() {
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
    s(t, f);
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
 function a(t) {
  var o = void 0, r = void 0;
  t.onRun(function() {
   function a() {
    localStorage.removeItem("wordpressCode"), o = n.popupWindow("wordpress-oauth-client.html?client_id=" + WORDPRESS_CLIENT_ID, "stackedit-wordpress-oauth", 960, 600), 
    o.focus(), r = setInterval(function() {
     if (o.closed === !0) {
      if (clearInterval(r), o = void 0, r = void 0, u = localStorage.wordpressCode, void 0 === u) return t.error(new Error(c)), 
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
   i.onMessage("Please make sure the Wordpress authorization popup is not blocked by your browser.");
   var c = "Failed to retrieve a token from Wordpress.";
   t.timeout = ASYNC_TASK_LONG_TIMEOUT;
   var u = void 0;
   t.chain(a);
  }), t.onError(function() {
   void 0 !== r && clearInterval(r), void 0 !== o && o.close();
  });
 }
 function s(e, n) {
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
  r(p), a(p), p.onRun(function() {
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
    s(i, p);
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
}), define("publisher", [ "jquery", "underscore", "utils", "settings", "eventMgr", "fileSystem", "fileMgr", "sharing", "classes/Provider", "providers/bloggerProvider", "providers/dropboxProvider", "providers/gistProvider", "providers/githubProvider", "providers/gdriveProvider", "providers/sshProvider", "providers/tumblrProvider", "providers/wordpressProvider" ], function(e, t, n, i, o, r, a, s, l) {
 function c(e, t, i) {
  return void 0 === t.format && (t.format = n.getInputRadio("radio-publish-format"), 
  "template" == t.format && n.getInputChecked("#checkbox-publish-custom-template") && (t.customTmpl = n.getInputValue("#textarea-publish-custom-template"))), 
  "markdown" == t.format ? e.content : "html" == t.format ? i : h.applyTemplate(e, t, i);
 }
 function u(e, t) {
  if (0 === g.length) return e(t), void 0;
  var n = g.pop(), i = c(v, n, b);
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
  C = o, e(".publish-provider-name").text(o.providerName), e('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + o.providerId).show(), 
  n.resetModalInputs(), n.setInputRadio("radio-publish-format", r), n.setInputChecked("#checkbox-publish-custom-template", !1), 
  n.setInputValue("#textarea-publish-custom-template", i.template);
  var a = n.retrieveIgnoreError(o.providerId + ".publishPreferences");
  a && (t.each(o.publishPreferencesInputIds, function(e) {
   var i = a[e];
   t.isBoolean(i) ? n.setInputChecked("#input-publish-" + e, i) : n.setInputValue("#input-publish-" + e, i);
  }), n.setInputRadio("radio-publish-format", a.format), n.setInputChecked("#checkbox-publish-custom-template", void 0 !== a.customTmpl), 
  n.setInputValue("#textarea-publish-custom-template", a.customTmpl || i.template)), 
  e(".modal-publish").modal();
 }
 function f(e) {
  var n = C, i = n.newPublishAttributes(e);
  if (void 0 !== i) {
   var o = a.currentFile, r = y, l = c(o, i, r);
   n.publish(i, o.title, l, function(e) {
    void 0 === e && (i.provider = n, s.createLink(i, function() {
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
 var h = {}, m = t.chain(arguments).map(function(e) {
  return e instanceof l && [ e.providerId, e ];
 }).compact().object().value();
 t.each(r, function(e) {
  t.each(n.retrieveIndexArray(e.fileIndex + ".publish"), function(t) {
   try {
    var i = JSON.parse(localStorage[t]);
    i.publishIndex = t;
    var r = m[i.provider];
    if (!r) throw new Error("Invalid provider ID: " + i.provider);
    i.provider = r, e.publishLocations[t] = i;
   } catch (a) {
    o.onError(a), n.removeIndexFromArray(e.fileIndex + ".publish", t), localStorage.removeItem(t);
   }
  });
 }), h.applyTemplate = function(e, n, r) {
  try {
   var a = n && n.customTmpl || i.template;
   return t.template(a, {
    documentTitle: e.title,
    documentMarkdown: e.content,
    documentHTML: r,
    publishAttributes: n
   });
  } catch (s) {
   return o.onError(s), s.message;
  }
 };
 var g = [], v = void 0, b = void 0, y = void 0;
 o.addListener("onPreviewFinished", function(e) {
  y = e;
 });
 var x = !1;
 o.addListener("onOfflineChanged", function(e) {
  x = e;
 });
 var w = !1;
 h.publish = function() {
  w !== !0 && x !== !0 && (w = !0, o.onPublishRunning(!0), v = a.currentFile, b = y, 
  g = t.values(v.publishLocations), u(function(e) {
   w = !1, o.onPublishRunning(!1), void 0 === e && o.onPublishSuccess(v);
  }));
 };
 var C = void 0, k = [ "<li>", '   <a href="#"', '    class="action-init-publish-<%= provider.providerId %>">', '       <i class="icon-provider-<%= provider.providerId %>"></i> <%= provider.providerName %>', "   </a>", "</li>" ].join("");
 return o.addListener("onReady", function() {
  if (viewerMode === !1) {
   var o = document.querySelector(".menu-panel .collapse-publish-on .nav"), r = t.reduce(m, function(e, n) {
    return e + t.template(k, {
     provider: n
    });
   }, "");
   o.innerHTML = r, t.each(m, function(t) {
    e(o.querySelector(".action-init-publish-" + t.providerId)).click(function() {
     p(t);
    }), e(".action-publish-" + t.providerId).click(function() {
     p(t);
    });
   });
  }
  e(".action-process-publish").click(f);
  var s = e(".publish-custom-template-collapse").collapse({
   toggle: !1
  }), l = e("#textarea-publish-custom-template"), c = t.debounce(function() {
   s.collapse("template" == n.getInputRadio("radio-publish-format") ? "show" : "hide");
  }, 100);
  e("#checkbox-publish-custom-template").change(function() {
   l.prop("disabled", !this.checked);
  }), e("input:radio[name=radio-publish-format]").change(function() {
   c();
  }), e(".modal-publish").on("hidden.bs.modal", function() {
   s.collapse("hide");
  }), e(".action-download-md").click(function() {
   var e = document.getElementById("wmd-input").value, t = a.currentFile.title;
   n.saveAs(e, t + ".md");
  }), e(".action-download-html").click(function() {
   var e = a.currentFile.title;
   n.saveAs(y, e + ".html");
  }), e(".action-download-template").click(function() {
   var e = a.currentFile, t = h.applyTemplate(e, void 0, y);
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
 function a() {
  return c.thumbnails ? (t.resetModalInputs(), $(".modal-import-image img").prop("src", r(c, 128)), 
  t.setInputValue("#input-import-image-title", c.name), u && t.setInputValue("#input-import-image-size", u.size), 
  $(".modal-import-image").modal(), void 0) : (i.onError("Image " + c.name + " is not accessible."), 
  callback(!0), void 0);
 }
 var s = "gplus", l = new n(s, "Google+"), c = void 0, u = t.retrieveIgnoreError(s + ".importImagePreferences"), d = void 0;
 return l.importImage = function(e) {
  d = e, o.picker(function(t, n) {
   return t || 0 === n.length ? (e(t), void 0) : (c = n[0], a(), void 0);
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
   }), a(), void 0);
  });
 }, i.addListener("onReady", function() {
  $(".action-import-image").click(function() {
   var e = t.getInputIntValue("#input-import-image-size", void 0, 0) || 0, n = t.getInputTextValue("#input-import-image-title"), i = r(c, e);
   n && (i += ' "' + n + '"'), d(void 0, i), u = {}, e && (u.size = e), localStorage[s + ".importImagePreferences"] = JSON.stringify(u);
  });
 }), l;
}), define("mediaImporter", [ "jquery", "underscore", "classes/Provider", "core", "eventMgr", "providers/gplusProvider" ], function(e, t, n, i, o) {
 var r = {}, a = t.chain(arguments).map(function(e) {
  return e instanceof n && [ e.providerId, e ];
 }).compact().object().value();
 return o.addListener("onReady", function() {
  function n(n) {
   var o = (n.dataTransfer || n.target).files, r = t.first(o);
   if (r.name.match(/.(jpe?g|png|gif)$/)) {
    n.stopPropagation(), n.preventDefault();
    var s = new FileReader();
    s.onload = function() {
     return function(t) {
      var n = new Uint8Array(t.target.result);
      a.gplus.uploadImage(r.name, n, function(t, n) {
       if (!t) {
        i.catchModal = !0, e("#wmd-image-button").click(), i.catchModal = !1;
        var o = i.insertLinkCallback;
        i.insertLinkCallback = void 0, o(n || null);
       }
      });
     };
    }(r);
    var l = r.slice(0, IMPORT_IMG_MAX_CONTENT_SIZE);
    s.readAsArrayBuffer(l);
   }
  }
  function o(e) {
   e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy";
  }
  t.each(a, function(t) {
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
  if (e = r(e), e.match(/^\//) || e.match(a)) return e;
  var s = o.match(a), l = i.match(a);
  return !l || s && s[1] == l[1] && s[2] == l[2] ? n(t(e, i), o) : t(e, i);
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
 }, a = /[^\:\/]*:\/\/([^\/])*/, s = function(t, n, i, o) {
  n = r(n), i = r(i);
  for (var a, s, t, l = /@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi; a = l.exec(t); ) {
   s = a[3] || a[2] || a[5] || a[6] || a[4];
   var c;
   c = o && "/" == s.substr(0, 1) ? o + s : e(s, n, i);
   var u = a[5] || a[6] ? 1 : 0;
   t = t.substr(0, l.lastIndex - s.length - u - 1) + c + t.substr(l.lastIndex - u - 1), 
   l.lastIndex = l.lastIndex + (c.length - s.length);
  }
  return t;
 };
 return s.convertURIBase = e, s;
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
 var a = {}, s = /^\/|([^\:\/]*:)/;
 a.pluginBuilder = "./css-builder";
 var l = [], c = {}, u = [];
 a.addBuffer = function(e) {
  -1 == t(l, e) && -1 == t(u, e) && (l.push(e), u.push(e));
 }, a.setBuffer = function(t, n) {
  var i = window.location.pathname.split("/");
  i.pop(), i = i.join("/") + "/";
  var o = require.toUrl("base_url").split("/");
  o.pop();
  var r = o.join("/") + "/";
  r = e.convertURIBase(r, i, "/"), r.match(s) || (r = "/" + r), "/" != r.substr(r.length - 1, 1) && (r += "/"), 
  a.inject(e(t, r, i));
  for (var u = 0; u < l.length; u++) (n && ".less" == l[u].substr(l[u].length - 5, 5) || !n && ".css" == l[u].substr(l[u].length - 4, 4)) && (function(e) {
   c[e] = c[e] || !0, setTimeout(function() {
    "function" == typeof c[e] && c[e](), delete c[e];
   }, 7);
  }(l[u]), l.splice(u--, 1));
 }, a.attachBuffer = function(e, n) {
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
 if ("trident" == o && r) var f = [], h = [], m = 0, g = function(e, t) {
  var n;
  h.push({
   url: e,
   cb: t
  }), n = f.shift(), !n && m++ < 31 && (n = document.createElement("style"), i.appendChild(n)), 
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
 a.linkLoad = function(e, t) {
  var a = setTimeout(function() {
   n && alert("timeout"), t();
  }, 1e3 * N - 100), s = function() {
   clearTimeout(a), l && (l.onload = y), setTimeout(t, 7);
  };
  if (r) if ("webkit" == o) {
   var l = b(e);
   d(l, s), i.appendChild(l);
  } else if ("gecko" == o) {
   var c = document.createElement("style");
   c.textContent = '@import "' + e + '"', p(c, s), i.appendChild(c);
  } else "trident" == o && g(e, s); else {
   var l = b(e);
   l.onload = s, i.appendChild(l);
  }
 };
 var x, w = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], C = {}, k = function(e, t, n) {
  if (C[e]) return t(C[e]), void 0;
  var i, o, r;
  if ("undefined" != typeof XMLHttpRequest) i = new XMLHttpRequest(); else if ("undefined" != typeof ActiveXObject) for (o = 0; 3 > o; o += 1) {
   r = w[o];
   try {
    i = new ActiveXObject(r);
   } catch (a) {}
   if (i) {
    w = [ r ];
    break;
   }
  }
  i.open("GET", e, requirejs.inlineRequire ? !1 : !0), i.onreadystatechange = function() {
   var o, r;
   4 === i.readyState && (o = i.status, o > 399 && 600 > o ? (r = new Error(e + " HTTP status: " + o), 
   r.xhr = i, n(r)) : (C[e] = i.responseText, t(i.responseText)));
  }, i.send(null);
 }, S = 0;
 a.inject = function(e) {
  31 > S && (x = document.createElement("style"), x.type = "text/css", i.appendChild(x), 
  S++), x.styleSheet ? x.styleSheet.cssText += e : x.appendChild(document.createTextNode(e));
 };
 var _ = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, T = window.location.pathname.split("/");
 T.pop(), T = T.join("/") + "/";
 var E = function(t, n, i) {
  t.match(s) || (t = "/" + e.convertURIBase(t, T, "/")), k(t, function(o) {
   o = e(o, t, T);
   for (var r, a = [], s = [], l = []; r = _.exec(o); ) {
    var c = r[4] || r[5] || r[7] || r[8] || r[9];
    a.push(c), s.push(_.lastIndex - r[0].length), l.push(r[0].length);
   }
   for (var u = 0, d = 0; d < a.length; d++) (function(e) {
    E(a[e], function(t) {
     o = o.substr(0, s[e]) + t + o.substr(s[e] + l[e]);
     for (var i = t.length - l[e], r = e + 1; r < a.length; r++) s[r] += i;
     u++, u == a.length && n(o);
    }, i);
   })(d);
   0 == a.length && n(o);
  }, i);
 };
 a.normalize = function(e, t) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e);
 };
 var N, I = !1;
 return a.load = function(e, t, i, o, s) {
  N = N || o.waitSeconds || 7;
  var l = e + (s ? ".less" : ".css");
  if (!a.attachBuffer(l, i)) {
   var c = t.toUrl(l);
   !I && n && (alert(r ? "hacking links" : "not hacking"), I = !0), s ? E(c, function(e) {
    s && (e = s(e, function(e) {
     a.inject(e), setTimeout(i, 7);
    }));
   }) : a.linkLoad(c, i);
  }
 }, n && (a.inspect = function() {
  return stylesheet.styleSheet ? stylesheet.styleSheet.cssText : stylesheet.innerHTML ? stylesheet.innerHTML : void 0;
 }), a;
}), define("css", [ "css/css" ], function(e) {
 return e;
}), requirejs.config({
 waitSeconds: 0,
 packages: [ {
  name: "css",
  location: "bower-libs/require-css",
  main: "css"
 }, {
  name: "less",
  location: "bower-libs/require-less",
  main: "less"
 } ],
 paths: {
  jquery: "bower-libs/jquery/jquery",
  underscore: "bower-libs/underscore/underscore",
  crel: "libs/crel",
  jgrowl: "bower-libs/jgrowl/jquery.jgrowl",
  mousetrap: "bower-libs/mousetrap/mousetrap",
  toMarkdown: "libs/to-markdown",
  text: "bower-libs/requirejs-text/text",
  mathjax: "../lib/MathJax/MathJax.js?config=TeX-AMS_HTML",
  bootstrap: "bower-libs/bootstrap/dist/js/bootstrap",
  requirejs: "bower-libs/requirejs/require",
  "google-code-prettify": "bower-libs/google-code-prettify/src/prettify",
  highlightjs: "bower-libs/highlightjs/highlight.pack",
  "jquery-mousewheel": "bower-libs/jquery-mousewheel/jquery.mousewheel",
  "jquery-waitforimages": "libs/jquery.waitforimages",
  "jquery-ui": "bower-libs/jquery-ui/ui/jquery-ui",
  "jquery-ui-core": "bower-libs/jquery-ui/ui/jquery.ui.core",
  "jquery-ui-widget": "bower-libs/jquery-ui/ui/jquery.ui.widget",
  "jquery-ui-mouse": "bower-libs/jquery-ui/ui/jquery.ui.mouse",
  "jquery-ui-draggable": "bower-libs/jquery-ui/ui/jquery.ui.draggable",
  "jquery-ui-effect": "bower-libs/jquery-ui/ui/jquery.ui.effect",
  "jquery-ui-effect-slide": "bower-libs/jquery-ui/ui/jquery.ui.effect-slide",
  uilayout: "libs/layout",
  css_browser_selector: "bower-libs/css_browser_selector/css_browser_selector",
  FileSaver: "bower-libs/FileSaver/FileSaver",
  stacktrace: "bower-libs/stacktrace/stacktrace",
  "requirejs-text": "bower-libs/requirejs-text/text",
  "bootstrap-tour": "bower-libs/bootstrap-tour/build/js/bootstrap-tour"
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
  "bootstrap-tour": [ "bootstrap" ],
  bootstrap: [ "jquery" ],
  "jquery-waitforimages": [ "jquery" ],
  "jquery-mousewheel": [ "jquery" ],
  uilayout: [ "jquery-ui-effect-slide" ],
  "jquery-ui-effect-slide": [ "jquery-ui-effect" ],
  "jquery-ui-effect": [ "jquery-ui-draggable" ],
  "jquery-ui-draggable": [ "jquery-ui-mouse" ],
  "jquery-ui-mouse": [ "jquery-ui-widget" ],
  "jquery-ui-widget": [ "jquery-ui-core" ],
  "jquery-ui-core": [ "jquery" ],
  "libs/Markdown.Extra": [ "libs/Markdown.Converter", "google-code-prettify", "highlightjs" ],
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

-1 !== baseDir.indexOf("-min") && (themeModule = "css!themes/" + theme), require([ "jquery", "core", "eventMgr", "synchronizer", "publisher", "mediaImporter", "css", themeModule ], function(e, t, n) {
 e(function() {
  t.onReady(), window.applicationCache && window.applicationCache.addEventListener("updateready", function() {
   window.applicationCache.status === window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), 
   n.onMessage("New version available.\nJust refresh the page to upgrade."));
  }, !1);
 });
}), define("main", function() {});