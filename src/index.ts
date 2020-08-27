import {LANGUAGE, PALADINS_ENDPOINT, SMITE_ENDPOINT} from "./enums/base_enums";
import HirezAbstract from "./HirezAbstract";
import {OPTIONS} from "./interfaces/base_interfaces";
import God from "./interfaces/god_interface";

export class Smite extends HirezAbstract {
    constructor(options: OPTIONS) {
        super(
            options.platform || SMITE_ENDPOINT.PC,
            options.devId,
            options.authKey,
            options.lang || LANGUAGE.ENGLISH
        );
    }

    getGods(): Promise<God[]> {
        return this.request_("getgods", this.lang);
    }

    getGodSkins(godId: number) {
        return this.request_("getgodskins", godId, this.lang);
    }

    getGodRecommendedItems(godId: number) {
        return this.request_("getgodrecommendeditems", godId, this.lang);
    }

    getGodLeaderboard(godId: number, queue: number) {
        return this.request_("getgodleaderboard", godId, queue);
    }

    getGodRanks(player: string) {
        return this.request_("getgodranks", player);
    }
}

export class PaladinsApi extends HirezAbstract {
    constructor(options: OPTIONS) {
        super(
            options.platform || PALADINS_ENDPOINT.PC,
            options.devId,
            options.authKey,
            options.lang || LANGUAGE.ENGLISH
        );
    }

    getChampions() {
        return this.request_("getchampions", this.lang);
    }

    getChampionSkins(godId: number) {
        return this.request_("getchampionskins", godId, this.lang);
    }

    getChampionRecommendedItems(godId: number) {
        return this.request_("getchampionrecommendeditems", godId, this.lang);
    }

    getChampionRanks(player: string) {
        return this.request_("getchampionranks", player);
    }

    getPlayerLoadouts(player: string) {
        return this.request_("getplayerloadouts", player, this.lang);
    }
}
