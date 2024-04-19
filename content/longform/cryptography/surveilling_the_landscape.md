+++
title = "surveying the landscape"
date = "2024-04-05"
description = "Every journey begins with reflection. We'll speedrun the wonderful history of cryptography and then focus on the applications of cryptography in the modern world."
template = "blog.html"
[taxonomies]
tags = ["math", "cryptography"]
+++

---

# WIP

Here are nome notes:

---

Cryptography has a long and fascinating history, evolving from simple manual ciphers to complex digital algorithms that secure modern communications. Here's a brief overview of the historical development of cryptography, along with its relationship to codes and other related disciplines:

### Ancient Times
- **2000 BCE**: The earliest known use of cryptography was in Egypt, where an inscription was carved in the tomb of nobleman Khnumhotep II; it used non-standard hieroglyphs.
- **500-600 BCE**: The Spartans used a device called a "scytale" to send messages during military campaigns. A message was written on a strip of parchment that was wound around a stick. When unwound, the letters appeared meaningless unless wrapped around a stick of identical diameter.

### Classical and Medieval Periods
- **100 BCE - 500 CE**: The Romans, notably Julius Caesar, used simple substitution ciphers (Caesar cipher) to protect military messages. The Caesar cipher involved shifting the letters of the alphabet by a fixed number.
- **800-1400 CE**: During the Islamic Golden Age, scholars like Al-Kindi and Al-Khalil made significant contributions. Al-Kindi wrote a manuscript on decrypting encrypted messages and frequency analysis which laid the groundwork for many modern cryptographic methods.

### Renaissance to Early Modern Period
- **1466**: The Italian architect and mathematician Leon Battista Alberti developed the first polyalphabetic cipher, a more complex version of Caesar's cipher using multiple substitution alphabets.
- **1586**: The Vigenère cipher, another polyalphabetic substitution method, was developed by Blaise de Vigenère, presenting a significant challenge for cryptanalysts for the next three centuries.

### 19th Century to World War
- **19th Century**: Invention of the telegraph and the telephone increased the need for effective encryption, leading to mechanical and electromechanical encryption devices. One notable device was the Wheatstone cryptograph.
- **World War I and II**: Cryptography became crucial in military communications. The Germans used the Enigma machine, which provided a formidable challenge until it was famously broken by Alan Turing and his team at Bletchley Park.

### Post World War to Modern Cryptography
- **1970s**: Introduction of public-key cryptography by Whitfield Diffie and Martin Hellman, which revolutionized communications by allowing secure exchange of keys over an insecure channel.
- **1977**: RSA (Rivest–Shamir–Adleman) algorithm was developed, becoming the first algorithm suited for signing as well as encryption.
- **1990s**: The rise of the internet necessitated stronger, faster cryptographic protocols, leading to the development of protocols like SSL/TLS for secure web browsing.

### Codes and Other Related Topics
- **Codes vs. Ciphers**: While both are methods of concealing messages, "codes" transform words or phrases into unrelated words, numbers, or phrases, unlike ciphers, which systematically transform individual letters or groups of letters.
- **Steganography**: The practice of hiding messages or information within other non-secret text or data. Unlike cryptography, where the presence of the message itself is not disguised, steganography involves hiding the message so it appears that nothing is being concealed at all.
- **Error-Correcting Codes**: These are used to detect and correct errors in data transmission or storage. This field overlaps with cryptography in terms of ensuring data integrity and security.

Cryptography's evolution reflects the advancements in mathematics, technology, and the increasing importance of information security, driven by both political and technological pressures. As our reliance on digital communications continues to grow, so too does the complexity and importance of cryptographic techniques.

Certainly! Cryptographic protocols are fundamental to ensuring privacy, integrity, and authenticity in data communications and storage across computers, networks, and the internet. Here’s a detailed list of various types of cryptographic protocols used in these domains:

### 1. **Symmetric Key Cryptography**
   - **AES (Advanced Encryption Standard)**: Widely used for data encryption. It's fast and efficient for both hardware and software implementations.
   - **DES (Data Encryption Standard)**: An older encryption algorithm, largely replaced by AES due to its vulnerability to brute-force attacks.
   - **3DES (Triple DES)**: An improvement on DES by applying the encryption process three times to each data block. More secure than DES but slower than AES.
   - **RC4, RC5, RC6**: Stream ciphers used for encrypting data in a continuous stream, commonly used in older or legacy security protocols like WEP.

### 2. **Asymmetric Key Cryptography**
   - **RSA (Rivest–Shamir–Adleman)**: One of the first public-key cryptosystems, widely used for secure data transmission.
   - **ECC (Elliptic Curve Cryptography)**: Offers the same level of security as RSA but with smaller key sizes, making it more efficient.
   - **DSA (Digital Signature Algorithm)**: Used for digital signatures and ensuring the integrity of data.
   - **Diffie-Hellman**: A method for secure key exchange, enabling encrypted communication over a public network.

### 3. **Hash Functions**
   - **SHA (Secure Hash Algorithm) series** (SHA-1, SHA-256, SHA-3, etc.): Used to produce a unique, fixed-size hash value from data. Essential for integrity checks.
   - **MD5 (Message-Digest Algorithm 5)**: Formerly widely used for creating a hash from a data block but now considered vulnerable.

### 4. **Encryption Protocols**
   - **SSL (Secure Sockets Layer) and TLS (Transport Layer Security)**: Protocols that secure communications over computer networks; TLS is the newer, more secure version.
   - **IPsec (Internet Protocol Security)**: A suite of protocols used to secure Internet Protocol (IP) communications by authenticating and encrypting each IP packet in a data stream.
   - **HTTPS (HTTP Secure)**: An extension of HTTP secure through TLS/SSL, widely used on the internet to secure website connections.
   - **VPN Protocols (such as OpenVPN, L2TP/IPsec, and IKEv2/IPsec)**: Facilitate secure and encrypted connections across public networks, widely used for creating virtual private networks.

### 5. **Cryptographic Key Exchange Protocols**
   - **Kerberos**: Uses symmetric key cryptography to authenticate service requests between trusted hosts over an untrusted network.
   - **PKI (Public Key Infrastructure)**: A framework for managing public keys and digital certificates, underpinning many types of secure communications.

### 6. **Secure File Transfer Protocols**
   - **SFTP (SSH File Transfer Protocol)**: Uses Secure Shell (SSH) to provide a secure channel over an insecure network.
   - **SCP (Secure Copy Protocol)**: Allows secure transferring of files between hosts on a network.

### 7. **Email Security Protocols**
   - **PGP (Pretty Good Privacy) and GPG (GNU Privacy Guard)**: Encrypt email contents. PGP uses a mix of symmetric and asymmetric encryption, while GPG is an open-source alternative.
   - **S/MIME (Secure/Multipurpose Internet Mail Extensions)**: Standard for public key encryption and signing of MIME data.

### 8. **Blockchain and Cryptocurrencies**
   - **Various cryptographic algorithms**: These are used to secure transactions, control the creation of additional units, and verify the transfer of assets in blockchain technologies.

These cryptographic protocols and technologies form the backbone of secure digital communications, helping to protect data from interception, tampering, and fraud.

Certainly! Let's expand on the cryptographic protocols, especially focusing on TLS and other application-level protocols, and also discuss the use of encodings and error-correcting codes.

### Cryptographic Protocols at the Application Level

1. **TLS (Transport Layer Security)**
   - TLS is indeed crucial for secure communications over the internet. It encrypts data sent over a network between web applications and servers, such as loading a website in a browser. TLS is the successor to SSL and is used by HTTPS to secure connections.

2. **SSH (Secure Shell)**
   - SSH is a cryptographic network protocol for operating network services securely over an unsecured network. Typical applications include remote command-line login and remote command execution.

3. **IPsec (Internet Protocol Security)**
   - Already mentioned in the earlier list, IPsec is used at the network layer to encrypt and authenticate all IP packets to provide secure communications between networks or hosts.

4. **PGP/GPG (Pretty Good Privacy/GNU Privacy Guard)**
   - These protocols are used for securing emails and files by providing cryptographic privacy and authentication. They are commonly implemented in email systems to secure communications between users.

5. **DNSSEC (Domain Name System Security Extensions)**
   - DNSSEC protects the integrity of the data returned from a DNS lookup against attacks such as cache poisoning by digitally signing data to help ensure its validity.

6. **OAuth**
   - A protocol for authorization that allows third-party services to exchange web resources on behalf of a user.

7. **OpenID Connect**
   - A simple identity layer on top of the OAuth 2.0 protocol, allowing clients to verify the identity of the end-user based on authentication performed by an authorization server, as well as to obtain basic profile information.

8. **SAML (Security Assertion Markup Language)**
   - An open standard that allows identity providers to pass authorization credentials to service providers. It's used extensively for single sign-on (SSO) services to permit users to use one set of login credentials for multiple sites.

### Use of Encodings and Error Correcting Codes

**Encodings** and **error-correcting codes** are essential for ensuring data integrity and accuracy across various applications, not just in cryptography:

1. **Encodings (such as ASCII, Unicode, Base64)**
   - These are used to represent a repertoire of characters by some kind of encoding system. For example, Base64 is commonly used to encode binary data into characters that are more readily usable in textual protocols.

2. **Error Correcting Codes (such as Hamming, Reed-Solomon, Turbo Codes)**
   - **Telecommunications and Networking**: To ensure the integrity of data transmissions over noisy channels like wireless communications.
   - **Data Storage**: Used in devices such as hard drives, CDs, DVDs, and QR codes to ensure that the data read from the storage medium is the same as the data that was originally written.
   - **Satellite Communication**: Critical for correcting errors in messages sent through space where changing conditions and various interferences can corrupt data.

3. **Checksums and CRC (Cyclic Redundancy Check)**
   - These are simpler forms of error-detecting codes used to detect accidental changes to raw data in digital networks and storage devices.

These protocols and encoding/error correction techniques play crucial roles in securing and maintaining the integrity of digital communications and data storage across various platforms and media.