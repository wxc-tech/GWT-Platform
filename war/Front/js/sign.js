/**
 * Create by Tao 4/22/2014
 */

/**
 * Sign in
 */
function signin() {
    var loginform = $("form").get(1);

    var values = [];
    var i = 0;
    $(loginform).children("input").each(function() {
        values[i] = $(this).val();
        i++;
    })
    var email = values[0];
    var password = values[1];
    ajaxCallLoginByEmailID(email,password);
}
//Login Call by using email
function ajaxCallLoginByEmailID(email,password){
    //var server="http://5-dot-smg-server-rl.appspot.com/";
	var server = "http://7-dot-smg-server.appspot.com/";
    var url=server+"user/?email=";
    url+=email;
    url+="&password=";
    url+=password;

    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(data, textStatus, jqXHR){
            console.log("Login_SUCCESS:" + data);
            data = JSON.parse(data);
            if(data["error"] == undefined) {
            	removeCookies();
                setCookie("email", data["email"], "", "/");
                setCookie("accessSignature", data["accessSignature"], "", "/");
                setCookie("userId", data["userId"], "", "/");
                setCookie("imageURL", data["imageURL"], "", "/");
                //location.reload();
                //window.location.href = "./mainpage.html";
            }else {
                alert(data["error"]);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Login_ERROR: " + textStatus + " " + errorThrown);
            console.log(jqXHR.responseText);
        }
    });
}

function signin_() {
    var loginform = $("form").get(1);

    var values = [];
    var i = 0;
    $(loginform).children("input").each(function() {
        values[i] = $(this).val();
        i++;
    })
    var email = values[0];
    var password = values[1];
    ajaxCallLoginByEmailIDForInviteFriend(email,password);	
}

function ajaxCallLoginByEmailIDForInivteFriend(email,password){
    //var server="http://5-dot-smg-server-rl.appspot.com/";
    var server = "http://7-dot-smg-server.appspot.com/";
    var url=server+"user/?email=";
    url+=email;
    url+="&password=";
    url+=password;

    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(data, textStatus, jqXHR){
            console.log("Login_SUCCESS:" + data);
            data = JSON.parse(data);
            if(data["error"] == undefined) {
            	removeCookies();
                setCookie("email", data["email"], "", "/");
                setCookie("accessSignature", data["accessSignature"], "", "/");
                setCookie("userId", data["userId"], "", "/");
                setCookie("imageURL", data["imageURL"], "", "/");
                location.reload();
                //window.location.href = "./mainpage.html";
            }else {
                alert(data["error"]);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Login_ERROR: " + textStatus + " " + errorThrown);
            console.log(jqXHR.responseText);
        }
    });
}

function removeCookies() {
    if(getCookieValue("userId")!="") {
      deleteCookie("userId", "/");	
    } 
    if(getCookieValue("accessSignature")!="") {
      deleteCookie("accessSignature", "/");
    }
    if(getCookieValue("email")!="") {
      deleteCookie("email", "/");
    }
    if(getCookieValue("imageURL")!="") {
      deleteCookie("imageURL", "/");
    }
}

/**Sign out**/
function signout(){
    deleteCookie("email", "/");
    deleteCookie('accessSignature', "/");
    deleteCookie('userId', "/");
    deleteCookie('imageURL', "/");
    location.href = "mainpage.html"
}

/*Sign up**/
function signup() {
    var values = [];
    var i = 0;
    $("input").each(function() {
        values[i] = $(this).val();
        i++;
    })
    var email = values[0];
    var password = values[1];
    var firstname = values[3];
    var lastname = values[4];
    var nickname = values[5];
    ajaxCallInsert(email,password,firstname,lastname,nickname);
}

function ajaxCallInsert(email,password,firstname,lastname,nickname){
    //var server="http://5-dot-smg-server-rl.appspot.com/";
	var server = "http://7-dot-smg-server.appspot.com/";
    var url=server+"user";

    // Create the call input
    var jsonObjForInsert = {
        'email': email,
        'password': password,
        'firstname': firstname,
        'lastname': lastname,
        'nickname': nickname};

    var jsonString = JSON.stringify(jsonObjForInsert);
    $.ajax({
        url: url,
        dataType: 'json',
        data: jsonString,
        type: "POST",
        success: function(data, textStatus, jqXHR){
            var insert=JSON.stringify(data);
            
            console.log("Insert_SUCCESS:" +insert);
            document.getElementById("playerId").value = data["userId"];
            document.getElementById("accessSignature").value = data["accessSignature"];
            ajaxCallLoginByEmailID(email,password);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Insert_ERROR: " + textStatus + " " + errorThrown);
        }
    });
}