
const urlByEnv = (url) => import.meta.env.MODE === 'production' ? `${url.slice(0,4)}${url.slice(11)}` : url;

export default {
    Appetizers: urlByEnv('/src/assets/wings.jpg'),
    Salads: urlByEnv('/src/assets/caesar.jpg'),
    Sandwiches: urlByEnv('/src/assets/burger.jpg'),
    Entrees: urlByEnv('/src/assets/pot-roast.jpg'),
    Kids: urlByEnv('/src/assets/grilled-cheese.jpg'),
}