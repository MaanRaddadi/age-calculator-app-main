
//- Receive validation errors if:
//- Any field is empty when the form is submitted
//- The day number is not between 1-31
//- The month number is not between 1-12
//- The year is in the future
//- The date is invalid e.g. 31/04/1991 (there are 30 days in April)
//- View the optimal layout for the interface depending on their device's screen size
//- See hover and focus states for all interactive elements on the page

const dayIn = document.getElementById('input-day');
const monthIn = document.getElementById('input-month');
const yearIn = document.getElementById('input-year');
const yearOut = document.getElementById('output-years');
const monthOut = document.getElementById('output-months');
const daysOut = document.getElementById('output-days');
const arrowBtn = document.getElementById('arrow-btn')
const errorStyle = '0.5px solid var(--Light-red)';
 

arrowBtn.addEventListener('click', () => {
  let day = dayIn.value
  let month = monthIn.value
  let year = yearIn.value

  const birthDate= new Date(year , month , day)
  

  if(validateDay(day , month , year) && validateMonth(month) &&  validateYear(year , month , day)){
    console.log('Date is valid');
    console.log(birthDate)

    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear()
    let months = currentDate.getMonth() - birthDate.getMonth()
    let days = currentDate.getDate() - day

    if (months < 0) {
      years = years - 1;
      months = months + 12;
    } else if (days < 0) {
      days += daysInMonth(year, month - 1);
    } else {
      
    }
       //display
       yearOut.innerText = years
       monthOut.innerText = months
       daysOut.innerText = days

       
  
  }
});


function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}


//check if day input is valid


dayIn.addEventListener('blur', () => {
  const d = dayIn.value;
  const m = monthIn.value;
  const y = yearIn.value;
validateDay(d,m,y);
})



const validateDay = (day, month, year) => {
    if(day === ''){
      errorMsg(dayIn , "Please fillout all the fields", errorStyle)
      return false
    } else if (day > 31 || day < 1){
      errorMsg(dayIn , "day value can only be between 1 and 31")
      return false
    } else if (day > daysInMonth(year , month)){
      errorMsg(dayIn , "day value is invalid" , errorStyle)
      return false
    } else {
      errorMsg(dayIn , '', '')
      return true
    }
    
}

//check if month input is valid

monthIn.addEventListener('blur', () => {
const m = monthIn.value
validateMonth(m);
})


const validateMonth = (month) =>{
  if(month > 12 || month < 1 || month ===''){
      errorMsg(monthIn , "Month is invalid" , errorStyle)
      return false
  } else {
    errorMsg(monthIn , '', '')
    return true;
  }

}

//check if year input is valid

yearIn.addEventListener('blur', () => {
  const d = dayIn.value;
  const m = monthIn.value;
  const y = yearIn.value;
validateYear(y,m,d);
})

const validateYear = (year , month , day) =>{
  const currentDate = new Date()
   const giveDate = new Date(year , month , day)
  
  if(giveDate.getFullYear() > currentDate.getFullYear()){
    errorMsg(yearIn , "Can't be born in the future", errorStyle)
    return false
  } else {
    errorMsg(yearIn , '' , '')
    return true;
  }
}

function errorMsg(elem, msg, border) {
  elem.style.border = border;
  elem.nextElementSibling.innerText = msg;
}







