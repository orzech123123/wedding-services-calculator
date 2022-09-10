import { updateSelectedServices } from "../index";
import { ServiceType } from "../ServiceType";
import { SelectionType } from "../SelectionType";

describe("updateSelectedServices => select",
    () => {
        test("should select if not yet selected", () => {
            const expected = [ServiceType.Photography];

            const actual = updateSelectedServices(
                { type: SelectionType.Select, serviceType: ServiceType.Photography },
                []);

            expect(actual).toEqual(expected);
        });

        test("should not select if already selected", () => {
            const expected = [ServiceType.VideoRecording];

            const actual = updateSelectedServices(
                { type: SelectionType.Select, serviceType: ServiceType.VideoRecording },
                [ServiceType.VideoRecording]);

            expect(actual).toEqual(expected);
        });

        test("should not select requirement service if main service not selected", () => {
            const expected = [ServiceType.WeddingSession];

            const actual = updateSelectedServices(
                { type: SelectionType.Select, serviceType: ServiceType.ExtraBlueRay },
                [ServiceType.WeddingSession]);

            expect(actual).toEqual(expected);
        });

        test("should select requirement service if main service selected", () => {
            const expected = [ServiceType.VideoRecording, ServiceType.WeddingSession, ServiceType.ExtraBlueRay];

            const actual = updateSelectedServices(
                { type: SelectionType.Select, serviceType: ServiceType.ExtraBlueRay },
                [ServiceType.VideoRecording, ServiceType.WeddingSession]);

            expect(actual).toEqual(expected);
        });

        test("should select linked service if one of major services selected", () => {
            const expected = [ServiceType.Photography, ServiceType.WeddingSession, ServiceType.TwoDaysEvent];

            const actual = updateSelectedServices(
                { type: SelectionType.Select, serviceType: ServiceType.TwoDaysEvent },
                [ServiceType.Photography, ServiceType.WeddingSession]);

            expect(actual).toEqual(expected);
        });
    });

describe("updateSelectedServices => deselect",
    () => {
        test("should deselect if service already selected", () => {
            const expected = [ServiceType.WeddingSession];

            const actual = updateSelectedServices(
                { type: SelectionType.Deselect, serviceType: ServiceType.Photography },
                [ServiceType.WeddingSession, ServiceType.Photography]);

            expect(actual).toEqual(expected);
        });

        test("should not deselect if service not selected", () => {
            const expected = [ServiceType.WeddingSession, ServiceType.Photography];

            const actual = updateSelectedServices(
                { type: SelectionType.Deselect, serviceType: ServiceType.TwoDaysEvent },
                [ServiceType.WeddingSession, ServiceType.Photography]);

            expect(actual).toEqual(expected);
        });

        test("should deselect linked if all major services deselected", () => {
            const expected = [ServiceType.WeddingSession];

            const actual = updateSelectedServices(
                { type: SelectionType.Deselect, serviceType: ServiceType.Photography },
                [ServiceType.WeddingSession, ServiceType.Photography, ServiceType.TwoDaysEvent]);

            expect(actual).toEqual(expected);
        });

        test("should not deselect linked if one or more major services is selected", () => {
            const expected = [ServiceType.WeddingSession, ServiceType.VideoRecording, ServiceType.TwoDaysEvent];

            const actual = updateSelectedServices(
                { type: SelectionType.Deselect, serviceType: ServiceType.Photography },
                [ServiceType.WeddingSession, ServiceType.Photography, ServiceType.VideoRecording, ServiceType.TwoDaysEvent]);

            expect(actual).toEqual(expected);
        });
    });