let canvas, gui;

function setupGUI() {
    gui = new dat.GUI({autoPlace: false, width: 250});
    document.body.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.closed = true;
    gui.updateDisplay();
}

//////////////////////////////////////////////////

let params = {
    save: () => saveCanvas('frame-' + nf(frameCount, 5) + '.png'),
    N: 5,
    D: 1.1
};

let N = params.N;

function setup() {
    canvas = createCanvas(800, 500);
    canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
    setupGUI();
    windowResized();
    pixelDensity(2);
    colorMode(RGB, 1);
    background(0);
    frameRate(60);

    gui.add(params, 'save').name('Save canvas');
    gui.add(params, 'N', 1, 125, 1).name('Number of bricks').onChange(() => {
        N = params.N;
        let sum = 0;
        for (let i = 1; i <= N; i++) {
            sum += 0.5 / i;
        }
        params.D = floor(sum * 20) / 20;
        gui.updateDisplay();
    });
    gui.add(params, 'D', 0.5, 2.75, 0.05).name('Distance').onChange(() => {
        params.N = 1;
        let sum = 0;
        for (let i = 1; i <= 125; i++) {
            sum += 0.5 / i;
            if (sum < params.D) {
                params.N = i;
            }
        }
        N = params.N;
        gui.updateDisplay();
    });
}

function draw() {
    background(0);
    show();
}

function show() {
    background(0);
    noStroke();
    fill(0.3, 1, 0);
    rect(0, 400, 250, 100);
    let offset = 0;
    let h = min(250 / N, 50);
    fill(0.3, 0, 1);
    for (let i = N; i > 0; i--) {
        offset += 1 / i;
        rect(50 + offset * 100, i * h - (N + 1) * h + 400, 200, h - 1);
    }
}

function windowResized() {
    canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
    gui.domElement.style.left = canvas.x + canvas.width - gui.width + 'px';
    gui.domElement.style.top = canvas.y + 'px';
}

function clog(object) {
    console.log(object);
}
