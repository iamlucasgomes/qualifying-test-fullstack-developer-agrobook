import { createContext } from 'react';
import MyContextData from './interfaces/MyContextData';

const Context = createContext<MyContextData>({} as MyContextData);

export default Context;