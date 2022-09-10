import { ServiceType } from "./ServiceType";

export const Requirements = {
    [ServiceType.ExtraBlueRay]: [ServiceType.VideoRecording],
    [ServiceType.TwoDaysEvent]: [ServiceType.VideoRecording, ServiceType.Photography]
}