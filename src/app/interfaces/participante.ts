export interface Participante {
    name: string;
    description?: string;
    imageUrl?: string;
}

export interface ParticipanteFB extends Participante { id: string; }

