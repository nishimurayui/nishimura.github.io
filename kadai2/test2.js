<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>demo</title>

  <!-- three.jsを読み込む(ローカル) -->
  <!-- <script src="./three.js"></script> -->
  <!-- three.jsを読み込む(CDN) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/99/three.min.js"></script>

</head>
<body>
 <script>
  var init = function() {

    var width = 800,
        height = 600;

    // レンダラーを作成
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    // シーンを作成
    var scene = new THREE.Scene();

    // カメラを作成
    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);


  //ドーナッツ
var torusGeometry = new THREE.TorusGeometry( 3.3, 1.5, 24, 24 );
var torusMaterial = new THREE. MeshToonMaterial( { color: 0xd66b00 } );
var torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.set( 0.5, 0, -20);
scene.add( torus );



//なんかクネクネしてるやつ
var torusKnotGeometry = new THREE.TorusKnotGeometry( 1.5, 0.3, 20, 6, 3, 5 );
//全体的な大きさ、チューブの太さ、クネクネの進む方向に対して何分割するか、
//チューブ方向に対して何分割するか、残りの二つの数字を変えるとクネクネの形が変わる
var torusKnotMaterial = new THREE. MeshPhongMaterial( { color: 0x00ff00 } );
var torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
torusKnot.position.set( 0, 0, -15 );
scene.add( torusKnot );

//球
var sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var sphereMaterial = new THREE. MeshPhongMaterial( {color: 0xff8800,wireframe: true} );
var sphere1 = new THREE.Mesh( sphereGeometry, sphereMaterial );
var sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere1.position.set( 1.3, 0, -5 );
sphere2.position.set( -1.3, 0, -5 );
scene.add( sphere1 );
scene.add( sphere2 );

    // 平行光源1
    var directionalLight1 = new THREE.DirectionalLight(0xffffff);
    directionalLight1.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight1);
    // 平行光源2
        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(-1, 1, 1);
    // シーンに追加
    scene.add(directionalLight2);

    // 初回実行
    var update = function() {
      requestAnimationFrame(update);

      // 箱を回転させる
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      sphere1.rotation.y += 0.01;
      sphere2.rotation.y += 0.01;



      renderer.render(scene, camera);
    };
    update();
  }
  window.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>
