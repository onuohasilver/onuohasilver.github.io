'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  ".git/COMMIT_EDITMSG": "448a611e90ae2754539592093324ff3c",
".git/config": "7b240b43f4135b11c66a82f6b21328a1",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/FETCH_HEAD": "e5cd5b8605d48d3bdc32ae99c4e0516c",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "ea587b0fae70333bce92257152996e70",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "3c5989301dd4b949dfa1f43738a22819",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/update.sample": "7bf1fcc5f411e5ad68c59b68661660ed",
".git/index": "fc9c19b3c387c21837677bfc23e7bd23",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "5140ea1d36385383debe03102d854f73",
".git/logs/refs/heads/master": "5140ea1d36385383debe03102d854f73",
".git/logs/refs/remotes/origin/master": "4adeb846ba90f243abfb3dcc893109a2",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/04/1000a34911eea987930821662d3a27fa5375c3": "545ecd60a7b681ef05dc6ba27f85c517",
".git/objects/0c/dd72fdcdc6e5fbe992b487b882fc14bd3b100e": "dc95861c9c7a2ff33d0c7a01292f7f1e",
".git/objects/0d/0df08f7c3e147a8ae36017cf81a96e35b73717": "106e868f28a72727fb6fb0fa71123633",
".git/objects/1f/558beea6404b2eca250f8a280031f238de8b8d": "28882749de82367122eee612a25ba515",
".git/objects/24/b1f14dd348b07c9b8373758bde9ac14d16fd92": "dbf45d6c044044561758a334420e9569",
".git/objects/2b/90bd6fe4af6e76635391df458605f24542018a": "5347dafe727b3edf5cc97a759e51e1e5",
".git/objects/2d/cf3542c874e33cd8ab86ceb6f0ec444228aa78": "66baad0ae5d874f09b6eee790095bc65",
".git/objects/32/46ad559eeae0370195978eaed83f1053ee13fd": "a043dbc0a0bda96ce2127799ccc27506",
".git/objects/32/9ea8b41844aa9e39c87d84c2156fe3694d2197": "dbd10375f7b7cc9b24d045ec98891cf6",
".git/objects/3a/badf74919014ff3538266423c485cd82c784b9": "37069834274d8f9f5ad2b3522e09e8d8",
".git/objects/3b/062ae493b7675532ac6159692f194264f66a97": "7a8bd4013fabff7776da665d4f147ea8",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/46/b858592f1ed7099dc4cb0024ba3c8012195a9c": "50e33a1407e12a168864302f334f84b1",
".git/objects/47/12ed45a6586c74f75c51c85298c22d60a601ac": "4997b4fae700665052f7feaeaed6e3cb",
".git/objects/4e/89617a3696bd10c155ec378f4a65a9f89e9e3a": "d8056e20bae90d092b619c895129e982",
".git/objects/62/129e0c163887b543f90419ff3d3be867c11ccd": "52f934952b07ccaf1ae4b7a67b00e98d",
".git/objects/6f/d6084e964180f1366b5124c79a8ccdc6812f5b": "a559ecb37ad439eabe0c73f002e54fc3",
".git/objects/76/8651b2e249c2517c7b37bdbeea0a5d8bfbb707": "495b1c4fefa633f6afe4dc5840ebe18f",
".git/objects/77/87e113bea326085a984a24a76a983136edd3c8": "7bc96698448f678664b337af609d1bb4",
".git/objects/79/a2e84938b67bdedd178067494e022dd271fcdb": "c3059e06884497ddd9dff6450b9df79a",
".git/objects/79/ba7ea0836b93b3f178067bcd0a0945dbc26b3f": "f3e31aec622d6cf63f619aa3a6023103",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8b/1c89fa30d925d6c857153202ba1f17b1fa320f": "762f978ff7900fae63d94fcdd80f09dd",
".git/objects/8d/fe6ccdfcf6cb9621eb151a49b388e6356b4115": "3089853470b6aa692c7833ed447179f9",
".git/objects/98/c9e75b796f9c020aa523606d7d9fb67e174368": "bc7053fef71e9ea8bcda22fccaf6bceb",
".git/objects/a1/3837a12450aceaa5c8e807c32e781831d67a8f": "bfe4910ea01eb3d69e9520c3b42a0adf",
".git/objects/a8/beffd3ad4fe54d6cabccf83a05477d6a986cd0": "6677888e4a051c7838b5b240c09f0981",
".git/objects/ab/0e98497a51ead7821d1da35a24968ff314e50f": "557c35fe3928eb2af403d1b3926bb9ba",
".git/objects/ac/fe9c50d22869fc849d20065bae71e927b27668": "99e009b152722227c587878bddcae1ff",
".git/objects/b4/bf6c36f933da27f1e7504dff1ba0eb39135234": "befe63c17501ee22991e2038c7509fe3",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/bd/61746672367fbc31d39e5c8aea6dd990e868f3": "d7eef6c67fa5e0e354b5adcffa246bd3",
".git/objects/be/af8f76785b1fdd0960a14e02eb4238d6478f2b": "dbd71698f1a2faef746df6c76620a2c0",
".git/objects/c2/5d0a5e78cd402d838dbeb9cbcfce05bdd9e312": "50e5b2ddabeb5860c05e7b65b0d05ebc",
".git/objects/c8/439b200838c12caabbbeaaef957acb93639fa9": "20b5c65e95626d5b166b1faed2ce1c97",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/d8/2d6a23567b39c07bc6f820d0bf85da593f17be": "3fee12e6d6b2715684994de462d64ca2",
".git/objects/d8/8ea3917cf9c1d6dbe9f9439794e94c0246bb6c": "52c1bd7b05dec49ac018f3f371c10b05",
".git/objects/de/3ba95640eabb79a849e1efb236160ae9d9852e": "a0aa8d5261ea4147bf84a0779cf058aa",
".git/objects/e3/bf6299bdbef5fdecf2660bc875f53c68ae575f": "01e64a88b03661fdc4c57ba3a98700e1",
".git/objects/e5/951dfb943474a56e611d9923405cd06c2dd28d": "c6fa51103d8db5478e1a43a661f6c68d",
".git/objects/e7/3fed67f51852a47b02d3579ec84110524eb778": "857a4aa705ea52c589e946a145a1f088",
".git/objects/e9/e575d0b36ebd696294496017834c26b62e1505": "8eca52e53d59927cc7c00a13888ea67b",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f3/2c7ef2985092743932053f24d2e07cd853d01f": "b7a902be000bf7f0ae23215136fe904b",
".git/objects/f6/0db62014e1487b06579f78b13dddb6088b0a71": "0e657a40a06f55f4186129ae3844e723",
".git/objects/f6/d5246d656eb652b7585fa56069859c20959870": "7d0f30a5ecd8ad55caea7818295316d3",
".git/ORIG_HEAD": "9f3b9729160d41050dfd29a996b3c859",
".git/refs/heads/master": "9f3b9729160d41050dfd29a996b3c859",
".git/refs/remotes/origin/master": "9f3b9729160d41050dfd29a996b3c859",
"assets/AssetManifest.json": "dfbcd9ac8f33db1d7e773749401cc50e",
"assets/assets/doo.png": "a39d1bfdedbad86d55285af632be436f",
"assets/assets/Insta2.jpg": "0f370f6962d7cfc9a56ec0acbd0e07d3",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "5915ac5eb94e917194352b7f22a885f5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "fce9db2df74594c8f0a986a0fa062b0b",
"/": "fce9db2df74594c8f0a986a0fa062b0b",
"main.dart.js": "26aeec978cb11bffb9b223e83c2b2d16",
"manifest.json": "901c5fa508f965fe7e280ba36e8b1eeb",
"version.json": "cf1362020e60627e05bfae19b64c205e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
