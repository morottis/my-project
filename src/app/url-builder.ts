/*import {Parts} from '../enums/parts.enum';
import {UnknownObject} from '../interfaces';
import {PaginationInfo} from './pagination-info';
import {SearchInfo} from './search-info';
import {SortInfo} from './sorting-info';

export class UrlBuilder {
    private _parts = '';
    private _additionalParameter: UnknownObject | undefined;

    constructor(protected requestUrl: string = '') {
    }

    withQueryParam(queryParam: string, value: string) {
        const concatenationCharacter = this.requestUrl.includes('?') ? '&' : '?';
        this.requestUrl += concatenationCharacter + queryParam + '=' + value;
        return this;
    }

    withOrganizationUUID(organizationUUID: string) {
        this.withQueryParam('organizationUUID', organizationUUID);
        return this;
    }

    withPaginationInfo(paginationInfo: PaginationInfo) {
        return this.withQueryParam('numberOfPage', paginationInfo.nextPage.toString()).withQueryParam(
            'numberOfPageElements',
            paginationInfo.numberOfElementsOnPage.toString()
        );
    }

    withSearchFilter(searchInfo: SearchInfo) {
        this.requestUrl += `&${searchInfo.searchValueParamName}=${encodeURIComponent(searchInfo.query)}&${
            searchInfo.searchFieldsParamName
        }=${encodeURIComponent(searchInfo.searchFields)}`;
    }

    withStructureUUIDsFilter(structureUUIDs: string[]) {
        let structureUUIDsStringValue = '';
        structureUUIDs.forEach((structureUUID, index) => {
            structureUUIDsStringValue += structureUUID;
            if (index < structureUUIDs.length - 1) {
                structureUUIDsStringValue += ',';
            }
        });

        this.requestUrl += '&structureFieldUUID=' + structureUUIDsStringValue;
        return this;
    }


    withParts(parts: Parts[]) {
        this._parts = parts.join(',');
        return this;
    }

    withAdditionalParameter(parameter: UnknownObject): UrlBuilder {
        this._additionalParameter = parameter;

        Object.keys(this._additionalParameter).forEach((value) => {
            this.requestUrl += '&' + value + '=' + encodeURIComponent(parameter[value] as string | number | boolean);
        });
        return this;
    }

    withSortClause(sortingField: string, sortingDirection: string) {
        this.requestUrl += '&sortBy=' + encodeURIComponent(sortingField + '#' + sortingDirection);
        return this;
    }

    withSortInfo(sortInfo: SortInfo) {
        this.requestUrl += '&sortBy=' + encodeURIComponent(sortInfo.completeSortInfo);
        return this;
    }

    withSortClauses(sortingClauses: Map<string, string>) {
        let appendString = '&sortBy=';
        if (sortingClauses.size > 0) {
            sortingClauses.forEach((sortingDirectionValue: string, sortingFieldKey: string) => {
                this.requestUrl += appendString + encodeURIComponent(sortingFieldKey + '#' + sortingDirectionValue);
                appendString = ',';
            });
        }

        return this;
    }

    build(): string {
        if (this._parts != undefined && this._parts != '') {
            const concatenationCharacter = this.requestUrl.includes('?') ? '&' : '?';
            this.requestUrl += concatenationCharacter + 'parts=' + this._parts;
        }
        return this.requestUrl;
    }
}*/
