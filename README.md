# AI 101 — CesiumJS Flight Lab

This is an original teaching starter: a steerable moving point, not a realistic aircraft simulator.

## Run
Upload all files in this folder to the root of a public GitHub repository. In Settings → Pages choose Deploy from a branch, main, /(root). Open the site URL after deployment. Alternatively serve this folder with your editor's local web server. If Python is already installed: `python -m http.server 8000`, then open http://localhost:8000.

Internet and WebGL are required. CesiumJS 1.145 and its matching CSS load from Cesium's CDN. No build step, Node installation, or ion token is needed. Satellite imagery is requested from an external Esri tile service; availability and usage terms are controlled by the provider. Keep Cesium's on-screen credits visible.

## Controls
Fly starts motion; Pause stops it. Left/Right change heading by 10 degrees. Speed is 0–250 meters/second; height is 50–5000 meters above the model ellipsoid. Height changes instantly: this starter does not simulate climbing. Reset restores the paused initial state. Switching to another browser tab pauses the app. On returning, press Fly again. The camera follows while flying.

## Test
Open tests.html on the same site. Also perform the six manual checks on Canvas page 05. Optional developer command: `node -e "require('./flight-core.js');require('./tests.js')"`.

## Model and geography
Uses spherical destination-point math with Earth radius 6,371,000 m, displayed on Cesium's ellipsoid globe. This approximation is for learning. Heading remains constant between clicks. Frame dt is capped at 0.1 s to prevent large jumps after stalls, so low frame rates can slow simulated time. There is no lift, drag, bank, pitch, collision, real terrain, flight data, or navigation accuracy. The marker is a point, not an aircraft model. Satellite basemap tiles provide geographic context but are not live imagery.
The approximate origin (-75.93, 40.33) is a Reading-area teaching reference, NOT a surveyed Alvernia Turf Field coordinate. The field is listed at 920 Laverna Drive, behind the PEC; verify the field position visually before describing the marker as the exact field location. Validate real location claims separately.

## New aerial map adaptation
The blue grid was replaced with a satellite imagery layer and a Field Aerial View button. The camera starts in an aerial view of the approximate Alvernia campus area. Coverage View pauses motion and returns to the aerial view. Imagery is external and may not load if its service is unavailable. No photorealistic 3D structures are promised.

Official field location: https://auwolves.com/facilities/turf-field/152
Imagery: Esri World Imagery (see provider attribution on the map).

## Student additions

**Audience and purpose:**  
I adapted the Flight Lab for students and professionals interested in communications and sports media. The purpose is to demonstrate how a simulated aerial perspective could be used when thinking about sports event coverage.

**Feature changed:**  
I renamed the project “Sports Media Flight Lab” and added a Coverage View button. The Coverage View changes the simulator's speed and height and moves the camera to a different perspective for viewing the simulated flight.

**AI assistance accepted/rejected:**  
I used AI to help plan the sports media adaptation, identify which HTML and JavaScript files needed to be changed, and debug the project. I accepted suggestions only after testing them in the published site. I did not assume AI-generated code was correct without checking the results.

**Tests and evidence:**  
I completed the manual Flight Lab checks and ran tests.html. All seven automated movement checks passed. For the break-and-repair exercise, I intentionally changed `const distance = state.speed * dt;` to `const distance = state.speed;`. The duration consistency test failed as predicted. I restored `* dt`, ran the tests again, and all seven tests passed. Screenshots were saved as evidence of the failed and repaired tests.

**Partner reproduction feedback:**  
Partner: Hannah Tyler (Roommate).  
Feedback/result: Successfully opened the published project and tested the Coverage View button. The feature worked as expected.

**Geographic/API sources:**  
The starter uses the approximate coordinates (-75.93, 40.33) as a Reading-area classroom reference. I treated this as a simulated teaching origin rather than a verified Alvernia University location. CesiumJS documentation was used as the reference for the Cesium components used by the starter.

**Known limitations:**  
This project is a simulation and does not represent real aircraft physics or actual sports coverage conditions. It does not model lift, drag, collisions, real terrain, or real flight data. The Coverage View is a simulated perspective rather than an actual camera or aircraft view.

## References
https://cesium.com/learn/cesiumjs-learn/
https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html
https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html
https://cesium.com/learn/cesiumjs/ref-doc/GridImageryProvider.html

CesiumJS is an external dependency with its own license and notices. It is not bundled in this resource ZIP.
