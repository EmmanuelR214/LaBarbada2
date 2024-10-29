import { Selector } from 'testcafe';

fixture `Pruebas de Pago`
    .page `https://labarbada.store/login`;

test('Flujo de Pago - Selección de dirección, método y confirmación', async t => {
    // Iniciar sesión
    await t
        .typeText('#username', 'aldohernandezcelestino@gmail.com') // Reemplaza con el selector y datos de usuario
        .typeText('#password', 'Prismacolor15!') // Reemplaza con el selector y contraseña
        .click('#loginButton'); // Botón para iniciar sesión

    // Navegar a la página de pago después de autenticarse
    await t
        .navigateTo('https://labarbada.store/payment')
        .expect(Selector('#paymentPageElement').exists).ok(); // Verifica que la página de pago se haya cargado

    // Continúa con el flujo de prueba en la página de pago
    // (Por ejemplo, seleccionando dirección, método de pago, etc.)
});
