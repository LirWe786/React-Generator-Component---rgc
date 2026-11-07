#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs/promises");



async function validateFileName(componentName) {
    const strg = componentName
    let arr = strg.split('')
    let fsrtSymbol = arr[0].toUpperCase()
    arr[0] = fsrtSymbol;
    return arr.join('')
}

async function createFile(componentName, dir, extension, data) {
  
    const filePath = path.join(dir, `${componentName}.${extension}`) // путь для jsx файла
    await fs.writeFile(filePath, `import './${componentName}.module.css'`, "utf-8");// создаем сам jsx файл
    console.log(`\n ${componentName}${extension} файл создан`)
}

async function main() {



    try {
        let dir;
        const componentName = process.argv[2]//берем первый аргумент с консоли 
        const currentDir = process.cwd(); //ищем директорию где запускается скрипт

        let dirFiles = await fs.readdir(currentDir); //читаем директорию проекта
        if (dirFiles.includes('src')) { //проверяем есть ли src папка
            dir = path.join(currentDir, '/src/app');//если да то присваиваем путь с src 
            console.log(dir);
        }
        else {
            dir = path.join(currentDir, '/app');//если нет src то путь с app
            console.log(dir);
        }

        dirFiles = await fs.readdir(dir); //читаем папку app 
        dir = path.join(dir, '/components')// добавляем к пути components


        if (!dirFiles.includes('components')) { // проверяет есть ли папка components в app
            //cсоздание папки компонентов если ее нет
            await fs.mkdir(dir) //если папки нет создаем ее
        }

        dir = path.join(dir, `${componentName}`) // добавляем к пути название будущего компонента

        await fs.mkdir(dir) //создаем папку под компонент
        console.log('\n папка создана');

        // const jsxFilePath = path.join(dir, `${componentName}.jsx`) // путь для jsx файла
        // console.log(jsxFilePath, "   jsx")
        // await fs.writeFile(jsxFilePath, `import './${componentName}module.css'`, "utf-8");// создаем сам jsx файл
        // console.log('\n jsx файл создан')


        await createFile(componentName, dir, 'jsx');
        await createFile(componentName, dir, 'module.css');


        console.log('\n component complite')

    } catch (error) {
        console.log(error)
    }
}



main();