import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

axios.post = jest.fn(); // Define aquí el mock para todas las pruebas
