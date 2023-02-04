import { createContext } from "react";
import { initialBreedInfo } from "../constants";

export const BreedContext = createContext([initialBreedInfo]);
