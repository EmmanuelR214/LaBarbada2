import { Selector } from 'testcafe';

const url = 'https://labarbada.store/register-data'; // Cambia esto a la URL del registro

fixture`Pruebas de Registro con Número`
    .page(url);

// Prueba para enviar un número de teléfono
test('Enviar código de verificación con número de teléfono válido', async t => {
    const phoneInput = Selector('input[name="tel"]');
    const sendCodeButton = Selector('button').withText('Enviar código');
    const verificationMessage = Selector('h2').withText('¡Introduce el codigo!');

    await t
        .typeText(phoneInput, '7711155935') // Cambia a un número válido
        .click(sendCodeButton)
        .expect(verificationMessage.exists).ok('El mensaje para introducir el código no aparece');
});

// Prueba para enviar un número de teléfono inválido
test('Enviar código de verificación con número de teléfono inválido', async t => {
    const phoneInput = Selector('input[name="tel"]');
    const sendCodeButton = Selector('button').withText('Enviar código');

    await t
        .typeText(phoneInput, '123') // Número inválido
        .click(sendCodeButton)
        .expect(Selector('.toast-warning').exists).ok('No se mostró un mensaje de advertencia para número inválido');
});

// Prueba para verificar el código
test('Verificar código con código correcto', async t => {
    const codeInput = Selector('input[name="code"]');
    const verifyCodeButton = Selector('button').withText('verificar código');
    const successMessage = Selector('h2').withText('¡Ya casi terminamos!');

    // Aquí, asume que primero enviaste un número válido y obtuviste un código
    await t
        .typeText(codeInput, '123456') // Cambia a un código de verificación válido
        .click(verifyCodeButton)
        .expect(successMessage.exists).ok('El mensaje de éxito no aparece después de verificar el código');
});
