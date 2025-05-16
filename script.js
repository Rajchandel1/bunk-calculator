function select(data){
    return document.querySelector(`${data}`);
}

var totalAttendence = select(".total")
var attended = select(".attend")
var percent = select(".percent")
var message = select(".message-box")
var form = select("form")

var ValTotal;
var ValAttend;
var ValPercent;

var currentAttendence;
var ClassesNeeded;

var Bunkable;

console.log(totalAttendence,attended,percent,form)


totalAttendence.addEventListener("input",()=>{
    localStorage.setItem("totalAttendence",totalAttendence.value)
})

attended.addEventListener("input",()=>{
    localStorage.setItem("attended",attended.value)
    
})

percent.addEventListener("input",()=>{
    localStorage.setItem("percent",percent.value)
    
})

ValTotal = localStorage.getItem("totalAttendence") || "";
ValAttend = localStorage.getItem("attended") || "";
ValPercent = localStorage.getItem("percent") || "";



    message.style.display = "none"


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    ValTotal = parseInt(totalAttendence.value)
    ValAttend = parseInt(attended.value)
    ValPercent = parseInt(percent.value)

    console.log(ValTotal,ValAttend,ValPercent)

    message.innerHTML = ""

    
    if(isNaN(ValTotal) || isNaN(ValAttend) || isNaN(ValPercent)){
            message.style.display = "block"
            message.innerHTML = "bro kuch enter krega fir calculate hoga na kuch!"
            message.classList.add("warning")
            return;
    }

    if(ValTotal < ValAttend){
        message.style.display = "block"
        message.innerHTML = "bro total classes attended classes se zyada kaise hogi"
        message.classList.add("warning")
        return;
    }
    
    if(ValPercent < 0 || ValPercent > 100){
        message.style.display = "block"
        message.innerHTML = "percentage to 0-100 ke bich me hota hai na yaar"
        message.classList.add("warning")
        return;
    }
    
    

    calculateBunks();
    

})

function calculateBunks(){
    currentAttendence = (ValAttend/ValTotal)*100;
    console.log(currentAttendence)

    if(currentAttendence < ValPercent){
    message.style.display = "block"
    ClassesNeeded = Math.ceil((ValPercent*ValTotal)/100 - ValAttend);
      message.classList.add("error")
        message.innerHTML = `bro tu abhi ${currentAttendence}% pe hai tujhe atleast ${ClassesNeeded} classes aur attend krni padegi ${ValPercent}% hit krne ke liye`
      
    }else{
    message.style.display = "block"
    Bunkable = Math.floor(ValAttend - (ValPercent * ValTotal) / 100);
   message.innerHTML = `Chill kr yaar ${currentAttendence}% hai teri attendence! aur tu ${Bunkable} classes bunk bhi kr skta hai!`
    message.classList.add("success")
}
    
}