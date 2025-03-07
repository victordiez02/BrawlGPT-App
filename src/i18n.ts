
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  // Landing page
  'landing_title': 'Discover the Best Pick with AI in Brawl Stars!',
  'landing_subtitle_1': 'Advanced AI analyzes your draft and recommends the best strategy in real-time.',
  'landing_subtitle_2': 'Simulate selections, perform bans, and get optimal picks for each match.',
  'step_1_title': 'Configure Your Draft',
  'step_1_desc': 'Select your map and team to get started.',
  'step_2_title': 'Ban Strategically',
  'step_2_desc': 'Remove up to 6 brawlers from the pool to refine your strategies.',
  'step_3_title': 'Get AI Recommendations',
  'step_3_desc': 'Receive optimal pick recommendations in seconds.',
  'draft_visualization_text': 'Visual representation of the draft with dynamic picks.',
  'cta_button': 'Generate Optimal Pick with AI',
  'footer_text': 'Unofficial tool for Brawl Stars',
  
  // Common
  'back_to_home': 'Back to Home',
  'search': 'Search...',
  'all_modes': 'All Modes',
  'no_maps_found': 'No maps found',
  'banned_brawlers': 'Banned Brawlers',
  'search_to_ban': 'Search to ban...',
  'no_banned_brawlers': 'No banned brawlers',
  
  // Simulator page
  'select_brawlers': 'Select Brawlers',
  'sort_by': 'Sort by',
  'by_rarity': 'By rarity',
  'name_az': 'Name (A-Z)',
  'name_za': 'Name (Z-A)',
  'no_brawlers_found': 'No brawlers found',
  'current_draft': 'Current Draft',
  'reset': 'Reset',
  'blue_team': 'Blue Team',
  'red_team': 'Red Team',
  'select': 'Select',
  'generating': 'Generating...',
  'generate_best_option': 'Generate Best Option',
  'generate_phase_1': 'Generate the best option for the first phase (FIRST PICK)',
  'generate_phase_2': 'Generate the best option for the second phase',
  'generate_phase_3': 'Generate the best option for the third phase',
  'generate_phase_4': 'Generate the best option for the last phase (LAST PICK)',
  'select_map_first': 'Select a map first',
  'configure_draft_correctly': 'Configure the draft correctly',
  'select_first_pick': 'Select the first pick',
  'select_first_pick_brawler': 'Select the brawler for the 1st pick',
  'select_second_pick_brawler': 'Select the brawler for the 2nd pick',
  'select_first_second_pick_brawlers': 'Select the brawlers for the 1st and 2nd picks',
  'select_third_pick_brawler': 'Select the brawler for the 3rd pick',
  'select_fourth_pick_brawler': 'Select the brawler for the 4th pick',
  'select_fifth_pick_brawler': 'Select the brawler for the 5th pick',
  'remove_sixth_pick': 'Remove the 6th pick',
  'incorrect_pick_order': 'Incorrect pick order. Missing picks {{missingPicks}}º',
  'brawler_selected': '{{name}} selected for the {{team}}',
  'brawler_removed': '{{name}} removed from the draft',
  'brawlers_swapped': '{{from}} swapped with {{to}}',
  'brawler_moved_position': '{{name}} moved to a new position',
  'brawler_banned': '{{name}} banned',
  'brawler_unbanned': 'Ban of {{name}} removed',
  'max_bans_error': 'You can\'t ban more than 6 brawlers',
  'must_select_map': 'You must select a map',
  'error_generating_recommendation': 'Error generating the recommendation. Try again.',
  'confirm_reset_draft': 'Are you sure you want to reset the draft? You will lose all current selections.',
  'draft_reset': 'Draft reset',
  'who_picks_first': 'Who picks first?'
};

// Spanish translations
const esTranslations = {
  // Landing page
  'landing_title': '¡Descubre el Mejor Pick con IA en Brawl Stars!',
  'landing_subtitle_1': 'Una IA avanzada analiza tu draft y te recomienda la mejor estrategia en tiempo real.',
  'landing_subtitle_2': 'Simula selecciones, realiza baneos y obtén picks óptimos para cada partida.',
  'step_1_title': 'Configura tu Draft',
  'step_1_desc': 'Selecciona tu mapa y equipo para comenzar.',
  'step_2_title': 'Banea Inteligentemente',
  'step_2_desc': 'Elimina hasta 6 brawlers del pool para refinar tus estrategias.',
  'step_3_title': 'Obtén Recomendaciones IA',
  'step_3_desc': 'Recibe recomendaciones de picks óptimos en segundos.',
  'draft_visualization_text': 'Representación visual del draft con picks dinámicos.',
  'cta_button': 'Generar Pick Óptimo con IA',
  'footer_text': 'Herramienta no oficial para Brawl Stars',
  
  // Common
  'back_to_home': 'Volver al inicio',
  'search': 'Buscar...',
  'all_modes': 'Todos los modos',
  'no_maps_found': 'No se encontraron mapas',
  'banned_brawlers': 'Brawlers Baneados',
  'search_to_ban': 'Buscar para banear...',
  'no_banned_brawlers': 'No hay brawlers baneados',
  
  // Simulator page
  'select_brawlers': 'Seleccionar Brawlers',
  'sort_by': 'Ordenar por',
  'by_rarity': 'Por rareza',
  'name_az': 'Nombre (A-Z)',
  'name_za': 'Nombre (Z-A)',
  'no_brawlers_found': 'No se encontraron brawlers',
  'current_draft': 'Draft Actual',
  'reset': 'Reiniciar',
  'blue_team': 'Equipo Azul',
  'red_team': 'Equipo Rojo',
  'select': 'Selecciona',
  'generating': 'Generando...',
  'generate_best_option': 'Generar Mejor Opción',
  'generate_phase_1': 'Generar la mejor opción para la primera fase (PRIMER PICK)',
  'generate_phase_2': 'Generar la mejor opción para la segunda fase',
  'generate_phase_3': 'Generar la mejor opción para la tercera fase',
  'generate_phase_4': 'Generar la mejor opción para la última fase (ÚLTIMO PICK)',
  'select_map_first': 'Selecciona un mapa primero',
  'configure_draft_correctly': 'Configura el draft correctamente',
  'select_first_pick': 'Selecciona el primer pick',
  'select_first_pick_brawler': 'Selecciona el brawler para el 1er pick',
  'select_second_pick_brawler': 'Selecciona el brawler para el 2º pick',
  'select_first_second_pick_brawlers': 'Selecciona los brawlers para los picks 1º y 2º',
  'select_third_pick_brawler': 'Selecciona el brawler para el 3er pick',
  'select_fourth_pick_brawler': 'Selecciona el brawler para el 4º pick',
  'select_fifth_pick_brawler': 'Selecciona el brawler para el 5º pick',
  'remove_sixth_pick': 'Elimina el 6º pick',
  'incorrect_pick_order': 'Orden de picks incorrecto. Faltan picks {{missingPicks}}º',
  'brawler_selected': '{{name}} seleccionado para el {{team}}',
  'brawler_removed': '{{name}} eliminado del draft',
  'brawlers_swapped': '{{from}} intercambiado con {{to}}',
  'brawler_moved_position': '{{name}} movido a una nueva posición',
  'brawler_banned': '{{name}} baneado',
  'brawler_unbanned': 'Baneo de {{name}} eliminado',
  'max_bans_error': 'No puedes banear más de 6 brawlers',
  'must_select_map': 'Debes seleccionar un mapa',
  'error_generating_recommendation': 'Error al generar la recomendación. Inténtalo de nuevo.',
  'confirm_reset_draft': '¿Estás seguro de que quieres reiniciar el draft? Perderás todas las selecciones actuales.',
  'draft_reset': 'Draft reiniciado',
  'who_picks_first': '¿Quién empieza eligiendo?'
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
