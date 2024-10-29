import { Selector, ClientFunction } from 'testcafe';

const url = 'https://labarbada.store/login'; // URL base de la aplicación
const userEmail = 'aldohernandezcelestino@gmail.com';
const userPassword = 'Prismacolor15!';

// Función para verificar la redirección
const getLocation = ClientFunction(() => document.location.href);

fixture`Pruebas de Pago e Inicio de Sesión`
    .page(url);

test('Inicio de sesión exitoso', async t => {
    const emailInput = Selector('input[name="dato"]');
    const passwordInput = Selector('input[name="pass"]');
    const submitButton = Selector('button').withText('Iniciar sesión');
    const welcomeMessage = Selector('h1').withText('Bienvenido');

    await t
        .typeText(emailInput, userEmail)  
        .typeText(passwordInput, userPassword)  
        .click(submitButton)
        .expect(welcomeMessage.exists).ok('El mensaje de bienvenida no se ha cargado'); 

    // Verificar redirección a la página principal después del inicio de sesión
    await t.expect(getLocation()).contains('/dashboard', 'Redirección incorrecta después del inicio de sesión');
});

test('Error en inicio de sesión con datos inválidos', async t => {
    const emailInput = Selector('input[name="dato"]');
    const passwordInput = Selector('input[name="pass"]');
    const submitButton = Selector('button').withText('Iniciar sesión');
    const errorMessage = Selector('.toast-error'); 

    await t
        .typeText(emailInput, 'usuario@example.com')   
        .typeText(passwordInput, 'passwordIncorrecto') 
        .click(submitButton)
        .expect(errorMessage.exists).ok('El mensaje de error no aparece con credenciales incorrectas');
});

test('Flujo de Pago - Selección de dirección, método y confirmación', async t => {
    const emailInput = Selector('input[name="dato"]');
    const passwordInput = Selector('input[name="pass"]');
    const submitButton = Selector('button').withText('Iniciar sesión');
    const paymentPageElement = Selector('#paymentPageElement');
    const addressSelector = Selector('#addressSelector'); // Cambia al selector correcto de la dirección
    const paymentMethodSelector = Selector('#paymentMethodSelector'); // Cambia al selector correcto del método de pago
    const confirmButton = Selector('#confirmPaymentButton'); // Cambia al selector del botón de confirmación

    // Iniciar sesión
    await t
        .typeText(emailInput, userEmail)  
        .typeText(passwordInput, userPassword)  
        .click(submitButton)
        .expect(getLocation()).contains('/dashboard', 'Redirección incorrecta después del inicio de sesión');

    // Navegar a la página de pago
    await t
        .navigateTo('https://labarbada.store/payment')
        .expect(paymentPageElement.exists).ok('La página de pago no se ha cargado correctamente');

    // Seleccionar dirección
    await t
        .click(addressSelector)
        .click(addressSelector.child('option').nth(1)); // Selecciona una dirección específica

    // Seleccionar método de pago
    await t
        .click(paymentMethodSelector)
        .click(paymentMethodSelector.child('option').nth(1)); // Selecciona un método de pago específico

    // Confirmar pago
    await t
        .click(confirmButton)
        .expect(Selector('.confirmationMessage').exists).ok('No se muestra el mensaje de confirmación de pago');
});
