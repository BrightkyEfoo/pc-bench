import * as si from "systeminformation";
import { Worker } from "node:worker_threads";
import testAll from './test-all'

/**
 * Informations sur le processeur.
 */
interface CpuInfo {
  /**
   * Le fabricant du processeur.
   * @type {string}
   */
  manufacturer: string;

  /**
   * La marque du processeur.
   * @type {string}
   */
  brand: string;

  /**
   * La vitesse du processeur en GHz.
   * @type {number}
   */
  speed: number;

  /**
   * Le nombre de cœurs logiques du processeur.
   * @type {number}
   */
  cores: number;

  /**
   * Le nombre de cœurs physiques du processeur.
   * @type {number}
   */
  physicalCores: number;

  /**
   * Le nombre de processeurs installés dans le système.
   * @type {number}
   */
  processors: number;

  /**
   * Les détails de chaque processeur.
   * @type {Array<CpuCoreInfo>}
   */
  coresInfo: CpuCoreInfo[];
}

/**
 * Informations sur chaque cœur du processeur.
 */
interface CpuCoreInfo {
  /**
   * Le nombre de cœurs logiques.
   * @type {number}
   */
  logicalCores?: number;

  /**
   * La fréquence du cœur en GHz.
   * @type {number}
   */
  frequency: number;

  /**
   * La charge du cœur en pourcentage.
   * @type {number}
   */
  load?: number;
}

/**
 * Informations sur la carte graphique.
 */
interface GpuInfo {
  /**
   * Le fabricant de la carte graphique.
   * @type {string}
   */
  manufacturer: string;

  /**
   * Le modèle de la carte graphique.
   * @type {string}
   */
  model: string;

  /**
   * La mémoire totale de la carte graphique en Mo.
   * @type {number}
   */
  memoryTotal: number;

  /**
   * La mémoire utilisée de la carte graphique en Mo.
   * @type {number}
   */
  memoryUsed: number;

  /**
   * La mémoire libre de la carte graphique en Mo.
   * @type {number}
   */
  memoryFree: number;
}

/**
 * Informations sur la mémoire RAM.
 */
interface RamInfo {
  /**
   * La mémoire totale du système en Go.
   * @type {number}
   */
  total: number;

  /**
   * La mémoire libre du système en Go.
   * @type {number}
   */
  free: number;

  /**
   * La mémoire utilisée du système en Go.
   * @type {number}
   */
  used: number;
}

/**
 * Informations sur le disque dur.
 */
interface DiskInfo {
  /**
   * La taille totale du disque en Go.
   * @type {number}
   */
  size: number;

  /**
   * L'espace utilisé du disque en Go.
   * @type {number}
   */
  used?: number;

  /**
   * L'espace libre du disque en Go.
   * @type {number}
   */
  free?: number;

  /**
   * Le type du disque (ex: SSD, HDD).
   * @type {string}
   */
  type: string;
}

/**
 * Informations sur le réseau.
 */
interface NetworkInfo {
  /**
   * La latence du réseau en millisecondes (ms).
   * @type {number}
   */
  speed: number;

  /**
   * L'interface réseau utilisée (ex: eth0, wlan0).
   * @type {string}
   */
  interface: string;
}

/**
 * Regroupe toutes les informations sur le système (processeur, carte graphique, mémoire, disque et réseau).
 */
interface SystemInfo {
  /**
   * Informations sur le processeur.
   * @type {CpuInfo}
   */
  cpu: CpuInfo;

  /**
   * Informations sur la carte graphique.
   * @type {GpuInfo}
   */
  gpu: GpuInfo;

  /**
   * Informations sur la RAM.
   * @type {RamInfo}
   */
  ram: RamInfo;

  /**
   * Informations sur le disque dur.
   * @type {DiskInfo}
   */
  disk: DiskInfo;

  /**
   * Informations sur le réseau.
   * @type {NetworkInfo}
   */
  network: NetworkInfo;
}

/**
 * Résultats des tests de performance des composants matériels.
 */
interface PerformanceTestResult {
  /**
   * La fréquence du processeur en GHz.
   * @type {number}
   */
  cpuFrequency: number;

  /**
   * La performance de la carte graphique (unité arbitraire).
   * @type {number}
   */
  gpuPerformance: number;

  /**
   * La vitesse de la RAM en Mo/s.
   * @type {number}
   */
  ramSpeed: number;

  /**
   * La vitesse du disque dur en Mo/s.
   * @type {number}
   */
  diskSpeed: number;

  /**
   * La performance du processeur en mode multithread (unité arbitraire).
   * @type {number}
   */
  multiThreadPerformance: number;
}

/**
 * Classe pour tester les performances du système et obtenir des informations système.
 */
class SystemTester {
  /**
   * Récupère les informations système détaillées telles que le processeur, la carte graphique, la RAM, le disque et le réseau.
   * @returns {Promise<SystemInfo>} Les informations système détaillées
   */
  static async getSystemInfo(): Promise<SystemInfo> {
    const cpu = await si.cpu();
    const gpu = await si.graphics();
    const ram = await si.mem();
    const disk = await si.diskLayout();
    const network = await si.networkStats();

    const cpuInfo: CpuInfo = {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
      cores: cpu.cores,
      physicalCores: cpu.physicalCores,
      processors: cpu.processors,
      coresInfo: [],
    };

    // Récupérer les informations détaillées sur chaque cœur de processeur
    const cpuCores = await si.cpuTemperature();
    for (let i = 0; i < cpuCores.max; i++) {
      cpuInfo.coresInfo.push({
        logicalCores: cpuCores.cores.length,
        frequency: cpu.speed,
        load: cpuCores.socket?.[i],
      });
    }

    return {
      cpu: cpuInfo,
      gpu: {
        manufacturer: gpu.controllers[0].vendor,
        model: gpu.controllers[0].model,
        memoryTotal: gpu.controllers[0].memoryTotal || 0 / 1024, // Convertir MB en Go
        memoryUsed: gpu.controllers[0].memoryUsed || 0 / 1024,
        memoryFree: gpu.controllers[0].memoryFree || 0 / 1024,
      },
      ram: {
        total: ram.total / 1024 ** 3, // Convertir bytes en Go
        free: ram.free / 1024 ** 3,
        used: (ram.total - ram.free) / 1024 ** 3,
      },
      disk: {
        size: disk[0].size / 1024 ** 3, // Convertir bytes en Go
        // used: disk[0]. / 1024 ** 3,
        // free: disk[0].free / 1024 ** 3,
        type: disk[0].type,
      },
      network: {
        speed: network[0].ms,
        interface: network[0].iface,
      },
    };
  }

  /**
   * Teste la performance du processeur en mode multithread en utilisant plusieurs cœurs.
   * @returns {Promise<number>} La performance du processeur en multithread (unité arbitraire)
   */
  static async testMultiThreadPerformance(): Promise<number> {
    const cpu = await si.cpu();

    const numCores = cpu.cores || 1; // Utiliser 4 cœurs pour le test
    const workerPromises: Promise<number>[] = [];

    // Création d'un tableau de promises de workers
    for (let i = 0; i < numCores; i++) {
      workerPromises.push(
        new Promise<number>((resolve, reject) => {
          const worker = new Worker("./dist/worker.js"); // Exécuter le code du worker
          worker.on("message", (result) => {
            resolve(result);
            worker.terminate();
          });
          worker.on("error", reject);
          worker.postMessage(i);
        })
      );
    }

    // Attendre que tous les workers finissent leur tâche
    const results = await Promise.all(workerPromises);
    const totalPerformance = results.reduce((sum, result) => sum + result, 0);

    return totalPerformance;
  }
}

export { PerformanceTestResult, SystemTester, testAll };

