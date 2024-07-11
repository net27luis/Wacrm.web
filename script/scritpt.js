let blueVotes = 0;
        let redVotes = 0;
        let votingEnabled = false;
        let timerInterval;

        document.addEventListener('keydown', function(event) {
            if (!votingEnabled) return;

            if (event.key === 'F4') {
                blueVotes++;
                updateVotes();
            } else if (event.key === 'F2') {
                redVotes++;
                updateVotes();
            }
        });

        function updateVotes() {
            const totalVotes = blueVotes + redVotes;
            const bluePercentage = totalVotes > 0 ? (blueVotes / totalVotes * 100).toFixed(1) : 0.0;
            const redPercentage = totalVotes > 0 ? (redVotes / totalVotes * 100).toFixed(1) : 0.0;

            document.getElementById('blueVotes').textContent = blueVotes + ' votos';
            document.getElementById('redVotes').textContent = redVotes + ' votos';
            document.getElementById('bluePercentage').textContent = bluePercentage + '%';
            document.getElementById('redPercentage').textContent = redPercentage + '%';

            document.getElementById('blueProgress').style.width = bluePercentage + '%';
            document.getElementById('redProgress').style.width = redPercentage + '%';
        }

        function updateTeamNames() {
            const blueTeamName = document.getElementById('blueTeamNameInput').value || 'Equipo azul';
            const redTeamName = document.getElementById('redTeamNameInput').value || 'Equipo rojo';

            document.getElementById('blueTeamName').textContent = blueTeamName;
            document.getElementById('redTeamName').textContent = redTeamName;
            toggleTeamNameInputs();
        }

        function toggleTeamNameInputs() {
            const inputsDiv = document.getElementById('teamNameInputs');
            inputsDiv.classList.toggle('hidden');
        }

        function toggleTimerInput() {
            const timerDiv = document.getElementById('timerInput');
            timerDiv.classList.toggle('hidden');
        }

        function startTimer() {
            const minutesInput = document.getElementById('minutesInput').value;
            let duration = parseInt(minutesInput) * 60 || 300; // Default to 5 minutes if input is invalid or empty
            const display = document.getElementById('timer');

            clearInterval(timerInterval);
            votingEnabled = true;

            timerInterval = setInterval(function () {
                let minutes = parseInt(duration / 60, 10);
                let seconds = parseInt(duration % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = "Tiempo restante: " + minutes + ":" + seconds;

                if (--duration < 0) {
                    clearInterval(timerInterval);
                    votingEnabled = false;
                    announceWinner();
                }
            }, 1000);
        }

        function announceWinner() {
            const blueTeam = document.getElementById('blueTeamName');
            const redTeam = document.getElementById('redTeamName');

            if (blueVotes > redVotes) {
                blueTeam.classList.add('winner');
                blueTeam.textContent += " WIN!";
            } else if (redVotes > blueVotes) {
                redTeam.classList.add('winner');
                redTeam.textContent += " WIN!";
            } else {
                blueTeam.textContent += " DRAW!";
                redTeam.textContent += " DRAW!";
            }
        }

        window.onload = function () {
            document.getElementById('minutesInput').value = 5; // Set default minutes to 5
        };