import * as crypto from 'crypto-js';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NavData } from '../_nav';
import { Project } from '../models/Project';
import { ProjectsService } from './projects.service';

@Injectable({ providedIn: 'root' })
export class PasswordCrypterService {
    constructor()
    {
    }

    getSHA512(s :string) :string
    {
        var SHA512 = require("crypto-js/sha512");
        var b64 = SHA512(s);
        var eHex = b64.toString();
        return eHex;
    }

    getSHA256(s :string) :string
    {
        var SHA256 = require("crypto-js/sha256");
        var b64 = SHA256(s);
        var out = b64.toString();
        return out;
    }

    encryptPasswordShare(share :{}, pw :string) :string
    {
        var SHA256EncryptedPW = this.getSHA256(pw);
        console.log(SHA256EncryptedPW);

        var shareText = JSON.stringify(share);

        var AES = require("crypto-js/aes");
        var b64 = AES.encrypt(shareText, SHA256EncryptedPW);

        let hexString = b64.toString();
        return hexString;
    }

    decryptPasswordShare(encryptedText :string, pw :string) : {}
    {
        var SHA256EncryptedPW = this.getSHA256(pw);
        
        var AES = require("crypto-js/aes");

        var decrypted = AES.decrypt(encryptedText, SHA256EncryptedPW);
        var plaintext = decrypted.toString(crypto.enc.Utf8);

        return plaintext
    }
}
