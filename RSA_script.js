/*
0 : 입력안됨
1 : 소수
2 : 수 아님
3 : 소수 아님
*/
let is_p = 0, is_q = 0, p, q, e, d, n, phi_n, digits;
let tester = [];

function min(a, b) {
  if(a <= b) return a;
  return b;
}

function isPrime(a) {
  if(a < 1373653) tester = [2, 3];
  else if(a < 9080191) tester = [31, 73];
  else if(a < 4759123141) tester = [2, 7, 61];
  else if(a < 2152302898747) tester = [2, 3, 5, 7, 11];
  else if(a < 3474749660383) tester = [2, 3, 5, 7, 11, 13];
  else tester = [2, 3, 5, 7, 11, 13, 17];
  return 1;
}

function find_d() {
  let i = e+1;
  while(1) {
    if((i*e) % phi_n == 1) return i;  
    i++;
  }
}

function get_digits(a) {
  digits = 0;
  let cnt = 1;
  while(a >= cnt) {
    cnt *= 2;
    digits++;
  }
  digits = min(8, digits);
}

function is_n_phi_changed() {
  if(is_p == 1 && is_q == 1) {
    document.getElementById("n").innerText = "n : "+p*q;
    document.getElementById("phi").innerText = "Φ(n) : "+(p-1)*(q-1);
    n = p*q;
    get_digits(n);
    phi_n = (p-1)*(q-1);
    e = phi_n-1;
    d = find_d();
    document.getElementById("e").innerText = "e : "+e;
    document.getElementById("d").innerText = "d : "+d;
  } else {
    document.getElementById("n").innerText = "n : ";
    document.getElementById("phi").innerText = "Φ(n) : ";
    document.getElementById("e").innerText = "e : ";
    document.getElementById("d").innerText = "d : ";
  }
}

function P_Changed() {
  let now = document.getElementById('p').value;
  let prt;
  if(now == '') {
    is_p = 0;
    prt = "p값을 입력해주세요.";
  } else if(isNaN(now)) {
    is_p = 2;
    prt = "입력된 p의 값이 자연수가 아닙니다";
  } else if(!isPrime(now)) {
    is_p = 3;
    prt = "입력된 p의 값이 소수가 아닙니다";
  } else {
    is_p = 1;
    p = now;
    prt = 'p : '+now;
  }
  is_n_phi_changed();
  document.getElementById("p_out").innerText = prt;
}

function Q_Changed() {
  let now = document.getElementById('q').value;
  let prt;
  if(now == '') {
    is_q = 0;
    prt = "q값을 입력해주세요.";
  } else if(isNaN(now)) {
    is_q = 2;
    prt = "입력된 q의 값이 자연수가 아닙니다";
  } else if(!isPrime(now)) {
    is_q = 3;
    prt = "입력된 q의 값이 소수가 아닙니다";
  } else {
    is_q = 1;
    q = now;
    prt = 'q : '+now;
  }
  is_n_phi_changed();
  document.getElementById("q_out").innerText = prt;
}

function encode(str) {
  // let ans = '';
  // let tot = [];
  // for(let i = 0; i < str.length; i++) {
  //   let now = str[i].charCodeAt(0);
  //   now = (now ** e)%n;
  //   let ex = [];
  //   while(now) {
  //     ex.push(now%2);
  //     now -= now%2;
  //     now /= 2;
  //   }
  //   for(let j = ex.length; j < digits; j++) {
  //     tot.push(0);
  //   }
  //   for(let j = ex.length-1; j >= 0; j--) {
  //     tot.push(ex[j]);
  //   }
  // }
  let tot = 1;
  for(let i = 0; i < e; i++) {
    tot *= str;
    tot %= n;
  }
  document.getElementById('encode_output').value = tot;
}

function decode(str) {
  // let ans = '';
  // for(let i = 0; i < str.length; i++) {
  //   let a = i%26, b = (i-i%26)/26, c = (i-i%676)/676;
  //   let now = str[i].charCodeAt(0);
  //   if(65 <= now && now <= 90) {
  //     now -= 65;
  //     ans += String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+65);
  //   } else if(97 <= now && now <= 122) {
  //     now -= 97;
  //     ans += String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+97);
  //   } else ans += str[i];
  // }
  let tot = 1;
  for(let i = 0; i < d; i++) {
    tot *= str;
    tot %= n;
  }
  console.log(tot);
  document.getElementById('decode_output').value = tot;
}

window.onload=function() {
  document.getElementById('encode').onclick=function () {
    encode(document.getElementById('encode_input').value);
  };
  document.getElementById('decode').onclick=function () {
    decode(document.getElementById('decode_input').value);
  };
}