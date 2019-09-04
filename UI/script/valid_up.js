var i = document.querySelector("#field1");
        var ins = document.querySelector("#field2");
        var inp = document.querySelector("#field3");
        var inpt = document.querySelector("#field4");
        var inpts = document.querySelector("#field5");
        var inptss = document.querySelector("#field6");
        var inptsss = document.querySelector("#field7");
        var inptssss = document.querySelector("#field8");
        var dispaly_message = document.querySelector("#result");
        var but = document.getElementById("btn");
    
  

        var when_is_confirming_password = () => 

        {

            document.getElementById('result').innerHTML = "Hey !! You are Confirming... "; 
        }

        var Sign_ = ()=>

        {
            let check_fields = i.value; 
            let check_fieldss = ins.value;
            let check_fieldsss = inp.value; 
            let check_fieldssss = inpt.value;
            let check_fieldsssss = inpts.value; 
            let check_fieldssssss = inptss.value;
            let check_fieldsssssss = inptsss.value; 
            let check_fieldssssssss = inptssss.value;   

            if (check_fields.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert First Name</span>";
            }
            else if (check_fieldss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Last Name</span>";
            }
            else if (check_fieldsss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Email</span>";
            }
            else if (check_fieldssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Bio</span>";
            }
            else if ( check_fieldsssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Occupation</span>";
            }
            else if (check_fieldssssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Expertise</span>";
            }
            else if (check_fieldsssssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Password</span>";
            }
            else if (check_fieldssssssss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Password</span>";
            }
            else
            {
                window.location = "users_view_mentors.html";
            }}
        btn.addEventListener("click", Sign_);