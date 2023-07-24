const RESET_BUTTON = "div[class='filter-forms'] button[type='button']"
const NAME_FIELD_FILTER = "#filter_host"
const APPLY_BUTTON = "button[value='1']"


class ZabbixHost{
    // Assertions
    TABLE_HOST = "table[class='list-table']"

    resetFilters(){
        cy.get(RESET_BUTTON).click()
    }
    enterHostnameFilter(HostName){
        cy.get(NAME_FIELD_FILTER).type(HostName)
    }
    clickApplyButton(){
        cy.get(APPLY_BUTTON).click()
    }
    validateTableHosts(){
        return TABLE_HOST
    }
}
export const zabbixHost = new ZabbixHost()

