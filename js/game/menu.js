mvl.menu = {
    showGameMenu: function() {
        document.getElementById('game-setup').style.display = "block";
    },
    
    hideGameMenu: function() {
        document.getElementById('game-setup').style.display = "none";
    },
    
    showWaitingRooms: function() {
        document.getElementById('waiting-room').style.display = "block";
    },
    
    hideWaitingRooms: function() {
        document.getElementById('waiting-room').style.display = "none";
    },
    
    setWaitingRooms: function(rooms) {
        //TODO got to be a nicer way of doing this!
        var html = document.createElement('div');
        rooms.forEach(function(room) {
            var btn = document.createElement('button');
            btn.className += btn.className ? ' button-link' : 'button-link';
            btn.setAttribute('data-room', room);
            btn.innerText = room;
            html.appendChild(btn);
        })
        document.getElementById('available-games').innerHTML = html.outerHTML;
        var gameButtons = document.getElementById('available-games').firstChild.children;
        for (var i = gameButtons.length - 1; i >= 0; i--) {
            gameButtons[i].addEventListener('click', mvl.actions.joinGame, false);
        };
    },
    
    setOnePlayer: function() {
        document.getElementById('onePlayer').className += ' button-selected';
        document.getElementById('twoPlayer').className = 'button-link';
        mvl.menu.setLocalPlay();
        mvl.state.twoPlayer = false;
    },
    
    setTwoPlayer: function() {
        document.getElementById('twoPlayer').className += ' button-selected';
        document.getElementById('onePlayer').className = 'button-link';
        mvl.state.twoPlayer = true;
    },
          
    setLocalPlay: function() {
        document.getElementById('localPlay').className += ' button-selected';
        document.getElementById('onlinePlay').className = 'button-link';
        document.getElementById('play').innerHTML = "Play";
        mvl.menu.hideWaitingRooms();
        mvl.state.onlinePlay = false;
    },
    
    setOnlinePlay: function() {
        document.getElementById('onlinePlay').className += ' button-selected';
        document.getElementById('localPlay').className = 'button-link';
        mvl.menu.setTwoPlayer();
        mvl.menu.showWaitingRooms();
        mvl.socketio.init();
        mvl.socket.emit('get rooms');
        document.getElementById('play').innerHTML = "Start new game";
        mvl.state.onlinePlay = true;
    }
}
