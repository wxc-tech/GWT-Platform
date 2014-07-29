/**
 * Created by Xiaocong, Yao, Tao 12/5/2014
 */

var serverName = "http://7-dot-smg-server.appspot.com/";
var gameId = "5059880838758400";

var playerId1;
var accessSignature1;
var playerId2;
var accessSignature2;

var matchId;

function produceRandomString(num) {
  var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
  var  tmp = "";
  for(var i=0;i<num;i++)   {
    tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
  }
  return tmp;
}

function registerTest(index) {
  var email = produceRandomString(16) + "@";
  email += produceRandomString(6) + ".com";
  var password = 123456;
  var url = serverName + "user";
  var message = {
    "email": email,
    "password": password};
  $.ajax({
    url: url,
    dataType: 'json',
	data: JSON.stringify(message),
    type: "POST",
	success: function(data, textStatus, jqXHR) {
	  console.log(JSON.stringify(data));
	  if(data["error"]==undefined) {
		var playerId = data["userId"];
        var accessSignature = data["accessSignature"];
        if(index == 1) {
          playerId1 = playerId;
          accessSignature1 = accessSignature;
        }else if(index == 2) {
          playerId2 = playerId;
          accessSignature2 = accessSignature;
        }
        ok(true);
	  }else {
        ok(false);
	  }
	  start();
	},
	error: function(jqXHR, textStatus, errorThrown) {
	  console.log("Access Server Error: " + testStatus + " " + errorThrown);   
	}
  });
}

function enterQueueForMatchTest(index) {
  var accessSignature;
  var playerId;
  if(index == 1) {
    accessSignature = accessSignature1;
    playerId = playerId1;
  }else {
	accessSignature = accessSignature2;
	playerId = playerId2;
  }
  var message = {
    "accessSignature": accessSignature,
    "playerId": playerId,
    "gameId": gameId
  };
  var url = serverName + "queue";
  $.ajax({
    url: url,
    dataType: "json",
    type: "POST",
    data: JSON.stringify(message),
    success: function(data, textStatus, jqXHR) {
      console.log(JSON.stringify(data));
      if(data["error"] == undefined) {
        ok(true);
      }else {
        ok(false);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Access Server Error: " + testStatus + " " + errorThrown);
      ok(false);
    }
  });
  start();
}

function insertNewMatchTest() {
  var message = {
    "accessSignature": accessSignature1,
    "playerIds": [playerId1, playerId2],
	"gameId": gameId
  };
  var url = serverName + "newMatch/";
  $.ajax({
	url: url,
	dataType: "json",
	type: "POST",
	data: JSON.stringify(message),
	success: function(data, textStatus, jqXHR) {
	  console.log(JSON.stringify(data));
      if(data["error"] == undefined) {
	    ok(true);
		matchId = data["matchId"];
	  }else {
		ok(false);
	  }
	},
	error: function(jqXHR, textStatus, errorThrown) {
	  console.log("Access Server Error: " + testStatus + " " + errorThrown);
	  ok(false);
	}
  });
  start();	
}

function getNewMatchInfoTest() {
  var url = serverName + "newMatch/";
  url += playerId2;
  url += "?accessSignature=";
  url += accessSignature2;
  url += "&";
  url += "gameId=";
  url += gameId;
  
  $.ajax({
	url: url,
	type: "GET",
    success: function(data, textStatus, jqXHR) {
	  console.log(JSON.stringify(data));
	  if(data["error"] == undefined) {
	    ok(true);
	  }else {
	    ok(false);
	  }
	},
	error: function(jqXHR, textStatus, errorThrown) {
	  console.log("Access Server Error: " + testStatus + " " + errorThrown);
	  ok(false);
	}
  });
  start();	
}

function getGameStateTest() {
  var url = serverName + "state/";
  url += matchId;
  url += "?playerId=";
  url += playerId2;
  url += "&accessSignature=";
  url += accessSignature2;
	  
  $.ajax({
    url: url,
	type: "GET",
	success: function(data, textStatus, jqXHR) {
	  console.log(JSON.stringify(data));
	  if(data["error"] == undefined) {
	    ok(true);
	  }else {
		ok(false);
	  }
	},
	error: function(jqXHR, textStatus, errorThrown) {
	  console.log("Access Server Error: " + testStatus + " " + errorThrown);
	  ok(false);
	}
  });
  start();	
}

function makeMoveInMatchTest() {
  var message = {
    "accessSignature": accessSignature1,
	"operations": [{"value":"wang", "type":"Set", "visibleToPlayerIds":"ALL","key":"name"}],
	"gameId": gameId
  };
  var url = serverName + "matches/" + matchId;
  $.ajax({
    url: url,
    dataType: "json",
    type: "POST",
    data: JSON.stringify(message),
	success: function(data, textStatus, jqXHR) {
	  console.log(JSON.stringify(data));
	  if(data["error"] == undefined) {
	    ok(true);
	  }else {
		ok(false);
	  }
	},
	error: function(jqXHR, textStatus, errorThrown) {
	  console.log("Access Server Error: " + testStatus + " " + errorThrown);
	  ok(false);
	}
  });
  start();	
}

function getMetaInfoOfMultipleGamesTest() {
	
}

function getMatchStatsForAParticularGameTest() {
	
}

function giveGameRatingTest() {
	
}



//For Synchronized Mode Test
asyncTest("Register successfully for player1", function() {
	registerTest(1);
});

asyncTest("Register successfully for player2", function() {
	registerTest(2);
});

asyncTest("Player1 enter the queue successfully", function() {
    enterQueueForMatchTest(1);
});

asynTest("Player2 enter the queue successfully", function() {
	enterQueueForMatchTest(2);
});

//For Asynchronized Mode Test
asyncTest("Register successfully for player1", function() {
	registerTest(1);
});

asyncTest("Register successfully for player2", function() {
	registerTest(2);
});

asyncTest("Insert new match successfully", function() {
    insertNewMatchTest();
});

asyncTest("Get new match Info successfully", function() {
    getNewMatchInfoTest();
});

aysncTest("Get initial game state successfully", function() {
	getGameStateTest();
});

asynTest("Make a move in a match successfully", function() {
	makeMoveInMatchTest();
});

asynTest("Get game state successfully", function() {
	getGameStateTest();
});
