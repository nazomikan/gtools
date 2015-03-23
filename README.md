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

* `option` - which is a parameter for calling the google maps.
* `callback` - A callback function to be executed when reading the completion of the google maps. The first argument of `callback` is set error or `null`. (async friendly)

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
