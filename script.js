console.log("JavaScript 파일이 연결되었습니다.")
const goalInput=document.querySelector("#goalInput");
const addGoalBtn=document.querySelector("#addGoalBtn");
const goalList=document.querySelector("#goalList");
const errorMessage=document.querySelector("#errorMessage");
const goalCount = document.querySelector("#goalCount");
const serverMsg = document.querySelector('#server-msg');
const myMsg = document.querySelector('#my-msg');
const nameInput = document.querySelector('#guest-name');
const msgInput = document.querySelector('#guest-msg');
const submitBtn = document.querySelector('#submit-btn');


let goalTotal=0;

function updateGoalCount() {
	goalCount.textContent=`현재 목표 ${goalTotal}개`;
}

function addGoal() {
	const goalText=goalInput.value.trim();

	if (goalText==="") {
		errorMessage.textContent="목표를 입력해주세요.";
		return;
  }

	errorMessage.textContent="";

	const li=document.createElement("li");
	li.classList.add("goal-item");

	const span=document.createElement("span");
	span.textContent=goalText;
	span.classList.add("goal-text");

	const deleteBtn=document.createElement("button");
	deleteBtn.textContent="삭제";
	deleteBtn.classList.add("delete-btn");

	span.addEventListener("click",function () {
		span.classList.toggle("done");
  });

	deleteBtn.addEventListener("click",function () {
		li.remove();
		goalTotal=goalTotal-1;
		updateGoalCount();
  });

	li.appendChild(span);
	li.appendChild(deleteBtn);
	goalList.appendChild(li);

	goalTotal=goalTotal+1;
	updateGoalCount();

	goalInput.value="";
}

addGoalBtn.addEventListener("click", addGoal);


function getMessageData() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("방명록을 마음껏 작성해주세요!"); 
    }, 1500);
  });
}

async function initGuestbook() {
  const data = await getMessageData();
  
  serverMsg.textContent = data; 
}

let isFirst = true;

submitBtn.addEventListener('click', function () {
  const name = nameInput.value;
  const msg = msgInput.value;

  if (name === '' || msg === '') {
    alert("이름과 메시지를 모두 입력해주세요.");
    return;
  }
  
	const result = name + ": " + msg + "<br><br>";

  if (isFirst === true) {
	  myMsg.innerHTML = result;
	  isFirst = false;
  }
  else {
	  myMsg.innerHTML = myMsg.innerHTML + result;
  }
	

  nameInput.value = '';
  msgInput.value = '';
});

initGuestbook();

