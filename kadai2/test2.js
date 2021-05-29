/**
* @fileoverview Class to create 3D digital clock object by using Three.js
*
* @author Irukanobox / http://irukanobox.blogspot.jp/
*/

/**
* Class to create 3D digital clock object
* @constructor
*/
var ThreeDClock = function() {
    /**
    * Date object
    * @type {Date}
    */
   this._oldTime = null;
   /**
   * Array of Number objects
   * @type {Array.<THREE.TextGeometry>}
   */
   this.object = [];
   /**
   * Colon ':' object
   * @type {THREE.TextGeometry}
   */
   this.colon = null;
};
/**
 * Update number objects
 */
 ThreeDClock.prototype.update = function() {

   var now = new Date();
   var sec = now.getSeconds();
   var min = now.getMinutes();
   var hour = now.getHours();

   if (this._oldTime !== now) {
       var digits = [];
       digits[0] = Math.floor(hour / 10);
       digits[1] = hour % 10;
       digits[2] = Math.floor(min / 10);
       digits[3] = min % 10;
       digits[4] = Math.floor(sec / 10);
       digits[5] = sec % 10;

       for (var j = 0; j < this.object.length; j++) {
           var numbers = this.object[j].children;
           for (var i = 0; i < numbers.length; i++) {
               numbers[i].visible = false;
           }
           numbers[digits[j]].visible = true;
       }

       this._oldTime = now;
   }
};
/**
 * Create and return a text object
 * @param {THREE.Font} font font loaded by THREE.FontLoader().load
 * @param {String} char String of 3D object
 * @param {Number} size Size of 3D object
 * @param {Boolean} visibility Visibility of 3D object
 * @return {THREE.Mesh} Created 3D text object
 */
ThreeDClock.prototype._createMesh = function(font, char, size, visibility) {
   var geometry = new THREE.TextGeometry(char, {
       font: font,
       size: size,
       height: 0.1,
       curveSegments: 15,
       bevelThickness: 10,
       bevelSize: 8,
       bevelEnabled: false
   } );
   geometry.center();

   var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.7});
   var mesh = new THREE.Mesh(geometry, material);
   mesh.visible = visibility;

   return mesh;
};
/**
 * Create 3D digital clock object
 * @param {String} fontPath Path of JSON font file created by typeface.js
 *      https://gero3.github.io/facetype.js/
 * @param {Number} baseSize Size of 3D digital clock object
 * @param {THREE.Scene} scene Three.js scene instance
 */
ThreeDClock.prototype.create = function(fontPath, baseSize, scene) {

    var loader = new THREE.FontLoader();
    loader.load(fontPath, (function(font) {
       var delta = - baseSize * 2;
       var size = baseSize;

       for (var j = 0; j < 6; j++) {
           if ([4, 5].indexOf(j) != -1) size = baseSize / 2;

           var group = new THREE.Group();
           for (var i = 0; i < 10; i++) {
               group.add(this._createMesh(font, i.toString(10), size, false));
           }
           scene.add(group);

           group.position.x = delta;
           delta += baseSize;
           if (j == 1) delta += baseSize;
           if ([4, 5].indexOf(j) != -1) group.position.y = - baseSize / 4;

           this.object[j] = group;
       }
       this.colon = this._createMesh(font, ':', baseSize, true);
       scene.add(this.colon);

  }).bind(this));
};
