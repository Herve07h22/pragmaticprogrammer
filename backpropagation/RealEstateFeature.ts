export enum Location {
    city = 0,
    country = 1
}

export enum Size {
    small = 0,
    large = 1,
}

export enum Age {
    old = 0,
    new = 1
}

export type RealEstateFeature = {
    location:Location,
    size:Size,
    age:Age,
}

