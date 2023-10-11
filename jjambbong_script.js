let turning1 = [
  12,
  23,
  0,
  22,
  7,
  3,
  4,
  13,
  20,
  1,
  19,
  15,
  18,
  6,
  21,
  5,
  11,
  25,
  8,
  2,
  16,
  17,
  14,
  10,
  9,
  24
];
let turning2 = [
  6,
  7,
  18,
  12,
  24,
  16,
  22,
  25,
  13,
  15,
  21,
  19,
  20,
  4,
  10,
  8,
  3,
  5,
  23,
  17,
  1,
  14,
  2,
  11,
  0,
  9
];
let turning3 = [
  15,
  21,
  11,
  2,
  10,
  3,
  19,
  0,
  17,
  20,
  13,
  7,
  25,
  24,
  6,
  5,
  9,
  1,
  18,
  4,
  8,
  12,
  14,
  16,
  23,
  22
];
let decode_turning1 = [
  2,
  9,
  19,
  5,
  6,
  15,
  13,
  4,
  18,
  24,
  23,
  16,
  0,
  7,
  22,
  11,
  20,
  21,
  12,
  10,
  8,
  14,
  3,
  1,
  25,
  17
];
let decode_turning2 = [
  24,
  20,
  22,
  16,
  13,
  17,
  0,
  1,
  15,
  25,
  14,
  23,
  3,
  8,
  21,
  9,
  5,
  19,
  2,
  11,
  12,
  10,
  6,
  18,
  4,
  7
];
let decode_turning3 = [
  7,
  17,
  3,
  5,
  19,
  15,
  14,
  11,
  20,
  16,
  4,
  2,
  21,
  10,
  22,
  0,
  23,
  8,
  18,
  6,
  9,
  1,
  25,
  24,
  13,
  12
];

let is_p = 0, is_q = 0, p, q, e, d, n, phi_n;

function enigma_encode(i, now) {
  let a = i%26, b = (i-i%26)/26, c = (i-i%676)/676;
  if(65 <= now && now <= 90) {
    now -= 65;
    return String.fromCharCode(turning3[(turning2[(turning1[(now+26-a)%26]+26-b)%26]+26-c)%26]+65);
  } else {
    now -= 97;
    return String.fromCharCode(turning3[(turning2[(turning1[(now+26-a)%26]+26-b)%26]+26-c)%26]+97);
  }
}

function enigma_decode(i, now) {
  let a = i%26, b = (i-i%26)/26, c = (i-i%676)/676;
  if(65 <= now && now <= 90) {
    now -= 65;
    return String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+65);
  } else {
    now -= 97;
    return String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+97);
  }
}

function find_d() {
  let i = e+1;
  while(1) {
    if((i*e) % phi_n == 1) return i;  
    i++;
  }
} 

function is_n_phi_changed() {
  if(is_p == 1 && is_q == 1) {
    n = p*q;
    phi_n = (p-1)*(q-1);
    e = phi_n-1;
    d = find_d();
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
  } else {
    is_q = 1;
    q = now;
    prt = 'q : '+now;
  }
  is_n_phi_changed();
  document.getElementById("q_out").innerText = prt;
}

function rsa_encode(a) {
  let tot = 1;
  for(let i = 0; i < e; i++) {
    tot *= a;
    tot %= n;
  }
  return tot;
}

function rsa_decode(a) {
  let tot = 1;
  for(let i = 0; i < d; i++) {
    tot *= a;
    tot %= n;
  }
  return tot;
}

function encode(str) {
  let ans = '';
  let cnt = 0;
  for(let i = 0; i < str.length; i++) {
    let now = str[i].charCodeAt(0);
    if((65 <= now && now <= 90) || (97 <= now && now <= 122)) ans += enigma_encode(cnt++, now);
    else if(48 <= now && now <= 57) {
      let num = now-48;
      for(; i < str.length-1; i++) {
        let ex = str[i+1].charCodeAt(0);
        if(!(48 <= ex && ex <= 57)) break;
        num *= 10;
        num += ex-48;
      }
      console.log(rsa_encode(num));
      ans += rsa_encode(num);
    } else ans += str[i];
  }
  document.getElementById('encode_output').value = ans;
}

function decode(str) {
  let ans = '';
  let cnt = 0;
  for(let i = 0; i < str.length; i++) {
    let now = str[i].charCodeAt(0);
    if((65 <= now && now <= 90) || (97 <= now && now <= 122)) ans += enigma_decode(cnt++, now);
    else if(48 <= now && now <= 57) {
      let num = now-48;
      for(; i < str.length-1; i++) {
        let ex = str[i+1].charCodeAt(0);
        if(!(48 <= ex && ex <= 57)) break;
        num *= 10;
        num += ex-48;
      }
      ans += rsa_decode(num);
    } else ans += str[i];
  }
  document.getElementById('decode_output').value = ans;
}

window.onload=function() {
  document.getElementById('encode').onclick=function () {
    encode(document.getElementById('encode_input').value);
  };
  document.getElementById('decode').onclick=function () {
    decode(document.getElementById('decode_input').value);
  };
}