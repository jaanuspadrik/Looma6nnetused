require([
  "esri/Map",
  "esri/Basemap",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/VectorTileLayer",
  "esri/layers/MapImageLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/WMSLayer",
  "esri/layers/GroupLayer",
  "esri/PopupTemplate",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
  "esri/widgets/Fullscreen",
  "esri/widgets/Search",
  "esri/tasks/Locator",
  "esri/widgets/Home",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/BasemapToggle",
  "esri/geometry/Extent",
  "esri/config",
  "dojo/dom",
  "dojo/query",
  "dojo/on",
  "dojo/domReady!"
], function(Map, Basemap, WebMap, MapView, VectorTileLayer, MapImageLayer, FeatureLayer, WMSLayer, GroupLayer, PopupTemplate, Legend, Expand, LayerList, Fullscreen, Search, Locator, Home, DistanceMeasurement2D, AreaMeasurement2D, BasemapToggle, Extent, esriConfig, dom, query, on) {

  //esriConfig.portalUrl = "https://maps.hendrikson.ee/arcgis/";

  var Aluskaart = new WMSLayer ({
    url: "https://kaart.maaamet.ee/wms/hallkaart?service=WMS&version=1.3.0&request=GetCapabilities",
    title: "Hallkaart",
    listMode: "hide-children",
    visible: true
  });

  var basemap = new Basemap({
    baseLayers: [Aluskaart],
    title: "Aluskaart"
  });

  var map = new Map({
    basemap: basemap
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    scale: 1100000,
    spatialReference: {
      wkid: 3301
    },
    center: {
      y: 6499875,
      x: 527000,
      spatialReference: 3301
    }
  });

  /*view.watch("scale", function(value) {
    var str = value.toFixed(0);
    if (str.length == 5) {
      str = str.slice(0, 2) + ' ' + str.slice(2)
    } else if (str.length < 5) {
      str = value.toFixed(0);
    }
    else {
      str = str.slice(0, 3) + ' ' + str.slice(3)
    }
    mõõtkavaNumber = document.getElementById("mõõtkavaNr").innerHTML = str;
  });*/

  var Fotokaart = new WMSLayer ({
    url: "https://kaart.maaamet.ee/wms/fotokaart?service=WMS&version=1.3.0&request=GetCapabilities",
    title: "Ortofoto",
    listMode: "hide-children",
    visible: true,
    opacity: 0.8,
    sublayers: [
    {
      name: "HYB_pohimnt_nr"
    },
    {
      name: "HYB_tugimnt_nr"
    },
    {
      name: "HYB_korvalmnt_nr"
    },
    {
      name: "HYB_mnt_nimed_asulates"
    },
    {
      name: "HYB_pohimnt"
    },
    {
      name: "HYB_tugimnt"
    },
    {
      name: "HYB_korvalmnt"
    },
    {
      name: "EESTIFOTO"
    }]
  });

  var basemap2 = new Basemap({
    baseLayers: [Fotokaart],
    title: "Ortofoto"
  });

  on(dojo.query("#aluskaart"), "click", function() {
    if (map.basemap === basemap) {
      map.basemap = basemap2
    } else {
      map.basemap = basemap
    }
  });

  const Ohtl1 = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#c400c6",
    width: "3px",
    style: "solid"
  };

  const Ohtl2 = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#57007e",
    width: "3px",
    style: "solid"
  };

  const Ohtl3 = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#090057",
    width: "3px",
    style: "solid"
  };

  const LooduslikudRenderer = {
    type: "unique-value",
    legendOptions: {
      title: "Teelõigu ohtlikkus"
    },
    field: "Seletus",
    uniqueValueInfos: [
      {
        value: "Üle keskmise ohtlik teelõik",
        symbol: Ohtl1,
        label: "Üle keskmise ohtlik teelõik"
      },
      {
        value: "Kõrge ohuga teelõik",
        symbol: Ohtl2,
        label: "Kõrge ohuga teelõik"
      },
      {
        value: "Väga ohtlik teelõik",
        symbol: Ohtl3,
        label: "Väga ohtlik teelõik"
      }
    ]
  };

  var Looduslikud = new FeatureLayer({
    url: "http://maps.hendrikson.ee/arcgis/rest/services/Hosted/Loomaõnnetused_analüüsi_tulemused/FeatureServer/2",
    title: "Looduslike ohutegurite analüüs",
    visible: false,
    renderer: LooduslikudRenderer
  });

  const PunktiRenderer = {
    type: "simple",
    field: "Strength",
    symbol: {
      type: "simple-marker",
      color: "orange",
      outline: {
        color: "white"
      }
    },
    visualVariables: [
      {
        type: "size",
        field: "Strength",
        legendOptions: {
          title: "Klastri tugevus"
        },
        stops: [
          {
            value: 0.2,
            size: "6px"
          },
          {
            value: 0.4,
            size: "10px"
          },
          {
            value: 0.5,
            size: "20px"
          },
          {
            value: 0.6,
            size: "30px"
          },
          {
            value: 0.7,
            size: "40px"
          }
        ]
      },
      {
        type: "color",
        field: "Strength",
        legendOptions: {
          title: "Klastri tugevus"
        },
        stops: [
          {
            value: 0.2,
            color: "#a4f6a5"
          },
          {
            value: 0.4,
            color: "#a4f6a5"
          },
          {
            value: 0.5,
            color: "#f1eb9a"
          },
          {
            value: 0.6,
            color: "#f8a978"
          },
          {
            value: 0.7,
            color: "#f68787"
          }
        ]
      }
    ]
  };

  var Klastripunktid = new FeatureLayer({
    url: "http://maps.hendrikson.ee/arcgis/rest/services/Hosted/Loomaõnnetused_analüüsi_tulemused/FeatureServer/0",
    title: "Statistiliselt olulised klastrid",
    maxScale: 70000,
    renderer: PunktiRenderer
  });

  var Klastrijooned = new FeatureLayer({
    url: "http://maps.hendrikson.ee/arcgis/rest/services/Hosted/Loomaõnnetused_analüüsi_tulemused/FeatureServer/1",
    title: "Statistiliselt olulised klastrid",
    minScale: 70000
  });

  var Klastrid = new GroupLayer({
    title: "KDE+ analüüsi tulemused",
    layers: [Klastrijooned, Klastripunktid],
    listMode: "hide-children"
  });

  map.add(Looduslikud);
  map.add(Klastrid);

  view.ui.move("zoom", "top-right");

  var item;
  var layerList = new LayerList({
    view: view,
    container: "mahuti-kihid",
    listItemCreatedFunction: function(event){
      var item = event.item;
      if (item.children.length != 0) {
        item.actionsSections = [
          [
            {
              title: "Lülita alamkihid välja",
              className: "esri-icon-close",
              id: "lülitus"
            }
          ]
        ];
      }
    }
  });

  layerList.on("trigger-action", function(event) {
    var id = event.action.id;
    var kiht = event.item.children;
    nupp = event.item.actionsSections.items[0].items[0];

    if (id === "lülitus" && nupp.className === "esri-icon-close") {
      kiht.items.forEach(function(sublayer){
        sublayer.visible = false;
        nupp.className = "esri-icon-check-mark";
        nupp.title = "Lülita alamkihid sisse"
      });
    } else {
      kiht.items.forEach(function(sublayer){
        sublayer.visible = true;
        nupp.className = "esri-icon-close";
        nupp.title = "Lülita alamkihid välja"
      });
    }
  });

  var legend = new Legend({
    view: view,
    container: "mahuti-legend"
  });

  var homeWidget = new Home({
    view: view
  });

  var searchWidget = new Search({
    view: view,
    container: "otsing",
    locationEnabled: false,
    searchAllEnabled: false,
    includeDefaultSources: false,
    activeSourceIndex: 0,
    sources: [{
      featureLayer: {
        url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_katastripiirid/MapServer/0",
        resultGraphicEnabled: true,
        resultSymbol: {
          type: "polygon-3d",
          color: "dodgerblue"
        },
        popupTemplate: {
          title: "<h4>{L_AADRESS}</h4>",
          content: "<b>Tunnus:</b> {TUNNUS}<br><b>Aadress:</b> {L_AADRESS}<br><b>Asustusüksus:</b> {AY_NIMI}<br><b>Sihtotstarve:</b> {SIHT1}<br><b>Omand:</b> {OMVORM}",
          overwriteActions: true
        }
      },
      searchFields: ["TUNNUS"],
      displayField: "TUNNUS",
      exactMatch: false,
      outFields: ["*"],
      name: "Otsi katastritunnuse järgi",
      placeholder: "Sisesta katastritunnus",
    },
    {
    locator: new Locator("//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
    singleLineFieldName: "SingleLine",
    outFields: ["Addr_type"],
    name: "Otsi aadressi järgi",
    localSearchOptions: {
      minScale: 300000,
      distance: 50000
    },
    placeholder: "Sisesta aadress",
    resultSymbol: {
       type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
       url: this.basePath + "/images/search/search-symbol-32.png",
       size: 24,
       width: 24,
       height: 24,
       xoffset: 0,
       yoffset: 0
   }
  }]
  });

  view.ui.add(homeWidget, "top-right");
  view.ui.add("topbar", "top-right");

  var activeWidget = null;
  document.getElementById("distanceButton").addEventListener("click",
    function () {
      setActiveWidget(null);
      if (!this.classList.contains('active-mõõtmine')) {
        setActiveWidget('distance');
      } else {
        setActiveButton(null);
      }
    });

  document.getElementById("areaButton").addEventListener("click",
    function () {
      setActiveWidget(null);
      if (!this.classList.contains('active-mõõtmine')) {
        setActiveWidget('area');
      } else {
        setActiveButton(null);
      }
    });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DistanceMeasurement2D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById('distanceButton'));
        break;
      case "area":
        activeWidget = new AreaMeasurement2D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById('areaButton'));
        break;
      case null:
        if (activeWidget) {
          view.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    view.focus();
    var elements = document.getElementsByClassName("active-mõõtmine");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active-mõõtmine");
    }
    if (selectedButton) {
      selectedButton.classList.add("active-mõõtmine");
    }
  };

});
