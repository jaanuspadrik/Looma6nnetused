require([
  "esri/Map",
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
  "esri/geometry/Extent",
  "esri/config"
], function(Map, WebMap, MapView, VectorTileLayer, MapImageLayer, FeatureLayer, WMSLayer, GroupLayer, PopupTemplate, Legend, Expand, LayerList, Fullscreen, Search, Locator, Home, DistanceMeasurement2D, AreaMeasurement2D, Extent, esriConfig) {

  esriConfig.portalUrl = "https://maps.hendrikson.ee/arcgis/";

  var map = new WebMap({
    portalItem: {
      id: "c7d719fba1724641a590a80905279865"
    }
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [24.68, 59.29],
    zoom: 11,
    constraints: {
      minZoom: 11
    }
  });

  view.watch("scale", function(value) {
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
  });

  /*var labelClass = {
    symbol: {
      type: "text",
      horizontalAlignment: "right",
      color: "#454f8a",
      haloColor: "white",
      haloSize: "1px",
      font: {
        family: "Arial",
        size: 8,
        weight: "bold"
      }
    },
    labelExpressionInfo: {
      expression: "'Ol.ol. el. arv: ' + Floor($feature.Olol_el_ar, 0) + TextFormatting.NewLine + 'Lisanduv el. arv: ' + Floor($feature.Lis_el_ar, 0)"
    }
  };

  var Piirkonnad = new FeatureLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Hosted/Saku_ÜP_elanike_arvu_analüüs_algne/FeatureServer/0",
    title: "Elanike arvu analüüs - aprill 2019 (lisanduva elanikkonna arvutamiseks jagati hoonestamata pere- ja ridaelamu maa-ala 3000 m2-ga ning korrutati saadud kruntide arv 2,4-ga. Korterelamute puhul olid vastavad väärtused 200 m2 ja 2,4.)",
    visible: false,
    opacity: 0.6,
    labelingInfo: [labelClass],
    outFields: ["*"]
  });

  var Piirkonnad2 = new FeatureLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Hosted/Saku_ÜP_elanike_arvu_analüüs/FeatureServer/0",
    title: "Elanike arvu analüüs - korrigeeritud eskiislahenduse põhjal, juuni 2019 (lisanduva elanikkonna arvutamiseks jagati hoonestamata pere- ja ridaelamu maa-ala 3000 m2-ga ning korrutati saadud kruntide arv 2,4-ga. Korterelamute puhul olid vastavad väärtused 200 m2 ja 2,4.)",
    visible: false,
    opacity: 0.6,
    labelingInfo: [labelClass],
    outFields: ["*"]
  });
  */

  var Vallapiir = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: "Saku valla piir",
    listMode: "hide",
    sublayers: [
    {
      id: 0,
      title: " "
    }]
  });

  var Tiheasustus = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: "Tiheasustusega ala",
    listMode: "hide-children",
    visible: true,
    opacity: 1,
    sublayers: [
    {
      id: 15,
      title: " ",
      popupTemplate: {
        title: "Tiheasustusega ala"
      }
    }]
  });

  var Maakasutus = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: "Kavandatav maakasutus",
    visible: true,
    opacity: 0.7,
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
      id: 13,
      title: "Äri- ja teenindusettevõtte ning tootmis- ja logistikakeskuse maa-ala (ÄT)",
      popupTemplate: {
        title: "Äri- ja teenindusettevõtte ning tootmis- ja logistikakeskuse maa-ala"
      }
    }]
  });

  var Ettepanekud = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: "Protsessi käigus esitatud ettepanekud maakasutuse määramiseks",
    listMode: "hide-children",
    visible: true,
    opacity: 1,
    sublayers: [
    {
      id: 17,
      title: " ",
      popupTemplate: {
        title: "Ettepanek: {Sisu}"
      }
    }]
  });

  var Katastripiirid = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_katastripiirid/MapServer",
    title: "Katastriüksuste piirid",
    listMode: "hide",
    visible: false,
    legendEnabled: false,
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

  const KatasterWms = new WMSLayer ({
    url: "https://kaart.maaamet.ee/wms/alus?service=WMS&version=1.3.0&request=GetCapabilities",
    title: "Katastriüksused",
    listMode: "hide-children",
    visible: true,
    sublayers: [{
      name: "TOPOYKSUS_6569"
    },
    {
      name: "TOPOYKSUS_6571"
    }]
  });

  var Planeeritav = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_muu_planeeritav/MapServer",
    title: "Üldplaneeringuga kavandatav",
    visible: true,
    minScale: 50000,
    sublayers: [
    /*{
      id: 39,
      title: "Väärtuslik põllumaa maakonnaplaneeringust",
      popupTemplate: {
        title: "Väärtuslik põllumaa maakonnaplaneeringust"
      }
    },*/
    {
      id: 38,
      title: "Väärtuslik põllumaa",
      popupTemplate: {
        title: "Väärtuslik põllumaa"
      }
    },
    {
      id: 36,
      title: "Rohelise võrgustiku koridor",
      popupTemplate: {
        title: "Rohelise võrgustiku koridor"
      }
    },
    {
      id: 37,
      title: "Rohelise võrgustiku tuumala",
      popupTemplate: {
        title: "Rohelise võrgustiku tuumala"
      }
    },
    {
      id: 35,
      title: "Rohelise võrgustiku konfliktala",
      popupTemplate: {
        title: "Rohelise võrgustiku konfliktala"
      }
    },
    {
      id: 46,
      title: "Miljööväärtuslik hoonestusala",
      popupTemplate: {
        title: "Miljööväärtuslik hoonestusala"
      }
    },
    {
      id: 53,
      title: "Hoonestuseks sobimatu ala",
      popupTemplate: {
        title: "Hoonestuseks sobimatu ala"
      }
    },
    {
      id: 45,
      title: "Avatud loodusmaastikuga ala",
      popupTemplate: {
        title: "Avatud loodusmaastikuga ala"
      }
    },
    {
      id: 34,
      title: "Perspektiivne raudtee",
      popupTemplate: {
        title: "Perspektiivne raudtee"
      }
    },
    {
      id: 33,
      title: "Riigikaitselise ehitise piiranguvöönd",
      popupTemplate: {
        title: "Riigikaitselise ehitise piiranguvöönd"
      }
    },
    {
      id: 32,
      title: "Kalmistu maa-ala kaitsevöönd",
      popupTemplate: {
        title: "Kalmistu maa-ala kaitsevöönd"
      }
    },
    {
      id: 31,
      title: "Planeeringuga määratud perspektiivne või rekonstrueeritav põhimõtteline raudteekoridor",
      popupTemplate: {
        title: "Planeeringuga määratud perspektiivne või rekonstrueeritav põhimõtteline raudteekoridor"
      }
    },
    {
      id: 30,
      title: "Planeeringuga määratud perspektiivne või rekonstrueeritav, sh oluliselt muudetav põhimõtteline maanteekoridor",
      popupTemplate: {
        title: "Planeeringuga määratud perspektiivne või rekonstrueeritav, sh oluliselt muudetav põhimõtteline maanteekoridor"
      }
    },
    {
      id: 29,
      title: "Planeeringuga määratud perspektiivne põhimõtteline raudtee- ja maanteekoridor",
      popupTemplate: {
        title: "Planeeringuga määratud perspektiivne põhimõtteline raudtee- ja maanteekoridor"
      }
    },
    {
      id: 28,
      title: "Perspektiivne tee",
      popupTemplate: {
        title: "Perspektiivne tee"
      }
    },
    /*{
      id: 27,
      title: "Kergliiklustee",
      popupTemplate: {
        title: "Kergliiklustee"
      }
    },*/
    {
      id: 26,
      title: "Perspektiivne kergliiklustee",
      popupTemplate: {
        title: "Perspektiivne kergliiklustee"
      }
    },
    {
      id: 25,
      title: "Suusa-matkarada",
      popupTemplate: {
        title: "Suusa-matkarada"
      }
    },
    {
      id: 47,
      title: "Tallinna lähiala rohelise võrgustiku piir",
      popupTemplate: {
        title: "Tallinna lähiala rohelise võrgustiku piir"
      }
    },
    {
      id: 48,
      title: "Ehituskeeluvööndi vähendamise ettepanek",
      popupTemplate: {
        title: "Ehituskeeluvööndi vähendamise ettepanek"
      }
    },
    {
      id: 53,
      title: "Asustusüksuse piiri muudatusettepanek",
      popupTemplate: {
        title: "Asustusüksuse piiri muudatusettepanek"
      }
    },
    {
      id: 49,
      title: "Jalakäijate peatänav",
      popupTemplate: {
        title: "Jalakäijate peatänav"
      }
    },
    {
      id: 50,
      title: "Promenaad",
      popupTemplate: {
        title: "Promenaad"
      }
    },
    {
      id: 24,
      opacity: 0.6,
      title: "Planeeringuga määratud Rail Baltic raudtee trassi nihutamisruum",
      popupTemplate: {
        title: "Planeeringuga määratud Rail Baltic raudtee trassi nihutamisruum"
      }
    },
    {
      id: 23,
      title: "Rail Baltic raudtee trassi kaitsevöönd",
      popupTemplate: {
        title: "Rail Baltic raudtee trassi kaitsevöönd"
      }
    },
    {
      id: 22,
      title: "Rail Baltic raudtee trassi telgjoon",
      popupTemplate: {
        title: "Rail Baltic raudtee trassi telgjoon"
      }
    },
    {
      id: 21,
      title: "Eritasandiline ristumine teega/rööbasteega",
      popupTemplate: {
        title: "Eritasandiline ristumine teega/rööbasteega"
      }
    },
    {
      id: 20,
      title: "Eritasandiline ristumine perspektiivse teega",
      popupTemplate: {
        title: "Eritasandiline ristumine perspektiivse teega"
      }
    },
    {
      id: 19,
      title: "Eritasandiline ristumine jalg- ja/või jalgrattateega",
      popupTemplate: {
        title: "Eritasandiline ristumine jalg- ja/või jalgrattateega"
      }
    },
    {
      id: 18,
      title: "Eritasandiline ristumine vooluveekoguga",
      popupTemplate: {
        title: "Eritasandiline ristumine vooluveekoguga"
      }
    },
    {
      id: 17,
      title: "Müra leevendusvajadusega alad",
      popupTemplate: {
        title: "Müra leevendusvajadusega alad"
      }
    },
    {
      id: 16,
      title: "Rail Baltic raudtee ehitamisest tingitud kavandatav/ümberehitatav tee",
      popupTemplate: {
        title: "Rail Baltic raudtee ehitamisest tingitud kavandatav/ümberehitatav tee"
      }
    },
    /*{
      id: 15,
      title: "Planeeringuga määratud perspektiivne põhimõtteline gaasitrassi koridor",
      popupTemplate: {
        title: "Planeeringuga määratud perspektiivne põhimõtteline gaasitrassi koridor"
      }
    },*/
    {
      id: 14,
      title: "Planeeringuga määratud perspektiivne põhimõtteline kõrgepingeliini koridor",
      popupTemplate: {
        title: "Planeeringuga määratud perspektiivne põhimõtteline kõrgepingeliini koridor"
      }
    },
    {
      id: 13,
      title: "Perspektiivne kergliiklustee riste",
      popupTemplate: {
        title: "Perspektiivne kergliiklustee riste"
      }
    },
    {
      id: 12,
      title: "Eritasandiline liiklussõlm",
      popupTemplate: {
        title: "Eritasandiline liiklussõlm"
      }
    },
    /*{
      id: 11,
      title: "Olemasolev kergliiklustee riste",
      popupTemplate: {
        title: "Olemasolev kergliiklustee riste"
      }
    },
    {
      id: 52,
      title: "Ohtlike ettevõtete ohuala",
      popupTemplate: {
        title: "Ohtlike ettevõtete ohuala"
      }
    },
    {
      id: 51,
      title: "Ohtlikud ettevõtted",
      popupTemplate: {
        title: "Ohtlik ettevõte"
      }
    },
    {
      id: 10,
      title: "Olemasolev kergliiklussild",
      popupTemplate: {
        title: "Olemasolev kergliiklussild"
      }
    },*/
    {
      id: 9,
      title: "Perspektiivne kergliiklussild",
      popupTemplate: {
        title: "Perspektiivne kergliiklussild"
      }
    },
    {
      id: 8,
      title: "Suurimetajate läbipääsu piirkond",
      popupTemplate: {
        title: "Suurimetajate läbipääsu piirkond"
      }
    },
    {
      id: 7,
      title: "Ökodukti eeldatav asukoht",
      popupTemplate: {
        title: "Ökodukti eeldatav asukoht"
      }
    },
    {
      id: 6,
      title: "Perspektiivne loomatunnel",
      popupTemplate: {
        title: "Perspektiivne loomatunnel"
      }
    },
    {
      id: 5,
      title: "Perspektiivne kohalik peatus Rail Baltic trassil",
      popupTemplate: {
        title: "Perspektiivne kohalik peatus Rail Baltic trassil"
      }
    },
    {
      id: 4,
      title: "Perspektiivne rongipeatus",
      popupTemplate: {
        title: "Perspektiivne rongipeatus"
      }
    },
    /*{
      id: 3,
      title: "Olemasolev rongipeatus",
      popupTemplate: {
        title: "Olemasolev rongipeatus"
      }
    },*/
    {
      id: 2,
      title: "Likvideeritav juurdepääs",
      popupTemplate: {
        title: "Likvideeritav juurdepääs"
      }
    },
    {
      id: 1,
      title: "Kaitsehaljastus",
      popupTemplate: {
        title: "Kaitsehaljastus"
      }
    },
    {
      id: 0,
      title: "Perspektiivne autosild",
      popupTemplate: {
        title: "Perspektiivne autosild"
      }
    },
    {
      id: 40,
      title: "Perspektiivne supelrand",
      popupTemplate: {
        title: "Perspektiivne supelrand"
      }
    },
    {
      id: 41,
      title: "Perspektiivne supluskoht",
      popupTemplate: {
        title: "Perspektiivne supluskoht"
      }
    },
    {
      id: 42,
      title: "Perspektiivne kompostimisväljak",
      popupTemplate: {
        title: "Perspektiivne kompostimisväljak"
      }
    },
    /*{
      id: 44,
      title: "Jäätmepunkt",
      popupTemplate: {
        title: "Jäätmepunkt"
      }
    },*/
    {
      id: 43,
      title: "Perspektiivne jäätmepunkt",
      popupTemplate: {
        title: "Perspektiivne jäätmepunkt"
      }
    }]
  });

  var VäärtPõllumaa = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_ÜP_muu_planeeritav/MapServer",
    title: "Väärtuslike põllumajandusmaade kiht maakonnaplaneeringust",
    listMode: "hide-children",
    visible: true,
    minScale: 50000,
    sublayers: [
    {
      id: 39,
      title: " ",
      popupTemplate: {
        title: "Väärtuslik põllumaa maakonnaplaneeringust"
      }
    }]
  });

  var Mask = new MapImageLayer({
    url: "https://maps.hendrikson.ee/arcgis/rest/services/Saku_ÜP/Saku_vald_maakasutus/MapServer",
    title: " ",
    legendEnabled: false,
    listMode: "hide",
    visible: true,
    sublayers: [
    {
      id: 1,
      title: "Mask",
      opacity: 0.6
    }]
  });

  var Wms = new WMSLayer ({
    url: "https://kaart.maaamet.ee/wms/fotokaart?service=WMS&version=1.3.0&request=GetCapabilities",
    title: "Ortofoto",
    listMode: "hide-children",
    visible: false,
    sublayers: [{
      name: "EESTIFOTO"
    }]
  });


  map.add(Wms);
  map.add(VäärtPõllumaa)
  map.add(Maakasutus);
  map.add(Katastripiirid);
  map.add(KatasterWms);
  map.add(Tiheasustus);
  map.add(Planeeritav);
  map.add(Ettepanekud);
  map.add(Mask);
  map.add(Vallapiir);

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
  }
});
