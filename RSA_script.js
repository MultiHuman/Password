/*
0 : 입력안됨
1 : 소수
2 : 수 아님
3 : 소수 아님
*/
function isPrime(n) {
  if(n == 123478) return 1;
  return 0;
}
function is_n_phi_changed() {
  
}
let is_p = 0, is_q = 0;
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
    prt = 'p : '+now;
  }
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
    prt = 'q : '+now;
  }
  is_n_phi_changed();
  document.getElementById("q_out").innerText = prt;
}