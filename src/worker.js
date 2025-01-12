const { parentPort } = require("worker_threads");

if (!parentPort) {
  throw new Error("This script must be run as a Worker thread.");
}

// Écouter les messages du thread principal
parentPort.on("message", (data) => {
  const result = performTask(data);
  parentPort.postMessage(result);
});

/**
 * Simule une tâche gourmande en calcul (par exemple, calculer une somme ou effectuer une itération).
 * @param {number} input - Donnée reçue du thread principal.
 * @returns {number} Résultat du traitement.
 */
function performTask(input) {
  // Simule une opération coûteuse ou intensive
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i + input;
  }
  return sum;
}
