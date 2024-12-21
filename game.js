const nbaTeams = [
    { name: "Atlanta Hawks", logo: "https://upload.wikimedia.org/wikipedia/en/e/ee/Atlanta_Hawks_logo.svg" },
    { name: "Boston Celtics", logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg" },
    { name: "Brooklyn Nets", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg" },
    { name: "Charlotte Hornets", logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg" },
    { name: "Chicago Bulls", logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg" },
    { name: "Cleveland Cavaliers", logo: "https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_Logo.svg" },
    { name: "Dallas Mavericks", logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg" },
    { name: "Denver Nuggets", logo: "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg" },
    { name: "Detroit Pistons", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg" },
    { name: "Golden State Warriors", logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg" },
    { name: "Houston Rockets", logo: "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg" },
    { name: "Indiana Pacers", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg" },
    { name: "Los Angeles Clippers", logo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg" },
    { name: "Los Angeles Lakers", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg" },
    { name: "Memphis Grizzlies", logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg" },
    { name: "Miami Heat", logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg" },
    { name: "Milwaukee Bucks", logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg" },
    { name: "Minnesota Timberwolves", logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg" },
    { name: "New Orleans Pelicans", logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg" },
    { name: "New York Knicks", logo: "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg" },
    { name: "Oklahoma City Thunder", logo: "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg" },
    { name: "Orlando Magic", logo: "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg" },
    { name: "Philadelphia 76ers", logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg" },
    { name: "Phoenix Suns", logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg" },
    { name: "Portland Trail Blazers", logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg" },
    { name: "Sacramento Kings", logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg" },
    { name: "San Antonio Spurs", logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg" },
    { name: "Toronto Raptors", logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg" },
    { name: "Utah Jazz", logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/Utah_Jazz_primary_logo.svg" },
    { name: "Washington Wizards", logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg" }
];

let players = []; // Seznam igralcev
let matches = []; // Seznam tekem

// Inicializacija ekip
function initializeTeamSelectors() {
    const team1Select = document.getElementById("team1");
    const team2Select = document.getElementById("team2");

    nbaTeams.forEach(team => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = team.name;
        option2.value = team.name;

        option1.innerHTML = `<img src="${team.logo}" alt="" class="team-logo"> ${team.name}`;
        option2.innerHTML = `<img src="${team.logo}" alt="" class="team-logo"> ${team.name}`;

        team1Select.appendChild(option1);
        team2Select.appendChild(option2);
    });
}

// Dodajanje igralca
function addPlayer() {
    const playerName = document.getElementById("player-name").value.trim();
    if (playerName && !players.includes(playerName)) {
        players.push(playerName);
        updatePlayerList();
        updatePlayerChoices();
    }
    document.getElementById("player-name").value = ""; // Počisti polje
}

// Posodobi seznam igralcev
function updatePlayerList() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";
    players.forEach(player => {
        const li = document.createElement("li");
        li.textContent = player;
        playerList.appendChild(li);
    });
}

// Posodobi izbiro igralcev in ekip
function updatePlayerChoices() {
    const playerChoicesDiv = document.getElementById("player-choices");
    playerChoicesDiv.innerHTML = "";

    players.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "input-group";

        const label = document.createElement("label");
        label.textContent = `${player}:`;

        const select = document.createElement("select");
        select.id = `choice-${player}`;
        select.innerHTML = `
            <option value="team1">Ekipa 1</option>
            <option value="team2">Ekipa 2</option>
        `;

        playerDiv.appendChild(label);
        playerDiv.appendChild(select);
        playerChoicesDiv.appendChild(playerDiv);
    });
}

// Dodajanje tekme
function addMatch() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    if (team1 === team2) {
        alert("Ekipa 1 in ekipa 2 morata biti različni!");
        return;
    }

    const predictions = {};
    players.forEach(player => {
        const choice = document.getElementById(`choice-${player}`).value;
        predictions[player] = choice === "team1" ? team1 : team2;
    });

    matches.push({ team1, team2, predictions, winner: null });
    updateMatchList();
}

// Posodobi seznam tekem
function updateMatchList() {
    const matchList = document.getElementById("match-list");
    matchList.innerHTML = "";

    matches.forEach((match, index) => {
        const tr = document.createElement("tr");

        const matchCell = document.createElement("td");
        matchCell.textContent = `${match.team1} vs ${match.team2}`;

        const predictionsCell = document.createElement("td");
        predictionsCell.innerHTML = Object.entries(match.predictions)
            .map(([player, team]) => `${player}: ${team}`)
            .join("<br>");

        const winnerCell = document.createElement("td");
        winnerCell.textContent = match.winner || "N/A";

        const resultCell = document.createElement("td");
        resultCell.innerHTML = `
            <select onchange="setWinner(${index}, this.value)">
                <option value="">Izberi zmagovalca</option>
                <option value="${match.team1}">${match.team1}</option>
                <option value="${match.team2}">${match.team2}</option>
            </select>
        `;

        tr.appendChild(matchCell);
        tr.appendChild(predictionsCell);
        tr.appendChild(winnerCell);
        tr.appendChild(resultCell);

        matchList.appendChild(tr);
    });
}

// Nastavi zmagovalca
function setWinner(matchIndex, winner) {
    matches[matchIndex].winner = winner;
    updateMatchList();
}

// Izračunaj rezultate
function calculateResult() {
    const results = {};

    players.forEach(player => {
        results[player] = 0;
    });

    matches.forEach(match => {
        if (match.winner) {
            Object.entries(match.predictions).forEach(([player, team]) => {
                if (team === match.winner) {
                    results[player]++;
                }
            });
        }
    });

    const resultOutput = document.getElementById("result-output");
    resultOutput.innerHTML = Object.entries(results)
        .map(([player, score]) => `${player}: ${score} pravilnih napovedi`)
        .join("<br>");
}

// Inicializacija
initializeTeamSelectors();
