/* UI + Cesium rendering. Movement rules live in flight-core.js. */
(() => {
 const $ = id => document.getElementById(id);
 if (typeof Cesium === 'undefined') { $('message').textContent='Cesium did not load. Check your internet connection or CDN access.'; return; }
 let state = Flight.initial();
 try {
 const viewer = new Cesium.Viewer('globe', {
   baseLayer:false, baseLayerPicker:false, geocoder:false, animation:false,
   timeline:false, homeButton:false, sceneModePicker:false, navigationHelpButton:false,
   fullscreenButton:false, infoBox:false, selectionIndicator:false,
   terrainProvider:new Cesium.EllipsoidTerrainProvider()
 });
 // Public satellite basemap; may require internet access and provider availability.
 viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
   url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
   credit:'Imagery: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
   maximumLevel:19
 }));
 const position = () => Cesium.Cartesian3.fromDegrees(state.lon, state.lat, state.height);
 const plane = viewer.entities.add({
   position: new Cesium.CallbackProperty(position, false),
   point:{pixelSize:16,color:Cesium.Color.GOLD,outlineColor:Cesium.Color.BLACK,outlineWidth:2},
   label:{text:'SPORTS MEDIA CAMERA',font:'14px sans-serif',pixelOffset:new Cesium.Cartesian2(0,-28),showBackground:true}
 });
 viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(-75.9348699539101,40.30778341166797,0),
   point:{pixelSize:10,color:Cesium.Color.WHITE},
   label:{text:'Alvernia Turf Field',font:'14px sans-serif',pixelOffset:new Cesium.Cartesian2(0,22),showBackground:true}});
 // Alvernia Turf Field is behind the PEC at 920 Laverna Drive.
 // Field center coordinates supplied from a map pin; not a surveyed position.
 const fieldArea = Cesium.Cartesian3.fromDegrees(-75.9348699539101,40.30778341166797,0);
 viewer.entities.add({position:fieldArea,
   label:{text:'ALVERNIA TURF FIELD',font:'13px sans-serif',
     pixelOffset:new Cesium.Cartesian2(0,38),showBackground:true}});
 function fieldView(){
   state.paused=true;paint();
   viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(-75.9348699539101,40.30778341166797,650),
     orientation:{heading:0,pitch:Cesium.Math.toRadians(-65),roll:0},duration:1.3});
 }
 $('fieldView').onclick=fieldView;
 function paint(){
   $('message').textContent=state.paused?'Paused — ready to inspect':'Flying — simulated movement';
   $('readout').textContent=`Heading ${state.heading.toFixed(0)}° · Longitude ${state.lon.toFixed(5)} · Latitude ${state.lat.toFixed(5)} · Height ${state.height.toFixed(0)} m · Speed ${state.speed.toFixed(0)} m/s`;
 }
 function follow(){viewer.camera.lookAt(position(),new Cesium.HeadingPitchRange(Cesium.Math.toRadians(state.heading),Cesium.Math.toRadians(-30),2500));}
 $('fly').onclick=()=>{state.paused=false;paint();};
 $('pause').onclick=()=>{state.paused=true;paint();};
 $('left').onclick=()=>{state.heading=Flight.wrap(state.heading-10);paint();follow();};
 $('right').onclick=()=>{state.heading=Flight.wrap(state.heading+10);paint();follow();};
 $('reset').onclick=()=>{state=Flight.initial();$('speed').value=state.speed;$('height').value=state.height;paint();follow();};
  $('coverage').onclick=()=>{
  state.speed=40;
  state.height=300;
  $('speed').value=40;
  $('height').value=300;
  state.paused=true;
  paint();
  fieldView();
};
 for(const [id,min,max] of [['speed',0,250],['height',50,5000]]){
   $(id).onchange=()=>{const n=Number($(id).value);if(Number.isFinite(n))state[id]=Flight.clamp(n,min,max);$(id).value=state[id];paint();follow();};
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden){state.paused=true;paint();}});
 let last=performance.now(),lastPaint=0;
 viewer.scene.preRender.addEventListener(()=>{
   const now=performance.now(), dt=Math.min((now-last)/1000,0.1);last=now;
   state=Flight.step(state,dt);
   if(!state.paused)follow();
   if(now-lastPaint>150){paint();lastPaint=now;}
 });
 paint();fieldView();
 }catch(error){$('message').textContent='The globe could not start. Check WebGL support and the browser console.';console.error(error);}
})();
