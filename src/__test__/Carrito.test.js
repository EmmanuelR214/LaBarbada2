
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Carrito from '../views/Carrito';
// import { useStore } from '../routes/context/StoreContext';

// // Mock del hook useStore
// jest.mock('../routes/context/StoreContext', () => ({
//   useStore: jest.fn(),
// }));

// describe('Carrito Component', () => {
//   const updateCarMock = jest.fn();
//   const deleteShoppingCarMock = jest.fn();

//   beforeEach(() => {
//     useStore.mockReturnValue({
//       UpdateCar: updateCarMock,
//       DeleteShoppingCar: deleteShoppingCarMock,
//     });
//     jest.clearAllMocks();
//   });

//   test('renderiza los productos en el carrito', () => {
//     render(<Carrito />);
//     expect(screen.getByText(/Total:/i)).toBeInTheDocument();
//   });

//   test('agrega un producto al carrito y actualiza el total', () => {
//     render(<Carrito />);
//     const addButton = screen.getByText(/Agregar Producto/i);
//     fireEvent.click(addButton);
//     expect(updateCarMock).toHaveBeenCalled();
//   });

//   test('elimina un producto del carrito y actualiza el total', () => {
//     render(<Carrito />);
//     const removeButton = screen.getByText(/Eliminar Producto/i);
//     fireEvent.click(removeButton);
//     expect(deleteShoppingCarMock).toHaveBeenCalled();
//   });
// });
