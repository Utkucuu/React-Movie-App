function sortGenres({ handleSelectedGenres, selectedGenres, movieGenres }) {
  return (
    <>
      <div className="">
        <select
          value={selectedGenres}
          className="w-40 border-2 border-slate-400 text-sm md:text-base"
          onChange={handleSelectedGenres}
        >
          <option value="Tüm Kategoriler">Tüm Kategoriler</option>
          {movieGenres &&
            movieGenres?.map((genres) => (
              <option
                key={genres.id}
                value={genres.id}
                name={genres.name}
                className="text-sm md:text-base"
              >
                {genres.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}

export default sortGenres;
