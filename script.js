async function getMatchData() {
    //http://127.0.0.1:5000/score?id=7476
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=fae39877-8cbe-4c12-ab53-a751b2fe7f6e&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status !== "success") return;

            const matchesList = data.data;

            if (!matchesList) return [];

            const relevantData = matchesList.map(match => ({
                name: match.name,
                status: match.status,
                date: new Date(match.date).toLocaleDateString()
            }));

            console.log({ relevantData });

            document.getElementById("matches").innerHTML = relevantData.map(match => 
                `<li>
                    <span class="match-name">${match.name}</span>
                    <span class="match-status">${match.status}</span>
                    <span class="match-date">${match.date}</span>
                    
                </li>`
            ).join('');

            return relevantData;
        })
        .catch(e => console.log(e));
}

getMatchData();
