let block = document.querySelectorAll(".block");
let counter = document.querySelector(".counter");
let plus = document.querySelector(".plus"); 
let minus = document.querySelector(".minus"); 
let timer = document.querySelector(".timer"); 
let timer1 = document.querySelector(".timer1"); 

let btn = document.querySelector(".btn");
let errors = document.querySelector(".errors");

let numbers = document.querySelectorAll(".number_item");
let inpValue = document.querySelector("input");
let button = document.querySelector(".button");

let answer;
let count = 1900;
let countPlus = 0;
let countMinus = 0;

let time = 0;
let time1 = 0;

let timerId = setTimeout(f1, 1000);
function f1() {
 
  time++;
  if(time < 10){
    timer.innerHTML = ` 0${ time} ` ;
  } else {
    timer.innerHTML = ` ${ time} `;
  }
  timerId = setTimeout(f1, 1000);
 
  if(time==60){
    timer.innerHTML = '00';
    time = 00;
    time1 += 1;
    timer1.innerHTML =`0${time1}`;
  }

  if(time1==10){
    clearTimeout(timerId);
    timer1.innerHTML = '00';
    timer.innerHTML = '00';
  }
  ;
}

let getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let mass = ["+", "-"];
let i = getRandom(0, 2);

if (localStorage.getItem("counter")) {
  count = +localStorage.getItem("counter");
}

let setCountPlus = () => {
  countPlus += 1;
  plus.innerHTML = `Удачно<br><span>${countPlus}</span>`;
};


let setCountMinus = () => {
  countMinus += 1;
  minus.innerHTML =`Неудачно<br><span class="red">${countMinus}</span>`;
};

let start = () => {
  counter.innerHTML = `${count} руб`;
  let more = getRandom(2, 30);
  let less = getRandom(2, 30);
  block[0].innerHTML = more;
  block[1].innerHTML = mass[i];
  block[2].innerHTML = less;

  if (more < less && mass[i] == "-") {
    block[0].innerHTML = less;
    block[2].innerHTML = more;
    answer = +block[0].innerHTML - +block[2].innerHTML;
  } else if (mass[i] == "+") {
    answer = +block[0].innerHTML + +block[2].innerHTML;
  } else {
    answer = +block[0].innerHTML - +block[2].innerHTML;
  }
};

start();


numbers.forEach((item) => {
  item.addEventListener("click", function () {
    inpValue.value += item.innerHTML;
  });
});


btn.addEventListener("click", function () {
  if (inpValue.value == answer) {
    block[4].innerHTML = inpValue.value;
    inpValue.value = "";
    errors.innerHTML = "Молодец!!!";
    errors.classList.add("white");

    count += 1;
    setCountPlus();
    localStorage.setItem("counter", count);
    counter.innerHTML = `${count} руб`;
    setTimeout(() => {
      block[4].innerHTML = "";
      errors.innerHTML = "";
      start();
    }, 1000);
  } else {
    errors.innerHTML = "Ошибка";
    inpValue.value = "";
    errors.classList.remove("white");
    count -= 1;
    setCountMinus ();
    localStorage.setItem("counter", count);
    counter.innerHTML = `${count} руб`;
    setTimeout(() => {
      errors.innerHTML = "";
    }, 1000);
  }
});

button.addEventListener("click", () => {
  inpValue.value = "";
});

document.querySelector("input").addEventListener("keydown", function (e) {
 
  if (e.key == "Enter") {
    if (inpValue.value == answer) {
      block[4].innerHTML = inpValue.value;
      inpValue.value = "";
      errors.innerHTML = "Молодец!!!";
      errors.classList.add("white");
      count += 1;
      console.log(count);
      localStorage.setItem("counter", count);
      counter.innerHTML = `${count} руб`;
      setTimeout(() => {
        block[4].innerHTML = "";
        errors.innerHTML = "";
        start();
      }, 1000);
    } else {
      errors.innerHTML = "Ошибка";
      inpValue.value = "";
      errors.classList.remove("white");
      count -= 1;
      localStorage.setItem("counter", count);
      counter.innerHTML = `${count} руб`;
      setTimeout(() => {
        errors.innerHTML = "";
      }, 1000);
    }
  }
});




