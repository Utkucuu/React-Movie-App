import { generatePath, useNavigate } from "react-router-dom";

export function useGeneratePath() {
  console.log(" UTILS GENERATE PAGE rendered");
  const navigate = useNavigate();

  const paginatePath = (newPage) => {
    const path = generatePath("page/:id", {
      id: newPage,
    });

    navigate(`${path}`);
  };

  return paginatePath;
}
