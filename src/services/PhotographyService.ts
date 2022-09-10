import { Service } from "../Service";
import { ServiceType } from "../ServiceType";

export class PhotographyService extends Service {
    protected getType(): ServiceType {
        return ServiceType.Photography;
    }

    protected getPrice(): number {
        switch (this.year) {
            case 2020:
                return 1700;
            case 2021:
                return 1800;
            case 2022:
                return 1900;
            default:
                return 0;
        }
    }

    protected getDiscount = (): number => {
        if (!this.serviceTypes.includes(ServiceType.VideoRecording)){
            return 0;
        }

        switch (this.year) {
            case 2020:
                return 600;
            case 2021:
                return 650;
            case 2022:
                return 650;
            default:
                return 0;
        }
    };
}
