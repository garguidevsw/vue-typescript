export interface RouterLink {
    name: string;
    title: string;
    path: string;
}

export const linkRoutes:RouterLink[] = [
    { path: '/', name: 'home', title: 'Inicio'},
    { path: '/about', name: 'about', title: 'Acerca De'},
    { path: '/characters', name: 'characters', title: 'Personajes'},
]