import * as moment from 'moment'
import fetch from 'node-fetch'
import * as md5 from 'md5'

enum HIREZAPI {
    SESSION_DURATION = 14 * 60 * 1000
}

interface OPTIONS {
    platform?: "PC" | "Xbox" | "PS4",
    devId: number,
    authKey: string,
    lang?: LANGUAGE
}

enum LANGUAGE {
    ENGLISH = 1,
    GERMAN = 2,
    FRENCH = 3,
    CHINESE = 5,
    SPANISH = 7,
    SPANISHLA = 9,
    PORTUGUESE = 10,
    RUSSIAN = 11,
    POLISH = 12,
    TURKISH = 13
}

enum SMITE_ENDPOINT {
    PC = 'http://api.smitegame.com/smiteapi.svc',
    Xbox = 'http://api.xbox.smitegame.com/smiteapi.svc',
    PS4 = 'http://api.ps4.smitegame.com/smiteapi.svc'
}

enum PALADINS_ENDPOINT {
    PC = 'http://api.paladins.com/paladinsapi.svc',
    Xbox = 'http://api.xbox.paladins.com/paladinsapi.svc',
    PS4 = 'http://api.ps4.paladins.com/paladinsapi.svc'
}

class HirezAbstract {
    protected readonly lang: LANGUAGE;
    private baseUrl: string;
    private readonly devId: number;
    private readonly authKey: string;
    private readonly format: string;
    private session_: any;

    constructor(baseUrl: string, devId: number, authKey: string, lang: LANGUAGE) {
        this.baseUrl = baseUrl;
        this.devId = devId;
        this.authKey = authKey;
        this.format = 'Json';
        this.lang = (lang || LANGUAGE.ENGLISH);
    }

    ping() {
        return this.fetch_(`/ping${this.format}`);
    }

    test() {
        return this.request_('testsession');
    }

    getServerStatus() {
        return this.request_('gethirezserverstatus');
    }

    getDataUsed() {
        return this.request_('getdataused');
    }

    getItems() {
        return this.request_('getitems', this.lang);
    }

    getPatchInfo() {
        return this.request_('getpatchinfo');
    }

    getMOTD() {
        return this.request_('getmotd');
    }

    getEsportsProLeagueDetails() {
        return this.request_('getesportsproleaguedetails');
    }

    getTopMatches() {
        return this.request_('gettopmatches');
    }

    getFriends(player: string) {
        return this.request_('getfriends', player);
    }

    getMatchHistory(player: string) {
        return this.request_('getmatchhistory', player);
    }

    getPlayer(player: string) {
        return this.request_('getplayer', player);
    }

    getPlayerStatus(player: string) {
        return this.request_('getplayerstatus', player);
    }

    getQueueStats(player: string, queue: number) {
        return this.request_('getqueuestats', player, queue);
    }

    getPlayerAchievements(player: string) {
        return this.request_('getplayerachievements', player);
    }

    getDemoDetails(match_id: number) {
        return this.request_('getdemodetails', match_id);
    }

    getMatchDetails(match_id: number) {
        return this.request_('getmatchdetails', match_id);
    }

    getMatchPlayerDetails(match_id: number) {
        return this.request_('getmatchplayerdetails', match_id);
    }

    getMatchDetailsBatch(match_ids: number[]) {
        return this.request_('getmatchdetailsbatch', match_ids.join(','));
    }

    getMatchIdsByQueue(queue: number, date: string, hour: number) {
        return this.request_('getmatchidsbyqueue', queue, date, hour);
    }

    getLeagueLeaderboard(queue: number, tier: number, season: number) {
        return this.request_('getleagueleaderboard', queue, tier, season);
    }

    getLeagueSeasons(queue: number) {
        return this.request_('getleagueseasons', queue);
    }

    getTeamDetails(clanid: number) {
        return this.request_('getteamdetails', clanid);
    }

    getTeamMatchHistory(clanid: number) {
        return this.request_('getteammatchhistory', clanid);
    }

    getTeamPlayers(clanid: number) {
        return this.request_('getteamplayers', clanid);
    }

    searchTeams(searchTeam: string) {
        return this.request_('searchteams', searchTeam);
    }

    protected request_(method: string, ...args: any[]) {
        return this.session().then((id: any) => this.fetch_(`/${method}${this.format}/${this.devId}/${this.signature_(method)}/${id}/${this.timestamp_()}${[...args].map(x => '/' + encodeURI(x)).join('')}`));
    }

    private timestamp_() {
        return moment().utc().format('YYYYMMDDHHmmss');
    }

    private signature_(method: string) {
        return md5(this.devId + method + this.authKey + this.timestamp_());
    }

    private fetch_(path: string) {
        return fetch(this.baseUrl + path).then((response: { json: () => any; }) => response.json());
    }

    private session(): any {
        if (this.session_) {
            return this.session_;
        } else {
            return this.session_ = this.fetch_(`/createsession${this.format}/${this.devId}/${this.signature_('createsession')}/${this.timestamp_()}`).then((data: { session_id: any; }) => {
                setTimeout(() => {
                    delete this.session_;
                }, HIREZAPI.SESSION_DURATION);
                return data.session_id;
            }, () => {
                delete this.session_;
                return this.session();
            });
        }
    }

}

export class Smite extends HirezAbstract {
    constructor(options: OPTIONS) {
        super(SMITE_ENDPOINT[options.platform || 'PC'], options.devId, options.authKey, options.lang = LANGUAGE.ENGLISH);
    }

    getGods() {
        return this.request_('getgods', this.lang);
    }

    getGodSkins(godId: number) {
        return this.request_('getgodskins', godId, this.lang);
    }

    getGodRecommendedItems(godId: number) {
        return this.request_('getgodrecommendeditems', godId, this.lang);
    }

    getGodLeaderboard(godId: number, queue: number) {
        return this.request_('getgodleaderboard', godId, queue);
    }

    getGodRanks(player: string) {
        return this.request_('getgodranks', player);
    }
}

export class PaladinsApi extends HirezAbstract {
    constructor(options: OPTIONS) {
        super(PALADINS_ENDPOINT[options.platform || 'PC'], options.devId, options.authKey, options.lang = LANGUAGE.ENGLISH);
    }

    getChampions() {
        return this.request_('getchampions', this.lang);
    }

    getChampionSkins(godId: number) {
        return this.request_('getchampionskins', godId, this.lang);
    }

    getChampionRecommendedItems(godId: number) {
        return this.request_('getchampionrecommendeditems', godId, this.lang);
    }

    getChampionRanks(player: string) {
        return this.request_('getchampionranks', player);
    }

    getPlayerLoadouts(player: string) {
        return this.request_('getplayerloadouts', player, this.lang);
    }
}
