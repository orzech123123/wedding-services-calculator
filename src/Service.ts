import { Requirements } from "./Requirements";
import { ServiceType } from "./ServiceType";

export abstract class Service {
    protected abstract getType(): ServiceType;
    protected abstract getPrice(): number;
    protected getDiscount = (): number => 0;

    protected year: number;
    protected serviceTypes: ServiceType[];

    constructor(serviceTypes: ServiceType[], year: number) {
        this.serviceTypes = serviceTypes;
        this.year = year;
    }

    public getInfo() {
        return {
            price: !this.areRequirementsMet(this.getType()) ? 0 : this.getPrice(),
            discount: this.getDiscount()
        }
    }

    private areRequirementsMet(serviceType: ServiceType): boolean {
        var requirementServiceTypes = Requirements[serviceType];

        if (!requirementServiceTypes) {
            return true;
        }

        if (this.serviceTypes.some(serviceType => requirementServiceTypes.includes(serviceType))) {
            return true;
        }

        return false;
    }
}
