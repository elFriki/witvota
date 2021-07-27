export interface Evento {
    name: string;
    description?: string;
    place?: string;
    iniDateTime: Date;
    endDateTime: Date;
    price: number;
    rating?: number[];
    participantes?: ParticipanteReferenceFB[];
    categories?: string[];
    imageUrl?: string;
}
export interface DateFB {
    seconds: number;
    nanoseconds: number;
}
export interface ParticipanteReferenceFB {
    id: string;
    votos: number;
    path: string;
}
export interface EventoFB extends Evento { id: string; }
