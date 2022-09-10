import { Service } from "./Service";
import { PhotographyService } from "./services/PhotographyService";
import { VideoRecordingService } from "./services/VideoRecordingService";
import { WeddingSessionService } from "./services/WeddingSessionService";
import { ExtraBlueRayService } from "./services/ExtraBlueRayService";
import { TwoDaysEventService } from "./services/TwoDaysEventService";
import { Requirements } from "./Requirements";
import { SelectionType } from "./SelectionType";
import { ServiceYear } from "./ServiceYear";
import { ServiceType } from "./ServiceType";

export const calculatePrice = (selectedServiceTypes: ServiceType[], selectedYear: ServiceYear) => {
    let resultPrice = 0.0;
    let resultDiscount = 0.0;

    selectedServiceTypes.forEach(serviceType => {
        let service: Service;

        switch (serviceType) {
            case ServiceType.Photography:
                service = new PhotographyService(selectedServiceTypes, selectedYear);
                break;
            case ServiceType.VideoRecording:
                service = new VideoRecordingService(selectedServiceTypes, selectedYear);
                break;
            case ServiceType.WeddingSession:
                service = new WeddingSessionService(selectedServiceTypes, selectedYear);
                break;
            case ServiceType.ExtraBlueRay:
                service = new ExtraBlueRayService(selectedServiceTypes, selectedYear);
                break;
            case ServiceType.TwoDaysEvent:
                service = new TwoDaysEventService(selectedServiceTypes, selectedYear);
                break;
        };

        var info = service.getInfo();
        resultPrice += info.price;
        resultDiscount += info.discount;
    })

    return {
        basePrice: resultPrice,
        discountedPrice: resultPrice - resultDiscount
    }
}

export const updateSelectedServices = (
    action: { type: SelectionType; serviceType: ServiceType },
    selectedServiceTypes: ServiceType[]
) => {
    switch (action.type) {
        case SelectionType.Select: {
            if (selectedServiceTypes.includes(action.serviceType)) {
                return selectedServiceTypes;
            }

            var requirementsMet = areRequirementsMet(action.serviceType, selectedServiceTypes);

            if (!requirementsMet) {
                return selectedServiceTypes;
            }

            return [...selectedServiceTypes, action.serviceType];
        }
        case SelectionType.Deselect: {
            if (!selectedServiceTypes.includes(action.serviceType)) {
                return selectedServiceTypes;
            }

            selectedServiceTypes = selectedServiceTypes.filter(selectedServiceTypes => selectedServiceTypes != action.serviceType)

            selectedServiceTypes.forEach(serviceType => {
                var requirementsMet = areRequirementsMet(serviceType, selectedServiceTypes);

                if (!requirementsMet) {
                    selectedServiceTypes = selectedServiceTypes
                        .filter(selectedServiceType => selectedServiceType != serviceType)
                }
            })

            return selectedServiceTypes;
        }
    };
}

function areRequirementsMet(
    serviceType: ServiceType,
    selectedServiceTypes: ServiceType[]) {
    const requirementServiceTypes = Requirements[serviceType];

    return requirementServiceTypes
        ?.some(reqServiceType => selectedServiceTypes.includes(reqServiceType))
        ?? true;
}
