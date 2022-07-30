import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useSearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    search: " ",
    searchFor: "",
  });

  const search = () => {
    if (!(formData.search === "")) {
      navigate(`/wyszukaj/${formData.search}${formData.searchFor}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (formData.search !== " ") {
      search();
    }
  }, [formData.search]);

  return [formData, setFormData, search];
};

export default useSearchForm;
