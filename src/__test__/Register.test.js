import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterNum from '../views/start/RegisterNum';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../routes/context/AuthContext';

jest.mock('@iconify/react', () => ({
  Icon: () => <span>Mocked Icon</span>,
}));

// Mock del hook useAuth
jest.mock('../routes/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('RegisterNum Component', () => {
  const signupMock = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      signup: signupMock,
      findOutNumber: jest.fn(),
      confirmCode: jest.fn(),
      searchPhone: jest.fn(),
      isAuthenticated: false,
    });
    jest.clearAllMocks();
  });

  test('renderiza correctamente el campo de teléfono y el botón "Enviar código"', () => {
    render(
      <BrowserRouter>
        <RegisterNum />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar código/i })).toBeInTheDocument();
  });

  test('renderiza correctamente el campo de código de verificación y el botón "Verificar código"', () => {
    render(
      <BrowserRouter>
        <RegisterNum singinNumber /> {/* Ajuste para simular la vista de verificación de código */}
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Código de verificación/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verificar código/i })).toBeInTheDocument();
  });

  test('renderiza correctamente los campos de correo y contraseña y el botón "Registrarse"', () => {
    render(
      <BrowserRouter>
        <RegisterNum data /> {/* Ajuste para simular la vista de registro */}
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  test('muestra error cuando los campos requeridos están vacíos en la vista de registro', async () => {
    render(
      <BrowserRouter>
        <RegisterNum data /> {/* Ajuste para simular la vista de registro */}
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Este campo es requerido/i)).toBeInTheDocument();
    });
  });
});



// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import RegisterNum from '../views/start/RegisterNum';
// import { BrowserRouter } from 'react-router-dom';
// import { useAuth } from '../routes/context/AuthContext';

// jest.mock('@iconify/react', () => ({
//   Icon: () => <span>Mocked Icon</span>,
// }));

// // Mock del hook useAuth
// jest.mock('../routes/context/AuthContext', () => ({
//   useAuth: jest.fn(),
// }));

// describe('RegisterNum Component', () => {
//   const signupMock = jest.fn();

//   beforeEach(() => {
//     useAuth.mockReturnValue({
//       signup: signupMock,
//       findOutNumber: jest.fn(),
//       confirmCode: jest.fn(),
//       searchPhone: jest.fn(),
//       isAuthenticated: false,
//     });
//     jest.clearAllMocks();
//   });

//   test('renderiza correctamente los campos de teléfono', () => {
//     render(
//       <BrowserRouter>
//         <RegisterNum />
//       </BrowserRouter>
//     );

//     // Verifica si el campo de teléfono y el botón "Enviar código" están en la vista inicial
//     expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Enviar código/i })).toBeInTheDocument();
//   });

//   test('renderiza correctamente los campos de registro (correo y contraseña)', () => {
//     render(
//       <BrowserRouter>
//         <RegisterNum data /> {/* Ajuste para simular la vista de registro */}
//       </BrowserRouter>
//     );

//     // Verifica los campos de correo y contraseña en la vista de registro
//     expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
//   });

//   test('muestra error cuando los campos requeridos están vacíos en la vista de registro', async () => {
//     render(
//       <BrowserRouter>
//         <RegisterNum data /> {/* Ajuste para simular la vista de registro */}
//       </BrowserRouter>
//     );

//     // Intentar hacer clic en el botón "Registrarse" en la vista de registro
//     const submitButton = screen.getByRole('button', { name: /Registrarse/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText(/Este campo es requerido/i)).toBeInTheDocument();
//     });
//   });
// });
