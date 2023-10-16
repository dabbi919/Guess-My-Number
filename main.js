// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력 > go 버튼 누름
// 3. 만약 유저가 랜덤번호를 맞추면 "맞췄습니다"
// 4. 랜덤번호 < 유저번호 "down"
// 5. 랜덤번호 > 유저번호 "up"
// 6. reset버튼을 누르면 게임 리셋
// 7. 5번의 기회를 다 쓰면 게임 끝 (더 이상 추측 불가, 버튼 disable)
// 8. 유저가 1~100 범위 밖 숫자를 입력하면 알려줌, 기회 깎지 않음
// 9. 유저가 이미 입력한 숫자를 또 입력하면 알려줌, 기회 깎지 않음

let pcNum = 0;
let clickBtn = document.getElementById('click-btn');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetBtn = document.getElementById('reset-btn');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];
let changeImg = document.getElementById('change-img');

// 함수를 매개변수로 가져옴
// 2. 유저가 번호를 입력 > go 버튼 누름
clickBtn.addEventListener('click', play);
// 6. reset버튼을 누르면 게임 리셋
resetBtn.addEventListener('click', reset);

// 다음 숫자를 쓰기위해 input창을 클릭하면 기존 숫자 지우기
userInput.addEventListener('focus', function() {userInput.value = ''})

// 1. 랜덤번호 지정
function pickRandomNum() {
  // math.random()은 0~1(1 미포함)의 숫자를 랜덤으로 뽑아냄
  // * 100 을 해줌으로써 0~99 까지의 숫자를 랜덤으로 뽑아낼 수 있음
  // 내가 원하는 건 0~50니까 +1을 해
  pcNum = Math.floor(Math.random() * 50) + 1;
  console.log("정답", pcNum)
}

function play() {
  // input태그의 값을 가져올 때 .value
  let userValue = userInput.value;

  // 8. 유저가 1~100 범위 밖 숫자를 입력하면 알려줌, 기회 깎지 않음
  if (userValue < 1 || userValue > 50) {
    resultArea.textContent = '1과 50 사이 숫자를 입력해주세요.'
    // 찬스는 깎이지 않고 (아래 코드 실행되면 안됨) 종료해야함 > return 쓰기
    return;
  }

  // 9. 유저가 이미 입력한 숫자를 또 입력하면 알려줌, 기회 깎지 않음
  if (history.includes(userValue)) {
    resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.';
    return;
  }

  
  // 3. 만약 유저가 랜덤번호를 맞추면 "맞췄습니다"
  // 4. 랜덤번호 < 유저번호 "down"
  // 5. 랜덤번호 > 유저번호 "up"
  if (userValue < pcNum) {
    resultArea.textContent = 'UP!'
    changeImg.src='img/up.gif'
  } else if (userValue > pcNum) {
    resultArea.textContent = 'DOWN!'
    changeImg.src='img/down.gif'
  } else {
    resultArea.textContent = '정답!'
    changeImg.src='img/win.gif'
    gameOver = true;
  }
  
  
  // 9. 유저가 이미 입력한 숫자를 또 입력하면 알려줌, 기회 깎지 않음
  // 앞에서 유효성 검사 후 패스한 값에 대해 히스토리를 배열에 추가
  history.push(userValue);
  console.log(history);
  
  // 7. 5번의 기회를 다 쓰면 게임 끝 (더 이상 추측 불가, 버튼 disable)
  if (chances < 1) {
    gameOver = true;
    changeImg.src='img/fail.gif'
    resultArea.textContent = 'FAIL!'
  }
  if (gameOver == true) {
    clickBtn.disabled = true;
  }
  
  // go버튼을 누를 때 마다 기회가 5에서 1씩 깎임
  chances --;
  chanceArea.textContent = `남은 기회 : ${chances}`
}

function reset() {
  // user input 창이 깨끗하게 정리
  userInput.value = '';
  resultArea.textContent = 'UP or DOWN?';
  chanceArea.textContent = '남은 기회 : 5'
  changeImg.src='img/guess.gif'
  history = [];
  chances = 5;
  gameOver = false;
  clickBtn.disabled = false;
  // 새로운 랜덤번호 생성
  pickRandomNum();
}

pickRandomNum()
