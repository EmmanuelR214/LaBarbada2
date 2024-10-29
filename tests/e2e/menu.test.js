import { Selector } from 'testcafe';

fixture `Menu Component`
    .page `https://labarbada.store/menu`;

test('Verify menu page loads and selecting a dish redirects to the dish page', async t => {
    const searchInput = Selector('div.search-container input[placeholder="Buscar"]');
    const dishCard = Selector('.CardMenu').withText('Tostasas'); // Asegúrate de que el nombre coincide con el platillo
    const dishPageTitle = Selector('h1').withText('Tostasas'); // Selector para verificar el título del platillo en la página de destino

    await t
        // Verifica que la página principal del menú carga
        .expect(Selector('h1').withText('Menu').exists).ok('La página del menú no cargó correctamente')

        // Simula la búsqueda del platillo
        .typeText(searchInput, 'Tostasas')
        .wait(1000) // Espera a que se actualicen los resultados

        // Haz clic en la carta del platillo
        .click(dishCard)
        
        // Verifica que el cuerpo de la página tiene contenido cargado
        .expect(Selector('body').clientWidth).gt(0, 'La página de destino no se cargó correctamente')

        // Verifica la redirección correcta
        .expect(t.eval(() => document.location.href)).contains('/platillo/Tostasas', 'No se redirigió a la URL correcta')

        // Verifica que el título del platillo aparece en la página de destino
        .expect(dishPageTitle.exists).ok('El título del platillo no se encontró en la página de destino');
});
