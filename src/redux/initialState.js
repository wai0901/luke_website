import { HOMEMENULIST } from '../shared/homeMenuList';
import { WOMENSECTIONLIST } from '../shared/womenSectionList';
import { MENSECTIONLIST } from '../shared/menSectionList';
import { GIRLSECTIONLIST } from '../shared/girlSectionList';
import { BOYSECTIONLIST } from '../shared/boySectionList';
import { BGIRLSECTIONLIST } from '../shared/bGirlSectionList';
import { BBOYSECTIONLIST } from '../shared/bBoySectionList';
import { MINISECTIONLIST } from '../shared/miniSectionList';
import { ASSCSECTIONLIST } from '../shared/asscSectionList';
import { PRODUCTS } from '../shared/itemsLists/products';
import { HELPCONTENT } from '../shared/helpContent';

export const initialState = {
    homeMenuList: HOMEMENULIST,
    womenSectionList: WOMENSECTIONLIST,
    menSectionList: MENSECTIONLIST,
    girlSectionList: GIRLSECTIONLIST,
    boySectionList: BOYSECTIONLIST,
    bGirlSectionList: BGIRLSECTIONLIST,
    bBoySectionList: BBOYSECTIONLIST,
    miniSectionList: MINISECTIONLIST,
    asscSectionList: ASSCSECTIONLIST,
    products: PRODUCTS,
    helpContent: HELPCONTENT
}

export const InitialState = (state = initialState, action) => {
    return state;
};