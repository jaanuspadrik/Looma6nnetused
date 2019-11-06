require(["esri/Map",
"esri/views/SceneView",
"esri/Ground",
"esri/layers/SceneLayer",
"esri/layers/VectorTileLayer",
"esri/layers/MapImageLayer",
"esri/Basemap",
"esri/widgets/BasemapToggle",
"esri/widgets/Legend",
"esri/widgets/Expand",
"esri/widgets/LayerList",
"esri/widgets/Home"],
function(Map, SceneView, Ground, SceneLayer, VectorTileLayer, MapImageLayer, Basemap, BasemapToggle, Legend, Expand, LayerList, Home) {

  var map = new Map({
    basemap: "topo-vector",
    ground: new Ground({
     layers: [],
     opacity: 1
    })
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: [24.66, 59.28, 1100],
      heading: 0,
      tilt: 60
    },
    environment: {
      lighting: {
        directShadowsEnabled: true,
        date: new Date("Sun Jun 15 2019 10:00:00 GMT+0200 (CET)")
      }
    }
  });
  let kõrgusNr = document.getElementById("kõrgusNr");
  kõrgusNr.innerHTML = view.camera.position.z;

  view.watch("camera.position.z", function(value) {
    var str = value.toFixed(0);
    console.log(str);
    kõrgusNr = document.getElementById("kõrgusNr").innerHTML = str;
  });

  var solidEdges = {
    type: "solid",
    color: [0, 0, 0, 1],
    size: 0.5
  };

  var symbol = {
    type: "mesh-3d",
    symbolLayers: [{
      type: "fill",
      material: {
        color: [230, 230, 230]
      },
      edges: solidEdges
    }]
  };

  /*var tileLayer = new VectorTileLayer({
    url: "http://hendrikson.ee/maps/Saku-vald/WorldTopographicMap.json",
    listMode: "hide",
    opacity: 1
  });
  map.add(tileLayer);*/

  var olemasolev = new SceneLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Hosted/Saku_ÜP_olemasolevad_hooned_multipatch_1/SceneServer",
    title: "Olemasolevad hooned",
    renderer: {
      type: "simple",
      symbol: symbol
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{ads_lahiaa}"
    }
  });

  var Maakasutus = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: "Kavandatav maakasutus",
    visible: false,
    opacity: 0.5,
    sublayers: [
    {
      id: 2,
      title: "Teemaa ja liiklust korraldava ehitise maa-ala (LT)",
      popupTemplate: {
        title: "Teemaa ja liiklust korraldava ehitise maa-ala"
      }
    },
    {
      id: 3,
      title: "Pere- ja ridaelamu maa-ala (EP)",
      popupTemplate: {
        title: "Pere- ja ridaelamu maa-ala"
      }
    },
    {
      id: 4,
      title: "Korterelamu maa-ala (EK)",
      popupTemplate: {
        title: "Korterelamu maa-ala"
      }
    },
    {
      id: 5,
      title: "Puhke- ja virgestuse maa-ala (PV)",
      popupTemplate: {
        title: "Puhke- ja virgestuse maa-ala"
      }
    },
    {
      id: 6,
      title: "Haljasala ja parkmetsa maa-ala (HM)",
      popupTemplate: {
        title: "Haljasala ja parkmetsa maa-ala"
      }
    },
    {
      id: 7,
      title: "Ühiskondliku hoone maa-ala (AA)",
      popupTemplate: {
        title: "Ühiskondliku hoone maa-ala"
      }
    },
    {
      id: 8,
      title: "Kaubandus-, teenindus-, büroohoone maa-ala (Ä)",
      popupTemplate: {
        title: "Kaubandus-, teenindus-, büroohoone maa-ala"
      }
    },
    {
      id: 9,
      title: "Kalmistu maa-ala (K)",
      popupTemplate: {
        title: "Kalmistu maa-ala"
      }
    },
    {
      id: 10,
      title: "Puhke- ja virgestuse ning aianduse maa-ala (PV/MA)",
      popupTemplate: {
        title: "Puhke- ja virgestuse ning aianduse maa-ala"
      }
    },
    {
      id: 11,
      title: "Kaubandus-, teenindus- ja büroohoone ning ühiskondliku hoone maa-ala (Ä/AA)",
      popupTemplate: {
        title: "Kaubandus-, teenindus- ja büroohoone ning ühiskondliku hoone maa-ala"
      }
    },
    {
      id: 12,
      title: "Kaubandus-, teenindus- ja büroohoone ning korterelamu maa-ala (Ä/EK)",
      popupTemplate: {
        title: "Kaubandus-, teenindus- ja büroohoone ning korterelamu maa-ala"
      }
    },
    {
      id: 16,
      title: "Kaubandus-, teenindus-, büroohoone-, korterelamu- ja ühiskondliku hoone maa-ala (Ä/EK/AA)",
      popupTemplate: {
        title: "Kaubandus-, teenindus-, büroohoone-, korterelamu- ja ühiskondliku hoone maa-ala (Ä/EK/AA)"
      }
    },
    {
      id: 13,
      title: "Äri- ja teenindusettevõtte ning tootmis- ja logistikakeskuse maa-ala (ÄT)",
      popupTemplate: {
        title: "Äri- ja teenindusettevõtte ning tootmis- ja logistikakeskuse maa-ala"
      }
    }]
  });

  var Katastripiirid = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_katastripiirid/MapServer",
    title: "Katastriüksuste piirid",
    listMode: "hide-children",
    visible: false,
    opacity: 1,
    sublayers: [
    {
      id: 0,
      title: " ",
      popupTemplate: {
        title: "{L_AADRESS}",
        content: "Tunnus: {TUNNUS}"
      }
    }]
  });

  var KõrghoonePiirkonnad = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_kõrghooned/MapServer",
    title: "Võimalik kõrgem hoonestus",
    listMode: "hide-children",
    visible: true,
    opacity: 1,
    sublayers: [
    {
      id: 0,
      title: " "
    }]
  });

  map.add(Maakasutus);
  map.add(Katastripiirid);
  map.add(KõrghoonePiirkonnad);
  map.add(olemasolev);

  var layerList = new LayerList({
    view: view,
    container: "mahuti-kihid"
  });

  var legend = new Legend({
    view: view,
    container: "mahuti-legend"
  });

  var homeWidget = new Home({
    view: view
  });

  view.ui.move("zoom", "top-right");
  view.ui.move("compass", "top-right");
  view.ui.move("navigation-toggle", "top-right");
  view.ui.add(homeWidget, "top-right");

  view.when(function() {
    // Add a basemap toggle widget to toggle between basemaps
    var toggle = new BasemapToggle({
      titleVisible: true,
      view: view,
      nextBasemap: "satellite"
    });

    // Add widget to the top right corner of the view
    view.ui.add(toggle, "bottom-right");
  });
});
