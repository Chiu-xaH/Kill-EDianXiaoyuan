Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.encrypt = exports.decrypt = exports.addSign = void 0;
    var e = n(require("./aes")),
        t = n(require("./aes-json-format")),
        r = n(require("./sha1"));

    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    exports.decrypt = function(r, n) {
        return e.default.AES.decrypt(JSON.stringify(r), n, {
            format: t.default
        }).toString(e.default.enc.Utf8)
    };
    var o = function(r, n) {
        return e.default.AES.encrypt(JSON.stringify(r), n, {
            format: t.default
        }).toString()
    };
    exports.encrypt = o;
    exports.addSign = function(e, t, n) {
        e.ts = Date.parse((new Date).toString()) / 1e3, e.no = Math.floor(e.ts / 1031) + e.ts % 1e3;
        for (var s = Object.keys(e).sort(), a = t, u = 0; u < s.length; u++) a += e[s[u]];
        return e.sign = (0, r.default)(a), JSON.parse(o(e, n))
    };
