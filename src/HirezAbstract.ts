import * as moment from "moment";
import * as md5 from "md5";
import fetch from "node-fetch";
import {HIREZAPI, LANGUAGE} from "./enums/base_enums";
import Item from "./interfaces/item_interface";

export default class HirezAbstract {
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
        this.format = "Json";
        this.lang = lang || LANGUAGE.ENGLISH;
    }

    private static timestamp_() {
        return moment().utc().format("YYYYMMDDHHmmss");
    }

    ping() {
        return this.fetch_(`/ping${this.format}`);
    }

    test() {
        return this.request_("testsession");
    }

    getServerStatus() {
        return this.request_("gethirezserverstatus");
    }

    getDataUsed() {
        return this.request_("getdataused");
    }

    getItems(): Promise<Item> {
        return this.request_("getitems", this.lang);
    }

    getPatchInfo() {
        return this.request_("getpatchinfo");
    }

    getMOTD() {
        return this.request_("getmotd");
    }

    getEsportsProLeagueDetails() {
        return this.request_("getesportsproleaguedetails");
    }

    getTopMatches() {
        return this.request_("gettopmatches");
    }

    getFriends(player: string) {
        return this.request_("getfriends", player);
    }

    getMatchHistory(player: string) {
        return this.request_("getmatchhistory", player);
    }

    getPlayer(player: string) {
        return this.request_("getplayer", player);
    }
	
	getPlayerById(player: string) {
        return this.request_("getplayerbyid", player);
    }
	
	getPlayerByGamertag(platform: string, player: string) {
        return this.request_("getplayerbyid", platform, player);
    }

    getPlayerStatus(player: string) {
        return this.request_("getplayerstatus", player);
    }

    getQueueStats(player: string, queue: number) {
        return this.request_("getqueuestats", player, queue);
    }

    getPlayerAchievements(player: string) {
        return this.request_("getplayerachievements", player);
    }

    getDemoDetails(match_id: number) {
        return this.request_("getdemodetails", match_id);
    }

    getMatchDetails(match_id: number) {
        return this.request_("getmatchdetails", match_id);
    }

    getMatchPlayerDetails(match_id: number) {
        return this.request_("getmatchplayerdetails", match_id);
    }

    getMatchDetailsBatch(match_ids: number[]) {
        return this.request_("getmatchdetailsbatch", match_ids.join(","));
    }

    getMatchIdsByQueue(queue: number, date: string, hour: number) {
        return this.request_("getmatchidsbyqueue", queue, date, hour);
    }

    getLeagueLeaderboard(queue: number, tier: number, season: number) {
        return this.request_("getleagueleaderboard", queue, tier, season);
    }

    getLeagueSeasons(queue: number) {
        return this.request_("getleagueseasons", queue);
    }

    getTeamDetails(clanid: number) {
        return this.request_("getteamdetails", clanid);
    }

    getTeamMatchHistory(clanid: number) {
        return this.request_("getteammatchhistory", clanid);
    }

    getTeamPlayers(clanid: number) {
        return this.request_("getteamplayers", clanid);
    }

    searchTeams(searchTeam: string) {
        return this.request_("searchteams", searchTeam);
    }

    protected request_(method: string, ...args: any[]) {
        return this.session().then((id: any) =>
            this.fetch_(
                `/${method}${this.format}/${this.devId}/${this.signature_(
                    method
                )}/${id}/${HirezAbstract.timestamp_()}${[...args]
                    .map((x) => "/" + encodeURI(x))
                    .join("")}`
            )
        );
    }

    private signature_(method: string) {
        return md5(this.devId + method + this.authKey + HirezAbstract.timestamp_());
    }

    private fetch_(path: string) {
        return fetch(this.baseUrl + path).then(response =>
            response.json()
        );
    }

    private session(): any {
        if (this.session_) {
            return this.session_;
        } else {
            return (this.session_ = this.fetch_(
                `/createsession${this.format}/${this.devId}/${this.signature_(
                    "createsession"
                )}/${HirezAbstract.timestamp_()}`
            ).then(data => {
                    setTimeout(() => {
                        delete this.session_;
                    }, HIREZAPI.SESSION_DURATION);
                    return data.session_id;
                },
                () => {
                    delete this.session_;
                    return this.session();
                }
            ));
        }
    }
}