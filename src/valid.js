/**
 * Valid.js
 * Written by: Jay Simons
 * Cloudulus.Media (https://code.cloudulus.media)
 * 
 * Password validation requirement values:
 * 
 * 2 = No requirements (only length)
 * 4 = Require only numbers
 * 8 = Require only letters
 * 16 = Require letters and numbers
 * 32 = Require letter and numbers and at least one uppercase letter
 * 64 = Require letters and numbers, at least one uppercase letter, and at least one symbol (default)
 * 
 */
const onlyNumbers = /^\d+$/;
const onlyLetters = /^[a-zA-Z]+$/;
const hasNumber = /\d/;
const hasLetter = /[A-z]/;
const hasUC = /[A-Z]/;
const hasLC = /[a-z]/;
const hasSym = /[^a-zA-Z0-9_]/;

class Valid
{
    constructor(val, valLabel="Value")
    {
        this.val = val;
        this.valLabel = valLabel;
        this.message = "";
        this.status = false;
        this.passReq = 64; // Password requirements default value
        this.passLen = 8; // Default minumum password length;
    }

    setStatus(s)
    {
        this.status = s;
        return s;
    }

    checkRE(regex)
    {
        if (regex.exec(this.val))
        {
            return this.setStatus(true);
        }else{
            return this.setStatus(false);
        }
    }

    re(ex)
    {
        var regex = new RegExp(ex);
        return this.checkRE(regex);
    }

    setPassReq(n)
    {
        if (typeof n === 'number')
        {
            if (n && (n & (n - 1)) === 0)
            {
                this.passReq = n;
                return true;
            }else{
                this.message = "Invalid password requirement value!";
                return false;
            }
        }
    }

    setPassLen(l)
    {
        this.passLen = l;
        return true;
    }

    setVal(val)
    {
        this.val = val;
        return true;
    }

    setValLabel(label)
    {
        this.valLabel = label;
        return true;
    }

    isHostname(lvls = 0)
    {
        if (lvls > 0)
        {
            var host = this.val.split(".");
            if (host.length != lvls) return this.setStatus(false);
        }
        var regex = new RegExp(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/); // RFC 1123
        return this.checkRE(regex);
    }

    isEmail()
    {
        var regex = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
        return this.checkRE(regex);
    }

    isFQDN()
    {
        var regex = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        return this.checkRE(regex);
    }

    isIPv4()
    {
        var regex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
        return this.checkRE(regex);
    }

    valPass()
    {
        var missing = "";
        var pOK = true;

        if (this.val.length < this.passLen)
        {
            this.message = this.valLabel + " must be at least " + this.passLen + " characters.";
            return this.setStatus(false);
        }

        switch (true)
        {
            case (this.passReq == 4):
                if (this.re(onlyNumbers))
                {
                    return this.setStatus(true);
                }else{
                    this.message = this.valLabel + " may only contain numbers.";
                    return this.setStatus(false);
                }
            break;
            case (this.passReq == 8):
                if (this.re(onlyLetters))
                {
                    return this.setStatus(true);
                }else{
                    this.message = this.valLabel + " may only contain letters.";
                    return this.setStatus(false);
                }
            break;
            case (this.passReq >= 16):
                if (!this.re(hasLetter))
                {
                    missing += ", at least one letter";
                    pOK = false;
                }
                if (!this.re(hasNumber))
                {
                    missing += ", at least one number";
                    pOK = false;
                }
                if (this.passReq == 16) break;
            case (this.passReq >= 32):
                if (!this.re(hasLC))
                {
                    missing += ", at least one lowercase letter";
                    pOK = false;
                }
                if (!this.re(hasUC))
                {
                    missing += ", at least one uppercase letter";
                    pOK = false;
                }
                if (this.passReq == 32) break;
            case (this.passReq == 64):
                if (!this.re(hasSym))
                {
                    missing += ", at least one symbol";
                    pOK = false;
                }
            break;
            default:
                this.message = "Invalid password requirement value!";
                return this.setStatus(false);
        }

        if (pOK)
        {
            return this.setStatus(true);
        }else{
            this.message = this.valLabel + " must contain: " + missing.substr(2);
            return this.setStatus(false);
        }
    }

    isLength(len1, len2)
    {
        if (len2 == undefined) len2 = 0;
        if (this.val.length < len1)
        {
            this.message = this.valLabel + " must be at least " + len1 + " characters.";
            return this.setStatus(false);
        }
        if (len2 && this.val.length > len2)
        {
            this.message = this.valLabel + " must be fewer than " + len2 + " characters.";
            return this.setStatus(false);
        }
        return this.setStatus(true);
    }
}