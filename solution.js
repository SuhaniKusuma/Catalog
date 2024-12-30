const fs = require('fs');

// Function to decode a value from a given base to decimal
function decodeValue(base, value) {
    return parseInt(value, base); // Convert value to decimal
}

// Function to perform Lagrange interpolation to find the constant term
function lagrangeInterpolation(points) {
    let constantTerm = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        const [xi, yi] = points[i];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [xj] = points[j];
                li *= (0 - xj) / (xi - xj); // Lagrange basis polynomial
            }
        }
        constantTerm += yi * li; // Add the term to the constant
    }

    return Math.round(constantTerm); // Return the constant term rounded to an integer
}

// Main function to process a JSON file and calculate the constant term
function findConstantTerm(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const n = data.keys.n;
    const k = data.keys.k;

    // Decode the points
    const points = [];
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = parseInt(i);
            const base = parseInt(data[i].base);
            const value = data[i].value;
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    // Select the first k points for interpolation
    const selectedPoints = points.slice(0, k);

    // Calculate the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(selectedPoints);

    console.log('Constant term (c):', constantTerm);
}

// Process the first test case
findConstantTerm('file.txt');

// Process the second test case
findConstantTerm('file2.txt');
