const getJSON = async function (tvShow, type = 'episodes') {
    const res = await fetch(
        `https://api.tvmaze.com/shows/${tvShow}/${type}`
    );
    const data = await res.json();
    
    return data;
};
const episodes = await getJSON(527);
const firstEl = episodes.at(0);

const NAME_OF_SHOW = `The Sopranos`;
const NUMBER_OF_SEASONS = episodes.at(episodes.length - 1).season;
const AIRDATE = episodes.at(0).airdate.slice(0, 4);

const tvShowTitle = document.querySelector('.tvshow-title');
const tvShowAirDate = document.querySelector('.airdate');
const tvShowSeasons = document.querySelector('.seasons-number');
const seasonDropdown = document.querySelector('.season-dropdown');
const episodeName = document.querySelector('.card-title');
const season = document.querySelector('.season-dropdown');
const episode = document.querySelector('.episode-dropdown');

tvShowTitle.textContent = NAME_OF_SHOW;
tvShowAirDate.textContent = AIRDATE;
tvShowSeasons.textContent = NUMBER_OF_SEASONS;
episodeName.textContent = firstEl.name;


// Functions
function defaultSelector(element){
    element.children.item(0).children.item(0).classList.add('active')

    element.addEventListener('click', (e) => {
        if(e.target.getAttribute('value')){
            Object.values(element.childNodes)
                .filter(el => el.nodeName !== "#text")
                .map(el => {
                    el.children.item(0).classList.remove('active');
                    if(el.children.item(0).getAttribute('value') === e.target.getAttribute('value'))
                        el.children.item(0).classList.add('active')
                });
        }
    })
}

function chooseSeason(params) {
    season.innerHTML = "";
    
    const episodesNum = episodesNumber(params);
    Object.keys(episodesNum).map(el => {
        const li = `
            <li>
                <a class="dropdown-item" href="#" value=${el.slice(-1)}>
                    Season ${el.slice(-1)}
                </a>
            </li>
        `;
        season.insertAdjacentHTML('beforeend', li);
    });
}

function chooseEpisodes(params, season = 1) {
    episode.innerHTML = "";
    
    params.filter(el => el.season === season).map(el => {
        const li = `
            <li>
                <a class="dropdown-item" href="#" value=${formatterSeasonEpisode(el)}>
                ${formatterSeasonEpisode(el)} - ${el.name} 
                </a>
            </li>
        `;
        episode.insertAdjacentHTML('beforeend', li);
    });
}

function calculateEpisodes(number, season){
    let spot = 0;
    for (let index = 0; index < season - 1; index++) {
        spot = Object.keys(number)[index].slice(-1) * Object.values(number)[index];
    }
    return spot;
}

function addTvShowCards(params, seasonValue = 1){
    const tvShowRow = document.querySelector('.tv-show-row');
    tvShowRow.innerHTML = "";

    // const episodesNum = episodesNumber(params);
    const dari = calculateEpisodes(episodesNumber(episodes), seasonValue);

    params.slice(0 || dari, episodesNumber(episodes)[`season${seasonValue}`] + dari).map(param => {
        const col = `
            <div class="col my-2">
                <div class="card h-100">
                    <figure>
                        <img
                            src="${param.image.medium}"
                            class="card-img-top"
                            alt="${param.name}">
                        <figcaption class="figcaption">
                            ${formatterSeasonEpisode(param)}
                        </figcaption>
                    </figure>
                    <div class="card-body">
                        <h5 class="card-title">
                            ${param.name}
                        </h5>
                        <p class="card-text text-start">
                            ${param.summary}
                        </p>
                    </div>
                </div>
            </div>`;
        tvShowRow.insertAdjacentHTML("beforeend", col)
    })
}

function episodesNumber(params){
    const seasons = {};
    let counter = 0;

    for (let indexSeasons = 0; indexSeasons <= NUMBER_OF_SEASONS; indexSeasons++){
        for (let index = 0; index <= params.length; index++)
            if(params[index]?.season === indexSeasons)
                seasons[`season${indexSeasons}`] = ++counter;
        counter = 0;
    }

    return seasons;
}

function formatterSeasonEpisode(episode) {
    const {season, number} = episode;
    
    return `S${season.toString().padStart(2, '0')}E${number.toString().padStart(2, '0')}`
}

function filterEpisode(el, format) {
    el.filter(item => {
        if(formatterSeasonEpisode(item) === format){
            const tvShowRow = document.querySelector('.tv-show-row');
            tvShowRow.innerHTML = "";
        
            const col = `
                <div class="col my-2">
                    <div class="card h-100">
                        <figure>
                            <img
                                src="${item.image.medium}"
                                class="card-img-top"
                                alt="${item.name}">
                            <figcaption class="figcaption">
                                ${formatterSeasonEpisode(item)}
                            </figcaption>
                        </figure>
                        <div class="card-body">
                            <h5 class="card-title">
                                ${item.name}
                            </h5>
                            <p class="card-text text-start">
                                ${item.summary}
                            </p>
                        </div>
                    </div>
                </div>`;
            tvShowRow.insertAdjacentHTML("beforeend", col)
        }
    });
}

// Function Calls
chooseSeason(episodes);
chooseEpisodes(episodes);
defaultSelector(season);
defaultSelector(episode);
addTvShowCards(episodes)

// Event Listerners
season.addEventListener('click', (e) => {
    addTvShowCards(episodes, +e.target.getAttribute('value'));
    chooseEpisodes(episodes, +e.target.getAttribute('value'))
})

episode.addEventListener('click', (e) => {
    filterEpisode(episodes, e.target.getAttribute('value'))
})
console.log(episodes);
