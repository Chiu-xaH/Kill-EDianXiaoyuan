Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;
var e, t = (e = require("./aes")) && e.__esModule ? e : {
    default: e
};
var r = {
    stringify: function(e) {
        var r = {
            ct: e.ciphertext.toString(t.default.enc.Base64)
        };
        return e.iv && (r.iv = e.iv.toString()), e.salt && (r.s = e.salt.toString()), JSON.stringify(r).replace(/\s/g, "")
    },
    parse: function(e) {

        //console.log(JSON.parse(JSON.parse(e)))
        var r = JSON.parse(JSON.parse(e)),
            a = t.default.lib.CipherParams.create({
                ciphertext: t.default.enc.Base64.parse(r.ct)
            });
        return r.iv && (a.iv = t.default.enc.Hex.parse(r.iv)), r.s && (a.salt = t.default.enc.Hex.parse(r.s)), a
    }
};
exports.default = r;