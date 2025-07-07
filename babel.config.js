module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ↳ charge les variables du fichier .env
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',   // import { API_URL } from '@env'
          path: '.env',         // chemin du fichier
          allowUndefined: false // lève une erreur si une variable manque
        }
      ],

      // ⚠️ doit rester le tout DERNIER plugin
      'react-native-reanimated/plugin'
    ],
  };
};