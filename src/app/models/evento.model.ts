export class EventoModel {

    id: number;
    name: string;
    description?: string;
    place?: string;
    iniDateTime: Date;
    endDateTime: Date;
    price: number;
    rating?: number[];
    participantes?: number[];
    categories?: string[];
    imageUrl?: string;

    constructor() {
        const hoy = new Date();
        this.id = hoy.getTime();
        this.name = '';
        this.iniDateTime = new Date(hoy.getTime() + (24 * 60 * 60 * 1000));
        this.endDateTime = new Date(hoy.getTime() + (26 * 60 * 60 * 1000));
        this.price = 0;
        this.imageUrl = 'https://source.unsplash.com/random';
    }
}
