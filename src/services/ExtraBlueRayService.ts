import { Service } from "../Service";
import { ServiceType } from "../ServiceType";

export class ExtraBlueRayService extends Service {
    protected getType(): ServiceType {
        return ServiceType.ExtraBlueRay;
    }

    protected getPrice(): number {
        return 300;
    }
}
