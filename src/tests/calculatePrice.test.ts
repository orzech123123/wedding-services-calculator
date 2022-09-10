import { calculatePrice } from "../index";
import { ServiceType } from "../ServiceType";
import { ServiceYear } from "../ServiceYear";

describe.each(
    [2020,
        2021,
        2022])
    ("calculatePrice => empty in %i year", (year: ServiceYear) => {
        test("should be empty with prices 0", () => {
            const expected = { basePrice: 0, discountedPrice: 0 };

            const actual = calculatePrice([], year);

            expect(actual).toEqual(expected);
        });
    });

describe.each([
    [ServiceType.Photography, 2020, 1700],
    [ServiceType.Photography, 2021, 1800],
    [ServiceType.Photography, 2022, 1900],
    [ServiceType.VideoRecording, 2020, 1700],
    [ServiceType.VideoRecording, 2021, 1800],
    [ServiceType.VideoRecording, 2022, 1900],
    [ServiceType.WeddingSession, 2020, 600],
    [ServiceType.WeddingSession, 2021, 600],
    [ServiceType.WeddingSession, 2022, 600]
])("calculatePrice => single Service - %s %i year", (service: ServiceType, year: ServiceYear, expectedPrice: number) => {
    test("should not discount price", () => {
        const actual = calculatePrice([service], year);

        expect(actual.basePrice).toBe(actual.discountedPrice);
    });

    test("should meet price requirements", () => {
        const expected = { basePrice: expectedPrice, discountedPrice: expectedPrice };

        const actual = calculatePrice([service], year);

        expect(actual).toEqual(expected);
    });
});

describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0]
])("calculatePrice => Photography + WeddingSession price - %i year grow with %i", (year: ServiceYear, grow: number) => {
    test("should meet price requirements", () => {
        const withoutWeddingSession = calculatePrice([ServiceType.Photography], year);
        const withWeddingSession = calculatePrice([ServiceType.Photography, ServiceType.WeddingSession], year);

        const priceDiff = withWeddingSession.discountedPrice - withoutWeddingSession.discountedPrice;

        expect(withWeddingSession.basePrice).toBeGreaterThan(0);
        expect(withWeddingSession.discountedPrice).toBeGreaterThan(0);
        expect(priceDiff).toEqual(grow);
    });

    test("should discount price", () => {
        const withoutWeddingSession = calculatePrice([ServiceType.Photography], year);
        const weddingSession = calculatePrice([ServiceType.WeddingSession], year);
        const withWeddingSession = calculatePrice([ServiceType.Photography, ServiceType.WeddingSession], year);

        const priceWithoutDiscounts = withoutWeddingSession.discountedPrice + weddingSession.discountedPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withWeddingSession.discountedPrice);
    });
});

describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0] //free
])(
    "calculatePrice => VideoRecording + Photography with WeddingSession price - %i year grow with %i",
    (year: ServiceYear, grow: number) => {
        test("should meet price requirements", () => {
            const withWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.Photography, ServiceType.WeddingSession], year);
            const withoutWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.Photography], year);

            const priceDiff = withWeddingSession.discountedPrice - withoutWeddingSession.discountedPrice;

            expect(priceDiff).toEqual(grow);
        });

        test("should discount price", () => {
            const withWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.Photography, ServiceType.WeddingSession], year);
            const withoutWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.Photography], year);
            const weddingSession = calculatePrice([ServiceType.WeddingSession], year);

            const priceDiff = withoutWeddingSession.discountedPrice + weddingSession.discountedPrice;

            expect(priceDiff).toBeGreaterThan(withWeddingSession.discountedPrice);
        });
    }
);

describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 300]
])("calculatePrice => VideoRecording + WeddingSession price - %i year grow with %i", (year: ServiceYear, grow: number) => {
    test("should meet price requirements", () => {
        const withWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.WeddingSession], year);
        const withoutWeddingSession = calculatePrice([ServiceType.VideoRecording], year);

        const priceDiff = withWeddingSession.discountedPrice - withoutWeddingSession.discountedPrice;

        expect(priceDiff).toEqual(grow);
    });

    test("should discount price", () => {
        const withWeddingSession = calculatePrice([ServiceType.VideoRecording, ServiceType.WeddingSession], year);
        const withoutWeddingSession = calculatePrice([ServiceType.VideoRecording], year);
        const weddingSession = calculatePrice([ServiceType.WeddingSession], year);

        const priceDiff = withoutWeddingSession.discountedPrice + weddingSession.discountedPrice;

        expect(priceDiff).toBeGreaterThan(withWeddingSession.discountedPrice);
    });
});

describe(
    "calculatePrice => TwoDayEvents",
    () => {
        test("should calculate additional price if VideoRecording selected", () => {
            const expected = 2100;

            const actual = calculatePrice([ServiceType.VideoRecording, ServiceType.TwoDaysEvent], 2020);

            expect(actual.discountedPrice).toEqual(expected);
        });

        test("should not calculate additional price if Photography or VideoRecording not selected", () => {
            const expected = 600;

            const actual = calculatePrice([ServiceType.WeddingSession, ServiceType.TwoDaysEvent], 2020);

            expect(actual.discountedPrice).toEqual(expected);
        });

        test("should calculate additional price if Photography selected", () => {
            const expected = 2100;

            const actual = calculatePrice([ServiceType.Photography, ServiceType.TwoDaysEvent], 2020);

            expect(actual.discountedPrice).toEqual(expected);
        });
    }
);

describe(
    "calculatePrice => BlueRayPackage",
    () => {
        test("should calculate addiitonal price if VideoRecording selected", () => {
            const expected = 2000;

            const actual = calculatePrice([ServiceType.VideoRecording, ServiceType.ExtraBlueRay], 2020);

            expect(actual.discountedPrice).toEqual(expected);
        });

        test("should not calculate addiitonal price if VideoRecording not selected", () => {
            const expected = 600;

            const actual = calculatePrice([ServiceType.WeddingSession, ServiceType.ExtraBlueRay], 2020);

            expect(actual.discountedPrice).toEqual(expected);
        });
    }
);