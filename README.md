# gtools

gtools is a helper of google maps.

## getting start

In browser include single JavaScript file.

usage (ex, gtools.load):

```html
<script type="text/javascript" src="/path/to/gtools.js"></script>
<script type="text/javascript">
  function initialize() {
    var map;

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644)
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    gtools.load({v: '3.19'}, initialize);
  } ,false);
</script>
```

## Documenation 

### load(option, callback)

load the google maps to asynchronous.

__Arguments__

* `option` - {Object} which is a parameter for calling the google maps.
* `callback` - {Function} A callback function to be executed when reading the completion of the google maps. The first argument of `callback` is set error or `null`. (async friendly)

__Example__

```javascript
gtools.load({v: '3.19'}, function (err) {
  if (err) {
    alert('error happend');
    return;
  }

  new google.maps(mapCanvas, {zoom: 8, center: new google.maps.LatLng(-34.397, 150.644)});
});
```

### getExpandBounds

returns a bounds that expands the given bounds.

__Arguments__

* `baseBounds` - {google.maps.Bounds} Bounds of the expand subject.
* `scale` - {Number} Magnification (ex, 1.2

__Example__

```javascript
var bounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(5, 5),
  new google.maps.LatLng(15, 15)
);
var rectangle = new google.maps.Rectangle({
  fillColor: '#ff0000',
  fillOpacity: 0.35,
  map: map,
  bounds: bounds
});
var expandRectangle = new google.maps.Rectangle({
  fillColor: '#003399',
  fillOpacity: 0.5,
  map: map,
  bounds: gtools.getExpandBounds(bounds, 3)
});
```
