import { useEffect } from "react";
import { useOption } from "../../../context/SelectContext";
import { useLocation } from "react-router-dom";
function SortingTool() {
  // Seçili seçenek durumunu saklayan state

  const { selectedOption, setSelectedOption } = useOption(false);

  const location = useLocation();
  useEffect(() => {
    setSelectedOption("0");
  }, [location]);

  // Seçeneklerin bir dizisi
  const options = [
    { key: "1", value: "En Yüksek Puan" },
    { key: "2", value: "En Popüler" },
    { key: "3", value: "En Çok Oylanan" },
    { key: "4", value: "En yeni " },
  ];

  // Seçeneklerin değiştiğinde çağrılacak işlev
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Seçilen seçeneği güncelle
  };

  return (
    <div className="">
      {/* <label htmlFor="selectBox">Bir seçenek seçin:</label> */}
      <select
        className="w-40 border-2 border-slate-400 text-sm md:text-base"
        id="selectBox"
        value={selectedOption} // component render olduğunda contexten gelen değer sayesinde tekrar sırala yazar
        onChange={handleOptionChange}
      >
        {" "}
        <option className="" value={"0"}>
          Sırala
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.key}
            className="text-sm md:text-base"
          >
            {option.value}
          </option>
        ))}
      </select>

      {/* {selectedOption && <p>Seçilen seçenek: {selectedOption}</p>} */}
    </div>
  );
}

export default SortingTool;
