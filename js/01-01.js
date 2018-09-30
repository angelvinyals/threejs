function init() {
	console.log("Using Three.js version: " + THREE.REVISION);
	var scene = new THREE.Scene();
	console.log("scene:", scene);
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	console.log("camera:", camera);
	var renderer = new THREE.WebGLRenderer();
	console.log("scene, camera and renderer created");
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(window.innerWidth, window.innerHeight);

	var axes = new THREE.AxesHelper(26);
	scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(60, 20);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.set(15, 0, 0);
	scene.add(plane);

	// create a cube
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshBasicMaterial({
	color: 0xFF0000,
	wireframe: true
	});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(-4, 3, 0);
	scene.add(cube);

	// create a sphere
	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshBasicMaterial({
	color: 0x7777FF,
	wireframe: true
	});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(20, 4, 2);
	scene.add(sphere);

	// position and point the camera to the center of the scene
	camera.position.set(-20, 40, 30);
	camera.lookAt(scene.position);

	// add the output of the renderer to the html element
	document.getElementById("webgl-output").
	appendChild(renderer.domElement);

	// render the scene
	renderer.render(scene, camera);
}