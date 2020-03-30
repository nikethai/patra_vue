import qs from 'qs';

export function qsHelp(obj){
    return qs.stringify(obj,{arrayFormat: 'repeat'});
}