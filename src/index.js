const getJSON = async function (tvShow, type = 'episodes') {
    const res = await fetch(
        `https://api.tvmaze.com/shows/${tvShow}/${type}`
    );
    const data = await res.json();
    
    return data;
};
const episodes = await getJSON(527);
