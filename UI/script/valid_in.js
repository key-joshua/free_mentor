    var inpts = document.querySelector("#email");
        var inptss = document.querySelector("#pas");
        var dispaly_message = document.querySelector("#result");
        var but = document.getElementById("user");

  

        var when_is_writting_string = () => 

        {

            document.getElementById('result').innerHTML = "Hey !! You are Confirming... "; 
        }

        var Sig = ()=>

        {
            let check_fields = inpts.value; 
            let check_fieldss = inptss.value;   

            if (check_fields.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Email</span>";
            }
            else if ( check_fieldss.length===0 ) 
            {
                dispaly_message.innerHTML="<span style='color: #790707;'>Hey !! Insert Password</span>";
            }
            else
            {
                window.location = "users_view_mentors.html";
            }}
            but.addEventListener("click", Sig);

        
        