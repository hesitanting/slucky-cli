'use strict'

const prompts = require('prompts');
const templates = require('../../templates.json')
const fs = require('fs');
const chalk = require('chalk');
const format = require('../format')

exports.update = () => {
    (async () => {
        const preOption = [{
            type: 'text',
            name: 'project',
            message: '项目名称?',
            validate: value => value ? true : '请输入内容'
        }]
        format.table(templates)
        const preResponse = await prompts(preOption);

        const {
            project
        } = preResponse

        if (!templates[project]) {
            console.log(chalk.red('模板不存在'))
            process.exit()
        }

        const option = [{
            type: 'text',
            name: 'url',
            message: '项目仓库地址?',
            initial: templates[project].url,
            validate: value => value ? true : '请输入内容'
        }, {
            type: 'text',
            name: 'branch',
            message: '项目分支?',
            initial: templates[project].branch,
            validate: value => value ? true : '请输入内容'
        }, {
            type: 'text',
            name: 'des',
            message: '项目描述?',
            initial: templates[project].des,
            validate: value => value ? true : '请输入内容'
        }]
        const response = await prompts(option);

        templates[project] = {
            project,
            ...response
        }

        fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
            if (err) {
                console.log(chalk.red('写入错误'))
                process.exit()
            }
            console.log(chalk.green('修改成功'))
            format.table(templates)
            process.exit();
        });
    })();
}