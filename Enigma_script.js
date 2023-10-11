let turning1 = [];
let turning2 = [];
let turning3 = [];
let decode_turning1 = [];
let decode_turning2 = [];
let decode_turning3 = [];
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
while(turning1.length != 26) {
  let now = getRandomInt(0, 26);
  if(turning1.indexOf(now) == -1) turning1.push(now);
}
let txt = '';
for(let turn of turning1) {
  txt += ' '+String.fromCharCode(turn+97);
}
for(let i = 0; i < 26; i++) {
  decode_turning1.push(turning1.indexOf(i));
}
document.getElementById('turn1').innerText = '초기에 첫번째 회전판 :'+txt;

while(turning2.length != 26) {
  let now = getRandomInt(0, 26);
  if(turning2.indexOf(now) == -1) turning2.push(now);
}
txt = '';
for(let turn of turning2) {
  txt += ' '+String.fromCharCode(turn+97);
}
for(let i = 0; i < 26; i++) {
  decode_turning2.push(turning2.indexOf(i));
}
document.getElementById('turn2').innerText = '초기에 두번째 회전판 :'+txt;

while(turning3.length != 26) {
  let now = getRandomInt(0, 26);
  if(turning3.indexOf(now) == -1) turning3.push(now);
}
txt = '';
for(let turn of turning3) {
  txt += ' '+String.fromCharCode(turn+97);
}
for(let i = 0; i < 26; i++) {
  decode_turning3.push(turning3.indexOf(i));
}
document.getElementById('turn3').innerText = '초기에 세번째 회전판 :'+txt;

function encode(str) {
  let ans = '';
  for(let i = 0; i < str.length; i++) {
    let a = i%26, b = (i-i%26)/26, c = (i-i%676)/676;
    let now = str[i].charCodeAt(0);
    if(65 <= now && now <= 90) {
      now -= 65;
      ans += String.fromCharCode(turning3[(turning2[(turning1[(now+26-a)%26]+26-b)%26]+26-c)%26]+65);
    } else if(97 <= now && now <= 122) {
      now -= 97;
      ans += String.fromCharCode(turning3[(turning2[(turning1[(now+26-a)%26]+26-b)%26]+26-c)%26]+97);
    } else ans += str[i];
  }
  document.getElementById('encode_output').value = ans;
}

function decode(str) {
  let ans = '';
  for(let i = 0; i < str.length; i++) {
    let a = i%26, b = (i-i%26)/26, c = (i-i%676)/676;
    let now = str[i].charCodeAt(0);
    if(65 <= now && now <= 90) {
      now -= 65;
      ans += String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+65);
    } else if(97 <= now && now <= 122) {
      now -= 97;
      ans += String.fromCharCode((decode_turning1[(decode_turning2[(decode_turning3[now]+c)%26]+b)%26]+a)%26+97);
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