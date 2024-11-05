describe('Consulta de información del carrito', () => {
    it('Debe obtener correctamente los elementos del carrito desde la API', () => {
      cy.request('GET', 'https://api-barbada-saurce.vercel.app/api/get-shoppingCar/oexNbbwZZEfwr1lj9aU1WeG7JwT2')
        .then((response) => {
          // Verifica que la respuesta tenga estado 200
          expect(response.status).to.eq(200);
  
          // Verifica que la respuesta contenga datos en el formato esperado (array de arrays)
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('array');
  
          // Verifica el primer platillo del carrito
          const firstItem = response.body[0][0];
          expect(firstItem).to.have.property('id_carrito', 266);
          expect(firstItem).to.have.property('nombre_platillo', 'Puntas de filete');
          expect(firstItem).to.have.property('subtotal', '438.00');
          expect(firstItem).to.have.property('imagen_platillo', 'CamaronesMariposa.jpg');
          expect(firstItem).to.have.property('descripcion_platillo').and.to.be.a('string');
  
          // Opcional: Imprime en la consola de Cypress
          cy.log(response.body[0]);
        });
    });
  });
  