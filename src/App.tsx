import { useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import "./App.css";
import CatInfoCard from "./components/CatInfoCard";
import BreedsDropdown from "./components/BreedsDropdown";
import { initialBreedInfo, paths } from "./constants";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter, Link } from "react-router-dom";
import { BreedContext } from "./contexts/breedContext";

export type Breed = {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
};

function App() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [breedInfo, setBreedInfo] = useState<Breed>(initialBreedInfo);
  const [currentBreedImage, setCurrentBreedImage] = useState([]);

  useEffect(() => {
    fetch(paths.GET_ALL_BREEDS)
      .then((res) => res.json())
      .then((json) => setBreeds(json));
  }, []);

  useEffect(() => {
    if (currentBreed !== "") {
      fetch(paths.GET_CURRENT_BREED_IMAGE + currentBreed)
        .then((res) => res.json())
        .then((json) => setCurrentBreedImage(json));
      breeds.forEach((cat) => {
        if (cat.id === currentBreed) {
          setBreedInfo(cat);
        }
      });
    }
  }, [currentBreed]);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentBreed(event.target.value as string);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <BreedsDropdown
          handleChange={handleChange}
          currentBreed={currentBreed}
        />
      ),
    },
    {
      path: "/:cat",
      loader: async ({ params }) => {
        return fetch(
          `https://api.thecatapi.com/v1/images/search?api_key=live_bqQzOlFgfMy3RUxp4XNIc68N18npchoJGyfkYQQDRuFp3Lm2Wx6YbV82xWf3gZkW&breed_ids=${params.cat}`
        );
      },
      element: <CatInfoCard breedInfo={breedInfo} />,
    },
  ]);

  return (
    <BreedContext.Provider value={breeds}>
      <RouterProvider router={router} />
    </BreedContext.Provider>
  );
}

export default App;
