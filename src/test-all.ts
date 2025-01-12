import { SystemTester, PerformanceTestResult } from "./";

/**
 * Exécute une série de tests pour valider les informations système
 * et effectuer des évaluations de performance matérielle.
 *
 * Cette fonction utilise les méthodes fournies par `SystemTester` pour :
 * - Récupérer les informations système (CPU, GPU, RAM, disque, réseau).
 * - Vérifier la validité des informations système récupérées.
 * - Tester la performance multithread du processeur.
 * - Simuler des tests supplémentaires (vitesse RAM, disque, etc.).
 *
 * Les résultats des tests sont affichés dans la console.
 *
 * @async
 * @function
 * @returns {Promise<void>} Ne retourne aucune valeur, mais écrit les résultats
 *                          dans la console ou signale des erreurs si elles surviennent.
 *
 * @throws Affiche une erreur dans la console si :
 * - Les données système récupérées sont invalides.
 * - Les résultats de performance ne respectent pas les attentes.
 *
 * @example
 * import testAll from './path/to/this/file';
 *
 * testAll()
 *   .then(() => console.log("Tous les tests ont été exécutés."))
 *   .catch((error) => console.error("Erreur lors de l'exécution des tests :", error));
 *
 * @dependencies
 * - `SystemTester` : Un module permettant de récupérer les informations système
 *                    et d'exécuter des tests de performance matérielle.
 * - `PerformanceTestResult` : Interface décrivant les résultats d'un test de performance.
 *
 * @steps
 * 1. Affiche un message signalant le début des tests.
 * 2. Récupère les informations système à l'aide de `SystemTester.getSystemInfo`.
 * 3. Valide les informations récupérées (CPU, GPU, RAM).
 * 4. Effectue un test de performance multithread avec `SystemTester.testMultiThreadPerformance`.
 * 5. Simule des tests supplémentaires pour des aspects comme la vitesse RAM ou disque.
 * 6. Affiche un résumé des résultats dans la console.
 */
const testAll = async (): Promise<void> => {
    try {
        console.log("==== Début des tests ====");

        // Test de la méthode getSystemInfo
        console.log("Test : Récupération des informations système...");
        const systemInfo = await SystemTester.getSystemInfo();

        console.log("Informations sur le processeur :", systemInfo.cpu);
        console.log("Informations sur la carte graphique :", systemInfo.gpu);
        console.log("Informations sur la RAM :", systemInfo.ram);
        console.log("Informations sur le disque :", systemInfo.disk);
        console.log("Informations sur le réseau :", systemInfo.network);

        // Valider les données CPU
        if (
            !systemInfo.cpu.manufacturer ||
            !systemInfo.cpu.brand ||
            systemInfo.cpu.speed <= 0 ||
            systemInfo.cpu.cores <= 0 ||
            systemInfo.cpu.physicalCores <= 0
        ) {
            throw new Error("Erreur : Données du processeur invalides.");
        }

        // Valider les données GPU
        if (!systemInfo.gpu.manufacturer || !systemInfo.gpu.model) {
            throw new Error("Erreur : Données de la carte graphique invalides.");
        }

        // Valider les données RAM
        if (
            systemInfo.ram.total <= 0 ||
            systemInfo.ram.free < 0 ||
            systemInfo.ram.used <= 0
        ) {
            throw new Error("Erreur : Données de la RAM invalides.");
        }

        console.log("Informations système validées.");

        // Test de la méthode testMultiThreadPerformance
        console.log("Test : Performance multithread du processeur...");
        const multiThreadPerformance = await SystemTester.testMultiThreadPerformance();

        console.log("Performance multithread :", multiThreadPerformance);

        if (multiThreadPerformance <= 0) {
            throw new Error("Erreur : Performance multithread invalide.");
        }

        console.log("Performance multithread validée.");

        // Simulation d'autres tests (RAM, disque, etc.)
        const performanceTest: PerformanceTestResult = {
            cpuFrequency: systemInfo.cpu.speed,
            gpuPerformance: 100, // Simuler une valeur arbitraire
            ramSpeed: 3200, // Simuler une valeur arbitraire en Mo/s
            diskSpeed: 500, // Simuler une valeur arbitraire en Mo/s
            multiThreadPerformance,
        };

        console.log("Résultats du test de performance :", performanceTest);

        console.log("==== Tests réussis ====");
    } catch (error) {
        console.error("Une erreur s'est produite pendant les tests :", error);
    }
}

export default testAll;