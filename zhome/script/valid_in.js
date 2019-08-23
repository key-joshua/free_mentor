    var inpts = document.querySelector("#email");
        var inptss = document.querySelector("#pas");
        var dispaly_message = document.querySelector("#result");
        var but = document.getElementById("user");
        var butt = document.getElementById("mentor");
        var butto = document.getElementById("admins");

        let op_1 = "users";
        let op_2 = "mentors";
        let op_3 = "admin";

  let show = (users,mentors,admin,element) =>
  {
    but.style.display = element.value === op_1 ? 'block' : 'none' ;
    butt.style.display = element.value === op_2 ? 'block' : 'none' ;
    butto.style.display = element.value === op_3 ? 'block' : 'none' ;
  }


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
                window.location = "../users/home.html";
            }}
            but.addEventListener("click", Sig);

        var Sign = ()=>

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
                window.location = "../mentors/home.html";
            }}
        butt.addEventListener("click", Sign);

        var Sign_ = ()=>

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
                window.location = "../admin/home.html";
            }}
        butto.addEventListener("click", Sign_);

        