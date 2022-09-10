import { Service } from "../Service";
import { ServiceType } from "../ServiceType";

export class WeddingSessionService extends Service {
    protected getType(): ServiceType {
        return ServiceType.WeddingSession;
    }

    protected getPrice(): number {
        return 600;
    }

    protected getDiscount = (): number => {
        if (this.serviceTypes.includes(ServiceType.Photography)) {
            if (this.year == 2022) {
                return 600;
            }
            
            return 300;
        }

        if (this.serviceTypes.includes(ServiceType.VideoRecording)) {
            return 300;
        }

        return 0;
    };
}
