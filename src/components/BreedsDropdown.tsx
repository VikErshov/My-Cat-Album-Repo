import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { Breed } from "../App";
import { BreedContext } from "../contexts/breedContext";

interface IProps {
  currentBreed: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export default function BreedsDropdown({ currentBreed, handleChange }: IProps) {
  const breeds = useContext(BreedContext);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Breeds</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentBreed}
        label="Breeds"
        onChange={handleChange}
      >
        {breeds.map((breed: Breed) => (
          <Link to={`/${breed.id}`} key={breed.id}>
            <MenuItem value={breed.id}>{breed.name}</MenuItem>
          </Link>
        ))}
      </Select>
    </FormControl>
  );
}
