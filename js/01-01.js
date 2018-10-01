function init() {
	
	let stats = initStats();
	

	console.log("Using Three.js version: " + THREE.REVISION);
	var scene = new THREE.Scene();
	console.log("scene:", scene);
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	console.log("camera:", camera);
	var renderer = new THREE.WebGLRenderer();
	console.log("scene, camera and renderer created");
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true

	var axes = new THREE.AxesHelper(26);
	scene.add(axes);
	
	// create the ground plane
	const planeGeometry = new THREE.PlaneGeometry(60, 20);
	const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	let plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -.5 * Math.PI;
	plane.position.set(15, 0, 0);
	plane.receiveShadow = true;

	// rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
	
	// add the plane to the scene
	scene.add(plane);

	// create a cube
	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true

	// position the cube
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;

	// add the cube to the scene
	scene.add(cube);

	// create a sphere
	const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777FF});
	let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.castShadow = true

	// position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);
	
	// position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);


	// add subtle ambient lighting
    const ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    // add spotlight for the shadows
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 20, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);


    // call the render function
    let step = 0;

	//
    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };

	//
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);


    // attach them here, since appendChild needs to be called first
    //var trackballControls = initTrackballControls(camera, renderer);
    //var clock = new THREE.Clock();

    render();

    function render() {
		// update the stats and the controls
        trackballControls.update(clock.getDelta());
        stats.update();

		// rotate the plane around z axe
        plane.rotation.z += 0.02;
        

		// rotate the cube around its axes
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
	}


	// add the output of the renderer to the html element
	document.getElementById("webgl-output")
		.appendChild(renderer.domElement);
	var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();
	
}


