document.getElementById("runDemo").addEventListener("click", function () {
    const log = document.getElementById("backpropagation-demo");

    // Simple neural net weights & input (simulate 1 step)
    let weights = [0.5, -0.5]; // Example weights
    let inputs = [1, 0];       // XOR: 1 ⊕ 0 = 1
    let expected = 1;

    // Forward pass: weighted sum + sigmoid
    let z = weights[0] * inputs[0] + weights[1] * inputs[1];
    let sigmoid = 1 / (1 + Math.exp(-z));
    let loss = 0.5 * (sigmoid - expected) ** 2;

    // Backprop step: gradient of sigmoid
    let dLoss = sigmoid - expected;
    let dSigmoid = sigmoid * (1 - sigmoid);

    // Update weights (simulated)
    let learningRate = 0.1;
    weights[0] -= learningRate * dLoss * dSigmoid * inputs[0];
    weights[1] -= learningRate * dLoss * dSigmoid * inputs[1];

    // Output results
    log.innerHTML += `<p>Output: ${sigmoid.toFixed(4)}, Loss: ${loss.toFixed(4)}</p>`;
    log.innerHTML += `<p>Updated Weights: [${weights.map(w => w.toFixed(4)).join(", ")}]</p>`;
});
