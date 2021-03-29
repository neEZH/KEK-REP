"use strict";


//saveing messages and showing 
function sendMessage(event) {
	//alert(1);
    let msgText = verifyNewMsg(inptEnterMsg.value);
	
    if (msgText){
		newMsgToSesStore(msgText);
		newMsgShow(msgText);
	}
	inptEnterMsg.value = '';
    
	event.preventDefault();
}
//saves message to session storage as object of messages 
function newMsgToSesStore(msgText){
	let msgObj = JSON.parse(sessionStorage.getItem("msgList"));
    if(!msgObj){
        msgObj = {};
    }
    msgObj[document.getElementsByClassName("msg-container").length] = msgText;    
    sessionStorage.setItem("msgList", JSON.stringify(msgObj));
}

//creates message buble on UI
function newMsgShow(msgText){    
	let newMsgDiv = document.createElement("div");
	newMsgDiv.className = "msg-container";
	newMsgDiv.innerHTML = msgText;
	msgList.append(newMsgDiv);
}

//Trims message (need also add displace "<" with  )
function verifyNewMsg(msgText){
    //trim and check spaces
	if(msgText){
		return msgText.trim();
	}else{		
		return false;
	}
}

function changeHeader(textMsg, idMsg){
    headMsg.innerHTML = verifyNewMsg(textMsg);
    headMsg.value = idMsg;
}


function msgListHeader(){
    console.log("ENTERED func <msgListHeader>");
    let msgList = JSON.parse(sessionStorage.getItem("msgList"));
    console.log("");
    console.log("idMsg="+headMsg.value);
    let isCurId = false;
    //alert("before loop: "+isCurId);
    for (let idMsg in msgList){
        //alert("idMsg:"+idMsg+"\nisCurID:"+isCurId+"\nHeadValue:"+headMsg.value);
        if(!headMsg.value){
            changeHeader(msgList[idMsg],idMsg);
        }
        if(isCurId){
            changeHeader(msgList[idMsg],idMsg);
            //alert(idMsg+"."+msgList[idMsg]);
            isCurId=false;
        }else{
            
        }
        if(idMsg==headMsg.value){
            isCurId=true;
        }
    }
}
//MAIN {
//-------ASSIgning functions on actions
//sessionStorage.setItem("msgList", JSON.stringify({"0":"EXAMPLE"}));
function main(){
    sessionStorage.setItem("msgDelList", JSON.stringify({"0":"EXAMPLE"}));

    btnSendNew.onclick = sendMessage;
    inptEnterMsg.addEventListener('submit', sendMessage);
    //showMsg();
    let headerIntervalCall = setInterval(msgListHeader, 5000);
    setTimeout(()=> {clearInterval(headerIntervalCall);alert("Inteval stopped");},60000);
    changeHeader("Built!!", undefined);
    //alert('Built!!');
}
main();