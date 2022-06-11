import { type } from "os"

export type MenuType = {
    icon: string,
    name: string,
    path: string
}

export type BannerGroupType = {
    title: string;
    description: string;
    gallery: string;
}

export type GroupType = {
    id: string;
    name: string;
    icon: string;
    layout: string;
    productCard: string;
    sliders: Array<string>;
    banner: BannerGroupType
}