
export const state = {
    language: 'en',
    getTranslation: getTranslation,
    getLanguage: getLanguage,
    setLanguage: setLanguage
}


export function getLanguage() {
    let language = localStorage.getItem('language');
    if (!language) {
        language = navigator.language.includes('pt') ? "pt" : "en";
        localStorage.setItem('language', language);
    }
    state.language = language;

    return language;
}

interface ResourceKeys {
    [key: string]: string;
}


const pt: ResourceKeys = {
    about: "Sobre mim",
    projects: "Projetos",
    contact: "Contato",
    greeting: "Olá, eu sou o",
    greeting2: "Desenvolvedor Web e Unity",
    snakeGame: "Jogo da cobrinha",
};
const en: ResourceKeys = {
    about: "About me",
    projects: "Projects",
    contact: "Contact",
    greeting: "Hello, I'm",
    greeting2: "Web and Unity Developer",
    snakeGame: "Snake game",
};

export function setLanguage(language: string) {
    localStorage.setItem('language', language);
    state.language = language;
  }

export function getTranslation(key: string) {
    if (getLanguage() === 'pt') {
        return pt[key];
    } else {
        return en[key];
    }
}