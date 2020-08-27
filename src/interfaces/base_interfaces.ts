import {LANGUAGE, SMITE_ENDPOINT} from "../enums/base_enums";

export interface OPTIONS {
    platform?: SMITE_ENDPOINT;
    devId: number;
    authKey: string;
    lang?: LANGUAGE;
}