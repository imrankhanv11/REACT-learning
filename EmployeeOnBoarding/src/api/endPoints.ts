export const endPoints = {
    GET_DEPARTMENT  : `/Department/department`,
    GET_LOCATIONS   : `/Department/location`,
    GET_ROLE        : (id: number) => `/Department/roles/${id}`,
    ONBOARDEMP      : `/Employee/onboardEmployee`,
    METALOG         : `/MetaLog/metaLog`
}
