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
const table = document.getElementById("turnner");
let new_row = table.insertRow();
new_row.insertCell(0).innerText = '초기에 첫번째 회전판';
for(let i = 1; i <= 26; i++) {
  new_row.insertCell(i).innerText = String.fromCharCode(turning1[i-1]+97);
}
new_row = table.insertRow();
new_row.insertCell(0).innerText = '초기에 두번째 회전판';
for(let i = 1; i <= 26; i++) {
  new_row.insertCell(i).innerText = String.fromCharCode(turning2[i-1]+97);
}
new_row = table.insertRow();
new_row.insertCell(0).innerText = '초기에 세번째 회전판';
for(let i = 1; i <= 26; i++) {
  new_row.insertCell(i).innerText = String.fromCharCode(turning3[i-1]+97);
}
let base64 = [];

for(let i = 0; i < 26; i++) {
  base64.push(String.fromCharCode(i+65));
}
for(let i = 0; i < 26; i++) {
  base64.push(String.fromCharCode(i+97));
}
for(let i = 0; i < 10; i++) {
  base64.push(i);
}
base64.push('+');
base64.push('/');

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
    document.getElementById("rsa").style.margin = "0 auto 0 auto";
  } else document.getElementById("rsa").style.margin = "0 0 0 31%";
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
    prt = 'p : ';
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
    prt = 'q : ';
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

function base64_encode(str) {
  let bits = [];
  let ans = '';
  for(let i = 0; i < str.length; i++) {
    let ex = [];
    let c = str[i].charCodeAt(0);
    if(c < 128) {
      while(c != 0) {
        ex.push(c%2);
        c -= c%2;
        c /= 2;
      }
      for(let i = ex.length; i < 8; i++) {
        bits.push(0);
      }
      for(let i = ex.length-1; i >= 0; i--) {
        bits.push(ex[i]);
      }
    } else if(c < 2048) {
      while(c != 0) {
        ex.push(c%2);
        c -= c%2;
        c /= 2;
      }
      while(ex.length != 11) {
        ex.push(0);
      }
      bits.push(1);
      bits.push(1);
      bits.push(0);
      for(let i = ex.length-1; i > ex.length-6; i--) {
        bits.push(ex[i]);
      }
      bits.push(1);
      bits.push(0);
      for(let i = ex.length-6; i >= 0; i--) {
        bits.push(ex[i]);
      }
    } else if(c < 65536) {
      while(c != 0) {
        ex.push(c%2);
        c -= c%2;
        c /= 2;
      }
      while(ex.length != 16) {
        ex.push(0);
      }
      bits.push(1);
      bits.push(1);
      bits.push(1);
      bits.push(0);
      for(let i = ex.length-1; i > ex.length-5; i--) {
        bits.push(ex[i]);
      }
      bits.push(1);
      bits.push(0);
      for(let i = ex.length-5; i > ex.length-11; i--) {
        bits.push(ex[i]);
      }
      bits.push(1);
      bits.push(0);
      for(let i = ex.length-11; i >= 0; i--) {
        bits.push(ex[i]);
      }
    }
  }
  while(bits.length%6 || !bits.length) {
    bits.push(0);
  }
  c = 32;
  cnt = 0;
  for(let code of bits) {
    if(code) cnt += c;
    if(c == 1) {
      ans += base64[cnt];
      cnt = 0;
      c = 32;
    } else c /= 2;
  }
  return ans;
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
      ans += rsa_encode(num);
    } else if(now == 32) ans += str[i];
    else {
      let s = str[i];
      for(; i < str.length-1; i++) {
        let ex = str[i+1].charCodeAt(0);
        if((65 <= ex && ex <= 90) || (97 <= ex && ex <= 122) || (48 <= ex && ex <= 57) || ex == 32) break;
        s += str[i+1];
      }
      ans += '$';
      ans += base64_encode(s);
      ans += '#';
    }
  }
  document.getElementById('encode_output').value = ans;
}

function base64_decode(str) {
  ans = '';
  let bits = [];
  for(let i = 0; i < str.length; i++) {
    let ex = [];
    let now = str[i].charCodeAt(0);
    if(now == 43) now = 62;
    else if(now == 47) now = 63;
    else if(now < 58) now += 4;
    else if(now < 91) now -= 65;
    else now -= 71;
    while(now) {
      ex.push(now%2);
      now -= now%2;
      now /= 2;
    }
    while(ex.length%6 || !ex.length) {
      ex.push(0);
    }
    for(let j = 5; j >= 0; j--) {
      bits.push(ex[j]);
    }
  }
  for(let i = 0; i < bits.length; i++) {
    let cnt = 0;
    if(bits[i] == 0) {
      if(bits.length-i < 8) break;
      let ex = 128;
      for(let j = 0; j < 8; j++) {
        if(bits[j+i]) cnt += ex;
        ex /= 2;
      }
      i += 7;
    } else {
      let n;
      for(let j = 0; j < 4; j++) {
        if(!bits[i+j]) break;
        n = j+1;
      }
      switch(n) {
        case 2:
          let c = 1024;
          for(let j = 3; j < 8; j++) {
            if(bits[i+j]) cnt += c;
            c /= 2;
          }
          for(let j = 10; j < 16; j++) {
            if(bits[i+j]) cnt += c;
            c /= 2;
          }
          i += 15;
          break;
        case 3:
          let ex = 32768;
          for(let j = 4; j < 8; j++) {
            if(bits[i+j]) cnt += ex;
            ex /= 2;
          }
          for(let j = 10; j < 16; j++) {
            if(bits[i+j]) cnt += ex;
            ex /= 2;
          }
          for(let j = 18; j < 24; j++) {
            if(bits[i+j]) cnt += ex;
            ex /= 2;
          }
          i += 23;
          break;
      }
    }
    ans += String.fromCharCode(cnt);
  }
  return ans;
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
    } else if(now == 32) ans += str[i];
    else {
      let s = '';
      for(; i < str.length-1; i++) {
        let ex = str[i+1].charCodeAt(0);
        if((65 <= ex && ex <= 90) || (97 <= ex && ex <= 122) || (48 <= ex && ex <= 57)) s += str[i+1];
        else break;
      }
      i++;
      ans += base64_decode(s);
    }
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