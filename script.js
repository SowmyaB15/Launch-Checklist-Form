window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {  
        event.preventDefault();    
        let pilotName = document.querySelector("[name=pilotName]");
        let copilotName = document.querySelector("[name=copilotName]");
        let fuelLevel = document.querySelector("[name=fuelLevel]");
        let cargoMass = document.querySelector("[name=cargoMass]");

        let headerStatus = document.getElementById("launchStatus");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields are required!");
            event.preventDefault();
        } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value) || isNaN(pilotName.value) === false || isNaN(copilotName.value) === false ) {
                alert("Make sure to enter valid information for each field!");
                event.preventDefault();
        } else {
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
            copilotStatus.innerHTML = `Co-Pilot ${copilotName.value} is ready for launch`;
            headerStatus.innerHTML = "Shuttle is ready for launch";
            headerStatus.setAttribute("style", "color:green;");
            document.getElementById("faultyItems").style.visibility = 'visible'; 

            if (fuelLevel.value < 10000) { 
                if(cargoMass.value <= 10000) {
                    cargoStatus.innerHTML = "Cargo mass low enough for launch"; 
                } else {
                    cargoStatus.innerHTML = "Cargo mass too high for launch";
                }
                fuelStatus.innerHTML = "Fuel level too low for launch"; 
                headerStatus.innerHTML = "Shuttle not ready for launch";
                headerStatus.setAttribute("style", "color:red;"); 
                document.getElementById("faultyItems").style.visibility = 'visible'; 
            } else {
                if(cargoMass.value <= 10000) {
                    cargoStatus.innerHTML = "Cargo mass low enough for launch"; 
                } else {
                    cargoStatus.innerHTML = "Cargo mass too high for launch";
                    headerStatus.innerHTML = "Shuttle not ready for launch";
                    headerStatus.setAttribute("style", "color:red;"); 
                    document.getElementById("faultyItems").style.visibility = 'visible'; 
                }
                fuelStatus.innerHTML = "Fuel level high enough for launch";
            }
                    
            fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
                response.json().then(function(json) {
                    const target = document.getElementById("missionTarget");
                    let index = 3;
                    target.innerHTML = `
                        <h2> Mission Destination </h2>
                            <ol>
                                <li>Name: ${json[index].name}</li>
                                <li>Diameter: ${json[index].diameter}</li>
                                <li>Star: ${json[index].star}</li>
                                <li>Distance from Earth: ${json[index].distance}</li>
                                <li>Number of Moons: ${json[index].moons}</li>
                            </ol>
                        <img src= "${json[index].image}">
                    `;
                });
            });
        }
    }); 
});