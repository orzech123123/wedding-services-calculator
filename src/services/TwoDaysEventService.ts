import { Service } from "../Service";
import { ServiceType } from "../ServiceType";

export class TwoDaysEventService extends Service {
    protected getType(): ServiceType {
        return ServiceType.TwoDaysEvent;
    }

    protected getPrice(): number {
        return 400;
    }
}
