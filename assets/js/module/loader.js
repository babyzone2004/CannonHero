

// Image loading
var resLoaded = 0;
var resLength;
var loadingCb = function() {};
var completeCb = function() {};

// This method is called by loadImage() when
// an image loads successfully.
function loadedCallBack () {
   resLoaded++;
   loadingCb(Math.floor(100 * resLoaded / resLength));
   if(resLoaded === resLength) {
    completeCb();
   }
}

// Loads a particular image
function loadImage (imageUrl) {
   var image = new Image();
   image.src = imageUrl;
   image.addEventListener('load',
      function (e) {
        console.log(image);
         loadedCallBack(); 
      });
   image.addEventListener('error',
      function (e) {
         loadImage(imageUrl);
      });
}

function loadAudio (url) {
   var audio = new Audio(url);
   audio.addEventListener('canplaythrough',
      function () {
        console.log('loadAudio end');
        console.log(audio);
        loadedCallBack(); 
      });
   audio.addEventListener('error',
      function () {
         loadAudio(url);
      });
   audio.load();
}

function load(resources) {
  resLength = resources.length;
  resources.forEach(function(elem, i) {
    if(elem.search(/\.(png|jpg)$/ig) !== -1) {
      loadImage(elem);
      return;
    }
    if(elem.search(/\.(mp3|ogg)$/ig) !== -1) {
      loadAudio(elem);
    }
  });
}

function registLoadingCb(cb) {
  loadingCb = cb;
}

function registCompleteCb(cb) {
  completeCb = cb;
}

module.exports = {
  load: load,
  registLoadingCb: registLoadingCb,
  registCompleteCb: registCompleteCb
};