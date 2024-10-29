describe('Consulta de información del menú a la API', () => {
  it('Debe obtener correctamente la lista de platillos desde la API', () => {
    cy.request('GET', 'https://api-barbada-saurce.vercel.app/api/menu')
      .then((response) => {
        // Verifica que la respuesta tenga estado 200
        expect(response.status).to.eq(200);

        // Verifica que la respuesta contenga datos en el formato esperado (array de arrays)
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.be.an('array');

        // Recorre los platillos y verifica que cada uno tenga 'nombre_platillo'
        response.body[0].forEach((platillo) => {
          expect(platillo).to.have.property('nombre_platillo');
          expect(platillo).to.have.property('precio');
          expect(platillo).to.have.property('estado');
          expect(platillo).to.have.property('imagen_platillo');
        });

        // Opcional: Imprime en la consola de Cypress
        cy.log(response.body[0]);
      });
  });

  it('Debe obtener correctamente los platillos de la categoría 4', () => {
    cy.request({
      method: 'GET',
      url: 'https://api-barbada-saurce.vercel.app/api/menu-categoria/4', // filtrando por categoría 4
    }).then((response) => {
      // Asegura que la respuesta es un array de arrays y accede al primer array anidado
      expect(response.body).to.be.an('array').and.to.have.length.greaterThan(0);
      expect(response.body[0]).to.be.an('array');
    
      response.body[0].forEach((platillo) => {
        expect(platillo).to.have.property('id_platillo').and.to.be.a('number');
        expect(platillo).to.have.property('nombre_platillo').and.to.be.a('string');
        expect(platillo).to.have.property('precio').and.to.be.a('string');
        expect(platillo).to.have.property('estado').and.to.be.a('string');
        expect(platillo).to.have.property('imagen_platillo').and.to.be.a('string');
        expect(platillo).to.have.property('platillo_disponible').and.to.be.oneOf([0, 1]);
      });
    });
  });
});
