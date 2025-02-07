// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AcquireOptions } from '../fs/acquire';
import { Installer } from '../interfaces/metadata/installers/Installer';
import { Verifiable } from '../interfaces/metadata/installers/verifiable';

export function artifactFileName(name: string, install: Installer, extension: string): string {
  let result = name;
  if (install.nametag) {
    result += '-';
    result += install.nametag;
  }

  if (install.lang) {
    result += '-';
    result += install.lang;
  }

  result += extension;
  return result.replace(/[^\w]+/g, '.');
}

export function applyAcquireOptions(options: AcquireOptions, install: Verifiable): AcquireOptions {
  const sha256 = install.sha256;
  if (sha256 !== null && sha256 !== undefined) {
    return { ...options, algorithm: 'sha256', value: sha256.toString() };
  }

  const sha512 = install.sha512;
  if (sha512 !== null && sha512 !== undefined) {
    return { ...options, algorithm: 'sha512', value: sha512.toString() };
  }

  return options;
}

