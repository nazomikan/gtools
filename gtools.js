/*
 * Copyright (c) 2015 nazomikan
 * https://github.com/nazomikan/gtools
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('gtools', this, function () {
  var gtools = {}
    ;

  gtools.load = function (option, callback) {
    var script
      , src
      , query
      , key
      ;

    if (window.google && window.google.maps) {
      return callback();
    }

    option = mixin({
      v: '3.exp',
      callback: '_gtools_callback_' + (+new Date)
    }, option);

    src = '//maps.googleapis.com/maps/api/js?';
    query = [];

    for (key in option) {
      query.push(key + '=' + option[key]);
    }

    window[option.callback] = function () {
      setTimeout(function () {
        delete window[option.callback];
      }, 0);

      return callback();
    };

    script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src + query.join('&'));

    document.body.appendChild(script);
  };

  gtools.getExpandBounds = function (baseBounds, scale) {
    var sw = baseBounds.getSouthWest()
      , ne = baseBounds.getNorthEast()
      , swLat = sw.lat()
      , swLng = sw.lng()
      , neLat = ne.lat()
      , neLng = ne.lng()
      , expandSw
      , expandNe
      , expandSwLat
      , expandNeLat
      , expandSwLng
      , expandNeLng
      , expandBounds
      , delta
      ;

    delta = Math.abs(neLat - swLat) * (scale - 1);
    expandNeLat = (neLat > swLat) ? (neLat + delta) : (swLat + delta);
    expandSwLat = (neLat > swLat) ? (swLat - delta) : (neLat - delta);

    delta = Math.abs(neLng - swLng) * (scale - 1);
    expandNeLng = (neLng > swLng) ? (neLng + delta) : (swLng + delta);
    expandSwLng = (neLng > swLng) ? (swLng - delta) : (neLng - delta);

    expandNe = new google.maps.LatLng(expandNeLat, expandNeLng);
    expandSw = new google.maps.LatLng(expandSwLat, expandSwLng);

    expandBounds = new google.maps.LatLngBounds(expandSw, expandNe);

    return expandBounds;
  };

  function mixin(obj1, obj2) {
    var key
      ;

    obj1 = obj1 || {};
    obj2 = obj2 || {};

    for (key in obj2) {
      obj1[key] = obj2[key];
    }

    return obj1;
  }

  return gtools;
});
