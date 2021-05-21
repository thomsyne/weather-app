export interface CoordinateModel {
    name: string,
    local_names: Locals,
    lat: number,
    lon: number,
    country: string
}

interface Locals {
    ascii: string,
    en: string,
    feature_name: string,
    fr: string,
    ja: string
}