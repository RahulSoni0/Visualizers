function initQR(){
    /**
     * Getting user entered data
     */
    let qr_text_el = document.getElementById("qrtextdata");
   
    if(qr_text_el.value){
        generateQRCODE(qr_text_el);
    }
  
}
function generateQRCODE(qr_text_el){
    let qr_code_container = document.getElementById("qrcodecontainer");
    let downloadBTN =  document.getElementById("download_btn"); 
    /**
     * reset the qr code section 
     */
  qr_code_container.innerHTML='';
    new QRCode(qr_code_container, {
        text: qr_text_el.value,
        width: 180, 
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff"    
    });

    if(document.querySelector("#qrcodecontainer img").getAttribute("src") == null){     
        setTimeout(() => {       
            downloadBTN.style.display = "block";    
            downloadBTN.setAttribute('href',document.querySelector("canvas").toDataURL()); 
        }, 300);
    }
}



