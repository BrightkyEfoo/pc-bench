# PC Bench Documentation

## Overview
**PC Bench** is a Node.js library designed for comprehensive hardware and performance analysis of a computer system. Built with TypeScript for type safety, it provides tools to:

- Retrieve detailed system hardware information (CPU, GPU, RAM, storage, etc.).
- Test the performance of various components (CPU frequency, RAM speed, disk I/O).
- Measure network quality and latency.
- Run benchmarks on multi-core processors and handle multithreading.

This documentation provides an overview of each API, detailed descriptions of their outputs, and usage examples.

---

## Installation

To install the package:

```bash
npm install pc-bench
```

---

## APIs

### 1. `getSystemInfo`
#### Description
Fetches detailed information about the hardware of the system, including CPU, RAM, GPU, and storage.

#### Example Usage
```typescript
import { getSystemInfo } from 'pc-bench';

const systemInfo = await getSystemInfo();
console.log(systemInfo);
```

#### Output Structure
- **cpu**: CPU details
  - `manufacturer` (string): Manufacturer name (e.g., Intel, AMD).
  - `brand` (string): CPU model (e.g., i7-9700K).
  - `speed` (number): Base speed in GHz.
  - `cores` (number): Total cores.
  - `physicalCores` (number): Physical cores.
  - `processors` (number): Number of processors.

- **gpu**: GPU details
  - `manufacturer` (string): GPU manufacturer (e.g., NVIDIA, AMD).
  - `model` (string): GPU model (e.g., RTX 3080).
  - `vram` (number): Video RAM in MB.

- **ram**: RAM details
  - `total` (number): Total RAM in MB.
  - `used` (number): Used RAM in MB.
  - `free` (number): Free RAM in MB.

- **storage**: Storage details
  - `disks` (array): List of disk drives.
    - `name` (string): Disk name.
    - `type` (string): Disk type (HDD, SSD).
    - `size` (number): Total size in GB.

---

### 2. `testCPU`
#### Description
Calculates the approximate CPU frequency by running a benchmarking test. Handles multi-core and multithreaded tests.

#### Example Usage
```typescript
import { testCPU } from 'pc-bench';

const cpuTest = await testCPU();
console.log(cpuTest);
```

#### Output Structure
- **frequency** (number): Measured CPU frequency in GHz.
- **cores** (array): Detailed information per core.
  - `core` (number): Core index.
  - `frequency` (number): Core frequency in GHz.

---

### 3. `testRAM`
#### Description
Tests the RAM performance by measuring read/write speeds and latency.

#### Example Usage
```typescript
import { testRAM } from 'pc-bench';

const ramTest = await testRAM();
console.log(ramTest);
```

#### Output Structure
- **speed** (number): Measured RAM speed in MB/s.
- **latency** (number): Measured latency in nanoseconds.

---

### 4. `testDisk`
#### Description
Measures the performance of the storage disk, including read/write speeds.

#### Example Usage
```typescript
import { testDisk } from 'pc-bench';

const diskTest = await testDisk();
console.log(diskTest);
```

#### Output Structure
- **readSpeed** (number): Read speed in MB/s.
- **writeSpeed** (number): Write speed in MB/s.
- **latency** (number): Measured latency in milliseconds.

---

### 5. `testNetwork`
#### Description
Tests network quality by measuring latency, download, and upload speeds.

#### Example Usage
```typescript
import { testNetwork } from 'pc-bench';

const networkTest = await testNetwork();
console.log(networkTest);
```

#### Output Structure
- **latency** (number): Network latency in milliseconds.
- **downloadSpeed** (number): Download speed in Mbps.
- **uploadSpeed** (number): Upload speed in Mbps.

---

### 6. `getGPUPerformance`
#### Description
Benchmarks GPU performance by running a synthetic workload.

#### Example Usage
```typescript
import { getGPUPerformance } from 'pc-bench';

const gpuPerformance = await getGPUPerformance();
console.log(gpuPerformance);
```

#### Output Structure
- **score** (number): GPU performance score.
- **temperature** (number): Measured GPU temperature during the test in °C.

---

### Additional Features

#### Logging
All functions accept an optional `logger` parameter to log the progress and results:

```typescript
await testCPU({ logger: console.log });
```

---

### Notes
- Ensure that the application has sufficient permissions to access hardware-level details.
- Running tests may consume significant system resources temporarily.

---

### Contributing
To contribute to the development of this package, fork the repository, make your changes, and submit a pull request. Ensure your changes are tested thoroughly.

---

### License
PC Bench is licensed under the MIT License.

---

For further assistance, refer to the [GitHub repository](https://github.com/BrightkyEfoo/pc-bench).

