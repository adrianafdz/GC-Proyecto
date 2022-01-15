// Seguí este tutorial: https://youtu.be/kB0ZVUrI4Aw

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('webgl');

if (!ctx) {
    alert("Not supported");
}

/*
// RESIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.viewport(0, 0, window.innerWidth, window.innerHeight);
*/

ctx.clearColor(235/255, 245/255, 245/255, 1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

var vertexShaderTxt = `
precision mediump float;
attribute vec2 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`

var fragmentShaderTxt = `
precision mediump float;
varying vec3 fragColor;
void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`

var vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
var fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);

ctx.shaderSource(vertexShader, vertexShaderTxt);
ctx.shaderSource(fragmentShader, fragmentShaderTxt);

ctx.compileShader(vertexShader);
if (!ctx.getShaderParameter(vertexShader, ctx.COMPILE_STATUS)) {
    console.log(ctx.getShaderInfoLog(vertexShader));
}

ctx.compileShader(fragmentShader);
if (!ctx.getShaderParameter(fragmentShader, ctx.COMPILE_STATUS)) {
    console.log(ctx.getShaderInfoLog(fragmentShader));
}

var program = ctx.createProgram();
ctx.attachShader(program, vertexShader);
ctx.attachShader(program, fragmentShader);
ctx.linkProgram(program);

if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    console.log(ctx.getProgramInfoLog(program));
}

ctx.validateProgram(program);
if (!ctx.getProgramParameter(program, ctx.VALIDATE_STATUS)) {
    console.log(ctx.getProgramInfoLog(program));
}

var vertices =
[
    0.0,    0.5,    1.0, 1.0, 0.0,
    -0.5,   -0.5,   0.0, 1.0, 1.0,
    0.5,    -0.5,   0.1, 0.0, 1.0
];

var vertexBuffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

var positionAttribLocation = ctx.getAttribLocation(program, 'vertPosition');
var colorAttribLocation = ctx.getAttribLocation(program, 'vertColor');

ctx.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    2, // # elements per attribute
    ctx.FLOAT, // type of elements
    ctx.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // size of one vertex
    0 // offset 
);

ctx.vertexAttribPointer(
    colorAttribLocation, // Attribute location
    3, // # elements per attribute
    ctx.FLOAT, // type of elements
    ctx.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // size of one vertex
    2 * Float32Array.BYTES_PER_ELEMENT // offset 
);

ctx.enableVertexAttribArray(positionAttribLocation);
ctx.enableVertexAttribArray(colorAttribLocation);

// main render loop
ctx.useProgram(program);
ctx.drawArrays(ctx.TRIANGLES, 0, 3);