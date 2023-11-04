import { generatePath, useNavigate } from "react-router-dom";

export function useGeneratePath() {
  const navigate = useNavigate();

  const paginatePath = (newPage) => {
    const path = generatePath("page/:id", {
      id: newPage,
    });

    navigate(`${path}`);
  };

  return paginatePath;
}
