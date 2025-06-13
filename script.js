document.getElementById("runDemo").addEventListener("click", function () {
    const log = document.getElementById("demoOutput");
    const svg = document.getElementById("network");
    svg.innerHTML = ""; // Clear previous SVG

    log.innerHTML = "Backpropagation demo triggered!";

    // Setup: 2 input neurons -> 1 output neuron
    const weights = [0.5, -0.5];
    const inputs = [1, 0];
    const expected = 1;
    const learningRate = 0.1;

    // Positions for neurons
    const neurons = {
        input: [{x: 50, y: 50}, {x: 50, y: 150}],
        output: [{x: 300, y: 100}]
    };

    // Draw neurons
    drawNeuron(svg, neurons.input[0].x, neurons.input[0].y, "1");
    drawNeuron(svg, neurons.input[1].x, neurons.input[1].y, "0");
    drawNeuron(svg, neurons.output[0].x, neurons.output[0].y, "?");

    // Draw weighted lines (connections)
    for (let i = 0; i < neurons.input.length; i++) {
        drawConnection(svg, neurons.input[i], neurons.output[0], weights[i]);
    }

    // Forward pass
    let z = weights[0] * inputs[0] + weights[1] * inputs[1];
    let sigmoid = 1 / (1 + Math.exp(-z));
    let loss = 0.5 * (sigmoid - expected) ** 2;

    // Backprop step
    let dLoss = sigmoid - expected;
    let dSigmoid = sigmoid * (1 - sigmoid);

    // Update weights
    weights[0] -= learningRate * dLoss * dSigmoid * inputs[0];
    weights[1] -= learningRate * dLoss * dSigmoid * inputs[1];

    log.innerHTML += `<p>Output: ${sigmoid.toFixed(4)}, Loss: ${loss.toFixed(4)}</p>`;
    log.innerHTML += `<p>Updated Weights: [${weights.map(w => w.toFixed(4)).join(", ")}]</p>`;
});

// Helper functions
function drawNeuron(svg, x, y, label = "") {
    // Draw circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    circle.setAttribute("stroke", "#0f0");
    circle.setAttribute("fill", "#111");
    svg.appendChild(circle);

    // Add label text
    if (label) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5); // slight vertical adjust
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#0f0");
        text.setAttribute("font-size", "12px");
        text.setAttribute("font-family", "monospace");
        text.textContent = label;
        svg.appendChild(text);
    }
}


function drawConnection(svg, from, to, weight) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", weight > 0 ? "lime" : "red");
    line.setAttribute("stroke-width", Math.abs(weight * 5));
    svg.appendChild(line);

    // Add weight label near midpoint
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    const weightLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    weightLabel.setAttribute("x", midX + 5);
    weightLabel.setAttribute("y", midY - 5);
    weightLabel.setAttribute("fill", "#0f0");
    weightLabel.setAttribute("font-size", "12px");
    weightLabel.setAttribute("font-family", "monospace");
    weightLabel.textContent = weight.toFixed(2);
    svg.appendChild(weightLabel);
}
