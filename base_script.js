let base64 = [];
let base32 = [];
let base16 = [];

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

for(let i = 0; i < 26; i++) {
  base32.push(String.fromCharCode(i+65));
}
for(let i = 2; i < 8; i++) {
  base32.push(i);
}

for(let i = 0; i < 10; i++) {
  base16.push(i);
}
for(let i = 0; i < 6; i++) {
  base16.push(String.fromCharCode(i+65));
}

let now = 0;
function ChangeOptions() {
  var val = document.getElementById('area');
  var nowChoosing = val.options[val.selectedIndex].value;
  switch(nowChoosing) {
    case 'base64':
      now = 6;
      document.getElementById('encode_output').value = '';
      document.getElementById('decode_output').value = '';
      break;
    case 'base32':
      now = 5;
      document.getElementById('encode_output').value = '';
      document.getElementById('decode_output').value = '';
      break;
    case 'base16':
      now = 4;
      document.getElementById('encode_output').value = '';
      document.getElementById('decode_output').value = '';
      break;
    case 'non':
      now = 0;
      document.getElementById('encode_output').value = "base를 선택하지 않으셨군요!!!";
      document.getElementById('decode_output').value = "base를 선택하지 않으셨군요!!!";
      break;
  }
}

function isNon() {
  var val = document.getElementById('area');
  if(val.options[val.selectedIndex].value == 'non'){
    return true;
  }
  return false;
}


function encode(str) {
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
  switch(now) {
    case 0:
      document.getElementById('encode_output').value = "base를 선택하지 않으셨군요!!!";
      break;
    case 4:
      while(bits.length%4 || !bits.length) {
        bits.push(0);
      }
      c = 8;
      cnt = 0;
      for(let code of bits) {
        if(code) cnt += c;
        if(c == 1) {
          ans += base16[cnt];
          cnt = 0;
          c = 8;
        } else c /= 2;
      }
      document.getElementById('encode_output').value = ans;
      break;
    case 5:
      while(bits.length%5 || !bits.length) {
        bits.push(0);
      }
      c = 16;
      cnt = 0;
      for(let code of bits) {
        if(code) cnt += c;
        if(c == 1) {
          ans += base32[cnt];
          cnt = 0;
          c = 16;
        } else c /= 2;
      }
      document.getElementById('encode_output').value = ans;
      break;
    case 6:
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
      document.getElementById('encode_output').value = ans;
      break;
  }
}

function base16_decode(str) {
  let bits = [];
  for(let i = 0; i < str.length; i++) {
    let ex = [];
    let now = str[i].charCodeAt(0);
    if(now < 65) now -= 48;
    else now -= 55;
    while(now) {
      ex.push(now%2);
      now -= now%2;
      now /= 2;
    }
    while(ex.length%4 || !ex.length) {
      ex.push(0);
    }
    for(let j = 3; j >= 0; j--) {
      bits.push(ex[j]);
    }
  }
  return bits;
}

function base32_decode(str) {
  let bits = [];
  for(let i = 0; i < str.length; i++) {
    let ex = [];
    let now = str[i].charCodeAt(0);
    if(now < 65) now -= 24;
    else now -= 65;
    while(now) {
      ex.push(now%2);
      now -= now%2;
      now /= 2;
    }
    while(ex.length%5 || !ex.length) {
      ex.push(0);
    }
    for(let j = 4; j >= 0; j--) {
      bits.push(ex[j]);
    }
  }
  return bits;
}

function base64_decode(str) {
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
  return bits;
}

function decode(str) {
  let bits;
  let ans = '';
  switch(now) {
    case 0:
      document.getElementById('decode_output').value = "base를 선택하지 않으셨군요!!!";
      return;
    case 4:
      bits = base16_decode(str);
      break;
    case 5:
      bits = base32_decode(str);
      break;
    case 6:
      bits = base64_decode(str);
      break;
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