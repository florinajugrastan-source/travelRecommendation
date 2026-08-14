const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const destinations = [];

function clearSearch() {
    document.getElementById("conditionInput").value = "";
    document.getElementById('result').innerHTML = "";
}

function searchDest() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    let valid = false;

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            switch (input){
                case "country":{
                    const dest_array = data[0];
                    valid = true;
                }
                break;
                case "temple":{
                    const dest_array = data[1];
                    valid = true;
                }
                break;
                case "beach":{
                    const dest_array = data[2];
                    valid = true;
                }
                break;
                default:{
                    alert('Please enter a value from: beach, temple, country');
                    valid = false;
                }
            }

            if (valid == true){
                resultDiv.innerHTML = "<h2>Search results</h2>";
                for (const gender in genderConditionsCount) {
                    report.innerHTML += `${gender}:<br>`;
                    for (const condition in genderConditionsCount[gender]) {
                        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
                    }
                }
/*            if (condition) {
                const symptoms = condition.symptoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
*/
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', searchDest);
btnClear.addEventListener("click", clearSearch);