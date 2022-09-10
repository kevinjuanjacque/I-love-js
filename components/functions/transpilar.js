const replaceEscribir = (str) => {
    return str.replace(
        /(?<![a-z] |'|[a-zA-Z0-9]|")Escribir\(.*\)/g,
        (m, g1) => {
            return m.replace('Escribir', 'console.log');
        }
    );
};
const replaceVar = (str) => {
    return str.replace(/(?<![a-z] |'|[a-zA-Z0-9]|")var\s.*/g, (m, g1) => {
        return m.replace('var', 'let');
    });
};

const replacePara = (str) => {
    //(?<![a-z] |'|[a-zA-Z0-9]|"|\W)Para\s.*En\s.*\{
    return str.replace(/(?<![a-z] |'|[a-zA-Z0-9]|")Para.*En.*\{/g, (m, g1) => {
        return m.replace('Para', 'for(').replace('En', 'of').replace('{', '){');
    });
};

const transpilar = (str) => {
    let newStr = replaceEscribir(str);
    newStr = replaceVar(newStr);
    newStr = replacePara(newStr);
    console.warn(newStr);
    return newStr;
};

export default transpilar;
