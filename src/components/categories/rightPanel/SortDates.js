function SortDates({ selectedDates, handleSelectedDates, dateIntervals }) {
  return (
    <div className="">
      <select
        value={selectedDates}
        className=" w-40 border-2 border-slate-400 text-sm md:text-base"
        onChange={(e) => handleSelectedDates(e)}
      >
        <option>Tüm Yıllar</option>
        {dateIntervals &&
          dateIntervals?.map((dates, i) => (
            <option
              key={i}
              value={dates.value}
              className="p-0 text-sm md:text-base"
            >
              {dates.value}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SortDates;
