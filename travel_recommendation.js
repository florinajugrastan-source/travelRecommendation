const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('report');

function clearSearch() {
    document.getElementById("conditionInput").value = "";
    document.getElementById('report').innerHTML = ""
    document.getElementById('searchResults').style.visibility = 'hidden';
}

function searchDest() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    let valid = false;

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            switch (input){
                case "temples":
                case "temple":{
                    const dest_array = data.temples;
                    generateDestinations(dest_array);
                }
                break;
                case "beaches":
                case "beach":{
                    const dest_array = data.beaches;
                    generateDestinations(dest_array);
                }
                break;
                case "countries":
                case "country":{
                    const dest_array = data.countries;
                    const nr = Math.floor(Math.random() * 4);
                    const country = dest_array.find(item => item.id == nr);
                    generateDestinations(country.cities);
                }
                break;
                default:{
                    const dest_array = data.countries;
                    const country = dest_array.find(item => item.name.toLowerCase() === input);
                    generateDestinations(country.cities);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<div class="resitem">An error occurred while fetching data.</div>';
        });
}

function generateDestinations(dest_array){
    resultDiv.innerHTML = "";
    let divcontent = '';

    for (let i=0; i<dest_array.length; i++) {
        divcontent = `<img src="${dest_array[i].imageUrl}">`;
        divcontent += `<p><strong>${dest_array[i].name}</strong></p>`;
        divcontent += `<p>${dest_array[i].description}</p>`;
        resultDiv.innerHTML += `<div class="resitem">${divcontent}</div><br>`;
    }
    document.getElementById('searchResults').style.visibility = 'visible';
}

btnSearch.addEventListener('click', searchDest);
btnClear.addEventListener("click", clearSearch);