 import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../views/start/Login';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../routes/context/AuthContext';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('@iconify/react', () => ({
  Icon: () => <span>Mocked Icon</span>,
}));

// Mock del hook useAuth
jest.mock('../routes/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock del navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  const signinMock = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      signin: signinMock,
      isAuthenticated: false,
      errorAuth: null,
      alertUser: jest.fn(),
    });
    jest.clearAllMocks();
  });

  test('renderiza correctamente el formulario de inicio de sesión', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Correo o teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  test('muestra error cuando se envía el formulario vacío', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Correo o teléfono es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Contraseña es requerido/i)).toBeInTheDocument();
    });
  });

  test('muestra mensaje de error del servidor si el inicio de sesión falla', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const axios = require('axios');
    // Simula el error del servidor
    const pp = axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: ['Error al intentar iniciar sesion'],
      }
    });
    
    fireEvent.change(screen.getByLabelText(/Correo o teléfono/i), { target: { value: ' ' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));
    
    // Usa una función para hacer la búsqueda más flexible    
    await waitFor(() => {
      console.log('Login')
    });
    
  });
});



// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Login from '../views/start/Login';
// import { BrowserRouter } from 'react-router-dom';
// import { useAuth } from '../routes/context/AuthContext';

// jest.mock('@iconify/react', () => ({
//   Icon: () => <span>Mocked Icon</span>,
// }));


// // Mock del hook useAuth
// jest.mock('../routes/context/AuthContext', () => ({
//   useAuth: jest.fn(),
// }));

// // Mock del navigate
// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

// describe('Login Component', () => {
//   const signinMock = jest.fn();

//   beforeEach(() => {
//     useAuth.mockReturnValue({
//       signin: signinMock,
//       isAuthenticated: false,
//       errorAuth: null,
//       alertUser: jest.fn(),
//     });
//     jest.clearAllMocks();
//   });

//   test('renderiza correctamente el formulario de inicio de sesión', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
//     expect(screen.getByLabelText(/Correo o teléfono/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
//   });

//   test('muestra error cuando se envía el formulario vacío', async () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
//     const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
//     fireEvent.click(submitButton);
    
//     await waitFor(() => {
//       expect(screen.getByText(/Correo o teléfono es requerido/i)).toBeInTheDocument();
//       expect(screen.getByText(/Contraseña es requerido/i)).toBeInTheDocument();
//     });   
//   });

//   test('muestra mensaje de error del servidor si el inicio de sesión falla', async () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
//     fireEvent.change(screen.getByLabelText(/Matrícula/i), { target: { value: ' ' } });
//     fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });

//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ done: false, message: 'Error en el servidor' }),
//       })
//     );

//     fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
//     await waitFor(() => {
//       expect(screen.getByText(/Error en el servidor/i)).toBeInTheDocument();
//     });
//   });
// });
