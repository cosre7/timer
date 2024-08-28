let timerInterval;
let timeLeft;
let isPaused = false;

const subtasks = {
  "1과제": ["웨딩(로맨틱)", "웨딩(클래식)", "한복", "내추럴"],
  "2과제": ["그레타_가르보", "마릴린_먼로", "트위기", "펑크"],
  "3과제": ["레오파드", "한국무용", "발레", "노인"],
  "4과제": ["속눈썹 연장", "수염"]
};

function updateSubtaskOptions() {
  const taskSelect = document.getElementById('task-select').value;
  const subtaskSelect = document.getElementById('subtask-select');

  // 세부 항목 옵션 초기화
  subtaskSelect.innerHTML = '<option value="random">랜덤으로 선택</option>';

  if (subtasks[taskSelect]) {
    subtasks[taskSelect].forEach(subtask => {
      const option = document.createElement('option');
      option.value = subtask;
      option.textContent = subtask;
      subtaskSelect.appendChild(option);
    });
  }

  // 시간 세팅
  setTimer(taskSelect);

  // 처음 과제 선택 -> 랜덤 상태
  printSelectedTask()
}

function printSelectedTask() {
  const taskSelect = document.getElementById('task-select').value;
  let subtaskSelect = document.getElementById('subtask-select').value;
  const startButton = document.getElementById('start');
  
  if (subtaskSelect === "random") {
    const taskSubtasks = subtasks[taskSelect];
    subtaskSelect = taskSubtasks[Math.floor(Math.random() * taskSubtasks.length)];
  }
  
  document.getElementById('selected-task').textContent = `${subtaskSelect}`;

  // 이미지 출력
  printImage(subtaskSelect)

  // 타이머 시작 버튼 활성화
  startButton.disabled = false;
  startButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
  startButton.classList.add('bg-blue-500', 'hover:bg-blue-600', 'cursor-pointer');

}

function printImage(subtaskSelect) {
  const image = document.getElementById('image');
  image.src = `image/${subtaskSelect}.png`;
}

function setTimer(taskSelect) {
  switch (taskSelect) {
    case "1과제":
      timeLeft = 40 * 60; // 40분
      break;
    case "2과제":
      timeLeft = 40 * 60; // 40분
      break;
    case "3과제":
      timeLeft = 50 * 60; // 50분
      break;
    case "4과제":
      timeLeft = 25 * 60; // 25분
      break;
    default:
      timeLeft = 0;
  }

  // 타이머 출력 
  printTimer();
}

function startTimer() {
  const taskSelect = document.getElementById('task-select').value;
  
  clearInterval(timerInterval);
  isPaused = false;
  timerInterval = setInterval(updateTimer, 1000);

  // 과제 선택 부분 숨김처리
  document.getElementById('timer-container').classList.add('hidden');
  
  // 타이머 시작 숨김 처리
  document.getElementById('start').classList.add('hidden');

  // 일시 정지, 리셋 보이기 
  document.getElementById('pause').classList.remove('hidden');
  document.getElementById('reset').classList.remove('hidden');
}

function pauseTimer() {
  if (isPaused) {
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
  } else {
    clearInterval(timerInterval);
    isPaused = true;
  }

  document.getElementById('pause').textContent = !isPaused ? "일시 정지" : "다시 시작";
}

function updateTimer() {
    
  if (timeLeft > 0) {
    timeLeft--;

    if (timeLeft === 5 * 60) {
      document.getElementById('alert-5min').play();
    }
  } else {
    clearInterval(timerInterval);
    document.getElementById('alert-end').play();
  }

  printTimer()
}

function printTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById('timer').textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = "00:00";
  document.getElementById('selected-task').textContent = "";
  document.getElementById('task-select').value = "";
  document.getElementById('subtask-select').innerHTML = '<option value="random">랜덤으로 선택</option>';
  isPaused = false;

  // 처음 시작 상태로 세팅 
  setStart();
  
  // 기본 이미지 출력
  printImage('basic')
}

function setStart() {
  const startButton = document.getElementById('start');

  // 과제 선택 부분 보이기
  document.getElementById('timer-container').classList.remove('hidden');

  // 타이머 시작 버튼 보이기
  startButton.classList.remove('hidden');

  // 타이머 시작 버튼 색 변경
  startButton.classList.remove('bg-blue-500', 'hover:bg-blue-600', 'cursor-pointer');
  startButton.classList.add('bg-gray-400', 'cursor-not-allowed');

  // 타이머 시작 버튼 disabled 처리
  startButton.disabled = true;

  // 일시 정지, 리셋 버튼 숨김처리
  document.getElementById('pause').classList.add('hidden');
  document.getElementById('reset').classList.add('hidden');
}