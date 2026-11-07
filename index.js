#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs/promises");

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
        console.log('папка создана');

        const jsxFilePath = path.join(dir, `${componentName}.jsx`) // путь для jsx файла
        console.log(jsxFilePath, "   jsx")
        await fs.writeFile(jsxFilePath, `import './${componentName}module.css'`, "utf-8");// создаем сам jsx файл
        console.log('js файл создан')

        const cssFilePath = path.join(dir, `${componentName}.module.css`);//путь для css файла
        console.log(jsxFilePath, "   jsx")

        await fs.writeFile(cssFilePath, `.${componentName}`, "utf-8"); //пишем сам css файл
        console.log('css файл создан')




        console.log('component complite')

    } catch (error) {
        console.log(error)
    }
}



main();