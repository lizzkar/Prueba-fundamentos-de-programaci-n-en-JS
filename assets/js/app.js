function searchHero() {
    console.log('Función searchHero iniciada.');

    let heroId = $('#heroId').val();

    if (validateInput(heroId)) {
        heroId = parseInt(heroId);

        if (heroId >= 1 && heroId <= 732) {
            $.ajax({
                url: `https://www.superheroapi.com/api.php/4905856019427443/${heroId}`,
                method: 'GET',
                success: function (data) {

                    console.log('Respuesta de la API:', data);

                    if (data.response === 'error') {
                        alert('Error en la búsqueda. Superhéroe no encontrado.');
                    } else {

                        console.log('Powerstats del superhéroe:', data.powerstats);
                        console.log('Biografía del superhéroe:', data.biography);

                        renderHeroCard(data);
                        renderHeroChart(data);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error en la búsqueda:', error);
                    alert('Error en la búsqueda. Inténtalo nuevamente.');
                }
            });
        } else {
            alert('Ingresa un número válido para buscar al héroe. Elige entre 1 y 732.');
        }
    } else {
        alert('Ingresa un número válido para buscar al héroe.');
    }

    console.log('Función searchHero finalizada.');
}



function validateInput(input) {
    return /^\d+$/.test(input);
}

function renderHeroCard(heroData) {
    const resultSection = $('#result-section');
    resultSection.empty();

    const cardHTML = `
        <div class="hero-card">
            <h2>${heroData.name}</h2>
            <img src="${heroData.image.url}" alt="${heroData.name} Image">
            <p>Powerstats:</p>
            <ul>
                <li>Intelligence: ${heroData.powerstats.intelligence}</li>
                <li>Strength: ${heroData.powerstats.strength}</li>
                <li>Speed: ${heroData.powerstats.speed}</li>
                <li>Durability: ${heroData.powerstats.durability}</li>
                <li>Power: ${heroData.powerstats.power}</li>
                <li>Combat: ${heroData.powerstats.combat}</li>
                <!-- Agrega más información según tus necesidades -->
            </ul>
            <p>Apariencia:</p>
            <ul>
                <li>Gender: ${heroData.appearance.gender}</li>
                <li>Race: ${heroData.appearance.race}</li>
                <!-- Agrega más información de la apariencia según tus necesidades -->
            </ul>
            <p>Biografía:</p>
            <ul>
                <li>Nombre completo: ${heroData.biography["full-name"]}</li>
                <li>Alias: ${heroData.biography.aliases.join(', ')}</li>
                <li>Lugar de nacimiento: ${heroData.biography["place-of-birth"]}</li>
                <!-- Agrega más información de la biografía según tus necesidades -->
            </ul>
            <p>Conexiones:</p>
            <ul>
                <li>Grupo de afiliación: ${heroData.connections["group-affiliation"]}</li>
                <li>Relatives: ${heroData.connections.relatives}</li>
                <!-- Agrega más información de las conexiones según tus necesidades -->
            </ul>
        </div>
    `;

    resultSection.append(cardHTML);
    console.log('Tarjeta HTML generada:', cardHTML);
}



function renderHeroChart(heroData) {

    const chartContainer = $('#chart-container');

    chartContainer.empty();

    const dataPoints = [
        { label: 'Intelligence', y: parseInt(heroData.powerstats.intelligence) || 0, legendText: 'Inteligence' },
        { label: 'Strength', y: parseInt(heroData.powerstats.strength) || 0, legendText: 'Strenght' },
        { label: 'Speed', y: parseInt(heroData.powerstats.speed) || 0, legendText: 'Speed' },
        { label: 'Durability', y: parseInt(heroData.powerstats.durability) || 0, legendText: 'Durability' },
        { label: 'Power', y: parseInt(heroData.powerstats.power) || 0, legendText: 'Power' },
        { label: 'Combat', y: parseInt(heroData.powerstats.combat) || 0, legendText: 'Combat' }
    ];

    const options = {
        animationEnabled: true,
        title: {
            text: 'Powerstats del Superhéroe',
            fontFamily: 'Permanent Marker, cursive'
        },
        axisX: {
            labelFontFamily: 'Permanent Marker, cursive'
        },
        axisY: {
            labelFontFamily: 'Permanent Marker, cursive'
        },
        legend: {
            fontFamily: 'Permanent Marker, cursive'
        },
        data: [{
            type: 'pie',
            showInLegend: true,
            toolTipContent: '{label}: <strong>{y}%</strong>',
            indexLabel: '{label} - {y}%',
            dataPoints: dataPoints
        }]
    };

    const chart = new CanvasJS.Chart('chart-container', options);


    chart.render();
}


