/* eslint-disable */

(function () {
  !(function (t, n, e) {
    var l = void 0,
      c = !0,
      u = null,
      p = !1;
    function i(t) {
      return function () {
        return this[t];
      };
    }
    var s = this;
    function o(t, e) {
      var i,
        n = t.split("."),
        o = s;
      !(n[0] in o) && o.execScript && o.execScript("var " + n[0]);
      for (; n.length && (i = n.shift()); )
        n.length || e === l ? (o = o[i] ? o[i] : (o[i] = {})) : (o[i] = e);
    }
    function r(t, e, i) {
      return t.call.apply(t.bind, arguments);
    }
    function a(e, i, t) {
      if (!e) throw Error();
      if (2 < arguments.length) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function () {
          var t = Array.prototype.slice.call(arguments);
          return Array.prototype.unshift.apply(t, n), e.apply(i, t);
        };
      }
      return function () {
        return e.apply(i, arguments);
      };
    }
    function f(t, e, i) {
      return (f =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
          ? r
          : a).apply(u, arguments);
    }
    s.Ba = c;
    var h =
      Date.now ||
      function () {
        return +new Date();
      };
    function d(t, e) {
      (this.G = t), (this.u = e || t), (this.z = this.u.document), (this.R = l);
    }
    function g(t, e, i) {
      (t = t.z.getElementsByTagName(e)[0]) || (t = n.documentElement),
        t && t.lastChild && t.insertBefore(i, t.lastChild);
    }
    function w(t, e) {
      return t.createElement("link", { rel: "stylesheet", href: e });
    }
    function m(t, e) {
      return t.createElement("script", { src: e });
    }
    function y(t, e) {
      for (var i = t.className.split(/\s+/), n = 0, o = i.length; n < o; n++)
        if (i[n] == e) return;
      i.push(e),
        (t.className = i
          .join(" ")
          .replace(/\s+/g, " ")
          .replace(/^\s+|\s+$/, ""));
    }
    function v(t, e) {
      for (
        var i = t.className.split(/\s+/), n = [], o = 0, s = i.length;
        o < s;
        o++
      )
        i[o] != e && n.push(i[o]);
      t.className = n
        .join(" ")
        .replace(/\s+/g, " ")
        .replace(/^\s+|\s+$/, "");
    }
    function b(t, e) {
      for (var i = t.className.split(/\s+/), n = 0, o = i.length; n < o; n++)
        if (i[n] == e) return c;
      return p;
    }
    function k(t) {
      if (t.R === l) {
        var e = t.z.createElement("p");
        (e.innerHTML = '<a style="top:1px;">w</a>'),
          (t.R = /top/.test(
            e.getElementsByTagName("a")[0].getAttribute("style"),
          ));
      }
      return t.R;
    }
    function x(t) {
      var e = t.u.location.protocol;
      return (
        "about:" == e && (e = t.G.location.protocol),
        "https:" == e ? "https:" : "http:"
      );
    }
    function _(t, e, i) {
      (this.w = t), (this.T = e), (this.Aa = i);
    }
    function O(t, e, i, n) {
      (this.e = t != u ? t : u),
        (this.o = e != u ? e : u),
        (this.ba = i != u ? i : u),
        (this.f = n != u ? n : u);
    }
    (d.prototype.createElement = function (t, e, i) {
      if (((t = this.z.createElement(t)), e))
        for (var n in e)
          if (e.hasOwnProperty(n))
            if ("style" == n) {
              var o = t,
                s = e[n];
              k(this) ? o.setAttribute("style", s) : (o.style.cssText = s);
            } else t.setAttribute(n, e[n]);
      return i && t.appendChild(this.z.createTextNode(i)), t;
    }),
      o("webfont.BrowserInfo", _),
      (_.prototype.qa = i("w")),
      (_.prototype.hasWebFontSupport = _.prototype.qa),
      (_.prototype.ra = i("T")),
      (_.prototype.hasWebKitFallbackBug = _.prototype.ra),
      (_.prototype.sa = i("Aa")),
      (_.prototype.hasWebKitMetricsBug = _.prototype.sa);
    var S = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    function A(t) {
      t = S.exec(t);
      var e = u,
        i = u,
        n = u,
        o = u;
      return (
        t &&
          (t[1] !== u && t[1] && (e = parseInt(t[1], 10)),
          t[2] !== u && t[2] && (i = parseInt(t[2], 10)),
          t[3] !== u && t[3] && (n = parseInt(t[3], 10)),
          t[4] !== u &&
            t[4] &&
            (o = /^[0-9]+$/.test(t[4]) ? parseInt(t[4], 10) : t[4])),
        new O(e, i, n, o)
      );
    }
    function B(t, e, i, n, o, s, r, a, h, p, f) {
      (this.J = t),
        (this.Ha = e),
        (this.za = i),
        (this.ga = n),
        (this.Fa = o),
        (this.fa = s),
        (this.xa = r),
        (this.Ga = a),
        (this.wa = h),
        (this.ea = p),
        (this.k = f);
    }
    function N(t, e) {
      (this.a = t), (this.H = e);
    }
    (O.prototype.toString = function () {
      return [this.e, this.o || "", this.ba || "", this.f || ""].join("");
    }),
      o("webfont.UserAgent", B),
      (B.prototype.getName = B.prototype.getName = i("J")),
      (B.prototype.pa = i("za")),
      (B.prototype.getVersion = B.prototype.pa),
      (B.prototype.la = i("ga")),
      (B.prototype.getEngine = B.prototype.la),
      (B.prototype.ma = i("fa")),
      (B.prototype.getEngineVersion = B.prototype.ma),
      (B.prototype.na = i("xa")),
      (B.prototype.getPlatform = B.prototype.na),
      (B.prototype.oa = i("wa")),
      (B.prototype.getPlatformVersion = B.prototype.oa),
      (B.prototype.ka = i("ea")),
      (B.prototype.getDocumentMode = B.prototype.ka),
      (B.prototype.ja = i("k")),
      (B.prototype.getBrowserInfo = B.prototype.ja);
    var j = new B(
      "Unknown",
      new O(),
      "Unknown",
      "Unknown",
      new O(),
      "Unknown",
      "Unknown",
      new O(),
      "Unknown",
      l,
      new _(p, p, p),
    );
    function C(t) {
      var e = M(
        t.a,
        /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,
        1,
      );
      return "" != e
        ? (/BB\d{2}/.test(e) && (e = "BlackBerry"), e)
        : "" != (t = M(t.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1))
          ? ("Mac_PowerPC" == t && (t = "Macintosh"), t)
          : "Unknown";
    }
    function P(t) {
      if (
        (e = M(t.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2)) ||
        (e = M(t.a, /Windows Phone( OS)? ([^;)]+)/, 2)) ||
        (e = M(t.a, /(iPhone )?OS ([\d_]+)/, 2))
      )
        return e;
      if ((e = M(t.a, /(?:Linux|CrOS) ([^;)]+)/, 1)))
        for (var e = e.split(/\s/), i = 0; i < e.length; i += 1)
          if (/^[\d\._]+$/.test(e[i])) return e[i];
      return (t = M(t.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2))
        ? t
        : "Unknown";
    }
    function M(t, e, i) {
      return (t = t.match(e)) && t[i] ? t[i] : "";
    }
    function I(t) {
      if (t.documentMode) return t.documentMode;
    }
    function E(t) {
      this.va = t || "-";
    }
    function W(t, e) {
      (this.J = t), (this.U = 4), (this.K = "n");
      var i = (e || "n4").match(/^([nio])([1-9])$/i);
      i && ((this.K = i[1]), (this.U = parseInt(i[2], 10)));
    }
    function U(t) {
      return t.K + t.U;
    }
    function F(t, e, i) {
      (this.c = t),
        (this.h = e),
        (this.M = i),
        (this.j = "wf"),
        (this.g = new E("-"));
    }
    function T(t) {
      y(t.h, t.g.f(t.j, "loading")), L(t, "loading");
    }
    function q(t) {
      v(t.h, t.g.f(t.j, "loading")),
        b(t.h, t.g.f(t.j, "active")) || y(t.h, t.g.f(t.j, "inactive")),
        L(t, "inactive");
    }
    function L(t, e, i) {
      t.M[e] && (i ? t.M[e](i.getName(), U(i)) : t.M[e]());
    }
    function z(t, e) {
      (this.c = t),
        (this.C = e),
        (this.s = this.c.createElement(
          "span",
          { "aria-hidden": "true" },
          this.C,
        ));
    }
    function G(t, e) {
      var i,
        n = t.s;
      i = [];
      for (var o = e.J.split(/,\s*/), s = 0; s < o.length; s++) {
        var r = o[s].replace(/['"]/g, "");
        -1 == r.indexOf(" ") ? i.push(r) : i.push("'" + r + "'");
      }
      (i = i.join(",")),
        (o = "normal"),
        (s = e.U + "00"),
        "o" === e.K ? (o = "oblique") : "i" === e.K && (o = "italic"),
        (i =
          "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" +
          i +
          ";font-style:" +
          o +
          ";font-weight:" +
          s +
          ";"),
        k(t.c) ? n.setAttribute("style", i) : (n.style.cssText = i);
    }
    function R(t) {
      g(t.c, "body", t.s);
    }
    function V(t, e, i, n, o, s, r, a) {
      for (var h in ((this.V = t),
      (this.ta = e),
      (this.c = i),
      (this.q = n),
      (this.C = a || "BESbswy"),
      (this.k = o),
      (this.F = {}),
      (this.S = s || 5e3),
      (this.Z = r || u),
      (this.B = this.A = u),
      R((t = new z(this.c, this.C))),
      $))
        $.hasOwnProperty(h) &&
          (G(t, new W($[h], U(this.q))), (this.F[$[h]] = t.s.offsetWidth));
      t.remove();
    }
    (N.prototype.parse = function () {
      var t;
      if (-1 != this.a.indexOf("MSIE")) {
        t = C(this);
        var e = A((o = P(this)));
        t = new B(
          "MSIE",
          (i = A((s = M(this.a, /MSIE ([\d\w\.]+)/, 1)))),
          s,
          "MSIE",
          i,
          s,
          t,
          e,
          o,
          I(this.H),
          new _(
            ("Windows" == t && 6 <= i.e) || ("Windows Phone" == t && 8 <= e.e),
            p,
            p,
          ),
        );
      } else if (-1 != this.a.indexOf("Opera"))
        t: {
          t = "Unknown";
          e = A((o = M(this.a, /Presto\/([\d\w\.]+)/, 1)));
          var i = A((s = P(this))),
            n = I(this.H);
          if (
            (e.e !== u
              ? (t = "Presto")
              : (-1 != this.a.indexOf("Gecko") && (t = "Gecko"),
                (e = A((o = M(this.a, /rv:([^\)]+)/, 1))))),
            -1 != this.a.indexOf("Opera Mini/"))
          ) {
            t = new B(
              "OperaMini",
              (h = A((a = M(this.a, /Opera Mini\/([\d\.]+)/, 1)))),
              a,
              t,
              e,
              o,
              C(this),
              i,
              s,
              n,
              new _(p, p, p),
            );
          } else {
            if (
              -1 != this.a.indexOf("Version/") &&
              (h = A((a = M(this.a, /Version\/([\d\.]+)/, 1)))).e !== u
            ) {
              t = new B(
                "Opera",
                h,
                a,
                t,
                e,
                o,
                C(this),
                i,
                s,
                n,
                new _(10 <= h.e, p, p),
              );
              break t;
            }
            t =
              (h = A((a = M(this.a, /Opera[\/ ]([\d\.]+)/, 1)))).e !== u
                ? new B(
                    "Opera",
                    h,
                    a,
                    t,
                    e,
                    o,
                    C(this),
                    i,
                    s,
                    n,
                    new _(10 <= h.e, p, p),
                  )
                : new B(
                    "Opera",
                    new O(),
                    "Unknown",
                    t,
                    e,
                    o,
                    C(this),
                    i,
                    s,
                    n,
                    new _(p, p, p),
                  );
          }
        }
      else if (/AppleWeb(K|k)it/.test(this.a)) {
        t = C(this);
        (e = A((o = P(this)))),
          (i = A((s = M(this.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1)))),
          (n = "Unknown");
        var o,
          s,
          r,
          a = new O(),
          h = "Unknown";
        -1 != this.a.indexOf("Chrome") ||
        -1 != this.a.indexOf("CrMo") ||
        -1 != this.a.indexOf("CriOS")
          ? (n = "Chrome")
          : /Silk\/\d/.test(this.a)
            ? (n = "Silk")
            : "BlackBerry" == t || "Android" == t
              ? (n = "BuiltinBrowser")
              : -1 != this.a.indexOf("Safari")
                ? (n = "Safari")
                : -1 != this.a.indexOf("AdobeAIR") && (n = "AdobeAIR"),
          "BuiltinBrowser" == n
            ? (h = "Unknown")
            : "Silk" == n
              ? (h = M(this.a, /Silk\/([\d\._]+)/, 1))
              : "Chrome" == n
                ? (h = M(this.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2))
                : -1 != this.a.indexOf("Version/")
                  ? (h = M(this.a, /Version\/([\d\.\w]+)/, 1))
                  : "AdobeAIR" == n &&
                    (h = M(this.a, /AdobeAIR\/([\d\.]+)/, 1)),
          (a = A(h)),
          (r =
            "AdobeAIR" == n
              ? 2 < a.e || (2 == a.e && 5 <= a.o)
              : "BlackBerry" == t
                ? 10 <= e.e
                : "Android" == t
                  ? 2 < e.e || (2 == e.e && 1 < e.o)
                  : 526 <= i.e || (525 <= i.e && 13 <= i.o)),
          (t = new B(
            n,
            a,
            h,
            "AppleWebKit",
            i,
            s,
            t,
            e,
            o,
            I(this.H),
            new _(
              r,
              i.e < 536 || (536 == i.e && i.o < 11),
              "iPhone" == t || "iPad" == t || "iPod" == t || "Macintosh" == t,
            ),
          ));
      } else
        -1 != this.a.indexOf("Gecko")
          ? ((t = "Unknown"),
            (o = new O()),
            (e = "Unknown"),
            (i = A((s = P(this)))),
            (n = p),
            -1 != this.a.indexOf("Firefox")
              ? ((t = "Firefox"),
                (n =
                  3 <= (o = A((e = M(this.a, /Firefox\/([\d\w\.]+)/, 1)))).e &&
                  5 <= o.o))
              : -1 != this.a.indexOf("Mozilla") && (t = "Mozilla"),
            (h = A((a = M(this.a, /rv:([^\)]+)/, 1)))),
            n ||
              (n =
                1 < h.e ||
                (1 == h.e && 9 < h.o) ||
                (1 == h.e && 9 == h.o && 2 <= h.ba) ||
                a.match(/1\.9\.1b[123]/) != u ||
                a.match(/1\.9\.1\.[\d\.]+/) != u),
            (t = new B(
              t,
              o,
              e,
              "Gecko",
              h,
              a,
              C(this),
              i,
              s,
              I(this.H),
              new _(n, p, p),
            )))
          : (t = j);
      return t;
    }),
      (E.prototype.f = function (t) {
        for (var e = [], i = 0; i < arguments.length; i++)
          e.push(arguments[i].replace(/[\W_]+/g, "").toLowerCase());
        return e.join(this.va);
      }),
      (W.prototype.getName = i("J")),
      (z.prototype.remove = function () {
        var t = this.s;
        t.parentNode && t.parentNode.removeChild(t);
      });
    var $ = { Ea: "serif", Da: "sans-serif", Ca: "monospace" };
    function D(t, e, i) {
      for (var n in $)
        if ($.hasOwnProperty(n) && e === t.F[$[n]] && i === t.F[$[n]]) return c;
      return p;
    }
    function K(t, e) {
      t.A.remove(), t.B.remove(), e(t.q);
    }
    function H(t, e, i, n) {
      (this.c = e),
        (this.t = i),
        (this.N = 0),
        (this.ca = this.Y = p),
        (this.S = n),
        (this.k = t.k);
    }
    function J(t, e, i, n, o) {
      if (0 === e.length && o) q(t.t);
      else
        for (t.N += e.length, o && (t.Y = o), o = 0; o < e.length; o++) {
          var s = e[o],
            r = i[s.getName()],
            a = t.t,
            h = s;
          y(a.h, a.g.f(a.j, h.getName(), U(h).toString(), "loading")),
            L(a, "fontloading", h),
            new V(f(t.ha, t), f(t.ia, t), t.c, s, t.k, t.S, n, r).start();
        }
    }
    function Q(t) {
      0 == --t.N &&
        t.Y &&
        (t.ca
          ? (v((t = t.t).h, t.g.f(t.j, "loading")),
            v(t.h, t.g.f(t.j, "inactive")),
            y(t.h, t.g.f(t.j, "active")),
            L(t, "active"))
          : q(t.t));
    }
    function X(t, e, i) {
      (this.G = t), (this.W = e), (this.a = i), (this.O = this.P = 0);
    }
    function Y(t, e) {
      et.W.$[t] = e;
    }
    (V.prototype.start = function () {
      (this.A = new z(this.c, this.C)),
        R(this.A),
        (this.B = new z(this.c, this.C)),
        R(this.B),
        (this.ya = h()),
        G(this.A, new W(this.q.getName() + ",serif", U(this.q))),
        G(this.B, new W(this.q.getName() + ",sans-serif", U(this.q))),
        (function t(e) {
          var i = e.A.s.offsetWidth,
            n = e.B.s.offsetWidth;
          (i === e.F.serif && n === e.F["sans-serif"]) || (e.k.T && D(e, i, n))
            ? h() - e.ya >= e.S
              ? e.k.T &&
                D(e, i, n) &&
                (e.Z === u || e.Z.hasOwnProperty(e.q.getName()))
                ? K(e, e.V)
                : K(e, e.ta)
              : setTimeout(
                  f(function () {
                    t(this);
                  }, e),
                  25,
                )
            : K(e, e.V);
        })(this);
    }),
      (H.prototype.ha = function (t) {
        var e = this.t;
        v(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "loading")),
          v(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "inactive")),
          y(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "active")),
          L(e, "fontactive", t),
          (this.ca = c),
          Q(this);
      }),
      (H.prototype.ia = function (t) {
        var e = this.t;
        v(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "loading")),
          b(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "active")) ||
            y(e.h, e.g.f(e.j, t.getName(), U(t).toString(), "inactive")),
          L(e, "fontinactive", t),
          Q(this);
      }),
      (X.prototype.load = function (t) {
        var e = t.context || this.G;
        if (
          ((this.c = new d(this.G, e)),
          (e = new F(this.c, e.document.documentElement, t)),
          this.a.k.w)
        ) {
          var i,
            n = this.W,
            o = this.c,
            s = [];
          for (i in t)
            if (t.hasOwnProperty(i)) {
              var r = n.$[i];
              r && s.push(r(t[i], o));
            }
          for (
            t = t.timeout,
              this.O = this.P = s.length,
              t = new H(this.a, this.c, e, t),
              i = 0,
              n = s.length;
            i < n;
            i++
          )
            (o = s[i]).v(this.a, f(this.ua, this, o, e, t));
        } else q(e);
      }),
      (X.prototype.ua = function (t, o, s, e) {
        var r = this;
        e
          ? t.load(function (t, e, i) {
              var n = 0 == --r.P;
              n && T(o),
                setTimeout(function () {
                  J(s, t, e || {}, i || u, n);
                }, 0);
            })
          : ((t = 0 == --this.P),
            this.O--,
            t && (0 == this.O ? q(o) : T(o)),
            J(s, [], {}, u, t));
      });
    var Z = t,
      tt = new N(navigator.userAgent, n).parse(),
      et = (Z.WebFont = new X(
        t,
        new (function () {
          this.$ = {};
        })(),
        tt,
      ));
    function it(t, e) {
      (this.c = t), (this.d = e);
    }
    function nt(t, e) {
      (this.c = t), (this.d = e);
    }
    (et.load = et.load),
      (it.prototype.load = function (t) {
        var e,
          i,
          n = this.d.urls || [],
          o = this.d.families || [];
        for (e = 0, i = n.length; e < i; e++)
          g(this.c, "head", w(this.c, n[e]));
        for (n = [], e = 0, i = o.length; e < i; e++) {
          var s = o[e].split(":");
          if (s[1])
            for (var r = s[1].split(","), a = 0; a < r.length; a += 1)
              n.push(new W(s[0], r[a]));
          else n.push(new W(s[0]));
        }
        t(n);
      }),
      (it.prototype.v = function (t, e) {
        return e(t.k.w);
      }),
      Y("custom", function (t, e) {
        return new it(e, t);
      });
    var ot = {
      regular: "n4",
      bold: "n7",
      italic: "i4",
      bolditalic: "i7",
      r: "n4",
      b: "n7",
      i: "i4",
      bi: "i7",
    };
    function st(t) {
      if (((t = (i = t.split(":"))[0]), i[1])) {
        for (var e = i[1].split(","), i = [], n = 0, o = e.length; n < o; n++) {
          var s = e[n];
          if (s) {
            var r = ot[s];
            i.push(r || s);
          }
        }
        for (e = [], n = 0; n < i.length; n += 1) e.push(new W(t, i[n]));
        return e;
      }
      return [new W(t)];
    }
    function rt(t, e, i) {
      (this.a = t), (this.c = e), (this.d = i), (this.m = []);
    }
    function at(t, e) {
      (this.c = t), (this.d = e), (this.m = []);
    }
    function ht(t, e, i) {
      (this.L = t || e + pt), (this.p = []), (this.Q = []), (this.da = i || "");
    }
    (nt.prototype.v = function (t, e) {
      return e(t.k.w);
    }),
      (nt.prototype.load = function (t) {
        g(
          this.c,
          "head",
          w(
            this.c,
            x(this.c) + "//webfonts.fontslive.com/css/" + this.d.key + ".css",
          ),
        );
        for (var e = this.d.families, i = [], n = 0, o = e.length; n < o; n++)
          i.push.apply(i, st(e[n]));
        t(i);
      }),
      Y("ascender", function (t, e) {
        return new nt(e, t);
      }),
      (rt.prototype.v = function (i, n) {
        var o = this,
          s = o.d.projectId,
          t = o.d.version;
        if (s) {
          var r = o.c.u,
            a = o.c.createElement("script");
          a.id = "__MonotypeAPIScript__" + s;
          var h = p;
          (a.onload = a.onreadystatechange =
            function () {
              if (
                !(
                  h ||
                  (this.readyState &&
                    "loaded" !== this.readyState &&
                    "complete" !== this.readyState)
                )
              ) {
                if (((h = c), r["__mti_fntLst" + s])) {
                  var t = r["__mti_fntLst" + s]();
                  if (t)
                    for (var e = 0; e < t.length; e++)
                      o.m.push(new W(t[e].fontfamily));
                }
                n(i.k.w), (a.onload = a.onreadystatechange = u);
              }
            }),
            (a.src = o.D(s, t)),
            g(this.c, "head", a);
        } else n(c);
      }),
      (rt.prototype.D = function (t, e) {
        return (
          x(this.c) +
          "//" +
          (this.d.api || "fast.fonts.com/jsapi").replace(
            /^.*http(s?):(\/\/)?/,
            "",
          ) +
          "/" +
          t +
          ".js" +
          (e ? "?v=" + e : "")
        );
      }),
      (rt.prototype.load = function (t) {
        t(this.m);
      }),
      Y("monotype", function (t, e) {
        return new rt(new N(navigator.userAgent, n).parse(), e, t);
      }),
      (at.prototype.D = function (t) {
        var e = x(this.c);
        return (this.d.api || e + "//use.typekit.net") + "/" + t + ".js";
      }),
      (at.prototype.v = function (e, r) {
        var t = this.d.id,
          i = this.d,
          n = this.c.u,
          a = this;
        t
          ? (n.__webfonttypekitmodule__ || (n.__webfonttypekitmodule__ = {}),
            (n.__webfonttypekitmodule__[t] = function (t) {
              t(e, i, function (t, e, i) {
                for (var n = 0; n < e.length; n += 1) {
                  var o = i[e[n]];
                  if (o)
                    for (var s = 0; s < o.length; s += 1)
                      a.m.push(new W(e[n], o[s]));
                  else a.m.push(new W(e[n]));
                }
                r(t);
              });
            }),
            (t = m(this.c, this.D(t))),
            g(this.c, "head", t))
          : r(c);
      }),
      (at.prototype.load = function (t) {
        t(this.m);
      }),
      Y("typekit", function (t, e) {
        return new at(e, t);
      });
    var pt = "//fonts.googleapis.com/css";
    function ft(t) {
      (this.p = t), (this.aa = []), (this.I = {});
    }
    ht.prototype.f = function () {
      if (0 == this.p.length) throw Error("No fonts to load !");
      if (-1 != this.L.indexOf("kit=")) return this.L;
      for (var t = this.p.length, e = [], i = 0; i < t; i++)
        e.push(this.p[i].replace(/ /g, "+"));
      return (
        (t = this.L + "?family=" + e.join("%7C")),
        0 < this.Q.length && (t += "&subset=" + this.Q.join(",")),
        0 < this.da.length && (t += "&text=" + encodeURIComponent(this.da)),
        t
      );
    };
    var ct = {
        latin: "BESbswy",
        cyrillic: "&#1081;&#1103;&#1046;",
        greek: "&#945;&#946;&#931;",
        khmer: "&#x1780;&#x1781;&#x1782;",
        Hanuman: "&#x1780;&#x1781;&#x1782;",
      },
      lt = {
        thin: "1",
        extralight: "2",
        "extra-light": "2",
        ultralight: "2",
        "ultra-light": "2",
        light: "3",
        regular: "4",
        book: "4",
        medium: "5",
        "semi-bold": "6",
        semibold: "6",
        "demi-bold": "6",
        demibold: "6",
        bold: "7",
        "extra-bold": "8",
        extrabold: "8",
        "ultra-bold": "8",
        ultrabold: "8",
        black: "9",
        heavy: "9",
        l: "3",
        r: "4",
        b: "7",
      },
      ut = { i: "i", italic: "i", n: "n", normal: "n" },
      dt = RegExp(
        "^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$",
      );
    function gt(t, e, i) {
      (this.a = t), (this.c = e), (this.d = i);
    }
    ft.prototype.parse = function () {
      for (var t = this.p.length, e = 0; e < t; e++) {
        var i = this.p[e].split(":"),
          n = i[0].replace(/\+/g, " "),
          o = ["n4"];
        if (2 <= i.length) {
          var s;
          if (((s = []), (r = i[1])))
            for (var r, a = (r = r.split(",")).length, h = 0; h < a; h++) {
              var p;
              if ((p = r[h]).match(/^[\w]+$/)) {
                p = dt.exec(p.toLowerCase());
                var f = l;
                if (p == u) f = "";
                else {
                  if (((f = l), (f = p[1]) == u || "" == f)) f = "4";
                  else {
                    var c = lt[f];
                    f = c || (isNaN(f) ? "4" : f.substr(0, 1));
                  }
                  f = [p[2] == u || "" == p[2] ? "n" : ut[p[2]], f].join("");
                }
                p = f;
              } else p = "";
              p && s.push(p);
            }
          0 < s.length && (o = s),
            3 == i.length &&
              ((s = []),
              0 < (i = (i = i[2]) ? i.split(",") : s).length &&
                (i = ct[i[0]]) &&
                (this.I[n] = i));
        }
        for (
          this.I[n] || ((i = ct[n]) && (this.I[n] = i)), i = 0;
          i < o.length;
          i += 1
        )
          this.aa.push(new W(n, o[i]));
      }
    };
    var wt = { Arimo: c, Cousine: c, Tinos: c };
    function mt(t, e) {
      (this.c = t), (this.d = e), (this.m = []);
    }
    (gt.prototype.v = function (t, e) {
      e(t.k.w);
    }),
      (gt.prototype.load = function (t) {
        var e = this.c;
        if ("MSIE" == this.a.getName() && this.d.blocking != c) {
          var i = f(this.X, this, t),
            n = function () {
              e.z.body ? i() : setTimeout(n, 0);
            };
          n();
        } else this.X(t);
      }),
      (gt.prototype.X = function (t) {
        for (
          var e = this.c,
            i = new ht(this.d.api, x(e), this.d.text),
            n = this.d.families,
            o = n.length,
            s = 0;
          s < o;
          s++
        ) {
          var r = n[s].split(":");
          3 == r.length && i.Q.push(r.pop());
          var a = "";
          2 == r.length && "" != r[1] && (a = ":"), i.p.push(r.join(a));
        }
        (n = new ft(n)).parse(), g(e, "head", w(e, i.f())), t(n.aa, n.I, wt);
      }),
      Y("google", function (t, e) {
        return new gt(new N(navigator.userAgent, n).parse(), e, t);
      }),
      (mt.prototype.D = function (t) {
        return (
          x(this.c) +
          (this.d.api || "//f.fontdeck.com/s/css/js/") +
          (this.c.u.location.hostname || this.c.G.location.hostname) +
          "/" +
          t +
          ".js"
        );
      }),
      (mt.prototype.v = function (t, p) {
        var e = this.d.id,
          i = this.c.u,
          f = this;
        e
          ? (i.__webfontfontdeckmodule__ || (i.__webfontfontdeckmodule__ = {}),
            (i.__webfontfontdeckmodule__[e] = function (t, e) {
              for (var i = 0, n = e.fonts.length; i < n; ++i) {
                var o = e.fonts[i];
                f.m.push(
                  new W(
                    o.name,
                    ((s = "font-weight:" + o.weight + ";font-style:" + o.style),
                    (h = a = r = void 0),
                    (r = 4),
                    (a = "n"),
                    (h = u),
                    s &&
                      ((h = s.match(/(normal|oblique|italic)/i)) &&
                        h[1] &&
                        (a = h[1].substr(0, 1).toLowerCase()),
                      (h = s.match(/([1-9]00|normal|bold)/i)) &&
                        h[1] &&
                        (/bold/i.test(h[1])
                          ? (r = 7)
                          : /[1-9]00/.test(h[1]) &&
                            (r = parseInt(h[1].substr(0, 1), 10)))),
                    a + r),
                  ),
                );
              }
              var s, r, a, h;
              p(t);
            }),
            (e = m(this.c, this.D(e))),
            g(this.c, "head", e))
          : p(c);
      }),
      (mt.prototype.load = function (t) {
        t(this.m);
      }),
      Y("fontdeck", function (t, e) {
        return new mt(e, t);
      }),
      t.WebFontConfig && et.load(t.WebFontConfig);
  })(this, document);
}).call(window);

/* eslint-enable */
