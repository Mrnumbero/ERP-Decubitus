import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private publicKey: string = environment.publicKey;

  constructor() {}

  async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await this.encryptWithPublicKey(password);
    return encryptedPassword;
  }

  private async encryptWithPublicKey(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const encodedPassword = encoder.encode(password);

    // Convert public key PEM to binary format
    const publicKey = await this.importPublicKey(this.publicKey);

    // Encrypt the password with the public key
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      encodedPassword
    );

    // Convert encrypted data to base64
    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
  }

  // Convert the PEM format public key to a usable format for Web Crypto API
  private async importPublicKey(publicKeyPem: string): Promise<CryptoKey> {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = publicKeyPem
      .replace(pemHeader, '')
      .replace(pemFooter, '')
      .replace(/\s/g, '');

    const binaryDerString = atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
      binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    return await window.crypto.subtle.importKey(
      'spki',
      binaryDer.buffer,
      { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
      true,
      ['encrypt']
    );
  }
}
