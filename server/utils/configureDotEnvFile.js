import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function configureDotEnvFile(dotEnvFileName) {
    const FILE_PATH = path.join(__dirname, '..', dotEnvFileName);
    const ENV_FILE_PATH = path.join(__dirname, '..', '.env');

    const envFileData = fs.readFileSync(FILE_PATH, 'utf-8').split('\n').filter(el => el !== '');
    const envMap = new Map();

    envFileData.forEach((el, i, arr) => {
        const splittedLine = el.split('=');
        const key = splittedLine[0];
        const value = splittedLine[1];

        const variable = value.match(/\${.*}/);
        if (!variable) {
            envMap.set(key, value);
        } else {
            const variableName = variable[0].replace('$', '').replace('{', '').replace('}', '');
            const variableValue = envMap.get(variableName);
            if (!variableValue) {
                envMap.set(key, value);
            } else {
                const valueWithVariable = value.replace(variable, variableValue);
                envMap.set(key, valueWithVariable);
            }
        }
    });

    let resultOutput = '';
    for (let [key, value] of envMap) {
        resultOutput += `${key}=${value}\n`;
    }
    
    fs.writeFileSync(ENV_FILE_PATH, resultOutput);
}