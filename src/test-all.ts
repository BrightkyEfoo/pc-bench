import { SystemTester, PerformanceTestResult } from "./";

(async () => {
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
})();
