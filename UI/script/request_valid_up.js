var i = document.querySelector("#field1");
        var ins = document.querySelector("#field2");
        var inp = document.querySelector("#field3");
        var inpt = document.querySelector("#field4");
        var inpts = document.querySelector("#field5");
        var dispaly_message = document.querySelector("#result");
        var but = document.getElementById("btn");
    
  

       

        var Sign_ = ()=>

        {
            let check_fields = i.value; 
            let check_fieldss = ins.value;
            let check_fieldsss = inp.value; 
            let check_fieldssss = inpt.value;
            let check_fieldsssss = inpts.value;    

            if (check_fields.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert User Name</span>";
            }
            else if (check_fieldss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Email </span>";
            }
            else if (check_fieldsss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Select Expertise</span>";
            }
            else if (check_fieldssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Mentor Name</span>";
            }
            else if ( check_fieldsssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Session's Description</span>";
            }
            else
            {
                window.location = "sessions.html";
            }}
        btn.addEventListener("click", Sign_);