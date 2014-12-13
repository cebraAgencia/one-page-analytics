One Pages trackeables con Analytics Waypoint.js y jQuery

Dependencias

  [jQuery](https://github.com/jquery/jquery)
  [Waypoint](https://github.com/imakewebthings/jquery-waypoints)
  [Google Tag Manager](http://www.google.com/tagmanager/)

Ejemplo

```html
<div id="home" class="pagina"><!-- contenido de la “pagina” home --></div>
<div id="nosotros" class="pagina"><!-- contenido de la “pagina” nosotros --></div>
<div id="contacto" class="pagina"><!-- contenido de la “pagina” contacto --></div>
```
```javascript
$('#home').paginaVirtual({url: '/home', pageTitle:'Home'});
$('#nosotros').paginaVirtual({url: '/nosotros', pageTitle:'Nosotros', triggerDelay: 2500});
$('#contacto').paginaVirtual({url: '/contacto', pageTitle:'Contacto', triggerDelay: 1500});
```

[Demo](http://jsfiddle.net/Agencia_Cebra/y1zawLck/)