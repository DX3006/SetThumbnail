var clientId = 'nwzemcq0g8agkgz8dei6xb5277jlmz';


function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }
function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
    
      var costs = new Array();
      
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
  }
  
async function getInfo(gameName) {

    var h = {
        method: 'GET',
        headers: {
            'Client-ID': clientId,
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    };

    gameName = gameName ? gameName : "Just Chatting";

    chan = await fetch('https://api.twitch.tv/kraken/search/games?query=' + gameName, h)
    canalJogoInfo = await chan.json();
    //console.log("canaljogoinfo")
    //console.log(canalJogoInfo)

    accuracy=0;
    for (c = 0; c < canalJogoInfo.games.length; c++) {
        if (canalJogoInfo.games[c].name == gameName) {
            accuracy=1;
            found = canalJogoInfo.games[c];
            break;
        }else{
            sim=similarity(canalJogoInfo.games[c].name,gameName)
            if(sim>accuracy){
                    accuracy=sim;
                    found=canalJogoInfo.games[c];
            }
        }	
    }
    if(accuracy>.8){
        game=found;
    }

    return game.box.large

}
async function inicio(){
    hash=decodeURI(document.location.hash)
    console.log(hash);
    sl=hash.split("#")
    obj=[]
    for(c=1;c<sl.length;c++){
        slf=sl[c].split("=")
        obj[slf[0]]=slf[1]
    }
    console.log(obj);
    gameName = obj.game ? obj.game : "Just Chatting";
    titulo= obj.titulo?obj.titulo: "Bora jogar uns jogos loucos"
    img=await getInfo(gameName)
    desc="Acabei de Abrir a live ;D\nHoje vamos jogar "+gameName+"\nEntão pega sua pipoca e bora pra live"
    document.getElementById("thumb").content=img
    document.getElementById("thumb2").src=img
    document.getElementById("titulo").content=obj.titulo
    document.getElementById("desc").content=desc
}
inicio()
