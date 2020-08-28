export default interface Item {
    ActiveFlag?:      string;
    ChildItemId?:     number;
    DeviceName?:      string;
    IconId?:          number;
    ItemDescription?: ItemDescription;
    ItemId?:          number;
    ItemTier?:        number;
    Price?:           number;
    RestrictedRoles?: string;
    RootItemId?:      number;
    ShortDesc?:       string;
    StartingItem?:    boolean;
    Type?:            string;
    itemIcon_URL?:    string;
    ret_msg?:         string | null;
}

interface ItemDescription {
    Description:          string;
    Menuitems:            Menuitem[];
    SecondaryDescription: null;
}

interface Menuitem {
    Description: string;
    Value:       string;
}