
export class ParticipanteModel {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;

    constructor() {
        this.id = new Date().getTime();
        this.name = '';
        this.description = '';
        this.imageUrl = 'https://depor.com/resizer/YyRQGmliyl-FH3Y9lYuhF3dnb0I=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BWKOYV3S7NGN3P47D5H2QLYLUQ.jpg';
    }
}