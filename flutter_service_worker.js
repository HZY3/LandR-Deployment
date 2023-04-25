'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"version.json": "40ae8bb17622a0945d1cec326488dc4e",
"assets/src/contracts/Land.json": "7c0cd90620bd73450cf78a188e43d33b",
"assets/assets/background_svg.svg": "7155ca382e672aedb3b3120330323560",
"assets/assets/bg4.jpg": "b7a766d85fadb438aa177cfefebfa908",
"assets/assets/auth.svg": "b63a33cb60c899c5a988f1364c6a284d",
"assets/assets/github-logo.png": "ec3a60c8c6539a07eb70b52f6737ea6e",
"assets/assets/user_icon.png": "61c1ea38243a513128c9006e51b145e3",
"assets/assets/contract_owner_icon.jpg": "0152bb0c25e20bf5d5a63f29d3b88a77",
"assets/assets/background.svg": "8150050b661f5e9fb2a5c18c85e3634b",
"assets/assets/land_ins_icon.jpg": "0072eab0d4cddbddd97cbe9877d0dc92",
"assets/assets/Landr.png": "25120eaf9df83ff640f20fb9e6560164",
"assets/assets/splash.png": "55f5ff8a3236415d9a8f65cca64fbe59",
"assets/assets/background.jpg": "2b6d624932658a7c85cfd560a7a13346",
"assets/assets/cover.png": "250cbc10de63d94af659027bbc0b612d",
"assets/assets/bg2.jpg": "a145979274f5330ffacebc71807f247e",
"assets/assets/bg3.jpg": "0e7408e2442c7d6f10de58f691c36c80",
"assets/assets/bg5.jpg": "0ffe7e8e14638a3312dc25c0430704c6",
"assets/assets/bg6.jpg": "821fbee5483be273b1ca1a454241a795",
"assets/assets/bg8.jpg": "a16ab7c263e41ffa5842bc82c3c9d4cb",
"assets/assets/bg9.jpg": "5b05065b745dd03e20368c4d9f23ee49",
"assets/assets/bg7.jpg": "1b48b60de11eb448d3d8ab406f4c7db7",
"assets/assets/bg10.jpg": "b3c11a8d26cabdebc35dda9f6e4d7e09",
"assets/assets/wallet.png": "3090f6aca29c5dff67fb44180e86584e",
"assets/assets/landimg.jpg": "8375130ae47c0f9f09782af0b73c80b6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/NotoSansJP-Thin.otf": "e2b92248795c0cd02d9858aaf2a12ec2",
"assets/fonts/NotoSansJP-Regular.otf": "ecfed48e463db4e31d1691c8af367730",
"assets/fonts/NotoSansJP-Medium.otf": "d6c74d39a44c519ff736ac55e5d28a46",
"assets/fonts/NotoSansJP-Bold.otf": "e463c4b3a2d7fbfb917831767da8c24f",
"assets/fonts/NotoSansJP-Black.otf": "5ce4631ec833cd0011936d5653fbd144",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/AssetManifest.json": "8d800138ab09c0321847cb55323088fb",
"assets/FontManifest.json": "d1652539381a75afd3bfa8164eb5e97f",
"assets/NOTICES": "d1ccf19857f3c61ff1fb3c1ed333d09c",
"index.html": "425c5a35056ecb963d941e0a64420504",
"/": "425c5a35056ecb963d941e0a64420504",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/splash.png": "55f5ff8a3236415d9a8f65cca64fbe59",
"main.dart.js": "d4b6eae0476759d96590f3c450f5df0a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "a59dea08b9b2f59482d88893cabcc6a9",
"index.css": "99ef1f683acb9fd1129c4afffb985084"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
