f = require("fs");

i = __dirname;
i += "/input";
y = f.readFileSync;
i = y(i);
i = i.toString();
i = i.split("\n");
i = i.slice(0, -1);

p = "".__proto__;
t = p.trim;
"".__proto__.t = t;
tr = (s) => s.t();
i = i.map(tr);

H = i.length;
C = i[0].length;

sr = 0;
sc = 0;

function F() {
 x = i[r][c];
 if (x == "S") {
  sr = r;
  sc = c;
  throw 0;
 }
}

r = 0;
for (; r++ < H; ) {
 c = 0;
 for (; c < C; ) {
  c++;
  try {
   F();
  } catch (_) {
   break;
  }
 }
}

function I(r, c) {
 return r * C + c;
}

function P(n) {
 let r = ~~(n / C);
 let c = n % C;
 return [r, c];
}

t = new Set();
t.add(I(sr, sc));

U = [];
U.push("S");
U.push("|");
U.push("L");
U.push("J");

D = [];
D.push("S");
D.push("|");
D.push("7");
D.push("F");

L = [];
L.push("S");
L.push("-");
L.push("7");
L.push("J");

R = [];
R.push("S");
R.push("-");
R.push("L");
R.push("F");

p = new Set();

h = 0;

k = [].includes;
[].__proto__.i = k;

function pr(n) {
 let [w, c] = P(n);

 let x = i[w][c];

 v = w - 1;
 y = w + 1;

 m = i[v] ?? [];
 k = i[y] ?? [];

 u = m[c];
 d = k[c];
 l = i[w][c - 1];
 r = i[w][c + 1];

 Ux = U.i(x);
 Dx = D.i(x);
 Lx = L.i(x);
 Rx = R.i(x);

 Du = D.i(u);
 Ud = U.i(d);
 Rl = R.i(l);
 Lr = L.i(r);

 if (Ux && Du) {
  wm = w - 1;
  v = I(wm, c);
  t.add(v);
 }
 if (Dx && Ud) {
  wp = w + 1;
  v = I(wp, c);
  t.add(v);
 }
 if (Lx && Rl) {
  cm = c - 1;
  v = I(w, cm);
  t.add(v);
 }
 if (Rx && Lr) {
  cp = c + 1;
  v = I(w, cp);
  t.add(v);
 }

 p.add(n);
}

function a(n) {
 if (!p.has(n)) {
  t.add(n);
 }
}

function z() {
 Z = t.size;
 return Z != 0;
}

while (z()) {
 vi = t.values();
 v = [...vi];
 t.clear();

 for (let n of v) {
  pr(n);
 }

 vi = t.values();
 v = [...vi];
 t.clear();

 for (let n of v) {
  a(n);
 }

 ++h;
}

console.log(h - 1);
