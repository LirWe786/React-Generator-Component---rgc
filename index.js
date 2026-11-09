#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs/promises");

const componentName = process.argv[2] //аргумент с названием компонента
const archFolderName = process.argv[3] //аргумент с названием папки архитектуры, если аргумент есть значит используется atomic design
const validName = validateFileName(componentName);
const jsxData = `import styles from './${componentName}.module.css'; 
         export default function ${validName}() { 
                 return ( 
                     <div className={styles.${componentName} }></div>
                     
                     )}`


function validateFileName(componentName) {
    try {

        const strg = componentName
        let arr = strg.split('')
        let fsrtSymbol = arr[0].toUpperCase()
        arr[0] = fsrtSymbol;
        return arr.join('')
    } catch (error) {
        console.error(`Ошибка валидации имени компонента: `, error.message)
    }
}

async function createFile(componentName, dir, extension) {
    try {

        const filePath = path.join(dir, `${componentName}.${extension}`)
        if (extension == 'jsx') {
            console.log(extension)
            await fs.writeFile(filePath, jsxData, "utf-8");
        } else {
            await fs.writeFile(filePath, `.${componentName}{}`, "utf-8");
        }
    } catch (error) {
        console.error(`Ошибка создания файла ${componentName}.${extension}: `, error.message)
    }

}

async function main() {
    try {
        let dir;
        const currentDir = process.cwd();

        let dirFiles = await fs.readdir(currentDir);
        if (dirFiles.includes('src')) {
            dir = path.join(currentDir, '/src/app');
        }
        else {
            dir = path.join(currentDir, '/app');
        }

        dirFiles = await fs.readdir(dir);
        dir = path.join(dir, '/components')


        if (!dirFiles.includes('components')) {
            await fs.mkdir(dir)
        }

        const componentsDirList = await fs.readdir(dir);

        if (componentsDirList.includes(archFolderName)) {
            dir = path.join(dir, `${archFolderName}`)
        }

        dir = path.join(dir, `${componentName}`)

        await fs.mkdir(dir)
        await createFile(componentName, dir, 'jsx');
        await createFile(componentName, dir, 'module.css');


        console.log('\n Компонент создан')

    } catch (error) {
        console.error(' \n \n Ошибка:', error.message)
    }
}



main();