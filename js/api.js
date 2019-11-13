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
  "esri/widgets/Feature",
  "esri/tasks/Locator",
  "esri/widgets/Home",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/BasemapToggle",
  "esri/geometry/Extent",
  "esri/widgets/Slider",
  "esri/config",
  "dojo/dom",
  "dojo/query",
  "dojo/on",
  "dojo/domReady!"
], function(Map, Basemap, WebMap, MapView, VectorTileLayer, MapImageLayer, FeatureLayer, WMSLayer, GroupLayer, PopupTemplate, Legend, Expand, LayerList, Fullscreen, Search, Feature, Locator, Home, DistanceMeasurement2D, AreaMeasurement2D, BasemapToggle, Extent, Slider, esriConfig, dom, query, on) {

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
    spatialReference: {
      wkid: 3301
    },
    extent: {
      xmin: 6617000,
      ymin: 375500,
      xmax: 6378500,
      ymax: 737000,
      spatialReference: 3301
    },
    center: {
      y: 6499875,
      x: 507000,
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
      name: "HYB_kontrolljoon"
    },
    {
      name: "HYB_halduspiirid_4m"
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
    color: "rgb(0, 245, 245)",
    width: "3px",
    style: "solid"
  };

  const Ohtl2 = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "rgb(0, 0, 245)",
    width: "3px",
    style: "solid"
  };

  const Ohtl3 = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "rgb(245, 0, 245)",
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
        field: "NPts_clus",
        legendOptions: {
          title: "Hukkunud loomi klastris"
        },
        stops: [
          {
            value: 15,
            label: "15",
            size: "30px"
          },
          {
            value: 10,
            label: "10",
            size: "25px"
          },
          {
            value: 5,
            label: "5",
            size: "17px"
          },
          {
            value: 2,
            label: "2",
            size: "10px"
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
            color: "rgb(0, 97, 0)"
          },
          {
            value: 0.4,
            color: "rgb(122, 171, 0)"
          },
          {
            value: 0.5,
            color: "rgb(255, 255, 0)"
          },
          {
            value: 0.6,
            color: "rgb(255, 153, 0)"
          },
          {
            value: 0.7,
            color: "rgb(255, 34, 0)"
          }
        ]
      }
    ]
  };

  const JooneRenderer = {
    type: "simple",
    field: "Strength",
    symbol: {
      type: "simple-line",
      color: "orange",
      outline: {
        color: "white"
      }
    },
    visualVariables: [
      {
        type: "size",
        field: "NPts_clus",
        legendOptions: {
          title: "Hukkunud loomi klastris"
        },
        stops: [
          {
            value: 15,
            label: "15",
            size: "11px"
          },
          {
            value: 10,
            label: "10",
            size: "9px"
          },
          {
            value: 5,
            label: "5",
            size: "7px"
          },
          {
            value: 2,
            label: "2",
            size: "5px"
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
            color: "rgb(0, 97, 0)"
          },
          {
            value: 0.4,
            color: "rgb(122, 171, 0)"
          },
          {
            value: 0.5,
            color: "rgb(255, 255, 0)"
          },
          {
            value: 0.6,
            color: "rgb(255, 153, 0)"
          },
          {
            value: 0.7,
            color: "rgb(255, 34, 0)"
          }
        ]
      }
    ]
  };

  function klastriPopup(feature) {
    var värviValik = function(){
      if (feature.graphic.attributes.strength <= 0.2) {
        return "rgb(0, 97, 0)"
      } else if (feature.graphic.attributes.strength > 0.2 && feature.graphic.attributes.strength <= 0.4) {
        return "rgb(122, 171, 0)"
      } else if (feature.graphic.attributes.strength > 0.4 && feature.graphic.attributes.strength <= 0.5) {
        return "rgb(255, 255, 0)"
      } else if (feature.graphic.attributes.strength > 0.5 && feature.graphic.attributes.strength <= 0.6) {
        return "rgb(255, 153, 0)"
      } else {
        return "rgb(255, 34, 0)"
      }
    }
    return (
      "<span style='line-height: 1.6;'><h4 style='font-size: 1.1rem'>Loomaõnnetuste klaster</h4>Klastri tugevus: "
      + "<span style='border-bottom: 3px solid "
      + (värviValik())
      + ";'>"
      + "{Strength}</span>"
      + "<br>Hukkunud suurulukeid klastris: {NPts_clus}<br>"
      + "Klastri pikkus: {Len_clus} m</span><br>"
      + "{tee_nimi}<br>(Maantee nr {tee_number})"
    );
  }

  var Klastripunktid = new FeatureLayer({
    url: "http://maps.hendrikson.ee/arcgis/rest/services/Hosted/Loomaõnnetused_analüüsi_tulemused/FeatureServer/0",
    title: "Loomaõnnetuste koondumiskohad e klastrid",
    outFields: ["*"],
    renderer: PunktiRenderer,
    definitionExpression: "Strength > 0.1",
    opacity: 0.8,
    popupTemplate: {
      content: klastriPopup,
      fieldInfos: [{
        fieldName: "Strength",
        format: {
          places: 2
        }
      },
      {
        fieldName: "Len_clus",
        format: {
          places: 0
        }
      },
      {
        fieldName: "tee_number",
        format: {
          digitSeparator: false
        }
      }]
    }
  });

  var Klastrijooned = new FeatureLayer({
    url: "http://maps.hendrikson.ee/arcgis/rest/services/Hosted/Loomaõnnetused_analüüsi_tulemused/FeatureServer/1",
    title: "Loomaõnnetuste koondumiskohad e klastrid",
    outFields: ["*"],
    visible: false,
    renderer: JooneRenderer,
    definitionExpression: "Strength > 0.1",
    popupTemplate: {
      content: klastriPopup,
      fieldInfos: [{
        fieldName: "Strength",
        format: {
          places: 2
        }
      },
      {
        fieldName: "Len_clus",
        format: {
          places: 0
        }
      },
      {
        fieldName: "tee_number",
        format: {
          digitSeparator: false
        }
      }]
    }
  });

  var Klastrid = new GroupLayer({
    title: "KDE+ analüüs",
    layers: [Klastripunktid, Klastrijooned],
    listMode: "hide-children"
  });

  map.add(Looduslikud);
  map.add(Klastrid);

  view.watch("scale", function(value){
    if (value >= 70000) {
      Klastrijooned.visible = false;
      Klastripunktid.visible = true;
    } else {
      Klastrijooned.visible = true;
      Klastripunktid.visible = false;
    }
  });
  view.ui.move("zoom", "top-right");

  //Slider

  let selectedStrength = 0.1;
  const strengthSlider = new Slider({
    container: "slider",
    min: 0,
    max: 0.8,
    steps: 0.05,
    values: [selectedStrength],
    snapOnClickEnabled: false
  });

  Klastrid.when(function() {
    strengthSlider.on(["thumb-drag"], strengthValueChanged);

    function strengthValueChanged(event) {
      selectedStrength = event.value;
      document.getElementById(
        "strength-display"
      ).innerHTML = selectedStrength.toLocaleString();
      // update the layers after the user stops the slider to avoid continues requests

      if (event.state === "stop") {
        Klastripunktid.definitionExpression = "Strength > " + selectedStrength;
        Klastrijooned.definitionExpression = "Strength > " + selectedStrength;
      }
    }
  });

  //Kursoriga info klastri kohta

  view.when().then(function() {
    // Create a default graphic for when the application starts
    const graphic = {
      popupTemplate: {
        content: "<span style='font-weight: bold'>Liigu kursoriga üle huvipakkuva klastri...</span>"
      }
    };

    // Provide graphic to a new instance of a Feature widget
    const feature = new Feature({
      graphic: graphic,
      view: view,
      container: "klastriinfo"
    });

    let cursorMove = function(layerView) {
      let highlight;
      // listen for the pointer-move event on the View
      view.on("pointer-move", function(event) {
        view.hitTest(event).then(function(event) {
          // Make sure graphic has a popupTemplate
          let results = event.results.filter(function(result) {
            return result.graphic.layer.popupTemplate;
          });
          let result = results[0];
          highlight && highlight.remove();
          // Update the graphic of the Feature widget
          // on pointer-move with the result
          if (result) {
            feature.graphic = result.graphic;
            highlight = layerView.highlight(result.graphic);
          } else {
            feature.graphic = graphic;
          }
        });
      });
    };
    view.whenLayerView(Klastrijooned).then(cursorMove);
    view.whenLayerView(Klastripunktid).then(cursorMove);
  });

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
    sources: [
    {
    locator: new Locator("//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
    singleLineFieldName: "SingleLine",
    outFields: ["Addr_type"],
    name: "Otsi aadressi järgi",
    localSearchOptions: {
      minScale: 300000,
      distance: 50000
    },
    placeholder: "Sisesta kohanimi/aadress",
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
