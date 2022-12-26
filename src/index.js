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

tvShowTitle.textContent = NAME_OF_SHOW;
tvShowAirDate.textContent = AIRDATE;
tvShowSeasons.textContent = NUMBER_OF_SEASONS;
episodeName.textContent = firstEl.name;


// functions

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
chooseSeason(episodes);


function episodesNumber(params){
    const seasons = {};
    let counter = 0;

    for (let indexSeasons = 0; indexSeasons <= NUMBER_OF_SEASONS; indexSeasons++)
        for (let index = 0; index <= params.length; index++)
            if(params[index]?.season === indexSeasons)
                seasons[`season${indexSeasons}`] = ++counter;
        counter = 0;

    return seasons;
}

function formatterSeasonEpisode(episode) {
    const {season, number} = episode;
    
    return `${season.toString().padStart(2, '0')}${number.toString().padStart(2, '0')}`
}


console.log(episodes);